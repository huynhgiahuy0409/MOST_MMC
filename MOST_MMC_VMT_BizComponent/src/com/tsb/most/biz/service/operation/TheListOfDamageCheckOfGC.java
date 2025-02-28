package com.tsb.most.biz.service.operation;


import java.util.ArrayList;
import java.util.List;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.basebiz.component.fileupload.IFileUpload;
import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.basebiz.parm.fileupload.SearchFileUploadParm;
import com.tsb.most.biz.dao.operation.ITheListOfDamageCheckOfGCDao;
import com.tsb.most.biz.dataitem.operation.TheListOfDamageCheckOfGCItem;
import com.tsb.most.biz.parm.operation.SearchTheListOfDamageCheckOfGCParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class TheListOfDamageCheckOfGC extends MOSTBaseService implements ITheListOfDamageCheckOfGC {
	private ITheListOfDamageCheckOfGCDao theListOfDamageCheckOfGCDao;
	private IFileUpload fileUpload;
	
	public IFileUpload getFileUpload() {
		return fileUpload;
	}

	public void setFileUpload(IFileUpload fileUpload) {
		this.fileUpload = fileUpload;
	}

	public void setTheListOfDamageCheckOfGCDao(ITheListOfDamageCheckOfGCDao theListOfDamageCheckOfGCDao) {
		this.theListOfDamageCheckOfGCDao = theListOfDamageCheckOfGCDao;
	}
	
	public DataItemList selectBlComboBoxItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException{
		return theListOfDamageCheckOfGCDao.selectBlComboBoxItems(parm);
	}
	
	public DataItemList selectCategoryComboBoxItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException{
		return theListOfDamageCheckOfGCDao.selectCategoryComboBoxItems(parm);
	}
	
	public DataItemList selectShipgNoteNoComboBoxItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException{
		return theListOfDamageCheckOfGCDao.selectShipgNoteNoComboBoxItems(parm);
	}
	
	public DataItemList selectGCDamageCheckItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException{
		return theListOfDamageCheckOfGCDao.selectGCDamageCheckItems(parm);
	}
	
	public DataItemList selectCargoPopupItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException{
		return theListOfDamageCheckOfGCDao.selectCargoPopupItems(parm);
	}
	
	public DataItemList selectUnitPopupItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException{
		return theListOfDamageCheckOfGCDao.selectUnitPopupItems(parm);
	}
	
	public DataItemList selectGCDmgDtlInvItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException{
		return theListOfDamageCheckOfGCDao.selectGCDmgDtlInvItems(parm);
	}
	
	public DataItemList selectTheDamagePartItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException{
		return theListOfDamageCheckOfGCDao.selectTheDamagePartItems(parm);
	}
	
	public DataItemList selectTheDamageLevelItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException{
		return theListOfDamageCheckOfGCDao.selectTheDamageLevelItems(parm);
	}
	
	public DataItemList selectGCInventoryItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException{
		return theListOfDamageCheckOfGCDao.selectGCInventoryItems(parm);
	}
	
	public DataItemList selectGCDmgDtlDmgItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException{
		return theListOfDamageCheckOfGCDao.selectGCDmgDtlDmgItems(parm);
	}
	
	public DataItemList insertGCDmgItem(InsertItemsBizParm parm) throws BizException {
		TheListOfDamageCheckOfGCItem objHead = (TheListOfDamageCheckOfGCItem) parm.getInsertItems().get(0);
        InsertItemsBizParm insertItms = new InsertItemsBizParm();
	    UpdateItemsBizParm updateItms = new UpdateItemsBizParm();
        ArrayList detailItems = objHead.getItems();
        DataItemList insertItems = new DataItemList();
        DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
        for (int i = 0; i < detailItems.size(); i++) {
        	TheListOfDamageCheckOfGCItem item = (TheListOfDamageCheckOfGCItem) detailItems.get(i);
        		item.setRemark(objHead.getRemark());
                insertItems.add(item);
        }
        if (insertItems.size() > 0) {
        	insertItms.addInsertItem(insertItems);
			updateItms.addUpdateItem(insertItems);
			deleteItems.addDeleteItem(insertItems);
        	theListOfDamageCheckOfGCDao.deleteGCDmgItem(deleteItems);
			theListOfDamageCheckOfGCDao.insertGCDmgItem(insertItms);

			theListOfDamageCheckOfGCDao.updateCheckTimeItem(updateItms);
        }
		
		return parm.getInsertItems();
	}
	
	public DataItemList insertGCInvItem(InsertItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getInsertItems();
		InsertItemsBizParm insertItms = new InsertItemsBizParm();
		UpdateItemsBizParm updateItms = new UpdateItemsBizParm();
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
        DataItemList insertItems = new DataItemList();
        
        for (int i = 0; i < itemList.size(); i++) {
        	TheListOfDamageCheckOfGCItem item = (TheListOfDamageCheckOfGCItem) itemList.get(i);
        	insertItems.add(item);
        }
        if (insertItems.size() > 0) {
        	insertItms.addInsertItem(insertItems);
        	updateItms.addUpdateItem(insertItems);
        	deleteItems.addDeleteItem(insertItems);
			theListOfDamageCheckOfGCDao.insertGCDmgItem(insertItms);
			theListOfDamageCheckOfGCDao.updateCheckTimeItem(updateItms);
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
        	TheListOfDamageCheckOfGCItem item = (TheListOfDamageCheckOfGCItem) itemList.get(i);
        	insertItems.add(item);
        }
        if (insertItems.size() > 0) {
        	insertItms.addInsertItem(insertItems);
        	updateItms.addUpdateItem(insertItems);
        	deleteItems.addDeleteItem(insertItems);
        	theListOfDamageCheckOfGCDao.deleteGCDmgItem(deleteItems);
			theListOfDamageCheckOfGCDao.insertGCDmgItem(insertItms);
			theListOfDamageCheckOfGCDao.updateCheckTimeItem(updateItms);
        }
    	
    	return itemList;
	}
	
	public DataItemList updateGCInvItem(UpdateItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getUpdateItems();
	    UpdateItemsBizParm updateItms = new UpdateItemsBizParm();
        DataItemList updateItems = new DataItemList();
        for (int i = 0; i < itemList.size(); i++) {
        	TheListOfDamageCheckOfGCItem item = (TheListOfDamageCheckOfGCItem) itemList.get(i);
        	updateItems.add(item);
        }
        if (updateItems.size() > 0) {
			updateItms.addUpdateItem(updateItems);
			theListOfDamageCheckOfGCDao.updateGCInvItem(updateItms);
			theListOfDamageCheckOfGCDao.updateCheckTimeItem(updateItms);
        }
    	return itemList;
	}
	
	public DataItemList deleteGCDmgItem(DeleteItemsBizParm parm) throws BizException {
		return theListOfDamageCheckOfGCDao.deleteGCDmgItem(parm);
	}
	
	
	
	
	/**
	 * 
	 * HHT START
	 * 
	 */
	public DataItemList selectGCDamageCheckItemsHHT(SearchTheListOfDamageCheckOfGCParm parm) throws BizException{
		return theListOfDamageCheckOfGCDao.selectGCDamageCheckItemsHHT(parm);
	}
	
	public DataItemList selectBlComboBoxItemsHHT(SearchTheListOfDamageCheckOfGCParm parm) throws BizException{
		return theListOfDamageCheckOfGCDao.selectBlComboBoxItemsHHT(parm);
	}
	public DataItemList selectShipgNoteNoComboBoxItemsHHT(SearchTheListOfDamageCheckOfGCParm parm) throws BizException{
		return theListOfDamageCheckOfGCDao.selectShipgNoteNoComboBoxItemsHHT(parm);
	}
	
	public DataItemList selectUnitPopupItemsHHT(SearchTheListOfDamageCheckOfGCParm parm) throws BizException{
		return theListOfDamageCheckOfGCDao.selectUnitPopupItemsHHT(parm);
	}
	public DataItemList selectBrandComboBoxItemsHHT(SearchTheListOfDamageCheckOfGCParm parm) throws BizException{
		return theListOfDamageCheckOfGCDao.selectBrandComboBoxItemsHHT(parm);
	}
	public DataItemList selectGCInventoryItemsHHT(SearchTheListOfDamageCheckOfGCParm parm) throws BizException{
		return theListOfDamageCheckOfGCDao.selectGCInventoryItemsHHT(parm);
	}
	public DataItemList selectGCDmgDtlInvItemsHHT(SearchTheListOfDamageCheckOfGCParm parm) throws BizException{
		return theListOfDamageCheckOfGCDao.selectGCDmgDtlInvItemsHHT(parm);
	}
	public DataItemList updateItemsHHT(UpdateItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getUpdateItems();
	    UpdateItemsBizParm updateItms = new UpdateItemsBizParm();
	    InsertItemsBizParm insertItms = new InsertItemsBizParm();
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
        DataItemList insertItems = new DataItemList();
        
        for (int i = 0; i < itemList.size(); i++) {
        	TheListOfDamageCheckOfGCItem item = (TheListOfDamageCheckOfGCItem) itemList.get(i);
        	insertItems.add(item);
        }
        if (insertItems.size() > 0) {
        	insertItms.addInsertItem(insertItems);
        	updateItms.addUpdateItem(insertItems);
        	deleteItems.addDeleteItem(insertItems);
        	theListOfDamageCheckOfGCDao.deleteGCDmgItemHHT(deleteItems);
			theListOfDamageCheckOfGCDao.insertGCDmgItemHHT(insertItms);
			theListOfDamageCheckOfGCDao.updateCheckTimeItemHHT(updateItms);
        }
    	
    	return itemList;
	}
	public DataItemList insertGCInvItemHHT(InsertItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getInsertItems();
		InsertItemsBizParm insertItms = new InsertItemsBizParm();
		UpdateItemsBizParm updateItms = new UpdateItemsBizParm();
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
        DataItemList insertItems = new DataItemList();
        
        for (int i = 0; i < itemList.size(); i++) {
        	TheListOfDamageCheckOfGCItem item = (TheListOfDamageCheckOfGCItem) itemList.get(i);
        	insertItems.add(item);
        }
        if (insertItems.size() > 0) {
        	insertItms.addInsertItem(insertItems);
        	updateItms.addUpdateItem(insertItems);
        	deleteItems.addDeleteItem(insertItems);
			theListOfDamageCheckOfGCDao.insertGCDmgItemHHT(insertItms);
			theListOfDamageCheckOfGCDao.updateCheckTimeItemHHT(updateItms);
        }
    	
    	return itemList;
	}
	public DataItemList insertGCDmgItemHHT(InsertItemsBizParm parm) throws BizException {
		TheListOfDamageCheckOfGCItem objHead = (TheListOfDamageCheckOfGCItem) parm.getInsertItems().get(0);
        InsertItemsBizParm insertItms = new InsertItemsBizParm();
	    UpdateItemsBizParm updateItms = new UpdateItemsBizParm();
        ArrayList detailItems = objHead.getItems();
        DataItemList insertItems = new DataItemList();
        DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
        for (int i = 0; i < detailItems.size(); i++) {
        	TheListOfDamageCheckOfGCItem item = (TheListOfDamageCheckOfGCItem) detailItems.get(i);
        		item.setRemark(objHead.getRemark());
                insertItems.add(item);
        }
        if (insertItems.size() > 0) {
        	insertItms.addInsertItem(insertItems);
			updateItms.addUpdateItem(insertItems);
			deleteItems.addDeleteItem(insertItems);
        	theListOfDamageCheckOfGCDao.deleteGCDmgItemHHT(deleteItems);
			theListOfDamageCheckOfGCDao.insertGCDmgItemHHT(insertItms);

			theListOfDamageCheckOfGCDao.updateCheckTimeItemHHT(updateItms);
        }
		
		return parm.getInsertItems();
	}
	public DataItemList updateGCInvItemHHT(UpdateItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getUpdateItems();
	    UpdateItemsBizParm updateItms = new UpdateItemsBizParm();
        DataItemList updateItems = new DataItemList();
        for (int i = 0; i < itemList.size(); i++) {
        	TheListOfDamageCheckOfGCItem item = (TheListOfDamageCheckOfGCItem) itemList.get(i);
        	updateItems.add(item);
        }
        if (updateItems.size() > 0) {
			updateItms.addUpdateItem(updateItems);
			theListOfDamageCheckOfGCDao.updateGCInvItemHHT(updateItms);
        }
    	return itemList;
	}
	public DataItemList deleteGCDmgItemHHT(DeleteItemsBizParm parm) throws BizException {
		return theListOfDamageCheckOfGCDao.deleteGCDmgItemHHT(parm);
	}

	public DataItemList selectGCDimensionCheckItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException {
		return theListOfDamageCheckOfGCDao.selectGCDimensionCheckItems(parm);
	}

	public DataItemList selectGCDimensionDtlDmgItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException {
		return theListOfDamageCheckOfGCDao.selectGCDimensionDtlDmgItems(parm);
	}
	
	public DataItemList deleteGCDimensionItem(DeleteItemsBizParm parm) throws BizException {		
		return theListOfDamageCheckOfGCDao.deleteGCDimensionItem(parm);
	}
	
	
	/* ADP HHT */
	public DataItemList selectTblDamageCheckItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException {
		return theListOfDamageCheckOfGCDao.selectTblDamageCheckItems(parm);
	}
	
	public DataItemList selectTblMfDocIdComboItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException{
		return theListOfDamageCheckOfGCDao.selectTblMfDocId(parm);
	}
	
	public DataItemList selectTblBlComboItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException{
		return theListOfDamageCheckOfGCDao.selectTblBLComboItems(parm);
	}
	
	public DataItemList selectTblShipgNoteNoComboItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException{
		return theListOfDamageCheckOfGCDao.selectTblShipgNoteNoComboItems(parm);
	}
	
	public DataItemList selectTblDamageCheckDetailItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException{
		return theListOfDamageCheckOfGCDao.selectTblDamageCheckDetailItems(parm);
	}
	
	public DataItemList insertTblDamageCheckDetailItems(InsertItemsBizParm parm) throws BizException {
		return theListOfDamageCheckOfGCDao.insertTblDamageCheckDetailItems(parm);
	}
	
	public DataItemList updateTblDamageCheckDetailItems(UpdateItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getUpdateItems();
		
		DeleteItemsBizParm deletePram = new DeleteItemsBizParm();
		UpdateItemsBizParm updatePram = new UpdateItemsBizParm();
		InsertItemsBizParm insertPram = new InsertItemsBizParm();
		DataItemList deleteItems = new DataItemList();
		DataItemList updateItems = new DataItemList();
		DataItemList insertItems = new DataItemList();
		
		
	    for (int i = 0; i < itemList.size(); i++) {
	    	TheListOfDamageCheckOfGCItem item = (TheListOfDamageCheckOfGCItem) itemList.get(i);
	    	// TODO :: Make for loop. Cause seperate list by workingstatus
	    	if(DAOProcessType.INSERT.equals(item.getWorkingStatus())) {
	    		insertItems.add(item);
	    	}else if(DAOProcessType.UPDATE.equals(item.getWorkingStatus()) || DAOProcessType.SELECT.equals(item.getWorkingStatus()) ) { 
	    		updateItems.add(item);
	    	}else if(DAOProcessType.DELETE.equals(item.getWorkingStatus())) {
	    		deleteItems.add(item);
	    	}
	    }
		
		if (deleteItems.size() > 0) {
			deletePram.addDeleteItem(deleteItems);
			theListOfDamageCheckOfGCDao.deleteTblDamageCheckDetailItems(deletePram);
		}
		if (updateItems.size() > 0) {
			updatePram.addUpdateItem(updateItems);
			theListOfDamageCheckOfGCDao.updateTblDamageCheckDetailItems(updatePram);
		}
		if (insertItems.size() > 0) {
			insertPram.addInsertItem(insertItems);
			theListOfDamageCheckOfGCDao.insertTblDamageCheckDetailItems(insertPram);
		}
		return itemList;
	}
	
	public DataItemList deleteTblDamageCheckList(DeleteItemsBizParm parm) throws BizException {
		return theListOfDamageCheckOfGCDao.deleteTblDamageCheckList(parm);
	}
	@Override
	public DataItemList selectTheDamageDesc(SearchTheListOfDamageCheckOfGCParm parm) throws BizException {
		return theListOfDamageCheckOfGCDao.selectTheDamageDesc(parm);
	}
	
	/*
	 * @Override public DataItemList insertDamageCheck(InsertItemsBizParm parm)
	 * throws BizException { // TODO Auto-generated method stub DataItemList items =
	 * parm.getInsertItems(); InsertItemsBizParm insertDamageParm = new
	 * InsertItemsBizParm(); UpdateItemsBizParm updateDamageParm = new
	 * UpdateItemsBizParm();
	 * 
	 * TheListOfDamageCheckOfGCItem masterItem =
	 * (TheListOfDamageCheckOfGCItem)items.get(0); TheListOfDamageCheckOfGCItem item
	 * = (TheListOfDamageCheckOfGCItem)masterItem.getItems().get(0);
	 * 
	 * item.setSearchType("INSERT"); DataItemList list =
	 * theListOfDamageCheckOfGCDao.selectJobNoDamageCheck(item); String jobNo =
	 * ((TheListOfDamageCheckOfGCItem)list.getCollection().get(0)).getJobNo();
	 * 
	 * if(masterItem != null) { for(int i = 0; i < masterItem.getItems().size();
	 * i++) { TheListOfDamageCheckOfGCItem itemDamage =
	 * (TheListOfDamageCheckOfGCItem)masterItem.getItems().get(i); if
	 * (itemDamage.getRegNo() != null) { updateDamageParm.addUpdateItem(itemDamage);
	 * } else { insertDamageParm.addInsertItem(itemDamage); } } } if
	 * (insertDamageParm.getInsertItems() != null &&
	 * insertDamageParm.getInsertItems().size() > 0) {
	 * theListOfDamageCheckOfGCDao.insertDamageCheck(insertDamageParm); }
	 * 
	 * if (updateDamageParm.getUpdateItems() != null &&
	 * updateDamageParm.getUpdateItems().size() > 0) {
	 * theListOfDamageCheckOfGCDao.updateDamageCheckDetail(updateDamageParm); }
	 * 
	 * // File Upload CUD UpdateBizParm<FileUploadItem> cudParm = new
	 * UpdateBizParm<FileUploadItem>();
	 * cudParm.setUserId(((TheListOfDamageCheckOfGCItem)parm.getInsertItems().get(0)
	 * ).getUserId());
	 * 
	 * if(masterItem.getUploadItems() != null) { for(int i = 0; i <
	 * masterItem.getUploadItems().size(); i++) {
	 * masterItem.getUploadItems().get(i).setCatgCd(jobNo); } }
	 * masterItem.setUserId(((TheListOfDamageCheckOfGCItem)parm.getInsertItems().get
	 * (0)).getUserId());
	 * 
	 * FileUploadItem fileUploadItem = new FileUploadItem();
	 * fileUploadItem.setUserId(((TheListOfDamageCheckOfGCItem)parm.getInsertItems()
	 * .get(0)).getUserId());
	 * 
	 * ArrayList<FileUploadItem> spFileUploadtems = masterItem.getUploadItems(); if
	 * (spFileUploadtems != null && spFileUploadtems.size() > 0) {
	 * fileUploadItem.setItems(spFileUploadtems);
	 * fileUploadItem.setUserId(((TheListOfDamageCheckOfGCItem)parm.getInsertItems()
	 * .get(0)).getUserId()); cudParm.setDataItem(fileUploadItem);
	 * cudParm.setUserId(((TheListOfDamageCheckOfGCItem)parm.getInsertItems().get(0)
	 * ).getUserId());
	 * 
	 * this.fileUpload.applyUploadItems(cudParm); }
	 * 
	 * return items; }
	 */
	
	public DataItemList processDamageCheckListItem(UpdateItemsBizParm parm) throws BizException {
		DataItemList insertItems = new DataItemList();
		DataItemList updateItems = new DataItemList();
		DataItemList deleteItems = new DataItemList();
		DataItemList deleteFileItems = new DataItemList();
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm(); 
		TheListOfDamageCheckOfGCItem item = (TheListOfDamageCheckOfGCItem) parm.getUpdateItem();
		ArrayList lst = item.getItems();
//		itemDamage.setSearchType("UPDATE");
//		DataItemList list = theListOfDamageCheckOfGCDao.selectJobNoDamageCheck(itemDamage);
//		if (list.getCollection() != null && list.getCollection().size() > 0) {
//			jobNo = ((TheListOfDamageCheckOfGCItem)list.getCollection().get(0)).getJobNo();
//		} else {
//			itemDamage.setSearchType("INSERT");
//			DataItemList listInsert = theListOfDamageCheckOfGCDao.selectJobNoDamageCheck(itemDamage);
//			jobNo = ((TheListOfDamageCheckOfGCItem)listInsert.getCollection().get(0)).getJobNo();
//			jobNo = itemDamage.getJobNo();
//		}
		
//		if (jobNo != null) {
//			deleteFileItems.add(itemDamage);
//			deleteParm.setDeleteItems(deleteFileItems);
//			theListOfDamageCheckOfGCDao.deleteUploadFiles(deleteParm);
//		}z
		
		UpdateBizParm<FileUploadItem> cudParm = new UpdateBizParm<FileUploadItem>();
		FileUploadItem fileUploadItem = new FileUploadItem();
    	ArrayList<FileUploadItem> spFileUploadtems = item.getUploadItems();
	    if (spFileUploadtems != null && spFileUploadtems.size() > 0)  {
		   fileUploadItem.setItems(spFileUploadtems);
		   fileUploadItem.setUserId(item.getUserId());
		   cudParm.setDataItem(fileUploadItem);
		   cudParm.setUserId(((TheListOfDamageCheckOfGCItem)parm.getUpdateItem()).getUserId());
		   this.fileUpload.applyUploadItems(cudParm);
	   }

		if (lst.size() > 0) {
			for (int i = 0; i < lst.size(); i++) {
				TheListOfDamageCheckOfGCItem itemCol = (TheListOfDamageCheckOfGCItem) lst.get(i);

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
				theListOfDamageCheckOfGCDao.insertDamageCheck(insertItems);
			}

			if (updateItems.size() > 0) {
				theListOfDamageCheckOfGCDao.updateDamageCheck(updateItems);
			}
			
			if (deleteItems.size() > 0) {
				theListOfDamageCheckOfGCDao.deleteDamageCheck(deleteItems);
			}
		}
		
		DataItemList returnItems = new DataItemList();
		returnItems.add(item);
		return returnItems;
	}

	@Override
	public DataItemList searchDamageCheck(SearchTheListOfDamageCheckOfGCParm parm) throws BizException {
		// TODO Auto-generated method stub
		TheListOfDamageCheckOfGCItem returnItem = new TheListOfDamageCheckOfGCItem();
		DataItemList returnItems = new DataItemList();
		ArrayList fileUploadList = new ArrayList<FileUploadItem>();
		
		SearchFileUploadParm fileUploadParm = new SearchFileUploadParm();
		fileUploadParm.setCatgCd(parm.getCatgCdFile());
		fileUploadParm.setPgmId(parm.getPgmId());
		DataItemList foundFileDataList;
		try {
			foundFileDataList = this.fileUpload.selectFileList(fileUploadParm);
			ArrayList<FileUploadItem> foundFileList = (ArrayList<FileUploadItem>) foundFileDataList.getCollection();
			fileUploadList.addAll(foundFileList);
			returnItem.setUploadItems(fileUploadList);
		} catch (BizException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		DataItemList items = theListOfDamageCheckOfGCDao.searchDamageCheck(parm);
		//Validate when no data in gate transaction, means cargo not handling out
		if(items.getCollection().size() > 0) {
			TheListOfDamageCheckOfGCItem coverItem = (TheListOfDamageCheckOfGCItem) items.getCollection().get(0);
			returnItem.setDmgRemark(coverItem.getDmgRemark());
			returnItem.setCheckTime(coverItem.getCheckTime());
			returnItem.setCheckedDt(coverItem.getCheckTime());
			returnItem.setDmgM3(coverItem.getDmgM3());
			returnItem.setDmgMt(coverItem.getDmgMt());
			returnItem.setDmgQty(coverItem.getDmgQty());
			returnItem.setJobNo(coverItem.getJobNo());
			returnItem.setDmgDesc(coverItem.getDmgDesc());
			returnItem.setRegNo(coverItem.getRegNo());
			returnItem.setCgNo(coverItem.getCgNo());
			returnItem.setLocCd(coverItem.getLocCd());
			returnItem.setItems((ArrayList<TheListOfDamageCheckOfGCItem>)items.getCollection());
		    returnItems.add(returnItem);
		}
		return returnItems;
	}
}