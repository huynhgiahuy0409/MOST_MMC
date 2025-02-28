Ext.define("MOST.view.document.DocPackageDetail",{
    extend: 'Ext.form.Panel',
	alias: 'widget.app-docpackagedetail',

    requires:[
  		'MOST.config.Locale'
  	],
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	DETAIL_GRID_REF_NAME: 'refBlSnPkgDetailGrid',				// Main Grid Name 
	DETAIL_GRID_NAME: 'BlSnPkgDetailGrid',						// Main Grid Name

	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	title: 'Package Detail', //ViewUtil.getLabel('packageDetail'),	

	controller: 'docpackagedetail',
	
	viewModel: {
		type: 'docpackagedetail'
	},

	width: 1420,
	height: 500,
	//scrollable: 'y',
	config: {
		recvData : null
	},

	listeners: {
		afterrender: 'onDetailLoad'
	},
  	initComponent: function() {
		var me = this;

		Ext.apply(me, {
			layout: {
				type: 'vbox', 
				align: 'stretch' 
			},
			items: [
				{//Row Grid of Package Detail
					xtype: 'tsb-datagrid',
					margin: '5 5 5 5',
					//height: 350,
					flex: 1,
					reference: me.DETAIL_GRID_REF_NAME,
					//name: me.DETAIL_GRID_NAME,
					usePagingToolbar : false,
					plugins: [
					  'gridexporter',
					  'gridfilters',
					  'clipboard'
					],
					flex : 1,
					plugins : [ 
			            'gridexporter',
			            'gridfilters',
			            'clipboard' 
					],
					selModel : {
						type : 'spreadsheet',
						cellSelect : false
					},
					listeners : {
						cellclick: 'onPkgGridItemClick'
					},
					columns:{
						defaults: {
							style : 'text-align:center'
						},
						items: GridUtil.getGridColumns('DocPackageDetail')
					},
					viewConfig: {
						loadMask: true, 
					},
				}
			],
			dockedItems: 
			[
				{ // Row Buttons: Add Update Remove Clear
					xtype: 'container',
					layout: {
						type: 'hbox', 
						pack: 'end'
					},
					margin: '5 5 5 0',
					defaults:{
						margin: '0 0 0 5',
					},
					items: [
						{
							xtype: 'tbfill'
						},
						{
							xtype: 'button',
							text: ViewUtil.getLabel('clear'),
							width: 80,
							reference:'refBtnClearPackage',
							listeners: {
								click: 'onClearPackage'
							} 
						},
						{
							xtype: 'button',
							text: ViewUtil.getLabel('add'),
							width: 80,
							ui: 'create-button',
							iconCls: 'x-fa fa-plus',
							reference:'refBtnAddPackage',
							listeners:{
								click:'onAddPackage'
							}
						},
						{
							xtype: 'button',
							text: ViewUtil.getLabel('update'),
							width: 80,
							reference:'refBtnUpdatePackage',
							listeners: {
								click: 'onUpdatePackage'
							} 
						},
						{
							xtype: 'button',
							iconCls: 'x-fa fa-minus',
							width: 80,
							ui: 'delete-button',
							text: ViewUtil.getLabel('remove'),
							reference:'refBtnRemovePackage',
							listeners:{
								click:'onRemovePackage'
							},
							disabled: false
						}
					]
				},
				{
					xtype : 'toolbar',
					enableOverflow: false,
					margin : '0 0 0 0',
					defaults: {
						labelAlign: 'right',
					},
					items: [
						{
							xtype: 'fieldset',
							margin : '0 5 5 0',
							padding: '10 5 5 5',
							// title:labelWidth: 110 ViewUtil.getLabel('search'),
							autoScroll: true,
							scrollable: 'x',
							//collapsible:true,
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
										type: 'hbox'
									},
									defaults:{
										margin: '0 5 0 0',
										width: 270,
										labelAlign: 'right',
										labelWidth: 110
									},
									items: [
										{
											xtype: 'textfield',
											width: 250,
											fieldLabel: ViewUtil.getLabel('packageNo'),
											reference: 'refTxtDtlPackageNo',
											//flex: 1,
											bind:{
												value: '{thePgkDetail.pkgNo}'
											},
											allowBlank: false,
											maskRe: /[0-9A-Za-z]/,
											fieldStyle: 'text-transform:uppercase;',
											listeners: {
												change: function(field, newValue, oldValue){
													if(newValue){
														field.setValue(newValue.toUpperCase());
													}
												}
											},
											maxLength: 30,
										},
										{
											xtype: 'textfield',	
											margin: '0 5 0 0',												
											fieldLabel: ViewUtil.getLabel('packageDesc'),
											//flex: 2,
											width: 505,
											reference: 'refPackageDesc',
											bind:{
												value: '{thePgkDetail.pkgDesc}'
											},
											maxLength: 150,
										},
										{
											xtype: 'numberfield',
											minValue: 0,
											//margin: '0 0 0 5',
											maxValue: 9999999999.999,
											decimalPrecision: 3,
											fieldLabel: ViewUtil.getLabel('totalMt'),
											//flex: 1,
											width: 250,
											reference: 'refTotalMt',
											bind:{
												value: '{thePgkDetail.pkgTotalWgt}'
											},
											listeners:{
												change:'onChangePkgTotalWgt'
											},
											hideTrigger: true
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('totalM3'),
											// flex: 1,
											width: 250,
											reference: 'refTotalM3',
											renderer: Ext.util.Format.numberRenderer('0.000'),
											bind:{
												value: '{thePgkDetail.pkgTotalVol}'
											},
											editable: false //System will auto calculate by Total inputted QTY x Measurement M3
										},
									]
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox'
									},
									defaults:{
										margin: '0 5 0 0',
										width: 270,
										labelAlign: 'right',
										labelWidth: 110
									},
									items: [
										{
											xtype: 'numberfield',
											fieldLabel: ViewUtil.getLabel('blGrossWeight'),
											reference: 'refWgt', //refPgkDetailWgt
											bind:{
												value: '{thePgkDetail.eachPkgWgt}'
											},
											//flex: 1,
											width: 250,
											minValue: 0,
											maxValue: 9999999999.999,
											decimalPrecision: 3,
											allowBlank: true,													
											editable: false,
											hideTrigger: true,
											renderer: Ext.util.Format.numberRenderer('0.000')
										},
										{
											xtype: 'numberfield',
											fieldLabel: ViewUtil.getLabel('blMeasurement'),
											reference: 'refMsrmt',
											bind:{
												value: '{thePgkDetail.eachPkgVol}'
											},
											// flex: 1,
											width: 250,
											minValue: 0,
											maxValue: 9999999999.999,
											decimalPrecision: 3,
											listeners:{
												change:'onChangePkgUnitVol'
											},
											hideTrigger: true,
											//readOnly: true,
											//editable: false //System will auto calculate by Length x Width x Height
										},
										{
											xtype: 'numberfield',
											minValue: 0,
											maxValue: 9999999999,
											decimalPrecision: 0,
											fieldLabel: ViewUtil.getLabel('totalQty'),
											// flex: 1,
											width: 250,
											reference: 'refTotalQty',
											bind:{
												value: '{thePgkDetail.pkgUnitQty}'
											},
											listeners:{
												change:'onChangePkgDetailQty'
											},
											hideTrigger: true
										},
										{
											xtype: 'textfield',
											reference: 'refPkgAgentId',
											fieldLabel: ViewUtil.getLabel('agentid'),
											// flex: 1,
											width: 250,
											bind:{
												value: '{thePgkDetail.pkgAgentId}'
											},
											maskRe: /[0-9A-Za-z]/,
											listeners:{
												change: function(field, newValue, oldValue){
													if(newValue){
														field.setValue(newValue.toUpperCase());
													}
												}
											},
											allowBlank: false
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('agentremark'),
											// flex: 1,
											width: 250,
											bind:{
												value: '{thePgkDetail.pkgAgentRmk}'
											},
											maxLength: 150,
											maskRe: /[0-9A-Za-z ]/,
										},
									]
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox'
									},
									defaults:{
										margin: '0 5 0 0',
										width: 270,
										labelAlign: 'right',
										labelWidth: 110
									},
									items: [
										{
											xtype: 'numberfield',
											reference: 'refLength',
											//flex: 1,
											width: 250,
											fieldLabel: ViewUtil.getLabel('length'),
											bind:{
												value: '{thePgkDetail.length}'
											},
											minValue: 0,
											maxValue: 9999999999.999,
											decimalPrecision: 3,
											listeners:{
												change:'onChangeLWH'
											},
											hideTrigger: true
										},
										{
											xtype: 'numberfield',
											reference: 'refWidth',
											//flex: 1,
											width: 250,
											fieldLabel: ViewUtil.getLabel('width'),
											bind:{
												value: '{thePgkDetail.width}'
											},
											minValue: 0,
											maxValue: 9999999999.999,
											decimalPrecision: 3,
											listeners:{
												change:'onChangeLWH'
											},
											hideTrigger: true
										},
										{
											xtype: 'numberfield',
											reference: 'refHeight',
											//flex: 1,
											width: 250,
											fieldLabel: ViewUtil.getLabel('height'),
											bind:{
												value: '{thePgkDetail.height}'
											},
											minValue: 0,
											maxValue: 9999999999.999,
											decimalPrecision: 3,
											listeners:{
												change:'onChangeLWH'
											},
											hideTrigger: true
										},
										{
											xtype: 'textfield',
											reference: 'refPkgRmk',
											//flex: 1,
											width: 250,
											fieldLabel: ViewUtil.getLabel('rmk'),
											bind:{
												value: '{thePgkDetail.pkgRmk}'
											},
											maxLength: 150,
										},												
										{
											xtype:'container',
											layout: {
												type: 'hbox', 
												pack: 'end'
											},
											margin: '0 5 0 0',
											//flex: 1,
											width: 250,
											items:[
												{
													xtype: 'button',
													text: ViewUtil.getLabel('excelUpload'),
													ui: 'create-button',
													reference:'refExcelUploadForPackageDetailBtn',
													listeners:{
														click: 'onPackageDetailExcelUpload'
													},
													disabled: true
												},{
													xtype: 'button',
													text: ViewUtil.getLabel('sampleUpload'),
													margin: '0 0 0 5',
													ui: 'create-button',
													reference:'refSampleUploadBtn',
													listeners:{
														click: {
															fn: 'onExportExcelSamplePackageDetailTab',																
														}
													},
													disabled: true
												}
											]
										}
									]
								}
							]
						}						
					]
				}
			]
		});
		me.callParent();
  	}
});