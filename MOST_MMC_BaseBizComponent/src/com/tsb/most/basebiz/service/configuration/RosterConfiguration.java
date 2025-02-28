package com.tsb.most.basebiz.service.configuration;

import java.text.SimpleDateFormat;

import com.tsb.most.basebiz.dao.configuration.IRosterConfigurationDao;
import com.tsb.most.basebiz.dataitem.configuration.RosterConfigurationItem;
import com.tsb.most.basebiz.parm.configuration.SearchRosterConfigurationParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class RosterConfiguration extends MOSTBaseService implements IRosterConfiguration {
	private IRosterConfigurationDao rosterConfigurationDao;

	public void setRosterConfigurationDao(IRosterConfigurationDao rosterConfigurationDao) {
		this.rosterConfigurationDao = rosterConfigurationDao;
	}
	
	@Override
	public DataItemList selectInternalStaffMngUser(SearchRosterConfigurationParm parm) throws BizException {
		return rosterConfigurationDao.selectInternalStaffMngUser(parm);
	}
	
	@Override
	public DataItemList selectStaffInfoListOnly(SearchRosterConfigurationParm parm) throws BizException {
		return rosterConfigurationDao.selectStaffInfoList(parm);
	}
	
	@Override
	public DataItemList selectInternalStaffMngCheck(SearchRosterConfigurationParm parm) throws BizException {
		DataItemList result = new DataItemList();
		
		if (parm.getViewType().equals("empId")) {
			result = rosterConfigurationDao.selectInternalStaffMngCheck(parm);
		}
		
		return result;
	}
	
	@Override
	public DataItemList selectGroupList(SearchRosterConfigurationParm parm) throws BizException {
		return rosterConfigurationDao.selectGroupList(parm);
	}
	
	public DataItemList selectInternalStaffMngLog(SearchRosterConfigurationParm parm) throws BizException {
		return rosterConfigurationDao.selectInternalStaffMngLog(parm);
	}
	
	@Override
	public DataItemList selectShiftDef(SearchRosterConfigurationParm parm) throws BizException {
		return rosterConfigurationDao.selectShiftDef(parm);
	}
	
	@Override
	public DataItemList selectGroupDef(SearchRosterConfigurationParm parm) throws BizException {
		return rosterConfigurationDao.selectGroupDef(parm);
	}
	
	@Override
	public DataItemList insertInternalStaffMngItems(InsertItemsBizParm parm) throws BizException {
		DataItemList items = parm.getInsertItems();
		DataItemList insertItems = new DataItemList();
		DataItemList insertRoleItems = new DataItemList();
		InsertItemsBizParm insertItms = new InsertItemsBizParm();
		InsertItemsBizParm insertRoleItms = new InsertItemsBizParm();
		DeleteItemsBizParm deleteItms = new DeleteItemsBizParm();
		
		for (int i = 0; i < items.size(); i++) {
			RosterConfigurationItem item = (RosterConfigurationItem) items.get(i);
		    insertItems.add(item);
		    String[] strRoles = item.getRoleCd().toString().split(",");
		    
		    if(strRoles[0] != "" ) {
				for (int j = 0; j < strRoles.length; j++) {
					RosterConfigurationItem roleItem = new RosterConfigurationItem();
					roleItem.setEmpId(item.getEmpId());
					roleItem.setRoleCd(strRoles[j]);
					roleItem.setUserId(item.getUserId());
					insertRoleItems.add(roleItem);
				}
		    }
		}
		
		if (insertItems.size() > 0) {
			insertItms.addInsertItem(insertItems);
			deleteItms.addDeleteItem(insertItems);
			insertRoleItms.addInsertItem(insertRoleItems);
			
			rosterConfigurationDao.insertInternalStaffMngItems(insertItms);
			if (insertRoleItems.size() > 0) {
				rosterConfigurationDao.deleteInternalStaffMngRoleItems(deleteItms);
				rosterConfigurationDao.insertInternalStaffMngRoleItems(insertRoleItms);
			}
		}
		
		return parm.getInsertItems();
	}
	
	@Override
	public DataItemList updateInternalStaffMngItems(UpdateItemsBizParm parm) throws BizException {
		DataItemList items = parm.getUpdateItems();
		DataItemList updateItems = new DataItemList();
		DataItemList updateRoleItems = new DataItemList();
		UpdateItemsBizParm updateItms = new UpdateItemsBizParm();
		InsertItemsBizParm insertRoleItms = new InsertItemsBizParm();
		DeleteItemsBizParm deleteItms = new DeleteItemsBizParm();
		
		for (int i = 0; i < items.size(); i++) {
			RosterConfigurationItem item = (RosterConfigurationItem) items.get(i);
			updateItems.add(item);
		    String[] strRoles = item.getRoleCd().toString().split(",");
		    
		    if(strRoles[0] != "" ) {
		    	for (int j = 0; j < strRoles.length; j++) {
		    		RosterConfigurationItem roleItem = new RosterConfigurationItem();
					roleItem.setEmpId(item.getEmpId());
					roleItem.setRoleCd(strRoles[j]);
					roleItem.setUserId(item.getUserId());
					updateRoleItems.add(roleItem);
				}
		    }
		}
		
		if (updateItems.size() > 0) {
			updateItms.addUpdateItem(updateItems);
			deleteItms.addDeleteItem(updateItems);
			insertRoleItms.addInsertItem(updateRoleItems);
			
			rosterConfigurationDao.updateInternalStaffMngItems(updateItms);
			rosterConfigurationDao.deleteInternalStaffMngRoleItems(deleteItms);
			
			if (updateRoleItems.size() > 0) {
				rosterConfigurationDao.insertInternalStaffMngRoleItems(insertRoleItms);
			}
		}
		
		return parm.getUpdateItems();
	}

	@Override
	public void deleteInternalStaffMngItems(DeleteItemsBizParm parm) throws BizException {
		rosterConfigurationDao.deleteInternalStaffMngItems(parm);
	}
	
	@Override
	public DataItemList insertInternalStaffMngLogItems(InsertItemsBizParm parm) throws BizException {
		RosterConfigurationItem item = (RosterConfigurationItem) parm.getInsertItems().get(0);
		DataItemList items = new DataItemList();
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		
		items.add(item);
		deleteParm.setDeleteItems(items);
		
		SimpleDateFormat stringDayTime = new SimpleDateFormat("dd/MM/yyyy");

		if (items.getCollection() != null && items.getCollection().size() > 0) {
			for (int i = 0; i < items.getCollection().size(); i++) {
				RosterConfigurationItem itemCollection = (RosterConfigurationItem) items.get(i);
				int days = (int) ((itemCollection.getToYmdKey().getTime() - itemCollection.getFmYmdKey().getTime()) / 1000 / 60 / 60 / 24 + 1);

				String strDays = Integer.toString(days);
				String strFromDate = stringDayTime.format(itemCollection.getFmYmdKey());
				String strToDate = stringDayTime.format(itemCollection.getToYmdKey());

				itemCollection.setDays(strDays);
				itemCollection.setFmYmd(strFromDate);
				itemCollection.setToYmd(strToDate);

				rosterConfigurationDao.deleteRosterSetupOthersItems(deleteParm);
				rosterConfigurationDao.deleteUnavailableLogDepyItems(deleteParm);
				rosterConfigurationDao.insertInternalStaffMngLogItems(parm);
			}
		}
		
		return parm.getInsertItems();
	}
	
	@Override
	public DataItemList updateInternalStaffMngLogItems(UpdateItemsBizParm parm) throws BizException {
		DataItemList items = new DataItemList();
		RosterConfigurationItem item = (RosterConfigurationItem) parm.getUpdateItems().get(0);
		SimpleDateFormat stringDayTime = new SimpleDateFormat("dd/MM/yyyy");
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		InsertItemsBizParm insertItems = new InsertItemsBizParm();
		
		items.add(item);
		insertItems.setInsertItems(items);
		deleteParm.setDeleteItems(items);

		rosterConfigurationDao.deleteInternalStaffMngLogItems(deleteParm);
		rosterConfigurationDao.insertGroupRosterSetItems(insertItems);

		if (items.getCollection() != null && items.getCollection().size() > 0) {
			for (int i = 0; i < items.getCollection().size(); i++) {
				RosterConfigurationItem itemCollection = (RosterConfigurationItem) items.get(i);
				int days = (int) ((itemCollection.getToYmdKey().getTime() - itemCollection.getFmYmdKey().getTime()) / 1000 / 60 / 60 / 24 + 1);

				String strDays = Integer.toString(days);
				String strFromDate = stringDayTime.format(itemCollection.getFmYmdKey());
				String strToDate = stringDayTime.format(itemCollection.getToYmdKey());

				itemCollection.setDays(strDays);
				itemCollection.setFmYmd(strFromDate);
				itemCollection.setToYmd(strToDate);

				rosterConfigurationDao.deleteRosterSetupOthersItems(deleteParm);
				rosterConfigurationDao.deleteUnavailableLogDepyItems(deleteParm);
				rosterConfigurationDao.insertInternalStaffMngLogItems(insertItems);
			}
		}
		
		return parm.getUpdateItems();
	}
	
	@Override
	public DataItemList deleteInternalStaffMngLogItems(DeleteItemsBizParm parm) throws BizException {
		RosterConfigurationItem item = (RosterConfigurationItem) parm.getDeleteItems().get(0);
		InsertItemsBizParm insertItems = new InsertItemsBizParm();
		DataItemList items = new DataItemList();

		items.add(item);
		insertItems.setInsertItems(items);

		rosterConfigurationDao.deleteUnavailableLogDepyItems(parm);
		rosterConfigurationDao.deleteInternalStaffMngLogItems(parm);
		rosterConfigurationDao.insertGroupRosterSetItems(insertItems);
		
		return parm.getDeleteItems();
	}
	
	@Override
	public DataItemList selectShiftGroupListOnly(SearchRosterConfigurationParm parm) throws BizException {
		return rosterConfigurationDao.selectShiftGroupListOnly(parm);
	}
	
	@Override
	public DataItemList selectDeployedGroupStaffListOnly(SearchRosterConfigurationParm parm) throws BizException {
		return rosterConfigurationDao.selectDeployedGroupStaffListOnly(parm);
	}
	

	@Override
	public void deleteShiftConfigurationItems(DeleteItemsBizParm parm) throws BizException {
		RosterConfigurationItem item = (RosterConfigurationItem) parm.getDataItem();
		DataItemList items = new DataItemList();
		
		items.add(item);
		
		rosterConfigurationDao.deleteShiftConfigurationItems(parm);
		rosterConfigurationDao.deleteRosterSetItems(parm);
		rosterConfigurationDao.deleteDepyItems(parm);
	}

	@Override
	public DataItemList insertShiftDefItems(InsertItemsBizParm parm) throws BizException {			
		return rosterConfigurationDao.insertShiftDefItems(parm);
	}

	@Override
	public DataItemList updateShiftDefItems(UpdateItemsBizParm parm) throws BizException {
		return rosterConfigurationDao.updateShiftDefItems(parm);
	}

	@Override
	public DataItemList deleteShiftDefItems(DeleteItemsBizParm parm) throws BizException {
		return rosterConfigurationDao.deleteShiftDefItems(parm);
	}

	@Override
	public DataItemList insertShiftGroupItems(InsertItemsBizParm parm) throws BizException {		
		return rosterConfigurationDao.insertShiftGroupItems(parm);
	}

	@Override
	public DataItemList updateShiftGroupItems(UpdateItemsBizParm parm) throws BizException {
		RosterConfigurationItem item= (RosterConfigurationItem) parm.getUpdateItems().get(0);
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		DataItemList deleteItems = new DataItemList();
		
		rosterConfigurationDao.updateShiftGroupItems(parm);
		
		if (item.getUseYn().equals("N")) {			
			deleteItems.add(item);
			deleteParm.setDeleteItems(deleteItems);
			
			rosterConfigurationDao.deleteStffGroupItems(deleteParm);
			rosterConfigurationDao.deleteRstrGroupItems(deleteParm);
		}			
		
		return parm.getUpdateItems();
	}

	@Override
	public DataItemList deleteShiftGroupItems(DeleteItemsBizParm parm) throws BizException {
		RosterConfigurationItem item= (RosterConfigurationItem) parm.getDeleteItems().get(0).clone();
		DataItemList items = new DataItemList();
		DeleteItemsBizParm deleteGroupParams = new DeleteItemsBizParm();
		items.add(item);
		deleteGroupParams.setDeleteItems(items);
		
		rosterConfigurationDao.deleteStffGroupItems(parm);
		rosterConfigurationDao.deleteGroupItems(deleteGroupParams);
		return rosterConfigurationDao.deleteRstrGroupItems(parm);		
	}

	@Override
	public DataItemList insertShiftGroupList(InsertItemsBizParm parm) throws BizException {
		RosterConfigurationItem item= (RosterConfigurationItem) parm.getInsertItems().get(0);
		DataItemList items = new DataItemList();
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		SearchRosterConfigurationParm grpParm = new SearchRosterConfigurationParm();

		items.add(item);
		deleteParm.setDeleteItems(items);

		grpParm.setShftGrpCd(item.getShftGrpCd());

		DataItemList list = rosterConfigurationDao.selectGroupItem(grpParm);

		if (list.size() > 0) {
			rosterConfigurationDao.deleteShiftConfigurationItems(deleteParm);
			rosterConfigurationDao.deleteRosterSetItems(deleteParm);
			rosterConfigurationDao.deleteDepyItems(deleteParm);
			rosterConfigurationDao.insertShiftConfigurationItems(parm);
			rosterConfigurationDao.insertGroupRosterSetItems(parm);
		}
		
		return parm.getInsertItems();
	}

	@Override
	public DataItemList deleteShiftGroupList(DeleteItemsBizParm parm) throws BizException {
		rosterConfigurationDao.deleteShiftConfigurationItems(parm);
		rosterConfigurationDao.deleteRosterSetItems(parm);
		rosterConfigurationDao.deleteDepyItems(parm);
		
		return parm.getDeleteItems();
	}
	
	
	@Override
	public DataItemList checkGroupIsUsedOrNot(SearchRosterConfigurationParm parm) throws BizException {
		return rosterConfigurationDao.checkGroupIsUsedOrNot(parm);
	}
	
	@Override
	public DataItemList getAllAssignedStaffByGroupCd(SearchRosterConfigurationParm parm) throws BizException {
		return rosterConfigurationDao.getAllAssignedStaffByGroupCd(parm);
	}
}