Ext.define('MOST.view.operation.VORDryBreakBulkController', {
	extend: 'MOST.view.foundation.BaseViewController',

	alias: 'controller.vordrybreakbulk',

	requires: [
	
	],
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	VERIFY_LABEL : "Verify",
	UNVERIFY_LABEL : "Unverify",
	VERIFY_COLOR : "#ff80ff",
	UNVERIFY_COLOR : "#c0c0c0",
	
	doPackingDbbCases: false,
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		
		var searchParm = Ext.create('MOST.model.operation.SearchVORDryBreakBulkParm');

		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
	},
	
	// Search Event Handler
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore('vorDryBreakBulk');
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
    	if(refs.ctlVslCallId.getValue() == null || refs.ctlVslCallId.getValue() == ''){
    		MessageUtil.warning("warning_msg", "goodsreceipt_jpvc_input_msg");
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						var theModel = Ext.create('MOST.model.operation.VORDryBreakBulk');
						theModel.phantom = false; // UPDATE
						theModel.data = records[0].data;
						me.getViewModel().setData({theVORDryBreak:theModel.data.listVOR});
						
						me.setVORList(records[0].data);
						me.setHandlingList(records[0].data);
						me.setVesselInfoList(records[0].data);
						me.getViewModel().setData({theVslInfo:records[0].data.vesselInfoList[0]});
						
						me.calcSum();
					}
				}
			}
		});
	},
	
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var searchParm = me.getViewModel().get('theSearch');
     	var searchVessel = me.getViewModel().get('theVessel');
     	searchParm.data.vslCallId = searchVessel != null ? searchVessel.data.vslCallId : '';
		var params = me.createParam(searchParm);
     	
    	params['searchType'] = 'info';
    	params['scn'] = searchParm.data.scn;

    	return params;
	},
	
	onUpdate:function(){
		var me = this;
		var store = me.getStore('vorList');
		var refs = me.getReferences();
		var grid = me.lookupReference('refVORListGrid');
		var model = Ext.create('MOST.model.operation.VORDryBreakBulk');
		var selectedGrid = false;
		var valid = true;
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		store.each(function(record,index){
			if(selection){
				selection.data.rmk = refs.refRemark.getValue();
				selectedGrid = true;
				record.commit();
			}
			
		});
	},
	
	onSave:function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore('vorDryBreakBulk');
		var grid = me.lookupReference('refVORListGrid');
		var masterItem = Ext.create('MOST.model.operation.VORDryBreakBulk');
		var arrItems = new Array();
		var items = me.getViewModel().get('theVORDryBreak');
		store.each(function(record,index){
			arrItems.push(record.data);
		});
		
		if(masterItem.dirty||arrItems.length>0){
			var proxy = masterItem.getProxy();
			proxy.url=store.getProxy().url;
			masterItem.set("items",arrItems);
			
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			var isCreated = false;
			updateParm.getProxy().url = store.getProxy().url;
			updateParm.phantom = isCreated;
			updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
			updateParm.set('userId', MOST.config.Token.getUserId());
			updateParm.set('item', masterItem.data);
			
			updateParm.save({
				success:function(){
					store.reload();
					MessageUtil.saveSuccess();
					me.onLoad();
				}
			});
		}
		
	},
	
	calcSum:function(){
		var me = this;
		var store = me.getStore('summaryOfHandling');
		var refs = me.getReferences();
		var grid = me.lookupReference('refVORListGrid');
		var model = Ext.create('MOST.model.operation.VORDryBreakBulk');
		var arrItems = new Array();
		var items = me.getViewModel().get('theVORDryBreak');
		
		var totLoad = 0;
		var totDischarge = 0;
		
		store.each(function(record,index){
			if(record.data.loading != null && record.data.loading != ''){
				totLoad += parseInt(record.data.loading);
			}
			
			if(record.data.discharging != null && record.data.discharging != ''){
				totDischarge += parseInt(record.data.discharging);
			}
		});
		
		refs.refVORTotalLoad.setValue(totLoad);
		refs.refVORTotalDischarge.setValue(totDischarge);
		
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		if(targetControl == 'ctlVslCallId'){ 
			if(returnValue){
				me.getViewModel().setData({theVessel:returnValue.item});
				refs.ctlScn.setValue(returnValue.item.get('scn'));
				
				var searchParm = Ext.create('MOST.model.operation.SearchVORDryBreakBulkParm');

				me.setSearchParm(searchParm); // Settings Model Data Change
				me.getViewModel().setData({theSearch:searchParm});
				me.onSearch();
			} 
		} else if(targetControl === 'ctlScn'){ 
			if(returnValue){
				refs.ctlScn.setValue(returnValue.code);

				if(!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))){
					refs.ctlVslCallId.setValue(returnValue.item.get('vslCallId'));
					me.getViewModel().setData({theVessel:returnValue.item});
					me.onSearch();
				}else {
					me.getViewModel().setData({theVessel:null});
				}
			} 
		}
		
	},
	
	setVORList:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var vorList = me.getViewModel().getStore('vorList');
		vorList.setData(masterItem.listVOR);
		vorList.each(function(record,index){
			if(record.data.verifySt === 'Y'){
    			record.data.verifySt = true;
    		}else{
    			record.data.verifySt = false;
    		}
		});
		vorList.commitChanges();
	},
	
	setHandlingList:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var handlingList = me.getViewModel().getStore('summaryOfHandling');
		
		handlingList.setData(masterItem.handlingList);
		handlingList.commitChanges();
	},
	
	setVesselInfoList:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var vesselInfoList = me.getViewModel().getStore('vesselInformation');
		vesselInfoList.setData(masterItem.vesselInfoList[0]);
		vesselInfoList.commitChanges();
		
	},
	
	setDetailOfHandlingList:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var detailHandling = me.getViewModel().getStore('detailOfHandling');
		
		detailHandling.setData(masterItem.detailHandling);
		detailHandling.commitChanges();
		
	},
	
	setStevedoreList:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var stevedoreList = me.getViewModel().getStore('stevedoreList');
		
		stevedoreList.setData(masterItem.stevedoreList);
		stevedoreList.commitChanges();
		
	},
	
	setTrimmingList:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var trimmingList = me.getViewModel().getStore('trimmingList');
		
		trimmingList.setData(masterItem.trimmingList);
		trimmingList.commitChanges();
		
	},
	
	setDailyRosterStevedoresList:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var vesselInfoList = me.getViewModel().getStore('vesselInformation');
		
		vesselInfoList.setData(masterItem.vesselInformation[0]);
		vesselInfoList.commitChanges();
		
	},
	
	setFacility:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var facilityList = me.getViewModel().getStore('facilityList');
		facilityList.setData(masterItem.facility[2]);
		facilityList.each(function(record,index){
			if(record.data.useYN === 'true'){
    			record.data.useYN = true;
    		}else{
    			record.data.useYN = false;
    		}
		});
		facilityList.commitChanges();
	},
	
	setBulk:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var bulkList = me.getViewModel().getStore('bulk');
		bulkList.setData(masterItem.facility[0]);
		bulkList.each(function(record,index){
			if(record.data.useYN === 'true'){
    			record.data.useYN = true;
    		}else{
    			record.data.useYN = false;
    		}
		});
		bulkList.commitChanges();
	},
	
	setBreakBulk:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var breakBulkList = me.getViewModel().getStore('breakBulk');
		breakBulkList.setData(masterItem.facility[1]);
		breakBulkList.each(function(record,index){
			if(record.data.useYN === 'true'){
    			record.data.useYN = true;
    		}else{
    			record.data.useYN = false;
    		}
		});
		breakBulkList.commitChanges();
	},
	
	setDeliveryMode:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var deliveryModeList = me.getViewModel().getStore('deliveryMode');
		if(masterItem.facility[3] != null){
			if(masterItem.facility[3].isDirect === 'true'){
				refs.refVORDirect.setValue(true);
			}
			if(masterItem.facility[3].isIndirect === 'true'){
				refs.refVORInDirect.setValue(true);
			}
		}
		deliveryModeList.setData(masterItem.facility[3]);
		deliveryModeList.commitChanges();
	},
	
	onVORListDblClick: function() {
		var me = this;
		var grid = me.lookupReference('refVORListGrid');

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		me.getView().detailViewAlias = 'app-vesseloperationreport'
		me.openDetailPopup(selection, 'Vessel Operation Report');
	},
	
	onSelect:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refVORListGrid');

        var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		refs.refRemark.setValue(selection.get("rmk"));
	},
	
	/**
	 * =========================================================================================================================
	 * DETAIL START
	 */
	// Detail Load
	onDetailLoad:function(){
		
		var me = this;
		var refs = me.getReferences();
		refs.ctlVerifyText.setText(me.UNVERIFY_LABEL);
		refs.ctlVerifybtn.setText(me.VERIFY_LABEL);
		
		var detailView = me.getDetailBizView();
		me.setDetailInitialize();
	},
	
	// Detail Initialize
	setDetailInitialize:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		
		this.setDetailControl(recvData);
	},
	
	// Detail Control Setting
	setDetailControl:function(recvData){
		var me = this;
		var refs = me.getReferences();
		var label = refs.ctlVerifyText;
		var vesselOperationReport = me.getStore('vesselOperationReport');
		me.getViewModel().setData({theCargo:recvData.data});
		refs.refWorkYmd.setValue(recvData.data.workYmd);
		refs.refShift.setValue(recvData.data.shftId);
		vesselOperationReport.load({
			params: {
				vslCallId : recvData.data.vslCallId,
				shftId : recvData.data.shftId,
				workYmd : recvData.data.workYmd
			},
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						var theModel = Ext.create('MOST.model.operation.VORDryBreakBulk');
						theModel.phantom = false; // UPDATE
						theModel.data = records[0].data;
						me.getViewModel().setData({theVesselOperation:theModel});
						me.setDetailOfHandlingList(records[0].data);
						me.setStevedoreList(records[0].data);
						me.setTrimmingList(records[0].data);
						me.setDailyRosterStevedoresList(records[0].data);
						me.getViewModel().setData({theVslOperation:records[0].data.vesselInformation[0]});
						
						me.setFacility(records[0].data);
						me.setBulk(records[0].data);
						me.setBreakBulk(records[0].data);
						me.setDeliveryMode(records[0].data);
						me.setCheckUseYn(records[0].data);
					}
				}
			}
		});
		
		if(recvData.get('verifySt') === true){
			refs.ctlVerifyText.setText(me.VERIFY_LABEL);
		    label.getEl().setStyle('background', me.VERIFY_COLOR);
		    refs.ctlVerifybtn.setText(me.UNVERIFY_LABEL);
		}else{
			refs.ctlVerifyText.setText(me.UNVERIFY_LABEL);
			label.getEl().setStyle('background', me.UNVERIFY_COLOR);
			refs.ctlVerifybtn.setText(me.VERIFY_LABEL);
		}
	},
	
	setCheckUseYn : function(masterItem){
		var me = this;
		var refs = me.getReferences();
		for(var i = 0; i < masterItem.facility.length; i++){
			
		}
	},
	
	onVerify : function(){
		var me = this;
		var refs = me.getReferences();
		if(refs.ctlVerifybtn.getText() == me.VERIFY_LABEL){
			me.onVerifyData();
		}else{
			me.onUnverifyData();
		}
	},
	
	onVerifyData : function(){
		var me = this;
     	var refs = me.getReferences();
     	var label = refs.ctlVerifyText;
     	var store = me.getStore('vorDryBreakBulk');
		var grid = me.lookupReference('refVORListGrid');
		var masterItem = Ext.create('MOST.model.operation.VORDryBreakBulk');
		var arrItems = new Array();
		var items = me.getViewModel().get('theVORDryBreak');
		store.each(function(record,index){
			record.data.vslCallId = refs.refVslCallId.getValue();
			record.data.workYmd = refs.refWorkYmd.getValue();
			record.data.shftId = refs.refShift.getValue();
			record.data.verifySt = "Y";
			record.data.verifyBy = MOST.config.Token.getUserId();
			record.set('searchType', "verify");
			arrItems.push(record.data);
		});
		
		refs.ctlVerifyText.setText(me.VERIFY_LABEL);
		label.getEl().setStyle('background', me.VERIFY_COLOR);
		refs.ctlVerifybtn.setText(me.UNVERIFY_LABEL);
		
//		To perform the save logic only when modified
		if(masterItem.dirty||arrItems.length>0){
			var proxy = masterItem.getProxy();
			proxy.url= MOST.config.Locale.getRestApiDestUrl() + '/v1/vordrybreakbulk/verify';
			masterItem.set("items",arrItems);
			
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			var isCreated = false;
			
			updateParm.getProxy().url = proxy.url;
			updateParm.phantom = isCreated;
			updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
			updateParm.set('userId', MOST.config.Token.getUserId());
			updateParm.set('item', masterItem.data);
			
			updateParm.save({
				success:function(){
					store.reload();
					MessageUtil.saveSuccess();
					me.onLoad();
				}
			});
			
		}
	},
	
	onUnverifyData : function(){
		var me = this;
     	var refs = me.getReferences();
     	var label = refs.ctlVerifyText;
     	var store = me.getStore('vorDryBreakBulk');
		var grid = me.lookupReference('refVORListGrid');
		var masterItem = Ext.create('MOST.model.operation.VORDryBreakBulk');
		var arrItems = new Array();
		var items = me.getViewModel().get('theVORDryBreak');
		store.each(function(record,index){
			record.data.vslCallId = refs.refVslCallId.getValue();
			record.data.workYmd = refs.refWorkYmd.getValue();
			record.data.shftId = refs.refShift.getValue();
			record.data.verifySt = "N";
//			record.data.verifyBy = MOST.config.Token.getUserId();
			record.set('searchType', "verify");
			arrItems.push(record.data);
		});
		
		refs.ctlVerifyText.setText(me.UNVERIFY_LABEL);
		label.getEl().setStyle('background', me.UNVERIFY_COLOR);
		refs.ctlVerifybtn.setText(me.VERIFY_LABEL);
		
//		To perform the save logic only when modified
		if(masterItem.dirty||arrItems.length>0){
			var proxy = masterItem.getProxy();
			proxy.url= MOST.config.Locale.getRestApiDestUrl() + '/v1/vordrybreakbulk/verify';
			masterItem.set("items",arrItems);
			
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			var isCreated = false;
			
			updateParm.getProxy().url = proxy.url;
			updateParm.phantom = isCreated;
			updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
			updateParm.set('userId', MOST.config.Token.getUserId());
			updateParm.set('item', masterItem.data);
			
			updateParm.save({
				success:function(){
					store.reload();
					MessageUtil.saveSuccess();
					me.onLoad();
				}
			});
		}
	},
	
	onStartVSRChecklist : function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvDataDetail = detailView.items.get(0).recvData;
		
		var recvData = {
			vslCallId: recvDataDetail.data.vslCallId,
			shftId: recvDataDetail.data.shftId,
			workYmd: recvDataDetail.data.workYmd
		};
		
		me.loadMenuView('app-vsrchecklist',recvData);
	},
	onStartVesselDelay : function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvDataDetail = detailView.items.get(0).recvData;
		
		var recvData = {
			vslCallId: recvDataDetail.data.vslCallId,
			shftId: recvDataDetail.data.shftId,
			workYmd: recvDataDetail.data.workYmd,
			hatchNo: recvDataDetail.data.hatchNo
		};
		
		me.loadMenuView('app-vesseldelay',recvData);
	},
	onDownloadPDF : function(){
		var me = this;
		var refs = me.getReferences();
		var params = me.setSrchStrReport();
		params.previewType = 'DOWNLOAD';
		
		me.getView().detailViewAlias = 'app-vordrybreakbulkpdfpopup';
		me.openDetailPopup(params, 'Download');
	
	},
	onPreviewPDF:function(){
		var me = this;
		var refs = me.getReferences();
		var params = me.setSrchStrReport(); 
		params.previewType = 'PREVIEW';
		
	},
	
	onPreviewPDF2:function(){
		var me = this;
		var refs = me.getReferences();
		
		var params = {
				previewType : 'PREVIEW',
				vslCallId: refs.ctlVslCallId.getValue(),
				userId: MOST.config.Token.getUserId(),
				searchType: 'DelayRecordList'
		};
		
		var detailVsl = me.getViewModel().get('theVsl');
		if(detailVsl != null){
			params['eta'] = detailVsl.data.eta==null?null:Ext.Date.format(detailVsl.data.eta, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			params['etb'] = detailVsl.data.etb==null?null:Ext.Date.format(detailVsl.data.etb, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			params['atb'] = detailVsl.data.atb;
			params['atw'] = detailVsl.data.atw;
			params['atc'] = detailVsl.data.atc;
			params['atu'] = detailVsl.data.atu;
			params['vslNm'] = detailVsl.data.vslNm;
			params['berthLoc'] = detailVsl.data.berthLoc;
			params['sa'] = detailVsl.data.depSaId;
		}
		
		me.getView().detailViewAlias = 'app-vesseldelaygeneratepdf';
		me.openDetailPopup(params, 'Preview');
		
	},
	onDetailPreview:function(){
		var me = this;
		var refs = me.getReferences();
		me.getView().detailViewAlias = 'app-vesseloperationreport'
		var detailView = me.getDetailBizView();
		var recvDataDetail = detailView.items.get(0).recvData.data;
		var params = me.setSrchStrReport(recvDataDetail);
		var storePDF = me.getStore('generatePDFDryBreakBulkDtl');
		storePDF.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					me.openPDFPreview (records, operation, success);
				}
			}
		});
		
	},
	onDetailDownload:function(){
		var me = this;
		var refs = me.getReferences();
		me.getView().detailViewAlias = 'app-vesseloperationreport'
		var detailView = me.getDetailBizView();
		var recvDataDetail = detailView.items.get(0).recvData.data;
		var params = me.setSrchStrReport(recvDataDetail);
		var storePDF = me.getStore('generatePDFDryBreakBulkDtl');
		me.getView().detailViewAlias = 'app-vordrybeakexcelpdfpopup';
		me.openDetailPopup(params, 'Download');
		
	},	
	
	onExportExcelPdfWithServer: function(gridNameString,isExcel){
    	var me = this;
    	var mode = me.tabMode;
		var searchBizParm = me.getSearchCondition();
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.operation.SearchVORDryBreakBulkParm';
		
		if (mode == 'summaryOfHandling'){
			searchBizParm.serviceID = 'MOST.vorDryBreakBulk.selectHandlingList';
			gridNameString = 'refSummaryOfHandlingGrid';
		}else if (mode == 'vorList'){
			searchBizParm.serviceID = 'MOST.vorDryBreakBulk.selectVORList';
			gridNameString = 'refVORListGrid';
		}else{
			return;
		}

		me.exportExcelPdfWithServer('refSummaryOfHandlingGrid',searchBizParm, isExcel);
    },
    
    onTabChange : function(tabPanel, newCard, oldCard, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var tabTitle = tabPanel.getActiveTab().title.trim();
		
		switch(tabTitle) {
			case 'VOR List':
				me.tabMode = 'vorList';
				break;
			case 'Summary of Handling':
				me.tabMode = 'summaryOfHandling';
				break;
			case 'Vessel Information':
				me.tabMode ='vesselInformation';
				break;
		}
	},
    
	onExportExcel:function(){
		var me = this;
		var refs = me.getReferences();
		var generateExcelDryBreakBulk = me.getStore('generateExcelDryBreakBulk');
		var params = me.getSearchCondition();
		
		params['printTp'] = 'excel';
		
		generateExcelDryBreakBulk.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					var content = records[0].data.content.replace(/&lt;/gi,'<').replace(/&gt;/gi,'>');
		        	Ext.exporter.File.saveBinaryAs(content, records[0].data.fileName);
				}
			}
		})
	},	
	
	onPreview:function(){
		var me = this;
		var refs = me.getReferences();
		var userId = MOST.config.Token.getUserId();
		var searchVessel = me.getViewModel().get('theVessel');
		
		if(searchVessel.data.vslCallId == null || searchVessel.data.vslCallId == ''){
    		MessageUtil.warning("warning_msg", "goodsreceipt_jpvc_input_msg");
    		return;
    	}
		
		var params = null;
		var shftId = '';
		var doPackingDbbCases = false;
		var vslCallId = searchVessel.data.vslCallId;
		var vslTp = searchVessel.data.vslTp; //		"BRGE"
		doPackingDbbCases = refs.refDoPackingDbbCases.getValue();
		
		params = {
				vslCallId : vslCallId,
				originalVslTp: vslTp,
				doPackingDbbCases: doPackingDbbCases,
				reportId: '',
				searchType: 'info',
				previewType: 'PREVIEW',
				userId: userId,
				shftId:shftId,
		}
		
		me.openCodePopup('popup-vordrybreakbulkreportpopup', 'VORDryBreakBulkReportPopup', params);
	},
	setSrchStrReport:function(selection){
		var me = this;
		var refs = me.getReferences();
		var params = null;
		var detailVsl = me.getViewModel().get('theVORDryBreak');
		var vslCallId = detailVsl[0].vslCallId;
		var userId = MOST.config.Token.getUserId();
		var workYmd = '';
		var shftId = '';
		
		if(selection != null){
			workYmd = selection.workYmd;
			shftId = selection.shftId;
		}
		params = {
				vslCallId : vslCallId,
				reportId: '',
				searchType: 'info',
				previewType: '',
				userId: userId,
		   		shftId:shftId,
		   		workYmd:workYmd,

		}
		return params
	},

});