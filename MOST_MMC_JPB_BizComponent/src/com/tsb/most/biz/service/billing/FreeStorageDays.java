package com.tsb.most.biz.service.billing;

import java.util.List;

import com.tsb.most.biz.dao.billing.IFreeStorageDaysDao;
import com.tsb.most.biz.dataitem.billing.FreeStorageDaysItem;
import com.tsb.most.biz.parm.billing.SearchFreeStorageDaysParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.response.RestResponse;

public class FreeStorageDays extends MOSTBaseService implements IFreeStorageDays{

	private IFreeStorageDaysDao freeStorageDaysDao;

	public void setFreeStorageDaysDao(IFreeStorageDaysDao freeStorageDaysDao) {
		this.freeStorageDaysDao = freeStorageDaysDao;
	}

	public DataItemList selectFreeStorage(SearchFreeStorageDaysParm parm) throws BizException {
        return freeStorageDaysDao.selectFreeStorage(parm);
    }
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
		
		
		return freeStorageDaysDao.insertItems(parm);
	}

	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		return freeStorageDaysDao.updateItems(parm);
	}
	
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException {
		return freeStorageDaysDao.deleteItems(parm);
	}

	
}
