Ext.define('MOST.view.operation.VORDryBreakBulk', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-vordrybreakbulk',
	
	requires: [
	  
	],
	
	detailViewAlias: 'app-vesseloperationreport',
	width:1300,
	height:750,
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	controller: 'vordrybreakbulk',
	
	viewModel: {
		type: 'vordrybreakbulk'
	},
	
	config: {
		recvData : null
	},
	
	initComponent: function() {
		var me = this;
		Ext.apply(this, {
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
			{
                xtype: 'tabpanel',
            	margin: '0 5 5 0',
                flex: 1,
	    		layout: 'fit',
	    		listeners:{
					tabchange:'onTabChange'
		        },
                items: [
                {
                	xtype:'panel',
                	title: ViewUtil.getLabel('vesselInformation'),
                	items : [
						{
							xtype: 'app-vesselInformation',
				    		reference: 'refVesselInformation',
				    		flex: 1
						}
					]
                },{
                	xtype: 'app-vorList',
		    		reference: 'refVORList',
                	title: ViewUtil.getLabel('vorList')
                },{
                	xtype:'app-summaryOfHandling',
                	title: ViewUtil.getLabel('summaryOfHandling'),
                	reference: 'refSummaryOfHandling'
                }
                ]
            }
			],
            dockedItems:[{
				xtype: 'container',
				style: { "background-color":"white" },
				layout: {
					type: 'hbox'
				},
				defaults: {
					margin: '1 1 1 1'
				},
				items: [{
						xtype: 'tbfill'
					},
					{
						xtype : 'button',
						itemId: 'inquiryItemId',
						reference : 'refBtnRetrieve',
						text : ViewUtil.getLabel('retrive'),
						iconCls : 'x-fa fa-search',
						cls : 'search-button',
						listeners : {
							click : 'onSearch'
						}
					},{
						xtype: 'button',
						itemId: 'saveItemId',
						reference:'refBtnSave',
						text: ViewUtil.getLabel('save'),
						iconCls: 'x-fa fa-save',
						listeners: {
							click: 'onSave'
						}
					},{
						xtype: 'button',
						itemId: 'exportToExcelButton',
						text: ViewUtil.getLabel('exportToExcel'),
						iconCls: 'excel-button-image', 
						cls: 'excel-button', 
						listeners: {
							click: {
								fn: 'onExportExcelPdfWithServer',
								args:[me.MAIN_GRID_REF_NAME, true]
							}
						}
					},
					{
						xtype: 'button',
						itemId: 'exportToPdfButton',
						reference:'refBtnPreview',
						text: ViewUtil.getLabel('preview'),
						iconCls: 'x-fa fa-file-pdf-o',
						cls: 'excel-button',
						listeners: {
							click: {
								fn: 'onPreview',
							}
						}
	            	}						
				]
            },
            {
            	xtype: 'toolbar',
				enableOverflow: true,
				defaults: {
					labelAlign: 'right'
            	},
				items: [
					{
						xtype: 'searchfieldset',
						title: ViewUtil.getLabel('search'),
						autoScroll: true,
						collapsible:true,
						flex: 1,
				        layout: {
				        	type: 'hbox',
				        	align: 'stretch'
	                    },
	                    items: [
	                    	{
			                    xtype: 'fieldset',
		                        layout: { 
		                        	type: 'hbox'
		                		},
			                    defaults: {
			                        margin: '5 5 0 0',
			                        labelAlign: 'right'
			                    },
			                    items: [
			                    	{
										xtype: 'shipcallnofield',
										reference: 'ctlScn',
										labelWidth: 70,
										//emptyText: ViewUtil.getLabel('shipCallNo'),
										fieldLabel: ViewUtil.getLabel('shipCallNo'),
										bind: {
											value: '{theSearch.scn}',
										},
										
									},
									{
										xtype: 'vesselcalllistnolabel',
										fieldLabel: ViewUtil.getLabel('vessel'),
										labelWidth: 70,
		                            	reference:'ctlVslCallId',
		                            	allowBlank: false
									}
								]
			                },
			                {
			                	xtype: 'container',
			                	layout:{
			                		type: 'hbox'
			                	},
			                	flex: 1,
			                	items:[
			                		{
			                			xtype:'container',
			                			flex:1,
			                			padding: '0 0 0 40',
    									items:[
    										{
    											xtype: 'checkboxfield',
    											boxLabel: ViewUtil.getLabel('vorLQ_DoPacking_DoubleBankingCases'),
    											reference: 'refDoPackingDbbCases',
    											inputValue: 'Y',
    					                        uncheckedValue: 'N',
    					                        checked:false,
    					                        listeners: {
//    					                        	change: 'onTabSetting'
    					                        }
    										}
    									]
			                		}
		                		]
			                }
	                    ]
					}
				]
            }]
		});
		me.callParent();
	}
});