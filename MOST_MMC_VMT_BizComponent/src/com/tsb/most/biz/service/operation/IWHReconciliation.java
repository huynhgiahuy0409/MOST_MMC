package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchWHReconciliationParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.BizException;

public interface IWHReconciliation {
	public IDataItem selectWHRecnList(SearchWHReconciliationParm parm) throws BizException;
	public IDataItem selectWHRecnDetailList(SearchWHReconciliationParm parm) throws BizException;
	public void processWHReconciliationItems(InsertItemsBizParm parm) throws BizException;
}
