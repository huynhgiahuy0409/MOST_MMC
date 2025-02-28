Ext.define('MOST.view.administrator.administratorGroupModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.authoritygroup',

	requires: [
	],
	
	stores: {
		authGrpList: {
			model: 'MOST.model.administrator.AuthorityGroup',
			storeId: 'authGrpListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/authoritygroup/authgrplist'
			}
		},
		
		ptnrTypeList: {
			model: 'MOST.model.codes.SearchCodeMasterParm',
			storeId: 'ptnrTypeListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/authoritygroup/ptnrtp'
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
		
		userList: {
			model: 'MOST.model.administrator.User',
			storeId: 'userListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/authoritygroup/userlistbygrp'
			}
		},
		
		accessAuthCodeList: {
			model: 'MOST.model.administrator.AuthorityGroup',
			storeId: 'accessAuthCodeListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/authoritygroup/accessauth'
			}
		},
		
		accessAuthAdminList: {
			model: 'MOST.model.administrator.AuthorityGroup',
			storeId: 'accessAuthAdminListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/authoritygroup/accessauth'
			}
		},
		
		accessAuthConfList: {
			model: 'MOST.model.administrator.AuthorityGroup',
			storeId: 'accessAuthConfListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/authoritygroup/accessauth'
			}
		},
		
		accessAuthDocList: {
			model: 'MOST.model.administrator.AuthorityGroup',
			storeId: 'accessAuthDocListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/authoritygroup/accessauth'
			}
		},
		
		accessAuthPlanList: {
			model: 'MOST.model.administrator.AuthorityGroup',
			storeId: 'accessAuthPlanListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/authoritygroup/accessauth'
			}
		},
		
		accessAuthOpeList: {
			model: 'MOST.model.administrator.AuthorityGroup',
			storeId: 'accessAuthOpeListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/authoritygroup/accessauth'
			}
		},
		
		accessAuthMonitorList: {
			model: 'MOST.model.administrator.AuthorityGroup',
			storeId: 'accessAuthMonitorListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/authoritygroup/accessauth'
			}
		},
		
		accessAuthBillingList: {
			model: 'MOST.model.administrator.AuthorityGroup',
			storeId: 'accessAuthBillingListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/authoritygroup/accessauth'
			}
		},
		
		accessAuthTabletList: {
			model: 'MOST.model.administrator.AuthorityGroup',
			storeId: 'accessAuthTabletListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/authoritygroup/accessauth'
			}
		},
		
		yesNoCombo : {}
	}
});