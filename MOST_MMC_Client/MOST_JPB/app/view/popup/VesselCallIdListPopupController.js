Ext.define('MOST.view.popup.VesselCallIdListPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.vesselCallIdListPopup',	
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MIN_DATE_PERIOD : 31,	// MIN PERIOD DATE
	MAX_DATE_PERIOD : 31,   // MAX PERIOD DATE
	MAX_PERIOD_DAY : 62,
	vslTp:'',
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
		var store = me.getStore('VesselCallIdPopupStore');
		
		if(Ext.isClassic){
			me.setDateInDays("refEtaFromDt", - me.MIN_DATE_PERIOD);
			me.setDateInDays("refEtaToDt", + me.MAX_DATE_PERIOD);	
		}
		
		if(me.getView().recvData){
			if(!StringUtil.isNullorEmpty(me.getView().recvData.vslCallId)){
				store.load({
					params: {
						vslCallId: me.getView().recvData.vslCallId
					},
					callback: function(records, operation, success) {
						if (success) {
						}
					}
				});
			}
			
			if(!StringUtil.isNullorEmpty(me.getView().recvData.vslTp)){
				me.vslTp = me.getView().recvData.vslTp;
			}
		}
	},
	
	// Search Event Handler
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore('VesselCallIdPopupStore');
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}

		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if(MOST.config.Token.getVesselCallId()){
						var jpvcs = MOST.config.Token.getVesselCallId().toUpperCase().split('\r\n').join();
			    		var jpvcs2 = jpvcs.split('\n').join();
			    		var items = jpvcs2.split(',');
						if(items){
							var jpbcFilter = new Ext.util.Filter({
								id: 'jpvcFilterId',
								property: 'vslCallId',
								operator: 'in',
								value: items
							});
							
							store.addFilter(jpbcFilter);
						}else{
							store.removeFilter('jpvcFilterId');
						}
					}else{
						store.removeFilter('jpvcFilterId');
					}
				}
//				if(Ext.isClassic){
//					if(win){
//						win.getEl().unmask();
//					}
//				}
			}
		});
	},

	// Grid Row Double
	onDblClick: function() {
		var me = this;
		var window = me.getView().up('window');
		
    	window.returnValue = me.getReturnData();
       	window.close();
	},
	
	onDblTab: function(location, eOpts) {
		var me = this;
		var window = me.getView().up('window');
		
    	window.returnValue = me.getReturnData(eOpts);
       	window.close();
	},

	// Store Filter
	onStoreFilter : function(field, newValue, oldValue){
		var me = this;
		var refs = me.getReferences();
		
    	var store = me.getStore('VesselCallIdPopupStore');
    	
    	store.clearFilter();
    	
    	field.setValue(newValue.toUpperCase());
	},
	
	onDateChange:function( control, newValue, oldValue, eOpts ) {
		var me = this;
		var refs = me.getReferences();
		
		if(control == refs.refEtaFromDt){
			me.setDateInDaysByDate("refEtaToDt", me.MAX_PERIOD_DAY, control.getValue());
		} else {
			me.setDateInDaysByDate("refEtaFromDt", -me.MAX_PERIOD_DAY, control.getValue());
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
     	var params;
     	if(Ext.isClassic){
			var inputVslCd = refs.txtVslCd.getValue().toUpperCase();
			var inputVslNm = refs.txtVslNm.getValue().toUpperCase();
			var inputCallSeq = refs.txtCallSeq.getValue().toUpperCase();
			var inputVoyage = refs.txtVoyage.getValue().toUpperCase();
			var inputCallSign = refs.txtCallSign.getValue().toUpperCase();
			var dateCondition = me.checkFromToDate("refEtaFromDt", "refEtaToDt");
			
			if(inputVslCd === '' && inputVslNm === '' && inputCallSeq === '' && inputVoyage === '' && inputCallSign === '' 
				&& ((dateCondition && dateCondition.fromDtString === '' && dateCondition.fromDtString === '') || !dateCondition)){
				MessageUtil.warning('Warning', 'checkJpvcdata');
				return null;
			}
			
			params = {
				vslCd : inputVslCd,
				vslNm : inputVslNm,
				callSeq : inputCallSeq, 
				voyage : inputVoyage,
				callSign : inputCallSign
			}
			
			if(dateCondition != null){
				params["etaStart"] = dateCondition.fromDtString;
	    		params["etaEnd"] = dateCondition.toDtString;
			}
			
			if(me.vslTp != ''){
				params["vslTp"] = me.vslTp;
			}
     	}
     	else if(Ext.isModern){
     		var inputStr = refs.refjpvc.getValue();
     		if(inputStr == null || inputStr.trim().length < 4){
     			MessageUtil.warning('Warning', 'Search condition is at least 4 character');
				return null;
     		}
     		var inputVslCallId = (inputStr!=null ? inputStr.toUpperCase() : inputStr);
     		params = {
     				vslCallId : inputVslCallId,
			}
     	}
    	return params;
	},
	
	// Returns the popup result.
	getReturnData:function(eOpts){
		var me = this;
		var selection;
		var selectable;
		if(Ext.isClassic){
			var grid = me.lookupReference('refJPVCPopupGrid');
			selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		}
		else if(Ext.isModern){
			var grid = me.lookupReference('refJPVCPopupHHTGrid');
			selection = selection = eOpts.record;
		}
		var returnItem = {
			code : selection.data.vslCallId,
			codeName : selection.data.vslNm,
			item : selection
		}
		
		return returnItem;
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
	onAlignClick:function(vslNmSortCd){
		var me = this;
		var refs = me.getReferences();
		var inputVslCd = refs.txtVslCd.getValue().toUpperCase();
		var store = me.getStore('VesselCallIdPopupStore');
		
		
//	   	var win = refs.refVesselCallIdSearchPopup.up('panel');
//		if(win){
//			win.getEl().mask('Searching data...');
//		}
//		
		store.load({
			params: {
				vslCd: inputVslCd,
				vslNm: vslNmSortCd
			},
			callback: function(records, operation, success) {
				if (success) {
				}
//				if(win){
//					win.getEl().unmask();
//				}
			}
		});
	},
	
	
	/**
	 * HHT vessel schedule picker METHOD START (VesselSchedulePicker.js)
	 * =========================================================================================================================
	 */


	
	/**
	 * HHT METHOD END
	 * =========================================================================================================================
	 */		
	
	//contractor HHT Poppup Method
	onPopupHHTLoad : function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore('empPopupHHTList');
     	me.recvJPBStaffHHT = me.getView().recvData;
     	var roleCombo = me.getStore('roleCombo');
		if(roleCombo.loadCount <= 0){
			roleCombo.load({
				params : {
					vslCallID : me.recvJPBStaffHHT.vslCallID,
					workYmd : Ext.Date.format(MOST.config.Token.getWorkDate(), 'Ymd'),
					shftId : me.recvJPBStaffHHT.shftId
				},
				callback: function(records, operation, success) {
					if (success) {
						roleCombo.insert(0,[{"scd":"","scdNm":"All"}]);
						roleCombo.commitChanges();
						refs.refcomboRoleCode.setValue(me.recvJPBStaffHHT.roleCd);
//						me.onPopUPHHTSearch();
					}
				}
			});
		}
	},
	onPopUPHHTSearch: function() {
		var me = this;
     	var refs = me.getReferences();
     	var recvDataHHT = me.getView().recvData
    	var store = me.getStore('empPopupHHTList');
		store.load({
			params:{
				roleCd: refs.refcomboRoleCode.getValue(),
				shftId: me.recvJPBStaffHHT.shftId,
				workYmd: me.recvJPBStaffHHT.workYmd,
				vslCallID: me.recvJPBStaffHHT.vslCallID,
			},
			callback: function(records, operation, success) {
				if (success) {
				}
			}
		});
	},
	// Grid Row Double
	onHHTDblClick: function() {
		var me = this; 
		var window = me.getView().up('window');
		
    	window.returnValue = me.getContractorReturnData();
       	window.close();
	},
	
	// Returns the popup result.
	getContractorReturnData:function(){
		var me = this;
		var selection;
		var grid = me.lookupReference('refContractorPopupHHTGrid');
		selection = grid.getSelection() == null ? null : grid.getSelection();
		var returnItem = {
			code : selection.data.empId,
			codeName : selection.data.empNm,
			item : selection
		}
		
		return returnItem;
	},
	
	onSelectData : function(ref){
		var me = this; 
		var window = me.getView().up('window');
		if(ref.getReference() == 'refBtnSelectJPVCHHT'){//Select from JPVC:
			window.returnValue = me.getJPVCReturnDataHHT();
		}
		if(ref.getReference() == 'refBtnSelectContractorHHT'){//Select from Contractor:
			window.returnValue = me.getContracotrReturnDataHHT();
		}
		if(window.returnValue != null){
			window.close();	
		}
	},
	
	getJPVCReturnDataHHT : function() {
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		
		var grid = me.lookupReference('refJPVCPopupHHTGrid');
		selection = grid.getSelection() == null ? null : grid.getSelection();
		
		if(selection == null){
			MessageUtil.warning('Warning', 'tbl_sts_select');
			return null;
		}
		
		var returnItem = {
			code : selection.data.vslCallId,
			codeName : selection.data.vslNm,
			item : selection
		}

    	window.returnValue = returnItem;
		if(window.returnValue != null){
			window.close();	
		}
	},
	
	getJpvc : function(){
		return '';
	},
	
	getContracotrReturnDataHHT : function() {
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		
		var grid = me.lookupReference('refContractorPopupHHTGrid');
		selection = grid.getSelection() == null ? null : grid.getSelection();
		
		if(selection == null){
			MessageUtil.warning('Warning', 'tbl_sts_select');
			return null;
		}
		
		var returnItem = {
			code : selection.data.empId,
			codeName : selection.data.empNm,
			item : selection
		}

    	window.returnValue = returnItem;
		if(window.returnValue != null){
			window.close();	
		}
	}
	
	
});