Ext.define('MOST.view.administrator.ListOfFreshWaterController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
        'Ext.exporter.text.CSV',
        'Ext.exporter.text.TSV',
        'Ext.exporter.text.Html',
        'Ext.exporter.excel.Xml',
        'Ext.exporter.excel.Xlsx'
    ],

	alias: 'controller.listoffws',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	DETAILVIEW : 'app-listoffwsdetail',
	MAX_DATE_PERIOD : 30,	// MAX PERIOD DATE
	alertYN : 'N',
	currentTab : 'JPVC',
	MAX_PERIOD_DAY : 62,
	LIST_OF_FW_JPVC_GRID_REF_NAME: 'refListOfFWJpvcGrid',			
	LIST_OF_FW_JPVC_STORE_NAME: 'fwsList',
	LIST_OF_FW_NON_JPVC_GRID_REF_NAME: 'refListOfFWNonJpvcGrid',			
	LIST_OF_FW_NON_JPVC_STORE_NAME: 'fwsNonJpvcList',
	VESSEL_CALL_DETAIL_STORE: 'searchVesselCallDetail',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create('MOST.model.administrator.SearchListOfFreshWaterParm');
		
		me.setDateInDays('ctlFromDtJpvc', -15);
		me.setDateInDays('ctlToDtJpvc',62-15);

		me.setDateInDays('ctlFromDtNonJpvc', -15);
		me.setDateInDays('ctlToDtNonJpvc',62-15);

		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		me.updateViewStyle(me.getView());
	},

	
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	// Search Event Handler
	onSearch: function() {
		var me = this;
		var refs = me.getReferences();
		var store;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.getSearchCondition();
		
		if(me.currentTab == 'JPVC'){
			store = me.getStore('fwsList');
			if(StringUtil.isNullorEmpty(params['vslCallId']) 
					&& (StringUtil.isNullorEmpty(params['splyStDt'])
							|| StringUtil.isNullorEmpty(params['splyEndDt']))
			){
				MessageUtil.warning("warning_msg", "fws_jpvc_inquiry_msg");
				return;
			}
		}    
		else {
			store = me.getStore('fwsNonJpvcList');
			if(StringUtil.isNullorEmpty(params['splyStDt'])
					|| StringUtil.isNullorEmpty(params['splyEndDt'])
			){
				MessageUtil.warning("warning_msg", "fws_nonjpvc_inquiry_msg");
				return;
			}
		}
			
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					// SUCCES
				}
			}
		});
	},

	onRefresh:function(){
		var me = this;
		var refs = me.getReferences();
		var store = this.getStore(me.MAIN_STORE_NAME);
		var masterBlStore = this.getStore('masterBlItems');
		var fwlJpvcStore = this.getStore(me.LIST_OF_FW_JPVC_STORE_NAME);
		var fwlNonJpvcStore = this.getStore(me.LIST_OF_FW_NON_JPVC_STORE_NAME);
		
		refs.ctlFromDtJpvc.setValue("");
		refs.ctlToDtJpvc.setValue("");
		refs.ctlFromDtNonJpvc.setValue("");
		refs.ctlToDtNonJpvc.setValue("");
		refs.ctlVslCallId.setValue("");
		refs.ctlScn.setValue("");
		
		fwlJpvcStore.removeAll();
		fwlNonJpvcStore.removeAll();
		me.onLoad();
	},

	onTabChange : function(tabPanel, newCard, oldCard, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var tabName = tabPanel.getActiveTab().name.trim();
		var generalCargoStore =me.getStore(me.MAIN_STORE_NAME); 
		var roroStore = me.getStore(me.RORO_STORE_NAME);
		switch(tabName) {
			case 'Non-JPVC':
				refs.ctlVslCallId.setValue("");
				break;
		}
		me.currentTab = tabName;
	},

	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		
		var refs = me.getReferences();
		
		if(targetControl === 'ctlVslCallId'){
			if(returnValue){
				refs.ctlFromDtJpvc.setValue('');
				refs.ctlToDtJpvc.setValue('');
				
				refs.ctlFromDtJpvc.allowBlank = true;
				refs.ctlToDtJpvc.allowBlank = true;
				
				refs.ctlScn.setValue(returnValue.item.get('scn'));
			}
		};
		
		if(targetControl === 'ctlScn'){ 
			if(returnValue){
				refs.ctlScn.setValue(returnValue.code);

				if(!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))){
					// refs.ctlFromDtJpvc.setValue('');
					// refs.ctlToDtJpvc.setValue('');
					
					// refs.ctlFromDtJpvc.allowBlank = true;
					// refs.ctlToDtJpvc.allowBlank = true;
					refs.ctlVslCallId.setValue(returnValue.item.get('vslCallId'));
					//me.onSearch();
				}else {
					refs.ctlFromDtJpvc.setValue('');
					refs.ctlToDtJpvc.setValue('');
					
					refs.ctlFromDtJpvc.allowBlank = true;
					refs.ctlToDtJpvc.allowBlank = true;
					refs.ctlVslCallId.setValue('');
				}
			} 
		}
	},
	onDetailLoad:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var searchVesselCallDtl = me.getViewModel().getStore(me.VESSEL_CALL_DETAIL_STORE);

		
		var recvData = detailView.items.get(0).recvData;
		//var recvData = me.getView().recvData;
		
		var vslCallId = recvData.get('vslCallId');
		
		me.getViewModel().setData({fwsRequestDetail:recvData.getData()});
		
		if(vslCallId == 'STRG'){
			refs.refRadioNonJpvc.setValue(true);
		}
		
		if(!StringUtil.isNullorEmpty(vslCallId)){
			searchVesselCallDtl.load({
				params:{
					vslCallId: vslCallId
				},
				callback:function(records, success, operation){
					if(success){
						if(records.length > 0){
							me.getViewModel().setData({vslDetail:records[0].getData()});
						}
						
					}
				}
			})
		}
		me.updateViewStyle(me.getDetailBizView());
	},
	onDetailSave:function(){
		
	},

	onJpvcRadioDetailChange:function(obj, newValue, oldValue, eOpts){
		var me = this;
		var refs = me.getReferences();
		var fwsRequestDetail = me.getViewModel().getData().fwsRequestDetail;
		
		if(newValue.rb == 'nonjpvc'){
			refs.refTxtJpvc.setReadOnly(true);
			fwsRequestDetail.vslCallId = 'STRG';
		}else{
			refs.refTxtJpvc.setReadOnly(false);
		}
		
	},
	
	// Grid Row Double
	onDblClick:function() {
		var me = this;
		var grid;
		if(me.currentTab == 'JPVC'){
			grid = me.lookupReference(me.LIST_OF_FW_JPVC_GRID_REF_NAME);
		}
		else {
			grid = me.lookupReference(me.LIST_OF_FW_NON_JPVC_GRID_REF_NAME);
		}
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		me.openDetailPopup(selection);
	},
	
// 	/**
// 	 * EVENT HANDLER END
// 	 * =========================================================================================================================
// 	 */
	
// 	/**
// 	 * =========================================================================================================================
// 	 * GENERAL METHOD START
// 	 */
	// Search Condition
	getSearchCondition : function(){
		var me = this;
		var refs = me.getReferences();
		var store;
		var grid;
		var pageNo;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		var dateCondition = null;

		if(me.currentTab == 'JPVC'){
			dateCondition = me.checkPeriodDate('ctlFromDtJpvc', 'ctlToDtJpvc', me.MAX_PERIOD_DAY, true);
			store = me.getStore(me.LIST_OF_FW_JPVC_STORE_NAME);
			grid = me.lookupReference(me.LIST_OF_FW_JPVC_GRID_REF_NAME);
			pageNo = store.currentPage;
			
			searchType = 'List';
		}
		else {
			searchType = 'ListNonJPVC';
			store = me.getStore(me.LIST_OF_FW_NON_JPVC_STORE_NAME);
			grid = me.lookupReference(me.LIST_OF_FW_NON_JPVC_GRID_REF_NAME);
			pageNo = store.currentPage;

			dateCondition = me.checkPeriodDate('ctlFromDtNonJpvc', 'ctlToDtNonJpvc', me.MAX_PERIOD_DAY, true);
		}
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
		params['searchType'] = searchType;
		params['vslCallId'] = searchParm.data.vslCallId;
		params['scn'] = searchParm.data.scn;
		params['splyStDt'] = dateCondition.fromDtString;;
		params['splyEndDt'] = dateCondition.toDtString;
		
		return params;
	},
	// Date Change Event
	onDateChangeNonJpvc:function( control, newValue, oldValue, eOpts ) {
		var me = this;
		var refs = me.getReferences();
		var toDate = refs.ctlToDtNonJpvc.getValue();
		var fromDate = refs.ctlFromDtNonJpvc.getValue();
        var Difference_In_Time = null; 
        var Difference_In_Days = null; 
        
        if(control.reference === refs.ctlFromDtNonJpvc.reference){
			Difference_In_Time = toDate.getTime() - control.getValue().getTime();
			Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)-1;
			  
			if (Difference_In_Days > 61){
				me.setDateInDaysByDate('ctlToDtNonJpvc', me.MAX_PERIOD_DAY, control.getValue());
			}
		} else {
			Difference_In_Time = control.getValue().getTime() - fromDate.getTime();
			Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)-1;
			   
			if (Difference_In_Days > 61){
				me.setDateInDaysByDate('ctlFromDtNonJpvc', -me.MAX_PERIOD_DAY, control.getValue());
			} 
		}
	},
	onDateChangeJpvc:function( control, newValue, oldValue, eOpts ) {
		var me = this;
		var refs = me.getReferences();
		var toDate = refs.ctlToDtJpvc.getValue();
		var fromDate = refs.ctlFromDtJpvc.getValue();
        var Difference_In_Time = null; 
        var Difference_In_Days = null; 
        
        if(control.reference === refs.ctlFromDtJpvc.reference){
			Difference_In_Time = toDate.getTime() - control.getValue().getTime();
			Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)-1;
			  
			if (Difference_In_Days > 61){
				me.setDateInDaysByDate('ctlToDtJpvc', me.MAX_PERIOD_DAY, control.getValue());
			}
		} else {
			Difference_In_Time = control.getValue().getTime() - fromDate.getTime();
			Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)-1;
			   
			if (Difference_In_Days > 61){
				me.setDateInDaysByDate('ctlFromDtJpvc', -me.MAX_PERIOD_DAY, control.getValue());
			} 
		}
	},
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		if(me.currentTab == 'JPVC'){
			gridNameString = me.LIST_OF_FW_JPVC_GRID_REF_NAME;
		}else{
			gridNameString = me.LIST_OF_FW_NON_JPVC_GRID_REF_NAME;
		}
		
		searchBizParm.classID = 'com.tsb.most.basebiz.parm.administrator.SearchFreshWaterServiceParm';
		searchBizParm.serviceID = 'MOST.freshWaterService.selectFreshWaterServiceItems'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},

// 	/**
// 	 * GENERAL METHOD END
// 	 * =========================================================================================================================
// 	 */
});