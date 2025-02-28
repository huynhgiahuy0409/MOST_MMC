Ext.define('MOST.view.planning.RentalInfoController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.rentalinfo',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAX_PERIOD_DAY : 31,	// MAX PERIOD DATE
	MAX_DATE_ALLOW : 90,
	FORWARDER : "FWD",				
	SHIPPING_AGENCY : "SHA",
	alertYN : 'N',
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
		
		var recvData = me.getView().recvData;
		
		if(recvData != null){
			me.alertYN = 'Y';
	     	me.onSearch();
		}
		
		//me.setDateInDays('ctlFromDt', -30);
		//me.setDateInDays("ctlToDt", 0);
	},
	
	onDateChange:function( control, newValue, oldValue, eOpts ) {
		var me = this;
		var refs = me.getReferences();
		
		if(control == refs.ctlFromDt){
			me.setDateInDaysByDate("ctlToDt", me.MAX_DATE_ALLOW, control.getValue());
		} else {
			me.setDateInDaysByDate("ctlFromDt", -me.MAX_DATE_ALLOW, control.getValue());
		}
	},
	
	onRefresh : function(controlName){
		var me = this;
		me.refreshControl(controlName);
	},
	
	onRemove: function(){
		var me = this;
     	var refs = me.getReferences();

		var grid = me.lookupReference('refRentalInfoGrid');
    	var store = me.getStore('rentalList');
    	var rentalStore = me.getStore('rentalList');
    	var rentalDtlStore = me.getStore('rentalDetailList');
    	
		var selections = grid.getSelection() == null ? null : grid.getSelection();

		if(selections == null) return;
		
		me.gridRemoveRow(grid, store, function(){
			MessageUtil.saveSuccess(); 
	    });
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
	onSearchBtn: function() {
		var me = this;
     	me.alertYN = 'N';
     	me.onSearch();
	},
	
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var params = me.getSearchCondition();
    	me.rentalStoreLoad(params, false);
	},
	
	rentalStoreLoad: function(params, isDetail){
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore('rentalMaster');
    	var rentalStore = me.getStore('rentalList');
    	var rentalDtlStore = me.getStore('rentalDetailList');
    	if(params == null){
    		return;
    	}
    	
    	store.load({
    		params: params
    	});
    	
    	rentalStore.load({
    		params: params
    	});

    	rentalDtlStore.load({
    		params: params
    	});
    	
//		store.load({
//			params: params,
//			callback: function(records, ope, success){
//				if(success){
//					rentalStore.setData(records[0].get('rentalList'));
//					me.getViewModel().setData({theRentalList:records[0].get('rentalList')});
//					rentalDtlStore.setData(records[0].get('rentalDetailList'));
//					me.getViewModel().setData({theRentalDtlList:records[0].get('rentalDetailList')});
//					if(isDetail){
//						me.onDetailLoad();
//					}
//				}
//			}
//		});
	},
	
	// Grid Row Double
	onDblClick: function() {
		var me = this;
		var grid = me.lookupReference('refRentalInfoGrid');

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		selection.set('workingStatus', WorkingStatus.UPDATE);
		
		me.openDetailPopup(selection, 'Warehouse Rental');
	},
	
		
	// JPVC OPEN POPUP
	openJpvcPopup:function(){
		var me = this;
		me.openCodePopup('popup-vesselfindpopup', 'ctlJpvc');
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
		
		var term = refs.refTermCb.getValue();
		var tenant = refs.refTenantTxt.getValue();
		var peFromDate = refs.ctlDateFromDtRental.getValue() == null? null : refs.ctlDateFromDtRental.getValue();
    	var peToDate = refs.ctlDateToDtRental.getValue() == null ? null : refs.ctlDateToDtRental.getValue();
    	var stringFromDate = peFromDate==null?null:Ext.Date.format(peFromDate, MOST.config.Locale.getShortDate());
    	var stringToDate = peToDate==null?null:Ext.Date.format(peToDate, MOST.config.Locale.getShortDate());
    	var expireChk = refs.chkbExpired.getValue();
    	var locId = refs.refWHCb.value == null ? refs.refWHCb.getRawValue() : refs.refWHCb.getValue();
    	var validChk = '';
    	if(refs.chkbValid.getValue() == true){
    		validChk = 'Y'
    	}else{
    		validChk = 'N'
    	}
    	if(refs.chkbExpired.getValue() == true){
    		expireChk = 'Y'
    	}else{
    		expireChk = 'N'
    	}
    
    	var fromOrTo = refs.refPeriodCb.getValue();
     	var params = {
     			rentTpCd: term,
     			tenant: tenant,
     			vldYn: validChk,
     			expiredYn: expireChk,
     			alertYn: me.alertYN,
     			locId: locId
     	};
     	if(fromOrTo === 'FROM'){
     		params['fmStYmd'] = stringFromDate;
     		params['fmEndYmd'] = stringToDate;
     	}else{
     		params['toStYmd'] = stringFromDate;
     		params['toEndYmd'] = stringToDate;
     	}
     	
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
	
	// Grid Edit
	onEditVesselInfo : function(editor, context){
		context.record.data.workingStatus = context.record.crudState;
	},
	
	onCancelEditVesselInfo:function(rowEditing, context) {
		var me = this;
		me.gridCancelEdit(rowEditing, context);
	},
	
	// Grid Edit
	onEditCommodityInfo : function(editor, context){
		context.record.data.workingStatus = context.record.crudState;
	},
	
	onCancelEditCommodityInfo:function(rowEditing, context) {
		var me = this;
		me.gridCancelEdit(rowEditing, context);
	},
	
	// Detail Load
	onDetailLoad:function(){
		var me = this;
		var detailView = me.getDetailBizView();
//        me.configureToolButtons(recvData);
        me.configureToolButtons();
		me.setDetailInitialize();
	},
	
	// Detail Initialize
	setDetailInitialize:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		
		this.setDetailControl(recvData);
	},
	
    configureToolButtons: function(){
        var me = this;
        var bizView = me.getDetailBizView();
//        me.visibleDetailToolButton(ViewUtil.TOOL_DELETE, me.isUpdateDetail());
//        me.visibleDetailToolButton(ViewUtil.TOOL_PREVIEW, me.isUpdateDetail());
//        me.visibleDetailToolButton(ViewUtil.TOOL_DOWNLOAD, me.isUpdateDetail());
        me.visibleDetailToolButton(ViewUtil.TOOL_SAVE, true);
    },
	
	onSelectFontColor: function(picker, selColor) {
		var me = this;
     	var refs = me.getReferences();
     	var rentalStore = me.getStore('rentalList');
     	var rentalList = rentalStore.findRecord('conttNo',refs.refRenTalNo.getValue());
     	var whrColorListStore = me.getStore('whrColorList');
		var sColor = "#"+selColor;
		refs.ctlBtnFontColor.setStyle({"background-color":sColor});
		refs.ctlBtnFontColor.hideMenu();
		rentalList.set('fontColr', selColor);
		me.getViewModel().setData({theFontColor:rentalList});
    },
    
    onSelectLineColor: function(picker, selColor) {
		var me = this;
     	var refs = me.getReferences();
     	var rentalStore = me.getStore('rentalList');
     	var rentalList = rentalStore.findRecord('conttNo',refs.refRenTalNo.getValue());
		var sColor = "#"+selColor;
		refs.ctlBtnLineColor.setStyle({"background-color":sColor});
		refs.ctlBtnLineColor.hideMenu();
		rentalList.set('lineColr', selColor);
		me.getViewModel().setData({theLineColor:rentalList});
    },
    
	setDetailControl:function(recvData){
		var me = this;
		var refs = me.getReferences();
		var rentalItems = me.getViewModel().get('theRentalDtlList');
		if(recvData != null && recvData != '' && recvData.get(WorkingStatus.FIELD_NAME) != WorkingStatus.INSERT){
			var rentalDtlStore = me.getStore('rentalDetailList');
			if(rentalDtlStore.loadCount <= 0){
				rentalDtlStore.load();
			}else{
				var rentalDtl = rentalDtlStore.queryBy('rentNo', recvData.data.refNo);
				if(rentalDtl.length > 0){
//					var stLoc = rentalDtl.items[0].get('cdVal');
					var stLoc = '';
					var locationNo = 0;
					rentalDtl.items.forEach(function(el){
                        if (el.get('itemDivCd') == 'LO'){
                        	if (locationNo == 0){
                        		stLoc = el.get('cdVal')
                        	}
                        	locationNo += 1;
                        }
					})
					var whIdStr = stLoc.substring(0, stLoc.lastIndexOf("-"));
					whIdStr = whIdStr + "(" + stLoc.substring(stLoc.lastIndexOf("-")+1, stLoc.length) + "," + locationNo + ")";
					refs.refWareHouse.setValue(whIdStr);
				}
			}
			
			var whrVesselListStore = me.getViewModel().getStore('whrVesselList');
			whrVesselListStore.removeAll();
			var i = 0;
			rentalDtlStore.queryBy(function(rec, id){
				if(rec.get('itemDivCd') == 'VS' && rec.get('rentNo') == recvData.data.refNo){
					whrVesselListStore.insert(i,rec);
					i++
				}
			})
			
			var whrCommodityListStore = me.getViewModel().getStore('whrCommodityList');
			whrCommodityListStore.removeAll();
			var i = 0;
			rentalDtlStore.queryBy(function(rec, id){
				if(rec.get('itemDivCd') == 'CM' && rec.get('rentNo') == recvData.data.refNo){
					whrCommodityListStore.insert(i,rec);
					i++
				}
			})
			
			var whrLocListStore = me.getViewModel().getStore('whrLocList');
			whrLocListStore.removeAll();
			var i = 0;
			rentalDtlStore.queryBy(function(rec, id){
				if(rec.get('itemDivCd') == 'LO' && rec.get('rentNo') == recvData.data.refNo){
					whrLocListStore.insert(i,rec);
					i++
				}
			})
			
			refs.refRenTalNo.setValue(recvData.data.conttNo);
			refs.refRefNo.setValue(recvData.data.refNo);
			refs.refValidYn.setValue(recvData.data.vldYn);
			refs.refTerm.setValue(recvData.data.rentTpCd);
			refs.refTenantTxt.setValue(recvData.data.tnnt);
			refs.refTenantNmTxt.setValue(recvData.data.tnntNm);
			refs.ctlDateFromDtRental.setValue(recvData.data.fmYmd);
			refs.ctlDateToDtRental.setValue(recvData.data.toYmd);
//			refs.refWareHouse.setValue(recvData.data.locId);
			refs.refArea.setValue(recvData.data.area);
			refs.refRentalRate.setValue(recvData.data.unitPrice);
			refs.refRentalCalculation.setValue(recvData.data.prdTpCd);
			refs.refRentUnit.setValue(recvData.data.rentUnit);
			refs.refUseTpCd.setValue(recvData.data.useTpCd);
			refs.refRemark.setValue(recvData.data.rmk);
			refs.refContractorCd.setValue(recvData.data.conttr);
			refs.refContractorNm.setValue(recvData.data.conttrNm);
			refs.refPayerCd.setValue(recvData.data.payer);
			refs.refPayerNm.setValue(recvData.data.payerNm);
			refs.refFreeStorageDays.setValue(recvData.data.freeStrgDays);
			refs.refPayTpCd.setValue(recvData.data.payTpCd);
			refs.refAmount.setValue(recvData.data.rentCalAmt);
			
			refs.refRenTalNo.setEditable(false);
			refs.refRenTalNo.setFieldStyle('background-Color: #E8D4F7;');
			refs.refBtnDuplication.setDisabled(true);
		}else{
			refs.refRenTalNo.setFieldStyle('background-Color: #ffff80;');
		}
	},
	
    setInitialize: function(){
    	var me = this;
     	var refs = me.getReferences();
     	var whConfigurationListStore = me.getStore('whConfigurationList');
     	
     	var locArea = refs.refWareHouse.getValue();
     	var whId = locArea.substr(0, locArea.indexOf("(",0));
     	var locId = locArea.substr(0, locArea.indexOf("(",0)) + '-' + locArea.substring(locArea.indexOf("(",0)+1, locArea.indexOf(",",0));
     	
     	whConfigurationListStore.load({
     		params : {
     			whId : whId,
     			locId : locId,
     			locDivCd : 'CEL'
     		},
     		callback: function(records, operation, success) {
     			if (success) {
     				if (records.length > 0) {
     					var totDims = records[0].data.totDims;
     					var locCnt = 0;
     					if(locArea.indexOf(",",0) > 0 && locArea.indexOf(")",0) > 0) {
     						locCnt = locArea.substring(locArea.indexOf(",",0)+1, locArea.indexOf(")",0));
     					}
     					refs.refArea.setValue(totDims * locCnt);
     				}
     			}
     		}
     	});
     	
    },
	
	// Toolbar Save Button
	onDetailSave:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		
		if(detailView){
			var infoForm = detailView.down('form').getForm();
			
			if(infoForm.isValid()){
				MessageUtil.question('Warehouse Rental', 'whr_save_message',null,
						function(button){
							if (button === 'ok') {
								me.saveProcess();
					        }else if(button === 'cancel'){
					        	
					        };
						}
				);
			} else {
				MessageUtil.mandatoryFieldInValid();
			}
		}
	},
	
	saveProcess:function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('rentalMaster');
		var detailItem = Ext.create('MOST.model.planning.RentalInfo');
		var sendArray = new Array();
		var whrVesselListStore = me.getStore('whrVesselList');
		var whrCommodityListStore = me.getStore('whrCommodityList');
		var whrLocListStore = me.getViewModel().getStore('whrLocList');
		var rentalDtlStore = me.getStore('rentalDetailList');
		var theTenant = me.getViewModel().get('theTenant');
		var rentalStore = me.getStore('rentalList');
		var rentalList = rentalStore.findRecord('conttNo', refs.refRenTalNo.getValue());
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var theRentalList = me.getViewModel().get('theRentalList');
		
		var fromDtRental = refs.ctlDateFromDtRental.getValue();
		var toDtRental = refs.ctlDateToDtRental.getValue();
		
		var fmYmd = fromDtRental ==null?null:Ext.Date.format(fromDtRental, MOST.config.Locale.getShortDate());
		var toYmd = toDtRental==null?null:Ext.Date.format(toDtRental, MOST.config.Locale.getShortDate());
		
		detailItem.set("conttNo",refs.refRenTalNo.getValue());
		detailItem.set("refNo",refs.refRefNo.getValue());
		detailItem.set("vldYn",refs.refValidYn.getValue());
		detailItem.set("rentTpCd",refs.refTerm.getValue());
		detailItem.set("tnnt",refs.refTenantTxt.getValue());
		detailItem.set("locId",refs.refWareHouse.getValue().substring(0, refs.refWareHouse.getValue().lastIndexOf("(")));
//		detailItem.set("tnnt",refs.refTenantNmTxt.getValue());
		if(theTenant != null){
			detailItem.set("tnntTpCd",theTenant.get('ptnrType'));
		}else{
			detailItem.set("tnntTpCd",rentalList.get('tnntTpCd'));
		}
		detailItem.set("fmYmd",fmYmd);
		detailItem.set("toYmd",toYmd);
		detailItem.set("locId",refs.refWareHouse.getValue());
//		detailItem.set("lineColr",theRentalList.get('lineColr'));
//		detailItem.set("fontColr",theRentalList.get('fontColr'));
		detailItem.set("area",refs.refArea.getValue());
		detailItem.set("unitPrice",refs.refRentalRate.getValue());
		detailItem.set("prdTpCd",refs.refRentalCalculation.getValue());
		detailItem.set("rentUnit",refs.refRentUnit.getValue());
		detailItem.set("useTpCd",refs.refUseTpCd.getValue());
		detailItem.set("rmk",refs.refRemark.getValue());
		detailItem.set("conttr",refs.refContractorCd.getValue());
//		detailItem.set("conttr",refs.refContractorNm.getValue());
		detailItem.set("payer",refs.refPayerCd.getValue());
		detailItem.set("userId",MOST.config.Token.getUserId());
		detailItem.set("workingStatus",recvData.get('workingStatus'));
		detailItem.set("freeStrgDays", refs.refFreeStorageDays.getValue());
		detailItem.set("payTpCd", refs.refPayTpCd.getValue());
		detailItem.set("rentCalAmt", refs.refAmount.getValue());
		
		if(StringUtil.isNullorEmpty(refs.refRemark.getValue()) && WorkingStatus.UPDATE == detailItem.get('workingStatus')){
			MessageUtil.warning("warning_msg", "Please input Remark");
			return;
		} else {
			detailItem.set("rmk", refs.refRemark.getValue());
		}
		
//		var theFontColor = me.getViewModel().get('theFontColor');
//		var theLineColor = me.getViewModel().get('theLineColor');
//		detailItem.set('fontColr', theFontColor.get('fontColr'));
//		detailItem.set('lineColr', theLineColor.get('lineColr'));

		var locNamesStr = '';

		whrLocListStore.getModifiedRecords().forEach(function(record, index, array){
			locNamesStr = locNamesStr + record.get('cdVal') + ',';
		});
		detailItem.set("locIdNames",locNamesStr.substr(0,locNamesStr.length-1));


		var locItem = Ext.create('MOST.model.planning.RentalInfo');
		locItem.set({
			cdValNm : 'LO',
			conttNo : refs.refRenTalNo.getValue(),
			itemDivCd : 'LO',
			locIdNames : detailItem.get('locIdNames'),
			rentNo : refs.refRefNo.getValue(),
			userId : detailItem.get('userId')
		});
		detailItem.set("insertType", 'detail');
		sendArray.push(locItem.data);

		whrVesselListStore.getData().items.forEach(function(record, index, array){
			record.set("itemDivCd" , 'VS');
			detailItem.set("insertType", 'detail');
			record.set('refNo', detailItem.get('refNo'));
			record.set('userId', detailItem.get('userId'));
			record.set('conttNo', detailItem.get('conttNo'));
			sendArray.push(record.data);
		});
		
		whrCommodityListStore.getData().items.forEach(function(record, index, array){
			record.set("itemDivCd" , 'CM');
			record.set("insertType", 'detail');
			record.set('refNo', detailItem.get('refNo'));
			record.set('userId', detailItem.get('userId'));
			record.set('conttNo', detailItem.get('conttNo'));
			sendArray.push(record.data);
		});
		
		var proxy = detailItem.getProxy();
		proxy.url = store.getProxy().url;
		detailItem.set("listDetail", sendArray);
		detailItem.save({
			success : function(records,success){
				records.dirty = false;
				detailItem.data = records.data;
                whrVesselListStore.commitChanges();
                whrCommodityListStore.commitChanges(); 
				MessageUtil.saveSuccess();
				
			}
		});
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		if(targetControl == 'refTenantTxt'){ 
			if(returnValue){
				me.getViewModel().setData({theTenant:returnValue.item});
				refs.refTenantNmTxt.setValue(returnValue.item.get('ptnrName'));
			}
		}else if(targetControl == 'refContractorCd'){ 
			if(returnValue){
				refs.refContractorNm.setValue(returnValue.item.get('ptnrName'));
			}
		}else if(targetControl == 'refPayerCd'){ 
			if(returnValue){
				refs.refPayerNm.setValue(returnValue.item.get('ptnrName'));
			}
		}else if(targetControl == 'refTxtVslCd'){
			if(returnValue){
				refs.refVesselCode.getEditor().setValue(returnValue.item.get('vslCd'));
				refs.refVesselName.getEditor().setValue(returnValue.item.get('vslNm'));
			}
		}else  if(targetControl == 'refTxtCommodity'){
			if(returnValue){
				refs.refCommodityNm.getEditor().setValue(returnValue.codeName);
			}
		}else  if(targetControl == 'refWareHouse'){
			if(returnValue){
				refs.refWareHouse.setValue(returnValue.WhRentString);
				refs.refArea.setValue(returnValue.WhRentArea);
				me.convertItem(returnValue.WhRentList);
			}
		}
	},
	
	convertItem: function(items){
		var me = this
		var refs = me.getReferences();;
		var idx = 0;

		var whrLocListStore = me.getViewModel().getStore('whrLocList');
		whrLocListStore.removeAll();
		
		items.forEach(function(item){
			var convItem = Ext.create('MOST.model.planning.RentalInfo');
			convItem.set({
				cdVal : item.get('locId'),
				cdValNm : 'LO',
				conttNo : refs.refRenTalNo.getValue(),
				itemDivCd : 'LO',
				rentNo : refs.refRefNo.getValue()
			});
			whrLocListStore.insert(idx,convItem);
			idx++;
		});
	},
	
	openPartnerCdTypePopup:function(){
		var me = this;
		var params = {
			searchModule: 'MT'
		};
		me.openCodePopup('popup-tntpartnercdtypepopup', 'refTenantTxt', params);
	},
	
	onPtnrCodePopup: function(){
		var me = this;
		var params = {
			searchDivCd: 'SHA' 
		}
		me.openCodePopup('popup-partnercdpopup', 'refPayerCd', params);
	},
	
	openWarehouseView: function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var whrLocListStore = me.getViewModel().getStore('whrLocList');
		var params = {
			locId: recvData.get('locId'),
			WhDtlList: whrLocListStore.data.items
		}
		me.openCodePopup('popup-warehouserentalpopup', 'refWareHouse', params);
	},
	
	openContractorPopup:function(){
		var me = this;
		var refs = me.getReferences();
		var params={
			searchDivCd: 'VDPR'
		}
		me.openCodePopup('popup-partnercdpopup', 'refContractorCd',params );
	},
	
	updateDays: function(){
		var me = this;
		var refs = me.getReferences();
		
		var years;
		var months;
		var days;
		var cntDays;
		var dfFmYmd = refs.ctlDateFromDtRental.rawValue;
		var dfToYmd = refs.ctlDateToDtRental.rawValue;
		var countTime = 0;
		
		if(dfFmYmd != null && dfFmYmd != '' 
			&& dfToYmd != null && dfToYmd != ''){
			var newFDate = Ext.Date.parse(dfFmYmd,'d/m/Y');
			var newTDate = Ext.Date.parse(dfToYmd,'d/m/Y');
			countTime = (newTDate.getTime() - newFDate.getTime())/(24 * 60 * 60 * 1000) + 1;
			cntDays = countTime;
			refs.refDays.setValue(cntDays);
			if(countTime < 0) {
			   	return;
			}
			
			newTDate.setDate(newTDate.getDate() + 1);
			days = newTDate.getDate() - newFDate.getDate();
			months = newTDate.getMonth() - newFDate.getMonth();
			years = newTDate.getFullYear() - newFDate.getFullYear();
			
			if(years > 0){
				months += years * 12;
			}
			
			if(days < 0){
				if(me.checkLeapYear(newFDate.getFullYear())){
					days = new Date(years, months, 0).getDate() + days;
				}else{
					days = new Date(years, months, 0).getDate() + days;
					months -= 1;
				}
			}
		}
		
		if(days != null && days != ''){
			refs.txtDays.setValue(days);
		}else{
			refs.txtDays.setValue(0);
		}
		
		if(months != null && months != ''){
			refs.refMonth.setValue(months);
		}else{
			refs.refMonth.setValue(0);
		}
	},
	
	checkLeapYear: function(year){
		if ((year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || ( year % 100 === 0 && year % 400 === 0)){
			return true;
		}else{
			return false;
		}
		return false;
	},
	
	onAddVessel: function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var grid = me.lookupReference('refVesselGrid');
		var store = me.getStore('whrVesselList');
		var editor = grid.getPlugin('vesselInfoEditor');
		var record = Ext.create('MOST.model.planning.RentalInfo');
		editor.cancelEdit();
		// Clear filter for Grid
		grid.filters.clearFilters();
		grid.filters.disable();
		
		// Clear filter for Store
		store.clearFilter();
		
		var selection = grid.getSelection() === null ? null : grid.getSelection()[0];
		
		if(selection === null) return;
		
		var idx = 0;
		if(grid.getSelection() && grid.getSelection().length>0) {
			idx = store.indexOfId(grid.getSelection()[0].get('id'));
		}
		store.insert(idx, record);
		grid.getSelectionModel().select(record);
		
		editor.startEdit(record);
	},
	
	onRemoveVessel: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refVesselGrid');
		var store = me.getStore('whrVesselList');
		var selection = grid.getSelection() === null ? null : grid.getSelection();
		if(selection === null) return;
		
		Ext.each(selection, function (record) {
//			record.set('workingStatus', WorkingStatus.DELETE);
			store.remove(record);
		});
	},
	
	onAddCommodity: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refCommodityGrid');
		var store = me.getStore('whrCommodityList');
		var editor = grid.getPlugin('commodityInfoEditor');
		var record = Ext.create('MOST.model.planning.RentalInfo');
		editor.cancelEdit();
		// Clear filter for Grid
		grid.filters.clearFilters();
		grid.filters.disable();
		
		// Clear filter for Store
		store.clearFilter();
		
		var selection = grid.getSelection() === null ? null : grid.getSelection()[0];
		
		if(selection === null) return;
		
		var idx = 0;
		if(grid.getSelection() && grid.getSelection().length>0) {
			idx = store.indexOfId(grid.getSelection()[0].get('id'));
		}
		store.insert(idx, record);
		grid.getSelectionModel().select(record);
		
		editor.startEdit(record);
	},
	
	onRemoveCommodity: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refCommodityGrid');
		var store = me.getStore('whrCommodityList');
		var selection = grid.getSelection() === null ? null : grid.getSelection();
		if(selection === null) return;
		
		Ext.each(selection, function (record) {
//			record.set('workingStatus', WorkingStatus.DELETE);
			store.remove(record);
		});
	},
	
	onCreateWareHouseRental: function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = Ext.create('MOST.model.planning.RentalInfo');
		var whrCommodityListStore = me.getViewModel().getStore('whrCommodityList');
		var whrVesselListStore = me.getViewModel().getStore('whrVesselList');
		whrCommodityListStore.clearData();
		whrVesselListStore.clearData();
		me.getView().detailViewAlias = 'app-warehouserental';
		recvData.data.workingStatus = WorkingStatus.INSERT;
		me.openDetailPopup(recvData, 'Warehouse Rental');
	},
	
	onChkDupliRentNo: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('chkDupliRentNo');
		
		if(refs.refRenTalNo.getValue() == '' || refs.refRenTalNo.getValue() == null){
			MessageUtil.alert('Warning', "Please insert Rental No.");
			return;
		}
		
		store.load({
     		params : {
     			conttNo : refs.refRenTalNo.getValue(),
     		},
     		callback: function(records, operation, success) {
     			if (success) {
     				if (records.length > 0) {
     					if(records[0].data.refList.collection[0].cnt == '0'){
     						MessageUtil.alert('Warning', "whrNotDuplicate");
     						refs.refRefNo.setValue(records[0].data.refList.collection[0].refNo);
     						return true;
     					} else {
     						MessageUtil.question('Confirm', 'whrDuplicate',null,
     								function(button){
     									if (button === 'ok') {
     										
     							        } else if(button === 'cancel'){
     							        	refs.refRenTalNo.setValue('');
     							        	refs.refRefNo.setValue('');
     							        };
     								}
     						);
     					}
     				}
     			}
     		}
		});
	},
	
	onTxtVslCdTriggerClick: function(field, button, e){
		var me = this;
		var refs = me.getReferences();
		me.openCodePopup('popup-vesselcalllistpopup', field.reference);
	},
	
	onCommodityTriggerClick: function(field, button, e){
		var me = this;
		var refs = me.getReferences();
		var params = {
				searchType : 'CMDT'
			};
		me.openCodePopup('popup-cmmcdpopup', field.reference, params);
	},
	
	onChangeDate: function(field, newValue, oldValue){
		var me = this;
		var refs = me.getReferences();
		var fromDate = refs.ctlDateFromDtRental.getValue();
		var toDate = refs.ctlDateToDtRental.getValue();
		/*if(fromDate == null && toDate == null) {
			MessageUtil.alert('Warning', 'mandatoryForm_msg');
			return;
		}*/
		if(fromDate >= toDate && (fromDate !=null) && (toDate != null)){
			MessageUtil.alert('Warning', 'validPeriod_msg');
			field.setValue(null);
			return;
		}
	},

	onChangeRentalUnit: function(field, newValue) {
		var me = this;
		var refs = me.getReferences();
		if(newValue == 'LS'){
			refs.refAmount.setDisabled(false);
			refs.refRentalRate.setValue('1');
		} else {
			refs.refAmount.setValue('');
			refs.refRentalRate.setValue('');
			refs.refAmount.setDisabled(true);
		}
	},
	
	/**
	 * DETAIL END
	 * =========================================================================================================================
	 */
	
});