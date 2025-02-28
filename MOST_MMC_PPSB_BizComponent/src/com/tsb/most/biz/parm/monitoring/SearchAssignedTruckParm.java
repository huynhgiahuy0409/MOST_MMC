/**
* LorryListParm.java
*
* Created on   : Nov 25, 2008
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.2 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* Nov 25, 2008   An Doan 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.monitoring;
import com.tsb.most.framework.bizparm.BaseBizParm;
/**
 * @author lamthanhtung
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class SearchAssignedTruckParm extends BaseBizParm {

    private String vslCallId;
    private String scn;
    private String blNo;
    private String estDt; 
    private String tsptcd;
    private String lorryNo;
    private String driver;
    private String exprDt;
    private String searchType;
    private String licsNo;
    private String gateInDt;
    private String ptnrCd;
    private String aplyYmd;
    private String shipgNoteNo;
    private String exprYmd;
    private String gateOutDt;
    private String noGate;
    private String driverId;
    private String seq;
    
    private String chkParm;
   
    //Added by Chris 2015-03-30 for Warehouse Checker
    private String grNo;
    
    private String mfDocId;
    
    private String whLoc;
    private String cargoTp;
    private String unitNo;
    private String sdoNo;
    
    //Added by Chris 2015-03-30 for Warehouse Checker
    public String getGrNo() {
        return grNo;
    }
    public void setGrNo(String grNo) {
        this.grNo = grNo;
    }
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getBlNo() {
		return blNo;
	}
	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}
	public String getEstDt() {
		return estDt;
	}
	public void setEstDt(String estDt) {
		this.estDt = estDt;
	}
	public String getTsptcd() {
		return tsptcd;
	}
	public void setTsptcd(String tsptcd) {
		this.tsptcd = tsptcd;
	}
	public String getLorryNo() {
		return lorryNo;
	}
	public void setLorryNo(String lorryNo) {
		this.lorryNo = lorryNo;
	}
	public String getDriver() {
		return driver;
	}
	public void setDriver(String driver) {
		this.driver = driver;
	}
	public String getExprDt() {
		return exprDt;
	}
	public void setExprDt(String exprDt) {
		this.exprDt = exprDt;
	}
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	public String getLicsNo() {
		return licsNo;
	}
	public void setLicsNo(String licsNo) {
		this.licsNo = licsNo;
	}
	public String getGateInDt() {
		return gateInDt;
	}
	public void setGateInDt(String gateInDt) {
		this.gateInDt = gateInDt;
	}
	public String getPtnrCd() {
		return ptnrCd;
	}
	public void setPtnrCd(String ptnrCd) {
		this.ptnrCd = ptnrCd;
	}
	public String getAplyYmd() {
		return aplyYmd;
	}
	public void setAplyYmd(String aplyYmd) {
		this.aplyYmd = aplyYmd;
	}
	public String getShipgNoteNo() {
		return shipgNoteNo;
	}
	public void setShipgNoteNo(String shipgNoteNo) {
		this.shipgNoteNo = shipgNoteNo;
	}
	public String getExprYmd() {
		return exprYmd;
	}
	public void setExprYmd(String exprYmd) {
		this.exprYmd = exprYmd;
	}
	public String getGateOutDt() {
		return gateOutDt;
	}
	public void setGateOutDt(String gateOutDt) {
		this.gateOutDt = gateOutDt;
	}
	public String getNoGate() {
		return noGate;
	}
	public void setNoGate(String noGate) {
		this.noGate = noGate;
	}
	public String getDriverId() {
		return driverId;
	}
	public void setDriverId(String driverId) {
		this.driverId = driverId;
	}
	public String getSeq() {
		return seq;
	}
	public void setSeq(String seq) {
		this.seq = seq;
	}
	public String getChkParm() {
		return chkParm;
	}
	public void setChkParm(String chkParm) {
		this.chkParm = chkParm;
	}
	public String getWhLoc() {
		return whLoc;
	}
	public void setWhLoc(String whLoc) {
		this.whLoc = whLoc;
	}
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
	public String getCargoTp() {
		return cargoTp;
	}
	public void setCargoTp(String cargoTp) {
		this.cargoTp = cargoTp;
	}
	public String getUnitNo() {
		return unitNo;
	}
	public void setUnitNo(String unitNo) {
		this.unitNo = unitNo;
	}
	public String getSdoNo() {
		return sdoNo;
	}
	public void setSdoNo(String sdoNo) {
		this.sdoNo = sdoNo;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
   
}
