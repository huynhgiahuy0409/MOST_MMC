package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchAssignedTruckParm;
import com.tsb.most.biz.parm.monitoring.SearchAssignedTruckPivotParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IAssignedTruckDao {
    public DataItemList selectLorryListItems(SearchAssignedTruckParm parm) throws DaoException;
    public DataItemList selectUnitNoList(SearchAssignedTruckParm parm) throws DaoException;
    public DataItemList selectUnitNoListForROROImport(SearchAssignedTruckParm parm) throws DaoException;
    public DataItemList selectUnitNoListForROROExport(SearchAssignedTruckParm parm) throws DaoException;
    public DataItemList selectLorryListPivotItems(SearchAssignedTruckPivotParm parm) throws DaoException;
} 
