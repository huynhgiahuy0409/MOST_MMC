package com.tsb.most.basebiz.parm.codes;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchGeneralCodeParm extends BaseBizParm {
	
    private String lcd;
    private String lcdNm;
	private String mcd;
	private String mcdNm;
	private String scd;
	private String scdNm;
	private String scdUse;
	private String scdLgv;
	private String scdVal;
	private String col1;
	private String col2;
	private String col3;
	private String col4;
	private String col5;
	private String tyCd;
	private String searchType; //ROLE:staff role
	private String divCd;
	private String pkgTypeCd;
	
    public String getCol1() {
        return col1;
    }
    public String getPkgTypeCd() {
		return pkgTypeCd;
	}
	public void setPkgTypeCd(String pkgTypeCd) {
		this.pkgTypeCd = pkgTypeCd;
	}
	public String getLcdNm() {
		return lcdNm;
	}
	public void setLcdNm(String lcdNm) {
		this.lcdNm = lcdNm;
	}
    public void setCol1(String col1) {
        this.col1 = col1;
    }
    public String getCol2() {
        return col2;
    }
    public void setCol2(String col2) {
        this.col2 = col2;
    }
    public String getCol3() {
        return col3;
    }
    public void setCol3(String col3) {
        this.col3 = col3;
    }
    public String getCol4() {
        return col4;
    }
    public void setCol4(String col4) {
        this.col4 = col4;
    }
    public String getCol5() {
        return col5;
    }
    public void setCol5(String col5) {
        this.col5 = col5;
    }
    public String getLcd() {
        return lcd;
    }
    public void setLcd(String lcd) {
        this.lcd = lcd;
    }
    public String getMcd() {
        return mcd;
    }
    public void setMcd(String mcd) {
        this.mcd = mcd;
    }
    public String getScd() {
        return scd;
    }
    public void setScd(String scd) {
        this.scd = scd;
    }
    public String getScdLgv() {
        return scdLgv;
    }
    public void setScdLgv(String scdLgv) {
        this.scdLgv = scdLgv;
    }
    public String getScdNm() {
        return scdNm;
    }
    public void setScdNm(String scdNm) {
        this.scdNm = scdNm;
    }
    public String getScdUse() {
        return scdUse;
    }
    public void setScdUse(String scdUse) {
        this.scdUse = scdUse;
    }
    public String getScdVal() {
        return scdVal;
    }
    public void setScdVal(String scdVal) {
        this.scdVal = scdVal;
    }
    public String getSearchType() {
        return searchType;
    }
    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }
    public String getTyCd() {
        return tyCd;
    }
    public void setTyCd(String tyCd) {
        this.tyCd = tyCd;
    }
	public String getDivCd() {
		return divCd;
	}
	public void setDivCd(String divCd) {
		this.divCd = divCd;
	}
	public String getMcdNm() {
		return mcdNm;
	}
	public void setMcdNm(String mcdNm) {
		this.mcdNm = mcdNm;
	}
}
