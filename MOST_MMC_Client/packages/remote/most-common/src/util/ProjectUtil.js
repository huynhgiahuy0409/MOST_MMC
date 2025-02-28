
Ext.define('MOST.util.ProjectUtil', {
	singleton: true,
	alternateClassName: 'ProjectUtil',	

	 
	constructor: function(config) {
		this.initConfig(config);
		this.callParent(arguments);
	},
	

	getPackagePath : function(id){
		 var systemCode = (CONSTANTS.SYSTEM_CODE+'').toUpperCase();
		 var mouduleCode = (CONSTANTS.MODULE+'').toUpperCase();
		 var path = "";
		 console.log("CONSTANTS.SYSTEM_CODE: " + systemCode);
		 console.log("CONSTANTS.MODULE: " + mouduleCode);
		 
		
		 return path;
	},

	getPgmCode : function() {
		var mouduleCode = (CONSTANTS.MODULE+'').toUpperCase();
		
		
		return pgmCode;
	}
	 
});