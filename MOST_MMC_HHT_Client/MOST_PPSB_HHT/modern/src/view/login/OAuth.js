Ext.define('MOST.view.login.OAuth', {
	extend: 'Ext.window.Window',
	alias: 'widget.app-oauth',

	requires: [
		'Ext.form.Panel',
//		'MOST.view.login.OAuthController'
	],

//	controller: 'oauth',
//
//	lblTitle: 'Google OAuth Login',
//	lblContent: '<b>Welcome to CASP!</b><br/><br/>' +
//		'Please login with Google Account.<br/><br/>' +
//		'In order to provide personalized service you must login and authorize access to your CASP profile.<br/><br/><br/>',
//	lblKeepIn: 'Keep me logged in',

	initComponent: function() {
		var me = this;

//        var po = document.createElement('script');
//        po.type = 'text/javascript';
//        po.async = true;
//        po.src = 'https://plus.google.com/js/client:plusone.js?onload=start';
//        var s = document.getElementsByTagName('script')[0];
//        s.parentNode.insertBefore(po, s);
//
//		onOAuthListener = function(authResult) {
//			me.controller.onOAuthHandler(authResult);
//		}        
//
//		Ext.apply(this, {
//			title: this.lblTitle,
//			bodyPadding: 10,
//			closable: false,
//			autoShow: true,
//			resizable: false,
//			items: {
//				xtype: 'form',
//				reference: 'form',
//				width: 300,
//				height: 200,
//				items: [{
//					xtype: 'panel',
//					html: this.lblContent
//				}, {
//					xtype: 'dataview',
//					//itemId: 'dataviewItemId',
//	                itemSelector:'div.signinButton',	//to use tpl, the itemSelector should be set first.
//					tpl:[
//					    '<tpl><div id="signinButton">' +
//					      '<span class="g-signin"' +
//					        'data-scope="https://www.googleapis.com/auth/plus.login"' +
//					        'data-clientid="33101164201-riqo7shtapti4s0gqs3p97rt3gvgphrf.apps.googleusercontent.com"' +
//					        'data-redirecturi="postmessage"' +
//					        'data-accesstype="offline"' +
//					        'data-cookiepolicy="single_host_origin"' +
//					        'data-callback="onOAuthListener">' +
//					      '</span>' +
//					    '</div>' +
//					    '<div id="result"></div></tpl>'
//					]
//				}]
//			}
//		});

		this.callParent();
	}
});