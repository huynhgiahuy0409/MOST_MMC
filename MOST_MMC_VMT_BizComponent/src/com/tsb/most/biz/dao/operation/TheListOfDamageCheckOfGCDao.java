package com.tsb.most.biz.dao.operation;

import java.util.List;

import com.tsb.most.biz.dataitem.operation.TheListOfDamageCheckOfGCItem;
import com.tsb.most.biz.parm.operation.SearchTheListOfDamageCheckOfGCParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class TheListOfDamageCheckOfGCDao extends BaseDao implements ITheListOfDamageCheckOfGCDao {
	
	public DataItemList selectBlComboBoxItems(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException {
		return unifiedDao.getItems("theListOfDamageCheckOfGC.selectBlComboBoxItems", parm);
    }
	
	public DataItemList selectCategoryComboBoxItems(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException {
		return unifiedDao.getItems("theListOfDamageCheckOfGC.selectCategoryComboBoxItems", parm);
    }
	
	public DataItemList selectShipgNoteNoComboBoxItems(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException {
        return unifiedDao.getItems("theListOfDamageCheckOfGC.selectShipgNoteNoComboBoxItems", parm);
    }
	
	public DataItemList selectGCDamageCheckItems(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException {
		return unifiedDao.getItemsPage("theListOfDamageCheckOfGC.selectGCDamageCheckItems", parm);
    }
	
	public DataItemList selectCargoPopupItems(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException {
		return unifiedDao.getItems("theListOfDamageCheckOfGC.selectCargoPopupItems", parm);
    }
	
	public DataItemList selectUnitPopupItems(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException {
		return unifiedDao.getItems("theListOfDamageCheckOfGC.selectUnitPopupItems", parm);
    }
	
	public DataItemList selectGCDmgDtlInvItems(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException {
		return unifiedDao.getItemsPage("theListOfDamageCheckOfGC.selectGCDmgDtlInvItems", parm);
    }
	
	public DataItemList selectTheDamagePartItems(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException {
		return unifiedDao.getItems("theListOfDamageCheckOfGC.selectTheDamagePartItems", parm);
    }
	
	public DataItemList selectTheDamageLevelItems(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException {
		return unifiedDao.getItems("theListOfDamageCheckOfGC.selectTheDamageLevelItems", parm);
    }
	
	public DataItemList selectGCDmgDtlDmgItems(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException {
		return unifiedDao.getItemsPage("theListOfDamageCheckOfGC.selectGCDmgDtlDmgItems", parm);
    }
	
	public DataItemList selectGCInventoryItems(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException {
		return unifiedDao.getItems("theListOfDamageCheckOfGC.selectGCInventoryItems", parm);
    }
	
	public DataItemList updateCheckTimeItem(UpdateItemsBizParm items) throws DaoException {
		try{
			DataItemList itemList = items.getUpdateItems();
			setNewVersion(itemList);
    		unifiedDao.updateItems(null,"theListOfDamageCheckOfGC.updateCheckTimeItem", itemList);
    		setVersion(itemList);
			return itemList;				
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList updateItems(UpdateItemsBizParm items) throws DaoException {
		try{
			DataItemList itemList = items.getUpdateItems();
			setNewVersion(itemList);	
    		unifiedDao.updateItems(null,"theListOfDamageCheckOfGC.updateGCDmgItem", itemList);
    		setVersion(itemList);
			return itemList;			
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList updateGCInvItem(UpdateItemsBizParm items) throws DaoException {
		try{
			DataItemList itemList = items.getUpdateItems();
			setNewVersion(itemList);	
    		unifiedDao.updateItems(null,"theListOfDamageCheckOfGC.updateGCInvItem", itemList);
    		setVersion(itemList);
			return itemList;			
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList insertGCDmgItem(InsertItemsBizParm items) throws DaoException {
		try{
			DataItemList itemList = items.getInsertItems();
			setNewVersion(itemList);
    		unifiedDao.insertItems(null,"theListOfDamageCheckOfGC.insertGCDmgItem", itemList);
    		setVersion(itemList);
			return itemList;		
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList deleteGCDmgItem(DeleteItemsBizParm items) throws DaoException{
    	try{
    		DataItemList itemList = items.getDeleteItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "theListOfDamageCheckOfGC.deleteGCDmgItem", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	
	public DataItemList selectGCDamageCheckItemsHHT(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException {
		return unifiedDao.getItemsPage("theListOfDamageCheckOfGC.selectGCDamageCheckItemsHHT", parm);
    }
	public DataItemList selectBlComboBoxItemsHHT(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException {
		return unifiedDao.getItems("theListOfDamageCheckOfGC.selectBlComboBoxItemsHHT", parm);
    }
	public DataItemList selectShipgNoteNoComboBoxItemsHHT(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException {
        return unifiedDao.getItems("theListOfDamageCheckOfGC.selectShipgNoteNoComboBoxItemsHHT", parm);
    }
	public DataItemList selectUnitPopupItemsHHT(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException {
		return unifiedDao.getItems("theListOfDamageCheckOfGC.selectUnitPopupItemsHHT", parm);
    }
	public DataItemList selectBrandComboBoxItemsHHT(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException {
		return unifiedDao.getItems("theListOfDamageCheckOfGC.selectBrandComboBoxItemsHHT", parm);
    }
	public DataItemList selectGCInventoryItemsHHT(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException {
		return unifiedDao.getItems("theListOfDamageCheckOfGC.selectGCInventoryItemsHHT", parm);
    }
	public DataItemList selectGCDmgDtlInvItemsHHT(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException {
		return unifiedDao.getItemsPage("theListOfDamageCheckOfGC.selectGCDmgDtlInvItemsHHT", parm);
    }
	public DataItemList updateGCInvItemHHT(UpdateItemsBizParm items) throws DaoException {
		try{
			DataItemList itemList = items.getUpdateItems();
			setNewVersion(itemList);	
    		unifiedDao.updateItems(null,"theListOfDamageCheckOfGC.updateGCInvItemHHT", itemList);
    		setVersion(itemList);
			return itemList;			
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList insertGCDmgItemHHT(InsertItemsBizParm items) throws DaoException {
		try{
			DataItemList itemList = items.getInsertItems();
			setNewVersion(itemList);
    		unifiedDao.insertItems(null,"theListOfDamageCheckOfGC.insertGCDmgItemHHT", itemList);
    		setVersion(itemList);
			return itemList;		
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList deleteGCDmgItemHHT(DeleteItemsBizParm items) throws DaoException{
    	try{
    		DataItemList itemList = items.getDeleteItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "theListOfDamageCheckOfGC.deleteGCDmgItemHHT", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList updateCheckTimeItemHHT(UpdateItemsBizParm items) throws DaoException {
		try{
			DataItemList itemList = items.getUpdateItems();
			setNewVersion(itemList);
    		unifiedDao.updateItems(null,"theListOfDamageCheckOfGC.updateCheckTimeItemHHT", itemList);
    		setVersion(itemList);
			return itemList;				
		}catch(Exception e){
			throw new DaoException(e);
		}
    }

	public DataItemList selectGCDimensionCheckItems(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException {
		return unifiedDao.getItemsPage("theListOfDamageCheckOfGC.selectGCDimensionCheckItems", parm);
	}

	@Override
	public DataItemList selectGCDimensionDtlDmgItems(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException {	
		return unifiedDao.getItemsPage("theListOfDamageCheckOfGC.selectGCDimensionDtlDmgItems", parm);
	}

	
	public DataItemList deleteGCDimensionItem(DeleteItemsBizParm items) throws DaoException {		
		try{
    		DataItemList itemList = items.getDeleteItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "theListOfDamageCheckOfGC.deleteGCDimensionItem", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	
	/* HHT */
	public DataItemList selectTblDamageCheckItems(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException {
		return unifiedDao.getItemsPage("theListOfDamageCheckOfGC.selectTblDamageCheckItems", parm);
	}
	
	public DataItemList selectTblMfDocId(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException {
        return unifiedDao.getItems("theListOfDamageCheckOfGC.selectTblMfDocId", parm);
    }
	
	public DataItemList selectTblBLComboItems(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException {
		return unifiedDao.getItems("theListOfDamageCheckOfGC.selectTblBlCombo", parm);
    }
	
	public DataItemList selectTblShipgNoteNoComboItems(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException {
        return unifiedDao.getItems("theListOfDamageCheckOfGC.selectTblSnCombo", parm);
    }
	
	public DataItemList selectTblDamageCheckDetailItems(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException {
        return unifiedDao.getItems("theListOfDamageCheckOfGC.selectTblDamageCheckDetailItems", parm);
    }
	
	public DataItemList deleteTblDamageCheckList(DeleteItemsBizParm parm) throws DaoException{
		try{
    		DataItemList itemList = parm.getDeleteItems();
			setNewVersion(itemList);
			unifiedDao.deleteItems(null, "theListOfDamageCheckOfGC.deleteTblDamageCheckList", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList insertTblDamageCheckDetailItems(InsertItemsBizParm parm) throws DaoException {
		try{
			DataItemList itemList = parm.getInsertItems();
			setNewVersion(itemList);
    		unifiedDao.insertItems(null,"theListOfDamageCheckOfGC.insertTblDamageCheckDetailItems", itemList);
    		setVersion(itemList);
			return itemList;		
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList deleteTblDamageCheckDetailItems(DeleteItemsBizParm parm) throws DaoException {
		try{
    		DataItemList itemList = parm.getDeleteItems();
			setNewVersion(itemList);
			unifiedDao.deleteItems(null, "theListOfDamageCheckOfGC.deleteTblDamageCheckDetailItems", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList updateTblDamageCheckDetailItems(UpdateItemsBizParm parm) throws DaoException {
		try{
			DataItemList itemList = parm.getUpdateItems();
			setNewVersion(itemList);
    		unifiedDao.updateItems(null,"theListOfDamageCheckOfGC.updateTblDamageCheckDetailItems", itemList);
    		setVersion(itemList);
			return itemList;				
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public DataItemList selectTheDamageDesc(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException {
		return unifiedDao.getItems("theListOfDamageCheckOfGC.selectTheDamageDesc", parm);
	}
	
	@Override
	public DataItemList selectJobNoDamageCheck(TheListOfDamageCheckOfGCItem parm) throws DaoException {
		// TODO Auto-generated method stub
		return unifiedDao.getItems("theListOfDamageCheckOfGC.selectJobNoDamageCheck", parm);
	}
	
	@Override
	public void insertDamageCheck(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.insertItems(null, "theListOfDamageCheckOfGC.insertDamageCheck", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public void updateDamageCheck(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.updateItems(null,  "theListOfDamageCheckOfGC.updateDamageCheck", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public void deleteDamageCheck(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.deleteItems(null,  "theListOfDamageCheckOfGC.deleteDamageCheck", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
	}
	
	@Override
	public void deleteUploadFiles(DeleteItemsBizParm parm) throws DaoException {
		// TODO Auto-generated method stub
		try{
    		DataItemList deleteItems = parm.getDeleteItems();
    		TheListOfDamageCheckOfGCItem item = (TheListOfDamageCheckOfGCItem) deleteItems.getCollection().get(0);
			setNewVersion(deleteItems);
			unifiedDao.deleteItem(null,"theListOfDamageCheckOfGC.deleteUploadFiles", item);
			setVersion(deleteItems);
		
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
	}

	@Override
	public DataItemList searchDamageCheck(SearchTheListOfDamageCheckOfGCParm parm) {
		// TODO Auto-generated method stub
		return unifiedDao.getItemsPage("theListOfDamageCheckOfGC.searchDamageCheck", parm);
	}

	@Override
	public DataItemList selectUniqueJobNoDamageCheck(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException {
		// TODO Auto-generated method stub
		return unifiedDao.getItems("theListOfDamageCheckOfGC.selectUniqueJobNoDamageCheck", parm);
	}

	
}
