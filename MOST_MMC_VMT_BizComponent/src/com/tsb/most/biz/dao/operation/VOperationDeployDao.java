package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchStaffAndDeploymentParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class VOperationDeployDao extends BaseDao implements IVOperationDeployDao {
    public DataItemList selectStaffDeployMentList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItemsPage("vOperationDeploy.selectStaffDeployMentList", parm);
    }
	
	public DataItemList selectStaffAdded(SearchStaffAndDeploymentParm parm) throws DaoException {
		 return unifiedDao.getItems("vOperationDeploy.selectStaffAdded", parm);
	}

    public DataItemList selectNonVesselDeployList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItemsPage("vOperationDeploy.selectNonVesselDeployList", parm);
    }
    
    public DataItemList selectSumMegaList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("vOperationDeploy.selectSumMegaList", parm);
    }
    
    public DataItemList selectSumMegaOprList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("vOperationDeploy.selectSumMegaOprList", parm);
    }
    
    public DataItemList selectSumMegaEquipmentList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("vOperationDeploy.selectSumMegaEquipmentList", parm);
    }

    public DataItemList selectSumMegaShipCrnList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("vOperationDeploy.selectSumMegaShipCrnList", parm);
    }

    public DataItemList selectSumMegaPortCrnList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("vOperationDeploy.selectSumMegaPortCrnList", parm);
    }
    
    public DataItemList selectSumMegaPortAndShipCrnList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("vOperationDeploy.selectSumMegaPortAndShipCrnList", parm);
    }
    
    public DataItemList selectSumMegaShoreCrnList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("vOperationDeploy.selectSumMegaShoreCrnList", parm);
    }
    
    public DataItemList selectGroupComboList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("vOperationDeploy.selectGroupComboList", parm);
    }

    public DataItemList selectRoleComboList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("vOperationDeploy.selectRoleComboList", parm);
    }
    
    public DataItemList selectRole4Other(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("vOperationDeploy.selectRole4Other", parm);
    }
    
    public DataItemList selectStStaffGroupList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("vOperationDeploy.selectStStaffGroupList", parm);
    }
    
    public DataItemList selectExStaffGroupList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("vOperationDeploy.selectExStaffGroupList", parm);
    }

    public DataItemList selectOtherStaffGroupList(SearchStaffAndDeploymentParm parm) throws DaoException {
    	return unifiedDao.getItems("vOperationDeploy.selectExStaffGroupList", parm);
    }
    
    public DataItemList selectNewStaff(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("vOperationDeploy.selecNewStaff", parm);
    }
    
    public DataItemList selectStStaffList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("vOperationDeploy.selectStStaffList", parm);
    }
    
    public DataItemList selectExStaffList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("vOperationDeploy.selectExStaffList", parm);
    }
    
    public DataItemList selectVOperationDeployRmkList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("vOperationDeploy.selectVOperationDeployRmk", parm);
    }

    public DataItemList selectVOperationDeployMPStaffList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("vOperationDeploy.selectVOperationDeployMPStaff", parm);
    }
    
    public DataItemList selectVOperationDeployEquipCapaList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("vOperationDeploy.selectVOperationDeployEquipCapa", parm);
    }
    
    public DataItemList selectVOperationDeployPortCrnList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("vOperationDeploy.selectVOperationDeployPortCrnList", parm);
    }
    
    public DataItemList selectVOperationDeployForkliftList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("vOperationDeploy.selectVOperationDeployForkliftList", parm);
    }
    
    public DataItemList selectVOperationDeployStvdList(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("vOperationDeploy.selectVOperationDeployStvdList", parm);
    }
    
    public DataItemList selectForkliftDeployListForVSR(SearchStaffAndDeploymentParm parm) throws DaoException {
        return unifiedDao.getItems("vOperationDeploy.selectForkliftDeployListForVSR", parm);
    }
    
    public DataItemList insertVOperationDeployItems(InsertItemsBizParm parm) throws DaoException {
		try{
    		DataItemList insertItems = parm.getInsertItems();
    		setNewVersion(insertItems);	
    		unifiedDao.insertItems(null,"vOperationDeploy.insertVOperationDeployItems", insertItems);
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
    		unifiedDao.updateItems(null,"vOperationDeploy.updateVOperationDeployItems", updateItems);
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
    		unifiedDao.deleteItems(null,"vOperationDeploy.deleteVOperationDeployItems", deleteItems);
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
    		unifiedDao.updateItems(null,"vOperationDeploy.updateStaffAttendanceSum", updateItems);
    		setVersion(updateItems);			
    		return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    
  //added by Vin - 20190326 - Staff and Equipment Deployment detail screen - Port Crane Tab
    public DataItemList selectVOperationDeployShipCraneEquipCapa(SearchStaffAndDeploymentParm parm) throws DaoException {
    	return unifiedDao.getItems("vOperationDeploy.selectVOperationDeployShipCraneEquipCapa", parm);
    }
    
    //added by Vin - 20180711 - Staff and Equipment Deployment detail screen 
    public DataItemList selectAllRoleComboList(SearchStaffAndDeploymentParm parm) throws DaoException {
    	return unifiedDao.getItems("vOperationDeploy.selectAllRoleComboList", parm);
    }
    
    public DataItemList checkValidation(SearchStaffAndDeploymentParm parm) throws DaoException{
    	return unifiedDao.getItems("vOperationDeploy.checkValidation", parm);
    }
}
