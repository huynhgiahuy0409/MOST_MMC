Ext.define("MOST.view.document.bl.BLCargo",{
    extend: "Ext.form.Panel",
    alias: 'widget.blcargo',
    requires:[
  		'MOST.config.Locale',
  		'TSB.ux.form.field.DateTimePicker',
  		'Ext.grid.plugin.RowEditing'
  	],
	scrollable: 'y',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	CARGO_GRID_REF_NAME: 'refBlCargoGrid',				// Main Grid Name 
	CARGO_STORE_NAME: 'blCargo',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
  	initComponent: function() {
		var me = this;
		
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId: 'blCargoEditor',
			autoCancel: false,
			listeners: {
				cancelEdit: 'onCancelEdit',
				validateedit: 'onValidateEdit',
				edit: 'onEdit' 
			}
		});
		
		Ext.apply(this, {
			items:[{
				layout: { type  : 'vbox', align : 'stretch' },
				items:[{
					xtype: 'fieldset',
					layout: { type  : 'vbox', align : 'stretch' },
					title: 'Cargo Information',
					items:[{
						xtype: 'container',
						layout: 'hbox',
						defaults:{
							margin: '0 5 5 5',
						},
						items: [{
        					xtype:'combo',
        					reference:'ctlDeliveryMode',
        					fieldLabel: ViewUtil.getLabel('deliveryMode'),
        					labelWidth: 120,
        					width:410,
                            editable:false,
                            allowBlank: false,
                            emptyText: 'Select',
                            bind: {
            	    			store: '{delvModeCombo}',
								value: '{theBL.delvTpCd}'
            	    		},
            	    		displayField: 'scdNm',
           					valueField: 'scd',
           					queryMode: 'local'
						}]
					},{
						xtype: 'container',
						layout: 'hbox',
						defaults:{
							margin: '0 5 5 5',
						},
						items: [{
							xtype: 'combobox',
							fieldLabel: ViewUtil.getLabel('cargoTp'),
							reference: 'refCboCargoType',
							editable:false,
							allowBlank: false,
							emptyText: 'Select',
							labelWidth: 120,
                            width:280,
							queryMode:'local',
							bind: {
								store: '{cgType}',
								value:'{theBL.cgTpCd}',
							},
							displayField:'scdNm',
							valueField:'scd',
							listeners:{
								change:'onROROTabSetting'		
							}
						},{
							xtype: 'container',
							layout:{
								type: 'hbox'
							},
							items:[{
								xtype: 'cmmcdfield',
	                            fieldLabel: ViewUtil.getLabel('cmdtGrp'),
	                            reference: 'ctlCommodityGroup',
	                            bind:{
	                            	value : '{theBL.cmdtGrpCd}',
	                            	cgTpCd: '{theBL.cgTpCd}'
	                            },
	                            labelAlign: 'right',
	                            labelWidth: 240,
	                            width: 350,
	                            hidden: true,
	                            allowBlank: false,
								params:{
									searchType: 'CMDT_GRP',
									searchCol1: '',
								},
								listeners:{
									change: 'onChangeCmdtGrp',
								},
							},{
								xtype: 'textfield',
	                            padding: '',
	                            labelAlign: 'right',
	                            margin: '0 0 0 5',
	                            reference: 'ctlCommodityGroupName',
	                            bind: '{theBL.cmdtGrpNm}',
	                            labelWidth: 230,
	                            hidden: true,
	                            editable : false
							}]
						},{
							xtype: 'container',
							layout:{
								type: 'hbox'
							},
							items:[{
								xtype: 'cmmcdfield',
	                            fieldLabel: ViewUtil.getLabel('commodity'),
	                            reference: 'ctlCommodity',
	                            bind:{
									value : '{theBL.cmdtCd}',
									cgTpCd: '{theBL.cgTpCd}',
									cmdtGrpCd: '{theBL.cmdtGrpCd}'
								},
	                            allowBlank: false,
	                            labelAlign: 'right',
	                            labelWidth: 150,
	                            width: 280,
								params:{
	                				searchType: 'CMDT',
									searchCol1: '',
	                			},
							},{
								xtype: 'textfield',
	                            labelAlign: 'right',
	                            margin: '0 10 0 5',
	                            reference: 'ctlCommodityNm',
	                            bind: '{theBL.cmdtNm}',
	                            width: 165,
	                            editable : false,
								listeners:{
									change: 'onChangeCommodityCode',
								}
							},{
								xtype: 'textfield',
								fieldLabel: ViewUtil.getLabel('packageTp'),
								fieldStyle: 'text-transform:uppercase',
								allowBlank: false,
								margin: '0 5 0 5',
								labelWidth: 100,
								width:205,
								readOnly: true,
								reference: 'refPkgTpCd',
								bind: '{theBL.pkgTpCd}'
							},{
								xtype: 'button',
								iconCls: 'x-fa fa-search',
								margin: '0 5 0 5',
								reference:'refBtnPackagePopup',
								listeners:{
									click:'openPackagePopup'		
								}
							},{
								xtype: 'textfield',
								readOnly: true,
								reference: 'refPkgTpNm',
								bind: '{theBL.pkgTpNm}',
								listeners:{
									change: 'onChangePackageType',
								},
							}]
						}]
					},{
						xtype: 'container',
						layout: 'hbox',
						defaults:{
							margin: '0 5 5 5',
						},
						items: [{
							xtype: 'container',
							layout:{
								type: 'hbox'
							},
							items:[
							]
						},{
							xtype: 'textfield',
							fieldLabel: ViewUtil.getLabel('packageNumber'),
							bind: {
								value:'{theBL.pkgNo}'
							},
							labelWidth: 110,
							width: 392,
							hidden: true,
							reference:'refTxtPackageNumber',
							maxLength: 100,
							enforceMaxLength : true
						},{
							xtype: 'container',
							layout:{
								type: 'hbox'
							},
							hidden: true,
							items:[{
								xtype: 'textfield',
								fieldLabel: ViewUtil.getLabel('blHsCode'),
								labelWidth: 162,
								width: 230,
								labelAlign: 'right',
								fieldStyle: 'text-transform:uppercase',
								reference: 'hsCd',
								bind: '{theBL.hsCode}',
								readOnly: true
							},{
								xtype: 'button',
								iconCls: 'x-fa fa-search',
								margin: '0 0 0 5',
								reference:'refBtnHsPopup',
								listeners:{
									click:'openHsPopup'		
								}
							},{
								xtype: 'textfield',
								margin: '0 0 0 5',
								width: 165,
								reference: 'hsNm',
								bind: '{theBL.hsNm}',
								readOnly: true
							}]
						}]
					},{
						xtype: 'container',
						layout: 'hbox',
						defaults:{
							margin: '0 5 5 5',
						},
						items: [{
							xtype: 'container',
							layout:{
								type: 'hbox'
							},
							items:[{
								xtype: 'combobox',
								reference:'refCboGrossWeight',
								editable:false,
								margin: '0 0 0 5',
								bind: {
									store: '{grossWeight}',
									value: '{theBL.wgtUnit}',
									fieldStyle: '{fs}'
								},
								displayField:'scdNm',
								valueField:'scd',
								emptyText: 'Select',
								hidden: true,
							},{
								xtype: 'numberfield',
								fieldLabel: ViewUtil.getLabel('blGrossWeight'),
								bind: {
									value: '{theBL.wgt}'
								},
								allowBlank: false,
								reference:'refTxtWeght',
								labelWidth: 120,
								width: 280,
								minValue: 0,
								maxValue: 999999999999999.999,
								decimalPrecision: 3,
								listeners:{
                                	change: 'onWeightChange'
	        					}
							}]
						},{
							xtype: 'container',
							layout:{
								type: 'hbox'
							},
							items:[{
								xtype: 'numberfield',
								fieldLabel: ViewUtil.getLabel('blMeasurement'),
								bind: {
									value: '{theBL.vol}'
								},
								allowBlank: false,
								reference:'refTxtVol',
								minValue: 0,
								maxValue: 999999999999999.999,
								decimalPrecision: 3,
							    labelWidth: 240,
							    width: 390,
							    labelAlign: 'right',
								listeners:{
                                	change: 'onMeasurementChange'
	        					}
							}]
						},{
							xtype: 'numberfield',
							fieldLabel: ViewUtil.getLabel('cargoLoadingListQuantity'),
							bind: {
								value:'{theBL.pkgQty}',
								fieldStyle: '{fs}'
							},
							reference:'refTxtNoOfPackage',
							minValue: 0,
							maxValue: 99999999,
							decimalPrecision: 0,
							labelWidth: 295,
							width: 450,
							labelAlign: 'right',
							listeners:{
                            	change: 'onNoOfPkgChange'
        					}
						},
						{
							xtype: 'textfield',
							fieldLabel: ViewUtil.getLabel('eachWeight'),
							labelWidth: 120,
							width: 280,
							bind: {
								value: '{theBL.eachWgt}',
							},
							reference:'refEachWeight',
							hidden: true,
							readOnly: true,
						},{
							xtype: 'textfield',
							fieldLabel: ViewUtil.getLabel('eachVolume'),
							bind: {
								value: '{theBL.eachVol}',
							},
							labelWidth: 240,
							width: 390,
							labelAlign: 'right',
							reference:'refEachVolume',
							readOnly: true,
							hidden:true
						},
						{
							xtype: 'textfield',
							fieldLabel: ViewUtil.getLabel('goodsGeneralDescription'),
							bind: '{theBL.custGdsRmk}',
							labelWidth: 100,
							reference:'refTxtCustGdsRmk',
							maxLength: 70,
							hidden: true,
							enforceMaxLength : true,
						}]
					},{
						xtype: 'container',
						layout: 'hbox',
						defaults:{
							margin: '0 5 5 5',
						},
						items: [{
							xtype: 'textfield',
							fieldLabel: ViewUtil.getLabel('freightTon'),
							bind: {
								value: '{theBL.freighTon}',
							},
							reference:'refFreighTon',
							maskRe:/^[0-9]$/,
							maxLength: 10,
							enforceMaxLength : true,
							labelWidth: 295,
							hidden: true,
							width: 450,
							labelAlign: 'right',
						}]
					},{
						xtype: 'container',
						layout: 'hbox',
						defaults:{
							margin: '0 5 5 5',
						},
						items: [{
							xtype: 'numberfield',
							fieldLabel: ViewUtil.getLabel('length'),
							bind: {
								value: '{theBL.cgLength}'
							},
							reference:'refCgLength',
							labelWidth: 120,
							width: 280,
							minValue: 0,
							hidden:true,
							maxValue: 999999999999999.9999,
							decimalPrecision: 3,
						},{
                            xtype: 'numberfield',
							fieldLabel: ViewUtil.getLabel('width'),
							bind: {
								value: '{theBL.cgWidth}'
							},
							reference:'refCgWidth',
							minValue: 0,
							hidden:true,
							maxValue: 999999999999999.9999,
							decimalPrecision: 3,
							labelWidth: 240,
							labelAlign: 'right',
							width: 390
						},{
							xtype: 'numberfield',
							fieldLabel: ViewUtil.getLabel('height'),
							bind: {
								value: '{theBL.cgHeight}',
							},
							reference:'refCgHeight',
							minValue: 0,
							hidden:true,
							maxValue: 999999999999999.9999,
							decimalPrecision: 3,
							labelWidth: 295,
							width: 450,
							labelAlign: 'right',
						}]
					},{
						xtype: 'container',
						layout: 'hbox',
						defaults:{
							margin: '0 5 5 5',
						},
						items: [{
							xtype: 'container',
							layout:{
								type: 'hbox'
							},
							items:[{
								xtype: 'textfield',
								fieldLabel: ViewUtil.getLabel('blImdg'),
								reference: 'refUnnoClass',
								fieldStyle: 'text-transform:uppercase',
								bind: '{theBL.imdgClass}',
								readOnly: true,
								labelWidth: 120,
							    width: 205
							},{
								xtype: 'button',
								iconCls: 'x-fa fa-search',
								reference:'refBtnUnnoPopup',
								listeners:{
									click:'openUnnoPopup'
								}, 
								
								margin: '0 0 0 5'
							},{
								xtype: 'textfield',
								reference: 'refUnno',
								bind: {
									value:'{theBL.unno}',
								},
								enableKeyEvents: true,
								listeners: {
									keydown : 'onKeyDown'
								},
								margin: '0 0 0 5',
							}]
						},{
							xtype: 'textfield',
							fieldLabel: ViewUtil.getLabel('mafiParentId'),
							bind: {
								value: '{theBL.parentId}',
							},
							reference:'refParentId',
							maxLength: 20,
							hidden:true,
							enforceMaxLength : true,
							labelWidth: 109,
							labelAlign: 'right',
							width: 260
						},{
							xtype: 'textfield',
							fieldLabel: ViewUtil.getLabel('parentCmdtGrp'),
							bind: {
								value: '{theBL.parentCgTp}',
							},
							reference:'refParentCgTp',
							maxLength: 10,
							hidden:true,
							enforceMaxLength : true,
							labelWidth: 295,
							width: 450,
							labelAlign: 'right'
						}]
					}]
				},{
					xtype: 'container',
					layout: 'hbox',
					defaults:{
						margin: '0 5 5 5',
					},
					items: [
						{
							xtype: 'fieldset',
							margin: '0 5 0 0',
							title: ViewUtil.getLabel('descOfGoods'),
							items:[{
								xtype: 'textareafield',
								reference:'refTxtGdsRmk',
								bind: {
									value:'{theBL.gdsRmk}',
									readOnly: '{crudRead}'
								},
								width:610,
								maxLength: 350,
								enforceMaxLength : true
							}]
						},{
							xtype: 'fieldset',
							title: ViewUtil.getLabel('marksOnPackages'),
							items:[{
								xtype: 'textareafield',
								reference:'refTxtPgkMark',
								bind: {
									value:'{theBL.pkgMark}',
									readOnly: '{crudRead}',
								},
								maxLength: 350,
                                width:610,
								enforceMaxLength : true
							}]
						}
					]
				},{
					xtype: 'fieldset',
					layout: { type  : 'vbox', align : 'stretch' },
					title: ViewUtil.getLabel('hatchNo'),
					hidden:true,
					items: [{
						xtype: 'container',
					    layout: { type : 'hbox',align: 'stretch'},
					    items: [{
							xtype: 'tsb-datagrid',
							height: 150,
							flex: 1,
							reference: me.CARGO_GRID_REF_NAME,
							usePagingToolbar : false,
							plugins: [
							  rowEditing, 
							  'gridexporter',
							  'gridfilters',
							  'clipboard'
							],
							bind:{
								 store: '{' + me.CARGO_STORE_NAME + '}'
							},
							selModel: {
								type: 'spreadsheet',
								cellSelect: false
							},
							dockedItems:[{
								xtype: 'toolbar',
								items:[{
									xtype: 'tbfill'
								},{
									xtype: 'button',
									text: ViewUtil.getLabel('add'),
									ui: 'create-button',
									iconCls: 'x-fa fa-plus',
									reference:'refBtnAddCargo',
									listeners:{
										click:'onAddCargo'
									}
								},{
									xtype: 'button',
									iconCls: 'x-fa fa-minus',
									ui: 'delete-button',
									text: ViewUtil.getLabel('remove'),
									reference:'refBtnRemoveCargo',
									listeners:{
										click:'onRemoveCargo'
									},
									bind: {
										disabled: '{!isRemoveable}'
									},
									disabled: false
								}]
							}],

							columns:{
								defaults: {
									style : 'text-align:center'
								},
								items: GridUtil.getGridColumns('BLCargo')
							}
						}]
					}]
				}]
			}]
		});
		
		me.callParent();
  	}
});