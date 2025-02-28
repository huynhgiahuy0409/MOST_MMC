// Client logic javascript file
Ext.define('MOST.view.dashboard.BBTDashboardController', {
	extend: 'MOST.view.foundation.BaseViewController',

	alias: 'controller.bbtdashboard',

	listen: {
		controller: {
			'*': {
				onAfterAccidentUpdate: 'onAfterAccidentUpdate'
			}
		}
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */

	REFRESH_INTERVAL: 300000,

	WORK_YMD_FORMAT : 'Ymd',
	MIDNIGHT_2400 : '2400',
	MIDNIGHT_0000 : '0000',
	CG_OPE_LOAD : 'LD',
	CG_OPE_DISCHARGE : 'DS',
	BULK_TP_DRY_BREAK : 'BREAK',
	BULK_TP_LIQUID : 'LIQUID',
	SHIFT_COMPARE_AFTER : 1,
	SHIFT_COMPARE_BEFORE : -1,
	HRS : '',
	MT : '',
	MTHR : '',
	WHYD_LABELS : {
		DS : '',
		LD : '',
		HO : '',
		HI : ''
	},

	colors: {
		LIQUID : {
			fillStyle : "#ff8809",
			strokeStyle: "#b85b00"
		},
		BREAK : {
			fillStyle : "#526207",
			strokeStyle: "#435100"
		},
		DRY : {
			fillStyle : "#94ae0a",
			strokeStyle : "#697c07"
		}
	},

	workYmd : '',
	shftId : '',
	currWorkYmd: '',
	currShftId: '',
	fromDt : '',
	toDt : '',

	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
		var me = this;
		me.loadShiftCombo(true);
		me.onVesselCountLoad();
		me.onWeatherForecastLoad();
		me.setFinalVars();
		me.refreshOnEveryFiveMinutes();
	},

	loadShiftCombo : function(isInit){
		var me = this;
		var store = me.getStore('shiftCombo');

		if(store === null){
			var viewModel = MOST.app.getModel('MOST.view.dashboard.BBTDashboardModel').create();
			store = viewModel.getStore('shiftCombo');
		}

		store.load({
				params: {
					useYn: 'Y',
					divCd: 'OT0005' //Vessel Operator shift
				},
				callback: function (records, operation, success) {
					var isCurrentSelected = (isInit) ? isInit : (me.workYmd === me.currWorkYmd && me.shftId === me.currShftId);
					me.selectCurrentShift(records, isCurrentSelected);

					if(isCurrentSelected){
						me.loadManualCharts();
					}
				}
			}
		);
	},

	selectCurrentShift: function(records, isCurrentSelected){
		var me = this;
		var date = new Date();
		var formattedHhmm = Ext.Date.format(date, 'Hi');
		var combo = me.lookupReference('refShift');
		
		Ext.Array.each(records, function(shift){
			var fromDt = shift.get('fmHhmm');
			var toDt = shift.get('toHhmm');
			if(me.isTimeBefore(fromDt, toDt)
				&& !me.isTimeBefore(formattedHhmm, fromDt)
				&& me.isTimeBefore(formattedHhmm, toDt)) {	// On same day shift and current time between shift
				me.currShftId = shift.get('shftId');

				if(isCurrentSelected)
					combo.setValue(shift);

			} else if(!me.isTimeBefore(fromDt, toDt)){	// On shift between two days
				if(!me.isTimeBefore(formattedHhmm, fromDt)
					&& (me.isTimeBefore(formattedHhmm, me.MIDNIGHT_2400) || formattedHhmm === me.MIDNIGHT_2400)){	// if curr time before midnight
					me.currShftId = shift.get('shftId');

					if(isCurrentSelected)
						combo.setValue(shift);

				} else if (me.isTimeBefore(formattedHhmm, toDt)
					&& !(me.isTimeBefore(formattedHhmm, me.MIDNIGHT_0000) || formattedHhmm === me.MIDNIGHT_0000)) {	// if curr time after midnight
					me.workYmd = Ext.Date.format(date-1, me.WORK_YMD_FORMAT);
					me.currWorkYmd = Ext.Date.format(date-1, me.WORK_YMD_FORMAT);
					me.currShftId = shift.get('shftId');

					if(isCurrentSelected)
						combo.setValue(shift);
				}
			}
		});
		me.initializeDate(date, isCurrentSelected);
	},

	isTimeBefore: function(fmTm, toTm){
		var me = this;
		return fmTm.localeCompare(toTm) === me.SHIFT_COMPARE_BEFORE;
	},

	initializeDate : function(date, isCurrentSelected){
		var me = this;
		var datefield = me.lookupReference('refShiftDate');
		
		if(isCurrentSelected) {
			datefield.setValue(date);
		}

		me.currWorkYmd = Ext.Date.format(date, me.WORK_YMD_FORMAT);
		if (isCurrentSelected) {
			me.workYmd = Ext.Date.format(date, me.WORK_YMD_FORMAT);
		}
		
		me.refreshLiveData();
	},

	loadCompareCharts : function(){
		var me = this;
		var breakDrystore = me.getStore('breakBulkHandlingBalanceStore');
		var liquidstore = me.getStore('liquidBulkHandlingBalanceStore');
		var combo = me.lookupReference('refShift');
		var record = combo.getSelectedRecord();

		breakDrystore.load({
			params : {
				type : me.BULK_TP_DRY_BREAK,
				workYmd: me.workYmd,
				shftId : record.get('shftId'),
				fmHhmm : record.get('fmHhmm'),
				toHhmm : record.get('toHhmm')
			}
		});
		liquidstore.load({
			params : {
				type : me.BULK_TP_LIQUID,
				workYmd: me.workYmd,
				shftId : record.get('shftId'),
				fmHhmm : record.get('fmHhmm'),
				toHhmm : record.get('toHhmm')
			}
		});
	},

	setFinalVars : function(){
		var me = this;
		me.HRS = MOST.getApplication().bundle.getMsg('saHrs');
		me.MT = MOST.getApplication().bundle.getMsg('mt');
		me.MTHR = MOST.getApplication().bundle.getMsg('vorMtHour');
		me.WHYD_LABELS = {
			DS : MOST.getApplication().bundle.getMsg('dischargeToWarehouse'),
			LD : MOST.getApplication().bundle.getMsg('loadFromWarehouse'),
			HO : MOST.getApplication().bundle.getMsg('handlingOut'),
			HI : MOST.getApplication().bundle.getMsg('handlingIn')
		};
	},

	// Vessel Count Init
	onVesselCountLoad: function(){
		var me = this;
		var store = me.getStore('vesselCountStore');
		var wharvesCount = me.lookupReference('refWharvesCount');
		var anchorageCount = me.lookupReference('refAnchorageCount');
		store.load({
			callback : function(records, operation ,success){
				if(success){
					wharvesCount.setHtml(
						'<div style="height: 100%;background-color: #0d47a1;' +
						'color: #FFFFFF;text-align:center;margin-top: 10px;margin-bottom: 10px;' +
						'padding-right: 10px; padding-left: 10px;' +
						'border-radius: 5px;border: 1px solid #4C45FF">' +
							'<h2>'+ records[0].get('vslBerthCnt')+'</h2>' +
						'</div>');
					anchorageCount.setHtml(
						'<div style="height: 100%;background-color: #95C6FF;' +
						'color: #000000;text-align:center;margin-top: 10px;margin-bottom: 10px;' +
						'padding-right: 10px; padding-left: 10px;' +
						'border-radius: 5px;border: 1px solid #4C45FF">' +
							'<h2>'+ records[0].get('vslAnchCnt')+'</h2>' +
						'</div>');
				}
			}
		})
	},

	// Weather Forecast Init
	onWeatherForecastLoad: function(){
		var me = this;
		var store = me.getStore('weatherForecastStore');
		var ref = me.lookupReference('refWeatherForecastView');

		store.load({
			callback: function(records, operation ,success){
				if(success){
					var record = records[0].data;
					ref.removeAll();
					if(record.weatherForecastResult !== null){
						me.setCurrentWeatherTpl(records);
						me.setFutureWeatherTpl(records);
					} else {
						me.setNullWeatherData();
					}
				}
			}
		})
	},

	setCurrentWeatherTpl : function(result){
		var me = this;
		var ref = me.lookupReference('refWeatherForecastView');
		
		var component = ref.add({
			xtype: 'component',
			flex : 1,
			html : '<span style="text-align: center;">' +
						'Current</br>' +
						'<img src="./resources/images/weather/icons/' + result[0].get("weather")[0].icon+ '.png" width="40" height="40" alt="' +result[0].get("weather")[0].description+ '"/></br>' +
						result[0].get("temp") + '&#8451;' +
					'</span>'
		});
		
		me.appendTooltip(component, result[0]);

	},

	setFutureWeatherTpl : function(result){
		var me = this;
		var ref = me.lookupReference('refWeatherForecastView');
		
		for(i = 1; i <= 5; i++){
			var item = result[i];
			var date = Ext.Date.format(new Date((item.get("dt"))*1000), 'H:i');

			var component = ref.add({
				xtype: 'component',
				flex : 1,
				html : '<span style="text-align: center;">' +
							date + '</br>' +
							'<img src="./resources/images/weather/icons/' + item.get("weather")[0].icon+ '.png" width="40" height="40" alt="' +item.get("weather")[0].description+ '"/></br>' +
							item.get("temp") + '&#8451;' +
						'</span>'
			});
			me.appendTooltip(component, item);
		}
	},

	appendTooltip : function(component, record){
		var me = this;
		var view = me.getView();
		
		var date = Ext.Date.format(new Date(record.get("dt")*1000), 'Y-m-d h:i');

		var html = 'Date : ' + date + '</br>' +
			MOST.getApplication().bundle.getMsg('weatherDesc') + ' : ' +record.get("weather")[0].description+ '</br>' +
			MOST.getApplication().bundle.getMsg('temp') + ' : ' +record.get("temp")+ '&#8451;</br>' +
			MOST.getApplication().bundle.getMsg('humid') + ' : ' + record.get("humidity") + '%</br>' +
			MOST.getApplication().bundle.getMsg('clouds') + ' : ' + record.get("clouds") + '%</br>' +
			MOST.getApplication().bundle.getMsg('pop') + ' : ' + Math.round(record.get("pop")*100) + '%</br>' +
			MOST.getApplication().bundle.getMsg('prec') + ' : ' +record.get("rain")["1h"]+ ' mm/h</br>' +
			MOST.getApplication().bundle.getMsg('windSpeed') + ' : ' + record.get("wind_speed") + ' m/s</br>' +
			MOST.getApplication().bundle.getMsg('windDegrees') + ' : ' + record.get("wind_deg") + '</br>' +
			MOST.getApplication().bundle.getMsg('visib') + ' : ' + record.get("visibility") + 'm</br>';

		Ext.create('Ext.tip.ToolTip', {
			target: component.el,
			delegate: view.itemSelector,
			trackMouse: true,
			renderTo: Ext.getBody(),
			listeners: {
				beforeshow: function updateTipBody(tip) {
					tip.update(html);
				}
			}
		});
	},

	setNullWeatherData : function(){
		var me = this;
		var ref = me.lookupReference('refWeatherForecastView');
		ref.add({
			xtype: 'component',
			flex : 1,
			html : '<div style="text-align: center;padding-top:40px;">' +
				'<h5>' + MOST.getApplication().bundle.getMsg('msg_loading_weather') + '</h5>' +
				'</div>'
		});
	},

	// Accidents Count Init
	onAccidentsCountLoad: function(){
		var me = this;

		if(me.workYmd === ''){
			return;
		}

		var store = me.getStore('accidentsIncidentsStore');
		var pnlRef = me.lookupReference('refAccidentsView');
		store.load({
			params : {
				workYmd : me.workYmd
			},
			callback : function(records, operation ,success){
				if(success){
					pnlRef.removeAll();
					me.addTitleComponent(pnlRef, MOST.getApplication().bundle.getMsg('acdntsCnt'));
					me.addAccidentCountComponent(pnlRef, records[0].get('totalAcdntCnt'), '#ffc800', {evtStatCd: ''});
					me.addTitleComponent(pnlRef, MOST.getApplication().bundle.getMsg('openAcdntCnt'));
					me.addAccidentCountComponent(pnlRef, records[0].get('openAcdntCnt'), '#ff6767', {evtStatCd: 'O'});
					me.addTitleComponent(pnlRef, MOST.getApplication().bundle.getMsg('closeAcdntCnt'));
					me.addAccidentCountComponent(pnlRef, records[0].get('closedAcdntCnt'), '#8aff36', {evtStatCd: 'C'});
				}
			}
		})
	},

	addTitleComponent : function(ref, title){
		var me = this;
		ref.add({
			xtype: 'component',
			layout: 'center',
			html: '<h5 style="padding-top: 20px;height: 100%;vertical-align: center;">'+title+'&nbsp;:&nbsp;</h5>',
			//flex: 4
		});
	},

	addAccidentCountComponent : function(ref, count, bgcolor, args){
		var me = this;
		var html = '<div style="height: 100%;background-color:'+ bgcolor + ';' +
						'color: #000000;text-align:center;margin-top: 10px;margin-bottom: 10px;' +
						'padding-left: 10px; padding-right: 10px;' +
						'border-radius: 5px;border: 1px solid #4C45FF; cursor: pointer;">' +
						'<h2>'+ count+'</h2>' +
					'</div>';
		var btn = ref.add({
			xtype: 'button',
			layout: 'center',
			flex: 1,
			style: {
				backgroundColor: '#ffffff',
				border: '#ffffff'
			},
			redirectObj : args,
			listeners: {
				click: 'onAcdntNumberClick'
			}
		});
		btn.setHtml(html);
	},

	// Terminal Occupancy Chart Init
	onTerminalLoad: function(){
		var me = this;
		var store = me.getStore('terminalOccupancyStore');
		store.load();
	},

	// Bulk Summary Chart Init
	onDryBreakBulkSummaryLoad: function(){
		var me = this;
		var store = me.getStore('breakBulkSummaryStore');
		store.load({
			params: {
				type: me.BULK_TP_DRY_BREAK,
				workYmd : me.workYmd,
				shftId : me.shftId
			}
		});
	},

	onLiquidBulkSummaryLoad: function(){
		var me = this;
		var store = me.getStore('liquidBulkSummaryStore');
		store.load({
			params: {
				type: me.BULK_TP_LIQUID,
				workYmd : me.workYmd,
				shftId : me.shftId
			}
		});
	},

	// Cargo Operation chart init
	onCargoOperationLoad: function(){
		var me = this;
		var store = me.getStore('cargoOperationStore');
		var view = me.lookupReference('refCargoOperationView');
		var chart = view.lookupReference('refCargoOperationChart');
		store.load({
			params : {
				workYmd : me.workYmd,
				shftId : me.shftId
			},
			callback : function(records, operation, success){
				if(success){
					var series = chart.getSeries()[0];
					var sprites = series.sprites;
					var items = chart.getStore().getData().items;

					if(sprites.length > 0 && items[0].get('cgTp') !== 'No Data'){
						for(i = 0; i < series.getSprites().length; i++){
							var sprite = series.getItemByIndex(i).sprite;
							sprite.setAttributes({
								fillStyle : me.colors[items[i].get('cgTp')].fillStyle,
								strokeStyle : me.colors[items[i].get('cgTp')].strokeStyle
							});
						}
					}
				}
			}
		})
	},

	// Bulk Handling vs Balance chart init
	onBulkHandlingBalanceCompareLoad : function(){
		var me = this;
		var store;
		var bulktype = me.getView().config.bulktype;
		var chart = me.lookupReference('refBulkHandlingBalanceCompareChart');

		if(bulktype === me.BULK_TP_DRY_BREAK){
			store = me.getStore('breakBulkHandlingBalanceStore');
		} else if(bulktype === me.BULK_TP_LIQUID) {
			store = me.getStore('liquidBulkHandlingBalanceStore');
		} else {
			return;
		}

		chart.setStore(store);
	},

	// Break/Dry Bulk Productivity
	onBreakDryBulkProductivityLoad : function(){
		var me = this;
		var store = me.getStore('breakDryBulkProductivityStore');
		var vslStore = me.getStore('breakDryBulkVslProductivityStore');
		var crnStore = me.getStore('breakDryBulkCrnProductivityStore');
		var chart = me.lookupReference('refBreakDryBulkProductivityChart');
		var combo = me.lookupReference('refShift');
		var record = combo.getSelectedRecord();
		
		if(store !== null){
			store.load({
				params : {
					type : me.BULK_TP_DRY_BREAK,
					workYmd : me.workYmd,
					shftId : me.shftId,
					fmHhmm : record.get('fmHhmm'),
					toHhmm : record.get('toHhmm')
				},
				callback : function(records, operation, success){
					if(success){
						vslStore.setData(records[0].data.vslBulkProductivity);
						crnStore.setData(records[0].data.craneBulkProductivity);
						me.increaseProductivityMaxRange(vslStore, chart);
					}
				}
			});
		}
	},

	// Liquid Bulk Productivity
	onLiquidBulkProductivityLoad : function(){
		var me = this;
		var store = me.getStore('liquidBulkProductivityStore');
		var chart = me.lookupReference('refLiquidBulkProductivityChart');
		var combo = me.lookupReference('refShift');
		var record = combo.getSelectedRecord();

		store.load({
			params : {
				type : me.BULK_TP_LIQUID,
				workYmd : me.workYmd,
				shftId : me.shftId,
				fmHhmm : record.get('fmHhmm'),
				toHhmm : record.get('toHhmm')
			},
			callback : function(records, operation, success){
				me.increaseProductivityMaxRange(store,chart);
			}
		});
	},

	// Lorries Turnaround
	onLorriesTurnaroundLoad : function(){
		var me = this;
		var store = me.getStore('lorriesTurnaroundStore');
		var combo = me.lookupReference('refShift');
		var record = combo.getSelectedRecord();
		if(record === null) {
			return;
		}

		var fmHhmm = record.get('fmHhmm');
		var toHhmm = record.get('toHhmm');

		store.load({
			params : {
				workYmd : me.workYmd,
				shftId : me.shftId,
				// fmHhmm : fmHhmm,
				// toHhmm : toHhmm
			},
			callback : function(records, operation, success){
			}
		});
	},

	// Bulk Delay
	onBulkDelayAfterrender: function(){
		var me = this, store;
		var bulkType = me.getView().config.bulktype;
		var chart = me.lookupReference('refBulkDelayChart');

		if(bulkType === me.BULK_TP_DRY_BREAK){
			store = me.getStore('breakDryBulkDelayStore');
		} else if(bulkType === me.BULK_TP_LIQUID){
			store = me.getStore('liquidBulkDelayStore');
		}

		chart.setStore(store);
	},

	onBulkDelayLoad: function(bulkType){
		var me = this, store;

		if(bulkType === me.BULK_TP_DRY_BREAK){
			store = me.getStore('breakDryBulkDelayStore');
		} else if(bulkType === me.BULK_TP_LIQUID){
			store = me.getStore('liquidBulkDelayStore');
		}

		store.load({
			params : {
				type : bulkType,
				workYmd: me.workYmd,
				shftId: me.shftId
			}
		})
	},

	// Warehouse/Yard Handling
	onWhYdHandlingLoad: function(){
		var me = this;
		var store = me.getStore('warehouseYardHandlingStore');

		store.load({
			params : {
				workYmd: me.workYmd,
				shftId: me.shftId
			},
			callback: function(records, operation, success){
				if(success){
					store.each(function(item){
						item.set({
							'jobTypeNm' : me.WHYD_LABELS[item.get('jobTypeCd')]
						});
					});
				}
			}
		});
	},

    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */

	onDateShiftChange : function(elem, newValue, oldValue, eOpts){
		var me = this;
		me.workYmd = Ext.Date.format(me.lookupReference('refShiftDate').getValue(), 'Ymd');
		me.shftId = me.lookupReference('refShift').getValue();
		if(me.workYmd !== '' && me.shftId !== ''){
			me.loadManualCharts();
		}
	},

	loadManualCharts : function(){
		var me = this;
		me.onBreakDryBulkProductivityLoad();
		me.onLiquidBulkProductivityLoad();
		me.onDryBreakBulkSummaryLoad();
		me.onLiquidBulkSummaryLoad();
		me.onCargoOperationLoad();
		me.onLorriesTurnaroundLoad();
		me.onBulkDelayLoad(me.BULK_TP_DRY_BREAK);
		me.onBulkDelayLoad(me.BULK_TP_LIQUID);
		me.onWhYdHandlingLoad();
		me.onAccidentsCountLoad();
		me.loadCompareCharts();
	},

	onAcdntNumberClick: function(elem, t, eOpts){
		var me = this;
		var redirectObj = elem.redirectObj;
		var prefix = 'menu';
		var menuId = 'MPAD105';
		var id = prefix + '_' + menuId;
		var mainView = me.getView().findParentByType('app-main');
		var tabs = mainView.lookupReference('ref-maintab');
		var tab = tabs.items.getByKey(id);

		redirectObj.workYmd = me.workYmd;

		if(!tab){
			me.loadMenuView('app-accidentdamagereport', redirectObj);
		} else {
			me.fireEvent('onRedirectAccident', redirectObj);
			tabs.setActiveTab(tab);
		}

	},

	onAfterAccidentUpdate: function(){
		var me = this;
		me.onAccidentsCountLoad();
	},

	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */


	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */

	// Vessel Count


	// Terminal Occupancy
	terminalOccupancyDataRenderer: function(text, sprite, config, rendererData, index) {
		var item = rendererData.store.getAt(index);
		var cargoType = item.get('cargoType');
		var berthCnt = item.get('berthCnt');
		var cargoPercent = item.get('cargoPercent');
		return cargoType + ' : ' + berthCnt + '\n' + cargoPercent + '%';
	},

	onTerminalOccupancyTooltipRender: function(tooltip, record, item) {
		tooltip.setHtml(record.get('cargoType') + ': ' + record.get('cargoPercent') + '%');
	},

	// Bulk Summary
	bulkSummaryLabelRenderer: function(text, sprite, config, rendererData, index) {
		var me = this;
		var item = rendererData.store.getAt(index);
		return {text : me.generateBulkSummaryLabelText(item),
			color: me.getBulkSummaryLabelFontColor(item.get('cgOpeTp'))};
	},

	generateBulkSummaryLabelText : function(item){
		return item.get('vslNm') + ' / ' + item.get('vslCallId') + '\n'
			+ item.get('cgOpeTp') + '-' + item.get('cgCmdt');
	},

	getBulkSummaryLabelFontColor : function(cgOpeTp){
		var me = this;
		var fontColor;
		if(cgOpeTp === me.CG_OPE_DISCHARGE){
			fontColor = '#3346ff';
		} else if(cgOpeTp === me.CG_OPE_LOAD) {
			fontColor = '#ff3344';
		} else {
			fontColor = '#000000';
		}
		return fontColor;
	},

	bulkSummaryWharfRenderer : function(sprite, config, rendererData, index) {
		var me = this;
		var surface = sprite.getSurface();
		var items = rendererData.store.getData().items;
		var changes = {};

		var textSprites = surface.bulkWharfTextSprites;
		if(!textSprites){
			textSprites = surface.bulkWharfTextSprites = [];
		}

		var textSprite = textSprites[index];
		if(!textSprite)
			textSprite = textSprites[index] = surface.add({type: 'text'});
		else
			textSprite.show();

		textSprite.setAttributes({
			text : items[index].get('berthCd') + '\n'
				+ items[index].get('cgWgt')+me.MT,
			fill: '#000000',
			fontSize: 12,
			x : (sprite.labelCfg) ? sprite.labelCfg.x : 0,
			y : (sprite.labelCfg) ? sprite.labelCfg.y : 0,
			zIndex: 10001,
			textAlign: 'center'
		});

		if(textSprites.length > items.length){
			for(i = textSprites.length; i > items.length; i--){
				textSprites[i-1].hide();
			}
		}

		return changes;
	},

	bulkSummaryTooltipRender: function(tooltip, record, item) {
		var me= this;
		var html = record.get('vslNm')+'/'+record.get('vslCallId')+'<br/>'
			+ record.get('cgOpeTp')+'-'+record.get('cgCmdt')+'<br/>'
			+ record.get('berthCd')+'<br/>'
			+ record.get('cgWgt')+me.MT+'<br/>'
		;
		if(record.store.getStoreId() === "liqiuidBulkSummary"){
			html = html.concat("FLX : " + record.get('flxHoseCnt') + " lines" + '<br/>'
				             + "MLA : " + record.get('mlaHoseCnt') + " lines" +'<br/>');
		}

		tooltip.setHtml(html);
	},

	// Cargo Operation
	cargoOperationLabelRenderer : function(text, sprite, config, rendererData, index){
		var item = rendererData.store.getAt(index);
		return item.get('cgTp') + '\n' +
			item.get('cgWgtRate') + '%';
	},

	cargoOperationVesselCntRenderer : function(sprite, config, rendererData, index){
		var me = this;
		var surface = sprite.getSurface();
		var items = rendererData.store.getData().items;
		var changes = {};

		// if(items[index].get('vslCnt') === 0){
		// 	return changes;
		// }

		// changes.fillStyle = colors[items[index].get('cgTp')].fillStyle;
		// changes.strokeStyle = colors[items[index].get('cgTp')].strokeStyle;
		//
		// sprite.setAttributes({
		// 	fillStyle : colors[items[index].get('cgTp')].fillStyle,
		// 	strokeStyle : colors[items[index].get('cgTp')].strokeStyle
		// })

		var textSprites = surface.vslCntTextSprites;
		if(!textSprites){
			textSprites = surface.vslCntTextSprites = [];
		}

		var textSprite = textSprites[index];
		if(!textSprite)
			textSprite = textSprites[index] = surface.add({type: 'text'});
		else
			textSprite.show();

		textSprite.setAttributes({
			text : items[index].get('vslCnt'),
			fill: '#000000',
			fontSize: 12,
			x : (sprite.labelCfg) ? sprite.labelCfg.x : 0,
			y : (sprite.labelCfg) ? sprite.labelCfg.y : 0,
			textAlign: 'center',
			zIndex: 10001
		});

		if(textSprites.length > items.length){
			for(i = textSprites.length; i > items.length; i--){
				textSprites[i-1].hide();
			}
		}

		return changes;
	},

	cargoOperationTooltipRenderer : function(tooltip, record, item){
		var me = this;
		var html = record.get('cgTp')+' / '+record.get('cgWgtRate')+'% ('+record.get('tonnage')+me.MT+')'
		tooltip.setHtml(html);
	},


	// Bulk Hanlding vs Balance
	onBulkHandlingBalanceCompareTooltipRenderer : function(tooltip, record, item){
		var me= this;
		var html = record.get('vslCallId') + ' / ' + record.get('berthCd') + '<br/>' +
			'Total : ' + record.get('totalWgt') + me.MT + '<br/>' +
			'Total Handled : ' + record.get('totalHandlingWgt') + me.MT + '<br/>' +
			'Handling : ' + record.get('handlingWgt') + me.MT + '<br/>' +
			'Balance : ' + record.get('balanceWgt') + me.MT + '<br/>' +
			'Equipment : ' + record.get('eqNm');
		tooltip.setHtml(html);
	},

	// Break/Dry Bulk Productivity
	onBreakDryBulkProductivityTooltipRenderer : function(tooltip, record, item){
		var me = this;
		var crnStore = me.getStore('breakDryBulkCrnProductivityStore');
		var html = '', str;
		html = record.get('vslCallId') + ' / ' + record.get('berthCd') + '</br>'
			 + 'Delay Hours : ' + record.get('dlyHrs') + me.HRS + '</br>'
			 + 'Total Working Hours : ' + record.get('totalNetWrkHrs') + me.HRS + '</br>'
			 + 'Handling Rate : ' + record.get('handlingRate') + me.MTHR + '</br>'
			 + 'KPI for Cranes : ' + record.get('kpiIdx') + me.MTHR + '</br>'
			 + 'Total Weight : ' + record.get('wgt') + '</br></br>'

		crnStore.each(function(crnProd){
			if(crnProd.get('vslCallId') === record.get('vslCallId')){
				str = crnProd.get('eqFacNm') + ' : ' + crnProd.get('handlingRate') + me.MTHR + ','
					+ ' Staff : ' + crnProd.get('staffNo') + '</br>'
				html+=str;
			}
		});
		tooltip.setHtml(html);
	},

	onBreakDryBulkProductivityItemDoubleClick : function(chart, item, event, eOpts){
		var me = this;
		var dt = me.workYmd;

		var recvData = {
			srcScreen: 'bbtDashboard',
			vslCallID: item.record.get('vslCallId'),
			workYmd : [dt.slice(6,8), dt.slice(4,6), dt.slice(0, 4)].join('/'),
			shftId : me.shftId
		};
		me.loadMenuView('app-vesseloperationreport',recvData);
	},

	onBulkProductivitySeriesRenderer : function(sprite, config, rendererData, index){
		var surface = sprite.getSurface();
		var items = rendererData.store.getData().items;
		var changes = {};

		if(items[index]){

			var textSprites = surface.bulkProductivityEquipmentTextSprites;
			if(!textSprites){
				textSprites = surface.bulkProductivityEquipmentTextSprites = [];
			}

			var textSprite = textSprites[index];
			if(!textSprite)
				textSprite = textSprites[index] = surface.add({type: 'text'});
			else
				textSprite.show();

			var x = (config.x) ? config.x + (config.width) : 0;
			var y;

			if(config.y < (sprite.attr.innerHeight * 0.25) && textSprite.attr.y - 60 < config.y){
				y = config.y + 60;
			} else if(config.y < sprite.attr.innerHeight && textSprite.attr.y - 30 < config.y){
				y = config.y + 30;
			} else {
				y = textSprite.attr.y;
			}

			textSprite.setAttributes({
				text : items[index].get('eqFacNm') + '\n'
					+ items[index].get('cmdtGrpCd'),
				fill: '#000000',
				fontSize: 12,
				x : x,
				y : y,
				zIndex: 10001,
				textAlign: 'center',
				textBaseline: 'bottom',
				scalingY : -1
			});

			if(textSprites.length > items.length){
				for(i = textSprites.length; i > items.length; i--){
					textSprites[i-1].hide();
				}
			}
		}

		return changes;
	},

	// Liquid Bulk Productivity
	onLiquidBulkProductivityTooltipRenderer : function(tooltip, record, item) {
		var me = this;
		var html = record.get('vslCallId') + ' / ' + record.get('berthCd') + '</br>'
			+ 'Delay Hours : ' + record.get('dlyHrs') + me.HRS + '</br>'
			+ 'Total Working Hours : ' + record.get('totalNetWrkHrs') + me.HRS + '</br>'
			+ 'Equipment : ' + record.get('eqFacNm') + '</br>'
			+ 'Handling Rate : ' + record.get('handlingRate') + me.MTHR + '</br>'
			+ 'KPI for Cranes : ' + record.get('kpiIdx') + me.MTHR + '</br>'
			+ 'Total Weight : ' + record.get('wgt');

		tooltip.setHtml(html);
	},

	onLiquidBulkProductivityItemDoubleClick : function(chart, item, event, eOpts){
		var me = this;
		var dt = me.workYmd;

		var recvData = {
			srcScreen: 'bbtDashboard',
			vslCallID: item.record.get('vslCallId'),
			workYmd : [dt.slice(6,8), dt.slice(4,6), dt.slice(0, 4)].join('/'),
			shftId : me.shftId
		};
		me.loadMenuView('app-vesseloperationreport',recvData);
	},

	increaseProductivityMaxRange : function(store, chart){
		var max = 0;
		var coeff = 0.3;
		store.each(function(item){
			if(item.get('kpiIdx') > max && item.get('kpiIdx') > item.get('handlingRate')){
				max = item.get('kpiIdx');
			} else if(item.get('handlingRate') > max && item.get('handlingRate') > item.get('kpiIdx')){
				max = item.get('handlingRate');
			}
		});
		if(max > 0 && chart !== null){
			chart.getAxes()[0].setMaximum(max+(max*coeff));
			chart.getAxes()[0].getRange(true);
			chart.redraw();
		}
	},

	// Lorries Turnaround Chart
	onLorryTurnaroundTooltipRenderer : function(tooltip, record, item){
		var html = 'Vessel (Lorry Trips/Lorry Count)' + '</br>';
		var vsl = record.get('vslLorryCnt').split('||');

		Ext.Array.each(vsl, function(cntItem){
			var items = cntItem.split('^^');
			var str = '- ' + record.get('berthCd') + ' / ' + items[0] + ' / ' + items[1] + ' (' +items[3] + ' / ' + items[2] + ')' + '</br>';
			html+=str;
		});

		tooltip.setHtml(html);
	},

	// Bulk Delay Chart
	onBulkDelayChartTooltipRenderer : function(tooltip, record, item){
		var me = this;
		var html = '';
		var vsl = record.get('berthDlyHrs').split('||');

		Ext.Array.each(vsl, function(cntItem){
			var items = cntItem.split('^^');
			var str = '- ' + record.get('berthCd') + ' / ' + items[0] + ' / ' + items[1] + '</br>'
				+ '    Total Delay Hours : ' + items[3] + me.HRS + '</br>'
				+ '    Delay Codes : ' + items[2] + '' + '</br>';
			html+=str;
		});

		tooltip.setHtml(html);
	},

	// Warehouse/Yard Handling
	onWhYdTooltipRenderer : function(tooltip, record, item){
		var me = this;
		var html = record.get('jobTypeNm') + ' : ' + record.get('handlingWgt') + me.MT;
		tooltip.setHtml(html);
	},

	refreshOnEveryFiveMinutes : function(){
		var me = this;

		var intervalFunc = setInterval(function(){
			var prefix = 'menu';
			var menuId = 'MPDS101';
			var id = prefix + '_' + menuId;
			var mainView = Ext.ComponentQuery.query('[xtype="app-main"]')[0];
			var tabs = mainView.lookupReference('ref-maintab');
			var tab = tabs.items.getByKey(id);

			if(!tab){
				clearInterval(intervalFunc);
				return;
			}

			me.loadShiftCombo(false);
		},
		
		MOST.config.Token.getDashboardinterval() ?  MOST.config.Token.getDashboardinterval() * 60 * 1000 : me.REFRESH_INTERVAL);

	},

	refreshLiveData : function(){
		var me = this;
		me.onVesselCountLoad();
		me.onAccidentsCountLoad();
		me.onWeatherForecastLoad();
	}


	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});