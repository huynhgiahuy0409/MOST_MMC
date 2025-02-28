package com.tsb.most.biz.dao.document;

import com.tsb.most.biz.parm.document.SearchDGDeclarationParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;


public class DGDeclarationDao extends BaseDao implements IDGDeclarationDao{   
    public DataItemList getDGDeclarationItems(SearchDGDeclarationParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("DGDeclarationMap.selectDGDeclaration", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    } 
    
    public DataItemList getDgReport(SearchDGDeclarationParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("DGDeclarationMap.selectDGDeclarationReport", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    } 
    
    public DataItemList getSubstanceItems(SearchDGDeclarationParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("DGDeclarationMap.selectSubstance", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
    
    public DataItemList getVesselInfoItems(SearchDGDeclarationParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("DGDeclarationMap.selectDGVesselInfo", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
	public void insertDGDeclarationItems(InsertItemsBizParm item) throws DaoException {
		try{
			DataItemList insertItems = item.getInsertItems();
			setNewVersion(insertItems);
			unifiedDao.insertItems(null, "DGDeclarationMap.insertDGDeclarationItem", insertItems);
			setVersion(insertItems);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void insertDGStatus(InsertItemsBizParm item) throws DaoException {
		try{
			DataItemList insertItems = item.getInsertItems();
			setNewVersion(insertItems);
			unifiedDao.insertItems(null, "DGDeclarationMap.insertDGStatus", insertItems);
			setVersion(insertItems);
		}catch(Exception e){
			throw new DaoException(e);
		}
		
	}
    

	public void updateDGDeclarationItems(UpdateItemsBizParm items) throws DaoException {
		try {
			DataItemList itemList = items.getUpdateItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "DGDeclarationMap.updateDGDeclarationItem", itemList);
			unifiedDao.updateItems(null, "DGDeclarationMap.updateShippingNote", itemList);
			unifiedDao.updateItems(null, "DGDeclarationMap.updateCs2", itemList);
			setVersion(itemList);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}
    
	public void updateNewSnNoItems(UpdateItemsBizParm parm) throws DaoException {
		try {
			DataItemList items = parm.getUpdateItems();
			setNewVersion(items);
			unifiedDao.updateItems(null, "DGDeclarationMap.updateNewSnNoItem", items);
			setVersion(items);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

    public void deleteDGDeclarationItems(DeleteItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList itemList = parm.getDeleteItems();
			unifiedDao.updateItems(null, "DGDeclarationMap.deleteDGDeclarationItem", itemList);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList getDGDeclarationNoList(SearchDGDeclarationParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("DGDeclarationMap.selectDGDeclarationNoItem", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }  
    
    public DataItemList getDGforUpdateCNS(SearchDGDeclarationParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("DGDeclarationMap.selectDGforUpdateCNS", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    } 
    
	public void updateCnsforDG(UpdateItemsBizParm parm) throws DaoException {
		try {
			DataItemList itemList = parm.getUpdateItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "DGDeclarationMap.updateCnsforDG", itemList);
			setVersion(itemList);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}
}
