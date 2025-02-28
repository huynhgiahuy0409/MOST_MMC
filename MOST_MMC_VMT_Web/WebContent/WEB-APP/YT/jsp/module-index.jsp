<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!-- ExtJS 모듈: index.html 호출 -->
<c:import url="/extjs/${path}/index.html" />

<script type="text/javaScript">
 /* CSRF Token 값 */
 fn_csrf_("${_csrf.headerName}", "${_csrf.parameterName}", "${_csrf.token}");
 /* Auth Info */
 fn_oauth_("${access_token}", "${refresh_token}", "${expires_in}", true);
</script>    
