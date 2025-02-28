Ext.define('MOST.view.billing.FreeStorageDaysController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.freestoragedays',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refFreeStorageDaysGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'freeStorageDaysList',	
	MAX_PERIOD_DAY : 100,
	PARAMETTER_CHECK_CATEGORY_COMBOBOX_STORE: 'catergoryCombo',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create('MOST.model.billing.SearchFreeStorageDaysParm');
		var cargoTypeCombo = me.getStore('cargoTypeCombo');
		
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		me.setComboBoxWithLocalCache(CacheServiceConstants.CATEGORY_COMBOBOX, me.PARAMETTER_CHECK_CATEGORY_COMBOBOX_STORE); 	// MOVE TYPE COMBO
		me.updateViewStyle(me.getView());

		searchParm.set('progress', 'N');
		
		cargoTypeCombo.load();
	},
	
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	// Search Event Handler
	onSearch: function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.MAIN_STORE_NAME);
     	var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
     	var params = me.getSearchCondition();
     	
     	if(params == null){
    		return;
    	}
     	
     	store.load({
			params: params
		});
	},
	
	onClick: function(){
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var editor = grid.getPlugin('freeStorageDaysGridEditor');
		
		editor.cancelEdit();
	},
	
	onDblClick: function() {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var refs = me.getReferences();
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) {
			return;
		}

		me.setGridColumnEditable(selection.phantom);
	},
	
	onEdit : function(editor, context){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if (selection == null){
			return;
		} else {
			var aplyDtStr = selection.get("aplyYmd");
			var expDtStr =  selection.get("exprYmd");
			
			if(me.validateFromToDate(aplyDtStr, expDtStr)){
				me.gridEdit(editor, context);	
			}
		}
	},
	
	onAdd: function(){
		var me = this;
     	var refs = me.getReferences();
     	var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
     	var store = me.getStore(me.MAIN_STORE_NAME);
		var editor = grid.getPlugin('freeStorageDaysGridEditor');
		var record = Ext.create('MOST.model.billing.FreeStorageDays');
		
		refs.refCMDTField.setHidden(false);
		refs.refCMDTNmField.setHidden(true);
		
		editor.cancelEdit();
		
		//Clear filter for Grid:
		grid.filters.clearFilters();
		grid.filters.disable();
		
		//Clear filter for Store
		store.clearFilter();
		
		var idx = 0;
		
		if(grid.getSelection() && grid.getSelection().length > 0){
			idx = store.indexOfId(grid.getSelection()[0].get('id'));
		}
		
		record.data.userId = MOST.config.Token.getUserId();
		store.insert(idx, record);
		grid.getSelectionModel().select(record);
		
		me.setGridColumnEditable(true);

		editor.startEdit(record);
	},
		
	// Grid Cancel Edit
	onCancelEdit : function(rowEditing, context) {
		var me = this;
     	var store = me.getStore(me.MAIN_STORE_NAME);
     	var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		
		me.gridCancelEdit(rowEditing, context);
		
		grid.getSelectionModel().deselectAll()
		grid.getSelectionModel().clearSelections()
	},
	
	// Grid Validate Edit
	onValidateEdit : function(editor, context) {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null){
			return;
		}
		
		var aplyDtStr = selection.get("aplyYmd"); //selection.data.aplyYmd;       //
		var expDtStr =  selection.get("exprYmd");  //selection.data.exprYmd;                //
		
		if(me.validateFromToDate(aplyDtStr, expDtStr)){
			if(context.record.phantom == true) {
				var freeStorageDaysListDuplicateCheckStore = me.getStore('freeStorageDaysListDuplicateCheck');

				var params = {
					ptnrCd: selection.get("ptnrCd")
				}
			}
		}
	},
	
	onSearchPartnerPopup: function (combobox, record, e) {
		if(record.get('field1') === 'All') {
			return;
		}
		
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var params = {
			searchModule: CodeConstants.LCD_MOST
		};
		combobox.reset();
		me.openCodePopup('popup-partnercdtypepopup', combobox.reference, params);
	},
	
	onOpenCommonCodePopup: function (cobobox, record, e) {
		if (record.get('field1') === 'All') {
			return;
		}
		var me = this;
		var params = {
			searchType: 'CMDT'
		};

		cobobox.reset();
		me.openCodePopup('popup-cmmcdpopup', cobobox.reference, params);
	},

	onOpenPortCodePopup: function (field, button, e) {
		var me = this;
		var params = {
			searchType: 'PORT'
		};

		me.openCodePopup('popup-cmmcdpopup', field.reference, params);
	},
	
	onChangeIncludeSunday:function(xtype, newValue, oldValue, eOpts){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
     	var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(newValue){
			selection.set("incldSunYn", "Y");
		} else {
			selection.set("incldSunYn", "N");
		}
	},

	onRemove: function(){
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME); 
		var selection = grid.getSelection() == null ? null: grid.getSelection()[0];
		
		if(selection){
			Ext.Msg.show({
				   title:  MOST.getApplication().bundle.getMsg('remove'),
				   message: MOST.getApplication().bundle.getMsg('removeyn_msg'),
			       buttons: Ext.Msg.YESNO,
			       icon: Ext.Msg.QUESTION,
			       fn: function(btn) {
			    	   if (btn === 'yes') {
			    		   store.remove(selection);
			    		   store.sync({
			    			   success: function(){
			    				   store.reload({
			    					   callback: function(records, operation, success) {
			    						   if(success){
			    							   var success = MOST.getApplication().bundle.getMsg('success_msg');
			    							   var msg = MOST.getApplication().bundle.getMsg('savesuccess_msg');
			    							   
			    							   Ext.Msg.alert(success, msg);
			    						   }
			    					   }
			    				   });
			    			   }
			    		   })
			    	   }
			       }
			});
		} else {
			MessageUtil.warning('Warning', 'selectdeletedata_msg');
		}
	},
	
	onCategoryRenderer:function(val, cell, gridView){
		var me = this;
		var refs = me.getReferences();
		var categoryCombo = me.getStore('catergoryCombo');
		
		if(categoryCombo != null && categoryCombo.getData().items.length != 0){
			var indx = -1;
			indx = categoryCombo.find('code', val);
			
			if (indx != -1){
				return categoryCombo.getAt(indx).get('codeName'); 
			}else{
				return '';
			}
		}
	},
	
	onCargoTypeRenderer:function(val, cell, gridView){
		var me = this;
		var refs = me.getReferences();
		var cargoTypeCombo = me.getStore('cargoTypeCombo');
		
		if(cargoTypeCombo != null && cargoTypeCombo.getData().items.length != 0){
			var indx = -1;
			indx = cargoTypeCombo.find('scd', val);
			
			if (indx != -1){
				return cargoTypeCombo.getAt(indx).get('scdNm'); 
			}else{
				return '';
			}
		}
	},
	
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */	
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	// Search Condition
	getSearchCondition : function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var ptnrCd = me.lookupReference("ctlPartnerCodeType").getValue();
		var ctlFrom = me.lookupReference("ctlFrom").getValue();
		var ctlTo = me.lookupReference("ctlTo").getValue();
		var dateCondition;
		
		if(StringUtil.isNullorEmpty(ptnrCd) || (refs.ctlFrom.getValue() != null && refs.ctlTo.getValue() != null)) {
			dateCondition = me.checkPeriodDate("ctlFrom", "ctlTo", me.MAX_PERIOD_DAY, true);
		}
    	
    	var params = me.createParam(searchParm);
    	
        params['ptnrCd'] = StringUtil.toUpperCase(ptnrCd);
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
		
		if(dateCondition != null){
			params['aplyYmd'] = dateCondition.fromDtString;
    		params['exprYmd'] = dateCondition.toDtString;
		}
    	
       	return params;
	},
	//popup
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(targetControl === 'refPtnrCdGrid'){
			if(returnValue){
				selection.set('ptnrCd', returnValue.code);
			} else {
				selection.set('ptnrCd', '');
			}
		} else if(targetControl === 'refCommodityField'){
			if(returnValue){
				refs.refCommodityField.setValue(returnValue.item.get('code'));
			} else {
				selection.set('cmdtCd', '');
			}
		} else if(targetControl === 'refPorCdGrid'){
			if(returnValue){
				selection.set('por', returnValue.item.get('code'));
			} else {
				selection.set('por', '');
			}
		}
	},
	// Generate method: Key Column Editable ################################
	setGridColumnEditable: function(isCreate) {
		var me = this;
		var refs = me.getReferences();
		
		refs.refPtnrCd.getEditor().setDisabled(!isCreate);
		refs.refOpeClassCdComboGrid.getEditor().setDisabled(!isCreate);
		refs.refPorCodedGrid.getEditor().setDisabled(false);
		refs.refCgTpCd.getEditor().setDisabled(!isCreate);
		refs.refCMDTField.getEditor().setDisabled(!isCreate);
		refs.refFreeDd.getEditor().setEditable(true);
		refs.refAplyYmd.getEditor().setDisabled(!isCreate);
		refs.refRmk.getEditor().setDisabled(false);
	}
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});