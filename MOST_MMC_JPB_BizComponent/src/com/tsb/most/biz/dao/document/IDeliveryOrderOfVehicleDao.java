package com.tsb.most.biz.dao.document;

import com.tsb.most.biz.parm.document.SearchDeliveryOrderOfVehicleParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IDeliveryOrderOfVehicleDao {
	public DataItemList selectDeliveryOrderItems(SearchDeliveryOrderOfVehicleParm parm) throws DaoException;
	public DataItemList selectSubDeliveryOrderItems(SearchDeliveryOrderOfVehicleParm parm) throws DaoException;
	public DataItemList selectDeliveryOrderNo(SearchDeliveryOrderOfVehicleParm parm) throws DaoException;
	public DataItemList selectAssignedDriversAndTrucksForVehicleItems(SearchDeliveryOrderOfVehicleParm parm) throws DaoException;
	public DataItemList selectAssigningTrucksForVehicleItems(SearchDeliveryOrderOfVehicleParm parm) throws DaoException;
	public DataItemList selectAssigningDriversForVehicleItems(SearchDeliveryOrderOfVehicleParm parm) throws DaoException;
	public DataItemList insertDriversAndTrucksItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList insertSubDeliveryOrderItems(InsertItemsBizParm parm) throws DaoException;
    public DataItemList updateSubDeliveryOrderItems(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList deleteSubDeliveryOrderItems(DeleteItemsBizParm items) throws DaoException;
    public DataItemList deleteAssignedDriversAndTrucksForVehicleItems(DeleteItemsBizParm items) throws DaoException;
}
