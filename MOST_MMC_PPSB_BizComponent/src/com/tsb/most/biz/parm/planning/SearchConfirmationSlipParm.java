/**
* ConfirmationSlipParm.java
*
* Created on   : 2007-08-29
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2007-08-29     Mr Jason Kim 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.planning;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchConfirmationSlipParm extends BaseBizParm {
    
    private String vslCallId;
    private String cargoType;
    private int seq;
    private String vslCd;
    private String callYear;
    private String callSeq;
    private String docId;
    private String pgmId;
    private String catgCd;
    private String workYmd;
    private String shift;
    private String opeTp;

    
    public String getCargoType() {
        return cargoType;
    }
    public void setCargoType(String cargoType) {
        this.cargoType = cargoType;
    }
    public int getSeq() {
        return seq;
    }
    public void setSeq(int seq) {
        this.seq = seq;
    }
    public String getVslCallId() {
        return vslCallId;
    }
    public void setVslCallId(String vslCallId) {
        this.vslCallId = vslCallId;
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
    public String getVslCd() {
        return vslCd;
    }
    public void setVslCd(String vslCd) {
        this.vslCd = vslCd;
    }
    public String getDocId() {
        return docId;
    }
    public void setDocId(String docId) {
        this.docId = docId;
    }
	public String getPgmId() {
		return pgmId;
	}
	public void setPgmId(String pgmId) {
		this.pgmId = pgmId;
	}
	public String getCatgCd() {
		return catgCd;
	}
	public void setCatgCd(String catgCd) {
		this.catgCd = catgCd;
	}
	public String getWorkYmd() {
		return workYmd;
	}
	public void setWorkYmd(String workYmd) {
		this.workYmd = workYmd;
	}
	public String getShift() {
		return shift;
	}
	public void setShift(String shift) {
		this.shift = shift;
	}
	public String getOpeTp() {
		return opeTp;
	}
	public void setOpeTp(String opeTp) {
		this.opeTp = opeTp;
	}
	
}
