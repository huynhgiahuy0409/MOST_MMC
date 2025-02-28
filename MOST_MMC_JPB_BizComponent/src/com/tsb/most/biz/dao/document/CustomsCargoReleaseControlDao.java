package com.tsb.most.biz.dao.document;
import com.tsb.most.biz.parm.document.SearchCustomsCargoReleaseControlParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public class CustomsCargoReleaseControlDao extends BaseDao implements ICustomsCargoReleaseControlDao {
    
    public DataItemList selectCustomsCargoReleaseList(SearchCustomsCargoReleaseControlParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItemsPage("customsCargoReleaseControl.selectCustomsCargoReleaseList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectMasterBlItems(SearchCustomsCargoReleaseControlParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("customsCargoReleaseControl.selectMasterBlItems", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectBookingNoItems(SearchCustomsCargoReleaseControlParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("customsCargoReleaseControl.selectBookingNoItems", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectDocNoInfo(SearchCustomsCargoReleaseControlParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("customsCargoReleaseControl.selectDocumentInformation", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectBlSnItems(SearchCustomsCargoReleaseControlParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("customsCargoReleaseControl.selectBlSnItems", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    
    public DataItemList selectCustomsCargoReleaseHistory(SearchCustomsCargoReleaseControlParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("customsCargoReleaseControl.selectCustomsCargoReleaseHistory", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public void insertCustomsCargoReleaseItems(TxTraceInfo txTraceInfo, DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.insertItems(txTraceInfo,"customsCargoReleaseControl.insertCustomsCargoReleaseItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public void insertNewCustomsCargoReleaseItems(TxTraceInfo txTraceInfo, DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.insertItems(txTraceInfo,"customsCargoReleaseControl.insertNewCustomsCargoReleaseItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList insertCustomsItems(InsertItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList insertItems = parm.getInsertItems();
    		
    		setNewVersion(insertItems);	
    		unifiedDao.insertItems(null,"customsCargoReleaseControl.insertCustomsItems", insertItems);
    		setVersion(insertItems);			
    		
    		return insertItems;
    		
		}catch(Exception e){
			throw new DaoException(e);
		}
    }  
    
    public DataItemList updateCustomsItems(UpdateItemsBizParm parm) throws DaoException {
    	try{
			DataItemList updateItems = parm.getUpdateItems();
			
			setNewVersion(updateItems);
			unifiedDao.updateItemsWithTimeCheck(null, "customsCargoReleaseControl.updateCustomsItems", updateItems);
			setVersion(updateItems);
			
			return updateItems;
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
    
    public DataItemList deleteCustomsItems(DeleteItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList deleteItems = parm.getDeleteItems();
			
			setNewVersion(deleteItems);
			unifiedDao.deleteItemsWithTimeCheck(null, "customsCargoReleaseControl.deleteCustomsItems", deleteItems);
			setVersion(deleteItems);
			
			return deleteItems;
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }

	@Override
	public DataItemList selectCargoNoInfo(SearchCustomsCargoReleaseControlParm parm) throws DaoException {
		try{
    		return unifiedDao.getItems("customsCargoReleaseControl.selectCargoNoInfo", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
}
