Ext.define('MOST.view.operation.DamageCheckModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.damagecheck',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.DamageCheck',
		// 'MOST.model.operation.TheListOfDamageCheckOfRORO',
		'MOST.model.operation.TheListOfDamageCheckOfGC',
		'MOST.model.common.FileUpload',
	],

	data: {
		tblDamageCheckDetail: Ext.create('MOST.model.operation.DamageCheck'),
		theDmg: null,
		theUnitInfo: null
	},

	stores: {
		
		// theDamageParts: {
		// 	model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
		// 	storeId: 'theDamagePartsStore',
		// 	proxy: {
		// 		type: 'rest',
		// 		url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/thedamageparts'
		// 	}
		// },
		// theDamageLevels: {
		// 	model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
		// 	storeId: 'theDamageLevelsStore',
		// 	proxy: {
		// 		type: 'rest',
		// 		url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/thedamagelevels'
		// 	}
		// },
		theDamageDesc: {
			model: 'MOST.model.operation.DamageCheck',
			storeId: 'theDamageDescStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/damageDimensionCheck/thedamagedesc'
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

		fileDownloadDamageStore: {
			model : 'MOST.model.common.FileUpload',
			storeId: 'fileDownloadDamageStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/filedownload/download'
			}
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

		damageCheckDetail: {
			model : 'MOST.model.operation.DamageCheck',
			storeId: 'damageCheckDetailStore',
		},
		
		snBlCombo: {
			model: 'MOST.model.operation.DamageCheck',	
			proxy: {
				type: 'rest',
				showProgressBar : true,
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

		lorryNoCombo: {
			modeL: 'MOST.model.operation.DamageCheck',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/damageDimensionCheck/lorryNo'
			}
		},
		
		infoBlSn: {
			model: 'MOST.model.operation.DamageCheck',	
			proxy: {
				type: 'rest',
				showProgressBar : true,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/damageDimensionCheck/inforblsn'
			}
		},

		gcDamageCheckDetail: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfGC',
			storeId: 'gcDamageCheckDetailStore',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofgc/gcdamagecheckdetail'
			}
		},

		JPVCPopupStore: {
			model: 'MOST.model.popup.JPVCPopup',
			storeId: 'JPVCPopupStoreId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/jpvcpopup'
			}
		},

		tblDtlMasterBlComboStore: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfGC',
			storeId: 'tblDtlMasterBlComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofgc/tblmfdocid'
			}
		},

		tblDtlBookingNoComboStore: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfGC',
			storeId: 'tblDtlBookingNoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofgc/tblmfdocid'
			}
		},

		tblDtlBlComboStore: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfGC',
			storeId: 'tblDtlBlComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofgc/tblblitems'
			}
		},

		tblDtlSnComboStore: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfGC',
			storeId: 'tblDtlSnComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofgc/tblsnitems'
			}
		},

		// tblDamageParts: {
		// 	fields: ['invCd','invDesc'],
		// 	storeId: 'tblDamageParts',
		// 	proxy: {
		// 		type: 'rest',
		// 		url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/thedamageparts'
		// 	}
		// },
		
		// tblDamageLevels: {
		// 	fields: ['invCd','invDesc'],
		// 	storeId: 'tblDamageLevels',
		// 	proxy: {
		// 		type: 'rest',
		// 		url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/thedamagelevels'
		// 	}
		// },
		pkgNoCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'pkgNoStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_PACKAGE_NO
				}
			},
		}
	}
});