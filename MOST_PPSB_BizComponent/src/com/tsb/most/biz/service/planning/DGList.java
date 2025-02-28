package com.tsb.most.biz.service.planning;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.basebiz.component.fileupload.IFileUpload;
import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.basebiz.parm.fileupload.SearchFileUploadParm;
import com.tsb.most.biz.dao.planning.IDGListDao;
import com.tsb.most.biz.dataitem.planning.DGListItem;
import com.tsb.most.biz.parm.planning.SearchDGListParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.response.RestResponse;

public class DGList extends MOSTBaseService implements IDGList {
	
	private IDGListDao dgListDao;
	private IFileUpload fileUpload;
	
	public void setDgListDao(IDGListDao dgListDao) {
        this.dgListDao = dgListDao;
    }
	public void setFileUpload(IFileUpload fileUpload) {
		this.fileUpload = fileUpload;
	}
	
	@Override
	public DataItemList getDGList(SearchDGListParm parm) throws BizException {
		return dgListDao.getDGList(parm);
	}

	@Override
	public DataItemList getDGDetail(SearchDGListParm parm) throws BizException {
		DataItemList detailList = dgListDao.getDGDetail(parm);
		DataItemList resultList = new DataItemList();
		
        if (detailList.size() > 0) {
            DGListItem returnItem = (DGListItem) detailList.get(0);
            
            // FILE UPLOAD LIST
            SearchFileUploadParm fileUploadParm = new SearchFileUploadParm();
            fileUploadParm.setCatgCd(parm.getCatgCd());
            fileUploadParm.setPgmId(parm.getPgmId());
            DataItemList fileUploadResponse = this.fileUpload.selectFileList(fileUploadParm);
            returnItem.setUploadItems(new ArrayList<>(fileUploadResponse.getCollection()));            
            resultList.add(returnItem);
        }
        return resultList;
	}
		
	@Override
	public DataItemList getSubstanceItems(SearchDGListParm parm) throws BizException {
		return dgListDao.getSubstanceItems(parm);
	}

	
	@Override
	public DataItemList processDGDetail(UpdateItemsBizParm parm) throws BizException {
	    DGListItem item = (DGListItem) parm.getUpdateItems().get(0);
	    FileUploadItem fileUploadItem = new FileUploadItem();

	    ArrayList<FileUploadItem> spFileUploadItems = item.getUploadItems();

	    if (spFileUploadItems != null && spFileUploadItems.size() > 0) {
	        // File Upload CUD
	        UpdateBizParm<FileUploadItem> cudParm = new UpdateBizParm<FileUploadItem>();
	        String userId = ((DGListItem) parm.getUpdateItems().get(0)).getUserId();

	        fileUploadItem.setItems(spFileUploadItems);
	        fileUploadItem.setUserId(userId);
	        fileUploadItem.setUfileName(fileUploadItem.getItems().get(0).getUfileName());
	        
	        cudParm.setUserId(userId);
	        cudParm.setDataItem(fileUploadItem);
	        
	        this.fileUpload.applyUploadItems(cudParm);
	    }

	    return dgListDao.updateDGDetail(parm);
	}


}
