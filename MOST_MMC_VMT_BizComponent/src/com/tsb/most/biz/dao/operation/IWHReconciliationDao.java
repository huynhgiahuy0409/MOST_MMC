package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchWHReconciliationParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IWHReconciliationDao {
	public DataItemList selectWHRecnList(SearchWHReconciliationParm parm) throws DaoException;
	public DataItemList selectWHRecnDetailList(SearchWHReconciliationParm parm) throws DaoException;
	public DataItemList insertJobItems(DataItemList items) throws DaoException;
	public DataItemList insertInvLocItems(DataItemList items) throws DaoException;
	
}
