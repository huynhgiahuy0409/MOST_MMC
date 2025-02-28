Ext.define('MOST.view.main.ChangePassword', {
	extend: 'Ext.panel.Panel',
	
	alias: 'widget.app-changepassword',
	
	requires: [
		'MOST.config.Locale'
	],
	
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
						type: 'hbox',
						align: 'stretch'
					},
					items: [{
						padding: '0 5 5 0',	// Top, Right, Bottom, Left
						flex: 1,
						items: [
						{
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'textfield',
									reference: 'refTxtOldPassword',
									fieldLabel:  ViewUtil.getLabel('oldpassword'),
									name: 'txtOldPassword',
									margin: '5 0 0 5',
									inputType: 'password',
									allowBlank: false,
									enforceMaxLength: true,
									maxLength : 20,
									labelWidth: 150
								},
							]
						},
						{
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'textfield',
									reference: 'refTxtPassword',
									fieldLabel:  ViewUtil.getLabel('newpassword'),
									name: 'txtPassword',
									margin: '5 0 0 5',
									inputType: 'password',
									allowBlank: false,
									enforceMaxLength: true,
									maxLength : 20,
									labelWidth: 150
								},
							]
						},
						{
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'textfield',
									itemId: 'txtRePassword',
									fieldLabel: ViewUtil.getLabel('reTypePassword'),
									reference: 'refRetypePassword',
									inputType: 'password',
									margin: '5 0 0 5',
									enforceMaxLength: true,
									maxLength : 20,
									allowBlank: false,
									labelWidth: 150
								},
							]
						},
						{
							xtype: 'fieldcontainer',
							defaultType: 'checkboxfield',
							margin: '5 0 0 5',
							items: [
								{
									boxLabel  : 'Show password',
									reference: 'refShowPassword',
									listeners: {
										change: 'onShowHidePassword'
									}
								}, 
							]
						}
					]
					}]
				}]
			}]
		}); 
		
		this.callParent();
	},
	
	afterRender : function(){
		var me = this;
		me.callParent(arguments);
	}
});