Ext.define('MOST.view.planning.TerminalView', {
	extend: 'Ext.panel.Panel',
	
    alias: 'widget.app-terminalview',
    
    controller: 'terminalview',

    viewModel: {
		type: 'terminalview'
	},
	
    requires: [
        'TSB.gux.terminal.TerminalRenderer',
    ],
      
    layout : {type  : 'vbox', align : 'stretch'},

    listeners : {
        afterrender : 'onLoad'
    },

    initComponent: function() {
    	var me = this;
 
    	Ext.apply(me, {
		    items: [{
               xtype: 'panel',
               height: '100%',
               flex: 1,
               reference: 'refTerminalLayout',
               layout: {
                   type: 'absolute'
               },
               scrollable: true
            }],
            
            dockedItems : [{
                xtype: 'container',
                style: { "background-color":"white" },
                layout: {
                    type: 'hbox',
                },
                defaults: {
                    margin: '1 5 1 1'
                },
                items: [{
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    itemId: 'inquiryItemId',
                    reference:'refBtnRetrieve',
                    text: ViewUtil.getLabel('search'), 
                    iconCls: 'x-fa fa-search',
                    cls: 'search-button', 
                    listeners: {
                        click: 'onSearch'
                    }
                
                }
            ]},{
                xtype: 'toolbar',
                dock: 'top',
                margin: '1 0 0 0',
                hidden: false,
                defaults: {
                    labelAlign: 'right'
                },
                items : [
            	{
                    xtype: 'checkboxfield',
                    boxLabel: 'Inc. Planned Storage',
                    reference: 'refIncPlannedStorage',
                    listeners: {
                    	change: 'onPlannedCheck'
                    }
                },{  // fit to screen
                    xtype: 'checkboxfield',
                    boxLabel: ViewUtil.getLabel('keepFitBlockToWindow'),
                    name: 'fitWindow',
                    reference: 'refFit',
                    checked: true,
                    listeners: {
                        change: 'onFitToScreenChecked'
                    }
                },{ // zoom buttons
                    xtype:'button',					
                    text: ViewUtil.getLabel('zoom'),
                    iconCls: 'x-fa fa-search-plus',
                    arrowAlign:'right',
                    tooltip: ViewUtil.getLabel('zoom'),
                    menu: [{ 
                        xtype: 'segmentedbutton',
                        vertical: false,
                        items:[{
                            text: '-20%', 
                            tooltip: 'Zoom Out (-20%)',
                            handler: 'onZoomLayout',
                            value: '-20'
                        }, {
                            xtype: 'button',
                            text: '100%',
                            tooltip: 'Zoom to 100%',
                            handler: 'onZoomLayout',
                            value: 100,
                            pressed: true
                        }, {
                            text: '+20%', 
                            tooltip: 'Zoom In (+20%)',
                            handler: 'onZoomLayout',
                            value: '20'
                        }]
                    }]		
                },{
	                xtype: 'button',
	                text: ViewUtil.getLabel('filtering'),
	                reference: 'refWarehouseFilter',
	                listeners: {
	                	click: 'onOpenFiltering'
	                },
	                hidden: true
                },{
                	xtype: 'textfield',
                	reference: 'txtFilteringText',
                	editable: false,
                	width: 700,
                	hidden: true
                }]
            }]
	   });
		
	   me.callParent();
    },
    
    afterRender : function(){
        var me = this;
        var ref = me.getReferences().refTerminalLayout;

        me.getController().onLoad();
        
        ref.getScrollable().on("scroll", me.getController().onScroll, me.getController());
        ref.on("resize", me.getController().onResize, me.getController());

        me.callParent(arguments);
    }
});