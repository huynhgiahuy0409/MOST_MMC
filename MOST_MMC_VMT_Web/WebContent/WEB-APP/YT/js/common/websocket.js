/**
 * JQuery WebSocket Plug-in
 * reference http://jquery-websocket.googlecode.com/files/jquery.websocket-0.0.1.js
 * 
 * @author  Mr Tonny Kim
 * @version 1.0
 * @date    2012-06-11
 */
var wsUrl = iWeb.WS_WEBSOCKET_URL;

(function($){
$.extend({
	websocketSettings: {
		open: function(){},
		close: function(){},
		error: function(){},
		message: function(){},
		options: {},
		events: {}
	},
	websocket: function(url, s) {
		var ws = WebSocket ? new WebSocket( url ) : {
			send: function(m){ return false; },
			close: function(){}
		};
		$(ws)
			.bind('open', $.websocketSettings.open)
			.bind('open', function(e){
				$.websocketSettings.open(e);
			})
			.bind('close', $.websocketSettings.close)
			.bind('close', function(e){
				$.websocketSettings.close(e);
			})
			.bind('error', $.websocketSettings.error)
			.bind('error', function(e){
				$.websocketSettings.error(e);
			})
			.bind('message', $.websocketSettings.message)
			.bind('message', function(e){
				var m = $.evalJSON(e.originalEvent.data);
				var h = $.websocketSettings.events[m.type];
				if (h) h.call(this, m);
			});
		ws._settings = $.extend($.websocketSettings, s);
		ws._send = ws.send;
		ws.send = function(type, data, callback) {
			var m = {type: type};
			m = $.extend(true, m, $.extend(true, {}, $.websocketSettings.options, m));
			if (data) m['data'] = data;
			if (callback) {
			  m['callback'] = getFunctionName(callback);
			  //m['callback'] = callback.name;	// 콜백함수 이름
			}
			var languageType = (getSessionItem('languageType')==null)?"Korean":getSessionItem('languageType');
			m['languageType'] = languageType;
			return this._send($.toJSON(m));
		};
		
		$(window).unload(function(){ ws.close(); ws = null; });
		return ws;
	}
});
})(jQuery);
