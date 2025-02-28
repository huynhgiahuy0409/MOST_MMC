/**
* TerminalDefinitionParm.java
*
* Created on   : 2008-01-09
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	           REVISION    	
* 2008-01-09   Miss Nam-Sook Chang 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.basebiz.parm.configuration;

import com.tsb.most.framework.bizparm.BaseBizParm;

/**
 * @author admin
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class SearchEquipmentParm extends BaseBizParm {
    private String searchType;
    private String eqTpCd;
    private String useYN;
    private String contractor;
    private String eqFacNo;
    private String loc;
    private String mkrCd;
    
    //2019.02.24 LSJ 
    private String pgmId;
    private String catgCd;
   
    public String getEqFacNo() {
        return eqFacNo;
    }
    public void setEqFacNo(String eqFacNo) {
        this.eqFacNo = eqFacNo;
    }
    public String getContractor() {
        return contractor;
    }
    public void setContractor(String contractor) {
        this.contractor = contractor;
    }
    public String getEqTpCd() {
        return eqTpCd;
    }
    public void setEqTpCd(String eqTpCd) {
        this.eqTpCd = eqTpCd;
    }
    public String getUseYN() {
        return useYN;
    }
    public void setUseYN(String useYN) {
        this.useYN = useYN;
    }
    public String getSearchType() {
        return searchType;
    }
    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }
    /**
     * @return Returns the loc.
     */
    public String getLoc() {
        return loc;
    }
    /**
     * @param loc The loc to set.
     */
    public void setLoc(String loc) {
        this.loc = loc;
    }
    /**
     * @return Returns the mkrCd.
     */
    public String getMkrCd() {
        return mkrCd;
    }
    /**
     * @param mkrCd The mkrCd to set.
     */
    public void setMkrCd(String manufacturer) {
        this.mkrCd = manufacturer;
    }
	public String getPgmId() {
		return pgmId;
	}
	public void setPgmId(String pgmId) {
		this.pgmId = pgmId;
	}
	public String getCatgCd() {
		return catgCd;
	}
	public void setCatgCd(String catgCd) {
		this.catgCd = catgCd;
	}
}
