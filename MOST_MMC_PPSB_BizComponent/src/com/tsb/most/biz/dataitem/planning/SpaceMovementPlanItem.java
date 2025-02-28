/**
* SpcMovRequestItem.java
*
* Created on   : 2008-01-28
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.2 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2008-01-28   Mr Sung-Yong Kim 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.planning;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

public class SpaceMovementPlanItem extends DataItem {
	private String workingStatus;
    private String reqNo; 
    private String seq; 
    private String reqTpCd;
    private String reqTpNm;
    private String reqDt;
    private String reqr;
    private String reqrNm;
    private String reqrTpCd;
    private String reqrTpNm;
    private String planDt;
    private String cgRefNo;
    private String reqPos;
    private String planLocId; 
    private String prevLocId; 
    private String prevCellId;
    private String rmk;
    private String reqQty;
    private String reqMsrmt;
    private String reqWgt;
    private String statCd;
    private String statNm;
    private String opeClassCd;
    private String refNo; 
    private String vslCallId; 
    private String shipgNoteNo; 
    private String blNo;
    private String cgNo;
    private String blSn;
    private String shipgAgnt;
    private String fwdAgnt;
    private String cngShp;
    private String cngShpNm;
    private String cnsne;
    private String shpr;
    private String strgNoteNo;
    private String insertType;
    private String chk;
    
    private String divCd;
    private String locId;
    private String reqSeq;
    
    //2008-07-29
    private Date eta ;
    private Date svcDt;
    private String period ;
    private String reqM2 ;
    private String reqMt ;
    private String grNo ;
    private String dgYn ;
    private String cgType;
    private String cgPkgType ;
    private String reqYn;
    //2008-11-13
    private String catgCd ;
    private String catgNm;
    //2008-11-17
    private String payer ;
    private String payerNm ;
    private String no ;
    //2009-03-31
    private String mvTp;
    private String planBy;
    
    private String planSeq;
    
    // KHH.2019.02.11
    private List requestGroupList;
    private List planList;
    private ArrayList<SpaceMovementPlanItem> items;
    
    private String cgTpCd;
    private String cgTpNm;
    private String mfDocId;

    //display in column
    private String pkgNo;
    private String pkgMark;
    private String pkgTpCd;
	private String pkgTpNm;
    private String cmdtGrpCd;
    private String cmdtGrpNm;
    private String cmdtCd;
    private String cmdtNm;
    private String pod;
    private String podNm;
    private String lotNo;
    private String doNo;
    private String sdogrNo;
    private String noOfVIN;
    private String vslCd;
    private String callYear;
    private String callSeq;
    private String scn;
    
    
    public String getPlanSeq() {
        return planSeq;
    }
    public void setPlanSeq(String planSeq) {
        this.planSeq = planSeq;
    }
    /**
     * @return Returns the planBy.
     */
    public String getPlanBy() {
        return planBy;
    }
    /**
     * @param planBy The planBy to set.
     */
    public void setPlanBy(String planBy) {
        this.planBy = planBy;
    }
    /**
     * @return Returns the blNo.
     */
    public String getBlNo() {
        return blNo;
    }
    /**
     * @param blNo The blNo to set.
     */
    public void setBlNo(String blNo) {
        this.blNo = blNo;
    }
    /**
     * @return Returns the blSn.
     */
    public String getBlSn() {
        return blSn;
    }
    /**
     * @param blSn The blSn to set.
     */
    public void setBlSn(String blSn) {
        this.blSn = blSn;
    }
    /**
     * @return Returns the cgNo.
     */
    public String getCgNo() {
        return cgNo;
    }
    /**
     * @param cgNo The cgNo to set.
     */
    public void setCgNo(String cgNo) {
        this.cgNo = cgNo;
    }
    /**
     * @return Returns the cgRefNo.
     */
    public String getCgRefNo() {
        return cgRefNo;
    }
    /**
     * @param cgRefNo The cgRefNo to set.
     */
    public void setCgRefNo(String cgRefNo) {
        this.cgRefNo = cgRefNo;
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
     * @return Returns the cngShp.
     */
    public String getCngShp() {
        return cngShp;
    }
    /**
     * @param cngShp The cngShp to set.
     */
    public void setCngShp(String cngShp) {
        this.cngShp = cngShp;
    }
    /**
     * @return Returns the cnsne.
     */
    public String getCnsne() {
        return cnsne;
    }
    /**
     * @param cnsne The cnsne to set.
     */
    public void setCnsne(String cnsne) {
        this.cnsne = cnsne;
    }
    /**
     * @return Returns the fwdAgnt.
     */
    public String getFwdAgnt() {
        return fwdAgnt;
    }
    /**
     * @param fwdAgnt The fwdAgnt to set.
     */
    public void setFwdAgnt(String fwdAgnt) {
        this.fwdAgnt = fwdAgnt;
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
     * @return Returns the opeClassCd.
     */
    public String getOpeClassCd() {
        return opeClassCd;
    }
    /**
     * @param opeClassCd The opeClassCd to set.
     */
    public void setOpeClassCd(String opeClassCd) {
        this.opeClassCd = opeClassCd;
    }
    /**
     * @return Returns the planDt.
     */
    public String getPlanDt() {
        return planDt;
    }
    /**
     * @param planDt The planDt to set.
     */
    public void setPlanDt(String planDt) {
        this.planDt = planDt;
    }
    /**
     * @return Returns the planLocId.
     */
    public String getPlanLocId() {
        return planLocId;
    }
    /**
     * @param planLocId The planLocId to set.
     */
    public void setPlanLocId(String planLocId) {
        this.planLocId = planLocId;
    }
    /**
     * @return Returns the prevLocId.
     */
    public String getPrevLocId() {
        return prevLocId;
    }
    /**
     * @param prevLocId The prevLocId to set.
     */
    public void setPrevLocId(String prevLocId) {
        this.prevLocId = prevLocId;
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
     * @return Returns the reqMsrmt.
     */
    public String getReqMsrmt() {
        return reqMsrmt;
    }
    /**
     * @param reqMsrmt The reqMsrmt to set.
     */
    public void setReqMsrmt(String reqMsrmt) {
        this.reqMsrmt = reqMsrmt;
    }
    /**
     * @return Returns the reqNo.
     */
    public String getReqNo() {
        return reqNo;
    }
    /**
     * @param reqNo The reqNo to set.
     */
    public void setReqNo(String reqNo) {
        this.reqNo = reqNo;
    }
    /**
     * @return Returns the reqPos.
     */
    public String getReqPos() {
        return reqPos;
    }
    /**
     * @param reqPos The reqPos to set.
     */
    public void setReqPos(String reqPos) {
        this.reqPos = reqPos;
    }
    /**
     * @return Returns the reqQty.
     */
    public String getReqQty() {
        return reqQty;
    }
    /**
     * @param reqQty The reqQty to set.
     */
    public void setReqQty(String reqQty) {
        this.reqQty = reqQty;
    }
    /**
     * @return Returns the reqr.
     */
    public String getReqr() {
        return reqr;
    }
    /**
     * @param reqr The reqr to set.
     */
    public void setReqr(String reqr) {
        this.reqr = reqr;
    }
    /**
     * @return Returns the reqrNm.
     */
    public String getReqrNm() {
        return reqrNm;
    }
    /**
     * @param reqrNm The reqrNm to set.
     */
    public void setReqrNm(String reqrNm) {
        this.reqrNm = reqrNm;
    }
    /**
     * @return Returns the reqrTpCd.
     */
    public String getReqrTpCd() {
        return reqrTpCd;
    }
    /**
     * @param reqrTpCd The reqrTpCd to set.
     */
    public void setReqrTpCd(String reqrTpCd) {
        this.reqrTpCd = reqrTpCd;
    }
    /**
     * @return Returns the reqrTpNm.
     */
    public String getReqrTpNm() {
        return reqrTpNm;
    }
    /**
     * @param reqrTpNm The reqrTpNm to set.
     */
    public void setReqrTpNm(String reqrTpNm) {
        this.reqrTpNm = reqrTpNm;
    }
    /**
     * @return Returns the reqTpCd.
     */
    public String getReqTpCd() {
        return reqTpCd;
    }
    /**
     * @param reqTpCd The reqTpCd to set.
     */
    public void setReqTpCd(String reqTpCd) {
        this.reqTpCd = reqTpCd;
    }
    /**
     * @return Returns the reqWgt.
     */
    public String getReqWgt() {
        return reqWgt;
    }
    /**
     * @param reqWgt The reqWgt to set.
     */
    public void setReqWgt(String reqWgt) {
        this.reqWgt = reqWgt;
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
     * @return Returns the seq.
     */
    public String getSeq() {
        return seq;
    }
    /**
     * @param seq The seq to set.
     */
    public void setSeq(String seq) {
        this.seq = seq;
    }
    /**
     * @return Returns the shipgAgnt.
     */
    public String getShipgAgnt() {
        return shipgAgnt;
    }
    /**
     * @param shipgAgnt The shipgAgnt to set.
     */
    public void setShipgAgnt(String shipgAgnt) {
        this.shipgAgnt = shipgAgnt;
    }
    /**
     * @return Returns the shipgNoteNo.
     */
    public String getShipgNoteNo() {
        return shipgNoteNo;
    }
    /**
     * @param shipgNoteNo The shipgNoteNo to set.
     */
    public void setShipgNoteNo(String shipgNoteNo) {
        this.shipgNoteNo = shipgNoteNo;
    }
    /**
     * @return Returns the shpr.
     */
    public String getShpr() {
        return shpr;
    }
    /**
     * @param shpr The shpr to set.
     */
    public void setShpr(String shpr) {
        this.shpr = shpr;
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
     * @return Returns the strgNoteNo.
     */
    public String getStrgNoteNo() {
        return strgNoteNo;
    }
    /**
     * @param strgNoteNo The strgNoteNo to set.
     */
    public void setStrgNoteNo(String strgNoteNo) {
        this.strgNoteNo = strgNoteNo;
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
     * @return Returns the reqTpNm.
     */
    public String getReqTpNm() {
        return reqTpNm;
    }
    /**
     * @param reqTpNm The reqTpNm to set.
     */
    public void setReqTpNm(String reqTpNm) {
        this.reqTpNm = reqTpNm;
    }
    /**
     * @return Returns the statNm.
     */
    public String getStatNm() {
        return statNm;
    }
    /**
     * @param statNm The statNm to set.
     */
    public void setStatNm(String statNm) {
        this.statNm = statNm;
    }
    /**
     * @return Returns the divCd.
     */
    public String getDivCd() {
        return divCd;
    }
    /**
     * @param divCd The divCd to set.
     */
    public void setDivCd(String divCd) {
        this.divCd = divCd;
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
     * @return Returns the reqSeq.
     */
    public String getReqSeq() {
        return reqSeq;
    }
    /**
     * @param reqSeq The reqSeq to set.
     */
    public void setReqSeq(String reqSeq) {
        this.reqSeq = reqSeq;
    }
    public Date getEta() {
        return eta;
    }
    public void setEta(Date eta) {
        this.eta = eta;
    }
    public String getPeriod() {
        return period;
    }
    public void setPeriod(String period) {
        this.period = period;
    }
    public String getReqM2() {
        return reqM2;
    }
    public void setReqM2(String reqM2) {
        this.reqM2 = reqM2;
    }
    public String getReqMt() {
        return reqMt;
    }
    public void setReqMt(String reqMt) {
        this.reqMt = reqMt;
    }
    public Date getSvcDt() {
        return svcDt;
    }
    public void setSvcDt(Date svcDt) {
        this.svcDt = svcDt;
    }
    public String getGrNo() {
        return grNo;
    }
    public void setGrNo(String grNo) {
        this.grNo = grNo;
    }
    public String getCgType() {
        return cgType;
    }
    public void setCgType(String cgType) {
        this.cgType = cgType;
    }
    public String getDgYn() {
        return dgYn;
    }
    public void setDgYn(String dgYn) {
        this.dgYn = dgYn;
    }
    public String getCgPkgType() {
        return cgPkgType;
    }
    public void setCgPkgType(String cgPkgType) {
        this.cgPkgType = cgPkgType;
    }

    public String getReqYn() {
        return reqYn;
    }
    public void setReqYn(String reqYn) {
        this.reqYn = reqYn;
    }
    public String getCatgCd() {
        return catgCd;
    }
    public void setCatgCd(String catgCd) {
        this.catgCd = catgCd;
    }
    public String getPayer() {
        return payer;
    }
    public void setPayer(String payer) {
        this.payer = payer;
    }
    public String getNo() {
        return no;
    }
    public void setNo(String no) {
        this.no = no;
    }
    public String getPrevCellId() {
        return prevCellId;
    }
    public void setPrevCellId(String prevCellId) {
        this.prevCellId = prevCellId;
    }
    public String getMvTp() {
        return mvTp;
    }
    public void setMvTp(String mvTp) {
        this.mvTp = mvTp;
    }
    public String getPayerNm() {
        return payerNm;
    }
    public void setPayerNm(String payerNm) {
        this.payerNm = payerNm;
    }
	public List getRequestGroupList() {
		return requestGroupList;
	}
	public void setRequestGroupList(List requestGroupList) {
		this.requestGroupList = requestGroupList;
	}
	public List getPlanList() {
		return planList;
	}
	public void setPlanList(List planList) {
		this.planList = planList;
	}
	public ArrayList<SpaceMovementPlanItem> getItems() {
		return items;
	}
	public void setItems(ArrayList<SpaceMovementPlanItem> items) {
		this.items = items;
	}
	public String getWorkingStatus() {
		return workingStatus;
	}
	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}
	public String getCatgNm() {
		return catgNm;
	}
	public void setCatgNm(String catgNm) {
		this.catgNm = catgNm;
	}
	public String getCngShpNm() {
		return cngShpNm;
	}
	public void setCngShpNm(String cngShpNm) {
		this.cngShpNm = cngShpNm;
	}
	public String getCgTpCd() {
		return cgTpCd;
	}
	public void setCgTpCd(String cgTpCd) {
		this.cgTpCd = cgTpCd;
	}
	public String getCgTpNm() {
		return cgTpNm;
	}
	public void setCgTpNm(String cgTpNm) {
		this.cgTpNm = cgTpNm;
	}
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
	public String getPkgNo() {
		return pkgNo;
	}
	public void setPkgNo(String pkgNo) {
		this.pkgNo = pkgNo;
	}
	public String getPkgMark() {
		return pkgMark;
	}
	public void setPkgMark(String pkgMark) {
		this.pkgMark = pkgMark;
	}
	public String getPkgTpCd() {
		return pkgTpCd;
	}
	public void setPkgTpCd(String pkgTpCd) {
		this.pkgTpCd = pkgTpCd;
	}
	public String getPkgTpNm() {
		return pkgTpNm;
	}
	public void setPkgTpNm(String pkgTpNm) {
		this.pkgTpNm = pkgTpNm;
	}
	public String getCmdtGrpCd() {
		return cmdtGrpCd;
	}
	public void setCmdtGrpCd(String cmdtGrpCd) {
		this.cmdtGrpCd = cmdtGrpCd;
	}
	public String getCmdtGrpNm() {
		return cmdtGrpNm;
	}
	public void setCmdtGrpNm(String cmdtGrpNm) {
		this.cmdtGrpNm = cmdtGrpNm;
	}
	public String getCmdtCd() {
		return cmdtCd;
	}
	public void setCmdtCd(String cmdtCd) {
		this.cmdtCd = cmdtCd;
	}
	public String getCmdtNm() {
		return cmdtNm;
	}
	public void setCmdtNm(String cmdtNm) {
		this.cmdtNm = cmdtNm;
	}
	public String getPod() {
		return pod;
	}
	public void setPod(String pod) {
		this.pod = pod;
	}
	public String getPodNm() {
		return podNm;
	}
	public void setPodNm(String podNm) {
		this.podNm = podNm;
	}
	public String getLotNo() {
		return lotNo;
	}
	public void setLotNo(String lotNo) {
		this.lotNo = lotNo;
	}
	public String getDoNo() {
		return doNo;
	}
	public void setDoNo(String doNo) {
		this.doNo = doNo;
	}
	public String getSdogrNo() {
		return sdogrNo;
	}
	public void setSdogrNo(String sdogrNo) {
		this.sdogrNo = sdogrNo;
	}
	public String getNoOfVIN() {
		return noOfVIN;
	}
	public void setNoOfVIN(String noOfVIN) {
		this.noOfVIN = noOfVIN;
	}
	public String getVslCd() {
		return vslCd;
	}
	public void setVslCd(String vslCd) {
		this.vslCd = vslCd;
	}
	public String getCallYear() {
		return callYear;
	}
	public void setCallYear(String callYear) {
		this.callYear = callYear;
	}
	public String getCallSeq() {
		return callSeq;
	}
	public void setCallSeq(String callSeq) {
		this.callSeq = callSeq;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
}
