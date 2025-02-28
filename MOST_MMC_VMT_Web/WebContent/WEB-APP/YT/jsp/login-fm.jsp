<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"     uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>토탈소프트뱅크</title>
	<meta name="description" content="Iot 기반 지능형 항만물류 기술개발 / ioTOS:클라우드 기반 터미널운영시스템 개발">
	<link rel="shortcut icon" href="/MOST_MMC_VMT_Web/WEB-APP/YT/favicon.ico" type="image/x-icon" />
	<link rel="icon" href="MOST_MMC_VMT_Web/WEB-APP/YT/favicon.ico" type="image/x-icon" />

	<meta property="og:title" content="토탈소프트뱅크:ioTOS"/>
	<meta property="og:description" content="Iot 기반 지능형 항만물류 기술개발 / ioTOS:클라우드 기반 터미널운영시스템 개발"/>
	<meta property="og:image" content="/img/og_img.jpg"/>
	<meta property="og:url" content="http:///www.tsb.co.kr"/>
	
	<link href="/css/common.css" rel="stylesheet">
	<script type="text/javascript">
		/* 로그인  */ 
		function fn_do_login_() {
			var fm = document.loginfm;
			var u_id = fm.user_id.value;
			if(!u_id) {
				alert("사용자 아이디를 입력!");
			} else {
				var u_pwd = fm.user_pwd.value;
				if(!u_pwd) {
					alert("비밀번호를 입력!");
				} else {
					var u_id64 = btoa(u_id);
					var u_pwd64 = btoa(u_pwd);
					fm.username.value = u_id64;
					fm.password.value = u_pwd64;
					
					if(fm) {
						fm.action = "/common/login-proc";
						fm.method = "POST";
						fm.submit();
					}
				}				
			} 
		}	
	</script>
</head>
<body style="background-image: url('/img/tsb_bg_01.jpg');">
     <div class="container">
      <form class="form-signin" name="loginfm">
        <h1 style="color:#FFF;">ioTOS sign in</h1>
        <p>
          <input type="text" id="user_id" placeholder="Username" required autofocus>
        </p>
        <p>
          <input type="password" id="user_pwd" placeholder="Password" required>
        </p>
	    <input type="hidden" id="username" name="username" value="">
	    <input type="hidden" id="password" name="password" value="">
	    <input type="hidden" id="login_csrf" name="${_csrf.parameterName}" value="${_csrf.token}">
        <button class="btn-s" onclick="fn_do_login_();">Sign in</button>
      </form>
	</div>
</body>
</html>