Ext.define('MOST.view.main.Main', {
	extend : 'Ext.panel.Panel',
	plugins : 'viewport',
	alias: 'widget.app-main',
	requires : [ 
		'Ext.rtl.*',
		'Ext.window.Toast',
		'Ext.draw.plugin.SpriteEvents',
		'Ext.container.Viewport',
		'MOST.view.main.MainController', 
		'MOST.view.main.MainModel',
		'MOST.view.main.Header',
		'MOST.view.main.SettingVessels',
		'MOST.view.main.Profile',
		'TSB.ux.menu.TreeMenu',
		'MOST.view.login.Login',
		'Ext.ux.TabReorderer'
	],

	uses : [
	    'MOST.view.*'	    
    ],

	xtype : 'app-main',
	controller : 'main',
	viewModel : {
		type : 'main'
	},
	
	layout: {
		type: 'border',
		align: 'stretch'
	},
	
	reference : 'main',
	itemId: 'main',
	 
	lblProjectTitle : CONSTANTS.PROJECT_TITLE,
	lblDashboard : 'Workspace',
	lblInbox : 'Inbox',

	initComponent : function() {
		var me = this;
		
		//remove scroll bar of Browser window
		Ext.getBody().setStyle('overflow', 'hidden');	
		
		Ext.apply(me, {
			rtl : MOST.config.Locale.getRtl(),

			items: [{
		        region: 'west',
		        split: true,
		        collapsible: true,
		        header: true,
		        iconCls: 'ticon-cloud-shipping',
		        title: CONSTANTS.PROJECT_TITLE,
		        border: false,
		        bodyStyle: 'background: #32404e;',
		        width: CONSTANTS.MENU_EXPANDED_WIDTH,
//		        scrollable: 'y',	//When layout=fit, it does not working
		        autoScroll: true,
		        stateful: true,
		        layout: {
		        	type: 'vbox',
		        	align: 'stretch'
		        	
		        },
		        animCollapse: false,
	        	reference: 'refmenu',
	        	listeners: {
					expand: 'onMenuExpandCollapse',
					collapse: 'onMenuExpandCollapse',
					float: 'onMenuFloat'
				}, 	
		        stateId: 'stateMainMenu',
                stateful: true
		    }, {
		        region: 'center',
		        reference: 'refMainCenterBorder',
		        layout: {
		    		type: 'border',
		    		align: 'stretch'
		    	},
		    	items: [{
			    	region: 'north',
			    	split: false,
			    	border: false,
			    	xtype: 'app-mainheader'
			    },{
			    	region: 'center',
		    		xtype : 'tabpanel',
		    		plugins: ['tabreorderer'],
		    		layout: 'fit',
		    		plain: false,
		    		reference : 'ref-maintab',
		    		items : [
//			    		{
//			    			xtype: 'app-workspace',
//			    			title : 'Main',
//			    			id: 'menu_app-workspace'
//			    		}
		    		],
		    		listeners: {
		    			tabchange: 'onTabChange'
		    		}
		    	}]
		    }]
		});

		this.callParent();
	},

	beforeRender : function(){
		var me = this;
		me.getController().onLoad();
		me.callParent(arguments);
	}
});
 