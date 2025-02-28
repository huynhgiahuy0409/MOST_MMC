Ext.define('MOST.view.document.DeliveryOrderController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.deliveryorder',
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAX_PERIOD_DAY : 14,
	MAX_DATE_ALLOW : 14,	// MAX PERIOD DATE (a week)
	authority: '',
	MAIN_GRID_REF_NAME: 'refListOfDeliveryOrderGrid',
    MAIN_STORE_NAME: 'listOfDeliveryOrder',
    SUB_DO_GRID_REF_NAME: 'refListOfSubDeliveryOrderGrid',
	SUB_DO_STORE_NAME: 'listOfSubDeliveryOrder',
	PACKAGE_DETAIL_GRID_REF_NAME: 'refDoPkgDetailGrid',
	PACKAGE_DETAIL_STORE: 'doPkgDetail',
	PARAMETTER_CHECK_DELIVERY_MODE_COMBOBOX_STORE: 'delvModeCombo',
	CARGO_OPERATION_STORE: 'cgOpList',
	DIRECT_TRANSPORT_STORE: 'directTstpCombo',
	INDIRECT_TRANSPORT_STORE: 'indirectTstpCombo',
	DELIVERYORDER_DETAIL_STORE: 'deliveryOrderDetail',
	GENERATE_PDF_DO_STORE: 'generatePDFDeliveryOrder',
	DO_WEIGHT_CHECK: 'deliveryOrderWgtChk',
	SUB_DO_NO_COMBO: 'subDoNoList',
	cudFlag: '',
	
	FILE_GRID_REF_NAME : 'refDeliveryOrderFileUploadGrid', // File Grid Name  
	FILE_UPLOAD_STORE_NAME : 'deliveryOrderFileUpload', // File Store Name
	FILE_DOWNLOAD_STORE_NAME : 'deliveryOrderFileDownload', // File Store Name
	CONTAINER_GRID_REF_NAME: 'refROROGrid',				// Main Grid Name 
	CONTAINER_STORE_NAME: 'unitList',
	
	SDO_PDF_FILE: 'RCS018.jrxml',
	SDO_PDF_FUNCTION: 'MOST.documentReport.previewSubDeliveryOrderReport',
	DO1: "",
	DO2: "",
	DO3: "",
 	roroQty : 0,
 	CHECKING_FLAG: true,
 	
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
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.DIRECT_INDIRECT_MODE, me.PARAMETTER_CHECK_DELIVERY_MODE_COMBOBOX_STORE); 

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
		var searchParm = Ext.create('MOST.model.document.SearchDeliveryOrderParm');

		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch:searchParm});
		
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
	},
	
	onDetailLoad:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var refs = me.getReferences();
		var directTstpCombo = me.getViewModel().getStore(me.DIRECT_TRANSPORT_STORE);
		var indirectTstpCombo = me.getViewModel().getStore(me.INDIRECT_TRANSPORT_STORE);
		directTstpCombo.load();
		indirectTstpCombo.load();
		
		refs.ctlPartnerCodeMultiField.refs.ctlField.setEditable(true); // editable for partnercdformultifield
		
		me.setDetailInitialize();
	},
	
	onSubDODetailLoad: function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var refs = me.getReferences();
		var recvData = detailView.items.get(0).recvData;
		var directTstpCombo = me.getViewModel().getStore(me.DIRECT_TRANSPORT_STORE);
		var indirectTstpCombo = me.getStore(me.INDIRECT_TRANSPORT_STORE);
		var bizViewAlias = me.getView().detailViewAlias;
		
		directTstpCombo.load();
//		indirectTstpCombo.load();
		indirectTstpCombo.load({
			params:{
				cgTpCd: recvData.get('cgtpcd')			
			},
			callback: function(records, operation, success) {
				if(success){
				}	
			}			
		});
		refs.ctlPartnerCodeMultiField.refs.ctlField.setEditable(true); // editable for partnercdformultifield
		
		if(bizViewAlias == 'app-subdeliveryorderdetail') {
			var cargoType = recvData.data.cgtpcd;
			if (cargoType == 'RCV') {
				refs.ctlDDmt.setReadOnly(true);
				refs.ctlDQty.setReadOnly(true);
				refs.ctlDM3.setReadOnly(true);
				refs.ctlImt.setReadOnly(true);
				refs.ctlIQty.setReadOnly(true);
				refs.ctlIm3.setReadOnly(true);
			}
		} else {
			refs.ctlDDmt.setReadOnly(false);
			refs.ctlDQty.setReadOnly(false);
			refs.ctlDM3.setReadOnly(false);
			refs.ctlImt.setReadOnly(false);
			refs.ctlIQty.setReadOnly(false);
			refs.ctlIm3.setReadOnly(false);
		}
		
		me.setDetailInitialize();
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
    	
    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						var subDoStore = me.getStore(me.SUB_DO_STORE_NAME);
						
						subDoStore.load({
							params:{
								vslCallId: params.vslCallId,
								blno: params.blno,
								sdono: params.sdono
							}
						});
					}else{
						MessageUtil.warning("deliveryOrder", "datanotfound_msg");
						return;
					}
				}
			}
		});
	},
	
	onAdd: function(){
		var me = this;
     	var refs = me.getReferences();
     	var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
     	var selection = grid.getSelection() == null ? null : grid.getSelection()[0];

     	if(selection == null){
     		return;
     	}

     	//selection.set('crud', 'C');
     	
     	me.cudFlag = 'C';
     	
     	if(selection.get('dono') == null || selection.get('dono') == ''){
     		MessageUtil.warning("deliveryOrder", "deliveryOrder_bl_do_not_have_do_msg");
     		return;
     	}
     	
     	me.getView().detailViewAlias = 'app-subdeliveryorderdetail';
		me.openDetailPopup(selection, "app-subdeliveryorderdetail");
	},
	
	onDetailSave:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theMain');
		var userAgency = MOST.config.Token.getAgencyCode();
		var bizViewAlias = me.getView().detailViewAlias;
		var unitListStrore = me.getStore('unitList');
		
		if (me.authority === CodeConstants.CM_PTNRTP_CNS) {
			if (MOST.config.Token.getPtnrCode() != refs.ctlConsigneeCd.getValue()) {
				MessageUtil.warning("deliveryOrder", "deliveryOrder_bl_notassign_msg");
				return;
			}
		} else if (me.authority != '' && me.authority != CodeConstants.CM_PTNRTP_BH && me.authority != CodeConstants.CM_PTNRTP_FWD){
			MessageUtil.warning("deliveryOrder", "deliveryOrder_bl_notassign_msg");
			return;
		}
		
		if(detailView){
			var infoForm = detailView.down('form').getForm();
			var cargoType = refs.refTxtCargoType.getValue();
			var deliveryMode = detailItem.get('delvTpNm');
			
			detailItem.set('userId', MOST.config.Token.getUserId());
			
			if (!StringUtil.isNullorEmpty(deliveryMode)) {
				if (me.onCheckZeroValueByDelvMode(deliveryMode, cargoType) == false) {
					return;
				}
			}
			
			if(detailItem.get('delvTpCd') === CodeConstants.MT_DELVTP_I){
				if(bizViewAlias == 'app-subdeliveryorderdetail'){
					if(Number(detailItem.get('iqty')) != Number(refs.ctlPackageDetailQty.getValue()) && detailItem.get('projectCargo') == 'Y'){
						MessageUtil.warning("deliveryOrder", "duplicate_package_no");
						return;
					}
				}
				
				if(Number(detailItem.get('iqty')) > Number(detailItem.get('pkgqty')) && refs.refAdditionalChk.getValue() == false){
					MessageUtil.warning("deliveryOrder", "DM106012");
					return;
				}
			}else if(detailItem.get('delvTpCd') === CodeConstants.MT_DELVTP_D){
				if(bizViewAlias == 'app-subdeliveryorderdetail'){
					if(Number(detailItem.get('dqty')) != Number(refs.ctlPackageDetailQty.getValue()) && detailItem.get('projectCargo') == 'Y'){
						MessageUtil.warning("deliveryOrder", "duplicate_package_no");
						return;
					}
				}
				
				if(Number(detailItem.get('dqty')) > Number(detailItem.get('pkgqty')) && refs.refAdditionalChk.getValue() == false){
					MessageUtil.warning("deliveryOrder", "DM106012");
					return;
				}
			}else{
				if(bizViewAlias == 'app-subdeliveryorderdetail' && refs.ctlDeliveryMode.getValue() == 'B'){
					MessageUtil.warning("warning", "deliveryOrder_SDO_select_DMode");
					return;
				}
				
				if(((Number(detailItem.get('iqty')) > Number(detailItem.get('pkgqty'))) || (Number(detailItem.get('dqty')) > Number(detailItem.get('pkgqty')))) && refs.refAdditionalChk.getValue() == false){
					MessageUtil.warning("deliveryOrder", "DM106012");
					return;
				}
			}
			
				if (detailItem.get('delvTpCd') === CodeConstants.MT_DELVTP_D && detailItem.get('cgtpcd') == 'RCV') {
				    var roroItems = new Array();
			        unitListStrore.each(function(record) {
			            if (record.get('chkCdNm') == 1) {
			                roroItems.push(record.data);
			            }
			        });

			        Promise.all([me.onCheckUnitInWarehouse(roroItems), me.onCheckUnitOnApron(roroItems)])
			        .then(results => {
			            const [checkUnitNo, checkUnitNoApr] = results;

			            if (checkUnitNo && checkUnitNoApr) {
			                if (infoForm.isValid()) {
			                    if (bizViewAlias === 'app-subdeliveryorderdetail') {
			                        me.onSDODetailSave();
			                    } else {
			                        me.fileUpload();
			                    }
			                } else {
			                    MessageUtil.mandatoryFieldInValid();
			                }
			            }
			        })
			        .catch(error => {
			            MessageUtil.error('Error', error.message);
			        });
				    
				}
				else {
					if(infoForm.isValid()){
						if(bizViewAlias == 'app-subdeliveryorderdetail'){
							me.onSDODetailSave();
						}
						else {
							me.fileUpload();
						}
						
					} else {
						MessageUtil.mandatoryFieldInValid();
					}
				}
		}
	},
	
	onCheckUnitOnApron(roroItems) {
		var me = this;
		var theMain = me.getViewModel().get('theMain');
		
	    return new Promise((resolve, reject) => {
	        var checkUnitNoApr = true;
	        var apronCheckDataForIndirectStore = me.getStore('apronCheckDataForIndirect');
	        
	        apronCheckDataForIndirectStore.load({
	            params: {
	                vslCallId: theMain.get('vslCallId'),
	                blno: theMain.get('blno')
	            },
	            callback: function(records, operation, success) {
	                if (success && records.length > 0) {
	                    for (var i = 0; i < roroItems.length; i++) {
	                        var unitNo = roroItems[i].unitNo;
	                        for (var j = 0; j < records.length; j++) {
	                            var chasNo = records[j].get('chassisNo');
	                            if (chasNo && chasNo.includes(unitNo)) {
	                                var message = `UnitNo: ${chasNo} have been discharged to apron. Please choose another`;
	                                MessageUtil.warning('warning_msg', message);
	                                checkUnitNoApr = false;
	                                break;
	                            }
	                        }
	                        if (!checkUnitNoApr) break;
	                    }
	                }
	                resolve(checkUnitNoApr);
	            }
	        });
	    });
	},
	
	onCheckUnitInWarehouse(roroItems) {
		var me = this;
		var theMain = me.getViewModel().get('theMain');
		
	    return new Promise((resolve, reject) => {
	        var checkUnitNo = true;
	        var whCheckDataForIndirectStore = me.getStore('whCheckDataForIndirect');
	        
	        whCheckDataForIndirectStore.load({
	            params: {
	                vslCallId: theMain.get('vslCallId'),
	                blno: theMain.get('blno')
	            },
	            callback: function(records, operation, success) {
	                if (success && records.length > 0) {
	                    for (var i = 0; i < roroItems.length; i++) {
	                        var unitNo = roroItems[i].unitNo;
	                        for (var j = 0; j < records.length; j++) {
	                            var chasNo = records[j].get('chassisNo');
	                            if (chasNo && chasNo.includes(unitNo)) {
	                                var message = `UnitNo: ${chasNo} have been stored in WH. Please choose another`;
	                                MessageUtil.warning('warning_msg', message);
	                                checkUnitNo = false;
	                                break;
	                            }
	                        }
	                        if (!checkUnitNo) break;
	                    }
	                }
	                resolve(checkUnitNo);
	            }
	        });
	    });
	},
	
	onCheckZeroValueByDelvMode: function(deliveryMode, cargoType) {
		var me = this;
		var refs = me.getReferences();
		
		var directMT 	= refs.ctlDDmt.getValue() 	== null ? 0 : refs.ctlDDmt.getValue();
		var directQty 	= refs.ctlDQty.getValue() 	== null ? 0 : refs.ctlDQty.getValue();
		var directM3 	= refs.ctlDM3.getValue() 	== null ? 0 : refs.ctlDM3.getValue();
		var indirectMT 	= refs.ctlImt.getValue() 	== null ? 0 : refs.ctlImt.getValue();
		var indirectQty = refs.ctlIQty.getValue() 	== null ? 0 : refs.ctlIQty.getValue();
		var indirectM3 	= refs.ctlIm3.getValue() 	== null ? 0 : refs.ctlIm3.getValue();
		
		
		if (deliveryMode == 'Direct') {
			if (cargoType == 'BBK' || cargoType == 'RCV' ) {
				if (directMT == 0 || directQty == 0) {
					MessageUtil.warning("deliveryOrder", "Quantity and MT must be greater than 0.");
					return false;
				}
			}else if (cargoType == 'DBN' || cargoType == 'DBK' ) {
				if (directMT == 0 ) {
					MessageUtil.warning("deliveryOrder", "MT must be greater than 0.");
					return false;
				}
			} else if (cargoType == 'LQD' ) {
				if (directM3 == 0 ) {
					MessageUtil.warning("deliveryOrder", "M3 must be greater than 0.");
					return false;
				}
			}
		} else if (deliveryMode == 'Indirect') {
			if (cargoType == 'BBK' || cargoType == 'RCV' ) {
				if (indirectMT == 0 || indirectQty == 0) {
					MessageUtil.warning("deliveryOrder", "Quantity and MT must be greater than 0.");
					return false;
				}
			}else if (cargoType == 'DBN' || cargoType == 'DBK' ) {
				if (indirectMT == 0 ) {
					MessageUtil.warning("deliveryOrder", "MT must be greater than 0.");
					return false;
				}
			} else if (cargoType == 'LQD' ) {
				if (indirectM3 == 0 ) {
					MessageUtil.warning("deliveryOrder", "M3 must be greater than 0.");
					return false;
				}
			}
		} else { //Both
			if (cargoType == 'BBK' || cargoType == 'RCV' ) {
				if ( (directMT == 0 && indirectMT == 0) 
						|| (directQty == 0 && indirectQty == 0) ) {
					MessageUtil.warning("deliveryOrder", "Quantity and MT must be greater than 0.");
					return false;
				}
			}else if (cargoType == 'DBN' || cargoType == 'DBK' ) {
				if (directMT == 0 && indirectMT == 0) {
					MessageUtil.warning("deliveryOrder", "MT must be greater than 0.");
					return false;
				}
			} else if (cargoType == 'LQD' ) {
				if (directM3 == 0 && indirectM3 == 0) {
					MessageUtil.warning("deliveryOrder", "M3 must be greater than 0.");
					return false;
				}
			}
		}
	},
	onSDODetailSave: function () {
		var me = this;
		var refs = me.getReferences();
		var theMain = me.getViewModel().get('theMain');
		var store = me.getStore('subDoNoDuplicateChk');
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var sdoGridStore = me.lookupReference(me.SUB_DO_GRID_REF_NAME).getStore();
		var curDMode = theMain.get('delvTpCd');
		var pkgStore = me.getStore(me.PACKAGE_DETAIL_STORE);
		
		//Select Mode of Operation first
		if((refs.ctlModeOper.getValue() == null || refs.ctlModeOper.getValue() == '') && curDMode == 'D'){ 
			MessageUtil.warning('warning_msg', 'SDO_msg_directSelectOpe');
			return;
		}
		
		if((refs.ctlIModeOper.getValue() == null || refs.ctlIModeOper.getValue() == '') && curDMode == 'I'){
			MessageUtil.warning('warning_msg', 'SDO_msg_indirectSelectOpe');
			return;
		}
		
		if(theMain.get('delvTpCd') == 'I' && theMain.get('itspttpcd') == 'PL'){
			MessageUtil.warning('warning_msg', 'cannotAssignPipline');
			return;
		}
		
		for(var i = 0; i < pkgStore.data.length; i++){
			var rec = pkgStore.data.items[i];
			if(theMain.get('sdono') != null && theMain.get('sdono') != ''){
				if(curDMode == 'D'){
					if(rec.get('chk') == true && (rec.get('sdono') == null || rec.get('sdono') == '') && rec.get('isVA') == 'Y'){
						MessageUtil.warning('warning_msg', 'SDO_msg_pkgNoAtApronWrong');
						return;
					}
					if(rec.get('chk') == true && (rec.get('sdono') != null && rec.get('sdono') != '') && rec.get('sdono') != theMain.get('sdono')){
						MessageUtil.warning('warning_msg', 'SDO_msg_pkgNoOtherSDOWrong');
						return;
					}					
				}
				if(curDMode == 'I'){
					if(rec.get('chk') == true && (rec.get('sdono') != null && rec.get('sdono') != '') && rec.get('sdono') != theMain.get('sdono')){
						MessageUtil.warning('warning_msg', 'SDO_msg_pkgNoOtherSDOWrong');
						return;
					}
				}
			}else{
				if(curDMode == 'D'){
					if(rec.get('chk') == true && (rec.get('sdono') == null || rec.get('sdono') == '') && rec.get('isVA') == 'Y'){
						MessageUtil.warning('warning_msg', 'SDO_msg_pkgNoAtApronWrong');
						return;
					}
					if(rec.get('chk') == true && (rec.get('sdono') != null && rec.get('sdono') != '')){
						MessageUtil.warning('warning_msg', 'SDO_msg_pkgNoOtherSDOWrong');
						return;
					}
				}
				if(curDMode == 'I'){
					if(rec.get('chk') == true && (rec.get('sdono') != null && rec.get('sdono') != '')){
						MessageUtil.warning('warning_msg', 'SDO_msg_pkgNoOtherSDOWrong');
						return;
					}
				}
			}
		}
		
		//Validate in Direct mode
		if(curDMode == 'D'){

			//SDO grid has had no data before
			if(sdoGridStore.data.length <= 0){
				//In case Mode of Operation == Lorry
				if(refs.ctlModeOper.getValue() == 'LR' || refs.ctlModeOper.getValue() == 'PL'){
					if(Number(refs.ctlDDmt.getValue()) > Number(theMain.get('doDLrMt')) && refs.refAdditionalChk.getValue() == false){
						MessageUtil.warning('warning_msg', 'SDO_msg_directMtLorry');
						return;
					}
					if(Number(refs.ctlDM3.getValue()) > Number(theMain.get('doDLrM3')) && refs.refAdditionalChk.getValue() == false){
						MessageUtil.warning('warning_msg', 'SDO_msg_directM3Lorry');
						return;
					}
					if(Number(refs.ctlDQty.getValue()) > Number(theMain.get('doDLrQty')) && refs.refAdditionalChk.getValue() == false){
						MessageUtil.warning('warning_msg', 'SDO_msg_directQtyLorry');
						return;
					}
				}
				
				//In case Mode of Operation == Vessel
				if(refs.ctlModeOper.getValue() == 'SE'){
					if(Number(refs.ctlDDmt.getValue()) > Number(theMain.get('doDVslMt')) && refs.refAdditionalChk.getValue() == false){
						MessageUtil.warning('warning_msg', 'SDO_msg_directMtVsl');
						return;
					}
					if(Number(refs.ctlDM3.getValue()) > Number(theMain.get('doDVslM3')) && refs.refAdditionalChk.getValue() == false){
						MessageUtil.warning('warning_msg', 'SDO_msg_directM3Vsl');
						return;
					}
					if(Number(refs.ctlDQty.getValue()) > Number(theMain.get('doDVslQty')) && refs.refAdditionalChk.getValue() == false){
						MessageUtil.warning('warning_msg', 'SDO_msg_directQtyVsl');
						return;
					}
				}		
			}
			//SDO grid has had data before
			else{
				//In case Mode of Operation == Lorry
				if(refs.ctlModeOper.getValue() == 'LR' || refs.ctlModeOper.getValue() == 'PL'){
					var sumDMtLr = Number(refs.ctlDDmt.getValue()); 
					var sumDM3Lr = Number(refs.ctlDM3.getValue()); 
					var sumDQtyLr = Number(refs.ctlDQty.getValue());
					
					for(var i = 0; i < sdoGridStore.data.length; i++){
						if(sdoGridStore.data.items[i].data.btspttpcdnm == 'LR' && theMain.get('sdono') != sdoGridStore.data.items[i].data.sdono){
							sumDMtLr += Number(sdoGridStore.data.items[i].data.dmt);
							sumDM3Lr += Number(sdoGridStore.data.items[i].data.dm3);
							sumDQtyLr += Number(sdoGridStore.data.items[i].data.dqty);
						}
					}
					
					if(sumDMtLr.toFixed(3) > Number(theMain.get('doDLrMt')) && refs.refAdditionalChk.getValue() == false){
						MessageUtil.warning('warning_msg', 'SDO_msg_directMtLorry');
						return;
					}
					if(sumDM3Lr.toFixed(3) > Number(theMain.get('doDLrM3')) && refs.refAdditionalChk.getValue() == false){
						MessageUtil.warning('warning_msg', 'SDO_msg_directM3Lorry');
						return;
					}
					if(sumDQtyLr > Number(theMain.get('doDLrQty')) && refs.refAdditionalChk.getValue() == false){
						MessageUtil.warning('warning_msg', 'SDO_msg_directQtyLorry');
						return;
					}
				}
				
				//In case Mode of Operation == Vessel
				if(refs.ctlModeOper.getValue() == 'SE'){
					var sumDMtVsl = Number(refs.ctlDDmt.getValue()); var sumDM3Vsl = Number(refs.ctlDM3.getValue()); var sumDQtyVsl = Number(refs.ctlDQty.getValue());
					
					for(var i = 0; i < sdoGridStore.data.length; i++){
						if(sdoGridStore.data.items[i].data.btspttpcdnm == 'SE' && theMain.get('sdono') != sdoGridStore.data.items[i].data.sdono){
							sumDMtVsl += Number(sdoGridStore.data.items[i].data.dmt);
							sumDM3Vsl += Number(sdoGridStore.data.items[i].data.dm3);
							sumDQtyVsl += Number(sdoGridStore.data.items[i].data.dqty);
						}
					}
					
					if(sumDMtVsl.toFixed(3) > Number(theMain.get('doDVslMt')) && refs.refAdditionalChk.getValue() == false){
						MessageUtil.warning('warning_msg', 'SDO_msg_directMtVsl');
						return;
					}
					if(sumDM3Vsl.toFixed(3) > Number(theMain.get('doDVslM3')) && refs.refAdditionalChk.getValue() == false){
						MessageUtil.warning('warning_msg', 'SDO_msg_directM3Vsl');
						return;
					}
					if(sumDQtyVsl > Number(theMain.get('doDVslQty')) && refs.refAdditionalChk.getValue() == false){
						MessageUtil.warning('warning_msg', 'SDO_msg_directQtyVsl');
						return;
					}
				}
			}
		}
		
		//Validate in Indirect mode
		if(curDMode == 'I'){
			//SDO grid has had no data before
			if(sdoGridStore.data.length <= 0){
				//In case Mode of Operation == Lorry
				if(refs.ctlIModeOper.getValue() == 'LR'){	
					if(Number(refs.ctlImt.getValue()) > Number(theMain.get('doILrMt')) && refs.refAdditionalChk.getValue() == false){
						MessageUtil.warning('warning_msg', 'SDO_msg_indirectMtLorry');
						return;
					}
					if(Number(refs.ctlIm3.getValue()) > Number(theMain.get('doILrM3')) && refs.refAdditionalChk.getValue() == false){
						MessageUtil.warning('warning_msg', 'SDO_msg_indirectM3Lorry');
						return;
					}
					if(Number(refs.ctlIQty.getValue()) > Number(theMain.get('doILrQty')) && refs.refAdditionalChk.getValue() == false){
						MessageUtil.warning('warning_msg', 'SDO_msg_indirectQtyLorry');
						return;
					}
				}	
			}
			//SDO grid has had data before
			else{
				//In case Mode of Operation == Lorry
				if(refs.ctlIModeOper.getValue() == 'LR'){
					var sumIMtLr = Number(refs.ctlImt.getValue()); 
					var sumIM3Lr = Number(refs.ctlIm3.getValue()); 
					var sumIQtyLr = Number(refs.ctlIQty.getValue());
					
					for(var i = 0; i < sdoGridStore.data.length; i++){
						if(sdoGridStore.data.items[i].data.btspttpcdnm == 'LR' && theMain.get('sdono') != sdoGridStore.data.items[i].data.sdono){
							sumIMtLr += Number(sdoGridStore.data.items[i].data.imt);
							sumIM3Lr += Number(sdoGridStore.data.items[i].data.im3);
							sumIQtyLr += Number(sdoGridStore.data.items[i].data.iqty);
						}
					}
					
					if(sumIMtLr.toFixed(3) > Number(theMain.get('doILrMt')) && refs.refAdditionalChk.getValue() == false){
						MessageUtil.warning('warning_msg', 'SDO_msg_indirectMtLorry');
						return;
					}
					if(sumIM3Lr.toFixed(3) > Number(theMain.get('doILrM3')) && refs.refAdditionalChk.getValue() == false){
						MessageUtil.warning('warning_msg', 'SDO_msg_indirectM3Lorry');
						return;
					}
					if(sumIQtyLr > Number(theMain.get('doILrQty')) && refs.refAdditionalChk.getValue() == false){
						MessageUtil.warning('warning_msg', 'SDO_msg_indirectQtyLorry');
						return;
					}
				}
			}	
		}
		
		selection.set('sdono', theMain.get('sdono'));
		theMain.set('workingStatus', 'C');
		
		var params = {
				mfdocid 	: theMain.get('mfdocid'),
				blno 		: theMain.get('blno'),
				dono 		: theMain.get('dono'),
				sdono : theMain.get('sdono')
			};
		store.load({
			params: params,
			callback:function(records, operation, success){
				if(success){
					if(records.length > 0){
						theMain.set('workingStatus', 'U');
					}
					
					me.subDOSaveProcess(records);
				}
			}
		});
	},
	
	weightCheck: function(){
		var me = this;
		var refs = me.getReferences();
		var dMt = 0;
		var iMt = 0;
		
		dMt = Number(refs.ctlDDmt.getValue());	
		iMt = Number(refs.ctlImt.getValue());
		
		var sumMt = (dMt + iMt).toFixed(3);
		
		var docMt = Number(refs.ctlDocMt.getValue());
		
		if (docMt != sumMt){
			MessageUtil.warning("deliveryOrder", "deliveryOrder_update_weight_msg");
			return false;
		}

		return true;
	},
	
	calcM3: function(){
		var me = this;
		var refs = me.getReferences();
		var dM3 = 0;
		var iM3 = 0;
		var docM3 = Number(refs.ctlVol.getValue());

		dM3 = Number(refs.ctlDM3.getValue());
		iM3 = Number(refs.ctlIm3.getValue());
			
		var sumM3 = (dM3 + iM3).toFixed(3);
			
		if (docM3 != sumM3) {
			MessageUtil.warning("deliveryOrder", "deliveryOrder_update_measurement_msg");
			return false;
		}
		
		return true;
	},
	
	calcQty: function(){
		var me = this;
		var refs = me.getReferences();
		var dQty = 0;
		var iQty = 0;
		var docQty = Number(refs.ctlPkgQty.getValue());
		
		dQty = Number(refs.ctlDQty.getValue());
		iQty = Number(refs.ctlIQty.getValue());
			
		var sumQty = dQty + iQty;
		
		if (docQty != sumQty){
			MessageUtil.warning("deliveryOrder", "deliveryOrder_update_quantity_msg");
			return false;
		}
		
		return true;
	},
	
	onRemove: function(){
		var me = this;
		var store = me.getStore('LorryAssignmentGridList');
		var subDoGrid = me.lookupReference(me.SUB_DO_GRID_REF_NAME);
		var selection = subDoGrid.getSelection() == null ? null : subDoGrid.getSelection()[0];	
		var sdoStore = me.getStore(me.SUB_DO_STORE_NAME);
		
		if(selection != null){
			store.load({
				params:{
					vslCallId: selection.data.vslCallId,
					subDoNo: selection.data.sdono,
					blno: selection.data.blno					
				},
				
				callback: function(records, operation, success) {
					if(success){
						if(records.length > 0){
							MessageUtil.warning("deliveryOrder", "Selected Sub DO has been already assigned Truck. It can not be deleted.");
				    		return;
						}else{
							me.onProcessRemove();
						}
					}	
				}			
			});
		}
		else if(sdoStore.getData().length > 0){				
			MessageUtil.warning("deliveryOrder", "deliveryOrder_remove_subdo_first_msg");
    		return;	
		}
		else {
			me.onProcessRemove();
		}		
	},
	
	onProcessRemove: function(){
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var subDoStore = me.getStore(me.SUB_DO_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];		
		
		if(selection == null) {
			MessageUtil.warning("deliveryOrder", "deliveryOrder_select_msg");
    		return;
		}else{
			if(selection.data.dono === null || selection.data.dono === ''){
				MessageUtil.warning("deliveryOrder", "deliveryOrder_dono_exist_msg");
	    		return;
			}			
									
			var cgOpList = me.getStore(me.CARGO_OPERATION_STORE);
			
			cgOpList.load({ 
				params: {
					vslCallId : selection.data.vslCallId,
					blNo : selection.data.blno,
					searchType : "cgOp"
				},
				callback: function(records, operation, success) {
					if (success) {
						var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
						var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
						
						var subDoGrid = me.lookupReference(me.SUB_DO_GRID_REF_NAME);
						var subDoSelection = subDoGrid.getSelection() == null ? null : subDoGrid.getSelection()[0];
						
						if(subDoGrid.getSelection() != null && subDoGrid.getSelection() != ''){
							MessageUtil.question('remove', 'deliveryOrder_remove_subdo_confirm_msg', null,
								function(button){
									if (button === 'ok') {
										subDoStore.remove(subDoSelection);
										subDoStore.sync({
											success: function(){
												MessageUtil.saveSuccess(); // Success Message
											}
										});
									}
								}
							);
						} else {
							MessageUtil.question('remove', 'deliveryOrder_delete_msg', null,
								function(button){
									if (button === 'ok') {
										store.remove(selection);
										store.sync({
											success: function(){
												MessageUtil.saveSuccess(); // Success Message
											}
										});
									}
								}
							);
						}
					}
				}
			})
		}
	},
	
	onDblClick: function() {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null){
			return;
		}
		
		me.getViewModel().set('theMain', selection);
		me.getView().detailViewAlias = 'app-deliveryorderdetail';
		me.openDetailPopup(selection, "app-deliveryorderdetail");
	},
	
	onSubDOLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var store = me.getStore(me.SUB_DO_STORE_NAME);
		
		var params = {
				mfdocid 	: selection.get('mfdocid'),
				blno 		: selection.get('blno'),
				dono 		: selection.get('dono'),
				sdono 		: selection.get('sdono'),
				vslCallId 	: selection.get('vslCallId')
			};
		store.load({
			params: params
		});
	},
	
	onSubDODblClick: function(){
		var me = this;
		var grid = me.lookupReference(me.SUB_DO_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		me.cudFlag = '';
		
		me.getView().detailViewAlias = 'app-subdeliveryorderdetail';
		me.openDetailPopup(selection, "app-subdeliveryorderdetail");
	},
	
	onActiveFieldset: function(){
		var me = this;
		var refs = me.getReferences();
		var theMain = me.getViewModel().get('theMain');
		var sdoStore = me.getStore(me.SUB_DO_STORE_NAME);
		var sdoStoreLength = sdoStore.data.length;

		if(theMain && theMain.get('delvTpCd') == CodeConstants.MT_DELVTP_D){
			refs.refFsDirect.setDisabled(false);
			refs.refFsInDirect.setDisabled(true);
			
			refs.ctlImt.setReadOnly(true);
			refs.ctlIm3.setReadOnly(true);
			refs.ctlIQty.setReadOnly(true);
			//sMantis: 0166756
			if (theMain.data.cgtpcd != 'RCV') {
			refs.ctlDDmt.setReadOnly(false);
			refs.ctlDM3.setReadOnly(false);
			refs.ctlDQty.setReadOnly(false);
			}
			//eMantis: //sMantis: 0166756
			theMain.set('itspttpcd', '');
			theMain.set('iqty', 0);
			theMain.set('imt', 0);
			theMain.set('im3', 0);
			
			if(Number(theMain.get('dmtChk')) > 0){			
				//Auto bind value of Direct Mode Of Operation when created DO had fully amount with Lorry
				if(Number(theMain.get('doDLrMt')) == Number(theMain.get('doDMt')) 
						&& Number(theMain.get('doDLrM3')) == Number(theMain.get('doDM3')) 
						&& Number(theMain.get('doDLrQty')) == Number(theMain.get('doDQty'))){
					theMain.set('tspttpcd', 'LR');
					refs.ctlModeOper.setDisabled(true);
				}
				
				//Auto bind value of Direct Mode Of Operation when created DO had fully amount with Vessel
				if(Number(theMain.get('doDVslMt')) == Number(theMain.get('doDMt')) 
						&& Number(theMain.get('doDVslM3')) == Number(theMain.get('doDM3')) 
						&& Number(theMain.get('doDVslQty')) == Number(theMain.get('doDQty'))){
					theMain.set('tspttpcd', 'SE');
					refs.ctlModeOper.setDisabled(true);
				}
				if(refs.ctlModeOper.disabled == false){				
					theMain.set('tspttpcd', '');
				}
			}
			if(theMain.get('cgtpcd') == CodeConstants.MT_CGTP_LQN){
				if(Number(theMain.get('doDM3')) > 0){
//					theMain.set('tspttpcd', 'PL');
					theMain.set('dqty', theMain.get('doDLrQty'));
					theMain.set('dmt', theMain.get('doDLrMt'));
					theMain.set('dm3', theMain.get('doDLrM3'));
					refs.ctlModeOper.setDisabled(false);
//					refs.ctlModeOper.setValue('PL');
				}
			}
			
			me.onDisplayDirectMtM3QtyForSDO();
		} else if(theMain && theMain.get('delvTpCd') == CodeConstants.MT_DELVTP_I){	
			//Mantis: 0167853
			me.onDisableDirectAndEnableIndirect(refs, theMain);
			
			if(Number(theMain.get('imtChk')) > 0){				
				refs.refFsDirect.setDisabled(true);
				refs.refFsInDirect.setDisabled(false);
				//Mantis: 166756
				if (theMain.data.cgtpcd != 'RCV') {
				refs.ctlImt.setReadOnly(false);
				refs.ctlIm3.setReadOnly(false);
				refs.ctlIQty.setReadOnly(false);
				}
				//Mantis: 166756
				refs.ctlDDmt.setReadOnly(true);
				refs.ctlDM3.setReadOnly(true);
				refs.ctlDQty.setReadOnly(true);
				
				theMain.set('itspttpcd', 'LR');
				theMain.set('tspttpcd', '');
				theMain.set('dqty', 0);
				theMain.set('dmt', 0);
				theMain.set('dm3', 0);
				refs.ctlIModeOper.setDisabled(true);
			}
			if(theMain.get('cgtpcd') == CodeConstants.MT_CGTP_LQN){
				if(Number(theMain.get('doIM3')) > 0){
					refs.refFsDirect.setDisabled(true);
					refs.refFsInDirect.setDisabled(false);
					
					refs.ctlImt.setReadOnly(false);
					refs.ctlIm3.setReadOnly(false);
					refs.ctlIQty.setReadOnly(false);
					
					refs.ctlDDmt.setReadOnly(true);
					refs.ctlDM3.setReadOnly(true);
					refs.ctlDQty.setReadOnly(true);
					
//					theMain.set('itspttpcd', 'PL');
					theMain.set('tspttpcd', '');
					theMain.set('dqty', 0);
					theMain.set('dmt', 0);
					theMain.set('dm3', 0);
					refs.ctlIModeOper.setDisabled(false);
//					refs.ctlIModeOper.setValue('PL');
				}
			}
			me.onDisplayIndirectMtM3QtyForSDO();
		}
	},
	
	onDisableDirectAndEnableIndirect: function(refs, theMain) {
		refs.refFsDirect.setDisabled(true);
		refs.refFsInDirect.setDisabled(false);
		refs.ctlImt.setReadOnly(false);
		refs.ctlIm3.setReadOnly(false);
		refs.ctlIQty.setReadOnly(false);
		refs.ctlDDmt.setReadOnly(true);
		refs.ctlDM3.setReadOnly(true);
		refs.ctlDQty.setReadOnly(true);
		theMain.set('itspttpcd', 'LR');
		theMain.set('tspttpcd', '');
		theMain.set('dqty', 0);
		theMain.set('dmt', 0);
		theMain.set('dm3', 0);
		refs.ctlIModeOper.setDisabled(true);
	}
	,
	onDisplayDirectMtM3QtyForSDO: function(){
		var me = this;
		var refs = me.getReferences();
		var theMain = me.getViewModel().get('theMain');
		var sdoStore = me.getStore(me.SUB_DO_STORE_NAME);
		var sdoStoreLength = sdoStore.data.length;
		
		if(sdoStoreLength <= 0){
			if(refs.ctlModeOper.getValue() == null || refs.ctlModeOper.getValue() == ''){
				theMain.set('dqty', theMain.get('dqty'));
				theMain.set('dmt', theMain.get('dmt'));
				theMain.set('dm3', theMain.get('dm3'));
			}else if(refs.ctlModeOper.getValue() == 'LR'){
				theMain.set('dqty', theMain.get('doDLrQty'));
				theMain.set('dmt', theMain.get('doDLrMt'));
				theMain.set('dm3', theMain.get('doDLrM3'));
			}else if(refs.ctlModeOper.getValue() == 'SE'){
				theMain.set('dqty', theMain.get('doDVslQty'));
				theMain.set('dmt', theMain.get('doDVslMt'));
				theMain.set('dm3', theMain.get('doDVslM3'));
			}else if(refs.ctlModeOper.getValue() == 'PL'){
				theMain.set('dqty', theMain.get('doDLrQty'));
				theMain.set('dmt', theMain.get('doDLrMt'));
				theMain.set('dm3', theMain.get('doDLrM3'));
			}
		}else{
			//Calculate remain Direct MT, M3, QTY of DO to display in SDO
			var sumCurDMtInSDOStore = 0; var sumCurDM3InSDOStore = 0; var sumCurDQtyInSDOStore = 0;
			var remainDMtOfDO = 0; var remainDM3OfDO = 0; var remainDQtyOfDO = 0;
			
			//Calculate remain Direct Lorry MT, M3, QTY of DO to display in SDO
			var sumCurDLrMtInSDOStore = 0; var sumCurDLrM3InSDOStore = 0; var sumCurDLrQtyInSDOStore = 0;
			var remainDLrMtOfDO = 0; var remainDLrM3OfDO = 0; var remainDLrQtyOfDO = 0;
			
			//Calculate remain Direct Vessel MT, M3, QTY of DO to display in SDO
			var sumCurDVslMtInSDOStore = 0; var sumCurDVslM3InSDOStore = 0; var sumCurDVslQtyInSDOStore = 0;
			var remainDVslMtOfDO = 0; var remainDVslM3OfDO = 0; var remainDVslQtyOfDO = 0;
			
			for(var i = 0; i < sdoStoreLength; i++){
				sumCurDMtInSDOStore += Number(sdoStore.data.items[i].data.dmt);
				sumCurDM3InSDOStore += Number(sdoStore.data.items[i].data.dm3);
				sumCurDQtyInSDOStore += Number(sdoStore.data.items[i].data.dqty);
				
				if(sdoStore.data.items[i].data.btspttpcdnm == 'LR' || sdoStore.data.items[i].data.btspttpcdnm == 'PL'){
					sumCurDLrMtInSDOStore += Number(sdoStore.data.items[i].data.dmt);
					sumCurDLrM3InSDOStore += Number(sdoStore.data.items[i].data.dm3);
					sumCurDLrQtyInSDOStore += Number(sdoStore.data.items[i].data.dqty);
				}
				if(sdoStore.data.items[i].data.btspttpcdnm == 'SE'){
					sumCurDVslMtInSDOStore += Number(sdoStore.data.items[i].data.dmt);
					sumCurDVslM3InSDOStore += Number(sdoStore.data.items[i].data.dm3);
					sumCurDVslQtyInSDOStore += Number(sdoStore.data.items[i].data.dqty);
				}
			}
			
			remainDMtOfDO = (Number(theMain.get('doDMt')) - sumCurDMtInSDOStore) < 0 ? 0 : (Number(theMain.get('doDMt')) - sumCurDMtInSDOStore);
			remainDM3OfDO = (Number(theMain.get('doDM3')) - sumCurDM3InSDOStore) < 0 ? 0 : (Number(theMain.get('doDM3')) - sumCurDM3InSDOStore);
			remainDQtyOfDO = (Number(theMain.get('doDQty')) - sumCurDQtyInSDOStore) < 0 ? 0 : (Number(theMain.get('doDQty')) - sumCurDQtyInSDOStore);
			
			remainDLrMtOfDO = (Number(theMain.get('doDLrMt')) - sumCurDLrMtInSDOStore) < 0 ? 0 : (Number(theMain.get('doDLrMt')) - sumCurDLrMtInSDOStore);
			remainDLrM3OfDO = (Number(theMain.get('doDLrM3')) - sumCurDLrM3InSDOStore) < 0 ? 0 : (Number(theMain.get('doDLrM3')) - sumCurDLrM3InSDOStore);
			remainDLrQtyOfDO = (Number(theMain.get('doDLrQty')) - sumCurDLrQtyInSDOStore) < 0 ? 0 : (Number(theMain.get('doDLrQty')) - sumCurDLrQtyInSDOStore);
			
			remainDVslMtOfDO = (Number(theMain.get('doDVslMt')) - sumCurDVslMtInSDOStore) < 0 ? 0 : (Number(theMain.get('doDVslMt')) - sumCurDVslMtInSDOStore);
			remainDVslM3OfDO = (Number(theMain.get('doDVslM3')) - sumCurDVslM3InSDOStore) < 0 ? 0 : (Number(theMain.get('doDVslM3')) - sumCurDVslM3InSDOStore);
			remainDVslQtyOfDO = (Number(theMain.get('doDVslQty')) - sumCurDVslQtyInSDOStore) < 0 ? 0 : (Number(theMain.get('doDVslQty')) - sumCurDVslQtyInSDOStore);
			
			if(refs.ctlModeOper.getValue() == null || refs.ctlModeOper.getValue() == ''){
				theMain.set('dqty', remainDQtyOfDO);
				theMain.set('dmt', remainDMtOfDO);
				theMain.set('dm3', remainDM3OfDO);
			}else if(refs.ctlModeOper.getValue() == 'LR' || refs.ctlModeOper.getValue() == 'PL'){
				theMain.set('dqty', remainDLrQtyOfDO);
				theMain.set('dmt', remainDLrMtOfDO);
				theMain.set('dm3', remainDLrM3OfDO);
			}else if(refs.ctlModeOper.getValue() == 'SE'){
				theMain.set('dqty', remainDVslQtyOfDO);
				theMain.set('dmt', remainDVslMtOfDO);
				theMain.set('dm3', remainDVslM3OfDO);
			}
		}
	},
	
	onDisplayIndirectMtM3QtyForSDO: function(){
		var me = this;
		var refs = me.getReferences();
		var theMain = me.getViewModel().get('theMain');
		var sdoStore = me.getStore(me.SUB_DO_STORE_NAME);
		var sdoStoreLength = sdoStore.data.length;
		
		if(sdoStoreLength <= 0){
			if(refs.ctlModeOper.getValue() == 'LR'){
				theMain.set('iqty', theMain.get('doILrQty'));
				theMain.set('imt', theMain.get('doILrMt'));
				theMain.set('im3', theMain.get('doILrM3'));
			}else if(refs.ctlModeOper.getValue() == 'PL'){
				theMain.set('iqty', theMain.get('doIQty'));
				theMain.set('imt', theMain.get('doIMt'));
				theMain.set('im3', theMain.get('doIM3'));
			}
		}else{
			//Calculate remain Indirect Lorry MT, M3, QTY of DO to display in SDO
			var sumCurILrMtInSDOStore = 0; var sumCurILrM3InSDOStore = 0; var sumCurILrQtyInSDOStore = 0;
			var remainILrMtOfDO = 0; var remainILrM3OfDO = 0; var remainILrQtyOfDO = 0;
			
			for(var i = 0; i < sdoStoreLength; i++){
				if(sdoStore.data.items[i].data.btspttpcdnm == 'LR'){
					sumCurILrMtInSDOStore += Number(sdoStore.data.items[i].data.imt);
					sumCurILrM3InSDOStore += Number(sdoStore.data.items[i].data.im3);
					sumCurILrQtyInSDOStore += Number(sdoStore.data.items[i].data.iqty);
				}
			}
			
			remainILrMtOfDO = Number(theMain.get('doILrMt')) - sumCurILrMtInSDOStore;
			remainILrM3OfDO = Number(theMain.get('doILrM3')) - sumCurILrM3InSDOStore;
			remainILrQtyOfDO = Number(theMain.get('doILrQty')) - sumCurILrQtyInSDOStore;
			
			theMain.set('iqty', remainILrQtyOfDO < 0 ? 0 : remainILrQtyOfDO);
			theMain.set('imt', remainILrMtOfDO < 0 ? 0 : remainILrMtOfDO);
			theMain.set('im3', remainILrM3OfDO < 0 ? 0 : remainILrM3OfDO);
		}
	},
	
	onPackageNoChecked : function (chkbox, rowIdx, checked, record, e, eOpts) {
		var me = this;
		
		if (checked) {
            record.data.chk = true;
        } else {
            record.data.chk= false;
        }
		
		me.onPackageCalculation();
    },
    
    onHeaderPackageNoChecked : function (checkColumn, checked) {
		var me = this;
		me.onPackageCalculation();
    },
    
    onPackageCalculation : function () {
		var me = this;
		var refs = me.getReferences();
		
		var grid = me.lookupReference(me.PACKAGE_DETAIL_GRID_REF_NAME);
		var pkgStore = me.getStore(me.PACKAGE_DETAIL_STORE);
		var list = pkgStore.getData();
		var theMain = me.getViewModel().get('theMain');
		var pkgArr = new Array();
		var qty = 0;
		var mt = 0;
		var m3 = 0;
		
		for(var i = 0; i < pkgStore.getData().length; i++){
			if(pkgStore.getData().getAt(i).get('chk') == true){
				pkgArr.push(pkgStore.getData().getAt(i).data);
				mt += Number(pkgStore.getData().getAt(i).get('pkgMt'));
				m3 += Number(pkgStore.getData().getAt(i).get('pkgM3'));
				qty++;
			}
		}
		
		refs.ctlPackageDetailQty.setValue(qty);
		theMain.set('pkgItems', pkgArr);
		
		if(theMain.get('delvTpCd') == CodeConstants.MT_DELVTP_I){
			theMain.set('iqty', qty);
			theMain.set('imt', mt);
			theMain.set('im3', m3);
		} else if(theMain.get('delvTpCd') == CodeConstants.MT_DELVTP_D){
			theMain.set('dqty', qty);
			theMain.set('dmt', mt);
			theMain.set('dm3', m3);
		}
    },
    
	onCount : function (model, record, index, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.PACKAGE_DETAIL_GRID_REF_NAME);
		var pkgStore = me.getStore(me.PACKAGE_DETAIL_STORE);
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		var theMain = me.getViewModel().get('theMain');
		var pkgArr = new Array();
		var mt = 0;
		var m3 = 0;
				
		if(selection.length == 0){
			pkgStore.each(function(rec){
				rec.set('chk', false);
			});
		}
		
		for(var i = 0; i < selection.length; i++){
			pkgArr.push(grid.getSelection().at(i).data);
			
			pkgStore.each(function(rec){				
				if(rec.get('pkgNo') == grid.getSelection().at(i).data.pkgNo){
					rec.set('chk', true);
				}
			});
		}

		refs.ctlPackageDetailQty.setValue(selection.length);

		theMain.set('pkgItems', pkgArr);
		
		for(var i = 0; i < pkgArr.length; i++){
			mt += Number(pkgArr.at(i).pkgMt);
			m3 += Number(pkgArr.at(i).pkgM3);
		}
		
		if(theMain.get('delvTpCd') == CodeConstants.MT_DELVTP_I){
			theMain.set('iqty', selection.length);
			theMain.set('imt', mt);
			theMain.set('im3', m3);
		} else if(theMain.get('delvTpCd') == CodeConstants.MT_DELVTP_D){
			theMain.set('dqty', selection.length);
			theMain.set('dmt', mt);
			theMain.set('dm3', m3);
		}
    },
    
    onCountDeSelect : function (model, record, index, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.PACKAGE_DETAIL_GRID_REF_NAME);
		var pkgStore = me.getStore(me.PACKAGE_DETAIL_STORE);
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		var theMain = me.getViewModel().get('theMain');
		var pkgArr = new Array();
		var mt = 0;
		var m3 = 0;
				
		if(selection.length == 0){
			pkgStore.each(function(rec){
				rec.set('chk', false);
			});
		}
		
		if(pkgStore.data.length > 0){
			pkgStore.each(function(rec){
				rec.set('flag', '');
			});
		}
		
		for(var i = 0; i < selection.length; i++){
			pkgArr.push(grid.getSelection().at(i).data);
		}
		
		for(var i = 0; i < selection.length; i++){				
			var index = pkgStore.findBy(function(record) {
				return record.get('pkgNo') == grid.getSelection().at(i).data.pkgNo;
			});	
			
			if(index >= 0){
				pkgStore.data.items[index].set('flag', 'Y');
			}
		}
		
		pkgStore.each(function(rec){
			if(rec.get('flag') == 'Y'){
				rec.set('chk', true);
			}else{
				rec.set('chk', false);
			}
		});

		refs.ctlPackageDetailQty.setValue(selection.length);

		theMain.set('pkgItems', pkgArr);
		
		for(var i = 0; i < pkgArr.length; i++){
			mt += Number(pkgArr.at(i).pkgMt);
			m3 += Number(pkgArr.at(i).pkgM3);
		}
		
		if(theMain.get('delvTpCd') == CodeConstants.MT_DELVTP_I){
			theMain.set('iqty', selection.length);
			theMain.set('imt', mt);
			theMain.set('im3', m3);
		} else if(theMain.get('delvTpCd') == CodeConstants.MT_DELVTP_D){
			theMain.set('dqty', selection.length);
			theMain.set('dmt', mt);
			theMain.set('dm3', m3);
		}
    },
	
    onFileGridAdd: function(btn, fileField) {
		var me = this;
		var detailItem = me.getViewModel().get('theMain');
		var store = me.getStore(me.FILE_UPLOAD_STORE_NAME);
    	var input = document.querySelector("input[id='doFileUpload-button-fileInputEl']");
		var keyId = detailItem.get('vslCallId') +"_"+ detailItem.get('mfdocid')+"_"+ detailItem.get('dono')
		 
		if(detailItem.get('mfdocid') === "" || detailItem.get('dono') === ""){
			MessageUtil.mandatoryFieldInValid();
			return null;
		}
		
    	for(var i=0; i<input.files.length; i++){
    		var record = Ext.create('MOST.model.common.FileUpload');
    		file = input.files[i];
    		
    		record.set('pgmId', FileConstant.DELIVERYORDER_SCREEN_PGM_ID);
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
		
		if(selection == null) return;
		
		Ext.each(selection, function (record) {
			record.set('workingStatus', WorkingStatus.DELETE);
			store.remove(record);
		});
	},
	
	onFileDownloadDblClick: function() {
		var me = this;
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theMain');
		var grid = me.lookupReference(me.FILE_GRID_REF_NAME);
		var store = me.getStore(me.FILE_DOWNLOAD_STORE_NAME);	
		
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		if(detailItem.get('mfDocId') === "" || detailItem.get('dono') === ""){
			MessageUtil.mandatoryFieldInValid();
			return null;
		}
			
		var keyId = detailItem.get('vslCallId') +"_"+ detailItem.get('mfdocid')+"_"+ detailItem.get('dono')
		
		store.load({
			params : {
				'pgmId' : FileConstant.DELIVERYORDER_SCREEN_PGM_ID,
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
	
	onSelectMasterBlCombo: function(){
		var me = this;
     	var refs = me.getReferences();
     	var searchParm = me.getViewModel().get('theSearch');
     	var blCombo = me.getStore('blNoList');
     	var sdoCombo = me.getStore('subDoNoList');
     	
     	searchParm.set('blno', '');
     	searchParm.set('sdono', '');
     	
     	blCombo.load({
     		params: {
     			vslCallId: searchParm.get('vslCallId'),
     			mfDocNo: refs.ctlMasterBlNo.getValue()
     		}
     	});
     	
     	sdoCombo.load({
     		params: {
     			vslCallId: searchParm.get('vslCallId'),
     			blNo: searchParm.get('blno')
     		}
     	});
	},
	
	onSelectBlCombo: function(){
		var me = this;
		var refs = me.getReferences();
		var subDoList = me.getStore(me.SUB_DO_NO_COMBO);
		var searchParm = me.getViewModel().get('theSearch');
		
		searchParm.set('sdono', '');
		
		subDoList.load({
			params: {
				blNo: searchParm.get('blno'),
				vslCallId: searchParm.get('vslCallId')
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
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
     	var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var vesselNo = refs.ctlVessel.getValue();
		var shipCallNo = refs.ctlScn.getValue();
     	var fwrd = StringUtil.toUpperCase(searchParm.data.fwrd);
     	var delvtpcd = StringUtil.toUpperCase(searchParm.data.delvtpcd);
     	var dateCondition = null;
     	var etaFrom = '';
     	var etaTo = '';
     	
     	if((shipCallNo == '' || shipCallNo == null)
     			&& (vesselNo == '' || vesselNo == null) 
     			&& (fwrd == '' || fwrd == null) 
     			&& (delvtpcd == '' || delvtpcd == null)){
     		MessageUtil.warning("deliveryOrder", "deliveryOrder_search_null_msg");
     		
    		return;
     	}
     	
     	var searchType = 'list';
		var params = me.createParam(searchParm);
		
		params['vslCallId'] = StringUtil.toUpperCase(searchParm.data.vslCallId);
		params['scn'] = StringUtil.toUpperCase(searchParm.data.scn);
		params['mfdocid'] = StringUtil.toUpperCase(searchParm.data.mfdocid);
		params['fwrd'] = fwrd;
		params['searchType'] = searchType;
		params['etaFrom'] = etaFrom;
		params['etaTo'] = etaTo;
		params['delvtpcd'] = delvtpcd;
		params['authority'] = me.authority;
		params['ptnrcd'] = MOST.config.Token.getPtnrCode();
    	params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
		params['blno'] = searchParm.get('blno');
		
    	return params;
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl == 'ctlVessel'){ 
			if(returnValue){
				var theSearch = me.getViewModel().get('theSearch');
				
				theSearch.set('blno', '');
				theSearch.set('vslCd', returnValue.item.get('vslCd'));
				theSearch.set('vslNm', returnValue.item.get('vslNm'));
				theSearch.set('voyage', returnValue.item.get('voyage'));
				theSearch.set('arrvSaId', returnValue.item.get('arrvSaId'));
				theSearch.set('eta', returnValue.item.get('eta'));
				theSearch.set('etd', returnValue.item.get('etd'));
				theSearch.set('berthLoc', returnValue.item.get('berthLoc'));
				
				me.onSelectBl();
//				me.onSearch();
			} 
		}else if(targetControl == 'ctlCommodity'){
			if(returnValue){
				var theMain = me.getViewModel().get('theMain');
				refs.ctlCommodityNm.setValue(returnValue.codeName);
				theMain.set("imdgclass", returnValue.item.get("imdg"));
				theMain.set("tfzunno", returnValue.item.get("unno"));
			} 
		}else if(targetControl === 'ctlShipperCd'){
			if(returnValue){ 
				refs.refTxtShprNm.setValue(returnValue.item.get("ptnrName"));
				refs.refTxtSprAddr1.setValue(returnValue.item.get("addr"));
			} else {
				refs.refTxtShprNm.setValue("");
				refs.refTxtSprAddr1.setValue("");
			}
			
		}else if(targetControl === 'ctlConsigneeCd'){
			if(returnValue){ 
				refs.refTxtCnsNm.setValue(returnValue.item.get("ptnrName"));
				refs.refTxtCnsAddr1.setValue(returnValue.item.get("addr"));
			} else {
				refs.refTxtCnsNm.setValue("");
				refs.refTxtCnsAddr1.setValue("");
			}
		}else if(targetControl === 'ctlFinalDes'){
			if(returnValue){
				refs.ctlFinalDesNm.setValue(returnValue.codeName);
			} else {
				refs.ctlPkgTpNm.setValue("");
			}
		}else if(targetControl === 'ctlTypeOfPackage'){
			if(returnValue){ 
				refs.ctlPkgTpNm.setValue(returnValue.codeName);
			} else {
				refs.ctlPkgTpNm.setValue("");
			}
		} else if(targetControl === 'refTxtCmdtGrpCd'){
			if(returnValue){ 
				refs.refTxtCmdtGrpNm.setValue(returnValue.codeName);
			} else {
				refs.refTxtCmdtGrpNm.setValue("");
			}
		} else if(targetControl === 'ctlScn'){ 
			if(returnValue){
				var theSearch = me.getViewModel().get('theSearch');
				
				refs.ctlScn.setValue(returnValue.code);

				if(!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))){
					refs.ctlVessel.setValue(returnValue.item.get('vslCallId'));
					me.getViewModel().setData({theVslInfo:returnValue.item});
					
					refs.ctlScn.setValue(returnValue.item.get('scn'));
					theSearch.set('blno', '');
					theSearch.set('vslCd', returnValue.item.get('vslCd'));
					theSearch.set('vslNm', returnValue.item.get('vslNm'));
					theSearch.set('voyage', returnValue.item.get('voyage'));
					theSearch.set('arrvSaId', returnValue.item.get('arrvSaId'));
					theSearch.set('eta', returnValue.item.get('eta'));
					theSearch.set('etd', returnValue.item.get('etd'));
					theSearch.set('berthLoc', returnValue.item.get('berthLoc'));
					
					me.onSelectBl();
					/*me.onSearch();*/
				}else {
					refs.ctlVessel.setValue('');
					me.getViewModel().setData({theVslInfo:null});
				}
			} 
		}
	},
	
	saveProcess:function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var fileUploadStore = me.getStore(me.FILE_UPLOAD_STORE_NAME);
		var detailItem = me.getViewModel().get('theMain');
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var expectLorryArrv = Ext.Date.format(refs.ctlETAFromDt.getValue(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var doNo = detailItem.get('dono');
		var checkExistDO = detailItem.get('checkExistDO');
		var uploadItems = new Array();
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		detailItem.data.estDt = expectLorryArrv;
		detailItem.set('domesticChk', refs.refDomesticChk.checked ? 'Y' : 'N');
		detailItem.set('wgtChk', refs.refWeightChk.checked ? 'N' : 'Y');
		detailItem.set('validDate',Ext.Date.format(refs.ctlSdoValidDate.getValue(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));

		
		var isCreated = detailItem.phantom;
		
		updateParm.getProxy().url = store.getProxy().url;
		
		if(checkExistDO === 'true'){
			isCreated = true;
		}
		
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
		
		updateParm.phantom = isCreated;
		updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		updateParm.set('item', detailItem.data);
		
		updateParm.save({
			success : function(records,success){
				var crStore = me.getStore('validationCheck');
				
				crStore.load({
					params : {
						tyCd: 'CUSTOMS_RELEASED_VALIDATION',
						col1: detailItem.get('vslCd'),
						col2: detailItem.get('blno'),
						col3: 'I',
						col4: detailItem.get('scn')
					},
					callback: function(records, operation, success) {
						if (success) {
							if(records.length === 0 || (records[0].get('isValidated') !== 'Y')){
								MessageUtil.show(Ext.Msg.WARNING,'warning_msg' ,'customsCargoReleaseControl_release_msg','',
										function(button){
											if (button === 'ok') {
												me.getDetailBizView().close();
												store.reload();
											}
										}
									);
							}else{
								MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
									function(button){
										if (button === 'ok') {
											me.getDetailBizView().close();
											store.reload();
										}
									}
								);
							}
						}
					}
				});
			}
		});
	},
	
	subDOSaveProcess: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.SUB_DO_STORE_NAME);
		//var fileUploadStore = me.getStore(me.FILE_UPLOAD_STORE_NAME);
		var deliveryOrderWgtChk = me.getStore(me.DO_WEIGHT_CHECK);
		var detailItem = me.getViewModel().get('theMain');
		var unitListStrore = me.getStore('unitList');
		var detailView = me.getDetailBizView();
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		var theMain = me.getViewModel().get('theMain');
		var uploadItems = new Array();
		var isCreated = false;
		var mt = 0;
		
		if(theMain.get('workingStatus') == 'C'){
			isCreated = true;
		}
		
		deliveryOrderWgtChk.load({
			params: theMain.data,
			callback: function(records, operation, success){
//				if(theMain.get('projectCargo') == 'Y'){
//					for(var i = 0; i < records.length; i++){
//						mt += Number(records.at(i).get('imt'));
//						mt += Number(records.at(i).get('dmt'));
//					}
//					
//					for(var i = 0; i < detailItem.get('pkgItems').length; i++){
//						mt += Number(detailItem.get('pkgItems').at(i).pkgMt);
//					}
//					
//					if(mt > detailItem.get('wgt') && !refs.refAdditionalChk.checked){
//						MessageUtil.warning('warning_msg', 'deliveryOrder_mt_msg');
//						return;
//					}
//				} else {				
//				}
				
				if(theMain.get('delvTpCd') == CodeConstants.MT_CATGTP_I){
					mt += Number(theMain.get('imt'));
					
					if(store.data.length > 0){	
						for(var i = 0; i < store.data.length; i++){
							if(refs.refTxtSubDoNo.getValue() != store.data.items[i].data.sdono){
								if(store.data.items[i].data.imt != 0){
									mt += Number(store.data.items[i].data.imt);
								} else {
									mt += Number(store.data.items[i].data.dmt);
								}
							}
						}
					}
				} else if(theMain.get('delvTpCd') == CodeConstants.MT_DELVTP_D){
					mt += Number(theMain.get('dmt'));
					
					if(store.data.length > 0){	
						for(var i = 0; i < store.data.length; i++){
							if(refs.refTxtSubDoNo.getValue() != store.data.items[i].data.sdono){
								if(store.data.items[i].data.imt != 0){
									mt += Number(store.data.items[i].data.imt);
								} else {
									mt += Number(store.data.items[i].data.dmt);
								}
							}
						}
					}
				}
				
				if(Number(mt.toFixed(3)) > Number(detailItem.get('wgt')) && !refs.refAdditionalChk.checked){
					MessageUtil.warning('warning_msg', 'DM106012');
					return;
				}
				if(detailItem.get('cgtpcd') != null && detailItem.get('cgtpcd') == 'LQD'){
					if((detailItem.get('dm3') == null || detailItem.get('dm3') == 0) && (detailItem.get('im3') == null || detailItem.get('im3') == 0)){
						MessageUtil.warning('warning_msg', 'The Measurement could not be empty');
						return;
					}
				}
				var roroItems = new Array();
				if(detailItem.get('cgtpcd') == 'RCV'){
					unitListStrore.each(function(record){
						if(record.get('chkCdNm') == 1){
							roroItems.push(record.data);
						}
					});
					detailItem.set('unitItems',roroItems);
					//Mantis: 166756
					if(theMain.get('workingStatus') == 'C'){
						if(me.roroQty == 0 || roroItems.length <= 0){
							MessageUtil.warning('warning_msg', 'SDO_msg_noROROUnitSelected');
							return;
						}
					}
					//Mantis: 166756
				}
				detailItem.set('uploadItems', uploadItems);
				detailItem.set('sdoAdditionalChk', refs.refAdditionalChk.checked ? 'Y' : 'N');
				detailItem.set('sdoWgtChk', refs.refWeightChk.checked ? 'N' : 'Y');
				detailItem.set('validDate', Ext.Date.format(refs.ctlSdoValidDate.getValue(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));

				updateParm.getProxy().url = store.getProxy().url;
				updateParm.phantom = isCreated;
				updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
				updateParm.set('item', detailItem.data);
				
				//Fix issue: Expected Lorry Arrival does not save follow SDO
				updateParm.data.item.estDt = Ext.Date.format(updateParm.data.item.estArrvDt, 'd/m/Y H:i');
				
				updateParm.save({
					success : function(records,success){
						var detail = me.getViewModel().get('theMain');
						
						detail.set('sdono', records.get('sdono'));
						
						MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
							function(button){
								if (button === 'ok') {
									store.reload();
									detailView.close();
								}
						});
					}
				});
			}
		});
	},
	
	onSelectBl: function(clt, record, eOpts ){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('blNoList');
		var masterBlcombo = me.getStore('masterBlCombo');
		var theSearch = me.getViewModel().get('theSearch');
		var vslCallId = theSearch.get('vslCallId');
		var blNo = theSearch.get('blNo');
		
		theSearch.set('mfdocid', '');
		theSearch.set('blno', '');
		theSearch.set('sdono', '');
		
		masterBlcombo.load({
			params: {
				vslCallId : vslCallId
			}
		});
		
		store.load({
			params: {
				vslCallId : vslCallId,
				blNo : blNo
			}
		});
	},
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * DETAIL START
	 */
	
	setDetailInitialize:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var detailItem = me.getViewModel()
		var bizViewAlias = me.getView().detailViewAlias;
		
		if(bizViewAlias == 'app-subdeliveryorderdetail'){
			me.setDetailControlForSDO(recvData);
		}
		else {
			me.setDetailControl(recvData);
		}
		
	},
	
	setDetailControlForSDO:function(recvData){
		var me = this;
		var refs = me.getReferences();
		var deliveryOrderDetail = me.getStore(me.DELIVERYORDER_DETAIL_STORE);
		var detailItem = me.getViewModel();
		var bizViewAlias = me.getView().detailViewAlias;
		var doNo = '';
//		var params = recvData.data;
//		
//		params.searchType = 'detail';
		if(recvData.get('cgtpcd') == CodeConstants.MT_CGTP_LQN){
			refs.ctlModeOper.setValue(CodeConstants.MT_TSPTTP_PL);
			refs.ctlIModeOper.setValue(CodeConstants.MT_TSPTTP_PL);
		}
		if(recvData.get('cgtpcd') == CodeConstants.MT_CGTP_RCV){
			refs.refROROSDOTab.setDisabled(false);
			if(recvData.get('sdono') != null && recvData.get('sdono') != ''){
				refs.refChkMulti.setHidden(true);
			}else{
				refs.refChkMulti.setHidden(false);
			}
			if(me.cudFlag == 'C'){
				doNo = recvData.get('dono');
			}
			
			var unitList = me.getStore(me.CONTAINER_STORE_NAME);
			unitList.load({
				params:{
					vslCallId	: recvData.get('vslCallId'),
					mfDocId 	: recvData.get('mfdocid'),
					blNo 		: recvData.get('blno'),
					sdoNo 		: recvData.get('sdono'),
					doNo		: doNo
				},
				callback: function(records, operation, success) {
					if(success){
						me.roroQty = unitList.data.length;
					}
				}
			});
		}else{

			refs.refROROSDOTab.setDisabled(true);
		}
		deliveryOrderDetail.load({
			params: {
				searchType: 'detail',
				blno: recvData.get('blno'),
				mfdocid: recvData.get('mfdocid'),
				vslCallId: recvData.get('vslCallId'),
				dono: recvData.get('dono'),
				sdono: recvData.get('sdono')
			},
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						var theMainModel = Ext.create('MOST.model.document.DeliveryOrder');
						var grid = me.lookupReference(me.SUB_DO_GRID_REF_NAME);
						var selection = grid.getSelection() == null ? null : grid.getSelection()[0]; 
						var packageDetail = me.getStore(me.PACKAGE_DETAIL_STORE);

						if(me.cudFlag == 'C'){
							selection = null;
						}
						
						refs.ctlTypeOfPackage.getReferences().ctlField.setEditable(false);
						
						if(records[0].get('cgtpcd') == 'DBN' || records[0].get('cgtpcd') == 'LQD'){
							refs.ctlTypeOfPackage.getReferences().ctlOpenPopupButton.setDisabled(false);
						}else{
							refs.ctlTypeOfPackage.getReferences().ctlOpenPopupButton.setDisabled(true);
						}
						
						refs.refDomesticChk.checked = records[0].get('domesticChk') == 'Domestic Cargo' ? true : false;
						
						if(records[0].get('projectCargo') == 'Y'){
							refs.refDeliveryPackageDetail.setDisabled(false);
						} else {
							refs.refDeliveryPackageDetail.setDisabled(true);
						}
						
						theMainModel.phantom = false; // UPDATE
						theMainModel.data = records[0].data;
						theMainModel.data.estdt = records[0].get('estDt');
						
						me.getViewModel().setData({theMain:theMainModel});
						var theMain = me.getViewModel().get('theMain');
						var filekeyId = theMain.get('vslCallId') +"_"+ theMain.get('mfdocid')+"_"+ theMain.get('dono');
						
						if(theMain.get('delvTpCd') == 'B'){
							refs.ctlDeliveryMode.setDisabled(false);
							if(theMain.get('cgtpcd') == CodeConstants.MT_CGTP_LQN){
								refs.ctlModeOper.setValue(CodeConstants.MT_TSPTTP_PL);
								refs.ctlIModeOper.setValue(CodeConstants.MT_TSPTTP_PL);
							}	
							if(selection){
								refs.ctlDeliveryMode.setValue(selection.get('delvTpCd'));
							} else {
								if(Number(theMain.get('dmt')) == 0 && Number(theMain.get('imt')) > 0){
									refs.ctlDeliveryMode.setValue(CodeConstants.MT_DELVTP_I);
									theMain.set('delvTpCd', CodeConstants.MT_DELVTP_I);
								}
								if(Number(theMain.get('imt')) == 0 && Number(theMain.get('dmt')) > 0){
									refs.ctlDeliveryMode.setValue(CodeConstants.MT_DELVTP_D);
									theMain.set('delvTpCd', CodeConstants.MT_DELVTP_D);
								}else{
									refs.ctlDeliveryMode.setValue('');
									theMain.set('delvTpCd', '');
								}	
								if(theMain.get('cgtpcd') == CodeConstants.MT_CGTP_LQN){
									if(Number(theMain.get('dm3')) == 0 && Number(theMain.get('im3')) > 0){
										refs.ctlDeliveryMode.setValue(CodeConstants.MT_DELVTP_I);
										theMain.set('delvTpCd', CodeConstants.MT_DELVTP_I);
									}
									if(Number(theMain.get('im3')) == 0 && Number(theMain.get('dm3')) > 0){
										refs.ctlDeliveryMode.setValue(CodeConstants.MT_DELVTP_D);
										theMain.set('delvTpCd', CodeConstants.MT_DELVTP_D);
									}else{
										refs.ctlDeliveryMode.setValue('');
										theMain.set('delvTpCd', '');
									}
								}
							}
						} else {
							refs.ctlDeliveryMode.setDisabled(true);
						}
						
						if(refs.ctlDeliveryMode.getValue() == CodeConstants.MT_DELVTP_D){
							refs.refFsInDirect.setDisabled(true);
							refs.refFsDirect.setDisabled(false);
						}else {
							refs.refFsInDirect.setDisabled(false);
							refs.refFsDirect.setDisabled(true);
						}
						
						//in case of double click from SDO grid
						if(selection && selection != null){
							refs.refAdditionalChk.checked = selection.data.sdoAdditionalChk == 'Y' ? true : false;
							refs.refWeightChk.setDisabled(MOST.config.Token.getUserType() == CodeConstants.USER_TYPE_INTERNAL ? false : true);
							refs.refWeightChk.checked = selection.data.sdoWgtChk == 'Y' ? false : true;
							
							//Fix issue: Expected Lorry Arrival does not load when detailload with SDO
							theMain.set('estArrvDt', selection.data.estArrvDt);
							
							theMain.set('sdormk', selection.data.sdormk);
							theMain.set('sdoWgtChk', selection.data.sdoWgtChk);
							theMain.set('sdoAdditionalChk', selection.data.sdoAdditionalChk);
							
							theMain.set('sdono', selection.get('sdono'));
							theMain.set('tspttpcd', selection.get('tspttpcd'));
							theMain.set('tsptr', selection.get('tsptr'));
							
							theMain.set('itspttpcd', selection.get('itspttpcd'));
							refs.ctlSdoValidDate.setValue(selection.get('validDate'));
							theMain.set('delvTpCd', selection.get('delvTpCd'));
							
							theMain.set('dqty',selection.get('dqty'));
							theMain.set('dmt',selection.get('dmt'));
							theMain.set('dm3',selection.get('dm3'));
							
							theMain.set('iqty',selection.get('iqty'));
							theMain.set('im3',selection.get('im3'));
							theMain.set('imt',selection.get('imt'));
							
							theMain.set('pkgtpcd',selection.get('pkgtpcd'));
							theMain.set('pkgtpnm',selection.get('pkgtpnm'));
						}
						
						
						//Detail load MT, M3, QTY when create new SDO
//						if(theMain.get('sdono') == null || theMain.get('sdono') == ''){
//							var sdoGridStore = grid.getStore() == null ? null : grid.getStore();
//							
//							if(sdoGridStore.data.length <= 0){				
//								refs.ctlDDmt.setValue(Number(theMain.data.doDMt));
//								refs.ctlDM3.setValue(Number(theMain.data.doDM3));
//								refs.ctlDQty.setValue(Number(theMain.data.doDQty));
//								
//								refs.ctlImt.setValue(Number(theMain.data.doIMt));
//								refs.ctlIm3.setValue(Number(theMain.data.doIM3));
//								refs.ctlIQty.setValue(Number(theMain.data.doIQty));
//							}else{
//								var sumDMtInGrid = 0; var sumDM3InGrid = 0; var sumDQtyInGrid = 0;
//								var sumIMtInGrid = 0; var sumIM3InGrid = 0; var sumIQtyInGrid = 0;
//								
//								for(var i =0; i< sdoGridStore.data.length; i++){
//									sumDMtInGrid += Number(sdoGridStore.data.items[i].data.dmt);
//									sumDM3InGrid += Number(sdoGridStore.data.items[i].data.dm3);
//									sumDQtyInGrid += Number(sdoGridStore.data.items[i].data.dqty);
//									sumIMtInGrid += Number(sdoGridStore.data.items[i].data.imt);
//									sumIM3InGrid += Number(sdoGridStore.data.items[i].data.im3);
//									sumIQtyInGrid += Number(sdoGridStore.data.items[i].data.iqty);
//								}
//								
//								refs.ctlDDmt.setValue(Number(theMain.data.doDMt) - sumDMtInGrid);
//								refs.ctlDM3.setValue(Number(theMain.data.doDM3) - sumDM3InGrid);
//								refs.ctlDQty.setValue(Number(theMain.data.doDQty) - sumDQtyInGrid);
//								
//								refs.ctlImt.setValue(Number(theMain.data.doIMt) - sumIMtInGrid);
//								refs.ctlIm3.setValue(Number(theMain.data.doIM3) - sumIM3InGrid);
//								refs.ctlIQty.setValue(Number(theMain.data.doIQty) - sumIQtyInGrid);
//							}
//						} 
//						//Detail load MT, M3, QTY when open a created SDO
//						else {
//							refs.ctlDDmt.setValue(Number(theMain.data.dmt));
//							refs.ctlDM3.setValue(Number(theMain.data.dm3));
//							refs.ctlDQty.setValue(Number(theMain.data.dqty));
//							
//							refs.ctlImt.setValue(Number(theMain.data.imt));
//							refs.ctlIm3.setValue(Number(theMain.data.im3));
//							refs.ctlIQty.setValue(Number(theMain.data.iqty));
//						}

						if(me.cudFlag == 'C'){
							me.onActiveFieldset();
							//theMain.set('tspttpcd', '');
							//theMain.set('itspttpcd', '');
						}else if(theMain.get('delvTpCd') == CodeConstants.MT_DELVTP_I){
							refs.ctlIModeOper.setDisabled(true);
						}

						packageDetail.load({
							params: {
								searchType: 'SDO',
								blno: theMain.get('blno'),
								mfdocid: theMain.get('mfdocid'),
								vslCallId: theMain.get('vslCallId'),
								sdono: theMain.get('sdono')
							},
							callback: function(records, operation, success) {
								if(success) {
									for(var i = 0; i < records.length; i++){
										if(records[i].get('sdono') !== '' && records[i].get('sdono') !== null && records[i].get('sdono') == theMain.get('sdono') && (me.cudFlag != 'C')){
											records[i].set('chk', true);
										}
									}
									if(selection && theMain.get('projectCargo') == 'Y'){
										me.onPackageCalculation();
									}
								}
							}
						});
						refs.refWeightChk.setDisabled(MOST.config.Token.getUserType() == CodeConstants.USER_TYPE_INTERNAL ? false : true);
						
						if(me.cudFlag != 'C'){
							refs.ctlDeliveryMode.setDisabled(true);
						}
					}
				}
			}
		});
		
		var subDO = recvData.data.sdono;
		if (subDO == '') {
			me.CHECKING_FLAG = true;
		} else {
			me.CHECKING_FLAG = false;
		}
		
	},
	
	setDetailControl:function(recvData){
		var me = this;
		var refs = me.getReferences();
		var deliveryOrderDetail = me.getStore(me.DELIVERYORDER_DETAIL_STORE);
		var detailItem = me.getViewModel()
		var bizViewAlias = me.getView().detailViewAlias;
//		var params = recvData.data;
//		
//		params.searchType = 'detail';
		if(recvData.get('cgtpcd') == CodeConstants.MT_CGTP_RCV){
			refs.refROROTab.setDisabled(false);
			refs.refChkMulti.setHidden(true);
			var unitList = me.getStore(me.CONTAINER_STORE_NAME);
			unitList.load({
				params:{
					vslCallId	: recvData.get('vslCallId'),
					mfDocId 	: recvData.get('mfdocid'),
					blNo 		: recvData.get('blno')
				},
				callback: function(records, operation, success) {
					if(success){}
				}
			});
		}else{

			refs.refROROTab.setDisabled(true);
		}
		deliveryOrderDetail.load({
			params: {
				searchType: 'detail',
				blno: recvData.get('blno'),
				mfdocid: recvData.get('mfdocid'),
				vslCallId: recvData.get('vslCallId'),
				dono: recvData.get('dono')
			},
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						var theMainModel = Ext.create('MOST.model.document.DeliveryOrder');
						var packageDetail = me.getStore(me.PACKAGE_DETAIL_STORE);
						var fileUpload = me.getStore(me.FILE_UPLOAD_STORE_NAME);
						
						refs.refDomesticChk.checked = records[0].get('domesticChk') == 'Domestic Cargo' ? true : false;
						refs.refWeightChk.checked = records[0].get('wgtChk') == 'Y' ? false : true;
						refs.refAdditionalChk.checked = records[0].get('additionalChk') == 'Y' ? true : false;
						/*refs.refNilMarks.checked = records[0].get('nilmarks') == 'Y' ? true : false;*/
						
						theMainModel.phantom = false; // UPDATE
						theMainModel.data = records[0].data;
						theMainModel.data.estdt = records[0].get('estDt');
						
						if(records[0].get('dono') === null || records[0].get('dono') === ''){
							theMainModel.set('checkExistDO', 'true');
						}else{
							theMainModel.set('checkExistDO', 'false');
						}
						
						me.getViewModel().setData({theMain:theMainModel});
						
//						if(theMainModel.get('cgtpcd') === CodeConstants.MT_CGTP_DBN || theMainModel.get('cgtpcd') === 'DBE'){
//							if(theMainModel.get('delvTpCd') === CodeConstants.VSLSCH_DELV_TP_CD_BOTH){
//								refs.ctlImt.setReadOnly(false);
//								refs.ctlIm3.setReadOnly(false);
//								refs.ctlDDmt.setReadOnly(false);
//								refs.ctlDM3.setReadOnly(false);
//							}else if(theMainModel.get('delvTpCd') === CodeConstants.MT_DELVTP_I){
//								refs.ctlImt.setReadOnly(false);
//								refs.ctlIm3.setReadOnly(false);
//								refs.ctlDDmt.setReadOnly(true);
//								refs.ctlDM3.setReadOnly(true)
//							}else{
//								refs.ctlImt.setReadOnly(true);
//								refs.ctlIm3.setReadOnly(true);
//								refs.ctlDDmt.setReadOnly(false);
//								refs.ctlDM3.setReadOnly(false)
//							}
//						}else{
//							if(theMainModel.get('delvTpCd') === CodeConstants.VSLSCH_DELV_TP_CD_BOTH){
//								refs.ctlImt.setReadOnly(true);
//								refs.ctlIm3.setReadOnly(true);
//								refs.ctlDDmt.setReadOnly(true);
//								refs.ctlDM3.setReadOnly(true);
//							}
//							
//							if(theMainModel.get('delvTpCd') === CodeConstants.MT_DELVTP_I){
//								refs.ctlImt.setReadOnly(false);
//								refs.ctlIm3.setReadOnly(false);
//								refs.ctlDDmt.setReadOnly(true);
//								refs.ctlDM3.setReadOnly(true);
//							}
//						}
						
//						if(theMainModel.get('checkExistDO') === 'true'){
//							me.calculateAmount(records[0]);
//						}
						
						var theMain = me.getViewModel().get('theMain');
						var indirectTstpCombo = me.getViewModel().getStore(me.INDIRECT_TRANSPORT_STORE);
						var filekeyId = theMain.get('vslCallId') +"_"+ theMain.get('mfdocid')+"_"+ theMain.get('dono');
						
						refs.refTxtSubDoNo.setHidden(true);
						refs.refTxtDoNo.setHidden(false);
						
						if(theMain.data.delvTpCd == 'I'){							
							refs.refFsDirect.setDisabled(true);
							refs.refFsInDirect.setDisabled(false);
						}
						
						if(theMain.data.delvTpCd == 'B'){							
							refs.refFsDirect.setDisabled(false);
							refs.refFsInDirect.setDisabled(false);
						}
						
						if(theMain.get('dono') == null || theMain.get('dono') == ''){
							theMain.set('dono', 'DO' + theMain.get('blno'));
						}
						
//						if(theMainModel.get('delvTpCd') == CodeConstants.MT_DELVTP_D){
//							refs.refFsInDirect.setDisabled(true);
//							refs.refFsDirect.setDisabled(false);
//						}else if(records[0].get('delvTpCd') == CodeConstants.MT_DELVTP_I){
//							refs.refFsInDirect.setDisabled(false);
//							refs.refFsDirect.setDisabled(true);
//						} else {
//							refs.refFsInDirect.setDisabled(false);
//							refs.refFsDirect.setDisabled(false);
//						}
//						
//						if(theMain.get('cgtpcd') === CodeConstants.MT_CGTP_BBK){
//							if ((theMain.get('delvTpCd') === CodeConstants.VSLSCH_DELV_TP_CD_BOTH) || (theMain.get('delvTpCd') === CodeConstants.MT_DELVTP_I)){
//								var curMT =  (theMain.get('wgt') == '') ? 0 : theMain.get('wgt');
//								var curM3 =  (theMain.get('vol') == '') ? 0 : theMain.get('vol'); 
//								var curQty =  (theMain.get('pkgqty') == '') ? 0 : theMain.get('pkgqty');
//								var iMT =  (theMain.get('imt') == '') ? 0 : theMain.get('imt');
//								var iM3 =  (theMain.get('im3') == '') ? 0 : theMain.get('im3'); 
//								var iQty =  (theMain.get('iqty') == '') ? 0 : theMain.get('iqty');
//								var dMT =  (theMain.get('dmt') == '') ? 0 : theMain.get('dmt');
//								var dM3 =  (theMain.get('dm3') == '') ? 0 : theMain.get('dm3'); 
//								var dQty =  (theMain.get('dqty') == '') ? 0 : theMain.get('dqty');
//								
//								if ((iMT == 0) && (iM3 == 0) && (iQty == 0) && (dMT == 0) && (dM3 == 0) &&(dQty == 0)){
//									theMain.set('iqty', curQty);
//									theMain.set('imt', curMT);
//									theMain.set('im3', curM3);
//								}
//								
//								if ( StringUtil.isNullorEmpty(theMain.get('itspttpcd')) ){
//									if (me.getViewModel().getStore(me.INDIRECT_TRANSPORT_STORE).data.length > 0 ){
//										me.getViewModel().getStore(me.INDIRECT_TRANSPORT_STORE).each(function(data, index){
//											if(data.get('scdNm') =='Lorry'){
//												theMain.set('itspttpcd', data.get('scd'));
//											}
//										});
//									}
//								}
//							}
//						}
						
						if(theMain.get('projectCargo') == 'Y'){
							refs.refDeliveryPackageDetail.setDisabled(false);
						} else {
							refs.refDeliveryPackageDetail.setDisabled(true);
						}
						
						packageDetail.load({
							params:{
								blno: theMain.get('blno'),
								mfdocid: theMain.get('mfdocid'),
								vslCallId: theMain.get('vslCallId')
							}
						});
						
						fileUpload.load({
							params: {
								pgmId: FileConstant.DELIVERYORDER_SCREEN_PGM_ID,
								catgCd: filekeyId
							},
							callback: function(records, operation, success) {
								if(success) {
								}
							}
						});
						
						refs.refWeightChk.setDisabled(MOST.config.Token.getUserType() == CodeConstants.USER_TYPE_INTERNAL ? false : true);
					}
				}
			}
		});
	},
	
	onMultiCheckChange: function(chkbox, rowIdx, checked, record, e, eOpts){
		var me = this;
		var store = me.getStore(me.CONTAINER_STORE_NAME);
		var refs = me.getReferences();
		var qty = 0, wgt = 0, msrmt = 0 ;
		
		if (checked) {
			record.set({
				chkCdNm: 1
			});
		} else {
            record.set({
            	chkCdNm: 0
            });
		}
		store.commitChanges();
		
	},
	
	calculateAmount: function(theMain){
		var me = this;
		var refs = me.getReferences();
		var curMT =  (theMain.get('wgt') == '') ? 0 : theMain.get('wgt');
		var curM3 =  (theMain.get('vol') == '') ? 0 : theMain.get('vol'); 
		var curQty =  (theMain.get('pkgqty') == '') ? 0 : theMain.get('pkgqty');
		var newDmt = (theMain.get('dmt') == '') ? 0 : theMain.get('dmt');
		var newImt = (theMain.get('imt') == '') ? 0 : theMain.get('imt');
		var newDM3 = (theMain.get('dm3') == '') ? 0 : theMain.get('dm3');
		var newIM3 = (theMain.get('im3') == '') ? 0 : theMain.get('im3');
		var newDQty = (theMain.get('dqty') == '') ? 0 : theMain.get('dqty');
		var newIQty = (theMain.get('iqty') == '') ? 0 : theMain.get('iqty');
		var eachWgt = theMain.get('eachWgt');
		var eachVol = theMain.get('eachVol');
		
		if(theMain.get('delvTpCd') === CodeConstants.MT_DELVTP_I){
			if (newIQty == 0) {
				theMain.set('imt', curMT);
				theMain.set('im3', curM3);
				theMain.set('iqty', curQty);			
			}else{
				theMain.set('imt', parseFloat(eachWgt * newIQty));
				theMain.set('im3', parseFloat(eachVol * newIQty));
			}
		}else if(theMain.get('delvTpCd') === CodeConstants.MT_DELVTP_D){
			theMain.set('dmt', parseFloat(eachWgt * newDQty));
			theMain.set('dm3', parseFloat(eachVol * newDQty));
		}else{
			if (newDQty == 0) {
				theMain.set('imt', curMT);
				theMain.set('im3', curM3);
				theMain.set('iqty', curQty);
			}else{
				theMain.set('dmt', parseFloat(eachWgt * newDQty));
				theMain.set('dm3', parseFloat(eachVol * newDQty));
			    
				theMain.set('imt', parseFloat(curMT - (eachWgt * newDQty)));
				theMain.set('im3', parseFloat(curMT - (eachVol * newDQty)));
				theMain.set('iqty', (curQty - newDQty));
			}
		}
	},
	
	onIMtOver:function(field){
		var me = this;
		var refs = me.getReferences();
		var sumMt = 0;
		var arrMode = ['RR', 'SE', 'OH']
		var iMode = refs.ctlIModeOper.getValue();
		
		if(arrMode.indexOf(iMode)<0){
			if(Ext.isEmpty(refs.ctlILrryMt.getValue())){
				refs.ctlILrryMt.setValue(0)
		    }
		
			if(Ext.isEmpty(refs.ctlIWagonMt.getValue())){
				refs.ctlIWagonMt.setValue(0)
			}
		
			sumMt = parseFloat(refs.ctlILrryMt.getValue()) + parseFloat(refs.ctlIWagonMt.getValue());
		}
	},
	
	onDMtOver:function(field, event){
		var me = this;
		var refs = me.getReferences();
		var sumMt = 0;
		var arrMode = ['RR', 'SE', 'OH']
		var dMode = refs.ctlModeOper.getValue();
		
		if(arrMode.indexOf(dMode)<0){
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
			sumMt = sumMt.toFixed(3);
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
	
	openVslCallListPopup: function(){
    	var me = this;
		me.openCodePopup('popup-vesselcalllistpopup', 'ctlVessel');
    },
    
    onCheckTruckAssign: function(){
    	var me = this;
    	var store = me.getStore('LorryAssignmentGridList');
    	var detailItem = me.getViewModel().get('theMain');
		
    	// Fixing 0132165: [Master DO Detail] System should not allow to update Transport Company in DO if its SDO has assigned truck
    	store.load({
			params:{
				vslCallId: detailItem.data.vslCallId,
				blNo: detailItem.data.blno				
			},
			callback: function(records, operation, success) {
				if(success){
//					if(records.length > 0){
//						MessageUtil.warning("deliveryOrder", "SDO has been generated, can't update this information.");
//			    		return;
					//}else{
						me.saveProcess();						
					//}
				}	
			}			
		});				
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
    			var store = me.getStore(me.FILE_UPLOAD_STORE_NAME);
    			var bizViewAlias = me.getView().detailViewAlias;
    			
    			store.getModifiedRecords().forEach(function(record, index, array){
    	    		record.set('ufileName', rtnData[record.get('fileName')]);
    	    	});
    			
				if (!me.weightCheck()){
					return;
				}
				
				if (!me.calcM3()){
					return;
				}
				
				if (!me.calcQty()){
					return;
				}
				
				me.onCheckTruckAssign();  // Fixing 0132165: [Master DO Detail] System should not allow to update Transport Company in DO if its SDO has assigned truck
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
	/**
	 * =========================================================================================================================
	 * DETAIL END
	 */
	onExport:function(){
		var me = this; 
		var refs = me.getReferences();
		var pdfStore = me.getStore(me.GENERATE_PDF_DO_STORE);
		var theMain = me.getViewModel().getData().theJpvc;
		var ExportRadioChk = refs.refRadioReportType.getValue().rb;
		
		pdfStore.load({
			params:{
				vslCallId: theMain.get('vslCallId'),
				blNo: theMain.get('blNo'),
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
		})
	},
	
	onDetailPreview:function(){
		var me = this;
		var refs = me.getReferences();
		var bizViewAlias = me.getView().detailViewAlias;
		if(bizViewAlias == 'app-subdeliveryorderdetail') {
			var detailItem = me.getViewModel().get('theMain');
			var searchParm = Ext.create("MOST.model.pdfprint.SearchReportBizParm");
			
			var params = me.createParam(searchParm, ['file','serviceId','param1']);
			params['file'] = me.SDO_PDF_FILE; // report format file name
			params['serviceId'] = me.SDO_PDF_FUNCTION; // calling function 
			params['branchCode'] = MOST.config.Token.getBranchCode(); // branch code fro multi db
			params['param1'] = detailItem.get("vslCallId"); //vessel call id
			params['param2'] = detailItem.get("blno"); //BL No
			params['param3'] = detailItem.get("sdoNo"); //SDO NO.
			params['param4'] = MOST.config.Token.getUserId(); //user Id
			
			me.openPDFPreview(params);
		}
		
//		var pdfStore = me.getStore(me.GENERATE_PDF_DO_STORE);
//		var theMain = me.getViewModel().getData().theJpvc;
//		
//		if(!theMain){
//			return;
//		}
//		
//		pdfStore.load({
//			params:{
//				vslCallId: theMain.get('vslCallId'),
//				blno: theMain.get('blno'),
//				delvtpcd: theMain.get('delvTpCd'),
//				userId: MOST.config.Token.getUserId(),
//				searchType:'PDF'
//			},
//			callback: function(records, operation, success) {
//				if (success) {
//					me.openPDFPreview (records, operation, success);
//				}
//			}
//		})
	},
	
	onDetailDownload(){
		var me = this;
		var refs = me.getReferences();
		
		var bizViewAlias = me.getView().detailViewAlias;
		if(bizViewAlias == 'app-subdeliveryorderdetail') {
			var detailItem = me.getViewModel().get('theMain');
			var searchParm = Ext.create("MOST.model.pdfprint.SearchReportBizParm");
			
			var params = me.createParam(searchParm, ['file','serviceId','param1']);
			params['file'] = me.SDO_PDF_FILE; // report format file name
			params['serviceId'] = me.SDO_PDF_FUNCTION; // calling function 
			params['branchCode'] = MOST.config.Token.getBranchCode(); // branch code fro multi db
			params['param1'] = detailItem.get("vslCallId"); //vessel call id
			params['param2'] = detailItem.get("blno"); //BL No
			params['param3'] = detailItem.get("sdono"); //SDO NO.
			params['param4'] = MOST.config.Token.getUserId(); //user Id
			
			me.openPDFPreview(params);
		}
		
//		var theMain = me.getViewModel().getData().theJpvc;
//		
//		if(!theMain){
//			return;
//		}
//		
//		var params = {
//			initSearch: true
//		};
//		
//		me.openCodePopup('popup-exporttypepopup','refBtnDownload', params);
	},
	
	onPreviewLoad:function(){
		var me = this;
		var refs = me.getReferences();
	},
	
	onDownloadCancel:function(ownWin){
		var me = this;
		var winAlias = "popupAliaspopup-exporttypepopup";
		var win = me.lookupReference(winAlias);
		
		win.close();
	},
	
	onDownloadExport:function(){
		var me = this; 
		var refs = me.getReferences();
		var pdfStore = me.getStore(me.GENERATE_PDF_DO_STORE);
		var theMain = me.getViewModel().getData().theJpvc;
		var ExportRadioChk = refs.refRadioReportType.getValue().rb;
		
		pdfStore.load({
			params:{
				vslCallId: theMain.get('vslCallId'),
				blNo: theMain.get('blNo'),
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
		})
	},	
	
	openTruckAssignment: function(){
		var me = this;
		var prefix = 'menu';
		var menuId = 'MPDM108';
		var id = prefix + '_' + menuId;
		var mainView = me.getView().findParentByType('app-main');
		var tabs = mainView.lookupReference('ref-maintab');
		var tab = tabs.items.getByKey(id);
		//var theMain = me.getViewModel().get('theMain');
		
		var doGrid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = doGrid.getSelection() == null ? null : doGrid.getSelection()[0];	
		
		//Fix: Vessel Info didn't display after selected a SDO record to navigate to Truck Assignment screen
		if(selection){
			selection.data.vslCd = me.getViewModel().get('theSearch').get('vslCd');
			selection.data.vslNm = me.getViewModel().get('theSearch').get('vslNm');
			selection.data.berthLoc = me.getViewModel().get('theSearch').get('berthLoc');
			selection.data.voyage = me.getViewModel().get('theSearch').get('voyage');
			selection.data.arrvSaId = me.getViewModel().get('theSearch').get('arrvSaId');
			selection.data.eta = me.getViewModel().get('theSearch').get('eta');
			selection.data.etd = me.getViewModel().get('theSearch').get('etd');
		}
		
		if(selection){
			selection.set('screenAlias', 'app-listofdeliveryorder');
			if(!tab){
				me.loadMenuView('app-lorryassignment', selection.clone());
			} else {
				me.fireEvent('onRedirectTruckAssignment', selection.clone());
				tabs.setActiveTab(tab);
			}
		}
	},
	
	/**
	 * HHT METHOD START
	 * =========================================================================================================================
	 */	
	
	onHHTLoad: function(){
		var me = this;
		var refs = me.getReferences();
		
		refs.refJpvcText.setRequired(true);
	},
	
	onSearchHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
    	var params = me.getSearchConditionHHT();
    	
    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						
					}else{
						MessageUtil.warning("deliveryOrder", "datanotfound_msg");
						return;
					}
				}
			}
		});
	},
	
	getSearchConditionHHT : function(){
		var me = this;
     	var refs = me.getReferences();
     	var vesselNo = refs.refJpvcText.getValue();
     	var blNo = refs.refblNo.getValue();
     	var dateCondition = null;
     	var etaFrom = '';
     	var etaTo = '';
     	var searchType = 'list';
     	
     	if((vesselNo == '' || vesselNo == null) && ((refs.refFromDt.getValue() == '' || refs.refFromDt.getValue() == null) || (refs.refToDt.getValue() == '' || refs.refToDt.getValue() == null))){
     		MessageUtil.warning("deliveryOrder", "deliveryOrder_search_null_msg");
    		return;
     	}
     	
     	if(refs.refFromDt.getValue() != null && refs.refToDt.getValue() != null){
     		dateCondition = me.checkPeriodDate("refFromDt", "refToDt", me.MAX_DATE_ALLOW, true);
     		etaFrom = dateCondition.fromDtString;
    		etaTo = dateCondition.toDtString;
     	}
     	
    	var params = {
    		vslCallId : vesselNo,
    		searchType: searchType,
    		blno: blNo,
    		etaFrom: etaFrom,
    		etaTo: etaTo,
		};
    	
    	return params;
	},
	
	onHHTDblClick: function() {
		var me = this; 
		var window = me.getView().up('window');
		
    	window.returnValue = me.getReturnData();
       	window.close();
	},
	
	getReturnData:function(){
		var me = this;
		var selection;
		var grid = me.lookupReference('refDeliveryOrderHHTGrid');
		
		selection = grid.getSelection() == null ? null : grid.getSelection();
		
		var returnItem = {
			code : selection.data.dono,
			codeName : selection.data.dono,
			item : selection
		}
		
		return returnItem;
	},
	
	onSelectData : function(ref){
		var me = this; 
		var window = me.getView().up('window');
		
		if(ref.getReference() == 'refBtnSelectDOHHT'){//Select from JPVC:
			window.returnValue = me.getJPVCReturnDataHHT();
		}
		
		if(window.returnValue != null){
			window.close();	
		}
	},
	
	getJPVCReturnDataHHT : function() {
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		var grid = me.lookupReference('refDeliveryOrderHHTGrid');
		
		selection = grid.getSelection() == null ? null : grid.getSelection();
		
		if(selection == null){
			MessageUtil.warning('Warning', 'tbl_sts_select');
			return null;
		}
		
		var returnItem = {
			code : selection.data.dono,
			codeName : selection.data.dono,
			item : selection
		}

    	window.returnValue = returnItem;
		if(window.returnValue != null){
			window.close();	
		}
	},
	
	exportTo: function(btn) {
		var me = this;
		var refs = me.getReferences();
	    var cfg = Ext.merge({
	        title: 'Delivery Order',
	        fileName: 'Delivery_Order' + '.' + (btn.cfg.ext || btn.cfg.type)
	    }, btn.cfg);
	    var grid = refs.refListOfDeliveryOrderGrid;
	    
	    grid.saveDocumentAs(cfg);
	},
	
	validateAmount:function(item, new_val, old_val, org){
		var me = this;
		var theMain = me.getViewModel().get('theMain');
		var refs = me.getReferences();
		var curMT =  (theMain.get('wgt') == '') ? 0 : theMain.get('wgt');
		var curM3 =  (theMain.get('vol') == '') ? 0 : theMain.get('vol'); 
		var curQty =  (theMain.get('pkgqty') == '') ? 0 : theMain.get('pkgqty');
		var docMt = Number(refs.ctlDocMt.getValue());
		var docM3 = Number(refs.ctlVol.getValue());
		var docQty = Number(refs.ctlPkgQty.getValue());
		var eachWgt = docMt / docQty;
		var eachVol = docM3 / docQty;
		
		if((theMain.get('cgtpcd') !== 'DBN') && (theMain.get('cgtpcd') !== 'DBE')){
			if(theMain.get('cgtpcd') =='DBN' && theMain.get('projectCargo') =='Y'){
				
			} else {
				if(theMain.get('delvTpCd') === 'B'){
		            if(item.reference === 'ctlDQty'){
		            	var newDmt = parseFloat(eachWgt * new_val);
						var newDVol = parseFloat(eachVol * new_val);
	
						theMain.set('dmt', newDmt);
						theMain.set('dm3', newDVol);
	
						if (refs.ctlIQty.getValue() == 0) {	
							newImt = 0;
							newIM3 = 0;
							theMain.set('dmt', curMT);
							theMain.set('dm3', curM3);
						}else {
							newImt = parseFloat(curMT - newDmt);
							newIM3 = parseFloat(curM3 - newDVol);
						}						
							
						var balIQty = parseFloat(curQty - new_val);
							
						if(balIQty < 0){
							balIQty = 0;
						}
							
						if(newImt < 0){
							newImt = 0;
						}
							
						if(newIM3 < 0){
							newIM3 = 0;
						}
							
						theMain.set('iqty', balIQty);
						theMain.set('imt', newImt);
						theMain.set('im3', newIM3);
					}
					if(item.reference === 'ctlIQty'){
		            	var newImt = parseFloat(eachWgt*new_val);
						var newIVol = parseFloat(eachVol*new_val);
	
						theMain.set('imt', newImt);
						theMain.set('im3', newIVol);
	
						if (refs.ctlDQty.getValue() == 0) {	
							newDmt = 0;
							newDM3 = 0;
							
							theMain.set('imt', curMT);
							theMain.set('im3', curM3);
						} else {
							newDmt = parseFloat(curMT - newImt);
							newDM3 = parseFloat(curM3 - newIVol);
						}

						var balDQty = parseFloat(curQty - new_val);
							
						if(balDQty < 0){
							balDQty = 0;
						}
							
						if(newDmt < 0){
							newDmt = 0;
						}
							
						if(newDM3 < 0){
							newDM3 = 0;
						}
	
						theMain.set('dqty', balDQty);
						theMain.set('dmt', newDmt);
						theMain.set('dm3', newDM3);
					}
				} else if(theMain.get('delvTpCd') === CodeConstants.MT_DELVTP_I){
					if (refs.ctlIQty.getValue() == curQty) {
						var newImt = curMT;
						var newIVol = curM3;
					}else{
						var newImt = parseFloat(eachWgt*new_val);
						var newIVol = parseFloat(eachVol*new_val);
					}
					
					theMain.set('imt', newImt);
					theMain.set('im3', newIVol);
					
					refs.ctlDQty.setReadOnly(true);				    
				} else {
					if (refs.ctlDQty.getValue() == curQty) {
						var newDmt = curMT;
						var newDVol = curM3;
					}else{
						var newDmt = parseFloat(eachWgt*new_val);
						var newDVol = parseFloat(eachVol*new_val);
					}
					
					theMain.set('dmt', newDmt);
					theMain.set('dm3', newDVol);
					
					refs.ctlIQty.setReadOnly(true);				    
				}
			}
		}
	},
	
	validateAmount2:function(item, new_val, old_val, org){
		var me = this;
		var theMain = me.getViewModel().get('theMain');
		var refs = me.getReferences();
		var docMt = Number(refs.ctlDocMt.getValue());
		var docM3 = Number(refs.ctlVol.getValue());
		var docQty = Number(refs.ctlPkgQty.getValue());
		var eachWgt = docMt / docQty;
		var eachVol = docM3 / docQty;
		
		if(theMain.get('cgtpcd') === CodeConstants.MT_CGTP_BBK){
			if(theMain.get('delvTpCd') === CodeConstants.MT_DELVTP_I){
				/*
				if (refs.ctlIQty.getValue() == Number(theMain.get('balQty'))) {
					var newImt = theMain.get('balMt');
					var newIVol = theMain.get('balM3');
				}else{
					var newImt = parseFloat(eachWgt*new_val);
					var newIVol = parseFloat(eachVol*new_val);
				}
				*/
				if(refs.refProjectCargo.getValue() == false){
					theMain.set('imt', Number(eachWgt) * refs.ctlIQty.getValue());
					theMain.set('im3', Number(eachVol) * refs.ctlIQty.getValue());	
				}
				
				refs.ctlDQty.setReadOnly(true);				    
			} else {
//				if (refs.ctlDQty.getValue() == Number(theMain.get('balQty'))) {
//					var newDmt = theMain.get('balMt');
//					var newDVol = theMain.get('balM3');
//				}else{
//					var newDmt = parseFloat(eachWgt*new_val);
//					var newDVol = parseFloat(eachVol*new_val);
//				}
				
				if(refs.refProjectCargo.getValue() == false){
					theMain.set('dmt', Number(eachWgt) * refs.ctlDQty.getValue());
					theMain.set('dm3', Number(eachVol) * refs.ctlDQty.getValue());	
				}
				
				refs.ctlIQty.setReadOnly(true);				    
			}
		}else if(theMain.get('cgtpcd') === CodeConstants.MT_CGTP_RCV){
			if (me.CHECKING_FLAG == true) {
				if(theMain.get('sdono')  == null || theMain.get('sdono') == '' ){
					if(me.cudFlag != 'C'){
						if(theMain.get('delvTpCd') === CodeConstants.MT_DELVTP_I){
							if(new_val != 0 && new_val != me.roroQty ){
								MessageUtil.warning("Delivery Order", "Please select Units Number!");
								refs.ctlIQty.setValue("0");
							}
						}else{
							if(new_val != 0 && new_val != me.roroQty ){
								MessageUtil.warning("Delivery Order", "Please select Units Number!");
								refs.ctlDQty.setValue("0");
							}
						}
					}
				}else{
					if(theMain.get('delvTpCd') === CodeConstants.MT_DELVTP_I){
						if(new_val != 0){
							if(new_val != 0 && new_val > me.getViewModel().get('unitList').totalCount){
								MessageUtil.warning("Delivery Order", "Please select Units Number to change the quantity");
								refs.ctlIQty.setValue("0");
							}
						}else{
							if(theMain.get('iqty') != null && Number(theMain.get('iqty')) > me.getViewModel().get('unitList').totalCount){
								MessageUtil.warning("Delivery Order", "Please select Units Number to change the quantity");
								refs.ctlIQty.setValue("0");
							}
						}
					}else{
						if(new_val != 0){
							if(new_val != 0 && new_val > me.getViewModel().get('unitList').totalCount){
								MessageUtil.warning("Delivery Order", "Please select Units Number to change the quantity");
								refs.ctlDQty.setValue("0");
							}
						}else{
							if(theMain.get('dqty') != null && theMain.get('dqty') != me.getViewModel().get('unitList').totalCount.toString()){
								MessageUtil.warning("Delivery Order", "Please select Units Number to change the quantity");
								refs.ctlDQty.setValue("0");
							}
						}
					}
				}
			}
		}
	},
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var refs = me.getReferences();
		
		var searchBizParm = me.getSearchCondition();

		var gridList = Ext.ComponentQuery.query('tsb-datagrid', me.getView());
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.document.SearchDeliveryOrderParm';
		searchBizParm.serviceID = 'MOST.deliveryOrder.selectDeliveryOrder';
		
		me.exportExcelPdfWithServer(gridList[0].referenceKey,searchBizParm, isExcel);
		
		
		var subExportGenerate = new Ext.util.DelayedTask(function() {
			var me = this;
			var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
			var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
			
			var gridList = Ext.ComponentQuery.query('tsb-datagrid', me.getView());
			
			var subParams = {
					mfdocid 	: selection.get('mfdocid'),
					blno 		: selection.get('blno'),
					dono 		: selection.get('dono'),
					sdono 		: selection.get('sdono'),
					vslCallId 	: selection.get('vslCallId')
			};

			
			subParams.classID = 'com.tsb.most.biz.parm.document.SearchDeliveryOrderParm';
			subParams.serviceID = 'MOST.deliveryOrder.selectSubDeliveryOrder';
			
			me.exportExcelPdfWithServer(gridList[1].referenceKey,subParams, isExcel);
			
		});
		
		
		subExportGenerate.delay(2000, null, me);
	},
	

	
	onChangeMtDirectField: function(){
		var me = this;
		var refs = me.getReferences();
		
		refs.ctlDDmt.setValue(Number(refs.ctlDoVslDmt.getValue()) + Number(refs.ctlDoLorryDmt.getValue()));
	},
	
	onChangeM3DirectField: function(){
		var me = this;
		var refs = me.getReferences();
		
		refs.ctlDM3.setValue(Number(refs.ctlDoVslDm3.getValue()) + Number(refs.ctlDoLorryDm3.getValue()));
	},
	
	onChangeQtyDirectField: function(){
		var me = this;
		var refs = me.getReferences();
		
		refs.ctlDQty.setValue(Number(refs.ctlDoVslDQty.getValue()) + Number(refs.ctlDoLorryDQty.getValue()));
	},
	
	onChangeMtIndirectField: function(){
		var me = this;
		var refs = me.getReferences();
		
		refs.ctlImt.setValue(Number(refs.ctlDoVslImt.getValue()) + Number(refs.ctlDoLorryImt.getValue()));
	},
	
	onChangeM3IndirectField: function(){
		var me = this;
		var refs = me.getReferences();
		
		refs.ctlIm3.setValue(Number(refs.ctlDoVslIm3.getValue()) + Number(refs.ctlDoLorryIm3.getValue()));
	},
	
	onChangeQtyIndirectField: function(){
		var me = this;
		var refs = me.getReferences();
		var theMain = me.getViewModel().get('theMain'); 
		
		if(me.DO3 != theMain.get('dono')){
			me.DO3 = theMain.get('dono');
			return;
		}
		var docMt = Number(refs.ctlDocMt.getValue());
		var docM3 = Number(refs.ctlVol.getValue());
		var docQty = Number(refs.ctlPkgQty.getValue());
		var eachWgt = docMt / docQty;
		var eachVol = docM3 / docQty;
		refs.ctlImt.setValue(Number(refs.ctlIQty.getValue()) * eachWgt);
		refs.ctlIm3.setValue(Number(refs.ctlIQty.getValue()) * eachVol);
		//eMantis: 0167956
	},
	
	onChangeDQtyVslField: function(){
		var me = this;
		var refs = me.getReferences();
		var theMain = me.getViewModel().get('theMain'); 
		
		if(me.DO != theMain.get('dono')){
			me.DO = theMain.get('dono');
			return;
		}
		var docMt = Number(refs.ctlDocMt.getValue());
		var docM3 = Number(refs.ctlVol.getValue());
		var docQty = Number(refs.ctlPkgQty.getValue());
		var eachWgt = docMt / docQty;
		var eachVol = docM3 / docQty;
		refs.ctlDQty.setValue(Number(refs.ctlDoVslDQty.getValue()) + Number(refs.ctlDoLorryDQty.getValue()));
		refs.ctlDoVslDmt.setValue(Number(refs.ctlDoVslDQty.getValue()) * eachWgt);
		refs.ctlDoVslDm3.setValue(Number(refs.ctlDoVslDQty.getValue()) * eachVol);
	},
	
	onChangeDQtyLorryField: function(){
		var me = this;
		var refs = me.getReferences();
		var theMain = me.getViewModel().get('theMain'); 
		
		if(me.DO1 != theMain.get('dono')){
			me.DO1 = theMain.get('dono');
			return;
		}
		
		var docMt = Number(refs.ctlDocMt.getValue());
		var docM3 = Number(refs.ctlVol.getValue());
		var docQty = Number(refs.ctlPkgQty.getValue());
		var eachWgt = docMt / docQty;
		var eachVol = docM3 / docQty;
		refs.ctlDQty.setValue(Number(refs.ctlDoVslDQty.getValue()) + Number(refs.ctlDoLorryDQty.getValue()));
		refs.ctlDoLorryDmt.setValue(Number(refs.ctlDoLorryDQty.getValue()) * eachWgt);
		refs.ctlDoLorryDm3.setValue(Number(refs.ctlDoLorryDQty.getValue()) * eachVol);
	},
	
	onChangeIQtyLorryField: function(){
		var me = this;
		var refs = me.getReferences();
		var theMain = me.getViewModel().get('theMain'); 
		
		refs.ctlIQty.setValue(Number(refs.ctlDoVslIQty.getValue()) + Number(refs.ctlDoLorryIQty.getValue()));
		refs.ctlDoLorryImt.setValue(Number(refs.ctlDoLorryIQty.getValue()) * Number(theMain.data.eachWgt));
		refs.ctlDoLorryIm3.setValue(Number(refs.ctlDoLorryIQty.getValue()) * Number(theMain.data.eachVol));
	},
	
	onChangeIQtyVslField: function(){
		var me = this;
		var refs = me.getReferences();
		var theMain = me.getViewModel().get('theMain'); 
		
		refs.ctlIQty.setValue(Number(refs.ctlDoVslIQty.getValue()) + Number(refs.ctlDoLorryIQty.getValue()));
		refs.ctlDoVslImt.setValue(Number(refs.ctlDoVslIQty.getValue()) * Number(theMain.data.eachWgt));
		refs.ctlDoVslIm3.setValue(Number(refs.ctlDoVslIQty.getValue()) * Number(theMain.data.eachVol));
	},
	
	onSelectSDODirectModeOfOperation: function(){
		var me = this;
		var refs = me.getReferences();
		var theMain = me.getViewModel().get('theMain'); 
		
		if(refs.ctlModeOper.getValue() == null || refs.ctlModeOper.getValue() == ''){
			refs.ctlDDmt.setValue(Number(theMain.data.doDMt));
			refs.ctlDM3.setValue(Number(theMain.data.doDM3));
			refs.ctlDQty.setValue(Number(theMain.data.doDQty));
		}
		
		if(refs.ctlModeOper.getValue() == 'LR'){
			refs.ctlDDmt.setValue(Number(theMain.data.doDLrMt));
			refs.ctlDM3.setValue(Number(theMain.data.doDLrM3));
			refs.ctlDQty.setValue(Number(theMain.data.doDLrQty));
		}
		
		if(refs.ctlModeOper.getValue() == 'SE'){
			refs.ctlDDmt.setValue(Number(theMain.data.doDVslMt));
			refs.ctlDM3.setValue(Number(theMain.data.doDVslM3));
			refs.ctlDQty.setValue(Number(theMain.data.doDVslQty));
		}
	},
	
	onSelectSDOIndirectModeOfOperation: function(){
		var me = this;
		var refs = me.getReferences();
		var theMain = me.getViewModel().get('theMain'); 
		
		if(refs.ctlIModeOper.getValue() == null || refs.ctlModeOper.getValue() == ''){
			refs.ctlImt.setValue(Number(theMain.data.doIMt));
			refs.ctlIm3.setValue(Number(theMain.data.doIM3));
			refs.ctlIQty.setValue(Number(theMain.data.doIQty));
		}
		
		if(refs.ctlIModeOper.getValue() == 'LR'){
			refs.ctlImt.setValue(Number(theMain.data.doILrMt));
			refs.ctlIm3.setValue(Number(theMain.data.doILrM3));
			refs.ctlIQty.setValue(Number(theMain.data.doILrQty));
		}
		
		if(refs.ctlIModeOper.getValue() == 'SE'){
			refs.ctlImt.setValue(Number(theMain.data.doIVslMt));
			refs.ctlIm3.setValue(Number(theMain.data.doIVslM3));
			refs.ctlIQty.setValue(Number(theMain.data.doIVslQty));
		}
	},
	
	onUnitsGridItemClick:function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('unitList');
		var theSDO = me.getViewModel().get('theMain');
		var qty = 0;
		var mt = 0;
		var cbm =0;
		
		store.each(function(record){
			if(record.get('chkCdNm') == 1){
				mt = mt + parseInt(record.get('roroMt'));
				if(record.get('cbm') != null && record.get('cbm') !='' ){
					cbm = cbm + parseInt(record.get('cbm'));
				}
				qty +=1;
			}
		});
		
		if(theSDO.get('delvTpCd') == 'I'){
			theSDO.set('im3', cbm.toString());
			theSDO.set('imt', mt.toString());
			theSDO.set('iqty', qty.toString());
		}else if(theSDO.get('delvTpCd') == 'D'){
			theSDO.set('dm3', cbm.toString());
			theSDO.set('dmt', mt.toString());
			theSDO.set('dqty', qty.toString());
		}

		me.roroQty = store.data.length;
	},
	
	autoCalcAmount: function(mode, tsptTpCd){
		var me = this,
		refs = me.getReferences(),
		wgt = 0,
		dTsptCd = refs.ctlDirectModeOper.getValue(),
		iTsptCd = refs.ctlIndirectModeOper.getValue(),
		theMain = me.getViewModel().get('theMain'),
		isBBK = theMain.get('cgtpcd') === CodeConstants.MT_CGTP_BBK,
		{wgt, vol, pkgqty, eachWgt, eachVol} = theMain.data, wgtRef, volRef, qtyRef;
		if(isBBK){
			if(mode == 'D'){
				if(dTsptCd === 'LR'){
					wgtRef = 'ctlDDmt'
					volRef = 'ctlDM3'
					qtyRef = 'ctlDQty'
				}
			}else{
				if(iTsptCd === 'LR'){
					wgtRef = 'ctlImt'
					volRef = 'ctlIm3'
					qtyRef = 'ctlIQty'
				}
			}
	
			if(tsptTpCd === 'LR'){
				var inputQty = refs[qtyRef].getValue()
				if(inputQty == pkgqty){
					refs[wgtRef].setValue(wgt)
					refs[volRef].setValue(vol)
				}else{
					refs[wgtRef].setValue(parseFloat(inputQty * eachWgt))
					refs[volRef].setValue(parseFloat(inputQty * eachVol))
				}
			}
		}
	},
	
	calcWeight: function(mode){
		var me = this,
		refs = me.getReferences()
		wgt = 0
		dTsptCd = refs.ctlIndirectModeOper.getValue()
		iTsptCd = refs.ctlDirectModeOper.getValue() 
		theMain = me.getViewModel().get('theMain');
		if(mode == 'D'){
			wgt = refs.ctlDoConveyorDmt.getValue() + refs.ctlDoWagonDmt.getValue() + refs.ctlDoLorryDmt.getValue() + refs.ctlDoVesselDmt.getValue()
			refs.ctlDDmt.setValue(wgt)
		}else{
			wgt = refs.ctlDoLorryImt.getValue() + refs.ctlDoWagonImt.getValue() + refs.ctlDoConveyorImt.getValue()
			refs.ctlImt.setValue(wgt)
		}
	},
	
	onModeOprChange: function(cbx){
		var me = this,
		refs = me.getReferences(), 
		targetRef = cbx.reference,
		mdOprVal = '',
		theMain = me.getViewModel().get('theMain'),
		cgTpCd = theMain.get('cgtpcd'),
		isBBK = theMain.get('cgtpcd') === CodeConstants.MT_CGTP_BBK;
		if(targetRef == 'ctlDirectModeOper'){
			mdOprVal = refs.ctlDirectModeOper.getValue()
			if(mdOprVal){
				if(isBBK) me.updateRefsState('D', mdOprVal, cgTpCd)
			}else{
				refs.refsDirectAmount.setDisabled(true)
			}
		} else if(targetRef == 'ctlIndirectModeOper'){
			mdOprVal = refs.ctlIndirectModeOper.getValue()
			if(mdOprVal){
				if(isBBK) me.updateRefsState('I', mdOprVal, cgTpCd)
			}else{
				refs.refsIndirectAmount.setDisabled(true)
			}
		}
	},
	
	updateRefsState: function(mode, tstp, cgTpCd){
		var me = this,
		refs = me.getReferences(),
		tstpCombos = [...me.getStore('directTstpCombo').data.items],
		enableMap,
		enabledAmtRefs,
		disabledAmtRefs,
		disabledNestedAmtRefs,
		dMtRefs = ['ctlDoConveyorDmt', 'ctlDoWagonDmt', 'ctlDoLorryDmt', 'ctlDoVesselDmt'],
		iMtRefs = ['ctlDoConveyorImt', 'ctlDoWagonImt', 'ctlDoLorryImt'],
		dBasicRefs = ['ctlDDmt', 'ctlDM3', 'ctlDQty'],
		iBasicRefs = ['ctlImt', 'ctlIm3', 'ctlIQty'],
		enableMap = tstpCombos.map(item => {
			var tstpCd = item.data.scd
			var value = []
			if(tstpCd == 'CV'){
				value = mode ==='D' ? ['ctlDoConveyorDmt'] : ['ctlDoConveyorImt']
			}else if(tstpCd == 'LC'){
				value = mode ==='D' ? ['ctlDoConveyorDmt', 'ctlDoLorryDmt'] : ['ctlDoConveyorImt', 'ctlDoLorryImt']
			}else if(tstpCd == 'LR'){
				value = mode ==='D' ? ['ctlDoLorryDmt'] : ['ctlDoLorryImt']
			}else if(tstpCd == 'PL'){
				value = mode ==='D' ? ['ctlDoConveyorDmt', 'ctlDoLorryDmt', 'ctlDoWagonDmt', 'ctlDoVesselDmt'] : ['ctlDoConveyorImt', 'ctlDoLorryImt', 'ctlDoWagonImt']
			}else if(tstpCd == 'SE'){
				value = mode ==='D' ? ['ctlDoVesselDmt'] : []
			}else if(tstpCd == 'WG'){
				value = mode ==='D' ? ['ctlDoWagonDmt'] : ['ctlDoWagonImt']
			}else if(tstpCd == 'WC'){
				value = mode ==='D' ? ['ctlDoWagonDmt', 'ctlDoConveyorDmt'] : ['ctlDoWagonImt', 'ctlDoConveyorImt']
			}else if(tstpCd == 'WP'){
				value = mode ==='D' ? ['ctlDoWagonDmt', ''] : ['ctlDoWagonImt', '']
			}
			return {
				tstpCd,
				value
			}
		});
		
		enabledAmtRefs = enableMap.find(item => item.tstpCd == tstp).value;
		disabledNestedAmtRefs = enableMap.filter(item => item.tstpCd != tstp).map(item => item.value);
		disabledAmtRefs = [...new Set(disabledNestedAmtRefs.flat())].filter(item => !enabledAmtRefs.includes(item));
		
		if(enabledAmtRefs.length <= 1){
			if(mode === 'D'){
				dMtRefs.forEach(item => {
					refs[item].setValue(0)
				});
				dBasicRefs.forEach(item => {
					refs[item].setValue(0)
				});
				disabledAmtRefs = dMtRefs.filter(item => !enabledAmtRefs.includes(item));
				enabledAmtRefs.push(...['ctlDDmt', 'ctlDM3', 'ctlDQty', 'refsDirectAmount']);
			}else{
				iMtRefs.forEach(item => {
					refs[item].setValue(0)
				});
				iBasicRefs.forEach(item => {
					refs[item].setValue(0)
				});
				disabledAmtRefs = iMtRefs.filter(item => !enabledAmtRefs.includes(item));
				enabledAmtRefs = ['ctlImt', 'ctlIm3', 'ctlIQty', 'ctlDoConveyorImt', 'ctlDoWagonImt', 'ctlDoLorryImt', 'refsIndirectAmount', 'refsDirectAmount'];
			}
		}else if(enabledAmtRefs.length > 1){
			if(mode === 'D'){
				dMtRefs.forEach(item => {
					refs[item].setValue(0)
				});
				dBasicRefs.forEach(item => {
					refs[item].setValue(0)
				});
				dMtRefs = dMtRefs.filter(item => !enabledAmtRefs.includes(item));
				disabledAmtRefs = dMtRefs;
				enabledAmtRefs = [
					...new Set(
							[...enabledAmtRefs,'ctlDDmt', 'ctlDM3', 'ctlDQty', 'ctlDoConveyorDmt', 'ctlDoWagonDmt', 'ctlDoLorryDmt', 'ctlDoVesselDmt', 'refsDirectAmount'
						]
					)
				];
			}else{
				iMtRefs.forEach(item => {
					refs[item].setValue(0)
				});
				iBasicRefs.forEach(item => {
					refs[item].setValue(0)
				});
				disabledAmtRefs = iMtRefs.filter(item => !enabledAmtRefs.includes(item));
				enabledAmtRefs.push(...['ctlImt', 'ctlIm3', 'ctlIQty', 'ctlDoConveyorImt', 'ctlDoWagonImt', 'ctlDoLorryImt', 'refsIndirectAmount']);
			}
		}

		enabledAmtRefs.forEach(item => {
			refs[item].setDisabled(false)
		});
		disabledAmtRefs.forEach(item => {
			refs[item].setDisabled(true)
		});
	},
	
	/**
	 * HHT METHOD END
	 * =========================================================================================================================
	 */	
});