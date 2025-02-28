Ext.define('MOST.view.configuration.BerthLocationConfigurationController', {
	extend: 'MOST.view.foundation.BaseViewController',
	
	alias: 'controller.berthLocationConfiguration',
	
	requires:[
	],
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	
	MAIN_GRID_REF_NAME: 'refBerthWharfLocationGrid',
	MAIN_STORE_NAME: 'berthWharfLocation',
	TERMINAL_COMBOBOX_STORE: 'terminalCombo',
	BERTHTYPE_COMBOBOX_STORE: 'berthTypeCombo',
	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onLoad:function(){
		var me = this;
		var refs = me.getReferences();
		var terminalCombo = me.getStore('terminalCombo');
		var berthTypeCombo = me.getStore('berthTypeCombo');
		var searchParm = Ext.create('MOST.model.configuration.SearchBerthLocationConfigurationParm');
		
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch: searchParm});

		terminalCombo.load();
		berthTypeCombo.load();
		
		me.updateViewStyle(me.getView());
	},
	/**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	onSearch: function(){
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var refs = me.getReferences();
		var param = me.getSearchCondition();
		
		store.load({
			params: param,
			callback: function(records, operation, success){
				if(records.length == 0){
					Ext.Msg.alert('Warning', TSB.locale.i18n.Bundle.instance.getMsg('datanotfound_msg'));
			    }
			}
		});
	},
	
	onAdd: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refBerthWharfLocationGrid;
		var store = me.getStore('berthWharfLocation');
		var berthAreaStore = me.getStore('terminalCombo');
		var editor = refs.refBerthWharfLocationGrid.getPlugin('berthWharfLocationEditor');
		
		editor.cancelEdit();
		grid.filters.clearFilters();
		grid.filters.disable();
		store.clearFilter();
		
		refs.refBerthCd.getEditor().setEditable(true);
		refs.refBerthCd.getEditor().setDisabled(false);
		
		var record = Ext.create('MOST.model.configuration.BerthLocationConfiguration');
		var idx = 0;
		
		if(grid.getSelection() && grid.getSelection().length>0) {
			idx = store.indexOfId(grid.getSelection()[0].get('id'));
		}
		
		store.insert(idx, record);
		grid.getSelectionModel().select(record);
		
		var locCd = berthAreaStore.getAt(0).get('locCd');
		record.set('locCd', locCd ? locCd : '');
		
		editor.startEdit(record);
	},
	
	onRemove: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refBerthWharfLocationGrid;
		var selection = grid.getSelectionModel().getSelection()[0];
		var store = me.getStore('berthWharfLocation');
		var records = new Array();
			  
		if (selection) {
			Ext.Msg.show({
			   	title:	 MOST.getApplication().bundle.getMsg('remove'),
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
			        	});
		           }
		       }
		   	});
		}else {
			Ext.Msg.alert('Warning', TSB.locale.i18n.Bundle.instance.getMsg('selectdatatoremove_msg'));
		}
	},
	
	onDblClick: function() {
		var me = this;
		var refs = me.getReferences();
		
		refs.refBerthWharfLocationGrid.getPlugin('berthWharfLocationEditor').cancelEdit();
		refs.refBerthCd.getEditor().setEditable(false);
		refs.refBerthCd.getEditor().setDisabled(true);
		
	},
	
	/*rowEditing*/
	onCancelEdit: function(rowEditing, context) {
		if (context.record.phantom) {
			context.store.remove(context.record);
		}
	},
	
	onValidateedit:	function(editor, context) {
		var me = this;
		var berthCd = context.newValues.berthCd;
	
		if(context.record.phantom == true) {
			var berthWharfLocationDuplicateStore = Ext.getStore('duplicateCheckStore');
			berthWharfLocationDuplicateStore.load({
				params: {
					berthCd: berthCd
				},
				callback: function(records, operation, success) {
					this.resumeEvent('edit'); 
					
					if (records.length == 0 ) {
						this.fireEvent('edit', editor, context);
					} else {
						var failMsg = MOST.getApplication().bundle.getMsg('fail_msg');
						var msg = MOST.getApplication().bundle.getMsg('duplicatedata_msg');
						
						Ext.Msg.alert(failMsg, msg, function() {
							Ext.MessageBox.hide();
						});
						me.fireEvent('cancelEdit',editor, context);
					}
				},
				scope: this
			});

			me.suspendEvent('edit');
		}
	},
	
	onEdit: function(editor, context){
		if (context.record.phantom) {
			console.log('***** insert *****');
			context.record.set('insUserId', MOST.config.Token.getUserId());
			context.store.sync({
				success: function() {
					context.store.reload({
						callback: function(records, operation, success) {
							if(success){
								var success = MOST.getApplication().bundle.getMsg('success_msg');
								var msg = MOST.getApplication().bundle.getMsg('savesuccess_msg');
								
								Ext.Msg.alert(success, msg);
							}
						}
					});
				}
			});
		} else {
			console.log('***** update *****');
			context.record.set('updUserId', MOST.config.Token.getUserId())
			context.store.getProxy().params = {
				'berthCd' : context.record.data.berthCd
			};
			
			context.store.sync({
				success: function(){
					context.store.reload({
						callback: function(records, operation, success) {
							if(success){
								var success = MOST.getApplication().bundle.getMsg('success_msg');
								var msg = MOST.getApplication().bundle.getMsg('savesuccess_msg');
								
								Ext.Msg.alert(success, msg);
							}
						}
					});
				}
			});
		}
	},
	
	
	onExportExcelPdfWithServer: function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		searchBizParm.classID = 'com.tsb.most.biz.parm.configuration.SearchBerthLocationConfigurationParm';
		searchBizParm.serviceID = 'MOST.berthLocationConfiguration.selectBerthWharfList'

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
	getSearchCondition: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var searchParm = me.getViewModel().get('theSearch');
		var store = me.getStore(me.MAIN_STORE_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var param = me.createParam(searchParm);
		
		param['berthCd'] = StringUtil.toUpperCase(searchParm.data.berthCd);
		param['berthNm'] = StringUtil.toUpperCase(searchParm.data.berthNm);
		param['locCd'] = StringUtil.toUpperCase(searchParm.data.locCd);
		param['pageNo'] = pageNo;
		param['sizePerPage'] = sizePerPage;
		param['sort'] = grid.getSortString();
		
		return param;
	},

	//s-CFG-004 Berth Location Configuration 
	updateBackgroundColorForPicker: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var berthColorPicker = refs.refBerthColorPicker ? refs.refBerthColorPicker.inputEl : null;
		var selection = grid.getSelection()[0];

		if (selection && !selection.phantom) {
			var color = "#" + selection.get('color');
			if (berthColorPicker && berthColorPicker.dom) {
				berthColorPicker.dom.style.backgroundColor = color;
				berthColorPicker.dom.style.color = color;
			}
		}
	}
	//e-CFG-004 Berth Location Configuration 
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});