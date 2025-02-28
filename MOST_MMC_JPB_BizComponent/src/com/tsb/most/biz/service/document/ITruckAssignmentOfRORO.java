package com.tsb.most.biz.service.document;

import com.tsb.most.biz.parm.document.SearchTruckAssignmentOfROROParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface ITruckAssignmentOfRORO {
	public DataItemList selectTruckAssignmentItems(SearchTruckAssignmentOfROROParm parm) throws BizException ;
	public DataItemList selectAssigningDriversForVehicleItems(SearchTruckAssignmentOfROROParm parm) throws BizException;
	public DataItemList selectAssignedDriversAndTrucksForVehicleItems(SearchTruckAssignmentOfROROParm parm) throws BizException;
	public DataItemList selectAssigningTrucksForVehicleItems(SearchTruckAssignmentOfROROParm parm) throws BizException;
	public DataItemList insertDriversAndTrucksItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList deleteAssignedDriversAndTrucksForVehicleItems(DeleteItemsBizParm parm) throws BizException;
}
