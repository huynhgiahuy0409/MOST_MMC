package com.tsb.most.basebiz.dao.codes;


import com.tsb.most.basebiz.parm.codes.SearchBrandModelCodeParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;


public class BrandModelCodeDao extends BaseDao implements IBrandModelCodeDao{

	public DataItemList selectBrandCodeItems(SearchBrandModelCodeParm parm) throws DaoException {
		 return unifiedDao.getItemsPage("brandModelCode.selectBrandCodeItems", parm);
    }
    
	public DataItemList selectModelCodeItems(SearchBrandModelCodeParm parm) throws DaoException {
		return unifiedDao.getItemsPage("brandModelCode.selectModelCodeItems", parm);
    }
	
	public DataItemList brandCodeDuplicateCheck(SearchBrandModelCodeParm parm) throws DaoException{
		return unifiedDao.getItems("brandModelCode.brandCodeDuplicateCheck",parm);
	}
    
	public DataItemList brandCodeRemoveCheck(SearchBrandModelCodeParm parm) throws DaoException{
		return unifiedDao.getItems("brandModelCode.brandCodeRemoveCheck",parm);
	}
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException {
		DataItemList insertItems = parm.getInsertItems();
		setNewVersion(insertItems);	
		
		unifiedDao.insertItems(null,"brandModelCode.insertBrandCodeItem", insertItems);
		
		setVersion(insertItems);			
		
		return insertItems;
	}
	
	public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException {
		DataItemList updateItems = parm.getUpdateItems();
		setNewVersion(updateItems);
		
		unifiedDao.updateItemsWithTimeCheck(null,"brandModelCode.updateBrandCodeItem", updateItems);
		
		setVersion(updateItems);
		
		return updateItems;
	}
	
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException {
		DataItemList deleteItems = parm.getDeleteItems();
		setNewVersion(deleteItems);
		
		unifiedDao.deleteItemsWithTimeCheck(null,"brandModelCode.deleteBrandCodeItem", deleteItems);
		setVersion(deleteItems);
		
		return deleteItems;
	}
	
	
	
	public DataItemList modelCodeDuplicateCheck(SearchBrandModelCodeParm parm) throws DaoException{
		return unifiedDao.getItems("brandModelCode.modelCodeDuplicateCheck",parm);
	}
    
	public DataItemList insertModelCodeItems(InsertItemsBizParm parm) throws DaoException {
		DataItemList insertItems = parm.getInsertItems();
		setNewVersion(insertItems);	
		
		unifiedDao.insertItems(null,"brandModelCode.insertModelCodeItem", insertItems);
		
		setVersion(insertItems);			
		
		return insertItems;
	}
	
	public DataItemList updateModelCodeItems(UpdateItemsBizParm parm) throws DaoException {
		DataItemList updateItems = parm.getUpdateItems();
		setNewVersion(updateItems);
		
		unifiedDao.updateItemsWithTimeCheck(null,"brandModelCode.updateModelCodeItem", updateItems);
		
		setVersion(updateItems);
		
		return updateItems;
	}
	
	public DataItemList deleteModelCodeItems(DeleteItemsBizParm parm) throws DaoException {
		DataItemList deleteItems = parm.getDeleteItems();
		setNewVersion(deleteItems);
		
		unifiedDao.deleteItemsWithTimeCheck(null,"brandModelCode.deleteModelCodeItem", deleteItems);
		setVersion(deleteItems);
		
		return deleteItems;
	}
}
