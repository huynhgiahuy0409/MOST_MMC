package com.tsb.most.biz.service.operation;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;

import com.tsb.most.biz.dao.document.ITruckAssignmentDao;
import com.tsb.most.biz.dao.operation.ICargoArrvDelvDao;
import com.tsb.most.biz.dataitem.operation.CargoArrvDelvItem;
import com.tsb.most.biz.parm.document.SearchTruckAssignmentParm;
import com.tsb.most.biz.parm.operation.SearchCargoArrvDelvParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class GateTransaction extends MOSTBaseService implements IGateTransaction {
	private ICargoArrvDelvDao cargoArrvDelvDao;
	private ITruckAssignmentDao truckAssignmentDao;
	
	public void setCargoArrvDelvDao(ICargoArrvDelvDao cargoArrvDelvDao) {
		this.cargoArrvDelvDao = cargoArrvDelvDao;
	}

	public void setTruckAssignmentDao(ITruckAssignmentDao truckAssignmentDao) {
		this.truckAssignmentDao = truckAssignmentDao;
	}
	////////////////////////////////////////////////////

    public DataItemList selectArrvDelvIsCheck(SearchCargoArrvDelvParm parm) throws BizException {
        return cargoArrvDelvDao.selectArrvDelvIsCheck(parm);
    }
    
    public DataItemList selectGateInData(SearchCargoArrvDelvParm parm) throws BizException {
    	return cargoArrvDelvDao.selectGateInData(parm);
    }
    
    public DataItemList selectCargoArrvDelv(SearchCargoArrvDelvParm parm) throws BizException {
        return cargoArrvDelvDao.selectCargoArrvDelv(parm);
    }
    
    public DataItemList selectAssignmentLorrysGateItems(SearchTruckAssignmentParm parm) throws BizException {
    	return truckAssignmentDao.selectAssignmentLorrysGateItems(parm);
    }
    
    public DataItemList selectGateOutCheck (SearchCargoArrvDelvParm parm) throws BizException {
    	return cargoArrvDelvDao.selectGateOutCheck(parm);
    }
    
    public DataItemList selectGateInCargoItem(SearchCargoArrvDelvParm parm) throws BizException {
        return cargoArrvDelvDao.selectGateInCargoItem(parm);
    }
    
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
		DataItemList items = parm.getInsertItems();
		CargoArrvDelvItem item = (CargoArrvDelvItem) items.get(0);

		//Get Gate Transaction No:
		DataItemList gateIns = cargoArrvDelvDao.selectGateTxnNo(new SearchCargoArrvDelvParm());
		CargoArrvDelvItem gateInItem = (CargoArrvDelvItem)gateIns.getCollection().get(0);
		
		List<CargoArrvDelvItem> insertItems = (ArrayList<CargoArrvDelvItem>)parm.getInsertItems().getCollection();
		for (CargoArrvDelvItem cargoArrvDelvItem : insertItems) {
			cargoArrvDelvItem.setGateTxnNo(gateInItem.getGateTxnNo());
		}
		
		DataItemList resl = cargoArrvDelvDao.insertGateIntems(parm);
		insertGateJob(item);
		
		return resl;
	}

	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		DataItemList items = parm.getUpdateItems();
		CargoArrvDelvItem returnItem = (CargoArrvDelvItem) items.get(0);
		UpdateItemsBizParm gateInUpdates = new UpdateItemsBizParm();
		UpdateItemsBizParm gateOutUpdates = new UpdateItemsBizParm();
		
		DataItemList updGOList = new DataItemList();
		DataItemList updGIList = new DataItemList();

		DataItemList result = new DataItemList();
		DataItemList resultList = new DataItemList();

		for (int i = 0; i < items.size(); i++) {
			CargoArrvDelvItem item = (CargoArrvDelvItem) items.get(i);
			insertGateJob(item);
			
			if ("gateIn".equalsIgnoreCase(item.getSearchType())) {
				updGIList.add(item);
			} else if ("gateOut".equalsIgnoreCase(item.getSearchType())) {
				updGOList.add(item);
			}
		}

		if (updGIList.size() > 0) {
			gateInUpdates.setUpdateItems(updGIList);
			result = cargoArrvDelvDao.updateGateInItems(gateInUpdates);
		}

		if (updGOList.size() > 0) {
			gateOutUpdates.setUpdateItems(updGOList);
			result = cargoArrvDelvDao.updateGateOutItems(gateOutUpdates);
		}
		return result;
	}
	
	private void insertGateJob(CargoArrvDelvItem item)  throws BizException {//TMT_JOB
		CargoArrvDelvItem jobItem = (CargoArrvDelvItem) item.clone();
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
		SearchCargoArrvDelvParm jobParm = new SearchCargoArrvDelvParm();
		jobParm.setVslCallId(item.getVslCallId());
		jobParm.setCgNo(item.getCgNo());
		jobParm.setJobTpCd(jobTpCd);
		jobParm.setJobPurpCd(jobPurpCd);
		jobParm.setLorryNo(item.getLorryNo());
		jobParm.setGateTxnNo(item.getGateTxnNo());
		
		DataItemList jobResultList = cargoArrvDelvDao.selectJobGateInOut(jobParm);
		jobItem = (CargoArrvDelvItem) item.clone();
		jobItem.setPkgQty(pkgQty);
		jobItem.setWgt(wgt);
		jobItem.setMsrmt(msrmt);
		jobItem.setJobTpCd(jobTpCd);
		jobItem.setJobPurpCd(jobPurpCd);
		jobItem.setStatCd(statCd); //COM ORDER CNL
		jobItem.setJobDt(jobDt);
		jobItem.setTsptTpCd("LR");
		
		if(jobResultList == null || jobResultList.getCollection().size() == 0) { //insert
			insJobList.add(jobItem);
		}else { //update
			updateJobList.add(jobItem);
		}
		
		//Insert for GI
		if (insJobList.size() > 0) {
			InsertItemsBizParm insertJobItems = new InsertItemsBizParm();
			insertJobItems.setInsertItems(insJobList);
			cargoArrvDelvDao.insertGOJobItems(insertJobItems); //Insert Gate In(Out)
		}
		
		if (updateJobList.size() > 0) {
			UpdateItemsBizParm updateJobItems = new UpdateItemsBizParm();
			updateJobItems.setUpdateItems(updateJobList);
			cargoArrvDelvDao.updateGOJobItems(updateJobItems); //Update Gate In(Out)
		}
		
	}
    
    public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException {
    	return null;
    }
    
   
}
