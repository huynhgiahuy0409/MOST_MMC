package com.tsb.most.biz.service.billing;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.biz.dao.billing.IImportReconcileDao;
import com.tsb.most.biz.dataitem.billing.ExportReconcileItem;
import com.tsb.most.biz.dataitem.billing.ImportReconcileItem;
import com.tsb.most.biz.parm.billing.SearchImportReconcileParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.constants.CommonConstants;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class ImportReconcile extends MOSTBaseService implements IImportReconcile{
	private IImportReconcileDao importReconcileDao;
	
	public void setImportReconcileDao(IImportReconcileDao importReconcileDao) {
		this.importReconcileDao = importReconcileDao;
	}

	public DataItemList selectImportReconcile(SearchImportReconcileParm param) throws BizException{
		return importReconcileDao.selectImportReconcile(param);
	}
	
	public DataItemList selectManifest(SearchImportReconcileParm param) throws BizException{
		return importReconcileDao.selectManifest(param);
	}
	
	public DataItemList selectOutturnCertificate(SearchImportReconcileParm param) throws BizException{
		return importReconcileDao.selectOutturnCertificate(param);
	}

	public DataItemList importReconcilePackageTypeList(SearchCodeMasterParm param) throws BizException{
		return importReconcileDao.importReconcilePackageTypeList(param);
	}
	
	public DataItemList importReconcileTransportTypeList(SearchCodeMasterParm param) throws BizException{
		return importReconcileDao.importReconcileTransportTypeList(param);
	}
	
	// Billing Import Reconcile
	public DataItemList selectImportReconcileStatus(SearchImportReconcileParm param) throws BizException {
		DataItemList rtnList = new DataItemList();
		
		DataItemList itemStat = importReconcileDao.selectImportReconcileStatus(param);
		DataItemList itemList = importReconcileDao.selectImportReconcile(param);
		
		ExportReconcileItem statItm = new ExportReconcileItem();
		if (itemList.getCollection().size() == 0 && itemStat.getCollection().size() > 0) {
			List itemStatlist = new ArrayList();
			
			statItm.setVslCallId(param.getVslCallId());
			statItm.setStatus("N");
			statItm.setEditable("Y");
			
			itemStatlist.add(statItm);
			
			rtnList.setCollection(itemStatlist);
		}else {
			rtnList.setCollection(itemStat.getCollection());
		}
		
		return rtnList;
	}
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
		return null;
	}

	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		InsertItemsBizParm insertItems =  new InsertItemsBizParm();
		UpdateItemsBizParm updateItems = new UpdateItemsBizParm();
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
		
		InsertItemsBizParm insertStatusItems =  new InsertItemsBizParm();
		UpdateItemsBizParm updateStatusItems = new UpdateItemsBizParm();
		UpdateItemsBizParm updateTransportTypeItems = new UpdateItemsBizParm();

		DataItemList recList = new DataItemList();
		DataItemList statuList = new DataItemList();
		DataItemList rtnStatusList = new DataItemList();
		
		ImportReconcileItem item = new ImportReconcileItem();
		DataItemList masterItem = parm.getUpdateItems();
		
		item = (ImportReconcileItem) masterItem.get(0);
		
		if(item.getItems().size() > 0) {
			for(int i = 0; i < item.getItems().size(); i++) {
				ImportReconcileItem reccItm = item.getItems().get(i);
				if(reccItm.getWorkingStatus().equals(DAOProcessType.INSERT)){
					
				}
				
				if(reccItm.getWorkingStatus().equals(DAOProcessType.UPDATE)){
					recList.add(reccItm);
					
					if(item.getStatus() != null && !item.getStatus().equals("")) {
						if(item.getOldTsptTpCd() != null && !item.getOldTsptTpCd().equals("")) {
							updateTransportTypeItems.addUpdateItem(item);
							importReconcileDao.updateImportReconcileForTsptTpCd(updateTransportTypeItems);
						}
					}
				}
			}
		}
		
		if(item.getStatusitems().size() > 0) {
			ImportReconcileItem statuItm = item.getStatusitems().get(0);
			
			if(statuItm.getStatus() != null && !statuItm.getStatus().equals("")) {
				if(statuItm.getStatus().equals(CommonConstants.Y)) {
					item.setStatus(CommonConstants.Y);
				}
				if(statuItm.getStatus().equals(CommonConstants.N)) {
					item.setStatus(CommonConstants.N);
				}
				statuList.add(item);
			}
		}
		
		if(statuList.size() > 0) {
			SearchImportReconcileParm prmStat = new SearchImportReconcileParm();
			
			prmStat.setVslCallId(item.getVslCallId());
			rtnStatusList = importReconcileDao.selectImportReconcileStatus(prmStat);
			
			if (rtnStatusList.getCollection().size() == 0) {
				insertStatusItems.addInsertItem(statuList);
				importReconcileDao.insertImportReconcileStatus(insertStatusItems);
			} else {
				updateStatusItems.addUpdateItem(statuList);
				importReconcileDao.updateImportReconcileStatus(updateStatusItems);
			}
		}
		
		if(recList.size() > 0) {
			insertItems.addInsertItem(recList);
			updateItems.addUpdateItem(recList);
			deleteItems.addDeleteItem(recList);
			
			importReconcileDao.deleteImportReconciles(deleteItems);
			
			if(item.getStatus() != null && !item.getStatus().equals(CommonConstants.N)) {
				importReconcileDao.insertImportReconciles(insertItems);
			}
		}
		
		return masterItem;
	}
	
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException {
		return null;
	}
}
