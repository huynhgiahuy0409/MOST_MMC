Ext.define("MOST.view.planning.SpaceMovementRequest", {
	extend: "Ext.panel.Panel",
	alias: "widget.app-spacemovementrequest",
	requires: [
		"MOST.view.planning.SpaceMovementPlanModel",
		"MOST.view.planning.SpaceMovementRequestController",
		"Ext.grid.plugin.Exporter",
		"Ext.grid.plugin.Clipboard",
		"Ext.grid.filters.Filters",
		"Ext.grid.selection.SpreadsheetModel",
	],

	detailViewAlias: "app-spacemovementrequestdetail",

	controller: "spacemovementrequest",

	viewModel: {
		type: "spacemovementrequest",
	},

	listeners: {
		afterrender: "onLoad",
	},
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: "refSpaceMovementRequestGrid",
	MAIN_STORE_NAME: "spacemovementrequest",
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	layout: { type: "vbox", align: "stretch" },

	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			items: [
				{
					xtype: "tsb-datagrid",
					reference: me.MAIN_GRID_REF_NAME,
					flex: 1,
					stateful: true,
					stateId: "stateSpaceMovementPlanGrid",
					plugins: ["gridexporter", "gridfilters", "clipboard"],
					bind: {
						store: "{" + me.MAIN_STORE_NAME + "}",
					},
					selModel: {
						type: "checkboxmodel",
						checkOnly: false,
						showHeaderCheckbox: true,
					},
					listeners: {
						celldblclick: "onDblClick",
						pagingSearch: "onSearch",
					},
					columns: {
						defaults: {
							style: "text-align:center",
							align: "center",
						},
						items: GridUtil.getGridColumns("SpaceMovementPlan"),
					},
				},
			],

			dockedItems: [
				{
					xtype: "container",
					style: { "background-color": "white" },
					layout: {
						type: "hbox",
					},
					defaults: {
						margin: "5 5 0 0",
					},
					items: [
						{
							xtype: "tbfill",
						},
						{
							xtype: "button",
							reference: "refBtnRetrieve",
							text: ViewUtil.getLabel("search"),
							iconCls: "x-fa fa-search",
							cls: "search-button",
							listeners: {
								click: "onSearchBtn",
							},
						},
						{
							xtype: "button",
							itemId: "btnAdd",
							reference: "refBtnCreate",
							text: ViewUtil.getLabel("add"),
							iconCls: "x-fa fa-plus",
							listeners: {
								click: "onAdd",
							},
						}, 
						{
							xtype: "button",
							itemId: "btnDelete",
							reference: "refBtnDelete",
							text: ViewUtil.getLabel("remove"),
							ui: "delete-button",
							iconCls: "x-fa fa-minus",
							listeners: {
								click: "onRemove",
							},
						},
						{
							xtype: "button",
							itemId: "exportToExcelButton",
							text: ViewUtil.getLabel("exportToExcel"),
							iconCls: "excel-button-image",
							cls: "excel-button",
							listeners: {
								click: {
									fn: "onExportExcel",
									args: ["refSpaceMovementPlanGrid"],
								},
							},
						},
						{
							xtype: "button",
							itemId: "exportToPdfButton",
							text: ViewUtil.getLabel("exportToPdf"),
							iconCls: "x-fa fa-file-pdf-o",
							cls: "excel-button",
						},
						{
							xtype: "button",
							cls: "column-setting-button",
							iconCls: "x-fa fa-columns",
							text: ViewUtil.getLabel("column"),
							listeners: {
								click: "onColumnSettingPopup",
								args: [me.MAIN_GRID_REF_NAME],
							},
						},
					],
				},
				{
					xtype: "toolbar",
					enableOverflow: true,
					padding: "0 0 0 0",
					defaults: {
						labelAlign: "right",
					},
					items: [
						{
							xtype: "searchfieldset",
							flex: 1,
							title: ViewUtil.getLabel("search"),
							autoScroll: true,
							collapsible: true,
							layout: {
								type: "hbox",
								align: "stretch",
							},
							padding: "0 10 10 10",
							margin: "0 5 5 0",
							items: [
								{
									xtype: "container",
									layout: {
										type: "vbox",
										align: "stretch",
									},
									flex: 0.95,
									defaults: {
										labelAlign: "right",
										labelWidth: 80,
										margin: "5 0 0 0",
									},
									items: [
										{
											xtype: "shipcallnofield",
											reference: "ctlScn",
											margin: "0 0 0 0",
											emptyText: ViewUtil.getLabel("shipCallNo"),
											fieldLabel: ViewUtil.getLabel("shipCallNo"),
											bind: {
												value: "{theSearch.scn}",
											},
										},
										{
											xtype: "vesselcalllistfield",
											reference: "ctlSpaceMovementRequestVesselCallId",
											fieldLabel: ViewUtil.getLabel("vslcallid"),
											emptyText: ViewUtil.getLabel("vslcallid"),
											editable: true,
											bind: {
												value: "{theSearch.vslCallId}",
											},
										},
									],
								},
								{
									xtype: "container",
									flex: 1,
									layout: {
										type: "vbox",
										align: "stretch",
									},
									defaults: {
										labelAlign: "right",
										margin: '5 0 0 0'
									},
									items: [
										{
											xtype: "container",
											margin: '0 0 0 0',
											layout: {
												type: "hbox",
												align: "stretch",
											},
											items: [
												{
													xtype: "checkboxfield",
													boxLabel: ViewUtil.getLabel("nonVessel"),
													margin: "0 0 0 5",
													value: "false",
													reference: "ctlNonVessel",
													bind: {
														value: "{theSearch.nonVesselYN}",
													},
													width: 80,
												},
												{
													reference: "ctlSpaceMovementPlanType",
													xtype: "combo",
													labelWidth: 75,
													fieldLabel: ViewUtil.getLabel("spaceMovementRequestReqTpNm"),
													labelAlign: "right",
													flex: 1,
													queryMode: "local",
													bind: {
														store: "{spaceMovementRequestForReqTypeCombo}",
														value: "{theSearch.reqTpCd}",
													},
													emptyText: "All",
													displayField: "scdNm",
													valueField: "scd",
													editable: false,
													forceSelection: true,
												},
											],
										},
										{
											xtype: "container",
											layout: {
												type: "hbox",
												align: "stretch",
											},
											items: [
												{
													xtype: "label",
													text: ViewUtil.getLabel("spaceMovementRequestReqDt") + ":",
													style: "text-align: right; margin-top: 5px;",
													width: 160,
												},
												{
													xtype: "datefield",
													reference: "ctlSpaceMovementRequestFromDt",
													flex: 1,
													margin: "0 5 0 5",
													format: MOST.config.Locale.getShortDate(),
												},
												{
													xtype: "datefield",
													reference: "ctlSpaceMovementRequestToDt",
													flex: 1,
													format: MOST.config.Locale.getShortDate(),
												},
											],
										},
									],
								},
								{
									xtype: "container",
									flex: 0.95,
									layout: {
										type: "vbox",
										align: "stretch",
									},
									defaults: {
										labelAlign: "right",
										margin: '5 0 0 0',
										labelWidth: 80,
									},
									items: [
										{
											xtype: "combo",
											reference: "ctlSpaceMovementRequestStatus",
											margin: '0 0 0 0',
											fieldLabel: ViewUtil.getLabel(
												"spaceMovementRequestStatNm"
											),
											queryMode: "local",
											bind: {
												store: "{spaceMovementRequestForStatusCombo}",
												value: "{theSearch.statCd}",
											},
											emptyText: "All",
											displayField: "scdNm",
											valueField: "scd",
											editable: false,
											forceSelection: true,
										},
										{
											xtype: "combobox",
											reference: "ctlPlanLocation",
											fieldLabel: ViewUtil.getLabel("spaceMovementPlanLocation"),
											bind: {
												store: "{warehouseViewCombo}",
												value: "{theSearch.reqPos}",
											},
											emptyText: "All",
											displayField: "scdNm",
											valueField: "scd",
											listeners: {
												select: "onPlanLocComboLoad",
											},
											hidden: true
										},
									],
								},
								{
									hidden: true,
									xtype: "container",
									flex: 0.95,
									layout: {
										type: "vbox",
										align: "stretch",
									},
									defaults: {
										labelAlign: "right",
										margin: "5 0 0 0",
										labelWidth: 80,
									},
									items: [
										{
											xtype: "textfield",
											reference: "ctlLotNoField",
											margin: "0 0 0 0",
											fieldLabel: ViewUtil.getLabel("lotNo"),
											editable: true,
											bind: {
												value: "{theSearch.lotNo}",
											},
											listeners: {
												change: "onUpperCase",
											},
										},
										{
											xtype: "combobox",
											reference: "ctlPlanBayRow",
											fieldLabel: "Plan Bay Row",
											bind: {
												store: "{planLocationCombo}",
												value: "{theSearch.planLocId}",
											},
											emptyText: "All",
											displayField: "planLocId",
											valueField: "planLocId",
										},
									],
								},
								{
									xtype: 'container',
									flex: 1
								}
							],
						},
					],
				},
			],
		});

		me.callParent();
	},
});
