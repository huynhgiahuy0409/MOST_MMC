package com.tsb.most.biz.service.billing;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.biz.dao.billing.IExportReconcileForLiquidDao;
import com.tsb.most.biz.dataitem.billing.ExportReconcileForLiquidItem;
import com.tsb.most.biz.parm.billing.SearchExportReconcileForLiquidParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.constants.CommonConstants;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class ExportReconcileForLiquid extends MOSTBaseService implements IExportReconcileForLiquid{
	private IExportReconcileForLiquidDao exportReconcileForLiquidDao;

	public void setExportReconcileForLiquidDao(IExportReconcileForLiquidDao exportReconcileForLiquidDao) {
		this.exportReconcileForLiquidDao = exportReconcileForLiquidDao;
	}
	/////////////////////////////////////////////////////////

	public DataItemList selectExportReconcileForLiquidList(SearchExportReconcileForLiquidParm param) throws BizException{
		return exportReconcileForLiquidDao.selectExportReconcileForLiquidList(param);
	}
	
	public DataItemList selectExportReconcileStatus(SearchExportReconcileForLiquidParm param) throws BizException{
		return exportReconcileForLiquidDao.selectExportReconcileStatus(param);
	}
	
	public DataItemList selectOutwardManifestItems(SearchExportReconcileForLiquidParm param) throws BizException{
		return exportReconcileForLiquidDao.selectOutwardManifestItems(param);
	}
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
		return null;
	}
	
	public DataItemList deleteItems(InsertItemsBizParm parm) throws BizException {
		return null;
	}
	
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		InsertItemsBizParm insertItems =  new InsertItemsBizParm();
		UpdateItemsBizParm updateItems = new UpdateItemsBizParm();
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
		
		InsertItemsBizParm insertStatusItems =  new InsertItemsBizParm();
		UpdateItemsBizParm updateStatusItems = new UpdateItemsBizParm();

		DataItemList recList = new DataItemList();
		DataItemList statuList = new DataItemList();
		DataItemList rtnStatusList = new DataItemList();
		
		ExportReconcileForLiquidItem item = new ExportReconcileForLiquidItem();
		DataItemList masterItem = parm.getUpdateItems();
		
		item = (ExportReconcileForLiquidItem) masterItem.get(0);
		
		if(item.getItems().size() > 0) {
			for(int i = 0; i < item.getItems().size(); i++) {
				ExportReconcileForLiquidItem reccItm = item.getItems().get(i);
				if(reccItm.getWorkingStatus().equals(DAOProcessType.UPDATE)){
					recList.add(reccItm);
				}
			}
		}
		
		if(item.getStatusitems().size() > 0) {
			ExportReconcileForLiquidItem statuItm = item.getStatusitems().get(0);
			
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
			SearchExportReconcileForLiquidParm prmStat = new SearchExportReconcileForLiquidParm();
			
			prmStat.setVslCallId(item.getVslCallId());
			rtnStatusList = exportReconcileForLiquidDao.selectExportReconcileStatus(prmStat);
			
			if (rtnStatusList.getCollection().size() == 0) {
				insertStatusItems.addInsertItem(statuList);
				exportReconcileForLiquidDao.insertExportReconcileStatus(insertStatusItems);
			} else {
				updateStatusItems.addUpdateItem(statuList);
				exportReconcileForLiquidDao.updateExportReconcileStatus(updateStatusItems);
			}
		}
		
		if(recList.size() > 0) {
			insertItems.addInsertItem(recList);
			updateItems.addUpdateItem(recList);
			deleteItems.addDeleteItem(recList);
			
			exportReconcileForLiquidDao.deleteExportReconcile(deleteItems);
			//exportReconcileForLiquidDao.updateExportReconcileInformation(updateItems);
			
			if(item.getStatus() != null && !item.getStatus().equals(CommonConstants.N)) {
				exportReconcileForLiquidDao.updateExportReconcile(updateItems);
			}
		}
		
		return masterItem;
	}
	
}
