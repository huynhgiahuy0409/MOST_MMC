Ext.define('MOST.view.usercontrol.SearchFieldSet', {
    extend: 'Ext.form.FieldSet',
    alias: 'widget.searchfieldset',
    requires: [
        'MOST.view.usercontrol.SearchFieldSetModel'
    ],

	viewModel: {
		type: 'searchfieldset'
    },
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
        	    	
        });
        
        me.addListener('afterrender', me.onLoad, me);
        me.callParent();
    },
	
	/**
	* =========================================================================================================================
	* EVENT HANDLER START
	*/
    
    onLoad: function() {
		var me = this;
		var childControlNameList = new Array();
		
		me.getViewModel().setData({
			childControlNameList: childControlNameList
		});
		
		me.initChildControlNameList(me);
		
		Ext.EventManager.addListener(Ext.getBody(), 'keydown', me.onKeyDown, me);
	},
    
	onKeyDown: function(e, t, eOpts) {
		var me = this;
		
		if (e.getKey() == e.ENTER) {
			var controlNamne = e.target.id;
			var childControlNameList = me.getViewModel().get('childControlNameList');
			
			var checkboxInVesselSchedule = false;
	        if (controlNamne.length == 37 && controlNamne.includes('searchfieldset-',0) && controlNamne.includes('-legendChk-inputEl',19)){
	        	checkboxInVesselSchedule = true;
	        }
			
			if (childControlNameList.indexOf(controlNamne) >= 0 || checkboxInVesselSchedule) {
				var ownerView = me.getOwnerView(me);
				
				if (ownerView !== undefined && ownerView !== null) {
					ownerView.getController().onSearch();
				}
			}
		}
	},
    /**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */
	
	 /**
	 * =========================================================================================================================
	 * METHOD HANDLER START
	 */
	initChildControlNameList: function(control) {
		var me = this;
		var childControlNameList = me.getViewModel().get('childControlNameList');		
		
		if ((control === undefined || control === null)
		 || (typeof control.isXType !== 'function')) {
			return;
		}
		
		if (control.isXType('container') === false){
			childControlNameList.push(control.name);
		}
		else {
			var length = control.items.length;
			
			for (var i = 0; i <= length; i++)
			{
				me.initChildControlNameList(control.items.getAt(i));
			}
		}
	},
	
	getOwnerView: function(ownerCt) {
		var me = this;
		
		if (ownerCt === undefined || ownerCt === null) {
			return null;
		}
		
		if (ownerCt.id.substr(0, 4) === 'app-') {
			return ownerCt;
		}else if (ownerCt.id.substr(0, 6) === 'popup-') { //added by Brian (to include popup screen) 2022/03/03
			return ownerCt;
		}else {
			return me.getOwnerView(ownerCt.ownerCt);
		}
	}
	/**
	 * =========================================================================================================================
	 * METHOD HANDLER END
	 */
});