Ext.define('MOST.view.operation.VORLiquidBulkController', {
	extend: 'MOST.view.foundation.BaseViewController',

	alias: 'controller.vorliquidbulk',

	requires: [
		
	],
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	
	VSL_CALL_ID:'',
	SHFTID: '',
	WORKDATE: '',
	gridSelected: false,
	format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
	MODE_ADD: 1,
	MODE_UPDATE: 2,
	opeTp: '',
	sdoM3: 0,
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
		
		var searchParm = Ext.create('MOST.model.operation.SearchVORLiquidBulkParm');
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
//		var lddcTypeCombo = me.getStore('loadingDischargingTypeCombo');
//		lddcTypeCombo.load();
	},
	
	// Detail Load
	onDetailLoad:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		me.setDetailInitialize();
	},
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE END
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	// Search Event Handler
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
     	var berthAndOperationInfo = me.getStore('berthAndOperationInfo');
     	var vorSummary = me.getStore('vorSummary');
     	var vorDelaySummary = me.getStore('vorDelaySummary');
     	var cgOprTypeStore = me.getStore('cgOprType');
     	
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
    	berthAndOperationInfo.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						var balLoadMt = records[0].data.loadPlanMtS - records[0].data.loadActualMtS;
						var balDisMt = records[0].data.disPlanMtS - records[0].data.disActualMtS;
						
						records[0].data.balLoadMt = balLoadMt;
						records[0].data.balDisMt = balDisMt;
						
						me.getViewModel().setData({theBerthing:records[0].data});
					}
				}
			}
		});
    	
    	vorSummary.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						
					}
				}
			}
		});
    	
    	vorDelaySummary.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						
					}
				}
			}
		});
    	
    	cgOprTypeStore.load({
			params: {
				vslCallId : refs.ctlVslCallId.getValue()
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
	
	onCreate: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refVORSummaryGrid');
		
		var theCgOprType = me.getViewModel().get('theCgOprType');
		
		me.clearData();
		if((refs.ctlVslCallId.getValue() === null || refs.ctlVslCallId.getValue() === '')){
			MessageUtil.alert('Warning', 'vorExistedVslCallId');
		} else if(theCgOprType === null){
			MessageUtil.alert('Warning', 'vorNoCgOpeInfo');
		} else if(refs.ctlVslCallId.getValue() != null && refs.ctlVslCallId.getValue() != ''){
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
			recvData.data.vslCallId = refs.ctlVslCallId.getValue();
			me.openDetailPopup(recvData, 'VOR for Liquid Bulk');
		}
	},
	
	//Delete from VOR Summary tab
	onDeleteVorSummary:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refVORSummaryGrid');
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
							
							var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
							var isCreated = detailItem.phantom;
							
							//updateParm.getProxy().url = store.getProxy().url;
							updateParm.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/vorliquidbulk/detail';
							updateParm.phantom = false;
							updateParm.drop();
							updateParm.set('workingStatus', WorkingStatus.DELETE);
							updateParm.set('userId', MOST.config.Token.getUserId());
							updateParm.set('item', detailItem.data);
							
							updateParm.save({
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
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var refs = me.getReferences();
		var searchBizParm = me.getSearchCondition();
		var currentTab = refs.refVORLiquidSummaryTab.getActiveTab();
		var activeTabIdx = refs.refVORLiquidSummaryTab.items.findIndex('id', currentTab.id);
		searchBizParm.classID = 'com.tsb.most.biz.parm.operation.SearchVORLiquidBulkParm';
		
		if (activeTabIdx === 1 || activeTabIdx === 2) {
			if (activeTabIdx === 1) {
				grid = 'refVORSummaryGrid';
				searchBizParm.serviceID = 'MOST.vorLiquidBulk.selectVORSummaryItems';
			}else if (activeTabIdx === 2) {
				grid = 'refVORDelaySummaryGrid';
				searchBizParm.serviceID = 'MOST.vorLiquidBulk.selectVORDelaySummaryItems';
			}
			me.exportExcelPdfWithServer(grid,searchBizParm, isExcel);
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
	
	//////////////DETAIL SCREEN//////////////////////////
	onClickCargoSummaryList: function(grid, record) {
    	var me = this;
    	var refs = me.getReferences();
    	var grid = me.lookupReference('refCargoSummaryGrid');
		if(grid.getSelection() == null ? null : grid.getSelection()[0]){
			
			refs.ctlTonHdlAmt.suspendEvents();
			me.getViewModel().set('selectedCargoSummary', grid.getSelection()[0]);
			
			refs.btnNew.setDisabled(false);
			refs.btnAdd.setDisabled(false);
			refs.btnUpdate.setDisabled(false);
			refs.btnDelete.setDisabled(false);
			
			var myTimer = setTimeout(function(){
				refs.ctlTonHdlAmt.resumeEvents();
			},500);

			me.cmdtChanged();
		}
    },	
    
	cmdtChanged: function(combo, value){
		var me = this;
		var refs = me.getReferences();
		var sltCmdtCd = combo.getSelection().data.cmdtCd
		var blSnCombo = me.getStore('blSnCombo')
		var selectedRecord = me.getViewModel().get('selectedCargoSummary');
		blSnCombo.clearFilter()
		
		var cmdtCd, cmdt, seq;
		if(sltCmdtCd){
			refs.ctlBlNo.setDisabled(false)
			cmdtCd = refs.ctlCommodityCombo.getValue();
			// if(refs.ctlCommodityCombo.selection){
			// 	seq = refs.ctlCommodityCombo.selection.data.no;
			// }
			// else {
			// 	seq = selectedRecord.get('seqCS2');
			// }

			blSnCombo.filterBy(function(record, id){
				if(record.get('cmdtCd') === sltCmdtCd){
					return record;
				}
			});

			if(blSnCombo.getCount() === 1) refs.ctlBlNo.setValue(blSnCombo.data.items[0].get('scd'))

		}else{
			refs.ctlBlNo.setDisabled(true) 
			me.onNewCargoSummary()
		}
	},
	blSnChanged: function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var cmdtCd = refs.ctlCommodityCombo.getValue()
		var blSnNo = refs.ctlBlNo.getValue()
		var blSnCombo = me.getStore('blSnCombo')
		var confirmationSlipDetailItem = me.getStore('confirmationSlipDetailItem');
		if(!blSnNo || !cmdtCd) return
		var sltBlSn = blSnCombo.findRecord('scd', blSnNo)
		var seq = sltBlSn.get('seq')

		confirmationSlipDetailItem.load({
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
								refs.ctlLoadDischarge.setReadOnly(true);
							}

							refs.ctlCargoType.setValue(records[i].data.cgTpCd);
							refs.ctlCargoType.setRawValue(records[i].data.cgTpCdNm);
							refs.ctlTerminalOperator.setValue(records[i].data.tkOpr);
							refs.ctlPkgType.setValue(records[i].data.pkgTpCd);
							refs.ctlShipper.setValue(records[i].data.shprCnsne);
							refs.ctlConsigne.setValue(records[i].data.cnsne);
							refs.ctlLoadDischarge.setValue(records[i].data.jobTpCd);
							// refs.ctlBlNo.setValue(records[i].data.blNo);	
							
							me.onLoadAmountBalanceInfo(records[i].data);
						}
					}
				}
			}
		});
	},
	calcPumpRate:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var selectedRecord = me.getViewModel().get('selectedCargoSummary');
		
		var pumpRate = 0;
		var tonAmnt = 0;
		var countTime = 0;
		
		var shftId = refs.refShift.getValue();
		var shftSelection = refs.refShift.getSelection();
		if(shftId){
			var cgTpCd = refs.ctlCargoType.getValue(); 
			
			var fmShiftTime = Ext.Date.parse(refs.refWorkYmd.rawValue + ' ' + shftSelection.get('fmHhMm').substr(0,2) + ':' + shftSelection.get('fmHhMm').substr(2,2),  'd/m/Y H:i');
			var toShiftTime = Ext.Date.parse(refs.refWorkYmd.rawValue + ' ' + shftSelection.get('toHhMm').substr(0,2) + ':' + shftSelection.get('toHhMm').substr(2,2),  'd/m/Y H:i');
			
			if(shftSelection.get('shftIdx') == "3") {
				toShiftTime.setDate(toShiftTime.getDate() + 1);
			}

			var startTime = refs.ctlStDt.getValue();
			var endTime = refs.ctlEndDt.getValue();

            if(startTime != null || endTime != null){
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
				
				if (startTime != null && startTime != '' && endTime != null && endTime != '') {
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
	
	onOpenDelayCodePopup:function(field, button, e){
		var me = this;
		var refs = me.getReferences();
		var params = {
			lcd: 'LIQUIQ'
		};
		me.openCodePopup('popup-delaycodepopup', 'refTxtDelayCode', params);
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
	    					refs.refTxtDelayCode.setValue(record[0].get('scd'));
		    				refs.refTxtDelayCodeName.setValue(record[0].get('scdNm'));
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
		
		me.getViewModel().set('selectedDelay',selection);	
		
		refs.refDelaySaveBtn.setDisabled(false);
		refs.refDelayDeleteBtn.setDisabled(false);
	},
	
	setVORInitializeInfo:function(){
		var me = this;
		var refs = me.getReferences();
		var vorLiquidBulkDetail = me.getStore('vorLiquidBulkDetail');
		
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		
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
	
							me.setCargoSummary(records[0].data);
							me.setDelaySummary(records[0].data);
							
							var delayTimeSumStore = me.getStore('vorDelaySummary');
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
					}
				}
			});
		}
	},
	
	onAddCargoSummary: function() {
		var me = this;
		var refs = me.getReferences();
		var theCgOprType = me.getViewModel().get('theCgOprType');
		var cmdtCombo = me.getStore('cmdtCombo');
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
	
	onUpdateCargoSummary: function(){
    	var me = this;
    	var refs = me.getReferences();
    	var selectedRecord = me.getViewModel().get('selectedCargoSummary');
    	if(refs.ctlJobCmplYn.getValue()){
    		selectedRecord.set('jobCmplYn','Y');
    	}else{
    		selectedRecord.set('jobCmplYn','N');
    	}

    	if(me.onCagoSummaryValidation(selectedRecord)){
	    	selectedRecord.set('workingStatus','U');
    	}
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
	
	onNewCargoSummary : function(){
    	var me = this;
    	var refs = me.getReferences();
    	
    	me.getViewModel().set('selectedCargoSummary', Ext.create('MOST.model.operation.VORLiquidBulk'));
		
		refs.ctlCommodityCombo.setValue('');
		refs.ctlBlNo.setValue('')
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
		refs.btnNew.setDisabled(false);
		refs.btnAdd.setDisabled(false);
		refs.btnUpdate.setDisabled(true);
		refs.btnDelete.setDisabled(true);
		
		var grid = me.lookupReference('refCargoSummaryGrid');
		grid.getSelectionModel().deselectAll();
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
			record.set("shftId", 		refs.refShift.getValue());
			record.set("hatchNo", 		refs.refHatchNoCombo.getValue());
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
	
	 onSaveDelaySummary: function(){
	    	var me = this;
			var refs = me.getReferences();
			var store = me.getStore('delaySummary');

			var bValidation = true
			store.getModifiedRecords().forEach(function(record, index, array){
				if(!me.onDelaySummaryValidation(record)){
					bValidation = false;
					return
				}
			});
			
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
	
	onNewDelaySummary: function(){
		var me = this;
		me.getViewModel().set('selectedDelay', Ext.create('MOST.model.operation.VORLiquidBulk'));	
	},

	/**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var searchParm = me.getViewModel().get('theSearch');
     	var searchVessel = me.getViewModel().get('theVessel');
     	searchParm.data.vslCallId = searchVessel.data.vslCallId;
		var params = me.createParam(searchParm);
     	
     	if(searchParm.data.vslCallId == null || searchParm.data.vslCallId == ''){
     		MessageUtil.warning("warning_msg", "goodsreceipt_jpvc_input_msg");
    		return;
     	}
     	
     	params['searchType'] = 'info';
    	return params;
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		if(targetControl == 'ctlVslCallId'){ 
			if(returnValue){
				me.getViewModel().setData({theVessel:returnValue.item});
				
				var searchParm = Ext.create('MOST.model.operation.SearchVORLiquidBulkParm');
				me.setSearchParm(searchParm); // Settings Model Data Change
				me.getViewModel().setData({theSearch:searchParm});
				me.onSearch();
			}else {
				me.getViewModel().setData({theVessel:null});
			}
		}else if(targetControl === 'refTxtDelayCode'){
			if(returnValue){
				refs.refTxtDelayCode.setValue(returnValue.item.data.scd);
				refs.refTxtDelayCodeName.setValue(returnValue.item.data.scdNm);
				refs.refTxtAcptYN.setValue(returnValue.item.data.acptYN);
			}
		}
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
		refs.ctlLoadDischarge.setReadOnly(true);		
	
	},
	
	// Detail Control Setting
	setDetailControl:function(recvData){
		var me = this;
		var refs = me.getReferences();
		
		var vorLiquidBulkDetail = me.getStore('vorLiquidBulkDetail');
		var items = me.getViewModel().get('theVessel');
		me.loadCombo(recvData);
		
//		var shiftListStore = me.getStore('shiftList');
//		if(shiftListStore.loadCount <= 0){
//			shiftListStore.load();
//		}

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

							me.setCargoSummary(records[0].data);
							me.setDelaySummary(records[0].data);
						}
					}
				}
			});
			if(recvData.data.opeTp === 'STS'){
//				refs.refVORTerminalOperator.setVisible(false);
				
				refs.refVORNoForLoading.setVisible(false);
				refs.refVORNoForDischarging.setVisible(false);
				refs.refVORTerminalOperator1.setVisible(false);
				refs.refVORTerminalOperator2.setVisible(false);
				refs.refVORTerminalOperator3.setVisible(false);
				refs.refVORTerminalOperator4.setVisible(false);
				refs.refVORFender.setVisible(true);
			}else{
//				refs.refVORTerminalOperator.setVisible(true);
				
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
		refs.refOGAStatus.setValue(items.data.ogaStatus);
		refs.refOGADate.setValue(items.data.ogaStatusDate);
		refs.refOGAQuarantine.setValue(items.data.ogaQuarantine);
		
		var theCgOprType = me.getViewModel().get('theCgOprType');
		if(recvData.data.opeTp === null || recvData.data.opeTp != 'STS'){
			if(theCgOprType.stsOprYn == 'Y'){
				if(refs.ctlVORSTSOperation.checked == true){
//					refs.refVORTerminalOperator.setVisible(false);
					
					refs.refVORNoForLoading.setVisible(false);
					refs.refVORNoForDischarging.setVisible(false);
					refs.refVORTerminalOperator1.setVisible(false);
					refs.refVORTerminalOperator2.setVisible(false);
					refs.refVORTerminalOperator3.setVisible(false);
					refs.refVORTerminalOperator4.setVisible(false);
					refs.refVORFender.setVisible(true);
				}else{
//					refs.refVORTerminalOperator.setVisible(true);
					
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

		var hatchNoCombo = me.getStore('hatchNoCombo');
		hatchNoCombo.load();

		var blSnCombo = me.getStore('blSnCombo')
		blSnCombo.load({
			params: {
				vslCallId: recvData.data.vslCallId
			}
		})
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
	
	clearData: function(){
		var me = this;
		var cargoSummary = me.getViewModel().getStore('cargoSummary');
		var delaySummary = me.getViewModel().getStore('delaySummary');
		
		cargoSummary.removeAll();
		delaySummary.removeAll();

		cargoSummary.clearData();
		delaySummary.clearData();
		
	},
	
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
	
	onAddingCargoProceed: function(){
		var me = this;
		var refs = me.getReferences();
		var theCgOprType = me.getViewModel().get('theCgOprType');
		var opeTp;		
		var theVessel = me.getViewModel().get('theVessel');
		
		var grid = me.lookupReference('refCargoSummaryGrid');
		var store = me.getStore('cargoSummary');
		var selectedRecord = me.getViewModel().get('selectedCargoSummary');
		
		var record = Ext.create('MOST.model.operation.VORLiquidBulk');
		
		var blSnNo = refs.ctlBlNo.getValue()
		var blSnCombo = me.getStore('blSnCombo')
		var sltBlSn = blSnCombo.findRecord('scd', blSnNo)
		var seq = sltBlSn.get('seq')

		var idx = 0;
		if(grid.getSelection() && grid.getSelection().length>0) {
			idx = store.indexOfId(grid.getSelection()[0].get('id'));
		}
		
		record.set('cmdtCd', 	refs.ctlCommodityCombo.getValue());
		if(!refs.ctlCommodityCombo.selection){
			seq = selectedRecord.get('seqCS2');
		}

		record.set('seqCS2', seq);
		record.set('blNo', 	refs.ctlBlNo.getValue());
		
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

		record.set('lineNumber', 	refs.ctlLineNo.getValue());
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
	},
	
	setFmTimeByShift: function(){
		var me = this;
		var refs = me.getReferences();

		var shftId= refs.refShift.getValue();
		var shftSelection = refs.refShift.getSelection();
		
		var fmShiftTime = Ext.Date.parse(refs.refWorkYmd.rawValue + ' ' + shftSelection.get('fmHhMm').substr(0,2) + ':' + shftSelection.get('fmHhMm').substr(2,2),  'd/m/Y H:i');
		
		return fmShiftTime;
	},
	
	setToTimeByShift: function(){
		var me = this;
		var refs = me.getReferences();

		var shftId= refs.refShift.getValue();
		var shftSelection = refs.refShift.getSelection();
		
		var toShiftTime = Ext.Date.parse(refs.refWorkYmd.rawValue + ' ' + shftSelection.get('toHhMm').substr(0,2) + ':' + shftSelection.get('toHhMm').substr(2,2),  'd/m/Y H:i');
		if(shftSelection.get('shftIdx') == "3") {
			toShiftTime.setDate(toShiftTime.getDate() + 1);
		}
		
		return toShiftTime;
		
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
			
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			var isCreated = detailItem.phantom;
			
			updateParm.getProxy().url = store.getProxy().url;
			updateParm.phantom = true;
			updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
			updateParm.set('userId', MOST.config.Token.getUserId());
			updateParm.set('item', detailItem.data);
			
			updateParm.save({
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
				}
			});
			
		}else{
			detailView.getEl().unmask();
		}
	},
	
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD END
	 */

	/**
	 * =========================================================================================================================
	 * VALIDATION METHOD START
	 */
	onCagoSummaryValidation: function(selectedRecord){
		var me = this;
		var refs = me .getReferences();
		
		var theVessel = me.getViewModel().get('theVessel');
		DateUtil.convertDateToLong(theVessel.data, ['currAtb', 'currAtu']);
		
		var selectedRecord = me.getViewModel().get('selectedCargoSummary');
		
		var stDt = selectedRecord.get('stDt');
		var endDt = selectedRecord.get('endDt');
		
		if (!me.validHoseOff()) {
			MessageUtil.warning('warning_msg', 'Please Input Completion time when the operation is completed.');
			return;					
		}
		
		if (!me.validHoseOnOffTime()) {
			MessageUtil.warning('warning_msg', 'Hose on/off time and Commence/Completion time should be in the shift time.');
			return;						
		}
		if (!me.validStartEndTime()) {
			MessageUtil.warning('warning_msg', 'The end time must be greater than the start time.');
			return;					
		}
		
		if(!selectedRecord.get('lineNumber') || selectedRecord.get('lineNumber') === 0){
			MessageUtil.warning('warning_msg', 'Please input the no of lines.');
			return;
		}
		
		if (!me.validCurAtb(theVessel.get('currAtb'), stDt, endDt)) {
			if (theVessel.get('vslShiftingYN') == 'N') {
				var message = Ext.String.format('Start Time/ End Time must be greater than ATB: {0}. {1}.',	me.convertDateToString(theVessel.get('currAtb')), "<br> Refer to Vessel Schedule screen for more detail");
				MessageUtil.warning('warning_msg', message);
			}
			else {
				var message = Ext.String.format('Start Time/ End Time must be greater than ATB: {0}. {1}.',	me.convertDateToString(theVessel.get('currAtb')), "<br> Refer to Vessel Shifting screen for more detail");
				MessageUtil.warning('warning_msg', message);
			}
			return;					
		} 		
		
		if (!me.validCurAtu(theVessel.get('currAtu'), stDt, endDt)) {
			if(theVessel.get('vslShiftingYN') == 'N'){
				var message = Ext.String.format('Start Time/ End Time must be less than ATU: {0}. {1}.', me.convertDateToString(theVessel.get('currAtu')), "<br> Refer to Vessel Schedule screen for more detail");
				MessageUtil.warning('warning_msg', message);
			} 
			else{
				var message = Ext.String.format('Start Time/ End Time must be less than ATU: {0}. {1}.', me.convertDateToString(theVessel.get('currAtu')), "<br> Refer to Vessel Shifting screen for more detail");
				MessageUtil.warning('warning_msg', message);
			}			
				
			return;						
		} 
			
		return true;
	},
	
	convertDateToString: function(dateString) {
		var date = new Date(dateString);
		if (isNaN(date.getTime())) {
			return '';
		}
		
		return '[' + Ext.Date.format(date, 'H:i d/m/Y') +']';
	},
	
	validHoseOff: function(){
    	var me = this;
    	var refs = me.getReferences();
    	
		if (refs.ctlJobCmplYn.getValue() && !refs.ctlEndDt.getValue()) {
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
	
	validCurAtb: function(curAtb, startTime, endTime){
		var me = this;
		if (startTime != null && me.validDate(curAtb, startTime) < 0) {
			return false;
		}
		
		if (endTime != null && me.validDate(curAtb, endTime) < 0) {
			return false;
		}				
		return true;
	},
	
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
	
	validDate: function(startDate, endDate){
		var countTime = 0 ;

		if (startDate && endDate) {
			countTime = Ext.Date.diff(startDate, endDate, Ext.Date.HOUR);
		}
		
		return countTime;
	},
	
	validStartEndTime: function(){		
    	var me = this;
    	var refs = me.getReferences();
    	
		var hoseOnDt = refs.ctlHoseOnDt.getValue();
		var stDt = refs.ctlStDt.getValue();
		var endDt = refs.ctlEndDt.getValue();
		var hoseOffDt = refs.ctlHoseOffDt.getValue();
		
		if (me.validDate(hoseOnDt, stDt) < 0 || 
				me.validDate(hoseOnDt, endDt) < 0 ||
				me.validDate(hoseOnDt, hoseOffDt) < 0 ||
				me.validDate(stDt, endDt) < 0 ||
				me.validDate(stDt, hoseOffDt) < 0 ||
				me.validDate(endDt, hoseOffDt) < 0) {
			return false;
		}
		return true;				
	},
	
	onDelaySummaryValidation: function(record){
    	var me = this;
		var refs = me.getReferences();
		var store = me.getStore('vesselDelayList');

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
		
		var shift =  refs.refShift.getSelection();
		
		var fmShiftTime = Ext.Date.parse(inptDt + ' ' + shift.get('fmHhMm').substr(0,2) + ':' + shift.get('fmHhMm').substr(2,2),  MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var toShiftTime = Ext.Date.parse(inptDt + ' ' + shift.get('toHhMm').substr(0,2) + ':' + shift.get('toHhMm').substr(2,2),  MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		
		if(shift.get('shftIdx') == "3"){
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
				MessageUtil.alert('Warning', 'vesselDelay_start_shift_time_msg');
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
	
	    
	/**
	 * =========================================================================================================================
	 * VALIDATION METHOD END
	 */	

});