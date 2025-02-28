package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.dataitem.operation.ServiceOrderItem;
import com.tsb.most.biz.parm.operation.SearchServiceOrderParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public class ServiceOrderDao extends BaseDao implements IServiceOrderDao {

    public DataItemList getServiceOrderNo(SearchServiceOrderParm parm) throws DaoException {
    	try {
    		return unifiedDao.getItems("serviceOrder.selectSvcOdrNo", parm);
	    }catch(Exception e){
			throw new DaoException(e);
		}
    }

    public DataItemList getServiceOrderConf(SearchServiceOrderParm parm) throws DaoException {
    	try {
    		return unifiedDao.getItems("serviceOrder.selectServiceOrderConf", parm);
	    }catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectServiceOrderList(SearchServiceOrderParm parm) throws DaoException {
    	try {
    		return unifiedDao.getItems("serviceOrder.selectServiceOrderInfo", parm);
	    }catch(Exception e){
			throw new DaoException(e);
		}
    }

    public DataItemList selectServiceOrderItem(SearchServiceOrderParm parm) throws DaoException {
    	try {
    		return unifiedDao.getItems("serviceOrder.selectServiceOrderItem", parm);
	    }catch(Exception e){
			throw new DaoException(e);
		}
    }

    public DataItemList getRoadBunkeringList(SearchServiceOrderParm parm) throws DaoException {
    	try {
    		return unifiedDao.getItems("serviceOrder.selectRoadBunkeringList", parm);
	    }catch(Exception e){
			throw new DaoException(e);
		}
    }

    public void insertServiceOrderItem(TxTraceInfo txTraceInfo, ServiceOrderItem item) throws DaoException {
    	try {
    		unifiedDao.insertItem(txTraceInfo, "serviceOrder.insertServiceOrderItem", item);
	    }catch(Exception e){
			throw new DaoException(e);
		}
    }

    public void updateServiceOrderItem(TxTraceInfo txTraceInfo, ServiceOrderItem item) throws DaoException {
    	try {
    		unifiedDao.updateItem(txTraceInfo, "serviceOrder.updateServiceOrderItem", item);
	    }catch(Exception e){
			throw new DaoException(e);
		}
    }

    public void deleteServiceOrderItem(TxTraceInfo txTraceInfo, ServiceOrderItem item) throws DaoException {
    	try {
    		unifiedDao.deleteItem(txTraceInfo, "serviceOrder.deleteServiceOrderItem", item);
	    }catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    @Override
	public DataItemList insertServiceOrderItem(InsertItemsBizParm parm) throws DaoException {
    	try {
			DataItemList insertItems = parm.getInsertItems();
			setNewVersion(insertItems);	
			
			unifiedDao.insertItems(null,"serviceOrder.insertServiceOrderItem", insertItems);
			
			setVersion(insertItems);			
			
			return insertItems;
	    }catch(Exception e){
			throw new DaoException(e);
		}
	}
	@Override
	public DataItemList updateServiceOrderItem(UpdateItemsBizParm parm) throws DaoException {
		try {
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			
			unifiedDao.updateItems(null,"serviceOrder.updateServiceOrderItem", updateItems);
			
			setVersion(updateItems);
			
			return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	@Override
	public DataItemList deleteServiceOrderItem(DeleteItemsBizParm parm) throws DaoException {
		try {
			DataItemList deleteItems = parm.getDeleteItems();
			setNewVersion(deleteItems);
			
			unifiedDao.deleteItems(null,"serviceOrder.deleteServiceOrderItem", deleteItems);
			setVersion(deleteItems);
			
			return deleteItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList selectBLItems(SearchServiceOrderParm parm) throws DaoException {
		return unifiedDao.getItems("serviceOrder.selectBLItems", parm);
	}

	@Override
	public DataItemList selectShippingNoteItems(SearchServiceOrderParm parm) throws DaoException {
		return unifiedDao.getItems("serviceOrder.selectShippingNoteItems", parm);
	}

	@Override
	public DataItemList selectBLSNItems(SearchServiceOrderParm parm) throws DaoException {
		return unifiedDao.getItems("serviceOrder.selectBLSNItems", parm);
	}
}
