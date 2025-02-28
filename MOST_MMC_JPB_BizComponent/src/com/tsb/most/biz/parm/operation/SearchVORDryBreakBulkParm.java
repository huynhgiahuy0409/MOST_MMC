package com.tsb.most.biz.parm.operation;

import com.tsb.most.framework.bizparm.BaseBizParm;
public class SearchVORDryBreakBulkParm extends BaseBizParm {
    private String vslCallId;   //Vessel call id
    private String workYmd;		// Date
    private String shift;		// Shift
    private String cgTpCd;
    private String vslCd;		// Vessel Code
    private String vslNm;		// Vessel Name
    private String inbVoy;		// Inb Voyage
    private String outbVoy;		// Shift
    private String shipgAgnt;	// Shipping Agent
    private String eta;			// eta
    private String etd;			// etd
    private String berthLoc;	// Berching Location
    private String storageLoc;	// storage Location
    private String scnNo;		// scn No.
    private String searchType;	// SearchType
    private String insertType;	// SearchType
    private String eqTpCd;
    private String rsDivCd;    // Div code : Equipment: EQ ; SteverDor:WC
    private String shftNm;
    private String workComp;
    private String useYN;
    private String userId;
    
	private String strDate;
    private String endDate;
    private String vslShiftingSeq;
    private String shftId;
    private String hatchDrtCd;
    private String workStDt;
    private String workEndDt;
    private String hatchNo;
    private String eqFacNo;
    private String previewType;
    private String reportId;
    private String seq;
    
    //Vessel Operation Report
    private String hlDayYmd;
    private String hlMonthYmd;
    private String divCd;
    private String bargeNo;
    
    // VOR Report
    private String remark;
    
    private String scn;
    
    
    public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUseYN() {
		return useYN;
	}
	public void setUseYN(String useYN) {
		this.useYN = useYN;
	}
	public String getShftNm() {
		return shftNm;
	}
	public String getWorkComp() {
		return workComp;
	}
	public void setShftNm(String shftNm) {
		this.shftNm = shftNm;
	}
	public void setWorkComp(String workComp) {
		this.workComp = workComp;
	}

    public String getPreviewType() {
		return previewType;
	}
	public String getReportId() {
		return reportId;
	}
	public void setPreviewType(String previewType) {
		this.previewType = previewType;
	}
	public void setReportId(String reportId) {
		this.reportId = reportId;
	}
	public String getBerthLoc() {
        return berthLoc;
    }
    public void setBerthLoc(String berthLoc) {
        this.berthLoc = berthLoc;
    }
    public String getCgTpCd() {
        return cgTpCd;
    }
    public void setCgTpCd(String cgTpCd) {
        this.cgTpCd = cgTpCd;
    }
    public String getEta() {
        return eta;
    }
    public void setEta(String eta) {
        this.eta = eta;
    }
    public String getEtd() {
        return etd;
    }
    public void setEtd(String etd) {
        this.etd = etd;
    }
    public String getInbVoy() {
        return inbVoy;
    }
    public void setInbVoy(String inbVoy) {
        this.inbVoy = inbVoy;
    }
    public String getInsertType() {
        return insertType;
    }
    public void setInsertType(String insertType) {
        this.insertType = insertType;
    }

    public String getOutbVoy() {
        return outbVoy;
    }
    public void setOutbVoy(String outbVoy) {
        this.outbVoy = outbVoy;
    }
    public String getScnNo() {
        return scnNo;
    }
    public void setScnNo(String scnNo) {
        this.scnNo = scnNo;
    }
    public String getSearchType() {
        return searchType;
    }
    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }
    public String getShift() {
        return shift;
    }
    public void setShift(String shift) {
        this.shift = shift;
    }
    public String getShipgAgnt() {
        return shipgAgnt;
    }
    public void setShipgAgnt(String shipgAgnt) {
        this.shipgAgnt = shipgAgnt;
    }
    public String getStorageLoc() {
        return storageLoc;
    }
    public void setStorageLoc(String storageLoc) {
        this.storageLoc = storageLoc;
    }
    public String getVslCd() {
        return vslCd;
    }
    public void setVslCd(String vslCd) {
        this.vslCd = vslCd;
    }
    public String getVslNm() {
        return vslNm;
    }
    public void setVslNm(String vslNm) {
        this.vslNm = vslNm;
    }
    public String getWorkYmd() {
        return workYmd;
    }
    public void setWorkYmd(String workYmd) {
        this.workYmd = workYmd;
    }
    public String getVslCallId() {
        return vslCallId;
    }
    public void setVslCallId(String vslCallId) {
        this.vslCallId = vslCallId;
    }
    public String getEqTpCd() {
        return eqTpCd;
    }
    public void setEqTpCd(String eqTpCd) {
        this.eqTpCd = eqTpCd;
    }
    public String getRsDivCd() {
        return rsDivCd;
    }
    public void setRsDivCd(String rsDivCd) {
        this.rsDivCd = rsDivCd;
    }
    public String getEndDate() {
        return endDate;
    }
    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }
    public String getStrDate() {
        return strDate;
    }
    public void setStrDate(String strDate) {
        this.strDate = strDate;
    }
    public String getVslShiftingSeq() {
        return vslShiftingSeq;
    }
    public void setVslShiftingSeq(String vslShiftingSeq) {
        this.vslShiftingSeq = vslShiftingSeq;
    }
	public String getShftId() {
		return shftId;
	}
	public void setShftId(String shftId) {
		this.shftId = shftId;
	}
	public String getHatchDrtCd() {
		return hatchDrtCd;
	}
	public void setHatchDrtCd(String hatchDrtCd) {
		this.hatchDrtCd = hatchDrtCd;
	}
	public String getWorkStDt() {
		return workStDt;
	}
	public void setWorkStDt(String workStDt) {
		this.workStDt = workStDt;
	}
	public String getWorkEndDt() {
		return workEndDt;
	}
	public void setWorkEndDt(String workEndDt) {
		this.workEndDt = workEndDt;
	}
	public String getHatchNo() {
		return hatchNo;
	}
	public void setHatchNo(String hatchNo) {
		this.hatchNo = hatchNo;
	}
	public String getEqFacNo() {
		return eqFacNo;
	}
	public void setEqFacNo(String eqFacNo) {
		this.eqFacNo = eqFacNo;
	}
	public String getSeq() {
		return seq;
	}
	public void setSeq(String seq) {
		this.seq = seq;
	}
	public String getHlDayYmd() {
		return hlDayYmd;
	}
	public void setHlDayYmd(String hlDayYmd) {
		this.hlDayYmd = hlDayYmd;
	}
	public String getHlMonthYmd() {
		return hlMonthYmd;
	}
	public void setHlMonthYmd(String hlMonthYmd) {
		this.hlMonthYmd = hlMonthYmd;
	}
	public String getDivCd() {
		return divCd;
	}
	public void setDivCd(String divCd) {
		this.divCd = divCd;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getBargeNo() {
		return bargeNo;
	}
	public void setBargeNo(String bargeNo) {
		this.bargeNo = bargeNo;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
	
}
