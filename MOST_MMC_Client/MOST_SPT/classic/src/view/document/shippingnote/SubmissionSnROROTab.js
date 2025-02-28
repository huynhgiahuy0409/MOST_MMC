Ext.define("MOST.view.document.shippingnote.submissionshippingnote.SubmissionSnROROTab",{
    extend: "Ext.form.Panel",
    alias: 'widget.app-submissionsnrorotab',
    requires:[
  		'MOST.config.Locale'
  	],
	scrollable: 'y',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	CONTAINER_GRID_REF_NAME: 'refROROGrid',				// Main Grid Name 
	CONTAINER_STORE_NAME: 'unitList',
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
											width: 300,
							    			labelAlign: 'right',
					                        labelWidth: 100
										},
										items: [
											{
												xtype: 'combobox',
												fieldLabel: ViewUtil.getLabel('brand'),
												reference: 'refCboROROBrand',
												editable:false,
												queryMode:'local',
												bind: {
													store: '{roroBrandStore}',
													value:'{theShippingNote.brandCd}'
												},
												displayField:'scdNm',
												valueField:'scd',
												flex: 1,
												listeners:{
													change:'onCboROROBrand_change'		
												}
											},
											{
												xtype: 'textfield',
												fieldLabel: ViewUtil.getLabel('unitNo'),
												listeners:{
													change: 'onUpperCase'
												},
												flex: 1,
												reference: 'refROROUnitNo',
												bind: '{theShippingNote.unitNo}'
											}
										]
									},
									{
										xtype: 'container',
										layout: { type: 'vbox'},
										defaults:{
											margin: '0 5 5 0',
											width: 300,
							    			labelAlign: 'right',
					                        labelWidth: 100
										},
										items: [
											{
												xtype: 'combobox',
												fieldLabel: ViewUtil.getLabel('model'),
												reference: 'refCboROROModel',
												editable:false,
												queryMode:'local',
												bind: {
													store: '{roroModelStore}',
													value:'{theShippingNote.modelCd}'
												},
												displayField:'modelNm',
												valueField:'modelCd',
												flex: 1
											},
											{
												xtype: 'numberfield',
						                        reference: 'refROROMt',
						                        flex: 1,
						                        fieldLabel: ViewUtil.getLabel('mt'),
						                        minValue : 0,
						                        maxValue:999999999999999.999,
					                            decimalPrecision: 3,
						                        allowDecimals: true,
												allowNegative: false,
												bind: '{theShippingNote.roroMt}'
											}
										]
									},
									{
										xtype: 'container',
										layout: {
											type: 'vbox'
										},
										defaults:{
											margin: '0 5 5 0',
											width: 300,
							    			labelAlign: 'right',
					                        labelWidth: 100
										},
										items: [
											{
		    									xtype:'container',
		    									padding: '0 0 0 20',
		    									layout:{
		    										type: 'hbox'
		    									},
		    									flex: 1,
		    									items:[
		    										{
									                	xtype: 'checkboxfield',
									                	flex: 1,
									                	boxLabel: ViewUtil.getLabel('newCar'),
									                	value: 'false',
									                	reference: 'refNewCarYn',
														bind:{
															value: '{theShippingNote.newYn}',
														},
														disabled: false
									   				},{
														xtype: 'button',
														text: ViewUtil.getLabel('excelUpload'),
														ui: 'create-button',
														reference:'refExcelUploadForRORODetailBtn',
														listeners:{
															click: 'onRORODetailExcelUpload'
														}
													},{
														xtype: 'button',
														text: ViewUtil.getLabel('sampleUpload'),
														margin: '0 0 0 5',
														ui: 'create-button',
														reference:'refSampleUploadBtn',
														listeners:{
															click: {
																fn: 'onExportExcelSample',																
															}
														}
													}
		    									]
											},
											{
												xtype: 'numberfield',
												flex: 1,
						                        reference: 'refROROCbm',
						                        fieldLabel: ViewUtil.getLabel('cbm'),
						                        minValue : 0,
						                        maxValue:999999999999999.999,
					                            decimalPrecision: 3,
						                        allowDecimals: true,
												allowNegative: false,
												bind: '{theShippingNote.cbm}'
											}
										]
									}
								]
							}												
						]
					}
				]
			},{
				xtype : 'container',
				flex : 1,
				layout : {
					type : 'vbox',
					align : 'stretch'
				},
				items : [
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
			            	items: GridUtil.getGridColumns('roroUnitGridColumns')
						}
					}
				]
			}]
		});
		
		me.callParent();
  	}
});