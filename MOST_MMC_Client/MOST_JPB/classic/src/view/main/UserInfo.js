Ext.define('MOST.view.main.UserInfo', {
	extend: 'Ext.panel.Panel',
	
	alias: 'widget.app-userinfo',
	
	requires: [
		'MOST.config.Locale'
	],
	
	reference: 'userInfoRef',
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	defaults: {
		padding: 10
	},
	
	initComponent: function() {
		var me = this;
		Ext.apply(this, {
			items: [{
				xtype: 'form',
				items:[{
					layout: {
						type: 'vbox',
						align: 'stretch'
					},					
					items: [
						{
							layout: {
								type: 'hbox',
								pack: 'end'
							},
							items: [
								{
									xtype: 'button',
									ui: 'delete-button',
									iconCls: 'x-fa fa-key',
									hidden: false,
									text: ViewUtil.getLabel('changepassword'),
									reference:'refBtnChangePassword',
									margin : '0 5 0 0',
									//width : 150,
									listeners: {
										click: 'onChangePassword'
									}
								},
								{
									xtype: 'button',
									iconCls: 'x-fa fa-floppy-o',
									hidden: false,
									text: ViewUtil.getLabel('save'),
									reference:'refSave',
									//margin : '0 5 0 5',
									//width : 100,
									listeners: {
										click: 'onUpdateInfoUser'
									}
								},
							]
						},
						
						{
							padding: '0 5 5 0',	// Top, Right, Bottom, Left
							flex: 1,
							defaults: {
		                        margin: '0 0 5 0',
		                        labelAlign: 'right',
		                        labelWidth: 120,
		                        width: 500
		                    },
							items: [{
								xtype: 'textfield',
								fieldLabel: ViewUtil.getLabel('userRegId'),
								name: 'userId',
								reference: 'refTxtUserId',
								allowBlank: false,
								readOnly: true
							}, {
								xtype: 'textfield',
								fieldLabel: ViewUtil.getLabel('userName'),
								reference: 'refTxtUserName',
								name: 'detailUserName',
								enforceMaxLength: true,
				    			maxLength : 100,
								allowBlank: false,
								// readOnly: true
							}, {
								xtype: 'textfield',
								fieldLabel: ViewUtil.getLabel('partnerCode'),
								reference: 'refTxtPtnrCode',
								name: 'detailPatnerCode',
								enforceMaxLength: true,
								allowBlank: false,
								readOnly: true
							}, {
								xtype: 'textfield',
								fieldLabel: ViewUtil.getLabel('partnerName'),
								reference: 'refTxtPtnrName',
								name: 'detailPatnerName',
								enforceMaxLength: true,
								// allowBlank: false,
								readOnly: true
							},{
								xtype: 'textfield',
								fieldLabel: ViewUtil.getLabel('email'),
								name: 'email',
								reference: 'refTxtEmail',
								vtype: 'email',
				    			// readOnly: true
							},
							{
								xtype: 'textfield',
								fieldLabel: ViewUtil.getLabel('addr'),
								name: 'addr',
								reference: 'refTxtAddr',
				    			// readOnly: true
							},
						]
					},
						
				]
				}]
			}]
		}); 
		
		this.callParent();
	}
	
});