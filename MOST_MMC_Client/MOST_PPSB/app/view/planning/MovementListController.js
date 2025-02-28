Ext.define('MOST.view.planning.MovementListController', {
    extend: 'MOST.view.foundation.BaseViewController',

    requires: [  
        
    ],

    alias: 'controller.movementlist',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
    MAIN_STORE_NAME: 'movementList',
    MAIN_GRID_REF_NAME: 'movementgrid',
	MAX_DATE_PERIOD : 62,	// MAX PERIOD DATE
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
//		var categoryCombo = me.getStore('categoryCombo');
		var whCombo = me.getStore('whCombo');
		var masterStoreCombo = me.getStore('masterList');
//		var mvTypeStatus = me.getStore('mvTypeStatus');
		var searchParm = Ext.create('MOST.model.planning.SearchMovementListParm');
		
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch:searchParm});
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		masterStoreCombo.load({
			params:{
				searchType: 'initComboList',
				locDivCd: 'WHO'
			},
			callback: function(records, ope, success){
				if(success){
					var arrData = records[0].data.items;
					arrData.unshift({
						locNm: 'All',
						locId: ''
			          });
					whCombo.setData(records[0].data.items);
				}
			}
		})
		
		me.setDateInDays("ctlFromDt");
		me.setDateInDays("ctlToDt",+62);

//		categoryCombo.load({
//			params: {
//				lcd : 'MT',
//				mcd : 'CATGTP'
//			},
//		});
		
//		mvTypeStatus.load({
//			params: {
//				lcd : 'MT',
//				mcd : 'JOBTP',
//			},
//			callback: function(records, operation, success) {
//				if (success) {
//					mvTypeStatus.insert(0, [{
//			        	  scdNm: 'All',
//			              scd: ''
//			          }]);
//				}
//			}
//		});
		
//		mvTypeStatus.filterBy (function(item){
//			var scd = item.get('scd');
//			var scdNm = item.get('scdNm');
//
//			if (scd === 'IA' || scd === 'IE' || scdNm === 'All' ){
//				return true
//			} 
//		
//		})	
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
    	var store = me.getStore('movementList');
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					// SUCCES
				}
			}
		});
	},
	
	// JPVC OPEN POPUP
	openJpvcPopup:function(){
		var me = this;
		me.openCodePopup('popup-vesselfindpopup', 'ctlJpvc');
	},
	// S.Agent OPEN POPUP
	openShpgAgentPopup:function(){
		var me = this;
		var params = {
			searchDivCd: 'SHA' 
		}
		me.openCodePopup('popup-partnercdpopup', 'ctlShpgAgent', params);
	},
	// F.Agent OPEN POPUP
	openFwrAgntPopup:function(){
		var me = this;
		var params = {
			searchDivCd: 'FWD' 
		}
		me.openCodePopup('popup-partnercdpopup', 'ctlFwrAgnt', params);
	},
	
	// Date Change Event
	onDateChange:function( control ) {
		var me = this;
		var refs = me.getReferences();
		
		if(control == refs.ctlFromDt){
			me.setDateInDaysByDate('ctlToDt', me.MAX_DATE_PERIOD, control.getValue());
		} else {
			me.setDateInDaysByDate('ctlFromDt', -me.MAX_DATE_PERIOD, control.getValue());
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
     	var store = me.getStore(me.MAIN_STORE_NAME);
     	var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
     	var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
    	var opeClassCd = refs.ctlCatgCd.getValue();
    	var shipgAgnt = StringUtil.toUpperCase(searchParm.data.shipgAgnt);
    	var fwrAgnt = StringUtil.toUpperCase(searchParm.data.fwrAgnt);
    	var mvTpCd = refs.ctlMvType.getValue();
    	var toLocId = refs.ctlWhCombo.getValue();
    	var vslCallId = StringUtil.toUpperCase(searchParm.data.vslCallId);
    	var scn = StringUtil.toUpperCase(searchParm.data.scn);
    	var dateCondition = me.checkPeriodDate("ctlFromDt", "ctlToDt", me.MAX_DATE_PERIOD, true);
    	
    	if(dateCondition == null){
    		return null;
    	}
    	
    	params['vslCallId'] = vslCallId;
    	params['scn'] = scn;
    	params['opeClassCd'] = opeClassCd;
    	params['mvTpCd'] = mvTpCd;
    	params['toLocId'] = toLocId;
    	params['shipgAgnt'] = shipgAgnt;
    	params['fwrAgnt'] = fwrAgnt;
    	params['searchType'] = '';
    	params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		
    	if(dateCondition != null){
    		params["stDt"] = dateCondition.fromDtString;
    		params["endDt"] = dateCondition.toDtString;
    	}
    	
    	return params;
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl === 'ctlScn'){ 
			if(returnValue){
				refs.ctlScn.setValue(returnValue.code);

				if(!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))){
					refs.ctlJpvc.setValue(returnValue.item.get('vslCallId'));
					me.getViewModel().setData({theVessel:returnValue.item});
					me.onSearch();
				}else {
					refs.ctlJpvc.setValue('');
					me.getViewModel().setData({theVessel:null});
				}
			} 
		} else if(targetControl === 'ctlJpvc'){ 
			if(returnValue){
				me.getViewModel().setData({theVessel:returnValue.item});
				refs.ctlScn.setValue(returnValue.code);
				me.onSearch();
			} else {
				me.getViewModel().setData({theVessel:null});
			}
		}
	},
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});