package com.tsb.most.biz.parm.monitoring;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchLoadingParm extends BaseBizParm {
    private String vslCallId;
    private String fwrAgent;
    private String snNo;
    private String loadStDt;
    private String loadEndDt;
    private String gateInStDt;
    private String gateInEndDt;
    private String grNo;
    private String delvStatus;
    private String searchType;
    
    private String shift;
    private String eta;
    private String etd;
    private String atb;
    private String atu;
    private String atw;
    private String atc;
    private String sa;
    private String loc;
    
    private String shiftFromDt;
    private String shiftToDt;
    
    private String modeOfOpr;
    private String hatchNo;
    
    private String workEndDt;
    
    private String shftDt;
    private String currentPage;
    private String numbPerPage;
    private String pageType;
    private String fromRow;
    private String toRow;
    
    private String exportTp;
    private String jobPurpCd;
    
    private String delvOdrNo;    
    private String blNo;
    private String mfDocId;
    private String unitNo;
    private String cargoTp;
    
    private String scn;
    
    public String getFromRow() {
        return fromRow;
    }
    public void setFromRow(String fromRow) {
        this.fromRow = fromRow;
    }
    public String getToRow() {
        return toRow;
    }
    public void setToRow(String toRow) {
        this.toRow = toRow;
    }
    /**
     * @return Returns the workEndDt.
     */
    public String getWorkEndDt() {
        return workEndDt;
    }
    /**
     * @param workEndDt The workEndDt to set.
     */
    public void setWorkEndDt(String workEndDt) {
        this.workEndDt = workEndDt;
    }
    /**
     * @return Returns the hatchNo.
     */
    public String getHatchNo() {
        return hatchNo;
    }
    /**
     * @param hatchNo The hatchNo to set.
     */
    public void setHatchNo(String hatchNo) {
        this.hatchNo = hatchNo;
    }
    /**
     * @return Returns the modeOfOpr.
     */
    public String getModeOfOpr() {
        return modeOfOpr;
    }
    /**
     * @param modeOfOpr The modeOfOpr to set.
     */
    public void setModeOfOpr(String modeOfOpr) {
        this.modeOfOpr = modeOfOpr;
    }
    /**
     * @return Returns the shiftToDt.
     */
    public String getShiftToDt() {
        return shiftToDt;
    }
    /**
     * @param shiftToDt The shiftToDt to set.
     */
    public void setShiftToDt(String shiftToDt) {
        this.shiftToDt = shiftToDt;
    }
    /**
     * @return Returns the shiftFromDt.
     */
    public String getShiftFromDt() {
        return shiftFromDt;
    }
    /**
     * @param shiftFromDt The shiftFromDt to set.
     */
    public void setShiftFromDt(String shiftFromDt) {
        this.shiftFromDt = shiftFromDt;
    }
    //Redesign 2008/11/21
    private String lorryNo ;

    public String getFwrAgent() {
        return fwrAgent;
    }
    public void setFwrAgent(String fwrAgent) {
        this.fwrAgent = fwrAgent;
    }
    public String getGrNo() {
        return grNo;
    }
    public void setGrNo(String grNo) {
        this.grNo = grNo;
    }

    public String getSearchType() {
        return searchType;
    }
    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }
    public String getSnNo() {
        return snNo;
    }
    public void setSnNo(String snNo) {
        this.snNo = snNo;
    }
    public String getLoadEndDt() {
        return loadEndDt;
    }
    public void setLoadEndDt(String loadEndDt) {
        this.loadEndDt = loadEndDt;
    }
    public String getLoadStDt() {
        return loadStDt;
    }
    public void setLoadStDt(String loadStDt) {
        this.loadStDt = loadStDt;
    }
    public String getDelvStatus() {
        return delvStatus;
    }
    public void setDelvStatus(String delvStatus) {
        this.delvStatus = delvStatus;
    }
    public String getAtb() {
        return atb;
    }
    public void setAtb(String atb) {
        this.atb = atb;
    }
    public String getAtc() {
        return atc;
    }
    public void setAtc(String atc) {
        this.atc = atc;
    }
    public String getAtu() {
        return atu;
    }
    public void setAtu(String atu) {
        this.atu = atu;
    }
    public String getAtw() {
        return atw;
    }
    public void setAtw(String atw) {
        this.atw = atw;
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
    public String getLoc() {
        return loc;
    }
    public void setLoc(String loc) {
        this.loc = loc;
    }
    public String getSa() {
        return sa;
    }
    public void setSa(String sa) {
        this.sa = sa;
    }
    public String getShift() {
        return shift;
    }
    public void setShift(String shift) {
        this.shift = shift;
    }
    public String getGateInEndDt() {
        return gateInEndDt;
    }
    public void setGateInEndDt(String gateInEndDt) {
        this.gateInEndDt = gateInEndDt;
    }
    public String getGateInStDt() {
        return gateInStDt;
    }
    public void setGateInStDt(String gateInStDt) {
        this.gateInStDt = gateInStDt;
    }
    public String getLorryNo() {
        return lorryNo;
    }
    public void setLorryNo(String lorryNo) {
        this.lorryNo = lorryNo;
    }

    public String getShftDt() {
        return shftDt;
    }
    public void setShftDt(String shftDt) {
        this.shftDt = shftDt;
    }
    public String getCurrentPage() {
        return currentPage;
    }
    public void setCurrentPage(String currentPage) {
        this.currentPage = currentPage;
    }
    public String getNumbPerPage() {
        return numbPerPage;
    }
    public void setNumbPerPage(String numbPerPage) {
        this.numbPerPage = numbPerPage;
    }
    public String getPageType() {
        return pageType;
    }
    public void setPageType(String pageType) {
        this.pageType = pageType;
    }
    
    
    
  //Added by Chris 2015-09-25 for 49799
    public String getDelvOdrNo() {
        return delvOdrNo;
    }
    public void setDelvOdrNo(String delvOdrNo) {
        this.delvOdrNo = delvOdrNo;
    }
    
    public String getBlNo() {
        return blNo;
    }
    public void setBlNo(String blNo) {
        this.blNo = blNo;
    }
	public String getExportTp() {
		return exportTp;
	}
	public void setExportTp(String exportTp) {
		this.exportTp = exportTp;
	}
	public String getJobPurpCd() {
		return jobPurpCd;
	}
	public void setJobPurpCd(String jobPurpCd) {
		this.jobPurpCd = jobPurpCd;
	}
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
	public String getUnitNo() {
		return unitNo;
	}
	public void setUnitNo(String unitNo) {
		this.unitNo = unitNo;
	}
	public String getCargoTp() {
		return cargoTp;
	}
	public void setCargoTp(String cargoTp) {
		this.cargoTp = cargoTp;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
}
