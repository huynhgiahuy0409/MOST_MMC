Ext.define('MOST.view.codes.CountryCodeController', {
    extend: 'MOST.view.foundation.BaseViewController',
    requires: [
           	],
    alias: 'controller.countryCode',
    
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
    MAIN_GRID_REF_NAME: 'refCountryCodeGrid',
    MAIN_STORE_NAME: 'countryCode',
    DETAIL_REQUIRED_FIELDS: [],
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
		var searchParm = Ext.create('MOST.model.codes.SearchCountryCodeParm');

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
	onDetailLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		
		if(recvData){
			refs.txtCountryCd.setDisabled(true);
		}else{
			var recvData = Ext.create('MOST.model.codes.CodeMaster');
		}
		
		me.DETAIL_REQUIRED_FIELDS = [
			'txtCountryCd', 
			'txtCountryNm'
		];
		
		me.getViewModel().setData({theDetail:recvData});
		me.updateViewStyle(me.getDetailBizView());
	},
	
	
	onSearch: function() {
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
	
    onAdd: function () {
        var me = this;
		var refs = me.getReferences();
		
		me.openDetailPopup();
    },
    
    onRemove: function () {
    	var me = this;
    	var refs = me.getReferences();
    	var grid = refs.refCountryCodeGrid;
        var selection = grid.getSelectionModel().getSelection()[0];
        var store = this.getStore(me.MAIN_STORE_NAME);
        var records = new Array();
        
        if(selection){
        	Ext.Msg.show({
			    title:'Remove',
			    message: 'Are you going to remove this data?',
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
											MessageUtil.saveSuccess(); // Success Message
										}
									}
								});
							}
						});
			        }
			    }
			});
        }else {
        	Ext.Msg.alert('Warning', TSB.locale.i18n.Bundle.instance.getMsg('selectdatatoremove_msg'));
        }
    },
    
    onDblclick: function () {
		var me = this;
		var refs = me.getReferences();
		var selection = refs.refCountryCodeGrid.getSelection() == null ? null : refs.refCountryCodeGrid.getSelection()[0];
		
		if(selection == null) return;
		
		me.openDetailPopup(selection);
    },
	
    onExportExcelPdfWithServer: function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.codes.SearchCountryCodeParm';
		searchBizParm.serviceID = 'MOST.countryCode.selectCountryCodes'

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
		
		params['cntryNm'] = StringUtil.toUpperCase(searchParm.data.scdNm);
		params['cntryCd'] = StringUtil.toUpperCase(searchParm.data.scd);
        params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
		
		return params;
	},
		
	onDetailSave:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theDetail');
		var countryCodeDuplicateCheck = me.getStore('countryCodeDuplicateCheck');
		
		if(detailView){
			if(me.validateDataByReference(me.DETAIL_REQUIRED_FIELDS, null) == false){
				MessageUtil.mandatoryFieldInValid();
				return;
			}
			
			countryCodeDuplicateCheck.load({
				params: {
					cntryCd: detailItem.get('cntryCd'),
				},
				callback: function(records, operation, success){
					if(records.length != 0) {
						MessageUtil.warning('warning_msg', 'duplicatedata_msg');
						return;
					}else{
						me.saveProcess();
					}
				}
			});
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

