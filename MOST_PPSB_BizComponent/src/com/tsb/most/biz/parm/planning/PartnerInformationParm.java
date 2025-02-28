/**
* PartnerInformationParm.java
*
* Created on   : 2007-07-23
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2007-07-23  Mr Tonny Kim 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.planning;

import com.tsb.most.framework.bizparm.BaseBizParm;

/**
* use PartnerInformationParm Class as parameters to search  
*
* @author Mr Tonny Kim
* @version 1.0
*
* @see 
*/
public class PartnerInformationParm extends BaseBizParm {
    
    private String agencyCode;
    private String ptnrType;
    private String userId;
    /**
     * @return Returns the agencyCode.
     */
    public String getAgencyCode() {
        return agencyCode;
    }
    /**
     * @param agencyCode The agencyCode to set.
     */
    public void setAgencyCode(String agencyCode) {
        this.agencyCode = agencyCode;
    }
    /**
     * @return Returns the ptnrType.
     */
    public String getPtnrType() {
        return ptnrType;
    }
    /**
     * @param ptnrType The ptnrType to set.
     */
    public void setPtnrType(String ptnrType) {
        this.ptnrType = ptnrType;
    }
    /**
     * @param userId The userId to set.
     */
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
}
