package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.parm.planning.SearchBerthPlanParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IBerthMonitoring{
	public DataItemList selectBerthStructure(SearchBerthPlanParm parm) throws BizException;
	public DataItemList selectBerthPlanList(SearchBerthPlanParm parm) throws BizException;
}