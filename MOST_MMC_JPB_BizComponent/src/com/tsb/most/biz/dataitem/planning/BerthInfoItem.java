package com.tsb.most.biz.dataitem.planning;

import com.tsb.most.framework.dataitem.DataItem;

public class BerthInfoItem extends DataItem{
	private String terminalCd;
    private String berthTp;          
    private String berthCd;
    private String locCd;
    private String pstSta;        
    private String pstEnd;         
    private String length;
	private String startPos;
	private String endPos;
	private double displacement;
	private double maxDraft;
	private String grpCd;
	private String terminalNm;
	private String tmnlCd;
	private String isShowInfo;
	private String berthDept;
	private String equipments;
	
	public String getStartPos() {
		return startPos;
	}
	public void setStartPos(String startPos) {
		this.startPos = startPos;
	}
	public String getEndPos() {
		return endPos;
	}
	public void setEndPos(String endPos) {
		this.endPos = endPos;
	}
	private int drawable;
    
	public String getTerminalCd() {
		return terminalCd;
	}
	public void setTerminalCd(String terminalCd) {
		this.terminalCd = terminalCd;
	}
	public int getDrawable() {
		return drawable;
	}
	public void setDrawable(int drawable) {
		this.drawable = drawable;
	}
	private String berthNm;
    public String getBerthNm() {
		return berthNm;
	}
	public void setBerthNm(String berthNm) {
		this.berthNm = berthNm;
	}
	/**
     * @return Returns the berthCd.
     */
    public String getBerthCd() {
        return berthCd;
    }
    /**
     * @param berthCd The berthCd to set.
     */
    public void setBerthCd(String berthCd) {
        this.berthCd = berthCd;
    }
    /**
     * @return Returns the berthTp.
     */
    public String getBerthTp() {
        return berthTp;
    }
    /**
     * @param berthTp The berthTp to set.
     */
    public void setBerthTp(String berthTp) {
        this.berthTp = berthTp;
    }
    
    public String getLocCd() {
		return locCd;
	}
	public void setLocCd(String locCd) {
		this.locCd = locCd;
	}
	/**
     * @return Returns the length.
     */
    public String getLength() {
        return length;
    }
    /**
     * @param length The length to set.
     */
    public void setLength(String length) {
        this.length = length;
    }
    /**
     * @return Returns the pstEnd.
     */
    public String getPstEnd() {
        return pstEnd;
    }
    /**
     * @param pstEnd The pstEnd to set.
     */
    public void setPstEnd(String pstEnd) {
        this.pstEnd = pstEnd;
    }
    /**
     * @return Returns the pstSta.
     */
    public String getPstSta() {
        return pstSta;
    }
    /**
     * @param pstSta The pstSta to set.
     */
    public void setPstSta(String pstSta) {
        this.pstSta = pstSta;
    }
	public double getDisplacement() {
		return displacement;
	}
	public void setDisplacement(double displacement) {
		this.displacement = displacement;
	}
	public double getMaxDraft() {
		return maxDraft;
	}
	public void setMaxDraft(double maxDraft) {
		this.maxDraft = maxDraft;
	}
	public String getGrpCd() {
		return grpCd;
	}
	
	public void setGrpCd(String grpCd) {
		this.grpCd = grpCd;
	}
	public String getTerminalNm() {
		return terminalNm;
	}
	public void setTerminalNm(String terminalNm) {
		this.terminalNm = terminalNm;
	}
	public String getTmnlCd() {
		return tmnlCd;
	}
	public void setTmnlCd(String tmnlCd) {
		this.tmnlCd = tmnlCd;
	}
	public String getIsShowInfo() {
		return isShowInfo;
	}
	public void setIsShowInfo(String isShowInfo) {
		this.isShowInfo = isShowInfo;
	}
	public String getBerthDept() {
		return berthDept;
	}
	public void setBerthDept(String berthDept) {
		this.berthDept = berthDept;
	}
	public String getEquipments() {
		return equipments;
	}
	public void setEquipments(String equipments) {
		this.equipments = equipments;
	}
	
}
