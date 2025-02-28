Ext.define('MOST.view.administrator.CompanyRegisterModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.companyregister',

	requires: [],

	data: {
		ptnrlist: null,
	},

	formulas: {
		ptnrLevelInput: {
			bind: {
				bindTo: '{theDetail.ptnrLevel}',
			},
			get: function (value) {
				var tempValue = {};
				var ptnrLevel = 'ptnrLevel';

				tempValue[ptnrLevel] = value;

				return tempValue;
			},
			set: function (value) {
				var me = this;
				var detailItem = me.getView().getViewModel().get('theDetail');

				detailItem.set('ptnrLevel', value['ptnrLevel']);
			},
		},

		gstStatCdInput: {
			bind: {
				bindTo: '{theDetail.gstStatCd}',
			},
			get: function (value) {
				var tempValue = {};
				var gstStatCd = 'gstStatCd';

				tempValue[gstStatCd] = value;

				return tempValue;
			},
			set: function (value) {
				var me = this;
				var detailItem = me.getView().getViewModel().get('theDetail');

				detailItem.set('gstStatCd', value['gstStatCd']);
			},
		},
	},

	stores: {
		ptnrTypeList: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'ptnrTypeList',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_COM,
					mcd: CodeConstants.MCD_CM_PTNRTP,
				},
			},
			listeners: {
				load: function (store, records) {
					store.insert(0, [
						{
							scdNm: 'All',
							scd: '',
						},
					]);
				},
			},
		},

		connTypeCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'connTypeCombo',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_COM,
					mcd: CodeConstants.MCD_CM_CONNTP,
				},
			},
			listeners: {
				load: function (store, records) {
					store.insert(0, [
						{
							scdNm: 'Select',
							scd: '',
						},
					]);
				},
			},
		},

		connSubTypeCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'connSubTypeCombo',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_COM,
					mcd: CodeConstants.MCD_CM_CMNCTCPN,
				},
			},
			listeners: {
				load: function (store, records) {
					store.insert(0, [
						{
							scdNm: 'Select',
							scd: '',
						},
					]);
				},
			},
		},

		companyRegister: {
			model: 'MOST.model.administrator.CompanyRegister',
			storeId: 'ptnrList',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/companyregister/companyRegisterList',
			},
		}, 

		companyRegisterDetail: {
			model: 'MOST.model.administrator.CompanyRegister',
			storeId: 'ptnrDetail',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/companyregister/companyRegisterdetail',
			},
		},

		shpList: {
			model: 'MOST.model.administrator.CompanyRegister',
			storeId: 'shpListId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/companyregister/shplist',
			},
		},

		ptnrValidation: {
			model: 'MOST.model.administrator.CompanyRegister',
			storeId: 'ptnrValidation',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/companyregister/ptnrValidation',
			},
		},

		companyRegistCnt: {
			model: 'MOST.model.administrator.CompanyRegister',
			storeId: 'companyRegistCnt',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/companyregister/companyregistcnt',
			},
		},

		ptnrTypeSelection: {
			model: 'MOST.model.combobox.ComboBoxService',
		},

		paymentTypeCombo: {},
		companyStatusCombo: {},
		profileStatusCombo: {},
		//s-MGR-008 PLUS – Company Register List and Detail screen
		accountNoList: {},
		fileUploadInfo: {
			model: 'MOST.model.fileupload.FileUpload',
			storeId: 'conpanyRegisterDetailUpload',
			proxy: {
				type: 'rest',
				showProgressBar: 'true',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/companyregister/filelist'
			}
		},
		//e-MGR-008 PLUS – Company Register List and Detail screen
	},
});
