Ext.define('MOST.view.operation.StevedoreTrimmingModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.stevedoretrimming',	

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.StevedoreTrimming'
	],
	
	data:{
		cgTpCd: '',
		theStevedore: null
	},
	
	stores: {
		stevedoreTrimmingList: {
			model: 'MOST.model.operation.StevedoreTrimming',
			storeId: 'stevedoreTrimmingListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/stevedoretrimming/stevedoreTrimmingList'
			}
		},
		
		stevedoreTrimmingComboSet: {
			model: 'MOST.model.operation.StevedoreTrimming',
			storeId: 'stevedoreTrimmingComboSetStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/stevedoretrimming/stevedoreTrimmingList'
			}
		},
		
		breakDryBulkCombo: {
			fields: ['cdNm','cd'],
			storeId: 'breakDryBulkComboStore',
			data :  [
				{"cd":"BBK", "cdNm":"BBK"},
				{"cd":"DBK", "cdNm":"DBK"}
			]
		},
		
		shiftCombo: {
			fields: ['shftNm','shftId'],
			storeId: 'shiftComboStore'
		},
		
		hatchNoCombo: {
			fields: ['cdNm','cd'],
			storeId: 'hatchNoComboStore'
		},
		
		groupBrkCombo: {
			fields: ['label','data'],
			storeId: 'apfpComboStore',
			data :  [
			    {"data":"", "label":"AP"},
			    {"data":"FP", "label":"FP"}
			]
		},
		
		apfpCombo: {
			fields: ['label','data'],
			storeId: 'apfpComboStore',
			data :  [
			    {"data":"AP", "label":"AP"},
			    {"data":"FP", "label":"FP"}
			]
		},
		
		withGearsYnCombo: {
			fields: ['label','data'],
			storeId: 'widthGearsComboStore',
			data :  [
			    {"data":"Y", "label":"Y"},
			    {"data":"N", "label":"N"}
			]
		},
		
		shipCrewWorkCompYnCombo: {
			fields: ['label','data'],
			storeId: 'shipCrewWorkCompYnComboStore',
			data :  [
			    {"data":"Y", "label":"Y"},
			    {"data":"N", "label":"N"}
			]
		},
		
		lashingStvYnCombo: {
			fields: ['label','data'],
			storeId: 'withGearsComboStore',
			data :  [
			    {"data":"Y", "label":"Y"},
			    {"data":"N", "label":"N"}
			]
		},
		
		bulkDryCombo:{
			fields: ['label','data'],
			storeId: 'bulkDryComboStore',
			data :  [
			    {"data":"", "label":"ALL"},
			    {"data":"BBK", "label":"Break"},
			    {"data":"DBK", "label":"Dry"}
			]
		},
		
		partnerCdPopupCombo: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'partnerCdPopupComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/partnercdpopup'
			}
		},
		
		lashingStvCombo: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'lashingStvComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/partnercdpopup'
			}
		},
		
		
		//tablet 
		
		vesselDelayPntyList: {
			model: 'MOST.model.operation.VesselDelayPenaltyReport',
			storeId: 'vesselDelayPntyListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesseldelaypnty/list'
			}
		},
		partnerCdPopupStore: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'partnerCdPopupStoreId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/partnercdpopup'
			}
		},
		vesselDelayPntyCombo: {
			model: 'MOST.model.operation.VesselDelay',
			storeId: 'vesselDelayComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesseldelaypnty/list'
			},
			listeners: 
			{
				load: function(store, records) {
					
			     }
			}
		},
		
		particularsCombo: {
			fields: ['scdNm','scd'],
			storeId: 'particularsComboStore'
		},
		
		roleCombo: {
			fields: ['scdNm','scd'],
			storeId: 'roleComboStore'
		},
		
		penaltyDescrList: {
			fields: ['pntyDescr', 'unitPrc'],
			storeId: 'penaltyDescrListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesseldelaypnty/list',
			}
		},
		VSRValidationCode: {
			fields: ['isValidated'],
			storeId: 'cargoManualCtlValidationCodeStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/commonCode/validationCode'
			}
		}

	}
		
	
});