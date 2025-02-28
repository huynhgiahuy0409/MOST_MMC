package com.tsb.most.biz.service.planning;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.biz.dao.operation.IROROMasterDao;
import com.tsb.most.biz.dao.planning.IRoRoYardPlanDao;
import com.tsb.most.biz.dao.planning.ISpaceMovementPlanDao;
import com.tsb.most.biz.dataitem.operation.ROROMasterItem;
import com.tsb.most.biz.dataitem.planning.RoRoYardPlanItem;
import com.tsb.most.biz.dataitem.planning.SpaceMovementPlanItem;
import com.tsb.most.biz.parm.planning.SearchRoRoYardPlanParm;
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
	public DataItemList selectSpaceMovementRequestList(SearchSpaceMovementPlanParm parm) throws BizException {
		return spaceMovementPlanDao.selectSpaceMovementRequestList(parm);
	}
	
	@Override
	public DataItemList selectSpaceMovementPlanList(SearchSpaceMovementPlanParm parm) throws BizException {
		return spaceMovementPlanDao.selectSpaceMovementPlanList(parm);
	}
	
	@Override
	public DataItemList selectSpaceMoveMentPlanDetail(SearchSpaceMovementPlanParm parm) throws BizException {
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
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
		// Confirm 만 가능( 처음 만들어질떄만 )
		DataItemList items = parm.getInsertItems();
		List<SpaceMovementPlanItem> itemsCollection = items.getCollection();
		InsertItemsBizParm planParm = new InsertItemsBizParm();
		DataItemList planItems = new DataItemList();
		SearchSpaceMovementPlanParm reqParm = new SearchSpaceMovementPlanParm();
		
		reqParm.setReqTpCd("REQ");
		
		// new req No
		String newReqNo = ((SpaceMovementPlanItem) (spaceMovementPlanDao.selectNewReqNo(reqParm)).get(0)).getReqNo();
		for( SpaceMovementPlanItem record : itemsCollection ) {
			record.setReqNo(newReqNo);
		}
		
		spaceMovementPlanDao.insertSpcMovRequestItems(parm);
		
		for( SpaceMovementPlanItem record : itemsCollection ) {
			if(record.getCgTpCd() != null  && record.getCgTpCd().equals("RCV")) {
				UpdateItemsBizParm updateMstParm = new UpdateItemsBizParm();
	    		ROROMasterItem mstItem = new ROROMasterItem();
	    		DataItemList upateMstItems = new DataItemList();
	    		mstItem.setLocId(record.getLocId());
	    		mstItem.setVslCallId(record.getVslCallId());
	    		mstItem.setCatgCd(record.getCatgCd());
	    		if(record.getCatgCd()  != null && record.getCatgCd().equals("I")) {
	    			mstItem.setSdoNo(record.getSdogrNo());
		    		mstItem.setCgNo(record.getBlNo());
	    		}else {
	    			mstItem.setGrNo(record.getSdogrNo());
		    		mstItem.setCgNo(record.getShipgNoteNo());
	    		}
	    		mstItem.setCgTpCd(record.getCgTpCd());
	    		mstItem.setUserId(record.getUserId());
	    		
	    		upateMstItems.add(mstItem);
	    		updateMstParm.addUpdateItem(upateMstItems);
	    		roroMasterDao.updateYardPlanOfRoRo(updateMstParm);
			}
			String reqSeq = ((SpaceMovementPlanItem) spaceMovementPlanDao.selectReqSeq(record).get(0)).getSeq();
			record.setSeq(reqSeq);
			List<String> planList = record.getPlanList();
			
			for (String locId : planList ) {
				SpaceMovementPlanItem clonePlanItem = (SpaceMovementPlanItem) record.clone();
				clonePlanItem.setLocId(locId);
				planItems.add(clonePlanItem);
			}
		}
		planParm.setInsertItems(planItems);
		
		return spaceMovementPlanDao.insertSpcMovPlanItems(planParm); 
	}

	@Override
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		DataItemList items = parm.getUpdateItems();
		List<SpaceMovementPlanItem> itemsCollection = items.getCollection();
		String insertType = ((SpaceMovementPlanItem)items.getCollection().get(0)).getInsertType();
		DataItemList insertList = new DataItemList();
		DataItemList updateList = new DataItemList();
		DataItemList result = new DataItemList();
		
		if(insertType.equals("confirm")) {
			//insert / update 구분하기
			for( SpaceMovementPlanItem record : itemsCollection ) {
				if(record.getWorkingStatus().equals(DAOProcessType.INSERT) ) 
					insertList.add(record);
				else 
					updateList.add(record);
			}
			
			// insert 가지고 이쓴ㄴ reqno그대로 쓰면됨.
			InsertItemsBizParm insertParm = new InsertItemsBizParm();
			insertParm.setInsertItems(insertList);
			spaceMovementPlanDao.insertSpcMovRequestItems(insertParm);
			
			// update에 해당 plan 아이템 지웠다
			DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
			deleteParm.setDeleteItems(updateList);
			spaceMovementPlanDao.deleteSpcMovPlanItems(deleteParm);
			
			// update 시키고 confirm도 시키기.
			UpdateItemsBizParm updatePlanParm = new UpdateItemsBizParm();
			updatePlanParm.setUpdateItems(updateList);
			spaceMovementPlanDao.updateSpaceMovementRequestItems(updatePlanParm);
			spaceMovementPlanDao.updateSpcMovPlanConfirm(updatePlanParm);
			
			// plan insert 하기.
			InsertItemsBizParm planParm = new InsertItemsBizParm();
			DataItemList planItems = new DataItemList();
			
			for( SpaceMovementPlanItem record : itemsCollection ) {
				if( record.getWorkingStatus().equals(DAOProcessType.INSERT) ) {
					String reqSeq = ((SpaceMovementPlanItem) spaceMovementPlanDao.selectReqSeq(record).get(0)).getSeq();
					
					record.setSeq(reqSeq);
				}
				
				List<String> planList = record.getPlanList();
				
				for (String locId : planList ) {
					SpaceMovementPlanItem clonePlanItem = (SpaceMovementPlanItem) record.clone();
					
					clonePlanItem.setLocId(locId);
					planItems.add(clonePlanItem);
				}
			}
			
			planParm.setInsertItems(planItems);
			result = spaceMovementPlanDao.insertSpcMovPlanItems(planParm); 
		}else if(insertType.equals("reject")) {
			result = spaceMovementPlanDao.updateSpcMovReject(parm);
		}
		
		return result;
	}

	@Override
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException {
		spaceMovementPlanDao.deleteSpcMovPlanItems(parm);
		
		return spaceMovementPlanDao.deleteSpaceMovementPlanItems(parm);
	}

	@Override
	public DataItemList processSpcMovPlanItems(InsertItemsBizParm parm) throws BizException {
		DataItemList response = new DataItemList();
		SpaceMovementPlanItem mstItem = (SpaceMovementPlanItem) parm.getInsertItems().get(0);
		ArrayList<SpaceMovementPlanItem> items = mstItem.getItems();

		if ("confirm".equals(mstItem.getInsertType())) {
			response = updateSpcMovPlanConfirm(parm);
		} else if ("reject".equals(mstItem.getInsertType())) {
			response = updateSpcMovReject(parm);
		} else {
			UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
			
			items = new ArrayList<SpaceMovementPlanItem>();
			items.add(mstItem);
			
			SpaceMovementPlanItem item = new SpaceMovementPlanItem();
			
			item.setItems(items);
			
			DataItemList insertItem = new DataItemList();
			
			insertItem.add(item);
			updateParm.setDataItem(insertItem);
			
			response = processSpcMovRequestItems(updateParm);
		}
		return response;
	}

	public DataItemList updateSpcMovPlanConfirm(InsertItemsBizParm parm) throws BizException {
		SpaceMovementPlanItem mstItem = (SpaceMovementPlanItem) parm.getInsertItems().get(0);
		ArrayList<SpaceMovementPlanItem> items = mstItem.getItems();

		if (items.size() > 0) {

			for (int i = 0; i < items.size(); i++) {
				SpaceMovementPlanItem item = (SpaceMovementPlanItem) items.get(i);
				String cPlanLocNames = item.getLocId();

				if (cPlanLocNames != null && !"".equals(cPlanLocNames)) {
					String plNmSplit[] = cPlanLocNames.split(",");
					DataItemList planItems = new DataItemList();

					for (int j = 0; j < plNmSplit.length; j++) {
						SpaceMovementPlanItem planItem = (SpaceMovementPlanItem) item.clone();
						
						planItem.setLocId(plNmSplit[j]);
						planItems.add(planItem);
					}
					
					InsertItemsBizParm insertPlanParm = new InsertItemsBizParm();
					
					insertPlanParm.setInsertItems(planItems);
					spaceMovementPlanDao.insertSpcMovPlanItems(insertPlanParm);

					UpdateItemsBizParm updatePlanParm = new UpdateItemsBizParm();
					
					updatePlanParm.setUpdateItem(item);
					spaceMovementPlanDao.updateSpcMovPlanConfirm2(updatePlanParm);
				}
			}
		}
		
		SearchSpaceMovementPlanParm searchParm = new SearchSpaceMovementPlanParm();
		searchParm.setReqNo(((SpaceMovementPlanItem) items.get(0)).getReqNo());
		
		return spaceMovementPlanDao.selectSpaceMoveMentPlanDetail(searchParm);
	}

	public DataItemList updateSpcMovReject(InsertItemsBizParm parm) throws BizException {
		SpaceMovementPlanItem mstItem = (SpaceMovementPlanItem) parm.getInsertItems().get(0);
		ArrayList<SpaceMovementPlanItem> items = mstItem.getItems();
		DataItemList rejItems = new DataItemList();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		
		if (items.size() > 0) {
			for (int i = 0; i < items.size(); i++) {
				SpaceMovementPlanItem item = (SpaceMovementPlanItem) items.get(i);
				rejItems.add(item);
			}
			
			updateParm.setUpdateItems(rejItems);
			spaceMovementPlanDao.updateSpcMovReject(updateParm);
		}
		
		SearchSpaceMovementPlanParm searchParm = new SearchSpaceMovementPlanParm();
		
		searchParm.setReqNo(((SpaceMovementPlanItem) items.get(0)).getReqNo());
		return spaceMovementPlanDao.selectSpaceMoveMentPlanDetail(searchParm);
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
}