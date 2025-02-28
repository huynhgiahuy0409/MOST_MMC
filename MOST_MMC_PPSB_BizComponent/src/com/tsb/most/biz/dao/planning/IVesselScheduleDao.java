package com.tsb.most.biz.dao.planning;

//import com.tsb.most.biz.parm.document.SearchBLParm;
import com.tsb.most.biz.parm.planning.SearchVesselScheduleParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IVesselScheduleDao {
    public DataItemList selectVesselScheduleList(SearchVesselScheduleParm parm) throws DaoException;
    public DataItemList selectVesselScheduleDetail(SearchVesselScheduleParm parm) throws DaoException;
    public DataItemList selectBerthInfoList(SearchVesselScheduleParm parm) throws DaoException;
//    public DataItemList selectBLNoList(SearchBLParm parm) throws DaoException;
    
    public void updateVesselDetailItem(UpdateItemsBizParm parm) throws DaoException;
    public String countVesselSchedule(SearchVesselScheduleParm parm)throws DaoException; 
}
