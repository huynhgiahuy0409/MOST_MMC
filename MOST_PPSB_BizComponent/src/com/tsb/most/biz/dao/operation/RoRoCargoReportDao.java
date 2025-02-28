package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchRoRoCargoReportParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class RoRoCargoReportDao extends BaseDao implements IRoRoCargoReportDao {
  
	public DataItemList selectRoRoVinByShiftReportItems(SearchRoRoCargoReportParm parm) throws DaoException {
        return unifiedDao.getItems("RoRoCargoReportMAP.selectRoRoVinByShiftReportItems", parm);
    }
	
	public DataItemList selectRoRoDamageVinByShiftReportItems(SearchRoRoCargoReportParm parm) throws DaoException {
        return unifiedDao.getItems("RoRoCargoReportMAP.selectRoRoDamageVinByShiftReportItems", parm);
    }
	
	public DataItemList selectInventoryPerVinAndShiftReportItems(SearchRoRoCargoReportParm parm) throws DaoException {
        return unifiedDao.getItems("RoRoCargoReportMAP.selectInventoryPerVinAndShiftReportItems", parm);
    }
}
