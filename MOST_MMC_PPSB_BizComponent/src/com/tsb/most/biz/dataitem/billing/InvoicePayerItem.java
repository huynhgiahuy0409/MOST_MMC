package com.tsb.most.biz.dataitem.billing;

import java.util.ArrayList;

import com.tsb.most.framework.dataitem.DataItem;

public class InvoicePayerItem extends DataItem {

    
    private String ptnrCd;
    private String engSnm;
    private String ptnrTpCd;
    private String accNo;
    private String addr;

    private String ivNo;
    private ArrayList ivNoList;
    private String ivPrfx;
    private String payer;
    
    private ArrayList<InvoicePayerItem>ivPrfxlists;
    private ArrayList<InvoicePayerItem>payerList;
    
    public String getIvNo() {
        return ivNo;
    }
    public void setIvNo(String ivNo) {
        this.ivNo = ivNo;
    }
    public ArrayList getIvNoList() {
        return ivNoList;
    }
    public void setIvNoList(ArrayList ivNoList) {
        this.ivNoList = ivNoList;
    }
    public void addIvNoList(String str){
        if(this.ivNoList == null){
            this.ivNoList = new ArrayList();
        }
        this.ivNoList.add(str);
    }
    
    public String getAccNo() {
        return accNo;
    }
    public void setAccNo(String accNo) {
        this.accNo = accNo;
    }
    public String getAddr() {
        return addr;
    }
    public void setAddr(String addr) {
        this.addr = addr;
    }
    public String getEngSnm() {
        return engSnm;
    }
    public void setEngSnm(String engSnm) {
        this.engSnm = engSnm;
    }
    public String getPtnrCd() {
        return ptnrCd;
    }
    public void setPtnrCd(String ptnrCd) {
        this.ptnrCd = ptnrCd;
    }
    public String getPtnrTpCd() {
        return ptnrTpCd;
    }
    public void setPtnrTpCd(String ptnrTpCd) {
        this.ptnrTpCd = ptnrTpCd;
    }
    public String getIvPrfx() {
        return ivPrfx;
    }
    public void setIvPrfx(String ivPrfx) {
        this.ivPrfx = ivPrfx;
    }
	public ArrayList<InvoicePayerItem> getIvPrfxlists() {
		return ivPrfxlists;
	}
	public void setIvPrfxlists(ArrayList<InvoicePayerItem> ivPrfxlists) {
		this.ivPrfxlists = ivPrfxlists;
	}
	public String getPayer() {
		return payer;
	}
	public void setPayer(String payer) {
		this.payer = payer;
	}
	public ArrayList<InvoicePayerItem> getPayerList() {
		return payerList;
	}
	public void setPayerList(ArrayList<InvoicePayerItem> payerList) {
		this.payerList = payerList;
	}
}
