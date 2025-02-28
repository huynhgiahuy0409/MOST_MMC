/**
* PackageConditionPropertyItem.java
*
* Created on   : Jan 31, 2008
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* Jan 31, 2008   An Doan 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.billing;

import com.tsb.most.framework.dataitem.DataItem;

/**
 * @author Thuy An
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class PackageConditionPropertyItem extends DataItem {
    private String agreNo;

    private String prcTpCd;
    private String prptCd;
    private String prptNm;
    private String dataTpCd;
    private String dataLen;
    private String colNm;
    private String priSeq;
    private String updTime;
    private String userId;
    private String workingStatus;
    private String newVersion;
    public String getNewVersion() {
		return newVersion;
	}
	public void setNewVersion(String newVersion) {
		this.newVersion = newVersion;
	}
	private String crud;
    public String getWorkingStatus() {
		return workingStatus;
	}
	public String getCrud() {
		return crud;
	}
	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}
	public void setCrud(String crud) {
		this.crud = crud;
	}
	public String getUpdTime() {
		return updTime;
	}
	public String getUserId() {
		return userId;
	}
	public void setUpdTime(String updTime) {
		this.updTime = updTime;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getAgreNo() {
        return agreNo;
    }
    public void setAgreNo(String agreNo) {
        this.agreNo = agreNo;
    }
    public String getColNm() {
        return colNm;
    }
    public void setColNm(String colNm) {
        this.colNm = colNm;
    }
    public String getDataLen() {
        return dataLen;
    }
    public void setDataLen(String dataLen) {
        this.dataLen = dataLen;
    }
    public String getDataTpCd() {
        return dataTpCd;
    }
    public void setDataTpCd(String dataTpCd) {
        this.dataTpCd = dataTpCd;
    }
    public String getPrcTpCd() {
        return prcTpCd;
    }
    public void setPrcTpCd(String prcTpCd) {
        this.prcTpCd = prcTpCd;
    }
    public String getPriSeq() {
        return priSeq;
    }
    public void setPriSeq(String priSeq) {
        this.priSeq = priSeq;
    }
    public String getPrptCd() {
        return prptCd;
    }
    public void setPrptCd(String prptCd) {
        this.prptCd = prptCd;
    }
    public String getPrptNm() {
        return prptNm;
    }
    public void setPrptNm(String prptNm) {
        this.prptNm = prptNm;
    }
}
