package com.tsb.most.basebiz.parm.configuration;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchServiceOrderSettingParm extends BaseBizParm {

    private String category1;
    private int seq;
    private String category2;
    private String category3;
    private String payTpCd;
    private String prcTpCd;
    private String scdLgv;

    public String getCategory1() {
        return category1;
    }

    public void setCategory1(String category1) {
        this.category1 = category1;
    }

    public int getSeq() {
        return seq;
    }

    public void setSeq(int seq) {
        this.seq = seq;
    }

    public String getCategory2() {
        return category2;
    }

    public void setCategory2(String category2) {
        this.category2 = category2;
    }

    public String getCategory3() {
        return category3;
    }

    public void setCategory3(String category3) {
        this.category3 = category3;
    }

    public String getPayTpCd() {
        return payTpCd;
    }

    public void setPayTpCd(String payTpCd) {
        this.payTpCd = payTpCd;
    }

    public String getPrcTpCd() {
        return prcTpCd;
    }

    public void setPrcTpCd(String prcTpCd) {
        this.prcTpCd = prcTpCd;
    }

	public String getScdLgv() {
		return scdLgv;
	}

	public void setScdLgv(String scdLgv) {
		this.scdLgv = scdLgv;
	}
    
    
}
