Ext.define('MOST.view.login.AAD', {
	extend: 'Ext.window.Window',
	xtype: 'app-aad',

	requires: [
		'MOST.view.login.AADController',
		'Ext.form.Panel'
	],

	controller: 'aad',
	
	lblTitle: 'MOST' + '+'.sup() + ' Login',
	lblUserId: 'ID',
	lblPassword: 'Password',
	lblLoginButton: 'Login',
	
	closable: false,
    resizable: false,
    autoShow: true,
    titleAlign: 'center',
    maximized: true,
    modal: true,
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'center'	
    },
    
    iconCls: 'ticon-cloud-shipping',
	cls: 'login_body',
	
	initComponent: function() {
		var me = this;
		var logoWidth = 394;
		var logoHeight = 143;
		var logoX = window.innerWidth / 2 - logoWidth / 2;
		var logoY = window.innerHeight / 2 - logoHeight / 2;
		
		Ext.apply(me, {
			title: me.lblTitle,
			header: false,
			layout: {
		        type: 'vbox',
		        align: 'stretch',
		    },
			items:[{
				xtype: 'container',
				flex: 1
			}, {
				xtype: 'container',
				flex: 1,
				items: [{
					xtype: 'image',
					src: './resources/images/background/most_logo.png',
					style: {
						//394 × 143
						cursor: 'pointer',
						position: 'fixed',
						top: '50%',
						left: '50%',
					  	marginLeft: '-197px',
				  		marginTop: '-180px'
					},
					listeners: {
						el: {
							click: 'onLoginClick'
						}
					}
				}]
			}, {
				xtype: 'container',
				height: 67,
				style: {
					backgroundColor: 'white'
				},
				items: [{
					xtype: 'image',
					src: './resources/images/background/brands_most.png',
					style: {
						//1295 × 65
						position: 'fixed',
						
						//Center
						top: '100%',
						left: '50%',
					  	marginLeft: '-648px',
				  		marginTop: '-67px'
				  			
						//Left
//						top: '100%',
//						left: '0%',
//						marginLeft: '4px',
//				  		marginTop: '-67px'
				  			
				  		//Right	
//			  			top: '100%',
//						left: '100%',
//					  	marginLeft: '-1297px',
//				  		marginTop: '-67px'
					}
				}]
			}]
		});

		me.callParent();
	}
});