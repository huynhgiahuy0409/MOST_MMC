package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchRoRoCargoReportParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IRoRoCargoReportDao {
	public DataItemList selectRoRoVinByShiftReportItems(SearchRoRoCargoReportParm parm) throws DaoException;
	public DataItemList selectRoRoDamageVinByShiftReportItems(SearchRoRoCargoReportParm parm) throws DaoException;
	public DataItemList selectInventoryPerVinAndShiftReportItems(SearchRoRoCargoReportParm parm) throws DaoException;
}
