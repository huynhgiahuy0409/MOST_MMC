Ext.define('MOST.view.login.Login', {
	extend: 'Ext.form.Panel',
    alias: 'widget.app-login',	

    title: 'MOST' + '+'.sup() + ' Login',

	requires: [
		'MOST.view.login.LoginController',
        'MOST.view.login.LoginModel',
		'Ext.form.Panel',
	],

	controller: 'login',
    viewModel: {
		type: 'login'
	},	
	
	autoSize: true,
    modal: true,
    minWidth: CommonConstants.HHT_MIN_WIDTH,
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'center'	
    },
    listeners: {
    	initialize: 'onShowLoginHHT'
    },

    fullscreen:true,
    
    iconCls: 'ticon-cloud-shipping',
	
    items:[{
    	xtype: 'container',
    	height: 30
    }, {
    	xtype: 'container',
        layout: {
            type: 'vbox',
            align: 'center',
        },
        items: [{
        	xtype: 'image',
        	height: 125,
        	width: 460,
        	src: './resources/images/background/most_logo.png',
        }]
    }, {    
		xtype: 'container',
		height: 30
    }, {
        xtype: 'container',
        flex: 1,
        layout: {
            type: 'vbox',
            align: 'center',
        },
        defaults: {
        	width: 400,
        	labelWidth: 85,
            labelAlign: 'left'
        },
        items: [{
            xtype: 'textfield',
            label: 'User Id',
            reference: 'userid',
            required: true,
            name: 'userid',
            fieldLabel: 'Modern User ID',
            hideLabel: false,
            placeholder: 'input user id',
            allowBlank: false,
            enableKeyEvents: true,
            triggers: {
                glyphed: {
                    cls: 'x-fa fa-user fa-2x txt_blue no_cursor'
                }
            },
            listeners: {
            	specialkey: 'onLoginModern',
            	change:function (ref) {
            		var value = ref.getValue();
            		var cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                    if (cleaned !== value) {
                    	ref.setValue(cleaned, true);
                    }
        		}
            }
        }, 
        {
            xtype: 'textfield',
            label: 'Password',
            reference: 'password',
            required: true,
            name: 'password',
            inputType: 'password',
            fieldLabel: 'Password',
            hideLabel: false,
            placeholder: 'input password',
            allowBlank: false,
            enableKeyEvents: true,
            triggers: {
                glyphed: {
                    cls: 'x-fa fa-lock fa-2x txt_blue no_cursor'
                }
            },
            listeners: {
                specialkey: 'onLoginModern'
            }
        }, 
        {
            xtype: 'combobox',
            //style: 'background: #ffffff;opacity: 0.9;',
            label: 'Language',
            reference: 'language',
            //required: true,
            displayField: 'codeDisplay',
            valueField: 'codeValue',
            store: [
                {codeValue: 'en-US', codeDisplay: 'English'}
            ],
            allowBlank: true,
            editable: false,
            value:'en-US',
			triggers: {
                glyphed: {
                    cls: 'x-fa fa-language fa-2x p10 pr10 txt_bgray no_cursor'
                }
            },
            hidden: true
        }, 
        {
        	xtype: 'datefield',
            header: 'Work Date',
            //style: 'background: #ffffff;opacity: 0.9;',
            label: 'Work Date',
            reference: 'refWorkDate',
            required: true,
            placeholder: 'Input work date',
            dateFormat: 'd-m-Y',
            value: new Date(),
			//hidden: true
        }, 
        {
            xtype: 'combobox',
            //style: 'background: #ffffff;opacity: 0.9;',
            label: 'Shift',
            reference: 'refCboShift',
            required: true,
            placeholder: 'Select shift',
            displayField: 'codeDisplay',
            valueField: 'codeValue',
            bind: {
                store: '{shiftCombo}'
            },
            allowBlank: true,
            editable: false,
			//hidden: true
        }, 
        {
            xtype: 'container',
            margin: '0 15 5 15',
            layout: {
            	type: 'vbox',
            	align: 'right'
            },
            width: 400,
            items: [{     	
	            xtype: 'button',
	            ui: 'action',
	            text: 'LOGIN',
	            reference: 'loginButton',
	            formBind: true,
	            iconCls: 'x-fa fa-user',
	            handler: 'onLoginModern'
            }]
        }, 
        {
        	xtype: 'container',
        	margin: '0 15 5 15',
        	layout: {
        		type: 'vbox',
        		align: 'right'
        	},
        	width: 400,
        	items: [{     	
        		xtype: 'label',
        		reference: 'refMaxDeviceWidth'
        	},{
        		xtype: 'label',
        		reference: 'refMaxWindowWidth'
        	},{
        		xtype: 'label',
        		reference: 'refMaxWindowInnerWidth'
        	}]
        }]
    }]
});