<%
 	// English Chinese Korean
 	String languageType = "en";
 	if(request.getParameter("hdlanguageType") != null && request.getParameter("hdlanguageType") != "") {
  		languageType = request.getParameter("hdlanguageType");
  	}
%>