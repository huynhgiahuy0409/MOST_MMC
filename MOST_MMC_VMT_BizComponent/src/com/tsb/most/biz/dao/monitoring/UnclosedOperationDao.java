package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.UnclosedOperationParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.DaoException;


public class UnclosedOperationDao extends BaseDao implements IUnclosedOperationDao {
	
	@Override
    public IDataItem selectUnclosedOperationList(UnclosedOperationParm parm) throws DaoException {
        return unifiedDao.getItems("unclosedOperation.selectUnclosedOperationList", parm);
    }
	@Override
    public IDataItem getNumbPage(UnclosedOperationParm parm)
            throws DaoException {
        return unifiedDao.getItems("unclosedOperation.selectNumbPage", parm);
    }
}
