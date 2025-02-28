Ext.define('MOST.view.codes.DelayCodeDetail',{
	extend : 'Ext.form.Panel',
	alias : 'widget.app-delaycodedetail',
	
	requires: [],

	listeners:{
		afterrender: 'onDetailLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refDelayCodeGrid',	// Main Grid Name 
	MAIN_STORE_NAME: 'delayCodeGridList',	// Main Store Name
	DELAYCATEGORY_COMBOBOX_STORE: 'delayCodeCategoryCodeCombo',
	ACCEPTYN_STORE: 'AcceptYnCombo',
	DELAYCODEBULKTYPE_COMBOBOX_STORE: 'delayCodeBulkTypeCombo',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout : {type : 'vbox',align : 'stretch'},

	initComponent: function() {
		var me = this;

		Ext.apply(me, {
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            margin: '0 0 0 0',
			items: [
				{
	                layout: {
	                    type: 'vbox',
	                },
	                margin: '4 4 4 4',
	                defaults: {
	                    labelAlign: 'right',
	                    labelWidth: 81,
	                    margin: '2 2 2 2',
	                    defaults: {
	                        labelAlign: 'right',
	                        labelWidth: 81,
	                    },
	                },
	                items: [
		                {
		                    xtype: 'container',
		                    layout: {
								type: 'hbox',
		                    },
		                    items: [
		                    	{
			    					reference : 'refdlyCatgCd',
			    					xtype : 'combo',
			    					fieldLabel : ViewUtil.getLabel('DCCategoryCd'),
			    					labelWidth: 130,
			    					displayField : 'comName',
			    					valueField : 'comCode',
			    					queryMode: 'local',
			    					bind : {
			    						store : '{' + me.DELAYCATEGORY_COMBOBOX_STORE + '}',
			    						value : '{theDetail.dlyCatgCd}'
			    					},
			    					editable : false
			    				},{
									reference : 'refdlyCd',
									xtype : 'textfield',
									maxLength: 4,
									enforceMaxLength: true,
									fieldLabel : ViewUtil.getLabel('DCCode'),
									bind: '{theDetail.dlyCd}',
									listeners: {
										change : 'onChange'
									}
								}
			    			]
		                },{
		                    xtype: 'textfield',
		                    reference: 'refDesc',
		                    labelWidth: 130,
		                    width: 550,
		                    fieldLabel: ViewUtil.getLabel('DCDesc'), 
		                    maxLength:50,
							enforceMaxLength: true,
							bind: '{theDetail.descr}',
		                    listeners: {
								change : 'onUpperCase'
							},
		                },{
		                    xtype: 'container',
		                    layout: {
								type: 'hbox',
		                    },
		                    items: [
		                    	{
			    					reference : 'refbulkTp',
			    					xtype : 'combo',
			    					fieldLabel : ViewUtil.getLabel('DCBulkType'),
			    					labelWidth: 130,
			    					displayField : 'scdNm',
			    					valueField : 'scd',
			    					queryMode: 'local',
			    					bind : {
			    						store : '{' + me.DELAYCODEBULKTYPE_COMBOBOX_STORE + '}',
			    						value : '{theDetail.bulkTp}'
			    					},
			    					editable : false
			    				},{
									reference : 'refchagYN',
									xtype : 'combo',
			    					displayField : 'codeName',
			    					valueField : 'code',
			    					queryMode: 'local',
									fieldLabel : ViewUtil.getLabel('DCAccept'),
									bind : {
			    						store : '{' + me.ACCEPTYN_STORE + '}',
			    						value : '{theDetail.chagYN}'
			    					},
			    					editable : false
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