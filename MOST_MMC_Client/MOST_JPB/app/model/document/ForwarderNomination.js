Ext.define('MOST.view.document.ForwarderNomination', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-forwardernomination',
	requires: [
		'MOST.view.document.ForwarderNominationController',
		'MOST.view.document.ForwarderNominationModel',
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	detailViewAlias: 'app-deliveryorderdetail',
	infoViewAlias: 'app-dangerousgoodsdeclaration',
	
	controller: 'forwardernomination',
	
	viewModel: {
		type: 'forwardernomination'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	lblSearch: {type: 'bundle', key: 'search'},
	lblJobNo: {type: 'bundle', key: 'jobNo'},
	lblDMode: {type: 'bundle', key: 'dMode'},
	lblJpvc: {type: 'bundle', key: 'jpvc'},
	lblVesselName: {type: 'bundle', key: 'vesselName'},
	lblFnChk: {type: 'bundle', key: 'fnChk'},
	lblBlno: {type: 'bundle', key: 'blno'},
	lblDoNo: {type: 'bundle', key: 'dono'},
	lblFnDocId: {type: 'bundle', key: 'fnDocId'},
	lblJpvcNo: {type: 'bundle', key: 'jpvcNo'},
	lblDeliveryMode: {type: 'bundle', key: 'deliveryMode'},
	lblCargoTp: {type: 'bundle', key: 'cargoTp'},
	lblGdsRmk: {type: 'bundle', key: 'gdsRmk'},
	lblPackageTp: {type: 'bundle', key: 'packageTp'},
	lblFwdAgent: {type: 'bundle', key: 'fwdAgent'},
	lblDgStatus: {type: 'bundle', key: 'dgStatus'},
	lblDgApprDt: {type: 'bundle', key: 'dgApprDt'},
	lblCustDeclNo: {type: 'bundle', key: 'custDeclNo'},
	lblCustApprStat: {type: 'bundle', key: 'custApprStat'},
	lblCustApprDt: {type: 'bundle', key: 'custApprDt'},
	lblPackingList: {type: 'bundle', key: 'packingList'},
	lblDocMt: {type: 'bundle', key: 'docMt'},
	lblActMt: {type: 'bundle', key: 'actMt'},
	lblDiffMt: {type: 'bundle', key: 'diffMt'},
	lblDocM3: {type: 'bundle', key: 'docM3'},
	lblActM3: {type: 'bundle', key: 'actM3'},
	lblDiffM3: {type: 'bundle', key: 'diffM3'},
	lblMeansurementUnit: {type: 'bundle', key: 'meansurementUnit'},
	lblDocQty: {type: 'bundle', key: 'docQty'},
	lblActQty: {type: 'bundle', key: 'actQty'},
	lblDiffQty: {type: 'bundle', key: 'diffQty'},
	lblConsignors: {type: 'bundle', key: 'consignors'},
	lblConsignee: {type: 'bundle', key: 'consignee'},
	lblPol: {type: 'bundle', key: 'pol'},
	lblPod: {type: 'bundle', key: 'pod'},
	lblFnRemark: {type: 'bundle', key: 'fnRemark'},
	lblCargoClass: {type: 'bundle', key: 'cargoClass'},
	lblHsCode: {type: 'bundle', key: 'hsCode'},
	
	lblVoyage: {type: 'bundle', key: 'voyage'},
	lblEta: {type: 'bundle', key: 'eta'},
	lblDnASA: {type: 'bundle', key: 'fnASA'},
	lblFnDSA: {type: 'bundle', key: 'fnDSA'},
	lblScn: {type: 'bundle', key: 'scn'},
	lblFlag: {type: 'bundle', key: 'flag'},
	lblVesselCode: {type: 'bundle', key: 'vesselCode'},
	lblBerthingLoc: {type: 'bundle', key: 'berthingLoc'},
	lblStorageLoc: {type: 'bundle', key: 'storageLoc'},
	lblLastPortCall: {type: 'bundle', key: 'lastPortCall'},
	
	btnRetrieve: {type: 'bundle', key: 'retrive'},
	btnSearch: {type: 'bundle', key: 'search'},
	btnRefresh: {type: 'bundle', key: 'refresh'},
	btnRemove: {type: 'bundle', key: 'remove'},
	btnFwdNomi: {type: 'bundle', key: 'fwaNomi'},
	btnFaDeletion: {type: 'bundle', key: 'faDeletion'},
	btnDgDecl: {type: 'bundle', key: 'dgDecl'},
	btnPackageType: {type: 'bundle', key: 'faPackageType'},
	btnSave: {type: 'bundle', key: 'save'},
	
	layout : {type  : 'vbox', align : 'stretch'},
	
	MAIN_GRID_REF_NAME: 'refForwarderNominationGrid',

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			xtype:'form',
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items: [{
				xtype: 'container',
				layout: {
					type: 'hbox',
					align: 'stretch'
				},
				items: [
					{
                        xtype: 'fieldset',
						flex: 2.5,
						padding: '10 10 10 10',
						margin: '5 5 0 0',
                        layout: {
                            type: 'vbox'
                        },
						defaults: {
							width: '100%'
						},
                        items: [
                        	{
								xtype: 'container',
								layout: { type: 'hbox' },
								flex: 1,
								defaults: {
									margin: '0 0 5 0',
									labelAlign: 'right'
								},
								items: [
		                        	{
										xtype: 'shipcallnofield',
										labelWidth: 80,
										flex: 1,
										reference: 'ctlScn',
										emptyText: ViewUtil.getLabel('shipCallNo'),
										fieldLabel: ViewUtil.getLabel('shipCallNo'),
										bind: {
											value: '{theSearch.scn}',
										},
									},
								]
							},
							{
								xtype: 'container',
								layout: { type: 'hbox' },
								defaults: {
									labelAlign: 'right'
								},
								items: [
									{
										xtype: 'vesselcalllistfield',
										reference: 'ctlVessel',
										fieldLabel: ViewUtil.getLabel('vslCallId'),
										labelWidth: 80,
										flex: 1,
										emptyText: ViewUtil.getLabel('vslschlJPVCNo')
									}
								]
							},
							{
								xtype: 'container',
								margin: '5 0 0 0',
								layout: { type: 'hbox' },
								defaults: { 
									labelAlign: 'right'
								},
								items: [
									{
										xtype: 'textfield',
										flex: 1,
										fieldLabel: me.lblVesselName,
										bind: '{theVslInfo.vslNm}',
										labelWidth: 80
									}
								]
							},
							{
								xtype: 'container',
								layout: { type: 'hbox' },
								flex: 1,
								defaults: {
									margin: '5 0 0 0',
									labelAlign: 'right'
								},
								items: [
									{
										xtype: 'combo',
										reference: 'ctlSearchDMode',
										editable: false,
										fieldLabel: me.lblDMode,
										valueField: 'DMode',
										queryMode: 'local',
										bind: {
											store: '{dmodeCombo}'
										},
										displayField: 'name',
										valueField: 'code',
										value: '',
										labelWidth: 80,
										flex: 1,
										listeners: {
											change: 'onSearch'
										}
									}
								]
							}, 
							{
								xtype: 'container',
								margin: '5 0 0 0',
								layout: {
									type: 'hbox',
									align: 'stretch'
								},
								items: [
									{
										reference: 'ctlFromDt',
										xtype: 'datefield',
										labelWidth: 80, 
										labelAlign: 'right',
										fieldLabel: me.lblEta,
										format: MOST.config.Locale.getShortDate(),
										listeners: {
											change: 'onDateChange'
										},
										flex: 1
									},
									{
										reference: 'ctlToDt',
										flex: 0.6,
										margin: '0 0 0 5',
										xtype: 'datefield',
										format: MOST.config.Locale.getShortDate(),
										listeners: {
											change: 'onDateChange'
										}

									}
								]
							}
                        ]
                    },
					{
                        xtype: 'fieldset',
                    	margin: '5 5 0 0',
						padding: '10 10 10 10',
                    	flex: 7.5, 
                        layout: {
                            type: 'vbox'
                        },
						defaults: {
							margin: '0 0 5 0'
						},
                        items: [
                            {
                                xtype: 'container', 
                                layout: {
                                    type: 'hbox'
                                },
                                defaults:{
            						labelAlign: 'right',
									flex: 1,
									labelWidth: 80
            					},
                                items: [
									{
										xtype: 'textfield',
										reference: 'ctlOutbVoy',
										editable: false,
										fieldLabel: me.lblVoyage,
										bind: '{theVslInfo.voyage}',
									},
									{
										xtype: 'textfield',
										editable: false,
										fieldLabel: me.lblScn,
										bind: '{theVslInfo.scn}',
									},
									{
										xtype: 'textfield',
										editable: false,
										fieldLabel: me.lblBerthingLoc,
										bind: '{theVslInfo.berthLoc}',
									},
									{
										xtype: 'container'
									}
                                ]
                            },
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                defaults:{
            						labelAlign: 'right',
									flex: 1,
									labelWidth: 80
            					},
                                items: [
									{
										xtype: 'datefield',
										reference: 'ctlEta',
										readOnly: true,
										editable: false,
										fieldLabel: me.lblEta,
										format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
										bind: '{theVslInfo.eta}',
									},
									{
										xtype: 'textfield',
										editable: false,
										fieldLabel: me.lblFlag,
										bind: '{theVslInfo.flagCd}',
									},
									{
										xtype: 'textfield',
										editable: false,
										fieldLabel: me.lblStorageLoc,
									}
                                ]
                            },
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                defaults:{
            						labelAlign: 'right',
									flex: 1,
									labelWidth: 80
            					},
                                items: [
									{
										xtype: 'textfield',
										editable: false,
										fieldLabel: me.lblDnASA,
										bind: '{theVslInfo.arrvSaId}', 
									},
									{
										xtype: 'textfield',
										editable: false,
										fieldLabel: me.lblVesselCode,
										bind: '{theVslInfo.vslCd}',
									},
									{
										xtype: 'textfield',
										editable: false,
										reference: 'dtEtw',
										fieldLabel: me.lblLastPortCall,
										bind: '{theVslInfo.portCd}',
									}
                                ]
                            },{
                                xtype: 'container',
								margin: '0 0 0 0',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                defaults:{ 
            						labelAlign: 'right'
            					},
                                items: [
                                    {
                                        xtype: 'textfield',
                                        flex:1,
                                        editable: false,
                                        fieldLabel: me.lblFnDSA,
                                        bind: '{theVslInfo.depSaId}',
                                        labelWidth: 80
                                    },
									{
                                    	xtype: 'container',
                                        flex:1,
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        }
                                    },
									{
                                    	xtype: 'container',
                                        flex:1,
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        }
                                    },
									{
                                    	xtype: 'container',
                                        flex:1,
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        }
                                    } 
                                ]
                            }
                        ]
                    }
                ]
			},{
				xtype: 'fieldset',
				margin: '5 5 5 0',
				padding: '10 10 10 10',
				layout: {
					type: 'hbox',
					align: 'stretch'
				},
				defaults: {
					margin: '0 5 0 0'
				},
				items: [
					{
						xtype: 'button',
						itemId: 'fwaNomiButton',
						iconCls: 'fa fa-hand-pointer-o',
						cls: 'search-button',
						text: me.btnFwdNomi,
						listeners: {
							click: 'openFwaNomi'
						}
					}, {
						xtype: 'button',
						itemId: 'faDeletionButton',
						iconCls: 'fa fa-minus-circle',
						/*cls: 'search-button',*/
						ui: 'delete-button',
						text: me.btnFaDeletion,
						listeners: {
							click: 'onFaDeletion'
						}
					}, {
						xtype: 'button',
						itemId: 'packageTypeButton',
						iconCls: 'fa fa-dropbox',
						text: me.btnPackageType,
						listeners: {
							click: 'openPackageType'
						}
					},
					{
						xtype: 'button',
						itemId: 'dgDeclButton',
						iconCls: 'fa fa-ban',
						text: me.btnDgDecl,
						listeners: {
							click: 'openDgDecl'
						}
					},
					{
						xtype: 'combobox',
						reference: 'ctlDMode',
						fieldLabel: me.lblDMode,
						margin: '0 0 0 10',
						editable: false,
						labelWidth: 80,
						labelAlign: 'right',
						bind: {
							store: '{dmodeCombo}'
						},
						queryMode: 'local',
						displayField: 'name',
						valueField: 'code',
						value: '',
						listeners: {
							select: 'selectDMode'
						}
					},
					{
						xtype: 'combobox',
						reference: 'ctlCargoTp',
						fieldLabel: me.lblCargoTp,
						editable: false,
						labelWidth: 80,
						margin: '0 5 0 10',
						labelAlign: 'right',
						bind: {
							store: '{cargoTypeCombo}'
						},
						queryMode: 'local',
						displayField: 'scdNm',
						valueField: 'scd',
						value: '',
						listeners: {
							select: 'selectCargoType'
						}
					}, {
						xtype: 'filefield',
						name: 'fileUpload',
						itemId: 'createButton',
						id: 'forwarderNominationFileUpload',
						style: 'text-align:left',
						method: 'POST',
						width: 80,
						fileUpload: true,
						enctype: 'multipart/form-data',
						buttonOnly: true,
						multiple: true,
						buttonConfig: {
							text: "Upload",
							iconCls: 'fa fa-cloud-upload'
						},
						listeners: {
							change: 'onClickUpload'
						}
					}, {
						xtype: 'button',
						iconCls: 'fa fa-cloud-download',
						text: 'Download',
						listeners: {
							click: 'onClickDownload'
						}
					}
				]
			},
			{
				xtype: 'tsb-datagrid',
				reference: 'refForwarderNominationGrid',
				flex : 1,
				margin: '0 5 0 0',
				stateful : true,
				stateId : 'stateForwarderNominationGrid',
				viewConfig: {
		            stripeRows: true,
		            enableTextSelection: true,
		        },
				plugins: [
					'gridexporter',
					'gridfilters',
					'clipboard'
	    		],
	    		bind: {
	    			store: '{forwarderNomination}'
	    		},
	    		
	    		selModel: {
					type: 'spreadsheet',
					cellSelect: false,
					listeners: {
	    	            select: 'onChecked',
	    	            deselect:'onChecked'
	    	        }
				},
				
				selType: 'checkboxmodel',
				checkOnly: false,
				injectCheckbox: 0,
				
				listeners: {
					cellDblClick: 'onDblClick',
					cellClick: 'onCellClick'
				},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items: [
	            	{
	            		xtype: 'rownumberer',
	            		width : 40,
	            		locked : true,
	            		align : 'center'
	    	        },
					{
						header: me.lblJobNo,
						dataIndex: 'jobNo',
						reference: 'refJobNo',
						filter : 'string',
						align : 'center',
						locked : true,
						width: 90
					},
            		{
            			header: me.lblBlno,
            			dataIndex: 'blNo',
            			reference: 'refBlno',
            			filter : 'string',
            			align : 'center',
            			locked : true,
            			width: 140
            		},
            		{
            			header: me.lblDoNo,
            			dataIndex: 'doNo',
            			reference: 'refDoNo',
            			filter : 'string',
            			align : 'center',
            			locked : true,
            			width: 140
            		},
            		{
            			header: me.lblFnDocId,
            			dataIndex: 'docId',
            			reference: 'refFnDocId',
            			filter : 'string',
            			align : 'center',
            			width: 70
            		},
            		{
            			header: me.lblJpvc,
            			dataIndex: 'vslCallId',
            			reference: 'refVslCallId',
            			filter : 'string',
            			align : 'left',
            			width: 90
            		},
            		{
            			header: me.lblDeliveryMode,
            			dataIndex: 'delvTpNm',
            			reference: 'refDeliveryMode',
            			filter : 'string',
            			align : 'center',
            			width: 130
            		},
            		{
            			header: me.lblCargoTp,
            			dataIndex: 'cgTpCdNm',
            			reference: 'refCargoTp',
            			filter : 'string',
            			align : 'center',
            			width: 120
            		},
            		{
            			header: me.lblGdsRmk,
            			dataIndex: 'gdsRmk',
            			reference: 'refGdsRmk',
            			filter : 'string',
            			align : 'center',
            			width: 150
            		},
//            		{
//            			header: 'FZ Package Type',
//            			dataIndex: 'pgkTpCd',
//            			reference: 'refPackageTp',
//            			filter : 'string',
//            			align : 'center',
//            			width: 120
//            		},
            		{
            			header: me.lblPackageTp,
            			dataIndex: 'pkgTpCd',
            			reference: 'refPackageTp',
            			filter : 'string',
            			align : 'center',
            			width: 120
            		},
            		{
            			header: me.lblFwdAgent,
            			dataIndex: 'fwdCd',
            			reference: 'refFwdAgent',
            			filter : 'string',
            			align : 'center',
            			width: 70
            		},
            		{
            			header: me.lblDgStatus,
            			dataIndex: 'dgStatNm',
            			reference: 'refDgStatus',
            			filter : 'string',
            			align : 'center',
            			width: 130
            		},
            		{
            			header: me.lblDgApprDt,
            			dataIndex: 'status',
            			reference: 'refDgApprDt',
            			filter : 'string',
            			align : 'center',
            			width: 170
            		},
            		{
            			header: me.lblCustDeclNo,
            			dataIndex: 'releaseNo',
            			reference: 'refCustDeclNo',
            			filter : 'string',
            			align : 'center',
            			width: 165
            		},
            		{
            			header: me.lblCustApprStat,
            			dataIndex: 'customsAprvStat',
            			reference: 'refCustApprStat',
            			filter : 'string',
            			align : 'center',
            			width: 200
            		},
            		{
            			header: me.lblCustApprDt,
            			dataIndex: 'customsAprvDt',
            			reference: 'refCustApprDt',
            			filter : 'string',
            			align : 'center',
            			width: 200
            		},
            		{
            			header: me.lblPackingList,
            			dataIndex: 'packingList',
            			reference: 'refPackingList',
            			filter : 'string',
            			align : 'center',
            			width: 100
            		},
            		{
            			header: me.lblDocMt,
            			dataIndex: 'wgt',
            			reference: 'refDocMt',
            			filter : 'string',
            			align : 'right',
            			width: 100
            		},
            		{
            			header: me.lblActMt,
            			dataIndex: '',
            			reference: 'refActMt',
            			filter : 'string',
            			align : 'right',
            			width: 100
            		},
            		{
            			header: me.lblDiffMt,
            			dataIndex: '',
            			reference: 'refDiffMt',
            			filter : 'string',
            			align : 'right',
            			width: 100
            		},
            		{
            			header: me.lblDocM3,
            			dataIndex: 'vol',
            			reference: 'refDocM3',
            			filter : 'string',
            			align : 'right',
            			width: 110
            		},
            		{
            			header: me.lblActM3,
            			dataIndex: '',
            			reference: 'refActM3',
            			filter : 'string',
            			align : 'right',
            			width: 110
            		},
            		{
            			header: me.lblDiffM3,
            			dataIndex: '',
            			reference: 'refDiffM3',
            			filter : 'string',
            			align : 'right',
            			width: 110
            		},
            		{
            			header: me.lblDocQty,
            			dataIndex: 'pkgQty',
            			reference: 'refDocQty',
            			filter : 'string',
            			align : 'right',
            			width: 90
            		},
            		{
            			header: me.lblActQty,
            			dataIndex: '',
            			reference: 'refActQty',
            			filter : 'string',
            			align : 'right',
            			width: 90
            		},
            		{
            			header: me.lblDiffQty,
            			dataIndex: '',
            			reference: 'refDiffQty',
            			filter : 'string',
            			align : 'right',
            			width: 90
            		},
            		{
            			header: me.lblConsignors,
            			dataIndex: 'cnsnorCd',
            			reference: 'refConsignors',
            			filter : 'string',
            			align : 'center',
            			width: 120
            		},
            		{
            			header: me.lblConsignee,
            			dataIndex: 'cnsCd',
            			reference: 'refConsignee',
            			filter : 'string',
            			align : 'center',
            			width: 120
            		},
            		{
            			header: me.lblPol,
            			dataIndex: 'pol',
            			reference: 'refPol',
            			filter : 'string',
            			align : 'right',
            			width: 80
            		},
            		{
            			header: me.lblPod,
            			dataIndex: 'pod',
            			reference: 'refPod',
            			filter : 'string',
            			align : 'right',
            			width: 80
            		},
            		{
            			header: me.lblFnRemark,
            			dataIndex: 'rmk',
            			reference: 'refFnRemark',
            			filter : 'string',
            			align : 'center',
            			width: 90
            		},
            		{
            			header: me.lblCargoClass,
            			dataIndex: 'cgClassCd',
            			reference: 'refCargoClass',
            			filter : 'string',
            			align : 'center',
            			width: 100
            		},
            		{
            			header: me.lblHsCode,
            			dataIndex: 'hsCd',
            			reference: 'refHsCode',
            			filter : 'string',
            			align : 'center',
            			width: 90
            		}]
				}
		    }],
		    
		    dockedItems: [{
					xtype: 'container',
					layout: {
						type : 'hbox'
					},
					defaults: {
						margin: '1 1 1 1'
					},
					items: [
					{
						xtype: 'tbfill'
					},
					{
						xtype: 'button',
						itemId: 'inquiryItemId',
    					text: ViewUtil.getLabel('search'),
    					reference:'refBtnRetrieve',
    					iconCls: 'x-fa fa-search',
    					cls: 'search-button',
    					listeners: {
    						click: 'onSearch'
    					}
					
					},{
						xtype: 'button',
						itemId: 'saveItemId',
						text: me.btnSave,
						reference:'refBtnSave',
						iconCls: 'x-fa fa-save',
						listeners: {
							click: 'onSave'
						}
					},{
						xtype: 'button',
						itemId: 'exportToExcelButton',
						text: ViewUtil.getLabel('exportToExcel'),
						iconCls: 'excel-button-image', 
						cls: 'excel-button',
						handler: 'exportTo',
						cfg: {
                            type: 'excel07',
                            ext: 'xlsx'
                        }
					},
					{
						xtype: 'button',
						itemId: 'exportToPdfButton',
						text: ViewUtil.getLabel('exportToPdf'),
						iconCls: 'x-fa fa-file-pdf-o',
						cls: 'excel-button',
						hidden: true
					},{
						xtype: 'button',
						cls: 'column-setting-button',
						iconCls: 'x-fa fa-columns',
						text: ViewUtil.getLabel('column'),
						listeners: {
							click: 'onColumnSettingPopup',
							args: [me.MAIN_GRID_REF_NAME]
						}
	            	}]
				}
			]			
		});
		
		me.callParent();
	}
});

