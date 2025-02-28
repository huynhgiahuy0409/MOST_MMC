/**
*
* COPYRIGHT (ACT) 1988-2015 TOTAL SOFT BANK LTD ALL RIGHT RESERVED
*
* FILE NAME : com.pcs.dataitem.admin.UserItem.java
* CREATE ON : 2015. 4. 14.
* CLASS DESCRIPTION :
*
* 
* CHANGE REVISION
* --------------------------------------------------------------------------
* DATE            AUTHOR                       REVISION    
* --------------------------------------------------------------------------
* 2015. 4. 14.     Alex.Min             First release.
* --------------------------------------------------------------------------
*
*/
package com.tsb.most.basebiz.dataitem.vms;

//import com.pcs.foundation.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItem;

public class StatisticsItem extends DataItem {
	
    private	String	customerAlias;
    private	String	customerCode;
	private	String	customerName;
	private	String	month;
	private	String	pol;
	private	String	polName;
	private	String	pod;
	private	int	amount;
	private    float percent;
	
	
    public String getMonth() {
        return month;
    }
    public void setMonth(String month) {
        this.month = month;
    }
    public int getAmount() {
        return amount;
    }
    public void setAmount(int amount) {
        this.amount = amount;
    }
    public String getCustomerCode() {
        return customerCode;
    }
    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
    }
    public String getCustomerName() {
        return customerName;
    }
    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }
    public String getPol() {
        return pol;
    }
    public void setPol(String pol) {
        this.pol = pol;
    }
    public String getPod() {
        return pod;
    }
    public void setPod(String pod) {
        this.pod = pod;
    }
    public float getPercent() {
        return percent;
    }
    public void setPercent(float percent) {
        this.percent = percent;
    }
    public String getCustomerAlias() {
        return customerAlias;
    }
    public void setCustomerAlias(String customerAlias) {
        this.customerAlias = customerAlias;
    }
    public String getPolName() {
        return polName;
    }
    public void setPolName(String polName) {
        this.polName = polName;
    }
	
	
}
