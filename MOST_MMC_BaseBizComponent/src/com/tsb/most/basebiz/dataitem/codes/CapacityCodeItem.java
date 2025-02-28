/**
* CapacityCodeItem.java
*
* Created on   : May 8, 2008
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* May 8, 2008   An Doan 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.basebiz.dataitem.codes;

import java.util.Date;
import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

/**
 * @author Thuy An
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class CapacityCodeItem extends DataItem {
    
    private String no;
    private String capaCd;
    private String eqTpCd;
    private String eqTpNm;
    private String capaDescr;
    private String capaQty;
    private Date updTime;
    
    private List capaList;
    private List allCapaList;
    
    /**
     * @return Returns the capaCd.
     */
    public String getCapaCd() {
        return capaCd;
    }
    /**
     * @param capaCd The capaCd to set.
     */
    public void setCapaCd(String capaCd) {
        this.capaCd = capaCd;
    }
    /**
     * @return Returns the capaDescr.
     */
    public String getCapaDescr() {
        return capaDescr;
    }
    /**
     * @param capaDescr The capaDescr to set.
     */
    public void setCapaDescr(String capaDescr) {
        this.capaDescr = capaDescr;
    }
    /**
     * @return Returns the capaQty.
     */
    public String getCapaQty() {
        return capaQty;
    }
    /**
     * @param capaQty The capaQty to set.
     */
    public void setCapaQty(String capaQty) {
        this.capaQty = capaQty;
    }
    /**
     * @return Returns the eqTpCd.
     */
    public String getEqTpCd() {
        return eqTpCd;
    }
    /**
     * @param eqTpCd The eqTpCd to set.
     */
    public void setEqTpCd(String eqTpCd) {
        this.eqTpCd = eqTpCd;
    }
    /**
     * @return Returns the eqTpNm.
     */
    public String getEqTpNm() {
        return eqTpNm;
    }
    /**
     * @param eqTpNm The eqTpNm to set.
     */
    public void setEqTpNm(String eqTpNm) {
        this.eqTpNm = eqTpNm;
    }
    /**
     * @return Returns the no.
     */
    public String getNo() {
        return no;
    }
    /**
     * @param no The no to set.
     */
    public void setNo(String no) {
        this.no = no;
    }
	public Date getUpdTime() {
		return updTime;
	}
	public void setUpdTime(Date updTime) {
		this.updTime = updTime;
	}
	public List getCapaList() {
		return capaList;
	}
	public void setCapaList(List capaList) {
		this.capaList = capaList;
	}
	public List getAllCapaList() {
		return allCapaList;
	}
	public void setAllCapaList(List allCapaList) {
		this.allCapaList = allCapaList;
	}
}
