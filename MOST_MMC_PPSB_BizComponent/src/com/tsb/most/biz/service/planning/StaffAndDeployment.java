package com.tsb.most.biz.service.planning;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.biz.dao.planning.IStaffAndDeploymentDao;
import com.tsb.most.biz.dataitem.planning.StaffAndDeploymentItem;
import com.tsb.most.biz.parm.planning.SearchStaffAndDeploymentParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class StaffAndDeployment extends MOSTBaseService implements IStaffAndDeployment {
	private IStaffAndDeploymentDao staffAndDeploymentDao;

	public void setStaffAndDeploymentDao(IStaffAndDeploymentDao staffAndDeploymentDao) {
		this.staffAndDeploymentDao = staffAndDeploymentDao;
	}

	public DataItemList selectStaffAdded(SearchStaffAndDeploymentParm parm) throws BizException {
		return staffAndDeploymentDao.selectStaffAdded(parm);
	}
	
	public DataItemList selectSumMegaList(SearchStaffAndDeploymentParm parm) throws BizException {
		return staffAndDeploymentDao.selectSumMegaList(parm);
	}
	
	public DataItemList selectVOperationDeployEquipCapaList(SearchStaffAndDeploymentParm parm) throws BizException {
		return staffAndDeploymentDao.selectVOperationDeployEquipCapaList(parm);
	}
	
	public DataItemList selectMegaSumOperatorList(SearchStaffAndDeploymentParm parm) throws BizException {
		return staffAndDeploymentDao.selectMegaSumOperatorList(parm);
	}
	
	public DataItemList selectVOperationDeployRmkList(SearchStaffAndDeploymentParm parm) throws BizException {
		return staffAndDeploymentDao.selectVOperationDeployRmkList(parm);
	}
	
	public DataItemList selectSumMegaPortCraneList(SearchStaffAndDeploymentParm parm) throws BizException {
		return staffAndDeploymentDao.selectSumMegaPortCraneList(parm);
	}
	
	public DataItemList selectSumMegaShipCraneList(SearchStaffAndDeploymentParm parm) throws BizException {
		return staffAndDeploymentDao.selectSumMegaShipCraneList(parm);
	}
	
	public DataItemList selectVOperationDeployPortCraneList(SearchStaffAndDeploymentParm parm) throws BizException {
		return staffAndDeploymentDao.selectVOperationDeployPortCraneList(parm);
	}
	
	public DataItemList selectMegaSumForkliftList(SearchStaffAndDeploymentParm parm) throws BizException {
		return staffAndDeploymentDao.selectSumMegaEquipmentList(parm);
	}
	
	public DataItemList selectVOperationDeployForkliftList(SearchStaffAndDeploymentParm parm) throws BizException {
		return staffAndDeploymentDao.selectVOperationDeployForkliftList(parm);
	}
	
	public DataItemList selectVOperationDeployStvdList(SearchStaffAndDeploymentParm parm) throws BizException {
		return staffAndDeploymentDao.selectVOperationDeployStvdList(parm);
	}
	
	public DataItemList selectSumMegaShoreCraneList(SearchStaffAndDeploymentParm parm) throws BizException {
		return staffAndDeploymentDao.selectSumMegaShoreCraneList(parm);
	}
	
	public DataItemList selectSumMegaPortAndShipCraneList(SearchStaffAndDeploymentParm parm) throws BizException {
		return staffAndDeploymentDao.selectSumMegaPortAndShipCraneList(parm);
	}
	
	public DataItemList selectRoleOther(SearchStaffAndDeploymentParm parm) throws BizException {
		return staffAndDeploymentDao.selectRoleOther(parm);
	}
	
	public DataItemList selectStandardStaffList(SearchStaffAndDeploymentParm parm) throws BizException {
		return staffAndDeploymentDao.selectStandardStaffList(parm);
	}
	
	public DataItemList selectVOperationDeployShipCraneEquipCapa(SearchStaffAndDeploymentParm parm) throws BizException {
		return staffAndDeploymentDao.selectVOperationDeployShipCraneEquipCapa(parm);
	}
	
	public DataItemList selectOtherStaffGroupList(SearchStaffAndDeploymentParm parm) throws BizException {
		return staffAndDeploymentDao.selectOtherStaffGroupList(parm);
	}
	
	public DataItemList checkValidation(SearchStaffAndDeploymentParm parm) throws BizException {
		return staffAndDeploymentDao.checkValidation(parm);
	}
	
	public DataItemList selectExtraList(SearchStaffAndDeploymentParm parm) throws BizException {
		return staffAndDeploymentDao.selectExtraList(parm);
	}
	
	public DataItemList selectExStaffGroupList(SearchStaffAndDeploymentParm parm) throws BizException {
		return staffAndDeploymentDao.selectExStaffGroupList(parm);
	}
	
	public DataItemList selectNewStaff(SearchStaffAndDeploymentParm parm) throws BizException {
		return staffAndDeploymentDao.selectNewStaff(parm);
	}
	
	public DataItemList selectShipCraneList(SearchStaffAndDeploymentParm parm) throws BizException {
		return staffAndDeploymentDao.selectShipCraneList(parm);
	}
	
	public DataItemList selectStaffDeployMentList(SearchStaffAndDeploymentParm parm) throws BizException {
		DataItemList deploylist = new DataItemList();
		deploylist = staffAndDeploymentDao.selectStaffDeployMentList(parm);
		return deploylist;
	}
	
	public DataItemList selectStaffAndEquipmentDetail(SearchStaffAndDeploymentParm parm) throws BizException {
        StaffAndDeploymentItem returnItem = new StaffAndDeploymentItem();
        DataItemList returnList = new DataItemList();
        
        ArrayList<StaffAndDeploymentItem> listMPStaff = ( ArrayList<StaffAndDeploymentItem>)staffAndDeploymentDao.selectVOperationDeployMPStaffList(parm).getCollection();
        returnItem.setVesselOperationDeployStaffList(listMPStaff);

        returnList.add(returnItem);
        return returnList;
    }
	
	public DataItemList selectValidationCode(SearchStaffAndDeploymentParm parm) throws BizException {
		return staffAndDeploymentDao.selectValidationCode(parm);
	}
	
	//processVOperationCgDtl function will be split 3 function
	//at processVOperationCgDtl function, will call manPower, PortCrane, Forklift. Base on 3 this items, we will use corresponding function 
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException{
		StaffAndDeploymentItem items = (StaffAndDeploymentItem)parm.getInsertItems().getCollection().get(0);
		
		DataItemList returnList = new DataItemList();
		
		ArrayList<StaffAndDeploymentItem> manPowerItem = items.getVesselOperationDeployStaffList();
		ArrayList<StaffAndDeploymentItem> portCraneDeployedItem = items.getPortCraneDeployedList();
		ArrayList<StaffAndDeploymentItem> forkliftDeployedItem = items.getForkliftDeployedList();
		
		if (manPowerItem != null) {
			for (int i = 0; i < manPowerItem.size(); i++) {
				StaffAndDeploymentItem item = (StaffAndDeploymentItem) manPowerItem.get(i);
				processVOperationCgDtl(item);
				updateStaffAttendanceSum(item);
			}
		}
		
		if (portCraneDeployedItem != null) {
			for (int i = 0; i < portCraneDeployedItem.size(); i++) {
				StaffAndDeploymentItem item = (StaffAndDeploymentItem) portCraneDeployedItem.get(i);
				processVOperationEquipment(item);
			}
		}
		
		if (forkliftDeployedItem != null) {
			for (int i = 0; i < forkliftDeployedItem.size(); i++) {
				StaffAndDeploymentItem item = (StaffAndDeploymentItem) forkliftDeployedItem.get(i);
				processVOperationCgDtl(item);
			}
		}
		
		return returnList;
	}
	
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException{
		StaffAndDeploymentItem items = (StaffAndDeploymentItem)parm.getUpdateItems().getCollection().get(0);
		
		DataItemList returnList = new DataItemList();
		
		ArrayList<StaffAndDeploymentItem> manPowerItem = items.getVesselOperationDeployStaffList();
		ArrayList<StaffAndDeploymentItem> portCraneDeployedItem = items.getPortCraneDeployedList();
		ArrayList<StaffAndDeploymentItem> forkliftDeployedItem = items.getForkliftDeployedList();
		
		if (manPowerItem != null) {
			for (int i = 0; i < manPowerItem.size(); i++) {
				StaffAndDeploymentItem item = (StaffAndDeploymentItem) manPowerItem.get(i);
				processVOperationCgDtl(item);
				updateStaffAttendanceSum(item);
			}
		}
		
		if (portCraneDeployedItem != null) {
			for (int i = 0; i < portCraneDeployedItem.size(); i++) {
				StaffAndDeploymentItem item = (StaffAndDeploymentItem) portCraneDeployedItem.get(i);
				processVOperationEquipment(item);
			}
		}
		
		if (forkliftDeployedItem != null) {
			for (int i = 0; i < forkliftDeployedItem.size(); i++) {
				StaffAndDeploymentItem item = (StaffAndDeploymentItem) forkliftDeployedItem.get(i);
				processVOperationCgDtl(item);
			}
		}
		
		return returnList;
	}
	
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException{
		return null;
	}
	
	public void processVOperationCgDtl(StaffAndDeploymentItem voItem) throws BizException{
		InsertItemsBizParm insertItems = new InsertItemsBizParm();
		UpdateItemsBizParm updateItems = new UpdateItemsBizParm();
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
		DataItemList returnList = new DataItemList();
		
		if(voItem.getWorkingStatus() != null) {
			if(voItem.getWorkingStatus().equals(DAOProcessType.INSERT)) {
				insertItems.addInsertItem(voItem);
			}else if(voItem.getWorkingStatus().equals(DAOProcessType.UPDATE)) {
				updateItems.addUpdateItem(voItem);
			}else if(voItem.getWorkingStatus().equals(DAOProcessType.DELETE)) {
				deleteItems.addDeleteItem(voItem);
			}
		}
		
		if (insertItems.getInsertItems() != null && insertItems.getInsertItems().size() > 0) {
			returnList = staffAndDeploymentDao.insertVOperationDeployItems(insertItems);
		}
		
		if (updateItems.getUpdateItems() != null && updateItems.getUpdateItems().size() > 0) {
			returnList = staffAndDeploymentDao.updateVOperationDeployItems(updateItems);
		}
		
		if (deleteItems.getDeleteItems() != null && deleteItems.getDeleteItems().size() > 0) {
			returnList = staffAndDeploymentDao.deleteVOperationDeployItems(deleteItems);
		}
	}
	
	public void updateStaffAttendanceSum(StaffAndDeploymentItem voItem) throws BizException{
		List items = voItem.getCollection(); 
		StaffAndDeploymentItem item = new StaffAndDeploymentItem();
		UpdateItemsBizParm updateItems = new UpdateItemsBizParm();
		
		DataItemList returnList = new DataItemList();
		
		for (int i = 0; i < items.size(); i++) {
			item = (StaffAndDeploymentItem) items.get(i);
			updateItems.addUpdateItem(item);
		}
		
		if(updateItems.getUpdateItems() != null && updateItems.getUpdateItems().size() > 0) {
			returnList = staffAndDeploymentDao.updateStaffAttendanceSum(updateItems);
		}
	}
	
	public void processVOperationEquipment(StaffAndDeploymentItem item) throws BizException{
		InsertItemsBizParm insertItems = new InsertItemsBizParm();
		UpdateItemsBizParm updateItems = new UpdateItemsBizParm();
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
		DataItemList returnList = new DataItemList();
		StaffAndDeploymentItem eqItem = new StaffAndDeploymentItem();
		
		String[] strSeq = null;
		String[] strEqTpCd = null;
		String[] strEqNo = null;
		String[] strVersion = null;
		
		if(item.getWorkingStatus() != null) {
			if(item.getWorkingStatus().equals(DAOProcessType.INSERT)) {
				strEqTpCd = item.getEqTpCd().toString().split(",");
				strEqNo = item.getEqNo().toString().split(",");
				
				for (int j = 0; j < strEqNo.length; j++) {
					eqItem = (StaffAndDeploymentItem) item.clone();

					eqItem.setEqTpCd(strEqTpCd[j]);
					eqItem.setEqNo(strEqNo[j]);
					
					insertItems.addInsertItem(eqItem);
				}
			}else if(item.getWorkingStatus().equals(DAOProcessType.UPDATE)) {
				strSeq = item.getSeq().toString().split(",");
				strEqNo = item.getEqNo().toString().split(",");
				strEqTpCd = item.getEqTpCd().toString().split(",");
				strVersion = item.getVersion().toString().split(",");
				
				for (int j = 0; j < strEqNo.length; j++) {
					eqItem = (StaffAndDeploymentItem) item.clone();

					eqItem.setEqTpCd(strEqTpCd[j]);
					eqItem.setEqNo(strEqNo[j]);
					eqItem.setSeq(strSeq[j]);
					eqItem.setVersion(strVersion[j]);
					
					updateItems.addUpdateItem(eqItem);
				}
			}else {
				strSeq = item.getSeq().toString().split(",");
				strEqTpCd = item.getEqTpCd().toString().split(",");
				strEqNo = item.getEqNo().toString().split(",");
				strVersion = item.getVersion().toString().split(",");

				for (int j = 0; j < strSeq.length; j++) {
					eqItem = (StaffAndDeploymentItem) item.clone();

					eqItem.setSeq(strSeq[j]);
					eqItem.setVersion(strVersion[j]);
					
					deleteItems.addDeleteItem(eqItem);
				}
			}
		}
		
		if (insertItems.getInsertItems() != null && insertItems.getInsertItems().size() > 0) {
			returnList = staffAndDeploymentDao.insertVOperationDeployItems(insertItems);
		}
		
		if (updateItems.getUpdateItems() != null && updateItems.getUpdateItems().size() > 0) {
			returnList = staffAndDeploymentDao.updateVOperationDeployItems(updateItems);
		}
		
		if (deleteItems.getDeleteItems() != null && deleteItems.getDeleteItems().size() > 0) {
			returnList = staffAndDeploymentDao.deleteVOperationDeployItems(deleteItems);
		}
	}
}