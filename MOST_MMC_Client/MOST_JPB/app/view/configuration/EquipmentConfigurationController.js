Ext.define('MOST.view.configuration.EquipmentConfigurationController', {
	extend: 'MOST.view.foundation.BaseViewController',
	
	alias: 'controller.equipment',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	
		MAIN_GRID_REF_NAME: 'refequipmentGrid',  // Main Grid Name 
		MAIN_STORE_NAME: 'equipmentGridList',            // Main Store Name
		
		DETAIL_GRID_FILEUPLOAD_NAME: 'refEquipmentDetailUploadGrid',  // Main Grid Name 
		DETAIL_STORE_FILEUPLOAD_NAME: 'equipmentDetailUpload',            // Main Store Name
		
		PARAMETTER_CHECK_COMBOBOX_STORE: 'equipmentUsedYn',
		
		isClickDupCheck: false,
		isDupCheck: false,
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
		
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */	
	onLoad: function() {
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create('MOST.model.configuration.SearchEquipmentConfigurationParm');
		var equipmentTypeCombo = me.getStore('equipmentTypeCombo');
		var equipmentLocationCombo = me.getStore('equipmentLocationCombo');
		var equipmentManufactCombo = me.getStore('equipmentManufactCombo');
		
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch:searchParm});
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.YES_NO, me.PARAMETTER_CHECK_COMBOBOX_STORE);
		
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		equipmentTypeCombo.load();
		equipmentManufactCombo.load();
		equipmentLocationCombo.load();
	},
	
	// Detail Load
	onDetailLoad: function() {
		var me = this;
		var detailView = me.getDetailBizView();
		var infoForm = detailView.down('form').getForm();
		
		infoForm.isValid();
		
		me.setDetailInitialize();
		
		me.updateViewStyle(me.getDetailBizView());
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
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var params = me.getSearchCondition();
		
		if(params == null) {
			return;
		}
		
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if(success) {
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					}
				}
			}
		});
		
	},
	
	//Detail Add
	onGridAdd: function() {
		var me = this;
		me.openDetailPopup(null);
	},
	
	onDetailCreate:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		
		detailView.items.get(0).recvData = null;
		me.onDetailLoad();

	},
	
	// Grid Row Remove
	onGridRemove: function(isDetailClose) {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selections = grid.getSelection() == null ? null: grid.getSelection();
		var deleteItem = selections[0].copy();
		
		MessageUtil.question('remove', 'infodelete_msg', null, function(button) {
			if (button === 'ok') {
				me.deleteProcess(deleteItem, selections,isDetailClose );
			}
		});
	},
	
	onDetailRemove: function() {
		var me = this;

		me.onGridRemove(true);
	},
	
	onDblClick: function() {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		me.openDetailPopup(selection, null, false);
	},
	
	onExportExcelPdfWithServer: function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.configuration.SearchEquipmentConfigurationParm';
		searchBizParm.serviceID = 'MOST.equipmentConfiguration.selectEquipmentList'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
	
	onCapaCdChange: function(val, cell) {
		var me = this;
		var refs = me.getReferences();
		var codeComboStore = null;
		var displayFieldName = 'capaDesc';
		var codeFieldName = 'capaCd';
		
		if(cell.column.dataIndex === 'capaCd'){ 
			codeComboStore = me.getViewModel().getStore('equipmentCapaCombo');
		}

		if(codeComboStore != null){
			var indx = -1;
			
			if(cell.column.dataIndex === 'capaCd'){
				indx = codeComboStore.find(codeFieldName, val);
			} else {
				indx = codeComboStore.find(codeFieldName, val);
			}				

			if (indx != -1){
				return codeComboStore.getAt(indx).get(displayFieldName); 
			}
		}
		
		return '';
	},
	
	onEquipmentDetailFileUploadGridRemove: function() {
		var me = this;
		var grid = me.lookupReference(me.DETAIL_GRID_FILEUPLOAD_NAME);
		var store = me.getStore(me.DETAIL_STORE_FILEUPLOAD_NAME);		
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		
		if(selection == null) return;
		
		Ext.each(selection, function (record) {
			record.set('workingStatus', WorkingStatus.DELETE);
			store.remove(record);
		});
	},
	
	onFileDownloadDblClick: function() {
		var me = this;
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var grid = me.lookupReference(me.DETAIL_GRID_FILEUPLOAD_NAME);
		var store = me.getStore("equipmentDetailDownload");	
		
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;

		store.load({
			params : {
				'pgmId' : FileConstant.EQUIPMENT_SCREEN_PGM_ID,
				'catgCd' : recvData.get('eqFacNo'),
				'ufileNm' : selection.get('ufileName')
			},
			callback: function(records, operation, success) {
				if (success) {
					var content = records[0].data.content.replace(/&lt;/gi,'<').replace(/&gt;/gi,'>');
		        	Ext.exporter.File.saveBinaryAs(content, records[0].data.fileName);
				}
			}
		})
		
	},
	
	onDetailSave: function() {
		var me = this;
		var control = me.lookupReference(Ext.String.format('ctl_ownDivCd'));
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theDetail');
		var refs = me.getReferences();
		
		if(detailItem.crudState == 'C'){
			if(me.isClickDupCheck == false){
				MessageUtil.warning('warning_msg', 'equipment_input_dup_check_msg');
				me.isClickDupCheck = false;
				return;
			}
			
			if(me.isDupCheck == false){
				MessageUtil.warning('warning_msg', 'equipment_duplicate_eqfaccd_msg');
				me.isClickDupCheck = false;
				return;
			}
		}
		
		if(detailView){
			var infoForm = detailView.down('form').getForm();
			
			if(infoForm.isValid()){
				if(detailItem.get('eqTpCd') === 'CR') {
					me.isOverCraneLimitPerBerth().then(function(check) {
						if(check) {
							me.saveProcess();
						} else {
							refs.ctlEqLocDetail.setValue(null);
							refs.refWharfMarkFrom.setValue(null);
							refs.refWharfMarkTo.setValue(null);
							refs.ctlEqLocDetail.focus(true);
							MessageUtil.warning('warning_msg', 'equipmentOverCraneLimitPerBerthMsg');
						}
					})
				} else {
					me.saveProcess();
				}
			} else {
				MessageUtil.mandatoryFieldInValid();
			}
		}
	},
	
	onChangeCapaListCombo: function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('equipmentCapaDetailCombo');
		var eqTpCd = refs.ctlEqTpDetail.getValue();
		var params = {
			eqTpCd: eqTpCd
		}

		if(eqTpCd === 'FLX' || eqTpCd === 'MLA') {
			refs.ctlDiameter.setDisabled(false);
			refs.ctlSafetyPressureLimit.setDisabled(false);
		}else{
			refs.ctlDiameter.setDisabled(true);
			refs.ctlSafetyPressureLimit.setDisabled(true);
		}
		refs.ctlDiameter.setValue();
		refs.ctlSafetyPressureLimit.setValue();

		store.load({
			params: params,
			callback: function(records, operation, success) {
				if(success) {
				}
			}
		});

		me.enableWharfContainer();
	},
	
	enableWharfContainer: function () {
		var me = this;
		var refs = me.getReferences();
		var isDisabled = refs.ctlEqTpDetail.getValue() != 'CR' || refs.ctlStopRsnCd.getValue() != 'MA';
		var disabledRef = ['refWharfMarkFrom', 'refWharfMarkTo', 'refPeriodStDt', 'refPeriodEdDt'];

		disabledRef.forEach(function (ref) {
			refs[ref].setDisabled(isDisabled);
		});
	},
	
	//Duplication Check
	onCheckDuplicationEqCd: function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('checkDupliEqFacCd');
		var detailItem = me.getViewModel().get('theDetail');
		var eqFacNo = refs.ctlEqFacCdDetail.getValue();
		
		me.isClickDupCheck = true;
		
		if(eqFacNo != ''){
			var params = {
				eqFacNo: detailItem.get('eqFacNo'),
			}
			store.load({
				params: params,
				callback: function(records, operation, success) {
					if(success) {
						if(records.length > 0 && records[0].data) {
							MessageUtil.error('warning_msg', 'equipment_duplicate_eqfaccd_msg');
							refs.ctlEqFacCdDetail.focus(true);
							me.isDupCheck = false;
							return false;
						}else{
							MessageUtil.warning('warning_msg', 'equipment_use_eqfaccd_msg');
							me.isDupCheck = true;
							return true;
						}
					}
				}
			});
		}else{
			MessageUtil.warning('warning_msg', 'equipment_input_eqfaccd_msg');
			return true;
		}
	},
	
	onAddForFileUpload: function(btn, fileField) {
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		var store = me.getStore(me.DETAIL_STORE_FILEUPLOAD_NAME);
    	var input = document.querySelector("input[id='equipmentDetailFileUpload-button-fileInputEl']");

    	for(var i=0; i<input.files.length; i++){
    		var record = Ext.create('MOST.model.common.FileUpload');
    		file = input.files[i];
    		
    		record.set('pgmId', FileConstant.EQUIPMENT_SCREEN_PGM_ID);
    		record.set('catgCd', detailItem.get('eqFacNo'));
    		record.set('fileStream', file);
    		record.set('fileName', file.name);
    		record.set('fileSize', file.size);
    		record.set('workingStatus', WorkingStatus.INSERT);
    		store.insert(0, record);
    	}
	},
	
	onUploadEquipment : function() {
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var store = me.getStore(me.DETAIL_STORE_FILEUPLOAD_NAME);
		var frm = refs.fileForm;
    	var isFileUpload = false;
    	
		if(detailView){
			var infoForm = detailView.down('form').getForm();
			
			if(infoForm.isValid()){
				var formData = new FormData(frm);
				
				store.getModifiedRecords().forEach(function(record, index, array){
					formData.append(record.data.fileName, record.data.fileStream);
					isFileUpload = true;
		    	});
				
				if(isFileUpload){
					this.fileUpload(formData);
				} else {
					me.submitEquipmentProcess(); // SERVER SAVE
				}
			} else {
				MessageUtil.mandatoryFieldInValid();
			}
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

	getSearchCondition: function() {
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		
		var params = me.createParam(searchParm);
		
		params['eqTpCd'] = StringUtil.toUpperCase(searchParm.data.eqTpCd);
        params['loc'] = StringUtil.toUpperCase(searchParm.data.loc);
		params['mkrCd'] = StringUtil.toUpperCase(searchParm.data.mkrCd);
		params['useYN'] = StringUtil.toUpperCase(searchParm.data.useYN);
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
		
		return params;
	},
	
	// Detail Initialize
	setDetailInitialize: function() {
		var me = this;
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		
		if(recvData === undefined) {
			recvData = Ext.create('MOST.model.configuration.EquipmentConfiguration');
			recvData.set('ownDivCd', 'I');
		}
		
		this.setDetailControl(recvData);
	},

	// Detail Control Setting
	setDetailControl:function(record){
		var me = this;
		var refs = me.getReferences();
		var fileUpload = me.getStore(me.DETAIL_STORE_FILEUPLOAD_NAME);
		
		var equipmentTypeDetailCombo = me.getStore('equipmentTypeDetailCombo');
		var equipmentLocDetailCombo = me.getStore('equipmentLocDetailCombo');
		var equipmentMkrDetailCombo = me.getStore('equipmentMkrDetailCombo');
		var equipmentStatDetailCombo = me.getStore('equipmentStatDetailCombo');
		var equipmentStopRsnCdDetailCombo = me.getStore('equipmentStopRsnCdDetailCombo');
		
		equipmentTypeDetailCombo.load();
		equipmentLocDetailCombo.load();
		equipmentMkrDetailCombo.load();
		equipmentStatDetailCombo.load();
		equipmentStopRsnCdDetailCombo.load();
		
		me.getViewModel().setData({theDetail:record});
		
		fileUpload.load({
			params: {
				pgmId: FileConstant.EQUIPMENT_SCREEN_PGM_ID,
				catgCd: record.get('eqFacNo')
			},
			callback: function(records, operation, success) {
				if(success) {
				}
			}
		});
		
		// Key Control Enable/Disable
		if(record.phantom){
			refs.ctlEqFacCdDetail.setEditable(true);
		} else {
			refs.ctlEqFacCdDetail.setEditable(false);
		}
	},
	
	fileUpload : function(formData){
		var me = this;
		var store = me.getStore(me.DETAIL_STORE_FILEUPLOAD_NAME);
    	var xhr = new XMLHttpRequest();
    	
    	xhr.addEventListener('loadend', function(){
    		if(xhr.status === 200){
    			var rtnData = JSON.parse(xhr.responseText);
    			
    			store.getModifiedRecords().forEach(function(record, index, array){
    	    		record.set('ufileName', rtnData[record.get('fileName')]);
    	    	});
  
    			me.submitEquipmentProcess();
    		}else{
    			MessageUtil.warning('warning_msg', 'fail_msg');
    		}
    		
    		Ext.MessageBox.hide();
    	});
    	
    	xhr.open('POST',MOST.config.Locale.getRestApiDestUrl() + '/file/manage/fileupload');
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
	
	submitEquipmentProcess:function(){
		var me = this;
		var uploadItems = new Array();
		var detailView = me.getDetailBizView();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var detailItem = me.getViewModel().get('theDetail');
		var fileUploadStore = me.getStore(me.DETAIL_STORE_FILEUPLOAD_NAME);
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		var isCreated = detailItem.phantom;
		
		if (detailItem == null) {
			return;
		}
		
		// File Upload CREATE, UPDATE RECORD
		fileUploadStore.getModifiedRecords().forEach(function(record, index, array){
			record.set('fileStream', null);
			record.set('userId', MOST.config.Token.getUserId());
			record.set('workingStatus', WorkingStatus.INSERT);
			uploadItems.push(record.data);
		});
		
		// File Upload DELETE RECORD
		fileUploadStore.getRemovedRecords().forEach(function(record, index, array){
			record.set('workingStatus', WorkingStatus.DELETE);
			uploadItems.push(record.data);
		});
		
		detailItem.set('uploadItems', uploadItems);
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = isCreated;
		updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		updateParm.set('userId', MOST.config.Token.getUserId());
		updateParm.set('item', detailItem.data);
		
		updateParm.save({
			success: function(record) {
				fileUploadStore.commitChanges();
				
				detailItem.set('version', record.get('newVersion'));
				detailItem.commit();
				
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
						function(button){
							if (button === 'ok') {
								me.onSearch();
								var win = Ext.WindowManager.getActive();
								
								if (win) {
								    win.close();
								}
							}else{
								me.onSearch();
								var win = Ext.WindowManager.getActive();
								if (win) {
								    win.close();
								}
							}
					});
			}
		});
	},
	
	// Server Save Process
	saveProcess:function(){
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var detailItem = me.getViewModel().get('theDetail');
		var detailView = me.getDetailBizView();
		var isCreated = detailItem.phantom;
		
		detailItem.set('userId', MOST.config.Token.getUserId());
		
		var proxy = detailItem.getProxy();
		proxy.url = store.getProxy().url;
		
		detailItem.set('divCd', 'EQ');
		
		me.onUploadEquipment();
	},
	
	deleteProcess:function(deleteItem, selections, isDetailClose) {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var fileUploadStore = me.getStore(me.DETAIL_STORE_FILEUPLOAD_NAME);	
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		// File Upload DELETE RECORD
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = false;
		updateParm.drop();
		updateParm.set('workingStatus', WorkingStatus.DELETE);
		updateParm.set('items', new Array());
		
		selections.forEach(function (item) {
			updateParm.get('items').push(item.data);
		});
		
		updateParm.save({
			success : function(record, operation) {
				selections.forEach(function (item) {
					item.commit();
					store.remove(item);
				});
				
				updateParm.set('workingStatus', WorkingStatus.DELETE);
				updateParm.commit();
				
				store.commitChanges();

				MessageUtil.saveSuccess();
				
				if (isDetailClose) {
					var detailView = me.getDetailBizView();
					
					if (detailView) {
						detailView.close();
					}
				}
				
				me.onSearch();
			}
		});
	},
	
	onSelectBerthLocation: function (combobox) {
		var me = this;
		var refs = me.getReferences();
		var minWharfMark = combobox.getSelection().get('pstSta');
		var maxWharfMark = combobox.getSelection().get('pstEnd');

		refs.refWharfMarkFrom.setValue(minWharfMark);
		refs.refWharfMarkFrom.setMinValue(minWharfMark);
		
		refs.refWharfMarkTo.setValue(maxWharfMark);
		refs.refWharfMarkTo.setMaxValue(maxWharfMark);
	},
	
	isOverCraneLimitPerBerth: function () {
		var me = this;
		var refs = me.getReferences();
		var berthLoc = refs.ctlEqLocDetail.getSelection();
		var theDetail = me.getViewModel().get('theDetail');

		if(theDetail.get('eqTpCd') !== "CR" || berthLoc == null) {
			return;
		}

		var validationCodeStore = me.getStore('isOverCraneLimitPerBerth');
		var params = {
			tyCd: 'cranesInBerth',
			col1: berthLoc.get('locId'),
			col2: theDetail.get('eqFacNo'),
		};

		return new Promise(function (resolve, reject) { 
			validationCodeStore.load({
				params: params,
				callback: function (records, operation, success) {
					if (success && records.length > 0) {
						if (records[0].get("isValidated") === "Y") {
							resolve(true);
						} else {
							resolve(false);
						}
					} else {
						reject(operation);
					}
				}
			})

		})
	}, 

	onWharfMarkFocusLeave: function () {
		var me = this;
		var refs = me.getReferences();
		var wharfMarkFrom = refs.refWharfMarkFrom.getValue();
		var wharfMarkTo = refs.refWharfMarkTo.getValue();
	
		var minWharfMark = refs.refWharfMarkFrom.minValue;
		var maxWharfMark = refs.refWharfMarkTo.maxValue;
	
		if (
			wharfMarkFrom < minWharfMark || wharfMarkFrom > maxWharfMark ||
			wharfMarkTo < minWharfMark || wharfMarkTo > maxWharfMark
		) {
			refs.refWharfMarkFrom.setValue(minWharfMark);
			refs.refWharfMarkTo.setValue(maxWharfMark);
			var msg = `Value should be between ${minWharfMark} and ${maxWharfMark}`;
			MessageUtil.warning('warning_msg', msg);
			return; 
		}
	
		if (wharfMarkFrom >= wharfMarkTo) {
			MessageUtil.warning('warning_msg', 'invalid_equipment_wharfmark_msg');
		}
	},

	checkFromToPeriod: function (field) {
		var me = this;
		var refs = me.getReferences();
		var periodSt = refs.refPeriodStDt.getValue();
		var periodEd = refs.refPeriodEdDt.getValue();
	
		if (periodSt && periodEd && periodSt > periodEd) {
			MessageUtil.warning('warning_msg', 'invalid_equipment_period_msg');
			field.setValue(null);
			field.focus(true);
			return;
		}
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});