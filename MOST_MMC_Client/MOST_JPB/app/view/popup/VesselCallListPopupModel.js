Ext.define('MOST.view.popup.VesselCallListPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.vesselcalllistpopup',

	requires: [
	],
	
	formulas:{
		fmlStorageVslCheck:{
			bind:{

			},
			get:function(value){
				var me = this;
				if(value === 'Y'){
					return true; 
				} else {
					return false;
				}
			},
	
			set: function(value){
				var me = this;
				var strValue = 'N';
				if(value){
					strValue = 'Y';
				}
				var theSearch = me.getView().getViewModel().get('theSearch');
				theSearch.set('storageVsl', strValue);
			}
		}
	},

	stores: {
		vesselCallListPopupStore: {
			model: 'MOST.model.popup.VesselCallList',
			storeId: 'vslCallIdListPopupStoreId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/vesselcalllistpopup'
			}
		}
	}
});