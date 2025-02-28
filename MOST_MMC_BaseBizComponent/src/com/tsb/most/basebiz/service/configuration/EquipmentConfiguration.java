package com.tsb.most.basebiz.service.configuration;

import java.util.ArrayList;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.basebiz.component.fileupload.IFileUpload;
import com.tsb.most.basebiz.dao.codes.ICodeMasterDao;
import com.tsb.most.basebiz.dao.configuration.IEquipmentConfigurationDao;
import com.tsb.most.basebiz.dataitem.configuration.EquipmentConfigurationItem;
import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.basebiz.parm.configuration.SearchEquipmentConfigurationParm;
import com.tsb.most.basebiz.parm.fileupload.SearchFileUploadParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class EquipmentConfiguration extends MOSTBaseService implements IEquipmentConfiguration{
	private IEquipmentConfigurationDao equipmentConfigurationDao;
	private ICodeMasterDao codeMasterDao;
	private IFileUpload fileUpload;
	
	public void setEquipmentConfigurationDao(IEquipmentConfigurationDao equipmentConfigurationDao) {
		this.equipmentConfigurationDao = equipmentConfigurationDao;
	}
	
	public void setCodeMasterDao(ICodeMasterDao codeMasterDao) {
		this.codeMasterDao = codeMasterDao;
	}

	public void setFileUpload(IFileUpload fileUpload) {
		this.fileUpload = fileUpload;
	}
	
	public DataItemList selectEquipmentList(SearchEquipmentConfigurationParm parm) throws BizException{
		return equipmentConfigurationDao.selectEquipmentList(parm);
	}
	
	public DataItemList selectChkDupliEqFacCd(SearchEquipmentConfigurationParm parm) throws BizException{
		return equipmentConfigurationDao.selectEquipmentList(parm);
	}
	
	public DataItemList selectFileList(SearchEquipmentConfigurationParm parm) throws BizException{
		SearchFileUploadParm fileUploadParm = new SearchFileUploadParm();
		fileUploadParm.setCatgCd(parm.getCatgCd());
		fileUploadParm.setPgmId(parm.getPgmId());
		
		return this.fileUpload.selectFileList(fileUploadParm);
	}
	
	public DataItemList insertItems(InsertItemsBizParm parm)throws BizException{
		DataItemList items = parm.getInsertItems();
		
		// File Upload CUD
		UpdateBizParm<FileUploadItem> cudParm = new UpdateBizParm<FileUploadItem>();
		cudParm.setUserId(((EquipmentConfigurationItem)parm.getInsertItems().get(0)).getUserId());
		
		EquipmentConfigurationItem masterItem = (EquipmentConfigurationItem)items.get(0);
    	masterItem.setUserId(((EquipmentConfigurationItem)parm.getInsertItems().get(0)).getUserId());
    	
    	FileUploadItem fileUploadItem = new FileUploadItem();
    	fileUploadItem.setUserId(((EquipmentConfigurationItem)parm.getInsertItems().get(0)).getUserId());
	    
	    ArrayList<FileUploadItem> spFileUploadtems = masterItem.getUploadItems();
	    
	    if (spFileUploadtems.size() > 0)  {
		   fileUploadItem.setItems(spFileUploadtems);
		   fileUploadItem.setUserId(((EquipmentConfigurationItem)parm.getInsertItems().get(0)).getUserId());
		   cudParm.setDataItem(fileUploadItem);
		   cudParm.setUserId(((EquipmentConfigurationItem)parm.getInsertItems().get(0)).getUserId());
		    
		   this.fileUpload.applyUploadItems(cudParm);
	   }	    
	    
		return equipmentConfigurationDao.insertItems(parm);
	}
	
	public DataItemList updateItems(UpdateItemsBizParm parm)throws BizException{
		DataItemList items = parm.getUpdateItems();
		 // File Upload CUD
		UpdateBizParm<FileUploadItem> fileUploadParm = new UpdateBizParm<FileUploadItem>();
		
		EquipmentConfigurationItem masterItem = (EquipmentConfigurationItem)items.get(0);
    	masterItem.setUserId(((EquipmentConfigurationItem)parm.getUpdateItems().get(0)).getUserId());
    	
    	FileUploadItem fileUploadItem = new FileUploadItem();
	    
	    ArrayList<FileUploadItem> spFileUploadtems = masterItem.getUploadItems();
	    fileUploadItem.setItems(spFileUploadtems);
	    fileUploadItem.setUserId(((EquipmentConfigurationItem)parm.getUpdateItems().get(0)).getUserId());
	    fileUploadParm.setDataItem(fileUploadItem);
	    fileUploadParm.setUserId(((EquipmentConfigurationItem)parm.getUpdateItems().get(0)).getUserId());
	    
	    this.fileUpload.applyUploadItems(fileUploadParm);
	    
		return equipmentConfigurationDao.updateItems(parm);
	}
	
	public DataItemList deleteItems(DeleteItemsBizParm parm)throws BizException{
		DataItemList items = parm.getDeleteItems();
		
		EquipmentConfigurationItem masterItem = (EquipmentConfigurationItem)items.get(0);
    	masterItem.setUserId(parm.getUserId());
    	
		 // File Upload CUD
		UpdateBizParm<FileUploadItem> cudParm = new UpdateBizParm<FileUploadItem>();
		cudParm.setUserId(parm.getUserId());
		cudParm.setWorkingStatus(DAOProcessType.DELETE);
    	
	    SearchFileUploadParm fileUploadParm = new SearchFileUploadParm();
        fileUploadParm.setCatgCd(masterItem.getEqFacNo());
        fileUploadParm.setPgmId("CF106");
        
		return equipmentConfigurationDao.deleteItems(parm);
	}
}
