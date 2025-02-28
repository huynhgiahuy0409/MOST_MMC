Ext.define('MOST.view.popup.VesselCallListPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-vesselcalllistpopup',
	requires: [         
	],
	
	title:"Find Vessel",
	width: 1100,
	height: 500,
	
	controller: 'vesselcalllistpopup',
	
	viewModel: {
		type: 'vesselcalllistpopup'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	lblVslCd: {type: 'bundle', key: 'vesselCode'},
	lblScn: {type: 'bundle', key: 'vslschlShpCNo'},
	lblVslSeq: {type: 'bundle', key: 'vesselSeq'},
	lblInvoyage: {type: 'bundle', key: 'voyage'},
	lblCallSign: {type: 'bundle', key: 'callSign'},
	lblVslOperator: {type: 'bundle', key: 'vslOperator'},
	
	lblJpvc: {type: 'bundle', key: 'jpvc'},
	lblVslTp: {type: 'bundle', key: 'vesselType'},
	lblVslNm: {type: 'bundle', key: 'vesselName'},
	lblCallSign: {type: 'bundle', key: 'callSign'},
	lblEta: {type: 'bundle', key: 'eta'},
	lblEtb: {type: 'bundle', key: 'etb'},
	lblEtd: {type: 'bundle', key: 'etd'},
	lblVoyage: {type: 'bundle', key: 'voyage'},
	lblOperation: {type: 'bundle', key: 'operation'},
	lblFromtoSign: {type: 'bundle', key: 'fromtoSign'},
	lblZb55Status:{type:'bundle', key:'zb55Status'},
	
	lblA: {type: 'bundle', key: 'a'},
	lblB: {type: 'bundle', key: 'b'},
	lblC: {type: 'bundle', key: 'c'},
	lblD: {type: 'bundle', key: 'd'},
	lblE: {type: 'bundle', key: 'e'},
	lblF: {type: 'bundle', key: 'f'},
	lblG: {type: 'bundle', key: 'g'},
	lblH: {type: 'bundle', key: 'h'},
	lblI: {type: 'bundle', key: 'i'},
	lblJ: {type: 'bundle', key: 'j'},
	lblK: {type: 'bundle', key: 'k'},
	lblL: {type: 'bundle', key: 'l'},
	lblM: {type: 'bundle', key: 'm'},
	lblN: {type: 'bundle', key: 'n'},
	lblO: {type: 'bundle', key: 'o'},
	lblP: {type: 'bundle', key: 'p'},
	lblQ: {type: 'bundle', key: 'q'},
	lblR: {type: 'bundle', key: 'r'},
	lblS: {type: 'bundle', key: 's'},
	lblT: {type: 'bundle', key: 't'},
	lblU: {type: 'bundle', key: 'u'},
	lblV: {type: 'bundle', key: 'v'},
	lblW: {type: 'bundle', key: 'w'},
	lblX: {type: 'bundle', key: 'x'},
	lblY: {type: 'bundle', key: 'y'},
	lblZ: {type: 'bundle', key: 'z'},

	btnSearch: {type: 'bundle', key: 'search'},
	btnRefresh: {type: 'bundle', key: 'refresh'},
	btnExportToExcel: {type: 'bundle', key: 'exportToExcel'},
	
	layout : {type  : 'vbox', align : 'stretch'},

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refvesselCallListPopupGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'vesselCallListPopupStore',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	initComponent: function() {

		var me = this;
		
		Ext.apply(me, {
			items: [{
				xtype: 'tsb-datagrid',
				reference: me.MAIN_GRID_REF_NAME,
				usePagingToolbar : false,
				flex : 1,
				stateful : true,
				stateId : 'stateCargoTypePopupGrid',
				plugins: [
	    		          'gridexporter',
	    		          'gridfilters',
	    		          'clipboard'
	    		],
	    		bind: {
	    			store: '{' + me.MAIN_STORE_NAME + '}'
	    		},
	    		selModel: {
					type: 'spreadsheet',
					cellSelect: false
				},
				listeners: {
					celldblclick: 'onDblClick'
				},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items: [
						{
	            			header: me.lblScn,
	            			dataIndex: 'scn',
	            			reference: 'refScn',
	            			filter: 'string',
	            			width: 100
						},{
	            			header: me.lblJpvc,
	            			dataIndex: 'vslCallId',
	            			reference: 'refVslCallId',
	            			filter: 'string',
	            			width: 100
            			},{
	            			header: me.lblVslTp,
	            			dataIndex: 'vslTpNm',
	            			reference: 'refVslTpNm',
	            			filter: 'list',
	            			width: 100
	            		},{
	            			header: me.lblVslNm,
	            			dataIndex: 'vslNm',
	            			reference: 'refVslNm',
	            			filter: 'string',
	            			align: 'left',
	            			width: 150
	            		},{
	            			header: me.lblCallSign,
	            			dataIndex: 'callSign',
	            			reference: 'refCallSign',
	            			filter: 'string',
	            			width: 80
	            		},{
	            			header: me.lblEta,
	            			xtype: 'datecolumn',
	            			dataIndex: 'eta',
	            			format: MOST.config.Locale.getShortDate(),
	            			width: 70,
							exportRenderer: function(value, record, dataIndex, cell, column){
								return Ext.util.Format.date(value, MOST.config.Locale.getShortDate());
							}
	            		},{
	            			header: me.lblEtb,
	            			xtype: 'datecolumn',
	            			dataIndex: 'etb',
	            			format: MOST.config.Locale.getShortDate(),
	            			width: 100,
							exportRenderer: function(value, record, dataIndex, cell, column){
								return Ext.util.Format.date(value, MOST.config.Locale.getShortDate());
							}
	            		},{
	            			header: me.lblEtd,
	            			xtype: 'datecolumn',
	            			dataIndex: 'etd',
	            			format: MOST.config.Locale.getShortDate(),
	            			width: 100,
							exportRenderer: function(value, record, dataIndex, cell, column){
								return Ext.util.Format.date(value, MOST.config.Locale.getShortDate());
							}
	            		},{
	            			header: me.lblVoyage,
	            			dataIndex: 'voyage',
	            			reference: 'refVoyage',
	            			filter: 'string',
	            			width: 100
	            		},{
	            			header: me.lblVslOperator,
	            			dataIndex: 'vslOperator',
	            			reference: 'refVslOperator',
	            			filter: 'string',
	            			width: 100
	            	}]
				}
		    }],
		    
		    dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				enableOverflow: true,
				height:90,
				defaults: {
					labelAlign: 'right'
				},
				items: [{
					xtype: 'container',
					reference: 'refVesselCallIdSearchPopup',
					flex:1,
					layout:{
						type: 'vbox',
                        align: 'stretch'
					},
					items: [{
						xtype: 'toolbar',
						enableOverflow: true,
						height:30,
						defaults: {
							labelAlign: 'right'
						},
						items: [{
							xtype: 'container',
							flex: 1,
							layout:{
								type: 'hbox',
		                        align: 'stretch'
							},
							items: [		
							{
								fieldLabel: me.lblVslCd,
								xtype:'textfield',
								reference:'txtVslCd',
								maxLength: 5,
								labelWidth: 90,
								width: 200,
								name: 'vslCd',
								margin: '0 10 0 8',
								fieldStyle : 'text-transform: uppercase',
								bind:{
									value: '{theSearch.vslCd}'
								}
							},
							{
								fieldLabel: me.lblVslNm,
								xtype:'textfield',
								reference:'txtVslNm',
								maxLength: 30,
								labelWidth: 90,
								width: 200,
								name: 'vslNm',
								margin: '0 20 0 8',
								fieldStyle : 'text-transform: uppercase',
								bind:{
									value: '{theSearch.vslNm}'
								}
							},
							{
								xtype: 'datefield',
								fieldLabel: me.lblEta,
								reference:'refEtaFromDt',
			                    format: MOST.config.Locale.getShortDate(),
			                    labelWidth: 58,
//			                    listeners: {
//	        						change: 'onDateChange'
//	        					}
							},
							{
								xtype:'label',
								text: me.lblFromtoSign,
								margin: '8 10 0 10',
							},
							{
								xtype: 'datefield',
								reference:'refEtaToDt',
			                    format: MOST.config.Locale.getShortDate(),
			                    anchor: '100%',
			                    labelWidth: 98,
//			                    listeners: {
//	        						change: 'onDateChange'
//	        					}
							}]
						}]
					},
					{
						xtype: 'toolbar',
						enableOverflow: true,
						height:30,
						defaults: {
							labelAlign: 'right'
						},
						items: [
						{
							xtype: 'container',
							flex: 1,
							layout:{
								type: 'hbox',
		                        align: 'stretch'
							},
							items: [{
								fieldLabel: me.lblVslSeq,
								xtype:'textfield',
								reference:'txtCallSeq',
								maxLength: 5,
								labelWidth: 90,
								width: 200,
								name: 'vslSeq',
								margin: '0 10 0 8',
								fieldStyle : 'text-transform: uppercase',
								bind:{
									value: '{theSearch.callSeq}'
								}
							},
							{
								fieldLabel: me.lblVoyage,
								xtype:'textfield',
								reference:'txtVoyage',
								maxLength: 5,
								labelWidth: 90,
								width: 200,
								name: 'invoyage',
								margin: '0 10 0 8',
								fieldStyle : 'text-transform: uppercase',
								bind:{
									value: '{theSearch.voyage}'
								}
							},
							{
								fieldLabel:me.lblCallSign,
								xtype:'textfield',
								reference:'txtCallSign',
								maxLength: 5,
								labelWidth: 60,
								width: 235,
								name: 'callsign',
								margin: '0 28 0 8',
								fieldStyle : 'text-transform: uppercase',
								bind:{
									value: '{theSearch.callSign}'
								}
							},
							{
								xtype: 'button',
								text: me.btnSearch,
								width: 170,
								name: 'btnVesselFindPopup',
								iconCls: 'x-fa fa-search',
								margin: '0 0 0 0',
								listeners:{
									click:'onSearch'
								}
							},
							{
								xtype: 'checkboxfield',
								margin: '0 0 0 8',
								reference: 'checkBoxStorageVsl',
								boxLabel: ViewUtil.getLabel('storage_vsl'),
								bind: '{fmlStorageVslCheck}',
								listeners:{
									change:'onCheckStorageVsl'
								}
							},]
						}]
					},
					{
						xtype: 'toolbar',
						enableOverflow: true,
						height:30,
						defaults: {
							labelAlign: 'right'
						},
						items: [
						{
							xtype: 'container',
							reference: 'ctnAlpha',
							flex: 1,
							layout:{
								type: 'hbox',
		                        align: 'stretch'
							},
							defaults:{
								margin: '0 3 5 0'
							},
							items: [
							{
								xtype:'button',
								text: me.lblA,
								reference:'refBtnA',
								width: 38,
								border: false,
								listeners:{
									click: {
										fn: 'onAlignClick',
										args:['A']
									}
								}
							},
							{
								xtype:'button',
								text: me.lblB,
								reference:'refBtnB',
								width: 38,
								border: false,
								listeners:{
									click: {
										fn: 'onAlignClick',
										args:['B']
									}
								}
							},
							{
								xtype:'button',
								text: me.lblC,
								reference:'refBtnC',
								width: 38,
								border: false,
								listeners:{
									click: {
										fn: 'onAlignClick',
										args:['C']
									}
								}
							},
							{
								xtype:'button',
								text: me.lblD,
								reference:'refBtnD',
								width: 38,
								border: false,
								listeners:{
									click: {
										fn: 'onAlignClick',
										args:['D']
									}
								}
							},
							{
								xtype:'button',
								text: me.lblE,
								reference:'refBtnE',
								width: 38,
								border: false,
								listeners:{
									click: {
										fn: 'onAlignClick',
										args:['E']
									}
								}
							},
							{
								xtype:'button',
								text: me.lblF,
								reference:'refBtnF',
								width: 38,
								border: false,
								listeners:{
									click: {
										fn: 'onAlignClick',
										args:['F']
									}
								}
							},
							{
								xtype:'button',
								text: me.lblG,
								reference:'refBtnG',
								width: 38,
								border: false,
								listeners:{
									click: {
										fn: 'onAlignClick',
										args:['G']
									}
								}
							},
							{
								xtype:'button',
								text: me.lblH,
								reference:'refBtnH',
								width: 38,
								border: false,
								listeners:{
									click: {
										fn: 'onAlignClick',
										args:['H']
									}
								}
							},
							{
								xtype:'button',
								text: me.lblI,
								reference:'refBtnI',
								width: 38,
								border: false,
								listeners:{
									click: {
										fn: 'onAlignClick',
										args:['I']
									}
								}
							},
							{
								xtype:'button',
								text: me.lblJ,
								reference:'refBtnJ',
								width: 38,
								border: false,
								listeners:{
									click: {
										fn: 'onAlignClick',
										args:['J']
									}
								}
							},
							{
								xtype:'button',
								text: me.lblK,
								reference:'refBtnK',
								width: 38,
								border: false,
								listeners:{
									click: {
										fn: 'onAlignClick',
										args:['K']
									}
								}
							},
							{
								xtype:'button',
								text: me.lblL,
								reference:'refBtnL',
								width: 38,
								border: false,
								listeners:{
									click: {
										fn: 'onAlignClick',
										args:['L']
									}
								}
							},
							{
								xtype:'button',
								text: me.lblM,
								reference:'refBtnM',
								width: 38,
								border: false,
								listeners:{
									click: {
										fn: 'onAlignClick',
										args:['M']
									}
								}
							},
							{
								xtype:'button',
								text: me.lblN,
								reference:'refBtnN',
								width: 38,
								border: false,
								listeners:{
									click: {
										fn: 'onAlignClick',
										args:['N']
									}
								}
							},
							{
								xtype:'button',
								text: me.lblO,
								reference:'refBtnO',
								width: 38,
								border: false,
								listeners:{
									click: {
										fn: 'onAlignClick',
										args:['O']
									}
								}
							},
							{
								xtype:'button',
								text: me.lblP,
								reference:'refBtnP',
								width: 38,
								border: false,
								listeners:{
									click: {
										fn: 'onAlignClick',
										args:['P']
									}
								}
							},
							{
								xtype:'button',
								text: me.lblQ,
								reference:'refBtnQ',
								width: 38,
								border: false,
								listeners:{
									click: {
										fn: 'onAlignClick',
										args:['Q']
									}
								}
							},
							{
								xtype:'button',
								text: me.lblR,
								reference:'refBtnR',
								width: 38,
								border: false,
								listeners:{
									click: {
										fn: 'onAlignClick',
										args:['R']
									}
								}
							},
							{
								xtype:'button',
								text: me.lblS,
								reference:'refBtnS',
								width: 38,
								border: false,
								listeners:{
									click: {
										fn: 'onAlignClick',
										args:['S']
									}
								}
							},
							{
								xtype:'button',
								text: me.lblT,
								reference:'refBtnT',
								width: 38,
								border: false,
								listeners:{
									click: {
										fn: 'onAlignClick',
										args:['T']
									}
								}
							},
							{
								xtype:'button',
								text: me.lblU,
								reference:'refBtnU',
								width: 38,
								border: false,
								listeners:{
									click: {
										fn: 'onAlignClick',
										args:['U']
									}
								}
							},
							{
								xtype:'button',
								text: me.lblV,
								reference:'refBtnV',
								width: 38,
								border: false,
								listeners:{
									click: {
										fn: 'onAlignClick',
										args:['V']
									}
								}
							},
							{
								xtype:'button',
								text: me.lblW,
								reference:'refBtnW',
								width: 38,
								border: false,
								listeners:{
									click: {
										fn: 'onAlignClick',
										args:['W']
									}
								}
							},
							{
								xtype:'button',
								text: me.lblX,
								reference:'refBtnX',
								width: 38,
								border: false,
								listeners:{
									click: {
										fn: 'onAlignClick',
										args:['X']
									}
								}
							},
							{
								xtype:'button',
								text: me.lblY,
								reference:'refBtnY',
								width: 38,
								border: false,
								listeners:{
									click: {
										fn: 'onAlignClick',
										args:['Y']
									}
								}
							},
							{
								xtype:'button',
								text: me.lblZ,
								reference:'refBtnZ',
								width: 38,
								border: false,
								listeners:{
									click: {
										fn: 'onAlignClick',
										args:['Z']
									}
								}
							}]
						}]
					}]
				}]
			}]
		});
		
		me.callParent();
	}
});

