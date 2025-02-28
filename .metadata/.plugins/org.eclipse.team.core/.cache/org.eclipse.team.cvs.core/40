Ext.define('MOST.view.document.BLModel', {
	extend: 'MOST.view.foundation.BaseViewModel',
	
	alias: 'viewmodel.bl',
	
	requires: [ 
		'Ext.data.proxy.Rest'
	],
	
	stores:{
		vslCallIdStore:{
			model: 'MOST.model.document.BL',
			id: 'vslCallIdInfo',
			pageSize:CommonConstants.PAGE_SIZE,
			autoLoad:false,
			proxy : {
				type : 'rest',
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/blinfo/vslCallIdInfo'
			}
		},
		
		bllist: {
			model: 'MOST.model.document.BL',
			id: 'bllist',
			pageSize:CommonConstants.PAGE_SIZE,
			autoLoad:false,
			proxy : {
				type : 'rest',
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/blinfo/list'
			}
		},
		
		getDataBLOperation: {
			model: 'MOST.model.document.BL',
			id: 'getDataBLOperationList',
			pageSize:CommonConstants.PAGE_SIZE,
			autoLoad:false,
			proxy : {
				type : 'rest',
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/blinfo/checkbloperation'
			}
		},
		
		typeCargoCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'typeCargoComboStore',
			proxy: {
			   type: 'rest',
			   showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					lcd : CodeConstants.LCD_MOST,
					mcd : CodeConstants.MCD_MT_CGTP
				}
			},
//			listeners: 
//			{
//				load: function(store, records) {
//			          store.insert(0, [{
//			        	  scdNm: 'Select',
//			              scd: ''
//			          }]);
//			     }
//			}
		},
		
		pagingStore:{
			model:'MOST.model.document.BL',
			id:'pagingStore',
			pageSize:20,
			proxy: {
		        type: 'memory',
		        enablePaging: true, // replaces PagingMemoryProxy functionality
		        reader: {
		        	rootProperty: 'jobNo',
		        }
		    }
		},
		
		checkBLNo: {
			model: 'MOST.model.document.BL',
			id: 'checkBLNoStore',
			proxy : {
				type : 'rest',
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/blinfo/checkBlNo'
			}
		},
		
		blFileUpload: {
			model: 'MOST.model.fileupload.FileUpload',
			storeId: 'equipmentDetailUpload',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/equipment/filelist'
			}
		},
		
		blFileDownload : {
			model : 'MOST.model.fileupload.FileUpload',
			storeId: 'equipmentDetailDownloadStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/filedownload/download'
			}
		},

		//20241104: Add new store for BL file upload
		blFileUploadInfo: {
			model: 'MOST.model.document.BL',
			storeId: 'blFileUploadInfoStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/blinfo/filelist'
			}
		},
		
		hatchNo: {
			model: 'MOST.model.document.BL',
			id: 'hatchNoStore',
		},
		
		blDetail: {
			model: 'MOST.model.document.BL',
			id: 'blDetal',
			proxy : {
				type : 'rest',
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/blinfo/detail'
			}
		},
		
		manifestTypeCombo : {},
		
		blCargo: {
			model: 'MOST.model.document.BL',
			id: 'unitListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			autoLoad:false,
			proxy : {
				type : 'rest',
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/blinfo/blCargoDetail'
			}
		},
		
		grossWeight: {
			model: 'MOST.model.foundation.dataitem.DataItem',
			storeId: 'grossWeightStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
			        mcd: CodeConstants.MCD_FZ_UOMWGT,
			        scdUse:'Y'
			    }
			},
			listeners: {
				load: function(store, records) {
					store.insert(0, [{
						scdNm: 'Select',
						scd: ''
					}]);
				}
			}
		},
		
		cgType: {
			model: 'MOST.model.foundation.dataitem.DataItem',
			storeId: 'cgTypeStore',
			autoLoad: true,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
			        mcd: CodeConstants.MCD_MT_CGTP,
			        scdUse:'Y'
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

		delvModeCombo: {},
		
		roroBrandStore : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'roroBrandStore',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_BRAND
				}
			},
			listeners: {
				load: function(store, records) {
					store.insert(0, [{  
						scdNm: 'Select',
						scd: ''
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
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/brandmodelcode/models',
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
			model: 'MOST.model.document.BL',
			id: 'unitListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			autoLoad:false,
			proxy : {
				type : 'rest',
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/blinfo/unitlist'
			}
		},
		
		blPkgDetail: {
			model: 'MOST.model.document.BL',
			storeId: 'blPackageStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/blinfo/blpkgdetail'
			}
		},
		
		blSplitPkgDetail: {
			model: 'MOST.model.document.BL',
			storeId: 'blPackageStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/blinfo/blsplitpkgdetail'
			}
		},
		
		categoryCombo : {},
		
		checkDO: {
			model: 'MOST.model.document.BL',
			id: 'checkDOStore',
			proxy : {
				type : 'rest',
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/blinfo/checkDO'
			}
		},
		
		checkTruck: {
			model: 'MOST.model.document.BL',
			id: 'checkTruckStore',
			proxy : {
				type : 'rest',
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/blinfo/checkTruck'
			}
		},
		
		checkOperation: {
			model: 'MOST.model.document.BL',
			id: 'checkOperationStore',
			proxy : {
				type : 'rest',
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/blinfo/checkOperation'
			}
		},
		
		checkGateIn: {
			model: 'MOST.model.document.BL',
			id: 'checkGateInStore',
			proxy : {
				type : 'rest',
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/blinfo/checkGateIn'
			}
		},
		
		checkSplitWgt: {
			model: 'MOST.model.document.BL',
			id: 'checkSplitWgtStore',
			proxy : {
				type : 'rest',
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/blinfo/duplicateCheckSplitWgt'
			}
		},
		
		selectSplitWgt: {
			model: 'MOST.model.document.BL',
			id: 'checkSplitWgtStore',
			proxy : {
				type : 'rest',
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/blinfo/selectSplitWgt'
			}
		},
		
		checkSplitExist: {
			model: 'MOST.model.document.BL',
			id: 'checkSplitExistStore',
			proxy : {
				type : 'rest',
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/blinfo/checkSplitExist'
			}
		},
		
		roroSampleUpload: {
			storeId: 'generateSampleUpload',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/blinfo/rorosampleupload'
			}
		},
		
		packageSampleUpload: {
			storeId: 'generateSampleUpload',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/blinfo/packagesampleupload'
			}
		},
		
		operationTypeCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'operationTypeComboStore',
			proxy: {
			   type: 'rest',
			   showProgressBar : false,
			   url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
			   extraParams:{
				   lcd : CodeConstants.LCD_MOST,
				   mcd : CodeConstants.MCD_MT_TSPTTP
			   }
			},
		},
		
		confirmDelivery: {
			model: 'MOST.model.document.BL',
			storeId: 'confirmDeliveryStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/blinfo/confirmdelivery'
			}
		},
		
		blCombo: {
			//fields: ['scdNm','blno']
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'blComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_BL_NO
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  blNo: ''
			          }]);
			     }
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
		
		sdoWeightList: {
			model: 'MOST.model.document.BL',
			storeId: 'sdoWeightListComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/blinfo/sdoWeightList'
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
	}
});