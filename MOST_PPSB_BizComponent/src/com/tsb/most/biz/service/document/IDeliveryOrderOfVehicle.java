package com.tsb.most.biz.service.document;

import com.tsb.most.biz.parm.document.SearchDeliveryOrderOfVehicleParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IDeliveryOrderOfVehicle {
	public DataItemList selectDeliveryOrderItems(SearchDeliveryOrderOfVehicleParm parm) throws BizException;
	public DataItemList selectSubDeliveryOrderItems(SearchDeliveryOrderOfVehicleParm parm) throws BizException;
	public DataItemList selectAssigningDriversForVehicleItems(SearchDeliveryOrderOfVehicleParm parm) throws BizException;
	public DataItemList selectAssignedDriversAndTrucksForVehicleItems(SearchDeliveryOrderOfVehicleParm parm) throws BizException;
	public DataItemList selectAssigningTrucksForVehicleItems(SearchDeliveryOrderOfVehicleParm parm) throws BizException;
	public DataItemList insertDriversAndTrucksItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList insertSubDeliveryOrderItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateSubDeliveryOrderItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteSubDeliveryOrderItems(DeleteItemsBizParm parm) throws BizException;
	public DataItemList deleteAssignedDriversAndTrucksForVehicleItems(DeleteItemsBizParm parm) throws BizException;
}
