package com.tsb.most.biz.service.planning;

import com.tsb.most.biz.parm.planning.SearchVesselBaplieForGCParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IVesselBaplieForGC{
	public DataItemList searchVesselBaplieItems(SearchVesselBaplieForGCParm parm) throws BizException;
}
