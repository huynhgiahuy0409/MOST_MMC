package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchGateInParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class GateInDao extends BaseDao implements IGateInDao {
	
	public DataItemList selectListOfGateIn(SearchGateInParm parm) throws DaoException {
		if (parm.getSearchType().equals("selectListOfGateIn2")) {
			return unifiedDao.getItemsPage("gateIn.selectListOfGateIn2", parm);
		} else {
			return unifiedDao.getItemsPage("gateIn.selectListOfGateIn", parm);
		}
		
    }
}
