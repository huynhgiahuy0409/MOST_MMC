Ext.define('MOST.view.operation.UnclosedOperation', {
	extend: 'Ext.Panel',
	alias: 'widget.app-unclosedoperationhht',

	requires: [
		'MOST.view.controller.UnclosedOperationListModel',
		'MOST.view.controller.UnclosedOperationListController',
		'MOST.view.common.DateTimeLocalField',
	],

	controller: 'unclosedoperationlist',
	listeners: {
		initialize: 'onLoadTbl'
	},
	viewModel: {
		type: 'unclosedoperationlist'
	},

	shadow: false,
	layout: 'fit',
	padding: 0,

	items: [{
		xtype: 'formpanel',
		padding: 0,
		layout: 'vbox',
		items: [{
			xtype: 'fieldset',
			layout: 'hbox',
			margin: 0,
			items: [
			{
				xtype: 'button',
				itemId: 'inquiryItemId',
				reference: 'refBtnUnclosedRetrieve',
				width: 140,
				text: { type: 'bundle', key: 'retrive' },
				handler: 'onSearchTbl',
				ui: 'retrieve-button-modern',
			}]
		},{
			xtype: 'container',
			layout: 'hbox',
			scrollable: true,
			flex: 1,
			items: [{
				xtype: 'grid',
				reference: 'refUnclosedOperationGrid',
				bind: {
					store: '{unclosedOperationList}'
				},
//				width: '100%',
				columns: [{
					text: 'No',
            		xtype: 'rownumberer',
            		width : 50,
				},{
					text: 'JPVC',
					dataIndex: 'vslCallId',
					width: 200
				},{
					text: 'Vessel Name',
					dataIndex: 'vslNm',
					width: 200
				},{
					text: 'ATB',
					dataIndex: 'atb',
					width: 200
				},{
					text: 'ATU',
					dataIndex: 'atu',
					width: 200
				},{
					text: 'LD/DS',
					dataIndex: 'cgOpTp',
					width: '20%'
				},{
					text: 'SN/BL',
					dataIndex: 'blSn',
					width: 200
				},{ 
					text: 'GR',
					dataIndex: 'grNo',
					width: 200
				},{ 
					text: 'Cargo Condition',
					dataIndex: 'cgCond',
					width: 200
				},{ 
					text: 'Reason',
					dataIndex: 'rsn',
					width: 200
				},{ 
					text: 'Job Strip',
					dataIndex: 'jobStrip',
					width: 200
				}]
			}]
		}]
	}]
});
