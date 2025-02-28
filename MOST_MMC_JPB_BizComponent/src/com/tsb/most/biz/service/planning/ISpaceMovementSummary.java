package com.tsb.most.biz.service.planning;

import com.tsb.most.biz.parm.planning.SearchSpaceMovementSummaryParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface ISpaceMovementSummary{
	public DataItemList selectSpaceMovementSummaryList(SearchSpaceMovementSummaryParm parm) throws BizException ;
}
