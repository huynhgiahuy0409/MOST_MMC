package com.tsb.most.biz.service.operation;

import java.util.ArrayList;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.basebiz.component.fileupload.IFileUpload;
import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.basebiz.parm.fileupload.SearchFileUploadParm;
import com.tsb.most.biz.dao.operation.ITheListOfDamageCheckOfRORODao;
import com.tsb.most.biz.dataitem.operation.TheListOfDamageCheckOfROROItem;
import com.tsb.most.biz.parm.operation.SearchTheListOfDamageCheckOfROROParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class TheListOfDamageCheckOfRORO extends MOSTBaseService implements ITheListOfDamageCheckOfRORO {
	private ITheListOfDamageCheckOfRORODao theListOfDamageCheckOfRORODao;
	private IFileUpload fileUpload;
	
	public void setFileUpload(IFileUpload fileUpload) {
		this.fileUpload = fileUpload;
	}
	public void setTheListOfDamageCheckOfRORODao(ITheListOfDamageCheckOfRORODao theListOfDamageCheckOfRORODao) {
		this.theListOfDamageCheckOfRORODao = theListOfDamageCheckOfRORODao;
	}
	
	public DataItemList selectBlComboBoxItems(SearchTheListOfDamageCheckOfROROParm parm) throws BizException{
		return theListOfDamageCheckOfRORODao.selectBlComboBoxItems(parm);
	}
	
	public DataItemList selectCategoryComboBoxItems(SearchTheListOfDamageCheckOfROROParm parm) throws BizException{
		return theListOfDamageCheckOfRORODao.selectCategoryComboBoxItems(parm);
	}
	
	public DataItemList selectShipgNoteNoComboBoxItems(SearchTheListOfDamageCheckOfROROParm parm) throws BizException{
		return theListOfDamageCheckOfRORODao.selectShipgNoteNoComboBoxItems(parm);
	}
	
	public DataItemList selectRoRoDamageCheckItems(SearchTheListOfDamageCheckOfROROParm parm) throws BizException{
		return theListOfDamageCheckOfRORODao.selectRoRoDamageCheckItems(parm);
	}
	
	public DataItemList selectCargoPopupItems(SearchTheListOfDamageCheckOfROROParm parm) throws BizException{
		return theListOfDamageCheckOfRORODao.selectCargoPopupItems(parm);
	}
	
	public DataItemList selectUnitPopupItems(SearchTheListOfDamageCheckOfROROParm parm) throws BizException{
		return theListOfDamageCheckOfRORODao.selectUnitPopupItems(parm);
	}
	
	public DataItemList selectRoRoDmgDtlInvItems(SearchTheListOfDamageCheckOfROROParm parm) throws BizException{
		return theListOfDamageCheckOfRORODao.selectRoRoDmgDtlInvItems(parm);
	}
	
	public DataItemList selectTheDamagePartItems(SearchTheListOfDamageCheckOfROROParm parm) throws BizException{
		return theListOfDamageCheckOfRORODao.selectTheDamagePartItems(parm);
	}
	
	public DataItemList selectTheDamageLevelItems(SearchTheListOfDamageCheckOfROROParm parm) throws BizException{
		return theListOfDamageCheckOfRORODao.selectTheDamageLevelItems(parm);
	}
	
	public DataItemList selectROROInventoryItems(SearchTheListOfDamageCheckOfROROParm parm) throws BizException{
		return theListOfDamageCheckOfRORODao.selectROROInventoryItems(parm);
	}
	
	public DataItemList selectFileList(SearchTheListOfDamageCheckOfROROParm parm) throws BizException{
		SearchFileUploadParm fileUploadParm = new SearchFileUploadParm();
		fileUploadParm.setCatgCd(parm.getCatgCd());
		fileUploadParm.setPgmId(parm.getPgmId());
		
		return this.fileUpload.selectFileList(fileUploadParm);
	}
	
	public DataItemList selectRoRoDmgDtlDmgItems(SearchTheListOfDamageCheckOfROROParm parm) throws BizException{
		TheListOfDamageCheckOfROROItem returnItem = new TheListOfDamageCheckOfROROItem();
		DataItemList returnItems = new DataItemList();
		
		DataItemList items =  theListOfDamageCheckOfRORODao.selectRoRoDmgDtlDmgItems(parm);
		if(items.getCollection().size() > 0) {
			returnItem.setItems((ArrayList<TheListOfDamageCheckOfROROItem>)items.getCollection());
//			SearchFileUploadParm fileUploadParm = new SearchFileUploadParm();
//			fileUploadParm.setCatgCd(parm.getVslCallId() + "/" + parm.getCgNo() + "/" + parm.getUnitNo());
//			fileUploadParm.setPgmId(parm.getPgmId());
//			DataItemList tempList = this.fileUpload.selectFileList(fileUploadParm);
//	        returnItem.setUploadItems((ArrayList<FileUploadItem>) tempList.getCollection());
	        returnItems.add(returnItem);
		}
		return returnItems;
	}
	
	public DataItemList insertRoRoDmgItem(InsertItemsBizParm parm) throws BizException {
		TheListOfDamageCheckOfROROItem objHead = (TheListOfDamageCheckOfROROItem) parm.getInsertItems().get(0);
		
		// File Upload CUD
		UpdateBizParm<FileUploadItem> cudParm = new UpdateBizParm<FileUploadItem>();
		cudParm.setUserId(((TheListOfDamageCheckOfROROItem)parm.getInsertItems().get(0)).getUserId());
		objHead.setUserId(objHead.getUserId());
		FileUploadItem fileUploadItem = new FileUploadItem();
    	fileUploadItem.setUserId(((TheListOfDamageCheckOfROROItem)parm.getInsertItems().get(0)).getUserId());
    	ArrayList<FileUploadItem> spFileUploadtems = objHead.getUploadItems();
	    if (spFileUploadtems != null && spFileUploadtems.size() > 0)  {
		   fileUploadItem.setItems(spFileUploadtems);
		   fileUploadItem.setUserId(((TheListOfDamageCheckOfROROItem)parm.getInsertItems().get(0)).getUserId());
		   cudParm.setDataItem(fileUploadItem);
		   cudParm.setUserId(((TheListOfDamageCheckOfROROItem)parm.getInsertItems().get(0)).getUserId());
		   this.fileUpload.applyUploadItems(cudParm);
	   }	  
    	
        InsertItemsBizParm insertItms = new InsertItemsBizParm();
	    UpdateItemsBizParm updateItms = new UpdateItemsBizParm();
        ArrayList detailItems = objHead.getItems();
        DataItemList insertItems = new DataItemList();
        DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
        for (int i = 0; i < detailItems.size(); i++) {
        	TheListOfDamageCheckOfROROItem item = (TheListOfDamageCheckOfROROItem) detailItems.get(i);
        		if(item.getRemark() == null && item.getRemark() == "") {
        			item.setRemark(objHead.getRemark());
        		}
                insertItems.add(item);
        }
        if (insertItems.size() > 0) {
        	insertItms.addInsertItem(insertItems);
			updateItms.addUpdateItem(insertItems);
			deleteItems.addDeleteItem(insertItems);
        	theListOfDamageCheckOfRORODao.deleteRoRoDmgItem(deleteItems);
			theListOfDamageCheckOfRORODao.insertRoRoDmgItem(insertItms);

			theListOfDamageCheckOfRORODao.updateCheckTimeItem(updateItms);
        }
		
		return parm.getInsertItems();
	}
	
	public DataItemList insertRoRoInvItem(InsertItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getInsertItems();
		InsertItemsBizParm insertItms = new InsertItemsBizParm();
		UpdateItemsBizParm updateItms = new UpdateItemsBizParm();
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
        DataItemList insertItems = new DataItemList();
        
        for (int i = 0; i < itemList.size(); i++) {
        	TheListOfDamageCheckOfROROItem item = (TheListOfDamageCheckOfROROItem) itemList.get(i);
        	insertItems.add(item);
        }
        if (insertItems.size() > 0) {
        	insertItms.addInsertItem(insertItems);
        	updateItms.addUpdateItem(insertItems);
        	deleteItems.addDeleteItem(insertItems);
			theListOfDamageCheckOfRORODao.insertRoRoDmgItem(insertItms);
			theListOfDamageCheckOfRORODao.updateCheckTimeItem(updateItms);
        }
    	
    	return itemList;
	}
	
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getUpdateItems();
	    UpdateItemsBizParm updateItms = new UpdateItemsBizParm();
	    InsertItemsBizParm insertItms = new InsertItemsBizParm();
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
        DataItemList insertItems = new DataItemList();
        
        for (int i = 0; i < itemList.size(); i++) {
        	TheListOfDamageCheckOfROROItem item = (TheListOfDamageCheckOfROROItem) itemList.get(i);
        	insertItems.add(item);
        }
        if (insertItems.size() > 0) {
        	insertItms.addInsertItem(insertItems);
        	updateItms.addUpdateItem(insertItems);
        	deleteItems.addDeleteItem(insertItems);
        	theListOfDamageCheckOfRORODao.deleteRoRoDmgItem(deleteItems);
			theListOfDamageCheckOfRORODao.insertRoRoDmgItem(insertItms);
			theListOfDamageCheckOfRORODao.updateCheckTimeItem(updateItms);
        }
    	
    	return itemList;
	}
	
	public DataItemList updateRoRoInvItem(UpdateItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getUpdateItems();
	    UpdateItemsBizParm updateItms = new UpdateItemsBizParm();
        DataItemList updateItems = new DataItemList();
        for (int i = 0; i < itemList.size(); i++) {
        	TheListOfDamageCheckOfROROItem item = (TheListOfDamageCheckOfROROItem) itemList.get(i);
        	updateItems.add(item);
        }
        if (updateItems.size() > 0) {
			updateItms.addUpdateItem(updateItems);
			theListOfDamageCheckOfRORODao.updateRoRoInvItem(updateItms);
			theListOfDamageCheckOfRORODao.updateCheckTimeItem(updateItms);
        }
    	return itemList;
	}
	
	public DataItemList deleteRoRoDmgItem(DeleteItemsBizParm parm) throws BizException {
		return theListOfDamageCheckOfRORODao.deleteRoRoDmgItem(parm);
	}
	
	/**
	 * 
	 * HHT START
	 * 
	 */
	public DataItemList selectRoRoDamageCheckItemsHHT(SearchTheListOfDamageCheckOfROROParm parm) throws BizException{
		return theListOfDamageCheckOfRORODao.selectRoRoDamageCheckItemsHHT(parm);
	}
	
	public DataItemList selectBlComboBoxItemsHHT(SearchTheListOfDamageCheckOfROROParm parm) throws BizException{
		return theListOfDamageCheckOfRORODao.selectBlComboBoxItemsHHT(parm);
	}
	public DataItemList selectShipgNoteNoComboBoxItemsHHT(SearchTheListOfDamageCheckOfROROParm parm) throws BizException{
		return theListOfDamageCheckOfRORODao.selectShipgNoteNoComboBoxItemsHHT(parm);
	}
	
	public DataItemList selectUnitPopupItemsHHT(SearchTheListOfDamageCheckOfROROParm parm) throws BizException{
		return theListOfDamageCheckOfRORODao.selectUnitPopupItemsHHT(parm);
	}
	public DataItemList selectBrandComboBoxItemsHHT(SearchTheListOfDamageCheckOfROROParm parm) throws BizException{
		return theListOfDamageCheckOfRORODao.selectBrandComboBoxItemsHHT(parm);
	}
	public DataItemList selectROROInventoryItemsHHT(SearchTheListOfDamageCheckOfROROParm parm) throws BizException{
		return theListOfDamageCheckOfRORODao.selectROROInventoryItemsHHT(parm);
	}
	public DataItemList selectRoRoDmgDtlInvItemsHHT(SearchTheListOfDamageCheckOfROROParm parm) throws BizException{
		return theListOfDamageCheckOfRORODao.selectRoRoDmgDtlInvItemsHHT(parm);
	}
	public DataItemList updateItemsHHT(UpdateItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getUpdateItems();
	    UpdateItemsBizParm updateItms = new UpdateItemsBizParm();
	    InsertItemsBizParm insertItms = new InsertItemsBizParm();
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
        DataItemList insertItems = new DataItemList();
        
        for (int i = 0; i < itemList.size(); i++) {
        	TheListOfDamageCheckOfROROItem item = (TheListOfDamageCheckOfROROItem) itemList.get(i);
        	insertItems.add(item);
        }
        if (insertItems.size() > 0) {
        	insertItms.addInsertItem(insertItems);
        	updateItms.addUpdateItem(insertItems);
        	deleteItems.addDeleteItem(insertItems);
        	theListOfDamageCheckOfRORODao.deleteRoRoDmgItemHHT(deleteItems);
			theListOfDamageCheckOfRORODao.insertRoRoDmgItemHHT(insertItms);
			theListOfDamageCheckOfRORODao.updateCheckTimeItemHHT(updateItms);
        }
    	
    	return itemList;
	}
	public DataItemList insertRoRoInvItemHHT(InsertItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getInsertItems();
		InsertItemsBizParm insertItms = new InsertItemsBizParm();
		UpdateItemsBizParm updateItms = new UpdateItemsBizParm();
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
        DataItemList insertItems = new DataItemList();
        
        for (int i = 0; i < itemList.size(); i++) {
        	TheListOfDamageCheckOfROROItem item = (TheListOfDamageCheckOfROROItem) itemList.get(i);
        	insertItems.add(item);
        }
        if (insertItems.size() > 0) {
        	insertItms.addInsertItem(insertItems);
        	updateItms.addUpdateItem(insertItems);
        	deleteItems.addDeleteItem(insertItems);
			theListOfDamageCheckOfRORODao.insertRoRoDmgItemHHT(insertItms);
			theListOfDamageCheckOfRORODao.updateCheckTimeItemHHT(updateItms);
        }
    	
    	return itemList;
	}
	public DataItemList insertRoRoDmgItemHHT(InsertItemsBizParm parm) throws BizException {
		TheListOfDamageCheckOfROROItem objHead = (TheListOfDamageCheckOfROROItem) parm.getInsertItems().get(0);
        InsertItemsBizParm insertItms = new InsertItemsBizParm();
	    UpdateItemsBizParm updateItms = new UpdateItemsBizParm();
        ArrayList detailItems = objHead.getItems();
        DataItemList insertItems = new DataItemList();
        DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
        for (int i = 0; i < detailItems.size(); i++) {
        	TheListOfDamageCheckOfROROItem item = (TheListOfDamageCheckOfROROItem) detailItems.get(i);
        		item.setRemark(objHead.getRemark());
                insertItems.add(item);
        }
        if (insertItems.size() > 0) {
        	insertItms.addInsertItem(insertItems);
			updateItms.addUpdateItem(insertItems);
			deleteItems.addDeleteItem(insertItems);
        	theListOfDamageCheckOfRORODao.deleteRoRoDmgItemHHT(deleteItems);
			theListOfDamageCheckOfRORODao.insertRoRoDmgItemHHT(insertItms);

			theListOfDamageCheckOfRORODao.updateCheckTimeItemHHT(updateItms);
        }
		
		return parm.getInsertItems();
	}
	public DataItemList updateRoRoInvItemHHT(UpdateItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getUpdateItems();
		DataItemList insertItems = new DataItemList();
		UpdateItemsBizParm updateItms = new UpdateItemsBizParm();
		InsertItemsBizParm insertItms = new InsertItemsBizParm();
        DataItemList updateItems = new DataItemList();
        for (int i = 0; i < itemList.size(); i++) {
        	TheListOfDamageCheckOfROROItem item = (TheListOfDamageCheckOfROROItem) itemList.get(i);
        	
        	if(item.getWorkingStatus() != null) {
        		if(item.getWorkingStatus().equals(DAOProcessType.INSERT)) {
        			insertItems.add(item);
        		} else if(item.getWorkingStatus().equals(DAOProcessType.UPDATE)) {
        			updateItems.add(item);
        		}
        	}
        	
        }
        
        if (insertItems.size() > 0) {
        	insertItms.addInsertItem(insertItems);
			theListOfDamageCheckOfRORODao.insertRoRoInvItemHHT(insertItms);
        }
        if (updateItems.size() > 0) {
			updateItms.addUpdateItem(updateItems);
			theListOfDamageCheckOfRORODao.updateRoRoInvItemHHT(updateItms);
        }
    	return itemList;
	}
	public DataItemList deleteRoRoDmgItemHHT(DeleteItemsBizParm parm) throws BizException {
		return theListOfDamageCheckOfRORODao.deleteRoRoDmgItemHHT(parm);
	}
}