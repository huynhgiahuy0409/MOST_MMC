/**
* WhRentalItem.java
*
* Created on   : 2008-01-18
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2007-07-17   Mr Jackey Kim 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.planning;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;

public class WhRentalItem extends DataItem {
    private String conttNo;
    private String refNo;
    private String fmYmd;
    private String toYmd;
    private String rentTpCd;
    private String rentTpNm;
    private String prdTpCd;
    private String prdVal;
    private String rentUnit;
    private String useTpCd;
    private String vldYn;
    private String tnnt;
    private String tnntNm;
    private String tnntTpCd;
    private String area;
    private String payer;
    private String payerNm;
    private String payerTpCd;
    private String conttr;
    private String conttrNm;
    private String conttrTpCd;
    private String payTpCd;
    private String unitPrice;
    private String vslCallId;
    private String locId;
    private String hiHoYn;
    private String rmk;
    private String fontColr;
    private String lineColr;
    private String freeStrgDays;
    private String cnt;
    private String cd;
    private String cdNm;
    private String insertType;
    private String no;
    private String chk;
    private String status;
    
    //detail item info
    private String rentNo;
    private String itemDivCd;
    private String unitDivCd;
    private String unitTpCd;
    private String noVal;
    private String cdVal;
    private String cdValNm;
    private String locIdNames;
    private boolean procSuccess;
    private DataItemList rentalList;
    private DataItemList rentalDetailList;
    private DataItemList refList;
    private DataItemList refChkList; 
    private ArrayList<WhRentalItem> listDetail; 
    private String workingStatus;
    private String rentalRemind;

    public DataItemList getRentalList() {
		return rentalList;
	}
	public DataItemList getRentalDetailList() {
		return rentalDetailList;
	}
	public void setRentalList(DataItemList rentalList) {
		this.rentalList = rentalList;
	}
	public void setRentalDetailList(DataItemList rentalDetailList) {
		this.rentalDetailList = rentalDetailList;
	}
	/**
     * @return Returns the area.
     */
    public String getArea() {
        return area;
    }
    /**
     * @param area The area to set.
     */
    public void setArea(String area) {
        this.area = area;
    }
    /**
     * @return Returns the cd.
     */
    public String getCd() {
        return cd;
    }
    /**
     * @param cd The cd to set.
     */
    public void setCd(String cd) {
        this.cd = cd;
    }
    /**
     * @return Returns the cdNm.
     */
    public String getCdNm() {
        return cdNm;
    }
    /**
     * @param cdNm The cdNm to set.
     */
    public void setCdNm(String cdNm) {
        this.cdNm = cdNm;
    }
    /**
     * @return Returns the cdVal.
     */
    public String getCdVal() {
        return cdVal;
    }
    /**
     * @param cdVal The cdVal to set.
     */
    public void setCdVal(String cdVal) {
        this.cdVal = cdVal;
    }
    /**
     * @return Returns the cdValNm.
     */
    public String getCdValNm() {
        return cdValNm;
    }
    /**
     * @param cdValNm The cdValNm to set.
     */
    public void setCdValNm(String cdValNm) {
        this.cdValNm = cdValNm;
    }
    /**
     * @return Returns the cnt.
     */
    public String getCnt() {
        return cnt;
    }
    /**
     * @param cnt The cnt to set.
     */
    public void setCnt(String cnt) {
        this.cnt = cnt;
    }
    /**
     * @return Returns the conttNo.
     */
    public String getConttNo() {
        return conttNo;
    }
    /**
     * @param conttNo The conttNo to set.
     */
    public void setConttNo(String conttNo) {
        this.conttNo = conttNo;
    }
    /**
     * @return Returns the fmYmd.
     */
    public String getFmYmd() {
        return fmYmd;
    }
    /**
     * @param fmYmd The fmYmd to set.
     */
    public void setFmYmd(String fmYmd) {
        this.fmYmd = fmYmd;
    }
    /**
     * @return Returns the fontColr.
     */
    public String getFontColr() {
        return fontColr;
    }
    /**
     * @param fontColr The fontColr to set.
     */
    public void setFontColr(String fontColr) {
        this.fontColr = fontColr;
    }
    /**
     * @return Returns the freeStrgDays.
     */
    public String getFreeStrgDays() {
        return freeStrgDays;
    }
    /**
     * @param freeStrgDays The freeStrgDays to set.
     */
    public void setFreeStrgDays(String freeStrgDays) {
        this.freeStrgDays = freeStrgDays;
    }
    /**
     * @return Returns the hiHoYn.
     */
    public String getHiHoYn() {
        return hiHoYn;
    }
    /**
     * @param hiHoYn The hiHoYn to set.
     */
    public void setHiHoYn(String hiHoYn) {
        this.hiHoYn = hiHoYn;
    }
    /**
     * @return Returns the insertType.
     */
    public String getInsertType() {
        return insertType;
    }
    /**
     * @param insertType The insertType to set.
     */
    public void setInsertType(String insertType) {
        this.insertType = insertType;
    }
    /**
     * @return Returns the itemDivCd.
     */
    public String getItemDivCd() {
        return itemDivCd;
    }
    /**
     * @param itemDivCd The itemDivCd to set.
     */
    public void setItemDivCd(String itemDivCd) {
        this.itemDivCd = itemDivCd;
    }
    /**
     * @return Returns the lineColr.
     */
    public String getLineColr() {
        return lineColr;
    }
    /**
     * @param lineColr The lineColr to set.
     */
    public void setLineColr(String lineColr) {
        this.lineColr = lineColr;
    }
    /**
     * @return Returns the locId.
     */
    public String getLocId() {
        return locId;
    }
    /**
     * @param locId The locId to set.
     */
    public void setLocId(String locId) {
        this.locId = locId;
    }
    /**
     * @return Returns the no.
     */
    public String getNo() {
        return no;
    }
    /**
     * @param no The no to set.
     */
    public void setNo(String no) {
        this.no = no;
    }
    /**
     * @return Returns the noVal.
     */
    public String getNoVal() {
        return noVal;
    }
    /**
     * @param noVal The noVal to set.
     */
    public void setNoVal(String noVal) {
        this.noVal = noVal;
    }
    /**
     * @return Returns the payer.
     */
    public String getPayer() {
        return payer;
    }
    /**
     * @param payer The payer to set.
     */
    public void setPayer(String payer) {
        this.payer = payer;
    }
    /**
     * @return Returns the payerTpCd.
     */
    public String getPayerTpCd() {
        return payerTpCd;
    }
    /**
     * @param payerTpCd The payerTpCd to set.
     */
    public void setPayerTpCd(String payerTpCd) {
        this.payerTpCd = payerTpCd;
    }
    /**
     * @return Returns the prdTpCd.
     */
    public String getPrdTpCd() {
        return prdTpCd;
    }
    /**
     * @param prdTpCd The prdTpCd to set.
     */
    public void setPrdTpCd(String prdTpCd) {
        this.prdTpCd = prdTpCd;
    }
    /**
     * @return Returns the prdVal.
     */
    public String getPrdVal() {
        return prdVal;
    }
    /**
     * @param prdVal The prdVal to set.
     */
    public void setPrdVal(String prdVal) {
        this.prdVal = prdVal;
    }
    /**
     * @return Returns the procSuccess.
     */
    public boolean isProcSuccess() {
        return procSuccess;
    }
    /**
     * @param procSuccess The procSuccess to set.
     */
    public void setProcSuccess(boolean procSuccess) {
        this.procSuccess = procSuccess;
    }
    /**
     * @return Returns the rentNo.
     */
    public String getRentNo() {
        return rentNo;
    }
    /**
     * @param rentNo The rentNo to set.
     */
    public void setRentNo(String rentNo) {
        this.rentNo = rentNo;
    }
    /**
     * @return Returns the rentTpCd.
     */
    public String getRentTpCd() {
        return rentTpCd;
    }
    /**
     * @param rentTpCd The rentTpCd to set.
     */
    public void setRentTpCd(String rentTpCd) {
        this.rentTpCd = rentTpCd;
    }
    /**
     * @return Returns the rentTpNm.
     */
    public String getRentTpNm() {
        return rentTpNm;
    }
    /**
     * @param rentTpNm The rentTpNm to set.
     */
    public void setRentTpNm(String rentTpNm) {
        this.rentTpNm = rentTpNm;
    }
    /**
     * @return Returns the rentUnit.
     */
    public String getRentUnit() {
        return rentUnit;
    }
    /**
     * @param rentUnit The rentUnit to set.
     */
    public void setRentUnit(String rentUnit) {
        this.rentUnit = rentUnit;
    }
    /**
     * @return Returns the rmk.
     */
    public String getRmk() {
        return rmk;
    }
    /**
     * @param rmk The rmk to set.
     */
    public void setRmk(String rmk) {
        this.rmk = rmk;
    }
    /**
     * @return Returns the tnnt.
     */
    public String getTnnt() {
        return tnnt;
    }
    /**
     * @param tnnt The tnnt to set.
     */
    public void setTnnt(String tnnt) {
        this.tnnt = tnnt;
    }
    /**
     * @return Returns the tnntTpCd.
     */
    public String getTnntTpCd() {
        return tnntTpCd;
    }
    /**
     * @param tnntTpCd The tnntTpCd to set.
     */
    public void setTnntTpCd(String tnntTpCd) {
        this.tnntTpCd = tnntTpCd;
    }
    /**
     * @return Returns the toYmd.
     */
    public String getToYmd() {
        return toYmd;
    }
    /**
     * @param toYmd The toYmd to set.
     */
    public void setToYmd(String toYmd) {
        this.toYmd = toYmd;
    }
    /**
     * @return Returns the unitDivCd.
     */
    public String getUnitDivCd() {
        return unitDivCd;
    }
    /**
     * @param unitDivCd The unitDivCd to set.
     */
    public void setUnitDivCd(String unitDivCd) {
        this.unitDivCd = unitDivCd;
    }
    /**
     * @return Returns the unitPrice.
     */
    public String getUnitPrice() {
        return unitPrice;
    }
    /**
     * @param unitPrice The unitPrice to set.
     */
    public void setUnitPrice(String unitPrice) {
        this.unitPrice = unitPrice;
    }
    /**
     * @return Returns the unitTpCd.
     */
    public String getUnitTpCd() {
        return unitTpCd;
    }
    /**
     * @param unitTpCd The unitTpCd to set.
     */
    public void setUnitTpCd(String unitTpCd) {
        this.unitTpCd = unitTpCd;
    }
    /**
     * @return Returns the useTpCd.
     */
    public String getUseTpCd() {
        return useTpCd;
    }
    /**
     * @param useTpCd The useTpCd to set.
     */
    public void setUseTpCd(String useTpCd) {
        this.useTpCd = useTpCd;
    }
    /**
     * @return Returns the vldYn.
     */
    public String getVldYn() {
        return vldYn;
    }
    /**
     * @param vldYn The vldYn to set.
     */
    public void setVldYn(String vldYn) {
        this.vldYn = vldYn;
    }
    /**
     * @return Returns the vslCallId.
     */
    public String getVslCallId() {
        return vslCallId;
    }
    /**
     * @param vslCallId The vslCallId to set.
     */
    public void setVslCallId(String vslCallId) {
        this.vslCallId = vslCallId;
    }
    /**
     * @return Returns the chk.
     */
    public String getChk() {
        return chk;
    }
    /**
     * @param chk The chk to set.
     */
    public void setChk(String chk) {
        this.chk = chk;
    }
    /**
     * @return Returns the conttr.
     */
    public String getConttr() {
        return conttr;
    }
    /**
     * @param conttr The conttr to set.
     */
    public void setConttr(String conttr) {
        this.conttr = conttr;
    }
    /**
     * @return Returns the conttrTpCd.
     */
    public String getConttrTpCd() {
        return conttrTpCd;
    }
    /**
     * @param conttrTpCd The conttrTpCd to set.
     */
    public void setConttrTpCd(String conttrTpCd) {
        this.conttrTpCd = conttrTpCd;
    }
    /**
     * @return Returns the payTpCd.
     */
    public String getPayTpCd() {
        return payTpCd;
    }
    /**
     * @param payTpCd The payTpCd to set.
     */
    public void setPayTpCd(String payTpCd) {
        this.payTpCd = payTpCd;
    }
    /**
     * @return Returns the refNo.
     */
    public String getRefNo() {
        return refNo;
    }
    /**
     * @param refNo The refNo to set.
     */
    public void setRefNo(String refNo) {
        this.refNo = refNo;
    }
    /**
     * @return Returns the status.
     */
    public String getStatus() {
        return status;
    }
    /**
     * @param status The status to set.
     */
    public void setStatus(String status) {
        this.status = status;
    }
    /**
     * @return Returns the locIdNames.
     */
    public String getLocIdNames() {
        return locIdNames;
    }
    /**
     * @param locIdNames The locIdNames to set.
     */
    public void setLocIdNames(String locIdNames) {
        this.locIdNames = locIdNames;
    }
	public DataItemList getRefList() {
		return refList;
	}
	public DataItemList getRefChkList() {
		return refChkList;
	}
	public void setRefList(DataItemList refList) {
		this.refList = refList;
	}
	public void setRefChkList(DataItemList refChkList) {
		this.refChkList = refChkList;
	}
	public ArrayList<WhRentalItem> getListDetail() {
		return listDetail;
	}
	public void setListDetail(ArrayList<WhRentalItem> listDetail) {
		this.listDetail = listDetail;
	}
	public String getWorkingStatus() {
		return workingStatus;
	}
	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}
	public String getTnntNm() {
		return tnntNm;
	}
	public void setTnntNm(String tnntNm) {
		this.tnntNm = tnntNm;
	}
	public String getPayerNm() {
		return payerNm;
	}
	public void setPayerNm(String payerNm) {
		this.payerNm = payerNm;
	}
	public String getConttrNm() {
		return conttrNm;
	}
	public void setConttrNm(String conttrNm) {
		this.conttrNm = conttrNm;
	}
	public String getRentalRemind() {
		return rentalRemind;
	}
	public void setRentalRemind(String rentalRemind) {
		this.rentalRemind = rentalRemind;
	}
}
