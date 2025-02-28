package com.tsb.most.biz.dao.document;

import com.tsb.most.biz.dataitem.document.RORODischargingListItem;
import com.tsb.most.biz.parm.document.SearchRORODischargingListParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.exception.DaoException;

public class RORODischargingListDao extends BaseDao implements IRORODischargingListDao {
	public DataItemList selectVesselSchedule(SearchRORODischargingListParm parm) throws DaoException{
		try{
            return unifiedDao.getItems("rORODischargingList.selectVesselSchedule", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList selectBLList(SearchRORODischargingListParm parm) throws BizException {
		try{
            return unifiedDao.getItems("rORODischargingList.selectDuplicatedBL", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList selectMFList(SearchRORODischargingListParm parm) throws BizException {
		try{
            return unifiedDao.getItems("rORODischargingList.selectDuplicatedManifest", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList selectCommodityHeredity(SearchRORODischargingListParm parm) throws BizException {
		try{
            return unifiedDao.getItems("rORODischargingList.selectCommodityHeredity", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public DataItemList insertMFItem(InsertItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getInsertItems();
		setNewVersion(itemList);
		unifiedDao.insertItems(null, "rORODischargingList.insertMFItem", itemList);
		setVersion(itemList);
		return itemList;
	}

	@Override
	public DataItemList insertBLItem(InsertItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getInsertItems();
		setNewVersion(itemList);
		unifiedDao.insertItems(null, "rORODischargingList.insertBLItem", itemList);
		setVersion(itemList);
		return itemList;
	}

	@Override
	public DataItemList insertBLDtlItem(InsertItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getInsertItems();
		setNewVersion(itemList);
		unifiedDao.insertItems(null, "rORODischargingList.insertBLDtlItem", itemList);
		setVersion(itemList);
		return itemList;
	}

	@Override
	public void deleteMFItems(DeleteItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getDeleteItems();
		unifiedDao.deleteItems(null, "GeneralCargoDischargingList.deleteMFItems", itemList);
	}

	@Override
	public void deleteBLItems(DeleteItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getDeleteItems();
		unifiedDao.deleteItems(null, "GeneralCargoDischargingList.deleteBLItems", itemList);
	}

	@Override
	public void deleteBLDtlItems(DeleteItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getDeleteItems();
		unifiedDao.deleteItems(null, "GeneralCargoDischargingList.deleteBLDtlItems", itemList);
	}
	
	@Override
	public DataItemList selectBrand(RORODischargingListItem parm) throws BizException {
		try {
            return unifiedDao.getItems("rORODischargingList.selectROROBrand", parm);
		} catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public DataItemList selectModel(RORODischargingListItem parm) throws BizException {
		try {
            return unifiedDao.getItems("rORODischargingList.selectROROModel", parm);
		} catch(Exception e){
			throw new DaoException(e);
		}
	}
}
