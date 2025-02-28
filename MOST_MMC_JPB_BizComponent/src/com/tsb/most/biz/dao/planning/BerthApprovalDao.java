package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchBerthApprovalParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class BerthApprovalDao extends BaseDao implements IBerthApprovalDao {

	@Override
	public DataItemList getBerthingApprovalList(SearchBerthApprovalParm parm) throws DaoException {
		return unifiedDao.getItems("berthApproval.selectBerthApproval", parm);
	}

	@Override
	public String countBerthingApproval(SearchBerthApprovalParm parm) throws DaoException {
		return null;
	}

	@Override
	public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException {
		try {
			DataItemList insertItems = parm.getInsertItems();

			setNewVersion(insertItems);
			unifiedDao.insertItems(null, "berthApproval.insertItems", insertItems);
			setVersion(insertItems);

			return insertItems;

		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException {
		try {
			DataItemList updateItems = parm.getUpdateItems();

			setNewVersion(updateItems);
			unifiedDao.updateItemsWithTimeCheck(null, "berthApproval.updateBerthApproval", updateItems);
			setVersion(updateItems);

			return updateItems;
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	@Override
	public void deleteItems(DeleteItemsBizParm parm) throws DaoException {
		try {
			setNewVersion(parm.getDeleteItems());
			unifiedDao.deleteItems(null, "berthApproval.deleteItems", parm.getDeleteItems());
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

}
