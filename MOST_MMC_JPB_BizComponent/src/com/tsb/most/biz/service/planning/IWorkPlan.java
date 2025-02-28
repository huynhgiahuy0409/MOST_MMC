package com.tsb.most.biz.service.planning;

import com.tsb.most.biz.parm.planning.SearchVesselWorkPlanParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IWorkPlan{
	public DataItemList selectVesselWorkPLanList(SearchVesselWorkPlanParm parm) throws BizException;
	public DataItemList insertItems(InsertItemsBizParm parm) throws Exception;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws Exception;
}