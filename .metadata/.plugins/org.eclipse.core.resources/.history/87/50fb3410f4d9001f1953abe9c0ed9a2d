Ext.define('MOST.view.billing.TariffCodeController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	
	],

	alias: 'controller.tariffcode',
		
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	
	MAIN_GRID_REF_NAME: 'refTariffCodeGrid',	// Main Grid Name 
	MAIN_STORE_NAME: 'tariffCodeList',	// Main Store Name
	DEFAULT_MODEL : 'MOST.model.billing.TariffCode',
	checkSave: true,
	
	OPERATION_TYPE_STORE: 'operationTypeCombo',
	VEHICLE_STORE: 'vehicleCombo',
	WEIGHTBRIDGE_STORE: 'wbLryUseCombo',
	YES_NO_STORE: 'proformaYNComboStore',
	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	 
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad:function(){
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create('MOST.model.billing.SearchCostCenterParm');
		
		var searchTariffCodeCombo = me.getStore('tariffCodeCombo');
		var costCenterCombo = me.getStore('costCenterCombo');
		var financialCodeCombo = me.getStore('financialCodeCombo');
		
		var billingTypeCombo = me.getStore('billingTypeCombo');
		var standardTraderCombo = me.getStore('standardTraderCombo');
		var ssrTypeCombo = me.getStore('ssrTypeCombo');
		
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		me.updateViewStyle(me.getView());
		
		searchParm.set('progress', 'N');
		
		searchTariffCodeCombo.load();
		costCenterCombo.load();
		financialCodeCombo.load();
		standardTraderCombo.load();
		ssrTypeCombo.load();
		billingTypeCombo.load();
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
    	var bizViewAlias = me.getView().detailViewAlias;
		var win = me.lookupReference(bizViewAlias);
    	
    	if(params == null){
    		return;
    	}
    	
    	if (win) {
    		win.destroy();
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					}
				}
			}
		});
	},
	
	onAdd: function() {
		var me = this;
		var refs = me.getReferences();
		
		me.openDetailPopup(null);
	},
	
	onRemove: function() {
		var me = this;
		var refs = me.getReferences();
		var validStore = me.getStore('validRefChildBeforeDelete');
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) {
			return;
		}
		
		MessageUtil.question('confirm', 'infodelete_msg',null, 
			function(button){
				if (button === 'ok') {
					// 0130005: Create Errror when delete tariff code that used
					validStore.load({
						params: {	
							 trfCd: selection.get('trfCd')
							,subTrfCd: selection.get('subTrfCd')
						},
						callback: function(records, operation, success) {
							if (success) {
								if (records[0].get('chk') === 'Y') 
									me.deleteProcessFromList(selection);
								else 
									MessageUtil.warning('warning_msg','tariffDeleteError');
							}
						}
					});
				}
		});
	},
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.billing.SearchTariffCodeParm';
		searchBizParm.serviceID = 'MOST.tariffCode.selectTariffCode'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
	
	onDblClick: function(){
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		selection.set('workingStatus', 'U');
		selection.set('searchTp', 'TRF_DTL');
		
		if(selection.data.trfTpCd == "DC" || selection.data.trfTpCd == "FH" || selection.data.trfTpCd == "FL" || selection.data.trfTpCd == "FW" || selection.data.trfTpCd == "GE"
			|| selection.data.trfTpCd == "GC" || selection.data.trfTpCd == "HG" || selection.data.trfTpCd == "HL" || selection.data.trfTpCd == "LS" || selection.data.trfTpCd == "LA"
			|| selection.data.trfTpCd == "MF" || selection.data.trfTpCd == "PC" || selection.data.trfTpCd == "PD" || selection.data.trfTpCd == "RC" || selection.data.trfTpCd == "CR"
			|| selection.data.trfTpCd == "SC" || selection.data.trfTpCd == "SR" || selection.data.trfTpCd == "TR" || selection.data.trfTpCd == "TM" || selection.data.trfTpCd == "WS"
			|| selection.data.trfTpCd == "WB" || selection.data.trfTpCd == "WC"){
            selection.set('openDtl', 'Y');
		}
		
		if(selection == null) {
			return;
		}
		
		me.getView().detailViewAlias = 'app-tariffcodesdetail';
		me.openDetailPopup(selection, ViewUtil.getLabel('tariffCodeDetail'));//, false);
	},
	
	/**
	 * =========================================================================================================================
	 * DETAIL START
	 */
	// Detail Load
	onDetailLoad:function(){
		var me = this;
		var detailView = me.getDetailBizView();

		// show the required Field with Form in Detail view
		var infoForm = detailView.down('form').getForm();
		infoForm.isValid(); 
		
		me.setDetailInitialize();
		
		me.updateViewStyle(me.getDetailBizView());
	},
	
	onCostCenter_changeEvent: function(){
		var me = this;
		var	refs = me.getReferences();
		var theDetail = me.getViewModel().getData().theDetail;
		
		theDetail.set('financialCode', '');
		
		if(!StringUtil.isNullorEmpty(refs.refCostCenter.getValue())){
			//Get Financial code by Cost center
			var financialCode =  me.getStore('financialCodeCombo');
			
			financialCode.clearFilter();
			financialCode.filterBy(function(rec) {
				if(rec.get('costCntCd')){
					if(rec.get('costCntCd').indexOf(refs.refCostCenter.getValue()) > -1){
						return true;
					} else {
					    return false;
					}	
				}
			});
		}
	},
	
	onDetailSave: function(){
		var me = this;
		var	refs = me.getReferences();
		var	duplicateCheckStore = me.getStore('duplicateCheckStore');
		var detailView = me.getDetailBizView();
		var theDetail = me.getViewModel().getData().theDetail;
		var infoForm = detailView.down('form').getForm();
		
		if(StringUtil.isNullorEmpty(theDetail.get('trfCd')) 
				|| StringUtil.isNullorEmpty(theDetail.get('subTrfCd')) 
				|| StringUtil.isNullorEmpty(theDetail.get('trfTpCd')) 
				|| StringUtil.isNullorEmpty(theDetail.get('descr'))
				|| StringUtil.isNullorEmpty(theDetail.get('pyrTpCd')) 
				|| StringUtil.isNullorEmpty(theDetail.get('billTpCd'))){
			MessageUtil.error('warning_msg','tariffInputMadatory');
		}

		if (me.checkSave) {
			if(infoForm.isValid()){
				if(theDetail.get('workingStatus') == WorkingStatus.INSERT){
					var params = {
							trfCd: theDetail.get('trfCd'), //refs.txtTrfCd.getValue(),
							subTrfCd: theDetail.get('subTrfCd'), //refs.txtSubTrfCd.getValue(),
							searchTp : 'TRF_DATA'
					}
					
					duplicateCheckStore.load({
						params: params,
						callback:function(records, operation, success){
							if(success){
								if(records.length > 0){
									MessageUtil.error('warning_msg','tariffDuplicate');
									return;
								}else{
									me.saveProccess();
								}
							}
						}
					})
				} else{
					me.saveProccess();
				}
			}
		} else {
			MessageUtil.warning('warning_msg', 'valueShouldLessThan');
			return null;
		}
	},

	onDetailRemove:function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('tariffCodeDetail');
		var detailView = me.getDetailBizView();
		var bizViewAlias = me.getView().detailViewAlias;
		var win = me.lookupReference(bizViewAlias);
		var validStore = me.getStore('validRefChildBeforeDelete');
		var theDetail = me.getViewModel().getData().theDetail;
		
		if(theDetail.get('workingStatus') == WorkingStatus.UPDATE){
			MessageUtil.question('confirm', 'infodelete_msg',null, 
					function(button){
						if (button === 'ok') {
							me.deleteProcess();
						}
			});
		}
		
	},
	
	onOpenCommonPopup:function(args){
		var me = this;
		var refs = me.getReferences();
		
		if(args == 'purposeOfCall'){
			var params = {
					lcd: CodeConstants.LCD_VCS1,
					mcd: CodeConstants.MCD_VC_POC,
					dataField: refs.cboPurposeOfCall.getValue()
			};
			
			me.openCodePopup('popup-cmmcdpopupmultiselect', 'cboPurposeOfCall', params);
		}else if(args == 'vesselType'){
			var params = {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_VC_VSLTP,
					dataField: refs.cboVesselType.getValue()
			};
			
			me.openCodePopup('popup-cmmcdpopupmultiselect', 'cboVesselType', params);
		}else if(args == 'category'){
			var params = {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_CATGTP,
					dataField: refs.txtCategory.getValue()
			};
			
			me.openCodePopup('popup-cmmcdpopupmultiselect', 'txtCategory', params);
		}else if(args == 'categoryType'){
			var params = {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_CGTP,
					dataField: refs.txtCategoryType.getValue()
			};
			
			me.openCodePopup('popup-cmmcdpopupmultiselect', 'txtCategoryType', params);
		}else if(args == 'rehandle'){
			var params = {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_RHDLMODE,
					dataField: refs.txtRehandle.getValue()
			};
			
			me.openCodePopup('popup-cmmcdpopupmultiselect', 'txtRehandle', params);
		}else if(args == 'delivery'){
			var params = {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_DELVTP,
					dataField: refs.txtDelivery.getValue()
			};
			
			me.openCodePopup('popup-cmmcdpopupmultiselect', 'txtDelivery', params);
		}else if(args == 'packageType'){
			var params = {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_PKGTP,
					dataField: refs.txtPackageType.getValue()
			};
			
			me.openCodePopup('popup-cmmcdpopupmultiselect', 'txtPackageType', params);
		}else if(args == 'tradeType'){
			var params = {
					lcd: CodeConstants.LCD_VCS1,
					mcd: CodeConstants.MCD_VC_TOV,
					dataField: refs.txtTradeType.getValue()
			};
			
			me.openCodePopup('popup-cmmcdpopupmultiselect', 'txtTradeType', params);
		}else if(args == 'dgClass'){
			var params = {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_DGCLASS,
					dataField: refs.txtDgClass.getValue()
			};
			
			me.openCodePopup('popup-cmmcdpopupmultiselect', 'txtDgClass', params);
		}else if(args == 'shiftingType'){
			var params = {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_VSLSHFTTP,
					dataField: refs.txtShiftingType.getValue()
			};
			
			me.openCodePopup('popup-cmmcdpopupmultiselect', 'txtShiftingType', params);
		}else if(args == 'modeOfOpr'){
			var params = {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_TSPTTP	,
					dataField: refs.txtModeOfOpr.getValue()
			};
			
			me.openCodePopup('popup-cmmcdpopupmultiselect', 'txtModeOfOpr', params);
		}else if(args == 'whType'){
			var params = {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_WHTP,
					dataField: refs.txtWhType.getValue()
			};
			
			me.openCodePopup('popup-cmmcdpopupmultiselect', 'txtWhType', params);
		}else if(args == 'workingArea'){
			var params = {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_WPCD,
					dataField: refs.txtWorkingArea.getValue()
			};
			
			me.openCodePopup('popup-cmmcdpopupmultiselect', 'txtWorkingArea', params);
		}else if(args == 'stevedoreRole'){
			var params = {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_STVROLE,
					dataField: refs.txtStevedoreRole.getValue()
			};
			
			me.openCodePopup('popup-cmmcdpopupmultiselect', 'txtStevedoreRole', params);
		}else if(args == 'penaltyStevedore'){
			var params = {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_PNTYTP,
					dataField: refs.txtPenaltyStevedore.getValue()
			};
			
			me.openCodePopup('popup-cmmcdpopupmultiselect', 'txtPenaltyStevedore', params);
		}else if(args == 'commodity'){
			var params = {
					searchType:'CMDT',
					dataField: refs.txtCommodity.getValue()
			};
			
			me.openCodePopup('popup-cmmcdpopupmultiselect', 'txtCommodity', params);
		}else if(args == 'commodityGroup'){
			var params = {
					searchType: 'CMDT_GRP',
					dataField: refs.txtCommodityGroup.getValue()
			};
			
			me.openCodePopup('popup-cmmcdpopupmultiselect', 'txtCommodityGroup', params);
		}
	},
	
	onCboEquipmentTypeSelect:function(ele, rec, idx){
		var me = this;
		var refs = me.getReferences();
		var equipmentCapaListCombo = me.getStore('equipmentCapaListCombo');
		var oldCapaValue = refs.cboEquipmentCapa.getValue();
		var oldEquipmentType = rec.get('eqTpCd');
		
		equipmentCapaListCombo.clearFilter();
		equipmentCapaListCombo.filter('eqTpCd',rec.get('scd'));
		
		refs.cboEquipmentCapa.setValue('');
	},
	
	
	onCboCapacitySelect:function(ele, rec, idx){
		var me = this;
		var refs = me.getReferences();
		
		if(rec.get('capaCd') == 'CA0070' || rec.get('capaCd') == 'CA0071'){
			refs.refCntWorkingTime.setVisible(true);
		}else{
			refs.refCntWorkingTime.setVisible(false);
			refs.refRadio0717.setValue(false);
			refs.refRadio1806.setValue(false);
		}
	},
	
	onCboVatCdSelect: function(ele, rec, idx){
		var me = this;
		var refs = me.getReferences();
		var theDetail = me.getViewModel().get('theDetail');
		
		if(rec.get('scdNm').indexOf('%') != -1){
			rec.set('scdNm', rec.get('scdNm').replace('%', ''));
		}
		
		theDetail.set('gstRate', rec.get('scdNm'));
	},
	
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */

	// Detail Initialize
	setDetailInitialize:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData		// is the recvData null?
						? detailView.items.get(0).recvData	// True  => Update
						: Ext.create(me.DEFAULT_MODEL);		// False => Create

		recvData.set('workingStatus', recvData.phantom ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		
		refs.chkCargoNotToWeight.setHidden(recvData.get('trfTpCd') == 'CH' ? false : true);
		
		me.setDetailComboStore(recvData);

		// Fix : if Created status, then not commit the 'theDetail' model.
		if(!recvData.phantom) recvData.commit();

		// Set the recvData at 'theDetail' Store 
		me.getViewModel().setData({theDetail:recvData});
	},

	setDetailComboStore: function(recvData) {
		var me = this;
		var costCenterDetailCombo = me.getStore('costCenterDetailCombo');
		var invoiceUnit1Combo = me.getStore('invoiceUnit1Combo');
		var invoiceUnit2Combo = me.getStore('invoiceUnit2Combo');
		var invoiceUnit3Combo = me.getStore('invoiceUnit3Combo');
		var gstTypeCombo = me.getStore('gstTypeCombo');
		var freshwaterServiceCombo = me.getStore('freshwaterServiceCombo');
		var tariffConditionList = me.getStore('tariffConditionList');
		var tradeTypeListCombo = me.getStore('tradeTypeListCombo');
		var dockageTypeListCombo = me.getStore('dockageTypeListCombo');
		var equipmentTypeListCombo = me.getStore('equipmentTypeListCombo');
		var equipmentCapaListCombo = me.getStore('equipmentCapaListCombo');
		var searchTariffCodeCombo = me.getStore('tariffCodeDetailCombo');
		var billingTypeCombo = me.getStore('billingTypeCombo');
		var standardTraderCombo = me.getStore('standardTraderCombo');
		var ssrTypeCombo = me.getStore('ssrTypeCombo');
		var operatorCombo = me.getStore('operatorCombo');
		var tariffCodeDetail = me.getStore('tariffCodeDetail');
		var category1FilterComboStore = me.getStore('category1FilterComboStore');
		var wireTypeListCombo = me.getStore('wireTypeListCombo');
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.OPERATION_TYPE_COMBOBOX, me.OPERATION_TYPE_STORE);
		me.setComboBoxWithLocalCache(CacheServiceConstants.VEHICLE_COMBOBOX, me.VEHICLE_STORE);
		me.setComboBoxWithLocalCache(CacheServiceConstants.WEIGHTBRIDGE_SCALE_COMBOBOX, me.WEIGHTBRIDGE_STORE);
		me.setComboBoxWithLocalCache(CacheServiceConstants.YES_NO, me.YES_NO_STORE);
		
		invoiceUnit1Combo.load();
		invoiceUnit2Combo.load();
		invoiceUnit3Combo.load();
		gstTypeCombo.load();
		freshwaterServiceCombo.load();
		tariffConditionList.load();
		tradeTypeListCombo.load();
		dockageTypeListCombo.load();
		equipmentTypeListCombo.load();
		billingTypeCombo.load();
		standardTraderCombo.load();
		ssrTypeCombo.load();
		searchTariffCodeCombo.load();
		operatorCombo.load();
		equipmentCapaListCombo.load();
		category1FilterComboStore.load();
		wireTypeListCombo.load();

		if(recvData.get('searchTp') == 'TRF_DTL'){
			tariffCodeDetail.load({
				params:{
					searchTp: recvData.get('searchTp'),
					trfTpCd: recvData.get('trfTpCd'),
					trfCd: recvData.get('trfCd'),
					costCntCd: recvData.get('costCntCd'),
					billTpCd: recvData.get('billTpCd'),
					subTrfCd: recvData.get('subTrfCd')
				},
				callback:function(records,success){
					if(success){
						if(records.length > 0){
							records[0].set('workingStatus', WorkingStatus.UPDATE);
						}
						
						me.getViewModel().setData({theDetail:records[0]});
						
						me.bindTariffCondition(records[0].get('tariffConditionList'));
					}
				}
			});
		}
	},

	onChangeNumberTo: function (refsFrom, refsTo) {
		var me = this;
		
		if (refsFrom && refsTo) {
			var from = me.lookupReference(Ext.String.format('{0}', refsFrom)).getValue();
			var to = me.lookupReference(Ext.String.format('{0}', refsTo)).getValue();
			
			if (from != null && to != null) {
				if (from > to) {
					MessageUtil.warning('warning_msg', 'valueShouldLessThan');
					me.checkSave = false;
					return false;
				} else {
					me.checkSave = true;
				}
			}
		}
		
		return true;
	},
	
	onCategory1Change: function(combo, newValue, oldValue, eOpts){
		var me = this;
		var refs = me.getReferences();
		var category2FilterComboStore = me.getStore('category2FilterComboStore');
		var theDetail = me.getViewModel().get('theDetail');
		
		category2FilterComboStore.removeAll();
		
		if(oldValue != null){
			theDetail.set('category2', '');
			theDetail.set('category3', '');
		}
		
		if(newValue != null && newValue != ''){
			category2FilterComboStore.load({
				params: {
					scdLgv: newValue
				}
			});
		}
	},
	
	onCategory2Change: function(combo, newValue, oldValue, eOpts){
		var me = this;
		var refs = me.getReferences();
		var category3FilterComboStore = me.getStore('category3FilterComboStore');
		var theDetail = me.getViewModel().get('theDetail');
		
		category3FilterComboStore.removeAll();
		
		if(oldValue != null){
			theDetail.set('category3', '');
		}
		
		if(newValue != null && newValue != ''){
			category3FilterComboStore.load({
				params: {
					scdLgv: newValue
				}
			});
		}
	},
	
	bindTariffCondition:function(tariffConditionList){
		var me = this;
		var refs = me.getReferences();
		var theDetail = me.getViewModel().get('theDetail');
		
		for(var i=0; i<tariffConditionList.length; i++){
			var record = tariffConditionList[i];
			
			if(record.prptCd.indexOf('V') > -1){
				if(record.prptCd == 'V1'){
					theDetail.set('loaFrom', record.tierVal1);
					theDetail.set('loaTo', record.tierVal2);
					theDetail.set('arrvDt', record.chrVal);
				}else if(record.prptCd == 'V2'){
					if(StringUtil.isNullorEmpty(theDetail.get('purpCall'))){
						theDetail.set('purpCall', record.chrVal);
					}else{
						var value = theDetail.get('purpCall') + ',' + record.chrVal; 
						theDetail.set('purpCall', value);
					}
				}else if(record.prptCd == 'V3'){
					if(StringUtil.isNullorEmpty(theDetail.get('vslTp'))){
						theDetail.set('vslTp', record.chrVal);
					}else{
						var value = theDetail.get('vslTp') + ',' + record.chrVal; 
						theDetail.set('vslTp', value);
					}
				}else if(record.prptCd == 'V4'){
					theDetail.set('vslTradeTp', record.chrVal);
				}else if(record.prptCd == 'V5'){
					theDetail.set('dockTp', record.chrVal);
				}else if(record.prptCd == 'V6'){
					theDetail.set('arrvDt', record.noVal);
				}else if(record.prptCd == 'V7'){
					theDetail.set('operYn', record.chrVal == 'Y' ? true : false);
					refs.chkOpeartedYN.checked = record.chrVal == 'Y' ? true : false
				}else if(record.prptCd == 'V8'){
					theDetail.set('passenAgeFrom', record.tierVal1);
					theDetail.set('passenAgeTo', record.tierVal2);
				}else if(record.prptCd == 'V9'){
					theDetail.set('freshWtServe', record.chrVal);
				}else if(record.prptCd == 'V10'){
					theDetail.set('grtFrom', record.tierVal1);
					theDetail.set('grtTo', record.tierVal2);
				}
			}
			
			if(record.prptCd.indexOf('O') > -1){
				if(record.prptCd == 'O1'){
					if(StringUtil.isNullorEmpty(theDetail.get('steveRole'))){
						theDetail.set('steveRole', record.chrVal);
					}else{
						var value = theDetail.get('steveRole') + ',' + record.chrVal; 
						theDetail.set('steveRole', value);
					}
				}else if(record.prptCd == 'O2'){
					if(record.chrVal == 'D'){
						refs.radioDaysAfterAtu.setValue(true);
					}else if(record.chrVal == 'S'){
						refs.radioSubDay.setValue(true);
					}
				}else if(record.prptCd == 'O3'){
					theDetail.set('subDay', record.noVal);
				}else if(record.prptCd == 'O4'){
					if(StringUtil.isNullorEmpty(theDetail.get('paneltySteve'))){
						theDetail.set('paneltySteve', record.chrVal);
					}else{
						var value = theDetail.get('paneltySteve') + ',' + record.chrVal; 
						theDetail.set('paneltySteve', value);
					}
				}else if(record.prptCd == 'O5'){
					theDetail.set('useOfWb', record.chrVal);
				}else if(record.prptCd == 'O6'){
					theDetail.set('cgStorageFrom', record.tierVal1);
					theDetail.set('cgStorageTo', record.tierVal2);
				}else if(record.prptCd == 'O7'){
					theDetail.set('accumFrom', record.tierVal1);
					theDetail.set('accumTo', record.tierVal2);
				}else if(record.prptCd == 'O8'){
					theDetail.set('penLate', record.chrVal == 'Y' ? true : false);
					refs.chkPenLate.checked = record.chrVal == 'Y' ? true : false;
				}else if(record.prptCd == 'O9'){
					theDetail.set('ssrYn', record.chrVal == 'Y' ? true : false);
					refs.chkSsrYn.checked = record.chrVal == 'Y' ? true : false;
				}
			}
			
			if(record.prptCd.indexOf('E') > -1){
				if(record.prptCd == 'E1'){
					theDetail.set('equipTp', record.chrVal);
				}else if(record.prptCd == 'E2'){
					theDetail.set('capacity', record.chrVal);
					
					if(record.chrVal == 'CA0070' || record.chrVal == 'CA0071'){
						refs.refCntWorkingTime.setVisible(true);
					}else{
						refs.refCntWorkingTime.setVisible(false);
						refs.refRadio0717.setValue(false);
						refs.refRadio1806.setValue(false);
					}
				}else if(record.prptCd == 'E3'){
					if(StringUtil.isNullorEmpty(theDetail.get('workingArea'))){
						theDetail.set('workingArea', record.chrVal);
					}else{
						var value = theDetail.get('workingArea') + ',' + record.chrVal; 
						theDetail.set('workingArea', value);
					}
				}else if(record.prptCd == 'E4'){
					if(record.chrVal == 'D'){
						refs.refRadio0717.setValue(true);
					}else if(record.chrVal == 'N'){
						refs.refRadio1806.setValue(true);
					}
				}
			}
			
			if(record.prptCd.indexOf('C') > -1){
				if(record.prptCd == 'C1'){
					if(StringUtil.isNullorEmpty(theDetail.get('category'))){
						theDetail.set('category', record.chrVal);
					}else{
						var value = theDetail.get('category') + ',' + record.chrVal;
						theDetail.set('category', value);
					}
				}else if(record.prptCd == 'C2'){
					if(StringUtil.isNullorEmpty(theDetail.get('rehandle'))){
						theDetail.set('rehandle', record.chrVal);
					}else{
						var value = theDetail.get('rehandle') + ',' + record.chrVal;
						theDetail.set('rehandle', value);
					}
				}else if(record.prptCd == 'C3'){
					if(StringUtil.isNullorEmpty(theDetail.get('delvTpCd'))){
						theDetail.set('delvTpCd', record.chrVal);
					}else{
						var value = theDetail.get('delvTpCd') + ',' + record.chrVal;
						theDetail.set('delvTpCd', value);
					}
				}else if(record.prptCd == 'C4'){
					if(StringUtil.isNullorEmpty(theDetail.get('cargoTradeTp'))){
						theDetail.set('cargoTradeTp', record.chrVal);
					}else{
						var value = theDetail.get('cargoTradeTp') + ',' + record.chrVal;
						theDetail.set('cargoTradeTp', value);
					}
				}else if(record.prptCd == 'C5'){
					if(StringUtil.isNullorEmpty(theDetail.get('shftTp'))){
						theDetail.set('shftTp', record.chrVal);
					}else{
						var value = theDetail.get('shftTp') + ',' + record.chrVal;
						theDetail.set('shftTp', value);
					}
				}else if(record.prptCd == 'C6'){
					if(StringUtil.isNullorEmpty(theDetail.get('whTp'))){
						theDetail.set('whTp', record.chrVal);
					}else{
						var value = theDetail.get('whTp') + ',' + record.chrVal;
						theDetail.set('whTp', value);
					}
				}else if(record.prptCd == 'C7'){
					if(StringUtil.isNullorEmpty(theDetail.get('trfCgTp'))){
						theDetail.set('trfCgTp', record.chrVal);
					}else{
						var value = theDetail.get('trfCgTp') + ',' + record.chrVal;
						theDetail.set('trfCgTp', value);
					}
				}else if(record.prptCd == 'C8'){
					if(StringUtil.isNullorEmpty(refs.txtCommodityGroup.getValue())){
						theDetail.set('cmdtGrpCd', record.chrVal);
					}else{
						var value = theDetail.get('cmdtGrpCd') + ',' + record.chrVal;
						theDetail.set('cmdtGrpCd', value);
					}
				}else if(record.prptCd == 'C9'){
					if(StringUtil.isNullorEmpty(refs.txtCommodity.getValue())){
						theDetail.set('cmdtCd', record.chrVal);
					}else{
						var value = theDetail.get('cmdtCd') + ',' + record.chrVal;
						theDetail.set('cmdtCd', value);
					}
				}else if(record.prptCd == 'C10'){
					if(StringUtil.isNullorEmpty(refs.txtPackageType.getValue())){
						theDetail.set('pkgTp', record.chrVal);
					}else{
						var value = theDetail.get('pkgTp') + ',' + record.chrVal;
						theDetail.set('pkgTp', value);
					}
				}else if(record.prptCd == 'C11'){
					if(StringUtil.isNullorEmpty(refs.txtDgClass.getValue())){
						theDetail.set('dgClass', record.chrVal);
					}else{
						var value = theDetail.get('dgClass') + ',' + record.chrVal;
						theDetail.set('dgClass', value);
					}
				}else if(record.prptCd == 'C12'){
					if(StringUtil.isNullorEmpty(refs.txtModeOfOpr.getValue())){
						theDetail.set('oprMode', record.chrVal);
					}else{
						var value = theDetail.get('oprMode') + ',' + record.chrVal;
						theDetail.set('oprMode', value);
					}
				}else if(record.prptCd == 'C13'){
					theDetail.set('damagedChk', record.chrVal == 'Y' ? true : false);
					refs.chkCargoDamaged.checked = record.chrVal == 'Y' ? true : false;
				}else if(record.prptCd == 'C14'){
					theDetail.set('oprTp', record.chrVal);
				}else if(record.prptCd == 'C15'){
					theDetail.set('vehicle', record.chrVal);
				}else if(record.prptCd == 'C16'){
					if(record.oprIdtCd == 'EQ'){
						refs.rdoFromTo.setValue(true);
						refs.txtCargoListFrom.setValue(record.tierVal1);
						refs.txtCargoListTo.setValue(record.tierVal2);
					}else{
						refs.rdoOperator.setValue(true);
						refs.cboOperator.setValue(record.oprIdtCd);
						refs.txtCargoListOperatorNumber.setValue(record.noVal);
					}
					
					refs.cboMeasurementCondition.setValue(record.chrVal);
				}else if(record.prptCd == 'C17'){
					theDetail.set('wgtChk', record.chrVal == 'N' ? true : false);
					refs.chkCargoNotToWeight.checked = record.chrVal == 'N' ? true : false;
				}
			}
			
			if(record.prptCd.indexOf('S') > -1){
				if(record.prptCd == 'S1'){
					theDetail.set('category1', record.chrVal);
				} else if(record.prptCd == 'S2'){
					theDetail.set('category2', record.chrVal);
				} else if(record.prptCd == 'S3'){
					theDetail.set('category3', record.chrVal);
				}
			}
		}
	},
	
	saveProccess:function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theDetail');
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		var isCreated = detailItem.phantom;
		
		detailItem.set('userId', Token.getUserId());
		me.setTariffConditionList(detailItem);
		
		if (detailItem == null) {
			return;
		} else {
			detailItem.phantom = isCreated;
		}
		
		if(detailItem.get('operYn') == true){
			detailItem.set('operYn', 'Y');
		} else {
			detailItem.set('operYn', 'N');
		}
		
		if(detailItem.get('damagedChk') == true){
			detailItem.set('damagedChk', 'Y');
		} else {
			detailItem.set('damagedChk', 'N');
		}
		
		if(detailItem.get('penLate') == true){
			detailItem.set('penLate', 'Y');
		} else {
			detailItem.set('penLate', 'N');
		}
		
		if(detailItem.get('ssrYn') == true){
			detailItem.set('ssrYn', 'Y');
		} else {
			detailItem.set('ssrYn', 'N');
		}
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = isCreated;
		updateParm.set('workingStatus', WorkingStatus.convertInt(isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE));
		updateParm.set('item', detailItem.data);
		
		updateParm.save({
			success : function(record) {
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
					function(button){
						if (button === 'ok') {
							detailItem.set('updateTime', record.get('updateTime'));
							detailItem.commit();
					        me.onSearch();
						}
					});
			},
			failure : function() {
			}
		});
	},
	
	deleteProcessFromList : function(item) {
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = false;
		updateParm.drop();
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
		updateParm.set('items',new Array());

		updateParm.get('items').push(item.data);
		
		updateParm.save({
			success : function(record, operation) {
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
						function(button){
							if (button === 'ok') {
								me.onSearch();
							}
					});
			}
		});
	},

	deleteProcess : function() {
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		var store = me.getStore(me.MAIN_STORE_NAME);
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = false;
		updateParm.drop();
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
		updateParm.set('items',new Array());

		updateParm.get('items').push(detailItem.data);
		
		updateParm.save({
			success : function(record, operation) {
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
						function(button){
						if (button === 'ok') {
							me.onSearch();
						}
					});
			}
		});
	},
	
	setTariffConditionList:function(tariffCodeItem){
		var  me = this
			,refs = me.getReferences()
		    ,tariffConditionItem = Ext.create('MOST.model.billing.TariffConditionItem')
			,tariffConditionPrptItem = Ext.create('MOST.model.billing.TariffConditionPropertyItem');

		var commonParm = {
			trfCd: tariffCodeItem.get('trfCd')
		   ,subTrfCd: tariffCodeItem.get('subTrfCd')
		   ,userId: MOST.config.Token.getUserId()
		}

		tariffConditionItem.set(commonParm);
		tariffConditionPrptItem.set(commonParm);
		
		var seq = 1;
		var tariffConditionList = new Array();
		var tariffConditionPrptList = new Array();
		var theDetail = me.getViewModel().get('theDetail');
		
		//vessel opr
		for(var i=1; i < 11; i++){
			if(i == 1){
				var tariffVslOprConditionItem = tariffConditionItem.copy();
				var tariffVslOprConditionPrptItem = tariffConditionPrptItem.copy();
				
				tariffVslOprConditionItem.set('seq', seq);
				tariffVslOprConditionItem.set('prptCd', 'V1');
				tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
				tariffVslOprConditionItem.set('tierVal1', refs.txtLOAFrom.getValue());
				tariffVslOprConditionItem.set('tierVal2', refs.txtLOATo.getValue());
				tariffVslOprConditionItem.set('chrVal', refs.txtArrivalTime.getValue());
				
				tariffConditionList.push(tariffVslOprConditionItem.getData());
				
				tariffVslOprConditionPrptItem.set('prcTpCd', 'S');
				tariffVslOprConditionPrptItem.set('prptCd', 'V1');
				tariffVslOprConditionPrptItem.set('prptNm', 'LOA');
				tariffVslOprConditionPrptItem.set('dataTpCd', 'TIER');
				tariffVslOprConditionPrptItem.set('dataLen', '5');
				
				tariffConditionPrptList.push(tariffVslOprConditionPrptItem.getData());
			}else if (i == 2){
				var itm = refs.cboPurposeOfCall.getValue().split(',');
				var tariffVslOprConditionPrptItem = tariffConditionPrptItem.copy();
			
				itm.forEach(function(data){
					var tariffVslOprConditionItem = tariffConditionItem.copy();
					
					tariffVslOprConditionItem.set('seq', seq);
					tariffVslOprConditionItem.set('prptCd', 'V2');
					tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
					tariffVslOprConditionItem.set('chrVal', data);
					
					tariffConditionList.push(tariffVslOprConditionItem.getData());
					seq++;
				});
				
				tariffVslOprConditionPrptItem.set('prcTpCd', 'S');
				tariffVslOprConditionPrptItem.set('prptCd', 'V2');
				tariffVslOprConditionPrptItem.set('prptNm', 'Purpose of Call');
				tariffVslOprConditionPrptItem.set('dataTpCd', 'CHAR');
				tariffVslOprConditionPrptItem.set('dataLen', '2');

				tariffConditionPrptList.push(tariffVslOprConditionPrptItem.getData());
			}else if(i == 3){
			    var itm = refs.cboVesselType.getValue().split(',');
			    var tariffVslOprConditionPrptItem = tariffConditionPrptItem.copy();
			
			    itm.forEach(function(data){
				    var tariffVslOprConditionItem = tariffConditionItem.copy();
					
				    tariffVslOprConditionItem.set('seq', seq);
				    tariffVslOprConditionItem.set('prptCd', 'V3');
				    tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
				    tariffVslOprConditionItem.set('chrVal', data);
					
				    tariffConditionList.push(tariffVslOprConditionItem.getData());
				    
				    seq++;
			    });
				
				tariffVslOprConditionPrptItem.set('prcTpCd', 'S');
				tariffVslOprConditionPrptItem.set('prptCd', 'V3');
				tariffVslOprConditionPrptItem.set('prptNm', 'Vessel Type');
				tariffVslOprConditionPrptItem.set('dataTpCd', 'CHAR');
				tariffVslOprConditionPrptItem.set('dataLen', '2');
				
				tariffConditionPrptList.push(tariffVslOprConditionPrptItem.getData());
			}else if(i == 4){
				var tariffVslOprConditionItem = tariffConditionItem.copy();
				var tariffVslOprConditionPrptItem = tariffConditionPrptItem.copy();
				
				tariffVslOprConditionItem.set('seq', seq);
				tariffVslOprConditionItem.set('prptCd', 'V4');
				tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
				tariffVslOprConditionItem.set('chrVal', refs.cboTradeType.getValue());
				
				tariffConditionList.push(tariffVslOprConditionItem.getData());
				
				tariffVslOprConditionPrptItem.set('prcTpCd', 'S');
				tariffVslOprConditionPrptItem.set('prptCd', 'V4');
				tariffVslOprConditionPrptItem.set('prptNm', 'Trade Type');
				tariffVslOprConditionPrptItem.set('dataTpCd', 'CHAR');
				tariffVslOprConditionPrptItem.set('dataLen', '1');
				
				tariffConditionPrptList.push(tariffVslOprConditionPrptItem.getData());
			}else if(i == 5){
				var tariffVslOprConditionItem = tariffConditionItem.copy();
				var tariffVslOprConditionPrptItem = tariffConditionPrptItem.copy();
				
				tariffVslOprConditionItem.set('seq', seq);
				tariffVslOprConditionItem.set('prptCd', 'V5');
				tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
				tariffVslOprConditionItem.set('chrVal', refs.cboDockageType.getValue());
				
				tariffConditionList.push(tariffVslOprConditionItem.getData());
				
				tariffVslOprConditionPrptItem.set('prcTpCd', 'S');
				tariffVslOprConditionPrptItem.set('prptCd', 'V5');
				tariffVslOprConditionPrptItem.set('prptNm', 'Dockage Type');
				tariffVslOprConditionPrptItem.set('dataTpCd', 'CHAR');
				tariffVslOprConditionPrptItem.set('dataLen', '2');
				
				tariffConditionPrptList.push(tariffVslOprConditionPrptItem.getData());
			}else if(i == 6){
				var tariffVslOprConditionItem = tariffConditionItem.copy();
				var tariffVslOprConditionPrptItem = tariffConditionPrptItem.copy();
				
				tariffVslOprConditionItem.set('seq', seq);
				tariffVslOprConditionItem.set('prptCd', 'V6');
				tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
				tariffVslOprConditionItem.set('noVal', refs.txtArrivalTime.getValue());
				
				tariffConditionList.push(tariffVslOprConditionItem.getData());
				
				tariffVslOprConditionPrptItem.set('prcTpCd', 'S');
				tariffVslOprConditionPrptItem.set('prptCd', 'V6');
				tariffVslOprConditionPrptItem.set('prptNm', 'Arrival Time(s) in a month');
				tariffVslOprConditionPrptItem.set('dataTpCd', 'CHAR');
				tariffVslOprConditionPrptItem.set('dataLen', '3');
				
				tariffConditionPrptList.push(tariffVslOprConditionPrptItem.getData());
			}else if(i == 7){
				var tariffVslOprConditionItem = tariffConditionItem.copy();
				var tariffVslOprConditionPrptItem = tariffConditionPrptItem.copy();
				var oprCondition = theDetail.get('operYn') == 'true' ? 'Y' : 'N';
					
				tariffVslOprConditionItem.set('seq', seq);
				tariffVslOprConditionItem.set('prptCd', 'V7');
				tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
				tariffVslOprConditionItem.set('chrVal', oprCondition);
				
				tariffConditionList.push(tariffVslOprConditionItem.getData());
				
				tariffVslOprConditionPrptItem.set('prcTpCd', 'S');
				tariffVslOprConditionPrptItem.set('prptCd', 'V7');
				tariffVslOprConditionPrptItem.set('prptNm', 'Operated at Private Jetty');
				tariffVslOprConditionPrptItem.set('dataTpCd', 'YN');
				tariffVslOprConditionPrptItem.set('dataLen', '3');
				
				tariffConditionPrptList.push(tariffVslOprConditionPrptItem.getData());
			}else if(i == 8){
				var tariffVslOprConditionItem = tariffConditionItem.copy();
				var tariffVslOprConditionPrptItem = tariffConditionPrptItem.copy();
				
				tariffVslOprConditionItem.set('seq', seq);
				tariffVslOprConditionItem.set('prptCd', 'V8');
				tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
				tariffVslOprConditionItem.set('tierVal1', refs.txtPassAgeFrom.getValue());
				tariffVslOprConditionItem.set('tierVal2', refs.txtPassAgeTo.getValue());
				
				tariffConditionList.push(tariffVslOprConditionItem.getData());
				
				tariffVslOprConditionPrptItem.set('prcTpCd', 'S');
				tariffVslOprConditionPrptItem.set('prptCd', 'V8');
				tariffVslOprConditionPrptItem.set('prptNm', 'Passenger Age');
				tariffVslOprConditionPrptItem.set('dataTpCd', 'TIER');
				tariffVslOprConditionPrptItem.set('dataLen', '3');
				
				tariffConditionPrptList.push(tariffVslOprConditionPrptItem.getData());
			}else if(i == 9){
				var tariffVslOprConditionItem = tariffConditionItem.copy();
				var tariffVslOprConditionPrptItem = tariffConditionPrptItem.copy();
				
				tariffVslOprConditionItem.set('seq', seq);
				tariffVslOprConditionItem.set('prptCd', 'V9');
				tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
				tariffVslOprConditionItem.set('chrVal', refs.cboFreshwaterService.getValue());
				
				tariffConditionList.push(tariffVslOprConditionItem.getData());
				
				tariffVslOprConditionPrptItem.set('prcTpCd', 'S');
				tariffVslOprConditionPrptItem.set('prptCd', 'V9');
				tariffVslOprConditionPrptItem.set('prptNm', 'Fresh Water Service Type');
				tariffVslOprConditionPrptItem.set('dataTpCd', 'CHAR');
				tariffVslOprConditionPrptItem.set('dataLen', '2');
				
				tariffConditionPrptList.push(tariffVslOprConditionPrptItem.getData());
			}else if(i == 10){
				var tariffVslOprConditionItem = tariffConditionItem.copy();
				var tariffVslOprConditionPrptItem = tariffConditionPrptItem.copy();
				
				tariffVslOprConditionItem.set('seq', seq);
				tariffVslOprConditionItem.set('prptCd', 'V10');
				tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
				tariffVslOprConditionItem.set('tierVal1', refs.txtGRTFrom.getValue());
				tariffVslOprConditionItem.set('tierVal2', refs.txtGRTTo.getValue());
				
				tariffConditionList.push(tariffVslOprConditionItem.getData());
				
				tariffVslOprConditionPrptItem.set('prcTpCd', 'S');
				tariffVslOprConditionPrptItem.set('prptCd', 'V10');
				tariffVslOprConditionPrptItem.set('prptNm', 'GRT');
				tariffVslOprConditionPrptItem.set('dataTpCd', 'TIER');
				tariffVslOprConditionPrptItem.set('dataLen', '5');
				
				tariffConditionPrptList.push(tariffVslOprConditionPrptItem.getData());
			}
			
			seq++;
		}
		
		//cargo tab
		for(var i = 1; i < 18; i ++){
			if(i == 1){
				var itm = refs.txtCategory.getValue().split(',');
				var tariffCargoConditionPrptItem = tariffConditionPrptItem.copy();
				
				itm.forEach(function(data){
					var tariffVslOprConditionItem = tariffConditionItem.copy();
					
					tariffVslOprConditionItem.set('seq', seq);
					tariffVslOprConditionItem.set('prptCd', 'C1');
					tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
					tariffVslOprConditionItem.set('chrVal', data);
					
					tariffConditionList.push(tariffVslOprConditionItem.getData());
					seq++;
				});
				
				tariffCargoConditionPrptItem.set('prcTpCd', 'S');
				tariffCargoConditionPrptItem.set('prptCd', 'C1');
				tariffCargoConditionPrptItem.set('prptNm', 'Category');
				tariffCargoConditionPrptItem.set('dataTpCd', 'CHAR');
				tariffCargoConditionPrptItem.set('dataLen', '1');
				
				tariffConditionPrptList.push(tariffCargoConditionPrptItem.getData());
			}else if (i==2){
				var itm = refs.txtRehandle.getValue().split(',');
				var tariffCargoConditionPrptItem = tariffConditionPrptItem.copy();
				
				itm.forEach(function(data){
					var tariffVslOprConditionItem = tariffConditionItem.copy();
					
					tariffVslOprConditionItem.set('seq', seq);
					tariffVslOprConditionItem.set('prptCd', 'C2');
					tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
					tariffVslOprConditionItem.set('chrVal', data);
					
					tariffConditionList.push(tariffVslOprConditionItem.getData());
					seq++;
				});
				
				tariffCargoConditionPrptItem.set('prcTpCd', 'S');
				tariffCargoConditionPrptItem.set('prptCd', 'C2');
				tariffCargoConditionPrptItem.set('prptNm', 'Rehandle');
				tariffCargoConditionPrptItem.set('dataTpCd', 'CHAR');
				tariffCargoConditionPrptItem.set('dataLen', '2');
				
				tariffConditionPrptList.push(tariffCargoConditionPrptItem.getData());
			}else if (i==3){
				var itm = refs.txtDelivery.getValue().split(',');
				var tariffCargoConditionPrptItem = tariffConditionPrptItem.copy();
				
				itm.forEach(function(data){
					var tariffVslOprConditionItem = tariffConditionItem.copy();
					
					tariffVslOprConditionItem.set('seq', seq);
					tariffVslOprConditionItem.set('prptCd', 'C3');
					tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
					tariffVslOprConditionItem.set('chrVal', data);
					
					tariffConditionList.push(tariffVslOprConditionItem.getData());
					seq++;
				});
				
				tariffCargoConditionPrptItem.set('prcTpCd', 'S');
				tariffCargoConditionPrptItem.set('prptCd', 'C3');
				tariffCargoConditionPrptItem.set('prptNm', 'Devivery');
				tariffCargoConditionPrptItem.set('dataTpCd', 'CHAR');
				tariffCargoConditionPrptItem.set('dataLen', '1');
				
				tariffConditionPrptList.push(tariffCargoConditionPrptItem.getData());
			}else if (i==4){
				var itm = refs.txtTradeType.getValue().split(',');
				var tariffCargoConditionPrptItem = tariffConditionPrptItem.copy();
				
				itm.forEach(function(data){
					var tariffVslOprConditionItem = tariffConditionItem.copy();
					
					tariffVslOprConditionItem.set('seq', seq);
					tariffVslOprConditionItem.set('prptCd', 'C4');
					tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
					tariffVslOprConditionItem.set('chrVal', data);
					
					tariffConditionList.push(tariffVslOprConditionItem.getData());
					seq++;
				});
				
				tariffCargoConditionPrptItem.set('prcTpCd', 'S');
				tariffCargoConditionPrptItem.set('prptCd', 'C4');
				tariffCargoConditionPrptItem.set('prptNm', 'Cargo Trade Type');
				tariffCargoConditionPrptItem.set('dataTpCd', 'CHAR');
				tariffCargoConditionPrptItem.set('dataLen', '1');
				
				tariffConditionPrptList.push(tariffCargoConditionPrptItem.getData());
			}else if (i==5){
				var itm = refs.txtShiftingType.getValue().split(',');
				var tariffCargoConditionPrptItem = tariffConditionPrptItem.copy();
				
				itm.forEach(function(data){
					var tariffVslOprConditionItem = tariffConditionItem.copy();
					
					tariffVslOprConditionItem.set('seq', seq);
					tariffVslOprConditionItem.set('prptCd', 'C5');
					tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
					tariffVslOprConditionItem.set('chrVal', data);
					
					tariffConditionList.push(tariffVslOprConditionItem.getData());
					seq++;
				});
				
				tariffCargoConditionPrptItem.set('prcTpCd', 'S');
				tariffCargoConditionPrptItem.set('prptCd', 'C5');
				tariffCargoConditionPrptItem.set('prptNm', 'Shifting Type');
				tariffCargoConditionPrptItem.set('dataTpCd', 'CHAR');
				tariffCargoConditionPrptItem.set('dataLen', '2');
				
				tariffConditionPrptList.push(tariffCargoConditionPrptItem.getData());
			}else if (i==6){
				var itm = refs.txtWhType.getValue().split(',');
				var tariffCargoConditionPrptItem = tariffConditionPrptItem.copy();
				
				itm.forEach(function(data){
					var tariffVslOprConditionItem = tariffConditionItem.copy();
					
					tariffVslOprConditionItem.set('seq', seq);
					tariffVslOprConditionItem.set('prptCd', 'C6');
					tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
					tariffVslOprConditionItem.set('chrVal', data);
					
					tariffConditionList.push(tariffVslOprConditionItem.getData());
					seq++;
				});
				
				tariffCargoConditionPrptItem.set('prcTpCd', 'S');
				tariffCargoConditionPrptItem.set('prptCd', 'C6');
				tariffCargoConditionPrptItem.set('prptNm', 'W/H Type');
				tariffCargoConditionPrptItem.set('dataTpCd', 'CHAR');
				tariffCargoConditionPrptItem.set('dataLen', '2');
				
				tariffConditionPrptList.push(tariffCargoConditionPrptItem.getData());
			}else if (i==7){
				var itm = refs.txtCategoryType.getValue().split(',');
				var tariffCargoConditionPrptItem = tariffConditionPrptItem.copy();
				
				itm.forEach(function(data){
					var tariffVslOprConditionItem = tariffConditionItem.copy();
					
					tariffVslOprConditionItem.set('seq', seq);
					tariffVslOprConditionItem.set('prptCd', 'C7');
					tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
					tariffVslOprConditionItem.set('chrVal', data);
					
					tariffConditionList.push(tariffVslOprConditionItem.getData());
					seq++;
				});
				
				tariffCargoConditionPrptItem.set('prcTpCd', 'S');
				tariffCargoConditionPrptItem.set('prptCd', 'C7');
				tariffCargoConditionPrptItem.set('prptNm', 'Cargo Type');
				tariffCargoConditionPrptItem.set('dataTpCd', 'CHAR');
				tariffCargoConditionPrptItem.set('dataLen', '2');
				
				tariffConditionPrptList.push(tariffCargoConditionPrptItem.getData());
			}else if (i==8){
				var itm = refs.txtCommodityGroup.getValue().split( CommonConstants.COMMA );
				var tariffCargoConditionPrptItem = tariffConditionPrptItem.copy();
				
				itm.forEach(function(data){
					var tariffVslOprConditionItem = tariffConditionItem.copy();
					
					tariffVslOprConditionItem.set('seq', seq);
					tariffVslOprConditionItem.set('prptCd', 'C'+i);
					tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
					tariffVslOprConditionItem.set('chrVal', data);
					
					tariffConditionList.push(tariffVslOprConditionItem.getData());
					seq++;
				});
				
				tariffCargoConditionPrptItem.set('prcTpCd', 'S');
				tariffCargoConditionPrptItem.set('prptCd', 'C'+i);
				tariffCargoConditionPrptItem.set('prptNm', 'Commodity Group');
				tariffCargoConditionPrptItem.set('dataTpCd', 'CHAR');
				tariffCargoConditionPrptItem.set('dataLen', '10');
				
				tariffConditionPrptList.push(tariffCargoConditionPrptItem.getData());
			}else if (i==9){
				var itm = refs.txtCommodity.getValue().split(',');
				var tariffCargoConditionPrptItem = tariffConditionPrptItem.copy();
				
				itm.forEach(function(data){
					var tariffVslOprConditionItem = tariffConditionItem.copy();
					
					tariffVslOprConditionItem.set('seq', seq);
					tariffVslOprConditionItem.set('prptCd', 'C9');
					tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
					tariffVslOprConditionItem.set('chrVal', data);
					
					tariffConditionList.push(tariffVslOprConditionItem.getData());
					seq++;
				});
				
				tariffCargoConditionPrptItem.set('prcTpCd', 'S');
				tariffCargoConditionPrptItem.set('prptCd', 'C9');
				tariffCargoConditionPrptItem.set('prptNm', 'Commodity');
				tariffCargoConditionPrptItem.set('dataTpCd', 'CHAR');
				tariffCargoConditionPrptItem.set('dataLen', '10');
				
				tariffConditionPrptList.push(tariffCargoConditionPrptItem.getData());
			}else if (i==10){
				var itm = refs.txtPackageType.getValue().split(',');
				var tariffCargoConditionPrptItem = tariffConditionPrptItem.copy();
				
				itm.forEach(function(data){
					var tariffVslOprConditionItem = tariffConditionItem.copy();
					
					tariffVslOprConditionItem.set('seq', seq);
					tariffVslOprConditionItem.set('prptCd', 'C10');
					tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
					tariffVslOprConditionItem.set('chrVal', data);
					
					tariffConditionList.push(tariffVslOprConditionItem.getData());
					seq++;
				});
				
				tariffCargoConditionPrptItem.set('prcTpCd', 'S');
				tariffCargoConditionPrptItem.set('prptCd', 'C10');
				tariffCargoConditionPrptItem.set('prptNm', 'Package Type');
				tariffCargoConditionPrptItem.set('dataTpCd', 'CHAR');
				tariffCargoConditionPrptItem.set('dataLen', '6');
				
				tariffConditionPrptList.push(tariffCargoConditionPrptItem.getData());
			}else if (i==11){
				var itm = refs.txtDgClass.getValue().split(',');
				var tariffCargoConditionPrptItem = tariffConditionPrptItem.copy();
				
				itm.forEach(function(data){
					var tariffVslOprConditionItem = tariffConditionItem.copy();
					
					tariffVslOprConditionItem.set('seq', seq);
					tariffVslOprConditionItem.set('prptCd', 'C11');
					tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
					tariffVslOprConditionItem.set('chrVal', data);
					
					tariffConditionList.push(tariffVslOprConditionItem.getData());
					seq++;
				});
				
				tariffCargoConditionPrptItem.set('prcTpCd', 'S');
				tariffCargoConditionPrptItem.set('prptCd', 'C11');
				tariffCargoConditionPrptItem.set('prptNm', 'DG Class');
				tariffCargoConditionPrptItem.set('dataTpCd', 'CHAR');
				tariffCargoConditionPrptItem.set('dataLen', '1');
				
				tariffConditionPrptList.push(tariffCargoConditionPrptItem.getData());
			}else if (i==12){
				var itm = refs.txtModeOfOpr.getValue().split(',');
				var tariffCargoConditionPrptItem = tariffConditionPrptItem.copy();
				
				itm.forEach(function(data){
					var tariffVslOprConditionItem = tariffConditionItem.copy();
					
					tariffVslOprConditionItem.set('seq', seq);
					tariffVslOprConditionItem.set('prptCd', 'C12');
					tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
					tariffVslOprConditionItem.set('chrVal', data);
					
					tariffConditionList.push(tariffVslOprConditionItem.getData());
					seq++;
				});
				
				tariffCargoConditionPrptItem.set('prcTpCd', 'S');
				tariffCargoConditionPrptItem.set('prptCd', 'C12');
				tariffCargoConditionPrptItem.set('prptNm', 'Mode of OPR');
				tariffCargoConditionPrptItem.set('dataTpCd', 'CHAR');
				tariffCargoConditionPrptItem.set('dataLen', '2');
				
				tariffConditionPrptList.push(tariffCargoConditionPrptItem.getData());
			}else if (i==13){
				var tariffVslOprConditionItem = tariffConditionItem.copy();
				var tariffCargoConditionPrptItem = tariffConditionPrptItem.copy();
				var damagedValue = theDetail.get('damagedChk') == 'true' ? 'Y' : 'N';
				
				tariffVslOprConditionItem.set('seq', seq);
				tariffVslOprConditionItem.set('prptCd', 'C13');
				tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
				tariffVslOprConditionItem.set('chrVal', damagedValue);
				
				tariffConditionList.push(tariffVslOprConditionItem.getData());
				
				tariffCargoConditionPrptItem.set('prcTpCd', 'S');
				tariffCargoConditionPrptItem.set('prptCd', 'C13');
				tariffCargoConditionPrptItem.set('prptNm', 'Damaged');
				tariffCargoConditionPrptItem.set('dataTpCd', 'YN');
				tariffCargoConditionPrptItem.set('dataLen', '1');
				
				tariffConditionPrptList.push(tariffCargoConditionPrptItem.getData());
			}else if (i==14){
				var tariffVslOprConditionItem = tariffConditionItem.copy();
				var tariffCargoConditionPrptItem = tariffConditionPrptItem.copy();
				
				tariffVslOprConditionItem.set('seq', seq);
				tariffVslOprConditionItem.set('prptCd', 'C14');
				tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
				tariffVslOprConditionItem.set('chrVal', refs.cboOperationType.getValue());
				
				tariffConditionList.push(tariffVslOprConditionItem.getData());
				
				tariffCargoConditionPrptItem.set('prcTpCd', 'S');
				tariffCargoConditionPrptItem.set('prptCd', 'C14');
				tariffCargoConditionPrptItem.set('prptNm', 'Operation Type');
				tariffCargoConditionPrptItem.set('dataTpCd', 'YN');
				tariffCargoConditionPrptItem.set('dataLen', '2');
				
				tariffConditionPrptList.push(tariffCargoConditionPrptItem.getData());
			}else if (i==15){
				var tariffVslOprConditionItem = tariffConditionItem.copy();
				var tariffCargoConditionPrptItem = tariffConditionPrptItem.copy();
				
				tariffVslOprConditionItem.set('seq', seq);
				tariffVslOprConditionItem.set('prptCd', 'C15');
				tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
				tariffVslOprConditionItem.set('chrVal', refs.cboVehicle.getValue());
				
				tariffConditionList.push(tariffVslOprConditionItem.getData());
				
				tariffCargoConditionPrptItem.set('prcTpCd', 'S');
				tariffCargoConditionPrptItem.set('prptCd', 'C15');
				tariffCargoConditionPrptItem.set('prptNm', 'Vehicles');
				tariffCargoConditionPrptItem.set('dataTpCd', 'CHAR');
				tariffCargoConditionPrptItem.set('dataLen', '2');
				
				tariffConditionPrptList.push(tariffCargoConditionPrptItem.getData());
			}else if (i==16){
				// TODO :: Cargo Lift
				var tariffVslOprConditionItem = tariffConditionItem.copy();
				var tariffCargoConditionPrptItem = tariffConditionPrptItem.copy();
				
				if(refs.rdoOperator.checked){
					// Select Operator
					tariffVslOprConditionItem.set( 'seq', seq );
					tariffVslOprConditionItem.set( 'prptCd', 'C'+i );
					tariffVslOprConditionItem.set( 'oprIdtCd', refs.cboOperator.getValue() );
					tariffVslOprConditionItem.set( 'noVal', refs.txtCargoListOperatorNumber.getValue() );
					tariffVslOprConditionItem.set( 'chrVal', refs.cboMeasurementCondition.getValue() );
				}else if(refs.rdoFromTo.checked){
					// From To
					tariffVslOprConditionItem.set( 'seq', seq );
					tariffVslOprConditionItem.set( 'prptCd', 'C'+i );
					tariffVslOprConditionItem.set( 'oprIdtCd', 'EQ' );
					tariffVslOprConditionItem.set( 'tierVal1', refs.txtCargoListFrom.getValue() );
					tariffVslOprConditionItem.set( 'tierVal2', refs.txtCargoListTo.getValue() );
					tariffVslOprConditionItem.set( 'chrVal', refs.cboMeasurementCondition.getValue() );
				}
				
				tariffConditionList.push(tariffVslOprConditionItem.getData());
				
				if(refs.rdoOperator.checked){
					tariffCargoConditionPrptItem.set({
						 prcTpCd: 'S'
						,prptCd: 'C'+i
						,prptNm: 'Cargo List'
						,dataTpCd: 'NUMB'
						,dataLen: '4'
					});
				}else if(refs.rdoFromTo.checked){
					tariffCargoConditionPrptItem.set({
						prcTpCd: 'S'
					   ,prptCd: 'C'+i
					   ,prptNm: 'Cargo List'
					   ,dataTpCd: 'TIER'
					   ,dataLen: '5'
				   });
				}
				
				tariffConditionPrptList.push(tariffCargoConditionPrptItem.getData());
			} else if(i == 17){
				if(!refs.chkCargoNotToWeight.getHidden()){
					var tariffVslOprConditionItem = tariffConditionItem.copy();
					var tariffCargoConditionPrptItem = tariffConditionPrptItem.copy();
					var weightChkValue = theDetail.get('wgtChk') == 'true' ? 'N' : 'Y';
					
					tariffVslOprConditionItem.set('seq', seq);
					tariffVslOprConditionItem.set('prptCd', 'C17');
					tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
					tariffVslOprConditionItem.set('chrVal', weightChkValue);
					
					tariffConditionList.push(tariffVslOprConditionItem.getData());
					
					tariffCargoConditionPrptItem.set('prcTpCd', 'S');
					tariffCargoConditionPrptItem.set('prptCd', 'C17');
					tariffCargoConditionPrptItem.set('prptNm', 'WeightCheck');
					tariffCargoConditionPrptItem.set('dataTpCd', 'YN');
					tariffCargoConditionPrptItem.set('dataLen', '1');
					
					tariffConditionPrptList.push(tariffCargoConditionPrptItem.getData());
				}
			}
			
			seq++;
		}
		
		//equipment tab
		for(var i =1; i < 5; i++){
			if(i == 1){
				var tariffVslOprConditionItem = tariffConditionItem.copy();
				var tariffEquipConditionPrptItem = tariffConditionPrptItem.copy();
				
				tariffVslOprConditionItem.set('seq', seq);
				tariffVslOprConditionItem.set('prptCd', 'E1');
				tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
				tariffVslOprConditionItem.set('chrVal', refs.cboEquipmentType.getValue());
				
				tariffConditionList.push(tariffVslOprConditionItem.getData());
				
				tariffEquipConditionPrptItem.set('prcTpCd', 'S');
				tariffEquipConditionPrptItem.set('prptCd', 'E1');
				tariffEquipConditionPrptItem.set('prptNm', 'Equipment Type');
				tariffEquipConditionPrptItem.set('dataTpCd', 'CHAR');
				tariffEquipConditionPrptItem.set('dataLen', '2');
				
				tariffConditionPrptList.push(tariffEquipConditionPrptItem.getData());
			}else if(i == 2){
				var tariffVslOprConditionItem = tariffConditionItem.copy();
				var tariffEquipConditionPrptItem = tariffConditionPrptItem.copy();
				
				tariffVslOprConditionItem.set('seq', seq);
				tariffVslOprConditionItem.set('prptCd', 'E2');
				tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
				tariffVslOprConditionItem.set('chrVal', refs.cboEquipmentCapa.getValue());
				
				tariffConditionList.push(tariffVslOprConditionItem.getData());
				
				tariffEquipConditionPrptItem.set('prcTpCd', 'S');
				tariffEquipConditionPrptItem.set('prptCd', 'E2');
				tariffEquipConditionPrptItem.set('prptNm', 'Capacity');
				tariffEquipConditionPrptItem.set('dataTpCd', 'CHAR');
				tariffEquipConditionPrptItem.set('dataLen', '10');
				
				tariffConditionPrptList.push(tariffEquipConditionPrptItem.getData());
			}else if(i == 3){
				var itm = refs.txtWorkingArea.getValue().split(',');
				var tariffEquipConditionPrptItem = tariffConditionPrptItem.copy();
				
				itm.forEach(function(data){
					var tariffVslOprConditionItem = tariffConditionItem.copy();
					
					tariffVslOprConditionItem.set('seq', seq);
					tariffVslOprConditionItem.set('prptCd', 'E3');
					tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
					tariffVslOprConditionItem.set('chrVal', data);
					
					tariffConditionList.push(tariffVslOprConditionItem.getData());
					seq++;
				});
				
				tariffEquipConditionPrptItem.set('prcTpCd', 'S');
				tariffEquipConditionPrptItem.set('prptCd', 'E3');
				tariffEquipConditionPrptItem.set('prptNm', 'Working Area');
				tariffEquipConditionPrptItem.set('dataTpCd', 'CHAR');
				tariffEquipConditionPrptItem.set('dataLen', '2');
				
				tariffConditionPrptList.push(tariffEquipConditionPrptItem.getData());
			}else if(i == 4){
				var tariffVslOprConditionItem = tariffConditionItem.copy();
				var workingTimeValue = '';
				var tariffEquipConditionPrptItem = tariffConditionPrptItem.copy();
				
				if(refs.refRadio0717.getValue() == true){
					workingTimeValue = 'D';
				}else if(refs.refRadio1806.getValue() == true){
					workingTimeValue = 'N';
				}else if(refs.refRadio0717.getValue() == false && refs.refRadio1806.getValue() == false){
					workingTimeValue = '';
				}
				
				tariffVslOprConditionItem.set('seq', seq);
				tariffVslOprConditionItem.set('prptCd', 'E4');
				tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
				tariffVslOprConditionItem.set('chrVal', workingTimeValue);
				
				tariffConditionList.push(tariffVslOprConditionItem.getData());
				
				tariffEquipConditionPrptItem.set('prcTpCd', 'S');
				tariffEquipConditionPrptItem.set('prptCd', 'E4');
				tariffEquipConditionPrptItem.set('prptNm', 'Working Time');
				tariffEquipConditionPrptItem.set('dataTpCd', 'CHAR');
				tariffEquipConditionPrptItem.set('dataLen', '2');
				
				tariffConditionPrptList.push(tariffEquipConditionPrptItem.getData());
			}
			
			seq++;
		}
		
		//Other Tab
		for(var i = 1; i < 10; i++){
			if(i == 1){
				var itm = refs.txtStevedoreRole.getValue().split(',');
				var tariffOtherConditionPrptItem = tariffConditionPrptItem.copy();
				
				itm.forEach(function(data){
					var tariffVslOprConditionItem = tariffConditionItem.copy();
					
					tariffVslOprConditionItem.set('seq', seq);
					tariffVslOprConditionItem.set('prptCd', 'O1');
					tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
					tariffVslOprConditionItem.set('chrVal', data);
					
					tariffConditionList.push(tariffVslOprConditionItem.getData());
					seq++;
				});
				
				tariffOtherConditionPrptItem.set('prcTpCd', 'S');
				tariffOtherConditionPrptItem.set('prptCd', 'O1');
				tariffOtherConditionPrptItem.set('prptNm', 'Stevedore Role');
				tariffOtherConditionPrptItem.set('dataTpCd', 'CHAR');
				tariffOtherConditionPrptItem.set('dataLen', '2');
				
				tariffConditionPrptList.push(tariffOtherConditionPrptItem.getData());
			}else if(i == 2){
				var tariffVslOprConditionItem = tariffConditionItem.copy();
				var penaltyOnLateVal = '';
				var tariffOtherConditionPrptItem = tariffConditionPrptItem.copy();
				
				if(refs.radioDaysAfterAtu.getValue() == true){
					penaltyOnLateVal = 'D';
				}else if(refs.radioSubDay.getValue() == true){
					penaltyOnLateVal = 'S';
				}
				
				tariffVslOprConditionItem.set('seq', seq);
				tariffVslOprConditionItem.set('prptCd', 'O2');
				tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
				tariffVslOprConditionItem.set('chrVal', penaltyOnLateVal);
				
				tariffConditionList.push(tariffVslOprConditionItem.getData());
				
				tariffOtherConditionPrptItem.set('prcTpCd', 'S');
				tariffOtherConditionPrptItem.set('prptCd', 'O2');
				tariffOtherConditionPrptItem.set('prptNm', 'Penalty on Late Manifest');
				tariffOtherConditionPrptItem.set('dataTpCd', 'CHAR');
				tariffOtherConditionPrptItem.set('dataLen', '1');
				
				tariffConditionPrptList.push(tariffOtherConditionPrptItem.getData());
			}else if(i == 3){
				var tariffVslOprConditionItem = tariffConditionItem.copy();
				var days = '';
				var tariffOtherConditionPrptItem = tariffConditionPrptItem.copy();
				
				if(refs.radioDaysAfterAtu.getValue() == true){
					days = refs.txtDelayDaysOnSubmissionManifest.getValue();
				}else{
					days = '0';
				}
				
				tariffVslOprConditionItem.set('seq', seq);
				tariffVslOprConditionItem.set('prptCd', 'O3');
				tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
				tariffVslOprConditionItem.set('noVal', days);
				
				tariffConditionList.push(tariffVslOprConditionItem.getData());
				
				tariffOtherConditionPrptItem.set('prcTpCd', 'S');
				tariffOtherConditionPrptItem.set('prptCd', 'O3');
				tariffOtherConditionPrptItem.set('prptNm', 'Delay Day(s) on Submission of Manifest');
				tariffOtherConditionPrptItem.set('dataTpCd', 'NUMB');
				tariffOtherConditionPrptItem.set('dataLen', '2');
				
				tariffConditionPrptList.push(tariffOtherConditionPrptItem.getData());
			}else if(i == 4){
				var itm = refs.txtPenaltyStevedore.getValue().split(',');
				var tariffOtherConditionPrptItem = tariffConditionPrptItem.copy();
				
				itm.forEach(function(data){
					var tariffVslOprConditionItem = tariffConditionItem.copy();
					
					tariffVslOprConditionItem.set('seq', seq);
					tariffVslOprConditionItem.set('prptCd', 'O4');
					tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
					tariffVslOprConditionItem.set('chrVal', data);
					
					tariffConditionList.push(tariffVslOprConditionItem.getData());
					
					seq++;
				});
				
				tariffOtherConditionPrptItem.set('prcTpCd', 'S');
				tariffOtherConditionPrptItem.set('prptCd', 'O4');
				tariffOtherConditionPrptItem.set('prptNm', 'Penalty Type for Stevedore');
				tariffOtherConditionPrptItem.set('dataTpCd', 'CHAR');
				tariffOtherConditionPrptItem.set('dataLen', '3');
				
				tariffConditionPrptList.push(tariffOtherConditionPrptItem.getData());
			}else if(i == 5){
				var tariffVslOprConditionItem = tariffConditionItem.copy();
				var tariffOtherConditionPrptItem = tariffConditionPrptItem.copy();
				
				tariffVslOprConditionItem.set('seq', seq);
				tariffVslOprConditionItem.set('prptCd', 'O5');
				tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
				tariffVslOprConditionItem.set('chrVal', refs.cboUseOfWeigh.getValue());
				
				tariffConditionList.push(tariffVslOprConditionItem.getData());
				
				tariffOtherConditionPrptItem.set('prcTpCd', 'S');
				tariffOtherConditionPrptItem.set('prptCd', 'O5');
				tariffOtherConditionPrptItem.set('prptNm', 'Use of Weightbridge');
				tariffOtherConditionPrptItem.set('dataTpCd', 'CHAR');
				tariffOtherConditionPrptItem.set('dataLen', '1');
				
				tariffConditionPrptList.push(tariffOtherConditionPrptItem.getData());
			}else if(i == 6){
				var tariffVslOprConditionItem = tariffConditionItem.copy();
				var tariffOtherConditionPrptItem = tariffConditionPrptItem.copy();
				
				tariffVslOprConditionItem.set('seq', seq);
				tariffVslOprConditionItem.set('prptCd', 'O6');
				tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
				tariffVslOprConditionItem.set('tierVal1', refs.txtCargoStorageDaysFrom.getValue());
				tariffVslOprConditionItem.set('tierVal2', refs.txtCargoStorageDaysTo.getValue());
				
				tariffConditionList.push(tariffVslOprConditionItem.getData());
				
				tariffOtherConditionPrptItem.set('prcTpCd', 'S');
				tariffOtherConditionPrptItem.set('prptCd', 'O6');
				tariffOtherConditionPrptItem.set('prptNm', 'Cargo Storage Days');
				tariffOtherConditionPrptItem.set('dataTpCd', 'TIER');
				tariffOtherConditionPrptItem.set('dataLen', '5');
				
				tariffConditionPrptList.push(tariffOtherConditionPrptItem.getData());
			}else if(i == 7){
				var tariffVslOprConditionItem = tariffConditionItem.copy();
				var tariffOtherConditionPrptItem = tariffConditionPrptItem.copy();
				
				tariffVslOprConditionItem.set('seq', seq);
				tariffVslOprConditionItem.set('prptCd', 'O7');
				tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
				tariffVslOprConditionItem.set('tierVal1', refs.txtAccumulativeFrom.getValue());
				tariffVslOprConditionItem.set('tierVal2', refs.txtAccumulativeTo.getValue());
				
				tariffConditionList.push(tariffVslOprConditionItem.getData());
				
				tariffOtherConditionPrptItem.set('prcTpCd', 'S');
				tariffOtherConditionPrptItem.set('prptCd', 'O7');
				tariffOtherConditionPrptItem.set('prptNm', 'Accumulative tonnage for one year');
				tariffOtherConditionPrptItem.set('dataTpCd', 'TIER');
				tariffOtherConditionPrptItem.set('dataLen', '7');
				
				tariffConditionPrptList.push(tariffOtherConditionPrptItem.getData());
			}else if(i == 8){
				var tariffVslOprConditionItem = tariffConditionItem.copy();
				var tariffOtherConditionPrptItem = tariffConditionPrptItem.copy();
				var penLateValue = theDetail.get('penLate') == 'true' ? 'Y' : 'N';
				
				tariffVslOprConditionItem.set('seq', seq);
				tariffVslOprConditionItem.set('prptCd', 'O8');
				tariffVslOprConditionItem.set('oprIdtCd', 'DC');
				tariffVslOprConditionItem.set('chrVal', penLateValue);
				
				tariffConditionList.push(tariffVslOprConditionItem.getData());
				
				tariffOtherConditionPrptItem.set('prcTpCd', 'S');
				tariffOtherConditionPrptItem.set('prptCd', 'O8');
				tariffOtherConditionPrptItem.set('prptNm', 'Penalty on Late Submitsion Vessel Schedule');
				tariffOtherConditionPrptItem.set('dataTpCd', 'CHAR');
				tariffOtherConditionPrptItem.set('dataLen', '7');
				
				tariffConditionPrptList.push(tariffOtherConditionPrptItem.getData());
			}else if(i == 9){
				var tariffVslOprConditionItem = tariffConditionItem.copy();
				var tariffOtherConditionPrptItem = tariffConditionPrptItem.copy();
				var ssrYnValue = theDetail.get('ssrYn') == 'true' ? 'Y' : 'N';
				
				tariffVslOprConditionItem.set('seq', seq);
				tariffVslOprConditionItem.set('prptCd', 'O9');
				tariffVslOprConditionItem.set('oprIdtCd', 'EQ');
				tariffVslOprConditionItem.set('chrVal', ssrYnValue);
				
				tariffConditionList.push(tariffVslOprConditionItem.getData());
				
				tariffOtherConditionPrptItem.set('prcTpCd', 'S');
				tariffOtherConditionPrptItem.set('prptCd', 'O9');
				tariffOtherConditionPrptItem.set('prptNm', 'SSR Y/N');
				tariffOtherConditionPrptItem.set('dataTpCd', 'CHAR');
				tariffOtherConditionPrptItem.set('dataLen', '7');
				
				tariffConditionPrptList.push(tariffOtherConditionPrptItem.getData());
			}
			
			seq++;
		}
		
		//Service Order Tab
		for(var i = 1; i < 4; i++){
			if(i == 1){
				var tariffServiceoOrderConditionItem = tariffConditionItem.copy();
				var tariffServiceoOrderConditionPrptItem = tariffConditionPrptItem.copy();
				
				tariffServiceoOrderConditionItem.set('seq', seq);
				tariffServiceoOrderConditionItem.set('prptCd', 'S1');
				tariffServiceoOrderConditionItem.set('oprIdtCd', 'EQ');
				tariffServiceoOrderConditionItem.set('chrVal', refs.refCategory1FilterCombo.getValue());
				
				tariffConditionList.push(tariffServiceoOrderConditionItem.getData());
				
				tariffServiceoOrderConditionPrptItem.set('prcTpCd', 'S');
				tariffServiceoOrderConditionPrptItem.set('prptCd', 'S1');
				tariffServiceoOrderConditionPrptItem.set('prptNm', 'Catrgory 1');
				tariffServiceoOrderConditionPrptItem.set('dataTpCd', 'CHAR');
				tariffServiceoOrderConditionPrptItem.set('dataLen', '10');
				
				tariffConditionPrptList.push(tariffServiceoOrderConditionPrptItem.getData());
			}else if(i == 2){
				var tariffServiceoOrderConditionItem = tariffConditionItem.copy();
				var tariffServiceoOrderConditionPrptItem = tariffConditionPrptItem.copy();
				
				tariffServiceoOrderConditionItem.set('seq', seq);
				tariffServiceoOrderConditionItem.set('prptCd', 'S2');
				tariffServiceoOrderConditionItem.set('oprIdtCd', 'EQ');
				tariffServiceoOrderConditionItem.set('chrVal', refs.refCategory2FilterCombo.getValue());
				
				tariffConditionList.push(tariffServiceoOrderConditionItem.getData());
				
				tariffServiceoOrderConditionPrptItem.set('prcTpCd', 'S');
				tariffServiceoOrderConditionPrptItem.set('prptCd', 'S2');
				tariffServiceoOrderConditionPrptItem.set('prptNm', 'Catrgory 2');
				tariffServiceoOrderConditionPrptItem.set('dataTpCd', 'CHAR');
				tariffServiceoOrderConditionPrptItem.set('dataLen', '50');
				
				tariffConditionPrptList.push(tariffServiceoOrderConditionPrptItem.getData());
			}else if(i == 3){
				var tariffServiceoOrderConditionItem = tariffConditionItem.copy();
				var tariffServiceoOrderConditionPrptItem = tariffConditionPrptItem.copy();
				
				tariffServiceoOrderConditionItem.set('seq', seq);
				tariffServiceoOrderConditionItem.set('prptCd', 'S3');
				tariffServiceoOrderConditionItem.set('oprIdtCd', 'EQ');
				tariffServiceoOrderConditionItem.set('chrVal', refs.refCategory3FilterCombo.getValue());
				
				tariffConditionList.push(tariffServiceoOrderConditionItem.getData());
				
				tariffServiceoOrderConditionPrptItem.set('prcTpCd', 'S');
				tariffServiceoOrderConditionPrptItem.set('prptCd', 'S3');
				tariffServiceoOrderConditionPrptItem.set('prptNm', 'Catrgory 3');
				tariffServiceoOrderConditionPrptItem.set('dataTpCd', 'CHAR');
				tariffServiceoOrderConditionPrptItem.set('dataLen', '50');
				
				tariffConditionPrptList.push(tariffServiceoOrderConditionPrptItem.getData());
			}
			
			seq++;
		}
		
		tariffCodeItem.set('tariffConditionList', tariffConditionList);
		tariffCodeItem.set('tariffConditionPrptList', tariffConditionPrptList);
	},
	
	// Search Condition
	getSearchCondition:function(){
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		
		params['trfTpCd'] = StringUtil.toUpperCase(searchParm.get("trfTpCd"));
        params['costCntCd'] = StringUtil.toUpperCase(searchParm.get("costCntCd"));
        params['billTpCd'] = StringUtil.toUpperCase(searchParm.get("billTpCd"));
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();

		return params;
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		var theDetail = me.getViewModel().get('theDetail');
		
		if(targetControl === 'cboPurposeOfCall'){ 
			if(returnValue) {
				theDetail.set('purpCall', returnValue.code);
			}
		}else if (targetControl === 'cboVesselType'){
			if(returnValue) {
				theDetail.set('vslTp', returnValue.code);
			}
		}else if(targetControl === 'cboTradeType'){
			if(returnValue){
				theDetail.set('vslTradeTp', returnValue.code);
			}
		}else if(targetControl === 'txtCategory'){
			if(returnValue){
				theDetail.set('category', returnValue.code);
			}
		}else if(targetControl === 'txtCategoryType'){
			if(returnValue){
				theDetail.set('trfCgTp', returnValue.code);
			}
		}else if(targetControl === 'txtRehandle'){
			if(returnValue){
				theDetail.set('rehandle', returnValue.code);
			}
		}else if(targetControl === 'txtDelivery'){
			if(returnValue){
				theDetail.set('delvTpCd', returnValue.code);
			}
		}else if(targetControl === 'txtPackageType'){
			if(returnValue){
				theDetail.set('pkgTp', returnValue.code);
			}
		}else if(targetControl === 'txtTradeType'){
			if(returnValue){
				theDetail.set('cargoTradeTp', returnValue.code);
			}
		}else if(targetControl === 'txtDgClass'){
			if(returnValue){
				theDetail.set('dgClass', returnValue.code);
			}
		}else if(targetControl === 'txtShiftingType'){
			if(returnValue){
				theDetail.set('shftTp', returnValue.code);
			}
		}else if(targetControl === 'txtModeOfOpr'){
			if(returnValue){
				theDetail.set('oprMode', returnValue.code);
			}
		}else if(targetControl === 'txtWhType'){
			if(returnValue){
				theDetail.set('whTp', returnValue.code);
			}
		}else if(targetControl === 'txtWorkingArea'){
			if(returnValue){
				theDetail.set('workingArea', returnValue.code);
			}
		}else if(targetControl === 'txtStevedoreRole'){
			if(returnValue){
				theDetail.set('steveRole', returnValue.code);
			}
		}else if(targetControl === 'txtPenaltyStevedore'){
			if(returnValue){
				theDetail.set('paneltySteve', returnValue.code);
			}
		}else if(targetControl === 'txtCommodity'){
			if(returnValue){
				theDetail.set('cmdtCd', returnValue.code);
			}
		}else if(targetControl === 'txtCommodityGroup'){
			if(returnValue){
				theDetail.set('cmdtGrpCd', returnValue.code);
			}
		}
	},

	rgChange:function(item, newVal, oldVal){
		var me = this;
		var refs = me.getReferences();

		if(refs.radioSubDay.getValue() == true){
			refs.txtDelayDaysOnSubmissionManifest.setValue('');
		}
	},
	
	onChangeTariffType: function(){
		var me = this;
		var refs = me.getReferences();
		var theDetail = me.getViewModel().get('theDetail');
		
		refs.chkCargoNotToWeight.setHidden(theDetail.get('trfTpCd') == 'CH' ? false : true);
	}
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});