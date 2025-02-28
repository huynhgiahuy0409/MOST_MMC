/**
 * Grid Utility
 */
var GridUtil = function(){}

GridUtil.SPLIT_CHAR = '+';

// Grid RemoveRow
GridUtil.removeRow = function(me, grid, store, callBackFunc){ 
	var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
	
	if(selection == null) return;
	
	MessageUtil.question('remove', 'infodelete_msg', null,
			function(button){
				if (button === 'ok') {
					store.remove(selection);
					store.sync({
						success: function(){
							if(callBackFunc){
								callBackFunc(me);
							}
						}
					});
				}
			}
		);
}

// Grid CancelEdit
GridUtil.cancelEdit = function(rowEditing, context){
	// Canceling editing of a locally added, unsaved record: remove it
	if (context.record.phantom) {
		context.store.remove(context.record);
	}
}

// Grid Edit
GridUtil.edit = function(edit, context, isDoNotReload){
	var isReload = false;
	
	if(isDoNotReload != undefined){
		isReload = !isDoNotReload;
	}
	
	if (context.record.phantom) {
		MessageUtil.question('add', 'infoinsert_msg', null, 
				function(button){
					if (button === 'ok') {
			        	context.store.sync({
							success: function(){
								if(isReload){
									context.store.reload();
								} else {
									context.store.commitChanges();
								}
								
								MessageUtil.saveSuccess(); // Success Message
							}
						});
			        }else if(button === 'cancel'){
			        	context.store.removeAt(context.rowIdx);
			        };
				}
			);
	} else {
		context.store.sync({
			success: function(){
				if(isReload){
					context.store.reload();
				} else {
					context.store.commitChanges();
				}
				
				MessageUtil.saveSuccess(); // Success Message
			}
		});
	}
}

// Grid Duplication Check
GridUtil.dupliationCheck = function(me, editor, context, store, params, ignorePhantom){
	if(context.record.phantom == true || ignorePhantom == true) {
		store.load({
			params: params,
			callback: function(records, operation, success) {
				this.resumeEvent('edit');
				if (success) {
					if(records.length > 0){
						MessageUtil.duplicationFail();
						me.fireEvent('cancelEdit', editor, context);
					} else {
						me.fireEvent('edit', editor, context);
					}
				} else {
					me.fireEvent('cancelEdit', editor, context);
				}
			},
			scope: me
		});

		me.suspendEvent('edit');
	}
}

// Excel Export
GridUtil.saveExcel = function(me, grid, addString){
	var currentDate = new Date();
	var dateString = Ext.Date.format(currentDate, 'YmdHis');
	var excelFileName = "";
	var excelTitle = "";
	
	if(typeof addString !== 'string'){
		addString = null;
	}
	
	var title = me.getView().title;
	title = title.replace(/[/]/gi, " ");
	if(addString){
		excelFileName = Ext.String.format("{0}-{1}_{2}", title, addString, dateString);
		excelTitle = Ext.String.format("{0} {1}", title, addString);
	} else {
		excelFileName = Ext.String.format("{0}_{1}", title, dateString);
		excelTitle = title;
	}
	
	grid.saveDocumentAs({
    	type: 'xlsx',
    	title: excelTitle,
        fileName: excelFileName + ".xlsx"
    });
}

// Grid Get columns
GridUtil.getColumns = function(grid){
	
	var columns = null;//grid.columns;
	
	if(grid.columnManager && grid.columnManager.columns)
	{
		columns = grid.columnManager.columns;
	}
	
	if(columns == null)
	{
		columns = grid.columns;
	}
	return columns;
}

// Column Filter
GridUtil.settingColumn = function(grid){
 
	var headerCt = grid.headerCt;
    var columns = GridUtil.getColumns(grid);
    var	displayColumns = new Array();
    var hiddenColumns = new Array();
    var lockedCount = 0;
    var columnCount = 0;
    
    if(grid.displayColumns){
    	if(grid.lockedCount){
    		lockedCount = grid.lockedCount;
    	}
    	
    	// define display columns
    	grid.displayColumns.forEach(function(columnName){
    		var addColumn = Ext.Array.findBy(columns, function(column){
    						if(column.dataIndex === columnName){
    							column.isDisplay = true; 
    							return true;
    						}
    					});

    		if(addColumn){
    			displayColumns.push(addColumn);
    		}
    	});
    			
    	// Column Visible/Lock 
		columns.forEach(function(column){
			var idx = displayColumns.indexOf(column);
			
			if(idx >= 0){
				column.setVisible(true);
				columnCount++;
				
				if(grid.enableLocking &&
				   column.xtype !== 'actioncolumn'){
					if(idx < lockedCount){
						grid.lock(column);
					}
					else {
						if (column.isLocked() == true) {
							grid.unlock(column);
						}
					}
				}
			} else {
				if(column.xtype != 'rownumberer')
				{
					column.setVisible(false);
				}
				hiddenColumns.push(column);
			}
    	});
		
		if (grid.useRearrangeColumn == true) {
			// Order columns
			var lockColumnList = new Array();
			var normalColumnList = new Array();
					
			//Display Column
			for(var i = 0; i < displayColumns.length; i++) {
				var lockColumn = GridUtil.getLockHeader(grid, displayColumns[i]);
				if (lockColumn) {
					lockColumnList.push(lockColumn);
				}
				
				var normalColumn = GridUtil.getNormalHeader(grid, displayColumns[i]);
				if (normalColumn) {
					normalColumnList.push(normalColumn);
				}
			}
			
			//Hidden Column
			for(var i = 0; i < hiddenColumns.length; i++) {
				var lockColumn = GridUtil.getLockHeader(grid, hiddenColumns[i]);
				if (lockColumn) {
					var idx = lockColumnList.indexOf(lockColumn); 
					if (idx < 0) {
						lockColumnList.push(lockColumn);	
					}
				}
				
				var normalColumn = GridUtil.getNormalHeader(grid, hiddenColumns[i]);
				if (normalColumn) {
					var idx = normalColumnList.indexOf(normalColumn);
					if (idx < 0) {
						normalColumnList.push(normalColumn);	
					}
				}
			}
			
			grid.getView().lockedGrid.headerCt.items.removeAll();
			for(var i = 0; i < lockColumnList.length; i++) {
				grid.getView().lockedGrid.headerCt.add(lockColumnList[i]);	
			}
			
			grid.getView().normalGrid.headerCt.items.removeAll();
			for(var i = 0; i < normalColumnList.length; i++) {
				grid.getView().normalGrid.headerCt.add(normalColumnList[i]);	
			}
			
			// selModel<CheckColumn> - first column move
			if(grid.enableLocking){
				headerCt = grid.getView().lockedGrid.headerCt;
			}
			
			var checkColumn = Ext.Array.findBy(headerCt.getGridColumns(), function(column){
									if((column.xtype === 'checkcolumn'|| column.xtype === 'rownumberer')
											&&
									   (column.cls === 'x-selmodel-column' || column.cls ===  'x-ssm-row-numberer-hd')
									   ){
										return true;
									}
								});
			
			if(checkColumn){
				headerCt.moveBefore(checkColumn, (displayColumns[0]||null));
			}
		}
		
		// Order columns (Backup Start)
//		var headerCt = grid.headerCt;
//
//		for(var i=0;i<displayColumns.length;i++){
//			if(grid.enableLocking){
//	    		if(i >= lockedCount){
//	    			headerCt = grid.getView().normalGrid.headerCt;
//	    		} else {
//	    			headerCt = grid.getView().lockedGrid.headerCt;
//	    		}
//			}
//			
//			var currentColumn =  GridUtil.getGroupHeader(grid, displayColumns[i]);
//			if(!currentColumn)
//			{
//				currentColumn = displayColumns[i];
//			}
//			
//			var prviousColumn  = GridUtil.getGroupHeader(grid, displayColumns[i-1]);
//			if(!prviousColumn)
//			{
//				prviousColumn =  displayColumns[i-1];
//			}
//			
//			
//    		headerCt.moveAfter(currentColumn, (prviousColumn||null));
//    	}
//		
//		// selModel<CheckColumn> - first column move
//		if(grid.enableLocking){
//			headerCt = grid.getView().lockedGrid.headerCt;
//		}
//		
//		var checkColumn = Ext.Array.findBy(headerCt.getGridColumns(), function(column){
//								if((column.xtype === 'checkcolumn'|| column.xtype === 'rownumberer')
//										&&
//								   (column.cls === 'x-selmodel-column' || column.cls ===  'x-ssm-row-numberer-hd')
//								   ){
//									return true;
//								}
//							});
//		
//		if(checkColumn){
//			headerCt.moveBefore(checkColumn, (displayColumns[0]||null));
//		}
		// Order columns (Backup End)
    }
}

GridUtil.getGroupHeader = function(grid, currentColumn){
	if(!currentColumn)
	{
		return null;
	}
	var terunColumn;
	grid.lockedGrid.headerCt.items.items.forEach(function(groupColumn){
		if(groupColumn.items.length>0)
		{
			groupColumn.items.items.forEach(function(column){
			if(column)
			{
				if(column.dataIndex == currentColumn.dataIndex)
				{
					terunColumn = groupColumn;
				}
			}
		});
		}
		
	});
	
	
	grid.normalGrid.headerCt.items.items.forEach(function(groupColumn){
		if(groupColumn.items.length>0)
		{
			groupColumn.items.items.forEach(function(column){
			if(column)
			{
				if(column.dataIndex == currentColumn.dataIndex)
				{
					terunColumn =  groupColumn;
				}
			}
		});
		}
		
	});
	
	return terunColumn;
}

GridUtil.getLockHeader = function(grid, currentColumn) {
	if(!currentColumn)
	{
		return null;
	}
	
	var returnColumn;
	grid.lockedGrid.headerCt.items.items.forEach(function(column) {
		if(column) {
			if(column.items.length > 0) {
				column.items.items.forEach(function(subColumn) {
					if(subColumn.dataIndex == currentColumn.dataIndex) {
						returnColumn = column;
						return;
					}
				});
			}
			else {
				if(column.dataIndex == currentColumn.dataIndex) {
					returnColumn = column;
				}	
			}	
		}
		
	});
	
	return returnColumn;
}

GridUtil.getNormalHeader = function(grid, currentColumn) {
	if(!currentColumn)
	{
		return null;
	}
	
	var returnColumn;
	grid.normalGrid.headerCt.items.items.forEach(function(column) {
		if(column) {
			if(column.items.length > 0) {
				if(column.items.items !== undefined){ //added by Brian (2022/11/28) to avoid undefined error for mulit grid column setting function
					column.items.items.forEach(function(subColumn) {
						if(subColumn.dataIndex == currentColumn.dataIndex) {
							returnColumn = column;
							return;
						}
					});
				}
				
			}
			else {
				if(column.dataIndex == currentColumn.dataIndex) {
					returnColumn = column;
				}	
			}
		}
	});
	
	return returnColumn;
}

GridUtil.gridColumeStore = null;
GridUtil.projectGridColumnStore = null;

GridUtil.setGridColumns = function(grid, code){
	var gridColumnStore = GridUtil.gridColumeStore;
	var projectGridColumnStore = GridUtil.projectGridColumnStore;
	
	var idx = projectGridColumnStore.findExact('key', code);
	if(idx > -1){
		var columns = projectGridColumnStore.getAt(idx).get('items');
		grid.reconfigure(columns);
	}else{
		idx = gridColumnStore.findExact('key', code);
		var columns = gridColumnStore.getAt(idx).get('items');
		grid.reconfigure(columns);
	}
}
GridUtil.getGridColumns = function(code){
	var gridColumnStore = GridUtil.gridColumeStore;
	var projectGridColumnStore = GridUtil.projectGridColumnStore;
	
	var idx = projectGridColumnStore.findExact('key', code);
	if(idx > -1){
		return projectGridColumnStore.getAt(idx).get('items');
	}else{
		idx = gridColumnStore.findExact('key', code);
		return gridColumnStore.getAt(idx).get('items');
	}
}


GridUtil.groupingStore = null;
GridUtil.projectGroupingStore = null;

GridUtil.getGrouping = function(code){
	var groupingStore = GridUtil.groupingStore;
	var projectGroupingStore = GridUtil.projectGroupingStore;
	
	var idx = projectGroupingStore.findExact('key', code);
	if(idx > -1){
		return projectGroupingStore.getAt(idx).get('items');
	}else{
		idx = groupingStore.findExact('key', code);
		return groupingStore.getAt(idx).get('items');
	}
},

GridUtil.externalUserColumnDefaultValue = '';
GridUtil.setExternalUserColumnDefaultValue = function() {
	var store = Ext.create('Ext.data.Store',{
		storeId: 'columnDisplayStore',
		proxy: {
			showProgressBar : false,
			type: 'rest',
			url: MOST.config.Locale.getRestApiDestUrl() + '/v1/columnsetting/getColumnDefaultValue'
		}
	});
	
	var params = {
			code: MOST.config.Token.getPgmCode(),
			defaultCheck : CommonConstants.YES
	};
	
	store.load({
		params: params,
		callback: function(records, operation, success) {
			if (success) {
				if(records && records.length <= 0){
					GridUtil.externalUserColumnDefaultValue = CommonConstants.NO;
				}
				else {
					if (StringUtil.isNullorEmpty(records[0].get('value')) === false) {
						GridUtil.externalUserColumnDefaultValue = CommonConstants.YES;	
					}
					else {
						GridUtil.externalUserColumnDefaultValue = CommonConstants.NO;
					}
				}
			}
		}
	});
},

GridUtil.settingExternalUserColumnDefault = function(grid) {
	var columns = GridUtil.getGridColumns(grid.gridColumnName);
	var displayColumns = new Array();
	
	if ((columns === undefined || columns === null)
     || (grid.displayColumns === undefined || grid.displayColumns === null)) {
		return;
	}
	
	columns.forEach(function(column) {
		if (grid.displayColumns.indexOf(column.dataIndex) >= 0) {
			displayColumns.push(column);
		}
	});
	
	grid.reconfigure(displayColumns);
}




GridUtil.changeGrouping = function(previousColumns, grid) {
	var groupingColumns = grid.getVisibleColumns();
	var headerString = GridUtil.getGroupingHeaderString(previousColumns, groupingColumns);
	grid.displayColumns = headerString.split(GridUtil.SPLIT_CHAR);
	
	GridUtil.settingColumn(grid);
}

GridUtil.getGroupingHeaderString = function(previousColumns, groupingColumns){
	var me = this;
	var header = '';
	var i = 0;

	
	groupingColumns.forEach(function(column){
		
		if(column.xtype!=='rownumberer' && column.locked)
		{
			
			if(header.length > 0)
			{
				header += GridUtil.SPLIT_CHAR;
			}
			
			header += column.dataIndex;
			
			
		}
	});
	
	
	previousColumns.forEach(function(column, idx){
		
		if(header.length > 0)
		{
			header += GridUtil.SPLIT_CHAR;
		}
		
		header += column.dataIndex;
		
		
	})
	
	return header;
}

GridUtil.getGroupHeaderString = function(grid, currentColumn){
	if(!currentColumn)
	{
		return null;
	}
	
	var returnHeader = GridUtil.getHeader(grid.normalGrid.headerCt.items.items, currentColumn, returnHeader);
	return returnHeader;
}
GridUtil.getHeader = function(items, currentColumn) {
	
	
	for (var i = 0 ; i < items.length ; i ++) {
		
		if(items[i].xtype == 'gridcolumn')
		{
			
			var returnHeader = GridUtil.getHeader(items[i].items.items, currentColumn) ;
			if(returnHeader)
			{
				returnHeader = items[i].text  + '-' +  returnHeader;
				return returnHeader;
			}
		
		}else if(items[i].dataIndex  == currentColumn.dataIndex)
		{
			return items[i].text;
		}
	}
	
	
}

GridUtil.createColumn = function (text, dataIndex, width, align, style, reference) {
	var column = {};
	column["text"] = text;
	column["dataIndex"] = dataIndex;
	column["width"] = width;
	column["align"] = align;
	column["style"] = style;
	column["reference"] = reference;
	
	return column;
}

GridUtil.createMultiHeaderColumn = function (header, reference) {
	var column = {};
	column["header"] = header;
	column["reference"] = reference;
	column["columns"] = new Array();
	
	return column;
}


