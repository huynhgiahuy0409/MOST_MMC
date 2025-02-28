package com.tsb.most.basebiz.dao.configuration;

import com.tsb.most.basebiz.parm.configuration.SearchRosterConfigurationParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class RosterConfigurationDao extends BaseDao implements IRosterConfigurationDao {
    public DataItemList selectInternalStaffMngCheck(SearchRosterConfigurationParm parm) throws DaoException {
        return unifiedDao.getItems("rosterConfiguration.selectInternalStaffMngCheck", parm);
    }
    
    public DataItemList selectStaffInfoList(SearchRosterConfigurationParm parm) throws DaoException {
        return unifiedDao.getItemsPage("rosterConfiguration.selectStaffInfoList", parm);
    }

    public DataItemList selectInternalStaffMngUser(SearchRosterConfigurationParm parm) throws DaoException {
		return unifiedDao.getItems("rosterConfiguration.selectInternalStaffMngUser", parm);
	}
    
    public DataItemList selectInternalStaffMngLog(SearchRosterConfigurationParm parm) throws DaoException {
		return unifiedDao.getItems("rosterConfiguration.selectInternalStaffMngLog", parm);
	}
    
    public DataItemList selectGroupList(SearchRosterConfigurationParm parm) throws DaoException {
		return unifiedDao.getItems("rosterConfiguration.selectGroupList", parm);
	}
    
    public DataItemList insertInternalStaffMngItems(InsertItemsBizParm parm) throws DaoException {
    	try {
    		DataItemList itemList = parm.getInsertItems();
    		
    		setNewVersion(itemList);
    		unifiedDao.insertItems(null, "rosterConfiguration.insertInternalStaffMngItems", itemList);
    		setVersion(itemList);
    		
    		return itemList;
    	}catch (Exception e) {
    		throw new DaoException(e);
    	}
    }
    
    public DataItemList updateInternalStaffMngItems(UpdateItemsBizParm parm) throws DaoException {
    	try {
    		DataItemList itemList = parm.getUpdateItems();
    		
    		setNewVersion(itemList);
    		unifiedDao.updateItems(null, "rosterConfiguration.updateInternalStaffMngItems", itemList);
    		setVersion(itemList);
    		
    		return itemList;
    	}catch (Exception e) {
    		throw new DaoException(e);
    	}
    }
    
	public void deleteInternalStaffMngItems(DeleteItemsBizParm parm) throws DaoException {
		try {
			setNewVersion(parm.getDeleteItems());
			unifiedDao.updateItems(null, "rosterConfiguration.deleteInternalStaffMngItems", parm.getDeleteItems());
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

    public DataItemList insertInternalStaffMngRoleItems(InsertItemsBizParm parm) throws DaoException {
        try {
    		DataItemList itemList = parm.getInsertItems();
    		
    		setNewVersion(itemList);
    		unifiedDao.insertItems(null, "rosterConfiguration.insertInternalStaffMngRoleItems", itemList);
    		setVersion(itemList);
    		
    		return itemList;
    	}catch (Exception e) {
    		throw new DaoException(e);
    	}
    }

    public void deleteInternalStaffMngRoleItems(DeleteItemsBizParm parm) throws DaoException {
        try {
			setNewVersion(parm.getDeleteItems());
			unifiedDao.deleteItems(null, "rosterConfiguration.deleteInternalStaffMngRoleItems", parm.getDeleteItems());
		} catch (Exception e) {
			throw new DaoException(e);
		}
    }
    
    public DataItemList insertInternalStaffMngLogItems(InsertItemsBizParm parm) throws DaoException {
        try {
    		DataItemList itemList = parm.getInsertItems();
    		
    		setNewVersion(itemList);
    		unifiedDao.insertItems(null, "rosterConfiguration.insertInternalStaffMngLogItems", itemList);
    		setVersion(itemList);
    		
    		return itemList;
    	}catch (Exception e) {
    		throw new DaoException(e);
    	}
    }

    public DataItemList insertGroupRosterSetItems(InsertItemsBizParm parm) throws DaoException {
        try {
    		DataItemList itemList = parm.getInsertItems();
    		
    		setNewVersion(itemList);
    		unifiedDao.insertItems(null, "rosterConfiguration.insertGroupRosterSetItems", itemList);
    		setVersion(itemList);
    		
    		return itemList;
    	}catch (Exception e) {
    		throw new DaoException(e);
    	}
    }
    
    public void deleteInternalStaffMngLogItems(DeleteItemsBizParm parm) throws DaoException {
        try {
			setNewVersion(parm.getDeleteItems());
			unifiedDao.deleteItems(null, "rosterConfiguration.deleteInternalStaffMngLogItems", parm.getDeleteItems());
		} catch (Exception e) {
			throw new DaoException(e);
		}
    }
    
    public void deleteRosterSetupOthersItems(DeleteItemsBizParm parm) throws DaoException {
        try {
			setNewVersion(parm.getDeleteItems());
			unifiedDao.deleteItems(null, "rosterConfiguration.deleteRosterSetupOthersItems", parm.getDeleteItems());
		} catch (Exception e) {
			throw new DaoException(e);
		}
    }
    
    public void deleteRosterSetItems(DeleteItemsBizParm parm) throws DaoException {
        unifiedDao.deleteItems(null, "rosterConfiguration.deleteRosterSetItems", parm.getDeleteItems());
    }
    
    public void deleteUnavailableLogDepyItems(DeleteItemsBizParm parm) throws DaoException {
        try {
			setNewVersion(parm.getDeleteItems());
			unifiedDao.deleteItems(null, "rosterConfiguration.deleteUnavailableLogDepyItems", parm.getDeleteItems());
		} catch (Exception e) {
			throw new DaoException(e);
		}
    }
    public DataItemList selectGroupItem(SearchRosterConfigurationParm parm) throws DaoException {
    	try {
    		return unifiedDao.getItems("rosterConfiguration.selectGroupItem", parm);
	    }catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectShiftGroupListOnly(SearchRosterConfigurationParm parm) throws DaoException {
    	try {
    		return unifiedDao.getItems("rosterConfiguration.selectShiftGroupListOnly", parm);
	    }catch(Exception e){
			throw new DaoException(e);
		}
    }
    
	@Override
	public DataItemList insertShiftConfigurationItems(InsertItemsBizParm parm) throws DaoException {
		try{
			DataItemList insertItems = parm.getInsertItems();
			
			setNewVersion(insertItems);	
			unifiedDao.insertItems(null,"rosterConfiguration.insertShiftConfigurationItems", insertItems);
			setVersion(insertItems);			
			
			return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public DataItemList deleteShiftConfigurationItems(DeleteItemsBizParm parm) throws DaoException {
		try{
			DataItemList deleteItems = parm.getDeleteItems();
			
			setNewVersion(deleteItems);
			unifiedDao.updateItems(null,"rosterConfiguration.deleteShiftConfigurationItems", deleteItems);
			setVersion(deleteItems);
			
			return deleteItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList deleteDepyItems(DeleteItemsBizParm parm) throws DaoException {
		try{
			DataItemList deleteItems = parm.getDeleteItems();
			setNewVersion(deleteItems);
			
			unifiedDao.updateItems(null,"rosterConfiguration.deleteDepyItems", deleteItems);
			setVersion(deleteItems);
			
			return deleteItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	public DataItemList selectShiftDef(SearchRosterConfigurationParm parm) throws DaoException {
    	try {
    		return unifiedDao.getItems("rosterConfiguration.selectShiftDef", parm);
    	}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList selectShiftGroupDefShiftMegaList(SearchRosterConfigurationParm parm) throws DaoException {
		try {
			return unifiedDao.getItems("rosterConfiguration.selectShiftGroupDefShiftMegaList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
    
    public DataItemList selectGroupDef(SearchRosterConfigurationParm parm) throws DaoException {
    	try {
        	return unifiedDao.getItems("rosterConfiguration.selectGroupDef", parm);
	    }catch(Exception e){
			throw new DaoException(e);
		}
    }

	@Override
	public DataItemList insertShiftDefItems(InsertItemsBizParm parm) throws DaoException {
		try {
			DataItemList insertItems = parm.getInsertItems();
			
			setNewVersion(insertItems);	
			unifiedDao.insertItems(null,"rosterConfiguration.insertShiftDefItems", insertItems);
			setVersion(insertItems);			
			
			return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList updateShiftDefItems(UpdateItemsBizParm parm) throws DaoException {
		try {
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			
			unifiedDao.updateItems(null,"rosterConfiguration.updateShiftDefItems", updateItems);
			setVersion(updateItems);
			
			return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList deleteShiftDefItems(DeleteItemsBizParm parm) throws DaoException {
		try {
			DataItemList deleteItems = parm.getDeleteItems();
			setNewVersion(deleteItems);
			
			unifiedDao.updateItems(null,"rosterConfiguration.deleteShiftDefItems", deleteItems);
			setVersion(deleteItems);
			
			return deleteItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList insertShiftGroupItems(InsertItemsBizParm parm) throws DaoException {
		try {
			DataItemList insertItems = parm.getInsertItems();
			setNewVersion(insertItems);	
			
			unifiedDao.insertItems(null,"rosterConfiguration.insertShiftGroupItems", insertItems);
			setVersion(insertItems);			
			
			return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList updateShiftGroupItems(UpdateItemsBizParm parm) throws DaoException {
		try {
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			
			unifiedDao.updateItems(null,"rosterConfiguration.updateShiftGroupItems", updateItems);
			
			setVersion(updateItems);
			
			return updateItems;	
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList deleteGroupItems(DeleteItemsBizParm parm) throws DaoException {
		try {
			DataItemList deleteItems = parm.getDeleteItems();
			setNewVersion(deleteItems);
			
			unifiedDao.updateItems(null,"rosterConfiguration.deleteGroupItems", deleteItems);
			setVersion(deleteItems);
			
			return deleteItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList deleteStffGroupItems(DeleteItemsBizParm parm) throws DaoException {
		try {
			DataItemList deleteItems = parm.getDeleteItems();
			setNewVersion(deleteItems);
			unifiedDao.updateItems(null,"rosterConfiguration.deleteStffGroupItems", deleteItems);
			setVersion(deleteItems);
			
			return deleteItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public DataItemList deleteRstrGroupItems(DeleteItemsBizParm parm) throws DaoException {
		try {
			DataItemList deleteItems = parm.getDeleteItems();
			setNewVersion(deleteItems);
			unifiedDao.updateItems(null,"rosterConfiguration.deleteRstrGroupItems", deleteItems);
			setVersion(deleteItems);
			
			return deleteItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList checkGroupIsUsedOrNot(SearchRosterConfigurationParm parm) throws DaoException {
		return unifiedDao.getItems("rosterConfiguration.checkGroupIsUsedOrNot", parm);
	}

	 public DataItemList selectDeployedGroupStaffListOnly(SearchRosterConfigurationParm parm) throws DaoException {
	    	try {
	    		return unifiedDao.getItems("rosterConfiguration.selectDeployedGroupStaffListOnly", parm);
		    }catch(Exception e){
				throw new DaoException(e);
			}
	    }

	@Override
	public DataItemList getAllAssignedStaffByGroupCd(SearchRosterConfigurationParm parm) throws DaoException {
		return unifiedDao.getItems("rosterConfiguration.getAllAssignedStaffByGroupCd", parm);
	}
}
