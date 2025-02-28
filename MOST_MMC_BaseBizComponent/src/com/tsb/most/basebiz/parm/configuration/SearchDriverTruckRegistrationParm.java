/**
* RegisterationLorryDriverParm.java
*
* Created on   : 2008-01-15
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2008-01-15   Miss Nam-Sook Chang 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.basebiz.parm.configuration;

import com.tsb.most.framework.bizparm.BaseBizParm;

/**
 * @author cnsook
 *
 *         TODO To change the template for this generated type comment go to
 *         Window - Preferences - Java - Code Style - Code Templates
 */
public class SearchDriverTruckRegistrationParm extends BaseBizParm {
	private String ptnrCd;
	private String divCd;

	private String driverId, licsNo;
	private String lorryId, lorryNo;
	private String tareWgt, meaDt;

	private String searchType;

	private String plateNo;
	private String chassisNo;
	private String driverNm;
	
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

	public String getDriverId() {
		return driverId;
	}

	public void setDriverId(String driverId) {
		this.driverId = driverId;
	}

	public String getLicsNo() {
		return licsNo;
	}

	public void setLicsNo(String licsNo) {
		this.licsNo = licsNo;
	}

	public String getLorryId() {
		return lorryId;
	}

	public void setLorryId(String lorryId) {
		this.lorryId = lorryId;
	}

	public String getLorryNo() {
		return lorryNo;
	}

	public void setLorryNo(String lorryNo) {
		this.lorryNo = lorryNo;
	}

	public String getSearchType() {
		return searchType;
	}

	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}

	/**
	 * @return Returns the meaDt.
	 */
	public String getMeaDt() {
		return meaDt;
	}

	/**
	 * @param meaDt
	 *            The meaDt to set.
	 */
	public void setMeaDt(String meaDt) {
		this.meaDt = meaDt;
	}

	/**
	 * @return Returns the tareWgt.
	 */
	public String getTareWgt() {
		return tareWgt;
	}

	/**
	 * @param tareWgt
	 *            The tareWgt to set.
	 */
	public void setTareWgt(String tareWgt) {
		this.tareWgt = tareWgt;
	}

	public String getPlateNo() {
		return plateNo;
	}

	public void setPlateNo(String plateNo) {
		this.plateNo = plateNo;
	}

	public String getChassisNo() {
		return chassisNo;
	}

	public void setChassisNo(String chassisNo) {
		this.chassisNo = chassisNo;
	}

	public String getDriverNm() {
		return driverNm;
	}

	public void setDriverNm(String driverNm) {
		this.driverNm = driverNm;
	}
	
}
