package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchAssignedTruckParm;
import com.tsb.most.biz.parm.monitoring.SearchAssignedTruckPivotParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IAssignedTruck {
	public DataItemList selectLorryListItems(SearchAssignedTruckParm parm) throws BizException;
	public DataItemList selectUnitNoList(SearchAssignedTruckParm parm) throws BizException;
	public DataItemList selectUnitNoListForROROImport(SearchAssignedTruckParm parm) throws BizException;
	public DataItemList selectUnitNoListForROROExport(SearchAssignedTruckParm parm) throws BizException;
	public DataItemList selectLorryListPivotItems(SearchAssignedTruckPivotParm parm) throws BizException;
	public void updateCirPrintItem(UpdateItemsBizParm parm) throws BizException;
}
