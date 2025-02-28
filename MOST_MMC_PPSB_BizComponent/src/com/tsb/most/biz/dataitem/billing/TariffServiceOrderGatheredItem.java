package com.tsb.most.biz.dataitem.billing;

import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;

public class TariffServiceOrderGatheredItem extends DataItem {

	private static final long serialVersionUID = 2954120267704894296L;

	private String searchType;
	private String odrNo;
	private String statCd;
	private String sumitBy;
	private String sumitDt;
	private String apprvBy;
	private String apprvDt;
	private String rejBy;
	private String rejDt;
	private String cnclBy;
	private String cnclDt;
	private String comBy;
	private String comDt;
	private String payer;
	private String category1;
	private String category2;
	private String category3;
	private String svcDtFmt;
	private String svcDtTp;
	private String dt1Chk;
	private String dt1Tit;
	private String dt1Fmt;
	private String dt1Tp;
	private String dt2Chk;
	private String dt2Tit;
	private String dt2Fmt;
	private String dt2Tp;
	private String shftChk;
	private String unitTit;
	private String unitUom;
	private String unitDec;
	private String unit1Chk;
	private String unit1Tit;
	private String unit1Uom;
	private String unit1Dec;
	private String unit2Chk;
	private String unit2Tit;
	private String unit2Uom;
	private String unit2Dec;
	private String eqDivCd;
	private String capaCd;
	private String payTpCd;
	private String prcTpCd;
	private String prcTpDesc;
	private String locChk;
	private String rmkChk;
	private String cmdtyChk;
	private String svcDtFm;
	private String svcDtTo;
	private String dt1Fm;
	private String dt1To;
	private String dt2Fm;
	private String dt2To;
	private String shftId;
	private String unit;
	private String unit1;
	private String unit2;
	private String locId;
	private String reqRmk;
	private String comChk;
	private String cmdtyCd;						
	private String capaDescr;
	private String loc;
	private String comSvcDtFm;
	private String comSvcDtTo;
	private String comDt1Fm;
	private String comDt1To;
	private String comDt2Fm;
	private String comDt2To;
	private String comShftId;		
	private String comUnit;
	private String comUnit1;
	private String comUnit2;
	private String comCapaCd;
	private String comLocId;
	private String comRmk;
	private String rmk;
	private String reqDocNo;
	private String comDocNo;
	private String reqUnitNo;
	private String comUnitNo;
	
	private String vslCallId;
	private String opeClassCd;
	private String reqMfDocNo;
	private String reqCgNo;
	private String compMfDocNo;
	private String compCgNo;
	private String compUnitNo;
	private String serviceCd;
	private String trfCd;
	private String subTrfCd;
	private String trfTpCd;
	private String descr;
	private String ivUnit1;
	private String ivUnit2;
	private String ivUnit3;
	private String reqUnit1;
	private String reqUnit2;
	private String reqUnit3;
	private String compUnit1;
	private String compUnit2;
	private String compUnit3;
	private String trfRegNo;
	private String aplyYMD;
	private String exprYMD;
	private String unitPrc;
	private String minVal1;
	private String minVal2;
	private String minVal3;
	private String maxAmt;
	private String erpCostCent;
	private String billTpCd;
	private String ivNo;
	private String ivStatCd;
	private String scrId;
	private String ivPrfx;
	private String refNo4;
	private String parentGatherNo;
	private String payerType;
	
	private String aplyAmt;
	
	private DataItemList trfBucketList = null; 
	private DataItemList invoiceList = null;
	
	//MMC - Settlement
	private String odrSeq;
	private String gstTpCd;
	private String gstRate;
	private String payerTpCd;
	
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	public String getOdrNo() {
		return odrNo;
	}
	public void setOdrNo(String odrNo) {
		this.odrNo = odrNo;
	}
	public String getStatCd() {
		return statCd;
	}
	public void setStatCd(String statCd) {
		this.statCd = statCd;
	}
	public String getSumitBy() {
		return sumitBy;
	}
	public void setSumitBy(String sumitBy) {
		this.sumitBy = sumitBy;
	}
	public String getSumitDt() {
		return sumitDt;
	}
	public void setSumitDt(String sumitDt) {
		this.sumitDt = sumitDt;
	}
	public String getApprvBy() {
		return apprvBy;
	}
	public void setApprvBy(String apprvBy) {
		this.apprvBy = apprvBy;
	}
	public String getApprvDt() {
		return apprvDt;
	}
	public void setApprvDt(String apprvDt) {
		this.apprvDt = apprvDt;
	}
	public String getRejBy() {
		return rejBy;
	}
	public void setRejBy(String rejBy) {
		this.rejBy = rejBy;
	}
	public String getRejDt() {
		return rejDt;
	}
	public void setRejDt(String rejDt) {
		this.rejDt = rejDt;
	}
	public String getCnclBy() {
		return cnclBy;
	}
	public void setCnclBy(String cnclBy) {
		this.cnclBy = cnclBy;
	}
	public String getCnclDt() {
		return cnclDt;
	}
	public void setCnclDt(String cnclDt) {
		this.cnclDt = cnclDt;
	}
	public String getComBy() {
		return comBy;
	}
	public void setComBy(String comBy) {
		this.comBy = comBy;
	}
	public String getComDt() {
		return comDt;
	}
	public void setComDt(String comDt) {
		this.comDt = comDt;
	}
	public String getPayer() {
		return payer;
	}
	public void setPayer(String payer) {
		this.payer = payer;
	}
	public String getCategory1() {
		return category1;
	}
	public void setCategory1(String category1) {
		this.category1 = category1;
	}
	public String getCategory2() {
		return category2;
	}
	public void setCategory2(String category2) {
		this.category2 = category2;
	}
	public String getCategory3() {
		return category3;
	}
	public void setCategory3(String category3) {
		this.category3 = category3;
	}
	public String getSvcDtFmt() {
		return svcDtFmt;
	}
	public void setSvcDtFmt(String svcDtFmt) {
		this.svcDtFmt = svcDtFmt;
	}
	public String getSvcDtTp() {
		return svcDtTp;
	}
	public void setSvcDtTp(String svcDtTp) {
		this.svcDtTp = svcDtTp;
	}
	public String getDt1Chk() {
		return dt1Chk;
	}
	public void setDt1Chk(String dt1Chk) {
		this.dt1Chk = dt1Chk;
	}
	public String getDt1Tit() {
		return dt1Tit;
	}
	public void setDt1Tit(String dt1Tit) {
		this.dt1Tit = dt1Tit;
	}
	public String getDt1Fmt() {
		return dt1Fmt;
	}
	public void setDt1Fmt(String dt1Fmt) {
		this.dt1Fmt = dt1Fmt;
	}
	public String getDt1Tp() {
		return dt1Tp;
	}
	public void setDt1Tp(String dt1Tp) {
		this.dt1Tp = dt1Tp;
	}
	public String getDt2Chk() {
		return dt2Chk;
	}
	public void setDt2Chk(String dt2Chk) {
		this.dt2Chk = dt2Chk;
	}
	public String getDt2Tit() {
		return dt2Tit;
	}
	public void setDt2Tit(String dt2Tit) {
		this.dt2Tit = dt2Tit;
	}
	public String getDt2Fmt() {
		return dt2Fmt;
	}
	public void setDt2Fmt(String dt2Fmt) {
		this.dt2Fmt = dt2Fmt;
	}
	public String getDt2Tp() {
		return dt2Tp;
	}
	public void setDt2Tp(String dt2Tp) {
		this.dt2Tp = dt2Tp;
	}
	public String getShftChk() {
		return shftChk;
	}
	public void setShftChk(String shftChk) {
		this.shftChk = shftChk;
	}
	public String getUnitTit() {
		return unitTit;
	}
	public void setUnitTit(String unitTit) {
		this.unitTit = unitTit;
	}
	public String getUnitUom() {
		return unitUom;
	}
	public void setUnitUom(String unitUom) {
		this.unitUom = unitUom;
	}
	public String getUnitDec() {
		return unitDec;
	}
	public void setUnitDec(String unitDec) {
		this.unitDec = unitDec;
	}
	public String getUnit1Chk() {
		return unit1Chk;
	}
	public void setUnit1Chk(String unit1Chk) {
		this.unit1Chk = unit1Chk;
	}
	public String getUnit1Tit() {
		return unit1Tit;
	}
	public void setUnit1Tit(String unit1Tit) {
		this.unit1Tit = unit1Tit;
	}
	public String getUnit1Uom() {
		return unit1Uom;
	}
	public void setUnit1Uom(String unit1Uom) {
		this.unit1Uom = unit1Uom;
	}
	public String getUnit1Dec() {
		return unit1Dec;
	}
	public void setUnit1Dec(String unit1Dec) {
		this.unit1Dec = unit1Dec;
	}
	public String getUnit2Chk() {
		return unit2Chk;
	}
	public void setUnit2Chk(String unit2Chk) {
		this.unit2Chk = unit2Chk;
	}
	public String getUnit2Tit() {
		return unit2Tit;
	}
	public void setUnit2Tit(String unit2Tit) {
		this.unit2Tit = unit2Tit;
	}
	public String getUnit2Uom() {
		return unit2Uom;
	}
	public void setUnit2Uom(String unit2Uom) {
		this.unit2Uom = unit2Uom;
	}
	public String getUnit2Dec() {
		return unit2Dec;
	}
	public void setUnit2Dec(String unit2Dec) {
		this.unit2Dec = unit2Dec;
	}
	public String getEqDivCd() {
		return eqDivCd;
	}
	public void setEqDivCd(String eqDivCd) {
		this.eqDivCd = eqDivCd;
	}
	public String getCapaCd() {
		return capaCd;
	}
	public void setCapaCd(String capaCd) {
		this.capaCd = capaCd;
	}
	public String getPayTpCd() {
		return payTpCd;
	}
	public void setPayTpCd(String payTpCd) {
		this.payTpCd = payTpCd;
	}
	public String getPrcTpCd() {
		return prcTpCd;
	}
	public void setPrcTpCd(String prcTpCd) {
		this.prcTpCd = prcTpCd;
	}
	public String getPrcTpDesc() {
		return prcTpDesc;
	}
	public void setPrcTpDesc(String prcTpDesc) {
		this.prcTpDesc = prcTpDesc;
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
	public String getSvcDtFm() {
		return svcDtFm;
	}
	public void setSvcDtFm(String svcDtFm) {
		this.svcDtFm = svcDtFm;
	}
	public String getSvcDtTo() {
		return svcDtTo;
	}
	public void setSvcDtTo(String svcDtTo) {
		this.svcDtTo = svcDtTo;
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
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public String getUnit1() {
		return unit1;
	}
	public void setUnit1(String unit1) {
		this.unit1 = unit1;
	}
	public String getUnit2() {
		return unit2;
	}
	public void setUnit2(String unit2) {
		this.unit2 = unit2;
	}
	public String getLocId() {
		return locId;
	}
	public void setLocId(String locId) {
		this.locId = locId;
	}
	public String getReqRmk() {
		return reqRmk;
	}
	public void setReqRmk(String reqRmk) {
		this.reqRmk = reqRmk;
	}
	public String getComChk() {
		return comChk;
	}
	public void setComChk(String comChk) {
		this.comChk = comChk;
	}
	public String getCmdtyCd() {
		return cmdtyCd;
	}
	public void setCmdtyCd(String cmdtyCd) {
		this.cmdtyCd = cmdtyCd;
	}
	public String getCapaDescr() {
		return capaDescr;
	}
	public void setCapaDescr(String capaDescr) {
		this.capaDescr = capaDescr;
	}
	public String getLoc() {
		return loc;
	}
	public void setLoc(String loc) {
		this.loc = loc;
	}
	public String getComSvcDtFm() {
		return comSvcDtFm;
	}
	public void setComSvcDtFm(String comSvcDtFm) {
		this.comSvcDtFm = comSvcDtFm;
	}
	public String getComSvcDtTo() {
		return comSvcDtTo;
	}
	public void setComSvcDtTo(String comSvcDtTo) {
		this.comSvcDtTo = comSvcDtTo;
	}
	public String getComDt1Fm() {
		return comDt1Fm;
	}
	public void setComDt1Fm(String comDt1Fm) {
		this.comDt1Fm = comDt1Fm;
	}
	public String getComDt1To() {
		return comDt1To;
	}
	public void setComDt1To(String comDt1To) {
		this.comDt1To = comDt1To;
	}
	public String getComDt2Fm() {
		return comDt2Fm;
	}
	public void setComDt2Fm(String comDt2Fm) {
		this.comDt2Fm = comDt2Fm;
	}
	public String getComDt2To() {
		return comDt2To;
	}
	public void setComDt2To(String comDt2To) {
		this.comDt2To = comDt2To;
	}
	public String getComShftId() {
		return comShftId;
	}
	public void setComShftId(String comShftId) {
		this.comShftId = comShftId;
	}
	public String getComUnit() {
		return comUnit;
	}
	public void setComUnit(String comUnit) {
		this.comUnit = comUnit;
	}
	public String getComUnit1() {
		return comUnit1;
	}
	public void setComUnit1(String comUnit1) {
		this.comUnit1 = comUnit1;
	}
	public String getComUnit2() {
		return comUnit2;
	}
	public void setComUnit2(String comUnit2) {
		this.comUnit2 = comUnit2;
	}
	public String getComCapaCd() {
		return comCapaCd;
	}
	public void setComCapaCd(String comCapaCd) {
		this.comCapaCd = comCapaCd;
	}
	public String getComLocId() {
		return comLocId;
	}
	public void setComLocId(String comLocId) {
		this.comLocId = comLocId;
	}
	public String getComRmk() {
		return comRmk;
	}
	public void setComRmk(String comRmk) {
		this.comRmk = comRmk;
	}
	public String getRmk() {
		return rmk;
	}
	public void setRmk(String rmk) {
		this.rmk = rmk;
	}
	public String getReqDocNo() {
		return reqDocNo;
	}
	public void setReqDocNo(String reqDocNo) {
		this.reqDocNo = reqDocNo;
	}
	public String getComDocNo() {
		return comDocNo;
	}
	public void setComDocNo(String comDocNo) {
		this.comDocNo = comDocNo;
	}
	public String getReqUnitNo() {
		return reqUnitNo;
	}
	public void setReqUnitNo(String reqUnitNo) {
		this.reqUnitNo = reqUnitNo;
	}
	public String getComUnitNo() {
		return comUnitNo;
	}
	public void setComUnitNo(String comUnitNo) {
		this.comUnitNo = comUnitNo;
	}
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getOpeClassCd() {
		return opeClassCd;
	}
	public void setOpeClassCd(String opeClassCd) {
		this.opeClassCd = opeClassCd;
	}
	public String getReqMfDocNo() {
		return reqMfDocNo;
	}
	public void setReqMfDocNo(String reqMfDocNo) {
		this.reqMfDocNo = reqMfDocNo;
	}
	public String getReqCgNo() {
		return reqCgNo;
	}
	public void setReqCgNo(String reqCgNo) {
		this.reqCgNo = reqCgNo;
	}
	public String getCompMfDocNo() {
		return compMfDocNo;
	}
	public void setCompMfDocNo(String compMfDocNo) {
		this.compMfDocNo = compMfDocNo;
	}
	public String getCompCgNo() {
		return compCgNo;
	}
	public void setCompCgNo(String compCgNo) {
		this.compCgNo = compCgNo;
	}
	public String getCompUnitNo() {
		return compUnitNo;
	}
	public void setCompUnitNo(String compUnitNo) {
		this.compUnitNo = compUnitNo;
	}
	public String getServiceCd() {
		return serviceCd;
	}
	public void setServiceCd(String serviceCd) {
		this.serviceCd = serviceCd;
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
	public String getReqUnit1() {
		return reqUnit1;
	}
	public void setReqUnit1(String reqUnit1) {
		this.reqUnit1 = reqUnit1;
	}
	public String getReqUnit2() {
		return reqUnit2;
	}
	public void setReqUnit2(String reqUnit2) {
		this.reqUnit2 = reqUnit2;
	}
	public String getReqUnit3() {
		return reqUnit3;
	}
	public void setReqUnit3(String reqUnit3) {
		this.reqUnit3 = reqUnit3;
	}
	public String getCompUnit1() {
		return compUnit1;
	}
	public void setCompUnit1(String compUnit1) {
		this.compUnit1 = compUnit1;
	}
	public String getCompUnit2() {
		return compUnit2;
	}
	public void setCompUnit2(String compUnit2) {
		this.compUnit2 = compUnit2;
	}
	public String getCompUnit3() {
		return compUnit3;
	}
	public void setCompUnit3(String compUnit3) {
		this.compUnit3 = compUnit3;
	}
	public String getTrfRegNo() {
		return trfRegNo;
	}
	public void setTrfRegNo(String trfRegNo) {
		this.trfRegNo = trfRegNo;
	}
	public String getAplyYMD() {
		return aplyYMD;
	}
	public void setAplyYMD(String aplyYMD) {
		this.aplyYMD = aplyYMD;
	}
	public String getExprYMD() {
		return exprYMD;
	}
	public void setExprYMD(String exprYMD) {
		this.exprYMD = exprYMD;
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
	public String getMaxAmt() {
		return maxAmt;
	}
	public void setMaxAmt(String maxAmt) {
		this.maxAmt = maxAmt;
	}
	public String getErpCostCent() {
		return erpCostCent;
	}
	public void setErpCostCent(String erpCostCent) {
		this.erpCostCent = erpCostCent;
	}
	public String getBillTpCd() {
		return billTpCd;
	}
	public void setBillTpCd(String billTpCd) {
		this.billTpCd = billTpCd;
	}
	public String getIvNo() {
		return ivNo;
	}
	public void setIvNo(String ivNo) {
		this.ivNo = ivNo;
	}
	public String getIvStatCd() {
		return ivStatCd;
	}
	public void setIvStatCd(String ivStatCd) {
		this.ivStatCd = ivStatCd;
	}
	public String getScrId() {
		return scrId;
	}
	public void setScrId(String scrId) {
		this.scrId = scrId;
	}
	public String getIvPrfx() {
		return ivPrfx;
	}
	public void setIvPrfx(String ivPrfx) {
		this.ivPrfx = ivPrfx;
	}
	public String getRefNo4() {
		return refNo4;
	}
	public void setRefNo4(String refNo4) {
		this.refNo4 = refNo4;
	}
	public String getParentGatherNo() {
		return parentGatherNo;
	}
	public void setParentGatherNo(String parentGatherNo) {
		this.parentGatherNo = parentGatherNo;
	}
	public String getPayerType() {
		return payerType;
	}
	public void setPayerType(String payerType) {
		this.payerType = payerType;
	}
	public String getAplyAmt() {
		return aplyAmt;
	}
	public void setAplyAmt(String aplyAmt) {
		this.aplyAmt = aplyAmt;
	}
	public DataItemList getTrfBucketList() {
		return trfBucketList;
	}
	public void setTrfBucketList(DataItemList trfBucketList) {
		this.trfBucketList = trfBucketList;
	}
	public DataItemList getInvoiceList() {
		return invoiceList;
	}
	public void setInvoiceList(DataItemList invoiceList) {
		this.invoiceList = invoiceList;
	}
	public String getOdrSeq() {
		return odrSeq;
	}
	public void setOdrSeq(String odrSeq) {
		this.odrSeq = odrSeq;
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
	public String getPayerTpCd() {
		return payerTpCd;
	}
	public void setPayerTpCd(String payerTpCd) {
		this.payerTpCd = payerTpCd;
	}
	
}
