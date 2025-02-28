package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.biz.parm.monitoring.HandlingOutParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class HandlingOutDao extends BaseDao implements IHandlingOutDao{
	public DataItemList selectHandingOutList(HandlingOutParm parm) throws DaoException {
        return unifiedDao.getItems("handlingOut.selectHandlingOutList", parm);
    }
}
