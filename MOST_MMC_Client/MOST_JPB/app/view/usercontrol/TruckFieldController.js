Ext.define('MOST.view.usercontrol.TruckFieldController', {
	extend: 'MOST.view.foundation.usercontrol.PopupFieldViewController',

	requires: [
		
	],

	alias: 'controller.truckfield',
	
	oldValuePtnrCd: '',
	
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
		
		var store = me.getStore('assignmentTruckListPopup');
		var fieldControl = me.lookupReference("ctlField");
		var compareFieldName = "lorryNo";
		var params = {};
		var returnItemFieldNames = {
			code : "lorryNo",
			codeName : "lorryNo"
		};
		
		if(me.getView().params){
			params = me.getView().params;
		}
		
		
		if(fieldControl.getValue() != '' && fieldControl.getValue().length < 3){
			MessageUtil.warning('warning_msg', "lorryspopup_fieldfocusleave_warning_msg");
			return;
		} 
		
		params["searchType"] = "popUpList";
		params["divCd"] = params["searchDivCd"];
		
		if(params["divCd"] != null && params["divCd"] == "IN-GATE") {
			store = me.getStore('gateInTruckListPopup');
		}
		else if(params["divCd"] != null && params["divCd"] == "YT") {
			store = me.getStore('assignmentYardTruckListPopup');
		}
		else if(params["divCd"] != null && params["divCd"] == "APRON") {
			store = me.getStore('apronYardTruckListPopup');
		}
		else {
			store = me.getStore('assignmentTruckListPopup');
		}
		
		me.onValidationCode(store, params, compareFieldName, returnItemFieldNames);
	},
	
	openCodePopup:function(){
		var me = this;
		var popupAlias = null;
		var fieldControl = me.lookupReference("ctlField");
		
		if(me.getView().params == null){
			me.getView().params = {};
		}
		
		me.getView().params['ptnrCd'] = me.getView().getPtnrCd();
		me.getView().params['vslCallId'] = me.getView().getVslCallId();
		me.getView().params['shipgNoteNo'] = me.getView().getShipgNoteNo();
		me.getView().params['blNo'] = me.getView().getBlNo();
		me.getView().params['grNo'] = me.getView().getGrNo();
		me.getView().params['subDoNo'] = me.getView().getSubDoNo();
		me.getView().params['lorryNo'] = me.getView().getLorryNo();
		me.getView().params['isMultiCargo'] = me.getView().getIsMultiCargo();
		me.getView().params['searchDivCd'] = me.getView().getSearchDivCd();
		me.getView().params['isAutoLoad'] = me.getView().getIsAutoLoad();
		me.getView().params['weightCheckYn'] = me.getView().getWeightCheckYn();
		me.getView().params['searchType'] = me.getView().getSearchType();
		me.getView().params['cgTpCd'] = me.getView().getCgTpCd();
		me.getView().params['searchDelvTp'] = me.getView().getSearchDelvTp();
		me.getView().params['isOpeChk'] = me.getView().getIsOpeChk();
		
		if(me.getView().params['searchDivCd'] == 'IN-GATE'){
			me.getView().params.title = 'In-Gate Truck List';
			popupAlias = "popup-gateintruckpopup";
		}else if(me.getView().params['searchDivCd'] == 'IN-GATE-RCV'){
			me.getView().params.title = 'In-Gate Truck List';
			me.getView().params['cgTpCd'] = 'RCV';
			popupAlias = "popup-gateintruckpopup";
		}else if(me.getView().params['searchDivCd'] == 'YT'){
			me.getView().params.title = 'Assignment Yard Truck List';
			popupAlias = "popup-assignmentyardtruckpopup";
		}
		else if(me.getView().params['searchDivCd'] == 'APRON'){
			me.getView().params.title = 'Internal Truck List (Apron)';
			popupAlias = "popup-apronyardtruckpopup";
		}else if(me.getView().params['searchDivCd'] == 'ASSIGNMENT-TRUCK-RCV'){
			me.getView().params.title = 'Assignment Truck List For RORO';
			me.getView().params['cgTpCd'] = 'RCV';
			popupAlias = "popup-assignmenttruckpopup";

		}
		else {
			me.getView().params.title = 'Assignment Truck List';
			me.getView().params['cgTpCd'] = '';
			popupAlias = "popup-assignmenttruckpopup";
		}
		
		
		
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
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue, me, parent){
		var fieldControl = me.lookupReference("ctlField");
		if(returnValue){
			fieldControl.setValue(returnValue.code);
		} else {
			fieldControl.setValue("");
		}
	}
});