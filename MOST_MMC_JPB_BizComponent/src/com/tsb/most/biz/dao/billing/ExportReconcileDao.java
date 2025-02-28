package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.dataitem.billing.ExportReconcileItem;
import com.tsb.most.biz.parm.billing.SearchExportReconcileParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public class ExportReconcileDao extends BaseDao implements  IExportReconcileDao {

    public DataItemList selectExportReconcileList(SearchExportReconcileParm param) throws DaoException {
        return unifiedDao.getItemsPage("exportReconcile.selectExportReconcile",param);
    }
    
    public DataItemList selectSNList(SearchExportReconcileParm param) throws DaoException {
        return unifiedDao.getItems("exportReconcile.selectSNList",param);
    }

    public DataItemList selectOutwardManifestList(SearchExportReconcileParm param) throws DaoException {
         return unifiedDao.getItems("exportReconcile.selectOutwardManifest",param);
    }

    public DataItemList selectExportReconcileStatus(SearchExportReconcileParm param) throws DaoException {
        
        return unifiedDao.getItems("exportReconcile.selectExportReconcileStatus",param);
    }
    
    public void updateExportReconcileForPackageTypeCd(TxTraceInfo info,  DataItemList updateList) throws DaoException {
        unifiedDao.updateItems(info,"exportReconcile.updateExportReconcileForPackageTypeCd",updateList);
    }

    public Integer isDataCollected(SearchExportReconcileParm parm) throws DaoException {
    	Object result = unifiedDao.readOne("exportReconcile.isDataCollected", parm);
    	
    	if(result !=null) {
    		ExportReconcileItem resultItem = (ExportReconcileItem)result;
    		return resultItem.getCount();
    	}else {
    		return 0;	
    	}
    }
    
    public void insertExportStatus(TxTraceInfo info, DataItemList addList) throws DaoException {
        unifiedDao.insertItems(info,"exportReconcile.insertExportReconcileStatus",addList);
    }
    
    public void updateControllerTmtJob(TxTraceInfo info, DataItemList updateList) throws DaoException {
        unifiedDao.updateItems(info,"exportReconcile.updateControllerTmtJob",updateList);
    }
    
    @Override
   	public DataItemList updateExportReconcileForTsptTpCd(UpdateItemsBizParm parm) throws DaoException {
       	try {
   			DataItemList updateItems = parm.getUpdateItems();
   			setNewVersion(updateItems);
   			
   			unifiedDao.updateItems(null,"exportReconcile.updateExportReconcileForTsptTpCd", updateItems);
   			
   			setVersion(updateItems);
   			
   			return updateItems;
   		}catch(Exception e){
   			throw new DaoException(e);
   		}
	}
    
    public void updateControllerTmtCgArrvDelv(TxTraceInfo info, DataItemList updateList) throws DaoException {
        unifiedDao.updateItems(info,"exportReconcile.updateControllerTmtCgArrvDelv",updateList);
    }
    
    public void clearExportReconcile(TxTraceInfo info,DataItemList updateList) throws DaoException {
        unifiedDao.updateItems(info,"exportReconcile.clearExportReconcile",updateList);
    }
    
    @Override
   	public DataItemList updateExportReconciles(UpdateItemsBizParm parm) throws DaoException {
       	try {
   			DataItemList updateItems = parm.getUpdateItems();
   			setNewVersion(updateItems);
   			
   			unifiedDao.updateItems(null,"exportReconcile.updateExportReconciles", updateItems);
   			
   			setVersion(updateItems);
   			
   			return updateItems;
   		}catch(Exception e){
   			throw new DaoException(e);
   		}
	}
    
    @Override
	public DataItemList insertExportReconcileStatus(InsertItemsBizParm parm) throws DaoException {
    	try {
			DataItemList insertItems = parm.getInsertItems();
			setNewVersion(insertItems);
			
			unifiedDao.updateItems(null,"exportReconcile.insertExportReconcileStatus", insertItems);
			
			setVersion(insertItems);
			
			return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    @Override
	public DataItemList updateExportStatus(UpdateItemsBizParm parm) throws DaoException {
    	try {
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			
			unifiedDao.updateItems(null,"exportReconcile.updateExportStatus", updateItems);
			
			setVersion(updateItems);
			
			return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    @Override
   	public DataItemList deleteExportReconciles(DeleteItemsBizParm parm) throws DaoException {
       	try {
       		DataItemList deleteItems = parm.getDeleteItems();
			setNewVersion(deleteItems);
   			
   			unifiedDao.updateItems(null,"exportReconcile.deleteExportReconciles", deleteItems);
   			
   			setVersion(deleteItems);
   			
   			return deleteItems;
   		}catch(Exception e){
   			throw new DaoException(e);
   		}
	}
    
    @Override
	public DataItemList insertExportReconciles(InsertItemsBizParm parm) throws DaoException {
    	try {
    		DataItemList insertItems = parm.getInsertItems();
   			setNewVersion(insertItems);
			
			unifiedDao.updateItems(null,"exportReconcile.insertExportReconciles", insertItems);
			
			setVersion(insertItems);
			
			return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
}
