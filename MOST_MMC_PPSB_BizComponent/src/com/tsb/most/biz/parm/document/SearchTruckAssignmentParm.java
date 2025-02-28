package com.tsb.most.biz.parm.document;

import java.util.List;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchTruckAssignmentParm extends BaseBizParm {
	private String vslCallId;
	private String scn;
    private String divCd;
    private String ptnrCd;
    private String cd;
    private String cdNm;
    private String tyCd;
    private String searchType;
    private String blNo;
    private String shipgNoteNo;
    private String lorryNo;
    private String tsptr;
    private String screenId;
    private String doNo;
    private String docTp;
    private List partnerCd;
    
    private String bookingNo;
    private String fwdCd;
    private String cgTpCd;
    private String tsptComp;
    private String truckNo;
    private String driverNm;
    private String variousType;
    
    private String arrvDtFm;
    private String arrvDtTo;
    private String allTruck;
    private String grNo;
    private String subDoNo;
    private String pgmId;
    private String catgCd;
    
    private String isMultiCargo;
    private String gateNo;
	private String scaleNo;
	private String seq;
	private String truckMode;
	
	private String qrNo;
	private String mfDocId;
    
    public String getGrNo() {
        return grNo;
    }
    public void setGrNo(String grNo) {
        this.grNo = grNo;
    }
    //--------------------------------------------
    
    public String getScreenId() {
        return screenId;
    }
    public String getAllTruck() {
		return allTruck;
	}
	public void setAllTruck(String allTruck) {
		this.allTruck = allTruck;
	}
	public void setScreenId(String screenId) {
        this.screenId = screenId;
    }
    public String getBlNo() {
        return blNo;
    }
    public void setBlNo(String blNo) {
        this.blNo = blNo;
    }
    public String getShipgNoteNo() {
        return shipgNoteNo;
    }
    public void setShipgNoteNo(String shipgNoteNo) {
        this.shipgNoteNo = shipgNoteNo;
    }
    public String getSearchType() {
        return searchType;
    }
    public void setSearchType(String searchType) {
        this.searchType = searchType;
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
    public String getDivCd() {
        return divCd;
    }
    public void setDivCd(String divCd) {
        this.divCd = divCd;
    }
    public String getPtnrCd() {
        return ptnrCd;
    }
    public void setPtnrCd(String ptnrCd) {
        this.ptnrCd = ptnrCd;
    }
    public String getTyCd() {
        return tyCd;
    }
    public void setTyCd(String tyCd) {
        this.tyCd = tyCd;
    }
    
    public String getVslCallId() {
        return vslCallId;
    }
    public void setVslCallId(String vslCallId) {
        this.vslCallId = vslCallId;
    }
    public String getLorryNo() {
        return lorryNo;
    }
    public void setLorryNo(String lorryNo) {
        this.lorryNo = lorryNo;
    }
    public String getTsptr() {
        return tsptr;
    }
    public void setTsptr(String tsptr) {
        this.tsptr = tsptr;
    }
    public String getDoNo() {
        return doNo;
    }
    public void setDoNo(String doNo) {
        this.doNo = doNo;
    }
	public List getPartnerCd() {
		return partnerCd;
	}
	public void setPartnerCd(List partnerCd) {
		this.partnerCd = partnerCd;
	}
	public String getDocTp() {
		return docTp;
	}
	public void setDocTp(String docTp) {
		this.docTp = docTp;
	}
	public String getBookingNo() {
		return bookingNo;
	}
	public void setBookingNo(String bookingNo) {
		this.bookingNo = bookingNo;
	}
	public String getFwdCd() {
		return fwdCd;
	}
	public void setFwdCd(String fwdCd) {
		this.fwdCd = fwdCd;
	}
	public String getCgTpCd() {
		return cgTpCd;
	}
	public void setCgTpCd(String cgTpCd) {
		this.cgTpCd = cgTpCd;
	}
	public String getTsptComp() {
		return tsptComp;
	}
	public void setTsptComp(String tsptComp) {
		this.tsptComp = tsptComp;
	}
	public String getTruckNo() {
		return truckNo;
	}
	public void setTruckNo(String truckNo) {
		this.truckNo = truckNo;
	}
	public String getDriverNm() {
		return driverNm;
	}
	public void setDriverNm(String driverNm) {
		this.driverNm = driverNm;
	}
	public String getVariousType() {
		return variousType;
	}
	public void setVariousType(String variousType) {
		this.variousType = variousType;
	}
	public String getArrvDtFm() {
		return arrvDtFm;
	}
	public void setArrvDtFm(String arrvDtFm) {
		this.arrvDtFm = arrvDtFm;
	}
	public String getArrvDtTo() {
		return arrvDtTo;
	}
	public void setArrvDtTo(String arrvDtTo) {
		this.arrvDtTo = arrvDtTo;
	}
	public String getSubDoNo() {
		return subDoNo;
	}
	public void setSubDoNo(String subDoNo) {
		this.subDoNo = subDoNo;
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
	public String getIsMultiCargo() {
		return isMultiCargo;
	}
	public void setIsMultiCargo(String isMultiCargo) {
		this.isMultiCargo = isMultiCargo;
	}
	public String getGateNo() {
		return gateNo;
	}
	public void setGateNo(String gateNo) {
		this.gateNo = gateNo;
	}
	public String getSeq() {
		return seq;
	}
	public void setSeq(String seq) {
		this.seq = seq;
	}
	public String getScaleNo() {
		return scaleNo;
	}
	public void setScaleNo(String scaleNo) {
		this.scaleNo = scaleNo;
	}
	public String getTruckMode() {
		return truckMode;
	}
	public void setTruckMode(String truckMode) {
		this.truckMode = truckMode;
	}
	public String getQrNo() {
		return qrNo;
	}
	public void setQrNo(String qrNo) {
		this.qrNo = qrNo;
	}
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
	
}
