package com.tsb.most.biz.service.operation;

import java.util.ArrayList;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.basebiz.component.fileupload.IFileUpload;
import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.basebiz.parm.fileupload.SearchFileUploadParm;
import com.tsb.most.biz.dao.operation.IDamageDimensionCheckDao;
import com.tsb.most.biz.dataitem.operation.DamageCheckItem;
import com.tsb.most.biz.dataitem.operation.DimensionCheckGCItem;
import com.tsb.most.biz.parm.operation.SearchDamageDimensionCheck;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class DamageDimensionCheck extends MOSTBaseService implements IDamageDimensionCheck{
	private IDamageDimensionCheckDao damageDimensionCheckDao;
	private IFileUpload fileUpload;

	public void setFileUpload(IFileUpload fileUpload) {
		this.fileUpload = fileUpload;
	}

	public void setDamageDimensionCheckDao(IDamageDimensionCheckDao damageDimensionCheckDao) {
		this.damageDimensionCheckDao = damageDimensionCheckDao;
	}

	@Override
	public DataItemList searchDamageCheck(SearchDamageDimensionCheck parm) throws BizException {
		// TODO Auto-generated method stub
		DamageCheckItem returnItem = new DamageCheckItem();
		DataItemList returnItems = new DataItemList();
		
		DataItemList items = damageDimensionCheckDao.searchDamageCheck(parm);
		
		//Validate when no data in gate transaction, means cargo not handling out
		if(items.getCollection().size() > 0) {
			DamageCheckItem coverItem = (DamageCheckItem) items.getCollection().get(0);
			returnItem.setDmgRemark(coverItem.getDmgRemark());
			returnItem.setCheckTime(coverItem.getCheckTime());
			returnItem.setDmgM3(coverItem.getDmgM3());
			returnItem.setDmgMt(coverItem.getDmgMt());
			returnItem.setDmgQty(coverItem.getDmgQty());
			returnItem.setJobNo(coverItem.getJobNo());
			returnItem.setItems((ArrayList<DamageCheckItem>)items.getCollection());
			SearchFileUploadParm fileUploadParm = new SearchFileUploadParm();
			fileUploadParm.setCatgCd(parm.getCatgCd());
			fileUploadParm.setPgmId(parm.getPgmId());
			DataItemList tempList = this.fileUpload.selectFileList(fileUploadParm);
	        returnItem.setUploadItems((ArrayList<FileUploadItem>) tempList.getCollection());
	
		    returnItems.add(returnItem);
		}
		return returnItems;
	}
	

	@Override
	public DataItemList searchDimensionCheck(SearchDamageDimensionCheck parm) throws BizException {
		// TODO Auto-generated method stub
		//Validate when no data in gate transaction, means cargo not handling out
		return damageDimensionCheckDao.searchDimensionCheck(parm);
	}

	@Override
	public DataItemList insertDamageCheck(InsertItemsBizParm parm) throws BizException {
		// TODO Auto-generated method stub
		DataItemList items = parm.getInsertItems();
		
		DataItemList list = damageDimensionCheckDao.selectJobNoDamageCheck(parm);
		String jobNo = ((DamageCheckItem)list.getCollection().get(0)).getJobNo();
		
		// File Upload CUD
		UpdateBizParm<FileUploadItem> cudParm = new UpdateBizParm<FileUploadItem>();
		cudParm.setUserId(((DamageCheckItem)parm.getInsertItems().get(0)).getUserId());
		
		DamageCheckItem masterItem = (DamageCheckItem)items.get(0);
		
		if(masterItem.getUploadItems() != null) {
			for(int i = 0; i < masterItem.getUploadItems().size(); i++) {
				masterItem.getUploadItems().get(i).setCatgCd(jobNo);
			}
		}
    	masterItem.setUserId(((DamageCheckItem)parm.getInsertItems().get(0)).getUserId());
    	
    	FileUploadItem fileUploadItem = new FileUploadItem();
    	fileUploadItem.setUserId(((DamageCheckItem)parm.getInsertItems().get(0)).getUserId());
	    
	    ArrayList<FileUploadItem> spFileUploadtems = masterItem.getUploadItems();
	    if (spFileUploadtems != null && spFileUploadtems.size() > 0)  {
		   fileUploadItem.setItems(spFileUploadtems);
		   fileUploadItem.setUserId(((DamageCheckItem)parm.getInsertItems().get(0)).getUserId());
		   cudParm.setDataItem(fileUploadItem);
		   cudParm.setUserId(((DamageCheckItem)parm.getInsertItems().get(0)).getUserId());
		    
		   this.fileUpload.applyUploadItems(cudParm);
	   }	    
	    
		return damageDimensionCheckDao.insertDamageCheck(parm);
	}

	@Override
	public DataItemList insertDimension(InsertItemsBizParm parm) throws BizException {
		// TODO Auto-generated method stub
		return damageDimensionCheckDao.insertDimensionCheck(parm);
	}

	@Override
	public DataItemList updateDimensionCheck(UpdateItemsBizParm parm) throws BizException {
		// TODO Auto-generated method stub
		return damageDimensionCheckDao.updateDimensionCheck(parm);
	}

	@Override
	public DataItemList updateDamageCheck(UpdateItemsBizParm parm) throws BizException {
		// TODO Auto-generated method stub
		DataItemList items = parm.getUpdateItems();
		 // File Upload CUD
		UpdateBizParm<FileUploadItem> cudParm = new UpdateBizParm<FileUploadItem>();
		
		DamageCheckItem masterItem = (DamageCheckItem)items.get(0);
		
		for(int i = 0; i < masterItem.getUploadItems().size(); i++) {
			masterItem.getUploadItems().get(i).setCatgCd(masterItem.getItems().get(0).getJobNo());
		}
		masterItem.setUserId(((DamageCheckItem)parm.getUpdateItems().get(0)).getUserId());
   	
		 // File Upload CUD
		cudParm.setUserId(parm.getUserId());
		cudParm.setWorkingStatus(DAOProcessType.DELETE);
		
		SearchFileUploadParm fileUploadParm = new SearchFileUploadParm();
        fileUploadParm.setCatgCd(masterItem.getItems().get(0).getJobNo());
        fileUploadParm.setPgmId("CF106");
        
        DataItemList tempList = this.fileUpload.selectFileList(fileUploadParm);
        ArrayList<FileUploadItem> fileList = ((ArrayList<FileUploadItem>) tempList.getCollection());
        
        for(FileUploadItem item : fileList) {
        	item.setWorkingStatus(DAOProcessType.DELETE);
        }
		
		FileUploadItem fileUploadItem = new FileUploadItem();
	    
	    ArrayList<FileUploadItem> spFileUploadtems = masterItem.getUploadItems();
	    fileUploadItem.setItems(spFileUploadtems);
	    fileUploadItem.setUserId(((DamageCheckItem)parm.getUpdateItems().get(0)).getUserId());
	    cudParm.setDataItem(fileUploadItem);
	    cudParm.setUserId(((DamageCheckItem)parm.getUpdateItems().get(0)).getUserId());
	    
//	    this.fileUpload.applyUploadItems(cudParm);
	    
		return damageDimensionCheckDao.updateDamageCheck(parm);
	}

	@Override
	public DataItemList searchDamageDimensionCheckJobNo(SearchDamageDimensionCheck parm) throws BizException {
		// TODO Auto-generated method stub
		return damageDimensionCheckDao.searchDamageDimensionCheckJobNo(parm);
	}

	@Override
	public DataItemList searchDamageDimensionCheckBlSnNo(SearchDamageDimensionCheck parm) throws BizException {
		return damageDimensionCheckDao.searchDamageDimensionCheckBlSnNo(parm);
	}

	@Override
	public DataItemList searchDamageDimensionCheckDoGrNo(SearchDamageDimensionCheck parm) throws BizException {
		return damageDimensionCheckDao.searchDamageDimensionCheckDoGrNo(parm);
	}
	
	@Override
	public DataItemList selectTheDamageDesc(SearchDamageDimensionCheck parm) throws BizException {
		return damageDimensionCheckDao.selectTheDamageDesc(parm);
	}
	
	@Override
	public DataItemList selectInforBlSN(SearchDamageDimensionCheck parm) throws BizException {
		DataItemList returnList = null;
		DamageCheckItem returnItem = null;
		DamageCheckItem vinItem = null;
		DataItemList vinList = null;
		
		returnItem = (DamageCheckItem)damageDimensionCheckDao.selectInforBlSN(parm).get(0);
		try {
//			if(returnItem != null && "RCV".equals(parm.getCgTpCd())) {
//				vinList = damageDimensionCheckDao.selectVinList(parm);
//				vinItem = (DimensionCheckGCItem)(vinList.getCollection().get(0));
//				returnItem.setVinItem(vinItem);
//			}
		} catch (Exception e) {
			// TODO: handle exception
		}
		if(returnItem != null) {
			returnList = new DataItemList();
			returnList.add(returnItem);
		}
		
		return returnList;
	}
	
	@Override
	public DataItemList processDamageCheckListItem(UpdateItemsBizParm parm) throws BizException {
		DataItemList insertItems = new DataItemList();
		DataItemList updateItems = new DataItemList();
		DataItemList deleteItems = new DataItemList();
		DataItemList deleteFileItems = new DataItemList();
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm(); 
		DamageCheckItem item = (DamageCheckItem) parm.getUpdateItem();
		ArrayList lst = item.getItems();
		ArrayList<FileUploadItem> spFileUploadtems = item.getUploadItems();
//		String jobNo = null;
//
//		DamageCheckItem itemDamage = (DamageCheckItem)lst.get(0);
//		itemDamage.setSearchType("UPDATE");
//		DataItemList list = damageDimensionCheckDao.selectJobNoDamageCheck(itemDamage);
//		if (list.getCollection() != null && list.getCollection().size() > 0) {
//			jobNo = ((DamageCheckItem)list.getCollection().get(0)).getJobNo();
//		} else {
//			itemDamage.setSearchType("INSERT");
//			DataItemList listInsert = damageDimensionCheckDao.selectJobNoDamageCheck(itemDamage);
//			jobNo = ((DamageCheckItem)listInsert.getCollection().get(0)).getJobNo();
//		}
//		
//		if (jobNo != null) {
//			itemDamage.setJobNo(jobNo);
//			deleteFileItems.add(itemDamage);
//			deleteParm.setDeleteItems(deleteFileItems);
//			damageDimensionCheckDao.deleteUploadFiles(deleteParm);
//		}
//		
		UpdateBizParm<FileUploadItem> cudParm = new UpdateBizParm<FileUploadItem>();
		cudParm.setUserId(((DamageCheckItem)parm.getUpdateItem()).getUserId());
				
//		if(spFileUploadtems != null) {
//			for(int i = 0; i < item.getUploadItems().size(); i++) {
//				item.getUploadItems().get(i).setCatgCd(jobNo);
//			}
//		}
//		
		FileUploadItem fileUploadItem = new FileUploadItem();
    	fileUploadItem.setUserId(((DamageCheckItem)parm.getUpdateItem()).getUserId());
	    if (spFileUploadtems != null && spFileUploadtems.size() > 0)  {
		   fileUploadItem.setItems(spFileUploadtems);
		   fileUploadItem.setUserId(((DamageCheckItem)parm.getUpdateItem()).getUserId());
		   cudParm.setDataItem(fileUploadItem);
		   cudParm.setUserId(((DamageCheckItem)parm.getUpdateItem()).getUserId());
		   this.fileUpload.applyUploadItems(cudParm);
	   }

		if (lst.size() > 0) {
			for (int i = 0; i < lst.size(); i++) {
				DamageCheckItem itemCol = (DamageCheckItem) lst.get(i);
			
				if (itemCol.getWorkingStatus() != null) {
					if (itemCol.getWorkingStatus().equals(DAOProcessType.INSERT)) {
						insertItems.add(itemCol);
					} else if (itemCol.getWorkingStatus().equals(DAOProcessType.UPDATE)) {
						updateItems.add(itemCol);
					} else if (itemCol.getWorkingStatus().equals(DAOProcessType.DELETE)) {
						deleteItems.add(itemCol);
					}
				}

			}

			if (insertItems.size() > 0) {
				damageDimensionCheckDao.insertDamageCheck(insertItems);
			}

			if (updateItems.size() > 0) {
				damageDimensionCheckDao.updateDamageCheck(updateItems);
			}
			
			if (deleteItems.size() > 0) {
				damageDimensionCheckDao.deleteDamageCheck(deleteItems);
			}
		}
		
		DataItemList returnItems = new DataItemList();
		returnItems.add(item);
		return returnItems;
	}
		
}
