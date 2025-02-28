package com.tsb.most.biz.dao.document;

import com.tsb.most.biz.parm.document.SearchManifestParm;
import com.tsb.most.biz.parm.document.SearchShippingNoteParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class ShippingNoteDao extends BaseDao implements IShippingNoteDao {

    public DataItemList selectShippingNoteList(SearchShippingNoteParm parm) throws DaoException {
    	try{
    		DataItemList rtnList = null;
    		rtnList = unifiedDao.getItemsPage("shippingNote.selectShippingNoteList", parm); 
    		
            return rtnList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectShippingNoteDtlList(SearchShippingNoteParm parm) throws DaoException {
    	try{
            return unifiedDao.getItems("shippingNote.selectShippingNoteDtlList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectValidationCode(SearchShippingNoteParm parm) throws DaoException{
        return unifiedDao.getItems("shippingNote.selectValidationCode", parm);
    }
    
    public DataItemList selectShippingNoteComboList(SearchShippingNoteParm parm) throws DaoException {
    	try{
    		DataItemList rtnList = null;
    		
            if(parm.getSearchTypeCboSN()==null){
                rtnList = unifiedDao.getItems("shippingNote.selectShippingNoteComboList", parm);
            }
            else if(parm.getSearchTypeCboSN()!=null)
            {
                rtnList = unifiedDao.getItems("shippingNote.selectShippingNoteComboList2", parm);
            }
            
            return rtnList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectShippingNoteNoItems(SearchShippingNoteParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("shippingNote.selectShippingNoteNoItems", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectShippingNoteSumList(SearchShippingNoteParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("shippingNote.selectDetailSumItems", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectDGDeclarationItems(SearchShippingNoteParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("DGDeclarationMap.selectDGDeclaration", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    } 
    
    public DataItemList selectBlNoList(SearchShippingNoteParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("shippingNote.selectBlNoItems", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectCbrNoList(SearchShippingNoteParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("shippingNote.selectCbrNoList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectDgSeq(SearchShippingNoteParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("shippingNote.selectDgSeq", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }

    public DataItemList selectGateInList(SearchShippingNoteParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("shippingNote.selectGateInList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    } 
    
    public DataItemList selectManifestList(SearchManifestParm parm)throws DaoException{
    	try{
    		return unifiedDao.getItems("shippingNote.selectManifestList", parm);
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
    } 
    public DataItemList selectManifestComboList(SearchManifestParm parm)throws DaoException{
    	try{
    		return unifiedDao.getItems("shippingNote.selectManifestComboList", parm);
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
    } 
    
    public DataItemList selectPackageItems(SearchShippingNoteParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("shippingNote.selectPackageItems", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
	public DataItemList insertManifestItem(InsertItemsBizParm parm) throws DaoException{
		try{
			DataItemList itemList = parm.getInsertItems();
			
			setNewVersion(itemList);
			unifiedDao.insertItems(null, "shippingNote.insertManifestItem", itemList);
			setVersion(itemList);
			
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException{
		try{
			DataItemList itemList = parm.getInsertItems();
			
			setNewVersion(itemList);
			unifiedDao.insertItems(null, "shippingNote.insertShippingNoteItem", itemList);
			unifiedDao.insertItems(null, "shippingNote.insertShippingNoteAmtItems", itemList);
			setVersion(itemList);
			
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException{
		try{
			DataItemList itemList = parm.getUpdateItems();
			
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "shippingNote.updateShippingNoteItems", itemList);
			unifiedDao.updateItems(null, "shippingNote.updateShippingNoteAmtItems", itemList);
			setVersion(itemList);
			
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void deleteItems(DeleteItemsBizParm parm) throws DaoException{
		try{
			DataItemList itemList = parm.getDeleteItems();
			
			unifiedDao.deleteItems(null, "shippingNote.deleteShippingNoteDtlItems", itemList);
			unifiedDao.deleteItems(null, "shippingNote.deleteShippingNoteAmtItems", itemList);
			unifiedDao.deleteItems(null, "shippingNote.deleteShippingNoteItems", itemList);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList insertShippingNoteDtlItems(InsertItemsBizParm parm) throws DaoException {
		try{
			
			DataItemList itemList = parm.getInsertItems();
			setNewVersion(itemList);
			unifiedDao.insertItems(null, "shippingNote.insertShippingNoteDtlItem", itemList);
			setVersion(itemList);
			
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList updateShippingNoteDtlItems(UpdateItemsBizParm parm) throws DaoException {
		try{
			DataItemList itemList = parm.getUpdateItems();
			
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "shippingNote.updateSnNoDtlItems", itemList);
			setVersion(itemList);
			
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public void updateSnNoDtlItems(UpdateItemsBizParm parm) throws DaoException {
		try{
			DataItemList itemList = parm.getUpdateItems();
			
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "shippingNote.updateSnNoDtlItems", itemList);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public void deleteShippingNoteDtlItems(DeleteItemsBizParm parm) throws DaoException {
		try{
			DataItemList itemList = parm.getDeleteItems();
			
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "shippingNote.deleteShippingNoteDtlItems", itemList);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	@Override
	public void deleteManifestItem(DeleteItemsBizParm parm) throws DaoException {
		try{
			DataItemList itemList = parm.getDeleteItems();
			
			setNewVersion(itemList);
			unifiedDao.deleteItems(null, "shippingNote.deleteManifestItem", itemList);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public void updateShippingNoteAckItems(DataItemList items) throws DaoException {
		try {
			setNewVersion(items);
			unifiedDao.updateItems(null, "shippingNote.updateShippingNoteAckItems", items);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	@Override
	public void updateCgTpItems(DataItemList items) throws DaoException {
		try {
			setNewVersion(items);
			unifiedDao.updateItems(null, "shippingNote.updateCgTpItems", items);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}
	
	@Override
	public DataItemList selectRoRoItems(SearchShippingNoteParm parm) throws DaoException{
		return unifiedDao.getItems("shippingNote.selectRoRoItems", parm);
	}
	
	@Override
	public void insertRoRoItems(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.insertItem(null ,"shippingNote.insertRoRoItems", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public void insertPackageItems(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.insertItem(null ,"shippingNote.insertPackageItems", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public void deleteRoRoItems(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.deleteItem(null ,"shippingNote.deleteRoRoItems", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public void deletePackageItems(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.deleteItem(null ,"shippingNote.deletePackageItems", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public void updateShippingNoteAmountItems(DataItemList items) throws DaoException {
		try {
			setNewVersion(items);
			unifiedDao.updateItems(null, "shippingNote.updateShippingNoteAmountItems", items);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}
	
	public DataItemList selectExistsShipgNoteNo(SearchShippingNoteParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("shippingNote.selectExistsShipgNoteNo", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }

	@Override
	public void insertRoRoMSTItems(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.insertItem(null ,"shippingNote.insertRoRoMSTItems", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public void deleteRoRoMSTItems(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.deleteItem(null ,"shippingNote.deleteRoRoMSTItems", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public DataItemList insertTerminalHoldItems(InsertItemsBizParm parm) throws DaoException {
		try{
			
			DataItemList itemList = parm.getInsertItems();
			setNewVersion(itemList);
			unifiedDao.insertItems(null, "terminalHoldReleaseControl.insertTerminalHoldItem", itemList);
			setVersion(itemList);
			
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public void updConfirmLoadingStt(UpdateItemsBizParm parm) throws DaoException{
		try {
			DataItemList itemList = parm.getUpdateItems();
			
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "shippingNote.updateConfirmLoadingStatus", itemList);

		} catch(Exception e){
			throw new DaoException(e);
		}
	}
}
