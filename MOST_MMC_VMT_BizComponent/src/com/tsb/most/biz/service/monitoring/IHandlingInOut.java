package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.parm.monitoring.HandlingInParm;
import com.tsb.most.biz.parm.monitoring.HandlingOutParm;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.BizException;

public interface IHandlingInOut {
	public IDataItem selectHandlingInList(HandlingInParm parm) throws BizException;
	public IDataItem selectHandingOutList(HandlingOutParm parm) throws BizException;
}
