Ext.define('MOST.view.configuration.EquipmentConfigurationModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.equipment',

	requires: [
	],

	formulas:{
		instlYmdString:{
			bind: {
				bindTo:'{theDetail.instlYmd}'
			},
			get: function(value) {
				return value;
			},
			set: function(value) {
				var me = this;
				me.setBindValue('{theDetail.instlYmd}', Ext.Date.format(value, MOST.config.Locale.getShortDate()));
			}
		},
		ownDivCdInput:{
			bind:{
				bindTo:'{theDetail.ownDivCd}'
			},
			get:function(value){
				var tempValue = {};
				var inExfieldName = 'inExternal_radio';
				tempValue[inExfieldName] = value;
				return tempValue;
			},
			set:function(value){
				var me = this;
				
				var detailItem = me.getView().getViewModel().get('theDetail');
				detailItem.set("ownDivCd", value['inExternal_radio']);
			}
		},
		
		purpCdInput:{
			bind:{
				bindTo:'{theDetail.purpCd}'
			},
			get:function(value){
				var tempValue = {};
				var purpfieldName = 'purpCd_radio';
				tempValue[purpfieldName] = value;
				
				return tempValue;
			},
			set:function(value){
				var me = this;
				
				var detailItem = me.getView().getViewModel().get('theDetail');
				detailItem.set("purpCd", value['purpCd_radio']);
			}
		}
	},

	stores: {
		equipmentGridList: {
			model: 'MOST.model.configuration.EquipmentConfiguration',
			storeId: 'equipmentCodeList',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/equipment/selectEquipmentList',
				extraParams: {
					searchType: 'equipmentList'
				}
			}
		},
		equipmentDetailUpload: {
			model: 'MOST.model.fileupload.FileUpload',
			storeId: 'equipmentDetailUpload',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/equipment/filelist'
			}
		},
		//Duplication Check
		checkDupliEqFacCd: {
			model: 'MOST.model.configuration.EquipmentConfiguration',
			storeId: 'equipmentCodeList',
			proxy: {
				type: 'rest',
				showProgressBar:false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/equipment/checkDupliEqFacCd',
				extraParams: {
					searchType: 'equipmentList'
				}
			}
		},
		
		equipmentDetailDownload : {
			model : 'MOST.model.fileupload.FileUpload',
			storeId: 'equipmentDetailDownloadStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/filedownload/download'
			}
		},
		
		// ======================================================
		// Combo Start
		equipmentTypeCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'equipmentTypeComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_EQFCTPCD
				}
			}
		},
		
		equipmentTypeDetailCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'equipmentTypeComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_EQFCTPCD
				}
			}
		},
		
		equipmentStatDetailCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'equipmentTypeComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_EQFCSTAT
				}
			}
		},
		
		equipmentStopRsnCdDetailCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'equipmentTypeComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_STOPRSNCD
				}
			}
		},
		
		equipmentLocationCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'equipmentTypeComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_BERTH_LOC
				}
			}
		},
		
		equipmentLocDetailCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'equipmentTypeComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_BERTH_LOC
				}
			}
		},
		
		equipmentManufactCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'equipmentTypeComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_MNFR
				}
			}
		},
		
		equipmentMkrDetailCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'equipmentTypeComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_MNFR
				}
			}
		},
		
		equipmentCapaCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'equipmentTypeComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_EQU_CAPA_CD
				}
			}
		},
		
		equipmentCapaDetailCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'equipmentTypeComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_EQU_CAPA_CD
				}
			}
		},
		
		equipmentUsedYn: {}
		// Combo End
		// ======================================================
	}
});