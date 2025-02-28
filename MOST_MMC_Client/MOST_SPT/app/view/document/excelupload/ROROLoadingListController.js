Ext.define('MOST.view.document.excelupload.ROROLoadingListController', {
    extend: 'MOST.view.foundation.BaseViewController',
    alias: 'controller.roroloadinglist',
    
    requires: [],
    
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
   	MAIN_GRID_REF_NAME: 'refROROLoadingListGrid',
   	MAIN_STORE_NAME: 'rOROloadinglist',
    
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
        
        countryCodeEditor.cancelEdit();
        
        var record = Ext.create('MOST.model.document.excelupload.GeneralCargo');
		
        var idx = 0;
		
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
			var rOROLoadingListDuplicateCheck = Ext.getStore('rOROLoadingListDuplicateCheck');
			    
			rOROLoadingListDuplicateCheck.load({
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
		
	onLoadingListFileUpload : function() {
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var frm = refs.fileForm;
		var formData = new FormData(frm);
    	var input = document.querySelector("input[id='rOROLoadingListFileUpload-button-fileInputEl']");
    	
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
						var responseObj = JSON.parse(operation.getResponse().responseText).response.data;
						
    					if (success) {
							if(responseObj.length <= 0 || responseObj.includes('NumberFormatException') || responseObj.includes('NullPointerException')){
								store.removeAll();
								store.clearData();
								MessageUtil.warning('warning_msg', 'cargoLoadingListMsgValidWrongFormat');
							} else {
								me.onDuplicateCheck();
	    						if (records && records.length <= 0) {
	    							MessageUtil.noMatchData();
	    						} 
							}
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
	
	nullCheckColumnList : ['opeClassCd', 'mfDocId', 'shipgNoteNo',
		'chassisNo', 'consignee', 'shipper',
		'transporter', 'cargoSubType', 'commodity',
		'packageType', 'vehicleBrand', 'vehicleModel',
		'loadPort', 'dischargePort', 'cargoDesc',
		'deliveryMode', 'hatchNo', 'modeofOp', 'newUsed', 'estimateArrivalDate'],

	numberCheckColumnList : ['docWgt', 'quantity',
							'totalWeight', 'totalVolumn'],

	recordNullColumnChecker: function(record, grid, dataIndex){
		
		var condition;
		var errorMsg;
		
		if(this.nullCheckColumnList.includes(dataIndex)){
			condition = (record.get(dataIndex) == '' || record.get(dataIndex) == null);
			errorMsg = 'Not allowed NULL/Blank.';
		} else if (this.numberCheckColumnList.includes(dataIndex)){
			
			var regex;
			
			if(dataIndex == 'docWgt'){
				regex = /(^[\d]+$)|(^[\d]+[.]{1}[\d]+$)|^\0{0}$/i;
			} else if (dataIndex == 'totalWeight' || dataIndex == 'totalVolumn'){
				regex = /(^$)|(^[\d]+$)|(^[\d]+[.]{1}[\d]+$)/i;
			} else if (dataIndex == 'quantity'){
				regex = /(^$)|^[\d]+$/i;
			}
			
			condition = ((record.get(dataIndex) == '' || record.get(dataIndex) == null) || !(regex).test(record.get(dataIndex)));
			errorMsg = 'Not allowed NULL/Blank or any is not number.'
		}

		if (condition) {
			
			var refs = this.getReferences();
			var targetGridCol = grid.getColumns().find(col => col.dataIndex == dataIndex);
			var targetHtmlCell = grid.view.getCell(record, targetGridCol);  
			
			Ext.Msg.alert('Warning', 'There has been existed Wrong format in fields, need to check again.');
			
			targetHtmlCell.setAttribute('data-qtip', errorMsg);
			targetHtmlCell.bgColor = 'yellow'; 
			
			refs.refbtnSave.setDisabled(true);
			
			record.set("invalid" , true);
		}
	},

	onCheckExcelItself: function(grid, storeData, viewModel) {
		
		for( index1 in storeData ) {
			record1 = storeData[index1];
			
			Object.keys(record1.data).filter(value => this.nullCheckColumnList.includes(value) || this.numberCheckColumnList.includes(value)).forEach(key => {
				if(this.nullCheckColumnList.includes(key) || this.numberCheckColumnList.includes(key)){
					this.recordNullColumnChecker(record1, grid, key);
				}
			})
			
			if (!(/^[\w\d]+(-?)[\w\d]+$/i).test(record1.get('vslCallId'))) {
				
				var refs = this.getReferences();
				var targetGridCol = grid.getColumns().find(col => col.dataIndex == 'vslCallId' );
				var targetHtmlCell = grid.view.getCell(record1, targetGridCol);  
				
				Ext.Msg.alert('Warning', 'There has been existed Wrong format in fields, need to check again.');
				
				targetHtmlCell.setAttribute('data-qtip', 'Not allowed Special Character.');
				targetHtmlCell.bgColor = 'yellow'; 
				
				refs.refbtnSave.setDisabled(true);
				
				record1.set("invalid" , true);
			}
			
			if ((record1.get('opeClassCd') != '' && record1.get('opeClassCd') != null) && record1.get('opeClassCd') != 'E') {
				
				var refs = this.getReferences();
				var targetGridCol = grid.getColumns().find(col => col.dataIndex == 'opeClassCd' );
				var targetHtmlCell = grid.view.getCell(record1, targetGridCol);  
				
				Ext.Msg.alert('Warning', 'There has been existed Wrong format in fields, need to check again.');
				
				targetHtmlCell.setAttribute('data-qtip', 'Allowed only \'EXPORT\'.');
				targetHtmlCell.bgColor = 'yellow'; 
				
				refs.refbtnSave.setDisabled(true);
				
				record1.set("invalid" , true);
			}
			
			if ((record1.get('newUsed') == '' || record1.get('newUsed') == null) || (record1.get('newUsed') != 'N' && record1.get('newUsed') != 'Y')) {
				
				var refs = this.getReferences();
				var targetGridCol = grid.getColumns().find(col => col.dataIndex == 'newUsed' );
				var targetHtmlCell = grid.view.getCell(record1, targetGridCol);  
				
				Ext.Msg.alert('Warning', 'There has been existed Wrong format in fields, need to check again.');
				
				targetHtmlCell.setAttribute('data-qtip', 'Allowed only \'N\' or \'Y\'.');
				targetHtmlCell.bgColor = 'yellow'; 
				
				refs.refbtnSave.setDisabled(true);
				
				record1.set("invalid" , true);
			}
			
			if ((record1.get('estimateArrivalDate') != '' && record1.get('estimateArrivalDate') != null) 
					&& !(/^(0[1-9]|[12]\d|3[01])\/(0[1-9]|[1][1-2])\/\d{4} (0[0-9]|[12][1-3]):(0[0-9]|[12345][1-9])$/i).test(Ext.util.Format.date(new Date(record1.get('estimateArrivalDate')), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()))) {
				
				var refs = this.getReferences();
				var targetGridCol = grid.getColumns().find(col => col.dataIndex == 'estimateArrivalDate' );
				var targetHtmlCell = grid.view.getCell(record1, targetGridCol);  
				
				Ext.Msg.alert('Warning', 'There has been existed Wrong format in fields, need to check again.');
				
				targetHtmlCell.setAttribute('data-qtip', 'Allowed only DD/MM/YYYY HH:MM');
				targetHtmlCell.bgColor = 'yellow'; 
				
				refs.refbtnSave.setDisabled(true);
				
				record1.set("invalid" , true);
			}
			
			for( index2 in storeData ) {
				record2 = storeData[index2];
				
				Object.keys(record2.data).filter(value => this.nullCheckColumnList.includes(value) || this.numberCheckColumnList.includes(value)).forEach(key => {
					if(this.nullCheckColumnList.includes(key) || this.numberCheckColumnList.includes(key)){
						this.recordNullColumnChecker(record2, grid, key);
					}
				})
				
				if (!(/^[\w\d]+(-?)[\w\d]+$/i).test(record2.get('vslCallId'))) {
					
					var refs = this.getReferences();
					var targetGridCol = grid.getColumns().find(col => col.dataIndex == 'vslCallId' );
					var targetHtmlCell = grid.view.getCell(record2, targetGridCol);  
					
					Ext.Msg.alert('Warning', 'There has been existed Wrong format in fields, need to check again.');
					
					targetHtmlCell.setAttribute('data-qtip', 'Not allowed Special Character.');
					targetHtmlCell.bgColor = 'yellow'; 
					
					refs.refbtnSave.setDisabled(true);
					
					record2.set("invalid" , true);
				}
				
				if ((record2.get('opeClassCd') != '' && record2.get('opeClassCd') != null) && record2.get('opeClassCd') != 'E') {
					
					var refs = this.getReferences();
					var targetGridCol = grid.getColumns().find(col => col.dataIndex == 'opeClassCd' );
					var targetHtmlCell = grid.view.getCell(record2, targetGridCol);  
					
					Ext.Msg.alert('Warning', 'There has been existed Wrong format in fields, need to check again.');
					
					targetHtmlCell.setAttribute('data-qtip', 'Allowed only \'EXPORT\'.');
					targetHtmlCell.bgColor = 'yellow'; 
					
					refs.refbtnSave.setDisabled(true);
					
					record2.set("invalid" , true);
				}
				
				if ((record2.get('newUsed') == '' || record2.get('newUsed') == null) || (record2.get('newUsed') != 'N' && record2.get('newUsed') != 'Y')) {
					
					var refs = this.getReferences();
					var targetGridCol = grid.getColumns().find(col => col.dataIndex == 'newUsed' );
					var targetHtmlCell = grid.view.getCell(record2, targetGridCol);  
					
					Ext.Msg.alert('Warning', 'There has been existed Wrong format in fields, need to check again.');
					
					targetHtmlCell.setAttribute('data-qtip', 'Allowed only \'N\' or \'Y\'.');
					targetHtmlCell.bgColor = 'yellow'; 
					
					refs.refbtnSave.setDisabled(true);
					
					record2.set("invalid" , true);
				}
				
				if ((record2.get('estimateArrivalDate') != '' && record2.get('estimateArrivalDate') != null) 
						&& !(/^(0[1-9]|[12]\d|3[01])\/(0[1-9]|[1][1-2])\/\d{4} (0[0-9]|[12][1-3]):(0[0-9]|[12345][1-9])$/i).test(Ext.util.Format.date(new Date(record2.get('estimateArrivalDate')), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()))) {
					
					var refs = this.getReferences();
					var targetGridCol = grid.getColumns().find(col => col.dataIndex == 'estimateArrivalDate' );
					var targetHtmlCell = grid.view.getCell(record2, targetGridCol);  
					
					Ext.Msg.alert('Warning', 'There has been existed Wrong format in fields, need to check again.');
					
					targetHtmlCell.setAttribute('data-qtip', 'Allowed only DD/MM/YYYY HH:MM');
					targetHtmlCell.bgColor = 'yellow'; 
					
					refs.refbtnSave.setDisabled(true);
					
					record2.set("invalid" , true);
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
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		var uploadItems = new Array();
		var storeData = store.getData();
		var idx = 0;
		
		for(idx =0;idx < storeData.length;idx++ ){
			uploadItems.push(storeData.getAt(idx).data);
		}
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.set('workingStatus', WorkingStatus.INSERT);
		updateParm.set('userId', MOST.config.Token.getUserId());
		updateParm.set('items',uploadItems );

		myMask.show();
		updateParm.save({
			callback: function(record, operation, success) {
				// do something whether the save succeeded or failed
				myMask.hide();
				var responseObj = JSON.parse(operation.getResponse().responseText).response;

				if(responseObj.errorNumber == 412) {
					if(responseObj.errorDescription === "notExistVslCallId") {
						MessageUtil.warning('warning_msg', 'cargoLoadingListMsgValid01');
						for( index in responseObj.data ) {
							var row = responseObj.data[index];
							store.each(function(storeRecord) {
								if(storeRecord.get('vslCallId') === row.vslCallId) {
									var targetGridCol = grid.getColumns().find(col => col.dataIndex == 'vslCallId' );
									var targetHtmlCell = grid.view.getCell(storeRecord, targetGridCol); 
									var qtipMsg = ViewUtil.getLabel('cargoLoadingListMsgCellValid01');
									
									targetHtmlCell.setAttribute('data-qtip', qtipMsg);
									targetHtmlCell.bgColor = 'yellow'; 

									storeRecord.set("invalid" , true); // grid.getView().addRowCls( targetRecord , 'bg_red');
								}
							});
						}
					}else if(responseObj.errorDescription === "duplicateSN") {
						MessageUtil.warning('warning_msg', 'cargoLoadingListMsgValid02');
						for( index in responseObj.data ) {
							var row = responseObj.data[index];
							var targetRecord = store.findRecord( "id", row.id );
							var targetGridCol = grid.getColumns().find(col => col.dataIndex == 'shipgNoteNo' );
							var targetHtmlCell = grid.view.getCell(targetRecord, targetGridCol); 
							var qtipMsg = ViewUtil.getLabel('cargoLoadingListMsgCellValid02');
							
							targetHtmlCell.setAttribute('data-qtip', qtipMsg);
							targetHtmlCell.bgColor = 'yellow'; 

							targetRecord.set("invalid" , true); // grid.getView().addRowCls( targetRecord , 'bg_red');
						}
					}else if(responseObj.errorDescription === "notExistedPartner") {
						MessageUtil.warning('warning_msg', 'cargoLoadingListMsgValid03');
						for( id in responseObj.data[0] ) {
							var columnList = responseObj.data[0][id];
							var targetRecord = store.findRecord( "id", id );
							
							for( colName of columnList ) {
								var targetGridCol = grid.getColumns().find(col => col.dataIndex == colName );
								var targetHtmlCell = grid.view.getCell(targetRecord, targetGridCol); // var targets = Ext.fly(targetHtmlCell); 
								var qtipMsg = ViewUtil.getLabel('cargoLoadingListMsgCellValid03');
								
								targetHtmlCell.setAttribute('data-qtip', qtipMsg);
								targetHtmlCell.bgColor = 'yellow'; 
								targetRecord.set("invalid" , columnList); // grid.getView().addRowCls( targetRecord , 'bg_red');
							}
						}
					}else if(responseObj.errorDescription === "badCommodityHeredity") {
						MessageUtil.warning('warning_msg', 'cargoLoadingListMsgValid04');
						for( index in responseObj.data ) {
							var row = responseObj.data[index];
							var targetRecord = store.findRecord( "id", row.id );
							
							for( colName of ['cargoSubType', 'commodity', 'packageType'] ) {
								var targetGridCol = grid.getColumns().find(col => col.dataIndex == colName );
								var targetHtmlCell = grid.view.getCell(targetRecord, targetGridCol); // var targets = Ext.fly(targetHtmlCell); 
								var qtipMsg = ViewUtil.getLabel('cargoLoadingListMsgCellValid04');
								
								targetHtmlCell.setAttribute('data-qtip', qtipMsg);
								targetHtmlCell.bgColor = 'yellow'; 
								targetRecord.set("invalid" , ['cargoSubType', 'commodity', 'packageType']); // grid.getView().addRowCls( targetRecord , 'bg_red');
							}
						}
					} else if(responseObj.errorDescription === "brandModelError") {
						MessageUtil.warning('warning_msg', 'cargoLoadingListBrandModelWrnPopup');
						
						for( index in responseObj.data ) {
							var row = responseObj.data[index];
							var targetRecord = store.findRecord( "id", row.id );
							
							for( colName of ['vehicleBrand', 'vehicleModel'] ) {
								var targetGridCol = grid.getColumns().find(col => col.dataIndex == colName );
								var targetHtmlCell = grid.view.getCell(targetRecord, targetGridCol); // var targets = Ext.fly(targetHtmlCell); 
								var qtipMsg = ViewUtil.getLabel('cargoLoadingListBrandModelWrnMsg');
								
								targetHtmlCell.setAttribute('data-qtip', qtipMsg);
								targetHtmlCell.bgColor = 'yellow'; 
								targetRecord.set("invalid" , ['vehicleBrand', 'vehicleModel']); // grid.getView().addRowCls( targetRecord , 'bg_red');
							}
						}
						
					}else if(responseObj.errorDescription === "dataError") {
						MessageUtil.warning('warning_msg', 'cargoLoadingListMsgProcessingErroException');
					}
				} else {
					Ext.Msg.alert('Success', TSB.locale.i18n.Bundle.instance.getMsg('savesuccess_msg'));
					var window = me.getView().up('window');
					window.close();
				}
			}
		});
		
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

