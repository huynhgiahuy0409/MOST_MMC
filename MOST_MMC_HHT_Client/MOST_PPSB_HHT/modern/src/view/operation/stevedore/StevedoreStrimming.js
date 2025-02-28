Ext.define('MOST.view.operation.StevedoreStrimming', {
	extend: 'Ext.Panel',
	alias: 'widget.app-stevedoreStrimming',

	requires: [
		'Ext.data.validator.Presence',
		'Ext.data.validator.Length',
		'Ext.tab.Panel',
		'Ext.tab.Tab',
		'Ext.scroll.Scroller'
	],

	reference: 'stevedoreStrimming',
	itemId: 'stevedoreStrimming',

	layout: 'fit',
	shadow: false,
	padding: 0,

	items: [{
		xtype: 'formpanel',
		reference: 'stevedoreTrimmingDetail',
		padding: 0,
		bind: {
			disabled: '{!globalVesselCallId}'
		},
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		items: [{// Break Bulk ------------------------------
			xtype: 'formpanel',
			reference: 'refbreakBulkField',
			hidden: true,
			layout: 'vbox',
			items: [{
				xtype: 'label',
				html: 'Break Bulk',
				flex: 1,
				//				margin:  '9 0 0 0',
				style: {
					'font-size': '15px',
					'font-weight': 'bold'
				}
			}, {
				xtype: 'container',
				layout: {
					type: 'hbox',
					align: 'stretch'
				},
				items: [{
					xtype: 'radiofield',
					reference: 'refStevedoreRdo',
					name: 'stvRdoGroup',
					value: 'stevedore',
					label: { type: 'bundle', key: 'stevedore' },
					labelAlign: 'right',
					labelTextAlign: 'left',
					listeners: {
						change: 'onCheckStvRadioField'
					},
					labelWidth: 80,
					checked: true
				}, {
					xtype: 'textfield',
					flex: 1,
					reference: 'refFindStvBbTextField',
					allowBlank: false,
					bind: '{theStevedoreTrimmingBb.workComp}',
					required: true,
					clearable: true,
					labelAlign: 'left',
					listeners: {
						focusleave: {
							fn: 'onFieldFocusleaveHHT',
						},
						// focusenter: {
						// 	fn: 'onFieldFocusleaveHHT',
						// }
					},
					params: {
						viewType: 'MG',
						searchPtyDivCd: 'STV'
					},
					triggers: {
						someField:{
							iconCls: 'x-fa fa-search',
							scope: 'controller',
							handler: 'onSearchSteveDoreBbHHT'
						},
					},
				}, 
				// {
				// 	reference: 'refBtnSearchStvBb',
				// 	xtype: 'button',
				// 	ui: 'Search',
				// 	iconCls: 'x-fa fa-search',
				// 	//	iconCls: 'x-fa fa-check-square-o',
				// 	handler: 'onSearchSteveDoreBbHHT'
				// }
			]
			}, {
				// xtype: 'fieldset',
				xtype: 'container',
				reference: 'refBb3field',
				layout: {
					type: 'hbox',
					align: 'stretch'
				},
				// flex: 3,
				items: [{
					xtype: 'numberfield',
					minValue: 0,
					maxValue: 9999,
					reference: 'refSupervisorTextField',
					labelTextAlign: 'left',
					labelAlign: 'top',
					label: { type: 'bundle', key: 'supervisor' },
					bind: '{theStevedoreTrimmingBb.spr}',
					flex: 1,
					listeners: {
						focus: 'IsZero'
					},
					ui: 'field-inputcolor',
				}, {
					xtype: 'spacer',
					width: 3
				}, {
					xtype: 'numberfield',
					minValue: 0,
					maxValue: 9999,
					reference: 'refWinchmenTextField',
					bind: '{theStevedoreTrimmingBb.winch}',
					labelTextAlign: 'left',
					labelAlign: 'top',
					label: { type: 'bundle', key: 'winchMen' },
					flex: 1,
					listeners: {
						focus: 'IsZero'
					},
					ui: 'field-inputcolor',
					emptyText: 'Supervisor',
				}, {
					xtype: 'spacer',
					width: 3
				}, {
					xtype: 'numberfield',
					minValue: 0,
					maxValue: 9999,
					reference: 'refGeneralBbTextField',
					bind: '{theStevedoreTrimmingBb.general}',
					labelTextAlign: 'left',
					labelAlign: 'top',
					label: { type: 'bundle', key: 'generalWorkers'},
					flex: 1,
					listeners: {
						focus: 'IsZero'
					},
					ui: 'field-inputcolor'
				}]
			}, {// Row Ship's Crew/ With Gears
				xtype: 'container',
				layout: {
					type: 'hbox',
					align: 'strecth'
				},
				items: [{
					xtype: 'radiofield',
					label: { type: 'bundle', key: 'shipCrew' },
					reference: 'refShipsCreBbRdo',
					name: 'stvRdoGroup',
					value: 'shipscreBb',
					labelAlign: 'right',
					labelTextAlign: 'left',
					listeners: {
						change: 'onCheckStvRadioField'
					},
					labelWidth: 80
				}, {
					xtype: 'checkbox',
					reference: 'refsWithGrearsCbx',
					label: { type: 'bundle', key: 'stevedoreTrimmingWithGears' },
					labelAlign: 'right',
					labelTextAlign: 'left',
					checked: false,
					labelWidth: 80
				}]
			}, {
				//Row: Lashing stv/ N.O.Gang 
				xtype: 'container',
				reference: 'refStvLashingField',
				layout: {
					type: 'hbox',
					align: 'strecth'
				},
				items: [{
					xtype: 'checkbox',
					reference: 'refLashingCbx',
					label: { type: 'bundle', key: 'stevedoreTrimmingLashingStv' },
					labelAlign: 'right',
					labelTextAlign: 'left',
					listeners: {
						change: 'onLashingStvStrimChecked',
					},
					labelWidth: 80,
				}, {
					xtype: 'textfield',
					reference: 'refLashingStvTextsField',
					bind: '{theStevedoreTrimmingBb.lashingCompCd}',
					width: 70,
					required: true,
					clearable: true,
					flex: 1,
					listeners: {
						 focusleave: 'onFieldFocusleaveHHT',
						//  focusenter: {
						// 	fn: 'onFieldFocusleaveHHT',
						// }
					},
					params: {
						viewType: 'MG',
						searchPtyDivCd: 'STV'
					},
					triggers: {
						someField:{
							iconCls: 'x-fa fa-search',
							scope: 'controller',
							handler: 'onBtnSearchStvLashing'
						},
					},
					disabled: false
				}, 
				// {
				// 	xtype: 'button',
				// 	ui: 'Search',
				// 	reference: 'refBtnlashingStv',
				// 	iconCls: 'x-fa fa-search',
				// 	handler: 'onBtnSearchStvLashing',
				// 	disabled: true,
				// },
				{
					xtype: 'numberfield',
					minValue: 0,
					maxValue: 9999,
					reference: 'refNOGangTextField',
					label: { type: 'bundle', key: 'stevedoreTrimmingNOGang' },
					labelAlign: 'left',
					labelTextAlign: 'right',
					labelWidth: 80,
					//placeholder: {type: 'bundle', key: 'stevedoreTrimmingNOGang'},
					bind: '{theStevedoreTrimmingBb.lashingGangNos}',
					ui: 'field-inputcolor',
					listeners: {
						focus: 'IsZero'
					},
					flex: 1,
					disabled: false,
				}
					/*{
						xtype: 'fieldset',
						reference: 'refLashingField',
						layout: 'hbox',
						items: [{
							xtype: 'numberfield',
							minValue : 0,
							maxValue: 9999,
							reference: 'refNOGangTextField',
							//label: {type: 'bundle', key: 'stevedoreTrimmingNOGang'},
							placeholder: {type: 'bundle', key: 'stevedoreTrimmingNOGang'},
							bind: '{theStevedoreTrimmingBb.lashingGangNos}',
							labelAlign: 'left'
						}]
					}*/
				]
			}]//lashing stv

		}, {// Dry Bulk --------------------------------------
			xtype: 'formpanel',
			reference: 'refdrybulkField',
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
				hidden: true,
			items: [{
				xtype: 'label',
				html: 'Dry Bulk',
				flex: 1,
				style: {
					'font-size': '15px',
					'font-weight': 'bold'
				}
			},
			{
				xtype: 'container',
				layout: {
					type: 'hbox',
				},
				items: [{
					xtype: 'radiofield',
					label: { type: 'bundle', key: 'shipCrew' },
					reference: 'refShipsCreDbRdo',
					name: 'stvRdoGroup',
					value: 'shipscreDb',
					text: 'Y',
					labelAlign: 'right',
					labelTextAlign: 'left',
					listeners: {
						change: 'onCheckStvRadioField',
						//selectionchange: 'onSelectionChange'
					},
					labelWidth: 80
				}, {
					xtype: 'radiofield',
					reference: 'refTrimmingRdo',
					label: { type: 'bundle', key: 'trimming' },
					value: 'trimming',
					name: 'stvRdoGroup',
					labelAlign: 'right',
					labelTextAlign: 'left',
					listeners: {
						change: 'onCheckStvRadioField'
					},
					labelWidth: 80
				}, {
					xtype: 'textfield',
					reference: 'refTrimmingTextField',
					allowBlank: false,
					bind: '{theStevedoreTrimmingDb.workComp}',
					required: true,
					labelAlign: 'left',
					flex: 1,
					listeners: {
						focusleave: {
							fn: 'onFieldFocusleaveHHT'
						},
						focusenter: {
							fn: 'onFieldFocusleaveHHT',
						}
					},
					params: {
						viewType: 'MG',
						searchPtyDivCd: 'TRM'
					},
					triggers: {
						someField:{
							iconCls: 'x-fa fa-search',
							scope: 'controller',
							handler: 'onSearchTrimmingDbHHT'
						},
					},
				}, 
				// {
				// 	xtype: 'button',
				// 	ui: 'Search',
				// 	reference: 'refBtnSearchStevedoreDb',
				// 	iconCls: 'x-fa fa-search',
				// 	handler: 'onSearchTrimmingDbHHT',

				// }
			]
			}, {
				xtype: 'fieldset',
				margin: 0,
				padding: 0,
				layout: {
					type: 'hbox',
				},
				reference: 'refDb5Field',
				//flex:3,
				items: [{
					xtype: 'numberfield',
					minValue: 0,
					maxValue: 9999,
					reference: 'refSvisorTrimmingTextField',
					bind: '{theStevedoreTrimmingDb.spr}',
					label: { type: 'bundle', key: 'stevedoreTrimmingSvisor' },
					labelAlign: 'top',
					labelTextAlign: 'left',
					ui: 'field-inputcolor',
					flex: 1,
				}, {
					xtype: 'spacer',
					width: 3
				}, {
					xtype: 'numberfield',
					minValue: 0,
					maxValue: 9999,
					reference: 'refSignalTextField',
					bind: '{theStevedoreTrimmingDb.signal}',
					label: { type: 'bundle', key: 'stevedoreTrimmingSignal' },
					labelAlign: 'top',
					labelTextAlign: 'left',
					ui: 'field-inputcolor',
					flex: 1,
				}, {
					xtype: 'spacer',
					width: 3
				}, {
					xtype: 'numberfield',
					minValue: 0,
					maxValue: 9999,
					reference: 'refDeckTextField',
					bind: '{theStevedoreTrimmingDb.deck}',
					label: { type: 'bundle', key: 'stevedoreTrimmingDeck' },
					labelAlign: 'top',
					labelTextAlign: 'left',
					ui: 'field-inputcolor',
					flex: 1,
				}, {
					xtype: 'spacer',
					width: 3
				}, {
					xtype: 'numberfield',
					minValue: 0,
					maxValue: 9999,
					reference: 'refHopperTextField',
					bind: '{theStevedoreTrimmingDb.hoper}',
					label: { type: 'bundle', key: 'stevedoreTrimmingHoper' },
					labelAlign: 'top',
					labelTextAlign: 'left',
					ui: 'field-inputcolor',
					flex: 1,
				}, {
					xtype: 'spacer',
					width: 3
				}, {
					xtype: 'numberfield',
					minValue: 0,
					maxValue: 9999,
					reference: 'refgeneralDbTextField',
					bind: '{theStevedoreTrimmingDb.general}',
					label: { type: 'bundle', key: 'stevedoreTrimmingGeneral' },
					labelAlign: 'top',
					labelTextAlign: 'left',
					ui: 'field-inputcolor',
					flex: 1
				}]
			}]//drybulk

		}, { // Additional Supervisor
			xtype: 'formpanel',
			reference: 'refCtnAdditional',
			hidden: true,
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [{
				xtype: 'label',
				html: 'Additional',
				style: {
					'font-size': '15px',
					'font-weight': 'bold'
				}
			}, {//Row: Additional Supervisor
				xtype: 'container',
				layout: {
					type: 'hbox',
				},
				items: [{
					xtype: 'numberfield',
					minValue: 0,
					maxValue: 9999,
					reference: 'refSupervisornearNonTTextField',
					bind: '{theAdditional.supervisor}',
					label: { type: 'bundle', key: 'supervisor' },
					placeholder: { type: 'bundle', key: 'supervisor' },
					labelAlign: 'top',
					labelTextAlign: 'left',
					ui: 'field-inputcolor',
					flex: 1,
					listeners: {
						focus: 'IsZero'
					},
				}, {
					xtype: 'spacer',
					width: 3
				}, {
					xtype: 'numberfield',
					minValue: 0,
					maxValue: 9999,
					reference: 'refNonTonnageTextField',
					bind: '{theAdditional.nonworker}',
					labelAlign: 'top',
					labelTextAlign: 'left',
					label: { type: 'bundle', key: 'stevedoreTrimmingNTonnage' },
					ui: 'field-inputcolor',
					flex: 1,
					listeners: {
						focus: 'IsZero'
					},
				}]
			}]
		}, {
			xtype: 'container',
			layout: {
				type: 'hbox',
			},
			items: [{
				xtype: 'button',
				reference: 'refBtnHatchEqRetrieve',
				flex: 1,
				text: 'Retrieve',
				ui: 'retrieve-button-modern',
				handler: 'onClickRetrieveHHT',
			}, {
				xtype: 'spacer',
				width: 3
			}, {
				xtype: 'button',
				reference: 'refBtnUpdate',
				flex: 1,
				ui: 'update-button-modern',
				text: 'Update',
				handler: 'onUpdateHHT'
			}]
		}, {
			xtype: 'grid',
			reference: 'refStevedoreTrimmingGrid',
			responsiveConfig: {
				small: {
					flex: 1
				},
				large: {
					flex: 1,
					minHeight: 300,					
				}
			},
			bind: {
				store: '{stevedoreTrimmingList}'
			},
			selectable: {
				columns: false,
				rows: true,
				cells: false,
				mode: 'single',
				headerCheckbox: false,
			},
			listeners: {
				childsingletap: 'onCellClick'
			},
			columns: [{
				text: { type: 'bundle', key: 'gridNo' },
				xtype: 'rownumberer',
				width: 50,
				align: 'center'
			}, {
				text: { type: 'bundle', key: 'stevedoreTrimmingCgTpCd' },
				dataIndex: 'cgTpCd',
				reference: 'refCgTpCd',
				width: 120,
				readOnly: true
			}, {
				text: { type: 'bundle', key: 'stevedoreTrimmingWorkYmd' },
				dataIndex: 'workYmd',
				reference: 'refWorkYmd',
				width: 100,
				xtype: 'datecolumn',
				format: MOST.config.Locale.getShortDate(),
				readOnly: true
			}, {
				text: { type: 'bundle', key: 'stevedoreTrimmingShftNm' },
				dataIndex: 'shftId',
				reference: 'refShftId',
				hidden:true,
				width: 100,
			}, {
				text: { type: 'bundle', key: 'stevedoreTrimmingShftNm' },
				dataIndex: 'shftNm',
				reference: 'refShftNm',
				width: 100,
			}, {
				text: { type: 'bundle', key: 'stevedoreTrimmingHatchNo' },
				dataIndex: 'hatchNo',
				reference: 'refHatchNo',
				width: 100,
				readOnly: true
			}, {
				text: { type: 'bundle', key: 'stevedoreTrimmingShipCrewWorkComp' },
				dataIndex: 'shipsCrewYn',
				reference: 'refShipCrewWorkComp',
				width: 100
			}, {
				text: { type: 'bundle', key: 'stevedoreTrimmingWorkComp' },
				dataIndex: 'workComp',
				reference: 'refWorkComp',
				width: 100
			}, {
				text: { type: 'bundle', key: 'stevedoreTrimmingWithGears' },
				dataIndex: 'withGears',
				reference: 'refWithGears',
				width: 100
			}, {
				text: { type: 'bundle', key: 'stevedoreTrimmingHatchDrtCd' },
				dataIndex: 'hatchDrtCd',
				reference: 'refHatchDrtCd',
				width: 100,
				readOnly: true
			}, {
				text: { type: 'bundle', key: 'stevedoreTrimmingSpr' },
				xtype: 'numbercolumn',
				dataIndex: 'spr',
				width: 100,
				align: 'right',
				format: '0,000'
			}, {
				text: { type: 'bundle', key: 'stevedoreTrimmingWinch' },
				xtype: 'numbercolumn',
				dataIndex: 'winch',
				width: 100,
				align: 'right',
				format: '0,000'
			}, {
				text: { type: 'bundle', key: 'stevedoreTrimmingSignal' },
				xtype: 'numbercolumn',
				dataIndex: 'signal',
				width: 100,
				align: 'right',
				format: '0,000',
				filter: 'string'
			}, {
				text: { type: 'bundle', key: 'stevedoreTrimmingDeck' },
				xtype: 'numbercolumn',
				dataIndex: 'deck',
				width: 100,
				align: 'right',
				format: '0,000',
				filter: 'string'
			}, {
				text: { type: 'bundle', key: 'stevedoreTrimmingHoper' },
				xtype: 'numbercolumn',
				dataIndex: 'hoper',
				width: 100,
				align: 'right',
				format: '0,000',
				filter: 'string'
			}, {
				text: { type: 'bundle', key: 'stevedoreTrimmingGeneral' },
				xtype: 'numbercolumn',
				dataIndex: 'general',
				width: 100,
				align: 'right',
				format: '0,000',
				filter: 'string'
			}, {
				text: { type: 'bundle', key: 'stevedoreTrimmingSupervisor' },
				xtype: 'numbercolumn',
				dataIndex: 'supervisor',
				width: 100,
				align: 'right',
				format: '0,000',
				filter: 'string'
			}, {
				text: { type: 'bundle', key: 'stevedoreTrimmingNonworker' },
				xtype: 'numbercolumn',
				dataIndex: 'nonworker',
				width: 100,
				align: 'right',
				format: '0,000',
				filter: 'string'
			}, {
				text: { type: 'bundle', key: 'stevedoreTrimmingLashingCompCd' },
				dataIndex: 'lashingCompCd',
				reference: 'refLashingCompCd',
				width: 100
			}, {
				text: { type: 'bundle', key: 'stevedoreTrimmingLashingGangNos' },
				xtype: 'numbercolumn',
				dataIndex: 'lashingGangNos',
				width: 100,
				align: 'right',
				format: '0,000',
				filter: 'string'
			}]
		}]
	}]
});
