Ext.define('MOST.view.configuration.BerthLocationConfigurationModel', {
	extend: 'MOST.view.foundation.BaseViewModel',
	
	alias: 'viewmodel.berthLocationConfiguration',
	
	requires:[
		'Ext.data.proxy.Rest',
		'MOST.model.foundation.dataitem.DataItem'
	],
	
	stores:{
		terminalCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'terminalComboStore',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					lcd: CodeConstants.LCD_VCS1,
					mcd: CodeConstants.MCD_VC_TMNL
				}
			}
		},
		
		berthTypeCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			fields: ['berthTp', 'berthTpNm'],
			storeId: 'berthTypeCombo',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					lcd: CodeConstants.LCD_COM,
					mcd: CodeConstants.MCD_CM_BERTH
				}
			}
		},
		
		berthWharfLocation: {
			model: 'MOST.model.configuration.BerthLocationConfiguration',
			storeId: 'berthWharfStore',
			autoLoad: false,
			proxy:{
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/berthLocation/BerthWharfs'
			}
		},
		
		duplicateCheck:{
			model: 'MOST.model.configuration.BerthLocationConfiguration',
			storeId: 'duplicateCheckStore',
			proxy:{
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/berthLocation/BerthWharfs/validateDuplicate'
			}
		},
		
		yesNoValue:{}
	}

});