Ext.define('MOST.view.planning.NonManifestedCargoOfGcModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.nonmanifestedcargoofgc',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.common.FileUpload'
	],
	
	stores: {
		
		nonManifestedCargoOfGc: {
			model: 'MOST.model.planning.NonManifestedCargoOfGc',
			storeId: 'nonManifestedCargoOfGcStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/nonmanifestedcargoofgc/list'
			}
		},
		
		nonManifestRegisterStore: {
			model: 'MOST.model.planning.NonManifestedCargoOfGc',
			storeId: 'nonManifestRegisterStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/nonmanifestedcargoofgc/nonManifestRegisterList'
			}
		},
		
		
		blItems : {
			model: 'MOST.model.planning.NonManifestedCargoOfGc',
			storeId: 'blItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/nonmanifestedcargoofgc/blItems'
			}
		},
		
		snItems : {
			fields: ['cdNm','cd'],
			storeId: 'snItemsStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/nonmanifestedcargoofgc/snItems'
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  cdNm: 'Select',
			        	  cd: ''
			          }]);
			     }
			}
		},
		
		grItems : {
			fields: ['cdNm','cd'],
			storeId: 'grItemsStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/nonmanifestedcargoofgc/grItems'
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  cdNm: 'Select',
			        	  cd: ''
			          }]);
			     }
			}
		},
		
		orgBlItems : {
			fields: ['cdNm','cd'],
			storeId: 'orgBlItemsStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/nonmanifestedcargoofgc/orgBlItems'
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  cdNm: 'Select',
			        	  cd: ''
			          }]);
			     }
			}
		},
		
		deleteValidation: {
			model: 'MOST.model.planning.NonManifestedCargoOfGc',
			storeId: 'deleteValidationStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/nonmanifestedcargoofgc/deleteValidation'
			}
		},
		
		nonManifestRegisterStore: {
			model: 'MOST.model.planning.NonManifestedCargoOfGc',
			storeId: 'nonManifestRegisterStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/nonmanifestedcargoofgc/nonManifestRegisterList'
			}
		},

		getShiftInforStore: {
			model: 'MOST.model.planning.NonManifestedCargoOfGc',
			storeId: 'getShiftInforStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/nonmanifestedcargoofgc/getShiftInfor'
			}
		},
	
		BLNoList: {
			model: 'MOST.model.document.TruckAssignment',
			storeId: 'BLNoListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/truckAssignment/blItems'
			}
		},
	}
});