package com.tsb.most.biz.dao.document;


import com.tsb.most.biz.parm.document.SearchGeneralCargoLoadingListParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.exception.DaoException;

public class GeneralCargoLoadingListDao extends BaseDao implements IGeneralCargoLoadingListDao {

	public DataItemList selectVesselSchedule(SearchGeneralCargoLoadingListParm parm) throws DaoException{
		try{
            return unifiedDao.getItems("generalCargoLoadingList.selectVesselSchedule", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList selectManifest(SearchGeneralCargoLoadingListParm parm) throws DaoException{
		try{
            return unifiedDao.getItems("generalCargoLoadingList.selectDuplicatedManifest", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList selectShippingNote(SearchGeneralCargoLoadingListParm parm) throws DaoException{
		try{
            return unifiedDao.getItems("generalCargoLoadingList.selectDuplicatedShippingNote", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList selectCommodityHeredity(SearchGeneralCargoLoadingListParm parm) throws BizException {
		try{
            return unifiedDao.getItems("generalCargoLoadingList.selectCommodityHeredity", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	public DataItemList insertMFItem(InsertItemsBizParm parm) throws BizException{
		DataItemList itemList = parm.getInsertItems();
		setNewVersion(itemList);
		unifiedDao.insertItems(null, "generalCargoLoadingList.insertMFItem", itemList);
		setVersion(itemList);
		return itemList;
	}
	
	public DataItemList insertShippingNoteItem(InsertItemsBizParm parm) throws BizException{
		DataItemList itemList = parm.getInsertItems();
		setNewVersion(itemList);
		unifiedDao.insertItems(null, "generalCargoLoadingList.insertShippingNoteItem", itemList);
		unifiedDao.insertItems(null, "generalCargoLoadingList.insertShippingNoteAmtItems", itemList); //Must have this SQL to show the shipping note in the list.
		setVersion(itemList);
		return itemList;
	}
	
	public DataItemList insertShippingNoteDtlItem(InsertItemsBizParm parm) throws BizException{
		DataItemList itemList = parm.getInsertItems();
		setNewVersion(itemList);
		unifiedDao.insertItems(null, "generalCargoLoadingList.insertShippingNoteDtlItem", itemList);
		setVersion(itemList);
		return itemList;
	}
	
	public void deleteMFItems(DeleteItemsBizParm parm) throws BizException{
		DataItemList itemList = parm.getDeleteItems();
		unifiedDao.deleteItems(null, "generalCargoLoadingList.deleteMFItems", itemList);
	}
	
	public void deleteShippingNoteItems(DeleteItemsBizParm parm) throws BizException{
		DataItemList itemList = parm.getDeleteItems();
		unifiedDao.deleteItems(null, "generalCargoLoadingList.deleteShippingNoteItems", itemList);
	}
	
	public void deleteShippingNoteDtlItems(DeleteItemsBizParm parm) throws BizException{
		DataItemList itemList = parm.getDeleteItems();
		unifiedDao.deleteItems(null, "generalCargoLoadingList.deleteShippingNoteDtlItems", itemList);
	}
}
