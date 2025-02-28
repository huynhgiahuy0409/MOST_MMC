Ext.define('MOST.view.billing.WHRentalStatusModel', {
    extend: 'MOST.view.foundation.BaseViewModel',

    alias: 'viewmodel.whrentalstatus',

    requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.common.Locale',
		'MOST.model.billing.WHRentalStatus'
	],

    data:{
		partnerInfo: null,
		selectRec: null,
		partnerTypeArray: {}
	},

    stores: {

        whRentalStatus: {
			model: 'MOST.model.billing.WHRentalStatus',
			storeId: 'whRentalStatusStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/whrentalstatus/whrentalstatuslist'
			}
		},
		statusCombo : {
			fields: ['name', 'code'],
			data : [
		        {'name' : 'Select Data', 	'code' : ''},
		        {'name' : 'Gathered', 		'code' : 'GT'},
		        {'name' : 'Invoiced', 		'code' : 'IV'}
	        ]
		},
		whCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: '',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_WAREHOUSE_LOC,
					locDivCd: CodeConstants.MT_LOCDIV1_WHO //locDivCd
				}
			},
			listeners:{
				load: function(store, records){
					store.insert(0,[{scdNm: ' - ', scd: ''}])
				}
			}
		},

    }
})