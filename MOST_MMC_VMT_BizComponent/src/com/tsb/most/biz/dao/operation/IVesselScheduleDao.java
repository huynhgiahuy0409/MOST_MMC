package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchVesselScheduleParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IVesselScheduleDao {
	//public DataItemList selectVesselScheduleList(SearchVesselScheduleParm parm) throws DaoException;
	public DataItemList selectBerthInfo(SearchVesselScheduleParm parm) throws DaoException;
	public DataItemList updateVesselDetailItem(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList selectBerthInfoList(SearchVesselScheduleParm parm) throws DaoException;
}
