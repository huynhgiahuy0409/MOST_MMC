package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.dataitem.billing.InvoiceTemplateItem;
import com.tsb.most.biz.parm.billing.SearchInvoiceTemplateParm;
import com.tsb.most.biz.parm.billing.SearchTariffCodeParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public interface IInvoiceTemplateDao {
    public DataItemList selectAllInvoiceTemplate(SearchInvoiceTemplateParm param) throws DaoException;
    public DataItemList selectCmbInvoiceTemp(SearchInvoiceTemplateParm param) throws DaoException;
    public DataItemList selectTariffTemplate(SearchInvoiceTemplateParm param) throws DaoException;
    public DataItemList selectTariffCode(SearchTariffCodeParm param) throws DaoException;
    
    public DataItemList insertTemplates(InsertItemsBizParm parm)  throws DaoException;
    public DataItemList updateTemplates(UpdateItemsBizParm parm)  throws DaoException;
    public DataItemList deleteTemplates(DeleteItemsBizParm parm) throws DaoException ;
    public Integer isItemExist(InvoiceTemplateItem item) throws DaoException;
    public DataItemList insertTariffTypes(InsertItemsBizParm parm)  throws DaoException;
    
    public DataItemList deleteTariffByTemplateCodes(DeleteItemsBizParm parm)  throws DaoException;
    public DataItemList updateTariffCode(UpdateItemsBizParm parm)  throws DaoException;
}
