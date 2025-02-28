Ext.define('MOST.view.operation.ShiftingDoubleBanking', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.app-shiftingdoublebanking',

    requires: [
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
    ],


	controller: 'shiftingdoublebanking',
	
	viewModel: {
		type: 'shiftingdoublebanking'
	},
	
	listeners:{
		afterrender: 'onLoad',
	},

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    
	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items: [{
				xtype: 'container',
				margin: '0 5 5 0',
				flex: 1,
				layout: {
					type: 'vbox',
					align: 'stretch'
				},
				items: [
					{
						xtype: 'tabpanel',
						flex: 1,
						deferredRender: false, //all tab load
						reference: 'tabpnl',
						defaults: {
							margin: '0 0 0 0',
						},
						listeners: {
							tabchange: 'onTabpnlActivate'
						},
						activeTab: 3,
						items: [
							{
								xtype: 'panel',
								title: ViewUtil.getLabel('doublebanking'),
								reference: 'refDoubleBankingPnl',
								layout: 'fit',
								items: [{
									xtype: 'app-doublebanking',
									flex: 1
								}]
							}, {
								xtype: 'panel',
								title: ViewUtil.getLabel('shiptoship'),
								reference: 'refShipToShipPnl',
								layout: 'fit',
								items: [{
									xtype: 'app-shiptoship',
									flex: 1
								}]
							}, {
								xtype: 'panel',
								title: ViewUtil.getLabel('vslshifting'),
								reference: 'refVslShiftingPnl',
								layout: 'fit',
								items: [{
									xtype: 'app-vslshifting',
									flex: 1
								}]
							}, {
								xtype: 'panel',
								title: ViewUtil.getLabel('cargoshifting'),
								reference: 'refCargoShiftingPnl',
								layout: 'fit',
								items: [{
									xtype: 'app-cargoshifting',
									flex: 1
								}]
							}
						]
					}]
			}],
                dockedItems:[{
    				xtype: 'container',
    				style: { "background-color":"white" },
    				defaults: {
    					labelAlign: 'right'
    	        	},
    				items: [
    					{
	    					xtype: 'container',
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
	            					xtype: 'button',
	            					itemId: 'inquiryItemId',
	            					reference:'refBtnRetrieve',
	            					text: ViewUtil.getLabel('search'),
	            					iconCls: 'x-fa fa-search',
	            					cls: 'search-button',
	            					listeners: {
	            						click: 'onSearch'
	            					}
	            				},{
	            					xtype: 'button',
	            					reference:'refBtnCreate',
	            					text: ViewUtil.getLabel('add'),
	            					ui: 'create-button',
	            					iconCls: 'x-fa fa-plus',
	            					disabled:true,
	            					listeners: {
	            						click: 'onAdd'
	            					}
	            				},{
	            					xtype: 'button',
	            					reference:'refBtnDelete',
	            					text: ViewUtil.getLabel('delete'),
	            					ui: 'delete-button',
	            					iconCls: 'x-fa fa-minus',
	            					disabled:true,
	            					listeners: {
	            						click: 'onRemove'
	            					}
	            				},{
									xtype: 'button',
									text: ViewUtil.getLabel('clear'),
									iconCls: 'x-fa fa-file',
									reference:'refBtnClear',
									disabled:true,
									listeners: {
										click: 'onClearField'
									}
								},{
	            					xtype: 'button',
	            					itemId: 'saveItemId',
	            					reference:'refBtnSave',
	            					text: ViewUtil.getLabel('save'),
	            					ui: 'update-button',
	        						iconCls: 'x-fa fa-save',
	            					disabled:true,
	            					listeners: {
	            						click: 'onSave'
	            					}
	            				}
	                        	]
    					}
    					]
    			},
    			{
    				xtype: 'toolbar',
					padding: '0 0 0 0',
    				enableOverflow: true,
    				defaults: {
    					labelAlign: 'right'
                	},
    				items: [
    					{
    						xtype: 'fieldset',
    						title: ViewUtil.getLabel('search'),
    						autoScroll: true,
    						collapsible:true,
    						flex: 1,
							padding: '0 10 10 10',
							margin: '0 5 10 0',
    				        layout: {
    				        	type: 'hbox',
    				        	align: 'stretch'
    	                    },
    	                    items: [
    	                    	{
    	                    		xtype: 'searchfieldset',
    	    			    		title: ViewUtil.getLabel('search'),
                                    flex: 2.5,
									margin: '0 5 0 0',
									padding: '0 10 10 10',
									defaults: {
										labelWidth: 80,
										padding: '0 0 5 0',
									},
                                    items: [
										{
											xtype: 'shipcallnofield',
											reference: 'ctlScn',
											//emptyText: ViewUtil.getLabel('shipCallNo'),
											fieldLabel: ViewUtil.getLabel('shipCallNo'),
											bind: {
												value: '{theSearch.scn}',
											},
											
										},
										{
    			  				    	xtype:'vesselcalllistfield',
    			  				    	reference:'txtJpvc',
    			  				    	fieldLabel:ViewUtil.getLabel('sftJPVC'),
    			  				    	bind:{
    			  				    		value: '{theSearch.vslCallId}'
    			  				    	}
			  				    	}]
    	                    	},
    	                    	{
    	                    		xtype: 'fieldset',
    	    		    			title: ViewUtil.getLabel('vslInfo'),
    	                            flex: 7.5,
									margin: '0 0 0 5',
									padding: '0 10 10 10',
    	                            layout: {
    	                                type: 'vbox',
										align: 'stretch'
    	                            },
									items: [
										{
											xtype: 'container', 
											layout: {
												type: 'hbox',
												align: 'stretch'
											},
											width: '100%',
											defaults: {
												labelAlign: 'right',
												flex: 1,
												labelWidth: 80
											},
											items: [
												{
													xtype: 'textfield',
													fieldLabel: ViewUtil.getLabel('vesselCode'),
													reference: 'txtVslCd',
													bind: '{vslDetail.vslCd}',
													editable: false
												}, {
													xtype: 'textfield',
													fieldLabel: ViewUtil.getLabel('sa'),
													reference: 'txtVslSA',
													bind: '{vslDetail.arrvSaId}',
													editable: false
												}, {
													xtype: 'datetimefield',
													fieldLabel: ViewUtil.getLabel('eta'),
													reference: 'txtVslEta',
													bind: '{vslDetail.eta}',
													format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
													readOnly: true
												}, {
													xtype: 'container'
												}												
											]
										},
										{
											xtype: 'container',
											layout: {
												type: 'hbox',
												align: 'stretch'
											},
											margin: '5 0 0 0',
											defaults: {
												labelAlign: 'right',
												flex: 1,
												labelWidth: 80
											},
											items: [
												{
													xtype: 'textfield',
													fieldLabel: ViewUtil.getLabel('vslNm'),
													reference: 'txtVslNm',
													bind: '{vslDetail.vslNm}',
													editable: false,
												}, {
													xtype: 'textfield',
													fieldLabel: ViewUtil.getLabel('berthingLoc'),
													reference: 'txtVslBerthNo',
													bind: '{vslDetail.berthLoc}',
													editable: false,
												}, {
													xtype: 'datetimefield',
													fieldLabel: ViewUtil.getLabel('etd'),
													reference: 'txtVslEtd',
													bind: '{vslDetail.etd}',
													readOnly: true,
													format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
												},{
													xtype: 'container'
												}
											]
										},
										{
											xtype: 'container',
											layout: {
												type: 'hbox',
												align: 'stretch'
											},
											margin: '5 0 0 0',
											defaults: {
												labelAlign: 'right',
												labelWidth: 80
											},
											items: [
												{
													xtype: 'textfield',
													flex: 1,
													fieldLabel: ViewUtil.getLabel('voyage'),
													reference: 'txtVslVoy',
													bind: '{vslDetail.voyage}',
													editable: false
												},
												{
													xtype: 'container',
													flex: 3
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