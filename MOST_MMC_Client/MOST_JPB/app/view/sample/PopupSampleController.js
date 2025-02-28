Ext.define('MOST.view.sample.PopupSampleController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.popupsample',
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onLoad:function(){
		var me = this;
	},
	
	// Initialize Control
	onRefresh:function(){
		var me = this;
		var refs = me.getReferences();
		
		refs.ctlJpvc.setValue("");
		refs.ctlPartnerCode.setValue("");
		refs.ctlPartnerCodeMulti.setValue("");
		refs.ctlPartnerCodeType.setValue("");
		refs.ctlPartnerCodeGrid.setValue("");
		refs.ctlEmpId.setValue("");
		refs.ctlGpdo.setValue("");
		refs.ctlLorrysMulti.setValue("");
		refs.ctlLorrys.setValue("");
		refs.ctlLorrylist.setValue("");
		refs.ctlEquipmentCode.setValue("");
		refs.ctlForkliftCode.setValue("");
		refs.ctlMechanicalCode.setValue("");
		refs.ctlUserType.setValue("");
		refs.ctlCommonCode.setValue("");
		refs.ctlShippingNoteStorage.setValue("");
	},	
	
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	onChangeTagField: function(obj,newVal,oldVal, index){
		var me = this;
		var refs = me.getReferences();
		
		if (newVal=='' || newVal ==null) return;
		
		refs.ctlTagFieldValue.setValue(newVal);
	},
	
	// ROW 1 Popup Controller ===================================================================================================
	openJPVCPopup:function(){
		var me = this;
		me.openCodePopup('popup-vesselcalllistpopup', 'ctlJpvc');
	},
	
	openPatnerCdPopup:function(){
		var me = this;
		var params = {
			searchDivCd: 'SHA' 
		}
		me.openCodePopup('popup-partnercdpopup', 'ctlPartnerCode', params);
	},
	
	openPartnerCdForMultiPopup:function(){
		var me = this;
		var params = {
			searchPtyDivCd: 'TRK',  // CNS, FWD, TRK
			initSearch: true		// true, false
		};
		me.openCodePopup('popup-partnercdformultipopup', 'ctlPartnerCodeMulti', params);
	},
	
	openPartnerCdTypePopup:function(){
		var me = this;
		var params = {
			searchModule: 'MT'
		};
		me.openCodePopup('popup-partnercdtypepopup', 'ctlPartnerCodeType', params);
	},
	
	openPartnerCdForGridPopup:function(){
		var me = this;
		var params = {
			ptyDivCd: 'TRK'	// TRK, FWD
		};
		me.openCodePopup('popup-partnercdforgridpopup', 'ctlPartnerCodeGrid', params);
	},
	
	// ROW 2 Popup Controller ==================================================================================================
	openEmpIdPopup:function(){
		var me = this;
		var params = {
			roleCd: '',
			vslCallID: '',		// TEST DATA : 18TROL-S59		
			shftId: '',			// TEST DATA : SF0012
			workYmd: ''			// TEST DATA : 09/08/2018
		}
		me.openCodePopup('popup-empidpopup', 'ctlEmpId', params);
	},
	
	openGPDOPopup:function(lorryNo){
		var me = this;
		var params = {
			lorryNo: ''	// TEST DATA : JEA7392 ( LorryNo required value )
		};
	
		if(params.lorryNo === ''){
			MessageUtil.error('fail_msg', 'requireLorryno');
			return;
			
		} else {
			me.openCodePopup('popup-gpdopopup', 'ctlGpdo', params);
		}
	},
	
	openLorrysMultiPopup:function(){
		var me = this;
		var params = {
			searchDivCd: 'LR', // LR, LR2, DV
			ptnrCd: ''
		};
		
		me.openCodePopup('popup-lorrysmultipopup', 'ctlLorrysMulti', params);
	},
	
	openLorrysPopup:function(){
		var me = this;
		var params ={
			searchDivCd : 'LR2',	// LR, LR2, DV
			ptnrCd : '',
			vslCallId: '',
			shipgNoteNo: ''
		};
		
		me.openCodePopup('popup-lorryspopup', 'ctlLorrys', params);
	},
	
	openLorryListPopup:function(){
		var me = this;
	    var params = {
	    	vslCallId: '18WMIY-9',
	    	shipgNoteNo: '',
	    	blNo: 'OIJH00208384',
	    	tsptr: ''
	    }
	    
		me.openCodePopup('popup-lorrylistpopup', 'ctlLorrylist', params);
	},
	
	// ROW 3 Popup Controller ==================================================================================================
	openEquipmentCdPopup:function(){
		var me = this;
		var params = {
				searchType: 'equipmentcode', 	// equipmentcode, equipmentcapa
				eqDivCd: 'TR',					// GR, TR, SC
				scdLgv: '',
				scdVal: ''
		};
		me.openCodePopup('popup-equipmentcdpopup', 'ctlEquipmentCode', params);
	},
	
	openForkliftCdPopup:function(){
		var me = this;
		var params = {
			searchType: 'equipmentcapa',
			eqDivCdType: 'FL',	// Only FL
			viewType: 'Single'
		};
		me.openCodePopup('popup-forkliftcdpopup', 'ctlForkliftCode', params);
	},
	
	openMechanicalCdPopup:function(){
		var me = this;
		var params = {
				eqDivCdType: 'MC'	// MC, PC
			};
		me.openCodePopup('popup-mechanicalcdpopup', 'ctlMechanicalCode', params);
	},
	
	openUserTypePopup:function(){
		var me = this;
		me.openCodePopup('popup-usertypepopup', 'ctlUserType');
	},
	
	openShippingNoteForStoragePopup:function(){
		var me = this;
		me.openCodePopup('popup-shippingnoteforstoragepopup', 'ctlShippingNoteStorage');
	},
	
	// ROW 4 Popup Controller ==================================================================================================
	openCommonCodePopup:function(){
		var me = this;
		var params = {
			searchType: 'CMDT'
		};
		me.openCodePopup('popup-cmmcdpopup', 'ctlCommonCode', params);
	},
	
	openCommonCodeForMultiPopup:function(){
		var me = this;
		var params = {
			searchTp: 'CMDT',
			initSearch: false
		};
		me.openCodePopup('popup-cmmcdformultipopup', 'ctlCommonCodeMulti', params);
	},
	openCargoPopup:function(){
		var me = this;
		var params = {
			initSearch: false
		};
		me.openCodePopup('popup-authoritycdpopup', 'ctlCargo', params);
	},
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * EVENT POPUP HANDLER START
	 * =========================================================================================================================
	 */
	openJPVCPopupHHT:function(){
		var me = this;
		var params = {
			title: 'JPVC'
		};		
		ViewUtil.openCodePopup(this, 'app-jpvcpopuphht', 'refSearchVesselCallHHT', params);
	},
	
	onSearchContracotrHHT:function(){
		var me = this;
//		me.openCodePopup('app-contractPopuphht', 'refSearchContractorHHT');
		var params = {
			title: 'Contractor'
		};
		ViewUtil.openCodePopup(this, 'app-contractorpopuphht', 'refSearchContractorHHT', params);
	},
	
	onSearchLorryHHT:function(){
		var me = this;
		var params = {
			title: 'Lorry'
		};		
		ViewUtil.openCodePopup(this, 'app-lorrypopuphht',  'refLorryHHT', params);
	},
	
	
	onSearchRequesterHHT:function(){
		var me = this;
		var params = {
			title: 'Requester'
		};		
		ViewUtil.openCodePopup(this, 'app-requesterpopuphht', 'refRequesterHHT', params);
	},
	
	onSearchGatePassPrintingHHT:function(){
		var me = this;
		var params = {
			title: 'Gate Pass Printing'
		};		
		ViewUtil.openCodePopup(this, 'app-gatepassprintinghht', 'refGatePassPrintingHHT', params);
	},
	
	onSearchMechanicalEquipmentHHT:function(){
		var me = this;
		var params = {
			title: 'Mechanical Equipment',
//			eqDivCdType: 'MC'	// MC, PC
		};		
		ViewUtil.openCodePopup(this, 'app-mechanicalequipmenthht', 'refMechanicalEquipmentHHT', params);
	},
	
	onSearchGRListATAHHT:function(){
		var me = this;
		var params = {
			title: 'GR List for ATA'
		};		
		ViewUtil.openCodePopup(this, 'app-grlistatahht', 'refGRListATAHHT', params);
	},
	
	onSearchGRListPagingHHT:function(){
		var me = this;
		var params = {
			title: 'GR List for Paging'
		};		
		ViewUtil.openCodePopup(this, 'app-grlistpaginghht', 'refGRListPagingHHT', params);
	},
	
	onSearchDOListHHT:function(){
	var me = this;
		var params = {
			title: 'D/O List'
		};		
		ViewUtil.openCodePopup(this, 'app-dolistthht', 'refDOListHHT', params);
	},
	
	onSearchGatePassListHHT:function(){
	var me = this;
		var params = {
			title: 'Gate Pass List'
		};		
		ViewUtil.openCodePopup(this, 'app-gatepasslisthht', 'refGatePassListHHT', params);
	},
	
	onSearchWorkingAreaHHT:function(){
	var me = this;
		var params = {
			title: 'Working Area',
			searchType: 'COMM',
			lcd : 'MT',
			divCd : 'LOCDIV1',
			screenType : 'TYPE_MANPOWER'
//			screenType : 'TYPE_STEVEDORE'
//			screenType : 'TYPE_FORKLIFT'
		};		
		ViewUtil.openCodePopup(this, 'app-workingareapopuphht', 'refWorkingAreaHHT', params);
	},
	
	onSearchCommonCodeHHT:function(){
		var me = this;
		var title = '';
		var searchType = '';
//		searchType = 'SHA';//REQUESTER
		searchType = 'CTT';//FORWARDER
//		searchType = 'FWD';//FORWARDER
//		searchType = 'TRK';//TRANSPORTER
//		searchType = 'STV';//STEVEDORE
//		searchType = 'CMDT';//COMMODITY
		
		if(searchType == 'SHA'){
			title = 'Requester'	
		}else if(searchType == 'CTT'){
			title = 'Contractor'	
		}else if(searchType == 'FWD'){
			title = 'Forwarder'	
		}else if(searchType == 'TRK'){
			title = 'Transporterr'	
		}else if(searchType == 'STV'){
			title = 'Stevedore'	
		}else if(searchType == 'CMDT'){
			title = 'Common Code'	
		} 
			
		
		var params = {
			title: title,
			searchType: searchType,
		};		
		ViewUtil.openCodePopup(this, 'app-commoncodepopuphht', 'refCommonCodeHHT', params);
	}
	
	


	/**
	 * EVENT POPUP HANDLER START
	 * =========================================================================================================================
	 */
});
