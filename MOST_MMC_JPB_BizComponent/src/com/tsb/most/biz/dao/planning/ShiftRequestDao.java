package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchShiftRequestParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class ShiftRequestDao extends BaseDao implements IShiftRequestDao {

	@Override
	public DataItemList getShiftRequestList(SearchShiftRequestParm parm) throws DaoException {
		try {
			DataItemList returnList = null;
			returnList = unifiedDao.getItems("shiftRequest.selectShiftRequestList", parm);
			return returnList;
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException {
		try {
			DataItemList itemList = parm.getUpdateItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "shiftRequest.updateShiftRequestItems", itemList);
			setVersion(itemList);
			return itemList;
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	@Override
	public void deleteItems(DeleteItemsBizParm parm) throws DaoException {
		// TODO Auto-generated method stub

	}

	@Override
	public DataItemList getShiftRequestItemsForReport(SearchShiftRequestParm parm) throws DaoException {
		try {
			DataItemList returnList = null;
			returnList = unifiedDao.getItems("shiftRequest.selectShiftRequestItemsForReport", parm);
			return returnList;
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList getVesselShiftingNoticeItemForReport(SearchShiftRequestParm parm) throws DaoException {
		try {
			DataItemList returnList = null;
			returnList = unifiedDao.getItems("shiftRequest.selectVesselShiftingNoticeItemForReport", parm);
			return returnList;
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

}
