package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.planning.SearchBerthPlanParm;
import com.tsb.most.biz.parm.planning.SearchVesselScheduleParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public class BerthMonitoringDao extends BaseDao implements IBerthMonitoringDao {
    
    public DataItemList getBerthInfoList(SearchBerthPlanParm parm) throws DaoException {
        return unifiedDao.getItems("BerthMonitoringMap.selectBerthInfo", parm);
    }
    
    public DataItemList getBerthPlanList(SearchBerthPlanParm parm) throws DaoException {
        return unifiedDao.getItems("BerthMonitoringMap.selectBerthPlan", parm);
    }
   
}
