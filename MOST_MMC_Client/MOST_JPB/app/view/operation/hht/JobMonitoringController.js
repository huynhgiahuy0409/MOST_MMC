Ext.define('MOST.view.operation.hht.JobMonitoringController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.jobmonitoringctl',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		
		var shiftListStore = me.getStore('shiftList');
		shiftListStore.load();

		me.getViewModel().setData({theDetail: me.getView().recvData});
		if(me.getView().recvData){
			if(me.getView().recvData.data.cgTpCd == 'BBK'){
				refs.refNmbMt.setReadOnly(true);
				refs.refNmbM3.setReadOnly(true);
			}
			me.getView().recvData.commit(); // Close Check(dirty)
		}
		me.getViewModel().set('selectedRecord', Ext.create('MOST.model.operation.CargoJob'));
		if(refs.refBtnSave2){
			refs.refBtnSave2.setDisabled(true);
		}
		if(refs.refBtnDelete2){
			refs.refBtnDelete2.setDisabled(true);
		}
		me.onSearch();
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
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var allDataStore = me.getStore('jobMonitoringAllData');
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
    	allDataStore.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if(records != null && records.length > 0){
						me.setDetailControl(records[0]);
					}
				}
			}
		});
	},

	onChangeQty: function(){
		var me = this,
			recvData = me.getView().recvData,
			eachMt = '',
			eachM3 = '',
		 	refs = me.getReferences();
		if(recvData){
			if (recvData.data.catgCd == 'I') {
				eachMt = recvData.data.eachWeight;
				eachM3 = recvData.data.eachVolume;
			}
			else {
				eachMt = recvData.data.eachMt;
				eachM3 = recvData.data.eachM3;
			}
			if(recvData.data.cgTpCd == 'BBK'){
				var qty = refs.refNmbQty.getValue();
				var mt = qty * eachMt;
				var m3 = qty * eachM3;
				refs.refNmbM3.setValue(m3);
				refs.refNmbMt.setValue(mt);
			}
		}
		
	},
	
	// Detail Control Setting
	setDetailControl:function(record){
		var me = this;
		var store = me.getStore('jobMonitoring');
		var modeOfOprComboStore = me.getStore('jobMonitoringModeOfOprCombo');
		var hatchNoComboStore = me.getStore('jobMonitoringHatchNoCombo');
		var packageTypeComboStore = me.getStore('jobMonitoringPackageTypeCombo');
		
		modeOfOprComboStore.setData(record.get('oprList'));
		hatchNoComboStore.setData(record.get('hatchNoList'));
		packageTypeComboStore.setData(record.get('packageTypeList'));
		
		store.setData(record.get('items'));
		store.commitChanges();
		
		me.getViewModel().set('selectedRecord', Ext.create('MOST.model.operation.CargoJob'));
	},
	
	// Grid Edit
	onEdit : function(editor, context){
		var me = this;
		me.gridEdit(editor, context);
		onSearch();
	},
	
	// Grid Validate Edit
	onValidateEdit : function(editor, context) {
		var me = this;
		var record = context.record;
		var startDate = editor.grid.down('[dataIndex=workStDt]').getEditor().getValue();
		var endDate = editor.grid.down('[dataIndex=workEndDt]').getEditor().getValue();
		var dateValidation = me.validateFromToDate(startDate, endDate);

		if(!dateValidation){
			return false;
		}
		
		if(record.get('cudYn') === 'Y'){ // Exists 'RC'
			if(record.get('rcCount') <= 0){
				MessageUtil.warning('warning_msg', 'jobmonitoring_update_msg'); // CT121011002
				return false;
			}
		}
		
		if(record.get('jobRootYn') === 'Y' &&
			(record.get('jobPurpCd') === 'VA' ||
			 record.get('jobPurpCd') === 'WA' ||
			 record.get('jobPurpCd') === 'GA')){
			MessageUtil.warning('warning_msg', 'jobmonitoring_update_cgno_msg'); // CT121011003
			return false;
		} else if (record.get('fnlOpeYn') === 'Y' && record.get('workEndDt') == null){
			MessageUtil.warning('warning_msg', 'jobmonitoring_update_cargo_final_msg'); // CT121011005
			return false;
		}
		
		return true;
	},
	
	// Grid Cancel Edit
	onCancelEdit : function(rowEditing, context) {
		var me = this;
		me.gridCancelEdit(rowEditing, context);
	},

	onUpdate:function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('jobMonitoring');

		var bValidateion = true;
		store.getModifiedRecords().forEach(function(record, index, array){
			if(!me.onValidation(record)){
				bValidateion = false;
			}
			
			// check shift at discharge or Loading.
			if( record.get('jobPurpCd') === 'VA' 
				|| record.get('jobPurpCd') === 'VG' 
				|| record.get('jobPurpCd') === 'GV'
				|| record.get('jobPurpCd') === 'AV'
			) {
				var stDt= record.get('workStDt');
				var endDt= record.get('workEndDt');
				var shiftStart = me.setFmTimeByShift(record);
				var shiftEnd  = me.setToTimeByShift(record);
				if(shiftStart && shiftEnd){
					if (me.validDate(shiftStart, stDt) < 0 || me.validDate(stDt, shiftEnd) < 0) {
						MessageUtil.error('fail_msg', 'Start Time and End Time must be in Shift.');
						bValidateion = false;
					}
					if (me.validDate(shiftStart, endDt) < 0 || me.validDate(endDt, shiftEnd) < 0) {
						MessageUtil.error('fail_msg', 'Start Time and End Time must be in Shift.');
						bValidateion = false;
					}			
				}
			}
			if(record.get('jobPurpCd') === 'IO' || record.get('jobPurpCd') === 'OI'){

			}
		});

		if(bValidateion){
			store.sync({
				success:function(){
					MessageUtil.saveSuccess(); 
					me.onSearch();
				}
			})
		}
	},
	
	onValidation: function(record){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refJobMonitoringGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;

		var jobPurpCd = selection.get('jobPurpCd');

		if(jobPurpCd !== 'IO' && jobPurpCd !== 'OI'){
			if(!me.onValidateWorkingTime(record.get('workStDt'), record.get('workEndDt'))){
			MessageUtil.error('fail_msg', 'Please check Start time and End Time.');
			return false;
			}
			if(record.get('wgt')===0){
				MessageUtil.error('fail_msg', 'Please input MT.');
				return false;
			}
		}	
		
		//Update Gate Job:...
		
		return true;
	},
	validDate: function(startDate, endDate){
		var countTime = 0 ;

		if (startDate && endDate) {
			countTime = Ext.Date.diff(startDate, endDate, Ext.Date.HOUR);
		}
		
		return countTime;
	},
	setFmTimeByShift: function(record){
		var me = this;
		var refs = me.getReferences();
		var shiftListStore = me.getStore('shiftList');
		if(shiftListStore.loadCount <= 0){
			shiftListStore.load();
		}
		
		//var workYmd = me.getView().recvData.get('workDate');
		//var shftId = me.getView().recvData.get('shiftId');
		var workYmdTemp = record.get('shftDt');
		var workYmd = workYmdTemp.substr(0,4) + workYmdTemp.substr(5,2) + workYmdTemp.substr(8,2);
		var shftId = record.get('shftId');

		if(!workYmd || !shftId){
			return null;
		}
			
		var shift = shiftListStore.findRecord('shftId', shftId);

		var fmShiftTime = Ext.Date.parse(workYmd + ' ' + shift.get('fmHhmm').substr(0,2) + ':' + shift.get('fmHhmm').substr(2,2),  'Ymd H:i');
		return fmShiftTime;
	},
	
	setToTimeByShift: function(record){
		var me = this;
		var refs = me.getReferences();
		
		var shiftListStore = me.getStore('shiftList');
		if(shiftListStore.loadCount <= 0){
			shiftListStore.load();
		}
		//var workYmd = me.getView().recvData.get('workDate');
		//var shftId = me.getView().recvData.get('shiftId');
		var workYmdTemp = record.get('shftDt');
		var workYmd = workYmdTemp.substr(0,4) + workYmdTemp.substr(5,2) + workYmdTemp.substr(8,2);
		var shftId = record.get('shftId');
		
		if(!workYmd || !shftId){
			return null;
		}
		var shift = shiftListStore.findRecord('shftId', shftId);
		
		var toShiftTime = Ext.Date.parse(workYmd + ' ' + shift.get('toHhmm').substr(0,2) + ':' + shift.get('toHhmm').substr(2,2),  'Ymd H:i');
		if(shftId == 'SF0013'){
			toShiftTime.setDate(toShiftTime.getDate() + 1);
		}
		
		return toShiftTime;
	},
	
	onValidateWorkingTime: function(workStDt, workEndDt){
		var me = this;
		var refs = me.getReferences();
		var iSuccess = true;
		
		if (workStDt != null && workEndDt != null) {
			if(!DateUtil.validateFromToDate(workStDt, workEndDt)){
				MessageUtil.warning('fromtimeTitle', "validateworkingtimeMessage");
				iSuccess = false;
			}
			
		} else if (workStDt != null || workEndDt != null) {
			MessageUtil.error('fail_msg', "validationWorkDateConfirm");
			iSuccess = false;
		}
		
		return iSuccess;
		
	},
	
	// Grid Row Remove
	onRemove: function() {
		var me = this;
		var grid = me.lookupReference('refJobMonitoringGrid');
		var store = me.getStore('jobMonitoring'); 
		
		//Checking order job:
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];

		//Validate have to delete latest job first:
		var isValid = true;
		store.each(function(record) {
			if(record.get('delvTp') === selection.get('delvTp')
				&& record.get('jobNo') > selection.get('jobNo')){
				MessageUtil.warning('warning_msg', 'Please delete the jobs in the last order first');
				isValid = false;
				return;
			}
		});

		if(!isValid){
			return;
		}
		
		me.gridRemoveRow(grid, store, me.removeComplete);
	},
	
	// Grid Row Double
	onDblClick: function() {
		var me = this;
		var grid = me.lookupReference('refJobMonitoringGrid');
		
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		me.setGridColumnEditable(grid, selection);
	},
	
	onJobMonitoringGridClick:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refJobMonitoringGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;

		//Set Control by CarogType : tobe dev...

		
		var isBBk = selection.get('cgTpCd');
		var gateJob = (selection.get('jobTpCd') == 'GI' || selection.get('jobTpCd') == 'GO');

		if(me.getView().recvData){
			if(gateJob){
				selection.set('workEndDt','');
				refs.refNmbMt.setReadOnly(gateJob);
				refs.refNmbM3.setReadOnly(gateJob);
			}
			if(me.getView().recvData.data.cgTpCd == 'BBK'){
				refs.refNmbMt.setReadOnly(true);
				refs.refNmbM3.setReadOnly(true);
			}
		}

        refs.refNmbQty.setReadOnly(gateJob);
        refs.refTxtEndDt.setDisabled(gateJob);
		refs.refTxtEndDt.setAllowBlank(gateJob);
		
        refs.refCboHatchNo.setDisabled(gateJob);
        refs.refTxtPkgTp.setReadOnly(gateJob);
        refs.refCboOpeMode.setDisabled(gateJob);
        refs.refCboFinal.setDisabled(gateJob);
		
		if(refs.refBtnSave2){
			refs.refBtnSave2.setDisabled(false);
		}
		if(refs.refBtnDelete2){
			refs.refBtnDelete2.setDisabled(false);
		}
		
		me.getViewModel().set('selectedRecord', selection);
	},
	
	// Column Editable
	setGridColumnEditable:function(grid, selection){
		var me = this;
		var refs = me.getReferences();
		
		if(selection.get('jobPurpCd') === 'VG' ||
		   selection.get('jobPurpCd') === 'GV'){
			grid.down('[dataIndex=fnlOpeYn]').getEditor().setEditable(true);
		} else {
			if(selection.get('jobPurpCd') === 'VW' ||
			   selection.get('jobPurpCd') === 'GW' ||
			   selection.get('jobPurpCd') === 'WG' ||
			   selection.get('jobPurpCd') === 'WV' ||
			   selection.get('jobPurpCd') === 'AV' ||
			   selection.get('jobPurpCd') === 'WA' ||
			   ((selection.get('opeClassCd') === 'I' || selection.get('opeClassCd') === 'T') &&
			    (selection.get('jobPurpCd') === 'VA' || selection.get('jobPurpCd') === 'AW'))){
				grid.down('[dataIndex=fnlOpeYn]').getEditor().setEditable(true);
			} else {
				grid.down('[dataIndex=fnlOpeYn]').getEditor().setEditable(false);
			}
			
		}
	},
	
	// Grid combo Renderer
	onGridComboRenderer: function(val, cell){
		var me = this;
        var refs = me.getReferences();
		
		var codeComboStore = null;
		var displayFieldName = 'scdNm';
		var codeFieldName = 'scd';
		
		if(cell.column.dataIndex == 'tsptTpCd'){			// Mode Of Opr COMBO
			codeComboStore = me.getViewModel().getStore('jobMonitoringModeOfOprCombo');
		} else if(cell.column.dataIndex == 'repkgTypeCd'){ 	// Package Type COMBO
			codeComboStore = me.getViewModel().getStore('jobMonitoringPackageTypeCombo');
		} else if(cell.column.dataIndex == 'fnlOpeYn'){	// FINAL COMBO
			codeComboStore = me.getViewModel().getStore('jobMonitoringYnCombo');
		}

		if(codeComboStore != null){
			var indx = -1;
			
			if(cell.column.dataIndex == 'tsptTpCd'){
				indx = codeComboStore.find(codeFieldName, val);
			} else if(cell.column.dataIndex == 'repkgTypeCd'){
				indx = codeComboStore.find(codeFieldName, val);
			} else if(cell.column.dataIndex == 'fnlOpeYn'){
				indx = codeComboStore.find(codeFieldName, val);
				if(indx < 0){
					indx = 1;
				}
			} else {
				indx = codeComboStore.find(codeFieldName, val);
			}

			if (indx != -1){
				return codeComboStore.getAt(indx).get(displayFieldName); 
			}
		}
		
		return '';
	},
	
	onExportExcelPdfWithServer: function(){
		
	},
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	// removeComplete
	removeComplete : function(me){
		var parentView = me.getParentView();
		var window = me.getView().up('window');
		var store = me.getStore('jobMonitoring'); 

		 if(parentView.getController().onSearch){
			 MessageUtil.saveSuccess();
			 me.onSearch();
			 parentView.getController().onSearch();
		 }
		 
		 if(store.data.items.length == 0){
			window.close();
		 }
	},
	
	// Search Condition
	getSearchCondition:function(){
		var me = this;
     	var refs = me.getReferences();
    	
     	var params;
    	if(me.getView().getReference() == "refapp-whreconciljobmonitoring"){
    		params = {
    				cgNo : me.getView().recvData.get('cgNo'),
    				vslCallId : me.getView().recvData.get('vslCallId'),
    				jobTpCd: 'RC'
    		};
    	}else if (me.getView().getReference() == "refapp-jobmonitoring"){
    		params = {
    				cgNo : me.getView().recvData.get('cgNo'),
					docTp: me.getView().recvData.get('docTp'),
    				vslCallId : me.getView().recvData.get('vslCallId')
    		};
    		
    		if(me.getView().recvData.get('viewType') == 'HIOLIST'){//HIOLIST = Handling In/Out List
    			params = {
        				cgNo : me.getView().recvData.get('cgNo'),
        				vslCallId : me.getView().recvData.get('vslCallId'),
        				searchType: 'HI'
        		};
    		}
    		
    		if(me.getView().recvData.get('parentAlias') == 'app-rehandleoperationlist'){
    			var arr = me.getView().recvData.get('rhdlNo').split(",");
    			var rhdlNoArr = new Array();
    			arr.forEach(function(data){
    				rhdlNoArr.push(Ext.String.format("'{0}'", data));
    			});
    			
    			params = {
        				cgNo : (me.getView().recvData.get('rhdlMode') == 'R') ? me.getView().recvData.get('cgNo') : me.getView().recvData.get('nxCgNo'),
        				vslCallId : (me.getView().recvData.get('rhdlMode') == 'R') ? me.getView().recvData.get('vslCallId') : me.getView().recvData.get('nxVslCallId'),
        			    rhdlNo: rhdlNoArr
        		};
    		}
    	}
    	
    	
    	return params;
	},
	
	onOpenCommonCodePopup:function(field, button, e){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refJobMonitoringGrid;
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var params = {
				searchType: 'COMM',
				searchDivCd: 'PKGTP',
				searchLcd: 'MT'
			};
		
		me.openCodePopup('popup-cmmcdpopup', field.reference, params);
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if (Ext.platformTags.classic) {	
		var grid = refs.refJobMonitoringGrid;
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(targetControl === 'refTxtRePkgTypeCode'){
			if(returnValue){
				selection.set('repkgTypeCd', returnValue.code);
			}
		 } 
		}else if (Ext.platformTags.modern){
			if(targetControl ==='refPkgTpCgjobHHT'){
				refs.refPkgTpCgjobHHT.setValue(returnValue.code);
			}
		}
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
	
	/* HHT TABLET - START
	 * ====================================================
	 * 
	 *
	 */
		
	onSearchHHT: function() {
		var me = this;
     	var refs = me.getReferences();
    	var allDataStore = me.getStore('jobMonitoringAllData');
    	var params = me.getSearchHHTCondition();   	
		var workDate = me.getView().recvData.get('shftDt');
		refs.refWDTextfield.setValue(Ext.Date.format(workDate,MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));

		if(params == null){
    		return;
    	}
    	
    	allDataStore.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if(records != null && records.length > 0){
						me.setDetailControlHHT(records[0]);
						
						refs.refHatchCgJobHHT.setValue(params.hatchNo);
					}
				}
			}
		});
	},
	
	getSearchHHTCondition:function(){
		var me = this;
     	var refs = me.getReferences();
     	var params;
    	if(me.getView().getReference() == "refapp-whreconciljobmonitoring"){
    		params = {
    				cgNo : me.getView().recvData.get('cgNo'),
    				vslCallId : me.getView().recvData.get('vslCallId'),
    				jobTpCd: 'RC'
    		};
    	}else if (me.getView().recvData.get('screen') == "app-cargoJobMonitoring"){
    		params = {
    				cgNo : me.getView().recvData.get('cgNo'),
    				vslCallId : me.getView().recvData.get('vslCallId'),
    				catgCd : me.getView().recvData.get('catgCd'),
    				hatchNo : me.getView().recvData.get('hatchNo'),
    				searchType: 'HHTJOBMONITORINGEXPORT',
    		};
    		
    		if(me.getView().recvData.get('viewType') == 'HIOLIST'){//HIOLIST = Handling In/Out List
    			params = {
        				cgNo : me.getView().recvData.get('cgNo'),
        				vslCallId : me.getView().recvData.get('vslCallId'),
        				searchType: 'HI'
        		};
    		}
    		
    		refs.refBLGRCgjobHHT.setValue(params.cgNo);
    	}   	
    	return params;
	},
	
	setDetailControlHHT:function(record){
		var me = this;
		var store = me.getStore('jobMonitoring');
		var modeOfOprComboStore = me.getStore('jobMonitoringModeOfOprCombo');
		var hatchNoComboStore = me.getStore('jobMonitoringHatchNoCombo');
		var packageTypeComboStore = me.getStore('jobMonitoringPackageTypeCombo');
		
		modeOfOprComboStore.setData(record.get('oprList'));
		hatchNoComboStore.setData(record.get('hatchNoList'));
		packageTypeComboStore.setData(record.get('packageTypeList'));
		
		store.setData(record.get('items'));
		store.commitChanges();
	},

	onCgJobHHTClick:function(ctx, td, cellIndex, record){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refCgJobHHTGrid');
		var selection = grid.getSelection();
		if(selection == null) return;	
		
		me.getViewModel().setData({theCgJobMonitoring:selection.data});
		if(selection.get("fnlOpeYn") == 'Y'){
			refs.CgJobHHTChxFinal._checked = true;
			refs.CgJobHHTChxFinal.updateChecked(true);
		}else{
			refs.CgJobHHTChxFinal._checked = false;
			refs.CgJobHHTChxFinal.updateChecked(false);
		}
		refs.refStartTimeCgJobHHT.setValue(selection.get('workStDt'));
		refs.refEndTimeCgJobHHT.setValue(selection.get('workEndDt'));
	},
	
	onCheckUpdateCgJobHHT : function() {
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refCgJobHHTGrid;
		var selection = grid.getSelection();
		var startDate = Ext.Date.parse(refs.refStartTimeCgJobHHT.getValue(),'d/m/Y H:i');
		var endDate = Ext.Date.parse(refs.refEndTimeCgJobHHT.getValue(),'d/m/Y H:i');
		var dateValidation = me.validateFromToDate(startDate, endDate);
		
		if(selection == null) return;
		if(!dateValidation){
			return false;
		}
		
		if(selection.get('cudYn') === 'Y'){ // Exists 'RC'
			if(selection.get('rcCount') <= 0){
				MessageUtil.warning('warning_msg', 'jobmonitoring_update_msg'); // CT121011002
				return false;
			}
		}
		
		if(selection.get('jobRootYn') === 'Y' &&
			(selection.get('jobPurpCd') === 'VA' ||
			selection.get('jobPurpCd') === 'WA' ||
			selection.get('jobPurpCd') === 'GA')){
			MessageUtil.warning('warning_msg', 'jobmonitoring_update_cgno_msg'); // CT121011003
			return ;
		} else if (selection.get('fnlOpeYn') === 'Y' && selection.get('workEndDt') == null){
			MessageUtil.warning('warning_msg', 'jobmonitoring_update_cargo_final_msg'); // CT121011005
			return ;
		}
		MessageUtil.questionModern('Confirm', 'infoupdate_msg',null,
				function(button){
					if (button === 'ok') {
						me.UpdateCgJobMonitoringHHT();
				    
			        }else if(button === 'cancel'){
			        	return;
			        };
				}
			);
		
	},
	UpdateCgJobMonitoringHHT:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refCgJobHHTGrid;
		var store = me.getStore('jobMonitoring');
		var selecedRecord = grid.getSelection() ;
		
		var sltIndex = grid.store.indexOf(selecedRecord);
		var item =Ext.create('MOST.model.operation.CargoJob');
		store.each(function(record, index){
			if(index === sltIndex){				
				record.data = selecedRecord.data;
				record.set('workStDt', Ext.Date.parse(refs.refStartTimeCgJobHHT.getValue(),'d/m/Y H:i'));
				record.set('workEndDt', Ext.Date.parse(refs.refEndTimeCgJobHHT.getValue(),'d/m/Y H:i'));	
				if(refs.CgJobHHTChxFinal._checked == true){
					record.set('fnlOpeYn', "Y")
				}else{
					record.set('fnlOpeYn', "N")
				}
				record.dirty = true;
			}
		});
		
		store.sync({
			success:function(){				
				MessageUtil.saveSuccess();
				me.onSearchHHT();
			}
		});		
	},
//	onOKCgJobHHT: function(btn){
//		MessageUtil.questionModern('Confirm', 'modity_save_confirm_msg',null,
//				function(button){
//					if (button === 'ok') {
//						btn.up('window').close();
//				    
//			        }else if(button === 'cancel'){
//			        	return;
//			        };
//				}
//			);		
//	},
	onSearchpktpCargoJobHHT: function(){
		var me = this;
		var targetCtl = 'refPkgTpCgjobHHT';
		var title = 'Package Type';
		var params = {
				title: title,
				searchType: 'COMM',
				searchDivCd: 'PKGTP',
				searchLcd: 'MT',
				searchCol1:'',
			};
		ViewUtil.openCodePopup(this, 'app-commoncodepopuphht', targetCtl, params);
	},
	
	exportTo: function(btn) {
    	var me = this;
    	var refs = me.getReferences();
    	
        var cfg = Ext.merge({
            title: 'Job Monitoring',
            fileName: 'Job_Monitoring' + '.' + (btn.cfg.ext || btn.cfg.type)
        }, btn.cfg);

        var grid = refs.refJobMonitoringGrid;
        grid.saveDocumentAs(cfg);
    }
	
});