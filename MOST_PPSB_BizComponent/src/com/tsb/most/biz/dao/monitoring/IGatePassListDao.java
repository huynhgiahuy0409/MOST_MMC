package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchGatePassImportParm;
import com.tsb.most.biz.parm.monitoring.SearchGatePassListParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IGatePassListDao {
	public DataItemList selectCargoGatePassList(SearchGatePassListParm parm) throws DaoException;
	public DataItemList selectGatePassImportList(SearchGatePassImportParm parm) throws DaoException;
}
