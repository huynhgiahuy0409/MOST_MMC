Ext.define('MOST.view.administrator.CompanyRegisterController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [],

	alias: 'controller.companyregister',

	checkValid: false,

	config: {
		chkPtnrCode: false,
		chkPtnrName: false,
	},

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */

	MAIN_GRID_REF_NAME: 'companyRegsiterGrid', // Main Grid Name
	MAIN_STORE_NAME: 'companyRegister', // Main Store Name
	SHIPPINGLINE_GRID_REF_NAME: 'refPartnerInquiryPopupGrid',
	SHIPPINGLINE_LIST_STORE: 'shpList',

	CHK_COMPANY_REG_NO_STORE: 'checkCompanyRegNo',
	CHK_COMPANY_NAME_STORE: 'checkCompanyName',
	COMPANY_REGIST_CNT_STORE_NAME: 'companyRegistCnt',

	HIDDEN_CHK_PTNR_CODE: '',
	HIDDEN_CHK_ENG_NM: '',
	HIDDEN_PTNR_CODE: '',
	FUNC_TYPE: '',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onLoad: function () {
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create('MOST.model.administrator.SearchCompanyRegisterParm');
		var tmnlCd = MOST.config.Token.getTmnlCd();

		if (MOST.config.Token.getUserType() == CodeConstants.CM_USERTP_E) {
			searchParm.set('companyCode', MOST.config.Token.getPtnrCode());

			refs.txtPtnrCode.setEditable(false);
		}

		me.setSearchParm(searchParm);
		me.getViewModel().setData({ theSearch: searchParm });

		me.updateViewStyle(me.getView());
		searchParm.set('progress', CommonConstants.NO);
	},

	onDetailLoad: function () {
		var me = this;
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var connTypeCombo = me.getStore('connTypeCombo');
		var connSubTypeCombo = me.getStore('connSubTypeCombo');
		var fileUploadInfo = me.getStore('fileUploadInfo');

		if (recvData == undefined) {
			recvData = Ext.create('MOST.model.administrator.CompanyRegister');
			recvData.data.workingStatus = WorkingStatus.INSERT;
		}

		connTypeCombo.load();
		connSubTypeCombo.load();

		var tnmlCd = recvData.get('tnmlCd') ? `_${recvData.get('tnmlCd')}` : '';
		var catgCd = `${recvData.get('companyCode')}_${recvData.get('ptnrType')}${tnmlCd}`;

		fileUploadInfo.load({
			params: {
				catgCd: catgCd,
				pgmId: 'mpau001',
			}
		});

		me.setComboBoxWithLocalCache(CacheServiceConstants.PTNR_PAYMENT_TYPE, 'paymentTypeCombo');
		me.setComboBoxWithLocalCache(CacheServiceConstants.PTNR_COMPANY_STATUS, 'companyStatusCombo');
		me.setComboBoxWithLocalCache(CacheServiceConstants.PTNR_PROFILE_STATUS, 'profileStatusCombo');

		me.setDetailControl(recvData);
	},

	onPtnrSelectionLoad: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('ptnrTypeSelection');
		var ptnrTypes = me.getView().ptnrTypes;
		var ptnrTypeList = ptnrTypes.split(',');

		for (var i = 0; i < ptnrTypeList.length; i++) {
			store.insert(i, [{ scdNm: ptnrTypeList[i], scd: ptnrTypeList[i] }]);
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
	onSearch: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var params = me.getSearchCondition();
		var searchParm = me.getViewModel().get('theSearch');
		var balStart = Number.parseInt(searchParm.get('balRangeTo'));
		var balEnd = Number.parseInt(searchParm.get('contractor'));

		if (balStart > balEnd) {
			MessageUtil.warning('companyRegister', 'Balance Range is not valid');
			return;
		}

		store.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					}
				}
			},
		});
	},

	onDblClick: function (grid, record, tr, rowIndex, e, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var ptnrTps = record.get('ptnrTp').split(',');

		if (ptnrTps.length > 1) {
			var params = {
				ptnrTypes: record.get('ptnrTp')
			};
			me.openCodePopup('popup-ptnrtypeselection', 'refPtnrTypes', params);
		} else {
			record.set('ptnrType', ptnrTps[0]);
			record.dirty = false;
			me.openDetailPopup(record);
		}
	}, 

	onPtnrSelect: function () {
		var me = this;
		var refs = me.getReferences();
		var sel = refs.cmbPtnrTypes.getValue();
		var window = me.getView().up('window');

		window.returnValue = sel;
		window.close();
	},

	onExportExcelPdfWithServer: function (gridNameString, isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();

		searchBizParm.classID = 'com.tsb.most.biz.parm.administrator.SearchCompanyRegisterParm';
		searchBizParm.serviceID = 'MOST.companyRegister.selectCompanyRegisterList';

		me.exportExcelPdfWithServer(gridNameString, searchBizParm, isExcel);
	},

	/**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */

	/**
	 * GENERAL METHOD START
	 * =========================================================================================================================
	 */

	getSearchCondition: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		var dtFromVal = Ext.Date.format(refs.dtFrom.getValue(), MOST.config.Locale.getShortDate());
		var radChkval = refs.rdgChk.getValue().member;
		var isHaveSearchCondition = false;
		var hasPtnrType = !StringUtil.isNullorEmpty(searchParm.get('ptnrType'));
		var hasCompanyCode = !StringUtil.isNullorEmpty(searchParm.get('companyCode'));
		var hasPtnrName = !StringUtil.isNullorEmpty(searchParm.get('engSnm'));
		var hasAccNo = !StringUtil.isNullorEmpty(searchParm.get('accNo'));
		var hasBalSrart = !StringUtil.isNullorEmpty(searchParm.get('balRangeFrom'));
		var hasBalEnd = !StringUtil.isNullorEmpty(searchParm.get('balRangeTo'));

		if (hasPtnrType || hasCompanyCode || hasPtnrName || hasAccNo || hasBalSrart || hasBalEnd) {
			isHaveSearchCondition = true;
		}

		params['ptnrType'] = searchParm.get('ptnrType');
		params['companyCode'] = searchParm.get('companyCode');
		params['engSnm'] = searchParm.get('engSnm');
		params['accNo'] = searchParm.get('accNo');
		params['balRangeFrom'] = searchParm.get('balRangeFrom');
		params['balRangeTo'] = searchParm.get('balRangeTo');
		params['regTimeFrom'] = dtFromVal;
		params['checkMember'] = radChkval;
		params['pageNo'] = isHaveSearchCondition ? 1 : pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();

		return params;
	},

	setDetailControl: function (recvData) {
		var me = this;
		var refs = me.getReferences();
		var companyCode = recvData.get('companyCode');
		var ptnrTypes = recvData.get('ptnrTp');
		var ptnrType = recvData.get('ptnrType');
		var detailView = me.getDetailBizView();

		if (detailView.items.get(0).recvData == null) {
			detailView.items.get(0).recvData = recvData;
		}

		if (recvData.get(WorkingStatus.FIELD_NAME) == WorkingStatus.INSERT) {
			var theModel = Ext.create('MOST.model.administrator.CompanyRegister');

			theModel.set('companyStatus', CommonConstants.YES);
			theModel.set('profileStatus', CommonConstants.YES);

			me.getViewModel().setData({ theDetail: theModel });
		} else {
			var companyRegisterDetail = me.getStore('companyRegisterDetail');

			me.HIDDEN_PTNR_CODE = companyCode;
			me.HIDDEN_PTNR_TYPE = ptnrType;

			companyRegisterDetail.load({
				params: {
					companyCode: companyCode,
					ptnrType: ptnrType,
				},
				callback: function (records, operation, success) {
					if (success) {
						if (records.length > 0) {
							var theMainModel = Ext.create('MOST.model.administrator.CompanyRegister');
							var shpList = me.getStore('shpList');
							var systemList = me.getStore('systemList');
							var cbxgPtnrTypes = refs.cbxgPtnrTypes;
							var hasCompanyStatus = !StringUtil.isNullorEmpty(theMainModel.get('companyStatus'));
							var hasProfileStatus = !StringUtil.isNullorEmpty(theMainModel.get('profileStatus'));
							var accountNoStore = me.getStore('accountNoList');


							theMainModel.phantom = false; // UPDATE
							theMainModel.data = records[0].data;
							theMainModel.data.ptnrTp = ptnrTypes;

							me.getViewModel().setData({ theDetail: theMainModel });

							var theDetail = me.getViewModel().get('theDetail');

							if (companyCode.substring(0, 4) == 'PTNR') {
								refs.txtPtnrCode.setEditable(true);
								theDetail.set('companyCode', '');
							} else {
								refs.txtPtnrCode.setEditable(false);
							}

							cbxgPtnrTypes.setValue({
								rb: [theMainModel.get('ptnrType')],
							});

							if (theMainModel.get('ptnrType') == CodeConstants.CM_PTNRTP_SHA) {
								me.enableShp(true);
								me.enableCustom(CodeConstants.CM_PTNRTP_SHA, true);
							} else {
								theDetail.set('maAgencyCode', '');
								theDetail.set('maAgencyNm', '');

								refs.txtMarineAgentCode.setEditable(false);
								refs.txtMarineAgentNm.setEditable(false);
							}

							if (theMainModel.get('ptnrType') == CodeConstants.CM_PTNRTP_SHP) {
								refs.rdgShpLineType.show();
							}

							if (theMainModel.get('ptnrType') == CodeConstants.CM_PTNRTP_FWD) {
								me.enableCustom(CodeConstants.CM_PTNRTP_FWD, true);
							}

							if (!hasCompanyStatus) {
								theDetail.set('companyStatus', CommonConstants.YES);
							}

							if (!hasProfileStatus) {
								theDetail.set('profileStatus', CommonConstants.YES);
							}

							if (theDetail.get('bal') <= 0) {
								refs.txtBalance.setFieldStyle('color: red;');
							}

							/*
							systemList.load({
								params: {
									companyCode: companyCode,
									sysUserId: CodeConstants.MCD_CM_SYSTEM,
								},
								callback: function (records, operation, success) {
									if (success) {
										if (records.length > 0) {
											var isTsbSupervisor = MOST.config.Token.getAuthCd() == 'AC000';
											var isSystemAdmin = MOST.config.Token.getAuthCd() == 'AC002';
											var isMarineAdmin = MOST.config.Token.getAuthCd() == 'AC003';
											var isCompanyAdmin = MOST.config.Token.getAuthCd() == 'AC008';

											for (var i = 0; i < records.length; i++) {
												var isUsed = records[i].get('useYn') == CommonConstants.YES;
												var isApproved = records[i].get('sysOwnerAp') == CommonConstants.YES;

												if (records[i].get('sysCd') == ViewUtil.getLabel('vcs').trim()) {
													theDetail.set('vcs', isUsed ? true : false);
													theDetail.set(
														'vcsAp',
														isApproved
															? ViewUtil.getLabel('active').trim()
															: ViewUtil.getLabel('inactive').trim(),
													);
													theDetail.set(
														'vcsBtn',
														isApproved ? ViewUtil.getLabel('inactive').trim() : ViewUtil.getLabel('active').trim(),
													);

													if (
														!isTsbSupervisor && !isSystemAdmin && !isMarineAdmin && !isCompanyAdmin
													) {
														refs.btnCompanyRegisterDetailVcsActive.setHidden(true);
														refs.lblVcsSystem.setHidden(true);
													} else {
														refs.btnCompanyRegisterDetailVcsActive.setHidden(false);
														refs.lblVcsSystem.setHidden(false);
													}
												} else if (
													records[i].get('sysCd') == ViewUtil.getLabel('fzip').trim()
												) {
													theDetail.set('fzip', isUsed ? true : false);
													theDetail.set(
														'fzipAp',
														isApproved
															? ViewUtil.getLabel('active').trim()
															: ViewUtil.getLabel('inactive').trim(),
													);
													theDetail.set(
														'fzipBtn',
														isApproved
															? ViewUtil.getLabel('inactive').trim()
															: ViewUtil.getLabel('active').trim(),
													);

													if (
														!isTsbSupervisor &&
														!isSystemAdmin &&
														!isMarineAdmin &&
														!isCompanyAdmin
													) {
														refs.btnCompanyRegisterDetailFzipActive.setHidden(true);
														refs.lblFzipSystem.setHidden(true);
													} else {
														refs.btnCompanyRegisterDetailFzipActive.setHidden(false);
														refs.lblFzipSystem.setHidden(false);
													}
												} else if (records[i].get('sysCd') == ViewUtil.getLabel('mss').trim()) {
													theDetail.set('mss', isUsed ? true : false);
													theDetail.set(
														'mssAp',
														isApproved
															? ViewUtil.getLabel('active').trim()
															: ViewUtil.getLabel('inactive').trim(),
													);
													theDetail.set(
														'mssBtn',
														isApproved
															? ViewUtil.getLabel('inactive').trim()
															: ViewUtil.getLabel('active').trim(),
													);

													if (
														!isTsbSupervisor &&
														!isSystemAdmin &&
														!isMarineAdmin &&
														!isCompanyAdmin
													) {
														refs.btnCompanyRegisterDetailMssActive.setHidden(true);
														refs.lblMssSystem.setHidden(true);
													} else {
														refs.btnCompanyRegisterDetailMssActive.setHidden(false);
														refs.lblMssSystem.setHidden(false);
													}
												} else if (
													records[i].get('sysCd') == ViewUtil.getLabel('mpts').trim()
												) {
													theDetail.set('mpts', isUsed ? true : false);
													theDetail.set(
														'mptsAp',
														isApproved
															? ViewUtil.getLabel('active').trim()
															: ViewUtil.getLabel('inactive').trim(),
													);
													theDetail.set(
														'mptsBtn',
														isApproved
															? ViewUtil.getLabel('inactive').trim()
															: ViewUtil.getLabel('active').trim(),
													);

													if (
														!isTsbSupervisor &&
														!isSystemAdmin &&
														!isMarineAdmin &&
														!isCompanyAdmin
													) {
														refs.btnCompanyRegisterDetailMptsActive.setHidden(true);
														refs.lblMptsSystem.setHidden(true);
													} else {
														refs.btnCompanyRegisterDetailMptsActive.setHidden(false);
														refs.lblMptsSystem.setHidden(false);
													}
												} else if (
													records[i].get('sysCd') == ViewUtil.getLabel('jcts').trim()
												) {
													theDetail.set('jcts', isUsed ? true : false);
													theDetail.set(
														'jctsAp',
														isApproved
															? ViewUtil.getLabel('active').trim()
															: ViewUtil.getLabel('inactive').trim(),
													);
													theDetail.set(
														'jctsBtn',
														isApproved
															? ViewUtil.getLabel('inactive').trim()
															: ViewUtil.getLabel('active').trim(),
													);

													if (
														!isTsbSupervisor &&
														!isSystemAdmin &&
														!isMarineAdmin &&
														!isCompanyAdmin
													) {
														refs.btnCompanyRegisterDetailJctsActive.setHidden(true);
														refs.lblJctsSystem.setHidden(true);
													} else {
														refs.btnCompanyRegisterDetailJctsActive.setHidden(false);
														refs.lblJctsSystem.setHidden(false);
													}
												}
											}

											theDetail.set('sysUserId', records[0].get('sysUserId'));
										}
									}
								},
							});
							*/

							shpList.load({
								params: {
									companyCode: recvData.get('companyCode'),
								},
							});
							shpList.commitChanges();
							//s-AUT-001 Company Register
							accountNoStore.setData(records[0].get('accNoList'));
							//e-AUT-001 Company Register
							me.checkValid = true;
						}
					}
				},
			});
		}
	},

	enableCustom: function (type, isEnable) {
		var me = this;
		var refs = me.getReferences();
		var customSHA = refs.refCusSha;
		var customDateSHA = refs.refCusDateSha;
		var customFWD = refs.refCusFwd;
		var customDateFWD = refs.refCusDateFwd;

		if (type == CodeConstants.CM_PTNRTP_SHA) {
			if (isEnable) {
				customSHA.show();
				customDateSHA.show();
			} else {
				customSHA.hide();
				customDateSHA.hide();
			}
		}

		if (type == CodeConstants.CM_PTNRTP_FWD) {
			if (isEnable) {
				customFWD.show();
				customDateFWD.show();
			} else {
				customFWD.hide();
				customDateFWD.hide();
			}
		}
	},

	enableShp: function (isEnable) {
		var me = this;
		var refs = me.getReferences();
		var shpListGrid = refs.refShpList;
		var accNoGrid = refs.refAccountNo;
		var fileUploadGrid = refs.refFileUploadGrid;

		refs.txtMarineAgentCode.setEditable(true);
		refs.txtMarineAgentNm.setEditable(true);

		if (isEnable) {
			shpListGrid.show();
		} else {
			shpListGrid.hide();
		}
	},

	checkName: function () {
		var me = this;
		me.checkValid = false;
	},

	checkRegNo: function () {
		var me = this;
		me.checkValid = false;
	},

	checkLicenseSHA: function (btn) {
		var me = this;
		me.checkValid = false;
	},

	checkLicenseFWD: function (btn) {
		var me = this;
		me.checkValid = false;
	},

	afterSetCodePopupData: function (xtype, targetControl, returnValue) {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var record = grid.getSelection() == null ? null : grid.getSelection()[0];

		if (targetControl === 'refPtnrTypes') {
			if (returnValue != null) {
				record.set('ptnrType', returnValue);
				record.dirty = false;
				me.openDetailPopup(record);
			}
		}
	}, 
 
});
