package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.parm.billing.SearchImportReconcileForLiquidParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class ImportReconcileForLiquidDao extends BaseDao implements IImportReconcileForLiquidDao {

    public DataItemList selectImportReconcileForLiquidList(SearchImportReconcileForLiquidParm param) throws DaoException {
        return unifiedDao.getItemsPage("importReconcileForLiquid.selectImportReconcileForLiquidList",param);
    }
    
    public DataItemList selectImportReconcileStatus(SearchImportReconcileForLiquidParm param) throws DaoException {
        return unifiedDao.getItems("importReconcileForLiquid.selectImportReconcileStatus",param);
    }
    
    public DataItemList selectInwardManifestItems(SearchImportReconcileForLiquidParm param) throws DaoException {
        return unifiedDao.getItems("importReconcileForLiquid.selectInwardManifestItems",param);
    }
    
    public DataItemList selectOutturnCertificateItems(SearchImportReconcileForLiquidParm param) throws DaoException {
        return unifiedDao.getItems("importReconcileForLiquid.selectOutturnCertificateItems",param);
    }
    
	public DataItemList insertImportReconcileStatus(InsertItemsBizParm parm) throws DaoException {
    	try {
			DataItemList insertItems = parm.getInsertItems();
			setNewVersion(insertItems);
			unifiedDao.updateItems(null,"importReconcileForLiquid.insertImportReconcileStatus", insertItems);
			setVersion(insertItems);
			return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
	public DataItemList updateImportReconcileStatus(UpdateItemsBizParm parm) throws DaoException {
    	try {
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			unifiedDao.updateItems(null,"importReconcileForLiquid.updateImportReconcileStatus", updateItems);
			setVersion(updateItems);
			return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList updateImportReconcile(UpdateItemsBizParm parm) throws DaoException {
    	try {
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			unifiedDao.updateItems(null,"importReconcileForLiquid.updateImportReconcile", updateItems);
			setVersion(updateItems);
			return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList updateImportReconcileInformation(UpdateItemsBizParm parm) throws DaoException {
    	try {
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			unifiedDao.updateItems(null,"importReconcileForLiquid.updateImportReconcileInformation", updateItems);
			setVersion(updateItems);
			return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList deleteImportReconcile(DeleteItemsBizParm parm) throws DaoException {
    	try {
			DataItemList updateItems = parm.getDeleteItems();
			setNewVersion(updateItems);
			unifiedDao.updateItems(null,"importReconcileForLiquid.deleteImportReconcile", updateItems);
			setVersion(updateItems);
			return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }

}