Ext.define('MOST.view.monitoring.InterfaceLogListController', {
	extend : 'MOST.view.foundation.BaseViewController',
	alias : 'controller.interfaceLogList',
	requires : [],

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME : 'refInterfaceLogListGrid', // Main Grid Name
	MAIN_STORE_NAME : 'interfaceLogList', // Main Store Name
	
	SYSTEM_TYPE_STORE_NAME : 'systemTypeCombo',
	MESSAGE_TYPE_STORE_NAME : 'messageTypeCombo',
	TRANS_TYPE_STORE_NAME: 'transTypeCombo',
	INTERFACE_STATUS_STORE_NAME: 'statusCombo',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var systemTypeCombo = me.getStore(me.SYSTEM_TYPE_STORE_NAME);
		var messageTypeCombo = me.getStore(me.MESSAGE_TYPE_STORE_NAME);
		
		var searchParm = Ext.create('MOST.model.monitoring.SearchInterfaceLogList');
		var theDetail = Ext.create('MOST.model.monitoring.InterfaceLogList');

		me.setComboBoxWithLocalCache(CacheServiceConstants.SYSTEM_TYPE_COMBO, me.SYSTEM_TYPE_STORE_NAME);
		me.setComboBoxWithLocalCache(CacheServiceConstants.TRANS_TYPE_COMBO, me.TRANS_TYPE_STORE_NAME);
		me.setComboBoxWithLocalCache(CacheServiceConstants.INTERFACE_STATUS_COMBO, me.INTERFACE_STATUS_STORE_NAME);
		
		systemTypeCombo.insert(0, [{code: '', codeName: 'Select'}]);
		systemTypeCombo.commitChanges();

		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch: searchParm});
		
		me.getViewModel().setData({theDetail: theDetail});
		
		me.updateViewStyle(me.getView());
	},
	
	onAfterChange: function(control, newValue, oldValue) {
		var me = this;
		var ctlMsgType = me.lookupReference('ctlMsgType');
		var parm = '';
		
		if (newValue === 'R') {	//Receive
			parm = PopupServiceConstants.INTERFACE_RECV_MSG_TYPE;
		}
		else {					//Send
			parm = PopupServiceConstants.INTERFACE_SEND_MSG_TYPE;
		}
		
		ctlMsgType.refreshStore(parm);
	},
	
	onAfterStoreDataLoad: function(control, records, successful, operation, eOpts) {
		var me = this;
		var ctlMsgType = me.lookupReference('ctlMsgType');
		
		ctlMsgType.setValue('*');
	},
	
	onCboTransType_change: function(ele, rec, idx){
		var me = this;
		var refs = me.getReferences();
		var systemTypeStore = me.getStore('systemTypeCombo');
		var transType = refs.ctlTransType.getValue();
		var sysTp = refs.ctlSysType.getValue();
		var trnsArr = new Array();
		
		refs.ctlSysType.setValue('');
		systemTypeStore.clearData();	
		systemTypeStore.commitChanges();
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.SYSTEM_TYPE_COMBO, me.SYSTEM_TYPE_STORE_NAME);
		
		if(transType == PopupServiceConstants.INTERFACE_RECV_MSG_TYPE){
			systemTypeStore.filter([{
				filterFn: function(item) {
					if(item.get('code') != 'FS'){
						trnsArr.push(item.data);
					}
			    }
	    	}]);
			
		} else if(transType == PopupServiceConstants.INTERFACE_SEND_MSG_TYPE || transType == ''){
			systemTypeStore.filter([{
				filterFn: function(item) {
					trnsArr.push(item.data);
			    }
	    	}]);
		}
		
		systemTypeStore.setData(trnsArr);
		systemTypeStore.commitChanges();
		systemTypeStore.clearFilter();
	},
	
	onCboSystemType_change: function(ele, rec, idx){
		var me = this;
		var refs = me.getReferences();
		var systemTypeStore = me.getStore('systemTypeCombo');
		var messageTypeStore = me.getStore('messageTypeCombo');
		var sysTp = refs.ctlSysType.getValue();
		var transType = refs.ctlTransType.getValue();
		var msgArr = new Array();
		
		refs.ctlMsgType.setValue('');
		messageTypeStore.clearData();	
		messageTypeStore.commitChanges();
		
     	if(!StringUtil.isNullorEmpty(sysTp)){
			if(transType == PopupServiceConstants.INTERFACE_RECV_MSG_TYPE){
				
				me.setComboBoxWithLocalCache(CacheServiceConstants.RECEIVE_MESSAGE_TYPE_COMBO, me.MESSAGE_TYPE_STORE_NAME);
				messageTypeStore.filter([{
					filterFn: function(item) {
				    	if(sysTp == 'AG'){
							if(item.get('code') == 'GATEDT'){
								msgArr.push(item.data);
							}
							
						} else if(sysTp == 'WB'){
							if(item.get('code') == 'OPEWGT'){
								msgArr.push(item.data);
							}
							
						} else if(sysTp == 'HG'){
							if(item.get('code') == 'CGWGT'){
								msgArr.push(item.data);
							}
						}
				    }
		    	}]);
				
			} else if(transType == PopupServiceConstants.INTERFACE_SEND_MSG_TYPE){
				
				me.setComboBoxWithLocalCache(CacheServiceConstants.SEND_MESSAGE_TYPE_COMBO, me.MESSAGE_TYPE_STORE_NAME);
				messageTypeStore.filter([{
					filterFn: function(item) {
				    	if(sysTp == 'AG'){
							if(item.get('code') == 'TRKCHS'  || item.get('code') == 'TAM' 
								|| item.get('code') == 'DRI' || item.get('code') == 'COMOPR'){
								msgArr.push(item.data);
							}
							
						} else if(sysTp == 'WB'){
							if(item.get('code') == 'TRKCHS' || item.get('code') == 'TAM' ){
								msgArr.push(item.data);
							}
							
						} else if(sysTp == 'HG'){
							if(item.get('code') == 'CGI'){
								msgArr.push(item.data);
							}
							
						} else if(sysTp == 'FS'){
							if(item.get('code') == 'INV' || item.get('code') == 'COM'){
								msgArr.push(item.data);
							}
						}
				    }
		    	}]);
			} else if(transType == ''){
				
				me.setComboBoxWithLocalCache(CacheServiceConstants.ALL_MESSAGE_TYPE_COMBO, me.MESSAGE_TYPE_STORE_NAME);
				messageTypeStore.filter([{
					filterFn: function(item) {
				    	if(sysTp == 'AG'){
							if(item.get('code') == 'TRKCHS'  || item.get('code') == 'TAM' 
								|| item.get('code') == 'DRI' || item.get('code') == 'COMOPR'
								|| item.get('code') == 'GATEDT'){
								msgArr.push(item.data);
							}
							
						} else if(sysTp == 'WB'){
							if(item.get('code') == 'TRKCHS' || item.get('code') == 'TAM'
								|| item.get('code') == 'OPEWGT'){
								msgArr.push(item.data);
							}
							
						} else if(sysTp == 'HG'){
							if(item.get('code') == 'CGI' || item.get('code') == 'CGWGT'){
								msgArr.push(item.data);
							}
							
						} else if(sysTp == 'FS'){
							if(item.get('code') == 'INV' || item.get('code') == 'COM'){
								msgArr.push(item.data);
							}
						}
				    }
		    	}]);
			}
     	}
     	
     	messageTypeStore.setData(msgArr);
		messageTypeStore.commitChanges();
     	messageTypeStore.clearFilter();
     	messageTypeStore.insert(0, [{code: '', codeName: 'ALL'}]);
	},
	/**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	onSearch: function(control) {
		var me = this;
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
					}
				}
			}
		});
	},
	
	onChecked : function (model, record, index, eOpts) {
		if(record.data.itChk){
			record.data.itChk=false;
		} else{
			record.data.itChk=true;
		}
    },

	onSelectionchange: function(control, selected, eOpts) {
		var me = this;
        var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selections = grid.getSelection();
		var refs = me.getReferences();
		var theDetail;

		if (selections === null || selections.length === 0) {
			theDetail = Ext.create('MOST.model.monitoring.InterfaceLogList');
		}
		else {
			theDetail = selections[0];
		}
		
		me.getViewModel().setData({ 
			theDetail: theDetail 
		});
	},

	// onExportExcelPdfWithServer : function(gridNameString, isExcel) {
	// 	 var me = this;
	// 	 var searchBizParm = me.getSearchCondition();
	// 	 searchBizParm.classID = 'com.tsb.web.webip.bizparm.interfacelog.SearchInterfaceLogParm'
	// 	 searchBizParm.serviceID = 'WO.kpctInterfaceLog.searchInterfaceLogItems'
		
	// 	 me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	// },
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */

	/**
	 * GENERAL METHOD START
	 * =========================================================================================================================
	 */
	getSearchCondition: function() {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);		
		var dateCondition = me.checkFromToDateTime("ctlFromDate", "ctlToDate");
		
		params['transType'] = searchParm.get('transType');
		params['sysType'] = searchParm.get('sysType');
		params['msgType'] = searchParm.get('msgType') === '*' ? '' : searchParm.get('msgType');
		params['status'] = searchParm.get('status');
		params['request'] = searchParm.get('request');
		params['response'] = searchParm.get('response');
		
		if (dateCondition !== undefined && dateCondition !== null) {
			params['fromDate'] = dateCondition.fromDtString;
			params['toDate'] = dateCondition.toDtString;	
		}
		
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();

		return params;
	},
	
	setDisplayValue: function(record) {
		var me = this;
		var ctlMsgType = me.lookupReference('ctlMsgType');
		var codeType;
		var msgTypeDesc;
		
		codeType = CacheServiceConstants.INTERFACE_LOG_TRANS_TYPE;
		record.set('displayTransType', MOST.util.LocalCacheServiceUtil.getLocalCacheItemsForCodeName(codeType, record.get('transType')));
		
		codeType = CacheServiceConstants.INTERFACE_LOG_APPLY_STATUS;
		record.set('displayApplyStatus', MOST.util.LocalCacheServiceUtil.getLocalCacheItemsForCodeName(codeType, record.get('applyStatus')));
		
		ctlMsgType.getStore().data.items.forEach(function (codeItem) {
			if(codeItem.get('code') == record.get('msgType')){ 
				msgTypeDesc = codeItem.get('codeName');
				return;
			}
		});
		
		record.set('displayMsgType', msgTypeDesc);
	},
	
	onReSendMessage: function(){
    	var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var arrItems = new Array();
		var masterItem = Ext.create('MOST.model.monitoring.InterfaceLogList');
		var params = me.getSearchCondition();
		var recvChk = false;
		var sucMsgChk = false;
		
    	if(params == null){
    		return;
    	}
    	
		store.each(function(record,index){
			if(record.data.itChk){
				if(record.get('applyStatus') == 'Success'){
					sucMsgChk = true;
				}
				
				if(record.get('transType') == 'Received'){
					recvChk = true;
				}
				
				record.set('userId', MOST.config.Token.getUserId());
				arrItems.push(record.data);
			}
		});
		
		if(recvChk){
			MessageUtil.warning("Intterface Log Monitoring",'interfaceLog_include_receiveMsg');
			return;
		}
		
		if(sucMsgChk){
			MessageUtil.warning("Intterface Log Monitoring",'interfaceLog_include_successMsg');
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
							}
						}
					});
				}
			});
		}
	}
/**
 * GENERAL METHOD END
 * =========================================================================================================================
 */
});