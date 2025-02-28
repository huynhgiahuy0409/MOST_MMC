Ext.define('MOST.view.billing.AnnualHolidayController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.annualholiday',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	
	HOLIDAY_GRID_REF_NAME : 'refdefinedHolidayCodesGrid',
	HOLIDAY_STORE_NAME : 'defineHolidayList',
	
	MAIN_GRID_REF_NAME: 'refannualHolidayGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'annualHolidayList',	
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
		var refs = me.getReferences();
    	var store = me.getStore(me.HOLIDAY_STORE_NAME);
    	
    	var today = new Date();
    	var year = today.getFullYear();
    	
    	refs.refHolidayOfTheYear.setValue(year);
    	me.onSearch();
    	
		store.load({
			callback: function(records, operation, success) {
				if (success) {
					// SUCCES
					
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
	// Search Event Handler
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore(me.MAIN_STORE_NAME);
    	var params = me.getSearchCondition();
    	
    	if(refs.refHolidayOfTheYear.getValue() < 2010){
    		return;
    	}
    	
		if(params == null){
			return;
		}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					// SUCCES
				}
			}
		});
	},
	
	
	onChecked : function (model, record, index, eOpts) {
		if(record.data.itChk){
			record.data.itChk=false;
		}
		else{
			record.data.itChk=true;
		}
    },
	
	// Grid Add
	onAdd: function() {
		var me = this;
		var view = me.getView();
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		
		var annualholidaystore = me.getStore(me.MAIN_STORE_NAME);
		var definestore = me.getStore(me.HOLIDAY_STORE_NAME);
		var duplicateCheckStore = me.getStore('annualHolidayListDuplicateCheck');
		var masterItem = Ext.create('MOST.model.billing.AnnualHoliday');
		var holidayOfTheYear = me.checkDate("refHolidayOfTheYear");
		
		var arrItems = new Array();
		var temp=0;
		
		var annualholidayArray = new Array();
		var defineholidayArray = new Array();
		
		if(holidayOfTheYear.dateValue==null || holidayOfTheYear.dateValue > 2060 || holidayOfTheYear.dateValue < 2010){
			MessageUtil.mandatoryFieldInValid();
			return null;
		}
		annualholidaystore.each(function(records,index){
			defineholidayArray.push(records.data);
		});
		definestore.each(function(record,index){
			if(record.data.itChk){
				if(StringUtil.isNullorEmpty(record.data.strFormatHlDayYmd)){
					return;
				}
				//if(record.data.strHlDayYmd.toString().length > 8){}
				if(record.data.strHlDayYmd.toString().length === 1 ){
					record.data.strHlDayYmd = '0' + record.data.strHlDayYmd;
				}
				if(record.data.strHlMonthYmd.toString().length === 1){
					record.data.strHlMonthYmd = '0' + record.data.strHlMonthYmd;
				}
				
				var monthDay = record.data.strFormatHlDayYmd.split('/');
				record.data.strHlDayYmd = holidayOfTheYear.dateValue + monthDay[1].trim() + monthDay[0].trim();
				
				record.data.workingStatus = WorkingStatus.INSERT;
				annualholidayArray.push(record.data);
				
				var count=0;
				for(var i=temp;i<annualholidayArray.length;i++){
					for(var j=0;j<defineholidayArray.length;j++){
						if(annualholidayArray[i].strHlDayCd === defineholidayArray[j].strHlDayCd){
//							record.data.strHlDayYmd = null;
							count++;
							break;
						}else{
							count = 0;
						}
					}
				}
				temp++;
				if(count === 0){
					arrItems.push(record.data);
				}else{
					MessageUtil.error('Warning', 'annualHoliday_duplicate_code_msg');
					return null;
				}
			}
		});
		
//		//To perform the save logic only when modified
		if(masterItem.dirty||arrItems.length>0){
			var proxy = masterItem.getProxy();
			proxy.url=annualholidaystore.getProxy().url;
			masterItem.set("items",arrItems);
			masterItem.save({
				success:function(){
					annualholidaystore.reload();
					MessageUtil.saveSuccess();
					//me.onLoad();
				}
			});
		}
	},
	
	// Grid Row Remove
	onRemove: function() {
		var me = this;
		var view = me.getView();
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var annualholidaystore = me.getStore(me.MAIN_STORE_NAME);
		var masterItem = Ext.create('MOST.model.billing.AnnualHoliday');
		var holidayOfTheYear = me.checkDate("refHolidayOfTheYear");
		
		MessageUtil.question("Confirm", "annualholiday_CM00003_confirm_del",null,
		function(button){
		if (button === 'ok') {
			var arrItems = new Array();
			annualholidaystore.each(function(record,index){
				if(record.data.itChk){
					record.data.workingStatus = WorkingStatus.DELETE;
					arrItems.push(record.data);
				}
			});
			//To perform the save logic only when modified
			if(arrItems.length>0){
				var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
				updateParm.getProxy().url = annualholidaystore.getProxy().url;
				updateParm.phantom = false;
				updateParm.drop();
				updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
				updateParm.set("items",arrItems);
				updateParm.save({
					success:function(){
						annualholidaystore.reload();
						MessageUtil.saveSuccess();
						//me.onLoad();
					}
				});
			}
		}});
		
	},
	
	// Grid Row Double
	onDblClick: function() {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		me.setGridColumnEditable(selection.phantom);
	},
	
	// Key Column Editable
	setGridColumnEditable:function(isCreate){
		var me = this;
		var refs = me.getReferences();
	
	},
	// Grid Edit
	onEdit : function(editor, context){
		var me = this;
		var holidayOfTheYear = me.checkDate("refHolidayOfTheYear");
		var duplicateCheckStore = me.getStore('annualHolidayListDuplicateCheck');
		//var annuaList = me.getStore(me.MAIN_STORE_NAME);
	
		if(context.record.data.strHlDay.toString().length==1){
			context.record.data.strHlDay = '0' + context.record.data.strHlDay;
		}
		if(context.record.data.strHlMonth.toString().length==1){
			context.record.data.strHlMonth = '0' + context.record.data.strHlMonth;
		}
		
		context.record.data.strHlDayYmd = holidayOfTheYear.dateValue + context.record.data.strHlMonth.toString() + context.record.data.strHlDay.toString();	
		context.record.data.strFormatHlDayYmd = context.record.data.strHlDay + '/' + context.record.data.strHlMonth + '/' + holidayOfTheYear.dateValue;
		
		var params = {
				strHlDayYmd: context.record.data.strHlDayYmd
		}
		duplicateCheckStore.load({
			params:params,
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						MessageUtil.error('Warning', 'annualHoliday_duplicate_data_msg');
					} else {
						me.gridEdit(editor, context);
					}
				}
			}
		});
	},
	
	// Grid Cancel Edit
	onCancelEdit : function(rowEditing, context) {
		var me = this;
		me.gridCancelEdit(rowEditing, context);
	},

	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	
     	var holidayOfTheYear = me.checkDate("refHolidayOfTheYear").dateValue;
     	if(holidayOfTheYear==null){
     		holidayOfTheYear=1980;
		}
     	var params = {
     		strHlDayYmd : holidayOfTheYear
		};
    	return params;
	}
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});