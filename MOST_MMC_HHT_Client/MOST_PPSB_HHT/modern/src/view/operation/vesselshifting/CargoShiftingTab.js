Ext.define('MOST.view.operation.CargoShiftingTab', {
    extend: 'Ext.Panel',
    alias: 'widget.app-CgShif',

    requires: [
        'Ext.tab.Panel',
        'Ext.tab.Tab'
    ],
    
	layout: 'fit',
	shadow: false,
	padding: 0,
    
    items: [{
        xtype: 'formpanel',
        reference: 'vslCgShiftDetail',
        padding: 0,
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
            items: [{//col1. hatch / shifting T... / Next Health / Shift amount
	            xtype: 'fieldset',
	            flex: 1,
	            layout: {
	                type: 'vbox',
	                align: 'stretch'
	            },
	            items: [
				{
					xtype: 'combobox',
					reference: 'refSNCgShiftComboBox',
					bind: { 
						store: '{snCombo}',
						value:'{theVslCgShiftHHT.sn}'
					},
					queryMode: 'local',
					displayField: 'sn',
					valueField: 'sn',
					label: 'SN',
					labelWidth: 90,
					labelAlign: null,
					labelTextAlign: 'right',
//					placeholder: 'SN',
					//required: true,
					//editable: false,
					//clearable: true,
					//typeAhead: true,
					forceSelection: true,
					listeners: {
					    select: 'onSelectSnNoHHT'
				    }
				},
	            {//combox hatch
	                xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
                    items: [{
                        xtype: 'combobox',
                        reference: 'refHatchsVslCgShiftcbx',
                        flex: 1,
                        bind: { store: '{hatchListCombo}' },
                        displayField: 'scdNm',
                        valueField: 'scd',
                        label: { type: 'bundle', key: 'hatch' },
    					labelWidth: 90,
    					labelAlign: null,
    					labelTextAlign: 'right',
//                      placeholder: { type: 'bundle', key: 'hatch' },
                        required: true,
                        editable: false,
                        queryMode: 'local'
                    }, {
	    				xtype: 'spacer',
	    				width: 3	
                    }, {
                        xtype: 'combobox',
                        flex: 1,
                        reference: 'refAPFPVslCgShiftcbx',
                        bind: { store: '{apFpListCombo}' },
                        label: 'AP/FP',
    					labelWidth: 50,
    					labelAlign: null,
    					labelTextAlign: 'right',
//                      placeholder: 'AP/FP',
                        displayField: 'scd',
                        valueField: 'scd',
                        editable: false,
                        queryMode: 'local'
                    }]
					
                },{
                    xtype: 'combobox',
                    reference: 'refSCrewVslCgShiftcbx',
                    bind: { store: '{crewListCombo}' },
                    label: 'Crew/Cargo',
					labelWidth: 90,
					labelAlign: null,
					labelTextAlign: 'right',
//                    placeholder: 'Crew/Cargo',
                    displayField: 'scdNm',
                    valueField: 'scd',
                    required: true,
                    editable: false,
                    typeAhead: true,
                    queryMode: 'local'
                }, {
                    xtype: 'combobox',
                    reference: 'refSfTypeVslCgShiftcbx',
                    bind: { store: '{shftStyleListCombo}' },
                    queryMode: 'local',
                    displayField: 'scdNm',
                    valueField: 'scd',
                    label: { type: 'bundle', key: 'shiftingType' },
					labelWidth: 90,
					labelAlign: null,
					labelTextAlign: 'right',
//                  placeholder: { type: 'bundle', key: 'shiftingType' },
                    required: true,
                    editable: false,
                    clearable: true,
                    typeAhead: true,
                    listeners: {
                        select: 'onSelectCgShftHHT'
                    }
                }, {
                    xtype: 'combobox',
                    reference: 'refNHatchVslCgShiftcbx',
                    bind: { store: '{hatchListCombo}' },
                    displayField: 'scdNm',
                    valueField: 'scd',
                    label: { type: 'bundle', key: 'nextHatch' },
					labelWidth: 90,
					labelAlign: null,
					labelTextAlign: 'right',
//                  placeholder: { type: 'bundle', key: 'nextHatch' },
                    editable: false,
                    clearable: true,
                    queryMode: 'local'
                }, {//Shift
                    xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
                    margin: '0 0 0 60',
                    items: [{
                        xtype: 'numberfield',
                        minValue: 0,
                        maxValue: 999999999,
                        reference: 'refSMTCgShiftTextField',
                        label: { type: 'bundle', key: 'mt' },
    					labelWidth: 30,
    					labelAlign: null,
    					labelTextAlign: 'right',
//                      placeholder: { type: 'bundle', key: 'mt' },
                        bind: '{theVslCgShiftHHT.mt}',
                        flex: 1
                    },{
                    	xtype: 'spacer',
                    	width: 3
                    },{
                        xtype: 'numberfield',
                        minValue: 0,
                        maxValue: 999999999,
                        reference: 'refSM3CgShiftTextField',
                        bind: '{theVslCgShiftHHT.m3}',
                        label: { type: 'bundle', key: 'm3' },
    					labelWidth: 30,
    					labelAlign: null,
    					labelTextAlign: 'right',
//                      placeholder: { type: 'bundle', key: 'm3' },
                        flex: 1
                    },{
                    	xtype: 'spacer',
                    	width: 3
                    },{
                        xtype: 'numberfield',
                        minValue: 0,
                        maxValue: 999999999,
                        reference: 'refSQtyCgShiftTextField',
                        bind: '{theVslCgShiftHHT.qty}',
                        label: { type: 'bundle', key: 'qty' },
    					labelWidth: 30,
    					labelAlign: null,
    					labelTextAlign: 'right',
//                      placeholder: { type: 'bundle', key: 'qty' },
                        flex: 1
                    }]
                }]
            }, {//Pkg Type / Start, End datetime / Remark
        		xtype: 'fieldset',
        		flex: 1,
				layout:{
					type: 'vbox',
					align: 'stretch'
				},
                items: [
				{
					xtype: 'combobox',
					reference: 'refBLCgShiftComboBox',
                    bind: { 
						store: '{blCombo}',
						value:'{theVslCgShiftHHT.bl}'
					},
                    queryMode: 'local',
                    displayField: 'bl',
                    valueField: 'bl',
                    label: 'BL',
					labelWidth: 80,
					labelAlign: null,
					labelTextAlign: 'right',
//                  placeholder: 'BL',
                    //required: true,
                    //editable: false,
                    //clearable: true,
                    //typeAhead: true,
                    forceSelection: true,
                    listeners: {
                        select: 'onSelectBlNoHHT'
                    }
				},
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [{
                        xtype: 'textfield',
                        reference: 'refPkgTypeCgShftTextField',
                        bind: '{theVslCgShiftHHT.pkgTpCd}',
                        label: { type: 'bundle', key: 'pkgTpCd' },
    					labelWidth: 80,
    					labelAlign: null,
    					labelTextAlign: 'right',
//                      placeholder: { type: 'bundle', key: 'pkgTpCd' },
                        editable: false,
                        flex: 1,
                        triggers: {
                            someField: {
                                iconCls: 'x-fa fa-search',
                                scope: 'controller',
                                handler: 'onSearchPkgTypeCgShiftingHHT'
                            }
                        }
                    },{
                        xtype: 'textfield',
                        reference: 'refPkgTypeNameCgShftTextField',
                        bind: '{theVslCgShiftHHT.pkgTpCd}',
                        placeholder: { type: 'bundle', key: 'pkgTpNm' },
                        hidden: true,
                    },
                    // {
                    // 	xtype: 'fieldset',
                    //     items: [{
                    //     xtype: 'button',                
                    //     iconCls: 'x-fa fa-search',
                    //     handler: 'onSearchPkgTypeCgShiftingHHT',	
                    //     }]
                    // }
                ]
                }, {
                    xtype: 'datetimelocalfield',
                    reference: 'refStartTimeCgShiftfield',
                    format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                    placeholder: { type: 'bundle', key: 'stTime' },
                    inputType: 'datetime-local',
                    label: 'Start Time',
                    labelWidth: 80
                }, {
                    xtype: 'datetimelocalfield',
                    format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                    reference: 'refEndTimeCgShiftfield',
                    placeholder: { type: 'bundle', key: 'eTime' },
                    inputType: 'datetime-local',
                    label: 'End Time',
                    labelWidth: 80
                }, {
                	xtype: 'textareafield',
                	reference: 'refRmkCgShiftTextField',
                	bind: '{theVslCgShiftHHT.rmk}',
                	label: { type: 'bundle', key: 'remark' },
					labelWidth: 80,
					labelAlign: null,
					labelTextAlign: 'right',
//                	placeholder: { type: 'bundle', key: 'remark' },
                	maxLength: 150,
                	flex: 1,
                }
                ]
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
                flex: 1
            }, {
            	xtype: 'spacer',
            	width: 3                	
			},{            	
                xtype: 'button',
                reference: 'refBtnCgShiftHHTClear',
                flex: 1,
                ui: 'clear-button-modern',
                text: { type: 'bundle', key: 'clear' },
                handler: 'onClearCgShiftHHT',
				width: 150
			}, {
				xtype: 'spacer',
				width: 3                	
            },{
                xtype: 'button',
                reference: 'refBtnCgShiftHHTAdd',
                flex: 1,
                ui: 'create-button-modern',
                text: { type: 'bundle', key: 'add' },
                handler: 'oncheckAddCgShiftHHT',
				width: 150
			}, {
				xtype: 'spacer',
				width: 3                
            }, {
                xtype: 'button',
                reference: 'refBtnCgShiftHHTUpdate',
                flex: 1,
                ui: 'update-button-modern',
                text: { type: 'bundle', key: 'update' },
                handler: 'onCheckUpdateCgShiftgHHT',
				width: 150
			}, {
				xtype: 'spacer',
				width: 3                
            }, {
                xtype: 'button',
                reference: 'refBtnCgShiftHHTDelete',
                flex: 1,
                ui: 'delete-button-modern',
                text: { type: 'bundle', key: 'delete' },
                handler: 'onDeleteCgShiftgHHT',
				width: 150
            }]
        }, {
            xtype: 'grid',
		    responsiveConfig: {
		        small: {
		        	flex: 1
		        },
		        large: {
		        	flex: undefined,
		        	height: 200
		        }
		    },	                
            reference: 'refVslShiftingCgShiftGrid',
            bind: {
                store: '{cgShftList}'
            },
            listeners: {
                select: 'onGridVslCgShiftClick'
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
                text: { type: 'bundle', key: 'hatch' },
                dataIndex: 'hatchNo',
                width: 150,
                align: 'center',

            }, {
                text: { type: 'bundle', key: 'apFp' },
                dataIndex: 'hatchDrtCd',
                width: 100,
                align: 'center',

            }, {
                text: { type: 'bundle', key: 'stevedore' },
                dataIndex: 'stcrDiv',
                width: 150,
                reference: 'refColCrewList',
                align: 'center',

            }, {
                text: { type: 'bundle', key: 'sftype' },
                dataIndex: 'sftTp',
                width: 150,
                align: 'center',
                reference: 'refColShftType',
            }/*,{
            header: me.lblSfDescr,
            dataIndex: 'sftTpNm',
            width: 100,
            align:'center'
        }*/, {
                text: { type: 'bundle', key: 'nhatch' },
                dataIndex: 'nextHatchNo',
                filter: 'string',
                width: 100,
                reference: 'refColNHatch',
                align: 'center',


            }, {
                text: { type: 'bundle', key: 'pkg' },
                dataIndex: 'pkgTpCd',
                width: 150,
                align: 'center',
            }, {
                text: { type: 'bundle', key: 'mt' },
                dataIndex: 'mt',
                width: 100,
                reference: 'refColCgShftMt',
                align: 'center',

            }, {
                text: { type: 'bundle', key: 'm3' },
                dataIndex: 'm3',
                width: 100,
                reference: 'refColCgShftM3',
                align: 'center',

            }, {
                text: { type: 'bundle', key: 'qty' },
                dataIndex: 'qty',
                width: 100,
                reference: 'refColCgShftQty',
                align: 'center',

            }, {
                text: { type: 'bundle', key: 'startTime' },
                dataIndex: 'stDt',
                reference: 'refColCgShftStDt',
                width: 150,
                align: 'center',
            }, {
                text: { type: 'bundle', key: 'endTime' },
                dataIndex: 'endDt',
                reference: 'refColCgShftEndDt',
                width: 150,
                align: 'center',

            }, {
                text: { type: 'bundle', key: 'rmk' },
                dataIndex: 'rmk',
                width: 100,
                align: 'center',
            }]
        }]
    }]
});
