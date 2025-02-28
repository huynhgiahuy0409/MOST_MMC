Ext.define('MOST.view.billing.DataGatheringController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.datagathering',
	
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAX_DATE_PERIOD : 92,	// MAX PERIOD DATE
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
		var cargoTypeCombo = me.getStore('cargoTypeCombo');
		var statusCombo = me.getStore('statusCombo');
		
		cargoTypeCombo.load();
		statusCombo.load();

		me.setDateInDays("ctlDateFromDt", -7);
		me.setDateInDays("ctlDateToDt");
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
    	var store = me.getStore('dataGatheringList');
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					// SUCCESS
				}
			}
		});
	},
		
	// Grid Edit
	onEdit : function(editor, context){
		var me = this;
	},
	
	// Grid Row Double
	onDblclick: function() {
		var me = this;
		var grid = me.lookupReference('refDataGatheringGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) {
			return;
		}
		
		/*if(selection.data.status == ""){
			MessageUtil.noMatchData();
	     	return;
		}*/
		
		me.openDetailPopup(selection);
	},
	
	// Key Column Editable
	setGridColumnEditable:function(isCreate){
		var me = this;
		var refs = me.getReferences();

		if(isCreate){ // ADD
			refs.refKey1.getEditor().setEditable(true);
			refs.refKey1.getEditor().setDisabled(false);
		} else { // UPDATE
			refs.refKey1.getEditor().setEditable(false);
			refs.refKey1.getEditor().setDisabled(true);
		}
	},
	
	// Cell Click
	onCellClick: function(ctx, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		var refs = me.getReferences();
	},
	
	onChecked : function (model, record, index, eOpts) {
		if(record.data.selected){
			record.data.selected=false;
		}else{
			record.data.selected=true;
		}
    },
    
    onStartDataGathering : function(){
    	var me = this;
     	var refs = me.getReferences();
     	var dataGatheringItems = new Ext.create('MOST.model.billing.DataGathering');
     	var store = me.getStore('dataGatheringList');
     	var validationCodeStore = me.getStore('dataGatheringValidationCode');
     	var applyDataGatheringStore = me.getStore('applyDataGathering');
     	var includedOtherStatus = false;
     	var tempVslCallId;
     	var storeItem;
     	var selectItems = new Array();
     	var chkGatheredData= refs.ctlincludecheck.getValue();
     	
     	if(store.data.length > 0){
     		for(var i = 0 ; i < store.data.length ; i++){
     			storeItem = store.data.items[i].data;
     			
     			if(storeItem.selected === true){
     				tempVslCallId = storeItem.vslCallId;
     				
     				if(storeItem.imRecclCd == '' && storeItem.exRecclCd == ''){
     					me.onValidationSubmit(tempVslCallId);
     		     		return;
     				}
     				
     				if(chkGatheredData === false && storeItem.status === "Gathered"){
     					MessageUtil.warning("datagathering", "datagathering_include_gathered_data_msg");//BL01300004
     		     		return;
     				}
     				
     				if(storeItem.status === "Verified" || storeItem.status === "Invoicing" || storeItem.status === "Invoiced"){
     					includedOtherStatus = true;
     				}  		
					 
					if( StringUtil.isNullorEmpty(storeItem.atb) ){
						MessageUtil.warning("datagathering", "datagathering_no_atb_msg"); // Mantis: 130382
						return;
					}
     				
     				if(storeItem.atu == null || storeItem.atu == ''){
     					MessageUtil.warning("datagathering", "datagathering_no_atu_msg");//BL01300025
     		     		return;
     				}
     				
     				storeItem.payer='';
     			}
     		}
     		
	     	store.findBy(function(item){
	     		if(item.get('selected') === true){
	     			item.data.userId = MOST.config.Token.getUserId();
	     			selectItems.push(item.data);
	     		}
	     	});
	     	
	     	if(selectItems.length === 0){
	     		MessageUtil.warning("datagathering", "datagathering_include_gathered_data_msg");//BL01300002
	     		return;
	     	}
	     	
	     	if(includedOtherStatus){
	     		MessageUtil.question("Confirm", "There are some items that has been verified or invoiced. Would you like to proceed data gathering?",null,
	    				function(button){
	    					if (button === 'ok') {
			    				Ext.MessageBox.show({
			    					title : 'MPTS_v2.0', //Do not change the title
			    					msg: 'progressing...',
			    					width:320,
			    					height:0,
			    					wait:true,
			    					waitConfig: {interval:200, text:''}
			    				});
			    				
	    						dataGatheringItems.phantom = false;
	    						
	    						if(dataGatheringItems.dirty === true || selectItems.length > 0){
	    							var proxy = dataGatheringItems.getProxy();
	    							
	    							proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/datagathering/apply';
	    							dataGatheringItems.set("items",selectItems);
	    							
	    							dataGatheringItems.save({
	    								success:function(){
	    									dataGatheringItems.commit();
	    									
	    									store.load({
	    										callback: function(records, operation, success) {
	    											if (success) {
	    												me.onSearch();

	    												MessageUtil.info("Data Gathering", "Data Gathering was finished successfully");
	    											}
	    											
	    											Ext.MessageBox.hide();
	    										}
	    									});
	    								}
	    							});
	    						}
	    					}
	    				}
	    			);
	     	}else{
	     		dataGatheringItems.phantom = false;
	     		
				if(dataGatheringItems.dirty === true || selectItems.length > 0){
					var proxy = dataGatheringItems.getProxy();
					
					proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/datagathering/apply';
					dataGatheringItems.set("items",selectItems);
					
    				Ext.MessageBox.show({
    					title : 'MPTS_v2.0', //Do not change the title
    					msg: 'progressing...',
    					width:320,
    					height:0,
    					wait:true,
    					waitConfig: {interval:200, text:''}
    				});
    				
					dataGatheringItems.save({
						success:function(){
							dataGatheringItems.commit();
							
							store.load({
								callback: function(records, operation, success) {
									if (success) {
										me.onSearch();
										MessageUtil.saveSuccess(); // Success Message
									}
									
									Ext.MessageBox.hide();
								}
							});
						}
					});
				}
	     	}
     	} else {
     		MessageUtil.warning("datagathering", "datagathering_wrong_jpvc");//BL01300022
     	}
    },
	
    onValidationSubmit : function(vslCallID){
    	var me = this;
     	var refs = me.getReferences();
     	var validationCodeStore = me.getStore('dataGatheringValidationCode');
     	
     	validationCodeStore.load({
     		params : {
				vslCallId : vslCallID
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records[0].get("isValidated") === "Y"){
						me.onStarDataGathering();
					} 
				}
			}
     	});
    },
    
    onStarDataGathering:function(){
    	var me = this;
     	var storeItem;
    	var store = me.getStore('dataGatheringList');
    	var applyDataGatheringStore = me.getStore('applyDataGathering');
    	var dataGatheringItems = new Ext.create( 'MOST.model.billing.DataGathering');
    	var selectItems = new Array();
    	
    	store.findBy(function(item){
     		if(item.get('selected') === true){
     			item.data.payer='';
     			item.data.searchType='vesselGather';
     			item.data.userId = MOST.config.Token.getUserId();
     			
     			selectItems.push(item.data);
     		}
     	});
    	
    	dataGatheringItems.phantom = false;
    	
		if(dataGatheringItems.dirty === true || selectItems.length > 0){
			var proxy = dataGatheringItems.getProxy();
			
			proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/datagathering/apply';
			dataGatheringItems.set("items",selectItems);
			dataGatheringItems.save({
				success:function(){
					dataGatheringItems.commit();
					store.load({
						callback: function(records, operation, success) {
							if (success) {
								me.onSearch();
								MessageUtil.saveSuccess(); // Success Message
							}
						}
					});
				}
			});
		}
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
     	var vslCallId = refs.refVslCallIdfield.getValue();
     	var scn = refs.ctlScn.getValue();
     	var cargoType = refs.ctlcargoTypeCombo.getValue();
     	var status = refs.ctlstatusCombo.getValue();
    	var dateType = refs.ctl_optAtu.getValue();
    	var vesselcheck = refs.ctlvesselcheck.getValue();
    	var includecheck = refs.ctlincludecheck.getValue();
    	var startRow = 0;
    	var endRow = 0;
    	var pageNo=0;
    	var pageSize=1000;
    	var dateCondition = me.checkPeriodDate("ctlDateFromDt", "ctlDateToDt", me.MAX_DATE_PERIOD, true);
		
    	if(dateCondition == null){
    		return null;
    	}
    	
    	startRow = (pageSize * pageNo) + 1;
    	endRow = (startRow + pageSize) - 1;
    	pageNo++;
    	
    	var params = {
    		vslCallId : vslCallId,
    		scn: scn,
    		cargoType : cargoType,
    		startRow : startRow,
    		endRow : endRow,
    		isCancelVsl : vesselcheck,
    		includeGatheredData : includecheck,
    		status : status,
    		exportTp:'',
    		userId: MOST.config.Token.getUserId()
		};
    	
    	if(dateCondition != null){
    		if(StringUtil.isNullorEmpty(vslCallId) && StringUtil.isNullorEmpty(scn)){
    			if(dateType.atu_radio==="atu"){
        			params["fromAtb"] = '';
                   	params["toAtb"] = '';
        			params["fromAtu"] = dateCondition.fromDtString;
        			params["toAtu"] = dateCondition.toDtString;	
        		}else if(dateType.atu_radio==="atb"){
            		params["fromAtu"] = '';
                	params["toAtu"] = '';
        			params["fromAtb"] = dateCondition.fromDtString;	
        			params["toAtb"] = dateCondition.toDtString;	
        		}
    		}else{
    			params["fromAtu"] = "";
    			params["toAtu"] = "";	
    			params["fromAtb"] = "";
                params["toAtb"] = "";
    		}
    	}
    	
    	return params;
	},
	
	//Change DateTodtEvent
	onDateChange:function( control, newValue, oldValue, eOpts){
		var me = this;
		var refs = me.getReferences();
		var validateDate = false;
		
		if(control == refs.ctlDateFromDt){
			validateDate = me.validatePeriodDate(newValue, refs.ctlDateToDt.getValue(), me.MAX_DATE_PERIOD);
			
			if(!validateDate){
				me.setDateInDaysByDate('ctlDateToDt', me.MAX_DATE_PERIOD, control.getValue());
			}
		} else {
			validateDate = me.validatePeriodDate(refs.ctlDateFromDt.getValue(), newValue, me.MAX_DATE_PERIOD);
			
			if(!validateDate){
				me.setDateInDaysByDate('ctlDateFromDt', -me.MAX_DATE_PERIOD, control.getValue());
			}
		}
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
		var detailView = me.getDetailBizView();
		var infoForm = detailView.down('form').getForm();
		infoForm.isValid(); // Mandatory to appear red for.
		
		var recvData = me.getView().recvData;
		
		if(recvData != null){
	     	refs.ctlDetailVslCallId.setValue(recvData.vslCallId);
		}
		
		me.setDetailInitialize();
	},
    
	// Detail Initialize
	setDetailInitialize:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var store = me.getStore('dataGatheringDetailList');
		
		refs.ctlDetailVslCallId.setValue(recvData.data.vslCallId);
		store.removeAll();
		store.commitChanges();
		
		if(recvData == null){ // CREATE
			recvData = Ext.create('MOST.model.billing.DataGathering'); 
			me.setDetailControl(recvData);
		} else {
			store.load({
				params: {
					vslCallId:recvData.data.vslCallId
				},
				callback:function(records, operation, success){
					if(success){
						if(records.length > 0){
							me.setDetailControl(records[0]);
							me.setComboStore(records[0]);
						}
					}
				}
			});
		}
	},
	
	setDetailControl:function(record){
		var me = this;
		var refs = me.getReferences();
		var vesselInfolItem = new Ext.create('MOST.model.billing.DataGathering');
		var detailItem = new Ext.create('MOST.model.billing.DataGathering');
		var gatheredDataListStore = me.getStore("dataGatheringGatheredDataList");
		var cargoInfoListStore = me.getStore("dataGatheringCargoInfoList");
		var cargoSummarizeInfoListStore = me.getStore("dataGatheringCargoSummarizeInfoList");
		var equipmentInfoListStore = me.getStore("dataGatheringEquipmentInfoList");
		var dataGatheringUserRefNoComboStore = me.getStore("dataGatheringUserRefNoCombo");
		var dataGatheringSubBlSNNoComboStore = me.getStore("dataGatheringSubBlSNNoCombo");
		
		gatheredDataListStore.removeAll();
		cargoInfoListStore.removeAll();
		cargoSummarizeInfoListStore.removeAll();
		equipmentInfoListStore.removeAll();
		dataGatheringUserRefNoComboStore.removeAll();
		dataGatheringSubBlSNNoComboStore.removeAll();
		
		for(var i=0; i<record.data.childGatheredData.length;i++){
			if(record.data.childGatheredData[i].bbtCheck=="true"){
				record.data.childGatheredData[i].bbtCheck=true;
			} else {
				record.data.childGatheredData[i].bbtCheck=false;
			}
		}
		
		gatheredDataListStore.setData(record.data.childGatheredData);
		cargoInfoListStore.setData(record.data.childCargoInfo);
		cargoSummarizeInfoListStore.setData(record.data.childCargoSumInfo);
		equipmentInfoListStore.setData(record.data.childEquipmentInfo);
		
		dataGatheringUserRefNoComboStore.load({
			params: {
				vslCallId: refs.ctlDetailVslCallId.getValue()
			}
		});
		dataGatheringSubBlSNNoComboStore.load({
			params: {
				vslCallId: refs.ctlDetailVslCallId.getValue()
			}
		});
		
		gatheredDataListStore.commitChanges();
		cargoInfoListStore.commitChanges();
		cargoSummarizeInfoListStore.commitChanges();
		equipmentInfoListStore.commitChanges();
		
		vesselInfolItem.data=record.data.childVesselInfo[0];
		detailItem.data = record.data.childGatheredData[0];
		me.getViewModel().setData({theVesselInfo:vesselInfolItem});
		me.getViewModel().setData({DetailItem:detailItem});
	},
	
	// Toolbar Save Button
	onDetailSave:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var userType = MOST.config.Token.getUserType();
		
		if(detailView){
			var infoForm = detailView.down('form').getForm();
			
			if(infoForm.isValid()){
				me.detailSaveProcess();
			} else {
				MessageUtil.mandatoryFieldInValid();
			}
		}
	},
	
	// Detail Save Process
	detailSaveProcess : function(){
		var me = this;
		var refs = me.getReferences();
		var gatheredDataListStore = me.getStore("dataGatheringGatheredDataList");
		var dataGatheringDetailItems = new Ext.create('MOST.model.billing.DataGathering');
		var remarkItem = new Ext.create('MOST.model.billing.DataGathering');
		var detailItem = me.getViewModel().get('DetailItem');
		var gatheredDataItems = gatheredDataListStore.data;
		var store = me.getStore('dataGatheringDetailList');
		var detailStore = me.getStore('saveDataGatheringDetail');
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		if(gatheredDataItems.items != null && gatheredDataItems.items.length > 0){
			var bFilter = false;
			var bbtcheckItems = new Array();
			var remarkItems = new Array();
			
			// CREATE, UPDATE RECORD
			gatheredDataListStore.getModifiedRecords().forEach(function(record, index, array){
				var bbtCheckItem = new Ext.create('MOST.model.billing.DataGathering');

				if(record.data.bbtCheck === true && record.data.status === "Invoiced"){
					MessageUtil.warning("datagathering", "datagatheringdetailgathereddata_save_error_msg");//BL01300007
					bFilter=true;
		     		return;
				}
				
				bbtCheckItem.data.vslCallId = detailItem.data.vslCallId;
				bbtCheckItem.data.tariffCode = record.data.tariffCode;
				bbtCheckItem.data.subTariffCode = record.data.subTariffCode;
				bbtCheckItem.data.payer = record.data.payer;
				bbtCheckItem.data.prefix = record.data.prefix;
				bbtCheckItem.data.gatherNo = record.data.gatherNo;
				
				if(record.data.bbtCheck === true){
					bbtCheckItem.data.status = CodeConstants.MT_IVSTAT_WV; 
				} else {
					if(record.data.status ==="Invoiced"){
						bbtCheckItem.data.status = CodeConstants.MT_IVSTAT_IV;
					}else if(record.data.status ==="Verified"){
						bbtCheckItem.data.status = CodeConstants.MT_IVSTAT_VF;
					}else if(record.data.status ==="Gathered"){
						bbtCheckItem.data.status = CodeConstants.MT_IVSTAT_GT;
					}else{
						bbtCheckItem.data.status = CodeConstants.MT_IVSTAT_GT;
					}
				}
				
				bbtCheckItem.data.waiverDescr = record.data.waiverDescr;
				bbtCheckItem.data.version = record.data.version;
				bbtCheckItem.data.userId = MOST.config.Token.getUserId();
				bbtcheckItems.push(bbtCheckItem.data);
			});
			
			remarkItem.data.vslCallId = detailItem.data.vslCallId;
			remarkItems.push(remarkItem.data);
			
			dataGatheringDetailItems.set("bbtcheckInfo",bbtcheckItems);
			dataGatheringDetailItems.set("remarkInfo",remarkItems);
			
			dataGatheringDetailItems.phantom = false;
			
			if((dataGatheringDetailItems.dirty === true && dataGatheringDetailItems.get('bbtcheckInfo').length > 0) && bFilter === false ){
				updateParm.getProxy().url = detailStore.getProxy().url;
				updateParm.phantom = false;
				updateParm.set(WorkingStatus.UPDATE);
				updateParm.set('item', dataGatheringDetailItems.data);
				
				updateParm.save({
					success : function(){
						dataGatheringDetailItems.set("version", dataGatheringDetailItems.get('newVersion'));
						dataGatheringDetailItems.commit();
						
						store.load({
							callback: function(records, operation, success) {
								if (success) {
									me.onDetailLoad();
									MessageUtil.saveSuccess(); // Success Message
								}
							}
						});
					}
				});
			}			
		}
	},
	
	onRemoveDetail: function(){
		var me = this;
		var refs = me.getReferences();
		
		var grid = me.lookupReference('refDataGatheringDetailGatheredDataGrid');
		var gatheredDataListStore = me.getStore("dataGatheringGatheredDataList");
		var bbtCheckItem = new Ext.create('MOST.model.billing.DataGatheringBbtCheck');
		var detailItem = me.getViewModel().get('DetailItem');
		var store = me.getStore('dataGatheringDetailList');
		
		var gridStore = grid.getStore();
		
		gridStore.clearFilter();
		gridStore.filter('bbtCheck',true);
		
		var count = grid.getStore().getData().items.length;
		
		gridStore.clearFilter();
		
		if(count <= 0){
			MessageUtil.warning("datagathering", "datagatheringdetailgathereddata_grid_checked");
     		return;
		}
		
		MessageUtil.question('datagathering', 'datagatheringdetailgathereddata_remove_msg',null, //CM00003
			function(button){
				if (button === 'ok') {
					bbtCheckItem.data.vslCallId = detailItem.data.vslCallId;
					bbtCheckItem.data.status = "delete";
					
					bbtCheckItem.phantom = false;
					
					var proxy = bbtCheckItem.getProxy();
					proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/datagathering/removedetail';
					
					bbtCheckItem.save({
						success : function(){
							bbtCheckItem.commit();
							store.load({
								callback: function(records, operation, success) {
									if (success) {
										me.onDetailLoad();
										MessageUtil.saveSuccess(); // Success Message
									}
								}
							});
						}
					});
				}
			}
		);
	},
	
	onStartDataGatheringDetail: function(){
		var me = this;
		var refs = me.getReferences();
		var payer= refs.ctlPayerCombo.getValue();
		var detailItem = me.getViewModel().get('DetailItem');
		var dataGatheringItems = new Ext.create( 'MOST.model.billing.DataGathering');
		var dataItem = new Ext.create( 'MOST.model.billing.DataGathering');
		var store = me.getStore('dataGatheringList');
		var arr1 = new Array();
		
		MessageUtil.question('datagathering', 'datagatheringdetaile_regathering_msg',null, //BL01300024
			function(button){
				if (button === 'ok') {
			    	var win = refs.refDataGatheringDetail.up('panel');
			    	
					if(win){
						win.getEl().mask('Data Gathering...');
					}
					
					dataItem.set("vslCallId",refs.ctlDetailVslCallId.getValue());
					dataItem.set("userId", MOST.config.Token.getUserId());
					dataItem.set("payer", payer);
					arr1.push(dataItem.data);
					
					dataGatheringItems.phantom = false
					
					if(dataGatheringItems.dirty === true || arr1.length > 0){
						var proxy = dataGatheringItems.getProxy();
						proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/datagathering/apply';
						
						dataGatheringItems.set("items",arr1);
						
						dataGatheringItems.save({
							success:function(){
								dataGatheringItems.commit();
								me.onDetailLoad();

								MessageUtil.info("Data Gathering", "Data Gathering was finished successfully");
								
								if(win){
									win.getEl().unmask();
								}
							}
						});
					}
				}
			}
		);
	},
	
	onStartProofSheet:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvDataDetail = detailView.items.get(0).recvData;
		var recvData = {
			vslCallId: recvDataDetail.data.vslCallId
		};
		
		me.loadMenuView('app-proofsheet',recvData);
	},
	
	onDetailSearch:function(){
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore('dataGatheringDetailList');
    	var payer= refs.ctlPayerCombo.getValue();
    	var vslCallId = refs.ctlDetailVslCallId.getValue();
    	var cgNo = refs.ctlSubBlSnNoCombo.getValue();
    	var userRefNo = refs.ctlUserRefNoCombo.getValue();
    	
		store.load({
			params: {
	    		vslCallId: vslCallId,
	    		payer 	 : payer,
				cgNo  	 : cgNo,
				userRefNo: userRefNo
			},
			callback: function(records, operation, success) {
				if (success) {
					// SUCCES
					me.setDetailControl(records[0]);
				}
			}
		});
	},
	
	setComboStore:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var dataGatheringPayerCombo = me.getStore('dataGatheringPayerCombo');
		
		for(var i=0 ; i<masterItem.data.payerInfo.length ; i++){
			if(masterItem.data.payerInfo[i].payerName == null){
				masterItem.data.payerInfo[i].payerName = masterItem.data.payerInfo[i].payer;
			}
		}
		
		dataGatheringPayerCombo.setData(masterItem.data.payerInfo);
		dataGatheringPayerCombo.insert(0, [{payerName: 'All',payer: ''}]);
	},
	
	//addded by Vin - 20190606 - Mantis 91394
	onDetailChecked:function(chkbox, rowIdx, checked, record, e, eOpts){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refDataGatheringDetailGatheredDataGrid;
		var store = grid.getStore();
		
		if(record.get('status') == 'Invoiced'){
			store.clearFilter();
			store.filter('bbtCheck',true);
			store.each(function (rec) {
                rec.set('bbtCheck', false);
            });
            store.clearFilter();
			
			MessageUtil.warning("datagathering", "datagatheringdetailgathereddata_status_invoiced");
     		return;
		}
		
		if(record.get('status') == 'Verified'){
			store.clearFilter();
			store.filter('bbtCheck',true);
			store.each(function (rec) {
                rec.set('bbtCheck', false);
            });
            store.clearFilter();

            MessageUtil.warning("datagathering", "datagatheringdetailgathereddata_status_verified");
     		return;
		}
	},
	
	onDataGatheringPreview:function(){
		var me = this;
		var refs = me.getReferences();
		var generatePDFDataGathering = me.getStore('generatePDFDataGathering');
		var params = me.getSearchCondition();
	
		params['exportTp'] = 'PDF';
		
		generatePDFDataGathering.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					me.openPDFPreview (records, operation, success);
				}
			}
		})
	},
	
	onDataGatheringExport:function(){
		var me = this;
		var refs = me.getReferences();
		var params = {
			initSearch: true
		};
		
		me.openCodePopup('popup-exporttypepopup','refBtnDownload', params);
	},
	
	onDownloadExport:function(addString){
		var me = this;
		var refs = me.getReferences();
		var generatePDFDataGathering = me.getStore('generatePDFDataGathering');
		var params = me.getSearchCondition();
		
		params['exportTp'] = refs.refRadioReportType.getValue().rb;
		
		generatePDFDataGathering.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					var content = records[0].data.content.replace(/&lt;/gi,'<').replace(/&gt;/gi,'>');
		        	Ext.exporter.File.saveBinaryAs(content, records[0].data.fileName);
				}
			}
		})
	},
	
	onDownloadCancel:function(ownWin){
		var me = this;
		var winAlias = "popupAliaspopup-exporttypepopup";
		var win = me.lookupReference(winAlias);
		
		win.close();
	},
	
	onExportExcel:function(){
		var me = this;
		var refs = me.getReferences();
		var generatePDFDataGathering = me.getStore('generatePDFDataGathering');
		var params = me.getSearchCondition();
		
		params['exportTp'] = 'EXCEL';
		
		generatePDFDataGathering.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					var content = records[0].data.content.replace(/&lt;/gi,'<').replace(/&gt;/gi,'>');
		        	Ext.exporter.File.saveBinaryAs(content, records[0].data.fileName);
				}
			}
		})
	},
	
    exportTo: function(btn) {
    	var me = this;
    	var refs = me.getReferences();
    	var grid = refs.refDataGatheringGrid;
        var cfg = Ext.merge({
            title: 'Data Gathering',
            fileName: 'Data_Gathering' + '.' + (btn.cfg.ext || btn.cfg.type)
        }, btn.cfg);
        
        grid.saveDocumentAs(cfg);
    },
    
    onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.billing.SearchDataGatheringParm';
		searchBizParm.serviceID = 'MOST.dataGathering.selectDataGathering';

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		var shipNote = me.getViewModel().get('theShippingNote');
		
		if(targetControl === 'refVslCallIdfield'){ 
			if(returnValue){
				refs.ctlScn.setValue(returnValue.item.get('scn'));
				me.getViewModel().setData({DetailItem:returnValue.item});
				me.onSearch();
			} else {
				me.getViewModel().setData({DetailItem:null});
			}
			
		}else if(targetControl === 'ctlScn'){ 
			if(returnValue){
				refs.ctlScn.setValue(returnValue.code);

				if(!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))){
					refs.refVslCallIdfield.setValue(returnValue.item.get('vslCallId'));
					me.getViewModel().setData({DetailItem:returnValue.item});
					me.onSearch();
				}else {
					refs.refVslCallIdfield.setValue('');
					me.getViewModel().setData({DetailItem:null});
				}
			} 
		}
	}
    /**
	 * DETAIL END
	 * =========================================================================================================================
	 */
});