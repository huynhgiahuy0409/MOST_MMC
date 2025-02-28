package com.tsb.most.basebiz.dao.configuration;


import com.tsb.most.basebiz.parm.configuration.SearchServiceOrderSettingParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public class ServiceOrderSettingDao extends BaseDao implements IServiceOrderSettingDao {

    @Override
    public DataItemList selectServiceOrderSettingList(SearchServiceOrderSettingParm parm) throws DaoException {
    	try {
    		return unifiedDao.getItems("serviceOrderSetting.selectServiceOrderSettingList", parm);
	    }catch(Exception e){
			throw new DaoException(e);
		}
    }

    @Override
    public DataItemList selectServiceOrderSettingDetail(SearchServiceOrderSettingParm parm) throws DaoException {
    	try {
    		return unifiedDao.getItems("serviceOrderSetting.selectServiceOrderSettingList", parm);
	    }catch(Exception e){
			throw new DaoException(e);
		}
    }

    @Override
    public int insertServiceOrderSettingDetail(TxTraceInfo txTraceInfo, DataItem item) throws DaoException {
    	try {
    		return unifiedDao.insertItem(txTraceInfo, "serviceOrderSetting.insertServiceOrderSettingItem", item);
	    }catch(Exception e){
			throw new DaoException(e);
		}
    }

    @Override
    public void updateServiceOrderSettingDetail(TxTraceInfo txTraceInfo, DataItem item) throws DaoException {
    	try {
    		unifiedDao.updateItem(txTraceInfo, "serviceOrderSetting.updateServiceOrderSettingItem", item);
	    }catch(Exception e){
			throw new DaoException(e);
		}
    }

    @Override
    public int deleteServiceOrderSettingDetail(TxTraceInfo txTraceInfo, DataItem item) throws DaoException {
    	try {
    		return unifiedDao.deleteItem(txTraceInfo, "serviceOrderSetting.deleteServiceOrderSettingItem", item);
	    }catch(Exception e){
			throw new DaoException(e);
		}
    }

	@Override
	public DataItemList insertServiceOrderConfigurationDetail(InsertItemsBizParm parm) throws DaoException {
		try {
			DataItemList insertItems = parm.getInsertItems();
			setNewVersion(insertItems);	
			
			unifiedDao.insertItems(null,"serviceOrderSetting.insertServiceOrderSettingItem", insertItems);
			
			setVersion(insertItems);			
			
			return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList updateServiceOrderConfigurationDetail(UpdateItemsBizParm parm) throws DaoException {
		try {
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			
			unifiedDao.updateItems(null,"serviceOrderSetting.updateServiceOrderSettingItem", updateItems);
			
			setVersion(updateItems);
			
			return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public DataItemList deleteServiceOrderConfigurationDetail(DeleteItemsBizParm parm) throws DaoException {
		try {
			DataItemList deleteItems = parm.getDeleteItems();
			setNewVersion(deleteItems);
			
			unifiedDao.deleteItems(null,"serviceOrderSetting.deleteServiceOrderSettingItem", deleteItems);
			setVersion(deleteItems);
			
			return deleteItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList selectExtendCategoryCd(SearchServiceOrderSettingParm parm) throws DaoException {
		try {
    		return unifiedDao.getItems("serviceOrderSetting.selectExtendCategoryCd", parm);
	    }catch(Exception e){
			throw new DaoException(e);
		}
	}

}