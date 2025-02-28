package com.tsb.most.biz.service.document;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.basebiz.component.fileupload.IFileUpload;
import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.basebiz.parm.fileupload.SearchFileUploadParm;
import com.tsb.most.biz.dao.document.IDGDeclarationDao;
import com.tsb.most.biz.dataitem.document.DGDeclarationItem;
import com.tsb.most.biz.parm.document.SearchDGDeclarationParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class DGDeclaration extends MOSTBaseService implements IDGDeclaration {
	private IDGDeclarationDao dgDeclarationDao;
	private IFileUpload fileUpload;

	public void setDgDeclarationDao(IDGDeclarationDao dgDeclarationDao) {
		this.dgDeclarationDao = dgDeclarationDao;
	}

	public void setFileUpload(IFileUpload fileUpload) {
		this.fileUpload = fileUpload;
	}

	/*
	 * Biz methods:
	 * */
	public DataItemList getDGDeclarationItems(SearchDGDeclarationParm parm) throws BizException {
		DataItemList returnItem = new DataItemList();
		if (parm.getSearchType().equals("detailList")) {
			DataItemList detailList = dgDeclarationDao.getDGDeclarationItems(parm);

			if (detailList.getCollection() != null && detailList.getCollection().size() > 0) {
				DGDeclarationItem dgItem = (DGDeclarationItem) detailList.get(0);
				// FILE UPLOAD LIST
				SearchFileUploadParm fileUploadParm = new SearchFileUploadParm();
				fileUploadParm.setCatgCd(parm.getCatgCd());
				fileUploadParm.setPgmId(parm.getPgmId());
				
				ArrayList<FileUploadItem> arrayList = (ArrayList<FileUploadItem>)this.fileUpload.selectFileList(fileUploadParm).getCollection();
				
				dgItem.setUploadItems(arrayList);
			}
			return detailList;
		} else if (parm.getSearchType().equals("substance")) {
			return dgDeclarationDao.getSubstanceItems(parm);
		} else if (parm.getSearchType().equals("dgReport")) {
			return dgDeclarationDao.getDgReport(parm);
		} else if (parm.getSearchType().equals("vesselInfo")) {
			return dgDeclarationDao.getVesselInfoItems(parm);
		} else if (parm.getSearchType().equals("viewDGDeclaration")) {
			// DGDeclaration item[0]
			// WHERE TMT_DG.SEQ
			List detailList = dgDeclarationDao.getDGDeclarationItems(parm).getCollection();
			returnItem.add(detailList);

			DGDeclarationItem itm = null;
			if (detailList.size() > 0) {
				itm = (DGDeclarationItem) detailList.get(0);
			}

			if (itm != null) {
				parm.setUnno(itm.getUnno());
				parm.setImdg(itm.getImdg());
			}
			// Vessel Information[1]
			// WHERE VSL_CD AND CALL_YEAR AND CALL_SEQ
			List vesselInfoList = dgDeclarationDao.getVesselInfoItems(parm).getCollection();
			returnItem.add(vesselInfoList);

			// Substance[2]
			List substanceList = dgDeclarationDao.getSubstanceItems(parm).getCollection();
			returnItem.add(substanceList);
		}

		return returnItem;
	}
}
