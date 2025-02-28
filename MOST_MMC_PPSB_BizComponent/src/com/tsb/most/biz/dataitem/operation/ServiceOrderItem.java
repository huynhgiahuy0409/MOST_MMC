package com.tsb.most.biz.dataitem.operation;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

public class ServiceOrderItem extends DataItem {
	
	private String category1;
	private String category1Nm;
	private String category2;
	private String category2Nm;
	private String category3;
	private String category3Nm;
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
	private String unitUomNm;
	private String unitDec;
	private String unit1Chk;
	private String unit1Tit;
	private String unit1Uom;
	private String unit1UomNm;
	private String unit1Dec;
	private String unit2Chk;
	private String unit2Tit;
	private String unit2Uom;
	private String unit2UomNm;
	private String unit2Dec;
	private String payTpCd;
	private String payTpNm;
	private String prcTpCd;
	private String prcTpNm;
	private String prcTpDesc;
	private String locChk;
	private String rmkChk;
	private String cmdtyChk;
    private String eqDivCd;
    private String eqDivCdNm;
    
	//Detail (Request)
	private String odrNo;
	private String vslCallId;
	private String vslNm;
	private String statCd;
	private String statNm;
	private String payer;
	private String payerNm;
	private String svcDtFm;
	private String svcDtTo;
	private String dt1Fm;
	private String dt1To;
	private String dt2Fm;
	private String dt2To;
	private String shftId;
	private String shftNm;
	private double unit;
	private double unit1;
	private double unit2;
    private String capaCd;
    private String capaDescr;
	private String loc;
	private String locId;
	private String cmdtyCd;

	private String cmdtyNm;
	private String comCmdtyCd;
	private String comCmdtyNm;
	private String reqRmk;
    private String rmk;
    private String reqDocNo;
    private String reqUnitNo;

	//Detail (Completion)
    private String comChk;
    private String comSvcDtFm;
    private String comSvcDtTo;
    private String comDt1Fm;
    private String comDt1To;
    private String comDt2Fm;
    private String comDt2To;
    private String comShftId;
    private String comShftNm;
    private double comUnit;
    private double comUnit1;
    private double comUnit2;
    private String comCapaCd;
    private String comCapaDescr;
    private String comLoc;
    private String comRmk;
    private String comDocNo;
    private String comUnitNo;

	// process input
    private String sumitBy;			// RequestBy
    private String sumitDt;			// Requested Date
    private String apprvBy;			// ApproveBy
    private String apprvDt;			// Approved Date
    private String rejBy;			// Reject By
    private String rejDt;			// Rejected Date
    private String cnclBy;			// Cancel By
    private String cnclDt;			// Canceled Date
    private String comBy;			// Cancel By
    private String comDt;			// Canceled Date
    private String ownerYn;			// owner
    private String viewType;
    private String userRole;
    private String comLocId;
    private String cd;
    private String cdNm;
    private String blSNNo;
    private String opeClassCd;
    
    private String callSeq;
    private String callYear;
    private String vslCd;
    private String scn;
    
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
    
    public String getVslCd() {
		return vslCd;
	}
    
    public void setVslCd(String vslCd) {
		this.vslCd = vslCd;
	}


    private ArrayList<ServiceOrderItem> blSNList;
    
    
    public ArrayList<ServiceOrderItem> getBlSNList() {
		return blSNList;
	}

	public void setBlSNList(ArrayList<ServiceOrderItem> blSNList) {
		this.blSNList = blSNList;
	}

	public String getReqDocNo() {
		return reqDocNo;
	}

	public void setReqDocNo(String reqDocNo) {
		this.reqDocNo = reqDocNo;
	}

	public String getReqUnitNo() {
		return reqUnitNo;
	}

	public void setReqUnitNo(String reqUnitNo) {
		this.reqUnitNo = reqUnitNo;
	}

	public String getComDocNo() {
		return comDocNo;
	}

	public void setComDocNo(String comDocNo) {
		this.comDocNo = comDocNo;
	}

	public String getComUnitNo() {
		return comUnitNo;
	}

	public void setComUnitNo(String comUnitNo) {
		this.comUnitNo = comUnitNo;
	}

	public String getOpeClassCd() {
		return opeClassCd;
	}

	public void setOpeClassCd(String opeClassCd) {
		this.opeClassCd = opeClassCd;
	}

	public String getBlSNNo() {
		return blSNNo;
	}

	public void setBlSNNo(String blSNNo) {
		this.blSNNo = blSNNo;
	}

	public String getCd() {
		return cd;
	}

	public void setCd(String cd) {
		this.cd = cd;
	}

	public String getCdNm() {
		return cdNm;
	}

	public void setCdNm(String cdNm) {
		this.cdNm = cdNm;
	}

	private List<ServiceOrderItem> processItemList;

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

    public String getUnitUomNm() {
        return unitUomNm;
    }

    public void setUnitUomNm(String unitUomNm) {
        this.unitUomNm = unitUomNm;
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

    public String getUnit1UomNm() {
        return unit1UomNm;
    }

    public void setUnit1UomNm(String unit1UomNm) {
        this.unit1UomNm = unit1UomNm;
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

    public String getUnit2UomNm() {
        return unit2UomNm;
    }

    public void setUnit2UomNm(String unit2UomNm) {
        this.unit2UomNm = unit2UomNm;
    }

    public String getUnit2Dec() {
        return unit2Dec;
    }

    public void setUnit2Dec(String unit2Dec) {
        this.unit2Dec = unit2Dec;
    }

    public String getPayTpCd() {
        return payTpCd;
    }

    public void setPayTpCd(String payTpCd) {
        this.payTpCd = payTpCd;
    }

    public String getPayTpNm() {
        return payTpNm;
    }

    public void setPayTpNm(String payTpNm) {
        this.payTpNm = payTpNm;
    }

    public String getPrcTpCd() {
        return prcTpCd;
    }

    public void setPrcTpCd(String prcTpCd) {
        this.prcTpCd = prcTpCd;
    }

    public String getPrcTpNm() {
        return prcTpNm;
    }

    public void setPrcTpNm(String prcTpNm) {
        this.prcTpNm = prcTpNm;
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

    public String getOdrNo() {
        return odrNo;
    }

    public void setOdrNo(String odrNo) {
        this.odrNo = odrNo;
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

    public String getStatCd() {
        return statCd;
    }

    public void setStatCd(String statCd) {
        this.statCd = statCd;
    }

    public String getStatNm() {
        return statNm;
    }

    public void setStatNm(String statNm) {
        this.statNm = statNm;
    }

    public String getPayer() {
        return payer;
    }

    public void setPayer(String payer) {
        this.payer = payer;
    }

    public String getPayerNm() {
        return payerNm;
    }

    public void setPayerNm(String payerNm) {
        this.payerNm = payerNm;
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

    public String getShftNm() {
        return shftNm;
    }

    public void setShftNm(String shftNm) {
        this.shftNm = shftNm;
    }

    public double getUnit() {
        return unit;
    }

    public void setUnit(double unit) {
        this.unit = unit;
    }

    public double getUnit1() {
        return unit1;
    }

    public void setUnit1(double unit1) {
        this.unit1 = unit1;
    }

    public double getUnit2() {
        return unit2;
    }

    public void setUnit2(double unit2) {
        this.unit2 = unit2;
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

    public String getLoc() {
        return loc;
    }

    public void setLoc(String loc) {
        this.loc = loc;
    }

    public String getLocId() {
        return locId;
    }

    public void setLocId(String locId) {
        this.locId = locId;
    }

    public String getCmdtyCd() {
        return cmdtyCd;
    }

    public void setCmdtyCd(String cmdtyCd) {
        this.cmdtyCd = cmdtyCd;
    }

    public String getCmdtyNm() {
        return cmdtyNm;
    }

    public void setCmdtyNm(String cmdtyNm) {
        this.cmdtyNm = cmdtyNm;
    }

    public String getComCmdtyCd() {
        return comCmdtyCd;
    }

    public void setComCmdtyCd(String comCmdtyCd) {
        this.comCmdtyCd = comCmdtyCd;
    }

    public String getComCmdtyNm() {
        return comCmdtyNm;
    }

    public void setComCmdtyNm(String comCmdtyNm) {
        this.comCmdtyNm = comCmdtyNm;
    }

    public String getReqRmk() {
        return reqRmk;
    }

    public void setReqRmk(String reqRmk) {
        this.reqRmk = reqRmk;
    }

    public String getRmk() {
        return rmk;
    }

    public void setRmk(String rmk) {
        this.rmk = rmk;
    }

    public String getComChk() {
        return comChk;
    }

    public void setComChk(String comChk) {
        this.comChk = comChk;
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

    public String getComShftNm() {
        return comShftNm;
    }

    public void setComShftNm(String comShftNm) {
        this.comShftNm = comShftNm;
    }

    public double getComUnit() {
        return comUnit;
    }

    public void setComUnit(double comUnit) {
        this.comUnit = comUnit;
    }

    public double getComUnit1() {
        return comUnit1;
    }

    public void setComUnit1(double comUnit1) {
        this.comUnit1 = comUnit1;
    }

    public double getComUnit2() {
        return comUnit2;
    }

    public void setComUnit2(double comUnit2) {
        this.comUnit2 = comUnit2;
    }

    public String getComCapaCd() {
        return comCapaCd;
    }

    public void setComCapaCd(String comCapaCd) {
        this.comCapaCd = comCapaCd;
    }

    public String getComCapaDescr() {
        return comCapaDescr;
    }

    public void setComCapaDescr(String comCapaDescr) {
        this.comCapaDescr = comCapaDescr;
    }

    public String getComLoc() {
        return comLoc;
    }

    public void setComLoc(String comLoc) {
        this.comLoc = comLoc;
    }

    public String getComRmk() {
        return comRmk;
    }

    public void setComRmk(String comRmk) {
        this.comRmk = comRmk;
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

    public String getOwnerYn() {
        return ownerYn;
    }

    public void setOwnerYn(String ownerYn) {
        this.ownerYn = ownerYn;
    }

    public String getViewType() {
        return viewType;
    }

    public void setViewType(String viewType) {
        this.viewType = viewType;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public String getComLocId() {
        return comLocId;
    }

    public void setComLocId(String comLocId) {
        this.comLocId = comLocId;
    }

    public List<ServiceOrderItem> getProcessItemList() {
        return processItemList;
    }

    public void setProcessItemList(List<ServiceOrderItem> processItemList) {
        this.processItemList = processItemList;
    }

	public String getScn() {
		return scn;
	}

	public void setScn(String scn) {
		this.scn = scn;
	}
}
