package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.dataitem.billing.InvoiceTemplateItem;
import com.tsb.most.biz.parm.billing.SearchInvoiceTemplateParm;
import com.tsb.most.biz.parm.billing.SearchTariffCodeParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public class InvoiceTemplateDao extends BaseDao implements IInvoiceTemplateDao{

    public DataItemList selectAllInvoiceTemplate(SearchInvoiceTemplateParm param) throws DaoException {
        return unifiedDao.getItemsPage("invoiceTemplate.selectAllInvoiceTemplate",param);
    }
    
    public DataItemList selectCmbInvoiceTemp(SearchInvoiceTemplateParm param) throws DaoException {
        return unifiedDao.getItems("invoiceTemplate.selectCmbInvoiceTemp",param);
    }
    
    public DataItemList selectTariffTemplate(SearchInvoiceTemplateParm param) throws DaoException {
        return unifiedDao.getItems("invoiceTemplate.selectTariffTemplate",param);
    }
    
    public DataItemList selectTariffCode(SearchTariffCodeParm param) throws DaoException{
        return unifiedDao.getItemsPage("invoiceTemplate.selectTariffCode",param);
    }
    
    public DataItemList insertTemplates(InsertItemsBizParm parm)  throws DaoException {
    	try {
  			DataItemList insertItems = parm.getInsertItems();
  			setNewVersion(insertItems);	
  			
  			unifiedDao.insertItems(null,"invoiceTemplate.insertInvoiceTemplate", insertItems);
  			
  			setVersion(insertItems);			
  			
  			return insertItems;
  		}catch(Exception e){
  			throw new DaoException(e);
  		}
    }

    public DataItemList updateTemplates(UpdateItemsBizParm parm)  throws DaoException {
        try {
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			
			unifiedDao.updateItems(null,"invoiceTemplate.updateInvoiceTemplate", updateItems);
			
			setVersion(updateItems);
			
			return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    public DataItemList updateTariffCode(UpdateItemsBizParm parm)  throws DaoException {
      try {
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			
			unifiedDao.updateItems(null,"invoiceTemplate.updateTariffCode", updateItems);
			
			setVersion(updateItems);
			
			return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
  }

    public DataItemList deleteTemplates(DeleteItemsBizParm parm)  throws DaoException {
        try {
			DataItemList deleteItems = parm.getDeleteItems();
			setNewVersion(deleteItems);
			
			unifiedDao.deleteItems(null,"invoiceTemplate.deleteInvoiceTemplate", deleteItems);
			setVersion(deleteItems);
			
			return deleteItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }

    public Integer isItemExist(InvoiceTemplateItem item) throws DaoException {
       	//TODO
    	//Need to change return type
        //return  (Integer) unifiedDao.selectItem("invoiceTemplate.isItemExisted",item);
    	return 0;
    }
    
    public DataItemList insertTariffTypes(InsertItemsBizParm parm)  throws DaoException {
    	try {
			DataItemList insertItems = parm.getInsertItems();
			setNewVersion(insertItems);	
			
			unifiedDao.insertItems(null,"invoiceTemplate.insertTariffTemplate", insertItems);
			
			setVersion(insertItems);			
			
			return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList deleteTariffByTemplateCodes(DeleteItemsBizParm parm)  throws DaoException {
    	try {
			DataItemList deleteItems = parm.getDeleteItems();
			setNewVersion(deleteItems);
			
			unifiedDao.deleteItems(null,"invoiceTemplate.deleteTariffByTemplateCode", deleteItems);
			setVersion(deleteItems);
			
			return deleteItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }

}
