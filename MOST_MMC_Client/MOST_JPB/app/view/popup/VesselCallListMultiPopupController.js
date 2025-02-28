Ext.define('MOST.view.popup.VesselCallListMultiPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.vesselcalllistmultipopup',	
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MIN_DATE_PERIOD : 31,	// MIN PERIOD DATE
	MAX_DATE_PERIOD : 31,   // MAX PERIOD DATE
	MAX_PERIOD_DAY : 62,
	MAIN_GRID_REF_NAME: 'refvesselCallListPopupGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'vesselCallListPopupStore',	
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
		var store = me.getStore(me.MAIN_STORE_NAME);
		var dataItem = me.getView().recvData.data;
		if(dataItem != undefined){
			refs.txtVesselResult.setValue(dataItem);
		}
			
		if(me.getView().recvData){
			me.onSearch();
		}
	},
	
	// Search Event Handler
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore(me.MAIN_STORE_NAME);
    	var params = me.getSearchCondition();
    	
    	var vesselString = refs.txtVesselResult.getValue();

    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						Ext.each(records, function(item){
							if(vesselString.indexOf(item.data.vslCd)!==-1){
								item.set({chkCdNm:1});
							}
								
						});
						store.commitChanges();
					}
				}
			}
		});
	},

	// Grid Row Double
	onDblClick: function() {
		var me = this;
		var window = me.getView().up('window');
		
    	window.returnValue = me.getReturnData();
       	window.close();
	},

	// Store Filter
	onStoreFilter : function(field, newValue, oldValue){
		var me = this;
		var refs = me.getReferences();
		
    	var store = me.getStore(me.MAIN_STORE_NAME);
    	
    	store.clearFilter();
    	
    	field.setValue(newValue.toUpperCase());
	},
	
	onDateChange:function( control, newValue, oldValue, eOpts ) {
		var me = this;
		var refs = me.getReferences();
		
		if(control == refs.refEtaFromDt){
			me.setDateInDaysByDate("refEtaToDt", me.MAX_PERIOD_DAY, control.getValue());
		} else {
			me.setDateInDaysByDate("refEtaFromDt", -me.MAX_PERIOD_DAY, control.getValue());
		}
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
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
		var inputVslCd = refs.txtVslCd.getValue().toUpperCase();
		var inputVslNm = refs.txtVslNm.getValue().toUpperCase();
		var inputCallSign = refs.txtCallSign.getValue().toUpperCase();

		var params = {
			vslCd : inputVslCd,
			vslNm : inputVslNm,
			callSign : inputCallSign
		}
    	
    	return params;
	},
	
	// Returns the popup result.
	getReturnData:function(){
		var me = this;
		var refs = me.getReferences();
		var codes = refs.txtVesselResult.getValue();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var storeTotal = store.totalCount;
		var cnt = 0;
		var selectCmmCdArray = new Array();
		
    	if(codes === ''){
			if(storeTotal > 0){
				store.each(function(record,idx){
					if(record.data.chkCdNm === 1) {
						if(storeTotal > cnt ){
							record.set('chkCdNm', 0);
						}
						cnt++;
					}
				});
			}
			store.commitChanges();
			refs.txtVesselResult.setValue('');
		} else {
			if(storeTotal > 0){
				store.each(function(record,idx){
					if(record.data.chkCdNm === 1) {
						if(storeTotal > cnt ){
							selectCmmCdArray.push(record.data);
						}
						cnt++;
					}
				});
			}
		}
    	
		var returnItem = {
			code : codes,
			item: selectCmmCdArray
		}
		
		return returnItem;
	},
	onClear:function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		store.each(function(record, idx){
			if(record.data.chkCdNm === 1)
				record.set('chkCdNm', 0);
		});
		refs.txtVesselResult.setValue('');
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
	onAlignClick:function(vslNmSortCd){
		var me = this;
		var refs = me.getReferences();
		var inputVslCd = refs.txtVesselResult.getValue().toUpperCase();
		var store = me.getStore(me.MAIN_STORE_NAME);
		
		store.load({
			params: {
				vslCd: inputVslCd,
				vslNm: vslNmSortCd
			},
			callback: function(records, operation, success) {
				if (success) {
				}
			}
		});
	},
	
	
	onCommonCodeForMultiCheckChange: function(chkbox, rowIdx, checked, record, e, eOpts){
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var refs = me.getReferences();
		
		if (checked) {
			record.set({
				chkCdNm: 1
			});
		} else {
            record.set({
            	chkCdNm: 0
            });
		}
		store.commitChanges();		
	},
	
	onSet: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);	
		var setChkCdNmValue = '';
		var cnt = 0;
		var storeTotal = store.totalCount;
		
		store.each(function(record,idx){
			if(record.data.chkCdNm === 1) {
				if(storeTotal > cnt ){
					if(setChkCdNmValue === ''){
						setChkCdNmValue = record.data.vslCd
					} else {
						setChkCdNmValue += "," + record.data.vslCd
					}
				}
				cnt++;
			}
		});
		refs.txtVesselResult.setValue(setChkCdNmValue);
	},
	
	
	onUpdate: function(){
		var me = this;
		var window = me.getView().up('window');
    	window.returnValue = me.getReturnData();
       	window.close();
	}
});