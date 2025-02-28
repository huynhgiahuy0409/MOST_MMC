package com.tsb.most.biz.service.operation;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.dao.codes.ICodeMasterDao;
import com.tsb.most.basebiz.dao.combobox.IComboboxServiceDao;
import com.tsb.most.basebiz.dataitem.common.CodeMasterListItem;
import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.basebiz.parm.combobox.SearchComboBoxServiceParm;
import com.tsb.most.biz.dao.operation.ICargoMasterDao;
import com.tsb.most.biz.dao.operation.IWHReconciliationDao;
import com.tsb.most.biz.dataitem.operation.WHReconciliationItem;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.biz.parm.operation.SearchWHReconciliationParm;
import com.tsb.most.biz.parm.operation.SearchWHReconciliationPivotParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.response.RestResponse;

public class WHReconciliation extends MOSTBaseService implements IWHReconciliation {
	private IWHReconciliationDao whReconciliationDao;
	private ICodeMasterDao codeMasterDao;
	private IComboboxServiceDao comboboxServiceDao;
	private ICargoMasterDao cargoMasterDao;
	
	public void setwhReconciliationDao(IWHReconciliationDao whReconciliationDao) {
		this.whReconciliationDao = whReconciliationDao;
	}

	public void setCodeMasterDao(ICodeMasterDao codeMasterDao) {
		this.codeMasterDao = codeMasterDao;
	}

	public void setComboboxServiceDao(IComboboxServiceDao comboboxServiceDao) {
		this.comboboxServiceDao = comboboxServiceDao;
	}

	public void setCargoMasterDao(ICargoMasterDao cargoMasterDao) {
		this.cargoMasterDao = cargoMasterDao;
	}

	////////////////////////////////////////////////////////////////////////////
	public DataItemList selectWHRecnList(SearchWHReconciliationParm parm) throws BizException {
        WHReconciliationItem returnItem = new WHReconciliationItem();
        SearchCodeMasterParm partyCode = new SearchCodeMasterParm();
        SearchComboBoxServiceParm whLocCode = new SearchComboBoxServiceParm();
        RestResponse response = new RestResponse();
        
        List list = null;
        DataItemList returnList = new DataItemList();
        if (parm.getSearchType().equals("whrecncombolist")) {

            // cargo category code
            partyCode.setLcd(CodeConstant.LCD_MOST);
            partyCode.setMcd(CodeConstant.MCD_MT_CATGTP);
            partyCode.setScdUse("Y");
            list = codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection();
            returnItem.add(list);

            // warehouse location
            whLocCode.setDivCd(CodeConstant.MT_LOCDIV1_WHO);
            list = comboboxServiceDao.selectComboBoxWHLocation(whLocCode).getCollection();
            returnItem.add(list);
        } else if (parm.getSearchType().equals("jobhistorycombolist")) {

            // cargo category code
            partyCode.setLcd(CodeConstant.LCD_MOST);
            partyCode.setMcd(CodeConstant.MCD_MT_CATGTP);
            partyCode.setScdUse("Y");
			list = codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection();
            returnItem.add(list);

            // cargo condition code
            partyCode.setLcd(CodeConstant.LCD_MOST);
            partyCode.setMcd(CodeConstant.MCD_MT_CGCOCD);
            partyCode.setScdUse("Y");
            list = codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection();
            returnItem.add(list);

        } else if (parm.getSearchType().equals("whrecnlist")) {

            // WHReconciliation List
        	returnList = whReconciliationDao.selectWHRecnList(parm);
//            list = whReconciliationDao.getWHRecnList(parm).getCollection();
        } else if (parm.getSearchType().equals("whrecnDoclist")) {
        	parm.setDivCd("BL");
        	returnItem.setBlList((ArrayList<WHReconciliationItem>)whReconciliationDao.getWHRecnDocList(parm).getCollection());
        	
        	parm.setDivCd("SN");
        	returnItem.setSnList((ArrayList<WHReconciliationItem>)whReconciliationDao.getWHRecnDocList(parm).getCollection());
        	
        	parm.setDivCd("GR");
        	returnItem.setGrList((ArrayList<WHReconciliationItem>)whReconciliationDao.getWHRecnDocList(parm).getCollection());
        	
        	returnList.add(returnItem);
        } else {

            // cargo condition code
            partyCode.setLcd(CodeConstant.LCD_MOST);
            partyCode.setMcd(CodeConstant.MCD_MT_CGCOCD);
            partyCode.setScdUse("Y");
            list = codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection();
            
            ArrayList<CodeMasterListItem> cargoCondList = (ArrayList<CodeMasterListItem>)codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection();
            
            returnItem.setCargonReconcilCond(cargoCondList);

            ArrayList<WHReconciliationItem> detailList = (ArrayList<WHReconciliationItem>)whReconciliationDao.getWHRecnDtl(parm).getCollection();
            returnItem.setDetailList(detailList);
            
            returnList.add(returnItem);
        }

        return returnList;
    }
	
	public DataItemList selectWHRecnListPivot(SearchWHReconciliationPivotParm parm) throws BizException{
		return whReconciliationDao.selectWHRecnListPivot(parm);
	}

	public DataItemList updateWHReconcilation(UpdateItemsBizParm parm) throws BizException {
		DataItemList updateItemList = new DataItemList();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		InsertItemsBizParm insertParm = new InsertItemsBizParm();			
		ArrayList<WHReconciliationItem> items = new ArrayList<>();    		
    	SearchCargoMasterParm mstParm = new SearchCargoMasterParm();
        DataItemList insertAddItems = null;
        WHReconciliationItem jobItem = new WHReconciliationItem();
        WHReconciliationItem masterItem = (WHReconciliationItem)parm.getUpdateItems().get(0);
        items.add(masterItem); 
        WHReconciliationItem item = masterItem;
        // JobGroupNo
        String jobGroupNo = null;
        insertAddItems = new DataItemList();
        // getJobGroupNo
        mstParm.setVslCallId(item.getVslCallId());
        jobGroupNo = cargoMasterDao.selectJobGroupNo(mstParm);

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

        // add insertItems
        insertAddItems.add((WHReconciliationItem) item.clone());
        updateItemList.add((WHReconciliationItem) item.clone());

        insertParm.addInsertItem(updateItemList);
        whReconciliationDao.insertJobItems(insertParm);
        whReconciliationDao.insertInvLocItems(insertParm);

        jobItem.setVslCallId(item.getVslCallId());
        jobItem.setCgNo(item.getCgNo());
        jobItem.setJobNo(item.getJobNo());
        jobItem.setOpeClassCd(item.getOpeClassCd());

        updateItemList = new DataItemList();
        updateParm = new UpdateItemsBizParm();
        updateItemList.add(jobItem);
        updateParm.addUpdateItem(updateItemList);
        return parm.getUpdateItems();
	}

	public DataItemList processSettlementItems(InsertItemsBizParm parm) throws BizException {
		DataItemList insertItems = parm.getInsertItems();
		
		DataItemList updateItemList = new DataItemList();
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		String jobGroupNo = null;
		
		if(insertItems.size() > 0) {
			WHReconciliationItem item = (WHReconciliationItem)insertItems.get(0);
			SearchCargoMasterParm mstParm = new SearchCargoMasterParm();
	        mstParm.setVslCallId(item.getVslCallId());
	        jobGroupNo = cargoMasterDao.selectJobGroupNo(mstParm);
		}
		
		for (WHReconciliationItem item : (ArrayList<WHReconciliationItem>) insertItems.getCollection()) {
			if(item == null) {
				return null;
			}
			WHReconciliationItem jobItem = (WHReconciliationItem)item.clone();
			jobItem.setJobTpCd("RC");
			jobItem.setJobPurpCd("WW");
			jobItem.setDelvTpCd("I");
			jobItem.setStatCd("COM");
			jobItem.setChgRcCoCd("");
			jobItem.setJobGroup(jobGroupNo);
			
			jobItem.setWgt(new String(item.getChgWgt()));
			jobItem.setMsrmt(new String(item.getChgMsrmt()));
			jobItem.setPkgQty(item.getChgPkgQty());
			
			updateItemList.add(jobItem);
		}
		
		insertParm.addInsertItem(updateItemList);
		whReconciliationDao.insertJobItems(insertParm);
        whReconciliationDao.insertInvLocItems(insertParm);
		
		return updateItemList;
	}
}