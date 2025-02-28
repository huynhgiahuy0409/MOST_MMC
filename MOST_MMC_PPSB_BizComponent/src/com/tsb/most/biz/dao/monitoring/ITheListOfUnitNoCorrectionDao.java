package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchTheListOfUnitNoCorrectionParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ITheListOfUnitNoCorrectionDao {
	
	public DataItemList selectCorrectionUnitNoItems(SearchTheListOfUnitNoCorrectionParm parm) throws DaoException;
}
