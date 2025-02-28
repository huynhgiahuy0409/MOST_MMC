package com.tsb.most.biz.service.planning;

import com.tsb.most.biz.parm.planning.SearchSpaceMovementPlanParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface ISpaceMovementPlan{
	public DataItemList selectSpaceMovementList(SearchSpaceMovementPlanParm parm) throws BizException;
	public DataItemList selectSpaceMovementPlanList(SearchSpaceMovementPlanParm parm) throws BizException ;
	public DataItemList selectSpaceMovementPlanDetail(SearchSpaceMovementPlanParm parm) throws BizException ;
	public DataItemList selectMultipleSearchFilterCombo(SearchSpaceMovementPlanParm parm) throws BizException;
	public DataItemList processSpcMovPlanItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException;
	public DataItemList updateSpcMovRequestProcess(UpdateItemsBizParm parm) throws BizException;
	public DataItemList selectGrList(SearchSpaceMovementPlanParm parm) throws BizException;
	public DataItemList selectSpaceMovementInfo(SearchSpaceMovementPlanParm parm) throws BizException;
	public DataItemList getCargoInfo(SearchSpaceMovementPlanParm parm) throws BizException;
	public DataItemList getDuplicatedRequest(SearchSpaceMovementPlanParm parm) throws BizException;
}
