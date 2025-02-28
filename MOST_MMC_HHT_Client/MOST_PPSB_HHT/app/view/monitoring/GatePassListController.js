Ext.define('MOST.view.controller.GatePassListController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.gatepasslist',	
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	PERIOD_FIFTEEN_DAY: 15,
	PERIOD_MONTH_DAY: 30,
	PERIOD_MONTH_DAY_PLUS: 31,
	selectValue: '',
	authority: '',
	userType: Ext.String.trim(MOST.config.Token.getUserType()),
	ptnrCode: Ext.String.trim(MOST.config.Token.getPtnrCode()),
	ptnrType: Ext.String.trim(MOST.config.Token.getPtnrType()),

	NON_CALL_ID : 'NonCallId',
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
		
		refs.ctlJpvc.updateEditableControl(false);
		me.setDateInDays("refGpFromDt", -me.PERIOD_FIFTEEN_DAY);
		me.setDateInDays("refGpToDt", +me.PERIOD_FIFTEEN_DAY);
		me.setDateInDays("refEstArriFromDt", -me.PERIOD_MONTH_DAY);
		me.setDateInDays("refEstArriToDt", +me.PERIOD_MONTH_DAY);
		me.selectValue = 'rdGp';
		
		if (me.userType === 'E') {
			if (me.existPatnerType(CONSTANTS.PTNR_TYPE_SHIPPING_AGENCY) || 
					(me.existPatnerType(CONSTANTS.PTNR_TYPE_SHIPPING_AGENCY) 
						&& me.existPatnerType(CONSTANTS.PTNR_TYPE_FORWARDER))) {
				 	if (me.existPatnerType(CONSTANTS.PTNR_TYPE_SHIPPING_AGENCY) 
			 			&& me.existPatnerType(CONSTANTS.PTNR_TYPE_FORWARDER)) {
							me.authority = "BH";
					} else if(me.existPatnerType(CONSTANTS.PTNR_TYPE_SHIPPING_AGENCY)) {
						me.authority = "SHA";
					}
			} else if (me.existPatnerType(CONSTANTS.PTNR_TYPE_FORWARDER)) {
				me.authority = "FWD";
			} else if (me.existPatnerType(CONSTANTS.PTNR_TYPE_SHIPPER_CONSIGNEE)) {
				me.authority = "CNS";
			}
		} else if (me.userType === 'I') {
			if (me.authority != 'CSC') {
				if(MOST.config.Token.getIsSupervisor() != "N") {
					me.authority = "BH";
				}
			}
		}
	},
	
	// Search Event Handler
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore('gatePassListData');
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    
    	store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0) {
						me.getViewModel().setData({theGpList: records[0]});
					}
				}
			}
		});
	},
	
	onFind: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore('cargoMasterCombo');
    	var dateConditionGp = me.checkFromToDate("refEstArriFromDt", "refEstArriToDt");
    	
    	if(dateConditionGp != null) {
    		var startDt = dateConditionGp.fromDtString;
			var endDt = dateConditionGp.toDtString;
		}
    	
    	if(StringUtil.isNullorEmpty(startDt) && StringUtil.isNullorEmpty(endDt)) {
    		MessageUtil.warning('warning_msg', "gatepasslist_gp_nodata_warning_msg");
			return;
    	}
    	
    	store.load({
    		params: {
    			searchType : 'combo',
				opType : 'cgMst',
				vslCallId : 'NonCallId',
				authority : me.authority,
				ptnrCode : me.ptnrCode,
				startDt: startDt,
				endDt: endDt
    		},
    		callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0) {
						me.setComboStore(records[0].data);
					}
				}
			}
    	});
	},

	onDateChange:function( control, newValue, oldValue, eOpts ) {
		var me = this;
		var refs = me.getReferences();
		
		if (oldValue != null) {
			if(control == refs.refGpFromDt){
				me.setDateInDaysByDate('refGpToDt', me.PERIOD_MONTH_DAY_PLUS, control.getValue());
			} else if (control == refs.refGpToDt) {
				me.setDateInDaysByDate('refGpFromDt', -me.PERIOD_MONTH_DAY_PLUS, control.getValue());
			}  
		}
	},
	
	onRadioEditableChange : function(field, newValue, oldValue) {
		var me = this;
		var refs = me.getReferences();
		
		if(newValue) {
			me.selectValue = field.getReference();
			me.setEditableDisabled(field.getReference(), true);
		}
	},
	
	onDblClickForGatePassDetail: function(grid) {
		var me = this;
		var title = {type: 'bundle', key: 'gatePass'};
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		me.getView().detailViewAlias = 'app-gatepassdetail';
		me.openDetailPopup(selection, title);
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
		var dateConditionGp = me.checkFromToDate("refGpFromDt", "refGpToDt");
		var dateConditionEta = me.checkFromToDate("refEstArriFromDt", "refEstArriToDt");
		var cgNo = '';
		var gatePassNo = '';
		var searchType = '';
		var startDt = '';
		var endDt = '';
		var lorryNo = '';
		var shipgNoteNo = '';
		var blNo = '';
		var delvTpNm = '';
		var shftId = ''
		var shftDt = '';
		var vslCallId = '';
		
		if(me.selectValue === 'rdGp') {
			if (!StringUtil.isNullorEmpty(refs.txtGp1.getValue()) || !StringUtil.isNullorEmpty(refs.txtGr1.getValue())) {
				cgNo =  refs.txtGr1.getValue();
				gatePassNo = refs.txtGp1.getValue();
				searchType = 'gpCgMst';
			} else {
				MessageUtil.warning('warning_msg', "gatepasslist_gp_nodata_warning_msg");
				return;
			}
		} else if (me.selectValue === 'rdGpDt') {
			if(refs.refGpFromDt.getValue() != null && refs.refGpToDt.getValue() != null) {
				gatePassNo = refs.txtGp2.getValue();
				lorryNo = refs.txtLorry.getValue();
				searchType = "gpCgMst";
			} else {
				MessageUtil.warning('warning_msg', "gatepasslist_gp_nodata_warning_msg");
				return;
			}
		} else if (me.selectValue === 'rdJpvc') {
			vslCallId = refs.ctlJpvc.getValue();
			shipgNoteNo = refs.ctlSn1Combo.getValue();
			cgNo = refs.txtGr3.getValue();
			blNo = refs.ctlBlCombo.getValue();
			gatePassNo = refs.txtGp3.getValue();
			delvTpNm = refs.ctlDmodeCombo.Value;
			searchType = "gpCgMst";
			shftId = refs.ctlShiftCombo.getValue();
			shftDt = Ext.Date.format(refs.refShiftDt.getValue(), MOST.config.Locale.getShortDate());
		} else if (me.selectValue === 'rdEta') {
			if(refs.refEstArriFromDt.getValue() != null && refs.refEstArriToDt.getValue() != null) {
				vslCallId = ''
				shipgNoteNo = refs.ctlSn2Combo.Value;
				cgNo = refs.txtGr4.getValue();
				gatePassNo = refs.txtGp4.getValue();
				searchType = "gpNonCgMst";
			} else {
				MessageUtil.warning('warning_msg', "gatepasslist_gp_nodata_warning_msg");
				return;
			}
		}
		
		var params = {
			cgNo : cgNo,
			gatePassNo : gatePassNo,
			searchType : searchType,
			lorryNo : lorryNo,
			shipgNoteNo : shipgNoteNo,
			blNo : blNo,
			delvTpNm : delvTpNm,
			shftId : shftId,
			shftDt : shftDt,
			authority: me.authority,
			userType: me.userType,
			ptnrCode: me.ptnrCode,
			vslCallId: vslCallId

		}
		
		if(dateConditionGp != null) {
			if(me.selectValue === 'rdGpDt') {
				params["startDt"] = dateConditionGp.fromDtString;
				params["endDt"] = dateConditionGp.toDtString;
			}
		}
		
		if(dateConditionEta != null){
			if(me.selectValue === 'rdEta') {
				params["arrvDtFm"] = dateConditionEta.fromDtString;
				params["arrvDtTo"] = dateConditionEta.toDtString;
			}
		}
    	
    	return params;
	},
	
	setEditableDisabled: function(target, mode) {
		var me = this;
		var refs = me.getReferences();
		
		if (target === 'rdGp') {
			me.setEditableDisabledRdGp(mode);
			me.setEditableDisabledRdGpDt(!mode);
			me.setEditableDisabledRdJpvc(!mode);
			me.setEditableDisabledRdEta(!mode);
		} else if (target === 'rdGpDt') {
			me.setEditableDisabledRdGp(!mode);
			me.setEditableDisabledRdJpvc(!mode);
			me.setEditableDisabledRdEta(!mode);
			me.setEditableDisabledRdGpDt(mode);
		} else if (target === 'rdJpvc') {
			me.setEditableDisabledRdGp(!mode);
			me.setEditableDisabledRdGpDt(!mode);
			me.setEditableDisabledRdJpvc(mode);
			me.setEditableDisabledRdEta(!mode);
		} else if (target === 'rdEta') {
			me.setEditableDisabledRdGp(!mode);
			me.setEditableDisabledRdGpDt(!mode);
			me.setEditableDisabledRdJpvc(!mode);
			me.setEditableDisabledRdEta(mode);
		}
	},
	
	setEditableDisabledRdGp: function(mode) {
		var me = this;
		var refs = me.getReferences();
		
		refs.txtGp1.setEditable(mode);
		refs.txtGp1.setDisabled(!mode);
		refs.txtGr1.setEditable(mode);
		refs.txtGr1.setDisabled(!mode);
	},
	
	setEditableDisabledRdGpDt: function(mode) {
		var me = this;
		var refs = me.getReferences();
		
		refs.refGpFromDt.setEditable(mode);
		refs.refGpFromDt.setDisabled(!mode);
		refs.refGpToDt.setEditable(mode);
		refs.refGpToDt.setDisabled(!mode);
		refs.txtGp2.setEditable(mode);
		refs.txtGp2.setDisabled(!mode);
		refs.txtLorry.setEditable(mode);
		refs.txtLorry.setDisabled(!mode);
	},
	
	setEditableDisabledRdJpvc: function(mode) {
		var me = this;
		var refs = me.getReferences();
		
		refs.ctlJpvc.updateEditableControl(mode);
		refs.ctlSn1Combo.setEditable(mode);
		refs.ctlSn1Combo.setDisabled(!mode);
		refs.ctlBlCombo.setEditable(mode);
		refs.ctlBlCombo.setDisabled(!mode);
		refs.txtGr3.setEditable(mode);
		refs.txtGr3.setDisabled(!mode);
		refs.txtGp3.setEditable(mode);
		refs.txtGp3.setDisabled(!mode);
		refs.ctlDmodeCombo.setEditable(mode);
		refs.ctlDmodeCombo.setDisabled(!mode);
		refs.refShiftDt.setEditable(mode);
		refs.refShiftDt.setDisabled(!mode);
		refs.ctlShiftCombo.setEditable(mode);
		refs.ctlShiftCombo.setDisabled(!mode);
	},
	
	setEditableDisabledRdEta: function(mode) {
		var me = this;
		var refs = me.getReferences();
		
		refs.refEstArriFromDt.setEditable(mode);
		refs.refEstArriFromDt.setDisabled(!mode);
		refs.refEstArriToDt.setEditable(mode);
		refs.refEstArriToDt.setDisabled(!mode);
		refs.ctlSn2Combo.setEditable(mode);
		refs.ctlSn2Combo.setDisabled(!mode);
		refs.txtGr4.setEditable(mode);
		refs.txtGr4.setDisabled(!mode);
		refs.txtGp4.setEditable(mode);
		refs.txtGp4.setDisabled(!mode);
		refs.refFind.editable = mode;
		refs.refFind.setDisabled(!mode);
	},
	
	existPatnerType: function(ptnrType) {
		var me = this;
		var bPtnrType = false;
		
		if (me.ptnrType === ptnrType) {
			bPtnrType = true;
		}
		return bPtnrType;
	},
	
	setComboBox: function(vslValue) {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('cargoMasterCombo');
		
		store.load({
			params: {
				searchType: 'combo',
				opType: 'cgMst',
				authority: me.authority,
				ptnrCode: me.ptnrCode,
				userType: me.userType,
				vslCallId: vslValue
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0) {
						me.setComboStore(records[0].data);
					}
				}
			}
		});
	},
	
	setComboStore: function(masterItem) {
		var me = this;
		var sn1Combo = me.getStore('sn1Combo');
		var sn2Combo = me.getStore('sn2Combo');
		var blCombo = me.getStore('blCombo');
		
		if (masterItem.snList) {
			if (me.selectValue === 'rdJpvc') {
				sn1Combo.setData(masterItem.snList);
			} else if (me.selectValue === 'rdEta') {
				sn2Combo.setData(masterItem.snList);
			}
		}
		
		if (masterItem.blList) {
			if (me.selectValue === 'rdJpvc') {
				blCombo.setData(masterItem.blList);
			}
		}
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl === 'ctlJpvc'){
			if(returnValue){
				if(!StringUtil.isNullorEmpty(returnValue.code)) {
					me.setComboBox(returnValue.code);
				}
			}
		}
	},
	onPreviewPDF:function(){
		var me = this;
		var refs = me.getReferences();
		var previewPDF = me.getStore('generatePDFGatePass');
		
		var params = me.setSrchStrReport(); 
		
    	if(params == null){
    		return;
    	}
		
		previewPDF.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					me.openPDFPreview (records, operation, success);
					//window.close();
				}
			}
		});
		
	},
	setSrchStrReport:function(){
	
		var me = this;
		var refs = me.getReferences();
		var params = null;
		var dateConditionGp = me.checkFromToDate("refGpFromDt", "refGpToDt");
		var dateConditionEta = me.checkFromToDate("refEstArriFromDt", "refEstArriToDt");
		var cgNo = '';
		var gatePassNo = '';
		var searchType = '';
		var startDt = '';
		var endDt = '';
		var lorryNo = '';
		var shipgNoteNo = '';
		var blNo = '';
		var delvTpNm = '';
		var shftId = ''
		var shftDt = '';
		var vslCallId = '';
		var userId = MOST.config.Token.getUserId();
		if(me.selectValue === 'rdGp') {
			if (!StringUtil.isNullorEmpty(refs.txtGp1.getValue()) || !StringUtil.isNullorEmpty(refs.txtGr1.getValue())) {
				cgNo =  refs.txtGr1.getValue();
				gatePassNo = refs.txtGp1.getValue();
				searchType = 'gpCgMst';
			} else {
				MessageUtil.warning('warning_msg', "gatepasslist_gp_nodata_warning_msg");
				return;
			}
		} else if (me.selectValue === 'rdGpDt') {
			if(refs.refGpFromDt.getValue() != null && refs.refGpToDt.getValue() != null) {
				gatePassNo = refs.txtGp2.getValue();
				lorryNo = refs.txtLorry.getValue();
				searchType = "gpCgMst";
			} else {
				MessageUtil.warning('warning_msg', "gatepasslist_gp_nodata_warning_msg");
				return;
			}
		} else if (me.selectValue === 'rdJpvc') {
			vslCallId = refs.ctlJpvc.getValue();
			shipgNoteNo = refs.ctlSn1Combo.getValue();
			cgNo = refs.txtGr3.getValue();
			blNo = refs.ctlBlCombo.getValue();
			gatePassNo = refs.txtGp3.getValue();
			delvTpNm = refs.ctlDmodeCombo.Value;
			searchType = "gpCgMst";
			shftId = refs.ctlShiftCombo.getValue();
			shftDt = Ext.Date.format(refs.refShiftDt.getValue(), MOST.config.Locale.getShortDate());
		} else if (me.selectValue === 'rdEta') {
			if(refs.refEstArriFromDt.getValue() != null && refs.refEstArriToDt.getValue() != null) {
				vslCallId = ''
				shipgNoteNo = refs.ctlSn2Combo.Value;
				cgNo = refs.txtGr4.getValue();
				gatePassNo = refs.txtGp4.getValue();
				searchType = "gpNonCgMst";
			} else {
				MessageUtil.warning('warning_msg', "gatepasslist_gp_nodata_warning_msg");
				return;
			}
		}
		
		var params = {
			cgNo : cgNo,
			gatePassNo : gatePassNo,
			searchType : searchType,
			lorryNo : lorryNo,
			shipgNoteNo : shipgNoteNo,
			blNo : blNo,
			delvTpNm : delvTpNm,
			shftId : shftId,
			shftDt : shftDt,
//			authority: me.authority,
			userType: me.userType,
			ptnrCode: me.ptnrCode,
			vslCallId: vslCallId,
			searchType: 'gpCgMst',
			userId: userId
				
		}
		
		if(dateConditionGp != null) {
			if(me.selectValue === 'rdGpDt') {
				params["startDt"] = dateConditionGp.fromDtString;
				params["endDt"] = dateConditionGp.toDtString;
			}
		}
		
		if(dateConditionEta != null){
			if(me.selectValue === 'rdEta') {
				params["arrvDtFm"] = dateConditionEta.fromDtString;
				params["arrvDtTo"] = dateConditionEta.toDtString;
			}
		}
		return params
	},
	
	exportTo: function(btn) {
    	var me = this;
    	var refs = me.getReferences();
    	
        var cfg = Ext.merge({
            title: 'Gate Pass List',
            fileName: 'GatePassList' + '.' + (btn.cfg.ext || btn.cfg.type)
        }, btn.cfg);

        var grid = refs.refGatePassListGrid;
        grid.saveDocumentAs(cfg);
    },
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
	/**
	 * HHT METHOD START
	 * =========================================================================================================================
	 */		
	onHHTLoad: function(){
		var me = this;
		var window = me.getView().up('window');
		window.setX(window.getX()/2);
		window.setY(0);
		
		var refs = me.getReferences();				
		var recvData = me.getView().recvData;
		if (recvData.vslCallId == null){
			refs.refNonJpvcRadiofield._checked = true;
			refs.refNonJpvcRadiofield.updateChecked(true);
		}else{
			refs.refJpvcText.setValue(recvData.vslCallId);
		}
		refs.refFindGRBLTextField.setValue(recvData.CgNo);
		refs.refFindGPTextField.setValue(recvData.gatePassNo);

		me.onSearchGatePassList();
	},

	onCheckJpvcRadioField: function(radioField, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();

		if(newValue){
			if(radioField.getValue()=='JPVC'){
				refs.refJpvcText.setDisabled(true);
				refs.refJpvcText.setValue(me.getView().recvData.vslCallId);
				refs.refStartDatefield.setDisabled(false);
				refs.refEndDatefield.setDisabled(false);
				refs.refStartDatefield.setValue(null);
				refs.refEndDatefield.setValue(null);
			}else{
				refs.refJpvcText.setDisabled(false);
				refs.refStartDatefield.setDisabled(true);
				refs.refEndDatefield.setDisabled(true);
				refs.refJpvcText.setValue(null);
			}
		}
	},

 	onSearchGLBL:function(){;
		var me = this;
		var refs = me.getReferences();
		var jpvcNo = refs.refJpvcText.getValue();
		var params = {
			title: 'GL/BL Code',
			vslCallId : jpvcNo
		};		
		ViewUtil.openCodePopup(this, 'app-glblpopuphht', 'refFindGRBLTextField', params);
 	},
 	
 	onSearchGatePassList : function(){
 		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refGatePassPrintingHHTGrid');
		var gatePassListData = me.getStore('gatePassListData');
		var txtGRBL = refs.refFindGRBLTextField.getValue();
		var txtGP = refs.refFindGPTextField.getValue();
		var tGPStart = refs.refStartDatefield.getValue();
		var tGPEnd = refs.refEndDatefield.getValue();
		if(txtGP != null){
			txtGP =  txtGP.toUpperCase();
		}
		
		var jpvcNo = refs.refJpvcText.getValue();
		if(jpvcNo == null || jpvcNo == ''){
			jpvcNo ='NonCallId'
		}else{
			tGPStart = null;
			tGPEnd = null;
		}
		
		gatePassListData.load({
			params: {
				vslCallId : jpvcNo,
				cgNo:	txtGRBL,
				gatePassNo:	txtGP,
				startDt:	tGPStart,
				endDt:	tGPEnd,
			},
			callback: function(records, operation, success) {
				if (success && records != null && records.length ==1) {
					grid.setSelection(records[0]);
					// for testing me.onPrint();
					var window = me.getView().up('window');
					// for testing window.close();
				}
			}
		});
		
 	},
 	
 	onHHTOneClick : function(){
	 	var me = this;
	 	var refs = me.getReferences();
		var grid = me.lookupReference('refGatePassPrintingHHTGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		refs.refRemarkTextField.setValue(selection.data.rmk);
 	},
 	
 	setHHTPopupRemarkUpdate : function(){
 		var me = this;
	 	var refs = me.getReferences();
	 	var grid = me.lookupReference('refGatePassPrintingHHTGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		selection.data.rmk = refs.refRemarkTextField.getValue()
	 	grid.getStore().sync({
	 		success: function(){
            	 grid.getStore().reload();
	 		}
	 	});
 	},
 	
 	onCloseWin :function(){
 		var me = this; 
		var window = me.getView().up('window');
		window.returnValue = "success"
		window.close();
 	},
 	
 	onPrint: function(){
 		var me = this;
	 	var refs = me.getReferences();
	 	var jpvcNo = refs.refJpvcText.getValue();
		if(jpvcNo == null || jpvcNo == ''){
			jpvcNo ='NonCallId'
		}
		
		var grid = me.lookupReference('refGatePassPrintingHHTGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		
		if(selection == null || jpvcNo ==null){
			MessageUtil.warning('Warning', 'tbl_sts_select');
			return null;
		}
		var rmk = selection.data.rmk? selection.data.rmk: (me.getView().recvData.remark) ? me.getView().recvData.remark : null
 		var win = new Ext.create({
 			xtype: 'dialog',
 			title: 'Print',
 			layout: 'vbox',
 			maximizable: true,
 			animateTarget: true,
 			items: [{
 				xtype: 'app-print',
 				padding:'0 0 0 0',
 				margin:'0 0 0 0',			
 				params: {
 					jpvcNo: jpvcNo,
 					gatePassNo: selection.data.gatePassNo,
					cgNo: selection.data.cgNo,
					seq: selection.data.seq,
					remark: rmk
 				}
 			}, {
 				xtype: 'container',
 				layout: 'hbox',
 				margin: '5 0 0 0',
 				items: [{
					xtype: 'spacer'
				}, {
 					xtype: 'button',
 					ui: 'action',
 					text: 'Print',
 					handler: function () {
 	 					var html = document.getElementById('print');
 	 					me.print(html.firstChild,true);
 					}
 				}, {
					xtype: 'spacer',
					width: 5,
				}, {
 					xtype: 'button',
 					ui: 'action',
 					text: 'Cancel',
 					handler: function () {
 	 					win.doDestroy();
 					}
 				}]
 			}],
 			
 			tools: [{
 				type: 'close',
 				handler: function () {
 					win.doDestroy();
 				}
 			}],
 		});
 		win.show();
 		
 	},
 	
	print: function(htmlElement, flag, owner) {
		var p = window.open('', '', '');
		if (p) {
			p.document.write(htmlElement.outerHTML);
			p.document.close();
			p.focus();
			p.print();
			p.close();
		} 
        if(owner){
        	owner.close();
        }
	},
 	
 	setHHTPrint: function(){
 		var me = this;
	 	var refs = me.getReferences();
 		var gatePassDetail = me.getStore('gatePassDetail');
 		var userId = MOST.config.Token.getUserId();
 		var jpvcNo = me.getView().params.jpvcNo;
 		var gatePassNo = me.getView().params.gatePassNo;
		var cgNo = me.getView().params.cgNo;
		var seq = me.getView().params.seq;
 		gatePassDetail.load({
			params: {
				jpvcNo : jpvcNo,
				gatePassNo:	gatePassNo,
				cgNo,
				seq
			},
			callback: function(records, operation, success) {
				if (success) {
					var printDate = Ext.Date.format(new Date(), 'd/m/Y H:i');

					if(me.getView().params.remark){
						records[0].set({ rmk : me.getView().params.remark });
					}

					refs.refDateTimePrint.setHtml(printDate+ "</br>");
					refs.refGPNo.setHtml("G/P No : "+records[0].data.gatePassNo);

					if(records[0].data.blNo != null || records[0].data.grNo == null){
						refs.refBLGRNo.setHtml("BL No / GR No : <b>"+records[0].data.blNo + "</b>");	
					}else if(records[0].data.blNo == null || records[0].data.grNo != null){
						refs.refBLGRNo.setHtml("BL No / GR No : <b>"+records[0].data.grNo + "</b>");
					}
					
					refs.refDOSN.setHtml("DO/SN : <b>"+records[0].data.doNo+ "</b>");
					refs.refVSL.setHtml("VSL : <b>"+records[0].data.vslName+ "</b>");
					refs.refJPVC.setHtml("JPVC : <b>"+records[0].data.jpvcNo+ "</b>");
					refs.refPODPOL.setHtml("POD / POL : <b>"+records[0].data.portOfDis+" / "+records[0].data.portOfLoad+ "</b>");
					refs.refHatchNo.setHtml("HATCH NO : <b>"+records[0].data.hatchNo+ "</b>");
					refs.refWharf.setHtml("WHARF : <b>"+records[0].data.wharf+ "</b>");
					refs.refShipper.setHtml("SHIPPER : <b>"+records[0].data.shprNm+ "</b>");
					refs.refConsignee.setHtml("CONSIGNEE : <b>"+records[0].data.cnsneNm+ "</b>");
					refs.refFinalDest.setHtml("FINAL DEST : <b>"+records[0].data.finalDest+ "</b>");
					refs.refCustomFZAppr.setHtml("CUSTOM/FZ APPR : <b>"+records[0].data.custAppr+ "</b>");
					refs.refReleaseNo.setHtml("RELEASE NO : <b>"+records[0].data.releaseNo+ "</b>");
					refs.refDGApproval.setHtml("DG APPROVAL : <b>"+records[0].data.dgApproval+ "</b>");
					refs.refLorry.setHtml("LORRY/WAGON : <b>"+records[0].data.lorryNo+ "</b>");
					refs.refTPorter.setHtml("T/PORTER : <b>"+records[0].data.transporter+ "</b>");
					refs.refNoTrips.setHtml("NO TRIPS : <b>"+records[0].data.noTrips+ "</b>");
					refs.refOPRMode.setHtml("OPR MODE : <b>"+records[0].data.tsptTpCd+ "</b>");
					refs.refPackingNo.setHtml("PACKING NO : <b>"+records[0].data.packingNo+ "</b>");
					refs.refCommodity.setHtml("COMMODITY : <b>"+records[0].data.commodity+ "</b>");
					refs.refCargoStatus.setHtml("CARGO STATUS : <b>"+records[0].data.statCd+ "</b>");
					
					refs.refDOCAMTMT.setHtml("DOC AMT : <b>"+records[0].data.grossTot +" /"+ records[0].data.cumulTot +" /"+ records[0].data.outQty+ "</b>");
					refs.refACTAMTMT.setHtml("ACT AMT : <b>"+records[0].data.actMt +" /"+ records[0].data.actM3 +" /"+ records[0].data.actQty+ "</b>");
					refs.refDeliverMT.setHtml("DELIVER : <b>"+records[0].data.wgt +" /"+ records[0].data.msrmt +" /"+ records[0].data.pkgQty+ "</b>");
					
					refs.refCargoDelivery.setHtml("CARGO DELIVERY : <b>"+records[0].data.cgDelivery+ "</b>");
					refs.refRemark.setHtml("Remark : <b>"+ records[0].data.rmk + "</b>");
					refs.refConfirmed.setHtml("<br>CONFIRMED BY <b>"+records[0].data.updUserId+ "</b>");
					refs.refUpdateDate.setHtml("DATE/TIME : <b>"+records[0].data.updDt+ "</b>");
					refs.refPrinted.setHtml("PRINTED BY <b>"+userId+ "</b>");
					refs.refPrintDate.setHtml("DATE/TIME : <b>"+ `${Ext.Date.format(new Date(), 'd/m/Y H:i')}`+ "</b>");
					
					// var html = document.getElementById('print');
 	 				// me.print(html.firstChild,true, me.getView().up());
					
//					refs.refGPNO.setValue(records[0].data.gatePassNo);
				}
			}
		});
		
 		
 	},

	// Gate Pass menu functions
	onGatePassHHTLoad: function(){
		var me = this;
		me.initFromToDateTime();
		me.gatePassHHTComboLoad();
		me.onSearchGatePassHHT();
		me.getReferences().refGatePassStDt.setValue('01-01-2022 07:00')
	},

	initFromToDateTime: function(){
		// Todo 교대시간에 따라 시간 변경
		var me = this;
		var refs = me.getReferences();
		var shftObj = me.getViewModel().get('globalWorkShiftInfo');
		var startDt = me.genShiftDateTime(shftObj.fmHhMm, true);
		var endDt = me.genShiftDateTime(shftObj.toHhMm, false);

		if(startDt > endDt){
			endDt.setDate(endDt.getDate()+1);
		}

		refs.refGatePassStDt.setValue(startDt);
		refs.refGatePassEndDt.setValue(endDt);
	},

	genShiftDateTime: function(hhmm, isStart){
		var date = new Date();
		var hour = hhmm.substring(0, 2);
		var min = hhmm.substring(2, hhmm.length);

		date.setHours(hour, min, (isStart) ? '00' : '59');

		return date;
	},

	gatePassHHTComboLoad: function(){
		var me = this;
		var vslCallId = me.getViewModel().get('globalVesselCallId');
		// var docComboStore = me.getStore('docList');

		// docComboStore.load({
		// 	params: {
		// 		vslCallId: vslCallId ? vslCallId : me.NON_CALL_ID,
		// 		searchType: 'whrecnDoclist',
		// 	},
		// 	callback: function(records, operation, success){
		// 		if(success){
		// 			me.setDocStores(records);
		// 		}
		// 	}
		// });
		var blComboStore = me.getStore('blCombo');
		var snComboStore = me.getStore('snCombo');
		var grComboStore = me.getStore('grCombo');
		blComboStore.load({
			params: {
				vslCallId: vslCallId ? vslCallId : me.NON_CALL_ID,
			},
			callback: function(records, operation, success){
			}
		});
		snComboStore.load({
			params: {
				vslCallId: vslCallId ? vslCallId : me.NON_CALL_ID,
			},
			callback: function(records, operation, success){
			}
		});
		grComboStore.load({
			params: {
				vslCallId: vslCallId ? vslCallId : me.NON_CALL_ID,
			},
			callback: function(records, operation, success){
			}
		});
	},

	setDocStores: function(records){
		var me = this;
		var snListCombo = me.getStore('shippingNoteListCombo');
		var blListCombo = me.getStore('blListCombo');
		var grListCombo = me.getStore('grListCombo');

		snListCombo.setData(records[0].get('snList'));
		blListCombo.setData(records[0].get('blList'));
		grListCombo.setData(records[0].get('grList'));
	},

	onSnNoChanged: function(combo, newValue){
		var refs = this.getReferences();
		var grStore = this.getStore('grListCombo');
		if(newValue === ''){
			grStore.clearFilter();
		} else {
			refs.refBlCombo.setValue('');
			grStore.filter('shipgNoteNo', newValue);
		}
	},

	onBlNoChanged: function(combo, newValue){
		var refs = this.getReferences();
		if(!Ext.isEmpty(newValue)){
			refs.refSnCombo.setValue('');
			refs.refGrCombo.setValue('');
		}
	},

	onGrNoChanged: function(combo, newValue){
		var refs = this.getReferences();
		if(!Ext.isEmpty(newValue)){
			refs.refBlCombo.setValue('');
		}
	},

	onSearchGatePassHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('gatePassListData');
		var vslCallId = me.getViewModel().get('globalVesselCallId');
		var cgNo = (refs.refGrCombo.getValue() != '') ? refs.refGrCombo.getValue() : refs.refBlCombo.getValue();

		store.load({
			params: {
				vslCallId: (vslCallId)? vslCallId : me.NON_CALL_ID,
				cgNo: cgNo,
				gatePassNo: refs.refGPTxt.getValue(),
				startDt: refs.refGatePassStDt.getValue(),
				endDt : refs.refGatePassEndDt.getValue()
			}
		});
	},

	onPrintGatePassHHT: function(){
		var me = this;
		var grid = me.lookupReference('refGatePassGrid');
		var selection = grid.getSelection();
		var targetCtl = 'refBtnGPass';
		if(selection == null) {
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}
		var params = {
			title: 'Gate Pass Printing',
			vslCallId: selection.get('vslCallId'),
			CgNo: selection.get('cgNo'),
			gatePassNo: selection.get('gatePassNo'),
			remark: me.lookupReference('refPrintRmk').getValue()
		};

		ViewUtil.openCodePopup(this, 'app-gatepassprintinghht', targetCtl, params);
	},


	/**
	 * HHT METHOD END
	 * =========================================================================================================================
	 */		
	
});

