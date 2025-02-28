package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchGateOutParm;
import com.tsb.most.biz.parm.report.SearchCargoInterchangeReceiptParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IGateOutDao {
	public DataItemList selectListOfGateOut(SearchGateOutParm parm) throws DaoException;
	public DataItemList selectCargoInterchangeReceiptReport(SearchCargoInterchangeReceiptParm parm) throws DaoException;
	
	public DataItemList getGatePass(SearchGateOutParm parm) throws DaoException;
}
