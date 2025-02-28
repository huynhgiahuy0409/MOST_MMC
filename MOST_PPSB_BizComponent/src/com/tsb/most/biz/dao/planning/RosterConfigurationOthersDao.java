package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchRosterConfigurationOthersParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class RosterConfigurationOthersDao extends BaseDao implements  IRosterConfigurationOthersDao {

	@Override
	public DataItemList selectShiftType(SearchRosterConfigurationOthersParm parm) throws DaoException {
		return unifiedDao.getItems("rosterConfigurationMonthly.selectShiftType", parm);
	}
}
