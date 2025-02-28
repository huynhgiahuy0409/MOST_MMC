package com.tsb.most.biz.dao.monitoring;


import com.tsb.most.biz.parm.monitoring.GatePassImportParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.DaoException;


public class GatePassImportDao extends BaseDao implements IGatePassImportDao {
    public IDataItem selectGatePassImport(GatePassImportParm parm) throws DaoException {
        return unifiedDao.getItems("gatePassImport.selectGatePassImport", parm);
    }

}
