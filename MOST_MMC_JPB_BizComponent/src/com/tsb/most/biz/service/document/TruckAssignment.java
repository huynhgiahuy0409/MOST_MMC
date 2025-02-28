package com.tsb.most.biz.service.document;

import java.util.ArrayList;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.basebiz.component.fileupload.IFileUpload;
import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.basebiz.parm.fileupload.SearchFileUploadParm;
import com.tsb.most.biz.dao.document.ITruckAssignmentDao;
import com.tsb.most.biz.dataitem.document.TruckAssignmentItem;
import com.tsb.most.biz.parm.document.SearchTruckAssignmentParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class TruckAssignment extends MOSTBaseService implements ITruckAssignment {

	private ITruckAssignmentDao truckAssignmentDao;
	private IFileUpload fileUpload;

	public void setTruckAssignmentDao(ITruckAssignmentDao truckAssignmentDao) {
		this.truckAssignmentDao = truckAssignmentDao;
	}
	//////////////////////////////////////////////////////////////////////////////

	public void setFileUpload(IFileUpload fileUpload) {
		this.fileUpload = fileUpload;
	}

	public DataItemList selectGoodReceiptItems(SearchTruckAssignmentParm parm) throws BizException {
		return truckAssignmentDao.selectGoodReceiptItems(parm);
	}
	
	public DataItemList selectSubDoNoItems(SearchTruckAssignmentParm parm) throws BizException {
		return truckAssignmentDao.selectSubDoNoItems(parm);
	}
	
	public DataItemList selectGoodReceiptItemforAssigment(SearchTruckAssignmentParm parm) throws BizException {
		return truckAssignmentDao.selectGoodReceiptItemforAssigment(parm);
	}

	public DataItemList selectChangeBLSNo(SearchTruckAssignmentParm parm) throws BizException {
		DataItemList result = new DataItemList();
		
		if (parm.getSearchType().equals("chgBlNo")) {
			result = truckAssignmentDao.selectChangeBLSNo(parm);
		}
		
		return result;
	}
	
	public DataItemList selectFileList(SearchTruckAssignmentParm parm) throws BizException{
		SearchFileUploadParm fileUploadParm = new SearchFileUploadParm();
		fileUploadParm.setCatgCd(parm.getCatgCd());
		fileUploadParm.setPgmId(parm.getPgmId());
		
		return this.fileUpload.selectFileList(fileUploadParm);
	}

	public DataItemList selectTruckAssignmentItems(SearchTruckAssignmentParm parm) throws BizException {
		return truckAssignmentDao.selectTruckAssignmentItems(parm);
	}

	public DataItemList selectTruckRegistrationItems(SearchTruckAssignmentParm parm) throws BizException {
		return truckAssignmentDao.selectTruckRegistrationItems(parm);
	}
	
	public DataItemList selectDriverRegistrationItems(SearchTruckAssignmentParm parm) throws BizException {
		return truckAssignmentDao.selectDriverRegistrationItems(parm);
	}
	
	public DataItemList selectInternalMovementTicketReport(SearchTruckAssignmentParm parm) throws BizException {
		return truckAssignmentDao.selectInternalMovementTicketReport(parm);
	}

	public DataItemList insertTruckAssignment(InsertItemsBizParm parm) throws BizException {
		DataItemList items = parm.getInsertItems();
		// File Upload CUD
		UpdateBizParm<FileUploadItem> cudParm = new UpdateBizParm<FileUploadItem>();
		cudParm.setUserId(((TruckAssignmentItem)parm.getInsertItems().get(0)).getUserId());
		
		TruckAssignmentItem masterItem = (TruckAssignmentItem)items.get(0);
    	masterItem.setUserId(((TruckAssignmentItem)parm.getInsertItems().get(0)).getUserId());
    	
		
		FileUploadItem fileUploadItem = new FileUploadItem();
    	fileUploadItem.setUserId(((TruckAssignmentItem)parm.getInsertItems().get(0)).getUserId());
	    
	    ArrayList<FileUploadItem> spFileUploadtems = masterItem.getUploadItems();
	    
	    if (spFileUploadtems.size() > 0)  {
		   fileUploadItem.setItems(spFileUploadtems);
		   fileUploadItem.setUserId(((TruckAssignmentItem)parm.getInsertItems().get(0)).getUserId());
		   cudParm.setDataItem(fileUploadItem);
		   cudParm.setUserId(((TruckAssignmentItem)parm.getInsertItems().get(0)).getUserId());
		    
		   this.fileUpload.applyUploadItems(cudParm);
	   }	    
				
		return truckAssignmentDao.insertTruckAssignment(parm);
	}

	public DataItemList updateTruckAssignment(UpdateItemsBizParm parm) throws BizException {
		DataItemList items = parm.getUpdateItems();
		 // File Upload CUD
		UpdateBizParm<FileUploadItem> fileUploadParm = new UpdateBizParm<FileUploadItem>();
		
		TruckAssignmentItem masterItem = (TruckAssignmentItem)items.get(0);
		masterItem.setUserId(((TruckAssignmentItem)parm.getUpdateItems().get(0)).getUserId());
   	
		FileUploadItem fileUploadItem = new FileUploadItem();
	    
	    ArrayList<FileUploadItem> spFileUploadtems = masterItem.getUploadItems();
	    fileUploadItem.setItems(spFileUploadtems);
	    fileUploadItem.setUserId(((TruckAssignmentItem)parm.getUpdateItems().get(0)).getUserId());
	    fileUploadParm.setDataItem(fileUploadItem);
	    fileUploadParm.setUserId(((TruckAssignmentItem)parm.getUpdateItems().get(0)).getUserId());
	    
	    this.fileUpload.applyUploadItems(fileUploadParm);
		
		return truckAssignmentDao.updateTruckAssignment(parm);
	}

	public void deleteTruckAssignment(DeleteItemsBizParm parm) throws BizException {
		DataItemList items = parm.getDeleteItems();
		
		TruckAssignmentItem masterItem = (TruckAssignmentItem)items.get(0);
    	masterItem.setUserId(parm.getUserId());
    	
		 // File Upload CUD
		UpdateBizParm<FileUploadItem> cudParm = new UpdateBizParm<FileUploadItem>();
		cudParm.setUserId(parm.getUserId());
		cudParm.setWorkingStatus(DAOProcessType.DELETE);
    	
	    SearchFileUploadParm fileUploadParm = new SearchFileUploadParm();
        fileUploadParm.setCatgCd(masterItem.getVslCallId() + "/" + masterItem.getSubDoNo() + "/" + masterItem.getGrNo());
        fileUploadParm.setPgmId("DM108");
        
		truckAssignmentDao.deleteTruckAssignment(parm);
	}

	@Override
	public DataItemList processQrCode(UpdateItemsBizParm parm) throws BizException {
		// TODO Auto-generated method stub
		return truckAssignmentDao.processQrCode(parm);
	}

}
