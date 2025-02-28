package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.parm.operation.SearchCargoJobParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.BizException;

public interface ICargoJob {
	public DataItemList selectJobMonitoringList(SearchCargoJobParm parm) throws BizException;
	
	public IDataItem updateJobMonitoring(UpdateItemsBizParm parm) throws BizException;
}
