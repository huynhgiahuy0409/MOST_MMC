Ext.define('MOST.view.monitoring.BerthMonitoringController', {
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

    alias: 'controller.berthmonitoring',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
    INIT_DATE_PERIOD : 14,	// MAX PERIOD DATE (a week)
    MAX_DATE_ALLOW : 90,	// MAX PERIOD Month (3 Month)
    UNIT_COMBO_STORE: 'unitCombo',
	unitType: '',
    
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
		var berthsStore = me.getStore('berths');
		var bittsStore = me.getStore('bitts');
		var plansStore = me.getStore('plans');

		var flag;
		var refBerthGrid = me.getReferences().refberthgrid;
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.QUANTITY_COMBOBOX, me.UNIT_COMBO_STORE);
		
		metaStore.load({
			callback: function(records, operation, success) {
				if (success) {
					berthsStore.load({
						callback: function(records, operation, success) {
							if (success) {
								bittsStore.load({
									callback: function(records, operation, success) {
										if (success) {
											plansStore.load({
												//vessel infor
												params: {
												},
												callback: function(records, operation, success) {
													if (success) {
														me.onDraw();
													}
												}
											});
										}
									}
								})		
								
							}
						}
					});				
				}
			}
		});
	},

    onDraw: function() {
    	var me = this;
    	var refs = me.getReferences();
        var canBerth, canMain;
    	var metaStore = me.getStore('meta');
    	var berthsStore = me.getStore('berths');
    	var plansStore = me.getStore('plans');
    	var bittsStore = me.getStore('bitts');
		var bodyWidth = this.view.body.getWidth()
    	
    	canBerth = me.lookupReference('refBerthLayout');
		canBerth.removeAll(true);
    	var berthview = canBerth.add({
    		xtype: 'app-berthmonitoringrenderer',			//draw
    		plugins: ['spriteevents'],
    		reference: 'refBerthView',
    		layout: {
    			type: 'absolute'
    		},
    		storeMeta: metaStore,
    		storeBerth: berthsStore,
    		storeBitt: bittsStore,
    		storeBerthPlan: plansStore,
    		viewMode: refs.refTglWorkMode.getValue(),
    		x: 0,
    		y: 0,
    		width: 1,
        	height: 1,
			bodyWidth: bodyWidth
    	});
    	
    	berthview.on({
            element: 'element',
			mousedown : function(e){
				var renderer = this.component;
               var surface = renderer.getSurface();
                   
               var xy = surface.getEventXY(e), // get tọa độ tại vị trí click
                   x = xy[0],
                   y = xy[1];
			
			
				var selectedBerthPlanIndexes = renderer.getSelectedBerthPlanIndexes(x, y);
				if(selectedBerthPlanIndexes.length > 0) {
					//ToDo: Select Rule or UI for multiple berth plans
					//Temp: use 0 index one
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
				
				if(selectedBerthPlanIndexes.length > 0) {
					var newSelectedBerthPlanIndex = selectedBerthPlanIndexes[0];
					var newSelectedBerthPlan = plansStore.getAt(newSelectedBerthPlanIndex);
					
					me.onLoadCargoFlow(newSelectedBerthPlan.data.jpvcNo);
										
					refs.refVesselSchduleListGrid.getView().bufferedRenderer.scrollTo(newSelectedBerthPlanIndex, true);
					refs.refVesselSchduleListGrid.getSelectionModel().select(plansStore.getAt(newSelectedBerthPlanIndex), false, true);
					refs.refVesselSchduleListGrid.getView().getRow(plansStore.getAt(newSelectedBerthPlanIndex)).scrollIntoView();

				}else{
					me.onClearCargoFlow();
				}
				
//				var orgSelectedBerthPlan = me.getViewModel().get('selectedBerthPlan');
//
//				if(orgSelectedBerthPlan != undefined && renderer.isPlanning){
//					var clonedRecord = orgSelectedBerthPlan.clone();
//					var planedRecord = renderer.doPlanning([renderer.bodySprite.attr.x - renderer.meta.timelineWidth
//							, renderer.bodySprite.attr.y - renderer.meta.berthHeight
//							, renderer.bodySprite.attr.width
//							, renderer.bodySprite.attr.height]
//						, orgSelectedBerthPlan.data, orgSelectedBerthPlan);
//           		
//           		if(planedRecord) {
//           			me.getViewModel().get('undoStack').push(clonedRecord);
//           			me.getViewModel().set('undoRemained', me.getViewModel().get('undoStack').length);
//           			
//           			var recvData = me.getView().recvData;
//           			if(recvData){
//           				if(refs.refBerthType.getValue() === 'WRF'){
//		            			recvData.set('wharfMarkFrom',planedRecord.data.startPos);
//		            			recvData.set('wharfMarkTo', planedRecord.data.endPos);
//           				}else{
//           					recvData.set('wharfMarkFrom', 0);
//           					recvData.set('wharfMarkTo', 0);
//           				}
//           			}
//           		}
//				} else if(selectedBerthPlanIndexes.length > 0 && orgSelectedBerthPlan != undefined) {
//					var newSelectedBerthPlanIndex = selectedBerthPlanIndexes[0];
//					var newSelectedBerthPlan = plansStore.getAt(newSelectedBerthPlanIndex);
//					if(orgSelectedBerthPlan.get('jpvcNo') == newSelectedBerthPlan.get('jpvcNo') && !renderer.isPlanning){
//						//select the row of grid
//						me.getViewModel().set('planIndex', newSelectedBerthPlan);
//						renderer.selectBerthPlan(plansStore.getAt(newSelectedBerthPlanIndex).data);
//						refs.refVesselSchduleListGrid.getView().bufferedRenderer.scrollTo(newSelectedBerthPlanIndex, true);
//						refs.refVesselSchduleListGrid.getSelectionModel().select(plansStore.getAt(newSelectedBerthPlanIndex), false, true);
//						refs.refVesselSchduleListGrid.getView().getRow(plansStore.getAt(newSelectedBerthPlanIndex)).scrollIntoView();
//						return;
//					}
//				}
				renderer.onMouseLeave();
				me.getViewModel().setData('selectedBerthPlan', -1);
				me.getViewModel().setData('planIndex', -1);
			},

//            mousemove: function(e) {
//            	if(me.planSprite && me.planSprite.customId) {
//	            	var renderer = this.component;
//	            	var refs = me.getReferences();
//                
//        			renderer.onMouseMove(e, me.planSprite.customId, me.getViewModel().get('selectedBerthPlan').data, 
//    					[{
//    						// pressed: refs.refSnapBerth.pressed,
//    						pressed: false,
//    						value: 10
//    					}, {
//    						// pressed: refs.refSnapTime.pressed,
//    						pressed: false,
//    						value: 30
//    					}]);
//
//            	}
//            },

//			mouseleave: function(e) {
//        		var renderer = this.component;
//                
//            	if(me.planSprite) {
//            		renderer.onMouseLeave();
//            		me.planSprite = null;
//            	}
//		    }
    	});

        //Must split adding event     
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
    	});
    	
    	var loopCount = 0;
    	var timer = setInterval (function() {
    		if(me.getReferences() && me.getReferences().refBerthView) {
    			
    			if(me.getReferences().refBerthView && me.getReferences().refBerthView.isCompleted) {
					clearInterval(timer);
					
					var selectedBerthPlanIndexes = me.getReferences().refBerthView.getSelectedBerthPlanIndexesById(refs.ctlJpvc.getValue());
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

								//d.scrollTop = pos[1] - (win.getHeight() / 2) + pos[3];
								d.scrollTop =  pos[1] - (win.getHeight()/3);
								d.scrollLeft = pos[0] - (win.getWidth() / 2) + pos[2];
							}
						}else{
                            var record = me.getViewModel().get('selectedBerthPlan');
                            if(record){
	                            var selectedBerthPlanIndexes = me.getReferences().refBerthView.getSelectedBerthPlanIndexesById(record.get('jpvcNo'));
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
	
											//d.scrollTop = pos[1] - (win.getHeight() / 2) + pos[3];
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
//						me.onSearchClick();
						//me.onDraw();
					}
				}
			});
		}
    },
    
    onRemove: function(){
    	
    },
    
    onExportExcelPdfWithServer: function(){
    	var me = this;
		var refs = me.getReferences();
		var searchBizParm = me.getSearchCondition();
		searchBizParm.classID = 'com.tsb.most.biz.parm.codes.SearchCodeMasterParm';
		searchBizParm.serviceID = 'MOST.codeMaster.selectDetailCodeList'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
    },
    
    timelineValidation: function(){
    	var me = this;
		var plansStore = me.getStore('plans');
		
		var arrayData = plansStore.getModifiedRecords();
		for (var idx = 0; idx < arrayData.length; idx ++){
			var record = arrayData[idx];
			//Actual Date
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
 			
 			//Estimated Date
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
 			
 			// fixed issue 0118576 by Harry 
// 			if(numETA2ETB || numETA2ETW || numETA2ETC || numETA2ETU || numETA2ETD
// 				||numETB2ETW || numETB2ETC || numETB2ETU || numETB2ETD
// 				|| numETW2ETC || numETW2ETU || numETW2ETD
// 				|| numETC2ETU || numETC2ETD
// 				|| numETU2ETD){
// 				MessageUtil.alert('warning_msg', 'vessel_esttimeline_msg');
// 				return false;
// 			}
 			
 			//update ATU without ATB
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
		
//		if(berthType.getValue() ==='WRF'){
//			refs.refStartPos.setVisible(true);
//			refs.refEndPos.setVisible(true);
//		}else{
//			refs.refStartPos.setVisible(false);
//			refs.refEndPos.setVisible(false);			
//		}
		
		plansStore.filter('berthTp', berthType.getValue());
		berthsStore.fireEvent('load');
	},
	
	onChangeBerthLocation:function(e, newValue, eOpts ) {
		var me = this;
		
		var selecetedRecord = me.getViewModel().get('selectedBerthPlan');
		if(!selecetedRecord) return null;
		
		selecetedRecord.set('startPos', newValue.data.startPos);
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

		//var fromDate = refs.ctlFromYearMonth.getValue();
		//var toDate = refs.ctlToYearMonth.getValue();
		
		//var etaFrom = new Date(fromDate.setDate(fromDate.getDate()));
		//var etaTo = new Date(toDate.setDate(toDate.getDate()));
		
		me.onLoadPlanData();
	},
	
	onLoadPlanData: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refVesselSchduleListGrid');
		
		var plansStore = me.getStore('plans');
		//var sftPlansStore = me.getStore('sftPlans');
		//var metaStore = me.getStore('meta');
		
		//var berthStatus = refs.refBerthStatus.getValue();
		//var vslCallId = refs.ctlJpvc.getValue();
		//var viewType = refs.refBerthType.getValue();
		//var plan = refs.ctlPlanCheckbox.getValue() ? 'Y' : 'N';
		//metaStore.suspendEvents();
		//metaStore.getAt(metaStore.findExact('key', 'fromDate')).set('value', Ext.Date.format(etaFrom, 'Y-m-d') + "");
		//metaStore.getAt(metaStore.findExact('key', 'toDate')).set('value', Ext.Date.format(etaTo, 'Y-m-d') + "");
		
		// Ext.MessageBox.show({
		// 	title: 'Please wait',
		// 	msg: 'Loading vessel schedule data...',
		// 	progressText: 'Loading...',
		// 	width:300,
		// 	wait:true,
		// 	waitConfig: {interval:200}
		// });
		plansStore.load({
			
			callback: function(records, operation, success) {
				if (success) {
				//	me.onDraw();
				}
			}
		});
		//metaStore.resumeEvents();
	},

	/**
	 * Mouse Events
	 */
	onClickVesselSchduleList: function(rawmodel, record) {
    	var me = this;
    	var refs = me.getReferences();
    	var grid = rawmodel.view.ownerGrid;

		if(grid.getSelection() == null ? null : grid.getSelection()[0]){
			if(grid.reference === 'refVesselSftSchduleListGrid'){
				me.getViewModel().set('selectedSftBerthPlan', grid.getSelection()[0]);
			} else {
				me.getViewModel().set('selectedBerthPlan', grid.getSelection()[0]);
			}
		}
		
		if (record.get('vslStat')) {
			if (record.get('vslStat') === 'BBN') {
				refs.refbtnSave.setDisabled(false)
			} else if (record.get('vslStat') === 'BBY') {
				refs.refbtnSave.setDisabled(false)
			} else if (record.get('vslStat') === 'ONB') {
				refs.refbtnSave.setDisabled(true)
			} else if (record.get('vslStat') === 'DPV') {
				refs.refbtnSave.setDisabled(true)
			}
		}
		
    	var plansStore = me.getStore('plans');
    	if(me.getReferences().refBerthView) {
        	var selectedBerthPlanIndexes = me.getReferences().refBerthView.getSelectedBerthPlanIndexesById(record.get('jpvcNo'));
            if(selectedBerthPlanIndexes) {
            	if(selectedBerthPlanIndexes.length > 0) {
					me.getViewModel().set('planIndex', selectedBerthPlanIndexes[0]);
					//me.getReferences().refBerthView.selectBerthPlan(plansStore.getAt(selectedBerthPlanIndexes[0]).data);
					me.onLoadCargoFlow(plansStore.getAt(selectedBerthPlanIndexes[0]).data.jpvcNo);
					
					var d = me.getReferences().refBerthLayout.body.dom;
					if(d){
						var pos = me.getReferences().refBerthView.getBerthPlanPos(plansStore.getAt(selectedBerthPlanIndexes[0]).data);
						var win = me.getReferences().refBerthLayout;
						var height = me.getReferences().refBerthView.getHeight();
						var width = me.getReferences().refBerthView.getWidth();

						//d.scrollTop =  pos[1] - (win.getHeight()/2) + pos[3];
						d.scrollTop =  pos[1] - (win.getHeight()/3);
						d.scrollLeft = pos[0] - (win.getWidth()/2) + pos[2];
					}
            	}
            }
        }
    },

	// onClickVesselSftSchduleList: function(grid, record) {
	// 	var me = this;
	// 	var grid = me.lookupReference('refVesselSftSchduleListGrid');
	// 	if(grid.getSelection() == null ? null : grid.getSelection()[0]){
	// 		me.getViewModel().set('selectedSftBerthPlan', grid.getSelection()[0]);
	// 	}
	//
	// 	// var plansStore = me.getStore('sftPlans');
	// 	var plansStore = me.getStore('plans');
	// 	if(me.getReferences().refBerthView) {
	// 		var selectedBerthPlanIndexes = me.getReferences().refBerthView.getSelectedBerthPlanIndexesById(record.get('jpvcNo'));
	//
	// 		if(selectedBerthPlanIndexes) {
	// 			if(selectedBerthPlanIndexes.length > 0) {
	// 				me.getViewModel().set('planIndex', selectedBerthPlanIndexes[0]);
	// 				me.getReferences().refBerthView.selectBerthPlan(plansStore.getAt(selectedBerthPlanIndexes[0]).data);
	//
	// 				var d = me.getReferences().refBerthLayout.body.dom;
	// 				if(d){
	// 					var pos = me.getReferences().refBerthView.getBerthPlanPos(plansStore.getAt(selectedBerthPlanIndexes[0]).data);
	// 					var win = me.getReferences().refBerthLayout;
	// 					var height = me.getReferences().refBerthView.getHeight();
	// 					var width = me.getReferences().refBerthView.getWidth();
	//
	// 					d.scrollTop =  pos[1] - (win.getHeight()/2) + pos[3];
	// 					d.scrollLeft = pos[0] - (win.getWidth()/2) + pos[2];
	// 				}
	// 			}
	// 		}
	// 	}
	// },
    
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl == 'ctlJpvc'){ 
			if(returnValue){
				var berthTp = (returnValue.item.data.scd) ? returnValue.item.data.scd :
					(returnValue.item.data.berthTp !== "") ? returnValue.item.data.berthTp : 'WRF';
				refs.ctlYearMonth.setValue(returnValue.item.data.eta);
				refs.refBerthType.setValue(berthTp);
			} 
		}
	},
	
	onStartPos:function(){
		var me = this;
		var refs = me.getReferences();
		
		var recvData = me.getView().recvData;
		if(recvData){
			if(refs.refBerthType.getValue() === 'WRF'){
    			recvData.set('wharfMarkFrom',refs.refStartPos.getValue());
    			recvData.set('wharfMarkTo', refs.refStartPos.getValue());
			}else{
				recvData.set('wharfMarkFrom', 0);
				recvData.set('wharfMarkTo', 0);
			}
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
                width : 250, height : 120,
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
	
	onPrintPDF:function(btn){	
		var me = this;
    	var refs = me.getReferences();
    	var printBayPlanStore = me.getStore('printPDF');
    	var storeMeta = me.getStore('meta');
    	var berthsStore = me.getStore('berths');
		var plansStore = me.getStore('plans');
		var searchType;
		var viewMode = refs.refTglWorkMode.getValue();
		
//		if(refs.ctlFromDt.getValue() == null){
//			MessageUtil.error('Warning','eta_blank');
//			return;
//		}else{
//			if(refs.refPopupBerthType.lastValue == null ){	
//				MessageUtil.error('Warning','berth_type_blank');
//				return;
//			
//			}
//		}
//		
//		var fromDate = Ext.Date.format(refs.ctlFromDt.getValue(),"Y-m-d");
//		var etaFrom = Ext.Date.parse(fromDate, "Y-m-d");
//		var toDate = Ext.Date.format(refs.ctlFromDt.getValue(), "Y-m-d");
//		var etaTo = Ext.Date.parse(toDate, "Y-m-d");
		
		if(refs.refPopupBerthType.lastValue == null ){	
			MessageUtil.error('Warning','berth_type_blank');
			return;
		}
		
		var today = new Date();
		var fromDate = Ext.Date.format(today,"Y-m-d");
		var etaFrom = Ext.Date.parse(fromDate, "Y-m-d");
		var toDate = Ext.Date.format(today, "Y-m-d");
		var etaTo = Ext.Date.parse(toDate, "Y-m-d");

		etaTo.setDate(etaTo.getDate()+4);
		
		var berthTypeCode =  refs.refPopupBerthType.lastValue

		if(berthTypeCode=="B"){
			searchType = "B"
		}else{
			searchType = "L"
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
    			etaFrom2: etaFrom.getTime(),
				etaTo2 : etaTo.getTime(),
				searchType : searchType,
				viewMode : viewMode
    		},
    		callback: function(records, operation, success) {
    			msgBox.close();
    			var content = records[0].data.content.replace(/&lt;/gi,'<').replace(/&gt;/gi,'>');
	        	Ext.exporter.File.saveBinaryAs(content, records[0].data.fileName);
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
		var searchType;
		var viewMode = refs.refTglWorkMode.getValue();
		
//		if(refs.ctlFromDt.getValue() == null){
//			MessageUtil.error('Warning','eta_blank');
//			return;
//		}else{
//			if(refs.refPopupBerthType.lastValue == null ){	
//				MessageUtil.error('Warning','berth_type_blank');
//				return;
//			
//			}
//		}
//		var fromDate = Ext.Date.format(refs.ctlFromDt.getValue(),"Y-m-d");
//		var etaFrom = Ext.Date.parse(fromDate, "Y-m-d");
//		var toDate = Ext.Date.format(refs.ctlFromDt.getValue(), "Y-m-d");
//		var etaTo = Ext.Date.parse(toDate, "Y-m-d");
		

		if(refs.refPopupBerthType.lastValue == null ){	
			MessageUtil.error('Warning','berth_type_blank');
			return;
		}
		
		var today = new Date();
		var fromDate = Ext.Date.format(today,"Y-m-d");
		var etaFrom = Ext.Date.parse(fromDate, "Y-m-d");
		var toDate = Ext.Date.format(today, "Y-m-d");
		var etaTo = Ext.Date.parse(toDate, "Y-m-d");

		etaTo.setDate(etaTo.getDate()+4);
		
		var berthTypeCode =  refs.refPopupBerthType.lastValue

		if(berthTypeCode=="B"){
			searchType = "B"
		}else{
			searchType = "L"
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
    			etaFrom2: etaFrom.getTime(),
				etaTo2 : etaTo.getTime(),
				searchType : searchType,
				viewMode : viewMode
    		},
			callback: function(records, operation, success) {
				if (success) {
					msgBox.close();
					me.openPDFPreview (records, operation, success);
				}
			}
		})
	},
	
	onLoadCargoFlow:function(vslCallId){
		var me = this;
		var refs = me.getReferences();
		var disCmmdstore = me.getStore('dischargingcommoditylist');
		var loadCmmdstore = me.getStore('loadingcommoditylist');
		var plansStore = me.getStore('plans');
		var unitType = me.unitType;
		if(unitType == ''){
			unitType = 'MT';
		}
		
		refs.ctlVslCallId.setHidden(false);
		refs.ctlUnit.setHidden(false);
		refs.ctlVslCallId.setText(vslCallId);
		
		disCmmdstore.load({
    		params: {
    			vslCallId:vslCallId,
				unitTp: unitType
			},
			callback: function(records, operation, success) {
				me.summaryDischargingByVsl(records, vslCallId);
				loadCmmdstore.load({
		    		params: {
		    			vslCallId:vslCallId,
						unitTp: unitType
					},
					callback: function(records, operation, success) {
						me.summaryLoadingByVsl(records);
						
						var selectedBerthPlanIndexes = me.getReferences().refBerthView.getSelectedBerthPlanIndexesById(vslCallId);
						me.getReferences().refBerthView.selectBerthPlan(plansStore.getAt(selectedBerthPlanIndexes[0]).data);

						if(me.unitType != ''){
							refs.ctlUnit.setValue(me.unitType);
						}
					}
				})
			}
		})
	},

	onSelectUnitType: function(){
		var me = this;
		var refs = me.getReferences();

		me.unitType = refs.ctlUnit.getValue();
		var vslCallId = refs.ctlVslCallId.text;
		this.onLoadCargoFlow(vslCallId);
		
	},
	
	summaryDischargingByVsl:function(records, vslCallId){
		var me = this;
		var refs = me.getReferences();
		
		refs.refDischargeCmmd.removeAll();
		
		if(records.length > 0) {
						
			var disName = {
					xtype: 'label',
	                //margin: '30 0 0 0',
	                width: 200,
	                style: "font-weight:bold;font-size:15px;display:inline-block;text-align:center;color:BLACK",
	            	text: ViewUtil.getLabel('discharging')
	        };
			
			refs.refDischargeCmmd.add(disName);
			
			for(var i=0;i<records.length;i++){
				var item = records[i];
				var disCmmdField = {
						xtype: 'fieldset',
						reference:'refdisCmmdField'+i,
						style: { "background-color":"white" },
						width: 350,
						margin: '2 0 0 2',
				    	layout: {
				    		type: 'vbox',
				            align: 'stretch'
			    		},
		            	items:[{}]};
				

				var disCmmdTotal = {
						xtype: 'progressbarwidget',
						reference:'disCmmdTotal'+i,
						style: "background-color: white; border: 1px solid;color:#eef73b;",
	                    textTpl: [
	                    	'<span style="font-weight:bold;display:inline-block;color:red;font-size:13px">' + item.get('cmmdSumTotal') +  '</span>'
	                    ],
	                    value: item.get('percentage'),
	                    margin: '2 0 2 0',
	                    width: 320
				};

				
				var disCmmdInDirect = {
						xtype: 'progressbarwidget',
						reference:'disCmmdInDirect'+i,
	                    style: "background-color: white; border: 1px solid;color:#3bcbf7",
	                    textTpl: [
	                    	'<span style="font-weight:bold;display:inline-block;text-align:left;">' + '<i class="fa fa-check-square-o"></i> ' + item.get('cmmdSumIndirect') +  '</span>'
	                    ],
	                    value: item.get('whPercentage'),
	                    margin: '2 0 2 0',
	                    width: 320
				};

				var disCmmdDirect = {
						xtype: 'progressbarwidget',
						reference:'disCmmdDirect'+i,
	                    style: "background-color: white; border: 1px solid;color:#3bcbf7",
	                    textTpl: [
	                    	'<span style="font-weight:bold;display:inline-block;text-align:left;">' + '<i class="fa fa-check-square-o"></i> ' + item.get('cmmdSumDirect') +  '</span>'
	                    ],
	                    value: item.get('truckPercentage'),
	                    width: 320,
	                    margin: '2 0 2 0'
				};
				
				var disCmmdDirectByBarge = {
						xtype: 'progressbarwidget',
						reference:'disCmmdDirectByBarge'+i,
	                    style: "background-color: white; border: 1px solid;color:#3bcbf7",
	                    textTpl: [
	                    	'<span style="font-weight:bold;display:inline-block;text-align:left;">' + '<i class="fa fa-check-square-o"></i> ' + item.get('cmmdSumDirectByBarge') +  '</span>'
	                    ],
	                    value: item.get('vslPercentage'),
	                    width: 320
				};
				
				refs.refDischargeCmmd.add(disCmmdField);

				me.lookupReference("refdisCmmdField"+i).add(disCmmdTotal);
				me.lookupReference("refdisCmmdField"+i).add(disCmmdInDirect);
				me.lookupReference("refdisCmmdField"+i).add(disCmmdDirect);
				me.lookupReference("refdisCmmdField"+i).add(disCmmdDirectByBarge);
				
				me.getViewModel().setData({["theDisCmmd"+i]:records[i]})
				
				//config CSS--------------------------------------------------------
				//Total
				var totalRefEl = me.lookupReference("disCmmdTotal"+i).getEl();
				totalRefEl.child(".x-progress-bar", true).style.backgroundColor = "#eef73b9c";//4caf509c
				totalRefEl.child(".x-progress-bar", true).style.backgroundImage = "none";
//				totalRefEl.child(".x-progress-text", true).style.textAlign = "left";
//				totalRefEl.child(".x-progress-text", true).style.color = "red";
//				totalRefEl.child(".x-progress-text", true).style.fontSize = "13px";
				
				//Direct by Truck
				var truckRefEl = me.lookupReference("disCmmdDirect"+i).getEl();
				truckRefEl.child(".x-progress-bar", true).style.backgroundColor = "#1a9cd9";
				truckRefEl.child(".x-progress-bar", true).style.backgroundImage = "none";
				
				//Direcct by Vsl
				var vslRefEl = me.lookupReference("disCmmdDirectByBarge"+i).getEl();
				vslRefEl.child(".x-progress-bar", true).style.backgroundColor = "#1a9cd9";
				vslRefEl.child(".x-progress-bar", true).style.backgroundImage = "none";
				
				//Indirect (WH)
				var whRefEl = me.lookupReference("disCmmdInDirect"+i).getEl();
				whRefEl.child(".x-progress-bar", true).style.backgroundColor = "#1a9cd9";
				whRefEl.child(".x-progress-bar", true).style.backgroundImage = "none";
			}

			
		}
		
	},
	
	summaryLoadingByVsl:function(records){
		var me = this;
		var refs = me.getReferences();
		
		refs.refLoadingCmmd.removeAll();
		
		if(records.length > 0) {
			var loadName = {
					xtype: 'label',
	                //margin: '30 0 0 0',
	                width: 200,
	                style: "font-weight:bold;font-size:15px;display:inline-block;text-align:center;color:BLACK",
	            	text: ViewUtil.getLabel('loading')
	        };
			
			refs.refLoadingCmmd.add(loadName);
			
			for(var i=0;i<records.length;i++){
				var item = records[i];
				var loadCmmdField = {
						xtype: 'fieldset',
						reference:'refloadCmmdField'+i,
						style: { "background-color":"white" },
						width: 350,
						margin: '2 0 0 2',
				    	layout: {
				    		type: 'vbox',
				            align: 'stretch'
			    		},
		            	items:[{}]};
				

				var loadCmmdTotal = {
						xtype: 'progressbarwidget',
						reference:'loadCmmdTotal'+i,
						style: "background-color: white; border: 1px solid;color:#eef73b;",
	                    textTpl: [
	                    	'<span style="font-weight:bold;display:inline-block;color:red;font-size:13px">' + item.get('cmmdSumTotal') +  '</span>'
	                    ],
	                    value: item.get('percentage'),
	                    margin: '2 0 2 0',
	                    width: 320
				};

				
				var loadCmmdInDirect = {
						xtype: 'progressbarwidget',
						reference:'loadCmmdInDirect'+i,
	                    style: "background-color: white; border: 1px solid;color:#3bcbf7",
	                    textTpl: [
	                    	'<span style="font-weight:bold;display:inline-block;text-align:left;">' + '<i class="fa fa-check-square-o"></i> ' + item.get('cmmdSumIndirect') +  '</span>'
	                    ],
	                    value: item.get('whPercentage'),
	                    margin: '2 0 2 0',
	                    width: 320
				};

				var loadCmmdDirect = {
						xtype: 'progressbarwidget',
						reference:'loadCmmdDirect'+i,
	                    style: "background-color: white; border: 1px solid;color:#3bcbf7",
	                    textTpl: [
	                    	'<span style="font-weight:bold;display:inline-block;text-align:left;">' + '<i class="fa fa-check-square-o"></i> ' + item.get('cmmdSumDirect') +  '</span>'
	                    ],
	                    value: item.get('truckPercentage'),
	                    width: 320,
	                    margin: '2 0 2 0'
				};
				
				var loadCmmdDirectByBarge = {
						xtype: 'progressbarwidget',
						reference:'loadCmmdDirectByBarge'+i,
	                    style: "background-color: white; border: 1px solid;color:#3bcbf7",
	                    textTpl: [
	                    	'<span style="font-weight:bold;display:inline-block;text-align:left;">' + '<i class="fa fa-check-square-o"></i> ' + item.get('cmmdSumDirectByBarge') +  '</span>'
	                    ],
	                    value: item.get('vslPercentage'),
	                    width: 320
				};
				
				refs.refLoadingCmmd.add(loadCmmdField);

				me.lookupReference("refloadCmmdField"+i).add(loadCmmdTotal);
				me.lookupReference("refloadCmmdField"+i).add(loadCmmdInDirect);
				me.lookupReference("refloadCmmdField"+i).add(loadCmmdDirect);
				me.lookupReference("refloadCmmdField"+i).add(loadCmmdDirectByBarge);
				
				me.getViewModel().setData({["theLoadCmmd"+i]:records[i]})
				
				//config CSS--------------------------------------------------------
				//Total
				var totalRefEl = me.lookupReference("loadCmmdTotal"+i).getEl();
				totalRefEl.child(".x-progress-bar", true).style.backgroundColor = "#eef73b9c";//4caf509c
				totalRefEl.child(".x-progress-bar", true).style.backgroundImage = "none";
				
				//Direct by Truck
				var truckRefEl = me.lookupReference("loadCmmdDirect"+i).getEl();
				truckRefEl.child(".x-progress-bar", true).style.backgroundColor = "#1a9cd9";
				truckRefEl.child(".x-progress-bar", true).style.backgroundImage = "none";
				
				//Direcct by Vsl
				var vslRefEl = me.lookupReference("loadCmmdDirectByBarge"+i).getEl();
				vslRefEl.child(".x-progress-bar", true).style.backgroundColor = "#1a9cd9";
				vslRefEl.child(".x-progress-bar", true).style.backgroundImage = "none";
				
				//Indirect (WH)
				var whRefEl = me.lookupReference("loadCmmdInDirect"+i).getEl();
				whRefEl.child(".x-progress-bar", true).style.backgroundColor = "#1a9cd9";
				whRefEl.child(".x-progress-bar", true).style.backgroundImage = "none";
			}
		}
		
	},
	
	onClearCargoFlow: function(){
		var me = this;
		var refs = me.getReferences();
		refs.refDischargeCmmd.removeAll();
		refs.refLoadingCmmd.removeAll();
		refs.ctlVslCallId.setHidden(true);
		refs.ctlUnit.setHidden(true);
	}
});



var task = new Ext.util.DelayedTask(function() {
	var me = this;
    me.onResizedTask(arguments[0]);
});
