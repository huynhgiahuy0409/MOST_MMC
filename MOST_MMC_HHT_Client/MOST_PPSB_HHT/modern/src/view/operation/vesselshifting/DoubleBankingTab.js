Ext.define('MOST.view.operation.DoubleBankingTab', {
	extend: 'Ext.Panel',
	alias: 'widget.app-dbbanking',

	requires: [
		'Ext.tab.Panel',
		'Ext.tab.Tab',
	],
	
	layout: 'fit',
	shadow: false,
	padding: 0,

    listeners: {
		show: {fn: 'onCheckValidateFormPanel', args: ['ALL_PANELS']}
	},	
	
	items: [{
		xtype: 'formpanel',
		reference: 'refFrmDBbanking',
		padding: 0,
		// bind: {
		// 	disabled: '{!globalJpvcCheck}' ,
		// },		
		layout: { 
			type: 'vbox',
			align: 'stretch'
		},
		items: [{
			xtype: 'fieldset',
			padding: '8 0 8 0',
			layout: { 
				type: 'hbox',
				align: 'stretch'
			},			
			items: [{
				xtype: 'combobox',
				reference:'refCboDBbankingTypeTbl',
				flex: 1,
				bind: {
					store: '{bankingTypeCombo}',
					value: '{theDBbanking.dblBnkDivCd}'
				},
//				placeholder: {type:'bundle', key:'bankingtptbl'},
				label: {type:'bundle', key:'bankingtptbl'},
				labelWidth: 90,
				labelAlign: null,
				required: true,
				queryMode: 'local',
				displayField: 'scdNm',
				valueField: 'scd',
				forceSelection : true,
				allowBlank: false,
				listeners:{
					select: 'onTblCbxBankingTpChange'
				}
			},
			{
				xtype: 'spacer',
				width: 2,
			},  
			{
				xtype: 'spacer',
				flex: 1
			},
			{
				xtype: 'spacer',
				width: 2,
			}
			,{
				xtype: 'spacer',
				flex: 1
			}]
		},{
			xtype: 'container',
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [{
				xtype: 'container',
				margin: '0 0 0 3',
				flex:1,
				layout: {
					type: 'vbox',
					align: 'stretch'
				},
				items: [{
					xtype: 'label',
					html: {type:'bundle', key:'2ndvsl'},
					style: 'font-size: 16px; font-weight: bold; padding-left: 90px'
				},{
					xtype:'vslcallidfieldhht',
					reference: 'refTxtJpvcDB',
//					placeholder: {type:'bundle', key:'2ndvslcallid'},
					placeholder: null,
					label: {type:'bundle', key:'2ndvslcallid'},
					labelWidth: 90,
					labelTextAlign: 'right',
					labelAlign: null,					
					bind:{
						value:'{theDBbanking.dblBnkShip1}',
					},
					listeners:{
						change: function(field, newValue){
							field.setValue(newValue.toUpperCase());
						}
					}
					// triggers: {
					// 	someField: {
					// 		iconCls: 'x-fa fa-search',
					// 		scope: 'controller',
					// 		handler: 'onTblClickDBJPVC2nd'
					// 	}
					// }
				},{
					xtype: 'textfield',
					inputType:'number',
					maxLength: 4,
					reference: 'refTxtLOA',
					label: {type:'bundle', key:'loa1Tbl'},
					labelWidth: 90,
					labelAlign: null,
					labelTextAlign: 'right',
//					placeholder: {type:'bundle', key:'loa1Tbl'},
					bind:{
						value:'{theDBbanking.ship1Loa}'
					}
                },{
                    xtype: 'datetimelocalfield',
                    placeholder: {type:'bundle', key:'atb1Tbl'},
                    required: false,
                    bind: {
                    	value:'{theDBbanking.ship1Atb}',
					},
                    reference: 'refTxtATB',
                    format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                    clearable: true,
                    label: 'ATB',
                    labelWidth: 90,
        			labelTextAlign: 'right',
                },{
                	xtype: 'datetimelocalfield',
                	placeholder: {type:'bundle', key:'atw1Tbl'},
                	required: false,
                	bind: {
                    	value:'{theDBbanking.ship1Atw}',
					},
                	reference: 'refTxtATW',
                	format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                	clearable: true,
                	label: 'ATW',
                    labelWidth: 90,
        			labelTextAlign: 'right',
                },{
                	xtype: 'datetimelocalfield',
                	placeholder: {type:'bundle', key:'atc1Tbl'},
                	required: false,
                	bind: {
                    	value:'{theDBbanking.ship1Atc}',
					},
                	reference: 'refTxtATC',
                	format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                	clearable: true,
                	label: 'ATC',
                    labelWidth: 90,
        			labelTextAlign: 'right',
                },{
                	xtype: 'datetimelocalfield',
                	placeholder: {type:'bundle', key:'atu1Tbl'},
                	required: false,
                	bind: {
                    	value:'{theDBbanking.ship1Atu}',
					},
                	reference: 'refTxtATU',
                	format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                	clearable: true,
                	label: 'ATU',
                    labelWidth: 90,
        			labelTextAlign: 'right',
                }
                ]
			},{
				xtype: 'spacer',
				width: 2,
			},{// 3RD VESSEL
				xtype: 'container',
				margin: '0 3 0 5',
				flex :1,
				layout: {
					type: 'vbox',
					align: 'stretch'
				},
				items: [{
					xtype: 'label',
					html: {type:'bundle', key:'3rdvsl'},
					style: 'font-size: 16px; font-weight: bold; padding-left: 90px'
				},{
					xtype:'vslcallidfieldhht',
//					placeholder: {type:'bundle', key:'3rdvslcallid'},
					placeholder: null,
					label: {type:'bundle', key:'3rdvslcallid'},
					labelWidth: 90,
					labelAlign: null,				
					reference: 'refTxt3rdJpvcDB',
					bind:{
						value: '{theDBbanking.dblBnkShip2}',
					}
					/*triggers: {
						someField: {
							iconCls: 'x-fa fa-search',
							scope: 'controller',
							handler: 'onTblClickDBJPVC3rd'
						}
					}*/
				},{
					xtype: 'textfield',
					reference: 'refTxt3rdLOA',
					inputType: 'number',
					maxLength: 4,
					label: {type:'bundle', key:'loa2Tbl'},
					labelWidth: 90,
					labelAlign: null,
					labelTextAlign: 'right',
					bind:{
						value: '{theDBbanking.ship2Loa}'
					},
//					placeholder: {type:'bundle', key:'loa2Tbl'},
				},{
					xtype: 'datetimelocalfield',
                    required: false,
					// bind: {
                    // 	value: '{theDBbanking.ship2Atb}',
					// },
					reference: 'refTxt3rdATB',
					clearable: true,
                	format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                	label: 'ATB',
                    labelWidth: 90,
					disabled: false,
        			// labelTextAlign: 'right',
				},{
					xtype: 'datetimelocalfield',
					placeholder: {type:'bundle', key:'atw2Tbl'},
                    required: false,
					bind: {
                    	value: '{theDBbanking.ship2Atw}',
					},
					reference: 'refTxt3rdATW',
                	format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                	clearable: true,
                	label: 'ATW',
                    labelWidth: 90,
        			labelTextAlign: 'right',
				},{
					xtype: 'datetimelocalfield',
					placeholder: {type:'bundle', key:'atc2Tbl'},
                    required: false,
					bind: {
                    	value: '{theDBbanking.ship2Atc}',
					},
					reference: 'refTxt3rdATC',
                	format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                	clearable: true,
                	label: 'ATC',
                    labelWidth: 90,
        			labelTextAlign: 'right',
				},{
					xtype: 'datetimelocalfield',
					placeholder: {type:'bundle', key:'atu2Tbl'},
                    required: false,
					bind: {
                    	value: '{theDBbanking.ship2Atu}',
					},
					reference: 'refTxt3rdATU',
                	format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                	clearable: true,
                	label: 'ATU',
                    labelWidth: 90,
        			labelTextAlign: 'right',
				}
				]
			},{
				xtype: 'spacer',
				width: 2,
			},{// 4TH VESSEL
				xtype: 'container',
				margin: '0 3 0 5',
				flex :1,
				layout: {
					type: 'vbox',
					align: 'stretch'
				},
				items: [{
					xtype: 'label',
					html: {type:'bundle', key:'4thvsl'},
					style: 'font-size: 16px; font-weight: bold; padding-left: 90px'
				},{
					xtype:'vslcallidfieldhht',
//					placeholder: {type:'bundle', key:'4thvslcallid'},
					placeholder: null,
					label: {type:'bundle', key:'4thvslcallid'},
					labelWidth: 90,
					labelAlign: null,
					reference: 'refTxt4thJpvcDB',
					bind:{
						value: '{theDBbanking.dblBnkShip3}',
					}
					/*triggers: {
						someField: {
							iconCls: 'x-fa fa-search',
							scope: 'controller',
							handler: 'onTblClickDBJPVC3rd'
						}
					}*/
				},{
					xtype: 'textfield',
					reference: 'refTxt4thLOA',
					inputType: 'number',
					maxLength: 4,
					label: {type:'bundle', key:'loa3Tbl'},
					labelWidth: 90,
					labelAlign: null,
					labelTextAlign: 'right',
					bind:{
						value: '{theDBbanking.ship3Loa}'
					},
//					placeholder: {type:'bundle', key:'loa3Tbl'},
				},{
					xtype: 'datetimelocalfield',
					placeholder: {type:'bundle', key:'atb3Tbl'},
                    required: false,
					bind: {
                    	value: '{theDBbanking.ship3Atb}',
					},
					reference: 'refTxt4thATB',
                	format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                	clearable: true,
                	label: 'ATB',
                    labelWidth: 90,
        			labelTextAlign: 'right',
				},{
					xtype: 'datetimelocalfield',
					placeholder: {type:'bundle', key:'atw3Tbl'},
                    required: false,
					bind: {
                    	value: '{theDBbanking.ship3Atw}',
					},
					reference: 'refTxt4thATW',
                	format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                	clearable: true,
                	label: 'ATW',
                    labelWidth: 90,
        			labelTextAlign: 'right',
				},{
					xtype: 'datetimelocalfield',
					placeholder: {type:'bundle', key:'atc3Tbl'},
                    required: false,
					bind: {
                    	value: '{theDBbanking.ship3Atc}',
					},
					reference: 'refTxt4thATC',
                	format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                	clearable: true,
                	label: 'ATC',
                    labelWidth: 90,
        			labelTextAlign: 'right',
				},{
					xtype: 'datetimelocalfield',
					placeholder: {type:'bundle', key:'atu3Tbl'},
                    required: false,
					bind: {
                    	value: '{theDBbanking.ship3Atu}',
					},
					reference: 'refTxt4thATU',
                	format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                	clearable: true,
                	label: 'ATU',
                    labelWidth: 90,
        			labelTextAlign: 'right',
				}
				]
			}]
		}, {//button
			xtype: 'container',
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [{
				xtype: 'button',
				reference: 'refBtnVslShiftingRetrieveHHT',
				text: 'Retrieve',
				ui: 'retrieve-button-modern',
				handler: 'onTblRetrieve',
				width: 150,
				flex: 1,
            }, {
            	xtype: 'spacer',
            	width: 3                	
					
			},{
				xtype: 'button',
				reference: 'refBtnDBClear',
				flex: 1,
				text: 'Clear',
				ui: 'clear-button-modern',
				handler: 'onTblClearDBbanking',
				width: 150
			}, {
                xtype: 'spacer',
                width: 3
			}, {
				xtype: 'button',
				reference: 'refBtnDBAdd',
				flex: 1,
				text: 'Add',
				ui: 'create-button-modern',
				handler: 'onTblAddDBbanking',
				width: 150
			}, {
                xtype: 'spacer',
                width: 3
			},{
				xtype: 'button',
				reference: 'refBtnDBUpdate',
				flex: 1,
				text: 'Update',
				ui: 'update-button-modern',
				handler: 'onTblUpdateDBbanking',
				width: 150
			}, {
                xtype: 'spacer',
                width: 3
			}, {
				xtype: 'button',
				reference: 'refBtnDBDelete',
				flex: 1,
				text: 'Delete',
				ui: 'delete-button-modern',
				handler: 'onTblDeleteDBbanking',
				width: 150
			}]
		}, {
			xtype: 'grid',	
			reference: 'refsGridDbBanking',
		    responsiveConfig: {
		        small: {
		        	flex: 1
		        },
		        large: {
		        	flex: undefined,
		        	height: 200
		        }
		    },
			bind: {
				store: '{doubleBankingList}'
			},
			listeners: {
			 	select: 'onDobuleBankingGridClick',
			 	childsingletap: 'onTblSglTabDbbkGrid'
			},
			selectable: {
				columns: false,
				//checkbox: true,
				//checkboxSelect: true,
				rows: true,
				cells: false,
				mode: 'single',
				headerCheckbox: false,
			},
			columns: [
			{
				xtype: 'rownumberer',
				text: 'No',
				width: 50,
				readOnly: true,
			},{
				text :{type:'bundle', key:'type'},
				reference: 'refTypeGrid',
				dataIndex: 'dblBnkDivCd',
				width: 70,
				align:'center',
				queryMode: 'local',
				displayField: 'scdNm',
				valueField: 'scd',
				forceSelection : true,
				allowBlank: false,
            },{
                text : {type:'bundle', key:'startTime'},
                dataIndex: 'stDt',
                width: 100,
                align:'center',
                hidden:true
            },{
               text :{type:'bundle', key:'endTime'},
                dataIndex: 'endDt',
                width: 100,
                align:'center',
                hidden:true
            },{
              //  header: me.2ndJpvc,
              text :{type:'bundle', key:'2ndjpvc'},
                dataIndex: 'dblBnkShip1',
                width: 210,
                align:'center',
                //reference:'refCol2ndJpvc',
                //renderer:'onTxt2ndJpvcRender'
            },{
              //  header: me.lbl2ndLoa,
              text :  {type:'bundle', key:'2ndloa'},
              dataIndex: 'ship1Loa',
                width: 100,
                align:'center',
                //reference:'refCol2ndLoa',
            },{
                //header: me.lbl2ndAtb,
                text :{type:'bundle', key:'2ndatb'},
                dataIndex: 'ship1Atb',
                width: 150,
                align:'center',
                reference:'refCol1ndAtb',
                //renderer:'onDateTimeColRenderer'
            },{
               // header: me.lbl2ndAtw,
               text : {type:'bundle', key:'2ndatw'},
               dataIndex: 'ship1Atw',        						
                width: 150,
                align:'center',
                reference:'refCol1ndAtw',
                //renderer:'onDateTimeColRenderer'
            },{
               // header: me.lbl2ndAtc,
				text : {type:'bundle', key:'2ndatc'},
				dataIndex: 'ship1Atc',
				width: 150,
				align:'center',
				reference:'refCol1ndAtc',
                //renderer:'onDateTimeColRenderer'
            },{
               // header: me.lbl2ndAtu,
               text : {type:'bundle', key:'2ndatu'},
               dataIndex: 'ship1Atu',
                width: 150,
                align:'center',
                reference:'refCol1ndAtu',
                //renderer:'onDateTimeColRenderer'
            },{
               // header: me.lbl3ndJpvc,
               text : {type:'bundle', key:'3ndjpvc'},
               dataIndex: 'dblBnkShip2',        						
                width: 210,
                align:'center',
                //reference:'refCol2ndJpvc'
            },{
                //header: me.lbl3ndLoa,
                text :{type:'bundle', key:'3ndloa'},
                dataIndex: 'ship2Loa',        						
                width: 100,
                align:'center',
                //reference:'refCol2ndLoa',

            },{
               // header: me.lbl3ndAtb,
               text : {type:'bundle', key:'3ndatb'},
               dataIndex: 'ship2Atb',
                width: 150,
                align:'center',
                reference:'refCol2ndAtb',
                //renderer:'onDateTimeColRenderer'
            },{
             //   header: me.lbl3ndAtw,
             text :  {type:'bundle', key:'3ndatw'},
             dataIndex: 'ship2Atw',
                width: 150,
                align:'center',
                reference:'refCol2ndAtw',
                //renderer:'onDateTimeColRenderer'
            },{
               // header: me.lbl3ndAtc,
               text : {type:'bundle', key:'3ndatc'},
               dataIndex: 'ship2Atc',
                width: 150,
                align:'center',
                reference:'refCol2ndAtc',
                //renderer:'onDateTimeColRenderer'
            },{
             //   header: me.lbl3ndAtu,
             text :  {type:'bundle', key:'3ndatu'},
             dataIndex: 'ship2Atu',
                filter : 'string',
                width: 150,
                align:'center',
                reference:'refCol2ndAtu',
                //renderer:'onDateTimeColRenderer'
            }]
	    }]
	}]
});
