/**
* CostCenterItem.java
*
* Created on   : Nov 30, 2007
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* Nov 30, 2007   Phan Minh Tuan 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.billing;

import java.util.Date;

import com.tsb.most.framework.dataitem.DataItem;

/**
 * @author pmtuan
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class CostCenterItem extends DataItem {
    private String codeCostCenter ;
    private String codeFinancial;
    private String codeDescription ;
    private String codeSBU ;
    private String typeDelivery ;
    private String typeCargo ;
    private String codeSBUName ;
    private String typeDeliveryName ;
    private String typeCargoName ;    
    private String codeStaff ;
    private String dateUpdate ;
    private String messageCode ;
    
    public String getMessageCode() {
		return messageCode;
	}
	public void setMessageError(String messageCode) {
		this.messageCode = messageCode;
	}
    public String getCdNm() {
		return cdNm;
	}
	public String getErpCd() {
		return erpCd;
	}
	public String getRef1() {
		return ref1;
	}
	public String getRef2() {
		return ref2;
	}
	public String getRef3() {
		return ref3;
	}
	public void setCdNm(String cdNm) {
		this.cdNm = cdNm;
	}
	public void setErpCd(String erpCd) {
		this.erpCd = erpCd;
	}
	public void setRef1(String ref1) {
		this.ref1 = ref1;
	}
	public void setRef2(String ref2) {
		this.ref2 = ref2;
	}
	public void setRef3(String ref3) {
		this.ref3 = ref3;
	}
	private Date updateTimeField ;
    private String no ;
    private String cd;
    private String cdNm;
    private String erpCd;
    private String ref1;
    private String ref2;
    private String ref3;

    
    public String getCd() {
		return cd;
	}
	public void setCd(String cd) {
		this.cd = cd;
	}
	public String getCodeCostCenter() {
        return codeCostCenter;
    }
    public void setCodeCostCenter(String codeCostCenter) {
        this.codeCostCenter = codeCostCenter;
    }
    public String getCodeDescription() {
        return codeDescription;
    }
    public void setCodeDescription(String codeDescription) {
        this.codeDescription = codeDescription;
    }
    public String getCodeSBU() {
        return codeSBU;
    }
    public void setCodeSBU(String codeSBU) {
        this.codeSBU = codeSBU;
    }
    public String getCodeStaff() {
        return codeStaff;
    }
    public void setCodeStaff(String codeStaff) {
        this.codeStaff = codeStaff;
    }
    public String getDateUpdate() {
        return dateUpdate;
    }
    public void setDateUpdate(String dateUpdate) {
        this.dateUpdate = dateUpdate;
    }
    public String getTypeCargo() {
        return typeCargo;
    }
    public void setTypeCargo(String typeCargo) {
        this.typeCargo = typeCargo;
    }
    public String getTypeDelivery() {
        return typeDelivery;
    }
    public void setTypeDelivery(String typeDelivery) {
        this.typeDelivery = typeDelivery;
    }
    public String getNo() {
        return no;
    }
    public void setNo(String no) {
        this.no = no;
    }
    public String getCodeSBUName() {
        return codeSBUName;
    }
    public void setCodeSBUName(String codeSBUName) {
        this.codeSBUName = codeSBUName;
    }
    public String getTypeCargoName() {
        return typeCargoName;
    }
    public void setTypeCargoName(String typeCargoName) {
        this.typeCargoName = typeCargoName;
    }
    public String getTypeDeliveryName() {
        return typeDeliveryName;
    }
    public void setTypeDeliveryName(String typeDeliveryName) {
        this.typeDeliveryName = typeDeliveryName;
    } 
    public String getCodeFinancial() {
        return codeFinancial;
    }
    public void setCodeFinancial(String codeFinancial) {
        this.codeFinancial = codeFinancial;
    }
	public Date getUpdateTimeField() {
		return updateTimeField;
	}
	public void setUpdateTimeField(Date updateTimeField) {
		this.updateTimeField = updateTimeField;
	}

	
}
