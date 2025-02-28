package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.dataitem.operation.DimensionCheckItem;
import com.tsb.most.biz.parm.operation.SearchDimensionCheckParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class DimensionCheckDao extends BaseDao implements IDimensionCheckDao{

	@Override
	public DataItemList selectDimensionCheck(SearchDimensionCheckParm parm) throws DaoException {
		// TODO Auto-generated method stub
		return unifiedDao.getItemsPage("dimensionCheck.selectDimensionCheck", parm);
	}

	@Override
	public DataItemList insertDimensionCheck(InsertItemsBizParm parm) throws DaoException {
		// TODO Auto-generated method stub
		try{
			DataItemList insertItems = parm.getInsertItems();
    		DimensionCheckItem item = (DimensionCheckItem) insertItems.getCollection().get(0);
    		if(item.getJobNo() == null || item.getJobNo().equals("")) {
				DataItemList list = unifiedDao.getItems("dimensionCheck.selectJobNoDimensionCheck", parm);
	    		String jobNo = ((DimensionCheckItem)list.getCollection().get(0)).getJobNo();
	    		item.setJobNo(jobNo);
			}
    		setNewVersion(insertItems);	
    		unifiedDao.insertItems(null,"dimensionCheck.insertDimensionCheck", insertItems);
    		setVersion(insertItems);			
    		
    		return insertItems;
    		
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList selectJobNoDimensionCheck(InsertItemsBizParm parm) throws DaoException {
		// TODO Auto-generated method stub
		return unifiedDao.getItems("dimensionCheck.selectJobNoDimensionCheck", parm);
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
    		DimensionCheckItem item = (DimensionCheckItem) deleteItems.getCollection().get(0);
			setNewVersion(deleteItems);
			unifiedDao.deleteItem(null,"dimensionCheck.deleteDimensionCheck", item);
			setVersion(deleteItems);
			
			return deleteItems;
		
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
	}

	@Override
	public DataItemList selectBlSnNo(SearchDimensionCheckParm parm) throws DaoException {
		return unifiedDao.getItems("dimensionCheck.selectBlSnNo", parm);
	}

	@Override
	public DataItemList selectDoGrNo(SearchDimensionCheckParm parm) throws DaoException {
		return unifiedDao.getItems("dimensionCheck.selectDoGrNo", parm);
	}
}
