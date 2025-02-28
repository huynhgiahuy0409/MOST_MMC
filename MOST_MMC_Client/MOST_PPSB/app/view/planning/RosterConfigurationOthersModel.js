Ext.define('MOST.view.planning.RosterConfigurationOthersModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.rosterconfigurationmonthlyothers',

	requires: [
		'Ext.data.proxy.Rest',
	],
	
	data: {
	},

	stores: {
		stafflList: {
			model: 'MOST.model.planning.RosterConfigurationOthers',
			storeId: 'stafflListStore',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rosterconfigurationothers/stafflist',
			}
		},
		
		roleCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'roleComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_COM,
					mcd: CodeConstants.MCD_CM_ROLECD,
					scdLgv: CodeConstants.CM_USERTP_I,
					scdUse: 'Y'
		        }
			},
			listeners: {
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select Role',
			        	  scd: ''
			          }]);
			     }
			}
		},
		
		workingAreaCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'workingAreaStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_COM,
					mcd: CodeConstants.MCD_CM_WORKLOCCD
		        }
			},
			listeners: {
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select All',
			        	  scd: ''
			          }]);
			     }
			}
		},
		
		reasonCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'reasonComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_STATRSN
		        }
			},
			listeners: {
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select Reason',
			        	  scd: ''
			          }]);
			     }
			}
		},
		
		shiftTypeCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'shiftTypeComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_SHFT_TYPE,
					shftMethCd: ComboboxServiceConstants.COMBO_STAFF
		        }
			},
			listeners: {
				load: function(store, records) {
			          store.insert(0, [{
			        	  shftTpCdNm: 'Select',
			        	  shftTpCd: ''
			          }]);
			     }
			}
		},
		
		costCenterCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'costCenterComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_COSTCNT_CD
		        }
			},
			listeners: {
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select Code',
			        	  scd: ''
			          }]);
			     }
			}
		},
		
		shiftGroupCombo: {
			fields: ['shftNm','shftId'],
			storeId: 'shiftGroupComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_SHFTTP
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
		
		generatePDF: {
			model: 'MOST.model.planning.RosterConfigurationOthers',
			storeId: 'generatePDFStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rosterconfigurationothers/previewpdf'
			}
		},
		
		unitDropDownListCombo:{}
	}
});