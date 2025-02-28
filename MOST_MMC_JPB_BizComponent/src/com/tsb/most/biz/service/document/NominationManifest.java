package com.tsb.most.biz.service.document;

import java.util.ArrayList;
import java.util.Iterator;

import com.tsb.most.basebiz.component.fileupload.IFileUpload;
import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.basebiz.parm.fileupload.SearchFileUploadParm;
import com.tsb.most.biz.dao.document.IDGDeclarationDao;
import com.tsb.most.biz.dao.document.INominationManifestDao;
import com.tsb.most.biz.dataitem.document.DGDeclarationItem;
import com.tsb.most.biz.dataitem.document.NominationManifestItem;
import com.tsb.most.biz.parm.document.SearchNominationManifestParm;
import com.tsb.most.biz.parm.document.SearchValidationCodeParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.response.RestResponse;

public class NominationManifest extends MOSTBaseService implements INominationManifest {

	private INominationManifestDao nominationManifestDao;
	private IDGDeclarationDao dgDeclarationDao;
	private IFileUpload fileUpload;

	public void setNominationManifestDao(INominationManifestDao nominationManifestDao) {
		this.nominationManifestDao = nominationManifestDao;
	}

	public void setDgDeclarationDao(IDGDeclarationDao dgDeclarationDao) {
		this.dgDeclarationDao = dgDeclarationDao;
	}

	public void setFileUpload(IFileUpload fileUpload) {
		this.fileUpload = fileUpload;
	}

	@Override
	public void processNominationManifestItem(UpdateItemsBizParm parm) throws BizException {
		NominationManifestItem item = (NominationManifestItem) parm.getDataItem();

		DataItemList insertDGItems = new DataItemList();
		DataItemList updateDGItems = new DataItemList();
		DataItemList insertItems = new DataItemList();
		DataItemList updateItems = new DataItemList();
		FileUploadItem fileUploadItem = new FileUploadItem();

		UpdateBizParm<FileUploadItem> cudParm = new UpdateBizParm<FileUploadItem>();
		SearchNominationManifestParm chkParm = new SearchNominationManifestParm();

		DataItemList dgNoList = null;
		String newDgSeq = "";

		for (NominationManifestItem nomiItem : item.getItems()) {
			chkParm.setDocId(nomiItem.getDocId());
			chkParm.setJobNo(nomiItem.getJobNo());
			chkParm.setVslCallId(nomiItem.getVslCallId());
			chkParm.setBlNo(nomiItem.getBlNo());
			chkParm.setFwdCd(nomiItem.getFwdCd());

			if ("Y".equals(nomiItem.getInsDGYn())) {
				if (("null".equalsIgnoreCase(nomiItem.getDgSeq())) || "".equalsIgnoreCase(nomiItem.getDgSeq().trim())) {
					dgNoList = dgDeclarationDao.getDGDeclarationNoList(null);
					newDgSeq = ((DGDeclarationItem) (dgNoList.get(0))).getSeq();
					nomiItem.setDgSeq(newDgSeq);
					insertDGItems.add(nomiItem);
				} else {
					updateDGItems.add(nomiItem);
				}

				// DG UPLOAD FILE KHH
				ArrayList<FileUploadItem> spFileUploadtems = nomiItem.getUploadItems();
				fileUploadItem.setItems(spFileUploadtems);
				fileUploadItem.setUserId(nomiItem.getUserId());
				cudParm.setDataItem(fileUploadItem);
				this.fileUpload.applyUploadItems(cudParm);

			}

			if (nominationManifestDao.chkNominationManifest(chkParm)) {
				updateItems.add(nomiItem);
			} else {
				insertItems.add(nomiItem);
			}
		}

		if (insertDGItems.size() > 0) {
			nominationManifestDao.insertNominationManifestDGItems(parm.getTxTraceinfo(), insertDGItems);
		}

		if (updateDGItems.size() > 0) {
			nominationManifestDao.updateNominationManifestDGItems(parm.getTxTraceinfo(), updateDGItems);
		}

		if (insertItems.size() > 0) {
			nominationManifestDao.insertNominationManifestItems(parm.getTxTraceinfo(), insertItems);
		}

		if (updateItems.size() > 0) {
			nominationManifestDao.updateNominationManifestItems(parm.getTxTraceinfo(), updateItems);
		}

	}

	@Override
	public DataItemList getNominationManifestList(SearchNominationManifestParm parm) throws BizException {
		NominationManifestItem returnItem = new NominationManifestItem();
		DataItemList arrlist = null;
		if (parm.getSearchType().equalsIgnoreCase("dg")) {
			arrlist = nominationManifestDao.getDgSeq(parm);
		} else {
			arrlist = nominationManifestDao.getNominationManifestList(parm);
			RestResponse response = new RestResponse();

			return arrlist;
		}

		return arrlist;
	}

	@Override
	public void insertNominationManifestItems(UpdateItemsBizParm parm) throws BizException {
		DataItemList items = parm.getUpdateItems();

		for (Iterator it = items.getCollection().iterator(); it.hasNext();) {
			NominationManifestItem itm = (NominationManifestItem) it.next();
		}

		nominationManifestDao.insertNominationManifestItems(parm.getTxTraceinfo(), items);
	}

	@Override
	public DataItemList getValidationCode(SearchValidationCodeParm parm) throws BizException {

		DataItemList returnItem = nominationManifestDao.getValidationCode(parm);

		return returnItem;
	}
	
	@Override
	public void applyFileUploadItems(UpdateItemsBizParm parm) throws BizException {
		UpdateBizParm<FileUploadItem> deleteItems = new UpdateBizParm<FileUploadItem>();
		FileUploadItem fileUploadItem = new FileUploadItem();
		SearchFileUploadParm prevParm = new SearchFileUploadParm();
		
		ArrayList<FileUploadItem> fileUploadList = (ArrayList<FileUploadItem>) parm.getUpdateItems().getCollection();
		
		//Delete previous file.
		
//		FileUploadItem masterItem = fileUploadList.get(0);
//		
//		prevParm.setCatgCd(masterItem.getCatgCd());
//		prevParm.setPgmId(masterItem.getPgmId());
//		
//		DataItemList prevItem = fileUpload.selectFileList(prevParm);
//
//		this.nominationManifestDao.deleteFile(null, prevItem);
		
		if (fileUploadList != null && fileUploadList.size() > 0) {		
			UpdateBizParm<FileUploadItem> cudParm = new UpdateBizParm<FileUploadItem>();
			cudParm.setUserId(((FileUploadItem) (parm.getUpdateItems().getCollection().get(0))).getUserId());
			
			fileUploadItem.setItems(fileUploadList);
			fileUploadItem.setUserId(((FileUploadItem) (parm.getUpdateItems().getCollection().get(0))).getUserId());
			
			cudParm.setDataItem(fileUploadItem);
			cudParm.setUserId(((FileUploadItem) (parm.getUpdateItems().getCollection().get(0))).getUserId());
			
			this.fileUpload.applyUploadItems(cudParm);
		}
	}	
}
