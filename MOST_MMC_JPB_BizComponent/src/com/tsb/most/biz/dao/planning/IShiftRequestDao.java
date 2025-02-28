package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchShiftRequestParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IShiftRequestDao {
	public DataItemList getShiftRequestList(SearchShiftRequestParm parm) throws DaoException;

	public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException;

	public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException;

	public void deleteItems(DeleteItemsBizParm parm) throws DaoException;
	
	public DataItemList getShiftRequestItemsForReport(SearchShiftRequestParm parm) throws DaoException;
	
	public DataItemList getVesselShiftingNoticeItemForReport(SearchShiftRequestParm parm) throws DaoException;
	
}
