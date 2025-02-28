package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchGateOutParm;
import com.tsb.most.biz.parm.report.SearchCargoInterchangeReceiptParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class GateOutDao extends BaseDao implements IGateOutDao {
	
	public DataItemList selectListOfGateOut(SearchGateOutParm parm) throws DaoException {
		return unifiedDao.getItemsPage("gateOut.selectListOfGateOut", parm);
    }
	
	public DataItemList selectCargoInterchangeReceiptReport(SearchCargoInterchangeReceiptParm parm) throws DaoException {
		return unifiedDao.getItemsPage("gateOut.selectCargoInterchangeReceiptReport", parm);
	}
}
