<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<!-- 분산:포워딩 페이지 : 삭제하지말것!-->
<script type="text/javascript" src="/js/jquery/jquery-1.8.3.min.js"></script>
<!-- 
 -->
</head>
<body>
<form id="frm" name="frm" action="${redirectUrl} " method="POST">
	<input type="hidden" id="redirected" name="redirected" value="Y">
</form>
<script type="text/javascript">
$(document).ready(function(){	$("#frm").submit(); });
</script>
</body>
</html>