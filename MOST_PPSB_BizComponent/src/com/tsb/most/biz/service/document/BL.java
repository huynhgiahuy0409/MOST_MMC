package com.tsb.most.biz.service.document;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.basebiz.component.fileupload.IFileUpload;
import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.basebiz.parm.fileupload.SearchFileUploadParm;
import com.tsb.most.biz.dao.document.IBLDao;
import com.tsb.most.biz.dao.document.IDGDeclarationDao;
import com.tsb.most.biz.dao.document.ITerminalHoldReleaseControlDao;
import com.tsb.most.biz.dataitem.document.BLItem;
import com.tsb.most.biz.dataitem.document.DGDeclarationItem;
import com.tsb.most.biz.dataitem.document.TerminalHoldReleaseControlItem;
import com.tsb.most.biz.parm.document.SearchBLParm;
import com.tsb.most.biz.parm.document.SearchDGDeclarationParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.constants.CommonConstants;
import com.tsb.most.framework.data.util.StringUtil;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class BL extends MOSTBaseService implements IBL {
	private IBLDao blDao;
	private IFileUpload fileUpload;
	private ITerminalHoldReleaseControlDao terminalHoldReleaseControlDao;
	private IDGDeclarationDao dgDeclarationDao;
	
	public void setBlDao(IBLDao blDao) {
		this.blDao = blDao;
	}
	
	public void setFileUpload(IFileUpload fileUpload) {
		this.fileUpload = fileUpload;
	}

	public void setTerminalHoldReleaseControlDao(ITerminalHoldReleaseControlDao terminalHoldReleaseControlDao) {
		this.terminalHoldReleaseControlDao = terminalHoldReleaseControlDao;
	}
	
	public void setDgDeclarationDao(IDGDeclarationDao dgDeclarationDao) {
		this.dgDeclarationDao = dgDeclarationDao;
	}
	
	/**
	 * 
	 * */

	public DataItemList checkBLOperation(SearchBLParm parm) throws BizException{
		return blDao.checkBLOperation(parm);
	}
	
	public DataItemList selectBLList(SearchBLParm parm) throws BizException{
		return blDao.selectBLList(parm);
	}
	
	public DataItemList selectContainerList(SearchBLParm parm) throws BizException{
		return blDao.selectContainerList(parm);
	}
	
	public DataItemList checkBLNo(SearchBLParm parm) throws BizException{
		return blDao.checkBLNo(parm);
	}
	
	public DataItemList selectMfBLList(SearchBLParm parm) throws BizException{
		return blDao.selectMfBLList(parm);
	}
	
	public DataItemList selectBLListForMf(SearchBLParm parm) throws BizException{
		return blDao.selectBLListForMf(parm);
	}
	
	public DataItemList selectRoRoItems(SearchBLParm parm) throws BizException{
		return blDao.selectRoRoItems(parm);
	}
	
	public DataItemList selectPackageItems(SearchBLParm parm) throws BizException{
		DataItemList itemList = new DataItemList();
		
		if(parm.getOrgBlNo() == null || parm.getOrgBlNo().equals("")) {
			itemList = blDao.selectPackageItems(parm);
		} else {
			itemList = blDao.selectSplitPackageItems(parm);
		}
		
		return itemList;
	}
	
	public DataItemList selectSplitPackageItems(SearchBLParm parm) throws BizException{
		return blDao.selectSplitPackageItems(parm);
	}
	
	public DataItemList selectFileList(SearchFileUploadParm parm) throws BizException{
		return this.fileUpload.selectFileList(parm);
	}
	public DataItemList selectBlCargoDetail(SearchBLParm parm) throws BizException{
		return blDao.selectBlCargoDetail(parm);
	}
	
	public DataItemList checkDO(SearchBLParm parm) throws BizException{
		return blDao.checkDO(parm);
	}
	
	public DataItemList checkTruck(SearchBLParm parm) throws BizException{
		return blDao.checkTruck(parm);
	}
	
	public DataItemList checkOperation(SearchBLParm parm) throws BizException{
		return blDao.checkOperation(parm);
	}
	
	public DataItemList checkGateIn(SearchBLParm parm) throws BizException{
		return blDao.checkGateIn(parm);
	}
	
	public DataItemList selectSplitWgtChk(SearchBLParm parm) throws BizException{
		return blDao.selectSplitWgtChk(parm);
	}
	
	public DataItemList selectSplitWgt(SearchBLParm parm) throws BizException{
		return blDao.selectSplitWgt(parm);
	}
	
	public DataItemList selectSplitExistChk(SearchBLParm parm) throws BizException{
		return blDao.selectSplitExistChk(parm);
	}
	
	public DataItemList selectSubDoWeightList(SearchBLParm parm) throws BizException{
		return blDao.selectSubDoWeightList(parm);
	}
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getInsertItems();
		FileUploadItem fileUploadItem = new FileUploadItem();
		UpdateItemsBizParm updateItems = new UpdateItemsBizParm(); 
		
		for(BLItem item: (ArrayList<BLItem>)itemList.getCollection()) {
			if(item == null) {
				return null;
			}
			
			insertManifest(item);
			
			//file upload function
			/*ArrayList<FileUploadItem> fileuploadList = (ArrayList<FileUploadItem>) item.getUploadItems();
			
			if (fileuploadList != null && fileuploadList.size() > 0) {
				// File Upload CUD
				UpdateBizParm<FileUploadItem> cudParm = new UpdateBizParm<FileUploadItem>();
				cudParm.setUserId(((BLItem)parm.getInsertItems().get(0)).getUserId());
					
				fileUploadItem.setItems(fileuploadList);
				fileUploadItem.setUserId(((BLItem)parm.getInsertItems().get(0)).getUserId());
				
				cudParm.setDataItem(fileUploadItem);
				cudParm.setUserId(((BLItem)parm.getInsertItems().get(0)).getUserId());
				    
				this.fileUpload.applyUploadItems(cudParm);
			}*/
			
			
			//Check DG Declaration:
			ArrayList<DGDeclarationItem> dgs = (ArrayList<DGDeclarationItem>) item.getDgItems();
			if (dgs != null && dgs.size() > 0) {
				DGDeclarationItem itemDG = (DGDeclarationItem) dgs.get(0);
				DataItemList itemsDG = new DataItemList();
				
				if(!StringUtil.isNull(item.getDgSeq()) && item.getDgSeq().equals(itemDG.getSeq())) {
				
					itemDG.setCrudDG(DAOProcessType.UPDATE);
					itemDG.setDgSeq(item.getDgSeq());
					itemDG.setSeq(item.getDgSeq());
					
				} else {
					itemDG.setCrudDG(DAOProcessType.INSERT);
					itemDG.setCgNo(item.getBlNo());
					itemDG.setUserId(item.getUserId());
				}
				
				itemsDG.add(itemDG);

				UpdateBizParm<DGDeclarationItem> dgCudParm = new UpdateBizParm<DGDeclarationItem>();
				dgCudParm.setDataItem(itemDG);

				String dgSeq = processDGDeclarationItem(dgCudParm);
				if (!StringUtil.isNull(dgSeq) && itemDG.getCrudDG().equals(DAOProcessType.INSERT)) {
					item.setDgSeq(dgSeq);
				}
			}
			
			if(item.getChangeSplit() != null && item.getChangeSplit().equals(CommonConstants.Y)) {
				SearchBLParm blParm = new SearchBLParm();
				blParm.setVslCallId(item.getVslCallId());
				blParm.setBlNo(item.getOldBlNo());
				blParm.setMfDocId(item.getOldMfDocId());
				
				DataItemList originalWgt = blDao.selectOriginalWgt(blParm);
				
				BLItem insItem = (BLItem) item.clone();
				
				/*
				if(originalWgt.size() == 1) {
					for(BLItem orWgtItem: (ArrayList<BLItem>)originalWgt.getCollection()) {
						insItem.setSplitCgWgt(Float.toString(Float.parseFloat(insItem.getWgt()) + Float.parseFloat(orWgtItem.getSplitCgWgt())));
						insItem.setSplitCgVol(Float.toString(Float.parseFloat(insItem.getVol()) + Float.parseFloat(orWgtItem.getSplitCgVol())));
						insItem.setSplitPkgQty(Float.toString(Float.parseFloat(insItem.getPkgQty()) + Float.parseFloat(orWgtItem.getSplitPkgQty())));
						
						insItem.setWgt(Float.toString(Float.parseFloat(orWgtItem.getOrgWgt()) + Float.parseFloat(orWgtItem.getSplitCgWgt()) - Float.parseFloat(insItem.getSplitCgWgt())));
						insItem.setVol(Float.toString(Float.parseFloat(orWgtItem.getOrgVol()) + Float.parseFloat(orWgtItem.getSplitCgVol()) - Float.parseFloat(insItem.getSplitCgVol())));
						insItem.setPkgQty(Float.toString(Float.parseFloat(orWgtItem.getOrgPkgQty()) + Float.parseFloat(orWgtItem.getSplitPkgQty()) - Float.parseFloat(insItem.getSplitPkgQty())));
					}
				}
				*/
				
				DataItemList doWgt = blDao.selectOriginalDOWgt(blParm);
				
				if(doWgt.size() == 1) {
					for(BLItem doWgtItem: (ArrayList<BLItem>)doWgt.getCollection()) {
						insItem.setdMt(doWgtItem.getdMt());
						insItem.setdM3(doWgtItem.getdM3());
						insItem.setdQty(doWgtItem.getdQty());
						
						if(Float.parseFloat(doWgtItem.getiMt()) + Float.parseFloat(doWgtItem.getdMt()) > Float.parseFloat(insItem.getWgt())) {
							insItem.setiMt(Float.toString(Float.parseFloat(insItem.getWgt()) - Float.parseFloat(doWgtItem.getdMt())));
						} else {
							insItem.setiMt(doWgtItem.getiMt());
						}
						
						if(Float.parseFloat(doWgtItem.getiM3()) + Float.parseFloat(doWgtItem.getdM3()) > Float.parseFloat(insItem.getVol())) {
							insItem.setiM3(Float.toString(Float.parseFloat(insItem.getVol()) - Float.parseFloat(doWgtItem.getdM3())));
						} else {
							insItem.setiM3(doWgtItem.getiM3());
						}
						
						if(Float.parseFloat(doWgtItem.getiQty()) + Float.parseFloat(doWgtItem.getdQty()) > Float.parseFloat(insItem.getPkgQty())) {
							insItem.setiQty(Float.toString(Float.parseFloat(insItem.getPkgQty()) - Float.parseFloat(doWgtItem.getdQty())));
						} else {
							insItem.setiQty(doWgtItem.getiQty());
						}
					}
				}
				
				updateItems.addUpdateItem(insItem);
				
				blDao.updateOriginalBlWgt(updateItems);
				blDao.updateDoWgt(updateItems);
				//blDao.updateOriginalBlStatus(updateItems);
				
				//Terminal Hold
				if(item.getDocStatCd().equals("AP")) {
					insertTerminalHoldItems(item);
				}
			}
			
			if(item.getBlDetailItems() != null && item.getBlDetailItems().size() > 0) {
				insertBlDetail(item);
			}
			
			if(item.getCgTpCd().equals(CodeConstant.MT_CGTP_RCV) && item.getUnitItems().size() > 0) {
				insertROROData(item);
			}
			
			if(item.getPkgItems() != null) {
				if(item.getCgTpCd().equals(CodeConstant.MT_CGTP_BBK) && item.getPkgItems().size() > 0) {
					if(item.getOrgBlNo() == null || item.getOrgBlNo().equals("")) {
						insertPkgDetailData(item);
					}else {
						updatePkgDetailData(item);
					}
				}
			}
		}
		
		blDao.insertItems(parm);
		
		return itemList;
	}
	
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getUpdateItems();
		FileUploadItem fileUploadItem = new FileUploadItem();
		
		for(BLItem item: (ArrayList<BLItem>)itemList.getCollection()) {
			if(item == null)
				return null;
			
			ArrayList<BLItem> blDtlArr = item.getBlDetailItems();
			BLItem delItem = (BLItem) item.clone();
			
			delItem.setBlNo(item.getOldBlNo());
			delItem.setMfDocId(item.getOldMfDocId());
			
			blDao.deleteBlCargoDetailItems(delItem);
			blDao.updateItems(parm);
			
			insertManifest(item);
			
			ArrayList<FileUploadItem> fileuploadList = (ArrayList<FileUploadItem>) item.getUploadItems();
			
			/*if (fileuploadList != null && fileuploadList.size() > 0) {
				// File Upload CUD
				UpdateBizParm<FileUploadItem> cudParm = new UpdateBizParm<FileUploadItem>();
				cudParm.setUserId(((BLItem)parm.getUpdateItems().get(0)).getUserId());
					
				fileUploadItem.setItems(fileuploadList);
				fileUploadItem.setUserId(((BLItem)parm.getUpdateItems().get(0)).getUserId());
				cudParm.setDataItem(fileUploadItem);
				cudParm.setUserId(((BLItem)parm.getUpdateItems().get(0)).getUserId());
				    
				this.fileUpload.applyUploadItems(cudParm);
			}*/
			
			//Check DG Declareation:
			ArrayList<DGDeclarationItem> dgs = (ArrayList<DGDeclarationItem>) item.getDgItems();
			if (dgs != null && dgs.size() > 0) {
				DGDeclarationItem itemDG = (DGDeclarationItem) dgs.get(0);
				DataItemList itemsDG = new DataItemList();
				
				if(!StringUtil.isNull(item.getDgSeq()) && item.getDgSeq().equals(itemDG.getSeq())) {
				
					itemDG.setCrudDG(DAOProcessType.UPDATE);
					itemDG.setDgSeq(item.getDgSeq());
					itemDG.setSeq(item.getDgSeq());
					
				} else {
					itemDG.setCrudDG(DAOProcessType.INSERT);
					itemDG.setCgNo(item.getBlNo());
					itemDG.setUserId(item.getUserId());
				}
				
				itemsDG.add(itemDG);

				UpdateBizParm<DGDeclarationItem> dgCudParm = new UpdateBizParm<DGDeclarationItem>();
				dgCudParm.setDataItem(itemDG);

				String dgSeq = processDGDeclarationItem(dgCudParm);
				if (!StringUtil.isNull(dgSeq) && itemDG.getCrudDG().equals(DAOProcessType.INSERT)) {
					item.setDgSeq(dgSeq);
				}
			}
			
			if (item.getBlDetailItems() != null && item.getBlDetailItems().size() > 0 && !item.getCgTpCd().equals(CodeConstant.MT_CGTP_RCV)) {
				for (int i = 0; i < blDtlArr.size(); i++) {
					if (!blDtlArr.get(i).getAction().equals(DAOProcessType.DELETE)) {
						BLItem cudItem = (BLItem) item.clone();
						
						cudItem.setHatchNo(blDtlArr.get(i).getHatchNo());
						cudItem.setWgt(blDtlArr.get(i).getWgt());
						cudItem.setMsrmt(blDtlArr.get(i).getMsrmt());
						cudItem.setPkgQty(blDtlArr.get(i).getPkgQty());
						
						blDao.insertBlCargoDetailItems(cudItem);
					}
				}
			}
			
			if(item.getCgTpCd().equals(CodeConstant.MT_CGTP_RCV) && item.getUnitItems().size() > 0) {
				insertROROData(item);
			}
			
			if(item.getPkgItems() != null) {
				if(item.getCgTpCd().equals(CodeConstant.MT_CGTP_BBK) && item.getPkgItems().size() > 0) {
					insertPkgDetailData(item);
				}
			}
			
			//Update Split info
			/*
			 * UpdateItemsBizParm updateOrgItems = new UpdateItemsBizParm(); SearchBLParm
			 * blParm = new SearchBLParm(); blParm.setOrgBlNo(item.getOrgBlNo());
			 * ArrayList<BLItem> splitItems = (ArrayList<BLItem>)
			 * blDao.selectSplitWgtChk(blParm).getCollection(); if(splitItems.size() > 0) {
			 * int pkgQty = 0; double mt= 0; double m3= 0; for(BLItem splitItem: splitItems)
			 * { pkgQty += Integer.valueOf(splitItem.getSplitPkgQty()); mt +=
			 * Double.valueOf(splitItem.getSplitCgWgt()); m3 +=
			 * Double.valueOf(splitItem.getSplitCgVol()); } BLItem orgItem = (BLItem)
			 * item.clone(); orgItem.setSplitCgVol(String.valueOf(m3));
			 * orgItem.setSplitCgWgt(String.valueOf(mt));
			 * orgItem.setSplitPkgQty(String.valueOf(pkgQty));
			 * updateOrgItems.addUpdateItem(orgItem);
			 * blDao.updateOriginalBlWgt(updateOrgItems); }
			 */
			
			//Terminal Hold
			if("AP".equals(item.getDocStatCd()) && "Y".equals(item.getTmnlHoldFlag())) {
				insertTerminalHoldItems(item);
			}
			
			//GAP ID: DOC-001 
			//In case the user updates a BL with only 1 mode, here is indirect, the system will automatically update the DO also.
			if(CodeConstant.MT_DELVTP_I.equals(item.getDelvTpCd())) {
				UpdateItemsBizParm updateOrgItems = new UpdateItemsBizParm();
				
				BLItem insItem = (BLItem) item.clone();
				
				updateOrgItems.addUpdateItem(insItem);
				
				blDao.updateDoWgt(updateOrgItems);
			}
		}
		
		return itemList;
	}
	
	private String processDGDeclarationItem(UpdateBizParm<DGDeclarationItem> parm) throws BizException {
		DGDeclarationItem item = (DGDeclarationItem) parm.getDataItem();
		String newDgSeq = "";
		
		if (item.getCrudDG().equals(DAOProcessType.INSERT)) {
			SearchDGDeclarationParm dgParm = new SearchDGDeclarationParm();
			List<DGDeclarationItem> dgNoList = dgDeclarationDao.getDGDeclarationNoList(dgParm).getCollection();
			
			newDgSeq = ((DGDeclarationItem) (dgNoList.get(0))).getSeq();
			item.setSeq(newDgSeq);
			
			InsertItemsBizParm insertParm = new InsertItemsBizParm();
			insertParm.addInsertItem(item);
			dgDeclarationDao.insertDGDeclarationItems(insertParm);
			
		} else if (item.getCrudDG().equals(DAOProcessType.UPDATE)) {
			newDgSeq = item.getSeq();
			
			UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
			updateParm.addUpdateItem(item);
			dgDeclarationDao.updateDGDeclarationItems(updateParm);
		}
		
		return newDgSeq;
	}
	
	@Override
	public DataItemList processFileInfo(UpdateItemsBizParm parm) throws BizException {
		FileUploadItem fileUploadItem = new FileUploadItem();
		BLItem item = (BLItem) parm.getUpdateItems().get(0);
		ArrayList<FileUploadItem> fileuploadList = (ArrayList<FileUploadItem>) item.getUploadItems();

		if (fileuploadList != null && fileuploadList.size() > 0) {
			// File Upload CUD
			UpdateBizParm<FileUploadItem> cudParm = new UpdateBizParm<FileUploadItem>();
			cudParm.setUserId(((BLItem) parm.getUpdateItems().get(0)).getUserId());

			fileUploadItem.setItems(fileuploadList);
			fileUploadItem.setUserId(((BLItem) parm.getUpdateItems().get(0)).getUserId());
			cudParm.setDataItem(fileUploadItem);
			cudParm.setUserId(((BLItem) parm.getUpdateItems().get(0)).getUserId());

			this.fileUpload.applyUploadItems(cudParm);
		}

		return new DataItemList();
	}
	
	public void deleteItems(DeleteItemsBizParm parm) throws BizException {
		DataItemList  itemList = parm.getDeleteItems();
		UpdateItemsBizParm updateItems = new UpdateItemsBizParm();
		
		if(itemList.size() > 0) {
			for (int i = 0; i < itemList.size(); i++) {
				BLItem item = (BLItem)itemList.get(i);
				
				blDao.deleteBlCargoDetailItems(item);
				blDao.deleteRoRoItems(item);
				
				// Mantis: 0131791
				if(item.getOrgBlNo() != null && !item.getOrgBlNo().equals("")) {
					updateItems.addUpdateItem(itemList);
					
					SearchBLParm blParm = new SearchBLParm();
					blParm.setVslCallId(item.getVslCallId());
					blParm.setBlNo(item.getOrgBlNo());
					blParm.setMfDocId(item.getOldMfDocId());
					blParm.setOrgBlNo(item.getOrgBlNo());
					DataItemList splitExistChk = blDao.selectSplitExistChk(blParm);
					DataItemList originalWgt = blDao.selectOriginalWgt(blParm);
					
					if(splitExistChk.size() == 1) {
						blDao.updateBlStatus(updateItems);
					}
					
					int vol = 0, wgt = 0, pkgQty = 0;
					BLItem insItem = (BLItem) item.clone();
					if(originalWgt.size() == 1) {
						for(BLItem orWgtItem: (ArrayList<BLItem>)originalWgt.getCollection()) {
							vol = Integer.parseInt(orWgtItem.getSplitCgVol());
							wgt = Integer.parseInt(orWgtItem.getSplitCgWgt());
							pkgQty = Integer.parseInt(orWgtItem.getSplitPkgQty());
						}
					}
					insItem.setSplitCgWgt(Integer.toString(wgt - Integer.parseInt(insItem.getSplitCgWgt())));
					insItem.setSplitCgVol(Float.toString(vol - Float.parseFloat(insItem.getSplitCgVol())));
					insItem.setSplitPkgQty(Integer.toString(pkgQty - Integer.parseInt(insItem.getPkgQty())));
					updateItems.addUpdateItem(insItem);
					blDao.updateOriginalBlWgt(updateItems);
					
					if(item.getCgTpCd().equals(CodeConstant.MT_CGTP_BBK) && !insItem.getOrgBlNo().equals("")) {
						updateSplitPackageItems(insItem);
					}
				} else {
					blDao.deletePackageItems(item);
				}
			}
		}
		blDao.deleteBlItems(parm);
	}
	
	private void insertBlDetail(BLItem item)throws BizException {
		ArrayList<BLItem> blDtlArr = item.getBlDetailItems();
		
		blDao.deleteBlCargoDetailItems(item);
		
		for(int i=0; i<blDtlArr.size(); i++) {
			if(blDtlArr.get(i).getAction() != null && !blDtlArr.get(i).getAction().equals(DAOProcessType.DELETE)) {
				BLItem cudItem = (BLItem) item.clone();
				
				cudItem.setHatchNo(blDtlArr.get(i).getHatchNo());
				cudItem.setWgt(blDtlArr.get(i).getWgt());
				cudItem.setMsrmt(blDtlArr.get(i).getMsrmt());
				cudItem.setPkgQty(blDtlArr.get(i).getPkgQty());
				
				blDao.insertBlCargoDetailItems(cudItem);
			}
		}
	}
	
	private void insertROROData(BLItem item)throws BizException {
		ArrayList<BLItem> unitArr = item.getUnitItems();
		blDao.deleteRoRoItems(item);
		
		for(int i=0; i<unitArr.size(); i++) {
			if(unitArr.get(i).getAction() != null && !unitArr.get(i).getAction().equals(DAOProcessType.DELETE)) {
				BLItem cudItem = (BLItem) item.clone();
				
				cudItem.setUnitNo(unitArr.get(i).getUnitNo());
				cudItem.setBrandCd(unitArr.get(i).getBrandCd());
				cudItem.setModelCd(unitArr.get(i).getModelCd());
				cudItem.setRoroMt(unitArr.get(i).getRoroMt());
				cudItem.setCbm(unitArr.get(i).getCbm());
				cudItem.setNewYn(unitArr.get(i).getNewYn());
				cudItem.setIxCd("I");
				
				blDao.insertRoRoItems(cudItem);
			}
		}
	}
	
	public void insertPkgDetailData(BLItem item)throws BizException {
		ArrayList<BLItem> pkgArr = item.getPkgItems();
		blDao.deletePackageItems(item);
		
		for(int i=0; i<pkgArr.size(); i++) {
			if(pkgArr.get(i).getAction() != null && !pkgArr.get(i).getAction().equals(DAOProcessType.DELETE)) {
				BLItem cudItem = (BLItem) item.clone();
				
				cudItem.setPkgMt(pkgArr.get(i).getPkgMt());
				cudItem.setPkgDesc(pkgArr.get(i).getPkgDesc());
				cudItem.setPkgNo(pkgArr.get(i).getPkgNo());
				cudItem.setPkgM3(pkgArr.get(i).getPkgM3());
				cudItem.setWidth(pkgArr.get(i).getWidth());
				cudItem.setHeight(pkgArr.get(i).getHeight());
				cudItem.setLength(pkgArr.get(i).getLength());
				cudItem.setMfDocId(item.getMfDocId());
				cudItem.setBlNo(item.getBlNo());
				cudItem.setOpClassCd(item.getOpClassCd());
				cudItem.setPkgTpCd(item.getPkgTpCd());
				cudItem.setPkgRmk(pkgArr.get(i).getPkgRmk());
				
				if(item.getChangeSplit() != null && item.getChangeSplit().equals(CommonConstants.Y)) {
					cudItem.setOrgBlNo(item.getOrgBlNo());
				}
				
				blDao.insertPackageItems(cudItem);
			}
		}
	}
	
	public void updatePkgDetailData(BLItem item)throws BizException {
		ArrayList<BLItem> pkgArr = item.getPkgItems();
		
		for(int i=0; i<pkgArr.size(); i++) {
			if(pkgArr.get(i).getAction() != null && !pkgArr.get(i).getAction().equals(DAOProcessType.DELETE)) {
				BLItem cudItem = (BLItem) item.clone();

				cudItem.setPkgMt(pkgArr.get(i).getPkgMt());
				cudItem.setPkgDesc(pkgArr.get(i).getPkgDesc());
				cudItem.setPkgNo(pkgArr.get(i).getPkgNo());
				cudItem.setPkgM3(pkgArr.get(i).getPkgM3());
				cudItem.setPkgMt(pkgArr.get(i).getPkgMt());
				cudItem.setWidth(pkgArr.get(i).getWidth());
				cudItem.setHeight(pkgArr.get(i).getHeight());
				cudItem.setLength(pkgArr.get(i).getLength());
				cudItem.setMfDocId(item.getMfDocId());
				cudItem.setBlNo(item.getBlNo());
				cudItem.setOpClassCd(item.getOpClassCd());
				cudItem.setPkgTpCd(item.getPkgTpCd());
				cudItem.setOrgBlNo(item.getOrgBlNo());
				
				blDao.updatePackageItems(cudItem);
			}
		}
	}
	
	public void updateSplitPackageItems(BLItem item)throws BizException {
		if(!DAOProcessType.DELETE.equals(item.getAction())) {
			BLItem cudItem = (BLItem) item.clone();

			cudItem.setPkgMt(item.getPkgMt());
			cudItem.setPkgDesc(item.getPkgDesc());
			cudItem.setPkgNo(item.getPkgNo());
			cudItem.setPkgM3(item.getPkgM3());
			cudItem.setPkgMt(item.getPkgMt());
			cudItem.setWidth(item.getWidth());
			cudItem.setHeight(item.getHeight());
			cudItem.setLength(item.getLength());
			cudItem.setMfDocId(item.getMfDocId());
			cudItem.setBlNo(item.getBlNo());
			cudItem.setOpClassCd(item.getOpClassCd());
			cudItem.setPkgTpCd(item.getPkgTpCd());
			cudItem.setOrgBlNo(item.getOrgBlNo());
			
			blDao.updateSplitPackageItems(cudItem);
		} else {
			blDao.deletePackageItems(item);
		}
	}
	
	private void insertManifest(BLItem item)throws BizException {
		SearchBLParm blParm = new SearchBLParm();
		
		blParm.setVslCallId(item.getVslCallId());
		blParm.setMfDocId(item.getOldMfDocId());
		blParm.setCatgCd(item.getOpClassCd());
		
		DataItemList blList = blDao.checkNilManifest(blParm);
		
		if(blList.size() == 0) {
			BLItem mfItem = new BLItem();
			
			mfItem.setVslCallId(item.getVslCallId());
			mfItem.setMfDocId(item.getOldMfDocId());
			mfItem.setOpClassCd(item.getOpClassCd());
			
			blDao.deleteManifest(mfItem);
		}
		
		blParm.setMfDocId(item.getMfDocId());
		
		DataItemList manList = blDao.checkManifest(blParm);
		
		if(manList.size() == 0) {
			BLItem mfItem = new BLItem();
			
			mfItem.setVslCallId(item.getVslCallId());
			mfItem.setVslCd(item.getVslCd());
			mfItem.setCallYear(item.getCallYear());
			mfItem.setCallSeq(item.getCallSeq());
			mfItem.setMfDocId(item.getMfDocId());
			mfItem.setOpClassCd(item.getOpClassCd());
			mfItem.setUserId(item.getUserId());
			mfItem.setScn(item.getScn());
			
			blDao.insertManifestItems(mfItem);
		}
	}
	
	private void insertTerminalHoldItems(BLItem item)throws BizException {
		if("AP".equals(item.getDocStatCd())) {
			InsertItemsBizParm insertParm = new InsertItemsBizParm();
			DataItemList insertItems = new DataItemList();
			
			TerminalHoldReleaseControlItem holdItem = new TerminalHoldReleaseControlItem();
			holdItem.setVslCallId(item.getVslCallId());
			holdItem.setIe("I");
			holdItem.setDocNo(item.getMfDocId());
			holdItem.setCgNo(item.getBlNo());
			holdItem.setUserId(item.getUserId());
			holdItem.setOpToBeStopped("IMT");
			holdItem.setOpToBeStoppedNm("IMT REPORT");
			holdItem.setScn(item.getScn());
			holdItem.setVslCd(item.getVslCd());
			holdItem.setCallSeq(item.getCallSeq());
			holdItem.setCallYear(item.getCallYear());
			
			//In case Barge, generate reason as null
			if("BRGE".equals(item.getVslTp())) {
				holdItem.setVslTp("BRGE");
			}else {
				holdItem.setVslTp("");
				holdItem.setHoldReasonCd("T2");//Document Hold
				holdItem.setHoldReasonDesc("DOCUMENT HOLD");	
			}
			
			insertItems.add(holdItem);
			
			
			//In case Barge, generate reason as null
			if("BRGE".equals(item.getVslTp())) {
				holdItem.setVslTp("BRGE");
			}else {
				TerminalHoldReleaseControlItem holdItem2 = (TerminalHoldReleaseControlItem)holdItem.clone();
				holdItem.setVslTp("");
				holdItem.setHoldReasonCd("T3");//Billing Hold
				holdItem.setHoldReasonDesc("BILLING HOLD");		
				insertItems.add(holdItem2);
			}
			
			
			insertParm.setInsertItems(insertItems);
			
			terminalHoldReleaseControlDao.insertItems(insertParm);
		}
	}
	
	public void updateConfirmDeliveryStatus(UpdateItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getUpdateItems();
		for(BLItem item: (ArrayList<BLItem>)itemList.getCollection()) {
			if(item == null)
				return;
			
			//Release Document Hold
			if("AP".equals(item.getDocStatCd())) {
				UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
				DataItemList updateItems = new DataItemList();
				
				TerminalHoldReleaseControlItem releaseItem = new TerminalHoldReleaseControlItem();
				releaseItem.setVslCallId(item.getVslCallId());
				releaseItem.setIe("I");
				releaseItem.setDocNo(item.getMfDocId());
				releaseItem.setCgNo(item.getBlNo());
				releaseItem.setUserId(item.getUserId());
				releaseItem.setOpToBeStopped("IMT");
				releaseItem.setHoldReasonCd("T2");//Document Hold
				
				releaseItem.setReleaseCheck("Y");
				releaseItem.setReleaseBy(item.getUserId());
				releaseItem.setReleaseRemark("Released from BL screen");
				updateItems.add(releaseItem);
				updateParm.setUpdateItems(updateItems);
				
				terminalHoldReleaseControlDao.updateItems(updateParm);
			}
		}
	}
	
	public void updateDoWgt(UpdateItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getUpdateItems();
		for(BLItem item: (ArrayList<BLItem>)itemList.getCollection()) {
			if(item == null) {
				return;
			}
			
			blDao.updateDoWgt(parm);
		}
	}
}
