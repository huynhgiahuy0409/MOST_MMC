package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.planning.SearchBerthPlanParm;
import com.tsb.most.biz.parm.planning.SearchVesselScheduleParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IBerthMonitoringDao {
    public DataItemList getBerthInfoList(SearchBerthPlanParm parm) throws DaoException;
    public DataItemList getBerthPlanList(SearchBerthPlanParm parm) throws DaoException;
}
