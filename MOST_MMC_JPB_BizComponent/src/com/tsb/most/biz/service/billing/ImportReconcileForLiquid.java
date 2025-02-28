package com.tsb.most.biz.service.billing;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.biz.dao.billing.IImportReconcileForLiquidDao;
import com.tsb.most.biz.dataitem.billing.ImportReconcileForLiquidItem;
import com.tsb.most.biz.parm.billing.SearchImportReconcileForLiquidParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.constants.CommonConstants;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class ImportReconcileForLiquid extends MOSTBaseService implements IImportReconcileForLiquid{
	private IImportReconcileForLiquidDao importReconcileForLiquidDao;

	public void setImportReconcileForLiquidDao(IImportReconcileForLiquidDao importReconcileForLiquidDao) {
		this.importReconcileForLiquidDao = importReconcileForLiquidDao;
	}
	/////////////////////////////////////////////////////////

	public DataItemList selectImportReconcileForLiquidList(SearchImportReconcileForLiquidParm param) throws BizException{
		return importReconcileForLiquidDao.selectImportReconcileForLiquidList(param);
	}
	
	public DataItemList selectImportReconcileStatus(SearchImportReconcileForLiquidParm param) throws BizException{
		return importReconcileForLiquidDao.selectImportReconcileStatus(param);
	}
	
	public DataItemList selectInwardManifestItems(SearchImportReconcileForLiquidParm param) throws BizException{
		return importReconcileForLiquidDao.selectInwardManifestItems(param);
	}
	
	public DataItemList selectOutturnCertificateItems(SearchImportReconcileForLiquidParm param) throws BizException{
		return importReconcileForLiquidDao.selectOutturnCertificateItems(param);
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
		
		ImportReconcileForLiquidItem item = new ImportReconcileForLiquidItem();
		DataItemList masterItem = parm.getUpdateItems();
		
		item = (ImportReconcileForLiquidItem) masterItem.get(0);
		
		if(item.getItems().size() > 0) {
			for(int i = 0; i < item.getItems().size(); i++) {
				ImportReconcileForLiquidItem reccItm = item.getItems().get(i);
				if(reccItm.getWorkingStatus().equals(DAOProcessType.UPDATE)){
					recList.add(reccItm);
				}
			}
		}
		
		if(item.getStatusitems().size() > 0) {
			ImportReconcileForLiquidItem statuItm = item.getStatusitems().get(0);
			
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
			SearchImportReconcileForLiquidParm prmStat = new SearchImportReconcileForLiquidParm();
			
			prmStat.setVslCallId(item.getVslCallId());
			rtnStatusList = importReconcileForLiquidDao.selectImportReconcileStatus(prmStat);
			
			if (rtnStatusList.getCollection().size() == 0) {
				insertStatusItems.addInsertItem(statuList);
				importReconcileForLiquidDao.insertImportReconcileStatus(insertStatusItems);
			} else {
				updateStatusItems.addUpdateItem(statuList);
				importReconcileForLiquidDao.updateImportReconcileStatus(updateStatusItems);
			}
		}
		
		if(recList.size() > 0) {
			insertItems.addInsertItem(recList);
			updateItems.addUpdateItem(recList);
			deleteItems.addDeleteItem(recList);
			
			importReconcileForLiquidDao.deleteImportReconcile(deleteItems);
			//importReconcileForLiquidDao.updateImportReconcileInformation(updateItems);
			
			if(item.getStatus() != null && !item.getStatus().equals(CommonConstants.N)) {
				importReconcileForLiquidDao.updateImportReconcile(updateItems);
			}
		}
		
		return masterItem;
	}
	
}
