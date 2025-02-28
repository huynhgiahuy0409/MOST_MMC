Ext.define('MOST.view.document.ForwarderNominationModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.forwardernomination',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.document.NominationManifest',
		'MOST.model.common.SearchVesselCall'
	],
	
	stores: {
		searchVslDetail: {
			model: 'MOST.model.common.SearchVesselCall',
			storeId: 'searchVesselCallDetailStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/vesselcalllistpopup'
			}
		},
		forwarderNomination: {
			model: 'MOST.model.document.NominationManifest',
			storeId: 'forwarderNominationStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/forwardernomination/list'
			}
		},
		forwarderNominationFileUpload: {
			model: 'MOST.model.common.FileUpload',
			storeId: 'forwarderNominationFileUploadStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/forwardernomination/uploadfile'
			}
		},
		forwarderNominationFileDownload : {
			model : 'MOST.model.fileupload.FileUpload',
			storeId: 'forwarderNominationFileDownloadStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/filedownload/download'
			}
		},
				
		dmodeCombo : {
			fields: ['name','code'],
			storeId: 'dmodeComboStore',
			data :  [{"code":"", "name":"Select"},
					{"code":"B", "name":"Both Direct/Indirect"},
					{"code":"I", "name":"Indirect"}
	        ]
		},
		
		deliveryOrderDetail: {
			model: 'MOST.model.document.DeliveryOrder',
			storeId: 'deliveryOrderDetailStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/deliveryorder/detail'
			}
		},
		
		dgDeclarationDetail: {
			model: 'MOST.model.document.DGDeclaration',
			storeId: 'dgDeclarationDetailStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/dgdeclaration/detail'
			}
		},
		
		directTstpCombo : {
			fields: ['scdNm','scd'],
			storeId: 'directTstpCombo',
			proxy: {
			   type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/commonCode/codeMasterList'
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			              scd: ''
			          }]);
			     }
			}
		},
		
		indirectTstpCombo : {
			fields: ['scdNm','scd'],
			storeId: 'indirectTstpComboStore',
		},
		
		cargoTypeCombo : {
			fields: ['scdNm','scd'],
			storeId: 'directTstpCombo',
			autoLoad: true,
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/commonCode/codeMasterList',
				extraParams: {
	                lcd: 'MT',
	                mcd: 'CGTP'
		        }
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			              scd: ''
			          }]);
			     }
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
		
		cgOpList: {
			//model: 'MOST.model.document.DeliveryOrder',
			storeId: 'cgOpListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/deliveryorder/cgOpList'
			}
		},
		
		fwaNomiValidationCodeStore: {
			fields: ['isValidated'],
			storeId: 'fwaNomiValidationCodeStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/forwardernomination/validationCode'
			}
		},
		
		generatePDFDeliveryOrder: {
			model: 'MOST.model.document.DeliveryOrder',
			storeId: 'generatePDFDeliveryOrderStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/deliveryorder/previewpdfdo'
			}
		},
	}
	
});