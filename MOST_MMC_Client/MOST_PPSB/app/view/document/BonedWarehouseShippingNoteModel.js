Ext.define('MOST.view.document.BondedWarehouseShippingNoteModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.bondedwarehouseshippingnote',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.document.BondedWarehouseShippingNote',
		'MOST.model.common.SearchVesselCall'
	],

	stores: {
		
		searchVesselCallDetail: {
			model: 'MOST.model.common.SearchVesselCall',
			storeId: 'searchVesselCallDetailStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/searchvslcall/searchVslcallid'
			}
		},
		
		coldStorageList: {
			model: 'MOST.model.document.BondedWarehouseShippingNote',
			storeId: 'coldStorageListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/coldstoragelist/shippingnotelist'
			}
		},
		
		shippingNoteDetailList: {
			model: 'MOST.model.document.BondedWarehouseShippingNote',
			storeId: 'shippingNoteDetailListStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/coldstoragelist/shippingnotedetail'
			}
		},

		goodsListGrid: {
			model: 'MOST.model.document.BondedWarehouseShippingNote',
		},
		
		shippingNoteDetail: {
			model: 'MOST.model.document.BondedWarehouseShippingNote',
			storeId: 'shippingNoteStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/coldstoragelist/shippingnotedetail'
			}
		},
		
		shippingNoteAck:{
			model: 'MOST.model.document.BondedWarehouseShippingNote',
			storeId: 'shippingNoteAckStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/coldstoragelist/shippingnoteack'
			}
		},
		
		shippingNoteSASubmit:{
			model: 'MOST.model.document.BondedWarehouseShippingNote',
			storeId: 'shippingNoteSASubmitStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/coldstoragelist/shippingnotesasubmit'
			}
		},
		
		shippingNoteFASubmit:{
			model: 'MOST.model.document.BondedWarehouseShippingNote',
			storeId: 'shippingNoteFASubmitStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/coldstoragelist/shippingnotefasubmit'
			}
		},
		
		getLinkedBLNo:{
			model: 'MOST.model.document.BondedWarehouseShippingNote',
			storeId: 'getLinkedBLNoStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/coldstoragelist/getlinkedblno'
			}
		},
		
		getCRBNo:{
			model: 'MOST.model.document.BondedWarehouseShippingNote',
			storeId: 'getCRBNoStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/coldstoragelist/getcrbno'
			}
		},
		
		deliveryModeCombo : {
			fields: ['scdNm','scd'],
			storeId: 'deliveryModeComboStore',
			
			proxy: {
			   type: 'rest',
			   showProgressBar : false,
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
		
		operationTypeCombo : {
			fields: ['scdNm','scd'],
			storeId: 'operationTypeComboStore',
			proxy: {
			   type: 'rest',
			   showProgressBar : false,
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
		
		
		documentStatusCombo: {
			fields: ['scdNm','scd'],
			storeId: 'documentStatusComboStore',
			proxy: {
			   type: 'rest',
			   showProgressBar : false,
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
		
		typeCargoCombo : {
			fields: ['scdNm','scd'],
			storeId: 'typeCargoComboStore',
			proxy: {
			   type: 'rest',
			   showProgressBar : false,
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
		
		exportType: {
			model: 'MOST.model.document.BondedWarehouseShippingNote',
			storeId: 'exportTypeStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/coldstoragelist/exporttype'
			}
		},
		
		sampleUpload: {
			model: 'MOST.model.document.BL',
			storeId: 'generateSampleUpload',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/coldstoragelist/rorosampleupload'
			}
		},	
		
		categoryCombo : {
			fields: ['scdNm','scd'],
			storeId: 'categoryComboStore',
			data :  [
				{"scdNm": "EXPORT", "scd": "E"},
				{"scdNm": "TRANSSHIPMENT", "scd": "T"},
				{"scdNm": "REHANDLED", "scd": "R"},
				{"scdNm": "STORAGE", "scd": "S"}
            ]
		},
		
		transferedByCombo : {
			fields: ['scdNm','scd'],
			storeId: 'transferedByCombo',
			data :  [
				{"scdNm": "Select", "scd": ""},
				{"scdNm": "Lorry", "scd": "LR"},
				{"scdNm": "Conveyor", "scd": "CV"},
				{"scdNm": "Wagon", "scd": "WG"}
            ]
		},
		
		roroBrandStore : {
			fields: ['brandNm', 'brandCd'],
			storeId: 'roroBrandStore',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/requestcode/brand',
			},
			listeners: {
				load: function(store, records) {
					store.insert(0, [{
						brandNm: 'Select',
						brandCd: ''
					}]);
				}
			}
		},
		
		roroModelStore : {
			fields: ['modelNm', 'modelCd'],
			storeId: 'roroModelStore',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/requestcode/model',
			},
			listeners: {
				load: function(store, records) {
					store.insert(0, [{
						modelNm: 'Select',
						modelCd: ''
					}]);
				}
			}
		},
		
		unitList: {
			model: 'MOST.model.document.BondedWarehouseShippingNote',
			id: 'unitListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			autoLoad:false,
			proxy : {
				type : 'rest',
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/coldstoragelist/unitlist'
			}
		},
		
		hatchNoCombo : {
			fields: ['scdNm','scd'],
			storeId: 'hatchNoComboStore'
		},
		
		validationStore: {
			fields: ['isValidated'],
			storeId: 'shippgNoteNoValidStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/requestcode/validationCode'
			}
		},
		
		// roroUpload: {
		// 	model: 'MOST.model.document.excelupload.RoRoExcelUpload',
		// 	storeId: 'roroUploadStore',
		// 	pageSize:CommonConstants.PAGE_SIZE,
		// 	proxy: {
		// 		type: 'rest',
		// 		url: MOST.config.Locale.getRestApiDestUrl() + '/v1/blinfo/roroexcelupload'
		// 	}
		// },
		
		terminalInfo: {
			model: 'MOST.model.document.BL',
			id: 'terminalInfoStore',
			proxy : {
				type : 'rest',
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/terminaldefinition/items'
			}
		},
		
	}
});