package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchVORLiquidBulkParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class VORLiquidBulkDao extends BaseDao implements IVORLiquidBulkDao {
	
	public DataItemList selectBerthAndOperationItems(SearchVORLiquidBulkParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vorLiquidBulk.selectBerthAndOperationItems", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList selectVORSummaryItems(SearchVORLiquidBulkParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vorLiquidBulk.selectVORSummaryItems", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList selectVORDelaySummaryItems(SearchVORLiquidBulkParm parm) throws DaoException {
    	try{
    		DataItemList rtnList = null;
    		rtnList = unifiedDao.getItems("vorLiquidBulk.selectVORDelaySummaryItems", parm);
            
            return rtnList;
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
	
	public DataItemList selectVORLiquidBulkCgOprType(SearchVORLiquidBulkParm parm) throws DaoException {
    	try{
            return unifiedDao.getItems("vorLiquidBulk.selectVORLiquidBulkCgOprType", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList selectConfirmationSlipDetailItem(SearchVORLiquidBulkParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vorLiquidBulk.selectConfirmationSlipDetailItem", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
	
	//Detail
	public DataItemList selectVORLiquidCargo(SearchVORLiquidBulkParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vorLiquidBulk.selectVORLiquidCargo", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	////////////////////////////////////////////////////////////////
	
	//////////////////////////////////////////////////////////////////////////
	public DataItemList insertVORLiquidCargoItems(InsertItemsBizParm parm) throws DaoException {
    	
		try {
			DataItemList insertItems = parm.getInsertItems();
			setNewVersion(insertItems);
			unifiedDao.insertItems(null,"vorLiquidBulk.insertVORLiquidCargoItems",insertItems);
			
			setVersion(insertItems);
			return insertItems;
		} catch (Exception e) {
			throw new DaoException(e);
		}
    }
	
	public DataItemList updateVORLiquidHoseLines(UpdateItemsBizParm parm) throws DaoException {
		try{
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			unifiedDao.updateItemsWithTimeCheck(null,"vorLiquidBulk.updateVORLiquidHoseLines",updateItems);
			setVersion(updateItems);
			return updateItems;
		}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
	
	public DataItemList updateAtwAtc4LqVsl(UpdateItemsBizParm parm) throws DaoException {
    	try{
			DataItemList updateItems = parm.getUpdateItems();
			
			setNewVersion(updateItems);
			unifiedDao.updateItemsWithTimeCheck(null, "vorLiquidBulk.updateAtwAtc4LqVsl", updateItems);
			setVersion(updateItems);
			
			return updateItems;
		
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
	
	public DataItemList updateVORLiquidCargoItems(UpdateItemsBizParm parm) throws DaoException {
		try{
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			unifiedDao.updateItemsWithTimeCheck(null,"vorLiquidBulk.updateVORLiquidCargoItems",updateItems);
//			unifiedDao.updateItemsWithTimeCheck(null,"vorLiquidBulk.updateDblBnkActualTime",updateItems);
			setVersion(updateItems);
			return updateItems;
		}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
	
	public DataItemList deleteVORLiquidCargoItems(DeleteItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList deleteItems = parm.getDeleteItems();
			
			setNewVersion(deleteItems);
			unifiedDao.deleteItems(null, "vorLiquidBulk.deleteVORLiquidCargoItems", deleteItems);
			unifiedDao.updateItems(null, "vorLiquidBulk.updateDblBnkActualTime", deleteItems);
			setVersion(deleteItems);
			
			return deleteItems;
		
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
	
	public DataItemList deleteVORLiquidItems(DeleteItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList deleteItems = parm.getDeleteItems();
			
			setNewVersion(deleteItems);
			unifiedDao.deleteItems(null, "vorLiquidBulk.deleteVORLiquidItems", deleteItems);
			unifiedDao.deleteItems(null, "vorLiquidBulk.deleteVORLiquidDelayItems", deleteItems);
			setVersion(deleteItems);
			
			return deleteItems;
		
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
	
	public DataItemList insertVORLiquidDelayItems(InsertItemsBizParm parm) throws DaoException {
    	
		try {
			DataItemList insertItems = parm.getInsertItems();
			setNewVersion(insertItems);
			unifiedDao.insertItems(null,"vorLiquidBulk.insertVORLiquidDelayItems",insertItems);
			
			setVersion(insertItems);
			return insertItems;
		} catch (Exception e) {
			throw new DaoException(e);
		}
    }
	
	public DataItemList updateVORLiquidDelayItems(UpdateItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			unifiedDao.updateItems(null, "vorLiquidBulk.updateVORLiquidDelayItems", updateItems);
			setVersion(updateItems);
			return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }
	
	public DataItemList deleteVORLiquidDelayItems(DeleteItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList deleteItems = parm.getDeleteItems();
			
			setNewVersion(deleteItems);
			unifiedDao.updateItems(null, "vorLiquidBulk.deleteVORLiquidDelayItems", deleteItems);
			setVersion(deleteItems);
			
			return deleteItems;
		
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }

	@Override
	public DataItemList selectVORLiquidBulkCmdtList(SearchVORLiquidBulkParm parm) throws DaoException {
		// TODO Auto-generated method stub
		return unifiedDao.getItems("vorLiquidBulk.selectVORLiquidBulkCmdtList", parm);
	}

	@Override
	public DataItemList selectVesselShiftingList(SearchVORLiquidBulkParm parm) throws DaoException {
		// TODO Auto-generated method stub
		return unifiedDao.getItems("vorLiquidBulk.selectVesselShiftingList", parm);
	}

	@Override
	public DataItemList selectOprTimeSetList(SearchVORLiquidBulkParm parm) throws DaoException {
		// TODO Auto-generated method stub
		return unifiedDao.getItems("vorLiquidBulk.selectOprTimeSetList", parm);
	}

	@Override
	public DataItemList selectDelayTimeSumForLiquid(SearchVORLiquidBulkParm parm) throws DaoException {
		return unifiedDao.getItems("vorLiquidBulk.selectVORLiquidDelay", parm);
    }
	@Override
	public DataItemList selectDelayCodeList(SearchVORLiquidBulkParm parm) throws DaoException {
		return unifiedDao.getItems("vorLiquidBulk.selectDelayCodeList", parm);
	}

}
