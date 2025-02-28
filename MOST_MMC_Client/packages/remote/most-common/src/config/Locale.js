Ext.define('MOST.config.Locale', {
	singleton: true,
	alternateClassName: 'Locale',	

	config: {
		locale: 'en-US',		//'vi-VN', 'en-US'
		theme: 'crisp',
		rtl: false,

		timezone: 'UTC',
		thousandSeparator: ',',
		decimalSeparator: '.',
		currenyPrecision: 2,
		currencySign: '$',
		currencyCode: 'USD',
		shortDate: "d/m/Y",
		shortMonth: "m/Y",
		excelExportDateTimeFormat: 'd-m-T_His',
		shortDateInputMask: "31/12/9999",
		startDay: 0,
		defaultDateFormat: 'd/m/Y H:i:s',
		defaultDateFormatWithNoSeconds: 'd/m/Y H:i',
		
		initScheduleLimits: 20,
		
		serverDns: CONSTANTS.ENV === 'PROD' ? window.location.protocol + '//' + window.location.host : CONSTANTS.SERVER_DNS,
		serverContextRoot: null,
	},
	
	constructor: function(config) {
		this.initConfig(config);
		this.callParent(arguments);
        this.setContextPath();
	},
	
	
    setContextPath : function() {
        if(StringUtil.isNullorEmpty(this.getServerContextRoot())){
             if(CONSTANTS.ENV === 'PROD'){
                  this.setServerContextRoot(this.getContextPath());
             } else {
                  this.setServerContextRoot(CONSTANTS.SERVER_CONTEXT);
             }
        }
  },

  getContextPath : function() {
/*         var hostIndex = location.href.indexOf( location.host ) + location.host.length;
        return location.href.substring( hostIndex, location.href.indexOf('/', hostIndex + 1) );
*/
        var paths = window.location.pathname.split("/");
      if(paths != null && paths.length > 1)
       contextRoot = "/"+paths[1];
      else contextRoot = CONSTANTS.SERVER_CONTEXT;
       return contextRoot;
  },

	
	getRestApiDestUrl: function() {
		return this.getServerDns() + this.getServerContextRoot() + '/rest'
	},
	
	getDirectApiDestUrl: function(config) {
		return this.getServerDns() + this.getServerContextRoot() + '/direct'
	},
	
	getRestHome :function(){
		return window.location.origin + window.location.pathname;
	},
	setLanguage : function(language){
		this.setLocale(language);
		TSB.locale.i18n.Bundle.instance.setLanguage(language);
	}
});