Ext.define('TSB.app.ViewController', {
    override: 'Ext.app.ViewController',

    // [KHH.COMP.2018.11.13]
    initViewModel: function(obj) {
        var screenAlias;
        
        if (obj.xtype) {
            screenAlias = obj.xtype;
        } else {
            screenAlias = obj.getView().xtype;
        }
        
        if (screenAlias) {
            var store = Ext.create('Ext.data.Store', {
            	storeId: 'componentAuthorizationStore',
                fields: [{
                    name:'screenType',
                    type:'string'
                },{
                    name:'itemId',
                    type:'string'
                },{
                    name:'disabled',
                    type:'boolean'
                },{
                    name:'hidden',
                    type:'boolean'
                }],

                proxy: {
                    type: 'rest',
                    url: MOST.config.Locale.getRestApiDestUrl() + '/v1/authority/components'
                }
            });
            
        }
        //added by Brian (To apply authority to Button) 2019/10/31
        var accessButton = MOST.config.Token.getAccessButtonAuthority();
        
        if(accessButton != null){
            if(accessButton.inquiry == "N"){
            	if(this.view.getReferences() != null){
            		var btn = this.view.getReferences().refBtnRetrieve;
                	if(btn != null){
     					btn.setVisible(false);
    				}
            	}
            	
//				var btn = Ext.ComponentQuery.query('#inquiryButton')[0];
//				if(btn != null){
//					btn.setVisible(false);
//				}
            }
            
            if(accessButton.clear == "N"){
        		if(this.view.getReferences() != null){
        			var btn = this.view.getReferences().refBtnClear;
                	if(btn != null){
     					btn.setVisible(false);
    				}
            	}
            	
//				var btn = Ext.ComponentQuery.query('#clearButton')[0];
//				if(btn != null){
//					btn.setVisible(false);
//				}
            }
            
            if(accessButton.create == "N"){
            	if(this.view.getReferences() != null){
            		var btn = this.view.getReferences().refBtnCreate;
                	if(btn != null){
     					btn.setVisible(false);
    				}
            	}
            	
//				var btn = Ext.ComponentQuery.query('#createButton')[0];
//				if(btn != null){
//					btn.setVisible(false);
//				}
            }
            
            if(accessButton.save == "N"){
            	if(this.view.getReferences() != null){
            		var btn = this.view.getReferences().refBtnSave;
                	if(btn != null){
     					btn.setVisible(false);
    				}
            	}
            	
//				var btn = Ext.ComponentQuery.query('#saveButton')[0];
//				if(btn != null){
//					btn.setVisible(false);
//				}
            }
            
            if(accessButton.delete == "N"){
            	if(this.view.getReferences() != null){
            		var btn = this.view.getReferences().refBtnDelete;
                	if(btn != null){
     					btn.setVisible(false);
    				}
            	}
            	
// 				var btn = Ext.ComponentQuery.query('#deleteButton')[0];
// 				if(btn != null){
// 					btn.setVisible(false);
// 				}
            }
            
            if(accessButton.download == "N"){
            	if(this.view.getReferences() != null){
            		var btn = this.view.getReferences().refBtnDownload;
                	if(btn != null){
     					btn.setVisible(false);
    				}
            	}
            	
//				var btn = Ext.ComponentQuery.query('#downloadButton')[0];
//				if(btn != null){
//					btn.setVisible(false);
//				}
            }
            
            if(accessButton.preview == "N"){
            	if(this.view.getReferences() != null){
            		var btn = this.view.getReferences().refBtnPreview;
                	if(btn != null){
     					btn.setVisible(false);
    				}
            	}
				/*var btn = Ext.ComponentQuery.query('#previewButton')[0];
				if(btn != null){
					btn.setVisible(false);
				}*/
            }
            
            if(accessButton.print == "N"){
            	if(this.view.getReferences() != null){
            		var btn = this.view.getReferences().refBtnPrint;
                	if(btn != null){
     					btn.setVisible(false);
    				}
            	}
//				var btn = Ext.ComponentQuery.query('#printButton')[0];
//				if(btn != null){
//					btn.setVisible(false);
//				}
            }
            
            if(accessButton.history == "N"){
            	if(this.view.getReferences() != null){
            		var btn = this.view.getReferences().refBtnHistory;
                	if(btn != null){
     					btn.setVisible(false);
    				}
            	}
            	
//				var btn = Ext.ComponentQuery.query('#historyButton')[0];
//				if(btn != null){
//					btn.setVisible(false);
//				}
            }
        }
        
        
//        store.load({
//            params: {
//                systemCode: 'MOST',
//                screenId: screenAlias
//            },            
//            callback: function(records, operation, success) {
//                if (success) {
//                    for(var i = 0; i < store.getCount(); i++) {
//                        var components = Ext.ComponentQuery.query(screenAlias + ' #' + store.getAt(i).data.itemId);
//                        
//                        Ext.each(components, function(component){
//                            if (component.xtype === 'grid') {
//                                if (store.getAt(i).data.disabled) {
//                                    var plugins = component.getPlugins();
//                                    Ext.each(plugins, function(plugin) {
//                                        if (plugin.alias.length > 0 && (plugin.alias[0] === 'plugin.rowediting' || plugin.alias[0] === 'plugin.cellediting')) {
//                                            plugin.disable(); 
//                                        }
//                                    });
//                                    
//                                    if(component.viewConfig && component.viewConfig.plugins && component.viewConfig.plugins.ptype === 'gridviewdragdrop') {
//                                        component.getView().getPlugin(component.viewConfig.plugins.pluginId).init(component);
//                                    }                                    
//                                }
//                                
//                                component.setHidden(store.getAt(i).data.hidden);
//                                
//                            } else if (component.xtype === 'button') {
//                            	//Disable should blocked due to conflict with screen initial setting
//                                if(store.getAt(i).data.hidden) {
//                                	component.up().remove(component);
//                                }
//                            } else if (component.xtype === 'segmentedbutton') {
//                            	//Disable should blocked due to conflict with screen initial setting
//                                if(store.getAt(i).data.hidden) {
//                                	component.up().remove(component);
//                                }
//                            } else if (component.xtype === 'textfield') {
//                            	//Disable should blocked due to conflict with screen initial setting
//                            	if(store.getAt(i).data.hidden) {
//                                	component.up().remove(component);
//                                }
//                            } else if (component.xtype === 'filefield') {
//                            	//Disable should blocked due to conflict with screen initial setting
//                            	if(store.getAt(i).data.hidden) {
//                                	component.up().remove(component);
//                                }
//                            }
//                        }); 
//                    }
//                }
//            }
//        });
    }
    
});