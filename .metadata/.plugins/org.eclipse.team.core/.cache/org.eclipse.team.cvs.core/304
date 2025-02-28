Ext.define('MOST.view.configuration.RosterConfigurationModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.rosterconfiguration',

	requires: [
		'Ext.data.proxy.Rest'
	],
	
	data: {
		publicEmpid: '',
		publicEmpNm: '',
		theStaff: null,
		empId: ''
	},

	stores: {
		// InternalStaffManagement Store START =================================================================================
		internalStaffMngListOnly: {
			model: 'MOST.model.configuration.RosterConfiguration',
			storeId: 'internalStaffMngListOnlyId',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rosterconfigurationshift/internalStaffMngListOnly',
				extraParams:{
					searchType: 'staff',
		     		useYn: 'Y'
				}
			}
		},
		
		internalStaffMngListDuplicateCheck: {
			model: 'MOST.model.configuration.RosterConfiguration',
			storeId: 'internalStaffMngListDuplicateCheckId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rosterconfigurationshift/internalStaffMngList/duplicatecheck',
				extraParams: {
					viewType: 'empId'
				}
			}
		},
		
		internalStaffMngUserListCombo: {
			model: 'MOST.model.configuration.RosterConfiguration',
			storeId: 'internalStaffMngUserListComboId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rosterconfigurationshift/internalstaffmnguserlist',
				extraParams: {
					searchType: 'user'
				}
			}
		},
		
		internalStaffMngSecondaryRoleListCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'internalStaffMngSecondaryRoleListComboId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_COM,
					mcd: CodeConstants.MCD_CM_ROLECD,
					//scdLgv: CodeConstants.MT_ROLEDIVCD_I
				}
			}
		}, 
		
		// Main Data
		staffInfoListStore: {
			model: 'MOST.model.configuration.RosterConfiguration',
			storeId: 'staffInfoListStoreId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rosterconfigurationshift/internalStaffMngList',
				extraParams: {
					viewType: 'staffcombo',
		     		searchType: 'staff',
		     		useYn: 'Y'
				}
			}
		},
		
		// Combo Setting
		roleCodeListCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'roleCodeListComboId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_COM,
					mcd: CodeConstants.MCD_CM_ROLECD,
					//scdLgv: CodeConstants.MT_ROLEDIVCD_I
				}
			}
		},

		primaryRoleCodeCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'primaryRoleCodeCombo',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_COM,
					mcd: CodeConstants.MCD_CM_ROLECD,
					//scdLgv: CodeConstants.MT_ROLEDIVCD_I
				}
			}
		},
		
		workingLocCodeListCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'workingLocCodeListComboId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_COM,
					mcd: CodeConstants.MCD_CM_WORKLOCCD
				}
			}
		},
		
		staffGradeCodeListCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'staffGradeCodeListComboId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_COM,
					mcd: CodeConstants.MCD_CM_GRADE
				}
			}
		},
		
		costCenterListCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'costCenterListComboId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_COSTCNT_CD
				}
			}
		},
		
		userInternalYnCombo: {},
		
		ActiveStatusYnCombo: {},
		
		contractDivisionSearchListCombo: {},
		
		staffInfoListSearchStore: {},
		// InternalStaffManagement Store END ================================================================================
		
		// Unavailable Log For Staff Store START ============================================================================
		unavailableLogforStaffListStore: {
			model: 'MOST.model.configuration.RosterConfiguration',
			storeId: 'unavailableLogforStaffListStoreId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rosterconfigurationshift/unavailablelogforstaffListOnly'
			}
		},
		
		unavailableLogforStaffListReasonCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'unavailableLogforStaffListReasonComboId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_STATRSN
				}
			},
			listeners: 
			{
				load: function(store, records) {
					store.insert(0, [{
						scdNm: 'Select Reason',
						scd: ''
					}]);
				}
			}
		},
	
		// Unavailable Log For Staff Store END ================================================================================
		
		// Group Management For Roster Store START ============================================================================
		internalStaffListOnly: {
			model: 'MOST.model.configuration.RosterConfiguration',
			storeId: 'InternalStaffListOnlyId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rosterconfigurationshift/groupmanagementforrosterinternalStaffListOnly',
				extraParams:{
					searchType: 'group',
					useYn: 'Y'
				}
			}
		},
		
		shiftGroupCombo: {
			fields: ['shftGroupNm','shftGroupCd'],
			storeId: 'shiftGroupComboId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rosterconfigurationshift/selectGroupList'
			},
			listeners: 
			{
				load: function(store, records) {
					store.insert(0, [{
						shftGroupNm: 'Select Group',
						shftGroupCd: ''
					}]);
				}
			}
		},
		isGroupUsedOrNot: {
			fields: ['groupCd'],
			storeId: 'isGroupUsedOrNotId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rosterconfigurationshift/checkGroupIsUsedOrNot'
			},
		}
		,
		getAllAssignedStaffByGroupCdStore: {
			fields: ['groupCd', 'empId'],
			storeId: 'getAllAssignedStaffByGroupCd',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rosterconfigurationshift/getAllAssignedStaffByGroupCd'
			},
		}
		,
		shiftGroupListOnlyStore: {
			model: 'MOST.model.configuration.RosterConfiguration',
			storeId: 'shiftGroupListOnlyStoreId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rosterconfigurationshift/shiftGroupListOnly'
			}
		},
		
		internalStaffCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'internalStaffComboId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					lcd: CodeConstants.LCD_COM,
					mcd: CodeConstants.MCD_CM_ROLECD,
					//scdLgv: CodeConstants.MT_ROLEDIVCD_I,
					scdUse: 'Y'
				}
			}
		},
		
		shiftTypeInfoCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'shiftTypeInfoComboId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SHFT_TYPE,
					shftMethCd: ComboboxServiceConstants.COMBO_GROUP,
				}
			}
		},
	
		// Group Management For Roster Store END ============================================================================
		
		
		// Shift Definition Store START =====================================================================================
		shiftTypeCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'shiftTypeComboId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SHFT_TYPE,
//					shftMethCd: ComboboxServiceConstants.COMBO_GROUP,
//					lcd: CodeConstants.LCD_MOST,
//					mcd: CodeConstants.MCD_MT_SHFTTP
				}
			},
			listeners: 
			{
				load: function(store, records) {
					store.insert(0, [{
						shftTpCdNm: 'Select',
						shftTpCd: ''
					}]);
				}
			}
		},
		
		shiftDefListOnlyStore: {
			model: 'MOST.model.configuration.RosterConfiguration',
			storeId: 'shiftDefListOnlyStoreId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rosterconfigurationshift/shiftDefListOnly'
			}
		},
		
		shiftGroupDefOnlyStore: {
			model: 'MOST.model.configuration.RosterConfiguration',
			storeId: 'shiftGroupDefOnlyStoreId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rosterconfigurationshift/shiftGroupDefListOnly'
			}
		},
		
		shiftMethodDeploymentCombo: {},
		
		userYnCombo: {},
		
		unitDropDownListCombo:{}
		
		// Shift Definition Store END ===================================================================================
	}
});