package com.tsb.most.biz.dao.billing;


import com.tsb.most.biz.dataitem.billing.InvoiceDataItem;
import com.tsb.most.biz.dataitem.billing.InvoiceItem;
import com.tsb.most.biz.parm.billing.SearchInvoiceParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public class InvoiceDao extends BaseDao implements IInvoiceDao {
	public DataItemList selectInvoiceItemList(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItemsPage("invoice.selectInvoiceItemList", parm);
    }
	
	public boolean selectInvoiceItemStatCd(SearchInvoiceParm parm) throws DaoException {
        boolean flag = false;
        InvoiceItem resultItem = (InvoiceItem)unifiedDao.readOne("invoice.selectInvoiceItemStatCd", parm);
        
        if(resultItem != null && resultItem.getTotalRowCount() > 0){
            flag = true; 
        }
        
        return flag;
    }
	
	public void updateXmsInvoiceStatus(UpdateItemsBizParm parm) throws DaoException {
		DataItemList updateItems = parm.getUpdateItems();
		
    	setNewVersion(updateItems);
        unifiedDao.updateItems(null,"invoice.updateXmsInvoiceStatus",updateItems);
        setVersion(updateItems);
	}
	
	public void deleteInvoiceItems(DeleteItemsBizParm parm) throws DaoException {
		try {
			DataItemList updateItems = parm.getDeleteItems();
	    	setNewVersion(updateItems);
	        unifiedDao.deleteItems(null, "invoice.deleteInvoiceItems", updateItems);
	        setVersion(updateItems);
    	} catch (Exception e) {
			throw new DaoException(e);
		}
    }
	
	public void updateNullInvoiceNoInInvoiceDataItem(UpdateItemsBizParm parm) throws DaoException {
		DataItemList updateItems = parm.getUpdateItems();
		
    	setNewVersion(updateItems);
        unifiedDao.updateItems(null,"invoice.updateNullInvoiceNoInInvoiceDataItem",updateItems);
        setVersion(updateItems);
    }
	
	
	//////////////////////////////////////////
	//--Invoice Detail---------------------------------------------------------
	public String selectGatherNo(SearchInvoiceParm item) throws DaoException {
		return (String) unifiedDao.readOne ("invoice.selectGatherNo", item);
    }
	
    public String selectInvoiceNo(SearchInvoiceParm parm) throws DaoException {
    	return (String)unifiedDao.readOne("invoice.selectInvoiceNo", parm);
    }
    
	public DataItemList selectInvoiceDetailItem(SearchInvoiceParm parm) throws DaoException {
	    return  unifiedDao.getItems("invoice.selectInvoiceDetailItem", parm);
	}
	
	
	
	public DataItemList getInvoicePayerInfos(SearchInvoiceParm parm) throws DaoException {
		return unifiedDao.getItems("invoice.getInvoicePayerInfos", parm); 
	}
	
	public void deleteInvoiceDataItems(DeleteItemsBizParm parm) throws DaoException {
		try {
			DataItemList updateItems = parm.getDeleteItems();
	    	setNewVersion(updateItems);
	        unifiedDao.deleteItems(null, "invoice.deleteInvoiceDataItems", updateItems);
	        setVersion(updateItems);
    	} catch (Exception e) {
			throw new DaoException(e);
		}
    }
	
	//////////////////////////////////////////
	
    public DataItemList searchInvoiceItems(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("invoice.searchInvoiceItems", parm);
    }
    
    public DataItemList searchInvoiceItemsWithDetail(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("invoice.searchInvoiceItemsWithDetail", parm);
    }
    
    public DataItemList searchInvoiceItemsWithDetailForWhRental(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("invoice.searchInvoiceItemsWithDetailForWhRental", parm);
    }
    
    public DataItemList searchInvoiceItemsWithDetailForNonCallId(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("invoice.searchInvoiceItemsWithDetailForNonCallId", parm);
    }

    public void updateInvoiceErpStatCd(InvoiceItem items,TxTraceInfo txtrace) throws DaoException {
            unifiedDao.updateItem(txtrace,"invoice.updateInvoiceErpStatCd", items);
    }
    
    public DataItemList searchInvoiceItemsForNonCallId(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("invoice.searchInvoiceItemsForNonCallId", parm);
    }
    
    public DataItemList searchInvoiceItemsForWhRental(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("invoice.searchInvoiceItemsForWhRental", parm);
    }

    @Override
    public DataItemList getInvoiceDataAuditItem(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("invoice.selectInvoiceDetailAuditItem", parm);
    }
    
    public void insertInvoiceDataItem(TxTraceInfo txTraceInfo, InvoiceDataItem item) throws DaoException {
        unifiedDao.insertItem(txTraceInfo, "invoice.insertInvoiceDataItem", item);
    }
    
    public void insertInvoiceDataItemDirectInvoice(TxTraceInfo txTraceInfo, InvoiceDataItem item) throws DaoException {
        unifiedDao.insertItem(txTraceInfo, "invoice.insertInvoiceDataItemDirectInvoice", item);
    }

    public void insertInvoiceItem(TxTraceInfo txTraceInfo, InvoiceItem invoiceItem) throws DaoException {
        unifiedDao.insertItem(txTraceInfo, "invoice.insertInvoiceItem", invoiceItem);
    }

    public int updateViewUser(TxTraceInfo txTraceInfo, SearchInvoiceParm parm) throws DaoException {
    	//TODO
    	//Need to change parm type
        //return unifiedDao.updateItemWithTimeCheck(txTraceInfo, "invoice.updateViewUser", parm);
        return 0;
    }
    
    public void updatePrintUser(TxTraceInfo txTraceInfo, InvoiceItem item) throws DaoException {
         unifiedDao.updateItemWithTimeCheck(txTraceInfo, "invoice.updatePrintUser", item);
    }
    
    public DataItemList selectViewUser(TxTraceInfo txTraceInfo, SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("invoice.selectViewUser", parm);
    }
    
    public boolean isInvoiceDataItemExist(InvoiceDataItem item) throws DaoException {
        boolean flag = false;
    	//TODO
    	//Need to change return type
        //String result = (String)unifiedDao.selectItem("invoice.isInvoiceDataItemExist", item);
        String result ="";
        if(result != null && result.equals("1")){
            flag = true; 
        }
        return flag;
    }

    public String generateInvoiceNoSeq(SearchInvoiceParm item) throws DaoException 
    {
    	//TODO
    	//Need to change return type
    	DataItemList tmp = unifiedDao.getItems("invoice.generateInvoiceNoSeq", item);
        
        InvoiceItem returnItem = (InvoiceItem)tmp.get(0);
        
        String ivNo = returnItem.getIvNo().trim();
        return ivNo;
    }

    public DataItemList searchInvoiceDataItems(SearchInvoiceParm parm) throws DaoException {
        return  unifiedDao.getItems("invoice.searchInvoiceDataItems", parm);
    }
    
    public DataItemList searchInvoiceDataItemsForWhRental(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("invoice.searchInvoiceDataItemsForWhRental", parm);
    }

    public DataItemList searchInvoiceDataItemsForExternal(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("invoice.searchInvoiceDataItemsForExternal", parm);
    }

    public DataItemList searchInvoiceDataItemsForExternalForNonCallId(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("invoice.searchInvoiceDataItemsForExternalForNonCallId", parm);
    }
    
    public DataItemList searchInvoiceDataItemsForExternalForWhRental(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("invoice.searchInvoiceDataItemsForExternalForWhRental_2", parm);
    }
    
    public void updateInvoiceDataItem(TxTraceInfo txTraceinfo, InvoiceDataItem item) throws DaoException {
        unifiedDao.updateItem(txTraceinfo, "invoice.updateInvoiceDataItem", item);
    }
    
    public void updateSsrStatus(TxTraceInfo txTraceInfo, InvoiceItem invoiceItem) throws DaoException {
        unifiedDao.updateItem(txTraceInfo, "invoice.updateSsrStatus", invoiceItem);
    }
    
    public void deleteAdhocItemsNonTimeCheck(TxTraceInfo txTraceinfo, InvoiceDataItem item) throws DaoException {
        unifiedDao.deleteItem(txTraceinfo, "invoice.deleteAdhocItems", item);
    }

    public DataItemList getInvoiceNosByPayer(SearchInvoiceParm parm) throws DaoException {
          return unifiedDao.getItems("invoice.getInvoiceNosByPayer", parm);
    }
    
    public DataItemList getInvoiceNosByPayerWhRental(SearchInvoiceParm parm) throws DaoException {
          return unifiedDao.getItems("invoice.getInvoiceNosByPayerWhRental", parm);
    }

    public DataItemList getTariffCodeSRate(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("invoice.getTariffCodeSRate", parm);
    }

    public String getPackageTariffName(SearchInvoiceParm parm) throws DaoException {
    	return "";
    }
    
    public DataItemList getInvoicePrefixInfos(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("invoice.getInvoicePrefixInfos", parm);
    }

    public void updateItem(TxTraceInfo txTraceinfo, InvoiceDataItem item) throws DaoException {
        
    }
    
    public DataItemList searchInvoiceItems4AlertList(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("invoice.searchInvoiceItems4AlertList", parm);
    }
    public DataItemList searchInvoiceItems4AlertListNonJPVC(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("invoice.searchInvoiceItems4AlertListNonJPVC", parm);
    }
    public DataItemList searchinvoiceList4RentalContactByAgent(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("invoice.searchinvoiceList4RentalContactByAgent", parm);
    }
    
    public DataItemList getCalcAmout(SearchInvoiceParm parm) throws DaoException{
    	return unifiedDao.getItems("invoice.getCalcAmout", parm);
    }
    
  //added by Vin - 20191106 - Invoice Detail Screen, payer combo for non jpvc case
    public DataItemList getInvoicePayerInfos2(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("invoice.getInvoicePayerInfos2", parm); 
    }
	
	public DataItemList getInvoicePayerDetailInfos2(SearchInvoiceParm parm) throws DaoException {//added by Vin - 20191025 - Tariff Detail Screen, Payer combo
    	DataItemList rtnList = null;
    	
    	if(rtnList == null || rtnList.size() == 0){
    		rtnList = unifiedDao.getItems("invoice.getInvoicePayerDetailInfos2", parm);
    	}
              
    	return rtnList;
    }
	
	public void transferInvoiceItems(UpdateItemsBizParm parm) throws DaoException {
		try{
			DataItemList updateItems = parm.getUpdateItems();
			
			setNewVersion(updateItems);
    		unifiedDao.updateItems(null, "invoice.updateInvoiceErpStatCd", updateItems);
    		setVersion(updateItems);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
}
