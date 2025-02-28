package com.tsb.most.biz.service.billing;

import com.tsb.most.biz.dao.billing.IWHRentalStatusDao;
import com.tsb.most.biz.parm.billing.SearchWHRentalStatusParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class WHRentalStatus extends MOSTBaseService implements IWHRentalStatus{
	private IWHRentalStatusDao whRentalStatusDao;
	
	public IWHRentalStatusDao getWhRentalStatusDao() {
		return whRentalStatusDao;
	}

	public void setWhRentalStatusDao(IWHRentalStatusDao whRentalStatusDao) {
		this.whRentalStatusDao = whRentalStatusDao;
	}

	@Override
	public DataItemList selectWHRentalStatusList(SearchWHRentalStatusParm parm) throws BizException {
		// TODO Auto-generated method stub
		return whRentalStatusDao.selectWHRentalStatusList(parm);
	}

}
