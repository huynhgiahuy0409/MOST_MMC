package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.dao.monitoring.IUnclosedOperationDao;
import com.tsb.most.biz.dataitem.monitoring.UnclosedOperationItem;
import com.tsb.most.biz.parm.monitoring.UnclosedOperationParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.BizException;

public class UnclosedOperation extends MOSTBaseService implements IUnclosedOperation {
	private IUnclosedOperationDao unclosedOperationDao;

	public IUnclosedOperationDao getUnclosedOperationDao() {
		return unclosedOperationDao;
	}

	public void setUnclosedOperationDao(IUnclosedOperationDao unclosedOperationDao) {
		this.unclosedOperationDao = unclosedOperationDao;
	}

	@Override
	public IDataItem selectUnclosedOperationList(UnclosedOperationParm parm) throws BizException {
		UnclosedOperationItem returnItem = new UnclosedOperationItem();

		if (parm.getSearchType().equals("comboList")) {
			/*
			 * VesselOperationReportParm parmVOR = new VesselOperationReportParm();
			 * returnItem.setShiftList(vesselOperationReportDao.getShift(parmVOR));
			 * RestResponse response = new RestResponse(); List returnItems = new
			 * ArrayList(); returnItems.add(returnItem); response.setData(returnItems);
			 * return response;
			 */
		} else if (parm.getSearchType().equals("UnclosedOperationList")) {
			return unclosedOperationDao.selectUnclosedOperationList(parm);
		}

		return returnItem;
	}

	@Override
	public IDataItem getNumbPage(UnclosedOperationParm parm) throws BizException {
		// TODO Auto-generated method stub
		return null;
	}
}
