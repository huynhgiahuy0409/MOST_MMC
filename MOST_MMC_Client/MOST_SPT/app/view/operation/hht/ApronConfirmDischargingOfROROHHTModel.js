Ext.define('MOST.view.operation.hht.ApronConfirmDischargingOfROROHHTModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.apronconfirmdischargingofrorohht',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.CargoLoading',
		'MOST.model.operation.OperationSetting',
		'MOST.model.popup.LorrysPopup',
		'MOST.model.operation.ConfirmDischargingOfRORO',
		'MOST.model.operation.DamageCheck',
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
		commonComboItems: {
			model: 'MOST.model.operation.ConfirmDischargingOfRORO',
			storeId: 'commonComboItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/commonComboListHHT'
			}
		},
		
		validationCheck: {
			storeId: 'validationCheck',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/validationcode/list',
				
			}
		},
		
		roroDamageCheckDetail: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
			storeId: 'roroDamageCheckDetailStoreHHT1',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/rorodamagecheckdetail'
			}
		},
		
		damageStore: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
			storeId: 'roroDamageCheckDetailStoreHHT2',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/rorodamagecheckdetail'
			}
		},
		damageCheckStore: {
			model: 'MOST.model.operation.DamageCheck',
			storeId: 'damageCheckStoreHHT',
		},
		
		// Combo Start
		// ======================================================
		// D.Mode
		blCombo: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
			storeId: 'blComboStoreHHT',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmdischargingofroro/comboList'
			}
		},
		
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