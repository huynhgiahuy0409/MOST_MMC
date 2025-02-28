Ext.define('MOST.view.popup.ShipCallNoListPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.shipcallnolistpopup',

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
		
		shipCallNoDetailList: {
			model: 'MOST.model.popup.VesselCallList',
			storeId: 'shipCallNoListStoreId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/shipcallnopopup'
			}
		},
		
		shipCallNoListPopup: {
			model: 'MOST.model.popup.VesselCallList',
			storeId: 'shipCallNoListPopupStoreId',
			
		},
		
		vesselCallList: {
			model: 'MOST.model.popup.VesselCallList',
			storeId: 'vesselCallListStoreId',
		},
	}
});