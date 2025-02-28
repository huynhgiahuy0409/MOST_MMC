Ext.define('MOST.view.operation.LorryListModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.lorrylist',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.LorryList'
	],
	
	formulas:{
  		
	},
	
	stores: {
		lorryList: {
			model: 'MOST.model.operation.LorryList',
			storeId: 'LorryListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/lorrylist/list'
			}
		},
		
//		snCombo : {
//			fields: ['shipgNoteNo'],
//			storeId: 'snComboStore',
//			proxy: {
//				type: 'rest',
//				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/goodsreceiptfornonjpvc/snCombo'
//			}
//			,
//			listeners: 
//			{
//				load: function(store, records) {
//			          store.insert(0, [{
//			        	  shipgNoteNo: 'Select'
//			          }]);
//			     }
//			}
//		},
//		quantityCombo : {
//			fields: ['name','code'],
//			storeId: 'quantityComboStore',
//			data :  [{"code":"1", "name":"Qty"},
//					{"code":"2", "name":"MT"},
//					{"code":"3", "name":"M3"}
//            ]
//		},
	}
	
});