package com.tsb.most.biz.service.planning;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;

import com.tsb.most.biz.dao.planning.IBerthMaintenanceDao;
import com.tsb.most.biz.dataitem.planning.BerthMaintenanceItem;
import com.tsb.most.biz.parm.planning.SearchBerthMaintenanceParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.BizException;

public class BerthMaintenance extends MOSTBaseService implements IBerthMaintenance{
	private IBerthMaintenanceDao berthMaintenanceDao;

	public void setBerthMaintenanceDao(IBerthMaintenanceDao berthMaintenanceDao){
    	this.berthMaintenanceDao = berthMaintenanceDao;
    }	
	
	public DataItemList selectBerthMaintenanceList(SearchBerthMaintenanceParm parm) throws BizException {
		return berthMaintenanceDao.selectBerthMaintenanceList(parm);
	}
	
	public DataItemList selectBerthLocList(SearchBerthMaintenanceParm parm)throws BizException{
		return berthMaintenanceDao.selectBerthLocList(parm);
	}
	
	public DataItemList selectBittList(SearchBerthMaintenanceParm parm)throws BizException{
		return berthMaintenanceDao.selectBittList(parm);
	}
	
	public DataItemList selectStoppageReasonList(SearchBerthMaintenanceParm parm)throws BizException{
		return berthMaintenanceDao.selectStoppageReasonList(parm);
	}
	
	public DataItemList selectDuplicateBerthNoAndStartTime(SearchBerthMaintenanceParm parm)throws BizException{
		return berthMaintenanceDao.selectDuplicateBerthNoAndStartTime(parm);
	}
	
	public DataItemList insertBerthMaintenanceList(InsertItemsBizParm parm) throws BizException{
		DataItemList items = parm.getInsertItems();
		Iterator<IDataItem> list = items.getCollection().iterator();
		
		while (list.hasNext()) {
			BerthMaintenanceItem item = (BerthMaintenanceItem) list.next();
            
            try {
         		return berthMaintenanceDao.insertBerthMaintenanceList(parm);
         		
             }catch(Exception ex) {
            	 throw new BizException(ex);
             }
		}
		
		return null;
		
	}
	
	public DataItemList updateBerthMaintenanceList(UpdateItemsBizParm parm)throws BizException {
    	return berthMaintenanceDao.updateBerthMaintenanceList(parm);
	}

	public void deleteBerthMaintenanceList(DeleteItemsBizParm parm) throws BizException{
		 berthMaintenanceDao.deleteBerthMaintenanceList(parm);
	}
}
