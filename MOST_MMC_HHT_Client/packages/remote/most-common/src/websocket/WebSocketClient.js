/**
 * File: WebSocketClient.js
 * Version: 1.0.0
 * Create by: Robert
 * Date: 2024.03.03
 * Description: handles WebSocket connections.
 * Dependencies: Requires the SockJS and Stomp libraries.
 * Usage: Instantiate the WebSocketClient class and call its methods to interact with a WebSocket server.
 * *************************************************************************************************************
 */

Ext.define('MOST.websocket.WebSocketClient', {
		config: {
			url: '',
			topicAll: '',
			toppicPrefix: '',
			pubPrefix: '',
			client: null,
			disConnected: false,
			interval: 5000, // mili
			wsConnected_: false,
			parent: null
		},
	
		// ------ Constant:
		iWs: {
			URL							: 'http://localhost',
			WS_WEBSOCKET_URL			: '/ws/connect-websocket',
			WS_WEBSOCKET_TOPIC_ALL		: '/ws/topic/all',
			WS_WEBSOCKET_TOPIC_PREFIX	: '/ws/topic',
			WS_WEBSOCKET_PUB_PREFIX		: '/ws/pub',
		},
		
		// ------
		constructor: function(config) {
			var contextRoot = MOST.config.Locale.getServerContextRoot(); //'/MOST_ADP_Web'
			var serverDns = MOST.config.Locale.getServerDns(); //'http://localhost:8080'
			this.config.url = serverDns + contextRoot + '/direct/ws/connect-websocket';
			
			this.initConfig(config);
		},
	
		// ------
		getUrl(){
			return this.url;
		},
		
		setUrl(cUrl){
			this.url = cUrl;
		},
	
		// ------
		getParent(){
			return this.parent;
		},
		
		setParent(cParent){
			this.parent = cParent
		},
		
		// ------
		getClient(){
			return this.client;
		},
		
		setClient(cClient){
			this.client = cClient;
		},
		
		// ------
		getDisConnected(){
			return this.disConnected;
		},
		
		setDisConnected(cDisConnected){
			this.disConnected = cDisConnected;
		},
		
		
		/**
		 * Function:
		 */
		fn_server_: function (servicUrl, pParm) {
			if(servicUrl === undefined) {
				return me.iWs.URL;
			}
	
			if(pParm !== undefined) {
				var nParm = JSON.stringify(pParm);
				return me.iWeb.URL + servicUrl + "?pm="+nParm;
			} else {
				return me.iWeb.URL + servicUrl;
			}
		},
		
		
		fn_ws_connect_default_(parent, topicId, fn_connected, handleMessage, fn_connectErr) {
			this.fn_ws_connect_(parent, topicId, fn_connected, handleMessage, fn_connectErr);
		},
		
		fn_ws_connect_ : function (parent, topicId, fn_connected, fn_handleMessage, fn_connectErr){
			if((this.getClient() != null 
					&& this.getClient() != undefined 
					&& this.getClient().connected)
					|| this.getDisConnected()){
				return;
			}
			//me.setParent(parent);
			// ---
			var me = this, socket = null, client = null;
			var accToken = MOST.config.Token.getAccessToken();
	
			
			socket = new SockJS(me.getUrl() + '?access_token=' + accToken );
			client = Stomp.over(socket);
			//client = Stomp.client(me.getUrl());
			client.debug = () => {};
			
			try {
				client.connect({}, 
						function(frame) { // Connected
							console.log('[WS Client]: Connected: ' + frame);
							wsConnected_ = true;
							fn_connected(parent, me, frame);
							me.disConnected = false;
							
							// ----->subscribe here and call Callback Function
							client.subscribe(me.iWs.WS_WEBSOCKET_TOPIC_ALL, function(messageOutput){
								fn_handleMessage(parent, me, frame, messageOutput)
							});
							console.log("[WS Client]: subscribe Topic all = " + me.iWs.WS_WEBSOCKET_TOPIC_ALL);
							
							var subscribeTopic = '';
							if (topicId != undefined && topicId.length > 0) {
								subscribeTopic = me.iWs.WS_WEBSOCKET_TOPIC_PREFIX + "/" + topicId;
								client.subscribe(subscribeTopic, function(messageOutput){
									fn_handleMessage(parent, me, frame, messageOutput)
								}); /* fn_connected process messsage on Parent */
								console.log("[WS Client]: subscribe Topic = " + subscribeTopic);
							}
						}, 
						function(frame) { // Connect Error
							fn_connectErr(parent, frame);
						}
				)
			} catch (err) {
				console.log(err); // ReferenceError
			}
			
			me.setClient(client);
		},
		
		send: function(destination, headers, body) {
    		var me = this;
    		if (me.getClient().connected) {
    			me.getClient().send(destination, headers, body);
    		} else {
    			console.log('Cannot send message. STOMP client is not connected.');
    		}
    	},
		
		disconnect: function() {
			var me = this;
			if (me.getClient() && me.getClient().connected) {
				me.getClient().disconnect(function() {
					console.log('[WebSocketClient] Disconnected !!!');
				});
			}
		},
		
		/** ************************************************************************************************************ */
//		doConnect: function(parent, fn_connected, fn_connectErr) {
//			var me = this;
//			var socket = null, client = null;
//			me.setParent(parent);
//	
//			//
//			if (parent == undefined) {
//				return;
//			}
//			
//			if((me.getClient() != null 
//					&& me.getClient() != undefined 
//					&& me.getClient().connected)
//					|| me.getDisConnected()){
//				return;
//			}		
//					
//			// var client = Stomp.client(me.getUrl());
//			var socket = new SockJS(me.getUrl());
//			client = Stomp.over(socket);
//	
//			client.connect({}, function(frame) { // Connected
//				connect(parent, me, frame);
//				me.disConnected = false;
//				
//			}, function(frame) { // Connect Error
//				connectErr(frame);
//			})
//			me.setClient(client);
//		},	
//	
//		onConnected: function(parent, me, frame, fn_connected) {
//			fn_connected(parent, me, frame);
//		},
//	
//		onConnectErr: function(frame, fn_connectErr) {
//			fn_connectErr(frame);
//		},
//	
//		onRcvMsg: function(messageOutput) {
//	
//		},
//	

	});