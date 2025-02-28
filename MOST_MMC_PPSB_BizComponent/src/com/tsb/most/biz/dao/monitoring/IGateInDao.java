package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchGateInParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IGateInDao {
	public DataItemList selectListOfGateIn(SearchGateInParm parm) throws DaoException;
	
}
