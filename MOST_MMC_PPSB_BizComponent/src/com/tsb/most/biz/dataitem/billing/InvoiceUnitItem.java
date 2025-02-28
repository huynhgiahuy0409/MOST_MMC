/**
* InvoiceUnitItem.java
*
* Created on   : Dec 3, 2007
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* Dec 3, 2007   An Doan 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.billing;

import java.util.ArrayList;
import java.util.Date;

import com.tsb.most.framework.dataitem.DataItem;

/**
 * @author Thuy An
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class InvoiceUnitItem extends DataItem {
    private String unitCd;
    private String unitTpCd;
    private String unitTpNm;
    private String descr;
    private String no;
    private Date updateTimeField;
    private String messageCode;
    
    public String getMessageCode() {
		return messageCode;
	}
	public void setMessageError(String messageCode) {
		this.messageCode = messageCode;
	}
	private ArrayList<InvoiceUnitItem> items;
    
    public String getDescr() {
        return descr;
    }
    public void setDescr(String descr) {
        this.descr = descr;
    }
    public String getUnitCd() {
        return unitCd;
    }
    public void setUnitCd(String unitCd) {
        this.unitCd = unitCd;
    }
    public String getUnitTpCd() {
        return unitTpCd;
    }
    public void setUnitTpCd(String unitTpCd) {
        this.unitTpCd = unitTpCd;
    }
    public String getNo() {
        return no;
    }
    public void setNo(String no) {
        this.no = no;
    }
    public String getUnitTpNm() {
        return unitTpNm;
    }
    public void setUnitTpNm(String unitTpNm) {
        this.unitTpNm = unitTpNm;
    }
	public ArrayList<InvoiceUnitItem> getItems() {
		return items;
	}
	public void setItems(ArrayList<InvoiceUnitItem> items) {
		this.items = items;
	}
	public Date getUpdateTimeField() {
		return updateTimeField;
	}
	public void setUpdateTimeField(Date updateTimeField) {
		this.updateTimeField = updateTimeField;
	}
	
}
