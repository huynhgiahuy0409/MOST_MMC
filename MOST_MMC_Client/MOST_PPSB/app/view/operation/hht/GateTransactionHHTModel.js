Ext.define('MOST.view.operation.hht.GateTransactionHHTModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.gatetransactionhht',	

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.CargoArrvDelv'
	],
	
	stores: {
		gateComboList: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'gateComboStore',
			proxy: {
			   type: 'rest',
			   showProgressBar : false,
			   url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
			   extraParams: {
				   lcd: CodeConstants.LCD_MOST,
				   mcd: CodeConstants.MCD_MT_GATECD
			   }
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			              scd: ''
			          }]);
			     }
			}
		},
		
		searchGateInList: {
			model: 'MOST.model.operation.CargoArrvDelv',
			storeId: 'searchGateInListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gatetransaction/portSafetyConfirmationComboList'
			}
		},
		
		gateInChkList: {
			fields: 'MOST.model.operation.CargoArrvDelv',
			storeId: 'gateInChkListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gatetransaction/portSafetyConfirmationComboList'
			}
		},

		gatePassChkList: {
			fields: 'MOST.model.operation.CargoArrvDelv',
			storeId: 'gatePassChkListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gatetransaction/portSafetyConfirmationComboList'
			}
		},
		
		dgStatusCombo : {
			fields: ['label','data'],
			storeId: 'dgComboListStore',
			data :  [
				{label:"",                data:''}, 
				{label:"Submit",          data:'N'}, 
				{label:"Save",            data:'S'},
				{label:"Confirm",         data:'Y'}, 
				{label:"Reject",          data:'R'},
				{label:"Cancel",          data:'C'}
			]
		},
		
		dgYnCombo : {
			fields: ['label','data'],
			storeId: 'dgYnComboStore',
			data :  [
				{label:"",       data:''}, 
				{label:"Y",      data:'Y'}, 
				{label:"N",      data:'N'}
			]
		},

		// =================================== HHT ===================================

		listOfGateIn: {
			model: 'MOST.model.monitoring.GateIn',
			storeId: 'listOfGateInStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gatein/list'
			}
		},

		gateOut: {
			model: 'MOST.model.monitoring.GateOut',
			storeId: 'gateOutStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gateout/list'
			}
		},

		gateConfigurationList: {
//			model : 'MOST.model.configuration.Configuration',
//			storeId : 'gateConfigurationListStore',
//			proxy : {
//				type : 'rest',
//				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/config/values'
//			}
		},

		grPopupList: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'GrPopupListStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/grpopup'
			}
		},

		assignmentLorrysGatePopupStore: { //Validate Lorry FocusLeave
			model: 'MOST.model.popup.PopupService',
			storeId: 'assignmentLorrysPopupStoreId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/assignmenttruckpopup'
			}
		},

		gpPopupList: { // focus leave GP gate out tab
			model: 'MOST.model.popup.PopupService',
			storeId: 'gpPopupListStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/gppopup'
			}
		},
		
		grInGateList: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'grInGateListStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gatetransaction/gringatelist'
			}
		},
		
		gateTicketNoPopup: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'gatePassPopupStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/gateticketnopopup'
			}
		}
	}
});