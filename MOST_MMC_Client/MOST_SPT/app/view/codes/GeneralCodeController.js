Ext.define('MOST.view.codes.CodeController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.generalcode',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	
	MAIN_GRID_REF_NAME: 'refCodeGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'generalCode',	
	LARGE_CODE_COMBO_STORE: 'largeCodeCombo',
	LARGE_CODE_COMBO_CUD_STORE: 'largeCodeCombo',
	CODEINUSE_CHECK_STORE: 'codeInUseCheck',
	YES_NO_VALUE_STORE: 'yesNoValue',
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
		var systemCodeCombo = me.getStore(me.LARGE_CODE_COMBO_STORE);
		var systemCodeComboCud = me.getStore(me.LARGE_CODE_COMBO_CUD_STORE);
		
		systemCodeCombo.load();
		systemCodeCombo.commitChanges();
		
		systemCodeComboCud.load();
		systemCodeComboCud.commitChanges();
		
		var searchParm = Ext.create('MOST.model.codes.SearchGeneralCodeParm');

		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.YES_NO, me.YES_NO_VALUE_STORE); 
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
	
	onDetailLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var systemCodeStore= me.getStore('systemCodeComboCud');
		
		systemCodeStore.load();
		
		if(recvData){
			refs.refSystemCodeId.setDisabled(true);
			refs.refCodeItemId.setDisabled(true);
		}else{
			var recvData = Ext.create('MOST.model.codes.CodeMaster');
			recvData.set('useYn', 'Y');
		}
		
		me.DETAIL_REQUIRED_FIELDS = [
			'refSystemCodeId', 
			'refCodeItemId', 
			'useYnId',
			'codeItemNmId'
		];
		me.setListRequiredField(me.DETAIL_REQUIRED_FIELDS, true);
		me.getViewModel().setData({theDetail:recvData});
		me.updateViewStyle(me.getDetailBizView());
	},
	
	onSearch: function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var params = me.getSearchCondition();

		store.load({
			params: params,
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

		me.openDetailPopup();
	},

	onRemove: function() {
		var me = this;
		var refs = me.getReferences();
		var selection = refs.refCodeGrid.getSelection() == null ? null : refs.refCodeGrid.getSelection()[0];
		var storecodeInUseCheck = me.getStore(me.CODEINUSE_CHECK_STORE);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var temp;
		
		storecodeInUseCheck.load({
			params: {
				lcd: selection.data.lcd,
				mcd: selection.data.mcd
			},
			
			callback: function(records, operation, success){
				if(records.length != 0) {
					Ext.Msg.alert('Warning', TSB.locale.i18n.Bundle.instance.getMsg('datainuse_msg'));
					record.set('check',null);
				}else{
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
				}
			}
		});
	},
	
	onDblClick: function() {
		var me = this;
		var refs = me.getReferences();
		var selection = refs.refCodeGrid.getSelection() == null ? null : refs.refCodeGrid.getSelection()[0];
		
		if(selection == null) return;
		
		me.openDetailPopup(selection);
	},
	
	onGridComboRenderer:function(val, cell){
		var me = this;
		var refs = me.getReferences();
		var systemCodeCombo = me.getStore(me.LARGE_CODE_COMBO_STORE)
		
		if(cell.column.dataIndex == 'lcd'){
			if(!StringUtil.isNullorEmpty(val)){
				var indx = -1;
				indx = systemCodeCombo.find('lcd', val);

				if (indx != -1){
					return systemCodeCombo.getAt(indx).get('lcdNm'); 
				}else{
					return systemCodeCombo.getAt(0).get('lcdNm'); 
				}
			}
		}
	},
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var refs = me.getReferences();
		var searchBizParm = me.getSearchCondition();
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.codes.SearchGeneralCodeParm';
		searchBizParm.serviceID = 'MOST.generalCode.selectCodesList'

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
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		
		params['lcd'] = StringUtil.toUpperCase(searchParm.data.lcd);
        params['mcd'] = StringUtil.toUpperCase(searchParm.data.mcd);
        params['mcdNm'] = searchParm.data.mcdNm;
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
		
		return params;
	},
	combobox: function() {
		var me =this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var lcdVal = refs.cmbSystemCode.getValue();
		
		store.load({
			params: {
				lcd: lcdVal
			}
		});
	},
	
	mcombobox: function() {
		var me =this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var mcdVal = refs.cmbCode.getValue();
		var mcdNmVal = refs.txtCodeNm.getValue();
		
		store.load({
			params: {
				mcd: mcdVal,
				mcdNm: mcdNmVal
			}
		});

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
			
			me.saveProcess();
		}
	},
	
	saveProcess:function(){
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var detailItem = me.getViewModel().get('theDetail');
		var detailView = me.getDetailBizView();
		var isCreated = detailItem.phantom;
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');

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
							detailView.close();
							me.onSearch();
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