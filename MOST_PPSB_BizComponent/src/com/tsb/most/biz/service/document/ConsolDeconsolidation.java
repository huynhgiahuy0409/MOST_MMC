package com.tsb.most.biz.service.document;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.basebiz.component.fileupload.IFileUpload;
import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.basebiz.parm.fileupload.SearchFileUploadParm;
import com.tsb.most.biz.dao.document.IConsolDeconsolidationDao;
import com.tsb.most.biz.dataitem.document.ConsolDeconsolidationItem;
import com.tsb.most.biz.dataitem.operation.CargoArrvDelvItem;
import com.tsb.most.biz.dataitem.operation.CargoLoadingItem;
import com.tsb.most.biz.parm.document.SearchBLParm;
import com.tsb.most.biz.parm.document.SearchConsolDeconsolidationParm;
import com.tsb.most.biz.parm.operation.SearchCargoArrvDelvParm;
import com.tsb.most.biz.parm.operation.SearchCargoLoadingParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.constants.CommonConstants;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class ConsolDeconsolidation extends MOSTBaseService implements IConsolDeconsolidation {
	private IConsolDeconsolidationDao consolDeconsolidationDao;
	private IFileUpload fileUpload;
	
	public void setConsolDeconsolidationDao(IConsolDeconsolidationDao consolDeconsolidationDao) {
		this.consolDeconsolidationDao = consolDeconsolidationDao;
	}
	
	public void setFileUpload(IFileUpload fileUpload) {
		this.fileUpload = fileUpload;
	}

	public DataItemList selectCargoStatusCombo(SearchConsolDeconsolidationParm parm) throws BizException{
		return consolDeconsolidationDao.selectCargoStatusCombo(parm);
	}
	
	public DataItemList selectConsolDeconsolidationList(SearchConsolDeconsolidationParm parm) throws BizException{
		return consolDeconsolidationDao.selectConsolDeconsolidationList(parm);
	}
	
	public DataItemList updateGetInStatusForSnBl(InsertItemsBizParm parm) throws BizException {
		DataItemList returnItem = new DataItemList();
		ConsolDeconsolidationItem item = (ConsolDeconsolidationItem)parm.getInsertItems().get(0);
		
		//In case Export, Insert 1 GR first
		if(item.getBlNo().equals("NULL")) {
			consolDeconsolidationDao.updateGetInStatusForSnBlInsertGr(parm);
		}else {			
			//Insert Job VA Record in case Import
			consolDeconsolidationDao.updateGetInStatusForSnBlInsertVAJob(parm);
		}
		
		//Insert Cargo Master Record
		consolDeconsolidationDao.updateGetInStatusForSnBlCgMst(parm);
		
		//Insert Job Record
		consolDeconsolidationDao.updateGetInStatusForSnBlJob(parm);
				
		//Insert Inventory Record
		consolDeconsolidationDao.updateGetInStatusForSnBlInv(parm);
		
		if(!(item.getBlNo().equals("NULL"))) {
			returnItem.add(item);
			consolDeconsolidationDao.updateNextJobForVA(returnItem);
		}
		
		return returnItem;
	}
	
	public DataItemList updateGetOutStatusForSnBl(InsertItemsBizParm parm) throws BizException {
		DataItemList returnItem = new DataItemList();
		ConsolDeconsolidationItem searchItem = (ConsolDeconsolidationItem)parm.getInsertItem();
		ConsolDeconsolidationItem mainItem = (ConsolDeconsolidationItem)parm.getInsertItem();
		
		//For Export
		if(searchItem.getBlNo().equals("NULL")) {		
			returnItem = consolDeconsolidationDao.selectCgNoForSn(searchItem);
			
			for(int i = 0; i < returnItem.size(); i++) {		
				ConsolDeconsolidationItem cgNoWhLoc = (ConsolDeconsolidationItem)returnItem.get(i);
				mainItem.setCgNo(cgNoWhLoc.getCgNo());
				mainItem.setWhLoc(cgNoWhLoc.getWhLoc());
				mainItem.setDocMt(cgNoWhLoc.getDocMt());
				mainItem.setDocM3(cgNoWhLoc.getDocM3());
				mainItem.setDocQty(cgNoWhLoc.getDocQty());
				
				consolDeconsolidationDao.updateGetOutStatusForSnBlJob(mainItem);
				consolDeconsolidationDao.updateGetOutStatusForSnBlInv(mainItem);
				consolDeconsolidationDao.updateGetOutStatusForSnBlJobAV(mainItem);
				consolDeconsolidationDao.updateGetOutStatusForSnCgMst(mainItem);
				
				DataItemList nextJob = new DataItemList();
				nextJob.add(mainItem);
				consolDeconsolidationDao.updateNextJobForWA(nextJob);
			}
		}else {
			//For import
			returnItem = consolDeconsolidationDao.selectCgNoForBl(searchItem);			
			
			for(int i = 0; i < returnItem.size(); i++) {		
				ConsolDeconsolidationItem cgNoWhLoc = (ConsolDeconsolidationItem)returnItem.get(i);
				mainItem.setCgNo(cgNoWhLoc.getCgNo());
				mainItem.setWhLoc(cgNoWhLoc.getWhLoc());
				mainItem.setDocMt(cgNoWhLoc.getDocMt());
				mainItem.setDocM3(cgNoWhLoc.getDocM3());
				mainItem.setDocQty(cgNoWhLoc.getDocQty());
							
				consolDeconsolidationDao.updateGetOutStatusForSnBlJob(mainItem);
				consolDeconsolidationDao.updateGetOutStatusForSnBlInv(mainItem);
			}
			
			//In case import, just need to update Cargo Master once
			consolDeconsolidationDao.updateGetOutStatusForBlCgMst(mainItem);
		}
		
		
		return returnItem;
	}
}
