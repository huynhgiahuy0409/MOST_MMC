package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchTheListOfYardPlanOfRoRoParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ITheListOfYardPlanOfRoRoDao {
    public DataItemList selectTheListOfYardPlanOfROROItems(SearchTheListOfYardPlanOfRoRoParm parm) throws DaoException;
}