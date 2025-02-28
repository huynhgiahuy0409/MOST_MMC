package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchBerthMaintenanceParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.exception.DaoException;

public interface IBerthMaintenanceDao {
	public DataItemList selectBerthMaintenanceList(SearchBerthMaintenanceParm parm) throws BizException;
	public DataItemList selectBerthLocList(SearchBerthMaintenanceParm parm) throws DaoException;
	public DataItemList selectBittList(SearchBerthMaintenanceParm parm) throws DaoException;
	public DataItemList selectStoppageReasonList(SearchBerthMaintenanceParm parm) throws DaoException;
	public DataItemList selectDuplicateBerthNoAndStartTime(SearchBerthMaintenanceParm parm) throws DaoException;
	public DataItemList insertBerthMaintenanceList(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateBerthMaintenanceList(UpdateItemsBizParm parm) throws DaoException;
	public void deleteBerthMaintenanceList(DeleteItemsBizParm items) throws DaoException;
}
