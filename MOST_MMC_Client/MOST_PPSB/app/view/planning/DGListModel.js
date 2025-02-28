Ext.define('MOST.view.planning.DGListModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.dglist',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.planning.DGList'
	],

	formulas:{
		freeZoneDivVal:{
			bind:{
				bindTo:'{theDG.freeZoneDiv}'
			},
			get:function(value){
				var tempValue = {};
				var inExfieldName = 'freeZoneDiv';
				tempValue[inExfieldName] = value;
				return tempValue;
			},
			set:function(value){
				var me = this;
				
				var detailItem = me.getView().getViewModel().get('theDG');
				detailItem.set("freeZoneDiv", value['freeZoneDiv']);
			}
		}
		
	},
	
	stores: {
		statusCombo : {
			fields: ['name','code'],
			storeId: 'statusComboStore',
			data :  [{"code":"", "name":"All"},
					{"code":"S", "name":"Save"},
					{"code":"N", "name":"Submit"},
					{"code":"Y", "name":"Confirm"},
					{"code":"R", "name":"Reject"}
            ]
		},
		
		categoryCombo : {
			fields: ['name','code'],
			storeId: 'categoryComboStore',
			data :  [{"code":"", "name":"All"},
					{"code":"EX", "name":"Export"},
					{"code":"IM", "name":"Import"},
					{"code":"ST", "name":"Storage"},
					{"code":"TS", "name":"Transhipment"}
            ]
		},
		
		dgList: {
			model: 'MOST.model.planning.DGList',
			storeId: 'dgListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/dglist/list'
			}
		},
		
		dgDetail: {
			model: 'MOST.model.planning.DGList',
			storeId: 'dgDetailStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/dglist/detail'
			}
		},
		
		substanceCombo: {
			model: 'MOST.model.planning.DGList',
			storeId: 'substanceComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/dglist/substance'
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  substance: 'Select',
			        	  substance: ''
			          }]);
			     }
			}
		},
		
		dgDownload : {
			model : 'MOST.model.common.FileUpload',
			storeId: 'dgDownloadStore',
			proxy: {
				type: 'rest',
				//url: MOST.config.Locale.getRestApiDestUrl() + '/file/manage/filedownload'
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/filedownload/download'
			}
		},
		
		//equipmentDetailUpload
		dgUpload: {
			model : 'MOST.model.common.FileUpload',
			storeId: 'dgUploadStore'
		},

		pdfExport: {
			model: 'MOST.model.planning.DGList',
			storeId: 'pdfExportStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/dglist/pdfExport'
			}
		},
		
	}
});