package com.tsb.most.biz.dataitem.operation;

import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

public class VesselDelayPenaltyReportItem extends DataItem {
    private String hatchNo;
    private String dlyPntyRptNo;
    private String contrator;
    private String itemCd;
    private String roleCd;
    private double unitPrc;
    private double itemQty;
    private double pntyAmt;
    private String pntyDescr;
    private String itemCdNm;
    private String roleCdNm;
    private String no;
    private String userId;
    private String rsnCd;
    private String rsnCdNm;
    
    private String vslCallId;
    private String searchType;
    private String machineCd;
    private String machineNm;
    private String scn;
    private String parameterCd;
    private String parameterValue;
    
    public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	//-- start ADD 20080804 tnkytn Need for HHT
    private String crud;
    //-- end   ADD 20080804 tnkytn Need for HHT
    
    private String shftId;
    private String pntyDt;
    private String pntyTime;
    private String pntyEndTime;
    private String shftNm;
    
    private List shiftList;
    private List hatchNoList;
    private List particulars;
    private List roleList;
   
    public List getRoleList() {
		return roleList;
	}
	public void setRoleList(List roleList) {
		this.roleList = roleList;
	}
	public List getParticulars() {
		return particulars;
	}
	public void setParticulars(List particulars) {
		this.particulars = particulars;
	}
	public List getShiftList() {
		return shiftList;
	}
	public void setShiftList(List shiftList) {
		this.shiftList = shiftList;
	}
	public List getHatchNoList() {
		return hatchNoList;
	}
	public void setHatchNoList(List hatchNoList) {
		this.hatchNoList = hatchNoList;
	}
	/**
     * @return Returns the pntyEndTime.
     */
    public String getPntyEndTime() {
        return pntyEndTime;
    }
    /**
     * @param pntyEndTime The pntyEndTime to set.
     */
    public void setPntyEndTime(String pntyEndTime) {
        this.pntyEndTime = pntyEndTime;
    }
    /**
     * @return Returns the pntyTime.
     */
    public String getPntyTime() {
        return pntyTime;
    }
    /**
     * @param pntyTime The pntyTime to set.
     */
    public void setPntyTime(String pntyTime) {
        this.pntyTime = pntyTime;
    }
    public String getShftNm() {
        return shftNm;
    }
    public void setShftNm(String shftNm) {
        this.shftNm = shftNm;
    }
    public String getPntyDt() {
        return pntyDt;
    }
    public void setPntyDt(String pntyDt) {
        this.pntyDt = pntyDt;
    }
    public String getShftId() {
        return shftId;
    }
    public void setShftId(String shftId) {
        this.shftId = shftId;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public String getNo() {
        return no;
    }
    public void setNo(String no) {
        this.no = no;
    }
    public String getItemCdNm() {
        return itemCdNm;
    }
    public void setItemCdNm(String itemCdNm) {
        this.itemCdNm = itemCdNm;
    }
    public String getRoleCdNm() {
        return roleCdNm;
    }
    public void setRoleCdNm(String roleCdNm) {
        this.roleCdNm = roleCdNm;
    }
    public String getContrator() {
        return contrator;
    }
    public void setContrator(String contrator) {
        this.contrator = contrator;
    }
    public String getDlyPntyRptNo() {
        return dlyPntyRptNo;
    }
    public void setDlyPntyRptNo(String dlyPntyRptNo) {
        this.dlyPntyRptNo = dlyPntyRptNo;
    }
    public String getHatchNo() {
        return hatchNo;
    }
    public void setHatchNo(String hatchNo) {
        this.hatchNo = hatchNo;
    }
    public String getItemCd() {
        return itemCd;
    }
    public void setItemCd(String itemCd) {
        this.itemCd = itemCd;
    }
    public double getItemQty() {
        return itemQty;
    }
    public void setItemQty(double itemQty) {
        this.itemQty = itemQty;
    }
    public double getPntyAmt() {
        return pntyAmt;
    }
    public void setPntyAmt(double pntyAmt) {
        this.pntyAmt = pntyAmt;
    }
    public String getPntyDescr() {
        return pntyDescr;
    }
    public void setPntyDescr(String pntyDescr) {
        this.pntyDescr = pntyDescr;
    }
    public String getRoleCd() {
        return roleCd;
    }
    public void setRoleCd(String roleCd) {
        this.roleCd = roleCd;
    }
    public double getUnitPrc() {
        return unitPrc;
    }
    public void setUnitPrc(double unitPrc) {
        this.unitPrc = unitPrc;
    }
    
    public String getMachineCd() {
		return machineCd;
	}
	public void setMachineCd(String machineCd) {
		this.machineCd = machineCd;
	}
	
	public String getMachineNm() {
		return machineNm;
	}
	public void setMachineNm(String machineNm) {
		this.machineNm = machineNm;
	}
	//-- start ADD 20080804 tnkytn Need for HHT
    public String getCrud() {
        return crud;
    }
    public void setCrud(String workingStatus) {
        this.crud = workingStatus;
    }
    //-- end   ADD 20080804 tnkytn Need for HHT
	public String getRsnCd() {
		return rsnCd;
	}
	public void setRsnCd(String rsnCd) {
		this.rsnCd = rsnCd;
	}
	public String getRsnCdNm() {
		return rsnCdNm;
	}
	public void setRsnCdNm(String rsnCdNm) {
		this.rsnCdNm = rsnCdNm;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
	public String getParameterCd() {
		return parameterCd;
	}
	public void setParameterCd(String parameterCd) {
		this.parameterCd = parameterCd;
	}
	public String getParameterValue() {
		return parameterValue;
	}
	public void setParameterValue(String parameterValue) {
		this.parameterValue = parameterValue;
	}
	
	
}
