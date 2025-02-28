Ext.define('MOST.view.billing.ImportReconcileForLiquidModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.importreconcileforliquid',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.billing.ImportReconcileForLiquid'
	],

	stores: {
		importReconcileForLiquidList: {
			model: 'MOST.model.billing.ImportReconcileForLiquid',
			pageSize:CommonConstants.PAGE_SIZE,
			autoLoad:false,
			storeId: 'importReconcileForLiquidListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/importreconcileforliquid/list'
			}
		},
		
		importReconcileForLiquidMfList: {
			model: 'MOST.model.billing.ImportReconcileForLiquid',
			storeId: 'importReconcileForLiquidMfListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/importreconcileforliquid/manifest'
			}
		},
		
		importReconcileForLiquidOutturnList: {
			model: 'MOST.model.billing.ImportReconcileForLiquid',
			storeId: 'importReconcileForLiquidOutturnListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/importreconcileforliquid/outturn'
			}
		},
		
		importReconcileForLiquidStatusList: {
			model: 'MOST.model.billing.ImportReconcileForLiquid',
			storeId: 'importReconcileForLiquidStatusListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/importreconcileforliquid/status'
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
		
		importReconcilePackageTypeList : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'importReconcilePackageTypeListStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_PKGTP
				}
			}
		},
		
		operationTypeCombo:{
			fields:['label', 'data'],
			data: [
				{"label":"STS", "data":"STS"}, 
				{"label":"TLS", "data":"TLS"} ,
				{"label":"GEN", "data":"GEN"}
			]
		},
		
	}
});