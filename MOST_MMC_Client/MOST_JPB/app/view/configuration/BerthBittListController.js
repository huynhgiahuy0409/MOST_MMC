Ext.define('MOST.view.configuration.BerthBittListController', {
	extend: 'MOST.view.foundation.BaseViewController',
	
	alias: 'controller.berthBittList',
	
	requires:[
	],
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	
	MAIN_GRID_REF_NAME: 'refBerthBittGrid',
	MAIN_STORE_NAME: 'berthBitt',
	
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
		var berthLocCombo = me.getStore('berthLocCombo');
		
		var searchParm = Ext.create('MOST.model.configuration.SearchBerthBittListParm');
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch: searchParm});
		
		berthLocCombo.load();
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
		var grid = refs.refBerthBittGrid;
		var store = me.getStore('berthBitt');
		
		var editor = refs.refBerthBittGrid.getPlugin('berthBittEditor');
		
		editor.cancelEdit();
		grid.filters.clearFilters();
		grid.filters.disable();
		store.clearFilter();
		
		//refs.refBerthCd.getEditor().setEditable(true);
		refs.refBerthCd.getEditor().setDisabled(false);
		
		refs.refBittCd.getEditor().setEditable(true);
		refs.refBittCd.getEditor().setDisabled(false);
		
		var record = Ext.create('MOST.model.configuration.BerthBittList');
		var idx = 0;
		
		if(grid.getSelection() && grid.getSelection().length>0) {
			idx = store.indexOfId(grid.getSelection()[0].get('id'));
		}
		
		store.insert(idx, record);
		grid.getSelectionModel().select(record);
		
		//var locCd = berthAreaStore.getAt(0).get('locCd');
		//record.set('locCd', locCd ? locCd : '');
		
		editor.startEdit(record);
	},
	
	onRemove: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refBerthBittGrid;
		  
		var selection = grid.getSelectionModel().getSelection()[0];
		var store = me.getStore('berthBitt');
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
		refs.refBerthBittGrid.getPlugin('berthBittEditor').cancelEdit();
		
		refs.refBerthCd.getEditor().setEditable(false);
		refs.refBerthCd.getEditor().setDisabled(true);
		refs.refBittCd.getEditor().setEditable(false);
		refs.refBittCd.getEditor().setDisabled(true);
	},
	
	/*rowEditing*/
	onCancelEdit: function(rowEditing, context) {
		if (context.record.phantom) {
			context.store.remove(context.record);
		}
	},
	
	onValidateedit:	function(editor, context) {
		var me = this;
		var isValid = true;
		
		var berthBitt = me.getStore('berthBitt');
		var berthCd = editor.grid.down('[dataIndex=berthCd]').getEditor().getValue();
		var bittCd = editor.grid.down('[dataIndex=bittCd]').getEditor().getValue();
		var xPos = editor.grid.down('[dataIndex=xpos]').getEditor().getValue();
		var yPos = editor.grid.down('[dataIndex=ypos]').getEditor().getValue();
	
		if(context.record.phantom == true) {
			
			berthBitt.each(function (record) {
				
				if (record.data.berthCd == berthCd  && record.data.bittCd == bittCd) {
					var msg = MOST.getApplication().bundle.getMsg('bittDuplicateBerth_msg');
					MessageUtil.alert('Warning', msg);
					isValid = false;
					return false;
				}else if (record.data.berthCd == berthCd  && 
						Number(record.data.xpos) == Number(xPos))
				/*}else if (record.data.berthCd == berthCd  && 
						((Number(record.data.xPos) <= Number(xPos) && Number(xPos) <= Number(record.data.yPos))
						|| (Number(record.data.xPos) <= Number(yPos) && Number(yPos) <= Number(record.data.yPos)))*/
				{
					var msg = MOST.getApplication().bundle.getMsg('bittDuplicatePosition_msg');
					MessageUtil.alert('Warning', msg);
					isValid = false;
					return false;
				}
			});
		}else{
			berthBitt.each(function (record) {
				if (record.data.berthCd == berthCd  && 
						Number(record.data.xpos) == Number(xPos) && record.data.bittCd != bittCd)
				{
					var msg = MOST.getApplication().bundle.getMsg('bittDuplicatePosition_msg');
					MessageUtil.alert('Warning', msg);
					isValid = false;
					return false;
				}
			});
		}
		
		if (!isValid) {
			return false;
		}
		return true;
	},
	
	onEdit: function(editor, context){
		var me = this;
		var refs = me.getReferences(); 
		if (context.record.phantom) {
			console.log('***** insert *****');
			context.record.set('userId', MOST.config.Token.getUserId());
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
			context.record.set('userId', MOST.config.Token.getUserId());
			context.store.getProxy().params = {
				'berthCd' : context.record.data.berthCd,
				'bittCd' : context.record.data.bittCd
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
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var refs = me.getReferences();
		var searchBizParm = me.getSearchCondition();
		searchBizParm.classID = 'com.tsb.most.biz.parm.codes.SearchBerthBittParm';
		searchBizParm.serviceID = 'MOST.berthBitt.selectBerthBittList'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
	
	onChangeBerthTypeNm: function () {
		var me = this;
		var refs = me.getReferences();
		var berthTp = refs.refBerthTpNmEditor.lastSelection[0].data.berthTp;
		refs.refBerthTp.getEditor().setValue(berthTp);
		//me.changeCMDT = true;
		
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
		
		//param['pageNo'] = pageNo;
		//param['sizePerPage'] = sizePerPage;
		param['sort'] = grid.getSortString();
		
		return param;
	}
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});