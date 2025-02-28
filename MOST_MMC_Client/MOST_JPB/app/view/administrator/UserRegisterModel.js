Ext.define('MOST.view.administrator.UserRegisterModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.userregister',

	requires: [
		'Ext.data.proxy.Rest'
	],
	
	data: {
		userlist: null
	},

	stores: {
		userRegister: {
			model: 'MOST.model.administrator.UserRegister',
			storeId: 'userListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/userregister/users'
			}
		},
		
		duplicateIdCheck: {
			model: 'MOST.model.administrator.UserRegister',
			storeId: 'duplicateIdCheckStore',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/userregister/checkuserdup'
			}
		},
		
		decryptPwd: {
			model: 'MOST.model.administrator.UserRegister',
			storeId: 'decryptPwdStore',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/userregister/decryptpwd'
			}
		},
		
		userDuplicateCheck: {
			model: 'MOST.model.administrator.UserRegister',
			storeId: 'userDuplicateCheckStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/userregister/users/duplicatecheck'
			}
		},
		
		userIdCombo: {
			model: 'MOST.model.administrator.UserRegister',
			fields: ['regUserId'],
			storeId: 'userIdComboStore',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/userregister/userids'
			}
		},
		
		userTypeCombo: {
			model:'MOST.model.codes.SearchCodeMasterParm',
			storeId: 'userTypeComboStore',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/userregister/usertype'
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
		
		departmentCombo:{
			model: 'MOST.model.administrator.UserRegister',
			fields: ['deptName','deptCd'],
			storeId: 'departmentCombo',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/userregister/usersDepartment?format=json'
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  deptNm: 'Select',
			        	  deptCd: ''
			          }]);
			     }
			}
		},
		
		userAuthCombo:{
			model: 'MOST.model.administrator.UserRegister',
			storeId: 'userAuthCombo',
			autoLoad: false,
			proxy:{
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/userregister/userauthcombo'
			}
		},
		
		userAuthList:{
			model: 'MOST.model.administrator.UserRegister',
			storeId: 'userAuthListStore',
			autoLoad: false,
			proxy:{
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/userregister/userAuth'
			}
		},
		
		jobTitleCombo: {
			model:'MOST.model.codes.SearchCodeMasterParm',
			storeId: 'jobTitleComboStore',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/userregister/jobtitle'
			}
		},
		
		partnerSelection: {
			model: 'MOST.model.administrator.UserRegister',
			storeId: 'partnerSelectionStore',
			autoLoad: true,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/userregister/partnertype'
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
		
		userAuthority: {
			model: 'MOST.model.administrator.UserRegister',
			storeId: 'userAuthority'
		},
		
		userDetailUpload: {
			model : 'MOST.model.common.FileUpload',
			storeId: 'userDetailUploadStore',
		},
		
		userDetailDownload:{
			model : 'MOST.model.common.FileUpload',
			storeId: 'userDetailDownloadStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/file/manage/filedownload'
			}
		},
		
		confirmCombo : {},
		largeCodeCombo : {},
		registryStatusCombo:{}
	}
});