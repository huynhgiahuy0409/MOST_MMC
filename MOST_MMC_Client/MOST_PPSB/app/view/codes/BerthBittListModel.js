Ext.define('MOST.view.codes.BerthBittListModel', {
	extend: 'MOST.view.foundation.BaseViewModel',
	
	alias: 'viewmodel.berthBittList',
	
	requires:[
		'Ext.data.proxy.Rest',
		'MOST.model.codes.BerthBittList',
		'MOST.model.foundation.dataitem.DataItem'
	],
	
	stores:{
		
		berthBitt: {
			model: 'MOST.model.codes.BerthBittList',
			storeId: 'berthBittStore',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy:{
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/berthBitt/berthBittList'
			}
		},
		
		berthLocCombo: {
			model: 'MOST.model.codes.BerthBittList',
			storeId: 'berthLoclComboStore',
			proxy:{
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/berthBitt/berthLocList'
			}
		},
		
		duplicateCheckStore:{
			model: 'MOST.model.codes.BerthBittList',
			storeId: 'duplicateCheckStore',
			proxy:{
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/berthBitt/berthBittList/validateDuplicate'
			}
		},
		
		yesNoValue:{
			fields: ['value'],
			queryMode: 'local',
		    data : [
		        {"value":	"Y"},
		        {"value": 	"N"}
		    ]
		}
		
	}

});