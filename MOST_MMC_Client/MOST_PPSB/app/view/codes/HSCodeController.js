Ext.define('MOST.view.codes.HSCodeController', 
{
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [],
	
	alias: 'controller.hscode',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refHSCodeGrid',	// Main Grid Name 
	MAIN_STORE_NAME: 'hsCodelist',				// Main Store Name	
	DUPLICATE_DETAIL_HSCODE_STORE: 'duplicateCheck',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad:function()
	{
		var me = this;
		var searchParm = Ext.create('MOST.model.codes.SearchHSCodeParm');
		
		me.setSearchParm(searchParm); 
		me.getViewModel().setData({theSearch:searchParm});
		
		me.updateViewStyle(me.getView());
	},
	
	onDetailLoad: function()
	{
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		
		if (recvData) {
			refs.txtHsCdDiv.setEditable(false);
			refs.txtHsCode.setEditable(false);
			
		} else {
			recvData = Ext.create('MOST.model.codes.HSCode');
			refs.txtHsCdDiv.setEditable(true);
			refs.txtHsCode.setEditable(true);
		}
		
		me.getViewModel().setData({theMain:recvData});
		me.updateViewStyle(detailView);
			
	},
	
	/**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	
	onSearch: function( combo, record, eOpts ) 
	{
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var params = me.getSearchCondition();

//		if (refs.txtHsCd.getValue() == '') {
//			Ext.Msg.alert('Warning', 'Please input HS Code (ex. 01)');
//			return;
//		}
		
		store.load(
		{
			params: params,
			callback: function(records, operation, success)
			{
				if(records.length == 0)
				{
					Ext.Msg.alert('Warning', TSB.locale.i18n.Bundle.instance.getMsg('datanotfound_msg'));
				}
			}
		});
	},

	onAdd: function() 
	{
		var me = this;
				
		me.getView().detailViewAlias = 'app-hscodedetail';
		me.openDetailPopup(null, 'HS Code Detail');
	},
		
	onRemove: function() 
	{
		var me = this;
		var refs = me.getReferences();
		var selection = refs.refHSCodeGrid.getSelection() == null ? null : refs.refHSCodeGrid.getSelection()[0];
		var store = me.getStore(me.MAIN_STORE_NAME);
		
		if(selection)
		{
			Ext.Msg.show(
			{
				title: MOST.getApplication().bundle.getMsg('remove'),
				message: MOST.getApplication().bundle.getMsg('removeyn_msg'),
				buttons: Ext.Msg.YESNO,
				icon: Ext.Msg.QUESTION,
				fn: function(btn) 
				{
					if (btn === 'yes') 
					{
						store.remove(selection);
						store.sync(
						{
							success: function()
							{
								store.reload(
								{
									callback: function(records, operation, success) 
									{
										if(success)
										{
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
		else
		{
			Ext.Msg.alert('Warning', TSB.locale.i18n.Bundle.instance.getMsg('selectrecordremove_msg'));
		}
	},
	
	onDblClick: function() 
	{
		var me = this;
		var refs = me.getReferences();
		var selection = refs.refHSCodeGrid.getSelection() == null ? null : refs.refHSCodeGrid.getSelection()[0];
		
		if(selection == null)
		{
			return;
		}
		
		me.getView().detailViewAlias = 'app-hscodedetail';
		me.openDetailPopup(selection, 'HS Code Detail');
	},
	
	onDetailSave:function()
	{
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theMain');
		
		if(detailItem)
		{
			if(refs.txtHsCode.getValue() =='' || refs.txtHsCdDiv.getValue() =='')
			{
				MessageUtil.mandatoryFieldInValid();
				return;
			} 
			me.saveProcess();
		} else {
			MessageUtil.mandatoryFieldInValid();
			return;
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
	
	getSearchCondition : function() 
	{
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		
		params['hsCode'] = searchParm.data.hsCd;
		params['hsCdDiv'] = searchParm.data.hsCdDiv;
		params['hsNm'] = searchParm.data.hsNm;
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		
		return params;
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue)
	{
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl == "txtDetailCode")
		{
			refs.txtDetailCode.setValue(returnValue.scd);
			refs.txtDetailName.setValue(returnValue.scdNm);
		}
	},
	
	saveProcess:function()
	{
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var duplicateCheckStore = me.getStore(me.DUPLICATE_DETAIL_HSCODE_STORE);
		var detailItem = me.getViewModel().get('theMain');
		var detailView = me.getDetailBizView();
		var isCreated = detailItem.phantom == undefined ? true : detailItem.phantom;
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		detailItem.data.staffCd = MOST.config.Token.getUserId()
//		detailItem.data.tmnlCd = MOST.config.Token.getTmnlCd()
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = isCreated;
		updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		updateParm.set('userId', MOST.config.Token.getUserId());
		updateParm.set('item', detailItem.data);
		
		if (isCreated == true) {
			duplicateCheckStore.load({
				params: {
					hsCdDiv: detailItem.data.hsCdDiv,
					hsCode: detailItem.data.hsCode,
					tmnlCd: detailItem.data.tmnlCd
				},
				callback: function(records, operation, success){
					if(success){
						if(records.length > 0){
							MessageUtil.error('warning_msg', 'duplicatedata_msg');
							return;
						} else {
							updateParm.save(
							{
								success: function(record) 
								{
									MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','', 
										function(button)
										{
											if (button === 'ok') 
											{
												store.commitChanges();
												store.reload();
												detailView.close();
											}
										}
									);
								}
							});
						}
					}
				}
			})
		} else {
			updateParm.save(
			{
				success: function(record) 
				{
					MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','', 
						function(button)
						{
							if (button === 'ok') 
							{
								store.commitChanges();
								store.reload();
								detailView.close();
							}
						}
					);
				}
			});
		}
		
		
	}
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});