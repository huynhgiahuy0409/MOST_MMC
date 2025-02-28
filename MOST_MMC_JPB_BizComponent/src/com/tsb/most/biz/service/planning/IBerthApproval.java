package com.tsb.most.biz.service.planning;

import com.tsb.most.biz.parm.planning.SearchBerthApprovalParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IBerthApproval {
	public DataItemList selectBerthApprovalList(SearchBerthApprovalParm parm) throws BizException;

	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException;
}
