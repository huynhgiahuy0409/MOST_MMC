Ext.define('MOST.view.document.ForwarderNominationController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.forwardernomination',
	
	MAIN_GRID_REF_NAME: 'refForwarderNominationGrid',
	CALL_LOCATION_FORWARD_NOMINATE : 'fwdnominate',
	
	authority: '',
	
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();

		var recvData = me.getView().recvData;
		
		if(recvData != null){
	     	refs.ctlVessel.setValue(recvData.vslCallId);
	     	me.onSearch();
		}else{
			me.setDateInDays("ctlFromDt", 0);
		}
		
		if(MOST.config.Token.getUserType() === CONSTANTS.USER_TYPE_EXTERNAL){
			if(me.existsPatnerType('SHA')){
				me.authority = 'SHA';
			} 
			if(me.existsPatnerType('FWD')){
				me.authority = 'FWD';
			} 
			if(me.existsPatnerType('SHA') && me.existsPatnerType('FWD')){
				me.authority = 'BH';
			}
		}
	},
	
	MAX_PERIOD_DAY : 7,
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	// Search Event Handler
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore('forwarderNomination');
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						var theMainModel = Ext.create('MOST.model.document.DeliveryOrder');
						theMainModel.data = records[0].data;
						
						me.onValidOpe(records);
					}
					
				}
			}
		});
	},
	
	// Date Change Event
	onDateChange:function( control, newValue, oldValue, eOpts ) {
		var me = this;
		var refs = me.getReferences(); 
		refs.ctlVessel.setValue('');
		me.getViewModel().setData({theJpvc:null});
		if(control == refs.ctlFromDt){
			me.setDateInDaysByDate("ctlToDt", me.MAX_PERIOD_DAY, control.getValue());
		} else {
			me.setDateInDaysByDate("ctlFromDt", -me.MAX_PERIOD_DAY, control.getValue());
		}
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl == 'ctlVessel'){ 
			if(returnValue){
				refs.ctlFromDt.setValue('');
				refs.ctlToDt.setValue('');
				me.getViewModel().setData({theVslInfo:returnValue.item});
				refs.ctlVessel.setValue(returnValue.item.get('vslCallId'));
				refs.ctlScn.setValue(returnValue.item.get('scn'));
				me.onSearch();
			} else {
				me.getViewModel().setData({theJpvc:null});
			}
		}else if (xtype == 'popup-partnercdtypepopup'){
			var me = this;
			var store = me.getStore('forwarderNomination');
			var selectedGrid = false;
			var valid = true;

			store.each(function(record,index){
				if(record.data.itChk){
					record.set('fwdCd', returnValue.code);				
					/*if(record.data.doNo != ''){
						MessageUtil.warning("forwarderNomination", "fwaNomi_do_created_msg");
						valid = false;
						return;
						//record.doDeselect(record,false)
					}else{
						if(returnValue != null){*/
//							record.data.fwdCd = returnValue.code;
//							selectedGrid = true;
							//record.commit();
						/*}
					}*/
				}
			});
		}else if (xtype == 'popup-cmmcdpopup'){
			var me = this;
			var store = me.getStore('forwarderNomination');
			var selectedGrid = false;
			var valid = true;

			store.each(function(record,index){
				if(record.data.itChk){
					if(record.data.holdChk == 'Y'){
						MessageUtil.warning("forwarderNomination", "fwaNomi_operation_check_msg");
						valid = false;
						return;
					}
					/*if(record.data.doNo != '' && record.data.fwdCd != ''){
						MessageUtil.warning("forwarderNomination", "fwaNomi_cannot_change_msg");
						valid = false;
						return;
						//record.doDeselect(record,false)
					}else{*/
						if(returnValue != null){
							record.data.pkgTpCd = returnValue.code;
							record.data.pkgTpNm = returnValue.codeName;
							selectedGrid = true;
							record.commit();
						}
//					}
				}
			});
		}else if(targetControl === 'ctlConsigneeCd'){
			if(returnValue){ 
				//shipNote.set("shpr",returnValue.item.get("ptyCd"));
				
				refs.refTxtCnsNm.setValue(returnValue.item.get("engPtyNm"));
				refs.refTxtCnsAddr1.setValue(returnValue.item.get("addr1"));
				refs.refTxtCnsAddr2.setValue(returnValue.item.get("addr2"));
				refs.refTxtCnsAddr3.setValue(returnValue.item.get("addr3"));
				refs.refTxtCnsAddr4.setValue(returnValue.item.get("addr4"));
			
			} else {
				refs.refTxtCnsNm.setValue("");
				refs.refTxtCnsAddr1.setValue("");
				refs.refTxtCnsAddr2.setValue("");
				refs.refTxtCnsAddr3.setValue("");
				refs.refTxtCnsAddr4.setValue("");
			}
		}else if(targetControl === 'ctlShipperCd'){
			
			if(returnValue){ 
				//shipNote.set("shpr",returnValue.item.get("ptyCd"));
				
				refs.refTxtShprNm.setValue(returnValue.item.get("engPtyNm"));
				refs.refTxtSprAddr1.setValue(returnValue.item.get("addr1"));
				refs.refTxtSprAddr2.setValue(returnValue.item.get("addr2"));
				refs.refTxtSprAddr3.setValue(returnValue.item.get("addr3"));
				refs.refTxtSprAddr4.setValue(returnValue.item.get("addr4"));
			
			} else {
				refs.refTxtShprNm.setValue("");
				refs.refTxtSprAddr1.setValue("");
				refs.refTxtSprAddr2.setValue("");
				refs.refTxtSprAddr3.setValue("");
				refs.refTxtSprAddr4.setValue("");
			}
			
		} else if(targetControl === 'ctlScn'){ 
			if(returnValue){
				refs.ctlFromDt.setValue('');
				refs.ctlToDt.setValue('');
				refs.ctlScn.setValue(returnValue.code);

				if(!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))){
					refs.ctlVessel.setValue(returnValue.item.get('vslCallId'));
					me.getViewModel().setData({theVslInfo:returnValue.item});
					me.onSearch();
				}else {
					refs.ctlVessel.setValue('');
					me.getViewModel().setData({theVslInfo:null});
				}
			} 
		}
		
	},
	
	// Toolbar Save Button
	onDetailSave:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theMain');
		var refs = me.getReferences();
		
		if(detailView){
			var infoForm = detailView.down('form').getForm();
			
			//Added by Tram
			if(refs.ctlShipperCd.getValue() == refs.ctlConsigneeCd.getValue()){
				MessageUtil.error('warning_msg','shippingNoteInquiry_DM101037');
				return;
			}
			//End Added
			
			
			if(infoForm.isValid()){
				me.checkValidation();
			} else {
				MessageUtil.mandatoryFieldInValid();
			}
		}
	},
	
	// Server Save Process
	saveProcess:function(){
		var me = this;
		var store = me.getStore('forwarderNomination');
		var detailItem = me.getViewModel().get('theMain');
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		if(detailItem.dirty){
			var proxy = detailItem.getProxy();
			proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/deliveryorder/list'; // You can set it as store Proxy Url, or you can put another URL.

			detailItem.save({
				success : function(){
					detailItem.set("version", detailItem.get('newVersion'));
					detailItem.commit();
					
					me.updateRecord(recvData, detailItem); 
					MessageUtil.saveSuccess(); // Success Message
				}
			});
		}
	},
	
	onDblClick: function() {
		var me = this;
		var grid = me.lookupReference('refForwarderNominationGrid');

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		if(selection.data.doNo == ''){
			MessageUtil.warning("forwarderNomination", "fwaNomi_nodo_detail_msg");
			return;
		}
		
		var title = {type: 'bundle', key: 'deliveryOrderDetailTitle'};
		
		me.getView().detailViewAlias = 'app-deliveryorderdetail';
		me.openDetailPopup(selection, title);
		
		
	},
	
	onCellClick: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refForwarderNominationGrid');

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection != null){
			refs.ctlCargoTp.setValue(selection.get('cgTpCd'));
			refs.ctlDMode.setValue(selection.get('delvTpCd'));
			refs.ctlVessel.setValue(selection.get('vslCallId'));
		}
		//selection.data.itChk=true;
		//selection.commit();
	},
	
	openFwaNomi: function() {
		var me = this;
		var store = me.getStore('forwarderNomination');
		var selectedGrid = false;
		var valid = true;
		
		store.each(function(record,index){
			if(record.data.itChk){
				selectedGrid = true;
				if(record.data.doNo != ''){
					if(!me.onCheckOpeDO(record)){
						MessageUtil.warning("forwarderNomination", "fwaNomi_do_valdi_ope_msg", record.data.doNo);
						valid = false;
						return;
					}
				}
			}
		});
		
		if(!selectedGrid) {
			MessageUtil.warning("forwarderNomination", "fwaNomi_select_msg");
    		return;
		}
		
		
		if(valid) {
			
			var params = {
				searchType: 'ptnrType',
				searchModule: 'MT'
			};
			me.openCodePopup('popup-partnercdtypepopup', '', params);
		}
		
	},
	
	openPackageType: function() {
		var me = this;
		var store = me.getStore('forwarderNomination');
		var selectedGrid = false;

		store.each(function(record,index){
			if(record.data.itChk){
				selectedGrid = true;
				return false;
			}
		});
		
		if(!selectedGrid) {
			MessageUtil.warning("forwarderNomination", "fwaNomi_select_msg");
			//refs.ctlDMode.setValue('');
    		return;
		}
		
		var params = {
				searchType: 'COMM', 	// CNTRY, CMDT, COMM, IMDG, PORT, VSCD, DLYCD, ONE_DG
				searchDivCd: 'PKGTP',	// EMAILTMP, PKGTP
				searchLcd: 'MT',		// MT
				searchCol1: ''
		};
		me.openCodePopup('popup-cmmcdpopup', '', params);
	},
	
	onValidOpe: function (item) {
		var me = this;
		var params = me.getSearchCondition();
		var validationCodeStore = me.getStore('fwaNomiValidationCodeStore');
		var vslCallId = (item != null && item.length > 1) ? '' : item[0].get('vslCallId');
		
		validationCodeStore.load({
			params : {
				tyCd : 'EXISTED_OPE_FORWARDER_NOMINATION_VALIDATION',
				col1 : vslCallId,
				col4 : params.etaStart,
				col5 : params.etaEnd,
				scn : params.scn
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records != null && records.length > 0){
						if(records[0].get('isValidated') === 'Y'){
						}
					}
				}
			}
		});

	},
	
	onCheckOpeDO: function(item){
		var me = this;
		var validationCodeStore = me.getStore('fwaNomiValidationCodeStore');
		var isValidated = true;
		var vslCallId = "", 
			doNo = "",
			blNo = "";
		
		blNo = item.get('blNo');
		doNo = item.get('doNo');
		
		validationCodeStore.each(function(record, index, array){
			if(record.get('ref1') != null && record.get('ref1') == doNo &&
					record.get('ref2') != null && record.get('ref2') == blNo &&
					record.get('isValidated') === 'Y'
			){
				isValidated = false;
			}
		});
		
		return isValidated;
	},
	
	onFaDeletion: function(){
		var me = this;
		var store = me.getStore('forwarderNomination');
		var validationCodeStore = me.getStore('fwaNomiValidationCodeStore');
		var selectedGrid = false;
		var valid = true;
		
		store.each(function(record,index){
			if(record.data.itChk){
				if(record.data.doNo != ''){
					//record.doDeselect(record,false)
					
					if(!me.onCheckOpeDO(record)){
						MessageUtil.warning("forwarderNomination", "fwaNomi_do_valdi_ope_dtl_msg", record.data.doNo);
						valid = false;
						return;
					}
					
				}else{
					record.set('fwdCd', '');
					selectedGrid = true;
					//record.commit();
				}
			}
		});
		
		if(!selectedGrid && valid) {
			MessageUtil.warning("forwarderNomination", "fwaNomi_select_msg");
			//refs.ctlDMode.setValue('');
    		return;
		}
	},
	
	openDgDecl: function() {
		var me = this;
		var grid = me.lookupReference('refForwarderNominationGrid');
		var title = {type: 'bundle', key: 'dgDeclTitle'};

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		me.getView().detailViewAlias = 'app-dgdeclaration';
		var theDGModel = Ext.create('MOST.model.document.DGDeclaration');
		var detailVslItem = me.getViewModel().get('theVslInfo');
		
		theDGModel.set("vslCallId",detailVslItem.get("vslCallId"));
		theDGModel.set("vslCd",detailVslItem.get("vslCd"));
		theDGModel.set("callYear",detailVslItem.get("callYear"));
		theDGModel.set("callSeq",detailVslItem.get("callSeq"));
		theDGModel.set("vslNm",detailVslItem.get("vslNm"));
		theDGModel.set("arrvSaId",detailVslItem.get("arrvSaId"));
		theDGModel.set("berthLoc",detailVslItem.get("berthLoc"));
		theDGModel.set("voyage",detailVslItem.get("voyage"));
		theDGModel.set("eta",detailVslItem.get("eta"));
		theDGModel.set("portCd",detailVslItem.get("portCd"));
		theDGModel.set("portCdNext",detailVslItem.get("portCdNext"));
		theDGModel.set("freeZoneDiv",'FZN');
		theDGModel.set("arrvSaId",selection.data.arrvSaId);
		theDGModel.set("impNm",selection.data.cnsNm);
		theDGModel.set("impAddr",selection.data.impAddr);
		theDGModel.set("expNm",selection.data.cnsnorNm);
		theDGModel.set("expAddr",selection.data.expAddr);
		theDGModel.set("unno",selection.data.unno);
		theDGModel.set("imdg",selection.data.imdgClass);
		theDGModel.set("cgNo",selection.data.blNo);
		theDGModel.set("pkgQty",selection.data.pkgQty);
		theDGModel.set("wgt",selection.data.wgt);
		theDGModel.set("catgCd","Import");
		theDGModel.set("contactNm", selection.data.contactNm);
		theDGModel.set("contactNo", selection.data.contactNo);
		theDGModel.set("pkgTpCd", selection.data.pkgTpCd);
		theDGModel.set("pkgtpcdnm", selection.data.pkgTpNm);
		
		me.openDetailPopup(theDGModel, title, true, false, false);
		
	},
	
	selectDMode: function( newValue, oldValue, eOpts ){
		var me = this;
		var store = me.getStore('forwarderNomination');
		var refs = me.getReferences();
		var grid = me.lookupReference('refForwarderNominationGrid');
		var model = Ext.create('MOST.model.document.NominationManifest');
		var selectedGrid = false;
		var valid = true;

		store.each(function(record,index){
			if(record.data.itChk){
				if(record.data.doNo != ''){
					if(!me.onCheckOpeDO(record)){
						MessageUtil.warning("forwarderNomination", "fwaNomi_do_valdi_ope_dtl_msg", record.data.doNo);
						valid = false;
						return;
					}
				}
				if(newValue.value != '' && valid){
					//Modified by Harry
					record.set('delvTpCd', newValue.value);
					record.set('delvTpNm', newValue.rawValue);
					selectedGrid = true;
				}else{
					valid = false;
					record.set('delvTpCd', '');
					record.set('delvTpNm', '');
					selectedGrid = true;
				}
			}
		});
		
		if(!selectedGrid && valid) {
			MessageUtil.warning("forwarderNomination", "fwaNomi_select_msg");
			refs.ctlDMode.setValue('');
    		return;
		}

	},
	
	selectCargoType: function( newValue, oldValue, eOpts ){
		var me = this;
		var store = me.getStore('forwarderNomination');
		var refs = me.getReferences();
		var grid = me.lookupReference('refForwarderNominationGrid');
		var selectedGrid = false;
		var valid = true;

		store.each(function(record,index){
			if(record.data.itChk){
				if(record.data.doNo != ''){
					if(!me.onCheckOpeDO(record)){
						MessageUtil.warning("forwarderNomination", "fwaNomi_do_valdi_ope_dtl_msg", record.data.doNo);
						valid = false;
						return;
					}
				}
				if(newValue.value != '' && valid){
					record.set('cgTpCd', newValue.value);
					record.set('cgTpCdNm', newValue.rawValue);
					selectedGrid = true;
					//record.commit();
				}else{
					valid = false;
					record.set('cgTpCd', '');
					record.set('cgTpCdNm', '');
					selectedGrid = true;
					//record.commit();
				}
			}
		});
		
		if(!selectedGrid && valid) {
			MessageUtil.warning("forwarderNomination", "fwaNomi_select_msg");
			refs.ctlCargoTp.setValue('');
    		return;
		}
	},
	
	onChecked : function (model, record, index, eOpts) {
		if(record.data.itChk){
			record.data.itChk=false;
		}
		else{
			record.data.itChk=true;
			var datacheck = record;
			var me = this;
			var refs = me.getReferences();
			var grid = me.lookupReference('refForwarderNominationGrid');
			var searchVslDtl = me.getViewModel().getStore('searchVslDetail');
			
			var selection = grid.getSelection() === null ? null : grid.getSelection()[0];
			if(selection === null) return;
			
			searchVslDtl.load({
				params: {
					vslCallId : record.data.vslCallId
				},
				callback:function(records,success){
					if(success){
						if(records.length > 0){
							//refs.ctlFromDt.setValue('');
							//refs.ctlToDt.setValue('');
							me.getViewModel().setData({theJpvc:records[0]});
							records.push(datacheck.data);
						    refs.ctlCargoTp.setValue(records[1].cgTpCd);
						    refs.ctlDMode.setValue(records[1].delvTpCd);
						    refs.ctlVessel.setValue(records[1].vslCallId);
						}
					}
				}
			});
//			if(record.data.doNo != ''){
//				MessageUtil.warning("forwarderNomination", "fwaNomi_do_created_msg");
//				model.doDeselect(record,false)
//			}else{
//				record.data.itChk=true;
//			}
		}
		
    },
    
    onSave: function(){    	
    	var me = this;
    	var store = me.getStore('forwarderNomination');
    	var arrItems = new Array();
		store.each(function(record,index){
			if(record.data.itChk){
				arrItems.push(record.data);
			}
		});
    	
		if(arrItems.length > 0){
			me.onUploadDG(arrItems);
		}
		
    },
    
    onUploadDG : function(arrItems) {
    	var me = this;
		var refs = me.getReferences();
		var frm = refs.fileForm;
    	var isFileUpload = false;
		
		var formData = new FormData(frm);
				
		arrItems.forEach(function(records, index, array){
			if(records.uploadItems != null){
				records.uploadItems.forEach(function(record, index, array){
					if(record.workingStatus != 'D'){
						formData.append(record.fileName, record.fileStream);
						isFileUpload = true;
					}
				});
			}
		});
		
		if(isFileUpload){
			this.dgFileUpload(arrItems, formData);
		} else {
			me.checkDO();			
		}
	},
	
	dgFileUpload : function(arrItems, formData){
		var me = this;
    	var xhr = new XMLHttpRequest();
    	
    	xhr.addEventListener('loadend', function(){
    		if(xhr.status === 200){
    			var rtnData = JSON.parse(xhr.responseText); // get filename - uuid
    			
    			arrItems.forEach(function(records, index, array){
					records.uploadItems.forEach(function(record, index, array){
						record.ufileName = rtnData[record.fileName];
						record.fileStream =  null;
					});
				});
    			
    			me.submitNomiListProcess(); // SERVER SAVE
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
	
	submitNomiListProcess:function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore('forwarderNomination');
		var refs = me.getReferences();
		var arrItems = new Array();
		var grid = me.lookupReference('refForwarderNominationGrid');
		
		var masterItem = Ext.create('MOST.model.document.NominationManifest');
		var params = new Array();
		var error = 0;
		var strFwdAgent = '';
		
		store.each(function(record,index){
			if(record.data.itChk){
				/*if(record.get('fwdCd') != '' && record.get('delvTpCd') == ''){
					if(strFwdAgent == ''){
						strFwdAgent += record.get('blNo');
					}else{
						strFwdAgent += ', ' + record.get('blNo');
					}
					
					error += 1;
				}*/
				
				params['0'] = strFwdAgent;
				record.set("userId", MOST.config.Token.getUserId());
				arrItems.push(record.data);
				//Added by Harry
				masterItem.crudState = 'U';
				masterItem.crudStateWas = 'U';
				masterItem.phantom = false;
				//----------------------------------------
			}
		});
		
		/*if(error > 0){
			MessageUtil.warning("forwarderNomination", "fwaNomi_nodlvtpcd_save_msg", params);
			return;
		}*/
		
		if(masterItem.dirty||arrItems.length>0){
			var proxy = masterItem.getProxy();
			proxy.url=store.getProxy().url;
			masterItem.set("items",arrItems);

			masterItem.save({
				success:function(){
					MessageUtil.saveSuccess();
					refs.ctlDMode.setValue('');
					refs.ctlCargoTp.setValue('');
					grid.getSelectionModel().deselectAll();
				}
			});
		}else{
			MessageUtil.warning("forwarderNomination", "fwaNomi_nodata_save_msg");
			return;
		}
	},
	
	checkDO : function(){
		var me = this;
		var grid = me.lookupReference('refForwarderNominationGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];		
		var cgOpList = me.getStore('cgOpList');
		var check = true;
		
		cgOpList.load({
			params: {
				vslCallId : selection.data.vslCallId,
				blNo : selection.data.blNo,
				searchType : "cgOp"
			},
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						for (var i = 0; i < records.length; i++){
							if( records[i].statCd != 'RS'){
								MessageUtil.warning("deliveryOrder", "deliveryOrder_update_operated_msg");
								return;	
							}
						}
					}
					me.submitNomiListProcess(); // SERVER SAVE
				}
			}
		});
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
     	var vslCallId = refs.ctlVessel.getValue();
     	var scn = refs.ctlScn.getValue();
     	var searchType = 'list';
     	var delvtpcd = refs.ctlSearchDMode.getValue();
     	
     	var dateCondition = null;
     	var etaFrom = '';
     	var etaTo = '';
     	if(refs.ctlFromDt.getValue() != null && refs.ctlToDt.getValue() != null){
     		 dateCondition = me.checkPeriodDate("ctlFromDt", "ctlToDt", me.MAX_DATE_ALLOW, true);
     		 etaFrom = dateCondition.fromDtString;
     		 etaTo = dateCondition.toDtString;
     	}
    	
    	var params = {
    		scn : scn,
    		vslCallId : vslCallId,
    		searchType: searchType,
    		etaStart: etaFrom,
    		etaEnd: etaTo,
    		delvTpCd: delvtpcd,
    		authority: me.authority,
    		ptnrCd: MOST.config.Token.getPtnrCode()
		};
    	
    	return params;
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
		//var infoForm = detailView.down('form').getForm();
		//infoForm.isValid(); // Mandatory to appear red for.
		
		me.setDetailInitialize();
		me.setDetailComboBox();
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
		var deliveryOrderDetail = me.getStore('deliveryOrderDetail');
		
		if(recvData.get('delvTpCd') == "I"){
			//refs.refFsDirect.setDisabled(true);
			me.onFieldsetDisabled(refs.refFsDirect, true)
		}
		
		if(recvData.get('delvTpCd') == "D"){
			//refs.refFsInDirect.setDisabled(true);
			me.onFieldsetDisabled(refs.refFsInDirect, true)
		}
		
		deliveryOrderDetail.load({
			params: {
				vslCallId : recvData.data.vslCallId,
				blno : recvData.data.blNo,
				searchType: 'detail'
			},
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						// Main Detail
						var theMainModel = Ext.create('MOST.model.document.DeliveryOrder');
						theMainModel.phantom = false; // UPDATE
						theMainModel.data = records[0].data;
						theMainModel.data.estdt = records[0].get('estDt');
						
						var dRec = Ext.create('MOST.model.common.codes.DetailCode'); // record for direct
						dRec.data.cd = records[0].get('tspttpcd');
						dRec.data.scd = records[0].get('tspttpcd');
						me.onSelectModeOfOper(refs.ctlModeOper, dRec)
						
						var iRec = Ext.create('MOST.model.common.codes.DetailCode'); // record for indirect
						iRec.data.cd = records[0].get('itspttpcd');
						iRec.data.scd = records[0].get('itspttpcd');
						me.onSelectModeOfOper(refs.ctlIModeOper, iRec)
						
						
						if(Ext.isEmpty(refs.ctlDoLorryDmt.getValue())){
							refs.ctlDoLorryDmt.setValue(0)
						}
						
						/*if(Ext.isEmpty(refs.ctlDWagonMt.getValue())){
							refs.ctlDWagonMt.setValue(0)
						}
						
						if(Ext.isEmpty(refs.ctlDCnvyMt.getValue())){
							refs.ctlDCnvyMt.setValue(0)
						}
						
						if(Ext.isEmpty(refs.ctlILrryMt.getValue())){
							refs.ctlDPplnMt.setValue(0)
						}*/
						
						if(Ext.isEmpty(refs.ctlDoLorryImt.getValue())){
							refs.ctlDoLorryImt.setValue(0)
						}
						
						/*if(Ext.isEmpty(refs.ctlIWagonMt.getValue())){
							refs.ctlIWagonMt.setValue(0)
						}*/
						me.getViewModel().setData({theMain:theMainModel});
							
					}
				}
			}
		});		
		
	},
	
	setDetailComboBox:function(){
		var me = this;
		var directTstpCombo = me.getViewModel().getStore('directTstpCombo');
		var indirectTstpCombo = me.getViewModel().getStore('indirectTstpCombo');
		directTstpCombo.load({
			params: {
				lcd : 'MT',
				mcd : 'TSPTTP'
			},
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						indirectTstpCombo.insert(0, [{
							scdNm: 'Select',
							scd: ''
						}]);
						var j = 1;
						for (var i = 0; i < records.length; i++){
							if( records[i].data.scd.indexOf('C') < 0 && records[i].data.scd.indexOf('P') < 0){
								indirectTstpCombo.insert(j, [{
						        	  scdNm: records[i].data.scdNm,
						              scd: records[i].data.scd
						          }]);
								j++
							}
						}
						
					}
				}
			}
		});
		
	},

	// DG Screen Load
	onDGLoad:function(){
		var me = this;
		
		me.setDGInitialize();
	},
	
	// DG Screen Initialize
	setDGInitialize:function(){
		var me = this;
		var infoView = me.getDetailBizView();
		var recvData = infoView.items.get(0).recvData;
		this.setDGControl(recvData);
	},
	
	// DG Screen Control Setting
	setDGControl:function(recvData){
		var me = this;
		var refs = me.getReferences();
		var substanceCombo = me.getViewModel().getStore('substanceCombo');
		var dgDeclarationDetail = me.getStore('dgDeclarationDetail');
		dgDeclarationDetail.load({
			params: {
				unno : recvData.data.unno,
				imdg : recvData.data.imdgClass,
				cgNo : recvData.data.cgNo,
				vslCd : recvData.data.vslCd,
				callSeq : recvData.data.callSeq,
				callYear : recvData.data.callYear,
				seq : recvData.data.dgSeq,
				searchType: 'detailList'
			},
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						var theDGModel = Ext.create('MOST.model.document.DGDeclaration');
						theDGModel.phantom = false; // UPDATE
						theDGModel.data = records[0].data;
						me.getViewModel().setData({theDG:theDGModel});
						substanceCombo.load({
							params: {
								unno : theDGModel.data.unno,
								imdg : theDGModel.data.imdg
							}
						});
					}else{
						var theDGModel = Ext.create('MOST.model.document.DGDeclaration');
						theDGModel.data.catgCd = "Import";
						theDGModel.data = recvData.data;
//						theDGModel.data.arrvSaId = recvData.data.arrvSaId;
//						theDGModel.data.impNm = recvData.data.cnsNm;
//						theDGModel.data.expNm = recvData.data.cnsnorNm;
//						theDGModel.data.expAddr = recvData.data.impAddr; 
//						theDGModel.data.unno = recvData.data.unno;
//						theDGModel.data.imdg = recvData.data.imdgClass;
//						theDGModel.data.cgNo = recvData.data.blNo;
//						theDGModel.data.pkgQty = recvData.data.pkgQty;
//						theDGModel.data.pkgQty = recvData.data.wgt;
						me.getViewModel().setData({theDG:theDGModel});
						substanceCombo.load({
							params: {
								unno : theDGModel.data.unno,
								imdg : theDGModel.data.imdgClass
							}
						});
					}
				}
			}
		});
		
	},
	
	onDGCancel:function(){
		var me = this;
		var dgView = me.getDetailBizView();
		dgView.close();
	},
	
	onOK:function(){
		var me = this;
		var dgView = me.getDetailBizView();
		var dgItem = me.getViewModel().get('theDG');
		
		if(dgView){
			var dgForm = dgView.down('form').getForm();
			
			if(dgForm.isValid()){
				me.saveDGProcess();
			} else {
				MessageUtil.mandatoryFieldInValid();
			}
		}
	},
	
//	saveDGProcess:function(){
//		var me = this;
//		var uploadItems = new Array();
//		var store = me.getStore('forwarderNomination');
//		var grid = me.lookupReference('refForwarderNominationGrid');
//		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
//		var dgView = me.getDetailBizView();
//		var fileUploadStore = dgView.items.items[0].getViewModel().getStore('dgUpload');
//		var dgForm = dgView.down('form').getForm();
//		var model = new MOST.model.planning.DGDeclaration(dgForm.getValues());
//		selection.data.insDGYn = 'Y';
//		selection.data.imdgClass = dgView.items.items[0].lookupReference('ctlImdg').getValue();
//		selection.data.unno = dgView.items.items[0].lookupReference('ctlUnno').getValue();
//		selection.data.substance = model.data.substance;
//		selection.data.freeZoneDiv = model.data.freeZoneDiv;
//		selection.data.flashPnt = model.data.flashPnt;
//		selection.data.hazChem = model.data.hazChem;
//		selection.data.priCd = model.data.priCd;
//		selection.data.priGrp = model.data.priGrp;
//		selection.data.pkgTpCd = dgView.items.items[0].lookupReference('ctlPkg').getValue();
//		selection.data.pkgQty = model.data.pkgQty;
//		selection.data.rmk1 = model.data.rmk1;
//		selection.data.propSnm = model.data.propSnm;
//		selection.data.contactNm = model.data.contactNm;
//		selection.data.contactNo = model.data.contactNo;
//		// File Upload CREATE, UPDATE RECORD
//		fileUploadStore.getModifiedRecords().forEach(function(record, index, array){
//			//record.set('fileStream', null);
//			uploadItems.push(record.data);
//		});
//		// File Upload DELETE RECORD
//		fileUploadStore.getRemovedRecords().forEach(function(record, index, array){
//			uploadItems.push(record.data);
//		});
//		selection.data.uploadItems = uploadItems;
//			
//		selection.commit();
//		
//		dgView.close();
//	},
	
	saveDGProcess:function(){
		var me = this;
		var store = null;
		var grid = null;
		
		if(screenMode === me.CALL_LOCATION_SHIPPING_NOTE){
			
		}else if (screenMode === me.CALL_LOCATION_FORWARD_NOMINATE){
			store = me.getStore('forwarderNomination');
			grid = me.lookupReference('refForwarderNominationGrid');
		}
		
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var infoItem = me.getViewModel().get('theDG');
		var dgView = me.getDetailBizView();
		var dgForm = dgView.down('form').getForm();
		var model = new MOST.model.document.DGDeclaration(dgForm.getValues());
		
		selection.data.insDGYn = 'Y';
		selection.data.imdg = model.data.imdg;
		selection.data.unno = model.data.unno;
		selection.data.substance = model.data.substance;
		selection.data.freeZoneDiv = model.data.freeZoneDiv;
		selection.data.flashPnt = model.data.flashPnt;
		selection.data.hazChem = model.data.hazChem;
		selection.data.priCd = model.data.priCd;
		selection.data.priGrp = model.data.priGrp;
		selection.data.pkgTpCd = dgView.items.items[0].lookupReference('ctlPkg').getValue();
		selection.data.pkgQty = model.data.pkgQty;
		selection.data.rmk1 = model.data.rmk1;
		selection.data.propSnm = model.data.propSnm;
		selection.data.contactNm = model.data.contactNm;
		selection.data.contactNo = model.data.contactNo;
		selection.commit();
		
		dgView.close();
	},
	
	checkValidation: function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theMain');
		
		var cgOpList = me.getStore('cgOpList');
		
		cgOpList.load({
			params: {
				vslCallId : detailItem.data.vslCallId,
				blNo : detailItem.data.blno,
				searchType : "cgOp"
			},
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						for (var i = 0; i < records.length; i++){
							if( records[i].statCd != 'RS'){
								MessageUtil.warning("deliveryOrder", "deliveryOrder_update_operated_msg");
								return;
							}
						}
					}
					
					if (!me.weightCheck()){
						return;
					}
					
					if (!me.calcM3()){
						return;
					}
					
					if (!me.calcQty()){
						return;
					}
					
					
					var recvData = me.getDetailBizView().items.get(0).recvData;
					if(!me.onCheckOpeDO(recvData)){
						MessageUtil.warning("forwarderNomination", "fwaNomi_do_valdi_ope_dtl_msg", recvData.get('doNo'));
						return;
					} else {
						me.saveProcess();
					}
					
				}
			}
		});
		
	},
	
	weightCheck: function(){
		var me = this;
		var refs = me.getReferences();
		
		var dMt = 0;
		var iMt = 0;
		
		var isEmptyDLrryMt = (refs.ctlDLrryMt.value == 0);
		var isEmptyDWagonMt = (refs.ctlDWagonMt.value == 0);
		var isEmptyDCnvyMt = (refs.ctlDCnvyMt.value == 0);
		var isEmptyDPplnMt = (refs.ctlDPplnMt.value == 0);
		
		if (refs.ctlModeOper.value != "") {
			if ((refs.ctlDLrryMt.editable == true && isEmptyDLrryMt)	
				|| (refs.ctlDWagonMt.editable == true && isEmptyDWagonMt)
				|| (refs.ctlDCnvyMt.editable == true && isEmptyDCnvyMt)
				|| (refs.ctlDPplnMt.editable == true && isEmptyDPplnMt)) {
				MessageUtil.warning("deliveryOrder", "deliveryOrder_update_mt_msg");
	    		return false;
			} 
		}
		
		var isEmptyILrryMt = (refs.ctlILrryMt.value == 0 );
		var isEmptyIWagonMt = (refs.ctlIWagonMt.value == 0 );
		
		if (refs.ctlIModeOper.value != "") {
			if ((refs.ctlILrryMt.editable == true && isEmptyILrryMt) || (refs.ctlIWagonMt.editable == true && isEmptyIWagonMt)) {
				MessageUtil.warning("deliveryOrder", "deliveryOrder_update_mt_msg");
	    		return false;
			} 
		}
		
		if (refs.ctlDDmt.value > 0) {
			dMt = Number(refs.ctlDDmt.value);
		}
		
		if (refs.ctlImt.value > 0) {
			iMt = Number(refs.ctlImt.value);
		}
		
		var sumMt = dMt + iMt;
		
		if (refs.ctlDocMt.value.length > 0) {
			var docMt = Number(refs.ctlDocMt.value);
			
			if (docMt != sumMt) {
				MessageUtil.warning("deliveryOrder", "deliveryOrder_update_weight_msg");
	    		return false;
			}
		}
		
		return true;
	},
	
	calcM3: function(){
		var me = this;
		var refs = me.getReferences();
		
		var dM3 = 0;
		var iM3 = 0;
		
		if (refs.ctlDM3.value > 0) {
			dM3 = Number(refs.ctlDM3.value);
		}
		
		if (refs.ctlIm3.value > 0) {
			iM3 = Number(refs.ctlIm3.value);
		}
			
		var sumM3 = dM3 + iM3;
		
		if (refs.ctlVol.value.length > 0) {
			var docM3 = refs.ctlVol.value;
			if (docM3 != sumM3) {
				MessageUtil.warning("deliveryOrder", "deliveryOrder_update_measurement_msg");
				return false;
			}
		}
		
		return true;
	},
	
	calcQty: function(){
		var me = this;
		var refs = me.getReferences();
		
		var dQty = 0;
		var iQty = 0;
		
		if (refs.ctlDQty.value > 0) {
			dQty = Number(refs.ctlDQty.value);
		}
		
		if (refs.ctlIQty.value > 0) {
			iQty = Number(refs.ctlIQty.value);
		}
			
		var sumQty = dQty + iQty;
		
		if (refs.ctlPkgQty.value.length > 0) {
			var docQty = Number(refs.ctlPkgQty.value);
			if (docQty != sumQty){
				MessageUtil.warning("deliveryOrder", "deliveryOrder_update_quantity_msg");
				return false;
			}
		}
		
		return true;
	},
	
	onDMtOver:function(field, event){
		var me = this;
		var refs = me.getReferences();
		var sumMt = 0;
		
		if(Ext.isEmpty(refs.ctlDLrryMt.getValue())){
			refs.ctlDLrryMt.setValue(0)
		}
		
		if(Ext.isEmpty(refs.ctlDWagonMt.getValue())){
			refs.ctlDWagonMt.setValue(0)
		}
		
		if(Ext.isEmpty(refs.ctlDCnvyMt.getValue())){
			refs.ctlDCnvyMt.setValue(0)
		}
		
		if(Ext.isEmpty(refs.ctlILrryMt.getValue())){
			refs.ctlDPplnMt.setValue(0)
		}
		
		sumMt = parseFloat(refs.ctlDLrryMt.getValue()) + parseFloat(refs.ctlDWagonMt.getValue()) + parseFloat(refs.ctlDCnvyMt.getValue()) + parseFloat(refs.ctlDPplnMt.getValue());
		
		refs.ctlDDmt.setValue(sumMt);
	},
	onIMtOver:function(field){
		var me = this;
		var refs = me.getReferences();
		var sumMt = 0;
		
		//if(field.getValue() == "") field.setValue(0);
		
		if(Ext.isEmpty(refs.ctlILrryMt.getValue())){
			refs.ctlILrryMt.setValue(0)
		}
		
		if(Ext.isEmpty(refs.ctlIWagonMt.getValue())){
			refs.ctlIWagonMt.setValue(0)
		}
		
		sumMt = parseFloat(refs.ctlILrryMt.getValue()) + parseFloat(refs.ctlIWagonMt.getValue());
		
		refs.ctlImt.setValue(sumMt);
	},
	
	openFinalDesPopup:function(){
		var me = this;
		var params = {
			searchType : 'PORT'
		};
		me.openCodePopup('popup-cmmcdpopup', 'ctlFinalDes', params);
	},
	
	
	
	onControlBlur:function(field, event){
		var me = this;
		var refs = me.getReferences();
		var commonCodePopup = me.getStore('commonCodePopup');
		
		if(field.getValue() != '' && field.getValue() != null){
			if(field.getReference() == 'ctlFinalDes'){
				commonCodePopup.clearData();
				
				var params = {
					searchType:'PORT',
					cd: field.getValue().toUpperCase(),
					tyCd: 'CD'
				}
				
				commonCodePopup.load({
					params:params,
					callback:function(records, operation, success){
						if(success){
							if(records.length == 0){
								MessageUtil.warning("deliveryOrder", "deliveryOrder_cmdt_final_des_msg");
					    		return;
							}
							
							refs.ctlFinalDes.setValue(records[0].get('scd'));
						}
					}
				})
			}
			
			if(field.getReference() == 'ctlTypeOfPackage'){
				commonCodePopup.clearData();
				
				var params = {
					searchType: 'COMM', 	// CNTRY, CMDT, COMM, IMDG, PORT, VSCD, DLYCD, ONE_DG
					divCd: 'PKGTP',	// EMAILTMP, PKGTP
					lcd: 'MT',	// MT
					cd: field.getValue().toUpperCase(),
					tyCd: 'CD'
				}
				
				commonCodePopup.load({
					params:params,
					callback:function(records, operation, success){
						if(success){
							
							if(records.length == 0){
								MessageUtil.warning("deliveryOrder", "deliveryOrder_cmdt_typeofpkg_des_msg");
					    		return;
							}
							
							refs.ctlTypeOfPackage.setValue(records[0].get('scd'));
						}
					}
				})
			}
		}
		
	},
	
	openTpOfPkgPopup:function(){
		var me = this;
		var params = {
			searchType: 'COMM', 	// CNTRY, CMDT, COMM, IMDG, PORT, VSCD, DLYCD, ONE_DG
			searchDivCd: 'PKGTP',	// EMAILTMP, PKGTP
			searchLcd: 'MT',		// MT
			searchCol1: ''
		};
		me.openCodePopup('popup-cmmcdpopup', 'ctlTypeOfPackage', params);
	},
	
	onSelectModeOfOper:function(ele, rec, idx){
		var me = this;
		var refs = me.getReferences();
		var controlName = ele.getReference();
	
		if(controlName == 'ctlModeOper'){
			//variables was referred from flex version of MPTS,
			var isCVLC = (rec.get('cd') === 'CV' || rec.get('cd') === 'LC');
			var isLPLWC = (rec.get('cd') === 'LP' || rec.get('cd') === 'LWC');
			var isLWPLWCP = (rec.get('cd') === 'LWP' || rec.get('cd') === 'LWCP');
			var isWCWP = (rec.get('cd') === 'WC' || rec.get('cd') === 'WP');
			
			if(refs.refTxtCargoType.getValue() == 'Break Bulk Cargo' && (isCVLC || isLPLWC || isLWPLWCP || isWCWP)){
				MessageUtil.warning("deliveryOrder", "deliveryOrder_mode_operation_msg");
	    		return;
			}else{
				
				/*refs.ctlDDmt.setValue('0.0');
				refs.ctlDDmt.setEditable(false);
				refs.ctlDDmt.setDisabled(true);
				
				refs.ctlDLrryMt.setValue('0.0');
				refs.ctlDLrryMt.setEditable(false);
				refs.ctlDLrryMt.setDisabled(true);
				
				refs.ctlDWagonMt.setValue('0.0');
				refs.ctlDWagonMt.setEditable(false);
				refs.ctlDWagonMt.setDisabled(true);
				
				refs.ctlDCnvyMt.setValue('0.0');
				refs.ctlDCnvyMt.setEditable(false);
				refs.ctlDCnvyMt.setDisabled(true);
				
				refs.ctlDPplnMt.setValue('0.0');
				refs.ctlDPplnMt.setEditable(false);
				refs.ctlDPplnMt.setDisabled(true);*/
				
				if(rec.get('scd').indexOf('L') >= 0){
					if(Ext.isEmpty(refs.ctlDoLorryDmt.getValue())){
						refs.ctlDoLorryDmt.emptyText ='0';
						refs.ctlDoLorryDmt.setEditable(true);
						refs.ctlDoLorryDmt.setReadOnly(false);
					}else{
						refs.ctlDoLorryDmt.setEditable(true);
						refs.ctlDoLorryDmt.setReadOnly(false);
					}
				}else{
					refs.ctlDoLorryDmt.emptyText ='0';
					refs.ctlDoLorryDmt.setEditable(false);
					refs.ctlDoLorryDmt.setReadOnly(true);
				}
				
				//Ashley commented.
//				if(rec.get('scd').indexOf('W') >= 0){
//					if(Ext.isEmpty(refs.ctlDWagonMt.getValue())){
//						refs.ctlDWagonMt.emptyText ='0';
//						refs.ctlDWagonMt.setEditable(true);
//						refs.ctlDWagonMt.setReadOnly(false);
//					}else{
//						refs.ctlDWagonMt.setEditable(true);
//						refs.ctlDWagonMt.setReadOnly(false);
//					}
//					
//				}else{
//					refs.ctlDWagonMt.emptyText ='0';
//					refs.ctlDWagonMt.setEditable(false);
//					refs.ctlDWagonMt.setReadOnly(true);
//				}
				
//				if(rec.get('scd').indexOf('C') >= 0){
//					if(Ext.isEmpty(refs.ctlDCnvyMt.getValue())){
//						//refs.ctlDCnvyMt.setValue('0');
//						refs.ctlDCnvyMt.emptyText ='0';
//						refs.ctlDCnvyMt.setEditable(true);
//						refs.ctlDCnvyMt.setReadOnly(false);
//					}else{
//						refs.ctlDCnvyMt.setEditable(true);
//						refs.ctlDCnvyMt.setReadOnly(false);
//					}
//					
//				}else{
//					refs.ctlDCnvyMt.emptyText ='0';
//					refs.ctlDCnvyMt.setEditable(false);
//					refs.ctlDCnvyMt.setReadOnly(true);
//				}
				
//				if(rec.get('scd').indexOf('P') >= 0){
//					if(Ext.isEmpty(refs.ctlDPplnMt.getValue())){
//						//refs.ctlDPplnMt.setValue('0');
//						refs.ctlDPplnMt.emptyText ='0';
//						refs.ctlDPplnMt.setEditable(true);
//						refs.ctlDPplnMt.setReadOnly(false);
//					}else{
//						refs.ctlDPplnMt.setEditable(true);
//						refs.ctlDPplnMt.setReadOnly(false);
//					}
//					
//				}else{
//					refs.ctlDPplnMt.emptyText ='0';
//					refs.ctlDPplnMt.setEditable(false);
//					refs.ctlDPplnMt.setReadOnly(true);
//				}
				
				if(rec.get('scd') == '' || rec.get('scd') == null){
					//refs.ctlDLrryMt.setValue('0');
					refs.ctlDoLorryDmt.emptyText ='0';
					refs.ctlDoLorryDmt.setEditable(false);
					refs.ctlDoLorryDmt.setReadOnly(true);
					
					//refs.ctlDWagonMt.setValue('0');
//					refs.ctlDWagonMt.emptyText ='0';
//					refs.ctlDWagonMt.setEditable(false);
//					refs.ctlDWagonMt.setReadOnly(true);
					
					//refs.ctlDCnvyMt.setValue('0');
//					refs.ctlDCnvyMt.emptyText ='0';
//					refs.ctlDCnvyMt.setEditable(false);
//					refs.ctlDCnvyMt.setReadOnly(true);
					
					//refs.ctlDPplnMt.setValue('0');
//					refs.ctlDPplnMt.emptyText ='0';
//					refs.ctlDPplnMt.setEditable(false);
//					refs.ctlDPplnMt.setReadOnly(true);
				}
				
				if(rec.get('scd') == 'PL'){
					
					if(Ext.isEmpty(refs.ctlDoLorryDmt.getValue())){
						//refs.ctlDLrryMt.setValue('0');
						refs.ctlDoLorryDmt.emptyText ='0';
						refs.ctlDoLorryDmt.setEditable(false);
						refs.ctlDoLorryDmt.setReadOnly(true);
					}else{
						refs.ctlDoLorryDmt.setEditable(true);
						refs.ctlDoLorryDmt.setReadOnly(false);
					}
					
//					if(Ext.isEmpty(refs.ctlDCnvyMt.getValue())){
//						//refs.ctlDCnvyMt.setValue('0');
//						refs.ctlDCnvyMt.emptyText ='0';
//						refs.ctlDCnvyMt.setEditable(true);
//						refs.ctlDCnvyMt.setReadOnly(false);
//					}else{
//						refs.ctlDCnvyMt.setEditable(true);
//						refs.ctlDCnvyMt.setReadOnly(false);
//					}
					
					
				}
				
				var arrMode = ['RR', 'SE', 'OH']
				if(arrMode.indexOf(rec.get('scd')) >= 0){
					refs.ctlDDmt.emptyText = '0';
					//refs.ctlImt.setValue('');
					refs.ctlDDmt.setEditable(true);
					refs.ctlDDmt.setReadOnly(false);
				}else{
					refs.ctlDDmt.setEditable(false);
					refs.ctlDDmt.setReadOnly(true);
				}
			}
		}
		
		if(controlName == 'ctlIModeOper'){
			var isCVLC = (rec.get('cd') === 'CV' || rec.get('cd') === 'LC');
			var isLPLWC = (rec.get('cd') === 'LP' || rec.get('cd') === 'LWC');
			var isLWPLWCP = (rec.get('cd') === 'LWP' || rec.get('cd') === 'LWCP');
			var isWCWP = (rec.get('cd') === 'WC' || rec.get('cd') === 'WP');
			
			if(refs.refTxtCargoType.getValue() == 'Break Bulk Cargo' && (isCVLC || isLPLWC || isLWPLWCP || isWCWP)){
				MessageUtil.warning("deliveryOrder", "deliveryOrder_mode_operation_msg");
	    		return;
			}else{
				
				if(rec.get('scd').indexOf('L') >= 0){
					if(Ext.isEmpty(refs.ctlDoLorryImt.getValue())){
						//refs.ctlILrryMt.setValue('0');
						refs.ctlDoLorryImt.emptyText = '0';
						refs.ctlDoLorryImt.setEditable(true);
						refs.ctlDoLorryImt.setReadOnly(false);
					}else{
						refs.ctlDoLorryImt.setEditable(true);
						refs.ctlDoLorryImt.setReadOnly(false);
					}
				}else{
					refs.ctlDoLorryImt.emptyText = '0';
					refs.ctlDoLorryImt.setEditable(false);
					refs.ctlDoLorryImt.setReadOnly(true);
				}
				
				
//				if(rec.get('scd').indexOf('W') >= 0){
//					if(Ext.isEmpty(refs.ctlIWagonMt.getValue())){
//						//refs.ctlIWagonMt.setValue('0');
//						refs.ctlIWagonMt.emptyText = '0';
//						refs.ctlIWagonMt.setEditable(true);
//						refs.ctlIWagonMt.setReadOnly(false);
//					}else{
//						refs.ctlIWagonMt.setEditable(true);
//						refs.ctlIWagonMt.setReadOnly(false);
//					}
//				}else{
//					refs.ctlIWagonMt.emptyText = '0';
//					refs.ctlIWagonMt.setEditable(false);
//					refs.ctlIWagonMt.setReadOnly(true);
//				}
				
//				var arrMode = ['RR', 'SE', 'OH']
//				if(arrMode.indexOf(rec.get('scd')) >= 0){
//					if(Ext.isEmpty(refs.ctlIWagonMt.getValue())){
//						//refs.ctlImt.emptyText = '0';
//						//refs.ctlImt.setValue('');
//						refs.ctlImt.setEditable(true);
//						refs.ctlImt.setReadOnly(false);
//					}else{
//						refs.ctlImt.setEditable(true);
//						refs.ctlImt.setReadOnly(false);
//					}
//				}else{
//					refs.ctlImt.setEditable(false);
//					refs.ctlImt.setReadOnly(true);
//				}
			}
		}
		
	},
	
	onChangeNumber: function(e, text, prev){
		if((!/^[1-9][0-9]*$/gm.test(text)) && text != '0'){
			text = text.substr(1);
			e.setValue(text);
		}else if (text == '0'){
			e.setValue('0');
		}
	},
	
	onClickDownload: function() {
		var me = this;
		var store = me.getStore('forwarderNominationFileDownload');
		var grid = me.lookupReference('refForwarderNominationGrid');

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;
		
   		catgCd =  selection.get('vslCallId') + "|" +selection.get('blNo');
		
		store.load({
			params : {
				'pgmId' : 'DM105',
				'catgCd' : catgCd,
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
	
	onClickUpload:function(){
		var me = this;
		var grid = me.lookupReference('refForwarderNominationGrid');

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) {
			MessageUtil.warning('Information','You must select one row to upload file.');
			return;
		}
		
		if(me.operationCheck(selection.data.holdChk)){
			if (selection.data.packingList !== null	&& selection.data.packingList === 'N') {
				me.uploadFile(selection);
			} else {
				MessageUtil.question('Confirm', 'Do you want to overwrite the existed file', null,
					function(button){
						if (button === 'ok') {
							me.uploadFile(selection);
						}
					}
				)		
			}
		}
	},
	
	operationCheck: function(holdChk){
		if (holdChk === 'Y') {
			MessageUtil.warning('forwarderNomination', 'fwaNomi_operation_check_msg');
			return;
		}
		return true;
	},
	
	uploadFile:function(selection){
		var me = this;
		var refs = me.getReferences();
		var frm = refs.fileForm;
		var isFileUpload = false;
		var formData = new FormData(frm);
		var store = me.getViewModel().getStore('forwarderNominationFileUpload');
		store.removeAll();
		
		var input = document.querySelector("input[id='forwarderNominationFileUpload-button-fileInputEl']");
		file = input.files[0];
    		
		var record = Ext.create('MOST.model.common.FileUpload');
		record.set('pgmId', 'DM105');
		record.set('catgCd', selection.get('vslCallId') + "|" +selection.get('blNo'));
		record.set('fileStream', file);
		record.set('fileName', file.name);
		record.set('fileSize', file.size);
		record.set('workingStatus', WorkingStatus.INSERT);
		store.insert(0, record);
		
		var proxy = record.getProxy();
		proxy.url=store.getProxy().url;
		
		formData.append(file.name, file);
		me.processFileUpload(record, formData);
	},

	processFileUpload : function(record, formData){
		var me = this;
    	var xhr = new XMLHttpRequest();
    	
    	xhr.addEventListener('loadend', function(){
    		if(xhr.status === 200){
    			var rtnData = JSON.parse(xhr.responseText); // get filename - uuid
				record.set('ufileName',rtnData[record.data.fileName]);
				record.set('fileStream', null);

				me.processFileInfoUpdate(record);
    		}else{
    			MessageUtil.warning('warning_msg', 'fail_msg');
    		}
    		
    		Ext.MessageBox.hide();
    	});
    	
    	xhr.open('POST', MOST.config.Locale.getRestApiDestUrl() + '/file/manage/fileupload');
    	xhr.setRequestHeader('Authorization', MOST.config.Token.getTokenType() + ' ' + MOST.config.Token.getAccessToken());
    	xhr.send(formData);
    	
    	var msgBox = Ext.MessageBox.show({
			msg: 'Uploading data...',
			progressText: 'Progressing...',
			width:300,
			wait:true,
			waitConfig: {interval:200}
		});
	},
	
	processFileInfoUpdate:function(record){
		var me = this;
		var store = me.getViewModel().getStore('forwarderNominationFileUpload');
		var grid = me.lookupReference('refForwarderNominationGrid');

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection) {
			selection.set('packingList','Y');
			selection.set('ufileName',record.data.ufileName);
		}
		
		store.save({
			success:function(){
				MessageUtil.saveSuccess(); // Success Message
			}
		})
	},
	
	onDetailPreview:function(){
		var me = this;
		var refs = me.getReferences();
		var pdfStore = me.getStore('generatePDFDeliveryOrder');
		var theMain = me.getViewModel().getData().theJpvc;
		
		// add by Minh Hieu
		var grid = me.lookupReference('refForwarderNominationGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		// ----------end--------------
		if(!theMain){
			MessageUtil.warning("Delivery Order", "selectvesselid_msg");
			return;
		}
		
		pdfStore.load({
			params:{
				vslCallId: theMain.get('vslCallId'),
				//blno: theMain.get('blno'),
				// add by Minh Hieu
				blno: selection.data.blNo,
				// ----end----
				delvtpcd: theMain.get('delvTpCd'),
				userId: MOST.config.Token.getUserId(),
				searchType:'PDF'
			},
			callback: function(records, operation, success) {
				if (success) {
					me.openPDFPreview (records, operation, success);
				}
			}
		})
		
	},
	
	onDetailDownload(){
		var me = this;
		var refs = me.getReferences();
		
		var theMain = me.getViewModel().getData().theJpvc;
		if(!theMain){
			MessageUtil.warning("Delivery Order", "selectvesselid_msg");
			return;
		}
		
		var params = {
				initSearch: true
			};
		me.openCodePopup('popup-exporttypepopup','refBtnDownload', params);
	},
	
	onDownloadExport:function(){
		var me = this; 
		var refs = me.getReferences();
		var pdfStore = me.getStore('generatePDFDeliveryOrder');
		var theMain = me.getViewModel().getData().theJpvc;
		var ExportRadioChk = refs.refRadioReportType.getValue().rb;
		
		// add by Minh Hieu
		var grid = me.lookupReference('refForwarderNominationGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		// ----------end--------------
		
		pdfStore.load({
			params:{
				vslCallId: theMain.get('vslCallId'),
				//blNo: theMain.get('blNo'),
				// add by Minh Hieu
				blno: selection.data.blNo,
				// ----end----
				delvtpcd: theMain.get('delvTpCd'),
				userId: MOST.config.Token.getUserId(),
				searchType:ExportRadioChk
			},
			callback: function(records, operation, success) {
				if (success) {
					var content = records[0].data.content.replace(/&lt;/gi,'<').replace(/&gt;/gi,'>'); 
					Ext.exporter.File.saveBinaryAs(content, records[0].data.fileName);
				}
			}
		});
	},	
	
	 exportTo: function(btn) {
	    	var me = this;
	    	var refs = me.getReferences();
	    	
	        var cfg = Ext.merge({
	            title: 'Forwarder Nomination',
	            fileName: 'Forwarder_Nomination' + '.' + (btn.cfg.ext || btn.cfg.type)
	        }, btn.cfg);

	        var grid = refs.refForwarderNominationGrid;
	        grid.saveDocumentAs(cfg);
	    },
	
	onChangeMtDirectField: function(){
		var me = this;
		var refs = me.getReferences();
		
		refs.ctlDDmt.setValue(Number(refs.ctlDoVslDmt.getValue()) + Number(refs.ctlDoLorryDmt.getValue()));
	},
	
	onChangeQtyIndirectField: function(){
		var me = this;
		var refs = me.getReferences();
		var theMain = me.getViewModel().get('theMain'); 
		
		if(me.DO3 != theMain.get('dono')){
			me.DO3 = theMain.get('dono');
			return;
		}
		
		refs.ctlImt.setValue(Number(refs.ctlIQty.getValue()) * Number(theMain.data.eachWgt));
		refs.ctlIm3.setValue(Number(refs.ctlIQty.getValue()) * Number(theMain.data.eachVol));
	},
	
	onChangeM3DirectField: function(){
		var me = this;
		var refs = me.getReferences();
		
		refs.ctlDM3.setValue(Number(refs.ctlDoVslDm3.getValue()) + Number(refs.ctlDoLorryDm3.getValue()));
	},
	
	onChangeDQtyVslField: function(){
		var me = this;
		var refs = me.getReferences();
		var theMain = me.getViewModel().get('theMain'); 
		
		if(me.DO != theMain.get('dono')){
			me.DO = theMain.get('dono');
			return;
		}
		
		refs.ctlDQty.setValue(Number(refs.ctlDoVslDQty.getValue()) + Number(refs.ctlDoLorryDQty.getValue()));
		refs.ctlDoVslDmt.setValue(Number(refs.ctlDoVslDQty.getValue()) * Number(theMain.data.eachWgt));
		refs.ctlDoVslDm3.setValue(Number(refs.ctlDoVslDQty.getValue()) * Number(theMain.data.eachVol));
	},
	
	onChangeDQtyLorryField: function(){
		var me = this;
		var refs = me.getReferences();
		var theMain = me.getViewModel().get('theMain'); 
		
		if(me.DO1 != theMain.get('dono')){
			me.DO1 = theMain.get('dono');
			return;
		}
		
		refs.ctlDQty.setValue(Number(refs.ctlDoVslDQty.getValue()) + Number(refs.ctlDoLorryDQty.getValue()));
		refs.ctlDoLorryDmt.setValue(Number(refs.ctlDoLorryDQty.getValue()) * Number(theMain.data.eachWgt));
		refs.ctlDoLorryDm3.setValue(Number(refs.ctlDoLorryDQty.getValue()) * Number(theMain.data.eachVol));
	},
	/**
	 * =========================================================================================================================
	 * DETAIL END
	 */
	
});