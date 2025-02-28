package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchWHReconciliationParm;
import com.tsb.most.biz.parm.operation.SearchWHReconciliationPivotParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IWHReconciliation{
	public DataItemList selectWHRecnList(SearchWHReconciliationParm parm) throws BizException;
	public DataItemList selectWHRecnListPivot(SearchWHReconciliationPivotParm parm) throws BizException;
	public DataItemList updateWHReconcilation(UpdateItemsBizParm parm) throws BizException;
	public DataItemList processSettlementItems(InsertItemsBizParm parm) throws BizException;
}
