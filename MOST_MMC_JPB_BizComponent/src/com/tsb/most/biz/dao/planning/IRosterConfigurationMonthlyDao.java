package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchRosterConfigurationMonthlyParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public interface IRosterConfigurationMonthlyDao {
    public DataItemList getRosterMonthlySetupList(SearchRosterConfigurationMonthlyParm parm) throws DaoException;
    public DataItemList getRosterSetupList(SearchRosterConfigurationMonthlyParm parm) throws DaoException;
    public DataItemList getRosterSetupReportList(SearchRosterConfigurationMonthlyParm parm) throws DaoException;
    public DataItemList getDayoffSetupList(SearchRosterConfigurationMonthlyParm parm) throws DaoException;
    public DataItemList selectRosterSetupWHList(SearchRosterConfigurationMonthlyParm parm) throws DaoException;
    public DataItemList getRosterSetupShiftList(SearchRosterConfigurationMonthlyParm parm) throws DaoException;
    public DataItemList getIsNotSameRosterType(SearchRosterConfigurationMonthlyParm parm) throws DaoException;
    public void insertRosterSetupItems(TxTraceInfo txTraceInfo,DataItemList items) throws DaoException;
    public DataItemList insertRosterSetupWHItems(InsertItemsBizParm parm) throws DaoException;
    public void updateRosterSetupItems(TxTraceInfo txTraceInfo,DataItemList items) throws DaoException;
    public void deleteRosterSetupItems(TxTraceInfo txTraceInfo,DataItemList items) throws DaoException;
    public void deleteRosterSetupWHItems(DeleteItemsBizParm parm) throws DaoException;
    public void deleteDayoffSetupWHItems(DeleteItemsBizParm parm) throws DaoException;
    public DataItemList selectShiftVesselOperation(SearchRosterConfigurationMonthlyParm parm) throws DaoException ;
    public DataItemList selectRosterMonthlyData(SearchRosterConfigurationMonthlyParm parm) throws DaoException;
    public void deleteRosterSetupMonthlyItem(DeleteItemsBizParm parm) throws DaoException; 
    public DataItemList insertRosterSetupMonthyItems(InsertItemsBizParm parm) throws DaoException;
    public DataItemList selectShiftDef(SearchRosterConfigurationMonthlyParm parm) throws DaoException;
    public DataItemList selectGroupDef(SearchRosterConfigurationMonthlyParm parm) throws DaoException;
}
