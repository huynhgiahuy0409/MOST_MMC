package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.UnclosedOperationParm;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.DaoException;


public interface IUnclosedOperationDao {
    public IDataItem selectUnclosedOperationList(UnclosedOperationParm parm) throws DaoException ;
    public IDataItem getNumbPage(UnclosedOperationParm parm)throws DaoException;
}
