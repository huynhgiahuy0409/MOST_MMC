package com.tsb.most.biz.service.document;

import com.tsb.most.biz.parm.document.SearchVesselScheduleRegisterParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;


public interface IVesselScheduleRegister {
	public DataItemList selectVesselScheduleList(SearchVesselScheduleRegisterParm parm) throws BizException;
	public DataItemList selectVesselScheduleDetail(SearchVesselScheduleRegisterParm parm) throws BizException;
	public DataItemList selectListOfVslSchedule(SearchVesselScheduleRegisterParm parm) throws BizException;
	public DataItemList isDuplicateVslCallId(SearchVesselScheduleRegisterParm parm) throws BizException;
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList updateVslSchlStatus(UpdateItemsBizParm parm) throws BizException;
}
