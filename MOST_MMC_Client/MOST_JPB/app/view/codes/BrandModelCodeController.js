Ext.define('MOST.view.codes.BrandModelCodeController', {
	extend: 'MOST.view.foundation.BaseViewController',
	requires: [
	],
	alias: 'controller.brandModelCode',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refBrandCodeGrid',
	MAIN_STORE_NAME: 'brandCode',
	MODEL_CODE_STORE_NAME: 'modelCode',
	BRAND_DUPLICATE_STORE_NAME: 'checkBrandCdDuplicate',
	MODEL_DUPLICATE_STORE_NAME: 'checkModelCdDuplicate',
	MAIN_GRID_MODEL_CODE_NAME: 'refModelCode',
	index: 0,
	/**
	 * =========================================================================================================================
	 * CONSTANT END
	 */

	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onLoad: function () {
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create('MOST.model.codes.SearchBrandModelCodeParm');

		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({ theSearch: searchParm });

		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
	},

	/**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */


	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	onSearch: function () {
		var me = this;
		var brandStore = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var params = me.getSearchCondition();

		if (params == null) {
			return;
		}

		brandStore.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					}else {
						grid.getSelectionModel().select(me.index);
						me.onClick();
					}
				}
			}
		});
	},

	onClick: function () {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if (selection == null) return;
		me.index = grid.store.indexOf(selection);
		me.getModel(selection);
	},

	getModel: function(record){
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var brandCd = record.data.brandCd;
		var modelStore = me.getStore(me.MODEL_CODE_STORE_NAME);
		
		modelStore.load({
			params: {
				brandCd: brandCd
			},
			callback: function (records, operation, success) {
				if (success) {

				}
			}
		});
	},
	
	onModelAdd: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refModelCode;
		var store = me.getStore(me.MODEL_CODE_STORE_NAME);
		var editor = refs.refModelCode.getPlugin('modelCodeEditor');
		var brandCodeGrid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = brandCodeGrid.getSelection() == null ? null : brandCodeGrid.getSelection()[0];
		
		if (selection === null || selection === undefined) {
			MessageUtil.info('info_msg', 'Please select a Brand Code');
			return;
		}
		
		var brandCd = selection.getData().brandCd;
		
		editor.cancelEdit();
		//Clear filter for Grid
		grid.clearFilters();

		//Clear filter for Store
		store.clearFilter();
		
		var record = Ext.create('MOST.model.codes.BrandModelCode');
		var idx = 0;

		if (grid.getSelection() && grid.getSelection().length > 0) {
			idx = store.indexOfId(grid.getSelection()[0].get('id'));
		}
		
		record.set("brandCd", brandCd);
		record.set("userId", MOST.config.Token.getUserId());
		store.insert(idx, record);
		grid.getSelectionModel().select(record);

		editor.startEdit(record);
		refs.refModelCd.getEditor().setDisabled(false);
		refs.refModelCd.getEditor().setEditable(true);
	},
	// Grid Add
	onBrandCodeAdd: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var editor = grid.getPlugin('brandCodeEditor');
		var record = Ext.create('MOST.model.codes.BrandModelCode');
		var idx = 0;
		
		editor.cancelEdit();
		
		if (grid.getSelection() && grid.getSelection().length > 0) {
			idx = store.indexOfId(grid.getSelection()[0].get('id'));
		}
		
		record.set("userId", MOST.config.Token.getUserId());
		store.insert(idx, record);
		grid.getSelectionModel().select(record);
		editor.startEdit(record);

		refs.refBrandCd.getEditor().setEditable(true);
		refs.refBrandCd.getEditor().setDisabled(false);
	},

	// Grid Row Remove
	onBrandCodeRemove: function () {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var selection = grid.getSelectionModel().getSelection()[0];
		var checkRemoveStore = me.getStore('checkBrandCdRemove');
		
		if (selection) {
			var brandCd = selection.getData().brandCd;
			
			checkRemoveStore.load({
				params: {
					brandCd: brandCd
				},
				callback: function (records, operation, success) {
					if (records.length == 0) {
						Ext.Msg.show({
							title: 'Remove',
							message: 'Are you going to remove this data?',
							buttons: Ext.Msg.YESNO,
							icon: Ext.Msg.QUESTION,
							fn: function (btn) {
								if (btn === 'yes') {
									store.remove(selection);
									store.sync({
										success: function () {
											store.reload({
												callback: function (records, operation, success) {
													if (success) {
														MessageUtil.saveSuccess(); // Success Message
													}
												}
											});

										}
									});
								}
							}
						});
					}
					else {
						Ext.Msg.alert('Warning', 'In order to delete this Brand you have to delete the Model which belong to this brand first.');
					}
				},
				scope: this
			});
		} else {
			Ext.Msg.alert('Warning', 'Please select a Brand Code');
		}
	},
	
	onModelCodeRemove: function () {
		var me = this;
		var grid = me.lookupReference('refModelCode');
		var store = me.getStore(me.MODEL_CODE_STORE_NAME);

		me.gridRemoveRow(grid, store, function () {
			MessageUtil.saveSuccess();
		});
	},

	onDblclick: function () {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];

		if (selection == null) return;
		
		selection.set("userId", MOST.config.Token.getUserId());
		me.setBrandCodeGridColumnEditable(selection.phantom);
	},

	onUpdateModel: function () {
		var me = this;
		var grid = me.lookupReference('refModelCode');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];

		if (selection == null) return;

		me.setModelCodeGridColumnEditable(selection.phantom);
	},

	// Key Column Editable
	setBrandCodeGridColumnEditable: function (isCreate) {
		var me = this;
		var refs = me.getReferences();

		if (isCreate) { //ADD
			refs.refBrandCd.getEditor().setEditable(true);
			refs.refBrandCd.getEditor().setDisabled(false);
		} else {		//UPDATE
			refs.refBrandCd.getEditor().setEditable(false);
			refs.refBrandCd.getEditor().setDisabled(true);
		}
	},

	setModelCodeGridColumnEditable: function (isCreate) {
		var me = this;
		var refs = me.getReferences();

		if (isCreate) { //ADD
			refs.refModelCd.getEditor().setEditable(true);
			refs.refModelCd.getEditor().setDisabled(false);
		} else {		//UPDATE
			refs.refModelCd.getEditor().setEditable(false);
			refs.refModelCd.getEditor().setDisabled(true);
		}
	},

	onCancelEdit: function (rowEditing, context) {
		var me = this;
		me.gridCancelEdit(rowEditing, context);
	},

	onBrandCodeValidateEdit: function (editor, context) {
		var me = this;
		var duplicateCheckStore = me.getStore(me.BRAND_DUPLICATE_STORE_NAME);
		var params = {
			brandCd: context.newValues.brandCd
		}

		me.gridDupliationCheck(editor, context, duplicateCheckStore, params);
	},
	
	onModelCodeValidateEdit: function (editor, context) {
		var me = this;
		var duplicateCheckStore = me.getStore(me.MODEL_DUPLICATE_STORE_NAME);
		var params = {
			modelCd: context.newValues.modelCd,
			brandCd: context.newValues.brandCd
		}

		me.gridDupliationCheck(editor, context, duplicateCheckStore, params);
	},

	onEdit: function (editor, context) {
		var me = this;
		me.gridEdit(editor, context);
	},
	
	onExportExcelPdfWithServer: function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchExportCondition();
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.codes.SearchBrandModelCodeParm';
		searchBizParm.serviceID = 'MOST.brandModelCode.selectModelCodeItems'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */

	/**
	 * GENERAL METHOD START
	 * =========================================================================================================================
	 */
	getSearchExportCondition : function(record){
		var me = this;
		var store = me.getStore(me.MODEL_CODE_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_MODEL_CODE_NAME);
		var grid1 = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid1.getSelectionModel().getSelection()[0];
		var brandCd = selection.getData().brandCd;
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		
		params['brandCd'] = brandCd;
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
		
		return params;		
	},
	
	onChangeUpperCase: function (field, newValue) {
		field.setValue(newValue.toUpperCase());
	},
	
	getSearchCondition: function () {
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);

		params['brandNm'] = StringUtil.toUpperCase(searchParm.data.brandNm);
		params['modelNm'] = StringUtil.toUpperCase(searchParm.data.modelNm);
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;

		return params;
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});

