Ext.define('MOST.view.operation.DamageCheckController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.damagecheck',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	DAMAGE_STORE_REF_NAME: 'refDamamageStore',  
	DAMAGE_STORE_NAME: 'theDamageStore',           
	FILE_UPLOAD_STORE_NAME :'uploadedFileDamageStore',
	FILE_UPLOAD_REF_NAME : 'refFileUpload',
	DEFAULT_MODEL : 'MOST.model.operation.DamageCheck',
	
	prevData:null,
	REG_NO: null,
	
	calledByAddUpdateRemoveDmg: false,
	selectDetail: false,
	grDoField: '', 
	firstLoad: false,
	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 * 
	 * 
	 * /**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function() {
		var me = this,
			refs = me.getReferences(),
			recvData = me.getView().recvData,
			parentView = me.getParentView(),
			damageStore  = me.getStore('damageStore');
			damageStore.removeAll();
			
			
			me.getViewModel().set('theUnitInfo', Ext.create('MOST.model.operation.DamageCheck'));
			me.getViewModel().set('theDmg', Ext.create('MOST.model.operation.DamageCheck'));
			
		if(recvData) {
			me.getViewModel().setData({
				theDmg : recvData.clone(),
			});
			var theDmg = me.getViewModel().get('theDmg');
			me.getComboBoxDamageCheck()
			if(theDmg.get('isOperationScreen')){
				refs.ctlTypeOfLocation.setDisabled(true)
				refs.ctlVslCallId.setDisabled(true)
				refs.ctlScn.setDisabled(true)
				refs.ctlCgNo.setDisabled(true)
				
				var blNo = theDmg.get('blNo')	
				var snNo = theDmg.get('shipgNoteNo')
				theDmg.set('pkgNo', '')
				if (theDmg.get('locCd') == 'VSL') {
					refs.refRadioVessel.setValue(true);
				} else if (theDmg.get('locCd') == 'YARD') {
					refs.refRadioYards.setValue(true);
				} else {
					refs.refRadioGate.setValue(true);
				}

				if(!StringUtil.isNullorEmpty(blNo)) {
					theDmg.set('blsnNo', blNo);
				}
				else if(StringUtil.isNullorEmpty(blNo)) {
					theDmg.set('blsnNo', snNo);
				}
			}
		} 
		else {
			var theDmg = Ext.create('MOST.model.operation.DamageCheck');
			me.getViewModel().setData({ theDmg });

			var theDmg = parentView.viewModel.get('theDmg')
			if (theDmg) {
				var vslCallId = theDmg.get('vslCallId')
				if (vslCallId) {
					me.getComboBoxDamageCheck()
				}
			}
		}
		
	},
	
	loadBasicData: function(masterItem) {
		var me = this;
		var refs = me.getReferences();
		var damageInfo = me.getViewModel().get('theDmg');
		damageInfo.set('callSeq', masterItem.items[0].callSeq);
		damageInfo.set('callYear', masterItem.items[0].callYear);
		damageInfo.set('vslCallId', masterItem.items[0].vslCallId);
		damageInfo.set('vslCd', masterItem.items[0].vslCd);
	},
	
	loadSavedStore: function(masterItem, regNo) {
		var me = this,
			refs = me.getReferences(),
			damageCheckDetailStore = me.getStore('damageCheckDetail'),
			uploadStore = me.getStore(me.FILE_UPLOAD_STORE_NAME)
			;
		damageCheckDetailStore.removeAll();
		uploadStore.removeAll();
		
		damageCheckDetailStore.setData(masterItem.items);
		damageCheckDetailStore.commitChanges();
		uploadStore.setData(masterItem.uploadItems);
		uploadStore.commitChanges();
	
	},

	setVinNos: function(masterItem) {
		var me = this;
		//me.getViewModel().set('theUnitInfo', theUnit);

		if(masterItem == null || masterItem.vinItem == null){
			return;
		}
		
		// Remove because of redudant code and cause defect system - By LamLong
		// var refs = me.getReferences();
		// var vinItem = masterItem.vinItem;
		// var theUnit = Ext.create('MOST.model.configuration.WhConfiguration');
		
		// theUnit.data = masterItem.vinItem;
		// me.getViewModel().set('theUnitInfo', theUnit);
		
		var theDmg	= me.getViewModel().get('theDmg');		
		var theInfoCargo = me.getViewModel().get('theInfoCargo');
		
		theDmg.set('dmgMt', theInfoCargo.docMt);
		theDmg.set('dmgM3', theInfoCargo.docM3);
		theDmg.set('dmgQty', theInfoCargo.docQty);
		
		if(theDmg.get('cgTpCd') == 'RCV'){	
			if(Number(theDmg.get('dmgQty')) == 0 && Number(theDmg.get('dmgMt')) == 0 && Number(theDmg.get('dmgM3')) == 0){
				theDmg.set('dmgQty', theDmg.get('pkgQty'));
				theDmg.set('dmgMt', theDmg.get('wgt'));
				theDmg.set('dmgM3', theDmg.get('msrmt'));
			}
		}
	},
	
	getComboBoxDamageCheck: function () {
		var me = this;
		var refs = me.getReferences();
		var theDamageLevelsStore = me.getStore('theDamageLevels');
		var theDamagePartsStore = me.getStore('theDamageParts');
		var theDamageDescStore = me.getStore('theDamageDesc');
		var blSnStore = me.getStore('snBlCombo');
		var theDmg = me.getViewModel().get('theDmg')
		
		var vslCallId = theDmg ? theDmg.get('vslCallId') : ''  

		if(StringUtil.isNullorEmpty(vslCallId)) return
		blSnStore.load({
			params:{
				vslCallId : vslCallId					
			},
			callback: function(records, operation, success) {
			}
		});

		// theDamageLevelsStore.load({
		// 	callback: function (records, operation, success) {
		// 		if (success) {
		// 			theDamageLevelsStore.insert(0, [{ invNm: 'Select', invCd: '' }]);
		// 		}
		// 	}
		// });

		// theDamagePartsStore.load({
		// 	callback: function (records, operation, success) {
		// 		if (success) {
		// 			theDamagePartsStore.insert(0, [{ invNm: 'Select', invCd: '' }]);
		// 		}
		// 	}
		// });
		theDamageDescStore.load();
	},
	
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	
	onAddFile_clickHandler : function() {
		var me = this,
			store = me.getStore(me.FILE_UPLOAD_STORE_NAME),
			theDmg = me.getViewModel().get('theDmg')
    		input = document.querySelector("input[id='fileUploadDamageCG-button-fileInputEl']");

    	for(var i=0; i<input.files.length; i++) {
    		var record = Ext.create('MOST.model.common.FileUpload');
    		var file = input.files[i];
    		record.set('pgmId', 'mpct239');
			record.set('catgCd', [theDmg.get('vslCallId'), theDmg.get('blsnNo')].join("/"));
    		record.set('fileStream', file);
    		record.set('fileName', file.name);
    		record.set('fileSize', file.size);
    		record.set('workingStatus', WorkingStatus.INSERT);
    		store.insert(0, record);
    	}
	},

	onUploadFile : function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.FILE_UPLOAD_STORE_NAME);
		var frm = refs.fileForm;
		var formData = new FormData(frm);
		var isFileUpload = false;
				
		store.getModifiedRecords().forEach(function(record, index, array){
			formData.append(record.data.fileName, record.data.fileStream);
			isFileUpload = true;
		});
		if(isFileUpload){
			this.fileUpload(formData);
		} else {
			me.saveProcess(); // SERVER SAVE
		}
	},
	
	//GET ufileName
	fileUpload : function(formData) {
		var me = this;
		var store = me.getStore(me.FILE_UPLOAD_STORE_NAME);
    	var xhr = new XMLHttpRequest();
    	
    	xhr.addEventListener('loadend', function() {
    		if(xhr.status === 200) {
    			var rtnData = JSON.parse(xhr.responseText); // get filename - uuid
    			
    			store.getModifiedRecords().forEach(function(record, index, array) {
    	    		record.set('ufileName', rtnData[record.get('fileName')]);
    	    	});
				me.saveProcess();
  
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

	onFileDownloadDblClick: function() {
		var me = this,
			grid = me.lookupReference(me.FILE_UPLOAD_REF_NAME),
			store = me.getStore('fileDownloadDamageStore'),	
			selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		store.load({
			params : {
				'pgmId' : 'DM001',
				'catgCd' : selection.get('catgCd'),
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
	
	onRemoveFile_clickHandler: function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.FILE_UPLOAD_STORE_NAME);
		var grid = me.lookupReference(me.FILE_UPLOAD_REF_NAME);
		
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		
		if(selection == null) {
			MessageUtil.warning('warning_msg', 'container_deleteRecordEmptyMsg');
			return;
		};

		MessageUtil.question('remove', 'infodelete_msg', null, function(button) {
			if (button === 'ok') {
				Ext.each(selection, function (record) {
					record.set('workingStatus', WorkingStatus.DELETE)
					store.remove(record);
				});
			}
		});
	},

	validationAddDamageCargo: function(){
    	var me = this,
			refs = me.getReferences(),
			dmgPart = refs.ctlTheDamagePart.getValue(),
			dmgLevel = refs.ctlTheDamageLevel.getValue(),
			cgNo = refs.ctlCgNo.getValue(),
			unitNo = refs.ctlUnitNo.getValue(),
			cargoInfo = me.getViewModel().get('theInfoCargo'),
			cgTpCd = cargoInfo.cgTpCd,
			msgTitle =  '<b>Please input the mandatory field(s):</b><br/>',
		    msgString = '';

		if(!cgNo){
			msgString = TSB.locale.i18n.Bundle.instance.getMsg('selectBlSn') + '<br/>';
		}

		if(cgTpCd && cgTpCd == 'RCV' && !unitNo){
			msgString += TSB.locale.i18n.Bundle.instance.getMsg('inputUnitNo') + '<br/>';
		}
		
		if(cgTpCd && cgTpCd == 'RCV' && dmgLevel == null){
			msgString += TSB.locale.i18n.Bundle.instance.getMsg('selectDamageLevel') + '<br/>';
		}

		if(cgTpCd && cgTpCd == 'RCV' && dmgPart == null){
			msgString += TSB.locale.i18n.Bundle.instance.getMsg('selectDamagePart') + '<br/>';
		}

		if(msgString){
			MessageUtil.alert('Warning', msgTitle + msgString);
			return false;
		}

		return true;
    },
	
	onAddDmg_clickHandler: function() {
		var me = this,
			refs = me.getReferences(),
			store = me.getStore('damageCheckDetail'),
			grid = me.lookupReference(me.DAMAGE_STORE_REF_NAME),
			record = Ext.create(me.DEFAULT_MODEL),
			detailItem = me.getViewModel().get('theDmg'),
			lorryNo = refs.ctlLorryNo.getValue(),
			doGrNo = refs.ctlDoGr.getValue(),
			dmgPart = refs.ctlTheDamagePart.getValue(),
			dmgLevel = refs.ctlTheDamageLevel.getValue(),
			dmgDesc = refs.ctlDamageDescription.getValue(),
			dmgRemark = refs.ctlDamageRemark.getValue(),
			cgNo = refs.ctlCgNo.getValue(),
			dmgQty = refs.ctlDmgAmtQty.getValue(),
			dmgMt = refs.ctlDmgAmtMT.getValue(),
			dmgM3 = refs.ctlDmgAmtM3.getValue(),
			locCd = refs.ctlTypeOfLocation.getValue().location_radio,
			unitNo = refs.ctlUnitNo.getValue(),
			brandCd = refs.ctlBrand.getValue(),
			modelCd = refs.ctlModel.getValue(),
			agentId = refs.ctlAgent.getValue(),
			stevedoreId = refs.ctlStevedore.getValue(),
			pkgNo = refs.ctlPkgNo.getValue(),
			currentTime = Ext.Date.format(new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()),
			checkedDt = Ext.Date.format(refs.ctlCheckTime.getValue(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()),
			checkTimeStr = checkedDt ? checkedDt : currentTime,
			cargoInfo = me.getViewModel().get('theInfoCargo'),
			theDmg = me.getViewModel().get('theDmg'),
			cgTpCd = '',
			docQty = docM3 = docMt = actualQty = actualMt = 0, 
			gridQty = Number(dmgQty),
			gridM3 = Number(dmgM3),
			gridMt = Number(dmgMt),
			listData = store.getModifiedRecords();

		if (cargoInfo) {
			cgTpCd = cargoInfo.cgTpCd,
			actualQty = cargoInfo.actualQty,
			docQty = cargoInfo.docQty,
			docM3 = cargoInfo.docMsrmt || cargoInfo.docM3,
			docMt = cargoInfo.docWgt || cargoInfo.docMt;
			actualMt = cargoInfo.actualMt;	
		}
		//Clear filter for Grid
		grid.filters.clearFilters();
		grid.filters.disable();

		if ((!dmgQty && !dmgMt && !dmgM3 ) || (dmgQty == 0 && dmgMt == 0 && dmgM3 == 0 )) {
			MessageUtil.warning('warning_msg', 'inputAmount');
			return;
		}
		
		// if (!lorryNo) {
		// 	MessageUtil.warning('warning_msg', 'selectLorryNo');
		// }
		
		// if (!doGrNo) {
		// 	MessageUtil.warning('warning_msg', 'selectDoGr');
		// }

		for (let i = 0; i < listData.length; i++) {
			const item = listData[i];
			if (locCd == item.get('locCd')) {
				gridQty += Number(item.get('dmgQty'));
				gridMt += Number(Number(item.get('dmgMt')).toFixed(3));
				gridM3 += Number(Number(item.get('dmgM3')).toFixed(3));
			}
		}

		
		if (cgTpCd == 'BBK' && Number(gridQty) == Number(docQty)) {
			gridMt = Number(docMt);
			gridM3 = Number(docM3);
		}

		if (cgTpCd != 'RCV' && (Number(gridQty) > Number(actualQty) || Number(gridMt) > Number(actualMt)) || Number(gridQty) > Number(docQty) || Number(gridMt) > Number(docMt)) {
            MessageUtil.warning('warning_msg', 'inputAmtLessThanDocAmt');
            return;
        }

		//Clear filter for Store
		store.clearFilter();
		if (!me.validationAddDamageCargo()) {
			return;
		} else {
			var idx = 0;
			var validate = true;

			if (grid.getSelection() && grid.getSelection().length > 0) {
				idx = store.indexOfId(grid.getSelection()[0].get('id'));
			}
			if (cgTpCd && cgTpCd == 'RCV' && (refs.ctlTheDamagePart.getValue() != null || refs.ctlTheDamageLevel.getValue() != null)) {
				record.set('dmgPartNm', refs.ctlTheDamagePart.displayTplData[0].invDesc);
				record.set('dmgLevelNm', refs.ctlTheDamageLevel.displayTplData[0].invDesc);
				record.set('dmgPart', dmgPart);
				record.set('dmgLevel', dmgLevel);
				store.getData().getRange().forEach(function (record, index, array) {
					if (dmgPart == record.data.dmgPart && dmgLevel == record.data.dmgLevel && locCd == record.data.locCd) {
						validate = false;
					}
				});
			}
			record.set('scn', theDmg.get('scn'));
			record.set('vslCd', theDmg.get('vslCd'));
			record.set('vslCallId', theDmg.get('vslCallId'));
			record.set('callSeq', theDmg.get('callSeq'));
			record.set('callYear', theDmg.get('callYear'));
			record.set('mfDocId', cargoInfo.mfDocId);
			record.set('dmgDesc', dmgDesc);
			var sltDamageDesc = refs.ctlDamageDescription.getSelection()
			if(sltDamageDesc){
				record.set('dmgDescNm', sltDamageDesc.get('cdNm'));
			}
			record.set('cgNo', cgNo);
			record.set('catgCd', theDmg.get('catgCd'));
			record.set('ixCd', theDmg.get('ixCd'));
			record.set('dmgQty', dmgQty);
			record.set('dmgMt', dmgMt);
			record.set('dmgM3', dmgM3);
			record.set('locCd', locCd);
			record.set('unitNo', unitNo);
			record.set('brandCd', brandCd);
			record.set('modelCd', modelCd);
			record.set('checkedDt', checkTimeStr);
			record.set('agentId', agentId);
			record.set('stevedoreId', stevedoreId);
			record.set('pkgNo', pkgNo);
			record.set('dmgRemark', dmgRemark)
			if(cargoInfo.catgCd == 'I') {
				record.set('doNo', doGrNo);
			}else {
				record.set('grNo', doGrNo);
			}
			record.set('lorryNo', lorryNo);
				
			record.set("workingStatus", WorkingStatus.INSERT);
			if (validate) {
				store.insert(idx, record);
				grid.getSelectionModel().select(record);
			} else {
				MessageUtil.warning('damageCheck', 'duplicatedata_msg');
			}
		}
		
	},
	
	onUpdateDmg_clickHandler: function() {
		var me = this,
			refs = me.getReferences(),
			store = me.getStore('damageCheckDetail'),
			grid = me.lookupReference(me.DAMAGE_STORE_REF_NAME),
			selection = grid.getSelection() == null ? null : grid.getSelection()[0],
			record = selection,
			dmgPart = refs.ctlTheDamagePart.getValue(),
			dmgLevel = refs.ctlTheDamageLevel.getValue(),
			dmgRemark = refs.ctlDamageRemark.getValue(),
			cgNo = refs.ctlCgNo.getValue(),
			dmgQty = refs.ctlDmgAmtQty.getValue(),
			dmgMt = refs.ctlDmgAmtMT.getValue(),
			dmgM3 = refs.ctlDmgAmtM3.getValue(),
			locCd = refs.ctlTypeOfLocation.getValue().location_radio,
			unitNo = refs.ctlUnitNo.getValue(),
			brandCd = refs.ctlBrand.getValue(),
			modelCd = refs.ctlModel.getValue(),
			currentTime = Ext.Date.format(new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()),
			checkedDt = Ext.Date.format(new Date(refs.ctlCheckTime.getValue()), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()),
			checkTimeStr = checkedDt ? checkedDt : currentTime,
			cargoInfo = me.getViewModel().get('theInfoCargo'),
			cgTpCd = '',
			docQty = docM3 = docMt = 0
			gridQty = Number(dmgQty),
			gridM3 = Number(dmgM3),
			gridMt = Number(dmgMt),
			selectionQty =  selectionM3 = selectionMt = '',
			listData = store.getModifiedRecords();

		if(selection === null || selection === undefined){
			MessageUtil.info('info_msg','spaceMovementPlan_WarnSelUpdRec');
			return;
		} else {
			selectionQty = selection.get('dmgQty');
			selectionM3 = selection.get('dmgM3');
			selectionMt = selection.get('dmgMt');
		}

		if (cargoInfo) {
			cgTpCd = cargoInfo.cgTpCd;
			docQty = cargoInfo.docQty,
			docM3 = cargoInfo.docMsrmt || cargoInfo.docM3,
			docMt = cargoInfo.docWgt || cargoInfo.docMt;
			actualQty = cargoInfo.actualQty;
			actualMt = cargoInfo.actualMt;
		}
		
		if(selection == null) {
			MessageUtil.warning('warning_msg', 'vslchecklist_select_update');
			return;
		}else{
			if ((!dmgQty && !dmgMt && !dmgM3 ) || (dmgQty == 0 && dmgMt == 0 && dmgM3 == 0 )) {
				MessageUtil.warning('warning_msg', 'inputAmount');
				return;
			}

			for (let i = 0; i < listData.length; i++) {
				const item = listData[i];
				if (locCd == item.get('locCd')) {
					gridQty += Number(item.get('dmgQty'));
					gridMt += Number(Number(item.get('dmgMt')).toFixed(3));
					gridM3 += Number(Number(item.get('dmgM3')).toFixed(3));
				}
			}
			gridQty = gridQty - selectionQty;
			gridM3 = gridM3 - selectionM3;
			gridMt = gridMt - selectionMt;

			// Change docQty to actualQty to make sure when update the quantity is not over actual quantity - by LamLong
			if (cgTpCd != 'RCV' && (Number(gridQty) > Number(actualQty) || Number(gridMt) > Number(actualMt))) {
				MessageUtil.warning('warning_msg', 'inputAmtLessThanDocAmt');
				return;
			}

			if(cgTpCd && cgTpCd == 'RCV' && (dmgPart == null || dmgLevel == null)) {
				MessageUtil.warning('warning_msg', 'missedValue');
				return;
			}
		}
		
		var validate = true;
		// store.getData().getRange().forEach(function (record, index, array) {
		// 	if (cgTpCd && cgTpCd == 'RCV' && (dmgPart == record.data.dmgPart && dmgLevel == record.data.dmgLevel)) {
		// 		validate = false;
		// 	}
		// });
		if (validate) {
			if(record.get('workingStatus') !== WorkingStatus.INSERT){
				record.set('workingStatus', WorkingStatus.UPDATE);
			}
			var sltDamagePart = refs.ctlTheDamagePart.getSelection()
			var sltDamageLevel = refs.ctlTheDamageLevel.getSelection()
			var sltDamageDesc = refs.ctlDamageDescription.getSelection()
			record.set('dmgPartNm', sltDamagePart ? sltDamagePart.get('invDesc') : '');
			record.set('dmgLevelNm', sltDamageLevel ? sltDamageLevel.get('invDesc') : '');
			record.set('dmgPart', sltDamagePart ? sltDamagePart.get('invCd') : '');
			record.set('dmgLevel', sltDamageLevel ? sltDamageLevel.get('invCd') : '');
			// record.set('dmgDesc', sltDamageDesc ? sltDamageDesc.get('cd') : record.get('dmgDesc'));
			// record.set('dmgDescNm', sltDamageDesc ? sltDamageDesc.get('cdNm') : '');
			record.set('dmgRemark', dmgRemark);
			record.set('cgNo', cgNo);
			record.set('dmgQty', dmgQty);
			record.set('dmgMt', dmgMt);
			record.set('dmgM3', dmgM3);
			record.set('locCd', locCd);
			record.set('unitNo', unitNo);
			record.set('brandCd', brandCd);
			record.set('modelCd', modelCd);
			record.set('checkedDt', checkTimeStr);
		} else {
			MessageUtil.warning('warning_msg', 'duplicatedata_msg');
		}

		// me.calledByAddUpdateRemoveDmg = true;
		// me.onClearDmg_clickHandler();
	},
	
	onRemoveDmg_clickHandler: function() {
		var me = this,
			refs = me.getReferences(),
			grid = me.lookupReference(me.DAMAGE_STORE_REF_NAME),
			store = me.getStore('damageCheckDetail'),
			selection = grid.getSelection() == null ? null : grid.getSelection();

		if (selection == null) {
			MessageUtil.warning('warning_msg', 'container_deleteRecordEmptyMsg');
			return;
		}

		MessageUtil.question('remove', 'infodelete_msg', null, function(button) {
			if (button === 'ok') {
				Ext.each(selection, function (record) {
					record.set('workingStatus', WorkingStatus.DELETE);
					store.remove(record);
				});
			}
		});
		
		// me.calledByAddUpdateRemoveDmg = true;
		// me.onClearDmg_clickHandler();
	},
	
	onClearDmg_clickHandler: function () {
		var me = this;
		var refs = me.getReferences();
		var selectBlSn = refs.ctlCgNo.getSelection();
		var cgTpCd = selectBlSn != null ? selectBlSn.get('cgTpCd') : null;
		var recvData = me.getView().recvData;

		// Ensure to keep BL/SN field value on Add Dmg because saveprocess function need this value - by LamLong
		if(!me.calledByAddUpdateRemoveDmg) {
			refs.ctlCgNo.setValue();
		}else {
			me.calledByAddUpdateRemoveDmg = false;
		}
		
		// Clear field for prevent error in getting data - by LamLong
		me.grDoField = null;
		recvData.data.lorryNo = null;
		
		refs.ctlTheDamagePart.setValue();
		refs.ctlTheDamageLevel.setValue();
		refs.ctlCheckTime.setValue();
		refs.ctlDamageDescription.setValue('OTH');
		
		refs.ctlDoGr.setValue();
		refs.ctlLorryNo.setValue();
		refs.refTxtCommodity.setValue();
		refs.refTxtCommodityGroup.setValue();
		
		refs.ctlDoGr.setDisabled(false);
		refs.ctlLorryNo.setDisabled(false);
		refs.ctlCgNo.setDisabled(false);

		if(!StringUtil.isNullorEmpty(cgTpCd) && cgTpCd !== 'RCV'){
			refs.ctlDmgAmtQty.setValue();
			refs.ctlDmgAmtMT.setValue();
			refs.ctlDmgAmtM3.setValue();
			refs.ctlUnitNo.setValue();
			refs.ctlBrand.setValue();
			refs.ctlModel.setValue();
		}

		// refs.ctlCgNo.setValue();
		refs.ctlDamageRemark.setValue();
	},

	onConfirm_clickHandler: function() {
		var  me = this
		,recvData = me.getView().recvData
		;

		if(recvData.data.isOperationScreen){
			me.onOprDetailConfirm()
		}else{
			me.onMainDetailConfirm()
		}
	},
	onOprDetailConfirm: function(){
		var me = this,
		damageCheckDetailStore = me.getStore('damageCheckDetail'),
		uploadStore = me.getStore(me.FILE_UPLOAD_STORE_NAME),
		damageChecks = new Array().concat(damageCheckDetailStore.getData().items.slice(), damageCheckDetailStore.removed),
		modifiedFileUploads = new Array().concat(uploadStore.getModifiedRecords(), uploadStore.removed),
		detailItem = me.getViewModel().get('theDmg')
		;

		returnValue = {
			modifiedFileUploads: [...modifiedFileUploads],
            damageChecks: [...damageChecks],
			theDmg: detailItem
        }
		damageCheckDetailStore.commitChanges()
		uploadStore.commitChanges()
        var win = me.getView().up('window');
        if (win) {
            win.returnValue = returnValue
            win.close();
        }	
	},
	onMainDetailConfirm: function(){
		var me = this,
			refs = me.getReferences(),
			store = me.getStore(me.FILE_UPLOAD_STORE_NAME),
			frm = refs.fileForm,
			formData = new FormData(frm),
			isFileUpload = false;
				
		store.getModifiedRecords().forEach(function(record, index, array){
			formData.append(record.data.fileName, record.data.fileStream);
			isFileUpload = true;
		});
		if(isFileUpload){
			this.fileUpload(formData);
		} else {
			me.saveProcess(); 
		}
	},

	saveProcess: function() {
		var me = this,
			refs = me.getReferences(),
			theDamageStore = me.getStore('theDamageStore'),
			currentUploadStore = me.getStore(me.FILE_UPLOAD_STORE_NAME),
			damageCheckDetailStore = me.getStore('damageCheckDetail'),
			detailItem = me.getViewModel().get('theDmg'),
			sendArray = new Array(),
			uploadList = new Array(),
			unit = me.getViewModel().get('theUnitInfo').data ? me.getViewModel().get('theUnitInfo').data : me.getViewModel().get('theUnitInfo');

		for(var i = 0; i< damageCheckDetailStore.data.length; i++){
			var record = damageCheckDetailStore.data.items[i];
			record.set('vslCallId', refs.ctlVslCallId.getValue());
			record.set('vslCd', unit.vslCd);	
			record.set('callYear', unit.callYear);
			record.set('callSeq', unit.callSeq);
			record.set('catgCd', refs.ctlCgNo.displayTplData[0].catgCd);
			record.set('userId', MOST.config.Token.getUserId());
			sendArray.push(record.data);
        };

		if(currentUploadStore.data.length > 0) {
			for(var i = 0; i < currentUploadStore.data.length; i++) {
				var uploadItem = currentUploadStore.data.items[i];
				var recordUpload = Ext.create('MOST.model.common.FileUpload');
				recordUpload.set('ufileName', uploadItem.get('ufileName'));
				recordUpload.set('pgmId', 'DM001');
				recordUpload.set('fileName', uploadItem.get('fileName'));
				recordUpload.set('fileSize', uploadItem.get('fileSize'));
				recordUpload.set('fileStream', null);
				recordUpload.set('userId', MOST.config.Token.getUserId());
				recordUpload.set('workingStatus', WorkingStatus.INSERT);
				uploadList.push(recordUpload.data);
			}
			
			// File Upload DELETE RECORD
			currentUploadStore.getRemovedRecords().forEach(function(record, index, array) {
				record.set('workingStatus', WorkingStatus.DELETE);
				uploadList.push(record.data);
			});
		}
		
		damageCheckDetailStore.getRemovedRecords().forEach(function(record, index, array){
			sendArray.push(record.data);
		});
		if(sendArray.length > 0){
			var proxy = detailItem.getProxy();
			proxy.url = theDamageStore.getProxy().url;
			detailItem.phantom = false;
			detailItem.set("items", sendArray);
			detailItem.set('uploadItems', uploadList);
			detailItem.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
			detailItem.save({
				success : function(records,success){
					MessageUtil.saveSuccess();	
					var win = me.getView().up('window');
					if (win) {
						win.close();
					}			
				}
			});
		}
		var parentView = me.getParentView();
					
		if(parentView.getController().onSearch) {
			parentView.getController().onSearch();
		}	
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue) {
		var me = this;
		var refs = me.getReferences();
		if(targetControl == 'ctlVslCallId') {
			if(returnValue){
				refs.ctlScn.setValue(returnValue.item.get('scn'));
				var vslCallId = refs.ctlVslCallId.getValue()
				
				if(StringUtil.isNullorEmpty(vslCallId)) return
				me.getComboBoxDamageCheck()
			}else {
				me.getViewModel().setData({theVslInfo:null});
			}
		}else if(targetControl === 'ctlScn'){ 
			if(returnValue){
				refs.ctlScn.setValue(returnValue.code);
				if(!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))){
					refs.ctlVslCallId.setValue(returnValue.item.get('vslCallId'));
					me.getViewModel().setData({theVslInfo:returnValue.item});
				}else {
					refs.ctlVslCallId.setValue('');
					me.getViewModel().setData({theVslInfo:null});
				}
			} 
		}else if (targetControl == 'ctlUnitNo')	{
			if(returnValue != null) {
				me.getViewModel().setData({ theUnitInfo: returnValue.item.data });
				refs.ctlDmgAmtQty.setReadOnly(true);
				refs.ctlDmgAmtMT.setReadOnly(true);
				refs.ctlDmgAmtM3.setReadOnly(true);
			}
		}
	},
	
	getSnBlCombo: function(returnValue) {
		var me = this,
			refs = me.getReferences(),
			store = me.getStore('snBlCombo'),
			vslCallId = refs.ctlVslCallId.getValue();			
		
		store.load({
			params:{
				vslCallId : vslCallId					
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records != null && records.length > 0) {
						store.insert(0, [{ cdNm: 'Select', cd: '' }]);
					}
				}
			}
		});
	},
	
	getDoGrCombo: function() {
		var me = this,
			refs = me.getReferences(),
			store = me.getStore('doGrCombo'),
			vslCallId = refs.ctlVslCallId.getValue(),
			blSn = refs.ctlCgNo.getValue(),
			damageInfo = me.getViewModel().get('theDmg');
		
		if(store.getCount() == 0) {
			store.load({
				params: {
					vslCallId: vslCallId,
					blSn: blSn || damageInfo.data.blsnNo
				},
				callback: function(records, operation, success) {
					if (success) {
						if(records != null && records.length > 0) {
							if(me.grDoField != '' && me.grDoField != null) {
								var grDo = me.grDoField;
								var filteredRecords = records.filter(record => grDo.includes(record.data.doGrCd));
								
								store.removeAll();
								store.insert(0, [{ doGrNm: 'Select', doGrCd: '' }]);
								store.add(filteredRecords);
							}else {
								store.insert(0, [{ doGrNm: 'Select', doGrCd: '' }]);
							}
							
							me.getLorryNoCombo();
						}
					}
				}
			})
		}
	},
	
	getLorryNoCombo: function() {
		var me = this,
			refs = me.getReferences(),
			store = me.getStore('lorryNoCombo'),
			vslCallId = refs.ctlVslCallId.getValue();
			blSn = refs.ctlCgNo.getValue();
			
		store.load({
			params: {
				vslCallId: vslCallId,
				blSn: blSn
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records != null && records.length > 0) {
						store.insert(0, [{ lorryNoNm: 'Select', lorryNoCd: '' }]);
					}
				}
			}
		})
	},

	onCheckLocChange: function() {
		var me = this,
			refs = me.getReferences(),
			store = me.getStore('infoBlSn'),
			vslCallId = refs.ctlVslCallId.getValue(),
			blsn = refs.ctlCgNo.getValue(),
			checkLoc  = refs.ctlTypeOfLocation.getValue().location_radio;
		if(refs.ctlCgNo.getValue()) {
			store.load({
				params:{
					vslCallId : vslCallId,
					blSn: blsn,
					locCd: checkLoc
				},
				callback: function(records, operation, success) {
					if (success) {
						if(records != null && records.length > 0) {
							me.getViewModel().set('theInfoCargo', records[0].data);
						}
					}
				}
			});
		}
	},

	clearStores: function() {
		var me = this,
			damageCheckDetailStore  = me.getStore('damageCheckDetail'),
			doGrStore = me.getStore('doGrCombo'),
			lorryNoStore = me.getStore('lorryNoCombo');
			
		if(doGrStore.getCount() > 0) {
			doGrStore.removeAll();
			lorryNoStore.removeAll();
		}
		
		damageCheckDetailStore.removeAll();
	},
	
	resetDamageInfo: function() {
		var me = this,
			refs = me.getReferences(),
			damageInfo = me.getViewModel().get('theDmg');
		
		damageInfo.data.blOrSn = null;
	  
		refs.refTxtCommodityGroup.setValue('');
		refs.refTxtCommodity.setValue('');
		refs.ctlDoGr.setValue('');
		refs.ctlLorryNo.setValue('');
		refs.ctlDmgAmtQty.setReadOnly(false);
		refs.ctlDmgAmtMT.setReadOnly(false);
		refs.ctlDmgAmtM3.setReadOnly(false);
		refs.ctlUnitPopup.setDisabled(true);
	},
	
	eventHandler: function() {
		var me = this,
			damageInfo = me.getViewModel().get('theDmg'),
			damageCheckDetailStore  = me.getStore('damageCheckDetail'),
			refs = me.getReferences(),
			grid = me.lookupReference(me.DAMAGE_STORE_REF_NAME),
			recvData = me.getView().recvData;
			
		// Check if grid store do not have value for not calling this event again - by LamLong
		// Function getInfoBlSn call here to get GR/DO cargo information (Qty, Mtm...)
		refs.ctlDoGr.on('change', function(field, newValue, oldValue) {
			if(newValue){
				me.getInfoBlSn();
			}
		});
			
		// Reset state on BL/SN field combo box change - by LamLong
		refs.ctlCgNo.on('change', function(field, newValue, oldValue) {
			if(newValue != oldValue) {
				if(!StringUtil.isNullorEmpty(newValue)) {
					if(recvData.data.lorryNo == null || recvData.data.lorryNo == '') {
						// Gathering data again when BL/SN changed
						me.getInfoBlSn();
						// me.getDoGrCombo();
					}else { 
						// Group similar operations together for better readability
						if(firstLoad) {
							firstLoad = false;
							me.getInfoBlSn();
							// me.getDoGrCombo();
						}else {
							me.clearStores();
							me.resetDamageInfo();
							me.getInfoBlSn();
							// me.getDoGrCombo();
						}
					}
				}else {
					me.calledByAddUpdateRemoveDmg = true;
					me.onClearDmg_clickHandler();
				}
			}
		});
	},

	onBlSnChange: function(a, newValue, c){
		var me = this
		;
		if(newValue){
			me.getInfoBlSn()
		}
	},
	
	getInfoBlSn: function(ctl, record, eOpts) {
		var me = this,
			refs = me.getReferences(),
			store = me.getStore('infoBlSn'),
			theDmg = me.getViewModel().get('theDmg'),
			vslCallId = refs.ctlVslCallId.getValue(),
			blsn = refs.ctlCgNo.getValue(),
			checkLoc  = refs.ctlTypeOfLocation.getValue().location_radio,
			damageCheckDetailStore  = me.getStore('damageCheckDetail'),
			uploadStore = me.getStore(me.FILE_UPLOAD_STORE_NAME),
			damageStore  = me.getStore('damageStore'),
			pkgNoCombo  = me.getStore('pkgNoCombo')
			;
		uploadStore.removeAll();		
		damageCheckDetailStore.removeAll();

		if(!vslCallId || !blsn){
			return;
		}

		if(theDmg.get('catgCd') === 'I') {
			theDmg.set('ixCd', 'I');
		}
		else if(theDmg.get('catgCd') === 'E') {
			theDmg.set('ixCd', 'X');
		}
		store.load({
			params:{
				vslCallId : vslCallId,
				blSn: blsn,
				catgCd: theDmg.get('catgCd'),
				locCd: checkLoc,
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records != null && records.length > 0) {
						me.getViewModel().set('theInfoCargo', records[0].data);
						refs.refTxtCommodityGroup.setValue(records[0].data.cmdtGrpNm);
						refs.refTxtCommodity.setValue(records[0].data.cmdtNm);

						if (records[0].data.cgTpCd == 'BBK') {
							refs.ctlDmgAmtMT.setReadOnly(true);
							refs.ctlDmgAmtM3.setReadOnly(true);
						}else if (records[0].data.cgTpCd == 'DBN'){
							refs.ctlDmgAmtQty.setReadOnly(true);
							refs.ctlDmgAmtM3.setReadOnly(true);
						}
					}
				}
			}
		});

		damageStore.load({
			params:{
				vslCallId : vslCallId,
				cgNo: blsn,
				pgmId: 'mpct239',
				catgCd: [vslCallId, blsn].join("/")
			},
			callback: function (records, operation, success) {
				if (success) {
					if(records.length > 0) {
						me.loadSavedStore(records[0].data);
					}
				}
			}
		});

		pkgNoCombo.load({
			params:{
				vslCallId : vslCallId,
				blNo: theDmg.get('blNo'),
				shipgNoteNo: theDmg.get('shipgNoteNo')
			},
			callback: function (records, operation, success) {
				if (success) {
					pkgNoCombo.insert(0, { pkgNo: 'Select', pkgNo: '' });
				}
			}
		});
	},

	onChangeDamageAmt: function() {
		var me = this,
			refs = me.getReferences(),
			cargoInfo = me.getViewModel().get('theInfoCargo'),
			store = me.getStore('damageCheckDetail'),
			listData = store.data.items;
			mt = m3 = gridQty = gridMt = gridM3 = 0,
			qty = refs.ctlDmgAmtQty.getValue();

		if (cargoInfo && cargoInfo.cgTpCd == 'BBK') {
			var eachM3 = cargoInfo.eachM3,
				eachMt = cargoInfo.eachMt;
				docQty = cargoInfo.docQty;
				docMt = cargoInfo.docMt;
				docM3 = cargoInfo.docM3;

			if (listData.length > 0) {
				for (let i = 0; i < listData.length; i++) {
					const item = listData[i];
					gridQty += Number(item.get('dmgQty'));
					gridMt += Number(Number(item.get('dmgMt')).toFixed(3));
					gridM3 += Number(Number(item.get('dmgM3')).toFixed(3));
				}

				if (Number(gridQty) + Number(qty) == Number(docQty)) {
					mt = Number(docMt - gridMt).toFixed(3);
					m3 = Number(docM3 - gridM3).toFixed(3);
				} else {
					mt = Number((qty * eachMt).toFixed(3));
					m3 = Number((qty * eachM3).toFixed(3));
				}
			} else {
				if (qty == cargoInfo.docQty) {
					mt = docMt;
					m3 = docM3;
				} else {
					mt = Number((qty * eachMt).toFixed(3));
					m3 = Number((qty * eachM3).toFixed(3));
				}
			}

			refs.ctlDmgAmtMT.setValue(mt);
			refs.ctlDmgAmtM3.setValue(m3);
		}
		
	},

	openUnitNoPopupDamage: function () {
		var me = this,
			refs = me.getReferences(),
			searchParm = Ext.create(me.DEFAULT_MODEL);
			
		searchParm.data.vslCallId = refs.ctlVslCallId.getValue();
		me.openCodePopup('popup-findunitnopopup', 'ctlUnitNo', searchParm);
	},
	
	onDamageDetailGridClick: function() {
		var me = this,
			refs = me.getReferences(),
			grid = me.lookupReference(me.DAMAGE_STORE_REF_NAME),
			selection = grid.getSelection() == null ? null : grid.getSelection()[0];
			theDmg = me.getViewModel().get('theDmg')
		if(selection == null) return;
			refs.ctlTheDamagePart.setValue(selection.data.dmgPart);
			refs.ctlTheDamageLevel.setValue(selection.data.dmgLevel);
			refs.ctlDamageDescription.setValue(selection.data.dmgDesc);
			refs.ctlDmgAmtQty.setValue(selection.data.dmgQty);
			refs.ctlDmgAmtMT.setValue(selection.data.dmgMt);
			refs.ctlDmgAmtM3.setValue(selection.data.dmgM3);
			refs.ctlCheckTime.setValue(selection.data.checkedDt);
			refs.ctlUnitNo.setValue(selection.data.unitNo);
			refs.ctlBrand.setValue(selection.data.brandCd);
			refs.ctlModel.setValue(selection.data.modelCd);
		if (selection.data.locCd == 'VSL') {
			refs.refRadioVessel.setValue(true);
		} else if (selection.data.locCd == 'YARD') {
			refs.refRadioYards.setValue(true);
		} else {
			refs.refRadioGate.setValue(true);
		}
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
	
});