package com.tsb.most.biz.parm.dashboard;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchBBTDashboardParm extends BaseBizParm {

    public static final String TYPE_LIQUID = "LIQUID";
    public static final String TYPE_BREAK_DRY = "BREAK";

    private String workYmd;
    private String shftId;
    private String divCd;
    private String useYn;
    private String fmHhmm;
    private String toHhmm;
    private String type;

    // For bulk productivity parameter
    private boolean isSeparateCrane;

    public String getWorkYmd() {
        return workYmd;
    }

    public void setWorkYmd(String workYmd) {
        this.workYmd = workYmd;
    }

    public String getShftId() {
        return shftId;
    }

    public void setShftId(String shftId) {
        this.shftId = shftId;
    }

    public String getFmHhmm() {
        return fmHhmm;
    }

    public void setFmHhmm(String fmHhmm) {
        this.fmHhmm = fmHhmm;
    }

    public String getToHhmm() {
        return toHhmm;
    }

    public void setToHhmm(String toHhmm) {
        this.toHhmm = toHhmm;
    }

    public boolean getIsSeparateCrane() {
        return isSeparateCrane;
    }

    public void setIsSeparateCrane(boolean isSeparateCrane) {
        this.isSeparateCrane = isSeparateCrane;
    }

	public String getDivCd() {
		return divCd;
	}

	public void setDivCd(String divCd) {
		this.divCd = divCd;
	}

	public String getUseYn() {
		return useYn;
	}

	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
    
}