<%@page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../include/languageType.jsp" %>
<%@page import="com.tsb.most.framework.util.MessageResource"%>

<%
	String ipAddress = request.getRemoteAddr();
	MessageResource.getInstance().setServletContext(getServletContext());
%>
<script type="text/javascript" src="<%=request.getContextPath() %>/WEB-APP/YT/js/ytDrawing/ytJobListView.js"></script>
<script>

///////////////////////////////////////////////////////
// variable
//////////////////////////////////////////////////////
// init.jsp - <commonInclude.jsp>에서 빠져 있음
var contextPath = "<%=request.getContextPath() %>";
iWeb.URL = contextPath; // Tonny.Kim.2020.09.11

// Tonny.Kim.2020.09.20
//var loginPage = contextPath+"/";
//RBT. 2024.03.13 Added for new source code:
var loginPage = contextPath+"/rest/ytMain";
var loginPageId = "indexYtPage";
var homePage = contextPath+"index.jsp";
var mainPageId = "jobListPage"; // Tonny.Kim.2020.12.10

var currentVersion = "3011";
var useWeblog = true;

var loginInfo = null;
var wsConnection = null;
var userIdtemp = '';
var userPwtemp = '';
var ytNotemp = '';
var xmlns = "http://www.w3.org/2000/svg";

var ipAddress = "<%=ipAddress%>";
var clientUniqueId = null;


//return Object
var containerInfo = null;
var allEquipmentItems 	= null;	// 최초모든 장비가져오는 부분 

// window object
var localstorage = window.localStorage;
var navigator = window.navigator;

//version check
var versionMatchedFlag = false;

//send message part
var myCallMethod = null;
var myJsonData = null;
var myCallback = null;
var isUnderSending = false;


//re-login part
var isNeedRelogin = false;
var isUnderRelogin = false;


//heart-beat check timer
var anyAsyncMessageReceivedTime = null;

//---- Timer -------------------------------------------


// 통합된 타이머
var integratedHandlerTimer = null; 
var integratedHandlerInterval = 3000;

var defaultSendTimeOutInterval = 250; //by jaehoon for managing the connections.
var titleTimer = null; // added by jaeok (2021.02.24) [HJNC] Yard Truck 시각 표시 변경 요청
var isAliveTimer = null;

// off-line mode timer
var offlineStateCheckHanlderTimer = null;
var offlineStateCheckHanlderInterval = 3000;
var onLineState = true;


// Timeout part ---------------------------
var userMsgSentTime = null;
var reconnectionTryTime = null;

const SZTP_TYPE_TERMINAL = "*";
const SZTP_TYPE_NEW_ISO = "6346";
const SZTP_TYPE_OLD_ISO = "2716";

//< added by Rackhyun Jeong (2019.01.20) - YT Stoppage
const SESSION_YT_NO = "yardTruckNo";
const SESSION_USER_ID = "userId";
const SESSION_USER_PWD64 = "userPwd64";

const ID_PREFIX_BTN_STOPPAGE = "btnStoppage";
var StoppageItems = null;

const SESSION_USE_STOPPAGE = "UseStoppage";
const SESSION_UNDER_STOPPAGE = "UnderStoppage";
const SESSION_STOPPAGE_CODE = "StoppageCode";
const SESSION_STOPPAGE_DESC = "StoppageDesc";
const SESSION_STOPPAGE_STIME = "StoppageSTime";
const SESSION_STAFF_NAME = "StaffName";

const ID_PREFIX_BTN_LIFT_OFF = "btnLiftOff";
const ID_DELIMETER = "+";
const MSG_MODE_JOB_CONFIRM = "DN";
const FIXED_PASSWORD = "000";
//>

// added by jaeok (2021.01.08) 상태 주기적으로 서버에 요청 
var ytStatusTimer = null;
var showWarningPage = false;
var currentServiceStatus = true;

//PW-Validation
let _minimumLength = 0;
let _maximumLength = 20;
let _upperCredit = 0;
let _lowerCredit = 0;
let _digitCredit = 0;
let _specialCredit = 0;

///////////////////////////////////////////////////////
//Initialize
//////////////////////////////////////////////////////

function ytInitialize() {
	localStorage.removeItem('refreshState');
	
	//getPwValidation(); RBT. 2024 comment
	initializeGlobalVariable(); // 전역변수 초기화
	clientUniqueId = Math.floor(Math.random() * (10000));
	
	// ws connection part
	if(getSessionItem('wsUrl') == '' 
		|| getSessionItem('wsUrl') == null)
	{
		setSessionItem('wsUrl', wsUrl);
	}
	
 	startBaseTimer();
	sendLocalStorageInfoToServer(); // Logging transmission
	
	//modified by MinSeok.K (2021.01.22) [HJNC] YT Mantis : 0112842: 로그인 화면에 키패드 추가
	//Modified by MS.Kim (2022.11.14) [EGMPT] 0134495: Remove virtual keyboard at log in screen
/* 	$('#txUserId').keyboard({
	     layout : 'colemak',
	     autoAccept : true
	   });
	$('#txPassword').keyboard({
	     layout : 'colemak',
	     autoAccept : true
	   }); */
	
	/*
	if (FIXED_PASSWORD == '' || FIXED_PASSWORD == null) {
 		$('#txPassword').keyboard();
 		
	} else {
		$('#txPassword').hide();
		$('#divlblPassword').hide();
		$('#divtxPassword').hide();
	}
	*/
	// Style part
	$('#txUserId')				.addClass("capitalChractorStyle");	//Modified by MS.Kim (2023.01.05) [EMGPT] 145736: Username filed should write in CAPS letters
	//$('#txYardTruckNo')			.addClass("capitalChractorStyle");
	
	// Event part
	$('#btnYtHome')				.click(goHome);
	$('#btLogin')				.click(loginHandler);
	$('#btnRefresh')			.bind('click', btnRefreshClicked);
	$('#btnBlockOut')			.bind('click', blockOut);
	$('#btnLiftOff')			.bind('click', liftOffJobHandler);
	
	
	//< added by Rackhyun Jeong (2019.01.20) - YT Stoppage
	$('#btnStoppage').bind('click', btnStoppageClicked);
	$('#btnResumeOnStoppage').bind('click', btnStoppageClicked);
	$('#btnCancelForStoppagePage').bind('click', goYyListPage);
	//>
	
	$('#txUserId')				.bind('keypress', loginKeyHandler);
	$('#txUserId')				.keyup(loginKeyUp);
	
	/*
	if (FIXED_PASSWORD == '' || FIXED_PASSWORD == null) {
		$('#txPassword')			.bind('keypress', loginKeyHandler);
	} else {
		
	}*/
	
	$('#btnYardTruckNo')		.bind('click', goYTselectPage);
	$( "#txYardTruckNo" )       .on( "focus", goYTselectPage  );
	
	$('#cbLanguageType')		.bind('change', changeLanguageType);
	
	$("#btnExit")				.bind('click', ytModuleExit);
	$("#btnExitOnStoppage")		.bind('click', ytModuleExit);	// added by Rackhyun Jeong (2019.01.20) - YT Stoppage
	$("#btnCancelForYTPage")	.click(goLoginPage);
	$("#btnCancelForChangeJob")	.click(goYyListPage);
	$("#btnYtNoForChangeJob")	.click(filterYtChange);

	// RePassword
	$("#btnChangePassword")				.click(goRePasswordSelectPage);
	$("#btnCancelForRePasswordPage")	.click(goLoginPage);
	$("#btnRePasswordOk")				.click(changePassword);
	
	$('#txYtNoForChange').keyboard({
	     layout : 'num',
	     autoAccept : true
	   });
	$("#txYtNoForChange").bind("change", ytNoForChangeChanged);

	// Version mismatched page
	$("#btnReloadPage")			.click(pageReload);
	$('#noMatchedVersionArea')	.html("<%=MessageResource.getInstance().getMessage("CM-018", "en_US") %>");

	initializeJobList(); // Tonny.Kim.2020.12.10
	
	userIdtemp = localStorage.getItem("userId");
	
	/*
	if (FIXED_PASSWORD == '' || FIXED_PASSWORD == null) {
		userPwtemp = localStorage.getItem("userPw"); // added by jaeok (2021.02.03) Mantis 0113101: 로그인 화면에서 사용자ID 및 비밀번호 저장 및 유지
	} else {
		userPwtemp = FIXED_PASSWORD;
	}
	*/
	//userPwtemp = "SUCCESS";
	userPwtemp = localStorage.getItem("localPassword") || "";
	
// 	userIdtemp = "";
	ytNotemp 	= localStorage.getItem("yardTruckNo");

	if (userIdtemp != null) $('#txUserId').val(userIdtemp);
	if (userPwtemp != null) $('#txPassword').val(userPwtemp); // added by jaeok (2021.02.03) Mantis 0113101: 로그인 화면에서 사용자ID 및 비밀번호 저장 및 유지
	if(ytNotemp != null) 	$('#txYardTruckNo').val(ytNotemp);
	
	// added by SH.Nam (2018.12.26) 88171: [모든단말기] 로그인시 Password 기본 저장 기능
// 	var localPassword = localStorage.getItem("localPassword");
// 	if(localPassword != null && localPassword != "") $('#txPassword').val(localPassword);

	// Refresh[F5]: 기존 정보
	iWeb.USER_ID = getSessionItem(SESSION_USER_ID);
	iWeb.USER_PWD64 = getSessionItem(SESSION_USER_PWD64);
	iWeb.EQU_NO = getSessionItem(SESSION_YT_NO);

	// Tonny.Kim.2020.12.10
	window.addEventListener('resize', windowResize, true);
	
	// Page controller
	$(document).on("pagechange", function(e) { 
		
		if ($.mobile.activePage.is("#jobListPage")){
			var logAuthInfo = getSessionItem('loginInfo');
			if(logAuthInfo == "" || logAuthInfo == null) {
				// "Session is out. Please Re-login."				
				tsbAlert.alert.getInstance().Info('<%=MessageResource.getInstance().getMessage("CM-007", languageType)%>', function (e,p) {
					var appendURL = '';
					if(ytNotemp != '' && ytNotemp != null && ytNotemp != undefined) {
						appendURL += "?ytNo="+ytNotemp;
					}
					$.mobile.changePage('#' + loginPageId ,'slide','reverse');
				});
			}
			$("#ytJobTitle").text(getHeaderTitleText());        
		
			
			//Added by MS.Kim (2022.10.24) 0133809: Lift Off Button
			//LiftOff Button 사용여부
			if (useLiftOff != "Y") {
				$("#MainButtonField")[0].setAttribute('class', 'ui-grid-c ui-responsive'); // 4buttons
				var divLiftOff = document.getElementById('divLiftOff');
				if (divLiftOff != null) {
					$("#MainButtonField")[0].removeChild(divLiftOff);
				}
			}

			//< added by Rackhyun Jeong (2019.01.20) - YT Stoppage
			//Modified by MS.Kim (2022.10.24) 0133809: Lift Off Button
			//Stoppage Button 사용여부
 			//var useStoppage = getSessionItem(SESSION_USE_STOPPAGE);
			if (useStoppage != "Y") {
				$("#MainButtonField")[0].setAttribute('class', 'ui-grid-c ui-responsive'); // 4buttons
				var divStoppage = document.getElementById('divStoppageStyle');
				if (divStoppage != null) {
					$("#MainButtonField")[0].removeChild(divStoppage);
				}
				
			} else { // use Stoppage
				if (getSessionItem(SESSION_UNDER_STOPPAGE) == "Y") {
					// resume
					$("#btnStoppage").attr('value', '<%=MessageResource.getInstance().getMessage("LBCM-025", languageType) %>');
					$("#btnStoppage").button("refresh");
				} else {
					// stoppage
					$("#btnStoppage").attr('value', '<%=MessageResource.getInstance().getMessage("LBCM-027", languageType) %>');
					$("#btnStoppage").button("refresh");
				}
			}
		}
		
		if ($.mobile.activePage.is("#" + loginPageId)){
			var logAuthInfo = getSessionItem('loginInfo');
			if(logAuthInfo != null && logAuthInfo != "") {
				compulsoryLogout();
			}
		}
		
		if ($.mobile.activePage.is("#selectYTPage")){
			$("#selectYTtitle").text(getHeaderTitleText());
			searchYtList();
		}

		if ($.mobile.activePage.is("#selectChangeJobPage")){
			$("#selectYTtitle").text(getHeaderTitleText());
			$("#txYtNoForChange").val("");
			$("#areaChangeJobInfos").empty(); // CLEAR SCREEN
			//searchJobChangeList(); // deleted by jaeok (2021.02.16) related mail '[HJNC] Web YT '작업교대' 기능 정리'
		}
		
		// added by Rackhyun Jeong (2019.01.20) - YT Stoppage
		if ($.mobile.activePage.is("#selectStoppagePage")){
			$("#selectYTtitle").text(getHeaderTitleText());
			searchStoppageList();
		}

		//Tonny.Kim.2020.11.11
		if ($.mobile.activePage.is("#rePasswordPage")){
			showRePasswordPage();
		}
	});

	// Tonny.Kim.2020.12.10
	$(document).on("pageshow", function(e) {
		if ($.mobile.activePage.is("#" + mainPageId)){

		}
	});
	
	// F5 refresh handler
	$(window).bind('beforeunload', function(e) {
		closeWebSocket();	// 웹소켓 로그아웃 처리
	});
	
	$(window).bind('load', function (e) {
		if ($.mobile.activePage.is("#" + loginPageId)){
			clearSession();
		} else if ($.mobile.activePage.is("#rePasswordPage")){
			compulsoryLogout();
		} else {
			refresh();
		} 
	});

	
	// Network connection event -------------------------
	window.addEventListener("online", 
			function(e) {
				startBaseTimer();
				stopOfflineTimer();
				onLineState = true;
				saveEventDataToLocalStorage('online');
			});
			
	window.addEventListener("offline", 
			function(e) {
				stopBaseTimer();
				initializeGlobalVariable();
				startOfflineTimer();
				onLineState = false;
				checkNetworkStateHandler();
				saveEventDataToLocalStorage('offline');
				changeConnectionSquare(false);
			});
			
	$(window).unload(
			function() { 
				stopBaseTimer();
			});
	
	
}

// Tonny.Kim.2020.12.10
function windowResize(e){
	if (!$.mobile.activePage.is("#jobListPage")){
		return;
	}

	if(ytRenderer){
		drawingContainerItems(ytRenderer.containerInfo);
	}
}

function initializeGlobalVariable() {
	
	anyAsyncMessageReceivedTime = null;
	userMsgSentTime = null;
	reconnectionTryTime = null;
	
	myCallMethod = null;
	myJsonData = null;
	myCallback = null;
	
	isUnderSending = false;
	isNeedRelogin = false;
	isUnderRelogin = false;
}


///////////////////////////////////////////////////////
//Timer Part
//////////////////////////////////////////////////////

// added by jaeok (2021.02.24) [HJNC] Yard Truck 시각 표시 변경 요청
function updateTitle() {
	$("#ytJobTitle").text(getHeaderTitleText());
}

function startBaseTimer() {
	saveEventDataToLocalStorage("startBaseTimer"); // log
	integratedHandlerTimer = setInterval(function() {checkConnectionStatusManager()}, integratedHandlerInterval);
	titleTimer = setInterval(function() {updateTitle()}, 1000); // added by jaeok (2021.02.24) [HJNC] Yard Truck 시각 표시 변경 요청
	
	//isAliveTimer = setInterval(function() {c3itIsAlive()}, 3000);
	
	// added by jaeok (2021.01.08) 상태 주기적으로 서버에 요청
	//	Modified by MS.Kim (2022.11.22) [EGMPT] 사용하지 않는 T37 요청 삭제
/* 	if (ytStatusTimer == null) {
		ytStatusTimer = setInterval(
			function getYtStatus() {
				var ytNo = getSessionItem('yardTruckNo');
				if (ytNo == null) {
					// nothing to do
				} else {
					var url = '/yt/searchYtStatus';
					var params = {
						mMode 			: 'RQ',
						yardTruckNo   	: getSessionItem('yardTruckNo')
					};
						
					ajaxPost(url, params, function(data) {
						if (ytRenderer) {
							var ytStatusItem = data.response.dataItem;
							ytRenderer.containerInfo.dataItem = ytStatusItem;
							drawingContainerItems(ytRenderer.containerInfo);
						
							// var wtChannel = ytStatusItem.wtChannel;
							// $("#wtChannel").text("CH." + wtChannel);
						}
					});
				}
				
				//$.mobile.changePage('#warningPage', 'slide', 'reverse');
				//if (showWarningPage == true) {
				//	//$.mobile.changePage('#warningPage', 'slide', 'reverse');
				//	//showWarningPage = false;
				//} else {
				//	//goYyListPage();
				//	//showWarningPage = true;
				//}
				
			},
			30000
		);
	} */
}

function stopBaseTimer() {
	saveEventDataToLocalStorage("stopBaseTimer");
	clearInterval(integratedHandlerTimer);
	integratedHandlerTimer = null;
	
	clearInterval(titleTimer);
	titleTimer = null;
	
	// added by jaeok (2021.01.08) 상태 주기적으로 서버에 요청
	clearInterval(ytStatusTimer);
	ytStatusTimer = null;
	
	clearInterval(isAliveTimer);
	isAliveTimer = null;
}

function startOfflineTimer() {
	offlineStateCheckHanlderTimer = setInterval(function() {checkNetworkStateHandler()}, offlineStateCheckHanlderInterval);
}

function stopOfflineTimer() {
	clearInterval(offlineStateCheckHanlderTimer);
	offlineStateCheckHanlderTimer = null;
}

///////////////////////////////////////////////////////
//  Check valid connection
//////////////////////////////////////////////////////

/*
// Check network status
function reachableCallback(reachability) {
	// There is no consistency on the format of reachability
	var networkState = reachability.code || reachability;
	var states = {};
	states[NetworkStatus.NOT_REACHABLE]                      = 'No network connection';
	states[NetworkStatus.REACHABLE_VIA_CARRIER_DATA_NETWORK] = 'Carrier data connection';
	states[NetworkStatus.REACHABLE_VIA_WIFI_NETWORK]         = 'WiFi connection';
	// We want to be able to check the online variable in our jQuery
	if (networkState != 0) online = true;
}
*/

//-----------------------------------------------------------------------------------


function stopIfDeviceIsOffLineAndDisplayMsg() {
	if (isDeviceOnLine() == false) {
			tsbAlert.alert.getInstance().Info('<%=MessageResource.getInstance().getMessage("CM-013", languageType) %>', function (e,p) {
		});
		return true;
	}
	return false;
}

function isDeviceOnLine() {
	return onLineState;
	//return navigator.onLine;
}

function checkNetworkStateHandler() {
	saveEventDataToLocalStorage("checkNetworkStateHandler was worked on off-line");
	
	if(onLineState == false) {
		if(uiCommon.common.getInstance().isBlocked() == true) {
			uiCommon.common.getInstance().unBlockScreen();
<%-- 			tsbAlert.alert.getInstance().Info('<%=MessageResource.getInstance().getMessage("CM-013", languageType) %>', function (e,p) {});			 --%>
		}
		changeConnectionSquare(false);
	}
}


//-----------------------------------------------------------------------------------


/*
[readyState]
	0 : CONNECTING
	1 : OPEN 
	2 : CLOSING 
	3 : CLOSED 

[ALIVEState] 
	N : ALIVENULL
	I : ALIVEIN
	O : ALIVEOVER
*/


var ChannelStatus= {
	"CONNECTINGALIVENULL" : "0N",
	"CONNECTINGALIVEIN" : "0I",
	"CONNECTINGALIVEOVER" : "0O",
	"OPENALIVENULL" : "1N",
	"OPENALIVEIN" : "1I",
	"OPENALIVEOVER" : "1O",
	"CLOSINGALIVENULL" : "2N",
	"CLOSINGALIVEIN" : "2I",
	"CLOSINGALIVEOVER" : "2O",
	"CLOSEDALIVENULL" : "3N",
	"CLOSEDALIVEIN" : "3I",
	"CLOSEDALIVEOVER" : "3O",
	"EMPTYCONNECTION" : "NN"
}

//ReadyState (websocket)
var READYSTATE_CONNECTING = 0;
var READYSTATE_OPEN = 1;
var READYSTATE_CLOSING = 2;
var READYSTATE_CLOSED = 3;

var ReadyStateDescription = {
	0 : "CONNECTING",
	1 : "OPEN",
	2 : "CLOSING",
	3 : "CLOSED"
}

var oldChannelStatus = "";

function getChannelStatus() { 
	// Heart-beat part ---
	var lastReceivedTime = null;
	var diffTimeGap = 0;
	if(anyAsyncMessageReceivedTime != null) {
		var lastReceivedTime = anyAsyncMessageReceivedTime.getTime();
		diffTimeGap = getElapsedTime(lastReceivedTime);
	}

	// Build resultCode
	var resultValue = null;
	if(wsConnection != null) {
		var currentReadyState = wsConnection.readyState;
		var currentAliveState = null;
		if(anyAsyncMessageReceivedTime == null) {
			currentAliveState = "ALIVENULL";
		} else {
			// modified by YoungOk Kim (2020.02.17) - Mantis 93207: [YT] LTE 요금 문제로 인한 데이터 전송 간격 및 메시지 길이 조정
			//if(diffTimeGap > 16) {
			if(diffTimeGap > 30) {
				
				currentAliveState = "ALIVEOVER";
			} else {
				currentAliveState = "ALIVEIN";
			}
		}
		resultValue = ChannelStatus[ReadyStateDescription[currentReadyState] + currentAliveState];
	} else {
		resultValue = ChannelStatus["EMPTYCONNECTION"];
	}
	
	// Weblog record 
	if(oldChannelStatus != resultValue) {
		oldChannelStatus = resultValue;
		saveEventDataToLocalStorage("ChannelStatus : "+ resultValue);
	}
	
	return resultValue;
}



function checkTimeout(serviceStatus) {
	
	if(serviceStatus == false) {   // checkValidServiceStatus
		// UI initialize -----
		if(uiCommon.common.getInstance().isBlocked() == true) {
			uiCommon.common.getInstance().unBlockScreen();
		}
		
		// Timeout clear
		isUnderSending = false;
		userMsgSentTime = null;
		
		isUnderRelogin = false;
		reconnectionTryTime = null;
		
	} else {
		
		// Send Messsage timeout part ---	
		if(userMsgSentTime != null) {
			var diffTimeGapForSendingMsg = getElapsedTime(userMsgSentTime);
			if(diffTimeGapForSendingMsg > 10) {
				if(uiCommon.common.getInstance().isBlocked() == true) {
					uiCommon.common.getInstance().unBlockScreen();
<%-- 					tsbAlert.alert.getInstance().Info('<%=MessageResource.getInstance().getMessage("CM-019", languageType) %>'); --%>
				}
				isUnderSending = false;	
				userMsgSentTime = null;
				
				checkNEstablishReConnection(ChannelStatus["EMPTYCONNECTION"]);
				isNeedRelogin = true;
			}
		}
		
		// Reconnection time out part -------
		if(reconnectionTryTime != null) {
			var diffTimeGapForReconnect = getElapsedTime(reconnectionTryTime);
			if(diffTimeGapForReconnect > 10) {
				isUnderRelogin = false;
				reconnectionTryTime = null;
			}
		}
	}
}



///////////////////////////////////////////////////////
//Reconnection Part 
//////////////////////////////////////////////////////


/*
	resultValue
	
	RCXRLX : 아무것도 연결이 안된 경우
	RCORLX : reconnection만 연결된 경우
	RCORLO : reconnection, relogin 모두 연결된 경우 
	
*/

var ConnectionStatus = {
	"DISCONNECTED" 	: "RCXRLX",
	"NEEDRELOGIN" 	: "RCORLX",
	"NORMALITY" 	: "RCORLO"
}


var oldConnectionStatus = ""; //For weblog
var timerAliveCheckerLoop = 0;  //For weblog

// Tonny.Kim.2020.09.16
function checkConnectionStatusManager() {
	//RBT added. console.log(new Date());
// 	var currentChannelStatus = getChannelStatus(); // Channel Status 관련 사항 삭제
	var serviceStatus = checkValidServiceStatus();
	if (currentServiceStatus == false && serviceStatus == true) {
		// disconnected -> connected
		goYyListPage(); // connect될때 작업 다시 조회
	}
	
	currentServiceStatus = serviceStatus;
	var resultConnectionStatus = null;

// 	updateIsNeedLogin(currentChannelStatus);
	checkTimeout(currentServiceStatus);
	changeConnectionSquare(currentServiceStatus);
	
	// Reconnection Relogin try to establish
// 	if(checkNEstablishReConnection(currentChannelStatus) == true) {
		
// 		if(checkNestablishRelogin(currentChannelStatus) ==  true) {
// 			resultConnectionStatus = ConnectionStatus["NORMALITY"];
			
// 		} else {
// 			resultConnectionStatus = ConnectionStatus["NEEDRELOGIN"];
// 		}
// 	} else {
// 		resultConnectionStatus = ConnectionStatus["DISCONNECTED"];
// 	}
	
	// Weblog record ------
	if(timerAliveCheckerLoop == 10) {
		saveEventDataToLocalStorage("Timer is Alive");
		timerAliveCheckerLoop = 0;
	}
	
// 	if(oldConnectionStatus != resultConnectionStatus) {
// 		saveEventDataToLocalStorage("ConnectionStatus : "+ resultConnectionStatus);
// 		oldConnectionStatus = resultConnectionStatus;
// 	}

	timerAliveCheckerLoop++;

	// deleted by jaeok (2021.02.24) [HJNC] Yard Truck 시각 표시 변경 요청
	// titleTimer로 변경
	//$("#ytJobTitle").text(getHeaderTitleText());
	
	return resultConnectionStatus;
}


function updateIsNeedLogin(channelStatus) {
	
	if (ChannelStatus["OPENALIVENULL"] == channelStatus || ChannelStatus["OPENALIVEIN"] == channelStatus) {
		// false는 RC 메시지가 정상처리 되어야 변경됨
	} else {
		// relogin은 로그인 이후에만 변경하도록 처리
		var logAuthInfo = getSessionItem('loginInfo');
		if(logAuthInfo != null && logAuthInfo != "") {
			isNeedRelogin = true;
		}
	}
}


function changeConnectionSquare(serviceStatus) {
	
	// page Id generate
	var activePage   = $.mobile.activePage;
    var activePageID = activePage[0].id;
    
    if (serviceStatus == true) { // checkValidServiceStatus()
		$("#"+activePageID + "connectionStateTitle").text('<%=MessageResource.getInstance().getMessage("LBYT-016", languageType) %>');
		$("#"+activePageID + "connectionStateTitle").attr('class', 'connectionValidStlye');
	} else {
		$("#"+activePageID + "connectionStateTitle").text('<%=MessageResource.getInstance().getMessage("LBYT-017", languageType) %>');
		$("#"+activePageID + "connectionStateTitle").attr('class', 'connectionInvalidStlye');
	}
}


var loop_count = 0;

function checkNEstablishReConnection(channelStatus) {
	
	var reconnectedState = false;
	var executeReconnection = false;

	if (
		(ChannelStatus["CLOSEDALIVENULL"] == channelStatus
		|| ChannelStatus["CLOSEDALIVEIN"] == channelStatus
		|| ChannelStatus["CLOSEDALIVEOVER"] == channelStatus 
		|| ChannelStatus["EMPTYCONNECTION"] == channelStatus)
		||
		(ChannelStatus["CLOSINGALIVENULL"] == channelStatus
		|| ChannelStatus["CLOSINGALIVEIN"] == channelStatus
		|| ChannelStatus["CLOSINGALIVEOVER"] == channelStatus)
		||
		ChannelStatus["OPENALIVEOVER"] == channelStatus
		|| 
		ChannelStatus["CONNECTINGALIVEOVER"] == channelStatus
		)
	{
		executeReconnection = true;
	} else if (ChannelStatus["OPENALIVENULL"] == channelStatus
			|| ChannelStatus["OPENALIVEIN"] == channelStatus) {
		reconnectedState = true;
	} else { // ChannelStatus["CONNECTINGALIVENULL"] ChannelStatus["CONNECTINGALIVEIN"]
		if(loop_count >= 10) {
			executeReconnection = true;
		} else {
			loop_count++; 
		}	
	}
	
	// WebLog part
	if(loop_count > 1) {
		saveEventDataToLocalStorage(channelStatus + ", loop_count : " + loop_count);
	}
	
	if(executeReconnection == true) {
		loop_count = 0;
		closeWebSocket();
		connectWebSocket();
		saveEventDataToLocalStorage("Try to re-connect");
	}

	return reconnectedState;
}


function checkNestablishRelogin(channelStatus) {
	
	if(isNeedRelogin == false) {
		return true;	
	}
	
	var logAuthInfo = getSessionItem('loginInfo');
	if(logAuthInfo != null && logAuthInfo != "") {
		
		if(isNeedRelogin == true && isUnderRelogin == false) {
			reReloginHandler();
		}
		
	} else {
		isNeedRelogin = false;
		isUnderRelogin = false;
	}
	
	return false;
}


function reReloginHandler() {
	saveEventDataToLocalStorage("Try to Relogin");
	
	
	var userId = getSessionItem('userId');
	var yardTruckNo = getSessionItem('yardTruckNo');
	var parm = {
        parmClass: 'com.tsb.web.c3it.bizparm.common.LoginParm',
        value: {
            clientId 			: '',
            userId   			: userId.toUpperCase(),
            password 			: '',
            equNo    			: yardTruckNo.toUpperCase(),
            blockVessel			: '',
            baySpBay 			: '',
            apoint   			: '',
            remark   			: '',
            proxy    			: '',
            ldapAuthenticated	: '',
            connectionMode		: 'RC'
        }
    };
	
	setTimeout(function() {wsConnection.send('c3it.login.checkUser', parm, loginReceive); saveEventDataToLocalStorage("ReloginMsg was sent");}, 1000);
	
	reconnectionTryTime = new Date();
	isUnderRelogin = true;
}

// Tonny.Kim.2020.09.16
function checkValidServiceStatus() {

	// off-line case
	var resultValue = false;

	if(isDeviceOnLine() == false) {
		return resultValue;
	}

	// 로그인이 되지 않은 상태에서는 네트워크 상태로만 Status를 체크한다.
	// Tonny.Kim.2021.01.12 - 현재는 토큰 방식이 아니기 때문에 로그인 여부를 세션으로 판단
// 	if(iWeb.OAUTH_ACCESS_TOKEN == null || iWeb.OAUTH_ACCESS_TOKEN == ""){
// 		return true;
// 	}
	
	if(getSessionItem('loginInfo') == null){
		return true;
	}

	var resultValue = false;
// 	var channelStatus = getChannelStatus();
// 	if (ChannelStatus["OPENALIVENULL"] == channelStatus
// 			|| ChannelStatus["OPENALIVEIN"] == channelStatus) {
		
// 		if (isNeedRelogin == false) {
// 			resultValue = true;
// 		} else {
// 			resultValue = false;
// 		}
		
// 	} else {
// 		resultValue = false;
// 	}

	/*
	 * Tonny.Kim.2020.09.16
	 * C3IT 연결이 끊어져 있는 경우 로그인이 되어 있을때만 C3IT 접속을 다시 연결한다.
	 */
	if(wsStompClient_ != null){
		resultValue = wsStompClient_.connected;

		if(!wsStompClient_.connected && iWeb.OAUTH_ACCESS_TOKEN != null){
			wsConnected_ = false;
			connectWebSocket();
		}
	}

	return resultValue;
}




///////////////////////////////////////////////////////
//Send message Part
//////////////////////////////////////////////////////

function sendMessageManager() {
	
	if (myCallMethod == null && myJsonData == null) return;
	if(checkValidServiceStatus() == false) return;
	if (isUnderSending) return;
	
	saveEventDataToLocalStorage("Msg was sent-"+myCallMethod);
	
	isUnderSending = true;
	wsConnection.send(myCallMethod, myJsonData, myCallback);
	
}


function sendMessageWithCheck(serviceId, parm, callback) {

	saveEventDataToLocalStorage(serviceId+" was called");
	
	// Check connection part --------------
// 	if (stopIfDeviceIsOffLineAndDisplayMsg()) return;
	if(checkValidServiceStatus() == false) {
		tsbAlert.alert.getInstance().Info('<%=MessageResource.getInstance().getMessage("CM-020", languageType) %>');
		return;
	}
	
	// Send Message time writting --------------
	userMsgSentTime = new Date();
	
	//register request
	myCallMethod = serviceId;
	myJsonData = parm;
	myCallback = callback;
	
	sendMessageManager();
	uiCommon.common.getInstance().blockScreen();
}


function sendMessage(serviceId, parm, callback) {
	
	saveEventDataToLocalStorage(serviceId+" was called");
	
	// Check connection part --------------
// 	if (stopIfDeviceIsOffLineAndDisplayMsg()) return;
	if(checkValidServiceStatus() ==  false) {
		tsbAlert.alert.getInstance().Info('<%=MessageResource.getInstance().getMessage("CM-020", languageType) %>');
		return;
	}
	
	// Send Message time writting --------------
	userMsgSentTime = new Date();
	
	saveEventDataToLocalStorage("Msg was sent-"+serviceId);
	setTimeout(function() { wsConnection.send(serviceId, parm, callback); }, defaultSendTimeOutInterval);
}




///////////////////////////////////////////////////////
//WebSocket Setting
//////////////////////////////////////////////////////

function connectWebSocket() {
	anyAsyncMessageReceivedTime = null;

	// OLD
// 	if(wsConnection == null){
// 		wsConnection = $.websocket(wsUrl, {
// 			open: websocketOpen,
// 			close:websocketClose,
// 			error:websocketError,
// 			events: {
// 				"syncMessage"  		: receiveSyncMessage,
// 			   	"asyncMessage" 		: receiveAsyncMessage,
// 			   	"exceptionMessage" 	: receiveExceptionMessage
// 			}
// 		});	
// 	}

	// Tonny.Kim.2020.09.09
	fn_ws_connect_default_(asyncMessage, websocketOpen);
	saveEventDataToLocalStorage("Try to open websocket");
	
	// deleted by jaeok (2021.02.18) YT 안정화 되기 전까지 주석 처리
	//if(refreshRunner != null) {							// 작업목록 자동갱신: 정지
    //    clearInterval(refreshRunner);
    //    refreshRunner = null;
    //}
	//refreshRunner = setInterval(getYTJobList, 12000);	// 자동 작업목록 Refresh: 시작
}

function websocketOpen(e){
	setSessionItem('languageType', '<%=languageType%>');
// 	fn_ws_send_("/ws/pub/c3itConnect", JSON.stringify({yardTruckNo:getSessionItem(SESSION_YT_NO)}));	
	CacheService.loadGeneralCodesToCache(); // added by JH.Tak (2018.11.29) ADD PrivateSztp
}

function websocketClose(e) {
}

function websocketError(e) {
}

// Tonny.Kim.2020.09.15
function closeWebSocket() {
	var wsState = "";

	if(wsStompClient_ != null){
		wsState = " / wsState("+wsStompClient_.ws.readyState+")";
	}
	
	saveEventDataToLocalStorage("closeWebSocket was called by browser." + wsState);
	anyAsyncMessageReceivedTime = null;
	fn_ws_disconnect_();
	
	if(refreshRunner != null) {			// 작업목록 자동갱신 정지
        clearInterval(refreshRunner);
        refreshRunner = null;
    }
}

//일반 메시지 수락
function receiveSyncMessage(e) {
    var requestType = e.requestType;
    
 	// checkUnderSendMessageFlag
    if (requestType == myCallMethod) {
        myCallMethod = null;
        myJsonData = null;
        isUnderSending = false;
    }
    
	if (troubleshooting(e) == false) {
		uiCommon.common.getInstance().unBlockScreen();
		var callback = e.callback;
		
		if(requestType != "asyncMessage")
			saveEventDataToLocalStorage("Received message without error "+requestType);
		
		if (callback) {
			var func = window[callback];
			func.call(this, e.data);
		} 
	}
	
	// checkUnderReconnectionFlag
    if (requestType == "c3it.login.checkUser" ) {
    	isUnderRelogin = false;
		if(uiCommon.common.getInstance().isBlocked() == true) {
			uiCommon.common.getInstance().unBlockScreen();
		}
		
		reconnectionTryTime = null;
    }
	
    userMsgSentTime = null;
}

// 비동기 메시지 수락
function receiveAsyncMessage(e) {
	asyncMessage(e);
}

function receiveExceptionMessage(e) {
	var messageId = e.data.messageId;
	var isMessageKindOfC3ITError = (messageId == "CM-002" || messageId == "CM-010");
	
	if (isMessageKindOfC3ITError) {
		
		var logAuthInfo = getSessionItem('loginInfo');
		if(logAuthInfo != null && logAuthInfo != "") {
			isNeedRelogin = true;
		} else {
			tsbAlert.alert.getInstance().Info('<%=MessageResource.getInstance().getMessage("CM-020", languageType) %>');
		}
	}
}


/*
function receiveMessageDivaricateMethod(e) {

	checkUnderSendMessageFlag(e);
	
	// Received message handling
	if (troubleshooting(e) == false) {
		if(e.type != "asyncMessage")
			saveEventDataToLocalStorage("Received message without error "+e.type);
		
		callFunctionByName(e);
	}

	checkUnderReconnectionFlag(e);
}

function checkUnderReconnectionFlag(e) {
	var calledFunctionName = e.type;
	
	if (calledFunctionName == "c3it.login.checkUser" ) {
		isUnderRelogin = false;
		if(uiCommon.common.getInstance().isBlocked() == true) {
			uiCommon.common.getInstance().unBlockScreen();
		}
		
		reconnectionTryTime = null;
	}
	
	userMsgSentTime = null;
}

function checkUnderSendMessageFlag(e) {
	var calledFunctionName = e.type;
	
	if (calledFunctionName == myCallMethod) {
		myCallMethod = null;
		myJsonData = null;
		isUnderSending = false;
	}
}
*/



function troubleshooting(e) {
// 	var calledFunctionName = e.type;
	var calledFunctionName = e.requestType;
	var messageType = e.data.messageType;
	var message = e.data.message;
	var messageId = e.data.messageId;
	
	
	var isErrorReturned = messageType=="ER";
	var isMessageKindOfC3ITError = (messageId == "CM-002" || messageId == "CM-010");
	
	if (isErrorReturned) {
		
		saveEventDataToLocalStorage("ErrorMsg was received-" + messageId);
		
		if (isMessageKindOfC3ITError) {
			
			var logAuthInfo = getSessionItem('loginInfo');
			if(logAuthInfo != null && logAuthInfo != "") {
				isNeedRelogin = true;
			} else {
				tsbAlert.alert.getInstance().Info('<%=MessageResource.getInstance().getMessage("CM-020", languageType) %>');
			}
			
		} else {
			
			uiCommon.common.getInstance().unBlockScreen();
			tsbAlert.alert.getInstance().Info(message, function (e) {
				
				if(calledFunctionName=="c3it.login.checkUser" || calledFunctionName=="c3it.yardTruck.searchContainerItems") {
					document.location.href = loginPage; // +appendURL;
				} else {
					
				}
				
			});	
		}
		
		return true;
	}
	
	return false;
}

/*
function callFunctionByName(e) {
	var calledFunctionName = e.type;
	switch(calledFunctionName) {
    case "c3it.login.checkUser":
    	loginReceive(e);
        break;
    case "c3it.login.logOut":
		logOutReceive(e);
        break;
    case "c3it.yardTruck.searchYtList":
		searchYtListReceive(e);
        break;
    case "c3it.yardTruck.searchContainerItems":
		searchContainerItemsReceive(e);
        break;
    case "asyncMessage":
		asyncMessage(e);
        break;
    default:
        break;
	}
}
*/

// Tonny.Kim.2020.09.16
function asyncMessage(e) {
	//var wsContent = JSON.parse(e.body).WsMsg.content;
	var wsContent = JSON.parse(e.body).content;
	var dataItem = JSON.parse(wsContent);
	var asyncMsg = dataItem.msgHead;
	
	var responseMsg = "";
	var yardTruckNo = "";
	var loginYtNo = getSessionItem('yardTruckNo');
	
	saveEventDataToLocalStorage("AsyncMessage was received : "+ asyncMsg);
	console.log(asyncMsg);
	if(asyncMsg != '' || asyncMsg != null) {
		anyAsyncMessageReceivedTime = new Date();
	}
	
	if (asyncMsg == 'CK8') {
		responseMsg = 'CK7';
	} else if (asyncMsg == 'C01') {
		var mMode = e.data.dataItem.mMode;
		var receivedYTNo = e.data.dataItem.yardTruckNo;
		if(mMode == "DC2") {
			if(loginYtNo == receivedYTNo) {
				tsbAlert.alert.getInstance().Info('<%=MessageResource.getInstance().getMessage("CM-015", languageType) %>', function (e,p) {});
				compulsoryLogout();
			}
		}
	} else if (asyncMsg == 'AK') {
		
	} else if (asyncMsg == 'T11') {
		updateJobHandler(dataItem, asyncMsg);
	} else if (asyncMsg == 'T13') {
		updateJobHandler(dataItem, asyncMsg);
		
	}else if (asyncMsg == 'T22'){
		
		var responseData = {
			data : dataItem.containerList, 
			dataItem : null,
			limit : 20
		};
		drawingContainerItems(responseData);
	}
	
	else if (asyncMsg == 'T37') { // added by jaeok (2020.12.23) HJNC-CUSP-Controller v1.4 (1순위 2차분) CTR-206 B6
		var ytStatusItem = dataItem.ytStatusItem;
		if (ytStatusItem.yardTruckNo == getSessionItem('yardTruckNo')) {
			if (ytRenderer) {
				ytRenderer.containerInfo.dataItem = ytStatusItem;
				drawingContainerItems(ytRenderer.containerInfo);
			}
		}
	
	} else if (asyncMsg == 'C04') {
		var equipmentNo 	= dataItem.equipmentNo;
		var alertMessage 	= dataItem.alertMessage;
		var mode 			= dataItem.mmode;
		
		if (mode == "GM") {
			if(equipmentNo.indexOf(loginYtNo) > -1 || equipmentNo=="ALL") {
				tsbAlert.alert.getInstance().Info(alertMessage);			
			}
		} else if (mode == "QLC") { // added by YoungOk Kim (2019.04.25) - Mantis 89570: [Tally] QC Lane을 지정하는 기능
			var isNeedRefresh = false;
			
			var containerArea = document.getElementById("AreaContainerField");
			if (containerArea != null && containerArea != undefined ) {
				var containerList = containerArea.children;
				if (containerList != null && containerList != undefined && containerList.length > 0) {
					for (i = 0; i < containerList.length; i++) {
						var containerTitle = containerList[i].title;
						var idx = containerTitle.indexOf("+");
						var queueName = containerTitle.substring(idx + 1);
						if (queueName == equipmentNo) {
							isNeedRefresh = true;
						}
					}
				}
			}
			
			if (isNeedRefresh == true) {
				getYTJobList();
			}
			
		} else {
			// nothing
		}
		
	} else if(asyncMsg.indexOf("ALIVE") > -1) {
		
		checkVersionForRenewal(asyncMsg);
		responseMsg = 'ALIVE';
		
	} else if (asyncMsg.startsWith('LOGIN-MSG')) {		// 로그인메시지 전송 요청 (SteveLee)
		console.log("*** Login-Requested from server, Msg = " + asyncMsg);
		
		var reqMsg = asyncMsg.split(':');
		if(reqMsg) {
			var reqEquNo = reqMsg[1];
			
			if(reqEquNo == iWeb.EQU_NO) {
				console.log("[WS]: *** 일치 & 요청 REQ = " + iWeb.EQU_NO);
				
				var url = '/yt/c3itConnect';
				var pw = atob(iWeb.USER_PWD64);
				var params = {
						userId : iWeb.USER_ID,
						password : pw,
						yardTruckNo : iWeb.EQU_NO
					};
		
				// C3IT 로그용 메시지 전송
				ajaxPost(url, params, function(data){ });	
			} else {
				console.log("*** 불일치: " + iWeb.EQU_NO);
			}
		}
	}
	//RBT. 2024. Robert add MOST <-> YT:
	else if (asyncMsg == 'T0') {
		if(dataItem.type == 'OPERATE'){
			updateJobHandler(dataItem, asyncMsg);
		}else{
			console.log(dataItem.type);
			//Nothing...
		}
    }
	else {
		//responseMsg = 'AK';
	}
	
	if (responseMsg.length > 0) {
		
		var jsonData = "";
		if(responseMsg == 'ALIVE') {
			var aliveMsgArray = asyncMsg.split('-');
			var requestedTime = aliveMsgArray[1];
			jsonData = {asyncMsg: "ALIVE-"+requestedTime+"-"+ clientUniqueId};
		} else {
			jsonData = {asyncMsg:responseMsg};
		}
		
		if (checkValidServiceStatus() == true) {

			// OLD.Tonny.Kim.2020.09.16
// 			if(responseMsg == 'ALIVE') {
// 				wsConnection.send('wss.alive.updateState', jsonData);
// 			} else {
// 				wsConnection.send('c3it.async.sendAsyncMsg', jsonData);
// 			}
			
			// Tonny.Kim.2020.09.16
			if(responseMsg == 'ALIVE') {
				// 기존 GWCT에서도 구현되지 않음.
			} else {
				//Tonny.kim.2020.09.16
				var url = '/yt/sendMessageAsync';
				ajaxPost(url, jsonData);
			}
			
			saveEventDataToLocalStorage('AsyncResponseMessage was sent : '+ jsonData);
		}
	}
}

///////////////////////////////////////////////////////
//	Login function
//////////////////////////////////////////////////////


/**
 * Event Login Click
 * @param event
 * @returns {Boolean}
 */
function loginHandler(event){

	var logAuthInfo = getSessionItem('loginInfo');
	var yardTruckNo = getSessionItem('yardTruckNo');
	
 	if(logAuthInfo != "" && logAuthInfo != null) {
 		tsbAlert.alert.getInstance().Info('<%=MessageResource.getInstance().getMessage("CM-014", languageType) %>', function (e,p) {});
	} else {
		$('#btLogin').button('disable'); // 버튼 비활성화
		$('#btnChangePassword').button('disable'); // 버튼 비활성화
		
		// check mandatory
		var userId = $.trim($("#txUserId").val().toUpperCase());	//Modified by MS.Kim (2023.01.05) [EMGPT] 145736: Username filed should write in CAPS letters
		var password = $.trim($("#txPassword").val());

		localstorage.setItem("localPassword", password);
		var yardTruckNo = $.trim($("#txYardTruckNo").val().toUpperCase());
		let isValidation = true;
		let msgDesc = "";
		
		let pwValidationMsg = pwLoginValidation(); // added by MinSeok (2021.08.02) PW Validation (AC랑 다름)
		let focusEl; // added by MinSeok (2021.08.02) MSG 창 닫히면 Focus 되도록 수정

		if(initializePassword === password){
			msgDesc = '<%=MessageResource.getInstance().getMessage("CM_1112", languageType) %>';
			isValidation = false;
		}
		else if( userId == '' || userId == null){
			msgDesc = '<%=MessageResource.getInstance().getMessage("CM-003", languageType) %>';
			focusEl = () => $("#txUserId").focus();
			isValidation = false;
		}
		else if(pwValidationMsg.length > 0){
			msgDesc = pwValidationMsg;
			focusEl = () => $("#txPassword").focus();
			isValidation = false;
		}
		else if( yardTruckNo == '' || yardTruckNo == null){
			msgDesc = '<%=MessageResource.getInstance().getMessage("YT-001", languageType) %>';
			focusEl = () => $("#txYardTruckNo").focus();
			isValidation = false;
		}

		if(isValidation == false){
			tsbAlert.alert.getInstance().Info(msgDesc, function(){
				$('#btLogin').button('enable');
				$('#btnChangePassword').button('enable');
				focusEl(); 
			});
			return false;
		}
		
		// global variable
		userIdtemp = userId;
		userPwtemp = password; // added by jaeok (2021.02.03) Mantis 0113101: 로그인 화면에서 사용자ID 및 비밀번호 저장 및 유지
		ytNotemp = yardTruckNo;
		
// 		checkLocalPass();	// added by SH.Nam (2018.12.26) 88171: [모든단말기] 로그인시 Password 기본 저장 기능

		// OLD.Tonny.Kim.2020.0909
// 		var parm = {
// 			parmClass: 'com.tsb.web.c3it.bizparm.common.LoginParm',
// 			value: {
// 				clientId 			: '',
// 				userId   			: (userId.replace( /(\s*)/g, "" )).toUpperCase(),
// 				password 			: password.replace( /(\s*)/g, ""),
// 				equNo    			: (ytNotemp.replace( /(\s*)/g, "" )),
// 				blockVessel			: '',
// 				baySpBay 			: '',
// 				apoint   			: '',
// 				remark   			: '',
// 				proxy    			: '',
// 				ldapAuthenticated	: '',
// 				connectionMode		:''
// 			}
// 		}
		
// 		sendMessage('c3it.login.checkUser', parm, loginReceive);
		// Tonny.Kim.2020.09.09
		sendLogin2(userId, password, yardTruckNo);
	}
	 
}

 // Tonny.Kim.2020.09.09
 function sendLogin(loginId, loginPw, truckNo) {
	 
	iWeb.USER_ID = loginId;
	iWeb.USER_ID64 = btoa(loginId);		// Base64 Encode
	iWeb.USER_PWD64 = btoa(loginPw);	// Base64 Encode
	iWeb.EQU_NO = truckNo;				// EquNo.
	
	console.log(iWeb.OAUTH_TOKEN_URI);
	console.log(iWeb.USER_ID64 + ' ' + iWeb.USER_PWD64);
	
	iWeb.OAUTH_TOKEN_TYPE = AUTH.TOKEN_TYPE.TOKEN_TYPE_BASIC; 
	//iWeb.OAUTH_ACCESS_TOKEN = btoa(String.format ('{0}:{1}:{2}', loginId, loginPw,'MOST'));
	iWeb.OAUTH_ACCESS_TOKEN = btoa(String.format ('{0}:{1}:{2}', loginId, loginPw,'YT'));
	
	//added by Brian (2023/12/01,temporary key in the client)
	setSessionItem('OAUTH_TOKEN_TYPE', iWeb.OAUTH_TOKEN_TYPE);		
	setSessionItem('OAUTH_ACCESS_TOKEN', iWeb.OAUTH_ACCESS_TOKEN);	
	
	var url = "/auth/createToken";
	var params = { 
			     grant_type: 'password', 
			     userId: iWeb.USER_ID64, 
				 password: iWeb.USER_PWD64,
				 accessToken: iWeb.OAUTH_ACCESS_TOKEN,
				 truckNo:truckNo
	 };

	ajaxLoginPost(url, params, function(response){
		var oAuthResponse = response;
		var authVo = oAuthResponse.response.data[0];	// OAuth2 의 Token
		
		fn_oauth_(authVo.accessToken, authVo.refreshToken, authVo.expiresInSec);
		
		iWeb.OAUTH_TOKEN_TYPE = AUTH.TOKEN_TYPE.TOKEN_TYPE_BEARER;
		iWeb.OAUTH_ACCESS_TOKEN = authVo.accessToken;
		
		setSessionItem('OAUTH_TOKEN_TYPE', AUTH.TOKEN_TYPE.TOKEN_TYPE_BEARER);		
		setSessionItem('OAUTH_ACCESS_TOKEN', authVo.accessToken);	
		
		// session storage setting
		setSessionItem(SESSION_USER_ID,    iWeb.USER_ID);
		setSessionItem(SESSION_USER_PWD64, iWeb.USER_PWD64);
		setSessionItem(SESSION_YT_NO, 	   iWeb.EQU_NO);

		var url = '/yt/searchLoginStoppageItem';
		var params = {
				equNo : truckNo
			};
		
		ajaxPost(url, params, function(data){
			var record = data.response.dataItem;
			
			var loginInfo = new Object();
			loginInfo.mMode = 'NL'; // New Login
			loginInfo.userId = loginId;
			loginInfo.yardTruckNo = truckNo;
			loginInfo.clientId = '1';
			loginInfo.useStoppage =	'Y';
			
			if(record != null){
				loginInfo.stoppageCd = record.stoppageCd;
				loginInfo.stoppageDesc = record.stoppageDesc;
				loginInfo.stoppageSTime = record.stopSTime;
			}

			
			//Tonny.kim.2020.09.14
			var url = '/yt/c3itConnect';
			var params = {
					userId : loginId,
					password : loginPw,
					yardTruckNo : truckNo
			};

			// C3IT 로그인 후에 YardJobList로 전환
			ajaxPost(url, params, function(data){
				// added by MinSeok.K (2021.08.17) Wrong PW 
				let result = data.response.data[0];
				
				if(result.loginResult) {
					loginReceive(loginInfo);			
					connectWebSocket(); // WebSocket
				} else { 
					tsbAlert.alert.getInstance().Info(result.errMsg, function(e){
						$('#btLogin').button('enable'); // 버튼 활성화
						$('#btnChangePassword').button('enable'); // 버튼 활성화
					});
				}
			});			
		});
	}, function(errorDescription){
		$('#btLogin').button('disable'); // 버튼 비활성화
		$('#btnChangePassword').button('disable'); // 버튼 비활성화
		
		tsbAlert.alert.getInstance().Info(errorDescription, function(e){
			$('#btLogin').button('enable'); // 버튼 활성화
			$('#btnChangePassword').button('enable'); // 버튼 비활성화
		});
	});
 }
 
 
 
//RBT. 2024.03.11 added:
//Login same MOST SYSTEM (without MTS):
	function sendLogin2(loginId, loginPw, truckNo) {
		 
		iWeb.USER_ID = loginId;
		iWeb.USER_ID64 = btoa(loginId);		// Base64 Encode
		iWeb.USER_PWD64 = btoa(loginPw);	// Base64 Encode
		iWeb.EQU_NO = truckNo;				// EquNo.
		
		console.log(iWeb.OAUTH_TOKEN_URI);
		console.log(iWeb.USER_ID64 + ' ' + iWeb.USER_PWD64);
		var key = encryptAES(loginId);
		var encryptPwd = encryptAES (key, loginPw);
		
		iWeb.OAUTH_TOKEN_TYPE = AUTH.TOKEN_TYPE.TOKEN_TYPE_BASIC; 
		//iWeb.OAUTH_ACCESS_TOKEN = btoa(String.format ('{0}:{1}:{2}', loginId, loginPw,'MOST'));
		//iWeb.OAUTH_ACCESS_TOKEN = btoa(String.format ('{0}:{1}:{2}', loginId, loginPw,'YT'));
		iWeb.OAUTH_ACCESS_TOKEN = btoa(String.format ('{0}:{1}:{2}:{3}:{4}', loginId, encryptPwd,'MOST', key, ''));
				
		//added by Brian (2023/12/01,temporary key in the client)
		setSessionItem('OAUTH_TOKEN_TYPE', iWeb.OAUTH_TOKEN_TYPE);		
		setSessionItem('OAUTH_ACCESS_TOKEN', iWeb.OAUTH_ACCESS_TOKEN);	
		
		var url = "auth/token";
		
		var params = { 
				     grant_type: 'password', 
				     userId: iWeb.USER_ID64, 
					 password: iWeb.USER_PWD64,
					 accessToken: iWeb.OAUTH_ACCESS_TOKEN,
					 truckNo:truckNo,
					 branchCode: 'MOST_LAIP',
					 isSso: false
		 };

		ajaxLoginPost(url, params, function(response){
			var oAuthResponse = response;
			var authVo = oAuthResponse.response.data[0];	// OAuth2 의 Token
			
			fn_oauth_(authVo.accessToken, authVo.refreshToken, authVo.expiresInSec);
			
			iWeb.OAUTH_TOKEN_TYPE = AUTH.TOKEN_TYPE.TOKEN_TYPE_BEARER;
			iWeb.OAUTH_ACCESS_TOKEN = authVo.accessToken;
			
			setSessionItem('OAUTH_TOKEN_TYPE', AUTH.TOKEN_TYPE.TOKEN_TYPE_BEARER);		
			setSessionItem('OAUTH_ACCESS_TOKEN', authVo.accessToken);	
			
			// session storage setting
			setSessionItem(SESSION_USER_ID,    iWeb.USER_ID);
			setSessionItem(SESSION_USER_PWD64, iWeb.USER_PWD64);
			setSessionItem(SESSION_YT_NO, 	   iWeb.EQU_NO);
			
			var loginInfo = new Object();
			
			loginInfo.mMode = 'NL'; // New Login
			loginInfo.userId = loginId;
			loginInfo.yardTruckNo = truckNo;
			loginInfo.clientId = '1';
			loginInfo.useStoppage =	'Y';
			
		    //var url = '/yt/searchLoginStoppageItem';
			//RBT. 20240314. Replaced:
            var url = '/MOST_MMC_VMT_Web/rest/yt/searchLoginStoppageItem';

			var params = {
					equNo : truckNo
				};
			
			ajaxPost(url, params, function(data){
				var record = data.response.dataItem;
				
				//RBT. 20240314. added Checking for new source code
				if(data.response.dataItem){
					record = data.response.dataItem;
				}else{
					record = data.response.data[0];
				}
				
				/* var loginInfo = new Object();
				loginInfo.mMode = 'NL'; // New Login
				loginInfo.userId = loginId;
				loginInfo.yardTruckNo = truckNo;
				loginInfo.clientId = '1';
				loginInfo.useStoppage =	'Y'; */			
					            
				if(record != null){
					loginInfo.stoppageCd = record.stoppageCd;
					loginInfo.stoppageDesc = record.stoppageDesc;
					loginInfo.stoppageSTime = record.stopSTime;
				}

				loginReceive(loginInfo);
                connectWebSocket();
                
				/* 
				//Tonny.kim.2020.09.14
				var url = '/yt/c3itConnect';
				var params = {
						userId : loginId,
						password : loginPw,
						yardTruckNo : truckNo
				};

				// C3IT 로그인 후에 YardJobList로 전환
				ajaxPost(url, params, function(data){
					// added by MinSeok.K (2021.08.17) Wrong PW 
					let result = data.response.data[0];
					
					if(result.loginResult) {
						loginReceive(loginInfo);			
						connectWebSocket(); // WebSocket
					} else { 
						tsbAlert.alert.getInstance().Info(result.errMsg, function(e){
							$('#btLogin').button('enable'); // 버튼 활성화
							$('#btnChangePassword').button('enable'); // 버튼 활성화
						});
					}
				}); */			
			});
		}, function(errorDescription){
			$('#btLogin').button('disable'); // 버튼 비활성화
			$('#btnChangePassword').button('disable'); // 버튼 비활성화
			
			
			//RBT. 20240313  temp_
			$('#btLogin').button('enable'); // 버튼 활성화
			$('#btnChangePassword').button('enable'); // 버튼 비활성화
			/* tsbAlert.alert.getInstance().Info(errorDescription, function(e){
				$('#btLogin').button('enable'); // 버튼 활성화
				$('#btnChangePassword').button('enable'); // 버튼 비활성화
			}); */ 
		});
	 }
 
 
 


 /**
  * C3IT Disconnenct
  */
function c3itDisConnect(){
	var userId 		= getSessionItem('userId');
	var ytNo 		= getSessionItem('yardTruckNo');
	var url = '/yt/c3itDisConnect';
	
	var params = {
			userId : userId,
			yardTruckNo : ytNo
		};

	ajaxPost(url, params, function(data){

				setSessionItem(SESSION_USER_ID,    '');
				setSessionItem(SESSION_USER_PWD64, '');
				setSessionItem(SESSION_YT_NO, 	   '');
				
			}, function(error){
				
				$('#btLogin').button('disable'); // 버튼 비활성화
				$('#btnChangePassword').button('disable'); // 버튼 비활성화
				
				setSessionItem(SESSION_USER_ID,    '');
				setSessionItem(SESSION_USER_PWD64, '');
				setSessionItem(SESSION_YT_NO, 	   '');
				
				tsbAlert.alert.getInstance().Info(errorDescription, function(e){
					$('#btLogin').button('enable'); // 버튼 활성화
					$('#btnChangePassword').button('enable'); // 버튼 비활성화
				});
	        }
	 );
	
}
 
function c3itIsAlive() {
	var userId 		= getSessionItem('userId');
	var ytNo 		= getSessionItem('yardTruckNo');
	var url = '/yt/sendIsAlive';
	var params = {
			userId : userId,
			yardTruckNo : ytNo
		};

	// C3IT 로그인 후에 YardJobList로 전환
	ajaxPost(url, params, function(data){
	});
}

/**
 * Receive Login Information
 * @param e
 */
function loginReceive(e){
	var loginInfo = e;
	isNeedRelogin = false;
	
	if(loginInfo.mMode == 'RC') {
		uiCommon.common.getInstance().unBlockScreen();
		
		if ($.mobile.activePage.is("#jobListPage")){
			var logAuthInfo = getSessionItem('loginInfo');
			if(logAuthInfo != null && logAuthInfo != "") {
				getYTJobList(); // Data should be refreshed after RC 
			}
			$("#ytJobTitle").text(getHeaderTitleText());
        }
		
		saveEventDataToLocalStorage("Relogin was successful");
		
	} else {
		// session storage setting
		setSessionItem('loginInfo', 			loginInfo);
		setSessionItem('userId', 				loginInfo.userId);
		setSessionItem('yardTruckNo', 			loginInfo.yardTruckNo.toUpperCase());
		setSessionItem('clientId', 				loginInfo.clientId);
	
		//< added by Rackhyun Jeong (2019.01.20) - YT Stoppage
		// OLD.Tonny.Kim.2020.09.10
		setSessionItem(SESSION_USE_STOPPAGE,	loginInfo.useStoppage);
		
		if (loginInfo.stoppageCd != null && loginInfo.stoppageCd.length > 0) {
			setSessionItem(SESSION_UNDER_STOPPAGE, "Y");
			setSessionItem(SESSION_STOPPAGE_CODE, loginInfo.stoppageCd);
			setSessionItem(SESSION_STOPPAGE_DESC, loginInfo.stoppageDesc);
			setSessionItem(SESSION_STOPPAGE_STIME, loginInfo.stoppageSTime);
		}
		//>
		
		localstorage.setItem("userId", 			loginInfo.userId);
		localstorage.setItem("userPw", 			userPwtemp); // added by jaeok (2021.02.03) Mantis 0113101: 로그인 화면에서 사용자ID 및 비밀번호 저장 및 유지
		localstorage.setItem("yardTruckNo", 	loginInfo.yardTruckNo);
		
		// WebLog 
		saveEventDataToLocalStorage("Login successfully");

		// title setting
		//title = "Yard Tractor (" + getSessionItem('yardTruckNo') + ")";
		title = getSessionItem('yardTruckNo');
		
		setSessionItem("title", title);
		$("#ytJobTitle").text(getHeaderTitleText());
		
		//< added by Rackhyun Jeong (2019.01.20) - YT Stoppage
		if (getSessionItem(SESSION_UNDER_STOPPAGE) == "Y") {
			var ytNo = getSessionItem(SESSION_YT_NO);
			var stoppageDesc = getSessionItem(SESSION_STOPPAGE_DESC);
			var stoppageSTime = getSessionItem(SESSION_STOPPAGE_STIME);
			
			goUnderStoppage(ytNo, stoppageDesc, stoppageSTime);
			
		} else {
		//>
			// Page setting
			$.mobile.changePage('#jobListPage','slide','reverse');
			getYTJobList();
		}
		// Logging transmission
		sendLocalStorageInfoToServer();
	} 
}

function ytModuleExit() {
	
	//OLD.Tonny.Kim.2020.09.15
// 	if(checkValidServiceStatus() == false) {
<%-- 		tsbAlert.alert.getInstance().Info('<%=MessageResource.getInstance().getMessage("CM-020", languageType) %>', function (e,p) { --%>
// 			// compulsoryLogout();
// 		});
// 	} else {
		
		uiCommon.common.getInstance().blockScreen();
		
		/*
		 var jsonData = "{"+
			"clientId:''"+ 
			",userId:" + getSessionItem('userId') + 
			",password:''"+ 
			",equNo:"+ getSessionItem('yardTruckNo') +
			",blockVessel:''"+
			",baySpBay:''"+
			",apoint:''"+
			",remark:''"+
			",proxy:''"+
			",ldapAuthenticated:''"+
			",connectionMode:''"+
			"}";
			wsConnection.send('c3it.login.logOut', jsonData);
		*/	
		
// 		var parm = {
//             parmClass: 'com.tsb.web.c3it.bizparm.common.LoginParm',
//             value: {
//                 clientId 			: '',
//                 userId   			: getSessionItem('userId'),
//                 password 			: '',
//                 equNo    			: getSessionItem('yardTruckNo'),
//                 blockVessel			: '',
//                 baySpBay 			: '',
//                 apoint   			: '',
//                 remark   			: '',
//                 proxy    			: '',
//                 ldapAuthenticated	: '',
//                 connectionMode		: ''
//             }
//         }
			
// 		sendMessage('c3it.login.logOut', parm, logOutReceive);
			
// 	}

		// Tonny.Kim.2020.09.15
		//logOutReceive();
		
		//RBT. 2024.0313. added for new source code:
		logOutReceive2();
}

// Tonny.Kim.2020.09.16
function logOutReceive(e) {
	// Logging transmission
	sendLocalStorageInfoToServer();
	c3itDisConnect(); // 2020.12.14.Tonny.Kim
// 	var appendURL = createURLstring();
	closeWebSocket();
	iWeb.OAUTH_ACCESS_TOKEN = null; // 로그인 Token
	clearSession();
	document.location.href = loginPage; // +appendURL;
}

//RBT. 2024.0313. added for new source code:
function logOutReceive2(e) {
	// Logging transmission
	sendLocalStorageInfoToServer();
	c3itDisConnect(); // 2020.12.14.Tonny.Kim
// 	var appendURL = createURLstring();
	closeWebSocket();
	iWeb.OAUTH_ACCESS_TOKEN = null; // 로그인 Token
	clearSession();
	document.location.href = loginPage; // +appendURL;
}

// Tonny.Kim.2020.09.19
function compulsoryLogout() {
	// Logging transmission
	sendLocalStorageInfoToServer();
	
// 	var appendURL = createURLstring();
	c3itDisConnect(); // 2020.12.14.Tonny.Kim
	if(wsConnection != null) wsConnection.close();
	clearSession();
	document.location.href = loginPage; // +appendURL;
}

function createURLstring() {
	uiCommon.common.getInstance().unBlockScreen();
	var appendURL = '';
	
	if(getSessionItem('yardTruckNo') != "" || getSessionItem('userId') != "") {
		appendURL += "?ytNo=" + getSessionItem('yardTruckNo') + "&userId=" + getSessionItem('userId');	
	} else {
		if(ytNotemp != '' && ytNotemp != null && ytNotemp != undefined) {
			if(userIdtemp.indexOf('#')>0) {
				userIdtemp = "";	
			}
			appendURL += "?ytNo=" + ytNotemp + "&userId=" + userIdtemp;
		}	
	}
	return appendURL;
}

function loginKeyHandler(e) {
	 if (e.keyCode == 13) {
		 loginHandler();
	 }
}

//added by SH.Nam (2018.12.26) 88171: [모든단말기] 로그인시 Password 기본 저장 기능
function checkLocalPass() {
<%-- 	if ('TRUE' === '<%=AppContextPropertyLoader.properties.get("PWD_SAVE")%>'.toUpperCase().trim()) { --%>
		var savedPass = localstorage.getItem("localPassword");
		var password = $('#txPassword').val();
		
		if (savedPass == undefined || savedPass == "") {
			var showText = "<%=MessageResource.getInstance().getMessage("CM-022", languageType) %>";
			if (confirm(showText)) {
				localstorage.setItem("localPassword", password);
			}
		} else {
// 			savedPass = savedPass.toUpperCase(); // Tonny.Kim.2020.09.15 
			if (savedPass != password) {
				var showText = "<%=MessageResource.getInstance().getMessage("CM-023", languageType) %>";
				if (confirm(showText)) {
					localstorage.setItem("localPassword", password);
				}
			}
		}
// 	} else {
// 		if (localstorage.getItem("localPassword") != null) {
// 			localstorage.removeItem("localPassword");
// 		}
// 	}
}

///////////////////////////////////////////////////////
// Job List function
//////////////////////////////////////////////////////

// added by YoungOk Kim (2019.01.19)
function playAlarm() {
	var audio = new Audio('./audio/alarm.WAV');
	audio.play();
}

function blockOut() {
	var ytNoNo = getSessionItem('yardTruckNo');
	console.log("<*> blockOut(Start) ----------- " + ytNoNo);
	
	var containerItem;
	if (ytRenderer.containerInfo != null) {
		let jobArrayList = ytRenderer.containerInfo.data;
		
		// EXECUTING 상태일 경우 허용하지 않는다.
		for (var i = 0; i < jobArrayList.length; i++) {
			// Quay로 가는 경우 허용하지 않는다.
			if (jobArrayList[i].yardJobCode == "DF" && jobArrayList[i].jobState.substring(0, 1) == "B") {
				tsbAlert.alert.getInstance().Info('<%=MessageResource.getInstance().getMessage("YT-007", languageType) %>');
				return;
				
			} else if (jobArrayList[i].yardJobCode == "LO" && jobArrayList[i].jobState.substring(0, 1) == "C") {
				tsbAlert.alert.getInstance().Info('<%=MessageResource.getInstance().getMessage("YT-007", languageType) %>');
				return;
			}

			if (jobArrayList[i].atcJobStatus == '4') { // EXECUTING
				tsbAlert.alert.getInstance().Info('<%=MessageResource.getInstance().getMessage("YT-006", languageType) %>');
				return;
			}
		}
		
		for (var i = 0; i < jobArrayList.length; i++) {
			if (jobArrayList[i].atcJobStatus == '3') { // EXECUTABLE
				containerItem = jobArrayList[i];
				break;
			}
		}
	}
	
	if (containerItem == undefined) {
		tsbAlert.alert.getInstance().Info('<%=MessageResource.getInstance().getMessage("YT-005", languageType) %>');
		return;
	}
	
	// Tonny.Kim.2020.09.11
	var url = '/yt/blockOut';
	var params = {
			mMode 			: 'RFX',
			yardTruckNo   	: getSessionItem('yardTruckNo'),
			containerItem   : containerItem
		};
	
	ajaxPost(url, params, function(data){			
        console.log("<*> blockOut(End) Success! ----------- " + ytNoNo);
        //getYTJobList();
	});
}

function btnRefreshClicked() {
	if (uiCommon.common.getInstance().isBlocked() == false) {
		uiCommon.common.getInstance().blockScreen();
	}
	
	getYTJobList();
}

function getYTJobList() {

	// 	sendMessageWithCheck('c3it.yardTruck.searchContainerItems', parm, searchContainerItemsReceive);
		var ytNoNo = getSessionItem('yardTruckNo');
		console.log("<*> getYTJobList(Start) ----------- " + ytNoNo);
	
		// Tonny.Kim.2020.09.11
		//var url = '/yt/searchContainerItems';
		
		//RBT. 20240212 add
		var url = '/MOST_MMC_VMT_Web/rest/yt/searchContainerItems';
		var params = {
				mMode 			: 'J1',
				yardTruckNo   	: getSessionItem('yardTruckNo'),
				equipmentNo   	: getSessionItem('yardTruckNo'),
				userId			: getSessionItem('userId')
			};
		
		ajaxPost(url, params, function(data){
	// 		searchContainerItemsReceive(data.response);
			// var dataTxt = JSON.stringify(data);		// 테스트: 확인용
	        // console.log("" + dataTxt);			
	        console.log("<*> getYTJobList(End) Success! ----------- " + ytNoNo);
			drawingContainerItems(data.response);
			
			// var wtChannel = data.response.dataItem.wtChannel;
			// $("#wtChannel").text("CH." + wtChannel);
			
			// 세션에 저장하고 시간 조회할 때 사용한다.
			// var staffName = data.response.dataItem.staffName;
			var staffName = getSessionItem('userId')
			setSessionItem(SESSION_STAFF_NAME, staffName);
		}, function(error){
	
		});
}

function searchContainerItemsReceive(e){
	uiCommon.common.getInstance().unBlockScreen();
	containerInfo = e;
	var count = e.data.length;
	
	if(count != 0) {
		$("#AreaContainerField").empty();
		var divContainer = document.getElementById("AreaContainerField");
		
		var mainJobArrayList = containerInfo.data;
		var mainListCount = mainJobArrayList.length;
		
		for(var i =0; i<mainListCount; i++) {
			
			var containerItem = mainJobArrayList[i];
			
			var divContainerArea = document.createElement( 'div' );
			divContainerArea.id= "divContainerArea"+containerItem.containerNo;
			divContainerArea.title = containerItem.containerNo + "+" + containerItem.queueName; // added by YoungOk Kim (2019.04.25) - Mantis 89570: [Tally] QC Lane을 지정하는 기능 
			
			if (containerItem.ytNotification == 'Y') { // added by YoungOk Kim (2019.04.25) - Mantis 89478: [Tally] YT로 메시지 전송 기능
				// modified by YoungOk Kim (2020.02.12) - Mantis 105063: [YT] 위험물 및 검역 작업에 색상으로 테두리 표시하여 구분
				//divContainerArea.setAttribute('class','containerAreaYTNotificationStyle');
				if (containerItem.cargoType == 'DG'|| containerItem.cargoType == 'ED' || containerItem.cargoType == 'DR') {
					divContainerArea.setAttribute('class','containerAreaDGWithYtNotifyStyle');
				} else if (containerItem.inspectCheck == 'Y') {
					divContainerArea.setAttribute('class','containerAreaInspectionWithYtNotifyStyle');
				} else {
					divContainerArea.setAttribute('class','containerAreaYTNotificationStyle');
				}
			} else {
				// modified by YoungOk Kim (2020.02.12) - Mantis 105063: [YT] 위험물 및 검역 작업에 색상으로 테두리 표시하여 구분
				//divContainerArea.setAttribute('class','containerAreaStyle');
				if (containerItem.cargoType == 'DG'|| containerItem.cargoType == 'ED' || containerItem.cargoType == 'DR') {
					divContainerArea.setAttribute('class','containerAreaDGStyle');
				} else if (containerItem.inspectCheck == 'Y') {
					divContainerArea.setAttribute('class','containerAreaInspectionStyle');
				} else {
					divContainerArea.setAttribute('class','containerAreaStyle');
				}
			}
			
			// -------- 1 line -----------------------------------------------------
			
			var ulContainer1 = document.createElement( 'ul' );
			ulContainer1.className = "containerRowStyle";
			
			var liLiftIndicator = document.createElement( 'li' );
			var liftIndicatorText = '';
			if(containerItem.yardJobCode == 'YO' || containerItem.yardJobCode == 'LO') {
				liftIndicatorText = '▲';
				liLiftIndicator.setAttribute('class','liftIndicatorStyle');
			} else if(containerItem.yardJobCode == 'YF' || containerItem.yardJobCode == 'DF') {
				liftIndicatorText = '▼';
				liLiftIndicator.setAttribute('class','liftIndicatorStyle');
			} else {
				liftIndicatorText = '.';
				liLiftIndicator.setAttribute('class','liftIndicatorBlankStyle');
			}
			liLiftIndicator.appendChild(document.createTextNode(liftIndicatorText));
			
			var liJobCode = document.createElement( 'li' );
			var yardJobCodeText = ''
			
			if(containerItem.yardJobCode != '') {
				var tempJobCode = containerItem.yardJobCode;
				//< modified by Rackhyun Jeong (2018.12.18) - Support multi language for chassis position and job code
				
				if(tempJobCode == 'LO') {
					yardJobCodeText = '<%=MessageResource.getInstance().getMessage("LBYT-005", languageType) %>'
				} else if(tempJobCode == 'YF') {
					yardJobCodeText = '<%=MessageResource.getInstance().getMessage("LBYT-006", languageType) %>'
				} else if(tempJobCode == 'DF') {
					yardJobCodeText = '<%=MessageResource.getInstance().getMessage("LBYT-007", languageType) %>'
				} else if(tempJobCode == 'B1') {
					yardJobCodeText = '<%=MessageResource.getInstance().getMessage("LBYT-008", languageType) %>'
				} else if(tempJobCode == 'YY') {
					yardJobCodeText = '<%=MessageResource.getInstance().getMessage("LBYT-009", languageType) %>'
				} else if(tempJobCode == 'YO') {
					yardJobCodeText = '<%=MessageResource.getInstance().getMessage("LBYT-010", languageType) %>'
				} else if(tempJobCode == 'RF') {
					yardJobCodeText = '<%=MessageResource.getInstance().getMessage("LBYT-011", languageType) %>'
				} else if(tempJobCode == 'RO') {
					yardJobCodeText = '<%=MessageResource.getInstance().getMessage("LBYT-012", languageType) %>'
				} else if(tempJobCode == 'GF') {
					yardJobCodeText = '<%=MessageResource.getInstance().getMessage("LBYT-013", languageType) %>'
				} else if(tempJobCode == 'GO') {
					yardJobCodeText = '<%=MessageResource.getInstance().getMessage("LBYT-014", languageType) %>'
				//>
				} else {
					yardJobCodeText = tempJobCode;
				}
				liJobCode.setAttribute('class','jobCodeStyle');
			} else {
				yardJobCodeText = '.';
				liJobCode.setAttribute('class','jobCodeBlankStyle');
			}
			liJobCode.appendChild(document.createTextNode(yardJobCodeText));
			
			var liContainerNo = document.createElement( 'li' );
			var containerNoText = containerItem.containerNo;
			if(containerNoText != '') {
				containerNoText = containerItem.containerNo;
				if(containerItem.rtSideInfo != null && containerItem.rtSideInfo != "") {
					liContainerNo.setAttribute('class','containerItemBlinkStyle');
				} else {
					liContainerNo.setAttribute('class','containerItemStyle');
				}
			} else {
				containerNoText = '.';
				liContainerNo.setAttribute('class','containerItemBlankStyle');
			}
			liContainerNo.appendChild(document.createTextNode(containerNoText));
			liContainerNo.id = containerNoText;

			var licPosition = document.createElement( 'li' );
			licPosition.setAttribute('class','cPositionStyle');
			var cPositionFullText = "";
			
			//< modified by Rackhyun Jeong (2018.12.18) - Support multi language for chassis position and job code
			var position= containerItem.cposition; // Tonny.Kim.2020.09.14
			
			if(position=="M"){
				cPositionFullText = '<%=MessageResource.getInstance().getMessage("LBYT-003", languageType) %>';
			} else if(position=="A"){
				cPositionFullText = '<%=MessageResource.getInstance().getMessage("LBYT-004", languageType) %>';
			} else if(position=="F"){
				cPositionFullText = '<%=MessageResource.getInstance().getMessage("LBYT-002", languageType) %>';
			//>
			} else {			
				cPositionFullText = "."
				licPosition.setAttribute('class','cPositionBlankStyle');
			}
			licPosition.appendChild(document.createTextNode(cPositionFullText));

			
			/* var liSHoldDeck = document.createElement( 'li' );
			var sHoldDeck = ''
			if(containerItem.sHoldDeck != '') {
				if (containerItem.yardJobCode == 'LO') {
					sHoldDeck = containerItem.sHoldDeck;
				} else {
					sHoldDeck = '.';
				}
				liSHoldDeck.setAttribute('class','holdDeckStyle');
			} else {
				sHoldDeck = '.';
				liSHoldDeck.setAttribute('class','holdDeckBlankStyle');
			}
			liSHoldDeck.appendChild(document.createTextNode(sHoldDeck)); */
			
			// added by BE.Ahn (2019.08.22) Mantis GWCT 0092638 [YT] Lift Off
			var liLiftOff = document.createElement( 'li' );
			liLiftOff.className = "liftOffStype";
			var btnLiftOff = document.createElement('button')
			btnLiftOff.setAttribute('class', 'jobListBtnStyle');
			btnLiftOff.id = ID_PREFIX_BTN_LIFT_OFF + containerItem.containerNo + ID_DELIMETER + containerItem.yardJobCode;
			btnLiftOff.onclick = liftOffJobHandler;
			
			var liftOffText = '<%=MessageResource.getInstance().getMessage("LBYT-015", languageType) %>';
			btnLiftOff.appendChild(document.createTextNode(liftOffText));
			
			liLiftOff.appendChild(btnLiftOff);
			
			var allowLiftOff = false;
			
			if (checkAllowLiftOff(containerItem) == true) {
				allowLiftOff = true;
			}
			
			if (allowLiftOff == false) {
				// disable
				btnLiftOff.setAttribute('disabled', 'disabled');
				btnLiftOff.setAttribute('class', 'jobListBtnDisabledStyle');
				
			} else {
				btnLiftOff.removeAttribute('disabled');
				btnLiftOff.setAttribute('class', 'jobListBtnStyle');
			}
			
			ulContainer1.appendChild(liLiftIndicator);
			ulContainer1.appendChild(liJobCode);
			ulContainer1.appendChild(liContainerNo);
			ulContainer1.appendChild(licPosition);
// 			ulContainer1.appendChild(liSHoldDeck);
			ulContainer1.appendChild(liLiftOff);
			divContainerArea.appendChild(ulContainer1);
			
			// -------- 2 line -----------------------------------------------------
			
			var ulContainer2 = document.createElement( 'ul' );
			ulContainer2.className = "containerRowStyle";
			var liYardPosition = document.createElement( 'li' );
			liYardPosition.setAttribute('class','yardPositionStyle');
			var yardPositionFullText = containerItem.targetPosition; // Tonny.Kim.2020.09.14

			liYardPosition.appendChild(document.createTextNode(yardPositionFullText));
			
			//added by BE.Ahn (2019.11.18) Mantis 0103575: [YT] 베이/덱/홀드 표시
			var liHatchHoldDeck = document.createElement('li');
			liHatchHoldDeck.setAttribute('class','hatchHoldDeckStyle');
			var HatchHoldDeckFullText = containerItem.hatchIndex+"-"+containerItem.sholdDeck; // Tonny.Kim.2020.09.14
			liHatchHoldDeck.appendChild(document.createTextNode(HatchHoldDeckFullText));
			
			// added by JH.Tak (2018.12.18) display twin info
			//<!-- 
			var liTwinInfoText = document.createElement( 'li' );
			var twinCntrNo = containerItem.twinCntrNo;
			var twinInfoText = "";
			
			if(twinCntrNo != null && twinCntrNo.length > 0) {
				twinInfoText = '<%=MessageResource.getInstance().getMessage("LBYT-001", languageType) %>';
				liTwinInfoText.setAttribute('class','jobTwinStyle');	
			} else {
				twinInfoText = "";
				liTwinInfoText.setAttribute('class','jobTwinBlankStyle');	
			}
			
			liTwinInfoText.appendChild(document.createTextNode(twinInfoText));
			//-->
			var liSztp = document.createElement( 'li' );
			// modified by JH.Tak (2018.11.29) ADD PrivateSztp
			//<!--
			//modified by JH.Tak (2018.12.18) bug fix -  Not displayed private sztp
			<%--
			//var sztpText = CacheService.getConvertValue(containerItem.ptnrCd, containerItem.sizeType2);
			--%>
			var sztpText = CacheService.getConvertValue(SZTP_TYPE_TERMINAL, containerItem.sizeType2);
			
			if(sztpText == null || sztpText == undefined || sztpText == ""){
				sztpText = containerItem.sizeType;
			}
			//-->
			if(sztpText != '') {
				<%--
				//sztpText = containerItem.sizeType; // removed by JH.Tak (2018.12.18) bug fix - Not displayed private sztp
				--%>
				liSztp.setAttribute('class','sztpStyle');
			} else {
				sztpText = '.';
				liSztp.setAttribute('class','sztpBlankStyle');
			}
			liSztp.appendChild(document.createTextNode(sztpText));
			
			var liFe = document.createElement( 'li' );
			liFe.setAttribute('class','feStyle');
			var feFullText = "";
			if(containerItem.fe == "F") {
				feFullText = "Full";
			} else if(containerItem.fe == "E") {
				feFullText = "Empty";
			} else {
				feFullText = ".";
				liFe.setAttribute('class','feBlankStyle');
			}
			liFe.appendChild(document.createTextNode(feFullText));
			
			// added by YoungOk Kim (2019.04.25) - Mantis 89570: [Tally] QC Lane을 지정하는 기능
			var liQcLane = document.createElement( 'li' );
			liQcLane.setAttribute('class','qcLaneStyle');
			
			// added by YoungOk Kim (2019.04.25) - Mantis 89570: [Tally] QC Lane을 지정하는 기능
			var qcLaneText = containerItem.qcLane;
			if(qcLaneText != "") {
				qcLaneText += " LANE"
			} else {
				qcLaneText = ".";
				liQcLane.setAttribute('class','qcLaneBlankStyle');
			}
			liQcLane.appendChild(document.createTextNode(qcLaneText));
			
			ulContainer2.appendChild(liYardPosition);
			ulContainer2.appendChild(liHatchHoldDeck); // added by BE.Ahn (2019.11.18) Mantis 0103575: [YT] 해치/덱/홀드 표시 
			ulContainer2.appendChild(liTwinInfoText); // added by JH.Tak (2018.12.18) display twin info
			ulContainer2.appendChild(liSztp);
			ulContainer2.appendChild(liFe);
			ulContainer2.appendChild(liQcLane); // added by YoungOk Kim (2019.04.25) - Mantis 89570: [Tally] QC Lane을 지정하는 기능
			divContainerArea.appendChild(ulContainer2);
			
			// -------- 3 line -----------------------------------------------------
			
			var ulContainer3 = document.createElement( 'ul' );
			ulContainer3.className = "containerRowStyleHidden";
			
			var liRtSideInfo = document.createElement( 'li' );
			liRtSideInfo.setAttribute('class','rtSideInfoStyle');
			var rtSideInfoFullText = "";
			if(containerItem.rtSideInfo != null && containerItem.rtSideInfo != "") {
				rtSideInfoFullText = containerItem.rtSideInfo;
			} else {
				rtSideInfoFullText = ".";
				liRtSideInfo.setAttribute('class','rtSideInfoBlankStyle');
			}
			liRtSideInfo.appendChild(document.createTextNode(rtSideInfoFullText));
			
			
			var liYardJobCode = document.createElement( 'li' );
			liYardJobCode.setAttribute('class','blankStyle');
			liYardJobCode.appendChild(document.createTextNode(containerItem.yardJobCode));

			
			ulContainer3.appendChild(liRtSideInfo);
			ulContainer3.appendChild(liYardJobCode);
			divContainerArea.appendChild(ulContainer3);
			
			// ----------------------------
			
			divContainer.appendChild(divContainerArea);
			
			var jobInfo = "";
			jobInfo = "JobInfo : ("+containerItem.containerNo+" | "+containerItem.tEquipmentNo+")";
			saveEventDataToLocalStorage(jobInfo);
			
			
		} // for
	} else {
		$("#AreaContainerField").empty();
		var divContainer = document.getElementById("AreaContainerField");
		var divContainerArea = document.createElement( 'div' );
		divContainerArea.id = "noJobTextDiv"
		divContainerArea.setAttribute('class','noJobStyle');
		
		var offset = $('#AreaContainerField').offset();
		var height = $('#AreaContainerField').height();
		var width = $('#AreaContainerField').width();
		var top = offset.top + height + "px";
		var right = offset.left + width + "px";
		
		$("#AreaContainerField").css('right',right);
		divContainerArea.appendChild(document.createTextNode("NO JOB"));
		divContainer.appendChild(divContainerArea);
		
		saveEventDataToLocalStorage("Jobinfo : No Job");
	}
	
	// Initial UI setting
	$('#btnRefresh').css('fill','#257BCF');
	$('#btnExit').css('fill','#257BCF');
	$('#btnStoppage').css('fill','#257BCF');
	
// 	$(document).scrollTop('0');
	
}



//------------------------------------------
//Broadcast handling part start       -----
//------------------------------------------
// Tonny.Kim.2020.09.16
function updateJobHandler(dataItem, asyncMsg) {
	/*
	mMode : CR, CL(DN), UP, CH
	*/
	if (asyncMsg == "T11") {
		var mMode = dataItem.mMode;
		var containerItem = dataItem;
		if (containerItem.yardTruckNo.trim() == getSessionItem('yardTruckNo').trim()) {
			if (mMode == "UP") {
				var refresh = false;
				if (ytRenderer) {
					let jobArrayList = ytRenderer.containerInfo.data;
					if (jobArrayList != null && jobArrayList.length > 0) {
						for (var i = 0; i < jobArrayList.length; i++) {
							if (jobArrayList[i].containerNo == containerItem.containerNo) {
								jobArrayList[i] = containerItem; // replace
								refresh = true;
								break;
							}
						}
					}
				}
				if (refresh == true) {
					drawingContainerItems(ytRenderer.containerInfo);
				} else {
					getYTJobList();
				}
			} else {
				getYTJobList();	
			}			
		}
	} else if (asyncMsg == "T13") {
		if (dataItem.rstT11Item) {
			if (dataItem.fromYT == getSessionItem('yardTruckNo').trim()) {
				getYTJobList();
				
			} else if (dataItem.toYT == getSessionItem('yardTruckNo').trim()) {
				getYTJobList();
			}
		}
	} 
	//RBT. 2024. MOST YT add:
	else if (asyncMsg == "T0" && dataItem.type == "OPERATE") {
		getYTJobList();
	}
}


function processmModeHandling(mMode, containerItem) {
	if(mMode == "CR" || mMode == "UP") {
		deleteJobHandler(containerItem);
		createJobHandler(containerItem);	
	} else if(mMode == "CL" || mMode == "DN") {
		deleteJobHandler(containerItem); 
	}
	
	playAlarm(); // added by YoungOk Kim (2019.01.19)
	
	$(document).scrollTop('0');
}


// Create part ---------------------------------------------------------

function createJobHandler(containerItem) {
	
	if(!checkingDuplicateJob(containerItem)) {
		var divContainer = document.getElementById("AreaContainerField");
		$("#noJobTextDiv").remove();

		var divContainerArea = document.createElement( 'div' );
		divContainerArea.id= "divContainerArea"+containerItem.containerNo;
		divContainerArea.title = containerItem.containerNo + "+" + containerItem.queueName; // added by YoungOk Kim (2019.04.25) - Mantis 89570: [Tally] QC Lane을 지정하는 기능 
		
		if (containerItem.ytNotification == 'Y') { // added by YoungOk Kim (2019.04.25) - Mantis 89478: [Tally] YT로 메시지 전송 기능
			// modified by YoungOk Kim (2020.02.12) - Mantis 105063: [YT] 위험물 및 검역 작업에 색상으로 테두리 표시하여 구분
			//divContainerArea.setAttribute('class','containerAreaYTNotificationStyle');
			if (containerItem.cargoType == 'DG'|| containerItem.cargoType == 'ED' || containerItem.cargoType == 'DR') {
				divContainerArea.setAttribute('class','containerAreaDGWithYtNotifyStyle');
			} else if (containerItem.inspectCheck == 'Y') {
				divContainerArea.setAttribute('class','containerAreaInspectionWithYtNotifyStyle');
			} else {
				divContainerArea.setAttribute('class','containerAreaYTNotificationStyle');
			}
		} else {
			// modified by YoungOk Kim (2020.02.12) - Mantis 105063: [YT] 위험물 및 검역 작업에 색상으로 테두리 표시하여 구분
			//divContainerArea.setAttribute('class','containerAreaStyle');
			if (containerItem.cargoType == 'DG'|| containerItem.cargoType == 'ED' || containerItem.cargoType == 'DR') {
				divContainerArea.setAttribute('class','containerAreaDGStyle');
			} else if (containerItem.inspectCheck == 'Y') {
				divContainerArea.setAttribute('class','containerAreaInspectionStyle');
			} else {
				divContainerArea.setAttribute('class','containerAreaStyle');
			}
		}
		
		// -------- 1 line -----------------------------------------------------
		
		var ulContainer1 = document.createElement( 'ul' );
		ulContainer1.className = "containerRowStyle";
		
		var liLiftIndicator = document.createElement( 'li' );
		var liftIndicatorText = '';
		if(containerItem.yardJobCode == 'YO' || containerItem.yardJobCode == 'LO') {
			liftIndicatorText = '▲';
			liLiftIndicator.setAttribute('class','liftIndicatorStyle');
		} else if(containerItem.yardJobCode == 'YF' || containerItem.yardJobCode == 'DF') {
			liftIndicatorText = '▼';
			liLiftIndicator.setAttribute('class','liftIndicatorStyle');
		} else {
			liftIndicatorText = '.';
			liLiftIndicator.setAttribute('class','liftIndicatorBlankStyle');
		}
		liLiftIndicator.appendChild(document.createTextNode(liftIndicatorText));
		
		var liJobCode = document.createElement( 'li' );
		var yardJobCodeText = ''
		if(containerItem.yardJobCode != '') {
			var tempJobCode = containerItem.yardJobCode;	
			//< modified by Rackhyun Jeong (2018.12.18) - Support multi language for chassis position and job code
			if(tempJobCode == 'LO') {
				yardJobCodeText = '<%=MessageResource.getInstance().getMessage("LBYT-005", languageType) %>'
			} else if(tempJobCode == 'YF') {
				yardJobCodeText = '<%=MessageResource.getInstance().getMessage("LBYT-006", languageType) %>'
			} else if(tempJobCode == 'DF') {
				yardJobCodeText = '<%=MessageResource.getInstance().getMessage("LBYT-007", languageType) %>'
			} else if(tempJobCode == 'B1') {
				yardJobCodeText = '<%=MessageResource.getInstance().getMessage("LBYT-008", languageType) %>'
			} else if(tempJobCode == 'YY') {
				yardJobCodeText = '<%=MessageResource.getInstance().getMessage("LBYT-009", languageType) %>'
			} else if(tempJobCode == 'YO') {
				yardJobCodeText = '<%=MessageResource.getInstance().getMessage("LBYT-010", languageType) %>'
			} else if(tempJobCode == 'RF') {
				yardJobCodeText = '<%=MessageResource.getInstance().getMessage("LBYT-011", languageType) %>'
			} else if(tempJobCode == 'RO') {
				yardJobCodeText = '<%=MessageResource.getInstance().getMessage("LBYT-012", languageType) %>'
			} else if(tempJobCode == 'GF') {
				yardJobCodeText = '<%=MessageResource.getInstance().getMessage("LBYT-013", languageType) %>'
			} else if(tempJobCode == 'GO') {
				yardJobCodeText = '<%=MessageResource.getInstance().getMessage("LBYT-014", languageType) %>'
			//>
			} else {
				yardJobCodeText = tempJobCode;
			}
			liJobCode.setAttribute('class','jobCodeStyle');
		} else {
			yardJobCodeText = '.';
			liJobCode.setAttribute('class','jobCodeBlankStyle');
		}
		liJobCode.appendChild(document.createTextNode(yardJobCodeText));
		
		var liContainerNo = document.createElement( 'li' );
		var containerNoText = containerItem.containerNo;
		if(containerNoText != '') {
			containerNoText = containerItem.containerNo;
			if(containerItem.rtSideInfo != null && containerItem.rtSideInfo != "") {
				liContainerNo.setAttribute('class','containerItemBlinkStyle');
			} else {
				liContainerNo.setAttribute('class','containerItemStyle');
			}
		} else {
			containerNoText = '.';
			liContainerNo.setAttribute('class','containerItemBlankStyle');
		}
		liContainerNo.appendChild(document.createTextNode(containerNoText));
		liContainerNo.id = containerNoText;

		var licPosition = document.createElement( 'li' );
		licPosition.setAttribute('class','cPositionStyle');
		var cPositionFullText = "";
		
		//< modified by Rackhyun Jeong (2018.12.18) - Support multi language for chassis position and job code
		if(containerItem.cPosition=="M"){
			cPositionFullText = '<%=MessageResource.getInstance().getMessage("LBYT-003", languageType) %>';
		} else if(containerItem.cPosition=="A"){
			cPositionFullText = '<%=MessageResource.getInstance().getMessage("LBYT-004", languageType) %>';
		} else if(containerItem.cPosition=="F"){
			cPositionFullText = '<%=MessageResource.getInstance().getMessage("LBYT-002", languageType) %>';
		//>
		} else {
			cPositionFullText = "."
			licPosition.setAttribute('class','cPositionBlankStyle');
		}
		licPosition.appendChild(document.createTextNode(cPositionFullText));

		// added by BE.Ahn (2019.08.22) Mantis GWCT 0092638 [YT] Lift Off
		var liLiftOff = document.createElement( 'li' );
		liLiftOff.className = "liftOffStype";
		var btnLiftOff = document.createElement('button')
		btnLiftOff.setAttribute('class', 'jobListBtnStyle');
		btnLiftOff.id = ID_PREFIX_BTN_LIFT_OFF + containerItem.containerNo + ID_DELIMETER + containerItem.yardJobCode;
		btnLiftOff.onclick = liftOffJobHandler;
		
		var liftOffText = '<%=MessageResource.getInstance().getMessage("LBYT-015", languageType) %>';
		btnLiftOff.appendChild(document.createTextNode(liftOffText));
		
		liLiftOff.appendChild(btnLiftOff);
		
		var allowLiftOff = false;
		
		if (checkAllowLiftOff(containerItem) == true) {
			allowLiftOff = true;
		}
		
		if (allowLiftOff == false) {
			// disable
			btnLiftOff.setAttribute('disabled', 'disabled');
			btnLiftOff.setAttribute('class', 'jobListBtnDisabledStyle');
			
		} else {
			btnLiftOff.removeAttribute('disabled');
			btnLiftOff.setAttribute('class', 'jobListBtnStyle');
		}
		
		
		ulContainer1.appendChild(liLiftIndicator);
		ulContainer1.appendChild(liJobCode);
		ulContainer1.appendChild(liContainerNo);
		ulContainer1.appendChild(licPosition);
// 		ulContainer1.appendChild(liSHoldDeck);
		ulContainer1.appendChild(liLiftOff)
		divContainerArea.appendChild(ulContainer1);
		
		// -------- 2 line -----------------------------------------------------
		
		var ulContainer2 = document.createElement( 'ul' );
		ulContainer2.className = "containerRowStyle";
		var liYardPosition = document.createElement( 'li' );
		liYardPosition.setAttribute('class','yardPositionStyle');
		var yardPositionFullText = containerItem.targetPosition; // Tonny.Kim.2020.10.27

		liYardPosition.appendChild(document.createTextNode(yardPositionFullText));
		
		//added by BE.Ahn (2019.11.18) Mantis 0103575: [YT] 베이/덱/홀드 표시
		var liHatchHoldDeck = document.createElement('li');
		liHatchHoldDeck.setAttribute('class','hatchHoldDeckStyle');
		var HatchHoldDeckFullText = containerItem.hatchIndex+"-"+containerItem.sholdDeck;  // Tonny.Kim.2020.10.27
		liHatchHoldDeck.appendChild(document.createTextNode(HatchHoldDeckFullText));
		
		// added by JH.Tak (2018.12.18) display twin info
		//<!-- 
		var liTwinInfoText = document.createElement( 'li' );
		var twinCntrNo = containerItem.twinCntrNo;
		var twinInfoText = "";
		
		if(twinCntrNo != null && twinCntrNo.length > 0) {
			twinInfoText = '<%=MessageResource.getInstance().getMessage("LBYT-001", languageType) %>';
			liTwinInfoText.setAttribute('class','jobTwinStyle');	
		} else {
			twinInfoText = "";
			liTwinInfoText.setAttribute('class','jobTwinBlankStyle');	
		}
		
		liTwinInfoText.appendChild(document.createTextNode(twinInfoText));
		//-->
		
		var liSztp = document.createElement( 'li' );
		//var sztpText = containerItem.sizeType;
		// modified by JH.Tak (2018.11.29) ADD PrivateSztp
		//<!--
		//modified by JH.Tak (2018.12.18) bug fix -  Not displayed private sztp
		<%--
		//var sztpText = CacheService.getConvertValue(containerItem.ptnrCd, containerItem.sizeType2);
		--%>
		var sztpText = CacheService.getConvertValue(SZTP_TYPE_TERMINAL, containerItem.sizeType2);
		
		if(sztpText == null || sztpText == undefined || sztpText == ""){
			sztpText = containerItem.sizeType;
		}
		//-->
		if(sztpText != '') {
			<%--
			//sztpText = containerItem.sizeType; // removed by JH.Tak (2018.12.18) bug fix - Not displayed private sztp
			--%>
			liSztp.setAttribute('class','sztpStyle');
		} else {
			sztpText = '.';
			liSztp.setAttribute('class','sztpBlankStyle');
		}
		liSztp.appendChild(document.createTextNode(sztpText));
		
		var liFe = document.createElement( 'li' );
		liFe.setAttribute('class','feStyle');
		var feFullText = "";
		if(containerItem.fe == "F") {
			feFullText = "Full";
		} else if(containerItem.fe == "E") {
			feFullText = "Empty";
		} else {
			feFullText = ".";
			liFe.setAttribute('class','feBlankStyle');
		}
		liFe.appendChild(document.createTextNode(feFullText));
		
		// added by YoungOk Kim (2019.04.25) - Mantis 89570: [Tally] QC Lane을 지정하는 기능
		var liQcLane = document.createElement( 'li' );
		liQcLane.setAttribute('class','qcLaneStyle');
		
		// added by YoungOk Kim (2019.04.25) - Mantis 89570: [Tally] QC Lane을 지정하는 기능
		var qcLaneText = containerItem.qcLane;
		if(qcLaneText != "") {
			qcLaneText += " LANE"
		} else {
			qcLaneText = ".";
			liQcLane.setAttribute('class','qcLaneBlankStyle');
		}
		liQcLane.appendChild(document.createTextNode(qcLaneText));
		
		ulContainer2.appendChild(liYardPosition);
		ulContainer2.appendChild(liHatchHoldDeck); // added by BE.Ahn (2019.11.18) Mantis 0103575: [YT] 해치/덱/홀드 표시
		ulContainer2.appendChild(liTwinInfoText); // added by JH.Tak (2018.12.18) display twin info
		ulContainer2.appendChild(liSztp);
		ulContainer2.appendChild(liFe);
		ulContainer2.appendChild(liQcLane); // added by YoungOk Kim (2019.04.25) - Mantis 89570: [Tally] QC Lane을 지정하는 기능
		divContainerArea.appendChild(ulContainer2); 
		
		// -------- 3 line -----------------------------------------------------
		
		var ulContainer3 = document.createElement( 'ul' );
		ulContainer3.className = "containerRowStyleHidden";
			
		var liRtSideInfo = document.createElement( 'li' );
		liRtSideInfo.setAttribute('class','rtSideInfoStyle');
		var rtSideInfoFullText = "";
		if(containerItem.rtSideInfo != null && containerItem.rtSideInfo != "") {
			rtSideInfoFullText = containerItem.rtSideInfo;
		} else {
			rtSideInfoFullText = ".";
			liRtSideInfo.setAttribute('class','rtSideInfoBlankStyle');
		}
		liRtSideInfo.appendChild(document.createTextNode(rtSideInfoFullText));
		
		
		var liYardJobCode = document.createElement( 'li' );
		liYardJobCode.setAttribute('class','blankStyle');
		liYardJobCode.appendChild(document.createTextNode(containerItem.yardJobCode));

		
		ulContainer3.appendChild(liRtSideInfo);
		ulContainer3.appendChild(liYardJobCode);
		divContainerArea.appendChild(ulContainer3);
		
		// ----------------------------
		
		divContainer.appendChild(divContainerArea); 
		reArrangeJobOrder(divContainer);
	}
}


function checkingDuplicateJob(containerItem) {
	
	var resultFlag = false;
	var receivedCntrNo = containerItem.containerNo;
	var mainObjectChildrens = $("[id='AreaContainerField']")[0].children;
	if(mainObjectChildrens != null) {
		for (var i=0; i<mainObjectChildrens.length; i++) {
			var divObject = $("[id='divContainerArea"+i+"']");
			var objCntrNo = (divObject.length==0)?"":divObject[0].children[0].children[0].innerText;
			if(objCntrNo==receivedCntrNo) {
				resultFlag = true;
			}
		}
	}
}




// Rearrange part ---------------------------------------------------------




function reArrangeJobOrder(divContainer) {
	
	
	/*
	참고 source
	jobObjectList = [];
	jobObjectList.push(containerItem);
	jobObjectList.splice(i, 1);
	*/
	
	if(divContainer.children.length > 1) {
		
		// 변수
		var jobObjectCPos1 = new Object();
		var jobObjectCPos2 = new Object();
		
		var viJobOrderList = [];
		var voJobOrderList = [];
		var etcJobOrderList = [];
		var rearrangedJobOrderList = [];
		

		// DF → LO → 그외 형태로 재배치
		viJobOrderList = extractjobListByYardJobCode(divContainer, "DF");
		voJobOrderList = extractjobListByYardJobCode(divContainer, "LO");
		etcJobOrderList = extractjobListByYardJobCode(divContainer, "ETC");
		
		// 기준에 따라 FMA or AMF 로 재배치하기
		viJobOrderList = rearrangeListByCpos(viJobOrderList, "DF");
		voJobOrderList = rearrangeListByCpos(voJobOrderList, "LO");
		etcJobOrderList = rearrangeListByCpos(etcJobOrderList, "ETC");
		
		// 3개의 list를 통합해야함
		for (var i=0; i<viJobOrderList.length; i++) {
			rearrangedJobOrderList.push(viJobOrderList[i]);
		}
		for (var i=0; i<voJobOrderList.length; i++) {
			rearrangedJobOrderList.push(voJobOrderList[i]);
		}
		for (var i=0; i<etcJobOrderList.length; i++) {
			rearrangedJobOrderList.push(etcJobOrderList[i]);
		}
		
		
		// Clear All job
		$("#AreaContainerField").empty();
		
		// 상위 2개만 추출버전
		/*
		jobObjectCPos1 = rearrangedJobOrderList[0];
		jobObjectCPos2 = rearrangedJobOrderList[1];
		
		divContainer.appendChild(jobObjectCPos1);
		divContainer.appendChild(jobObjectCPos2);
		*/
		
		// 전부 뿌려주는 버전
		for (var i=0; i<rearrangedJobOrderList.length; i++) {
			divContainer.appendChild(rearrangedJobOrderList[i]);
		}
	}
}



function extractjobListByYardJobCode(inputList, yardJobCode) {
	
	var resultList = [];
	
	for (var i=0; i<inputList.children.length; i++) {
		var tempObject = inputList.children[i];
		var tempYardJobCode = inputList.children[i].children[2].children[1].innerText;
		
		if(tempYardJobCode == yardJobCode) {
			resultList.push(tempObject);
		}
	}
	
	if(resultList.length == 0) {
		for (var i=0; i<inputList.children.length; i++) {
			var tempObject = inputList.children[i];
			var tempYardJobCode = inputList.children[i].children[2].children[1].innerText;
			if(tempYardJobCode != "DF" && tempYardJobCode != "LO") {
				resultList.push(tempObject);
			}
		}
	}
	
	return resultList;
}


function rearrangeListByCpos(inputList, yardJobCode) {
	
	var resultList = [];
	
	var jobListCposF = [];
	var jobListCposM = [];
	var jobListCposA = [];
	
	for (var i=0; i<inputList.length; i++) {
		var tempObject = inputList[i];
		var tempcPosition = tempObject.children[0].children[3].innerText;
		
		//< modified by Rackhyun Jeong (2018.12.18) - Support multi language for chassis position and job code
		if(tempcPosition == '<%=MessageResource.getInstance().getMessage("LBYT-002", languageType) %>') {
			jobListCposF.push(tempObject);
		} else if(tempcPosition == '<%=MessageResource.getInstance().getMessage("LBYT-004", languageType) %>') {
			jobListCposA.push(tempObject);
		} else if(tempcPosition == '<%=MessageResource.getInstance().getMessage("LBYT-003", languageType) %>') {
			jobListCposM.push(tempObject);
		}
		//>
	}
	
	if(inputList.length != 0) {
		// modified by YoungOk Kim (2019.02.12) - Mantis 89101: [YT] 트윈 시 작업이 뒤/앞으로 나오는 문제
		for (var i=0; i<jobListCposF.length; i++) {
			resultList.push(jobListCposF[i]);
		}
		for (var i=0; i<jobListCposM.length; i++) {
			resultList.push(jobListCposM[i]);
		}
		for (var i=0; i<jobListCposA.length; i++) {
			resultList.push(jobListCposA[i]);
		}
	}
	
	return resultList;
}




// Delete part ---------------------------------------------------------



function deleteJobHandler(containerItem) {
	
	var deletedCntrNo = containerItem.containerNo;
	var divContainer = document.getElementById("AreaContainerField");
	var jobObjectCount = 4; // divContainer.children.length;
	
	
	if(jobObjectCount>0) {
		
		for (var i=0; i<jobObjectCount; i++) {
		
			var validObject = new Object();
			
			var objIDvalue = "[id='divContainerArea"+deletedCntrNo+"']";
			validObject = $(objIDvalue);
			
			/*
			var divObject0 = $("[id='divContainerArea0']");
			var divObject1 = $("[id='divContainerArea1']");
			var divObject2 = $("[id='divContainerArea2']");
			var divObject3 = $("[id='divContainerArea3']");
			
			if(divObject0.length == 0 && divObject1.length == 1) {
				validObject = divObject1; 
			} else if(divObject0.length == 1 && divObject1.length == 0) {
				validObject = divObject0; 
			} else if(divObject0.length == 0 && divObject1.length == 0) {
				
			}
			
			if(i == 0) {
				validObject = divObject0;
			} else if(i == 1) {
				validObject = divObject1;
			} else if(i == 2) {
				validObject = divObject2;
			} else if(i == 3) {
				validObject = divObject3;
			} else {
				
			}
			*/

			var objCntrNo = (validObject.length==0)?"":validObject[0].children[0].children[2].innerText;
			if(objCntrNo==deletedCntrNo) {
				validObject.remove();
			}
		}	
	}
	
// 	var mainCntrObject0 = $("[id='divContainerArea0']")[0];
// 	var mainCntrObject1 = $("[id='divContainerArea1']")[0];
	
	if($("#AreaContainerField")[0].children.length == 0) {
// 	if(mainCntrObject0 == null && mainCntrObject1 == null) {

		$("#AreaContainerField").empty();
		var divContainer = document.getElementById("AreaContainerField");
		var divContainerArea = document.createElement( 'div' );
		divContainerArea.id = "noJobTextDiv"
		divContainerArea.setAttribute('class','noJobStyle');
		
		var offset = $('#AreaContainerField').offset();
		var height = $('#AreaContainerField').height();
		var width = $('#AreaContainerField').width();
		var top = offset.top + height + "px";
		var right = offset.left + width + "px";
		
		$("#AreaContainerField").css('right',right);
		
		divContainerArea.appendChild(document.createTextNode("NO JOB"));
		divContainer.appendChild(divContainerArea);
	}
	
}


//------------------------------------------
//Broadcast handling part end          -----
//------------------------------------------


// added by Rackhyun Jeong (2019.01.20) - YT Stoppage
function searchStoppageList() {
	//OLD.Tonny.kim.2020.09.14
// 	var parm = {
// 			parmClass: 'com.tsb.web.c3it.bizparm.yardtruck.SearchStoppageBizParm',
// 			value: {
// 				equNo : getSessionItem(SESSION_YT_NO)
// 			}
// 		}
	
// 	sendMessageWithCheck('c3it.yardTruck.searchStoppageItems', parm, searchStoppageListReceive);
	//Tonny.kim.2020.09.14
	//var url = '/yt/searchStoppageItems';
	
	//RBT. 20240313. added for new source code
	var url = '/MOST_MMC_VMT_Web/rest/yt/searchStopReasonItems';
	var params = {
			equNo : getSessionItem(SESSION_YT_NO)
		};
	
	ajaxPost(url, params, function(data){
		searchStoppageListReceive(data.response);
	});
}

//added by Rackhyun Jeong (2019.01.20) - YT Stoppage
function searchStoppageListReceive(e) {
	uiCommon.common.getInstance().unBlockScreen();
	StoppageItems = e.data;
	
	var count = StoppageItems.length;
	
	$("#areaStoppage").empty(); // clear item
	var divField = document.getElementById('areaStoppage');
		
	if(count > 0) {
		for(var i =0; i<count; i++) {
			// Row part
			var rowDiv = document.createElement("div");
			rowDiv.id = 'rowDivStoppage' + i;
			rowDiv.style = "height:100px";  // added by Rackhyun Jeong (2019.01.21) - increase button size due to multi line
			if(i==0 || i%3 == 0) {
				rowDiv.className = "ui-block-a ui-responsive";
			} else if (i%3 == 1) {
				rowDiv.className = "ui-block-b ui-responsive";
			} else if (i%3 == 2) {
				rowDiv.className = "ui-block-c ui-responsive";
			} 
			document.getElementById("areaStoppage").appendChild(rowDiv);   
			
			// 1개의 row안에 들어갈 버튼 
			var maDiv = document.createElement("button");
            maDiv.id = ID_PREFIX_BTN_STOPPAGE + StoppageItems[i].code; // Stoppage Code
            
            var StoppageDesc = StoppageItems[i].codeName;
            maDiv.appendChild(document.createTextNode(StoppageDesc));
            maDiv.className="ui-bar-a ui-bar-c";
            maDiv.setAttribute('class','stoppage');
            maDiv.style = "height:100px";  // added by Rackhyun Jeong (2019.01.21) - increase button size due to multi line
            maDiv.onclick = setStoppage;
            document.getElementById("rowDivStoppage" + i).appendChild(maDiv);
		}
	}
}

//added by Rackhyun Jeong (2019.01.20) - YT Stoppage
// Tonny.Kim.2020.09.15
function setStoppage(e) {
	var stoppageCode = e.currentTarget.id.split(ID_PREFIX_BTN_STOPPAGE)[1];
	//OLD.Tonny.kim.2020.09.15
// 	var parm = {
// 			parmClass: 'com.tsb.web.c3it.bizparm.stoppage.StoppageBizParam',
// 			value: {
// 				equNo : getSessionItem(SESSION_YT_NO),
// 				userId : userIdtemp,
// 				stoppageCd : stoppageCode
// 			}
// 		}
	
// 	sendMessageWithCheck('c3it.stoppage.set', parm, setStoppageReceive);
	//Tonny.kim.2020.09.15
	//var url = '/yt/setStoppage'; 
	
	//RBT. 20240313 REPLACED:
    var url = '/MOST_MMC_VMT_Web/rest/yt/setStoppage';
	var params = {
				equNo : getSessionItem(SESSION_YT_NO),
				userId : userIdtemp,
				stoppageCd : stoppageCode
		};
	
	ajaxPost(url, params, function(data){
		setStoppageReceive(data.response);
	});
}

//added by Rackhyun Jeong (2019.01.20) - YT Stoppage
// Tonny.Kim.2020.09.15
function setStoppageReceive(e) {
	uiCommon.common.getInstance().unBlockScreen();
	var stoppageItem = null;
    if(e.dataItem){
        stoppageItem = e.dataItem;
    }else {
        stoppageItem = e.data[0];
    }
	
	setSessionItem(SESSION_UNDER_STOPPAGE, "Y");
	setSessionItem(SESSION_STOPPAGE_CODE, stoppageItem.stoppageCd);
	setSessionItem(SESSION_STOPPAGE_DESC, stoppageItem.stoppageDesc);
	setSessionItem(SESSION_STOPPAGE_STIME, stoppageItem.stopSTime); // stoppageSTime -> stopSTime
	
	var ytNo = getSessionItem(SESSION_YT_NO);
	var stoppageDesc = getSessionItem(SESSION_STOPPAGE_DESC);
	var stoppageSTime = getSessionItem(SESSION_STOPPAGE_STIME);
	
	goUnderStoppage(ytNo, stoppageDesc, stoppageSTime);
}

//added by Rackhyun Jeong (2019.01.20) - YT Stoppage
// Tonny.Kim.2020.09.15
function resumeStoppageReceive(e) {
	uiCommon.common.getInstance().unBlockScreen();
	var stoppageItem = e.dataItem;
	
	setSessionItem(SESSION_UNDER_STOPPAGE, "N");
	setSessionItem(SESSION_STOPPAGE_CODE, "");
	setSessionItem(SESSION_STOPPAGE_DESC, "");
	setSessionItem(SESSION_STOPPAGE_STIME, "");
	
	goYyListPage();
}


function searchYtList() {
	
	/*
	var jsonData = "{"+
	"equNo:''"+ 
	",mMode:'YA'" + 
	",status:''"+ 
	",equNo:''"+
	",cntrNo:''"+
	",yJobCd:''"+
	",bayValidation:''"+
	"}";
	sendMessage('c3it.yardTruck.searchYtList', jsonData);
	*/

	// OLD.2020.09.10
// 	var parm = {
// 		parmClass: 'com.tsb.web.c3it.bizparm.equipment.SearchEquipmentListBizParm',
// 		value: {
// 			equipmentType	: ''
// 		}
// 	}
// 	sendMessageWithCheck('c3it.equipment.searchEquipmentList', parm, searchYtListReceive);
	
	// Tonny.Kim.2020.09.11
	var url = '/MOST_MMC_VMT_Web/rest/equipment/ytlist';
	//addded by Brian (2023/10/16)
	iWeb.OAUTH_TOKEN_TYPE = AUTH.TOKEN_TYPE.TOKEN_TYPE_NONTOKEN; ;
	
	var params = {
			equipmentType : 'YT'
		};
	
	ajaxPost(url, params, function(data){

		searchYtListReceive(data.response);
	});
}

//Tonny.Kim.2020.09.11
function searchYtListReceive(e){
	uiCommon.common.getInstance().unBlockScreen();
	allEquipmentItems = e.data;
	
	var ytList = extractYTNoList(allEquipmentItems);
	var count = ytList.length;
	
	var divField = document.getElementById('areaYardTruckNos');
	var selectedYardTrailerNo = $("#txYardTruckNo").val().toUpperCase(); 
	
	if(count > 0) {
		for(var i =0; i<count; i++) {
			
			// Row part
			var rowDiv = document.createElement("div");
			rowDiv.id = 'rowDiv'+i;
			if(i==0 || i%3 == 0) {
				rowDiv.className = "ui-block-a ui-responsive";
			} else if (i%3 == 1) {
				rowDiv.className = "ui-block-b ui-responsive";
			} else if (i%3 == 2) {
				rowDiv.className = "ui-block-c ui-responsive";
			} 
			document.getElementById("areaYardTruckNos").appendChild(rowDiv);   
			
			// 1개의 row안에 들어갈 버튼 
			var maDiv = document.createElement("button");
            maDiv.id = 'id_de_la_div'+i;
            
            var yardTrailerNo = ytList[i].name;
            maDiv.appendChild(document.createTextNode(yardTrailerNo));
            maDiv.className="ui-bar-a ui-bar-c";
            if(yardTrailerNo == selectedYardTrailerNo) {
            	maDiv.setAttribute('class','selectedYardTrailerNos');
            } else {
            	maDiv.setAttribute('class','yardTrailerNos');
            }
            maDiv.onclick = setSelectedYTNo;
            document.getElementById("rowDiv"+i).appendChild(maDiv);
		}
	}
}

function setSelectedYTNo(e) {
	var yardTruckNo = e.currentTarget.innerHTML;
	$("#txYardTruckNo").val(yardTruckNo);
	setSessionItem('yardTruckNo', yardTruckNo);
	localstorage.setItem("yardTruckNo", yardTruckNo);
	$.mobile.changePage('#' + loginPageId,'slide','reverse');
}


function extractYTNoList(allList) {
	
	var resultList = [];
	var allListCount = allList.length;
	
	for(var i =0; i<allListCount; i++) {
		
		if(allList[i].type == "YT") {
			resultList.push(allList[i]);
		}
	}
	
	return resultList;
}

///////////////////////////////////////////////////////
// ETC functions
//////////////////////////////////////////////////////



function getHeaderTitleText() {
	var title = getSessionItem("title");
	if(title == '' || title == null || title == undefined) {
		//title = "Yard Tractor";
		title = "";
	}
	
	var staffName = getSessionItem(SESSION_STAFF_NAME);
	if (staffName == null) {
		staffName = "";
	}
	
	var curDateTime = new Date();
	//var curDateTimeDesc = curDateTime.getFullYear() + "-" + (curDateTime.getMonth() + 1) + "-" + curDateTime.getDate() + " " + curDateTime.getHours() + ":" + curDateTime.getMinutes();
	var curDateTimeDesc = staffName + " - " + curDateTime.getHours() + ":" + curDateTime.getMinutes() + ":" + curDateTime.getSeconds();
	
	title = curDateTimeDesc + " - " + title;
	
	return title; 	
}

function altMsg(msg) {
	if (false) {
		alert(msg);
	}
}



///////////////////////////////////////////////////////
//Weblog part 
//////////////////////////////////////////////////////


function saveEventDataToLocalStorage(event) {
	
	var legacyValue = localStorage.getItem("YT");
	
	// Building weglog data -------------------------
	var logAuthInfo = getSessionItem('loginInfo');
	var userId 		= getSessionItem('userId');
	var ytNo 		= getSessionItem('yardTruckNo');
	var d 			= new Date();
	var recodeTime 	= (d.getMonth()+1)+"."+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
	var sessionInfo = "";
	var preFixWeblog = recodeTime+" "+currentVersion+" "+ipAddress+" "+clientUniqueId;
	
	if(logAuthInfo != null && logAuthInfo != "") {
 		sessionInfo = " ("+userId+"/"+ytNo+") ";
 	} else {
 		sessionInfo = " (BeforeLogin) ";
 	}
	
	// consolidate data -----------
	var finalData = legacyValue +" /\n "+ preFixWeblog + sessionInfo + event;
	
	// check size and upload ------------
	if(finalData.length >= 1000000) { // 5200000 (Maximum)
		sendLocalStorageInfoToServer();
		finalData = preFixWeblog + sessionInfo + event;
		localstorage.setItem("YT", finalData);
	} else {
		finalData =legacyValue +" /\n "+ preFixWeblog + sessionInfo + event;
		localstorage.setItem("YT", finalData);
	}
	
}

function sendLocalStorageInfoToServer() {

	try{
		clearLocalStorageInfo();
	} catch(e) {
		clearLocalStorageInfo();
	}
}

function getLocalStorageInfo() {
	var ytInfo = localStorage.getItem("YT");
	return ytInfo;
}

function clearLocalStorageInfo() {
	localStorage.removeItem("YT");
}


///////////////////////////////////////////////////////
//check version
//////////////////////////////////////////////////////

function checkVersionForRenewal(aliveMsg) {
	
	// requested version
	var aliveMsgArray = aliveMsg.split('-');
	var requestedVersion = aliveMsgArray[2];
	
	if(requestedVersion.indexOf(currentVersion) != -1) {
		versionMatchedFlag = true;
	} else {
		versionMatchedFlag = false;
	}
	
	if(versionMatchedFlag == false) {
		if (!$.mobile.activePage.is("#versionMismatchedPage")){		
			$.mobile.changePage('#versionMismatchedPage','slide');
		}
	}
}

function pageReload() {
	location.reload(true);
	if(wsConnection != null) wsConnection.close();
	clearSession();
	document.location.href = contextPath+"/index.jsp";
}

///////////////////////////////////////////////////////
// Menu change part
//////////////////////////////////////////////////////
function goYTselectPage(e) {

	if (navigator.onLine == false) {
		tsbAlert.alert.getInstance().Info('<%=MessageResource.getInstance().getMessage("CM-013", languageType) %>', function (e,p) {
		});
	} else {
		var logAuthInfo = getSessionItem('loginInfo');
		if(logAuthInfo != null && logAuthInfo != "") {
	 		tsbAlert.alert.getInstance().Info('<%=MessageResource.getInstance().getMessage("CM-014", languageType) %>', function (e,p) {});
		} else {
			uiCommon.common.getInstance().blockScreen();
			$("#areaYardTruckNos").empty(); // CLEAR SCREEN
			$.mobile.changePage('#selectYTPage','slide','reverse');
		}
	}
}

//added by Rackhyun Jeong (2019.01.20) - YT Stoppage
// Tonny.Kim.2020.09.15
function btnStoppageClicked(e) {
	if (getSessionItem(SESSION_UNDER_STOPPAGE) == "Y") {
		// resume stoppage
		var stoppageCode = getSessionItem(SESSION_STOPPAGE_CODE)
// 		var parm = {
// 				parmClass: 'com.tsb.web.c3it.bizparm.stoppage.StoppageBizParam',
// 				value: {
// 					equNo : getSessionItem(SESSION_YT_NO),
// 					userId : getSessionItem(SESSION_USER_ID),
// 					stoppageCd : stoppageCode
// 				}
// 			}
		
// 		sendMessageWithCheck('c3it.stoppage.resume', parm, resumeStoppageReceive);
		
		
		//var url = '/yt/resumeStoppage';
		//RBT. 20240313 REPLACED:
	    var url = '/MOST_MMC_VMT_Web/rest/yt/resumeStoppage';
		
		var params = {
					equNo : getSessionItem(SESSION_YT_NO),
					userId : getSessionItem(SESSION_USER_ID),
					stoppageCd : stoppageCode
			};
		
		ajaxPost(url, params, function(data){
			resumeStoppageReceive(data.response);
		});		
	} else {
		// deleted by jaeok (2021.02.12) EXECUTING 상태일 경우라도 허용을 하도록 요청됨.
		//// EXECUTING 상태일 경우 허용하지 않는다.
		//if (ytRenderer.containerInfo != null) {
		//	let jobArrayList = ytRenderer.containerInfo.data;
		//		
		//	for (var i = 0; i < jobArrayList.length; i++) {
		//		if (jobArrayList[i].atcJobStatus == '4') { // EXECUTING
		//			tsbAlert.alert.getInstance().Info('작업이 진행중입니다.');
		//			return;
		//		}
		//	}
		//}
		
		// show stoppage code list
		$.mobile.changePage('#selectStoppagePage','slide','reverse');
	}
}

function goLoginPage() {
	$.mobile.changePage('#' + loginPageId,'slide');
}

function changeLanguageType() {
	var languageTypeValue = $("#cbLanguageType").val();
	$("#hdlanguageType").val(languageTypeValue);
	document.ytform.submit();
}

//added by Rackhyun Jeong (2019.01.20) - YT Stoppage
function goUnderStoppage(ytNo, stoppageDesc, stoppageTime) {
	// Stoppage screen
	$.mobile.changePage('#underStoppagePage','slide','reverse');
	
	// set item
	var txtEquNo = document.getElementById('txtEquNo');
	txtEquNo.value = ytNo;
	
	var txtStoppageDesc = document.getElementById('txtStoppageDesc');
	txtStoppageDesc.value = stoppageDesc;
	
	var txtStoppageTime = document.getElementById('txtStoppageTime');
	txtStoppageTime.value = stoppageTime;
}

function goYyListPage(e) {
	$.mobile.changePage('#jobListPage','slide','reverse');
	getYTJobList();
}

function filterYtChange() {	
	$("#areaChangeJobInfos").empty(); // CLEAR SCREEN
	
	// modified by jaeok (2021.02.16) related mail '[HJNC] Web YT '작업교대' 기능 정리'
	//searchJobChangeList();
	var ytNo = $("#txYtNoForChange").val();
	if (ytNo == null || ytNo.length == 0) {
		return;
	}
	ytNo = "YT" + ytNo; // YT 숫자만 입력가능함. YT이름은 "YTxxx"로 설정되어 있음.
	searchJobChangeList(ytNo);
}

function ytNoForChangeChanged() {
	//filterYtChange();
}

// added by BE.Ahn (2019.08.22) Mantis GWCT 0092638 [YT] Lift Off
function checkAllowLiftOff(inputObj) {
	var containerItem = inputObj;
	var yardJobState = containerItem.jobState.charAt(0);

	var equType = "";

	
	if (yardJobState == 'C') {
		if (containerItem.underTallyMode != null && containerItem.underTallyMode == "Y") {
			return false;
		}
		
		if(containerItem.targetPosition == "FDECK") { // cTargetPosition -> targetPosition // Tonny.Kim.2020.09.14
			return false;
		}
		
		if (containerItem.yardJobCode2 == "SO") {
			if (containerItem.exchangeRequestTime == null || containerItem.exchangeRequestTime == '') {
				return false;
			}
		}
		
		return true;
	}
	
	return false;
}

function liftOffJobHandler(e) {
	// stoped by MinSeok.K 2021.08.04 Lift-off 작업 중 요구사항이 제대로 나오지 않았다고 말씀해주셔서 중단 됨.
	//Modified by MS.Kim (2022.10.24) 0133809: Lift Off Button
	const containerInfo = ytRenderer.containerInfo; 
/*
	var id = e.currentTarget.id.split(ID_PREFIX_BTN_LIFT_OFF)[1];
	var containerNo = id.split(ID_DELIMETER)[0];
	var userId = getSessionItem(SESSION_USER_ID);
	var yardTruckNo = getSessionItem(SESSION_YT_NO);
	var mode = MSG_MODE_JOB_CONFIRM;
	var yardJobCode = id.split(ID_DELIMETER)[1];
*/
	var index = 0;
	for(var i=0; i<containerInfo.data.length; i++) {
		if (ytRenderer.chassisPositionRenderer.rectItems[i].selectedContainerNo == containerInfo.data[i].containerNo) {
			index = i;
			var containerNo = containerInfo.data[index].containerNo;
			var userId = containerInfo.dataItem.staffName;
			var yardTruckNo = containerInfo.data[index].ytNo;
			var mode = MSG_MODE_JOB_CONFIRM;
			var yardJobCode = containerInfo.data[index].yardJobCode;
			var vesselCode = containerInfo.data[index].vesselCode;
			var tequipmentNo = containerInfo.data[index].tequipmentNo;
			var tequipmentType = containerInfo.data[index].tequipmentType;
			var ytstatus = containerInfo.data[index].ytstatus;
			var remark = containerInfo.data[index].remark;
			var TransTime = "+";
		} else {
		}
	}

	//OLD.Tonny.Kim.2020.09.10
// 	var parm = {
// 			parmClass: 'com.tsb.web.c3it.bizparm.yardtruck.YtJobsBizParam',
// 			value: {
// 				yardTruckNo		: yardTruckNo,
// 				mMode			: mode ,
// 				userId			: userId,
// 				containerNo 	: containerNo,
// 				yardJobCode 	: yardJobCode
// 				}
// 	}
// 	sendMessageWithCheck('c3it.yardTruck.jobLiftOff', parm, liftOffJobReceive);
	
	//Tonny.kim.2020.09.14
	//Modified by MS.Kim (2022.10.24) 0133809: Lift Off Button
	var url = '/yt/jobLiftOff';
	var params = {
				yardTruckNo		: yardTruckNo,
				mMode			: mode ,
				userId			: userId,
				containerNo 	: containerNo,
				yardJobCode 	: yardJobCode,
				vesselCode		: vesselCode,
				tequipmentNo	: tequipmentNo,
				tequipmentType	: tequipmentType,
				ytstatus		: ytstatus,
				remark			: remark,
				TransTime		: TransTime
		};

	ajaxPost(url, params, function(data){
		liftOffJobReceive(data);
	});
}

function liftOffJobReceive(e) {
	uiCommon.common.getInstance().unBlockScreen();
	
	if(e.response.data.length > 0) {
		const isError = e.response.data[0].errorCode || "";
		if(isError.length > 0) {
			tsbAlert.alert.getInstance().Info(e.response.data[0].errorDesc, function (e,p) {});
		} else {
			getYTJobList();
		}
	} else {
		tsbAlert.alert.getInstance().Info("", function (e,p) {});
	}
}

function goBackPage(){
	window.history.back()
}

///////////////////////////////////////////////////////
//RePassword
//////////////////////////////////////////////////////
function goRePasswordSelectPage(e) {
	if (navigator.onLine == false) {
		tsbAlert.alert.getInstance().Info('<%=MessageResource.getInstance().getMessage("CM-013", languageType) %>', function (e,p) {
		});
	} else {
		$.mobile.changePage('#rePasswordPage','slide','reverse');
	}
}

function showRePasswordPage(){
	$("#txRePasswordUserId").val($('#txUserId').val());
	$("#txRePasswordOldPassword").val("");
	$("#txRePasswordPassword").val("");
	$("#txRePasswordReTypePassword").val("");
}

function changePassword(){
	let userId = $("#txRePasswordUserId").val();
	let oldPw = $("#txRePasswordOldPassword").val();
	let pw = $("#txRePasswordPassword").val();
	let rePw = $("#txRePasswordReTypePassword").val();
	
	if(changePasswordValidation()){
		var url = '/ytnl/updatePassword';
		var params = {
				item : {
					staffCd : btoa(userId),
					password : btoa(oldPw),
					newPassword : btoa(pw)
				}
			};

		ajaxPost(url, params, function(data){
			$('#btnRePasswordOk').button('disable');
			$('#btnCancelForRePasswordPage').button('disable');
			
			tsbAlert.alert.getInstance().Info('<%=MessageResource.getInstance().getMessage("CM_1111", languageType) %>', function(){
				$('#btnRePasswordOk').button('enable');
				$('#btnCancelForRePasswordPage').button('enable');
				goLoginPage();
			});
		}, function(error){
			let errorObj = JSON.parse(error.responseText);

			if(errorObj.error.errorMessage){
				$('#btnRePasswordOk').button('disable');
				$('#btnCancelForRePasswordPage').button('disable');

				tsbAlert.alert.getInstance().Info(errorObj.error.errorMessage, function(e){
					$('#btnRePasswordOk').button('enable');
					$('#btnCancelForRePasswordPage').button('enable');
				});
			}
		}, true);
	}
}

function changePasswordValidation(){
	let userId = $("#txRePasswordUserId").val();
	let oldPw = $("#txRePasswordOldPassword").val();
	let pw = $("#txRePasswordPassword").val();
	let rePw = $("#txRePasswordReTypePassword").val();
	let isValidation = true;
	let msgDesc = "";

	$('#btnRePasswordOk').button('disable');
	$('#btnCancelForRePasswordPage').button('disable');

	if(checkMandatoryOfChangePassword() === false){
		return false;
	} else if(checkPasswordPattern(pw) === false){
		msgDesc = '<%=MessageResource.getInstance().getMessage("CM_0041", languageType) %>';
		isValidation = false;
	}else if (pw !== rePw) {
		msgDesc = '<%=MessageResource.getInstance().getMessage("CM_0042", languageType) %>';
		isValidation = false;
	}else if(oldPw === pw) {
		msgDesc = '<%=MessageResource.getInstance().getMessage("CM_0043", languageType) %>';
		isValidation = false;
	}else if(pw === userId) {
		msgDesc = '<%=MessageResource.getInstance().getMessage("CM_0044", languageType) %>';
		isValidation = false;
	}

	if(isValidation == false && msgDesc != ""){
		tsbAlert.alert.getInstance().Info(msgDesc, function(){
			$('#btnRePasswordOk').button('enable');
			$('#btnCancelForRePasswordPage').button('enable');
		});
		return false;
	} else if(isValidation == true) {
		$('#btnRePasswordOk').button('enable');
		$('#btnCancelForRePasswordPage').button('enable');
	}

	return true;
}

function checkMandatoryOfChangePassword(){
	// check mandatory
	var userId = $.trim($("#txRePasswordUserId").val());
	var oldPassword = $.trim($("#txRePasswordOldPassword").val());
	var password = $.trim($("#txRePasswordPassword").val());
	var rePassword = $.trim($("#txRePasswordReTypePassword").val());

	let isValidation = true;
	let msgDesc = "";

	if( userId == '' || userId == null){
		msgDesc = '<%=MessageResource.getInstance().getMessage("MSG_FTCO_00180", new Object[] {MessageResource.getInstance().getMessage("WRD_CTYQ_UserID", languageType)}, languageType) %>'
		$("#txRePasswordUserId").focus();
		isValidation = false;
	} else if( oldPassword == '' || oldPassword == null){
		msgDesc = '<%=MessageResource.getInstance().getMessage("MSG_FTCO_00180", new Object[] {MessageResource.getInstance().getMessage("oldPassword", languageType)}, languageType) %>'
		$("#txRePasswordOldPassword").focus();
		isValidation = false;
	} else if( password == '' || password == null){
		msgDesc = '<%=MessageResource.getInstance().getMessage("MSG_FTCO_00180", new Object[] {MessageResource.getInstance().getMessage("password", languageType)}, languageType) %>'
		$("#txRePasswordPassword").focus();
		isValidation = false;
	} else if( rePassword == '' || rePassword == null){
		msgDesc = '<%=MessageResource.getInstance().getMessage("MSG_FTCO_00180", new Object[] {MessageResource.getInstance().getMessage("reTypePassword", languageType)}, languageType) %>'
		$("#txRePasswordReTypePassword").focus();
		isValidation = false;
	}

	if(isValidation == false){
		tsbAlert.alert.getInstance().Info(msgDesc, function(){
			$('#btnRePasswordOk').button('enable');
			$('#btnCancelForRePasswordPage').button('enable');
		});
		return false;
	}

	return true;
}

function checkPasswordPattern(uPass){

	// modified by MinSeok.K (2021.01.29) 0113086: YT 단말모듈 비밀번호 변경 필수 요구사항 변경
	//var exptextStr1 = /^(?=.*[a-zA-Z])(?=.*[!@#$%^~*+=-])(?=.*[0-9]).{3,20}$/; // 알파벳& 숫자& 특수문자
	var exptextStr1 = /^[0-9]{3,20}$/;

	if(exptextStr1.test(uPass)){
		return true;
	}

	return false;
}



///////////////////////////////////////////////////////
//JobList Main Page
//////////////////////////////////////////////////////
function initializeJobList(){
	addEventOfJobListView();
}

function getYardJobCodeText(yardJobCode){
	let yardJobCodeText = '';
	
	if(yardJobCode == 'LO') {
		yardJobCodeText = '<%=MessageResource.getInstance().getMessage("LBYT-005", languageType) %>'
	} else if(yardJobCode == 'YF') {
		yardJobCodeText = '<%=MessageResource.getInstance().getMessage("LBYT-006", languageType) %>'
	} else if(yardJobCode == 'DF') {
		yardJobCodeText = '<%=MessageResource.getInstance().getMessage("LBYT-007", languageType) %>'
	} else if(yardJobCode == 'B1') {
		yardJobCodeText = '<%=MessageResource.getInstance().getMessage("LBYT-008", languageType) %>'
	} else if(yardJobCode == 'YY') {
		yardJobCodeText = '<%=MessageResource.getInstance().getMessage("LBYT-009", languageType) %>'
	} else if(yardJobCode == 'YO') {
		yardJobCodeText = '<%=MessageResource.getInstance().getMessage("LBYT-010", languageType) %>'
	} else if(yardJobCode == 'RF') {
		yardJobCodeText = '<%=MessageResource.getInstance().getMessage("LBYT-011", languageType) %>'
	} else if(yardJobCode == 'RO') {
		yardJobCodeText = '<%=MessageResource.getInstance().getMessage("LBYT-012", languageType) %>'
	} else if(yardJobCode == 'GF') {
		yardJobCodeText = '<%=MessageResource.getInstance().getMessage("LBYT-013", languageType) %>'
	} else if(yardJobCode == 'GO') {
		yardJobCodeText = '<%=MessageResource.getInstance().getMessage("LBYT-014", languageType) %>'
	} else {
		yardJobCodeText = yardJobCode;
	}

	return yardJobCodeText;
}


///////////////////////////////////////////////////////
//PW Validation
//////////////////////////////////////////////////////
function getPwValidation() {
	var url = '/ytnl/validatePassward';
	var params = {};
	
	//addded by Brian (2023/10/16)
	iWeb.OAUTH_TOKEN_TYPE = AUTH.TOKEN_TYPE.TOKEN_TYPE_NONTOKEN;
	 
	ajaxPost(url, params, function(data){
		ReceivePwValidation(data.response.data);
	});
}

function ReceivePwValidation(data) {
	const { maximumLength, minimumLength, upperCredit, lowerCredit, digitCredit, specialCredit } = data[0];
	console.log(data[0]);
	_minimumLength = minimumLength;
	_maximumLength = maximumLength;
	_upperCredit = upperCredit;
	_lowerCredit = lowerCredit;
	_digitCredit = digitCredit;
	_specialCredit = specialCredit;
	
	const txPassword = document.querySelector('#txPassword');
	txPassword.maxLength = maximumLength;

}

function pwLoginValidation() {
	var password = $.trim($("#txPassword").val());
	let validation = false
	let msg = "";
	let obj = "";
	let result = [];
	
	if(password === "" || password === null) {
		msg = '<%=MessageResource.getInstance().getMessage("CM-004", languageType) %>';
		validation = true;
	} else if (Number(password.length) < _minimumLength) {
		msg = '<%=MessageResource.getInstance().getMessage("PW-001", languageType) %>';
		obj = _minimumLength;
		validation = true;
	} else if (Number(password.length) > _maximumLength) {
		msg = '<%=MessageResource.getInstance().getMessage("PW-002", languageType) %>';
		obj = _maximumLength;
		validation = true;
	} else {
		let validationFuns = [
			UpperCreditValidation, LowerCreditValidation, DigitCreditValidation, SpecialCreditValidation
		];
		
		for (let i = 0; i < validationFuns.length; i++) {
			result = validationFuns[i](password);
		
			msg = result[0] || "";
			obj = result[1] || "";
			validation = result[2] || false;
			
			if(validation) break;
		}
	}
	
	if(msg.length > 0) {
		msg = msg.replace("{0}", obj);
		//tsbAlert.alert.getInstance().Info(msg);	
	}
	
	return msg;
}

function UpperCreditValidation (password, msg, obj, validation) {
	const upperCreditregExp = /[A-Z]+/g;
	
	if(_upperCredit > 0){
		if(password.match(upperCreditregExp) === null) {
			msg = '<%=MessageResource.getInstance().getMessage("PW-003", languageType) %>';
			obj = _upperCredit;
			validation = true;
		} else if (Number(password.match(upperCreditregExp).length) < _upperCredit) {
			msg = '<%=MessageResource.getInstance().getMessage("PW-003", languageType) %>';
			obj = _upperCredit;
			validation = true;
		}
	}
	return [msg, obj, validation];
}

function LowerCreditValidation (password, msg, obj, validation) {
	const lowerCreditregExp = /[a-z]+/g;
	
	if (_lowerCredit > 0) {
		if (password.match(lowerCreditregExp) === null) {
			msg = '<%=MessageResource.getInstance().getMessage("PW-004", languageType) %>';
			obj = _lowerCredit;
			validation = true;
		} else if(Number(password.match(lowerCreditregExp).length) < _lowerCredit) {
			msg = '<%=MessageResource.getInstance().getMessage("PW-004", languageType) %>';
			obj = _lowerCredit;
			validation = true;
		}
	}
	return [msg, obj, validation]; 
}

function DigitCreditValidation (password, msg, obj, validation) {	
	const digitCreditregExp = /[0-9]+/g;
	
	if (_digitCredit > 0) {
		if (password.match(digitCreditregExp) === null) {
			msg = '<%=MessageResource.getInstance().getMessage("PW-005", languageType) %>';
			obj = _digitCredit;
			validation = true;
		} else if(Number(password.match(digitCreditregExp).length) < _digitCredit) {
			msg = '<%=MessageResource.getInstance().getMessage("PW-005", languageType) %>';
			obj = _digitCredit;
			validation = true;
		}
	}
	
	return [msg, obj, validation]; 
}

function SpecialCreditValidation (password, msg, obj, validation) {
	const specialCreditregExp = /[\W,]+/g;
	
	if (_specialCredit > 0) {
		if(password.match(specialCreditregExp) === null) {
			msg = '<%=MessageResource.getInstance().getMessage("PW-006", languageType) %>';
			obj = _specialCredit;
			validation = true;
		} else if(Number(password.match(specialCreditregExp).length) < _specialCredit) {
			msg = '<%=MessageResource.getInstance().getMessage("PW-006", languageType) %>';
			obj = _specialCredit;
			validation = true;
		}
	}
	return [msg, obj, validation];
}





///////////////////////////////////////////////////////
//F5 Refresh
//////////////////////////////////////////////////////
var refreshRunner = null;			// 자동 Refresh
function refresh(){
	loginTokenSetting();
	connectWebSocket(); // WebSocket Connect
	goYyListPage();
}

///////////////////////////////////////////////////////
//Messege Area  
//////////////////////////////////////////////////////
/*
	js 파일은 <%@page import="com.tsb.most.framework.util.MessageResource"%>의 영향을 받지 않음.
*/
var YT009 = `<%=MessageResource.getInstance().getMessage("YT-009", languageType) %>`;
var YT010 = `<%=MessageResource.getInstance().getMessage("YT-010", languageType) %>`;
var YT011 = `<%=MessageResource.getInstance().getMessage("YT-011", languageType) %>`;
var YT012 = `<%=MessageResource.getInstance().getMessage("YT-012", languageType) %>`;
var YT013 = `<%=MessageResource.getInstance().getMessage("YT-013", languageType) %>`;
var YT014 = `<%=MessageResource.getInstance().getMessage("YT-014", languageType) %>`;
var YT015 = `<%=MessageResource.getInstance().getMessage("YT-015", languageType) %>`;
var YT016 = `<%=MessageResource.getInstance().getMessage("YT-016", languageType) %>`;
var YT017 = `<%=MessageResource.getInstance().getMessage("YT-017", languageType) %>`;
var YT018 = `<%=MessageResource.getInstance().getMessage("YT-018", languageType) %>`;
var YT019 = `<%=MessageResource.getInstance().getMessage("YT-019", languageType) %>`;
var YT020 = `<%=MessageResource.getInstance().getMessage("YT-020", languageType) %>`;

var LBYT_022 = `<%=MessageResource.getInstance().getMessage("LBYT-022", languageType) %>`;
var LBAP_029 = `<%=MessageResource.getInstance().getMessage("LBAP-029", languageType) %>`;
var WRD_CTTA_DISPLAY_JOB_CODE_DS = `<%=MessageResource.getInstance().getMessage("WRD_CTTA_DISPLAY_JOB_CODE_DS", languageType) %>`;


</script>