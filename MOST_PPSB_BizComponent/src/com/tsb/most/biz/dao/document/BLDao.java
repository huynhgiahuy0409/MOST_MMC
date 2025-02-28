package com.tsb.most.biz.dao.document;

import com.tsb.most.biz.parm.document.SearchBLParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
public class BLDao extends BaseDao implements IBLDao{
	public DataItemList selectBLList(SearchBLParm parm) throws DaoException{
		return unifiedDao.getItemsPage("bl.selectBLList", parm);
	}
	
	@Override
	public DataItemList checkBLOperation(SearchBLParm parm) throws DaoException {
		return unifiedDao.getItemsPage("bl.checkBLOperation", parm);
	}
	
	public DataItemList selectContainerList(SearchBLParm parm) throws DaoException{
		return unifiedDao.getItems("bl.selectContainerList", parm);
	}
	
	public DataItemList selectBLListForMf(SearchBLParm parm) throws DaoException{
		return unifiedDao.getItems("bl.selectBLListForMf", parm);
	}
	
	public DataItemList selectMfBLList(SearchBLParm parm) throws DaoException{
		return unifiedDao.getItems("bl.selectMfBLList", parm);
	}
	
	public DataItemList selectNewBLJobNo(SearchBLParm parm) throws DaoException{
		return unifiedDao.getItems("bl.selectNewBLJobNo", parm);
	}

	public DataItemList checkZB55(SearchBLParm parm) throws DaoException{
		return unifiedDao.getItems("bl.checkZB55", parm);
	}
	
	public DataItemList checkBLNo(SearchBLParm parm) throws DaoException{
		return unifiedDao.getItems("bl.checkBLNo", parm);
	}

	public DataItemList selectSplitWgtChk(SearchBLParm parm) throws DaoException{
		return unifiedDao.getItems("bl.selectSplitWgtChk", parm);
	}
	
	public DataItemList selectSplitWgt(SearchBLParm parm) throws DaoException{
		return unifiedDao.getItems("bl.selectSplitWgt", parm);
	}
	
	public DataItemList selectOriginalWgt(SearchBLParm parm) throws DaoException{
		return unifiedDao.getItems("bl.selectOriginalWgt", parm);
	}
	
	public DataItemList selectOriginalDOWgt(SearchBLParm parm) throws DaoException{
		return unifiedDao.getItems("bl.selectOriginalDOWgt", parm);
	}
	
	public DataItemList selectSplitExistChk(SearchBLParm parm) throws DaoException{
		return unifiedDao.getItems("bl.selectSplitExistChk", parm);
	}
	
	@Override
	public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException {
		try{
    		DataItemList insertItems = parm.getInsertItems();
    		setNewVersion(insertItems);	
    		unifiedDao.insertItems(null,"bl.insertDocBL", insertItems);
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
    		unifiedDao.updateItems(null,"bl.updateDocBL", updateItems);
    		setVersion(updateItems);			
    		return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public void deleteBlItems(DeleteItemsBizParm items) throws DaoException {
		try{
    		DataItemList  itemList = items.getDeleteItems();
			setNewVersion(itemList);
			unifiedDao.deleteItems(null, "bl.deleteBlItems", itemList);
			setVersion(itemList);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList selectRoRoItems(SearchBLParm parm) throws DaoException{
		return unifiedDao.getItems("bl.selectRoRoItems", parm);
	}
	
	@Override
	public DataItemList selectPackageItems(SearchBLParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("bl.selectPackageItems", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	@Override
	public DataItemList selectSplitPackageItems(SearchBLParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("bl.selectSplitPackageItems", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	@Override
	public void insertRoRoItems(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.insertItem(null ,"bl.insertRoRoItems", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public void insertPackageItems(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.insertItem(null ,"bl.insertPackageItems", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public void updatePackageItems(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.insertItem(null ,"bl.updatePackageItems", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public void updateSplitPackageItems(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.insertItem(null ,"bl.updateSplitPackageItems", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public void deleteRoRoItems(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.deleteItem(null ,"bl.deleteRoRoItems", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public void deletePackageItems(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.deleteItem(null ,"bl.deletePackageItems", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public void insertBlCargoDetailItems(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.insertItem(null ,"bl.insertBlCargoDetailItems", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public void deleteBlCargoDetailItems(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.deleteItem(null ,"bl.deleteBlCargoDetailItems", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public void insertManifestItems(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.insertItem(null ,"bl.insertManifestItems", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public void deleteManifest(DataItem item) throws DaoException {
		try{
			unifiedDao.deleteItem(null ,"bl.deleteManifest", item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public DataItemList selectBlCargoDetail(SearchBLParm parm) throws DaoException{
		return unifiedDao.getItems("bl.selectBlCargoDetail", parm);
	}
	
	@Override
	public DataItemList selectSubDoWeightList(SearchBLParm parm) throws DaoException{
		return unifiedDao.getItems("bl.selectSubDoWeightList", parm);
	}
	
	public DataItemList checkManifest(SearchBLParm parm) throws DaoException{
		return unifiedDao.getItems("bl.checkManifest", parm);
	}
	
	public DataItemList checkNilManifest(SearchBLParm parm) throws DaoException{
		return unifiedDao.getItems("bl.checkNilManifest", parm);
	}
	
	@Override
	public void updateManifest(DataItem item) throws DaoException {
		try{
			setNewVersion(item);	
    		unifiedDao.updateItems(null,"bl.updateManifest", item);
    		setVersion(item);			
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList checkDO(SearchBLParm parm) throws DaoException{
		return unifiedDao.getItems("bl.checkDO", parm);
	}
	
	public DataItemList checkTruck(SearchBLParm parm) throws DaoException{
		return unifiedDao.getItems("bl.checkTruck", parm);
	}
	
	public DataItemList checkOperation(SearchBLParm parm) throws DaoException{
		return unifiedDao.getItems("bl.checkOperation", parm);
	}
	
	public DataItemList checkGateIn(SearchBLParm parm) throws DaoException{
		return unifiedDao.getItems("bl.checkGateIn", parm);
	}
	
	@Override
	public DataItemList updateOriginalBlStatus(UpdateItemsBizParm parm) throws DaoException {
		try{
			DataItemList updateItems = parm.getUpdateItems();
			
			setNewVersion(updateItems);	
    		unifiedDao.updateItems(null,"bl.updateOriginalBlStatus", updateItems);
    		setVersion(updateItems);		
    		
    		return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public DataItemList updateOriginalBlWgt(UpdateItemsBizParm parm) throws DaoException {
		try{
			DataItemList updateItems = parm.getUpdateItems();
			
			setNewVersion(updateItems);	
    		unifiedDao.updateItems(null,"bl.updateOriginalBlWgt", updateItems);
    		setVersion(updateItems);		
    		
    		return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList updateBlStatus(UpdateItemsBizParm parm) throws DaoException {
		try{
			DataItemList updateItems = parm.getUpdateItems();
			
			setNewVersion(updateItems);	
    		unifiedDao.updateItems(null,"bl.updateBlStatus", updateItems);
    		setVersion(updateItems);		
    		
    		return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public DataItemList updateDoWgt(UpdateItemsBizParm parm) throws DaoException {
		try{
			DataItemList updateItems = parm.getUpdateItems();
			
			setNewVersion(updateItems);	
    		unifiedDao.updateItems(null,"bl.updateDoWgt", updateItems);
    		setVersion(updateItems);		
    		
    		return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

}
