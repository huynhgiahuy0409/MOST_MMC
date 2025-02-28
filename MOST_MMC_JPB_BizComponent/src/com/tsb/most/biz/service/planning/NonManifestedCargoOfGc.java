package com.tsb.most.biz.service.planning;


import java.text.SimpleDateFormat;
import java.util.ArrayList;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.biz.dao.operation.ICargoMasterDao;
import com.tsb.most.biz.dao.planning.INonManifestedCargoOfGcDao;
import com.tsb.most.biz.dataitem.planning.NonManifestedCargoOfGcItem;
import com.tsb.most.biz.parm.planning.SearchNonManifestedCargoOfGcParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.constants.CommonConstants;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class NonManifestedCargoOfGc extends MOSTBaseService implements INonManifestedCargoOfGc{
	
	private INonManifestedCargoOfGcDao nonManifestedCargoOfGcDao;

	public void setNonManifestedCargoOfGcDao(INonManifestedCargoOfGcDao nonManifestedCargoOfGcDao) {
		this.nonManifestedCargoOfGcDao = nonManifestedCargoOfGcDao;
	}

	public DataItemList selectNonManifestedCargoOfGcList(SearchNonManifestedCargoOfGcParm parm) throws BizException{
		return nonManifestedCargoOfGcDao.selectNonManifestedCargoOfGcList(parm);
    }
	
	public DataItemList selectSnItems(SearchNonManifestedCargoOfGcParm parm) throws BizException{
		return nonManifestedCargoOfGcDao.selectSnItems(parm);
    }
	
	public DataItemList selectBlItems(SearchNonManifestedCargoOfGcParm parm) throws BizException{
		return nonManifestedCargoOfGcDao.selectBlItems(parm);
    }
	
	public DataItemList selectOrgBlComboBoxItem(SearchNonManifestedCargoOfGcParm parm) throws BizException{
		return nonManifestedCargoOfGcDao.selectOrgBlComboBoxItem(parm);
    }
	
	public DataItemList updateItems(UpdateItemsBizParm parm)throws BizException{
		DataItemList updateItems = parm.getUpdateItems();
		
		try {
			NonManifestedCargoOfGcItem item = (NonManifestedCargoOfGcItem)updateItems.get(0);
			
			DataItemList jobCol = new DataItemList();
			NonManifestedCargoOfGcItem jobItem = new NonManifestedCargoOfGcItem();
			SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm");
			ArrayList<Object> invLocList = (ArrayList<Object>)item.getCollection();
			
			item.setNonManifestedStatus("L");
			
			jobItem.setVslCallId(item.getVslCallId());
			jobItem.setCurrentCgNo(item.getCurrentCgNo());
			jobItem.setJobGroup(item.getJobGroup());
			jobItem.setLocId(item.getNonManifestedLocId());
			jobItem.setToLocId(item.getNonManifestedLocId());
			jobItem.setCgNo(item.getLinkageCgNo());
			
			if(item.getNonManifestedMt() != null && !item.getNonManifestedMt().equals("")) {
				jobItem.setWgt(item.getNonManifestedMt());
			}else {
				jobItem.setWgt(String.valueOf(0));
			}
			if(item.getNonManifestedM3() != null && !item.getNonManifestedM3().equals("")) {
				jobItem.setMsrmt(Double.valueOf(item.getNonManifestedM3()));
			}else {
				jobItem.setMsrmt(0);
			}
			if(item.getNonManifestedQty() != null && !item.getNonManifestedQty().equals("")) {
				jobItem.setPkgQty(item.getNonManifestedQty());
			}else {
				jobItem.setPkgQty(String.valueOf(0));
			}
			
			jobItem.setBlNo(item.getLinkageBlNo());
			item.setLinkageCgNo(item.getOrgCgNo());
			jobItem.setUpdUserId(item.getUpdUserId());
			jobItem.setUserId(item.getUpdUserId());
			jobItem.setOpeClassCd(item.getCatgCd());
			jobItem.setJobPurpCd(CodeConstant.MT_JOBPURP_GA);
			jobItem.setJobCoCd(CodeConstant.INVLOC_WH_TP_NORMAL);
			jobItem.setJobTpCd(CodeConstant.MT_JOBTP_DS);
			jobItem.setDelvTpCd(CodeConstant.MT_DELVTP_I);
			jobItem.setJobNo(item.getJobNo());
			jobItem.setWorkStDt(formatter.parse(item.getHdlInStDt()));
			jobItem.setWorkEndDt(formatter.parse(item.getHdlInEndDt()));
			jobItem.setJobNo(item.getJobNo());
			
			SearchNonManifestedCargoOfGcParm jobParm = new SearchNonManifestedCargoOfGcParm();
			
			jobParm.setVslCallId(item.getVslCallId());
			jobParm.setJobGroup(item.getJobGroup());
			jobParm.setCgNo(item.getLinkageCgNo());
			
			DataItemList jobList = nonManifestedCargoOfGcDao.selectCargoJobItems(jobParm);

			if(jobList != null && jobList.size() > 0) {
				for(int i=0; i<jobList.size(); i++){
					NonManifestedCargoOfGcItem temp = (NonManifestedCargoOfGcItem)jobList.get(i);
					
					jobItem.setJobNo(temp.getJobNo());
					jobCol.add(jobItem);
					
					nonManifestedCargoOfGcDao.updateNonManifestedGcCargoJobItem(jobItem);

					if(invLocList.size() > 0)
						nonManifestedCargoOfGcDao.deleteNonManifestedGcInventoryLocItem(jobItem);
					else {
						nonManifestedCargoOfGcDao.updateNonManifestedGcInventoryLocItem(jobItem);
					}
				}
			}else {
				nonManifestedCargoOfGcDao.insertNonManifestedGcCargoJobItem(jobItem);
			}
			
			SearchNonManifestedCargoOfGcParm mstParm = new SearchNonManifestedCargoOfGcParm();
			
			mstParm.setVslCallId(item.getVslCallId());
			mstParm.setCgNo(item.getLinkageCgNo());
			
			if(nonManifestedCargoOfGcDao.selectIsCargoMst(mstParm))
				nonManifestedCargoOfGcDao.updateNonManifestedGcCargoMstItem(jobItem);
			else {
				nonManifestedCargoOfGcDao.insertNonManifestedGcCargoMstItem(jobItem);
			}
			
			if(jobCol.size() > 0)
				nonManifestedCargoOfGcDao.updateNonManifestedGcCargoMstAmountItem(jobCol);
			
			if(updateItems != null && updateItems.size() > 0){
				for(int i=0; i < updateItems.size(); i++){
					NonManifestedCargoOfGcItem whItem = (NonManifestedCargoOfGcItem)updateItems.get(i);
					NonManifestedCargoOfGcItem invItem = new NonManifestedCargoOfGcItem();
					
					invItem = (NonManifestedCargoOfGcItem)jobItem.clone();
					invItem.setJobNo(whItem.getJobNo());
					invItem.setCgNo(whItem.getLinkageBlNo());
					
					String locIdString = whItem.getNonManifestedLocId().substring(0, whItem.getNonManifestedLocId().indexOf("(", 0)) 
							+ "-"
							+ whItem.getNonManifestedLocId().substring(whItem.getNonManifestedLocId().indexOf("(", 0)+1, whItem.getNonManifestedLocId().indexOf(",", 0));
					
					invItem.setLocId(locIdString);
					invItem.setLocWgt(Double.valueOf(whItem.getNonManifestedMt()));
					invItem.setLocMsrmt(Double.valueOf(whItem.getNonManifestedM3()));
					invItem.setLocQty(Integer.valueOf(whItem.getNonManifestedQty()));
					invItem.setWhTpCd(CodeConstant.INVLOC_WH_TP_NORMAL);
					
					nonManifestedCargoOfGcDao.insertNonManifestedGcInventoryLocItem(invItem);
				}
			}
			
			nonManifestedCargoOfGcDao.updateNonManifestedGc(item);
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return updateItems;
	}
	
	public DataItemList deleteItems(DeleteItemsBizParm parm)throws BizException{
		DataItemList deleteItems = parm.getDeleteItems();
		NonManifestedCargoOfGcItem item = (NonManifestedCargoOfGcItem)deleteItems.get(0);
		DataItemList jobCol = new DataItemList();
		SearchNonManifestedCargoOfGcParm jobParm = new SearchNonManifestedCargoOfGcParm();

		jobParm.setVslCallId(item.getVslCallId());
		jobParm.setJobGroup(item.getJobGroup());
		jobParm.setCgNo(item.getLinkageBlSnNo());
		
		DataItemList jobList = nonManifestedCargoOfGcDao.selectCargoJobItems(jobParm);
		
		if(jobList != null && jobList.size() > 0){	
			NonManifestedCargoOfGcItem jobItem = new NonManifestedCargoOfGcItem();
			
			jobItem.setVslCallId(item.getVslCallId());
			jobItem.setCurrentCgNo(item.getLinkageBlSnNo());
			jobItem.setJobGroup(item.getJobGroup());
			jobItem.setLinkageCgNo(item.getLinkageCgNo());
			jobItem.setUpdUserId(item.getUpdUserId());
			jobItem.setJobNo(item.getJobNo());
			
			for(int i=0; i<jobList.size(); i++){
				NonManifestedCargoOfGcItem temp = (NonManifestedCargoOfGcItem)jobList.get(i);
				
				jobItem.setJobNo(temp.getJobNo());
				jobCol.add(jobItem);
				
				nonManifestedCargoOfGcDao.deleteNonManifestedGcInventoryLocItem(jobItem);
			}
			
			nonManifestedCargoOfGcDao.deleteNonManifestedGccargoJobItem(jobItem);
			nonManifestedCargoOfGcDao.deleteNonManifestedGcCargoMasterItem(jobItem);
		}
		
		item.setNonManifestedStatus("Y");
		item.setLinkageBlNo(item.getOrgCgNo());
		item.setOrgCgNo("");
		item.setUserId(item.getUpdUserId());
		
		nonManifestedCargoOfGcDao.updateNonManifestedGc(item);
		
		return deleteItems;
	}
	
	public DataItemList insertItems(InsertItemsBizParm parm)throws BizException{
		DataItemList insertItems = parm.getInsertItems();
		NonManifestedCargoOfGcItem item = (NonManifestedCargoOfGcItem)insertItems.get(0);
		DataItemList jobCol = new DataItemList();
		SearchNonManifestedCargoOfGcParm mstParm = new SearchNonManifestedCargoOfGcParm();

		mstParm.setVslCallId(item.getVslCallId());
		mstParm.setCgNo(item.getLinkageCgNo());

		String jobGroupNo = nonManifestedCargoOfGcDao.selectJobGroupNo(mstParm);
		
		NonManifestedCargoOfGcItem jobItem = new NonManifestedCargoOfGcItem();
		
		jobItem.setVslCallId(item.getVslCallId());
		jobItem.setNonManifestedRmk(item.getRemark());
		jobItem.setNonManifestedStatus("L");
		jobItem.setLinkageCgNo(item.getLinkageCgNo());
		
		if(item.getNonManifestedMt() != null && !item.getNonManifestedMt().equals("")) {
			jobItem.setWgt(item.getNonManifestedMt());
		}else {
			jobItem.setWgt(String.valueOf(0));
		}
		
		if(item.getNonManifestedM3() != null && !item.getNonManifestedM3().equals("")) {
			jobItem.setMsrmt(Double.valueOf(item.getNonManifestedM3()));
		}else {
			jobItem.setMsrmt(0);
		}
		
		if(item.getNonManifestedQty() != null && !item.getNonManifestedQty().equals("")) {
			jobItem.setPkgQty(item.getNonManifestedQty());
		}else {
			jobItem.setPkgQty(String.valueOf(0));
		}
		
		jobItem.setBlNo(item.getLinkageBlNo());
		jobItem.setShipgNoteNo(item.getLinkageSnNo());
		jobItem.setUpdUserId(item.getUpdUserId());
		jobItem.setOrgCgNo(item.getOrgCgNo());
		jobItem.setStatCd(CodeConstant.MT_JOBSTATCD_COM);
		jobItem.setDelvTpCd(CodeConstant.MT_DELVTP_I);
		jobItem.setDmgYn(CommonConstants.N);
		jobItem.setJobCoCd("G");
		jobItem.setOpeClassCd(item.getCatgCd());
		jobItem.setToLocId(item.getNonManifestedLocId());
		jobItem.setJobGroup(jobGroupNo);
		
		if(jobItem.getOpeClassCd().equals(CodeConstant.VSLSCH_CG_OP_TP_IMPORT)){
			jobItem.setJobTpCd(CodeConstant.MT_JOBTP_DS);
			jobItem.setJobPurpCd(CodeConstant.MT_JOBPURP_VA);
			
			nonManifestedCargoOfGcDao.insertNonManifestedGcCargoJobItem(jobItem);
			
			NonManifestedCargoOfGcItem jobItem2 = (NonManifestedCargoOfGcItem)jobItem.clone();
			
			jobItem2.setJobTpCd(CodeConstant.MT_JOBTP_LF);
			jobItem2.setJobPurpCd(CodeConstant.MT_JOBPURP_AW);
			jobItem2.setLocId(item.getNonManifestedLocId());
			
			nonManifestedCargoOfGcDao.insertNonManifestedGcCargoJobItem(jobItem2);
			
			jobCol.add(jobItem);
			jobCol.add(jobItem2);
		}
		
		ArrayList<Object> invLocList = (ArrayList<Object>)item.getCollection();
		
		if(invLocList.size() > 0){
			for(int i=0; i<invLocList.size(); i++){
				NonManifestedCargoOfGcItem whItem = (NonManifestedCargoOfGcItem)invLocList.get(i);
				NonManifestedCargoOfGcItem invItem = new NonManifestedCargoOfGcItem();
				
				invItem = (NonManifestedCargoOfGcItem)jobItem.clone();
				
				String locIdString = whItem.getNonManifestedLocId().substring(0, whItem.getNonManifestedLocId().indexOf("(", 0)) 
						+ "-"
						+ whItem.getNonManifestedLocId().substring(whItem.getNonManifestedLocId().indexOf("(", 0)+1, whItem.getNonManifestedLocId().indexOf(",", 0));
				
				invItem.setLocId(locIdString);
				invItem.setLocWgt(Double.valueOf(whItem.getNonManifestedMt()));
				invItem.setLocMsrmt(Double.valueOf(whItem.getNonManifestedM3()));
				invItem.setLocQty(Integer.valueOf(whItem.getNonManifestedQty()));
				invItem.setWhTpCd(CodeConstant.INVLOC_WH_TP_NORMAL);
				
				nonManifestedCargoOfGcDao.insertNonManifestedGcInventoryLocItem(invItem);
			}
		}
		
		if(nonManifestedCargoOfGcDao.selectIsCargoMst(mstParm))
			nonManifestedCargoOfGcDao.updateNonManifestedGcCargoMstItem(jobItem);
		else {
			nonManifestedCargoOfGcDao.insertNonManifestedGcCargoMstItem(jobItem);
		}
		
		if(jobCol.size() > 0)
			nonManifestedCargoOfGcDao.updateNonManifestedGcCargoMstAmountItem(jobCol);
		
		return insertItems;
	}
	
	public DataItemList deleteValidation(SearchNonManifestedCargoOfGcParm parm)throws BizException{
		return nonManifestedCargoOfGcDao.isDeleteValidation(parm);
	}

	@Override
	public DataItemList insertNonManifestRegister(InsertItemsBizParm parm) throws BizException {
		DataItemList insertItems = parm.getInsertItems();
		NonManifestedCargoOfGcItem item = (NonManifestedCargoOfGcItem)insertItems.get(0);
		InsertItemsBizParm insertItem = new InsertItemsBizParm();
		DataItemList returnList = new DataItemList();
		
		item.setNonManifestedStatus("Y");
		item.setJobTpCd(CodeConstant.MT_JOBTP_DS);
		item.setJobPurpCd(CodeConstant.MT_JOBPURP_VA);
		item.setCatgCd(CodeConstant.MT_CATGTP_I);
		
		returnList.add(item);
		insertItem.setInsertItems(returnList);
		
		nonManifestedCargoOfGcDao.insertNonManifestRegister(insertItem);
		
		return insertItems;
	}

	@Override
	public DataItemList selectShiftInfor(SearchNonManifestedCargoOfGcParm parm) throws BizException {
		return nonManifestedCargoOfGcDao.selectShiftInfor(parm);
	}
}
