Ext.define('MOST.view.administrator.CompanyRegisterModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.companyregister',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.administrator.SearchCompanyRegisterParm',
	],
	
	data: {
		ptnrlist: null
	},

	formulas:{
		ptnrLevelInput:{
			bind:{
				bindTo:'{theDetail.ptnrLevel}'
			},
			get:function(value){
				var tempValue = {};
				var ptnrLevel = 'ptnrLevel';
				
				tempValue[ptnrLevel] = value;
				
				return tempValue;
			},
			set:function(value){
				var me = this;
				var detailItem = me.getView().getViewModel().get('theDetail');
				
				detailItem.set("ptnrLevel", value['ptnrLevel']);
			}
		},
		
		gstStatCdInput:{
			bind:{
				bindTo:'{theDetail.gstStatCd}'
			},
			get:function(value){
				var tempValue = {};
				var gstStatCd = 'gstStatCd';
				
				tempValue[gstStatCd] = value;
				
				return tempValue;
			},
			set:function(value){
				var me = this;
				var detailItem = me.getView().getViewModel().get('theDetail');
				
				detailItem.set("gstStatCd", value['gstStatCd']);
			}
		}
	},

	stores: {
		holdCombo:{
		    fields: ['value', 'name'],
		    data : [
		        {"value":"Y", "name":"Yes"},
		        {"value":"N", "name":"No"}
		    ]
		},
		
		ptnrTypeList: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'ptnrTypeListStore',
			proxy: {
			   type: 'rest',
			   showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					lcd : CodeConstants.LCD_COM,
					mcd : CodeConstants.MCD_CM_PTNRTP
				}
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
		
		connTypeCombo: {
			fields: ['scdNm', 'scd'],
			storeId: 'connTypeCombo',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl()  + '/v1/companyregister/connTypeCombo'
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
		
		connSubTypeCombo: {
			fields: ['scdNm', 'scd'],
			storeId: 'connSubTypeCombo',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl()  + '/v1/companyregister/connSubTypeCombo'
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
		
		companyRegister: {
			model: 'MOST.model.administrator.CompanyRegister',
			storeId: 'ptnrList',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl()  + '/v1/companyregister/companyRegisterList'
			}
		},
		
		companyRegisterDetail: {
			model: 'MOST.model.administrator.CompanyRegister',
			storeId: 'ptnrDetail',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl()  + '/v1/companyregister/companyRegisterdetail'
			}
		},
		
		shpList: {
			model: 'MOST.model.administrator.CompanyRegister',
			storeId: 'shpList'
		},
		
		storeContract: {
			model: 'MOST.model.administrator.CompanyRegister',
			storeId: 'storeContract'
		},
		
		ptnrCodeValidation: {
			model: 'MOST.model.administrator.CompanyRegister',
			storeId: 'ptnrCodeValidation',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl()  + '/v1/companyregister/ptnrCodeValidation'
			}
		},
		
		paymentTypeCombo: {},
		
		companyStatusCombo: {},
		
		profileStatusCombo: {}
	}
});