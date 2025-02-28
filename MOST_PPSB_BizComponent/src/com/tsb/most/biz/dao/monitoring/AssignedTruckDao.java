package com.tsb.most.biz.dao.monitoring;


import com.tsb.most.biz.parm.monitoring.SearchAssignedTruckParm;
import com.tsb.most.biz.parm.monitoring.SearchAssignedTruckPivotParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class AssignedTruckDao extends BaseDao implements IAssignedTruckDao{
    
    public DataItemList selectLorryListItems(SearchAssignedTruckParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItemsPage("assignedTruck.selectLorryListItems", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectUnitNoList(SearchAssignedTruckParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("assignedTruck.selectUnitNoList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectUnitNoListForROROImport(SearchAssignedTruckParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("assignedTruck.selectUnitNoListForROROImport", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectUnitNoListForROROExport(SearchAssignedTruckParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("assignedTruck.selectUnitNoListForROROExport", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectLorryListPivotItems(SearchAssignedTruckPivotParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("assignedTruck.selectLorryListPivotItems", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
}
