package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchStevedoreTrimmingParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IStevedoreTrimming{
	public DataItemList selectVORDryBreakBulk(SearchStevedoreTrimmingParm parm) throws BizException;
	public DataItemList selectVORDryBreakBulkCommonCd(SearchStevedoreTrimmingParm parm) throws BizException;
	public void processVORDryBreakBulkForStevAndTrimCUD(UpdateItemsBizParm parm) throws BizException;
	
}
