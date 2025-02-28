Ext.define('MOST.view.controller.LogMonitoringController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		'MOST.view.controller.LogMonitoringModel',
		
	],

	alias: 'controller.logmonitoring',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	LOG_FILE_MOST_GRID_REF_NAME : 'refLogMOSTMonitoringTabGrid',
	LOG_FILE_WB_GRID_REF_NAME : 'refLogWBMonitoringTabGrid',
	LOG_FILE_HG_GRID_REF_NAME : 'refLogHGMonitoringTabGrid',

	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 * 
	 * 
	 * /**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function() {
		var me = this,
			refs = me.getReferences(),
			listFilesMOST  = me.getStore('listFilesMOST'),
			listFilesWB  = me.getStore('listFilesWB'),
			listFilesHG  = me.getStore('listFilesHG');
		
		var mostTab = 'refLogMOSTMonitoringTab';
		var wbTab = 'refLogWBMonitoringTab';
		var hangingScaleTab = 'refLogHangingScaleMonitoringTab';
		
		if(refs.tabLogMonitoring.activeTab.reference == mostTab){
			listFilesMOST.load({
				callback: function (records, operation, success) {
					if (success) {
						//MessageUtil.saveSuccess(); // Success Message
					}
				}
			});
		}else if(refs.tabLogMonitoring.activeTab.reference == wbTab){
			listFilesWB.load({
				callback: function (records, operation, success) {
					if (success) {
						//MessageUtil.saveSuccess(); // Success Message
					}
				}
			});
		}else if(refs.tabLogMonitoring.activeTab.reference == hangingScaleTab){
			listFilesHG.load({
				callback: function (records, operation, success) {
					if (success) {
						//MessageUtil.saveSuccess(); // Success Message
					}
				}
			});
		}
	},
	
	onSearch: function() {
		var me = this,
			refs = me.getReferences(),
			listFilesMOST  = me.getStore('listFilesMOST'),
			listFilesWB  = me.getStore('listFilesWB'),
			listFilesHG  = me.getStore('listFilesHG');
		
		var mostTab = 'refLogMOSTMonitoringTab';
		var wbTab = 'refLogWBMonitoringTab';
		var hangingScaleTab = 'refLogHangingScaleMonitoringTab';
		
		if(refs.tabLogMonitoring.activeTab.reference == mostTab){
			listFilesMOST.load({
				callback: function (records, operation, success) {
					if (success) {
						//MessageUtil.saveSuccess(); // Success Message
					}
				}
			});
		}else if(refs.tabLogMonitoring.activeTab.reference == wbTab){
			listFilesWB.load({
				callback: function (records, operation, success) {
					if (success) {
						//MessageUtil.saveSuccess(); // Success Message
					}
				}
			});
		}else if(refs.tabLogMonitoring.activeTab.reference == hangingScaleTab){
			listFilesHG.load({
				callback: function (records, operation, success) {
					if (success) {
						//MessageUtil.saveSuccess(); // Success Message
					}
				}
			});
		}		
	},
	
	onDownload: function() {		
		var me = this;
		var refs = me.getReferences();
		var mostTab = 'refLogMOSTMonitoringTab';
		var wbTab = 'refLogWBMonitoringTab';
		var hangingScaleTab = 'refLogHangingScaleMonitoringTab';
				
		if(refs.tabLogMonitoring.activeTab.reference == mostTab){
			var grid = me.lookupReference(me.LOG_FILE_MOST_GRID_REF_NAME),
			store = me.getStore('fileDownloadMOSTStore'),	
			selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		}else if(refs.tabLogMonitoring.activeTab.reference == wbTab){
			var grid = me.lookupReference(me.LOG_FILE_WB_GRID_REF_NAME),
			store = me.getStore('fileDownloadWBStore'),	
			selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		}else if(refs.tabLogMonitoring.activeTab.reference == hangingScaleTab){
			var grid = me.lookupReference(me.LOG_FILE_HG_GRID_REF_NAME),
			store = me.getStore('fileDownloadHGStore'),	
			selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		}
		
		if(selection == null) {
			MessageUtil.info('info_msg','select_list_msg');
			return;
		}
		
		
		me.maskConfirmProcess();
		
		store.load({
			params: {
				'ufileNm': selection.get('fileName')
			},
			callback: function(records, operation, success) {
				if (success) {
					var content = records[0].data.content.replace(/&lt;/gi,'<').replace(/&gt;/gi,'>');
					Ext.exporter.File.saveBinaryAs(content, records[0].data.fileName);
				}
				
				me.unMaskConfirmProcess();
			}
		})
	},
	
	onFileDownloadDblClick: function() {
		var me = this;
		me.onDownload();
	},
	
	/**
	 * GENERAL METHOD START
	 * =========================================================================================================================
	 */
	
	
	maskConfirmProcess: function(){
		var me = this;
		var refs = me.getReferences();
		
		if(refs.refGridLogbackMonitoring){
			var win = refs.refGridLogbackMonitoring.up('panel');
			
			if(win){
				win.getEl().mask('Downloading...');
			}
		}
	},
	
	unMaskConfirmProcess: function(){
		var me = this;
		var refs = me.getReferences();

		if(refs.refGridLogbackMonitoring){
			var win = refs.refGridLogbackMonitoring.up('panel');
			
			if(win){
				win.getEl().unmask();
			}
		}
	},
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});