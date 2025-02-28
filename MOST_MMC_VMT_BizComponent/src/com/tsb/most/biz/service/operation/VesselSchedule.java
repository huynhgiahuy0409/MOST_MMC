package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.dao.operation.IVesselScheduleDao;
import com.tsb.most.biz.parm.operation.SearchVesselScheduleParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class VesselSchedule extends MOSTBaseService implements IVesselSchedule {
	private IVesselScheduleDao vesselScheduleDao;
	
	public void setvesselScheduleDao(IVesselScheduleDao vesselScheduleDao) {
		this.vesselScheduleDao = vesselScheduleDao;
	}
	
	@Override
	public DataItemList selectBerthInfo(SearchVesselScheduleParm parm) throws BizException {
		return vesselScheduleDao.selectBerthInfo(new SearchVesselScheduleParm());
	}
	
	@Override
	public DataItemList updateVesselDetailItem(UpdateItemsBizParm parm) throws BizException {
		return vesselScheduleDao.updateVesselDetailItem(parm);
	}
}