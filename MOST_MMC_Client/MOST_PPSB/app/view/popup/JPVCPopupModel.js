Ext.define('MOST.view.popup.JPVCPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.jpvcpopup',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.popup.JPVCPopup',
		'MOST.model.popup.GPDOPopup'
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
		JPVCPopupStore: {
			model: 'MOST.model.popup.JPVCPopup',
			storeId: 'JPVCPopupStoreId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/vesselcalllistpopup'
			}
		},
		
		blCdStoreCombo: {
			model: 'MOST.model.popup.GPDOPopup',
			storeId: 'blCdStoreComboId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/deliveryorderpopup',
				
			}
		},
		
		roleCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'roleComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_COM,
					mcd: CodeConstants.MCD_CM_ROLECD,
					col3: 'VSR'
				}
			}
		},
		
		empPopupHHTList: {
			model: 'MOST.model.operation.VSRCheckList',
			storeId: 'vsrCheckListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/emppopuphhtlist'
			}
		},
	}
});