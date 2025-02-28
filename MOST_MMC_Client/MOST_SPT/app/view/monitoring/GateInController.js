Ext.define('MOST.view.monitoring.GateInController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.listofgatein',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAX_DATE_PERIOD : 90,	// MAX PERIOD DATE
	MAIN_GRID_REF_NAME: 'refListOfGateInGrid',
    MAIN_STORE_NAME: 'listOfGateIn',
//	m_grGIResult = null,
//    m_doGIResult= null,
//    m_grGOResult= null,
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
		var searchParm = Ext.create('MOST.model.monitoring.SearchGateInParm');
		var whLocCombo = me.getStore('whLocCombo');
		
		whLocCombo.load();
		
		me.setDateInDays('ctlListOfGateInFromDt', -6);
		me.setDateInDays('ctlListOfGateInToDt');

		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
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
    	
    	if(params == null){
    		return;
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
	
	// Date Change Event
	onDateChange:function( control, newValue, oldValue, eOpts ) {
		var me = this;
		var refs = me.getReferences();
		var validateDate = false;
		
		if(control == refs.ctlListOfGateInFromDt){
			validateDate = me.validatePeriodDate(newValue, refs.ctlListOfGateInToDt.getValue(), me.MAX_DATE_PERIOD);

			if(!validateDate){
				me.setDateInDaysByDate('ctlListOfGateInToDt', me.MAX_DATE_PERIOD, control.getValue());
			}
		} else {
			validateDate = me.validatePeriodDate(refs.ctlListOfGateInFromDt.getValue(), newValue, me.MAX_DATE_PERIOD);
			
			if(!validateDate){
				me.setDateInDaysByDate('ctlListOfGateInFromDt', -me.MAX_DATE_PERIOD, control.getValue());
			}
		}
	},
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var refs = me.getReferences();
		var searchBizParm = me.getSearchCondition();
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.monitoring.SearchGateInParm';
		searchBizParm.serviceID = 'MOST.gateIn.selectListOfGateIn'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	// Popup is closed and receives return value
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl === 'ctlListOfGateInJpvc'){ // JPVC Popup
			if(returnValue){
				me.getViewModel().setData({theVsl:returnValue.item});
				
				me.getMasterBlCombo(returnValue.code);
				me.getSnCombo(returnValue.code);
				me.getBlCombo(returnValue.code);
			} else {
				me.getViewModel().setData({theVsl:null});
				
				me.getMasterBlCombo('');
				me.getSnCombo('');
				me.getBlCombo('');
			}
		}
	},
	
	// Search Condition
	getSearchCondition: function(){
		var me = this;
     	var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		var vslCallId = StringUtil.toUpperCase(searchParm.data.vslCallId);
		var mfDocId = StringUtil.toUpperCase(searchParm.data.mfDocId);
    	var dateCondition = me.checkPeriodDate('ctlListOfGateInFromDt', 'ctlListOfGateInToDt', me.MAX_DATE_PERIOD, false);
    	
		params['shipgNoteNo'] = StringUtil.toUpperCase(searchParm.data.shipgNoteNo);
		params['fwrAgnt'] = StringUtil.toUpperCase(searchParm.data.fwrAgnt);
		params['blNo'] = StringUtil.toUpperCase(searchParm.data.blNo);
		params['lorryNo'] = StringUtil.toUpperCase(searchParm.data.lorryNo);
		params['vslCallId'] = vslCallId;
		params['mfDocId'] = mfDocId;
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['searchType'] = 'GateIn';
		params['sort'] = grid.getSortString();
		
    	if(dateCondition == null){
    		return null;
    	}
    	
    	if(dateCondition.isEmpty &&
    	    StringUtil.isNullorEmpty(vslCallId)){
    		MessageUtil.warning('warning_msg', 'listofgatein_search_condigin_msg');
    		return null;
    	}
    	
    	if(dateCondition != null){
    		params['gateInStDt'] = Ext.Date.format(dateCondition.fromDt, 'd/m/Y H:i');
    		params['gateInEndDt'] = Ext.Date.format(dateCondition.toDt, 'd/m/Y H:i');
    	}
    	
    	return params;
	},
	
	exportTo: function(btn) {
    	var me = this;
    	var refs = me.getReferences();
        var cfg = Ext.merge({
            title: 'List Of Gate In',
            fileName: 'ListOfGateIn' + '.' + (btn.cfg.ext || btn.cfg.type)
        }, btn.cfg);
        var grid = refs.refListOfGateInGrid;
        
        grid.saveDocumentAs(cfg);
    },
	
    onSelectMasterBl: function(){
		var me = this;
		var refs = me.getReferences();
		var blCombo = me.getStore('listOfGateInBlNoCombo');
		
		blCombo.removeAll();
		refs.ctlListOfGateInBlNoCombo.setValue('');
		blCombo.load({
			params:{
				vslCallId: refs.ctlListOfGateInJpvc.getValue(),
				mfDocNo: refs.ctlListOfGateInMasterBlNoCombo.getValue()
			}
		});
	},
    
    getMasterBlCombo: function(vslCallId){
		var me = this;
		var refs = me.getReferences();
		var masterBlCombo = me.getStore('masterBlCombo');
		
		masterBlCombo.load({
			params:{
				vslCallId : vslCallId,
				tyCd: CodeConstants.MT_CGTP_BBK
			}
		})
	},
    
	getBlCombo: function(vslCallId){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('listOfGateInBlNoCombo');
		
		store.load({
			params:{
				vslCallId : vslCallId,
				tyCd: CodeConstants.MT_CGTP_BBK
			}
		})
	},
	
	getSnCombo: function(vslCallId){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('listOfGateInSnNoCombo');
		
		store.load({
			params: {
				vslCallId: vslCallId,
				tyCd: CodeConstants.MT_CGTP_BBK
			}
		});
	},
	
	onSelectSnCombo: function(){
		var me = this;
		var refs = me.getReferences();
		
		if(refs.ctlListOfGateInSnNoCombo.getValue() != null && refs.ctlListOfGateInSnNoCombo.getValue() != ''){
			refs.ctlListOfGateInBlNoCombo.setValue('');
		}
	},
	
	onSelectBlCombo: function(){
		var me = this;
		var refs = me.getReferences();
		
		if(refs.ctlListOfGateInBlNoCombo.getValue() != null && refs.ctlListOfGateInBlNoCombo.getValue() != ''){
			refs.ctlListOfGateInSnNoCombo.setValue('');
		}
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});