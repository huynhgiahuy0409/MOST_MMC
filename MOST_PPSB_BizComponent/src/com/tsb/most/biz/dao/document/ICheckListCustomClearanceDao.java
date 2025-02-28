package com.tsb.most.biz.dao.document;
import com.tsb.most.biz.parm.document.SearchCheckListCustomClearanceParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ICheckListCustomClearanceDao {
    public DataItemList selectCustomCleranceForExport(SearchCheckListCustomClearanceParm parm) throws DaoException ;
    public DataItemList selectCustomCleranceForImport(SearchCheckListCustomClearanceParm parm) throws DaoException ;
    public DataItemList selectCustomerCleranceListsForTranshipment(SearchCheckListCustomClearanceParm parm) throws DaoException ;
}
