package com.tsb.most.basebiz.dao.configuration;

import com.tsb.most.basebiz.parm.configuration.SearchRosterConfigurationParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IRosterConfigurationDao {
    public DataItemList selectInternalStaffMngCheck(SearchRosterConfigurationParm parm) throws DaoException;
    public DataItemList selectStaffInfoList(SearchRosterConfigurationParm parm) throws DaoException;
    public DataItemList selectInternalStaffMngUser(SearchRosterConfigurationParm parm) throws DaoException;
    public DataItemList selectInternalStaffMngLog(SearchRosterConfigurationParm parm) throws DaoException;
    public DataItemList selectShiftDef(SearchRosterConfigurationParm parm) throws DaoException;
    public DataItemList selectShiftGroupListOnly(SearchRosterConfigurationParm parm) throws DaoException;
    public DataItemList selectGroupList(SearchRosterConfigurationParm parm) throws DaoException;
    public DataItemList selectGroupDef(SearchRosterConfigurationParm parm) throws DaoException;
    public DataItemList selectGroupItem(SearchRosterConfigurationParm parm) throws DaoException;
    
    public DataItemList insertInternalStaffMngItems(InsertItemsBizParm parm) throws DaoException;
    public DataItemList insertInternalStaffMngRoleItems(InsertItemsBizParm parm) throws DaoException ;
    public DataItemList insertInternalStaffMngLogItems(InsertItemsBizParm parm) throws DaoException;
    public DataItemList insertShiftConfigurationItems(InsertItemsBizParm parm) throws DaoException;
    public DataItemList insertShiftDefItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList insertShiftGroupItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList insertGroupRosterSetItems(InsertItemsBizParm parm) throws DaoException;

	public DataItemList updateInternalStaffMngItems(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList updateShiftDefItems(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList updateShiftGroupItems(UpdateItemsBizParm parm) throws DaoException;
	
	public DataItemList deleteShiftDefItems(DeleteItemsBizParm parm) throws DaoException;
	public DataItemList deleteShiftConfigurationItems(DeleteItemsBizParm parm) throws DaoException;
	public DataItemList deleteDepyItems(DeleteItemsBizParm parm) throws DaoException;
	public DataItemList deleteStffGroupItems(DeleteItemsBizParm parm) throws DaoException;
	public DataItemList deleteGroupItems(DeleteItemsBizParm parm) throws DaoException;
	public DataItemList deleteRstrGroupItems(DeleteItemsBizParm parm) throws DaoException;
	public void deleteInternalStaffMngItems(DeleteItemsBizParm parm) throws DaoException;
	public void deleteInternalStaffMngRoleItems(DeleteItemsBizParm parm) throws DaoException ;
	public void deleteInternalStaffMngLogItems(DeleteItemsBizParm parm) throws DaoException;
	public void deleteRosterSetupOthersItems(DeleteItemsBizParm parm) throws DaoException;
	public void deleteRosterSetItems(DeleteItemsBizParm parm) throws DaoException;
	public void deleteUnavailableLogDepyItems(DeleteItemsBizParm parm) throws DaoException;
	public DataItemList checkGroupIsUsedOrNot(SearchRosterConfigurationParm parm) throws DaoException;
	public DataItemList selectDeployedGroupStaffListOnly(SearchRosterConfigurationParm parm) throws DaoException;
	public DataItemList getAllAssignedStaffByGroupCd(SearchRosterConfigurationParm parm) throws DaoException;
	public DataItemList selectShiftGroupDefShiftMegaList(SearchRosterConfigurationParm parm) throws DaoException;
}
