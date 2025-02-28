package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.dao.operation.ITheListOfDimensionCheckDao;
import com.tsb.most.biz.parm.operation.SearchDimensionCheckParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class TheListOfDimensionCheck extends MOSTBaseService implements ITheListOfDimensionCheck {
	private ITheListOfDimensionCheckDao theListOfDimensionCheckDao;
	
	public void setTheListOfDimensionCheckDao(ITheListOfDimensionCheckDao theListOfDimensionCheckDao) {
		this.theListOfDimensionCheckDao = theListOfDimensionCheckDao;
	}

	public DataItemList selectGCDimensionCheckItems(SearchDimensionCheckParm parm) throws BizException {
		return theListOfDimensionCheckDao.selectGCDimensionCheckItems(parm);
	}

	public DataItemList selectGCDimensionDtlDmgItems(SearchDimensionCheckParm parm) throws BizException {
		return theListOfDimensionCheckDao.selectGCDimensionDtlDmgItems(parm);
	}
	
	public DataItemList deleteGCDimensionItem(DeleteItemsBizParm parm) throws BizException {		
		return theListOfDimensionCheckDao.deleteGCDimensionItem(parm);
	}
	 
}