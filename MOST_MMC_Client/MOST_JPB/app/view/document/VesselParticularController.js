Ext.define('MOST.view.document.VesselParticularController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.vesselparticular',
	VIEW_TYPE_CREATE : 'CREATE',
	VIEW_TYPE_UPDATE : 'UPDATE',
	VIEW_TYPE_COPY : 'COPY',
	CURRENT_VIEW_TYPE : '',
	IS_DUPLICATE: 'false',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refVesselParicularGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'vslParticularList',
	PARAMETTER_CHECK_COMBOBOX_STORE: 'vpConfirmCombo',
	DETAIL_STORE_NAME: 'vslPartDetail',
	AGENCY_CODE_STORE: 'agencyCode',
	VESSEL_TYPE_COMBO_STORE: 'vslTypeCombo',
	TRADE_COMBO_STORE: 'tradeCombo',
	SHIPPING_AGENT_COMBO_STORE: 'shaCombo',
	VESSEL_TRADE_COMBO_STORE: 'vslTradeCombo',
	VESSEL_DESIGN_COMBO_STORE: 'vslDesignCombo',
	VESSEL_TERM_COMBO_STORE: 'vslTermCombo',
	SHIPPING_COMBO_STORE: 'shpCombo',
	VALIDATE_MQ_STORE: 'validateForMQ',
	VESSELID_DUPLICATE_CHECK_STORE: 'vslIdDuplicateCheck',
	PREPOSE_CALL_COMBO_STORE: 'purpCallCombo',
	BERTH_ALONGSIDE_COMBO_STORE: 'berthAlongSideCombo',
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
		var searchParm = Ext.create('MOST.model.document.SearchVesselParticularParm');
		var statusStore = me.getStore(me.PARAMETTER_CHECK_COMBOBOX_STORE);
		
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		statusStore.load();
		//me.setComboBoxWithLocalCache(CacheServiceConstants.VP_CONFIRM, me.PARAMETTER_CHECK_COMBOBOX_STORE); 	// MOVE TYPE COMBO
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
     	var refs = me.getReferences();
    	var store = me.getStore(me.MAIN_STORE_NAME);
     	var params = me.getSearchCondition();
     	
    	store.load({
    		params: params
    	});
	},
	
	onDblClick: function() {
		var me = this;
		var grid = me.lookupReference('refVesselParicularGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		selection.set('crud', 'U');
		me.CURRENT_VIEW_TYPE = me.VIEW_TYPE_UPDATE;
		me.getView().detailViewAlias = 'app-vesselparticulardetail';
		
		me.openDetailPopup(selection);
	},
	
	onAdd: function() {
		var me = this;
		var refs = me.getReferences();
		var selection = Ext.create('MOST.model.document.VesselParticular');
		var agencyStore = me.getStore(me.AGENCY_CODE_STORE);
		
		selection.set('crud', 'C');
		
		agencyStore.load({
			params:{
				agencyCode : MOST.config.Token.getPtnrCode()
			},
			callback: function(record, ope, success){
    			if(success){
    				if(record.length > 0){
    					selection.set('saCorpId', MOST.config.Token.getPtnrCode());
    					selection.set('corpNm', record[0].data.corpNm);
    				    selection.set('shipLicense', record[0].data.shipLicense);
    				    selection.set('shipLicenseExprDt', record[0].data.shipLicenseExprDt);
    				}
    			}
    		}	
		});
		
		me.CURRENT_VIEW_TYPE = me.VIEW_TYPE_CREATE;
		me.getView().detailViewAlias = 'app-vesselparticulardetail';

		me.openDetailPopup(selection);
	},
	
	onRemove: function(){
    	var me = this;
    	var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var selection = grid.getSelection() === null ? null : grid.getSelection()[0];
		
		if(selection === null) return;

		if(selection.data.statCd != 'AP'){
			
			MessageUtil.question('remove', 'infodelete_msg', null,
					function(button){
				if (button === 'ok') {
					store.remove(selection);
					store.sync({
						success: function(){
							MessageUtil.saveSuccess();
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
	 * EVENT HANDLER DETAIl START
	 * =========================================================================================================================
	 */
	onDetailLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var vslTypeStore = me.getStore(me.VESSEL_TYPE_COMBO_STORE);
		var tradeStore = me.getStore(me.TRADE_COMBO_STORE);
		var shaStore = me.getStore(me.SHIPPING_AGENT_COMBO_STORE);
		var shpStore = me.getStore(me.SHIPPING_COMBO_STORE);
		var craneStore = me.getStore(me.CRANE_COMBO_STORE);
		var berthStore = me.getStore(me.BERTH_COMBO_STORE);
		var vslPartStore = me.getStore(me.DETAIL_STORE_NAME);
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var userType = MOST.config.Token.getUserType();
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.VESSEL_DESIGN_COMBOBOX, me.VESSEL_DESIGN_COMBO_STORE);
		me.setComboBoxWithLocalCache(CacheServiceConstants.VESSEL_TERM_COMBOBOX, me.VESSEL_TERM_COMBO_STORE);
		me.setComboBoxWithLocalCache(CacheServiceConstants.VESSEL_TRADE_COMBOBOX, me.VESSEL_TRADE_COMBO_STORE);
		
		me.updateViewStyle(me.getView());
		
		tradeStore.load();
		vslTypeStore.load();
		shaStore.load();
		shpStore.load();

		if(me.CURRENT_VIEW_TYPE ==  me.VIEW_TYPE_CREATE){
			me.getViewModel().setData({vslPapticular:recvData});
			refs.txtId.setEditable(true);
			refs.refBtnApproved.setHidden(true);
		}else{
			vslPartStore.load({
				params:{
					vslCd: recvData.data.vslCd
				},
				callback: function(records, oper, success){
					if(success){
						var model = records[0];
						
						if(me.CURRENT_VIEW_TYPE == me.VIEW_TYPE_COPY){
							model.set('vslCd', '');
							model.set('vslCustCd', '');
							model.set('statCd', 'RJ');
							model.phantom = true;
							
							refs.txtId.setEditable(true);
						}else{
							refs.txtId.setEditable(false);
						}
						
						me.getViewModel().setData({vslPapticular:model});
						detailView.items.get(0).vslCd = model.get('vslCd');
						refs.ctlDateLaunch.setValue(records[0].data.launchDt);
						refs.ctlDtReg.setValue(records[0].data.regDt);
						refs.ctlExpiryDate.setValue(records[0].data.isscExprDt);

						if(MOST.config.Token.getUserType() == CodeConstants.USER_TYPE_EXTERNAL){
							refs.refBtnApproved.setHidden(true);
							
							if(model.get('statCd') == CodeConstants.MT_DOCSTAT_AP){
								me.setComponentDisable(true);
							}
						} else {
							me.setComponentDisable(false);
							
							if(model.get('statCd') == CodeConstants.MT_DOCSTAT_AP){
								refs.refBtnApproved.setHidden(true);
							}
						}
					}
				}
			});
		}	
		
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection != null){
			if(selection.data.vslTp == 'Barge'){
				refs.txtCallSign.setAllowBlank(true);
				refs.txtPortReg.setAllowBlank(true);
				refs.txtImoNo.setAllowBlank(true);
				refs.cboAgencyCode.setAllowBlank(true);
				refs.txtName.setAllowBlank(true);
			}else{
				refs.txtCallSign.setAllowBlank(false);
				refs.txtPortReg.setAllowBlank(false);
				refs.txtImoNo.setAllowBlank(false);
				refs.cboAgencyCode.setAllowBlank(false);
				refs.txtName.setAllowBlank(false);
			}	
		}
		
		var infoForm = detailView.down('form').getForm();
		infoForm.isValid();
	},
	
	onChangeDateField: function(){
		var me = this;
		var refs = me.getReferences();
		
		if(refs.ctlDateLaunch.isDirty() == true){			
			refs.ctlDateLaunch.setBind(false);
		}
		if(refs.ctlDtReg.isDirty() == true){			
			refs.ctlDtReg.setBind(false);
		}
		if(refs.ctlExpiryDate.isDirty() == true){			
			refs.ctlExpiryDate.setBind(false);
		}
	},
	
	openFlagPopup:function(){
		var me = this;
		var refs = me.getReferences();
		var params = {};
		
		me.openCodePopup('popup-countrycodepopup', 'txtFlag',params);
	},
	
	openPortRegPopup:function(){
		var me = this;
		var refs = me.getReferences();
		var params = {};
		
		me.openCodePopup('popup-portpopup', 'txtPortReg',params);
	},
	
	onDetailSave: function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var infoForm = detailView.down('form').getForm();
		var detailStore = me.getStore('vslPartDetail');
		var date = new Date();
		var validateStore = me.getStore('validateForMQ');
		var curYear = date.getFullYear();
		var recvData = detailView.items.get(0).recvData;
		var shpNo = refs.txtShpOfNo.getValue();
		var imono = refs.txtImoNo.getValue();
		var callSgn = refs.txtCallSign.getValue();
		var isscExpiryDt = refs.ctlExpiryDate.getValue();
		var model = me.getViewModel().getData().vslPapticular;
		
		if(curYear < Ext.Number.parseInt(refs.txtYearBuild.getValue())){
			MessageUtil.alert('Warning', 'buildYear_msg');
			return;
		}
		
		if(date < model.get('launchDt')){
			MessageUtil.alert('Warning', 'launchedt_msg');
			return;
		}
		
		if(date > isscExpiryDt){
			MessageUtil.alert('Warning', 'isscExpired_msg');
		}
		
		if(infoForm.isValid()){
			if (recvData.get('crud') == 'C') {
				var stt = 'true';
			
				validateStore.load({
					params :{
						shipOffNo: shpNo,
						imoNo: imono,
						callSign: callSgn
					},
					callback: function(records, ope, success){
						if(success){
							var tmp = records[0].get('countChk');
							var msg = '';
							
							switch(tmp){
								case '14': 
									msg = 'IMO No and Call Sign and Ship Official';
									stt = 'false';
									break;
								case '12': 
									msg = 'Call Sign and Ship Official';
									stt = 'false';
									break;
								case '10': 
									msg = 'IMO No and Ship Official';
									stt = 'false';
									break;
								case '8': 
									msg = 'Ship Official';
									stt = 'false';
									break;	
								case '6': 
									msg = 'IMO No and Call Sign';
									stt = 'false';
									break;
								case '4': 
									msg = 'Call Sign';
									stt = 'false';
									break;
								case '2': 
									msg = 'IMO No';
									stt = 'false';
									break;
							}
							
							if(stt == 'false'){
								MessageUtil.alert('warning', 'validateMQ_msg', msg);
								return false;
							}else{
								var model = me.getViewModel().getData().vslPapticular;
								var launchDt = refs.ctlDateLaunch.getValue();
								var launchDtString = launchDt==null?null:Ext.Date.format(launchDt, MOST.config.Locale.getShortDate());
								var expiryDate =refs.ctlExpiryDate.getValue();
								var expiryDateString = expiryDate==null?null:Ext.Date.format(expiryDate, MOST.config.Locale.getShortDate());
								var dtReg = refs.ctlDtReg.getValue();
								var dtRegString = dtReg==null?null:Ext.Date.format(dtReg, MOST.config.Locale.getShortDate());

								model.set('complantYn', refs.rdISPSCompliant.getValue().rbISPS);
								model.set('domYn', refs.rdVSlSrvType.getValue().rbSrvType);
								model.set('craneYn', refs.rdCrane.getValue().rbCrane);
								
								model.set('saCorpId', refs.cboAgencyCode.getSelection() ? refs.cboAgencyCode.getSelection().data.cdNm: '');
								
								model.set('launchDt', launchDtString);
								model.set('isscExprDt', expiryDateString);
								model.set('regDt', dtRegString);
								model.set('check', false);
								model.set('updUserId', MOST.config.Token.getUserId());
								
								detailView.items.get(0).vslCd = model.get('vslCd');
								detailStore.insert(0, model);
								
								me.saveProcess(detailStore, detailView);
							}
						}
					}
				});
			} else if (recvData.get('crud') == 'U'){
				var model = me.getViewModel().getData().vslPapticular;
				var launchDt = refs.ctlDateLaunch.getValue();;
				var launchDtString = launchDt==null?null:Ext.Date.format(launchDt, MOST.config.Locale.getShortDate());
				var expiryDate = refs.ctlExpiryDate.getValue();
				var expiryDateString = expiryDate==null?null:Ext.Date.format(expiryDate, MOST.config.Locale.getShortDate());
				var dtReg = dtReg = refs.ctlDtReg.getValue();
				var dtRegString = dtReg==null?null:Ext.Date.format(dtReg, MOST.config.Locale.getShortDate());

				model.set('complantYn', refs.rdISPSCompliant.getValue().rbISPS);
				model.set('domYn', refs.rdVSlSrvType.getValue().rbSrvType);
				model.set('craneYn', refs.rdCrane.getValue().rbCrane);
				model.set('saCorpId', refs.cboAgencyCode.getSelection() ? refs.cboAgencyCode.getSelection().data.cdNm: '');
				
				model.set('launchDt', launchDtString);
				model.set('isscExprDt', expiryDateString);
				model.set('regDt', dtRegString);
				model.set('check', false);
				model.set('updUserId', MOST.config.Token.getUserId());
				
				me.saveProcess(detailStore,detailView);
			}
		}else{
			MessageUtil.mandatoryFieldInValid();
		}
	},
	
	saveProcess: function(detailStore, view) {
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var userType = MOST.config.Token.getUserType();
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		var model = me.getViewModel().getData().vslPapticular;
		var isCreated = recvData.phantom;
		
		if (recvData == null) {
			return;
		}else{
			recvData.dirty = false;
			recvData.previousValues = null;
		}
		
		updateParm.getProxy().url = detailStore.getProxy().url;
		updateParm.phantom = isCreated;
		updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		updateParm.set('item', model.data);
		
		updateParm.save({
			success : function(records,success){
	    		detailStore.load({
	    			params: {
	    				'vslCd' : view.items.get(0).vslCd
	    			},
					callback: function(records, operation, success) {
						if(success){
							var model = records[0];
							me.getViewModel().setData({vslPapticular: model});
						}
					}
	    		});
	    		
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
	
	selectSha: function( newValue, oldValue, eOpts ){
		var me = this;
		var refs = me.getReferences();
		var shpStore = me.getStore('shpCombo');
		var sumStr = refs.cboAgencyCode.getValue();
		var str = sumStr.split('^');
		
		if(str.length>1){
			refs.txtName.setValue(str[1]);
			refs.cboAgencyCode.setValue(str[0]);
			shpStore.load({
				params:{
					agencyCode: refs.cboAgencyCode.getValue()
				}
			})
		}
	},
	
	onValidate: function(){
		var me = this;
		var refs = me.getReferences();
		var model = me.getViewModel().get('vslPapticular');
		var id = model.get('vslCd');
		var vslNm = model.get('vslNm');
		var vslSrvType = model.get('domYn');
		var ybuild = model.get('ldYear');
		var flag = model.get('vslFlagCd');
		var pReg = model.get('vslRegPort');
		var shpNo = model.get('shipOfficialNo');
		var imono = model.get('imoNo');
		var callSgn = model.get('callSign');
		var vslTp = model.get('vslTp');
		var agenCd = model.get('saCorpId');
		var loa = model.get('loa');
		var nrt = model.get('nrt');
		var grt = model.get('grt');
		
		if(StringUtil.isNullorEmpty(id)){
			MessageUtil.alert('warning', 'id_empty_msg');
			return false;
		}	
		
		if(StringUtil.isNullorEmpty(vslNm)){
			MessageUtil.alert('warning', 'name_empty_msg');
			return false;
		}
		
		if(StringUtil.isNullorEmpty(flag)){
			MessageUtil.alert('warning', 'flag_empty_msg');
			return false;
		}
		
		if(StringUtil.isNullorEmpty(callSgn)){
			MessageUtil.alert('warning', 'callsign_empty_msg');
			return false;
		}
		
		if(StringUtil.isNullorEmpty(vslTp)){
			MessageUtil.alert('warning', 'vesseltype_empty_msg');
			return false;
		}
		
		if(StringUtil.isNullorEmpty(agenCd)){
			MessageUtil.alert('warning', 'agencycode_empty_msg');
			return false;
		}
		
		if(StringUtil.isNullorEmpty(loa)){
			MessageUtil.alert('warning', 'loa_empty_msg');
			return false;
		}
		
		if(StringUtil.isNullorEmpty(nrt)){
			MessageUtil.alert('warning', 'nrt_empty_msg');
			return false;
		}
		
		if(StringUtil.isNullorEmpty(grt)){
			MessageUtil.alert('warning', 'grt_empty_msg');
			return false;
		}
		
		var stt = me.onValidateForMQ(imono, callSgn, shpNo);
		
		if(stt == false){
			return stt;
		}else{
			return true;
		}
	},
	
	onConfirm: function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var refs = me.getReferences();
		var detailStore = me.getStore('vslPartDetail');
		var launchDt = refs.ctlDateLaunch.getValue();
		var launchDtString = launchDt==null?null:Ext.Date.format(launchDt, MOST.config.Locale.getShortDate());
		var expiryDate = refs.ctlExpiryDate.getValue();
		var expiryDateString = expiryDate==null?null:Ext.Date.format(expiryDate, MOST.config.Locale.getShortDate());
		var dtReg = refs.ctlDtReg.getValue();
		var dtRegString = dtReg==null?null:Ext.Date.format(dtReg, MOST.config.Locale.getShortDate());
		
		detailView.items.get(0).recvData.phantom = false;
		
		model = detailStore.findRecord('vslCd', refs.txtId.getValue());
		model.set('launchDt', launchDtString);
		model.set('isscExprDt', expiryDateString);
		model.set('regDt', dtRegString);
		model.set('complantYn', refs.rdISPSCompliant.getValue().rbISPS);
		model.set('domYn', refs.rdVSlSrvType.getValue().rbSrvType);
		model.set('craneYn', refs.rdCrane.getValue().rbCrane);
		model.set('saCorpId', refs.cboAgencyCode.getSelection() ? refs.cboAgencyCode.getSelection().data.cdNm: '');
		model.set('check', 'Y');
		model.set('statCd', 'AP');
		model.set('updUserId', MOST.config.Token.getUserId());
		
		me.saveProcess(detailStore, detailView);
	},
	
	onSelectVslType: function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var infoForm = detailView.down('form').getForm();
		
		if(refs.cboVslType.getValue() == 'BRGE'){
			refs.txtCallSign.setAllowBlank(true);
			refs.txtPortReg.setAllowBlank(true);
			refs.txtImoNo.setAllowBlank(true);
			refs.cboAgencyCode.setAllowBlank(true);
			refs.txtName.setAllowBlank(true);
		}else{
			refs.txtCallSign.setAllowBlank(false);
			refs.txtPortReg.setAllowBlank(false);
			refs.txtImoNo.setAllowBlank(false);
			refs.cboAgencyCode.setAllowBlank(false);
			refs.txtName.setAllowBlank(false);
		}
		
		infoForm.isValid();
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
		var vslNm = searchParm.data.vslNm;
     	var confirm = searchParm.data.confCk;
		var shpOfNo = searchParm.data.shipOffNo;
     	var imo = searchParm.data.imoNo;
     	var ptnrCode = MOST.config.Token.getPtnrCode();
     	
     	searchParm.set('sdt', me.lookupReference('ctlDateFromDt').getValue());
		searchParm.set('edt', me.lookupReference('ctlDateToDt').getValue());
		
     	var formDate = searchParm.data.sdt;
     	var toDate = searchParm.data.edt;
     	
     	var fromString = formDate==null?null:Ext.Date.format(formDate, MOST.config.Locale.getShortDate());
     	var toString = toDate==null?null:Ext.Date.format(toDate, MOST.config.Locale.getShortDate());
     	
     	if(vslNm == "" && confirm == null && dateFrom == null && dateTo == null && shpOfNo == "" && imo == "" ){
     		MessageUtil.alert('Warning', 'checkJpvcdata');
			return;
     	}
     	
     	params['sdt'] = fromString;
     	params['edt'] = toString;
     	params['confCk'] = searchParm.data.confCk;
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
		var theVslPart = me.getViewModel().get('vslPapticular');
		
		if(targetControl == 'txtFlag'){ 
			theVslPart.set("vslFlagCd",returnValue.get("code"));
			theVslPart.set("cntyCd",returnValue.get("codeName"));
		}else if (targetControl === 'txtPortReg'){
			theVslPart.set("vslRegPort",returnValue.code);
		}
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
			refs.txtVesselCd.setValue('');
			
			return;
		} else {
			var store = me.getStore(me.VESSELID_DUPLICATE_CHECK_STORE);
			
			store.load({
				params : {
					vslCd : vslCd
				}, 
				callback: function(records, operation, success) {
					if (records.length == 0) {
						refs.txtVesselCd.setValue(vslCd);
					} else {
						if(me.CURRENT_VIEW_TYPE != me.VIEW_TYPE_UPDATE){
							MessageUtil.alert('warning', 'usedVesselId_msg');
							refs.txtId.setValue('');
							refs.txtVesselCd.setValue('');
							
							return;
						}
					}
				}
			});
		}
	},
	
	onCheckYearBuild : function() {
		var me = this;
		var refs = me.getReferences();
		var year = refs.txtYearBuild.getValue();
		var currentDate = new Date();
		
		if (year.length > 0 && year.length < 4) {
			MessageUtil.alert('warning', 'yearbuild_msg');
			refs.txtYearBuild.setValue('');
			
			return;
		} else if (year < (currentDate.getFullYear()-70)){
			MessageUtil.alert('warning', 'Built of year cannot be less than 70 years from now.');
			refs.txtYearBuild.setValue('');
			
			return;
		}
		else {
			
			
			if(year > currentDate.getFullYear()){
				MessageUtil.alert('warning', 'yearnotvalid_msg');
			    refs.txtYearBuild.setValue('');
			    
			    return;
			}
		}
	},
	
	createVslSch: function(){
		var me = this;
		var grid = me.lookupReference('refVesselParicularGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var vslCd = selection.data.vslCd;
		var status = selection.data.statCd;
		var vslPartStore = me.getStore(me.DETAIL_STORE_NAME);
		var vslParticalar = null;
		var vslSchlItem = Ext.create('MOST.model.document.VesselScheduleRegister');
		var store = this.getStore(me.VESSELID_DUPLICATE_CHECK_STORE);

		if(selection == null){
			MessageUtil.alert('Warning', 'notSelectVslPart_msg');
			return;
		}
		
		if(status != 'AP'){
			Ext.Msg.alert('Warning', 'The selected vessel is not approved.');
			return;
		} 
		
		vslPartStore.load({
			params:{
				vslCd: vslCd
			},
			callback: function(records, oper, success){
				if(success){
					var model = records[0];

					vslSchlItem.set('vslPartiItem', model.data);
					vslSchlItem.set('vslCd', vslCd);
					vslSchlItem.set('arrvSaId', model.get('saCorpId'));
					vslSchlItem.set('deprSaId', model.get('saCorpId'));
					vslSchlItem.set('saNm', model.get('corpNm'));
					vslSchlItem.set('crud', 'C');
					
					store.load({
						params: {
							vslCd: vslCd
						},
						callback: function(records, operation, success) {
							var blackVsl = records[0].data.blackVsl;
							var blackCountry = records[0].data.blackCountry;
							
							if(blackVsl > 0){
								Ext.Msg.alert('Warning', 'It is not possible to create Vessel Notification because this vessel has been in black listed vessel.\nPlease contact to System Administrator.');
								return;
							}
							
							if(blackCountry > 0){
								Ext.Msg.alert('Warning', 'This Country is in black list. Please contact to System Administrator.');
								return;
							}
							
							me.getView().detailViewAlias = 'app-vesselschedulevcsdetailinparticular';
							me.openDetailPopup(vslSchlItem, "app-vesselschedulevcsdetailinparticular");
						}
					});
				}
			}
		});
	},
	
	onValidateForMQ: function(imoNo, callSign, ShipOffNo){
		var me = this;
		var validateStore = me.getStore(me.VALIDATE_MQ_STORE);
		var stt = 'true';
		
		validateStore.load({
			params :{
				shipOffNo: ShipOffNo,
				imoNo: imoNo,
				callSign: callSign
			},
			callback: function(records, ope, success){
				if(success){
					var tmp = records[0].get('countChk');
					var msg = '';
					
					switch(tmp){
						case '14': 
							msg = 'IMO No and Call Sign and Ship Official';
							stt = 'false';
							break;
						case '12': 
							msg = 'Call Sign and Ship Official';
							stt = 'false';
							break;
						case '10': 
							msg = 'IMO No and Ship Official';
							stt = 'false';
							break;
						case '8': 
							msg = 'Ship Official';
							stt = 'false';
							break;	
						case '6': 
							msg = 'IMO No and Call Sign';
							stt = 'false';
							break;
						case '4': 
							msg = 'Call Sign';
							stt = 'false';
							break;
						case '2': 
							msg = 'IMO No';
							stt = 'false';
							break;
					}
					
					if(stt == 'false'){
						MessageUtil.alert('warning', 'validateMQ_msg', msg);
						me.IS_DUPLICATE = 'true';
					}
				}
			}
		});
		
		return stt;
	},
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var refs = me.getReferences();
		var searchBizParm = me.getSearchCondition();
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.document.SearchVesselParticularParm';
		searchBizParm.serviceID = 'MOST.vesselParticular.selectVesselParticularList'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
	
	setComponentDisable: function(value){
		var me = this;
		var refs = me.getReferences();
		var vslTypeStore = me.getStore(me.VESSEL_TYPE_COMBO_STORE);
		var tradeStore = me.getStore(me.TRADE_COMBO_STORE);
		var vslDesignStore = me.getStore(me.VESSEL_DESIGN_COMBO_STORE);
		var shaStore = me.getStore(me.SHIPPING_AGENT_COMBO_STORE);
		var shpLineStore = me.getStore(me.SHIPPING_COMBO_STORE);
		var vslTermStore = me.getStore(me.VESSEL_TERM_COMBO_STORE);
		var vslTradeStore = me.getStore(me.VESSEL_TRADE_COMBO_STORE);

		if(value){
			vslTypeStore.removeAll();
			tradeStore.removeAll();
			vslDesignStore.removeAll();
			shaStore.removeAll();
			shpLineStore.removeAll();
			vslTermStore.removeAll();
			vslTradeStore.removeAll();
		}
		
		
		
		refs.ctlDateLaunch.setDisabledDates(value);
		refs.ctlDtReg.setDisabledDates(value);

		refs.rdVSlSrvType.setDisabled(value);
		refs.rdISPSCompliant.setDisabled(value);
		refs.rdCrane.setDisabled(value);
		
		refs.ctlOpenFlagPopupButton.setDisabled(value);
		refs.ctlOpenPortRegPopupButton.setDisabled(value);
		
		refs.txtId.setReadOnly(value);
		refs.txtVslNm.setReadOnly(value);
		refs.txtYearBuild.setReadOnly(value);
		refs.txtShpOfNo.setReadOnly(value);
		refs.txtCallSign.setReadOnly(value);
		refs.txtCountry.setReadOnly(value);
		refs.txtVesselCd.setReadOnly(value);
		refs.txtImoNo.setReadOnly(value);
		refs.txtName.setReadOnly(value);
		refs.txtCustomsSACode.setReadOnly(value);
		refs.ctlExpiryDate.setReadOnly(value);
		refs.txtMMSI.setReadOnly(value);
		refs.txtLoa.setReadOnly(value);
		refs.txtLBP.setReadOnly(value);
		refs.txtTopTierHeight.setReadOnly(value);
		refs.txtBreadth.setReadOnly(value);
		refs.txtDepth.setReadOnly(value);
		refs.txtAntenna.setReadOnly(value);
		refs.txtDHStern.setReadOnly(value);
		refs.txtDHBow.setReadOnly(value);
		refs.txtOutreach.setReadOnly(value);
		refs.txtNRT.setReadOnly(value);
		refs.txtGRT.setReadOnly(value);
		refs.txtBale.setReadOnly(value);
		refs.txtSummerDraught.setReadOnly(value);
		refs.txtDWT.setReadOnly(value);
		refs.txtGrain.setReadOnly(value);
		refs.txtBHP.setReadOnly(value);
		refs.txtDisplacement.setReadOnly(value);
		refs.txtSpeed.setReadOnly(value);
		refs.txtMaxTEU.setReadOnly(value);
		refs.txtHatchQty.setReadOnly(value);
		refs.txtMxRowsDeck.setReadOnly(value);
		refs.txtMxRowsHold.setReadOnly(value);
	}
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	/**
	 * Vessel Schedule Detail Start
	 * =========================================================================================================================
	 */
	
	/**
	 * Vessel Schedule Detail END
	 * =========================================================================================================================
	 */
});