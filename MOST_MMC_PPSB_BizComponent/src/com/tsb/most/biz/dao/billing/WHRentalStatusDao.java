package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.parm.billing.SearchWHRentalStatusParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class WHRentalStatusDao extends BaseDao implements IWHRentalStatusDao{

	@Override
	public DataItemList selectWHRentalStatusList(SearchWHRentalStatusParm parm) throws DaoException {
		// TODO Auto-generated method stub
		return unifiedDao.getItemsPage("whRentalStatus.selectWHRentalStatusList", parm);
	}

}
