package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.dao.operation.IVesselDelayPenaltyReportDao;
import com.tsb.most.biz.parm.operation.SearchVesselDelayPenaltyReportParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.response.RestResponse;

public class VesselDelayPenaltyReport extends MOSTBaseService implements IVesselDelayPenaltyReport{
	private IVesselDelayPenaltyReportDao vesselDelayPenaltyReportDao;
	
	public IVesselDelayPenaltyReportDao getVesselDelayPenaltyReportDao() {
		return vesselDelayPenaltyReportDao;
	}

	public void setVesselDelayPenaltyReportDao(IVesselDelayPenaltyReportDao vesselDelayPenaltyReportDao) {
		this.vesselDelayPenaltyReportDao = vesselDelayPenaltyReportDao;
	}

	@Override
	public DataItemList selectDelayPenaltyReportList(SearchVesselDelayPenaltyReportParm parm) throws BizException {
		return vesselDelayPenaltyReportDao.selectDelayPenaltyReportList(parm);
	}

	@Override
	public DataItemList updateVesselDelayItems(UpdateItemsBizParm parm) throws BizException {
		return vesselDelayPenaltyReportDao.updateVesselDelayItems(parm);
	}

	@Override
	public DataItemList insertVesselDelayItems(InsertItemsBizParm parm) throws BizException {
		return vesselDelayPenaltyReportDao.insertVesselDelayItems(parm);
	}

	@Override
	public DataItemList deleteVesselDelayItems(DeleteItemsBizParm parm) throws BizException {
		return vesselDelayPenaltyReportDao.deleteVesselDelayItems(parm);
	}
	
}
