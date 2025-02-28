Ext.define('MOST.view.popup.WorkingAreaOfForkliftDriverPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-workingareaofforkliftdriverpopup',
	requires: [
		'MOST.view.popup.WorkingAreaOfForkliftDriverPopupController',
		'MOST.view.popup.WorkingAreaOfForkliftDriverPopupModel',
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	title: "Working Area Of Forklift Driver",
	width: 1000,
	height: 600,

	controller: 'workingareaofforkliftdriverpopup',

	viewModel: {
		type: 'workingareaofforkliftdriverpopup'
	},

	listeners: {
		afterrender: 'onLoad'
	},

	lblCk: { type: 'bundle', key: 'fnChk' },
	lblCode: { type: 'bundle', key: 'scd' },
	lblDescription: { type: 'bundle', key: 'capaDesc' },
	lblCategory: { type: 'bundle', key: 'titleCategory' },
	lblWorkingArea: { type: 'bundle', key: 'titlefieldnameWorkingarea' },
	lblWharf: { type: 'bundle', key: 'titlecomboWharf' },
	lblEquNo: { type: 'bundle', key: 'deployedequipment_equNo' },
	lblDriver: { type: 'bundle', key: 'flStatus' },
	lblNo: { type: 'bundle', key: 'no' },
	lblName: { type: 'bundle', key: 'empNm' },
	lblFind: { type: 'bundle', key: 'find' },

	btnUpdate: { type: 'bundle', key: 'update' },
	btnSet: { type: 'bundle', key: 'set' },
	btnClear: { type: 'bundle', key: 'clear' },
	btnSave: {type: 'bundle', key: 'save'},
	layout: { type: 'vbox', align: 'stretch' },

	initComponent: function () {

		var me = this;

		Ext.apply(me, {
			xtype: 'form',
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [{
				xtype: 'fieldset',
				title: 'Deployed Forklift',
				layout: 'hbox',
				margin: '10 10 10 10',
				height: '100%',
				items: [{
						xtype: 'grid',
						reference: 'refGridWorkingAreaFLDriver',
						flex: 1,
						margin: '0 15 5 5',
						height: '100%',
						viewConfig: {
							stripeRows: true,
							enableTextSelection: true,
						},
						columns: {
							defaults: {
								style: 'text-align:center',
								align: 'center'
							},
							items: [
								{
									xtype: 'rownumberer',
									header: me.lblNo,
									width: 50,
								},
								{
									header: me.lblEquNo,
									dataIndex: 'eqNo',
									width: 130
								},
								{
									header: me.lblDriver,
									dataIndex: 'driver',
									width: 130
								},
								{
									header: me.lblName,
									dataIndex: 'engNm',
									width: 130
								},
								{
									header: me.lblWorkingArea,
									dataIndex: 'workLoc',
									width: 268
								}]
						}
					},
					{
					  xtype: 'container',
						layout: 'vbox',
						items: [{
							xtype: 'container',
							layout: 'hbox',
							items: [{
								xtype: 'textfield',
								reference: 'tfFindWorkingAreaFL',
								flex: 1,
								margin: '0 10 0 0',
								editable: false,
							}, {
								xtype: 'button',
								text: me.lblFind,
								reference: '	',
								listeners: {
									click: 'onClickBtnFind'
								}
							},]
						}, {
							xtype: 'button',
							text: me.btnUpdate,
							width: 125,
							margin: '10 0 0 0',
							listeners: {
								click: 'onUpdateWorkloc'
							}
						}]
					}]
			}], 
			dockedItems: [{
				xtype: 'container',
				style: { "background-color": "white" },
				layout: {
					align: 'left'
				},
				defaults: {
					margin: '1 1 1 1'
				},
				items: [{
					xtype: 'tbfill'
				},
				{
				   	xtype: 'button',
					text: me.btnRetrieve,
					reference:'btnRetrieve',
					iconCls: 'x-fa fa-search',
					cls: 'search-button',
					listeners: {
						click: 'onSearch'
					},
					hidden: true
				},
				{
					xtype: 'button',
					text: me.btnSave,
					iconCls: 'x-fa fa-save',
					reference: 'btnSave',
					listeners: {
						click: 'onSave'
					}
				}]
			}]
		});

		me.callParent();
	}
});

