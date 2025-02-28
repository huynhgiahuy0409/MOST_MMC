Ext.define('MOST.view.configuration.WarehouseDefinitionModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.warehouseDefinition',

	requires: [
		'Ext.data.proxy.Rest'
	],
	
	formulas:{
  		edYnChecked:{
  			bind:{
  				bindTo:'{theDetail.edYn}'
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
  				
				var detailItem = me.getView().getViewModel().get('theDetail');
				
				detailItem.set('edYn', stringValue);
  			}
  		},
  		nonEdYnChecked:{
  			bind:{
  				bindTo:'{theDetail.nonEdYn}'
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
  				
				var detailItem = me.getView().getViewModel().get('theDetail');
				detailItem.set('nonEdYn', stringValue);
  			}
  		},
  		dgChecked:{
  			bind:{
  				bindTo:'{theDetail.dgYn}'
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
  				
				var detailItem = me.getView().getViewModel().get('theDetail');
				detailItem.set('dgYn', stringValue);
  			}
  		}
	},
	
	stores: {
		warehouseDefinitionGrid: {
			model: 'MOST.model.configuration.WarehouseDefinition',
			storeId: 'warehouseDefinitionGridStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/warehouse/list'
			}
		},
		
		checkDupliLocId: {
			model: 'MOST.model.configuration.WarehouseDefinition',
			storeId: 'checkDupliLocIdStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/warehouse/checkduplilocid'
			}
		},
		
		overlapchecking: {
			model: 'MOST.model.configuration.WarehouseDefinition',
			storeId: 'overlapcheckingStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/warehouse/overlap'
			}
		},
		
		bayRowDesignInfo : {
			model: 'MOST.model.configuration.WarehouseDefinition',
			storeId: 'bayRowDesignInfoStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/warehouse/checkBayRowDesign'
			}
		},
		
		WhViewList: {
			model: 'MOST.model.configuration.WarehouseDefinition',
			storeId: 'WhViewListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/warehouse/whViewList'
			}
		},
		
		cellInfomation: {
			model: 'MOST.model.configuration.WarehouseDrawItem',
			storeId: 'cellInfomationStore'
		},
		
		bayInformation: {
			model: 'MOST.model.configuration.WarehouseDrawItem',
			storeId: 'bayInformationStore'
		},
		
		rowInformation: {
			model: 'MOST.model.configuration.WarehouseDrawItem',
			storeId: 'rowInformationStore'
		},
		
		unUsedInformation: {
			model: 'MOST.model.configuration.WarehouseDrawItem',
			storeId: 'unUsedInformationtore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/warehouse/unusedblock'
			}
		},
		
		warehouseTypeCombo : {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'warehouseTypeComboComboStore',
			proxy: {
			   type: 'rest',
			   url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
			   extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_WHTP
				}
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
		
		warehouseAreaCombo : {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'warehouseAreaComboStore',
			proxy: {
			    type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_AREA_LOC
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  locNm: 'All',
			              locId: ''
			          }]);
			     }
			}
		},
		
		warehouseDtlTypeCombo : {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'warehouseDtlTypeComboComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_WHTP
				}
			}
		},
		
		warehouseDtlAreaCombo : {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'warehouseDtlAreaComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_AREA_LOC
				}
			}
		},
	
		warehouseUsedYn : {},
		warehouseDtlUsedYn : {},
		warehouseLocationDiv : {},
		warehouseMainUsage : {},
		
		meta: {
			model: 'MOST.model.common.Locale',
			storeId: 'metaWarehouseStore',
			proxy: {
				type: 'ajax',
				url: 'resources/data/MetaWarehouse.json',
				reader: {
					type: 'json',
					rootProperty: 'data'
				}
			}
		}
	}
});