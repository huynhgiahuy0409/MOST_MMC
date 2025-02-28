Ext.define('MOST.view.administrator.MenuRegisterModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.menuregister',

	requires: [
		'Ext.data.proxy.Rest'
	],
	stores: {
		menuList: {
			model: 'MOST.model.administrator.MenuRegister',
			storeId: 'menuListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/menuRegister/menulist'
			}
		},
		
		checkPgmIdDup:{
			model: 'MOST.model.administrator.MenuRegister',
			storeID:'checkPgmIdDupStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy:{
				type:'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/menuRegister/checkPgmIdDup'
			}
		},
		
		programInfoList: {
			model: 'MOST.model.administrator.MenuRegister',
			storeId: 'programInfoId',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/menuRegister/programinfolist'
			}
		},
		
		yesNoCombo : {},
		
		systemCodeCombo:{value:''},
	}
});