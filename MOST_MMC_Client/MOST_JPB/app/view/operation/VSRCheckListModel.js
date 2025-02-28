Ext.define('MOST.view.operation.VSRCheckListModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.vsrchecklist',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.VSRCheckList',
		'MOST.model.operation.Mega'
	],
	
	formulas:{
		
	},
	
	stores: {
		
		vsrCheckList: {
			model: 'MOST.model.operation.VSRCheckList',
			storeId: 'vsrCheckListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/list'
			}
		},
		
		empPopupHHTList: {
			model: 'MOST.model.operation.VSRCheckList',
			storeId: 'vsrCheckListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/emppopuphhtlist'
			}
		},
		
		verifyVSRCheckList: {
			model: 'MOST.model.operation.VSRCheckList',
			storeId: 'verifyVSRCheckListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/verify'
			}
		},
		
		vsrCheckListDetail: {
			model: 'MOST.model.operation.VSRCheckList',
			storeId: 'vsrCheckListDetailStore',
			autoLoad:false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/detail'
			}
		},
		
		categoryCombo:{
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'categoryComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_LOCDIV1
				}
			}
		},
		
		roleCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'roleComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_COM,
					mcd: CodeConstants.MCD_CM_ROLECD,
					col3: 'VSR'
				}
			}
		},
		
		cargoCombo: {//CGTPNLQ
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'cargoComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_CGTP
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
			}
		},
		
		eqCodeCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'eqCodeComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_EQFCTPCD,
					scdLgv: CodeConstants.MT_EQFCDIVCD_EQ
				}
			}
		},
		
		workLocCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'workLocComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_MGPURP
				},
				listeners: 
				{
					load: function(store, records) {
				          store.insert(0, [{
				        	  cdNm: 'Select',
				        	  cd: ''
				          }]);
				     }
				}
			}
			
		},
		
		purposeCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'purposeComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_MGPURP
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
			}
			
		},
		
		bulkWharfCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'bulkWharfComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: ComboboxServiceConstants.COMBO_BERTH_LOC,
					scd: 'BBT',
					berthTp: CodeConstants.MT_WPCD_WRF
				},
				listeners: 
				{
					load: function(store, records) {
				          store.insert(0, [
				        	  {scdNm: 'Select',scd: ''},
				        	  {scdNm: 'H1',scd: 'H1'},
				        	  {scdNm: 'H2',scd: 'H2'},
				        	  {scdNm: 'H3',scd: 'H3'},
				        	  {scdNm: 'H4',scd: 'H4'},
				        	  {scdNm: 'H5',scd: 'H5'},
				        	  {scdNm: 'H6',scd: 'H6'},
				        	  {scdNm: 'H7',scd: 'H7'},
				        	  {scdNm: 'H8',scd: 'H8'},
				        	  {scdNm: 'H9',scd: 'H9'},
				        	  {scdNm: 'H10',scd: 'H10'},
				        	  {scdNm: 'H11',scd: 'H11'},
				          ]);
				     }
				}
			}
			
		},
		
		edjCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'edjComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: ComboboxServiceConstants.COMBO_BERTH_LOC,
					scd: 'BBT',
					berthTp: CodeConstants.MT_WPCD_EDJ
				}
			},
		},
		
		ndjCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'ndjComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: ComboboxServiceConstants.COMBO_BERTH_LOC,
					scd: 'BBT',
					berthTp: CodeConstants.MT_WPCD_NDJ
				}
			}
		},
		
		bulkWharfFLCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'bulkWharfFLComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					scd: 'BBT',
					mcd: ComboboxServiceConstants.COMBO_BERTH_LOC
				}
			}
		},
		
		berthLocCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'berthLocComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					scd: 'BBT',
					mcd: ComboboxServiceConstants.COMBO_BERTH_LOC
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
			}
			
		},
		
		warehouseCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'warehouseComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					divCd: 'WHO',
					mcd: 'WH_CD'
				},
				
				listeners: 
				{
					load: function(store, records) {
				          store.insert(0, [
				        	  {scdNm: 'Select',scd: ''},
				        	  {scdNm: 'H1',scd: 'H1'},
				        	  {scdNm: 'H2',scd: 'H2'},
				        	  {scdNm: 'H3',scd: 'H3'},
				        	  {scdNm: 'H4',scd: 'H4'},
				        	  {scdNm: 'H5',scd: 'H5'},
				        	  {scdNm: 'H6',scd: 'H6'},
				        	  {scdNm: 'H7',scd: 'H7'},
				        	  {scdNm: 'H8',scd: 'H8'},
				        	  {scdNm: 'H9',scd: 'H9'},
				        	  {scdNm: 'H10',scd: 'H10'},
				        	  {scdNm: 'H11',scd: 'H11'},
				          ]);
				     }
				}
			}
			
		},
		
		warehouseFLCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'warehouseFLComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					divCd: 'WHO',
					mcd: 'WH_CD'
				}
			}
		},
		
		manPowerList: {
			model: 'MOST.model.operation.VSRCheckList',
		},
		
		empidlist: {
			model: 'MOST.model.operation.VSRCheckList',
			storeId: 'manPowerListStore',
			autoLoad:false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/empidlist'
			}
		},
		
		empList:{
			model: 'MOST.model.operation.VSRCheckList',
			storeId:'empListStore',
			autoLoad:false
		},
		
		forkliftList: {
			model: 'MOST.model.operation.VSRCheckList',
		},
		
		mechanicalEqList: {
			model: 'MOST.model.operation.VSRCheckList',
		},
		
		portCraneList: {
			model: 'MOST.model.operation.VSRCheckList',
		},
		
		trailerList: {
			model: 'MOST.model.operation.VSRCheckList',
		},
		
		stevedoreList: {
			model: 'MOST.model.operation.VSRCheckList',
		},
		
		megaPCList: {
			model: 'MOST.model.operation.Mega',
		},
		
		megaFList: {
			model: 'MOST.model.operation.Mega',
		},
		
		megaMEList: {
			model: 'MOST.model.operation.Mega',
		},
		
		megaTRList: {
			model: 'MOST.model.operation.Mega',
		},
		
		shiftCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'shiftComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SHFTTP,
					shftMethCd : ComboboxServiceConstants.COMBO_STANDARD
				}
			},
			listeners: {
				load: function(store, records) {
			          store.insert(0, [{
			        	  shftNm: 'Select',
			        	  shftId: ''
			          }]);
			     }
			}
		},
		
		shiftList: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'shiftListStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SHFTTP,
					shftMethCd : ComboboxServiceConstants.COMBO_STANDARD
				}
			},
		},
		
		stvCompCombo:{
			fields: ['engPtyNm','ptyCd'],
			storeId: 'stvCompComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/partnercodelistcombo',
				extraParams: {
					comboType: 'COMP',
		        }
			}
		},
		
		flNoCombo: {
			fields: ['engNm','eqNo'],
			storeId: 'flNoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/flnocombo',
				extraParams: {
					comboType: 'FLNO'
		        }
			}
		},
		
		eqPCCombo: {
			fields: ['engNm','eqNo'],
			storeId: 'eqPCComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/deployeqnocombo',
				extraParams: {
					comboType: 'EQNO'
		        }
			}
		},
		
		empMPCombo: {
			fields: ['empNm','empId'],
			storeId: 'empMPComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/empidcombo',
				extraParams: {
					comboType: 'EMPMP'
		        }
			}
		},
		
		empPCCombo: {
			fields: ['empNm','empId'],
			storeId: 'empPCComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/empidcombo',
				extraParams: {
					comboType: 'EMPPC',
					roleCd: 'CO'
		        }
			},
		},
		
		empFLCombo: {
			fields: ['empNm','empId'],
			storeId: 'empFLComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/empidcombo',
				extraParams: {
					comboType: 'EMPFL',
					eqTp: 'FL',
					roleCd: 'FD'
		        }
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
						  empNm: 'Select',
			        	  empId: ''
			          }]);
			     }
			}
		},
		
		cttCompCombo:{
			fields: ['engPtyNm','ptyCd'],
			storeId: 'companyComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/partnercodelistcombo',
				extraParams: {
					comboType: 'COMP',
		        }
			}
		},
		
		requestorCombo:{
			fields: ['engPtyNm','ptyCd'],
			storeId: 'requestorComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/partnercodelistcombo',
				extraParams: {
					comboType: 'COMP',
		        }
			}
		},

		workingAreaCombo:{
			fields: ['cdNm','cd'],
			storeId: 'workingAreaComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/workingarealist',
				extraParams: {
					comboType: 'category',
		        }
			}
		},
		
		eqTypeTRCombo: {
			fields: ['eqFacNm','eqFacNo'],
			storeId: 'eqTypeTRComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/equipmenttrlistcombo',
				extraParams: {
					comboType: 'EQTPTR'
		        }
			}
		},
		
		equipmentCombo: {
			fields: ['capaDescr','capaCd'],
			storeId: 'equipmentComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/requipmentcapalistcombo',
				extraParams: {
					comboType: 'Equipment'
		        }
			}
		},
		
		hatchCombo : {
			fields: ['cdNm','cd'],
			storeId: 'hatchComboStore',
			data :  [
				{"cd": "",  "cdNm": "Select"},
				{"cd":"H1", "cdNm":"H1"},
				{"cd":"H2", "cdNm":"H2"},
				{"cd":"H3", "cdNm":"H3"},
				{"cd":"H4", "cdNm":"H4"},
				{"cd":"H5", "cdNm":"H5"},
				{"cd":"H6", "cdNm":"H6"},
				{"cd":"H7", "cdNm":"H7"},
				{"cd":"H8", "cdNm":"H8"},
				{"cd":"H9", "cdNm":"H9"},
				{"cd":"H10", "cdNm":"H10"},
				{"cd":"H11", "cdNm":"H11"},
			]
		},
		
		workAreaCombo : {
			fields: ['scdNm','scd'],
			storeId: 'workAreaComboStore',
			data :  [
				{"scd":"", "scdNm":"Select"},
				{"scd":"HTC", "scdNm":"Hatch"},
				{"scd":"WRF", "scdNm":"Bulk Wharf"},
				{"scd":"WHO", "scdNm":"Warehouse"},
				{"scd":"OTH", "scdNm":"Others"}
			]
		},
		
		noneStore : {
			fields: ['scdNm','scd'],
			storeId: 'noneStore',
			data :  [
				{"scd":"", "scdNm":"Select"},
			]
		},

		workAreaMECombo : {
			fields: ['scdNm','scd'],
			storeId: 'workAreaComboStore',
			data :  [
				{"scd":"HTC", "scdNm":"Hatch"},
				{"scd":"WRF", "scdNm":"Bulk Wharf"},
				{"scd":"WHO", "scdNm":"Warehouse"},
				{"scd":"EDJ", "scdNm":"Edible Jetty"},
				{"scd":"NDJ", "scdNm":"Non Edible Jetty"}
			]
		},
		
		groupFLCombo : {
			fields: ['name','code'],
			storeId: 'groupFLComboStore',
			data :  [
				{"scd":"", "scdNm":"NoDriver"},
				{"scd":"JPB", "scdNm":"JPB"},
				{"scd":"CTR", "scdNm":"Contractor"}
			]
		},
		
		groupMECombo : {
			fields: ['scdNm','scd'],
			storeId: 'groupMEComboStore',
			data :  [
				{"scd":"N", "scdNm":"Contractor"},
				{"scd":"Y", "scdNm":"Ship's Crew"}
			]
		},
		
		craneGroupCombo : {
			fields: ['scdNm','scd'],
			storeId: 'eqTypeComboStore',
			data :  [
				{"scdNm":"Port Crane", "scd":"PORTCR"},
				{"scdNm":"Ship Crane", "scd":"SHIPCR"}
			]
		},
		
		shipCraneCombo : {
			fields: ['scdNm','scd'],
			storeId: 'shipCraneComboStore',
			data :  [
				{"scd":"SHIPCR1", "scdNm":"SHIP CRANE 1"},
				{"scd":"SHIPCR2", "scdNm":"SHIP CRANE 2"},
				{"scd":"SHIPCR3", "scdNm":"SHIP CRANE 3"},
				{"scd":"SHIPCR4", "scdNm":"SHIP CRANE 4"}
			]
		},
		
		delvModeCombo : {
			fields: ['scdNm','scd'],
			storeId: 'delvModeComboStore',
			data :  [
					{"scd":"D", "scdNm":"DIRECT"},
					{"scd":"I", "scdNm":"INDIRECT"}
            ]
		},
		
		APFPCombo : {
			fields: ['name','code'],
			storeId: 'APFPComboStore',
			data :  [
				{"code":"", "name":"_"},
				{"code":"AP", "name":"AP"},
				{"code":"FP", "name":"FP"}
			]
		},
		
		shipCrewCombo : {
			fields: ['scdNm','scd'],
			storeId: 'shipCrewComboStore',
			data :  [
					{"scd":"Y", "scdNm":"Yes"},
					{"scd":"N", "scdNm":"No"}
            ]
		},
		requesterCombo:{
			fields: ['requester'],
			storeId: 'requesterComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/requester',
			}
		},
		generatePDFVSR:  {
			model: 'MOST.model.operation.VSRCheckList',
			storeId: 'generatePDFDryBreakBulkDtlStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/generatepdfvsr'
			}
		},
		
		driverTp:{
			fields: ['scd','scdNm'],
			storeId: 'driverTpStore',
			data :  [
				{"scd":"JPB", "scdNm":"JPB"},
				{"scd":"CTR", "scdNm":"Contractor"}
			]
		},
		
		dmodeCombo : {
			fields: ['name','code'],
			storeId: 'dmodeComboStore',
			data :  [{"code":"", "name":"Select"},
					{"code":"D", "name":"Direct"},
					{"code":"I", "name":"Indirect"}
	        ]
		},
		
		VSRValidationCode: {
			fields: ['isValidated'],
			storeId: 'cargoManualCtlValidationCodeStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/validationcode/list'
			}
		},
		
		locationCodeListStore: {
			fields: ['cdNm','cd'],
			storeId: 'locationListStore',
			data :  [ 
				  {"cdNm": 'Select',"cd": ''},
	        	  {"cdNm": 'BTE',"cd": 'BTE'},
	        	  {"cdNm": 'MOSS',"cd": 'MOSS'},
	        	  {"cdNm": 'CT1',"cd": 'JCT1'},
	        	  {"cdNm": 'CT2',"cd": 'JCT2'},
	        	  {"cdNm": 'CT3',"cd": 'JCT3'},
	        	  {"cdNm": 'Maintenance block',"cd": 'MBK'},
	        	  {"cdNm": 'JPL1',"cd": 'JPL1'}
	        ]
		},
		
		VesselCallIdPopupStore: {
			model: 'MOST.model.popup.VesselCallList',
			storeId: 'JPVCPopupStoreId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/vesselcalllistpopup'
			}
		},
	}
});