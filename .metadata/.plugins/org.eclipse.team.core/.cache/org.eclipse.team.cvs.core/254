Ext.define('MOST.view.administrator.CompanyRegisterController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
     
	],

	alias: 'controller.companyregister',
	
	checkValid: false,
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	
	MAIN_GRID_REF_NAME: 'companyRegsiterGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'companyRegister',         // Main Store Name
	CONN_TYPE_COMBO_STORE: 'connTypeCombo',
	CONNSUB_TYPE_COMBO_STORE: 'connSubTypeCombo',
	SHIPPER_LIST_STORE: 'shpList',
	COMPANY_REGISTER_DETAIL_STORE: 'companyRegisterDetail',
    
    config : {
    	chkPtnrCode: false,
    	chkPtnrName: false
	},
	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
		
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */	
	onLoad: function() {
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create('MOST.model.administrator.SearchCompanyRegisterParm');
		
        if(MOST.config.Token.getUserType() == 'E'){
        	refs.txtPtnrCode.setValue(MOST.config.Token.getPtnrCode());
        	refs.txtPtnrCode.setEditable(false);
        }
        
        me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch:searchParm});
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
    },
	
	onDetailLoad:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;

		if(recvData == undefined){ // CREATE
			recvData = Ext.create('MOST.model.administrator.CompanyRegister');
			recvData.data.workingStatus = WorkingStatus.INSERT;
		}

//		var connTypeCombo = me.getStore(me.CONN_TYPE_COMBO_STORE);
//		connTypeCombo.load();
//		
//		var connSubTypeCombo = me.getStore(me.CONNSUB_TYPE_COMBO_STORE);
//		connSubTypeCombo.load();
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.PTNR_PAYMENT_TYPE, 'paymentTypeCombo');
		me.setComboBoxWithLocalCache(CacheServiceConstants.PTNR_COMPANY_STATUS, 'companyStatusCombo');
		me.setComboBoxWithLocalCache(CacheServiceConstants.PTNR_PROFILE_STATUS, 'profileStatusCombo');
		me.setDetailControl(recvData);
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
		var store = this.getStore(me.MAIN_STORE_NAME);
		var params = me.getSearchCondition();
		
		if(Number.parseInt(refs.txtBalStart.getValue()) > Number.parseInt(refs.txtBalEnd.getValue())){
			MessageUtil.warning("companyRegister", "Balance Range is not valid");
			return;
		}
		
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if(success) {
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					}
				}
			}
		});
	},
	
	onAdd: function(){
		var me = this;
		var refs = me.getReferences();
		var storeSHP = me.getStore(me.SHIPPER_LIST_STORE);
		
		storeSHP.removeAll();
		me.openDetailPopup(null);
	},
	
	onRemove: function() {
		var me = this;
		var refs = me.getReferences();
		var store = this.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelectionModel().getSelection()[0];
		
		if(selection.data.cntUser != 0){
			MessageUtil.warning("companyRegister", "company_delete_existuser");
			return;
		}
		
		if (selection) {
			Ext.Msg.show({
		        title:'Remove',
		        message: 'Are you going to remove this Company?',
		        buttons: Ext.Msg.YESNO,
		        icon: Ext.Msg.QUESTION,
		        fn: function(btn) {
		        	if (btn === 'yes') {
		        		store.remove(selection);
		        		me.deleteProcess(selection);
		        	}
		        }
			});
		} else {
			Ext.Msg.alert('Remove', TSB.locale.i18n.Bundle.instance.getMsg('company_delete_select'));
		}
    },
    
    onDblClick: function(grid, record, tr, rowIndex, e, eOpts) {
		var me = this;
		var refs  = me.getReferences();
		var ptnrTps = record.get('ptnrTp').split(',');
		
		if(ptnrTps.length > 1){ // multi company type
			var params = {
					ptnrTypes: record.get('ptnrTp')
				};
			me.openCodePopup('popup-ptnrtypeselection', 'refPtnrTypes', params);
		}else{
			record.set('ptnrType' , ptnrTps[0]);
			record.dirty = false;
			me.openDetailPopup(record);
		}
	}, 
	
	setDetailControl:function(recvData){
		var me = this;
		var refs = me.getReferences();
		var companyCode = recvData.get('companyCode');
		var ptnrTypes = recvData.get('ptnrTp');
		var ptnrType = recvData.get('ptnrType');
		var detailView = me.getDetailBizView();

		if(detailView.items.get(0).recvData == null){
			detailView.items.get(0).recvData = recvData;    
		}
		
		if(recvData.get(WorkingStatus.FIELD_NAME) == WorkingStatus.INSERT){
			var theModel = Ext.create('MOST.model.administrator.CompanyRegister');
			
			theModel.set('companyStatus','Y');
			theModel.set('profileStatus','Y');
			
			refs.refImageUploadPreview.setSrc('resources/images/logo/noimage.png');
        	refs.refImageUploadPreview.show();
        	
			me.getViewModel().setData({theDetail:theModel});
		}else{
			//refs.refCompanyStatus.setDisabled(true);
			var companyRegisterDetail = me.getStore(me.COMPANY_REGISTER_DETAIL_STORE);
			
			companyRegisterDetail.load({
				params: {
					companyCode : companyCode,
					ptnrType : ptnrType
				},
				callback: function(records, operation, success) {
					if (success) {
						if (records.length > 0) {
							// Main Detail
							var theMainModel = Ext.create('MOST.model.administrator.CompanyRegister');
							
							theMainModel.phantom = false; // UPDATE
							theMainModel.data = records[0].data;
							theMainModel.data.ptnrTp = ptnrTypes;
							me.getViewModel().setData({theDetail:theMainModel});
							
							if(me.getViewModel().data.theDetail.get('accountHold') == 'Y'){
								refs.refAccountHold.checked = true;
							}else {
								refs.refAccountHold.checked = false;
							}
							
							if(me.getViewModel().data.theDetail.get('holdChk') == 'Y'){
								refs.refHoldChk.checked = true;
							}else{
								refs.refHoldChk.checked = false;
							}
							
							var shpList = me.getViewModel().getStore(me.SHIPPER_LIST_STORE);
							
							shpList.setData(theMainModel.data.shpList);
							shpList.commitChanges();
							
							refs.refPtnrCode.setEditable(false);

							var  refChkGrpPtnrTypes = refs.refChkGrpPtnrTypes;
							
							refChkGrpPtnrTypes.setValue({rb: [theMainModel.get('ptnrType')]});
							
							if(theMainModel.get('ptnrType') == 'SHA'){
								me.enableSHP(true);
		        				me.enableCustom('SHA', true);
							}else{
								refs.refMarineAgentCode.setEditable(false);
								refs.refMarineAgentNm.setEditable(false);
								refs.refMarineAgentCode.setValue('');
								refs.refMarineAgentNm.setValue('');
							}
							
							if(theMainModel.get('ptnrType') == 'SHP'){
		        				refs.refShpLineType.show();
							}
							
							if (theMainModel.get('ptnrType')  == 'FWD') {
								me.enableCustom('FWD', true);
		        			}
							
                            var theDetail = me.getViewModel().get('theDetail');
                            
                            if(theMainModel.get('companyStatus') == null || theMainModel.get('companyStatus') == ''){
                            	theDetail.set('companyStatus','Y');
                			}
                			if(theMainModel.get('profileStatus') == null || theMainModel.get('profileStatus') == ''){
                				theDetail.set('profileStatus','Y');
                			}
		        			
		        			if(theDetail.get('bal') <= 0){
		        				refs.refBalance.setFieldStyle('color: red;');
		        			}
		        			
		        			if(theDetail.get("ptnrImage") != null){
		                		me.getViewModel().set('imgData','data:image/jpg;base64,' + theDetail.get('ptnrImage'));
		                	}else{
		                		me.getViewModel().set('imgData',"");
		                	}
		        			
		        			me.checkValid = true;
						}
					}
				}
			});
		}
	},
	
	// Toolbar Save Button
	onDetailSave:function(){
		var me = this;
		var refs = me.getReferences();
		var refChkGrpPtnrTypes = refs.refChkGrpPtnrTypes;
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theDetail');
		
		if(detailView){
			var infoForm = detailView.down('form').getForm();
			
			if(infoForm.isValid()){
				if(refChkGrpPtnrTypes.getValue().rb == null || refChkGrpPtnrTypes.getValue().rb == ''){
					MessageUtil.warning("companyRegister", "company_select_partnertype");
					return;
				}
				
				//Duplication check
				if(detailItem.phantom) {
					me.checkCode();
				}
				else {
					me.saveProcess();
				}
			} else {
				MessageUtil.mandatoryFieldInValid();
			}
		}
	},
	
	onConnTypeSelect: function(field, newValue) {
		var me = this;
		var refs = me.getReferences();
		
		if(newValue == 'I'){
			refs.refConnSubType.show();
		}else{
			refs.refConnSubType.hide();
		}
	},
	
	addShippingLine: function() {
		var me = this;
		var refs = me.getReferences();
		var companyCode = refs.refPtnrCode; 
		var store = this.getStore(me.SHIPPER_LIST_STORE);
		var record = Ext.create('MOST.model.administrator.CompanyRegister', {
			agencyCode: companyCode.getValue(),
			ptnrType: 'SHP'
		});
		
		if(companyCode == ''){
			MessageUtil.warning("companyRegister", "company_notexist_ptnrcode");
			return;
		}
		
		store.insert(0, record);
		store.commitChanges();
	},
	
	removeShippingLine: function() {
		var me = this;
		var refs = me.getReferences();
		var store = this.getStore(me.SHIPPER_LIST_STORE); 
		var grid = me.lookupReference('refShpList');
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		
		store.remove(selection);
		store.commitChanges();
	},
	
	openShpLinePopup: function( table, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
		var me = this;
		var refs = me.getReferences();
		var params = {
				ptnrType: CodeConstants.CM_PTNRTP_SHP
			};
		me.openCodePopup('popup-partnercdpopup', 'refSHP', params);
	},
	
	onCheckChanged: function(column, rowIndex, checked) {
		var me = this;
		var refs = me.getReferences();
		var refChkGrpPtnrTypes = refs.refChkGrpPtnrTypes;
		var view = me.getDetailBizView();
		
		if(refChkGrpPtnrTypes.getValue().rb != null && refChkGrpPtnrTypes.getValue().rb.indexOf('SHA') > -1){					
			view.setHeight(560);
			
			this.enableSHP(true);
			refs.refBelongToPort.show();
			refs.refMarineAgentCode.setEditable(true);
			refs.refMarineAgentNm.setEditable(true);
		}else {
			view.setHeight(350);
			this.enableSHP(false);
			this.enableCustom('SHA',false);
			refs.refBelongToPort.hide();
			refs.refMarineAgentCode.setEditable(false);
			refs.refMarineAgentNm.setEditable(false);
			refs.refMarineAgentCode.setValue('');
			refs.refMarineAgentNm.setValue('');
		}
				
		if ( refChkGrpPtnrTypes.getValue().rb != null &&  refChkGrpPtnrTypes.getValue().rb.indexOf('FWD') > -1) {
			
		} else {
			this.enableCustom('FWD',false);
		}
		
		if( refChkGrpPtnrTypes.getValue().rb != null &&  refChkGrpPtnrTypes.getValue().rb.indexOf('SHP') > -1){
			
		} else {
			refs.refShpLineType.hide();
		}
		
		me.togglePtnrType();
	},

	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.administrator.SearchCompanyRegisterParm';
		searchBizParm.serviceID = 'MOST.companyRegister.selectCompanyRegisterList'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
	
	onUploadImage:function(field){
		var me = this;
     	var refs = me.getReferences();
    	var reader = new FileReader();
    	var dom = Ext.getDom(field.fileInputEl);
		
    	reader.onload = function (e){  
			var imageFile = e.target.result;
			var saveImage = imageFile.split(',');
			
			me.getViewModel().set('imgData',imageFile); 
		}
		
		reader.readAsDataURL(dom.files[0]);
	},
	
	onImageRemove : function() {
		var me = this;
		var refs = me.getReferences();
		
  		me.getViewModel().set('imgData','');
	},
	
	 /**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */
	
	/**
	 * GENERAL METHOD START
	 * =========================================================================================================================
	 */
	getSearchCondition: function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		var dtFromVal = Ext.Date.format(refs.txtDateFrom.getValue(), MOST.config.Locale.getShortDate());
		var radChkval = refs.radChk.getValue().member;
		
		params['ptnrType'] = searchParm.data.ptnrType;
        params['companyCode'] = searchParm.data.companyCode;
		params['engSnm'] = searchParm.data.engSnm;
		params['accNo'] = searchParm.data.accNo;
		params['balRangeFrom'] = searchParm.data.balRangeFrom;
		params['balRangeTo'] = searchParm.data.balRangeTo;
		params['regTimeFrom'] = dtFromVal;
		params['checkMember'] = radChkval;
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
		
		return params;
	},
	
	saveProcess:function(){
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var storeSHP = me.getStore(me.SHIPPER_LIST_STORE);
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var detailItem =  me.getViewModel().get('theDetail');
		var detailView = me.getDetailBizView();
		var isCreated = detailItem.phantom;
		var infoForm = detailView.down('form').getForm();
		var recvData = detailView.items.get(0).recvData;
		var shippingLines = new Array();
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		for(var i = 0; i < storeSHP.data.length; i++){
			var record = storeSHP.data.items[i];
			
			if(record.get('companyCode') == ''){
				MessageUtil.warning("companyRegister", "company_select_shp");
				return;
			}
			
			shippingLines.push(record.data);
			console.log(record);
			console.log(shippingLines);
		}
		
		if(detailItem.data.crud == WorkingStatus.INSERT){
			detailItem = new MOST.model.administrator.CompanyRegister(infoForm.getValues());
			detailItem.data.crud = WorkingStatus.INSERT;
		}

		detailItem.set('userId', MOST.config.Token.getUserId());
		
		if(refs.refHoldChk.getValue() == true){
			detailItem.data.holdChk =  'Y';
		}else{
			detailItem.data.holdChk =  'N';
		}
		
		if(refs.refAccountHold.getValue() == true){
			detailItem.data.accountHold =  'Y';
		}else{
			detailItem.data.accountHold =  'N';
		}
		
		detailItem.data.extSHA = 'N';
		detailItem.data.extFWD = 'N';
		detailItem.data.jpbiShaYn = 'N';
		
		if(refs.refCusLisExtSha.getValue() == true)
			detailItem.data.extSHA = 'Y';
		if(refs.refCusLisExtFwd.getValue() == true)
			detailItem.data.extFWD = 'Y';
		
        detailItem.set('ptnrTp', refs.refChkGrpPtnrTypes.getValue().rb.toString());
        //detailItem.set('ptnrType', refs.refChkGrpPtnrTypes.getValue().rb.toString());
        detailItem.set('rb', refs.refChkGrpPtnrTypes.getValue().rb.toString());
		detailItem.set('shpList', shippingLines);

		detailItem.data.customEdate =detailItem.data.customEdateSHA==null?null:Ext.Date.format(detailItem.data.customEdateSHA, MOST.config.Locale.getShortDate());
		detailItem.data.customSdate = detailItem.data.customSdateSHA==null?null:Ext.Date.format(detailItem.data.customSdateSHA, MOST.config.Locale.getShortDate());
		detailItem.data.customEFWD = detailItem.data.customEdateFWD==null?null:Ext.Date.format(detailItem.data.customEdateFWD, MOST.config.Locale.getShortDate());
		detailItem.data.customSFWD = detailItem.data.customSdateFWD==null?null:Ext.Date.format(detailItem.data.customSdateFWD, MOST.config.Locale.getShortDate());
		detailItem.data.strGstRegDt =detailItem.data.gstRegDt==null?null:Ext.Date.format(detailItem.data.gstRegDt, MOST.config.Locale.getShortDate());
		detailItem.data.strGstApplyDt = detailItem.data.gstApplyDt==null?null:Ext.Date.format(detailItem.data.gstApplyDt, MOST.config.Locale.getShortDate());
		detailItem.data.strGstExpiredDt = detailItem.data.gstExpiredDt==null?null:Ext.Date.format(detailItem.data.gstExpiredDt, MOST.config.Locale.getShortDate());
		
		var imageFile = me.getViewModel().get('imgData'); 
		var saveImage = "";
		
		if(imageFile != null){
			saveImage = imageFile.split(',');
			detailItem.set("ptnrImage",saveImage[1]);
		}
		
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = isCreated;
		updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		updateParm.set('item', detailItem.data);
		
		updateParm.save({
			success : function(records,success){
				if(isCreated){// FROM UPDATE
					var ptnrTps = detailItem.get('ptnrTp').split(',');
					
					me.updateRecord(recvData, detailItem);
					recvData.set('ptnrType' , ptnrTps[0]);
					recvData.set('workingStatus' ,WorkingStatus.UPDATE);
					isCreated = false;
					me.onDetailLoad();
				}else {// FROM CREATE
					grid.getSelectionModel().select(detailItem);
					detailItem.dirty = false;
					
					var ptnrTps = detailItem.get('ptnrTp').split(',');
					
					detailItem.set('ptnrType' , ptnrTps[0]);
					me.setDetailControl(detailItem);
				}
				
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
					function(button){
						if (button === 'ok') {
							me.onSearch();
							detailItem.modified = null;
							
							var win = Ext.WindowManager.getActive();
							
							if (win) {
							    win.close();
							}
							
							detailView.close();
						}else{
							me.onSearch();
							detailItem.modified = null;
							
							var win = Ext.WindowManager.getActive();
							
							if (win) {
							    win.close();
							}
							detailView.close();
						}
					}
				);
			}
		});
	},
	
    deleteProcess:function(selections) {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = false;
		updateParm.drop();
		updateParm.set('workingStatus', WorkingStatus.DELETE);
		updateParm.set('items', new Array());
		updateParm.get('items').push(selections.data);
		
		updateParm.save({
			success : function(record, operation) {
				store.commitChanges();
				MessageUtil.saveSuccess();
				me.onSearch();
			}
		});
	},
    
    checkCode: function() {
    	var me = this;
    	var refs = me.getReferences();
    	var companyCode = refs.refPtnrCode.getValue();
    	var store = this.getStore('ptnrCodeValidation');
    	
    	store.load({
			params: {
				companyCode: companyCode
			},
			callback: function(records, operation, success) {
				if (records.length > 0 ) {
					//return false
					MessageUtil.warning("companyRegister", "company_code_invalid");
					return;
				}else {
					//return true;
					me.saveProcess();
				}
					
			}
		});
    },
    
    checkName: function() {
    	var me = this;
    	me.checkValid = false;
    },
    
    checkRegNo: function() {
    	var me = this;
    	me.checkValid = false;
    },
    
    checkLicenseSHA: function(btn) {
    	var me = this;
    	me.checkValid = false;
    },
    
    checkLicenseFWD: function(btn) {
    	var me = this;
    	me.checkValid = false;
    },
	
	onCancel: function() {
		this.getView().up('window').close();
	},
	
	enableSHP: function(isEnable) {
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refShpList;
		
		refs.refMarineAgentCode.setEditable(true);
		refs.refMarineAgentNm.setEditable(true);
		
		if (isEnable) {
			grid.show();
		} else {
			grid.hide();
		}
	},
	
	enableCustom: function(type,isEnable) {
		var me = this;
		var refs = me.getReferences();
		var customSHA = refs.refCusSha;
		var customDateSHA = refs.refCusDateSha;
		var customFWD = refs.refCusFwd;
		var customDateFWD = refs.refCusDateFwd;
		
		if(type == 'SHA'){
			if (isEnable) {
				customSHA.show();
				customDateSHA.show();
			} else {
				customSHA.hide();
				customDateSHA.hide();
			}
		}

		if(type == 'FWD'){
			if (isEnable) {
				customFWD.show();
				customDateFWD.show();
			} else {
				customFWD.hide();
				customDateFWD.hide();
			}
		}
	},
	
	togglePtnrType: function(){
        var me = this;
		var refs = me.getReferences();
		var refChkGrpPtnrTypes = refs.refChkGrpPtnrTypes;

		refs.refChkSHP.setDisabled(false);
		refs.refChkSHA.setDisabled(false);
        refs.refChkTRK.setDisabled(false);
        refs.refChkFWD.setDisabled(false);
        refs.refChkCNS.setDisabled(false);
        refs.refChkTLY.setDisabled(false);

		if(refChkGrpPtnrTypes.getValue().rb != null){
			if(refChkGrpPtnrTypes.getValue().rb.indexOf('SHP') > -1 || refChkGrpPtnrTypes.getValue().rb.indexOf('GVM') > -1){
				refs.refChkSHA.setDisabled(true);
				refs.refChkTRK.setDisabled(true);
				refs.refChkFWD.setDisabled(true);
				refs.refChkCNS.setDisabled(true);
				refs.refChkTLY.setDisabled(true);

				if(refChkGrpPtnrTypes.getValue().rb.indexOf('SHP') > -1){
					refs.refChkSHP.setDisabled(false);
				}

				if(refChkGrpPtnrTypes.getValue().rb.indexOf('GVM') > -1){
				   refs.refChkSHP.setDisabled(true);
				}
			}else{
			   refs.refChkSHP.setDisabled(true);
			}
		} 
		
		var theDetail = me.getViewModel().get('theDetail');
		
		if(theDetail.data.oldPtnrCode != ''){
            var checkedRef = 'refChk'+ theDetail.get('ptnrType');
		    me.lookupReference(checkedRef).setDisabled(true);
		}
	},
	
	/**
	 * Etc
	 */
	createPtnrInfoWindow: function() {
		var me = this;
		var selectedPtnrTypes;
		var selectedSHPs;
		var selectedContts;
		var cnt = this.lookupReference(me.MAIN_GRID_REF_NAME).getSelectionModel().getSelection().length;
		
		if(cnt > 0){
			selectedPtnrTypes = this.lookupReference(me.MAIN_GRID_REF_NAME).getSelectionModel().getSelection()[0].get('ptnrTypes');
			selectedSHPs = this.lookupReference(me.MAIN_GRID_REF_NAME).getSelectionModel().getSelection()[0].get('shippingLines');
			selectedContts = this.lookupReference(me.MAIN_GRID_REF_NAME).getSelectionModel().getSelection()[0].get('contracts');
		}
		
		var ptnrInfoWindow = Ext.create('widget.window', {
			id: 'windowPtnrDtl',
			title: 'Partner Info',
			modal: true,
			resizable: false,
			collapsible: true,
			constrain: true,
			autoScroll: true,
			width: 800,
			height : 600,
			items: [{
				xtype: 'ptnrlistdetail',
				ptnrTypes: selectedPtnrTypes,
				shippingLines: selectedSHPs,
				contracts: selectedContts
			}]
		}).show();
		
		return ptnrInfoWindow;
	},
	
	dateRenderer: function(value, metaData) {
		var result = "";
		
		if (value) {
			var d = new Date();
			
			d.setTime(value);
			result = Ext.Date.format(d, 'Y-m-d H:i:s');
		}
		
		return result;
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var record = grid.getSelection() == null ? null : grid.getSelection()[0];
		var store = me.getStore(me.SHIPPER_LIST_STORE);
		
		if(targetControl === 'refSHP'){
			if(returnValue != null){
				var selection = me.lookupReference('refShpList').getSelection()[0];
				var checkExist = false;
				
				for(var i = 0; i < store.data.length; i++){
					if(returnValue.code == store.data.items[i].data.companyCode){
						checkExist = true;
						break;
					}
				}
				
				if(checkExist == true){
					MessageUtil.warning("companyRegister", "shipping_line_duplicate");
					return;
				}else{				
					selection.set('companyCode', returnValue.code);
					selection.set('shpNm', returnValue.codeName);
				}
			}
		}
		else if(targetControl === 'refPtnrTypes'){
			if(returnValue != null){
				record.set('ptnrType' , returnValue);
				record.dirty = false;
				me.openDetailPopup(record);
			}
		}
	},
});