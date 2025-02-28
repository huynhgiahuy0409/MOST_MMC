Ext.define('MOST.view.popup.DelayCodePopup', {
	extend: "Ext.grid.Panel",

	alias: 'widget.popup-delaycodepopup',

	requires: [
	           'Ext.grid.plugin.RowEditing',
	           
       ],

       itemId: 'delayCodePopup',
       reference: 'delayCodePopupRef',

       controller: 'delaycodepopup',

       title: 'Delay Code',

       constructor: function(config) {
    	   this.callParent(arguments);
       },

       viewModel: {
    	   type: 'delaycodepopup'
       },

       bind: {
    	   store: '{delayCodePopup}'
       },

       width: 500,
       height:400,

       listeners: {
    	   celldblclick: 'onSelectDelayCode'
       },

       initComponent: function() {
    	   var me = this;

    	   Ext.apply(this, {
    		   columns: [
    		             new Ext.grid.RowNumberer({
    		            	 width: 50, 
    		            	 align: 'center'
    		             }),{
    		            	 header: 'Code',
    		            	 dataIndex: 'scd',
    		            	 width: 50,
    		            	 itemId: 'colCode'
    		             }, {
    		            	 header: 'Name',
    		            	 dataIndex: 'scdNm',
    		            	 width: 250,
    		            	 itemId: 'colName'
    		             }, {
    		            	 header: 'Accepted Delay',
    		            	 dataIndex: 'acptYN',
    		            	 width: 100,
    		            	 itemId: 'colAcptYn'
    		             }
    		             ],
    		             dockedItems: [{
    		            	 xtype: 'container',
							layout: {
								type: 'hbox',
								align:'left'
							},
							defaults: {
								margin: '1 1 1 1'
							},	        		            	 
    		            	 items: 
    		            		 [
    		            		  {
    		            			  	xtype:'combo',
                    					reference:'refTypeCombo',
                                        align : 'left',
                                        bind: {
                        	    			store: '{tpCombo}'
                        	    		},
                        	    		displayField: 'tpNm',
                       					valueField: 'tpCd',
                       					queryMode: 'local',
                       					value : 'CD',
                       					width : 80,
                       					editable: false
    		            		  }, {
    		            			  xtype: 'textfield',
    		            			  reference: 'txtScd',
    		            			  listeners:{
    	    								change: function(){
    	    									this.setValue(this.getValue().toUpperCase());
    	    								},
    	    								specialkey: function(field, e){
    	    				                    if (e.getKey() == e.ENTER) {
    	    				                    	me.getController().onSearch();
    	    				                    }
    	    				                }
    	    							}
    		            		  }, {
    		            			  xtype: 'button',
    		            			  iconCls: 'x-fa fa-search',
    		  						  cls: 'search-button', 
    		            			  text: 'Search',
    		            			  margin : '1 1 1 10',
    		            			  width : 120,
    		            			  listeners: {
    		            				  click: 'onSearch'
    		            			  }
    		            		  }
    		            		  ]
    		             }]
    	   });

    	   this.callParent();
       }
});