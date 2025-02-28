package com.tsb.most.biz.service.operation;

import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.biz.parm.operation.SearchVesselDelayParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IVesselDelay{
	public DataItemList selectVesselDelayComboList(SearchVesselDelayParm parm) throws BizException;
	public DataItemList selectVesselDelayList(SearchVesselDelayParm parm) throws BizException;
	public DataItemList selectDelayCodeList(SearchCodeMasterParm parm) throws BizException;
	
	public DataItemList updateVerifiedVesselDelayItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList insertVesselDelayItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList deleteVesselDelayItems(DeleteItemsBizParm parm) throws BizException;
	public DataItemList updateVesselDelayItems(UpdateItemsBizParm parm) throws BizException;
}
