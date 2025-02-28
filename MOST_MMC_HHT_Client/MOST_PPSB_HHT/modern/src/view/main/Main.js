Ext.define('MOST.view.main.Main', {
	extend : 'Ext.Panel',
//	plugins : 'viewport',
	alias: 'widget.app-main',

	requires: [
		'Ext.Toast',
        'Ext.layout.overflow.Scroller',
        'Ext.scroll.Scroller', 
		'MOST.view.main.MainController',
		'MOST.view.main.MainModel',
   		'Ext.Responsive'
    ],

	uses : [
		'MOST.view.common.VesselSchedulePicker',
		'MOST.view.common.PopupPicker',
		'MOST.view.popup.*',
		'MOST.view.operation.*',
    ],    
    
	xtype : 'app-main',
    
    reference : 'main',
    itemId: 'main',    
    
    controller: 'main',
	viewModel: {
		type: 'main'
	},    
    
    defaults: {
        tab: {
            iconAlign: 'top'
        }
    },
    
    profiles: {
        defaults: {
            buttonShadow: true,
            height: 300,
            width: 400,
            shadow: true
        },
        ios: {
            buttonShadow: undefined
        },
        modern: {
            defaults: {
                height: undefined,
                width: undefined
            }
        }
    },    
    
    responsiveFormulas: {
        small: 'width < 800',
        large: 'width >= 800',
    },	    
    
    shadow: false,
    autoSize: true,
    layout: 'fit',
    padding: 0,    
    fullscreen: true,
    
    
    items: [{
        //main header
        xtype: 'app-mainheader',
    }, {
        xtype: 'tabpanel',
        reference: 'refMainTab',
        shadow: 'true',
        tabBar: {
            layout: {
                pack: 'start',
                overflow: 'scroller'
            }
        },
        layout: {
        	animation: null
        },
        tabBarPosition: 'top',    
        defaults: {
            scrollable: true,
            layout: 'fit',
            userCls: 'card',
            tab: {
                minWidth: 150,
                ui: 'md-tab'    
            },
        },
        items: [{
			title: 'Schedule',
			itemId: 'scheduleTabItemId',
			iconAlign: 'left',
			iconCls: 'x-fa fa-ship',
			width: 100,
			xtype: 'panel',
			layout: 'fit',
			items:[{
				xtype: 'app-vesselschedulePicker'
			}]
        }]
    }]

});
 