package com.tsb.most.biz.service.billing;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.basebiz.component.fileupload.IFileUpload;
import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.basebiz.parm.fileupload.SearchFileUploadParm;
import com.tsb.most.biz.dao.billing.IInvoiceDao;
import com.tsb.most.biz.dataitem.billing.InvoiceDataItem;
import com.tsb.most.biz.dataitem.billing.InvoiceItem;
import com.tsb.most.biz.parm.billing.SearchInvoiceParm;
import com.tsb.most.common.constant.BillingConstant;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.constants.CommonConstants;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class InvoiceList extends MOSTBaseService implements IInvoiceList{
	private IInvoiceDao invoiceDao;
	private IFileUpload fileUpload;
	
    public void setInvoiceDao(IInvoiceDao invoiceDao) {
		this.invoiceDao = invoiceDao;
	}
	
	public void setFileUpload(IFileUpload fileUpload) {
		this.fileUpload = fileUpload;
	}
	//////////////////////////////////////////////////////////////////////
	//--START INVOICE LIST-------------------------------------------------------
	public DataItemList selectInvoiceItemList(SearchInvoiceParm parm) throws BizException {
	    return invoiceDao.selectInvoiceItemList(parm);
	}
	
	public DataItemList updateXmsInvoiceStatus(UpdateItemsBizParm parm) throws BizException {
		if(parm.getUpdateItems().size() > 0) {
			invoiceDao.updateXmsInvoiceStatus(parm);
		}
		
		return parm.getUpdateItems();
	}

	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException {
		if(parm.getDeleteItems().size() > 0) {
			InvoiceDataItem items = (InvoiceDataItem) parm.getDeleteItems().get(0);
			SearchInvoiceParm ivParm = new SearchInvoiceParm();
			
			ivParm.setIvNo(items.getIvNo());
			
			boolean erpYn = invoiceDao.selectInvoiceItemStatCd(ivParm);
			
			if(erpYn) {
				invoiceDao.deleteInvoiceItems(parm);
				invoiceDao.deleteInvoiceDataItems(parm);
			} 
		}
		
		return parm.getDeleteItems();
	}
  //--END INVOICE LIST-------------------------------------------------------
	public DataItemList selectInvoiceDetailItem(SearchInvoiceParm parm) throws BizException {
    	DataItemList rtnList = new DataItemList();
    	InvoiceDataItem returnItem = new InvoiceDataItem();
        ArrayList<InvoiceDataItem> list;
        
        if (parm.getIsWhRental() != null && parm.getIsWhRental().equals("true")) {
            list = (ArrayList<InvoiceDataItem>) invoiceDao.searchInvoiceDataItemsForWhRental(parm).getCollection();
        } else {
            list = (ArrayList<InvoiceDataItem>) invoiceDao.selectInvoiceDetailItem(parm).getCollection();
        }
        
        returnItem.setInvoiceList(list);
        
        // FILE UPLOAD LIST
		SearchFileUploadParm fileUploadParm = new SearchFileUploadParm();
		fileUploadParm.setCatgCd(parm.getInvoiceNo());
		fileUploadParm.setPgmId("BL01401");
		
		DataItemList tempList = this.fileUpload.selectFileList(fileUploadParm);
		returnItem.setUploadItemsList((ArrayList<FileUploadItem>) tempList.getCollection());
        
        rtnList.add(returnItem);

        return rtnList;
    }
	
	public void updateInvoiceDetailItem(UpdateItemsBizParm parm)throws BizException{
		DataItemList items = parm.getUpdateItems();
		// File Upload CUD
		UpdateBizParm<FileUploadItem> cudParm = new UpdateBizParm<FileUploadItem>();
    	InvoiceDataItem masterItem = (InvoiceDataItem)items.get(0);
    	FileUploadItem fileUploadItem = new FileUploadItem();
	    ArrayList<FileUploadItem> spFileUploadtems = masterItem.getUploadItemsList();
	    
	    fileUploadItem.setItems(spFileUploadtems);
	    fileUploadItem.setUserId(masterItem.getUserId());
	    
	    cudParm.setDataItem(fileUploadItem);
	    cudParm.setUserId(masterItem.getUserId());
	    
	    this.fileUpload.applyUploadItems(cudParm);
	}
	
	//-----END INVOICE DETAIL SCREEN----------------------------------------
    public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
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
        
        for (int i = 0; i < invoiceList.size(); i++) {
            InvoiceDataItem tmpInvoiceDataItem = (InvoiceDataItem) invoiceList.get(i);
            // ID : invoice data create, IV or null: invoice issue
            cType = tmpInvoiceDataItem.getCType();

            if (itemsByPayer.get(tmpInvoiceDataItem.getPayer()) != null) {
                DataItemList tmpItems = (DataItemList) itemsByPayer.get(tmpInvoiceDataItem.getPayer());
                tmpItems.add(tmpInvoiceDataItem);
            } else {
                indexes.add(tmpInvoiceDataItem.getPayer());
                
                DataItemList list = new DataItemList();
                list.add(tmpInvoiceDataItem);
                
                itemsByPayer.put(tmpInvoiceDataItem.getPayer(),list);
            }

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
            InvoiceDataItem ivItem = (InvoiceDataItem) items.get(0);
            SearchInvoiceParm ivParm = new SearchInvoiceParm();
            
            ivParm.setIvPrfx(ivItem.getIvPrfx());
            ivParm.setBillTpCd(ivItem.getBillTpCd());
            
        	if ((cType == null || !cType.equals("ID")) && items.size() > 0) {
            	invoiceNo = invoiceDao.selectInvoiceNo(ivParm);
        	}
            	
            for (int i = 0; i < items.size(); i++) {
                InvoiceDataItem invoiceDataItem = (InvoiceDataItem) items.get(i);
                
                invoiceDataItem.setBillTpCd("VV");
                invoiceDataItem.setStatCd(BillingConstant.DATA_GATHER_STATUS_INVOICED);
                invoiceDataItem.setGatherSytmId(CodeConstant.LCD_MOST);
                invoiceDataItem.setSytmUseId(CodeConstant.LCD_MOST);

                if (cType != null && cType.equals("ID")) {
                    invoiceDataItem.setStatCd(BillingConstant.DATA_GATHER_STATUS_VERIFIED);
                } else {
                    invoiceDataItem.setIvNo(invoiceNo);
                }

                if (invoiceDataItem != null) {
                    if (invoiceDataItem.getFrgnAmt() != null && !invoiceDataItem.getFrgnAmt().equals("")) {
                        BigDecimal frgnAmtTmp = new BigDecimal(invoiceDataItem.getFrgnAmt());
                        // BigDecimal frgnGstAmtTmp = new BigDecimal(invoiceDataItem.getFrgnGstAmt());
                        
                        totalInvoiceFrgnAmount = totalInvoiceFrgnAmount.add(frgnAmtTmp);
                        // gstFrgnAmt = gstFrgnAmt.add(frgnGstAmtTmp);
                    }
                  
                    if (invoiceDataItem.getAplyAmt() != null && !invoiceDataItem.getAplyAmt().equals("")) {
                        BigDecimal totalGstAmt = new BigDecimal(invoiceDataItem.getTotalAmt());
                        BigDecimal AplyAmt = new BigDecimal(invoiceDataItem.getAplyAmt());
                        BigDecimal totalGst = new BigDecimal(invoiceDataItem.getGstAmt());
                        
                        totalInvoiceAmount = totalInvoiceAmount.add(AplyAmt);//new BigDecimal(revsAmt).setScale(2, java.math.BigDecimal.ROUND_HALF_UP).doubleValue();
                        totalInvoiceGstAMt = totalInvoiceGstAMt.add(totalGstAmt);
                        gstAmt = gstAmt.add(totalGst);
                    }
                }

                if (cType == null || cType.equals("")) {
                    if ((invoiceDataItem.getCrud() != null && invoiceDataItem.getCrud().equals(DAOProcessType.INSERT)) || 
                    		(invoiceDataItem.getCud() != null && invoiceDataItem.getCud().equals(DAOProcessType.INSERT))) {
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
                    if (invoiceDataItem.getAdhocYn() != null && invoiceDataItem.getAdhocYn().equals(CommonConstants.Y)) {
                    	String gatherNo = invoiceDao.selectGatherNo(ivParm);
                    	
                    	invoiceDataItem.setGatherNo(gatherNo);
                    	
                        invoiceDao.insertInvoiceDataItem(parm.getTxTraceinfo(), invoiceDataItem);
                    } else {
                        invoiceDao.updateInvoiceDataItem(parm.getTxTraceinfo(), invoiceDataItem);
                    }
                }
            }

            if (cType == null || !cType.equals("ID")) {
            	InvoiceItem invoiceItem = new InvoiceItem();
            	InvoiceDataItem tempItem = (InvoiceDataItem)items.get(0);
            	
                invoiceItem.setIvNo(tempItem.getIvNo());
                invoiceItem.setPayer(tempItem.getPayer());
                invoiceItem.setIvPrfx(tempItem.getIvPrfx());
                invoiceItem.setStatCd(BillingConstant.DATA_GATHER_STATUS_INVOICED);
                invoiceItem.setVslCallId(tempItem.getVslCallId());
                invoiceItem.setIvDt(tempItem.getIvDt());
                invoiceItem.setIvDueDt(tempItem.getIvDueDt());
                invoiceItem.setPayTpCd(tempItem.getPayTpCd());
                invoiceItem.setCurrency(tempItem.getCurrency());
                invoiceItem.setExRate(tempItem.getExRate());

                invoiceItem.setIvSytmId(CodeConstant.LCD_MOST);
                invoiceItem.setUserId(tempItem.getUserId());
                invoiceItem.setVersion(tempItem.getVersion());
                
                invoiceItem.setIvAmt(totalInvoiceAmount.toString());
                invoiceItem.setTotalWithAmt(totalInvoiceGstAMt.toString());
                invoiceItem.setFrgnAmt(totalInvoiceFrgnAmount.toString());
                invoiceItem.setFrgnGstAmt(gstFrgnAmt.toString());
                invoiceItem.setGstAmount(gstAmt.toString());
                invoiceItem.setErpIvTpCd(dataItems.getErpIvTpCd());
                invoiceItem.setRmk(dataItems.getRmk());
                invoiceItem.setScn(tempItem.getScn());
                
                invoiceDao.insertInvoiceItem(parm.getTxTraceinfo(), invoiceItem);
                /* sMantis: 0167051
                itemForSSR.setIvNo(invoiceItem.getIvNo());
                itemForSSR.setVslCallId(tempItem.getVslCallId());
                itemForSSR.setStatCd(BillingConstant.DATA_GATHER_STATUS_INVOICED);
                itemForSSR.setRefNo(tempItem.getRefNo2());
                
                if(tempItem.getScrId() != null && tempItem.getScrId().equals("SSR/Add Hoc")) {
                	invoiceDao.updateSsrStatus(parm.getTxTraceinfo(), itemForSSR);
                }
                eMantis: 0167051 */
            }
            //sMantis: 0167051
			for (int i = 0; i < items.size(); i++) {
				InvoiceDataItem tempItem = (InvoiceDataItem) items.get(i);
				if (tempItem.getScrId() != null && tempItem.getScrId().equals("SSR/Add Hoc")) {
					itemForSSR.setIvNo(tempItem.getIvNo());
					itemForSSR.setVslCallId(tempItem.getVslCallId());
					itemForSSR.setStatCd(BillingConstant.DATA_GATHER_STATUS_INVOICED);
					itemForSSR.setRefNo(tempItem.getRefNo2());
					invoiceDao.updateSsrStatus(parm.getTxTraceinfo(), itemForSSR);
				}
			}
			//eMantis: 0167051
        }

        List lst = new ArrayList();

        SearchInvoiceParm invoiceParm = new SearchInvoiceParm();
        
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
    
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		return null;
	}
	
	public void transferInvoiceItems(UpdateItemsBizParm parm)throws BizException {
		// updateInvoiceErpStatCd
		invoiceDao.transferInvoiceItems(parm);
	}
   
}
