package com.tsb.most.biz.dao.operation;

import java.util.List;

import com.tsb.most.biz.parm.operation.SearchCargoLoadingParm;
import com.tsb.most.biz.parm.operation.SearchRehandleGCParm;
import com.tsb.most.biz.parm.document.SearchGoodsReceiptParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public class RehandleGCDao extends BaseDao implements IRehandleGCDao {

    public DataItemList selectCargoRehandlingComboList(SearchRehandleGCParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("cargoRehandling.selectCargoRehandling", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
    
    public DataItemList selectCommodityGroupList(SearchRehandleGCParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("cargoRehandling.selectCommodityGroupList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectCommodtiyCodeList(SearchRehandleGCParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("cargoRehandling.selectCommodtiyCodeList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList insertCargoRehandlingItems(InsertItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList insertItems = parm.getInsertItems();
    		setNewVersion(insertItems);	
    		unifiedDao.insertItems(null,"cargoRehandling.insertCargoRehandlingItems", insertItems);
    		setVersion(insertItems);			
    		return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    @Override
    public DataItemList insertCargoInvLocationItems(InsertItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList insertItems = parm.getInsertItems();
    		setNewVersion(insertItems);	
    		unifiedDao.insertItems(null,"cargoRehandling.insertCargoInvLocationItems", insertItems);
    		setVersion(insertItems);			
    		return insertItems;
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
    }
    
    @Override
    public DataItemList insertJobItems(InsertItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList insertItems = parm.getInsertItems();
    		setNewVersion(insertItems);	
    		unifiedDao.insertItems(null,"cargoRehandling.insertJobItems", insertItems);
    		setVersion(insertItems);			
    		return insertItems;
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
    }
    
    @Override
    public DataItemList insertCargoMstItems(InsertItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList insertItems = parm.getInsertItems();
    		setNewVersion(insertItems);	
    		unifiedDao.insertItems(null,"cargoRehandling.insertCargoMstItems", insertItems);
    		setVersion(insertItems);			
    		return insertItems;
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
    }
    
    @Override
    public DataItemList updateAmtCargoMstItems(UpdateItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList updateItems = parm.getUpdateItems();
    		setNewVersion(updateItems);	
    		unifiedDao.insertItems(null,"cargoRehandling.updateAmtCargoMstItems", updateItems);
    		setVersion(updateItems);			
    		return updateItems;
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
    }
    
    public void updateCargoRehandlingItems(TxTraceInfo txTraceInfo, DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.updateItems(txTraceInfo,"cargoRehandling.updateCargoRehandlingItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public void deleteCargoRehandlingItems(DeleteItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList deleteItems = parm.getDeleteItems();
    		unifiedDao.deleteItems(null,"cargoRehandling.deleteCargoRehandlingItems", deleteItems);
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
    }
    
    public void deleteCargoRehandlingDetailItems(DeleteItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList deleteItems = parm.getDeleteItems();
    		unifiedDao.deleteItems(null,"cargoRehandling.deleteCargoRehandlingDetailItems", deleteItems);
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
    }
    
    public void deleteCargoRehandlingInvLocItems(DeleteItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList deleteItems = parm.getDeleteItems();
    		unifiedDao.deleteItems(null,"cargoRehandling.deleteCargoRehandlingInvLocItems", deleteItems);
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
    }
    
    public void deleteCargoMstItems(DeleteItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList deleteItems = parm.getDeleteItems();
    		unifiedDao.deleteItems(null,"cargoRehandling.deleteCargoMstItems", deleteItems);
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
    }
    
    public boolean getCargoRhdlGroupsYn(SearchRehandleGCParm parm) throws DaoException {
    	try{
    		//TODO
        	//Need to change return type
            Integer rtnList = new Integer(0);
                //rtnList = (Integer) unifiedDao.selectItem("cargoRehandling.selectIsRhdlGroups", parm);
            if(rtnList.intValue() > 1){
                return true;
            }else{
                return false;
            }
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }

    public DataItemList selectCargoRehandlingList(SearchRehandleGCParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("cargoRehandling.selectCargoRehandlingList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }
    
    public DataItemList validateDelete(SearchRehandleGCParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("cargoRehandling.validateDelete", parm);
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
    	
    }

    public DataItemList selectCargoRehandlingPopupList(SearchRehandleGCParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("cargoRehandling.selectCargoRehandlingPopupList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    @Override
    public DataItemList selectCargoRehandlingDetailList(SearchRehandleGCParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("cargoRehandling.selectCargoRehandlingDetailList", parm);
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
    }

    public DataItemList selectCargoRhdlOperation(SearchRehandleGCParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("cargoRehandling.selectCargoRhdlOperation", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }

    public DataItemList getNumbPage(SearchRehandleGCParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("cargoRehandling.selectNumbPage", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    } 
    
    public DataItemList selectCargoRhdlOperationNonJPVC(SearchRehandleGCParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItemsPage("cargoRehandling.selectCargoRhdlOperationNonJPVC", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
    
    public DataItemList getCargoRhdlBlSnCombo(SearchRehandleGCParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("cargoRehandling.selectCargoRhdlBlSnCombo", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
    
    public DataItemList selectRhdlShippingNoteComboList(SearchRehandleGCParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("cargoRehandling.selectRhShippingNoteComboList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }

    public DataItemList selectRhdlGrNoComboList(SearchRehandleGCParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("cargoRehandling.selectRhGrNoComboList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }

    public String getCargoRhdlGroupNo(SearchRehandleGCParm parm) throws DaoException {
    	try{
    		return (String)unifiedDao.readOne("cargoRehandling.selectCargoRhdlGroupNo", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	//TODO
    	//Need to change return type
    	
    }

    public DataItemList getCargoRhdlOpBlSnCombo(SearchRehandleGCParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("cargoRehandling.selectCargoRhdlOpBlSnCombo", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }

    public DataItemList getCargoRhdlStorageSnCombo(SearchRehandleGCParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("cargoRehandling.selectCargoRhdlStorageSnCombo", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }

	@Override
	public DataItemList selectCargoRhdLoadingList(SearchRehandleGCParm parm) throws DaoException {
		try{
			SearchCargoLoadingParm clitem = new SearchCargoLoadingParm();
			clitem.setVslCallId(parm.getVslCallId());
			clitem.setCgNo(parm.getCgNo());
			clitem.setGrNo(parm.getGrNo());
			clitem.setShftId(parm.getShiftId());
			clitem.setShftDt(parm.getShiftDt());
			clitem.setShipgNoteNo(parm.getShipgNoteNo());
			clitem.setRhdlGroupNo(parm.getRhdlGroupNo());
			
    		return unifiedDao.getItems("CargoLoadingMAP.selectCargoRhdlLoading", clitem);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public DataItemList selectInvLocList(SearchRehandleGCParm parm) throws DaoException {
		try{
			return unifiedDao.getItems("cargoRehandling.selectInvLocList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	@Override
	public DataItemList selectRhdlLinkJobNo(SearchRehandleGCParm parm) throws DaoException {
		try{
			return unifiedDao.getItems("cargoRehandling.selectRhdlLinkJobNo", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	@Override
	public DataItemList selectRhdlNo(SearchRehandleGCParm parm) throws DaoException {
		try{
			return unifiedDao.getItems("cargoRehandling.selectRhdlNo", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public DataItemList selectRstGr(SearchGoodsReceiptParm parm)throws DaoException{
		try{
			return unifiedDao.getItems("cargoRehandling.selectRstGr", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
    public DataItemList updateCargoRehandlingDetailItemsForUpdate(UpdateItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList updateItems = parm.getUpdateItems();
    		setNewVersion(updateItems);	
    		unifiedDao.insertItems(null,"cargoRehandling.updateCargoRehandlingDetailItemsForUpdate", updateItems);
    		setVersion(updateItems);			
    		return updateItems;
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
    }
	
	@Override
    public DataItemList updateCargoRehandlingRTSItemsForUpdate(UpdateItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList updateItems = parm.getUpdateItems();
    		setNewVersion(updateItems);	
    		unifiedDao.insertItems(null,"cargoRehandling.updateCargoRehandlingRTSItemsForUpdate", updateItems);
    		setVersion(updateItems);			
    		return updateItems;
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
    }
	
	@Override
    public DataItemList updateCargoRehandlingChgVslItemsForUpdate(UpdateItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList updateItems = parm.getUpdateItems();
    		setNewVersion(updateItems);	
    		unifiedDao.insertItems(null,"cargoRehandling.updateCargoRehandlingChgVslItemsForUpdate", updateItems);
    		setVersion(updateItems);			
    		return updateItems;
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
    }
	
	@Override
    public DataItemList updateShpgNoteItemsForUpdate(UpdateItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList updateItems = parm.getUpdateItems();
    		setNewVersion(updateItems);	
    		unifiedDao.insertItems(null,"cargoRehandling.updateShpgNoteItemsForUpdate", updateItems);
    		setVersion(updateItems);			
    		return updateItems;
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
    }
	
	@Override
    public DataItemList updateGrForUpdate(UpdateItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList updateItems = parm.getUpdateItems();
    		setNewVersion(updateItems);	
    		unifiedDao.insertItems(null,"cargoRehandling.updateGrForUpdate", updateItems);
    		setVersion(updateItems);			
    		return updateItems;
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
    }
	
	@Override
    public DataItemList updateShpgNoteAmtItemsForUpdate(UpdateItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList updateItems = parm.getUpdateItems();
    		setNewVersion(updateItems);	
    		unifiedDao.insertItems(null,"cargoRehandling.updateShpgNoteAmtItemsForUpdate", updateItems);
    		setVersion(updateItems);			
    		return updateItems;
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
    }
	
	@Override
    public DataItemList updateInvItemsForUpdateOrgVsl(UpdateItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList updateItems = parm.getUpdateItems();
    		setNewVersion(updateItems);	
    		unifiedDao.insertItems(null,"cargoRehandling.updateInvItemsForUpdateOrgVsl", updateItems);
    		setVersion(updateItems);			
    		return updateItems;
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
    }
	
	@Override
    public DataItemList updateInvItemsForUpdateNxVsl(UpdateItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList updateItems = parm.getUpdateItems();
    		setNewVersion(updateItems);	
    		unifiedDao.insertItems(null,"cargoRehandling.updateInvItemsForUpdateNxVsl", updateItems);
    		setVersion(updateItems);			
    		return updateItems;
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
    }
	
	@Override
    public DataItemList updateCgMstItemsForUpdate(UpdateItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList updateItems = parm.getUpdateItems();
    		setNewVersion(updateItems);	
    		unifiedDao.insertItems(null,"cargoRehandling.updateCgMstItemsForUpdate", updateItems);
    		setVersion(updateItems);			
    		return updateItems;
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
    }
	
	@Override
    public DataItemList updateJobItemsForUpdate(UpdateItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList updateItems = parm.getUpdateItems();
    		setNewVersion(updateItems);	
    		unifiedDao.insertItems(null,"cargoRehandling.updateJobItemsForUpdate", updateItems);
    		setVersion(updateItems);			
    		return updateItems;
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
    }
}
