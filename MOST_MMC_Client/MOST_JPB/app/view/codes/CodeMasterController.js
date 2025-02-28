Ext.define('MOST.view.codes.CodeMasterController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],
	
	alias: 'controller.codeMaster',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refDetailCodeGrid',			// Main Grid Name 
	MAIN_STORE_NAME: 'codeMaster',
	LARGE_CODE_COMBO_STORE: 'largeCodeCombo',
	MIDDLE_CODE_COMBO_STORE: 'middleCodeCombo',
	LARGE_CODE_COMBO_FOR_GRID_STORE: 'largeCodeComboForGrid',
	MIDDLE_CODE_COMBO_FOR_GRID_STORE: 'middleCodeComboForGrid',
	YES_NO_VALUE_STORE: 'yesNoValue',
	DUPLICATE_DETAIL_CODE_STORE: 'duplicateDetailCodeCheck',
	DETAIL_REQUIRED_FIELDS: [],
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad:function(){
		var me = this;
		var refs = me.getReferences();
		var largeCodeCombo = me.getStore(me.LARGE_CODE_COMBO_STORE);
		var largeCodeComboForGrid = me.getStore(me.LARGE_CODE_COMBO_FOR_GRID_STORE);
		
		var middleCodeCombo = me.getStore(me.MIDDLE_CODE_COMBO_STORE);
		var middleCodeComboForGrid = me.getStore(me.MIDDLE_CODE_COMBO_FOR_GRID_STORE);
		
		largeCodeCombo.load();
		largeCodeCombo.commitChanges();
		
		middleCodeCombo.load();
		middleCodeCombo.commitChanges();
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.YES_NO, me.YES_NO_VALUE_STORE);
		middleCodeComboForGrid.commitChanges();
		
		var searchParm = Ext.create('MOST.model.codes.SearchCodeMasterParm');

		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
	},
	
	onDetailLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var systemCodeStore= me.getStore(me.LARGE_CODE_COMBO_FOR_GRID_STORE);
		var middleCodeStore= me.getStore(me.MIDDLE_CODE_COMBO_STORE);
		
		systemCodeStore.load();
		middleCodeStore.load();
		
		if(recvData){
			refs.refSystemCodeId.setDisabled(true);
			refs.refCodeId.setDisabled(true);
			refs.txtDetailCodeDetail.setEditable(false);
		}else{
			var recvData = Ext.create('MOST.model.codes.CodeMaster');
			recvData.set('useYn', 'Y');
		}
		
		me.DETAIL_REQUIRED_FIELDS = [
			'refSystemCodeId', 
			'cmbCodeEditor',
			'refTxtDetailName', 
			'txtDetailCodeDetail'
		];
		
		me.setListRequiredField(me.DETAIL_REQUIRED_FIELDS, true);
		
		me.getViewModel().setData({theDetail:recvData});
		me.updateViewStyle(me.getDetailBizView());
	},
	
	/**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
    /**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	
	onSearch: function( combo, record, eOpts ) {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.getSearchCondition();

		if (combo && combo.reference == 'cmbSystemCode') {
			refs.cmbCode.setValue();
			var mStore = me.getStore('middleCodeCombo');
			mStore.load({
				params: {
					lcd: searchParm.data.lcd
				},
				callback: function(records, operation, success){
					if(records.length == 0){
						Ext.Msg.alert('Warning', TSB.locale.i18n.Bundle.instance.getMsg('datanotfound_msg'));
				    }
				}
			}); 
		}
		
		store.load({
			params: params,
			callback: function(records, operation, success){
				if(records.length == 0){
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
	
	onSelectSystemCode: function( combo, record, eOpts ) {
		var me = this;
		var refs = me.getReferences();
		var lcdVal = combo.getValue();
		this.lookupReference('cmbCodeEditor').setValue();
		var mStore = me.getStore(me.MIDDLE_CODE_COMBO_STORE);
		
		if(!mStore) return;
		
		mStore.load({
			params: {
				lcd: lcdVal
			}
		}); 
		mStore.commitChanges();
	},
	
	onSelectCodeEditor: function( combo, record, eOpts ) {
		var me = this;
		var refs = me.getReferences();
		var mcd = combo.getValue();
		var mcStore = me.getStore(me.MIDDLE_CODE_COMBO_STORE);
		
		if(!mcStore) return;
		
		mcStore.load({
			params: {
				mcd: mcd
			},
			callback: function(records, operation, success){
				if(records.length == 1){
					me.lookupReference('cmbCodeEditor').setValue(records[0].get('mcd'));
			    }
			}
		}); 
	},
	
	onRemove: function() {
		var me = this;
		var refs = me.getReferences();
		var selection = refs.refDetailCodeGrid.getSelection() == null ? null : refs.refDetailCodeGrid.getSelection()[0];
		var store = me.getStore(me.MAIN_STORE_NAME);
		
		if(selection){
			Ext.Msg.show({
				   title:  MOST.getApplication().bundle.getMsg('remove'),
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
		}else{
			Ext.Msg.alert('Warning', TSB.locale.i18n.Bundle.instance.getMsg('selectdatatoremove_msg'));
		}
	},
	
	onDblClick: function() {
		var me = this;
		var refs = me.getReferences();
		var selection = refs.refDetailCodeGrid.getSelection() == null ? null : refs.refDetailCodeGrid.getSelection()[0];
		
		if(selection == null) return;
		
		me.openDetailPopup(selection);
	},
	
	onActivate:function(){
		var systemCodeCombo = this.getStore(me.LARGE_CODE_COMBO_STORE);
		
		systemCodeCombo.load();
	},
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var refs = me.getReferences();
		var searchBizParm = me.getSearchCondition();
		searchBizParm.classID = 'com.tsb.most.biz.parm.codes.SearchCodeMasterParm';
		searchBizParm.serviceID = 'MOST.codeMaster.selectCodeMasterSmallCodeList'

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
		
		params['scd'] = StringUtil.toUpperCase(searchParm.data.scd);
        params['scdNm'] = StringUtil.toUpperCase(searchParm.data.scdNm);
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
		
		return params;
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl == "refTxtDetailCode"){
			refs.refTxtDetailCode.setValue(returnValue.scd);
			refs.refTxtDetailName.setValue(returnValue.scdNm);
		}
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
		var duplicateStore = me.getStore(me.DUPLICATE_DETAIL_CODE_STORE);
		var detailItem = me.getViewModel().get('theDetail');
		var detailView = me.getDetailBizView();
		var isCreated = detailItem.phantom;
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		detailItem.set('userId',MOST.config.Token.getUserId());
		
		duplicateStore.load({
			params: {
				scd: detailItem.data.scd,
				lcd: detailItem.data.lcd,
				mcd: detailItem.data.mcd
			},
			callback: function(records, operation, success){
				if(success){
					if(records.length > 0 && detailItem.crudState == 'C'){
						MessageUtil.error('warning_msg', 'duplicate_true');
						return;
				    } else {
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
				}
			}
		}); 
	}
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});