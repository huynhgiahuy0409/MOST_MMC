package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchVesselDelayPenaltyReportParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IVesselDelayPenaltyReportDao {
	public DataItemList selectDelayPenaltyReportList(SearchVesselDelayPenaltyReportParm parm)throws DaoException;

	public DataItemList updateVesselDelayItems(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList insertVesselDelayItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList deleteVesselDelayItems(DeleteItemsBizParm parm) throws DaoException;
	public DataItemList selectSpecificDelayCodes(SearchVesselDelayPenaltyReportParm parm) throws DaoException;
}
