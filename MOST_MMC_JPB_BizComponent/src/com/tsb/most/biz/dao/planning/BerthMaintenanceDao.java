package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchBerthMaintenanceParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class BerthMaintenanceDao extends BaseDao implements IBerthMaintenanceDao {
    
    public DataItemList selectBerthMaintenanceList(SearchBerthMaintenanceParm parm) throws DaoException {
        return unifiedDao.getItems("BerthMaintenanceMap.selectBerthMaintenanceList", parm);
    }
    
    public DataItemList selectBerthLocList(SearchBerthMaintenanceParm parm) throws DaoException{
        return unifiedDao.getItems("BerthMaintenanceMap.selectBerthLocList",parm);
    }
    
    public DataItemList selectBittList(SearchBerthMaintenanceParm parm) throws DaoException{
        return unifiedDao.getItems("BerthMaintenanceMap.selectBittList",parm);
    }
    
    public DataItemList selectStoppageReasonList(SearchBerthMaintenanceParm parm) throws DaoException{
        return unifiedDao.getItems("BerthMaintenanceMap.selectStoppageReasonList",parm);
    }
    
    public DataItemList selectDuplicateBerthNoAndStartTime(SearchBerthMaintenanceParm parm) throws DaoException{
        return unifiedDao.getItems("BerthMaintenanceMap.selectDuplicateBerthNoAndStartTime",parm);
    }
    
    public DataItemList insertBerthMaintenanceList(InsertItemsBizParm parm) throws DaoException{
    	try {
			DataItemList itemList = parm.getInsertItems();
			setNewVersion(itemList);
			unifiedDao.insertItems(null, "BerthMaintenanceMap.insertBerthMaintenanceList", itemList);
			setVersion(itemList);
			return itemList;
		}
		catch (Exception e) {
			throw new DaoException(e);
		}
	}
    
    public DataItemList updateBerthMaintenanceList(UpdateItemsBizParm parm) throws DaoException{
    	try{
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);	
    		unifiedDao.updateItems(null,"BerthMaintenanceMap.updateBerthMaintenanceList", updateItems);
    		setVersion(updateItems);			
    		return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
  	}
	
	public void deleteBerthMaintenanceList(DeleteItemsBizParm items) throws DaoException {
		try{
    		DataItemList  itemList = items.getDeleteItems();
			setNewVersion(itemList);
			unifiedDao.deleteItems(null, "BerthMaintenanceMap.deleteBerthMaintenanceList", itemList);
			setVersion(itemList);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
}
