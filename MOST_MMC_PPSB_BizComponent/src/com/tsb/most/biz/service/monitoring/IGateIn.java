package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchGateInParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IGateIn {
	public DataItemList selectListOfGateIn(SearchGateInParm parm) throws BizException;
}
