package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.operation.SearchWHReconciliationParm;
import com.tsb.most.biz.parm.planning.SearchWarehouseHistoryParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IWarehouseHistoryDao {
	public DataItemList selectCargoJobHistoryList(SearchWarehouseHistoryParm parm) throws DaoException;
	public DataItemList selectWHRecnList(SearchWHReconciliationParm parm) throws DaoException;
    public DataItemList selectWHRecnDtl(SearchWHReconciliationParm parm) throws DaoException;
    public DataItemList selectWHRecnDocList(SearchWHReconciliationParm parm) throws DaoException;
}
