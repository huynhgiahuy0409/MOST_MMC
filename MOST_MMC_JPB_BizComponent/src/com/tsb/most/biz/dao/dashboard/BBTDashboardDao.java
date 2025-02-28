package com.tsb.most.biz.dao.dashboard;

import com.tsb.most.biz.parm.dashboard.SearchBBTDashboardParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class BBTDashboardDao extends BaseDao implements IBBTDashboardDao {

    @Override
    public DataItemList selectVesselCount(SearchBBTDashboardParm parm) throws DaoException{
    	return unifiedDao.getItems("bbtDashboard.selectVesselCount",parm);
    }
    
    public DataItemList selectWorkShiftDefinition(SearchBBTDashboardParm parm) throws DaoException{
    	return unifiedDao.getItems("bbtDashboard.selectWorkShiftDefinition",parm);
    }

    public DataItemList selectAccidentsCount(SearchBBTDashboardParm parm) throws DaoException{
    	return unifiedDao.getItems("bbtDashboard.selectAccidentsCount",parm);
    }
    
    public DataItemList selectTerminalOccupancy(SearchBBTDashboardParm parm) throws DaoException{
    	return unifiedDao.getItems("bbtDashboard.selectTerminalOccupancy",parm);
    }
    
    public DataItemList selectBulkSummary(SearchBBTDashboardParm parm) throws DaoException{
    	return unifiedDao.getItems("bbtDashboard.selectBulkSummary",parm);
    }
    
    public DataItemList selectCargoOperation(SearchBBTDashboardParm parm) throws DaoException{
    	return unifiedDao.getItems("bbtDashboard.selectCargoOperation",parm);
    }
    
    public DataItemList selectBulkHandlingBalanceCompare(SearchBBTDashboardParm parm) throws DaoException{
    	return unifiedDao.getItems("bbtDashboard.selectBulkHandlingBalanceCompare",parm);
    }
    
    public DataItemList selectBreakDryBulkProductivity(SearchBBTDashboardParm parm) throws DaoException{
    	return unifiedDao.getItems("bbtDashboard.selectBreakDryBulkProductivity",parm);
    }
    
    public DataItemList selectLiquidBulkProductivity(SearchBBTDashboardParm parm) throws DaoException{
    	return unifiedDao.getItems("bbtDashboard.selectLiquidBulkProductivity",parm);
    }
    
    public DataItemList selectLorriesTurnaround(SearchBBTDashboardParm parm) throws DaoException{
    	return unifiedDao.getItems("bbtDashboard.selectLorriesTurnaround",parm);
    }
    
    public DataItemList selectBulkDelay(SearchBBTDashboardParm parm) throws DaoException{
    	return unifiedDao.getItems("bbtDashboard.selectWorkShiftDefinition",parm);
    }
    
    public DataItemList selectWhYdHandling(SearchBBTDashboardParm parm) throws DaoException{
    	return unifiedDao.getItems("bbtDashboard.selectWorkShiftDefinition",parm);
    }


}
