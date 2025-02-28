Ext.define('MOST.controller.Main', {
	extend: 'Ext.app.Controller',

    requires: [
    	'TSB.locale.i18n.Bundle',
   		'MOST.store.Locale'
	],
	
	uses : [
//        'Ext.window.Toast',
//		  'Ext.Toast
	],

//	refs: [
//	       { ref: 'mainmenu', selector: 'app-mainmenu' },
//	       { ref: 'appMain', selector: 'app-main' }
//	],
	
	listen: {
		component: {
			'*': {
				toastMessage: 'onToastMessage',
				globalDataLoad: 'onGlobalDataLoad',
			}
		},
		controller: {
			'*': {
				toastMessage: 'onToastMessage',
				globalDataLoad: 'onGlobalDataLoad',
			}
		}
	},
	
	init: function() {
		var me = this;
		console.log('window.location.protocol = ' + window.location.protocol);
		console.log('window.location.hostname = ' + window.location.hostname);
		console.log('window.location.host = ' + window.location.host);
		console.log('window.location.origin = ' + window.location.origin);
		console.log('window.location.pathname = ' + window.location.pathname);

		//REST communication handling
        Ext.Ajax.on({
        	beforerequest: me.onAjaxBeforeRequest,
        	scope: me
        });
        Ext.Ajax.on({
        	requestcomplete: me.onAjaxRequestComplete,
        	scope: me
        });
        Ext.Ajax.on({
        	requestexception: me.onAjaxRequestException,
        	scope: me
        });
        
        //For Ext.direct
		Ext.REMOTING_API.url = MOST.config.Locale.getDirectApiDestUrl() + '/router';
		Ext.direct.Manager.addProvider(Ext.REMOTING_API);
		
		Ext.POLLING_MESSAGE_API.url = MOST.config.Locale.getDirectApiDestUrl() + '/poll/pollingHandler/getMessage/event1';
		Ext.direct.Manager.addProvider(Ext.POLLING_MESSAGE_API);
		Ext.direct.Manager.getProvider('messagePollProvider').disconnect();
		
		Ext.POLLING_SHARING_API.url = MOST.config.Locale.getDirectApiDestUrl() + '/poll/pollingHandler/shareMessage/event2';
		Ext.direct.Manager.addProvider(Ext.POLLING_SHARING_API);
		Ext.direct.Manager.getProvider('sharingPollProvider').disconnect();
		
		Ext.POLLING_OSPIF_API.url = MOST.config.Locale.getDirectApiDestUrl() + '/poll/pollingHandler/getOspInterfaceMessage/event3';
		Ext.direct.Manager.addProvider(Ext.POLLING_OSPIF_API);
		Ext.direct.Manager.getProvider('ospInterfacePollProvider').disconnect();
		
		Ext.direct.Manager.on({
			exception: me.onExtDirectException,
			scope: me
		});				
		
		//Set Title with Version
		Ext.getDoc().dom.title = 'MOST v' + Ext.manifest.version;
		//Ext.versions.ext.version : framework version

		if (Ext.platformTags.classic) {		
			Ext.Loader.loadScript({
				url: './resources/js/VTypes.js',
				scope: this,
				onLoad : function(){
	//				console.log('##### Load VType OK');;
				},
				onError : function(){
	//				console.log('##### Load VType Failed');;
				}
			});

			//Prefer localStorage due to size of data
		
			if (Ext.supports.LocalStorage) {
				Ext.state.Manager.setProvider(new Ext.state.LocalStorageProvider());
			} else {
				Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
			}
			
	
			Ext.EventManager.addListener(Ext.getBody(), 'keydown', function(e) {
				//prevent to goto prev page by backspace key
				if ((e.getTarget().type != 'text' && e.getTarget().type != 'search' && e.getTarget().type != 'password' && e.getTarget().type != 'textarea') && e.getKey() == '8') {
					e.preventDefault();
				}
				
				//prevent to goto prev page by ctrl/command + leftarrow key
				if(e.getKey() == '8' && e.ctrlKey) {
					e.preventDefault();
				}
				
//				if (e.altKey && e.getTarget().type != 'text' && e.getTarget().type != 'search' && e.getTarget().type != 'password' && e.getTarget().type != 'textarea') {
//					me.fireEvent('vesselExplorerKeyDown', e);
//				}
			});
		}
		
		//Stop spinner
		var initSpinner = document.getElementById('initSpinner');
		initSpinner.style.display = 'none';

		// Login to Microsoft Azure Active Directory
		var url = document.URL.split("?");
		var params = new Object();
    	if(url.length > 1) {
    		params = Ext.Object.fromQueryString(url[url.length - 1]);
    	}
    	
		if(CONSTANTS.AUTH_TYPE === 'AAD' && params.code) {
			me.onRequestAccessToken(params.code);
			window.history.pushState({}, document.title, window.location.origin + window.location.pathname);
			
		} else if(CONSTANTS.AUTH_TYPE === 'AAD' && params.error) {
			//Taost Error Message
			Ext.toast({
				html: 'Encountered authentication error with Azure Active Directory. <br> Please contact Administrator!',
				closable: false,
				align: 't',
				slideInDuration: 300,
				minWidth: 400
			});
			Ext.widget('app-aad');
			
		} else if(CONSTANTS.AUTH_TYPE === 'AAD' && !params.code) {
			Ext.widget('app-aad');
			
		} else if(CONSTANTS.AUTH_TYPE === 'JWT') {
			Ext.widget('app-login');
		} else {
			Ext.widget('app-login');
		}
		
//		this.control({
//			'app-oauth': {
//				destroy: this.onGlobalDataLoad
//			},
//			'app-login': {
//				destroy: this.onGlobalDataLoad
//			},
//			'app-azureOauth': {
//				destroy: this.onGlobalDataLoad
//			}
//		});
		
		//Instantiate the Global Store
		MOST.getApplication().mostMessage = Ext.create('MOST.store.Message');
		
		//VMS Global Store
		MOST.getApplication().routeStore = Ext.create('MOST.store.vms.Route');
		MOST.getApplication().areaStore = Ext.create('MOST.store.vms.Area');
		
//		this.loadNoLogin();
	},
	
	onToastMessage: function(message, title, type, modal, isNotLocale, appendMessage) {
		var icon;
		if(type === 'alert') {
			icon = 'x-fa fa-exclamation-circle';
		} else if(type === 'warn') {
			icon = 'x-fa fa-exclamation-triangle';
		}
		
		var toastMessage = isNotLocale ? message : MOST.getApplication().bundle.getMsg(message);
		if(appendMessage) {
			toastMessage += '<br>' + appendMessage;
		}
		
		if(modal) {
			Ext.MessageBox.show({
	            title: title,
	            msg: toastMessage,
	            buttons: Ext.MessageBox.OK,
	            scope: this,
	            icon: type === 'warn' ? Ext.MessageBox.WARNING : Ext.MessageBox.ERROR
	        });
		} else {
			Ext.toast({
				html: toastMessage,
				title: title,
				iconCls: icon,
				closable: true,
				align: 't',
				slideInDuration: 300,
				minWidth: 400,
//				hideDuration: 5000	//Do not set this value. it will impact closable
			});
		}
	},
	
	
//	loadNoLogin:function(){
//		var id = "MPTSADMIN";
//		var pwd = "success";
//		
////		var id = "MLESHASHIM";
////		var pwd = "success";
//		
//		var token = Ext.util.Base64.encode(id + ":" + pwd);
//		var item = Ext.create('MOST.model.foundation.CredentialItem', {
//			accessToken: token
//		});
//		
//		var proxy = item.getProxy();
//		var me = this;
//		proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/auth/token';
//
//		Ext.Ajax.suspendEvent('requestexception');
//		item.save({
//            callback: function(record, operation, success) {
//            	if(success) {
//            		MOST.config.Token.setTokenType('Bearer');
//					MOST.config.Token.setAccessToken(record.data.accessToken);
//					MOST.config.Token.setExpiresInSeconds(record.data.expiresInSec);
//					MOST.config.Token.tokenLifeCycleChecker();
//					
//            		MOST.config.Token.setUserId(record.data.userId);
//					MOST.config.Token.setPtnrCode(record.data.ptnrCode);
//					MOST.config.Token.setUserLevel(record.data.userLevel);
//					MOST.config.Token.setUserType(record.data.userType);
//					
//					//Resume global catch for the exception
//	            	Ext.Ajax.resumeEvent('requestexception');
//					me.onLoadLocale();
//            	}
//            }
//		});		
//	},
	
	onGlobalDataLoad : function() {
		var me = this;
		var localeStore = Ext.create('MOST.store.Locale');
		
		//TODO: Params should be configurable depending on accessed user info
		localeStore.load({
			params : {
				sysCd : 'MOST',
				cfgTp : 'LOCALE',
				cfgId : 'TSB',
				keyNm : ''
			},

			callback : function(records, operation,success) {
				if (success) {
					MOST.config.Locale.setLocale(this.findRecord('keyNm', 'locale').data.keyVal);
					MOST.config.Locale.setTheme(this.findRecord('keyNm', 'theme').data.keyVal);
					MOST.config.Locale.setRtl(this.findRecord('keyNm', 'rtl').data.keyVal === 'Y' ? true : false);
					MOST.config.Locale.setTimezone(this.findRecord('keyNm','time_zone').data.keyVal);
					MOST.config.Locale.setThousandSeparator(this.findRecord('keyNm','thousand_separator').data.keyVal);
					MOST.config.Locale.setDecimalSeparator(this.findRecord('keyNm',	'decimal_separator').data.keyVal);
					MOST.config.Locale.setCurrenyPrecision(parseInt(this.findRecord('keyNm','currency_precision').data.keyVal));
					MOST.config.Locale.setCurrencySign(this.findRecord('keyNm','currency_sign').data.keyVal);
					MOST.config.Locale.setStartDay(parseInt(this.findRecord('keyNm','start_day').data.keyVal));
					MOST.config.Locale.setCurrencyCode(this.findRecord('keyNm','currency_code').data.keyVal);
					MOST.config.Locale.setDefaultDateFormat(this.findRecord('keyNm','default_date_format').data.keyVal);

					Ext.util.Cookies.set('applanguage',MOST.config.Locale.getLocale(),null,'/',null, true);
					Ext.util.Cookies.set('apptheme',MOST.config.Locale.getTheme(),null,'/',null, true);
					Ext.util.Cookies.set('apprtl',MOST.config.Locale.getRtl(),null,'/',null, true);
					Ext.util.Cookies.set('appstartday',MOST.config.Locale.getStartDay(),null,'/',null, true);
					Ext.util.Cookies.set('appdefaultdateformat',MOST.config.Locale.getDefaultDateFormat(),null,'/',null, true);
					
					AuthComponentStore.getProxy().setUrl(MOST.config.Locale.getRestApiDestUrl() + '/v1/menu/authbutton');
					AuthComponentStore.load({
						params:{
							userId: MOST.config.Token.getUserId(),
							menuId: 'ALL'
						},
						callback:function(records,operation, success){
							if(success){
								//Stop spinner
								var initSpinner = document.getElementById('initSpinner');
								initSpinner.style.display = 'none';
								
								if (Ext.platformTags.classic) {
									Ext.widget('app-main'); 
								} else if (Ext.platformTags.modern) {
									Ext.Viewport.add(Ext.widget('app-main'));
								}					
							}
						}
					});
					
				}
			}
		});
	},
	
	onRequestAccessToken: function(authorizationCode){
		var me = this;
		
		var item = Ext.create('MOST.model.foundation.CredentialItem', {
			accessToken: authorizationCode,
			requestServerName: window.location.hostname
		});
		
		var proxy = item.getProxy();
		proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/oauth2/adal/token';
		
		//To prevent global catch for the exception
		Ext.Ajax.suspendEvent('requestexception');
		item.save({
			callback: function(record, operation, success) {
				if(success) {
					MOST.config.Token.setTokenType('Bearer');
					MOST.config.Token.setAccessToken(record.data.accessToken);
					MOST.config.Token.setExpiresInSeconds(record.data.expiresInSec);
					MOST.config.Token.tokenLifeCycleChecker();
					
					MOST.config.Token.setUserId(record.data.userId);
					MOST.config.Token.setPtnrCode(record.data.ptnrCode);
					MOST.config.Token.setUserLevel(record.data.userLevel);
					MOST.config.Token.setUserType(record.data.userType);
					
					setTimeout(function(){ 
						me.onGlobalDataLoad();
		        	}, 300);
				} else {
					var jsonString = Ext.decode(operation.error.response.responseText);
					if(jsonString.error.code === 412){
						var failMsg = jsonString.error.message;
						var msg = jsonString.error.exceptionMessage + ". " + "Please contact your administrator.";
						
						Ext.Msg.alert(failMsg, msg, function() {
							Ext.MessageBox.hide();
							location.href = "./";
						});
						
					} else if(jsonString.error.code === 500){
						var exceptionMessage = jsonString.error.exceptionMessage == null ? '' : jsonString.error.exceptionMessage;
						var stackTrace = jsonString.error.stackTrace == null ? '' : jsonString.error.stackTrace;
						
						Ext.widget('app-message', {
							status : jsonString.error.code,
							statusText : jsonString.error.message,
							message : jsonString.error.message,
							exceptionMessage : exceptionMessage,
							stackTrace : stackTrace
						});
						
					} else {
						Ext.toast({
							html: 'The ID or Password entered is incorrect! Please try again.',
							closable: false,
							align: 't',
							slideInDuration: 300,
							minWidth: 400
						});
					}
				}
				
				//Resume global catch for the exception
				Ext.Ajax.resumeEvent('requestexception');
			}		
		})
	},
	
	
    onAjaxBeforeRequest : function(conn, options, eOpts) {
		conn.cors = true;
		conn.withCredentials = true;
		conn.useDefaultXhrHeader = false;
	
		var title = 'Server Processing Messagebox';
		var msg = 'progressing...';
		if (TSB.locale.i18n.Bundle.instance) {
			title = TSB.locale.i18n.Bundle.instance.getMsg('mosttitle');
			msg = TSB.locale.i18n.Bundle.instance.getMsg('progressing');
		}
        if (
        		options.operation.getScope() && options.operation.getScope().config.proxy 
        		&& (
        		    options.operation.getScope().config.proxy.url
        		    &&
        			(    options.operation.getScope().config.proxy.url.toString().includes('/preview')
    					|| options.operation.getScope().config.proxy.url.toString().includes('/exportexcel')
    					|| options.operation.getScope().config.proxy.url.toString().includes('/exportpdf')
    					|| options.operation.getScope().config.proxy.url.toString().includes('/vesselschedule/export')
    					|| options.operation.getScope().config.proxy.url.toString().includes('/generatepdf')
    					|| (
    							options.operation.getScope().config.proxy.url.toString().includes('/export')
    							&&
    							options.operation.getScope().config.proxy.url.toString().includes('/list')
    						)
        			)
        		   )
        ) {
			Ext.MessageBox.show({
				title : title, //Do not change the title
				msg: msg,
				width:320,
				height:0,
				wait:true,
				waitConfig: {interval:200, text:''}
			});
        } else {
        
	        try{
	        	//Show loading message box in case of Grid data loading only ...
	            if (options.operation.getScope().resolveListenerScope().getView().xtype && options.operation.getScope().storeId) {
	            	var alias = options.operation.getScope().resolveListenerScope().getView().xtype;
	            	var storeId = options.operation.getScope().storeId;
	            	if (Ext.ComponentQuery.query('[xtype="' + alias + '"] grid')[0].getStore().storeId === storeId && options.operation.getScope().isLoading() === true) {
						if((MOST.getApplication().isBizServiceStart && options.proxy.showProgressBar !== false) || MOST.getApplication().forcedBlocking === true){
							Ext.MessageBox.show({
							   title : title, 
							   msg: msg,
							   width:320,
							   height:0,
							   wait:true,
							   waitConfig: {interval:200, text:''}
							});
						}                    
	                }
	            }
	        }catch(error){
	            //N/A       
	        }
        }
        
		conn.setDefaultXhrHeader({
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type,X-Requested-With,accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization'
		});
		
		conn.setDefaultHeaders({
			'Authorization': MOST.config.Token.getTokenType() + ' ' + MOST.config.Token.getAccessToken()+ ' ' + MOST.config.Token.getBranchCode()
		});
	},
	
	// This is for capturing event for all client-server communication
	onAjaxRequestComplete: function(conn, response, options, eOpts) {
		var title = 'Server Processing Messagebox';
		if (TSB.locale.i18n.Bundle.instance) {
			title = TSB.locale.i18n.Bundle.instance.getMsg('mosttitle');
		}
		
		if (Ext.ComponentQuery.query('[title=' + title + ']').length > 0) {
			Ext.ComponentQuery.query('[title=' + title + ']')[0].hide();
		}
		
		//added by Brian (2020/07/07)
//		if((MOST.getApplication().isBizServiceStart && options.proxy.showProgressBar !== false) && MOST.getApplication().forcedBlocking === false){
//				Ext.MessageBox.hide();
//		}
//		Ext.toast({
//		 	html: 'Transaction is completed successfully!',
//		 	closable: false,
//		 	align: 'tr',
//		 	slideInDuration: 300,
//		 	minWidth: 400
//		});
	},
	
	// This is for capturing Exception for all client-server communication
	onAjaxRequestException: function(conn, response, options) {
		//added by Brian (2020/07/07)
		if(MOST.getApplication().isBizServiceStart && options.proxy.showProgressBar !== false){
			Ext.MessageBox.hide();
		}
		
		if (response.status === 401 || response.status === 402  || response.status === 403 
				|| response.status === 400 || response.status === 404
				|| response.status === 406 || response.status === 409
				|| response.status === 422 || response.status === 409) {
			
			if(response.status === 401) { //unauthenticated Brian (2021/06/10)
				
	            if (Ext.platformTags.classic) {
					Ext.toast({
					 	html: response.statusText + '<br>' + response.responseText,
					 	closable: false,
					 	align: 't',
					 	slideInDuration: 300,
					 	minWidth: 400
					});	
	            } else {
					var toastMsg = Ext.toast({
						message: response.statusText + '<br>' + response.responseText,
						closable: true,
						align: 't',
						//slideInDuration: 300,
						timeout: 3000,
						minWidth: 400,
					});            	
	            }					
				
				MOST.config.Token.tokenLifeCycleCheckTask.cancel();
				cookieToken = Ext.util.Cookies.set('mosttoken','');
				
				if(CONSTANTS.AUTH_TYPE === 'AAD') {
//					window.location = window.location.pathname;
					window.location.reload();
				} else {
					window.location.reload();
					//Ext.widget('app-lock');
				}
				
			} else {
				var res = Ext.decode(response.responseText, true);
				if(res) {
		            if (Ext.platformTags.classic) {
						Ext.toast({
					 		html: res.error.code + '<br>' + res.error.exceptionMessage,
							closable: false,
							align: 't',
							slideInDuration: 300,
							minWidth: 400
						});
		            } else {
						var toastMsg = Ext.toast({
							message: res.error.code + '<br>' + res.error.exceptionMessage,
							closable: true,
							align: 't',
							//slideInDuration: 300,
							timeout: 3000,
							minWidth: 400,
						});            	
		            }						

				} else {
		            if (Ext.platformTags.classic) {
						Ext.toast({
					 		html: response.statusText + '<br>' + response.responseText,
							closable: false,
							align: 't',
							slideInDuration: 300,
							minWidth: 400
						});
		            } else {
						var toastMsg = Ext.toast({
							message: response.statusText + '<br>' + response.responseText,
							closable: true,
							align: 't',
							//slideInDuration: 300,
							timeout: 3000,
							minWidth: 400,
						});            	
		            }							
				}
			}
		} else if (response.status === 500) {
			
			var res = Ext.decode(response.responseText, true);
			if(res) {
				var exceptionCode = res.error.code;
				//var message = res.error.message;
				var message = res.error.errorMessage;
				var exceptionMessage = res.error.exceptionMessage == null ? '' : res.error.exceptionMessage;
				var stackTrace = res.error.stackTrace == null ? '' : res.error.stackTrace;
				
				//session time out (added by Brian -2021019) -401
				if(exceptionCode === 401) {
					Ext.toast({
					 	html: exceptionCode + '<br>' + message,
					 	closable: false,
					 	align: 't',
					 	slideInDuration: 300,
					 	minWidth: 400
					});	
					
//					//session time out (added by Brian -2021019)
//					var delayLogOut =  new Ext.util.DelayedTask(function(){
//						cookieToken = Ext.util.Cookies.set('mosttoken','');
//						window.location.reload();
//					});
//					
//					delayLogOut.delay(500);
				}else if(exceptionCode === 402) {
					Ext.toast({
					 	html: exceptionCode + '<br>' + message,
					 	closable: false,
					 	align: 't',
					 	slideInDuration: 300,
					 	minWidth: 400
					});	
					
					//session time out (added by Brian -2021019)
					var delayLogOut =  new Ext.util.DelayedTask(function(){
						cookieToken = Ext.util.Cookies.set('mosttoken','');
						window.location.reload();
					});
					
					delayLogOut.delay(500);
				}else if(exceptionCode === 412) { //added by Brian (2022/12/12) User Id can't find
					if(message === 'com.tsb.most.framework.exception.BizException occur!!: CM_0039\nnull'){
						MessageUtil.error('fail_msg', 'CM_0013');
					}
					else {
						Ext.toast({
						 	html: response.statusText + '<br>' + response.responseText,
						 	closable: false,
						 	align: 't',
						 	slideInDuration: 300,
						 	minWidth: 400
						});	
					}
					
				}else if(exceptionCode === 500) {
					Ext.widget('app-message', {
						status : exceptionCode,
						statusText : message,
						message : message,
						exceptionMessage : exceptionMessage,
						stackTrace : stackTrace
					});
				} else if(exceptionCode === 600) { //added by Brian (2021/03/24) optimistic Lock
					Ext.widget('app-message', {
						status : exceptionCode,
						statusText : message,
						message : message,
						exceptionMessage : exceptionMessage,
						stackTrace : stackTrace
					});
					
					//MessageUtil.error('fail_msg', message);
				} else {
					
		            if (Ext.platformTags.classic) {
						Ext.toast({
						 	html: exceptionCode + ': ' + message,
						 	closable: false,
						 	align: 't',
						 	slideInDuration: 300,
						 	minWidth: 400
						});	
		            } else {
						var toastMsg = Ext.toast({
							message: exceptionCode + ': ' + message,
							closable: true,
							align: 't',
							//slideInDuration: 300,
							timeout: 3000,
							minWidth: 400,
						});            	
		            }						
					
				}
			} else {
	            if (Ext.platformTags.classic) {
					Ext.toast({
					 	html: response.statusText + '<br>' + response.responseText,
					 	closable: false,
					 	align: 't',
					 	slideInDuration: 300,
					 	minWidth: 400
					});	
	            } else {
					var toastMsg = Ext.toast({
						message: response.statusText + '<br>' + response.responseText,
						closable: true,
						align: 't',
						//slideInDuration: 300,
						timeout: 3000,
						minWidth: 400,
					});            	
	            }				
			}
		} else if(response.status === 0) {
			//Server is not available
			var errorMessage;
			if(response.statusText) {
				//Connection Timeout
				errorMessage = response.statusText;
				if(response.timedout) {
					errorMessage += ' : Time Out';
				}
			} else {
				//Server is not available
				errorMessage = 'Internet Connection Error: communication failure : ERR_CONNECTION_REFUSED';
			}
			
            if (Ext.platformTags.classic) {
				Ext.toast({
					html: errorMessage,
					closable: false,
					align: 't',
					slideInDuration: 300,
					minWidth: 400
				});
            } else {
				var toastMsg = Ext.toast({
					message: errorMessage,
					closable: true,
					align: 't',
					//slideInDuration: 300,
					timeout: 3000,
					minWidth: 400,
				});            	
            }
			
//			MOST.config.Token.tokenLifeCycleCheckTask.cancel();
//			if(CONSTANTS.AUTH_TYPE === 'AAD') {
//				window.location = window.location.pathname;
//				window.location.reload();
//			} else {
//				Ext.widget('app-lock');
//			}
			
		} else if(response.status === -1) {
			
            if (Ext.platformTags.classic) {
    			Ext.toast({
    			 	html: response.statusText,
    			 	closable: false,
    			 	align: 't',
    			 	slideInDuration: 300,
    			 	minWidth: 400
    			});	
            } else {
				var toastMsg = Ext.toast({
					message: response.statusText,
					closable: true,
					align: 't',
					//slideInDuration: 300,
					timeout: 3000,
					minWidth: 400,
				});            	
            }			
			
		} else {
			//Unknown Exception
			
            if (Ext.platformTags.classic) {
    			Ext.toast({
    			 	html: '500: There is internal server error. Please try again later or contact Administrator',
    			 	closable: false,
    			 	align: 't',
    			 	slideInDuration: 300,
    			 	minWidth: 400
    			});
            } else {
				var toastMsg = Ext.toast({
					message: '500: There is internal server error. Please try again later or contact Administrator',
					closable: true,
					align: 't',
					//slideInDuration: 300,
					timeout: 3000,
					minWidth: 400,
				});            	
            }					
		}

	},
	
	onExtDirectException: function(e) { 
		Ext.toast({
//		 	html: 'Internet disconnection happened. Please try again later or contact Administrator',
		 	html: 'Internal server error caused. Please try again later or contact Administrator',
		 	closable: false,
		 	align: 't',
		 	slideInDuration: 300,
		 	minWidth: 400
		});
//		Ext.toast({
//			html: e.message,
//			closable: false,
//			align: 't',
//			slideInDuration: 300,
//			minWidth: 400
//		});
  	}
});