package com.tsb.most.biz.service.operation;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;

import com.tsb.most.biz.dao.operation.IGateOperationDao;
import com.tsb.most.biz.dataitem.operation.GateOperationItem;
import com.tsb.most.biz.parm.operation.SearchGateOperationParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class GateOperation extends MOSTBaseService implements IGateOperation {
	private IGateOperationDao gateOperationDao;
	
	
	public void setGateOperationDao(IGateOperationDao gateOperationDao) {
		this.gateOperationDao = gateOperationDao;
	}

	//selectArrvDelvIsCheck
	public DataItemList selectCargoGateInCheck(SearchGateOperationParm parm) throws BizException {
		return gateOperationDao.selectCargoGateInCheck(parm);
	}
	
	//selectGateOutCheck
	public DataItemList selectCargoGateOutCheck(SearchGateOperationParm parm) throws BizException {
		return gateOperationDao.selectCargoGateOutCheck(parm);
	}
	
	//selectGateInData
	public DataItemList selectCargoLorryGateIn(SearchGateOperationParm parm) throws BizException {
		return gateOperationDao.selectCargoLorryGateIn(parm);
	}
	
	//selectGateOutData
		public DataItemList selectCargoLorryGateOut(SearchGateOperationParm parm) throws BizException {
			return gateOperationDao.selectCargoLorryGateOut(parm);
		}
	
	//selectCargoArrvDelv
	public DataItemList selectCargoArrivalDelivery(SearchGateOperationParm parm) throws BizException {
		return gateOperationDao.selectCargoArrivalDelivery(parm);
	}

	public DataItemList insertCargoGateInItems(InsertItemsBizParm parm) throws BizException {

		DataItemList items = parm.getInsertItems();
		GateOperationItem item = (GateOperationItem) items.get(0);

		//Get Gate Transaction No:
		DataItemList gateIns = gateOperationDao.selectGateTxnNo(new SearchGateOperationParm());
		GateOperationItem gateInItem = (GateOperationItem)gateIns.getCollection().get(0);
		
		List<GateOperationItem> insertItems = (ArrayList<GateOperationItem>)parm.getInsertItems().getCollection();
		for (GateOperationItem GateOperationItem : insertItems) {
			GateOperationItem.setGateTxnNo(gateInItem.getGateTxnNo());
		}
		
		DataItemList resl = gateOperationDao.insertCargoGateInItems(parm);
		insertGateJob(item);
		
		return resl;
	
	}

	public DataItemList updateCargoGateItems(UpdateItemsBizParm parm) throws BizException {

		DataItemList items = parm.getUpdateItems();
		GateOperationItem returnItem = (GateOperationItem) items.get(0);
		UpdateItemsBizParm gateInUpdates = new UpdateItemsBizParm();
		UpdateItemsBizParm gateOutUpdates = new UpdateItemsBizParm();
		
		DataItemList updGOList = new DataItemList();
		DataItemList updGIList = new DataItemList();

		DataItemList result = new DataItemList();
		DataItemList resultList = new DataItemList();

		for (int i = 0; i < items.size(); i++) {
			GateOperationItem item = (GateOperationItem) items.get(i);
			insertGateJob(item);
			
			if ("gateIn".equalsIgnoreCase(item.getSearchType())) {
				updGIList.add(item);
			} else if ("gateOut".equalsIgnoreCase(item.getSearchType())) {
				updGOList.add(item);
			}
		}

		if (updGIList.size() > 0) {
			gateInUpdates.setUpdateItems(updGIList);
			result = gateOperationDao.updateCargoGateInItems(gateInUpdates);
		}

		if (updGOList.size() > 0) {
			gateOutUpdates.setUpdateItems(updGOList);
			result = gateOperationDao.updateCargoGateOutItems(gateOutUpdates);
		}
		return result;
	
	}
	
	public DataItemList updateCargoGateInChkInTimeItems(UpdateItemsBizParm parm) throws BizException {

		DataItemList items = parm.getUpdateItems();
		UpdateItemsBizParm gateInUpdates = new UpdateItemsBizParm();
		
		DataItemList updGIList = new DataItemList();

		DataItemList result = new DataItemList();

		for (int i = 0; i < items.size(); i++) {
			GateOperationItem item = (GateOperationItem) items.get(i);
			insertGateJob(item);
			
			if ("gateIn".equalsIgnoreCase(item.getSearchType())) {
				updGIList.add(item);
			}
		}

		gateInUpdates.setUpdateItems(updGIList);
		gateOperationDao.updateCargoGateInItems(gateInUpdates);
		
		return result;
	}
	
	
	private void insertGateJob(GateOperationItem item)  throws BizException {//TMT_JOB
		GateOperationItem jobItem = (GateOperationItem) item.clone();
		DataItemList insJobList = new DataItemList();
		DataItemList updateJobList = new DataItemList();

		String jobTpCd = "";
		String jobPurpCd = "";
		String statCd = "";
		String jobDt = "";
		int pkgQty = 0;
		double  msrmt = 0;
		double  wgt = 0;
		
		if("gateIn".equalsIgnoreCase(item.getSearchType())) {
			jobTpCd = "GI";
			jobPurpCd = "OI"; // Out to In
			jobDt = item.getGateInDt();
		}else if("gateOut".equalsIgnoreCase(item.getSearchType())) {
			jobTpCd = "GO";
			jobPurpCd = "IO"; // In to Out
			jobDt = item.getGateOutDt();
			statCd = "COM";
		}
		
		if (!StringUtils.isBlank(item.getGrNo())){//Export
			
			if(jobTpCd == "GI") {
				pkgQty = item.getPkgQty();
				msrmt = item.getMsrmt();
				wgt = item.getWgt();
			}
		}else if (!StringUtils.isBlank(item.getBlNo())
				|| !StringUtils.isBlank(item.getDoNo())
				|| !StringUtils.isBlank(item.getGatePassNo())){//Import
			
			if(jobTpCd == "GO") {
				pkgQty = item.getPkgQty();
				msrmt = item.getMsrmt();
				wgt = item.getWgt();
			}
		}
		
		pkgQty = item.getPkgQty();
		msrmt = item.getMsrmt();
		wgt = item.getWgt();
		
		//Check exists in TMT_JOB:
		SearchGateOperationParm jobParm = new SearchGateOperationParm();
		jobParm.setVslCallId(item.getVslCallId());
		jobParm.setCgNo(item.getCgNo());
		jobParm.setJobTpCd(jobTpCd);
		jobParm.setJobPurpCd(jobPurpCd);
		jobParm.setLorryNo(item.getLorryNo());
		jobParm.setGateTxnNo(item.getGateTxnNo());
		
		DataItemList jobResultList = gateOperationDao.selectJobGateInOut(jobParm);
		jobItem = (GateOperationItem) item.clone();
		jobItem.setPkgQty(pkgQty);
		jobItem.setWgt(wgt);
		jobItem.setMsrmt(msrmt);
		jobItem.setJobTpCd(jobTpCd);
		jobItem.setJobPurpCd(jobPurpCd);
		jobItem.setStatCd(statCd); //COM ORDER CNL
		jobItem.setJobDt(jobDt);
		jobItem.setScn(item.getScn());
		
		if(item.getCgTpCd() != null && item.getCgTpCd().equals("LQD")) {
			if(item.getDriverId() != null && !item.getDriverId().equals("")) {
				jobItem.setTsptTpCd("OH");
			}else {
				jobItem.setTsptTpCd("LR");
			}
		}
		
		if(jobResultList == null || jobResultList.getCollection().size() == 0) { //insert
			insJobList.add(jobItem);
		}else { //update
			updateJobList.add(jobItem);
		}
		
		//Insert for GI
		if (insJobList.size() > 0) {
			InsertItemsBizParm insertJobItems = new InsertItemsBizParm();
			insertJobItems.setInsertItems(insJobList);
			gateOperationDao.insertGOJobItems(insertJobItems); //Insert Gate In(Out)
		}
		
		if (updateJobList.size() > 0) {
			UpdateItemsBizParm updateJobItems = new UpdateItemsBizParm();
			updateJobItems.setUpdateItems(updateJobList);
			gateOperationDao.updateGOJobItems(updateJobItems); //Update Gate In(Out)
		}
		
	}

	@Override
	public DataItemList selectROROGateInItems(SearchGateOperationParm parm) throws BizException {
		return gateOperationDao.selectROROGateInItems(parm);
	}

	@Override
	public DataItemList updateROROGateInItems(UpdateItemsBizParm parm) throws BizException {
		DataItemList resl = null;
		DataItemList items = parm.getUpdateItems();
		GateOperationItem item = (GateOperationItem) items.get(0);
		InsertItemsBizParm insROROGateInParm = new InsertItemsBizParm();
		SearchGateOperationParm roroParm = new SearchGateOperationParm();
		//Get Gate Transaction No:
		DataItemList gateIns = gateOperationDao.selectGateTxnNo(new SearchGateOperationParm());
		GateOperationItem gateInItem = (GateOperationItem)gateIns.getCollection().get(0);
		
		List<GateOperationItem> updateItems = (ArrayList<GateOperationItem>)parm.getUpdateItems().getCollection();
		for (GateOperationItem GateOperationItem : updateItems) {
			GateOperationItem.setGateTxnNo(gateInItem.getGateTxnNo());
			roroParm.setVslCallId(GateOperationItem.getVslCallId());
			roroParm.setGrNo(GateOperationItem.getGrNo());
			roroParm.setSdoNo(GateOperationItem.getSdoNo());
			roroParm.setLorryNo(GateOperationItem.getLorryNo());
			roroParm.setDriverId(GateOperationItem.getDriverId());
		}
		
		
		DataItemList roroGetinCheckList = gateOperationDao.selectCargoArrivalDelivery(roroParm);
		if(roroGetinCheckList != null && roroGetinCheckList.size() >0) {
			resl = gateOperationDao.updateCargoGateInItems(parm);
		}else {
			insROROGateInParm.addInsertItem(item);
			resl = gateOperationDao.insertCargoGateInItems(insROROGateInParm);

			gateOperationDao.updateGIROROItems(parm);
		}
//		if(item.getGrNo() != null && item.getGrNo() != "") {
//			item.setCgNo(item.getGrNo());
//		}
		insertGateJob(item);
		
		return resl;
	}

	@Override
	public DataItemList selectGCGateInItems(SearchGateOperationParm parm) throws BizException {
		return gateOperationDao.selectGCGateInItems(parm);
	}

	@Override
	public DataItemList selectROROGateOutItems(SearchGateOperationParm parm) throws BizException {
		return gateOperationDao.selectROROGateOutItems(parm);
	}

	@Override
	public DataItemList insertROROGateoutItems(InsertItemsBizParm parm) throws BizException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public DataItemList updateROROGateoutItems(UpdateItemsBizParm parm) throws BizException {
		DataItemList items = parm.getUpdateItems();
		GateOperationItem returnItem = (GateOperationItem) items.get(0);
		UpdateItemsBizParm gateInUpdates = new UpdateItemsBizParm();
		UpdateItemsBizParm gateOutUpdates = new UpdateItemsBizParm();
		
		DataItemList updGOList = new DataItemList();

		DataItemList result = new DataItemList();
		DataItemList resultList = new DataItemList();

		for (int i = 0; i < items.size(); i++) {
			GateOperationItem item = (GateOperationItem) items.get(i);
			insertGateJob(item);
			updGOList.add(item);
		}
		if (updGOList.size() > 0) {
			gateOutUpdates.setUpdateItems(updGOList);
			gateOperationDao.updateROROGateoutItems(parm);
			result = gateOperationDao.updateROROArrvDelvItems(gateOutUpdates);
		}
		
		return result;
	}

}
