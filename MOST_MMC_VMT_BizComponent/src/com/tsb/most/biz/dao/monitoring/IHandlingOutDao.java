package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.HandlingOutParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IHandlingOutDao {
	public DataItemList selectHandingOutList(HandlingOutParm parm) throws DaoException;
}
