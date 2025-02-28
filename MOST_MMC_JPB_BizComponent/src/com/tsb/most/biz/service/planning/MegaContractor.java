package com.tsb.most.biz.service.planning;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.basebiz.component.fileupload.IFileUpload;
import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.basebiz.parm.fileupload.SearchFileUploadParm;
import com.tsb.most.biz.dao.planning.IMegaContractorDao;
import com.tsb.most.biz.dataitem.planning.MegaItem;
import com.tsb.most.biz.parm.planning.SearchMegaParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class MegaContractor extends MOSTBaseService implements IMegaContractor {

	private IMegaContractorDao megaContractorDao;
	private IFileUpload fileUpload;

	public IMegaContractorDao getMegaContractorDao() {
		return megaContractorDao;
	}

	public void setMegaContractorDao(IMegaContractorDao megaContractorDao) {
		this.megaContractorDao = megaContractorDao;
	}

	public void setFileUpload(IFileUpload fileUpload) {
		this.fileUpload = fileUpload;
	}

	@Override
	public DataItemList getMegaContractorList(SearchMegaParm parm) throws BizException {
		return megaContractorDao.getMegaContractorList(parm);
	}

	@Override
	public DataItemList selectFileList(SearchFileUploadParm parm) throws BizException {
		return this.fileUpload.selectFileList(parm);
	}

	@Override
	public DataItemList updateItem(UpdateItemsBizParm parm) throws BizException {
		MegaItem updateItem = (MegaItem) parm.getUpdateItem();
		FileUploadItem fileUploadItem = new FileUploadItem();
		List<FileUploadItem> fileUploadItems = updateItem.getUploadItems();

		if (fileUploadItems != null && fileUploadItems.size() > 0) {
			UpdateBizParm<FileUploadItem> updateBizParm = new UpdateBizParm<>();
			updateBizParm.setUserId(updateItem.getUserId());

			fileUploadItem.setItems((ArrayList<FileUploadItem>) fileUploadItems);
			fileUploadItem.setUserId(updateItem.getUserId());
			
			updateBizParm.setDataItem(fileUploadItem);
			
			fileUpload.applyUploadItems(updateBizParm);
		}
		
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		DataItemList updateItems = new DataItemList();
		
		updateItems.add(updateItem);
		updateParm.setUpdateItems(updateItems);
		
		megaContractorDao.updateMegaOperItems(updateParm);
		
		return updateItems;
	}
	
	@Override
	public DataItemList denyMegaOperItem(UpdateItemsBizParm parm) throws BizException {
		 return megaContractorDao.updateMegaOperItems(parm);
	} 

}
