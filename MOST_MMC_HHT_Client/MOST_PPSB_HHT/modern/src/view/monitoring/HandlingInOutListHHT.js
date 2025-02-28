Ext.define('MOST.view.operation.HandlingInOutListHHT', {
	extend: 'Ext.Panel',
	alias: 'widget.app-handlinginoutlisthht',
	requires: [
		'MOST.view.controller.HandlingInOutListController',
		'MOST.view.controller.HandlingInOutListModel',
		'MOST.view.common.DateTimeLocalField',
	],
	
	controller: 'handlinginoutlist',
	
	viewModel: {
		type: 'handlinginoutlist'
	},

	layout: 'fit',
	shadow: false,
	padding: 0,
	scrollable: true,
	
	listeners: {
		initialize: 'onLoadHHT',
		show: function() {
			var me = this;
			me.getController().onCheckValidateFormPanel('ALL_PANELS');	//check required validation for formpanel at this panel
		}		
	},
	
	reference: 'containers',
	itemId: 'containers',

	items: [{
		xtype: 'formpanel',
		padding: 0,
		layout: 'vbox',
		reference: 'refFormContrainerProcess',
		scrollable: true,
		
		items: [{//WorkDate
			xtype: 'fieldset',
			layout: 'hbox',
			hidden: true,
			items: [
			{
				xtype: 'datetimelocalfield',
				flex: 1,
				reference: 'refWorkDate',
				labelAlign: 'left',
				required: true,
				label: 'Working Date',
				labelWidth:90,
				inputType: 'date',
				format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
				bind: {
					disabled: true,
				},
			}, {
				xtype: 'combobox',
				reference: 'refCboShift',
				bind: {
					store: '{shiftList}'
				},
				flex: 1,
				label: 'Shift',
				labelWidth: 50,
				labelAlign: 'left',
				required: true,
				displayField: 'shftNm',
				valueField: 'shftId',
				queryMode: 'local',
				clearable: true,
				typeAhead: true,
				disabled: true
			}]
		},{//Row 1: detail form
			xtype: 'fieldset',
			layout: 'vbox',
			defaults: {
				margin: '6 0 0 0'
			},
			items: [
				{
					xtype:'container',
					layout:'hbox',
					items:[{
						xtype: 'combobox',
						reference: 'refCboCategory',
						placeholder: 'Category',
						bind:{
							store: '{categoryCombo}',
						//	value: '{theContainerProcess.hatchNo}'
						},
						displayField: 'scdNm',
						valueField: 'scd',
						queryMode: 'local',
						clearable: true,
						required: true,
						typeAhead: true
					},{
						xtype: 'spacer',
						width: 15
					},{
						xtype: 'combobox',
						reference: 'refCboWH',
						bind: {
							store: '{whCombo}',
							//value: '{theContainerProcess.eqNo}'
						},
						flex:1,
						placeholder: 'WH',
						displayField: 'scdNm',
						valueField: 'scd',
						queryMode: 'local',
						clearable: true,
						typeAhead: true,
						required: true
					}]
				},
			    {//Start End Time
					xtype:'container',
					layout:'hbox',
					items:[{
						xtype: 'datetimelocalfield',
						reference: 'refStartTime',
						flex: 1,
						format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),//'d/m/Y H:i',
						bind: {
							//value: '{theContainerProcess.stDt}',
						},
						required: true,
					},{
						xtype: 'spacer',
						width: 15
					},{
						xtype: 'datetimelocalfield',
						reference: 'refEndTime',
						flex:1,
						format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),//'d/m/Y H:i',
						bind: {
							//value: '{theContainerProcess.endDt}',
						},
						required: true,
					}]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items:[{//HandlingIn Radio
                        xtype: 'radiofield',
                        reference: 'refRdHandlingIn',
                        name: 'handlingGroup',
                        value: 'HI',
                        label: {type: 'bundle', key: 'handlingIn'},
                        labelAlign: 'right',
                        labelTextAlign: 'left',
                        checked: true,
                        listeners: {
                            //change: 'rgChange'
                        },
                    },
                    {//HandlingOut Radio
                        xtype: 'radiofield',
                        reference: 'refRdHandlingOut',
                        name: 'handlingGroup',
                        value: 'HO',
                        label: {type: 'bundle', key: 'handlingOut'},
                        labelAlign: 'right',
                        labelTextAlign: 'left',
                        listeners: {
                            //change: 'rgChange'
                        },
                    },]
                }]
		}, 
	
		{//button
			xtype: 'container',
			layout: {
				type: 'hbox',
				align: 'right'
			},
			items:[
			{
				xtype: 'button',
				text: { type: 'bundle', key: 'retrive' },
				handler: 'onSearchHHT',
                ui: 'retrieve-button-modern',
                flex:1
			}]
		},{//GRID
			xtype: 'container',
			layout: 'hbox',
			scrollable: true,
			flex: 1,
			items: [{
				xtype: 'grid',
				reference: 'refHandlingGrid',
				listeners:{
					select: 'onCellClick'
				},
				bind: {
					store: '{handlingList}'
				},
				selectable:{
					columns: false,
					rows: true,
					cells: false,
					mode: 'single',
					headerCheckbox: false,
				},
				columns: [
				{
					text: 'No',
					xtype: 'rownumberer',
					width : 60,
					align : 'center'
                },
                {
                    text: {type: 'bundle', key: 'handlingIOCategory'},
                    dataIndex: 'catgCd',
                    width: 70
                },  {
                    text: {type: 'bundle', key: 'handlingIOInWhDtNo'},
                    dataIndex: 'inWhDtNo',
                    width: 150
                }, {
                    text: {type: 'bundle', key: 'whReconcilBLSN'},
                    dataIndex: 'blSn',
                    width: 150
                },
                {
                    text: {type: 'bundle', key: 'handlingIOCgNo'},
                    dataIndex: 'cgNo',
                    width: 100
                },
                {
                    text: {type: 'bundle', key: 'whReconcilGRNo'},
                    dataIndex: 'grDo',
                    width: 150
                },{
                    text: {type: 'bundle', key: 'sAgent'},
                    reference: 'refEstArrDate',
                    dataIndex: 'shpgAgent',
                    width: 150
                },{
                    text: {type: 'bundle', key: 'fwrAgnt'},
                    dataIndex: 'fwrAgnt',
                    width: 150
                },{
                	text: {type: 'bundle', key: 'cngShp'},
                    dataIndex: 'shpCng',
                    width: 150
                },{
                    text: {type: 'bundle', key: 'handlingIOPkg'},
                    dataIndex: 'pkgTpCd',
                    width: 150
                },{
                    text: {type: 'bundle', key: 'handlingIOWh'},
                    dataIndex: 'currLocId',
                    width: 150
                },{
                    text: {type: 'bundle', key: 'mT'},
                    //reference: 'refFAName',
                    dataIndex: 'wgt',
                    width: 50
                },{
                    text: {type: 'bundle', key: 'm3'},
                    dataIndex: 'msrmt',
                    width: 50
                },{
                    text:{type: 'bundle', key: 'qty'},
                    dataIndex: 'pkgQty',
                    width: 50
                }]
			}]
		}]
	}]
});
