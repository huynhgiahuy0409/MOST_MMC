package com.tsb.most.biz.service.planning;

import com.tsb.most.biz.parm.planning.SearchStaffAndDeploymentParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IStaffAndDeployment{
	public DataItemList selectStaffDeployMentList(SearchStaffAndDeploymentParm parm) throws BizException;
	public DataItemList selectStaffAdded(SearchStaffAndDeploymentParm parm) throws BizException;
	public DataItemList selectSumMegaList(SearchStaffAndDeploymentParm parm) throws BizException;
	public DataItemList selectVOperationDeployEquipCapaList(SearchStaffAndDeploymentParm parm) throws BizException;
	public DataItemList selectMegaSumOperatorList(SearchStaffAndDeploymentParm parm) throws BizException;
	public DataItemList selectVOperationDeployRmkList(SearchStaffAndDeploymentParm parm) throws BizException;
	public DataItemList selectSumMegaPortCraneList(SearchStaffAndDeploymentParm parm) throws BizException;
	public DataItemList selectSumMegaShipCraneList(SearchStaffAndDeploymentParm parm) throws BizException;
	public DataItemList selectVOperationDeployPortCraneList(SearchStaffAndDeploymentParm parm) throws BizException;
	public DataItemList selectMegaSumForkliftList(SearchStaffAndDeploymentParm parm) throws BizException;
	public DataItemList selectVOperationDeployForkliftList(SearchStaffAndDeploymentParm parm) throws BizException;
	public DataItemList selectVOperationDeployStvdList(SearchStaffAndDeploymentParm parm) throws BizException;
	public DataItemList selectSumMegaShoreCraneList(SearchStaffAndDeploymentParm parm) throws BizException;
	public DataItemList selectSumMegaPortAndShipCraneList(SearchStaffAndDeploymentParm parm) throws BizException;
	public DataItemList selectRoleOther(SearchStaffAndDeploymentParm parm) throws BizException;
	public DataItemList selectStandardStaffList(SearchStaffAndDeploymentParm parm) throws BizException;
	public DataItemList selectVOperationDeployShipCraneEquipCapa(SearchStaffAndDeploymentParm parm) throws BizException;
	public DataItemList selectOtherStaffGroupList(SearchStaffAndDeploymentParm parm) throws BizException;
	public DataItemList checkValidation(SearchStaffAndDeploymentParm parm) throws BizException;
	public DataItemList selectExtraList(SearchStaffAndDeploymentParm parm) throws BizException;
	public DataItemList selectExStaffGroupList(SearchStaffAndDeploymentParm parm) throws BizException;
	public DataItemList selectNewStaff(SearchStaffAndDeploymentParm parm) throws BizException;
	public DataItemList selectValidationCode(SearchStaffAndDeploymentParm parm) throws BizException;
	public DataItemList selectShipCraneList(SearchStaffAndDeploymentParm parm) throws BizException;
	
	public DataItemList selectStaffAndEquipmentDetail(SearchStaffAndDeploymentParm parm) throws BizException;
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException;
}
