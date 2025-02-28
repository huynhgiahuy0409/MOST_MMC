Ext.define('MOST.view.document.DeliveryOrderModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.deliveryorder',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.document.DeliveryOrder'
	],
	
	stores: {
		whCheckDataForIndirect: {
			model: 'MOST.model.document.DeliveryOrder',
			storeId: 'whCheckDataForIndirectStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/deliveryorder/whcheckdataforindirect'
			}
		},
		
		apronCheckDataForIndirect: {
			model: 'MOST.model.document.DeliveryOrder',
			storeId: 'apronCheckDataForIndirectStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/deliveryorder/aproncheckdataforindirect'
			}
		},
		
		listOfDeliveryOrder: {
			model: 'MOST.model.document.DeliveryOrder',
			storeId: 'listOfDeliveryOrderStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/deliveryorder/list'
			}
		},
		
		listOfSubDeliveryOrder: {
			model: 'MOST.model.document.DeliveryOrder',
			storeId: 'listOfSubDeliveryOrderStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/deliveryorder/subdolist'
			}
		},
		
		deliveryOrderDetail: {
			model: 'MOST.model.document.DeliveryOrder',
			storeId: 'deliveryOrderDetail',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/deliveryorder/detail'
			}
		},
		
		cgOpList: {
			model: 'MOST.model.document.DeliveryOrder',
			storeId: 'cgOpListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/deliveryorder/cgOpList'
			}
		},
		
		directTstpCombo : {
			model: 'MOST.model.codes.CodeMaster',
			storeId: 'directTstpCombo',
			proxy: {
			    type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					lcd : CodeConstants.LCD_MOST,
					mcd : CodeConstants.MCD_MT_TSPTTP
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
		
		indirectTstpCombo : {
			model: 'MOST.model.codes.CodeMaster',
			storeId: 'directTstpCombo',
			proxy: {
			    type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					lcd : CodeConstants.LCD_MOST,
					mcd : CodeConstants.MCD_MT_TSPTTP,
					searchType: CodeConstants.MT_DELVTP_I
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
		
		delvModeCombo : {},
		
		generatePDFDeliveryOrder: {
			model: 'MOST.model.document.DeliveryOrder',
			storeId: 'generatePDFDeliveryOrderStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/deliveryorder/previewpdfdo'
			}
		},
		
		masterBlCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'masterBlComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_MBL_NO
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  mfDocId: ''
			          }]);
			     }
			}
		},
		
		blNoList:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'BLNoListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_BL_NO
				}
			},
			listeners: {
				load: function(store, records) {
			          store.insert(0, [{
			        	  blNo: 'Select',
			        	  blNo: ''
			          }]);
			     }
			}
		},
		
		subDoNoList:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'subDoNoListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SUB_DO_NO
				}
			},
			listeners: {
				load: function(store, records) {
			          store.insert(0, [{
			        	  subDoNo: 'Select',
			        	  subDoNo: ''
			          }]);
			     }
			}
		},
		
		unitList: {
			model: 'MOST.model.document.BL',
			id: 'unitListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			autoLoad:false,
			proxy : {
				type : 'rest',
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/blinfo/unitlist'
			}
		},
		
		subDoNoDuplicateChk: {
			model:'MOST.model.document.DeliveryOrder',
			storeId: 'subDoNoduplicateChkStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/deliveryorder/duplicateChk'
			}
		},
		
		doPkgDetail: {
			model: 'MOST.model.document.DeliveryOrder',
			storeId: 'doPackageStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/deliveryorder/dopkgdetail'
			}
		},
		
		deliveryOrderFileUpload: {
			model: 'MOST.model.fileupload.FileUpload',
			storeId: 'equipmentDetailUpload',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/equipment/filelist'
			}
		},
		
		deliveryOrderFileDownload : {
			model : 'MOST.model.fileupload.FileUpload',
			storeId: 'deliveryOrderFileDownloadStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/filedownload/download'
			}
		},
		
		deliveryOrderWgtChk : {
			model: 'MOST.model.document.DeliveryOrder',
			storeId: 'deliveryOrderWgtChkStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/deliveryorder/deliveryOrderWgtChk'
			}
		},
		
		LorryAssignmentGridList: {
			model: 'MOST.model.document.TruckAssignment',
			storeId: 'lorryAssignmentGridListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/truckAssignment/lorryassignmentinquiry'
			}
		}
		
		
	}
});