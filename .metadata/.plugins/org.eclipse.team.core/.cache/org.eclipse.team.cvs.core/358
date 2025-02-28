Ext.define('MOST.view.monitoring.HandlingInOutListModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.handlinginoutlist',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.CargoHandlingOut'
	],
	
	stores: {
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
			}
		},
		
		shiftCombo:{
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'shiftComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: 'SHFTTP',
					shftMethCd: 'Standard'
				},
				listeners:{
				load: function(store, records){
					store.insert(0,[{shftId: '', shftNm: 'Select'}])
					}
				}
			}
		},
		
		whCombo: {
			fields: ['locNm','locId'],
			storeId: 'whComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/handlinginoutlist/whCombo',
				extraParams: {
					locDivCd: 'WHO'
				}
			}
		},
		
		listCombo: {
			model: 'MOST.model.operation.CargoHandlingOut',
			storeId: 'listComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/handlinginoutlist/setCombo',
			}
		},
		
		shippingNoteListCombo:{
			fields:['docNo'],
			storeId:'shippingNoteListComboStore'
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
		
		BLNoList: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'BLNoListStore',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_BL_NO
				}
			}
		},
		
		blListCombo:{
			fields:['docNo'],
			storeId:'blListComboStore'
		},
		
		grListCombo:{
			fields:['docNo'],
			storeId:'grListCombo'
		},
		
		handlingList:{
			model: 'MOST.model.operation.CargoHandlingOut',
			storeId: 'handlingListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/handlinginoutlist/handlingList',
			}
		},
		
		compareModeCombo:{},

		shiftList: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'shiftComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: 'SHFTTP',
					shftMethCd: 'Standard'
				}
			}
		},
		
		warehouseTypeCombo : {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'warehouseTypeComboComboStore',
			proxy: {
			   type: 'rest',
			   url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
			   extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_WHTP
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'All',
			              scd: ''
			          }]);
			     }
			}
		},
		
		cargoTpCombo: {
			storeId: 'cargoTpStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_CGTP
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'All',
			        	  scd: ''
			          }]);
			     }
			}
		},
		
		unitNosList: {
			model: 'MOST.model.monitoring.AssignedTruck',
			id: 'unitNosListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			autoLoad:false,
			proxy : {
				type : 'rest',
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/assignedtrucklist/unitNoList'
			}
		},
	}
});