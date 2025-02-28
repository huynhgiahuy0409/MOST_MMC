Ext.define('MOST.view.billing.PartnerTariffRateModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.partnertariffrates',

	requires: [
	],
	data: {
		selectedRecord: null
	},	
	stores:{
		payerCdTypePopupModelStore: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'payerCdTypePopupModelStoreId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/payercdtypepopup'
			}
		},
		
		partnertariffrateList: {
			model: 'MOST.model.billing.PartnerTariffRate',
			storeId: 'partnerTariffRateListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/partnertariffrate/list'
			}
		},
		
		partnertariffratedetailList: {
			model: 'MOST.model.billing.PartnerTariffRate',
			storeId: 'partnerTariffRateDetailListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/partnertariffrate/detaillist'
			}
		},
		
		berthComboStore: {
			field: ['berthCd, berthNm'],
			storeId: 'bertCombo',
		},
		
		berthListStore: {
			model: 'MOST.model.billing.PartnerTariffRate',
			storeId: 'bertStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/partnertariffrate/berth'
			}
		},
		
		partnerTariffRateDetailGrid:{
			model: 'MOST.model.billing.PartnerTariffRate',
			storeId: 'partnerTariffRateDetailGrid'
		},
		
		cargoComboStore:{
			field: ['cd','cdNm'],
			storeId: 'cargoCombo'
		}, 
		
		partnerTariffRateCurrentDetail:{
			model: 'MOST.model.billing.PartnerTariffRate'
		},
		
		tariffCodeList: {
			model: 'MOST.model.billing.TariffCode',
			storeId: 'tariffCodeListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/tariffcodes/list'
			}
		},
		
		tariffCodeDetail: {
			model: 'MOST.model.billing.TariffCode',
			storeId: 'tariffCodeDetailStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/tariffcodes/list'
			}
		},
		
		tariffCodeComboType : {
			fields: ['scdNm','scd'],
			storeId: 'SBUComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: 'MT',
					mcd: 'TRFTP'
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'All',
			        	  scd: ''
			          }]);
			     }
			}
		},
		
		ssrTypeCombo : {
			fields: ['scdNm','scd'],
			storeId: 'ssrTypeComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: 'MT',
					mcd: 'SSRTP'
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'All',
			        	  scd: ''
			          }]);
			     }
			}
		},
		
		standardTraderCombo : {
			fields: ['scdNm','scd'],
			storeId: 'standardTraderComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: 'MT',
					mcd: 'PTNRTP'
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'All',
			        	  scd: ''
			          }]);
			     }
			}
		},
		
		purposeOfCallCombo : {
			fields: ['scdNm','scd'],
			storeId: 'purposeOfCallComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: 'VC',
					mcd: 'POC'
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'All',
			        	  scd: ''
			          }]);
			     }
			}
		},
		
		vesselTypeCombo : {
			fields: ['scdNm','scd'],
			storeId: 'vesselTypeComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: 'VC',
					mcd: 'VSLTP'
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'All',
			        	  scd: ''
			          }]);
			     }
			}
		},
		
		categoryCombo:{
			fields: ['scdNm','scd'],
			storeId: 'categoryCombotore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: 'MT',
					mcd: 'CATGTP'
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'All',
			        	  scd: ''
			          }]);
			     }
			}
		},
		
		invoiceUnit1Combo:{
			model:'MOST.model.billing.InvoiceUnit',
			fields:['unitCd'],
			storeId: 'invoiceUnit1ComboStore'
		},
		
		invoiceUnit2Combo:{
			model:'MOST.model.billing.InvoiceUnit',
			fields:['unitCd'],
			storeId: 'invoiceUnit2ComboStore'
		},
		
		invoiceUnit3Combo:{
			model:'MOST.model.billing.InvoiceUnit',
			fields:['unitCd'],
			storeId: 'invoiceUnit3ComboStore'
		},
		
		gstTypeCombo:{
			fields:['gstTpCd', 'gstDesc', 'gstValue'],
			storeId: 'gstTypeComboStore'
		},
		
		freshwaterServiceCombo:{
			fields:['scd', 'scdNm'],
			storeId: 'freshwaterServiceComboStore'
		},
		
		tariffConditionList:{
			//fields:['scd', 'scdNm'],
			storeId: 'tariffConditionListStore'
		},
		
		tradeTypeListCombo:{
			fields:['scd', 'scdNm'],
			storeId: 'tradeTypeListComboStore'
		},
		
		dockageTypeListCombo:{
			fields:['scd', 'scdNm'],
			storeId: 'dockageTypeListComboStore'
		},
		
		equipmentTypeListCombo:{
			fields:['scd', 'scdNm'],
			storeId: 'equipmentTypeListComboStore'
		},
		
		equipmentCapaListCombo:{
			fields:['capaCd', 'capaDescr'],
			storeId: 'equipmentCapaListComboStore'
		},
		
		partnerTariffFileUpload: {
			model: 'MOST.model.fileupload.FileUpload',
			storeId: 'partnerTariffUpload',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/equipment/filelist'
			}
		},
		
		partnerTariffFileDownload : {
			model : 'MOST.model.fileupload.FileUpload',
			storeId: 'partnerTariffDownloadStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/filedownload/download'
			}
		},
	}
});