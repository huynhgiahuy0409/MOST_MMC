Ext.define('MOST.view.monitoring.InterfaceLogListModel',{
	extend: 'MOST.view.foundation.BaseViewModel',
	alias: 'viewmodel.interfaceLogList',
	requires:[
		'Ext.data.proxy.Rest',
		'MOST.model.monitoring.InterfaceLogList'
	],

	formulas:{
		fromDateString:{
  			bind:{
  				bindTo:'{theDetail.fromDate}'
  			},
  			get: function(value){
  				return Ext.util.Format.date(value, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
  			},
  			set: function(value){  				
  				var me = this;
  				var stringValue = Ext.Date.format(value, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
  				
				var theSearch = me.getView().getViewModel().get('theSearch');
				theSearch.set('fromDate', stringValue);
  			}
  		},
  		toDateString:{
  			bind:{
  				bindTo:'{theDetail.toDate}'
  			},
  			get: function(value){
  				return Ext.util.Format.date(value, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
  			},
  			set: function(value){
  				var me = this;
  				var stringValue = Ext.Date.format(value, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
  				
				var theSearch = me.getView().getViewModel().get('theSearch');
				theSearch.set('toDate', stringValue);
  			}
  		}
	},
	stores: {
		interfaceLogList: {
			model: 'MOST.model.monitoring.InterfaceLogList',
			storeId: 'interfaceLogListSotre',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/interfaceLog/searchInterfaceLogItems'
			}
		},
		
		transTypeCombo: {},
		
		statusCombo: {},
		
		systemTypeCombo: {},
		
		messageTypeCombo: {},
	}
});