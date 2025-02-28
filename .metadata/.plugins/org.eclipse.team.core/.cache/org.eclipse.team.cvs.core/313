Ext.define('MOST.view.document.CheckListCustomClearanceController', {
	extend: 'MOST.view.foundation.BaseViewController',

	alias: 'controller.checklistcustomclearance',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_STORE_NAME: 'customClearanceList',
	EXPORT_LIST_STORE: 'exportList',
	IMPORT_LIST_STORE: 'importList',
	TRANSHIPMENT_LIST_STORE: 'transhipmentList',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	MAX_PERIOD_DAY: 30,
	
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		
		me.setDateInDays('ctlETAFromDt',-15);
	},
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	// Search Event Handler
	onSearch:function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore(me.MAIN_STORE_NAME);
    	var exportStore = me.getStore(me.EXPORT_LIST_STORE);
    	var importStore = me.getStore(me.IMPORT_LIST_STORE);
    	var transhipmentStore = me.getStore(me.TRANSHIPMENT_LIST_STORE);
    	var params = me.getSearchCondition();
    	
		if(params == null) {
			return;
		}

		store.load({
			params: params,
			callback: function(records, ope, success){
				if(success){
					if(params.searchType == 'lorryList'){
						exportStore.setData(records);
			     	}
					
			    	if(params.searchType == 'lorryList2'){
			    		importStore.setData(records);
			     	}
			    	
			    	if(params.searchType == 'lorryList3'){
			    		transhipmentStore.setData(records);
			     	}
				}
			}
		});
		
	},
	
	onDateChange:function( control, newValue, oldValue, eOpts ) {
		var me = this;
		var refs = me.getReferences();
		var toDate = refs.ctlETAToDt.getValue();
		var fromDate = refs.ctlETAFromDt.getValue();
        var Difference_In_Time = null; 
        var Difference_In_Days = null; 
		
		if(control == refs.ctlETAFromDt){
			me.setDateInDaysByDate('ctlETAToDt', me.MAX_PERIOD_DAY, control.getValue());
		} else {
			if(control.getValue()){
				Difference_In_Time = control.getValue().getTime() - fromDate.getTime();
	    	    Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
	    	    if (Difference_In_Days > 30){
	    	    	me.setDateInDaysByDate('ctlETAFromDt', -me.MAX_PERIOD_DAY, control.getValue());
	    	    } else if (Difference_In_Days < 0){
	    	    	refs.ctlETAToDt.setValue(fromDate);
	    	    }
			}
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
     	var tabName = refs.refTabMain.getActiveTab().name;
     	var vslCallId = refs.ctlVslCallId.getValue();
     	var searchType = '';
     	var dateCondition;
     	
     	if(!refs.ctlVslCallId.getValue() && !(refs.ctlETAFromDt.getValue() && refs.ctlETAToDt.getValue())){
			MessageUtil.warning('warning_msg','Either JPVC or Date must be inputted.');
			return null;
		}
     	
     	if(refs.ctlVslCallId.getValue()){
     		refs.ctlETAFromDt.reset();
    		refs.ctlETAToDt.reset();
     	}
     	
     	if(refs.ctlETAFromDt.getValue() != null && refs.ctlETAToDt.getValue() != null){
			dateCondition = me.checkPeriodDate('ctlETAFromDt', 'ctlETAToDt', me.MAX_PERIOD_DAY, true);
        }
     	
     	
     	if(tabName == 'tabExport'){
     		searchType = 'lorryList';
     	}else if(tabName == 'tabImport'){
     		searchType = 'lorryList2';
     	}else if(tabName == 'tabTranshipment'){
     		searchType = 'lorryList3';
     	}

    	var params = {
    		vslCallId : vslCallId,	
    		searchType: searchType
		};
    	
    	if(dateCondition != null){
    		params['etaFrom'] = dateCondition.fromDtString;
    		params['etaTo'] = dateCondition.toDtString;
    	}
    	
    	return params;
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();

		if(targetControl === 'ctlVslCallId'){ // JPVC POPUP
			if(returnValue){
				me.getViewModel().setData({theJpvc:returnValue.item});
			} else {
				me.getViewModel().setData({theJpvc:null});
			}
		}
	},
	
    exportTo: function(btn) {
    	var me = this;
    	var refs = me.getReferences();
    	
    	if(refs.refTabMain.getActiveTab().name == 'tabExport'){
    		var cfg = Ext.merge({
                title: 'Check list of Customs Clearance (Export)',
                fileName: 'CheckListofCustomsClearanceExport' + '.' + (btn.cfg.ext || btn.cfg.type)
            }, btn.cfg);
            var grid = refs.refExportGrid;
            
            grid.saveDocumentAs(cfg);
    	} else if(refs.refTabMain.getActiveTab().name == 'tabImport'){
    		var cfg = Ext.merge({
                title: 'Check list of Customs Clearance (Import)',
                fileName: 'CheckListofCustomsClearanceImport' + '.' + (btn.cfg.ext || btn.cfg.type)
            }, btn.cfg);
            var grid = refs.refImportGrid;
            
            grid.saveDocumentAs(cfg);
    	} else if(refs.refTabMain.getActiveTab().name == 'tabTranshipment'){
    		var cfg = Ext.merge({
                title: 'Check list of Customs Clearance (Transhipment)',
                fileName: 'CheckListofCustomsClearanceTranshipment' + '.' + (btn.cfg.ext || btn.cfg.type)
            }, btn.cfg);
            var grid = refs.refTranshipmentGrid;
            
            grid.saveDocumentAs(cfg);
    	}
    }
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});