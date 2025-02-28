Ext.define('MOST.view.document.DGDeclarationModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.dgdeclaration',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.document.DGDeclaration'
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
		dgDeclarationDetail: {
			model: 'MOST.model.document.DGDeclaration',
			storeId: 'dgDeclarationDetailStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/dgdeclaration/detail'
			}
		},
		
		substanceCombo: {
			model: 'MOST.model.document.DGDeclaration',
			storeId: 'substanceComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/dgdeclaration/substance'
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
				url: MOST.config.Locale.getRestApiDestUrl() + '/file/manage/filedownload'
			}
		},
		
		//equipmentDetailUpload
		dgUpload: {
			model : 'MOST.model.common.FileUpload',
			storeId: 'dgUploadStore'
		},
	}
	
});