Ext.define('MOST.view.operation.hht.DamageCheckModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.damagecheckofhht',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.DamageCheck',
		'MOST.model.operation.TheListOfDamageCheckOfRORO'
	],

	stores: {
		
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
		theDamageStore:{
			model: 'MOST.model.operation.DamageCheck',
			storeId: 'theDamageStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/damageDimensionCheck/listDamage'
			}
		},
		roroDamageCheckDetail:{
			model: 'MOST.model.operation.DamageCheck',
			storeId: 'roroDamageCheckDetail',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/damageDimensionCheck/listDamage'
			}
		},
		uploadedFileDamageStore: {
			model : 'MOST.model.common.FileUpload',
			storeId: 'uploadedFileDamageStore',
		},
		
		damageStore:{
			model: 'MOST.model.operation.DamageCheck',
			storeId: 'damageStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/damageDimensionCheck/listDamage'
			}
		},
		
		snBlCombo: {
			model: 'MOST.model.operation.DamageCheck',	
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/damageDimensionCheck/blSnNo'
			}
		},
		
		doGrCombo: {
			model: 'MOST.model.operation.DamageCheck',	
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/damageDimensionCheck/doGrNo'
			}
		},
		
	}
});