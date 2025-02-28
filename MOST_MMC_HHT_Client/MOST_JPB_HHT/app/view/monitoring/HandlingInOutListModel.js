Ext.define('MOST.view.controller.HandlingInOutListModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.handlinginoutlist',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.CargoHandlingOut'
	],
	
	
	stores: {
		
		categoryCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'categoryComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codemaster',
				extraParams: {
					lcd: 'MT',
					mcd: 'CATGTP',
					scdUse: 'Y'
				}
			},
		},
		
		whCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'whComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codemaster',
				extraParams: {
					locDivCd: 'WHO',
					searchType: 'WH_LOC'
				}
			}
		},
		
		shiftCombo:{
			fields: ['shftId','shftNm'],
			storeId: 'shiftComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/commonCode/shiftlist',
				extraParams: {
					useYn: 'Y',
					shftMethCd: 'Standard'
				}
			},
			listeners:{
				load: function(store, records){
					store.insert(0,[{shftId: '', shftNm: 'Select'}])
				}
			}
		},
		
		listCombo: {
			model: 'MOST.model.operation.CargoHandlingOut',
			storeId: 'listComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargojob/setCombo',
			}
		},
		
		shippingNoteListCombo:{
			fields:['docNo'],
			storeId:'shippingNoteListComboStore'
		},
		
		blListCombo:{
			fields:['docNo'],
			storeId:'blListComboStore'
		},
		
		grListCombo:{
			fields:['docNo'],
			storeId:'grListCombo'
		},
		
		handlingList:{
			model: 'MOST.model.operation.CargoHandlingOut',
			storeId: 'handlingListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/handlinginout/handlinglist',
			}
		},
		
		// whReconcilDetail:{
		// 	model: 'MOST.model.operation.WHReconciliationItem',
		// 	storeId: 'whReconcilDetailStore',
		// 	proxy: {
		// 		type: 'rest',
		// 		url: MOST.config.Locale.getRestApiDestUrl() + '/v1/whreconciliation/detail',
		// 	}
		// },
		
		// whReconcilDetailGrid:{
		// 	model: 'MOST.model.operation.WHReconciliationItem',
		// 	storeId: 'whReconcilDetailGridStore'
		// },
		
		// docList:{
		// 	model: 'MOST.model.operation.WHReconciliationItem',
		// 	storeId: 'docListStore',
		// 	proxy: {
		// 		type: 'rest',
		// 		url: MOST.config.Locale.getRestApiDestUrl() + '/v1/whreconciliation/list',
		// 	}
		// },
		
		cargoReconilCondCombo:{
			fields:['scd', 'scdNm'],
			storeId: 'cargoReconilCondCombo',
		},
		
		compareModeCombo:{
			fields:['scd'],
			data :  [
				{'scd':'MT'},
				{'scd':'M3'},
				{'scd':'QTY'}
            ],
			storeId: 'compareModeComboStore',
		},
		shiftList: {
			fields: ['shftId', 'shftNm', 'shftDivCd', 'fmHhmm', 'toHhmm'],
			storeId: 'shiftListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/shiftlist',
			}
		},
	}
});