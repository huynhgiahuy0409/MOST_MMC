Ext.define('MOST.view.popup.GroupListPopupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.grouplistpopup',
    
	onSearch: function() {
		
		var store = this.getStore('groupList');
		
		var grpCdVal = this.lookupReference('txtAuthGrpId').getValue();
		var grpNmVal = this.lookupReference('txtAuthGrpNmId').getValue();
		
		store.load({
			params: {
				authGrp: grpCdVal,
				authGrpName: grpNmVal
			}
		});
	},

	
	onSelectGrp: function() {
		
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		
		var grid = me.lookupReference('groupListPopupRef');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		var returnItem = {
				authGrp : selection.data.authGrp,
				authGrpNm : selection.data.authGrpName,
				item : selection
			}
		
    	window.returnValue = returnItem;
       	window.close();
	},
	
});
