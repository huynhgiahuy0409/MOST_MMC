package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchDischargingParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class DischargingDao extends BaseDao implements IDischargingDao {
	
	public DataItemList selectListOfDischarging(SearchDischargingParm parm) throws DaoException {
        return unifiedDao.getItemsPage("discharging.selectListOfDischarging", parm);
    }
	
	public DataItemList selectModeOfOpr() throws DaoException {
        return unifiedDao.getItems("discharging.selectModeOfOpr", null);
    }
	 
	public DataItemList selectNumbPage(SearchDischargingParm parm) throws DaoException {
        return unifiedDao.getItems("discharging.selectNumbPage", parm);
    }
	
	public DataItemList selectImportManifestComboList(SearchDischargingParm parm) throws DaoException {
        return unifiedDao.getItems("discharging.selectImportManifestComboList", parm);
    }
	
	public DataItemList selectImportBLComboList(SearchDischargingParm parm) throws DaoException {
        return unifiedDao.getItems("discharging.selectImportBLComboList", parm);
    }
	
	public DataItemList selectVesselDischargeListReport(SearchDischargingParm parm) throws DaoException {
        return unifiedDao.getItems("discharging.selectVesselDischargeListReport", parm);
    }
	
	public DataItemList selectCertOfShrtLandedOvLandedCargoReport(SearchDischargingParm parm) throws DaoException {
        return unifiedDao.getItems("discharging.selectCertOfShrtLandedOvLandedCargoReport", parm);
    }
}
