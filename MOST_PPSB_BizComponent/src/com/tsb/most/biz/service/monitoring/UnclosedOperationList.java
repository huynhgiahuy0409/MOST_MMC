package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.dao.monitoring.IUnclosedOperationListDao;
import com.tsb.most.biz.parm.monitoring.SearchUnclosedOperationListParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class UnclosedOperationList extends MOSTBaseService implements IUnclosedOperationList{
	private IUnclosedOperationListDao unclosedOperationListDao;
	
	public void setUnclosedOperationListDao(IUnclosedOperationListDao unclosedOperationListDao) {
		this.unclosedOperationListDao = unclosedOperationListDao;
	}

	public DataItemList selectUnclosedOperationList(SearchUnclosedOperationListParm param) throws BizException{
		return unclosedOperationListDao.selectUnclosedOperationList(param);
	}
}
