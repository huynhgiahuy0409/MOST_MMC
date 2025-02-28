package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchGatePassImportParm;
import com.tsb.most.biz.parm.monitoring.SearchGatePassListParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class GatePassListDao extends BaseDao implements IGatePassListDao {
	
	public DataItemList selectCargoGatePassList(SearchGatePassListParm parm) throws DaoException {
        return unifiedDao.getItems("gatePassList.selectCargoGatePassList", parm);
    }
	
	public DataItemList selectGatePassImportList(SearchGatePassImportParm parm) throws DaoException {
        return unifiedDao.getItems("gatePassList.selectGatePassImportList", parm);
    }
}
