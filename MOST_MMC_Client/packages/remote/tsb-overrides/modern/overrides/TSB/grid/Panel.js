Ext.define('TSB.grid.Panel', {
	override: 'Ext.grid.Panel',

	columnLines: true,
	
	// added by Brian  (2020/07/08) 'Loading...' MessageBox Remove 
//	viewConfig: {
//        loadMask: false 
//    },
//    style: 'x-column-header',
	//added by Brian (2019/10/31 -To check Authority )
	bbar : {
		beforeRender : function(){this.ownerCt.onBbarBeforeRender(this);}
	},
	
	onBbarBeforeRender:function(pagingToolbar){
		var me = this;
		me.on('beforeedit', me.onPreventEdit);
	},
	
	onPreventEdit : function(editor, e){
      var accessButton = MOST.config.Token.getAccessButtonAuthority();
      if(accessButton != null){
	        if(accessButton.save == "N"){
	        	return false;
	        }
  		}
		return true;
	},

});