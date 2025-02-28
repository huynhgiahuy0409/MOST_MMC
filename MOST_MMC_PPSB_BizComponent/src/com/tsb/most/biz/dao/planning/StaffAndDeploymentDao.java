package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchStaffAndDeploymentParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class StaffAndDeploymentDao extends BaseDao implements IStaffAndDeploymentDao {
    public DataItemList selectStaffDeployMentList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItemsPage("staffAndDeployment.selectStaffDeployMentList", parm);
    }
	
	public DataItemList selectStaffAdded(SearchStaffAndDeploymentParm parm) throws DaoException {
		 return unifiedDao.getItems("staffAndDeployment.selectStaffAdded", parm);
	}

    public DataItemList selectNonVesselDeployList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItemsPage("staffAndDeployment.selectNonVesselDeployList", parm);
    }
    
    public DataItemList selectSumMegaList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("staffAndDeployment.selectSumMegaList", parm);
    }
    
    public DataItemList selectMegaSumOperatorList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("staffAndDeployment.selectMegaSumOperatorList", parm);
    }
    
    public DataItemList selectSumMegaEquipmentList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("staffAndDeployment.selectSumMegaEquipmentList", parm);
    }

    public DataItemList selectSumMegaShipCraneList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("staffAndDeployment.selectSumMegaShipCraneList", parm);
    }

    public DataItemList selectSumMegaPortCraneList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("staffAndDeployment.selectSumMegaPortCraneList", parm);
    }
    
    public DataItemList selectSumMegaPortAndShipCraneList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("staffAndDeployment.selectSumMegaPortAndShipCraneList", parm);
    }
    
    public DataItemList selectSumMegaShoreCraneList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("staffAndDeployment.selectSumMegaShoreCraneList", parm);
    }
    
    public DataItemList selectGroupComboList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("staffAndDeployment.selectGroupComboList", parm);
    }

    public DataItemList selectRoleComboList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("staffAndDeployment.selectRoleComboList", parm);
    }
    
    public DataItemList selectRoleOther(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("staffAndDeployment.selectRoleOther", parm);
    }
    
    public DataItemList selectStStaffGroupList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("staffAndDeployment.selectStStaffGroupList", parm);
    }
    
    public DataItemList selectExStaffGroupList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("staffAndDeployment.selectExStaffGroupList", parm);
    }

    public DataItemList selectOtherStaffGroupList(SearchStaffAndDeploymentParm parm) throws DaoException {
    	return unifiedDao.getItems("staffAndDeployment.selectExStaffGroupList", parm);
    }
    
    public DataItemList selectNewStaff(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("staffAndDeployment.selecNewStaff", parm);
    }
    
    public DataItemList selectStandardStaffList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("staffAndDeployment.selectStandardStaffList", parm);
    }
    
    public DataItemList selectExtraList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("staffAndDeployment.selectExtraList", parm);
    }
    
    public DataItemList selectVOperationDeployRmkList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("staffAndDeployment.selectVOperationDeployRmkList", parm);
    }

    public DataItemList selectVOperationDeployMPStaffList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("staffAndDeployment.selectVOperationDeployMPStaff", parm);
    }
    
    public DataItemList selectVOperationDeployEquipCapaList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("staffAndDeployment.selectVOperationDeployEquipCapa", parm);
    }
    
    public DataItemList selectVOperationDeployPortCraneList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("staffAndDeployment.selectVOperationDeployPortCraneList", parm);
    }
    
    public DataItemList selectVOperationDeployForkliftList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("staffAndDeployment.selectVOperationDeployForkliftList", parm);
    }
    
    public DataItemList selectVOperationDeployStvdList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("staffAndDeployment.selectVOperationDeployStvdList", parm);
    }
    
    public DataItemList selectShipCraneList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("staffAndDeployment.selectShipCraneList", parm);
    }
    
    public DataItemList selectShiftDef(SearchStaffAndDeploymentParm parm) throws DaoException {
    	try {
    		return unifiedDao.getItems("staffAndDeployment.selectShiftDef", parm);
    	}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectValidationCode(SearchStaffAndDeploymentParm parm) throws DaoException{
        return unifiedDao.getItems("staffAndDeployment.selectValidationCode", parm);
    }
    
    public DataItemList insertVOperationDeployItems(InsertItemsBizParm parm) throws DaoException {
		try{
    		DataItemList insertItems = parm.getInsertItems();
    		
    		setNewVersion(insertItems);
    		unifiedDao.insertItems(null,"staffAndDeployment.insertVOperationDeployItems", insertItems);
    		setVersion(insertItems);
    		
    		return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList updateVOperationDeployItems(UpdateItemsBizParm parm) throws DaoException {
    	try{
			DataItemList updateItems = parm.getUpdateItems();
			
			setNewVersion(updateItems);	
    		unifiedDao.updateItems(null,"staffAndDeployment.updateVOperationDeployItems", updateItems);
    		setVersion(updateItems);
    		
    		return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList deleteVOperationDeployItems(DeleteItemsBizParm parm) throws DaoException {
        try{
        	DataItemList deleteItems = parm.getDeleteItems();
        	
        	setNewVersion(deleteItems);	
    		unifiedDao.deleteItems(null,"staffAndDeployment.deleteVOperationDeployItems", deleteItems);
    		setVersion(deleteItems);	
    		
    		return deleteItems;
        }catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList updateStaffAttendanceSum(UpdateItemsBizParm parm) throws DaoException {
    	try{
			DataItemList updateItems = parm.getUpdateItems();
			
			setNewVersion(updateItems);	
    		unifiedDao.updateItems(null,"staffAndDeployment.updateStaffAttendanceSum", updateItems);
    		setVersion(updateItems);
    		
    		return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectVOperationDeployShipCraneEquipCapa(SearchStaffAndDeploymentParm parm) throws DaoException {
    	return unifiedDao.getItems("staffAndDeployment.selectVOperationDeployShipCraneEquipCapa", parm);
    }
    
    public DataItemList selectAllRoleComboList(SearchStaffAndDeploymentParm parm) throws DaoException {
    	return unifiedDao.getItems("staffAndDeployment.selectAllRoleComboList", parm);
    }
    
    public DataItemList checkValidation(SearchStaffAndDeploymentParm parm) throws DaoException{
    	return unifiedDao.getItems("staffAndDeployment.checkValidation", parm);
    }
}
