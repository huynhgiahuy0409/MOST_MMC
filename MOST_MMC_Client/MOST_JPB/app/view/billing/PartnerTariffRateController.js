Ext.define('MOST.view.billing.PartnerTariffRateController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	
	],

	alias: 'controller.partnertariffrates',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAX_PERIOD_DAY : 93,
	tempValue: '',
	
	MAIN_GRID_REF_NAME: 'refPartnerTariffRateGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'partnertariffrateList',        // Main Store Name
	
	DETAIL_GRID_REF_NAME: 'refPartnerTariffRateDetailGrid',  // Detail Grid Name 
	DETAIL_STORE_NAME: 'partnerTariffRateDetailGrid',        // Detail Store Name
	
	FILE_GRID_REF_NAME : 'refPartnerTariffFileUploadGrid', // File Grid Name
	FILE_UPLOAD_STORE_NAME : 'partnerTariffFileUpload', // File Store Name
	FILE_DOWNLOAD_STORE_NAME : 'partnerTariffFileDownload', // File Store Name
	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();		
		var searchParm = Ext.create('MOST.model.billing.SearchPartnerTariffRateParm');

		// set Default value 
		searchParm.set({
			exprYmd: new Date()
		});
		
		var searchTariffCodeCombo = me.getStore('tariffCodeComboType');
		
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		me.updateViewStyle(me.getView());
		
		searchParm.set('progress', 'N');
		
		searchTariffCodeCombo.load();
	},
	
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore(me.MAIN_STORE_NAME);
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}

		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
				}
			}
		});
	},
	
	onDblClick: function() {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var item = grid.getSelection()[0];
		var selection = grid.getSelection() === null ? null : grid.getSelection()[0];
		
		if(selection === null) {
			return;
		}
		
		me.openDetailPopup(selection);
	},
	
	onAdd:function(){
		var me = this;
		var refs = me.getReferences();
		
		me.openDetailPopup(null);
	},
	
	//openPartnerTariffDetail: function (gridpanel, record, item, e) {
	openPartnerTariffDetail: function(grid , td , cellIndex , record , tr , rowIndex , e , eOpts) {
		var me = this;
		var refs = me.getReferences();
		var headers = grid.getHeaderCt().getGridColumns();
		var item = grid.getSelection()[0];
		
		if(headers[cellIndex] && headers[cellIndex].dataIndex !== 'ptnrPrc') {
			var me =  this;
			var refs = me.getReferences();
			var grid = me.lookupReference('refPartnerTariffRateDetailGrid');
			
			var selection = grid.getSelection() === null ? null : grid.getSelection()[0];
			
			if(!selection){
				return;
			}
			
			me.getView().detailViewAlias = 'app-tariffcodesdetail';

			selection.set('searchTp','TRF_DTL');
			selection.set('openDtl', 'Y');
			
			me.openDetailPopup(selection, 'Partner Tariff Rates Detail');
		}
	},

	onEdit : function(editor, context){
		var me = this;
	},

	onBlur: function(){
		var me = this;
		var dateCondition = me.checkFromToDate('ctlPeDateFromDt', 'ctlPeDateToDt');
		
    	if(dateCondition == null){
    		return null;
    	}
	},
	
	onClear:function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.DETAIL_STORE_NAME);
		
		refs.refTrCd.setValue('');
		refs.refDesc.setValue('');
		refs.refPartnerRate.setValue('');
		refs.refRate.value = '';
		refs.btnFindTariff.setDisabled(false);

		me.getViewModel().set('selectedRecord', Ext.create('MOST.model.billing.PartnerTariffRate'));
		store.removeAll();
	},
	
	onClearButton:function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.DETAIL_STORE_NAME);
		
		refs.refTrCd.setValue('');
		refs.refDesc.setValue('');
		refs.refPartnerRate.setValue('');
		refs.refRate.value = '';
		refs.btnFindTariff.setDisabled(false);

		me.getViewModel().set('selectedRecord', Ext.create('MOST.model.billing.PartnerTariffRate'));
//		store.removeAll();
	},

	onFileGridAdd: function(btn, fileField) {
		var me = this;
		var theCurrentDetail = me.getViewModel().get('theCurrentDetail');
		var selectedRecord = me.getViewModel().get('selectedRecord');
		var store = me.getStore(me.FILE_UPLOAD_STORE_NAME);
    	var input = document.querySelector("input[id='partnerTariffFileUpload-button-fileInputEl']");
		var keyId = "_" + theCurrentDetail.get('ptnrCd');
		 
//		if(theCurrentDetail.get('ptnrCd') === "" || theCurrentDetail.get('ptnrCd') === undefined 
//				|| selectedRecord.get('trfCd') === "" || selectedRecord.get('trfCd') === undefined){
//			MessageUtil.mandatoryFieldInValid();
//			return null;
//		}
		
    	for(var i=0; i<input.files.length; i++){
    		var record = Ext.create('MOST.model.common.FileUpload');
    		
    		file = input.files[i];
    		
    		record.set('pgmId', FileConstant.PARTNER_TARIFF_SCREEN_PGM_ID);
    		record.set('catgCd', keyId);
    		record.set('fileStream', file);
    		record.set('fileName', file.name);
    		record.set('fileSize', file.size);
    		record.set('workingStatus', WorkingStatus.INSERT);
    		store.insert(0, record);
    	}
	},
	
	onRemoveForFileUpload: function() {
		var me = this;
		var grid = me.lookupReference(me.FILE_GRID_REF_NAME);
		var store = me.getStore(me.FILE_UPLOAD_STORE_NAME);		
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		
		if(selection == null) {
			return;
		}
		
		Ext.each(selection, function (record) {
			record.set('workingStatus', WorkingStatus.DELETE);
			store.remove(record);
		});
	},
	
	onFileDownloadDblClick: function() {
		var me = this;
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theCurrentDetail');
		var grid = me.lookupReference(me.FILE_GRID_REF_NAME);
		var store = me.getStore(me.FILE_DOWNLOAD_STORE_NAME);	
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) {
			return;
		}
		
		if(detailItem.get('ptnrCd') === "" || detailItem.get('trfCd') === ""){
			MessageUtil.mandatoryFieldInValid();
			return null;
		}
			
		var keyId = detailItem.get('pkgTrfNo') + "_" + detailItem.get('ptnrCd');
		
		store.load({
			params : {
				'pgmId' : FileConstant.PARTNER_TARIFF_SCREEN_PGM_ID,
				'catgCd' : keyId,
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
	
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	onDetailLoad:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() === null ? null : grid.getSelection();
		var theCurrentDetail = me.getViewModel().get('theCurrentDetail');
		
		var recvData = detailView.items.get(0).recvData;
		var invoiceUnit1Combo = me.getStore('invoiceUnit1Combo');
		var invoiceUnit2Combo = me.getStore('invoiceUnit2Combo');
		var invoiceUnit3Combo = me.getStore('invoiceUnit3Combo');
		var gstTypeCombo = me.getStore('gstTypeCombo');
		var freshwaterServiceCombo = me.getStore('freshwaterServiceCombo');
		var tariffConditionList = me.getStore('tariffConditionList');
		var tradeTypeListCombo = me.getStore('tradeTypeListCombo');
		var dockageTypeListCombo = me.getStore('dockageTypeListCombo');
		var equipmentTypeListCombo = me.getStore('equipmentTypeListCombo');
		var equipmentCapaListCombo = me.getStore('equipmentCapaListCombo');
		var searchTp = 'TRF_DTL';
		var berthList = me.getStore('berthListStore');
		var fileUpload= me.getStore(me.FILE_UPLOAD_STORE_NAME);

		refs.refAplDateField.suspendEvents();
		refs.refExpDateField.suspendEvents();
		
		me.onFieldsetDisabled(refs.fieldSetCargo, true);
		me.onFieldsetDisabled(refs.fieldSetVsl, true);
		
		if(recvData != null && recvData != ''){
			var filekeyId = selection.at(0).get('pkgTrfNo') +"_"+ recvData.get('ptnrCd');
			
			recvData.set('tiewVal1Cargo', '');
			recvData.set('tierVal2Cargo', '');
			recvData.set('cargoString', '');
			recvData.set('commodityString', '');
			recvData.set('tierVal1Vsl', '');
			recvData.set('tierVal2Vsl', '');
		}
		
		me.onClear();
		
		berthList.load({
			callback:function(records,success){
				if(success){
					
				}
			}
		});
		
		fileUpload.load({
			params: {
				pgmId: FileConstant.PARTNER_TARIFF_SCREEN_PGM_ID,
				catgCd: filekeyId
			},
			callback: function(records, operation, success) {}
		})
		
		if(me.getViewModel().getData().tariffDetail != undefined){
			me.getViewModel().getData().tariffDetail = recvData.data;
		}
		
		if(recvData){
			refs.refAplDateField.setValue(recvData.get('aplyYmd'));
			refs.refExpDateField.rawValue = recvData.get('exprYmd');
			
			me.getViewModel().setData({theCurrentDetail:recvData});
			me.setDetailInitialize();
		}else{
			recvData = Ext.create('MOST.model.administrator.User');
			me.getViewModel().setData({theCurrentDetail:recvData});
		}
	},
	
	onDetailPartnerLoad:function(){
		var me  = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var infoForm = detailView.down('form').getForm();
		var recvData = detailView.items.get(0).recvData;
		infoForm.isValid(); // Mandatory to appear red for.

		if(recvData.data.workingStatus === 'C' || recvData.data.workingStatus === 'U'){
			refs.btnFindTariff.setDisabled(false);
		}else{
			refs.btnFindTariff.setDisabled(true);
		}
		me.setDetailInitialize();
		
		recvData.dirty = false;
	},
	
	setDetailInitialize: function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var detailItem = me.getStore('partnertariffratedetailList');
		var berthStore = me.getStore('berthListStore');
		
		detailItem.removeAll();
		detailItem.commitChanges();
		
		berthStore.load({
			params: null,
			callback: function(records, ope, success){
				if(success){
				}
			}
		});
		
		if(recvData.data.workingStatus === 'C'){
			var detailgridStore = me.getStore("partnerTariffRateDetailGrid");
			var refs = me.getReferences();
			
			detailgridStore.removeAll();
			detailgridStore.commitChanges();
			me.getViewModel().setData({theCurrentDetail:recvData});		
			
			me.onFieldsetDisabled(refs.fieldSetVsl, true);
			me.onFieldsetDisabled(refs.fieldSetCargo, true);
		}else{
			detailItem.load({
				params:{
					trfTp:recvData.data.trfTpCd,
					trfCd: recvData.data.trfCd,
					pkgTrfNo: recvData.data.pkgTrfNo,
					ptnrCd: recvData.data.ptnrCd,
					subTrfCd: recvData.data.subTrfCd,		
				},
				callback: function(records, operation,success){
					if(success){
						me.setDetailControlTab(records[0]);
					}
				}
			});
		}
	},
	
	setDetailControlTab: function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var headStore = me.getStore("partnerTariffRateCurrentDetail");
		var detailgridStore = me.getStore("partnerTariffRateDetailGrid");
		var detailHeadlItem = new Ext.create('MOST.model.billing.PartnerTariffRate');
		var headItem = new Ext.create('MOST.model.billing.PartnerTariffRate');
		var detailList = masterItem.get("pkgRate");
		var detailItem = masterItem.data;
		var pkgSum = masterItem.get('pkgSum')[0];
		var detailCond = masterItem.get('cond');
		
		if(!masterItem.phantom){
			var deliveryStr = '';
			var berthString = '';
			var formVsl = '', formCargo = '';
			var toVsl = '', toCargo = '';
			var cargoType = '', commodity = '';
			var CheckLOA = false;

			headItem.phantom = false;
			headStore.removeAll();
			detailgridStore.removeAll();
			detailgridStore.setData(detailList);
			headItem.data = detailItem;
			me.getViewModel().setData({theCurrentDetail:headItem});
			headStore.insert(0, headItem);
			headStore.commitChanges();
			detailgridStore.commitChanges();
			
			appDate = headItem.data.aplyYmd;
			expDate = headItem.data.exprYmd;
			
			refs.refAplDateField.setValue(appDate);
			refs.refExpDateField.setValue(expDate);
			
			Ext.Array.forEach(detailCond, function(item){
				if (item.prptCd === 'C3'){
					if(deliveryStr === ''){
						if(item.chrVal === null || item.chrVal === 'null')
							deliveryStr += '';
						else {deliveryStr += item.chrVal;}	
					} else{
						deliveryStr += ',' + item.chrVal;
					}
				}
				
				if(item.prptCd === 'PC2'){
					if(commodity === ''){
						if(item.chrVal === null || item.chrVal === 'null'){
							commodity += '';
						} else {
							commodity += item.chrVal;
						}
					} else {
						commodity += ',' + item.chrVal;
					}
				}
				
				if(item.prptCd === 'PC1'){
					if(cargoType === ''){
						if(item.chrVal === null || item.chrVal === 'null'){
							cargoType += '';
						} else {
							cargoType += item.chrVal;
						}	
					} else {
						cargoType += ',' + item.chrVal;
					}
				}
				//Vessel Code
				if (item.prptCd === 'P2'){
					berthString = item.chrVal;
				}
				
				//Vessel Fieldset
				if (item.prptCd === 'PV1'){
					formVsl = item.tierVal1;
					toVsl = item.tierVal2;
					CheckLOA = true;
					
					if(formVsl == null) {
						formVsl = '';
					}
					
					if(toVsl == null) {
						toVsl = '';
					}
				}
				
				if (item.prptCd === 'PV2'){
					formVsl = item.tierVal1;
					toVsl = item.tierVal2;
					CheckLOA = false;
					
					if(formVsl == null) {
						formVsl = '';
					}
					
					if(toVsl == null) {
						toVsl = '';
					}
				}
				
				if (item.prptCd === 'PC3'){
					formCargo = item.tierVal1;
					toCargo = item.tierVal2;
					
					if(formCargo == null) {
						formCargo = '';
					}
					
					if(toCargo == null) {
						toCargo = '';
					}
				}
			});
	
			//Berth No
			var refberthNo = refs.refBerthNo;
			
			refberthNo.setValue(berthString);
			
			if(headItem.data.ckLOA == 1){
				refs.refLOA.setValue(true);
			}else{
				refs.refDWT.setValue(true);
			}
			
			var checkedCrgo = refs.chbCargo.checked;
			var checkedVsl = refs.chbVsl.checked;
	
			if(formVsl !== '' || toVsl !==''){
				me.onFieldsetDisabled(refs.fieldSetVsl, false);
				Ext.getCmp('cbVsl').setValue(true);
			}else{
				me.onFieldsetDisabled(refs.fieldSetVsl, true);
				Ext.getCmp('cbVsl').setValue(false);
			}
			if(toCargo !== '' || formCargo !== '' || cargoType !== '' || commodity !== '' ){
				me.onFieldsetDisabled(refs.fieldSetCargo, false);
				Ext.getCmp('cbCargo').setValue(true);
			}else{
				me.onFieldsetDisabled(refs.fieldSetCargo, true);
				Ext.getCmp('cbCargo').setValue(false);
			}	
		}
	},
	
	setComboStore:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var berthCombo = me.getStore('berthComboStore');
		var berthItems = masterItem.berthList;
		
		berthCombo.setData(berthItems);	
	},
	
	
	onCellClick:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refPartnerTariffRateDetailGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var selectedRecord = me.getViewModel().get('selectedRecord');
		
		if(selection == null) {
			return;
		}
		
		selectedRecord.set('trfCd', selection.data.trfCd);
		selectedRecord.set('descr', selection.data.descr);
		selectedRecord.set('unitPrc', selection.data.unitPrc);

		refs.btnFindTariff.setDisabled(true);
	},
	
	onPartnerRateChange: function(e, newValue, oldValue, eOpts){
		var me = this;
		var refs = me.getReferences();
		
		refs.refPartnerRate.setValue(newValue);
	},

	onCheckedChangeVsl: function(){
		var me = this;
		var refs = me.getReferences();
		var checkedVsl = refs.chbVsl.checked;
		var theCurrentDetail = me.getViewModel().get('theCurrentDetail');

		if( checkedVsl === false){
			me.onFieldsetDisabled(refs.fieldSetVsl, true);
			
			theCurrentDetail.set('tierVal1Vsl', '');
			theCurrentDetail.set('tierVal2Vsl', '');
		}else{
			me.onFieldsetDisabled(refs.fieldSetVsl, false);
		}
	},
	
	onCheckedChangeCargo: function(){
		var me = this;
		var refs = me.getReferences();
		var checkedCrgo = refs.chbCargo.checked;

		if(checkedCrgo === false){
			me.onFieldsetDisabled(refs.fieldSetCargo, true);
			
			refs.refFromCargo.setValue('');
			refs.refToCargo.setValue('');
			refs.refcargoType.setValue('');
			refs.refComdt.setValue('');
		}else{
			me.onFieldsetDisabled(refs.fieldSetCargo, false);
		}
	},
	
	onDetailSave:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var refs = me.getReferences();
		
		if(detailView){
			var infoForm = detailView.down('form').getForm();
		}

		var detailStore = me.getStore('partnerTariffRateDetailGrid');
		var arrTab1 = new Array();
		var detailItem = me.getViewModel().getData().theCurrentDetail;
		var appDate = refs.refAplDateField.getValue();
		var expDate = refs.refExpDateField.getValue();
		var stringAppDate = appDate==null?null:Ext.Date.format(appDate, MOST.config.Locale.getShortDate());
		var stringExpDate = expDate==null?null:Ext.Date.format(expDate, MOST.config.Locale.getShortDate());
		var dataStore = detailStore.data.items;
		
		var refNo = refs.refRefNoTxt.getValue();
		var conSig = refs.refConsignee.getValue();
    	var partnerCode = refs.refPartnertxt.getValue();
    	var check = true;
    	
    	if(partnerCode === ''){
    		MessageUtil.warning("PartnerTariffRate", "partnerCd_partner_tariff_rate_warning_msg");
    		return;
    	}
    	
    	if(stringAppDate == null) {
			MessageUtil.warning("PartnerTariffRate", "applyDate_partner_tariff_rate_warning_msg");
    		return;
		}
    	
		if(stringExpDate == null) {
			MessageUtil.warning("PartnerTariffRate", "expiredDate_partner_tariff_rate_warning_msg");
    		return;
		}
		
		if(appDate == null || expDate == null) {
			MessageUtil.alert('Warning', 'mandatoryForm_msg');
			return;
		}
		
		if(appDate >= expDate){
			MessageUtil.alert('Warning', 'validPeriod_msg');
			return;
		}
		
		if(refs.chbVsl.getValue()){
			if ( refs.refFormVsl.getValue() != null && (refs.refToVsl.getValue() == null || refs.refToVsl.getValue() == '') ){
				MessageUtil.alert('warning_msg', 'please_input_From_and_To_value_for_Vessel_Handling');
				return;
			}
			
			if ( (refs.refFormVsl.getValue() == null || refs.refFormVsl.getValue() == '') && (refs.refToVsl.getValue() != null)){
				MessageUtil.alert('warning_msg', 'please_input_From_and_To_value_for_Vessel_Handling');
				return;
			}
			
			if( refs.refFormVsl.getValue() && refs.refToVsl.getValue()){
				if(parseInt(refs.refFormVsl.getValue()) > parseInt(refs.refToVsl.getValue())){
					MessageUtil.alert('warning_msg', 'toValue_should_be_greater_than_fromValue');
					return;
				}
			}
		}

		if(refs.chbCargo.getValue()){
			if ( (refs.refFromCargo.getValue() != null) && (refs.refToCargo.getValue() == null || refs.refToCargo.getValue() == '') ){
				MessageUtil.alert('warning_msg', 'please_input_From_and_To_value_for_Vessel_Handling');
				return;
			}
			
			if ( (refs.refFromCargo.getValue() == null || refs.refFromCargo.getValue() == '') && refs.refToCargo.getValue() != null){
				MessageUtil.alert('warning_msg', 'please_input_From_and_To_value_for_Vessel_Handling');
				return;
			}
			
			if( refs.refFromCargo.getValue() && refs.refToCargo.getValue()){
				if(parseInt(refs.refFromCargo.getValue())> parseInt(refs.refToCargo.getValue())){
					MessageUtil.alert('warning_msg', 'toValue_should_be_greater_than_fromValue');
					return;
				}
			}
		}
		
		if((detailItem.dirty || detailStore.getModifiedRecords().length > 0) && detailStore.getRemovedRecords().length == 0){		
			detailStore.getModifiedRecords().forEach(function(record, index, array){
				record.set({
					'userId': MOST.config.Token.getUserId()
					,'pkgTrfNo': detailItem.data.pkgTrfNo
					,'workingStatus': record.isPhantom() ? WorkingStatus.INSERT : WorkingStatus.UPDATE
				})
				arrTab1.push(record.data);
			});
			
			if(dataStore.length == 0){
				MessageUtil.warning("PartnerTariffRate", "add_partner_tariff_rate_warning_msg");
				return;
			}
		}
		
		Ext.Array.forEach(dataStore, function(item){		
			var ptnr = item.get('ptnrPrc');
			
			if(ptnr === ""){
	    		check = false;
			}
		});	
		
		if(check == false) {
			MessageUtil.warning("PartnerTariffRate", "partner_tariff_rate_warning_msg");
			return;
		}
		
		me.fileUpload();
	},
	
	onUpdateDetailGrid: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refPartnerTariffRateDetailGrid');
		var selection = grid.getSelectionModel().getSelection()[0];
		var txtPartnerRate = refs.refPartnerRate.getValue();
		
		if(selection == undefined || selection == null){
			MessageUtil.warning("PartnerTariffRate", "update_partner_tariff_rate_warning_msg");
    		return;
		}else{		
			selection.set('ptnrPrc', txtPartnerRate);
		}
	},

	onRemove: function() {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		
		me.gridRemoveRow(grid, store, function(){
			MessageUtil.saveSuccess();
		});
	},
	
	onRemoveGridDetail: function(){
		var me = this;
		var grid = me.lookupReference('refPartnerTariffRateDetailGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == undefined || selection == null){
			MessageUtil.warning("PartnerTariffRate", "delete_partner_tariff_rate_warning_msg");
    		return;
		}else{
			selection.set('workingStatus', WorkingStatus.DELETE);	
			grid.store.remove(selection);
			me.onClearDataField();
		}
	},
	
	onClearDataField: function() {
		var me = this;
		var refs = me.getReferences();
		
		refs.refTrCd.setValue('');
		refs.refDesc.setValue('');
	},
	
	onExpiredPartnerSearch: function(){
		var me = this;
		var refs = me.getReferences();
		var theSearch = me.getViewModel().get('theSearch');
		
		if(theSearch.get('expireDtChk') == 'false' || theSearch.get('expireDtChk') == ''){
			theSearch.set('expireDtChk', 'Y');
			me.onSearch();
		} else{
			theSearch.set('expireDtChk', 'N');
		}
	},
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var control =  this.lookupReference(targetControl);
		var me = this
		
		if(targetControl === 'btnFindTariff'){
			var result = returnValue.item;
			var arrTariff = new Array();
			var storePartner = me.getStore('partnerTariffRateDetailGrid');
			
			Ext.Array.forEach(result, function(item){
				var it = Ext.create('MOST.model.billing.PartnerTariffRate');
				
				it.set('trfCd', item.trfCd);
				it.set('subTrfCd', item.subTrfCd);
				it.set('trfTpCd', item.trfTpCd);
				it.set('descr', item.descr);
				it.set('unitPrc', item.stdPrc);
				it.set('ivUnit1', item.ivUnit1);
				it.set('ivUnit2', item.ivUnit2);
				it.set('ivUnit3', item.ivUnit3);
				it.set('costCntCd', item.costCntCd);
				it.set('billTpCd', item.billTpCd);
				it.set('workingStatus', 'C');
				//sMantis: 0167150
				it.set('minRate', item.minRate);
				//eMantis: 0167150
				arrTariff.push(it);
			});
			
			if(storePartner.data.length == 0){
				storePartner.setData(arrTariff);
			}else{
				var indexStore = storePartner.data.length;
				for(var i = 0; i < arrTariff.length; i++){
					storePartner.insert(i+indexStore, arrTariff[i]);
				}
			}
		}else{
			if(returnValue){
				control.setValue(returnValue.code);
			} else {
				control.setValue("");
			}
		}
	},
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.billing.SearchPartnerTariffRateParm';
		searchBizParm.serviceID = 'MOST.partnerTariffRate.selectPartnerTariffRate'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
	
	getSearchCondition : function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
    	
		var dateCondition = me.checkFromToDate("refPeDateFromDt", "refPeDateToDt");
		var expireDtChk = searchParm.get('expireDtChk');
		var params = me.createParam(searchParm);
		
		if(expireDtChk != 'Y' && dateCondition.isEmpty){
			MessageUtil.warning("standardTariffRate", "select_applyDate_msg");
			return null;
		}
		
    	if(refs.cltPartnerCodetxf.getValue() != null && refs.cltPartnerCodetxf.getValue() != ''){
    		params['ptnrCd'] = refs.cltPartnerCodetxf.getValue() ;
    	}
		
        params['trfTp'] = StringUtil.toUpperCase(searchParm.data.trfTpCd);
		params['startDtm'] = dateCondition.fromDtString;
		params['endDtm'] = dateCondition.toDtString;
		params['sort'] = grid.getSortString();
     	params['expireDtChk'] = expireDtChk;
     	
    	return params;
	},
	
	fileUpload : function(formData){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var store = me.getStore(me.FILE_UPLOAD_STORE_NAME);
		var formData = new FormData();
		var xhr = new XMLHttpRequest();
    	
		store.getModifiedRecords().forEach(function(record, index, array){
			formData.append(record.data.fileName, record.data.fileStream);
    	});
    	
    	xhr.addEventListener('loadend', function(){
    		if(xhr.status === 200){
    			var rtnData = JSON.parse(xhr.responseText);
    			
    			store.getModifiedRecords().forEach(function(record, index, array){
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
	
	saveProcess: function(){
		var me = this;
		var refs = me.getReferences();
		var ptnrTrfStore= me.getStore(me.MAIN_STORE_NAME);
		var fileUploadStore = me.getStore(me.FILE_UPLOAD_STORE_NAME);
		var detailStore = me.getStore('partnerTariffRateDetailGrid');
		var masterItem = Ext.create('MOST.model.billing.PartnerTariffRate');
		
		var detailView = me.getDetailBizView();
		var arrTab1 = new Array();
		var detailItem = me.getViewModel().getData().theCurrentDetail;
		var isCreated = detailItem.phantom;
		var appDate = refs.refAplDateField.getValue();
		var expDate = refs.refExpDateField.getValue();
		
		var stringAppDate = appDate==null?null:Ext.Date.format(appDate, MOST.config.Locale.getShortDate());
		var stringExpDate = expDate==null?null:Ext.Date.format(expDate, MOST.config.Locale.getShortDate());
		var dataStore = detailStore.data.items;
		
		var refNo = refs.refRefNoTxt.getValue();
		var conSig = refs.refConsignee.getValue();
    	var partnerCode = refs.refPartnertxt.getValue();
    	
    	var uploadItems = new Array();
    	var check = true;
    	
//    	if(partnerCode === ''){
//    		MessageUtil.warning("ParterTariffRate", "partnerCd_partner_tariff_rate_warning_msg");
//    		return;
//    	}
//    	
//    	if(stringAppDate == null) {
//			MessageUtil.warning("ParterTariffRate", "applyDate_partner_tariff_rate_warning_msg");
//    		return;
//		}
//    	
//		if(stringExpDate == null) {
//			MessageUtil.warning("ParterTariffRate", "expiredDate_partner_tariff_rate_warning_msg");
//    		return;
//		}
//		
//		if(appDate == null || expDate == null) {
//			MessageUtil.alert('Warning', 'mandatoryForm_msg');
//			return;
//		}
//		
//		if(appDate >= expDate){
//			MessageUtil.alert('Warning', 'validPeriod_msg');
//			return;
//		}
//		
//		if(refs.chbVsl.getValue()){
//			if ( refs.refFormVsl.getValue() != null && (refs.refToVsl.getValue() == null || refs.refToVsl.getValue() == '') ){
//				MessageUtil.alert('warning_msg', 'please_input_From_and_To_value_for_Vessel_Handling');
//				return;
//			}
//			
//			if ( (refs.refFormVsl.getValue() == null || refs.refFormVsl.getValue() == '') && (refs.refToVsl.getValue() != null)){
//				MessageUtil.alert('warning_msg', 'please_input_From_and_To_value_for_Vessel_Handling');
//				return;
//			}
//			
//			if( refs.refFormVsl.getValue() && refs.refToVsl.getValue()){
//				if(parseInt(refs.refFormVsl.getValue()) > parseInt(refs.refToVsl.getValue())){
//					MessageUtil.alert('warning_msg', 'toValue_should_be_greater_than_fromValue');
//					return;
//				}
//			}
//		}
//
//		if(refs.chbCargo.getValue()){
//			if ( (refs.refFromCargo.getValue() != null) && (refs.refToCargo.getValue() == null || refs.refToCargo.getValue() == '') ){
//				MessageUtil.alert('warning_msg', 'please_input_From_and_To_value_for_Vessel_Handling');
//				return;
//			}
//			
//			if ( (refs.refFromCargo.getValue() == null || refs.refFromCargo.getValue() == '') && refs.refToCargo.getValue() != null){
//				MessageUtil.alert('warning_msg', 'please_input_From_and_To_value_for_Vessel_Handling');
//				return;
//			}
//			
//			if( refs.refFromCargo.getValue() && refs.refToCargo.getValue()){
//				if(parseInt(refs.refFromCargo.getValue())> parseInt(refs.refToCargo.getValue())){
//					MessageUtil.alert('warning_msg', 'toValue_should_be_greater_than_fromValue');
//					return;
//				}
//			}
//		}
    	
		Ext.Array.forEach(dataStore, function(item){
			item.set('conSig', conSig);
			item.set('ptnrCd', partnerCode);
			item.set('aplyYmd', stringAppDate);
			item.set('exprYmd', stringExpDate);
			item.set('rmk', refNo);
			
			var ptnr = item.get('ptnrPrc');
			
			if(ptnr === ""){
	    		check = false;
			}
		});	
		
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
		detailItem.data.aplyYmd = stringAppDate;
		detailItem.data.exprYmd = stringExpDate;
		
		if((detailItem.dirty || detailStore.getModifiedRecords().length > 0) && detailStore.getRemovedRecords().length == 0){//update
//			// CREATE, UPDATE RECORD
			detailStore.getModifiedRecords().forEach(function(record, index, array){
				record.set({
					 'userId': MOST.config.Token.getUserId()
					,'pkgTrfNo': detailItem.data.pkgTrfNo
					,'workingStatus': record.isPhantom() ? WorkingStatus.INSERT : WorkingStatus.UPDATE
				})
				arrTab1.push(record.data);
			});
			
//			if(dataStore.length == 0){
//	    		MessageUtil.warning("ParterTariffRate", "add_partner_tariff_rate_warning_msg");
//	    		return;
//	    	}
//			
//			if(check == false) {
//				MessageUtil.warning("ParterTariffRate", "partner_tariff_rate_warning_msg");
//				return;
//			}
			
			detailItem.set("pkgRate", arrTab1);
			detailItem.set("userId", MOST.config.Token.getUserId());
			
			var store = me.getStore('partnertariffratedetailList');
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			
			updateParm.getProxy().url = store.getProxy().url;
			updateParm.phantom = isCreated;
			updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
			updateParm.set('userId', MOST.config.Token.getUserId());
			updateParm.set("item",detailItem.data);
			
			updateParm.save({
				success:function(record){
					record.data.workingStatus = 'U';
					detailItem.commit();
					detailStore.commitChanges();
					fileUploadStore.reload();
					
					ptnrTrfStore.load({
						params: {
							startDtm: detailItem.data.aplyYmd,
							endDtm: detailItem.data.exprYmd
						},
						callback: function(records, ope, success){
							if(success){
								MessageUtil.saveSuccess();
							}
						}
					});
				}
			});	
		}else{
			// DELETE RECORD
			detailStore.getRemovedRecords().forEach(function(record, index, array){
				record.set('userId', MOST.config.Token.getUserId());
				arrTab1.push(record.data);
			});

			detailItem.set("pkgRate", arrTab1);
			detailItem.set("userId", MOST.config.Token.getUserId());
			detailItem.set("trfRegNoAll", "");
			
			for(var i = 0; i < arrTab1.length; i++){
				detailItem.set("trfRegNoAll", detailItem.get("trfRegNoAll") + arrTab1[i].trfRegNo + " ");
			}
			
			var store = me.getStore('partnertariffratedetailList');
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			
			updateParm.getProxy().url = store.getProxy().url;
			updateParm.phantom = isCreated;
			updateParm.set({
				 'workingStatus': WorkingStatus.DELETE
				,'userId': MOST.config.Token.getUserId()
				,'item': detailItem.data
			});

			updateParm.erase({
				success:function(record){
					detailStore.commitChanges();
					MessageUtil.saveSuccess();
				}
			});
		}
	},
	//Tariff popup
	openTariffCodePopup:function(){
		var me = this;
		var params = {
			title: 'Tariff Code List'
		}
		
		me.openCodePopup('app-tariffcodepopup', 'btnFindTariff',params);
	},
	
	openCargoPopup:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recv = refs.refcargoType.getValue();
		var params = {
			data: recv,
			initSearch: false
		};
		
		me.openCodePopup('popup-cargotypepopup', 'refcargoType', params);
	},
	
	openVesselMultiPopup:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recv = refs.refVesselCode.getValue();
		var params = {
			data: recv,
			initSearch: false
		};
		
		me.openCodePopup('popup-vesselcalllistmulti', 'refVesselCode', params);
	},
	
	openDeliveryPopup:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var recv = detailView.items.get(0).recvData;
		var params = {
			data: recv,
			initSearch: false
		};
		
		me.openCodePopup('popup-deliverypopup', 'refDelivery', params);
	},
	
	openPartnerCdTypePopup:function(){
		var me = this;
		var params = {
			searchModule: CodeConstants.LCD_MOST
		};
		
		me.openCodePopup('popup-partnercdtypepopup', 'cltPartnerCodetxf', params);
	},
	
	openPartnerCdTypePopupHead:function(){
		var me = this;
		var params = {
			searchModule: CodeConstants.LCD_MOST
		};
		
		me.openCodePopup('popup-partnercdtypepopup', 'refPartnertxt', params);
	},
	
	openPartnerCdForMultiPopup:function(){
		var me = this;
		var params = {
			searchPtyDivCd: CodeConstants.CM_PTNRTP_TRK,  // CNS, FWD, TRK
			initSearch: true		// true, false
		};
		
		me.openCodePopup('popup-partnercdformultipopup', 'refConsignee', params);
	},
	openCommonCodeForMultiPopup:function(){
		var me = this;
		var params = {
			searchDivCd: 'CMDT',
			initSearch: false
		};
		
		me.openCodePopup('popup-cmmcdformultipopup', 'refComdt', params);
	},
	
	onChangeDate: function(){
		var me = this;
		var refs = me.getReferences();
		var fromDate = refs.refAplDateField.getValue();
		var toDate = refs.refExpDateField.getValue();
		
		if(fromDate >= toDate && (fromDate !=null) && (toDate != null)){
			MessageUtil.alert('Warning', 'validPeriod_msg');
			toDate.setValue(toDate);
			
			return;
		}
	},
	
	onFieldsetDisabled: function(refer, flag){
		var me = this;
		var refs = me.getReferences();
		
		refer.setDisabled(flag);
	}
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});		