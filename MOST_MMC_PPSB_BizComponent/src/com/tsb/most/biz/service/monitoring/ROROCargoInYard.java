package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.dao.monitoring.IROROCargoInYardDao;
import com.tsb.most.biz.parm.monitoring.SearchROROCargoInYardParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class ROROCargoInYard extends MOSTBaseService implements IROROCargoInYard {
	private IROROCargoInYardDao roroCargoInYardDao;
	
	public void setRoroCargoInYardDao(IROROCargoInYardDao roroCargoInYardDao) {
		this.roroCargoInYardDao = roroCargoInYardDao;
	}
	
	public DataItemList selectRoRoCargoInYardItems(SearchROROCargoInYardParm parm) throws BizException{
		return roroCargoInYardDao.selectRoRoCargoInYardItems(parm);
	}
	
}