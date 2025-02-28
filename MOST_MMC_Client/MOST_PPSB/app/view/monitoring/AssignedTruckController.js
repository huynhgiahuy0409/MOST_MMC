Ext.define('MOST.view.monitoring.AssignedTruckController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.assignedtruck',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	
	MAIN_GRID_REF_NAME: 'refAssignedLorryListGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'assignedTruck',			// Main Store Name
	MAX_PERIOD_DAY : 31,
	MAIN_STORE_PIVOT : 'pivotList',	
	
	PDF_FILE: 'RMT002.jrxml',
	PDF_FUNCTION: 'MOST.monitoringReport.selectCargoInterchangeReceiptReport',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
		
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */	
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var locationCombo = me.getStore('locationList');
		var cargoTpCombo = me.getStore('cargoTpCombo');
		var searchParm = null;
    	
		locationCombo.load();
		cargoTpCombo.load();
		
		searchParm = Ext.create('MOST.model.monitoring.SearchAssignedTruckParm');
		
    	if(refs.refAssignedTruckList.activeTab.title == 'Pivot'){
    		searchParm = Ext.create('MOST.model.monitoring.pivot.SearchAssignedTruckPivotParm');
    		

    	}else if(refs.refAssignedTruckList.activeTab.title == 'List'){
    		
    	}
    	
		//for Pivot List (added by Brian 2023/05/12)
		searchParm.set("delvTpCd","D");
		searchParm.set("aggregate","qty");
		
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch:searchParm});
		
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');

		me.setDateInDays("ctlFromDt");
		me.setDateInDays("ctlToDt",7);
		
		
		me.getPivotItems();
		
	},
	/**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	// Date Change Event
	onDateChange:function( control, newValue, oldValue, eOpts ) {
		var me = this;
		var refs = me.getReferences();
		
		if(control == refs.ctlFromDt){
			me.setDateInDaysByDate("ctlToDt", me.MAX_PERIOD_DAY, control.getValue());
		} else {
			me.setDateInDaysByDate("ctlFromDt", -me.MAX_PERIOD_DAY, control.getValue());
		}
	},
	// Search Event Handler
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
     	var store = null;
     	
     	if(refs.refAssignedTruckList.activeTab.title == 'Pivot'){
			var topAxis = refs.ctlTopAxis.getStore();
			var leftAxis = refs.ctlLeftAxis.getStore();
			
			if(topAxis.count() == 0 || leftAxis.count() == 0){
				MessageUtil.warning('Warning', 'pivot.axis');
				return false;
			}		
			
			store = me.getStore(me.MAIN_STORE_PIVOT);
			
		}else if(refs.refAssignedTruckList.activeTab.title == 'List'){
			store = me.getStore(me.MAIN_STORE_NAME)
		}
     	
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
    	if((params.aplyYmd != null && params.aplyYmd != '') && (params.exprYmd == null || params.exprYmd == '')){
     		MessageUtil.warning('warning_msg', 'msgMissingToDt');
     		return;
     	}
     	if((params.aplyYmd == null || params.aplyYmd == '') && (params.exprYmd != null && params.exprYmd != '')){
     		MessageUtil.warning('warning_msg', 'msgMissingFromDt');
     		return;
     	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records != null  && records.length <= 0) {
						MessageUtil.noMatchData();
					}else{
						if(refs.refAssignedTruckList.activeTab.title == 'Pivot'){
							
							var resultItems = new Ext.util.MixedCollection();
							resultItems.addAll(records);
							
							var pivotGrid = refs.ctlPivotGrid;
							me.setPivotMatrix(pivotGrid);
							pivotGrid.getStore().loadRecords(resultItems.items);
				    	}
					}
				}
			}
		});
	},
	
	onSelectSnBlCombo:function(ownObj){
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		var blStore = me.getViewModel().getStore('BLNoList');
		var shippingNoteStore = me.getViewModel().getStore('SNNoList');
		
		if(ownObj == refs.ctlBlno){
			if(refs.ctlSNNo.getValue() != ""){
				refs.ctlSNNo.setValue("");
			}
		}else if(ownObj == refs.ctlSNNo){
			if(refs.ctlBlno.getValue() != ""){
				refs.ctlBlno.setValue("");
			}
		}
	},
	
	onPreview : function() {
		var me = this;
		var refs = me.getReferences();
		
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) 
			return;
		
		if(selection.get("weightCheckYn") == 'Y'){
			if(StringUtil.isNullorEmpty(selection.get("firstWgtTime"))
					|| StringUtil.isNullorEmpty(selection.get("secondWgtTime"))) {
				return;
			}
		}
		
		var searchParm = Ext.create("MOST.model.pdfprint.SearchReportBizParm");
		var params = me.createParam(searchParm, ['file','serviceId','param1']);
		
		params['file'] = me.PDF_FILE; // report format file name
		params['serviceId'] = me.PDF_FUNCTION; // calling function 
		params['branchCode'] = MOST.config.Token.getBranchCode(); // branch code fro multi db
		params['param1'] = selection.get("vslCallId");
		params['param2'] = selection.get("lorryNo");
		params['param3'] = selection.get("gateTxnNo");
		params['param4'] = selection.get("sdoNo");
		params['param5'] = selection.get("grNo");
		params['param6'] = MOST.config.Token.getUserId(); //user Id
		params['param7'] = MOST.config.Token.getUserName();
		
		me.openPDFPreview(params);
		
		me.onUpdateCirYnItem();
	},
	
 	onDropGrid: function(node, data, dropRec, dropPosition) {
        this.onDataChangeSearchParam();
    },
    
	onExportExcelPdfWithServer: function(gridNameString,isExcel){
		var me = this;
		var refs = me.getReferences();
		var searchBizParm = me.getSearchCondition();
		searchBizParm.classID = 'com.tsb.most.biz.parm.monitoring.SearchAssignedTruckParm';
		searchBizParm.serviceID = 'MOST.assignedTruck.selectLorryListItems'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
	

    onSelectMasterBl: function(){
		var me = this;
		var refs = me.getReferences();
		var blCombo = me.getStore('BLNoList');
		
		blCombo.removeAll();
		refs.ctlBlno.setValue('');
		blCombo.load({
			params:{
				vslCallId: refs.ctlVslCallId.getValue(),
				mfDocNo: refs.ctlMasterBlno.getValue()
			}
		});
	},
	
	onUpdateCirYnItem: function(){
		var me = this;
	    var refs = me.getReferences();
	    
	    var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) 
			return;
		
	    var record = Ext.create('MOST.model.operation.CargoArrvDelv');
	    record.set('vslCallId', selection.get("vslCallId"));
	    record.set('gateTxnNo', selection.get("gateTxnNo"));
	    record.set('lorryNo', selection.get("lorryNo"));
	    record.set('cgNo', (selection.get("sdoNo") != '' ? selection.get("blNo") : selection.get("grNo")));
	    record.set('printCirYn', 'Y');
	    record.set('userId', MOST.config.Token.getUserId());
	    
	    
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/assignedtrucklist/cir';
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.UPDATE);
		updateParm.set('userId', MOST.config.Token.getUserId());
		updateParm.set('item', record.data);
		
		updateParm.save({
			success: function(record) {
			}
		});
	},
	
	onTabChange:function(tabPanel, newCard, oldCard, eOpts){
		var me = this;
		var refs = me.getReferences();
		
		if(tabPanel.activeTab.title == 'List'){
			
		}else{
			
		}
		
	},
	  /**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */
	
	/**
	 * GENERAL METHOD START
	 * =========================================================================================================================
	 */
	
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.MAIN_STORE_NAME);
     	var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
     	var pageNo = store.currentPage;
     	var sizePerPage = CommonConstants.PAGE_SIZE;
     	var searchParm = me.getViewModel().get('theSearch');
     	var params = me.createParam(searchParm);
     	var vslCallId = searchParm.data.vslCallId;
     	var scn = searchParm.data.scn;
     	var mfDocId = searchParm.data.mfDocId;
     	var ptnrCd = searchParm.data.ptnrCd;
     	var sNNo = searchParm.data.shipgNoteNo;
     	var lorryNo = searchParm.data.LORRYNO;
     	var aplyYmd = Ext.Date.format(refs.ctlFromDt.getValue(), 'd/m/Y H:i');
     	var exprYmd = Ext.Date.format(refs.ctlToDt.getValue(), 'd/m/Y H:i');
     	var driverNm = searchParm.data.DRIVER;
     	var licenceNo = searchParm.data.LICSNO;
     	var blNo = searchParm.data.blNo;
     	var noGateIO = searchParm.data.noGate;
     	var whLoc = searchParm.data.whLoc;
     	var searchType = refs.rdSearchType.getValue().rqSearchType;
     	var cargoTp = searchParm.data.cargoTp;
     	var unitNo = searchParm.data.unitNo;
     	
     	var delvTpCd = searchParm.data.delvTpCd;
     	var aggregate = searchParm.data.aggregate;
     	
     	if(noGateIO != 'false' && noGateIO != ''){
     		noGateIO = '1';
     	}else{
     		noGateIO = '';
     	}
     	
     	searchParm.set('searchType', searchType);

        //dateCondition = me.checkPeriodDate("ctlFromDt", "ctlToDt", me.MAX_PERIOD_DAY, true);
        
//        if(!dateCondition){
//        	return null;
//        }
        
//    	aplyYmd = dateCondition.fromDtString;
//        exprYmd = dateCondition.toDtString;
     	
     	params['vslCallId'] = vslCallId;
     	params['scn'] = scn;
     	params['mfDocId'] = mfDocId;
		params['ptnrCd'] = ptnrCd;
        params['shipgNoteNo'] = sNNo;
		params['aplyYmd'] = aplyYmd;
		params['exprYmd'] = exprYmd;
		params['lorryNo'] = lorryNo;
		params['driver'] = driverNm;
		params['licsNo'] = licenceNo;
		params['blNo'] = blNo;
		params['noGate'] = noGateIO;
		params['whLoc'] = whLoc;
		params['searchType'] = searchType;
		params['delvTpCd'] = delvTpCd;
		params['cargoTp'] = cargoTp;
		params['unitNo'] = unitNo;
		
		
    	if(refs.refAssignedTruckList.activeTab.title != 'Pivot'){
    		params['pageNo'] = pageNo;
    		params['sizePerPage'] = CommonConstants.PAGE_SIZE;
    	}
    	
		params['']
		
    	return params;
	},
	
    afterSetCodePopupData:function(xtype, targetControl, returnValue){
    	var me = this;
    	var refs = me.getReferences();
    	var searchParm = me.getViewModel().get('theSearch');
    	
    	if(targetControl == 'ctlVslCallId'){
			if(!returnValue) return
    		var masterBlStore = me.getStore('masterBlCombo');
    		var blStore = me.getViewModel().getStore('BLNoList');
			var shippingNoteStore = me.getViewModel().getStore('SNNoList');
			searchParm.set('vslNm', returnValue.item.get('vslNm'));
			refs.ctlScn.setValue(returnValue.item.get('scn'));
			refs.ctlBlno.clearValue();
			refs.ctlSNNo.clearValue();
			
			blStore.removeAll();
			shippingNoteStore.removeAll();
			
			me.getMasterBlCombo();
			me.getBlCombo();
			me.getShippingNoteCombo();
    	}else if(targetControl === 'ctlScn'){ 
			if(returnValue){
				refs.ctlScn.setValue(returnValue.code);

				if(!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))){
					refs.ctlVslCallId.setValue(returnValue.item.get('vslCallId'));
					me.getViewModel().setData({theVslInfo:returnValue.item});
					me.onSearch();
				}else {
					refs.ctlVslCallId.setValue('');
					me.getViewModel().setData({theVslInfo:null});
				}
			} 
		}
    },
    
    getMasterBlCombo: function(){
		var me = this;
		var refs = me.getReferences();
		var masterBlStore = me.getStore('masterBlCombo');
     	
		masterBlStore.removeAll();
		masterBlStore.load({
			params: {
				vslCallId: refs.ctlVslCallId.getValue()
			}
		});
	},
    
    getBlCombo : function(){
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		var blStore = me.getViewModel().getStore('BLNoList');
		
     	var params = {
     		vslCallId : searchParm.get("vslCallId")
     	};
     	
     	blStore.load({
			params: params
		});
	},
	
	getShippingNoteCombo: function(returnValue){
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		var shippingNoteStore = me.getViewModel().getStore('SNNoList');
		var params = {
     		vslCallId : searchParm.get("vslCallId")
     	};
	     	
		shippingNoteStore.load({
			params: params
		});
	},
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
	/**
     * Start Pivot Function====================
     */
	
	onDataChangeSearchParam : function(modelInstance, modifiedFieldNames, me){
    	var me = this;
      	var refs = me.getReferences();
      	
      	var store = null;
      	
      	
    	if(refs.refAssignedTruckList.activeTab.title == 'Pivot'){
        	var pivotGrid = refs.ctlPivotGrid;
    		if(pivotGrid.getStore()){
    			pivotGrid.getStore().clearFilter();
    			pivotGrid.getStore().removeAll();
    		}
    	}else if(refs.refAssignedTruckList.activeTab.title == 'List'){
    		store = me.getStore(me.MAIN_STORE_NAME);
    		store.clearFilter();
    		store.removeAll();
    	}
		
 	},
 	
 	onDropGrid: function(node, data, dropRec, dropPosition) {
        this.onDataChangeSearchParam();
    },
    
    
    getPivotItems : function(){
		var me = this;
		var refs = me.getReferences();
		var columns = GridUtil.getGridColumns("Cargo.Fields.AssignTruck");
		var grid = refs.ctlPivotItems;
		
		var store = me.getViewModel().getStore('pivotItems');
		var arrayItems = new Array();
		columns.forEach(function(record, idx){
			
			var item = Ext.create('MOST.model.common.export.StringValueItem');
			item.set('dbField', record.dbField);
			item.set('text', record.text);
			item.set('itemKey', record.itemKey);
			
			arrayItems.push(item);
			
		})
		
		store.loadRecords(arrayItems);
		store.commitChanges();
			
	},
	
    setPivotMatrix: function(pivotGrid){
		var me = this.getView();
		var refs = me.getReferences();
		
		var matrix = pivotGrid.getMatrix();
		
		matrix.topAxis.dimensions.removeAll();
		matrix.leftAxis.dimensions.removeAll();
		var value = refs.ctlCalculate.getValue();
		
		matrix.aggregate.items[0].setAggregator(value);
		
		
		var topAxis = refs.ctlTopAxis.getStore();
		var topAxisDimensions = matrix.topAxis;
		
		topAxis.each(function(record){
			var topAxisElement = Ext.create('Ext.pivot.dimension.Item',{
				header: record.get('text'),
				dataIndex: record.get('dbField'),
				direction: 'ASC',
			});	
		
			topAxisDimensions.addDimension(topAxisElement);
		});
		
		var leftAxis = refs.ctlLeftAxis.getStore();
		var leftAxisDimensions = matrix.leftAxis;
		
		leftAxis.each(function(record){
			var leftAxisElement = Ext.create('Ext.pivot.dimension.Item',{
				header: record.get('text'),
				dataIndex: record.get('dbField'),
				direction: 'ASC'
			});
			
			leftAxisDimensions.addDimension(leftAxisElement);
		});

	},
	
	onSelectCargoTpCombo: function(){
		var me = this.getView();
		var refs = me.getReferences();
		var cargoTp = me.getViewModel().get('theSearch').get('cargoTp');
		
		if(cargoTp != 'RCV' && cargoTp != '' && cargoTp != null){
			refs.ctlUnitNo.setValue('');
			refs.ctlUnitNo.setHidden(true);
		}else{
			refs.ctlUnitNo.setHidden(false);
		}
	},
	
	onDblClick: function(){
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME); 
		var refs = me.getReferences();
		var selection = refs.refAssignedLorryListGrid.getSelection() == null ? null : refs.refAssignedLorryListGrid.getSelection()[0];
		
		if (selection == null) {
			return;
		}
		
		if (selection.get('cgTpCd') != 'RCV') {
			MessageUtil.warning('warning_msg','msgCannotDblClick');
			return;
		}
		
		me.getViewModel().set('theDetail', selection);
		me.openDetailPopup(selection);
	},
	
	onUnitListDetailLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var unitNoStore = me.getStore('unitNosList'); 
		
		unitNoStore.removeAll();
		unitNoStore.load({
			params:{
				sdoNo: me.getViewModel().get('theDetail').get('sdoNo'),
				grNo: me.getViewModel().get('theDetail').get('grNo'),
				vslCallId: me.getViewModel().get('theDetail').get('vslCallId')
			}
		});
	},
    
	/**
	 * =========================================================================================================================
	 * PIVOT END
	 */
});