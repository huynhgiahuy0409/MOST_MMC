Ext.define('MOST.view.planning.berth.BerthApprovalModel', {
	extend: 'MOST.view.foundation.BaseViewModel',
	
	alias: 'viewmodel.berthapproval',

	requires: [
		'MOST.model.common.Locale',
		'MOST.model.planning.berth.BerthApproval'
	],
	
	data:{
		partnerInfo: null,
		selectRec: null,
		partnerTypeArray: {}
	},
	
	stores: {
		berthApprovalList: {
			model: 'MOST.model.planning.berth.BerthApproval',
			storeId: 'berthApprovalListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/berthapproval/list'
			}
		},
		partnerInfo: {
			model: 'MOST.model.planning.berth.BusinessHistory',
			storeId: 'partnerInfoStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/berthapproval/partnerInfo'
			}
		},
		businessHistory: {
			model: 'MOST.model.planning.berth.VesselAgency',
			storeId: 'partnerInfoStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/berthapproval/businessHistory'
			}
		},
		vesselinformation: {
			model: 'MOST.model.planning.berth.VesselAgency',
			storeId: 'vesselinformationStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/berthapproval/vesselInfo'
			}
		},
		emailTemplate: {
			model: 'MOST.model.planning.berth.EmailTemplate',
			storeId: 'emailTemplateStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/berthapproval/emailtemplate'
			}
		},
		
		partnerType:{
  			fields: ['ptnrName', 'ptnrType'],
			data : [
		        {'ptnrName' : 'Shipping Line', 			'ptnrType' : 'SHP'},
		        {'ptnrName' : 'Shipper/Consignee', 		'ptnrType' : 'CNS'},
		        {'ptnrName' : 'Shipping Agent', 		'ptnrType' : 'SHA'},
		        {'ptnrName' : 'Fowarder', 				'ptnrType' : 'FWD'}
	        ]
  		},
		planStatus:{
  			fields: ['name', 'code'],
			data : [
		        {'name' : 'All', 			'code' : ''},
		        {'name' : 'Planned', 		'code' : 'PLN'},
		        {'name' : 'Non Plannned', 	'code' : 'NPN'}
	        ]
  		},
		vesselTypeCombo : {
			fields: ['scdNm','scd'],
			storeId: 'vesselTypeComboStore',
			proxy: {
			   type: 'rest',
			   showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/commonCode/codeMasterList'
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'All',
			              scd: ''
			          }]);
			     }
			}
		},
		cargoTypeCombo : {
			fields: ['scdNm','scd'],
			storeId: 'cargoTypeComboStore',
			proxy: {
			   type: 'rest',
			   showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/commonCode/codeMasterList'
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'All',
			              scd: ''
			          }]);
			     }
			}
		},
		billingTypeCombo : {
			fields: ['scdNm','scd'],
			storeId: 'billingTypeComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/commonCode/codeMasterList'
			},
			listeners: 
			{
				load: function(store, records) {
					store.insert(0, [{
						scdNm: 'All',
						scd: ''
					}]);
				}
			}
		},
		vesselStatusCombo : {
			fields: ['scdNm','scd'],
			storeId: 'vesselStatusComboStore',
			proxy: {
			   type: 'rest',
			   showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/commonCode/codeMasterList'
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'All',
			              scd: ''
			          }]);
			     }
			}
		},
	}
});