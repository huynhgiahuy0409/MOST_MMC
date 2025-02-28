Ext.define('MOST.view.planning.VesselScheduleInternalModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.vesselscheduleinternal',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.planning.VesselSchedule',
		'MOST.model.common.FileUpload'
	],
	
	formulas:{
		domesticChecked:{
  			bind:{
  				bindTo:'{theMain.domesticChk}'
  			},
  			get:function(value){
  				if(value === 'true'){
  					return 'Y';
  				}else if(value === 'false'){
  					return 'N';
  				}else{
  					return value; 
  				}
  			},
  			set:function(value){
  				var me = this;
  				var stringValue = 'N';
  				if(value == true){
  					stringValue = 'Y';
  				}
  				
				var detailItem = me.getView().getViewModel().get('theMain');
				detailItem.set('domesticChk', stringValue);
  			}
  		},
  		
  		dbYnChecked:{
  			bind:{
  				bindTo:'{theMain.dbYn}'
  			},
  			get:function(value){
  				var me = this;
  				if(value === "Y"){
  					return true; 
  				} else {
  					return false;
  				}
  			}
  		},

  		csYnChecked:{
  			bind:{
  				bindTo:'{theMain.csYn}'
  			},
  			get:function(value){
  				var me = this;
  				if(value === "Y"){
  					return true; 
  				} else {
  					return false;
  				}
  			}
  		},

  		dgGoodYnChecked:{
  			bind:{
  				bindTo:'{theMain.dgGoodYn}'
  			},
  			get:function(value){
  				var me = this;
  				if(value === "Y"){
  					return true; 
  				} else {
  					return false;
  				}
  			}
  		},

  		ispsYnChecked:{
  			bind:{
  				bindTo:'{theMain.ispsYn}'
  			},
  			get:function(value){
  				var me = this;
  				if(value === "Y"){
  					return true; 
  				} else {
  					return false;
  				}
  			}
  		},
  		
  		atbPilotChecked:{
  			bind:{
  				bindTo:'{theMain.atbPilot}'
  			},
  			get:function(value){
  				var me = this;
  				if(value === "Y"){
  					return true; 
  				} else {
  					return false;
  				}
  			},
  			set:function(value){
  				var me = this;
  				var stringValue = "N";
  				
  				if(value == true){
  					stringValue = "Y";
  				}
  				
				var detailItem = me.getView().getViewModel().get('theMain');
				detailItem.set("atbPilot", stringValue);
  			}
  		},
  		
  		atuPilotChecked:{
  			bind:{
  				bindTo:'{theMain.atuPilot}'
  			},
  			get:function(value){
  				var me = this;
  				if(value === "Y"){
  					return true; 
  				} else {
  					return false;
  				}
  			},
  			set:function(value){
  				var me = this;
  				var stringValue = "N";
  				
  				if(value == true){
  					stringValue = "Y";
  				}
  				
				var detailItem = me.getView().getViewModel().get('theMain');
				detailItem.set("atuPilot", stringValue);
  			}
  		},
  		
  		confirmationSlipDbYnChecked:{
  			bind:{
  				bindTo:'{theConfirmationSlip.dbYn}'
  			},
  			get:function(value){
  				var me = this;
  				if(value === "Y" || value === "true"){
  					return true; 
  				} else {
  					return false;
  				}
  			},
  			set:function(value){
  				var me = this;
  				var stringValue = "N";
  				
  				if(value == true){
  					stringValue = "Y";
  				}
  				
				var detailItem = me.getView().getViewModel().get('theConfirmationSlip');
				detailItem.set("dbYn", stringValue);
  			}
  		}
	},

	stores: {
		vesselScheduleInternal: {
			model: 'MOST.model.planning.VesselSchedule',
			storeId: 'vesselScheduleInternalStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselscheduleinternal/list'
			}
		},
		
		vesselScheduleDetailMain: {
			model: 'MOST.model.planning.VesselSchedule',
			storeId: 'vesselScheduleDetailMainStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselscheduleinternal/confirmationSlip'
			}
		},
		
		confirmationSlipStowagePlanDownload : {
			model : 'MOST.model.common.FileUpload',
			storeId: 'confirmationSlipStowagePlanDownloadStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/file/manage/filedownload'
			}
		},
		
		confirmationSlipStowagePlanUpload : {
			model : 'MOST.model.common.FileUpload',
			storeId: 'confirmationSlipStowagePlanUploadStore'
		},
		
		confirmationSlipDryBreakBulk: {
			model: 'MOST.model.planning.VesselSchedule',
			storeId: 'vesselScheduleDetailMainStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselscheduleinternal/ConfirmationSlipBreakBulkList'
			}
		},
		
		confirmationSlipLiquidBulk: {
			model: 'MOST.model.planning.VesselSchedule',
			storeId: 'vesselScheduleDetailMainStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselscheduleinternal/ConfirmationSlipLiquidBulkList'
			}
		},
		
		ispsVesselInformation: {
			model: 'MOST.model.planning.VesselSchedule',
			storeId: 'ispsVesselInformationStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselschedule/ispsVesselInformationList'
			}
		},
		
		vesselScheduleInternalVslTypeSearchCombo : {
			model: 'MOST.model.planning.VesselSchedule',
			storeId: 'vesselScheduleInternalVslTypeSearchComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselscheduleinternal/selectVslTpCombo'
			},
			listeners: {
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'All',
			        	  scd: ''
			          }]);
			     }
			}
		},
		
		vesselScheduleInternalCargoTypeSearchCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'vesselScheduleInternalCargoTypeSearchComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/codeMaster/selectCodeMasterList',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_CGTP
				}
			},
			listeners: {
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'All',
			        	  scd: ''
			          }]);
			     }
			}
		},
		
		vesselScheduleInternalVslStatusSearchCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'vesselScheduleInternalVslStatusSearchComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/codeMaster/selectCodeMasterList',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_MPTSSTAT
				}
			},
			listeners: {
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'All',
			        	  scd: ''
			          }]);
			     }
			}
		},
		
		vesselScheduleInternalSchStatusSearchCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'vesselScheduleInternalSchStatusSearchComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/codeMaster/selectCodeMasterList',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_VSLSTATUS,
					scdUse: 'Y'
				}
			},
			listeners: {
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'All',
			        	  scd: ''
			          }]);
			     }
			}
		},
		
		vesselScheduleInternalPlanSearchCombo : {},
		
		vesselScheduleBerthInfoCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'vesselScheduleBerthInfoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_BERTH_LOC
				}
			},
			listeners: {
				load: function(store, records) {
					store.insert(0, [{
						locNm: 'All',
						locId: ''
			        }]);
			     }
			}
		},
		
		vesselScheduleBerthLabelCombo : {},
		
		// ======================================================
		// Vessel Schedule Detail Tab Combo Start
		vesselScheduleCargoOperationCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'vesselScheduleCargoOperationComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_CGOPETP,
					scdUse: 'Y'
				}
			},
			listeners: {
				load: function(store, records) {
					store.insert(0, [{
						scdNm: 'Select',
						scd: ''
					}]);
				}
			}
		},
		
		vesselScheduleCargoTypeUnLiquidCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'vesselScheduleCargoTypeUnLiquidComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_CGTPNLQ,
					scdUse: 'Y'
				}
			},
			listeners: {
				load: function(store, records) {
					store.insert(0, [{
						scdNm: 'Select',
						scd: ''
					}]);
				}
			}
		},
		
		vesselScheduleOpeTypeCombo : {},
		
		vesselScheduleCommodityCodeCombo : {
			fields: ['scdNm','scd'],
			storeId: 'vesselScheduleCommodityCodeComboStore'
		},
		
		vesselScheduleWorkableHatchCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'vesselScheduleWorkableHatchComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_HTC,
					scdUse: 'Y'
				}
			}
		},
		
		vesselScheduleTopCleanCombo : {},
		
		vesselScheduleCargoTypeLiquidCombo : {},
		
		vesselScheduleBlSnNoCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'vesselScheduleBlSnNoComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_BL_NO_SN_NO
				}
			},
			autoLoad: true
		},
		
		vesselSchedulePartnerCodeCombo : {
			fields: ['engPtyNm','ptyCd'],
			storeId: 'vesselSchedulePartnerCodeComboStore'
		},
		
		vesselSchedulePkgTpCombo : {
			fields: ['scdNm','scd'],
			storeId: 'vesselSchedulePkgTpComboStore'
		},
		
		vesselScheduleImdgCombo : {
			fields: ['scdNm','scd'],
			storeId: 'vesselScheduleImdgComboStore'
		},
		
		vesselSchedulePortCombo : {
			fields: ['scdNm','scd'],
			storeId: 'vesselSchedulePortComboStore'
		},
		
		vesselSchedulePurposeOfCallCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'vesselSchedulePurposeOfCallComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_VCS1,
					mcd: CodeConstants.MCD_VC_CGFZ,
					scdUse: 'Y'
				}
			},
		},
		
		vesselScheduleCargoToDischargeCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'vesselScheduleCargoToDischargeComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_VCS1,
					mcd: CodeConstants.MCD_VC_CGFZ,
					scdUse: 'Y'
				}
			},
		},
		
		generatePDF: {
			model: 'MOST.model.planning.VesselSchedule',
			storeId: 'generatePDFStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselschedule/previewpdf'
			}
		},
		
		exportReport: {
			model: 'MOST.model.planning.VesselSchedule',
			storeId: 'exportReportStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselschedule/export'
			}
		},
		
		exportSlip: {
			model: 'MOST.model.planning.VesselSchedule',
			storeId: 'exportSlipStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselschedule/exportslip'
			}
		},
		
		reportTypeCombo : {
			fields: ['scdNm','scd'],
			storeId: 'reportTypeComboStore',
			data :  [
					{"scd":"vslsch", "scdNm":"Vessel Schedule"},
					{"scd":"shipsch", "scdNm":"Ship Schedule"}
            ]
		},
		
		reportLocationCombo:{
			fields: ['scdNm','scd'],
			storeId: 'reportLocationComboStore',
			data :  [
					{"scd":"w", "scdNm":"WHARVES"},
					{"scd":"j", "scdNm":"JETTIES"}
            ]
		},
		
		berthOverlapValidation: {
			model: 'MOST.model.planning.VesselSchedule',
			storeId: 'berthOverlapValidation',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselscheduleinternal/berthValidation'
			}
		},
		
		delvModeCombo: {},
		
		// Vessel Schedule Detail Tab Combo End
		// ======================================================
		berthMaintenanceList: {
			model: 'MOST.model.planning.VesselSchedule',
			storeId: 'berthMaintenanceListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselscheduleinternal/berthmaintenancelist'
			}
		},
	}
});