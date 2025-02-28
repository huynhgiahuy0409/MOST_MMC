package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchTheListOfYardPlanOfRoRoParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class TheListOfYardPlanOfRoRoDao extends BaseDao implements ITheListOfYardPlanOfRoRoDao {
    public DataItemList selectTheListOfYardPlanOfROROItems(SearchTheListOfYardPlanOfRoRoParm parm) throws DaoException {
        return unifiedDao.getItemsPage("theListOfYardPlanOfRoRo.selectTheListOfYardPlanOfROROItems", parm);
    }
}
