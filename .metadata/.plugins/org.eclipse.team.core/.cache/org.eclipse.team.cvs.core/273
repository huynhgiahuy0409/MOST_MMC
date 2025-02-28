Ext.define('MOST.view.billing.FreeStorageDaysModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.freestoragedays',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.billing.FreeStorageDays'
	],
	data:{
		theDetail: {
			ptnrCd: '',
			por: '',
			incldSunYn: ''
		},
	},
	
	formulas:{
		aplyYmdString:{
			bind: {
				bindTo:'{refFreeStorageDaysGrid.selection.data.aplyYmd}'
			},
			get: function(value) {
				return Ext.util.Format.date(value, MOST.config.Locale.getShortDate());
			},
			set: function(value) {
				var me = this;
				me.setBindValue('{refFreeStorageDaysGrid.selection.data.aplyYmd}', Ext.Date.format(value, MOST.config.Locale.getShortDate()));
			}
		},
		exprYmdString: {
			bind: {
				bindTo:'{refFreeStorageDaysGrid.selection.data.exprYmd}'
			},
			get: function(value) {
				return Ext.util.Format.date(value, MOST.config.Locale.getShortDate());
			},
			set: function(value) {
				var me = this;
				me.setBindValue('{refFreeStorageDaysGrid.selection.data.exprYmd}', Ext.Date.format(value, MOST.config.Locale.getShortDate()));
			}
		}
	},
	
	stores: {
		catergoryCombo :{},
		
		freeStorageDaysList: {
			model: 'MOST.model.billing.FreeStorageDays',
			storeId:'freeStorageDaysListStore',
			proxy:{
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/freestoragedays/list'
			}
		},
		
		freeStorageDaysListDuplicateCheck: {
			model: 'MOST.model.billing.FreeStorageDays',
			storeId:'freeStorageDaysListDuplicateCheckStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/freestoragedays/list/duplicatecheck'
			}
		},
		
		cargoTypeCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'cargoTypeComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_CGTP
				}
			}
		},
	}
	
});