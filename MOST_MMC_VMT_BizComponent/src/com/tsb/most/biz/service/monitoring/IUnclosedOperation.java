package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.parm.monitoring.UnclosedOperationParm;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.BizException;

public interface IUnclosedOperation {
	public IDataItem selectUnclosedOperationList(UnclosedOperationParm parm) throws BizException;
	public IDataItem getNumbPage(UnclosedOperationParm parm) throws BizException;
}
