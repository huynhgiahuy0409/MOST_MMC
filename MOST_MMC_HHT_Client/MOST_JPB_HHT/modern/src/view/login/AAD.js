Ext.define('MOST.view.login.AAD', {
	extend: 'Ext.form.Panel',
//	xtype: 'app-aad',
	alias: 'widget.app-aad',

	requires: [
//		'MOST.view.login.AADController',
	    'Ext.form.Panel',
//	    'Ext.Toast',
//	    'Ext.MessageBox'
	],
  
//	controller: 'aad',
//	title: 'MOST' + ' Login',
//
//	autoSize: true,
//	modal: true,

	layout: {
	    type: 'vbox',
	    align: 'stretch',
	    pack: 'center'	
	},

	fullscreen:true,
    
//    iconCls: 'ticon-cloud-shipping',
//    cls: 'login_body',    
    
//    items:[{
//        xtype: 'image',
//        src: './resources/images/background/' + CONSTANTS.CUSTOMER + '/logo.png',
//        style: "cursor:'pointer';position: 'fixed',width:250px;height:100px;top: -38%; left: 0%",
//        listeners: {
//            element: 'element',
//            click: 'onLoginClick'
//        }
//    }]
	
	
	
//	initComponent: function() {
//		var me = this;
//		var logoWidth = 394;
//		var logoHeight = 143;
//		var logoX = window.innerWidth / 2 - logoWidth / 2;
//		var logoY = window.innerHeight / 2 - logoHeight / 2;
//		
//		Ext.apply(me, {
//			title: me.lblTitle,
//			header: false,
//			layout: {
//		        type: 'vbox',
//		        align: 'stretch',
//		    },
//
//		});
//
//		me.callParent();
//	}
});