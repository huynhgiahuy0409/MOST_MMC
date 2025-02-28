package com.tsb.most.biz.dao.operation;


import com.tsb.most.biz.service.operation.ICargoJobDao;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class CargoJobDao extends BaseDao implements ICargoJobDao {

	@Override
	public void upAndDelMstItems(DataItemList items) throws DaoException {
		// TODO Auto-generated method stub
		try {
			setNewVersion(items);
			unifiedDao.updateItems("cargoJob.selectProcedureList", items);
			setVersion(items);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

}