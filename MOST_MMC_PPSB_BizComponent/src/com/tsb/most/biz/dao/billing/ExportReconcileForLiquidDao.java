package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.parm.billing.SearchExportReconcileForLiquidParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class ExportReconcileForLiquidDao extends BaseDao implements IExportReconcileForLiquidDao {

    public DataItemList selectExportReconcileForLiquidList(SearchExportReconcileForLiquidParm param) throws DaoException {
        return unifiedDao.getItemsPage("exportReconcileForLiquid.selectExportReconcileForLiquidList",param);
    }
    
    public DataItemList selectExportReconcileStatus(SearchExportReconcileForLiquidParm param) throws DaoException {
        return unifiedDao.getItems("exportReconcileForLiquid.selectExportReconcileStatus",param);
    }
    
    public DataItemList selectOutwardManifestItems(SearchExportReconcileForLiquidParm param) throws DaoException {
        return unifiedDao.getItems("exportReconcileForLiquid.selectOutwardManifestItems",param);
    }
    
	public DataItemList insertExportReconcileStatus(InsertItemsBizParm parm) throws DaoException {
    	try {
			DataItemList insertItems = parm.getInsertItems();
			setNewVersion(insertItems);
			unifiedDao.updateItems(null,"exportReconcileForLiquid.insertExportReconcileStatus", insertItems);
			setVersion(insertItems);
			return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
	public DataItemList updateExportReconcileStatus(UpdateItemsBizParm parm) throws DaoException {
    	try {
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			unifiedDao.updateItems(null,"exportReconcileForLiquid.updateExportReconcileStatus", updateItems);
			setVersion(updateItems);
			return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList updateExportReconcile(UpdateItemsBizParm parm) throws DaoException {
    	try {
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			unifiedDao.updateItems(null,"exportReconcileForLiquid.updateExportReconcile", updateItems);
			setVersion(updateItems);
			return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList updateExportReconcileInformation(UpdateItemsBizParm parm) throws DaoException {
    	try {
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			unifiedDao.updateItems(null,"exportReconcileForLiquid.updateExportReconcileInformation", updateItems);
			setVersion(updateItems);
			return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList deleteExportReconcile(DeleteItemsBizParm parm) throws DaoException {
    	try {
			DataItemList updateItems = parm.getDeleteItems();
			setNewVersion(updateItems);
			unifiedDao.updateItems(null,"exportReconcileForLiquid.deleteExportReconcile", updateItems);
			setVersion(updateItems);
			return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }

}