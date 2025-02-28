Ext.define('MOST.view.document.ShippingNoteModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.shippingnote',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.document.ShippingNote',
		'MOST.model.common.SearchVesselCall'
	],
	
	data: {
		theSearch: null,
	},

	stores: {
		
		searchVesselCallDetail: {
			model: 'MOST.model.common.SearchVesselCall',
			storeId: 'searchVesselCallDetailStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/shippingnote/selectSearchVesselCallId'
			}
		},
		
		shippingNoteGridList: {
			model: 'MOST.model.document.ShippingNote',
			storeId: 'shippingNoteGridListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/shippingnote/shippingnotelist'
			}
		},
		
		shippingNoteDetailList: {
			model: 'MOST.model.document.ShippingNote',
			storeId: 'shippingNoteDetailListStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/shippingnote/shippingnotedetail'
			}
		},

		goodsListGrid: {
			model: 'MOST.model.document.ShippingNote',
		},
		
		shippingNoteDetail: {
			model: 'MOST.model.document.ShippingNote',
			storeId: 'shippingNoteStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/shippingnote/shippingnotedetail'
			}
		},
		
		/**
		 * 20241101:
		*/
		shippingNoteUploadInfo: {
			model: 'MOST.model.document.ShippingNote',
			storeId: 'shippingNoteUploadInfoStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/shippingnote/filelist'
			}
		},
		
		shippingNoteSASubmit:{
			model: 'MOST.model.document.ShippingNote',
			storeId: 'shippingNoteSASubmitStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/shippingnote/shippingnotesasubmit'
			}
		},
		
		shippingNoteFASubmit:{
			model: 'MOST.model.document.ShippingNote',
			storeId: 'shippingNoteFASubmitStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/shippingnote/shippingnotefasubmit'
			}
		},
		
		shippingNoteFileUpload: {
			model: 'MOST.model.fileupload.FileUpload',
			storeId: 'equipmentDetailUpload',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/equipment/filelist'
			}
		},
		
		shippingNoteFileDownload : {
			model : 'MOST.model.fileupload.FileUpload',
			storeId: 'equipmentDetailDownloadStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/filedownload/download'
			}
		},
		
		getLinkedBLNo:{
			model: 'MOST.model.document.ShippingNote',
			storeId: 'getLinkedBLNoStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/shippingnote/getlinkedblno'
			}
		},
		
		getCRBNo:{
			model: 'MOST.model.document.ShippingNote',
			storeId: 'getCRBNoStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/shippingnote/getcrbno'
			}
		},
		
		deliveryModeCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'deliveryModeComboStore',
			proxy: {
			   type: 'rest',
			   showProgressBar : false,
			   url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
			   extraParams: {
				   lcd: CodeConstants.LCD_MOST,
				   mcd: CodeConstants.MCD_MT_DELVTP
			   }
			},
			filters : function(item){
				var excludes = [CodeConstants.VSLSCH_DELV_TP_CD_BOTH];
				
				if(!excludes.includes(item.data.scd)){
					return item;
				}
			},
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
		},
		
		sampleUpload: {
			storeId: 'generateSampleUpload',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/shippingnote/rorosampleupload'
			}
		},
		
		categoryCombo : {},
		
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
			model: 'MOST.model.document.ShippingNote',
			id: 'unitListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			autoLoad:false,
			proxy : {
				type : 'rest',
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/shippingnote/unitlist'
			}
		},
		
		shippingNotePkgDetail: {
			model: 'MOST.model.document.ShippingNote',
			storeId: 'shippingNotePackageStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/shippingnote/shippingnotepkgdetail'
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
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/shippingnote/validationSn'
			}
		},
		
		packageSampleUpload: {
			storeId: 'generateSampleUpload',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/shippingnote/packagesampleupload'
			}
		},
		
		updateConfirmLoadingStatus: {
			model: 'MOST.model.document.ShippingNote',
			storeId: 'updateConfirmLoadingStatusStoreId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/shippingnote/updConfirmLoadingStt'
			}
		},
	}
});