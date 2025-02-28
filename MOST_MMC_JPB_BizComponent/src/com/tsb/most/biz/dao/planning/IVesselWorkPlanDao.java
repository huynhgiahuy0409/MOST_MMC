package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.dataitem.planning.VesselWorkPlanItem;
import com.tsb.most.biz.parm.planning.SearchVesselWorkPlanParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IVesselWorkPlanDao {
    public DataItemList selectVesselWorkPLanList(SearchVesselWorkPlanParm parm) throws DaoException;
    public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException;
    public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException;
    public void deleteAllItems(DeleteItemsBizParm parm)throws DaoException;
	public DataItemList insertHatchPlan(InsertItemsBizParm insertVslBLItems)throws DaoException;
	public DataItemList selectVslBaplieItem(VesselWorkPlanItem item)throws DaoException;
	public String createNextSeq()throws DaoException;
}
