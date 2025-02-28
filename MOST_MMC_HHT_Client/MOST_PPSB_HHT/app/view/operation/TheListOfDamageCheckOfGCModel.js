Ext.define('MOST.view.controller.TheListOfDamageCheckOfGCModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.theListOfDamageCheckOfGC',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.TheListOfDamageCheckOfGC',
		'MOST.model.popup.PopupService',
		'MOST.model.common.FileUpload',
		'MOST.model.operation.DamageCheck',
	],

	data: {
		tblDamageCheckDetail: Ext.create('MOST.model.operation.DamageCheck')
	},
	
	stores: {
		
		theListOfDamageCheckOfGC: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfGC',
			storeId: 'theListOfDamageCheckOfGCStore',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofgc/list'
			}
		},
		
		categoryCombo: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfGC',
			storeId: 'blComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofgc/categoryitems'
			}
		},
		
		blCombo: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfGC',
			storeId: 'blComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofgc/blitems'
			}
		},
		
		snCombo: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfGC',
			storeId: 'snComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofgc/snitems'
			}
		},
		
		damageStore: {
			model: 'MOST.model.operation.DamageCheck',
			storeId: 'damageStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofgc/listDamage'
			}
		},
		
		damageCheckStore: {
			model: 'MOST.model.operation.DamageCheck',
			storeId: 'damageCheckStore',
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
		
		theDamageStore:{
			model: 'MOST.model.operation.DamageCheck',
			storeId: 'theDamageStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofgc/listDamage'
			}
		},


		/** HHT */
		// MAIN
		tblDamageCheckStore: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfGC',
			storeId: 'tblDamageCheckStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofgc/tbldamagechecklist'
			}
		},

		tblMasterBlComboStore: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfGC',
			storeId: 'tblMasterBlComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofgc/tblmfdocid'
			}
		},

		tblBookingNoComboStore: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfGC',
			storeId: 'tblBookingNoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofgc/tblmfdocid'
			}
		},

		tblBlComboStore: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfGC',
			storeId: 'tblBlComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofgc/tblblitems'
			}
		},

		tblSnComboStore: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfGC',
			storeId: 'tblSnComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofgc/tblsnitems'
			}
		},
		
		// DETAIL
		tblDtlDamageCheckStore: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfGC',
			storeId: 'tblDtlDamageCheckStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofgc/tbldamagecheckdetaillist'
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

		tblDamageParts: {
			fields: ['invCd','invDesc'],
			storeId: 'tblDamageParts',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofgc/thedamageparts'
			}
		},
		
		tblDamageLevels: {
			fields: ['invCd','invDesc'],
			storeId: 'tblDamageLevels',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofgc/thedamagelevels'
			}
		},

		tblDamageDesc: {
			fields: ['cd','cdNm'],
			storeId: 'tblDamageDesc',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofgc/thedamagedesc'
			}
		},
		

		tblDtlDuplicateDamageCheckStore: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfGC',
			storeId: 'tblDtlDuplicateDamageCheckStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofgc/tbldamagechecklist'
			}
		},

		uploadedFileDamageStore: {
			model : 'MOST.model.common.FileUpload',
			storeId: 'uploadedFileDamageStore',
		},

		damageStore:{
			model: 'MOST.model.operation.DamageCheck',
			storeId: 'damageStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofgc/listDamage'
			}
		},

		vslCallIdPopup: {
			// model: 'MOST.model.popup.JPVCPopup',
			// storeId: 'JPVCPopupStoreId',
			// proxy: {
			// 	type: 'rest',
			// 	showProgressBar : false,
			// 	url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/jpvcpopup'
			// }
			model: 'MOST.model.popup.PopupService',
			storeId: 'vslCallIdPopupStoreId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/vesselcalllistpopup'
			}
		},
		pkgNoCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'pkgNoStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codemaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_PACKAGE_NO
				}
			},
		}
	}

});