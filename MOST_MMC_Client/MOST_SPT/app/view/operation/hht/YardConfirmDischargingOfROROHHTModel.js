Ext.define('MOST.view.operation.hht.YardConfirmDischargingOfROROHHTModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.yardconfirmdischargingofrorohht',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.CargoLoading',
		'MOST.model.operation.OperationSetting',
		'MOST.model.popup.LorrysPopup',
		'MOST.model.operation.ConfirmDischargingOfRORO',
		'MOST.model.operation.TheListOfDamageCheckOfRORO',
		'MOST.model.operation.DamageCheck',
	],

	formulas:{
	},

	stores: {
		unitItems: {
			model: 'MOST.model.operation.ConfirmDischargingOfRORO',
			storeId: 'unitItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmdischargingofroro/unitlisthht'
			}
		},
		
		commonComboItems: {
			model: 'MOST.model.operation.ConfirmDischargingOfRORO',
			storeId: 'commonComboItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/commonComboListHHT',
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
		
		terminalHoldCheckStore: {
			model: 'MOST.model.document.TerminalHoldReleaseControl',
			storeId: 'terminalHoldCheckStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/terminalholdreleasecontrol/checkTerminalHold'
			}
		},
		
		terminalHoldYardCheckStore: {
			model: 'MOST.model.document.TerminalHoldReleaseControl',
			storeId: 'terminalHoldYardCheckStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/terminalholdreleasecontrol/checkTerminalHold'
			}
		},
		
		roroDamageCheckDetail: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
			storeId: 'roroDamageCheckDetailStoreHHT1',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/rorodamagecheckdetail'
			}
		},
		
		damageStore: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
			storeId: 'roroDamageCheckDetailStoreHHT2',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/rorodamagecheckdetail'
			}
		},
		damageCheckStore: {
			model: 'MOST.model.operation.DamageCheck',
			storeId: 'damageCheckStoreHHT',
		},
		
		// Combo Start
		// ======================================================
		// D.Mode
		dischargingOprCombo: {
			fields: ['tsptTpCdNm','tsptTpCd']
		},
		
		dmodeCombo : {
			fields: ['scdNm','scd'],
			data :  [{"scd":"", "scdNm":"Select"},
					{"scd":"D", "scdNm":"Direct"},
					{"scd":"I", "scdNm":"Indirect"}
	        ]
		},
		
		// Combo End
		// ======================================================

	}
});