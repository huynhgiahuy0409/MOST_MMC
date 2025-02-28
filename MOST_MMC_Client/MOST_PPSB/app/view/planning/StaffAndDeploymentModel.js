Ext.define('MOST.view.planning.StaffAndEquipmentDeploymentModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.staffanddeployment',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.planning.Mega',
		'MOST.model.planning.StaffAndDeployment',
		'MOST.model.planning.roster.ShiftGroupDefItem'
	],

	stores: {
		vOperationDeployList: {
			model: 'MOST.model.planning.StaffAndDeployment',
			storeId: 'vOperationDeployListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/staffdeployment/VOperationDeployList'
			}
		},
		
		shiftCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId:'shiftComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SHFTTP,
					shftMethCd: ComboboxServiceConstants.COMBO_STANDARD
				}
			},
			listeners: {
				load: function(store, records) {
					store.insert(0, [{
						shftNm:'Select Shift',
						shftId:''
					}]);
				}
			}
		},
		
		purposeCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId:'purposeComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_MGPURP,
					scdUse: 'Y'
				}
			},
			listeners: {
				load: function(store, records) {
					store.insert(0, [{
						scdNm: 'Select Purpose',
						scd: ''
					}]);
				}
			}
		},
		
		roleComboList: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'allRoleListStore',
			autoLoad:false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_ALL_ROLE,
					staffType: ComboboxServiceConstants.COMBO_STAFF_TYPE
				}
			},
			listeners: {
				load: function(store, records) {
					store.insert(0, [{
						roleCdNm:'Select All',
						roleCd:'',
						groupCd:''
					}]);
				}
			}
		},
		//added by Tim 13/03/2024
		comboGroupRosterList: {
			fields: ['groupCd','groupNm'],
			storeId: 'comboGroupRosterListStore'
		}
		,
		allRoleList: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'allRoleListStore',
			autoLoad:false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					lcd: CodeConstants.LCD_COM,
					mcd: CodeConstants.MCD_CM_ROLECD
				}
			},
			listeners: {
				load: function(store, records) {
					store.insert(0, [{
						roleCdNm:'Select All',
						roleCd:'',
						groupCd:''
					}]);
				}
			}
		},
		
		deployedStaffList:{
			model: 'MOST.model.planning.StaffAndDeployment',
			storeId: 'deployedStaffListStore',
			autoLoad:false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/staffdeployment/deployedStaffList'
			}
		},
		
		staffTypeCombo: {},
		
		operContractFLCombo: {},
		
		operContractCOCombo: {},
		
		roleOtherList: {
			model: 'MOST.model.planning.StaffAndDeployment',
			storeId: 'roleOtherListStore',
			autoLoad:false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/staffdeployment/roleOtherList'
			},
			listeners: {
				load: function(store, records) {
					store.insert(0, [{
						roleCdNm:'Select All',
						roleCd:'',
						groupCd:''
					}]);
				}
			}
		},
		
		staffAndEquipmentDetail:{
			model: 'MOST.model.planning.StaffAndDeployment',
			storeId: 'staffAndEquipmentDetailStore',
			autoLoad:false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/staffdeployment/staffandequipmentdetail'
			}
		},
		
		megaSumList: {
			model: 'MOST.model.planning.StaffAndDeployment',
			storeId: 'staffAndEquipmentDetailStore',
			autoLoad:false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/staffdeployment/summegalist'
			}
		},
		
		megaSumOperatorList: {
			model: 'MOST.model.planning.StaffAndDeployment',
			storeId: 'megaSumOperatorListStore',
			autoLoad:false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/staffdeployment/megaSumOperator'
			}
		},
		
		megaSumPortCraneList: {
			model: 'MOST.model.planning.StaffAndDeployment',
			storeId: 'megaSumPortCraneListStore',
			autoLoad:false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/staffdeployment/megaSumPortCrane'
			}
		},
		
		megaSumShipCraneList: {
			model: 'MOST.model.planning.StaffAndDeployment',
			storeId: 'megaSumPortCraneListStore',
			autoLoad:false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/staffdeployment/megaSumShipCrane'
			}
		},
		
		megaSumShoreCraneList: {
			model: 'MOST.model.planning.StaffAndDeployment',
			storeId: 'megaSumShoreCraneListStore',
			autoLoad:false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/staffdeployment/megaSumShoreCraneList'
			}
		},
		
		megaSumPortAndShipCraneList: {
			model: 'MOST.model.planning.StaffAndDeployment',
			storeId: 'megaSumPortAndShipCraneListStore',
			autoLoad:false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/staffdeployment/megaSumPortAndShipCraneList'
			}
		},
		
		megaSumForkliftList: {
			model: 'MOST.model.planning.StaffAndDeployment',
			storeId: 'megaSumForkliftListStore',
			autoLoad:false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/staffdeployment/megaSumForkliftList',
				extraParams:{
					eqDivCd: CodeConstants.MT_EQCD_FL
				}
			}
		},
		
		portCraneDeployedList: {
			model: 'MOST.model.planning.StaffAndDeployment',
			storeId: 'portCraneDeployedListStore',
			autoLoad:false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/staffdeployment/portCraneDeployList',
				extraParams:{
					eqTpCd: ComboboxServiceConstants.COMBO_PORT_CRANE_CD
				}
			}
		},
		
		forkliftDeployedList: {
			model: 'MOST.model.planning.StaffAndDeployment',
			storeId: 'forkliftDeployedListStore',
			autoLoad:false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/staffdeployment/forkliftDeployedList',
				extraParams:{
					eqTpCd: CodeConstants.MT_EQCD_FL
				}
			}
		},
		
		stevedoreCompanyList: {
			model: 'MOST.model.planning.StaffAndDeployment',
			storeId: 'stevedoreCompanyListStore',
			autoLoad:false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/staffdeployment/stevedoreCompanyList'
			}
		},
		
		megaRemarkList: {
			model: 'MOST.model.planning.StaffAndDeployment',
			storeId: 'megaRemarkListStore',
			autoLoad:false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/staffdeployment/megaRemarkList'
			}
		},
		
		vesselOperationDeployedStaffList: {
			model: 'MOST.model.planning.StaffAndDeployment',
			storeId: 'vesselOperationDeployedStaffListStore',
		},
		
		standardStaffList: {
			model: 'MOST.model.planning.StaffAndDeployment',
			storeId: 'standardStaffListStore',
			autoLoad:false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/staffdeployment/standardStaffList',
				extraParams:{
					rstrType: ComboboxServiceConstants.COMBO_RSTRTYPE_STAFF
				}
			}
		},
		
		standardGroupList: {
			model: 'MOST.model.planning.StaffAndDeployment',
			storeId: 'standardGroupListStore',
			autoLoad:false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/staffdeployment/standardStaffList',
				extraParams:{
					rstrType: ComboboxServiceConstants.COMBO_RSTRTYPE_GROUP
				}
			}
		},
		
		standardStaffGroupList: {
			model: 'MOST.model.planning.StaffAndDeployment',
			storeId: 'standardStaffGroupListStore',
			autoLoad:false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/staffdeployment/standardStaffGroupList',
				extraParams:{
					rstrType: ComboboxServiceConstants.COMBO_NEW_TYPE
				}
			}
		},
		
		extraStaffList: {
			model: 'MOST.model.planning.StaffAndDeployment',
			storeId: 'extraStaffListStore',
			autoLoad:false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/staffdeployment/extraList',
				extraParams: {
					rstrType: ComboboxServiceConstants.COMBO_RSTRTYPE_STAFF
				}
			}
		},
		
		extraGroupList: {
			model: 'MOST.model.planning.StaffAndDeployment',
			storeId: 'extraGroupListStore',
			autoLoad:true,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/staffdeployment/extraList',
				extraParams: {
					rstrType: ComboboxServiceConstants.COMBO_RSTRTYPE_GROUP
				}
			}
		},
		
		extraStaffGroupList: {
			model: 'MOST.model.planning.StaffAndDeployment',
			storeId: 'extraStaffGroupListStore',
			autoLoad:false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/staffdeployment/extraStaffGroupList',
				extraParams:{
					staffType: ComboboxServiceConstants.COMBO_EXTERNAL_TYPE,
					rstrType: ComboboxServiceConstants.COMBO_RSTRTYPE_GROUP
				}
			}
		},
		
		otherStaffList: {
			model: 'MOST.model.planning.StaffAndDeployment',
			storeId: 'otherStaffListStore',
			autoLoad:false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/staffdeployment/otherStaffList',
				extraParams:{
					rstrType: ComboboxServiceConstants.COMBO_RSTRTYPE_STAFF
				}
			}
		},
		
		shiftList: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'shiftListStore',
			autoLoad:false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_STANDARD
				}
			}
		},
		
		filteredStaffList: {
			model: 'MOST.model.planning.StaffAndDeployment',
			storeId: 'filteredStaffListStore',
		},
		
		equipmentTypeCodeList: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'equipmentTypeCodeListStore',
			autoLoad:false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_EQFCTPCD,
					scdUse: 'Y'
				}
			},
			listeners: {
				load: function(store, records) {
					store.insert(0, [{
						scdNm:'Select All',
						scd:''
					}]);
				}
			}
		},
		
		equipmentList:{
			model: 'MOST.model.planning.StaffAndDeployment',
			storeId: 'equipmentListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/staffdeployment/equipmentList'
			}
		},
		
		filteredEquipList:{
			model: 'MOST.model.planning.StaffAndDeployment',
			storeId: 'equipmentListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/staffdeployment/equipmentList'
			}
		},
		
		operatorCOList:{
			storeId:'operatorCOList',
			model:'MOST.model.planning.StaffAndDeployment'
		},
		
		operatorFDList:{
			storeId:'operatorFDList',
			model:'MOST.model.planning.StaffAndDeployment'
		},
		
		othersEquipmentList:{
			storeId:'shipCraneEquipmentListStore',
			model:'MOST.model.planning.StaffAndDeployment',
//			data :  [{'eqGrp':'1','eqTpCd':'LL,LL','eqFacNo':'LL0001,LL0002','eqFacNm':'LL1/LL2'},
//				{'eqGrp':'2','eqTpCd':'LL,LL','eqFacNo':'LL0001,LL0003','eqFacNm':'LL1/LL3'},
//				{'eqGrp':'3','eqTpCd':'LL,LL','eqFacNo':'LL0002,LL0003','eqFacNm':'LL2/LL3'},
//				{'eqGrp':'4','eqTpCd':'LL,BG','eqFacNo':'LL0001,BG0001','eqFacNm':'LL1/BG1'},
//				{'eqGrp':'5','eqTpCd':'LL,BG','eqFacNo':'LL0001,BG0002','eqFacNm':'LL1/BG2'},
//				{'eqGrp':'6','eqTpCd':'LL,BG','eqFacNo':'LL0002,BG0001','eqFacNm':'LL2/BG1'},
//				{'eqGrp':'7','eqTpCd':'LL,BG','eqFacNo':'LL0002,BG0002','eqFacNm':'LL2/BG2'},
//				{'eqGrp':'8','eqTpCd':'LL,BG','eqFacNo':'LL0003,BG0001','eqFacNm':'LL3/BG1'},
//				{'eqGrp':'9','eqTpCd':'LL,BG','eqFacNo':'LL0003,BG0002','eqFacNm':'LL3/BG2'},
//				{'eqGrp':'10','eqTpCd':'SC1','eqFacNo':'SHORECR1','eqFacNm':'SHORE CRANE 1'},
//				{'eqGrp':'11','eqTpCd':'SC2','eqFacNo':'SHORECR2','eqFacNm':'SHORE CRANE 2'},
//				{'eqGrp':'12','eqTpCd':'SC3','eqFacNo':'SHORECR3','eqFacNm':'SHORE CRANE 3'},
//				{'eqGrp':'13','eqTpCd':'PMC','eqFacNo':'PMC','eqFacNm':'PMC'}
//            ]
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/staffdeployment/shipCraneList'
			}
		},
	
		shipCraneEquipmentList:{
			storeId:'othersEquipmentListStore',
			model:'MOST.model.planning.StaffAndDeployment',
//			data:[{'eqGrp':'14','eqTpCd':'SR1','eqFacNo':'SHIPCR1','eqFacNm':'SHIP CRANE 1'},
//				{'eqGrp':'15','eqTpCd':'SR2','eqFacNo':'SHIPCR2','eqFacNm':'SHIP CRANE 2'},
//				{'eqGrp':'16','eqTpCd':'SR3','eqFacNo':'SHIPCR3','eqFacNm':'SHIP CRANE 3'},
//				{'eqGrp':'17','eqTpCd':'SR4','eqFacNo':'SHIPCR4','eqFacNm':'SHIP CRANE 4'}]
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/staffdeployment/shipCraneList'
			}
		},
		
		forkliftList:{
			model: 'MOST.model.planning.StaffAndDeployment',
			storeId: 'generatePDFStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/staffdeployment/equipCapaList',
				extraParams:{
					eqTpCd: CodeConstants.MT_EQCD_FL
				}
			}
		},
		
		forkliftDriverList:{
			storeId:'forkliftDriverListStore',
			model:'MOST.model.planning.StaffAndDeployment'
		},
		
		changeShift:{},
		
		generatePDF: {
			model: 'MOST.model.planning.StaffAndDeployment',
			storeId: 'generatePDFStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/mega/previewstaff'
			}
		},
		
		empPCCombo: {
			fields: ['empNm','empId'],
			storeId: 'empPCComboStore'
		},
		
		empFLCombo: {
			fields: ['empNm','empId'],
			storeId: 'empFLComboStore'
		},
		
		existedRoleByEmpIdValidationCode: {
			model: 'MOST.model.planning.StaffAndDeployment',
			storeId: 'existedRoleByEmpIdValidationCode',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/staffdeployment/validationCode'
			}
		},
		
		searchVesselCallDetail: {
			model: 'MOST.model.common.SearchVesselCall',
			storeId: 'searchVesselCallDetailStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/searchVesselCall/searchVslCallId'
			}
		},
		
		staffDeploymentJpvcValidationCodeStore: {
			model: 'MOST.model.planning.StaffAndDeployment',
			storeId: 'staffDeploymentJpvcValidationCodeStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/staffdeployment/validationCode'
			}
		},

		staffDeploymentStaffValidation: {
			model: 'MOST.model.planning.StaffAndDeployment',
			storeId: 'staffDeploymentStaffValidationStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/staffdeployment/validationStaffAdd'
			}
		}
	}
});