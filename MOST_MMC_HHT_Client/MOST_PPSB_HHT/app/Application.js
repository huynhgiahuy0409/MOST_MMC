/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('MOST.Application', {
    extend: 'Ext.app.Application',
    
    name: 'MOST',

    requires: [
       		'TSB.locale.i18n.Bundle',
       		'MOST.config.Locale',
       		'MOST.config.Token',
       		'Ext.direct.RemotingProvider',
       		'Ext.direct.PollingProvider'
   	],
   	
   	uses : [
//        'Ext.window.Toast'
	],

   	stores: [],

   	controllers: ['MOST.controller.Main'],

   	views: [
//   		'MOST.view.exception.Message'
   	],
   	
   	//global function
   	bundle: {
   	    bundle: 'Application',
   	    lang: 'defaultLanguage',
   	    path: 'resources/locale',
   	    noCache: true
   	},
	
	//added by Brian (2020/08.05) To avoid error for showing progress bar
   	isBizServiceStart : false,
   	forcedBlocking : false,
   	
    launch: function () {
//		console.log('##### Application.launch');
		me = this;
		// Check whether the browser supports LocalStorage
		// It's important to note that this type of application could use
		// any type of storage, i.e., Cookies, LocalStorage, etc.
		var supportsLocalStorage = Ext.supports.LocalStorage;
		
		if (!supportsLocalStorage) {

			// Alert the user if the browser does not support localStorage
			Ext.Msg.alert('Your Browser Does Not Support Local Storage');
			return;
		}

    },

    onAppUpdate: function () {
        Ext.Msg.alert('Application Update', 'Update is available. Click OK to proceed',
            function () {
                window.location.reload();
            }
        );
    }
});
