package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchDimensionCheckParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ITheListOfDimensionCheckDao {
	
	public DataItemList selectGCDimensionCheckItems(SearchDimensionCheckParm parm) throws DaoException ;
	public DataItemList selectGCDimensionDtlDmgItems(SearchDimensionCheckParm parm) throws DaoException;
	public DataItemList deleteGCDimensionItem(DeleteItemsBizParm items) throws DaoException;
}
