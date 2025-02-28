Ext.define('MOST.view.document.VesselScheduleRegisterController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.vesselscheduleregister',
	VIEW_TYPE_CREATE : 'CREATE',
	VIEW_TYPE_UPDATE : 'UPDATE',
	VIEW_TYPE_COPY : 'COPY',
	USER_TYPE_INTERNAL : "I", 				// MOST.config.Token.getUserType()\
	USER_TYPE_EXTERNAL : "E", 				// MOST.config.Token.getUserType()
	CURRENT_VIEW_TYPE : '',
	MAX_DATE_PERIOD : 15,	// MAX PERIOD DATE
	MAIN_GRID_REF_NAME: 'refVesselScheduleGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'vesselScheduleList',
	DETAIL_STORE_NAME: 'vesselScheduleDetail',
	TERMINAL_COMBO_STORE: 'terminalCombo',
	CONFIRM_STATES_STORE: 'confirmStates',
	BERTH_WHARF_COMBO_STORE: 'berthWharfCombo',
	PURPOSE_CALL_COMBO_STORE: 'purpCallCombo',
	CARGO_TYPE_COMBO_STORE: 'cargoTypeCombo',
	PREV_PORT_LIST_STORE: 'prvPortList',
	DUPLICATE_VESSEL_CALL_ID_STORE: 'duplicateVesselCallIdStore',
	VESSELID_DUPLICATE_CHECK_STORE: 'vslIdDuplicateCheck',
	VESSEL_SCHEDULE_STATUS_STORE: 'vesselScheduleStatus',
	FRESH_WATER_COMBO: 'freshWtCombo',
	CHANDELLING_COMBO: 'chandellingCombo',
	QAUNTITY_BUNKER_COMBO: 'qtyBunkerCombo',
	CARGO_OPERATION_TYPE_COMBO: 'cgOpTypeCombo',
	BERTH_ALONGSIDE_COMBO_STORE: 'berthAlongSideCombo',
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var terminalStore = me.getStore(me.TERMINAL_COMBO_STORE);
		var berthLocStore = me.getStore(me.BERTH_WHARF_COMBO_STORE);
		var partnerCode = MOST.config.Token.getPtnrCode();
		var userType = MOST.config.Token.getUserType();
		var statusStore = me.getStore(me.CONFIRM_STATES_STORE);
		
		statusStore.load();
		//me.setComboBoxWithLocalCache(CacheServiceConstants.CONFIRM_STATE_COMBOBOX, me.CONFIRM_STATES_STORE);
		me.setComboBoxWithLocalCache(CacheServiceConstants.FRESH_WATER_COMBO, me.FRESH_WATER_COMBO);
		me.setComboBoxWithLocalCache(CacheServiceConstants.CHANDELLING_COMBO, me.CHANDELLING_COMBO);
		me.setComboBoxWithLocalCache(CacheServiceConstants.QAUNTITY_BUNKER_COMBO, me.QAUNTITY_BUNKER_COMBO);
		
		if(userType == me.USER_TYPE_EXTERNAL){
			refs.txtSAgent.setEditable(false);
			refs.txtSAgent.setValue(partnerCode);
			//refs.refBtnSearchSA.setDisabled(true);
		}else{
			//refs.refBtnSearchSA.setDisabled(false);
			refs.txtSAgent.setEditable(true);
		}
		
		terminalStore.load();
		berthLocStore.load();
		
		me.setDateInDays('ctlDateFromDt', -me.MAX_DATE_PERIOD);
		me.setDateInDays('ctlDateToDt',+me.MAX_DATE_PERIOD);
		
		var searchParm = Ext.create('MOST.model.document.SearchVesselScheduleRegisterParm');
		
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		var theSearch = me.getViewModel().get('theSearch');
		
		theSearch.set('eta', me.lookupReference('ctlDateFromDt').getValue());
		theSearch.set('etd', me.lookupReference('ctlDateToDt').getValue());
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
    	var store = me.getStore(me.MAIN_STORE_NAME);
     	var params = me.getSearchCondition();
    	
    	store.load({
    		params: params,
    		callback: function(record, ope, success){
    			if(success){
    				if(record.length == 0){
    					MessageUtil.alert('warning', 'datanotfound_msg');
			            return false;
    				}
    			}
    		}
    	});
	},
	
	onDblClick: function() {
		var me = this;
		var grid = me.lookupReference('refVesselScheduleGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) {
			return;
		}
		
		selection.set('crud', 'U');
		
		me.CURRENT_VIEW_TYPE = me.VIEW_TYPE_UPDATE;
		me.getView().detailViewAlias = 'app-vesselschedulevcsdetail';
		
		me.openDetailPopup(selection);
	},
	
	openSAgentPopup:function(){
		var me = this;
		me.openCodePopup('popup-sagentpopup', 'txtSAgent');
	},
	
	onSelect:function (){
		var me = this;
		var store = this.getStore(me.BERTH_WHARF_COMBO_STORE);
		var terminalCd = this.lookupReference('ctrlBerthLoc').getValue();
		
		store.load({
			params: {
				searchType: ComboboxServiceConstants.COMBO_BERTH_LOC,
				locCd: terminalCd
			},
			
			callback: function(records, operation, success) {
				me.lookupReference('ctrlBerthLoc1').bindStore(store);
			}
		});
	},
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var refs = me.getReferences();
		var searchBizParm = me.getSearchCondition();
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.document.SearchVesselScheduleRegisterParm';
		searchBizParm.serviceID = 'MOST.vesselScheduleRegister.selectVesselScheduleList'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * EVENT HANDLER DETAIl START
	 * =========================================================================================================================
	 */
	onDetailLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var purposeStrore = me.getStore(me.PURPOSE_CALL_COMBO_STORE);
		var cargoTypeStore = me.getStore(me.CARGO_TYPE_COMBO_STORE);
		var detailItemStore = me.getStore(me.DETAIL_STORE_NAME);
		var prePortStore = me.getStore(me.PREV_PORT_LIST_STORE);
		var recvData = null;
		var detailView = null;
		var infoForm = null;
		var userType = MOST.config.Token.getUserType();
		var theVslSchl = Ext.create('MOST.model.document.VesselScheduleRegister');
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.BERTH_ALONG_SIDE_COMBOBOX, me.BERTH_ALONGSIDE_COMBO_STORE);
		me.setComboBoxWithLocalCache(CacheServiceConstants.CARGO_OPERATION_TYPE_COMBO, me.CARGO_OPERATION_TYPE_COMBO);
		
		purposeStrore.load();
		cargoTypeStore.load();
		
		if(userType == me.USER_TYPE_EXTERNAL){
			refs.ctlAta.setReadOnly(true);
			refs.ctlAtd.setReadOnly(true);
		}else{
			refs.ctlAta.setReadOnly(false);
			refs.ctlAtd.setReadOnly(false);
		}

		if(me.getView().mode != 'VP'){
			detailView = me.getDetailBizView();
			recvData = me.getDetailBizView().items.items[0].recvData;
			me.getViewModel().set('theVslSchl', recvData);
			
			if(me.getView().mode == 'LO'){
				recvData = me.getView().vslSchlItem();
			}
			
			refs.refBtnSave.setHidden(true);
			
			detailItemStore.load({
				params:{
					vslCd: recvData.data.vslCd,
					callSeq: recvData.data.callSq,
					callYear: recvData.data.callYear
				},
				callback: function(records, ope, success){
					if(success){
						var endPos1 = me.getViewModel().get('theVslSchl').get('endPos1');
						var endPos = me.getViewModel().get('theVslSchl').get('endPos');
						var startPos = me.getViewModel().get('theVslSchl').get('startPos');
						var loa = me.getViewModel().get('theVslSchl').get('loa');
						var pstSta = me.getViewModel().get('theVslSchl').get('pstSta');
						
						me.getViewModel().setData({theVslSchl: records[0]});
						
						me.getViewModel().get('theVslSchl').set('startPos', startPos);
						me.getViewModel().get('theVslSchl').set('endPos', endPos);
						me.getViewModel().get('theVslSchl').set('loa', loa);
						me.getViewModel().get('theVslSchl').set('pstSta', pstSta);
						me.getViewModel().get('theVslSchl').set('endPos1', endPos1);
						
						var vslItem = me.getViewModel().get('theVslSchl');
						var prevPortArr = [];
						
						refs.ctlEta.setValue(records[0].data.eta);
						refs.ctlEtd.setValue(records[0].data.etd);
						refs.ctlEtw.setValue(records[0].data.etw);
						refs.ctlEtb.setValue(records[0].data.etb);
						refs.ctlAta.setValue(records[0].data.ata);
						refs.ctlAtd.setValue(records[0].data.atd);
						refs.ctlAtb.setValue(records[0].data.atb);
						refs.ctlAtu.setValue(records[0].data.atu);
						refs.ctlYot.setValue(records[0].data.yot);
						refs.ctlYct.setValue(records[0].data.yct);
						if (me.CURRENT_VIEW_TYPE === 'COPY') {
							refs.txtOboundVoy.setValue('');
							refs.txtIboundVoy.setValue('');
						}
						refs.refDomesticChk.checked = records[0].get('domesticChk') == 'Y' ? true : false;
						
						portList = records[0].get('portList');
						
						me.onHandlePurp(records[0].data.purpCall);
						me.onHandleCgTp(records[0].data.cargoOpTp);
						me.onHandleBerth(records[0].data.locCd);
						
						Ext.Array.each(portList, function(item){
							if(item.checkPort == 'Y'){
								me.getViewModel().setData({lastport:item});
							}else if(item.checkPort == 'N'){
								prevPortArr.push(item);
							}else{
								me.getViewModel().setData({nextport: item});	
							}
						});
						
						if(me.CURRENT_VIEW_TYPE == me.VIEW_TYPE_COPY){
							vslItem.set('vslCallId','');
							vslItem.set('scn', '');
							vslItem.set('callSq','');
						}
						
						if(MOST.config.Token.getUserType() == CodeConstants.USER_TYPE_EXTERNAL){
							refs.refBtnApprove.setHidden(true);
							
							if(me.getViewModel().get('theVslSchl').get('summitStat') == CodeConstants.MT_DOCSTAT_AP){
								me.setComponentDisable(true);
							}
						} else {
							me.setComponentDisable(false);
							
							if(me.getViewModel().get('theVslSchl').get('summitStat') == CodeConstants.MT_DOCSTAT_AP){
								refs.refBtnApprove.setHidden(true);
							}
						}
					}
				}
			});
		}else{
			me.getViewModel().set('theVslSchl', recvData);
			refs.fsStt.setHidden(true);
			
			if(me.CURRENT_VIEW_TYPE == me.VIEW_TYPE_COPY){
				refs.refBtnSave.setHidden(true);
			}else{
				refs.refBtnSave.setHidden(false);
			}
			
			detailView = me.getView();
			recvData = me.getView().vslSchlItem;
			me.getViewModel().setData({theVslSchl: recvData});
			
			var vslItem = me.getViewModel().getData().theVslSchl;
			
			infoForm = detailView.getForm();
			infoForm.isValid();
		}
	},
	
	openFlagPopup:function(){
		var me = this;
		me.openCodePopup('popup-countrycodepopup', 'txtFlag');
	},
	
	onSelectcgTp: function(car){
		var me = this;
		var refs = me.getReferences();
		var carTp = refs.cboPurposeCall1.getValue();
		
		refs.txtLoadCargo.setValue('');
		refs.txtDischCargo.setValue('');
		refs.txtLoadQty.setValue('');
		refs.txtDischQty.setValue('');
		
		me.onHandleCgTp(carTp);
	},
	
	onHandleCgTp: function(carTp){
		var me = this;
		var refs = me.getReferences();
		
		if(carTp == "B"){
			refs.txtLoadCargo.setEditable(true);
			refs.txtLoadCargo.allowBlank = false;
			refs.txtLoadCargo.setFieldStyle('background-Color: #c6e2ff;');
			refs.txtDischCargo.setEditable(true);
			refs.txtDischCargo.allowBlank = false;
			refs.txtDischCargo.setFieldStyle('background-Color: #c6e2ff;');
			refs.txtLoadQty.setEditable(true);
			refs.txtLoadQty.allowBlank = false;
			refs.txtLoadQty.setFieldStyle('background-Color: #c6e2ff;');
			refs.txtDischQty.setEditable(true);
			refs.txtDischQty.allowBlank = false;
			refs.txtDischQty.setFieldStyle('background-Color: #c6e2ff;');
			
		}else if(carTp == 'D'){
			refs.txtLoadCargo.setEditable(false);
			refs.txtLoadCargo.allowBlank = true;
			refs.txtLoadCargo.setFieldStyle('background-Color: #FFFFFF;');
			refs.txtDischCargo.setEditable(true);
			refs.txtDischCargo.allowBlank = false;
			refs.txtDischCargo.setFieldStyle('background-Color: #c6e2ff;');
			refs.txtLoadQty.setEditable(false);
			refs.txtLoadQty.allowBlank = true;
			refs.txtLoadQty.setFieldStyle('background-Color: #FFFFFF;');
			refs.txtDischQty.setEditable(true);
			refs.txtDischQty.allowBlank = false;
			refs.txtDischQty.setFieldStyle('background-Color: #c6e2ff;');
		}else if(carTp == "L"){
			refs.txtLoadCargo.setEditable(true);
			refs.txtLoadCargo.allowBlank = false;
			refs.txtLoadCargo.setFieldStyle('background-Color: #c6e2ff;');
			refs.txtDischCargo.setEditable(false);
			refs.txtDischCargo.allowBlank = true;
			refs.txtDischCargo.setFieldStyle('background-Color: #FFFFFF;');
			refs.txtLoadQty.setEditable(true);
			refs.txtLoadQty.allowBlank = false;
			refs.txtLoadQty.setFieldStyle('background-Color: #c6e2ff;');
			refs.txtDischQty.setEditable(false);
			refs.txtDischQty.allowBlank = true;
			refs.txtDischQty.setFieldStyle('background-Color: #FFFFFF;');
		}else{
			refs.txtLoadCargo.setEditable(false);
			refs.txtLoadCargo.allowBlank = true;
			refs.txtLoadCargo.setFieldStyle('background-Color: #FFFFFF;');
			refs.txtDischCargo.setEditable(false);
			refs.txtDischCargo.allowBlank = true;
			refs.txtDischCargo.setFieldStyle('background-Color: #FFFFFF;');
			refs.txtLoadQty.setEditable(false);
			refs.txtLoadQty.allowBlank = true;
			refs.txtLoadQty.setFieldStyle('background-Color: #FFFFFF;');
			refs.txtDischQty.setEditable(false);
			refs.txtDischQty.allowBlank = true;
			refs.txtDischQty.setFieldStyle('background-Color: #FFFFFF;');
		}
	},
	
	onDetailSave: function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getView();
		var recvData = detailView.recvData;
		var theVslSchl = me.getViewModel().get('theVslSchl');
		
		if(detailView.mode != 'VP'){
			detailView = me.getDetailBizView();
			recvData = detailView.items.items[0].recvData;
		}
		
		var detailStore = this.getStore(me.DETAIL_STORE_NAME);
		var date = new Date();
		var curYear = date.getFullYear();
		var berthLoc = refs.cboBerthLoc.getValue();
		var eta = refs.ctlEta.getValue();
		var etaString = eta==null?null:Ext.Date.format(eta, MOST.config.Locale.getShortDate());
		var etd = refs.ctlEtd.getValue();
		var etdString = etd==null?null:Ext.Date.format(etd, MOST.config.Locale.getShortDate());
		var date = new Date();
		var statusCrud = '';
		
		var berthWh = refs.cboBerthWharf.getValue();
		if(StringUtil.isNullorEmpty(berthWh)){
			MessageUtil.alert('warning', 'vslschlBerthLocation_empty');
			return false;
		}
		
//		if (eta < date || etd < date){
//			MessageUtil.alert('warning', 'vslschlETAorETDLessThanCurr_msg');
//			return false; 
//		} 
//		
//		if ((eta < date && eta <etd) || (date < eta < etd)){
//			var eta = refs.ctlEta.getValue()
//		} else {
//			MessageUtil.alert('warning', 'vslschlETALessThanCurrentDt_msg');
//			return false; 
//		}
//
//		if(etd < date){
//			MessageUtil.alert('warning', 'vslschlETDLessThanCurrentDt_msg');
//			return false; 
//		}
		
		if(StringUtil.isNullorEmpty(etaString)){
			MessageUtil.alert('warning', 'vslschlETA_empty');
			return false;
		}
		
		if(StringUtil.isNullorEmpty(etdString)){
			MessageUtil.alert('warning', 'vslschlETD_empty');
			return false;
		}
		
		if (eta > etd){
			MessageUtil.alert('warning', 'vessel_esttimeline_msg');
			return false; 
		} 
		
		if(me.getView().mode != "VP"){
			statusCrud = recvData.get('crud');
		}else {
			statusCrud = me.getView().vslSchlItem.get('crud');
		}
		
		var model = me.getViewModel().getData().theVslSchl;
		var eta = refs.ctlEta.getValue();
		var etaString = eta==null?null:Ext.Date.format(eta, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var etdString = etd==null?null:Ext.Date.format(etd, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var etw = refs.ctlEtw.getValue();
		var etwString = etw==null?null:Ext.Date.format(etw, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var etb = refs.ctlEtb.getValue();
		var etbString = etb==null?null:Ext.Date.format(etb, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var ata = refs.ctlAta.getValue();
		var ataString = ata==null?null:Ext.Date.format(ata, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var atd = refs.ctlAtd.getValue();
		var atdString = atd==null?null:Ext.Date.format(atd, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var yot = refs.ctlYot.getValue();
		var yotString = yot==null?null:Ext.Date.format(yot, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var yct = refs.ctlYct.getValue();
		var yctString = yct==null?null:Ext.Date.format(yct, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var portStore = me.getStore(me.PREV_PORT_LIST_STORE);
		var portArr = new Array();

		model.set('eta', etaString);
		model.set('etd', etdString);
		model.set('etw', etwString);
		model.set('etb', etbString);
		model.set('ata', ataString);
		model.set('atd', atdString);
		model.set('yot', yotString);
		model.set('yct', yctString);
		model.set('domesticChk', refs.refDomesticChk.checked ? 'Y' : 'N');
		model.set('rqQtyBkr', refs.rdQtyBunker.getValue().QtyBkr);
		model.set('rqChangdelling', refs.rdChandelling.getValue().rbChdl);
		model.set('rqFreshWt', refs.rdFreshWater.getValue().rbFWt);
		model.set('scn', refs.txtShipCallNo.getValue());
		
		if(statusCrud == 'C'){
			var etd = refs.ctlEtd.getValue();
			var duplicateStt = false;

			model.set('copyStt', 'C');
			
//			if(StringUtil.isNullorEmpty(refs.txtJPVC.getValue()) && me.CURRENT_VIEW_TYPE == me.VIEW_TYPE_COPY){
//				MessageUtil.alert('warning', 'vslschlJPVCEmpty_msg');
//				return false;
//			}
			if (refs.txtJPVC.getValue() === null) {
			    if (me.CURRENT_VIEW_TYPE === me.VIEW_TYPE_COPY) {
			        MessageUtil.alert('warning', 'vslschlJPVCEmpty_msg');
			        return false;
			    }
			} else if (refs.txtJPVC.getValue() === '') {
			    if (me.CURRENT_VIEW_TYPE === me.VIEW_TYPE_COPY) {
			        MessageUtil.alert('warning', 'vslschlJPVCNull_msg');
			        return false;
			    }
			}else{
				var vslCallId = refs.txtJPVC.getValue();
				
				if(StringUtil.isNullorEmpty(vslCallId) && me.CURRENT_VIEW_TYPE != me.VIEW_TYPE_COPY){
					vslCallId = model.get('vslCallId');
				}
				
				var duplicateVesselCallIdStore = me.getStore(me.DUPLICATE_VESSEL_CALL_ID_STORE);
				
				duplicateVesselCallIdStore.load({
					params:{
						vslCallId: vslCallId
					},
					callback: function(records, ope, success){
						if(success){
							if(records.length>0){
								duplicateStt = true;
								
								if(duplicateStt == true){
									MessageUtil.alert('warning', 'vslschlvslCallIdDuplicate_msg');
									return false;
								}
							}else{
								me.saveProcess(detailStore);
							}
						}
					}
				});
			}
		}else if(statusCrud == 'U'){
			model.set('copyStt', 'U');
			
			var etd = refs.ctlEtd.getValue();
			var callYear = model.get('callYear');
			var vslCd = model.get('vslCd');
			var txtOutVoyage = refs.txtOboundVoy.getValue();
			var txtInVoyage =  refs.txtIboundVoy.getValue();
			
			if(eta > etd){
				MessageUtil.alert('Warning', 'vessel_esttimeline_msg');
				return false;
			}
			
			model.set('insUsrId', MOST.config.Token.getUserId());
			model.set('updUsrId', MOST.config.Token.getUserId());
			
			if(!StringUtil.isNullorEmpty(MOST.config.Token.getPtnrCode())){
				model.set('ptnrCd', MOST.config.Token.getPtnrCode());
			} else{
				model.set('ptnrCd', model.get('arrvSaId'));
			}
			
			if(StringUtil.isNullorEmpty(callYear)){
				callYear = date.getFullYear();
				model.set('callYear', callYear);
			}
		
//			if(me.CURRENT_VIEW_TYPE != me.VIEW_TYPE_COPY){
//			}
			if((txtOutVoyage != null && txtOutVoyage != '') && (txtInVoyage != null && txtInVoyage != '')){					
				tmpvslCallId = callYear.toString().substr(2) + vslCd + '-' + txtOutVoyage;
			}
			
			if((txtOutVoyage != null && txtOutVoyage != '') && (txtInVoyage == null || txtInVoyage == '')){					
				tmpvslCallId = callYear.toString().substr(2) + vslCd + '-' + txtOutVoyage;
			}
			
			if((txtOutVoyage == null || txtOutVoyage == '') && (txtInVoyage != null && txtInVoyage != '')){					
				tmpvslCallId = callYear.toString().substr(2) + vslCd + '-' + txtInVoyage;
			}
			
			model.set('vslCallId', tmpvslCallId);
			
			detailView.items.get(0).vslCd = model.get('vslCd');
			detailStore.insert(0, model);
			me.saveProcess(detailStore);
		}
	},
	
	saveProcess: function(detailStore) {
		var me = this;
		var refs = me.getReferences();
		var model = me.getViewModel().getData().theVslSchl;
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		var isCreated = model.phantom;
		
		if(me.CURRENT_VIEW_TYPE == me.VIEW_TYPE_COPY){
			isCreated = true;
		}
		
		model.set('insUsrId', MOST.config.Token.getUserId());
		
		updateParm.getProxy().url = detailStore.getProxy().url;
		updateParm.phantom = isCreated;
		updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		updateParm.set('item', model.data);
		
		updateParm.save({
			success : function(records,success){
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
					function(button){
						if (button === 'ok') {
							var win = Ext.WindowManager.getActive();

							if (win) {
							    win.suspendEvents(false);
								win.close();
								win.resumeEvents();
								
							}
							
							me.onSearch();
						}else{
							var win = Ext.WindowManager.getActive();
							
							if (win) {
							    win.close();
							}
							
							me.onSearch();
						}
					}
				);
			}
		});
	},
	
	selectSha: function( newValue, oldValue, eOpts ){
		var me = this;
		var refs = me.getReferences();
		var sumStr = refs.cboAgencyCode.getValue();
		var str = sumStr.split('^');
		
		if(str.length>1){
			refs.txtName.setValue(str[1]);
			refs.txtCustomsSACode.setValue(str[3]);
		}
	},
	
	onSelectPurpo: function(){
		var me = this;
		var refs = me.getReferences();
		var purp = refs.cboPurpCall.getValue();
		
		me.onHandlePurp(purp);
		
		if( purp === 'OT'){
			refs.txtPurposeCall.setValue('');
			refs.txtLoadCargo.setValue('');
			refs.txtDischCargo.setValue('');
			refs.txtLoadQty.setValue('');
			refs.txtDischQty.setValue('');
		}else if(purp === 'CO'){
			refs.cboPurposeCall1.setValue('');
		}else if(purp == 'PO'){
			refs.txtLoadCargo.setValue('');
			refs.txtDischCargo.setValue('');
			refs.txtLoadQty.setValue('');
			refs.txtDischQty.setValue('');
		}
	},
	
	onValidate: function(){
		var me = this;
		var refs = me.getReferences();
		var berthLoc = refs.cboBerthLoc.getValue();
		var theVslSchl = me.getViewModel().get('theVslSchl');
		
//		if(StringUtil.isNullorEmpty(berthLoc)){
//			MessageUtil.alert('warning', 'vslschlBerthLocation_empty');
//			return false;
//		}else{
//			var berthWh = refs.cboBerthWharf.getValue();
//			
//			if(StringUtil.isNullorEmpty(berthWh)){
//				MessageUtil.alert('warning', 'vslschlBerthLocation_empty');
//				return false;
//			}
//		}
		
		var berthWh = refs.cboBerthWharf.getValue();
		
		if(StringUtil.isNullorEmpty(berthWh)){
			MessageUtil.alert('warning', 'vslschlBerthLocation_empty');
			return false;
		}
		
		var eta = refs.ctlEta.getValue();
		var etaString = eta==null?null:Ext.Date.format(eta, MOST.config.Locale.getShortDate());
		var etd = refs.ctlEtd.getValue();
		var etdString = etd==null?null:Ext.Date.format(etd, MOST.config.Locale.getShortDate());
		
		if(StringUtil.isNullorEmpty(etaString)){
			MessageUtil.alert('warning', 'vslschlETA_empty');
			return false;
		}
		
		if(StringUtil.isNullorEmpty(etdString)){
			MessageUtil.alert('warning', 'vslschlETD_empty');
			return false;
		}
	},

	onSelectCargoType: function(){
		var me = this;
		var refs = me.getReferences();
		var theVslSchl = me.getViewModel().get('theVslSchl');
	},
	
	onCellMandatorySetting: function(){
		var me = this;
		var refs = me.getReferences();
		var theVslSchl = me.getViewModel().get('theVslSchl');
		var detailView = me.getView();
		
	},
	
	/**
	 * EVENT HANDLER DETAIl END
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
     	var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		var shipPort = searchParm.data.shipPort;
		var confirm = searchParm.data.summitStt;
		var freshWT = searchParm.data.rqFrshWt;
		var shaCd = refs.txtSAgent.getValue();
		
		searchParm.set('eta', me.lookupReference('ctlDateFromDt').getValue());
		searchParm.set('etd', me.lookupReference('ctlDateToDt').getValue());
		
		var formDate = searchParm.data.eta;
     	var toDate = searchParm.data.etd;
		
     	if(shipPort){
     		shipPort = 'Y'
     	}else{
     		shipPort = 'N'
     	}
     	
     	if(confirm === 'Select'){
     		confirm = '';
     	}
     	
    	if (freshWT === 'Y') {
     		MessageUtil.alert('Warning', 'datanotfound_msg');
     	}
    	
     	var userId = MOST.config.Token.getUserId();
     	var ptnrCode = MOST.config.Token.getPtnrCode();
     	var fromString = formDate==null?null:Ext.Date.format(formDate, MOST.config.Locale.getShortDate());
     	var toString = toDate==null?null:Ext.Date.format(toDate, MOST.config.Locale.getShortDate());
     	
     	var shipPortTest;
     	if(refs.chbShipPort.checked == true){
     		shipPortTest = 'Y';
     	}else{
     		shipPortTest = 'N';
     	}
     	
     	params['berthCd'] = refs.ctrlBerthLoc.getValue();
     	params['shipPort'] = shipPortTest;
     	params['shaCd'] = shaCd;
     	params['eta'] = fromString;
     	params['etd'] = toString;
     	params['userId'] = userId;
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
		
		if(ptnrCode != null && ptnrCode != ' '){
			params['saCorpId'] = ptnrCode;
		}

		return params;
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl == 'txtSAgent'){ 
			refs.txtSAgent.setValue(returnValue.code);
		}else if(targetControl == 'txtLastPorCall'){ 
			refs.txtLastPorCall.setValue(returnValue.code);
		}else if(targetControl == 'txtPortPopup'){ 
			refs.txtPortPopup.setValue(returnValue.code);
		}else if(targetControl == 'txtNextPort'){ 
			refs.txtNextPort.setValue(returnValue.code);
		} else if(targetControl === 'ctlScn'){ 
			if(returnValue){
				refs.ctlScn.setValue(returnValue.code);

				if(!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))){
					refs.txtVslCallId.setValue(returnValue.item.get('vslCallId'));
					me.getViewModel().setData({theVslInfo:returnValue.item});
					me.onSearch();
				}else {
					refs.txtVslCallId.setValue('');
					me.getViewModel().setData({theVslInfo:null});
				}
			} 
		}
	},
	
	onClear: function(){
		var me = this;
		var refs = me.getReferences();
		
		refs.ctlAuthCode.setValue("");
     	refs.ctlAuthName.setValue("");
     	refs.refRadioY.setValue(true);
	},
	
	onGridConfirmRender: function(val, cell){
		if(val == 'AP'){
			return 'Approved';
		}else if(val == 'CC'){
			return 'Cancel';
		}else if(val == 'RS'){
			return 'Resubmitted';
		}else if(val == 'RC'){
			return 'Cancel Request';
		}else if(val == 'SV'){
			return 'Saved';
		}else if(val == 'ST'){
			return 'Submitted';
		}else{
			return 'Submitted';
		}
	},
	
	onGridOGARender:function(val, cell){
		if(val == '')
			return 'N/A';
		return '';
	},
	
	onCheckDuplicateVslId : function() {
		var me = this;
		var refs = me.getReferences();
		var theVesselParticular = me.getViewModel().get('vslpartdetail');
		var detailView = refs.refVesselParticularInfoView;
		var vslCd = refs.txtId.getValue();
		
		if (vslCd.length != 4) {
			MessageUtil.alert('warning', 'lenghtVesselId_msg');
			refs.txtId.setValue('');
			return;
		} else {
			var store = me.getStore(me.VESSELID_DUPLICATE_CHECK_STORE);
			store.load({
				params : {
					vslCd : vslCd
				}, 
				callback: function(records, operation, success) {
					if (records.length == 0) {
						MessageUtil.alert('warning', 'validVesselId_msg');
						return;
					} else {
						if(me.CURRENT_VIEW_TYPE != me.VIEW_TYPE_UPDATE){
							MessageUtil.alert('warning', 'usedVesselId_msg');
							refs.txtId.setValue('');
							return;
						}
					}
				}
			});
		}
	},
	
	onSelectBerth: function(ele, rec, idx){
		var me = this;
		var refs = me.getReferences();
		var berthWharf =  me.getStore(me.BERTH_WHARF_COMBO_STORE);
		var locArr = new Array();

		berthWharf.clearFilter();
		
		berthWharf.filter([{
			filterFn: function(item) {
		    	if(item.get('selectId') == rec.get('optionValue')){
		    		locArr.push(item.data);
		    	};
		    }
    	}]);
	},
	
	onPurposeCallRender(val){
		var me = this ;
		var purposeCallStrore = me.getStore(me.PURPOSE_CALL_COMBO_STORE);
		
		index = purposeCallStrore.findExact('optionValue',val);
		
		if(index != -1){
			rs = purposeCallStrore.getAt(index).data.optionName;
			return rs;
		}
	},
	
	onHandleBerth: function(terminalCd){
		var me = this;
		var refs = me.getReferences();
		var store = this.getStore(me.BERTH_WHARF_COMBO_STORE);
		
		store.load({
			params: {
				searchType: ComboboxServiceConstants.COMBO_BERTH_LOC,
				scd: terminalCd
			},
			callback: function(records, operation, success) {
				me.lookupReference('cboBerthWharf').bindStore(store);
			}
		});
	},
	
	onHandlePurp: function(purp){
		var me = this;
		var refs = me.getReferences();
		
		if(purp == 'CO'){
			refs.cboPurposeCall1.setHidden(false);
			refs.txtPurposeCall.setHidden(true);
			refs.refSpace.setHidden(true);
			refs.txtLoadQty.allowBlank = true;
			refs.txtLoadQty.setEditable(false);
			refs.txtDischQty.allowBlank = true;
			refs.txtDischQty.setEditable(false);
		}else if(purp == 'OT'){
			refs.cboPurposeCall1.setHidden(true);
			refs.txtPurposeCall.setHidden(false);
			refs.refSpace.setHidden(true);
			refs.txtLoadQty.allowBlank = true;
			refs.txtLoadQty.setEditable(false);
			refs.txtDischQty.allowBlank = true;
			refs.txtDischQty.setEditable(false);
		}else{
			refs.cboPurposeCall1.setHidden(true);
			refs.txtPurposeCall.setHidden(true);
			refs.refSpace.setHidden(false);
			
			if(purp == CodeConstants.VSLSCH_PURPCALL_PO){
				refs.txtLoadCargo.allowBlank = true;
				refs.txtLoadCargo.setEditable(false);
				refs.txtDischCargo.allowBlank = true;
				refs.txtDischCargo.setEditable(false);
				refs.txtLoadQty.allowBlank = false;
				refs.txtLoadQty.setStyle('{background-color: #B3DEF6;}');
				refs.txtLoadQty.setEditable(true);
				refs.txtDischQty.allowBlank = false;
				refs.txtDischQty.setEditable(true);
			}
		}
	},
	
	onSelectEta: function(field, value){
		var me = this;
		var refs = me.getReferences();

		refs.ctlEtd.setValue(Ext.Date.subtract(value, Ext.Date.HOUR, -4));
	},
	
	onVesselDataSync: function(store,view){
		var me = this;
		var detailItemStore = me.getStore(me.DETAIL_STORE_NAME);
		var item = store.getAt(0);
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		var isCreated = item.phantom;
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = isCreated;
		updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		updateParm.set('item', item.data);
		
		updateParm.save({
			success : function(records,success){
				me.onDetailLoad();
				MessageUtil.saveSuccess();
			}
		});
	},
	
	onApprove: function(btn){
		var me=this;
		me.onDetailSave();
		var refs = me.getReferences();
		var view = refs.refVslDtlView;
		var itemDetail = me.getStore(me.DETAIL_STORE_NAME).getAt(0);
		var store = me.getStore(me.VESSEL_SCHEDULE_STATUS_STORE);
		
		store.insert(0, itemDetail);
		
		var item = store.getAt(0);
	
		item.set('summitStat', 'AP');
		me.onVesselDataSync(store, me);
	},
	
	onCancel: function(btn){
		var me=this;
		var refs = me.getReferences();
		var itemDetail = me.getStore(me.DETAIL_STORE_NAME).getAt(0);
		var store = me.getStore(me.VESSEL_SCHEDULE_STATUS_STORE);
		
		store.insert(0, itemDetail);
		
		var item = store.getAt(0);
	
		item.set('summitStat', 'CC');
		me.onVesselDataSync(store, me);
	},
	
	onSubmit:function(btn){
		var me=this;
		var refs = me.getReferences();
		var itemDetail = me.getStore(me.DETAIL_STORE_NAME).getAt(0);
		var store = me.getStore(me.VESSEL_SCHEDULE_STATUS_STORE);
		
		store.insert(0, itemDetail);
		
		var item = store.getAt(0);
	
		item.set('summitStat', 'ST');
		me.onVesselDataSync(store, me);
	},
	
	onResubmit:function(){
		var me = this;
		var grid = me.lookupReference('refVesselScheduleGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		if(selection.get('summitStat') != 'CC'){
			MessageUtil.alert('warning', 'vslschlNotSubmit_msg');
			return;
		}
		
		var store = me.getStore(me.VESSEL_SCHEDULE_STATUS_STORE);
		
		store.insert(0, selection);
		
		var item = store.getAt(0);
		
		item.set('summitStat', 'ST');
		me.onVesselDataSync(store, me);
	},
	
	onCopy:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refVesselScheduleGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		selection.set('crud', 'C');
		
		me.CURRENT_VIEW_TYPE = me.VIEW_TYPE_COPY;
		me.getView().detailViewAlias = 'app-vesselschedulevcsdetail';
		
		me.openDetailPopup(selection);
	}, 
	
	onLostFocusOutVoyage:function(rec){
		var me = this;
		var refs = me.getReferences();
		var tmpvslCallId = '';
		var theVslSchl = me.getViewModel().getData().theVslSchl;
		var callYear = theVslSchl.get('callYear');
		var vslCd = theVslSchl.get('vslCd');
		
		if(me.CURRENT_VIEW_TYPE == me.VIEW_TYPE_COPY){
			tmpvslCallId = callYear.substr(2) + vslCd;
			refs.txtJPVC.setValue(tmpvslCallId);
		}
	},
	
	onChangeInOutVoyage:function(field, newValue){
		var me = this;
		var refs = me.getReferences();
		var tmpvslCallId = '';
		var theVslSchl = me.getViewModel().getData().theVslSchl;
		var callYear = theVslSchl.get('callYear');
		var vslCd = theVslSchl.get('vslCd');
		
		var txtOutVoyage = refs.txtOboundVoy.getValue();
		var txtInVoyage =  refs.txtIboundVoy.getValue();
	
//		if(me.CURRENT_VIEW_TYPE != me.VIEW_TYPE_COPY){
//		}
		
		if((txtOutVoyage != null && txtOutVoyage != '') && (txtInVoyage != null && txtInVoyage != '')){					
			tmpvslCallId = callYear.toString().substr(2) + vslCd + '-' + txtOutVoyage;
		}
		
		if((txtOutVoyage != null && txtOutVoyage != '') && (txtInVoyage == null || txtInVoyage == '')){					
			tmpvslCallId = callYear.toString().substr(2) + vslCd + '-' + txtOutVoyage;
		}
		
		if((txtOutVoyage == null || txtOutVoyage == '') && (txtInVoyage != null && txtInVoyage != '')){					
			tmpvslCallId = callYear.toString().substr(2) + vslCd + '-' + txtInVoyage;
		}
		
		if((txtOutVoyage == null || txtOutVoyage == '') && (txtInVoyage == null || txtInVoyage == '')){					
			tmpvslCallId = callYear.toString().substr(2) + vslCd;
		}
			
		refs.txtJPVC.setValue(tmpvslCallId);
		
		field.setValue(newValue.toUpperCase());
		
//		if(me.CURRENT_VIEW_TYPE == me.VIEW_TYPE_COPY && refs.txtJPVC.getValue() != ''){
//			tmpvslCallId = callYear.substr(2) + vslCd;
//		}
	},
	
	setComponentDisable: function(value){
		var me = this;
		var refs = me.getReferences();
		
		if(value){
			refs.cboPurpCall.setReadOnly(value);
			refs.cboPurposeCall1.setReadOnly(value);
			refs.cboBerthLoc.setReadOnly(value);
			refs.cboBerthWharf.setReadOnly(value);
			refs.cboBerthAlongSide.setReadOnly(value);
			refs.cboCargoType.setReadOnly(value);
		}
		
		refs.refDomesticChk.setReadOnly(value);
		
		refs.rdQtyBunker.setDisabled(value);
		refs.rdChandelling.setDisabled(value);
		refs.rdFreshWater.setDisabled(value);
		
		refs.ctlEta.setDisabled(value);
		refs.ctlAta.setDisabled(value);
		refs.ctlEtd.setDisabled(value);
		refs.ctlAtd.setDisabled(value);
		refs.ctlEtw.setDisabled(value);
		refs.ctlAtb.setDisabled(value);
		refs.ctlBtr.setDisabled(value);
		refs.ctlEtb.setDisabled(value);
		refs.ctlAtu.setDisabled(value);
		
		refs.txtCntNM.setReadOnly(value);
		refs.txtCntNo.setReadOnly(value);
		refs.txtRefJPVCNo.setReadOnly(value);
		refs.txtIboundVoy.setReadOnly(value);
		refs.txtOboundVoy.setReadOnly(value);
		refs.txtIBServLn.setReadOnly(value);
		refs.txtOBServLn.setReadOnly(value);
		refs.txtTopTier.setReadOnly(value);
		refs.refArrvFwdDraft.setReadOnly(value);
		refs.refDeptFwrdDraft.setReadOnly(value);
		refs.txtHighestPoint.setReadOnly(value);
		refs.refArrvAfterDraft.setReadOnly(value);
		refs.refDeptAfterDraft.setReadOnly(value);
		refs.txtShiftQty.setReadOnly(value);
		refs.txtLoadCargo.setReadOnly(value);
		refs.txtDischCargo.setReadOnly(value);
		//refs.refSurveyWgt.setReadOnly(value);
		refs.txtBunkerQty.setReadOnly(value);
		refs.txtNoCrane.setReadOnly(value);
		refs.txtFshWtQty.setReadOnly(value);
		refs.txtNoFirearm.setReadOnly(value);
		refs.txtSpecInstr.setReadOnly(value);
		refs.txtRemark.setReadOnly(value);
	}
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});