package com.tsb.most.basebiz.dataitem.vms;

//import com.pcs.foundation.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItem;

public class PriorityItem extends DataItem{
    

    private static final long serialVersionUID = -6399688897894980441L;
    private String priorityId;
    private int sequence;
    private String customerAlias;
    private int thredhold;
    private String customers;
    public String getPriorityId() {
        return priorityId;
    }
    public void setPriorityId(String priorityId) {
        this.priorityId = priorityId;
    }
    public int getSequence() {
        return sequence;
    }
    public void setSequence(int sequence) {
        this.sequence = sequence;
    }
    public String getCustomerAlias() {
        return customerAlias;
    }
    public void setCustomerAlias(String customerAlias) {
        this.customerAlias = customerAlias;
    }
    public int getThredhold() {
        return thredhold;
    }
    public void setThredhold(int thredhold) {
        this.thredhold = thredhold;
    }
    public String getCustomers() {
        return customers;
    }
    public void setCustomers(String customers) {
        this.customers = customers;
    }
    
	
    
}