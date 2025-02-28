Ext.define('MOST.view.document.ConsolDeconsolidationController', {
	extend: 'MOST.view.foundation.BaseViewController',
	alias: 'controller.consoldeconsolidation',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refConsolDeconsolidationGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'consolDeconsolidationList',
	GET_IN_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/consoldeconsolidation/updateGetInSnBl',
	GET_OUT_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/consoldeconsolidation/updateGetOutSnBl',
	getInMt: 0,
	getInM3: 0,
	getInQty: 0,
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	onLoad:function(){
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create('MOST.model.document.SearchBLParm');	
		var blComboStore = me.getStore('blCombo');
		var snComboStore = me.getStore('snCombo');
		var cargoStatusComboStore = me.getStore('cargoStatusCombo');
		
		blComboStore.load();		
		snComboStore.load();
		cargoStatusComboStore.load();
		
		me.setSearchParm(searchParm); 
		me.getViewModel().setData({theSearch:searchParm});
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
	},
	
	onSearch: function(){
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var refs = me.getReferences();
		var params = me.getSearchCondition();
		
		if((refs.ctlScn.getValue() == null || refs.ctlScn.getValue() == '') && (refs.refVslCallId.getValue() == null || refs.refVslCallId.getValue() == '')){
			MessageUtil.warning('warning_msg','cdSearchNullMsg');
			return;
		}
		
//		if((refs.refMasterBlNo.getValue() == '' || refs.refMasterBlNo.getValue() == null) 
//				&& (refs.refBookingNo.getValue() == '' || refs.refBookingNo.getValue() == null)
//				&& (refs.refSnNo.rawValue == '' || refs.refSnNo.rawValue == null)
//				&& (refs.refBlNo.getValue() == '' || refs.refBlNo.getValue() == null)){
//			MessageUtil.warning('warning_msg','cdInputDocMsg');
//			return;
//		}
		
		store.load({
			params: params,
			callback: function(records, operation, success){
				if(success){
					if(records!=undefined && records.length == 0){
						MessageUtil.noMatchData();
					}
				}
			}
		});
	},
	
	getSearchCondition:function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		
		params['vslCallId'] = refs.refVslCallId.getValue();
		params['scn'] = refs.ctlScn.getValue();
		if(refs.refMasterBlNo.getValue() != null && refs.refMasterBlNo.getValue() != ''){
			params['mfDocId'] = refs.refMasterBlNo.getValue();			
		}else{
			params['mfDocId'] = refs.refBookingNo.getValue();	
		}
		params['blNo'] = refs.refBlNo.getValue();
		params['snNo'] = refs.refSnNo.rawValue == 'Select' ? '' : refs.refSnNo.rawValue;
		params['cargoStatus'] = refs.refCargoStatusCombo.getValue();
		params['getInFromTime'] = Ext.Date.format(refs.refGetInFromTime.getValue(), 'd/m/Y H:i');
		params['getInToTime'] = Ext.Date.format(refs.refGetInToTime.getValue(), 'd/m/Y H:i');
		params['getOutFromTime'] = Ext.Date.format(refs.refGetOutFromTime.getValue(), 'd/m/Y H:i');
		params['getOutToTime'] = Ext.Date.format(refs.refGetOutToTime.getValue(), 'd/m/Y H:i');
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		
		return params;
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		var masterBlCombo = me.getStore('masterBlNoCombo');
		var bookingNoCombo = me.getStore('bookingNoCombo');
		var blNoCombo = me.getStore('blCombo');
		var snNoCombo = me.getStore('snCombo');
		
		if(targetControl === 'refVslCallId'){
			masterBlCombo.load({
				params:{
					vslCallId: refs.refVslCallId.getValue()
				}
			});
			
			bookingNoCombo.load({
				params:{
					vslCallId: refs.refVslCallId.getValue()
				}
			});
			
			blNoCombo.load({
				params:{
					vslCallId: refs.refVslCallId.getValue()
				}
			});
			
			snNoCombo.load({
				params:{
					vslCallId: refs.refVslCallId.getValue()
				}
			});
			
			refs.ctlScn.setValue(returnValue.item.get('scn'));
		} else if(targetControl === 'ctlScn'){ 
			if(returnValue){
				refs.ctlScn.setValue(returnValue.code);

				if(!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))){
					refs.refVslCallId.setValue(returnValue.item.get('vslCallId'));
					me.getViewModel().setData({theVslInfo:returnValue.item});
					me.onSearch();
				}else {
					refs.refVslCallId.setValue('');
					me.getViewModel().setData({theVslInfo:null});
				}
			} 
		}
	},
	
	onSelectBlNoCombo: function(){
		var me = this;
		var refs = me.getReferences();
		
		refs.refBookingNo.setValue('');
		refs.refSnNo.setValue('');
	},
	
	onSelectSnNoCombo: function(){
		var me = this;
		var refs = me.getReferences();
		
		refs.refMasterBlNo.setValue('');
		refs.refBlNo.setValue('');
	},
	
	onSelectMasterBlNoCombo: function(){
		var me = this;
		var refs = me.getReferences();
		
		
		refs.refBookingNo.setValue('');
		refs.refSnNo.setValue('');
	},
	
	onSelectBookingNoCombo: function(){
		var me = this;
		var refs = me.getReferences();
		
		refs.refMasterBlNo.setValue('');
		refs.refBlNo.setValue('');
	},
	
	onGetIn:function(){
		var me = this;
		var title = {type: 'bundle', key: 'getInTitlePopup'};
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];		
		
		if(selection == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}else if(selection.get('canGetIn') == 'N'){
			MessageUtil.warning('warning_msg', 'This BL/SN is existed General Operation, you can not get in');
			return;
		}else if(me.lookupReference(me.MAIN_GRID_REF_NAME).getSelection().length > 1){
			MessageUtil.warning('warning_msg', 'cdCannotGetInGetOutMultiple');
			return;
		}else if(selection.get('docStatCd') != 'RS'){
			MessageUtil.warning('warning_msg', 'cdCannotGetInMsg');
			return;
		}else{
			var selectionMulti = me.lookupReference(me.MAIN_GRID_REF_NAME).getSelection();	
			var sumMt = Number(selection.get('docMt'));
			var sumM3 = Number(selection.get('docM3'));
			var sumQty = Number(selection.get('docQty'));
			
			if(selectionMulti.length > 1){
				for(var i = 1; i < selectionMulti.length; i++){
					sumMt += Number(selectionMulti[i].get('docMt'));
					sumM3 += Number(selectionMulti[i].get('docM3'));
					sumQty += Number(selectionMulti[i].get('docQty'));
				} 
			}
			
			selection.set('docMt', sumMt);
			selection.set('docM3', sumM3);
			selection.set('docQty', sumQty);
			
			me.getViewModel().setData({theDetail:selection});
			me.getView().detailViewAlias = 'app-getinpopup';
			me.openDetailPopup(selection, title);
		}
	},
	
	onDetailLoadGetIn:function(){
		var me = this;
		var detailItem = new Ext.create('MOST.model.document.ConsolDeconsolidation');
		var whCombo = me.getStore('warehouseList');
		
		whCombo.load();
	},
	
	onGetOut:function(){
		var me = this;
		var title = {type: 'bundle', key: 'getOutTitlePopup'};
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var selectionMulti = me.lookupReference(me.MAIN_GRID_REF_NAME).getSelection();
		
		me.getInMt = Number(selection.get('balMt'));
		me.getInM3 = Number(selection.get('balM3'));
		me.getInQty = Number(selection.get('balQty'));
		
		if(selection == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}else if(selectionMulti.length > 1){
			MessageUtil.warning('warning_msg', 'cdCannotGetInGetOutMultiple');
			return;
		}else if(selectionMulti.length == 1){
			if(Number(selection.get('balMt')) <= 0){
				MessageUtil.warning('warning_msg', 'cdCannotGetOutWithOutInv');
				return;
			}
			
			if(selection.get('docStatCd') != 'ST'){
				MessageUtil.warning('warning_msg', 'cdCannotGetOutNotMultiMsg');
				return;
			}else{
				me.getViewModel().setData({theDetail:selection});
				me.getView().detailViewAlias = 'app-getoutpopup';
				me.openDetailPopup(selection, title);
			}
		}else if(selectionMulti.length > 1){
			var canGetOut = '';
			
			for(var i = 1; i < selectionMulti.length; i++){
				if(selectionMulti[i].get('docStatCd') != 'ST'){
					canGetOut = 'N';
					break;
				}
			}
			
			if(canGetOut == 'N'){
				MessageUtil.warning('warning_msg', 'cdCannotGetOutMultiMsg');
				return;
			}else{
				var sumMt = Number(selection.get('balMt'));
				var sumM3 = Number(selection.get('balM3'));
				var sumQty = Number(selection.get('balQty'));
				
				if(selectionMulti.length > 1){
					for(var i = 1; i < selectionMulti.length; i++){
						sumMt += Number(selectionMulti[i].get('balMt'));
						sumM3 += Number(selectionMulti[i].get('balM3'));
						sumQty += Number(selectionMulti[i].get('balQty'));
					} 
				}
				
				selection.set('balMt', sumMt);
				selection.set('balM3', sumM3);
				selection.set('balQty', sumQty);
				me.getViewModel().setData({theDetail:selection});
				me.getView().detailViewAlias = 'app-getoutpopup';
				me.openDetailPopup(selection, title);
			}
		}
	},
	
	onDetailLoadGetOut:function(){
		var me = this;
		var detailItem = new Ext.create('MOST.model.document.ConsolDeconsolidation');
		var whCombo = me.getStore('warehouseList');
		
		whCombo.load();
	},
	
	onSaveGetIn: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		if(refs.ctlWarehouseCombo.getValue() == null || refs.ctlWarehouseCombo.getValue() == ''){
			MessageUtil.warning('warning_msg','cdSelectWhCombo');
			return;
		}
		
		for(var i = 0; i < me.lookupReference(me.MAIN_GRID_REF_NAME).getSelection().length; i++){			
			me.lookupReference(me.MAIN_GRID_REF_NAME).getSelection()[i].set('userId', MOST.config.Token.getUserId());
			me.lookupReference(me.MAIN_GRID_REF_NAME).getSelection()[i].set('whLoc', detailItem.get('whLoc'));
			updateParm.getProxy().url = me.GET_IN_PROXY_URL;
			updateParm.set('workingStatus', 'C');
			updateParm.set('item', me.lookupReference(me.MAIN_GRID_REF_NAME).getSelection()[i].data);
			updateParm.save({
				callback: function(records, operation, success) {
					if (success) {			
						detailItem.commit();						
					}
				}
			});
			
			if(i == (me.lookupReference(me.MAIN_GRID_REF_NAME).getSelection().length - 1)){						
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
						function(button){
					if (button === 'ok') {
						me.onSearch();
						me.getDetailBizView().close();
					}
				});
			}
		}
	},
	
	onSaveGetOut: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		if(Number(detailItem.get('balMt')) > me.getInMt || Number(detailItem.get('balM3')) > me.getInM3 || Number(detailItem.get('balQty')) > me.getInQty){
			MessageUtil.warning('warning_msg','cdExceedGetInWgt');
			return;
		}
		
		for(var i = 0; i < me.lookupReference(me.MAIN_GRID_REF_NAME).getSelection().length; i++){			
			me.lookupReference(me.MAIN_GRID_REF_NAME).getSelection()[i].set('userId', MOST.config.Token.getUserId());
			updateParm.getProxy().url = me.GET_OUT_PROXY_URL;
			updateParm.set('workingStatus', 'C');
			updateParm.set('item', me.lookupReference(me.MAIN_GRID_REF_NAME).getSelection()[i].data);
			updateParm.save({
				callback: function(records, operation, success) {
					if (success) {			
						detailItem.commit();						
					}
				}
			});
			
			if(i == (me.lookupReference(me.MAIN_GRID_REF_NAME).getSelection().length - 1)){						
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
						function(button){
					if (button === 'ok') {
						me.onSearch();
						me.getDetailBizView().close();
					}
				});
			}
		}
	},
});

