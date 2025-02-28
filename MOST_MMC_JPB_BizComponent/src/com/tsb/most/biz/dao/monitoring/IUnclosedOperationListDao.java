package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchUnclosedOperationListParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;


public interface IUnclosedOperationListDao {
    public DataItemList selectUnclosedOperationList(SearchUnclosedOperationListParm parm) throws DaoException ;
}
