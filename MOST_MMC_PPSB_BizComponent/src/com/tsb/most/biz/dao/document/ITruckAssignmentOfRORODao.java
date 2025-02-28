package com.tsb.most.biz.dao.document;

import com.tsb.most.biz.parm.document.SearchTruckAssignmentOfROROParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ITruckAssignmentOfRORODao {
    public DataItemList selectTruckAssignmentItems(SearchTruckAssignmentOfROROParm parm) throws DaoException;
    
    public DataItemList selectAssignedDriversAndTrucksForVehicleItems(SearchTruckAssignmentOfROROParm parm) throws DaoException;
	public DataItemList selectAssigningTrucksForVehicleItems(SearchTruckAssignmentOfROROParm parm) throws DaoException;
	public DataItemList selectAssigningDriversForVehicleItems(SearchTruckAssignmentOfROROParm parm) throws DaoException;
	public DataItemList insertDriversAndTrucksItems(InsertItemsBizParm parm) throws DaoException;
    public DataItemList deleteAssignedDriversAndTrucksForVehicleItems(DeleteItemsBizParm items) throws DaoException;
}
