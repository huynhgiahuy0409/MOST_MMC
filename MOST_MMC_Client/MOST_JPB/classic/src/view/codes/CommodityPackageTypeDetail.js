Ext.define('MOST.view.codes.CommodityPackageTypeDetail', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-commoditypackagetypedetail',
	
	requires: [
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	listeners: {
		afterrender: 'onDetailLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	
	MAIN_GRID_REF_NAME: 'refcommodityCodeGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'commodityCodeList',
	COMMODITY_CODE_CARGOTP_STORE: 'commodityCodeCargoTpCombo',
	COMMODITY_CODE_GROUP_STORE: 'commodityCodeGroupCombo',
	COMMODITY_CODE_GROUP_CODE_STORE: 'commodityCodeGroupCdCombo',
	COMMODITY_CODE_IMDG_STORE: 'commodityCodeImdgCombo',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	width: 1360,
	height: 220,
	
	layout : {type  : 'vbox', align : 'stretch'},
	
	initComponent: function() {
		var me = this;

		Ext.apply(me, {
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            margin: '0 0 0 0',
			items: [
				{
					xtype : 'toolbar',
					enableOverflow: true,
					padding : '0 0 0 0',
					defaults:{
						labelAlign: 'right',
					},
					items:[
						{
							xtype: 'searchfieldset',
							title: 'Commodity Group',
							autoScroll: true,
							collapsible:true,
							flex:1,
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							defaults:{
								margin: '0 0 5 0'
							},
							
							items: [						
								{
									xtype: 'container',								
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										labelAlign: 'right',
										margin: '0 5 0 0'
									},
									items: [
										{
											xtype: 'combo',
											reference: 'ctlCgTp',
											labelWidth: 100,
											width: 250,
											fieldLabel: ViewUtil.getLabel('cargoTp'),
											queryMode: 'local',
											emptyText: 'Select',
											bind: {
												store: '{' + me.COMMODITY_CODE_CARGOTP_STORE + '}',
												value: '{theDetail.cgTp}'
											},
											displayField: 'scdNm',
											valueField: 'scd',
											editable: false,
//											listeners: {
//									             'afterRender': function () {
//									                 this.disable();
//									             }
//									         }
										},{
											xtype: 'textfield',
											reference: 'txtComGrCd',
											labelWidth: 150,
											width: 300,
											maxLength: 5,
											enforceMaxLength: true,
											fieldLabel: ViewUtil.getLabel('commodityGrCd'),
											queryMode: 'local',
											fieldStyle: 'text-transform:uppercase',
											bind: '{theDetail.cmdtGrpCd}',																														
										},{
											xtype: 'textfield',
											reference: 'txtComGrDes',
											labelWidth: 170,
											width: 350,
											fieldLabel: ViewUtil.getLabel('commodityGrDes'),
											queryMode: 'local',
											fieldStyle: 'text-transform:uppercase',
											bind: '{theDetail.cmdtGrpDes}',													
										}
									]
								}
							]			
						}
					]
				},{
					xtype : 'toolbar',
					enableOverflow: true,
					padding : '0 0 0 0',
					defaults:{
						labelAlign: 'right',
					},
					items:[
						{
							xtype: 'searchfieldset',
							title: 'Commodity',							
							autoScroll: true,
							collapsible:true,
							flex:1,
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							defaults:{
								margin: '0 0 10 0'
							},
							items: [
								{
									xtype: 'container',						
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										labelAlign: 'right',
										margin: '0 2 0 0'
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'txtComCd',
											labelWidth: 100,
											width: 200,
											allowBlank: false,
											fieldLabel: ViewUtil.getLabel('commodityCode'),
											queryMode: 'local',
											fieldStyle: 'text-transform:uppercase',
											bind: {								
												value: '{theDetail.cmdtCd}'
											},																														
										},{
											xtype: 'textfield',
											reference: 'txtComDes',
											labelWidth: 120,
											width: 350,
											fieldLabel: ViewUtil.getLabel('commodityDes'),
											queryMode: 'local',
											fieldStyle: 'text-transform:uppercase',
											bind: {								
												value: '{theDetail.descr}'
											},																														
										},{
				                            xtype: 'textfield',
				                            flex: 0.3,
				                            fieldLabel: ViewUtil.getLabel('uNNoClass'),
				        					reference:'txtUnno',
				                            bind: {
				                            	value: '{theDetail.unno}',
				                            },
				                            labelAlign: 'right',
				                            labelWidth: 80,
											enableKeyEvents: true,
											listeners: {
												keydown : 'onKeyDown'
											}
				                        },{
				                            xtype: 'cmmcdfield',
				                            margin: '0 0 0 5',
				        					reference:'txtImdg',
				                            bind:{
				                            	value : '{theDetail.imdg}'
				                            },
				                            width: 200,
				                            labelAlign: 'right',
				                            editlable : false,
			        	   					params:{
			        	   						searchType: 'IMDG'
			        	   					}
				                        },{
											xtype: "packagetypemultifield",
											reference: "ctlPkgTp",																
											bind: {				
												value: '{theDetail.pkgTpCd}'
										    }																																						
										}
									]
								},
								{
									xtype: 'container',						
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										labelAlign: 'right',
										margin: '0 5 0 0'
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'txtPumpingRate',
											labelWidth: 100,
											width: 200,
											fieldLabel: ViewUtil.getLabel('pumpingRate'),
											queryMode: 'local',
											bind: {									
												value: '{theDetail.pumpRate}'
											},																														
										}
									]
								},
							]
						}
					]
				}								
			]
		});

		me.callParent();
	}
});