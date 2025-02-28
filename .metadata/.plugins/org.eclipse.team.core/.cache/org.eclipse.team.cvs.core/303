Ext.define('MOST.view.configuration.RosterConfigurationController', {
	extend: 'MOST.view.foundation.BaseViewController',
	
	requires: [
	],

	alias: 'controller.rosterconfiguration',	
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	 MAIN_GRID_REF_NAME: 'refInternalStaffManagementGrid',				// Main Grid Name 
	 MAIN_STORE_NAME: 'internalStaffMngListOnly',
	 
	 PARAMETTER_USER_YN_COMBOBOX_STORE: 'userYnCombo',
	 PARAMETTER_USER_INTERNAL_YN_COMBOBOX_STORE: 'userInternalYnCombo',
	 PARAMETTER_ACTIVE_STATUS_YN_COMBOBOX_STORE: 'ActiveStatusYnCombo',
	 PARAMETTER_SHIFT_METHOD_DEPLOYMENT_COMBOBOX_STORE: 'shiftMethodDeploymentCombo',
	 PARAMETTER_UNIT_DROPDOWN_LIST_COMBOBOX_STORE: 'unitDropDownListCombo',
	 PARAMETTER_CONTRACT_DIVISION_SEARCH_LIST_COMBOBOX_STORE: 'contractDivisionSearchListCombo',
	 PARAMETTER_STAFF_INFO_LIST_SEARCH_STORE_COMBOBOX_STORE: 'staffInfoListSearchStore',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
	
	/**
	 * =========================================================================================================================
	 * CLICK OPEN POPUP LIST START
	 */
	openInternalStaffManagment:function(){
		var me = this;
		var title = {type: 'bundle', key: 'internalstaffmanagementTitle'};

		me.setComboBoxWithLocalCache(CacheServiceConstants.UNIT_DROPDOWN_LIST_COMBOBOX, me.PARAMETTER_UNIT_DROPDOWN_LIST_COMBOBOX_STORE);
		me.setComboBoxWithLocalCache(CacheServiceConstants.YES_NO, me.PARAMETTER_USER_YN_COMBOBOX_STORE);
		me.setComboBoxWithLocalCache(CacheServiceConstants.USER_YN_COMBO, me.PARAMETTER_USER_INTERNAL_YN_COMBOBOX_STORE);
		me.setComboBoxWithLocalCache(CacheServiceConstants.USER_YN_COMBO, me.PARAMETTER_ACTIVE_STATUS_YN_COMBOBOX_STORE);
		me.setComboBoxWithLocalCache(CacheServiceConstants.CONTRACT_DIVISION_SEARCH_LIST, me.PARAMETTER_CONTRACT_DIVISION_SEARCH_LIST_COMBOBOX_STORE);
		me.setComboBoxWithLocalCache(CacheServiceConstants.STAFF_INFO_LIST_SEARCH_STORE, me.PARAMETTER_STAFF_INFO_LIST_SEARCH_STORE_COMBOBOX_STORE);

		me.getView().detailViewAlias = 'app-internalstaffmanagement';
		me.mdiExclusiveReloadForStaffSetting();
		me.openDetailPopup(null, title, false);
	},
	
	openGroupManagementforRosterSetup:function(){
		var me = this;
		var title = {type: 'bundle', key: 'groupmanagementforrostersetupTitle'};

		me.getView().detailViewAlias = 'app-groupmanagementforrostersetup';
		me.mdiExclusiveReloadForGroupSetting();
		me.openDetailPopup(null, title, false);
	},

	openShiftDefinition:function(){
		var me = this;
		var title = {type: 'bundle', key: 'shiftdefinitionTitle'};

		me.setComboBoxWithLocalCache(CacheServiceConstants.SHIFT_METHOD_DEPLOYMENT_COMBOBOX, me.PARAMETTER_SHIFT_METHOD_DEPLOYMENT_COMBOBOX_STORE); 
		me.setComboBoxWithLocalCache(CacheServiceConstants.USER_YN_COMBOBOX, me.PARAMETTER_USER_YN_COMBOBOX_STORE);
		
		me.getView().detailViewAlias = 'app-shiftdefinitionmain';
		me.mdiExclusiveReloadForShiftDefinition();
		me.openDetailPopup(null, title, false);
	},
	
	/**
	 * =========================================================================================================================
	 * CLICK OPEN POPUP LIST END
	 */
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();		
		var view = me.getView();
		// Internalstaffmanagement Data Load ====================================================================================
		var roleCodeListCombo = me.getStore('roleCodeListCombo');
		var primaryRoleCodeCombo = me.getStore('primaryRoleCodeCombo');
		var workingLocCodeListCombo = me.getStore('workingLocCodeListCombo');
		var staffGradeCodeListCombo = me.getStore('staffGradeCodeListCombo');
		var costCenterListCombo = me.getStore('costCenterListCombo');
		var activeStatusYnCombo = me.getStore('ActiveStatusYnCombo');
		var contractDivisionSearchListCombo = me.getStore('contractDivisionSearchListCombo');
		var internalStaffMngListOnly = me.getStore('internalStaffMngListOnly');
		var internalStaffMngUserListCombo = me.getStore('internalStaffMngUserListCombo');
		var internalStaffMngSecondaryRoleListCombo = me.getStore('internalStaffMngSecondaryRoleListCombo');
		var isGroupUsedOrNotStore = me.getStore('isGroupUsedOrNot');
		
		roleCodeListCombo.insert(0, [{scdNm: 'All',scd: ''}]);
		costCenterListCombo.insert(0, [{codeDescription: 'All',codeCostCenter: ''}]);

		roleCodeListCombo.load();
		primaryRoleCodeCombo.load();
		workingLocCodeListCombo.load();
		staffGradeCodeListCombo.load();
		costCenterListCombo.load();
		activeStatusYnCombo.load();
		contractDivisionSearchListCombo.load();
    	internalStaffMngListOnly.load();
    	internalStaffMngUserListCombo.load();
    	internalStaffMngSecondaryRoleListCombo.load();
    	isGroupUsedOrNotStore.load();
    	
		// Group Management For Roster Setup Data Load ==========================================================================
    	var staffItem = Ext.create('MOST.model.planning.SearchRosterConfigurationParm');
		var internalStaffListOnly = me.getStore('internalStaffListOnly');
		var internalStaffCombo = me.getStore('internalStaffCombo');
		var shiftTypeInfoCombo = me.getStore('shiftTypeInfoCombo');
		
		internalStaffCombo.insert(0, [{scdNm: 'Search Role',scd: ''}]);
		
		internalStaffCombo.load();
		internalStaffListOnly.load();
		shiftTypeInfoCombo.load();
		
		view.getViewModel().setData({internalStaffMst: new MOST.model.configuration.RosterConfiguration()});
		view.getViewModel().setData({shiftConfigurationMst: new MOST.model.configuration.RosterConfiguration()});
		
		staffItem.set('useYn', 'Y');
		me.getViewModel().set('theStaff', staffItem);
		
		// Shift Definition Data Load ===========================================================================================
		var shiftTypeCombo = me.getStore('shiftTypeCombo');
		
		shiftTypeCombo.load({
			callback: function(records, operation, success) {
				if (success) {
					var record = Ext.create('MOST.model.configuration.RosterConfiguration');
					
					record.set('workingStatus', 'C');
					record.set('useYn', 'Y');
					me.getViewModel().set('theStaff',  record);
				}
			}
		});
	},
	
	onInternalStaffLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create('MOST.model.configuration.RosterConfiguration');
		var staffItem = Ext.create('MOST.model.configuration.RosterConfiguration');

		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch:searchParm});
		me.getViewModel().set('theStaff', staffItem);
		me.updateViewStyle(me.getView());
		
		searchParm.set('progress', 'N');
	},
	
	onStaffGridClick: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refInternalStaffManagementGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;

		me.getViewModel().set('theStaff', selection);
		
		if(!selection.phantom){
			refs.ctlStaffNo.setDisabled(true);
			
			if(refs.refBtnDelete){
				refs.refBtnDelete.setDisabled(false);
			}
		}else{
			refs.ctlStaffNo.setDisabled(false);
		}
		if(refs.refBtnCreate){
			refs.refBtnCreate.setDisabled(true);
		}
	},
	
		highlightRequiredFields: function() {
		    // Highlight required fields in red
		    Ext.ComponentQuery.query('textfield, combo, datefield').forEach(function(field) {
		        if (!field.isValid()) {
		        	field.inputEl.setStyle({
		                border: '1px solid #ff9999',
		            });
		        }
		        
		        field.on('blur', function() {
			        field.inputEl.setStyle({
			            border: 'none',
			        });
			    });
		    });
		    
		   
		}, 
		
	onAdd:function(){
		var me = this;
		var refs = me.getReferences();
		var internalStaffMngList = me.getStore('internalStaffMngListOnly');
		var record = me.getViewModel().get('theStaff');

		if(!me.onValidation()){
			me.highlightRequiredFields();
			MessageUtil.warning('warning_msg', 'Please input the required fields.');
			return;
		}
		
		if(refs.ctlStaffNo){
			refs.ctlStaffNo.setDisabled(false);
		}
		
		if(refs.refBtnCreate){
			refs.refBtnCreate.setDisabled(true);
		}
		
		if(refs.refBtnDelete){
			refs.refBtnDelete.setDisabled(false);
		}
		
		me.onInternalStaffManagementDuplicationChk(record);		
	},	
	
	onClear:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refInternalStaffManagementGrid');
		var record = Ext.create('MOST.model.configuration.RosterConfiguration');
		
		record.set('workingStatus', 'C');
		record.set('useYn', 'Y');
		me.getViewModel().set('theStaff',  record);
		
		if(refs.ctlStaffNo){
			refs.ctlStaffNo.setDisabled(false);
		}
		
		if(refs.refBtnCreate){
			refs.refBtnCreate.setDisabled(false);
		}
		
		if(refs.refBtnDelete){
			refs.refBtnDelete.setDisabled(true);
		}
		
		grid.setSelection(false);
	},	
	
	onRemove:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refInternalStaffManagementGrid');
		var selection = grid.getSelection() === null ? null : grid.getSelection();
		
		if(selection === null) return;
		
		MessageUtil.question('confirm', 'infodelete_msg',null,
			function(button){
				if (button === 'ok') {
					var internalStaffMngList = me.getStore('internalStaffMngListOnly');
					
					internalStaffMngList.remove(selection);
					internalStaffMngList.sync({
						callback:function(records,success){
							if(success){
								internalStaffMngList.commitChanges();
								MessageUtil.saveSuccess();
							}
						}
					});
					
					internalStaffMngList.reload();
				}
			}
		);
	},
	
	onSave:function(){
		var me = this;
		var refs = me.getReferences();
		var internalStaffMngList = me.getStore('internalStaffMngListOnly');
		var record = me.getViewModel().get('theStaff');
		
		if(!me.onValidation()){
			MessageUtil.warning('warning_msg', 'Please input the required fields.');
			return;
		}
		
		me.onInternalStaffSave();
	},
	
	onInternalStaffSave:function(){
		var me = this;
		var refs = me.getReferences();
		var internalStaffMngList = me.getStore('internalStaffMngListOnly');
		var theRecord = me.getViewModel().get('theStaff');
		var isCreate = false;
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		isCreate = theRecord.phantom;
		
		updateParm.getProxy().url = internalStaffMngList.getProxy().url;
		updateParm.phantom = isCreate
		updateParm.set('workingStatus', isCreate ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		updateParm.set('userId', MOST.config.Token.getUserId());
		theRecord.set('userId', MOST.config.Token.getUserId());
		updateParm.set('item', theRecord.data);
		
		updateParm.save({
			success:function(record){
				MessageUtil.saveSuccess();
				theRecord.set('version', record.get('newVersion'));
				internalStaffMngList.commitChanges();
				me.onClear();
			}
		})
		
		refs.ctlStaffNo.setDisabled(true);
		refs.refBtnDelete.setDisabled(true);
		refs.refBtnCreate.setDisabled(false);
	},
	
	onValidation: function(){
		var me = this;
		var refs = me.getReferences();
		var record = me.getViewModel().get('theStaff');
		
		if(!record.get('empId').trim() || !record.get('engNm').trim() || !record.get('workLocCd').trim() || !record.get('grdCd').trim() || !record.get('conttDiv').trim() || !record.get('proleCd').trim()){
			return false;
		}
		
        return true;
	},
	
	onInternalStaffManagementDuplicationChk : function(item) {
		var me = this;
		var refs = me.getReferences();
		var internalStaffMngList = me.getStore('internalStaffMngListOnly');
		var duplicateCheckStore = me.getStore('internalStaffMngListDuplicateCheck');
		var record = me.getViewModel().get('theStaff');
		var empId = record.get('empId').trim();
		
		var params = {
			empId: empId
		}
		
		duplicateCheckStore.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						refs.refBtnCreate.setDisabled(false);
						MessageUtil.warning('warning_msg', 'existedStaffMsg', empId);
						//Remove empId when duplicated
						var txtStaffNo = Ext.ComponentQuery.query('textfield[reference=ctlStaffNo]')[0];
						var theStaff = txtStaffNo.lookupViewModel().get('theStaff');
					    theStaff.set('empId', '');
					    txtStaffNo.setValue('');
					    
						return;
					} else {
						internalStaffMngList.insert(0, item);
						//me.onInternalStaffSave();
					}
				}
			}
		});
	},
	
	onInternalStaffManagementGridRefresh: function(){
		var me = this;
		var refs = me.getReferences();
		
		me.getViewModel().set('theStaff', Ext.create('MOST.model.configuration.RosterConfiguration'));
		refs.ctlStaffNo.setDisabled(false);
		refs.refBtnDelete.setDisabled(true);
		
		me.onInternalStaffManagementGridSearch();
	},
	
	mdiExclusiveReloadForStaffSetting: function() {
		var me = this;
		var refs = me.getReferences();
		var internalStaffMngListOnly = me.getStore('internalStaffMngListOnly');
	 	
		internalStaffMngListOnly.load();
	},
	
	mdiExclusiveReloadForGroupSetting: function() {
		var me = this;
		var refs = me.getReferences();
		var internalStaffListOnly = me.getStore('internalStaffListOnly');
		
		internalStaffListOnly.load();
	},
	
	mdiExclusiveReloadForGroupSetting: function() {
		var me = this;
		var refs = me.getReferences();
		var internalStaffListOnly = me.getStore('internalStaffListOnly');
		var shiftGroupListOnlyStore = me.getStore('shiftGroupListOnlyStore')

		shiftGroupListOnlyStore.removeAll();
		internalStaffListOnly.load();

	},
	
	mdiExclusiveReloadForShiftDefinition: function() {
		var me = this;
		var refs = me.getReferences();
		var shiftDefListOnlyStore = me.getStore('shiftDefListOnlyStore');
		var shiftGroupDefOnlyStore = me.getStore('shiftGroupDefOnlyStore');
		
		shiftDefListOnlyStore.removeAll();
		shiftGroupDefOnlyStore.removeAll();
	},
	
	setInternalStaffManagementComboStore:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var roleCodeListCombo = me.getStore('roleCodeListCombo');
		var primaryRoleCodeCombo = me.getStore('primaryRoleCodeCombo');
		var workingLocCodeListCombo = me.getStore('workingLocCodeListCombo');
		var staffGradeCodeListCombo = me.getStore('staffGradeCodeListCombo');
		var costCenterListCombo = me.getStore('costCenterListCombo');
		var ActiveStatusYnCombo = me.getStore('ActiveStatusYnCombo');
		var contractDivisionSearchListCombo = me.getStore('contractDivisionSearchListCombo');
		
		roleCodeListCombo.insert(0, [{scdNm: 'All',scd: ''}]);
		costCenterListCombo.insert(0, [{codeDescription: 'All',codeCostCenter: ''}]);
		ActiveStatusYnCombo.load();
		contractDivisionSearchListCombo.load();
	},
	
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * INTERNAL STAFF MANAGEMENT CONTROLLER START
	 */
	getInternalStaffManagementSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
     	var store = me.getStore(me.MAIN_STORE_NAME);
    	var pageNo = store.currentPage;
    	var sizePerPage = CommonConstants.PAGE_SIZE;
    	var searchParm = me.getViewModel().get('theSearch');
     	var inputEmpId = refs.txtStaffCd.getValue();
     	var inputUserName = refs.txtStaffNm.getValue();
     	var inputRoleCd = refs.ctlSearchRoleCombo.getValue();
     	var inputUseYn = refs.ctlUserYNCombo.getValue();
     	var inputConttDiv = refs.ctlContractCombo.getValue();
     	var inputCostCentCd = refs.ctlCostCenterCombo.getValue();
		if(inputUseYn != 'N') {
			inputUseYn = 'Y'
		}
     	var params = {
     		empId 		: inputEmpId,
     		empName		: inputUserName,
     		roleCd		: inputRoleCd,
     		conttDiv	: inputConttDiv,
     		costCentCd	: inputCostCentCd,
     		useYn		: inputUseYn,
     		viewType	: 'staffgrid',
     		searchType	: 'staff',
     		pageNo		: pageNo,
    		sizePerPage :sizePerPage,
    		sort		:grid.getSortString()
     	}
     	
    	return params;
	},
	
	onInternalStaffManagementValidateEdit : function(editor, context) {
		var me = this;
		var duplicateCheckStore = me.getStore('internalStaffMngListDuplicateCheck');
		var params = {
			empId: context.newValues.empId
		}
		
		me.gridDupliationCheck(editor, context, duplicateCheckStore, params);
	},
	
	
	openUnavailableLogForStaffPopup: function (grid, rowIndex, colIndex) {
		var me = this;
		var win = me.lookupReference('refUnavailableLogForStaff');		
		var rec = grid.getStore().getAt(rowIndex);
		var title = {type: 'bundle', key: 'unavailablelogforstaffTitle'};
		
		me.getViewModel().set('publicEmpid',rec.data.empId);
		me.getViewModel().set('publicEmpNm',rec.data.engNm);
		
		me.getView().detailViewAlias = 'app-unavailablelogforstaff';
		me.openDetailPopup(null, title, false);
		
		me.onUnavailableLogForStaffAfterRender();
	},
	
	onUnavailableLogForStaffAfterRender: function(){
		var me = this;
		var refs = me.getReferences();
    	var unavailableLogforStaffListStore = me.getStore('unavailableLogforStaffListStore');
		var unavailableLogforStaffListReasonCombo = me.getStore('unavailableLogforStaffListReasonCombo');
		var getEmpId = me.getViewModel().get('publicEmpid');
		var getEmpNm = me.getViewModel().get('publicEmpNm');

		refs.txtStaffCd.setValue(getEmpId);
		refs.txtStaffNm.setValue(getEmpNm);
		
		me.getViewModel().set('empId', getEmpId);
		
		unavailableLogforStaffListReasonCombo.load({
			params: {
				searchType: 'log'
			},
			callback: function(records, operation, success) {
				if (success) {
					unavailableLogforStaffListStore.load({
						params: {
							empId : getEmpId,
							searchType: 'log'
						},
						callback: function(records, ope, success){
							if(success){
								Ext.Array.forEach(records, function(item){
									var frmDate = item.data.fmYmdKey.getTime();
									var toDate = item.data.toYmdKey.getTime();
									var days = ((toDate - frmDate)/1000/60/60/24)+1;
									
									item.set('days', days);
								});
								
								unavailableLogforStaffListReasonCombo.commitChanges();
							}
						}
					});
				}
			}
		});
	},
	
	onInternalStaffManagementGridComboRenderer: function(val, cell){
		var me = this;
        var refs = me.getReferences();
		var codeComboStore = null;
		var displayFieldName = 'scdNm';
		var codeFieldName = 'scd';
		
		if(cell.column.dataIndex == 'grdCd'){
			codeComboStore = me.getViewModel().getStore('staffGradeCodeListCombo');
		}

		if(codeComboStore != null){
			var indx = -1;
			
			if(cell.column.dataIndex == 'grdCd'){
				indx = codeComboStore.find(codeFieldName, val);
			} else {
				indx = codeComboStore.find(codeFieldName, val);
			}				

			if (indx != -1){
				return codeComboStore.getAt(indx).get(displayFieldName); 
			}
		}
		
		return '';
	},
	
	onInternalStaffManagementChangeTagField: function(obj,newVal,oldVal, index){
		var me = this;
		var refs = me.getReferences();
		
		if (newVal=='' || newVal ==null) return;
		
		refs.ctlTagSroleCd.setValue(newVal);
	},
	
	onInternalStaffManagementGridSearch: function(){
		var me = this;
		var refs = me.getReferences();	
		var internalStaffMngListOnly = me.getStore('internalStaffMngListOnly');
    	var params = me.getInternalStaffManagementSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
    	internalStaffMngListOnly.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					refs.refBtnDelete.setDisabled(true);
					refs.refBtnCreate.setDisabled(false);
				}
			}
		});
	},
	
	onInternalStaffManagementWorkLocationCdNmGridComboRenderer: function(val, cell){
		var me = this;
        var refs = me.getReferences();
		var codeComboStore = null;
		var displayFieldName = 'scdNm';
		var codeFieldName = 'scd';
		
		if(cell.column.dataIndex == 'workLocCd'){
			codeComboStore = me.getViewModel().getStore('workingLocCodeListCombo');
		}

		if(codeComboStore != null){
			var indx = -1;
			
			if(cell.column.dataIndex == 'workLocCd'){
				indx = codeComboStore.find(codeFieldName, val);
			} else {
				indx = codeComboStore.find(codeFieldName, val);
			}

			if (indx != -1){
				return codeComboStore.getAt(indx).get(displayFieldName); 
			}
		}
		
		return '';
	},
	
	onInternalStaffManagementContractGridComboRenderer: function(val, cell){
		var me = this;
        var refs = me.getReferences();
		var codeComboStore = null;
		var displayFieldName = 'scdNm';
		var codeFieldName = 'scd';

		if(cell.column.dataIndex == 'conttDiv'){
			codeComboStore = me.getViewModel().getStore('contractDivisionSearchListCombo');
		}

		if(codeComboStore != null){
			var indx = -1;
			
			if(cell.column.dataIndex == 'conttDiv'){
				indx = codeComboStore.find(codeFieldName, val);
			} else {
				indx = codeComboStore.find(codeFieldName, val);
			}

			if (indx != -1){
				return codeComboStore.getAt(indx).get(displayFieldName); 
			}
		}
		
		return '';
	},
	
	onInternalStaffManagementCostCenterGridComboRenderer: function(val, cell){
		var me = this;
        var refs = me.getReferences();
		var codeComboStore = null;
		var displayFieldName = 'scdNm';
		var codeFieldName = 'scd';
		
		if(cell.column.dataIndex == 'costCentCd'){
			codeComboStore = me.getViewModel().getStore('costCenterListCombo');
		}

		if(codeComboStore != null){
			var indx = -1;
			
			if(cell.column.dataIndex == 'costCentCd'){
				indx = codeComboStore.find(codeFieldName, val);
			} else {
				indx = codeComboStore.find(codeFieldName, val);
			}

			if (indx != -1){
				return codeComboStore.getAt(indx).get(displayFieldName); 
			}
		}
		
		return '';
	},
	
	onInternalStaffManagementUnitGridComboRenderer: function(val, cell){
		var me = this;
        var refs = me.getReferences();
		var codeComboStore = null;
		var displayFieldName = 'scdNm';
		var codeFieldName = 'scd';
		
		if(cell.column.dataIndex == 'unitDiv'){
			codeComboStore = me.getViewModel().getStore('unitDropDownListCombo');
		}

		if(codeComboStore != null){
			var indx = -1;
			
			if(cell.column.dataIndex == 'unitDiv'){
				indx = codeComboStore.find(codeFieldName, val);
			} else {
				indx = codeComboStore.find(codeFieldName, val);
			}

			if (indx != -1){
				return codeComboStore.getAt(indx).get(displayFieldName); 
			}
		}
		
		return '';
	},
	
	/**
	 * INTERNAL STAFF MANAGEMENT CONTROLLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * UNAVAILABLE LOG FOR STAFF START
	 */
	onUnavailableLogForStaffGridComboRenderer: function(val, cell){
		var me = this;
        var refs = me.getReferences();
		var codeComboStore = null;
		var displayFieldName = 'scdNm';
		var codeFieldName = 'scd';
		
		if(cell.column.dataIndex == 'rsnCd'){
			codeComboStore = me.getViewModel().getStore('unavailableLogforStaffListReasonCombo');
		}

		if(codeComboStore != null){
			var indx = -1;
			
			if(cell.column.dataIndex == 'rsnCd'){
				indx = codeComboStore.find(codeFieldName, val);
			} else {
				indx = codeComboStore.find(codeFieldName, val);
			}

			if (indx != -1){
				return codeComboStore.getAt(indx).get(displayFieldName); 
			}
		}
		
		return '';
	},
	
	onUnavailableLogForStaffAdd: function() {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refUnavailableLogForStaffGrid');
		var store = me.getStore('unavailableLogforStaffListStore');
		var editor = grid.getPlugin('unavailableLogForStaffGridEditor');
		var record = Ext.create('MOST.model.configuration.RosterConfiguration'); 
		
		editor.cancelEdit();
		
		grid.filters.clearFilters();
		grid.filters.disable();
		
		store.clearFilter();
		
		var idx = 0;
		if(grid.getSelection() && grid.getSelection().length>0) {
			idx = store.indexOfId(grid.getSelection()[0].get('id'));
		}
		
		record.set('empId', me.getViewModel().get('empId'));
		record.set('userId', MOST.config.Token.getUserId());
		
		store.insert(idx, record);
		grid.getSelectionModel().select(record);
		
		editor.startEdit(record);
	},
	
	onUnavailableLogForStaffRemove: function() {
		var me = this;
		var grid = me.lookupReference('refUnavailableLogForStaffGrid');
		var store = me.getStore('unavailableLogforStaffListStore'); 
		
		me.gridRemoveRow(grid, store);
	},
	
	/**
	 * UNAVAILABLE LOG FOR STAFF END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GROUP MANAGEMENT FOR ROSTER SETUP START
	 */
	onInternalStaffCellClick: function(obj, cell, colidx, store, row, rowidx, event) {
		var me = this;
		var view = me.getView();
		var refs = me.getReferences();
		var record = obj.getRecord(row);
		
		if (row <= 0) return;
		
		view.getViewModel().setData({internalStaffMst: record});
	},
	
	onGroupManagementForRosterSetupAdd: function() {
		var me = this;
		var view = me.getView();
		var refs = me.getReferences();
		var grid = me.lookupReference('stateGroupManagementForRosterSetupVesselOpGrid');
		var store = me.getStore('shiftGroupListOnlyStore');
		var getShftGrpCd = refs.ctlShiftTypeGroupCd.getValue();
		var getShftDivCd = refs.ctlShiftTypeCd.getValue();
		var record = Ext.create('MOST.model.configuration.RosterConfiguration'); 
		var selection = me.getViewModel().data.internalStaffMst;
		
		if(getShftGrpCd == ''){
			return;
		}
		
		if(selection.data.shftGroupCd !== ' '){
			MessageUtil.warning('warning_msg', 'roster_shft_grp_assigned');
			return;
		}
	
		record.set('empId', selection.data.empId);
		record.set('shftGrpCd', getShftGrpCd);
		record.set('shftDivCd', getShftDivCd);
		
		store.insert(0, record);
		store.sync({
        	success: function(){
            	store.reload();
            	view.getViewModel().setData({internalStaffMst: null});
            }		                    
        });
	},
	
	onGroupManagementForRosterSetupRemove: function(){
		var me = this;
		var view = me.getView();
		var refs = me.getReferences();
		var grid = me.lookupReference('stateGroupManagementForRosterSetupVesselOpGrid');
		var store = me.getStore('shiftGroupListOnlyStore');
		var getShftGrpCd = refs.ctlShiftTypeGroupCd.getValue();
		var record = Ext.create('MOST.model.configuration.RosterConfiguration'); 
		var selection = me.getViewModel().data.shiftConfigurationMst;
		
		var employeeId = selection.data.empId;
		var getAllAssignedStaffByGroupCdStore = me.getStore('getAllAssignedStaffByGroupCdStore');
		
		getAllAssignedStaffByGroupCdStore.load({
			params: {
				groupCd: getShftGrpCd,
				empId: employeeId
			},
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						MessageUtil.warning('Warning', 'This Staff has been assigned in ROSTER, cannot remove out of GROUP ');
						return;
					}
					else {
						if(getShftGrpCd != ''){
							store.remove(selection);
							store.sync({
					        	success: function(){
					            	store.reload();
					            	view.getViewModel().setData({shiftConfigurationMst: null});
					            }		                    
					        });
						}
					}
				}
			}
		})
		
	},
	
	onShiftConfigurationCellClick: function(obj, cell, colidx, store, row, rowidx, event) {
		var me = this;
		var view = me.getView();
		var refs = me.getReferences();
		var record = obj.getRecord(row);
		
		if (row <= 0) return;
		
		view.getViewModel().setData({shiftConfigurationMst: record});
	},
	
	onSearchRoleComboSelect: function(combo, value, obj){
		var me = this;
     	var refs = me.getReferences();
    	var internalStaffListOnly = me.getStore('internalStaffListOnly');
    	var params = me.getRoleComboSearchCondition(value);
    	
    	if(params == null){
    		return;
    	}
    	
    	internalStaffListOnly.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
				}
			}
		});
	},
	
	onChangeGroupSelect:function(obj, newVal, oldVal){
		var me = this;
     	var refs = me.getReferences();
     	
     	if(newVal != null && newVal != ''){
     		refs.ctlShiftTypeGroupCd.setDisabled(false);
     	}
	},
	
	onSearchGroupSelect: function(combo, value, obj){
		var me = this;
     	var refs = me.getReferences();
    	var shiftGroupCombo = me.getStore('shiftGroupCombo');
    	var params = me.getSearchGroupSelectCondition(value, 'combo', 'Group', 'group', 'Y');
    	
    	if(params == null){
    		return;
    	}
    	
		shiftGroupCombo.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
				}
			}
		});
	},
	
	onSearchGroupClick: function(combo, value, obj){
		var me = this;
     	var refs = me.getReferences();
    	var shiftGroupListOnlyStore = me.getStore('shiftGroupListOnlyStore');
    	var internalStaffListOnly = me.getStore('internalStaffListOnly');
    	var params = me.getSearchGroupClickCondition(value);
    	var staffInfoParams = me.getSearchGroupSelectCondition(value, params.searchType , '', '', 'Y');
    	
    	if(params == null){
    		return;
    	}
    	
    	shiftGroupListOnlyStore.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					internalStaffListOnly.load({
						params: staffInfoParams,
						callback: function(records, operation, success) {
							if (success) {
							}
						}
					});
				}
			}
		});
	},
	
	onGroupManagementForRosterSetupSearch: function(){
		var me = this;
		var refs = me.getReferences();	
		var internalStaffListOnly = me.getStore('internalStaffListOnly');
    	var params = me.getRoleComboSearchCondition(null);
    	
    	if(params == null){
    		return;
    	}
    	
    	internalStaffListOnly.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
				}
			}
		});
		
	},
	
	/**
	 * GROUP MANAGEMENT FOR ROSTER SETUP END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * SHIFT DEFINITION START
	 */
	
	onShiftDefListValidateEdit : function(editor, context) {
		var me = this;
		var refs = me.getReferences();
		var getShfitDivCd = refs.ctlShiftType.getValue();
		
		if(context.record.data.insertType === ''){
			context.record.set('insertType', 'shift');	
		}
		
		if(context.record.data.userId === ''){
			context.record.set('userId', MOST.config.Token.getUserId());	
		}
		
		if(context.record.data.shftDivCd === ''){
			context.record.set('shftDivCd', getShfitDivCd);	
		}
		
		if(context.record.data.shftMethCd === ''){
			MessageUtil.error('fail_msg', 'selectMethodofdeployment');
			return false;
		}
		
		if(context.record.phantom){
			var shiftDefListOnlyStore = me.getStore('shiftDefListOnlyStore');
			var index = shiftDefListOnlyStore.find("shftNm", context.newValues.shftNm);
			
			if(index > 0){
				MessageUtil.duplicationFail();
				return false;
			}
		}
	},
	
	onShiftDefGroupValidateEdit : function(editor, context) {
		var me = this;
		var refs = me.getReferences();
		var getShfitDivCd = refs.ctlShiftType.getValue();
		
		if (refs.ctlMethodDeployment.getValue() !== 'Group') {
			MessageUtil.warning('warning_msg', 'Only Method of Deployment is Group can continue');
			return false;
		}
		
		if(context.record.data.insertType === ''){
			context.record.set('insertType', 'group');	
		}
		
		if(context.record.data.userId === ''){
			context.record.set('userId', MOST.config.Token.getUserId());	
		}
		
		if(context.record.data.shftDivCd === ''){
			context.record.set('shftDivCd', getShfitDivCd);	
		}
		
		if(context.record.phantom){
			var shiftGroupDefOnlyStore = me.getStore('shiftGroupDefOnlyStore');
			var index = shiftGroupDefOnlyStore.find("groupNm", context.newValues.groupNm);
			
			if(index > 0){
				MessageUtil.duplicationFail();
				return false;
			}
		}
	},
	
	
	onShiftTypeComboSelect: function(combo, value, obj){
		var me = this;
     	var refs = me.getReferences();
    	var shiftDefListOnlyStore = me.getStore('shiftDefListOnlyStore');
    	var shiftGroupDefOnlyStore = me.getStore('shiftGroupDefOnlyStore');
    	var getDivCd = refs.ctlShiftType.getValue();
    	
    	if(getDivCd != ''){
    		var params = me.getShiftTypeComboSearchCondition();
        	
        	if(params == null){
        		return;
        	}
    		
    		shiftDefListOnlyStore.load({
    			params: params,
    			callback: function(records, operation, success) {
    				if (success) {
    					if(records.length > 0){
    						refs.ctlMethodDeployment.setValue(records[0].data.shftMethCd);
    					}
    					if (refs.ctlMethodDeployment.getValue() == 'Group') {
							shiftGroupDefOnlyStore.load({
								params: params
							});
						} else {
							shiftGroupDefOnlyStore.removeAll();
							shiftGroupDefOnlyStore.load();
						}
    				}
    			}
    		});
    	} else {
    		shiftDefListOnlyStore.removeAll();
    		shiftGroupDefOnlyStore.removeAll();
    	}
	},

	getShiftTypeComboSearchCondition : function(value){
		var me = this;
     	var refs = me.getReferences();
     	var searchParm = me.getViewModel().get('theSearch');
     	var getDivCd = refs.ctlShiftType.getValue();
     	var useYn = refs.ctlUseYn.getValue();
     	var shftMethCd = refs.ctlMethodDeployment.getValue();
     	var params;
     	
		params = {
			divCd: getDivCd,
			useYn: useYn,
			shftMethCd: shftMethCd
 		}
     	     	
    	return params;
	},
	
	setShiftDefinitionListGridColumnEditable:function(isCreate){
		var me = this;
		var refs = me.getReferences();

		if(isCreate){
			refs.refShftNm.getEditor().setEditable(true);
			refs.refShftNm.getEditor().setDisabled(false);
		} else {
			refs.refShftNm.getEditor().setEditable(false);
			refs.refShftNm.getEditor().setDisabled(true);
		}
	},
	
	onShiftDefAdd: function(listType) {
		var me = this;
		var refs = me.getReferences();
		var getShftTypeCd = refs.ctlShiftType.getValue();
		var getShftMethCd = refs.ctlMethodDeployment.getValue();
		var refShiftDefinitionListGrid = me.lookupReference('refShiftDefinitionListGrid');
		var refShiftDefinitionGroupGrid = me.lookupReference('refShiftDefinitionGroupGrid');
		var shiftDefListEditor= refShiftDefinitionListGrid.getPlugin('shiftDefinitionListEditor');
		var shiftDefGroupEditor= refShiftDefinitionGroupGrid.getPlugin('shiftDefinitionGroupEditor');
		var shiftDefListOnlyStore = me.getStore('shiftDefListOnlyStore');
		var shiftGroupDefOnlyStore = me.getStore('shiftGroupDefOnlyStore');
		var record = Ext.create('MOST.model.configuration.RosterConfiguration');
		var idx = 0;
		
		if( listType === 'S' ) {
			if(getShftTypeCd != ''){
				shiftDefListEditor.cancelEdit();
				
				refShiftDefinitionListGrid.filters.clearFilters();
				refShiftDefinitionListGrid.filters.disable();
				
				shiftDefListOnlyStore.clearFilter();
				
				if(refShiftDefinitionListGrid.getSelection() && refShiftDefinitionListGrid.getSelection().length > 0) {
					idx = shiftDefListOnlyStore.indexOfId(refShiftDefinitionListGrid.getSelection()[0].get('id'));
				}
				
				record.set('shftMethCd', getShftMethCd);
				
				shiftDefListOnlyStore.insert(idx, record);
				refShiftDefinitionListGrid.getSelectionModel().select(record);
				
				refs.refShftNm.getEditor().setEditable(true);
				refs.refShftNm.getEditor().setDisabled(false);
				
				shiftDefListEditor.startEdit(record);
			} 
		} else if ( listType === 'G' ) {
			if(getShftTypeCd != '' && shiftDefListOnlyStore.data.length > 0){
				shiftDefGroupEditor.cancelEdit();
				
				refShiftDefinitionGroupGrid.filters.clearFilters();
				refShiftDefinitionGroupGrid.filters.disable();
				
				shiftGroupDefOnlyStore.clearFilter();
				
				if(refShiftDefinitionGroupGrid.getSelection() && refShiftDefinitionGroupGrid.getSelection().length>0) {
					idx = shiftGroupDefOnlyStore.indexOfId(refShiftDefinitionGroupGrid.getSelection()[0].get('id'));
				}
				
				shiftGroupDefOnlyStore.insert(idx, record);
				refShiftDefinitionGroupGrid.getSelectionModel().select(record);
				
				refs.refGroupCd.getEditor().setEditable(true);
				refs.refGroupCd.getEditor().setDisabled(false);
				
				shiftDefGroupEditor.startEdit(record);
			}
		}
	},
	
	onShiftDefRemove: function(listType){
		var me = this;
		var shiftGridName = 'refShiftDefinitionListGrid';
		var shiftGroupGridName = 'refShiftDefinitionGroupGrid';
		var shiftStoreName = 'shiftDefListOnlyStore';
		var shiftGroupStoreName = 'shiftGroupDefOnlyStore';
		var insertType = "";
		var grid, store;
		
		if( listType === 'S' ) {
			grid = me.lookupReference(shiftGridName);
			insertType = 'shift';
			store = me.getStore(shiftStoreName);
		} else {
			grid = me.lookupReference(shiftGroupGridName);
			insertType = 'group';
			store = me.getStore(shiftGroupStoreName);
		}
		
        var selection = grid.getSelectionModel().getSelection()[0];
        var records = new Array();
        
        //added by Tim 18/03/2024
        //Check system should not allow to remove Shift Group if used
        var isGroupUsedOrNotStore = me.getStore('isGroupUsedOrNot');
    	var groupCd = selection.data.groupCd;
    	var used = false;
    	if(groupCd == null){
    		return;
    	}
    	isGroupUsedOrNotStore.each(function(record) {
    	    if (record.get('groupCd') === groupCd) {
    	    	Ext.Msg.alert('Warning', 'Cannot remove this Shift Group because it is being used.');
    	    	used = true;
    	        return;
    	    }
    	});
    	if (used) {
		    return; 
		}
    	
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
	
	onShiftDefinitionUseYnComboSelect: function(chk, newValue, oldValue, eOpts){
		var me = this;
     	var refs = me.getReferences();
     	var getShftUseYn = refs.ctlUseYn.getValue();
     	var getDivCd = refs.ctlShiftType.getValue();
    	var shiftDefListOnlyStore = me.getStore('shiftDefListOnlyStore');
    	var shiftGroupDefOnlyStore = me.getStore('shiftGroupDefOnlyStore');
    	var params = me.getShiftTypeComboSearchCondition();
    	
		if(params == null){
    		return;
    	}
    	
    	shiftDefListOnlyStore.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						refs.ctlMethodDeployment.setValue(records[0].data.shftMethCd);
					}
					if (refs.ctlMethodDeployment.getValue() == 'Group') {
						shiftGroupDefOnlyStore.load({
							params: params
						});
					} else {
						shiftGroupDefOnlyStore.removeAll();
						shiftGroupDefOnlyStore.load();
					}
				}
			}
		});
	},
	
	
	onMethodDeploymentComboSelect: function(obj,newVal,oldVal, index){
		var me = this;
     	var refs = me.getReferences();
     	var getShftTypeCd = refs.ctlShiftType.getValue();
     	var getShftMethCd = refs.ctlMethodDeployment.getValue();
    	var shiftGroupDefOnlyStore = me.getStore('shiftGroupDefOnlyStore');
    	var shiftDefListOnlyStore = me.getStore('shiftDefListOnlyStore');
    	var paramUseYn = refs.ctlUseYn.getValue();
    	if (getShftMethCd == 'Group') {
    		shiftGroupDefOnlyStore.load({
    			params: {
    				divCd : getShftTypeCd,
    				useYn : paramUseYn,
    				
    			}, 
    			callback: function(records, operation, success) {
    			}
    		});
    	} else {
			shiftGroupDefOnlyStore.removeAll();
			shiftGroupDefOnlyStore.load();
		}
    	
    	
    	shiftDefListOnlyStore.load({
			params: {
				divCd : getShftTypeCd,
				useYn : paramUseYn,
				shftMethCd: getShftMethCd
			}, 
			callback: function(records, operation, success) {
			}
		});
	},
	
	/**
	 * SHIFT DEFINITION END
	 * =========================================================================================================================
	 */
	
	onCancelEdit : function(rowEditing, context) {
		var me = this;
		me.gridCancelEdit(rowEditing, context);
	},
	
	
	onEdit : function(editor, context){
		var me = this;
		var refs=  me.getReferences();
		
		if (context.record.phantom) {	 
			console.log('***** insert *****');
			context.store.remove(0);			
			if (context.store.storeId ==  "shiftGroupDefOnlyStoreId") {
				context.record.data.shftMethCd = refs.ctlMethodDeployment.getValue();
			}	
			
			context.store.insert(0,context.record);
			context.store.sync({
				callback: function(records, operation, success) {
					context.store.reload({
						callback: function(records, operation, success) {
							if(success){
								Ext.Msg.alert('Info', 'Process successfully.');
							}
						}
					});
				}
			});	
		} else {
			console.log('***** update *****');
			
			if (context.store.storeId ==  "shiftGroupDefOnlyStoreId") {
				context.record.data.shftMethCd = refs.ctlMethodDeployment.getValue();
			}

			context.store.sync({
				success: function(){
					context.store.reload({
						callback: function(records, operation, success) {
							if(success){
								Ext.Msg.alert('Info', 'Process successfully.');
							}
						}
					});
				}
			});
		}
	},
	
	onUnavailableLogForStaffEdit: function(editor, context) {
		var me = this;
		var refs = me.getReferences();
		var getEmpId = refs.txtStaffCd.getValue();
		var dateCondition = me.checkFromToDate("refFmYmdKey", "refToYmdKey");
		
		context.record.set('empId', getEmpId);
		
		if(dateCondition == null){
			return null;
		}
		
		me.gridEdit(editor, context);
	},
	
	/**
	 * =========================================================================================================================
	 * DATA SEARCH START
	 */
	
	getRoleComboSearchCondition : function(value){
		var me = this;
     	var refs = me.getReferences();
     	var getEmpId = refs.txtEmpId.getValue();
     	var getUserNm = refs.txtUserNm.getValue();
     	var getRoleCd = refs.ctlRoleCd.getValue();
     	var params;
     	
 		if(value){
			params = {
				empId: getEmpId,
				roleCd: value.data.scd,
				empName: getUserNm,
				searchType: 'group',
				shftMethCd: 'Group',
				useYn: 'Y',
				viewType: 'groupgrid'
     		}
     	} else {
			params = {
				empId: getEmpId,
				roleCd: getRoleCd,
				empName: getUserNm,
				searchType: 'group',
				shftMethCd: 'Group',
				useYn: 'Y',
				viewType: 'groupgrid'
     		}
     	}
     	     	
    	return params;
	},	

	getSearchGroupSelectCondition : function(value, searchTypeDiv, shftMethCdDiv, viewTypeDiv, userYnDiv){
		var me = this;
     	var refs = me.getReferences();
     	var getEmpId = refs.txtEmpId.getValue();
     	var getUserNm = refs.txtUserNm.getValue();
     	var getRoleCd = refs.ctlRoleCd.getValue();
     	var getCmDivCd = refs.ctlShiftTypeCd.getValue();
     	var params;

 		params = {
			empId: getEmpId,
			roleCd: getRoleCd,
			cmDivCd: getCmDivCd,
			empName: getUserNm,
			searchType: searchTypeDiv,
			shftMethCd: shftMethCdDiv,
			viewType: viewTypeDiv,
			useYn: userYnDiv
     	}
 		
    	return params;
	},	
	
	getSearchGroupClickCondition : function(value){
		var me = this;
     	var refs = me.getReferences();
     	var getEmpId = refs.txtEmpId.getValue();
     	var getUserNm = refs.txtUserNm.getValue();
     	var getRoleCd = refs.ctlRoleCd.getValue();
     	var getShftGrpCd = refs.ctlShiftTypeGroupCd.getValue();
     	var params;
     	
 		params = {
			empId: getEmpId,
			engNm: getUserNm,
			roleCd: getRoleCd,
			shftGrpCd: getShftGrpCd,
			searchType: 'group'
     	}
 		
    	return params;
	},	
	
	getShiftMethodDeploymentComboSearchCondition : function(setUseYn){
		var me = this;
     	var refs = me.getReferences();
     	var getShftDivCd = refs.ctlShiftType.getValue();
     	var params;
     	
		params = {
			divCd: getShftDivCd,
			useYn: setUseYn
 		}
     	     	
    	return params;
	},
	/**
	 * DATA SEARCH END
	 * =========================================================================================================================
	 */
	
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
});
