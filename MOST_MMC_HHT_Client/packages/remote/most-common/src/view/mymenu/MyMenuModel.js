Ext.define('MOST.view.mymenu.MyMenuModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.mymenu',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.mymenu.MyMenu'
	],

	stores: {
		myMenu:{
			model: 'MOST.model.mymenu.MyMenu',
			storeId: 'myMenuStore',
			autoLoad: false,
			proxy: {
				showProgressBar : false,
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/mymenu/searchItems'
			} 
		},
		
		menulist : {}
	}
});