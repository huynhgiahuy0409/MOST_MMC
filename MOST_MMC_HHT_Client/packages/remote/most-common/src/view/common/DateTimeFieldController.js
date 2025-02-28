Ext.define('MOST.view.common.DateTimeFieldController', {
	extend: 'MOST.view.foundation.BaseViewController',
	
	alias: 'controller.datetimefield',

	onChangeDate: function(){
		var refs = this.getReferences(); 
		if(refs.txtTime.getValue() == '' || refs.txtTime.getValue() == null){
			refs.txtTime.setValue('00:00');
		}
	},
	
});