Ext.define('MOST.view.popup.WorkingAreaMultiPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-workingareamultipopup',
	requires: [
		'MOST.view.popup.WorkingAreaMultiPopupModel',
		'MOST.view.popup.WorkingAreaMultiPopupController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	title:"Working Area",
	width: 460,
	height: 440,

	controller: 'workingareamultipopup',
	
	viewModel: {
		type: 'workingareamultipopup'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	lblCk: {type: 'bundle', key: 'fnChk'},
	lblCode: {type: 'bundle', key: 'scd'},
	lblDescription: {type: 'bundle', key: 'capaDesc'},
	lblCategory: {type: 'bundle', key: 'titleCategory'},
	lblWorkingArea: {type: 'bundle', key: 'titlefieldnameWorkingarea'},
	lblWharf: {type: 'bundle', key: 'titlecomboWharf'}, 
	btnUpdate: {type: 'bundle', key: 'update'},
	btnSet: {type: 'bundle', key: 'set'},
	btnClear: {type: 'bundle', key: 'clear'},

	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {

		var me = this;
		
		Ext.apply(me, {
			items: [
				{
					xtype: 'grid',
					reference: 'refCommonCodeForMultiPopupGrid',
					flex : 1,
					margin:'0 5 5 5',
					stateful : true,
					stateId : 'stateCommonCodeForMultiPopupGrid',
					plugins: [
						'gridexporter',
						'gridfilters',
						'clipboard'
		    		],
		    		bind: {
		    			store: '{workingAreaMultiList}'
		    		},
					columns: {
		            	defaults: {
		            		style : 'text-align:center',
		            		align : 'center'
		            	},
		            	items: [
			            	{
			            		header: me.lblCk,
			            		reference: 'refChkWorkingAreaMulti',
					            xtype: 'checkcolumn',
					            dataIndex: 'chk',
					            width: 40,
					            defaultType: 'integer',
					            listeners: {
					            	checkchange: 'onWorkingAreaMultiCheckChange'
		    		            }
					        },
					        {
					        	header: me.lblCode,
					        	dataIndex: 'code',
					        	reference: 'refCd',
					        	filter: 'string',
					        	width: 130
					        },
					        {
					        	header: me.lblDescription,
					        	dataIndex: 'codeName',
					        	reference: 'refCdNm',
					        	filter: 'string',
					        	width: 268
					        }
					    ]
					}
			    }
			],
		    
		    dockedItems: [
		    	{
			    	xtype: 'toolbar',
					enableOverflow: true,
					defaults: {
						labelAlign: 'right'
					},
					items: [
						{
							xtype: 'container',
							layout:{
								type: 'hbox'
							},
							defaults : {
			   					width : 300,
			   					labelAlign : 'right',
			   					labelWidth : 100
							},
							items: [
								{
									reference: 'ctlCategory',
				   					xtype: 'combo',
				   					queryMode: 'local',
				   					margin: '0 5 0 0',
				   					fieldLabel: me.lblCategory,
				   					bind: {
				    	    			store: '{commonCodeList}'
				    	    		},
				   					displayField: 'codeName',
				   					valueField: 'code',
				   					value : '',
				   					flex: 1,
				   					editable: false,
				   					listeners: {
				   						change: 'onCategoryChange'
				   					}
								},
								{
									xtype: 'button',
									text: me.btnUpdate,
									width: 125,
									margin: '0 0 0 0',
									listeners:{
										click:'onUpdate'
									}
								}
							]
						}
					]
				},
				{
			    	xtype: 'toolbar',
					enableOverflow: true,
					defaults: {
						labelAlign: 'right'
					},
					items: [
						{
							xtype: 'container',
							layout:{
								type: 'hbox',
							     align: 'stretch'
							},
							defaults : {
			   					width : 300,
			   					labelAlign : 'right',
			   					labelWidth : 100
							},					
							items: [
								{
									reference:'txtSetCds',
									xtype:'textfield',
									fieldLabel : me.lblWorkingArea,
									margin: '0 5 0 0',
									name: 'ptnCds',
									fieldStyle: 'background-color: #E8D4F7;',
									editable: false
								},
								{
									xtype: 'button',
									text: me.btnSet,
									width: 60,
									name: 'btnCdTypeSet',
									margin: '0 5 0 0',
									listeners:{
										click:'onSet'
									}
								},
								{
									xtype: 'button',
									text: me.btnClear,
									width: 60,
									name: 'btnCdTypeClear',
									listeners:{
										click:'onClear'
									}
								}
							]
						}
					]
				},
				{
			    	xtype: 'toolbar',
					enableOverflow: true,
					defaults: {
						labelAlign: 'right'
					},
					items: [
						{
							xtype: 'container',
							layout:{
								type: 'hbox',
							     align: 'stretch'
							},
							items: [
								{
									 xtype: 'checkboxfield',
									 reference: 'refWharfCheck',
					                 margin: '0 0 0 7',
					                 width: 60,
					                 boxLabel: 'Hatch',
					                 boxLabelAlign : 'after',
					                 listeners: {
					    				change: 'onWharfCheck'
					                 }
								}
							]
						}
					]
				}
			]
		});
		
		me.callParent();
	}
});

