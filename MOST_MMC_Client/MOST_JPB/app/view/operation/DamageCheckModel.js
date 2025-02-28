Ext.define('MOST.view.operation.DamageCheckModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.damagecheck',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.DamageCheck',
	],

	stores: {
		
		theDamageParts: {
			model: 'MOST.model.codes.CodeMaster',
			storeId: 'theDamagePartsStore',
			proxy: {
			    type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					lcd : CodeConstants.LCD_MOST,
					mcd : CodeConstants.MCD_MT_DMGCHK,
					scdLgv: 'DMG_PART'
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
		
		theDamageLevels: {
			model: 'MOST.model.codes.CodeMaster',
			storeId: 'theDamageLevelsStore',
			proxy: {
			    type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					lcd : CodeConstants.LCD_MOST,
					mcd : CodeConstants.MCD_MT_DMGCHK,
					scdLgv: 'DMG_LEVEL'
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
		
		theDamageStore:{
			model: 'MOST.model.operation.DamageCheck',
			storeId: 'theDamageStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/damagecheck/list'
			}
		},
		
		uploadedFileDamageStore: {
			model : 'MOST.model.common.FileUpload',
			storeId: 'uploadedFileDamageStore',
		},

		snBlCombo: {
			model: 'MOST.model.operation.DamageCheck',	
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/damagecheck/blSnNo'
			}
		},
		
		doGrCombo: {
			model: 'MOST.model.operation.DamageCheck',	
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/damagecheck/doGrNo'
			}
		},
		
	}
});