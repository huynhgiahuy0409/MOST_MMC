package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.dao.operation.ITheListOfDamageCheckOfGCDao;
import com.tsb.most.biz.parm.operation.SearchDamageCheckParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class TheListOfDamageCheckOfGC extends MOSTBaseService implements ITheListOfDamageCheckOfGC {
	private ITheListOfDamageCheckOfGCDao theListOfDamageCheckOfGCDao;
	
	public void setTheListOfDamageCheckOfGCDao(ITheListOfDamageCheckOfGCDao theListOfDamageCheckOfGCDao) {
		this.theListOfDamageCheckOfGCDao = theListOfDamageCheckOfGCDao;
	}
	//////////////////////////////////////////////////////////
	
	
	public DataItemList selectGCDamageCheckItems(SearchDamageCheckParm parm) throws BizException{
		return theListOfDamageCheckOfGCDao.selectGCDamageCheckItems(parm);
	}
	
	public DataItemList deleteGCDmgItem(DeleteItemsBizParm parm) throws BizException {
		return theListOfDamageCheckOfGCDao.deleteGCDmgItem(parm);
	}

}