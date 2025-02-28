package com.tsb.most.biz.service.planning;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.biz.dao.operation.IROROMasterDao;
import com.tsb.most.biz.dao.planning.IRoRoYardPlanDao;
import com.tsb.most.biz.dao.planning.ISpaceMovementPlanDao;
import com.tsb.most.biz.dataitem.operation.ROROMasterItem;
import com.tsb.most.biz.dataitem.planning.SpaceMovementPlanItem;
import com.tsb.most.biz.parm.planning.SearchSpaceMovementPlanParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class SpaceMovementPlan extends MOSTBaseService implements ISpaceMovementPlan {
	private ISpaceMovementPlanDao spaceMovementPlanDao;
	private IRoRoYardPlanDao roroYardPlanDao;
	private IROROMasterDao roroMasterDao;

	public void setSpaceMovementPlanDao(ISpaceMovementPlanDao spaceMovementPlanDao) {
		this.spaceMovementPlanDao = spaceMovementPlanDao;
	}

	public void setRoroYardPlanDao(IRoRoYardPlanDao roroYardPlanDao) {
		this.roroYardPlanDao = roroYardPlanDao;
	}

	public void setRoroMasterDao(IROROMasterDao roroMasterDao) {
		this.roroMasterDao = roroMasterDao;
	}
	
	/*
	 * =================================================================================================================
	 */

	@Override
	public DataItemList selectSpaceMovementList(SearchSpaceMovementPlanParm parm) throws BizException {
		return spaceMovementPlanDao.selectSpaceMovementRequestList(parm);
	}
	
	@Override
	public DataItemList selectSpaceMovementPlanList(SearchSpaceMovementPlanParm parm) throws BizException {
		return spaceMovementPlanDao.selectSpaceMovementPlanList(parm);
	}
	
	@Override
	public DataItemList selectSpaceMovementPlanDetail(SearchSpaceMovementPlanParm parm) throws BizException {
		return spaceMovementPlanDao.selectSpaceMoveMentPlanDetail(parm);
	}
	
	@Override
	public DataItemList selectMultipleSearchFilterCombo(SearchSpaceMovementPlanParm parm) throws BizException {
		return spaceMovementPlanDao.selectMultipleSearchFilterCombo(parm);
	}
	
	@Override
	public DataItemList selectGrList(SearchSpaceMovementPlanParm parm) throws BizException {
		return spaceMovementPlanDao.selectGrList(parm);
	}
	
	@Override
	public DataItemList selectSpaceMovementInfo(SearchSpaceMovementPlanParm parm) throws BizException {
		return spaceMovementPlanDao.selectSpaceMovementInfo(parm);
	}
	
	@Override
	public DataItemList getCargoInfo(SearchSpaceMovementPlanParm parm) throws BizException {
		return spaceMovementPlanDao.selectCargoInfo(parm);
	}
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
		DataItemList insertItems = parm.getInsertItems();
		List<SpaceMovementPlanItem> spaceMovementRequestItems = insertItems.getCollection();
		
		SearchSpaceMovementPlanParm reqParm = new SearchSpaceMovementPlanParm();
		reqParm.setReqTpCd("REQ");
		String newReqNo = ((SpaceMovementPlanItem) (spaceMovementPlanDao.selectNewReqNo(reqParm)).get(0)).getReqNo();
		
		for (SpaceMovementPlanItem requestItem : spaceMovementRequestItems) {
			requestItem.setReqNo(newReqNo);
		}

		spaceMovementPlanDao.insertSpcMovRequestItems(parm);

		for (SpaceMovementPlanItem requestItem : spaceMovementRequestItems) {
			if (requestItem.getCgTpCd() != null && requestItem.getCgTpCd().equals("RCV")) {
				UpdateItemsBizParm updateMstParm = new UpdateItemsBizParm();
				ROROMasterItem mstItem = new ROROMasterItem();
				DataItemList upateMstItems = new DataItemList();
				
				mstItem.setLocId(requestItem.getLocId());
				mstItem.setVslCallId(requestItem.getVslCallId());
				mstItem.setCatgCd(requestItem.getCatgCd());
				mstItem.setCgTpCd(requestItem.getCgTpCd());
				mstItem.setUserId(requestItem.getUserId());
				
				if (requestItem.getCatgCd() != null && requestItem.getCatgCd().equals("I")) {
					mstItem.setSdoNo(requestItem.getSdogrNo());
					mstItem.setCgNo(requestItem.getBlNo());
				} else {
					mstItem.setGrNo(requestItem.getSdogrNo());
					mstItem.setCgNo(requestItem.getShipgNoteNo());
				}

				upateMstItems.add(mstItem);
				updateMstParm.addUpdateItem(upateMstItems);
				
				roroMasterDao.updateYardPlanOfRoRo(updateMstParm);
			} 
		}

		return insertItems;
	}

	@Override
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		DataItemList items = parm.getUpdateItems();
		List<SpaceMovementPlanItem> updateItems = items.getCollection();
		DataItemList insertList = new DataItemList();
		DataItemList updateList = new DataItemList();
		DataItemList deleteList = new DataItemList();

		for (SpaceMovementPlanItem updateItem : updateItems) {
			switch (updateItem.getWorkingStatus()) {
			case DAOProcessType.INSERT:
				insertList.add(updateItem);
				break;
			case DAOProcessType.UPDATE:
				updateList.add(updateItem);
				break;
			case DAOProcessType.DELETE:
				deleteList.add(updateItem);
				break;
			}
		}
		

		if (deleteList.size() > 0) {
			DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
			deleteParm.setDeleteItems(deleteList);
			spaceMovementPlanDao.deleteSpcMovRequestItems(deleteParm);
		}
		
		if (updateList.size() > 0) {
			UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
			updateParm.setUpdateItems(updateList);
			spaceMovementPlanDao.updateSpaceMovementRequestItems(updateParm);
			
			
		}

		if (insertList.size() > 0) {
			InsertItemsBizParm insertParm = new InsertItemsBizParm();
			insertParm.setInsertItems(insertList);
			spaceMovementPlanDao.insertSpcMovRequestItems(insertParm); 
		}
		
		return items;
	}
	
	@Override
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException {
		spaceMovementPlanDao.deleteSpcMovPlanItems(parm);
		
		return spaceMovementPlanDao.deleteSpcMovRequestItems(parm);
	}

	@Override
	public DataItemList processSpcMovPlanItems(UpdateItemsBizParm parm) throws BizException {
		DataItemList updateItems = parm.getUpdateItems();
		SpaceMovementPlanItem updateItem = (SpaceMovementPlanItem) parm.getUpdateItem();

		if (updateItem != null && updateItem.getInsertType().equals("reject")) {
			return updateSpcMovReject(updateItem);
		}

		return updateSpcMovConfirm(updateItems);
	}

	public DataItemList updateSpcMovConfirm(DataItemList updateItems) throws BizException {
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		insertParm.addInsertItem(updateItems);
		spaceMovementPlanDao.insertSpcMovPlanItems(insertParm);

		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.addUpdateItem(updateItems);
		spaceMovementPlanDao.updateSpcMovPlanConfirm(updateParm);

		return updateItems;
	}

	public DataItemList updateSpcMovReject(SpaceMovementPlanItem item) throws BizException {
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.addUpdateItem(item);

		return spaceMovementPlanDao.updateSpcMovReject(updateParm);
	}

	public DataItemList updateSpcMovRequestProcess(UpdateItemsBizParm parm) throws BizException {
		SearchSpaceMovementPlanParm searchParm = new SearchSpaceMovementPlanParm();

		spaceMovementPlanDao.updateSpcMovRequestProcess(parm);
		searchParm.setReqNo(((SpaceMovementPlanItem) parm.getUpdateItems().get(0)).getReqNo());
		
		return spaceMovementPlanDao.selectSpaceMoveMentPlanDetail(searchParm);
	}

	public DataItemList processSpcMovRequestItems(UpdateItemsBizParm parm) throws BizException {
		DataItemList insertItems = new DataItemList();
		DataItemList updateItems = new DataItemList();
		DataItemList deleteItems = new DataItemList();
		SpaceMovementPlanItem mstItem = (SpaceMovementPlanItem) parm.getDataItem().get(0); 
		ArrayList<SpaceMovementPlanItem> items = mstItem.getItems();
		SearchSpaceMovementPlanParm reqParm = new SearchSpaceMovementPlanParm();
		String newReqNo = "";
		String spcMovReqNo = "";
		
		if (items != null && items.size() > 0) {
			SpaceMovementPlanItem item = (SpaceMovementPlanItem) items.get(0);
			if(item.getReqNo() == null || "".equals(item.getReqNo())){
				reqParm.setReqTpCd("REQ");
				newReqNo = ((SpaceMovementPlanItem) (spaceMovementPlanDao.selectNewReqNo(reqParm)).get(0)).getReqNo();
				spcMovReqNo = newReqNo;
			}
		}
		
		for(int i = 0; i < items.size(); i++){
			SpaceMovementPlanItem  itemCol = (SpaceMovementPlanItem)items.get(i);            
			
			if(DAOProcessType.INSERT.equals(itemCol.getWorkingStatus())){
				if(itemCol.getReqNo() == null || "".equals(itemCol.getReqNo()))
					itemCol.setReqNo(newReqNo);
				
			    insertItems.add(itemCol);
			} else if (DAOProcessType.UPDATE.equals(itemCol.getWorkingStatus())){
				updateItems.add(itemCol);
			} else if(DAOProcessType.DELETE.equals(itemCol.getWorkingStatus())){
			    deleteItems.add(itemCol);
			}
			
			spcMovReqNo = itemCol.getReqNo();
		} 
		
		if(insertItems.getCollection().size() > 0 ){
			InsertItemsBizParm insertParm = new InsertItemsBizParm();
			
			insertParm.setInsertItems(insertItems);
			spaceMovementPlanDao.insertSpcMovRequestItems(insertParm);
		}
		 
		if(updateItems.size() > 0) {
			UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
			
			updateParm.setUpdateItems(updateItems);
			spaceMovementPlanDao.updateSpaceMovementRequestItems(updateParm);
		}
		 
		if(deleteItems.size() > 0) {
			DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
			
			deleteParm.setDeleteItems(deleteItems);
			spaceMovementPlanDao.deleteSpaceMovementPlanItems(deleteParm);
		}
		
		SearchSpaceMovementPlanParm searchParm = new SearchSpaceMovementPlanParm();
		searchParm.setReqNo(spcMovReqNo);
		
		return spaceMovementPlanDao.selectSpaceMoveMentPlanDetail(searchParm);
	}
	
	@Override
	public DataItemList getDuplicatedRequest(SearchSpaceMovementPlanParm parm) throws BizException {
		return spaceMovementPlanDao.selectDuplicatedRequest(parm);
	} 
	
}