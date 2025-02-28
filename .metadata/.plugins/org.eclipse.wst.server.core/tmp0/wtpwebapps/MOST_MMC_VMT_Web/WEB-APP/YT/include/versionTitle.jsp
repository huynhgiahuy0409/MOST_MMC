<%
	String dynamicId = request.getParameter("pageId");
    if(dynamicId == null)
    	dynamicId = "indexPage";
%>
<span style="width: 100%; float: none;">
<span id="versionTitle" style="font-size:12px; font-weight: bold;">version 4.5</span>&nbsp;
<span id="<%=dynamicId%>connectionStateTitle"></span>
</span>