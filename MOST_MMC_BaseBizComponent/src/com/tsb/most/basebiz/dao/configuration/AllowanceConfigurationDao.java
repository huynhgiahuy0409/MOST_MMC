package com.tsb.most.basebiz.dao.configuration;

import com.tsb.most.basebiz.parm.configuration.SearchAllowanceConfigurationParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class AllowanceConfigurationDao extends BaseDao implements IAllowanceConfigurationDao {

	@Override
	public DataItemList getAllowanceConfigurationItems(SearchAllowanceConfigurationParm parm) throws DaoException {
		return unifiedDao.getItems("allowanceConfiguration.selectAllowanceConfigurationItems", parm);
	}

	@Override
	public DataItemList getStaffItem(SearchAllowanceConfigurationParm parm) throws DaoException {
		return unifiedDao.getItems("allowanceConfiguration.selectStaffItem", parm);
	}

	@Override
	public DataItemList insertItem(InsertItemsBizParm parm) throws DaoException {
		DataItemList insertItems = parm.getInsertItems();

		setNewVersion(insertItems);
		unifiedDao.insertItems(null, "allowanceConfiguration.insertItem", insertItems);
		setVersion(insertItems);

		return insertItems;
	}

	@Override
	public DataItemList updateItem(UpdateItemsBizParm parm) throws DaoException {
		DataItemList updateItems = parm.getUpdateItems();
		setNewVersion(updateItems);

		unifiedDao.updateItemsWithTimeCheck(null, "allowanceConfiguration.updateItem", updateItems);

		setVersion(updateItems);

		return updateItems;
	}

	@Override
	public DataItemList deleteItem(DeleteItemsBizParm parm) throws DaoException {
		DataItemList deleteItems = parm.getDeleteItems();
		setNewVersion(deleteItems);

		unifiedDao.deleteItemsWithTimeCheck(null, "allowanceConfiguration.deleteItem", deleteItems);
		setVersion(deleteItems);

		return deleteItems;
	}
}