/**
 * Mobile UI Common 사용을 위한 자바스크립트 객체
 * 
 * JQM에서 사용되는 공통 함수를 가지고 있다.
 *  uiCommon.common.getInstance().{함수명}
 *   
 * @author  Mr Tonny Kim
 * @version 1.0
 * @date    2012-06-11
 */

var uiCommon = new Object();

uiCommon.common=function(){
	this.ui = null;
};

uiCommon.common.getInstance=function(){
	if( this.uiCommon == null ){
		this.uiCommon = new uiCommon.common();
	}
	
	return this.uiCommon;
};

var blockState = false;

/* Grid Start */
uiCommon.common.prototype={
	/**
	 * Change Page
	 * @param url
	 */
		
	changePage:function(url){
		$.mobile.changePage(url, "slide", "reverse");
	},
	loadPage:function(url){
		$.mobile.loadPage(url, "slide", "reverse");
	},
	blockScreen:function(msg) {
		blockState = true;
		if(msg==null || msg=="" || msg==undefined) {
			msg = "Please wait...";
		}
		
		$.blockUI({ 
			message: '<h2>'+msg+'</h2>',
			css: {
				width: '60%;',
				left:		'20%',
				right:		'20%',
				top:		'40%',
				border: 'none',
				padding: '15px',
				textAlign:	'center',
				backgroundColor: '#000', 
				'-webkit-border-radius': '10px',
				'-moz-border-radius': '10px',
				opacity: .8,
				color: '#FFFFFF'
			} 
		});
	},
	unBlockScreen:function() {
		blockState = false;
		$.unblockUI();
	},
	isBlocked:function() {
		return blockState;
	}
	
};


// Get Parameter 

$.extend({
    getUrlVars: function(){
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function(name) {
        return $.getUrlVars()[name];
    }
});


function callbackHandler(event) {
    if(window.event){
          if (window.event.clientX < 40 && window.event.clientY < 0) { 
              alert("back button is clicked.\nConnection was disabled. Please relogin.");
          }else{
              alert("refresh button is clicked.\nConnection was disabled. Please relogin.");
          }
    }else{
        if (event.currentTarget.performance.navigation.type == 2) { 
            alert("back button is clicked.\nConnection was disabled. Please relogin.");
        }
        if (event.currentTarget.performance.navigation.type == 1){
            alert("refresh button is clicked.\nConnection was disabled. Please relogin.");
        }             
    }
}


function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

function checkNumeric(e, msg) {
	var inputText = e.currentTarget.value;
	if(inputText!='') {
		var result = isNumber(inputText);
		if(result == false) {
			tsbAlert.alert.getInstance().Info(msg);
			e.currentTarget.value = '';
			return false;
		}
	}
}


function allowIntNumber(event) {
	// Allow only backspace and delete
	if (event.keyCode == 45 || event.keyCode == 46 || 
		event.keyCode == 36 || event.keyCode == 35 || event.keyCode == 8 || 
		event.keyCode == 189 || event.keyCode == 109 || event.keyCode == 110 || event.keyCode == 190) {
		// let it happen, don't do anything
		// - 189(main) - 109(keypad) / . 110(keypad) .190(main) / 8 Backspace  / 46 delete / home 36 / end 35 / insert 45 /
	} else {
		// Ensure that it is a number and stop the keypress
		if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
			// 48~57 (numbers on main key) 
			// 96~105 (numbers on keypad)
			event.preventDefault();
		}   
	}
}


function allowIntOnlyNaturalNumber(event) {
	// Allow only backspace and delete
	if (event.keyCode == 45 || event.keyCode == 46 || 
		event.keyCode == 36 || event.keyCode == 35 || event.keyCode == 8 
		) {
		// let it happen, don't do anything
		// 8 Backspace  / 46 delete / home 36 / end 35 / insert 45 /
	} else {
		// Ensure that it is a number and stop the keypress
		if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
			// 48~57 (numbers on main key) 
			// 96~105 (numbers on keypad)
			event.preventDefault();
		}   
	}
}


function numberOnlyInput(e) {
	var inputText = e.currentTarget.value;
    inputText = inputText.replace(/[^0-9\.]/g,'');
    $("#"+e.currentTarget.id).val(inputText);
}

function integerOnlyInput(e) {
	var inputText = e.currentTarget.value;
    inputText = inputText.replace(/[^0-9\.-]/g,'');
    $("#"+e.currentTarget.id).val(inputText);
}


function getCargoTypeDescription(value) {
	
	var result="";
	if(value =="AK") {
		result = "Over Dimension";
	} else if(value =="BB") {
		result = "Break Bulk";
	} else if(value =="BN") {
		result = "Bundle";
	} else if(value =="DG") {
		result = "Dangerous";
	} else if(value =="DR") {
		result = "Reefer & DG";
	} else if(value =="ED") {
		result = "Dangerous Empty";
	} else if(value =="FR") {
		result = "Fragile";
	} else if(value =="GP") {
		result = "General";
	} else if(value =="MT") {
		result = "Empty";
	} else if(value =="RF") {
		result = "Reefer";
	} else {
		result = value;
	}
	
	return result;
}


function getWindowHeight() {
	var windowHeight = 0;
	
	if (typeof(window.innerHeight) == 'number') {
		windowHeight = window.innerHeight;
	} else {
		if (document.documentElement && document.documentElement.clientHeight) {
			windowHeight = document.documentElement.clientHeight  ;
		} else {
			if (document.body && document.body.clientHeight) {
				windowHeight = document.body.clientHeight;
			}
		}
	}
	return windowHeight;
}

function getWindowWidth() {
	var windowWidth = 0;
	
	if (typeof(window.innerWidth) == 'number') {
		
		if(window.innerWidth > document.documentElement.clientWidth) {
			windowWidth = document.documentElement.clientWidth;
		} else {
			windowWidth = window.innerWidth;
		}
		
	} else {
		if (document.documentElement && document.documentElement.clientWidth) {
			windowWidth = document.documentElement.clientWidth  ;
		} else {
			if (document.body && document.body.clientWidth) {
				windowWidth = document.body.clientWidth;
			}
		}
	}
	return windowWidth;
}

///////////////////////////////////////////////////////
// Global Item - Tonny.Kim
//////////////////////////////////////////////////////
var ioTos = {};
var iotos_param = {};

ioTos.param = function(param){
	if (undefined === param) {
		return iotos_param;
	} else {
		iotos_param = param;
	}
}

ioTos.getParam = function(paramName){
	return ioTos.param()[paramName];
}

///////////////////////////////////////////////////////
// Ajax part - Tonny.Kim
//////////////////////////////////////////////////////
function ajaxGet(url, callback, errorCallback) {
	$.ajax({
		type : "GET",
		url : url,
		dataType : 'json',
		contentType: "application/json",
		success : function(json) {
			uiCommon.common.getInstance().unBlockScreen();
			callback(json);
		},
		error : function(error) {
			uiCommon.common.getInstance().unBlockScreen();
			
			if (errorCallback) {
				errorCallback(error);
			} else {
				tsbAlert.alert.getInstance().Info('Fail to load Serverlist');
			}
		}
	});
}

function ajaxPost(url, data, callback, errorCallback, errorDirect) {
	let rootData = {data : data};
	
	$.ajax({
		type : "POST",
		url : url,
		data : JSON.stringify(rootData),
		contentType: "application/json",
		headers: { 'Authorization': iWeb.OAUTH_TOKEN_TYPE  + ' ' + fn_getAccessToken() },
		success : function(json) {
			uiCommon.common.getInstance().unBlockScreen();
			
			if(callback){
				callback(json);
			}
		},
		error : function(error, request, status) {
			uiCommon.common.getInstance().unBlockScreen();
			window.scrollTo({top:0, left:0, behavior:'auto'});
			//error.responseText = "{ "+'"'+"statusText"+'"'+":"+'"'+"This resource requires authentication"+'"'+","+'"'+"responseText"+'"'+":"+'"'+"This resource requires authentication"+'"'+"}";
			if(errorDirect != true){
				let errorObj = null;
				
				if (error.responseText != null && error.responseText.length > 0) {
					errorObj = JSON.parse(error.responseText);
				}
				
				if(errorObj != null && errorObj.error){
					var errDescription = errorObj.error.errorMessage;
					if(errorObj.error === "invalid_token"){
						ajaxRefreshTokenPost(function() { ajaxPost(url, data, callback, errorCallback, errorDirect); },	// Token Update Try! 
								function() { 
									errDescription = "Your session has expired, you need login again!";
									setTimeout(function() { goLoginPage(); }, 2000);
						});							
					} else if (errorObj.error === "unauthorized"){
						errDescription = errorObj.error_description;
						
						setTimeout(function() {
							compulsoryLogout();
						}, 1500);
					}
					
					if (error.status !== 401) tsbAlert.alert.getInstance().Info(errDescription);
				} else {
					//tsbAlert.alert.getInstance().Info('fail to connect server');
					checkConnectionStatusManager();
				}
			}
			
			if (errorCallback) {
				errorCallback(error);
			}
		}
	});
}

function ajaxLoginPost(url, data, callback, errorCallback, errorDirect) {
	let rootData = {data : data};
	
	$.ajax({
		type : "POST",
		url : url,
		data : JSON.stringify(rootData),
		contentType: "application/json",
		headers: { 'Authorization': iWeb.OAUTH_TOKEN_TYPE  + ' ' + iWeb.OAUTH_ACCESS_TOKEN },
		success : function(json) {
			uiCommon.common.getInstance().unBlockScreen();
			
			if(callback){
				callback(json);
			}
		},
		error : function(error, request, status) {
			uiCommon.common.getInstance().unBlockScreen();
			window.scrollTo({top:0, left:0, behavior:'auto'});
			
			if(errorDirect != true){
				let errorObj = null;
				
				if (error.responseText != null && error.responseText.length > 0) {
					errorObj = JSON.parse(error.responseText);
				}
				
				if(errorObj != null && errorObj.error){
					var errDescription = errorObj.error.errorMessage;
					if(errorObj.error === "invalid_token"){
						ajaxRefreshTokenPost(function() { ajaxPost(url, data, callback, errorCallback, errorDirect); },	// Token Update Try! 
								function() { 
									errDescription = "Your session has expired, you need login again!";
									setTimeout(function() { goLoginPage(); }, 2000);
						});							
					} else if (errorObj.error === "unauthorized"){
						errDescription = errorObj.error_description;
						
						setTimeout(function() {
							compulsoryLogout();
						}, 1500);
					}
					
					if (error.status !== 401) tsbAlert.alert.getInstance().Info(errDescription);
				} else {
					//tsbAlert.alert.getInstance().Info('fail to connect server');
					checkConnectionStatusManager();
				}
			}
			
			if (errorCallback) {
				errorCallback(error);
			}
		}
	});
}

/* 인증: 토큰 재발급: Steve(2021.01.20)  */
function ajaxRefreshTokenPost(aCallBack, aCallBackFail) {
	$.ajax({
		type : "POST",
		url : iWeb.OAUTH_TOKEN_URI,
		data : {grant_type: 'refresh_token', refresh_token: iWeb.OAUTH_REFRESH_TOKEN},
		headers: { 'Authorization': 'Basic ' + iWeb.OAUTH_TOKEN_BASIC, 'Content-Type': 'application/x-www-form-urlencoded' },
		success : function(response) {
            console.log("*** oauth.success.ajaxRefreshPost() ***");
			// var txt = JSON.stringify(response);
            // console.log("" + txt);		// 개발자 확인용
            
            // Token 갱신
    		var oAuthResponse = response;
    		var authVo = oAuthResponse.DefaultOAuth2AccessToken;	// OAuth2 의 Token
    		fn_oauth_(authVo.access_token, authVo.refresh_token, authVo.expires_in);

			if(aCallBack !== undefined) aCallBack();            
		},
		error : function(error) {
			console.log("*** oauth.failure.ajaxRefreshPost() ***");
			let errorObj = JSON.parse(error.responseText);
			if(errorObj != null && errorObj.error){
				var errDescription = errorObj.error.errorMessage;
				console.log(error.responseText);
			} else {
				console.log("Unknown error!!!");
			}
            if(aCallBackFail !== undefined) aCallBackFail();     
		}
	});	
}

function loginKeyUp(e){
	if(!(e.keyCode >=37 && event.keyCode <=40)){
		let inputVal = $(this).val();
		$(this).val(inputVal.replace(/[^a-zA-Z0-9]/gi, ''));
	}
}

function goHome() {
	location.href = 'index.jsp';
}

function createButtonList(items, areaId, selectedValue, selectFunction, prefix='button', columnLength=3){
	uiCommon.common.getInstance().unBlockScreen();

	var count = items.length;

	let $areaDiv = $('#' + areaId);
	$areaDiv.empty();
	
	var divField = document.getElementById(areaId);
		
	if(count > 0) {
		for(var i =0; i<count; i++) {
			
			// Row part
			var rowDiv = document.createElement("div");
			rowDiv.id = 'rowDiv'+ prefix + i;
			
			if(columnLength == 2){
				if(i==0 || i%columnLength == 0) {
					rowDiv.className = "ui-block-a ui-responsive";
				} else if (i%columnLength == 1) {
					rowDiv.className = "ui-block-b ui-responsive";
				}
			} else {
				if(i==0 || i%columnLength == 0) {
					rowDiv.className = "ui-block-a ui-responsive";
				} else if (i%columnLength == 1) {
					rowDiv.className = "ui-block-b ui-responsive";
				} else if (i%columnLength == 2) {
					rowDiv.className = "ui-block-c ui-responsive";
				}
			}
			
			document.getElementById(areaId).appendChild(rowDiv);
			
			// 1개의 row안에 들어갈 버튼 
			var maDiv = document.createElement("button");
            maDiv.id = 'id_de_la_div'+i;
            
            var buttonText = items[i].name;
            maDiv.appendChild(document.createTextNode(buttonText));
            
            if(columnLength == 2){
            	maDiv.className="ui-bar-a ui-bar-b";
            } else {
            	maDiv.className="ui-bar-a ui-bar-c";
            }
            
            if(buttonText == selectedValue) {
            	maDiv.setAttribute('class','selectedListButtons');
            } else {
            	maDiv.setAttribute('class','listButtons');
            }

            maDiv.setAttribute('prefix', prefix);

            if(items[i].codeName){
            	maDiv.setAttribute('data-codename', items[i].codeName);
            }
            
            maDiv.onclick = selectFunction;
            
            document.getElementById("rowDiv"+ prefix +i).appendChild(maDiv);
		}
	}
}

// 선택 된 버튼에 click 이벤트를 발생시킨다
function execSelectedButtonClick(prefix){
	var selectedButtons = $('button.selectedListButtons[prefix=' + prefix + ']');

	if(selectedButtons.length > 0){
		selectedButtons[0].click();
	}
}

let initializePassword = "abcd12345";

//added by Brian (2023/10/17) Token 생성을 MOST에 맞추기 위한 방법
String.format = function() {
	var s = arguments[0];
	
	for (var i = 0; i < arguments.length - 1; i++) {       
		var reg = new RegExp("\\{" + i + "\\}", "gm");             
		
		s = s.replace(reg, arguments[i + 1]);
	}

	return s;
}

function encryptAES (key, inputText) {
	var iv = key.substring(0, 16);
	var keyBytes = CryptoJS.enc.Utf8.parse(key)
	var ivBytes = CryptoJS.enc.Utf8.parse(iv);
	var message = inputText;
	
	var encrypt = CryptoJS.AES.encrypt(
			message,
			keyBytes,
			{
				iv: ivBytes
			}
		).ciphertext.toString(CryptoJS.enc.Base64);

	return encrypt;
}

