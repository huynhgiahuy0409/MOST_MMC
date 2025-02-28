Ext.define('MOST.view.document.DocumentationClearanceStatusController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.docclearancestatus',
	
	MAX_PERIOD_DAY : 28,
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onLoad:function(){
		var me = this;
		var refs = me.getReferences();
		
		me.setDateInDays("ctlFromDt",-14);
	},
	
	// Initialize Control
	onRefresh:function(){
		var me = this;
		var refs = me.getReferences();
		
		refs.ctlVessel.setValue("");
		refs.ctlPartnerCode.setValue("");
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
    	var store = me.getStore('documentationClearanceStatus');
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
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
	
	onChangeTagField: function(obj,newVal,oldVal, index){
		var me = this;
		var refs = me.getReferences();
		
		if (newVal=='' || newVal ==null) return;
		
		refs.ctlTagFieldValue.setValue(newVal);
	},
	
	// ROW 1 Popup Controller ===================================================================================================
	openJPVCPopup:function(){
		var me = this;
		me.openCodePopup('popup-jpvcpopup', 'ctlVessel');
	},
	
	openSaPopup:function(){
		var me = this;
		var params = {
			searchDivCd: 'SHA' 
		}
		me.openCodePopup('popup-partnercdpopup', 'ctlSa', params);
	},
	
	// Date Change Event
	onDateChange:function( control, newValue, oldValue, eOpts ) {
		var me = this;
		var refs = me.getReferences();
//		refs.ctlVessel.setValue('');
		if(control == refs.ctlFromDt){
			me.setDateInDaysByDate("ctlToDt", me.MAX_PERIOD_DAY, control.getValue());
		} else {
			me.setDateInDaysByDate("ctlFromDt", -me.MAX_PERIOD_DAY, control.getValue());
		}
	},
	
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var vslCallId = refs.ctlVessel.getValue();
     	var scn = refs.ctlScn.getValue();
     	var saId = refs.ctlSa.getValue();
     	var dateCondition = null;
     	
//     	var etaFrom = '';
//     	var etaTo = '';
     	
     	if(StringUtil.isNullorEmpty(vslCallId) && StringUtil.isNullorEmpty(scn)){
    		if(refs.ctlFromDt.getValue() == null || refs.ctlFromDt.getValue() == "" || refs.ctlToDt.getValue() == null || refs.ctlToDt.getValue() == "" ){
    			refs.ctlFromDt.reset();
    			me.setDateInDays('ctlFromDt');
    			MessageUtil.warning("Documentation Clearance Status", "documentationClearanceStatus_search_null_msg");
    			return;
    		}
    		dateCondition = me.checkPeriodDate('ctlFromDt', 'ctlToDt', me.MAX_PERIOD_DAY, true);
    	}else{
    		refs.ctlFromDt.reset();
    		refs.ctlToDt.reset();
    	}
     	
    	var params = {
    		scn: scn,
    		vslCallId : vslCallId,
    		saId : saId
//    		etaFrom: etaFrom,
//    		etaTo: etaTo
		};
    	if(dateCondition != null){
    		params['etaFrom'] = dateCondition.fromDtString;
    		params['etaTo'] = dateCondition.toDtString;
    	}
    	
    	return params;
	},
	
	exportTo: function(btn) {
    	var me = this;
    	var refs = me.getReferences();
    	
        var cfg = Ext.merge({
            title: 'Documentation Clearance Status',
            fileName: 'DocumentationClearanceStatus' + '.' + (btn.cfg.ext || btn.cfg.type)
        }, btn.cfg);

        var grid = refs.refDocumentationClearanceStatusGrid;
        grid.saveDocumentAs(cfg);
    },
    
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl == 'ctlVessel'){ 
			if(returnValue){
				refs.ctlFromDt.setValue('');
				refs.ctlToDt.setValue('');
				me.getViewModel().setData({theVslInfo:returnValue.item});
				refs.ctlVessel.setValue(returnValue.item.get('vslCallId'));
				refs.ctlScn.setValue(returnValue.item.get('scn'));
			} else {
				me.getViewModel().setData({theVslInfo:null});
			}
		} else if(targetControl === 'ctlScn'){ 
			if(returnValue){
				refs.ctlFromDt.setValue('');
				refs.ctlToDt.setValue('');
				refs.ctlScn.setValue(returnValue.code);

				if(!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))){
					refs.ctlVessel.setValue(returnValue.item.get('vslCallId'));
					me.getViewModel().setData({theVslInfo:returnValue.item});
				}else {
					refs.ctlVessel.setValue('');
					me.getViewModel().setData({theVslInfo:null});
				}
			} 
		}
		
	},
});