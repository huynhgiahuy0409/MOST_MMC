package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.parm.billing.SearchWHRentalStatusParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IWHRentalStatusDao {
	public DataItemList selectWHRentalStatusList(SearchWHRentalStatusParm parm) throws DaoException;
}
