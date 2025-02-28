package com.tsb.most.biz.parm.planning;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchShipInPortParm extends BaseBizParm {
    private String dateFm;
    private String dateTo;
    private String berthLoc;
    private String searchTp;
    private String exportTp;
    private String userId;
    
    private String atb;
    
    private String jpvc;
    
    public String getDateFm() {
        return dateFm;
    }
    public void setDateFm(String dateFm) {
        this.dateFm = dateFm;
    }
    public String getDateTo() {
        return dateTo;
    }
    public void setDateTo(String dateTo) {
        this.dateTo = dateTo;
    }
    public String getSearchTp() {
        return searchTp;
    }
    public void setSearchTp(String searchTp) {
        this.searchTp = searchTp;
    }
    public String getBerthLoc() {
        return berthLoc;
    }
    public void setBerthLoc(String berthLoc) {
        this.berthLoc = berthLoc;
    }
    public String getJpvc() {
        return jpvc;
    }
    public void setJpvc(String jpvc) {
        this.jpvc = jpvc;
    }
    public String getAtb() {
        return atb;
    }
    public void setAtb(String atb) {
        this.atb = atb;
    }
	public String getExportTp() {
		return exportTp;
	}
	public void setExportTp(String exportTp) {
		this.exportTp = exportTp;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
}
