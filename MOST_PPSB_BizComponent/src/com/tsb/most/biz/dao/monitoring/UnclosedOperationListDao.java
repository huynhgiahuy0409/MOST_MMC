package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchUnclosedOperationListParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;


public class UnclosedOperationListDao extends BaseDao implements IUnclosedOperationListDao {

    public DataItemList selectUnclosedOperationList(SearchUnclosedOperationListParm parm) throws DaoException {
        return unifiedDao.getItems("unclosedOperationList.selectUnclosedOperationList", parm);
    }
}
