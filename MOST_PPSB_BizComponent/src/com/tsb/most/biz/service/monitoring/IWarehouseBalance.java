package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchWarehouseBalanceParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IWarehouseBalance {
	public DataItemList selectWarehouseBalanceItems(SearchWarehouseBalanceParm parm) throws BizException;
	
}
