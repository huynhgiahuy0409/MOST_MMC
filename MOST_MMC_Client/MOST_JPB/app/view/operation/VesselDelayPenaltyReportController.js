Ext.define('MOST.view.operation.VesselDelayPenaltyReportController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
        'Ext.exporter.text.CSV',
        'Ext.exporter.text.TSV',
        'Ext.exporter.text.Html',
        'Ext.exporter.excel.Xml',
        'Ext.exporter.excel.Xlsx'
    ],

	alias: 'controller.vesseldelaypenaltyreport',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAX_DATE_PERIOD: 7,	// MAX PERIOD DATE
	MAIN_GRID_REF_NAME: 'refVesselDelayPenaltyReportGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'vesselDelayPntyList',
	SHIFT_COMBO_STORE_NAME: 'shiftCombo',
	HATCH_COMBO_STORE_NAME: 'hatchNoCombo',
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
	onLoad: function () {
		var me = this;
		var refs = me.getReferences();
		// var comboStore = me.getStore('vesselDelayPntyCombo');
		var hatchNoStore = me.getStore(me.HATCH_COMBO_STORE_NAME);
		var shiftStore = me.getStore(me.SHIFT_COMBO_STORE_NAME);
		var particularsStore = me.getStore('particularsCombo');
		var roleStore = me.getStore('roleComboVesselDelay');
		var machineCombo = me.getViewModel().getStore('machineCombo');

		hatchNoStore.load();
		shiftStore.load({
			callback: function (records, operation, success) {
				if (success) {
					console.log('shiftStore', records);
				}
			}
		});
		particularsStore.load({
			params: {
				lcd: "MT",
				mcd: "ITEMCD",
				scdUse: "Y"
			},
			callback: function (records, operation, success) {
				if (success) {
					console.log('particularsStore', records);
				}
			}
		});

		roleStore.load({
			params: {
				lcd: "CM",
				mcd: "ROLECD",
				scdUse: "Y"
			},
			callback: function (records, operation, success) {
				if (success) {
					roleStore.filterBy(function (record) {
						return record.get('scd') === 'GW' || record.get('scd') === 'SS';
					});
				}
			}
		});

		machineCombo.load({
			callback: function (records, operation, success) {
				if (success) {
					machineCombo.insert(0, [{ name: 'Select', code: '' }]);
				}
			}
		});
		var searchParm = Ext.create('MOST.model.operation.SearchVesselDelayPenaltyReportParm');
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({ theSearch: searchParm });
		// });
	},
	onDetailLoad: function () {
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;

		if (recvData) {
			
		} else {
			var recvData = Ext.create('MOST.model.operation.VesselDelayPenaltyReport');
			//recvData.set('useYn', 'Y');
		}

		me.DETAIL_REQUIRED_FIELDS = [
			'ctlPntyDtDetail',
			'ctlParticularsComboDetail',
			'ctlVslPnRptDelayCodeDetail',
			'ctlContractorDetail'
		];

		me.setListRequiredField(me.DETAIL_REQUIRED_FIELDS, true);


		refs.ctlPntyDtDetail.setValue(recvData.get('pntyDt'));
		refs.ctlStDtDetail.setValue(recvData.get('pntyTime'));
		refs.ctlEndDtDetail.setValue(recvData.get('pntyEndTime'));

		me.getViewModel().setData({ theDetail: recvData });
		if (recvData) {
			if (recvData.get('itemCd') == 'SWL' || recvData.get('itemCd') == 'Start Work Late' 
				|| recvData.get('itemCd') == 'Stop Work Early' || recvData.get('itemCd') == 'SWE') {
				me.changeParticularsEvent();
			}
		}
		me.updateViewStyle(me.getDetailBizView());
	},

	onDetailSave: function () {
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theDetail');

		if (detailView) {
			if(StringUtil.isNullorEmpty(refs.ctlDetailJpvc.getValue())){
				MessageUtil.warning('fail_msg', "requiredJpvcmessage");
				return;
			}
			if (me.validateDataByReference(me.DETAIL_REQUIRED_FIELDS, null) == false) {
				MessageUtil.mandatoryFieldInValid();
				return;
			}

			me.saveProcess();
		}
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
		var store = me.getStore('vesselDelayPntyList');
		var params = me.getSearchCondition();
		refs.refDPRNo.setValue('');
		refs.refContractorName.setValue('');
		refs.refPenalty.setValue('');


		if (params == null) {
			return;
		}

		store.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {
					console.log('onsearchResult', records);
				}
			}
		});
	},
	onGridClick: function () {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var refs = me.getReferences();

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];

		if (selection == null) return;

		refs.refDPRNo.setValue(selection.get('dlyPntyRptNo'));
		refs.refContractorName.setValue(selection.data.contrator);
		refs.refPenalty.setValue(selection.data.unitPrc);

		refs.refBtnDelete.setDisabled(false);
	},
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */

	saveProcess: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		//var duplicateStore = me.getStore(me.DUPLICATE_DETAIL_CODE_STORE);
		var detailItem = me.getViewModel().get('theDetail');
		var theVslDetail = me.getViewModel().get('theVslDetail');
		var detailView = me.getDetailBizView();
		var isCreated = detailItem.phantom;
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');

		detailItem.set('userId', MOST.config.Token.getUserId());

		
		var pntyDt = refs.ctlPntyDtDetail.getValue();
		var pntyTime = refs.ctlStDtDetail.getValue();
		var pntyEndTime = refs.ctlEndDtDetail.getValue();

		var pntyDtString = pntyDt == null ? null : Ext.Date.format(pntyDt, MOST.config.Locale.getShortDate());
		var pntyTimeString = pntyTime == null ? null : Ext.Date.format(pntyTime, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var pntyEndTimeString = pntyEndTime == null ? null : Ext.Date.format(pntyEndTime, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());

		detailItem.set('pntyDt', pntyDtString);
		detailItem.set('pntyTime', pntyTimeString);
		detailItem.set('pntyEndTime', pntyEndTimeString);

		detailItem.set('vslCallId', theVslDetail.get('vslCallId'));
		detailItem.set('scn', theVslDetail.get('scn') == null ? '' : theVslDetail.get('scn'));

		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = isCreated;
		updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		updateParm.set('userId', MOST.config.Token.getUserId());
		updateParm.set('item', detailItem.data);

		updateParm.save({
			success: function (record) {
				MessageUtil.show(Ext.Msg.INFO, 'success_msg', 'savesuccess_msg', '',
					function (button) {
						if (button === 'ok') {
							store.commitChanges();
							store.reload();
							me.onSearch();
							detailView.close();
						}
					});
			}
		});

	},

	onAdd: function () {
		var me = this;
		var refs = me.getReferences();

		me.openDetailPopup();

	},

	// 	// Grid Edit
	onEdit: function (editor, context) {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var editor = grid.getPlugin('vesselDelayPenaltyReportEditor');
		var shiftListStore = me.getStore(me.SHIFT_COMBO_STORE_NAME);
		var particularsStore = me.getStore('particularsCombo');
		var machineComboStore = me.getStore('machineCombo');
		var searchParm = me.getViewModel().get('theSearch');

		var store = me.getStore(me.MAIN_STORE_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if (selection == null) return;

		var pntyDt = refs.refPntyDt.getEditor().lastValue;
		var startDt = refs.refStDt.getEditor().lastValue;
		var endDt = refs.refEndDt.getEditor().lastValue;

		var ptnyDscr = refs.refVesselDelayPenalty.getEditor().getValue();
		var shftId = editor.grid.down('[dataIndex=shftNm]').getEditor().getValue();
		var shift = shiftListStore.findRecord('shftId', shftId);
		if (shift == null || shift == '') {
			shift = shiftListStore.findRecord('shftNm', shftId);
		}

		var itemCd = editor.grid.down('[dataIndex=itemCdNm]').getEditor().getValue();
		var item = particularsStore.findRecord('scd', itemCd);
		if (item == null || item == '') {
			item = particularsStore.findRecord('scdNm', itemCd);
		}

		//added by Tram
		var machineCd = editor.grid.down('[dataIndex=machineNm]').getEditor().getValue();
		var machine = machineComboStore.findRecord('code', machineCd);
		if (machine == null || item == '') {
			machine = machineComboStore.findRecord('name', machineCd);
		}



		var particularsItem = item.get('scd');

		var RoleListStore = me.getStore('roleComboVesselDelay');
		var roleItem = editor.grid.down('[dataIndex=roleCdNm]').getEditor().getValue();
		var role = RoleListStore.findRecord('scd', roleItem);
		if (role == null || role == '') {
			role = RoleListStore.findRecord('scdNm', roleItem);
		}

		if (particularsItem !== 'FSG' && particularsItem !== 'FSGE' && particularsItem !== 'NAP' && particularsItem !== 'FSM'
			&& particularsItem !== 'FSSU' && particularsItem !== 'FSSI' && particularsItem !== 'FSH') {
			selection.set('roleCd', role.get('scd'));
		} else {
			selection.set('roleCd', '*')
		}

		selection.set('vslCallId', searchParm.data.vslCallId);
		selection.set('scn', searchParm.data.scn == null ? '' : searchParm.data.scn);
		selection.set('shftId', shift.get('shftId'));
		selection.set('shftNm', shift.get('shftNm'));
		selection.set('pntyDt', pntyDt.toString());
		selection.set('pntyDescr', ptnyDscr);
		if (startDt !== null && startDt !== '') {
			selection.set('pntyTime', startDt.toString());
		}
		if (endDt !== null && endDt !== '') {
			selection.set('pntyEndTime', endDt.toString());
		}
		selection.set('contrator', refs.refContractor.getEditor().getValue());
		selection.set('rsnCd', refs.refVslPnRptDelayCode.getEditor().getValue());
		selection.set('itemCd', item.get('scd'));
		selection.set('itemCdNm', item.get('scdNm'));
		//added by Tram
		selection.set('machineCd', machine.get('code'));
		selection.set('machineNm', machine.get('name'));

		var totalHRS = me.getTotalHRS(selection);
		selection.set('pntyAmt', totalHRS);
		selection.set('userId', MOST.config.Token.getUserId());

		//me.gridEdit(editor, context, false);
		MessageUtil.question('add', 'infosave_msg', null,
			function (button) {
				if (button === 'ok') {
					var proxy = selection.getProxy();
					proxy.url = store.getProxy().url; // You can set it as store Proxy Url, or you can put another URL.
					selection.save({
						success: function (records, success) {
							//me.onDetailLoad();
							me.onSearch();
							MessageUtil.saveSuccess(); // Success Message
						}
					});
				}
			})
	},

	onCancelEdit: function (rowEditing, context) {
		var me = this;
		me.gridCancelEdit(rowEditing, context);
	},

	// Grid Validate Edit
	onValidateEdit: function (editor, context) {
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);

	},


	onTriggerClick: function (field, button, e) {
		var me = this;
		var refs = me.getReferences();
		var params = {
			searchPtyDivCd: 'CTT'
		}
		me.openCodePopup('popup-partnercdpopup', 'refTxtContractor', params);
	},

	onOpenDelayCodePopup: function (field, button, e) {
		var me = this;
		var refs = me.getReferences();
		var params = {
			lcd: 'BBK'
		};
		me.openCodePopup('popup-delaycodepopup', 'ctlVslPnRptDelayCodeDetail', params);
	},

	onChangeUppercase: function (field, newValue) {
		var me = this;
		field.setValue(newValue.toUpperCase());
	},

	// Grid Row Remove
	onRemove: function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME); 
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() === null ? null : grid.getSelection();

		if(selection === null) return;

		if(selection.length > 0 ){
			
			
			MessageUtil.question('remove', 'infodelete_msg', null,
					function(button){
				if (button === 'ok') {
					store.remove(selection);
					store.sync({
						success: function(){
							MessageUtil.saveSuccess(); // Success Message
							refs.refBtnDelete.setDisabled(true);
						}
					});
				}
			});
		}
	},
	
	removeComplete : function(me){
		MessageUtil.saveSuccess(); // Success Message
	},

	onDblClick: function () {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];

		if (selection == null) return;
		me.openDetailPopup(selection);
	},

	// Popup is closed and receives return value
	afterSetCodePopupData: function (xtype, targetControl, returnValue) {
		var me = this;
		var refs = me.getReferences();

		if (targetControl === 'ctlVslCallId') {
			if (returnValue) {
				me.getViewModel().setData({ theVsl: returnValue.item });
				me.getViewModel().setData({ theVslDetail: returnValue.item });

				refs.refDPRNo.setValue('');
				
				me.onSearch();

				refs.ctlScn.setValue(returnValue.item.get('scn'));
			} else {
				me.getViewModel().setData({ theVsl: null });
				me.getViewModel().setData({ theVslDetail: null });
				refs.refDPRNo.setValue('');
			}
		}else if(targetControl === 'ctlDetailJpvc'){
			if (returnValue) {
				me.getViewModel().setData({ theVslDetail: returnValue.item });				
				//me.onSearch();

			} else {
				me.getViewModel().setData({ theVslDetail: null });
			}
		}else if (targetControl === 'ctlScn') {
			if (returnValue) {
				refs.ctlScn.setValue(returnValue.code);

				if (!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))) {
					refs.ctlVslCallId.setValue(returnValue.item.get('vslCallId'));
					me.getViewModel().setData({ theVsl: returnValue.item });
					me.getViewModel().setData({ theVslDetail: returnValue.item });
				} else {
					refs.ctlVslCallId.setValue('');
					me.getViewModel().setData({ theVsl: null });
					me.getViewModel().setData({ theVslDetail: null });
				}
			}
			refs.refDPRNo.setValue('');
		}else if(targetControl === 'ctlVslPnRptDelayCodeDetail'){
			if (returnValue) {
				refs.ctlVslPnRptDelayCodeDetail.setValue(returnValue.rsnCd);
			}
		}
	},

	// Search Condition
	getSearchCondition: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);

		var jpvcNo = searchParm.data.vslCallId;
		var scn = searchParm.data.scn;
		var workYmd = DateUtil.checkDate(me, 'ctlWorkYmdField').dateString;
		var hatchNo = refs.ctlHatchCombo.getValue();
		var shift = refs.ctlShiftCombo.getValue();


		if(!StringUtil.isNullorEmpty(jpvcNo) || !StringUtil.isNullorEmpty(scn)){
			params['vslCallId'] = jpvcNo;
			params['scn'] = scn;
			params['pntyDt'] = workYmd;
			params['searchType'] = 'reportList';
			params['shftId'] = shift;
			params['hatchNo'] = hatchNo;
			params['pageNo'] = pageNo;
			params['sizePerPage'] = sizePerPage;
			params['sort'] = grid.getSortString();
		}else{
			MessageUtil.error('fail_msg', "requiredJpvcmessage");
			params = null;
		}


		return params;
	},

	getTotalHRS: function (masterItem) {
		return 0;
	},

	changeParticularsEvent: function (combo, record, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		//var editor = grid.getPlugin('vesselDelayPenaltyReportEditor');
		var detailItem = me.getViewModel().get('theDetail');

		var particularsItem = detailItem.get('itemCd');

		var penaltyDescrListStore = me.getStore('penaltyDescrList');
		if (particularsItem != null && particularsItem != '') {

			if (particularsItem == 'SWL' || particularsItem == 'Start Work Late' || particularsItem == 'Stop Work Early' || particularsItem == 'SWE') {
				refs.ctlStDtDetail.setReadOnly(false);
				refs.ctlEndDtDetail.setReadOnly(false);
				refs.ctlVesselDelayRoleDetail.setReadOnly(false);

				refs.ctlStDtDetail.setDisabled(false);
				refs.ctlEndDtDetail.setDisabled(false);
				refs.ctlVesselDelayRoleDetail.setDisabled(false);

				refs.refPenalty.setValue('0');
			} else {
				refs.ctlVesselDelayPenaltyDetail.setValue('');
				refs.ctlVesselDelayRoleDetail.setValue('');
				refs.ctlStDtDetail.setValue('');
				refs.ctlEndDtDetail.setValue('');

				refs.refPenalty.setValue('0');
				refs.ctlStDtDetail.setReadOnly(true);
				refs.ctlEndDtDetail.setReadOnly(true);
				refs.ctlVesselDelayRoleDetail.setReadOnly(true);

				refs.ctlStDtDetail.setDisabled(true);
				refs.ctlEndDtDetail.setDisabled(true);
				refs.ctlVesselDelayRoleDetail.setDisabled(true);
			}

			/*
			 Disable the Penalty Description beacasue 
			 JPB does not have the Penalty Description table right now

			 - refVesselDelayPenalty store Unit_Price
			*/

			// penaltyDescrListStore.load({
			// 	params: {
			// 		itemCd : particularsItem,
			// 		roleCd : '*',
			// 		searchType : 'penaltyDescr'
			// 	},
			// 	callback: function(records, operation, success) {
			// 		if (success) {
			// 			if(records != null && records.length > 0){
			// 				for(var i = 0; i < records.length; i++){
			// 					editor.grid.down('[dataIndex=pntyDescr]').getEditor().setValue(records[0].data.pntyDescr);
			// 					refs.refVesselDelayPenalty.getEditor().setValue(records[0].data.pntyDescr);
			// 					refs.refPenalty.setValue(records[0].data.unitPrc);
			// 					me.getTotalHRS();
			// 				}

			// 			}
			// 		}
			// 	}

			// });
		}
	},


	changeRoleEvent: function () {

	},

	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.operation.SearchVesselDelayPenaltyReportParm';
		searchBizParm.serviceID = 'MOST.vesselDelayPenaltyReport.selectDelayPenaltyReportList'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
	
	// 	/**
	// 	 * GENERAL METHOD END
	// 	 * =========================================================================================================================
	// 	 */
});