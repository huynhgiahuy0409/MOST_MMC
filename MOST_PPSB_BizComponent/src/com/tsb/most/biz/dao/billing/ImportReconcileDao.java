package com.tsb.most.biz.dao.billing;

import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.biz.dataitem.billing.ImportReconcileItem;
import com.tsb.most.biz.parm.billing.SearchImportReconcileParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public class ImportReconcileDao extends BaseDao implements IImportReconcileDao {

    public DataItemList selectImportReconcile(SearchImportReconcileParm param) throws DaoException {
        return unifiedDao.getItemsPage("importReconcile.selectImportReconcile",param);
    }

    public DataItemList selectManifest(SearchImportReconcileParm param) throws DaoException {
        return unifiedDao.getItems("importReconcile.selectManifest",param);
    }
    
    public DataItemList selectOutturnCertificate(SearchImportReconcileParm param) throws DaoException {
	    return unifiedDao.getItems("importReconcile.selectOutturnCertificate",param);
	}
    public DataItemList selectImportReconcileStatus(SearchImportReconcileParm param) throws DaoException {
        return unifiedDao.getItems("importReconcile.selectImportReconcileStatus",param);
    }
    
    public DataItemList importReconcilePackageTypeList(SearchCodeMasterParm param) throws DaoException {
        return unifiedDao.getItems("importReconcile.importReconcilePackageTypeList",param);
    }
    
    public DataItemList importReconcileTransportTypeList(SearchCodeMasterParm param) throws DaoException {
        return unifiedDao.getItems("importReconcile.importReconcileTransportTypeList",param);
    }
    
   	public DataItemList insertImportReconciles(InsertItemsBizParm parm) throws DaoException {
       	try {
   			DataItemList insertItems = parm.getInsertItems();
   			setNewVersion(insertItems);
   			
   			unifiedDao.updateItems(null,"importReconcile.insertImportReconciles", insertItems);
   			
   			setVersion(insertItems);
   			
   			return insertItems;
   		}catch(Exception e){
   			throw new DaoException(e);
   		}
	}
   	
    @Override
	public DataItemList updateImportReconciles(UpdateItemsBizParm parm) throws DaoException {
    	try {
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			
			unifiedDao.updateItems(null,"importReconcile.updateImportReconcile", updateItems);
			
			setVersion(updateItems);
			
			return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    @Override
	public DataItemList deleteImportReconciles(DeleteItemsBizParm parm) throws DaoException {
    	try {
			DataItemList deleteItems = parm.getDeleteItems();
			setNewVersion(deleteItems);
			
			unifiedDao.updateItems(null,"importReconcile.deleteImportReconciles", deleteItems);
			
			setVersion(deleteItems);
			
			return deleteItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    @Override
	public DataItemList insertImportReconcileStatus(InsertItemsBizParm parm) throws DaoException {
    	try {
			DataItemList insertItems = parm.getInsertItems();
			setNewVersion(insertItems);
			
			unifiedDao.updateItems(null,"importReconcile.insertImportReconcileStatus", insertItems);
			
			setVersion(insertItems);
			
			return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    @Override
	public DataItemList updateImportReconcileStatus(UpdateItemsBizParm parm) throws DaoException {
    	try {
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			
			unifiedDao.updateItems(null,"importReconcile.updateImportReconcileStatus", updateItems);
			
			setVersion(updateItems);
			
			return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    @Override
	public DataItemList updateImportReconcileForTsptTpCd(UpdateItemsBizParm parm) throws DaoException {
    	try {
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			
			unifiedDao.updateItems(null,"importReconcile.updateImportReconcileForTsptTpCd", updateItems);
			
			setVersion(updateItems);
			
			return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public void updateImportStatus(TxTraceInfo info, DataItemList updateList)  throws DaoException {
        unifiedDao.updateItems(info,"importReconcile.updateImportReconcileStatus",updateList);
    }
    
    public Integer isDataCollected(SearchImportReconcileParm param) throws DaoException {
    	IDataItem result = unifiedDao.getItems("importReconcile.isDataCollected", param);
    	
    	if(result !=null) {
    		ImportReconcileItem resultItem = (ImportReconcileItem)result;
    		return resultItem.getCount();
    	}else {
    		return 0;	
    	}
    }
    
    public void insertImportStatus(TxTraceInfo info, DataItemList addList)  throws DaoException {
        unifiedDao.insertItems(info,"importReconcile.insertImportReconcileStatus",addList);
    }
    
    public void updateControllerTmtJob(TxTraceInfo info, DataItemList updateList)  throws DaoException {
        unifiedDao.updateItems(info,"importReconcile.updateControllerTmtJob",updateList);
    }
    
    public void updateControllerTmtCgArrvDelv(TxTraceInfo info,  DataItemList updateList)  throws DaoException {
        unifiedDao.updateItems(info,"importReconcile.updateControllerTmtCgArrvDelv",updateList);
    }
}