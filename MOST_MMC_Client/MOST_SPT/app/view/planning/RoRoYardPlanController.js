Ext.define('MOST.view.planning.RoRoYardPlanController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.roroyardplan',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refRoRoYardPlanCargoGrid',
	MAIN_STORE_NAME: 'roroYardPlanCargoItems',
	remainVin: 0,
	cgIndex: 0,

	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 * 
	 * 
	 * /**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create('MOST.model.planning.SearchRoRoYardPlanParm');
		
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch:searchParm});
	},
	
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	onSearchBtn: function() {
		var me = this;
     	me.onSearch();
	},
	
	// Search Event Handler
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore(me.MAIN_STORE_NAME);
    	var params = me.getSearchCondition();
    	var cgGrid = me.lookupReference(me.MAIN_GRID_REF_NAME);
    	
    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					}
					else {
						cgGrid.getSelectionModel().select(me.cgIndex);
						me.onCargoGridItemClick();
					}
				}
			}
		});
	},
	
	onCargoGridItemClick:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		me.remainVin = Number(selection.get('remainUnit'));
		me.cgIndex = grid.store.indexOf(selection);
		
		me.getUnitItems(selection);
		me.getPlanItems(selection);
	},
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.planning.SearchRoRoYardPlanParm';
		searchBizParm.serviceID = 'MOST.roroYardPlan.selectRoRoYardPlanList'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
	
	onAdd_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		var invalidStr = "";
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var unitStore = me.getStore('roroYardPlanUnitItems');
		var unitList = unitStore.getData();
		var planQty = refs.txtPlannedQty.getValue();
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		if(StringUtil.isNullorEmpty(refs.txtLocId.getValue())){
			MessageUtil.warning("warning_msg", "mandatoryField_msg", ViewUtil.getLabel('WHLocId'));
			return;
		}
		
		if(StringUtil.isNullorEmpty(refs.txtPlannedQty.getValue()) && me.checkBeforeAdd() == false){
			MessageUtil.warning("warning_msg", "mandatoryField_msg", ViewUtil.getLabel('qty'));
			return;
		}
		
		updateParm.getProxy().url = unitStore.getProxy().url;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		updateParm.set('items', new Array());
		
		if(planQty &&  planQty > 0){
			if(planQty > me.remainVin){
				MessageUtil.warning("warning_msg", "msgPN133001", remainVin);
				return;
			}
			
			var vinCnt = 0;
			
			for(var i = 0; i < unitList.length; i++){
				if(vinCnt >= planQty)
					break;
				else{
					if(unitList.getAt(i).get('yardLoc') == null || unitList.getAt(i).get('yardLoc') == ""){
						unitList.getAt(i).set('yardLoc', refs.txtLocId.getValue());
						unitList.getAt(i).set('workingStatus', WorkingStatus.UPDATE);
						unitList.getAt(i).set('userId', Token.getUserId());
						updateParm.get('items').push(unitList.getAt(i).data);
						
						vinCnt++;
					}
				}
			}
		} else {
			for(var i = 0; i < unitList.length; i++){
				if(unitList.getAt(i).get('chk') == true){
					unitList.getAt(i).set('yardLoc', refs.txtLocId.getValue());
					unitList.getAt(i).set('workingStatus', WorkingStatus.UPDATE);
					unitList.getAt(i).set('userId', Token.getUserId());
					
					updateParm.get('items').push(unitList.getAt(i).data);
				}
			}
		}
		
		updateParm.save({
			success : function(record, operation) {
				unitStore.commitChanges();
				MessageUtil.saveSuccess();
				
				me.onSearch();
			}
		});
	},
	
	checkBeforeAdd: function(){
		var me = this;
		var flag = false;
		var unitStore = me.getStore('roroYardPlanUnitItems');
		var unitList = unitStore.getData();
		
		for(var i = 0; i < unitList.length; i++){
			if(unitList.getAt(i).get('chk') == true){
				flag = true;
			}
		}
		
		return flag;
	},
	
	
	onRemove_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var unitStore = me.getStore('roroYardPlanUnitItems');
		var unitList = unitStore.getData();
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		updateParm.getProxy().url = unitStore.getProxy().url;
		updateParm.phantom = false;
		updateParm.drop();
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
		updateParm.set('items', new Array());
		
		for(var i = 0; i < unitList.length; i++){
			if(unitList.getAt(i).get('chk') == true){
				unitList.getAt(i).set('workingStatus', WorkingStatus.DELETE);
				unitList.getAt(i).set('userId', MOST.config.Token.getUserId());
				
				updateParm.get('items').push(unitList.getAt(i).data);
			}
		}
		
		if(updateParm.get('items').length > 0) {
			updateParm.save({
				success : function(record, operation) {
					unitStore.commitChanges();
					MessageUtil.saveSuccess();
					
					me.onSearch();
				}
			});
		}
	},
	
	onClear_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		
		refs.txtLocId.setValue();
		refs.txtPlannedQty.setValue();
	},
	
	onChecked : function (chkbox, rowIdx, checked, record, e, eOpts) {
		if (checked) {
            record.data.chk = true;
        } else {
            record.data.chk= false;
        }
    },
    
	onWarehouseAllocation : function(controlName){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var cgItem = grid.getSelection() == null ? null : grid.getSelection()[0];
		var title = 'Warehouse Allocation';
		var selection;
		
		if(cgItem == null) return;
	
		selection = Ext.create('MOST.model.operation.CargoHandlingIn', {
			vslCallId: refs.ctlJpvc.getValue(),
			whTpCd: CodeConstants.INVLOC_WH_TP_NORMAL,
			cgNo: cgItem.get("cgNo")
		});
		
		me.openCodePopup('app-warehouseofroro',controlName, selection);
	},
	
	onSelectSNBL: function(){
		var me = this;
		var refs = me.getReferences();
		var unitNoCombo = me.getViewModel().get('unitNoCombo');
		var theSearch = me.getViewModel().get('theSearch');
		
		unitNoCombo.load({
			params:{
				blNo: theSearch.get('blNo'),
				shipgNoteNo: theSearch.get('shipgNoteNo')
			}
		});
	},
	
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	// Search Condition
	getSearchCondition:function(){
		var me = this;
     	var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');

		if(searchParm){
			var params = me.createParam(searchParm);
			
			params['vslCallId'] = StringUtil.toUpperCase(searchParm.data.vslCallId);
			params['blNo'] = StringUtil.toUpperCase(searchParm.data.blNo);
			params['shipgNoteNo'] = StringUtil.toUpperCase(searchParm.data.shipgNoteNo);
			params['unitNo'] = StringUtil.toUpperCase(searchParm.data.unitNo);
			params['userId'] = MOST.config.Token.getUserId();
			
			return params;
		}
		
    	return null;   	
	},
	
	getComboMasterItem: function(){
		var me = this;
		var refs = me.getReferences();
		var theVslInfo = me.getViewModel().get('theVslInfo');
		
		if(theVslInfo){
			var blCombo = me.getStore('blCombo');
			var shippingNoteCombo = me.getStore('shippingNoteCombo');
			
			blCombo.load({
				params:{
					vslCallId:theVslInfo.get('vslCallId')
				}
			});
			shippingNoteCombo.load({
				params:{
					vslCallId:theVslInfo.get('vslCallId')
				}
			});
		}
	},
	
	getUnitItems: function(record){
		var me = this;
		var refs = me.getReferences();
		
		if(record){
			var unitStore = me.getStore('roroYardPlanUnitItems');
			
			unitStore.load({
				params : {
					vslCallId:record.get('vslCallId'),
					cgNo:record.get('cgNo'),
					ixCd: record.get('ixCd')
				}
			});
		}
	},
	
	getPlanItems: function(record){
		var me = this;
		var refs = me.getReferences();
    	var store = me.getStore('roroYardPlannedItems');
    	
		store.load({
			params : {
				vslCallId:record.get('vslCallId'),
				cgNo:record.get('cgNo')
			}
		});
	},

	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		var theSearch = me.getViewModel().get('theSearch');
		
		if(targetControl === 'ctlJpvc'){
			if(returnValue){
				var unitNoCombo = me.getStore('unitNoCombo');
				
				theSearch.set('blNo', null);
				theSearch.set('shipgNoteNo', null);
				theSearch.set('unitNo', null);
				
				unitNoCombo.removeAll();
				me.getViewModel().setData({theVslInfo:returnValue.item});
				me.getComboMasterItem();
			} else {
				var blCombo = me.getStore('blCombo');
				var snCombo = me.getStore('shippingNoteCombo');

				me.getViewModel().setData({theVslInfo:null});
				
				blCombo.loadData([],false);
				refs.ctlBlNo.reset();
				
				snCombo.loadData([],false);
				refs.ctlSNNo.reset();
			}
		} else {
			refs.txtLocId.setValue(returnValue.data.locId);
		}
	}
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
});