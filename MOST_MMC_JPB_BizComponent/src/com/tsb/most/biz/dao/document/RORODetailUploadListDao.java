package com.tsb.most.biz.dao.document;


import com.tsb.most.biz.parm.document.SearchROROLoadingListParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.exception.DaoException;

public class RORODetailUploadListDao extends BaseDao implements IRORODetailUploadListDao {

	public DataItemList selectVesselSchedule(SearchROROLoadingListParm parm) throws DaoException{
		try{
            return unifiedDao.getItems("rOROLoadingList.selectVesselSchedule", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList selectManifest(SearchROROLoadingListParm parm) throws DaoException{
		try{
            return unifiedDao.getItems("rOROLoadingList.selectDuplicatedManifest", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList selectShippingNote(SearchROROLoadingListParm parm) throws DaoException{
		try{
            return unifiedDao.getItems("rOROLoadingList.selectDuplicatedShippingNote", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList selectCommodityHeredity(SearchROROLoadingListParm parm) throws BizException {
		try{
            return unifiedDao.getItems("rOROLoadingList.selectCommodityHeredity", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	public DataItemList insertMFItem(InsertItemsBizParm parm) throws BizException{
		DataItemList itemList = parm.getInsertItems();
		setNewVersion(itemList);
		unifiedDao.insertItems(null, "rOROLoadingList.insertMFItem", itemList);
		setVersion(itemList);
		return itemList;
	}
	
	public DataItemList insertShippingNoteItem(InsertItemsBizParm parm) throws BizException{
		DataItemList itemList = parm.getInsertItems();
		setNewVersion(itemList);
		unifiedDao.insertItems(null, "rOROLoadingList.insertShippingNoteItem", itemList);
		setVersion(itemList);
		return itemList;
	}
	
	public DataItemList insertShippingNoteDtlItem(InsertItemsBizParm parm) throws BizException{
		DataItemList itemList = parm.getInsertItems();
		setNewVersion(itemList);
		unifiedDao.insertItems(null, "rOROLoadingList.insertShippingNoteDtlItem", itemList);
		setVersion(itemList);
		return itemList;
	}
	
	public void deleteMFItems(DeleteItemsBizParm parm) throws BizException{
		DataItemList itemList = parm.getDeleteItems();
		unifiedDao.deleteItems(null, "rOROLoadingList.deleteMFItems", itemList);
	}
	
	public void deleteShippingNoteItems(DeleteItemsBizParm parm) throws BizException{
		DataItemList itemList = parm.getDeleteItems();
		unifiedDao.deleteItems(null, "rOROLoadingList.deleteShippingNoteItems", itemList);
	}
	
	public void deleteShippingNoteDtlItems(DeleteItemsBizParm parm) throws BizException{
		DataItemList itemList = parm.getDeleteItems();
		unifiedDao.deleteItems(null, "rOROLoadingList.deleteShippingNoteDtlItems", itemList);
	}
}
