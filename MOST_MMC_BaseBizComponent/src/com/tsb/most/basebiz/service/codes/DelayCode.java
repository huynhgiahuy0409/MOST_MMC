package com.tsb.most.basebiz.service.codes;

import java.util.Iterator;

import com.tsb.most.basebiz.dao.codes.IDelayCodeDao;
import com.tsb.most.basebiz.dataitem.codes.DelayCodeItem;
import com.tsb.most.basebiz.parm.codes.SearchDelayCodeParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.BizException;

public class DelayCode extends MOSTBaseService implements IDelayCode {
	private IDelayCodeDao delayCodeDao;
	
	public void setDelayCodeDao(IDelayCodeDao delayCodeDao) {
		this.delayCodeDao = delayCodeDao;
	}

	public DataItemList selectDelayCodeList(SearchDelayCodeParm parm) throws BizException {
		return delayCodeDao.selectDelayCodeList(parm);
    }

	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException{
		DataItemList items = parm.getInsertItems();
		Iterator<IDataItem> list = items.getCollection().iterator();
		
		while (list.hasNext()) {
			DelayCodeItem item = (DelayCodeItem) list.next();
            
            try {
         		return delayCodeDao.insertItems(parm);
            }catch(Exception ex) {
            	throw new BizException(ex);
            }
		}
		
		return null;
	}

	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException{
		DataItemList items = parm.getUpdateItems();
		Iterator<IDataItem> list = items.getCollection().iterator();
		
		while (list.hasNext()) {
			DelayCodeItem item = (DelayCodeItem) list.next();
			
            try {
         		return delayCodeDao.updateItems(parm);
            }catch(Exception ex) {
             	throw new BizException(ex);
            }
		}
		
		return null;
	}

	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException{
		return delayCodeDao.deleteItems(parm);
	}
}
