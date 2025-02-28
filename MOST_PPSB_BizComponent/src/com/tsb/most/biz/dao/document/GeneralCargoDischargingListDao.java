package com.tsb.most.biz.dao.document;

import com.tsb.most.biz.parm.document.SearchGeneralCargoDischargingListParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.exception.DaoException;

public class GeneralCargoDischargingListDao extends BaseDao implements IGeneralCargoDischargingListDao {
	public DataItemList selectVesselSchedule(SearchGeneralCargoDischargingListParm parm) throws DaoException{
		try{
            return unifiedDao.getItems("generalCargoDischargingList.selectVesselSchedule", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList selectBLList(SearchGeneralCargoDischargingListParm parm) throws BizException {
		try{
            return unifiedDao.getItems("generalCargoDischargingList.selectDuplicatedBL", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList selectMFList(SearchGeneralCargoDischargingListParm parm) throws BizException {
		try{
            return unifiedDao.getItems("generalCargoDischargingList.selectDuplicatedManifest", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList selectCommodityHeredity(SearchGeneralCargoDischargingListParm parm) throws BizException {
		try{
            return unifiedDao.getItems("generalCargoDischargingList.selectCommodityHeredity", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList insertMFItem(InsertItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getInsertItems();
		setNewVersion(itemList);
		unifiedDao.insertItems(null, "generalCargoDischargingList.insertMFItem", itemList);
		setVersion(itemList);
		return itemList;
	}

	@Override
	public DataItemList insertBLItem(InsertItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getInsertItems();
		setNewVersion(itemList);
		unifiedDao.insertItems(null, "generalCargoDischargingList.insertBLItem", itemList);
		setVersion(itemList);
		return itemList;
	}

	@Override
	public DataItemList insertBLDtlItem(InsertItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getInsertItems();
		setNewVersion(itemList);
		unifiedDao.insertItems(null, "generalCargoDischargingList.insertBLDtlItem", itemList);
		setVersion(itemList);
		return itemList;
	}

	@Override
	public void deleteMFItems(DeleteItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getDeleteItems();
		unifiedDao.deleteItems(null, "generalCargoDischargingList.deleteMFItems", itemList);
	}

	@Override
	public void deleteBLItems(DeleteItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getDeleteItems();
		unifiedDao.deleteItems(null, "generalCargoDischargingList.deleteBLItems", itemList);
	}

	@Override
	public void deleteBLDtlItems(DeleteItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getDeleteItems();
		unifiedDao.deleteItems(null, "generalCargoDischargingList.deleteBLDtlItems", itemList);
	}
}
