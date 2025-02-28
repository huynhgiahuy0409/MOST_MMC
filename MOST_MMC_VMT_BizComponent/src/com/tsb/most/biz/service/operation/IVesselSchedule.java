package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchVesselScheduleParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IVesselSchedule {//For HHT
	public DataItemList selectBerthInfo(SearchVesselScheduleParm parm) throws BizException;
	public DataItemList updateVesselDetailItem(UpdateItemsBizParm parm) throws BizException;
}