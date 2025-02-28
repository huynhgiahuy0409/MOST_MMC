Ext.define('MOST.view.planning.berth.BerthExplorerController', {
    extend: 'MOST.view.foundation.BaseViewController',
	/**
     * @memberOf TSB
     */

	listen: {
		controller: {
			'*': {
				onRedirectBerthTab: 'onRedirectBerthTab'
			}
		}
	},

    requires: [
      
    ],

    alias: 'controller.berthexplorer',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
    INIT_DATE_PERIOD : 14,	// MAX PERIOD DATE (a week)
    MAX_DATE_ALLOW : 90,	// MAX PERIOD Month (3 Month)
    
    BERTH_ALONG_SIDE_STORE: 'berthAlongSideCombo',
    PRIORITY_STORE: 'priorityCombo',
    SHIFT_BERTH_ALONG_SIDE_STORE: 'shftBerthAlongSideCombo',
    
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
    
	onRedirectBerthTab: function(detailItem) {
		var me = this;
		var ref = me.lookupReference('refBerthLayout');
		ref.removeAll();
		me.getView().recvData = detailItem;
		me.onLoad();
	},

	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var metaStore = me.getStore('meta');
		var terminalsStore = me.getStore('terminals');
		var berthsStore = me.getStore('berths');
		var bittsStore = me.getStore('bitts');
		var plansStore = me.getStore('plans');
		var sftPlansStore = me.getStore('sftPlans');
		var berthingStatusStore = me.getStore('berthingStatusCombo');
		var maintenanceBerthsStore = me.getStore('maintenanceBerths');
		var reasonsComboStore = me.getStore('reasonsCombo');
		var vslShiftingListStore = me.getStore('vslShiftingList');
		var flag;
		var refBerthGrid = me.getReferences().refberthgrid;
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.BERTH_PLAN_ALONG_SIDE_COMBOBOX, me.BERTH_ALONG_SIDE_STORE);
		me.setComboBoxWithLocalCache(CacheServiceConstants.YES_NO, me.PRIORITY_STORE);
		me.setComboBoxWithLocalCache(CacheServiceConstants.SHIFT_BERTH_ALONG_SIDE_COMBOBOX, me.SHIFT_BERTH_ALONG_SIDE_STORE);
		
		terminalsStore.load();
		reasonsComboStore.load();
		
		metaStore.load({
			callback: function(records, operation, success) {
				if (success) {
					berthingStatusStore.load({
						callback: function(records, operation, success) {
							if (success) {
								berthsStore.load({
									callback: function(records, operation, success) {
										if (success) {
											me.setDateInDays("ctlFromYearMonth", -me.INIT_DATE_PERIOD);
											me.setDateInDays("ctlToYearMonth",+me.INIT_DATE_PERIOD);
											
											bittsStore.load({
												callback: function(records, operation, success) {
													if (success) {
														var berthType = 'WRF';
														var recvData = me.getView().recvData;
														
														if(recvData){
															berthType = recvData.data.berthType;
															
															refs.refBerthType.clearValue();
															refs.refBerthType.setValue(berthType);
															refs.ctlPlanCheckbox.setValue(false);
															refs.ctlVesselCallId.setValue(recvData.get('vslCallId'));
															
															if(recvData.data.atb == null && recvData.data.atb == null & recvData.data.etb == null){
																refs.ctlFromYearMonth.setValue(new Date());
															}else{
																refs.ctlFromYearMonth.setValue(new Date(recvData.data.atb ? recvData.data.atb : recvData.data.etb));
															}
															//refs.ctlFromYearMonth.setValue(new Date(recvData.data.atb ? recvData.data.atb : recvData.data.etb));
														}
														
														var recordNumber = terminalsStore.find('scd', berthType);
														
														refs.refBerthType.setValue(berthType);
														
														var fromDate = refs.ctlFromYearMonth.getValue();
														var toDate = refs.ctlToYearMonth.getValue();
														var etaFrom = new Date(fromDate.setDate(fromDate.getDate()));
														var etaTo = new Date(toDate.setDate(toDate.getDate()));
														
														refs.ctlFromYearMonth.on('change', function(combo, record, index) {
															 me.fireEvent('onMonthfieldChanged');
														});
														
														refs.ctlToYearMonth.on('change', function(combo, record, index) {
															 me.fireEvent('onMonthfieldChanged');
														});
														
														metaStore.add({
															key: 'fromDate',
															value: Ext.Date.format(etaFrom, 'Y-m-d') + ""
														},{
															key: 'toDate',
															value: Ext.Date.format(etaTo, 'Y-m-d') + ""
														});
														
														plansStore.load({
															params: {
																berthStatus: refs.refBerthStatus.getValue(),
																viewType : refs.refBerthType.getValue(),
																plan : refs.ctlPlanCheckbox.getValue() ? 'Y' : 'N',
																etaFrom2: etaFrom.getTime(),
																etaTo2: etaTo.getTime(),
																viewMode: refs.refTglWorkMode.getValue(),
																vslCallId : refs.ctlVesselCallId.getValue()
															},
															callback: function(records, operation, success) {
																if (success) {
																	sftPlansStore.load({
																		params: {
																			etaFrom2: etaFrom.getTime(),
																			etaTo2: etaTo.getTime(),
																			viewType : refs.refBerthType.getValue(),
																			viewMode: refs.refTglWorkMode.getValue()
																		},
																		callback: function(records, operation, success) {
																			if (success) {
																				maintenanceBerthsStore.load({
                                                                                    params: {
                                                                                            berthStatus: refs.refBerthStatus.getValue(),
                                                                                            viewType : refs.refBerthType.getValue(),
                                                                                            plan : refs.ctlPlanCheckbox.getValue() ? 'Y' : 'N',
                                                                                            etaFrom2: etaFrom.getTime(),
                                                                                            etaTo2: etaTo.getTime(),
                                                                                            viewMode: refs.refTglWorkMode.getValue(),
                                                                                            vslCallId : refs.ctlVesselCallId.getValue()
                                                                                    },
                                                                                    callback: function(records, operation, success) {
                                                                                            if (success) {
                                                                                                    me.onDraw();
                                                                                            }
                                                                                    }
																				})
																			}
																		}
																	});
																}
																plansStore.commitChanges();
															}
														});

														vslShiftingListStore.load({
															params: {
																etaFrom2: etaFrom.getTime(),
																etaTo2: etaTo.getTime(),
																vslCallId : refs.ctlVesselCallId.getValue()
															},
															// callback: function(records, operation, success) {
															// 	if (success) {
															// 		me.getViewModel().set('vslShiftingList', vslShiftingListStore);
															// 	}
															// }	
														});

													}
												}
											});
										}
									}
								});
							}
						}
					});					
				}
			}
		});
		
    	/*var timer = setInterval (function() {
    		if(me.getReferences().refBerthView) {
				if(me.getReferences().refBerthView && me.getReferences().refBerthView.isCompleted) {
					var recvData = me.getView().recvData;

					clearInterval(timer);
					
					if(recvData){
						var idx = plansStore.findBy(function(item) {
		                    return (item.get('vslCallId') === recvData.data.vslCallId);
		                });
						
						if(idx >= 0){
							var selectedData = plansStore.getAt(idx);
							
							me.getViewModel().set('selectedBerthPlan', selectedData);
							me.getViewModel().set('planIndex', selectedData);
							me.getReferences().refBerthView.selectBerthPlan(selectedData.data);

							var d = me.getReferences().refBerthLayout.body.dom;
							
							if(d){
								var pos = me.getReferences().refBerthView.getBerthPlanPos(selectedData.data);
								var win = me.getReferences().refBerthLayout;
								var height = me.getReferences().refBerthView.getHeight();
								var width = me.getReferences().refBerthView.getWidth();

								d.scrollTop =  pos[1] - (win.getHeight()/3);
								d.scrollLeft = pos[0] - (win.getWidth()/2) + pos[2];
							}
							
							refs.refVesselSchduleListGrid.getSelectionModel().select(selectedData, false, true);
							
							if(refs.refVesselSchduleListGrid.getView().getRow(selectedData)){
								refs.refVesselSchduleListGrid.getView().getRow(selectedData).scrollIntoView();
							}
						}
					}else{
						var position = me.getReferences().refBerthView.getCurrentDayPosition(new Date().getDate());
						var d = me.getReferences().refBerthLayout.body.dom;
						
						if(d){
							d.scrollTop =  position;
							d.scrollLeft = 0;
						}
					}
				}
    		}
		}, 200);*/
	},

    onDraw: function() {
    	var me = this;
    	var refs = me.getReferences();
        var canBerth, canMain;
    	var metaStore = me.getStore('meta');
    	var berthsStore = me.getStore('berths');
    	var bittsStore = me.getStore('bitts');
    	var plansStore = me.getStore('plans');
    	var maintenanceBerthsStore = me.getStore('maintenanceBerths');
    	
    	canBerth = me.lookupReference('refBerthLayout');
		canBerth.removeAll(true);
		
    	var berthview = canBerth.add({
    		xtype: 'app-berthrenderer',			//draw
    		plugins: ['spriteevents'],
    		reference: 'refBerthView',
    		layout: {
    			type: 'absolute'
    		},
    		storeMeta: metaStore,
    		storeBerth: berthsStore,
    		storeBitt: bittsStore,
    		storeBerthPlan: plansStore,
    		storeMaintenanceBerth: maintenanceBerthsStore,
    		viewMode: refs.refTglWorkMode.getValue(),
    		x: 0,
    		y: 0,
    		width: 1,
        	height: 1,
			site: 'JPB'
    	});
    	
    	berthview.on({
            element: 'element',
			mousedown : function(e){
				var renderer = this.component;
                var surface = renderer.getSurface();
                var xy = surface.getEventXY(e),
                    x = xy[0],
                    y = xy[1];
			
				if(renderer.isPlanning){	// leave event when berth is amongst planning
					return;
				}

				var selectedBerthPlanIndexes = renderer.getSelectedBerthPlanIndexes(x, y);
				
				if(selectedBerthPlanIndexes.length > 0) {
					var selectedPlanIndex = selectedBerthPlanIndexes[0];
					
					me.getViewModel().set('selectedBerthPlan', plansStore.getAt(selectedPlanIndex));
				} else {
					renderer.onMouseLeave();
					me.getViewModel().setData('selectedBerthPlan', -1);
					me.getViewModel().setData('planIndex', -1);
				}
			},

			mouseup : function(e, t, eOpts){
				var renderer = this.component;
                var surface = renderer.getSurface();
                var xy = surface.getEventXY(e),
                    x = xy[0],
					y = xy[1];
				var selectedBerthPlanIndexes = renderer.getSelectedBerthPlanIndexes(x, y);
				var orgSelectedBerthPlan = me.getViewModel().get('selectedBerthPlan');

				if(orgSelectedBerthPlan != undefined && renderer.isPlanning){
					var clonedRecord = orgSelectedBerthPlan.clone();
					var planedRecord = renderer.doPlanning([renderer.bodySprite.attr.x - renderer.meta.timelineWidth
							, renderer.bodySprite.attr.y - renderer.meta.berthHeight
							, renderer.bodySprite.attr.width
							, renderer.bodySprite.attr.height]
						, orgSelectedBerthPlan.data, orgSelectedBerthPlan);
            		
            		if(planedRecord) {
            			me.getViewModel().get('undoStack').push(clonedRecord);
            			me.getViewModel().set('undoRemained', me.getViewModel().get('undoStack').length);
            			
            			var recvData = me.getView().recvData;
            			
            			if(recvData){
            				if(refs.refBerthType.getValue() === 'WRF'){
		            			recvData.set('wharfMarkFrom',planedRecord.data.startPos);
		            			recvData.set('wharfMarkTo', planedRecord.data.endPos);
            				}else{
            					recvData.set('wharfMarkFrom', 0);
            					recvData.set('wharfMarkTo', 0);
            				}
            			}
            		}
				} else if(selectedBerthPlanIndexes.length > 0 && orgSelectedBerthPlan != undefined) {
					var newSelectedBerthPlanIndex = selectedBerthPlanIndexes[0];
					var newSelectedBerthPlan = plansStore.getAt(newSelectedBerthPlanIndex);
					
					if(orgSelectedBerthPlan.get('vslCallId') == newSelectedBerthPlan.get('vslCallId') && !renderer.isPlanning){
						me.getViewModel().set('planIndex', newSelectedBerthPlan);
						
						renderer.selectBerthPlan(plansStore.getAt(newSelectedBerthPlanIndex).data);
						refs.refVesselSchduleListGrid.getView().bufferedRenderer.scrollTo(newSelectedBerthPlanIndex, true);
						refs.refVesselSchduleListGrid.getSelectionModel().select(plansStore.getAt(newSelectedBerthPlanIndex), false, true);
						refs.refVesselSchduleListGrid.getView().getRow(plansStore.getAt(newSelectedBerthPlanIndex)).scrollIntoView();
						
						return;
					}
				}
				
				var selectedBerthMaintenanceIndexes = renderer.getSelectedBerthMaintenanceIndexes(x, y);
                
                if(selectedBerthMaintenanceIndexes != undefined && selectedBerthMaintenanceIndexes.length > 0 ){
                        var maintenanceBerthPlan = maintenanceBerthsStore.getAt(selectedBerthMaintenanceIndexes).data;
                        
                        renderer.selectMaintenanceBerthPlan(maintenanceBerthPlan);
                        
                        return;
                        
                }
				
				renderer.onMouseLeave();
				
				me.getViewModel().setData('selectedBerthPlan', -1);
				me.getViewModel().setData('planIndex', -1);
			},

            mousemove: function(e) {
            	if(me.planSprite && me.planSprite.customId) {
	            	var renderer = this.component;
	            	var refs = me.getReferences();
                
	            	if (me.getViewModel().get('selectedBerthPlan')) {
	            		renderer.onMouseMove(e, me.planSprite.customId, me.getViewModel().get('selectedBerthPlan').data, 
	        					[{
	        						pressed: false,
	        						value: 10
	        					}, {
	        						pressed: false,
	        						value: 30
	        					}]);
	            	}
            	}
            },

			mouseleave: function(e) {
        		var renderer = this.component;
                
            	if(me.planSprite) {
            		renderer.onMouseLeave();
            		me.planSprite = null;
            	}
		    }
    	});

    	berthview.on({
    		spritemousedown: function(obj, event, eOpts) {
            	var renderer = this;
            	
            	if(obj.sprite.customId) {
            		me.planSprite = obj.sprite;
            		
            		renderer.onSpriteMouseDown(event, obj.sprite.customId);
            	}
            },
            
            spritemouseup: function(obj, event, eOpts ) {
				var renderer = this;
				
            	if(obj.sprite.customId) {
            		if (me.getViewModel().get('selectedBerthPlan')) {
            			var clonedRecord = me.getViewModel().get('selectedBerthPlan').clone();
    					var planedRecord = renderer.onSpriteMouseUp(event, obj.sprite.customId, me.getViewModel().get('selectedBerthPlan').data, clonedRecord.data);
                		
    					me.planSprite = null;
                		
                		if(planedRecord) {
                			me.getViewModel().get('undoStack').push(clonedRecord);
                			me.getViewModel().set('undoRemained', me.getViewModel().get('undoStack').length);
                			
                			var recvData = me.getView().recvData;
                			
                			if(recvData){
                				if(refs.refBerthType.getValue() === 'WRF'){
    		            			recvData.set('wharfMarkFrom',planedRecord.data.startPos);
    		            			recvData.set('wharfMarkTo', planedRecord.data.endPos);
                				}else{
                					recvData.set('wharfMarkFrom', 0);
                					recvData.set('wharfMarkTo', 0);
                				}
                			}
                		}
            		}
            	}
            }
    	});
    	
    	var loopCount = 0;
    	var timer = setInterval (function() {
    		if(me.getReferences() && me.getReferences().refBerthView) {
    			if(me.getReferences().refBerthView && me.getReferences().refBerthView.isCompleted) {
					clearInterval(timer);
					var selectedBerthPlanIndexes = me.getReferences().refBerthView.getSelectedBerthPlanIndexesById(refs.ctlVesselCallId.getValue());
					
					if (selectedBerthPlanIndexes) {
						if (selectedBerthPlanIndexes.length > 0) {
							me.getViewModel().set('planIndex', selectedBerthPlanIndexes[0]);
							me.getReferences().refBerthView.selectBerthPlan(plansStore.getAt(selectedBerthPlanIndexes[0]).data);

							var d = me.getReferences().refBerthLayout.body.dom;
							
							if (d) {
								var pos = me.getReferences().refBerthView.getBerthPlanPos(plansStore.getAt(selectedBerthPlanIndexes[0]).data);
								var win = me.getReferences().refBerthLayout;
								var height = me.getReferences().refBerthView.getHeight();
								var width = me.getReferences().refBerthView.getWidth();

								d.scrollTop =  pos[1] - (win.getHeight()/3);
								d.scrollLeft = pos[0] - (win.getWidth() / 2) + pos[2];
							}
						}else{
                            var record = me.getViewModel().get('selectedBerthPlan');
                            
                            if(record){
	                            var selectedBerthPlanIndexes = me.getReferences().refBerthView.getSelectedBerthPlanIndexesById(record.get('vslCallId'));
								if (selectedBerthPlanIndexes) {
									if (selectedBerthPlanIndexes.length > 0) {
										me.getViewModel().set('planIndex', selectedBerthPlanIndexes[0]);
										me.getReferences().refBerthView.selectBerthPlan(plansStore.getAt(selectedBerthPlanIndexes[0]).data);
	
										var d = me.getReferences().refBerthLayout.body.dom;
										
										if (d) {
											var pos = me.getReferences().refBerthView.getBerthPlanPos(plansStore.getAt(selectedBerthPlanIndexes[0]).data);
											var win = me.getReferences().refBerthLayout;
											var height = me.getReferences().refBerthView.getHeight();
											var width = me.getReferences().refBerthView.getWidth();
	
											d.scrollTop =  pos[1] - (win.getHeight()/3);
											d.scrollLeft = pos[0] - (win.getWidth() / 2) + pos[2];
										}
									}
								}
                            }
						}
					}else{
						var position = me.getReferences().refBerthView.getCurrentDayPosition(new Date().getDate());
						var d = me.getReferences().refBerthLayout.body.dom;
						
						if(d){
							d.scrollTop =  position;
							d.scrollLeft = 0;
						}
					}
				}
    		}
    		
    		if(loopCount > 5000){
    			clearInterval(timer);
    		}
    		
    		loopCount++;
		}, 100); 
    },

    onSave: function(){
		var me = this;
		var plansStore = me.getStore('plans');
		
		if(me.timelineValidation()){
			plansStore.getModifiedRecords().forEach(function(record, index, array){
	 			record.set('endPos', record.get('endPos1'));
			});
			
			plansStore.sync({
				callback:function(records,success){
					if(success){
						MessageUtil.saveSuccess();
					}
				}
			});
		}
    },
    
    onRemove: function(){
    	
    },
    
    onExportExcelPdfWithServer: function(){
    	
    },
    
    timelineValidation: function(){
    	var me = this;
		var plansStore = me.getStore('plans');
		var arrayData = plansStore.getModifiedRecords();
		
		for (var idx = 0; idx < arrayData.length; idx ++){
			var record = arrayData[idx];
			var numATB2ATW = me.notValidDate(record.get('atb'), record.get('atw'));
 			var numATB2ATC = me.notValidDate(record.get('atb'), record.get('atc'));
 			var numATB2ATU = me.notValidDate(record.get('atb'), record.get('atu'));
 			var numATW2ATC = me.notValidDate(record.get('atw'), record.get('atc'));
 			var numATW2ATU = me.notValidDate(record.get('atw'), record.get('atu'));
 			var numATC2ATU = me.notValidDate(record.get('atc'), record.get('atu'));
 			
 			if(numATB2ATW || numATB2ATC || numATB2ATU || numATW2ATC || numATW2ATU || numATC2ATU){
 				MessageUtil.alert('warning_msg', 'berthplan_timeline_msg');
 				return false;
 			}
 			
 			var numETA2ETB = me.notValidDate(record.get('eta'), record.get('etb'));
 			var numETA2ETW = me.notValidDate(record.get('eta'), record.get('etw'));
 			var numETA2ETC = me.notValidDate(record.get('eta'), record.get('etc'));
 			var numETA2ETU = me.notValidDate(record.get('eta'), record.get('etu'));
 			var numETA2ETD = me.notValidDate(record.get('eta'), record.get('etd'));
 			var numETB2ETW = me.notValidDate(record.get('etb'), record.get('etw'));
 			var numETB2ETC = me.notValidDate(record.get('etb'), record.get('etc'));
 			var numETB2ETU = me.notValidDate(record.get('etb'), record.get('etu'));
 			var numETB2ETD = me.notValidDate(record.get('etb'), record.get('etd'));
 			var numETW2ETC = me.notValidDate(record.get('etw'), record.get('etc'));
 			var numETW2ETU = me.notValidDate(record.get('etw'), record.get('etu'));
 			var numETW2ETD = me.notValidDate(record.get('etw'), record.get('etd'));
 			var numETC2ETU = me.notValidDate(record.get('etc'), record.get('etu'));
 			var numETC2ETD = me.notValidDate(record.get('etc'), record.get('etd'));
 			var numETU2ETD = me.notValidDate(record.get('etu'), record.get('etd'));
 			
 			if(record.get('atu') != null && record.get('atb') == null){
 				MessageUtil.alert('warning_msg', 'vesssel_updateatu_msg');
 				
				return false;
 			}
		}
		
		return true;
    },
    
	notValidDate: function(startDate , endDate){
		var result = true;

		if(startDate == null || endDate == null){
			result =  false;
		}else{
			if(startDate < endDate){
				result =  false;
			}
		}
		
		return result;
	},
   	
	onZoomTime: function(btn){
		var me = this;
		var store = me.getStore('meta');
		var curr, org, baseUnit, baseUnitOrign;
		
		baseUnit = 'baseTimeUnit';
		baseUnitOrign = 'baseTimeUnitOrign';
		
		curr = parseFloat(store.getAt(store.findExact('key',baseUnit)).data.value);
		org = parseFloat(store.getAt(store.findExact('key',baseUnitOrign)).data.value);
		
		if(btn.value === 100) {
			store.getAt(store.findExact('key', baseUnit)).set('value', org.toString());
		} else {
			curr = curr + org * btn.value / 100;
			store.getAt(store.findExact('key', baseUnit)).set('value', curr.toString());
		}
	},
	
	onZoomBerth: function(btn){
		var me = this;
		var store = me.getStore('meta');
		var curr, org, baseUnit, baseUnitOrign;
		
		baseUnit = 'baseBerthUnit';
		baseUnitOrign = 'baseBerthUnitOrign';
		
		curr = parseFloat(store.getAt(store.findExact('key',baseUnit)).data.value);
		org = parseFloat(store.getAt(store.findExact('key',baseUnitOrign)).data.value);
		
		if(btn.value === 'fit') {
			me.fitBerthToWindow(true);
		} else if(btn.value === 100) {
			store.getAt(store.findExact('key', baseUnit)).set('value', org.toString());
		} else {
			curr = curr + org * btn.value / 100;
			store.getAt(store.findExact('key', baseUnit)).set('value', curr.toString());
		}
	},
	
	onScroll: function(scr, x, y, eOpts) {
		var me = this;
		
		if(me.getReferences().refBerthView) {
			me.getReferences().refBerthView.onScroll(x,y);
		}
	},
	
	fitBerthToWindow: function(isFit) {
		var me = this;
		var store = me.getStore('meta');
		var win = me.lookupReference('refBerthLayout');
		var view = me.lookupReference('refBerthView');
		
		if(isFit){
			var fitSize = view.getBaseBerthUnit(win.getWidth());
			store.getAt(store.findExact('key', 'baseBerthUnit')).set('value', fitSize);
		} else {
			var unit = store.getAt(store.findExact('key', 'baseBerthUnitOrign')).data.value;
			store.getAt(store.findExact('key', 'baseBerthUnit')).set('value', unit);
		}

	},
	
	onFitChecked: function(chk, newValue, oldValue, eOpts) {
		var me = this;
		me.fitBerthToWindow(newValue);
	},
	
	onResize: function(element, eOpts ) {
		var me = this;
		
		task.delay(500, null, me, [element]);
	},
	
	onResizedTask: function(element) {
		var me = this;
		var store = me.getStore('meta');
		var view = me.lookupReference('refBerthView');
		var checkbox = me.lookupReference('refFit');
		
		if(view && checkbox.checked){
			me.fitBerthToWindow(true);
		}
	},
	
	onTerminalSelectionChange: function(sm, selections) {
		if(selections === null)
			return;
			
		var me = this;
		var refs = me.getReferences();
		var berthsStore = me.getStore('berths'); 
		var plansStore = me.getStore('plans'); 
		var berthType = refs.refBerthType;
		
		berthsStore.each(function(record,idx){
			record.data.drawable = 0;
		});
		
		
		berthsStore.removeFilter('berthTpFilterId');
		var berthTpFilter = new Ext.util.Filter({
			id: 'berthTpFilterId',
			property: 'berthTp',
			operator: '=',
			value:  berthType.getValue()
		});

		berthsStore.addFilter(berthTpFilter);
		
		for(var i=0; i<selections.length; i++) {
			berthsStore.each(function(record,idx){
				if(record.data.berthTp === berthType.getValue()) {
					record.data.drawable = 1;
				}
			});
		}
		
		if(berthType.getValue() ==='WRF'){
			refs.refStartPos.setVisible(true);
			refs.refEndPos.setVisible(true);
		}else{
			refs.refStartPos.setVisible(false);
			refs.refEndPos.setVisible(false);			
		}
		
		plansStore.filter('berthTp', berthType.getValue());
		berthsStore.fireEvent('load');
	},
	
	onChangeBerthLocation:function(e, newValue, eOpts ) {
		var me = this,
			refs = me.getReferences(),
			berthType = refs.refBerthType.getValue(),
			selectedRecord = me.getViewModel().get('selectedBerthPlan'),
			startPos = Number(newValue.data.startPos);

		if(!selectedRecord) return null;
		
		selectedRecord.set('startPos', startPos);

		if(berthType === newValue.get("berthTp")){
			selectedRecord.set('startPos', startPos);
		}else{
			selectedRecord.set('berthTp',newValue.get("berthTp"));
			selectedRecord.set('startPos',startPos);
		}
	},
	
	onOpenBerthMaintenance: function() {
		var me = this;
		var title = {type: 'bundle', key: 'berthMaintenance'};

		me.getView().detailViewAlias = 'app-berthmaintenance';
		me.openDetailPopup(null, title);
	},
	
	checkMaintenanceBerth: function(planInfo){
		var me = this;
		var returnValue = {
			isValid: true,
			maintenanceBerth: []
		};
		
		var maintenanceBerth = me.getStore('maintenanceBerths');
		
		if (planInfo != null) {
			
			for (var i = 0; i< maintenanceBerth.getData().length; i++){
				var record = maintenanceBerth.getData().getAt(i);

				returnValue.maintenanceBerth = [record.get("repFromMeter"), record.get("repToMeter"), record.get("repStopStime"), record.get("repStopEtime")];
				
				var sPos = planInfo.get("startPos");
				var ePos = planInfo.get("endPos");
				var Tetb = planInfo.get("etb");
				var Tetu = planInfo.get("etu");
				
				var temp1 = Ext.Date.diff(Tetb, record.get("repStopStime"), Ext.Date.MINUTE);
				var temp2 = Ext.Date.diff(Tetu, record.get("repStopStime"), Ext.Date.MINUTE);
				
				var temp3 = Ext.Date.diff(Tetb, record.get("repStopEtime"), Ext.Date.MINUTE);
				var temp4 = Ext.Date.diff(Tetu, record.get("repStopEtime"), Ext.Date.MINUTE);
				
				//X position
				if((record.get("repFromMeter") < sPos && record.get("repToMeter") > sPos) ||
					(record.get("repFromMeter") < ePos && record.get("repToMeter") > ePos)){
					//Y position 
					if(temp1 < 0 || temp2 < 0 ||temp3 < 0 ||temp4 < 0){
						if(temp1 < 0 && temp2 < 0 &&temp3 < 0 && temp4 < 0){
							returnValue.isValid = true;
						}else{
							returnValue.isValid = false;
							return returnValue;
						}
						
					}

				}else if(sPos <= record.get("repFromMeter") && ePos >= record.get("repToMeter") ){
					//Y position 
					if(temp1 < 0 || temp2 < 0 ||temp3 < 0 ||temp4 < 0){
						if(temp1 < 0 && temp2 < 0 &&temp3 < 0 && temp4 < 0){
							returnValue.isValid = true;
						}else{
							returnValue.isValid = false;
							return returnValue;
						}
						
					}

				}else if(record.get("repFromMeter") <= sPos && record.get("repToMeter") >= ePos){
					//Y position 
					if(temp1 < 0 || temp2 < 0 ||temp3 < 0 ||temp4 < 0){
						if(temp1 < 0 && temp2 < 0 &&temp3 < 0 && temp4 < 0){
							returnValue.isValid = true;
						}else{
							returnValue.isValid = false;
							return returnValue;
						}
						
					}
				}
			}
		} 
		
		return returnValue;
	},
	
	onUndo: function(btn) {
		var me = this;
		var plansStore = me.getStore('plans');
		var undoStack = me.getViewModel().get('undoStack');
		
		if(undoStack.length > 0) {
			var rec = plansStore.getById(undoStack[undoStack.length - 1].id)
			rec.set(undoStack[undoStack.length - 1].getData());
			
			var recvData = me.getView().recvData;
			if(recvData){
    			recvData.set('wharfMarkFrom', rec.data.startPos);
    			recvData.set('wharfMarkTo', rec.data.endPos);
			}
			
			plansStore.sync();

			undoStack.pop();
			me.getViewModel().set('undoRemained', undoStack.length);
		}
	},

	onMonthfieldChanged: function(control, newValue , oldValue , eOpts){
		var me = this;
		var refs = me.getReferences();
		var fromDate = refs.ctlFromYearMonth.getValue();
		var toDate = refs.ctlToYearMonth.getValue();
		var etaFrom = new Date(fromDate.setDate(fromDate.getDate()));
		var etaTo = new Date(toDate.setDate(toDate.getDate()));
		var periodDay = Ext.Date.diff(etaFrom, etaTo, Ext.Date.DAY);
		
		if(periodDay > me.MAX_DATE_ALLOW){
			if(control == refs.ctlFromYearMonth){
				me.setDateInDaysByDate("ctlToYearMonth", me.MAX_DATE_ALLOW, control.getValue());
			} else {
				me.setDateInDaysByDate("ctlFromYearMonth", -me.MAX_DATE_ALLOW, control.getValue());
			}
		}

	},
	
	onMonthfieldRetrevie: function(control, newValue , oldValue , eOpts){
		var me = this;
		var refs = me.getReferences();
		var fromDate = refs.ctlFromYearMonth.getValue();
		var toDate = refs.ctlToYearMonth.getValue();
		var etaFrom = new Date(fromDate.setDate(fromDate.getDate()));
		var etaTo = new Date(toDate.setDate(toDate.getDate()));
		
		me.onLoadPlanData(etaFrom, etaTo);
	},
	
	onSearch: function(){
		var me = this;
		var refs = me.getReferences();
		var fromDate = refs.ctlFromYearMonth.getValue();
		var toDate = refs.ctlToYearMonth.getValue();
		var etaFrom = new Date(fromDate.setDate(fromDate.getDate()));
		var etaTo = new Date(toDate.setDate(toDate.getDate()));
		
		me.onLoadPlanData(etaFrom, etaTo);
	},
	
	onLoadPlanData: function(etaFrom, etaTo){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refVesselSchduleListGrid');
		var plansStore = me.getStore('plans');
		var sftPlansStore = me.getStore('sftPlans');
		var metaStore = me.getStore('meta');
		var berthStatus = refs.refBerthStatus.getValue();
		var vslCallId = refs.ctlVesselCallId.getValue();
		var scn = refs.ctlScn.getValue();
		var viewType = refs.refBerthType.getValue();
		var plan = refs.ctlPlanCheckbox.getValue() ? 'Y' : 'N';
		var maintenanceBerthStore = me.getStore('maintenanceBerths');
		var vslShiftingListStore = me.getStore('vslShiftingList');
		
		metaStore.suspendEvents();
		metaStore.getAt(metaStore.findExact('key', 'fromDate')).set('value', Ext.Date.format(etaFrom, 'Y-m-d') + "");
		metaStore.getAt(metaStore.findExact('key', 'toDate')).set('value', Ext.Date.format(etaTo, 'Y-m-d') + "");
		
		Ext.MessageBox.show({
			title: 'Please wait',
			msg: 'Loading vessel schedule data...',
			progressText: 'Loading...',
			width:300,
			wait:true,
			waitConfig: {interval:200}
		});
		plansStore.load({
			params: {
				berthStatus: berthStatus,
				vslCallId : vslCallId,
				scn: scn,
				plan: plan,
				viewType : viewType,
				etaFrom2: etaFrom.getTime(),
				etaTo2: etaTo.getTime(),
				viewMode: refs.refTglWorkMode.getValue()
			},
			callback: function(records, operation, success) {
				if (success) {
					var berthView = me.lookupReference('refBerthView');

					if(vslCallId && records[0]){
						if(records[0].data.berthTp !== refs.refBerthType.getValue()){
							refs.refBerthType.setValue(records[0].data.berthTp);
							me.onLoadPlanData(etaFrom, etaTo);
							
							return;
						}
					}
					
					Ext.MessageBox.hide();
					
					if(vslCallId != '') {
						if (berthView) {
							var selectedBerthPlanIndexes = berthView.getSelectedBerthPlanIndexesById(vslCallId);
							
							if (selectedBerthPlanIndexes) {
								if (selectedBerthPlanIndexes.length > 0) {
									me.getViewModel().set('planIndex', selectedBerthPlanIndexes[0]);
									me.getReferences().refBerthView.selectBerthPlan(plansStore.getAt(selectedBerthPlanIndexes[0]).data);

									var d = me.getReferences().refBerthLayout.body.dom;
									
									if (d) {
										var pos = me.getReferences().refBerthView.getBerthPlanPos(plansStore.getAt(selectedBerthPlanIndexes[0]).data);
										var win = me.getReferences().refBerthLayout;
										var height = me.getReferences().refBerthView.getHeight();
										var width = me.getReferences().refBerthView.getWidth();

										d.scrollTop =  pos[1] - (win.getHeight()/3);
										d.scrollLeft = pos[0] - (win.getWidth() / 2) + pos[2];
									}
								}
							}
						}
						
						if(grid.items.items[0].dataSource != undefined){
							me.getViewModel().set('selectedBerthPlan', grid.items.items[0].dataSource.data.items[0]);
						}
					}

					sftPlansStore.load({
						params: {
							etaFrom2: etaFrom.getTime(),
							etaTo2: etaTo.getTime(),
							viewType : refs.refBerthType.getValue()
						},
						callback: function(records, operation, success) {
							if (success) {
								maintenanceBerthStore.load({
									params: {
										etaFrom2: etaFrom.getTime(),
										etaTo2: etaTo.getTime()
									},
									callback: function(records, operation, success) {
										if (success) {
											me.onDraw();
										}
									}
								});
							}
						}
					});
				}
				plansStore.commitChanges();
			}
		});

		vslShiftingListStore.load({
			params: {
				etaFrom2: etaFrom.getTime(),
				etaTo2: etaTo.getTime(),
				vslCallId : vslCallId,
				scn: scn,			
			},
		});
		metaStore.resumeEvents();
	},

	onClickVesselSchduleList: function(rawmodel, record) {
    	var me = this;
    	var refs = me.getReferences();
    	var grid = rawmodel.view.ownerGrid;

		if(grid.getSelection() == null ? null : grid.getSelection()[0]){
			if(grid.reference === 'refVesselSftSchduleListGrid'){
				me.getViewModel().set('selectedSftBerthPlan', grid.getSelection()[0]);
			}else if(grid.reference === 'refVesselShiftingListGrid'){
				me.getViewModel().set('selectedVslShifting', grid.getSelection()[0]);
			}else {
				me.getViewModel().set('selectedBerthPlan', grid.getSelection()[0]);
			}
		}
		
		if (record.get('vslStat')) {
			if (record.get('vslStat') === 'BBN') {
				refs.refBtnSave.setDisabled(false)
			} else if (record.get('vslStat') === 'BBY') {
				refs.refBtnSave.setDisabled(false)
			} else if (record.get('vslStat') === 'ONB') {
				refs.refBtnSave.setDisabled(true)
			} else if (record.get('vslStat') === 'DPV') {
				refs.refBtnSave.setDisabled(true)
			}
		}
		
    	var plansStore = me.getStore('plans');
    	
    	if(me.getReferences().refBerthView) {
        	var selectedBerthPlanIndexes = me.getReferences().refBerthView.getSelectedBerthPlanIndexesById(record.get('vslCallId'));
        	
            if(selectedBerthPlanIndexes) {
            	if(selectedBerthPlanIndexes.length > 0) {
					me.getViewModel().set('planIndex', selectedBerthPlanIndexes[0]);
					me.getReferences().refBerthView.selectBerthPlan(plansStore.getAt(selectedBerthPlanIndexes[0]).data);
					
					var d = me.getReferences().refBerthLayout.body.dom;
					
					if(d){
						var pos = me.getReferences().refBerthView.getBerthPlanPos(plansStore.getAt(selectedBerthPlanIndexes[0]).data);
						var win = me.getReferences().refBerthLayout;
						var height = me.getReferences().refBerthView.getHeight();
						var width = me.getReferences().refBerthView.getWidth();

						d.scrollTop =  pos[1] - (win.getHeight()/3);
						d.scrollLeft = pos[0] - (win.getWidth()/2) + pos[2];
					}
            	}
            }
        }
    },

	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl == 'ctlVesselCallId'){ 
			if(returnValue){
				refs.ctlScn.setValue(returnValue.item.get('scn'));
				var berthTp = (returnValue.item.data.scd) ? returnValue.item.data.scd :
					(returnValue.item.data.berthTp !== "") ? returnValue.item.data.berthTp : 'WRF';
				/*refs.ctlToYearMonth.setValue(returnValue.item.data.eta);
				refs.ctlFromYearMonth.setValue(returnValue.item.data.eta);*/
				refs.refBerthType.setValue(berthTp);
			} 
		} else if (targetControl === 'ctlScn') {
			if (returnValue) {
				refs.ctlScn.setValue(returnValue.code);

				if (!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))) {
					refs.ctlVesselCallId.setValue(returnValue.item.get('vslCallId'));
				} else {
					refs.ctlVesselCallId.setValue('');
				}
			}
		}
	},
	
	onStartPos:function(){
		var me = this,
			refs = me.getReferences(),
			recvData = me.getView().recvData,
			selectedModel = me.getViewModel().get('selectedBerthPlan'),
			checkValue = me.checkMaintenanceBerth(selectedModel),
			startPos = Number(refs.refStartPos.getValue());

		if(selectedModel === null || !selectedModel.data){
			return;
		}

		if(checkValue.isValid === true){
			if(recvData){
				if(refs.refBerthType.getValue() === 'WRF'){
					recvData.set('wharfMarkFrom',startPos);
					recvData.set('wharfMarkTo', startPos);
				}else{
					recvData.set('wharfMarkFrom', 0);
					recvData.set('wharfMarkTo', 0);
				}
			}
			refs.refBtnSave.setDisabled(false);
		}else{
			
			if(refs.refBerthType.getValue() === 'WRF'){
				selectedModel.set('wharfMarkFrom',startPos);
				selectedModel.set('wharfMarkTo', startPos);
			}else{
				selectedModel.set('wharfMarkFrom', 0);
				selectedModel.set('wharfMarkTo', 0);
			}
			refs.refBtnSave.setDisabled(true);
			
			MessageUtil.warning('warning_msg', 'berthMaintenance_block_msg', [checkValue.maintenanceBerth[0], checkValue.maintenanceBerth[1], Ext.Date.format(checkValue.maintenanceBerth[2], 'd/m/Y H:i'), Ext.Date.format(checkValue.maintenanceBerth[3], 'd/m/Y H:i')] );
			return null;
		}
	},
	
	onEndPos:function(){
	},

	onDblBnkChkboxChange : function(checkbox, newValue, oldValue, eOpts){
		var me = this;
		var selectedModel = me.getViewModel().get('selectedBerthPlan');

		if(selectedModel === null){
			return;
		}

		if(newValue === true){
			selectedModel.set({dblBnkYn : 'Y'});
		} else {
			selectedModel.set({dblBnkYn : 'N'});
		}
	},
	
	onSelectATU: function () {
		var me = this;
    	var refs = me.getReferences();
		var atu = refs.refATU.getValue();

		if (atu) {
			refs.refReason.setDisabled(false);
		} else {
			refs.refReason.setDisabled(true);
		}
	},

	onPrintPDF:function(btn){	
		var me = this;
    	var refs = me.getReferences();
    	var printBayPlanStore = me.getStore('printPDF');
    	var storeMeta = me.getStore('meta');
    	var berthsStore = me.getStore('berths');
		var plansStore = me.getStore('plans');
		var searchType  = "B";
		var viewMode = refs.refTglWorkMode.getValue();
		var tmnlName = MOST.config.Token.getTmnlNm();
		
		if(refs.ctl_berth.getValue().allBerth_radio == 'N' && refs.refPopupBerthType.lastValue == null ){	
			MessageUtil.error('Warning','berth_type_blank');
			return;
		}
		
		var fromDate = refs.ctlFromYearMonth.getValue();
		var toDate = refs.ctlToYearMonth.getValue();
		
		var berthTypeCode = '';
		if(refs.ctl_berth.getValue().allBerth_radio == 'N'){
			berthTypeCode =  refs.refPopupBerthType.lastValue;
		}

		var msgBox = Ext.MessageBox.show({
			msg: 'Ship in Port DownLoading...',
			progressText: 'Progressing...',
			width:300,
			wait:true,
			waitConfig: {interval:200}
		});
    	printBayPlanStore.load({
    		params: {
    			etaFrom2: fromDate.getTime(),
				etaTo2 : toDate.getTime(),
				searchType : searchType,
				berthType: berthTypeCode,
				viewMode : viewMode,
				tmnlName: tmnlName
    		},
    		callback: function(records, operation, success) {
				if(success){
					if(records.length > 0) {
						var content = records[0].data.content.replace(/&lt;/gi,'<').replace(/&gt;/gi,'>');
						Ext.exporter.File.saveBinaryAs(content, records[0].data.fileName);
					}
				}
				msgBox.close();
    		}
    	});
	},
	
	onDetailPreview:function(){
		var me = this;
		var refs = me.getReferences();
		var generatePDF = me.getStore('generatePDF');
		var printBayPlanStore = me.getStore('printPDF');
    	var storeMeta = me.getStore('meta');
    	var berthsStore = me.getStore('berths');
		var plansStore = me.getStore('plans');
		var searchType = "B";
		var viewMode = refs.refTglWorkMode.getValue();
		var tmnlName = MOST.config.Token.getTmnlNm();

		if(refs.ctl_berth.getValue().allBerth_radio == 'N' && refs.refPopupBerthType.lastValue == null ){	
			MessageUtil.error('Warning','berth_type_blank');
			return;
		}
		
		var fromDate = refs.ctlFromYearMonth.getValue();
		var toDate = refs.ctlToYearMonth.getValue();
		
		var berthTypeCode = '';
		if(refs.ctl_berth.getValue().allBerth_radio == 'N'){
			berthTypeCode =  refs.refPopupBerthType.lastValue;
		}
		
		var msgBox = Ext.MessageBox.show({
			msg: 'Ship in Port Preview Loading...',
			progressText: 'Progressing...',
			width:300,
			wait:true,
			waitConfig: {interval:200}
		});
	
		generatePDF.load({
			params: {
				etaFrom2: fromDate.getTime(),
				etaTo2 : toDate.getTime(),
				searchType : searchType,
				berthType: berthTypeCode,
				viewMode : viewMode,
				tmnlName: tmnlName
    		},
			callback: function(records, operation, success) {
				if (success) {
					msgBox.close();
					me.openPDFPreview1(records, operation, success);
				}
			}
		})
	},

	onOpenPrintSettingWindow:function(btn){
		var me = this;
        var refs = me.getReferences();
        var win = me.lookupReference('refPrintSettingPrintWindow');
        if (!win)
        {
        	win = Ext.create('Ext.window.Window',
            {
                reference: 'refPrintSettingPrintWindow',
                title: "Report",
                layout : 'fit',
                resizeHandles : 'all',
                resizable : false,
                maximizable: false,
                constrain : true,
                scrollable : true,
                width : 350, height : 165,
                closeAction : 'destroy',
                items : 
                [{
                    xtype : 'popup-exportpdfpopup',
                }]
                
            });
            me.getView().add(win);
//            me.setDateInDays('ctlFromDt');
        }
        win.show();
	},


	onLoadExportPDFPopup:function(){
		var me = this;
        var refs = me.getReferences();
        var berthType = "";
		
		var popUpBerthTypeCombo = me.getStore('popUpBerthTypeCombo');
		popUpBerthTypeCombo.load();
		
		berthType = refs.refBerthType.getValue();
		
		if(StringUtil.isNullorEmpty(berthType)) {
			var record = popUpBerthTypeCombo.find('scd', berthType);
			refs.refPopupBerthType.setValue(record);
        } else {
        	refs.refPopupBerthType.setValue(berthType);
        }
	},
	
});

var task = new Ext.util.DelayedTask(function() {
	var me = this;
    me.onResizedTask(arguments[0]);
});


