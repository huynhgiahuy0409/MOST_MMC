package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.dataitem.planning.VOperationDeployItem;
import com.tsb.most.biz.parm.planning.SearchStaffAndDeploymentParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public interface IVOperationDeployDao {
    public DataItemList selectStaffDeployMentList(SearchStaffAndDeploymentParm parm) throws DaoException;
    public DataItemList selectStaffAdded(SearchStaffAndDeploymentParm parm) throws DaoException;
    public DataItemList selectNonVesselDeployList(SearchStaffAndDeploymentParm parm) throws DaoException;
    public DataItemList selectSumMegaList(SearchStaffAndDeploymentParm parm) throws DaoException;
    public DataItemList selectSumMegaOprList(SearchStaffAndDeploymentParm parm) throws DaoException;
    public DataItemList selectSumMegaEquipmentList(SearchStaffAndDeploymentParm parm) throws DaoException;
    public DataItemList selectSumMegaShipCrnList(SearchStaffAndDeploymentParm parm) throws DaoException;
    public DataItemList selectSumMegaPortCrnList(SearchStaffAndDeploymentParm parm) throws DaoException;
    public DataItemList selectGroupComboList(SearchStaffAndDeploymentParm parm) throws DaoException;
    public DataItemList selectRoleComboList(SearchStaffAndDeploymentParm parm) throws DaoException;
    public DataItemList selectRole4Other (SearchStaffAndDeploymentParm parm) throws DaoException;
    public DataItemList selectStStaffGroupList(SearchStaffAndDeploymentParm parm) throws DaoException;
    public DataItemList selectOtherStaffGroupList(SearchStaffAndDeploymentParm parm) throws DaoException;
    public DataItemList selectExStaffGroupList(SearchStaffAndDeploymentParm parm) throws DaoException;
    public DataItemList selectStStaffList(SearchStaffAndDeploymentParm parm) throws DaoException;
    public DataItemList selectNewStaff(SearchStaffAndDeploymentParm parm) throws DaoException;
    public DataItemList selectExStaffList(SearchStaffAndDeploymentParm parm) throws DaoException;
    public DataItemList selectVOperationDeployRmkList(SearchStaffAndDeploymentParm parm) throws DaoException;
    public DataItemList selectVOperationDeployMPStaffList(SearchStaffAndDeploymentParm parm) throws DaoException;
    public DataItemList selectVOperationDeployEquipCapaList(SearchStaffAndDeploymentParm parm) throws DaoException;
    public DataItemList selectVOperationDeployPortCrnList(SearchStaffAndDeploymentParm parm) throws DaoException;
    public DataItemList selectVOperationDeployForkliftList(SearchStaffAndDeploymentParm parm) throws DaoException;
    public DataItemList selectVOperationDeployStvdList(SearchStaffAndDeploymentParm parm) throws DaoException;
    public DataItemList insertVOperationDeployItems(InsertItemsBizParm parm) throws DaoException;
    public DataItemList updateVOperationDeployItems(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList deleteVOperationDeployItems(DeleteItemsBizParm parm) throws DaoException;
    public DataItemList updateStaffAttendanceSum(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList selectVOperationDeployShipCraneEquipCapa(SearchStaffAndDeploymentParm parm) throws DaoException;
    public DataItemList selectAllRoleComboList(SearchStaffAndDeploymentParm parm) throws DaoException; //added by Vin - 20180711 - Staff and Equipment Deployment detail screen
    public DataItemList checkValidation(SearchStaffAndDeploymentParm parm) throws DaoException;
    public DataItemList selectForkliftDeployListForVSR(SearchStaffAndDeploymentParm parm) throws DaoException;
    
    public DataItemList selectSumMegaPortAndShipCrnList(SearchStaffAndDeploymentParm parm) throws DaoException;
    public DataItemList selectSumMegaShoreCrnList(SearchStaffAndDeploymentParm parm) throws DaoException;
}