Ext.define('MOST.view.billing.ProofSheetController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.proofsheet',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	
	ADHOC_COMBO_STORE: 'adhocCombo',
	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create('MOST.model.billing.SearchProofSheetParm');
		var theDetail = Ext.create('MOST.model.billing.ProofSheet');
		var tariffTpCombo = me.getStore('tariffTpCombo');
		var templateCombo = me.getStore('templateCombo');
		var adhocCombo = me.getStore('adhocCombo');
		var costCenterCombo = me.getStore('costCenterComboOfPs');
		var prefixCombo = me.getStore('prefixCombo');
		var tariffStore = me.getStore('tariff');
		var ptnrRateStore = me.getStore('ptnrRateCombo');
		var taxTypeCombo = me.getStore('taxTypeCombo');
		var recvData = me.getView().recvData;
		
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch:searchParm});
		me.getViewModel().setData({theDetail:theDetail});
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.PROOFSHEET_ADHOC_COMBO, me.ADHOC_COMBO_STORE);
		
		tariffTpCombo.load();
		templateCombo.load();
		costCenterCombo.load();
		prefixCombo.load();
		ptnrRateStore.load();
		taxTypeCombo.load();
//		var currencyCombo = me.getStore('currencyCombo');
//		currencyCombo.load();
		
		if(recvData != null){
			if(recvData.vslCallId === CommonConstants.NON_CALL_ID){
				var payerCombo = me.getStore('payerCombo');
				
				payerCombo.load({
					params: {
						vslCallId : CommonConstants.NON_CALL_ID
					},
				});
				
				refs.ctlPayerCondition.setValue(recvData);
				refs.ctlVslCallId.setValue(recvData.vslCallId);
			}else{
				refs.ctlVslCallId.setValue(recvData.vslCallId);
			}
		}
		
		tariffStore.load({
			params: {
				searchTp: 'TRF_DATA'
			},
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						me.getViewModel().setData({theTariffAll:records});
					}
				}
			}
		});
		
		refs.refRefNo.setDisabled(true);
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
	},
	
	onComboTarrifTypeChange: function(){
		var me = this;
		var refs = me.getReferences();
		var tariffStore = me.getStore('tariff');
		
		tariffStore.load({
			params : {
				searchTp:'TRF_DATA',
				trfTpCd : refs.ctlTariffTp.getValue(),
			},
			callback:function(records, operation, success){
				if(success && records.length > 0){
					me.getViewModel().setData({theTariffByType:records});
					me.setCheckBoxTariff();
				}
			}
		});
	},
	
	onComboBoxChange:function(){
		var me = this;
		me.onSearch();
	},
	
	onChange : function(){
		var me = this;
		var refs = me.getReferences();
     	var ctlRefNo = refs.ctlRefNoCheck.getValue();
     	
     	refs.ctlPrefix.setDisabled(ctlRefNo);
 		refs.ctlCostCenter.setDisabled(ctlRefNo);
 		refs.ctlPartnerCodeType.setDisabled(ctlRefNo);
 		refs.refRefNo.setDisabled(!ctlRefNo);
	},
	
	exchangeRate:function(){
		var me = this;
		var refs = me.getReferences();
		var crcyCd = refs.ctlForeiqnCurrency.getValue();
		var exchange = me.getStore('exchange');
		
		if(crcyCd === 'Select'){
			refs.refExchangeRate.setValue('');
			refs.refApplyDate.setValue('');
			
			return;
		}
		
		exchange.load({
			params: {
				crcyCd : crcyCd
			},
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						refs.refExchangeRate.setValue(records[0].data.exchag);
						refs.refApplyDate.setValue(records[0].data.aplyDate);
					}
				}
			}
		});
	},
	
	onComboTemplateChange:function(){
		var me = this;
		var refs = me.getReferences();
		var templateVal = refs.ctlTemplate.getValue();
		var templateTrfStore = me.getStore('tariffByTemplate');
		var gatherStore = me.getStore('gathered');
		
		templateTrfStore.load({
			params:{
				searchTp:'TEMPLATE_CHANGED_MOD',
				templateCd: templateVal				
			},
			callback:function(records, operation, success){
				if(success && records.length > 0){
					me.getViewModel().setData({theTariffByTemplate:records});
					me.setCheckBoxTariff();
				}
			}
		});
		
		gatherStore.removeAll();
	},

	setCheckBoxTariff:function(){
		var me = this;
		var refs = me.getReferences();
		var subList = me.getViewModel().get('theTariffByTemplate');
		var trffStore = me.getStore('tariff');
		var grid = refs.refTariffGrid;
		
    	trffStore.each(function(record,index){
    		if(me.checkExistsTariff(subList, record.data.trfCd, record.data.subTrfCd)){
    			record.data.trfCheck = true;
    		}else{
    			record.data.trfCheck = false;
    		}
		});
    	
    	trffStore.clearFilter();
    	grid.getView().refresh();
	},
	
	checkExistsTariff:function(subList, tariff, subTariff){
		for(var i = 0; i < subList.length; i++){
			if(tariff === subList[i].data.trfCd && subTariff === subList[i].data.subTrfCd){
				return true;
			}
		}
		
		return false;
	},
	
	onCboVatCdSelect: function(ele, rec, idx){
		var me = this;
		var refs = me.getReferences();
		var theDetail = me.getViewModel().get('theDetail');
		
		theDetail.set('taxValue', rec.get('scdNm'));
	},
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	
	// Search Event Handler
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore('gathered');
//    	var checkForeignExchangeRateStore = me.getStore('checkForeignExchangeRate');
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
     	
     	if(StringUtil.isNullorEmpty(params.vslCallId) && StringUtil.isNullorEmpty(params.scn)) {
     		MessageUtil.warning("ProofSheet", "goodsreceipt_jpvc_input_msg");
    		return;
     	} else {
     		if(StringUtil.isNullorEmpty(params.template)){
     			MessageUtil.warning("ProofSheet", "proofSheet_template_choose_msg");
        		return;
     		}
     	}
    	
    	store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						me.loadCombo(records[0].data);
						me.displayDataWithTemplate();
					}else{
						MessageUtil.noMatchData();
					}
				}
			}
		});
    	
//		checkForeignExchangeRateStore.load({
//			callback: function(records, operation, success) {
//				if (success) {
//					if (records.length > 0 && records[0].data.exchag == 0) {
//						MessageUtil.warning("ProofSheet", "checkForeignExchangeRate");
//					}else{
//						store.load({
//							params: params,
//							callback: function(records, operation, success) {
//								if (success) {
//									if (records.length > 0) {
//										me.loadCombo(records[0].data);
//										me.displayDataWithTemplate();
//									}else{
//										MessageUtil.noMatchData();
//									}
//								}
//							}
//						});
//					}
//				}
//			}
//		});
		
		//me.exchangeRate();
	},
	
	displayDataWithTemplate:function(){
		var me = this;
     	var refs = me.getReferences();
     	var grid = refs.refGatheredGrid;
    	var store = me.getStore('gathered');
    	var subList = me.getViewModel().get('theTariffByTemplate');
    	var indexes = [], i = 0;
    	
    	store.each(function(record,index){
    		if(!me.checkExistsTariff(subList,record.data.tariffCode,record.data.subTariffCode)){
    			//store.remove(record);
    			indexes[i++] = index;
    		}
    	});
    	
    	store.remove(indexes);
    	grid.getView().refresh();
	},
	
	loadCombo:function(masterItem){
		var me = this;
		var payerCombo = me.getStore('payerCombo');
		var refNoCombo = me.getStore('refNoCombo');
		var costCenterCombo = me.getStore('costCenterComboOfPs');
		var proofSheetUserRefNoCombo = me.getStore('proofSheetUserRefNoCombo');
		var proofSheetSubBlSNNoCombo = me.getStore('proofSheetSubBlSNNoCombo');
		
		payerCombo.load({
			params: {
				vslCallId : masterItem.vslCallId	
			}
		});
		
		refNoCombo.load({
			params: {
				vslCallId : masterItem.vslCallId	
			}
		});
		
		proofSheetUserRefNoCombo.load({
			params: {
				vslCallId: masterItem.vslCallId
			}
		});
		
		proofSheetSubBlSNNoCombo.load({
			params: {
				vslCallId: masterItem.vslCallId
			}
		});
		
		costCenterCombo.load({
			params: {
				vslCallId : masterItem.vslCallId	
			}
		});
	},
	
	getSearchCondition:function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore('gathered');
     	var grid = refs.refGatheredGrid;
     	var vslCallId = refs.ctlVslCallId.getValue();
     	var scn = refs.ctlScn.getValue();
     	var template = refs.ctlTemplate.getValue();
     	var tariffTypeCd = refs.ctlTariffType.getValue();
     	var crcyCd = refs.ctlForeiqnCurrency.getValue();
     	var pageNo = store.currentPage;
     	var sizePerPage = CommonConstants.PAGE_SIZE;
     	
     	var searchParm = me.getViewModel().get('theSearch');
     	var params = {
			vslCallId : vslCallId,
			scn : scn,
			payer : StringUtil.toUpperCase(searchParm.get('payer')),
			tariffTypeCd : StringUtil.toUpperCase(searchParm.get('tariffTypeCd')),
			costCenterCd : StringUtil.toUpperCase(searchParm.get('costCenterCd')),
			refNo : StringUtil.toUpperCase(searchParm.get('refNo')),
			crcyCd : StringUtil.toUpperCase(searchParm.get('crcyCd')),
			adhoc : StringUtil.toUpperCase(searchParm.get('adhoc')),
			userRefNo: StringUtil.toUpperCase(searchParm.get("userRefNo")),
    		cgNo: StringUtil.toUpperCase(searchParm.get("cgNo")),
			pageNo: pageNo,
			sizePerPage:sizePerPage,
			sort:grid.getSortString(),
			template: template
		};
     	
     	return params;
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		var theSearch = me.getViewModel().get('theSearch');
		
		if(targetControl == 'ctlVslCallId'){ 
			if(returnValue){
				refs.ctlScn.setValue(returnValue.item.get('scn'));
				me.getViewModel().setData({theJpvc:returnValue.item});
			} else {
				me.getViewModel().setData({theJpvc:null});
			}
			//me.exchangeRate();
		} else if(targetControl == 'ctlPartnerCodeType'){
			if(returnValue){
				theSearch.set('payerName', returnValue.item.get('ptnrName'));
				theSearch.set('payerType', returnValue.item.get('ptnrType'));
			}
		} else if(targetControl === 'ctlScn'){ 
			if(returnValue){
				refs.ctlScn.setValue(returnValue.code);

				if(!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))){
					refs.ctlVslCallId.setValue(returnValue.item.get('vslCallId'));
					me.getViewModel().setData({theJpvc:returnValue.item});
					me.onSearch();
				}else {
					refs.ctlVslCallId.setValue('');
					me.getViewModel().setData({theJpvc:null});
				}
			} 
		}
	},
	
	openPartnerCdTypePopup:function(){
		var me = this;
		var params = {
			searchModule: CodeConstants.LCD_MOST
		};
		
		me.openCodePopup('popup-partnercdtypepopup', 'ctlPartnerCodeType', params);
	},
	
	onChecked : function (model, record, index, eOpts) {
		if(record.data.itChk){
			record.data.itChk=false;
		} else{
			record.data.itChk=true;
		}
    },
	
	onCellClick:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refGatheredGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		me.getViewModel().setData({theDetail:selection});
		
		if(selection == null) {
			return;
		}
		
		var theDetail = me.getViewModel().get('theDetail');
		
		theDetail.set('prefix', selection.get("prefix"));
		theDetail.set('costCenter', selection.get("costCentreCode"));
		theDetail.set('payerCd', selection.get("payer"));
		theDetail.set('payerName', selection.get("payerName"));
		theDetail.set('cgNo', selection.get("cgNo"));
		theDetail.set('userRefNo', selection.get("userRefNo"));
		theDetail.set('prefix', selection.get("prefix"));
		theDetail.set('taxType', selection.get("gstType"));
		theDetail.set('taxValue', selection.get("gstValue"));
	},
	
	onDblClick:function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = {
			vslCallId: refs.ctlVslCallId.getValue()
		};
		
		me.loadMenuView('app-datagatheringdetail',recvData);
	},
	
	onVerify:function(){
		var me = this;
		var store = me.getStore('gathered');
		var refs = me.getReferences();
		var grid = me.lookupReference('refGatheredGrid');
		var model = Ext.create('MOST.model.billing.ProofSheet');
		var selectedGrid = false;
		var valid = true;
		var flag= true;
		
		store.each(function(record,index){
			if(record.data.itChk){
				record.data.statusCd = CodeConstants.MT_IVSTAT_VF;
				record.data.status = 'Verified';
			}
		});
		
		MessageUtil.question('Verify', 'Do you want to verify these data?', null,
			function(button){
				if (button === 'ok') {
					me.onSave();
				}
			});
	},
	
	onUnverify:function(){
		var me = this;
		var store = me.getStore('gathered');
		var refs = me.getReferences();
		var grid = me.lookupReference('refGatheredGrid');
		var model = Ext.create('MOST.model.billing.ProofSheet');
		var selectedGrid = false;
		var valid = true;
		
		store.each(function(record,index){
			if(record.data.itChk){
				record.data.statusCd = CodeConstants.MT_IVSTAT_GT;
				record.data.status = 'Gathered';
				
			}
		});
		
		MessageUtil.question('Verify', 'Do you want to unverify these data?', null,
			function(button){
				if (button === 'ok') {
					me.onSave();
				}
			});		
	},
	
	onUpdate:function(){
		var me = this;
		var store = me.getStore('gathered');
		var ptnrRateStore = me.getStore('ptnrRateCombo');
		var refs = me.getReferences();
		var grid = me.lookupReference('refGatheredGrid');
		var selections = grid.getSelection() == null ? null: grid.getSelection();
		var model = Ext.create('MOST.model.billing.ProofSheet');
		var selectedGrid = false;
		var valid = true;
		var version = Ext.Date.format(new Date(), 'Y-m-d H:i:s.u');
		var theModel = me.getViewModel().get('theSearch');
		var theDetail = me.getViewModel().get('theDetail');
		
		if(selections == null){
			return;
		}
		
		for(record of selections) {
			if(record.get('statusCd') != CodeConstants.MT_IVSTAT_GT){
				continue;
			}
			
			if(theDetail.get('prefix') != null && theDetail.get('prefix') != ""){
				record.set('prefix', theDetail.get('prefix'));
			}
			
			if(theDetail.get('costCenter') != null && theDetail.get('costCenter') != ""){
				record.set('costCentreCode', theDetail.get('costCenter'));
			}
			
			if(theDetail.get('payerCd') != null && theDetail.get('payerCd') != ""){
				record.set('payer', theDetail.get('payerCd'));
				record.set('payerName', theDetail.get('payerName'));
			}
			
			if(theDetail.get('refNo') === true){
				record.set('isUpdateRefNo','Y');
			}
			
			if(theDetail.get('taxType') != null){
				record.set('gstType', theDetail.get('taxType'));
				record.set('gstValue', theDetail.get('taxValue'));
				
				var temp = (Number(record.get('aplyAmt'))*(Number(theDetail.get('taxValue'))/100)).toFixed(5);
				var temp1 = temp.split('.')[0];
				var temp2 = '.' + temp.split('.')[1];
				
				for(var i = temp2.length -1; i >= 0; i--){
					if(temp2[i] == '0'){
						if(temp2[i-1] == '0'){							
							temp2 = temp2.replace(temp2[i], '')
						}else{
							temp2 = temp2.replace(temp2[i], '')
							break;
						}
					}
				}
				
				if(temp2 == '.'){
					temp2 = temp2.replace('.', '');
				}
				
				var taxAmount = temp1 + temp2;
				
				record.set('gstAmt', taxAmount);
				record.set('totalAmt', Number(record.get('aplyAmt'))+Number(record.get('gstAmt')));
			}
			
			for(ptnrRate of ptnrRateStore.data.items){
				if(record.get('payer') == ptnrRate.get('payer')
						&& record.get('tariffCode') == ptnrRate.get('tariffCode') 
						&& record.get('subTariffCode') == ptnrRate.get('subTariffCode')){
					record.set({
						aplyRate: ptnrRate.get('ptnrRate')
					});
					break;
				}
			}
		}
	},
	
	onSave:function(){
    	var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore('gathered');
		var arrItems = new Array();
		var grid = me.lookupReference('refGatheredGrid');
		var masterItem = Ext.create('MOST.model.billing.ProofSheet');
		var flag=true;
		var params = me.getSearchCondition();
		
    	if(params == null){
    		return;
    	}
    	
		store.each(function(record,index){
			if(record.data.itChk){
				record.set('userId', MOST.config.Token.getUserId());
				arrItems.push(record.data);
			}
		});
		
		if(flag == false){
			MessageUtil.warning("ProofSheet",'proofSheet_include_SSR');
			return;
		}
		
		if(masterItem.dirty||arrItems.length>0){
			var proxy = masterItem.getProxy();
			proxy.url=store.getProxy().url;
			
			masterItem.set("items",arrItems);
			masterItem.phantom = false;
			masterItem.save({
				success:function(){
					store.load({
						params: params,
						callback: function(records, operation, success) {
							if (success) {
								MessageUtil.saveSuccess();
								me.displayDataWithTemplate();
							}
						}
					});
				}
			});
		}else{
			MessageUtil.warning("proofSheet", "proofSheet_nodata_save_msg");
			return;
		}
	},
	
	onProofSheetPreview:function(){
		var me = this;
		var refs = me.getReferences();
		var generatePDFProofSheet = me.getStore('generatePDFProofSheet');
		var params = me.getSearchCondition();
		var gathered = me.getStore('gathered');
		var grid = me.lookupReference('refGatheredGrid');
		var noList = '';
		var arrItems = grid.getSelection() === null ? null : grid.getSelection();
		
		for(var i =0; i < arrItems.length; i++){
			if(arrItems[i].get('statusCd') == CodeConstants.MT_IVSTAT_VF){
				if(noList == ''){
					noList = arrItems[i].get('rowNum');
				} else {
					noList = noList + "," + arrItems[i].get('rowNum');
				}
			}
		}
		
		params['noList'] = noList;
		
		if(gathered.getData().items.length == 0){
			MessageUtil.warning("ProofSheet", "proofSheet_empty_data");
    		return;
		}
		
		generatePDFProofSheet.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					me.openPDFPreview (records, operation, success);
				}
			}
		})
	},
	
	onProofSheetExport:function(){
		var me = this;
		var refs = me.getReferences();
		var generatePDFProofSheet = me.getStore('generatePDFProofSheet');
		var params = me.getSearchCondition();
		var gathered = me.getStore('gathered');
		var grid = me.lookupReference('refGatheredGrid');
		var noList = '';
		var arrItems = grid.getSelection() === null ? null : grid.getSelection();
		
		for(var i =0; i < arrItems.length; i++){
			if(arrItems[i].get('statusCd') == CodeConstants.MT_IVSTAT_VF){
				if(noList == ''){
					noList = arrItems[i].get('rowNum');
				} else {
					noList = noList + "," + arrItems[i].get('rowNum');
				}
			}
		}
		
		params['noList'] = noList;
		
		if(gathered.getData().items.length == 0){
			MessageUtil.warning("ProofSheet", "proofSheet_empty_data");
    		return;
		}
		
		generatePDFProofSheet.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					var content = records[0].data.content.replace(/&lt;/gi,'<').replace(/&gt;/gi,'>');
		        	Ext.exporter.File.saveBinaryAs(content, records[0].data.fileName);
				}
			}
		})
	},
});