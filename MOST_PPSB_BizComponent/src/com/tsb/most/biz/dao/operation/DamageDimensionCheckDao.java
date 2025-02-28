package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.dataitem.operation.DamageCheckItem;
import com.tsb.most.biz.dataitem.operation.DimensionCheckGCItem;
import com.tsb.most.biz.parm.operation.SearchDamageDimensionCheck;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class DamageDimensionCheckDao extends BaseDao implements IDamageDimensionCheckDao{

	@Override
	public DataItemList searchDamageCheck(SearchDamageDimensionCheck parm) throws DaoException {
		// TODO Auto-generated method stub
		return unifiedDao.getItemsPage("DamageDimensionCheck.searchDamageCheck", parm);
	}

	@Override
	public DataItemList searchDimensionCheck(SearchDamageDimensionCheck parm) throws DaoException {
		// TODO Auto-generated method stub
		return unifiedDao.getItemsPage("DamageDimensionCheck.searchDimensionCheck", parm);
	}

	@Override
	public DataItemList insertDamageCheck(InsertItemsBizParm parm) throws DaoException {
		// TODO Auto-generated method stub
		try{
    		DataItemList insertItems = parm.getInsertItems();
    		DataItemList groupItems = new DataItemList();
    		
    		setNewVersion(insertItems);	
    		DamageCheckItem coverItem = (DamageCheckItem)insertItems.getCollection().get(0);
    		for(int i = 0; i < coverItem.getItems().size(); i++) {
    			DamageCheckItem item = (DamageCheckItem)coverItem.getItems().get(i);
    			if(item.getJobNo() == null || item.getJobNo().equals("")) {
    				DataItemList list = unifiedDao.getItems("DamageDimensionCheck.selectJobNoDamageCheck", parm);
    	    		String jobNo = ((DamageCheckItem)list.getCollection().get(0)).getJobNo();
    	    		item.setJobNo(jobNo);
    			}
    			groupItems.add(item);
    		}
    		unifiedDao.insertItems(null,"DamageDimensionCheck.insertDamageCheck", groupItems);
    		setVersion(insertItems);			
    		
    		return insertItems;
    		
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList insertDimensionCheck(InsertItemsBizParm parm) throws DaoException {
		// TODO Auto-generated method stub
		try{
			DataItemList insertItems = parm.getInsertItems();
    		DimensionCheckGCItem item = (DimensionCheckGCItem) insertItems.getCollection().get(0);
    		if(item.getJobNo() == null || item.getJobNo().equals("")) {
				DataItemList list = unifiedDao.getItems("DamageDimensionCheck.selectJobNoDimensionCheck", parm);
	    		String jobNo = ((DimensionCheckGCItem)list.getCollection().get(0)).getJobNo();
	    		item.setJobNo(jobNo);
			}
    		setNewVersion(insertItems);	
    		unifiedDao.insertItems(null,"DamageDimensionCheck.insertDimensionCheck", insertItems);
    		setVersion(insertItems);			
    		
    		return insertItems;
    		
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList selectJobNoDamageCheck(InsertItemsBizParm parm) throws DaoException {
		// TODO Auto-generated method stub
		return unifiedDao.getItems("DamageDimensionCheck.selectJobNoDamageCheck", parm);
	}

	@Override
	public DataItemList selectJobNoDimensionCheck(InsertItemsBizParm parm) throws DaoException {
		// TODO Auto-generated method stub
		return unifiedDao.getItems("DamageDimensionCheck.selectJobNoDimensionCheck", parm);
	}	

	@Override
	public DataItemList updateDamageCheck(UpdateItemsBizParm parm) throws DaoException {
		// TODO Auto-generated method stub
		try{
			DataItemList updateItems = parm.getUpdateItems();
			
			DeleteItemsBizParm deleteParm = new DeleteItemsBizParm(); 
			deleteParm.setDeleteItems(parm.getUpdateItems());
			deleteDamageCheck(deleteParm);
			
			InsertItemsBizParm insertParm = new InsertItemsBizParm();
			insertParm.setInsertItems(parm.getUpdateItems());
			insertDamageCheck(insertParm);
			
			setNewVersion(updateItems);
			setVersion(updateItems);
			
			return updateItems;
		
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
	}

	@Override
	public DataItemList updateDimensionCheck(UpdateItemsBizParm parm) throws DaoException {
		// TODO Auto-generated method stub
		try{
			DataItemList updateItems = parm.getUpdateItems();
			
			DeleteItemsBizParm deleteParm = new DeleteItemsBizParm(); 
			deleteParm.setDeleteItems(parm.getUpdateItems());
			deleteDimensionCheck(deleteParm);
			
			InsertItemsBizParm insertParm = new InsertItemsBizParm();
			insertParm.setInsertItems(parm.getUpdateItems());
			insertDimensionCheck(insertParm);
			
			setNewVersion(updateItems);
			setVersion(updateItems);
			
			return updateItems;
		
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
	}

	@Override
	public DataItemList deleteDimensionCheck(DeleteItemsBizParm parm) throws DaoException {
		// TODO Auto-generated method stub
		try{
    		DataItemList deleteItems = parm.getDeleteItems();
			DimensionCheckGCItem item = (DimensionCheckGCItem) deleteItems.getCollection().get(0);
			setNewVersion(deleteItems);
			unifiedDao.deleteItem(null,"DamageDimensionCheck.deleteDimensionCheck", item);
			setVersion(deleteItems);
			
			return deleteItems;
		
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
	}

	@Override
	public DataItemList deleteDamageCheck(DeleteItemsBizParm parm) throws DaoException {
		// TODO Auto-generated method stub
		try{
    		DataItemList deleteItems = parm.getDeleteItems();
    		DamageCheckItem item = (DamageCheckItem)deleteItems.getCollection().get(0);
			setNewVersion(deleteItems);
			unifiedDao.deleteItem(null,"DamageDimensionCheck.deleteDamageCheck", item);
			setVersion(deleteItems);
			
			return deleteItems;
		
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
	}

	@Override
	public DataItemList searchDamageDimensionCheckJobNo(SearchDamageDimensionCheck parm) throws DaoException {
		// TODO Auto-generated method stub
		return unifiedDao.getItems("DamageDimensionCheck.searchDamageDimensionCheckJobNo", parm);
	}

	@Override
	public DataItemList searchDamageDimensionCheckBlSnNo(SearchDamageDimensionCheck parm) throws DaoException {
		return unifiedDao.getItems("DamageDimensionCheck.searchDamageDimensionCheckBlSnNo", parm);
	}

	@Override
	public DataItemList searchDamageDimensionCheckDoGrNo(SearchDamageDimensionCheck parm) throws DaoException {
		return unifiedDao.getItems("DamageDimensionCheck.searchDamageDimensionCheckDoGrNo", parm);
	}
}
