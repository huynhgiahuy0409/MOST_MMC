Ext.define('MOST.view.common.VesselSchedulePicker', {
	extend : 'Ext.Panel',
	alias: 'widget.app-vesselschedulePicker',

	requires: [
       'Ext.MessageBox',
       'Ext.layout.Fit'
    ],
	
    controller: 'vesselinforhht',
	viewModel: {
		type: 'vesselschedule'
	},    
	listeners: {
		initialize: 'onInitialize', //painted //initialize
		painted: 'onPainted',
    },
    reference : 'vesselschedulePicker',
    itemId: 'vesselschedulePicker',    
    
	layout: 'fit',
	shadow: false,
	padding: 5,
    minWidth: CommonConstants.HHT_MIN_WIDTH,
    items: [{
    	xtype: 'formpanel',
    	padding: 0,
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
    	items: [
			{// Row: Radio button Vessel/ Non Vessel
				xtype: 'fieldset',
				hidden: true,
				layout: {
					type: 'hbox',
					align: 'stretch'
				},
				items: [{
					xtype: 'container',
					flex: 1,
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [
					{
						xtype: 'radiofield',
						reference: 'refJpvcRadiofield',
						name: 'VESSEL',	//grouping radio button, to set only one
						value: 'VESSEL',
						label: {type: 'bundle', key: 'vessel'},
						labelWidth: 60,
						labelAlign: 'right',
						labelTextAlign: 'right',
						bind: {
							checked: '{globalVesselCallIdCheck}' 
						},
						width: '100', 
						listeners: {
						}
					},
					{
						xtype: 'spacer',
						width: 3
					},
					{
						xtype: 'button',
						ui: 'retrieve-button-modern',
						width: 40,
						reference: 'refVesselScheduleButton',    			
						text: null,  //'Schedule',
						iconCls: 'x-fa fa-search',
						bind: {
							disabled: '{!globalVesselCallIdCheck}',
						},
					}]
				},
				{
					xtype: 'container',
					flex: 1,
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [{
						xtype: 'radiofield',
						reference: 'refNonJpvcRadiofield',
						name: 'VESSEL',
						value: 'NON-VESSEL',
						label: {type: 'bundle', key: 'non_vessel'},
						width: '130',
						labelWidth: 100,
						labelAlign: 'right',
						labelTextAlign: 'right'
					}]
				}
			]
    	},
		{// Search textbox, button select, storage
			xtype: 'fieldset',
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [{//Toolbar search Vessel:
                xtype: 'toolbar',
                padding: 5,
            	docked: 'top',
            	defaults: {
            		margin: '0 0 5 0',
            	},
            	items: [
	            	{
	            		xtype: 'textfield',
	            		reference: 'refFindScheduleTextField',
	        			labelAlign: 'left',
	        			placeholder: 'Input Vessel Call ID or Name',
	    				listeners:{
	    					change: 'onChangeUpperCase'
	    				},
	    				margin: '5 0 5 0',
	            		//value: '24VS30-US'
	            	},
	            	{
	            		xtype: 'spacer',
	            		width: 10
	            	},
	            	{
	            		xtype: 'button',
	            		reference: 'refSearchButton',
	            		ui: 'action',
	        			text: 'Search',
	        			iconCls: 'x-fa fa-search',
	            		handler: 'onSearchVesselSchedule',
						width: 120
	            	},
	            	{
	            		xtype: 'spacer',
	            		width: 10
	            	},
	            	{
	            		xtype: 'button',
						reference: 'refBtnSelectVessel',
	            		ui: 'action',
	            		text: 'Select',
	            		iconCls: 'x-fa fa-check-square-o',
	            		handler: 'onApplyVesselSchedule',
						width: 120
	            	},
					{
	            		xtype: 'spacer',
	            		width: 10
	            	},
	            	{
	            		xtype: 'button',
						reference: 'refBtnStorageVessel',
						ui: 'retrieve-button-modern',
						iconCls: 'x-fa fa-check-square-o',
	            		text: 'Storage Vessel',
	            		handler: 'onApplyVesselSchedule', //NonVesselCallId(Storage Vessel)
	            	},
					{
	            		xtype: 'spacer',
	            		width: 10
	            	},
					{
						xtype: 'button',
						reference: 'refBtnActiveOpe',
						ui: 'delete-button-modern',
						iconCls: 'x-fa fa-anchor',
						text: 'Activate Operation',
						handler: 'onActivateOperation',
						margin: '0 0 5 0'
					},
	            	{
	            		xtype: 'spacer',
	            		flex: 1,
	            	},
	            	
	            	{
	    	    		xtype: 'button',
						hidden: true,
	    	    		ui: 'action',
	    	    		iconCls: 'x-fa fa-clock-o',
	    	    		reference: 'refBtnChangeWorkingDtShft',
	    				text: 'Change Shift',
	    				handler: 'onOpenChangeShiftDate',
	    					
					}
            	]
        	}]
		},
		{//Panel ChangeShiftDate
        	xtype: 'formpanel',
        	reference: 'refChangeShiftDateGridPanel',
        	layout: {
        		type: 'hbox',
        		align: 'strecth'
        	},
        	hidden: true,
        	border: true,
        	style: 'border-top: 1px solid gray;',
        	items: [{
        		//Toolbar Change Shift Date:
                xtype: 'toolbar',
                padding: 5,
            	docked: 'top',
            	items: [
            		'->'
            	,{
            		xtype: 'datefield',
            		reference: 'refDateChange',
            		dateFormat: 'd-m-Y',
        			labelAlign: 'left',
        			required: true,
        			margin: '5 0 5 0',
            	}, {
            		xtype: 'spacer',
            		width: 3
            	}, {
            		xtype: 'combobox',
            		reference: 'refCboShiftChange',
            		width: 80,
            		displayField: 'shftNm',
                    valueField: 'shftId',
                    required: true,
                    editable: false,
                    clearable: false,
                    queryMode: 'local',
                    margin: '5 0 5 0',
            		bind: {
            			store: '{globalShiftCombo}'
            		},
            	}, {
            		xtype: 'spacer',
            		width: 3
            	}, {
            		xtype: 'button',
            		ui: 'raised',
            		width: 80,
            		text: 'OK',
            		handler: 'onApplyNewShiftDate',
            	},
            	{
					xtype: 'spacer',
					width: 3
				},
            	{
            		xtype: 'button',
            		ui: 'raised',
            		width: 80,
            		text: 'Close',
            		handler: 'onCancelChangeShiftDate',
            	}]
        	
        	}]
    	},
		{// Panel: Search Vessel resutl Grid: 
        	xtype: 'formpanel',
        	reference: 'refVesselScheduleGridPanel',
        	layout: {
        		type: 'hbox',
        		align: 'strecth'
        	},
			hidden: true,
			// bind: {
    		// 	hidden: '{!globalVesselCallIdCheck}'
    		// },
        	height: 350,
        	border: true,
        	style: 'border-top: 1px solid gray;',
        	items: [{//Grid
        		xtype: 'container',
        		layout: 'hbox',
        		flex: 1,
        		scrollable: true,
        		items: [
        		{

            		xtype: 'grid',
            		reference: 'refVesselScheduleGrid',
            		flex: 1,
            		bind: {
            			store: '{VslCallIdPopupStore}'
            		},
            		selectable: {
            			columns: false,
        				rows: true,
        				cells: false,
        				mode: 'single',
        				headerCheckbox: false,
            		},
            		columns: [{
        		        width: 150,
        		        dataIndex: 'vslCallId',
        		        text: 'VslCallId'
        			},{
        			    width: 160,
        			    dataIndex: 'vslNm',
        			    text: 'Vessel Name'
        			},{
        			    width: 120,
        			    dataIndex: 'berthLoc',
        			    text: 'Berth Location'
        			},{
        			    width: 150,
        			    dataIndex: 'atb',
        			    text: 'ATB',
        			    xtype: 'datecolumn',
        			    format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
        			},{
        			    width: 150,
        			    dataIndex: 'atc',
        			    text: 'ATC',
        			    xtype: 'datecolumn',
        			    format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
        			},{
        			    width: 150,
        			    dataIndex: 'atw',
        			    text: 'ATW',
        			    xtype: 'datecolumn',
        			    format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
        			},{
        			    width: 150,
        			    dataIndex: 'atu',
        			    text: 'ATU',
        			    xtype: 'datecolumn',
        			    format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
        			},{
        			    width: 180,
        			    dataIndex: 'eta',
        			    text: 'ETA',
        			    xtype: 'datecolumn',
        			    format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
        			},{
        			    width: 180,
        			    dataIndex: 'etb',
        			    text: 'ETB',
        			    xtype: 'datecolumn',
        			    format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
        			},{
        			    width: 180,
        			    dataIndex: 'etc',
        			    text: 'ETC',
        			    xtype: 'datecolumn',
        			    format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
        			},{
        			    width: 180,
        			    dataIndex: 'etu',
        			    text: 'ETU',
        			    xtype: 'datecolumn',
        			    format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
        			},{
        			    width: 80,
        			    dataIndex: 'loa',
        			    text: 'LOA'
        			},{
        			    width: 120,
        			    dataIndex: 'wharfStart',
        			    text: 'Whart Start'
        			},{
        			    width: 120,
        			    dataIndex: 'wharfEnd',
        			    text: 'Wharft End'
        			},{
        			    width: 160,
        			    dataIndex: 'vslTpNm',
        			    text: 'Vessel Type Name'
        			},{
        			    width: 160,
        			    dataIndex: 'purpCall',
        			    text: 'Purpose of Call'
        			},
        			
        			
        			{
        			    width: 150,
        			    dataIndex: 'etw',
        			    text: '1ETW',
        			    hidden: true,
        			},{
        			    width: 150,
        			    dataIndex: 'etu',
        			    text: '1ETU',
        			    hidden: true
        			},{
        			    width: 120,
        			    dataIndex: 'vslTp',
        			    text: 'Vessel Type',
        			    hidden: true
        			},{
        			    width: 160,
        			    dataIndex: 'purpCallCd',
        			    text: 'Purp of call Code',
        			    hidden: true
        			},{
        			    width: 180,
        			    dataIndex: 'curAtb',
        			    text: 'Cur.ATB',
        			    hidden: true
        			}]
        		}
        		]
        	}]
        	
    	},
		{// Panel Detail Vessel information (read only):
    		xtype: 'formpanel',
    		reference: 'refFrmPanelVesselDetailInfoPicker',
    		bind: {
    			disabled: true,
    			hidden: '{!globalVesselCallIdCheck}'
    		},
    		padding: 0,
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [{
				xtype: 'fieldset',
				flex: 1,
				layout: {
					type: 'vbox',
					align: 'stretch'
				},
				defaults: {
					labelWidth: 50,
					labelAlign: 'left',
					labelTextAlign: 'right',
				},
				items: [{
	            	xtype: 'numberfield',
	                minValue: 0,
	                maxValue: 999,
	                defaultValue: 0,
	                label:'LOA',
	                reference: 'refTxtLoad',
	                bind:{
	                    value: '{theVslSchl.loa}'
	                },
	                clearable: false,
	                readOnly: true
				},{
                    xtype: 'combobox',
                    label: 'Berth',
                    labelWidth: 50,
                    queryMode: 'local',
                    bind: {
                        value: '{globalBerthNo}', //{theVslSchl.berthLoc}',
                        store: '{berthingListCombo}'
                    },
                    listeners: {
                        select: 'onSelectBerth'
                    },
                    typeAhead: true,
                    editable: false,       
                    displayField: 'berthCd',
                    valueField: 'berthCd'
				},{
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					height: 37,
                    items: [{
                    	xtype: 'spacer',
                    	width: 50
                    },{
                        xtype: 'textfield',
                        reference: 'refTxtPsStart',
                        flex: 1,
                        placeholder: 'From',
                        readOnly: true
                    },{
                    	xtype: 'spacer',
                    	width: 3
                    },{
                        xtype: 'textfield',
                        reference: 'refTxtPsEnd',
                        flex: 1,
                        placeholder: 'To',
                        readOnly: true
                    }]
				},{
	                xtype: 'numberfield',
	                reference: 'refWharfMarkFrom',
	                label: 'Wharf Mark Start',
	                labelWidth: 130,
	                ui: 'field-inputcolor',
	                minValue: 0,
	                bind: {
	                    value: '{globalWharfStart}', //{theVslSchl.wharfMarkFrom}'
	                },
	                listeners:{
	                    focusleave: 'wharfMarkFocusOut'
	                }
				},{
	                xtype: 'numberfield',
	                reference: 'refWharfMarkTo',
	                label: 'Wharf Mark End',
	                ui: 'field-inputcolor',
	                labelWidth: 130,
	                minValue: 0,
	                bind: {
	                    value: '{globalWharfEnd}', //'{theVslSchl.wharfMarkTo}'
	                },
	                listeners:{
	                    //focusleave: 'wharfMarkFocusOut'
	                }
				},{
                    xtype: 'datetimelocalfield',
                    reference: 'refWorkDateEQARR',
                    label: 'ETB',
                    inputType: 'datetime-local',
                    format: 'd/m/Y H:i',
                    bind:{
                        value: '{theVslSchl.etb}'
                    },
                    disabled: true,
                    required: false                
				},{
                    xtype: 'datetimelocalfield',
                    reference: 'refDtVslSchEtw',
                    label: 'ETW',
                    inputType: 'datetime-local',
                    format: 'd/m/Y H:i',
                    bind:{
                        value: '{theVslSchl.etw}'
                    },
                    disabled: true,
                    required: false
				},{
                    xtype: 'datetimelocalfield',
                    reference: 'refDtVslSchEtc',
                    label: 'ETC',
                    inputType: 'datetime-local',
                    format: 'd/m/Y H:i',
                    bind:{
                        value: '{theVslSchl.etc}'
                    },
                    disabled: true,
                    required: false
				},{
                    xtype: 'datetimelocalfield',
                    reference: 'refDtVslSchEtu',
                    label: 'ETU',
                    inputType: 'datetime-local',
                    format: 'd/m/Y H:i',
                    bind:{
                        value: '{theVslSchl.etu}'
                    },
                    disabled: true,
                    required: false
				}]
			},{
				xtype: 'fieldset',
				flex: 1,
				layout: {
					type: 'vbox',
					align: 'stretch',
					pack: 'end'
				},
				defaults: {
					labelWidth: 45,
					labelAlign: 'left',
					labelTextAlign: 'right',
				},				
				items: [/*{
					xtype: 'component',
					height: 39
				},*/
				// {
				// 	xtype: 'checkbox',
				// 	reference: 'refChkAtbPilot',
				// 	padding: '0 0 0 0',
				// 	label: 'Berth Pilot',
				// 	width: 230,
				// 	labelWidth: 130,
				// 	labelAlign: 'right',
				// 	labelTextAlign: 'right',
				// 	bind: {
				// 		checked: '{globalArrivalPilotCheck}', //'{theVslSchl.atbPilot == "Y"}'
				// 	}
				// },{
				// 	xtype: 'container',
				// 	layout: {
				// 		type: 'hbox',
				// 		align: 'stretch'
				// 	},
				// 	items: [{
                //         xtype: 'numberfield',
                //         flex: 1,
                //         ui: 'field-inputcolor',
                //         placeholder: 'Mooring',
                //         bind: {
                //             value: '{globalArrivalMooring}'//{theVslSchl.atbMooring}'
                //         }
                //     },{
                //     	xtype: 'spacer',
                //     	width: 3
                //     },{
                //         xtype: 'numberfield',
                //         flex: 1,
                //         ui: 'field-inputcolor',
                //         placeholder: 'Tug',
                //         bind: {
                //             value: '{globalArrivalTug}'//{theVslSchl.atbTug}'
                //         }				
				// 	}]
				// },
				// {
				// 	xtype: 'checkbox',
				// 	reference: 'refChkAtuPilot',
				// 	label: 'Unberth Pilot',
				// 	width: 230,
				// 	labelWidth: 130,
				// 	labelAlign: 'right',
				// 	labelTextAlign: 'right',
				// 	bind: {
				// 		checked: '{globalDeparturePilotCheck}',//'{theVslSchl.atuPilot == "Y"}'
				// 	}
				// },
				// {
				// 	xtype: 'container',
				// 	layout: {
				// 		type: 'hbox',
				// 		align: 'stretch'
				// 	},
				// 	items: [{
                //         xtype: 'numberfield',
                //         flex: 1,
                //         fieldStyle: 'float:left;',
                //         ui: 'field-inputcolor',
                //         placeholder: 'Mooring',
                //         bind: {
                //             value: '{globalDepartureMooring}',//{theVslSchl.atuMooring}'
                //         }
                //     },{
                //     	xtype: 'spacer',
                //     	width: 3
                //     },{
                //         xtype: 'numberfield',
                //         flex: 1,
                //         fieldStyle: 'float:left;',
                //         ui: 'field-inputcolor',
                //         placeholder: 'Tug',
                //         bind: {
                //             value: '{globalDepartureTug}'//{theVslSchl.atuTug}'
                //         }			
				// 	}]					
				// },
				{
                    xtype: 'datetimelocalfield',
                    reference: 'refDtVslSchCurrAtb',
                    label: 'CATB',
                    inputType: 'datetime-local',
                    format: 'd/m/Y H:i',
                    bind:{
                        value: '{theVslSchl.curAtb}'
                    },
                    disabled: true,
                    required: false
				},
				{
                    xtype: 'datetimelocalfield',
                    reference: 'refDtVslSchAtb',
                    label: 'ATB',
                    inputType: 'datetime-local',
                    format: 'd/m/Y H:i',
                    bind:{
                        value: '{globalAtb}', //'{theVslSchl.atb}'
                    },
                    clearable: true,
                    required: false
				},{
                    xtype: 'datetimelocalfield',
                    reference: 'refDtVslSchAtw',
                    label: 'ATW',
                    inputType: 'datetime-local',
                    format: 'd/m/Y H:i',
                    bind:{
                        value: '{theVslSchl.atw}'
                    },
                    disabled: true,
                    required: false					
				},{
                    xtype: 'datetimelocalfield',
                    reference: 'refDtVslSchAtc',
                    label: 'ATC',
                    inputType: 'datetime-local',
                    format: 'd/m/Y H:i',
                    bind:{
                        value: '{theVslSchl.atc}'
                    },
                    disabled: true,
                    required: false
				},{
                    xtype: 'datetimelocalfield',
                    reference: 'refDtVslSchAtu',
                    label: 'ATU',
                    inputType: 'datetime-local',
                    format: 'd/m/Y H:i',
                    bind:{
                        value: '{globalAtu}', //{theVslSchl.atu}'
                    },
                    clearable: true,
                    required: false
				},
				]
			}]
    	}]
    }]
	
});
 