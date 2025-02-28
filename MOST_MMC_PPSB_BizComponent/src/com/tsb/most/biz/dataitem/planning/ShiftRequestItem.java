/**
* ShiftRequestItem.java
*
* Created on   : Jun 24, 2008
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.2 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* Jun 24, 2008   Phan Minh Tuan 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.planning;
import java.util.ArrayList;
import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;
/**
 * @author pmtuan
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class ShiftRequestItem extends DataItem {
	private String vslCd;
	private String callYear;
	private String callSeq;
	private String vslCallId;
	private String seq;
	private String nxBerthNo;
	private String prevBerthNo;
	private String nxBerthNm;
	private String prevBerthNm;
	private String etbDt;
	private String etuDt;
	private String atbDt;
	private String atuDt;
	private String wharfMarkFm;
	private String wharfMarkTo;
	private String reqr;
	private String rsnCd;
	private String shftTpCd;
	private String shftStatCd;
	private String rmk;
	private String chagYn;
	private String submitDt;
	private String submitBy;
	private String apprvDt;
	private String apprvBy;
	private String mssApprvDt;
	private String mssApprvBy;
	private String reqDt ;
	private String berthAlongSide;
	private String berthAlongSideNm;
	private String shiftDis ;
	private String markStart ;
	private String markEnd;
	private String eta;
	private String sa ;
	private String scd ;
	private String scdNm;
	private String statCd;
	private String mssStatCd;
	private String no;
	private String workingStatus;
	private String scn;
	
    /**
     * @return Returns the berthAlongSideNm.
     */
    public String getBerthAlongSideNm() {
        return berthAlongSideNm;
    }
    /**
     * @param berthAlongSideNm The berthAlongSideNm to set.
     */
    public void setBerthAlongSideNm(String berthAlongSideNm) {
        this.berthAlongSideNm = berthAlongSideNm;
    }
    /**
     * @return Returns the mssStatCd.
     */
    public String getMssStatCd() {
        return mssStatCd;
    }
    /**
     * @param mssStatCd The mssStatCd to set.
     */
    public void setMssStatCd(String mssStatCd) {
        this.mssStatCd = mssStatCd;
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
     * @return Returns the nxBerthNm.
     */
    public String getNxBerthNm() {
        return nxBerthNm;
    }
    /**
     * @param nxBerthNm The nxBerthNm to set.
     */
    public void setNxBerthNm(String nxBerthNm) {
        this.nxBerthNm = nxBerthNm;
    }
    /**
     * @return Returns the prevBerthNm.
     */
    public String getPrevBerthNm() {
        return prevBerthNm;
    }
    /**
     * @param prevBerthNm The prevBerthNm to set.
     */
    public void setPrevBerthNm(String prevBerthNm) {
        this.prevBerthNm = prevBerthNm;
    }
    /**
     * @return Returns the mssApprvBy.
     */
    public String getMssApprvBy() {
        return mssApprvBy;
    }
    /**
     * @param mssApprvBy The mssApprvBy to set.
     */
    public void setMssApprvBy(String mssApprvBy) {
        this.mssApprvBy = mssApprvBy;
    }
    /**
     * @return Returns the mssApprvDt.
     */
    public String getMssApprvDt() {
        return mssApprvDt;
    }
    /**
     * @param mssApprvDt The mssApprvDt to set.
     */
    public void setMssApprvDt(String mssApprvDt) {
        this.mssApprvDt = mssApprvDt;
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
    public String getAtbDt() {
        return atbDt;
    }
    public void setAtbDt(String atbDt) {
        this.atbDt = atbDt;
    }
    public String getAtuDt() {
        return atuDt;
    }
    public void setAtuDt(String atuDt) {
        this.atuDt = atuDt;
    }
    public String getChagYn() {
        return chagYn;
    }
    public void setChagYn(String chagYn) {
        this.chagYn = chagYn;
    }
    public String getEtbDt() {
        return etbDt;
    }
    public void setEtbDt(String etbDt) {
        this.etbDt = etbDt;
    }
    public String getEtuDt() {
        return etuDt;
    }
    public void setEtuDt(String etuDt) {
        this.etuDt = etuDt;
    }
    public String getNxBerthNo() {
        return nxBerthNo;
    }
    public void setNxBerthNo(String nxBerthNo) {
        this.nxBerthNo = nxBerthNo;
    }
    public String getPrevBerthNo() {
        return prevBerthNo;
    }
    public void setPrevBerthNo(String prevBerthNo) {
        this.prevBerthNo = prevBerthNo;
    }
    public String getReqr() {
        return reqr;
    }
    public void setReqr(String reqr) {
        this.reqr = reqr;
    }
    public String getRmk() {
        return rmk;
    }
    public void setRmk(String rmk) {
        this.rmk = rmk;
    }
    public String getRsnCd() {
        return rsnCd;
    }
    public void setRsnCd(String rsnCd) {
        this.rsnCd = rsnCd;
    }
    public String getSeq() {
        return seq;
    }
    public void setSeq(String seq) {
        this.seq = seq;
    }
    public String getShftStatCd() {
        return shftStatCd;
    }
    public void setShftStatCd(String shftStatCd) {
        this.shftStatCd = shftStatCd;
    }
    public String getShftTpCd() {
        return shftTpCd;
    }
    public void setShftTpCd(String shftTpCd) {
        this.shftTpCd = shftTpCd;
    }
    public String getSubmitBy() {
        return submitBy;
    }
    public void setSubmitBy(String submitBy) {
        this.submitBy = submitBy;
    }
    public String getSubmitDt() {
        return submitDt;
    }
    public void setSubmitDt(String submitDt) {
        this.submitDt = submitDt;
    }
    public String getVslCallId() {
        return vslCallId;
    }
    public void setVslCallId(String vslCallId) {
        this.vslCallId = vslCallId;
    }
    public String getWharfMarkFm() {
        return wharfMarkFm;
    }
    public void setWharfMarkFm(String wharfMarkFm) {
        this.wharfMarkFm = wharfMarkFm;
    }
    public String getWharfMarkTo() {
        return wharfMarkTo;
    }
    public void setWharfMarkTo(String wharfMarkTo) {
        this.wharfMarkTo = wharfMarkTo;
    }
    public String getEta() {
        return eta;
    }
    public void setEta(String eta) {
        this.eta = eta;
    }
    public String getSa() {
        return sa;
    }
    public void setSa(String sa) {
        this.sa = sa;
    }

    public String getReqDt() {
        return reqDt;
    }
    public void setReqDt(String reqDt) {
        this.reqDt = reqDt;
    }
    public String getBerthAlongSide() {
        return berthAlongSide;
    }
    public void setBerthAlongSide(String berthAlongSide) {
        this.berthAlongSide = berthAlongSide;
    }
    public String getShiftDis() {
        return shiftDis;
    }
    public void setShiftDis(String shiftDis) {
        this.shiftDis = shiftDis;
    }
    public String getMarkEnd() {
        return markEnd;
    }
    public void setMarkEnd(String markEnd) {
        this.markEnd = markEnd;
    }
    public String getMarkStart() {
        return markStart;
    }
    public void setMarkStart(String markStart) {
        this.markStart = markStart;
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
    public String getNo() {
        return no;
    }
    public void setNo(String no) {
        this.no = no;
    }
    private List postionList;
    private List reasonList;
    private ArrayList<ShiftRequestItem> shiftReqList;

	public List getPostionList() {
		return postionList;
	}
	public void setPostionList(List postionList) {
		this.postionList = postionList;
	}
	public List getReasonList() {
		return reasonList;
	}
	public void setReasonList(List reasonList) {
		this.reasonList = reasonList;
	}
	public ArrayList<ShiftRequestItem> getShiftReqList() {
		return shiftReqList;
	}
	public void setShiftReqList(ArrayList<ShiftRequestItem> shiftReqList) {
		this.shiftReqList = shiftReqList;
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
	public String getWorkingStatus() {
		return workingStatus;
	}
	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
}
