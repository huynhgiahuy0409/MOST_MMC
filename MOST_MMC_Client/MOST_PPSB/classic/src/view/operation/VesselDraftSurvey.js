Ext.define('MOST.view.operation.VesselDraftSurvey', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-vesseldraftsurvey',
	requires: [],

	controller: 'vesseldraftsurvey',

	viewModel: {
		type: 'vesseldraftsurvey',
	},

	detailViewAlias: 'app-vesseldraftsurveydetail',

	listeners: {
		afterrender: 'onLoad'
	},

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refVesselDraftSurveyGrid', 
	MAIN_STORE_NAME: 'vslDraftSurveyList',
	DTL_GRID_REF_NAME: 'refVesselDraftSurveyDtlGrid',
	DTL_STORE_NAME: 'vslDraftSurveyDetailList', 
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	layout: {
		type: 'vbox',
		align: 'stretch',
	},

	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			items: [
				{
					xtype: 'fieldset',
					title: ViewUtil.getLabel('scnList'),
					flex: 1,
					margin: '0 5 5 5',
					padding: '0 10 10 10',
					layout: {
						type: 'hbox',
						align: 'stretch',
					},
					items: [
						{
							xtype: 'tsb-datagrid',
							reference: me.MAIN_GRID_REF_NAME,
							flex: 1,
							margin: '0 0 0 0',
							stateful: true,
							usePagingToolbar: false,
							plugins: ['gridexporter', 'gridfilters', 'clipboard'],
							bind: {
								store: '{' + me.MAIN_STORE_NAME + '}',
							},
							listeners: {
								cellclick: 'onMainGridClick',
								celldblclick: 'onMainGridDblClick',
							},
							selModel: {
								type: 'spreadsheet',
								cellSelect: false,
							},
							columns: {
								defaults: {
									style: 'text-align:center',
									align: 'center',
								},
								items: GridUtil.getGridColumns('VesselDraftSurveyList'),
							},
						},
					],
				},
				{
					xtype: 'fieldset',
					title: ViewUtil.getLabel('documentList'),
					flex: 4,
					margin: '0 5 5 5',
					padding: '0 10 0 10',
					layout: {
						type: 'hbox',
						align: 'stretch',
					},
					items: [
						{
							xtype: 'tsb-datagrid',
							reference: me.DTL_GRID_REF_NAME,
							flex: 1,
							margin: '0 0 0 0',
							stateful: true,
							stateId: 'stateVesselDraftSurveyGrid',
							plugins: ['gridexporter', 'gridfilters', 'clipboard'],
							bind: {
								store: '{' + me.DTL_STORE_NAME + '}',
							},
							selModel: {
								type: 'spreadsheet',
								cellSelect: false,
							},
							columns: {
								defaults: {
									style: 'text-align:center',
									align: 'center',
								},
								items: GridUtil.getGridColumns('VesselDraftSurveyDetailList'),
							},
						},
					],
				},
			],
			dockedItems: [
				{
					xtype: 'container',
					style: { 'background-color': 'white' },
					layout: {
						type: 'hbox',
					},
					defaults: {
						margin: '5 5 5 0',
					},
					items: [
						{
							xtype: 'tbfill',
						},
						{
							xtype: 'button',
							itemId: 'inquiryItemId',
							reference: 'refBtnRetrieve',
							text: ViewUtil.getLabel('search'),
							iconCls: 'x-fa fa-search',
							cls: 'search-button',
							listeners: {
								click: 'onSearch',
							},
						},
						{
							xtype: 'button',
							reference: 'refBtnCreate1',
							text: ViewUtil.getLabel('add'),
							ui: 'create-button',
							iconCls: 'x-fa fa-plus',
							listeners: {
								click: 'onAdd',
							},
						},
						{
							xtype: 'button',
							itemId: 'deleteItemId',
							reference: 'refBtnDelete',
							text: ViewUtil.getLabel('remove'),
							ui: 'delete-button',
							iconCls: 'x-fa fa-minus',
							listeners: {
								click: 'onRemove',
							},
						},
						{
							xtype: 'button',
							cls: 'column-setting-button',
							iconCls: 'x-fa fa-columns',
							text: ViewUtil.getLabel('column'),
							listeners: {
								click: 'onColumnSettingPopup',
								args: [me.MAIN_GRID_REF_NAME],
							},
						},
					],
				},
				{
					xtype: 'container',
					defaults: {
						labelAlign: 'right',
					},
					layout: {
						type: 'hbox',
						align: 'stretch',
					},
					items: [
						{
							xtype: 'searchfieldset',
							title: ViewUtil.getLabel('searchCondition'),
							margin: '5 2.5 5 5',
							padding: '0 10 10 10',
							flex: 1,
							items: [
								{
									xtype: 'shipcallnofield',
									reference: 'ctlScn',
									fieldLabel: ViewUtil.getLabel('shipCallNo'),
									labelWidth: 80,
									fieldStyle: 'text-transform: uppercase',
									bind: {
										value: '{theVsl.scn}',
									},
									width: '100%',
								},
							],
						},
						{
							xtype: 'fieldset',
							title: ViewUtil.getLabel('vesselInformation'),
							flex: 3,
							margin: '5 5 5 2.5',
							padding: '0 10 10 10',
							layout: {
								type: 'hbox',
								align: 'stretch',
							},
							defaults: {
								readOnly: true,
								labelAlign: 'right',
							},
							items: [
								{
									xtype: 'textfield',
									fieldLabel: ViewUtil.getLabel('vesselId'),
									reference: 'refVslCd',
									bind: '{theVsl.vslCd}',
									flex: 1,
								},
								{
									xtype: 'textfield',
									fieldLabel: ViewUtil.getLabel('vesselName'),
									reference: 'refVslNm',
									bind: '{theVsl.vslNm}',
									flex: 1,
								},
								{
									xtype: 'container',
									flex: 1,
								},
							],
						},
					],
				},
			],
		});

		me.callParent();
	},
});
