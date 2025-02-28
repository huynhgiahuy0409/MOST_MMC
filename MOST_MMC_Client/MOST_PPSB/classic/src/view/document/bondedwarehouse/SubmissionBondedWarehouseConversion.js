Ext.define('MOST.view.document.submissionbondedwarehouse.SubmissionoBondedWarehouseConversion', {
    extend: "Ext.form.Panel",
    alias: 'widget.app-submissionbondedwarehouseconversion',
    requires:[
  		'MOST.config.Locale'
  	],
	scrollable: 'y',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	CONTAINER_GRID_REF_NAME: 'refBondedWarehouseConversionListGrid',				// Main Grid Name 
	CONTAINER_STORE_NAME: 'conversionList',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
  	initComponent: function() {
		var me = this;
		
		Ext.apply(this, {
			items:[{
				layout: { type  : 'vbox', align : 'stretch' },
				items:[
					{
						xtype: 'container',
						layout: { type: 'hbox', pack: 'end'},
						defaults:{
									margin: '5 5 0 5',
								},
						items: [
							{
                                xtype: 'button',
                                text: ViewUtil.getLabel('clear'),
                                reference:'refBtnClearRORO',
                                listeners: {
            						click: 'onClearRORO'
            					} 
                            },
						    {	
								xtype: 'button',
								text: ViewUtil.getLabel('add'),
								ui: 'create-button',
								iconCls: 'x-fa fa-plus',
								reference:'refBtnAddRORO',
								listeners:{
									click:'onAddRORO'
								}
							},
							{
                                xtype: 'button',
                                text: ViewUtil.getLabel('update'),
                                reference:'refBtnUpdateRORO',
                                listeners: {
            						click: 'onUpdateRORO'
            					} 
                            },
							{
								xtype: 'button',
								iconCls: 'x-fa fa-minus',
								ui: 'delete-button',
								text: ViewUtil.getLabel('remove'),
								reference:'refBtnRemoveRORO',
								listeners:{
									click:'onRemoveRORO'
								}
							}
						]
					},
					{
						xtype: 'container',
						items: [
							{
								xtype: 'container',
								layout: { type: 'hbox'},
								defaults:{
									margin: '5 5 0 5',
								},
								items: [
									{
										xtype: 'container',
										layout: { type: 'vbox'},
										defaults:{
											margin: '0 5 5 0',
											width: 275,
							    			labelAlign: 'right',
					                        labelWidth: 100
										},
										items: [
											{
												xtype: 'textfield',
												fieldLabel: ViewUtil.getLabel('marksAndNos'),
												reference: 'refMarkAndNos',
												bind: '{bondedWarehouse.marksAndNos}',
												flex: 1,
												listeners:{
													change:'onCboROROBrand_change'		
												},
                                                readOnly: true
											},
											{
                                                xtype: 'numberfield',
                                                fieldLabel: ViewUtil.getLabel('quantity'),
                                                reference: 'refConversionQuantity',
                                                bind: '{bondedWarehouse.conversionPkgQty}',
                                                labelAlign: 'right',
                                                minValue: 0,
                                                maxValue: 999999,
                                                selectOnFocus: true,
                                                allowDecimals: false,
                                                listeners: {
                                                    keyup: 'onChangeMtM3Qty',
                                                    focusleave: 'onChangeMtM3Qty'
                                                },
                                                enableKeyEvents: true,
                                                hideTrigger: true,
											},
											{
												xtype: 'numberfield',
                                                fieldLabel: ViewUtil.getLabel('bondedUnitWeight'),
                                                reference: 'refConversionUnitWeight',
                                                bind: '{bondedWarehouse.conversionUnitWeight}',
                                                labelAlign: 'right',
                                                minValue: 0,
                                                maxValue: 999999,
                                                selectOnFocus: true,
                                                allowDecimals: false,
                                                listeners: {
                                                    keyup: 'onChangeMtM3Qty',
                                                    focusleave: 'onChangeMtM3Qty'
                                                },
                                                enableKeyEvents: true,
											},
                                            {
												xtype: 'numberfield',
                                                fieldLabel: ViewUtil.getLabel('WHLength'),
                                                reference: 'refConversionWHLength',
                                                bind: '{bondedWarehouse.conversionWHLength}',
                                                labelAlign: 'right',
                                                minValue: 0,
                                                maxValue: 999999,
                                                selectOnFocus: true,
                                                allowDecimals: false,
                                                listeners: {
                                                    keyup: 'onChangeMtM3Qty',
                                                    focusleave: 'onChangeMtM3Qty'
                                                },
                                                enableKeyEvents: true,
											}
										]
									},
									{
										xtype: 'container',
										layout: { type: 'vbox'},
										defaults:{
											margin: '0 5 5 0',
											width: 275,
							    			labelAlign: 'right',
					                        labelWidth: 100
										},
										items: [
											{
												xtype: 'textfield',
												fieldLabel: ViewUtil.getLabel('bondedLotSerialNo'),
												reference: 'refLotSerialNo',
												flex: 1
											},
											{
												xtype: 'textfield',
						                        reference: 'refConversionUnit',
						                        flex: 1,
						                        fieldLabel: ViewUtil.getLabel('bondedUnits'),
						                        allowDecimals: true,
												allowNegative: false,
												bind: '{bondedWarehouse.units}'
											},
											{
												xtype: 'numberfield',
                                                fieldLabel: ViewUtil.getLabel('bondedTotalWeight'),
                                                reference: 'refConversionTotalWeight',
                                                bind: '{bondedWarehouse.conversionTotalWeight}',
                                                labelAlign: 'right',
                                                minValue: 0,
                                                maxValue: 999999,
                                                selectOnFocus: true,
                                                allowDecimals: false,
                                                listeners: {
                                                    keyup: 'onChangeMtM3Qty',
                                                    focusleave: 'onChangeMtM3Qty'
                                                },
                                                enableKeyEvents: true,
											},
                                            {
												xtype: 'numberfield',
                                                fieldLabel: ViewUtil.getLabel('WHWidth'),
                                                reference: 'refConversionWidth',
                                                bind: '{bondedWarehouse.conversionWidth}',
                                                labelAlign: 'right',
                                                minValue: 0,
                                                maxValue: 999999,
                                                selectOnFocus: true,
                                                allowDecimals: false,
                                                listeners: {
                                                    keyup: 'onChangeMtM3Qty',
                                                    focusleave: 'onChangeMtM3Qty'
                                                },
                                                enableKeyEvents: true,
											}
										]
									},
									{
										xtype: 'container',
										layout: { type: 'vbox'},
										defaults:{
											margin: '0 5 5 0',
											width: 275,
							    			labelAlign: 'right',
					                        labelWidth: 100
										},
										items: [
                                            {
                                                xtype: 'container',
                                                margin: '0 0 32 0'
                                            },
											{
												xtype: 'numberfield',
												flex: 1,
						                        reference: 'refConversionTotalUnit',
						                        fieldLabel: ViewUtil.getLabel('bondedTotalUnits'),
						                        minValue : 0,
						                        maxValue: 99999999999999,
					                            decimalPrecision: 3,
												allowNegative: false,
												bind: '{bondedWarehouse.conversionTotalUnits}',
                                                hideTrigger: true,
                                                readOnly: true
											},
											{
												xtype: 'numberfield',
												flex: 1,
						                        reference: 'refConversionUnitVolume',
						                        fieldLabel: ViewUtil.getLabel('bondedUnitVolume'),
						                        minValue : 0,
						                        maxValue: 99999999999999,
					                            decimalPrecision: 3,
						                        allowDecimals: true,
												allowNegative: false,
												bind: '{bondedWarehouse.conversionUnitVolume}',
                                                hideTrigger: true
											},
                                            {
												xtype: 'numberfield',
												flex: 1,
						                        reference: 'refConversionHeight',
						                        fieldLabel: ViewUtil.getLabel('WHHeight'),
						                        minValue : 0,
						                        maxValue: 99999999999999,
					                            decimalPrecision: 3,
						                        allowDecimals: true,
												allowNegative: false,
												bind: '{bondedWarehouse.conversionHeight}'
											},
										]
									},
                                    {
										xtype: 'container',
										layout: { type: 'vbox'},
										defaults:{
											margin: '0 5 5 0',
											width: 275,
							    			labelAlign: 'right',
					                        labelWidth: 100
										},
										items: [
                                            {
                                              xtype: 'container',
                                              margin: '0 0 32 0'
                                            },
											{
												xtype: 'textfield',
												flex: 1,
						                        reference: 'refConversionRemark',
						                        fieldLabel: ViewUtil.getLabel('bondedRemark'),
												bind: '{bondedWarehouse.conversionRemark}'
											},
											{
												xtype: 'textfield',
												fieldLabel: ViewUtil.getLabel('bondedTotalVolume'),
												flex: 1,
												reference: 'refConversionTotalVolume',
                                                readOnly: true,
                                            },
                                            {
												xtype: 'textfield',
												fieldLabel: ViewUtil.getLabel('bondedTotalM3'),
												flex: 1,
												reference: 'refConversionTotalM3',
                                                readOnly: true,
											},
										]
									}
								]
							},					
							{
								xtype: 'tsb-datagrid',
								flex: 1,
								reference: me.CONTAINER_GRID_REF_NAME,
								usePagingToolbar : false,
								plugins: [
			    		          'gridexporter',
			    		          'gridfilters',
			    		          'clipboard'
		    		            ],
		    		            bind:{
							    	 store: '{' + me.CONTAINER_STORE_NAME + '}'
		    		            },
		    		            selModel: {
									type: 'spreadsheet',
									cellSelect: false
		    		            },	
		    		            listeners : {
		    						cellclick: 'onROROGridItemClick'
		    					},
								columns:{
									defaults: {
					            		style : 'text-align:center'
					            	},
					            	items: GridUtil.getGridColumns('BondedWarehouseConversion')
								}
							}
						]
					}
				]
			}]
		});
		
		me.callParent();
  	}
});