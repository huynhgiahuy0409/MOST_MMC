Ext.define('MOST.view.codes.CodeMaterDetail', {
	extend: 'Ext.panel.Panel',

	alias: 'widget.app-codemasterdetail',

	requires: [
	],
	
	listeners:{
		afterrender:'onDetailLoad'
	},
	
	layout: {type:'hbox', align:'stretch'},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	
	MAIN_GRID_REF_NAME: 'refDetailCodeGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'codeMaster',
	LARGE_CODE_COMBO_STORE: 'largeCodeCombo',
	MIDDLE_CODE_COMBO_STORE: 'middleCodeCombo',
	LARGE_CODE_COMBO_FOR_GRID_STORE: 'largeCodeComboForGrid',
	MIDDLE_CODE_COMBO_FOR_GRID_STORE: 'middleCodeComboForGrid',
	YES_NO_VALUE_STORE: 'yesNoValue',
	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

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
					xtype: 'container',
	                layout: {
	                    type: 'vbox',
	                },
					margin: '0 0 0 0',
					padding: '10 10 10 10',
	                defaults: {
	                    defaults: {
	                        labelAlign: 'right',
	                        labelWidth: 80,
							margin: '5 0 0 0'
	                    },
	                },
	                items: [
		                {
		                    xtype: 'container',
							margin: '0 0 0 0',
		                    layout: {
								type: 'hbox',
		                    },
		                    items: [
		                    	{
			    					reference : 'refSystemCodeId',
			    					xtype : 'combo',
			    					fieldLabel : ViewUtil.getLabel('lcd'),
			    					emptyText : 'select',
			    					displayField : 'lcdNm',
			    					valueField : 'lcd',
			    					bind : {
			    						store: '{' + me.LARGE_CODE_COMBO_STORE + '}',
			    						value : '{theDetail.lcd}'
			    					},
			    					listeners : {
			    						select : 'onSelectSystemCode',
			    					},
			    					editable : false
			    				},{
									reference : 'cmbCodeEditor',
									xtype : 'combo',
									fieldLabel : ViewUtil.getLabel('mcd'),
									emptyText : 'code',
									displayField: 'mcdNm',
									valueField: 'mcd',
									queryMode: 'local',
									editable : false,
									bind: {
										store: '{' + me.MIDDLE_CODE_COMBO_STORE + '}',
										value : '{theDetail.mcd}'
									},
									listeners : {
			    						change : 'onSelectCodeEditor',
			    					},
								}
							]
		                },{
		                    xtype: 'container',
		                    layout: {
								type: 'hbox',
		                    },                   
		                    items: [
		                    	{
			                        xtype: 'textfield',
			                        reference: 'txtDetailCodeDetail',
			                        fieldLabel: ViewUtil.getLabel('scd'),
			                        width: 510,
			                        maxLength: 10,
			                        listeners: {
			    						change : 'onUpperCase'
			    					},
			    					bind: '{theDetail.scd}',
			    					enforceMaxLength : true,
			                    },{
			                        xtype: 'combo',
			                        reference: 'ctlUseYN',
			                        fieldLabel: ViewUtil.getLabel('useyn'),
			                        queryMode: 'local',
			                        emptyText : 'Yes',
									displayField : 'codeName',
									valueField : 'code',
									bind : {
										store: '{' + me.YES_NO_VALUE_STORE + '}',
										value : '{theDetail.useYn}'
									},
									editable : false
			                    }
			                ]
		                },{
		                    xtype: 'container',
		                    layout: {
								type: 'hbox',
		                    },                   
		                    items: [
		                    	{
			                        xtype: 'textfield',
			                        reference: 'refTxtDetailName',
			                        fieldLabel: ViewUtil.getLabel('name'),                   
			                        maxLength: 50,
			                        allowBlank: false,
			                        bind: '{theDetail.scdNm}',
			                        enforceMaxLength: true,
			                    },{
			                        xtype: 'textfield',
			                        reference: 'refScdDesc',
			                        fieldLabel: ViewUtil.getLabel('description'),                   
			                        maxLength: 100,
			                        bind: '{theDetail.scdDesc}',
			                        enforceMaxLength: true,
			                    },
			                    {
			                        xtype: 'textfield',
			                        reference: 'refExtendCode',
			                        fieldLabel: ViewUtil.getLabel('extendCode'),                   
			                        maxLength: 10,
			                        bind: '{theDetail.extendCd}',
			                        enforceMaxLength: true,
			                    }
			                ]
		                },
		            ]
	            }
			]
		});

		me.callParent();
	}
});