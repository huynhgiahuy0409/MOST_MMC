package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.dataitem.planning.NonManifestedCargoOfGcItem;
import com.tsb.most.biz.parm.planning.SearchNonManifestedCargoOfGcParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class NonManifestedCargoOfGcDao extends BaseDao implements INonManifestedCargoOfGcDao {
 
    public DataItemList selectNonManifestedCargoOfGcList(SearchNonManifestedCargoOfGcParm parm) throws DaoException {
        return unifiedDao.getItemsPage("nonManifestedCargoOfGc.selectNonManifestedGeneralCargoItems", parm);
    }
    
    public DataItemList selectBlItems(SearchNonManifestedCargoOfGcParm parm) throws DaoException {
        return unifiedDao.getItemsPage("nonManifestedCargoOfGc.selectBlComboBoxItem", parm);
    }
    
    public DataItemList selectSnItems(SearchNonManifestedCargoOfGcParm parm) throws DaoException {
        return unifiedDao.getItemsPage("nonManifestedCargoOfGc.selectSnComboBoxItem", parm);
    }
    
    public DataItemList selectCargoJobItems(SearchNonManifestedCargoOfGcParm parm) throws DaoException {
        return unifiedDao.getItemsPage("nonManifestedCargoOfGc.selectCargoJobItems", parm);
    }
    
    public DataItemList selectOrgBlComboBoxItem(SearchNonManifestedCargoOfGcParm parm) throws DaoException {
        return unifiedDao.getItemsPage("nonManifestedCargoOfGc.selectOrgBlComboBoxItem", parm);
    }
    
	public String selectJobGroupNo(SearchNonManifestedCargoOfGcParm parm) throws DaoException {
    	try{
        	return (String)unifiedDao.readOne("nonManifestedCargoOfGc.selectJobGroupNo", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
	public boolean selectIsCargoMst(SearchNonManifestedCargoOfGcParm parm) throws DaoException {
    	try{
    		String rtnValue = (String)unifiedDao.readOne("nonManifestedCargoOfGc.selectIsCargoMst", parm);
            
            if(rtnValue != null && rtnValue.equals("1")){
                return true;
            }else{
                return false;
            }
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
    public void updateNonManifestedGcCargoJobItem(NonManifestedCargoOfGcItem item) throws DaoException {
    	try{
    		setNewVersion(item);
    		unifiedDao.updateItem(null, "nonManifestedCargoOfGc.updateNonManifestedGcJobItem", item);
			setVersion(item);
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
    
    public void updateNonManifestedGcInventoryLocItem(NonManifestedCargoOfGcItem item) throws DaoException {
    	try{
			
    		setNewVersion(item);
			unifiedDao.updateItem(null, "nonManifestedCargoOfGc.updateNonManifestedGcInventoryLocItem", item);
			setVersion(item);
			
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
    
    public void deleteNonManifestedGcInventoryLocItem(NonManifestedCargoOfGcItem item) throws DaoException {
    	try{
			
    		setNewVersion(item);
			unifiedDao.deleteItem(null, "nonManifestedCargoOfGc.deleteNonManifestedGcInventoryLocItem", item);
			setVersion(item);
			
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
    
    public void deleteNonManifestedGccargoJobItem(NonManifestedCargoOfGcItem item) throws DaoException {
    	try{
			
    		setNewVersion(item);
			unifiedDao.deleteItem(null, "nonManifestedCargoOfGc.deleteNonManifestedGccargoJobItem", item);
			setVersion(item);
			
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
    
    public void insertNonManifestedGcInventoryLocItem(NonManifestedCargoOfGcItem item) throws DaoException {
    	try{
			
    		setNewVersion(item);
			unifiedDao.insertItem(null, "nonManifestedCargoOfGc.insertNonManifestedGcInvLocationItems", item);
			setVersion(item);
			
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
    
    public void updateNonManifestedGcCargoMstItem(NonManifestedCargoOfGcItem item) throws DaoException {
    	try{
			
    		setNewVersion(item);
			unifiedDao.updateItem(null, "nonManifestedCargoOfGc.updateNonManifestedGcCargoMasterItem", item);
			setVersion(item);
			
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
    
    public void insertNonManifestedGcCargoMstItem(NonManifestedCargoOfGcItem item) throws DaoException {
    	try{
			
    		setNewVersion(item);
			unifiedDao.insertItem(null, "nonManifestedCargoOfGc.insertNonManifesedGcCargoMasterItems", item);
			setVersion(item);
			
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
    
    public void updateNonManifestedGcCargoMstAmountItem(DataItemList items) throws DaoException {
    	try{
			
    		setNewVersion(items);
			unifiedDao.updateItems(null, "nonManifestedCargoOfGc.updateCargoMasterProcedure", items);
			setVersion(items);
			
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
    
    public void insertNonManifestedGcCargoJobItem(NonManifestedCargoOfGcItem item) throws DaoException {
    	try{
			
    		setNewVersion(item);
			unifiedDao.insertItem(null, "nonManifestedCargoOfGc.insertNonManifestedGcJobItems", item);
			setVersion(item);
			
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
    
    public DataItemList isDeleteValidation(SearchNonManifestedCargoOfGcParm parm)throws DaoException{
    	DataItemList lst = unifiedDao.getItems("nonManifestedCargoOfGc.isDeleteValidation",parm);
    	
    	return lst;
	}

	@Override
	public void insertNonManifestRegister(InsertItemsBizParm insertItem) throws DaoException {
		try{
			NonManifestedCargoOfGcItem item = (NonManifestedCargoOfGcItem) insertItem.getInsertItems().get(0);
    		setNewVersion(item);
			unifiedDao.insertItem(null, "nonManifestedCargoOfGc.insertNonManifestedRegister", item);
			setVersion(item);
			
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
	}

	@Override
	public void updateNonManifestedGc(NonManifestedCargoOfGcItem item) throws DaoException {
		try{
    		setNewVersion(item);
			unifiedDao.updateItem(null, "nonManifestedCargoOfGc.updateNonManifestedGc", item);
			setVersion(item);
			
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
	}

	@Override
	public DataItemList selectShiftInfor(SearchNonManifestedCargoOfGcParm parm) throws DaoException {
		return unifiedDao.getItems("nonManifestedCargoOfGc.selectShiftInfor", parm);
	}

	@Override
	public void deleteNonManifestedGcCargoMasterItem(NonManifestedCargoOfGcItem jobItem) throws DaoException {
		try{
			setNewVersion(jobItem);
			unifiedDao.deleteItem(null, "nonManifestedCargoOfGc.deleteNonManifestedGcCargoMasterItem", jobItem);
			setVersion(jobItem);
			
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
	}
}
