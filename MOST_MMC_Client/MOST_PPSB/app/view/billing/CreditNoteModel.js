Ext.define('MOST.view.billing.CreditNoteModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.creditnote',

	data: {
		creditNoteDetail: null,
	},

	requires: ['Ext.data.proxy.Rest'],
	stores: {
		creditNoteStore: {
			model: 'MOST.model.billing.CreditNoteItem',
			storeId: 'creditNoteStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/creditnote/list',
			},
		},

		creditNoteDetailStore: {
			model: 'MOST.model.billing.CreditNoteItem',
			storeId: 'creditNoteDetailStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/creditnote/detail',
			},
		},

		invoiceTypeCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'invoiceTypeComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_BILLINGTP
				}
			},
		},

		paymentTypeCombo: {},
	},
});
