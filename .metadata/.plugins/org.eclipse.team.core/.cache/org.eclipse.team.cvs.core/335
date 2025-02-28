Ext.define('MOST.view.document.excelupload.RORODetailUploadListController', {
    extend: 'MOST.view.foundation.BaseViewController',
    alias: 'controller.rorodetailuploadlist',
    
    requires: [],
    
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
   	MAIN_GRID_REF_NAME: 'refRORODetailUploadListGrid',
   	MAIN_STORE_NAME: 'rORODetailUploadList',

	/**
	 * =========================================================================================================================
	 * CONSTANT END
	 */

    
    /**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
    onLoad : function() {
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create('MOST.model.document.excelupload.SearchExcelFileUploadParm');
		
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		
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
	onSearch: function() {
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var params = me.getSearchCondition();
		
		if (params == null) {
			return;
		}
		
		store.load({
			params : params,
			callback : function(records, operation, success) {
				if (success) {
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					}
				}
			}
		});
	},

    onAdd: function () {
        var me = this;
		var refs = me.getReferences();
		var grid = refs.refCountryCodeGrid;
        var store = me.getStore(me.MAIN_STORE_NAME);
        var countryCodeEditor =refs.refCountryCodeGrid.getPlugin('generalcargolistEditor');
        var record = Ext.create('MOST.model.document.excelupload.GeneralCargo');
        var idx = 0;

        countryCodeEditor.cancelEdit();
		
    	if(grid.getSelection() && grid.getSelection().length>0) {
			idx = store.indexOfId(grid.getSelection()[0].get('id'));
		}
    	
    	store.insert(idx, record);
		grid.getSelectionModel().select(record);
    	
		countryCodeEditor.startEdit(record);
		refs.txtCountryCd.getEditor().setDisabled(false);
		refs.txtCountryCd.getEditor().setEditable(true);
    },

    onRemove: function () {
    	var me = this;
    	var refs = me.getReferences();
    	var grid = refs.refCountryCodeGrid;
        var selection = grid.getSelectionModel().getSelection()[0];
        var store = this.getStore(me.MAIN_STORE_NAME);
        var records = new Array();
        
        if(selection){
        	Ext.Msg.show({
			    title:'Remove',
			    message: 'Are you going to remove this data?',
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
											MessageUtil.saveSuccess(); // Success Message
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

    onDblclick: function () {
		var me = this;
		var refs = me.getReferences();
		
		refs.refCountryCodeGrid.getPlugin('generalcargolistEditor').cancelEdit();
		refs.txtCountryCd.getEditor().setDisabled(true);
		refs.txtCountryCd.getEditor().setEditable(false);
    },

    onCancelEdit: function(rowEditing, context) {
		// Canceling editing of a locally added, unsaved record: remove it
		if (context.record.phantom) {
			context.store.remove(context.record);
		}
	},

	onValidateEdit:	function(editor, context) {
		if(context.record.phantom == true) {
			var rORODetailUploadListDuplicateCheck = Ext.getStore('rORODetailUploadListDuplicateCheck');
			    
			rORODetailUploadListDuplicateCheck.load({
				params: {
					cntryCd: context.newValues.cntryCd
					
				},
				callback: function(records, operation, success) {
					this.resumeEvent('onEdit');
					
					if(records.length == 0) {
						this.fireEvent('onEedit', editor, context);
					} else {
						Ext.Msg.alert('Warning', 'Duplicate data');
						this.fireEvent('onCancelEdit',editor, context);
					}
				},
				scope: this
			});

			this.suspendEvent('onEdit');
		}
	},

	onEdit: function(editor, context){
		// phantom : True when the record does not yet exist in a server-side database.
		if (context.record.phantom) {	 
			console.log('***** insert *****');
			context.store.remove(0);
			context.store.insert(0,context.record);
			context.store.sync({
				callback: function(records, operation, success) {
					context.store.reload({
						callback: function(records, operation, success) {
							if(success){
								Ext.Msg.alert('Info', 'Process successfully.');
							}
						}
					});
				}
			});	
		} else {
			console.log('***** update *****');
			context.store.getProxy().params = {
				'lcd' : context.record.data.lcd,
				'version' : context.record.data.version
			};
			context.store.sync({
				success: function(){
					context.store.reload({
						callback: function(records, operation, success) {
							if(success){
								Ext.Msg.alert('Info', 'Process successfully.');
							}
						}
					});
				}
			});
		}
	},
		
	onDetailListFileUpload : function() {
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var frm = refs.fileForm;
		var formData = new FormData(frm);
    	var input = document.querySelector("input[id='rORODetailUploadListFileUpload-button-fileInputEl']");
    	
    	if(input.files.length == 0){
			return;
    	}
    	
		me.onClear();

    	var file = input.files[0];
    	
    	if(file != null){
        	refs.refFilePath.setValue(file.name);
        	formData.append(file.name, file);
        	this.fileUpload(formData);
    	}
	},
    /**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */
		
	/**
	 * GENERAL METHOD START
	 * =========================================================================================================================
	 */
	
	fileUpload : function(formData){
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
    	var xhr = new XMLHttpRequest();
    	
    	xhr.addEventListener('loadend', function(){
    		if(xhr.status === 200){
    			Ext.MessageBox.hide();

    			var rtnData = JSON.parse(xhr.responseText); // get filename - uuid
    	        var store = me.getStore(me.MAIN_STORE_NAME);
    			var params = me.getSearchCondition(rtnData['fileName']);
    	    	
    	    	store.load({
    				params : params,
    				callback : function(records, operation, success) {
    					if (success) {
							me.onDuplicateCheck();
							
    						if (records && records.length <= 0) {
    							MessageUtil.noMatchData();
    						}
    					} else if(!success) {
							MessageUtil.warning('warning_msg', 'cargoDischargingListMsgValidWrongFormat');
						}
    				}
    			});
    		}else{
    			MessageUtil.warning('warning_msg', 'fail_msg');
    		}
    	});
    	
    	xhr.open('POST',MOST.config.Locale.getRestApiDestUrl() + '/file/manage/excelupload');
    	xhr.setRequestHeader('Authorization', MOST.config.Token.getTokenType() + ' ' + MOST.config.Token.getAccessToken());
    	xhr.send(formData);
    	
    	var msgBox = Ext.MessageBox.show({
			msg: 'Uploading your data...',
			progressText: 'Progressing...',
			width:300,
			wait:true,
			waitConfig: {interval:200}
		});
	},

	onDuplicateCheck: function() {
		var me = this,
			grid = me.lookupReference(me.MAIN_GRID_REF_NAME),
			viewModel = me.getViewModel(),
			store = me.getStore(me.MAIN_STORE_NAME),
			storeData = store.getData().items;

		// check duplicate - excel data itself
		me.onCheckExcelItself(grid, storeData, viewModel);
		
		var validObj = viewModel.get('validObj');
		
		if(!validObj.excelItself){
			// alert message
			MessageUtil.warning('warning_msg', validObj.msgcode);
			return;
		}
	},

	onCheckExcelItself: function(grid, storeData, viewModel) {
		for( index1 in storeData ) {
			record1 = storeData[index1];
			
			var validation = record1.getValidation();

			if(!validation.isValid()) {
				viewModel.set('validObj', {
					excelItself: false,
					msgcode:'cargoDischargingListMsgValidFormat'
				});
				
				record1.set("invalid" , true);

				continue;
			}
			
			for( index2 in storeData ) {
				record2 = storeData[index2];
				
				if( record1.get('id') == record2.get('id') ){
					break;
				}else{
					if(record1.get('unitNo') === record2.get('unitNo')) {
						var targetGridCol = grid.getColumns().find(col => col.dataIndex == 'unitNo' );
						var targetHtmlCell = grid.view.getCell(record1, targetGridCol); // var targets = Ext.fly(targetHtmlCell); 
						var qtipMsg = ViewUtil.getLabel('cargoDischargingListMsgCellValid00');
						
						targetHtmlCell.setAttribute('data-qtip', qtipMsg);
						targetHtmlCell.bgColor = 'yellow'; 
						
						// when use this class > 'x-rippling.x-component-decline x-ripple', the record is gone..
						record1.set("invalid" , true); // grid.getView().addRowCls(record1, 'bg_red' ); 
						viewModel.set('validObj', {
							excelItself: false,
							msgcode:'cargoDischargingListMsgValid00'
						});
					}
				}
			}
		}
	},
	
	onSave: function(){
		var me = this,
			store = me.getStore(me.MAIN_STORE_NAME),
			grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		
		var myMask = new Ext.LoadMask({
			msg    : 'Saving...',
			target : me.getView()
		});
		
		var storeData = store.getData();
		var idx = 0;
		
		var roroDetailStore = me.getParentView().lookupReference('refROROGrid').getStore();
		
		for(idx =0; idx < storeData.length; idx++ ){
			if(storeData.getAt(idx).data.newYn == 'NEW'){
				storeData.getAt(idx).data.newYn = 'Y';
			} else {
				storeData.getAt(idx).data.newYn = 'N';
			}
			
			if(me.getParentView().getReferences().refCboROROModel.getValue() != storeData.getAt(idx).data.modelCd){
				MessageUtil.warning('warning_msg', 'differentModel');
				return false;
			}
			
			roroDetailStore.insert(0, storeData.getAt(idx).data);
		}
		// Fixing 0132245: [SN Detail / RORO Detail Upload List] There's no reaction from [Save] button in "RORO Detail Upload List" screen
		var win = Ext.WindowManager.getActive();
		MessageUtil.confirmation('success_msg', 'savesuccess_msg',null,
				function(button){
					if (button === 'ok') {					
						win.close();
					}
				}
		);
		
	},
	
	onClear: function(){
		var me = this,
			store = me.getStore(me.MAIN_STORE_NAME),
			fileTextField = me.lookupReference('refFilePath'),
			fileField = me.lookupReference('refFileField');
			
		// reset valid
		me.getViewModel().set('validObj', {
			excelItself: true,
			msgcode: null
		});

		// reset field
		fileTextField.reset();
		fileField.reset();
		store.removeAll();
		store.clearData();
	},

	getSearchCondition : function(fileName) {
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
    	
		params['fileName'] = fileName;
        params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
		
		return params;
	}
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */

});

