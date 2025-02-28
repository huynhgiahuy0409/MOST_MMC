package com.tsb.most.biz.dao.planning;

import java.util.List;

import com.tsb.most.biz.parm.planning.SearchConfirmationSlipParm;
import com.tsb.most.biz.parm.planning.SearchMegaParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public interface IConfirmationSlipDao {
    public DataItemList getConfirmationSlip(SearchConfirmationSlipParm parm) throws DaoException;
    public DataItemList getConfirmationSlipDetail(SearchConfirmationSlipParm parm) throws DaoException;
    public DataItemList getConfirmationSlipCount(SearchConfirmationSlipParm parm) throws DaoException;
    public DataItemList getConfirmationSlipOperationType(SearchConfirmationSlipParm parm) throws DaoException;
    
    public void insertConfirmationSlipItems(InsertItemsBizParm parm) throws DaoException;
    public void updateConfirmationSlipItems(UpdateItemsBizParm parm) throws DaoException;
    public void insertConfirmationSlipDetailItems(InsertItemsBizParm parm) throws DaoException;
    public void updateConfirmationSlipDetailItems(UpdateItemsBizParm parm) throws DaoException;
    public void deleteConfirmationSlipDetailItems(DeleteItemsBizParm parm) throws DaoException;
    public void insertConfirmationSlipPtnrItems(InsertItemsBizParm parm) throws DaoException;
    public void deleteConfirmationSlipPtnrItems(DeleteItemsBizParm parm) throws DaoException;
    
    public DataItemList getVesselInfo(SearchConfirmationSlipParm parm) throws DaoException;
    public DataItemList getPassengerSummary(SearchConfirmationSlipParm parm) throws DaoException;
    public DataItemList getPassenger(SearchConfirmationSlipParm parm) throws DaoException;
    public DataItemList getISPS(SearchConfirmationSlipParm parm) throws DaoException;
    public String checkConfirmationUpdate(SearchConfirmationSlipParm parm) throws DaoException;
    public void updateVslPriorityYn(TxTraceInfo txTraceInfo, DataItem item) throws DaoException;
	public DataItemList getConfirmationSlipDetail(SearchMegaParm parm)  throws DaoException;
    
}
