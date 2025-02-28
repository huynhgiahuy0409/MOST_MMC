package com.tsb.most.biz.service.billing;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.biz.dao.billing.ICostCenterDao;
import com.tsb.most.biz.dao.billing.IInvoiceDao;
import com.tsb.most.biz.dao.billing.ISSRListDao;
import com.tsb.most.biz.dataitem.billing.InvoiceDataItem;
import com.tsb.most.biz.dataitem.billing.InvoiceItem;
import com.tsb.most.biz.dataitem.billing.SSRListItem;
import com.tsb.most.biz.parm.billing.SearchCostCenterParm;
import com.tsb.most.biz.parm.billing.SearchInvoiceParm;
import com.tsb.most.biz.parm.billing.SearchSSRListParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.constants.CommonConstants;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class SSRList extends MOSTBaseService implements ISSRList{
	private ISSRListDao ssrListDao;
	private IInvoiceDao invoiceDao;
	private ICostCenterDao costCenterDao;
	 
    public void setssrListDao(ISSRListDao ssrListDao) {
		this.ssrListDao = ssrListDao;
	}

    public void setInvoiceDao(IInvoiceDao invoiceDao) {
        this.invoiceDao = invoiceDao;
    }

	public void setCostCenterDao(ICostCenterDao costCenterDao) {
		this.costCenterDao = costCenterDao;
	}

	public DataItemList selectSSRList(SearchSSRListParm parm) throws BizException {
       return ssrListDao.selectSSRList(parm);
    }
    
    public DataItemList selectInvoicedSSR(SearchSSRListParm parm) throws BizException {
       return ssrListDao.selectInvoicedSSR(parm);
    }
    
    public DataItemList selectVesselInfo(SearchSSRListParm parm) throws BizException {
        return ssrListDao.selectVesselInfo(parm);
     }
	
    public DataItemList selectCostCenter(SearchCostCenterParm parm) throws BizException {
       return costCenterDao.selectCostCenter(parm);
    }
    
    public DataItemList selectSsrPayer(SearchSSRListParm parm) throws BizException {
    	return ssrListDao.selectSsrPayer(parm);
    }
    
    public DataItemList selectSSRDetailList(SearchSSRListParm parm) throws BizException {
        DataItemList rtnList = new DataItemList();
        SSRListItem returnItem = new SSRListItem();
        
        ArrayList<SSRListItem> detailList = (ArrayList<SSRListItem>) ssrListDao.selectSSRDetail(parm).getCollection();
        ArrayList<SSRListItem> headList = (ArrayList<SSRListItem>) ssrListDao.selectSSRList(parm).getCollection();
        
        returnItem.setArrSSRDetail(detailList);
        returnItem.setArrHeadSSR(headList);
        
        rtnList.add(returnItem);
        
        return rtnList;
    }
    
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
		return ssrListDao.insertItems(parm);
	}

	public DataItemList updateItems(UpdateItemsBizParm param) throws BizException {
		return ssrListDao.updateItems(param);
	}
	
	public DataItemList deleteInvoiceUnit(DeleteItemsBizParm parm) throws BizException {
		return ssrListDao.deleteItems(parm);
	}
	
	public DataItemList updateDetailItems(UpdateItemsBizParm param) throws BizException {
		SSRListItem objHead = (SSRListItem) param.getUpdateItems().get(0);
        ArrayList<SSRListItem> items = objHead.getArrSSRDetail();
        String ssrNo = null;

        if ((objHead.getSsrNo() == null) || (objHead.getSsrNo().equalsIgnoreCase(""))) {
        	DataItemList insertItemList = new DataItemList();
        	InsertItemsBizParm insertParm = new InsertItemsBizParm();

        	ssrNo = ssrListDao.selectSsrNo(new SearchSSRListParm());
        	
            objHead.setSsrNo(ssrNo);
            
            insertParm.addInsertItem(objHead);
            insertItemList.add(objHead);
            
            if (insertItemList.size() > 0) {
                ssrListDao.insertItems(insertParm);
            }
        } else {
        	UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
        	
        	updateParm.addUpdateItem(objHead);
        	 
            ssrListDao.updateItems(updateParm);
        }
        
        //Saving detail 
        if (items != null) {
        	InsertItemsBizParm insertParm = new InsertItemsBizParm();
        	UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
    	    DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
    	    
            if (items.size() > 0) {     
            	 DataItemList insertItemList = new DataItemList();
                 DataItemList updateItemList = new DataItemList();
                 DataItemList deleteItemList = new DataItemList();
                 
                for (int i = 0; i < items.size(); i++) {
                    SSRListItem item = (SSRListItem) items.get(i);

                    if (param.getTxTraceinfo().getUserInfo() != null){
                        item.setUserId(param.getTxTraceinfo().getUserInfo().getUserId());
                    }

                    item.setSsrNo(objHead.getSsrNo());

                    if (item.getCrud() != null && !item.getCrud().equals(DAOProcessType.QUERY)) {
                        if (item.getCrud().equals(DAOProcessType.INSERT)) {
                        	insertItemList.add(item);
                        } else if (item.getCrud().equals(DAOProcessType.UPDATE)) {
                        	updateItemList.add(item);
                        } else if (item.getCrud().equals(DAOProcessType.DELETE)) {
                        	deleteItemList.add(item);
                        }
                    }
                }

                if (insertItemList.size() > 0) {
                	SearchSSRListParm parm = new SearchSSRListParm();

                	insertParm.addInsertItem(insertItemList);
                	ssrListDao.insertDetailItems(insertParm);
                	
                    parm.setSsrNo(((SSRListItem) insertItemList.get(0)).getSsrNo());
                    
                    ArrayList<SSRListItem> arrSsrSq = (ArrayList<SSRListItem>) ssrListDao.selectSSRAfterSaving(parm).getCollection();
                    ArrayList<SSRListItem> arrSsrSqTmp = new ArrayList<SSRListItem>();
                    
                    for (int i = 0; i < arrSsrSq.size(); i++) {
                        arrSsrSqTmp.add(arrSsrSq.get(i));
                    }
                    
                    objHead.setArrSSRDetail(arrSsrSqTmp);
                }

                if (updateItemList.size() > 0) {
                	updateParm.addUpdateItem(updateItemList);
                	ssrListDao.updateDetailItems(updateParm);
                }

                if (deleteItemList.size() > 0) {
                	SearchSSRListParm parm = new SearchSSRListParm();

                	deleteParm.addDeleteItem(deleteItemList);
                	ssrListDao.deleteDetailItems(deleteParm);
                    
                	parm.setSsrNo(((SSRListItem) deleteItemList.get(0)).getSsrNo());
                }
            }
        }
        
        return param.getUpdateItems();
	}

	public DataItemList insertInvoiceItems(InsertItemsBizParm parm) throws BizException {
		DataItemList dataItemList = new DataItemList();
        InvoiceItem itemForSSR = new InvoiceItem();
        String cType = null;
        String invoiceNo = null;
        InvoiceDataItem dataItems = (InvoiceDataItem) parm.getInsertItems().get(0);
        InvoiceDataItem invoiceNoItem = new InvoiceDataItem();
        ArrayList<InvoiceDataItem> invoiceList = dataItems.getInvoiceList();
        boolean isSamePayer = true;
        String firstPayer = ((InvoiceDataItem) invoiceList.get(0)).getPayer();
        ArrayList indexes = new ArrayList();
        HashMap itemsByPayer = new HashMap();
        SearchInvoiceParm invoiceParm = new SearchInvoiceParm();
        
        for (int i = 0; i < invoiceList.size(); i++) {
            InvoiceDataItem tmpInvoiceDataItem = (InvoiceDataItem) invoiceList.get(i);
            // ID : invoice data create, IV or null: invoice issue
            cType = tmpInvoiceDataItem.getCType();

            if (itemsByPayer.get(tmpInvoiceDataItem.getPayer()) != null) {
                DataItemList tmpItems = (DataItemList) itemsByPayer.get(tmpInvoiceDataItem.getPayer());
                tmpItems.add(tmpInvoiceDataItem);
            } else {
            	DataItemList list = new DataItemList();

            	indexes.add(tmpInvoiceDataItem.getPayer());
                list.add(tmpInvoiceDataItem);
                
                itemsByPayer.put(tmpInvoiceDataItem.getPayer(),list);
            }

            //payer compare
            if (!firstPayer.equals(tmpInvoiceDataItem.getPayer())) {
                isSamePayer = false;
            }
        }

        Set keySet = itemsByPayer.keySet();
        Iterator iterator = keySet.iterator();

        while (iterator.hasNext()) {
            String key = (String) iterator.next();
            DataItemList items = (DataItemList) itemsByPayer.get(key);
            BigDecimal totalInvoiceAmount = new BigDecimal(0);
            BigDecimal totalInvoiceGstAMt = new BigDecimal(0);
            BigDecimal gstAmt = new BigDecimal(0);
            BigDecimal totalInvoiceFrgnAmount = new BigDecimal(0);
            BigDecimal gstFrgnAmt = new BigDecimal(0);
            SearchInvoiceParm ivParm = new SearchInvoiceParm();
            InvoiceDataItem ivDataItem = (InvoiceDataItem) items.get(0);
            
            if (!cType.equals("ID") && items.size() > 0) {
            	ivParm.setIvPrfx(ivDataItem.getIvPrfx());
            	invoiceNo = invoiceDao.selectInvoiceNo(ivParm);
            }
            
            for (int i = 0; i < items.size(); i++) {
                InvoiceDataItem invoiceDataItem = (InvoiceDataItem) items.get(i);
                
                invoiceDataItem.setBillTpCd("VV");
                invoiceDataItem.setStatCd(CodeConstant.MT_IVSTAT_IV);
                invoiceDataItem.setGatherSytmId(CodeConstant.LCD_MOST);
                invoiceDataItem.setSytmUseId(CodeConstant.LCD_MOST);
                
                if (cType.equals("ID")) {
                    invoiceDataItem.setStatCd(CodeConstant.MT_IVSTAT_GT);
                } else {
                    invoiceDataItem.setIvNo(invoiceNo);
                }

                if (invoiceDataItem != null) {
                    if (invoiceDataItem.getFrgnAmt() != null && !invoiceDataItem.getFrgnAmt().equals("")) {
                        BigDecimal frgnAmtTmp = new BigDecimal(invoiceDataItem.getFrgnAmt());
                        BigDecimal frgnGstAmtTmp = new BigDecimal(invoiceDataItem.getFrgnGstAmt());
                        
                        totalInvoiceFrgnAmount = totalInvoiceFrgnAmount.add(frgnAmtTmp);
                        gstFrgnAmt = gstFrgnAmt.add(frgnGstAmtTmp);
                    }
                    
                    if (invoiceDataItem.getRevsAmt() != null && !invoiceDataItem.getRevsAmt().equals("")) {
                        BigDecimal revsAmt = new BigDecimal(invoiceDataItem.getRevsAmt());
                        BigDecimal totalGstAmt = new BigDecimal(invoiceDataItem.getTotalAmt());
                        BigDecimal totalGst = new BigDecimal(invoiceDataItem.getGstAmt());
                        
                        totalInvoiceAmount = totalInvoiceAmount.add(revsAmt);//new BigDecimal(revsAmt).setScale(2, java.math.BigDecimal.ROUND_HALF_UP).doubleValue();
                        totalInvoiceGstAMt = totalInvoiceGstAMt.add(totalGstAmt);
                        gstAmt = gstAmt.add(totalGst);
                    } else if (invoiceDataItem.getAplyAmt() != null && !invoiceDataItem.getAplyAmt().equals("")) {
                        BigDecimal aplyAmt = new BigDecimal(invoiceDataItem.getAplyAmt());
                        BigDecimal totalGstAmt = new BigDecimal(invoiceDataItem.getTotalAmount());
                        
                        totalInvoiceAmount = totalInvoiceAmount.add(aplyAmt);//new BigDecimal(aplyAmt).setScale(2, java.math.BigDecimal.ROUND_HALF_UP).doubleValue()
                        totalInvoiceFrgnAmount = totalInvoiceFrgnAmount.add(aplyAmt);
                        totalInvoiceGstAMt = totalInvoiceGstAMt.add(totalGstAmt);
                        gstFrgnAmt = gstFrgnAmt.add(gstAmt);
                    }
                }

                if (cType == null || cType.equals("")) {
                    if ((invoiceDataItem.getCrud() != null && invoiceDataItem.getCrud().equals(DAOProcessType.INSERT)) || (invoiceDataItem.getCud() != null && invoiceDataItem.getCud().equals(DAOProcessType.INSERT))) {
                        String gatherNo = invoiceDao.selectGatherNo(ivParm);
                        
                        invoiceDataItem.setGatherNo(gatherNo);
                        
                        if (invoiceDataItem.getIvNo() != null && invoiceDataItem.getIvNo() != "") {
                            invoiceDao.insertInvoiceDataItemDirectInvoice(parm.getTxTraceinfo(), invoiceDataItem);
                        } else {
                            invoiceDao.insertInvoiceDataItem(parm.getTxTraceinfo(), invoiceDataItem);
                        }
                    } else {
                        invoiceDao.updateInvoiceDataItem(parm.getTxTraceinfo(), invoiceDataItem);
                    }
                } else {
                    if (invoiceDataItem.getAdhocYn() != null && invoiceDataItem.getAdhocYn().equals(CommonConstants.Y)
                    		&& invoiceDataItem.getGatherNo() == null) {
                        String gatherNo = invoiceDao.selectGatherNo(ivParm);
                        DeleteItemsBizParm deleteItem = new DeleteItemsBizParm();
                        DataItemList deleteItems = new DataItemList();
                        
                        deleteItems.add(invoiceDataItem);
                        deleteItem.setDeleteItems(deleteItems);
                        
                        invoiceDataItem.setGatherNo(gatherNo);
                        
//                        ssrListDao.deleteInvoiceDataItem(deleteItem);
                        
                        invoiceDao.insertInvoiceDataItem(parm.getTxTraceinfo(), invoiceDataItem);
                    } else {
                        invoiceDao.updateInvoiceDataItem(parm.getTxTraceinfo(), invoiceDataItem);
                    }
                }
            }

            if (!cType.equals("ID")) {
            	InvoiceItem invoiceItem = new InvoiceItem();
            	UpdateItemsBizParm updateItem = new UpdateItemsBizParm();
            	
                invoiceItem.setIvNo(ivDataItem.getIvNo());
                invoiceItem.setPayer(ivDataItem.getPayer());
                invoiceItem.setIvPrfx(ivDataItem.getIvPrfx());
                invoiceItem.setStatCd(CodeConstant.MT_IVSTAT_IV);
                invoiceItem.setVslCallId(ivDataItem.getVslCallId());
                invoiceItem.setIvDt(ivDataItem.getIvDt()); 
                invoiceItem.setIvDueDt(ivDataItem.getIvDueDt());
                invoiceItem.setPayTpCd(ivDataItem.getPayTpCd());
                invoiceItem.setCurrency(ivDataItem.getCurrency());
                invoiceItem.setExRate(ivDataItem.getExRate());
                invoiceItem.setPayerTpCd(ivDataItem.getPayerTpCd());
                invoiceItem.setIvTpCd(ivDataItem.getIvTpCd());
                invoiceItem.setIvSytmId(CodeConstant.LCD_MOST);
//                invoiceItem.setRevsAmt(ivDataItem.getTotalAmount());
                invoiceItem.setTotalAmount(ivDataItem.getTotalAmount());
                invoiceItem.setUserId(ivDataItem.getUserId());
                invoiceItem.setVersion(ivDataItem.getVersion());
                
                invoiceItem.setIvAmt(totalInvoiceAmount.toString());
                invoiceItem.setTotalWithAmt(totalInvoiceGstAMt.toString());
                invoiceItem.setFrgnAmt(totalInvoiceFrgnAmount.toString());
                invoiceItem.setFrgnGstAmt(gstFrgnAmt.toString());
                invoiceItem.setGstAmount(gstAmt.toString());
                
                invoiceDao.insertInvoiceItem(parm.getTxTraceinfo(), invoiceItem);
                
                itemForSSR.setIvNo(invoiceItem.getIvNo());

                //Update SSR Status from Verified to Invoice
                SearchSSRListParm ssrItemParm = new SearchSSRListParm();
                InvoiceDataItem invoiceDataItem = (InvoiceDataItem) items.get(0);
                
                ssrItemParm.setDateFrom(invoiceDataItem.getIvDt());
                ssrItemParm.setDateTo(invoiceDataItem.getIvDt());
                ssrItemParm.setSsrNo(invoiceDataItem.getRefNo2());
                ssrItemParm.setVslCallId(invoiceDataItem.getVslCallId());
                ssrItemParm.setStartRow("1");
                ssrItemParm.setEndRow("1000");
                
                DataItemList ssrList = ssrListDao.selectSSRList(ssrItemParm);
                SSRListItem ssrItem = (SSRListItem) ssrList.getCollection().get(0);
                
                ssrItem.setSsrStatCd(CodeConstant.MT_IVSTAT_IV);
                updateItem.addUpdateItem(ssrItem);
                
                ssrListDao.updateItems(updateItem);
            }
        }

        List lst = new ArrayList();

        invoiceParm.setJpvc(((InvoiceDataItem) invoiceList.get(0)).getVslCallId());
        
        if (isSamePayer) {
            invoiceParm.setPartnerCode(((InvoiceDataItem) invoiceList.get(0)).getPayer());
        }

        invoiceNoItem.setIvNo(invoiceNo);
        lst.add(invoiceNoItem);
        
        dataItemList  = new DataItemList();
        dataItemList.add(lst);

        return dataItemList;
    }

	@Override
	public DataItemList selectSSRValidation(SearchSSRListParm parm) throws BizException {
        return ssrListDao.selectInvoicedSSR(parm);
    }
}


