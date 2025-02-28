package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.HandlingInParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IHandlingInDao {
	public DataItemList selectHandlingInList(HandlingInParm parm) throws DaoException;
}
