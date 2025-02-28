package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchDischargingParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IDischargingDao {
	public DataItemList selectListOfDischarging(SearchDischargingParm parm) throws DaoException;
	public DataItemList selectModeOfOpr() throws DaoException;
	public DataItemList selectNumbPage(SearchDischargingParm parm) throws DaoException;
	
	public DataItemList selectImportManifestComboList(SearchDischargingParm parm) throws DaoException;
	public DataItemList selectImportBLComboList(SearchDischargingParm parm) throws DaoException;
	
	public DataItemList selectVesselDischargeListReport(SearchDischargingParm parm) throws DaoException;
	public DataItemList selectCertOfShrtLandedOvLandedCargoReport(SearchDischargingParm parm) throws DaoException;
}
