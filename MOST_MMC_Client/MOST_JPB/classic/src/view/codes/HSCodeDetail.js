Ext.define("MOST.view.codes.HSCodeDetail",{
	extend: "Ext.panel.Panel",
	
	alias: 'widget.app-hscodedetail',
	requires: 
	[
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	width: 1000,
	height: 150,
	
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refDGCodeGrid',
	MAIN_STORE_NAME: 'dangerousGoodsCodes',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	listeners:{
		afterrender: 'onDetailLoad'
	},
	
	layout:
	{
		type:'hbox',
		align:'stretch',
		flex:1
	},
	initComponent: function() {
		var me = this;
		Ext.apply(this, {
			xtype:'container',
			defaults: {
        		labelAlign: 'right',
        		flex:1,
                margin: '2 0 0 0'// top, right, bottom, left
            },
			layout : {
				type: 'hbox',
				align: 'stretch'
			},
			items: [
			{
                xtype: 'fieldset',
                title: "HS Code",
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items:[
	  				//ROW 1
					{	
	                 	xtype: 'container',
	                    flex: 1,
	                    defaults: {
	                        labelAlign: 'right',
	                        margin: '2 0 0 0'
                    },
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [{
                        xtype: 'textfield',
                        reference: 'txtHsCdDiv',
                        width: 250,
                        fieldLabel: "Gubun",
                        name: 'hsCdDiv',
                        bind: '{theMain.hsCdDiv}'
                        ,allowBlank: false
                        ,maxLength: 1
                        ,enforceMaxLength: true
                    },{
                        xtype: 'textfield',
                        reference: 'txtHsCode',
                        width: 250,
                        fieldLabel: ViewUtil.getLabel('hsCode'),
                        name: 'hsCode',
                        bind: '{theMain.hsCode}'
                        ,allowBlank: false
                        ,maxLength: 11
                        ,enforceMaxLength: true
                    }]
                },
                //ROW 2
               	 	{	
	                 	xtype: 'container',
	                    flex: 1,
	                    defaults: {
	                        labelAlign: 'right',
	                        margin: '2 0 0 0'
                    },
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [{
                        xtype: 'textfield',
                        reference: 'txtHsNm',
                        width: 250,
                        fieldLabel: "HS Name",
                        name: 'hsNm',
                        bind: '{theMain.hsNm}'
                        ,maxLength: 900
                        ,enforceMaxLength: true
                    },{
                        xtype: 'textfield',
                        reference: 'txtUnit',
                        width: 250,
                        fieldLabel: 'Unit',
                        name: 'unit',
                        bind: '{theMain.unit}'
                        ,maxLength: 10
                        ,enforceMaxLength: true
                    }]
                	},
                	
                	//ROW 3
                	{	
	                 	xtype: 'container',
	                    flex: 1,
	                    defaults: {
	                        labelAlign: 'right',
	                        margin: '2 0 0 0'
                    },
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [{
                        xtype: 'textfield',
                        reference: 'txtChpt',
                        width: 250,
                        fieldLabel: "CHPT",
                        name: 'chpt',
                        bind: '{theMain.chpt}'
                        ,maxLength: 10
                        ,enforceMaxLength: true
                    }]
                	},
                ],
                
                
            }]
		});
		me.callParent();
	}
});
