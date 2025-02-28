/**
* CommodityCodeItem.java
*
* Created on   : 2008-03-28
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.3 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	          REVISION    	
* 2008-03-28   Miss Nam-Sook Chang 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.basebiz.dataitem.codes;

import java.util.Date;

import com.tsb.most.framework.dataitem.DataItem;


public class CommodityCodeItem extends DataItem {   
    private String cmdtCd;
    private String descr;
    private String minTemp;
    private String maxTemp;
    private String reqVent;
    private String ventUnitCd;
    private String dgClass;
    private String imdg;
    private String unno;
	private String classes;
	private String imdgDiv;
	private String substance;
    private String hsCd;
    private String hsAhtnCd;
    private String userId;
    private String sytmId;
    private Date   updDt;
    private String imdgUnno;
    private String no;
    private String cgTp; /*Improvement from Billing module*/
    // ADD FOR Q7
    private String cmdtGrp;
    private String cmdtGrpCd;
    private String cmdtGrpDes;
    
    private Date crDt;
    private String createdDt;
    private String updateDt;
    
    private String pkgTpCd;
    private String pumpRate;
    
    
	public String getPumpRate() {
		return pumpRate;
	}
	public void setPumpRate(String pumpRate) {
		this.pumpRate = pumpRate;
	}
	//Issue: 52302
    private String tonnageCd;
    
    public String getCmdtGrp() {
        return cmdtGrp;
    }
    public void setCmdtGrp(String cmdtGrp) {
        this.cmdtGrp = cmdtGrp;
    }
    public String getCmdtGrpCd() {
        return cmdtGrpCd;
    }
    public void setCmdtGrpCd(String cmdtGrpCd) {
        this.cmdtGrpCd = cmdtGrpCd;
    }
    public String getNo() {
        return no;
    }
    public void setNo(String no) {
        this.no = no;
    }
    public String getImdgUnno() {
        return imdgUnno;
    }
    public void setImdgUnno(String imdgUnno) {
        this.imdgUnno = imdgUnno;
    }
  	public String getCmdtCd() {
  	    return cmdtCd;
  	}
  	public void setCmdtCd(String cmdtCd) {
  	    this.cmdtCd = cmdtCd;
  	}
  	public String getDescr() {
  	    return descr;
  	}
  	public void setDescr(String descr) {
  	    this.descr = descr;
  	}
  	public String getDgClass() {
  	    return dgClass;
  	}
  	public void setDgClass(String dgClass) {
  	    this.dgClass = dgClass;
  	}
  	public String getHsAhtnCd() {
  	    return hsAhtnCd;
  	}
  	public void setHsAhtnCd(String hsAhtnCd) {
  	    this.hsAhtnCd = hsAhtnCd;
  	}
  	public String getHsCd() {
  	    return hsCd;
  	}
  	public void setHsCd(String hsCd) {
  	    this.hsCd = hsCd;
  	}
  	public String getImdg() {
  	    return imdg;
  	}
  	public void setImdg(String imdg) {
  	    this.imdg = imdg;
  	}
  	public String getMaxTemp() {
  	    return maxTemp;
  	}
  	public void setMaxTemp(String maxTemp) {
  	    this.maxTemp = maxTemp;
  	}
  	public String getMinTemp() {
  	    return minTemp;
  	}
  	public void setMinTemp(String minTemp) {
  	    this.minTemp = minTemp;
  	}
  	public String getReqVent() {
  	    return reqVent;
  	}
  	public void setReqVent(String reqVent) {
  	    this.reqVent = reqVent;
  	}
  	public String getSytmId() {
  	    return sytmId;
  	}
  	public void setSytmId(String sytmId) {
  	    this.sytmId = sytmId;
  	}
  	public Date getUpdDt() {
		return updDt;
	}
	public void setUpdDt(Date updDt) {
		this.updDt = updDt;
	}
	public String getUnno() {
  	    return unno;
  	}
  	public void setUnno(String unno) {
  	    this.unno = unno;
  	}
  	public String getClasses() {
		return classes;
	}
	public void setClasses(String classes) {
		this.classes = classes;
	}
	public String getImdgDiv() {
		return imdgDiv;
	}
	public void setImdgDiv(String imdgDiv) {
		this.imdgDiv = imdgDiv;
	}
	public String getSubstance() {
		return substance;
	}
	public void setSubstance(String substance) {
		this.substance = substance;
	}
	public String getUserId() {
  	    return userId;
  	}
  	public void setUserId(String userId) {
  	    this.userId = userId;
  	}
  	public String getVentUnitCd() {
  	    return ventUnitCd;
  	}
  	public void setVentUnitCd(String ventUnitCd) {
  	    this.ventUnitCd = ventUnitCd;
  	}
    public String getCgTp() {
        return cgTp;
    }
    public void setCgTp(String cgTp) {
        this.cgTp = cgTp;
    }
    public String getTonnageCd() {
        return tonnageCd;
    }
    public void setTonnageCd(String tonnageCd) {
        this.tonnageCd = tonnageCd;
    }
	public String getCmdtGrpDes() {
		return cmdtGrpDes;
	}
	public void setCmdtGrpDes(String cmdtGrpDes) {
		this.cmdtGrpDes = cmdtGrpDes;
	}
	public Date getCrDt() {
		return crDt;
	}
	public void setCrDt(Date crDt) {
		this.crDt = crDt;
	}
	public String getPkgTpCd() {
		return pkgTpCd;
	}
	public void setPkgTpCd(String pkgTpCd) {
		this.pkgTpCd = pkgTpCd;
	}
	public String getCreatedDt() {
		return createdDt;
	}
	public void setCreatedDt(String createdDt) {
		this.createdDt = createdDt;
	}
	public String getUpdateDt() {
		return updateDt;
	}
	public void setUpdateDt(String updateDt) {
		this.updateDt = updateDt;
	}   
	
	
}
