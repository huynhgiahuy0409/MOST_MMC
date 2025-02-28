Ext.define('MOST.view.planning.MegaInternalController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	
	],

	alias: 'controller.megainternal',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAX_PERIOD_DAY : 7,	// MAX PERIOD DATE
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
		var store = me.getStore('megaInternal');
		var mechanicalStore = me.getStore('megaInternalMechanical');
		var masterCombo = me.getStore('megaInternalCombo');
		
		masterCombo.load({
			params : {
				searchType : 'megaMergelist',
				subSearchType: 'initial',
				shftMethCd : 'Standard'
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						me.setCombo(records[0]);
					}
				}
			}
		});
		
		store.on("datachanged", me.megaInternalStoreDataChange, me);
		mechanicalStore.on("datachanged", me.megaInternalMechanicalStoreDataChange, me);
		
		me.setDateInDays('ctlFromDt');
		me.setDateInDays("ctlToDt", 7);
		
		var recvData = me.getView().recvData;
		
		if(recvData != null){
			refs.ctlFromDt.setValue('');
			refs.ctlToDt.setValue('');
			me.alertYN = 'Y';
	     	me.onSearch();
		}
		
		me.getViewModel().set('selectedForkLift', Ext.create('MOST.model.planning.Mega'));
		me.getViewModel().set('selectedMechanical', Ext.create('MOST.model.planning.Mega'));
	},

	afterSetCodePopupData: function (xtype, targetControl, returnValue) {
		var me = this;
		var refs = me.getReferences();

		if (targetControl === 'ctlScn') {
			if (returnValue) {
				refs.ctlScn.setValue(returnValue.code);

				if (!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))) {
					refs.ctlVessel.setValue(returnValue.item.get('vslCallId'));
				} else {
					refs.ctlJpvc.setValue('');
				}
			}
		}
	},
	
	// Store DataChange
	megaInternalStoreDataChange : function(store){
		var me = this;
		me.totalCalc(store);
	},
	
	// Store DataChange
	megaInternalMechanicalStoreDataChange : function(store){
		var me = this;
		me.totalCalc(store);
	},
	
	// Combo Setting
	setCombo : function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var shiftCombo = me.getStore('megaInternalShiftCombo');
		var purposeCombo = me.getStore('megaInternalPurposeCombo');
		var warehouseCombo = me.getStore('megaInternalWarehouseCombo');

		shiftCombo.setData(masterItem.data.shiftList);
		shiftCombo.insert(0, [{shftNm: 'Select All',shftId: ''}]);
		refs.ctlShiftCombo.setValue('');
		
		purposeCombo.setData(masterItem.data.purposeList);
		purposeCombo.insert(0, [{scdNm: 'Select All',scd: ''}]);
		purposeCombo.insert(1, [{scdNm: 'WAREHOUSE OPERATION',scd: 'MP0001'}]);
		refs.ctlPurposeCombo.setValue('MP0001');
		
		warehouseCombo.setData(masterItem.data.warehouseLocationList);
		warehouseCombo.insert(0, [{locNm: 'Select All',locId: ''}]);
		refs.ctlWarehouseCombo.setValue('');
	},
	
	onRefresh : function(controlName){
		var me = this;
		me.refreshControl(controlName);
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
    	var store = me.getStore('megaInternal');
    	var mechanicalStore = me.getStore('megaInternalMechanical');
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
    	params.eqDivCd = "FL";
		store.load({		
			params: params,
			callback: function(records, operation, success) {
				params.eqDivCd = "MC";
				mechanicalStore.load({
					params: params
				});
			}
		});
		
		me.getViewModel().set('selectedForkLift', Ext.create('MOST.model.planning.Mega'));
		me.getViewModel().set('selectedMechanical', Ext.create('MOST.model.planning.Mega'));
	},
	
	// Grid Edit
	onEdit : function(editor, context){
		var me = this;
		me.gridEdit(editor, context);
	},
	
	// Grid Validate Edit
	onValidateEdit : function(editor, context) {
		var me = this;
		var grid = editor.grid;
		var whQty = grid.down('[dataIndex=confmQty]').getEditor().getValue();
		var reqQty = grid.down('[dataIndex=reqQty]').getEditor().getValue();
		
		if(whQty >  reqQty){
			MessageUtil.warning('Warning', 'megainternal_confirmed_qty_msg');
			return false;
		}
	},
	
	// Grid Cancel Edit
	onCancelEdit : function(rowEditing, context) {
		var me = this;
		me.gridCancelEdit(rowEditing, context);
	},
	
	// Total Summary
	onSummaryRenderer:function(value, summaryData, dataIndex) {
		var formatValue = Ext.util.Format.number(value, '0,000');
		return Ext.String.format("<span style='font-weight:bold;'>{0}</span>", formatValue);
	},
	
	renderMegaNoColor: function(value, metaData, record, rowIndex, colIndex, store) {
		var me = this;
		var textColor = record.get('colColor');
		var colorValue = value;
		
		if(textColor == null && textColor === ''){
			textColor = record.get(Ext.String.format('col{0}Color', colIndex));
			
			if(textColor == null && textColor == ''){
				colorValue = Ext.String.format("<span style='color:#000000'>{0}</span>", value)
			} else {
				colorValue = Ext.String.format("<span style='color:#{0}'>{1}</span>", textColor, value);
			}
		} else {
			colorValue = Ext.String.format("<span style='color:#{0}'>{1}</span>", textColor, value);
		}
		
		return colorValue;
	},
	
	// Grid Row Remove
	onRemove: function() {
		var me = this;
		var grid = me.lookupReference('refMegaInternalGrid');
		var store = me.getStore('megaInternal'); 
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		
		if(selection == null) return;
		
		Ext.each(selection, function (record) {
			record.set('workingStatus', WorkingStatus.DELETE);
			store.remove(record);
		});
	},
	
	// Grid Row Double
	onDblClick: function() {
		var me = this;
		var grid = me.lookupReference('refMegaInternalGrid');
		
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		me.setGridColumnEditable(selection.phantom);
	},
	
	onForkliftGridClick:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refMegaInternalGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;
		
		me.getViewModel().set('selectedForkLift', selection);
	},
	
//	onSave:function(){
//		var me = this;
//		
//		// forklift
//		var store = me.getStore('megaInternal');
//		var bCheck = true;
//		store.getModifiedRecords().forEach(function(record, index, array){
//			bCheck = me.onValidationForklift(record);
//			if(bCheck === false){
//				return;
//			}
//		});
//		
//		// Mechanical
//		var bMechanicalCheck = true;
//		var storeMechanical = me.getStore('megaInternalMechanical');
//		storeMechanical.getModifiedRecords().forEach(function(record, index, array){
//			bMechanicalCheck = me.onValidationForklift(record);
//			if(bMechanicalCheck === false){
//				return;
//			}
//		});
//		
//		if(bCheck){
//			store.sync({
//				success:function(){
//					if(storeMechanical.getModifiedRecords().length === 0){
//						MessageUtil.saveSuccess(); 
//						me.onSearch();
//					}
//				}
//			})
//		}
//		
//		if(bMechanicalCheck){
//			storeMechanical.sync({
//				success:function(){
//					MessageUtil.saveSuccess(); 
//					me.onSearch();
//				}
//			})
//		}
//	},

	onValidationForklift: function(record){
		var me = this;
		
		if (record.get('confmQty') > record.get('reqQty')) {
			MessageUtil.warning('Warning', 'megainternal_confirmed_qty_msg');
			return false;
		}
		
		return true;
	},
	
	onMechanicalGridClick:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refMegaInternalMechanicalGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;
		
		me.getViewModel().set('selectedMechanical', selection);
	},
	
	// Key Column Editable
	setGridColumnEditable:function(isCreate){
		var me = this;
		var refs = me.getReferences();
	},
	
	// Date Change Event
	onDateChange:function( control, newValue, oldValue, eOpts ) {
		var me = this;
		var refs = me.getReferences();
		
		if(control == refs.ctlFromDt){
			me.setDateInDaysByDate('ctlToDt', me.MAX_PERIOD_DAY, control.getValue());
		} else {
			me.setDateInDaysByDate('ctlFromDt', -me.MAX_PERIOD_DAY, control.getValue());
		}
	},
	
	// JPVC OPEN POPUP
	openJpvcPopup:function(){
		var me = this;
		me.openCodePopup('popup-vesselfindpopup', 'ctlVessel');
	},
	
	// S/A OPEN POPUP
	openSaPopup:function(){
		var me = this;
		me.openCodePopup('popup-payercdtypepopup', 'ctlSa');
	},
	
	// FORWARDER OPEN POPUP
	openForwarderPopup:function(){
		var me = this;
		me.openCodePopup('popup-payercdtypepopup', 'ctlSa');
	},
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	// Total Calcuration
	totalCalc : function(store){
		var me = this;
		var refs = me.getReferences();
		var flStore = me.getStore('megaInternal');
		var mcStore = me.getStore('megaInternalMechanical');
		var reqQty = 0;
		var whQty = 0;
		var confQty = 0;
		
		flStore.each(function(record, index){
			if(record.get('reqQty')){
				reqQty += record.get('reqQty');
				whQty += record.get('whQty');
				confQty += record.get('confmQty');
			}
		});
		
		mcStore.each(function(record, index){
			if(record.get('reqQty')){
				reqQty += record.get('reqQty');
				whQty += record.get('whQty');
				confQty += record.get('confmQty');
			}
		});
		
		refs.ctlMegaInternalReqQty.setValue(Ext.util.Format.number(reqQty, '0,000'));
		refs.ctlMegaInternalWhQty.setValue(Ext.util.Format.number(whQty, '0,000'));
		refs.ctlMegaInternalConfQty.setValue(Ext.util.Format.number(confQty, '0,000'));
	},
	
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
//     	var dateCondition = me.checkPeriodDate('ctlFromDt', 'ctlToDt', me.MAX_PERIOD_DAY, true);
     	var jpvcNo = refs.ctlVessel.getValue();
     	var scn = refs.ctlScn.getValue();
     	var shift = refs.ctlShiftCombo.getValue();
     	var warehouse = refs.ctlWarehouseCombo.getValue();
     	var purpose = refs.ctlPurposeCombo.getValue();
     	var sa = refs.ctlSa.getValue();
     	var fw = refs.ctlForwarder.getValue();
     	
     	var reqDtFrom = refs.ctlFromDt.getValue();
     	var reqDtTo = refs.ctlToDt.getValue();
     	
     	if(me.alertYN == 'N'){
     		refs.ctlFromDt.allowBlank = false;
			refs.ctlToDt.allowBlank = false;
            dateCondition = me.checkPeriodDate("ctlFromDt", "ctlToDt", me.MAX_DATE_ALLOW, true);
            reqDtFrom = dateCondition.fromDtString;
            reqDtTo = dateCondition.toDtString;
            if(dateCondition == null){
				return null;
			}
     	}
     	
     	var params = {
			searchType : 'megaMergelist',
			subSearchType: 'list',
			shftMethCd : 'Standard',
			colColor : 'CC0000', // RED
			vslCallId : jpvcNo,
			scn: scn,
    		purpTpCd : purpose,
    		shftId : shift,
    		locId : warehouse,
    		saAgent : sa,
    		reqDtFrom : reqDtFrom,
    		reqDtTo : reqDtTo,
    		fwAgent : fw,
    		alertYn: me.alertYN,
     	};
     	
//    	if(dateCondition != null){
//    		params['reqDtFrom'] = dateCondition.fromDtString;
//    		params['reqDtTo'] = dateCondition.toDtString;
//    	}
    	
    	return params;
	},
	
	onSave:function(){
		var me = this;
		var arrItems = new Array();
		var store = me.getStore('megaInternal');
		var mechanicalStore = me.getStore('megaInternalMechanical');
		var masterItem = Ext.create('MOST.model.planning.Mega');
		
		// CREATE, UPDATE RECORD
		store.getModifiedRecords().forEach(function(record, index, array){
			arrItems.push(record.data);
		});
		
		mechanicalStore.getModifiedRecords().forEach(function(record, index, array){
			arrItems.push(record.data);
		});
		
		// DELETE RECORD
		store.getRemovedRecords().forEach(function(record, index, array){
			arrItems.push(record.data);
		});
		
		mechanicalStore.getRemovedRecords().forEach(function(record, index, array){
			arrItems.push(record.data);
		});
		
		if(arrItems.length > 0){
//			masterItem.set('insertType', 'forklift');
			masterItem.phantom = false;
			
			var proxy = masterItem.getProxy();
			proxy.url = store.getProxy().url; // You can set it as store Proxy Url, or you can put another URL.
			masterItem.set('items', arrItems);
			
			masterItem.save({
				success : function(){
					store.commitChanges();
					MessageUtil.saveSuccess(); // Success Message
				}
			});
		}
	}
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});