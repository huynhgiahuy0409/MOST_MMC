package com.tsb.most.basebiz.service.configuration;

import java.util.Iterator;

import com.tsb.most.basebiz.dao.configuration.IBerthLocationConfigurationDao;
import com.tsb.most.basebiz.dataitem.configuration.BerthLocationConfigurationItem;
import com.tsb.most.basebiz.parm.configuration.SearchBerthLocationConfigurationParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.BizException;

public class BerthLocationConfiguration extends MOSTBaseService implements IBerthLocationConfiguration {
	private IBerthLocationConfigurationDao berthLocationConfigurationDao;

	public void setBerthLocationConfigurationDao(IBerthLocationConfigurationDao berthLocationConfigurationDao) {
		this.berthLocationConfigurationDao = berthLocationConfigurationDao;
	}

	public DataItemList selectBerthWharfList(SearchBerthLocationConfigurationParm parm)throws BizException{
		return berthLocationConfigurationDao.selectBerthWharfList(parm);
	}

	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException{
		DataItemList items = parm.getInsertItems();
		Iterator<IDataItem> list = items.getCollection().iterator();
		
		while (list.hasNext()) {
			BerthLocationConfigurationItem item = (BerthLocationConfigurationItem) list.next();
            
            try {
         		return berthLocationConfigurationDao.insertItems(parm);
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
			BerthLocationConfigurationItem item = (BerthLocationConfigurationItem) list.next();
			
            try {
         		return berthLocationConfigurationDao.updateItems(parm);
            }catch(Exception ex) {
             	throw new BizException(ex);
        	}
		}
		
		return null;
	}

	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException{
		return berthLocationConfigurationDao.deleteItems(parm);
	}
}
