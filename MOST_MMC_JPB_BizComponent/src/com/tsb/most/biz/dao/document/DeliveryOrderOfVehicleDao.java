package com.tsb.most.biz.dao.document;

import com.tsb.most.biz.parm.document.SearchDeliveryOrderOfVehicleParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class DeliveryOrderOfVehicleDao extends BaseDao implements IDeliveryOrderOfVehicleDao {
	
	public DataItemList selectDeliveryOrderItems(SearchDeliveryOrderOfVehicleParm parm) throws DaoException {
		return unifiedDao.getItemsPage("deliveryOrderOfVehicle.selectDeliveryOrderItems", parm);
	}
	
	public DataItemList selectSubDeliveryOrderItems(SearchDeliveryOrderOfVehicleParm parm) throws DaoException {
		return unifiedDao.getItemsPage("deliveryOrderOfVehicle.selectSubDeliveryOrderItems", parm);
	}
	
	public DataItemList selectAssigningTrucksForVehicleItems(SearchDeliveryOrderOfVehicleParm parm) throws DaoException {
		return unifiedDao.getItemsPage("deliveryOrderOfVehicle.selectAssigningTrucksForVehicleItems", parm);
	}
	
	public DataItemList selectAssigningDriversForVehicleItems(SearchDeliveryOrderOfVehicleParm parm) throws DaoException {
		return unifiedDao.getItemsPage("deliveryOrderOfVehicle.selectAssigningDriversForVehicleItems", parm);
	}
	
	public DataItemList selectAssignedDriversAndTrucksForVehicleItems(SearchDeliveryOrderOfVehicleParm parm) throws DaoException {
		return unifiedDao.getItemsPage("deliveryOrderOfVehicle.selectAssignedDriversAndTrucksForVehicleItems", parm);
	}
	
	public DataItemList selectDeliveryOrderNo(SearchDeliveryOrderOfVehicleParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("deliveryOrderOfVehicle.selectDeliveryOrderNo", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList insertDriversAndTrucksItems(InsertItemsBizParm parm) throws DaoException {
		try{
    		DataItemList insertItems = parm.getInsertItems();
    		setNewVersion(insertItems);	
    		unifiedDao.insertItems(null,"deliveryOrderOfVehicle.insertDriversAndTrucksItems", insertItems);
    		setVersion(insertItems);			
    		return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList insertSubDeliveryOrderItems(InsertItemsBizParm parm) throws DaoException {
		try{
    		DataItemList insertItems = parm.getInsertItems();
    		setNewVersion(insertItems);	
    		unifiedDao.insertItems(null,"deliveryOrderOfVehicle.insertSubDeliveryOrderItems", insertItems);
    		setVersion(insertItems);			
    		return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	 
	public DataItemList updateSubDeliveryOrderItems(UpdateItemsBizParm parm) throws DaoException {
    	try{
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);	
    		unifiedDao.updateItems(null,"deliveryOrderOfVehicle.updateSubDeliveryOrderItems", updateItems);
    		setVersion(updateItems);			
    		return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList deleteAssignedDriversAndTrucksForVehicleItems(DeleteItemsBizParm items) throws DaoException{
    	try{
    		DataItemList  itemList = items.getDeleteItems();
			setNewVersion(itemList);
			unifiedDao.deleteItems(null, "deliveryOrderOfVehicle.deleteAssignedDriversAndTrucksForVehicleItems", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList deleteSubDeliveryOrderItems(DeleteItemsBizParm items) throws DaoException{
    	try{
    		DataItemList  itemList = items.getDeleteItems();
			setNewVersion(itemList);
			unifiedDao.deleteItems(null, "deliveryOrderOfVehicle.deleteSubDeliveryOrderItems", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
}
