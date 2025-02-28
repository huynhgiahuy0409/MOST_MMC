
Ext.define('TSB.ux.grid.GridPanel', {
	extend : 'Ext.grid.Panel',
	xtype : 'tsb-datagrid',
//	flex:1,
	PAGING_SEARCH_EVENT_NAME : 'pagingSearch',
	
	viewConfig: {
        loadMask: false // 'Loading...' MessageBox Remove
        
    },
    pagingToolbar : null,
    //20200222byAnna) for fixed column setting.
    enableLocking : true, 
    //20200423 by Tiffany) add total record bar
    useRecordToolbar : false, 
    
    selectedDataIndex:null,
    
    scrollable :false,
    
    initDefaultColumn:true,
    
    gridColumnName:'',
    
    gridName:'', // added by Brian (2022/11/28), To support multi grid columnsetting 
    
    rowEditorBottomButtonLastRow: undefined,
    
    summaryRowIndex : undefined, // TOP : -1, BOTTOM : 1
    
    useRearrangeColumn: true,
    
    mergeKeyPropertyArray: new Array(),
	/**
	 * =================================================================================
	 * Paging Toolbar Start
	 * this is Grid Panel.
	 */
	bbar : {
		xtype : 'pagingtoolbar',
		displayInfo : true,
		displayMsg : 'Displaying records {0} - {1} of {2}',
		emptyMsg : "No records to display",
		inputItemWidth: 45,
		moveFirst : function(){this.ownerCt.onPagingMoveFirst(this);},
		movePrevious : function(){this.ownerCt.onPagingMovePrevious(this);},
		moveNext : function(){this.ownerCt.onPagingMoveNext(this);},
		moveLast : function(){this.ownerCt.onPagingMoveLast(this);},
		onPagingKeyDown : function(field, e){this.ownerCt.onPagingKeyDown(field, e, this);},
		
		doRefresh : function(){ this.ownerCt.onPagingRefresh(this);},
		beforeRender : function(){this.ownerCt.onBbarBeforeRender(this);},
		height:35,
	},
	listeners: {
		cellclick:function( control, td, cellIndex, record, tr, rowIndex, e, eOpts ){
	    	this.selectedDataIndex = control.getColumnManager().columns[cellIndex].dataIndex;
	    } ,
	    
	    resize:function(){
	    	this.updateRowSpan();
	    },
	    afterLayout: function(obj){
	    	this.updateRowSpan();
	    },
	    afterrender:function() {
            var element = this.getEl();
            var me = this;
           
            element.on('mousewheel', function(e, t) {
                var height = element.getHeight();
               
                if (height + t.scrollTop >= t.scrollHeight) {
                	 me.updateRowSpan();
                }
            });    
            
            me.checkSortableColumn();
            
            me.initPopupCodeList();
	    },
	    sortchange : function()
        {
          this.changeGridSort();
        }
    },
	// Before Renderer - onCreate
	onBbarBeforeRender:function(pagingToolbar){
		var me = this;
		
		if(me.usePagingToolbar != null &&
		   me.usePagingToolbar == false){
			pagingToolbar.setVisible(false);
		}else if(me.useRecordToolbar)
		{
			pagingToolbar.displayMsg = 'Displaying records {2}';
			
			
			var pagingControls = pagingToolbar.items;
			Ext.Array.each(pagingControls.items, function(control) {
				
				if(control.xtype == 'tbfill' || control.itemId == 'displayItem')
				{
					control.setVisible(true);
				}else
				{
					control.setVisible(false);
				}
				
				
			});
		}else
		{
			 me.usePagingToolbar = true;
		}
		
		pagingToolbar.down('#refresh').hide(); // refresh button hide
		me.pagingToolbar = pagingToolbar;
		me.on('beforeedit', me.onPreventEdit);
		if(me.initDefaultColumn)
		{
			me.settingDefaultColumnDisplay(); // default Column Display
		}
		
	},
	
	// Setting Default Column Display
	settingDefaultColumnDisplay:function(){
		var me = this;
		var refs = me.getReferences();
		var parentView = me.ownerCt;
		var viewId = parentView.xtype; 
		
		if(!parentView.xtype.startsWith('app-')){
			if(!parentView.ownerCt.xtype.startsWith('app-')){ //added by Brian (2022/11/30)
				if(!parentView.ownerCt.ownerCt.xtype.startsWith('app-')){ //added by Brian (2022/11/30)
					viewId = parentView.ownerCt.ownerCt.ownerCt.xtype;
				}else{
					viewId = parentView.ownerCt.ownerCt.xtype;
				}
				
			}else{
				viewId = parentView.ownerCt.xtype;
			}
			
		}
		
		var store = Ext.create('Ext.data.Store',{
						storeId: 'columnDisplayStore',
						proxy: {
							showProgressBar : false,
							type: 'rest',
							url: MOST.config.Locale.getRestApiDestUrl() + '/v1/columnsetting/searchItems'
						}
					});
		var params = {
				//menu : viewId, // removed by Brian (grid reference should be unique)
				code : CodeConstants.LCD_MOST, //added by Brian (2022/11/29)
				defaultCheck : CommonConstants.YES,
				gridReference:me.referenceKey
				
		};
		
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					var defaultColumn = Ext.Array.findBy(records, function(record){
						if(record && record.get('defaultCheck') === 'Y'){ 
							return true;
						}
					});
					
					if(defaultColumn && defaultColumn.get('header')){
						var arrHeader = defaultColumn.get('header').split(GridUtil.SPLIT_CHAR);
	        			me.displayColumns = arrHeader;
	        			me.columnId = defaultColumn.get('no');
	        			me.lockedCount = defaultColumn.get('fixedColumn');
	        			
	        			if (GridUtil.externalUserColumnDefaultValue === CommonConstants.YES) {
	        				GridUtil.settingExternalUserColumnDefault(me);	
	        			}
	        			
	            		GridUtil.settingColumn(me);
					}
				}
			}
		});
	},
	
	onPreventEdit : function(editor, e){
		var accessButton = MOST.config.Token.getAccessButtonAuthority();
		var activePanel =  editor.view.isLockingView ?  editor.view.lockedGrid.ownerCt.ownerCt :editor.view.ownerCt.ownerCt;
        
	    if(accessButton != null){
			if(accessButton.save == "N"){
				return false;
			}
	  	}
	    
		return true;
	},
	
	onPagingLoad:function(){
		var me = this;
		me.pagingToolbar.onLoad();
	},
	
	
	// Paging Move First
	onPagingMoveFirst : function(pagingToolbar) {
		var me = this,
		store = pagingToolbar.store;
		
        if (pagingToolbar.fireEvent('beforechange', pagingToolbar, 1) !== false){
        	store.currentPage = 1;
        	me.fireEvent(this.PAGING_SEARCH_EVENT_NAME, pagingToolbar);
            return true;
        }
        return false;
	},
	
	// Paging Move Previous
	onPagingMovePrevious : function(pagingToolbar) {
		var me = this,
		store = pagingToolbar.store,
		prev = store.currentPage - 1;

		if (prev > 0) {
			if (pagingToolbar.fireEvent('beforechange', me, prev) !== false) {
				store.currentPage--;
				me.fireEvent(this.PAGING_SEARCH_EVENT_NAME, pagingToolbar);
				return true;
			}
		}
		return false;
	},
	
	// Paging Move Next
	onPagingMoveNext : function(pagingToolbar) {
		var me = this;
		var store = pagingToolbar.store;
		var total = pagingToolbar.getPageData().pageCount;
		var next = store.currentPage + 1;

		if (next <= total) {
			if (pagingToolbar.fireEvent('beforechange', me, next) !== false) {
				store.currentPage++;
				me.fireEvent(this.PAGING_SEARCH_EVENT_NAME, pagingToolbar);
				return true;
			}
		}
		
		return false;
	},
	
	// Paging Move Last
	onPagingMoveLast : function(pagingToolbar) {
		var me = this,
		store = pagingToolbar.store,
		last = pagingToolbar.getPageData().pageCount;

		if (pagingToolbar.fireEvent('beforechange', me, last) !== false) {
			store.currentPage = last;
			me.fireEvent(this.PAGING_SEARCH_EVENT_NAME, pagingToolbar);
			return true;
		}
		
		return false;
	},
	
	// Paging Move Refresh
	onPagingRefresh : function(pagingToolbar){
		var me = this;
		var store = pagingToolbar.store;
		var current = store.currentPage;

		if (pagingToolbar.fireEvent('beforechange', me, current) !== false) {
			me.fireEvent(this.PAGING_SEARCH_EVENT_NAME, me.pagingToolbar);
			return true;
		}
		
		return false;
	},
	

	onPagingKeyDown : function(field, e, pagingToolbar) {
		var me = this,
		store = pagingToolbar.store;
		var key = e.getKey();
		if (key === e.RETURN) {
			var pageNum = pagingToolbar.readPageFromInput(me.pagingToolbar.getPageData());
			
			//added by Brian (To prevent block SQL)
			if(me.pagingToolbar.getPageData().pageCount <pageNum  || 
			   pageNum <= 0 || 
			   pageNum === false ){
				Ext.Msg.alert('Warning', TSB.locale.i18n.Bundle.instance.getMsg('no_match_data_msg')); 
				return;
			}
			
			if (pagingToolbar.fireEvent('beforechange', me, pageNum) !== false) {
				store.currentPage = pageNum;
				me.fireEvent(this.PAGING_SEARCH_EVENT_NAME, pagingToolbar);
				return true;
			}
			
			
		}
		
	},
	
	isMergeable:function(){
		var columns = this.getColumns();
		for (var columnIndex = 0 ; columnIndex < columns.length ; columnIndex++)
	    {
	          column = columns[columnIndex];
	          if(column.mergeable)
	    	  {
	    		  return true; 
	    	  }
	    }
		return false;
		 
	},
	
	isMergeableRender:function(){
		var columns = this.getColumns();
		for (var columnIndex = 0 ; columnIndex < columns.length ; columnIndex++)
	    {
	          column = columns[columnIndex];
	          if(column.mergeableRender == "true")
	    	  {
	    		  return true; 
	    	  }
	    }
		return false;		 
	},

	updateRowSpan: function() {		
		if(!this.isMergeable() && !this.isMergeableRender())
		{
			return;
		}
		
		if (this.isMergeable()) {
			this.updateRowSpanMergeable();
		}
		else if (this.isMergeableRender()) {
			this.updateRowSpanMergeableRender();
		}
    },
    
    updateRowSpanMergeable: function() {
    	var me = this;
        var columns = this.getColumns(),
            view =this.getView(),
            store = this.getStore(),
            rowCount = store.getCount(),
            column,
            dataIndex,
            spanCell = null,
            spanValue = null;
        
      // 1> check for mergeing column
      for (var columnIndex = 0 ; columnIndex < columns.length ; columnIndex++)
      {
    	
          column = columns[columnIndex];
          if(!column.mergeable)
    	  {
    		  continue;
    	  }
          
          spanValue = null;
          dataIndex = column.dataIndex;
    	  for (var rowIndex = 0; rowIndex < rowCount; ++rowIndex) {
    		  var gridRow = column.getView().getRow(rowIndex) ;
    		  if(gridRow === null) continue;
              var cell = gridRow.querySelector(column.getCellSelector()),
                  record = store.getAt(rowIndex),
                  value = record.get(dataIndex);
              
              if(cell){
            	  if (spanValue != value) {
                	  Ext.fly(cell).addCls('grid-merge-cell');
                      spanCount = 1;
                      spanValue = value;
                  } else {
                	  
                	  var isMerge = true;
                	  if(columnIndex-1>= 0 && rowIndex-1 >=0)
                	  {
                		  var previousColumn = columns[columnIndex-1];
                		  var previousRow = column.getView().getRow(rowIndex-1) ;
                		  
                		  if(previousRow !=null && previousColumn != null)
                		  {
                			 var previousRecord = store.getAt(rowIndex-1);
                			 if(previousRecord.get(previousColumn.dataIndex) != record.get(previousColumn.dataIndex))
                			{
                				 Ext.fly(cell).addCls('grid-merge-cell');
                                 spanCount = 1;
                                 spanValue = value;
                                 isMerge = false;
                			}
                			 
                			 //Check mergeKeyPropertyArray
                			 if (isMerge == true && me.mergeKeyPropertyArray != null && me.mergeKeyPropertyArray != undefined && me.mergeKeyPropertyArray.length > 0) {
                				 for (var index = 0; index < me.mergeKeyPropertyArray.length; index++) {
                					 var mergeKeyProperty = me.mergeKeyPropertyArray[index];
                					 
                					 if(previousRecord.get(mergeKeyProperty) != record.get(mergeKeyProperty)) {
                						 Ext.fly(cell).addCls('grid-merge-cell');
                                         spanCount = 1;
                                         spanValue = value;
                                         isMerge = false;
                                         break;
                					 }
                				 }
                			 }
                		  }
                	  }
                	  
                	  if(isMerge)
                	  {
                		  Ext.fly(cell).addCls('grid-merge-cell-color');
                	  }
                	  
                  }
              }
              
          }
	  }
      
      // 2. check for TOTAL row
	  
	  for (var rowIndex = 0; rowIndex < rowCount; ++rowIndex) {
		  var totalcolumn = 10000;
	      for (var columnIndex = 1 ; columnIndex < columns.length ; columnIndex++)
	      {
	    	
	          column = columns[columnIndex];
	          dataIndex = column.dataIndex;
	          var gridRow = column.getView().getRow(rowIndex) ;
    		  if(gridRow === null) continue;
              var cell = gridRow.querySelector(column.getCellSelector()),
              record = store.getAt(rowIndex),
              value = record.get(dataIndex);
              
              if(cell === null) continue;
          
	          if(column.mergeable && record.get(dataIndex) !=null &&(record.get(dataIndex).indexOf('TOTAL') >= 0 || record.get(dataIndex) == 'AVG'))
	    	  {
	        	  totalcolumn = columnIndex;
	    	  }
	          
	          if(totalcolumn <= columnIndex)
	    	  {
	        	  if(totalcolumn == columnIndex)
	              {
	        		  // total first column
	        		  Ext.fly(cell).addCls('grid-merge-cell-total-first');
	               }else  if(columnIndex == columns.length-1)
	              {
	            	  // last column
	            	  Ext.fly(cell).addCls('grid-merge-cell-total-last');  
	               }else if(totalcolumn < columnIndex){
	            	   // middle column
	            	   Ext.fly(cell).addCls('grid-merge-cell-total-middle');  
	               }
	    	  }
          
	      }
          
      }
//	  me.syncRowHeights();
	  
	  if (!this.destroyed) {
		    var me = this, normalView = me.normalGrid.getView(), lockedView = me.lockedGrid.getView(), normalSync = normalView.syncRowHeightBegin(), lockedSync = lockedView.syncRowHeightBegin(), scrollTop;
		    
		    if(me.lockedGrid.getColumns().length > 1)
		    {
		    	normalView.syncRowHeightMeasure(normalSync);
			    lockedView.syncRowHeightMeasure(lockedSync);
			    normalView.syncRowHeightFinish(normalSync, lockedSync);
			    lockedView.syncRowHeightFinish(lockedSync, normalSync);
//			    scrollTop = normalView.getScrollY();
//			    lockedView.setScrollY(scrollTop);
		    }
		    
		    
		  }
    },
    
    updateRowSpanMergeableRender: function() {
    	var me = this;
    	var view = me.getView();
    	var store = me.getStore();
    	var gridColumns = me.getColumns();
    	var rowCount = store.getCount();
    	
    	for (var columnIndex = 0; columnIndex < gridColumns.length; columnIndex++) {
    		var currColumn = gridColumns[columnIndex];
    		if (currColumn === undefined || currColumn === null) continue;
			    		
    		if (currColumn.mergeableRender != "true") {
    			continue;
    		}
    		
    		for (var rowIndex = 0; rowIndex < rowCount; ++rowIndex) {    			
    			var currRow = currColumn.getView().getRow(rowIndex);
    			var previousRow = column.getView().getRow(rowIndex - 1);
      		  	
    			if (currRow === undefined || currRow === null) continue;
    			if (previousRow === undefined || previousRow === null) continue;
    			      		  	
    			var prevRecord = store.getAt(rowIndex - 1);
    			if (prevRecord === undefined || prevRecord === null) continue;
    			
    			var currCell = currRow.querySelector(currColumn.getCellSelector());
    			if (currCell === undefined || currCell === null) continue;
    			
    			var currRecord = store.getAt(rowIndex);
    			var previousRecord = store.getAt(rowIndex - 1);
    			
    			if (currRecord === undefined || currRecord === null) continue;
    			if (previousRecord === undefined || previousRecord === null) continue;
    			
    			var dataIndex = currColumn.dataIndex;
    			var isMerge = false;
    			
    			if (currRecord.get(dataIndex) == previousRecord.get(dataIndex)) {
    				isMerge = true
    			}
    			else {
    				isMerge = false;
    			}
    			
    			if (isMerge == true && me.mergeKeyPropertyArray != null && me.mergeKeyPropertyArray != undefined && me.mergeKeyPropertyArray.length > 0) {
    				for (var index = 0; index < me.mergeKeyPropertyArray.length; index++) {
    					var mergeKeyProperty = me.mergeKeyPropertyArray[index];
    					
    					if(currRecord.get(mergeKeyProperty) != previousRecord.get(mergeKeyProperty)) {
    						isMerge = false;
                            break;
    					}
    				}
				}
    			
    			if (isMerge == true) {
    				currCell.textContent = '';	
    			}
    		}
    	}
    },
    
    getSortString:function(){
    	var me = this;
    	var store = me.getStore();
    	var sortString = '';
		if(store.getSorters() && store.getSorters().items && store.getSorters().items.length > 0)
		{
			
			Ext.Array.each( store.getSorters().items, function(record) {
				var column = me.getColumnManager().getHeaderByDataIndex(record.getProperty());

				if(!Ext.isDefined(column.sortField)) return false;
				if(sortString.length > 0) sortString = sortString +",";
				
				sortString = sortString + column.sortField ;
				sortString = sortString + ' ';
				sortString = sortString + record.getDirection();
			});
			
		}
		return sortString;
		
    },
    
    changeGridSort:function(){
    	 var me = this;
    	 
    	 if(!me.isAutoSearchBySorting())
 		 {
     		return;
 		 }
    	 
    	 
    	if(me.usePagingToolbar && me.getStore() && me.getStore().getTotalCount()>0)
		{
    		if(me.up('panel') && me.up('panel').getController())
			{
    			var viewController = me.up('panel').getController();
    			if(viewController.onDataChangeSearchParam){
    				viewController.onDataChangeSearchParam(null, null, viewController);
    			}
    				
    			if(viewController.onSearch)
				{
    				viewController.onSearch();
				}
    			
			}
		}
    	

    },
    

    checkSortableColumn:function(){
    	var me = this;
    	if(!me.isAutoSearchBySorting())
		{
    		return;
		}
    	
    	
     	if(me.usePagingToolbar)
 		{
     		var columns = GridUtil.getColumns(this);
     		Ext.Array.each( columns, function(column) {
     			
     			if(!column.isRowNumberer && !column.sortField)
     			{
     				column.sortable = false;
     			}
			});
     		
 		}
    },
    
    isAutoSearchBySorting:function(){
    	var parameterSettings = MOST.config.Token.getParameterSettings();
    	if(parameterSettings){
    		var headerSort = parameterSettings.find(o => o.key === 'HEADER_SORT');
    		if(headerSort && headerSort.settingChk && headerSort.settingChk === 'Y')
    		{
    			return true;
    		}
    	}
    	
    	return false;
    },
    
    initPopupCodeList: function() {
    	var me = this;
    	var view = this.ownerCt;
    	var ViewModel = view.getViewModel();
    	var columns = GridUtil.getColumns(this);
    	   	
    	
    	if ((view === undefined || view === null)
		 || (ViewModel === undefined || ViewModel === null)
         || (columns === undefined || columns === null)) {
    		return;
    	}
    	
 		Ext.Array.each(columns, function(column) {
 			if (StringUtil.isNullorEmpty(column.popupCodeType) === false) {
 				var store = ServerServiceUtil.getPopupStore(column.popupCodeType);
 				var storeName = view.id + '-' + column.popupCodeType;
 				
 				view.getViewModel().set(storeName, store);
 			}
		});
    }
    
	/**
	 * Paging Toolbar End
	 * =================================================================================
	 */
});