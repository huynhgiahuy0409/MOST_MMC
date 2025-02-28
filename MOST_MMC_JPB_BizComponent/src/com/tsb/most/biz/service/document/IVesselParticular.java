package com.tsb.most.biz.service.document;

import com.tsb.most.biz.parm.document.SearchVesselParticularParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;


public interface IVesselParticular {
	public DataItemList selectVesselParticularList(SearchVesselParticularParm parm) throws BizException;
	public DataItemList selectRequestVesselChangeList(SearchVesselParticularParm parm) throws BizException;
	public DataItemList selectShaList(SearchVesselParticularParm parm) throws BizException;
	public DataItemList selectSha(SearchVesselParticularParm parm) throws BizException;
	public DataItemList selectShpList(SearchVesselParticularParm parm) throws BizException;
	public DataItemList selectVesselParticularDetailItem(SearchVesselParticularParm parm) throws BizException;
	public DataItemList vslScheduleCheck(SearchVesselParticularParm parm) throws BizException;
	public DataItemList isCheckValidateForMQ(SearchVesselParticularParm parm) throws BizException;
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws Exception;
    public DataItemList updateItems(UpdateItemsBizParm parm) throws Exception;
    public DataItemList deleteItems(DeleteItemsBizParm parm) throws Exception;
	
    public DataItemList updateVesselParticularItemConfirm(UpdateItemsBizParm parm) throws BizException;
}
