package com.tsb.most.basebiz.dao.configuration;

import com.tsb.most.basebiz.parm.configuration.SearchEquipmentConfigurationParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class EquipmentConfigurationDao extends BaseDao implements IEquipmentConfigurationDao{
    
    public DataItemList selectEquipmentList(SearchEquipmentConfigurationParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItemsPage("equipmentConfiguration.selectEquipmentList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectCapacityComboList(SearchEquipmentConfigurationParm parm) throws DaoException  {
    	try{
    		return unifiedDao.getItems("equipmentConfiguration.selectCapacityComboList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    

    public DataItemList selectLocList(SearchEquipmentConfigurationParm parm) throws DaoException {
    	try{
    		 return unifiedDao.getItems("equipmentConfiguration.selectLocList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList insertItems = parm.getInsertItems();
    		
    		setNewVersion(insertItems);	
    		unifiedDao.insertItems(null,"equipmentConfiguration.insertEquipmentListItem", insertItems);
    		setVersion(insertItems);			
    		
    		return insertItems;
    		
		}catch(Exception e){
			throw new DaoException(e);
		}
    }  
    
    public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException {
    	try{
			DataItemList updateItems = parm.getUpdateItems();
			
			setNewVersion(updateItems);
			unifiedDao.updateItemsWithTimeCheck(null, "equipmentConfiguration.updateEquipmentListItem", updateItems);
			setVersion(updateItems);
			
			return updateItems;
		
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
    
    public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList deleteItems = parm.getDeleteItems();
			
			setNewVersion(deleteItems);
			unifiedDao.deleteItemsWithTimeCheck(null, "equipmentConfiguration.deleteEquipmentListItem", deleteItems);
			setVersion(deleteItems);
			
			return deleteItems;
		
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
}
