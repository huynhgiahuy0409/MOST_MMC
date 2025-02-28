Ext.define('MOST.view.codes.UNLocationCodeController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.unlocatioindscode',
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	
	MAIN_GRID_REF_NAME: 'refUNLocationCodeGrid',
	MAIN_STORE_NAME: 'unLocationCode',	
	COUNTRY_COMBOBOX_STORE: 'countryCombo',
	DETAIL_REQUIRED_FIELDS: [],
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onLoad:function(){
		var me = this;
		var refs = me.getReferences();
		var countryCombo = me.getStore(me.COUNTRY_COMBOBOX_STORE);
		var searchParm = Ext.create('MOST.model.codes.SearchUNLocationCodeParm');
		
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch:searchParm});
		
		countryCombo.load();
		countryCombo.commitChanges();
		
		me.updateViewStyle(me.getView());
	},
	/**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	onDetailLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var countryStore= me.getStore(me.COUNTRY_COMBOBOX_STORE);
		
		countryStore.load();
		
		if(recvData){
			refs.refColCountryName.setDisabled(true);
			refs.refColPortCode.setDisabled(true);
		}else{
			var recvData = Ext.create('MOST.model.codes.CodeMaster');
		}
		
		me.DETAIL_REQUIRED_FIELDS = [
			'refColPortCode', 
			'refColCountryName', 
			'refColPortName'
		];
		me.getViewModel().setData({theDetail:recvData});
		me.updateViewStyle(me.getDetailBizView());
	},
	
	onSearch: function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var param = me.getSearchCondition();
		
		store.load({
			params: param,
			callback: function(records, operation, success) {
				if (records.length <= 0) {
					Ext.Msg.alert('Warning', TSB.locale.i18n.Bundle.instance.getMsg('datanotfound_msg'));
				}
			}
		});
	},

	onAdd: function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		
		store.load();
		
		me.openDetailPopup();
	},

	onRemove: function() {
		var me = this;
		var refs = me.getReferences();
		var selection = refs.refUNLocationCodeGrid.getSelection() == null ? null : refs.refUNLocationCodeGrid.getSelection()[0];
		var store = me.getStore(me.MAIN_STORE_NAME);
		var temp;
		
		if(selection == null || selection == undefined){
			return;
		}
		
		Ext.Msg.show({
			title:	 MOST.getApplication().bundle.getMsg('remove'),
			message: MOST.getApplication().bundle.getMsg('removeyn_msg'),
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			fn: function(btn) {
				if (btn === 'yes') {
					store.remove(selection);
					store.sync({
						success: function(){
							store.reload({
								callback: function(records, operation, success) {
									if(success){
										var success = MOST.getApplication().bundle.getMsg('success_msg');
										var msg = MOST.getApplication().bundle.getMsg('savesuccess_msg');
										Ext.Msg.alert(success, msg);
									}
								}
							});
						}
					})
				}
			}
		});
	},
	
	onDblClick: function() {
		var me = this;
		var refs = me.getReferences();
		var selection = refs.refUNLocationCodeGrid.getSelection() == null ? null : refs.refUNLocationCodeGrid.getSelection()[0];
		
		if(selection == null) return;
		
		me.openDetailPopup(selection);
	},
	
	onRefresh: function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		
		refs.txtPortCode.setValue("");
		refs.txtPortName.setValue("");
		refs.cmbCountry.setValue("");

		store.load({
			params: {
				portCd: '',
				portNm: '',
				cntryCd: ''
			}
		});
	},
	
	onComboboxRenderer:function(val, cell){
		var me = this;
		var refs = me.getReferences();
		
		if(cell.column.dataIndex == 'cntryCd'){
			var countryCombo = me.getStore(me.COUNTRY_COMBOBOX_STORE);
			if(!StringUtil.isNullorEmpty(val)){
				var indx = -1;
				indx = countryCombo.find('cntryCd', val);

				if (indx != -1){
					return countryCombo.getAt(indx).get('cntryNm'); 
				}else{
					return countryCombo.getAt(0).get('cntryNm'); 
				}
			}
		}
	},
	
	 /**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */
	
	/**
	 * GENERAL METHOD START
	 * =========================================================================================================================
	 */
	getSearchCondition: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		
		params['portCd'] = StringUtil.toUpperCase(searchParm.data.portCd);
		params['portNm'] =  StringUtil.toUpperCase(searchParm.data.portNm);
		params['cntryCd'] =  StringUtil.toUpperCase(searchParm.data.cntryCd);
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
		
		return params;
	},
	
	onDetailSave:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theDetail');
		
		if(detailView){
			if(me.validateDataByReference(me.DETAIL_REQUIRED_FIELDS, null) == false){
				MessageUtil.mandatoryFieldInValid();
				return;
			}			
				if(me.onCheckCountry() === false){
					MessageUtil.warning('warning_msg','countryNotExistMsg');
				}else if(me.onCheckUnloCd() === false ){
					MessageUtil.warning('warning_msg','UN Location Code is existed');					
				}else{
					me.saveProcess();
				}								
		}
	},
	
	onCheckCountry: function(){
		var me = this;
		var refs = me.getReferences();
		var countryCombo = me.getStore(me.COUNTRY_COMBOBOX_STORE);
		var returnValue = true;
		
		var a = refs.refColCountryName.getValue();
		var b = countryCombo.find('scd', a);
		var c = countryCombo.find('scdNm', a);
		
		if(b === -1 && c === -1){
			returnValue = false;
		}
		
		return returnValue;
	},
	
	onCheckUnloCd: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var returnValue = true;
		
		var a = refs.refColPortCode.getValue();				
		var b = store.find('portCd', a);
		
		if(b != -1){
			returnValue = false;
		}
		
		return returnValue;
	},
	
	saveProcess:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var detailItem = me.getViewModel().get('theDetail');
		var detailView = me.getDetailBizView();
		var isCreated = detailItem.phantom;
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');

		refs.txtPortCode.setValue('')
		refs.txtPortName.setValue('')
		refs.cmbCountry.setValue('')
		
		store.load();
		
		detailItem.set('userId',MOST.config.Token.getUserId());
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = isCreated;
		updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		updateParm.set('userId', MOST.config.Token.getUserId());
		updateParm.set('item', detailItem.data);
		
		updateParm.save({
			success: function(record) {
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
					function(button){
						if (button === 'ok') {
							store.commitChanges();
							store.reload();
							me.onSearch();
							detailView.close();
						}
				});
			}
		});
		
	}
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});