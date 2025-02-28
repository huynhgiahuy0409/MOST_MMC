Ext.define('MOST.view.planning.WarehouseHistoryController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.warehousehistory',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refWHHistory',
	MAIN_STORE_NAME: 'whHistoryList',
	MAX_DATE_PERIOD : 30,
	SEARCH_COND : [ {
		"key" : "E",
		"category" : ['cboCategory','cboCgCond','txtJpvc','fieldSNtxt','fieldGRtxt'		 ]
	}, {
		"key" : "I",
		"category" : ['cboCategory','cboCgCond','txtJpvc','fieldBLtxt'					 ]
	}, {
		"key" : "T",
		"category" : ['cboCategory','cboCgCond','txtJpvc','fieldBLtxt'                   ]
	},{
		"key" : "R",
		"category" : ['cboCategory','cboCgCond','txtJpvc'                                ]
	},{
		"key" : "S",
		"category" : ['cboCategory','cboCgCond','fromDt','toDt','fieldSNtxt','fieldGRtxt']
	} ],
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
		var info = {},cgCoCdInfo, jpvcInfo, blInfo, snInfo, grInfo;
		var categoryCombo = me.getStore('categoryCombo');
		var cgcondCombo = me.getStore('cgcondCombo');
		var searchParm = Ext.create('MOST.model.planning.SearchWarehouseHistoryParm');
		
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch:searchParm});
		
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		categoryCombo.load();		
		categoryCombo.commitChanges();
		
		cgcondCombo.load();
		cgcondCombo.commitChanges();
		
		me.setDisableComponent(1,1,1,1,1,1);
	},
	/**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	onSearch:function(){
		var me = this;
		
//		if (!me.validateBeforeSearch())
//			return;
			
		var refs = me.getReferences();
		var params = me.getSearchCondition();
		var whHistoryList = me.getStore('whHistoryList');
		
//		if(refs.cboCgCond.getValue() == null || refs.cboCgCond.getValue() == ''){
//			MessageUtil.warning('warning_msg', 'Please select CG.Cond');
//			return;
//		}
		
		whHistoryList.load({
				params: params,
				callback:function(records,success){
					if(success){
						if (records && records.length <= 0) {
							MessageUtil.noMatchData();
						}
					}
				}
		});
	},
	
	onDateChange:function( control, oldValue, eOpts ) {
		var me = this;
		var refs = me.getReferences();
		var validateDate = false;
		
		if(control == refs.fromDt){
			validateDate = me.validatePeriodDate(refs.fromDt.getValue(), refs.toDt.getValue(), me.MAX_DATE_PERIOD);

			if(!validateDate){
				me.setDateInDaysByDate('toDt', me.MAX_DATE_PERIOD, control.getValue());
			}
		} else {
			validateDate = me.validatePeriodDate(refs.fromDt.getValue(), refs.toDt.getValue(), me.MAX_DATE_PERIOD);
			
			if(!validateDate){
				me.setDateInDaysByDate('fromDt', -me.MAX_DATE_PERIOD, control.getValue());
			}
		}
		
		if (!(refs.fromDt.getValue() === null || refs.toDt.getValue() === null)) {
			me.retrieveDocValue();
		}
		
		me.updateScreenStatus();
	},
	
	onTxtJpvcTriggerClick(){
		var me = this;	
		var refs = me.getReferences();
		var params = {
			vslCallId: refs.txtJpvc.getValue()
		}
		
		me.openCodePopup('popup-vesselcalllistpopup', 'txtJpvc', params);
	},
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */
	
	/**
	 * GENERAL METHOD START
	 * =========================================================================================================================
	 */
	getSearchCondition:function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = {
			searchType 		: 'history',
			cgCoCd			: searchParm.get('cgCoCd'),
			blNo			: searchParm.get('blNo'),
			grNo			: searchParm.get('grNo'),
			vslCallId		: searchParm.get('vslCallId'),
			mfDocId			: searchParm.get('mfDocId'),
			snNo			: searchParm.get('snNo'),
			pageNo			: pageNo,
			sizePerPage 	: sizePerPage,
			sort			: grid.getSortString()
		}
		
		return params;
	},
	
	setDisableComponent:function(jpvc,masterBl,bl,sn,gr,dt){
		var me = this;
		var refs = me.getReferences();
		
		if (jpvc === null || bl === null || sn === null || gr === null || dt === null)
			return
		
		refs.txtJpvc.setDisabled(jpvc);
		refs.fieldMasterBLtxt.setDisabled(masterBl);
		refs.fieldBLtxt.setDisabled(bl);
		refs.fieldSNtxt.setDisabled(sn);
		refs.fieldGRtxt.setDisabled(gr);
		refs.fromDt.setDisabled(dt);
		refs.toDt.setDisabled(dt);
	},
	
	onSelectCategory:function(){
		var me = this;
		var refs = me.getReferences();
		
		me.updateScreenStatus();
		me.clearAllFields();
	},
	
	updateScreenStatus:function(){
		var me = this;
		var refs = me.getReferences();
		
		if (refs.cboCategory.getValue() === '' ) {
			me.setDisableComponent(1,1,1,1,1,1);
			return
		}
		
		if (refs.txtJpvc.getValue() === '' && refs.cboCategory.getValue() != 'S') {
			me.setDisableComponent(0,1,1,1,1,1);
			return
		}
		
		else if ((refs.fromDt.getValue() === null || refs.toDt.getValue() === null) && refs.cboCategory.getValue() === 'S') {
			me.setDisableComponent(1,1,1,1,1,0);
			return
		}
		
		var strCategory = refs.cboCategory.getValue();
		
		switch(strCategory){
		    default:
		    	me.setDisableComponent(1,1,1,1,1,1);
			case 'S':
				me.setDisableComponent(1,1,1,0,0,0);
				break
			case 'I':
			case 'T':
				me.setDisableComponent(0,0,0,1,1,1);
				break
			case 'E':
				me.setDisableComponent(0,1,1,0,0,1);
				break
			case 'R':
				me.setDisableComponent(0,1,1,1,1,1);
		}
	},

	onFieldFocusleave:function(){
		var me = this;
		var refs = me.getReferences();
//		var store = me.getStore('JPVCPopupStore');
		var fieldValue = refs.txtJpvc.getValue();
				
//		store.load({
//			params: {
//				vslCallId : refs.txtJpvc.getValue(),
//				mode:'textfield'
//			},
//			callback: function(records, operation, success) {
//				if (success) {
//					if(records.length == 1){
//						var returnItem = {
//								code : records[0].get('vslCallId'),
//								item : records[0]
//						}
//										
//						if(refs.txtJpvc.getValue() !== returnItem.code){
//							refs.txtJpvc.setValue(returnItem.code);	
//							
//						}						
//						
//						me.retrieveDocValue();
//					} 
//					else {
//						if(records.length == 0){
//							MessageUtil.warning('submitConfirmationSlip','vessel_jpvc_not_exist_msg');
//							refs.txtJpvc.setValue('');
//							me.updateScreenStatus();
//							return;
//						} 
//					}
//				}
//			}
//		});
	},

	afterSetCodePopupData:function(xtype, targetControl, returnValue, me, parent){
		var me = this;
		var refs = me.getReferences();
			
		if (targetControl === 'txtJpvc'){
			if(returnValue){
				//me.clearDetail();
				//me.setVesselData(returnValue.item);
				me.getMasterBlComboItems();
				me.getSnComboItems();
				me.getBlComboItems();
				me.getGrComboItems();
			}
			//me.retrieveDocValue();
			refs.txtJpvc.blur();
		}
		me.updateScreenStatus();
	},
	
	getSnComboItems: function(obj){
		var me = this;
		var refs = me.getReferences();
		var vslCallId = refs.txtJpvc.getValue();
		var snCombo = me.getStore('snListCombo');
		
		snCombo.removeAll();
		refs.fieldSNtxt.setValue('');
		snCombo.load({
			params : {
				vslCallId: vslCallId
			},
			callback: function(records, operation, success) {
				if (success) {
				}
			}
		});
	},
	
	getMasterBlComboItems: function(obj){
		var me = this;
		var refs = me.getReferences();
		var vslCallId = refs.txtJpvc.getValue();
		var masterBlCombo = me.getStore('masterBlCombo');
		
		masterBlCombo.removeAll();
		refs.fieldMasterBLtxt.setValue('');
		masterBlCombo.load({
			params : {
				vslCallId: vslCallId
			}
		});
	},
	
	getBlComboItems: function(obj){
		var me = this;
		var refs = me.getReferences();
		var vslCallId = refs.txtJpvc.getValue();
		var blCombo = me.getStore('blListCombo');
		
		blCombo.removeAll();
		refs.fieldBLtxt.setValue('');
		blCombo.load({
			params : {
				vslCallId: vslCallId
			},
			callback:function(records, success){
				if (success) {
				}
			}
		});
	},

	getGrComboItems: function(){
		var me = this;
		var refs = me.getReferences();
		var grListStore = me.getViewModel().getStore('grListCombo');
		var vslCallId = refs.txtJpvc.getValue();
		var shipgNoteNo = refs.fieldSNtxt.getValue();
		
		grListStore.removeAll();
		refs.fieldGRtxt.setValue('');
		grListStore.load({
			params: {
				vslCallId : vslCallId,
				shipgNoteNo : shipgNoteNo
			},
			callback:function(records, success){
				if (success) {					
				}
			}
		});
	},
	
	onSelectMasterBl: function(){
		var me = this;
		var refs = me.getReferences();
		var blCombo = me.getStore('blListCombo');
		
		blCombo.removeAll();
		refs.fieldBLtxt.setValue('');
		blCombo.load({
			params:{
				vslCallId: refs.txtJpvc.getValue(),
				mfDocNo: refs.fieldMasterBLtxt.getValue()
			}
		});
	},
	
	onSelectSnCombo: function(){
		var me = this;
		var refs = me.getReferences();
		var grListStore = me.getViewModel().getStore('grListCombo');
		var vslCallId = refs.txtJpvc.getValue();
		var shipgNoteNo = refs.fieldSNtxt.getValue();
		
		grListStore.removeAll();
		
		grListStore.load({
			params: {
				vslCallId : vslCallId,
				shipgNoteNo : shipgNoteNo
			},
			callback:function(records, success){
				if (success) {
				}
			}
		});
	},

	retrieveDocValue:function(){
		var me = this;
		var refs = me.getReferences();
		var snListCombo = me.getStore('snListCombo');
		var blListCombo = me.getStore('blListCombo');
		var grListCombo = me.getStore('grListCombo');
		var docList = me.getStore('docList');
		
		me.clearAllComboData();
		
		var queryParams = '';
		
		if(refs.cboCategory.getValue() === 'S') {
			queryParams = {
				searchType:'whrecnDoclist',
				category: refs.cboCategory.getValue(),
				vslCallId: 'NonCallId',
				estArrvDtFrom: refs.fromDt.getRawValue(),
				estArrvDtTo: refs.toDt.getRawValue()
			}
		}else{
			queryParams = {
				searchType:'whrecnDoclist',
				category: refs.cboCategory.getValue(),
				vslCallId: refs.txtJpvc.getValue().toUpperCase()
			}
		}

		docList.load({
			params: queryParams,
			
			callback:function(records,success){
				if(success){
					snListCombo.setData(records[0].get('snList'));
					blListCombo.setData(records[0].get('blList'));
					grListCombo.setData(records[0].get('grList'));
					me.updateScreenStatus();
				}
			}
		})
	},
	
	clearAllDisplayData:function(){
		var me = this;
		var refs = me.getReferences();
		
		refs.fromDt.setValue('');
		refs.toDt.setValue('');		
		
		if (!StringUtil.isNullorEmpty(refs.txtJpvc.getValue())){
			refs.txtJpvc.setValue('');	
		}
		
		if (!StringUtil.isNullorEmpty(refs.fieldBLtxt.getValue())){
			refs.fieldBLtxt.setValue('');	
		}
		
		if (!StringUtil.isNullorEmpty(refs.fieldSNtxt.getValue())){
			refs.fieldSNtxt.setValue('');	
		}
		
		if (!StringUtil.isNullorEmpty(refs.fieldGRtxt.getValue())){
			refs.fieldGRtxt.setValue('');	
		}
	},
	
	clearAllComboData:function(){
		var me = this;
		var refs = me.getReferences();
		var snListCombo = me.getStore('snListCombo');
		var blListCombo = me.getStore('blListCombo');
		var grListCombo = me.getStore('grListCombo');
		
		if (snListCombo.getData().length > 0){
			snListCombo.clearFilter();
			snListCombo.filter('vslCallId', refs.txtJpvc.getValue());
		}
		
		if (blListCombo.getData().length > 0){
			blListCombo.clearFilter();
			blListCombo.filter('vslCallId', refs.txtJpvc.getValue());
		}
		
		if (grListCombo.getData().length > 0){
			grListCombo.clearFilter();
			grListCombo.filter('vslCallId', refs.txtJpvc.getValue());
		}	
	},
	
	clearAllFields:function(){
		var me = this;
		
		me.clearAllDisplayData();
		me.clearAllComboData();
	},
	
	validateBeforeSearch:function(){
		var me = this;
		var refs = me.getReferences();
		var cateCode = refs.cboCategory.getValue();
		var chkResult = true;
		var invalidControl = new Array();
		var category = refs.cboCategory.getValue();
	
		for(var i = 0; i < me.SEARCH_COND.length; i++){
			var itemName = me.SEARCH_COND[i].category;
			
	    	for(var j = 0; j < itemName.length; j++){
	    		var item = refs[itemName[j]];
	    		if (item.getValue() === '' || item.getValue() === null){
					invalidControl.push(item.fieldLabel);
					chkResult = false;
				}
	    	}
	    }
		
		if(!chkResult){
			MessageUtil.warning('warning_msg', 'whHistoryValidateMsg', invalidControl);
		}
		
		return chkResult
	},

	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});