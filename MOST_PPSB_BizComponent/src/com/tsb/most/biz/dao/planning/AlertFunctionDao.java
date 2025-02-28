package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchAlertFunctionParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class AlertFunctionDao extends BaseDao implements IAlertFunctionDao {

	public DataItemList getAlertFunctionList(SearchAlertFunctionParm parm) throws DaoException {
		return unifiedDao.getItems("alertfunction.selectAlertFunction", parm);
	}
}
