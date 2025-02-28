Ext.define('MOST.view.main.MainController', {
	/**
     * @memberOf TSB
     */
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    requires: [
    ],

//    FIRST_LOAD_VIEW_NAME : 'app-goodsreceipt',
//    FIRST_LOAD_VIEW_NAME : 'app-invoiceadvice',
//    FIRST_LOAD_VIEW_NAME : 'app-vesselscheduleexternal',
    FIRST_LOAD_VIEW_NAME : 'app-gateincargo',

    listen: {
		component: {
			'*': {
				updateVesselSchedule: 'onUpdateVesselSchedule'
			}
		},

		controller: {
			'*': {
				createTab: 'createTab',
				closeTab: 'closeTab',
				menuClick: 'onMenuClick',
				closeAllTab: 'onCloseAllTab',
				updateVesselSchedule: 'onUpdateVesselSchedule'
			}
		},

	},

    refs    : [
               { ref: 'appPanel', selector: 'panel[xtype^=app-]' }
    ],

	lastView: null,
	intervalDuration: 120000,

	onUpdateVesselSchedule: function() {
	},

	onUrlTest: function() {
		var me = this;

		console.log('window.location.origin = ' + window.location.origin);
		console.log('window.location.pathname = ' + window.location.pathname);

		window.history.pushState({}, document.title, window.location.origin + window.location.pathname);
	},

	init: function() {
		var me = this;
		var refs = me.getReferences();

		//TODO: Decide Turn on/off in initial
		//Message Polling Start
    	var provider = Ext.direct.Manager.getProvider('messagePollProvider');
    	if (!provider.isConnected()) {
			provider.setConfig({
				baseParams: {
					userId: MOST.config.Token.getUserId()
				}
			});
//			provider.addListener('data', me.onPollingData, me);
//			provider.connect();
		}

    	//Commented due to Azure always has parameters
    	//To read URL parameter directly to apply business
//    	var url = document.URL.split("?");
//    	if(url.length > 1) {
//    		var params = Ext.Object.fromQueryString(url[url.length - 1]);
//    		me.fireEvent('directWorkspaceConfiguration', params);
//    	}

    	/**
    	 * Customer Setting
    	 */
    	var imgLogo = new Image();
    	var logoWidth, logoHeight;
    	
    	imgLogo.src = 'resources/images/background/company_logo.png';
		logoWidth = 140;
		logoHeight = 32;

    	refs.refCustomerLogo.setSrc(imgLogo.src);
    	refs.refCustomerLogo.setWidth(logoWidth);
    	refs.refCustomerLogo.setHeight(logoHeight);
	},

	onLoad: function() {
		var me = this;
		var refs = me.getReferences();
		var menuList = me.getStore('menuList');
		var userRoleMenu = me.getStore('roleMenuList');
		var favouriteMenuStore = me.getStore('favouriteMenu');
		var searchMenuStore = me.getStore('searchMenu');
		
		//added by Brian (2021/04/01)
		var gridColumnStore = me.getStore('gridColumn');
		var projectGridColumnStore = me.getStore('projectGridColumn');
		var localCacheInfoStore = me.getStore('cacheServiceInfo');
		
		var branch = localStorage.getItem("branch"); 
		
		if(StringUtil.isNullorEmpty(branch) == false){
			me.lookupReference('branch').setValue(branch);
		}
		
		gridColumnStore.load();
		projectGridColumnStore.load();
		searchMenuStore.load();
		
		GridUtil.gridColumeStore = gridColumnStore;
		GridUtil.projectGridColumnStore = projectGridColumnStore;
		
		LocalCacheServiceUtil.setLocalCacheStore(localCacheInfoStore);
		
		localCacheInfoStore.load({
			callback:function(records,operation, success){
				favouriteMenuStore.load({
					params:{
						userId: MOST.config.Token.getUserId(),
						systemCode: CONSTANTS.SYSTEM_CODE
					},
					callback:function(records,operation, success){
						userRoleMenu.load({
							params:{
								ptnrCd: MOST.config.Token.getPtnrCode(),
								userId: MOST.config.Token.getUserId(),
								systemCode: CONSTANTS.SYSTEM_CODE
							},
							callback:function(records,operation, success){
								menuList.load({
									callback:function(records,operation, success){
										if(me.FIRST_LOAD_VIEW_NAME){
											me.onLoadView(me.FIRST_LOAD_VIEW_NAME);
										}
										
										me.onMenuGeneration();
										me.onProfileLoad();
									}
								})
							}
						});
					}
				});
			}
		});
	},

	onMenuGeneration: function() {
		var me = this;
		var refs = me.getReferences();
		var menuList = me.getStore('menuList');
		var userRoleMenu = me.getStore('roleMenuList');
		var favouriteMenuStore = me.getStore('favouriteMenu');

		refs.refmenu.add({
			xtype: 'tsb-treemenu',
			reference: 'refTreeMenu',
        	store: menuList,
        	favouriteMenuStore: favouriteMenuStore,
        	roleMenuStore: userRoleMenu,
        	viewScope : me
		})
	},

    onTabChange : function(tabPanel, newItem) {
    	var me = this;
    	var refs = me.getReferences();
    	
    	//Handle Favorite
    	if(newItem.record) {
			var store = me.getStore('favouriteMenu');
			var isFavorite = false, favIndex;
			for (var i = 0; i < store.data.length; i++) {
				if (store.data.items[i].data.screenPathAddress === newItem.record.data.screenPathAddress){

					isFavorite = true;
					favIndex = i;
					break;
				}
			}

			refs.refFavoriteMenu.setDisabled(false);

			if(isFavorite) {
				refs.refFavoriteMenu.setIconCls('x-fa fa-star txt_yellow');
			} else {
				refs.refFavoriteMenu.setIconCls('x-fa fa-star-o');
			}
			
			me.updateAccessButtonAuthority(newItem.record);
    	} else {
    		refs.refFavoriteMenu.setDisabled(true);
    	}

    },
    
	updateAccessButtonAuthority: function(record){
		var me = this;
		var me = this;
		var refs = me.getReferences();
		var authButton = me.getStore('authButton');

        if(record.data.openType != '0') {
    		if (record.data.menuScreenName && record.data.menuTypeCode != 'FOLDER') {
    			// To get Button Authority (2019.10.31)
        		authButton.load({
					params:{
						userId: MOST.config.Token.getUserId(),
						menuId: record.data.menuId
					},
					callback:function(records,operation, success){
						if(success){
							if(record.data.popupYn !== 'Y') { //Tab
								
								//set Button Authority (2019.10.31)
								if(records[0] != null && records[0] != undefined ){
									MOST.config.Token.setAccessButtonAuthority(records[0].data);
								}
							}
						}
					}
				});
			}
		}			
	},

    onChangeTerminal: function() {
		var me = this;
		var refs = me.getReferences();
		var branch = localStorage.getItem("branch");
		
		if(me.lookupReference('branch').getValue() !== branch){
			me.changeTerminal();
		}
		
    },
    
    showTab : function(id, subid) {
    	var tabPanel = this.lookupReference('ref-maintab');
        var child, childTabPanel;

        if (!id) {
            //no id was specified, use 0 index to resolve child
            id = 0;
        }
        
        
        child = Ext.getCmp(id);
        if(child)
        	childTabPanel = child.child('tabpanel');

        if(tabPanel){
        	tabPanel.setActiveTab(child);

	        if (childTabPanel) {
	            if (!subid) {
	                subid = 0;
	            }

	            childTabPanel.setActiveTab(subid);
	        }
        }
    },

    createTab: function(prefix, rec, cfg, isConfigChanged) {
    	var me = this;
    	var tabCount = me.getViewModel().get('tabCount');
        var tabs = me.lookupReference('ref-maintab');
        var id = prefix + '_' + rec.data.menuId;
        var tab = tabs.items.getByKey(id);

        if (!tab) {
            cfg.title = rec.data.menuScreenName;
            cfg.itemId = id;
            cfg.closable = true;
            cfg.iconCls = rec.data.screenIconDefineCode;
            cfg.scrollable = true;
            cfg.record = rec;

            // KHH - 2019.01.12
            if(isConfigChanged){
            	if(rec.recvData){
					cfg.recvData = rec.recvData;
				}
            }


            tab = tabs.add(cfg);

            me.getViewModel().set('tabCount', ++tabCount);
        } else {
        	if(isConfigChanged) {
        		// KHH - 2019.01.14
        		if(rec.recvData){
        			cfg.recvData = rec.recvData;
                }

        		tab.setConfig(cfg);
        		tab.fireEvent('afterrender'); // KHH - 2019.01.14
        	}
        }

        tabs.setActiveTab(tab);
    },

    closeTab: function(id) {
    	var me = this;
    	var tabs = me.lookupReference('ref-maintab');
    	var tab = tabs.items.getByKey(id);
    	
    	if (tab) {
    		tab.destroy();
    	}
    },

	onProfileLoad: function(){
		var me = this;
		var profileStore = me.getStore('profileStore');
	
		profileStore.load({
			callback: function(records, operation, success) {
				if (success) {
		        	if (records[0].data.imageUrl && records[0].data.imageUrl !== "") {
		        		me.getViewModel().set('profileImageUrl', records[0].data.imageUrl);
		        	}
		        	me.getViewModel().set('profileName', records[0].data.userName);
		        	me.getViewModel().set('profileEmail', records[0].data.email);
		        	
            		MOST.config.Token.setUserId(records[0].data.userId);
            		MOST.config.Token.setUserName(records[0].data.userName);
					MOST.config.Token.setPtnrCode(records[0].data.ptnrCode);
					MOST.config.Token.setUserLevel(records[0].data.userLevel);
					MOST.config.Token.setUserType(records[0].data.userType);
					MOST.config.Token.setUserTypeNm(records[0].data.userTypeNm);
					MOST.config.Token.setAgencyCode(records[0].data.agencyCode);
					MOST.config.Token.setDeptCd(records[0].data.deptCd);
					MOST.config.Token.setDeptNm(records[0].data.deptNm);
					MOST.config.Token.setAddr(records[0].data.addr);
					MOST.config.Token.setEmailAddr(records[0].data.emailAddr);
					MOST.config.Token.setIsSupervisor(records[0].data.isSupervisor);
					MOST.config.Token.setPtnrNm(records[0].data.ptnrNm);
					MOST.config.Token.setHoldChk(records[0].data.holdChk);
					MOST.config.Token.setAccountHold(records[0].data.accountHold);
					MOST.config.Token.setIsMPTSBreakBulkBilling(records[0].data.isMPTSBreakBulkBilling);
					MOST.config.Token.setIsSystemAdmin(records[0].data.isSystemAdmin);
					MOST.config.Token.setPatnerInfos(records[0].data.patnerInfos);

					// if (records[0].data.userType === 'I') {
					// 	me.onLoadView('app-vesselscheduleinternal');
					// } else {
					// 	me.onLoadView('app-vesselscheduleinternal');
					// }

					//if(me.FIRST_LOAD_VIEW_NAME){
					//	me.onLoadView(me.FIRST_LOAD_VIEW_NAME);
					//}

					//added by Brian - To avoid progress bar during initialization (2020.07.07)
					MOST.getApplication().isBizServiceStart = true;
					MOST.getApplication().forcedBlocking = false;
		        }
			}
		});

	},

	onCloseAllTab: function () {
		var me = this;
		var centertab = me.lookupReference('ref-maintab');
		var menuscreen = centertab.items.items;
		var ln = menuscreen.length;

		if (menuscreen){
			for (i = ln - 1; i > -1; i--) {
				var screen = menuscreen[i];
				if ((screen.title.toString() != 'Workspace') && (screen.title.toString() != 'Dashboard') && (screen.title.toString() != 'Inbox')) {
					screen.close();
				}
			}
		}
		me.getViewModel().set('tabCount', 0);
	},

    hideMenu: function() {
    	var me = this;
    	var refs = me.getReferences();

        refs.refmenu.setCollapsed(true);
    },
    
	onMenuClick: function (record, isConfigChanged) {
		var me = this;
		var refs = me.getReferences();
		var authButton = me.getStore('authButton');
		
        if(record.data.openType != '0') {
        	var serviceLaneCode = me.getViewModel().get("serviceLaneCode");
    		var vesselScheduleId = me.getViewModel().get("vesselScheduleId");
    		var portCode = me.getViewModel().get("portCode");
    		var vesselId = me.getViewModel().get("vesselId");
    		var vesselName = me.getViewModel().get("vesselName");
    		var imoNo = me.getViewModel().get("imoNo");
    		var voyageNo = me.getViewModel().get("voyageNo");
    		var ascId = me.getViewModel().get("ascId");
    		var tag = me.getViewModel().get("tag");
    		var origin = me.getViewModel().get("origin") || 'DRAFT';

    		if (record.data.menuScreenName && record.data.menuTypeCode != 'FOLDER') {
    			// To get Button Authority (2019.10.31) Modifeid by Brian            		
        		authButton.load({
    			params:{
    				userId: MOST.config.Token.getUserId(),
    				menuId: record.data.menuId
    			},
        		callback:function(records,operation, success){
        				if(success){
        					if(record.data.popupYn !== 'Y') { //Tab
        						//set Button Authority (2019.10.31)
        						if(records[0] !== undefined){
        							MOST.config.Token.setAccessButtonAuthority(records[0].data);
        						}
        						
        							
        						me.createTab('menu', record, {
                					xtype: record.data.screenPathAddress,
                					cfgOrigin: origin,
                					cfgServiceLaneCode: serviceLaneCode,
                					cfgVesselScheduleId: vesselScheduleId,
                					cfgPortCode: portCode,
                					cfgVesselId: vesselId,
                					cfgVesselName: vesselName,
                					cfgImoNo: imoNo,
                					cfgVoyageNo: voyageNo,
                					cfgAscId: ascId,
                					cfgTag: tag
                				}, isConfigChanged);
                				
                			} else if(record.data.popupYn === 'Y') { //Modal
                				Ext.widget(record.data.screenPathAddress, {
                					cfgOrigin: origin,
                					cfgServiceLaneCode: serviceLaneCode,
                					cfgVesselScheduleId: vesselScheduleId,
                					cfgPortCode: portCode,
                					cfgVesselId: vesselId,
                					cfgVesselName: vesselName,
                					cfgImoNo: imoNo,
                					cfgVoyageNo: voyageNo,
                					cfgAscId: ascId,
                					cfgTag: tag
                				});
                				
                			}
        					
        					if (me.getReferences().refmenu.floated) {
        						me.getReferences().refmenu.floatCollapsedPanel()
        					}
        					
        				}
        				//me.hideMenu();
        			}
    			});
    		
    		}
        }
    },

    onShowUserInfo: function() {
    	var me = this;
    	var profileStore = me.getStore('profileStore');

    	var rec = {
			data: {
				menuId: 'UserInfo' + 'app-userinfo',
				menuScreenName: 'User Info',
				screenIconDefineCode: 'x-fa fa-users',
				screenPathAddress: 'app-userinfo'
			}
    	};

    	me.createTab('menu', rec,{
    		xtype: rec.data.screenPathAddress
    	});

    	me.onUserInfoLoad();

    },
    
    onShowSetVessels: function() {
    	var me = this;
    	
    	var rec = {
			data: {
				menuId: 'app-settingvessels',
				menuScreenName: 'Setting Configuration',
				screenIconDefineCode: 'fa fa-ship',
				screenPathAddress: 'app-settingvessels'
			}
    	};
    	
    	me.createTab('menu', rec,{
    		xtype: rec.data.screenPathAddress
    	});
    	
    	me.onShowVesselInfo();
    },
    
    onShowVesselInfo:function(){
    	var me = this;
    	var refs = me.getReferences();
    	
    	refs.refVesselCallIdField.setValue(MOST.config.Token.getVesselCallId());
    	refs.refDashboardIntervalField.setValue(MOST.config.Token.getDashboardinterval());
    },
    
    onSetVesselBtnClick: function(){
    	var me = this;
    	var refs = me.getReferences();
    	
    	if(refs.refDashboardIntervalField.activeErrors){
    		MessageUtil.warning('Validation', refs.refDashboardIntervalField.activeErrors[0]);
    	}else{
    		MOST.config.Token.setVesselCallId(refs.refVesselCallIdField.getValue());
    		MOST.config.Token.setDashboardinterval(refs.refDashboardIntervalField.getValue());
    		MessageUtil.saveSuccess();
    	}
    	
    },
    onClearVesselBtnClick: function(){
    	var me = this;
    	var refs = me.getReferences();
    	
    	MOST.config.Token.setVslCallId('');
    	refs.refVesselCallIdField.setValue('');
    	MessageUtil.saveSuccess();
    },

	onFavoriteClick: function(btn) {
    	var me = this;
    	var refs = me.getReferences();
    	var tabs = me.lookupReference('ref-maintab');
        var activeTab = tabs.getActiveTab();
    	var rec = activeTab.record;
    	var menuStore = me.getStore('menuList');
    	var favouriteMenuStore = me.getStore('favouriteMenu');
    	var isFavorite = false, favIndex;
    	var treeMenu = refs.refTreeMenu;
    	var root = treeMenu.treeStore.getRoot();

    	for (var i = 0; i < favouriteMenuStore.data.length; i++) {
			if (favouriteMenuStore.data.items[i].data.menuId === rec.data.menuId){
				isFavorite = true;
				favIndex = i;
				break;
			}
		}

    	if(isFavorite) {
    		//Remove
    		favouriteMenuStore.removeAt(favIndex);

    		var favouriteNode = root.findChild('menuId', 'FAVOURITES');
    		//var parentNode = root.findChild('menuId', rec.data.uprMenuId);
    		var childNode = favouriteNode.findChild('menuId', rec.data.menuId);

    		favouriteNode.removeChild(childNode);

    	} else {
    		var menuRecord = Ext.create('MOST.model.administrator.AuthMenuItem', {
    			systemCode: rec.data.systemCode,
    			menuId: rec.data.menuId,
    			screenPathAddress: rec.data.screenPathAddress
    		});
    		favouriteMenuStore.insert(favIndex,menuRecord);
    		var node = root.findChild('menuId', 'FAVOURITES');

    		node.appendChild({
    			text: rec.data.menuScreenName,
    			iconCls: rec.data.screenIconDefineCode,
    			menuId: rec.data.menuId,
				parent: rec.data.menuId,
    			//rowCls: 'nav-tree-badge nav-tree-badge-new', //Can add Badge
    			viewType: rec.data.upperMenuId,
    			rec: rec,
    			leaf: true
    		});
    	}

    	//menuStore.fireEvent('load');

    	favouriteMenuStore.sync({
		    success: function(batch) {
				Ext.toast({
				 	html: MOST.getApplication().bundle.getMsg('successsave_msg',''),
				 	closable: false,
				 	align: 'tr',
				 	slideInDuration: 300,
				 	minWidth: 400
				});

				if(isFavorite) {
					refs.refFavoriteMenu.setIconCls('x-fa fa-star-o');
	        	} else {
	        		refs.refFavoriteMenu.setIconCls('x-fa fa-star txt_yellow');
	        	}
		    },
		    failure: function(batch) {
				Ext.toast({
				 	html: MOST.getApplication().bundle.getMsg('fail_msg',''),
				 	closable: false,
				 	align: 'tr',
				 	slideInDuration: 300,
				 	minWidth: 400
				});
		    }
		});
    },

    onChangePassword: function(){
		var me = this;
		var refs = me.getReferences();
		var win = refs.refChangePassword;
		if (!win) {
   			win = Ext.create('Ext.window.Window', {
	        	reference: 'refChangePassword',
	        	title : 'Change Password',
	        	layout: 'fit',
	        	width: 400,
	            height: 200,
	            resizable: true,
	            resizeHandles: 'all',
	            closeAction: 'destroy',
	            constrain: true,
	            maximizable : true,
	            scrollable: true,
	            iconCls: 'x-fa fa-user',
	            items: [{
	            	xtype: 'app-changepassword',
	            	layout: 'fit'
	            }],
	            tools : [{
	            	xtype: 'button',
	            	iconCls: 'x-fa fa-save',
	            	text: 'Save',
	            	listeners: {
	 	            	click: function() {
	 						me.onSavePassword();
	 					}
	 	            }
	            }]
			});
   		me.getView().add(win);
       	}
       	win.show();
       	win.toFront();
	},

	onSavePassword: function(){
		var me = this;
		var refs = me.getReferences();
		var pwdStore = me.getStore('changePwd');
		var checkOldPasswordStore = me.getStore('checkOldPassword');
		// var model = new MOST.model.authority.User();
		var view = refs.refChangePassword;
		var form = view.down('form').getForm();
		var password = form.getValues().txtPassword;
		var oldPassword = form.getValues().txtOldPassword;
		var userId = MOST.config.Token.getUserId();
		checkOldPasswordStore.load({
			params: {
				userId: MOST.config.Token.getUserId(),
			},
			callback: function (records, operation, success) {
				if (success && records[0].data.password == oldPassword) {
					if (refs.refRetypePassword.getValue() == password) {
						var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
						updateParm.phantom = false;
						updateParm.set('workingStatus',WorkingStatus.UPDATE);
						updateParm.getProxy().url = pwdStore.getProxy().url;
						updateParm.set('password',password);
						updateParm.set('userId', userId);
						
						updateParm.save({
							success: function(record) {
								view.close();
								MessageUtil.saveSuccess(); // Success Message
							}
						});
					} else {
						MessageUtil.warning("warning", "Password is not matched!");
						return null;
					}
				}
				else {
					MessageUtil.warning("warning", "Old Password is incorrect!");
					return null;
				}
			}
		});

	},
	
	onShowHidePassword: function() {
		var me = this;
		var refs = me.getReferences();
		var checkBox = refs.refShowPassword.getValue();
		if(checkBox) {
			refs.refTxtOldPassword.inputEl.set({type:'text'});
			refs.refTxtOldPassword.inputEl.inputType = 'text' ;
			refs.refTxtPassword.inputEl.set({type:'text'});
			refs.refTxtPassword.inputEl.inputType = 'text' ;
			refs.refRetypePassword.inputEl.set({type:'text'});
			refs.refRetypePassword.inputEl.inputType = 'text' ;
		}
		else {
			refs.refTxtOldPassword.inputEl.set({type:'password'});
			refs.refTxtOldPassword.inputEl.inputType = 'password' ;
			refs.refTxtPassword.inputEl.set({type:'password'});
			refs.refTxtPassword.inputEl.inputType = 'password' ;
			refs.refRetypePassword.inputEl.set({type:'password'});
			refs.refRetypePassword.inputEl.inputType = 'password' ;
		}
	},

    onUserInfoLoad:function(){
		var me = this;
		var refs = me.getReferences();

		refs.refTxtUserId.setValue(MOST.config.Token.getUserId());
		refs.refTxtUserName.setValue(MOST.config.Token.getUserName());
		refs.refTxtEmail.setValue(MOST.config.Token.getEmailAddr());
		refs.refTxtPtnrCode.setValue(MOST.config.Token.getPtnrCode());
		refs.refTxtPtnrName.setValue(MOST.config.Token.getPtnrNm());
		refs.refTxtAddr.setValue(MOST.config.Token.getAddr());
	},
	
	onUpdateInfoUser: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('updateUserInfo');
		var addr = refs.refTxtAddr.getValue();
		var emailAddr = refs.refTxtEmail.getValue();
		var engNm = refs.refTxtUserName.getValue();
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.phantom = false;
		updateParm.set('workingStatus',WorkingStatus.UPDATE);
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.set('addr',addr);
		updateParm.set('emailAddr',emailAddr);
		updateParm.set('engNm',engNm);
		updateParm.set('userId', MOST.config.Token.getUserId());
		
		updateParm.save({
			success: function(record) {
				MessageUtil.saveSuccess(); // Success Message
			}
		});
	},

	onSaveUserInfo: function(type){

		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('profileStore');
		var form = me.getView().down('form').getForm();
		var view = me.getView();

		if(form.isValid()){
			var model = new MOST.model.administrator.User(form.getValues());
			store.insert(0, model);
        	store.sync({
    			success:function(){
    				me.onProfileLoad();
    				Ext.toast({
					 	html: MOST.getApplication().bundle.getMsg('successsave_msg',''),
					 	closable: false,
					 	align: 'tr',
					 	slideInDuration: 300,
					 	minWidth: 400
					});

    			}
    		});
		}
	},

	onCheckEmail : function() {
		var me = this;
		var view = me.getView();
		var refs = me.getReferences();
		var form = me.getView().down('form').getForm();
		var email = form.getValues().email;
		if(email != MOST.config.Token.getEmail()){
			var store = me.getStore('emailChecking');
			store.load({
				params : {
					email : email
				},
				callback: function(records, operation, success) {
					if (records.length != 0) {
						refs.refTxtEmail.markInvalid(MOST.getApplication().bundle.getMsg('invalidEmail_msg'));
					}
				}
			});
		}

	},

	onInboxClick: function(btn){
		var me = this;

		me.createTab('menu', {
    		data: {
    			menuId: 'Inbox' + 'app-inbox',
    			menuScreenName: 'Inbox',
    			screenPathAddress: 'app-inbox',
				screenIconDefineCode: 'x-fa fa-envelope'
    		}
    	},{
			xtype: 'app-inbox'
		});
	},

	onMessagePollingClick: function(btn){
		var me = this;
    	var provider = Ext.direct.Manager.getProvider('messagePollProvider');

    	if(btn.value === 'start') {
    		if (!provider.isConnected()) {
    			provider.setConfig({
    				baseParams: {
    					userId: MOST.config.Token.getUserId()
    				}
    			});
    			provider.addListener('data', me.onPollingData, me);
    			provider.connect();
    		}
    	} else {
    		if (provider.isConnected()) {
    			provider.removeListener('data', me.onPollingData);
    			provider.disconnect();
    		}
    	}
	},

	onPollingData: function(provider, event) {
		var me = this;

		if (event && event.data) {
			if(event.data.data.length > 0) {
				Ext.toast({
					html: 'New message arrived from MOST',
					closable: true,
					align: 't',
					slideInDuration: 300,
					minWidth: 400
				});

				for(var i=0; i<event.data.data.length; i++) {
					var data = event.data.data[i];
					var rec = Ext.create('MOST.model.message.Message', {
						messageId: data.messageId,
						userId: data.userId,
						userName: data.userName,
						email: data.email,
						definitionId: data.definitionId,
						definitionDesc: data.definitionDesc,
						read: data.read,
						businessKey: data.businessKey,
						title: data.title,
						content: data.content,
						lastPollTime: data.lastPollTime,
						registeredUserId: data.registeredUserId,
						registeredUserName: data.registeredUserName
					});

					MOST.getApplication().mostMessage.insert(0, rec);

					if(data.definitionId === 'BIZ20') {
						Ext.MessageBox.show({
				            title: 'Invitation for sharing plan',
				            msg: 'You are invited for sharing plan from ' + data.registeredUserName + '\r\n' + 'Do you want accept?' + '\r\n' + data.content,
				            buttons: Ext.MessageBox.YESNO,
				            buttonText:{
				                yes: "Accept",
				                no: "Later"
				            },
				            scope: me,
				            fn: function(btn) {
				                if (btn === 'yes') {
				                	me.onVesselObserverLoad(rec);
				                }
				            }
				        });
					}
				}
			}
		}
	},

	onVesselObserverLoad: function(record){
		var me = this;
        var tabs = me.lookupReference('ref-maintab');
        var id = 'menu' + '_' + 'app-vesselobserver';
        var tab = tabs.items.getByKey(id);

        if (tab) {
        	tab.close();
        }

        me.createTab('menu', {
    		data: {
    			menuId: 'VesselObserver' + 'app-vesselobserver',
    			menuScreenName: 'Vessel Observer',
    			screenPathAddress: 'app-vesselobserver',
				screenIconDefineCode: 'x-fa fa-ship'
    		}
    	},{
			xtype: 'app-vesselobserver',
			cfgAscId: record.data.businessKey,
			cfgMessageId: record.data.messageId
		});
	},

	//TODO: Test
	onExceptionTestClick: function(){
		var me = this;
		try {
			store.add({})
		} catch(err){
			alert(err.message);
		}
	},

	// Tab Create - KHH - 2019.01.14
	onLoadView : function(viewAlias, recvData){
		var me = this;
		var menuStore = me.getStore('menuList');
		var idx = menuStore.findExact('screenPathAddress', viewAlias);
		var isConfigChanged = false;

		if(idx >= 0){
			var viewObj = menuStore.getAt(idx);

			if(recvData){
				viewObj.recvData = recvData;
				isConfigChanged = true;
			}

			me.onMenuClick(viewObj, isConfigChanged);
		}
	},
	//Search Menu
	onItemClick:function( field, record, item, index, e, eOpts ){
    	var me = this;
    	var refs = me.getReferences();
    	
    	var listView = Ext.ComponentQuery.query('#txtSearchMenuId')[0];
    	var listName = Ext.ComponentQuery.query('#txtSearchMenuName')[0];
    	
    		
    	me.onMenuClick(record);
    	
    	listName.setValue("");
    	
    },
    
    //Focus to Menu listView
    keyDown: function(field, e, eOpts ) {
    	if(e.keyCode != 40){
    		return;
    	}
    	
    	var me = this;
    	var searchMenuStore = me.getStore('searchMenu');
    	var listView = Ext.ComponentQuery.query('#txtSearchMenuId')[0];
    	
		if(searchMenuStore.getData().length> 0){
			listView.focusNode(searchMenuStore.getData().items.at(0));
		}
	},
	
    onSearchMenuItem:function(field,newValue, oldValue, eOpts){
    	var me = this;
    	var refs = me.getReferences();
    	var searchMenuStore = me.getStore('searchMenu');
    	
    	var listView = Ext.ComponentQuery.query('#txtSearchMenuId')[0];
    	
    	var val = field.getValue();
    	
    	searchMenuStore.clearFilter();
    	listView.hide();
    	
    	if(val){
    		searchMenuStore.clearFilter();
          
    		searchMenuStore.filter('menuTypeCode', 'SCREEN');
    		searchMenuStore.filter('menuScreenName', val);
    		
//    		if(searchMenuStore.getData().length> 0){
//    			listView.focusNode(searchMenuStore.getData().items.at(0));
//    		}
    		
    		listView.show();
    		
       } else {
    	   searchMenuStore.clearFilter();
    	   listView.hide();
       }
		
		
    	listView.setStore(searchMenuStore);
    },
    
    onSearchFocusLeave: function(){
    	var me = this;
    	
    },
    
	logout: function(){
		var me = this;
		var item = Ext.create('MOST.model.foundation.CredentialItem', {
			userId: MOST.config.Token.getUserId(),
			accessToken: MOST.config.Token.getAccessToken(),
			accessType: 'LOGOUT',
			branchCode: me.lookupReference('branch').getValue()
		});
		
		var proxy = item.getProxy();
		proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/auth/logout';

		item.save({
            callback: function(record, operation, success) {
            	if(success) {
            		Ext.util.Cookies.clear('mosttoken');
            		MessageUtil.warning('Logout', 'Logout successfully');
            		//window.location.href = window.location.href;
            		localStorage.setItem('branch', me.lookupReference('branch').getValue());
            		location.reload();
            	}else{
					var proxy = item.getProxy();
					proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/auth/accessfail';
					
					item.save({
						callback: function(record, operation, success) {
							MessageUtil.warning('Logout', 'Logout failed');
						}
					})
            	}
            }
        })
	},

	changeTerminal: function(){
		var me = this;
		var item = Ext.create('MOST.model.foundation.CredentialItem', {
			accessToken: MOST.config.Token.getAccessToken(),
			branchCode:localStorage.getItem("branch")
		});

		var proxy = item.getProxy();
		proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/auth/logout';
		
		item.save({
            callback: function(record, operation, success) {
            	if(success) {
            		
            		Ext.util.Cookies.clear('mosttoken');
            		
            		localStorage.setItem("branch", me.lookupReference('branch').getValue());
            		localStorage.setItem("changeTerminal","Y");
            		location.reload();
            	}
            }
        })
	}, 

	onMenuExpandCollapse: function(panel) {
    	var me = this;
    	Ext.MessageBox.show().close();
    },

    onMenuFloat: function(panel) {
    	var me = this;
    	var refs = me.getReferences();
    	refs.refmenu.setZIndex(100000);
    },

	afterRenderAlerting: function (component) {
		var me = this;
		var userType = MOST.config.Token.getUserType();

		me.loadAlerting();

		if (userType === 'I') {
			me.reloadInternalAlerting();
		}

	},

	alerting: function (button) {
		var me = this;
		var refs = me.getReferences();
		var alertButton = refs.refAlerting; 

		me.displayAlerting();
		alertButton.setBadgeText(0);
	},

	displayAlerting: function () {
		var me = this;
		var refs = me.getReferences();
		var win = refs.refAlertingWin;
		var userType = MOST.config.Token.getUserType();
		var isInternal = userType == 'I';

		if (!win) {
			win = Ext.create('Ext.window.Window', {
				reference: 'refAlertingWindow',
				layout: 'fit',
				width: 350,
				x: 1500,
				y: 35,
				style: {
					opacity: 0.9,
					boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.1)',
				},
				listeners: {
					focusleave: function () {
						if(win) {
							win.close();
							refs.refAlerting.setIconCls('x-fa fa-bell-o');
						}
					},
				},
				header: false,
				resizable: false,
				scrollable: true,
				iconCls: 'x-fa fa-bell',
				items: [
					{
						xtype: 'app-alertlist',
						reference: 'refAlertList',
						isInternal: isInternal
					},
				],
			});
			me.getView().add(win);

			win.show();
			win.toFront();
			refs.refAlerting.setIconCls('x-fa fa-bell');
			refs.refAlerting.setBadgeText(0);
			me.reloadInternalAlerting(120000);
		}
	},

	reloadInternalAlerting: function(newIntervalDuration){
		var me = this;

		if(Ext.isNumeric(newIntervalDuration)){
			me.intervalDuration = newIntervalDuration
		}
		if (me.alertInterval) {
			clearInterval(me.alertInterval);
		}

		me.alertInterval = setInterval(function() {
			me.loadAlerting();
		}, me.intervalDuration);
	},

	loadAlerting: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('alertList');
		var alertButton = refs.refAlerting;
		var userType = MOST.config.Token.getUserType();

		store.load({
			params: {
				userId: MOST.config.Token.getUserId(),
				userType: userType
			},
			callback: function (records, operation, success) {
				if(success && records.length > 0){
					var notificationCount = 0;

					if(userType === 'I') {
						notificationCount = records.reduce(function (total, record) {
							return total + new Number(record.get('cnt'));
						}, 0);
					} else {
						notificationCount = records.length;
					}

					alertButton.setBadgeText(notificationCount <= 9 ? notificationCount : '9+');
				} 
			}
		})
	}, 
	
});