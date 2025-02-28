Ext.define('MOST.view.controller.MovementListModel', {
	extend: 'MOST.view.foundation.BaseViewModel',
	
	alias: 'viewmodel.movementlist',

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
		movementList: {
			model: 'MOST.model.planning.MovementList',
			storeId: 'movementListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/movementList/cargoMoveList'
			}
		},
		
		mvTypeStatus : {
			fields: ['scdNm','scd'],
			storeId: 'mvTypeStatusStore',
			proxy: {
			   type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/commonCode/codeMasterList'
			},
		},
		
  		categoryCombo : {
			fields: ['scdNm','scd'],
			storeId: 'categoryComboStore',
			proxy: {
				type: 'rest',
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
		
		masterList: {
			proxy: {
				   type: 'rest',
					url: MOST.config.Locale.getRestApiDestUrl() + '/v1/movementList/cargoMoveList'
			}
		},
		
		whCombo : {
			fields: ['locNm','locId'],
			storeId: 'whComboStore',
		},
	}
});