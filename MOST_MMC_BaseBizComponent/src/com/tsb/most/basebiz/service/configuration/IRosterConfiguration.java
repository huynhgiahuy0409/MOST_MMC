package com.tsb.most.basebiz.service.configuration;

import com.tsb.most.basebiz.parm.configuration.SearchRosterConfigurationParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IRosterConfiguration{
	
	public DataItemList selectStaffInfoListOnly(SearchRosterConfigurationParm parm) throws BizException;
	public DataItemList selectInternalStaffMngUser(SearchRosterConfigurationParm parm) throws BizException;
	public DataItemList selectInternalStaffMngCheck(SearchRosterConfigurationParm parm) throws BizException;
	
	public DataItemList insertInternalStaffMngItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateInternalStaffMngItems(UpdateItemsBizParm parm) throws BizException;
	
	public DataItemList selectGroupList(SearchRosterConfigurationParm parm) throws BizException;
	public DataItemList selectInternalStaffMngLog(SearchRosterConfigurationParm parm) throws BizException;
	public DataItemList insertInternalStaffMngLogItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateInternalStaffMngLogItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteInternalStaffMngLogItems(DeleteItemsBizParm parm) throws BizException;
	public DataItemList selectShiftGroupListOnly(SearchRosterConfigurationParm parm) throws BizException;
	public void deleteShiftConfigurationItems(DeleteItemsBizParm parm) throws BizException;
	public void deleteInternalStaffMngItems(DeleteItemsBizParm parm) throws BizException;
	public DataItemList selectShiftDef(SearchRosterConfigurationParm parm) throws BizException ;
	public DataItemList selectGroupDef(SearchRosterConfigurationParm parm) throws BizException;
	
	public DataItemList insertShiftDefItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateShiftDefItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteShiftDefItems(DeleteItemsBizParm parm) throws BizException;
	public DataItemList insertShiftGroupItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateShiftGroupItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteShiftGroupItems(DeleteItemsBizParm parm) throws BizException;
	public DataItemList insertShiftGroupList(InsertItemsBizParm parm) throws BizException;
	public DataItemList deleteShiftGroupList(DeleteItemsBizParm parm) throws BizException;
	public DataItemList checkGroupIsUsedOrNot(SearchRosterConfigurationParm parm) throws BizException;
	public DataItemList selectDeployedGroupStaffListOnly(SearchRosterConfigurationParm parm) throws BizException;
	public DataItemList getAllAssignedStaffByGroupCd(SearchRosterConfigurationParm parm) throws BizException;
	
}
