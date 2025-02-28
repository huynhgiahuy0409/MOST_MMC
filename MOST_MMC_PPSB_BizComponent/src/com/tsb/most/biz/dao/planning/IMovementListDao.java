package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchMovementListParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IMovementListDao {
    public DataItemList selectCargoMovementList(SearchMovementListParm parm) throws DaoException;
    public DataItemList selectMVWHComboList(SearchMovementListParm parm) throws DaoException;
}
