Ext.define('MOST.view.document.TerminalHoldReleaseControlModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.terminalholdreleasecontrol',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.document.TerminalHoldReleaseControl',
		'MOST.model.common.FileUpload'
	],
	
	formulas:{
		ieString:{
			bind: {
				bindTo:'{theDetail.ie}'
			},
			get: function(value) {
				if(value == 'I') return 'Import';
				else if(value == 'E') return 'Export';
			},
			set: function(value) {
				var me = this;
				me.setBindValue('{theDetail.ix}', value);
			}
		}
	},
	
	stores: {
		terminalHoldReleaseControl: {
			model: 'MOST.model.document.TerminalHoldReleaseControl',
			storeId: 'terminalHoldReleaseControlStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/terminalholdreleasecontrol/list'
			}
		},
		
		terminalHoldReleaseControlHistory: {
			model: 'MOST.model.document.TerminalHoldReleaseControl',
			storeId: 'terminalHoldReleaseControlStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/terminalholdreleasecontrol/history'
			}
		},
		
		statusCombo : {},
		
		masterBlItems : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'masterBlItemsStore',
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
		
		blItems : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'blItemsStore',
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
		
		bookingNoItems : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'bookingNoItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
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
		
		snNoItems : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'snNoItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SN_NO
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
		
		holdReasonCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'holdReasonComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_THC
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
		
		operationStopedCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'operationStopedComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_COM,
					mcd: CodeConstants.MCD_MT_TMNLOPETP
				}
			}
		},
	}
});