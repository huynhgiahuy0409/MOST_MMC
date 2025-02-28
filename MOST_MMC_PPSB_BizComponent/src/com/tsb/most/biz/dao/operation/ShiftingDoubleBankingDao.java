package com.tsb.most.biz.dao.operation;


import com.tsb.most.biz.dataitem.operation.ShiftingDoubleBankingItem;
import com.tsb.most.biz.parm.operation.SearchShiftingDoubleBankingParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException; 	

public class ShiftingDoubleBankingDao extends BaseDao implements IShiftingDoubleBankingDao {   
    
	public DataItemList selectDoubleBankingList(SearchShiftingDoubleBankingParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("shiftingDoubleBanking.selectDoubleBankingList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}       
    }  
	
	public DataItemList selectStsOperationList(SearchShiftingDoubleBankingParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("shiftingDoubleBanking.selectStsOperationList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    } 
	
	public DataItemList selectDocAmountByOPRMode(SearchShiftingDoubleBankingParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("shiftingDoubleBanking.selectDocAmountByOPRMode", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList selectVesselShiftingList(SearchShiftingDoubleBankingParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("shiftingDoubleBanking.selectVesselShiftingList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public String checkVslShifting(SearchShiftingDoubleBankingParm parm)throws DaoException {
    	try{   		
        	ShiftingDoubleBankingItem item = new ShiftingDoubleBankingItem();
        	item = (ShiftingDoubleBankingItem)unifiedDao.readOne("shiftingDoubleBanking.checkVslShifting", parm);
        	
        	return item.getVslShiftingYN();
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList selectVesselCurrWharf(SearchShiftingDoubleBankingParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("shiftingDoubleBanking.selectVesselCurrWharf", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList selectCargoShiftingList(SearchShiftingDoubleBankingParm parm) throws DaoException {
    	try{
            return unifiedDao.getItems("shiftingDoubleBanking.selectCargoShiftingList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList selectCommodity(SearchShiftingDoubleBankingParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("shiftingDoubleBanking.selectCommodity", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
	
	public DataItemList selectCommodityWithinConfirmationSlip(SearchShiftingDoubleBankingParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("shiftingDoubleBanking.selectCommodityWithinConfirmationSlip", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList selectCargoType(SearchShiftingDoubleBankingParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("shiftingDoubleBanking.selectCargoType", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
	
	public DataItemList selectConfSlpInformation(SearchShiftingDoubleBankingParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("shiftingDoubleBanking.selectConfSlpInformation", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}       
    }
	
	public DataItemList selectShftAtx(SearchShiftingDoubleBankingParm parm) throws DaoException {
    	try{
            return unifiedDao.getItems("shiftingDoubleBanking.selectShftAtx", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	////////////////////////////////////////////////////////////////////////////////////////////
	
	public DataItemList insertVesselShiftingItems(InsertItemsBizParm parm) throws DaoException {
    	try {
	 		DataItemList insertItems = parm.getInsertItems();
	 		setNewVersion(insertItems);	
	 		
	 		unifiedDao.insertItems(null,"shiftingDoubleBanking.insertVesselShiftingItems", insertItems);
	 		
	 		setVersion(insertItems);			
	 		
	 		return insertItems;
	    }catch(Exception e){
			throw new DaoException(e);
		}
 	}
	
	public DataItemList updateVesselShiftingItems(UpdateItemsBizParm parm) throws DaoException {
   	 try {
	 		DataItemList updateItems = parm.getUpdateItems();
	 		setNewVersion(updateItems);
	 		
	 		unifiedDao.updateItems(null,"shiftingDoubleBanking.updateVesselShiftingItems", updateItems);
	 		
	 		setVersion(updateItems);
	 		
	 		return updateItems;
    	}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList deleteVesselShiftingItems(DeleteItemsBizParm parm) throws DaoException {
    	try {
			DataItemList deleteItems = parm.getDeleteItems();
			setNewVersion(deleteItems);
			
			unifiedDao.deleteItems(null,"shiftingDoubleBanking.deleteVesselShiftingItems", deleteItems);
			setVersion(deleteItems);
			
			return deleteItems;
	    }catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList insertCargoShiftingItems(InsertItemsBizParm parm) throws DaoException {
    	try {
	  		DataItemList insertItems = parm.getInsertItems();
	  		setNewVersion(insertItems);	
	  		
	  		unifiedDao.insertItems(null,"shiftingDoubleBanking.insertCargoShiftingItems", insertItems);
	  		
	  		setVersion(insertItems);			
	  		
	  		return insertItems;
	    }catch(Exception e){
			throw new DaoException(e);
		}
  	}
	
	public DataItemList updateCargoShiftingItems(UpdateItemsBizParm parm) throws DaoException {
    	try {
	   		DataItemList updateItems = parm.getUpdateItems();
	   		setNewVersion(updateItems);
	   		
	   		unifiedDao.updateItems(null,"shiftingDoubleBanking.updateCargoShiftingItems", updateItems);
	   		
	   		setVersion(updateItems);
	   		
	   		return updateItems;
	    }catch(Exception e){
			throw new DaoException(e);
		}
   	}
	
	public DataItemList deleteCargoShiftingItems(DeleteItemsBizParm parm) throws DaoException {
    	try {
	   		DataItemList deleteItems = parm.getDeleteItems();
	   		setNewVersion(deleteItems);
	   		
	   		unifiedDao.deleteItems(null,"shiftingDoubleBanking.deleteCargoShiftingItems", deleteItems);
	   		setVersion(deleteItems);
	   		
		   		return deleteItems;
	    }catch(Exception e){
			throw new DaoException(e);
		}
   	}
	
	public DataItemList update2ndVesselInfoItems(UpdateItemsBizParm parm) throws DaoException {
   	 try {
	 		DataItemList updateItems = parm.getUpdateItems();
	 		setNewVersion(updateItems);
	 		
	 		unifiedDao.updateItems(null,"shiftingDoubleBanking.update2ndVesselInfoItems", updateItems);
			unifiedDao.updateItems(null,"shiftingDoubleBanking.update2ndVesselSftInfoItems", updateItems);
	 		
	 		setVersion(updateItems);
	 		
	 		return updateItems;
    	}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList update3ndVesselInfoItems(UpdateItemsBizParm parm) throws DaoException {
   	 try {
	 		DataItemList updateItems = parm.getUpdateItems();
	 		setNewVersion(updateItems);
	 		
	 		unifiedDao.updateItems(null,"shiftingDoubleBanking.update3ndVesselInfoItems", updateItems);
	 		
	 		setVersion(updateItems);
	 		
	 		return updateItems;
    	}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList insertDoubleBankingItems(InsertItemsBizParm parm) throws DaoException {
    	try {
	 		DataItemList insertItems = parm.getInsertItems();
	 		setNewVersion(insertItems);	
	 		
	 		unifiedDao.insertItems(null,"shiftingDoubleBanking.insertDoubleBankingItems", insertItems);
			unifiedDao.updateItems(null,"shiftingDoubleBanking.updateVslAtbAtu", insertItems);
	 		
	 		setVersion(insertItems);			
	 		
	 		return insertItems;
	    }catch(Exception e){
			throw new DaoException(e);
		}
 	}
	
	public DataItemList updateDoubleBankingItems(UpdateItemsBizParm parm) throws DaoException {
   	 try {
	 		DataItemList updateItems = parm.getUpdateItems();
	 		setNewVersion(updateItems);
	 		
	 		unifiedDao.updateItems(null,"shiftingDoubleBanking.updateDoubleBankingItems", updateItems);
			unifiedDao.updateItems(null,"shiftingDoubleBanking.updateVslAtbAtu", updateItems);
	 		
	 		setVersion(updateItems);
	 		
	 		return updateItems;
    	}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList updateVesselInfoRollBackItems(UpdateItemsBizParm parm) throws DaoException {
   	 try {
	 		DataItemList updateItems = parm.getUpdateItems();
	 		setNewVersion(updateItems);
	 		
	 		unifiedDao.updateItems(null,"shiftingDoubleBanking.updateVesselInfoRollBackItems", updateItems);
	 		
	 		setVersion(updateItems);
	 		
	 		return updateItems;
    	}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList updateVsAtu(UpdateItemsBizParm parm) throws DaoException {
   	 try {
	 		DataItemList updateItems = parm.getUpdateItems();
	 		setNewVersion(updateItems);
	 		
	 		unifiedDao.updateItems(null,"shiftingDoubleBanking.updateVsAtu", updateItems);
	 		
	 		setVersion(updateItems);
	 		
	 		return updateItems;
    	}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList deleteDoubleBankingItems(DeleteItemsBizParm parm) throws DaoException {
    	try {
			DataItemList deleteItems = parm.getDeleteItems();
			setNewVersion(deleteItems);
			
			unifiedDao.deleteItems(null,"shiftingDoubleBanking.deleteDoubleBankingItems", deleteItems);
			setVersion(deleteItems);
			
			return deleteItems;
	    }catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList insertShipToShipItems(InsertItemsBizParm parm) throws DaoException {
    	try {
	 		DataItemList insertItems = parm.getInsertItems();
	 		setNewVersion(insertItems);	

	 		unifiedDao.insertItems(null,"shiftingDoubleBanking.insertStsOperationItems", insertItems);
	        unifiedDao.updateItems(null, "shiftingDoubleBanking.updateActualTime", insertItems);
	        unifiedDao.updateItems(null, "shiftingDoubleBanking.updateDblBnkActualTime", insertItems);
	        unifiedDao.updateItems(null, "shiftingDoubleBanking.updateActualTimeNextVsl", insertItems);
	        unifiedDao.updateItems(null, "shiftingDoubleBanking.updateDblBnkActualTimeNextVsl", insertItems);
	 		setVersion(insertItems);			
	 		
	 		return insertItems;
	    }catch(Exception e){
			throw new DaoException(e);
		}
 	}
	
	public DataItemList updateShipToShipItems(UpdateItemsBizParm parm) throws DaoException {
   	 try {
	 		DataItemList updateItems = parm.getUpdateItems();
	 		setNewVersion(updateItems);

	 		unifiedDao.updateItems(null,"shiftingDoubleBanking.updateStsOperationItems", updateItems);
	        unifiedDao.updateItems(null, "shiftingDoubleBanking.updateActualTime", updateItems);
	        unifiedDao.updateItems(null, "shiftingDoubleBanking.updateDblBnkActualTime", updateItems);
	        unifiedDao.updateItems(null, "shiftingDoubleBanking.updateActualTimeNextVsl", updateItems);
	        unifiedDao.updateItems(null, "shiftingDoubleBanking.updateDblBnkActualTimeNextVsl", updateItems);
	 		setVersion(updateItems);
	 		
	 		return updateItems;
    	}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList deleteShipToShipItems(DeleteItemsBizParm parm) throws DaoException {
    	try {
			DataItemList deleteItems = parm.getDeleteItems();
			setNewVersion(deleteItems);
			
			unifiedDao.deleteItems(null,"shiftingDoubleBanking.deleteShipToShipItems", deleteItems);
			setVersion(deleteItems);
			
			return deleteItems;
	    }catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList selectBlSnCombo(SearchShiftingDoubleBankingParm parm) throws DaoException {
		// TODO Auto-generated method stub
		try{
    		return unifiedDao.getItems("shiftingDoubleBanking.selectBlSnCombo", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

}
