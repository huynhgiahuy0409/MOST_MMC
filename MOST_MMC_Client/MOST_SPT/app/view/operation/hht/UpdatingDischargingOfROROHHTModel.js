Ext.define('MOST.view.operation.hht.UpdatingDischargingOfROROHHTModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.updatingdischargingofrorohht',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.CargoLoading',
		'MOST.model.operation.OperationSetting',
		'MOST.model.popup.LorrysPopup',
		'MOST.model.operation.ConfirmDischargingOfRORO'
	],

	formulas:{
		fnlOpeYnChecked:{
  			bind:{
  				bindTo:'{theDetail.fnlOpeYn}'
  			},
  			get:function(value){
  				var me = this;
  				if(value === 'Y'){
  					return true; 
  				} else {
  					return false;
  				}
  			},
  			set:function(value){
  				var me = this;
  				var stringValue = 'N';
  				
  				if(value == true){
  					stringValue = 'Y';
  				}
  				
				var detailItem = me.getView().getViewModel().get('theDetail');
				detailItem.set('fnlOpeYn', stringValue);
  			}
  		},
  		
  		gatePassYnChecked:{
  			bind:{
  				bindTo:'{theDetail.gatePassYn}'
  			},
  			get:function(value){
  				var me = this;
  				if(value === 'Y'){
  					return true; 
  				} else {
  					return false;
  				}
  			},
  			set:function(value){
  				var me = this;
  				var stringValue = 'N';
  				
  				if(value == true){
  					stringValue = 'Y';
  				}
  				
				var detailItem = me.getView().getViewModel().get('theDetail');
				detailItem.set('gatePassYn', stringValue);
  			}
  		}
	},

	stores: {
		unitItems: {
			model: 'MOST.model.operation.ConfirmDischargingOfRORO',
			storeId: 'unitItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmdischargingofroro/unitlisthht'
			}
		},
		
		brandCombo: {
			model: 'MOST.model.operation.ConfirmDischargingOfRORO',
			storeId: 'brandComboStoreHHT',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/brandcomboListHHT'
			}
		},
		
		commonComboItems: {
			model: 'MOST.model.operation.ConfirmDischargingOfRORO',
			storeId: 'commonComboItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/commonComboListHHT'
			}
		},
		
		// Combo Start
		// ======================================================
		// D.Mode
		dmodeCombo : {
			fields: ['scdNm','scd'],
			data :  [{"scd":"", "scdNm":"Select"},
					{"scd":"D", "scdNm":"Direct"},
					{"scd":"I", "scdNm":"Indirect"}
	        ]
		},
		// Combo End
		// ======================================================

	}
});