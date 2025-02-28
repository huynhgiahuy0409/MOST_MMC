package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.dataitem.operation.DamageCheckItem;
import com.tsb.most.biz.parm.operation.SearchDamageCheckParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class DamageCheckDao extends BaseDao implements IDamageCheckDao{

	@Override
	public DataItemList selectDamageCheck(SearchDamageCheckParm parm) throws DaoException {
		// TODO Auto-generated method stub
		return unifiedDao.getItemsPage("damageCheck.selectDamageCheck", parm);
	}
	
	@Override
	public DataItemList selectBlSnNo(SearchDamageCheckParm parm) throws DaoException {
		return unifiedDao.getItems("damageCheck.selectBlSnNo", parm);
	}

	@Override
	public DataItemList selectDoGrNo(SearchDamageCheckParm parm) throws DaoException {
		return unifiedDao.getItems("damageCheck.selectDoGrNo", parm);
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
    				DataItemList list = unifiedDao.getItems("damageCheck.selectJobNoDamageCheck", parm);
    	    		String jobNo = ((DamageCheckItem)list.getCollection().get(0)).getJobNo();
    	    		item.setJobNo(jobNo);
    			}
    			groupItems.add(item);
    		}
    		unifiedDao.insertItems(null,"damageCheck.insertDamageCheck", groupItems);
    		setVersion(insertItems);			
    		
    		return insertItems;
    		
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList selectJobNoDamageCheck(InsertItemsBizParm parm) throws DaoException {
		// TODO Auto-generated method stub
		return unifiedDao.getItems("damageCheck.selectJobNoDamageCheck", parm);
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
	public DataItemList deleteDamageCheck(DeleteItemsBizParm parm) throws DaoException {
		// TODO Auto-generated method stub
		try{
    		DataItemList deleteItems = parm.getDeleteItems();
    		DamageCheckItem item = (DamageCheckItem)deleteItems.getCollection().get(0);
			setNewVersion(deleteItems);
			unifiedDao.deleteItem(null,"damageCheck.deleteDamageCheck", item);
			setVersion(deleteItems);
			
			return deleteItems;
		
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
	}
}
