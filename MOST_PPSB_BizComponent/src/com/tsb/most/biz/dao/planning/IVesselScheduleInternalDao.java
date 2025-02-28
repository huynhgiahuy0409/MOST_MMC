package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchVesselScheduleParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IVesselScheduleInternalDao {
    public DataItemList selectVesselScheduleList(SearchVesselScheduleParm parm) throws DaoException;
    public DataItemList selectConfirmationSlip(SearchVesselScheduleParm parm) throws DaoException;
    public DataItemList selectConfirmationSlipDetail(SearchVesselScheduleParm parm) throws DaoException;
    public DataItemList selectVORLiquidCargo(SearchVesselScheduleParm parm) throws DaoException;
    public DataItemList selectConfirmationSlipOperationType(SearchVesselScheduleParm parm) throws DaoException;
    public DataItemList selectVesselInfo(SearchVesselScheduleParm parm) throws DaoException;
    public DataItemList selectVesselScheduleDetail(SearchVesselScheduleParm parm) throws DaoException;
    public DataItemList selectBerthInfo(SearchVesselScheduleParm parm) throws DaoException;
    public DataItemList selectVslTpCombo(SearchVesselScheduleParm parm) throws DaoException;
    public void insertConfirmationSlipItems(InsertItemsBizParm parm) throws DaoException;
    public DataItemList selectConfirmationSlipCount(SearchVesselScheduleParm parm) throws DaoException;
    public DataItemList selectBerthValidation(SearchVesselScheduleParm parm) throws DaoException;
    public void updateConfirmationSlipItems(UpdateItemsBizParm parm) throws DaoException;
    public void updateVesselDetailItem(UpdateItemsBizParm parm) throws DaoException;
    public void insertConfirmationSlipDetailItems(InsertItemsBizParm parm) throws DaoException;
    public void updateConfirmationSlipDetailItems(UpdateItemsBizParm parm) throws DaoException;
    public void deleteConfirmationSlipDetailItems(DeleteItemsBizParm parm) throws DaoException;
}
