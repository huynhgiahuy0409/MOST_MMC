Ext.define('MOST.view.login.AADController', {
	extend : 'MOST.view.foundation.BaseViewController',
	alias: 'controller.aad',

	onLoginClick: function(btn) {
		var me = this;
		
		var item = Ext.create('MOST.model.common.AzureInfoItem');
		
		var proxy = item.getProxy();
		proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/oauth2/adal/info';

		//To prevent global catch for the exception
		Ext.Ajax.suspendEvent('requestexception');
		item.save({
            callback: function(record, operation, success) {
            	if(success) {
            		// Enter Global Config Values & Instantiate ADAL AuthenticationContext
            		CONSTANTS.AZURE_CLIENT_ID = record.data.clientID;
            		CONSTANTS.AZURE_TENANT = record.data.tenant;

            	    window.config = {
            	        tenant: CONSTANTS.AZURE_TENANT,
            	        clientId: CONSTANTS.AZURE_CLIENT_ID,
            	        postLogoutRedirectUri: window.location.origin,
            	        cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.
            	        endpoints: {
            	        // Map the location of a request to an API to a the identifier of the associated resource
            	        // Format: API Url, Resource
            	            "https://graph.microsoft-ppe.com/": "https://graph.microsoft-ppe.com/",
            	            "https://graph.microsoft.com/": "https://graph.microsoft.com/"
            	        }
            	    };
            	    var authContext = new AuthenticationContext(config);

            	    // Check For & Handle Redirect From AAD After Login
//            	    var isCallback = authContext.isCallback(window.location.hash);
            	    authContext.handleWindowCallback();

            	    if (!authContext.getLoginError()) {
            	        window.location = authContext._getItem(authContext.CONSTANTS.STORAGE.LOGIN_REQUEST);
            	    }
//            	    if (isCallback && !authContext.getLoginError()) {
//            	    	window.location = authContext._getItem(authContext.CONSTANTS.STORAGE.LOGIN_REQUEST);
//            	    }

            	    authContext.login();
            	} else {
					Ext.toast({
					 	html: 'An exceptional problem occurred. Please contact your administrator.',
					 	closable: false,
					 	align: 't',
					 	slideInDuration: 300,
					 	minWidth: 400
					});	
				}
            	
            	//Resume global catch for the exception
            	Ext.Ajax.resumeEvent('requestexception');
            }
        });
	}
});