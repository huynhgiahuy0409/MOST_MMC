Ext.define('MOST.view.operation.LorryListController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [],

	alias: 'controller.lorrylist',

	MAX_PERIOD_DAY : 7,

	onLoad: function(){
		var me = this;
		me.setDateInDays("ctlFromDt");
		me.setDateInDays("ctlToDt",7);
	},

	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	
	onDateChange:function(control) {
		var me = this;
		var refs = me.getReferences();
		
		if(control == refs.ctlFromDt){
			me.setDateInDaysByDate("ctlToDt", me.MAX_PERIOD_DAY, control.getValue());
		} else {
			me.setDateInDaysByDate("ctlFromDt", -me.MAX_PERIOD_DAY, control.getValue());
		}
	},

	onTextFieldChange: function(control, newValue){
		control.setValue(newValue.toUpperCase());
		if(control.reference === 'ctlSNNo'){
			this.lookupReference('ctlLABLNo').setValue('');
		} else if(control.reference === 'ctlLABLNo'){
			this.lookupReference('ctlSNNo').setValue('');
		}
	},

	onSearch: function() {
		var me = this;
    	var store = me.getStore('lorryList');
		var params = me.getSearchCondition();
		
		if( params.valid != null  && !params.valid) {
			MessageUtil.warning('warning_msg', 'lorrylisthht_valid_msg');
			return;
		}
    	
    	if(params == null){
    		return;
    	}
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
					}
				}
			}
		});
	},
	
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var transporter = refs.ctlTsptrOrigin.getValue();
     	var sNNo = refs.ctlSNNo.getValue();
     	var lorryNo = refs.ctlLorryNo.getValue();
     	var aplyYmd = refs.ctlFromDt.getValue();
     	var exprYmd = refs.ctlToDt.getValue();
     	var driverNm = refs.ctlLADriverNm.getValue();
     	var licenceNo = refs.ctlLicenceNo.getValue();
     	var blNo = refs.ctlLABLNo.getValue();
		var noGateIO = refs.ctlNoGateIO.getValue();
		 
		if(Ext.platformTags.modern) {
			var form = me.getView().down('formpanel');
			if( !form.isValid() ) 
				return { 
					valid: false
				}
		}
     	
     	if(noGateIO != false){
     		noGateIO = '';
     	}else{
     		noGateIO = 'noGate';
     	}
     	
        if(refs.ctlFromDt.getValue() != null && refs.ctlToDt.getValue() != null){
        	if(Ext.isModern
				&& me.validateFromToDate(new Date(refs.ctlFromDt.getValue()),
					new Date(refs.ctlToDt.getValue()))
			){
				aplyYmd = refs.ctlFromDt.getDate().replaceAll("-", "/");
				exprYmd = refs.ctlToDt.getDate().replaceAll("-", "/");
        	} else {
				dateCondition = me.checkPeriodDate("ctlFromDt", "ctlToDt", me.MAX_DATE_ALLOW, true);
				aplyYmd = dateCondition.fromDtString;
				exprYmd = dateCondition.toDtString;
			}
          }
     	var searchType = 'lorryList';
    	var params = {
			ptnrCd : transporter,
    		SNNO: sNNo,
			aplyYmd : aplyYmd,
			exprYmd : exprYmd,
			LORRYNO: lorryNo,
			DRIVER: driverNm,
			LICSNO: licenceNo,
			BLNO: blNo,
			noGate: noGateIO,
    		searchType: searchType
		};
    	
    	return params;
	},
	
    exportTo: function(btn) {
    	var me = this;
    	var refs = me.getReferences();
    	
        var cfg = Ext.merge({
            title: ' Lorry List',
            fileName: '_Lorry_List' + '.' + (btn.cfg.ext || btn.cfg.type)
        }, btn.cfg);

        var grid = refs.refLorryListGrid;
        grid.saveDocumentAs(cfg);
    },


	/**
	 * =========================================================================================================================
	 *  * HHT METHOD START
	 */

	onTsptrBtnClicked: function(){
		var me = this;
		var refs = me.getReferences();
		var ptyCd = refs.ctlTsptrOrigin.getValue();
		var params = {
			title: 'Transporter',
			ptyCd: ptyCd,
		};
		ViewUtil.openCodePopup(this, 'app-requesterpopuphht', 'ctlTsptrOrigin', params);
	},

	onNoGateIOCbChangedHHT: function(el, newValue){
		el.setValue(newValue);
	}

	/**
	 * HHT METHOD END
	 * =========================================================================================================================
	 */
});