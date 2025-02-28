package com.tsb.most.biz.service.operation;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.biz.dao.operation.ICargoMasterDao;
import com.tsb.most.biz.dao.operation.IWHReconciliationDao;
import com.tsb.most.biz.dataitem.operation.CargoJobItem;
import com.tsb.most.biz.dataitem.operation.WHReconciliationItem;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.biz.parm.operation.SearchWHReconciliationParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.BizException;

public class WHReconciliation extends MOSTBaseService implements IWHReconciliation {
	private IWHReconciliationDao whReconciliationDao;
	private ICargoMasterDao cargoMasterDao;
	private ICargoJobDao cargoJobDao;

	public ICargoJobDao getCargoJobDao() {
		return cargoJobDao;
	}

	public void setCargoJobDao(ICargoJobDao cargoJobDao) {
		this.cargoJobDao = cargoJobDao;
	}

	public IWHReconciliationDao getWhReconciliationDao() {
		return whReconciliationDao;
	}

	public void setWhReconciliationDao(IWHReconciliationDao whReconciliationDao) {
		this.whReconciliationDao = whReconciliationDao;
	}

	public ICargoMasterDao getCargoMasterDao() {
		return cargoMasterDao;
	}

	public void setCargoMasterDao(ICargoMasterDao cargoMasterDao) {
		this.cargoMasterDao = cargoMasterDao;
	}

	@Override
	public IDataItem selectWHRecnList(SearchWHReconciliationParm parm) throws BizException {
		return whReconciliationDao.selectWHRecnList(parm);
	}

	@Override
	public IDataItem selectWHRecnDetailList(SearchWHReconciliationParm parm) throws BizException {
		// TODO Auto-generated method stub
		DataItemList response = new DataItemList();

		WHReconciliationItem returnItem = new WHReconciliationItem();
		List<WHReconciliationItem> result = (ArrayList<WHReconciliationItem>) whReconciliationDao
				.selectWHRecnDetailList(parm).getCollection();
		returnItem.setDetailList(result);

		List returnList = new ArrayList();
		returnList.add(returnItem);

		response.setCollection(returnList);
		return response;
	}
	
	@Override
	public void processWHReconciliationItems(InsertItemsBizParm parm) throws BizException {
		WHReconciliationItem item = (WHReconciliationItem) parm.getInsertItems().get(0);

		//
		SearchCargoMasterParm mstParm = new SearchCargoMasterParm();
		DataItemList insertAddItems = new DataItemList();
		DataItemList insertItems = null;
		CargoJobItem jobItem = new CargoJobItem();
		// JobGroupNo
		String jobGroupNo = null;

		// getJobGroupNo
		mstParm.setVslCallId(item.getVslCallId());
		jobGroupNo = cargoMasterDao.getJobGroupNo(mstParm);

		// set job data
		item.setJobTpCd("RC");
		item.setJobPurpCd("WW");
		item.setDelvTpCd("I");
		item.setStatCd("COM");
		item.setChgRcCoCd("");
		item.setJobGroup(jobGroupNo);

		item.setWgt(new String(item.getChgWgt()));
		item.setMsrmt(new String(item.getChgMsrmt()));
		item.setPkgQty(item.getChgPkgQty());

		if (!item.getRcCoCd().equals("DC") && !item.getRcCoCd().equals("IC")) {
			item.setChgRcCoCd("CC");
		}

		// add insertItems
		insertAddItems.add((WHReconciliationItem) item.clone());

		// In case of job condition is changed.
		if (!item.getRcCoCd().equals("DC") && !item.getRcCoCd().equals("IC")) {

			item.setChgRcCoCd(item.getJobCoCd() + item.getRcCoCd()); // ex.
			// (ND
			// -->
			// NormalToDamage)
			item.setJobCoCd(item.getRcCoCd()); // changed condition
			item.setWgt(new String(item.getAmdWgt()));
			item.setMsrmt(new String(item.getAmdMsrmt()));
			item.setPkgQty(item.getAmdPkgQty());

			insertAddItems.add(item);
		}

		// insert Job, InvLoc
		for (int j = 0; j < insertAddItems.size(); j++) {
			insertItems = new DataItemList();
			insertItems.add(insertAddItems.get(j));

			whReconciliationDao.insertJobItems(insertItems);
			whReconciliationDao.insertInvLocItems(insertItems);
		}

		jobItem.setVslCallId(item.getVslCallId());
		jobItem.setCgNo(item.getCgNo());
		jobItem.setJobNo(item.getJobNo());
		jobItem.setOpeClassCd(item.getOpeClassCd());
		jobItem.setUserId(item.getStaffCd());
		insertItems = new DataItemList();
		insertItems.add(jobItem);
		cargoJobDao.upAndDelMstItems(insertItems); // REPLACE
	}

}
