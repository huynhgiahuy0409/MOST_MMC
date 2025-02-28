Ext.define('MOST.view.operation.hht.YardListOfLoadingOfROROHHTModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.yardlistofloadingofrorohht',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.popup.LorrysPopup',
		'MOST.model.operation.ConfirmLoadingOfRORO'
	],

	formulas:{
	},

	stores: {
		unitItemsList: {
			model: 'MOST.model.operation.ConfirmLoadingOfRORO',
			storeId: 'unitItemsListStoreHHT',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmloadingofroro/unititemsHHT'
			}
		},
		
		inDirectUnitItemsList: {
			model: 'MOST.model.operation.ConfirmLoadingOfRORO',
			storeId: 'inDirectUnitItemsListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmloadingofroro/indirectunititemshht'
			}
		},
		
		directUnitItemsList: {
			model: 'MOST.model.operation.ConfirmLoadingOfRORO',
			storeId: 'directUnitItemsListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmloadingofroro/directunititemshht'
			}
		},
		
		
		// ======================================================
		// Combo Start
		brandCombo: {
			model: 'MOST.model.operation.ConfirmLoadingOfRORO',
			storeId: 'brandComboStoreHHT',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/brandcomboListHHT'
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
		
		// Combo End
		// ======================================================

	}
});