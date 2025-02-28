package com.tsb.most.biz.service.billing;

import com.tsb.most.biz.parm.billing.SearchWHRentalStatusParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IWHRentalStatus {
	public DataItemList selectWHRentalStatusList(SearchWHRentalStatusParm parm) throws BizException;
}
