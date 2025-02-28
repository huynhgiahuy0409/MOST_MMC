package com.tsb.most.biz.dao.operation;


import com.tsb.most.biz.parm.operation.SearchRehandlingOfGCParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class RehandlingOfGCDao extends BaseDao implements IRehandlingOfGCDao {

	public DataItemList selectCargoRehandlingList(SearchRehandlingOfGCParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItemsPage("rehandlingOfGC.selectCargoRehandlingList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList selectCargoRehandlingPopupList(SearchRehandlingOfGCParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("rehandlingOfGC.selectCargoRehandlingPopupList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList selectCargoRhdlBlSnCombo(SearchRehandlingOfGCParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("rehandlingOfGC.selectCargoRhdlBlSnCombo", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList selectCargoRhdlStorageSnCombo(SearchRehandlingOfGCParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("rehandlingOfGC.selectCargoRhdlStorageSnCombo", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList selectCargoRhdlOpBlSnCombo(SearchRehandlingOfGCParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("rehandlingOfGC.selectCargoRhdlOpBlSnCombo", parm);
		}catch(Exception e){
			throw new DaoException(e);
		} 
    }
	
	public DataItemList selectRhdlShippingNoteComboList(SearchRehandlingOfGCParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("rehandlingOfGC.selectRhdlShippingNoteComboList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
	
	public DataItemList selectRhdlGrNoComboList(SearchRehandlingOfGCParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("rehandlingOfGC.selectRhdlGrNoComboList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public String selectCargoRhdlGroupNo(SearchRehandlingOfGCParm parm) throws DaoException {
    	try{
    		return (String)unifiedDao.readOne("rehandlingOfGC.selectCargoRhdlGroupNo", parm);
		}catch(Exception e){
			throw new DaoException(e);
		} 	
    }
	
	public DataItemList insertCargoRehandlingItems(InsertItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList insertItems = parm.getInsertItems();
    		setNewVersion(insertItems);	
    		unifiedDao.insertItems(null,"rehandlingOfGC.insertCargoRehandlingItems", insertItems);
    		setVersion(insertItems);			
    		return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public void deleteCargoRehandlingItems(DeleteItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList deleteItems = parm.getDeleteItems();
    		unifiedDao.deleteItems(null,"rehandlingOfGC.deleteCargoRehandlingItems", deleteItems);
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
    }
}
