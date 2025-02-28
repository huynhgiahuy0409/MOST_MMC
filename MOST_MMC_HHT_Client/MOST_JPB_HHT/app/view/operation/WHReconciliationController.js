Ext.define('MOST.view.controller.WHReconciliationController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.whreconciliation',

	// Constatns
	CATEGORY_EXPRT : 'E',
	CATEGORY_IMPRT : 'I',
	CATEGORY_RHNDL : 'R',
	CATEGORY_STRGE : 'S',
	CATEGORY_TRSHP : 'T',

	NON_CALL_ID : 'NonCallId',

	
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var categoryCombo = me.getStore('categoryCombo');
		var whCombo = me.getStore('whCombo');
		
		categoryCombo.load();
		whCombo.load();
	},
	
	onDateChange:function( control, newValue, oldValue, eOpts ) {
		var me = this;
		var refs = me.getReferences();
		var validateDate = false;
		
		if(control == refs.ctlLoadedFromDt){
			validateDate = me.validatePeriodDate(newValue, refs.ctlLoadedToDt.getValue(), me.MAX_DATE_PERIOD);

			if(!validateDate){
				me.setDateInDaysByDate('ctlLoadedToDt', me.MAX_DATE_PERIOD, control.getValue());
			}
		} else {
			validateDate = me.validatePeriodDate(refs.ctlLoadedFromDt.getValue(), newValue, me.MAX_DATE_PERIOD);
			
			if(!validateDate){
				me.setDateInDaysByDate('ctlLoadedFromDt', -me.MAX_DATE_PERIOD, control.getValue());
			}
		}
	},
	
	validateSearchWhRecn:function(){
		var me = this;
		var refs = me.getReferences();
		var chkResult = false;
		var invalidControl = new Array();
		
		if (!StringUtil.isNullorEmpty(refs.cboWH.getValue())) {
			chkResult = true;
		} else {
			invalidControl.push('Warehouse');
		}
		
		if (refs.cboCategory.getValue() == 'S') {
			//estimate date
			if (!StringUtil.isNullorEmpty(refs.ctlLoadedFromDt.getValue()) && !StringUtil.isNullorEmpty(refs.ctlLoadedToDt.getValue())) {
				chkResult = true;
			} else {
				invalidControl.push('Date from');
				invalidControl.push('Date to');
			}
		} else {
			//vessel call id
			if (!StringUtil.isNullorEmpty(refs.ctlJpvc.getValue())) {
				chkResult = true;
			} else {
				invalidControl.push('Jpvc');
			}
		}
		
		if (!StringUtil.isNullorEmpty(refs.cboSN.getValue())) {
			chkResult = true;
		} else {
			invalidControl.push('SN No');
		}
		
		if (!StringUtil.isNullorEmpty(refs.cboGR.getValue())) {
			chkResult = true;
		} else {
			invalidControl.push('GR No');
		}
		
		if (!StringUtil.isNullorEmpty(refs.cboBL.getValue())) {
			chkResult = true;
		} else {
			invalidControl.push('BL No');
		}
		
		if(!chkResult){
			MessageUtil.warning('warning_msg', 'whReconcilValidateMsg', invalidControl);
		}
		
		return chkResult;
	},
	
	onSearch:function(){
		var me = this;
		var refs = me.getReferences();
		var whReconcilList = me.getStore('whReconcilList');
		var params = me.getSearchCondition();
		
		if(me.validateSearchWhRecn()){
			whReconcilList.load({
				params: params,
				callback:function(records,success){
					if(success){
						
					}
				}
			});
		}
	},
	
	onSelectCategory:function(ele, rec, idx){
		var me = this;
		var refs = me.getReferences();
		
		strCategory = refs.cboCategory.getValue();
		
		//cargo category
		if (strCategory == 'S') {
			refs.ctlLoadedFromDt.setHidden(false);
			refs.ctlLoadedToDt.setHidden(false);

			refs.ctlLoadedFromDt.setDisabled(false);
			refs.ctlLoadedToDt.setDisabled(false);
			
			refs.ctlJpvc.refs.ctlField.setEditable(false);
			refs.ctlJpvc.refs.ctlOpenPopupButton.setDisabled(true);

			refs.ctlJpvc.refs.ctlField.setHidden(true);
			refs.ctlJpvc.refs.ctlOpenPopupButton.setHidden(true);
			
			
			refs.cboBL.setDisabled(true);
			refs.cboSN.setDisabled(false);
			refs.cboGR.setDisabled(false);
			
			refs.cboBL.setValue('');
			refs.ctlJpvc.refs.ctlField.setValue('');
		} else if (strCategory == 'I' || strCategory == 'T') {
			refs.ctlJpvc.refs.ctlField.setHidden(false);
			refs.ctlJpvc.refs.ctlOpenPopupButton.setHidden(false);

			refs.ctlJpvc.refs.ctlField.setEditable(true);
			refs.ctlJpvc.refs.ctlOpenPopupButton.setDisabled(false);
			
			refs.ctlLoadedFromDt.setHidden(true);
			refs.ctlLoadedToDt.setHidden(true);
			
			refs.cboBL.setDisabled(false);
			refs.cboSN.setDisabled(true);
			refs.cboGR.setDisabled(true);
			
			refs.cboSN.setValue('');
			refs.cboGR.setValue('');
			
			refs.ctlLoadedFromDt.setValue('');
			refs.ctlLoadedToDt.setValue('');
		} else if (strCategory == 'E') {
            refs.ctlJpvc.refs.ctlField.setHidden(false);
			refs.ctlJpvc.refs.ctlOpenPopupButton.setHidden(false);

			refs.ctlJpvc.refs.ctlField.setEditable(true);
			refs.ctlJpvc.refs.ctlOpenPopupButton.setDisabled(false);
			
			refs.ctlLoadedFromDt.setHidden(true);
			refs.ctlLoadedToDt.setHidden(true);
			
			refs.cboBL.setDisabled(true);
			refs.cboSN.setDisabled(false);
			refs.cboGR.setDisabled(false);
			
			refs.ctlLoadedFromDt.setValue('');
			refs.ctlLoadedToDt.setValue('');
			refs.cboBL.setValue('');
		} else {
			refs.ctlJpvc.refs.ctlField.setHidden(false);
			refs.ctlJpvc.refs.ctlOpenPopupButton.setHidden(false);
			
			refs.ctlJpvc.refs.ctlField.setEditable(true);
			refs.ctlJpvc.refs.ctlOpenPopupButton.setDisabled(false);
			
			refs.ctlLoadedFromDt.setDisabled(true);
			refs.ctlLoadedToDt.setDisabled(true);
			
			refs.cboBL.setDisabled(true);
			refs.cboSN.setDisabled(true);
			refs.cboGR.setDisabled(true);
			
			refs.ctlLoadedFromDt.setValue('');
			refs.ctlLoadedToDt.setValue('');
			
			refs.cboBL.setValue('');
			refs.cboSN.setValue('');
			refs.cboGR.setValue('');
		}
	},
	
	getSearchCondition:function(){
		var me = this;
     	var refs = me.getReferences();

     	var estArrvDtFrom = Ext.Date.format(refs.ctlLoadedFromDt.getValue(), MOST.config.Locale.getShortDate());
     	var estArrvDtTo = Ext.Date.format(refs.ctlLoadedToDt.getValue(), MOST.config.Locale.getShortDate());
     	
    	var params = {
    		searchType : 'whrecnlist',
    		vslCallId : refs.ctlJpvc.getValue(),
    		snNo: refs.cboSN.getValue(),
    		fwAgent: refs.ctlFwdAgent.getValue(),
    		estArrvDtFrom: estArrvDtFrom,
    		estArrvDtTo: estArrvDtTo,
    		grNo: refs.cboGR.getValue(),
    		blNo: refs.cboBL.getValue(),
    		whLocId: refs.cboWH.getValue(),
    		category: refs.cboCategory.getValue()
		};
    	
    	return params;
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue, me, parent){
		var me = this;
		var refs = me.getReferences();
		var shippingNoteListCombo = me.getStore('shippingNoteListCombo');
		var blListCombo = me.getStore('blListCombo');
		var grListCombo = me.getStore('grListCombo');
		var docList = me.getStore('docList');
		
		if(targetControl === 'ctlFwdAgent'){
			if(!StringUtil.isNullorEmpty(refs.cboCategory.getValue())){
				docList.load({
					params:{
						searchType:'whrecnDoclist',
						category: refs.cboCategory.getValue(),
						fwAgent: refs.ctlFwdAgent.getValue().toUpperCase()
					},
					callback:function(records,success){
						if(success){
							me.setDocStores(records);
						}
					}
				})
			}
			
		} else if(targetControl === 'ctlJpvc') {
			if(shippingNoteListCombo.getData().length > 0){
				shippingNoteListCombo.clearFilter();
				shippingNoteListCombo.filter('vslCallId', refs.ctlJpvc.getValue());
			}
			
			if(blListCombo.getData().length > 0){
				blListCombo.clearFilter();
				blListCombo.filter('vslCallId', refs.ctlJpvc.getValue());
			}
			
			if(grListCombo.getData().length > 0){
				grListCombo.clearFilter();
				grListCombo.filter('vslCallId', refs.ctlJpvc.getValue());
			}
			
			if(shippingNoteListCombo.getData().length == 0 ||
					blListCombo.getData().length == 0 ||
					grListCombo.getData().length == 0){
				docList.load({
					params:{
						searchType:'whrecnDoclist',
						category: refs.cboCategory.getValue(),
						fwAgent: refs.ctlFwdAgent.getValue().toUpperCase(),
						vslCallId: refs.ctlJpvc.getValue().toUpperCase()
					},
					callback:function(records,success){
						if(success){
							shippingNoteListCombo.setData(records[0].get('snList'));
							blListCombo.setData(records[0].get('blList'));
							grListCombo.setData(records[0].get('grList'));
						}
					}
				})
			}
		}

	},

	// setDocStores: function(records){
	// 	var me = this;
	// 	var snListCombo = me.getStore('shippingNoteListCombo');
	// 	var blListCombo = me.getStore('blListCombo');
	// 	var grListCombo = me.getStore('grListCombo');

	// 	snListCombo.
	// 	blListCombo.setData(records[0].get('blList'));
	// 	grListCombo.setData(records[0].get('grList'));


	// },
	
	onWHGridDblClick: function(){
		var me = this;
		var grid = me.lookupReference('refWHReconcilGrid');
		
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		me.getView().detailViewAlias = 'app-whreconciliationdetail';
	
		me.openDetailPopup(selection, 'WH Reconciliation Detail');
	},
	
	onWHReconcilDetailLoad:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var whReconcilDetail = me.getStore('whReconcilDetail');
		var whReconcilDetailGrid = me.getStore('whReconcilDetailGrid');
		var cargoReconilCondCombo = me.getStore('cargoReconilCondCombo');
		
		me.getView().center();

		whReconcilDetail.load({
			params:{
				vslCallId: recvData.get('vslCallId'),
				cgNo: recvData.get('cgNo'),
				whTpCd: recvData.get('whTpCd'),
				searchType: ''
			},
			callback:function(records,success){
				if(success){
					var detailList = records[0].get('detailList');
					whReconcilDetailGrid.setData(records[0].get('detailList'));
					cargoReconilCondCombo.setData(records[0].get('cargonReconcilCond'));
					
					refs.txtMt.setValue(detailList[0].wgt);
					refs.txtM3.setValue(detailList[0].msrmt);
					refs.txtQty.setValue(detailList[0].pkgQty);
				}
			}
		})
		
	},
	
	onWhRecDetailDblClick:function(g, rowIndex, colIndex, e){
		var me = this;
		var refs = me.getReferences();
		
		refs.txtMt.setValue(e.get('wgt'))
		refs.txtM3.setValue(e.get('msrmt'));
		refs.txtQty.setValue(e.get('pkgQty'))
	},
	
	onWhReconcilDetailEdit:function(editor, context){
		var me = this;
		var refs = me.getReferences();
		var whReconcilDetailGrid = me.getStore('whReconcilDetailGrid');
		var whReconcilDetail = me.getStore('whReconcilDetail');
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var rcCond = refs.cboColRCCond.getValue();
		
		var amdWgt = parseFloat(refs.txtAmdWgt.getValue());
		var amdMsrmt = parseFloat(refs.txtAmdMsrmt.getValue());
		var amdPkgQty = parseFloat(refs.txtAmdPkgQty.getValue());
		
		
		var mt = parseFloat(refs.txtMt.getValue());
		var msrmt = parseFloat(refs.txtM3.getValue());
		var qty = parseFloat(refs.txtQty.getValue());
		
		var chgWgt = 0;
		var chgMsrmt = 0;
		var chgPkgQty = 0;
		
		if(context.record.dirty){
			var proxy = context.record.getProxy();
			proxy.url = whReconcilDetail.getProxy().url;

			var rcDt = Ext.Date.format(refs.refRcDt.getValue(), MOST.config.Locale.getShortDate());

			if(StringUtil.isNullorEmpty(rcCond) && (amdWgt > mt && amdMsrmt > msrmt && amdPkgQty > qty)){
				context.record.set('rcCoCd', 'IC');
				context.record.set('rcCoCdNm', 'Increase');

				chgWgt = amdWgt - mt;
				chgMsrmt = amdMsrmt - msrmt;
				chgPkgQty = amdPkgQty - qty;

				me.onGridComboRenderer();
			} else if(StringUtil.isNullorEmpty(rcCond) && (amdWgt < mt && amdMsrmt < msrmt && amdPkgQty < qty)){
				context.record.set('rcCoCd', 'DC');
				context.record.set('rcCoCdNm', 'Decrease');

				chgWgt = amdWgt - mt;
				chgMsrmt = amdMsrmt - msrmt;
				chgPkgQty = amdPkgQty - qty;

				me.onGridComboRenderer();
			} else {
				chgWgt = '-' + amdWgt;
				chgMsrmt = '-' + amdMsrmt;
				chgPkgQty = '-' + amdPkgQty;
			}

			context.record.set('chgWgt', chgWgt);
			context.record.set('chgMsrmt', chgMsrmt);
			context.record.set('chgPkgQty', chgPkgQty);
			context.record.set('rcDt', rcDt);
			context.record.set('jobCoCd', context.record.get('whTpCd'));
			context.record.set('opeClassCd', recvData.get('opeClassCd'))

			context.record.save({
				success:function(){
					me.onWHReconcilDetailLoad();
					me.onSearch();
				}
			})
		}
		
	},

	
	onWhReconcilValidateEdit:function(editor, context){
		var me = this;
		var refs = me.getReferences();
		
		var grid = refs.refWHReconcilDetailGrid;
		var editor = grid.getPlugin('whReconcilDetailEditor');
		var amdWgt = parseFloat(refs.txtAmdWgt.getValue());
		var amdMsrmt = parseFloat(refs.txtAmdMsrmt.getValue());
		var amdPkgQty = parseFloat(refs.txtAmdPkgQty.getValue());
		
		
		var mt = parseFloat(refs.txtMt.getValue());
		var msrmt = parseFloat(refs.txtM3.getValue());
		var qty = parseFloat(refs.txtQty.getValue());
		
		var cgCond = context.record.get('whTpCd');
		var rcCond = refs.cboColRCCond.getValue();
		
		var isValid = true;
		
		if(amdWgt > mt && rcCond != cgCond && !StringUtil.isNullorEmpty(rcCond)){
			MessageUtil.warning('warning_msg', 'whReconcilValidateMtChanged');
			isValid = false;
			
		}else if(amdPkgQty > qty && rcCond != cgCond && !StringUtil.isNullorEmpty(rcCond)){
			MessageUtil.warning('warning_msg', 'whReconcilValidateQtyChanged');
			isValid = false;
			
		}else if(amdMsrmt > msrmt && rcCond != cgCond && !StringUtil.isNullorEmpty(rcCond)){
			MessageUtil.warning('warning_msg', 'whReconcilValidateM3Changed');
			isValid = false;
		
		}else if(rcCond == cgCond){
			MessageUtil.warning('warning_msg', 'whReconcilValidateCgCond');
			isValid = false;
		
			
		}else if(StringUtil.isNullorEmpty(rcCond) && (amdWgt > mt || amdMsrmt > msrmt || amdPkgQty > qty)){
			if(!(amdWgt > mt && amdMsrmt && msrmt && amdPkgQty > qty)){
				MessageUtil.warning('warning_msg', 'whReconcilValidateIncreaseDecrease');
				isValid = false;
			
			}

		}else if(StringUtil.isNullorEmpty(refs.txtAmdWgt.getValue()) && StringUtil.isNullorEmpty(refs.txtAmdMsrmt.getValue()) && StringUtil.isNullorEmpty(refs.txtAmdPkgQty.getValue())){
			MessageUtil.warning('warning_msg', 'whReconcilValidateEmptyAmount');
			isValid = false;
			
		}
		
		if(!isValid){
			editor.cancelEdit();
			me.onWHReconcilDetailLoad();
		}
	},
	
	onWhReconcilCancelEdit:function(rowEditing, context){
		var me = this;
	
	},
	
	onGridComboRenderer:function(val, cell, record){
		var me = this;
		var refs = me.getReferences();
		var cargoReconilCondCombo = me.getStore('cargoReconilCondCombo');
	
		
		if(cargoReconilCondCombo != null){
			/*if(!StringUtil.isNullorEmpty(val) && StringUtil.isNullorEmpty(cell.record.get('whTpNm'))){
				
			}*/
			
			var indx = -1;
			indx = cargoReconilCondCombo.find('scd', val);
	

			if (indx != -1){
				return cargoReconilCondCombo.getAt(indx).get('scdNm'); 
			}else{
				if(record != undefined){
					return record.get('rcCoCdNm');
				}
				 
			}
		}
	},
	
	onOpenWHReconcilJobMonitoring:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refWHReconcilGrid;
		var title = {type: 'bundle', key: 'whReconcilJobMonitoringTitle'};
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		me.getView().detailViewAlias = 'app-whreconciljobmonitoring';
		me.openDetailPopup(selection, title);
		
	},
	
	exportTo: function(btn) {
    	var me = this;
    	var refs = me.getReferences();
    	
        var cfg = Ext.merge({
            title: 'WH Reconciliation',
            fileName: 'WHReconciliation' + '.' + (btn.cfg.ext || btn.cfg.type)
        }, btn.cfg);

        var grid = refs.refWHReconcilGrid;
        grid.saveDocumentAs(cfg);
    },
	/**
	 * =========================================================================================================================
	 * DETAIL END
	 */

	/**
	 * HHT START
	 * =========================================================================================================================
	 */

	onHHTLoad: function(){
		var me = this;
		me.loadComboFields();
		me.loadTbl();
	},

	loadComboFields: function(){
		var me = this;
		var vslCallId = me.getViewModel().get('globalVesselCallId');
		var whComboStore = me.getStore('whCombo');
		// var docComboStore = me.getStore('docList');
		var catComboStore = me.getStore('categoryCombo');

		whComboStore.load();
		catComboStore.load({
			callback: function(records, operation, success){
				if(success){
					me.lookupReference('refCatCombo').setValue(me.CATEGORY_EXPRT);
				}
			}
		});

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


	},

	loadTbl: function(){
		var me = this;
		var vslCallId = me.getViewModel().get('globalVesselCallId');
		var refs = me.getReferences();
		var store = me.getStore('whReconcilList');
		store.load({
			params: {
				vslCallId: vslCallId ? vslCallId : me.NON_CALL_ID,
				searchType: 'whrecnlist',
				category: refs.refCatCombo.getValue(),
				whLocId: refs.refWhCombo.getValue(),
				snNo: refs.refSnCombo.getValue(),
				blNo: refs.refBlCombo.getValue(),
				grNo: refs.refGrCombo.getValue()
			}
		});
	},

	onCategoryChanged: function(combo, newValue){
		var me = this;
		me.dsablDocCombo();
		if(newValue === me.CATEGORY_EXPRT || newValue === me.CATEGORY_TRSHP){
			me.actvSnCombo();
		} else if(newValue === me.CATEGORY_IMPRT || newValue === me.CATEGORY_STRGE){
			me.actvBlCombo();
		} else if(newValue === me.CATEGORY_RHNDL){
			return;
		}
	},

	dsablDocCombo: function(){
		var me = this;
		var refs = me.getReferences();

		refs.refSnCombo.setValue('');
		refs.refGrCombo.setValue('');
		refs.refBlCombo.setValue('');

		refs.refSnCombo.setDisabled(true);
		refs.refGrCombo.setDisabled(true);
		refs.refBlCombo.setDisabled(true);
	},

	onSnNoChanged: function(combo, newValue){
		var grStore = this.getStore('grListCombo');
		if(newValue === ''){
			grStore.clearFilter();
		} else {
			grStore.filter('shipgNoteNo', newValue);
		}
	},

	actvSnCombo: function(){
		var me = this;
		var refs = me.getReferences();

		refs.refSnCombo.setDisabled(false);
		refs.refGrCombo.setDisabled(false);
	},

	actvBlCombo: function(){
		var me = this;
		var refs = me.getReferences();

		refs.refBlCombo.setDisabled(false);
	},

	onNumberFieldChange: function(numberField, newValue){
		if(!newValue)
			numberField.setValue(0);
	},

	onHHTReconcileClicked: function(){
		var me = this;
		var refs = me.getReferences();
		var selection = refs.refWhRcnGrid.getSelection();

		if(selection == null) return;

		selection.set('screen','app-whreconciliationdetailhht');
		selection.title = 'Warehouse Reconciliation Detail'

		ViewUtil.openHhtPopup(me,'app-whreconciliationdetailhht', null, selection);

	},

	onRcnDetailLoad: function(cbFunc){
		var me = this;
		var recvData = me.getView().recvData;
		var grid = me.lookupReference('refWhRcnDtlGrid');
		var whReconcilDetail = me.getStore('whReconcilDetail');
		var cgoCondStore = me.getStore('cargoReconilCondCombo');

		me.initFieldValues();

		cgoCondStore.load();
		whReconcilDetail.load({
			params:{
				vslCallId: recvData.get('vslCallId'),
				cgNo: recvData.get('cgNo'),
				whTpCd: recvData.get('whTpCd'),
				searchType: ''
			},
			callback:function(records,success){
				if(success){
					grid.setData(records[0].get('detailList'))
					grid.getStore().commitChanges();
					if(typeof cbFunc === 'function'){
						cbFunc(records[0].get('detailList'));
					}
				}
			}
		})

	},

	initFieldValues: function(){
		var me = this;
		var refs = me.getReferences();

		refs.refRcDt.setValue(new Date());
	},

	onWhRcnDtlTblSelect: function(grid, selected){
		var me = this;
		me.setselectedReconcileDetailData(selected);
		me.initAmendValues();
	},

	setselectedReconcileDetailData: function(data){
		this.getViewModel().set({selectedReconcileDetailData : data});
	},

	initAmendValues: function(){
		var me = this;
		var refs = me.getReferences();
		var data = this.getViewModel().getData().selectedReconcileDetailData;
		if(data.data){
			data.set({
				amdWgt : 0,
				amdMsrmt : 0,
				amdPkgQty : 0,
				rcCoCd : ''
			});
		}else{
			refs.refAmendMt.setValue(0);
			refs.refAmendM3.setValue(0);
			refs.refAmendQty.setValue(0);
			refs.refAmendCond.setValue('');
		}
	},

	onHHTDetailReconcileClicked: function(){
		var me = this;
		var detailStore = me.getStore('whReconcilDetail');
		var data= me.getViewModel().get('selectedReconcileDetailData');

		if(data === null){
			return;
		} else if(!me.validateHHTReconcileData()){
			return;
		} else {
			detailStore.setData(data);
			data.set({'rcDt': me.lookupReference('refRcDt').getValue()});
			me.saveReconcileData();
		}
	},

	saveReconcileData: function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData
		var record = me.getViewModel().get('selectedReconcileDetailData');

		me.calculateAmendQty(record);
		record.set('rcDt', refs.refRcDt.getValue());
		record.set('jobCoCd', record.get('whTpCd'));
		record.set('userId', record.get('staffCd'))
		record.set('mfDocId', recvData.get('mfDocId'));
		record.set('opeClassCd', recvData.get('opeClassCd'))
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/whreconciliation/detail';
		updateParm.phantom = false;
		updateParm.set('workingStatus', 'U');
		updateParm.set('items', [record.data]);
			MessageUtil.questionModern('confirm', 'infosave_msg', null, function (button) {
				if (button === 'ok') {
					updateParm.save({
						success:function(){
							MessageUtil.saveSuccess();
							me.onRcnDetailLoad(function(){
								Ext.Array.forEach(refs.refWhRcnDtlGrid.getData(), function(item, idx){
									if(item.locId === record.get('locId')){
										refs.refWhRcnDtlGrid.select(idx);
									}
								});
			
							});
						}
					})
				}
			});
		},

	calculateAmendQty: function(record){
		var me = this;
		if(StringUtil.isNullorEmpty(record.get('rcDt'))){
			if(me.isReconcileIncrease()) {
				record.set('rcCoCd', 'IC');
				record.set('rcCoCdNm', 'Increase');

			} else if(me.isReconcileDecrease()){
				record.set('rcCoCd', 'DC');
				record.set('rcCoCdNm', 'Decrease');
			}
			record.set({chgWgt : record.get('amdWgt') - record.get('wgt')});
			record.set({chgMsrmt : record.get('amdMsrmt') - record.get('msrmt')});
			record.set({chgPkgQty : record.get('amdPkgQty') - record.get('pkgQty')});
		} else {
			record.set({chgWgt : '-' + record.get('amdWgt')});
			record.set({chgMsrmt : '-' + record.get('amdMsrmt')});
			record.set({chgPkgQty : '-' + record.get('amdPkgQty')});
		}
	},

	isReconcileIncrease: function(){
		var data = this.getViewModel().getData().selectedReconcileDetailData;
		return data.get('amdWgt') > data.get('wgt')
			&& data.get('amdMsrmt') > data.get('msrmt')
			&& data.get('amdPkgQty') > data.get('pkgQty');
	},

	isReconcileDecrease: function(){
		var data = this.getViewModel().getData().selectedReconcileDetailData;
		return data.get('amdWgt') < data.get('wgt')
			&& data.get('amdMsrmt') < data.get('msrmt')
			&& data.get('amdPkgQty') < data.get('pkgQty');
	},

	validateHHTReconcileData: function(){
		var data = this.getViewModel().getData().selectedReconcileDetailData;

		 if(!this.validateReconcileValues()){
			return false;

		} else if (data.get('rcCoCd') === data.get('whTpCd')){
			MessageUtil.warning('Warning', 'whReconcilValidateCgCond');
			return false;

		} else if(!this.validateFormFields()){
			MessageUtil.warning('warning_msg', 'whReconcilValidateBasicReq');
			return false;

		} else if(Ext.isEmpty(data.get('rcCoCd'))
		 && (data.get('amdWgt') > data.get('wgt') || data.get('amdMsrmt') > data.get('msrmt') || data.get('amdPkgQty') > data.get('pkgQty'))
		 && !(data.get('amdWgt') > data.get('wgt') && data.get('amdMsrmt') &&data.get(' msrmt') && data.get('amdPkgQty') > data.get('pkgQty'))){
			 MessageUtil.warning('warning_msg', 'whReconcilValidateIncreaseDecrease');
			 return false;
		}
		return true;

	},

	validateReconcileValues: function(){
		if(Ext.isEmpty(this.lookupReference('refRcDt').getValue())){
			MessageUtil.warning('Warning', 'whReconcilValidateInpRcDt');
			return false;
		}
		return true;
	},

	validateFormFields: function(){
		var refs = this.getReferences();

		if(!(refs.refAmendMt.validate() || refs.refAmendM3.validate()
			|| refs.refAmendQty.validate() || refs.refAmendCond.validate())){
			return false;
		}

		return true;
	}

	/**
	 * =========================================================================================================================
	 * HHT END
	 */

});