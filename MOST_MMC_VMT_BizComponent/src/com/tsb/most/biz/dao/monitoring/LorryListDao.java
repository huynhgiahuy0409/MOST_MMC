package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.LorryListParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class LorryListDao extends BaseDao implements ILorryListDao {
	@Override
	public DataItemList selectLorryListItems(LorryListParm parm) throws DaoException {
		return unifiedDao.getItems("lorryList.selectLorryList", parm);
	}
}
