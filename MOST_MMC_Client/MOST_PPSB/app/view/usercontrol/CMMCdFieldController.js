Ext.define('MOST.view.usercontrol.CMMCdFieldController', {
	extend: 'MOST.view.foundation.usercontrol.PopupFieldViewController',

	requires: [
		
	],

	alias: 'controller.cmmcdfield',
	
	PREV_VALUE: '',
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	onFocus:function(clt, event, eOpts){
		var me = this;
		me.PREV_VALUE = clt.getValue();
	},
	
	onFieldFocusleave:function(clt, event, eOpts){
		var me = this;
		
		if(me.PREV_VALUE === clt.getValue()){
			return;
		}
		
		var store = me.getStore('commonCodePopup');
		var compareFieldName = "cd";
		var searchParams = {};
		var returnItemFieldNames = {
				code : "scd",
				codeName : "scdNm"
			};
		
		if(me.getView().params){
			var params = me.getView().params;
			searchParams['searchType'] = params['searchType'];
			searchParams['divCd'] = params['searchDivCd'];
			searchParams['lcd'] = params['searchLcd'];
			searchParams['col1'] = params['searchCol1'];
		}
		
		searchParams['reqType'] = 'CD';
		
		me.onValidationCode(store, searchParams, compareFieldName, returnItemFieldNames);
	},
	
	openCodePopup:function(){
		var me = this;
		var popupAlias = null;
		
		if(me.getView().params == null){
			me.getView().params = {};
		}
		
		me.getView().params['cgTpCd'] = me.getView().getCgTpCd();
		me.getView().params['cmdtGrpCd'] = me.getView().getCmdtGrpCd();
		me.getView().params['cmdtCd'] = me.getView().getCmdtCd();

		popupAlias = "popup-cmmcdpopup";	
		
		if(popupAlias){
			var parent = me.getParent(me.getView());
			
			if(me.getView().parent){
				parent = me.getView().parent;
			}
			
			ViewUtil.openCodePopup(parent.getController(), popupAlias, me.getView().reference, me.getView().params, me.afterSetCodePopupData, me);
		}
		
	},
	
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
//	afterSetCodePopupData:function(xtype, targetControl, returnValue, me, parent){
//		var fieldControl = me.lookupReference("ctlField");
//		var params = me.getView().params;
//		
//		if(returnValue.item){
//			if(params['searchType'] == 'IMDG'){
//				fieldControl.setValue(returnValue.item.get("codeName"));
//			}else if(params['searchType'] == 'COMM'){
//				fieldControl.setValue(returnValue.item.get("code"));
//			}else{
//				fieldControl.setValue(returnValue.item.get("cmmdCode"));
//			}
//			
//		} else {
//			fieldControl.setValue("");
//		}
//	}
});