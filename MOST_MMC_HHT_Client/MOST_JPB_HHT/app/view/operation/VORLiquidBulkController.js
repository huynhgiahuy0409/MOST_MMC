Ext.define('MOST.view.operation.VORLiquidBulkController', {
	extend: 'MOST.view.foundation.BaseViewController',

	alias: 'controller.vorliquidbulk',

	requires: [
		
	],

	VSL_CALL_ID:'',
	SHFTID: '',
	WORKDATE: '',
	gridSelected: false,
	format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
	MODE_ADD: 1,
	MODE_UPDATE: 2,
	opeTp: '',
	isCmdtSelected: false,
	EARLIEST_ATB: '',
	LATEST_ATU: '',
	
	
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
	},
	
	// Search Event Handler
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore('vorLiquidBulk');
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
     	if(refs.ctlJpvc.getValue() == null || refs.ctlJpvc.getValue() == ''){
     		MessageUtil.warning("warning_msg", "goodsreceipt_jpvc_input_msg");
    		return;
     	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						me.setVORSummary(records[0].data);
						me.setBerthAndOperationInfo(records[0].data);
						me.setVORDelaySummary(records[0].data);
						
						if(records[0].data.berthAndOperationInfo.length > 0){
							var balLoadMt = records[0].data.berthAndOperationInfo[0].loadPlanMtS - records[0].data.berthAndOperationInfo[0].loadActualMtS;
							var balDisMt = records[0].data.berthAndOperationInfo[0].disPlanMtS - records[0].data.berthAndOperationInfo[0].disActualMtS;
							
							records[0].data.berthAndOperationInfo[0].balLoadMt = balLoadMt;
							records[0].data.berthAndOperationInfo[0].balDisMt = balDisMt;
							
							me.getViewModel().setData({theBerthing:records[0].data.berthAndOperationInfo[0]});
						}
						me.getViewModel().setData({theVORSummary:records[0].data.vorSummary});
					}
				}
			}
		});
		
    	var cgOprTypeStore = me.getStore('cgOprType');
    	cgOprTypeStore.load({
			params: {
				vslCallId : refs.ctlJpvc.getValue()
			},
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						me.getViewModel().setData({theCgOprType:records[0].data});
						refs.ctlVORTranshipment.setDisabled(true);
						refs.ctlVORSTSOperation.setDisabled(true);
						refs.ctlVORLoadDischarge.setDisabled(true);
						
						if(records[0].data.tlsOprYn == 'Y'){
							refs.ctlVORTranshipment.setDisabled(false);
							refs.ctlVORTranshipment.setValue(true);
						}
						if(records[0].data.stsOprYn == 'Y'){
							refs.ctlVORSTSOperation.setDisabled(false);
							refs.ctlVORSTSOperation.setValue(true);
						}
						if(records[0].data.genOprYn == 'Y'){
							refs.ctlVORLoadDischarge.setDisabled(false);
							refs.ctlVORLoadDischarge.setValue(true);
						}
					}
				}
			}
    	});
	},
	
	
	onOpenDelayCodePopup:function(field, button, e){
		var me = this;
		var refs = me.getReferences();
		var params = {
			lcd: 'LIQUIQ'
		};
		me.openCodePopup('popup-delaycodepopup', 'refTxtDelayCode', params);
	},

	onChangeUppercase: function(field, newValue){
		field.setValue(newValue.toUpperCase());
	},
	
	onCheckedContractor: function(){
		var me = this;
		var refs = me.getReferences();
		var delayCode = refs.refTxtDelayCode.getValue();
		
		var store = this.getStore('delayCodePopup');
		
		if (delayCode != null && delayCode != ''){
			store.load({
				params: {
					lcd:'LIQUIQ',
					scd: delayCode,
					tyCd: 'CD'
				},
				callback: function(record, operation, success){
	    			if(success){
	    				if (record.length == 0){
	    					refs.refTxtDelayCode.setValue('');
		    				refs.refTxtDelayCodeName.setValue('');
		    				refs.refTxtAcptYN.setValue('');
	    				}
	    				else {
	    					refs.refTxtDelayCode.setValue(record[0].get('cd'));
		    				refs.refTxtDelayCodeName.setValue(record[0].get('cdNm'));
		    				refs.refTxtAcptYN.setValue(record[0].get('acptYN'));
	    				}
	    			}
	    		}
			});
		}
	},
	
	onDelaySummaryGridClick: function(){
		var me = this;
		var refs = me.getReferences();

		var grid = me.lookupReference('refDelaySummaryGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(!selection) return;
		
		//Added by Harry
		refs.refTxtDelayCode.setValue(selection.get('delayCode'));
		refs.refTxtDelayCodeName.setValue(selection.get('delayDesc'));
		refs.refTxtAcptYN.setValue(selection.get('accDelay'));
		refs.refCargoType.setValue(selection.get('cgTpCd'));
		refs.refDelayStartTime.setValue(selection.get('startTime'));
		refs.refDelayEndTime.setValue(selection.get('endTime'));
		refs.refRemarks.setValue(selection.get('remark'));
		refs.refDelayTimeHourMin.setValue(selection.get('timeHourMin'));
		refs.refDelayTimeHourly.setValue(selection.get('timeHourly'));
		// --------------------------------------
//		me.getViewModel().set('selectedDelay',selection);	
		
		refs.refDelaySaveBtn.setDisabled(false);
		refs.refDelayDeleteBtn.setDisabled(false);
	},
	
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var vslCallId = refs.ctlJpvc.getValue();
     	var searchType = 'info';
    	var params = {
    		vslCallId : vslCallId,
    		searchType: searchType
		};
    	
    	return params;
	},
	
	// JPVC OPEN POPUP
	openJpvcPopup:function(){
		var me = this;
		me.openCodePopup('popup-vesselfindpopup', 'ctlJpvc');
	},
	
	// Delay OPEN POPUP
	openDelayPopup:function(){
		var me = this;
		me.openCodePopup('app-delaycode', 'refVORDelayCode');
	},
	
	setBerthAndOperationInfo:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var berthAndOperationInfo = me.getViewModel().getStore('berthAndOperationInfo');
		
		berthAndOperationInfo.setData(masterItem.berthAndOperationInfo[0]);
		berthAndOperationInfo.commitChanges();
	},
	
	setVORSummary:function(masterItem){
		
		var me = this;
		var refs = me.getReferences();
		var vorSummary = me.getViewModel().getStore('vorSummary');
		
		vorSummary.setData(masterItem.vorSummary);
		vorSummary.commitChanges();
	},
	
	setVORDelaySummary:function(masterItem){
		
		var me = this;
		var refs = me.getReferences();
		var vorDelaySummary = me.getViewModel().getStore('vorDelaySummary');
		
		vorDelaySummary.setData(masterItem.vorDelaySummary);
		vorDelaySummary.commitChanges();
		
		me.onAddTotalDelayVorSummary();
	},
	
	onAddTotalDelayVorSummary:function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('vorDelaySummary');
		var storeData = store.getData();
		var idx = 0;
		var totalDelay = 0;
		
		for(idx =0;idx < storeData.length;idx++ ){
			totalDelay += Number(storeData.getAt(idx).get("totalHRS"));
		}
		
		refs.refVORSummaryTotalDelayTime.setValue(totalDelay);
	},
	
	setCargoSummary:function(masterItem){
		
		var me = this;
		var refs = me.getReferences();
		var cargoSummary = me.getViewModel().getStore('cargoSummary');
		var grid = me.lookupReference('refCargoSummaryGrid');
		var editor = grid.getPlugin('cargoSummaryGridEditor');
		cargoSummary.setData(masterItem.cargoSummary);	
		cargoSummary.commitChanges();
		
		//Set Dis/Load amount
		if(masterItem.amountCargoSummary.length > 0){
			me.onLoadAmountBalanceInfo(masterItem.amountCargoSummary[0]);
		}
	},
	
	setDelaySummary:function(masterItem){
		
		var me = this;
		var refs = me.getReferences();
		var delaySummary = me.getViewModel().getStore('delaySummary');
		
		delaySummary.setData(masterItem.delaySummary);
		if(masterItem.delaySummary.length > 0){
			me.calcDelayTime();
		}else{
			refs.refVORTotalDelayTime.setValue("");
		}
		delaySummary.commitChanges();
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		if(targetControl == 'ctlJpvc'){ 
			if(returnValue){
				me.getViewModel().setData({theVessel:returnValue.item});
				me.onSearch();
			}else {
				me.getViewModel().setData({theVessel:null});
			}
		}else if(targetControl === 'refTxtDelayCode'){
			if(returnValue){
				refs.refTxtDelayCode.setValue(returnValue.rsnCd);
				refs.refTxtDelayCodeName.setValue(returnValue.rsnCdNm);
				refs.refTxtAcptYN.setValue(returnValue.acptYN);
			}
		}
	},
	
	onVORSummaryDblClick: function() {
		var me = this;
		var grid = me.lookupReference('refVORSummaryGrid');

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		selection.set('vesselSchInfo', me.getViewModel().getData('theVessel'));

		if(selection == null) return;
		me.getView().detailViewAlias = 'app-vorliquidbulkdetail';
		me.openDetailPopup(selection, 'VOR for Liquid Bulk');
	},
	
	onCreate: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refVORSummaryGrid');
		var store = me.getStore('vorLiquidBulk');
		
		var theCgOprType = me.getViewModel().get('theCgOprType');
		
		me.clearData();
		if(store.loadCount <= 0 && (refs.ctlJpvc.getValue() === null || refs.ctlJpvc.getValue() === '')){
			MessageUtil.alert('Warning', 'vorExistedVslCallId');
		}else if(theCgOprType === null){
			MessageUtil.alert('Warning', 'vorNoCgOpeInfo');
		}else if(refs.ctlJpvc.getValue() != null && refs.ctlJpvc.getValue() != ''){
			var recvData = Ext.create('MOST.model.operation.VORLiquidBulk');
			recvData.data.searchType = 'NEW';

			if(theCgOprType.tlsOprYn == 'Y'){
				recvData.data.opeTp = 'TLS';
			}
			if(theCgOprType.stsOprYn == 'Y'){
				recvData.data.opeTp = 'STS';
			}
			if(theCgOprType.genOprYn == 'Y'){
				recvData.data.opeTp = 'GEN';
			}
			me.getView().detailViewAlias = 'app-vorliquidbulkdetail';
			recvData.data.workingStatus = WorkingStatus.INSERT;
			recvData.data.vslCallId = refs.ctlJpvc.getValue();
			me.openDetailPopup(recvData, 'VOR for Liquid Bulk');
		}

	},

	onNewDelaySummary: function(){
		var me = this;
		me.getViewModel().set('selectedDelay', Ext.create('MOST.model.operation.VORLiquidBulk'));	
	},

	onDelete: function() {
		var me = this;
		var refs = me.getReferences();
		var tabPanel = refs.refVORLiquidBulkTabPanel.getActiveTab().name.trim();
		
		switch (tabPanel) {
			case 'Delay Summary':
				me.onDeleteDelaySummary();
				break;
			case 'VOR summary':
				me.onDeleteVorSummary();
				break;
		}
		
	},
	
	//Delete from VOR Summary tab
	onDeleteVorSummary:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = grid = me.lookupReference('refVORSummaryGrid');
		var selection = grid.getSelection() === null ? null : grid.getSelection();
		if(selection === null) return;
		
		MessageUtil.question('remove', 'infodelete_msg', null,
				function(button){
					if (button === 'ok') {
						var sendArray = new Array();
						var detailItem = me.getViewModel().get('theVOR');
						if(detailItem === null){
							detailItem = Ext.create('MOST.model.operation.VORLiquidBulk');
						}
						
						Ext.each(selection, function (record) {
							record.set('workingStatus', WorkingStatus.DELETE);
							record.set("insertType", 'deleteVOR');
							sendArray.push(record.data);
						});
						
						if(sendArray.length > 0){
							var proxy = detailItem.getProxy();
							proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/vorliquidbulk/detail';
							
							detailItem.set("vorLiquidBulk", sendArray);
							
							detailItem.save({
								success : function(records,success){
									me.onSearch();
									MessageUtil.saveSuccess();
								}
							});
							
						}
					}
				}
		);
	},
	
	//Delete from Delay Summary tab
	onDeleteDelaySummary:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refVORDelaySummaryGrid');
		var selection = grid.getSelection() === null ? null : grid.getSelection();
		if(selection === null) return;
		
		MessageUtil.question('remove', 'infodelete_msg', null,
				function(button){
					if (button === 'ok') {
						var sendArray = new Array();
						var detailItem = me.getViewModel().get('theVOR');
						if(detailItem === null){
							detailItem = Ext.create('MOST.model.operation.VORLiquidBulk');
						}
						
						Ext.each(selection, function (record) {
							record.set('workingStatus', WorkingStatus.DELETE);
							record.set("insertType", 'delayProc');
							sendArray.push(record.data);
						});
						
						if(sendArray.length > 0){
							var proxy = detailItem.getProxy();
							proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/vorliquidbulk/detail';
							
							detailItem.set("vorLiquidBulk", sendArray);
							
							detailItem.save({
								success : function(records,success){
									me.onSearch();
									MessageUtil.saveSuccess();
								}
							});
							
						}
					}
				}
		);
	},
	
	setFmTimeByShift: function(){
		var me = this;
		var refs = me.getReferences();
		var shiftListStore = me.getStore('shiftList');
		if(shiftListStore.loadCount <= 0){
			shiftListStore.load();
		}
		var shftId= refs.refShift.getValue();
		var shift = shiftListStore.findRecord('shftId', shftId);
		var fmShiftTime = Ext.Date.parse(refs.refWorkYmd.rawValue + ' ' + shift.get('fmHhmm').substr(0,2) + ':' + shift.get('fmHhmm').substr(2,2),  'd/m/Y H:i');
		
		return fmShiftTime;
		var toShiftTime = Ext.Date.parse(refs.refWorkYmd.rawValue + ' ' + shift.get('toHhmm').substr(0,2) + ':' + shift.get('toHhmm').substr(2,2),  'd/m/Y H:i');
		if(shftId == 'SF0013'){
			toShiftTime.setDate(toShiftTime.getDate() + 1);
		}
	},
	
	setToTimeByShift: function(){
		var me = this;
		var refs = me.getReferences();
		
		var shiftListStore = me.getStore('shiftList');
		if(shiftListStore.loadCount <= 0){
			shiftListStore.load();
		}
		var shftId= refs.refShift.getValue();
		var shift = shiftListStore.findRecord('shftId', shftId);
		
		var toShiftTime = Ext.Date.parse(refs.refWorkYmd.rawValue + ' ' + shift.get('toHhmm').substr(0,2) + ':' + shift.get('toHhmm').substr(2,2),  'd/m/Y H:i');
		if(shftId == 'SF0013'){
			toShiftTime.setDate(toShiftTime.getDate() + 1);
		}
		
		return toShiftTime;
		
	},
	
	// Tab Change Event
	onTabChange: function(tabPanel, newCard, oldCard, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var tabTitle = tabPanel.getActiveTab().title.trim();
		var grid;
		
		switch (tabTitle) {
			case 'Delay Summary':
				grid = me.lookupReference('refVORSummaryGrid');
				break;
			case 'VOR summary':
				grid = me.lookupReference('refVORDelaySummaryGrid');
				break;
		}
		
		if (grid) {
			grid.getSelectionModel().deselectAll();
			grid.getSelectionModel().clearSelections();
		}
	},
	
	/**
	 * =========================================================================================================================
	 * DETAIL START
	 */
	// Detail Load
	onDetailLoad:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		me.setDetailInitialize();
	},
	
	// Detail Initialize
	setDetailInitialize:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		
		me.getViewModel().set('selectedCargoSummary', Ext.create('MOST.model.operation.VORLiquidBulk'));
		me.getViewModel().set('selectedDelay', 		Ext.create('MOST.model.operation.VORLiquidBulk'));
		
		var recvData = detailView.items.get(0).recvData;
		me.opeTp = recvData.data.opeTp;
		this.setDetailControl(recvData);
		
		refs.ctlCargoType.setReadOnly(true);
		refs.ctlTerminalOperator.setReadOnly(true);
		refs.ctlPkgType.setReadOnly(true);
		refs.ctlShipper.setReadOnly(true);
		refs.ctlConsigne.setReadOnly(true);
		//refs.ctlLoadDischarge.setReadOnly(true);		
	
	},
	
	clearData: function(){
		var me = this;
		var cargoSummary = me.getViewModel().getStore('cargoSummary');
		var delaySummary = me.getViewModel().getStore('delaySummary');
		
		cargoSummary.removeAll();
		delaySummary.removeAll();

		cargoSummary.clearData();
		delaySummary.clearData();
		
	},
	
	setVORInitializeInfo:function(){
		var me = this;
		var refs = me.getReferences();
		var vorLiquidBulkDetail = me.getStore('vorLiquidBulkDetail');
		
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		
		refs.refVORCargoSummaryPnl.setLoading(true);
		refs.refVORDelaySummaryPnl.setLoading(true);
		
		if(refs.refShift.getValue() && refs.refWorkYmd.getValue()){
			//Enabled Cargo Summary and Delay Summary tab
			refs.refCargoSummary.setDisabled(false);
			refs.refDelaySummary.setDisabled(false);
			
			vorLiquidBulkDetail.load({
				params: {
					vslCallId : refs.refVslCallId.getValue(),
					shift : refs.refShift.getValue(),
					workYmd : Ext.Date.format(refs.refWorkYmd.getValue(), MOST.config.Locale.getShortDate()),
					opeTp: recvData.data.opeTp
				},
				callback: function(records, operation, success) {
					if (success) {
						if (records.length > 0) {
							var theModel = Ext.create('MOST.model.operation.VORLiquidBulk');
							theModel.phantom = false; // UPDATE
							theModel.data = records[0].data;
							me.getViewModel().setData({theVOR:theModel});
							
							me.setVesselShifting(records[0].data);
							me.setCargoSummary(records[0].data);
							me.setDelaySummary(records[0].data);
							
							me.setVORLiquidBulkTabPanel();
							
							var delayTimeSumStore = me.getStore('delayTimeSum');
							delayTimeSumStore.load({
								params : {
									vslCallId : refs.refVslCallId.getValue(),
									shift : refs.refShift.getValue(),
									workYmd : Ext.Date.format(refs.refWorkYmd.getValue(), MOST.config.Locale.getShortDate())
								},callback: function(records, operation, success) {
									if (success) {
										if (records.length > 0) {
											me.getViewModel().setData({theDelayTime:records});
										}else{
											me.getViewModel().setData({theDelayTime:null});
										}
									}else{
										me.getViewModel().setData({theDelayTime:null});
									}
								}
							});							
						}else{
							refs.refVORTotalDelayTime.setValue("");
						}
						
						refs.refVORCargoSummaryPnl.setLoading(false);
						refs.refVORDelaySummaryPnl.setLoading(false);
					}
				}
			});
		} else {
			refs.refVORCargoSummaryPnl.setLoading(false);
			refs.refVORDelaySummaryPnl.setLoading(false);
		}
	},
	
	// Detail Control Setting
	setDetailControl:function(recvData){
		var me = this;
		var refs = me.getReferences();
		
		var items = me.getViewModel().get('theVessel');
		
		var shiftListStore = me.getStore('shiftList');
		if(shiftListStore.loadCount <= 0){
			shiftListStore.load();
		}
		
		var vorLiquidBulkDetail = me.getStore('vorLiquidBulkDetail');
		
		me.loadCombo(recvData);
		
		if(recvData != null && recvData.get('searchType') === 'NEW' && recvData.get('workingStatus') === 'C'){
			refs.refCargoSummary.setDisabled(true);
			refs.refDelaySummary.setDisabled(true);
		}
		
		if(recvData != null && recvData.get(WorkingStatus.FIELD_NAME) != WorkingStatus.INSERT){
			me.getViewModel().setData({theCargo:recvData.data});
			refs.refWorkYmd.setValue(recvData.data.workYmd);
			refs.refShift.setValue(recvData.data.shftId);
			vorLiquidBulkDetail.load({
				params: {
					vslCallId : recvData.data.vslCallId,
					shift : recvData.data.shftId,
					workYmd : recvData.data.workYmd,
					opeTp: me.opeTp
				},
				callback: function(records, operation, success) {
					if (success) {
						if (records.length > 0) {
							var theModel = Ext.create('MOST.model.operation.VORLiquidBulk');
							theModel.phantom = false; // UPDATE
							theModel.data = records[0].data;
							me.getViewModel().setData({theVOR:theModel});

							me.setVesselShifting(records[0].data);
							me.setCargoSummary(records[0].data);
							me.setDelaySummary(records[0].data);
						}
					}
				}
			});
			if(recvData.data.opeTp === 'STS'){
				refs.refVORTerminalOperator.setVisible(false);
				
				refs.refVORNoForLoading.setVisible(false);
				refs.refVORNoForDischarging.setVisible(false);
				refs.refVORTerminalOperator1.setVisible(false);
				refs.refVORTerminalOperator2.setVisible(false);
				refs.refVORTerminalOperator3.setVisible(false);
				refs.refVORTerminalOperator4.setVisible(false);
				refs.refVORFender.setVisible(true);
			}else{
				refs.refVORTerminalOperator.setVisible(true);
				
				refs.refVORNoForLoading.setVisible(true);
				refs.refVORNoForDischarging.setVisible(true);
				refs.refVORTerminalOperator1.setVisible(true);
				refs.refVORTerminalOperator2.setVisible(true);
				refs.refVORTerminalOperator3.setVisible(true);
				refs.refVORTerminalOperator4.setVisible(true);
				refs.refVORFender.setVisible(false);
			}

			if(recvData.data.searchType !== 'NEW'){
				refs.refWorkYmd.setReadOnly(true);
				refs.refShift.setReadOnly(true);
			}
		}
		if (items != null) {
			refs.refOGAStatus.setValue(items.data.ogaStatus);
			refs.refOGADate.setValue(items.data.ogaStatusDate);
			refs.refOGAQuarantine.setValue(items.data.ogaQuarantine);
		}
		
		var theCgOprType = me.getViewModel().get('theCgOprType');
		if(recvData.data.opeTp === null || recvData.data.opeTp != 'STS'){
			if(theCgOprType.stsOprYn == 'Y'){
				if(refs.ctlVORSTSOperation.checked == true){
					refs.refVORTerminalOperator.setVisible(false);
					
					refs.refVORNoForLoading.setVisible(false);
					refs.refVORNoForDischarging.setVisible(false);
					refs.refVORTerminalOperator1.setVisible(false);
					refs.refVORTerminalOperator2.setVisible(false);
					refs.refVORTerminalOperator3.setVisible(false);
					refs.refVORTerminalOperator4.setVisible(false);
					refs.refVORFender.setVisible(true);
				}else{
					refs.refVORTerminalOperator.setVisible(true);
					
					refs.refVORNoForLoading.setVisible(true);
					refs.refVORNoForDischarging.setVisible(true);
					refs.refVORTerminalOperator1.setVisible(true);
					refs.refVORTerminalOperator2.setVisible(true);
					refs.refVORTerminalOperator3.setVisible(true);
					refs.refVORTerminalOperator4.setVisible(true);
					refs.refVORFender.setVisible(false);
				}
			}
		}

	},
	
	loadCombo:function(recvData){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refVORSummaryGrid');
		//var operationTpCombo = me.getStore('operationTpCombo');
		var cargoLiquidCombo = me.getStore('cargoLiquidCombo');
		var hoseTpCombo = me.getStore('hoseTpCombo');
		var shiftListStore = me.getStore('shiftList');
		var delayCodeList = me.getStore('delayCodeList');
		
		var theCgOprType = me.getViewModel().get('theCgOprType');
		var opeTp;
		
		if(theCgOprType.tlsOprYn == 'Y'){
			if(refs.ctlVORTranshipment.checked == true){
				opeTp = 'TLS';
			}
		}
		if(theCgOprType.stsOprYn == 'Y'){
			if(refs.ctlVORSTSOperation.checked == true){
				opeTp = 'STS';
			}
		}
		if(theCgOprType.genOprYn == 'Y'){
			if(refs.ctlVORLoadDischarge.checked == true){
				opeTp = 'GEN';
			}
		}
		
		//operationTpCombo.load();
		cargoLiquidCombo.load();
		hoseTpCombo.load({
			params : {
				opeTp : opeTp
			},
		});
		
		shiftListStore.load();
		delayCodeList.load();
		
		var operationTpCombo = me.getStore('operationTpCombo');
		operationTpCombo.load();
//		operationTpCombo.load({
//			params : {
//				comboType : 'CGOPETP'
//			}
//		});
		
		var cmdtCombo = me.getStore('cmdtCombo');
		cmdtCombo.load({
			params : {
				comboType : 'Cmdt',
				vslCallId : recvData.data.vslCallId,
				opeTp : opeTp
			},
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						for(var i = 0; i < records.length; i++){
							me.getViewModel().setData({theCmdt:records[i].data});
						}
					}
				}
			}
		});
		
		var tkOprCombo = me.getStore('tkOprCombo');
		tkOprCombo.load({
			params : {
				comboType : 'TkOpr',
				vslCallId : recvData.data.vslCallId,
			},
		});
		
		var shprCnsneCombo = me.getStore('shprCnsneCombo');
		shprCnsneCombo.load({
			params : {
				comboType : 'ShprCnsne',
				vslCallId : recvData.data.vslCallId,
			},
		});
		
		var cnsneCombo = me.getStore('cnsneCombo');
		cnsneCombo.load({
			params : {
				comboType : 'Cnsne',
				vslCallId : recvData.data.vslCallId,
			},
		});
		
		
		var pkgTpCombo = me.getStore('pkgTpCombo');
		pkgTpCombo.load({
			params : {
				comboType : 'PkgTp',
				vslCallId : recvData.data.vslCallId,
			},
		});
		
		var delayTimeSumStore = me.getStore('delayTimeSum');
		delayTimeSumStore.load({
			params : {
				vslCallId : recvData.data.vslCallId,
				shift : recvData.data.shftId,
				workYmd : recvData.data.workYmd,
			},callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						me.getViewModel().setData({theDelayTime:records});
					}
				}
			}
		});
		
	},
	
	onCargoSummaryDblClick: function(){
		var me = this;
		var grid = me.lookupReference('refCargoSummaryGrid');
		var refs = me.getReferences();
		
		var operationTpCombo = me.getStore('operationTpCombo');
		var cargoLiquidCombo = me.getStore('cargoLiquidCombo');
		var hoseTpCombo = me.getStore('hoseTpCombo');
		
		var theCgOprType = me.getViewModel().get('theCgOprType');
		var opeTp;
		
		if(theCgOprType.tlsOprYn == 'Y'){
			if(refs.ctlVORTranshipment.checked == true){
				opeTp = 'TLS';
			}
		}
		if(theCgOprType.stsOprYn == 'Y'){
			if(refs.ctlVORSTSOperation.checked == true){
				opeTp = 'STS';
			}
		}
		if(theCgOprType.genOprYn == 'Y'){
			if(refs.ctlVORLoadDischarge.checked == true){
				opeTp = 'GEN';
			}
		}
		
		if(operationTpCombo.loadCount <= 0){
			operationTpCombo.load();
		}
		if(cargoLiquidCombo.loadCount <= 0){
			cargoLiquidCombo.load();
		}
		
		hoseTpCombo.load({
			params : {
				opeTp : opeTp
			},
		});
		
		var selection = grid.getSelection() === null ? null : grid.getSelection()[0];
		
		if(selection === null) return;
		
		var cmdtCombo = me.getStore('cmdtCombo');
		
		
		
		if(cmdtCombo.loadCount <= 0){
			cmdtCombo.load({
				params : {
					comboType : 'Cmdt',
					vslCallId : recvData.data.vslCallId,
					opeTp : recvData.data.opeTp,
				},
			});
		}

		
		var tkOprCombo = me.getStore('tkOprCombo');
		if(tkOprCombo.loadCount <= 0){
			tkOprCombo.load({
				params : {
					comboType : 'TkOpr',
					vslCallId : recvData.data.vslCallId,
				},
			});
		}
		
		
		var shprCnsneCombo = me.getStore('shprCnsneCombo');
		if(shprCnsneCombo.loadCount <= 0){
			shprCnsneCombo.load({
				params : {
					comboType : 'ShprCnsne',
					vslCallId : recvData.data.vslCallId,
				},
			});
		}
		
		
		var cnsneCombo = me.getStore('cnsneCombo');
		if(cnsneCombo.loadCount <= 0){
			cnsneCombo.load({
				params : {
					comboType : 'Cnsne',
					vslCallId : recvData.data.vslCallId,
				},
			});
		}
		
		
		var pkgTpCombo = me.getStore('pkgTpCombo');
		if(pkgTpCombo.loadCount <= 0){
			pkgTpCombo.load({
				params : {
					comboType : 'PkgTp',
					vslCallId : recvData.data.vslCallId,
				},
			});
		}

	},
	
	onChangeMT: function(){
		var me = this;
		var grid = me.lookupReference('refCargoSummaryGrid');
		var refs = me.getReferences();
		var store = me.getStore('cargoSummary');
		var editor = grid.getPlugin('cargoSummaryGridEditor');
		var berthOperation = me.getViewModel().get('theBerthing');
		
	},
	
	onDelaySummaryDblClick: function(){
//		var me = this;
//		var grid = me.lookupReference('refDelaySummaryGrid');
//		var cargoLiquidCombo = me.getStore('cargoLiquidCombo');
//			cargoLiquidCombo.load();
//		
//		var selection = grid.getSelection() === null ? null : grid.getSelection()[0];
//		
//		if(selection === null) return;
	},
	
	onGridComboRenderer: function(val, cell){
		var me = this;
        var refs = me.getReferences();
		var codeComboStore = null;
		var displayFieldName = 'scdNm';
		var codeFieldName = 'scd';
		if(cell.column.dataIndex == 'cgTpCd'){ 	
			codeComboStore = me.getViewModel().getStore('cargoLiquidCombo');
		}else if(cell.column.dataIndex == 'jobTpCd'){ 	
			codeComboStore = me.getViewModel().getStore('operationTpCombo');
		}else if(cell.column.dataIndex == 'hoseTpCd'){ 	
			codeComboStore = me.getViewModel().getStore('hoseTpCombo');
		}else if(cell.column.dataIndex == 'tkOpr'){ 	
			codeComboStore = me.getViewModel().getStore('tkOprCombo');
		}else if(cell.column.dataIndex == 'cmdtCd'){ 	
			codeComboStore = me.getViewModel().getStore('cmdtCombo');
		}else if(cell.column.dataIndex == 'shprCnsne'){ 	
			codeComboStore = me.getViewModel().getStore('shprCnsneCombo');
		}
		if(codeComboStore != null){
			var indx = -1;
			
			if(cell.column.dataIndex == 'cgTpCd'){
				indx = codeComboStore.find(codeFieldName, val);
			}else if(cell.column.dataIndex == 'jobTpCd'){
				indx = codeComboStore.find(codeFieldName, val);
			}else if(cell.column.dataIndex == 'hoseTpCd'){
				indx = codeComboStore.find(codeFieldName, val);
			}else if(cell.column.dataIndex == 'tkOpr'){
				indx = codeComboStore.find('tkOpr', val);
			}else if(cell.column.dataIndex == 'cmdtCd'){
				indx = codeComboStore.find('cmdtCd', val);
			}else if(cell.column.dataIndex == 'shprCnsne'){
				indx = codeComboStore.find('shprCnsne', val);
			}else if(cell.column.dataIndex == 'cnsne'){
				indx = codeComboStore.find('cnsne', val);
			}					

			if (indx != -1){
				return codeComboStore.getAt(indx).get(displayFieldName); 
			}
		}
		
		return '';
	},
	
	onCancelEdit : function(rowEditing, context) {
		var me = this;
		me.gridCancelEdit(rowEditing, context);
	},
	
	// Grid Edit
	onEditCargoSummary : function(editor, context){
		context.record.data.workingStatus = context.record.crudState;
	},
	
	// Grid Edit
	onEdit : function(editor, context){
		var me = this;
		context.record.data.workingStatus = context.record.crudState;
		me.calcDelayTime();
	},
	
	// Toolbar Save Button
	onDetailSave:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theMain');
		
		var grid = me.lookupReference('refCargoSummaryGrid');
		var store = me.getStore('cargoSummary');
		//var editor = grid.getPlugin('cargoSummaryGridEditor');
		
		if(detailView){
			var infoForm = detailView.down('form').getForm();
			
			detailView.getEl().mask('Processing...');
			me.saveProcess();
		}
	},
	
	// WEB VOR Liquid Bulk - Tab Cargo Summary
	onAddCargoSummary: function() {
		var me = this;
		var refs = me.getReferences();
		var theCgOprType = me.getViewModel().get('theCgOprType');
		var cmdtCombo = me.getStore('cmdtCombo');
		var vesselShifting = me.getStore('vesselShifting');
		var opeTp;
		
		var theVessel = me.getViewModel().get('theVessel');
		if(theVessel.get('currAtb')){
			if(	refs.refOGAStatus.getValue() === 'HOLD' || 
					refs.refOGAStatus.getValue() === 'IN PROGRESS' || 
					refs.refOGAStatus.getValue() === 'N/A' || 
					refs.refOGAStatus.getValue() === 'REJECT'){
				
				MessageUtil.question('OGA',  
						Ext.String.format('Application for health clearance is {0}. Vessel is {1}. Do you want to continue?', 
								refs.refOGAStatus.getValue(), 
								refs.refOGAQuarantine.getValue()), null,
								function(button){
									if (button === 'ok') {
										me.onAdd();
									}
								}
						);
				}else{
					//MessageUtil.info('Information', 'OGA status is approved.');
					me.onAdd();
				}
		}
		else {
			if(theVessel.get('vslShiftingYN')== 'Y'){
				MessageUtil.warning('warning_msg', 'vorLQ_updateATB_Shifting' );
				return;	
			} else {
				MessageUtil.warning('warning_msg', 'vorLQ_updateATB_VslSchedule' );
				return;
			}
		}
	},
	
	onAdd: function(){
		var me = this;
		var refs = me.getReferences();
		var theCgOprType = me.getViewModel().get('theCgOprType');
		var cmdtCombo = me.getStore('cmdtCombo');
		var opeTp;		
		var theVessel = me.getViewModel().get('theVessel');
		
		var detailView = me.getDetailBizView();
		if(detailView){
			var infoForm = detailView.down('form').getForm();
		
			if(!infoForm.isValid()){
				MessageUtil.mandatoryFieldInValid();
				return;
			}
		}
		
		if(theCgOprType.tlsOprYn == 'Y'){
			if(refs.ctlVORTranshipment.checked == true){
				opeTp = 'TLS';
			}
		}
		if(theCgOprType.stsOprYn == 'Y'){
			if(refs.ctlVORSTSOperation.checked == true){
				opeTp = 'STS';
			}
		}
		if(theCgOprType.genOprYn == 'Y'){
			if(refs.ctlVORLoadDischarge.checked == true){
				opeTp = 'GEN';
			}
		}
		
		if((refs.refWorkYmd.getValue() != null && refs.refWorkYmd.getValue() != '') && (refs.refShift.getValue() != null && refs.refShift.getValue() != '')){
			var complete = false;
	    	
	    	if (refs.ctlLoadDischarge.getValue() == 'DS' || refs.ctlLoadDischarge.getValue() == 'SD' || refs.ctlLoadDischarge.getValue() == 'TD'){
				if((Number(refs.ctlDisBalance.getValue()) - Number(refs.ctlTonHdlAmt.getValue())) < 1){
					complete = true;
				}
			} else if (refs.ctlLoadDischarge.getValue() == 'LD' || refs.ctlLoadDischarge.getValue() == 'SL' || refs.ctlLoadDischarge.getValue() == 'TL'){
				if((Number(refs.ctlLoadBalance.getValue()) - Number(refs.ctlTonHdlAmt.getValue())) < 1){
					complete = true;
				}
			}
	    	
	    	if(complete && !refs.ctlJobCmplYn.getValue()){
	    		MessageUtil.questionModern('confirm', 'vorLQ_Complete_confirm', null, function (button) {
					if (button === 'ok') {
						refs.ctlJobCmplYn.setValue(true);
						me.onAddingCargoProceed();
					}
					else {
						refs.ctlJobCmplYn.setValue(false);
						me.onAddingCargoProceed();
					}
				});
	    	}
	    	else {
	    		me.onAddingCargoProceed();
	    	}
		} else{
			MessageUtil.alert('Warning', 'vorExistedShiftDate');
		}
	},
	
	
	// WEB - ADD - Tab Cargo Summary
	onAddingCargoProceed: function(){
		var me = this;
		var refs = me.getReferences();
		var theCgOprType = me.getViewModel().get('theCgOprType');
		var cmdtCombo = me.getStore('cmdtCombo');
		var opeTp;		
		var theVessel = me.getViewModel().get('theVessel');
		var vesselShifting = me.getViewModel().getStore('vesselShifting');
		var shiftId = MOST.config.Token.getWorkShift();
		
		var grid = me.lookupReference('refCargoSummaryGrid');
		var store = me.getStore('cargoSummary');
		var selectedRecord = me.getViewModel().get('selectedCargoSummary');
		
		var record = Ext.create('MOST.model.operation.VORLiquidBulk');
		var shiftListStore = me.getStore('shiftList');
		if(shiftListStore.loadCount <= 0){
			shiftListStore.load();
		}
		
		var operationTpCombo = me.getStore('operationTpCombo');
		if(operationTpCombo.loadCount <= 0){
			operationTpCombo.load();
		}
		
		var cargoLiquidCombo = me.getStore('cargoLiquidCombo');
		if(cargoLiquidCombo.loadCount <= 0){
			cargoLiquidCombo.load();
		}
		
		var idx = 0;
		if(grid.getSelection() && grid.getSelection().length>0) {
			idx = store.indexOfId(grid.getSelection()[0].get('id'));
		}
		
		record.set('cmdtCd', 	refs.ctlCommodityCombo.getValue());
//		cmdtCd = refs.ctlCommodityCombo.getValue();
//		cmdt = cmdtCombo.findRecord('cmdtCd', cmdtCd);
//		seq = cmdt.data.no;
		if(refs.ctlCommodityCombo.selection){
			seq = refs.ctlCommodityCombo.selection.data.no;
		}
		else {
			seq = selectedRecord.get('seqCS2');
		}
		
		record.set('seqCS2', seq);
		
		record.set('cgTpCd', 	refs.ctlCargoType.getValue());
		record.set('tkOpr', 	refs.ctlTerminalOperator.getValue());
		record.set('pkgTpCd', 	refs.ctlPkgType.getValue());
		record.set('tonHdlAmt', refs.ctlTonHdlAmt.getValue());
		record.set('jobTpCd', 	refs.ctlLoadDischarge.getValue());
		record.set('shprCnsne', refs.ctlShipper.getValue());
		record.set('cnsne', 	refs.ctlConsigne.getValue());
		record.set('hoseTpCd', 	refs.ctlVORLines.getValue());
		record.set('pumpRate', 	refs.ctlPumpRate.getValue());
		
		record.set('hoseOnDt', 	refs.ctlHoseOnDt.getValue());
		record.set('stDt', 		refs.ctlStDt.getValue());
		record.set('endDt', 	refs.ctlEndDt.getValue());
		record.set('hoseOffDt', refs.ctlHoseOffDt.getValue());

		record.set('lineNo', 	refs.ctlLineNo.getValue());
		if(refs.ctlJobCmplYn.getValue() === true){
			record.set('jobCmplYn', 'Y');
		}else{
			record.set('jobCmplYn', 'N');
		}
		record.set('userId', 	MOST.config.Token.getUserId());
		record.set('vslCallId', refs.refVslCallId.getValue());
		record.set('workYmd', 	refs.refWorkYmd.rawValue);
		record.set('shftId', 	refs.refShift.getValue());
		record.set('insertType', 'cargoProc');
		record.set('workingStatus', 'C');
		record.set('vslShiftingSeq', theVessel.get('vslShiftingSeq'));
		if(me.onCagoSummaryValidation(record)){
			store.insert(idx, record);
			grid.getSelectionModel().select(record);
		}
//		if(me.onCagoSummaryValidation(record)){
//			if( vesselShifting && vesselShifting.getData().length == 0) {
//				MessageUtil.questionModern('Confirm','vorExistedStartEndTime', null,function(button){
//					if(button === 'ok'){
//						store.insert(idx, record);
//						grid.getSelectionModel().select(record);
//					}
//				});
//			} else if( vesselShifting && vesselShifting.getData().length > 0) {
//				MessageUtil.questionModern('Confirm','vorExistedVesselShifting', null,function(button){
//					if(button === 'ok'){
//						store.insert(idx, record);
//						grid.getSelectionModel().select(record);
//					}
//				});
//			}
//		}
	},
	
	onRemoveCargoSummary: function() {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refCargoSummaryGrid');
		var store = me.getStore('cargoSummary'); 
		
		var selection = grid.getSelection() === null ? null : grid.getSelection();
		if(selection === null) return;
		
		Ext.each(selection, function (record) {
			record.set('workingStatus', WorkingStatus.DELETE);
			record.set("vslCallId", refs.refVslCallId.getValue());
			record.set("insertType", 'cargoProc');
			store.remove(record);
		});
	},
	
	onAddDelaySummary: function() {
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theCgOprType');
		
		if((refs.refWorkYmd.getValue() != null && refs.refWorkYmd.getValue() != '') && (refs.refShift.getValue() != null && refs.refShift.getValue() != '')){
			var grid = me.lookupReference('refDelaySummaryGrid');
			var store = me.getStore('delaySummary');
			var record = Ext.create('MOST.model.operation.VORLiquidBulk'); 
			me.getViewModel().set('selectedDelay', record);	
			
			var idx = 0;
			if(grid.getSelection() && grid.getSelection().length>0) {
				idx = store.indexOfId(grid.getSelection()[0].get('id'));
			}
			
			if(detailItem.tlsOprYn == 'Y'){
				record.set("opeTp", 'TLS');
			}
			if(detailItem.stsOprYn == 'Y'){
				record.set("opeTp", 'STS');
			}
			if(detailItem.genOprYn == 'Y'){
				record.set("opeTp", 'GEN');
			}
			
			record.set("delayCode", 	refs.refTxtDelayCode.getValue());
			record.set("delayDesc", 	refs.refTxtDelayCodeName.getValue());
			record.set("accDelay", 		refs.refTxtAcptYN.getValue());
			record.set("cgTpCd", 		refs.refCargoType.getValue());
			record.set("remark", 		refs.refRemarks.getValue());
			record.set("vslCallId", 	refs.refVslCallId.getValue());
			record.set("workYmd", 		refs.refWorkYmd.rawValue);	
			record.set("startTime", 	refs.refDelayStartTime.getValue());
			record.set("endTime", 		refs.refDelayEndTime.getValue());
//			record.set("startTime", 	me.setFmTimeByShift());
//			record.set("endTime", 		me.setToTimeByShift());
			record.set("shftId", 		refs.refShift.getValue());
			record.set("insertType", 	'delayProc');
			record.set("userId", 		MOST.config.Token.getUserId());
			record.set("workingStatus",	WorkingStatus.INSERT);
			
			me.calcRowDelayTime();
			
			//Mandantory validation
			if((StringUtil.isNullorEmpty(refs.refTxtDelayCode.getValue())) 
					|| (StringUtil.isNullorEmpty(refs.refCargoType.getValue())) 
					|| !refs.refDelayStartTime.getValue() 
					|| !refs.refDelayEndTime.getValue()){
				MessageUtil.warning('warning_msg','MANDATORY: Delay Code, Cargo Type, Start/ End Time');
				return;
			}
			
			if(me.onDelaySummaryValidation(record)){
				store.insert(idx, record);
				grid.getSelectionModel().select(record);
			}
			me.onNewDelaySummary();
		}else{
			MessageUtil.alert('Warning', 'vorExistedShiftDate');
		}
	},
	
	onRemoveDelaySummary: function() {
		var me = this;
		var grid = me.lookupReference('refDelaySummaryGrid');
		var store = me.getStore('delaySummary'); 
		
		var selection = grid.getSelection() === null ? null : grid.getSelection();
		if(selection === null) return;
		
		Ext.each(selection, function (record) {
			record.set('workingStatus', WorkingStatus.DELETE);
			record.set("insertType", 'delayProc');
			store.remove(record);
		});
	},
	
	 onSaveDelaySummary: function(){
    	var me = this;
		var refs = me.getReferences();
		var store = me.getStore('delaySummary');
		var grid = me.lookupReference('refDelaySummaryGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		//Added by Harry
		selection.set('delayCode',refs.refTxtDelayCode.getValue());
		selection.set('delayDesc',refs.refTxtDelayCodeName.getValue());
		selection.set('accDelay',refs.refTxtAcptYN.getValue());
		selection.set('cgTpCd',refs.refCargoType.getValue());
		selection.set('startTime',refs.refDelayStartTime.getValue());
		selection.set('endTime',refs.refDelayEndTime.getValue());
		selection.set('remark',refs.refRemarks.getvalue());
		selection.set('timeHourMin',refs.refDelayTimeHourMin.getValue());
		selection.set('timeHourly',refs.refDelayTimeHourly.getValue());
		
		if(me.onDelaySummaryValidation(selection)){
	    	selection.set('workingStatus','U');
    	}

//		var bValidation = true
//		store.getModifiedRecords().forEach(function(record, index, array){
//			if(!me.onDelaySummaryValidation(record)){
//				bValidation = false;
//				return
//			}
//		});
		
//		if(bValidation){
//			me.saveProcess();
//		}
    },

    onDelaySummaryValidation: function(record){
    	var me = this;
		var refs = me.getReferences();
		var store = me.getStore('vesselDelayList');
		var shiftListStore = me.getStore('shiftList');
		if(shiftListStore.loadCount <= 0){
			shiftListStore.load();
		}
		//var startDate = Ext.Date.parse(record.get('startTime'),	MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		//var endDate = Ext.Date.parse(record.get('endTime'),		MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var startDate = record.get('startTime');
		var endDate = record.get('endTime');
		var shftId = record.get('shftId');
		var inptDt = record.get('workYmd');
		
		if(!record.get('vslCallId')){
			MessageUtil.alert('Warning', 'Please input the JPVC first');
			return false;
		}
		if(!record.get('workYmd')){
			MessageUtil.alert('Warning', 'Please input the Date');
			return false;
		}
		if(!record.get('startTime')){
			MessageUtil.alert('Warning', 'Please input the From Time');
			return false;
		}
		if(!record.get('endTime')){
			MessageUtil.alert('Warning', 'Please input the To Time');
			return false;
		}
		if(!record.get('delayCode')){
			MessageUtil.alert('Warning', 'Please input the Delay Code');
			return false;
		}
		if(!record.get('cgTpCd')){
			MessageUtil.alert('Warning', 'Please select the Cargo Type');
			return false;
		}
		
		var shift = shiftListStore.findRecord('shftId', shftId);
		if(shift == null || shift == ''){
			shift = shiftListStore.findRecord('shftNm', shftId);
		}
		
		var fmShiftTime = Ext.Date.parse(inptDt + ' ' + shift.get('fmHhmm').substr(0,2) + ':' + shift.get('fmHhmm').substr(2,2),  MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var toShiftTime = Ext.Date.parse(inptDt + ' ' + shift.get('toHhmm').substr(0,2) + ':' + shift.get('toHhmm').substr(2,2),  MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		
		if(shftId == 'SF0013' || shftId == '3RD'){
			toShiftTime.setDate(toShiftTime.getDate() + 1);
		}
		
		if(startDate != '' && startDate != null  && endDate != '' && endDate != null){
			var dateValidation = me.validateFromToDate(startDate, endDate);
			
			if(!dateValidation){
				return false;
			}
		}
		
		if(startDate != '' && startDate != null){
			if(startDate < fmShiftTime ||  startDate > toShiftTime){
				MessageUtil.alert('Warning', 'vesselDelay_start_shift_time__msg');
				return false;
			}
		}
		
		if(endDate != '' && endDate != null){
			if(endDate < fmShiftTime ||  endDate > toShiftTime){
				MessageUtil.alert('Warning', 'vesselDelay_end_shift_time_msg');
				return false;
			}
		}

		var bDuplcate = false;
		var delaySummaryStore = me.getStore('delaySummary');
		for(var i = 0; i<delaySummaryStore.data.items.length; i++){
			var rec = delaySummaryStore.data.items[i];
			if(rec != record){
				if(	rec.get('delayCode') === record.get('delayCode') && 
					rec.get('cgTpCd') === record.get('cgTpCd')){
					
					if((rec.get('startTime') <= record.get('startTime') && record.get('startTime') <= rec.get('endTime')) ||
					   (rec.get('startTime') <= record.get('endTime') && record.get('endTime') <= rec.get('endTime'))	){
						bDuplcate = true;
					}
				}
			}
		} 
		if(bDuplcate){
			MessageUtil.alert('Warning', 'This is duplicated data.');
		}
		
		return !bDuplcate;
    },    
	
	saveProcess:function(){
		var me = this;
		var refs = me.getReferences();
		
		var store = me.getStore('vorLiquidBulkDetail');
		
		var cargoSummaryStore = me.getStore('cargoSummary');
		var delaySummaryStore = me.getStore('delaySummary');
		
		var sendArray = new Array();
		var detailItem = me.getViewModel().get('theVOR');
		if(detailItem === null){
			detailItem = Ext.create('MOST.model.operation.VORLiquidBulk');
		}
		var detailView = me.getDetailBizView();
		
		for(var i =0; i<cargoSummaryStore.data.length; i++ ){
			var record = cargoSummaryStore.data.items[i];
			
			if(record.get('workingStatus') === 'C' || record.get('workingStatus') === 'U' || record.get('workingStatus') === 'D'){
				record.set("insertType", 'cargoProc');
				sendArray.push(record.data);
			}
		}
		
		delaySummaryStore.getModifiedRecords().forEach(function(record, index, array){
			record.set("insertType", 'delayProc');
			if(record.phantom){
				record.set("workingStatus", WorkingStatus.INSERT);
			}else{
				record.set("workingStatus", WorkingStatus.UPDATE);
			}
			if(!me.onDelaySummaryValidation(record)){
				MessageUtil.alert('Warning', 'The delay summary information has been duplicated.');
				detailView.getEl().unmask();
				return;
			}
			
			sendArray.push(record.data);
		});
		
		// DELETE RECORD
		cargoSummaryStore.getRemovedRecords().forEach(function(record, index, array){
			record.set("insertType", 'cargoProc');
			
			sendArray.push(record.data);
		});
		delaySummaryStore.getRemovedRecords().forEach(function(record, index, array){
			record.set("insertType", 'delayProc');
			sendArray.push(record.data);
		});
		
		// To perform the save logic only when modified.
		if(sendArray.length > 0){
			var proxy = detailItem.getProxy();
			proxy.url = store.getProxy().url;
			
			detailItem.set("vorLiquidBulk", sendArray);
			
			detailItem.save({
				success : function(records,success){
					
					records.set("vslCallId", refs.refVslCallId.getValue());
					records.set("workYmd", refs.refWorkYmd.rawValue);
					records.set("shftId", refs.refShift.getValue());
					
					var detailView = me.getDetailBizView();
					var recvData = detailView.items.get(0).recvData;
					records.set('searchType', recvData.data.searchType);
					records.set('workingStatus', WorkingStatus.UPDATE);
					
					me.setDetailControl(records);
					MessageUtil.saveSuccess();

					me.getViewModel().set('selectedDelay', Ext.create('MOST.model.operation.VORLiquidBulk'));
					
					detailView.getEl().unmask();
					
					//me.onSearch();
				}
			});
		}else{
			detailView.getEl().unmask();
		}
	},
	
//	onValidateCargoSummaryEdit : function(editor, context) {
//		var me = this;
//		var refs = me.getReferences();
//		var record = context.record;
//		var isValid = true;
//		
//		var theVessel = me.getViewModel().get('theVessel');
//		var completedCheckYn = editor.grid.down('[dataIndex=jobCmplYn]').getEditor().getValue();
//		
//		var hoseOnDate = editor.grid.down('[dataIndex=hoseOnDt]').getEditor().getValue();
//		var hoseOffDate = editor.grid.down('[dataIndex=hoseOffDt]').getEditor().getValue();
//		
//		var startDate = editor.grid.down('[dataIndex=stDt]').getEditor().getValue();
//		var endDate = editor.grid.down('[dataIndex=endDt]').getEditor().getValue();
//		
//		if(!me.validateDateRange(editor))
//			return false;
//		
//		if(completedCheckYn != null && completedCheckYn != '' && completedCheckYn != 'Y'
//			|| (completedCheckYn === null || completedCheckYn === '')){
//			if(hoseOnDate != '' && hoseOnDate != null  && startDate != '' && startDate != null){
//				var dateValidation1 = me.validateHoseOnHoseOff(hoseOnDate, startDate);
//				if(!dateValidation1){
//					return false;
//				}
//			}
//		}else{
//			if(endDate === null || endDate === ''){
//				MessageUtil.alert('Warning', 'vorValidHoseOff');
//				return false;
//			}else{
//				if(endDate != '' && endDate != null  && hoseOffDate != '' && hoseOffDate != null){
//					var dateValidation2 = me.validateHoseOnHoseOff(endDate, hoseOffDate);
//					if(!dateValidation2){
//						return false;
//					}
//				}
//			}
//		}
//		
//		var vslShiftingYN = theVessel.data.vslShiftingYN;
//		//Start Time/ End Time must be less than ATB
//		var currAtb = theVessel.data.currAtb;
//		
//		if(!me.validCurAtb(currAtb, startDate, endDate)){
//			if(vslShiftingYN != null && vslShiftingYN != ''){
//				MessageUtil.alert('Warning', "resultcalculAtbdatefailmessage");
//				return false;
//			}
//		}
//		
//		//Start Time/ End Time must be less than ATU
//		var currAtu = theVessel.data.currAtu;
//		
//		if(!me.validCurAtu(currAtu, startDate, endDate)){
//			if(vslShiftingYN != null && vslShiftingYN != ''){
//				MessageUtil.alert('Warning', "resultcalculAtudatefailmessage");
//				return false;
//			}
//		}
//		
//		if(!isValid){
//			return false;
//		}
//		
//		var hoseTpCd = editor.grid.down('[dataIndex=hoseTpCd]').getEditor().getValue();
//		if(hoseTpCd == null || hoseTpCd == ''){
//			MessageUtil.alert('Warning', "vorInputLines");
//			return false;
//		}
//		
//		return true;
//	},
	
	onValidateDelaySummaryEdit : function(editor, context) {
		var me = this;
		var refs = me.getReferences();
		var record = context.record;
		var isValid = true;
		if(!me.validateDelayDateRange(editor))
			return false;
		
		if(!isValid){
			return false;
		}
		
		return true;
	},
	
	validateHoseOnHoseOff : function(fromDate, toDate){
		if(fromDate == null || toDate == null) return false;
		
		if(fromDate > toDate){
			MessageUtil.alert('Warning', 'vorValidPeriod_msg');
			return false;
		} else {
			return true;
		}
	},
	
	validateDateRange: function(editor){
		var me = this;
		var refs = me.getReferences();
		var startDate = editor.grid.down('[dataIndex=stDt]').getEditor().getValue();
		var endDate = editor.grid.down('[dataIndex=endDt]').getEditor().getValue();
		
		var hoseOnDate = editor.grid.down('[dataIndex=hoseOnDt]').getEditor().getValue();
		var hoseOffDate = editor.grid.down('[dataIndex=hoseOffDt]').getEditor().getValue();
		
		var shiftListStore = me.getStore('shiftList');
		var shftId= refs.refShift.getValue();
		var shift = shiftListStore.findRecord('shftId', shftId);
		var fmShiftTime = Ext.Date.parse(refs.refWorkYmd.rawValue + ' ' + shift.get('fmHhmm').substr(0,2) + ':' + shift.get('fmHhmm').substr(2,2),  'd/m/Y H:i');
		var toShiftTime = Ext.Date.parse(refs.refWorkYmd.rawValue + ' ' + shift.get('toHhmm').substr(0,2) + ':' + shift.get('toHhmm').substr(2,2),  'd/m/Y H:i');
		
		if(shftId == 'SF0013'){
			toShiftTime.setDate(toShiftTime.getDate() + 1);
		}
		
		if(startDate != '' && startDate != null  && endDate != '' && endDate != null){
		var dateValidation = me.validateFromToDate(startDate, endDate);
		
			if(!dateValidation){
				return false;
			}
		}
		
		if(startDate != '' && startDate != null){
			if(startDate < fmShiftTime ||  startDate > toShiftTime){
				MessageUtil.alert('Warning', 'vorliquidbulk_start_shift_time__msg');
				return false;
			}
		}
		
		if(endDate != '' && endDate != null){
			if(endDate < fmShiftTime ||  endDate > toShiftTime){
				MessageUtil.alert('Warning', 'vorliquidbulk_end_shift_time_msg');
				return false;
			}
		}
		
		if(hoseOnDate != '' && hoseOnDate != null){
			if(hoseOnDate < fmShiftTime ||  hoseOnDate > toShiftTime){
				MessageUtil.alert('Warning', 'vorliquidbulk_hoseOn_shift_time__msg');
				return false;
			}
		}
		
		if(hoseOffDate != '' && hoseOffDate != null){
			if(hoseOffDate < fmShiftTime ||  hoseOffDate > toShiftTime){
				MessageUtil.alert('Warning', 'vorliquidbulk_hoseOff_shift_time_msg');
				return false;
			}
		}
		return true;
	},
	
	validateDelayDateRange: function(editor){
		var me = this;
		var refs = me.getReferences();
		var startDate = editor.grid.down('[dataIndex=startTime]').getEditor().getValue();
		var endDate = editor.grid.down('[dataIndex=endTime]').getEditor().getValue();
		var shiftListStore = me.getStore('shiftList');
		var shftId= refs.refShift.getValue();
		var shift = shiftListStore.findRecord('shftId', shftId);
		var fmShiftTime = Ext.Date.parse(refs.refWorkYmd.rawValue + ' ' + shift.get('fmHhmm').substr(0,2) + ':' + shift.get('fmHhmm').substr(2,2),  'd/m/Y H:i');
		var toShiftTime = Ext.Date.parse(refs.refWorkYmd.rawValue + ' ' + shift.get('toHhmm').substr(0,2) + ':' + shift.get('toHhmm').substr(2,2),  'd/m/Y H:i');
		
		if(startDate != '' && startDate != null  && endDate != '' && endDate != null){
			var dateValidation = me.validateFromToDate(startDate, endDate);
			
			if(!dateValidation){
				return false;
			}
		}
		
		if(shftId === 'SF0013'){
			toShiftTime = Ext.Date.add(toShiftTime,Ext.Date.DAY,1);
		}		
		
		if(startDate != '' && startDate != null){
			if(startDate < fmShiftTime ||  startDate > toShiftTime){
				MessageUtil.alert('Warning', 'vorliquidbulk_start_shift_time__msg');
				return false;
			}
		}
		
		if(endDate != '' && endDate != null){
			if(endDate < fmShiftTime ||  endDate > toShiftTime){
				MessageUtil.alert('Warning', 'vorliquidbulk_end_shift_time_msg');
				return false;
			}
		}
		return true;
	},
	
	calcPumpRate:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var selectedRecord = me.getViewModel().get('selectedCargoSummary');
		
		//var grid = me.lookupReference('refCargoSummaryGrid');
		//var editor = grid.getPlugin('cargoSummaryGridEditor');
		
		var pumpRate = 0;
		var tonAmnt = 0;
		var countTime = 0;
		
		var shiftListStore = me.getStore('shiftList');
		if(shiftListStore.loadCount <= 0){
			shiftListStore.load();
		}
		var shftId = refs.refShift.getValue();
		if(shftId){
			var shift = shiftListStore.findRecord('shftId', shftId);
			var cgTpCd = refs.ctlCargoType.getValue(); //editor.grid.down('[dataIndex=cgTpCd]').getEditor().getValue();
			
			var fmShiftTime = Ext.Date.parse(refs.refWorkYmd.rawValue + ' ' + shift.get('fmHhmm').substr(0,2) + ':' + shift.get('fmHhmm').substr(2,2),  'd/m/Y H:i');
			var toShiftTime = Ext.Date.parse(refs.refWorkYmd.rawValue + ' ' + shift.get('toHhmm').substr(0,2) + ':' + shift.get('toHhmm').substr(2,2),  'd/m/Y H:i');
			
			if(shftId === 'SF0014'){
				toShiftTime = Ext.Date.parse(refs.refWorkYmd.rawValue + ' ' + '15:00',  'd/m/Y H:i');
			} else if(shftId === 'SF0012'){
				toShiftTime = Ext.Date.parse(refs.refWorkYmd.rawValue + ' ' + '23:00',  'd/m/Y H:i');
			} else if(shftId === 'SF0013'){
				toShiftTime = Ext.Date.parse(refs.refWorkYmd.rawValue + ' ' + '07:00',  'd/m/Y H:i');
				toShiftTime.setDate(toShiftTime.getDate() + 1);
			}
			
			var startTime = refs.ctlStDt.getValue(); //editor.grid.down('[dataIndex=stDt]').getEditor().getValue();
			var endTime = refs.ctlEndDt.getValue(); //editor.grid.down('[dataIndex=endDt]').getEditor().getValue();

//            if((refs.ctlStDt.pickerField && typeof refs.ctlStDt.pickerField.rawDate == 'string') 
//                    ||
//                    (refs.ctlEndDt.pickerField && typeof refs.ctlEndDt.pickerField.rawDate == 'string')
//                    ||
//                    (!refs.ctlStDt.pickerField && typeof refs.ctlStDt.rawDate == 'string')
//                    ||
//                    (!refs.ctlEndDt.pickerField && typeof refs.ctlEndDt.rawDate == 'string')                
//            ){
//            	//nothing
//            } else 
            if((refs.ctlStDt.hasDateTime() || !startTime) && (refs.ctlEndDt.hasDateTime() || !endTime)){
				tonAmnt = 0;
				
				if(refs.ctlStDt.pickerField) {
            		startTime = refs.ctlStDt.pickerField.rawDate;	
            	} else {
            		startTime = refs.ctlStDt.getValue();
            	}

            	if(refs.ctlEndDt.pickerField) {
            		endTime = refs.ctlEndDt.pickerField.rawDate;
            	} else {
            		endTime = refs.ctlEndDt.getValue();
            	}
            	
				if(refs.ctlTonHdlAmt.getValue()){
					tonAmnt = refs.ctlTonHdlAmt.getValue();
				}
				
				if(!startTime){
					startTime = fmShiftTime;
				}
				
				if(!endTime){
					endTime = toShiftTime;
				}
				
				if (startTime != null && endTime != null) {
					//countTime = ((endTime.getTime() + 60000) - startTime.getTime())/3600000;
					startTime.setMilliseconds(0)
					endTime.setMilliseconds(0);
					countTime = ((endTime.getTime()) - startTime.getTime())/3600000;
					countTime -= me.getDelayTimeSum(recvData, cgTpCd, startTime, endTime);
				}
				if (countTime != 0) {
					pumpRate = tonAmnt / countTime;
				}
				
				refs.ctlPumpRate.setValue(pumpRate);
			}

		}
	},
	
	onValidationBalance: function(){
		var me = this;
		var refs = me.getReferences();
		var cmdtCombo = me.getStore('cmdtCombo');
		
		var cmdtCd, cmdt;
		if(refs.ctlCommodityCombo.getValue()){
			cmdtCd = refs.ctlCommodityCombo.getValue();
			cmdt = cmdtCombo.findRecord('cmdtCd', cmdtCd);
			
			var selectedRecord;
			var grid = me.lookupReference('refCargoSummaryGrid');
			var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
			
			var totHandlingAmt = 0;
			var dirty = false;
			for(var i = 0; i < grid.store.data.length; i++){
				var record = grid.store.data.items[i];
				
				if(record.dirty === false && record.data.cmdtCd === cmdtCd){
					totHandlingAmt += parseFloat(record.data.tonHdlAmt);
				}else{
					dirty = true;
				}
			}
			if((!selection || dirty) && refs.ctlTonHdlAmt.getValue()){
				totHandlingAmt += parseFloat(refs.ctlTonHdlAmt.getValue());
			}
			
			var selectedRecord = me.getViewModel().get('selectedCargoSummary');
			if(selectedRecord && selectedRecord.data){
				//totHandlingAmt = selectedRecord.data.tonHdlAmt;
				if(cmdt.data.opeTp == 'SL' || cmdt.data.opeTp == 'TL' || cmdt.data.opeTp == 'LD' ){
					refs.ctlLoadPlanMt.setValue(cmdt.data.loadPlanMt);
					refs.ctlLoadActualMt.setValue(totHandlingAmt);
					
					if(cmdt.data.loadPlanMt){
						//refs.ctlLoadBalance.setValue(cmdt.data.loadPlanMt - totHandlingAmt);
						refs.ctlLoadBalance.setValue(Ext.util.Format.number(cmdt.data.loadPlanMt - totHandlingAmt, '0,000.000'));
					}
				}else{
					refs.ctlDisPlanMt.setValue(cmdt.data.loadPlanMt);
					refs.ctlDisActuaMt.setValue(totHandlingAmt);
					
					if(cmdt.data.loadPlanMt){
						//refs.ctlDisBalance.setValue(cmdt.data.loadPlanMt - totHandlingAmt);
						refs.ctlDisBalance.setValue(Ext.util.Format.number(cmdt.data.loadPlanMt - totHandlingAmt, '0,000.000'));
					}
				}
			}else{
				var totPlanedAmt = cmdt.data.loadPlanMt;
				if(cmdt.data.opeTp == 'SL' || cmdt.data.opeTp == 'TL' || cmdt.data.opeTp == 'LD' ){
					refs.ctlLoadPlanMt.setValue(totPlanedAmt);
					refs.ctlLoadActualMt.setValue(totHandlingAmt);

					if(totPlanedAmt){
						//refs.ctlLoadBalance.setValue(totPlanedAmt - totHandlingAmt);
						refs.ctlLoadBalance.setValue(Ext.util.Format.number(totPlanedAmt - totHandlingAmt, '0,000.000'));
					}
				}else{
					refs.ctlDisPlanMt.setValue(totPlanedAmt);
					refs.ctlDisActuaMt.setValue(totHandlingAmt);

					if(totPlanedAmt){
						refs.ctlDisBalance.setValue(Ext.util.Format.number(totPlanedAmt - totHandlingAmt, '0,000.000'));
					}
				}
			}
		}
	},
	
	onCmdtChanged: function(){
		var me = this;
		var refs = me.getReferences();
		
		me.isCmdtSelected = true;
		me.cmdtChanged();
	},
	
	cmdtChanged: function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var vorLiquidBulk = me.getViewModel().getStore('vorLiquidBulk');
		var cmdtCombo = me.getStore('cmdtCombo');
		var selectedRecord = me.getViewModel().get('selectedCargoSummary');
		
		var cmdtCd, cmdt, seq;
		if(refs.ctlCommodityCombo.getValue()){
			cmdtCd = refs.ctlCommodityCombo.getValue();
//			if(refs.ctlCommodityCombo.selection){
//				seq = refs.ctlCommodityCombo.selection.data.no;
//			}
//			else {
//				seq = selectedRecord.get('seqCS2');
//			}
			
			if(me.isCmdtSelected){
				seq = refs.ctlCommodityCombo.selection.data.no;
			}
			else {
				seq = selectedRecord.get('seqCS2');
			}

		}

		if(refs.ctlCommodityCombo.getValue()){
			vorLiquidBulk.load({
				params : {
					vslCallId : refs.refVslCallId.getValue(),
					cmdtCd : cmdtCd,
					searchType : 'Web_Sequence',
					seq : seq,
					opeTp: recvData.data.opeTp
				},
				callback: function(records, operation, success) {
					if (success) {
						if (records.length > 0) {
							for(var i = 0; i < records.length; i++){
								if(refs.ctlCommodityCombo.getValue()){
									refs.ctlCargoType.setReadOnly(true);
									refs.ctlTerminalOperator.setReadOnly(true);
									refs.ctlPkgType.setReadOnly(true);
									refs.ctlShipper.setReadOnly(true);
									refs.ctlConsigne.setReadOnly(true);
									//refs.ctlLoadDischarge.setReadOnly(true);Comment for issue 132863
								}

								refs.ctlCargoType.setValue(records[i].data.cgTpCd);
								refs.ctlTerminalOperator.setValue(records[i].data.tkOpr);
								refs.ctlPkgType.setValue(records[i].data.pkgTpCd);
								refs.ctlShipper.setValue(records[i].data.shprCnsne);
								refs.ctlConsigne.setValue(records[i].data.cnsne);
								refs.ctlLoadDischarge.setValue(records[i].data.jobTpCd);
								refs.ctlBlNo.setValue(records[i].data.blNo);	
								
								me.onLoadAmountBalanceInfo(records[i].data);
								
								//Reset some fields
//								refs.ctlTonHdlAmt.setValue('');
//								refs.ctlVORLines.setValue('');
//								refs.ctlPumpRate.setValue('');
//								refs.ctlHoseOnDt.setValue('');
//								refs.ctlStDt.setValue('');
//								refs.ctlEndDt.setValue('');
//								refs.ctlHoseOffDt.setValue('');
//								refs.ctlLineNo.setValue('');
//								refs.ctlJobCmplYn.setValue('');
							}
						}
					}
				}
			});
		}
	},
	
	onLoadAmountBalanceInfo: function (obj){
		var me = this;
		var refs = me.getReferences();
		
		if (obj.jobTpCd == 'DS' || obj.jobTpCd == 'SD' || obj.jobTpCd == 'TD'){
			refs.ctlDisPlanMt.setValue(obj.disPlanMt);
			refs.ctlDisActuaMt.setValue(obj.disActualMt);
			
			refs.ctlDisBalance.setValue((obj.disPlanMt - obj.disActualMt).toFixed(3));
			
			refs.ctlLoadPlanMt.setValue('');
			refs.ctlLoadActualMt.setValue('');
			refs.ctlLoadBalance.setValue('');
		} else if (obj.jobTpCd == 'LD' || obj.jobTpCd == 'SL' || obj.jobTpCd == 'TL'){
			refs.ctlLoadPlanMt.setValue(obj.loadPlanMt);
			refs.ctlLoadActualMt.setValue(obj.loadActualMt);			
			refs.ctlLoadBalance.setValue((obj.loadPlanMt - obj.loadActualMt).toFixed(3));	
			
			refs.ctlDisPlanMt.setValue('');
			refs.ctlDisActuaMt.setValue('');
			refs.ctlDisBalance.setValue('');
		} else {
			refs.ctlDisPlanMt.setValue(obj.disPlanMt);
			refs.ctlDisActuaMt.setValue(obj.disActualMt);
			refs.ctlDisBalance.setValue((obj.disPlanMt - obj.disActualMt).toFixed(3));
			
			refs.ctlLoadPlanMt.setValue(obj.loadPlanMt);
			refs.ctlLoadActualMt.setValue(obj.loadActualMt);			
			refs.ctlLoadBalance.setValue((obj.loadPlanMt - obj.loadActualMt).toFixed(3));	
		}
	},
	
//	loadConfirmationSlipToCmb(): function {
//	  	var me = this;
//	  	var refs = me.getReferences();
//		var par_pln_load = 0, par_pln_dis = 0, par_act_load = 0, par_act_dis = 0;
//		var jobTpCd = refs.ctlLoadDischarge.getValue();
//		
//		
//		if('LD' === jobTpCd || 'TL' === jobTpCd || 'SL' === jobTpCd)
//		{
//			refs.ctlShipper.setDisabled(false);
//		
//			if(this.vslCallId.Value.toString()!="" &&
//	  			(cbxJobTpCd.selectedIndex > 0) &&
//	  			(cbxCgTpCd.selectedIndex > 0) &&
//	  			(cbxShprCnsne.selectedIndex > 0) && 
//	  			(cbxTkOpr.selectedIndex > 0 || opeTp.Value == 'STS')) {		
//	  				
//	  			cbxCnsne.selectedIndex = 0;	
//	  						  	
//				var httpService:THttpService = new THttpService(this);
//	  			loadCmbXml.searchType = 'loadCmb';
//	  			httpService.headers = 'confirmslipinfo';
//				httpService.sendSearchRequest("VORLiquidBulk", loadCmbXml);  //THttpService Call
//			}
//		}else if ('DS' === jobTpCd || 'TD' === jobTpCd || 'SD' === jobTpCd)
//		{
//			this.cbxCnsne.visible = true;
//			this.lblCnsne.visible = true;
//			
//			if(this.vslCallId.Value.toString()!="" &&
//	  			(cbxJobTpCd.selectedIndex > 0) &&
//	  			(cbxCgTpCd.selectedIndex > 0) &&
//	  			(cbxCnsne.selectedIndex > 0) && 
//	  			(cbxTkOpr.selectedIndex > 0 || opeTp.Value == 'STS')) {	
//	  				
//	  			cbxShprCnsne.selectedIndex = 0;
//	  							  	
//				var httpService:THttpService = new THttpService(this);
//	  			loadCmbXml.searchType = 'loadCmb';
//	  			httpService.headers = 'confirmslipinfo';
//				httpService.sendSearchRequest("VORLiquidBulk", loadCmbXml);  //THttpService Call
//			}	
//		}
//	},
	
	
	getDelayTimeSum:function(recvData, cgTpCd, startTime, endTime){
		var me = this;
		var refs = me.getReferences();
		var totHour = 0;
		var delayStartTime;
		var delayEndTime;
		var delayTime = me.getViewModel().get('theDelayTime');
		if(delayTime != null && delayTime.length > 0){
			for(var i = 0; i < delayTime.length; i++){
				if(delayTime[i].data != null && delayTime[i].data.accDelay != 'Y'){
					if(delayTime[i].data.cgTpCd == cgTpCd){
						delayStartTime = delayTime[i].data.startTime;
						delayEndTime = delayTime[i].data.endTime;
						
						if(delayStartTime < startTime){
							delayStartTime = startTime;
						}
						if(delayEndTime > endTime){
							delayEndTime = endTime;
						}
						
						totHour += (delayEndTime - delayStartTime)/3600000;
					}
				}
			}
		}else{
			return totHour;
		}
		return totHour;
	},
	
	calcDelayTime:function(){
		var me = this;
		var refs = me.getReferences();
			
		var masterItem = me.getViewModel().getData('theVOR');
		var totalDelayHours = 0;
		
		for(var i = 0; i < masterItem.theVOR.data.delaySummary.length; i++){
			var delayItem = masterItem.theVOR.data.delaySummary[i];
			totalDelayHours += parseFloat(delayItem.timeHourly);
		}
		refs.refVORTotalDelayTime.setValue(Ext.util.Format.number(totalDelayHours, '0,000.00'));
	},

	calcRowDelayTime:function(){
		var me = this;
		var refs = me.getReferences();
		var selection = me.getViewModel().get('selectedDelay');
		if(selection){
			var sumTime;
			var timeHourly;
			var totTimeHourly = 0;
			var timeGap;
			var timeHourMin;
			
			var stDate = refs.refDelayStartTime.getValue();
			var endDate = refs.refDelayEndTime.getValue();
			
			timeGap = endDate - stDate;
			// calc hourly time
			timeHourly = Math.round(timeGap / 36000) / 100;
			totTimeHourly += timeHourly;
			
			// calc hour/min time
			timeHourMin = Math.floor(timeHourly).toString() + '/' + (timeGap*60/3600000)%60;
			
			selection.set('timeHourly', totTimeHourly);
			selection.set('timeHourMin', timeHourMin);
			
			me.calcDelayTime();
		}
	},
	
	getDelayCode:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refDelaySummaryGrid');
		
		var store = me.getStore('delaySummary');
		var editor = grid.getPlugin('delaySummaryGridEditor');
		var delayCode= editor.grid.down('[dataIndex=delayCode]').getEditor().getValue();
		var delayCodeListStore = me.getStore('delayCodeList');
		
		if(delayCode != null && delayCode != ''){
			refs.refVORDelayDesc.getEditor().setValue(delayCodeListStore.findRecord('dlyCd', delayCode).data.descr);
			refs.refVORAccDelay.getEditor().setValue(delayCodeListStore.findRecord('dlyCd', delayCode).data.chagYN);
			var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
			if(selection){
			    selection.set('delayDesc', delayCodeListStore.findRecord('dlyCd', delayCode).data.descr);	
			}
		}
	},
	onDownloadPDF : function(){
		var me = this;
		var refs = me.getReferences();
		
//		var grid = me.lookupReference('refVORSummaryGrid');
//		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
//		
//		if(selection == null) {
//			MessageUtil.info('info_msg','vorLQReportMessage');
//			return;
// 		}
//		
		var params = me.setSrchStrReport(); 
		params.previewType = 'DOWNLOAD';
		
		me.getView().detailViewAlias = 'app-vorliquidbulkgeneratepdf';
		me.openDetailPopup(params, 'Download');
	},
	
	onPreviewPDF:function(){
		var me = this;
		var refs = me.getReferences();
		
//		var grid = me.lookupReference('refVORSummaryGrid');
//		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
//		
//		if(selection == null) {
//			MessageUtil.info('info_msg','vorLQReportMessage');
//			return;
// 		}
		
		var params = me.setSrchStrReport(); 
		params.previewType = 'PREVIEW';
		
		me.getView().detailViewAlias = 'app-vorliquidbulkgeneratepdf';
		me.openDetailPopup(params, 'Preview');
		
	},
	setSrchStrReport:function(){
		var me = this;
		var refs = me.getReferences();
		var detailVsl = me.getViewModel().get('theVessel');
		var tabPanel = refs.refVORLiquidBulkTabPanel.getActiveTab().name.trim();
		
		var vslCallId = '';
		var ata = null;
		var eta = null;
		var etb = null;
		var atb = null;
		var atw = null;
		var atc = null;
		var atu = null;
		var pob = null;
		var vslNm = '';
		var berthLoc = '';
		var sa = '';
		var voyageInb = '';
		var voyageOut = '';
		var scnNo = '';
		var previewType = '';
		
		if(detailVsl != null) {
			vslCallId = detailVsl.data.vslCallId;
			eta = detailVsl.data.eta==null?null:Ext.Date.format(detailVsl.data.eta, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			etb = detailVsl.data.etb==null?null:Ext.Date.format(detailVsl.data.etb, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			ata = detailVsl.data.ata==null?null:Ext.Date.format(detailVsl.data.ata, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			pob = detailVsl.data.pob==null?null:Ext.Date.format(detailVsl.data.pob, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			atb = detailVsl.data.atb;
			atw = detailVsl.data.atw;
			atc = detailVsl.data.atc;
			atu = detailVsl.data.atu;
			vslNm = detailVsl.data.vslNm;
			berthLoc = detailVsl.data.berthLoc;
			sa = detailVsl.data.arrvSaId;
			voyageInb = detailVsl.data.inbVoy;
			voyageOut = detailVsl.data.outbVoy;
			scnNo = detailVsl.data.scn;
			
			if (tabPanel && tabPanel == 'VOR summary' ) {
				previewType = 'VORSummary';
			}
			
		}
		
		var userId = MOST.config.Token.getUserId();
		
//		var shftId = selection.data.shftId;
//		var shftNm = selection.data.shftNm;
//		var cmd = selection.data.comodityCode;
//		var stDt = selection.data.inptDt;
		
		var shftId = '';
		var shftNm = '';
		var cmd = '';
		var stDt = '';
		
		var fromDate = '';
		var toDate = '';
		var params = {
				vslCallId : vslCallId,
				eta:eta,
				etb:etb,
				ata:ata,
				atw:atw,
				atc:atc,
				atu:atu,
				atb:atb,
				pob:pob,
				vslNm:vslNm,
				berthLoc:berthLoc,
				shipgAgnt:sa,
				userId: userId,
				shift:shftId,
				shftNm:shftNm,
				cmdtCd:cmd,
				scnNo: scnNo,
				voyageInb:voyageInb,
				voyageOut:voyageOut,
				stDt:stDt,
				fromDate:fromDate,
				toDate:toDate,
				reportId: '',
				searchType: 'DelayRecordList',
				previewType: previewType,
		}
		return params
	},
	
	exportVorSummary: function(btn) {
    	var me = this;
    	var refs = me.getReferences();
    	
        var cfg = Ext.merge({
            title: 'VOR Liquid Summary',
            fileName: 'VOR_Liquid_Summary' + '.' + (btn.cfg.ext || btn.cfg.type)
        }, btn.cfg);

        var grid = refs.refVORSummaryGrid;
        grid.saveDocumentAs(cfg);
    },
    
    exportVorDelaySummary: function(btn) {
    	var me = this;
    	var refs = me.getReferences();
    	
        var cfg = Ext.merge({
            title: 'VOR Liquid Delay Summary',
            fileName: 'VOR_Liquid_Delay_Summary' + '.' + (btn.cfg.ext || btn.cfg.type)
        }, btn.cfg);

        var grid = refs.refVORDelaySummaryGrid;
        grid.saveDocumentAs(cfg);
    },
	/*
	 * 
	 * ADD FOR MODERN - HHT TABLET VERSION
	 * =========================================================================================================================
	 * */
	
	loadCombo:function(recvData){
		var me = this;
		var refs = me.getReferences();
		var theCgOprType = me.getViewModel().get('theCgOprType');
		var opeTp;
		
		if(theCgOprType.tlsOprYn == 'Y'){
			if(refs.ctlVORTranshipment.checked == true){
				opeTp = 'TLS';
			}
		}
		if(theCgOprType.stsOprYn == 'Y'){
			if(refs.ctlVORSTSOperation.checked == true){
				opeTp = 'STS';
			}
		}
		if(theCgOprType.genOprYn == 'Y'){
			if(refs.ctlVORLoadDischarge.checked == true){
				opeTp = 'GEN';
			}
		}
		
		var shiftCombo = me.getStore('shiftCombo');
		shiftCombo.load();
		
		//Tab Cargo Summary
		var cmdtCombo = me.getStore('cmdtCombo');
		cmdtCombo.load({
			params : {
				vslCallId : recvData.data.vslCallId,
				opeTp : opeTp
			},
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						for(var i = 0; i < records.length; i++){
							//me.getViewModel().setData({theCmdt:records[i].data});
						}
					}
				}
			}
		});
		
		var tkOprCombo = me.getStore('tkOprCombo');
		tkOprCombo.load({
			params : {
				vslCallId : recvData.data.vslCallId,
			},
		});
		
		var shprCnsneCombo = me.getStore('shprCnsneCombo');
		shprCnsneCombo.load({
			params : {
				vslCallId : recvData.data.vslCallId,
			},
		});
		
		var cnsneCombo = me.getStore('cnsneCombo');
		cnsneCombo.load({
			params : {
				vslCallId : recvData.data.vslCallId,
			},
		});
		
		var pkgTpCombo = me.getStore('pkgTpCombo');
		pkgTpCombo.load({
			params : {
				vslCallId : recvData.data.vslCallId,
			},
		});
		
		var operationTpCombo = me.getStore('operationTpCombo');
		operationTpCombo.load();
		
		var hoseTpCombo = me.getStore('hoseTpCombo');
		hoseTpCombo.load({
			params : {
				mcd : opeTp =='STS' ? 'STSHSTP' : 'HSTP'
			},
		});
		
		var cargoLiquidCombo = me.getStore('cargoLiquidCombo');
		cargoLiquidCombo.load();
	},

	/*
	 *Start  Event Function JETTY OPR:
	 * */
	setAccessLiquid: function(theVessel)
	{
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('cgOprType')
		var params = {
			vslCallId: theVessel.vslCallId,
		}
		store.load({
			params:params,
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
//						if(records[0].data.genOprYn !== 'Y'){
//							MessageUtil.alert('Warning', 'vorAccessJetty');
//							me.getView().close();
//						}
//						else
//						{
							var recvData = Ext.create('MOST.model.operation.VORLiquidBulk');
							recvData.data.opeTp = 'GEN';
							recvData.data.workingStatus = 'C';
							recvData.data.vslCallId = me.VSL_CALL_ID;
							recvData.data.shftId = me.SHFTID;
							recvData.data.workYmd = me.WORKDATE
							me.setDetailControlOPR(recvData.data);
							
							me.onTblRetrive();
							me.onTblSearchDelayCd(refs.refBtnSearchDelayCd);
//						}
					}
				}
			}
		})
	},
	
	setVesselShifting: function (masterItem) {
		var me = this;
		var vesselShifting = me.getStore('vesselShifting');
		if(masterItem.vslShifting)
		{
			vesselShifting.setData(masterItem.vslShifting);
			vesselShifting.commitChanges();
			me.EARLIEST_ATB = null;
			me.LATEST_ATU = null;
			
			if( masterItem.vslShifting.length > 1) {
				for(var i=0; i < masterItem.vslShifting.length; i++) {
					var itm = masterItem.vslShifting[i];
					if(	(StringUtil.isNullorEmpty(me.EARLIEST_ATB) && !StringUtil.isNullorEmpty(itm.atbDt)) ||
						( !StringUtil.isNullorEmpty(me.EARLIEST_ATB) && !StringUtil.isNullorEmpty(itm.atbDt)
							&& (Ext.Date.parse(itm.atbDt, 'd/m/Y H:i') > Ext.Date.parse(me.EARLIEST_ATB, 'd/m/Y H:i'))) 
					) {
						me.EARLIEST_ATB = itm.atbDt;
					}
					
					
					if(	(StringUtil.isNullorEmpty(me.LATEST_ATU) && !StringUtil.isNullorEmpty(itm.atuDt)) ||
						( !StringUtil.isNullorEmpty(me.LATEST_ATU) && !StringUtil.isNullorEmpty(itm.atuDt)
							&& (Ext.Date.parse(itm.atuDt, 'd/m/Y H:i') > Ext.Date.parse(me.LATEST_ATU, 'd/m/Y H:i'))) 
					) {
						me.LATEST_ATU = itm.atuDt;
					}
				}
			}
		}
	},
	
	setCargoSummaryTbl: function (masterItem) {
		var me = this;
		if(masterItem.cargoSummary)
		{
			var cargoSummary = me.getViewModel().getStore('cargoSummary');
			cargoSummary.setData(masterItem.cargoSummary);
		}
	},
	setDelaySummaryTbl: function (masterItem) {
		var me = this;
		if(masterItem.delaySummary)
		{
			var delaySummary = me.getViewModel().getStore('delaySummary');
			delaySummary.setData(masterItem.delaySummary);
		}
	},
	/*
	 *End  Event Function JETTY OPR:
	 * */



	onTblLoad: function () {
		var me = this;
		var refs = me.getReferences();
		var theVessel = me.getViewModel().get('theVessel');

		me.WORKDATE = Ext.Date.format(MOST.config.Token.getWorkDate(), 'd/m/Y');
		me.SHFTID = MOST.config.Token.getWorkShift();
		me.VSL_CALL_ID = theVessel.vslCallId;

		


		me.setAccessLiquid(theVessel);
		
	},
	
	// Detail Control Setting
	setDetailControlOPR: function (recvData) {
		var me = this;
		var refs = me.getReferences();
		theVessel = me.getViewModel().get('theVessel');
		var vorLiquidBulkDetail = me.getStore('vorLiquidBulkDetail');
		if (recvData != null) {
			//refs.refWorkingDate.setValue(recvData.workYmd);
			me.loadComboOPR(recvData);
			vorLiquidBulkDetail.load({
				params: {
					vslCallId: recvData.vslCallId,
					shift: recvData.shftId,
					workYmd: recvData.workYmd
				},
				callback: function (records, operation, success) {
					if (success) {
						if (records.length > 0) {
							me.setVesselShifting(records[0].data);
							me.setCargoSummaryTbl(records[0].data);
							me.setDelaySummaryTbl(records[0].data);
						}
					}
				}
			});
		}
		 refs.refOGAStatus.setHtml(theVessel.ogaStatus);
		 refs.refOGADate.setHtml(theVessel.ogaStatusDate);
	},

	loadComboOPR: function (recvData) {
		var me = this;
		var refs = me.getReferences();
		var opeTp = 'GEN';
		var shiftStore = me.getStore('shiftList');
		var cmdtCombo = me.getStore('cmdtComboTbl');
		var blSnCombo = me.getStore('blSnComboTbl');
		var lineCombo = me.getStore('lineComboTbl');
		var hatchComboTblStore = me.getStore('hatchComboTbl');
		// var comboStore = me.getStore('jettyCombo');
		cmdtCombo.load({
			params: {
				vslCallId: recvData.vslCallId,
				opeTp: opeTp
			},
			callback: function (records, operation, success) {
				if (success) {
					if (records.length > 0) {
						cmdtCombo.insert(0, [{
							scdNm: 'Select',
							scd: ''
						}]);
					}
				}
			}
		})
		blSnCombo.load({
			params: {
				vslCallId: me.getViewModel().get('globalVesselCallId'),
				opeTp: 'GEN'
			},
			callback: function (records, operation, success) {
				if (success) {
					if (records.length == 1) {
					}
				}
			}
		})
		lineCombo.load({
			callback: function (records, operation, success) {
				if (success) {
					if (records.length > 0) {
						lineCombo.insert(0, [{
							scdNm: 'Select',
							scd: ''
						}]);
					}
				}
			}
		})
		me.onLoadGridCgOpeInf();
		me.setTimeWithShiftHHT();
		me.loadDelayTimeSum();
		// comboStore.load({
		// 	params: {
		// 		vslCallId: recvData.vslCallId,
		// 		opeTp: opeTp
		// 	},
		// 	callback: function (records, operation, success) {
		// 		if (success) {
		// 			if (records.length > 0) {
		// 				cmdtCombo.setData(records[0].get('cmdtList'));
		// 				cmdtCombo.insert(0, [{
		// 					cmdtCd: 'Select',
		// 					no: ''
		// 				}]);
		// 				lineCombo.setData(records[0].get('lineList'));
		// 				lineCombo.insert(0, [{
		// 					scdNm: 'Select',
		// 					scd: ''
		// 				}]);
		// 				shiftStore.setData(records[0].get('shiftList'));
		// 				shiftStore.insert(0, [{
		// 					shftNm: 'Select',
		// 					shftId: ''
		// 				}]);
		// 				cmdtCombo.commitChanges();
		// 				lineCombo.commitChanges();
		// 				shiftStore.commitChanges();

		// 				me.onLoadGridCgOpeInf();//Load Comodity Grid
		// 				refs.refCbxShft.setValue(recvData.shftId);
		// 				me.setTimeWithShiftHHT();
		// 			}
		// 		}
		// 	}
		// });
	},
	loadDelayTimeSum: function(){
		var me = this;
		var delayTimeSumStore = me.getStore('delayTimeSum');
		//if (delayTimeSumStore.loadCount <= 0) {
			delayTimeSumStore.load({
				params: {
					vslCallId: me.VSL_CALL_ID,
					shift: me.SHFTID,
					workYmd: me.WORKDATE
				}, callback: function (records, operation, success) {
					if (success) {
						if (records.length > 0) {
							me.getViewModel().setData({ theDelayTime: records });
						}
					}
				}
			});
		//}
	},
	checkGlobalJpvcNo: function(){
		var me = this;
		var globalJpvcNo = me.getViewModel().get('globalJpvcNo');
		if(!globalJpvcNo){
			MessageUtil.warning('warning_msg', 'Please choose JPVC ');
			return false;
		}
		return true;
	},
	onCmdtChangedTbl: function () {
		var me = this;
		var refs = me.getReferences();
		var vorLiquidBulk = me.getViewModel().getStore('vorLiquidBulk');
		var blSnComboStore = me.getStore('blSnComboTbl');
		var seq = refs.refCboCmdt.getValue();
		// var cmdtCombo = me.getViewModel().getStore('cmdtComboTbl');
		// var cgTpStore = me.getStore('cgTpStore');
		// var jobTpCdStore = me.getStore('jobTpCdStore');
		// var tkOprStore = me.getStore('tkOprStore');
		// var shprCnsneStore = me.getStore('shprCnsneStore');
		// var cnsneStore = me.getStore('cnsneStore');
		// var pkgTpCdStore = me.getStore('pkgTpCdStore');
		// cmdt = cmdtCombo.findRecord('no', seq);
		// if (seq != null && seq != '') {
		// 	vorLiquidBulk.load({
		// 		params: {
		// 			//vslCallId: refs.refVslCallId.getValue(),
		// 			vslCallId: me.VSL_CALL_ID,
		// 			cmdtCd: cmdt.data.cmdtCd,
		// 			opeTp: 'GEN',
		// 			searchType: 'Web_Sequence',
		// 			seq: seq
		// 		},
		// 		callback: function (records, operation, success) {
		// 			if (success && records.length > 0) {
		// 				if (!me.gridSelected) {
		// 					me.setLDDSCmdt(records[0]);
		// 				}
		// 				else {
		// 					me.gridSelected = false;
		// 				}
		// 				me.getViewModel().set('theCmdtTbl', records[0].data);
		// 				//var cgTpCd;
		// 				var cgTpCd = records[0].data.cgTpCd;
		// 				var jobTpCd = records[0].data.jobTpCd;
		// 				var tkOpr = records[0].data.tkOpr;
		// 				var pkgTpCd = records[0].data.pkgTpCd;
		// 				var shprCnsne = records[0].data.shprCnsne;
		// 				var cnsne = records[0].data.cnsne;
		// 				me.setRawValue(refs.refCboCgtpOpr, cgTpStore, { cgTpCd: cgTpCd }, cgTpCd);
		// 				me.setRawValue(refs.refCboJobTpCd, jobTpCdStore, { jobTpCd: jobTpCd }, jobTpCd);
		// 				me.setRawValue(refs.refCboTkOpr, tkOprStore, { tkOpr: tkOpr }, tkOpr);
		// 				me.setRawValue(refs.refCboShprCnsne, shprCnsneStore, { shprCnsne: shprCnsne }, shprCnsne);
		// 				me.setRawValue(refs.refCboCnsne, cnsneStore, { cnsne: cnsne }, cnsne);
		// 				me.setRawValue(refs.refCboPkgTpCd, pkgTpCdStore, { pkgTpCd: pkgTpCd }, pkgTpCd);
		// 				me.fetchHoseTimeFromPrevShift(records[0]);
		// 			}
		// 		}
		// 	});
		// }
		var cmdtVal = refs.refCboCmdt.getValue();
		if(cmdtVal){
			refs.refBlSnNoCombo.setDisabled(false)
			blSnComboStore.filter(function(record){
				if(record){
					if(record.get('cmdtCd') === cmdtVal){
						return record
					}
				}
			});
		}

		// if(sltCmnd){
		// 	refs.refBlSnNoCombo.setDisabled(false)
		// 	blSnComboStore.load({
		// 		params: {
		// 			vslCallId: me.getViewModel().get('globalVesselCallId'),
		// 			opeTp: 'GEN',
		// 			cmdtCd: sltCmnd
		// 		},
		// 		callback: function (records, operation, success) {
		// 			if (success) {
		// 				if (records.length == 1) {
		// 					refs.refBlSnNoCombo.setValue(records[0].get('scd'))
		// 				}
		// 			}
		// 		}
		// 	})
		// }
	},
	onBlSnChangedTbl: function(combo, newValue, oldValue) {
		var me = this
		var refs = me.getReferences()
		if(newValue){
			var cmdtValue = refs.refCboCmdt.getValue()
			var cmndDetailRec = me.getCmdtDetail(cmdtValue, newValue)
			me.setDetailForOpe(cmndDetailRec)
			refs.reftxtTonnage.setDisabled(false)
		}
	},

	setDetailForOpe: function(theSelection){
		var me = this;
		var refs = me.getReferences();
		
		var cmdtCombo = me.getViewModel().getStore('cmdtComboTbl');
		var cgTpStore = me.getStore('cgTpStore');
		var jobTpCdStore = me.getStore('jobTpCdStore');
		var tkOprStore = me.getStore('tkOprStore');
		var shprCnsneStore = me.getStore('shprCnsneStore');
		var cnsneStore = me.getStore('cnsneStore');
		var pkgTpCdStore = me.getStore('pkgTpCdStore');
		
		if (!me.gridSelected) {
			me.setLDDSCmdt(theSelection);
		}
		else {
			me.gridSelected = false;
		}
		me.getViewModel().set('theCmdtTbl', theSelection.data);
		//var cgTpCd;
		var cgTpCd = theSelection.data.cgTpCd;
		var jobTpCd = theSelection.data.jobTpCd;
		var tkOpr = theSelection.data.tkOpr;
		var pkgTpCd = theSelection.data.pkgTpCd;
		var shprCnsne = theSelection.data.shprCnsne;
		var cnsne = theSelection.data.cnsne;
		
		// var cmdtSelect = cmdtCombo.findRecord('no', theSelection.data.seq, 0, false, false, true);
		// refs.refCboCmdt.setSelection(cmdtSelect);
		
		me.setRawValue(refs.refCboCgtpOpr, cgTpStore, { cgTpCd: cgTpCd }, cgTpCd);
		me.setRawValue(refs.refCboJobTpCd, jobTpCdStore, { jobTpCd: jobTpCd }, jobTpCd);
		me.setRawValue(refs.refCboTkOpr, tkOprStore, { tkOpr: tkOpr }, tkOpr);
		me.setRawValue(refs.refCboShprCnsne, shprCnsneStore, { shprCnsne: shprCnsne }, shprCnsne);
		me.setRawValue(refs.refCboCnsne, cnsneStore, { cnsne: cnsne }, cnsne);
		me.setRawValue(refs.refCboPkgTpCd, pkgTpCdStore, { pkgTpCd: pkgTpCd }, pkgTpCd);
		me.fetchHoseTimeFromPrevShift(theSelection);
		me.calcPumpRateTbl();
	},
	
	onLoadGridCgOpeInf: function () {
		var me = this;
		var refs = me.getReferences();
		var vorliquidbulkcmdtStore = me.getStore('vorliquidbulkcmdt');

		vorliquidbulkcmdtStore.load({
			params: {
				vslCallId: me.getViewModel().get('globalVesselCallId'),
				opeTp: 'GEN',
				searchType: 'CMDT_OPE_INFO',
			},
			callback: function (records, operation, success) {
				if (success) {
				}
			}
		});
	},	
	
	onTblSelectCgOpeInf: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refGidCS2Info;
		var selectedVal = grid.getSelection();
		if(selectedVal){
			me.setDetailForOpe(selectedVal);
			refs.reftxtTonnage.setDisabled(false);
		}
	},	
	
	onTblRetrive: function(){
		var me = this;
		var refs = me.getReferences();
		var vorLiquidBulkDetail = me.getStore('vorLiquidBulkDetail');
		vorLiquidBulkDetail.load({
			params: {
				vslCallId: me.VSL_CALL_ID,
				shift: me.SHFTID,
				workYmd: me.WORKDATE
			},
			callback: function (records, operation, success) {
				if (success) {
					if (records.length > 0) {
						me.setVesselShifting(records[0].data);
						me.setCargoSummaryTbl(records[0].data);
						me.setDelaySummaryTbl(records[0].data);
					}
				}
			}
		});
	},
	onTblAddOpr: function () {
		var me = this;
		var refs=me.getReferences();
		var theVessel = me.getViewModel().get('theVessel');
		var vesselShifting = me.getViewModel().getStore('vesselShifting');
		
		var detailForm = refs.oprDetail.validate();
		//Check required field:
		if (!detailForm) {
			MessageUtil.warning('warning_msg', 'vorLQ_missingRequiredField');
			return;
		}
		if (theVessel.atb) {
			//OGA-CR
			if (theVessel.ogaStatus == "HOLD" || theVessel.ogaStatus == "IN PROGRESS"
				|| (theVessel.ogaStatus == "N/A")
				|| theVessel.ogaStatus == "REJECT") {
					var params=[theVessel.ogaStatus, theVessel.ogaQuarantine]
					MessageUtil.questionModern('confirm', 
												Ext.String.format('Application for health clearance is {0}.Vessel is {1}.</br>Do you want to continue?', 
														theVessel.ogaStatus, 
														theVessel.ogaQuarantine), null, 
												function (button) {
													if (button === 'ok') {
														me.ogaConfirmOpr();
													}
												});
			} else {
				me.ogaConfirmOpr();
			}
		} else {
			if (theVessel.vslShiftingSeq != ""){
				MessageUtil.warning('warning_msg', "vorLQ_updateATB",["Refer to Vessel Shifting screen for more detail"]);
			}
		}
	},
	onTblUpdateOpr: function () {
		var me = this;
		var refs=me.getReferences();
		var detailForm = refs.oprDetail.validate();
		var grid = refs.refJettyOPRGridList;
		var selectedRecord = grid.getSelection();
		if (!selectedRecord) {
			MessageUtil.warning("warning_msg", "vorLQ_updateRecordEmptyMsg");
			return;
		}
		//Check required field:
		if (!detailForm) {
			MessageUtil.warning('warning_msg', 'vorLQ_missingRequiredField');
			return;
		}
		me.updateConfirmOpr();
	},
	onTblDeleteOpr: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refJettyOPRGridList;
		var selectedRecord = grid.getSelection();
		if (!selectedRecord) {
			MessageUtil.warning('Warning', 'vorLQ_deleteRecordEmptyMsg');
			return;
		}
		me.deleteConfirmOpr();
	},
	deleteConfirmOpr:function(){
		var me = this;
		MessageUtil.questionModern('confirm', 'infodelete_msg', null, function (button) {
			if (button === 'ok') {
				me.doDeleteOpr();
			}
		});
	},
	updateConfirmOpr:function(){
		var me = this;
		MessageUtil.questionModern('confirm', 'infoupdate_msg', null, function (button) {
			if (button === 'ok') {
				me.doUpdateOpr();
			}
		});
	},
	ogaConfirmOpr: function () {
		var me = this;
		MessageUtil.questionModern('confirm', 'vorLQ_beginprocess_confirm', null, function (button) {
			if (button === 'ok') {
				me.checkBalance();
			}
		});
	},

	getCmdtDetail: function(cmdtValue, blSnValue){
		var me = this
		var blSnStore = me.getStore('blSnComboTbl')
		var blSnIdx = blSnStore.findBy(function(rec) {
			return rec.get('scd') === blSnValue && rec.get('cmdtCd') === cmdtValue
		});
		var foundBlSnRec = blSnStore.getAt(blSnIdx)

		var seq = foundBlSnRec.get('seq')
		var cs2GridStore = me.getStore('vorliquidbulkcmdt')
		var cmdtDetailIdx = cs2GridStore.findBy(function(rec) {
			return rec.get('seq') === seq
		});
		return cs2GridStore.getAt(cmdtDetailIdx)
	},

	checkBalance: function(){
		var me = this; 
		var refs = me.getReferences();
		var cmdtValue = refs.refCboCmdt.getValue()
		var blSnValue = refs.refBlSnNoCombo.getValue()
		var cmdtDetail = me.getCmdtDetail(cmdtValue, blSnValue)
        var record= me.getViewModel().get('theJettyOpr');
        
        var actMt = 0;
        var planMt = 0;
        if(cmdtDetail.get('jobTpCd') === 'DS'){
        	actMt = parseFloat(cmdtDetail.get('disActualMt')); 
        	planMt = parseFloat(cmdtDetail.get('disPlanMt'));
        	
        }else if(cmdtDetail.get('jobTpCd') === 'LD'){
        	actMt = parseFloat(cmdtDetail.get('loadActualMt')); 
        	planMt = parseFloat(cmdtDetail.get('loadActualMt'));
        }
        var balMt = planMt - actMt;
        if (balMt < record.tonHdlAmt){
        	MessageUtil.questionModern('warning_msg', 'vorLQ_balance_warning',null , function (button) {
				if (button === 'ok') {
					me.doAddOpr();
				}
			});
        }else{
        	me.doAddOpr();
        }
	},
	
	doDeleteOpr: function(){
		var me = this;
		var detailData = me.getViewModel().get('theJettyOpr');
		detailData.insertType = 'cargoProc';
		detailData.workingStatus = 'D';

		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/vorliquidbulk/detail';
		updateParm.phantom = true;
		updateParm.set('workingStatus', 'D');
		updateParm.set('items', [detailData]);		
		updateParm.save({
			success: function () {
				MessageUtil.saveSuccess();
				me.setDetailControlOPR(detailData);
				me.onTblClearOpr();
			}
		});	
	},
	doUpdateOpr: function(){
		var me = this;
		var theVessel = me.getViewModel().get('theVessel');
		var editItem= me.getViewModel().get('theJettyOpr');
		me.getRecordOpr(editItem);
		if(!me.validHoseOn(editItem,me.MODE_UPDATE))
		{
			MessageUtil.warning("warning_msg", "vorLQ_inputHoseOntime");
			return;
			
		}
		if(!me.validHoseTimeLine(editItem))
		{
			MessageUtil.warning("warning_msg", "vorLQ_invalidHoseTimeLine");
			return;
		}
		if (!me.validHoseOffHHT(editItem)) {
			MessageUtil.warning("warning_msg", "vorLQ_inputCompletetime");
			return;
		}

		if (!me.validHoseOnOffTimeHHT(editItem)) {
			MessageUtil.warning("warning_msg", "vorLQ_notInShiftTime");
			return;
		}
	
		if(!me.validateHsOnOffCmplDtlHHT()) {
			return;
		}
		
//		if (!me.validATB(theVessel.atb, editItem.stDt, editItem.endDt)) {
//			if (theVessel.vslShiftingYN != null && theVessel.vslShiftingYN != "") {
//				var atb = Ext.Date.format(theVessel.atb, 'd/m/Y H:i');
//				MessageUtil.warning('warning_msg', "vor_validtimewithatb",atb);
//				return;
//			}
//		}
//		if (!me.validATU(theVessel.atu, editItem.stDt, editItem.endDt)) {
//			if (theVessel.vslShiftingYN != null && theVessel.vslShiftingYN != "") {
//				var atu = Ext.Date.format(theVessel.atu, 'd/m/Y H:i');
//				MessageUtil.warning('warning_msg', "vor_validtimewithatu",atu);
//				return;
//			}
//		}
		me.validateDGConfirmedCmdt(editItem,'U');
	},
	
	doAddOpr: function () {
		var me = this;
		var refs = me.getReferences();
		var record= me.getViewModel().get('theJettyOpr');
		if(record.tonHdlAmt < 1 && !refs.refcboCompleteOpr.getChecked()){
			MessageUtil.questionModern('confirm', 'Do you want to mark this job as completed?',null, function (button) {
				if (button === 'ok') {
					refs.refcboCompleteOpr.setChecked(true);
				}
				me.beginProcessOpr();
			});
		}else{
			me.beginProcessOpr();
		}
	},
	
	// HHT
	beginProcessOpr: function(){
		var me = this;
		var theVessel = me.getViewModel().get('theVessel');
		var record= me.getViewModel().get('theJettyOpr');
		var vslShifting = me.getViewModel().getStore('vesselShifting');
		
		me.getRecordOpr(record);
		
		if(!me.validHoseOn(record,me.MODE_ADD))
		{
			MessageUtil.warning("warning_msg", "vorLQ_inputHoseOntime");
			return;
		} 
		if(!me.validHoseTimeLine(record))
		{
			MessageUtil.warning("warning_msg", "vorLQ_invalidHoseTimeLine");
			return;
		}
		if (!me.validHoseOffHHT(record)) {
			MessageUtil.warning("warning_msg", "vorLQ_inputCompletetime");
			return;
		}
		if (!me.validHoseOnOffTimeHHT(record)) {
			MessageUtil.warning("warning_msg", "vorLQ_notInShiftTime");
			return;
		}
		
		if(!me.validateHsOnOffCmplDtlHHT()) {
			return;
		}
		
//		if (!me.validDateHHT(fromDT, toDT)) {
//			MessageUtil.warning('warning_msg', 'vorLQ_validStartEndTime');
//			return;
//		}
		
//		if (!me.validATB(theVessel.atb, record.stDt, record.endDt)) {
//			if (theVessel.vslShiftingYN != null && theVessel.vslShiftingYN != "") {
//				var atb = Ext.Date.format(theVessel.atb, 'd/m/Y H:i');
//				MessageUtil.warning('warning_msg', "vor_validtimewithatb",atb);
//				return;
//			}
//		}
//		if (!me.validATU(theVessel.atu, record.stDt, record.endDt)) {
//			if (theVessel.vslShiftingYN != null && theVessel.vslShiftingYN != "") {
//				var atu = Ext.Date.format(theVessel.atu, 'd/m/Y H:i');
//				MessageUtil.warning('warning_msg', "vor_validtimewithatu",atu);
//				return;
//			}
//		}
		
		me.validateDGConfirmedCmdt(record,'C');
	},
	
	
	validateHsOnOffCmplDtlHHT: function(){
		var me = this;
		var theVessel = me.getViewModel().get('theVessel');
		var record= me.getViewModel().get('theJettyOpr');
		var vslShifting = me.getViewModel().getStore('vesselShifting');
		
		if(!vslShifting) return;
		
		if (theVessel.vslShiftingYN != null && theVessel.vslShiftingYN != "") {
			
			if( vslShifting.getData().length == 0) {
				// If there is no newATB/newAtu in screen Vessel Shifting
				var atb = (theVessel.atb == null) ? null : new Date(theVessel.atb);
				var atu = (theVessel.atu == null) ? null : new Date(theVessel.atu);
				if(!me.validHoseOffHHTWithCurAtb(atb, record)) {
					MessageUtil.warning('warning_msg', 'vorliquidbulk_no_vesselShifting_msg');
					return false;
				}
				if(!me.validHoseOffHHTWithCurAtu(atu, record)) {
					MessageUtil.warning('warning_msg', 'vorliquidbulk_no_vesselShifting_msg');
					return false;
				}
				
			} else if( vslShifting.getData().length == 1) {
				// If there is one in screen Vessel Shifting
				var newAtb = (theVessel.currAtb == null) ? null : new Date(theVessel.currAtb);
				var newAtu = (theVessel.currAtu == null) ? null : new Date(theVessel.currAtu);
				
				if(!me.validHoseOffHHTWithCurAtb(newAtb, record)) {
					MessageUtil.warning('warning_msg', 'vorliquidbulk_hoseOnOffCmmcCmplt_newAtb_msg');
					return false;
				}
				if(!me.validHoseOffHHTWithCurAtu(newAtu, record)) {
					MessageUtil.warning('warning_msg', 'vorliquidbulk_hoseOnOffCmmcCmplt_newAtu_msg');
					return false;
				}
			} else if( vslShifting.getData().length > 1) {
				// If there has got 2 or more records in screen Vessel Shifting
				var newAtb = (me.EARLIEST_ATB == null) ? null : Ext.Date.parse(me.EARLIEST_ATB, 'd/m/Y H:i');
				var newAtu = (me.LATEST_ATU == null) ? null : Ext.Date.parse(me.LATEST_ATU, 'd/m/Y H:i');
				
				if(!me.validHoseOffHHTWithCurAtb(newAtb, record)) {
					MessageUtil.warning('warning_msg', "vor_validtimewithatb_shifting", me.EARLIEST_ATB);
					return false;
				}
				
				if(	!StringUtil.isNullorEmpty(me.EARLIEST_ATB) && !StringUtil.isNullorEmpty(me.LATEST_ATU) ) {
					
					if ( newAtb > newAtu ) {
						
						if(!me.validHHTPreAtbPreAtu(newAtb, newAtu, record)) {
							MessageUtil.warning('warning_msg', "vor_validtimewithatb_shifting", me.EARLIEST_ATB);
							return;
						}
						
					} else {
						
						if( !me.validHoseOffHHTWithCurAtu(newAtu, record)) {
							MessageUtil.warning('warning_msg', "vor_validtimewithatu_shifting", me.LATEST_ATU);
							return false;
						}
						
					}
				}
			}
		}
		
		return true;
	},
	
	validateDGConfirmedCmdt: function(record,workingStatus){
		var me = this; 
		var refs = me.getReferences();
		var store = me.getStore('jettyOprValidate');
		store.load({
			params:{
				tyCd: 'dgConfirmedCmdt',
				col1: record.vslCallId,
				col2: record.cmdtCd,
				col3: record.opeTp,
				col4: record.cgTpCd,
				col5: record.tkOpr,
			},
			callback: function(records, operation, success) {
				if (success) {
					if ((!records || records.length < 1) && record.cgTpCd == 'LQN') {
						MessageUtil.questionModern('confirm', 'vor_validateDGConfirmedCmdt',record.cmdtCd, function (button) {
							if (button === 'ok') {
								me.processOpr(record,workingStatus);
							}
						});
					}
					else
					{
						me.processOpr(record,workingStatus);
					}
				}
			}	
		})
	},
	processOpr: function(record,workingStatus)
	{
		var me = this
		record.workingStatus = workingStatus;
		record.userId = MOST.config.Token.getUserId();
		var masterItem = Ext.create('MOST.model.operation.VORLiquidBulk');
		var vesselShifting = me.getViewModel().getStore('vesselShifting');
		var shiftId = MOST.config.Token.getWorkShift(); 
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/vorliquidbulk/detail';
		updateParm.phantom = true;
		updateParm.set('workingStatus', workingStatus);
		updateParm.set('items', [record]);

		// masterItem.set("vorLiquidBulk", sendArray);
		// var proxy = masterItem.getProxy();
		// proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/vorliquidbulk/detail';
		
		if(shiftId && //shiftId === 'SF0014' && 
				vesselShifting && vesselShifting.getData().length == 0) {
			updateParm.save({
				success: function () {
					MessageUtil.saveSuccess();
					me.setDetailControlOPR(record);
					me.onTblClearOpr();
				}
			});	
		} else if(shiftId && //shiftId !== 'SF0014' && 
				vesselShifting && vesselShifting.getData().length > 0) {
			MessageUtil.questionModern('Confirm','vorExistedVesselShifting', null,function(button){
				if(button === 'ok'){
					updateParm.save({
						success: function () {
							MessageUtil.saveSuccess();
							me.setDetailControlOPR(record);
							me.onTblClearOpr();
						}
					});	
				}
			});
		}
	},
	onTblClearOpr: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refJettyOPRGridList;
		var gridCmdt = refs.refGidCS2Info;
		grid.setSelection(false);
		gridCmdt.setSelection(false);
		refs.oprDetail.reset();
		me.getViewModel().set('theJettyOpr', null);
		me.gridSelected = false;
		refs.reftxtTonnage.setDisabled(true);
		refs.refBlSnNoCombo.setValue('')
	},
	
	getRecordOpr: function(record){
		var me = this;
		var refs = me.getReferences();
		var cmdtCombo = me.getStore('cmdtComboTbl');
		var blSnComboStore = me.getStore('blSnComboTbl');
		var theVessel = me.getViewModel().get('theVessel');
		// cmdt = cmdtCombo.findRecord('no', refs.refCboCmdt.getValue());
		var foundBlSn = blSnComboStore.findRecord('scd', refs.refBlSnNoCombo.getValue());
		record.cmdtCd = refs.refCboCmdt.getValue();
		record.seqCS2 = foundBlSn.get('seq');
		record.opeTp = 'GEN';
		record.cgTpCd = refs.refCboCgtpOpr.getValue();;
		record.jobTpCd = refs.refCboJobTpCd.getValue();
		record.tkOpr = refs.refCboTkOpr.getValue();
		record.pkgTpCd = refs.refCboPkgTpCd.getValue();
		record.shprCnsne =refs.refCboShprCnsne.getValue();
		record.cnsne = refs.refCboCnsne.getValue();
		record.vslCallId = theVessel.vslCallId;
		record.scn = me.getViewModel().get('theVessel').scn
		record.workYmd = me.getViewModel().get('globalWorkDate');
		record.shftId = me.getViewModel().get('globalWorkShift');
		//record.hoseCmplYn = 'N';
		//vessel Shifting Seq
		//record.vslShiftingSeq = theVessel.vslShiftingSeq;
		//	item.vslShiftingSeq = txtVslShiftingSeq.Value.toString();
		record.hoseOnDt = Ext.Date.parse(refs.refDtHoseOn.getValue(), me.format); 
		record.stDt = Ext.Date.parse(refs.refDtCommence.getValue(), me.format); 
	    record.endDt =Ext.Date.parse(refs.refDtComplete.getValue(), me.format);  
		record.hoseOffDt =Ext.Date.parse(refs.refDtHoseOff.getValue(), me.format);  
		record.insertType = 'cargoProc';
		record.vslShiftingSeq = theVessel.vslShiftingSeq;

		if(refs.refcboCompleteOpr._checked)
		{
			record.jobCmplYn = 'Y';
		}
		else{
			record.jobCmplYn = 'N';
		}
		return record;
	},

	onCellClickOPRTbl: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refJettyOPRGridList');
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		me.getViewModel().set('theJettyOpr', selection.getData());
		refs.reftxtNos.setValue(selection.data.lineNumber);
		if (selection.data.jobCmplYn === 'Y') {
			refs.refcboCompleteOpr._checked = true;
			refs.refcboCompleteOpr.updateChecked(true);
		}
		else {
			refs.refcboCompleteOpr._checked = false;
			refs.refcboCompleteOpr.updateChecked(false);
		}
		refs.refCboCmdt.setValue(selection.data.cmdtCd);
		refs.refBlSnNoCombo.setValue(selection.data.docNo)
		refs.reftxtTonnage.setValue(selection.data.tonHdlAmt);
		refs.refDtHoseOn.setValue(selection.data.hoseOnDt);
		refs.refDtCommence.setValue(selection.data.stDt);
		refs.refDtComplete.setValue(selection.data.endDt);
		refs.refDtHoseOff.setValue(selection.data.hoseOffDt);
		me.gridSelected = true;
		me.setLDDS(selection);
		
		var cmdtGridStore = me.getStore('vorliquidbulkcmdt');
		var selection = cmdtGridStore.findRecord('no', selection.data.seqCS2, 0, false, false, true);
		refs.refGidCS2Info.setSelection(selection);
		
		// Added by Harry
		var grid = me.lookupReference('refJettyOPRGridList');
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		
		var hoseOnDt = Ext.Date.format(selection.data.hoseOnDt, 'd/m/Y H:i');
		var hoseOffDt = Ext.Date.format(selection.data.hoseOffDt, 'd/m/Y H:i');
		var stDt = Ext.Date.format(selection.data.stDt, 'd/m/Y H:i');
		var endDt = Ext.Date.format(selection.data.endDt, 'd/m/Y H:i');
			
		refs.reftxtPrevHoseOnDt.setValue(hoseOnDt);
		refs.reftxtPrevHoseOffDt.setValue(hoseOffDt);
		refs.reftxtPrevCommenceDt.setValue(stDt);
		refs.reftxtPrevCompleteDt.setValue(endDt);
		
	},
	fetchHoseTimeFromPrevShift: function(selection){
		var me = this;
		var refs = me.getReferences();
		var oprTimeSetStore = me.getStore('oprTimeSetStore');

		refs.reftxtPrevHoseOnDt.setValue('');
		refs.reftxtPrevHoseOffDt.setValue('');
		refs.reftxtPrevCommenceDt.setValue('');
		refs.reftxtPrevCompleteDt.setValue('');

		oprTimeSetStore.load({
			params: {
				vslCallId: me.VSL_CALL_ID,
				cgTpCd: selection.data.cgTpCd,
				jobTpCd: selection.data.jobTpCd,
				cmdtCd: selection.data.cmdtCd, // add by Harry
				searchType: 'HHT_OprTimeSetTbl',
			},
			callback: function (records, operation, success) {
				if (success && records[0]) {
					var prevHoseOnDt = me.getStringDate(records[0].data.hoseOnDt);
					var prevHoseOffDt = me.getStringDate(records[0].data.hoseOffDt);
					var prevCommenceDt = me.getStringDate(records[0].data.stDt);
					var prevCompleteDt = me.getStringDate(records[0].data.endDt);
					refs.reftxtPrevHoseOnDt.setValue(prevHoseOnDt);
					refs.reftxtPrevHoseOffDt.setValue(prevHoseOffDt);
					refs.reftxtPrevCommenceDt.setValue(prevCommenceDt);
					refs.reftxtPrevCompleteDt.setValue(prevCompleteDt);
				}
			}
		});
	},
	onChangeTonage: function(){
		var me = this
		me.calcPumpRateTbl();
	},
	calcPumpRateTbl: function(){
		var me = this;
		var refs = me.getReferences();
		var recvData;
		var pumpRate = 0;
		var tonAmnt = 0;
		var countTime = 0;
		var cgTpCd;
		// var shftId = me.getViewModel().get('globalWorkShift');
		// var shiftListStore = refs.refCbxShft.getStore();
		var shift = me.getViewModel().get('globalWorkShiftInfo')
		var grid = me.lookupReference('refJettyOPRGridList');
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		if(selection&&selection.data.pumpRate && selection.data.tonHdlAmt == refs.reftxtTonnage.getValue())
		{
			refs.reftxtPumpRate.setValue(selection.data.pumpRate);
			return;
		}
		if(selection)
		{
			var record= me.getViewModel().get('theJettyOpr');
			cgTpCd = record.cgTpCd;
		}
		else{
			cgTpCd = refs.refCboCgtpOpr.getValue();
		}

		var fmShiftTime = me.getShiftStartTime(shift,me.WORKDATE);
		var toShiftTime = me.getShiftEndTime(shift,me.WORKDATE);
		var startTime = Ext.Date.parse(refs.refDtCommence.getValue(), me.format);
		var endTime = Ext.Date.parse(refs.refDtComplete.getValue(), me.format);
		if (refs.reftxtTonnage.getValue()) {
			tonAmnt = refs.reftxtTonnage.getValue();
		}

		if (!startTime) {
			startTime = fmShiftTime;
		}

		if (!endTime) {
			endTime = toShiftTime;
		}

		if (startTime != null && endTime != null) {
			countTime = ((endTime.getTime() + 60000) - startTime.getTime()) / 3600000;
			countTime -= me.getDelayTimeSum(recvData, cgTpCd, startTime, endTime);
		}
		if (countTime != 0) {
			pumpRate = tonAmnt / countTime;
		}
		refs.reftxtPumpRate.setValue(pumpRate.toFixed(3));
	},
	getShiftStartTime: function (sltedShift, workDate) {
		var me =this;
		var strFromDt = workDate + ' ' + sltedShift.fmHhMm.substr(0, 2) + ':' + sltedShift.fmHhMm.substr(2, 4);
		return Ext.Date.parse(strFromDt, me.format);
	},
	getShiftEndTime: function (sltedShift, workDate) {
		var me =this;
		var strToDt = workDate + ' ' + sltedShift.toHhMm.substr(0, 2) + ':' + sltedShift.toHhMm.substr(2, 4);
		var endShftDTime = Ext.Date.parse(strToDt, me.format);
		if (sltedShift.shftId === 'SF0013') {
			endShftDTime = new Date(endShftDTime.getTime() + (24 * 60 * 60 * 1000));
		}
		return endShftDTime;
	},
	
	// HHT
	validHoseTimeLine: function(item){
		var me=this;
		var hoseOnDt = item.hoseOnDt
		var stDt = item.stDt;
		var endDt = item.endDt;
		var hoseOffDt = item.hoseOffDt;
		if ( !me.validDateHHT(hoseOnDt,stDt) ||  !me.validDateHHT(hoseOnDt,endDt) ||  !me.validDateHHT(hoseOnDt,hoseOffDt) ||  !me.validDateHHT(stDt,endDt) ||  !me.validDateHHT(stDt,hoseOffDt) ||  !me.validDateHHT(endDt,hoseOffDt)) {
			 return false;
		}			
		return true ; 	
	}, 
	validHoseOnOffTimeHHT: function (item) {
		var me = this;
		var refs = me.getReferences();
		var shiftInfo = me.getViewModel().get('globalWorkShiftInfo')
		var workDate = me.getViewModel().get('globalWorkDate')
		var shiftStart = me.getShiftStartTime(shiftInfo,workDate);
		var shiftEnd = me.getShiftEndTime(shiftInfo,workDate);
		var hoseOnDt = item.hoseOnDt
		var stDt = item.stDt;
		var endDt = item.endDt;
		var hoseOffDt = item.hoseOffDt;
		return (
			//me.validDateHHT(shiftStart, hoseOnDt) && 
			me.validDateHHT(hoseOnDt, shiftEnd) &&
			me.validDateHHT(shiftStart, stDt) && me.validDateHHT(stDt, shiftEnd) &&
			me.validDateHHT(shiftStart, endDt) && me.validDateHHT(endDt, shiftEnd) &&
			me.validDateHHT(shiftStart, hoseOffDt) && me.validDateHHT(hoseOffDt, shiftEnd))
	},
	validHoseOn: function(item,mode)
	{
		var me = this;
		var refs = me.getReferences();
		var selectedItem = refs.refJettyOPRGridList.getSelection();
		var prevHoseOnDt = refs.reftxtPrevHoseOnDt.getValue();
		if(
				item &&
				(
					(mode == me.MODE_UPDATE && selectedItem.data.hoseOnDt && !item.hoseOnDt) ||
					(mode == me.MODE_ADD && !item.hoseOnDt && !prevHoseOnDt)
				)
					
		){
			return false;
		}
		
		return true;
	},
	
	/************************************************************************
	 * HHT
	 */
	validHoseOffHHTWithCurAtb: function (newAtb, item) {
		if ( 	(newAtb && item.hoseOnDt 	&& item.hoseOnDt < new Date(newAtb) ) ||
				(newAtb && item.hoseOffDt 	&& item.hoseOffDt < new Date(newAtb) ) ||
				(newAtb && item.stDt 		&& item.stDt < new Date(newAtb) ) ||
				(newAtb && item.endDt 		&& item.endDt < new Date(newAtb) )
		) {
			return false;
		}
		return true;
	},
	
	validHoseOffHHTWithCurAtu: function(newAtu, item){
		var me = this;

		if (	(newAtu && item.hoseOnDt 	&& item.hoseOnDt > new Date(newAtu) ) ||
				(newAtu && item.hoseOffDt 	&& item.hoseOffDt > new Date(newAtu) ) ||
				(newAtu && item.stDt 		&& item.stDt > new Date(newAtu) ) ||
				(newAtu && item.endDt 		&& item.endDt > new Date(newAtu) )
		) {
			return false;
		}
		
		return true;
	},
	
	validHHTPreAtbPreAtu: function(newAtb, newAtu, item){
		var me = this;
		var refs = me .getReferences();
    	var hoseOn = item.hoseOnDt;
    	var hoseOff = item.hoseOffDt;
    	
    	if (new Date(newAtu) < new Date(newAtb)) {
    		if (
    				(
						hoseOn && hoseOff &&
	    				(
							hoseOn < new Date(newAtb) ||
							hoseOff < new Date(newAtb) ||
		    				hoseOff < hoseOn
	    				)
    				)
			) {
    			return false;
    		}
    	}
    	
		return true;
	},
	
//	validHoseOffHHTWithCurAtb: function (newAtb, item) {
//		if ( 	(newAtb && item.hoseOnDt 	&& item.hoseOnDt < Ext.Date.parse(newAtb, 'd/m/Y H:i') ) ||
//				(newAtb && item.hoseOffDt 	&& item.hoseOffDt < Ext.Date.parse(newAtb, 'd/m/Y H:i') ) ||
//				(newAtb && item.stDt 		&& item.stDt < Ext.Date.parse(newAtb, 'd/m/Y H:i') ) ||
//				(newAtb && item.endDt 		&& item.endDt < Ext.Date.parse(newAtb, 'd/m/Y H:i'))
//		) {
//			return false;
//		}
//		return true;
//	},
	
//	validHoseOffHHTWithCurAtu: function(newAtu, item){
//		var me = this;
//
//		if (	(newAtu && item.hoseOnDt 	&& item.hoseOnDt > Ext.Date.parse(newAtu, 'd/m/Y H:i') ) ||
//				(newAtu && item.hoseOffDt 	&& item.hoseOffDt > Ext.Date.parse(newAtu, 'd/m/Y H:i') ) ||
//				(newAtu && item.stDt 		&& item.stDt > Ext.Date.parse(newAtu, 'd/m/Y H:i') ) ||
//				(newAtu && item.endDt 		&& item.endDt > Ext.Date.parse(newAtu, 'd/m/Y H:i') )
//		) {
//			return false;
//		}
//		
//		return true;
//	},
	
	validHoseOnHHT: function(item,mode) {
		var me = this;
		var refs = me.getReferences();
		var selectedItem = refs.refJettyOPRGridList.getSelection();
		var prevHoseOnDt = refs.reftxtPrevHoseOnDt.getValue();
		if(		item &&
				(
					(mode == me.MODE_UPDATE && selectedItem.data.hoseOnDt && !item.hoseOnDt) ||
					(mode == me.MODE_ADD && !item.hoseOnDt && !prevHoseOnDt)
				)
					
		)
		{
			return false;
		}
		return true;
	},
	
	
//	validATU: function (currAtu, startDate, endDate) {
//		var me = this;
//		var isValid = false;
//		
//		if( currAtu != null ) {
//			if( startDate && me.validDateHHT(startDate, currAtu)) {
//				isValid = true;
//			}
//			
//			if( endDate && me.validDateHHT(endDate, currAtu)) {
//				isValid = true;
//			}
//		} 
//		
//		// return (me.validDateHHT(startDate, currAtu) && me.validDateHHT(endDate, currAtu) );
//		return isValid;
//	},
	validATU: function (currAtu, startDate, endDate) {
		var me = this;
		return (me.validDateHHT(startDate, currAtu) && me.validDateHHT(endDate, currAtu) );

	},
	validATB: function (currAtb, startDate, endDate) {
		var me = this;
		return (me.validDateHHT(currAtb, startDate) && me.validDateHHT(currAtb, endDate) );

	},
	getStringDate: function (value) {//dd/mm/YYYY hh:mm
		var me = this;
		if (value instanceof Date) {
			var value = Ext.Date.format(value, me.format);
		}
		//'d/m/Y H:i'
		if (me.format === MOST.config.Locale.getDefaultDateFormatWithNoSeconds()) {
			if (value == null || value == '') {
				return;
			} else if (value.trim() == '') {
				return;
			}
			try {
				var day = value.substring(0, 2)
				var month = value.substring(3, 5);
				var year = value.substring(6, 10);
				var hhmm = value.substring(11, 16);
				return day + '/' + month + '/' + year + ' ' + hhmm
			}
			catch (err) {
				console.log(err);
			}
		}
	},
	setLDDSCmdt: function (selection) {
		var me = this;
		if (selection.data.jobTpCd == 'DS'||selection.data.jobTpCd == 'SD'||selection.data.jobTpCd == 'TD') {
			me.setValueLDDS('', selection.data.disPlanMt, '', selection.data.disActualMt)
		}
		else if (selection.data.jobTpCd == 'LD'||selection.data.jobTpCd == 'SL'||selection.data.jobTpCd == 'TL') {
			me.setValueLDDS(selection.data.loadPlanMt, '', selection.data.loadActualMt, '')
		} 
	},
	setLDDS: function (selection) {
		var me = this;
		if (selection.data.jobTpCd == 'DS') {
			me.setValueLDDS('', selection.data.disPlanMt_h, '', selection.data.tonHdlAmt)
		} else if (selection.data.jobTpCd == 'SD') {
			me.setValueLDDS('', selection.data.disPlanMtSts_h, '', selection.data.tonHdlAmt)
		} else if (selection.data.jobTpCd == 'TD') {
			me.setValueLDDS('', selection.data.disPlanMtTls_h, '', selection.data.tonHdlAmt)
		}
		if (selection.data.jobTpCd == 'LD') {
			me.setValueLDDS(selection.data.loadPlanMt_h, '', selection.data.tonHdlAmt, '')
		} else if (selection.data.jobTpCd == 'SL') {
			me.setValueLDDS(selection.data.loadPlanMtSts_h, '', selection.data.tonHdlAmt, '')
		} else if (selection.data.jobTpCd == 'TL') {
			me.setValueLDDS(selection.data.loadPlanMtTls_h, '', selection.data.tonHdlAmt, '')
		}
	},
	setRawValue: function (cb, store, item, value) {
		store.data.clear();
		store.insert(0, [item]);
		cb.setValue(value);
	},
	setValueLDDS: function (loadPlanMt, disPlanMt, loadActualMt, disActualMt) {
		var me = this;
		var refs = me.getReferences();
		var balLoadMt = '';
		var balDisMt = '';
		if (!loadPlanMt || loadPlanMt === 0) {
			balDisMt = disPlanMt - disActualMt;
			refs.reftxtLDoc.setValue('');
			refs.reftxtLHandle.setValue('');
			refs.reftxtDDoc.setValue(disPlanMt);
			refs.reftxtDHandle.setValue(disActualMt);
		}
		else {
			balLoadMt = loadPlanMt - loadActualMt;
			refs.reftxtDDoc.setValue('');
			refs.reftxtDHandle.setValue('');
			refs.reftxtLDoc.setValue(loadPlanMt);
			refs.reftxtLHandle.setValue(loadActualMt);
		}
		refs.reftxtLBalance.setValue(balLoadMt);
		refs.reftxtDBalance.setValue(balDisMt);
	},
	validHoseOffHHT: function (item) {
		if (item.jobCmplYn.toString() == 'Y' && !item.endDt) {
			return false;
		}
		return true;
	},
	validDuplicatedOPR: function (isUpdate, detail) {
		var me = this;
		var refs = me.getReferences();
		var valid = true;
		if (detail === null) return valid;
		var shiftId = refs.refCbxShft.getValue();
		var endDt = refs.refEndTime.getValue();
		var workYmd = refs.refWorkDateTextfield.getValue();
		var stDt = refs.refWorkingDate.getDate();
		detail.stDt = stDt;
		detail.endDt = endDt;
		detail.workYmd = workYmd;
		detail.shftId = shiftId;
		var store = me.getViewModel().getStore('cargoSummary');
		store.each(function (record, index) {
			if (isUpdate && detail.seq === record.get('seq')) {
			}
			else {
				if (detail.workYmd == record.data.workYmd &&
					detail.shftId == record.data.shftId &&
					detail.hatchNo == record.data.hatchNo &&
					detail.eqNo == record.data.eqNo) {
					if (me.isIncludeTime(record.data.stDt, record.data.endDt, detail.stDt, detail.endDt)) {
						valid = false;
						return valid;
					}
					if (me.isIncludeTime(detail.stDt, detail.endDt, record.data.stDt, record.data.endDt)) {
						valid = false;
						return valid;
					}
				}
			}
		});
		return valid;
	},
	validateDataOPR: function (detailData, fn) {
		var me = this;
		var validStore = me.getStore('jettyOprValidate');
		validStore.load({
			params: {
				tyCd: 'existsJettyOpr',
				col1: detailData.vslCallId,
				col2: detailData.cgTpCd,
				col3: detailData.delayCode,
				col4: detailData.workYmd,
				col5: detailData.shftId,
				col6: detailData.startTime,
				col7: detailData.endTime,
				col8: detailData.seq,
			},
			callback: function (records, operation, success) {
				if (success) {
					if (records != null && records.length > 0) {
						if (records[0].get('ref1') == '' || records[0].get('ref1') == null) {
							MessageUtil.warning('warning_msg', 'vorLQ_invalidDlCd');
							return;
						}
						if (records[0].get('isValidated') === 'N') {
							MessageUtil.warning('warning_msg', 'vorLQ_duplicatedWorkTime');
							return;
						}
						fn();
					}
				}
			}
		});
	},
	/*
	 *Start  Event Function JETTY DELAY:
	 * */
	onTblSearchDelayCd: function (ctl) {
		var store = this.getStore('delayCodeTbl');
		var tpVal = 'CD';//this.lookupReference('refTypeCombo').getValue();
		var scdVal = ''
		var col1Val = '';
		var lcd = 'LIQUIQ';
		var refDlyList = this.lookupReference('refLstDlyCtgCd');
		// if (ctl.xtype === 'list') {
		// 	this.lookupReference('txtDelayCd').reset();
		// 	col1Val = (refDlyList.getSelection()) ? refDlyList.getSelection().getData().dlyCgt : '';
		// } else
		if (ctl.xtype === 'combobox') {
			this.lookupReference('txtDelayCd').reset();
			col1Val = (refDlyList.getSelection()) ? refDlyList.getSelection().getData().dlyCgt : '';			
		} else {
			refDlyList.reset();
			scdVal = this.lookupReference('txtDelayCd').getValue();
		}
		store.load({
			params: {
				delayTpCd: tpVal,
				delayCd: scdVal,
				delayCatgCd: col1Val,
				delayCgTp: lcd,
			},
			callback: function (record, ope, success) {
				if (success) {
					store.each(function (record, index) {
						var fullCdNm = record.get('scd') + ' - ' + record.get('scdNm');
						record.set('fullCdNm', fullCdNm);
					});
					store.commitChanges();
				}
			}
		});
	},
	
	onChangeDelayCd: function (ref, newVal, oldVal){
		var me = this;
		var refs = me.getReferences();

		var delayStore = me.getStore('delayCodeTbl');
		delayStore.clearFilter();
		if(!newVal){
			return;
		}
		oldVal = (oldVal == null) ? "" : oldVal;
		ref.setValue(newVal.toUpperCase());
		if(newVal.toUpperCase()!== oldVal.toUpperCase()){
			delayStore.filter(function(record){
				if(record.get('scd').toLowerCase().includes(newVal.toLowerCase())
					||record.get('scdNm').toLowerCase().includes(newVal.toLowerCase())){
					return record;
				}
			});
		}
	},
	
	onTblSelectDelayCdGrid: function () {
		var me = this;
		var refs = me.getReferences();
		var row = refs.refDelayCodeGrid.getSelection();
		refs.txtDelayCd.setValue(row.data.scd)
	},
	onCellClickDelayTbl: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refJettyDelayGridList');
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		me.getViewModel().set('theJettyDelay', selection.getData());
		refs.refStartTime.setValue(selection.data.startTime);
		refs.refEndTime.setValue(selection.data.endTime);
		refs.refLstDlyCtgCd.setValue(selection.data.dlyCatgCd)
	},
	onTblClearDelay: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refJettyDelayGridList;
		grid.setSelection(false);
		refs.delayDetail.reset();
		me.getViewModel().set('theJettyDelay', null);
		me.setTimeWithShiftHHT();
	},
	onTblCreateDelay: function () {
		var me = this;
		var refs = me.getReferences();
		var delayCodeStore = me.getStore('delayCodeTbl');
		
		var detailForm = refs.delayDetail.validate();
		//Check required field:
		if (!detailForm) {
			MessageUtil.warning('warning_msg', 'vorLQ_missingRequiredField');
			return;
		}
		var delayFrom = refs.refStartTime.getValue();
		var delayTo = refs.refEndTime.getValue();
		var theVessel = me.getViewModel().get('theVessel');
		// Process to add new Data:
		var detailData = me.getViewModel().get('theJettyDelay');
		if (detailData === null) {
			detailData = Ext.create('MOST.model.operation.VORLiquidBulk');
		}
		var delayCdRecord = delayCodeStore.findRecord('scd', detailData.delayCode);
		detailData.accDelay = delayCdRecord.get('acptYN');
		
		detailData.startTime = delayFrom;
		detailData.endTime = delayTo;
		detailData.workYmd = me.getViewModel().get('globalWorkDate')
		detailData.shftId =me.getViewModel().get('globalWorkShift')
		detailData.seq = '';
		 var fromDT = Ext.Date.parse(delayFrom,me.format);
		 var toDT = Ext.Date.parse(delayTo,me.format);
		detailData.vslCallId = theVessel.vslCallId;
		detailData.insertType = 'delayProc';
		detailData.userId =  MOST.config.Token.getUserId();
		if (detailData.tlsOprYn == 'Y') {
			detailData.opeTp = 'TLS';
		}
		if (detailData.stsOprYn == 'Y') {
			detailData.opeTp = 'STS';
		}
		if (detailData.genOprYn == 'Y') {
			detailData.opeTp = 'GEN';
		}
		detailData.opeTp = 'GEN';
		//Check time rule
		if (!me.validDateHHT(fromDT, toDT)) {
			MessageUtil.warning('warning_msg', 'vorLQ_validStartEndTime');
			return;
		}
		//Check time with shift rule:
		if (!me.validateTimeShift(detailData)) {
			return;
		}
		detailData.workingStatus = 'C';
		detailData.vslCallId = me.VSL_CALL_ID;
		//Check dublicate data
		me.validateDataDelay(detailData, function () {
			detailData.startTime = fromDT;
			detailData.endTime = toDT;

			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			updateParm.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/vorliquidbulk/detail';
			updateParm.phantom = true;
			updateParm.set('workingStatus', 'C');
			updateParm.set('items', [detailData]);
			MessageUtil.questionModern('confirm', 'infosave_msg', null, function (button) {
				if (button === 'ok') {
					updateParm.save({
						success: function () {
							MessageUtil.saveSuccess();
							me.onTblRetrive();
							me.onTblClearDelay();
							me.loadDelayTimeSum();
						}
					});
				}
			});
		});
	},
	onTblUpdateDelay: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refJettyDelayGridList;
		var detailForm = refs.delayDetail.validate();
		var delayCodeStore = me.getStore('delayCodeTbl');
		var selectedRecord = grid.getSelection();
		if (!selectedRecord) {
			MessageUtil.warning("warning_msg", "vorLQ_updateRecordEmptyMsg");
			return;
		}
		//Check required field:
		if (!detailForm) {
			MessageUtil.warning("warning_msg", "vorLQ_missingRequiredField");
			return;
		}
		var editItem = me.getViewModel().get('theJettyDelay');
		//Update row:
		var delayCdRecord = delayCodeStore.findRecord('scd', editItem.delayCode);
		editItem.accDelay = delayCdRecord.get('acptYN');
		editItem.startTime = refs.refStartTime.getValue();
		editItem.endTime = refs.refEndTime.getValue();
		editItem.workYmd = me.getViewModel().get('globalWorkDate')
		editItem.vslCallId = me.VSL_CALL_ID;
		editItem.insertType = 'delayProc';
		editItem.workingStatus ='U';
		editItem.seq = selectedRecord.get('seq')
		var fromDT = Ext.Date.parse(editItem.startTime,me.format);
		var toDT = Ext.Date.parse( editItem.endTime,me.format);
		if (!me.validDateHHT(fromDT, toDT)) {
			MessageUtil.warning('warning_msg', 'vorLQ_validStartEndTime');
			return;
		}
		//Check time with shift rule:
		if (!me.validateTimeShift(editItem)) {
			return;
		}
		//Check biz rule data:
		me.validateDataDelay(editItem, function () {
			MessageUtil.questionModern('confirm', 'infoupdate_msg', null, function (button) {
				if (button = 'ok') {
					var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
					updateParm.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/vorliquidbulk/detail';
					updateParm.phantom = true;
					updateParm.set('workingStatus', 'U');
					updateParm.set('items', [editItem]);
					updateParm.save({
						success: function () {
							MessageUtil.saveSuccess();
							me.onTblRetrive();
							me.onTblClearDelay();
							me.loadDelayTimeSum();
						}
					});
				}
			});
		});
	},
	onTblDeleteDelay: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refJettyDelayGridList;
		var selectedRecord = grid.getSelection();
		if (!selectedRecord) {
			MessageUtil.warning('Warning', 'vorLQ_deleteRecordEmptyMsg');
			return;
		}
		var detailData = me.getViewModel().get('theJettyDelay');
		detailData.insertType = 'delayProc';
		detailData.workingStatus = 'D';
		MessageUtil.questionModern('confirm', 'infodelete_msg', null,
			function (button) {
				if (button === 'ok') {
					var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
					updateParm.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/vorliquidbulk/detail';
					updateParm.phantom = true;
					updateParm.set('workingStatus', 'D');
					updateParm.set('items', [detailData]);
					updateParm.save({
						success: function () {
							MessageUtil.saveSuccess();
							me.onTblRetrive();
							me.onTblClearDelay();
							me.loadDelayTimeSum();
						}
					});
				}
			}
		);
	},
	//Checking duplicate with overlap time record:
	validateDataDelay: function (detailData, fn) {
		var me = this;
		//var refs = me.getReferences();
		var validStore = me.getStore('delayJettyValidate');
		//var isDuplicate = false;
		validStore.load({
			params: {
				tyCd: 'existsJettyDelay',
				col1: detailData.vslCallId,
				col2: detailData.cgTpCd,
				col3: detailData.delayCode,
				col4: detailData.workYmd,
				col5: detailData.shftId,
				col6: detailData.startTime,
				col7: detailData.endTime,
				col8: detailData.seq,
			},
			callback: function (records, operation, success) {
				if (success) {
					if (records != null && records.length > 0) {
						if (records[0].get('ref1') == '' || records[0].get('ref1') == null) {
							MessageUtil.warning('warning_msg', 'vorLQ_invalidDlCd');
							return;
						}
						if (records[0].get('isValidated') === 'N') {
							MessageUtil.warning('warning_msg', 'vorLQ_duplicatedWorkTime');
							return;
						}
						fn();
					}
				}
			}
		});
	},
	validDateHHT: function (startDate, endDate) {
		if (!startDate || !endDate) 
		{
			return true;
		}
		if (startDate > endDate) {
			return false;
		}
		return true;
	},
	validateTimeShift: function (editItem) {
		var me = this;
		var refs = me.getReferences();
		var sltedShift = me.getViewModel().get('globalWorkShiftInfo')
		var strShftDt =  me.getViewModel().get('globalWorkDate')
		var stShftDTime = null;
		var endShftDTime = null;

		var strFromDt = strShftDt + ' ' + sltedShift.fmHhMm.substr(0, 2) + ':' + sltedShift.fmHhMm.substr(2, 4);
		var strToDt = strShftDt + ' ' + sltedShift.toHhMm.substr(0, 2) + ':' + sltedShift.toHhMm.substr(2, 4);
		stShftDTime = Ext.Date.parse(strFromDt, 'd/m/Y H:i');
		endShftDTime = Ext.Date.parse(strToDt, 'd/m/Y H:i');
		if (sltedShift.shftId === 'SF0013') {
			endShftDTime = new Date(endShftDTime.getTime() + (24 * 60 * 60 * 1000));
		}
		var inputStDTime = Ext.Date.parse(editItem.startTime, 'd/m/Y H:i');
		var inputEndDTime = Ext.Date.parse(editItem.endTime, 'd/m/Y H:i');

		if (inputStDTime < stShftDTime || inputEndDTime > endShftDTime) {
			MessageUtil.warning('warning_msg', 'vorLQ_invalidTimeShift');
			return false;
		}
		return true;
	},
	
	setTimeWithShiftHHT: function(){
		var me = this;
		var refs = me.getReferences();

		var shift = me.getViewModel().get('globalWorkShiftInfo')
		var strWKDate = me.getViewModel().get('globalWorkDate')
		var strStartDt = strWKDate + ' ' + shift.fmHhMm.substr(0, 2) + ':' + shift.fmHhMm.substr(2, 4);
		var strEndDt = strWKDate + ' ' + shift.toHhMm.substr(0, 2) + ':' + shift.toHhMm.substr(2, 4);

		if(shift.shftId === 'SF0013'){
			var temp = Ext.Date.parse(strEndDt, 'd/m/Y H:i');
			var endShftDTime = new Date(temp.getTime() + (24 * 60 * 60 * 1000));
			strEndDt = Ext.Date.format(endShftDTime, 'd/m/Y H:i');
		}
        refs.refStartTime.setValue(strStartDt);
		refs.refEndTime.setValue(strEndDt);
	},
	/**
	 * Mouse Events
	 */
	onClickCargoSummaryList: function(grid, record) {
    	var me = this;
    	var refs = me.getReferences();
    	var grid = me.lookupReference('refCargoSummaryGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];	
		
		if(selection == null) return;
		refs.ctlTonHdlAmt.suspendEvents();
//			me.getViewModel().set('selectedCargoSummary', grid.getSelection()[0]);
//			refs.ctlVORLines.setValue(grid.getSelection()[0].data.hoseTpCd);
		
		// Added by Harry
		refs.ctlCommodityCombo.setValue(selection.get('cmdtCd'));		
		refs.ctlBlNo.value = selection.get('blNo');
		refs.ctlCargoType.setValue(selection.get('cgTpCd'));
		refs.ctlTerminalOperator.setValue(selection.get('tkOpr'));
		refs.ctlPkgType.setValue(selection.get('pkgTpCd'));
		refs.ctlTonHdlAmt.setValue(selection.get('tonHdlAmt'));
		refs.ctlLoadDischarge.setValue(selection.get('jobTpCd'));
		refs.ctlShipper.setValue(selection.get('shprCnsne'));
		refs.ctlConsigne.setValue(selection.get('cnsne'));
		refs.ctlVORLines.setValue(selection.get('hoseTpCd'));
		refs.ctlPumpRate.setValue(selection.get('pumpRate'));
		refs.ctlHoseOnDt.setValue(selection.get('hoseOnDt'));
		refs.ctlStDt.setValue(selection.get('stDt'));
		refs.ctlEndDt.setValue(selection.get('endDt'));
		refs.ctlHoseOffDt.setValue(selection.get('hoseOffDt'));
		refs.ctlLineNo.setValue(selection.get('lineNo'));
		refs.ctlJobCmplYn.setValue(selection.get('jobCmplYn'));

//			var cmdtCombo = me.getStore('cmdtCombo');
//			var cmdtCd, cmdt, seq;
//			if(refs.ctlCommodityCombo.getValue()){
//				console.log(refs.ctlCommodityCombo.getValue());
//				cmdtCd = refs.ctlCommodityCombo.getValue();
//				cmdt = cmdtCombo.findRecord('cmdtCd', cmdtCd);
//				seq = cmdt.data.no;
//				
//				if(cmdt.data.opeTp == 'SL' || cmdt.data.opeTp == 'TL' || cmdt.data.opeTp == 'LD' ){
//					console.log(cmdt.data.loadPlanMt);
//					refs.ctlLoadPlanMt.setValue(cmdt.data.loadPlanMt);
//					refs.ctlLoadActualMt.setValue(grid.getSelection()[0].data.tonHdlAmt);
//					if(cmdt.data.loadPlanMt && grid.getSelection()[0].data.tonHdlAmt){
//						refs.ctlLoadBalance.setValue(cmdt.data.loadPlanMt - grid.getSelection()[0].data.tonHdlAmt);
//					}
//				}else{
//					refs.ctlDisPlanMt.setValue(cmdt.data.loadPlanMt);
//					refs.ctlDisActuaMt.setValue(grid.getSelection()[0].data.tonHdlAmt);
//					if(cmdt.data.loadPlanMt && grid.getSelection()[0].data.tonHdlAmt){
//						refs.ctlDisBalance.setValue(cmdt.data.loadPlanMt - grid.getSelection()[0].data.tonHdlAmt);
//					}
//				}
//			}			
			
		refs.btnNew.setDisabled(false);
		refs.btnAdd.setDisabled(false);
		refs.btnUpdate.setDisabled(false);
		refs.btnDelete.setDisabled(false);
			
		var myTimer = setTimeout(function(){
			refs.ctlTonHdlAmt.resumeEvents();
		},500);

		//me.onValidationBalance();
		me.isCmdtSelected = false;
		me.cmdtChanged();
		
    },	
    
    
    onUpdateCargoSummary: function(){
    	var me = this;
    	var refs = me.getReferences();
    	var cargoSummary = me.getStore('cargoSummary');
    	var grid = me.lookupReference('refCargoSummaryGrid');
    	var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
    	
    	// Added by Harry   	
		selection.set('cmdtCd', refs.ctlCommodityCombo.getValue());
		selection.set('blNo', refs.ctlBlNo.value);
		selection.set('cgTpCd', refs.ctlCargoType.getValue());
		selection.set('tkOpr', refs.ctlTerminalOperator.getValue());
		selection.set('pkgTpCd',refs.ctlPkgType.getValue());
		selection.set('tonHdlAmt',refs.ctlTonHdlAmt.getValue());
		selection.set('jobTpCd',refs.ctlLoadDischarge.getValue());
		selection.set('shprCnsne',refs.ctlShipper.getValue());
		selection.set('cnsne',refs.ctlConsigne.getValue());
		selection.set('hoseTpCd',refs.ctlVORLines.getValue());
		selection.set('pumpRate',refs.ctlPumpRate.getValue());
		selection.set('hoseOnDt',refs.ctlHoseOnDt.getValue());
		selection.set('stDt',refs.ctlStDt.getValue());
		selection.set('endDt',refs.ctlEndDt.getValue());
		selection.set('hoseOffDt',refs.ctlHoseOffDt.getValue());
		selection.set('lineNo',refs.ctlLineNo.getValue());
		
		if(refs.ctlJobCmplYn.getValue()){
			selection.set('jobCmplYn','Y');
		}else{
			selection.set('jobCmplYn','N');
		}		
		
		/*cargoSummary.each(function(record,index){
			record.data.
			record.data.hoseTpCd = refs.ctlVORLines.getValue();
			record.data.tonHdlAmt = refs.ctlTonHdlAmt.getValue();
		});*/
//    	var selectedRecord = me.getViewModel().get('selectedCargoSummary');
//    	cargoSummary.data.items[0].data.hoseTpCd = refs.ctlVORLines.getValue();
//		cargoSummary.commitChanges();
		
				
//    	if(refs.ctlJobCmplYn.getValue()){
//    		selectedRecord.set('jobCmplYn','Y');
//    	}else{
//    		selectedRecord.set('jobCmplYn','N');
//    	}

    	if(me.onCagoSummaryValidation(selection)){
	    	selection.set('workingStatus','U');
    	}
    },
    
    // Validation VOR-Liquid Bulk - Detail - Tab CagoSummary
    onCagoSummaryValidation: function(selectedRecord){
    	var me = this;
    	var refs = me .getReferences();
    	var vslShifting = me.getViewModel().getStore('vesselShifting');
    	
    	var theVessel = me.getViewModel().get('theVessel');
    	DateUtil.convertDateToLong(theVessel.data, ['currAtb', 'currAtu']);
    	
    	var selectedRecord = me.getViewModel().get('selectedCargoSummary');

		var stDt = selectedRecord.get('stDt');
		var endDt = selectedRecord.get('endDt');
		
		if (!me.validHoseOff()) {
			MessageUtil.warning('warning_msg', 'vorLQ_inputCompletetime');
			return;					
		}

		if (!me.validHoseOnOffTime()) {
			MessageUtil.warning('warning_msg', 'vorLQ_notInShiftTime');
			return;						
		}
		if (!me.validStartEndTime()) {
			MessageUtil.warning('warning_msg', 'The end time must be greater than the start time.');
			return;					
		}
		
		if(!selectedRecord.get('lineNo') || selectedRecord.get('lineNo') === 0){
			MessageUtil.warning('warning_msg', 'Please input the no of lines.');
			return;
		}
		
		if(!vslShifting) return;
		
		if( vslShifting.getData().length == 0) {
			// If there is no newATB/newAtu in screen Vessel Shifting
			var atb = (theVessel.get('atb') == null) ? null : theVessel.get('atb');
			var atu = (theVessel.get('atu') == null) ? null : theVessel.get('atu');
			if(!me.validHoseOffWithCurAtb(atb, selectedRecord)) {
				MessageUtil.warning('warning_msg', 'vorliquidbulk_no_vesselShifting_msg');
				return;
			}
			if(!me.validHoseOffWithCurAtu(atu, selectedRecord)) {
				MessageUtil.warning('warning_msg', 'vorliquidbulk_no_vesselShifting_msg');
				return;
			}
			
		} else if( vslShifting.getData().length == 1) {
			// If there is one in screen Vessel Shifting
			var newAtb = ( theVessel.get('currAtb') == null) ? null : theVessel.get('currAtb');
			var newAtu = ( theVessel.get('currAtu') == null) ? null : theVessel.get('currAtu');
			if(!me.validHoseOffWithCurAtb(newAtb, selectedRecord)) {
				MessageUtil.warning('warning_msg', 'vorliquidbulk_hoseOnOffCmmcCmplt_newAtb_msg');
				return;
			}
			if(!me.validHoseOffWithCurAtu(newAtu, selectedRecord)) {
				MessageUtil.warning('warning_msg', 'vorliquidbulk_hoseOnOffCmmcCmplt_newAtu_msg');
				return;
			}
		} else if( vslShifting.getData().length > 1) {
			// If there has got 2 or more records in screen Vessel Shifting
			var newAtb = (me.EARLIEST_ATB == null) ? null : Ext.Date.parse(me.EARLIEST_ATB, 'd/m/Y H:i');
			var newAtu = (me.LATEST_ATU == null) ? null : Ext.Date.parse(me.LATEST_ATU, 'd/m/Y H:i');
			
			if(!me.validHoseOffWithCurAtb(newAtb, selectedRecord)) {
				MessageUtil.warning('warning_msg', "vor_validtimewithatb_shifting", me.EARLIEST_ATB);
				return;
			}
			
			if(	!StringUtil.isNullorEmpty(me.EARLIEST_ATB) && !StringUtil.isNullorEmpty(me.LATEST_ATU) ) {
				
				if ( newAtb > newAtu ) {
					
					if(!me.validPreAtbPreAtu(newAtb, newAtu, selectedRecord)) {
						MessageUtil.warning('warning_msg', "vor_validtimewithatb_shifting", me.EARLIEST_ATB);
						return;
					}
					
				} else {
					
					if(!me.validHoseOffWithCurAtu(newAtu, selectedRecord)) {
						MessageUtil.warning('warning_msg', "vor_validtimewithatu_shifting", me.LATEST_ATU);
						return;
					}
					
				}
			
			}
			
		}
		
		
//		if (!me.validCurAtb(theVessel.get('currAtb'), stDt, endDt)) {
//			if(theVessel.get('vslShiftingYN') == 'N'){
//				var message = Ext.String.format('Start Time/ End Time must be greater than ATB: {0}. {1}.',	me.convertDateToString(theVessel.get('currAtb')), "Refer to Vessel Schedule screen for more detail");
//				MessageUtil.warning('warning_msg', message);
//			}else{
//				var message = Ext.String.format('Start Time/ End Time must be greater than ATB: {0}. {1}.',	me.convertDateToString(theVessel.get('currAtb')), "Refer to Vessel Shifting screen for more detail");
//				MessageUtil.warning('warning_msg', message);
//			}
//			return;					
//		} 		
		
//		if (!me.validCurAtu(theVessel.get('currAtb'), stDt, endDt)) {
//			if(theVessel.get('vslShiftingYN') == 'N'){
//				var message = Ext.String.format('Start Time/ End Time must be less than ATU: {0}. {1}.', me.convertDateToString(theVessel.get('currAtu')), "Refer to Vessel Schedule screen for more detail");
//				MessageUtil.warning('warning_msg', message);
//			}else{
//				var message = Ext.String.format('Start Time/ End Time must be less than ATU: {0}. {1}.', me.convertDateToString(theVessel.get('currAtu')), "Refer to Vessel Shifting screen for more detail");
//				MessageUtil.warning('warning_msg', message);
//			}			
//			
//			return;						
//		} 
		
		return true;
    },
    
    convertDateToString: function(value){
    	return Ext.Date.format(value, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
    },
    
    validHoseOffWithCurAtb: function (newAtb, item) {
    	var me = this;
    	var refs = me .getReferences();
    	var hoseOn = refs.ctlHoseOnDt.getValue();
    	var hoseOff = refs.ctlHoseOffDt.getValue();
    	var stDt = refs.ctlStDt.getValue();
    	var endDt = refs.ctlEndDt.getValue();
    	
		if ( 	(newAtb && hoseOn 	&& hoseOn < new Date(newAtb) ) ||
				(newAtb && hoseOff	&& hoseOff < new Date(newAtb) ) ||
				(newAtb && stDt 	&& stDt < new Date(newAtb) ) ||
				(newAtb && endDt 	&& endDt < new Date(newAtb)) ||
				(hoseOn && stDt 	&& hoseOn > stDt ) ||
				(hoseOn && endDt 	&& hoseOn > endDt ) ||
				(stDt && endDt 		&& stDt > endDt ) ||
				(stDt && hoseOff 	&& stDt > hoseOff ) ||
				(endDt && hoseOff 	&& endDt > hoseOff )
		) {
			return false;
		}
		return true;
	},
	
	// Web
	validPreAtbPreAtu: function(newAtb, newAtu, item){
		var me = this;
		var refs = me .getReferences();
    	var hoseOn = refs.ctlHoseOnDt.getValue();
    	var hoseOff = refs.ctlHoseOffDt.getValue();
    	var stDt = refs.ctlStDt.getValue();
    	var endDt = refs.ctlEndDt.getValue();
    	
    	if (new Date(newAtu) < new Date(newAtb)) {
    		if (
    				(
						hoseOn && hoseOff &&
	    				(
							hoseOn < new Date(newAtb) ||
							hoseOff < new Date(newAtb) ||
		    				hoseOff < hoseOn
	    				)
    				)
			) {
    			return false;
    		}
    	}
    	
		return true;
	},
	
	validHoseOffWithCurAtu: function(newAtu, item){
		var me = this;
		var refs = me .getReferences();
    	var hoseOn = refs.ctlHoseOnDt.getValue();
    	var hoseOff = refs.ctlHoseOffDt.getValue();
    	var stDt = refs.ctlStDt.getValue();
    	var endDt = refs.ctlEndDt.getValue();
    	
		if (	(newAtu && hoseOn 	&& hoseOn > new Date(newAtu) ) ||
				(newAtu && hoseOff 	&& hoseOff > new Date(newAtu) ) ||
				(newAtu && stDt 	&& stDt > new Date(newAtu) ) ||
				(newAtu && endDt 	&& endDt > new Date(newAtu) ) ||
				(hoseOn && stDt 	&& hoseOn > stDt ) ||
				(hoseOn && endDt 	&& hoseOn > endDt ) ||
				(stDt && endDt 		&& stDt > endDt ) ||
				(stDt && hoseOff 	&& stDt > hoseOff ) ||
				(endDt && hoseOff 	&& endDt > hoseOff )
		) {
			return false;
		}
		
		return true;
	},
	
    validHoseOff: function(){
    	var me = this;
    	var refs = me.getReferences();
    	
		if (refs.ctlJobCmplYn.getValue() && !refs.ctlEndDt.getValue()) {
			return false;
		}
		return true;
	},
	
	// WEB
	validStartEndTime: function(){		
    	var me = this;
    	var refs = me.getReferences();
    	
		var hoseOnDt = refs.ctlHoseOnDt.getValue();
		var stDt = refs.ctlStDt.getValue();
		var endDt = refs.ctlEndDt.getValue();
		var hoseOffDt = refs.ctlHoseOffDt.getValue();
		
		if (me.validDateHHT(hoseOnDt, stDt) < 0 || 
				me.validDateHHT(hoseOnDt, endDt) < 0 ||
				me.validDateHHT(hoseOnDt, hoseOffDt) < 0 ||
				me.validDateHHT(stDt, endDt) < 0 ||
				me.validDateHHT(stDt, hoseOffDt) < 0 ||
				me.validDateHHT(endDt, hoseOffDt) < 0) {
			return false;
		}
		return true;				
	},
	validHoseOnOffTime: function(){		
		var me = this;
		var refs = me.getReferences();
		
		var shiftStart = me.setFmTimeByShift();
		var shiftEnd  = me.setToTimeByShift();
		var hoseOnDt = refs.ctlHoseOnDt.getValue();
		var stDt = refs.ctlStDt.getValue();
		var endDt = refs.ctlEndDt.getValue();
		var hoseOffDt = refs.ctlHoseOffDt.getValue();
		
		if (me.validDate(shiftStart, hoseOnDt) < 0 || me.validDate(hoseOnDt, shiftEnd) < 0) {
			return false;
		}
		if (me.validDate(shiftStart, stDt) < 0 || me.validDate(stDt, shiftEnd) < 0) {
			return false;
		}
		if (me.validDate(shiftStart, endDt) < 0 || me.validDate(endDt, shiftEnd) < 0) {
			return false;
		}
		
		if (me.validDate(shiftStart, hoseOffDt) < 0 || me.validDate(hoseOffDt, shiftEnd) < 0) {
			return false;
		}
		
		return true;				
	},
	
	validDate: function(startDate, endDate){
		var countTime = 0 ;

		if (startDate && endDate) {
			countTime = Ext.Date.diff(startDate, endDate, Ext.Date.HOUR);
		}
		
		return countTime;
	},

	// WEB
	validCurAtb: function(curAtb, startTime, endTime){
		var me = this;
		if (startTime != null && me.validDate(curAtb, startTime) < 0) {
			return false;
		}
		
		if (endTime != null && me.validDate(curAtb, endTime) < 0) {
			return  false;
		}				
		return true;
	},
	
	// WEB
	validCurAtu: function (curAtu, startTime, endTime){
		var me = this;
		if(curAtu != null){
			if (startTime && me.validDate(startTime, curAtu) < 0) {
				return false;
			}
			
			if (endTime  && me.validDate(endTime, curAtu) < 0) {
				return false;
			}	
		}
		return true;
	},
    
    onNewCargoSummary : function(){
    	var me = this;
    	var refs = me.getReferences();
		var theCgOprType = me.getViewModel().get('theCgOprType');
		var opeTp;
		
		if(theCgOprType.tlsOprYn == 'Y'){
			if(refs.ctlVORTranshipment.checked == true){
				opeTp = 'TLS';
			}
		}
		if(theCgOprType.stsOprYn == 'Y'){
			if(refs.ctlVORSTSOperation.checked == true){
				opeTp = 'STS';
			}
		}
		if(theCgOprType.genOprYn == 'Y'){
			if(refs.ctlVORLoadDischarge.checked == true){
				opeTp = 'GEN';
			}
		}		
		var cmdtCombo = me.getStore('cmdtCombo');
		cmdtCombo.load({
			params : {
				comboType : 'Cmdt',
				vslCallId : refs.refVslCallId.getValue(),
				opeTp : opeTp
			},
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						for(var i = 0; i < records.length; i++){
							me.getViewModel().setData({theCmdt:records[i].data});
						}
					}
				}
			}
		});
			
		var hoseTpCombo = me.getStore('hoseTpCombo');
			hoseTpCombo.load({
				params : {
					opeTp : opeTp
				},
			});

		
		var tkOprCombo = me.getStore('tkOprCombo');
		if(tkOprCombo.loadCount <= 0){
			tkOprCombo.load({
				params : {
					comboType : 'TkOpr',
					vslCallId : refs.refVslCallId.getValue(),
				},
			});
		}
		
		
		var shprCnsneCombo = me.getStore('shprCnsneCombo');
		if(shprCnsneCombo.loadCount <= 0){
			shprCnsneCombo.load({
				params : {
					comboType : 'ShprCnsne',
					vslCallId : refs.refVslCallId.getValue(),
				},
			});
		}
		
		
		var cnsneCombo = me.getStore('cnsneCombo');
		if(cnsneCombo.loadCount <= 0){
			cnsneCombo.load({
				params : {
					comboType : 'Cnsne',
					vslCallId : refs.refVslCallId.getValue(),
				},
			});
		}
		
		
		var pkgTpCombo = me.getStore('pkgTpCombo');
		if(pkgTpCombo.loadCount <= 0){
			pkgTpCombo.load({
				params : {
					comboType : 'PkgTp',
					vslCallId : refs.refVslCallId.getValue(),
				},
			});
		}
		
		me.getViewModel().set('selectedCargoSummary', Ext.create('MOST.model.operation.VORLiquidBulk'));
		
		refs.ctlCommodityCombo.setValue('');
		refs.ctlCargoType.setValue('');
		refs.ctlTerminalOperator.setValue('');
		refs.ctlPkgType.setValue('');
		refs.ctlTonHdlAmt.setValue('');
		refs.ctlLoadDischarge.setValue('');
		refs.ctlShipper.setValue('');
		refs.ctlConsigne.setValue('');
		refs.ctlVORLines.setValue('');
		refs.ctlPumpRate.setValue('');
		refs.ctlHoseOnDt.setValue('');
		refs.ctlStDt.setValue('');
		refs.ctlEndDt.setValue('');
		refs.ctlHoseOffDt.setValue('');
		refs.ctlLineNo.setValue('');
		refs.ctlJobCmplYn.setValue('');
//		refs.ctlLoadPlanMt.setValue('');
//		refs.ctlLoadActualMt.setValue('');
//		refs.ctlLoadBalance.setValue('');
//		refs.ctlDisPlanMt.setValue('');
//		refs.ctlDisActuaMt.setValue('');
//		refs.ctlDisBalance.setValue('');
		
		refs.btnNew.setDisabled(false);
		refs.btnAdd.setDisabled(false);
		refs.btnUpdate.setDisabled(true);
		refs.btnDelete.setDisabled(true);
		
		var grid = me.lookupReference('refCargoSummaryGrid');
		grid.getSelectionModel().deselectAll();
    },
    
    onTabChange:function(tabPanel, tab){
		var me = this;
		var refs = me.getReferences();
		
		me.setVORLiquidBulkTabPanel();
	},
    
	setVORLiquidBulkTabPanel: function() {
		var me = this;
		var refs = me.getReferences();
		
		if(refs.ctlVORLiquidBulkDtlTabPanel) {
			var tabPanel = refs.ctlVORLiquidBulkDtlTabPanel.getActiveTab().name;
			
			switch(tabPanel){
				case 'VORCargoSummary':
					me.setTabVORCargoSummary();
					break;
			}
		}
	},
	
	setTabVORCargoSummary: function() {
		var me = this;
		var refs = me.getReferences();
		var vesselShifting = me.getStore('vesselShifting');
		
		if(!StringUtil.isNullorEmpty(me.EARLIEST_ATW) ) {
			refs.ctlStDt.setValue(Ext.Date.parse(me.EARLIEST_ATW, 'd/m/Y H:i'));
		}
		
		if(!StringUtil.isNullorEmpty(me.LATEST_ATC) ) {
			refs.ctlStDt.setValue(Ext.Date.parse(me.LATEST_ATC, 'd/m/Y H:i'));
		}
		
	},
	onTblCargoRaidoChange: function(radio, checked){
	},

	onLineChanged: function(){
		var me = this;
		var refs = me.getReferences();
		var hoseTp = refs.refCboLine.getValue();
		var equipmentComboListStore = me.getStore('equipmentComboList');
		if(!hoseTp){
			equipmentComboListStore.clearData();
			refs.refCboEquipment.setValue('');
			return
		}
		equipmentComboListStore.load(
			{
				params: {
					eqTpCd: hoseTp,
					isVorScreen: 'Y',
				}
			}
		)
	}
	/*
	*End  Event Function:
	* */
});