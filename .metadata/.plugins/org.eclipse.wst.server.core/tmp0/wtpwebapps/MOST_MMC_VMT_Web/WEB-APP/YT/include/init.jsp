<%@page language="java" contentType="text/javascript; charset=UTF-8" pageEncoding="UTF-8"%>
	var contextPath = "<%=request.getContextPath() %>";
	var currentVersion = "YT2430";
	var useWeblog = true;
	
	function getWebSocketURL() {
		return iWeb.WS_WEBSOCKET_URL;
	}
	
	$(document).ready(function() {
		initialize();
	});