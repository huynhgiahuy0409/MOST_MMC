Ext.define('MOST.view.planning.vesselscheduleinternal.VesselScheduleLegendInfoPopup', {
	extend: 'Ext.form.Panel',
	alias: 'widget.popup-vesselschedulelegendinfopopup',
	
	requires: [
	    'Ext.layout.container.Table'
	],
	
	title:'Legend Info',
	width:500,
	height:210,
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	initComponent: function() {
		var me = this;
		
		Ext.apply(this, {
			xtype:'form',
			defaults:{
				margin: '5 5 0 5' // top, right, bottom, left
			},
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
			{ // Row : 1
				xtype: 'fieldset',
				margin : '5 5 5 5',
				items:[{
					defaults:{
						margin: '0 5 0 0',
						labelAlign: 'right'
					},
					xtype:'container',
					layout: 'hbox',
					items:[{
						xtype: 'label',
					    text: '        ',
					    style: {
					    	background : '#BBFFBB'
				        },
					    width: 60,
					    height: 30
	   				},{
						xtype: 'label',
					    text: 'If ETA be changed by VCS, the row color change to [Green].'
	   				}]
		        }]
			}, { // Row : 2
				xtype: 'fieldset',
				margin : '5 5 5 5',
				items:[{
					defaults:{
						margin: '0 5 0 0',
						labelAlign: 'right'
					},
					xtype:'container',
					layout: 'hbox',
					items:[{
						xtype: 'label',
					    text: '        ',
					    style: {
					    	background : '#BBBBFF'
				        },
					    width: 60,
					    height: 30
	   				},{
						xtype: 'label',
					    text: 'Confirmation Slip is not submited until 24hours before ETA(3days for \n scheduled), The row color change to [Blue].'
	   				}]
		        }]
			}, { // Row : 3
				xtype: 'fieldset',
				margin : '5 5 5 5',
				items:[{
					defaults:{
						margin: '0 5 0 0',
						labelAlign: 'right'
					},
					xtype:'container',
					layout: 'hbox',
					items:[{
						xtype: 'label',
					    text: '        ',
					    style: {
					    	background : '#FFCCFF'
				        },
					    width: 60,
					    height: 30
	   				},{
						xtype: 'label',
					    text: 'If the Credit Balance is negative (include 0), the row color become [Red].'
	   				}]
		        }]
			}]
		});
		me.callParent();
	}
});

