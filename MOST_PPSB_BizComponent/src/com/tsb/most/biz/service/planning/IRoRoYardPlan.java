package com.tsb.most.biz.service.planning;

import com.tsb.most.biz.parm.planning.SearchRoRoYardPlanParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IRoRoYardPlan {
	public DataItemList selectRoRoYardPlanCargoList(SearchRoRoYardPlanParm parm) throws BizException;
	public DataItemList selectRoRoYardPlanUnitList(SearchRoRoYardPlanParm parm) throws BizException;
	public DataItemList selectRoRoYardPlanList(SearchRoRoYardPlanParm parm) throws BizException;
	
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList selectRoRoYardPlanUnitWHCheckImportList(SearchRoRoYardPlanParm parm) throws BizException;
}
