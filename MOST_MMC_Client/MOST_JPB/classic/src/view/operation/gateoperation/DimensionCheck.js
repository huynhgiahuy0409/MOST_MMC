Ext.define('MOST.view.operation.gateoperation.DimensionCheck', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-dimensioncheck',
	
	requires: [
		'MOST.view.operation.DimensionCheckModel',
		'MOST.view.operation.DimensionCheckController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	title:"Dimension Check",
	width: 600,
	height: 400,
	scrollable: false,
	
	controller: 'dimensioncheck',
	
	viewModel: {
		type: 'dimensioncheck'
	},
	
	listeners: {
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */

	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout: {
		type: 'vbox', 
		align: 'stretch' 
	},
	
	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			layout: {
				type: 'vbox', 
				align: 'stretch' 
			},
			items: [
			{
				xtype: 'panel',
				layout: {
					type: 'hbox'
				},
				items: [
				{
					xtype: 'container',
					layout: {
						type: 'vbox'
					},
					defaults: {
		                labelWidth : 100,
		                labelAlign : 'right',
						margin : '5 0 0 5',
						width : 300,
					},
					items: [
						{
							xtype : 'vesselcalllistfield',
							reference : 'ctlVslCallId',
							fieldLabel : ViewUtil.getLabel('vslcallid'),
							emptyText : ViewUtil.getLabel('vslcallid'),
							bind : {
								value : '{theDimension.vslCallId}'
							}
						},
					]
				},
			    ]
			},
			{
				xtype: 'container',
				layout: {
					type: 'hbox'
				},
				items: [
				{
					xtype: 'container',
					layout: {
						type: 'vbox'
					},
					defaults: {
		                labelWidth : 100,
		                labelAlign : 'right',
						margin : '5 0 0 5',
						width : 300,
					},
					items: [
						{
							xtype : 'combo',
							fieldLabel : ViewUtil.getLabel('blSN'),
							reference : 'ctlSearchBlNo',
							emptyText : ViewUtil.getLabel('blSN'),
							bind: {
		    	    			store: '{snBlCombo}',
								value: '{theDimension.blSnNo}'
		    	    		},
		    	    		displayField: 'cdNm',
		   					valueField: 'cd',
		   					queryMode: 'local',
		   					value : '',
		                    editable : false,
		                    listeners:{
								select:'getSnBlComboItems'
							},
						},
					]
				},
			    ]
			},
			{
				xtype: 'container',
				layout: {
					type: 'hbox'
				},
				items: [
				{
					xtype: 'container',
					layout: {
						type: 'vbox'
					},
					defaults: {
		                labelWidth : 100,
		                labelAlign : 'right',
						margin : '5 0 0 5',
						width : 300,
					},
					items: [
						{
							xtype : 'combo',
							fieldLabel : ViewUtil.getLabel('doGR'),
							reference : 'ctlSearchGRNo',
							emptyText : ViewUtil.getLabel('doGR'),
			                labelAlign : 'right',
							margin : '5 0 0 5',
							bind: {
		    	    			store: '{doGrCombo}',
								value: '{theDimension.doGrCd}'
		    	    		},
		    	    		displayField: 'doGrNm',
		   					valueField: 'doGrCd',
		   					queryMode: 'local',
		   					value : '',
		                    editable : false
						}
					]
				},
			    ]
			},
			{
				xtype: 'container',
				layout: {
					type: 'hbox'
				},
				items: [
				{
					xtype: 'container',
					layout: {
						type: 'vbox'
					},
					defaults: {
		                labelWidth : 100,
		                labelAlign : 'right',
						margin : '5 0 0 5',
					},
					items: [
						{
							xtype: 'container',
							layout: {
								type: 'hbox'
							},
							defaults: {
				                labelWidth : 100,
				                labelAlign : 'right',
								margin : '0 5 0 0',
							},
							items: [
								{
		                        	xtype:'textfield',
		                        	fieldLabel : ViewUtil.getLabel('docLength'),
									width : 300,
									reference:'ctlDockLength',
									labelAlign: 'right',
									bind: {
			    	   					value: '{theDimension.docLength}'
			    	   				},
			    	   				maskRe: /[0-9]/,
			    	   				readOnly: true
		                        },
		                        {
		                        	xtype:'numberfield',
		                        	fieldLabel : ViewUtil.getLabel('actLength'),
									reference:'ctlActLength',
									flex : 1,
									bind: {
			    	   					value: '{theDimension.actLength}'
			    	   				},
			    	   				maskRe: /[0-9]/,
			    	   				minValue: 0,
									maxValue: 999999999999,
		                        }
							]
						},
						{
							xtype: 'container',
							layout: {
								type: 'hbox'
							},
							defaults: {
				                labelWidth : 100,
				                labelAlign : 'right',
								margin : '0 5 0 0',
							},
							items: [
								{
		                        	xtype:'textfield',
		                        	fieldLabel : ViewUtil.getLabel('docWidth'),
									width : 300,
									reference:'ctlDocWidth',
									labelAlign: 'right',
									bind: {
			    	   					value: '{theDimension.docWidth}'
			    	   				},
			    	   				maskRe: /[0-9]/,
			    	   				readOnly: true
		                        },
		                        {
		                        	xtype:'numberfield',
									reference:'ctlActWidth',
									fieldLabel : ViewUtil.getLabel('actWidth'),
									flex: 1,
									bind: {
			    	   					value: '{theDimension.actWidth}'
			    	   				},
			    	   				maskRe: /[0-9]/,
			    	   				minValue: 0,
									maxValue: 999999999999,
		                        },
							]
						},
						{
							xtype: 'container',
							layout: {
								type: 'hbox'
							},
							defaults: {
				                labelWidth : 100,
				                labelAlign : 'right',
								margin : '0 5 0 0',
							},
							items: [
								{
		                        	xtype:'textfield',
		                        	fieldLabel : ViewUtil.getLabel('docHeight'),
									width : 300,
									reference:'ctlDocHeight',
									labelAlign: 'right',
									bind: {
			    	   					value: '{theDimension.docHeight}'
			    	   				},
			    	   				maskRe: /[0-9]/,
			    	   				readOnly: true
		                        },
		                        {
		                        	xtype:'numberfield',
		                        	fieldLabel : ViewUtil.getLabel('actHeight'),
									reference:'ctlActHeight',
									flex: 1,
									bind: {
			    	   					value: '{theDimension.actHeight}'
			    	   				},
			    	   				maskRe: /[0-9]/,
			    	   				minValue: 0,
									maxValue: 999999999999,
		                        },
							]
						},
						{
							xtype: 'textfield',
							fieldLabel : ViewUtil.getLabel('checkTime'),
							reference : 'ctlCheckTime',
							width : 300,
							labelWidth : 100,
			                labelAlign : 'right',
							margin : '5 0 0 5',
							editable: false,
							bind: {
								value: '{theDimension.checkedDt}'
		    	    		},
						},
					]
				},
			    ]
			},
			{
				xtype: 'container',
				flex: 1,
				layout: {
					type: 'hbox'
				},
				defaults: {
	                labelWidth : 100,
	                labelAlign : 'right',
	                margin: '5 10 0 5'
				},
				items: [
					{
                        xtype: 'textareafield',
                        fieldLabel:ViewUtil.getLabel('remark'),
                        reference: 'ctlDimensionRemark',
                        bind: '{theDimension.remark}',
                        flex: 1
                    },
			    ]
			},
			{
				xtype: 'container',
				margin: '5 0 5 0',
				layout: {
					type: 'hbox',
					pack: 'center'
				},
				items: [
					{
                        xtype: 'button',
                        reference: 'btnConfirm',
                        text: 'Confirm',
                        listeners: {
							click:'onConfirm_clickHandler'
						}
                    },
			    ]
			}
			],
		});
		
		me.callParent();
	}
});