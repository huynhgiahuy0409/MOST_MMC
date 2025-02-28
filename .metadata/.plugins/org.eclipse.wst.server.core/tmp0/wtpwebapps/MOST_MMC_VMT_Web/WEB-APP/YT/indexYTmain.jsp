<%@page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%
	response.setHeader("Pragma", "No-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Expires", "0");
%> 

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Cache-Control" content="no-cache"/> 
	<meta http-equiv="Expires" content="0"/> 
	<meta http-equiv="Pragma" content="no-cache"/> 
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=yes" />
	<title>Yard Tractor</title>
	
	<!-- Include Part -->
	<%@ include file="/WEB-APP/YT/include/commonYtIncludex.jsp" %>
	
	<!-- Javascript Import -->
	<%@ include file="./js/mainYT.jsp" %>
	
	<!-- CacheService 초기화/코드 목록 불러오기 -->
    <script type="text/javascript" src="<%=request.getContextPath() %>/WEB-APP/YT/js/code/CacheService.js"></script>
    
    <!-- Added by MS.Kim (2022.10.24) 0133809: Lift Off Button -->
    <!-- LiftOff/Stoppage Button 사용 여부 -->
    <script>
		let useLiftOff = "${useLiftOff}";
		let useStoppage = "${useStoppage}";
	</script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"></script>
	<script type="text/javascript" src="https://unpkg.com/blueimp-md5@2.19.0/js/md5.js"></script>
</head>
<body>

<!-- Home -->
<div id="indexYtPage" data-role="page" >

	<!-- Header Part -->
	<div data-role="header" data-theme="b"  style="text-align: center; height: 60px; padding-top: 8px;">
		<span style="font-size:35px; font-weight: bold;">Login </span>

		<jsp:include page="./include/versionTitle.jsp" flush="true">
		 	<jsp:param name="pageId" value="indexYtPage"/> 
		</jsp:include>
	</div>

	<!-- Content Part -->
	<div style="text-align: right;" data-role="content" >
		
		<div class="ui-grid-b ui-responsive" > 
			<div class="ui-block-a" style="width: 35%">
				<label for="txUserId" style="margin-top: 30px;margin-right: 10px; font-size: 30px;"><%=MessageResource.getInstance().getMessage("LBCM-000", languageType) %></label>
			</div>
			<div class="ui-block-b" style="width: 60%; height: 80px !important">
				<input id="txUserId" class="ui-bar ui-bar-c loginTextFieldCompStyle" value="" type="text" placeholder='<%=MessageResource.getInstance().getMessage("LBCM-031", languageType)%>' maxlength="10" required="required">
			</div>
			<div id = "divlblPassword" class="ui-block-a" style="width: 35%">
				<label id="lblPassword" for="txPassword" style="margin-top: 30px;margin-right: 10px; font-size: 30px;"><%=MessageResource.getInstance().getMessage("LBCM-001", languageType) %></label>
			</div>
			<div id = "divtxPassword" class="ui-block-b" style="width: 60%; height: 80px !important">
				<input id="txPassword" class="ui-bar ui-bar-c loginTextFieldCompStyle" value="" type="password" placeholder='<%=MessageResource.getInstance().getMessage("LBCM-032", languageType)%>' maxlength="20" required="required" autocomplete="off">
			</div>
			<div class="ui-block-a" style="width: 35%">
				<label for="txYardTruckNo" style="margin-top: 30px;margin-right: 10px; font-size: 30px;"><%=MessageResource.getInstance().getMessage("LBYT-000", languageType) %></label>
			</div>
			<div class="ui-block-b" style="width: 60%; height: 90px !important">
				<input id="txYardTruckNo" class="ui-bar ui-bar-c loginTextFieldCompStyle" value="" type="text" placeholder='<%=MessageResource.getInstance().getMessage("LBCM-033", languageType)%>' readonly="readonly">
			</div>
			<div class="ui-block-a" style="width: 35%">
			</div>
			<div class="ui-block-b" style="width: 60%; height: 80px !important; padding-right: 10px;">
				<div data-role="button" id="btnYardTruckNo" data-inline="true" data-theme="c" class="ytselectBtnStyle" ><%=MessageResource.getInstance().getMessage("LBYT-000", languageType) %></div>
			</div>
<!-- 			<div class="ui-block-a" style="width: 35%"> -->
<%-- 				<label for="cbLanguageType" style="margin-top: 20px;margin-right: 10px; font-size: 30px;"><%=MessageResource.getInstance().getMessage("LBGT-016", languageType) %></label> --%>
<!-- 			</div> -->
<!-- 			<div class="ui-block-b" style="width: 60%; height: 250px !important; padding-right: 10px;"> -->
<!-- 				<select id="cbLanguageType" class="cbLanguageTypeCompStyle" data-mini="true" > -->
<%-- 					<option value="ko" <%if(languageType.equals("ko")){ %>selected <%} %>>한국어</option> --%>
<%-- 					<option value="en" <%if(languageType.equals("en")){ %>selected <%} %>>English</option> --%>
<!-- 				</select> -->
<!-- 			</div> -->
		</div>
	</div>

	<!-- Footer Part -->
	<div data-role="footer" data-theme="b" data-position="fixed" data-tap-toggle="false"  >
		<!-- modified by jaeok (2021.02.09) 비밀번호 변경 버튼 제거. HJNC에서는 YT사용자 비밀번호는 고정으로 사용
		<div class="ui-grid-a">
	    	<div class="ui-block-a">
	    		<button href="#" id="btLogin" data-theme="e" style="text-align:center;" ><span class="buttonTextLarge"><%=MessageResource.getInstance().getMessage("LBCM-002", languageType) %></span></button>
	    	</div>
	    	<div class="ui-block-b">
	    		<button id="btnChangePassword" data-theme="f" class="confirm"><span class="buttonLarge"><%=MessageResource.getInstance().getMessage("WRD_CTYQ_passwordchange", languageType) %></span></button>
	    	</div>
		</div>
		-->
		<div class="ui-grid-solo">
	    	<div class="ui-block-a">
	    		<button href="#" id="btLogin" data-theme="e" style="text-align:center;" ><span class="buttonTextLarge"><%=MessageResource.getInstance().getMessage("LBCM-002", languageType) %></span></button>
	    	</div>
		</div>
	</div>
</div>

<!-- RePassword Detail -->
<div id="rePasswordPage" data-role="page" data-fullscreen="true">
	<!-- Header Part -->
	<div data-role="header" data-theme="b"  style="text-align: center; height: 50px; padding-top: 8px;">
		<span style="font-size:25px; font-weight: bold;"><%=MessageResource.getInstance().getMessage("changepassword", languageType) %></span>
	</div>
	
	<div style="text-align: right;" data-role="content">
		<div class="ui-grid-b ui-responsive" style="margin-bottom : 25px !important; height:380px;"> 
			<div class="ui-block-a" style="width: 35%">
				<label for="txRePasswordUserId" style="margin-top: 30px;margin-right: 10px; font-size: 30px;"><%=MessageResource.getInstance().getMessage("LBCM-000", languageType) %></label>
			</div>
			<div class="ui-block-b" style="width: 60%; height: 80px !important">
				<input id="txRePasswordUserId" class="ui-bar ui-bar-c loginTextFieldCompStyle" value="tsb" type="text" placeholder='<%=MessageResource.getInstance().getMessage("LBCM-056", languageType)%>' maxlength="10" required="required">
			</div>
			<div class="ui-block-a" style="width: 35%">
				<label for="txRePasswordOldPassword" style="margin-top: 30px;margin-right: 10px; font-size: 30px;"><%=MessageResource.getInstance().getMessage("oldPassword", languageType) %></label>
			</div>
			<div class="ui-block-b" style="width: 60%; height: 80px !important">
				<input id="txRePasswordOldPassword" class="ui-bar ui-bar-c loginTextFieldCompStyle" value="" type="password" placeholder='<%=MessageResource.getInstance().getMessage("LBCM-063", languageType)%>' maxlength="20" required="required" autocomplete="off">
			</div>
			<div class="ui-block-a" style="width: 35%">
				<label for="txRePasswordPassword" style="margin-top: 30px;margin-right: 10px; font-size: 30px;"><%=MessageResource.getInstance().getMessage("password", languageType) %></label>
			</div>
			<div class="ui-block-b" style="width: 60%; height: 80px !important">
				<input id="txRePasswordPassword" class="ui-bar ui-bar-c loginTextFieldCompStyle" value="" type="password" placeholder='<%=MessageResource.getInstance().getMessage("LBCM-057", languageType)%>' maxlength="20" required="required" autocomplete="off">
			</div>
			<div class="ui-block-a" style="width: 35%">
				<label for="txRePasswordReTypePassword" style="margin-top: 30px;margin-right: 10px; font-size: 30px;"><%=MessageResource.getInstance().getMessage("reTypePassword", languageType) %></label>
			</div>
			<div class="ui-block-b" style="width: 60%; height: 80px !important">
				<input id="txRePasswordReTypePassword" class="ui-bar ui-bar-c loginTextFieldCompStyle" value="" type="password" placeholder='<%=MessageResource.getInstance().getMessage("LBCM-064", languageType)%>' maxlength="20" required="required" autocomplete="off">
			</div>
		</div>
	</div>
	
	<!-- Footer Part -->
	<div data-role="footer" data-position="fixed" data-tap-toggle="false"   data-theme="b" >
	    	<fielldset class="ui-grid-a">
	    		<div class="ui-block-a">
					<button id="btnRePasswordOk" data-theme="e" class="confirm buttonLarge"><span class="buttonLarge"><%=MessageResource.getInstance().getMessage("WRD_CTMO_Ok", languageType) %></span></button>
				</div>
				<div class="ui-block-b">
					<button id="btnCancelForRePasswordPage" data-theme="f" class="confirm"><span class="buttonLarge"><%=MessageResource.getInstance().getMessage("WRD_CTMO_Cancel", languageType) %></span></button>
				</div>
	    	</fielldset>
	</div>
</div>

<div id="jobListPage" data-role="page">
	<!-- Header Part -->
	<div data-role="header" data-theme="b"  style="text-align: center; height: 50px;">
		<span id="ytJobTitle" style="font-size:35px; font-weight: bold;"></span>
		<jsp:include page="./include/versionTitle.jsp" flush="true">
		 	<jsp:param name="pageId" value="jobListPage"/>
		</jsp:include>
		<!--   
		<span id="wtChannel" style="font-size:35px; font-weight: bold; margin: 50px;"></span>
		-->
	</div>

	<div data-role="content" style="overflow-y:hidden;overflow-x:auto;">
		<div id="AreaContainerField" style="min-width:350px;min-height:350px; margin-top:70px"></div>
		<!-- 메시지 박스 -->
		<div id="msgBox" style="width:700px;height:100px;background-color:#F2F2F2;Border:0px solid #737373;position:absolute;top:100px;left:100px;overflow:hidden;display:none;">
			<div id="msgBoxTxt" style="width:100%;font-size:50px;font-weight:500;word-break:break-all;padding:5px;color:#000000;">MessageBox!</div>
		</div>
		<div style="display:none;">
	  		<img id="imgYardTruck" src="<%=request.getContextPath() %>/WEB-APP/YT/img/yard-tracker.png" width="920" height="293">
	  		<!--   <img id="imgYardTruckMark" src="/img/yard-tracker-mark.png" width="304" height="319"> -->
		</div>
	</div>

	<div data-role="footer" data-position="fixed" data-tap-toggle="false"   data-theme="c" id="jobListPageFooter">
		<div id="MainButtonField" class="ui-grid-b ui-responsive" >
		<!--
		<div id="AreaButtonField" class="ui-grid-a ui-responsive" >
		    	<div class="ui-block-a"><input type="button" id="btnRefresh" value="<%=MessageResource.getInstance().getMessage("LBCM-015", languageType) %>" data-theme="b" style=" font-size: 3em;"></div>
		    	<div class="ui-block-b"><input type="button" id="btnExit" value="<%=MessageResource.getInstance().getMessage("LBCM-016", languageType) %>" data-theme="a" class="confirm"></div>
		    	<div class="ui-block-c" id="divStoppageStyle"><input type="button" id="btnStoppage" value="<%=MessageResource.getInstance().getMessage("LBCM-027", languageType) %>" data-theme="c"></div>
		</div>
		-->
		    	<!--Modified by MS.Kim (2022.10.24) 0133809: Lift Off Button-->
		    	<!--LiftOff/Stoppage Button 사용여부-->
		    	<!--footerButtons width 자동조정-->
				<div class="ui-block-a footerButtons" id="divRefreshStyle">
					<input type="button" id="btnRefresh"
						value="<%=MessageResource.getInstance().getMessage("LBCM-015", languageType) %>"
						data-theme="b" style="font-size: 3em;" />
				</div>
				<div class="ui-block-b" id="divRefreshStyle" style="display:none;">
		    		<input type="button footerButtons" id="btnBlockOut" value="<%=MessageResource.getInstance().getMessage("LBYT-021", languageType) %>" data-theme="r" style=" font-size: 3em;" />
		    	</div>
		    	<div class="ui-block-c footerButtons" id="divLiftOff">
		    		<input type="button" id="btnLiftOff" value="<%=MessageResource.getInstance().getMessage("LBYT-015", languageType) %>" data-theme="e" style="font-size: 3em;" />
		    	</div>
		    	<div class="ui-block-c footerButtons" id="divRefreshStyle" style="display:none;">
		    		<input type="button" id="btnJobChange" value="<%=MessageResource.getInstance().getMessage("WRD_YT_JOB_CHANGE", languageType) %>" data-theme="b" style=" font-size: 3em;" />
		    	</div>
		    	<div class="ui-block-d footerButtons" id="divStoppageStyle">
		    		<input type="button" id="btnStoppage" value="<%=MessageResource.getInstance().getMessage("LBCM-027", languageType) %>" data-theme="r">
		    	</div>
		    	<div class="ui-block-e footerButtons" id="divExitStyle">
		    		<input type="button" id="btnExit" value="<%=MessageResource.getInstance().getMessage("LBCM-016", languageType) %>" data-theme="a" class="confirm">
		    	</div>
		</div>
		<!-- 
		<div  class="ui-grid-solo">
			<input id="txBanner" type="text" class="bannerStyle" style="padding: -5px; margin: 0px;" readonly="readonly" />
		</div>
		 -->
	</div>
</div>

<div id="selectYTPage" data-role="page">

	<!-- Header Part -->
	<div data-role="header" data-theme="b"  style="text-align: center; height: 50px; padding-top: 8px;">
		<span id="selectYTtitle" style="font-size:25px; font-weight: bold;">Login</span>
		
		<jsp:include page="./include/versionTitle.jsp" flush="true">
		 	<jsp:param name="pageId" value="selectYTPage"/>
		 </jsp:include>
	</div>

	<div data-role="Page" >
		<div id="areaYardTruckNos" class="ui-grid-b ui-responsive"></div>
	</div>
	
	<!-- Footer Part -->
	<div data-role="footer" data-position="fixed" data-tap-toggle="false"   data-theme="c" >
		<div class="ui-grid-solo" >
		    	<div class="ui-block-a"><input type="button" id="btnCancelForYTPage" value="<%=MessageResource.getInstance().getMessage("LBCM-017", languageType) %>" data-theme="a" class="confirm"></div>
		</div>
	</div>
</div>

<div id="selectChangeJobPage" data-role="page">

	<!-- Header Part -->
	<div data-role="header" data-theme="b"  style="text-align: center; height: 50px; padding-top: 8px;">
		<span id="selectYTtitle" style="font-size:25px; font-weight: bold;"><%=MessageResource.getInstance().getMessage("WRD_YT_JOB_CHANGE", languageType) %></span>
		
		<jsp:include page="./include/versionTitle.jsp" flush="true">
		 	<jsp:param name="pageId" value="selectChangeJobPage"/>
		 </jsp:include>
	</div>

	<div data-role="Page" >
		<div class="ui-grid-d ui-responsive" >
			<div class="ui-block-a" style="width: 30%;">
				<label for="txYtNoForChange" style="margin-top: 30px;margin-right: 10px; font-size: 30px;"><%=MessageResource.getInstance().getMessage("LBYT-000", languageType) %></label>
			</div>
			<div class="ui-block-b" style="width: 10%;">
				<label for="txYtNoForChange" style="margin-top: 30px;margin-right: 10px; font-size: 30px;"><%=MessageResource.getInstance().getMessage("LBYT-018", languageType) %></label>
			</div>
			<div class="ui-block-c" style="width: 30%;">
				<input id="txYtNoForChange" class="ui-bar ui-bar-c loginTextFieldCompStyle" value="" type="text" placeholder="<%=MessageResource.getInstance().getMessage("LBYT-019", languageType) %>" maxlength="3" required="required">
			</div>
			<div class="ui-block-d" style="width: 20%;">
				<label style="margin-top: 10px;margin-right: 10px; font-size: 30px;"></label>
				<input type="button" id="btnYtNoForChangeJob" value="<%=MessageResource.getInstance().getMessage("LBCM-019", languageType) %>" data-theme="a" class="ytNoForChangr">
			</div>
		</div>
		
		<div id="areaChangeJobInfos"></div>
	</div>
	
	<!-- Footer Part -->
	<div data-role="footer" data-position="fixed" data-tap-toggle="false"   data-theme="c" >
		<div class="ui-grid-solo" >
		    	<div class="ui-block-a"><input type="button" id="btnCancelForChangeJob" value="<%=MessageResource.getInstance().getMessage("LBCM-017", languageType) %>" data-theme="a" class="confirm"></div>
		</div>
	</div>
</div>

<div id="selectStoppagePage" data-role="page">

	<!-- Header Part -->
	<div data-role="header" data-theme="b"  style="text-align: center; height: 50px; padding-top: 8px;">
		<span id="selectStoppagetitle" style="font-size:25px; font-weight: bold;"><%=MessageResource.getInstance().getMessage("LBCM-024", languageType) %></span>
		
		<jsp:include page="./include/versionTitle.jsp" flush="true">
		 	<jsp:param name="pageId" value="selectStoppagePage"/>
		 </jsp:include>
	</div>

	<div data-role="Page" style="overflow-y:hidden;overflow-x:auto;">
		<div id="areaStoppage" class="ui-grid-b ui-responsive" style="min-width:800px;"></div>
	</div>
	
	<!-- Footer Part -->
	<div data-role="footer" data-position="fixed" data-tap-toggle="false"   data-theme="c" >
		<div class="ui-grid-solo" >
		    	<div class="ui-block-a"><input type="button" id="btnCancelForStoppagePage" value="<%=MessageResource.getInstance().getMessage("LBCM-017", languageType) %>" data-theme="a" class="confirm"></div>
		</div>
	</div>
</div>

<div id="warningPage" data-role="page">

	<!-- Header Part -->
	<div data-role="header" data-theme="b"  style="text-align: center; height: 50px; padding-top: 8px;">
		<span id="warningPagetitle" style="font-size:25px; font-weight: bold;">Warning</span>
		
		<jsp:include page="./include/versionTitle.jsp" flush="true">
		 	<jsp:param name="pageId" value="selectStoppagePage"/>
		 </jsp:include>
	</div>

	<div style="text-align: center; background-color: red;" data-role="content" >
		<div class="ui-grid-b ui-responsive" >
			<div class="ui-block-a" style="width: 50%; color: yellow;">
				<label for="lblWarning1" style="font-size: 250px;">졸</label>
			</div>
			<div class="ui-block-b" style="width: 50%; color: yellow;">
				<label for="lblWarning2" style="font-size: 250px;">면</label>
			</div>
			<div class="ui-block-a" style="width: 50%; color: yellow;">
				<label for="lblWarning3" style="font-size: 250px;">사</label>
			</div>
			<div class="ui-block-b" style="width: 50%; color: yellow;">
				<label for="lblWarning4" style="font-size: 250px;">고</label>
			</div>
		</div>
	</div>
</div>

<div id="underStoppagePage" data-role="page">

	<!-- Header Part -->
	<div data-role="header" data-theme="b"  style="text-align: center; height: 50px; padding-top: 8px;">
		<span id="underStoppagetitle" style="font-size:25px; font-weight: bold;"><%=MessageResource.getInstance().getMessage("LBCM-024", languageType) %></span>
		
		<jsp:include page="./include/versionTitle.jsp" flush="true">
		 	<jsp:param name="pageId" value="underStoppagePage"/>
		 </jsp:include>
	</div>

	<div style="text-align: right;" data-role="content" >
		<div class="ui-grid-b ui-responsive" >
			<div class="ui-block-a" style="width: 35%">
				<label for="lblEquNo" style="margin-top: 30px;margin-right: 10px; font-size: 30px;"><%=MessageResource.getInstance().getMessage("LBYT-000", languageType) %></label>
			</div>
			<div class="ui-block-b" style="width: 60%; height: 80px !important">
				<input id="txtEquNo" class="ui-bar ui-bar-c stoppageTextFieldStyle" value="" type="text" placeholder="Equipment No." maxlength="10" required="required" readonly="readonly">
			</div>
			<div class="ui-block-a" style="width: 35%">
				<label for="lblStoppageTime" style="margin-top: 30px;margin-right: 10px; font-size: 30px;"><%=MessageResource.getInstance().getMessage("LBCM-026", languageType) %></label>
			</div>
			<div class="ui-block-b" style="width: 60%; height: 80px !important">
				<input id="txtStoppageTime" class="ui-bar ui-bar-c stoppageTextFieldStyle" value="" type="text" placeholder="Time" maxlength="20" required="required" readonly="readonly">
			</div>
			<div class="ui-block-a" style="width: 35%">
				<label for="lblStoppageDesc" style="margin-top: 30px;margin-right: 10px; font-size: 30px;"><%=MessageResource.getInstance().getMessage("LBCM-024", languageType) %></label>
			</div>
			<div class="ui-block-b" style="width: 60%; height: 90px !important">
				<input id="txtStoppageDesc" class="ui-bar ui-bar-c stoppageTextFieldStyle" value="" type="text" placeholder="Stoppage" maxlength="50" required="required" readonly="readonly">
			</div>
		</div>
	</div>
	
	<!-- Footer Part -->
	<div data-role="footer" data-position="fixed" data-tap-toggle="false" data-theme="c" >
		<div id="AreaButtonField" class="ui-grid-b ui-responsive" >
	    	<div class="ui-block-a" id="divRefresh">
	    		<input type="button" id="btnRefreshOnStoppage" value="<%=MessageResource.getInstance().getMessage("LBCM-015", languageType) %>" data-theme="b">
	    	</div>
	    	<div class="ui-block-b" id="divExit">
	    		<input type="button" id="btnExitOnStoppage" value="<%=MessageResource.getInstance().getMessage("LBCM-016", languageType) %>" data-theme="a">
	    	</div>
	    	<div class="ui-block-c" id="divStoppage">
	    		<input type="button" id="btnResumeOnStoppage" value="<%=MessageResource.getInstance().getMessage("LBCM-025", languageType) %>" data-theme="c">
	    	</div>
		</div>
	</div>
</div>

<div id="versionMismatchedPage" data-role="page">
	<!-- Header Part -->
	<div data-role="header" data-theme="b"  style="text-align: center; height: 50px; padding-top: 8px;">
		<span id="versionMismatchedtitle" style="font-size:25px; font-weight: bold;">Yard Tractor</span>
		<jsp:include page="./include/versionTitle.jsp" flush="true">
			<jsp:param name="pageId" value="versionMismatchedPage"/>
		</jsp:include>
	</div>

	<div data-role="Page" >
		<div id="noMatchedVersionArea" class="ui-grid-b ui-responsive versionNotMatchedStyle"></div>
	</div>
	
	<!-- Footer Part -->
	<div data-role="footer" data-position="fixed" data-tap-toggle="false"   data-theme="c" >
		<div class="ui-grid-solo" >
		    	<div class="ui-block-a"><input type="button" id="btnReloadPage" value="<%=MessageResource.getInstance().getMessage("LBCM-018", languageType) %>" data-theme="a" class="confirm"></div>
		</div>
	</div>
</div>

<script>
$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    
    ytInitialize();
});
</script>

</body>
</html>