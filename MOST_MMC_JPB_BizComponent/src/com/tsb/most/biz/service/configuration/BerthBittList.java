package com.tsb.most.biz.service.configuration;

import java.util.Iterator;

import com.tsb.most.biz.dao.configuration.IBerthBittListDao;
import com.tsb.most.biz.dataitem.configuration.BerthBittListItem;
import com.tsb.most.biz.parm.configuration.SearchBerthBittListParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.BizException;

public class BerthBittList extends MOSTBaseService implements IBerthBittList {
	private IBerthBittListDao berthBittListDao;
	
	public void setberthBittListDao(IBerthBittListDao berthBittListDao) {
		this.berthBittListDao = berthBittListDao;
	}

	public DataItemList selectBerthBittList(SearchBerthBittListParm parm)throws BizException{
		return berthBittListDao.selectBerthBittList(parm);
	}
	
	public DataItemList selectBerthLocList(SearchBerthBittListParm parm)throws BizException{
		return berthBittListDao.selectBerthLocList(parm);
	}
	
	public DataItemList selectDuplicateBerthBitt(SearchBerthBittListParm parm)throws BizException{
		return berthBittListDao.selectDuplicateBerthBitt(parm);
	}

	public DataItemList insertBerthBittList(InsertItemsBizParm parm) throws BizException{
		DataItemList items = parm.getInsertItems();
		Iterator<IDataItem> list = items.getCollection().iterator();
		
		while (list.hasNext()) {
			BerthBittListItem item = (BerthBittListItem) list.next();
            
            try {
         		return berthBittListDao.insertBerthBittList(parm);
         		
             }catch(Exception ex) {
            	 throw new BizException(ex);
             }
		}
		
		return null;
		
	}

	public DataItemList updateBerthBittList(UpdateItemsBizParm parm) throws BizException{
		DataItemList items = parm.getUpdateItems();
		Iterator<IDataItem> list = items.getCollection().iterator();
		
		while (list.hasNext()) {
			BerthBittListItem item = (BerthBittListItem) list.next();
			
            try {
         		return berthBittListDao.updateBerthBittList(parm);

            }catch(Exception ex) {
             	throw new BizException(ex);
             }
            
		}
		
		return null;
	}

	public DataItemList deleteBerthBittList(DeleteItemsBizParm parm) throws BizException{
		return berthBittListDao.deleteBerthBittList(parm);
	}
	
}

