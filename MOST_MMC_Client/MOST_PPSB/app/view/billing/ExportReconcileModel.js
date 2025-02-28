Ext.define('MOST.view.billing.ExportReconcileModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.exportreconcile',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.billing.ExportReconcile'
	],

	stores: {
		exportReconcileList: {
			model: 'MOST.model.billing.ExportReconcile',
			storeId: 'ExportReconcileStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/exportreconcile/list'
			}
		},
		
		exportList:{
			model: 'MOST.model.billing.ExportReconcile',
			storeId: 'ExportReconcileStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/exportreconcile/exportList'
			}
		},
		
		exportManifestList:{
			model: 'MOST.model.billing.ExportReconcile',
			storeId: 'ExportReconcileStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/exportreconcile/outwardManifestList'
			}
		},
		
		exportStatusList:{
			model: 'MOST.model.billing.ExportReconcile',
			storeId: 'ExportReconcileStoreVarifyStatus',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/exportreconcile/exportStatus'
			}
		},
		
		exportReconcileValidationCode: {
			fields: ['isValidated'],
			storeId: 'exportReconcileValidationCode',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/commonCode/validationCode'
			}
		},
		
		exportReconcileTransportTypeList:{
			fields: ['scdNm','scd'],
			storeId: 'operationTypeComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster'
			},
			listeners: 
			{
				load: function(store, records) {
					store.insert(0, [{ scdNm: 'Driver', scd: 'OH' }]);
					store.insert(0, [{ scdNm: 'Select', scd: '' }]);
				}
			}
		},
		
		exportReconcilePackageTypeList:{
			fields: ['cdNm','cd'],
			//model: 'MOST.model.popup.CMMCdPopup',
			storeId: 'commonCodePopupStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
                	mcd: CodeConstants.MCD_MT_PKGTP
				}
			},
			listeners: {
				load: function(store, records) {
			          store.insert(0, [{
			        	  cdNm: 'Select',
			        	  cd: ''
			          }]);
			     }
			}
		},
		
		cargoTypeCombo : {
			fields: ['scdNm','scd'],
			storeId: 'cargoTypeComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/commonCode/codeMasterList',
				extraParams: {
					lcd: 'MT',
					mcd: 'CGTP'
				}
			},
			listeners: {
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  scd: ''
			          }]);
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
			model: 'MOST.model.billing.ExportReconcile',
			storeId: 'exportExcelStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/exportreconcile/exportexcel'
			}
		}
	}
});