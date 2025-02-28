/**
* SSRListParm.java
*
* Created on   : Dec 5, 2007
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.2 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* Dec 5, 2007   Phan Minh Tuan 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.billing;

import com.tsb.most.framework.bizparm.BaseBizParm;

/**
 * @author pmtuan
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class SearchSSRListParm extends BaseBizParm {
	private String ssrNo;
    private String checkRole;
    private String dateFrom ;
    private String dateTo ;
    private String ssrType ;
    private String vslCallId ;
    private String berthNo ;
    private String whId ;
    private String payerCd ;
    private String payerName ;    
    private String payerTpCd ;
    private String payerTpName ;       
    private String ssrStatCd ;
    private String no ;
    private String seq ;
    private String issueDt ;
    private String ivPrfx ;
    private String refNo ;
    private String rmk ;
    private String ivNo ;    
    private String totalAmount ;
    private String trfCd ;	
    private String ssrTpCd ;
    private String unitQty1 ;
    private String unitQty2 ;
    private String unitQty3 ;
    private String aplyUnitPrc ;
    private String quantity ;
    private String amount ;
    private String rptTp;
    private String printType;
    private String userId;

    private String startRow;
    private String endRow;
    private String gstTpCd;
    private String scn;
    
    public String getSsrNo() {
        return ssrNo;
    }
    public void setSsrNo(String ssrNo) {
        this.ssrNo = ssrNo;
    }
    public String getEndRow() {
        return endRow;
    }
    public void setEndRow(String endRow) {
        this.endRow = endRow;
    }
    public String getStartRow() {
        return startRow;
    }
    public void setStartRow(String startRow) {
        this.startRow = startRow;
    }
    public String getBerthNo() {
        return berthNo;
    }
    public void setBerthNo(String berthNo) {
        this.berthNo = berthNo;
    }
    public String getDateFrom() {
        return dateFrom;
    }
    public void setDateFrom(String dateFrom) {
        this.dateFrom = dateFrom;
    }
    public String getDateTo() {
        return dateTo;
    }
    public void setDateTo(String dateTo) {
        this.dateTo = dateTo;
    }
    public String getNo() {
        return no;
    }
    public void setNo(String no) {
        this.no = no;
    }
    public String getPayerCd() {
        return payerCd;
    }
    public void setPayerCd(String payerCd) {
        this.payerCd = payerCd;
    }
    public String getPayerName() {
        return payerName;
    }
    public void setPayerName(String payerName) {
        this.payerName = payerName;
    }
    public String getPayerTpCd() {
        return payerTpCd;
    }
    public void setPayerTpCd(String payerTpCd) {
        this.payerTpCd = payerTpCd;
    }
    public String getPayerTpName() {
        return payerTpName;
    }
    public void setPayerTpName(String payerTpName) {
        this.payerTpName = payerTpName;
    }
    public String getSsrType() {
        return ssrType;
    }
    public void setSsrType(String ssrType) {
        this.ssrType = ssrType;
    }
    public String getVslCallId() {
        return vslCallId;
    }
    public void setVslCallId(String vslCallId) {
        this.vslCallId = vslCallId;
    }
    public String getWhId() {
        return whId;
    }
    public void setWhId(String whId) {
        this.whId = whId;
    }
    public String getSsrStatCd() {
        return ssrStatCd;
    }
    public void setSsrStatCd(String ssrStatCd) {
        this.ssrStatCd = ssrStatCd;
    }
    public String getCheckRole() {
        return checkRole;
    }
    public void setCheckRole(String checkRole) {
        this.checkRole = checkRole;
    }
	public String getSeq() {
		return seq;
	}
	public void setSeq(String seq) {
		this.seq = seq;
	}
	public String getIssueDt() {
		return issueDt;
	}
	public void setIssueDt(String issueDt) {
		this.issueDt = issueDt;
	}
	public String getIvPrfx() {
		return ivPrfx;
	}
	public void setIvPrfx(String ivPrfx) {
		this.ivPrfx = ivPrfx;
	}
	public String getRefNo() {
		return refNo;
	}
	public void setRefNo(String refNo) {
		this.refNo = refNo;
	}
	public String getRmk() {
		return rmk;
	}
	public void setRmk(String rmk) {
		this.rmk = rmk;
	}
	public String getIvNo() {
		return ivNo;
	}
	public void setIvNo(String ivNo) {
		this.ivNo = ivNo;
	}
	public String getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(String totalAmount) {
		this.totalAmount = totalAmount;
	}
	public String getTrfCd() {
		return trfCd;
	}
	public void setTrfCd(String trfCd) {
		this.trfCd = trfCd;
	}
	public String getSsrTpCd() {
		return ssrTpCd;
	}
	public void setSsrTpCd(String ssrTpCd) {
		this.ssrTpCd = ssrTpCd;
	}
	public String getUnitQty1() {
		return unitQty1;
	}
	public void setUnitQty1(String unitQty1) {
		this.unitQty1 = unitQty1;
	}
	public String getUnitQty2() {
		return unitQty2;
	}
	public void setUnitQty2(String unitQty2) {
		this.unitQty2 = unitQty2;
	}
	public String getUnitQty3() {
		return unitQty3;
	}
	public void setUnitQty3(String unitQty3) {
		this.unitQty3 = unitQty3;
	}
	public String getAplyUnitPrc() {
		return aplyUnitPrc;
	}
	public void setAplyUnitPrc(String aplyUnitPrc) {
		this.aplyUnitPrc = aplyUnitPrc;
	}
	public String getQuantity() {
		return quantity;
	}
	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}
	public String getAmount() {
		return amount;
	}
	public void setAmount(String amount) {
		this.amount = amount;
	}
	public String getRptTp() {
		return rptTp;
	}
	public void setRptTp(String rptTp) {
		this.rptTp = rptTp;
	}
	public String getPrintType() {
		return printType;
	}
	public void setPrintType(String printType) {
		this.printType = printType;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getGstTpCd() {
		return gstTpCd;
	}
	public void setGstTpCd(String gstTpCd) {
		this.gstTpCd = gstTpCd;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
    
}
