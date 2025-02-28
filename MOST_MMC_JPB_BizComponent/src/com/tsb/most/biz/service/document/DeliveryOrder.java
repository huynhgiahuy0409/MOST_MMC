package com.tsb.most.biz.service.document;

import java.util.ArrayList;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.component.fileupload.IFileUpload;
import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.biz.dao.document.IDeliveryOrderDao;
import com.tsb.most.biz.dataitem.document.BLItem;
import com.tsb.most.biz.dataitem.document.DeliveryOrderItem;
import com.tsb.most.biz.parm.document.SearchDeliveryOrderParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.exception.DaoException;

public class DeliveryOrder extends MOSTBaseService implements IDeliveryOrder {
	private IDeliveryOrderDao deliveryOrderDao;
	private IFileUpload fileUpload;
	
	public void setDeliveryOrderDao(IDeliveryOrderDao deliveryOrderDao) {
		this.deliveryOrderDao = deliveryOrderDao;
	}
	
	public void setFileUpload(IFileUpload fileUpload) {
		this.fileUpload = fileUpload;
	}

	public DataItemList selectDeliveryOrder(SearchDeliveryOrderParm parm) throws BizException{
		return deliveryOrderDao.selectDeliveryOrder(parm);
	}
	
	public DataItemList getWhCheckDataForIndirect(SearchDeliveryOrderParm parm) throws BizException{
		return deliveryOrderDao.getWhCheckDataForIndirect(parm);
	}
	
	public DataItemList getApronCheckDataForIndirect(SearchDeliveryOrderParm parm) throws BizException{
		return deliveryOrderDao.getApronCheckDataForIndirect(parm);
	}
	
	public DataItemList selectDeliveryOrderDetail(SearchDeliveryOrderParm parm) throws BizException {               
		return deliveryOrderDao.selectDeliveryOrder(parm);
    }
	
	public DataItemList selectSubDeliveryOrder(SearchDeliveryOrderParm parm) throws BizException{
		return deliveryOrderDao.selectSubDeliveryOrder(parm);
	}
	
	public DataItemList selectCargoMasterList(SearchCargoMasterParm parm) throws BizException {
        return deliveryOrderDao.selectCargoMasterList(parm);
    }
	
	public DataItemList subDoNoDuplicateChk(SearchDeliveryOrderParm parm) throws BizException {
        return deliveryOrderDao.subDoNoDuplicateChk(parm);
    }
	
	public DataItemList selectPackageItems(SearchDeliveryOrderParm parm) throws BizException{
		return deliveryOrderDao.selectPackageItems(parm);
	}
	
	public DataItemList selectDeliveryOrderWgtCheck(SearchDeliveryOrderParm parm) throws BizException{
		return deliveryOrderDao.selectDeliveryOrderWgtCheck(parm);
	}
	
	public DataItemList selectSubDeliveryOrderReport(SearchDeliveryOrderParm parm) throws BizException{
		return deliveryOrderDao.selectSubDeliveryOrderReport(parm);
	}
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
		DataItemList returnList = parm.getInsertItems();
		DeliveryOrderItem item = (DeliveryOrderItem)returnList.get(0);
		FileUploadItem fileUploadItem = new FileUploadItem();
		
		if(item.getDelvTpCd().equals(CodeConstant.MT_DELVTP_D)){
			item.setMt(item.getDmt());
			item.setM3(item.getDm3());
			item.setQty(item.getDqty());
		}else if(item.getDelvTpCd().equals(CodeConstant.MT_DELVTP_I)){
			item.setMt(item.getImt());
			item.setM3(item.getIm3());
			item.setQty(item.getIqty());
		}
		
		
		//file upload function
		ArrayList<FileUploadItem> fileuploadList = (ArrayList<FileUploadItem>) item.getUploadItems();
		
		if (fileuploadList != null && fileuploadList.size() > 0) {
			// File Upload CUD
			UpdateBizParm<FileUploadItem> cudParm = new UpdateBizParm<FileUploadItem>();
			cudParm.setUserId(((DeliveryOrderItem)parm.getInsertItems().get(0)).getUserId());
				
			fileUploadItem.setItems(fileuploadList);
			fileUploadItem.setUserId(((DeliveryOrderItem)parm.getInsertItems().get(0)).getUserId());
			
			cudParm.setDataItem(fileUploadItem);
			cudParm.setUserId(((DeliveryOrderItem)parm.getInsertItems().get(0)).getUserId());
			    
			this.fileUpload.applyUploadItems(cudParm);
		}
		
    	deliveryOrderDao.updateBLItems(item);
		return deliveryOrderDao.insertItems(parm);
	}
	
	private void insertROROData(DeliveryOrderItem item) throws DaoException {
		ArrayList<BLItem> unitArr = item.getUnitItems();
		//1.Delete first then insert again
//		blDao.deleteRoRoItems(item);
		
		for(int i=0; i<unitArr.size(); i++) {
			if(!"D".equals(unitArr.get(i).getAction())) {
				BLItem unitItems = new BLItem();
				unitItems.setVslCd(unitArr.get(i).getVslCd());
				unitItems.setCallYear(unitArr.get(i).getCallYear());
				unitItems.setCallSeq(unitArr.get(i).getCallSeq());
				unitItems.setVslCallId(unitArr.get(i).getVslCallId());
				unitItems.setMfDocId(unitArr.get(i).getMfDocId());
				unitItems.setBlNo(unitArr.get(i).getBlNo());
				unitItems.setDoNo(item.getDono());
				unitItems.setSdoNo(item.getSdono());
				unitItems.setCmdtCd(item.getCmdtcd());
				unitItems.setCgTpCd(item.getCgtpcd());
				unitItems.setPkgTpCd(item.getPkgtpcd());
				unitItems.setUnitNo(unitArr.get(i).getUnitNo());
				unitItems.setBrandCd(unitArr.get(i).getBrandCd());
				unitItems.setModelCd(unitArr.get(i).getModelCd());
				unitItems.setRoroMt(unitArr.get(i).getRoroMt());
				unitItems.setCbm(unitArr.get(i).getCbm());
				unitItems.setNewYn(unitArr.get(i).getNewYn());
				unitItems.setIxCd("I");
				unitItems.setDelvTpCd(item.getDelvTpCd());
				unitItems.setUserId(item.getUserId());
				
				//2. Insert
	    		SearchCargoMasterParm mstParm = new SearchCargoMasterParm();
	            mstParm.setVslCallId(unitItems.getVslCallId());
				mstParm.setCgNo(unitItems.getBlNo());
                mstParm.setVslCallId(unitItems.getVslCallId());
                mstParm.setUnitNo(unitItems.getUnitNo());
				if (deliveryOrderDao.selectIsROROMst(mstParm)) {
					deliveryOrderDao.updateRoRoItems(unitItems);
				}else {
					deliveryOrderDao.insertRoRoItems(unitItems);
				}
				
			}
		}
	}

	public DataItemList insertSubDeliveryOrderItems(InsertItemsBizParm parm) throws BizException {
		SearchDeliveryOrderParm doParm = new SearchDeliveryOrderParm();
		DeliveryOrderItem subDoNo = new DeliveryOrderItem();
		InsertItemsBizParm insertList = new InsertItemsBizParm();
		DeliveryOrderItem item = (DeliveryOrderItem) parm.getInsertItems().get(0);
		
		doParm.setDono(item.getDono());
		
		DataItemList subDoNoList = deliveryOrderDao.selectSubDoNoItems(doParm);
		subDoNo = (DeliveryOrderItem) subDoNoList.getCollection().get(0);
		item.setSdono(subDoNo.getSdono());
		
		insertList.addInsertItem(item);
		
		ArrayList<DeliveryOrderItem> pkgArr = item.getPkgItems();
		
		if(pkgArr != null) {
			for(int i=0; i<pkgArr.size(); i++) {
				DeliveryOrderItem cudItem = (DeliveryOrderItem) item.clone();
				
				cudItem.setMfdocid(item.getMfdocid());
				cudItem.setBlno(item.getBlno());
				cudItem.setDono(item.getDono());
				cudItem.setPkgNo(item.getPkgItems().get(i).getPkgNo());
				cudItem.setSdono(item.getSdono());
				
				deliveryOrderDao.updatePackageItems(cudItem);
			}
		}
		
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.addUpdateItem(item);
		
		deliveryOrderDao.updateDeliveryOrderAdditionalChk(updateParm);
		if(item.getCgtpcd().equals("RCV") && item.getUnitItems() != null && item.getUnitItems().size() > 0 ) {
			insertROROData(item);
		}
		return deliveryOrderDao.insertSubDeliveryOrderItems(insertList);
	}

	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		DataItemList returnList = parm.getUpdateItems();
		DeliveryOrderItem item = (DeliveryOrderItem)returnList.get(0);
		FileUploadItem fileUploadItem = new FileUploadItem();
		
		if(item.getDelvTpCd().equals(CodeConstant.MT_DELVTP_D)){
			item.setMt(item.getDmt());
			item.setM3(item.getDm3());
			item.setQty(item.getDqty());
		}else if(item.getDelvTpCd().equals(CodeConstant.MT_DELVTP_I)){
			item.setMt(item.getImt());
			item.setM3(item.getIm3());
			item.setQty(item.getIqty());
		}
		
		//file upload function
		ArrayList<FileUploadItem> fileuploadList = (ArrayList<FileUploadItem>) item.getUploadItems();
		
		if (fileuploadList != null && fileuploadList.size() > 0) {
			// File Upload CUD
			UpdateBizParm<FileUploadItem> cudParm = new UpdateBizParm<FileUploadItem>();
			cudParm.setUserId(((DeliveryOrderItem)parm.getUpdateItems().get(0)).getUserId());
				
			fileUploadItem.setItems(fileuploadList);
			fileUploadItem.setUserId(((DeliveryOrderItem)parm.getUpdateItems().get(0)).getUserId());
			
			cudParm.setDataItem(fileUploadItem);
			cudParm.setUserId(((DeliveryOrderItem)parm.getUpdateItems().get(0)).getUserId());
			   
			this.fileUpload.applyUploadItems(cudParm);
		}
		
		deliveryOrderDao.updateBLItems(item);
    	return deliveryOrderDao.updateItems(parm);
	}
	
	public DataItemList updateSubDeliveryOrderItems(UpdateItemsBizParm parm) throws BizException {
		deliveryOrderDao.deletePackageItems(parm);
		DeliveryOrderItem item = (DeliveryOrderItem) parm.getUpdateItems().get(0);
		ArrayList<DeliveryOrderItem> pkgArr = item.getPkgItems();
		
		if(pkgArr != null) {
			for(int i=0; i<pkgArr.size(); i++) {
				DeliveryOrderItem cudItem = (DeliveryOrderItem) item.clone();
				
				cudItem.setMfdocid(item.getMfdocid());
				cudItem.setBlno(item.getBlno());
				cudItem.setDono(item.getDono());
				cudItem.setPkgNo(item.getPkgItems().get(i).getPkgNo());
				cudItem.setSdono(item.getSdono());
				
				deliveryOrderDao.updatePackageItems(cudItem);
			}
		}
		
    	return deliveryOrderDao.updateSubDeliveryOrderItems(parm);
	}

	public void deleteItems(DeleteItemsBizParm parm) throws BizException {
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.addUpdateItem(parm.getDeleteItems());
		
		deliveryOrderDao.deletePackageItems(updateParm);
		deliveryOrderDao.deleteAllSubDeliveryOrderItems(parm);
		deliveryOrderDao.deleteItems(parm);
	}
	
	public void deleteSubDeliveryOrderItems(DeleteItemsBizParm parm) throws BizException {
		UpdateItemsBizParm updateList = new UpdateItemsBizParm();
		updateList.addUpdateItem(parm.getDeleteItems());
		deliveryOrderDao.deletePackageItems(updateList);
		
		deliveryOrderDao.deleteSubDeliveryOrderItems(parm);
	}
}
