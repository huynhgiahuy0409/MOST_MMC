Ext.define('MOST.view.document.TruckAssignmentController', {
    extend: 'MOST.view.foundation.BaseViewController',
    requires: [
           	],
    alias: 'controller.truckAssignment',
    
    listen: {
        controller: {
            '*': {
            	onRedirectTruckAssignment: 'onRedirectTruckAssignment'
            }
        }
    },
    
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
    MAIN_GRID_REF_NAME : 'refTruckAssignmentGrid', 	// Main Grid Name
	MAIN_STORE_NAME : 'LorryAssignmentGridList', 	// Main Store Name
	
	DETAIL_GRID_FILEUPLOAD_NAME: 'refPermitCertificateUploadGrid',
	DETAIL_STORE_FILEUPLOAD_NAME: 'permitCertificateUpload',
	RORO_GRID_REF_NAME: 'refTruckAssignmentOfROROGrid',
    RORO_STORE_NAME: 'truckAssignmentOfROROList',
	
    authority: '',
    
	lorryNo: {},
	cudFlag: '',
	recvFlag: false,
	recvObj: null,
	
	PDF_FILE: 'RCS019.jrxml',
	PDF_FUNCTION: 'MOST.documentReport.previewInternalMovementTicket',
    /**
     * CONSTANT END
     * =========================================================================================================================
     */
    
    /**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
    onLoad : function() {
		var me = this;
		var refs = me.getReferences();
		
		if(MOST.config.Token.getUserType() === CONSTANTS.USER_TYPE_EXTERNAL){
			if(me.existsPatnerType(CodeConstants.CM_PTNRTP_SHA)){
				me.authority = 'SHA';
			} 
			if (me.existsPatnerType(CodeConstants.CM_PTNRTP_CNS)){
				me.authority = 'CNS';
			} 
			if(me.existsPatnerType(CodeConstants.CM_PTNRTP_FWD)){
				me.authority = 'FWD';
			} 
			if(me.existsPatnerType(CodeConstants.CM_PTNRTP_SHA) && me.existsPatnerType(CodeConstants.CM_PTNRTP_FWD)){
				me.authority = 'BH';
			}
		}
		
		var store = me.getStore(me.MAIN_STORE_NAME);
		store.loadData([],false);
		
		var searchParm = Ext.create('MOST.model.document.SearchTruckAssignmentParm');
		var recvData = me.getView().recvData;
		
		if(refs.refSpecialPermissionChk.getValue() == true){
			refs.refBtnAddFile.setDisabled(false);
			refs.refBtnRemoveFile.setDisabled(false);
		}else{
			refs.refBtnAddFile.setDisabled(true);
			refs.refBtnRemoveFile.setDisabled(true);
		}
		
		if(recvData){
			me.recvObj = recvData;
			me.recvFlag = true;
			
			searchParm.data.vslCallId = recvData.get('vslCallId');
			searchParm.data.mfDocId = recvData.get('mfdocid');
			searchParm.data.blNo = recvData.get('blno');
			searchParm.data.shipgNoteNo = recvData.get('shipgNoteNo');
			searchParm.data.subDoNo = recvData.get('sdono');
			searchParm.data.grNo = recvData.get('gdsRecvNo');
		}
		
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		me.getViewModel().setData({theLorryAssignment:Ext.create('MOST.model.document.TruckAssignment')});
		
		if(MOST.config.Token.getUserType() === CONSTANTS.USER_TYPE_INTERNAL){
			refs.ctlAllowWgtVal.setReadOnly(false);
			refs.rdTruckMode.setHidden(false);
			refs.rdTruckMode.setValue({truckMode: 'E'});
		}
		else {
			refs.rdTruckMode.setValue({truckMode: 'E'});
		}
		
		if(recvData){
			refs.rdTruckMode.setValue({truckMode: 'E'});
			
			var theLorryAssignment = me.getViewModel().get('theLorryAssignment');
			
			theLorryAssignment.set('shipgNoteNo', recvData.get('shipgNoteNo'));
			theLorryAssignment.set('grNo', recvData.get('gdsRecvNo'));
			
			theLorryAssignment.set('blNo', recvData.get('blno'));
			theLorryAssignment.set('subDoNo', recvData.get('sdono'));
			
			me.setVesselData(recvData);
			me.getSnComboItems(recvData);
			me.getGrComboItems(recvData);
			
			//Fix Master BL combo had no data when load record from Delivery Order screen 
			me.getMasterBlComboItems(recvData);
			
			me.getBlComboItems(recvData);
			me.getSdoComboItems(recvData);
			
			//Fix wrong data of MT, M3, QTY fields when load from Goods Receipt Detail screen issue
			if(recvData.id.indexOf('GoodsReceipt') != -1){			
				if(recvData.get('delvTpCd') == 'I'){	
					theLorryAssignment.set('wgt', recvData.get('grWgt'));
					theLorryAssignment.set('vol', recvData.get('grMsrmt'));
					theLorryAssignment.set('pkgqty', recvData.get('grQty'));
					theLorryAssignment.set('imt', recvData.get('grWgt'));
					theLorryAssignment.set('im3', recvData.get('grMsrmt'));
					theLorryAssignment.set('iqty', recvData.get('grQty'));
					theLorryAssignment.set('dmt', '0');
					theLorryAssignment.set('dm3', '0');
					theLorryAssignment.set('dqty', '0');
				}

				if(recvData.get('delvTpCd') == 'D'){
					theLorryAssignment.set('wgt', recvData.get('grWgt'));
					theLorryAssignment.set('vol', recvData.get('grMsrmt'));
					theLorryAssignment.set('pkgqty', recvData.get('grQty'));
					theLorryAssignment.set('dmt', recvData.get('grWgt'));
					theLorryAssignment.set('dm3', recvData.get('grMsrmt'));
					theLorryAssignment.set('dqty', recvData.get('grQty'));
					theLorryAssignment.set('imt', '0');
					theLorryAssignment.set('im3', '0');
					theLorryAssignment.set('iqty', '0');
				}
			}
			
			if(recvData.id.indexOf('DeliveryOrder') != -1){
				if(recvData.get('delvTpCd') == 'D'){			
					theLorryAssignment.set('wgt', recvData.get('dmt'));
					theLorryAssignment.set('vol', recvData.get('dm3'));
					theLorryAssignment.set('pkgqty', recvData.get('dqty'));
					theLorryAssignment.set('dmt', recvData.get('dmt'));
					theLorryAssignment.set('dm3', recvData.get('dm3'));
					theLorryAssignment.set('dqty', recvData.get('dqty'));
					theLorryAssignment.set('imt', '0');
					theLorryAssignment.set('im3', '0');
					theLorryAssignment.set('iqty', '0');
				}
				
				if(recvData.get('delvTpCd') == 'I'){			
					theLorryAssignment.set('wgt', recvData.get('imt'));
					theLorryAssignment.set('vol', recvData.get('im3'));
					theLorryAssignment.set('pkgqty', recvData.get('iqty'));
					theLorryAssignment.set('imt', recvData.get('imt'));
					theLorryAssignment.set('im3', recvData.get('im3'));
					theLorryAssignment.set('iqty', recvData.get('iqty'));
					theLorryAssignment.set('dmt', '0');
					theLorryAssignment.set('dm3', '0');
					theLorryAssignment.set('dqty', '0');
				}
			}
			
			//Enable Add function when load from GR, SDO screen
			refs.refBtnCreate.setDisabled(false);
			me.onSearch();
		}
	},
    
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
    /**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	onRedirectTruckAssignment: function(detailItem){
		var me = this;
        
        me.getView().recvData = detailItem;
        me.onLoad();
	},
	
	onSearch: function() {
		var me = this;
		var refs = me.getReferences();
		var tabPanel = refs.ctlTruckAssignmentTabPanel.getActiveTab().name;
		
		switch(tabPanel){
			case 'general':
				me.searchGeneral();
				break;
			case 'roro':
				me.searchRoRo();
				break;
		}
		
		
	},
	
	searchGeneral:function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getViewModel().getStore(me.MAIN_STORE_NAME);
		store.loadData([],false);
		var params = me.getSearchCondition();
		var snNo = refs.ctlSNNo.getValue();
		var storeData = store.getData();
		var idx = 0;
		
		if(params == null){
			return;
		}
		//If do not load from DO and GR screen, reset data field when search
		if(me.getViewModel().get('theVslInfo') == null  || ((me.getViewModel().get('theVslInfo').id).indexOf('DeliveryOrder') == -1 && (me.getViewModel().get('theVslInfo').id).indexOf('GoodsReceipt') == -1)){
			me.getViewModel().setData({theLorryAssignment:null});
		}
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if(success){
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					}
					
					refs.ctlLorryNo.setValue("");
					refs.ctlDriverIC.setValue("");
					
					for(idx =0;idx < storeData.length;idx++ ){
						if(idx != (me.rowIndex)+1){
						}
					}
				}
			}
		});
	},
	
	searchRoRo:function(){
		var me = this;
		var store = me.getStore(me.RORO_STORE_NAME);
		var params = me.getSearchROROCondition();
		
		if (params == null) {
			return;
		}
		
		store.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					} else {
						me.getViewModel().setData({ theData: records });
					}
				}
			}
		});
	},
	
	getSearchROROCondition: function () {
		var me = this;
		var store = me.getStore(me.RORO_STORE_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		
		if(searchParm.get('shipgNoteNo') != null && searchParm.get('shipgNoteNo') != ''){
			params['catgCd'] = 'E';
		}
		if(searchParm.get('blNo') != null && searchParm.get('blNo') != ''){
			params['catgCd'] = 'I';
			params['mfDocId'] = searchParm.get('mfDocId');
		}
		params['vslCallId'] = StringUtil.toUpperCase(searchParm.get('vslCallId'));
		params['scn'] = StringUtil.toUpperCase(searchParm.get('scn'));
		params['shipgNoteNo'] = StringUtil.toUpperCase(searchParm.get('shipgNoteNo'));
		params['blNo'] = searchParm.get('blNo');
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;

		return params;
	},
	
	onRefresh:function(){
		var me = this;
		me.onClear();
	},
	
	onSave: function(){
		var me = this;
		var refs = me.getReferences();
		
		if (me.authority != '' && me.authority != CodeConstants.CM_PTNRTP_BH && me.authority != CodeConstants.CM_PTNRTP_FWD){
			MessageUtil.warning("truckAssignment", "truckAssignment_M010");
			return;
		}
		
		me.cudFlag = WorkingStatus.UPDATE;
		
		var gridStore = me.getViewModel().getStore(me.MAIN_STORE_NAME);
		
		var updateArr = new Array();
		
		gridStore.getModifiedRecords().forEach(function(record, index, array){
			if(!record.phantom){
				updateArr.push(record.data);
			}
		});
		
		me.onUploadSpecialPermission();
		//me.updateProcess();
	},
	
	onAdd:function(){
		var me = this;
		me.cudFlag = WorkingStatus.INSERT;
		var record = me.getViewModel().get("theLorryAssignment");
		record.set('truckMode', me.lookupReference('rdTruckMode').getValue().truckMode);

		if(!me.onDouplicatedRecordValidation(record)){
			return false;
		}
		
		if(!me.onMandantoryRecordValidation(record)){
			return false;
		}
		
		if(record.get('truckMode') == 'E') {
			if(Number(record.get('wgt')) >  Number(record.get('allowWgtVal'))){
				MessageUtil.warning("LorryAssignment", "truckAssignment_M004");
				return false;
			}
		}
		
		if(record.get('truckMode') == 'E'
			&& Number(record.get('allowWgt')) < Number(record.get('allowWgtVal'))) {
			MessageUtil.question('LorryAssignment', 'truckAssignment_M001', null, function(button) {
				if (button === 'ok') {
					var fileUploadStore = me.getStore(me.DETAIL_STORE_FILEUPLOAD_NAME);
					
					if(fileUploadStore.getData().length <= 0){
						MessageUtil.warning("LorryAssignment", "truckAssignment_M002");
						return false;
					} else {
						me.onUploadSpecialPermission();
					}
				}
			});
		} else {
			me.onUploadSpecialPermission();
		}
		
	},
	
	//Select SN combo
	onSelectSNNo: function(){
		var me = this;
		var refs = me.getReferences();
		var grListStore = me.getViewModel().getStore('goodsReceiptCombo');
		if(!StringUtil.isNullorEmpty(refs.ctlSNNo.getValue())){
			//me.getGrComboItems();
			var store = me.getViewModel().getStore('BLSNNoDetail');
			store.load({
				params: {
					searchType : 'chgBlNo',
					vslCallId : refs.ctlVslCallId.getValue(),
					shipgNoteNo : refs.ctlSNNo.getValue(),
					blNo: ''
				},
				
				callback:function(records,success){
					if (success) {
						if(records.length > 0) {
							me.onBindingDocumentInformation(records[0]);
							me.getGrComboItems();
						}
					}
				}
			});
			
			refs.ctlBlNo.setValue();
			refs.refDoNo.setValue();
			refs.ctlSubDoNo.setValue();
		}
		else {
			grListStore.loadData([],false);
			refs.ctlGR.reset();
		}
	},
	
	onSelectMasterBl: function(){
		var me = this;
		var refs = me.getReferences();
		var blCombo = me.getStore('blNoCombo');
		
		if((me.getViewModel().get('theVslInfo').id).indexOf('DeliveryOrder') != -1){
			refs.refSearchSnNo.setValue('');
			refs.refSearchGrNo.setValue('');
		}else{	
			refs.refSearchBlno.setValue('');
			refs.refSearchSDONo.setValue('');
			refs.refSearchSnNo.setValue('');
			refs.refSearchGrNo.setValue('');
		}
		
		blCombo.removeAll();
		
		blCombo.load({
			params:{
				vslCallId: refs.ctlVslCallId.getValue(),
//				mfDocNo: me.getViewModel().data.theSearch.data.mfDocId
				mfDocNo: refs.ctlMasterBlNo.getValue(),
			}
		});
	},
	
	onSelectBl: function(doNo){
		var me = this;
		var refs = me.getReferences();
		var sdoListStore = me.getViewModel().getStore('subDoCombo');
		
		if(!StringUtil.isNullorEmpty(refs.ctlBlNo.getValue())){
			//me.getSdoComboItems();
			
			if(typeof(doNo) != 'object'){	
				if(doNo != null && doNo != ""){
					refs.refDoNo.setValue(doNo);
				}
			}else {
				refs.refDoNo.setValue(refs.ctlBlNo.getSelection().get('doNo'));
			}
			
			var store = me.getViewModel().getStore('BLSNNoDetail');
			store.load({
				params: {
					searchType : 'chgBlNo',
					vslCallId : refs.ctlVslCallId.getValue(),
					blNo : refs.ctlBlNo.getValue(),
					shipgNoteNo: ''
				},
				
				callback:function(records,success){
					if (success) {
						if(records.length > 0) {
							/* Mantis: 166779
							me.getViewModel().setData({theLorryAssignment:records[0]});
							*/
							me.onBindingDocumentInformation(records[0]);
							me.getSdoComboItems();
						}
					}
				}
			});
			
			refs.ctlSNNo.setValue();
			refs.ctlGR.setValue();
		}
		else {
			sdoListStore.loadData([],false);
			refs.ctlSubDoNo.reset();
			refs.refDoNo.setValue();
		}
	},
	
	onSelectSDO: function(clt, record, eOpts ){
		var me = this;
		var refs = me.getReferences();
		var record = me.getViewModel().get("theLorryAssignment");
		var mainStore = me.getStore(me.MAIN_STORE_NAME);
		
		if(!StringUtil.isNullorEmpty(refs.ctlSubDoNo.getValue())){
			//binding data
			var selection = refs.ctlSubDoNo.getSelection();
			me.onBindingDocumentInformation(selection);
			//me.getViewModel().set('theLorryAssignment', selection.clone());
		}
		else {
			me.onBindingDocumentInformation(null);
			//me.getViewModel().set('theLorryAssignment', null);
		}
		
		mainStore.reload();
	},
	
	onSelectGR: function(clt, newValue, oldValue, eOpts ){
		var me = this;
		var refs = me.getReferences();

		if(!StringUtil.isNullorEmpty(refs.ctlGR.getValue())){
			//binding data
			var selection = refs.ctlGR.getSelection();
			me.onBindingDocumentInformation(selection);
			//me.getViewModel().set('theLorryAssignment', selection.clone());
		}
		else {
			me.onBindingDocumentInformation(null);
			//me.getViewModel().set('theLorryAssignment', null);
		}
	},
	
	onSelectGRFromGR: function(vslCallId, shipgNoteNo, grNo){
		var me = this;
		var refs = me.getReferences();
		var grDetailStore = me.getViewModel().getStore('GRNoDetail');
		
		grDetailStore.load({
			params: {
				vslCallId : vslCallId,
				shipgNoteNo : shipgNoteNo,
				grNo : grNo
			},
			
			callback:function(records,success){
				if (success && records.length > 0) {
					me.setDataBySN(records[0]);
				}
			}
		});
	},
	
	onCellClick:function(ctx, td, cellIndex, record, tr, rowIndex, e, eOpts){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) 
			return;
		
		me.rowIndex = rowIndex;
		me.oldLorryNo = selection.get('lorryNo')
		
		refs.ctlMasterBlNo.setDisabled(true);
		refs.ctlBlNo.setDisabled(true);
		refs.ctlSNNo.setDisabled(true);
		refs.ctlSubDoNo.setDisabled(true);
		refs.ctlGR.setDisabled(true);
		
		refs.refBtnCreate.setDisabled(true);
		//me.getViewModel().set('theLorryAssignment', selection.clone());
		me.getViewModel().set('theLorryAssignment', selection);
		refs.rdTruckMode.setValue({truckMode: selection.get('truckMode')});
		
		if((me.getViewModel().get('theLorryAssignment').get('mfDocId') == null || me.getViewModel().get('theLorryAssignment').get('mfDocId') == '') 
			&& (me.getViewModel().get('theLorryAssignment').get('masterBlNo') != null && me.getViewModel().get('theLorryAssignment').get('masterBlNo') != '')){
			me.getViewModel().get('theLorryAssignment').set('mfDocId', me.getViewModel().get('theLorryAssignment').get('masterBlNo'));
		}
		
		refs.ctlBlNo.setValue(me.getViewModel().get('theLorryAssignment').get('blNo'));
		
		if(refs.rdTruckMode.getValue().truckMode == 'E'){
			refs.refBtnAddFile.setDisabled(false);
			refs.refBtnRemoveFile.setDisabled(false);
			refs.refSpecialPermissionChk.setDisabled(false);
			
			refs.ctlSubDoNo.setDisabled(true);
			refs.ctlGR.setDisabled(true);
			
			if(refs.refSpecialPermissionChk.getValue() == true){
				refs.refBtnAddFile.setDisabled(false);
				refs.refBtnRemoveFile.setDisabled(false);
			}else{
				refs.refBtnAddFile.setDisabled(true);
				refs.refBtnRemoveFile.setDisabled(true);
			}
		}
		else {
			refs.refBtnAddFile.setDisabled(true);
			refs.refBtnRemoveFile.setDisabled(true);
			refs.refSpecialPermissionChk.setDisabled(true);
		}
		
		//Get Special Permission file
		me.onGetFileUpload(selection);
	},
	
	onChangeTruckMode: function (clt, newValue, oldValue, eOpts){
		var me = this;
		var refs = me.getReferences();
		var selection = me.lookupReference(me.MAIN_GRID_REF_NAME).getSelection();
		
		if(selection.length <= 0){
			refs.ctlLorryNo.setValue('');
			refs.ctlChassisNo.setValue('');
			refs.ctlDriverIC.setValue('');
		}
		
		if(refs.rdTruckMode.getValue().truckMode == 'E'){
			refs.refBtnAddFile.setDisabled(false);
			refs.refBtnRemoveFile.setDisabled(false);
			refs.refSpecialPermissionChk.setDisabled(false);
			
			refs.ctlSubDoNo.setDisabled(false);
			refs.ctlGR.setDisabled(false);
			
			refs.ctlAllowWgtVal.setReadOnly(false);
		}
		else {
			refs.refBtnAddFile.setDisabled(true);
			refs.refBtnRemoveFile.setDisabled(true);
			refs.refSpecialPermissionChk.setDisabled(true);
			
			refs.ctlSubDoNo.setDisabled(true);
			refs.ctlGR.setDisabled(true);
			refs.ctlSubDoNo.setValue();
			refs.ctlGR.setValue();
			
			refs.ctlAllowWgtVal.setReadOnly(true);
		}
		
		if(newValue != oldValue){
//			me.getViewModel().setData({theTruckInfo:null});
//			me.getViewModel().setData({theChassisInfo:null});
//			refs.ctlLorryNo.setValue();
//			refs.ctlChassisNo.setValue();
//			refs.ctlDriverIC.setValue();
		}
	},
	
	onPreview : function() {
		var me = this;
		var refs = me.getReferences();
		
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) 
			return;
		
		if(selection.get('truckMode') == 'E') {		
			var currDate = Ext.Date.format(new Date(),  'Y/m/d');
			
			if(selection.get('lorryRegValidDate')){			
				//Validate Truck is expired or not
				var truckRegValidDate = selection.get('lorryRegValidDate');
				var day = truckRegValidDate.substr(0,2);
				var month = truckRegValidDate.substr(3,2);
				var year = truckRegValidDate.substr(6,4);
				var truckRegValidDateCmp = year + '/' + month + '/' + day;
				
				if(currDate > truckRegValidDateCmp){
					MessageUtil.warning('fail_msg', "truckAssignment_M006", selection.get('lorryRegValidDate'));
					return;
				}
			}
			
			if(selection.get('chassisRegValidDate')){			
				//Validate Chassis is expired or not
				var chassisRegValidDate = selection.get('chassisRegValidDate');
				var dayChas = chassisRegValidDate.substr(0,2);
				var monthChas = chassisRegValidDate.substr(3,2);
				var yearChas = chassisRegValidDate.substr(6,4);
				var chassisRegValidDateCmp = yearChas + '/' + monthChas + '/' + dayChas;
				
				if(currDate > chassisRegValidDateCmp){
					MessageUtil.warning('fail_msg', "truckAssignment_M007", selection.get('chassisRegValidDate'));
					return;
				}
			}
		}
		
		if(selection.get('truckMode') == 'E') {
			if((!StringUtil.isNullorEmpty(selection.get('blNo')))){
				me.onTerminalHoldValidation();
			}
			else {
				me.openCodePopup('popup-imtreportpopup', 'IMTReportPopup', selection);
			}
		}
		else {
			me.onIssueImtReportOfInternalTruck();
		}
	},
	
	onTerminalHoldValidation : function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var detailItem = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(detailItem == null) 
			return;
		
		var store = me.getStore('validationCheck');
		store.load({
			params : {
				tyCd: 'OPE_TMNLHOLD_VALIDATION',
				col1: detailItem.get('vslCallId'),
				col2: detailItem.get('blNo'),
				col3: CodeConstants.TMNL_HOLD_IMT
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						if(records[0].get('isValidated') == 'N'){
							MessageUtil.warning('warning_msg', 'terminal_hold_msg');
							return false;
						}
						else {							
							if(Token.getCustomHoldChk() === 'Y' && detailItem.get('domesticChk') === 'N') {
								if(detailItem.get('customsReleasedYn') === 'Y'){
									me.openCodePopup('popup-imtreportpopup', 'IMTReportPopup', detailItem);
								}
								else {
									// NTH240709 - Skip the customs release check step.
									// MessageUtil.warning('warning_msg', 'customsCargoReleaseControl_release_msg');
									// return false;
									me.openCodePopup('popup-imtreportpopup', 'IMTReportPopup', detailItem);
								}
							}
							else {
								me.openCodePopup('popup-imtreportpopup', 'IMTReportPopup', detailItem);
							}
						}
					}
					else {
						if(Token.getCustomHoldChk() === 'Y') {
							if(detailItem.get('customsReleasedYn') === 'Y'){
								me.openCodePopup('popup-imtreportpopup', 'IMTReportPopup', detailItem);
							}
							else {
								// NTH240709 - Skip the customs release check step.
								// MessageUtil.warning('warning_msg', 'customsCargoReleaseControl_release_msg');
								// return false;
								me.openCodePopup('popup-imtreportpopup', 'IMTReportPopup', detailItem);
							}
						}
						else {
							me.openCodePopup('popup-imtreportpopup', 'IMTReportPopup', detailItem);
						}
					}				
				}
			}
		});
	},
	
	onIssueImtReportOfInternalTruck: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var detailItem = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(detailItem == null) 
			return;

		var searchParm = Ext.create("MOST.model.pdfprint.SearchReportBizParm");
		var params = me.createParam(searchParm, ['file','serviceId','param1']);
		
		params['file'] = me.PDF_FILE; // report format file name
		params['serviceId'] = me.PDF_FUNCTION; // calling function 
		params['branchCode'] = MOST.config.Token.getBranchCode(); // branch code fro multi db
		params['param1'] = detailItem.get("vslCallId"); //vessel call id
		params['param2'] = detailItem.get("seq"); //seq
		params['param3'] = detailItem.get("blNo");
		params['param4'] = detailItem.get("shipgNoteNo");
		params['param5'] = detailItem.get("grNo");
		params['param6'] = detailItem.get("subDoNo");
		params['param7'] = '';
		params['param8'] = '';
		params['param9'] = MOST.config.Token.getUserId(); //user Id
		params['param10'] = detailItem.get("truckMode");
		
		me.openPDFPreview(params);
	},
	
	onSendMessage: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selections = grid.getSelection() == null ? null : grid.getSelection();
		
		if(selections == null){
			return;
		} else {
			for(record of selections) {
				record.set('wbIfYn', 'Y');
			}
		}
		
		me.onSave();
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl === 'ctlVslCallId'){
			if(returnValue){
				me.clearDetail();
				me.setVesselData(returnValue.item);
				me.getMasterBlComboItems();
				me.getSnComboItems();
				me.getBlComboItems();
				
				refs.ctlScn.setValue(returnValue.item.get('scn'));
				
				//Sub DO/GR
				me.getSdoComboItems();
				me.getGrComboItems();
			} else {
				me.getViewModel().setData({theVslInfo:null});
				
				var blCombo = me.getStore('blNoCombo');
				var snCombo = me.getStore('shipgNoteCombo');
				
				blCombo.loadData([],false);
				snCombo.loadData([],false);
				
				refs.refSearchBlno.reset();
				refs.refSearchSnNo.reset();
				
				//Sub DO/GR
				var subDoCombo = me.getStore('subDoCombo');
				subDoCombo.loadData([],false);
				refs.ctlSubDoNo.reset();
				
				var goodsReceiptCombo = me.getStore('goodsReceiptCombo');
				goodsReceiptCombo.loadData([],false);
				refs.ctlGR.reset();
			}
		}else if(targetControl === 'ctlLorryNo'){ //Assign Lorry
			if(returnValue){
				//me.onValidation(returnValue);
				me.getViewModel().setData({theTruckInfo:returnValue.item});
				var theAssign = me.getViewModel().get("theLorryAssignment");
				theAssign.set('lorryNo', returnValue.code);
				theAssign.set('tsptr', returnValue.item.get('ptnrCode'));
			}else {
				me.getViewModel().setData({theTruckInfo:null});
				var theAssign = me.getViewModel().get("theLorryAssignment");
				
				theAssign.set("lorryNo",'');
			}
			me.setAllowableWeight();
		}else if(targetControl === 'ctlDriverIC'){ //Assign Driver
			if(returnValue){
				//Mantis: 0166780
				var licenseExpiredDay = Ext.Date.parse(returnValue.item.get('licenseExpired'), MOST.config.Locale.getShortDate());
				var today = new Date();
				if(today > licenseExpiredDay) {
					refs.ctlDriverIC.setValue('');
					MessageUtil.warning("warning", "truckAssignment_M009");
				} else {
					var theAssign = me.getViewModel().get("theLorryAssignment");
					theAssign.set('driverId', returnValue.code);
					theAssign.set('driverNm', returnValue.codeName);
				}
			} else {
				var theAssgin = me.getViewModel().get("theLorryAssignment");
				theAssgin.set("driverId",'');
			}
		}else if(targetControl === 'ctlChassisNo'){
			if(returnValue){
				me.getViewModel().setData({theChassisInfo:returnValue.item});
				var theAssgin = me.getViewModel().get("theLorryAssignment");
				
				theAssgin.set('chassisNo', returnValue.code);
			} else {
				me.getViewModel().setData({theChassisInfo:null});
				var theAssgin = me.getViewModel().get("theLorryAssignment");
			}
			me.setAllowableWeight();
		} else if(targetControl === 'ctlScn'){ 
			if(returnValue){
				refs.ctlScn.setValue(returnValue.code);

				if(!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))){
					refs.ctlVslCallId.setValue(returnValue.item.get('vslCallId'));
					me.getViewModel().setData({theVslInfo:returnValue.item});
					
					me.clearDetail();
					me.setVesselData(returnValue.item);
					me.getMasterBlComboItems();
					me.getSnComboItems();
					me.getBlComboItems();
					
					//Sub DO/GR
					me.getSdoComboItems();
					me.getGrComboItems();
					
					me.onSearch();
				}else {
					refs.ctlVslCallId.setValue('');
					me.getViewModel().setData({theVslInfo:null});
				}
			} 
		}
	},
	
	clearDetail: function(){
		var me = this;
		var refs = me.getReferences();
		var gridStore = me.getViewModel().getStore(me.MAIN_STORE_NAME);
		var blStore = me.getViewModel().getStore('blNoCombo');
		var snStore = me.getViewModel().getStore('shipgNoteCombo');
		
		refs.refDoNo.setValue();
		gridStore.removeAll();
		blStore.removeAll();
		snStore.removeAll();
	},
	
	onSelectBLSNNo:function(ownObj){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		
		if(ownObj == refs.refSearchBlno){
			var sdoListStore = me.getViewModel().getStore('subDoCombo');
			
			sdoListStore.removeAll();
			
			sdoListStore.load({
				params:{
					vslCallId : refs.ctlVslCallId.getValue(),
					blNo : refs.refSearchBlno.getValue()
				}
			});
			
			if((me.getViewModel().get('theVslInfo').id).indexOf('DeliveryOrder') != -1){
				refs.refSearchSnNo.setValue('');
				refs.refSearchGrNo.setValue('');
			}else{				
				refs.refSearchSDONo.setValue("");
				refs.refSearchSnNo.setValue("");
				refs.refSearchGrNo.setValue("");
			}
		}else if(ownObj == refs.refSearchSnNo){
			var grListStore = me.getViewModel().getStore('goodsReceiptCombo');
			
			grListStore.removeAll();
			
			grListStore.load({
				params:{
					vslCallId : refs.ctlVslCallId.getValue(),
					shipgNoteNo : refs.refSearchSnNo.getValue()
				}
			});
			
			if((me.getViewModel().get('theVslInfo').id).indexOf('GoodsReceipt') != -1){
				refs.ctlSearchMasterBlNo.setValue("");
				refs.refSearchBlno.setValue("");
				refs.refSearchSDONo.setValue("");
			}else{				
				refs.ctlSearchMasterBlNo.setValue("");
				refs.refSearchBlno.setValue("");
				refs.refSearchSDONo.setValue("");
				refs.refSearchGrNo.setValue("");
			}		
		}
	},
	
	onSetBLSNNo:function(){
		var me = this;
		var refs = me.getReferences();
		var blSnNoStore = me.getViewModel().getStore('blNoCombo');
		var snNoStore = me.getViewModel().getStore('shipgNoteCombo');
		var theSearchDetail = me.getViewModel().get('theSearchDetail');
		var blNo = refs.ctlBlNo.getValue();
		
		if(theSearchDetail != null){
			var vslCallId = theSearchDetail.get("vslCallId");
			
			blSnNoStore.load({
				params: {
					vslCallId : vslCallId,
					searchType : 'sn/bl',
					ptnrCd: me.ptnrCd
				},
				
				callback:function(records,success){
					if (success) {
						blSnNoStore.setData(records[0].get("blItems"));
						snNoStore.setData(records[0].get("shippingNoteItems"));
						refs.ctlBlNo.setValue(blNo);
					}
				}
			});
		}
	},
	
	onUpdate:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refTruckAssignmentGrid;
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var store = me.getStore(me.MAIN_STORE_NAME);
		var blNo = refs.ctlBlNo.getValue();
		var shipgNoteNo = refs.ctlSNNo.getValue();
		
		if(selection == null) return;
		
		selection.set('crudState','U');
		
		if(selection.crudState == 'U'){
			var lorryNo = refs.ctlLorryNo.getValue();
			var driverId = refs.ctlDriverIC.getValue();
			var storeData = store.getData();
			var idx = 0;
			
			for(idx =0;idx < storeData.length;idx++ ){
				if(idx != me.rowIndex){
					
					if(blNo != '' && blNo != null){
						if(storeData.getAt(idx).get("lorryNo") == lorryNo && storeData.getAt(idx).get("blNo") == blNo){
							MessageUtil.warning("LorryAssignment", "LADuplicateBLLorryNo");
							return null;
						};
					}
					
					if(shipgNoteNo != '' && shipgNoteNo != null){
						if(storeData.getAt(idx).get("lorryNo") == lorryNo && storeData.getAt(idx).get("shipgNoteNo") == shipgNoteNo){
							MessageUtil.warning("LorryAssignment", "LADuplicateBLLorryNo");
							return null;
						};
					}
				}				
			}
			
			if(StringUtil.isNullorEmpty(selection.previousValues.lorryNo)){
				selection.set('lorryNo',lorryNo);
			} else {
				selection.set('lorryNo',selection.previousValues.lorryNo);
			}
			
            if(StringUtil.isNullorEmpty(selection.previousValues.driverId)){
				selection.set('driverId',driverId);
			} else {
				selection.set('driverId',selection.previousValues.driverId);
			}
            
			var proxy = selection.getProxy();
			proxy.url = store.getProxy().url;
			
			selection.save({
				success : function(){
					me.onSearch();
					MessageUtil.saveSuccess();
				}
			});
		}
	},

	openLorrysPopup:function(){
		var me = this;
		var refs = me.getReferences();
		var theLorryAssingment = me.getViewModel().get('theLorryAssignment')
		
		var validObj = me.validateDOorTransporter(theLorryAssingment);
		if(!validObj.valid){
			MessageUtil.info('Information', validObj.msg);
			return;
		}
		
		var ptnrCode = refs.ctlTransporter.getValue().toString();
		var params = {
			ptnrCode : refs.ctlTransporter.getValue(),
			vslCallId: '',
			shipgNoteNo: '',
			blNo: ''
		}
		
		if(me.lookupReference('rdTruckMode').getValue().truckMode == 'E'){
			me.openCodePopup('popup-externaltruckpopup', 'ctlLorryNo', params);
		}
		else {
			me.openCodePopup('popup-internaltruckpopup', 'ctlLorryNo', params);
		}
		
		//me.openCodePopup('popup-lorrysmultipopup', 'ctlLorryNo', params);
	},
	
	openDriversPopup: function(){
		var me = this;
		var refs = me.getReferences();
		var theLorryAssingment = me.getViewModel().get('theLorryAssignment')
		
		if(!refs.ctlBlNo.getValue() &&  !refs.ctlSNNo.getValue()){
			MessageUtil.info('Information', 'You have to select BL no. Or SN no.');
			return;
		}

		var validObj = me.validateDOorTransporter(theLorryAssingment);
		if(!validObj.valid){
			MessageUtil.info('Information', validObj.msg);
			return;
		}
		
		var ptnrCd = refs.ctlTransporter.getValue().toString();
		var params = {
				ptnrCd : refs.ctlTransporter.getValue(),
				vslCallId: '',
				shipgNoteNo: ''
		}
		
		me.openCodePopup('popup-driverlistpopup', 'ctlDriverIC', params);
	},
	
	openChassisPopup: function(){
		var me = this;
		var refs = me.getReferences();
		var theLorryAssignment = me.getViewModel().get("theLorryAssignment");
		
		var validObj = me.validateDOorTransporter(theLorryAssignment);
		if(!validObj.valid){
			MessageUtil.info('Information', validObj.msg);
			return;
		}
		
		
		var params = {
			ptnrCd : refs.ctlTransporter.getValue()
		}
		
		if(me.lookupReference('rdTruckMode').getValue().truckMode == 'E'){
			me.openCodePopup('popup-chassispopup', 'ctlChassisNo', params);
		}
		else {
			me.openCodePopup('popup-internalchassispopup', 'ctlChassisNo', params);
		}
		
		//me.openCodePopup('popup-chassismultipopup', 'ctlChassisNo', params);
	},
	
	onRemove:function(){
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME); 
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		
		if(!selection){
			MessageUtil.warning("LorryAssignment", "LASelectDelete");
			return;
		}
		
		MessageUtil.question('remove', 'infodelete_msg', null, function(button) {
			if (button === 'ok') {
				me.deleteProcess(selection);
			}
		});
	},
	
	//UPLOAD FUNCTION
	onPermitCertificateFileUploadAdd: function(btn, fileField) {
		var me = this;
		var refs = me.getReferences();
		var detailItem =  me.getViewModel().get("theLorryAssignment");
		var store = me.getStore(me.DETAIL_STORE_FILEUPLOAD_NAME);
    	var input = document.querySelector("input[id='permitCertificateUpload-button-fileInputEl']");

    	for(var i=0; i<input.files.length; i++){
    		var record = Ext.create('MOST.model.common.FileUpload');
    		file = input.files[i];
    		
    		var subDoNo = (detailItem.get('subDoNo') == undefined || StringUtil.isNullorEmpty(detailItem.get('subDoNo'))) ? "" : detailItem.get('subDoNo');
    		var grNo = (detailItem.get('grNo') == undefined || StringUtil.isNullorEmpty(detailItem.get('grNo'))) ? "" : detailItem.get('grNo');
    		
    		record.set('pgmId', FileConstant.TRUCKASSIGNMENT_SCREEN_PGM_ID);
    		record.set('catgCd', detailItem.get('vslCallId') + '/' + subDoNo + '/' + grNo);
    		record.set('fileStream', file);
    		record.set('fileName', file.name);
    		record.set('fileSize', file.size);
    		record.set('workingStatus', WorkingStatus.INSERT);
    		store.insert(0, record);
    	}
	},
	
	onPermitCertificateFileUploadRemove: function() {
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
		var detailItem =  me.getViewModel().get("theLorryAssignment");
		var grid = me.lookupReference(me.DETAIL_GRID_FILEUPLOAD_NAME);
		var store = me.getStore("permitCertificateDownload");	
		
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;

		var subDoNo = (detailItem.get('subDoNo') == undefined || StringUtil.isNullorEmpty(detailItem.get('subDoNo'))) ? "" : detailItem.get('subDoNo');
		var grNo = (detailItem.get('grNo') == undefined || StringUtil.isNullorEmpty(detailItem.get('grNo'))) ? "" : detailItem.get('grNo');
		
		store.load({
			params : {
				'pgmId' : FileConstant.TRUCKASSIGNMENT_SCREEN_PGM_ID,
				'catgCd' : detailItem.get('vslCallId') + '/' + subDoNo + '/' + grNo,
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
	
	onUploadSpecialPermission : function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.DETAIL_STORE_FILEUPLOAD_NAME);
		var frm = refs.fileForm;
    	var isFileUpload = false;
    	var lorryGrid = me.lookupReference(me.MAIN_GRID_REF_NAME);
    	var selection = lorryGrid.getSelection() == null ? null : lorryGrid.getSelection()[0];
    	
    	
    	var formData = new FormData(frm);
		
		store.getModifiedRecords().forEach(function(record, index, array){
			formData.append(record.data.fileName, record.data.fileStream);
			isFileUpload = true;
    	});
		
		if(selection != null){	
			if(Number(selection.data.allowWgtVal) < Number(refs.refWgt.getValue())
					&& selection.data.truckMode == 'E'
					&& (selection.data.permitYn != 'Y' || store.data.length <= 0)){
				MessageUtil.warning('warning_msg', 'truckAssignment_M004');
				return;
			}
		}
		
		if(isFileUpload){
			this.fileUpload(formData);
		} else {
			if(me.cudFlag == WorkingStatus.INSERT) {
				me.insertProcess();
			}
			else if(me.cudFlag == WorkingStatus.UPDATE) {
				me.updateProcess();
			}
			//me.saveProcess(); // SERVER SAVE
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
  
    			//me.saveProcess();
    			if(me.cudFlag == WorkingStatus.INSERT) {
    				me.insertProcess();
    			}
    			else if(me.cudFlag == WorkingStatus.UPDATE) {
    				me.updateProcess();
    			}
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
	
	onGetFileUpload: function(record) {
		var me = this;
		var fileUpload = me.getStore(me.DETAIL_STORE_FILEUPLOAD_NAME);
		
		var subDoNo = (record.get('subDoNo') == undefined || StringUtil.isNullorEmpty(record.get('subDoNo'))) ? "" : record.get('subDoNo');
		var grNo = (record.get('grNo') == undefined || StringUtil.isNullorEmpty(record.get('grNo'))) ? "" : record.get('grNo');
		
		fileUpload.load({
			params: {
				pgmId: FileConstant.TRUCKASSIGNMENT_SCREEN_PGM_ID,
				catgCd: record.get('vslCallId') + '/' + subDoNo + '/' + grNo
			},
			callback: function(records, operation, success) {
				if(success) {
				}
			}
		});
	},
	
	onValidation:function(lorryNo){
		var me = this;
		var refs = me.getReferences();
		var lorryNoArray = lorryNo.code.split(',');
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = grid.getStore();
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var params = me.getSearchCondition();
		var idx = 0;
		
		me.lorryNo = lorryNo;
		
		if(grid.getSelection() && grid.getSelection().length>0) {
			idx = store.indexOfId(grid.getSelection()[0].get('id'));
		}
		
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if(success){
					if (records && records.length > 0) {
						for(var i = 0; i< lorryNoArray.length; i++){
							var lorryNo = lorryNoArray[i];
							var snBlNo = refs.ctlBlNo.getValue();
							var shipNoteNo = refs.ctlSNNo.getValue();
							
							for(var j=0; j<records.length; j++){
								var assignedItem = records[j];
								
								if(assignedItem.data.blNo){
									if(assignedItem.data.blNo === snBlNo && assignedItem.data.lorryNo===lorryNo){
										MessageUtil.warning('ERROR', Ext.String.format('Duplicate B/L No and Lorry No({0}).', me.lorryNo));
										
										var shipNote = me.getViewModel().get("theLorryAssignment");
										
										refs.ctlLorryNo.setValue('');
										shipNote.reject();
										
										return;
									}
								}
								if(assignedItem.data.shipgNoteNo){
									if(assignedItem.data.shipgNoteNo === shipNoteNo && assignedItem.data.lorryNo===lorryNo){
										MessageUtil.warning('ERROR', Ext.String.format('Duplicate S/N No and Lorry No({0}).', me.lorryNo));
										
										var shipNote = me.getViewModel().get("theLorryAssignment");
										
										refs.ctlLorryNo.setValue('');
										shipNote.reject();
										
										return;
									}
								}
							
							}
						}
						
						me.processAssignTruckList(me.lorryNo);
						refs.ctlLorryNo.setValue('');
					} else {
						me.processAssignTruckList(me.lorryNo);
						refs.ctlLorryNo.setValue('');
					}
				}
			}
		});
	},
	
	openVslCallListPopup: function(){
    	var me = this;
		me.openCodePopup('popup-vesselcalllistpopup', 'ctlVslCallId');
    },
	
	onValidationDriver:function(driverId){
		var me = this;
		var refs = me.getReferences();
		var driverIdArray = driverId.split(',');
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = grid.getStore();
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var idx = 0;
		
		if(grid.getSelection() && grid.getSelection().length>0) {
			idx = store.indexOfId(grid.getSelection()[0].get('id'));
		}
		
		for(var i = 0; i< driverIdArray.length; i++){
			var driverId = driverIdArray[i];
			var snBlNo = refs.ctlBlNo.getValue();
			var shipNoteNo = refs.ctlSNNo.getValue();
			
			for(var j=0; j<grid.store.data.length; j++){
				var assignedItem = grid.store.data.items[j];
				
				if(assignedItem.data.blNo){
					if(assignedItem.data.blNo === snBlNo && assignedItem.data.driverId === driverId){
						MessageUtil.warning('ERROR', Ext.String.format('Duplicate B/L No and Drive Id({0}).', driverId));
						var shipNote = me.getViewModel().get("theLorryAssignment");
						refs.ctlLorryNo.setValue('');
						shipNote.reject();
						return;
					}
				}
				if(assignedItem.data.shipgNoteNo){
					if(assignedItem.data.shipgNoteNo === shipNoteNo && assignedItem.data.driverId === driverId){
						MessageUtil.warning('ERROR', Ext.String.format('Duplicate S/N No and Drive Id({0}).', driverId));
						var shipNote = me.getViewModel().get("theLorryAssignment");
						refs.ctlLorryNo.setValue('');
						shipNote.reject();
						return;
					}
				}
			}
		}
		
		return true;
	},
	
	onClear: function(){
		var me = this;
		var refs = me.getReferences();
		var theVslInfo = me.getViewModel().get('theVslInfo');
		var theLorryAssignment = me.getViewModel().get("theLorryAssignment");
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var theAssignment = Ext.create('MOST.model.document.TruckAssignment');
		var truckMode = refs.rdTruckMode.getValue().truckMode;
		me.getViewModel().setData({theLorryAssignment:theAssignment});
		
		//Fix error after click refresh button
		if(theLorryAssignment == null || theLorryAssignment == undefined){
			theLorryAssignment = me.getViewModel().get("theLorryAssignment");
		}
		
		if(theVslInfo) {
			theLorryAssignment.set("vslCallId", 	theVslInfo.get('vslCallId'));
			theLorryAssignment.set("vslCd", 		theVslInfo.get('vslCd'));
			theLorryAssignment.set("callYear", 		theVslInfo.get('callYear'));
			theLorryAssignment.set("callSeq", 		theVslInfo.get('callSeq'));
		}
		
		theLorryAssignment.set("userId", 		MOST.config.Token.getUserId());
		
		grid.setSelection(false);
		
		refs.ctlMasterBlNo.setDisabled(false);
		refs.ctlBlNo.setDisabled(false);
		refs.ctlSNNo.setDisabled(false);
		//sMantis: 0178236
		if(truckMode && truckMode == 'I') {
			refs.ctlSubDoNo.setDisabled(true);
			refs.ctlGR.setDisabled(true);
		} else {
			refs.ctlSubDoNo.setDisabled(false);
			refs.ctlGR.setDisabled(false);
		} 
		//eMantis: 0178236
		refs.refBtnCreate.setDisabled(false);
		
		refs.refSpecialPermissionChk.setValue(false);
		var uploadStore = me.getViewModel().getStore(me.DETAIL_STORE_FILEUPLOAD_NAME);
		uploadStore.removeAll();
		
		//Fix SN and BL combo in search field didn't refresh after click Refresh button
		refs.refSearchBlno.reset();
		refs.refSearchSnNo.reset();
		
		me.getViewModel().setData({theLorryAssignment:null});
		me.getViewModel().setData({theTruckInfo:null});
		me.getViewModel().setData({theChassisInfo:null});
		
		me.getViewModel().get('theSearch').set('mfDocId', '');
		me.getViewModel().get('theSearch').set('blNo', '');
		me.getViewModel().get('theSearch').set('shipgNoteNo', '');
		me.getViewModel().get('theSearch').set('subDoNo', '');
		me.getViewModel().get('theSearch').set('grNo', '');
	},
	
	onActiveOverloadBtn: function(){
		var me = this;
		var refs = me.getReferences();
		var theLorryAssignment = me.getViewModel().get("theLorryAssignment");
		
		refs.refOverLoadPermitBtn.setDisabled(true);
		
		if(theLorryAssignment.get('allowWgt') != theLorryAssignment.get('allowWgtVal')){
			refs.refOverLoadPermitBtn.setDisabled(false);
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
	onLoadFromGR: function(recvData){
		var me = this;
		var refs = me.getReferences();
		
		me.getViewModel().setData({theVslInfo:recvData});
		me.getViewModel().setData({theLorryAssignment:recvData});
		
		var theLorryAssignment = me.getViewModel().get('theLorryAssignment');
		var theVslInfo = me.getViewModel().get('theVslInfo');
	},
	
	processAssignDriver: function(returnValue){// One Driver
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getViewModel().getStore(me.MAIN_STORE_NAME);
		var theVslInfo = me.getViewModel().get('theVslInfo');
		var selection = grid.getSelection();

		if(grid.selection){
			var theSelectedRecord = selection[0];
			var theLorryAssignment = me.getViewModel().get("theLorryAssignment");
			var record = Ext.create('MOST.model.document.TruckAssignment');
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			
			theLorryAssignment.set("vslCallId", 	theVslInfo.get('vslCallId'));
			theLorryAssignment.set("vslCd", 		theVslInfo.get('vslCd'));
			theLorryAssignment.set("callYear", 		theVslInfo.get('callYear'));
			theLorryAssignment.set("callSeq", 		theVslInfo.get('callSeq'));
			theLorryAssignment.set("userId", 		MOST.config.Token.getUserId());
		} else if(!grid.selection) {
			var theLorryAssignment = me.getViewModel().get("theLorryAssignment");
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			
			theLorryAssignment.set("vslCallId", 	theVslInfo.get('vslCallId'));
			theLorryAssignment.set("vslCd", 		theVslInfo.get('vslCd'));
			theLorryAssignment.set("callYear", 		theVslInfo.get('callYear'));
			theLorryAssignment.set("callSeq", 		theVslInfo.get('callSeq'));
			theLorryAssignment.set("userId", 		MOST.config.Token.getUserId());
		}
	},

	processAssignTruckList: function(returnValue){//Assign many Truck per Doc
		var me = this;
		var refs = me.getReferences();
		var lorryNoArray = returnValue.code.split(',');
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getViewModel().getStore(me.MAIN_STORE_NAME);
		var theVslInfo = me.getViewModel().get('theVslInfo');
		var theLorryAssignment = me.getViewModel().get("theLorryAssignment");
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		var idx = 0;
		
		if(grid.getSelection() && grid.getSelection().length>0) {
			idx = store.indexOfId(grid.getSelection()[0].get('id'));
		}

		var arrItems = new Array();
		
		theLorryAssignment.set('lorryNo', returnValue.code);
		theLorryAssignment.set('allowWgt', parseInt(returnValue.item[0].allowWgt)*1.1);
		theLorryAssignment.set('allowWgtVal', parseInt(returnValue.item[0].allowWgt)*1.1);
	},
	
	setVesselData(vessel){
		var me = this;
		var refs = me.getReferences();
		
		me.getViewModel().setData({theVslInfo:vessel});
		
		var theVslInfo = me.getViewModel().get('theVslInfo');
		var theLorryAssignment = me.getViewModel().get("theLorryAssignment");
		
		if(!theLorryAssignment){
			var theAssignment = Ext.create('MOST.model.document.TruckAssignment');
			
			me.getViewModel().setData({theLorryAssignment:theAssignment});
			
			//Fix error when aftersetcodepopup data after click refresh button
			theLorryAssignment = me.getViewModel().get("theLorryAssignment");
		}
		
		theLorryAssignment.set("vslCallId", 	theVslInfo.get('vslCallId'));
		theLorryAssignment.set("vslCd", 		theVslInfo.get('vslCd'));
		theLorryAssignment.set("callYear", 		theVslInfo.get('callYear'));
		theLorryAssignment.set("callSeq", 		theVslInfo.get('callSeq'));
		theLorryAssignment.set("userId", 		MOST.config.Token.getUserId());
		theLorryAssignment.set("scn", 			theVslInfo.get('scn'));
	},
	
	getSnComboItems: function(obj){
		var me = this;
		var refs = me.getReferences();
		var theVslInfo = me.getViewModel().get('theVslInfo');
		var tabTitle = refs.ctlTruckAssignmentTabPanel.getActiveTab().title.trim();
		var tyCd='';
		switch (tabTitle) {
			case 'General Cargo':
				tyCd ='GC'
				break;
			case 'RORO Cargo':
				tyCd ='RR'
				break;
		}
		if(theVslInfo){
			var snCombo = me.getStore('shipgNoteCombo');
			
			snCombo.load({
				params : {
					vslCallId:theVslInfo.get('vslCallId'),
					tyCd	 : tyCd
				},
				callback: function(records, operation, success) {
					if (success) {
						if(obj && !StringUtil.isNullorEmpty(obj.get('shipgNoteNo'))){
							refs.refSearchSnNo.setValue(obj.get('shipgNoteNo'));
							me.onSelectSNNo(obj);
						}
					}
				}
			});
		}
	},
	
	getMasterBlComboItems: function(obj){
		var me = this;
		var refs = me.getReferences();
		var theVslInfo = me.getViewModel().get('theVslInfo');
		var masterBlCombo = me.getStore('masterBlCombo');
		var tabTitle = refs.ctlTruckAssignmentTabPanel.getActiveTab().title.trim();
		var tyCd='';
		switch (tabTitle) {
			case 'General Cargo':
				tyCd ='GC'
				break;
			case 'RORO Cargo':
				tyCd ='RR'
				break;
		}
		
		masterBlCombo.removeAll();
		
		if(theVslInfo){
			masterBlCombo.load({
				params : {
					vslCallId:theVslInfo.get('vslCallId'),
					tyCd	 : tyCd
				},
				callback:function(records, success){
					if (success) {
						if(obj && !StringUtil.isNullorEmpty(obj.get('mfdocid'))){
							me.onSelectMasterBl();
						}
					}
				}
			});
			
			if(obj && !StringUtil.isNullorEmpty(obj.get('mfdocid'))){
				me.getViewModel().get('theLorryAssignment').data.mfDocId = obj.get('mfdocid');
			}
		}
	},
	
	getBlComboItems: function(obj){
		var me = this;
		var refs = me.getReferences();
		var theVslInfo = me.getViewModel().get('theVslInfo');
		var blCombo = me.getStore('blNoCombo');
		var tabTitle = refs.ctlTruckAssignmentTabPanel.getActiveTab().title.trim();
		var tyCd='';
		switch (tabTitle) {
			case 'General Cargo':
				tyCd ='GC'
				break;
			case 'RORO Cargo':
				tyCd ='RR'
				break;
		}
		
		blCombo.removeAll();
		
		if(theVslInfo){
			blCombo.load({
				params : {
					vslCallId:theVslInfo.get('vslCallId'),
					tyCd	 : tyCd
				},
				callback:function(records, success){
					if (success) {
						if(obj && !StringUtil.isNullorEmpty(obj.get('blno'))){
							var doNo = obj.get('dono');
							me.onSelectBl(doNo);
						}
					}
				}
			});
		}
	},

	getGrComboItems: function(){
		var me = this;
		var refs = me.getReferences();
		var grListStore = me.getViewModel().getStore('goodsReceiptCombo');
		var vslCallId = refs.ctlVslCallId.getValue();
		var shipgNoteNo = refs.ctlSNNo.getValue();
		var tabTitle = refs.ctlTruckAssignmentTabPanel.getActiveTab().title.trim();
		var tyCd='';
		switch (tabTitle) {
			case 'General Cargo':
				tyCd ='GC'
				break;
			case 'RORO Cargo':
				tyCd ='RR'
				break;
		}
		
		if(me.recvFlag && me.recvObj) {
			vslCallId = me.recvObj.get('vslCallId');
			shipgNoteNo = me.recvObj.get('shipgNoteNo');
		}
		
		grListStore.load({
			params: {
				vslCallId : vslCallId,
				shipgNoteNo : shipgNoteNo,
				tyCd	 : tyCd
			},
			
			callback:function(records, success){
				if (success) {
					if(me.recvFlag 
							&& me.recvObj 
							&& !StringUtil.isNullorEmpty(me.recvObj.get('sdono'))){
						me.onSelectGR();
						me.recvFlag = false;
					}
				}
			}
		});
	},
	
	getGrComboItemsFromGR: function(vslCallId, shipgNoteNo){
		var me = this;
		var refs = me.getReferences();
		var grListStore = me.getViewModel().getStore('goodsReceiptCombo');
		
		grListStore.load({
			params: {
				vslCallId : vslCallId,
				shipgNoteNo : shipgNoteNo
			},
			callback:function(records, success){
				if (success) {
					if(records.length > 0){
						grListStore.insert(0, [{cdNm: 'Select',cd: ''}]);
					}
				}
			}
		});
	},
	
	getSdoComboItems: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getViewModel().getStore('subDoCombo');
		var vslCallId = refs.ctlVslCallId.getValue();
		var blNo = refs.ctlBlNo.getValue();
		var subDoNo;
		
		if(me.recvFlag && me.recvObj) {
			vslCallId = me.recvObj.get('vslCallId');
			blNo = me.recvObj.get('blno');
			subDoNo = me.recvObj.get('sdono');
		}
		
		store.removeAll();
		
		store.load({
			params: {
				vslCallId : vslCallId,
				blNo : blNo,
				subDoNo: subDoNo
			},
			
			callback:function(records, success){
				if (success) {
					if(me.recvFlag 
							&& me.recvObj 
							&& !StringUtil.isNullorEmpty(me.recvObj.get('sdono'))){
						me.onSelectSDO();
						me.recvFlag = false;
					}
				}
			}
		});
	},
	
	getSearchCondition : function() {
		var me = this;
		var refs = me.getReferences();
		var theSearch = me.getViewModel().get('theSearch');
		//var vslCallId = refs.ctlVslCallId.getValue();
		var vslCallId = theSearch.get('vslCallId');
		var scn = theSearch.get('scn');
		var blNo = theSearch.get('blNo');
		var shipgNoteNo = theSearch.get('shipgNoteNo');
		var truckMode = me.lookupReference('rdTruckMode').getValue().truckMode;
		var mfDocId = theSearch.get('mfDocId');
		var grNo = theSearch.get('grNo');
		var sdoNo = theSearch.get('subDoNo');
		var scn = theSearch.get('scn');
		
		//If do not load from DO and GR screen, validate vessel call id
		if(me.getViewModel().get('theVslInfo') == null || ((me.getViewModel().get('theVslInfo').id).indexOf('DeliveryOrder') == -1 && (me.getViewModel().get('theVslInfo').id).indexOf('GoodsReceipt') == -1)){
			if((scn == null || scn == '') && (vslCallId == null || vslCallId == "")){
				MessageUtil.warning("LorryAssignment", "goodsreceipt_search_null_msg");
				return;
			}
		}
		
		var params = {
			searchType : 'lorryLists',
			vslCallId : vslCallId,
			scn: scn,
			mfDocId: mfDocId,
			blNo : blNo,
			shipgNoteNo : shipgNoteNo,
			ptnrCd : me.ptnrCd,
			truckMode: truckMode,
			subDoNo: sdoNo,
			grNo: grNo
		};
			
		return params;
	},
	
	validateSelectDocAssign: function(){
		var me = this;
		var refs = me.getReferences();
		
		if(!refs.ctlBlNo.getValue() &&  !refs.ctlSNNo.getValue()){
			MessageUtil.info('Information', 'LASelectDoc');
			return false;
		}
		
		return true;
	},

	validateDOorTransporter: function(thelorryAssingment) {
		var me = this;
		var validObj = {
			valid: true,
			type: null,
			msg: null
		}
		
		var truckMode = me.lookupReference('rdTruckMode').getValue().truckMode;
		if(truckMode == 'E')
		{
			if(!StringUtil.isNullorEmpty( thelorryAssingment.get('blNo'))
					&& (StringUtil.isNullorEmpty( thelorryAssingment.get('doNo')) || StringUtil.isNullorEmpty(thelorryAssingment.get('tsptr')))) {
					validObj.valid = false;
					validObj.type = 'blNo'
					validObj.msg = 'truckAssignment_M005';

					return validObj;
				} else if(!StringUtil.isNullorEmpty(thelorryAssingment.get('shipgNoteNo')) 
						&& (StringUtil.isNullorEmpty(thelorryAssingment.get('tsptr')) || StringUtil.isNullorEmpty( thelorryAssingment.get('grNo')))) {
					validObj.valid = false;
					validObj.type = 'shipgNoteNo'
					validObj.msg = 'truckAssignment_M005';
					
					return validObj;
				}
		}

		return validObj;
	},
	
	setDataBySN: function(record){
		var me = this;
		var refs = me.getReferences();
		var theAssignment = me.getViewModel().get("theLorryAssignment");
		
		me.getViewModel().setData({theLorryAssignment:record});
	},
	
	setDataByGr: function(record){
		var me = this;
		var refs = me.getReferences();
		var theAssignment = me.getViewModel().get("theLorryAssignment");
		
		me.getViewModel().setData({theLorryAssignment:record});
	},
	
	setDataByBl: function(record){
		var me = this;
		var refs = me.getReferences();
		var theAssignment = me.getViewModel().get("theLorryAssignment");
		
		me.getViewModel().setData({theLorryAssignment:record});
	},
	
	setAllowableWeight: function(){
		var me = this;
		var refs = me.getReferences();
		var theAssignment = me.getViewModel().get("theLorryAssignment");
		var theTruck = me.getViewModel().get("theTruckInfo");
		var theChassis = me.getViewModel().get("theChassisInfo");

		var t1 = 0;
		var t2 = 0;
		var c1 = 0;
		var c2 = 0;
		var allowWgt = 0;

		if(theTruck) {
			t1 = Number(theTruck.data.allowWgt);
			t2 = Number(theTruck.data.towedWgt);
		}

		if(theChassis) {
			c1 = Number(theChassis.data.tareWgt);
			c2 = Number (theChassis.data.allowWgt);
		}

		if(theTruck != null && theChassis == null){
			allowWgt = t1 * 1.1;
		} else if(theTruck != null && theChassis != null){
			var val1 = t2 + t2*0.1;
			var val2 = c1 + c2 + c2*0.1;

			if(val1 > val2){
				allowWgt = c2*1.1;
			}else{
				allowWgt = t2*1.1 - c1;
			}
		}

		theAssignment.set('allowWgt', allowWgt);
		theAssignment.set('allowWgtVal', allowWgt);
	},
	
	insertProcess: function () {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME); 
		
		var uploadItems = new Array();
		var fileUploadStore = me.getStore(me.DETAIL_STORE_FILEUPLOAD_NAME);
		
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
		
		var record = me.getViewModel().get("theLorryAssignment");
		record.set('truckMode', me.lookupReference('rdTruckMode').getValue().truckMode);
		record.set('permitYn', me.lookupReference('refSpecialPermissionChk').getValue()?'Y':'N');
		record.set('scn', me.lookupReference('ctlScn').getValue());
		var newRecord = record.clone();
		var newRecord1 = Ext.create('MOST.model.document.TruckAssignment');
		newRecord.id = newRecord1.id;
		newRecord.phantom = true;

		newRecord.set("userId", MOST.config.Token.getUserId());
		newRecord.set('uploadItems', uploadItems);
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = true;
		updateParm.set('workingStatus', WorkingStatus.INSERT);
		updateParm.set('userId', MOST.config.Token.getUserId());
		updateParm.set('items', new Array());
		updateParm.get('items').push(newRecord.data);
		
		updateParm.save({
			success: function(record) {
				store.commitChanges();
				MessageUtil.saveSuccess();
				me.onClear();
				me.onSearch();
			}
		});
	},
	
	updateProcess: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getViewModel().getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) 
			return;
		
		var uploadItems = new Array();
		var fileUploadStore = me.getStore(me.DETAIL_STORE_FILEUPLOAD_NAME);
		
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
		
		selection.set('uploadItems', uploadItems);
		
		var updateArr = new Array();
		updateArr.push(selection.data);
		var isCreate = false;
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		if(!updateArr || updateArr.length <= 0){
			return;
		}
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = isCreate;
		updateParm.set('workingStatus', isCreate ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		updateParm.set('userId', MOST.config.Token.getUserId());
		updateParm.set('items', updateArr);

		updateParm.save({
			success: function(record) {
				store.commitChanges();
				MessageUtil.saveSuccess();
				me.onClear();
				me.onSearch();
			}
		});
	},
	
	deleteProcess: function(selection){
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME); 
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = false;
		updateParm.drop();
		updateParm.set('workingStatus', WorkingStatus.DELETE);
		updateParm.set('items', new Array());
		
		selection.forEach(function (item) {
			updateParm.get('items').push(item.data);
		});
		
		updateParm.save({
			success : function(record, operation) {
				selection.forEach(function (item) {
					item.commit();
					store.remove(item);
				});
				updateParm.commit();
				store.commitChanges();
				me.onClear();
				MessageUtil.saveSuccess();
			}
		});
	},
	
	onBindingDocumentInformation: function(selection){
		var me = this;
		var refs = me.getReferences();

		//Fix Binding data wrong after click refresh button
		if(me.getViewModel().get("theLorryAssignment").data == undefined || me.getViewModel().get("theLorryAssignment").data == null){
			me.getViewModel().setData({theLorryAssignment:selection});
		}
		
		var record = me.getViewModel().get("theLorryAssignment");
		var theVsl = me.getViewModel().get('theVslInfo');
		
		if(selection){
			record.set('vslCd', selection.get('vslCd'));
			record.set('callYear', selection.get('callYear'));
			record.set('callSeq', selection.get('callSeq'));
			record.set('vslCallId', selection.get('vslCallId'));
			record.set('cmdtCd', selection.get('cmdtCd'));
			record.set('delvTpCd', selection.get('delvTpCd'));
			record.set('mfDocId', selection.get('mfDocId'));
			
			//Fix wrong data of MT, M3, QTY fields when load from Goods Receipt Detail screen issue
			if(theVsl.id.indexOf('GoodsReceipt') == -1){					
				record.set('dmt', selection.get('dmt'));
				record.set('dm3', selection.get('dm3'));
				record.set('dqty', selection.get('dqty'));
				record.set('imt', selection.get('imt'));
				record.set('im3', selection.get('im3'));
				record.set('iqty', selection.get('iqty'));
				record.set('wgt', selection.get('wgt'));
				record.set('vol', selection.get('vol'));
				record.set('pkgqty', selection.get('pkgqty'));
			}else{
				me.getViewModel().get('theVslInfo').id = selection.id;
			}
			
			if(theVsl.id.indexOf('DeliveryOrder') != -1){
				if(theVsl.get('delvTpCd') == 'D'){	
					record.set('dmt', theVsl.get('dmt'));
					record.set('dm3', theVsl.get('dm3'));
					record.set('dqty', theVsl.get('dqty'));
					record.set('imt', theVsl.get('imt'));
					record.set('im3', theVsl.get('im3'));
					record.set('iqty', theVsl.get('iqty'));
					record.set('wgt', theVsl.get('dmt'));
					record.set('vol', theVsl.get('dm3'));
					record.set('pkgqty', theVsl.get('dqty'));
				}
				
				if(theVsl.get('delvTpCd') == 'I'){	
					record.set('dmt', theVsl.get('dmt'));
					record.set('dm3', theVsl.get('dm3'));
					record.set('dqty', theVsl.get('dqty'));
					record.set('imt', theVsl.get('imt'));
					record.set('im3', theVsl.get('im3'));
					record.set('iqty', theVsl.get('iqty'));
					record.set('wgt', theVsl.get('imt'));
					record.set('vol', theVsl.get('im3'));
					record.set('pkgqty', theVsl.get('iqty'));
				}
				
				me.getViewModel().get('theVslInfo').id = selection.id;
			}
			
			//Fix missing Transporter field when load from Goods Receipt Detail screen issue
			if(selection.get('tsptr') != '' && selection.get('tsptr') != null){
				record.set('tsptr', selection.get('tsptr'));
			}else{				
				record.set('tsptr', theVsl.get('tsptr'));
			}
		} else {
			record.set('vslCd', '');
			record.set('callYear', '');
			record.set('callSeq', '');
			record.set('vslCallId', '');
			record.set('dmt', '');
			record.set('dm3', '');
			record.set('dqty', '');
			record.set('imt', '');
			record.set('im3', '');
			record.set('iqty', '');
			record.set('wgt', '');
			record.set('vol', '');
			record.set('pkgqty', '');
			record.set('cmdtCd', '');
			record.set('delvTpCd', '');
			record.set('tsptr', '');
		}
	},
	
	onDouplicatedRecordValidation: function(record){
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		
		for(var i = 0; i < store.data.length; i++){
			var rec = store.data.items[i];
			if(rec!==record){
				if(record.getData().truckMode == 'E'){
					if(rec.get('subDoNo') == record.getData().subDoNo
							&& rec.get('grNo') == record.getData().grNo){
						MessageUtil.warning('warning_msg', 'duplicatedata_msg');
						return false;
					}
				} else {
					if(rec.get('blNo') == record.getData().blNo
							&& rec.get('shipgNoteNo') == record.getData().shipgNoteNo
							&& rec.get('lorryNo') == record.getData().lorryNo
							&& rec.get('truckMode') == record.getData().truckMode){
						MessageUtil.warning('warning_msg', 'duplicatedata_msg');
						return false;
					}
				}
			}
		}
		
		return true;
	},
	
	onMandantoryRecordValidation: function(record){
		var me = this;
		var strValidation = "";
		if(StringUtil.isNullorEmpty(record.getData().vslCallId)){
			if(StringUtil.isNullorEmpty(strValidation))
				strValidation += ViewUtil.getLabel('vessel');
			else
				strValidation = strValidation + ", " + ViewUtil.getLabel('vessel');
		}
		
		/* if(record.getData().truckMode == 'E'){
			if(StringUtil.isNullorEmpty(record.getData().subDoNo) && StringUtil.isNullorEmpty(record.getData().grNo)){
				if(StringUtil.isNullorEmpty(strValidation))
					strValidation = ViewUtil.getLabel('subDoNo') + ', ' + ViewUtil.getLabel('LAGRNo');
				else
					strValidation = strValidation + ", " + ViewUtil.getLabel('subDoNo') +  ViewUtil.getLabel('LAGRNo');
			}
		} */

		else {
			if(StringUtil.isNullorEmpty(record.getData().blNo) && StringUtil.isNullorEmpty(record.getData().shipgNoteNo)){
				if(StringUtil.isNullorEmpty(strValidation))
					strValidation = ViewUtil.getLabel('LABLNo') + ', ' + ViewUtil.getLabel('LASNNo');
				else
					strValidation = strValidation + ", " + ViewUtil.getLabel('LABLNo') + ', ' + ViewUtil.getLabel('LASNNo');
			}
		}
		
		if(StringUtil.isNullorEmpty(record.getData().lorryNo)){
			if(StringUtil.isNullorEmpty(strValidation))
				strValidation = ViewUtil.getLabel('LALorryNo');
			else
				strValidation = strValidation + ", " + ViewUtil.getLabel('LALorryNo');
		}
		
		if(StringUtil.isNullorEmpty(record.getData().driverId) && 
			(record.getData().truckMode == 'E' || record.getData().truckMode == 'I')){
			if(StringUtil.isNullorEmpty(strValidation))
				strValidation = ViewUtil.getLabel('LADriverIC');
			else
				strValidation = strValidation + ", " + ViewUtil.getLabel('LADriverIC');
		}
		
		if(!StringUtil.isNullorEmpty(strValidation)) {
			MessageUtil.warning('warning_msg', 'mandatoryField_msg', strValidation);
			return false;
		}
		
		return true;
	},
	
	onChangeSpecialPermission: function(){
		var me = this;
		var refs = me.getReferences();
		
		if(refs.refSpecialPermissionChk.getValue() == true){
			refs.refBtnAddFile.setDisabled(false);
			refs.refBtnRemoveFile.setDisabled(false);
		}else{
			refs.refBtnAddFile.setDisabled(true);
			refs.refBtnRemoveFile.setDisabled(true);
		}
	},
	
	
	onDblClick: function () {
		var me = this;
		var title = { type: 'bundle', key: 'assigningDriversAndTrucksForVehicle' };

		me.getView().detailViewAlias = 'app-assigningdriversandcartrucksforvehicleroroexport';
		me.openDetailPopup(null, title, false);
		
		var grid = me.lookupReference(me.RORO_GRID_REF_NAME);
		var selection = grid.getSelectionModel().getSelection()[0];

		me.getViewModel().setData({ theAssigning: selection });
		me.getAssignedDriversAndTrucksForVehicle(selection);
	},
	
	getAssignedDriversAndTrucksForVehicle: function (record) {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('assignedDriversAndTrucks');
		var theVslInfo = me.getViewModel().get('theSearch');
		
		store.load({
			params: {
				blsnNo: record.data.blsnNo,
				vslCallId: theVslInfo.get('vslCallId'),
				dogrNo : record.data.dogrNo
			},
			callback: function (records, operation, success) {
				if (success) {
					me.getViewModel().setData({ assignedDriversAndTrucks: records });
				}
			}
		});
	},
	
	onClickOk: function (btn) {
		var me = this;
		
		btn.up('window').close();
		me.onSearch();
	},
	
	
	onAssigningSearch: function () {
		var me = this;
		
		me.getDriversAssigningForVehicle();
		me.getTrucksAssigningForVehicle();
	},
	
	

	getTrucksAssigningForVehicle: function () {
		var me = this;
		var refs = me.getReferences();
		var theVslInfo = me.getViewModel().get('theSearch');
		var store = me.getStore('assigningTrucksForVehicle');
		var tsptr = refs.refTsptr.getValue();
		var setTsptr = me.splitString(tsptr);
		
		store.load({
			params: {
				truckNo: StringUtil.toUpperCase(refs.refTruckNo.getValue()),
				tsptr: setTsptr
			},
			callback: function (records, operation, success) {
				if (success) {
					if (records && records.length <= 0) {
					}
				}
			}
		});
	},

	getDriversAssigningForVehicle: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('assigningDriversForVehicle');
		var tsptr = refs.refTsptr.getValue();
		var setTsptr = me.splitString(tsptr);
		
		store.load({
			params: {
				tsptr: setTsptr,
				driverNm: StringUtil.toUpperCase(refs.refDriverNm.getValue()),
			},
			callback: function (records, operation, success) {
				if (success) {
					if (records && records.length <= 0) {
					}
				}
			}
		});
	},
	
	splitString: function (string) {
		var splitedString = '';
		
		if (!StringUtil.isNullorEmpty(string)) {
			splitString = string.replace(/\s/gi, "").split(',');
			if (splitString.length > 0) {
				if (splitString.length == 1) {
					splitedString = "'" + splitString[0] + "'";
				} else {
					for (var i = 0; i < splitString.length; i++) {
						if (splitedString === '') {
							splitedString = "'" + splitString[i] + "'";
						} else {
							splitedString += ",'" + splitString[i] + "'";
						}
					}
				}
			}
		}
		return splitedString;
	},
	
	onAssigningDriversAndTrucksForVehicleAdd: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('assignedDriversAndTrucks');
		var theVslInfo = me.getViewModel().get('theVslInfo');
		var theAssigning = me.getViewModel().get('theAssigning');
		var vslCd = theVslInfo.data.vslCd;
		var callSeq, callYear;
		if(theVslInfo.data.callSeq){
			callSeq = theVslInfo.data.callSeq;
		}else{
			callSeq = theVslInfo.data.callseq;
		}
		if(theVslInfo.data.callYear){
			callYear = theVslInfo.data.callYear;
		}else{
			callYear = theVslInfo.data.callyear;
		}
		var vslCallId = refs.ctlVslCallId.getValue();
		var tsptCompCd = '';
		var sdogrNo = theAssigning.data.dogrNo;
		var blsnNo = theAssigning.data.blsnNo;
		var catgCd = theAssigning.data.categoryCd;
		var userId = Token.getUserId();
		var validate = true;
		var tab = me.getReferences().refAssigningDriversAndTrucksForVehicle;
		var theAssignedDriversAndTrucks = me.getViewModel().get('assignedDriversAndTrucks');
		var activeTab = tab.getActiveTab().activeTab;
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		updateParm.set('items', new Array());
		
		if (activeTab == 0) {
			var driverGrid = me.lookupReference('refAssigningDriversTabGrid');
			var selections = driverGrid.getSelection() == null ? null : driverGrid.getSelection();
			var truckNo = '';
			
			if (selections == null) return;
			
			for (var i = 0; i < theAssignedDriversAndTrucks.length; i++) {
				for (var j = 0; j < selections.length; j++) {
					var driverId = selections[j].data.driverId;
					
					if (driverId == theAssignedDriversAndTrucks[i].data.driverId) {
						validate = false;
					}
				}
			}
			
			if (validate) {
				for (var i = 0; i < selections.length; i++) {
					var item = Ext.create('MOST.model.document.TruckAssignmentOfRORO');
					var driverId = selections[i].data.driverId;
					var tsptCompCd = selections[i].data.tsptCompCd;
					
					item.set('vslCd', vslCd);
					item.set('callSeq', callSeq);
					item.set('callYear', callYear);
					item.set('vslCallId', vslCallId);
					item.set('tsptCompCd', tsptCompCd);
					item.set('truckNo', truckNo);
					item.set('driverId', driverId);
					if(catgCd == 'E'){
						item.set('shipgNoteNo', blsnNo);
						item.set('grNo', sdogrNo);		
					}else if(catgCd == 'I'){
						item.set('blNo', blsnNo);
						item.set('subDoNo', sdogrNo);	
					} else {
						item.set('dogrNo', sdogrNo);
					}
					
					item.set('userId', userId);
					item.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));

					updateParm.get('items').push(item.data);
				}
			}
		} else {
			var driverGrid = me.lookupReference('refAssigningTrucksTabGrid');
			var selections = driverGrid.getSelection() == null ? null : driverGrid.getSelection();
			var driverId = '';
			
			if (selections == null) return;
			
			for (var i = 0; i < theAssignedDriversAndTrucks.length; i++) {
				for (var j = 0; j < selections.length; j++) {
					var truckNo = selections[j].data.truckNo;
					
					if (truckNo == theAssignedDriversAndTrucks[i].data.truckNo) {
						validate = false;
					}
				}
			}
			
			if (validate) {
				for (var i = 0; i < selections.length; i++) {
					var item = Ext.create('MOST.model.document.TruckAssignmentOfRORO');
					var truckNo = selections[i].data.truckNo;
					var tsptCompCd = selections[i].data.tsptCompCd;
					
					item.set('vslCd', vslCd);
					item.set('callSeq', callSeq);
					item.set('callYear', callYear);
					item.set('vslCallId', vslCallId);
					item.set('tsptCompCd', tsptCompCd);
					item.set('truckNo', truckNo);
					item.set('driverId', driverId);
					if(catgCd == 'E'){
						item.set('shipgNoteNo', blsnNo);	
						item.set('grNo', sdogrNo);	
					}else if(catgCd == 'I'){
						item.set('blNo', blsnNo);	
						item.set('subDoNo', sdogrNo);
					} else {
						item.set('dogrNo', sdogrNo);
					}
					item.set('userId', userId);
					item.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));

					updateParm.get('items').push(item.data);
				}
			}
		}
		
		if (validate) {
			updateParm.getProxy().url = store.getProxy().url;
			updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));

			updateParm.save({
				success: function (record, operation) {
					store.commitChanges();
					MessageUtil.saveSuccess();
					store.reload();
				}
			});
		} else {
			MessageUtil.warning('truckAssignmentOfRORO', 'data_assigned');
		}
	},

	onAssigningDriversAndTrucksForVehicleRemove: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refAssignedDriversAndTrucksForVehicleROROExportGrid');
		var selections = grid.getSelection() == null ? null : grid.getSelection();
		
		if (!selections) {
			MessageUtil.warning("truckAssignmentOfRORO", "LASelectDelete");
			return;
		}

		MessageUtil.question('remove', 'infodelete_msg', null, function (button) {
			if (button === 'ok') {
				var store = me.getStore('assignedDriversAndTrucks');
				var item = me.getViewModel().get('theAssigning');
				var theVslInfo = me.getViewModel().get('theVslInfo');
				var sdogrNo = item.data.dogrNo;
				var blsnNo = item.data.blsnNo;
				var catgCd = item.data.categoryCd;
				var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
				
				updateParm.set('items', new Array());
				
				for (var i = 0; i < selections.length; i++) {
					var item = Ext.create('MOST.model.document.TruckAssignmentOfRORO');
					
					item.set('vslCallId',refs.ctlVslCallId.getValue());
					item.set('driverId', selections[i].data.driverId);
					item.set('truckNo', selections[i].data.truckNo);
					if(catgCd == 'E'){
						item.set('shipgNoteNo', blsnNo);	
						item.set('grNo', sdogrNo);	
					}else if(catgCd == 'I'){
						item.set('blNo', blsnNo);	
						item.set('subDoNo', sdogrNo);
					}
					item.set('userId', Token.getUserId());
					item.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));

					updateParm.get('items').push(item.data);
				}

				updateParm.getProxy().url = store.getProxy().url;
				updateParm.phantom = false;
				updateParm.drop();
				updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
				updateParm.save({
					success: function (record, operation) {
						store.commitChanges();
						store.reload();
					}
				});
			}
		});
	},
	
	onTabChange : function(tabPanel, newCard, oldCard, eOpts) {
			var me = this;
			var refs = me.getReferences();
			var tabTitle = tabPanel.getActiveTab().title.trim();
			var generalCargoStore =me.getStore(me.MAIN_STORE_NAME); 
			var roroStore = me.getStore(me.RORO_STORE_NAME);
			switch(tabTitle) {
				case 'General Cargo':
					refs.refBtnCreate.setHidden(false);
					refs.refBtnDelete.setHidden(false);
					refs.refBtnSave.setHidden(false);
					roroStore.removeAll();
					break;
				case 'RORO Cargo':
					refs.refBtnCreate.setHidden(true);
					refs.refBtnDelete.setHidden(true);
					refs.refBtnSave.setHidden(true);
					generalCargoStore.removeAll();
					break;
			}
		},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});

