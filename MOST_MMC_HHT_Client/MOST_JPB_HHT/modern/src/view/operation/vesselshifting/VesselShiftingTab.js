Ext.define('MOST.view.operation.VesselShiftingTab', {
    extend: 'Ext.Panel',
    alias: 'widget.app-shiftg',

    requires: [
        'Ext.tab.Panel',
        'Ext.tab.Tab'
    ],

	layout: 'fit',
	shadow: false,
	padding: 0,
    
    listeners: {
		show: {fn: 'onCheckValidateFormPanel', args: ['ALL_PANELS']}
	},	
    
	items: [{
		xtype: 'formpanel',
		reference: 'vslShiftingShftgDetail',
		padding:0,
		layout: { 
			type: 'vbox',
			align: 'stretch'
		},
		items: [{
			xtype: 'container',
			layout: { 
				type: 'hbox',
				align: 'stretch'
			},	
			items: [{ 
				//col1. cur Whart / Requester / ATU / ATB
				xtype: 'container',
				margin: '5 5 5 5',
				flex: 1,
				layout: {
					type: 'vbox',
					align: 'stretch'
				},
				items:[{
					xtype: 'textfield',
					reference: 'refCurWharftextField',
					bind: '{theVslShiftingShiftg.currWharf}',
					label: { type: 'bundle', key: 'curWharf' },
					labelWidth: 100,
					labelAlign: null,
					labelTextAlign: 'right',
//					placeholder: { type: 'bundle', key: 'curWharf' },
					readOnly: true
				},{
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [{
	    				xtype: 'textfield',
	    				reference: 'refRequesterShiftgTextField',
	    				flex: 1,    	
						bind: '{theVslShiftingShiftg.reqr}',
						required: true,
						label: { type: 'bundle', key: 'reqr' },
						labelWidth: 100,
						labelAlign: null,
						labelTextAlign: 'right',
//						placeholder: { type: 'bundle', key: 'reqr' },
						listeners: {
							focusleave:{
								fn: 'onPartnerFocusleave',
								e:'Requestor'
							}
						},
						triggers: {
							someField: {
								iconCls: 'x-fa fa-search',
								scope: 'controller',
								handler: 'refBtnSearchRequesterVSHHT'
						}
						}
					},
					// {
	                //     xtype: 'button',
					// 	reference: 'refSearchRequesterVSHHT',
					// 	handler:'refBtnSearchRequesterVSHHT',
	                //     //text: 'F1',
					// 	iconCls: 'x-fa fa-search'
					// }
				]
				},{
					xtype: 'datetimelocalfield',
					format:MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
					reference: 'refAtuShiftgTimefield',
					label: 'ATU',
					labelWidth: 100,
					required: false,
					clearable: true,
					placeholder: { type: 'bundle', key: 'atu' },
					inputType: 'datetime-local'
				},{
	                xtype: 'datetimelocalfield',
					format:MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
	                reference: 'refAtbShiftgTimefield',
	                //placeholder: { type: 'bundle', key: 'atb' },
	                label: 'ATB',
	                labelWidth: 100,
	                required: true,
	                clearable: true,
					typeAhead: true,
					inputType: 'datetime-local'
				},
				{
	                xtype: 'datetimelocalfield',
					format:MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
	                reference: 'refAtaShiftgTimefield',
	                //placeholder: { type: 'bundle', key: 'atb' },
	                label: 'ATA',
	                labelWidth: 100,
	                required: true,
	                clearable: true,
					typeAhead: true,
					inputType: 'datetime-local'
				},
			]
			},{
				//Col2. New Wharf / Wharf M.. / Position / Reason  
				xtype: 'container',
				margin: '5 5 5 5',
				flex: 1,
				layout: {
					type: 'vbox',
					align: 'stretch'
				},
				items:[{
					xtype: 'container',				//What is this 4 text fields ????
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					hidden: true,
	    			items: [{
	                    xtype: 'textfield',
	                    flex: 1,
	                    reference: 'refCurrWharfMakrFmTextfield',
	                    bind: '{theVslShiftingShiftg.currWharfMakrFm}',
	                    hidden: true
	                }, {
	                    xtype: 'textfield',
	                    flex: 1,
	                    reference: 'refCurrWharfMakrToTextfield',
	                    bind: '{theVslShiftingShiftg.currWharfMakrTo}',
	                    hidden: true
	                }, {
	                    xtype: 'textfield',
	                    flex: 1,
	                    reference: 'refPrevAtbTextfield',
	                    bind: '{theVslShiftingShiftg.prevAtb}',
	                    hidden: true
	                }, {
	                    xtype: 'textfield',
	                    flex: 1,
	                    reference: 'refPrevAtuTextfield',
	                    bind: '{theVslShiftingShiftg.prevAtu}',
	                    hidden: true    				
	    			}]
				},{
					xtype: 'container',				
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
	    			items: [{
	    				xtype: 'combobox',
	    				reference: 'refNewWharfShiftgcbx',
	    				flex: 2,
	    				label: { type: 'bundle', key: 'newWharf' },
						labelWidth: 100,
						labelAlign: null,
						labelTextAlign: 'right',
//	    				placeholder: { type: 'bundle', key: 'newWharf' },
	    				bind: { 
	    					store: '{berths}' 
	    				},
	    				displayField: 'locNm',
	    				valueField: 'locId',
	    				listeners: {
	    					change: 'onBerthLocationComboChange'
	    				},
	    				editable: false,
	    				clearable: true,
	    				required: true,
	    			}, {
	    				xtype: 'spacer',
	    				width: 3
	    			}, {
	                    xtype: 'numberfield',
	                    flex: 1,
	                    minValue: 0,
	                    maxValue: 999999999,
	                    reference: 'refBerthWharfSField',
	                    readOnly: true
	    			}, {
	    				xtype: 'spacer',
	    				width: 3	                    
	                },{
	                    xtype: 'numberfield',
	                    flex: 1,
	                    minValue: 0,
	                    maxValue: 999999999,
	                    reference: 'refBerthWharfEField',
	                    readOnly: true		
	    			}]
				},{
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [{
	                    xtype: 'numberfield',
	                    flex: 1,
	                    minValue: 0,
	                    maxValue: 999999999,
	                    bind: '{theVslShiftingShiftg.wharfMarkFm}',
	                    reference: 'refWharfMarkStartfield',
	                    label: { type: 'bundle', key: 'wharfMark' },
						labelWidth: 100,
						labelAlign: null,
						labelTextAlign: 'right',
//	                    placeholder: { type: 'bundle', key: 'wharfMark' },
	                    listeners: {
	                        change: 'onNewWharfShftgFocusleave',
	                        focusleave: 'onNewWharfShftgFocusleave'
	                    },
	                    required: true,
	                    clearable: true,
	                    typeAhead: true
	                }, {
	                	xtype: 'container',
	                	layout: {
	                		type: 'hbox',
	                		align: 'middle'
	                	},
	                	items: [{
	                		xtype: 'label',
	                		width: 20,
	                		html: '~',
	                		style: 'font-size: 18px; text-align: center;'
	                	}]
	                }, {
	                    xtype: 'numberfield',
	                    flex: 1,    				
	                    minValue: 0,
	                    maxValue: 999999999,
	                    bind: '{theVslShiftingShiftg.wharfMarkTo}',
	                    reference: 'refWharfMarkEndfield'
					}]
				},{
					xtype: 'combobox',
					reference: 'refShiftgPositionCbx',
					flxe: 1,
					bind: { store: '{shiftPositionListCombo}' },
					displayField: 'scdNm',
					valueField: 'scd',
					label: { type: 'bundle', key: 'position' },
					labelWidth: 100,
					labelAlign: null,
					labelTextAlign: 'right',
//					placeholder: { type: 'bundle', key: 'position' },
					editable: false,
					required: true,
					clearable: true,
					typeAhead: true  
				},{
	                xtype: 'combobox',
	                reference: 'refReasonShiftgCbx',
	                flex: 1,
	                label: { type: 'bundle', key: 'reason' },
					labelWidth: 100,
					labelAlign: null,
					labelTextAlign: 'right',
//	                placeholder: { type: 'bundle', key: 'reason' },
	                bind: { store: '{reasonListCombo}' },
	                displayField: 'scdNm',
	                valueField: 'scd',
	                editable: false,
	                required: true,
	                clearable: true,
	                typeAhead: true
				},{
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [{
	    				xtype: 'checkbox',
	                    reference: 'refPilotShiftingChx',
						margin: '0 0 0 80',
						padding: '0 3 0 0',
	                    width: 20,
	                    placeholder: { type: 'bundle', key: 'pilot' },
	                    checked: false,
						hidden: true
	    			},{
	                    xtype: 'numberfield',
	                    reference: 'refMooringShiftgTextField',
	                    flex: 1,
	                    minValue: 0,
	                    maxValue: 9999,
	                    placeholder: { type: 'bundle', key: 'mooring' },
	                    bind: '{theVslShiftingShiftg.mooring}',
						hidden: true
	    			}, {
	    				xtype: 'spacer',
	    				width: 3	                    	
	                }, {
	                    xtype: 'numberfield',
	                    reference: 'refTugShiftgTextField',
	                    minValue: 0,
	                    maxValue: 9999,
	                    placeholder: { type: 'bundle', key: 'tug' },	//Tug
	                    flex: 1,
	                    bind: '{theVslShiftingShiftg.tug}',
						hidden: true
	                }]
				}]
			}]
		
		}, {
			xtype: 'container',
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [{
				xtype: 'button',
				reference: 'refBtnShiftingRetrieveHHT',
				text: 'Retrieve',
				ui: 'retrieve-button-modern',
				handler: 'onTblRetrieve',
				width: 150,
				flex: 1
            }, {
            	xtype: 'spacer',
            	width: 3                	
					
			},{				
				xtype: 'button',
				reference: 'refBtnClearVslShiftg',
				flex: 1,
				text: { type: 'bundle', key: 'clear' },
				ui: 'clear-button-modern',
				handler: 'onClearVslShiftg',
				width: 150
			}, {
                xtype: 'spacer',
                width: 3					
			},{
				xtype: 'button',
				reference: 'refBtnAddVslShiftg',
				flex: 1,
				text: { type: 'bundle', key: 'add' },
				ui: 'create-button-modern',
				disabled: false,
				handler: 'oncheckAddVslShiftgHHT',
				width: 150
			}, {
                xtype: 'spacer',
                width: 3					
			}, {
				xtype: 'button',
				reference: 'refBtnUpdateVslShiftg',
				flex: 1,
				text: { type: 'bundle', key: 'update' },
				ui: 'update-button-modern',
				handler: 'onCheckUpdateVslShiftgHHT',
				width: 150
			}, {
                xtype: 'spacer',
                width: 3					
			}, {
				xtype: 'button',
				reference: 'refBtnDeleteVslShiftg',
				flex: 1,
				text: { type: 'bundle', key: 'delete' },
				ui: 'delete-button-modern',
				handler: 'onDeleteVslShiftgHHT',
				width: 150
			}]
		},{
			xtype: 'grid',               
			reference: 'refVslShiftingShiftgGrid',
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
				store: '{vslShftList}'
			},
			listeners: {
				select: 'onGridVslShiftgClick'
			},
			selectable:{
				mode: 'single'
			},
			columns: [{
				text: { type: 'bundle', key: 'gridNo' },
				xtype: 'rownumberer',
				width: 50,
				align: 'center'
			}, {
				text: { type: 'bundle', key: 'requester' },
				dataIndex: 'reqr',
				width: 150,
				align: 'center'
			}, {
				text: { type: 'bundle', key: 'newloc' },
				dataIndex: 'nxBerthNo',
				width: 100,
				align: 'center'
			}, {
				text: { type: 'bundle', key: 'prevloc' },
				dataIndex: 'currWharf',
				width: 100,
				align: 'center'
			}, {
				text: { type: 'bundle', key: 'newlocmarkfrm' },
				dataIndex: 'wharfMarkFm',
				width: 100,
				align: 'center'
			}, {
				text: { type: 'bundle', key: 'newlocmarkto' },
				dataIndex: 'wharfMarkTo',
				width: 100,
				align: 'center'
			}, {
				text: { type: 'bundle', key: 'prevlocmarkfrm' },
				dataIndex: 'currWharfMakrFm',
				width: 100,
				align: 'center'
			}, {
				text: { type: 'bundle', key: 'prevlocmarkto' },
				dataIndex: 'currWharfMakrTo',
				width: 100,
				align: 'center'
			}, 
			{
				text: { type: 'bundle', key: 'ata' },
				dataIndex: 'ataDt',
				reference: 'refColAta',
				width: 150,
				align: 'center'
			},
			{
				text: { type: 'bundle', key: 'newatb' },
				dataIndex: 'atbDt',
				reference: 'refColNewAtb',
				width: 150,
				align: 'center'
			}, {
				text: { type: 'bundle', key: 'atw' },
				dataIndex: 'atw',
				width: 100,
				align: 'center'
			}, {
				text: { type: 'bundle', key: 'atc' },
				dataIndex: 'atc',
				width: 100,
				align: 'center'
			}, {
				text: { type: 'bundle', key: 'newatu' },
				dataIndex: 'atuDt',
				width: 150,
				align: 'center',
				reference: 'refColNewAtu'
			}, {
				text: 'Pre ATB',
				dataIndex: 'prevAtb',
				width: 150,
				align: 'center'
			}, {
				text: 'Pre ATU',
				dataIndex: 'prevAtu',
				width: 150,
				align: 'center'
			}, {
				text: { type: 'bundle', key: 'shiftposition' },
				dataIndex: 'berthAlongside',
				width: 200,
				align: 'center',
				reference: 'refColShftPosition'
			}, {
				text: { type: 'bundle', key: 'pilot' },
				dataIndex: 'pilotYn',
				width: 100,
				align: 'center',
				reference: 'refColPilotYn'
			}, {
				text: { type: 'bundle', key: 'mooring' },
				dataIndex: 'mooring',
				width: 100,
				align: 'center'
			}, {
				text: { type: 'bundle', key: 'tug' },
				dataIndex: 'tug',
				width: 100,
				align: 'center'
			}, {
				text: { type: 'bundle', key: 'reason' },
				dataIndex: 'rsnCd',
				width: 200,
				align: 'center',
				reference: 'refColReason'
			}, {
				text: 'vbfbb',
				dataIndex: 'dirtyYn',
				align: 'center',
				hidden: true
			}]
		}]
	}]
});
