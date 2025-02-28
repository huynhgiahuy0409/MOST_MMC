package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchTheListOfDamageCheckOfROROParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class TheListOfDamageCheckOfRORODao extends BaseDao implements ITheListOfDamageCheckOfRORODao {
	
	public DataItemList selectBlComboBoxItems(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException {
		return unifiedDao.getItems("theListOfDamageCheckOfRORO.selectBlComboBoxItems", parm);
    }
	
	public DataItemList selectCategoryComboBoxItems(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException {
		return unifiedDao.getItems("theListOfDamageCheckOfRORO.selectCategoryComboBoxItems", parm);
    }
	
	public DataItemList selectShipgNoteNoComboBoxItems(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException {
        return unifiedDao.getItems("theListOfDamageCheckOfRORO.selectShipgNoteNoComboBoxItems", parm);
    }
	
	public DataItemList selectRoRoDamageCheckItems(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException {
		return unifiedDao.getItemsPage("theListOfDamageCheckOfRORO.selectRoRoDamageCheckItems", parm);
    }
	
	public DataItemList selectCargoPopupItems(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException {
		return unifiedDao.getItems("theListOfDamageCheckOfRORO.selectCargoPopupItems", parm);
    }
	
	public DataItemList selectUnitPopupItems(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException {
		return unifiedDao.getItems("theListOfDamageCheckOfRORO.selectUnitPopupItems", parm);
    }
	
	public DataItemList selectRoRoDmgDtlInvItems(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException {
		return unifiedDao.getItemsPage("theListOfDamageCheckOfRORO.selectRoRoDmgDtlInvItems", parm);
    }
	
	public DataItemList selectTheDamagePartItems(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException {
		return unifiedDao.getItems("theListOfDamageCheckOfRORO.selectTheDamagePartItems", parm);
    }
	
	public DataItemList selectTheDamageLevelItems(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException {
		return unifiedDao.getItems("theListOfDamageCheckOfRORO.selectTheDamageLevelItems", parm);
    }
	
	public DataItemList selectRoRoDmgDtlDmgItems(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException {
		return unifiedDao.getItemsPage("theListOfDamageCheckOfRORO.selectRoRoDmgDtlDmgItems", parm);
    }
	
	public DataItemList selectROROInventoryItems(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException {
		return unifiedDao.getItems("theListOfDamageCheckOfRORO.selectROROInventoryItems", parm);
    }
	
	public DataItemList updateCheckTimeItem(UpdateItemsBizParm items) throws DaoException {
		try{
			DataItemList itemList = items.getUpdateItems();
			setNewVersion(itemList);
    		unifiedDao.updateItems(null,"theListOfDamageCheckOfRORO.updateCheckTimeItem", itemList);
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
    		unifiedDao.updateItems(null,"theListOfDamageCheckOfRORO.updateRoRoDmgItem", itemList);
    		setVersion(itemList);
			return itemList;			
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList updateRoRoInvItem(UpdateItemsBizParm items) throws DaoException {
		try{
			DataItemList itemList = items.getUpdateItems();
			setNewVersion(itemList);	
    		unifiedDao.updateItems(null,"theListOfDamageCheckOfRORO.updateRoRoInvItem", itemList);
    		setVersion(itemList);
			return itemList;			
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList insertRoRoDmgItem(InsertItemsBizParm items) throws DaoException {
		try{
			DataItemList itemList = items.getInsertItems();
			setNewVersion(itemList);
    		unifiedDao.insertItems(null,"theListOfDamageCheckOfRORO.insertRoRoDmgItem", itemList);
    		setVersion(itemList);
			return itemList;		
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList deleteRoRoDmgItem(DeleteItemsBizParm items) throws DaoException{
    	try{
    		DataItemList itemList = items.getDeleteItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "theListOfDamageCheckOfRORO.deleteRoRoDmgItem", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	
	public DataItemList selectRoRoDamageCheckItemsHHT(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException {
		return unifiedDao.getItemsPage("theListOfDamageCheckOfRORO.selectRoRoDamageCheckItemsHHT", parm);
    }
	public DataItemList selectBlComboBoxItemsHHT(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException {
		return unifiedDao.getItems("theListOfDamageCheckOfRORO.selectBlComboBoxItemsHHT", parm);
    }
	public DataItemList selectShipgNoteNoComboBoxItemsHHT(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException {
        return unifiedDao.getItems("theListOfDamageCheckOfRORO.selectShipgNoteNoComboBoxItemsHHT", parm);
    }
	public DataItemList selectUnitPopupItemsHHT(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException {
		return unifiedDao.getItems("theListOfDamageCheckOfRORO.selectUnitPopupItemsHHT", parm);
    }
	public DataItemList selectBrandComboBoxItemsHHT(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException {
		return unifiedDao.getItems("theListOfDamageCheckOfRORO.selectBrandComboBoxItemsHHT", parm);
    }
	public DataItemList selectROROInventoryItemsHHT(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException {
		return unifiedDao.getItems("theListOfDamageCheckOfRORO.selectROROInventoryItemsHHT", parm);
    }
	public DataItemList selectRoRoDmgDtlInvItemsHHT(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException {
		return unifiedDao.getItemsPage("theListOfDamageCheckOfRORO.selectRoRoDmgDtlInvItemsHHT", parm);
    }
	public DataItemList updateRoRoInvItemHHT(UpdateItemsBizParm items) throws DaoException {
		try{
			DataItemList itemList = items.getUpdateItems();
			setNewVersion(itemList);	
    		unifiedDao.updateItems(null,"theListOfDamageCheckOfRORO.updateRoRoInvItemHHT", itemList);
    		setVersion(itemList);
			return itemList;			
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList insertRoRoInvItemHHT(InsertItemsBizParm items) throws DaoException {
		try{
			DataItemList itemList = items.getInsertItems();
			setNewVersion(itemList);	
    		unifiedDao.updateItems(null,"theListOfDamageCheckOfRORO.insertRoRoInvItemHHT", itemList);
    		setVersion(itemList);
			return itemList;			
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	
	public DataItemList insertRoRoDmgItemHHT(InsertItemsBizParm items) throws DaoException {
		try{
			DataItemList itemList = items.getInsertItems();
			setNewVersion(itemList);
    		unifiedDao.insertItems(null,"theListOfDamageCheckOfRORO.insertRoRoDmgItemHHT", itemList);
    		setVersion(itemList);
			return itemList;		
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList deleteRoRoDmgItemHHT(DeleteItemsBizParm items) throws DaoException{
    	try{
    		DataItemList itemList = items.getDeleteItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "theListOfDamageCheckOfRORO.deleteRoRoDmgItemHHT", itemList);
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
    		unifiedDao.updateItems(null,"theListOfDamageCheckOfRORO.updateCheckTimeItemHHT", itemList);
    		setVersion(itemList);
			return itemList;				
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
}
