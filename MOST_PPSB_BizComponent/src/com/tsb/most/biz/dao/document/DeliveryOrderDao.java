package com.tsb.most.biz.dao.document;

import com.tsb.most.biz.dataitem.document.DeliveryOrderItem;
import com.tsb.most.biz.parm.document.SearchDeliveryOrderParm;
import com.tsb.most.biz.parm.document.SearchManifestParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public class DeliveryOrderDao extends BaseDao implements IDeliveryOrderDao {
    public DataItemList selectDeliveryOrder(SearchDeliveryOrderParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItemsPage("deliveryOrder.selectDeliveryOrder", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    @Override
	public DataItemList getWhCheckDataForIndirect(SearchDeliveryOrderParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItemsPage("deliveryOrder.getWhCheckDataForIndirect", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
    
    @Override
   	public DataItemList getApronCheckDataForIndirect(SearchDeliveryOrderParm parm) throws DaoException {
       	try{
       		return unifiedDao.getItemsPage("deliveryOrder.getApronCheckDataForIndirect", parm);
   		}catch(Exception e){
   			throw new DaoException(e);
   		}
   	}
    
    public DataItemList selectSubDeliveryOrder(SearchDeliveryOrderParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItemsPage("deliveryOrder.selectSubDeliveryOrder", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectCargoMasterList(SearchCargoMasterParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("deliveryOrder.selectCargoMasterList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList subDoNoDuplicateChk(SearchDeliveryOrderParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("deliveryOrder.subDoNoDuplicateChk", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    @Override
	public DataItemList selectPackageItems(SearchDeliveryOrderParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("deliveryOrder.selectPackageItems", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectSubDeliveryOrderReport(SearchDeliveryOrderParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("deliveryOrder.selectSubDeliveryOrderReport", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectDeliveryOrderWgtCheck(SearchDeliveryOrderParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("deliveryOrder.selectDeliveryOrderWgtCheck", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException {
		try{
    		DataItemList insertItems = parm.getInsertItems();
    		
    		setNewVersion(insertItems);	
    		unifiedDao.insertItems(null,"deliveryOrder.insertDeliveryOrderItems", insertItems);
    		setVersion(insertItems);	
    		
    		return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    @Override
    public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException {
    	try{
			DataItemList updateItems = parm.getUpdateItems();
			
			setNewVersion(updateItems);	
    		unifiedDao.updateItems(null,"deliveryOrder.updateDeliveryOrderItems", updateItems);
    		setVersion(updateItems);
    		
    		return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public void updateCargoMaster(TxTraceInfo txTraceInfo,DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.updateItems(txTraceInfo, "deliveryOrder.updateCargoMaster", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList updateDeliveryOrderAdditionalChk(UpdateItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList updateItems = parm.getUpdateItems();
    		
			setNewVersion(updateItems);
			unifiedDao.updateItems(null, "deliveryOrder.updateDeliveryOrderAdditionalChk", updateItems);
			setVersion(updateItems);
			
			return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public void deleteDeliveryOrderItems(TxTraceInfo txTraceInfo, DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.deleteItems(txTraceInfo, "deliveryOrder.deleteDeliveryOrderItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public void updateDeliveryOrderAck(TxTraceInfo txTraceInfo, DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.insertItems(txTraceInfo,"deliveryOrder.updateDeliveryOrderAck", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }

    @Override
	public void updatePackageItems(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.insertItem(null ,"deliveryOrder.updatePackageItems", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
    
    public DataItemList selectDeliveryOrderNo(SearchDeliveryOrderParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("deliveryOrder.selectDeliveryOrderNo", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectSubDoNoItems(SearchDeliveryOrderParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("deliveryOrder.selectSubDoNoItems", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }

	@Override
	public DeliveryOrderItem updateBLItems(DeliveryOrderItem item) throws DaoException {
		try {
			setNewVersion(item);
			unifiedDao.updateItem(null, "deliveryOrder.updateDeliveryOrderBLItems", item);
			setVersion(item);
			
			return item;
			
		} catch(Exception ex) {
			throw new DaoException(ex);
		}		
	}
	
	public void deleteItems(DeleteItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList deleteItems = parm.getDeleteItems();
			
			setNewVersion(deleteItems);
			unifiedDao.deleteItemsWithTimeCheck(null, "deliveryOrder.deleteDeliveryOrder", deleteItems);
			setVersion(deleteItems);
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
	
	public void deleteAllSubDeliveryOrderItems(DeleteItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList deleteItems = parm.getDeleteItems();
			
			setNewVersion(deleteItems);
			unifiedDao.deleteItems(null, "deliveryOrder.deleteAllSubDeliveryOrderItems", deleteItems);
			unifiedDao.deleteItems(null, "deliveryOrder.deleteROROItems", deleteItems);
			setVersion(deleteItems);
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
	
	
	@Override
	public DataItemList insertSubDeliveryOrderItems(InsertItemsBizParm parm) throws DaoException {
		try{
    		DataItemList insertItems = parm.getInsertItems();
    		setNewVersion(insertItems);	
    		unifiedDao.insertItems(null,"deliveryOrder.insertSubDeliveryOrderItems", insertItems);
    		setVersion(insertItems);			
    		return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    @Override
    public DataItemList updateSubDeliveryOrderItems(UpdateItemsBizParm parm) throws DaoException {
    	try{
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);	
    		unifiedDao.updateItems(null,"deliveryOrder.updateSubDeliveryOrderItems", updateItems);
    		setVersion(updateItems);			
    		return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    @Override
    public void deleteSubDeliveryOrderItems(DeleteItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList deleteItems = parm.getDeleteItems();
			
			setNewVersion(deleteItems);
			unifiedDao.deleteItemsWithTimeCheck(null, "deliveryOrder.deleteSubDeliveryOrderItems", deleteItems);
			unifiedDao.deleteItems(null, "deliveryOrder.deleteROROItems", deleteItems);
			setVersion(deleteItems);
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
    
    @Override
    public DataItemList deletePackageItems(UpdateItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList updateItems = parm.getUpdateItems();
    		
			setNewVersion(updateItems);
			unifiedDao.updateItems(null, "deliveryOrder.deletePackageItems", updateItems);
			setVersion(updateItems);
			
			return updateItems;
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
    
    public DataItemList selectDeliveryOrderBLComboList(SearchDeliveryOrderParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("deliveryOrder.selectDeliveryOrderBLComboList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectManifestComboList(SearchManifestParm parm)throws DaoException{
    	try{
    		return unifiedDao.getItems("deliveryOrder.selectManifestComboList", parm);
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
    }
    
    public DataItemList getDeliveryOrderBLComboList(SearchDeliveryOrderParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("deliveryOrder.selectDeliveryOrderBLComboList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }

	@Override
	public void insertRoRoItems(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.insertItem(null ,"bl.insertRoRoMSTItems", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public boolean selectIsROROMst(SearchCargoMasterParm mstParm) throws DaoException {
		try{
    		String rtnValue = (String)unifiedDao.readOne("bl.selectIsROROMst", mstParm);
            
            if(rtnValue != null && rtnValue.equals("1")){
                return true;
            }else{
                return false;
            }
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public void updateRoRoItems(DataItem item) throws DaoException {
		try {
			setNewVersion(item);
			unifiedDao.updateItem(null, "bl.updateRoRoItems", item);
			setVersion(item);
		} catch(Exception ex) {
			throw new DaoException(ex);
		}	
	}

	
}