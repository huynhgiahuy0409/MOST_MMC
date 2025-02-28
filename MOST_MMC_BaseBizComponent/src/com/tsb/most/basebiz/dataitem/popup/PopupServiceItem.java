/**
* CommodityCodeItem.java
*
* Created on   : 2008-03-28
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.11 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	          REVISION    	
* 2008-03-28   Miss Nam-Sook Chang 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.basebiz.dataitem.popup;

import com.tsb.most.framework.dataitem.DataItem;


public class PopupServiceItem extends DataItem {
    // partner popup
	private String ptnrName;   
    private String ptnrType;
    private String ptnrTypes;
    private String ptnrCode;
    private String ptnrTpNm;
    private String addr;
    private String addr1;
    private String addr2;
    private String addr3;
    private String addr4;
    private String representative;
    private String holdChk;
    private String accountNo;
    private String accountHold;
    private String telNo;
    private String faxNo;
    private String accNo;
    private String paymentType;
    
    //Common Code
    private String code;
    private String codeName;
    private String codeDesc;
    private String codeType;
    private String scd;
    private String scdNm;
    
	//Group List
    private String authGrp;
    private String authGrpName;
    
    //Tariff popup
    private String trfCd;
    private String subTrfCd;
    private String trfTpCd;
    private String descr;
    private String systemId;
    private String trfTpCdNm;
    private String billTpCd;
    private String ssrTpCd;
    private String ssrTpCdNm;
    private String costCntCd;
    private String payerCd;
    private String ivUnit1;
    private String ivUnit2;
    private String ivUnit3;
    private String stdPrc;
    private String staffCd;
    private String updTime;
    private String gstTpCd;
    private String gstRate;
    private String erpCostCntCd;
    //Mantis: 0167150
    private String minRate;
    
    //commodity & commodity Group
    private String cmmdCode;
    private String cmmdName;
    private String cmmdTpCd;
    private String cmmdGrpCode;
    private String cmmdGrpName;
    
    //port code
    private String countryCode;
    private String countryName;
    private String portCode;
    private String portName;
    
    //ImdgList
    private String unno;
    private String classLevel;
    private String substance;
    private String imdg;
    
    //Lorry List & Driver List
    private String lorryNo;
    private String lorryId;
    private String transportCd;
    private String transportName;
    private String contrator; //EQ Contractor
    
    private String driverId;
    private String driverName;
    private String driverNm;
    private String licenseNo;
    private String licenseExpired;
    private String gateTxnNo;
    private String wbTransactionNo;
    
    //Chassis List
    private String plateNo;
    private String allowWgt;
    private String tareWgt;
    
    //Assignment truck
    private String vslCallId;
    private String mfDocId;
    private String shipgNoteNo;
    private String blNo;
    private String grNo;
    private String sdoNo;
    
    //Goods Receipt
    private String mt;
    private String m3;
    private String pkgQty;
    private String location;
    private String delvTpCode;
    private String delvTpCd;
    private String delvTpName;
    private String delvTpNm;
    private String cmdtCode;
    private String cmdtName;
    private String gateInDate;
    private String customsReleasedStatus;
    
    //SDO
    private String doNo;
    private String cgNo;
    
    //GatePass
    private String gatePassNo;

    //Unit No
    private String yardLoc;
    
    //Package No
    private String packageNo;
    private String packageDesc;
    private String length;
    private String width;
    private String height;
    private String remarks;
    private String refNo;
    private String vslCd;
    private String callSeq;
    private String callYear;
    private String pkgTpCd;
    private String rePkgTpCd;
    private String opeClassCd;
    
    //Barge Popup
    private String bargeNo;
    private String vslNm;
    private String scn;
    private String atb;
    private String atu;
    private String atw;
    private String atc;
    
    //Partner Code
    private String ptyCd;
    private String engPtyNm;
    
    //Equipment Code List
    private String eqFacNo;
    private String eqFacNm;
    private String ownDivCd;
    private String ownDivNm;
    private String eqDivCd;
    private String eqDivCdNm;
    private String capaCd;
    private String capaDescr;
    private String locId;
    private String locNm;
    private String gearCd;
    private String gearNm;
    private String eqName;
	private String eqCapacity;
    
    //Service Order
    private String category1;
    private String category1Nm;
    private String category2;
    private String category2Nm;
    private String category3;
    private String category3Nm;
    private String svcDtTp;
    private String dt1Tit;
    private String dt1Chk;
    private String dt1Tp;
    private String dt1Fm;
    private String dt1To;
    private String dt2Tit;
    private String dt2Chk;
    private String dt2Tp;
    private String dt2Fm;
    private String dt2To;
    private String shftId;
    private String unitDec;
    private String unitTit;
    private String unit;
    private String unitUomNm;
    private String unit1Chk;
    private String unit1Dec;
    private String unit1Tit;
    private String unit1;
    private String unit1UomNm;
    private String unit2Chk;
    private String unit2Dec;
    private String unit2Tit;
    private String unit2;
    private String unit2UomNm;
    private String locChk;
    private String rmkChk;
    private String cmdtyChk;
    private String documentChk;
    private String unitChk;
    private String documentTp;
    private String documentNm;
    
    private String acptYN;
    
    private String roleCd;
    private String sRoleCd;
    private String empId;
    private String empNm;
    
    private String towedWgt;
    
    private String gateTicketNo;
    private String cgInOutCd;
    
    private String agChkInTime;
    private String agGateInDt;
    private String firstWgt;
    
    private String vslTp;
    private String vslTpNm;
    private String eta;
    private String etb;
    private String etd;
    private String voyage;
    private String vslOperator;
    //s-OPR-015: Gate Operation – Modification
    private String shipper;
    private String shipperNm;
    private String cnsne;
    private String cnsneNm;
    private String wgt;
    private String msrmt;
    private String cmdtCd;
    private String cgTpCd;
    private String catgCd;
    private String custMode;
    
	public String getDelvTpCd() {
		return delvTpCd;
	}
	public void setDelvTpCd(String delvTpCd) {
		this.delvTpCd = delvTpCd;
	}
	public String getDelvTpNm() {
		return delvTpNm;
	}
	public void setDelvTpNm(String delvTpNm) {
		this.delvTpNm = delvTpNm;
	}
	public String getDriverNm() {
		return driverNm;
	}
	public void setDriverNm(String driverNm) {
		this.driverNm = driverNm;
	}
	public String getCustMode() {
		return custMode;
	}
	public void setCustMode(String custMode) {
		this.custMode = custMode;
	}
	public String getCatgCd() {
		return catgCd;
	}
	public void setCatgCd(String catgCd) {
		this.catgCd = catgCd;
	}
	public String getShipper() {
		return shipper;
	}
	public void setShipper(String shipper) {
		this.shipper = shipper;
	}
	public String getShipperNm() {
		return shipperNm;
	}
	public void setShipperNm(String shipperNm) {
		this.shipperNm = shipperNm;
	}
	public String getCnsne() {
		return cnsne;
	}
	public void setCnsne(String cnsne) {
		this.cnsne = cnsne;
	}
	public String getCnsneNm() {
		return cnsneNm;
	}
	public void setCnsneNm(String cnsneNm) {
		this.cnsneNm = cnsneNm;
	}
	public String getWgt() {
		return wgt;
	}
	public void setWgt(String wgt) {
		this.wgt = wgt;
	}
	public String getMsrmt() {
		return msrmt;
	}
	public void setMsrmt(String msrmt) {
		this.msrmt = msrmt;
	}
	public String getCmdtCd() {
		return cmdtCd;
	}
	public void setCmdtCd(String cmdtCd) {
		this.cmdtCd = cmdtCd;
	}
	public String getCgTpCd() {
		return cgTpCd;
	}
	public void setCgTpCd(String cgTpCd) {
		this.cgTpCd = cgTpCd;
	}
	//e-OPR-015: Gate Operation – Modification
	public String getPtnrName() {
		return ptnrName;
	}
	public void setPtnrName(String ptnrName) {
		this.ptnrName = ptnrName;
	}
	public String getPtnrType() {
		return ptnrType;
	}
	public void setPtnrType(String ptnrType) {
		this.ptnrType = ptnrType;
	}
	public String getPtnrCode() {
		return ptnrCode;
	}
	public void setPtnrCode(String ptnrCode) {
		this.ptnrCode = ptnrCode;
	}
	public String getPtnrTpNm() {
		return ptnrTpNm;
	}
	public void setPtnrTpNm(String ptnrTpNm) {
		this.ptnrTpNm = ptnrTpNm;
	}
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
	public String getRepresentative() {
		return representative;
	}
	public void setRepresentative(String representative) {
		this.representative = representative;
	}
	public String getHoldChk() {
		return holdChk;
	}
	public void setHoldChk(String holdChk) {
		this.holdChk = holdChk;
	}
	public String getAccountHold() {
		return accountHold;
	}
	public void setAccountHold(String accountHold) {
		this.accountHold = accountHold;
	}
	public String getTelNo() {
		return telNo;
	}
	public void setTelNo(String telNo) {
		this.telNo = telNo;
	}
	public String getFaxNo() {
		return faxNo;
	}
	public void setFaxNo(String faxNo) {
		this.faxNo = faxNo;
	}
	public String getAccNo() {
		return accNo;
	}
	public void setAccNo(String accNo) {
		this.accNo = accNo;
	}
	public String getPaymentType() {
		return paymentType;
	}
	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}
	
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getCodeName() {
		return codeName;
	}
	public void setCodeName(String codeName) {
		this.codeName = codeName;
	}
	public String getCodeDesc() {
		return codeDesc;
	}
	public void setCodeDesc(String codeDesc) {
		this.codeDesc = codeDesc;
	}
	public String getCodeType() {
		return codeType;
	}
	public void setCodeType(String codeType) {
		this.codeType = codeType;
	}
	public String getAuthGrp() {
		return authGrp;
	}
	public void setAuthGrp(String authGrp) {
		this.authGrp = authGrp;
	}
	public String getAuthGrpName() {
		return authGrpName;
	}
	public void setAuthGrpName(String authGrpName) {
		this.authGrpName = authGrpName;
	}
	public String getTrfCd() {
		return trfCd;
	}
	public void setTrfCd(String trfCd) {
		this.trfCd = trfCd;
	}
	public String getSubTrfCd() {
		return subTrfCd;
	}
	public void setSubTrfCd(String subTrfCd) {
		this.subTrfCd = subTrfCd;
	}
	public String getTrfTpCd() {
		return trfTpCd;
	}
	public void setTrfTpCd(String trfTpCd) {
		this.trfTpCd = trfTpCd;
	}
	public String getDescr() {
		return descr;
	}
	public void setDescr(String descr) {
		this.descr = descr;
	}
	public String getSystemId() {
		return systemId;
	}
	public void setSystemId(String systemId) {
		this.systemId = systemId;
	}
	public String getBillTpCd() {
		return billTpCd;
	}
	public void setBillTpCd(String billTpCd) {
		this.billTpCd = billTpCd;
	}
	public String getSsrTpCd() {
		return ssrTpCd;
	}
	public void setSsrTpCd(String ssrTpCd) {
		this.ssrTpCd = ssrTpCd;
	}
	public String getSsrTpCdNm() {
		return ssrTpCdNm;
	}
	public void setSsrTpCdNm(String ssrTpCdNm) {
		this.ssrTpCdNm = ssrTpCdNm;
	}
	public String getCostCntCd() {
		return costCntCd;
	}
	public void setCostCntCd(String costCntCd) {
		this.costCntCd = costCntCd;
	}
	public String getPayerCd() {
		return payerCd;
	}
	public void setPayerCd(String payerCd) {
		this.payerCd = payerCd;
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
	public String getStaffCd() {
		return staffCd;
	}
	public void setStaffCd(String staffCd) {
		this.staffCd = staffCd;
	}
	public String getUpdTime() {
		return updTime;
	}
	public void setUpdTime(String updTime) {
		this.updTime = updTime;
	}
	public String getAccountNo() {
		return accountNo;
	}
	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}
	public String getCmmdCode() {
		return cmmdCode;
	}
	public void setCmmdCode(String cmmdCode) {
		this.cmmdCode = cmmdCode;
	}
	public String getCmmdName() {
		return cmmdName;
	}
	public void setCmmdName(String cmmdName) {
		this.cmmdName = cmmdName;
	}
	public String getCmmdTpCd() {
		return cmmdTpCd;
	}
	public void setCmmdTpCd(String cmmdTpCd) {
		this.cmmdTpCd = cmmdTpCd;
	}
	public String getCmmdGrpCode() {
		return cmmdGrpCode;
	}
	public void setCmmdGrpCode(String cmmdGrpCode) {
		this.cmmdGrpCode = cmmdGrpCode;
	}
	public String getCmmdGrpName() {
		return cmmdGrpName;
	}
	public void setCmmdGrpName(String cmmdGrpName) {
		this.cmmdGrpName = cmmdGrpName;
	}
	public String getCountryCode() {
		return countryCode;
	}
	public void setCountryCode(String countryCode) {
		this.countryCode = countryCode;
	}
	public String getCountryName() {
		return countryName;
	}
	public void setCountryName(String countryName) {
		this.countryName = countryName;
	}
	public String getPortCode() {
		return portCode;
	}
	public void setPortCode(String portCode) {
		this.portCode = portCode;
	}
	public String getPortName() {
		return portName;
	}
	public void setPortName(String portName) {
		this.portName = portName;
	}
	public String getUnno() {
		return unno;
	}
	public void setUnno(String unno) {
		this.unno = unno;
	}
	public String getClassLevel() {
		return classLevel;
	}
	public void setClassLevel(String classLevel) {
		this.classLevel = classLevel;
	}
	public String getSubstance() {
		return substance;
	}
	public void setSubstance(String substance) {
		this.substance = substance;
	}
	public String getLorryNo() {
		return lorryNo;
	}
	public void setLorryNo(String lorryNo) {
		this.lorryNo = lorryNo;
	}
	public String getLorryId() {
		return lorryId;
	}
	public void setLorryId(String lorryId) {
		this.lorryId = lorryId;
	}
	public String getTransportName() {
		return transportName;
	}
	public void setTransportName(String transportName) {
		this.transportName = transportName;
	}
	public String getDriverId() {
		return driverId;
	}
	public void setDriverId(String driverId) {
		this.driverId = driverId;
	}
	public String getDriverName() {
		return driverName;
	}
	public void setDriverName(String driverName) {
		this.driverName = driverName;
	}
	public String getLicenseNo() {
		return licenseNo;
	}
	public void setLicenseNo(String licenseNo) {
		this.licenseNo = licenseNo;
	}
	public String getLicenseExpired() {
		return licenseExpired;
	}
	public void setLicenseExpired(String licenseExpired) {
		this.licenseExpired = licenseExpired;
	}
	public String getPlateNo() {
		return plateNo;
	}
	public void setPlateNo(String plateNo) {
		this.plateNo = plateNo;
	}
	public String getAllowWgt() {
		return allowWgt;
	}
	public void setAllowWgt(String allowWgt) {
		this.allowWgt = allowWgt;
	}
	public String getTareWgt() {
		return tareWgt;
	}
	public void setTareWgt(String tareWgt) {
		this.tareWgt = tareWgt;
	}
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getShipgNoteNo() {
		return shipgNoteNo;
	}
	public void setShipgNoteNo(String shipgNoteNo) {
		this.shipgNoteNo = shipgNoteNo;
	}
	public String getBlNo() {
		return blNo;
	}
	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}
	public String getTransportCd() {
		return transportCd;
	}
	public void setTransportCd(String transportCd) {
		this.transportCd = transportCd;
	}
	public String getGateTxnNo() {
		return gateTxnNo;
	}
	public void setGateTxnNo(String gateTxnNo) {
		this.gateTxnNo = gateTxnNo;
	}
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
	public String getGrNo() {
		return grNo;
	}
	public void setGrNo(String grNo) {
		this.grNo = grNo;
	}
	public String getMt() {
		return mt;
	}
	public void setMt(String mt) {
		this.mt = mt;
	}
	public String getM3() {
		return m3;
	}
	public void setM3(String m3) {
		this.m3 = m3;
	}
	public String getPkgQty() {
		return pkgQty;
	}
	public void setPkgQty(String pkgQty) {
		this.pkgQty = pkgQty;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getDelvTpCode() {
		return delvTpCode;
	}
	public void setDelvTpCode(String delvTpCode) {
		this.delvTpCode = delvTpCode;
	}
	public String getDelvTpName() {
		return delvTpName;
	}
	public void setDelvTpName(String delvTpName) {
		this.delvTpName = delvTpName;
	}
	public String getCmdtCode() {
		return cmdtCode;
	}
	public void setCmdtCode(String cmdtCode) {
		this.cmdtCode = cmdtCode;
	}
	public String getCmdtName() {
		return cmdtName;
	}
	public void setCmdtName(String cmdtName) {
		this.cmdtName = cmdtName;
	}
	public String getGateInDate() {
		return gateInDate;
	}
	public void setGateInDate(String gateInDate) {
		this.gateInDate = gateInDate;
	}
	public String getCustomsReleasedStatus() {
		return customsReleasedStatus;
	}
	public void setCustomsReleasedStatus(String customsReleasedStatus) {
		this.customsReleasedStatus = customsReleasedStatus;
	}
	public String getDoNo() {
		return doNo;
	}
	public void setDoNo(String doNo) {
		this.doNo = doNo;
	}
	public String getCgNo() {
		return cgNo;
	}
	public void setCgNo(String cgNo) {
		this.cgNo = cgNo;
	}
	public String getGatePassNo() {
		return gatePassNo;
	}
	public void setGatePassNo(String gatePassNo) {
		this.gatePassNo = gatePassNo;
	}
	public String getPackageNo() {
		return packageNo;
	}
	public void setPackageNo(String packageNo) {
		this.packageNo = packageNo;
	}
	public String getPackageDesc() {
		return packageDesc;
	}
	public void setPackageDesc(String packageDesc) {
		this.packageDesc = packageDesc;
	}
	public String getLength() {
		return length;
	}
	public void setLength(String length) {
		this.length = length;
	}
	public String getWidth() {
		return width;
	}
	public void setWidth(String width) {
		this.width = width;
	}
	public String getHeight() {
		return height;
	}
	public void setHeight(String height) {
		this.height = height;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public String getRefNo() {
		return refNo;
	}
	public void setRefNo(String refNo) {
		this.refNo = refNo;
	}
	public String getBargeNo() {
		return bargeNo;
	}
	public void setBargeNo(String bargeNo) {
		this.bargeNo = bargeNo;
	}
	public String getVslNm() {
		return vslNm;
	}
	public void setVslNm(String vslNm) {
		this.vslNm = vslNm;
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
	public String getYardLoc() {
		return yardLoc;
	}
	public void setYardLoc(String yardLoc) {
		this.yardLoc = yardLoc;
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
	public String getPtyCd() {
		return ptyCd;
	}
	public void setPtyCd(String ptyCd) {
		this.ptyCd = ptyCd;
	}
	public String getEngPtyNm() {
		return engPtyNm;
	}
	public void setEngPtyNm(String engPtyNm) {
		this.engPtyNm = engPtyNm;
	}
	public String getEqFacNo() {
		return eqFacNo;
	}
	public void setEqFacNo(String eqFacNo) {
		this.eqFacNo = eqFacNo;
	}
	public String getEqFacNm() {
		return eqFacNm;
	}
	public void setEqFacNm(String eqFacNm) {
		this.eqFacNm = eqFacNm;
	}
	public String getOwnDivCd() {
		return ownDivCd;
	}
	public void setOwnDivCd(String ownDivCd) {
		this.ownDivCd = ownDivCd;
	}
	public String getOwnDivNm() {
		return ownDivNm;
	}
	public void setOwnDivNm(String ownDivNm) {
		this.ownDivNm = ownDivNm;
	}
	public String getEqDivCd() {
		return eqDivCd;
	}
	public void setEqDivCd(String eqDivCd) {
		this.eqDivCd = eqDivCd;
	}
	public String getEqDivCdNm() {
		return eqDivCdNm;
	}
	public void setEqDivCdNm(String eqDivCdNm) {
		this.eqDivCdNm = eqDivCdNm;
	}
	public String getCapaCd() {
		return capaCd;
	}
	public void setCapaCd(String capaCd) {
		this.capaCd = capaCd;
	}
	public String getCapaDescr() {
		return capaDescr;
	}
	public void setCapaDescr(String capaDescr) {
		this.capaDescr = capaDescr;
	}
	public String getEqName() {
		return eqName;
	}
	public void setEqName(String eqName) {
		this.eqName = eqName;
	}
	public String getEqCapacity() {
		return eqCapacity;
	}
	public void setEqCapacity(String eqCapacity) {
		this.eqCapacity = eqCapacity;
	}
	public String getLocId() {
		return locId;
	}
	public void setLocId(String locId) {
		this.locId = locId;
	}
	public String getLocNm() {
		return locNm;
	}
	public void setLocNm(String locNm) {
		this.locNm = locNm;
	}
	public String getGearCd() {
		return gearCd;
	}
	public void setGearCd(String gearCd) {
		this.gearCd = gearCd;
	}
	public String getGearNm() {
		return gearNm;
	}
	public void setGearNm(String gearNm) {
		this.gearNm = gearNm;
	}
	public String getCategory1() {
		return category1;
	}
	public void setCategory1(String category1) {
		this.category1 = category1;
	}
	public String getCategory1Nm() {
		return category1Nm;
	}
	public void setCategory1Nm(String category1Nm) {
		this.category1Nm = category1Nm;
	}
	public String getCategory2() {
		return category2;
	}
	public void setCategory2(String category2) {
		this.category2 = category2;
	}
	public String getCategory2Nm() {
		return category2Nm;
	}
	public void setCategory2Nm(String category2Nm) {
		this.category2Nm = category2Nm;
	}
	public String getCategory3() {
		return category3;
	}
	public void setCategory3(String category3) {
		this.category3 = category3;
	}
	public String getCategory3Nm() {
		return category3Nm;
	}
	public void setCategory3Nm(String category3Nm) {
		this.category3Nm = category3Nm;
	}
	public String getSvcDtTp() {
		return svcDtTp;
	}
	public void setSvcDtTp(String svcDtTp) {
		this.svcDtTp = svcDtTp;
	}
	public String getDt1Tit() {
		return dt1Tit;
	}
	public void setDt1Tit(String dt1Tit) {
		this.dt1Tit = dt1Tit;
	}
	public String getDt1Chk() {
		return dt1Chk;
	}
	public void setDt1Chk(String dt1Chk) {
		this.dt1Chk = dt1Chk;
	}
	public String getDt1Tp() {
		return dt1Tp;
	}
	public void setDt1Tp(String dt1Tp) {
		this.dt1Tp = dt1Tp;
	}
	public String getDt1Fm() {
		return dt1Fm;
	}
	public void setDt1Fm(String dt1Fm) {
		this.dt1Fm = dt1Fm;
	}
	public String getDt1To() {
		return dt1To;
	}
	public void setDt1To(String dt1To) {
		this.dt1To = dt1To;
	}
	public String getDt2Tit() {
		return dt2Tit;
	}
	public void setDt2Tit(String dt2Tit) {
		this.dt2Tit = dt2Tit;
	}
	public String getDt2Chk() {
		return dt2Chk;
	}
	public void setDt2Chk(String dt2Chk) {
		this.dt2Chk = dt2Chk;
	}
	public String getDt2Tp() {
		return dt2Tp;
	}
	public void setDt2Tp(String dt2Tp) {
		this.dt2Tp = dt2Tp;
	}
	public String getDt2Fm() {
		return dt2Fm;
	}
	public void setDt2Fm(String dt2Fm) {
		this.dt2Fm = dt2Fm;
	}
	public String getDt2To() {
		return dt2To;
	}
	public void setDt2To(String dt2To) {
		this.dt2To = dt2To;
	}
	public String getShftId() {
		return shftId;
	}
	public void setShftId(String shftId) {
		this.shftId = shftId;
	}
	public String getUnitDec() {
		return unitDec;
	}
	public void setUnitDec(String unitDec) {
		this.unitDec = unitDec;
	}
	public String getUnitTit() {
		return unitTit;
	}
	public void setUnitTit(String unitTit) {
		this.unitTit = unitTit;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public String getUnitUomNm() {
		return unitUomNm;
	}
	public void setUnitUomNm(String unitUomNm) {
		this.unitUomNm = unitUomNm;
	}
	public String getUnit1Chk() {
		return unit1Chk;
	}
	public void setUnit1Chk(String unit1Chk) {
		this.unit1Chk = unit1Chk;
	}
	public String getUnit1Dec() {
		return unit1Dec;
	}
	public void setUnit1Dec(String unit1Dec) {
		this.unit1Dec = unit1Dec;
	}
	public String getUnit1Tit() {
		return unit1Tit;
	}
	public void setUnit1Tit(String unit1Tit) {
		this.unit1Tit = unit1Tit;
	}
	public String getUnit1() {
		return unit1;
	}
	public void setUnit1(String unit1) {
		this.unit1 = unit1;
	}
	public String getUnit1UomNm() {
		return unit1UomNm;
	}
	public void setUnit1UomNm(String unit1UomNm) {
		this.unit1UomNm = unit1UomNm;
	}
	public String getUnit2Chk() {
		return unit2Chk;
	}
	public void setUnit2Chk(String unit2Chk) {
		this.unit2Chk = unit2Chk;
	}
	public String getUnit2Dec() {
		return unit2Dec;
	}
	public void setUnit2Dec(String unit2Dec) {
		this.unit2Dec = unit2Dec;
	}
	public String getUnit2Tit() {
		return unit2Tit;
	}
	public void setUnit2Tit(String unit2Tit) {
		this.unit2Tit = unit2Tit;
	}
	public String getUnit2() {
		return unit2;
	}
	public void setUnit2(String unit2) {
		this.unit2 = unit2;
	}
	public String getUnit2UomNm() {
		return unit2UomNm;
	}
	public void setUnit2UomNm(String unit2UomNm) {
		this.unit2UomNm = unit2UomNm;
	}
	public String getLocChk() {
		return locChk;
	}
	public void setLocChk(String locChk) {
		this.locChk = locChk;
	}
	public String getRmkChk() {
		return rmkChk;
	}
	public void setRmkChk(String rmkChk) {
		this.rmkChk = rmkChk;
	}
	public String getCmdtyChk() {
		return cmdtyChk;
	}
	public void setCmdtyChk(String cmdtyChk) {
		this.cmdtyChk = cmdtyChk;
	}
	public String getDocumentChk() {
		return documentChk;
	}
	public void setDocumentChk(String documentChk) {
		this.documentChk = documentChk;
	}
	public String getUnitChk() {
		return unitChk;
	}
	public void setUnitChk(String unitChk) {
		this.unitChk = unitChk;
	}
	public String getDocumentTp() {
		return documentTp;
	}
	public void setDocumentTp(String documentTp) {
		this.documentTp = documentTp;
	}
	public String getDocumentNm() {
		return documentNm;
	}
	public void setDocumentNm(String documentNm) {
		this.documentNm = documentNm;
	}
	public String getPtnrTypes() {
		return ptnrTypes;
	}
	public void setPtnrTypes(String ptnrTypes) {
		this.ptnrTypes = ptnrTypes;
	}
	public String getVslCd() {
		return vslCd;
	}
	public void setVslCd(String vslCd) {
		this.vslCd = vslCd;
	}
	public String getCallSeq() {
		return callSeq;
	}
	public void setCallSeq(String callSeq) {
		this.callSeq = callSeq;
	}
	public String getCallYear() {
		return callYear;
	}
	public void setCallYear(String callYear) {
		this.callYear = callYear;
	}
	public String getPkgTpCd() {
		return pkgTpCd;
	}
	public void setPkgTpCd(String pkgTpCd) {
		this.pkgTpCd = pkgTpCd;
	}
	public String getOpeClassCd() {
		return opeClassCd;
	}
	public void setOpeClassCd(String opeClassCd) {
		this.opeClassCd = opeClassCd;
	}
	public String getAcptYN() {
		return acptYN;
	}
	public void setAcptYN(String acptYN) {
		this.acptYN = acptYN;
	}
	public String getRoleCd() {
		return roleCd;
	}
	public void setRoleCd(String roleCd) {
		this.roleCd = roleCd;
	}
	public String getsRoleCd() {
		return sRoleCd;
	}
	public void setsRoleCd(String sRoleCd) {
		this.sRoleCd = sRoleCd;
	}
	public String getEmpId() {
		return empId;
	}
	public void setEmpId(String empId) {
		this.empId = empId;
	}
	public String getEmpNm() {
		return empNm;
	}
	public void setEmpNm(String empNm) {
		this.empNm = empNm;
	}
	public String getWbTransactionNo() {
		return wbTransactionNo;
	}
	public void setWbTransactionNo(String wbTransactionNo) {
		this.wbTransactionNo = wbTransactionNo;
	}
	public String getSdoNo() {
		return sdoNo;
	}
	public void setSdoNo(String sdoNo) {
		this.sdoNo = sdoNo;
	}
	public String getTrfTpCdNm() {
		return trfTpCdNm;
	}
	public void setTrfTpCdNm(String trfTpCdNm) {
		this.trfTpCdNm = trfTpCdNm;
	}
	public String getStdPrc() {
		return stdPrc;
	}
	public void setStdPrc(String stdPrc) {
		this.stdPrc = stdPrc;
	}
	public String getGstTpCd() {
		return gstTpCd;
	}
	public void setGstTpCd(String gstTpCd) {
		this.gstTpCd = gstTpCd;
	}
	public String getGstRate() {
		return gstRate;
	}
	public void setGstRate(String gstRate) {
		this.gstRate = gstRate;
	}
	public String getErpCostCntCd() {
		return erpCostCntCd;
	}
	public void setErpCostCntCd(String erpCostCntCd) {
		this.erpCostCntCd = erpCostCntCd;
	}
	public String getTowedWgt() {
		return towedWgt;
	}
	public void setTowedWgt(String towedWgt) {
		this.towedWgt = towedWgt;
	}
	public String getGateTicketNo() {
		return gateTicketNo;
	}
	public void setGateTicketNo(String gateTicketNo) {
		this.gateTicketNo = gateTicketNo;
	}
	public String getCgInOutCd() {
		return cgInOutCd;
	}
	public void setCgInOutCd(String cgInOutCd) {
		this.cgInOutCd = cgInOutCd;
	}
	public String getRePkgTpCd() {
		return rePkgTpCd;
	}
	public void setRePkgTpCd(String rePkgTpCd) {
		this.rePkgTpCd = rePkgTpCd;
	}
	public String getAgChkInTime() {
		return agChkInTime;
	}
	public void setAgChkInTime(String agChkInTime) {
		this.agChkInTime = agChkInTime;
	}
	public String getAgGateInDt() {
		return agGateInDt;
	}
	public void setAgGateInDt(String agGateInDt) {
		this.agGateInDt = agGateInDt;
	}
	public String getFirstWgt() {
		return firstWgt;
	}
	public void setFirstWgt(String firstWgt) {
		this.firstWgt = firstWgt;
	}
	public String getMinRate() {
		return minRate;
	}
	public void setMinRate(String minRate) {
		this.minRate = minRate;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
	public String getEta() {
		return eta;
	}
	public void setEta(String eta) {
		this.eta = eta;
	}
	public String getEtb() {
		return etb;
	}
	public void setEtb(String etb) {
		this.etb = etb;
	}
	public String getEtd() {
		return etd;
	}
	public void setEtd(String etd) {
		this.etd = etd;
	}
	public String getVoyage() {
		return voyage;
	}
	public void setVoyage(String voyage) {
		this.voyage = voyage;
	}
	public String getVslOperator() {
		return vslOperator;
	}
	public void setVslOperator(String vslOperator) {
		this.vslOperator = vslOperator;
	}
	public String getVslTp() {
		return vslTp;
	}
	public void setVslTp(String vslTp) {
		this.vslTp = vslTp;
	}
	public String getVslTpNm() {
		return vslTpNm;
	}
	public void setVslTpNm(String vslTpNm) {
		this.vslTpNm = vslTpNm;
	}
	public String getAtw() {
		return atw;
	}
	public void setAtw(String atw) {
		this.atw = atw;
	}
	public String getAtc() {
		return atc;
	}
	public void setAtc(String atc) {
		this.atc = atc;
	}
	public String getContrator() {
		return contrator;
	}
	public void setContrator(String contrator) {
		this.contrator = contrator;
	}
	public String getImdg() {
		return imdg;
	}
	public void setImdg(String imdg) {
		this.imdg = imdg;
	}
}
