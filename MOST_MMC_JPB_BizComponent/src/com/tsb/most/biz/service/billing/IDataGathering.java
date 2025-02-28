package com.tsb.most.biz.service.billing;

import com.tsb.most.biz.parm.billing.SearchDataGatheringParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IDataGathering {
	public DataItemList selectDataGathering(SearchDataGatheringParm parm) throws BizException;
    public DataItemList selectDataGatheringDetail(SearchDataGatheringParm parm) throws BizException;
    public DataItemList selectValidVslSchedule(SearchDataGatheringParm parm) throws BizException;
    
    public DataItemList applyDataGatheringDetail(UpdateItemsBizParm parm) throws BizException;
	public DataItemList applyDataGathering(UpdateItemsBizParm parm) throws BizException;
    public void applyGatheredDataDelete(DeleteItemsBizParm parm) throws BizException;

	
}
