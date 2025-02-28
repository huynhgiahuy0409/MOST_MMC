/**
* PartnerTariffRateItem.java
*
* Created on   : Dec 24, 2007
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* Dec 24, 2007   An Doan 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.billing;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.framework.dataitem.DataItem;

public class PartnerTariffRateItem extends DataItem {
    private String trfRegNo;
    private String unitPrc;
    private String ptnrPrc;
    private String ptnrCd;
    private String ptnrNm;
    private String aplyYmd;
    private String exprYmd;
    private String pkgTrfNo;
    private String prcTpCd;
    private String pkgNm;
    private String rmk;
    private String subTrfCd;
    private String descr;
    private String trfTpCd;
    private String billTpCd;
    private String costCntCd;
    private String ssrTpCd;
    private String pyrTpCd;
    private String ivUnit1;
    private String ivUnit2;
    private String ivUnit3;
    private String minVal1;
    //for consignee
    private String no;
    private String sytmId;
    private String vessels;
    
    private String berthCd;
    private String berthNm;
    private String portion;
    private String conSig;
    private String ptnrName;
    private String pkgPrc;
    private String expireDtChk;
    
    private String minRate;
    private String trfRegNoAll;
    /**
     * @return Returns the engNm.
     */
    public String getEngNm() {
        return engNm;
    }
    /**
     * @param engNm The engNm to set.
     */
    public void setEngNm(String engNm) {
        this.engNm = engNm;
    }
    /**
     * @return Returns the ptnrCode.
     */
    public String getPtnrCode() {
        return ptnrCode;
    }
    /**
     * @param ptnrCode The ptnrCode to set.
     */
    public void setPtnrCode(String ptnrCode) {
        this.ptnrCode = ptnrCode;
    }
    /**
     * @return Returns the ptnrType.
     */
    public String getPtnrType() {
        return ptnrType;
    }
    /**
     * @param ptnrType The ptnrType to set.
     */
    public void setPtnrType(String ptnrType) {
        this.ptnrType = ptnrType;
    }
    /**
     * @return Returns the userId.
     */
    public String getUserId() {
        return userId;
    }
    /**
     * @param userId The userId to set.
     */
    public void setUserId(String userId) {
        this.userId = userId;
    }
    private String minVal2;
    private String minVal3;
    private String trfCd;
    private String scd;
    private String scdNm;
    private String divNm;
    private String divCd;
    private String tyCd;
    private String lcd;
    private String n1;
    private String n2;
    private String cgTp;
    
    private String engPtyNm;
    private String ptyDivCd;
    private String ptyCd;
    private String userId;
    private String engNm;
    private String ptnrType;
    private String ptnrCode;
   
    private String addr;
    
    private ArrayList<FileUploadItem> uploadItems;
    
    public String getAddr() {
        return addr;
    }
    public void setAddr(String addr) {
        this.addr = addr;
    }
    public String getAddr1() {
        return addr1;
    }
    public void setAddr1(String addr1) {
        this.addr1 = addr1;
    }
    public String getAddr2() {
        return addr2;
    }
    public void setAddr2(String addr2) {
        this.addr2 = addr2;
    }
    public String getAddr3() {
        return addr3;
    }
    public void setAddr3(String addr3) {
        this.addr3 = addr3;
    }
    public String getAddr4() {
        return addr4;
    }
    public void setAddr4(String addr4) {
        this.addr4 = addr4;
    }
    public String getEngPtyNm() {
        return engPtyNm;
    }
    public void setEngPtyNm(String engPtyNm) {
        this.engPtyNm = engPtyNm;
    }
    public String getFaxNo() {
        return faxNo;
    }
    public void setFaxNo(String faxNo) {
        this.faxNo = faxNo;
    }
    public String getHoldChk() {
        return holdChk;
    }
    public void setHoldChk(String holdChk) {
        this.holdChk = holdChk;
    }
    public String getPtyCd() {
        return ptyCd;
    }
    public void setPtyCd(String ptyCd) {
        this.ptyCd = ptyCd;
    }
    public String getPtyDivCd() {
        return ptyDivCd;
    }
    public void setPtyDivCd(String ptyDivCd) {
        this.ptyDivCd = ptyDivCd;
    }
    public String getPtyDivName() {
        return ptyDivName;
    }
    public void setPtyDivName(String ptyDivName) {
        this.ptyDivName = ptyDivName;
    }
    public String getRepresentative() {
        return representative;
    }
    public void setRepresentative(String representative) {
        this.representative = representative;
    }
    public String getTelNo() {
        return telNo;
    }
    public void setTelNo(String telNo) {
        this.telNo = telNo;
    }
    private String addr1;
    private String addr2;
    private String addr3;  
    private String addr4;
    private String representative;
    
    //2008.01.30	partner type search(Agent List) is added.
    private String telNo;
    private String faxNo;
    private String ptyDivName;
    
    private String holdChk;
    
   //
    
    public String getCgTp() {
        return cgTp;
    }
    public void setCgTp(String cgTp) {
        this.cgTp = cgTp;
    }
    public String getN1() {
        return n1;
    }
    public void setN1(String n1) {
        this.n1 = n1;
    }
    public String getN2() {
        return n2;
    }
    public void setN2(String n2) {
        this.n2 = n2;
    }
    public String getDivCd() {
        return divCd;
    }
    public void setDivCd(String divCd) {
        this.divCd = divCd;
    }
    public String getDivNm() {
        return divNm;
    }
    public void setDivNm(String divNm) {
        this.divNm = divNm;
    }
    public String getLcd() {
        return lcd;
    }
    public void setLcd(String lcd) {
        this.lcd = lcd;
    }
    public String getTyCd() {
        return tyCd;
    }
    public void setTyCd(String tyCd) {
        this.tyCd = tyCd;
    }

    private String updTime;
    
    
    public String getUpdTime() {
        return updTime;
    }
    public void setUpdateTime(String updateTime) {
        this.updTime = updTime;
    }
    public String getPkgPrc() {
        return pkgPrc;
    }
    public void setPkgPrc(String pkgPrc) {
        this.pkgPrc = pkgPrc;
    }
    
    public String getPtnrName() {
        return ptnrName;
    }
    public void setPtnrName(String ptnrName) {
        this.ptnrName = ptnrName;
    }
    public String getBerthCd() {
        return berthCd;
    }
    public void setBerthCd(String berthCd) {
        this.berthCd = berthCd;
    }
    public String getBerthNm() {
        return berthNm;
    }
    public void setBerthNm(String berthNm) {
        this.berthNm = berthNm;
    }
    public String getPortion() {
        return portion;
    }
    public void setPortion(String portion) {
        this.portion = portion;
    }
    public String getVessels() {
        return vessels;
    }
    public void setVessels(String vessels) {
        this.vessels = vessels;
    }
   
    public String getConSig() {
        return conSig;
    }
    public void setConSig(String conSig) {
        this.conSig = conSig;
    }
   
    public String getSubTrfCd() {
        return subTrfCd;
    }
    public void setSubTrfCd(String subTrfCd) {
        this.subTrfCd = subTrfCd;
    }
    public String getSytmId() {
        return sytmId;
    }
    public void setSytmId(String sytmId) {
        this.sytmId = sytmId;
    }
    public String getAplyYmd() {
        return aplyYmd;
    }
    public void setAplyYmd(String aplyYmd) {
        this.aplyYmd = aplyYmd;
    }
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
    public String getExprYmd() {
        return exprYmd;
    }
    public void setExprYmd(String exprYmd) {
        this.exprYmd = exprYmd;
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
    public String getNo() {
        return no;
    }
    public void setNo(String no) {
        this.no = no;
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
    public void setPtnrCd(String ptnrCd) {
        this.ptnrCd = ptnrCd;
    }
    public String getPtnrPrc() {
        return ptnrPrc;
    }
    public void setPtnrPrc(String ptnrPrc) {
        this.ptnrPrc = ptnrPrc;
    }
    public String getPyrTpCd() {
        return pyrTpCd;
    }
    public void setPyrTpCd(String pyrTpCd) {
        this.pyrTpCd = pyrTpCd;
    }
    public String getRmk() {
        return rmk;
    }
    public void setRmk(String rmk) {
        this.rmk = rmk;
    }
    public String getSsrTpCd() {
        return ssrTpCd;
    }
    public void setSsrTpCd(String ssrTpCd) {
        this.ssrTpCd = ssrTpCd;
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
    public String getUnitPrc() {
        return unitPrc;
    }
    public void setUnitPrc(String unitPrc) {
        this.unitPrc = unitPrc;
    }
    public String getTrfRegNo() {
        return trfRegNo;
    }
    public void setTrfRegNo(String trfRegNo) {
        this.trfRegNo = trfRegNo;
    }
    public String getScd() {
        return scd;
    }
    public void setScd(String scd) {
        this.scd = scd;
    }
    public String getScdNm() {
        return scdNm;
    }
    public void setScdNm(String scdNm) {
        this.scdNm = scdNm;
    }
	public String getPtnrNm() {
		return ptnrNm;
	}
	public void setPtnrNm(String ptnrNm) {
		this.ptnrNm = ptnrNm;
	}
	public String getUpdDate() {
		return updDate;
	}
	public void setUpdDate(String updDate) {
		this.updDate = updDate;
	}
	private String updDate;
	private List pkgSum;
	public List getPkgSum() {
		return pkgSum;
	}
	public void setPkgSum(List pkgSum) {
		this.pkgSum = pkgSum;
	}
	public List getPrpt() {
		return prpt;
	}
	public void setPrpt(List prpt) {
		this.prpt = prpt;
	}
	public List getCond() {
		return cond;
	}
	public void setCond(List cond) {
		this.cond = cond;
	}
	public List getBerthList() {
		return berthList;
	}
	public void setBerthList(List berthList) {
		this.berthList = berthList;
	}
	public List getArrService() {
		return arrService;
	}
	public void setArrService(List arrService) {
		this.arrService = arrService;
	}
	private List prpt;
	private List cond;
	private List berthList;
	private List arrService;
	private List<PartnerTariffRateItem> pkgRate;
	public List<PartnerTariffRateItem> getPkgRate() {
		return pkgRate;
	}
	public void setPkgRate(List<PartnerTariffRateItem> pkgRate) {
		this.pkgRate = pkgRate;
	}
	private List curRate;
	public List getCurRate() {
		return curRate;
	}
	public void setCurRate(List curRate) {
		this.curRate = curRate;
	}
	private String deliveryString;
	public String getDeliveryString() {
		return deliveryString;
	}
	public void setDeliveryString(String deliveryStr) {
		deliveryString = deliveryStr;
	}
	public String getCargoString() {
		return CargoString;
	}
	public void setCargoString(String cargoString) {
		CargoString = cargoString;
	}
	public String getCommodityString() {
		return CommodityString;
	}
	public void setCommodityString(String commodityString) {
		CommodityString = commodityString;
	}
	private String CargoString;
	private String CommodityString;
	private String crud;
	public String getCrud() {
		return crud;
	}
	public void setCrud(String crud) {
		this.crud = crud;
	}
	private String berthString;
	public String getBerthString() {
		return berthString;
	}
	public void setBerthString(String berthString) {
		this.berthString = berthString;
	}
	private int ckLOA;
	private int ckDWT;
	public int getCkDWT() {
		return ckDWT;
	}
	public void setCkDWT(int CkdWT) {
		this.ckDWT = CkdWT;
	}
	private boolean chkCargo;
	private String tierVal1Cargo;
	private String tierVal2Cargo;
	private String tierVal1Vsl;
	private String tierVal2Vsl;
	public int getCkLOA() {
		return ckLOA;
	}
	public void setCkLOA(int ckLOA) {
		this.ckLOA = ckLOA;
	}
	public boolean isChkCargo() {
		return chkCargo;
	}
	public void setChkCargo(boolean chkCargo) {
		this.chkCargo = chkCargo;
	}
	public String getTierVal1Cargo() {
		return tierVal1Cargo;
	}
	public void setTierVal1Cargo(String tierVal1Cargo) {
		this.tierVal1Cargo = tierVal1Cargo;
	}
	
	
	public String getTierVal2Cargo() {
		return tierVal2Cargo;
	}
	public void setTierVal2Cargo(String tierVal2Cargo) {
		this.tierVal2Cargo = tierVal2Cargo;
	}
	

	public String getTierVal1Vsl() {
		return tierVal1Vsl;
	}
	public void setTierVal1Vsl(String tierVal1Vsl) {
		this.tierVal1Vsl = tierVal1Vsl;
	}
	
	
	public String getTierVal2Vsl() {
		return tierVal2Vsl;
	}
	public void setTierVal2Vsl(String tierVal2Vsl) {
		this.tierVal2Vsl = tierVal2Vsl;
	}
	private String workingStatus;
	public String getWorkingStatus() {
		return workingStatus;
	}
	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}
	public ArrayList<FileUploadItem> getUploadItems() {
		return uploadItems;
	}
	public void setUploadItems(ArrayList<FileUploadItem> uploadItems) {
		this.uploadItems = uploadItems;
	}
	public String getExpireDtChk() {
		return expireDtChk;
	}
	public void setExpireDtChk(String expireDtChk) {
		this.expireDtChk = expireDtChk;
	}
	public String getMinRate() {
		return minRate;
	}
	public void setMinRate(String minRate) {
		this.minRate = minRate;
	}
	public void setUpdTime(String updTime) {
		this.updTime = updTime;
	}
	public String getTrfRegNoAll() {
		return trfRegNoAll;
	}
	public void setTrfRegNoAll(String trfRegNoAll) {
		this.trfRegNoAll = trfRegNoAll;
	}
}
