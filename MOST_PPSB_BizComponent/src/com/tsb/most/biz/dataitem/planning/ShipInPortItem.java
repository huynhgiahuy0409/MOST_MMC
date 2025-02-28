/**
* ShipInPortItem.java
*
* Created on   : Jun 4, 2008
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* Jun 4, 2008   An Doan 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.planning;

import java.util.Date;

import com.tsb.most.framework.dataitem.DataItem;

/**
 * @author Thuy An
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class ShipInPortItem extends DataItem {
    private String berthLoc;
    private String berthNm;
    private String wharfMark;
    private String arrvDisplmt;
    private String deptDisplmt;
    private String vslNm;
    private String vslWm;
    private String sa;
    private String loa;
    private String ata;
    private String atu;
    private String atb;
    private String atw;
    private String eta;
    private String etd;
    private String etc;
    private String etw;
    
    private String csn;
    private String crgTp;
    private String totalTonage;
    private String totalHandled;
    private String eq;
    private String loading;
    private String discharging;
    private String crgBalance;
    private String grt;
    private String nextVsl;
    private String nextVslNm;
    private String remark;
    private String jpvc;
    
    //tide information
    private Date chkYmd;
    private String chkYmdUpd;
    private String hhMm;
    private String hhMmUpd;
    private String tide;
    private String etu;
    private String pob;
    private String opeTp;
    private String equip;
    private String gang;
    private String atc;
    private String pilotOnboard;
    private String dwt;
    
    
    public String getDwt() {
        return dwt;
    }
    public void setDwt(String dwt) {
        this.dwt = dwt;
    }
    public String getNextVslNm() {
        return nextVslNm;
    }
    public void setNextVslNm(String nextVslNm) {
        this.nextVslNm = nextVslNm;
    }
    public String getPilotOnboard() {
        return pilotOnboard;
    }
    public void setPilotOnboard(String pilotOnboard) {
        this.pilotOnboard = pilotOnboard;
    }
    /**
     * @return Returns the atc.
     */
    public String getAtc() {
        return atc;
    }
    /**
     * @param atc The atc to set.
     */
    public void setAtc(String atc) {
        this.atc = atc;
    }
    /**
     * @return Returns the equip.
     */
    public String getEquip() {
        return equip;
    }
    /**
     * @param equip The equip to set.
     */
    public void setEquip(String equip) {
        this.equip = equip;
    }
    /**
     * @return Returns the gang.
     */
    public String getGang() {
        return gang;
    }
    /**
     * @param gang The gang to set.
     */
    public void setGang(String gang) {
        this.gang = gang;
    }
    /**
     * @return Returns the opeTp.
     */
    public String getOpeTp() {
        return opeTp;
    }
    /**
     * @param opeTp The opeTp to set.
     */
    public void setOpeTp(String opeTp) {
        this.opeTp = opeTp;
    }
    /**
     * @return Returns the pob.
     */
    public String getPob() {
        return pob;
    }
    /**
     * @param pob The pob to set.
     */
    public void setPob(String pob) {
        this.pob = pob;
    }
    /**
     * @return Returns the atw.
     */
    public String getAtw() {
        return atw;
    }
    /**
     * @param atw The atw to set.
     */
    public void setAtw(String atw) {
        this.atw = atw;
    }
    /**
     * @return Returns the etc.
     */
    public String getEtc() {
        return etc;
    }
    /**
     * @param etc The etc to set.
     */
    public void setEtc(String etc) {
        this.etc = etc;
    }
    /**
     * @return Returns the etw.
     */
    public String getEtw() {
        return etw;
    }
    /**
     * @param etw The etw to set.
     */
    public void setEtw(String etw) {
        this.etw = etw;
    }
    /**
     * @return Returns the etu.
     */
    public String getEtu() {
        return etu;
    }
    /**
     * @param etu The etu to set.
     */
    public void setEtu(String etu) {
        this.etu = etu;
    }
    public String getArrvDisplmt() {
        return arrvDisplmt;
    }
    public void setArrvDisplmt(String arrvDisplmt) {
        this.arrvDisplmt = arrvDisplmt;
    }
    public String getAta() {
        return ata;
    }
    public void setAta(String ata) {
        this.ata = ata;
    }
    public String getAtb() {
        return atb;
    }
    public void setAtb(String atb) {
        this.atb = atb;
    }
    public String getAtu() {
        return atu;
    }
    public void setAtu(String atu) {
        this.atu = atu;
    }
    public String getBerthLoc() {
        return berthLoc;
    }
    public void setBerthLoc(String berthLoc) {
        this.berthLoc = berthLoc;
    }
    public String getCrgBalance() {
        return crgBalance;
    }
    public void setCrgBalance(String crgBalance) {
        this.crgBalance = crgBalance;
    }
    public String getCrgTp() {
        return crgTp;
    }
    public void setCrgTp(String crgTp) {
        this.crgTp = crgTp;
    }
    public String getCsn() {
        return csn;
    }
    public void setCsn(String csn) {
        this.csn = csn;
    }
    public String getDeptDisplmt() {
        return deptDisplmt;
    }
    public void setDeptDisplmt(String deptDisplmt) {
        this.deptDisplmt = deptDisplmt;
    }
    public String getDischarging() {
        return discharging;
    }
    public void setDischarging(String discharging) {
        this.discharging = discharging;
    }
    public String getEq() {
        return eq;
    }
    public void setEq(String eq) {
        this.eq = eq;
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
    public String getGrt() {
        return grt;
    }
    public void setGrt(String grt) {
        this.grt = grt;
    }
    public String getLoa() {
        return loa;
    }
    public void setLoa(String loa) {
        this.loa = loa;
    }
    public String getLoading() {
        return loading;
    }
    public void setLoading(String loading) {
        this.loading = loading;
    }
    public String getNextVsl() {
        return nextVsl;
    }
    public void setNextVsl(String nextVsl) {
        this.nextVsl = nextVsl;
    }
    public String getRemark() {
        return remark;
    }
    public void setRemark(String remark) {
        this.remark = remark;
    }
    public String getSa() {
        return sa;
    }
    public void setSa(String sa) {
        this.sa = sa;
    }
    public String getTotalHandled() {
        return totalHandled;
    }
    public void setTotalHandled(String totalHandled) {
        this.totalHandled = totalHandled;
    }
    public String getTotalTonage() {
        return totalTonage;
    }
    public void setTotalTonage(String totalTonage) {
        this.totalTonage = totalTonage;
    }
    public String getVslNm() {
        return vslNm;
    }
    public void setVslNm(String vslNm) {
        this.vslNm = vslNm;
    }
    public String getVslWm() {
        return vslWm;
    }
    public void setVslWm(String vslWm) {
        this.vslWm = vslWm;
    }
    public String getWharfMark() {
        return wharfMark;
    }
    public void setWharfMark(String wharfMark) {
        this.wharfMark = wharfMark;
    }    
    public String getChkYmdUpd() {
        return chkYmdUpd;
    }
    public void setChkYmdUpd(String chkYmdUpd) {
        this.chkYmdUpd = chkYmdUpd;
    }
   
    public String getHhMmUpd() {
        return hhMmUpd;
    }
    public void setHhMmUpd(String hhMmUpd) {
        this.hhMmUpd = hhMmUpd;
    }
    public String getHhMm() {
        return hhMm;
    }
    public void setHhMm(String hhMm) {
        this.hhMm = hhMm;
    }
    public String getTide() {
        return tide;
    }
    public void setTide(String tide) {
        this.tide = tide;
    }
    public String getBerthNm() {
        return berthNm;
    }
    public void setBerthNm(String berthNm) {
        this.berthNm = berthNm;
    }
    public String getJpvc() {
        return jpvc;
    }
    public void setJpvc(String jpvc) {
        this.jpvc = jpvc;
    }
	public Date getChkYmd() {
		return chkYmd;
	}
	public void setChkYmd(Date chkYmd) {
		this.chkYmd = chkYmd;
	}
}

