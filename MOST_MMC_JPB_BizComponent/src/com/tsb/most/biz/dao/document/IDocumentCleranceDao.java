package com.tsb.most.biz.dao.document;
import com.tsb.most.biz.parm.document.SearchDocumentCleranceParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IDocumentCleranceDao {
    public DataItemList getDocumentCleranceLists(SearchDocumentCleranceParm parm) throws DaoException ;
    public DataItemList getBethPlanList(SearchDocumentCleranceParm parm) throws DaoException ;
}
