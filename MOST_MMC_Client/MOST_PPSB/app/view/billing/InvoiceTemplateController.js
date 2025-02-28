Ext.define('MOST.view.billing.InvoiceTemplateController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.invoicetemplate',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	 MAIN_GRID_REF_NAME: 'refinvoiceTemplateGrid',
	 MAIN_STORE_NAME: 'invoiceTemplateList',
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
		
		var tariffTypeComboStore = me.getStore('invoiceTemplateTariffTypeComboList');
		
		tariffTypeComboStore.load({
			callback: function(records, operation, success) {
				if (success) {
				}
			}
		});
		
		me.onSearch();
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
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
     	var templateStore = me.getStore(me.MAIN_STORE_NAME);
		
		var cargoTpCdComboStore = me.getStore('searchCargoTpCdCombo');
		var categoryComboStore = me.getStore('searchCategoryCombo');
		var deliveryTpCdComboStore = me.getStore('searchDeliveryTpCdCombo');
		
		cargoTpCdComboStore.load();
		categoryComboStore.load();
		deliveryTpCdComboStore.load();
		
		templateStore.load({
			callback: function(records, operation, success) {
				if(records.length > 0){
					templateStore.setData(records[0].data.templateList)
					templateStore.commitChanges();
					grid.getSelectionModel().select(0);
					me.onSearchClick();
				}
			}
		});
	},
	onTariffTypeSearch: function() {
		var me = this;
     	var refs = me.getReferences();

    	me.onChangeDataByTariffTp();
	},
	
	// Grid Add
	onAdd: function() {
		var me = this;
		var refs = me.getReferences();

		var invoiceTemplateList = me.getStore(me.MAIN_STORE_NAME);
		var record = Ext.create('MOST.model.billing.InvoiceTemplate');
		
		var convertedstring = null;
		var boolean = false;
		var isDuplicate = false;
		
		while(!boolean){
			var convertedstring = Math.floor(Math.random()*999999)+"";
			while(convertedstring.length != 6){
				convertedstring = "0".concat(convertedstring);
			}

			convertedstring = "IT"+convertedstring;
			
			for(var i = 0; i<invoiceTemplateList.data.items.length;i++){
				if(invoiceTemplateList.data.items[0].data.templateCd != null && (invoiceTemplateList.data.items[0].data.templateCd == convertedstring)){
					isDuplicate = true;
					break;
				}
			}
			if(!isDuplicate){
				boolean = true;
			}
		}
		record.data.templateCd = convertedstring;
		record.data.workingStatus = WorkingStatus.INSERT;
		record.data.userId = MOST.config.Token.getUserId();		

		invoiceTemplateList.insert(0, record);
		me.getViewModel().set('theInvoiceTemplate',  record);

		if(refs.refBtnCreate){
			refs.refBtnCreate.setDisabled(true);
		}
		if(refs.refBtnDelete){
			refs.refBtnDelete.setDisabled(true);
		}
		if(refs.refBtnSave){
			refs.refBtnSave.setDisabled(false);
		}
		refs.refTemplateName.setDisabled(false);
		refs.refBtnSaveInfo.setDisabled(true);
	},
	

	// Grid Cancel Edit
	onCancelEdit : function(rowEditing, context) {
		var me = this;
		me.gridCancelEdit(rowEditing, context);
	},
	
	// Grid Row Remove
	onRemove: function() {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		
		var selection = grid.getSelection() === null ? null : grid.getSelection()[0];
		
		if(selection == null){
			MessageUtil.warning("invoicetemplate", "invoicetemplate_not_select_invoicetemplate_msg");
			return null;
		}
		MessageUtil.question('remove', 'infodelete_msg', null, function (button) {
			if (button === 'ok') {
				var store = me.getStore(me.MAIN_STORE_NAME);
				var item = Ext.create('MOST.model.billing.InvoiceTemplate');
				item.set('templateCd', selection.data.templateCd);
				item.set('userId', Token.getUserId());
				item.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
				var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
				updateParm.getProxy().url = store.getProxy().url;
				updateParm.phantom = false;
				updateParm.drop();
				updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
				updateParm.set('items', new Array());

				updateParm.get('items').push(item.data);
				updateParm.save({
					success: function (record, operation) {
						store.commitChanges();
						MessageUtil.saveSuccess();
						me.onSearch();
					}
				});
			}
		});
	},
	
	// Key Column Editable
	setGridColumnEditable:function(isCreate){
		var me = this;
		var refs = me.getReferences();

		if(isCreate){ // ADD
			refs.refTemplateNm.getEditor().setEditable(true);
			refs.refTemplateNm.getEditor().setDisabled(false);
		} else { // UPDATE
			refs.refTemplateNm.getEditor().setEditable(true);
			refs.refTemplateNm.getEditor().setDisabled(false);
		}
	},
	
	onSearchClick: function() {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var templateIndex = 0;
		
		var selection = grid.getSelection() === null ? null : grid.getSelection()[0];
		if(selection === null) return;
		
		if(refs.refBtnSave){
			refs.refBtnSave.setDisabled(false);
		}
		if(refs.refBtnDelete){
			refs.refBtnDelete.setDisabled(false);
		}
		refs.refTemplateName.setDisabled(false);
		me.onDisplayInvoiceTemplate();
		me.onChangeDataByTariffTp();
		
		templateIndex = grid.store.indexOf(selection);
		
		refs.refBtnSaveInfo.setDisabled(false);
	},
	
	onDisplayInvoiceTemplate:function(){
		var me = this;
		var refs = me.getReferences();

		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;
		
		me.getViewModel().set('theInvoiceTemplate', selection);
	},
	
	// Grid Edit
	onEdit : function(editor, context){
		var me = this;
		if(context.newValues.payer == null || context.newValues.payer === ""){
			context.record.data.payer = "*";
		}
		
		if (context.record.phantom) {
			Ext.Msg.show({
				title:MOST.getApplication().bundle.getMsg('add'),
				message: MOST.getApplication().bundle.getMsg('infoinsert_msg'),
			    buttons: Ext.Msg.OKCANCEL,
			    icon: Ext.Msg.QUESTION,
			    fn: function(button) {
			        if (button === 'ok') {
			        	context.store.sync({
							success: function(){
								context.store.reload();
								me.onSearch();
							}
						});
			        }else if(button === 'cancel'){
			        	context.store.removeAt(context.rowIdx);
			        }
			    }
			});
		} else {
			context.store.sync({
				success: function(){
					context.store.reload();
				}
			});
		}
	},
	
	
	onSave:function(){
		var me = this;
		var refs = me.getReferences();
		if (refs.refTemplateName.getValue() == '') {
			MessageUtil.warning("invoicetemplate", "templateNameEmpty");
			return null;
		}
		var store = me.getStore(me.MAIN_STORE_NAME);
		var tariffTypeStore = me.getStore('invoiceTemplateTariffTypeList');
		var templateItems = new Array();
		var masterItem = Ext.create('MOST.model.billing.InvoiceTemplate');

		if (store.getModifiedRecords().length > 0) {
			store.getModifiedRecords().forEach(function(record, index, array){
				masterItem = record;
				if( masterItem.data.payer === ''){
					masterItem.data.payer = '*';
				}
				masterItem.data.items = new Array();
			});
			masterItem.set('userId', Token.getUserId());
			var isCreated = masterItem.phantom;
	
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			updateParm.getProxy().url = store.getProxy().url;
			updateParm.phantom = isCreated;		
			updateParm.set('workingStatus',  isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
			updateParm.set('items', new Array());
			
			updateParm.get('items').push(masterItem.data);
			
			updateParm.save({
				success:function(){
					store.commitChanges();
					MessageUtil.saveSuccess(); 
					me.onSearch();
				}
			})
			if(refs.refBtnSave){
				refs.refBtnSave.setDisabled(true);
			}
			if(refs.refBtnDelete){
				refs.refBtnDelete.setDisabled(true);
			}
			
			if(refs.refBtnCreate){
				refs.refBtnCreate.setDisabled(false);
			}
		}
		else {
			MessageUtil.warning("invoicetemplate", "editColumnTemplateName");
			return null;
		}

	},
	
	onTariffTypeChange:function(){
		var me = this;
		var refs = me.getReferences();
		var tariffTypeStore = me.getStore('invoiceTemplateTariffTypeList');
		var tarifftypeCode = refs.ctltariffTypeCombo.getValue();
		
		if(tarifftypeCode){
			var tariffFilter = new Ext.util.Filter({
    			id: 'trfTpCd',
    			property: 'trfTpCd',
    			operator: '=',
    			value: tarifftypeCode
    		});
			tariffTypeStore.filter(tariffFilter);			
		}else{
			tariffTypeStore.clearFilter();
		}
	},
	
	onChangeDataByTariffTp : function(){
    	var me = this;
     	var refs = me.getReferences();
     	var tariffTypeStore = me.getStore('invoiceTemplateTariffTypeList');
     	var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
     	var tarifftypeCode = refs.ctltariffTypeCombo.getValue();
     	var selection = grid.getSelection() === null ? null : grid.getSelection()[0];
		var tariffItems = new Array();
		var list = new Array();
		
		var templateTrfStore = me.getStore('tariffByTemplate');
		
		templateTrfStore.load({
			params:{
				searchTp:'TEMPLATE_CHANGED_MOD',
				templateCd: selection.data.templateCd
			},
			callback:function(records, operation, success){
				selection.data.items = records;
				if(selection != null){
					list = selection.data.items;	
				}

				tariffTypeStore.load({
					params: {
						searchTp:'INV_TPL',
						trfTpCd: ''
					},
					callback: function(records, operation, success) {
						if (success) {
							if(records){
								if(selection.data.items == null){
									list = records;
								}
								
								for(var i=0 ; i<records.length ; i++){
									if(selection == undefined){
										tariffItems.push(records[i]);
									}else{
						     			for(var j=0 ; j < list.length ; j++){
						     				var tariffRecord = list[j];
						     				if(	tariffRecord.data.subTrfCd === records[i].data.subTrfCd && 
						     					tariffRecord.data.trfCd === records[i].data.trfCd && 
						     					records[i].data.selected !== 'true'){
						     					records[i].data.selected = 'true';
						     				}
						     			}
						     			tariffItems.push(records[i]);
									}
								}
								tariffTypeStore.removeAll();
								tariffTypeStore.setData(tariffItems);
								tariffTypeStore.commitChanges();	
							}
						}
					}
				});
//				}
			}
		});
    },
    	
	//tariffType Grid checkcolumn
	onChecked : function(chkbox, rowIdx, checked, record, e, eOpts){
    	var me = this;
     	var refs = me.getReferences();
    	var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() === null ? null : grid.getSelection()[0];
		
		refs.refBtnSave.setDisabled(true);
		if(selection == null){
			MessageUtil.warning("invoicetemplate", "invoicetemplate_not_select_invoicetemplate_msg");
			return null;
		}
		if(record.data.selected){
			record.data.selected=true;
		}
		else{
			record.data.selected=false;
		}
    },
	onSaveInfo : function(){
    	var me = this;
     	var refs = me.getReferences();
     	var tariffTypeStore = me.getStore('invoiceTemplateTariffTypeList');
     	var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
     	var tarifftypeCode = refs.ctltariffTypeCombo.getValue();
		var selection = grid.getSelection() === null ? null : grid.getSelection()[0];

		var arrItems = new Array();
		var saveItems = new Array();
		if(selection == null){
			MessageUtil.warning("invoicetemplate", "invoicetemplate_not_select_invoicetemplate_msg");
			return null;
		}
		
		selection.phantom = (selection.get('workingStatus') == WorkingStatus.INSERT ) ? true : false;
		
		for(var i=0;i<selection.data.items.length ; i++){
			var record = selection.data.items[i];
			var masterItem = Ext.create('MOST.model.billing.InvoiceTemplate');
			if(record.crudState) {
				masterItem.set("templateCd",		selection.data.templateCd);
				masterItem.set("trfCd",				record.data.trfCd);
				masterItem.set("subTrfCd",			record.data.subTrfCd);
				masterItem.set("userId",			MOST.config.Token.getUserId());
				masterItem.set("selectedFlag",		"R");
			}
			else {
				masterItem.set("templateCd",		selection.data.templateCd);
				masterItem.set("trfCd",				record.trfCd);
				masterItem.set("subTrfCd",			record.subTrfCd);
				masterItem.set("userId",			MOST.config.Token.getUserId());
				masterItem.set("selectedFlag",		"R");
			}
			
			saveItems.push(masterItem.data);
		}
		selection.data.items = saveItems;
	
		// CREATE, UPDATE RECORD
		tariffTypeStore.getModifiedRecords().forEach(function(record, index, array){
			var masterItem = Ext.create('MOST.model.billing.InvoiceTemplate');
			record.set('newVersion', me.generateUuid());
			if(record.data.selected){
				for(var i=0;i<selection.data.items.length ; i++){
					if(record.data.subTrfCd == selection.data.items[i].subTrfCd &&  record.data.trfCd == selection.data.items[i].trfCd){
						selection.data.items[i].userId = MOST.config.Token.getUserId();
						selection.data.items[i].selectedFlag = "D";
					}else{
						masterItem.set("selectedFlag","");	
					}
				}
				masterItem.set("templateCd",selection.data.templateCd);
				masterItem.set("templateNm",selection.data.templateNm);
				masterItem.set("trfCd",record.data.trfCd);
				masterItem.set("subTrfCd",record.data.subTrfCd);
				masterItem.set("userId",MOST.config.Token.getUserId());
				selection.data.items.push(masterItem.data);
				
			}
			else{
				for(var i=0;i<selection.data.items.length ; i++){
					if(record.data.subTrfCd == selection.data.items[i].subTrfCd &&  record.data.trfCd == selection.data.items[i].trfCd){
						selection.data.items[i].userId = MOST.config.Token.getUserId();
						selection.data.items[i].selectedFlag = "D";
					}
				}
			}
		});
		tariffTypeStore.commitChanges();

		if(selection.dirty || selection.data.items.length>0){

			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			updateParm.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/invoiceTemplate/templatelist';
			updateParm.phantom = selection.phantom;
			updateParm.set('workingStatus', WorkingStatus.convertInt(selection.get('workingStatus')));
			// updateParm.phantom = false;
			updateParm.set('items', new Array());
			selection.set("userId", Token.getUserId());

			updateParm.get('items').push(selection.data);
			updateParm.save({
				success:function(){
					selection.commit();
					MessageUtil.saveSuccess(); 
					me.onSearch();
				}
			})
	
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
    	var tariffTypeCode = refs.ctltariffTypeCombo.getValue();
    	
    	var params = {
			colString : tariffTypeCode,
			colCombo : colCombo
		};
    	   	
    	return params;
	}
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});