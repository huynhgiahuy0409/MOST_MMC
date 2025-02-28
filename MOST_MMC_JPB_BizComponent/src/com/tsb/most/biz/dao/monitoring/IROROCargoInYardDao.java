package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchROROCargoInYardParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IROROCargoInYardDao {
    public DataItemList selectRoRoCargoInYardItems(SearchROROCargoInYardParm parm) throws DaoException;
}
