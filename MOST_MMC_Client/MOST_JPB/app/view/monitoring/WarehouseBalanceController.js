Ext.define('MOST.view.monitoring.WarehouseBalanceController', {
    extend: 'MOST.view.foundation.BaseViewController',
    requires: [
           	],
    alias: 'controller.warehousebalance',
    
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
    MAIN_GRID_REF_NAME: 'refWarehouseBalance',
    MAIN_STORE_NAME: 'warehouseBalanceList',	
    WAREHOUSE_TYPE_COMBO_STORE_NAME : 'warehouseTypeCombo',
	/**
	 * =========================================================================================================================
	 * CONSTANT END
	 */

    
    /**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
    onLoad : function() {
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create('MOST.model.monitoring.SearchWarehouseBalanceParm');
		var whCombo = me.getStore('warehouseViewCombo');
		
		whCombo.load();

		var warehouseTypeCombo = me.getStore(me.WAREHOUSE_TYPE_COMBO_STORE_NAME);
		warehouseTypeCombo.load();
		
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
	onSearch: function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var params = me.getSearchCondition();
		
		if (params == null) {
			return;
		}
		
		store.load({
			params : params,
			callback : function(records, operation, success) {
				if (success) {
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					}else{
						var totalBalMt = 0;
						var totalBalM3 = 0;
						var totalBalQty = 0;
						for(var i = 0; i < store.data.length; i++){
							totalBalMt += Number(store.data.items[i].data.balMt);
							totalBalM3 += Number(store.data.items[i].data.balM3);
							totalBalQty += Number(store.data.items[i].data.balQty);
						}
						
						refs.refTotalBalMt.setValue(String(Ext.util.Format.number(parseFloat(totalBalMt),'0,000.000')));
						refs.refTotalBalM3.setValue(String(Ext.util.Format.number(parseFloat(totalBalM3),'0,000.000')));
						refs.refTotalBalQty.setValue(String(Ext.util.Format.number(parseFloat(totalBalQty),'0,000.000')));
					} 
				}
			}
		});
	},
	
	onGridItemClick:function(){
		var me = this;
		var refs = me.getReferences();
		
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;
		
		me.getViewModel().setData({item:selection});
	},
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var refs = me.getReferences();
		var searchBizParm = me.getSearchCondition();
		searchBizParm.classID = 'com.tsb.most.biz.parm.monitoring.SearchWarehouseBalanceParm';
		searchBizParm.serviceID = 'MOST.warehouseBalance.selectWarehouseBalanceItems'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
    /**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */
		
	/**
	 * GENERAL METHOD START
	 * =========================================================================================================================
	 */
	getSearchCondition : function() {
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var refs = me.getReferences();
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		var cnsneCd = refs.ctlCnsnee.getValue();
     	var locTpCd = refs.ctlWarehouseType.getValue();
		
		params['whId'] = refs.refWHId.getValue();
		params['scn'] = refs.ctlScn.getValue();
		params['mfDocId'] = refs.ctlMasterBlno.getValue();
		params['blNo'] = refs.ctlBlno.getValue();
		params['snNo'] = refs.ctlSNno.getValue();
		params['cmdtCd'] = refs.refCmdtCd.getValue();
        params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['cnsneCd'] = cnsneCd;
		params['locTpCd'] = locTpCd;
		
		return params;
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl === 'ctlVslCallId'){
			if(returnValue){
				refs.ctlScn.setValue(returnValue.item.get('scn'));
				me.getViewModel().setData({theVslInfo:returnValue.item});
				me.onLoadMasterBlCombo();
				me.onLoadBlCombo();
				me.onLoadSnCombo();
			} 
			else {
				refs.ctlScn.setValue('');
				me.getViewModel().setData({theVslInfo:null});
			}
		} else if(targetControl === 'ctlScn'){ 
			if(returnValue){
				refs.ctlScn.setValue(returnValue.code);
				me.onLoadMasterBlCombo();
				me.onLoadBlCombo();
				me.onLoadSnCombo();

				if(!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))){
					refs.ctlVslCallId.setValue(returnValue.item.get('vslCallId'));
					me.getViewModel().setData({theVslInfo:returnValue.item});
					me.onSearch();
				}else {
					refs.ctlVslCallId.setValue('');
					me.getViewModel().setData({theVslInfo:null});
				}
			} else {
				refs.ctlScn.setValue('');
				refs.ctlVslCallId.setValue('');
				me.getViewModel().setData({theVslInfo:null});
			}
		}
	},
	
	onLoadMasterBlCombo: function(){
		var me = this;
		var refs = me.getReferences();
		var masterBlNocombo = me.getStore('masterBlCombo');
		
		masterBlNocombo.removeAll();
		refs.ctlMasterBlno.setValue('');
		masterBlNocombo.load({
			params:{
				vslCallId: refs.ctlVslCallId.getValue()
			}
		});
	},
	
	onLoadBlCombo: function(){
		var me = this;
		var refs = me.getReferences();
		var blNocombo = me.getStore('BLNoList');
		
		blNocombo.removeAll();
		refs.ctlBlno.setValue('');
		blNocombo.load({
			params:{
				vslCallId: refs.ctlVslCallId.getValue()
			}
		});
	},
	
	onLoadSnCombo: function(){
		var me = this;
		var refs = me.getReferences();
		var snNocombo = me.getStore('snNoList');
		
		snNocombo.removeAll();
		refs.ctlSNno.setValue('');
		snNocombo.load({
			params:{
				vslCallId: refs.ctlVslCallId.getValue()
			}
		});
	},
	
	onSelectMasterBl: function(){
		var me = this;
		var refs = me.getReferences();
		var blCombo = me.getStore('BLNoList');
		
		blCombo.removeAll();
		refs.ctlBlno.setValue('');
		blCombo.load({
			params:{
				vslCallId: refs.ctlVslCallId.getValue(),
				mfDocNo: refs.ctlMasterBlno.getValue()
			}
		});
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
    keyup: function () {

    },
});

