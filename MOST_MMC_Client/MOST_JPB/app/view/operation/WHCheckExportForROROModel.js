Ext.define('MOST.view.operation.WHCheckExportForROROModel',
{
	extend : 'MOST.view.foundation.BaseViewModel',

	alias : 'viewmodel.whcheckexportforroro',

	requires : [ 
		'Ext.data.proxy.Rest',
		'MOST.model.operation.CargoHandlingIn'
	],

	formulas : {
		fnlOpeYnChecked : {
			bind : {
				bindTo : '{theDetail.fnlOpeYn}'
			},
			get : function(value) {
				var me = this;
				if (value === "Y") {
					return true;
				} else {
					return false;
				}
			},
			set : function(value) {
				var me = this;
				var stringValue = "N";

				if (value == true) {
					stringValue = "Y";
				}

				var detailItem = me.getView().getViewModel().get(
						'theRRDetail');
				detailItem.set("fnlOpeYn", stringValue);
			}
		}
	},

	stores : {
		warehouseCheckForExportList: {
			model: 'MOST.model.operation.CargoLoading',
			storeId: 'warehouseCheckForExportList',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/whcheckexport/selectcargoforRORO'
			}
		},

		warehouseCheckForExport: {
			model: 'MOST.model.operation.CargoLoading',
			storeId: 'confirmLoadingStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/whcheckexport/warehousecheckforexport'
			}
		},
		
		checkAmoutLocation: {
			model: 'MOST.model.operation.CargoLoading',
			storeId: 'confirmLoadingStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/whcheckexport/checkAmoutLocation'
			}
		},
		
		WhViewList: {
			model: 'MOST.model.configuration.WarehouseDefinition',
			storeId: 'WhViewListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/warehouse/whViewList'
			}
		},
		
		damageStore: {
			model: 'MOST.model.operation.DamageCheck',
			storeId: 'damageStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/damagecheck/list'
			}
		},
		
		damageCheckStore: {
			model: 'MOST.model.operation.DamageCheck',
			storeId: 'damageCheckStore',
		},
		
		uploadStore: {
			model : 'MOST.model.common.FileUpload',
			storeId: 'uploadStore',
		},
		
//		dimensionStore: {
//			model: 'MOST.model.operation.DimensionCheck',
//			storeId: 'dimensionStore',
//			pageSize:CommonConstants.PAGE_SIZE,
//			proxy: {
//				type: 'rest',
//				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/damageDimensionCheck/listDimension'
//			}
//		},
		
		dimensionStore: {
			model: 'MOST.model.operation.DimensionCheck',
			storeId: 'dimensionStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/dimensioncheck/list'
			}
		},
		
		warehouseCheckForExportTruckNoCombo: {
			fields: ['scdNm', 'scd'],
			storeId: 'berthWharfCombo',
			autoLoad: true,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/yardtruckpopup',
			}
		},
		
		assignedInternalTruckListPopup: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'assignedInternalTruckListPopup',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/assignmentyardtruckpopup'
			}
		},
	
		validationCheck: {
			storeId: 'validationCheck',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/validationcode/list',
				
			}
		},
		
	}
});