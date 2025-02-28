Ext.define('MOST.view.main.AlertListController', {
	extend: 'MOST.view.foundation.BaseViewController',
	requires: [],
	alias: 'controller.alertlist',

	onLoad: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('alertList');
		var userType = MOST.config.Token.getUserType();
		
		store.load({
			params: {
				ptnrCd: MOST.config.Token.getPtnrCode(),
				userId: MOST.config.Token.getUserId(),
				userType: userType,
			},
			callback: function (records, operation, success) {
				if (success) {
					if (userType === 'E') {
						var isExpired = false;
						if (records.length > 0) {
							records.forEach(record => {
								if (record.get('property') === 'isExpired') {
									record.set('description', 'Your account is nearly expired. Please contact the administrator.');
									isExpired = true;
								}
							});
						} else {
							var noAlertMsg = Ext.create('MOST.model.main.Alert');
							noAlertMsg.set('description', "There are no new alerts at this time.");
							records.push(noAlertMsg);
						}
						store.setData(records);
						store.commitChanges();

						refs.refAlertingLabel.setText(isExpired ? "Account is Expiring" : "Alert List");
					}
				}
			}
		});
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
				me.loadMenuView(
					selectedConfig.screenNm, 
					{
						alertTp: selectedConfig.alertTp,
					}
				);
			}
		}
	},
});
