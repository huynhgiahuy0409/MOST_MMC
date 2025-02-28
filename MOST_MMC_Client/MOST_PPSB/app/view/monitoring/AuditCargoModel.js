Ext.define('MOST.view.monitoring.AuditCargoModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.auditcargo',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.monitoring.AuditCargo',
	],

	stores: {
		auditCargo: {
			model: 'MOST.model.monitoring.AuditCargo',
			storeId: 'auditCargoStore',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/auditcargo/list'
			}
		},

		blCombo: {
			model: 'MOST.model.monitoring.AuditCargo',
			storeId: 'blComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/auditcargo/blItems'
			},
			listeners: {
				load: function(store, records) {
			          store.insert(0, [{ cdNm: 'All', cd: ''}]);
			     }
			}
		},

		snCombo: {
			model: 'MOST.model.monitoring.AuditCargo',
			storeId: 'snComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/auditcargo/snItems'
			},
			listeners: {
				load: function(store, records) {
			          store.insert(0, [{ cdNm: 'All', cd: ''}]);
			     }
			}
		},

		screenCombo: {
			model: 'MOST.model.monitoring.AuditCargo',
			storeId: 'screenComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/auditcargo/screenItems'
			},
			listeners: {
				load: function(store, records) {
			          store.insert(0, [{ cdNm: 'All', cd: ''}]);
			     }
			}
		},
		
		updateTypeCombo: {
			fields: ['cd', 'cdNm'],
		    data: [
		    	{"cd":" ", "cdNm":"All"},
		    	{"cd":"I", "cdNm":"INSERT"},
		    	{"cd":"U", "cdNm":"UPDATE"},
		    	{"cd":"D", "cdNm":"DELETE"},
		    ]
		},
	}
});