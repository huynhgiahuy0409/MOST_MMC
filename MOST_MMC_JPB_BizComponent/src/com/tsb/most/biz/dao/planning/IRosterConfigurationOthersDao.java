package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchRosterConfigurationOthersParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IRosterConfigurationOthersDao {
	public DataItemList selectShiftType(SearchRosterConfigurationOthersParm parm) throws DaoException;
}
