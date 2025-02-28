package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.HandlingInParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class HandlingInDao  extends BaseDao implements IHandlingInDao {

	@Override
	public DataItemList selectHandlingInList(HandlingInParm parm) throws DaoException {
		// TODO Auto-generated method stub
		
		 return unifiedDao.getItems("handlingIn.selectHandlingInList", parm);
	}

}
