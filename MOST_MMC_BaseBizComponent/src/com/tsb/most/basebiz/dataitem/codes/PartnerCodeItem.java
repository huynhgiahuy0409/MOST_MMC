/**
* PartnerCodeItem.java
*
* Created on   : 2007-09-27
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2007-09-27     Mr Sunny Kim 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.basebiz.dataitem.codes;

import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

public class PartnerCodeItem extends DataItem {

    private String engPtyNm;
    private String ptyDivCd;
    private String ptyCd;
    private String tyCd;
    private String addr;
    private String addr1;
    private String addr2;
    private String addr3;  
    private String addr4;
    private String representative;
    private String ptnrTypes;
    
    private String ptyTpCd;
    
    public String getPtyTpCd() {
		return ptyTpCd;
	}
	public void setPtyTpCd(String ptyTpCd) {
		this.ptyTpCd = ptyTpCd;
	}
	//2008.01.30	partner type search(Agent List) is added.
    private String telNo;
    private String faxNo;
    private String ptyDivName;
    
    private String holdChk;
    private String accountHold;
    private String accountno;
    private String payType;
    
    public String getPayType() {
		return payType;
	}
	public void setPayType(String payType) {
		this.payType = payType;
	}
	private List partnerCodeType;
    private List shippingAgentCodeTypeList;
    private List partnerCodeTypeList;
    
	/**
	 * @return the partnerCodeType
	 */
	public List getPartnerCodeType() {
		return partnerCodeType;
	}
	/**
	 * @param partnerCodeType the partnerCodeType to set
	 */
	public void setPartnerCodeType(List partnerCodeType) {
		this.partnerCodeType = partnerCodeType;
	}
	/**
	 * @return the shippingAgentCodeTypeList
	 */
	public List getShippingAgentCodeTypeList() {
		return shippingAgentCodeTypeList;
	}
	/**
	 * @param shippingAgentCodeTypeList the shippingAgentCodeTypeList to set
	 */
	public void setShippingAgentCodeTypeList(List shippingAgentCodeTypeList) {
		this.shippingAgentCodeTypeList = shippingAgentCodeTypeList;
	}
	/**
	 * @return the partnerCodeTypeList
	 */
	public List getPartnerCodeTypeList() {
		return partnerCodeTypeList;
	}
	/**
	 * @param partnerCodeTypeList the partnerCodeTypeList to set
	 */
	public void setPartnerCodeTypeList(List partnerCodeTypeList) {
		this.partnerCodeTypeList = partnerCodeTypeList;
	}
	/**
     * @return Returns the account No.
     */

    public String getAccountno() {
        return accountno;
    }
    public void setAccountno(String accountno) {
        this.accountno = accountno;
    }
    /**
     * @return Returns the accountHold.
     */
    public String getAccountHold() {
        return accountHold;
    }
    /**
     * @param accountHold The accountHold to set.
     */
    public void setAccountHold(String accountHold) {
        this.accountHold = accountHold;
    }
    /**
     * @return Returns the holdChk.
     */
    public String getHoldChk() {
        return holdChk;
    }
    /**
     * @param holdChk The holdChk to set.
     */
    public void setHoldChk(String holdChk) {
        this.holdChk = holdChk;
    }
    /**
    * Function set a engPtyNm value
    * @param engPtyNm. 
    * @return void.
    */        
    public void setEngPtyNm(String engPtyNm)
    {
        this.engPtyNm       = engPtyNm;
    }

    /**
    * Return a engPtyNm Value
    * @param void. 
    * @return String.
    */  
    public String getEngPtyNm()
    {
        return engPtyNm;
    }

    /**
    * Function set a ptyDivCd value
    * @param ptyDivCd. 
    * @return void.
    */        
    public void setPtyDivCd(String ptyDivCd)
    {
        this.ptyDivCd       = ptyDivCd;
    }

    /**
    * Return a ptyDivCd Value
    * @param void. 
    * @return String.
    */  
    public String getPtyDivCd()
    {
        return ptyDivCd;
    }

    /**
    * Function set a ptyCd value
    * @param ptyCd. 
    * @return void.
    */        
    public void setPtyCd(String ptyCd)
    {
        this.ptyCd       = ptyCd;
    }

    /**
    * Return a ptyCd Value
    * @param void. 
    * @return String.
    */  
    public String getPtyCd()
    {
        return ptyCd;
    }



    public String getTyCd() {
        return tyCd;
    }
    public void setTyCd(String tyCd) {
        this.tyCd = tyCd;
    }
    
    public String getAddr() {
        return addr;
    }
    public void setAddr(String addr) {
        this.addr = addr;
    }
    
    public String getAddr1() {
        return addr1;
    }
    public void setAddr1(String addr1) {
        this.addr1 = addr1;
    }
    public String getAddr2() {
        return addr2;
    }
    public void setAddr2(String addr2) {
        this.addr2 = addr2;
    }
    public String getAddr3() {
        return addr3;
    }
    public void setAddr3(String addr3) {
        this.addr3 = addr3;
    }
    
    public String getAddr4() {
        return addr4;
    }
    public void setAddr4(String addr4) {
        this.addr4 = addr4;
    }
    
    public String getRepresentative() {
        return representative;
    }
    public void setRepresentative(String representative) {
        this.representative = representative;
    }
    public String getFaxNo() {
        return faxNo;
    }
    public void setFaxNo(String faxNo) {
        this.faxNo = faxNo;
    }
    public String getTelNo() {
        return telNo;
    }
    public void setTelNo(String telNo) {
        this.telNo = telNo;
    }
    public String getPtyDivName() {
        return ptyDivName;
    }
    public void setPtyDivName(String ptyDivName) {
        this.ptyDivName = ptyDivName;
    }
	public String getPtnrTypes() {
		return ptnrTypes;
	}
	public void setPtnrTypes(String ptnrTypes) {
		this.ptnrTypes = ptnrTypes;
	}
}
