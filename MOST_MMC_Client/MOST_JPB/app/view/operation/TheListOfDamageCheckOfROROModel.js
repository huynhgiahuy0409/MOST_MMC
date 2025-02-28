Ext.define('MOST.view.operation.TheListOfDamageCheckOfROROModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.theListOfDamageCheckOfRORO',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.TheListOfDamageCheckOfRORO'
	],


	stores: {
		theListOfDamageCheckOfRORO: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
			storeId: 'theListOfDamageCheckOfROROStore',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/list'
			}
		},

		categoryCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'categoryComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_CATGTP
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

		blCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'blComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_BL_NO,
					tyCd: CodeConstants.CGMST_TSPT_TP_RR
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

		snCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'shippingNoteComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SN_NO,
					tyCd: CodeConstants.CGMST_TSPT_TP_RR
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  shipgNoteNo: ''
			          }]);
			     }
			}
		},

		roroDamageCheckDetail: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
			storeId: 'roroDamageCheckDetailStore',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/rorodamagecheckdetail'
			}
		},
		
		roroDamageCheckDetailGrid: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
			storeId: 'roroDamageCheckDetailGridStore',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/rorodamagecheckdetail'
			}
		},
		roroDamageCheckInventory: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
			storeId: 'roroDamageCheckInventoryStore',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/rorodamagecheckinventory'
			}
		},
		
		checkRoRoInventory: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
			storeId: 'checkRoRoInventoryStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/checkrorodamagecheckinventory'
			}
		},
		theDamageParts: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
			storeId: 'theDamagePartsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/thedamageparts'
			}
		},
		theDamageLevels: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
			storeId: 'theDamageLevelsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/thedamagelevels'
			}
		},
		cargoPopupItems: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
			storeId: 'cargoItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/cargoitems'
			}
		},
		unitPopupItems: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
			storeId: 'unitItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/unititems'
			}
		},
		JPVCPopupStore: {
			model: 'MOST.model.popup.VesselCallList',
			storeId: 'JPVCPopupStoreId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/vesselcalllistpopup'
			}
		},
		
		uploadedRoRoFileDamageStore: {
//			model : 'MOST.model.common.FileUpload',
//			storeId: 'uploadedFileRoRoDamageStore',
			model: 'MOST.model.fileupload.FileUpload',
			storeId: 'permitCertificateUploadUpload',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/filelist'
			}
		},

		fileDownload : {
			model : 'MOST.model.fileupload.FileUpload',
			storeId: 'fileDownloadStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/filedownload/download'
			}
		},
	}

});