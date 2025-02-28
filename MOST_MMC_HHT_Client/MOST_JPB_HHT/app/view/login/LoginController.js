Ext.define('MOST.view.login.LoginController', {
	extend : 'MOST.view.foundation.BaseViewController',
	
	alias: 'controller.login',

	requires: [
	],
	
	onLoad: function() {
		var me = this;
        var form = me.getReferences().form;
        var btn = me.getReferences().loginButton;		
        
		//added by Brian (Keep Cache Data) 
		var id = localStorage.getItem("id");
		var language = localStorage.getItem("language");
		
		me.lookupReference('userid').setValue(id);
		if(StringUtil.isNullorEmpty(language) == false)
			me.lookupReference('language').setValue(language);
		
    	var cookieToken = Ext.util.Cookies.get('mosttoken');
    	if (cookieToken && cookieToken.toString().length > 10) {
    		me.refreshTokenWithCookieInfo(btn);
    	}
    	
	},
	
	onShowLoginHHT: function () {
		var me = this;
		var form = me.getReferences().form;
		var btn = me.getReferences().loginButton;

		var crrDt = new Date();
		var dtFm = Ext.Date.format(crrDt, 'd/m/Y');
		var shiftId = '';

		var cStartTime1 = CodeConstants.STANDARD_SHIFT1_FMHHMM;
		var cStartTime2 = CodeConstants.STANDARD_SHIFT2_FMHHMM;
		var cStartTime3 = CodeConstants.STANDARD_SHIFT3_FMHHMM;

		var startTimeShft1 = cStartTime1.slice(0, 2) + ":" + cStartTime1.slice(2);
		var startTimeShft2 = cStartTime2.slice(0, 2) + ":" + cStartTime2.slice(2);
		var startTimeShft3 = cStartTime3.slice(0, 2) + ":" + cStartTime3.slice(2);

		var timeShf1 = Ext.Date.parse(dtFm + " " + startTimeShft1, MOST.config.Locale.getDefaultDateFormatWithNoSeconds()); // 'd/m/Y H:i'
		var timeShf2 = Ext.Date.parse(dtFm + " " + startTimeShft2, MOST.config.Locale.getDefaultDateFormatWithNoSeconds()); // 'd/m/Y H:i'
		var timeShf3 = Ext.Date.parse(dtFm + " " + startTimeShft3, MOST.config.Locale.getDefaultDateFormatWithNoSeconds()); // 'd/m/Y H:i'

		if (crrDt < timeShf1 || crrDt >= timeShf3)
			shiftId = CodeConstants.STANDARD_SHIFT3_ID;
		if (crrDt >= timeShf1 && crrDt < timeShf2)
			shiftId = CodeConstants.STANDARD_SHIFT1_ID;
		if (crrDt >= timeShf2 && crrDt < timeShf3)
			shiftId = CodeConstants.STANDARD_SHIFT2_ID;

		if (shiftId) {
			this.lookupReference('refCboShift').setValue(shiftId);
		}

		var cookieToken = Ext.util.Cookies.get('mosttoken');
		if (cookieToken && cookieToken.toString().length > 10) {
			me.refreshTokenWithCookieInfo(btn);
		}

		console.log('Device Width (Max between window scree width and  window inner width: ' + Math.max(window.screen.width, window.innerWidth));
		console.log('Device window Width : ' + window.screen.width);
		console.log('Device window inner Width : ' + window.innerWidth);
	},
	
	onLogin: function(f,e){
		var me = this;
		if( (e.getKey() == e.ENTER && e.type == 'keydown') || (e.getKey() == undefined && e.type == 'click') ) {
	        var form = me.getReferences().form;
	        var btn = me.getReferences().loginButton;
	        if (form.isValid()) {
        		me.onLoginClick(btn);
	        }
		}
	},
	
	 onLoginModern: function(f,e){
		var me = this;
		if( (e.getKey() == e.ENTER && e.type == 'keydown') || (e.getKey() == undefined && e.type == 'click') ) {
            var form = me.getView();
            var btn = me.getReferences().loginButton;
            if (form.validate()) {
        		me.onLoginClick(btn);
            }
        }
    },
	
    refreshTokenWithCookieInfo: function(btn) {
    	var me = this;
		var cookieToken = Ext.util.Cookies.get('mosttoken');
		
		var item = Ext.create('MOST.model.foundation.CredentialItem', {
			accessToken: cookieToken,
			tmnlCd: MOST.config.Token.getTmnlCd(),
			requestServerName: window.location.hostname
		});
		
		var proxy = item.getProxy();
		
		if(CONSTANTS.AUTH_TYPE === 'AAD') {
			proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/oauth2/adal/newtoken';
		}else{
			//current MOST UP for JPB
			//proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/auth/newtoken';
			//modified by Brian (to check for session time out) 2019.11.07
			proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/auth/checkSession';
		}
		
		item.save({
            callback: function(record, operation, success) {
            	if(success) {
            		MOST.config.Token.setTokenType('Bearer');
					MOST.config.Token.setAccessToken(record.data.accessToken);
					MOST.config.Token.setExpiredCheck(record.data.expiredCheck);
					MOST.config.Token.setExpiresInSeconds(record.data.expiresInSec);
					
					//added by Brian (for parameter configuration)
					MOST.config.Token.setInterfaceCustom(record.data.interfaceCustom);
					MOST.config.Token.setTmnlHoldChk(record.data.tmnlHoldChk);
					MOST.config.Token.setCustomHoldChk(record.data.customHoldChk);
					
					//added by Brian (for CargoType authority)
					MOST.config.Token.setCgTpAuth(record.data.cgTpAuth);
					
					if(record.data.expiredCheck === 'Y'){
						MOST.config.Token.tokenLifeCycleChecker();
					}
					
					me.onLogOn(btn);
					
            	} else {
            		Ext.util.Cookies.clear('mosttoken');
            		//Nothing, waiting login by user
            	}
            }
		});
	},
    
	onLogOn: function(btn, opts, event, id, win) {
		var me = this;
		
		if (!Ext.platformTags.classic){
			var workDate = me.lookupReference('refWorkDate').getValue();
			var workShift = me.lookupReference('refCboShift').getValue();
			var shiftDisplay = me.lookupReference('refCboShift').getSelection().get('codeDisplay');
		}
		
		var token = Ext.util.Cookies.get('mosttoken');
		
		var profileStore = Ext.create('Ext.data.Store', {
			model: 'MOST.model.administrator.User',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/basic/profile'
			}
		});
		
		//To prevent global catch for the exception
		Ext.Ajax.suspendEvent('requestexception');		
		profileStore.load({
			callback: function(records, operation, success) {
				if (success) {
            		MOST.config.Token.setUserId(records[0].data.userId);
					MOST.config.Token.setPtnrCode(records[0].data.ptnrCode);
					MOST.config.Token.setUserLevel(records[0].data.userLevel);
					MOST.config.Token.setUserType(records[0].data.userType);
					
					//Add WorkDate and WorkShift:
					if (!Ext.platformTags.classic){
						MOST.config.Token.setWorkDate(workDate);
						MOST.config.Token.setWorkShift(workShift);
						//MOST.config.Token.setWorkShiftDisplay(me.lookupReference('refCboShift').getSelection().get('codeDisplay'));
						MOST.config.Token.setWorkShiftDisplay(shiftDisplay);
					}
					
					if(win) {
						//Resume global catch for the exception
		            	Ext.Ajax.resumeEvent('requestexception');
						win.close();
					}
					
					me.fireEvent('globalDataLoad');
					
					if(me.getView()) me.getView().close();
					
            	} else {
            		//Nothing, wait to input id/pw by user
				}
            	
            	//Resume global catch for the exception
            	Ext.Ajax.resumeEvent('requestexception');					
	        }
		});	
	},
	
	onLoginClick: function(btn, opts, event, id, win) {
		var me = this;
		var refs = me.getReferences();
		var pwd = me.lookupReference('password');
		var token = Ext.util.Base64.encode(id + ":" + pwd.getValue());
		
		if(!id) {
			id = me.lookupReference('userid').getValue();
		}
		
		if(id.value === '' || pwd.value === '') {
			return;
		}

		var workDate = me.lookupReference('refWorkDate').getValue();
		var workShift = me.lookupReference('refCboShift').getValue();
		var shiftDisplay = me.lookupReference('refCboShift').getSelection().get('codeDisplay');

		// Tonny.Kim - token encoding (added by Brian , Branch Code)
		var key = me.encryptAES(id);
		var encryptPwd = me.encryptAES(key,pwd.getValue());
		var token = Ext.util.Base64.encode(Ext.String.format('{0}:{1}:{2}:{3}:{4}', id, encryptPwd,'MOST',key));
		var item = Ext.create('MOST.model.foundation.CredentialItem');
		
		item.set('accessToken', token);
		item.set('branchCode', 'MOST_JPBI');
		item.set('isSso', false);
		
		//Distinguish between HHT or not
		if (!Ext.platformTags.classic){
			item.set('accessDevice','HHT');
		} else {
			item.set('accessDevice',null);
		}
		
		var proxy = item.getProxy();
		proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/auth/token';
		
		//To prevent global catch for the exception
		Ext.Ajax.suspendEvent('requestexception');
		
		item.save({
			callback: function(record, operation, success) {
				if(success) {
					if(record.get('mptsAp') == 'P' || record.get('mptsAp') =='R'){
						if (Ext.platformTags.classic) {
							Ext.toast({
								html: 'You don\'' + 't have authority to access the MPTS system.' ,
								closable: false,
								align: 't',
								slideInDuration: 300,
								minWidth: 400
							});	
						} else {
							Ext.toast({
								message: 'You don\'' + 't have authority to access the MPTS system.' ,
								closable: false,
								align: 't',
								timeout: 3000,
								minWidth: 400
							});	
						}
						
						return;
					}
					
					if(record.get('useYn') != 'Y'){
						if (Ext.platformTags.classic) {
							Ext.toast({
								html: 'Your account has been blocked or not usable, please contact your administrator.' ,
								closable: false,
								align: 't',
								slideInDuration: 300,
								minWidth: 400
							});
						} else {
							Ext.toast({
								message: 'Your account has been blocked or not usable, please contact your administrator.' ,
								closable: false,
								align: 't',
								timeout: 300,
								minWidth: 400
							});
						}
						
						return;
					}
					
					if(refs.language != null && refs.language !== 'undefined'){
						MOST.config.Locale.setLanguage(refs.language.getValue());
					}
					
					MOST.config.Token.setTokenType('Bearer');
					MOST.config.Token.setAccessToken(record.data.accessToken);
					MOST.config.Token.setExpiredCheck(record.data.expiredCheck);
					MOST.config.Token.setExpiresInSeconds(record.data.expiresInSeconds);
					MOST.config.Token.setIntervalTime(record.data.intervalTime);
					
					MOST.config.Token.setUserId(record.data.userId);
					MOST.config.Token.setPtnrCode(record.data.ptnrCode);
					MOST.config.Token.setUserLevel(record.data.userLevel);
					MOST.config.Token.setUserType(record.data.userType);
					MOST.config.Token.setBranchCode(branchCode);
					
					//added by Brian (2022/12/26) add token data for terminal
					MOST.config.Token.setTmnlCd(record.data.tmnlCd);
					MOST.config.Token.setTmnlTpCd(record.data.tmnlTpCd);
					MOST.config.Token.setTmnlNm(record.data.tmnlNm);
					MOST.config.Token.setPortCd(record.data.portCd);
					MOST.config.Token.setDatabaseType(record.data.databaseType);
					
					//added by Brian (for parameter configuration)
					MOST.config.Token.setInterfaceCustom(record.data.interfaceCustom);
					MOST.config.Token.setTmnlHoldChk(record.data.tmnlHoldChk);
					MOST.config.Token.setCustomHoldChk(record.data.customHoldChk);
					
					//added by Brian (for CargoType authority)
					MOST.config.Token.setCgTpAuth(record.data.cgTpAuth);

					
					//added by Brian (Keep Cache Data)
            		localStorage.setItem("id", MOST.config.Token.getUserId());
            		localStorage.setItem("password", refs.password.getValue());
            		localStorage.setItem("language",refs.language.getValue());
            		localStorage.setItem("branch", branchCode);
					localStorage.setItem("tmnlTpCd", record.data.tmnlTpCd);//Added: 2023/01/08
					localStorage.setItem("tmnlCd", record.data.tmnlCd);//Added: 2023/01/08
					localStorage.setItem("tmnlNm", record.data.tmnlNm);//Added: 2023/01/08
					localStorage.setItem("portCd", record.data.portCd);//Added: 2023/01/08
					localStorage.setItem("databaseType", record.data.databaseType);//Added: 2023/01/08
					
					if(record.data.expiredCheck === 'Y'){
						MOST.config.Token.tokenLifeCycleChecker();
					}
					
					//Add WorkDate and WorkShift:
					if (!Ext.platformTags.classic){
						MOST.config.Token.setWorkDate(workDate);
						MOST.config.Token.setWorkShift(workShift);
						MOST.config.Token.setWorkShiftDisplay(me.lookupReference('refCboShift').getSelection().get('codeDisplay'));
						MOST.config.Token.setWorkShiftDisplay(shiftDisplay);
					}
					
					if(win) {
						//Resume global catch for the exception
						Ext.Ajax.resumeEvent('requestexception');
						win.close();
					}
					
					me.fireEvent('globalDataLoad');
					
					if(me.getView()) me.getView().close();
					
				} else {
					// Tonny.Kim - token encoding (added by Brian , Branch Code)
					var token = Ext.util.Base64.encode(Ext.String.format('{0}:{1}:{2}:{3}', id, pwd.getValue(),'MOST'));
					var item = Ext.create('MOST.model.foundation.CredentialItem');
					var branchCode = CONSTANTS.DEFAULT_BRANCH; // avoid null branchCode when login HHT
					
					//Distinguish HHT or Web
					item.set('accessDevice',null);
//					branchCode = refs.branch.getValue(); 
	
					item.set('accessToken', token);
					item.set('branchCode', branchCode);
					item.set('isSso', false);
					item.set('accessType','LOGIN');
					item.set('userId',id);
					
					var proxy = item.getProxy();
					proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/auth/accessfail';
					
					item.save({
						callback: function(record, operation, success) {
							pwd.setValue("");
							
							Ext.toast({
								html: 'The ID or Password entered is incorrect! Please try again.',
								closable: false,
								align: 't',
								slideInDuration: 300,
								minWidth: 400
							});
						}
					})
				}
				//Resume global catch for the exception
				Ext.Ajax.resumeEvent('requestexception');
			}
		});
	},
	
	onFindPassword: function (){
		var me = this;
		var title = {type: 'bundle', key: 'recoverypasswordview'};
		var popupAlias = 'app-findpassword';
		
		me.openViewAliasDetailPopup(null, title, popupAlias);
	}
});