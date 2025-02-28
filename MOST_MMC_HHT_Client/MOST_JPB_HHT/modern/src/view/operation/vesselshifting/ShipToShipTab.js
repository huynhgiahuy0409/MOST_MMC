Ext.define('MOST.view.operation.ShipToShipTab', {
	extend: 'Ext.Panel',
	alias: 'widget.app-sts',
	
	requires: [
		'Ext.tab.Panel',
		'Ext.tab.Tab'
	],
	
	layout: 'fit',
	shadow: false,
	padding: 0,

	items: [{
		xtype: 'formpanel',
		reference: 'refFrmDetail',
		padding: 0,
		layout: { 
			type: 'vbox',
			align: 'stretch'
		},
		items:[{
			//Detail
			xtype: 'container',
			layout: { 
				type: 'hbox',
				align: 'stretch'
			},
			items:[{
				//Detail Left Column
				xtype: 'fieldset',
				flex: 3,
				layout: {
					type: 'vbox',
					align: 'stretch'
				},
				items:[
				{
					xtype: 'container',
					layout: { 
						type: 'hbox',
						align: 'stretch'
					},
					items: [
						{
							xtype: 'vslcallidfieldhht',
							reference: 'refTxtNextJpvc',
							bind: {
								value:'{theTblSTS.nextCalCallId}'
							},
							required: true,
							placeholder: null,
							label: {type:'bundle', key:'nextjpvc'},
							labelWidth: 100,
							labelAlign: null,						
							listeners: {
								change: 'abc'
							},
							flex: 1
						},
						{
							xtype: 'spacer',
							width: 3
						},
						{
							xtype: 'combobox',
							reference: 'refBlSNCombo',
							required: true,
							bind: {
								store: '{blSnCombo}',
							},
							listeners:{
								change:'onTblSelectBlSn'
							},
							displayField: 'blNoSnNo',
							valueField: 'blNoSnNo',
							queryMode: 'local',
							clearable: true,
							typeAhead: true,
							label: 'BL/SN No',
							labelWidth: 70,
							labelAlign: null,
							labelTextAlign: 'right',
							flex: 1,
							anyMatch: true,
							disabled: true
						}
					]
				},{
					xtype: 'combobox',
					reference: 'refCboOpeMode',
					required: true,
					placeholder:'OPR Mode',
					bind: {
						store: '{oprModeCombo}',
						//value:'{theTblSTS.stsOpTp}'
					},
					listeners:{
						change:'onTblSelectOpeMode'
					},
					displayField: 'scdNm',
					valueField: 'scd',
					queryMode: 'local',
					clearable: true,
					typeAhead: true,
					editable: false,
					label: 'OPR Mode',
					labelWidth: 100,
					labelAlign: null,
					labelTextAlign: 'right',
					placeholder: null,
				},{
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [{
						xtype: 'combobox',
						reference: 'refCboHatch',
						flex:1,
						required: true,
						label: 'Hatch',
						labelWidth: 100,
						labelAlign: null,
						labelTextAlign: 'right',
//						placeholder: 'Hatch',
						displayField: 'scdNm',
						valueField: 'scd',
						queryMode: 'local',
						bind: {
							store: '{hatchListCombo}',
							value:'{theTblSTS.hatchNo}'
						},
						listeners: {
							//change : 'onCheckStvRadioField'
						},
						editable: false
					},{
						xtype: 'spacer',
						width: 3
					},{
						xtype: 'combobox',
						reference: 'refCboAPHatch',
						flex: 1,
						label: 'AP/FP',
						labelWidth: 50,
						labelAlign: null,
						labelTextAlign: 'center',
//						placeholder: 'AP/FP',
						displayField: 'scd', //'scdNm',
						valueField: 'scd',
						queryMode: 'local',
						bind: {
							store: '{apFpListCombo}',
							value:'{theTblSTS.hatchDrtCd}'
						},
						listeners: {
							//change : ''
						},
						editable: false
					}]
				},{
					xtype: 'combobox',
					reference: 'refCboCgTP',
					required: true,
					label: 'Cargo Type',
					labelWidth: 100,
					labelAlign: null,
					labelTextAlign: 'right',
//					placeholder: 'Cargo Type',
					bind: {
						//value: '{theTblSTS.cgTpCd}',
						store: '{cgTpAllListCombo}'
					},
					listeners:{
						change: 'onTblSelectCargoType'
					},
					displayField: 'scdNm',
					valueField: 'scd',
					queryMode: 'local',
					editable: false,
					// disabled: true
				},{
					xtype: 'combobox',
					reference: 'refCboCmdtCd',
					required: true,
					bind: {
						value: '{theTblSTS.cmdtCd}',
						store: '{cmdtCdAllListCombo}'
					},
					label: 'Commodity',
					labelWidth: 100,
					labelAlign: null,
					labelTextAlign: 'right',
//					placeholder: 'Commodity',
					displayField: 'scdNm',
					valueField: 'scd',
					queryMode: 'local',
					editable: false,
					disabled: true
				},{
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [{
						xtype: 'textfield',
						reference: 'refTxtPkgTpSTS',
						flex: 1,
						bind: {
							value: '{theTblSTS.pkgTpCd}',
						},
						label: 'Package Type',
						labelWidth: 100,
						labelAlign: null,
						labelTextAlign: 'right',
//						placeholder: 'Pkg Type',
						editable: false,
						// triggers: {
						// 	someField: {
						// 		iconCls: 'x-fa fa-search',
						// 		scope: 'controller',
						// 		handler: 'onSearchPkgTpSTSHHT'
						// 	}
						// },
						disabled: true
					},
					// {
					// 	xtype: 'button',
					// 	reference: 'refBtnPkgTpSTSSearch',
					// 	ui: 'normal',
					// 	iconCls: 'x-fa fa-search',
					// 	handler: 'onSearchPkgTpSTSHHT'
					// }
				]
				}]
			},{
				//Detail Right Column
				xtype: 'fieldset',
				flex: 4,
				layout: {
					type: 'vbox',
					align: 'stretch'
				},
				items:[{
					//Title Col:
					xtype:'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					defaults: {
						margin: '15 0 8 0'
					},
					items:[{
						xtype: 'spacer',
						width: 70
					},{
						xtype:'label',
						html:'MT',
						flex: 1
					},{
						xtype: 'spacer',
						width: 3
					},{
						xtype:'label',
						html:'M3',
						flex: 1
					},{
						xtype: 'spacer',
						width: 3
					},{
						xtype:'label',
						html:'Qty',
						flex: 1
					}]
				},{//Doc
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [{
						xtype:'label',
						html:'D.',
						width: 70,
						style: 'text-align: right; margin: auto 0; padding-right: 12px'
					},{
						xtype: 'numberfield',
						flex: 1,
						minValue : 0,
						maxValue: 9999999,
						textAlign: 'right',
						bind: '{theTblSTS.docMt}',
						reference: 'refTxtDocMt', //MT                              
						editable: false,
						value: 0
					},{
						xtype: 'spacer',
						width: 3
					},{
						xtype: 'numberfield',
						flex: 1,
						minValue : 0,
						maxValue: 9999999,
						textAlign: 'right',
						reference: 'refTxtDocM3', //M3
						bind: '{theTblSTS.docM3}',
						editable: false,
						value: 0
					},{
						xtype: 'spacer',
						width: 3
					},{
						xtype: 'numberfield',
						flex: 1,
						minValue : 0,
						maxValue: 9999999,
						textAlign: 'right',
						reference: 'refTxtDocQty', //Qty
						bind: '{theTblSTS.docQty}',
						editable: false,
						value: 0
					}]
				},{//Bal
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [{
						xtype:'label',
						html:'B.',
						width: 70,
						labelTextAlign: 'right',
						style: 'text-align: right; margin: auto 0; padding-right: 12px'
					},{
						xtype: 'numberfield',
						flex: 1,
						minValue : 0,
						maxValue: 9999999,
						textAlign: 'right',
						reference: 'refTxtBalMt', //MT
						bind: '{theTblSTS.balMt}',
						editable: false,
						value: 0
					},{
						xtype: 'spacer',
						width: 3
					},{
						xtype: 'numberfield',
						flex: 1,
						minValue : 0,
						maxValue: 9999999,
						textAlign: 'right',
						reference: 'refTxtBalM3', //M3
						bind: '{theTblSTS.balM3}',
						editable: false,
						value: 0
					},{
						xtype: 'spacer',
						width: 3
					},{
						xtype: 'numberfield',
						flex: 1,
						minValue : 0,
						maxValue: 9999999,
						textAlign: 'right',
						reference: 'refTxtBalQty', //Qty
						bind: '{theTblSTS.balQty}',
						editable: false,
						value: 0
					}]
				},{//Actual
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [{
						xtype:'label',
						html:'A.',
						width: 70,
						labelTextAlign: 'right',
						style: 'text-align: right; margin: auto 0; padding-right: 12px'
					},{
						xtype: 'numberfield',
						flex: 1,
						minValue : 0.1,
						maxValue: 9999999,
						textAlign: 'right',
						labelTextAlign: 'right',
						bind: '{theTblSTS.mt}',
						reference: 'refTxtActMt', //MT
						ui: 'field-inputcolor',
						listeners: {
							change: 'onActAmtChange',
						},
						required: true
					},{
						xtype: 'spacer',
						width: 3						
					},{
						xtype: 'numberfield',
						flex: 1,
						minValue : 0.1,
						maxValue: 9999999,
						textAlign: 'right',
						reference: 'refTxtActM3', //M3
						bind: '{theTblSTS.m3}',
						listeners: {
							change: 'onActAm3Change'
						},
						ui: 'field-inputcolor',
						required: true
					},{
						xtype: 'spacer',
						width: 3
					},{
						xtype: 'numberfield',
						flex: 1,
						minValue : 1,
						maxValue: 9999999,
						textAlign: 'right',
						reference: 'refTxtActQty',//Qty
						bind: '{theTblSTS.qty}',
						listeners: {
							change: 'onActAQtyChange'
						},
						ui: 'field-inputcolor',
						required: true
					}]
				},{
//					xtype: 'datetimefield',
//					bind: { value: '{theTblSTS.stDt}' },
//					reference: 'refDtStDtSTS',
//					labelWidht: 70,
//					label: 'StartTime',
//					require: true
//				},{
//					xtype: 'datetimefield',
//					bind: { value: '{theTblSTS.endDt}' },
//					reference: 'refDtEndDtSTS',
//					labelWidht: 70,
//					label: 'EndTime',
//					require: true
//				},{
					xtype: 'datetimelocalfield',
					//bind: { value: '{theTblSTS.stDt}' },
					reference: 'refDtStDtSTS',
					required: true,
					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
					label: 'StartTime',
					labelWidth: 70
				},{
					xtype: 'datetimelocalfield',
					//bind: { value: '{theTblSTS.endDt}' },
					reference: 'refDtEndDtSTS',
					required: true,
					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
					label: 'EndTime',
					labelWidth: 70
				}]
			}]
		},{
			//button
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
				reference: 'refBtnSTSClear',
				flex: 1,
				text: 'Clear',
				ui: 'clear-button-modern',
				handler: 'onTblClearSTS',
				width: 150
			}, {
                xtype: 'spacer',
                width: 3
			}, {
				xtype: 'button',
				reference: 'refBtnSTSAdd',
				flex: 1,
				text: 'Add',
				ui: 'create-button-modern',
				handler: 'onTblAddSTS',
				width: 150
			}, {
                xtype: 'spacer',
                width: 3
			},{
				xtype: 'button',
				reference: 'refBtnSTSUpdate',
				flex: 1,
				text: 'Update',
				ui: 'update-button-modern',
				handler: 'onTblUpdateSTS',
				width: 150
			}, {
                xtype: 'spacer',
                width: 3
			}, {
				xtype: 'button',
				reference: 'refBtnSTSDelete',
				flex: 1,
				text: 'Delete',
				ui: 'delete-button-modern',
				handler: 'onTblDeleteSTS',
				width: 150
			}]
		},{
			//Grid
			xtype: 'grid',
			reference: 'refGridTblSTS',
		    responsiveConfig: {
		        small: {
		        	flex: 1
		        },
		        large: {
		        	flex: 1,
		        	height: 200
		        }
		    },
			selectable: {
				columns: false,
				//checkbox: true,
				//checkboxSelect: true,
				rows: true,
				cells: false,
				mode: 'single',
				deselectable: true,
				headerCheckbox: false
			},
			bind: {
				store: '{stsOperationList}'
			},
			listeners: {
				select: 'onTblSelectSTSGrid'
			},
			columns: [{
				xtype: 'rownumberer',
				text: 'No',
				width: 50,
				readOnly: true,
			},{
				text: {type:'bundle', key:'nextjpvc'},
				dataIndex: 'nextCalCallId',
				reference:'refColNextJpvc',
				width: 210,
				align:'center'				  
			},{
				text:{type:'bundle', key:'oprmode'},
				dataIndex: 'stsOpTp',
				width: 150,
				align:'center',
				reference:'refColOprMode'			
			},{
				text:{type:'bundle', key:'cargoTpCd'},
				dataIndex: 'cgTpCd',
				width: 150,
				align:'center',
				reference:'refColCgTp'				  
			},{
				text:{type:'bundle', key:'cargoTpNm'},
				dataIndex: 'cgTpNm',
				width: 170,
				align:'center',
				reference:'refColCgTpNm'				   
			},{
				text:{type:'bundle', key:'hatch'},
				dataIndex: 'hatchNo',
				width: 100,
				align:'center'				
			},{
				text:{type:'bundle', key:'apFp'},
				dataIndex: 'hatchDrtCd',
				width: 100,
				align:'center'					
			},{
				text:{type:'bundle', key:'cmd'},
				dataIndex: 'cmdtCd',
				filter : 'string',
				reference:'refColCmdtCd',
				width: 100,
				align:'center'
			},{
				text:{type:'bundle', key:'pkg'},
				dataIndex: 'pkgTpCd',
				width: 150,
				align:'center'				 
			},{
				text:{type:'bundle', key:'docMt'},
				dataIndex: 'docMt',
				width: 100,
				align:'center',
				reference:'refColDocMt'					
			},{
				text:{type:'bundle', key:'docM3'},
				dataIndex: 'docM3',
				width: 100,
				align:'center',
				reference:'refColDocM3'				  
			},{
				text:{type:'bundle', key:'docQty'},
				dataIndex: 'docQty',
				width: 100,
				align:'center',
				reference:'refColDocQty'				 
			},{
				text:{type:'bundle', key:'actMt'},
				dataIndex: 'mt',
				width: 100,
				align:'center'				  
			},{
				text:{type:'bundle', key:'actM3'},
				dataIndex: 'm3',
				width: 100,
				align:'center'				   
			},{
				text:{type:'bundle', key:'actQty'},
				dataIndex: 'qty',
				width: 100,
				align:'center'
			},{
				text:{type:'bundle', key:'balmt'},
				dataIndex: 'balMt',
				width: 100,
				align:'center',
				reference:'refColBalMt'
			},{
				text:{type:'bundle', key:'balm3'},
				dataIndex: 'balM3',
				width: 100,
				align:'center',
				reference:'refColBalM3'
			},{
				text:{type:'bundle', key:'balqty'},
				dataIndex: 'balQty',
				width: 100,
				align:'center',
				reference:'refColBalQty'
			},{
				text:{type:'bundle', key:'startTime'},
				dataIndex: 'stDt',
				width: 150,
				align:'center',
				reference:'refColStsStartTime'
			},{
				text:{type:'bundle', key:'endTime'},
				dataIndex: 'endDt',
				width: 150,
				align:'center',
				reference:'refColStsEndTime'
			}]
		}]
	}]
});
