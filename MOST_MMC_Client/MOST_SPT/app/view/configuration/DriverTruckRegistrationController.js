Ext.define('MOST.view.configuration.DriverTruckRegistrationController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.drivertruckregistration',

	DRIVER_LIST_STORE: 'driversListOnly',
	TRUCK_LIST_STORE: 'lorriesListOnly',
	CHASSIS_LIST_STORE: 'chassisListOnly',
	MAIN_GRID_REF_DRIVER_NAME: 'refDriverLorryRegistrationDriversTabGrid',
	MAIN_GRID_REF_LORRY_NAME: 'refDriverLorryRegistrationLorriesTabGrid',
	MAIN_GRID_REF_CHASSIS_NAME: 'refDriverLorryRegistrationChassisTabGrid',
	PARAMETTER_USE_YN_COMBOBOX_STORE: 'yesNoCombo',
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function () {
		var me = this;
		var refs = me.getReferences();
		var countryCodePopup = me.getStore('countryCodePopup');
		var partnerCodeListOnly = me.getStore('partnerCodeListOnly');
		var searchParm = Ext.create('MOST.model.configuration.SearchDriverTruckRegistrationParm');
		var currentTab = refs.tabDriverRorries.getActiveTab();
		var activeTabIndex = refs.tabDriverRorries.items.findIndex('id', currentTab.id);
		
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({ theSearch: searchParm });

		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');

		partnerCodeListOnly.load();
		countryCodePopup.load();
		
		if(MOST.config.Token.getUserType() == CodeConstants.USER_TYPE_INTERNAL && activeTabIndex != 0){
			refs.refBtnVerify.setHidden(false);
		} else {
			refs.refBtnVerify.setHidden(true);
		}

		me.setComboBoxWithLocalCache(CacheServiceConstants.YES_NO, me.PARAMETTER_USE_YN_COMBOBOX_STORE);
	},

	onSearch: function () {
		var me = this;
		var refs = me.getReferences();
		var transport = refs.ctlPartnerCdForGridField.getValue();
		var currentTab = refs.tabDriverRorries.getActiveTab();
		var activeTabIndex = refs.tabDriverRorries.items.findIndex('id', currentTab.id);

		if (activeTabIndex === 0) {
			me.onSearchDriver();
		} else if (activeTabIndex === 1) {
			me.onSearchTruck();
		}else if (activeTabIndex === 2) {
			me.onSearchChassis();
		}
	},
	
	onVerifyChk: function(){
		var me = this;
		var refs = me.getReferences();
		var currentTab = refs.tabDriverRorries.getActiveTab();
		var activeTabIndex = refs.tabDriverRorries.items.findIndex('id', currentTab.id);
		var grid;
		
		if(activeTabIndex === 1){
			grid = me.lookupReference(me.MAIN_GRID_REF_LORRY_NAME);
		} else if(activeTabIndex === 2){
			grid = me.lookupReference(me.MAIN_GRID_REF_CHASSIS_NAME);
		}
		
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection != null && activeTabIndex === 1){
			if(selection.data.verifyYn == 'Y'){
				selection.set('verifyYn', 'N');
			} else {
				selection.set('verifyYn', 'Y');
			}
			
			me.saveProcess(selection);
		} else if(selection != null && activeTabIndex === 2){
			if(selection.data.vldYn == 'Y'){
				selection.set('vldYn', 'N');
			} else {
				selection.set('vldYn', 'Y');
			}
			
			me.saveProcess(selection);
		}
	},

	onSearchTruck: function () {
		var me = this;
		var refs = me.getReferences();
		var transport = refs.ctlPartnerCdForGridField.getValue();
		var lorryNo = refs.ctlTruckNo.getValue();
		var measureDt = Ext.Date.format(refs.ctlMeasureDt.getValue(), 'd/m/Y');
		var lorriesListOnly = me.getStore(me.TRUCK_LIST_STORE);
		var pageNo = lorriesListOnly.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;

		lorriesListOnly.load({
			params: {
				ptnrCd: transport,
				lorryNo: lorryNo,
				meaDt: measureDt,
				pageNo 			: pageNo,
				sizePerPage 	: sizePerPage
			},
			callback: function (records2, operation2, success2) {
				if (success2) {
					if (records2 && records2.length <= 0) {
						MessageUtil.noMatchData();
					}
				}
			}
		});
	},

	onSearchDriver: function () {
		var me = this;
		var refs = me.getReferences();
		var transport = refs.ctlPartnerCdForGridField.getValue();
		var ptnrCd = refs.ctlPartnerCdForGridField.getValue();
		var driversListOnly = me.getStore(me.DRIVER_LIST_STORE);
		var pageNo = driversListOnly.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;

		driversListOnly.load({
			params: {
				driverId		: refs.ctlDriverSearch.getValue(),
				driverNm		: refs.ctlDriverNameSearch.getValue(),
				pageNo 			: pageNo,
				sizePerPage 	: sizePerPage,
				ptnrCd      	: ptnrCd
			},
			callback: function (records1, operation1, success1) {
				if (success1) {
					if (records1 && records1.length <= 0) {
						MessageUtil.noMatchData();
					}
				}
			}
		});
	},
	
	onSearchChassis: function () {
		var me = this;
		var refs = me.getReferences();
		var transport = refs.ctlPartnerCdForGridField.getValue();
		var ptnrCd = refs.ctlPartnerCdForGridField.getValue();
		var chassisNo = refs.ctlChassisNo.getValue();
		var measureDt = Ext.Date.format(refs.ctlMeasureDt.getValue(), 'd/m/Y');
		var chassisListOnly = me.getStore(me.CHASSIS_LIST_STORE);
		var pageNo = chassisListOnly.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;

		chassisListOnly.load({
			params: {
				ptnrCd: transport,
				chassisNo: chassisNo,
				meaDt: measureDt,
				pageNo 			: pageNo,
				sizePerPage 	: sizePerPage
			},
			callback: function (records1, operation1, success1) {
				if (success1) {
					if (records1 && records1.length <= 0) {
						MessageUtil.noMatchData();
					}
				}
			}
		});
	},

	onSelectTruckPartnerCode: function ( comboView, newValue, eOpts ) {
		var me = this,
			checkTruckDuplicate = me.getStore('checkTruckDuplicate'),
			colTransportName = me.lookupReference('refColTransporterName'),
			grid = me.lookupReference('refDriverLorryRegistrationLorriesTabGrid'),
			selection = grid.getSelection()[0],
			trsptCd = newValue.get('ptnrCode'),
			trsptNm = newValue.get('ptnrName');
			
		colTransportName.setValue( trsptNm );
		selection.set({
			ptnrCd: trsptCd,
			ptnrNm: trsptNm
		});

		checkTruckDuplicate.load({
			callback: function (records, operation, success) {
				if (success) {

				}
			}
		});
	},

	onSelectChassisPartnerCode: function ( comboView, newValue, eOpts ) {
		var me = this,
			colTransportName = me.lookupReference('refColTransporterName'),
			grid = me.lookupReference('refDriverLorryRegistrationChassisTabGrid'),
			selection = grid.getSelection()[0],
			trsptCd = newValue.get('ptnrCode'),
			trsptNm = newValue.get('ptnrName');
			
		colTransportName.setValue( trsptNm );
		selection.set({
			ptnrCd: trsptCd,
			ptnrNm: trsptNm
		});
	},
	
	onDriversNationalityComboBlur: function (combo, event, eOpts) {
		var displayFieldName = 'scdNm';
		ControlUtil.validationQueryMatch(combo, displayFieldName);
	},

	onAdd: function () {
		var me = this;
		var refs = me.getReferences();
		var currentTab = refs.tabDriverRorries.getActiveTab();
		var activeTabIndex = refs.tabDriverRorries.items.findIndex('id', currentTab.id);

		if (activeTabIndex === 0) {
			me.onDriversGridAdd();
		} else if(activeTabIndex === 1){
			me.onLorriesGridAdd();
		} else {
			me.onChassisGridAdd();
		}
	},

	onRemove: function () {
		var me = this;
		var refs = me.getReferences();

		var currentTab = refs.tabDriverRorries.getActiveTab();
		var activeTabIndex = refs.tabDriverRorries.items.findIndex('id', currentTab.id);

		if (activeTabIndex === 0) {
			me.onDriversGridRemove();
		} else if(activeTabIndex === 1){
			me.onLorriesGridRemove();
		} else {
			me.onChassisGridRemove();
		}
	},

	onTabChange: function () {
		var me = this;
		var refs = me.getReferences();
		var currentTab = refs.tabDriverRorries.getActiveTab();
		var activeTabIndex = refs.tabDriverRorries.items.findIndex('id', currentTab.id);

		if(activeTabIndex === 0){
			refs.ctlPartnerCdForGridField.setHidden(false);
			refs.ctlCompanyNameField.setHidden(true);
			refs.ctlRepresentiveField.setHidden(true);
			refs.ctlTruckNo.setHidden(true);
			refs.ctlChassisNo.setHidden(true);
			refs.ctlMeasureDt.setHidden(true);
			refs.ctlDriverSearch.setHidden(false);
			refs.ctlDriverNameSearch.setHidden(false);
			refs.refBtnVerify.setHidden(true);
		} else if(activeTabIndex === 1){
			refs.ctlPartnerCdForGridField.setHidden(false);
			refs.ctlCompanyNameField.setHidden(false);
			refs.ctlRepresentiveField.setHidden(false);
			refs.ctlTruckNo.setHidden(false);
			refs.ctlMeasureDt.setHidden(false);
			refs.ctlDriverSearch.setHidden(true);
			refs.ctlDriverNameSearch.setHidden(true);
			refs.ctlChassisNo.setHidden(true);
			refs.refBtnVerify.setHidden(false);
		} else {
			refs.ctlPartnerCdForGridField.setHidden(false);
			refs.ctlCompanyNameField.setHidden(false);
			refs.ctlRepresentiveField.setHidden(false);
			refs.ctlChassisNo.setHidden(false);
			refs.ctlMeasureDt.setHidden(false);
			refs.ctlTruckNo.setHidden(true);
			refs.ctlDriverSearch.setHidden(true);
			refs.ctlDriverNameSearch.setHidden(true);
			refs.refBtnVerify.setHidden(false);
		}
	},

	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var refs = me.getReferences();
		var searchBizParm = me.getSearchExportCondition();		
		var grid = gridNameString;
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.configuration.SearchDriverTruckRegistrationParm';
		
		if (me.getIndexTab() === 0) {
			grid = me.MAIN_GRID_REF_DRIVER_NAME;
			searchBizParm.serviceID = 'MOST.driverTruckRegistration.selectDriverRegistrationItems';
		} else if (me.getIndexTab() === 1) {
			grid = me.MAIN_GRID_REF_LORRY_NAME;
			searchBizParm.serviceID = 'MOST.driverTruckRegistration.selectTruckRegistrationItems';
		}else if (me.getIndexTab() === 2) {
			grid = me.MAIN_GRID_REF_CHASSIS_NAME;
			searchBizParm.serviceID = 'MOST.driverTruckRegistration.selectChassisRegistrationItems';
		}

		me.exportExcelPdfWithServer(grid,searchBizParm, isExcel);
	},
	/**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	getIndexTab: function (){
		var me = this;
		var refs = me.getReferences();
		var currentTab = refs.tabDriverRorries.getActiveTab();
		var activeTabIndex = refs.tabDriverRorries.items.findIndex('id', currentTab.id);
		var index = 0;
		
		if (activeTabIndex === 0) {
			index = 0;
		} else if (activeTabIndex === 1) {
			index = 1;
		}else if (activeTabIndex === 2) {
			index = 2;
		}
		return index;
		
	},
	
	getSearchExportCondition: function(){
		var me = this;
		var refs = me.getReferences();
		var store;
		var grid;
		
		if (me.getIndexTab() === 0) {
			store = me.getStore(me.DRIVER_LIST_STORE);
			grid = me.lookupReference(me.MAIN_GRID_REF_DRIVER_NAME);
		} else if (me.getIndexTab() === 1) {
			store = me.getStore(me.TRUCK_LIST_STORE);
			grid = me.lookupReference(me.MAIN_GRID_REF_LORRY_NAME);
		}else if (me.getIndexTab() === 2) {
			store = me.getStore(me.CHASSIS_LIST_STORE);
			grid = me.lookupReference(me.MAIN_GRID_REF_CHASSIS_NAME);
		}
		
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		var ptnrCd = refs.ctlPartnerCdForGridField.getValue();
		
		params['ptnrCd'] = ptnrCd;
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
		
		return params;
	},
	
	// Grid Cancel Edit
	onCancelEdit: function (rowEditing, context) {
		var me = this;
		me.gridCancelEdit(rowEditing, context);
	},

	onValidateLorryEdit: function (editor, context) {
		var me = this;
		var refs = me.getReferences();
		var record = context.record;
		var isValid = true;
		var lorryStore = me.getStore('checkTruckDuplicate');
	
		if (record.phantom == true) {
			lorryStore.each(function (record) {
				if (record.data.lorryNo == editor.grid.down('[dataIndex=lorryNo]').getEditor().getValue()) {
					MessageUtil.alert('Warning', 'driverlorry_lorryno_used_msg', record.data.ptnrCd);
					isValid = false;
					return false;
				}
			});
		}

		if (!isValid) {
			return false;
		}

		return true;
	},

	onValidateDriverEdit: function (editor, context) {
		var me = this;
		var refs = me.getReferences();
		var record = context.record;
		var isValid = true;
		var driverStore = me.getStore('checkDriverDuplicate');
		
		if (record.phantom == true) {
			driverStore.each(function (record) {
				if (record.data.driverId == editor.grid.down('[dataIndex=driverId]').getEditor().getValue()) {
					MessageUtil.warning('warning_msg', 'driverlorry_driveric_exist_msg');
					isValid = false;
					return false;
				}

				if (record.data.licsNo == editor.grid.down('[dataIndex=licsNo]').getEditor().getValue()) {
					MessageUtil.warning('warning_msg', 'driverlorry_licenseno_used_msg');
					isValid = false;
					return false;
				}
			});
		} 
		else {
			var driverStore = me.getStore(me.DRIVER_LIST_STORE);
			
			driverStore.each(function (record) {

				if (record.data.licsNo == editor.grid.down('[dataIndex=licsNo]').getEditor().getValue()) {
					MessageUtil.warning('warning_msg', 'driverlorry_licenseno_used_msg');
					isValid = false;
					
					return false;
				}
			});
		}
		if (!isValid) {
			return false;
		}

		return true;
	},
	
	onValidateChassisEdit: function (editor, context) {
		var me = this;
		var refs = me.getReferences();
		var record = context.record;
		var isValid = true;
		var chassisStore = me.getStore('checkChassisDuplicate');
	
		if (record.phantom == true) {
			chassisStore.each(function (records) {
				if (records.data.plateNo == editor.grid.down('[dataIndex=plateNo]').getEditor().getValue()) {
					MessageUtil.alert('Warning', 'driverlorry_chassis_used_msg', record.data.ptnrCd);
					isValid = false;
					
					return false;
				}
			});
			
			me.suspendEvent('edit');
		}

		if (!isValid) {
			return false;
		}

		return true;
	},

	onEdit: function (editor, context) {
		var me = this;
		me.gridEdit(editor, context);
	},

	//Edit Driver:
	onDblClickDriverGrid: function () {
		var me = this;
		var grid = me.lookupReference('refDriverLorryRegistrationDriversTabGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];

		if (selection == null) return;

		me.setGridDriverEditable(selection.phantom);
	},

	// Key Column Editable
	setGridDriverEditable: function (isCreate) {
		var me = this;
		var refs = me.getReferences();

		refs.refColDriverId.getEditor().setEditable(isCreate);
		refs.refColDriverId.getEditor().setDisabled(!isCreate);
	},

	//Edit Truck (Lorry):
	onDblClickLorryGrid: function () {
		var me = this;
		var grid = me.lookupReference('refDriverLorryRegistrationLorriesTabGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];

		if (selection == null) return;

		me.setGridLorryEditable(selection.phantom);
	},

	// Key Column Editable
	setGridLorryEditable: function (isCreate) {
		var me = this;
		var refs = me.getReferences();

		refs.refLorriesNo.getEditor().setEditable(isCreate)
		refs.refLorriesNo.getEditor().setDisabled(!isCreate);

		refs.refPtnrCd.getEditor().setEditable(isCreate);
		refs.refPtnrCd.getEditor().setDisabled(!isCreate);
	},
	
	//Edit Truck (Chassis):
	onDblClickChassisGrid: function () {
		var me = this;
		var grid = me.lookupReference('refDriverLorryRegistrationChassisTabGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];

		if (selection == null) return;

		me.setGridChassisEditable(selection.phantom);
	},

	// Key Column Editable
	setGridChassisEditable: function (isCreate) {
		var me = this;
		var refs = me.getReferences();

		refs.refPlateNo.getEditor().setEditable(isCreate);
		refs.refPlateNo.getEditor().setDisabled(!isCreate);
		
		refs.refChassisPtnrCd.getEditor().setEditable(isCreate);
		refs.refChassisPtnrCd.getEditor().setDisabled(!isCreate);
	},

	// Grid Add
	onDriversGridAdd: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refDriverLorryRegistrationDriversTabGrid');
		var store = me.getStore(me.DRIVER_LIST_STORE);
		var editor = grid.getPlugin('driverLorryRegistrationDriversTabGridEditor');
		var record = Ext.create('MOST.model.configuration.DriverTruckRegistration');
		var getPtnrCd = refs.ctlPartnerCdForGridField.getValue();
		var getPtnrNm = 'Long An International Port';
		var driverStore = me.getStore('checkDriverDuplicate');
		
		if(getPtnrCd === ''){
			MessageUtil.error('fail_msg', 'checkTransport');
			return;
		}
		
		driverStore.load({
			callback: function (records, operation, success) {
				if (success) {
				}
			}
		});

		me.setGridDriverEditable(record.phantom);
		refs.ctlDriverSearch.setValue('');
		editor.cancelEdit();

		//Clear filter for Grid
		grid.filters.clearFilters();
		grid.filters.disable();

		//Clear filter for Store
		store.clearFilter();

		var idx = 0;
		if (grid.getSelection() && grid.getSelection().length > 0) {
			idx = store.indexOfId(grid.getSelection()[0].get('id'));
		}

		record.set('ptnrCd', getPtnrCd);
		record.set('ptnrNm', getPtnrNm);
		record.set('divCd', 'DV');

		store.insert(idx, record);
		grid.getSelectionModel().select(record);

		editor.startEdit(record);
	},

	onDriversGridRemove: function () {
		var me = this;
		var grid = me.lookupReference('refDriverLorryRegistrationDriversTabGrid');
		var store = me.getStore(me.DRIVER_LIST_STORE);

		me.gridRemoveRow(grid, store, function () {
			MessageUtil.saveSuccess();
		});
	},

	onLorriesGridAdd: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refDriverLorryRegistrationLorriesTabGrid');
		var store = me.getStore(me.TRUCK_LIST_STORE);
		var editor = grid.getPlugin('driverLorryRegistrationLorriesTabGridEditor');
		var record = Ext.create('MOST.model.configuration.DriverTruckRegistration');
		var getPtnrCd = refs.ctlPartnerCdForGridField.getValue();

		me.setGridLorryEditable(record.phantom);

		editor.cancelEdit();

		//Clear filter for Grid
		grid.filters.clearFilters();
		grid.filters.disable();

		//Clear filter for Store
		store.clearFilter();

		var idx = 0;
		
		if (grid.getSelection() && grid.getSelection().length > 0) {
			idx = store.indexOfId(grid.getSelection()[0].get('id'));
		}

		// record.set('ptnrCd', getPtnrCd);
		record.set('divCd', 'LR');

		store.insert(idx, record);
		grid.getSelectionModel().select(record);

		editor.startEdit(record);
	},

	onLorriesGridRemove: function () {
		var me = this;
		var grid = me.lookupReference('refDriverLorryRegistrationLorriesTabGrid');
		var store = me.getStore(me.TRUCK_LIST_STORE);

		me.gridRemoveRow(grid, store, function () {
			MessageUtil.saveSuccess();
		});
	},
	
	onChassisGridAdd: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refDriverLorryRegistrationChassisTabGrid');
		var store = me.getStore(me.CHASSIS_LIST_STORE);
		var editor = grid.getPlugin('driverLorryRegistrationChassisTabGridEditor');
		var record = Ext.create('MOST.model.configuration.DriverTruckRegistration');
		var getPtnrCd = refs.ctlPartnerCdForGridField.getValue();
		var checkChassisDuplicate = me.getStore('checkChassisDuplicate');
		checkChassisDuplicate.load();

		me.setGridChassisEditable(record.phantom);

		editor.cancelEdit();

		//Clear filter for Grid
		grid.filters.clearFilters();
		grid.filters.disable();

		//Clear filter for Store
		store.clearFilter();

		var idx = 0;
		
		if (grid.getSelection() && grid.getSelection().length > 0) {
			idx = store.indexOfId(grid.getSelection()[0].get('id'));
		}

		record.set('divCd', 'CH');

		store.insert(idx, record);
		grid.getSelectionModel().select(record);

		editor.startEdit(record);
	},

	onChassisGridRemove: function () {
		var me = this;
		var grid = me.lookupReference('refDriverLorryRegistrationChassisTabGrid');
		var store = me.getStore(me.CHASSIS_LIST_STORE);

		me.gridRemoveRow(grid, store, function () {
			MessageUtil.saveSuccess();
		});
	},

	afterSetCodePopupData: function (xtype, targetControl, returnValue) {
		var me = this;
		var refs = me.getReferences();
		
		if (targetControl === 'ctlPartnerCdForGridField') {
			if (returnValue) {
				refs.ctlCompanyNameField.setValue(returnValue.item.data.ptnrName);
				refs.ctlRepresentiveField.setValue(returnValue.item.data.representative);
			} else {
				refs.ctlCompanyNameField.setValue('');
				refs.ctlRepresentiveField.setValue('');
			}
		}
	},
	
	onColumnButtonSetting:function(){
		var me = this;
		var refs = me.getReferences();
		
		if(refs.tabDriverRorries.getActiveTab().title == ' Drivers'){
			refs.refDriverColumn.setHidden(false);
			refs.refLorryColumn.setHidden(true);
			refs.refChassisColumn.setHidden(true);
		} else if(refs.tabDriverRorries.getActiveTab().title == ' Truck'){
			refs.refDriverColumn.setHidden(true);
			refs.refLorryColumn.setHidden(false);
			refs.refChassisColumn.setHidden(true);
		} else {
			refs.refDriverColumn.setHidden(true);
			refs.refLorryColumn.setHidden(true);
			refs.refChassisColumn.setHidden(false);
		}
	},

	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */

	saveProcess: function(recvData){
		var me = this;
		var refs = me.getReferences();
		var isCreate = false;
		var masterItem = Ext.create('MOST.model.configuration.DriverTruckRegistration');
		var proxy = masterItem.getProxy();
		var currentTab = refs.tabDriverRorries.getActiveTab();
		var activeTabIndex = refs.tabDriverRorries.items.findIndex('id', currentTab.id);
		var store;
		
		if(activeTabIndex === 1){
			store =  me.getViewModel().getStore(me.TRUCK_LIST_STORE);
		} else if(activeTabIndex === 2){
			store =  me.getViewModel().getStore(me.CHASSIS_LIST_STORE);
		}
		
		proxy.url = store.getProxy().url;

		masterItem.phantom = isCreate;
		
		masterItem.set('newVersion', me.generateUuid());
		masterItem.set('allowWgt', recvData.data.allowWgt);
		masterItem.set('tareWgt', recvData.data.tareWgt);
		masterItem.set('measureDt', recvData.data.measureDt);
		masterItem.set('useYn', recvData.data.useYn);
		masterItem.set('vldYn', recvData.data.vldYn);
		masterItem.set('remark', recvData.data.remark);
		masterItem.set('userId', MOST.config.Token.getUserId());
		masterItem.set('lorryNo', recvData.data.lorryNo);
		masterItem.set('ptnrCd', recvData.data.ptnrCd);
		masterItem.set('plateNo', recvData.data.plateNo);

		masterItem.save({
			success:function(){
				store.commitChanges();
				MessageUtil.saveSuccess(); 
				me.onSearch();
			}
		});
	}
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});