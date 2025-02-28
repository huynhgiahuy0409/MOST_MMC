<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%
	String servlet = request.getParameter("servletName");
	String printType = request.getParameter("printType");
	//String reportParam = request.getParameter("reportParam");
	
	String serviceId = request.getParameter("serviceId");
	String file = request.getParameter("file");
	String branchCode = request.getParameter("branchCode");
	
	String param1 = request.getParameter("param1") == null?"":request.getParameter("param1");
	String param2 = request.getParameter("param2") == null?"":request.getParameter("param2");
	String param3 = request.getParameter("param3") == null?"":request.getParameter("param3");
	String param4 = request.getParameter("param4") == null?"":request.getParameter("param4");
	String param5 = request.getParameter("param5") == null?"":request.getParameter("param5");
	String param6 = request.getParameter("param6") == null?"":request.getParameter("param6");
	String param7 = request.getParameter("param7") == null?"":request.getParameter("param7");
	String param8 = request.getParameter("param8") == null?"":request.getParameter("param8");
	String param9 = request.getParameter("param9") == null?"":request.getParameter("param9");
	String param10 = request.getParameter("param10") == null?"":request.getParameter("param10");
	
	if(printType == null){
		printType = "";
	}
	
 %>
<html>
	<style type="text/css">
	html,body {
		margin: 0;
		padding: 0;
		height: 100%;
	}
	</style>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<meta http-equiv="cache-control" content="no-store">
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="EXPIRES" content="-1">
<title>PDF-Viewer</title>
<script type="text/javascript">
	function viewerOpen(){
		document.getElementById('viewer').submit();
	}
</script>
</head>
<body onload="viewerOpen()" title="PDF-Viewer">
	<form id="viewer" onload="setTitle()" action=<%=servlet%> method="post" title="PDF-Viewer">
		<input type="hidden" name="file" value="<%=file%>">
		<input type="hidden" name="serviceId" value="<%=serviceId%>">
		<input type="hidden" name="branchCode" value="<%=branchCode%>">
		<input type="hidden" name="printType" value="<%=printType%>">
		<input type="hidden" name="param1" value="<%=param1%>">
		<input type="hidden" name="param2" value="<%=param2%>">
		<input type="hidden" name="param3" value="<%=param3%>">
		<input type="hidden" name="param4" value="<%=param4%>">
		<input type="hidden" name="param5" value="<%=param5%>">
		<input type="hidden" name="param6" value="<%=param6%>">
		<input type="hidden" name="param7" value="<%=param7%>">
		<input type="hidden" name="param8" value="<%=param8%>">
		<input type="hidden" name="param9" value="<%=param9%>">
		<input type="hidden" name="param10" value="<%=param10%>">
	</form>
</body>
</html>