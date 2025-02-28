package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchCargoSearchParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ICargoSearchDao {
    public DataItemList selectCargoSearchList(SearchCargoSearchParm parm) throws DaoException;
    public DataItemList selectGrGoComboList(SearchCargoSearchParm parm) throws DaoException;
}
