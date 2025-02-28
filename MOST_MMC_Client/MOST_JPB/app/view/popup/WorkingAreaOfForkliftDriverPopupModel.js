Ext.define('MOST.view.popup.WorkingAreaOfForkliftDriverPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.workingareaofforkliftdriverpopup',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.planning.StaffAndDeployment'
	],
	
	stores: {
		staffAndEquipmentDetail:{
			model: 'MOST.model.planning.StaffAndDeployment',
			storeId: 'staffAndEquipmentDetailStore',
			autoLoad:false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/mega/staffandequipmentdetail'
			}
		},
		deployWorkAreaList:{
			model: 'MOST.model.planning.StaffAndDeployment',
			storeId: 'deployWorkAreaListStore',
			autoLoad:false,
		},
	}
});