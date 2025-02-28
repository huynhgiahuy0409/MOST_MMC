package com.tsb.most.biz.service.billing;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.biz.dao.billing.IExportReconcileDao;
import com.tsb.most.biz.dataitem.billing.ExportReconcileItem;
import com.tsb.most.biz.parm.billing.SearchExportReconcileParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.constants.CommonConstants;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class ExportReconcile extends MOSTBaseService implements IExportReconcile{
	// Export Reconcile
	private IExportReconcileDao exportReconcileDao;
	
	public void setExportReconcileDao(IExportReconcileDao exportReconcileDao) {
		this.exportReconcileDao = exportReconcileDao;
	}
	
	public DataItemList selectExportList(SearchExportReconcileParm param) throws BizException{
		return exportReconcileDao.selectExportReconcileList(param);
	}
	
	public DataItemList selectExportStatus(SearchExportReconcileParm param) throws BizException{
		DataItemList rtnList = new DataItemList();
		
		DataItemList itemStat = exportReconcileDao.selectExportReconcileStatus(param);
		DataItemList itemList = exportReconcileDao.selectExportReconcileList(param);
		
		if (itemList.getCollection().size() == 0 && itemStat.getCollection().size() > 0) {
			List itemStatlist = new ArrayList();
			ExportReconcileItem statItm = new ExportReconcileItem();
			
			statItm.setVslCallId(param.getVslCallId());
			statItm.setStatus(CommonConstants.N);
			statItm.setEditable(CommonConstants.Y);
			
			itemStatlist.add(statItm);
			
			rtnList.setCollection(itemStatlist);
		}else {
			rtnList.setCollection(itemStat.getCollection());
		}
		
		return rtnList;
	}
	
	public DataItemList selectOutwardManifestList(SearchExportReconcileParm param) throws BizException{
		return exportReconcileDao.selectOutwardManifestList(param);
	}
	
	public DataItemList selectExportReconcileList(SearchExportReconcileParm param) throws BizException {
		return exportReconcileDao.selectExportReconcileList(param);
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
		UpdateItemsBizParm updateModeOrpItems = new UpdateItemsBizParm();
		
		DataItemList recList = new DataItemList();
		DataItemList statuList = new DataItemList();
		DataItemList rtnStatusList = new DataItemList();
		
		ExportReconcileItem item = new ExportReconcileItem();
		DataItemList masterItem = parm.getUpdateItems();
		
		item = (ExportReconcileItem) masterItem.get(0);
		
		if(item.getItems().size() > 0) {
			for(int i = 0; i < item.getItems().size(); i++) {
				ExportReconcileItem reccItm = item.getItems().get(i);
				
				if(reccItm.getWorkingStatus().equals(DAOProcessType.UPDATE)){
					recList.add(reccItm);
					
					if(reccItm.getOldTsptTpCd() != null && !reccItm.getOldTsptTpCd().equals("")) {
						updateModeOrpItems.addUpdateItem(reccItm);
						exportReconcileDao.updateExportReconcileForTsptTpCd(updateModeOrpItems);
					}
				}
			}
		}
		
		if(item.getStatusitems().size() > 0) {
			ExportReconcileItem statuItm = item.getStatusitems().get(0);
			
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
			SearchExportReconcileParm prmStat = new SearchExportReconcileParm();
			
			prmStat.setVslCallId(item.getVslCallId());
			rtnStatusList = exportReconcileDao.selectExportReconcileStatus(prmStat);
			
			if (rtnStatusList.getCollection().size() == 0) {
				insertStatusItems.addInsertItem(statuList);
				exportReconcileDao.insertExportReconcileStatus(insertStatusItems);
			} else {
				updateStatusItems.addUpdateItem(statuList);
				exportReconcileDao.updateExportStatus(updateStatusItems);
			}
		}
		
		if(recList.size() > 0) {
			insertItems.addInsertItem(recList);
			updateItems.addUpdateItem(recList);
			deleteItems.addDeleteItem(recList);
			
			exportReconcileDao.deleteExportReconciles(deleteItems);
			
			if(item.getStatus() != null && !item.getStatus().equals(CommonConstants.N)) {
				exportReconcileDao.insertExportReconciles(insertItems);
			}
		}
		
		return masterItem;
	}
	
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException {
		return null;
	}
}
