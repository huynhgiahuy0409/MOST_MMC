package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.dao.monitoring.IHandlingInDao;
import com.tsb.most.biz.dao.monitoring.IHandlingOutDao;
import com.tsb.most.biz.parm.monitoring.HandlingInParm;
import com.tsb.most.biz.parm.monitoring.HandlingOutParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.BizException;

public class HandlingInOut extends MOSTBaseService implements IHandlingInOut  {
	private IHandlingInDao handlingInDao;
	private IHandlingOutDao handlingOutDao;
	
	public IHandlingInDao getHandlingInDao() {
		return handlingInDao;
	}

	public void setHandlingInDao(IHandlingInDao handlingInDao) {
		this.handlingInDao = handlingInDao;
	}

	public IHandlingOutDao getHandlingOutDao() {
		return handlingOutDao;
	}

	public void setHandlingOutDao(IHandlingOutDao handlingOutDao) {
		this.handlingOutDao = handlingOutDao;
	}

	public IDataItem selectHandlingInList(HandlingInParm parm) throws BizException {
		return handlingInDao.selectHandlingInList(parm);
	}

	public IDataItem selectHandingOutList(HandlingOutParm parm) throws BizException {
		return handlingOutDao.selectHandingOutList(parm);
	}
}
