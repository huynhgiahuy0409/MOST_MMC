Ext.define('MOST.view.main.AlertListController', {
	extend: 'MOST.view.foundation.BaseViewController',
	requires: [],
	alias: 'controller.alertlist',

	onLoad: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('alertList');
		var userType = MOST.config.Token.getUserType()
		if(userType === 'I') {
			store.load({
				params: {
					ptnrCd: MOST.config.Token.getPtnrCode(),
					userId: MOST.config.Token.getUserId(),
					userRole: MOST.config.Token.getUserType(),
				},
			});
		} 
	}, 

	dblclick: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('alertList');
		var grid = me.lookupReference('refAlertListGrid');

		var selection = grid.getSelection() ? grid.getSelection()[0] : null;

		var screenConfig = {
			1: { screenNm: 'app-mega', alertTp: 'M' },
			2: { screenNm: 'app-megainternal', alertTp: 'S' },
		};

		if (MOST.config.Token.getUserType() == 'E') {
		} else {
			var selectedConfig = screenConfig[selection.get('od')];
			if (selectedConfig) {
				me.loadMenuView(selectedConfig.screenNm, {
					alertTp: selectedConfig.alertTp,
				});
			}
		}
	},
});
