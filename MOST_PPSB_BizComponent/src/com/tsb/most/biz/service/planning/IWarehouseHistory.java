package com.tsb.most.biz.service.planning;

import com.tsb.most.biz.parm.operation.SearchWHReconciliationParm;
import com.tsb.most.biz.parm.planning.SearchWarehouseHistoryParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IWarehouseHistory{
	public DataItemList selectCargoJobHistoryList(SearchWarehouseHistoryParm parm) throws BizException;
	public DataItemList selectWHRecnList(SearchWHReconciliationParm parm) throws BizException;
}
