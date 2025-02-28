package com.tsb.most.biz.service.planning;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.basebiz.parm.fileupload.SearchFileUploadParm;
import com.tsb.most.biz.dao.planning.IVesselScheduleInternalDao;
import com.tsb.most.biz.dataitem.planning.VesselScheduleItem;
import com.tsb.most.biz.parm.planning.SearchVesselScheduleParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class VesselScheduleInternal extends MOSTBaseService implements IVesselScheduleInternal {
	private IVesselScheduleInternalDao vesselScheduleInternalDao;
	
	public void setVesselScheduleInternalDao(IVesselScheduleInternalDao vesselScheduleInternalDao) {
		this.vesselScheduleInternalDao = vesselScheduleInternalDao;
	}
 
	public DataItemList selectVesselScheduleList(SearchVesselScheduleParm parm) throws BizException {
		return vesselScheduleInternalDao.selectVesselScheduleList(parm);
	}

	@Override
	public DataItemList selectConfirmationSlipBreakBulkList(SearchVesselScheduleParm parm) throws BizException {
		DataItemList itemList = new DataItemList();
		
		parm.setCargoType("UNLIQUID");
		itemList = vesselScheduleInternalDao.selectConfirmationSlipDetail(parm);
		
		return itemList;
	}
	
	@Override
	public DataItemList selectConfirmationSlipLiquidBulkList(SearchVesselScheduleParm parm) throws BizException {
		DataItemList itemList = new DataItemList();
		
		parm.setCargoType("LIQUID");
		itemList = vesselScheduleInternalDao.selectConfirmationSlipDetail(parm);
		
		return itemList;
	}
	
	public DataItemList selectBerthValidation(SearchVesselScheduleParm parm) throws BizException {
		return vesselScheduleInternalDao.selectBerthValidation(parm);
	}
	
	public DataItemList selectVslTpCombo(SearchVesselScheduleParm parm) throws BizException {
		return vesselScheduleInternalDao.selectVslTpCombo(parm);
	}
	
	public DataItemList selectConfirmationSlip(SearchVesselScheduleParm parm) throws BizException {
		VesselScheduleItem returnItem = new VesselScheduleItem();
		SearchVesselScheduleParm vorLiquidBulkParm = new SearchVesselScheduleParm();
		SearchVesselScheduleParm vslParm = new SearchVesselScheduleParm();
		SearchFileUploadParm fileUploadParm = new SearchFileUploadParm();
		DataItemList resultList = new DataItemList();
		  
		returnItem.setConfirmationSlipList(vesselScheduleInternalDao.selectConfirmationSlip(parm).getCollection());

		vorLiquidBulkParm.setWorkYmd(parm.getWorkYmd());
		vorLiquidBulkParm.setShift(parm.getShift());
		vorLiquidBulkParm.setOpeTp(parm.getOpeTp());
		vorLiquidBulkParm.setVslCallId(parm.getVslCallId());
		vorLiquidBulkParm.setOpeTp(parm.getOpeTp() == null ? "" : parm.getOpeTp());
		
		ArrayList<VesselScheduleItem> resultCargo = (ArrayList<VesselScheduleItem>) vesselScheduleInternalDao.selectVORLiquidCargo(vorLiquidBulkParm).getCollection();
		
		returnItem.setCargoSummary(resultCargo);
		
		DataItemList operationType =  vesselScheduleInternalDao.selectConfirmationSlipOperationType(parm);
		
		if(operationType.getCollection().get(0) != null) {
			returnItem.setConfirmationSlipOperationType(operationType.getCollection());
		}else {
			returnItem.setConfirmationSlipOperationType(null);
		}
		
		DataItemList vesselInfo =  vesselScheduleInternalDao.selectVesselInfo(parm);
		
		if(vesselInfo.getCollection().get(0) != null) {
			returnItem.setVesselInformation(vesselInfo.getCollection());
		}else {
			returnItem.setVesselInformation(null);
		}
		
		vslParm.setVslCallId(parm.getVslCallId());
		
		List list = vesselScheduleInternalDao.selectVesselScheduleDetail(vslParm).getCollection();
		
		if (list.size() > 0) {
			returnItem.setVesselScheduleListDetail((VesselScheduleItem) list.get(0));
		}

		returnItem.setBerthInfo(vesselScheduleInternalDao.selectBerthInfo(vslParm).getCollection());

		fileUploadParm.setCatgCd(parm.getCatgCd());
		fileUploadParm.setPgmId(parm.getPgmId());
		
//		DataItemList tempList = this.fileUpload.selectFileList(fileUploadParm);
//		returnItem.setUploadItems((ArrayList<FileUploadItem>) tempList.getCollection());

		resultList.add(returnItem);
		
		return resultList;
	}
	
	public DataItemList selectVesselScheduleDetail(SearchVesselScheduleParm parm) throws BizException {
		return vesselScheduleInternalDao.selectVesselScheduleDetail(parm);
	}
	
	public DataItemList insertConfirmationSlipItem(InsertItemsBizParm parm) throws BizException {
		VesselScheduleItem masterItem = (VesselScheduleItem) parm.getInsertItem();
		DataItemList items = new DataItemList();
		
		items.add(masterItem);
		
		// Confirmation Slip
		SearchVesselScheduleParm checkparm = new SearchVesselScheduleParm();
		String vslCallId = ((VesselScheduleItem) items.get(0)).getVslCallId();
		checkparm.setVslCallId(vslCallId);

		List ltConfirmCheck = vesselScheduleInternalDao.selectConfirmationSlipCount(checkparm).getCollection();

		if (ltConfirmCheck.size() < 1) {
			DataItemList insertItemList = new DataItemList();
			
			insertItemList.add(masterItem);
			InsertItemsBizParm insertParm =  new InsertItemsBizParm();
			insertParm.setInsertItems(insertItemList);
			
			vesselScheduleInternalDao.insertConfirmationSlipItems(insertParm);
		} else {
			DataItemList updateItemList = new DataItemList();
			
			updateItemList.add(masterItem);
			UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
			updateParm.setUpdateItems(updateItemList);
			
			vesselScheduleInternalDao.updateConfirmationSlipItems(updateParm);
		}
		
		// Confirmation Slip Detail
		List confirmItems = ((VesselScheduleItem) items.get(0)).getItems();
		
		DataItemList insertItems = new DataItemList();
		DataItemList updateItems = new DataItemList();
		DataItemList deleteItems = new DataItemList();
		
		for (int i = 0; i < confirmItems.size(); i++) {
			VesselScheduleItem item = (VesselScheduleItem) confirmItems.get(i);
			
			item.setUserId(masterItem.getUserId());
			
			if (item.getWorkingStatus() != null && !item.getWorkingStatus().equals(DAOProcessType.QUERY)) {
				if (item.getWorkingStatus().equals(DAOProcessType.INSERT)) {
					insertItems.add(item);
				} else if (item.getWorkingStatus().equals(DAOProcessType.UPDATE)) {
					updateItems.add(item);
				} else if (item.getWorkingStatus().equals(DAOProcessType.DELETE)) {
					deleteItems.add(item);
				}
			}
		}
		
		// insert Confirmation Slip Detail
		if (insertItems.size() > 0) {
			InsertItemsBizParm insertParm = new InsertItemsBizParm();
			insertParm.setInsertItems(insertItems);
			
			vesselScheduleInternalDao.insertConfirmationSlipDetailItems(insertParm);
		}
		
		// update Confirmation Slip Detail
		if (updateItems.size() > 0) {
			UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
			updateParm.setUpdateItems(updateItems);
			vesselScheduleInternalDao.updateConfirmationSlipDetailItems(updateParm);
		}
		
		// delete Confirmation Slip Detail
		if (deleteItems.size() > 0) {
			DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
			deleteParm.setDeleteItems(deleteItems);
			vesselScheduleInternalDao.deleteConfirmationSlipDetailItems(deleteParm);
		}
		
		return items;
	}
	
	//For HHT
	public DataItemList selectBerthInfo(SearchVesselScheduleParm parm) throws BizException {
		return vesselScheduleInternalDao.selectBerthInfo(new SearchVesselScheduleParm());
	}
	
	@Override
	public DataItemList updateVesselDetailItem(UpdateItemsBizParm parm) throws BizException {
		vesselScheduleInternalDao.updateVesselDetailItem(parm);
		return null;
	}
}