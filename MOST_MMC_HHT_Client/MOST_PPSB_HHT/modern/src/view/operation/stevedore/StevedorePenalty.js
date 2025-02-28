Ext.define('MOST.view.operation.StevedorePenalty', {
	extend: 'Ext.Panel',
	alias: 'widget.app-stevedorePenalty',

	requires: [
		'Ext.data.validator.Presence',
		'Ext.data.validator.Length',
		'Ext.tab.Panel',
        'Ext.tab.Tab'
	],

	layout: 'fit',
	shadow: false,
	padding: 5,

	items: [{
		xtype: 'formpanel',
		padding: 0,
		reference: 'stevedorePenaltyDetail',
		layout: 'vbox',
		items: [{
			xtype: 'fieldset',
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			defaults: {
				margin: '10 0 0 0'
			},
			items:[{//Hatch, Contractor
				xtype: 'container',
				layout: {
					type: 'hbox',
					align: 'stretch'
				},
				items: [{
					xtype: 'combobox',
					reference: 'refHatchField',
					placeholder: { type: 'bundle', key: 'hatch' },
					bind: {store: '{hatchNoCombo}'},
					queryMode: 'local',
					flex: 1,
					displayField: 'scdNm',
					valueField: 'scd',
					editable: false,
					required: true,
					clearable: true
				}, {
					xtype: 'spacer',
					width: 3
				}, {
					xtype: 'textfield',
					reference: 'refContratorField',
					placeholder: { type: 'bundle', key: 'contractor' },
					bind: '{theVesselDelayPenalty.contrator}',
					flex: 1,
					listeners: {
						focusleave:{
							fn: 'onPartnerFocusleave',
							e:'Contractor'
						}
					},
					//required: true,
					clearable: true,
					triggers: {
						someField: {
							iconCls: 'x-fa fa-search',
							scope: 'controller',
							handler: 'onSearchContractorPenaltyHHT'
						}
					}
				}, 
				// {
				// 	xtype: 'button',
				// 	ui: 'Search',
				// 	reference: 'refBtnContratorHHT',
				// 	iconCls: 'x-fa fa-search',
				// 	//	iconCls: 'x-fa fa-check-square-o',
				// 	handler: 'onSearchContractorPenaltyHHT'
				// }
			]
			}, {//Particulars
				xtype: 'combobox',
				reference: 'refParticularField',
				listeners: {
					select: 'changeParticularsEventHHT'
				},
				placeholder: { type: 'bundle', key: 'particulars' },
				flex: 1,
				bind: { 
					store: '{particularsCombo}' 
				},
				queryMode: 'local',
				displayField: 'scdNm',
				valueField: 'scd',
				required: true,
				clearable: true,
				typeAhead: true,
				editable: false
			}, {//Role
				xtype: 'combobox',
				reference: 'refRoleField',
				placeholder: { type: 'bundle', key: 'vesselDelayRole' },
				bind: { store: '{roleCombo}' },
				listeners: {
					select: 'changeRoleEventHHT'
				},
				queryMode: 'local',
				displayField: 'scdNm',
				valueField: 'scd',
				flex: 1,
				required: true,
				clearable: true,
				typeAhead: true,
				editable: false
			}, {//day 
				xtype: 'container',
				layout: {
					type: 'hbox',
					align: 'stretch'
				},
				items: [{
					xtype: 'datetimelocalfield',
					flex: 1,
					format:'d/m/Y H:i',
					reference: 'refpntyTimefield',
					inputType: 'datetime-local'
				},{
					xtype: 'spacer',
					width: 3
				},{
					xtype: 'datetimelocalfield',
					format:'d/m/Y H:i',
					reference: 'refpntyEndTimefield',
					flex: 1,
					inputType: 'datetime-local'
				}]
			}, {//penalty
				xtype: 'container',
				layout: {
					type: 'hbox',
					align: 'stretch'
				},
//				columns: 3,
				items: [{
					xtype: 'textfield',
					flex: 4,
					reference: 'refPenaltyfield',
					placeholder: { type: 'bundle', key: 'vesselDelayPenalty'},
					editable: false,
					clearable: false,
					inputType: 'text'
				}, {
					xtype: 'numberfield',
					reference: 'refunitPrcfield',
					minValue: 0,
					maxValue: 999999999,
					flex: 1,
					margin: '0 0 0 10',
					editable: false,
					clearable: false,
					placeholder: { type: 'bundle', key: 'vesselDelayUnitPrice'},
				}, {
					xtype: 'label',
					html: 'X',
					width: 20,
					style: 'font-size: 15px; text-align: center',
					margin: '10 0 0 0',
				}, {
					xtype: 'numberfield',
					reference: 'refItemQtyfield',
					placeholder: { type: 'bundle', key: 'vesselDelayItemQty'},
					bind: '{theVesselDelayPenalty.itemQty}',
					minValue: 0,
					maxValue: 999999999,
					flex: 2,
					inputType: 'text',
					ui: 'fieldnumberhht',
					listeners: {
						blur: 'itemQtyLostFocus'
					},
					required: true,
					clearable: true,
					typeAhead: true
				}]
			}, {//date
				xtype: 'container',
				layout: {
					type: 'hbox',
					align: 'stretch'
				},
				items: [{
					xtype: 'datefield',
					reference: 'refWorkDateTextfield',
					flex: 1,
//					label: { type: 'bundle', key: 'vesselDelayDate' },
					placeholder: 'Date',
					labelAlign: 'left',
					dateFormat: 'd/m/Y',
					disabled: true
				}, {
					xtype: 'spacer',
					width: 3
				}, {
					xtype: 'numberfield',
					reference: 'refTotalHRSfield',
					flex: 1,
					minValue: 0,
					maxValue: 999999999,
					bind: '{theVesselDelayPenalty.pntyAmt}',
					placeholder: 'Total',
					inputType: 'text',
					editable: false,
					clearable: false
				}]
			}
			]
		}, {//button
			xtype: 'container',
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [{
    			xtype: 'button',
    			reference: 'refBtnStevedoreTmRetrieve',
    			ui: 'retrieve-button-modern',
				text: 'Retrieve',
				flex: 1,
    			handler: 'onClickRetrieveHHT'
    		},{
				xtype: 'spacer',
				width: 3
			},{
				xtype: 'button',
				reference: 'refBtnPenaltyAdd',
				ui: 'create-button-modern',
				flex: 1,
				text: { type: 'bundle', key: 'add' },
				handler: 'onCheckAddHHT'
			},{
				xtype: 'spacer',
				width: 3
			},{
				xtype: 'button',
				reference: 'refBtnPenaltyUpdate',
				ui: 'update-button-modern',
				flex: 1,
				text: { type: 'bundle', key: 'update' },
				handler: 'onUpdatePenatlyHHT'
		},{
				xtype: 'spacer',
				width: 3
			},{
				xtype: 'button',
				reference: 'refBtnPenaltyDelete',
				ui: 'delete-button-modern',
				flex: 1,
				text: { type: 'bundle', key: 'delete' },
				handler: 'onDeleteHHT'
			}]
		}, {//girld
			xtype: 'container',
			layout: 'hbox',
			scrollable: true,
			flex: 1,
			responsiveConfig: {
				 small: {
					 flex: 1
				 },
				 large: {
					 flex: undefined,
					 height: 300
				 }
			},
			items: [{
				xtype: 'grid',
				reference: 'refVesselDelayPenaltyGrid',
				stateful: true,
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
					store: '{vesselDelayPntyList}'
				},
				listeners: {
					select: 'onGridPenaltyClick'
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
					text: { type: 'bundle', key: 'vesselDelayShift' },
					dataIndex: 'shftNm',
					reference: 'refShftNm',
					width: 100,
					readOnly: true
				}, {
					text: { type: 'bundle', key: 'vesselDelayHatchNo' },
					dataIndex: 'hatchNo',
					reference: 'refHatchNoPenalty',
					width: 100,
					readOnly: true
				}, {
					text: { type: 'bundle', key: 'vesselDelayDate' },
					dataIndex: 'pntyDt',
					reference: 'refPntyDt',
					format: 'd/m/Y',
					width: 100,
					readOnly: true
				}, {
					text: { type: 'bundle', key: 'particulars' },
					dataIndex: 'itemCdNm',
					reference: 'refParticulars',
					width: 100,
					readOnly: true
				}, {
					text: { type: 'bundle', key: 'vesselDelayRole' },
					dataIndex: 'roleCdNm',
					reference: 'refVesselDelayRole',
					width: 100
				}, {
					text: { type: 'bundle', key: 'vesselDelayContractorName' },
					dataIndex: 'contrator',
					reference: 'refContractor',
					width: 150
				}, {
					text: { type: 'bundle', key: 'vesselDelayStartTime' },
					dataIndex: 'pntyTime',
					reference: 'refStDt',
					width: 100
				}, {
					text: { type: 'bundle', key: 'vesselDelayEndTime' },
					dataIndex: 'pntyEndTime',
					reference: 'refEndDt',
					width: 100
				}, {
					text: { type: 'bundle', key: 'vesselDelayPenalty' },
					dataIndex: 'pntyDescr',
					reference: 'refVesselDelayPenalty',
					width: 100,
					readOnly: true
				}, {
					text: { type: 'bundle', key: 'vesselDelayItemQty' },
					xtype: 'numbercolumn',
					dataIndex: 'itemQty',
					reference: 'refVesselDelayItemQty',
					width: 100,
					format: '0',
					readOnly: true
				}, {
					text: { type: 'bundle', key: 'vesselDelayTotalHRS' },
					dataIndex: 'pntyAmt',
					reference: 'refTotalHRS',
					width: 100,
					readOnly: true
				}]
			}]	
		}]
	}]
});
