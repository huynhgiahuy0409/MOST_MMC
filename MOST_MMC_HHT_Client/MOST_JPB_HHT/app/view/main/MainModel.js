/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('MOST.view.main.MainModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.main',

	requires: [
       'Ext.data.proxy.Rest',
	],
	
	data: {
		loadedServiceLaneCode: null,
		loadedPortCode: null,
		loadedTerminalCode: null,
		loadedVesselCode: null,
		loadedVesselName: null,
		loadedImoNo: null,
		loadedVoyageNo: null,
		loadedTag: null,
		loadedOrigin: null,
		loadedSnapshotDesc: null,
		
		profileImageUrl: 'resources/images/Profile.png',
		profileName: '',
		profileEmail: '',
		tabCount: 0,
		favouriteMenu:null
	},
	
	formulas: {
		isDevelopmentMode: function (get) {
			return false;
        }	
    },

	stores: {
		favouriteMenu:{
			model: 'MOST.model.administrator.AuthMenuItem',
			autoLoad: false,
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/menu/favourites',
				extraParams:{
					systemCode: CONSTANTS.SYSTEM_CODE
				}
			}
		},
		
		menuList: {
			model: 'MOST.model.administrator.AuthMenuItem',
			storeId: 'menuListStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/menu/list',
				extraParams:{
					systemCode: CONSTANTS.SYSTEM_CODE,
					mode:'leftmenu'
				}

//			    type: 'ajax',
//			    url: 'resources/temp/menu.json',
//			    reader: {
//	               type: 'json',
//	               rootProperty: 'data'
//			    }
			}
		},
		
		searchMenu: {
			model: 'MOST.model.administrator.AuthMenuItem',
			storeId: 'menuListStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/menu/list',
				extraParams:{
					systemCode: CONSTANTS.SYSTEM_CODE,
					mode:'leftmenu'
				}
			}
		},
		
		cacheServiceInfo:{
			model: 'MOST.model.common.LocalCacheInfo',
			storeId: 'cacheServiceInfoStore',
			proxy: {
			    type: 'ajax',
			    url: 'resources/data/LocalCacheInfo.json',
			    reader: {
	               type: 'json',
	               rootProperty: 'data'
			    }
			} 
		},
		gridColumn:{
			storeId: 'gridColumnStore',
			proxy: {
			    type: 'ajax',
			    url: 'resources/data/MostGridColumn.json',
			    messageEnable: false,
			    reader: {
	               type: 'json',
	               rootProperty: 'data'
			    }
			} 
		},
		projectGridColumn:{
			storeId: 'projectGridColumnStore',
			proxy: {
			    type: 'ajax',
			    url: 'resources/data/MostPivotGridColumn.json',
			    messageEnable: false,
			    reader: {
	               type: 'json',
	               rootProperty: 'data'
			    }
			} 
		},
		authButton: {
			model: 'MOST.model.administrator.AuthButtonItem',
			storeId: 'menuButtonStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/menu/authbutton'
			}
		},
		
		// KHH.SAMPLEMENU.2018.11.14
		sampleMenuList: {
			model: 'MOST.model.administrator.AuthMenuItem',
			storeId: 'menuListStore',
			proxy: {
			    type: 'ajax',
			    showProgressBar : false,
			    url: 'resources/temp/sample_menu.json',
			    reader: {
	               type: 'json',
	               rootProperty: 'data'
			    }
			}
		},
		
		roleMenuList: {
			model: 'MOST.model.administrator.RoleMenu',
			storeId: 'roleMenuListStore',
			proxy: {
//				type: 'rest',
//				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/roles/personalizedmenu'
				
			    type: 'ajax',
			    showProgressBar : false,
			    url: 'resources/temp/roleMenu.json',
			    reader: {
		           type: 'json',
		           rootProperty: 'data'
			    }
			}
		},
		
		
		retrieveAuthList: {
			model: 'MOST.model.administrator.ScreenAuthority',
			storeId: 'screenItemListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/screenauthority/authdata'
			}
		},
	}
});