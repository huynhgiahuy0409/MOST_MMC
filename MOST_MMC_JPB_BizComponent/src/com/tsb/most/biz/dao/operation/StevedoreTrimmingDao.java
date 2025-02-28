package com.tsb.most.biz.dao.operation;


import java.util.List;

import com.tsb.most.biz.parm.operation.SearchStevedoreTrimmingParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo; 	

public class StevedoreTrimmingDao extends BaseDao implements IStevedoreTrimmingDao {   
    
	public DataItemList selectVORDryBreakBulkForStevAndTrim(SearchStevedoreTrimmingParm parm) throws DaoException {
	    return unifiedDao.getItems("StevedoreTrimmingMap.selectVORDryBreakBulkForStevAndTrim", parm);       
	}
  
	public DataItemList selectVORDryBreakBulk(SearchStevedoreTrimmingParm parm) throws DaoException {
		return unifiedDao.getItems("StevedoreTrimmingMap.selectVORDryBreakBulk", parm);       
	}
	
	public DataItemList selectEquipment(SearchStevedoreTrimmingParm parm) throws DaoException {
        return unifiedDao.getItems("StevedoreTrimmingMap.selectEquipment", parm);       
    }
	
	public DataItemList selectRole(SearchStevedoreTrimmingParm parm) throws DaoException {
        return unifiedDao.getItems("StevedoreTrimmingMap.selectRole", parm);       
    }  
	
	public DataItemList selectShift(SearchStevedoreTrimmingParm parm) throws DaoException {
        return unifiedDao.getItems("StevedoreTrimmingMap.selectShift", parm);       
    }
	
	public DataItemList selectEquipmentList(SearchStevedoreTrimmingParm parm) throws DaoException {
    	return unifiedDao.getItems("StevedoreTrimmingMap.selectEquipmentList", parm);       
    }
	
	public void updateVORDryBreakBulkItemsForStevAndTrim(UpdateItemsBizParm parm) throws DaoException {
		DataItemList items = parm.getUpdateItems();
		unifiedDao.updateItems(null, "StevedoreTrimmingMap.updateVORDryBreakBulkItemsForStevAndTrim", items);
	}
	
	public void deleteVORDryBreakBulkItems(DeleteItemsBizParm items) throws DaoException {
		try {
			DataItemList itemList = items.getDeleteItems();
			unifiedDao.deleteItems(null, "StevedoreTrimmingMap.deleteVORDryBreakBulkItems", itemList);
			
			unifiedDao.updateItems(null, "StevedoreTrimmingMap.updateDblBankingActualTime", itemList);
			unifiedDao.updateItems(null, "StevedoreTrimmingMap.updateDblBankingActualTime1", itemList);
			unifiedDao.updateItems(null, "StevedoreTrimmingMap.updateDblBankingActualTime2", itemList);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}
	
	public void updateVORDryBreakBulkItemsWithShipCrew(UpdateItemsBizParm parm) throws DaoException {
		DataItemList items = parm.getUpdateItems();
        unifiedDao.updateItems(null, "StevedoreTrimmingMap.updateVORDryBreakBulkItemsWithShipCrew", items);
    }
	    

}
