package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.LorryListParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ILorryListDao {
	public DataItemList selectLorryListItems(LorryListParm parm) throws DaoException;
}
