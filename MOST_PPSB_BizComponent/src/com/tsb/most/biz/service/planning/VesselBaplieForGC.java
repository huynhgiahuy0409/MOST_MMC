package com.tsb.most.biz.service.planning;

import com.tsb.most.biz.dao.planning.IVesselBaplieForGCDao;
import com.tsb.most.biz.parm.planning.SearchVesselBaplieForGCParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class VesselBaplieForGC extends MOSTBaseService implements IVesselBaplieForGC {
	private IVesselBaplieForGCDao vesselBaplieForGCDao;
	
	public void setVesselBaplieForGCDao(IVesselBaplieForGCDao vesselBaplieForGCDao) {
		this.vesselBaplieForGCDao = vesselBaplieForGCDao;
	}

	@Override
	public DataItemList searchVesselBaplieItems(SearchVesselBaplieForGCParm parm) throws BizException {
		return vesselBaplieForGCDao.searchVesselBaplieItems(parm);
	}
}