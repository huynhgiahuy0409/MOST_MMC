Ext.define('MOST.view.login.Login', {
	extend: 'Ext.window.Window',
	xtype: 'app-login',

	requires: [
		'MOST.view.login.LoginController',
		'MOST.view.login.LoginModel',
		'Ext.form.Panel'
	],

	controller: 'login',
	
	viewModel: {
		type: 'login'
	},
	
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
	
    listeners: {
        afterrender: 'onLoad',
        beforeRender:'onBefore' //added by Brian (2024/08/22) - To support change terminal
    },	
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	LANGUAGE_COMBOBOX_STORE: 'languageCombo', // Language Combo Store
	BRANCH_COMBOBOX_STORE: 'branchCombo',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
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
				flex: 1,
				items:[{
					xtype: 'container',
					height: 240,
					margin:'180 0 0 -50',
					layout: {
				        type: 'hbox',
				        align: 'stretch',
				        pack: 'left'	
				    },
					items: [{
						xtype: 'form',
						bodyPadding: 10,
						width: 500,
						reference: 'form',
						layout: {
					        type: 'vbox',
					        align: 'center',
					        pack: 'center'	
					    },
						items: [{
							xtype: 'textfield',
							reference: 'userid',
							name: 'userid',
							fieldLabel: me.lblUserId,
							hideLabel: true,
							emptyText: me.lblUserId,
							allowBlank: false,
							enableKeyEvents: true,
							width: 250,
							height: 35,
							fieldStyle: 'text-transform:uppercase',
							triggers: {
		                        glyphed: {
		                            cls: 'x-fa fa-user fa-2x p10 pr10 txt_bgray no_cursor'
		                        }
		                    },
							listeners: {
								specialkey: 'onLogin',
								change: function(field, newValue){
						        	   field.setValue(newValue.toUpperCase());
						        }
							}
						}, {
							xtype: 'textfield',
							reference: 'password',
							name: 'password',
							inputType: 'password',
							fieldLabel: me.lblPassword,
							hideLabel: true,
							emptyText: me.lblPassword,
							allowBlank: false,
							enableKeyEvents: true,
							width: 250,
							height: 35,
							triggers: {
		                        glyphed: {
		                            cls: 'x-fa fa-lock fa-2x p10 pr10 txt_bgray no_cursor'
		                        }
		                    },
							listeners: {
								specialkey: 'onLogin'
							}
						},{
							xtype: 'button',
							text: me.lblLoginButton,
							reference: 'loginButton',
							formBind: true,
							iconAlign: 'right',
		                    iconCls: 'x-fa fa-angle-right',
		                    width: 250,
		                    scale: 'large',
							listeners: {
								click: 'onLogin'
							}
						
						},
						{
							xtype: 'combobox',
							hidden: true,
							reference: 'branch',
							name: 'branch',
							hideLabel: true,
							allowBlank: true,
							width: 250,
							height: 35,
							queryMode: 'local',
							editable: false,
							bind:
							{
								store: '{' + me.BRANCH_COMBOBOX_STORE + '}'
							},
							displayField: 'codeName',
							valueField: 'code',
							triggers:
							{
								glyphed:
								{
									cls: 'x-fa fa-arrow-right fa-1x p10 pr10 txt_bgray no_cursor'
								}
							}
						},{
							xtype: 'combobox',
							reference: 'language',
							name: 'language',
							hideLabel: true,
							allowBlank: false,
							width: 250,
							height: 35,
							queryMode: 'local',
							emptyText: '',
							editable:false,
		                    bind: {
		                    	store: '{' + me.LANGUAGE_COMBOBOX_STORE + '}'
		                    },
							displayField: 'codeName',
		                    valueField: 'code',
		                    value:'en-US',
							triggers: {
		                        glyphed: {
		                            cls: 'x-fa fa-language fa-2x p10 pr10 txt_bgray no_cursor'
		                        }
		                    }
						},{
							xtype: 'container',
							flex : 1,
							style: 'background-color:rgba( 255, 255, 255, 0.3 ); ',
//							margin : '5 0 0 0',
							layout : {
								type : 'hbox',
								align : 'stretch',
								pack: 'end'
							},
							defaults: {
								margin: '0 0 0 5',
							},
							items:[
								{
									xtype: 'label',
									width: 175,
									style: 'font-size: 13px; line-height: 40px; font-weight:bold;',
									html: ' Did you forget your password?'
								},
								{
									xtype: 'button',
									scale: 'small',
									iconCls: 'fa fa-key', 
//									text: 'find Password',
									width: 65,
									listeners: {
										click: 'onFindPassword'
									},
								}
								]
						
						}]
					}]
				}]
			}, {
				xtype: 'container',
				flex: 1,
				//fix issue: Forget Password button is hidden by div tag of MOST logo when display in screens which have smaller resolution
				margin: '300 0 0 5',
				items: [{
					xtype: 'image',
					src: './resources/images/background/most_logo.png',
					style: {
						//394 × 143
						position: 'fixed',
						top: '50%',
						left: '50%',
					  	marginLeft: '-197px',
				  		marginTop: '-180px'
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