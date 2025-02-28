package com.tsb.most.biz.service.planning;

import com.tsb.most.biz.dao.planning.IAlertFunctionDao;
import com.tsb.most.biz.parm.planning.SearchAlertFunctionParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class AlertFunction extends MOSTBaseService implements IAlertFunction {
	private IAlertFunctionDao alertFunctionDao;

	public void setAlertFunctionDao(IAlertFunctionDao alertFunctionDao) {
		this.alertFunctionDao = alertFunctionDao;
	}

	@Override
	public DataItemList getAlertFunctionList(SearchAlertFunctionParm parm) throws BizException {
		DataItemList returnList = new DataItemList();
		
		if ("I".equals(parm.getUserType())) {
			returnList = alertFunctionDao.getAlertFunctionList(parm);
		}
		if ("E".equals(parm.getUserType())) {
			returnList = alertFunctionDao.getExternalAlertFunctionList(parm);
		}
		
		return returnList;
	}
}
