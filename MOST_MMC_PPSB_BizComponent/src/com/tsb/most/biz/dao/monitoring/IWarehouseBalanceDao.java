package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchWarehouseBalanceParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IWarehouseBalanceDao {
	
	public DataItemList selectWarehouseBalanceItems(SearchWarehouseBalanceParm parm) throws DaoException;
}
