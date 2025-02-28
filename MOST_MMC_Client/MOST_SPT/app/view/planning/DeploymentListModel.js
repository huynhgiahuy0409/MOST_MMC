Ext.define('MOST.view.planning.DeploymentListModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.deploymentlist',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.planning.DeploymentList'
	],
	
	data: {
		selectedColumn : null
	},
	
	stores: {
		deploymentItems: {
			model: 'MOST.model.planning.DeploymentList',
			storeId: 'deploymentItemsStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/deploymentlist/list'
			}
		},
		
		shiftCombo:{
			//fields: ['shftId','shftNm'],
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'shiftComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
//					useYn: 'Y',
//					shftMethCd: 'Standard'
					searchType: ComboboxServiceConstants.COMBO_SHFTTP,
					shftMethCd: ComboboxServiceConstants.COMBO_STANDARD
				}
			},
			listeners: {
				load: function(store, records) {
					store.insert(0, [{
						shftNm: 'Select',
						shftId: ''
					}]);
				}
			}
		},
	}
});