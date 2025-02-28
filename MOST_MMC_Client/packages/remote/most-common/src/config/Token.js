Ext.define('MOST.config.Token', {
	singleton: true,
	alternateClassName: 'Token',
	
	config: {
		tokenType: '',
		accessToken: '',
		activeCode: '',
		bussinessTel: '',
		userGroups: '',
		userId: '',
		userName: '',
		email: '',
		roleId: '',
		userType: '',
		telNo: '',
		mobileNo: '',
		ptnrCode: '',
		roleCode: '',
		userLevel: '',
		ptnrType : '',
		idNo:'',
		userTypeNm: '',
		agencyCode: '',
		deptCd: '',
		deptNm: '',
		addr: '',
		emailAddr: '',
		isSupervisor: '',
		ptnrNm: '',
		holdChk: '',
		accountHold: '',
		isMPTSBreakBulkBilling: '',
		isSystemAdmin: '',
		patnerInfos: null,
		accessButtonAuthority: null, // added by Brian (2019.10.31) To keep authority
		controlAuthorityItems : null,
		useAdminGroup: 'N',
		partnerList: null,
		partners: null,
		partnerCode: null,
		partnerType: null,
		staffCD : null,
		groupID : null,
		pgmCode : 'MT',
        parameterSettings:null,
        vesselCallId:'',
		branchCode:'', // added by Brian (2020/06/10) - To support multi DB,
		expiresInSeconds: '',
		expiredCheck: 'N', // added by Brian (2021/06/11) - To check for session expired
		intervalTime: '',
		interfaceCustom:'', // added by Brian (2022/05/24) - interface with ACCUS
		tmnlHoldChk:'', // added by Brian (2022/06/15) - apply terminal hold or not
		customHoldChk:'', // added by Brian (2022/06/15) - apply custom hold or not
		//Robert:
		workDate:'',
		workShift:'',
		workShiftDisplay:'',
		scn: '',
		vslCallId:'',
		tmnlCd:'',
		tmnlTpCd:'',
		tmnlNm:'',
		portCd:'',
		pgmId: '',
		databaseType:'', // added by Brian (2023/02/21, database Type) 
		dashboardinterval: 5
	},

	constructor: function(config) {
		this.initConfig(config);
		this.callParent(arguments);
	},

	//This function is checking Token is alive then apply token to the Cookies
	applyAccessToken: function(accessToken) {
		if (accessToken) {
			Ext.util.Cookies.set('mosttoken',accessToken);
		}
		
		return accessToken;
	},
	

	getStaffCd : function(viewId){
		var me = Token;
		var userId = me.getUserId();
		var pgmCode = me.getPgmCode();
		
		var length = userId.length;
		
		if(length<11){
			for(var i=length; i<11; i++){
				userId += ' ';
			}
		}
		
		//modifed by Brian (2022/12/20)
		var staffCd = userId + CommonConstants.SLASH + pgmCode + CommonConstants.SLASH + StringUtil.firstUpperCase(viewId);
		
		if(staffCd.length <=25){
			return staffCd;
		} else {
			return staffCd.substr(0,25);
		}
		
		return staffCd;
	},
	
	setProfile : function(data){
		MOST.config.Token.setUserName(data.user.userName);
		MOST.config.Token.setUseAdminGroup(data.useAdminGroup);
		MOST.config.Token.setUserLevel(data.user.userLevel);
		MOST.config.Token.setUserType(data.user.userType);
		MOST.config.Token.setGroupID(data.user.groupID);
		MOST.config.Token.setPartnerList(data.user.partnerList);
		MOST.config.Token.setPartners(data.user.partnerList);
		MOST.config.Token.setTelNo(data.user.telNo);
		MOST.config.Token.setBussinessTel(data.user.bussinessTel);

		// Control Authority
		if(data.authorityMap.controlAuthorityItems && data.authorityMap.controlAuthorityItems.collection){
			MOST.config.Token.setControlAuthorityItems(data.authorityMap.controlAuthorityItems.collection);
		}

		if(data.user.partnerList && data.user.partnerList.length > 0){
			data.user.partnerList = data.user.partnerList.reverse();
			
			MOST.config.Token.setPartnerType(data.user.partnerList[0].partnerType);
			MOST.config.Token.setPartnerCode(data.user.partnerList[0].partnerCode);
		}
		
		MOST.config.Token.setStaffCD(data.staffCD);
		MOST.config.Token.setPgmCode(data.pgmCode);
		MOST.config.Token.setEmail(data.user.email);
		MOST.config.Token.setParameterSettings(data.parameterSettingItems.collection);
	},

	tokenLifeCycleChecker: function(){
		var me = Token; 
		
// 		Modified by Brian (2024/05/31) move check session to click event.		
//		if(MOST.config.Token.getExpiredCheck() === "Y"){
//			me.tokenLifeCycleCheckTask.delay(me.getIntervalTime());
//			console.log('# excute delayed checker function with new token expires in seconds [tokenLifeCycleCheckTask.delay] : ' + me.getExpiresInSeconds());
//		}
		
		
	},

	tokenLifeCycleCheckTask: new Ext.util.DelayedTask( function() {
		var me = Token;
		
		var item = Ext.create('MOST.model.foundation.CredentialItem', {
			accessToken: me.getAccessToken(),
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
					MOST.config.Token.setAccessToken(record.data.accessToken);
					MOST.config.Token.setExpiredCheck(record.data.expiredCheck);
					MOST.config.Token.setExpiresInSeconds(record.data.expiresInSec);
					MOST.config.Token.setIntervalTime(record.data.intervalTime);
					MOST.config.Token.tokenLifeCycleChecker();
            	
            	} else {
            		var exceptionMessage = '', stackTrace = '', message = '';
					var response = operation.getError().response;
					var res = Ext.decode(response.responseText, true);
					if(res) {
						message = res.error.message;
						exceptionMessage = res.error.exceptionMessage == null ? '' : res.error.exceptionMessage;
						stackTrace = res.error.stackTrace == null ? '' : res.error.stackTrace;
					}
					
					MOST.config.Token.tokenLifeCycleCheckTask.cancel();
					if(CONSTANTS.AUTH_TYPE === 'AAD') {
						cookieToken = Ext.util.Cookies.set('mosttoken','');
						window.location.reload();
					} else {
						cookieToken = Ext.util.Cookies.set('mosttoken','');
						window.location.reload();
						//Ext.widget('app-lock');
						//Ext.widget('app-login');
					}
            	}
            }
		});
	})
});