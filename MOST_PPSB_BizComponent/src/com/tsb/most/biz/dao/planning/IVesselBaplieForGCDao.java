package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchVesselBaplieForGCParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IVesselBaplieForGCDao {
    public DataItemList searchVesselBaplieItems(SearchVesselBaplieForGCParm parm) throws DaoException;
}
