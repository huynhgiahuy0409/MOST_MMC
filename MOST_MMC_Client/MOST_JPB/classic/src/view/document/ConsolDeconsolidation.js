Ext.define("MOST.view.document.ConsolDeconsolidation",{
    extend: "Ext.panel.Panel",
    alias: 'widget.app-consoldeconsolidation',
	
    requires: [
		'MOST.view.document.ConsolDeconsolidationController',
		'MOST.view.document.ConsolDeconsolidationModel',
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refConsolDeconsolidationGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'consolDeconsolidationList',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
    
    controller: 'consoldeconsolidation',
	viewModel: {
		type: 'consoldeconsolidation'
	},
	
	listeners:{
		afterrender:'onLoad'
	},
	
	layout : {type  : 'vbox', align : 'stretch'},
	
	initComponent: function(){
		var me = this;
		Ext.apply(me, {
			layout : {
				type : 'vbox',
				align : 'stretch'
			},
			items:[{
				xtype: 'tsb-datagrid',
	    		reference: me.MAIN_GRID_REF_NAME,
	    		flex: 1,
	    		stateful: true,
	    		stateId : 'stateConsolDeconsolidationListGrid',
	    		plugins: [
	    		          'gridexporter',
	    		          'gridfilters',
	    		          'clipboard',
	    		],
	    		bind: {
	    			store: '{' + me.MAIN_STORE_NAME + '}'
	    		},
	    		selModel: {
					type: 'spreadsheet',
					cellSelect: false
				},
				selType: 'checkboxmodel',
	    		listeners: {
	    			pagingSearch: 'onSearch'
	    		},
	    		viewConfig:
	    	    {
	    	        stripeRows: true
	    	    },
	    		columns:{
	    			defaults: {
	            		style : 'text-align:center'
	            	},
	            	items: GridUtil.getGridColumns('ConsolDeconsolidation')
	    		}
			}],
			dockedItems: [{
                xtype: 'container',
                style: { "background-color":"white" },
                layout: {
                	type: 'hbox',
                },
                defaults: {
                    margin: '1 1 1 1'
                },
   				items: [{
					xtype: 'tbfill'
				},
				{
                    xtype: 'button',
                    itemId:'inquiryItemId',
                    text: ViewUtil.getLabel('search'),
                    iconCls: 'x-fa fa-search',
                    cls: 'search-button', 
                    listeners: {
                        click: 'onSearch'
                    }             
                },
                {
                	xtype: 'button',
                	text: ViewUtil.getLabel('getIn'),
					iconCls: 'x-fa fa-arrow-left',
					reference:'refBtnGetIn',
					style: 'background-color:violet',
					listeners: {
						click: 'onGetIn'
					}
                },
                {
					xtype: 'button',
					reference:'refBtnGetOut',
					text: ViewUtil.getLabel('getOut'),
					iconCls: 'x-fa fa-arrow-right',
					style: 'background-color:red',
					listeners: {
						click: 'onGetOut'
					}
				},
                {
					xtype: 'button',
					cls: 'column-setting-button',
					iconCls: 'x-fa fa-columns',
					text: ViewUtil.getLabel('column'),
					listeners: {
						click: 'onColumnSettingPopup',
						args: [me.MAIN_GRID_REF_NAME]
					}
            	}]
   			},
   			{	xtype : 'toolbar',
				enableOverflow: true,
				padding : '0 0 0 0',
				defaults: {
					labelAlign: 'right',
				},
				items: [
					{
						xtype: 'searchfieldset',
						margin: '0 5 5 0',
						flex: 1,
						title: ViewUtil.getLabel('search'),
						autoScroll: true,
						collapsible:true,
						defaults: {
			                labelAlign: 'right',
			                layout: {
			                    type: 'vbox',
			                    align: 'stretch'
			                },
			                defaults: {
			                    margin: '0 5 2 5',
			                    labelAlign: 'right',
			                    flex: 1,
			                    labelWidth: 100
			                }
			            },
			            layout: {
			                type: 'hbox',
			                align: 'stretch'
			            },
			            items: [
			            	{
			                    xtype: 'container',
			                    items: [
			                    	{
										xtype: 'shipcallnofield',
										reference: 'ctlScn',
										emptyText: ViewUtil.getLabel('shipCallNo'),
										fieldLabel: ViewUtil.getLabel('shipCallNo'),
										bind: {
											value: '{theSearch.scn}',
										},
									},
			                    	{
										xtype:'vesselcalllistfield',
										fieldLabel:ViewUtil.getLabel('vslschlJPVCNo'),
										reference:'refVslCallId',
										emptyText:ViewUtil.getLabel('vslschlJPVCNo'),
										change: function(field, newValue){
											   field.setValue(newValue.toUpperCase());
										},
										bind:{
											value: '{theSearch.vslCallId}'
										}
									},
									{
    									xtype: 'container',
    									flex:1
    								},
    								{
    									xtype: 'container',
    									flex:1
    								}	
			                    ]
			            	},
							{
			                    xtype: 'container',
			                    items: [
			                    	{
										xtype: 'combobox',
										reference: 'refMasterBlNo',
										selectOnFocus: true,
										fieldLabel: ViewUtil.getLabel('cmc_masterbl'),
										bind: {
											store: '{masterBlNoCombo}'
										},
										listeners:{
											select: 'onSelectMasterBlNoCombo'
										},
										displayField: 'scdNm',
			                    		valueField: 'mfDocId',
			                    		emptyText:'Select',
										queryMode: 'local',
			                    		forceSelection : true,
										anyMatch: true
									},
									{
										xtype: 'combobox',
										reference: 'refBlNo',
										selectOnFocus: true,
										fieldLabel: ViewUtil.getLabel('blno'),
										bind: {
											store: '{blCombo}',
											value: '{theSearch.blNo}'
										},
										listeners:{
											select: 'onSelectBlNoCombo'
										},
										displayField: 'scdNm',
			                    		valueField: 'blNo',
			                    		emptyText:'Select',
										queryMode: 'local',
			                    		forceSelection : true,
										anyMatch: true
									},
									{
										xtype: 'combobox',
										reference: 'refBookingNo',
										selectOnFocus: true,
										fieldLabel: ViewUtil.getLabel('cmc_bookingno'),
										bind: {
											store: '{bookingNoCombo}'
										},
										listeners:{
											select: 'onSelectBookingNoCombo'
										},
										displayField: 'scdNm',
			                    		valueField: 'mfDocId',
			                    		emptyText:'Select',
										queryMode: 'local',
			                    		forceSelection : true,
										anyMatch: true
									},
		    						{
										xtype: 'combobox',
										reference: 'refSnNo',
										selectOnFocus: true,
										fieldLabel: ViewUtil.getLabel('snNo'),
										bind: {
											store: '{snCombo}',
											value: '{theSearch.snNo}'
										},
										listeners:{
											select: 'onSelectSnNoCombo'
										},
										displayField: 'scdNm',
										valueField: 'snNo',
										emptyText:'Select',
										queryMode: 'local',
										forceSelection : true,
										anyMatch: true
									}	    						
			                    ]
			            	},
			            	{
			                    xtype: 'container',
			                    items: [
			                    	{
	    								xtype: 'datetimefield',	
	    								width : 255,
										reference: 'refGetInFromTime',
										fieldLabel: ViewUtil.getLabel('getInDate'),
										format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
										format: 'd/m/Y H:i',
										bind: '{theSearch.getInFromTime}',
										flex: 0
									},
									{
	    								xtype: 'datetimefield',	
	    								width : 255,
										reference: 'refGetOutFromTime',
										fieldLabel: ViewUtil.getLabel('getOutDate'),
										format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
										format: 'd/m/Y H:i',
										bind: '{theSearch.getOutFromTime}',
										flex: 0
									},
									{
										xtype: 'combobox',
										reference: 'refCargoStatusCombo',
										editable: true,
										fieldLabel: ViewUtil.getLabel('cargoStatus'),
										emptyText: 'Select',
										queryMode:'local',
										bind:{
											store:'{cargoStatusCombo}',
											value: '{theSearch.cargoStatus}'
										},
										displayField:'scdNm',
										valueField:'scd',
										flex: 0
		    						},		    						
			                    ]
			            	},
			            	{
			                    xtype: 'container',
			                    items: [
			                    	{
			    						xtype:'container',
			    						layout:{
			    							type:'vbox'
			    						},
			    						defaults:{
			    							labelAlign: 'right',
			    							labelWidth: 100,
			    							margin: '0 0 0 0'
			    						},
			    						items:[
			    							{
												xtype: 'datetimefield',
												width : 150,
												reference: 'refGetInToTime',
												margin: '0 0 0 5',
												format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
												format: 'd/m/Y H:i',
												bind: '{theSearch.getInToTime}'
											},
											{
												xtype: 'datetimefield',
												width : 150,
												reference: 'refGetOutToTime',
												margin: '2 0 0 5',
												format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
												format: 'd/m/Y H:i',
												bind: '{theSearch.getOutToTime}'
											},
										]
			                    	}
			                    ]
			            	}
			            ]
					}
				]
			}],
			
			renderTo: Ext.getBody()
		});
		
		me.callParent();
	}
});