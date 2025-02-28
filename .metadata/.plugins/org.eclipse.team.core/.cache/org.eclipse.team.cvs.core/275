Ext.define('MOST.view.billing.ImportReconcileModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.importreconcile',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.billing.ImportReconcile'
	],

	stores: {
		importReconcileValidationCode: {
			fields: ['isValidated'],
			storeId: 'importReconcileValidationCode',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/commonCode/validationCode'
			}
		},
		
		importReconcileRecclList:{
			model: 'MOST.model.billing.ImportReconcile',
			storeId: 'importReconcileStore',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/importreconcile/list'
			}
		},
		
		importReconcileMfList:{
			model: 'MOST.model.billing.ImportReconcile',
			storeId: 'importReconcileStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/importreconcile/manifest'
			}
		},
		
		importReconcileOutturnList:{
			model: 'MOST.model.billing.ImportReconcile',
			storeId: 'importReconcileStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/importreconcile/outturncertificate'
			}
		},
		
		importReconcileStatusList:{
			model: 'MOST.model.billing.ImportReconcile',
			storeId: 'importReconcileStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/importreconcile/importreconcilestatus'
			}
		},
		
		importReconcileTransportTypeList:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'transportTypeComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd : CodeConstants.LCD_MOST,
					mcd : CodeConstants.MCD_MT_TSPTTP
				}
			},
			listeners: {
				load: function(store, records) {
			          store.insert(0, [{ scdNm: 'Driver', scd: 'OH' }]);
			          store.insert(0, [{ scdNm: 'Select', scd: '' }]);
			     }
			}
		},
		
		importReconcilePackageTypeList:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'packageTypeComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/importreconcile/importReconcilePackageTypeList',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_PKGTP,
					tyCd: 'CD',
				}
			}
		},
		
		cargoTypeCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'cargoTypeComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_CGTP
				}
			}
		},
		
		searchVesselCallDetail: {
			model: 'MOST.model.common.SearchVesselCall',
			storeId: 'searchVesselCallDetailStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/searchVesselCall/searchVslCallId'
			}
		},
		
		exportExcel: {
			model: 'MOST.model.billing.ImportReconcile',
			storeId: 'exportExcelStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/importreconcile/previewexcel'
			}
		}
	}
});