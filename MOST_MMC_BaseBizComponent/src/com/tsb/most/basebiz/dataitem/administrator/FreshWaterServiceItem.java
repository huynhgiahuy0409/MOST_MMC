package com.tsb.most.basebiz.dataitem.administrator;

import java.util.ArrayList;

import com.tsb.most.framework.dataitem.DataItem;

public class FreshWaterServiceItem extends DataItem{
	private String no;
    private String chk;
    private String docNo;
    private String statCd;
    private String vslCallId;
    private String comp;
	private String sa;
	private String saNm;
//	private double reqAmt;
	private String reqAmt;
//	private double befAmt;
//	private double afrAmt;
	private String befAmt;
	private String afrAmt;
	private String meterNo;
	private String splyStDt;
	private String splyEndDt;
	private String reqBy;
	private String reqDt;
	private String ackDt;
	private String ackBy;
	private String cmpDt;
	private String cmpBy;
	private String cnclDt;
	private String cnclBy;
	private String rejDt;
	private String rejBy;
	private String rmk;
	private String userId;
	private String crudFlag;
	private String totalHrs;
	private String statCdNm;
	private String qtySply;
	//change
	private double unitPrc;
	private double charge;
	private String payAble;
	private String ownerYn;
	private String locId;
	private String atb;
	private String submit;
	private String submitby;
	private String request;
	private String vslNm;
	private String berthloc;
	private String splyReq;
	private String splyEndReq;
	private String callSign;
	private String saType;
	private String cashPayment;
	private String version;
	private String workingStatus;
	private String abc;
	private ArrayList<FreshWaterServiceItem> updateItems;
	
    public String getCashPayment() {
        return cashPayment;
    }
    public void setCashPayment(String cashPayment) {
        this.cashPayment = cashPayment;
    }
    public String getSaType() {
        return saType;
    }
    public void setSaType(String saType) {
        this.saType = saType;
    }
    public String getCallSign() {
        return callSign;
    }
    public void setCallSign(String callSign) {
        this.callSign = callSign;
    }
    /**
     * @return Returns the atb.
     */
    public String getAtb() {
        return atb;
    }
    /**
     * @param atb The atb to set.
     */
    public void setAtb(String atb) {
        this.atb = atb;
    }
    /**
     * @return Returns the berthloc.
     */
    public String getBerthloc() {
        return berthloc;
    }
    /**
     * @param berthloc The berthloc to set.
     */
    public void setBerthloc(String berthloc) {
        this.berthloc = berthloc;
    }
    /**
     * @return Returns the request.
     */
    public String getRequest() {
        return request;
    }
    /**
     * @param request The request to set.
     */
    public void setRequest(String request) {
        this.request = request;
    }
    /**
     * @return Returns the submit.
     */
    public String getSubmit() {
        return submit;
    }
    /**
     * @param submit The submit to set.
     */
    public void setSubmit(String submit) {
        this.submit = submit;
    }
    /**
     * @return Returns the vslNm.
     */
    public String getVslNm() {
        return vslNm;
    }
    /**
     * @param vslNm The vslNm to set.
     */
    public void setVslNm(String vslNm) {
        this.vslNm = vslNm;
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
     * @return Returns the cmpBy.
     */
    public String getCmpBy() {
        return cmpBy;
    }
    /**
     * @param cmpBy The cmpBy to set.
     */
    public void setCmpBy(String cmpBy) {
        this.cmpBy = cmpBy;
    }
    /**
     * @return Returns the cmpDt.
     */
    public String getCmpDt() {
        return cmpDt;
    }
    /**
     * @param cmpDt The cmpDt to set.
     */
    public void setCmpDt(String cmpDt) {
        this.cmpDt = cmpDt;
    }
    /**
     * @return Returns the ownerYn.
     */
    public String getOwnerYn() {
        return ownerYn;
    }
    /**
     * @param ownerYn The ownerYn to set.
     */
    public void setOwnerYn(String ownerYn) {
        this.ownerYn = ownerYn;
    }
    /**
     * @return Returns the ackBy.
     */
    public String getAckBy() {
        return ackBy;
    }
    /**
     * @param ackBy The ackBy to set.
     */
    public void setAckBy(String ackBy) {
        this.ackBy = ackBy;
    }
    /**
     * @return Returns the ackDt.
     */
    public String getAckDt() {
        return ackDt;
    }
    /**
     * @param ackDt The ackDt to set.
     */
    public void setAckDt(String ackDt) {
        this.ackDt = ackDt;
    }
//    /**
//     * @return Returns the afrAmt.
//     */
//    public double getAfrAmt() {
//        return afrAmt;
//    }
//    /**
//     * @param afrAmt The afrAmt to set.
//     */
//    public void setAfrAmt(double afrAmt) {
//        this.afrAmt = afrAmt;
//    }
//    /**
//     * @return Returns the befAmt.
//     */
//    public double getBefAmt() {
//        return befAmt;
//    }
//    /**
//     * @param befAmt The befAmt to set.
//     */
//    public void setBefAmt(double befAmt) {
//        this.befAmt = befAmt;
//    }
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
     * @return Returns the cnclBy.
     */
    public String getCnclBy() {
        return cnclBy;
    }
    /**
     * @param cnclBy The cnclBy to set.
     */
    public void setCnclBy(String cnclBy) {
        this.cnclBy = cnclBy;
    }
    /**
     * @return Returns the cnclDt.
     */
    public String getCnclDt() {
        return cnclDt;
    }
    /**
     * @param cnclDt The cnclDt to set.
     */
    public void setCnclDt(String cnclDt) {
        this.cnclDt = cnclDt;
    }
    /**
     * @return Returns the crudFlag.
     */
    public String getCrudFlag() {
        return crudFlag;
    }
    /**
     * @param crudFlag The crudFlag to set.
     */
    public void setCrudFlag(String crudFlag) {
        this.crudFlag = crudFlag;
    }
    /**
     * @return Returns the docNo.
     */
    public String getDocNo() {
        return docNo;
    }
    /**
     * @param docNo The docNo to set.
     */
    public void setDocNo(String docNo) {
        this.docNo = docNo;
    }
    /**
     * @return Returns the meterNo.
     */
    public String getMeterNo() {
        return meterNo;
    }
    /**
     * @param meterNo The meterNo to set.
     */
    public void setMeterNo(String meterNo) {
        this.meterNo = meterNo;
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
     * @return Returns the payAble.
     */
    public String getPayAble() {
        return payAble;
    }
    /**
     * @param payAble The payAble to set.
     */
    public void setPayAble(String payAble) {
        this.payAble = payAble;
    }
    /**
     * @return Returns the qtySply.
     */
    public String getQtySply() {
        return qtySply;
    }
    /**
     * @param qtySply The qtySply to set.
     */
    public void setQtySply(String qtySply) {
        this.qtySply = qtySply;
    }
    /**
     * @return Returns the rejBy.
     */
    public String getRejBy() {
        return rejBy;
    }
    /**
     * @param rejBy The rejBy to set.
     */
    public void setRejBy(String rejBy) {
        this.rejBy = rejBy;
    }
    /**
     * @return Returns the rejDt.
     */
    public String getRejDt() {
        return rejDt;
    }
    /**
     * @param rejDt The rejDt to set.
     */
    public void setRejDt(String rejDt) {
        this.rejDt = rejDt;
    }
    /**
     * @return Returns the reqAmt.
     */
//    public double getReqAmt() {
//        return reqAmt;
//    }
//    /**
//     * @param reqAmt The reqAmt to set.
//     */
//    public void setReqAmt(double reqAmt) {
//        this.reqAmt = reqAmt;
//    }
    /**
     * @return Returns the reqBy.
     */
    public String getReqBy() {
        return reqBy;
    }
    /**
     * @param reqBy The reqBy to set.
     */
    public void setReqBy(String reqBy) {
        this.reqBy = reqBy;
    }
    /**
     * @return Returns the reqDt.
     */
    public String getReqDt() {
        return reqDt;
    }
    /**
     * @param reqDt The reqDt to set.
     */
    public void setReqDt(String reqDt) {
        this.reqDt = reqDt;
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
     * @return Returns the sa.
     */
    public String getSa() {
        return sa;
    }
    /**
     * @param sa The sa to set.
     */
    public void setSa(String sa) {
        this.sa = sa;
    }
    /**
     * @return Returns the splyEndDt.
     */
    public String getSplyEndDt() {
        return splyEndDt;
    }
    /**
     * @param splyEndDt The splyEndDt to set.
     */
    public void setSplyEndDt(String splyEndDt) {
        this.splyEndDt = splyEndDt;
    }
    /**
     * @return Returns the splyStDt.
     */
    public String getSplyStDt() {
        return splyStDt;
    }
    /**
     * @param splyStDt The splyStDt to set.
     */
    public void setSplyStDt(String splyStDt) {
        this.splyStDt = splyStDt;
    }
    /**
     * @return Returns the statCd.
     */
    public String getStatCd() {
        return statCd;
    }
    /**
     * @param statCd The statCd to set.
     */
    public void setStatCd(String statCd) {
        this.statCd = statCd;
    }
    /**
     * @return Returns the statCdNm.
     */
    public String getStatCdNm() {
        return statCdNm;
    }
    /**
     * @param statCdNm The statCdNm to set.
     */
    public void setStatCdNm(String statCdNm) {
        this.statCdNm = statCdNm;
    }
    /**
     * @return Returns the totalHrs.
     */
    public String getTotalHrs() {
        return totalHrs;
    }
    /**
     * @param totalHrs The totalHrs to set.
     */
    public void setTotalHrs(String totalHrs) {
        this.totalHrs = totalHrs;
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
     * @return Returns the saNm.
     */
    public String getSaNm() {
        return saNm;
    }
    /**
     * @param saNm The saNm to set.
     */
    public void setSaNm(String saNm) {
        this.saNm = saNm;
    }
    public String getSplyReq() {
        return splyReq;
    }
    public void setSplyReq(String splyReq) {
        this.splyReq = splyReq;
    }
    public String getSplyEndReq() {
        return splyEndReq;
    }
    public void setSplyEndReq(String splyEndReq) {
        this.splyEndReq = splyEndReq;
    }
    public String getComp() {
        return comp;
    }
    public void setComp(String comp) {
        this.comp = comp;
    }
    public String getSubmitby() {
        return submitby;
    }
    public void setSubmitby(String submitby) {
        this.submitby = submitby;
    }
    public double getCharge() {
        return charge;
    }
    public void setCharge(double charge) {
        this.charge = charge;
    }
    public double getUnitPrc() {
        return unitPrc;
    }
    public void setUnitPrc(double unitPrc) {
        this.unitPrc = unitPrc;
    }
	public String getReqAmt() {
	    return reqAmt;
	}
	public void setReqAmt(String reqAmt) {
	    this.reqAmt = reqAmt;
	}
    public String getAfrAmt() {
        return afrAmt;
    }
    public void setAfrAmt(String afrAmt) {
        this.afrAmt = afrAmt;
    }
	public String getBefAmt() {
	    return befAmt;
	}
	public void setBefAmt(String befAmt) {
	    this.befAmt = befAmt;
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
	public String getWorkingStatus() {
		return workingStatus;
	}
	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}
	public ArrayList<FreshWaterServiceItem> getUpdateItems() {
		return updateItems;
	}
	public void setUpdateItems(ArrayList<FreshWaterServiceItem> updateItems) {
		this.updateItems = updateItems;
	}
	public String getAbc() {
		return abc;
	}
	public void setAbc(String abc) {
		this.abc = abc;
	}
	
}
