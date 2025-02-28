package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchLoadingParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ILoadingDao {
	public DataItemList selectListOfLoading(SearchLoadingParm parm) throws DaoException;
	public DataItemList selectListOfLoadingSN(SearchLoadingParm parm) throws DaoException;
	
	public DataItemList selectBookingComboItems(SearchLoadingParm parm) throws DaoException;
	public DataItemList selectShippingNoteComboItems(SearchLoadingParm parm) throws DaoException;
	
	public DataItemList selectVesselLoadListReport(SearchLoadingParm parm) throws DaoException;
}
