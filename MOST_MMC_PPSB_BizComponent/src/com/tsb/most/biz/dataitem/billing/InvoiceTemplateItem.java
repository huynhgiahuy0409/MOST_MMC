/**
* InvoiceTemplateItem.java
*
* Created on   : Nov 4, 2008
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* Nov 4, 2008   Nghiala 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.billing;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

/**
 * @author Nghiala
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class InvoiceTemplateItem extends DataItem {
    
    private String templateCd;
    private String templateNm;
    private String payer;
    private String deliveryTpCd;
    private String cargoTpCd;
    private String category;
    private String descr;
    private String updUserId;
    private String updTime;
    private String version;
    
    //tariff type details
    private String trfCd;
    private String trfTpCd;
    private String subTrfCd;
    private String trfTpCdNm;
    private String ivUnit1;
    private String ivUnit2;
    private String ivUnit3;

    private List templateList;
    private List partnerCodedTypeList;
    private List tariffList;
    private ArrayList<InvoiceTemplateItem> items;
    private ArrayList<TariffCodeItem> tariffTypeItems;
    
    private List tariffItems;
    private String workingStatus;
    private String selectedFlag;
    private String billTpCd;
    private String ssrTpCd;
    private String costCntCd;
    private String pyrTpCd;
    private String gstTpCd;
    
	public String getSubTrfCd() {
        return subTrfCd;
    }
    public void setSubTrfCd(String subTrfCd) {
        this.subTrfCd = subTrfCd;
    }
    public String getTrfCd() {
        return trfCd;
    }
    public void setTrfCd(String trfCd) {
        this.trfCd = trfCd;
    }
    
    
    public String getCargoTpCd() {
        return cargoTpCd;
    }
    public void setCargoTpCd(String cargoTpCd) {
        this.cargoTpCd = cargoTpCd;
    }
    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    public String getDeliveryTpCd() {
        return deliveryTpCd;
    }
    public void setDeliveryTpCd(String deliveryTpCd) {
        this.deliveryTpCd = deliveryTpCd;
    }
    public String getDescr() {
        return descr;
    }
    public void setDescr(String descr) {
        this.descr = descr;
    }
    public String getPayer() {
        return payer;
    }
    public void setPayer(String payer) {
        this.payer = payer;
    }
    public String getTemplateCd() {
        return templateCd;
    }
    public void setTemplateCd(String templateCd) {
        this.templateCd = templateCd;
    }
    public String getTemplateNm() {
        return templateNm;
    }
    public void setTemplateNm(String templateNm) {
        this.templateNm = templateNm;
    }
    public String getUpdTime() {
        return updTime;
    }
    public void setUpdTime(String updTime) {
        this.updTime = updTime;
    }
    public String getUpdUserId() {
        return updUserId;
    }
    public void setUpdUserId(String updUserId) {
        this.updUserId = updUserId;
    }
    public String getVersion() {
        return version;
    }
    public void setVersion(String version) {
        this.version = version;
    }
	public List getPartnerCodedTypeList() {
		return partnerCodedTypeList;
	}
	public List getTemplateList() {
		return templateList;
	}
	public void setTemplateList(List templateList) {
		this.templateList = templateList;
	}
	public void setPartnerCodedTypeList(List partnerCodedTypeList) {
		this.partnerCodedTypeList = partnerCodedTypeList;
	}
	public List getTariffList() {
		return tariffList;
	}
	public void setTariffList(List tariffList) {
		this.tariffList = tariffList;
	}
	public ArrayList<InvoiceTemplateItem> getItems() {
		return items;
	}
	public void setItems(ArrayList<InvoiceTemplateItem> items) {
		this.items = items;
	}
	public List getTariffItems() {
		return tariffItems;
	}
	public void setTariffItems(List tariffItems) {
		this.tariffItems = tariffItems;
	}
	public String getWorkingStatus() {
		return workingStatus;
	}
	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}
	public ArrayList<TariffCodeItem> getTariffTypeItems() {
		return tariffTypeItems;
	}
	public void setTariffTypeItems(ArrayList<TariffCodeItem> tariffTypeItems) {
		this.tariffTypeItems = tariffTypeItems;
	}
	public String getTrfTpCd() {
		return trfTpCd;
	}
	public void setTrfTpCd(String trfTpCd) {
		this.trfTpCd = trfTpCd;
	}
	public String getTrfTpCdNm() {
		return trfTpCdNm;
	}
	public void setTrfTpCdNm(String trfTpCdNm) {
		this.trfTpCdNm = trfTpCdNm;
	}
	public String getIvUnit1() {
		return ivUnit1;
	}
	public void setIvUnit1(String ivUnit1) {
		this.ivUnit1 = ivUnit1;
	}
	public String getIvUnit2() {
		return ivUnit2;
	}
	public void setIvUnit2(String ivUnit2) {
		this.ivUnit2 = ivUnit2;
	}
	public String getIvUnit3() {
		return ivUnit3;
	}
	public void setIvUnit3(String ivUnit3) {
		this.ivUnit3 = ivUnit3;
	}
	public String getSelectedFlag() {
		return selectedFlag;
	}
	public void setSelectedFlag(String selectedFlag) {
		this.selectedFlag = selectedFlag;
	}
	public String getBillTpCd() {
		return billTpCd;
	}
	public void setBillTpCd(String billTpCd) {
		this.billTpCd = billTpCd;
	}
	public String getSsrTpCd() {
		return ssrTpCd;
	}
	public void setSsrTpCd(String ssrTpCd) {
		this.ssrTpCd = ssrTpCd;
	}
	public String getCostCntCd() {
		return costCntCd;
	}
	public void setCostCntCd(String costCntCd) {
		this.costCntCd = costCntCd;
	}
	public String getPyrTpCd() {
		return pyrTpCd;
	}
	public void setPyrTpCd(String pyrTpCd) {
		this.pyrTpCd = pyrTpCd;
	}
	public String getGstTpCd() {
		return gstTpCd;
	}
	public void setGstTpCd(String gstTpCd) {
		this.gstTpCd = gstTpCd;
	}
	
}
