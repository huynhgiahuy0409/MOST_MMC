Ext.define('MOST.view.planning.berth.BerthInfo', {
	extend: 'Ext.panel.Panel',
	
	alias: 'widget.app-berthinfo',
	
	requires: [
	   'MOST.config.Locale',
	   'TSB.ux.form.field.DateTimeField',
	   'TSB.ux.form.field.DateTimePicker'
   ],
   
   layout : 'fit',
   
   initComponent: function() {
	   var me = this;
 
		var berthAlongside = Ext.create('Ext.data.Store', {
			fields: ['value', 'name'],
		    data :  [{'value':'S', 'name':'Starboard'},
		    	     {'value':'P', 'name':'Port'},
		    	     {'value':'T', 'name':'Top'},
		    	     {'value':'B', 'name':'Bottom'}
		    ]
		});	   
	   
	   Ext.apply(me, {
		   items: [{
			   xtype: 'propertygrid',
			   itemId: 'berthInfoPropertyGrid',
			   reference: 'refberthinfogrid',
			   sortableColumns: true,
			   bind: {
				   source: {
					   "a01vesselCallId": 				'{selectedBerthPlan.vslCallId}',
					   "a02referenceNo": 				'{selectedBerthPlan.shipCallNo}',
					   "a03vslNm": 						'{selectedBerthPlan.vesselName}',
					   "a04callSign": 					'{selectedBerthPlan.callSign}',
					   "a05loa": 						'{selectedBerthPlan.loa}',
					   "a06width":						'{selectedBerthPlan.width}',
					   "a07berthCd": 					'{selectedBerthPlan.berthCd}',
					   "a08berthAlongside": 			'{selectedBerthPlan.berthAlongside}',
					   "a09startPos": 					'{selectedBerthPlan.startPos}',
					   "a10endPos": 					'{selectedBerthPlan.endPos}',
					   "a11eta": 						'{selectedBerthPlan.eta}',
					   "a12etb": 						'{selectedBerthPlan.etb}',
					   "a13etw": 						'{selectedBerthPlan.etw}',
					   "a14etc": 						'{selectedBerthPlan.etc}',
					   "a15etu": 						'{selectedBerthPlan.etu}',
					   "a16etd": 						'{selectedBerthPlan.etd}',
					   "a17ata": 						'{selectedBerthPlan.ata}',
					   "a18atb": 						'{selectedBerthPlan.atb}',
					   "a19atw": 						'{selectedBerthPlan.atw}',
					   "a20atc": 						'{selectedBerthPlan.atc}',
					   "a21atu": 						'{selectedBerthPlan.atu}',
					   "a22atd": 						'{selectedBerthPlan.atd}',
					   "a23remarks": 					'{selectedBerthPlan.remarks}',
					   "a24inVoy": 						'{selectedBerthPlan.inVoy}',
					   "a25outVoy": 					'{selectedBerthPlan.outVoy}',
					   "a26inLane": 					'{selectedBerthPlan.inLane}',
					   "a27outLane": 					'{selectedBerthPlan.outLane}',
					   "a28docStatus": 					'{selectedBerthPlan.docStatus}'
				   }
			   },
			   listeners: {
				   afterrender: function(){
					   var me = this;
					   me.store.autoSort = false;
					   
				   }
			   },
			   sourceConfig: {
				   a01vesselCallId: {
					   displayName: MOST.getApplication().bundle.getMsg('vesselcallid'),
					   editor: {
						   xtype: 'textfield',
						   readOnly: true,
						   editable: false,
						   disabled: true
					   }
				   },
				   a02referenceNo: {
					   displayName: MOST.getApplication().bundle.getMsg('shipCallNo'),
					   editor: {
						   xtype: 'textfield',
						   readOnly: true,
						   editable: false,
						   disabled: true
					   }
				   },   
				   a03vslNm: {
					   displayName: MOST.getApplication().bundle.getMsg('vesselname'),
					   editor: {
						   xtype: 'textfield',
						   readOnly: true,
						   editable: false,
						   disabled: true
					   }
				   },
				   a04callSign: {
					   displayName: MOST.getApplication().bundle.getMsg('callsign'),
					   editor: {
						   xtype: 'textfield',
						   readOnly: true,
						   editable: false,
						   disabled: true
					   }
				   }, 
				   a05loa: {
					   displayName: MOST.getApplication().bundle.getMsg('loa'),
					   editor: {
						   xtype: 'textfield',
						   readOnly: true,
						   editable: false,
						   disabled: true
					   }
				   },
				   a06width: {
					   displayName: MOST.getApplication().bundle.getMsg('width'),
					   editor: {
						   xtype: 'textfield',
						   readOnly: true,
						   editable: false,
						   disabled: true
					   }
				   },
				   a07berthCd: {
					   displayName: MOST.getApplication().bundle.getMsg('berthcd'),
					   editor: {
						   xtype: 'combo',
						   editable: false,
						   displayField: 'berthCd',
						   valueField: 'berthCd',			    	       		        		
						   bind: {
							   store: '{berths}' 
						   }
					   }
				   },
				   a08berthAlongside: {
					   displayName: MOST.getApplication().bundle.getMsg('berthalongside'),
					   editor: {
						   xtype: 'combobox',
						   store : berthAlongside,
						   displayField:'name',
						   valueField:'value'
					   }
				   },
				   a09startPos: {
					   displayName: MOST.getApplication().bundle.getMsg('startpos'),
					   editor: {
						   xtype: 'textfield',
						   readOnly: true,
						   editable: false,
						   disabled: true
					   }
				   },
				   a10endPos: {
					   displayName: MOST.getApplication().bundle.getMsg('endpos'),
					   editor: {
						   xtype: 'textfield',
						   maxLength : 3,
						   enforceMaxLength : true  
					   }
				   },  
				   a11eta: {
					   displayName: MOST.getApplication().bundle.getMsg('eta'),
					   editor: {
						   xtype: 'datetimefield',
						   dateFormat: 'Y-m-d H:i'
					   }
				   },    
				   a12etb: {
					   displayName: MOST.getApplication().bundle.getMsg('etb'),
					   editor: {
						   xtype: 'datetimefield',
						   dateFormat: 'Y-m-d H:i'
					   },
					   renderer: function(value, metaData, record, rowIndex, colIndex, store){
						   var date = Ext.Date.format(value, 'Y-m-d H:i');
						   return date;
					   }
				   },
				   a13etw: {
					   displayName: MOST.getApplication().bundle.getMsg('etw'),
					   editor: {
						   xtype: 'textfield',
						   readOnly: true,
						   editable: false,
						   disabled: true
					   },
					   renderer: function(value, metaData, record, rowIndex, colIndex, store){
						   var date = Ext.Date.format(value, 'Y-m-d H:i');
						   return date;
					   }
				   },    
				   a14etc: {
					   displayName: MOST.getApplication().bundle.getMsg('etc'),
					   editor: {
						   xtype: 'textfield',
						   maxLength : 12,
						   enforceMaxLength : true  
					   },
					   renderer: function(value, metaData, record, rowIndex, colIndex, store){
						   var date = Ext.Date.format(value, 'Y-m-d H:i');
						   return date;
					   }
				   },     
				   a15etu: {
					   displayName: MOST.getApplication().bundle.getMsg('etu'),
					   editor: {
						   xtype: 'textfield',
						   maxLength : 4,
						   enforceMaxLength : true  
					   },
					   renderer: function(value, metaData, record, rowIndex, colIndex, store){
						   var date = Ext.Date.format(value, 'Y-m-d H:i');
						   return date;
					   }
				   },     
				   a16etd: {
					   displayName: MOST.getApplication().bundle.getMsg('etd'),
					   editor: {
						   xtype: 'textfield',
						   maxLength : 12,
						   enforceMaxLength : true  
					   },
					   renderer: function(value, metaData, record, rowIndex, colIndex, store){
						   var date = Ext.Date.format(value, 'Y-m-d H:i');
						   return date;
					   }
				   },     
				   a17ata: {
					   displayName: MOST.getApplication().bundle.getMsg('ata'),
					   editor: {
						   xtype: 'datetimefield',
						   readOnly: true
					   },
					   renderer: function(value, metaData, record, rowIndex, colIndex, store){
						   var backcolor = '#f5f5f5';
						   metaData.style =  'background:' + backcolor + ';'; 
						   
						   var date = Ext.Date.format(value, 'Y-m-d H:i');
						   return date;
					   }
				   },   
				   a18atb: {
					   displayName: MOST.getApplication().bundle.getMsg('atb'),
					   editor: {
						   xtype: 'textfield',
						   readOnly: true,
						   editable: false,
						   disabled: true
					   },
					   renderer: function(value, metaData, record, rowIndex, colIndex, store){
						   var date = Ext.Date.format(value, 'Y-m-d H:i');
						   return date;
					   }
				   },    
				   a19atw: {
					   displayName: MOST.getApplication().bundle.getMsg('atw'),
					   editor: {
						   xtype: 'textfield',
						   readOnly: true,
						   editable: false,
						   disabled: true
					   },
					   renderer: function(value, metaData, record, rowIndex, colIndex, store){
						   var date = Ext.Date.format(value, 'Y-m-d H:i');
						   return date;
					   }
				   },     
				   a20atc: {
					   displayName: MOST.getApplication().bundle.getMsg('atc'),
					   editor: {
						   xtype: 'textfield',
						   readOnly: true,
						   editable: false,
						   disabled: true
					   },
					   renderer: function(value, metaData, record, rowIndex, colIndex, store){
						   var date = Ext.Date.format(value, 'Y-m-d H:i');
						   return date;
					   }
				   }, 
				   a21atu: {
					   displayName: MOST.getApplication().bundle.getMsg('atu'),
					   editor: {
						   xtype: 'textfield',
						   readOnly: true,
						   editable: false,
						   disabled: true
					   },
					   renderer: function(value, metaData, record, rowIndex, colIndex, store){
						   var date = Ext.Date.format(value, 'Y-m-d H:i');
						   return date;
					   }
				   },   
				   a22atd: {
					   displayName: MOST.getApplication().bundle.getMsg('atd'),
					   editor: {
						   xtype: 'textfield',
						   readOnly: true,
						   editable: false,
						   disabled: true
					   },
					   renderer: function(value, metaData, record, rowIndex, colIndex, store){
						   var date = Ext.Date.format(value, 'Y-m-d H:i');
						   return date;
					   }
				   },      
				   a23remarks: {
					   displayName: MOST.getApplication().bundle.getMsg('remark'),
					   editor: {
						   xtype: 'textfield',
						   maxLength : 7,
						   enforceMaxLength : true  
					   }
				   },
				   a24inVoy: {
					   displayName: MOST.getApplication().bundle.getMsg('invoy'),
					   editor: {
						   xtype: 'textfield',
						   readOnly: true,
						   editable: false,
						   disabled: true
					   }
				   },   
				   a25outVoy: {
					  displayName: MOST.getApplication().bundle.getMsg('outvoy'),
					   editor: {
						   xtype: 'textfield',
						   maxLength : 4,
						   enforceMaxLength : true  
					   }
				   },  
				   a26inLane: {
					   displayName: MOST.getApplication().bundle.getMsg('inlane'),
					   editor: {
						   xtype: 'textfield',
						   readOnly: true,
						   editable: false,
						   disabled: true
					   }
				   }, 
				   a27outLane: {
					   displayName: MOST.getApplication().bundle.getMsg('outlane'),
					   editor: {
						   xtype: 'textfield',
						   readOnly: true,
						   editable: false,
						   disabled: true
					   }
				   }, 
				   a28docStatus: {
					   displayName: MOST.getApplication().bundle.getMsg('docstatus'),
					   editor: {
						   xtype: 'numberfield',
						   maxLength : 3,
						   enforceMaxLength : true  
					   }
				   }   
			   },
			   listeners:{
      				propertychange: 'onAlongsidePropertychange'
			   }
		   }]
	   });
	   
	   me.callParent();
   }
});