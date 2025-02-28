package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchLoadingParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class LoadingDao extends BaseDao implements ILoadingDao {
	
	public DataItemList selectListOfLoading(SearchLoadingParm parm) throws DaoException {
        return unifiedDao.getItemsPage("loading.selectListOfLoading", parm);
    }
	
	public DataItemList selectListOfLoadingSN(SearchLoadingParm parm) throws DaoException {
        return unifiedDao.getItems("loading.selectListOfLoadingSN", parm);
    }
	
	public DataItemList selectBookingComboItems(SearchLoadingParm parm) throws DaoException {
        return unifiedDao.getItems("loading.selectBookingComboItems", parm);
    }
	
	public DataItemList selectShippingNoteComboItems(SearchLoadingParm parm) throws DaoException {
        return unifiedDao.getItems("loading.selectShippingNoteComboItems", parm);
    }
	
	public DataItemList selectVesselLoadListReport(SearchLoadingParm parm) throws DaoException {
        return unifiedDao.getItems("loading.selectVesselLoadListReport", parm);
    }
}
