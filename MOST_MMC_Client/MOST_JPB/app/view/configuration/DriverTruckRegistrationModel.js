Ext.define('MOST.view.configuration.DriverTruckRegistrationModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.drivertruckregistration',

	requires: [
		'Ext.data.proxy.Rest'
	],

	stores: {
		driversListOnly: {
			model: 'MOST.model.configuration.DriverTruckRegistration',
			storeId: 'driversListOnlyStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/drivertruckregistration/driversListOnly'
			}
		},
		
		lorriesListOnly: {
			model: 'MOST.model.configuration.DriverTruckRegistration',
			storeId: 'lorrysListOnlyStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/drivertruckregistration/lorriesListOnly'
			}
		},
		
		chassisListOnly:{
			model: 'MOST.model.configuration.DriverTruckRegistration',
			storeId: 'lorrysListOnlyStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/drivertruckregistration/chassisListOnly'
			}
		},
		
		partnerCodeListOnly: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'partnerCodeListOnlyStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					   searchType: ComboboxServiceConstants.COMBO_PARTNER_CD,
					   ptnrType: CodeConstants.MT_PTNRTP1_TRK
				   }
			}
		},
		
		checkDriverDuplicate: {
			model: 'MOST.model.configuration.DriverTruckRegistration',
			storeId: 'checkDriverDuplicateStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/drivertruckregistration/checkdriverduplicate'
			}
		},
		
		checkTruckDuplicate: {
			model: 'MOST.model.configuration.DriverTruckRegistration',
			storeId: 'checkTruckDuplicateStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/drivertruckregistration/checktruckduplicate'
			}
		},
		
		checkChassisDuplicate: {
			model: 'MOST.model.configuration.DriverTruckRegistration',
			storeId: 'checkChassisDuplicateStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/drivertruckregistration/checkchassisduplicate'
			}
		},
		
		countryCodePopup: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'countryCodePopupStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_CNTRY_CD
				}
			}
		},
		
		yesNoCombo: {},
	}
});