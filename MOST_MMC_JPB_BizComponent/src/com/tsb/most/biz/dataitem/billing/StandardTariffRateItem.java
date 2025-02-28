/**
* StandardTariffRateItem.java
*
* Created on   : Dec 11, 2007
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* Dec 11, 2007   An Doan 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.billing;

import java.util.ArrayList;
import java.util.Date;

import com.tsb.most.framework.dataitem.DataItem;

/**
 * @author Thuy An
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class StandardTariffRateItem extends DataItem {
    private String subTrfCd;
    private String trfRegNo;
    private String unitPrc;
    private String ptnrCd;
    private String aplyYmd;
    private String exprYmd;
    
    private String pkgTrfNo;
    private String prcTpCd;
    private String pkgNm;
    private String rmk;
    
    private String trfCd;
    private String descr;
    private String trfTpCd;
    private String trfTpNm;
    private String billTpCd;
    private String costCntCd;
    private String ssrTpCd;
    private String pyrTpCd;
    private String ivUnit1;
    private String ivUnit2;
    private String ivUnit3;
    private String minVal1;
    private String minVal2;
    private String minVal3;
    private String no;
    private int count;
//    private String sytmId;
    
    private Date updateTimeField ;
    
    private String workingStatus;
    ArrayList<StandardTariffRateItem> items;
    
//  GST Type Code - added by Joseph - Aug 20, 2014
    private String gstTpCd;
    private String gstRate;
    private String gstValue;
    
    private String minRate;
    private String maxRate;
    
//    public String getSytmId() {
//		return sytmId;
//	}
//	public void setSytmId(String sytmId) {
//		this.sytmId = sytmId;
//	}
	
	public String getBillTpCd() {
        return billTpCd;
    }
    public void setBillTpCd(String billTpCd) {
        this.billTpCd = billTpCd;
    }
    public String getCostCntCd() {
        return costCntCd;
    }
    public void setCostCntCd(String costCntCd) {
        this.costCntCd = costCntCd;
    }
    public String getDescr() {
        return descr;
    }
    public void setDescr(String descr) {
        this.descr = descr;
    }
    public String getIvUnit1() {
        return ivUnit1;
    }
    public void setIvUnit1(String ivUnit1) {
        this.ivUnit1 = ivUnit1;
    }
    public String getIvUnit2() {
        return ivUnit2;
    }
    public void setIvUnit2(String ivUnit2) {
        this.ivUnit2 = ivUnit2;
    }
    public String getIvUnit3() {
        return ivUnit3;
    }
    public void setIvUnit3(String ivUnit3) {
        this.ivUnit3 = ivUnit3;
    }
    public String getNo() {
        return no;
    }
    public void setNo(String no) {
        this.no = no;
    }
    public String getTrfCd() {
        return trfCd;
    }
    public void setTrfCd(String trfCd) {
        this.trfCd = trfCd;
    }
    public String getTrfTpCd() {
        return trfTpCd;
    }
    public void setTrfTpCd(String trfTpCd) {
        this.trfTpCd = trfTpCd;
    }
    
    
    public String getAplyYmd() {
        return aplyYmd;
    }
    public void setAplyYmd(String applyYmd) {
        this.aplyYmd = applyYmd;
    }
    public String getExprYmd() {
        return exprYmd;
    }
    public void setExprYmd(String expireYmd) {
        this.exprYmd = expireYmd;
    }
    public String getPkgNm() {
        return pkgNm;
    }
    public void setPkgNm(String pkgNm) {
        this.pkgNm = pkgNm;
    }
    public String getPkgTrfNo() {
        return pkgTrfNo;
    }
    public void setPkgTrfNo(String pkgTrfNo) {
        this.pkgTrfNo = pkgTrfNo;
    }
    public String getPrcTpCd() {
        return prcTpCd;
    }
    public void setPrcTpCd(String prcTpCd) {
        this.prcTpCd = prcTpCd;
    }
    public String getPtnrCd() {
        return ptnrCd;
    }
    public void setPtnrCd(String ptyNo) {
        this.ptnrCd = ptyNo;
    }
    public String getRmk() {
        return rmk;
    }
    public void setRmk(String rmk) {
        this.rmk = rmk;
    }
    public String getUnitPrc() {
        return unitPrc;
    }
    public void setUnitPrc(String unitPrc) {
        this.unitPrc = unitPrc;
    }
    public String getMinVal1() {
        return minVal1;
    }
    public void setMinVal1(String minVal1) {
        this.minVal1 = minVal1;
    }
    public String getMinVal2() {
        return minVal2;
    }
    public void setMinVal2(String minVal2) {
        this.minVal2 = minVal2;
    }
    public String getMinVal3() {
        return minVal3;
    }
    public void setMinVal3(String minVal3) {
        this.minVal3 = minVal3;
    }
    public String getPyrTpCd() {
        return pyrTpCd;
    }
    public void setPyrTpCd(String pyrTpCd) {
        this.pyrTpCd = pyrTpCd;
    }
    public String getSsrTpCd() {
        return ssrTpCd;
    }
    public void setSsrTpCd(String ssrTpCd) {
        this.ssrTpCd = ssrTpCd;
    }
    public String getSubTrfCd() {
        return subTrfCd;
    }
    public void setSubTrfCd(String subTrfCd) {
        this.subTrfCd = subTrfCd;
    }
    public String getTrfRegNo() {
        return trfRegNo;
    }
    public void setTrfRegNo(String trfRegNo) {
        this.trfRegNo = trfRegNo;
    }
    public String getGstTpCd() {
        return gstTpCd;
    }
    public void setGstTpCd(String gstTpCd) {
        this.gstTpCd = gstTpCd;
    }
    public String getGstValue() {
        return gstValue;
    }
    public void setGstValue(String gstValue) {
        this.gstValue = gstValue;
    }
	public Date getUpdateTimeField() {
		return updateTimeField;
	}
	public void setUpdateTimeField(Date updateTimeField) {
		this.updateTimeField = updateTimeField;
	}
	public String getWorkingStatus() {
		return workingStatus;
	}
	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}
	public ArrayList<StandardTariffRateItem> getItems() {
		return items;
	}
	public void setItems(ArrayList<StandardTariffRateItem> items) {
		this.items = items;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public String getGstRate() {
		return gstRate;
	}
	public void setGstRate(String gstRate) {
		this.gstRate = gstRate;
	}
	public String getMinRate() {
		return minRate;
	}
	public void setMinRate(String minRate) {
		this.minRate = minRate;
	}
	public String getMaxRate() {
		return maxRate;
	}
	public void setMaxRate(String maxRate) {
		this.maxRate = maxRate;
	}
	public String getTrfTpNm() {
		return trfTpNm;
	}
	public void setTrfTpNm(String trfTpNm) {
		this.trfTpNm = trfTpNm;
	}
	
}
