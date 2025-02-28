/* WEB Operation 상수 */
var iWeb = {
	URL: "http://localhost",		// Server Url, default = ''
//	URL: "http://192.168.203.103", // 로컬 테스트
	OK_: 1,
	UNKNOWN_: 0,
	ERROR_: -1,
	ERR_REF_NEED_: -9,				// if refresh is need or not
	
    LOGIN_FM: "/common/login-fm",
    LOGIN_PROC: "/common/login-proc",
    LOGOUT_PROC: "/common/logout-proc",
	LOGIN_SUCCESS: false,
	
	CSRF_HeaderName : "",			// CSRF 정보
	CSRF_ParmName : "",
	CSRF_Token : "",
	
	USER_ID: '',
    USER_ID64: '',
    USER_PWD64: '',
    EQU_NO: '',

	EXT_MAIN_APPLICATION: '',						// 모듈의 시작 메인 Application
	
	EXT_JS_MAIN: "/extjs/Main/index",				// Main Desktop
	EXT_JS_DM: "/extjs/DM/index",					// Data Management/Terminal Define
	EXT_JS_SP: "/extjs/SP/index",					// Ship Planning			
	EXT_JS_QCT: "/extjs/QCT/index",					// Qc Driver (QC Checker)
	EXT_JS_DR: "/extjs/DR/index",					// Delivery Reservation(DR)
	EXT_JS_OP_REEFER: "/extjs/OP_REEFER/index",		// Reefer Operation
	EXT_JS_OP_GATE: "/extjs/OP_GATE/index",			// Gate Operation
	EXT_JS_OP_DG: "/extjs/OP_DG/index",				// DG Operation
	EXT_JS_OM: "/extjs/OM/index",					// Operation Management(OM)
	EXT_JS_TM: "/extjs/TM/index",					// Terminal Monitoring(TM)
	EXT_JS_YP: "/extjs/YP/index",					// Yard Planning(YP)
 
    CRUD_C: "C",
    CRUD_R: "R",
    CRUD_L: "L",	// List (with Search)
    CRUD_U: "U",
    CRUD_D: "D",
    
    OAUTH_TOKEN_URI: '/auth/createToken',
    OAUTH_TOKEN_URI: '/auth/checkSession',
    OAUTH_TOKEN_BASIC: 'aW90b3Nfam9objpzdWNjZXNz',		// 개발자용: Credential_ID/Secret
    OAUTH_ACCESS_TOKEN: '',								// OAUTH
    OAUTH_REFRESH_TOKEN: '',
    OAUTH_EXPIRES_IN: 0,
    OAUTH_TOKEN_TYPE: '',
    
	WS_WEBSOCKET_URL: '/ws/connect-websocket',			// WebSocket 접속 주소
	WS_WEBSOCKET_TOPIC_PREFIX: '/ws/topic',				// 수신
	WS_WEBSOCKET_PUB_PREFIX: '/ws/pub',					// 송신
	WS_WEBSOCKET_TOPIC_ALL: '/ws/topic/all',

	WEB_TITLE: "ioTOS TotalSoftBank!",

	MENU_WIDTH: 250,									// 좌측 메뉴 설정
	MENU_MICRO_WIDTH: 64,
    HEADER_HEIGHT: 45
};

/* 접속 URL 통합 관리 상수 */
var iUrl = {	
	/* Data Managerment Url   -------------- */
	DM_TB_TMNL: "/dm/tmnlInfo",
	DM_TB_AREA: "/dm/area",
	DM_TB_BERTH: "/dm/berth",
	DM_TB_BERTH_LANE: "/dm/berthLane",
	DM_TB_BITT: "/dm/bitt",
	DM_TB_BLOCK: "/dm/block",
	DM_TB_BLOCK_USE: "/dm/blockUse",
	DM_TB_BLOCK_CFG: "/dm/blockCfg",
	DM_TB_HNO: "/dm/hno",
	DM_TB_VNO: "/dm/vno",
	DM_TB_YSLOT: "/dm/yslot",
	DM_TB_YSLOT_USAGE: "/dm/yslotUsage",
	DM_TB_FACILITY: "/dm/facility",
	
	DM_IOT_DEVICE: "/iot/device",
	DM_IOT_MESSAGE: "/iot/message",
	DM_IOT_CONFIG: "/iot/config",
	DM_IOT_CONFIG_UPDATE: "/iot/updateCfg",
	DM_IOT_DEVICE_XY: "/iot/device_xy",	/* Berth 기준 X,Y 좌표 포함 Device 위치정보 */
	DM_IOT_CHECK_LOG: "/iot/iotCheckingLog",	
	
	MAP_BPT_MAP: "/map.html",
		
	PORTINFO : '/main/portinfo',
	/********************* DM *********************/
	DM_CODE : '/dm/code',
	DM_VESSEL_SCHEDULE: '/dm/vesselschedule',
	/********************** DR **********************/

   /********************** OM **********************/
   OM_MASTER_CODE : '/om/common/codegeneral/codefrommaster',
   OM_COUNTRY_CODE : '/om/common/codegeneral/countrycode',
   OM_PARTNER_CODE : '/om/common/codegeneral/partnercode',
   OM_SERVICELANE_CODE : '/om/common/codegeneral/servicelanecode',

   OM_GENERAL_CODE: '/om/code/generalcode/generalcode',
   
   OM_CONTAINER_TYPE_CODE : '/om/code/containertypesize/containertypecode',
   OM_CONTAINER_SIZE_CODE : '/om/code/containertypesize/containersizecode',
   OM_CONTAINER_TYPE_SIZE_CODE : '/om/code/containertypesize/containertypesizecode',
   OM_OPERATOR_CODE : '/om/code/containertypesize/opeartorcode',

   OM_PORT_CODE : '/om/code/portcode/portcode',
   
   OM_SERVICELANE_DATA : '/om/code/servicelane/servicelanedata',
   OM_SERVICELANE_PORT : '/om/code/servicelane/servicelaneport',

   OM_PARTNER_CODE : '/om/code/partnercode/partnercode',
   OM_PARTNER_PERSON : '/om/code/partnercode/partnerperson',
   OM_PARTNER_AGENCY : '/om/code/partnercode/partneragency',

   OM_YARDDEFINE_BERTH : '/om/yarddefine/berth/berthcode',
  

	/********************** OP **********************/

	/********************** SM **********************/

	/********************** TM **********************/

	/********************** YP **********************/
	POSITIONINGRULE : '/yp/positioningrule',
	/********************** SP **********************/
	SP_VSL_SCHEDULE : '/sp/vessellist',
	SP_META_DRAW_EXP: 'resources/data/MetaDrawVesselExplorer.json',		
	SP_META_DRAW_NAVI: 'resources/data/MetaDrawVesselNavigator.json',		
	SP_META_DRAW_CNTR: 'resources/data/MetaDrawContainerSlotTSB.json',		
	SP_META_PLAN_CONST: 'resources/data/MetaPlanningConstraints.json',		
	SP_META_COMP_RULE: 'resources/data/MetaImdgCompanyRuleTSB.json',

	SP_C_STOWAGE : '/sp/insertstowage',
	SP_R_STOWAGE : '/sp/selectstowage',
	SP_D_STOWAGE : '/sp/deletestowage',
	SP_U_STOWAGE : '/sp/updatestowageseq', 

	SP_VVD_PORTS : '/sp/selectvvdport',

	SP_DISCHARGE : 'D',
	SP_LOAD : 'L',
	SP_ALLOC: 'A',
	SP_DEALLOC: 'D',	
	
	/******************** OP-RF ********************/
	RF_REEFER_MONITORING : '/rf/reeferMonitoring',
	RF_PLUG_IN_OUT : '/rf/pluginInOut',
	RF_CONFIGURATION: '/rf/configuration',
	RF_COMPILE_OPTION: '/rf/compileOption',
	RF_SITE_DISTRIBUTION: '/rf/siteDistribution',
	RF_REEFER_CONTAINER: '/rf/reeferContainer',
	/******************** OP-DG ********************/
	DG_PREMIUM_CLASS: '/dg/premiumClass',
	/******************** OP-GT ********************/
};

/********************** Window **********************/
/* Toast 메시지 표시 */
function fn_toast_(localeTitle, localeMsg, params, duetime, icon) {
	if(!nullChk_(duetime)) duetime = 400;

	var title = TSB.locale.i18n.Bundle.instance.getMsg(localeTitle);
	
	if(title == null ||
	   title.indexOf('undefined') > 0 ){
		title = localeTitle;
	}
	
	var msg = TSB.locale.i18n.Bundle.instance.getMsg(localeMsg, params);
	
	if(msg == null ||
	   msg.indexOf('undefined') > 0 ){
		msg = localeMsg;
	}

	Ext.toast({
		html: msg,
		title: title,
		closable: false,
		align: 't',
		slideInDuration: duetime,
		minWidth: 400,
		height: 100
	});	
};

/* 알림 메시지 표시 */
function fn_alert(msgTitle, msgBody) {
	if(!nullChk_(msgBody)) {
		msgBody = msgTitle;
		msgTitle = "Info";
	}
	Ext.create('Ext.window.MessageBox', {
		alwaysOnTop: true,
		closeAction: 'destroy'
	}).show({
		title: msgTitle,
		buttons: Ext.Msg.OK,
		iconCls: 'accept',
		message: msgBody,
	});
}

/********************** Login **********************/
/* 로그인폼 */
function fn_loginFm_() {
	location = iWeb.LOGIN_FM;
}

/* 로그아웃 */
function fn_logout_() {
	var pmVV = iWeb.CSRF_ParmName;
	var tokenVV = iWeb.CSRF_Token;
	fn_post_(iWeb.URL + iWeb.LOGOUT_PROC , {tsb: 'TOS', [pmVV]: tokenVV});
}

/* 로그인 사용자 정보 */
function fn_userInfo_(uid64, upwd64) {
	iWeb.USER_ID64 = uid64;
	iWeb.USER_PWD64 = upwd64;
}

/* 인증: 토큰 */
function fn_myToken_() {
	return {access_token: iWeb.OAUTH_ACCESS_TOKEN, refresh_token: iWeb.OAUTH_REFRESH_TOKEN, expires_in: iWeb.OAUTH_EXPIRES_IN};
}

/* 인증: 토큰발급: 개발자용  */
function fn_getToken_(uid, upwd, callBackFn) {
	if(!nullChk_(uid) && uid.length > 1) {
		if(upwd !== undefined) {
			iWeb.USER_ID = uid;
			iWeb.USER_ID64 = btoa(uid);		// Base64 Encode
			iWeb.USER_PWD64 = btoa(upwd);
			console.log(iWeb.OAUTH_TOKEN_URI);
			console.log(iWeb.USER_ID64 + ' ' + iWeb.USER_PWD64);
			Ext.Ajax.request({
				url: fn_server_(iWeb.OAUTH_TOKEN_URI),
				params : {grant_type: 'password', username: iWeb.USER_ID64, password: iWeb.USER_PWD64},
				method : 'POST',
				headers: { 'Authorization': 'Basic ' + iWeb.OAUTH_TOKEN_BASIC },                            
				success: function(response) {
					console.log("*** oauth.success ***");
					console.log(response.responseText);
					var authVo = Ext.decode(response.responseText);
					fn_oauth_(authVo.access_token, authVo.refresh_token, authVo.expires_in, true);
					if(callBackFn !== undefined) {
						callBackFn(true);	// 성공(true)
					} else {
						fn_startMainApp_();	// 메인앱 실행
					}
				},
				failure: function(response) {
					iWeb.USER_ID = "";
					console.log("*** oauth.failure!!! *** " + response.status);
					console.log(response.responseText);
					fn_loginSuccess_(false);
					var msg = '';
					if(response.status === 0) {
						msg = '[Error]: Failed to connect Server';
					} else {
						var err = JSON.parse(response.responseText);
						msg = "response status[" + response.status + "]: " + err.error;
					}
					if(callBackFn !== undefined) callBackFn(false, msg);	// 실패(false)
				}
			});	
		}
	}
}

/* 인증: 토큰 재발급: Steve(2021.01.20)  */
function fn_getRefreshToken_(aCallBack, aCallBackFail) {
	
	Ext.Ajax.request({
		url: fn_server_(iWeb.OAUTH_TOKEN_URI),
		jsonData : {grant_type: 'refresh_token', refresh_token: iWeb.OAUTH_REFRESH_TOKEN},							
		method : 'POST',
		headers: { 'Authorization': 'Basic ' + iWeb.OAUTH_TOKEN_BASIC, 'Content-Type': 'application/x-www-form-urlencoded' },
		success: function(response) {
			console.log("*** fn_getRefreshToken_.success ***");
			console.log(response.responseText);
            // Token 갱신
			var authVo = Ext.decode(response.responseText);
			fn_oauth_(authVo.access_token, authVo.refresh_token, authVo.expires_in, true);
			
			if(aCallBack !== undefined) aCallBack(response);
		},
		failure: function(response) {
			console.log("*** fn_getRefreshToken_.failure!!! ***");
			console.log(response.responseText);
			if(aCallBackFail !== undefined) aCallBackFail(response);
		}
	});		
}

/* OAuth Token 값 설정 */
function fn_oauth_(aToken, rToken, expv, aState) {
	iWeb.OAUTH_ACCESS_TOKEN = aToken;
	iWeb.OAUTH_REFRESH_TOKEN = rToken;
	iWeb.OAUTH_EXPIRES_IN = expv;
	setSessionItem('OAUTH_ACCESS_TOKEN', aToken);
	setSessionItem('OAUTH_REFRESH_TOKEN', rToken);
	setSessionItem('OAUTH_EXPIRES_IN', expv);
	
	fn_setTokenObject();	// 로컬/전역으로 저장

	if(aState !== undefined) fn_loginSuccess_(aState);
}

/* 전역/토큰 객체로 저장 */
function fn_setTokenObject() {
	setLocalStorageObj(iWeb.USER_ID + "_TOKEN", {OAUTH_ACCESS_TOKEN: iWeb.OAUTH_ACCESS_TOKEN, OAUTH_REFRESH_TOKEN: iWeb.OAUTH_REFRESH_TOKEN, OAUTH_EXPIRES_IN: iWeb.OAUTH_EXPIRES_IN});
}

/* 전역/토큰 객체 */
function fn_getTokenObject() {
	return getLocalStorageObj(iWeb.USER_ID + "_TOKEN");
}

/* 전역/토큰 (값) */
function fn_getAccessToken() {
	var tkn = fn_getTokenObject();
	if(tkn != null) return tkn.OAUTH_ACCESS_TOKEN;
	//if(tkn != null) return tkn;
	return iWeb.OAUTH_ACCESS_TOKEN;
}

// Tonny.Kim.2020.11.04
function loginTokenSetting(){
	let tokenType = getSessionItem('OAUTH_TOKEN_TYPE');
	let accessToken = getSessionItem('OAUTH_ACCESS_TOKEN');
	let refreshToken = getSessionItem('OAUTH_REFRESH_TOKEN');
	let expiresIn = getSessionItem('OAUTH_EXPIRES_IN');
	let ytNo = getSessionItem(SESSION_YT_NO);

	iWeb.OAUTH_TOKEN_TYPE = tokenType;
	iWeb.EQU_NO = ytNo;
	fn_oauth_(accessToken, refreshToken, expiresIn);
}

/* CSRF Token 값 설정 */
function fn_csrf_(headerName, parmName, tokenValue) {
	iWeb.CSRF_HeaderName = headerName;
	iWeb.CSRF_ParmName = parmName;
	iWeb.CSRF_Token = tokenValue;
}

function fn_loginSuccess_(vv) {
	if(vv !== undefined) {
		iWeb.LOGIN_SUCCESS = vv;
	}
	return iWeb.LOGIN_SUCCESS;
}

/* Service URL: Ajax 및 Proxy Url 설정 시 사용 */
function fn_server_(servicUrl, pParm) {
	if(servicUrl === undefined) {
		return iWeb.URL;
	}

	if(pParm !== undefined) {
		var nParm = JSON.stringify(pParm);
		return iWeb.URL + servicUrl + "?pm="+nParm;
	} else {
		return iWeb.URL + '/direct' + servicUrl; //RBT. add '/direct'
	}
}


/************ String ************/
function nullChk_(value){
	if(typeof value === 'string'){
		if(value.trim() === ''){
			return true;
		}else{
			return false;
		}
	}else{ //obj
		if(value === undefined || value === null){
			return true;
		}else{
			return false;
		}
	}	
}

function equalChk_(a, b){
	if(!nullChk_(a) && a === b){
		return true;
	}
	return false;
}

/*
   function trim_(val){
	if(!nullChk_(val)){
		return '';
	}else{
		return val.trim();
	}
} */

function upperCaseFirstChar_(val){
	if(!nullChk_(val)){
		return '';
	}else{
		return val.substring(0, 1).toUpperCase() + val.substring(1);
	}
}

//protect sql injection
function convertHtml_(str){
	str = str.replace(/</g, "&lt;");
	str = str.replace(/>/g, "&gt;");
	str = str.replace(/\"/g,"&quot;");
	str = str.replace(/\'/g,"&#39;");
		
	return str;
}

function convertHtmlBack_(str){
	str = str.replace(/&lt;/g, "<");
	str = str.replace(/&gt;/g, ">");
	str = str.replace(/&quot;/g,'"');
	str = str.replace(/&#39;/g,"'");
	
	return str;
}

function inArray_(value, ext){
	//var ext = ['gif','png','jpg','jpeg','doc','docx','xls','xlsx','hwp', 'pdf'];
	for(var i = 0; i < ext.length ; i++){
		if(value == ext[i]){
			return true; //ext array exist > true
		}
	}
	return false;
}

function arrayToStr_(ext){
	var string = '';
	for(var i = 0; i < ext.length ; i++){
		string += ext[i] + ', ';
	}
	return string.substring(0, string.length -2);
}

/* 알림 메시지 표시 */
function fn_alert_(msgTitle, msgBody) {
	if(msgBody === undefined) {
		msgBody = msgTitle;
		msgTitle = "Information";
	}
	Ext.create('Ext.window.MessageBox', {
		alwaysOnTop: true,
		closeAction: 'destroy'
	}).show({
		title: msgTitle,
		buttons: Ext.Msg.OK,
		iconCls: 'x-fa fa-info',
		message: msgBody,
	});
}

/* 오류 메시지 표시 */
function fn_error_(msgTitle, msgBody) {
	if(msgBody === undefined) {
		msgBody = msgTitle;
		msgTitle = "Error";
	}
	Ext.create('Ext.window.MessageBox', {
		alwaysOnTop: true,
		closeAction: 'destroy'
	}).show({
		title: msgTitle,
		icon: Ext.Msg.ERROR,
		iconCls: 'error',
		buttons: Ext.Msg.OK,
		message: msgBody,
	});
}

/************ Locale ************/
function getLabel_(key){
	//return LiMainExtJS.getApplication().bundle.getMsg(key)
	return TSB.locale.i18n.Bundle.instance.getMsg(key);
}


/************ Grid Method ************/
function fn_syncStore_(store) {
	var url = store.getProxy().getUrl();
	if(!nullChk_(url)) {
		var me = this;
		var index = store.findBy((record) => !record.isValid());
		if(index != -1){
			var record = store.getAt(index);
			console.log(record);
			return record;
		}
		else
		{ 
			store.sync({
				success: function(resp) {
					if(resp.errCode < 0) {
						fn_toast_('fail_msg', 'savefail_msg', ' ' + resp.errMsg);
					} else {
						fn_toast_("Successfully Saved!");
						store.reload();
					}
				}
			});
			return null;
		}
	}
	return null;
}
/* [Grid]: Record 데이터 수정(Update 이벤트) - 서버로 전송(Insert or Update 수행) */
function fn_createUpdateRecord_(record, store) {
	var url = store.getProxy().getUrl();
	if(!nullChk_(url) && !nullChk_(record)) {
		var me = this;
		// phantom : True when the record does not yet exist in a server-side database.
		if (record.phantom) {	 
			console.log('***** insert *****');
			record.set('crudType',iWeb.CRUD_C);
			record.set('id',"0");		// ExtJS에서 ID 임의값 할당오류방지
			
			store.sync({
				success: function(resp) {
					if(resp.errCode < 0) {
						//fn_toast_("Fail to create: " + resp.errMsg);
						fn_toast_('fail_msg', 'createfail_msg', ' ' + resp.errMsg);
					} else {
						fn_toast_("Successfully Created!");
						//MessageUtil.saveSuccess();
						store.reload();
					}
				}
			});
		} else {
			console.log('***** update ***** + writer RootProperty '+store.getProxy().getWriter().getRootProperty());
			record.set('crudType',iWeb.CRUD_U);
			store.sync({
				success: function(resp) {
					if(resp.errCode < 0) {
						//fn_toast_("Fail to update: " + resp.errMsg);
						fn_toast_('fail_msg', 'updatefail_msg', ' ' + resp.errMsg);
					} else {
						//fn_toast_("Successfully Updated!");
						//MessageUtil.infoToast('success_msg', 'updatesuccess_msg', ' test');
						fn_toast_('success_msg', 'updatesuccess_msg'); 
						store.reload();
					}
				}
			});
		}
	}
}

/* [Grid]: 새로운 Row 추가 - 입력모드 */
function fn_addRow_(grid, newRecord) {
	var store = grid.getStore();
	var storeModel = store.getModel();
	var record = storeModel.create();
	if(newRecord !== undefined) record = newRecord;	// 초기화된 newRecord로 대체
	var editor = grid.getPlugin('rowEditor');	// 고정명: editorPlugin
	
	editor.cancelEdit();
	
	var idx = 0;
	if(grid.getSelection() && grid.getSelection().length>0) {
		idx = store.indexOfId(grid.getSelection()[0].get('id'));
	}
	store.insert(idx, record);
	grid.getSelectionModel().select(record);
	editor.startEdit(record);
	
	return record;
}

// CELL EDITING
function fn_addRow2_(grid) {
	var store = grid.getStore();
	var storeModel = store.getModel();
	var record = storeModel.create();
	var editor = grid.getPlugin('cellEditor');	// 고정명: editorPlugin
	
	editor.cancelEdit();
	
	var idx = 0;
	if(grid.getSelection() && grid.getSelection().length>0) {
		idx = store.indexOfId(grid.getSelection()[0].get('id'));
	}
	store.insert(idx, record);
	grid.getSelectionModel().select(record);
	// editor.startEdit(record);
	
	return record;
}

/* [Grid]: Store에 데이터 로딩: 파라미터 조건 */
function fn_getStoreLoad_(store, params) {
	store.load({
		params: params,
		callback: function(rec, opr, success){
			var rootProperty = store.getProxy().getReader().getRootProperty();
			if(store.getProxy().getReader().getConfig().keepRawData){	
				console.log(store.getProxy().getReader().rawData);
			}else{
				console.log('Record length : ' + rec.length + ' Root property : ' + rootProperty);
			}

			if(rec.length > 0){

			}else{
				fn_toast_('fail_msg', 'no_match_data_msg');
			}
		}
	})
	return null;
}

/* [Grid]: 선택 레코드 */
function fn_getSelectedRecord_(grid) {
	if(!nullChk_(grid)/* grid !== undefined && grid != null */) {
		var sRecord = nullChk_(grid.getSelection()) ? null : grid.getSelection()[0];
		return sRecord;
	}
	return null;
}

/* [Grid]: Record 삭제 - 서버로 전송(Delete) 수행 */
function fn_removeRecord_(store, record){
	var url = store.getProxy().getUrl();

	if(url !== undefined && record !== undefined && record !=null) {
		Ext.Msg.show({
			title: 'Remove Item',
			message: 'Do you want remove the Item?',
			buttons: Ext.Msg.OKCANCEL,
			icon: Ext.Msg.QUESTION,
			fn: function(button) {
				if (button === 'ok') {
					record.set('crudType',iWeb.CRUD_D);
					store.remove(record);
					store.sync({
						success: function(resp) {
							if(resp.errCode < 0) {
								//fn_toast_("Fail to delete: " + resp.errMsg);
								fn_toast_('fail_msg', 'deletefail_msg', ' '+resp.errMsg);
							} else {
								//fn_toast_("Successfully Deleted!");
								fn_toast_('success_msg', 'deletesuccess_msg');
								//MessageUtil.infoToast('success_msg', 'deletesuccess_msg');
								store.reload();
							}
						}
					});
				}
			}
		});		
	} else {
		//fn_toast_("Select item to remove!");
		fn_toast_('Information', 'selectdeletedata_msg');
	}  
}

/* 시간지연 - 사용법: await sleep(2000);   */
function fn_sleep_(milliseconds) {
	const date = Date.now();
	var currentDate = null;
	do {
	  currentDate = Date.now();
	} while (currentDate - date < milliseconds);
}

/* WebSocket 연결(요청) */
/* 
 * @param wsUrl 접속_URL
 * @param wsTopicID 토픽_ID
 * @param wsSubscribeFn 메시지 수신시 호출함수
 * @param wsCallBack 접속시도 후 호출함수

  예) fn_ws_connect_('/접속_URL', 'Topic', fn_SubscribeFn, fn_CallBack); 
  예) 수신메시지 내용: var msgRsv = JSON.parse(msg.body).content;
*/
var wsStompClient_ = null;
var wsConnected_ = false;
function fn_ws_connect_(wsUrl, wsTopicID, wsSubscribeFn, wsCallBack) {
	if(!wsConnected_) {
		var socket = new SockJS(wsUrl + '?access_token=' + iWeb.OAUTH_ACCESS_TOKEN);	// OAuth2.0
		wsStompClient_ = Stomp.over(socket);
		wsStompClient_.reconnect_delay = 5000;
		var pws = atob(iWeb.USER_PWD64);
		wsStompClient_.connect({"userid":iWeb.USER_ID, "pwcode": pws, "equno": iWeb.EQU_NO}, function (frame) {
			console.log('[WS]: Connected: ' + frame);
			wsConnected_ = true;
			if(wsTopicID !== undefined && wsSubscribeFn !== undefined) {
				// Topic에 Subscribe_Function 등록 = 해당 Topic 메시지 발생시 호출 되는 함수 
				wsStompClient_.subscribe(wsTopicID, wsSubscribeFn);
				
				// added by jaeok (2020.12.23) HJNC-CUSP-Controller v1.4 (1순위 2차분) CTR-206 B6
				// YT번호에 따른 메세지 수신 설정을 위해 추가
				var topicIdYtNo = getSessionItem('yardTruckNo');
				if (topicIdYtNo != undefined && topicIdYtNo.length > 0) {
					topicIdYtNo = iWeb.WS_WEBSOCKET_TOPIC_PREFIX + "/" + topicIdYtNo;
					wsStompClient_.subscribe(topicIdYtNo, wsSubscribeFn);
					console.log("[WS]: subscribe Topic = " + topicIdYtNo);
				}
				
			} else {
				wsConnected_ = false;
			}
			if(wsCallBack !== undefined) wsCallBack(true);	// 콜백 호출(true) 호출
		});
	}
}

/* Websocket 연결(기본으로 접속) */
/* 
 * 예)  fn_ws_connect_default_(메시시 수신시 콜백함수, 연결접속 시도 후 콜백함수);
 * 
 * */
function fn_ws_connect_default_(wsSubscribeFn, wsCallBack) {
	fn_ws_connect_(fn_server_(iWeb.WS_WEBSOCKET_URL), iWeb.WS_WEBSOCKET_TOPIC_ALL, wsSubscribeFn, wsCallBack);
}

/* WebSocket 연결(해지) */
function fn_ws_disconnect_() {
	if(fn_isConnected_()) {
		var pws = atob(iWeb.USER_PWD64);
		wsStompClient_.disconnect( function (frame) {}, {"userid":iWeb.USER_ID, "pwcode": pws, "equno": iWeb.EQU_NO});	// EquID 전달
		wsConnected_ = false;
		console.log("[WS]: Disconnected - USER_ID = " + iWeb.USER_ID + ", EQU_NO = "+ iWeb.EQU_NO);
	}
}

/* WebSocket 연결 여부 */
function fn_isConnected_() {
	if(wsStompClient_ != null) {
		return wsStompClient_.connected
	} 
	return false;
}

/* WebSocket 메시지 (전송 - Publish) */
function fn_ws_send_(wsUrl, uMsg) {
	if(wsStompClient_ ) {
		wsStompClient_.send(wsUrl, {}, uMsg);
	}
}

/* 로그인 폼 */
function fn_viewLogin_(msg) {
    var loginWin = Ext.create({xtype:'app-login'});
    if(msg !== undefined) {
        loginWin.msgTextUpdate(msg);
    }
}

/* 메인 앱 */
function fn_startMainApp_() {
    var iotosApp = Ext.application(iWeb.EXT_MAIN_APPLICATION);
}

/* 로그인 & 메인 앱 */
function fn_startMainApplication_(appName, userId, uPass) {
	/* 1. 메인앱 지정 */
	iWeb.EXT_MAIN_APPLICATION = appName; 
	
	if(userId !== undefined && uPass !== undefined) {
		fn_getToken_(userId, uPass);   
	} else {
		/* 로그인 */
		if(iWeb.LOGIN_SUCCESS) { 
			fn_startMainApp_();
		} else {
			fn_viewLogin_();
		}
	}
}

/* Ext.Ajax Request Json Format (POST) */
function fn_AjaxJson_(aUrl, aParms, aCallBack, aCallBackFail) {
	Ext.Ajax.request({
		url: fn_server_(aUrl),
		jsonData : aParms,							// J
		method : 'POST',
		success: function(response) {
			console.log("*** fn_AjaxJson_.success ***");
			if(aCallBack !== undefined) aCallBack(response);
		},
		failure: function(response) {
			console.log("*** fn_AjaxJson_.failure!!! ***");
			console.log(response.responseText);
			if(aCallBackFail !== undefined) aCallBackFail(response);
		}
	});	
}

/* Ext.Ajax Request (POST)*/
function fn_Ajax_(aUrl, aParms, aCallBack, aCallBackFail) {
	Ext.Ajax.request({
		url: fn_server_(aUrl),
		params : aParms,
		method : 'POST',
		success: function(response) {
			console.log("*** fn_Ajax_.success ***");
			if(aCallBack !== undefined) aCallBack(response);
		},
		failure: function(response) {
			console.log("*** fn_Ajax_.failure!!! ***");
			console.log(response.responseText);
			if(aCallBackFail !== undefined) aCallBackFail(response);
		}
	});	
}

/* POST: Just post submit, Don't care reply */
function fn_post_(url, params, domEl) {
	var form = document.createElement('form');
	if(domEl !== undefined) {
		domEl.appendChild(form);
	} else {
		document.body.appendChild(form);
	}
	form.action = url;
	form.method = 'POST';
	
	for (var i in params) {
		if (params.hasOwnProperty(i)) {
			var input = document.createElement('input');
			input.type = 'hidden';
			input.name = i;
			input.value = params[i];
			form.appendChild(input);
		}
	}
	form.submit();
}

/* 날짜포멧: YYYY-MM-DD */
function fn_YYYY_MM_DD_(uDate) {
	if(uDate === undefined) uDate = new Date(); // 오늘
	var mm = uDate.getMonth() + 1; // getMonth() is zero-based
	var dd = uDate.getDate();
	
	return uDate.getFullYear() + "-"
	+ ((mm>9 ? '' : '0') + mm) + "-"
	+ ((dd>9 ? '' : '0')) + dd;
}

