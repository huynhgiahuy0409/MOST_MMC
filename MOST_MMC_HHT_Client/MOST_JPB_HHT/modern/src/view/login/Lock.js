Ext.define('MOST.view.login.Lock', {
	extend: 'Ext.window.Window',
	xtype: 'app-lock',

	requires: [
//		'MOST.view.login.LoginController',
		'Ext.form.Panel'
	],

	controller: 'login',
	
//	lblTitle: 'Locked',
//	lblUserId: 'ID',
//	lblPassword: 'Password',
//	lblLoginButton: 'Login',
//	
//	closable: false,
//    resizable: false,
//    autoShow: true,
//    titleAlign: 'center',
//    maximized: true,
//    modal: true,
//    layout: {
//        type: 'vbox',
//        align: 'stretch',
//        pack: 'center'	
//    },
    
//    iconCls: 'ticon-cloud-shipping',
//	cls: 'login_body',
	
	initComponent: function() {
		var me = this;
//		var logoWidth = 394;
//		var logoHeight = 143;
//		var logoX = window.innerWidth / 2 - logoWidth / 2;
//		var logoY = window.innerHeight / 2 - logoHeight / 2;
		
//		Ext.apply(me, {
//			title: me.lblTitle,
//			header: false,
//			layout: {
//		        type: 'vbox',
//		        align: 'stretch',
//		    },
//			items:[{
//				xtype: 'container',
//				flex: 1,
//				items:[{
//					xtype: 'container',
//					height: 200,
//					layout: {
//				        type: 'hbox',
//				        align: 'stretch',
//				        pack: 'left'	
//				    },
//					items: [{
//						xtype: 'form',
//						bodyPadding: 10,
//						width: 500,
//						reference: 'form',
//						layout: {
//					        type: 'vbox',
//					        align: 'center',
//					        pack: 'center'	
//					    },
//						items: [{
//							xtype: 'textfield',
//							reference: 'password',
//							name: 'password',
//							inputType: 'password',
//							fieldLabel: me.lblPassword,
//							hideLabel: true,
//							emptyText: me.lblPassword,
//							allowBlank: false,
//							enableKeyEvents: true,
//							width: 250,
//							height: 35,
//							triggers: {
//		                        glyphed: {
//		                            cls: 'x-fa fa-lock fa-2x p10 pr10 txt_bgray no_cursor'
//		                        }
//		                    },
//							listeners: {
//								specialkey: function(f,e){
//									if(e.getKey() == e.ENTER){
//										me.getController().onLoginClick(null, null, null, TokenConfig.getUserId(), me);
//									}
//								}
//							}
//						}, {
//							xtype: 'button',
//							text: me.lblLoginButton,
//							formBind: true,
//							iconAlign: 'right',
//		                    iconCls: 'x-fa fa-angle-right',
//		                    width: 250,
//		                    scale: 'large',
//							listeners: {
//								click: function(f,e){
//									me.getController().onLoginClick(null, null, null, TokenConfig.getUserId(), me);
//								}
//							}
//						}]
//					}]
//				}]
//			}, {
//				xtype: 'container',
//				flex: 1,
//				items: [{
//					xtype: 'image',
//					src: './resources/images/background/' + CONSTANTS.CUSTOMER + '/logo.png',
//					style: {
//						//394 × 143
//						position: 'fixed',
//						top: '50%',
//						left: '50%',
//					  	marginLeft: '-197px',
//				  		marginTop: '-180px'
//					}
//				}]
//			}, {
//				xtype: 'container',
//				height: 67,
//				style: {
//					backgroundColor: 'white'
//				},
//				items: [{
//					xtype: 'image',
//					src: './resources/images/background/' + CONSTANTS.CUSTOMER + '/brands.jpg',
//					style: {
//						//1062 × 65
//						position: 'fixed',
//						
//						//Center
//						top: '100%',
//						left: '50%',
//						marginLeft: '-531px',
//				  		marginTop: '-67px'
//				  			
//						//Left
////						top: '100%',
////						left: '0%',
////						marginLeft: '4px',
////				  		marginTop: '-67px'
//				  			
//				  		//Right	
////			  			top: '100%',
////						left: '100%',
////					  	marginLeft: '-1297px',
////				  		marginTop: '-67px'
//					}
//				}]
//			}]
//		});

		me.callParent();
	}
});