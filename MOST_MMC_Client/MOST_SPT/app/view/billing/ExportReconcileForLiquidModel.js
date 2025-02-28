Ext.define('MOST.view.billing.ExportReconcileForLiquidModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.exportreconcileforliquid',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.billing.ExportReconcileForLiquid'
	],

	stores: {
		exportReconcileForLiquidList: {
			model: 'MOST.model.billing.ExportReconcileForLiquid',
			pageSize:CommonConstants.PAGE_SIZE,
			autoLoad:false,
			storeId: 'exportReconcileForLiquidListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/exportreconcileforliquid/list'
			}
		},
		
		exportReconcileForLiquidMfList: {
			model: 'MOST.model.billing.ExportReconcileForLiquid',
			storeId: 'exportReconcileForLiquidMfListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/exportreconcileforliquid/manifest'
			}
		},
		
		exportReconcileForLiquidOutturnList: {
			model: 'MOST.model.billing.ExportReconcileForLiquid',
			storeId: 'exportReconcileForLiquidOutturnListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/exportreconcileforliquid/outturn'
			}
		},
		
		exportReconcileForLiquidStatusList: {
			model: 'MOST.model.billing.ExportReconcileForLiquid',
			storeId: 'exportReconcileForLiquidStatusListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/exportreconcileforliquid/status'
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
		
		exportReconcilePackageTypeList : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'exportReconcilePackageTypeListStore',
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