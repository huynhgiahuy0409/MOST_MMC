Ext.define('MOST.view.document.GoodsReceiptModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.goodsreceipt',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.document.GoodsReceipt'
	],
	
	formulas:{
		spCargoChecked:{
  			bind:{
  				bindTo:'{theMain.spCargoChk}'
  			},
  			get:function(value){
  				if(value === 'true'){
  					return 'Y';
  				}else if(value === 'false'){
  					return 'N';
  				}else{
  					return value; 
  				}
  			},
  			set:function(value){
  				var me = this;
  				var stringValue = 'N';
  				if(value == true){
  					stringValue = 'Y';
  				}
  				
				var detailItem = me.getView().getViewModel().get('theMain');
				detailItem.set('spCargoChk', stringValue);
  			}
  		},
  		adCargoChecked:{
  			bind:{
  				bindTo:'{theMain.adCargoChk}'
  			},
  			get:function(value){
  				if(value === 'true'){
  					return 'Y';
  				}else if(value === 'false'){
  					return 'N';
  				}else{
  					return value; 
  				}
  			},
  			set:function(value){
  				var me = this;
  				var stringValue = 'N';
  				if(value == true){
  					stringValue = 'Y';
  				}
  				
				var detailItem = me.getView().getViewModel().get('theMain');
				detailItem.set('adCargoChk', stringValue);
  			}
  		},
	},
	
	stores: {
		goodsReceipt: {
			model: 'MOST.model.document.GoodsReceipt',
			storeId: 'goodsReceiptStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/goodsreceipt/list'
			}
		},
		
		goodsReceiptDetail: {
			model: 'MOST.model.document.GoodsReceipt',
			storeId: 'goodsReceiptDetailStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/goodsreceipt/detail'
			}
		},
		
		goodsReceiptOfRORO: {
			model: 'MOST.model.document.GoodsReceipt',
			storeId: 'goodsReceiptOfROROStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/goodsreceipt/roro'
			}
		},
		
		grInfoForCreating: {
			model: 'MOST.model.document.GoodsReceipt',
			storeId: 'grInfoForCreatingStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/goodsreceipt/info'
			}
		},
		
		generatePDFGoodsReceipt: {
			model: 'MOST.model.document.GoodsReceipt',
			storeId: 'downloadGoodsReceiptStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/goodsreceipt/generatepdfgoods'
			}
		},
		
		snCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'snComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_SN_NO
				}
			}
		},
		
		grCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'snComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_GR_NO
				}
			}
		},
		
		grPkgDetail:{
			model: 'MOST.model.document.GoodsReceipt',
			storeId: 'grPackageStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/goodsreceipt/grpkgdetail'
			}
		},
		
		dmodeCombo : {
			
		},
		
		trasLRModeCombo : {
			model: 'MOST.model.codes.CodeMaster',
			storeId: 'trasLRModeCombo',
			proxy: {
			    type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					lcd : CodeConstants.LCD_MOST,
					mcd : CodeConstants.MCD_MT_TSPTTP
				}
			}
		},
		
		goodsReceiptRTS: {
			model: 'MOST.model.document.GoodsReceipt',
			storeId: 'goodsReceiptRTSStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/goodsreceipt/goodsreceiptrts'
			}
		},
		
		unitList: {
			model: 'MOST.model.document.ShippingNote',
			id: 'unitListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			autoLoad:false,
			proxy : {
				type : 'rest',
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/shippingnote/unitlist'
			}
		},
		
		warehouseRtsList: {
			model: 'MOST.model.document.GoodsReceipt',
			storeId: 'warehouseList',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/goodsreceipt/warehouseRtsList'
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  rtsLocNm: 'Select',
			        	  rtsLocId: ''
			          }]);
			     }
			}
		},
		
		trasLCModeCombo : {},
		
		trasCVModeCombo : {},
		
		trasLWModeCombo : {},
		
		trasWGModeCombo : {},
		
		quantityCombo : {},

		rtsUnitList: {
			model: 'MOST.model.document.ShippingNote',
			id: 'unitListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			autoLoad:false,
			proxy : {
				type : 'rest',
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/goodsreceipt/unitlist'
			}
		},
		
		bookingNoCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'bookingNoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_BOOKING_NO 
				}
			}/*,
			listeners:
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  mfDocId: ''
			          }]);
			     }
			}*/
		},
	}
});