Ext.define('MOST.view.document.DocPackageDetailModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.docpackagedetail',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.document.ShippingNote',
		'MOST.model.document.BL',
		'MOST.model.common.SearchVesselCall'
	],
	
	data: {
		
	},

	stores: {
		dtlShippingNotePkgDetail: {
			model: 'MOST.model.document.ShippingNote',
			storeId: 'dtlShippingNotePkgDetailStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/shippingnote/shippingnotepkgdetail'
			}
		},

		dtlBlPkgDetail: {
			model: 'MOST.model.document.BL',
			storeId: 'dtlBlPkgDetailStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/blinfo/blpkgdetail'
			}
		},
	}
});