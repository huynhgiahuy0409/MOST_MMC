Ext.define('MOST.view.document.CustomsCargoReleaseControlModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.customscargoreleasecontrol',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.document.CustomsCargoReleaseControl',
		'MOST.model.common.FileUpload'
	],
	
	formulas:{
		customReleaseDTString:{
			bind: {
				bindTo:'{theDetail.customReleaseDT}'
			},
			get: function(value) {
				return value;
			},
			set: function(value) {
				var me = this;
				me.setBindValue('{theDetail.customReleaseDT}', Ext.Date.format(value, MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
			}
		}
	},
	
	stores: {
		customsCargoReleaseControl: {
			model: 'MOST.model.document.CustomsCargoReleaseControl',
			storeId: 'customsCargoReleaseControlStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/customscargoreleasecontrol/list'
			}
		},
		
		categoryCombo : {},
		
		channelCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'channelComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: ComboboxServiceConstants.COMBO_CHANNEL
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
		
		masterBlItems : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'masterBlComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
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
		
		bookingNoItems : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'bookingNoComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_BOOKING_NO
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
		
		docNoItems:{
			fields: ['cdNm','cd'],
			storeId: 'docNoItemsStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
			}
		},
		
		docNoInfo:{
			model: 'MOST.model.document.CustomsCargoReleaseControl',
			storeId: 'docNoInfoStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/customscargoreleasecontrol/docNoInfo'
			}
		},
		
		blSnItems:{
			fields: ['cdNm','cd'],
			storeId: 'blSnItemsStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/customscargoreleasecontrol/blSnItems'
			}
		},

		//sMantis: 0167587
		blNoItems: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'blNoStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_BL_NO
				}
			},
			listeners:  {
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  blNo: ''
			          }]);
			     }
			}
		},

		shipgNoteNoItems: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'shipgNoteComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SN_NO
				}
			},
			listeners:  {
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  blNo: ''
			          }]);
			     }
			}
		},
		
		cargoNoInfo: {
			model: 'MOST.model.document.CustomsCargoReleaseControl',
			storeId: 'cargoNoInfoStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/customscargoreleasecontrol/cargoNoInfo'
			}
		},

		blNoCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'blNoStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_BL_NO
				}
			},
			listeners:  {
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  blNo: ''
			          }]);
			     }
			}
		},

		shipgNoteNoCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'shipgNoteComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SN_NO
				}
			},
			listeners:  {
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  blNo: ''
			          }]);
			     }
			}
		},
		//eMantis: 0167587
	}
});