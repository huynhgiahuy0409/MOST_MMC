package com.tsb.most.biz.dao.document;

import com.tsb.most.biz.parm.document.SearchTruckAssignmentOfROROParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;


public class TruckAssignmentOfRORODao extends BaseDao implements ITruckAssignmentOfRORODao {
  
    public DataItemList selectTruckAssignmentItems(SearchTruckAssignmentOfROROParm parm) throws DaoException {
    	return unifiedDao.getItemsPage("truckAssignmentOfRORO.selectTruckAssignmentItems", parm);
	} 
    
    public DataItemList selectAssigningTrucksForVehicleItems(SearchTruckAssignmentOfROROParm parm) throws DaoException {
		return unifiedDao.getItemsPage("truckAssignmentOfRORO.selectAssigningTrucksForVehicleItems", parm);
	}
	
	public DataItemList selectAssigningDriversForVehicleItems(SearchTruckAssignmentOfROROParm parm) throws DaoException {
		return unifiedDao.getItemsPage("truckAssignmentOfRORO.selectAssigningDriversForVehicleItems", parm);
	}
	
	public DataItemList selectAssignedDriversAndTrucksForVehicleItems(SearchTruckAssignmentOfROROParm parm) throws DaoException {
		return unifiedDao.getItemsPage("truckAssignmentOfRORO.selectAssignedDriversAndTrucksForVehicleItems", parm);
	}
	
	public DataItemList insertDriversAndTrucksItems(InsertItemsBizParm parm) throws DaoException {
		try{
    		DataItemList insertItems = parm.getInsertItems();
    		setNewVersion(insertItems);	
    		unifiedDao.insertItems(null,"truckAssignmentOfRORO.insertDriversAndTrucksItems", insertItems);
    		setVersion(insertItems);			
    		return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList deleteAssignedDriversAndTrucksForVehicleItems(DeleteItemsBizParm items) throws DaoException{
    	try{
    		DataItemList  itemList = items.getDeleteItems();
			setNewVersion(itemList);
			unifiedDao.deleteItems(null, "truckAssignmentOfRORO.deleteAssignedDriversAndTrucksForVehicleItems", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
}
