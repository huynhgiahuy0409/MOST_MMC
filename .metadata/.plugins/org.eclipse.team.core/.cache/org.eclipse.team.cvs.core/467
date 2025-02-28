Ext.define('MOST.view.planning.DGlistController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [

	],

	alias: 'controller.dglist',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAX_PERIOD_DAY : 31,	// MAX PERIOD DATE
	MAX_DATE_ALLOW : 90,
	FORWARDER : "FWD",				
	SHIPPING_AGENCY : "SHA",
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
		
		me.setDateInDays('ctlFromDt', -30);
		me.setDateInDays("ctlToDt", 0);
	},
	
	onDateChange:function( control, newValue, oldValue, eOpts ) {
		var me = this;
		var refs = me.getReferences();
		
		 if (control == refs.ctlDateFromDt) {
	         validateDate = me.validatePeriodDate(newValue, refs.ctlDateToDt.getValue(), me.MAX_DATE_ALLOW);
	         if (!validateDate) {
	             me.setDateInDaysByDate('ctlDateToDt', me.MAX_DATE_ALLOW, control.getValue());
	         }
	     } else {
	         validateDate = me.validatePeriodDate(refs.ctlDateFromDt.getValue(), newValue, me.MAX_DATE_ALLOW);
	         if (!validateDate) {
	             me.setDateInDaysByDate('ctlDateFromDt', -me.MAX_DATE_ALLOW, control.getValue());
	         }
	     }
	},
	
   validatePeriodDate: function (fromDate, toDate, maxDatePeriod) {
        var me = this;

        if(fromDate == null || toDate == null){
            return true;
        }

        if (!DateUtil.validateFromToDate(fromDate, toDate)) {
            return false;
        } else if (!DateUtil.validatePeriodDate(fromDate, toDate, maxDatePeriod)) {
            return false;
        }

        return true;
    },
	
	onRefresh : function(controlName){
		var me = this;
		me.refreshControl(controlName);
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
    	var store = me.getStore('dgList');
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params
		});
	},
	
	// Grid Row Double
	onDblClick: function() {
		var me = this;
		var grid = me.lookupReference('refDgListGrid');

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		me.openDetailPopup(selection);
	},
	
		
	// JPVC OPEN POPUP
	openJpvcPopup:function(){
		var me = this;
		me.openCodePopup('popup-vesselfindpopup', 'ctlJpvc');
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
     	var reqDtFrom = refs.ctlFromDt.getValue();
     	var reqDtTo = refs.ctlToDt.getValue();
     	
     	if(refs.ctlFromDt.getValue() != null && refs.ctlToDt.getValue() != null){
            dateCondition = me.checkPeriodDate("ctlFromDt", "ctlToDt", me.MAX_DATE_ALLOW, true);
            reqDtFrom = dateCondition.fromDtString;
            reqDtTo = dateCondition.toDtString;
          }
     	
    	if(dateCondition == null){
    		return null;
    	}
    	
     	var jpvcNo = refs.ctlJpvc.getValue();
     	var statCd = refs.ctlStatus.getValue();
     	var dgDiv = refs.ctlDgCategory.getValue();
     	var bl = refs.ctlBl.getValue();
     	var sn = refs.ctlSn.getValue();
     	var dgDivSub = '';
     	var ptnrCd = MOST.config.Token.getPtnrCode();
     	var authority = '';
     	
     	if(MOST.config.Token.getUserType() === CONSTANTS.USER_TYPE_EXTERNAL){
     		if(me.existsPatnerType(me.SHIPPING_AGENCY) || 
     			(me.existsPatnerType(me.SHIPPING_AGENCY) && me.existsPatnerType(me.FORWARDER))){
     			
     			if (me.existsPatnerType(me.SHIPPING_AGENCY)
			 			&& me.existsPatnerType(me.FORWARDER)) {
							authority = "BH";
						}
					else if(me.existsPatnerType(me.SHIPPING_AGENCY))
						authority = "SHA";
     		}else if (me.existsPatnerType(me.FORWARDER)){
     			authority = "FWD";
     		}else if (me.existsPatnerType(CONSTANTS.PTNR_TYPE_SHIPPER_CONSIGNEE)) {
				authority = "CNS";
			}
		}else if(MOST.config.Token.getUserType() === CONSTANTS.USER_TYPE_INTERNAL){
			
			if(me.existsPatnerType(CONSTANTS.PTNR_TYPE_CSC_SUPERVISOR)){
				authority = "BH";
			}
		}
        
    	
    	if(dgDiv == 'TS'){
    		dgDivSub = 'SS';
    	}else if(dgDiv=='SS'){
			dgDiv ='TS';
			dgDivSub ='LQ';
		}
     	
     	var params = {
			searchType : 'dgList',
			dgDiv: dgDiv,
			dgDivSub : dgDivSub,
			vslCallId : jpvcNo,
			dclrDtFrom : reqDtFrom,
			dclrDtTo : reqDtTo,
			statCd : statCd,
			bl: bl,
			sn: sn,
    		ptnrCd : ptnrCd,
    		authority : authority
     	};
     	
    	return params;
	},
	
	onSubmit: function(){
		var me = this;
		var dgItem = me.getViewModel().get('theDG');
		dgItem.set('dgChk', 'N');
		var detailView = me.getDetailBizView();
		var dgForm = detailView.down('form').getForm();
		
		if(dgForm.isValid()){
			me.saveDGProcess();
		}
	},
	
	onDetailSave: function(){
		var me = this;
		var dgItem = me.getViewModel().get('theDG');
		var detailView = me.getDetailBizView();
		var dgForm = detailView.down('form').getForm();
		
		if(dgForm.isValid()){
			me.saveDGProcess();
		} else {
			MessageUtil.warning('warning_msg', 'mandatoryForm_msg');
		}
	},
	
	saveDGProcess:function(){
		var me = this;
		var uploadItems = new Array();
        var fileUploadStore = me.getStore('dgUpload');
		
		var dgItem =  me.getViewModel().get('theDG');

 		fileUploadStore.getModifiedRecords().forEach(function(record, index, array){
 			record.set('userId', MOST.config.Token.getUserId());
			uploadItems.push(record.data);
		});
		// File Upload DELETE RECORD
		fileUploadStore.getRemovedRecords().forEach(function(record, index, array){
			uploadItems.push(record.data);
		});
	
		dgItem.data.uploadItems = uploadItems;
		
		me.onUploadDG();
	},
	
	saveProcess: function(detailItem){
		var me = this;
		var detailView = me.getDetailBizView();
		var store = me.getStore('dgList');
		var dgItem =  me.getViewModel().get('theDG');
		var proxy = dgItem.getProxy();
		var isCreated = dgItem.phantom;
		
		dgItem.set('userId', MOST.config.Token.getUserId());
		
		var uploadItems = dgItem.data.uploadItems;
		var newRecord = dgItem.clone();
		var newRecord1 = Ext.create('MOST.model.planning.DGList');
		newRecord.id = newRecord1.id;
		newRecord.phantom = isCreated;
		
		newRecord.set("userId", MOST.config.Token.getUserId());
		newRecord.set('uploadItems', uploadItems);
		
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = true;
		updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		updateParm.set('userId', MOST.config.Token.getUserId());
		updateParm.set('items', new Array());
		updateParm.get('items').push(newRecord.data);

		updateParm.save({
			success: function(record) {
				store.commitChanges();
				MessageUtil.saveSuccess();
				detailView.close();
			}
		});	
		
	},
	
	
	
	onClose: function(){
		var me = this;
		var dgView = me.getDetailBizView();
		dgView.close();;
	},
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * DETAIL START
	 */
	// Detail Load
	onDetailLoad:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var substanceCombo = me.getViewModel().getStore('substanceCombo');
		var dgDetail = me.getStore('dgDetail');
		
		dgDetail.load({
			params: {
				unno : recvData.data.unno,
				imdg : recvData.data.imdg,
				cgNo : recvData.data.cgNo,
				vslCd : recvData.data.vslCd,
				callSeq : recvData.data.callSeq,
				callYear : recvData.data.callYear,
				catgCd : recvData.get('vslCallId') + "|" +recvData.get('cgNo'),
				pgmId : 'PN119',
				seq : recvData.data.dgSeq
			},
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						
						records[0].set("arrvSaId",recvData.get("shipgAgncy"));
						records[0].set("vslNm",recvData.get("vslNm"));
						if(recvData.get('dgDiv') == 'IM' || 
								recvData.get('dgDiv') == 'DS'){
                        	records[0].set('catgCd', 'IM');
                        }else if(recvData.get('dgDiv') == 'EX' || 
                        		recvData.get('dgDiv') == 'LD' || 
                        		recvData.get('dgDiv') == 'EX'){
                        	records[0].set('catgCd', 'EX');
                        }else if(recvData.get('dgDiv') == 'TS' || 
                        		recvData.get('dgDiv') == 'TS'){
                        	records[0].set('catgCd', 'TRANSHIPMENT');
                        }else if(recvData.get('dgDiv') == 'ST' || 
                        		recvData.get('dgDiv') == 'ST'){
                        	records[0].set('catgCd', 'ST');
                        }
						
						me.setDetailFileUploadControl(records[0].data);
						me.getViewModel().setData({theDG: records[0]});
						
					}else{
						me.getViewModel().setData({theDG:recvData});
					}
					substanceCombo.load({
						params: {
							unno : me.getViewModel().get('theDG').get("unno"),
							imdg : me.getViewModel().get('theDG').get("imdg")
						}
					});
					
					if(recvData.get('dgChk') == 'Save' || recvData.get('dgChk') == 'Submit')
						refs.btnSubmit.show();
					else if(recvData.get('dgChk') == 'Confirm'){
						refs.btnSubmit.hide();
						refs.refAddRemove.hide();
						refs.refLblCondition.show();
						refs.refCondition.show();
						me.visibleDetailToolButton(ViewUtil.TOOL_SAVE, false);
					} 
				}
			}
		});
	},
	
	setDetailFileUploadControl: function(masterItem) {
		var me = this;
		var fileUpload = me.getStore('dgUpload');
		
		fileUpload.setData(masterItem.uploadItems);
		fileUpload.commitChanges();
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		var substanceCombo = me.getViewModel().getStore('substanceCombo');
		if(targetControl == 'ctlImdg'){ 
			if(returnValue){
				refs.ctlUnno.setValue(returnValue.code);
				refs.ctlImdg.setValue(returnValue.codeName);
				refs.ctlProperShippingNm.clearValue();
				substanceCombo.load({
					params: {
						unno : returnValue.code,
						imdg : returnValue.codeName
					}
				});
			}
		}else if(targetControl == 'ctlPkg'){ 
			if(returnValue){
				refs.ctlPkgNm.setValue(returnValue.codeName);
			}
		}
	},
	
	onAddForFileUpload: function(btn, fileField) {
		var me = this;
		var recvData = me.getViewModel().get('theDG');
		var store = me.getStore('dgUpload');
    	var input = document.querySelector("input[id='dgListFileUpload-button-fileInputEl']");
    	for(var i=0; i<input.files.length; i++){
    		var record = Ext.create('MOST.model.common.FileUpload');
    		file = input.files[i];
    		
    		record.set('pgmId', 'PN119');
    		record.set('catgCd', recvData.get('vslCallId') + "|" +recvData.get('cgNo'));
    		/*if(screenMode === me.CALL_LOCATION_VESSEL_INTERNAL || screenMode === me.CALL_LOCATION_VESSEL_EXTERNAL){
    			record.set('catgCd', recvData.get('refNo'));
         	}else{
         		record.set('catgCd', recvData.get('vslCallId') + "|" +recvData.get('cgNo'));
         	}*/
    		record.set('fileStream', file);
    		record.set('fileName', file.name);
    		record.set('fileSize', file.size);
    		record.set('workingStatus', WorkingStatus.INSERT);
    		store.insert(0, record);
    	}
	},
	
	onDgFileUploadGridRemove: function() {
		var me = this;
		var grid = me.lookupReference('refDGUploadGrid');
		var store = me.getStore('dgUpload');		
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		
		document.querySelector("input[id='dgListFileUpload-button-fileInputEl']").value = '';
		var input = document.querySelector("input[id='dgListFileUpload-button-fileInputEl']");
		if(selection == null) return;
		
		Ext.each(selection, function (record) {
			record.set('workingStatus', WorkingStatus.DELETE);
			store.remove(record);
		});
	},
	
	onFileDownloadDblClick: function() {
		var me = this;
		var recvData = me.getViewModel().get('theDG');
		var grid = me.lookupReference('refDGUploadGrid');
		var store = me.getStore('dgDownload');
		var pgmId;
		var catgCd;

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		catgCd =  recvData.get('vslCallId') + "|" +recvData.get('cgNo');
		
//		if(screenMode === me.CALL_LOCATION_VESSEL_INTERNAL  || screenMode === me.CALL_LOCATION_VESSEL_EXTERNAL){
//			catgCd =  recvData.get('refNo');
//     	}else{
//     		catgCd =  recvData.get('vslCallId') + "|" +recvData.get('cgNo');
//     	}
		var msgBox = Ext.MessageBox.show({
			msg: 'Progressing...',
			progressText: 'Progressing...',
			width:300,
			wait:true,
			waitConfig: {interval:200}
		});
		
		store.load({
			params : {
				'pgmId' : 'PN119',
				'catgCd' : catgCd,
				'ufileNm' : selection.get('ufileName')
			},
			callback: function(records, operation, success) {
				if (success) {
					var content = records[0].data.content.replace(/&lt;/gi,'<').replace(/&gt;/gi,'>');
		        	Ext.exporter.File.saveBinaryAs(content, records[0].data.fileName);
		        	Ext.MessageBox.hide();
		        	window.close();
				}
			}
		})
	},
	
	onSelectSubstance: function(combo, value, obj){
		var me = this;
		var refs = me.getReferences();
		refs.ctlJpaGroup.setValue(combo.selection.get('imdgDiv'));
	},
	
	onUploadDG:function() {
    	var me = this;
    	var detailItem = me.getViewModel().get('theDG');
		var refs = me.getReferences();
		var frm = refs.fileForm;
    	var isFileUpload = false;
		
		var formData = new FormData(frm);
		
		if(detailItem.get('uploadItems') != null){
			detailItem.get('uploadItems').forEach(function(record, index, array){
				if(record.workingStatus != 'D'){
					formData.append(record.fileName, record.fileStream);
					isFileUpload = true;
				}
			});
		}
		
		if(isFileUpload){
			this.dgFileUpload( formData);
		} else {
			me.saveProcess(); // SERVER SAVE
		}
	},
	
	dgFileUpload : function(formData){
		var me = this;
    	var xhr = new XMLHttpRequest();
    	var detailItem = me.getViewModel().get('theDG');
    	
    	xhr.addEventListener('loadend', function(){
    		if(xhr.status === 200){
    			var rtnData = JSON.parse(xhr.responseText); // get filename - uuid
    			
				detailItem.get('uploadItems').forEach(function(record, index, array){
					if(record.workingStatus != 'D'){
						record.ufileName = rtnData[record.fileName];
					    record.fileStream =  null;
					}
					
				});
    			
    			me.saveProcess(detailItem); // SERVER SAVE
    		}else{
    			MessageUtil.warning('warning_msg', 'fail_msg');
    		}
    		
    		Ext.MessageBox.hide();
    	});
    	
    	xhr.open('POST', MOST.config.Locale.getRestApiDestUrl() + '/file/manage/fileupload');
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
	
	onDetailPreview:function(){
		var me = this;
		var refs = me.getReferences();
		var dgItem = me.getViewModel().get('theDG');
		
		var pdfExportStore = me.getStore('pdfExport');
		var params ={
				seq: dgItem.get('refNo'),
				searchType: 'dgReport',
				userId: MOST.config.Token.getUserId()
		};
		
		var msgBox = Ext.MessageBox.show({
			msg: 'Progressing...',
			progressText: 'Progressing...',
			width:300,
			wait:true,
			waitConfig: {interval:200}
		});
		
		pdfExportStore.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					Ext.MessageBox.hide();
					window.close();
					me.openPDFPreview (records, operation, success);
				}
			}
		})
	},
	
	onDetailDownload:function(){
		var me = this;
		var refs = me.getReferences();
		
		var params = {
				initSearch: true
			};
		me.openCodePopup('popup-exporttypepopup','refBtnDownload', params);
	},
	
	onDownloadCancel:function(ownWin){
		var me = this;
		var winAlias = "popupAliaspopup-exporttypepopup";
		var win = me.lookupReference(winAlias);

		win.close();

	},
	
	onDownloadExport:function(addString){
		var me = this;
		var refs = me.getReferences();
		
		var dgItem = me.getViewModel().get('theDG');
		
		var pdfExportStore = me.getStore('pdfExport');
		var params ={
				seq: dgItem.get('refNo'),
				searchType: 'dgReport',
				userId: MOST.config.Token.getUserId(),
				exportTp: refs.refRadioReportType.getValue().rb
		};
		
		var msgBox = Ext.MessageBox.show({
			msg: 'Progressing...',
			progressText: 'Progressing...',
			width:300,
			wait:true,
			waitConfig: {interval:200}
		});
		
		pdfExportStore.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					var content = records[0].data.content.replace(/&lt;/gi,'<').replace(/&gt;/gi,'>');
					Ext.exporter.File.saveBinaryAs(content, records[0].data.fileName);
					Ext.MessageBox.hide();
					window.close();
				}
			}
		})
	},
	
	exportTo: function(btn) {
    	var me = this;
    	var refs = me.getReferences();
    	
        var cfg = Ext.merge({
            title: 'DG_List',
            fileName: 'DG_List' + '.' + (btn.cfg.ext || btn.cfg.type)
        }, btn.cfg);

        var grid = refs.refDgListGrid;
        grid.saveDocumentAs(cfg);
    },
	/**
	 * DETAIL END
	 * =========================================================================================================================
	 */
	
});