/**
* InvoiceItem.java
*
* Created on   : 2007-12-11
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2007-12-11   Hugh Lim 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.billing;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

/**
 * @author Hugh
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class InvoiceItem extends DataItem {

		 
    
    //valuables from VesselScheduleItem 
    private String vslNm;          
    private String berthLoc;
    private String vslOperator;
    private String atb;             
    private String atu;             
    private String shipCallNo;   
    private String voyage;
    private String accNo;
    private String isFileAtt;
    
    private String ivNo;
    private String payer;
    private String ivPrfx;	 
    private String statCd;	
    private String vslCallId; 
    private String ivAmt; 
    private String ivDt;	
    private String ivDueDt;	
    private String payTpCd;
    private String payDocNo;	
    private String payAmt;	
    private String payDt;	
    private String ivSytmId;	 
    private String vwDt;
    private String vwUserId;	

    private String billDays;
    private String currency;
    private String exRate;
    private String frgnAmt;
    private String no;
	private List ivNos;
	private String prUserId;
	private String prDt;
	private String erpStatCd;
    private int curPage;
    private String pagingSearchType;
    private int pageSize;
    private int test1;
    private int test2;
    private String totalPage;
	private String crDate; //blackberry add this code to show the create date in screen.
	private String userId; //add by Joseph
    private String transferStatus;
    
    private String gstAmount;
    private String totalAmount;
    private String totalWithAmt;
    private String revsAmt;
	private String frgnGstAmt;
    private String paidSt;
    private String paidStOrg;
    private String payerTpCd;
    private String ivTpCd;
    private String financialCode;
    private String statusNm;
    private String rmk;
    private String erpIvTpCd;
    private String crcyCd;
    
    private String refNo;
    
    public String getPaidStOrg() {
        return paidStOrg;
    }
    public void setPaidStOrg(String paidStOrg) {
        this.paidStOrg = paidStOrg;
    }
    public String getPaidSt() {
        return paidSt;
    }
    public void setPaidSt(String paidSt) {
        this.paidSt = paidSt;
    }
    public String getFrgnGstAmt() {
        return frgnGstAmt;
    }
    public void setFrgnGstAmt(String frgnGstAmt) {
        this.frgnGstAmt = frgnGstAmt;
    }
    public String getTotalWithAmt() {
        return totalWithAmt;
    }
    public void setTotalWithAmt(String totalWithAmt) {
        this.totalWithAmt = totalWithAmt;
    }
    public String getTransferStatus() {
        return transferStatus;
    }
    public void setTransferStatus(String transferStatus) {
        this.transferStatus = transferStatus;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public String getCrDate() {
        return crDate;
    }
    public void setCrDate(String crDate) {
        this.crDate = crDate;
    }
    public String getErpStatCd() {
        return erpStatCd;
    }
    public void setErpStatCd(String erpStatCd) {
        this.erpStatCd = erpStatCd;
    }
    /**
     * @param exchgVal The exchgVal to set.
     */
    /**
     * @return Returns the frgnAmt.
     */
    public String getFrgnAmt() {
        return frgnAmt;
    }
    /**
     * @param frgnAmt The frgnAmt to set.
     */
    public void setFrgnAmt(String frgnAmt) {
        this.frgnAmt = frgnAmt;
    }
	public String getAccNo() {
        return accNo;
    }
    public void setAccNo(String accNo) {
        this.accNo = accNo;
    }
    
	public void setIvNos(List ivNos){
	    this.ivNos = ivNos;
	}
	
	public void addIvNos(String ivNo){
	    if(ivNos == null){
	        ivNos = new ArrayList();
	    }
	    ivNos.add(ivNo);
	}
	

    
    public String getAtb() {
        return atb;
    }
    public void setAtb(String atb) {
        this.atb = atb;
    }
    public String getAtu() {
        return atu;
    }
    public void setAtu(String atu) {
        this.atu = atu;
    }
    public String getBerthLoc() {
        return berthLoc;
    }
    public void setBerthLoc(String berthLoc) {
        this.berthLoc = berthLoc;
    }
    public String getIvAmt() {
        return ivAmt;
    }
    public void setIvAmt(String ivAmt) {
        this.ivAmt = ivAmt;
    }
    public String getIvDt() {
        return ivDt;
    }
    public void setIvDt(String ivDt) {
        this.ivDt = ivDt;
    }
    public String getIvDueDt() {
        return ivDueDt;
    }
    public void setIvDueDt(String ivDueDt) {
        this.ivDueDt = ivDueDt;
    }
    public String getIvNo() {
        return ivNo;
    }
    public void setIvNo(String no) {
        ivNo = no;
    }
    public String getIvPrfx() {
        return ivPrfx;
    }
    public void setIvPrfx(String prfx) {
        ivPrfx = prfx;
    }
    public String getIvSytmId() {
        return ivSytmId;
    }
    public void setIvSytmId(String ivSytmId) {
        this.ivSytmId = ivSytmId;
    }
    public String getPayAmt() {
        return payAmt;
    }
    public void setPayAmt(String payAmt) {
        this.payAmt = payAmt;
    }
    public String getPayDocNo() {
        return payDocNo;
    }
    public void setPayDocNo(String payDocNo) {
        this.payDocNo = payDocNo;
    }
    public String getPayDt() {
        return payDt;
    }
    public void setPayDt(String payDt) {
        this.payDt = payDt;
    }
    public String getPayer() {
        return payer;
    }
    public void setPayer(String payer) {
        this.payer = payer;
    }
    public String getPayTpCd() {
        return payTpCd;
    }
    public void setPayTpCd(String payTpCd) {
        this.payTpCd = payTpCd;
    }
    public String getShipCallNo() {
        return shipCallNo;
    }
    public void setShipCallNo(String shipCallNo) {
        this.shipCallNo = shipCallNo;
    }
    public String getStatCd() {
        return statCd;
    }
    public void setStatCd(String statCd) {
        this.statCd = statCd;
    }
    public String getVslCallId() {
        return vslCallId;
    }
    public void setVslCallId(String vslCallId) {
        this.vslCallId = vslCallId;
    }
    public String getVslNm() {
        return vslNm;
    }
    public void setVslNm(String vslNm) {
        this.vslNm = vslNm;
    }
    public String getVslOperator() {
        return vslOperator;
    }
    public void setVslOperator(String vslOperator) {
        this.vslOperator = vslOperator;
    }
    public String getVwDt() {
        return vwDt;
    }
    public void setVwDt(String vwDt) {
        this.vwDt = vwDt;
    }
    public String getVwUserId() {
        return vwUserId;
    }
    public void setVwUserId(String vwUserId) {
        this.vwUserId = vwUserId;
    }
    public String getBillDays() {
        return billDays;
    }
    public void setBillDays(String billDays) {
        this.billDays = billDays;
    }
    public String getNo() {
        return no;
    }
    public void setNo(String no) {
        this.no = no;
    }
    /**
     * @return Returns the voyage.
     */
    public String getVoyage() {
        return voyage;
    }
    /**
     * @param voyage The voyage to set.
     */
    public void setVoyage(String voyage) {
        this.voyage = voyage;
    }
    /**
     * @return Returns the prDt.
     */
    public String getPrDt() {
        return prDt;
    }
    /**
     * @param prDt The prDt to set.
     */
    public void setPrDt(String prDt) {
        this.prDt = prDt;
    }
    /**
     * @return Returns the prUserId.
     */
    public String getPrUserId() {
        return prUserId;
    }
    /**
     * @param prUserId The prUserId to set.
     */
    public void setPrUserId(String prUserId) {
        this.prUserId = prUserId;
    }
    /**
     * @return Returns the ivNos.
     */
    public List getIvNos() {
        return ivNos;
    }
    /**
     * @return Returns the isFileAtt.
     */
    public String getIsFileAtt() {
        return isFileAtt;
    }
    /**
     * @param isFileAtt The isFileAtt to set.
     */
    public void setIsFileAtt(String isFileAtt) {
        this.isFileAtt = isFileAtt;
    }
    public String getExRate() {
        return exRate;
    }
    public void setExRate(String exRate) {
        this.exRate = exRate;
    }
    public String getCurrency() {
        return currency;
    }
    public void setCurrency(String currency) {
        this.currency = currency;
    }
    public int getCurPage() {
        return curPage;
    }
    public void setCurPage(int curPage) {
        this.curPage = curPage;
    }
    public int getPageSize() {
        return pageSize;
    }
    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }
    public String getPagingSearchType() {
        return pagingSearchType;
    }
    public void setPagingSearchType(String pagingSearchType) {
        this.pagingSearchType = pagingSearchType;
    }
    public int getTest1() {
        return test1;
    }
    public void setTest1(int test1) {
        this.test1 = test1;
    }
    public int getTest2() {
        return test2;
    }
    public void setTest2(int test2) {
        this.test2 = test2;
    }
    public String getTotalPage() {
        return totalPage;
    }
    public void setTotalPage(String totalPage) {
        this.totalPage = totalPage;
    }
    public String getGstAmount() {
        return gstAmount;
    }
    public void setGstAmount(String gstAmount) {
        this.gstAmount = gstAmount;
    }
    public String getTotalAmount() {
        return totalAmount;
    }
    public void setTotalAmount(String totalAmount) {
        this.totalAmount = totalAmount;
    }
    public String getRevsAmt() {
        return revsAmt;
    }
    public void setRevsAmt(String revsAmt) {
        this.revsAmt = revsAmt;
    }
    private List statusList;
    private List invoiceTypeList;
    private List prefixList;
    private String chkTrf;
    public String getChkTrf() {
		return chkTrf;
	}
	public void setChkTrf(String chkTrf) {
		this.chkTrf = chkTrf;
	}
	private ArrayList<InvoiceItem> invoiceTrfList;

	public ArrayList<InvoiceItem> getInvoiceTrfList() {
		return invoiceTrfList;
	}
	public void setInvoiceTrfList(ArrayList<InvoiceItem> invoiceTrfList) {
		this.invoiceTrfList = invoiceTrfList;
	}
	public List getStatusList() {
		return statusList;
	}
	public void setStatusList(List statusList) {
		this.statusList = statusList;
	}
	public List getInvoiceTypeList() {
		return invoiceTypeList;
	}
	public void setInvoiceTypeList(List invoiceTypeList) {
		this.invoiceTypeList = invoiceTypeList;
	}
	public List getPrefixList() {
		return prefixList;
	}
	public void setPrefixList(List prefixList) {
		this.prefixList = prefixList;
	}
	private String isUpdatePaid;


	public String getIsUpdatePaid() {
		return isUpdatePaid;
	}
	public void setIsUpdatePaid(String isUpdatePaid) {
		this.isUpdatePaid = isUpdatePaid;
	}
	public String getPayerTpCd() {
		return payerTpCd;
	}
	public void setPayerTpCd(String payerTpCd) {
		this.payerTpCd = payerTpCd;
	}
	public String getIvTpCd() {
		return ivTpCd;
	}
	public void setIvTpCd(String ivTpCd) {
		this.ivTpCd = ivTpCd;
	}
	public String getFinancialCode() {
		return financialCode;
	}
	public void setFinancialCode(String financialCode) {
		this.financialCode = financialCode;
	}
	public String getStatusNm() {
		return statusNm;
	}
	public void setStatusNm(String statusNm) {
		this.statusNm = statusNm;
	}
	public String getRmk() {
		return rmk;
	}
	public void setRmk(String rmk) {
		this.rmk = rmk;
	}
	public String getErpIvTpCd() {
		return erpIvTpCd;
	}
	public void setErpIvTpCd(String erpIvTpCd) {
		this.erpIvTpCd = erpIvTpCd;
	}
	public String getCrcyCd() {
		return crcyCd;
	}
	public void setCrcyCd(String crcyCd) {
		this.crcyCd = crcyCd;
	}
	public String getRefNo() {
		return refNo;
	}
	public void setRefNo(String refNo) {
		this.refNo = refNo;
	}
}
