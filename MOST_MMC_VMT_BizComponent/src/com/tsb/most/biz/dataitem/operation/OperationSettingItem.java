package com.tsb.most.biz.dataitem.operation;

import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

public class OperationSettingItem extends DataItem {
    private String vslCallId;// Mandatory condition select
    private String shftId;
    private String shftNm;
    private String eqFacNo;
    private String eqFacNm;
    private String cgNo;
    private String hatchNo;
    private String hatchDrt;//FpAp
   
    private String gangNo;
    private String shftDt;
    private String shftDtDsp;
    private String cgTpCd; //break bulk, dry bulk, DBK, BBK
    private String eqFacTpCd;// fac = FC, equipment EQ, inspected TMT_EQ_FAC.eg_fac_no
    private String stevedore;
    private String stevedoreNm;
    private String searchType;
    
    private String eqNo;
    private String eqNm;
    private String facNo;
    private String facNm;
    private String location;
    private String locTpCd;
    private String topCgCd;
    private String clnCd;
    private String locId;
    private String whId;
    private List bbkOpHatchList;
    private List dbkOpHatchList;
    
    //RBT. 2024. Add YT Activate Operation
    private String vslCd;
    private String callYear;
    private String callSeq;
    private String mfDocId;
    private String shipgNoteNo;
    private String blNo;
    private String opeClassCd;
    private String eqTpCd;
    private String docNo;
    // End RBT. 2024. Add YT Activate Operation

    public String getCgNo() {
        return cgNo;
    }
    public void setCgNo(String cgNo) {
        this.cgNo = cgNo;
    }   
     
    public String getGangNo() {
        return gangNo;
    }
    public void setGangNo(String gangNo) {
        this.gangNo = gangNo;
    }
    public String getHatchDrt() {
        return hatchDrt;
    }
    public void setHatchDrt(String hatchDrt) {
        this.hatchDrt = hatchDrt;
    }
    public String getHatchNo() {
        return hatchNo;
    }
    public void setHatchNo(String hatchNo) {
        this.hatchNo = hatchNo;
    }    
    public String getShftId() {
        return shftId;
    }
    public void setShftId(String shftId) {
        this.shftId = shftId;
    }  
    public String getCgTpCd() {
        return cgTpCd;
    }
    public void setCgTpCd(String cgTpCd) {
        this.cgTpCd = cgTpCd;
    }
    public String getEqFacNo() {
        return eqFacNo;
    }
    public void setEqFacNo(String eqFacNo) {
        this.eqFacNo = eqFacNo;
    }
    public String getShftDt() {
        return shftDt;
    }
    public void setShftDt(String shftDt) {
        this.shftDt = shftDt;
    }
    public String getStevedore() {
        return stevedore;
    }
    public void setStevedore(String stevedore) {
        this.stevedore = stevedore;
    }
    public String getVslCallId() {
        return vslCallId;
    }
    public void setVslCallId(String vslCallId) {
        this.vslCallId = vslCallId;
    }
    public String getSearchType() {
        return searchType;
    }
    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }
    public String getEqFacTpCd() {
        return eqFacTpCd;
    }
    public void setEqFacTpCd(String eqFacTpCd) {
        this.eqFacTpCd = eqFacTpCd;
    }
    public String getEqNo() {
        return eqNo;
    }
    public void setEqNo(String eqNo) {
        this.eqNo = eqNo;
    }
    public String getFacNo() {
        return facNo;
    }
    public void setFacNo(String facNo) {
        this.facNo = facNo;
    }
    public String getStevedoreNm() {
        return stevedoreNm;
    }
    public void setStevedoreNm(String stevedoreNm) {
        this.stevedoreNm = stevedoreNm;
    }
    public String getEqFacNm() {
        return eqFacNm;
    }
    public void setEqFacNm(String eqFacNm) {
        this.eqFacNm = eqFacNm;
    }

    public String getEqNm() {
        return eqNm;
    }
    public void setEqNm(String eqNm) {
        this.eqNm = eqNm;
    }
    public String getFacNm() {
        return facNm;
    }
    public void setFacNm(String facNm) {
        this.facNm = facNm;
    }
    public String getShftNm() {
        return shftNm;
    }
    public void setShftNm(String shftNm) {
        this.shftNm = shftNm;
    }
    public String getClnCd() {
        return clnCd;
    }
    public void setClnCd(String clnCd) {
        this.clnCd = clnCd;
    }
    public String getTopCgCd() {
        return topCgCd;
    }
    public void setTopCgCd(String topCgCd) {
        this.topCgCd = topCgCd;
    }
    /**
     * @return Returns the shftDtDsp.
     */
    public String getShftDtDsp() {
        return shftDtDsp;
    }
    /**
     * @param shftDtDsp The shftDtDsp to set.
     */
    public void setShftDtDsp(String shftDtDsp) {
        this.shftDtDsp = shftDtDsp;
    }
	public List getBbkOpHatchList() {
		return bbkOpHatchList;
	}
	public void setBbkOpHatchList(List bbkOpHatchList) {
		this.bbkOpHatchList = bbkOpHatchList;
	}
	public List getDbkOpHatchList() {
		return dbkOpHatchList;
	}
	public void setDbkOpHatchList(List dbkOpHatchList) {
		this.dbkOpHatchList = dbkOpHatchList;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getLocation() {
		return location;
	}
	public void setLocTpCd(String locTpCd) {
		this.locTpCd = locTpCd;
	}
	public String getLocTpCd() {
		return locTpCd;
	}
	public String getLocId() {
		return locId;
	}
	public void setLocId(String locId) {
		this.locId = locId;
	}
	public String getWhId() {
		return whId;
	}
	public void setWhId(String whId) {
		this.whId = whId;
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
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
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
	public String getOpeClassCd() {
		return opeClassCd;
	}
	public void setOpeClassCd(String opeClassCd) {
		this.opeClassCd = opeClassCd;
	}
	public String getEqTpCd() {
		return eqTpCd;
	}
	public void setEqTpCd(String eqTpCd) {
		this.eqTpCd = eqTpCd;
	}
	public String getDocNo() {
		return docNo;
	}
	public void setDocNo(String docNo) {
		this.docNo = docNo;
	}
	
}
