Ext.define('MOST.view.main.Header', {
	extend: 'Ext.toolbar.Toolbar',

	alias: 'widget.app-mainheader',

	requires: [
	],
	
    height: CONSTANTS.MAIN_HEADER_HEIGHT,
	BRANCH_COMBOBOX_STORE: 'branchCombo',
    itemId: 'headerBar',
	
	logout: {type: 'bundle', key: 'logout'},
	
	initComponent: function() {
		var me = this;
    	
		Ext.apply(me, {
            items: [{
	            	xtype: 'image',
	            	reference: 'refCustomerLogo'
	            },{
					xtype: 'combobox',
					hidden: true,
					reference: 'branch',
					name: 'branch',
					hideLabel: true,
					width: 150,
					height: 30,
					queryMode: 'local',
					editable:false,
                    bind: {
                    	store: '{' + me.BRANCH_COMBOBOX_STORE + '}'
                    },
					displayField: 'codeName',
                    valueField: 'code',
					listeners: {
						change: 'onChangeTerminal'
					}
	            
				}, '->', {
					iconCls: 'x-fa fa-bell-o',
					reference: 'refAlerting',
					ui: 'header',
					tooltip: 'Alerting',
					listeners: {
						click: 'alerting'
					}
				},{
                    iconCls:'x-fa fa-star-o',
                    reference: 'refFavoriteMenu',
                    ui: 'header',
                    tooltip: 'Favorite',
                    disabled: true,
                    hidden: true,
                    handler: 'onFavoriteClick'
                }, {
                    iconCls:'fa fa-ship',
                    reference: 'refSetttingVessels',
                    ui: 'header',
                    tooltip: 'Setting configuration',
                	listeners: {
             			click: 'onShowSetVessels'
             		}
                }, {
                	ui: 'header',
                	iconCls:'x-fa fa-user txt_base',
                	tooltip: 'Click to see your Profile',
                    bind: {
                    	text: '{profileName}'
                    },
                    listeners: {
            			click: 'onShowUserInfo'
            		}
                }, {
                    iconCls:'x-fa fa-sign-out',
                    ui: 'header',
                    tooltip: 'Logout',
                	listeners: {
             			click: 'logout'
             		}
                }
            ]
		
		});
		
		me.callParent();
	}
	
});