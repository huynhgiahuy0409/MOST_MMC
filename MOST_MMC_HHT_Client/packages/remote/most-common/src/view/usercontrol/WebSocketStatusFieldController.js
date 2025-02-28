Ext.define('MOST.view.usercontrol.WebSocketStatusFieldController', {
	extend: 'MOST.view.foundation.BaseViewController',
	
	alias: 'controller.websocketstatusfield',

	
	CLOCK_TASKID: 'clockTask',
	CLOCK_TASK: null,
	TIME_FORMAT: 'g:i:s A',
	
	onPained: function(){
		var me = this;
		var task = {
				identifyId: me.CLOCK_TASKID,
				run: function() {
					me.updateClock();
				},
				interval: 1000
			}
		me.CLOCK_TASK = task;
		Ext.TaskManager.start(task);
	},
	
	onDestroy: function(){
		this.stopTask();
	},
	
	updateClock: function(){
	 	var me = this;
		var refs = me.getReferences();
		if(refs.refLblWsClock){
			refs.refLblWsClock.setHtml(Ext.Date.format(new Date(), me.TIME_FORMAT));
		}
	},
	
	stopTask: function(){
		var me = this;
		if(me.CLOCK_TASK){
			console.log('--- WebSocketStatusFieldController --- Close task: '+ me.CLOCK_TASK.identifyId);
			Ext.TaskManager.stop(me.CLOCK_TASK, true);
		}
	},
	
});