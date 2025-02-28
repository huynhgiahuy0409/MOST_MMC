Ext.define('MOST.view.operation.GateOperationModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.gateoperation',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.GateOperation'
	],

	data: {
		cgInfo: null,
	},
	
	stores: {

		////////////// Cargo
		
		gateComboList: {
			fields: ['scd','scdNm'],
			storeId: 'gateInComboListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() +  '/v1/combobox/codeMaster',
				extraParams: {
					searchType:'',
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_GATECD
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
		
		searchGateInList: {
			model: 'MOST.model.operation.GateOperation',
			storeId: 'searchGateInListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gateoperation/selectCargoGateInCheck'
			}
		},
		
		gateOutROROExport: {
			fields: 'MOST.model.operation.GateOperation',
			storeId: 'gateOutROROExportStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gateoperation/selectCargoLorryGateIn'
			}
		},
		
		dgStatusCombo : {
			fields: ['label','data'],
			storeId: 'dgComboListStore',
			data :  [
				{label:"",                data:''}, 
				{label:"Submit",          data:'N'}, 
				{label:"Save",            data:'S'},
				{label:"Confirm",         data:'Y'}, 
				{label:"Reject",          data:'R'},
				{label:"Cancel",          data:'C'}
			]
		},
		
		dgYnCombo : {
			fields: ['label','data'],
			storeId: 'dgYnComboStore',
			data :  [
				{label:"",       data:''}, 
				{label:"Y",      data:'Y'}, 
				{label:"N",      data:'N'}
			]
		},
		
		validationCheck: {
			storeId: 'validationCheck',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/validationcode/list',
				
			}
		},
		
		gateTicketNoPopup: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'gateTicketNoPopupStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/gateticketnopopup'
			}
		},
		
		////////////// RORO
		
		
		
		// HHT Tablet
		listOfGateIn: {
			model: 'MOST.model.operation.GateOperation',
			storeId: 'listOfGateInStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gatein/list'
			}
		},
		gateOut: {
			model: 'MOST.model.operation.GateOperation',
			storeId: 'gateOutStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gateout/list'
			}
		},
		
		gateInForRoRo: {
			model: 'MOST.model.operation.GateOperation',
			storeId: 'gateInForRoRoStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gateoperation/gateinforrorolist'
			}
		},
		
		gateInForRoRoByDriver: {
			model: 'MOST.model.operation.GateOperation',
			storeId: 'gateInForRoRoByDriverStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gateoperation/gateInforrorobydriverList'
			}
		},
		
		gateOutForRoRo: {
			model: 'MOST.model.operation.GateOperation',
			storeId: 'gateOutForRoRoStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gateoperation/gateoutforrorolist'
			}
		},
		
		gateOutForRoRoByDriver: {
			model: 'MOST.model.operation.GateOperation',
			storeId: 'gateOutForRoRoByDriverStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gateoperation/gateoutforrorobydriverlist'
			}
		},
		
		gateInCargo: {
			model: 'MOST.model.operation.GateOperation',
			storeId: 'gateInCargoStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gateoperation/selectCargoLorryGateOut'
			}
		},
		
		gateOutCargo: {
			model: 'MOST.model.operation.GateOperation',
			storeId: 'gateInCargoStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gateoperation/selectCargoLorryGateOut'
			}
		},
		
		terminalHoldGateInCheckStore: {
			model: 'MOST.model.document.TerminalHoldReleaseControl',
			storeId: 'terminalHoldGateInCheckStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/terminalholdreleasecontrol/checkTerminalHold'
			}
		},

		//sMantis: 0167331
		unitNoListForSNStore: {
			model: 'MOST.model.document.ShippingNote',
			id: 'unitListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			autoLoad:false,
			proxy : {
				type : 'rest',
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/shippingnote/unitlist'
			}
		},

		unitNoListForBLStore: {
			model: 'MOST.model.document.BL',
			id: 'unitListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			autoLoad:false,
			proxy : {
				type : 'rest',
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/blinfo/unitlist'
			}
		},

		unitNoForGateInStore: {
			
		},

		unitNoForGateOutStore: {
			
		},
		//eMantis: 0167331

		driverListStore: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'commonCodePopupStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gateoperation/getSuggestionList',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_DRIVER
				}
			}
		},

		lorryListStore: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'lorryListPopupStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gateoperation/getSuggestionList',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_TRUCK
				}
			},
			autoLoad: false
		},

		blDOListStore: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'blDoGridListStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gateoperation/getSuggestionList',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_BL_NO
				}
			},
		},  

		shippingNoteListStore: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'shippingNoteGridListStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gateoperation/getSuggestionList',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SN_NO
				}
			},
		},
		uploadedFileDamageStore: {
			model : 'MOST.model.common.FileUpload',
			storeId: 'uploadedFileDamageStore',
		},
		theDamageStore:{
			model: 'MOST.model.operation.DamageCheck',
			storeId: 'theDamageStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/damageDimensionCheck/listDamage'
			}
		},
		damageCheckDetail: {
			model : 'MOST.model.operation.DamageCheck',
			storeId: 'damageCheckDetailStore',
		},
	}, 
});