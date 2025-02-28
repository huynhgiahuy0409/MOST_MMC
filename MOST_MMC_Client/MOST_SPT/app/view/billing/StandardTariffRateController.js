Ext.define('MOST.view.billing.StandardTariffRateController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.standardtariffrate',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */

	MAIN_GRID_REF_NAME: 'refstandardtariffrateGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'standardtariffrateList',

	LIST_PROXY_URL: MOST.config.Locale.getRestApiDestUrl() + '/v1/standardtariffrate/list',
	BLANK_PROXY_URL: MOST.config.Locale.getRestApiDestUrl() + '/v1/standardtariffrate/blanklist',

	CREAT_FLAG: 'FALSE',
	UPDATE_FLAG: 'FALSE',

	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function () {
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create('MOST.model.billing.SearchStandardTariffRate');

		var searchTariffCodeCombo = me.getStore('tariffCodeCombo');
		var applyDateCombo = me.getStore('applyDateCombo');
		var gstTypeCombo = me.getStore('gstTypeCombo');
		
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({ theSearch: searchParm });
		me.updateViewStyle(me.getView());

		searchParm.set('progress', 'N');

		searchTariffCodeCombo.load();
		gstTypeCombo.load();
		applyDateCombo.load(
			{
				callback: function (records, operation, success) {
					if (success) {
						if (records && records.length > 0) {
							refs.refApplyDateCombo.setValue(records[0].data.aplyYmd);
							refs.refCopyRateApplyDateCombo.setValue(records[0].data.aplyYmd);
							refs.refApplyDateDt.setValue(records[0].get('exprYmd').split('~')[0].trim());
							refs.refExpireDateDt.setValue(records[0].get('exprYmd').split('~')[1].trim());
						}
					}
				}
			}
		);
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
	onSearch: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var params = me.getSearchCondition()

		if (params == null) {
			return;
		}

		store.getProxy().url = me.LIST_PROXY_URL;
		store.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {
					refs.refBtnCopyRate.setDisabled(true);
					refs.refCopyRateApplyDateCombo.setDisabled(true);
					refs.refApplyDateDt.setDisabled(true);
					refs.refExpireDateDt.setDisabled(true);

					records.forEach(function (record, index) {
						if (record.data.aplyYmd != "" && record.data.exprYmd != "") {
							refs.refApplyDateDt.setValue(records[index].data.aplyYmd);
							refs.refExpireDateDt.setValue(records[index].data.exprYmd);
						}
					});
					
					me.CREAT_FLAG = "FALSE";
				}
			}
		});
	},
	// Grid Add
	onAdd: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);

		refs.refBtnCopyRate.setDisabled(false);
		refs.refCopyRateApplyDateCombo.setDisabled(false);
		refs.refApplyDateDt.setDisabled(false);
		refs.refExpireDateDt.setDisabled(false);

		store.getProxy().url = me.BLANK_PROXY_URL;

		store.load(
		{
			callback: function (records, operation, success) {
				if (success) {
					refs.refApplyDateCombo.setValue(null);
					refs.refApplyDateDt.setValue(null);
					refs.refExpireDateDt.setValue(null);
					refs.refsearchTariffCodeCombo.setValue(null);

					records.forEach(function (record, index) {
						record.set("workingStatus", WorkingStatus.INSERT);
					});
					me.CREAT_FLAG = "TRUE";
				}
			}
		}
		);
	},
	
	onEdit: function (editor, context) {
		context.record.phantom = true;
		var me = this;
	},
	
	onUpdate: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);

		var editor = grid.getPlugin('standardtariffrateEditor');
		var masterItem = Ext.create('MOST.model.billing.StandardTariffRate');
		var arrItems = new Array();

		var applyDate = me.checkDate("refApplyDateDt");
		var expireDate = me.checkDate("refExpireDateDt");
		var dateCondition = me.checkFromToDate("refApplyDateDt", "refExpireDateDt");
		var duplicateDate = me.getStore('applyDateCombo');

		if (refs.refApplyDateDt.getValue() != null && refs.refApplyDateDt.getValue() != ''
			&& refs.refExpireDateDt.getValue() != null && refs.refExpireDateDt.getValue() != '') {
			refs.refBtnCopyRate.setDisabled(true);
			refs.refCopyRateApplyDateCombo.setDisabled(true);
			refs.refApplyDateDt.setDisabled(true);
			refs.refExpireDateDt.setDisabled(true);
		}

		var unitPrc = '';
		
		grid.getStore().each(function (record) {
			if (record.get('unitPrc') != '') {
				unitPrc = record.get('unitPrc');
				return false;
			}
		})
		
		me.UPDATE_FLAG = "TRUE";
		//CREAT
		if (me.CREAT_FLAG == "TRUE" && me.UPDATE_FLAG == "TRUE") {
			duplicateDate.load({
				params: {
					aplyYmd: applyDate.dateString,
					exprYmd: expireDate.dateString,
					searchTp: "DUP_CHK"
				},
				callback: function (records, operation, success) {
					if (success) {
						if (records.length > 0) {
							MessageUtil.warning("standardTariffRate", "standardtariffrate_duplicate_data_msg");

							return null;
						} else {
							if (dateCondition == null) {
								return null;
							}

							if (unitPrc == "" || unitPrc == null) {
								MessageUtil.warning("standardTariffRate", "standardtariffrate_no_new_data_msg");
								return null;
							}
							
							var stt = false;
							// CREATE, UPDATE RECORD
							store.getModifiedRecords().forEach(function (record, index, array) {

								record.set('newVersion', me.generateUuid());
								
								if (((record.data.minVal1 != "") || (record.data.minVal2 != "") || (record.data.minVal3 != "")) && record.data.unitPrc == "") {
									MessageUtil.warning("standardTariffRate", "not_Enter_Rate_msg");
								}
								
								record.data.aplyYmd = applyDate.dateString;
								record.data.exprYmd = expireDate.dateString;
								record.data.workingStatus = WorkingStatus.INSERT;
								record.data.userId = MOST.config.Token.getUserId();
								
								if (record.data.unitPrc != "") {
									arrItems.push(record.data);
								}
							});
							
							if (masterItem.dirty || arrItems.length > 0) {
								var proxy = masterItem.getProxy();
								proxy.url = me.LIST_PROXY_URL;

								masterItem.set("workingStatus", WorkingStatus.UPDATE);
								masterItem.set("items", arrItems);
								masterItem.set('newVersion', me.generateUuid());
								var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);

								var myMask = new Ext.LoadMask({
									msg: 'Please wait...',
									target: grid
								});
								myMask.show();
								masterItem.save({
									success: function () {

										me.CREAT_FLAG = "FALSE";
										masterItem.set("version", masterItem.get('newVersion'));
										masterItem.commit();
										store.reload();
										MessageUtil.saveSuccess();
										myMask.hide();
										me.onLoad();
									}
								});
							}
						}
					}
				}
			});
		} else if (me.CREAT_FLAG == "FALSE" && me.UPDATE_FLAG == "TRUE") {//Update
			if (dateCondition == null) {
				return null;
			}

			if (unitPrc == "" || unitPrc == null) {
				MessageUtil.warning("standardTariffRate", "standardtariffrate_no_new_data_msg");
				return null;
			}
			// CREATE, UPDATE RECORD
			store.getModifiedRecords().forEach(function (record, index, array) {
				record.set('newVersion', me.generateUuid());
				
				if (((record.data.minVal1 != "") || (record.data.minVal2 != "") || (record.data.minVal3 != "")) && record.data.unitPrc == "") {
					MessageUtil.warning("standardTariffRate", "not_Enter_Rate_msg");
					return null;
				}
				
				record.data.aplyYmd = applyDate.dateString;
				record.data.exprYmd = expireDate.dateString;
				
				if (record.data.trfRegNo == '') {
					record.data.workingStatus = WorkingStatus.INSERT;
				} else {
					record.data.workingStatus = WorkingStatus.UPDATE;
				}
				
				record.data.userId = MOST.config.Token.getUserId();
				
				if (record.data.unitPrc != "") {
					arrItems.push(record.data);
				}
			});
			//					To perform the save logic only when modified
			if (masterItem.dirty || arrItems.length > 0) {
				var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
				
				updateParm.getProxy().url = store.getProxy().url;
				updateParm.phantom = false;
				updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));

				updateParm.set('items', arrItems);
				updateParm.save({
					success: function () {
						MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
								function(button){
									if (button === 'ok') {
										masterItem.commit();
										store.commitChanges();
										store.reload();
										MessageUtil.saveSuccess();
									}
								});
					}
				});
			}
		}


	},

	onDblClick: function (ctx, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);

		if ((ctx.getHeaderCt().getHeaderAtIndex(cellIndex).dataIndex !== 'minVal1')
			&& (ctx.getHeaderCt().getHeaderAtIndex(cellIndex).dataIndex !== 'minVal2')
			&& (ctx.getHeaderCt().getHeaderAtIndex(cellIndex).dataIndex !== 'minVal3')
			&& (ctx.getHeaderCt().getHeaderAtIndex(cellIndex).dataIndex !== 'unitPrc')) {

			var selection = grid.getSelection() === null ? null : grid.getSelection()[0];

			me.openDetailPopup(selection, '');
		}
	},

	// Grid Row Remove
	onRemove: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var masterItem = Ext.create('MOST.model.billing.StandardTariffRate');
		var arrItems = new Array();
		var applyDate = me.checkDate("refApplyDateDt");

		//var selection = grid.getSelection() === null ? null : grid.getSelection()[0];
		//if(selection == null) return;

		MessageUtil.question('remove', 'infodelete_msg', null,
			function (button) {
				if (button === 'ok') {
					store.each(function (record, index) {
						if (record.data.aplyYmd != '' && record.data.exprYmd != '') {
							record.data.workingStatus = WorkingStatus.DELETE;
							arrItems.push(record.data);
							
							return false;
						}
					});

					//						//To perform the save logic only when modified
					if (masterItem.dirty || arrItems.length > 0) {
						var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
						
						updateParm.getProxy().url = store.getProxy().url;
						updateParm.phantom = false;
						updateParm.drop();
						updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
						updateParm.set('items', new Array());
						masterItem.set("items", arrItems);

						updateParm.get('items').push(arrItems[0]);
						updateParm.save({
							success: function () {
								store.reload();
								MessageUtil.saveSuccess();
								me.onLoad();
								me.onSearch();
							}
						});
					}
				}
			}
		);
	},

	onCopyRate: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refstandardtariffrateGrid');
		var store = me.getStore('standardtariffrateList');
		var copyStore = me.getStore('copyStandardTariffRate');
		var applyDate = me.checkDate("refCopyRateApplyDateCombo");
		var rateItems = new Array();
		
		if (applyDate.dateValue == null) {
			MessageUtil.warning("standardTariffRate", "select_applyDate_msg");
			return null;
		}
		var applyYmd, exprYmd;
		if (applyDate.dateValue != '') {
		    var dateRange = applyDate.dateValue.split("~");
		    var applyYmd = dateRange[0].trim();
		    var exprYmd = dateRange[1].trim();
		}
		copyStore.load({
			params: {
				aplyYmd: applyYmd,
				exprYmd: exprYmd
				
			},
			callback: function (records, operation, success) {
				if (success) {
					//					SUCCESS
					records.forEach(function (record, index) {
						var idx = store.findBy(function (item) {
							return (item.get('trfCd') === record.get('trfCd') &&
								item.get('subTrfCd') === record.get('subTrfCd'));
						});

						if (idx >= 0) {
							store.getAt(idx).set('unitPrc', record.get("unitPrc"));
							store.getAt(idx).set('minVal1', record.get("minVal1"));
							store.getAt(idx).set('minVal2', record.get("minVal2"));
							store.getAt(idx).set('minVal3', record.get("minVal3"));
						}
					});
				}
			}
		});
	},
	
	onSelectGSTtype: function(combo, record, eOpts) {
		var  me = this
			,grid = me.lookupReference(me.MAIN_GRID_REF_NAME)
			,selectedRecrod = grid.getSelection()[0]
		;

		selectedRecrod.set({
			gstRate: record.get('scdNm')
		});
	},
	
	onMinimumRateValidation: function(value, metaData){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refstandardtariffrateGrid');
		var selection = grid.getSelection() == null ? null: grid.getSelection();
		
		if(metaData > parseFloat(selection.at(0).get('unitPrc'))){
			selection.at(0).data.unitPrc = value.originalValue;
			return;
		}
	},
	
	onExportExcelPdfWithServer : function(gridNameString, isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.billing.SearchStandardTariffRateParm';
		searchBizParm.serviceID = 'MOST.standardTariffRate.selectStandardTariffRate'

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
	// Search Condition
	getSearchCondition: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);

		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');

		var dateCondition = me.checkFromToDate("refApplyDateDt", "refExpireDateDt");
		var params = me.createParam(searchParm);

		if (dateCondition.fromDtString == '') {
			MessageUtil.warning("standardTariffRate", "select_applyDate_msg");
			return null;
		}

		params['aplyYmd'] = dateCondition.fromDtString;
		params['trfTp'] = refs.refsearchTariffCodeCombo.getValue();
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();

		return params;
	},

	onCboApplyDtSelect: function (combo, records, eOpts) {
		var me = this;
		var refs = me.getReferences();

		refs.refApplyDateDt.setValue(records.get('exprYmd').split('~')[0].trim())
		refs.refExpireDateDt.setValue(records.get('exprYmd').split('~')[1].trim())
		refs.refCopyRateApplyDateCombo.setValue(records.data.exprYmd);
	},

	openPartnerTariffDetail: function () {

	}

	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});