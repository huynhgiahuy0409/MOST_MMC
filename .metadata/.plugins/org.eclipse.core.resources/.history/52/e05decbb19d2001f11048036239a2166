package com.tsb.most.biz.dao.document;

import com.tsb.most.biz.parm.document.SearchTruckAssignmentParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ITruckAssignmentDao {
    public DataItemList selectGoodReceiptItems(SearchTruckAssignmentParm parm) throws DaoException;
    public DataItemList selectSubDoNoItems(SearchTruckAssignmentParm parm) throws DaoException;
    public DataItemList selectGoodReceiptItemforAssigment(SearchTruckAssignmentParm parm) throws DaoException;
    public DataItemList selectTruckAssignmentItems(SearchTruckAssignmentParm parm) throws DaoException;
    public DataItemList selectTruckRegistrationItems(SearchTruckAssignmentParm parm) throws DaoException;
    public DataItemList selectDriverRegistrationItems(SearchTruckAssignmentParm parm) throws DaoException;
    public DataItemList selectChangeBLSNo(SearchTruckAssignmentParm parm) throws DaoException;
    public DataItemList selectAssignmentLorrysGateItems(SearchTruckAssignmentParm parm) throws DaoException;
    public DataItemList selectInternalMovementTicketReport(SearchTruckAssignmentParm parm) throws DaoException;
    
    public DataItemList insertTruckAssignment(InsertItemsBizParm parm) throws DaoException;
    public DataItemList updateTruckAssignment(UpdateItemsBizParm parm) throws DaoException;
    public void deleteTruckAssignment(DeleteItemsBizParm parm) throws DaoException;
}
