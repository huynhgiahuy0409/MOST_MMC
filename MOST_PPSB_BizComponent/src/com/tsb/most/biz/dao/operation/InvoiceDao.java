package com.tsb.most.biz.dao.operation;


import com.tsb.most.biz.dataitem.billing.InvoiceDataItem;
import com.tsb.most.biz.dataitem.billing.InvoiceItem;
import com.tsb.most.biz.parm.billing.SearchInvoiceParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public class InvoiceDao extends BaseDao implements IInvoiceDao {

	//Invoice Item List
	public DataItemList selectInvoiceItemList(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItemsPage("Invoice.selectInvoiceItemList", parm);
    }
	//////////////////////////////////////////
	//Invoice Detail
	public DataItemList selectInvoiceDetailItem(SearchInvoiceParm parm) throws DaoException {
	    return  unifiedDao.getItems("Invoice.selectInvoiceDetailItem", parm);
	}
	
	public DataItemList getInvoicePayerInfos(SearchInvoiceParm parm) throws DaoException {
		return unifiedDao.getItems("Invoice.getInvoicePayerInfos", parm); 
	}
	
	public DataItemList getInvoicePayerDetailInfos(SearchInvoiceParm parm) throws DaoException {//added by Vin - 20191025 - Tariff Detail Screen, Payer combo
    	DataItemList rtnList = unifiedDao.getItems("Invoice.getInvoicePayerDetailInfos", parm);
        return rtnList;
    }
	
    public DataItemList getGatheredInvoicePrefixInfos(SearchInvoiceParm parm)  throws DaoException {
        return unifiedDao.getItems("Invoice.getGatheredInvoicePrefixInfos", parm);
    }
	//////////////////////////////////////////
	
    public DataItemList searchInvoiceItems(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("Invoice.searchInvoiceItems", parm);
    }
    
    public DataItemList searchInvoiceItemsWithDetail(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("Invoice.searchInvoiceItemsWithDetail", parm);
    }
    
    public DataItemList searchInvoiceItemsWithDetailForWhRental(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("Invoice.searchInvoiceItemsWithDetailForWhRental", parm);
    }
    
    public DataItemList searchInvoiceItemsWithDetailForNonCallId(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("Invoice.searchInvoiceItemsWithDetailForNonCallId", parm);
    }

    public void updateInvoiceErpStatCd(InvoiceItem items,TxTraceInfo txtrace) throws DaoException {
            unifiedDao.updateItem(txtrace,"Invoice.updateInvoiceErpStatCd", items);
    }
    
    public boolean searchInvoiceItemStarCd(InvoiceDataItem item) throws DaoException {
        boolean flag = false;
    	//TODO
    	//Need to change return type
        SearchInvoiceParm parm = new  SearchInvoiceParm();
        parm.setIvNo(item.getIvNo());
        InvoiceItem resultItem = (InvoiceItem)unifiedDao.readOne("Invoice.searchInvoiceItemStarCd", parm);
        if(resultItem != null && resultItem.getTotalRowCount() > 0){
            flag = true; 
        }
        return flag;
    }
    
    
    public DataItemList searchInvoiceItemsForNonCallId(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("Invoice.searchInvoiceItemsForNonCallId", parm);
    }
    
    public DataItemList searchInvoiceItemsForWhRental(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("Invoice.searchInvoiceItemsForWhRental", parm);
    }

    @Override
    public DataItemList getInvoiceDataAuditItem(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("Invoice.selectInvoiceDetailAuditItem", parm);
    }
    
    public void insertInvoiceDataItem(TxTraceInfo txTraceInfo, InvoiceDataItem item) throws DaoException {
        unifiedDao.insertItem(txTraceInfo, "Invoice.insertInvoiceDataItem", item);
        
    }
    
    public void insertInvoiceDataItemDirectInvoice(TxTraceInfo txTraceInfo, InvoiceDataItem item) throws DaoException {
        unifiedDao.insertItem(txTraceInfo, "Invoice.insertInvoiceDataItemDirectInvoice", item);
        
    }

    public void insertInvoiceItem(TxTraceInfo txTraceInfo, InvoiceItem invoiceItem) throws DaoException {
        unifiedDao.insertItem(txTraceInfo, "Invoice.insertInvoiceItem", invoiceItem);
        
    }

    public int updateViewUser(TxTraceInfo txTraceInfo, SearchInvoiceParm parm) throws DaoException {
    	//TODO
    	//Need to change parm type
        //return unifiedDao.updateItemWithTimeCheck(txTraceInfo, "Invoice.updateViewUser", parm);
        return 0;
    }
    
    public void updatePrintUser(TxTraceInfo txTraceInfo, InvoiceItem item) throws DaoException {
         unifiedDao.updateItemWithTimeCheck(txTraceInfo, "Invoice.updatePrintUser", item);
        
    }
    public void updateXmsInvoiceStatus(TxTraceInfo txTraceInfo, InvoiceItem item) throws DaoException {
         unifiedDao.updateItemWithTimeCheck(txTraceInfo, "Invoice.updateXmsInvoiceStatus", item);
        
    }
    
    public DataItemList selectViewUser(TxTraceInfo txTraceInfo, SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("Invoice.selectViewUser", parm);
        
    }
    
    public boolean isInvoiceDataItemExist(InvoiceDataItem item) throws DaoException {
        boolean flag = false;
    	//TODO
    	//Need to change return type
        //String result = (String)unifiedDao.selectItem("Invoice.isInvoiceDataItemExist", item);
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
    	DataItemList tmp = unifiedDao.getItems("Invoice.generateInvoiceNoSeq", item);
        
        InvoiceItem returnItem = (InvoiceItem)tmp.get(0);
        
        String ivNo = returnItem.getIvNo().trim();
        return ivNo;
    }
    
    public String generateInvoiceNo(SearchInvoiceParm parm) throws DaoException {
    	return (String)unifiedDao.readOne("Invoice.generateInvoiceNo", parm);
    }

    public DataItemList searchInvoiceDataItems(SearchInvoiceParm parm) throws DaoException {
        return  unifiedDao.getItems("Invoice.searchInvoiceDataItems", parm);
    }
    
    public DataItemList searchInvoiceDataItemsForWhRental(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("Invoice.searchInvoiceDataItemsForWhRental", parm);
    }

    public DataItemList searchInvoiceDataItemsForExternal(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("Invoice.searchInvoiceDataItemsForExternal", parm);
    }

    public DataItemList searchInvoiceDataItemsForExternalForNonCallId(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("Invoice.searchInvoiceDataItemsForExternalForNonCallId", parm);
    }
    
    public DataItemList searchInvoiceDataItemsForExternalForWhRental(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("Invoice.searchInvoiceDataItemsForExternalForWhRental_2", parm);
    }
    
    public void updateInvoiceDataItem(TxTraceInfo txTraceinfo, InvoiceDataItem item) throws DaoException {
        unifiedDao.updateItem(txTraceinfo, "Invoice.updateInvoiceDataItem", item);
        
    }

    public void deleteInvoiceItems(TxTraceInfo txTraceinfo, InvoiceDataItem item) throws DaoException {
        unifiedDao.deleteItem(txTraceinfo, "Invoice.deleteInvoiceItems", item);
    }
    
    public void deleteAdhocItemsNonTimeCheck(TxTraceInfo txTraceinfo, InvoiceDataItem item) throws DaoException {
        unifiedDao.deleteItem(txTraceinfo, "Invoice.deleteAdhocItems", item);
    }

    public void updateNullInvoiceNoInInvoiceDataItem(TxTraceInfo txTraceinfo, InvoiceDataItem item) throws DaoException {
        //item.setUserId(txTraceinfo.getUserInfo().getUserId());
        unifiedDao.updateItem(txTraceinfo, "Invoice.updateNullInvoiceNoInInvoiceDataItem", item);
    }

    public String generateInvoiceGatherNo(SearchInvoiceParm item) throws DaoException {
       
        String result = null;
        
       	//TODO
    	//Need to change return type
        DataItemList tmp = unifiedDao.getItems("Invoice.generateInvoiceGatherNo", item);
        /*    if(tmp != null){
                tmp = new Integer(tmp.intValue()+1);
            }else{
                tmp = new Integer(0);
            }*/
        InvoiceDataItem returnItem = (InvoiceDataItem)tmp.get(0);
        
        String value = returnItem.getTmpIvNo().toString();
        value = String.valueOf(Integer.parseInt(value) + 1);
        if(value.length() == 7){
            result = value;
        }else if(value.length() == 6){
            result = (new StringBuffer("0").append(value)).toString(); 
        }else if(value.length() == 5){
            result = (new StringBuffer("00").append(value)).toString(); 
        }else if(value.length() == 4){
            result = (new StringBuffer("000").append(value)).toString(); 
        }else if(value.length() == 3){
            result = (new StringBuffer("0000").append(value)).toString(); 
        }else if(value.length() == 2){
            result = (new StringBuffer("00000").append(value)).toString(); 
        }else if(value.length() == 1){
            result = (new StringBuffer("000000").append(value)).toString(); 
        }else{
            result = "00000000";
        }
        return result;
    }

    public DataItemList getInvoiceNosByPayer(SearchInvoiceParm parm) throws DaoException {
          return unifiedDao.getItems("Invoice.getInvoiceNosByPayer", parm);
    }
    
    public DataItemList getInvoiceNosByPayerWhRental(SearchInvoiceParm parm) throws DaoException {
          return unifiedDao.getItems("Invoice.getInvoiceNosByPayerWhRental", parm);
    }

    public DataItemList getTariffCodeSRate(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("Invoice.getTariffCodeSRate", parm);
    }

    public String getPackageTariffName(SearchInvoiceParm parm) throws DaoException {
       	//TODO
    	//Need to change return type
        //return (String)unifiedDao.selectItem("Invoice.getPackageTariffName", parm);
    	return "";
    }
    
    public DataItemList getInvoicePrefixInfos(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("Invoice.getInvoicePrefixInfos", parm);
    }

    public void updateItem(TxTraceInfo txTraceinfo, InvoiceDataItem item) throws DaoException {
        
    }
    
    public DataItemList searchInvoiceItems4AlertList(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("Invoice.searchInvoiceItems4AlertList", parm);
    }
    public DataItemList searchInvoiceItems4AlertListNonJPVC(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("Invoice.searchInvoiceItems4AlertListNonJPVC", parm);
    }
    public DataItemList searchinvoiceList4RentalContactByAgent(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("Invoice.searchinvoiceList4RentalContactByAgent", parm);
    }
    
    public DataItemList getCalcAmout(SearchInvoiceParm parm) throws DaoException{
    	return unifiedDao.getItems("Invoice.getCalcAmout", parm);
    }
    
  //added by Vin - 20191106 - Invoice Detail Screen, payer combo for non jpvc case
    public DataItemList getInvoicePayerInfos2(SearchInvoiceParm parm) throws DaoException {
        return unifiedDao.getItems("Invoice.getInvoicePayerInfos2", parm); 
    }
	
	public DataItemList getInvoicePayerDetailInfos2(SearchInvoiceParm parm) throws DaoException {//added by Vin - 20191025 - Tariff Detail Screen, Payer combo
    	DataItemList rtnList = null;
             // rtnList = unifiedDao.getItems("Invoice.getInvoicePayerDetailInfosFromAdvice", parm);
              if(rtnList == null || rtnList.size() == 0){
                  rtnList = unifiedDao.getItems("Invoice.getInvoicePayerDetailInfos2", parm);
//                  if(rtnList == null || rtnList.size() == 0){
//                      rtnList = unifiedDao.getItems("Invoice.getInvoicePayerDetailInfosFromAgency", parm);
//                  }
              }
          return rtnList;
    }
}
