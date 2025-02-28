package com.tsb.most.basebiz.dataitem.configuration;

import com.tsb.most.framework.dataitem.DataItem;

public class BerthLocationConfigurationItem extends DataItem {

	private static final long serialVersionUID = -5521795513034282101L;
	private String berthCd ;
	private String berthNm ;
	private String berthTp ;
	private String berthTpNm ;
	private String locCd ;
	private String pstSta ;
	private String pstEnd ;
	private String length ;
	private String huydrantYn ;
	private String elecYn ;
	private String ispsInfo ;
	private String berthOwn ;
	private String berthDepth ;
	private String chartDepth ;
	private String keelClr ;
	private String minParalDdy ;
	private String maxLenVsl ;
	private String maxHgtDft ;
	private String maxHgtMfld ;
	private String minHgtMfld ;
	private String insUserId ;
	private String insDtm ;
	private String updUserId ;
	private String updDtm ;
	private String cboGrpList ;

	private String depYn ;
	private String sysOdr ;
	private String check;
	private String freezoneYn;
	private String grpCd;
	private String area;
	private String areaAddr;
	private String chagMooBoat;
	private String tmnl;
	private String locNm;
	
	private String horizontal;
	private String vertical;
	private String rotate;
	private String color;
	private String displacement;
	private String bollardWharfMark;
	private String loa;
	private String draught;
	
	public String getHorizontal() {
		return horizontal;
	}

	public void setHorizontal(String horizontal) {
		this.horizontal = horizontal;
	}

	public String getVertical() {
		return vertical;
	}

	public void setVertical(String vertical) {
		this.vertical = vertical;
	}

	public String getRotate() {
		return rotate;
	}

	public void setRotate(String rotate) {
		this.rotate = rotate;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getCheck() {
	    return check;
	}

	public void setCheck(String check) {
	    this.check = check;
	}

	public String getDepYn() {
		return depYn;
	}

	public void setDepYn(String depYn) {
		this.depYn = depYn;
	}

	public String getSysOdr() {
		return sysOdr;
	}

	public void setSysOdr(String sysOdr) {
		this.sysOdr = sysOdr;
	}

	/**
	 * @return the maxLenVsl
	 */
	public String getMaxLenVsl() {
		return maxLenVsl;
	}

	/**
	 * @param maxLenVsl
	 *            the maxLenVsl to set
	 */
	public void setMaxLenVsl(String maxLenVsl) {
		this.maxLenVsl = maxLenVsl;
	}

	/**
	 * @return the cboGrpList
	 */
	public String getCboGrpList() {
		return cboGrpList;
	}

	/**
	 * @param cboGrpList
	 *            the cboGrpList to set
	 */
	public void setCboGrpList(String cboGrpList) {
		this.cboGrpList = cboGrpList;
	}

	/**
	 * @return the berthTp
	 */
	public String getBerthTp() {
		return berthTp;
	}

	/**
	 * @param berthTp
	 *            the berthTp to set
	 */
	public void setBerthTp(String berthTp) {
		this.berthTp = berthTp;
	}

	/**
	 * @return the berthCd
	 */
	public String getBerthCd() {
		return berthCd;
	}

	/**
	 * @param berthCd
	 *            the berthCd to set
	 */
	public void setBerthCd(String berthCd) {
		this.berthCd = berthCd;
	}

	/**
	 * @return the berthDepth
	 */
	public String getBerthDepth() {
		return berthDepth;
	}

	/**
	 * @param berthDepth
	 *            the berthDepth to set
	 */
	public void setBerthDepth(String berthDepth) {
		this.berthDepth = berthDepth;
	}

	/**
	 * @return the berthNm
	 */
	public String getBerthNm() {
		return berthNm;
	}

	/**
	 * @param berthNm
	 *            the berthNm to set
	 */
	public void setBerthNm(String berthNm) {
		this.berthNm = berthNm;
	}

	/**
	 * @return the berthOwn
	 */
	public String getBerthOwn() {
		return berthOwn;
	}

	/**
	 * @param berthOwn
	 *            the berthOwn to set
	 */
	public void setBerthOwn(String berthOwn) {
		this.berthOwn = berthOwn;
	}

	/**
	 * @return the chartDepth
	 */
	public String getChartDepth() {
		return chartDepth;
	}

	/**
	 * @param chartDepth
	 *            the chartDepth to set
	 */
	public void setChartDepth(String chartDepth) {
		this.chartDepth = chartDepth;
	}

	/**
	 * @return the elecYn
	 */
	public String getElecYn() {
		return elecYn;
	}

	/**
	 * @param elecYn
	 *            the elecYn to set
	 */
	public void setElecYn(String elecYn) {
		this.elecYn = elecYn;
	}

	/**
	 * @return the huydrantYn
	 */
	public String getHuydrantYn() {
		return huydrantYn;
	}

	/**
	 * @param huydrantYn
	 *            the huydrantYn to set
	 */
	public void setHuydrantYn(String huydrantYn) {
		this.huydrantYn = huydrantYn;
	}

	/**
	 * @return the insDtm
	 */
	public String getInsDtm() {
		return insDtm;
	}

	/**
	 * @param insDtm
	 *            the insDtm to set
	 */
	public void setInsDtm(String insDtm) {
		this.insDtm = insDtm;
	}

	/**
	 * @return the insUserId
	 */
	public String getInsUserId() {
		return insUserId;
	}

	/**
	 * @param insUserId
	 *            the insUserId to set
	 */
	public void setInsUserId(String insUserId) {
		this.insUserId = insUserId;
	}

	/**
	 * @return the ispsInfo
	 */
	public String getIspsInfo() {
		return ispsInfo;
	}

	/**
	 * @param ispsInfo
	 *            the ispsInfo to set
	 */
	public void setIspsInfo(String ispsInfo) {
		this.ispsInfo = ispsInfo;
	}

	/**
	 * @return the keelClr
	 */
	public String getKeelClr() {
		return keelClr;
	}

	/**
	 * @param keelClr
	 *            the keelClr to set
	 */
	public void setKeelClr(String keelClr) {
		this.keelClr = keelClr;
	}

	/**
	 * @return the length
	 */
	public String getLength() {
		return length;
	}

	/**
	 * @param length
	 *            the length to set
	 */
	public void setLength(String length) {
		this.length = length;
	}

	/**
	 * @return the locCd
	 */
	public String getLocCd() {
		return locCd;
	}

	/**
	 * @param locCd
	 *            the locCd to set
	 */
	public void setLocCd(String locCd) {
		this.locCd = locCd;
	}

	/**
	 * @return the maxHgtDft
	 */
	public String getMaxHgtDft() {
		return maxHgtDft;
	}

	/**
	 * @param maxHgtDft
	 *            the maxHgtDft to set
	 */
	public void setMaxHgtDft(String maxHgtDft) {
		this.maxHgtDft = maxHgtDft;
	}

	/**
	 * @return the maxHgtMfld
	 */
	public String getMaxHgtMfld() {
		return maxHgtMfld;
	}

	/**
	 * @param maxHgtMfld
	 *            the maxHgtMfld to set
	 */
	public void setMaxHgtMfld(String maxHgtMfld) {
		this.maxHgtMfld = maxHgtMfld;
	}

	/**
	 * @return the minHgtMfld
	 */
	public String getMinHgtMfld() {
		return minHgtMfld;
	}

	/**
	 * @param minHgtMfld
	 *            the minHgtMfld to set
	 */
	public void setMinHgtMfld(String minHgtMfld) {
		this.minHgtMfld = minHgtMfld;
	}

	/**
	 * @return the minParalDdy
	 */
	public String getMinParalDdy() {
		return minParalDdy;
	}

	/**
	 * @param minParalDdy
	 *            the minParalDdy to set
	 */
	public void setMinParalDdy(String minParalDdy) {
		this.minParalDdy = minParalDdy;
	}

	/**
	 * @return the pstEnd
	 */
	public String getPstEnd() {
		return pstEnd;
	}

	/**
	 * @param pstEnd
	 *            the pstEnd to set
	 */
	public void setPstEnd(String pstEnd) {
		this.pstEnd = pstEnd;
	}

	/**
	 * @return the pstSta
	 */
	public String getPstSta() {
		return pstSta;
	}

	/**
	 * @param pstSta
	 *            the pstSta to set
	 */
	public void setPstSta(String pstSta) {
		this.pstSta = pstSta;
	}

	/**
	 * @return the updDtm
	 */
	public String getUpdDtm() {
		return updDtm;
	}

	/**
	 * @param updDtm
	 *            the updDtm to set
	 */
	public void setUpdDtm(String updDtm) {
		this.updDtm = updDtm;
	}

	/**
	 * @return the updUserId
	 */
	public String getUpdUserId() {
		return updUserId;
	}

	/**
	 * @param updUserId
	 *            the updUserId to set
	 */
	public void setUpdUserId(String updUserId) {
		this.updUserId = updUserId;
	}

	public String getBerthTpNm() {
		return berthTpNm;
	}

	public void setBerthTpNm(String berthTpNm) {
		this.berthTpNm = berthTpNm;
	}

	public String getFreezoneYn() {
		return freezoneYn;
	}

	public void setFreezoneYn(String freezoneYn) {
		this.freezoneYn = freezoneYn;
	}

	public String getGrpCd() {
		return grpCd;
	}

	public void setGrpCd(String grpCd) {
		this.grpCd = grpCd;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getAreaAddr() {
		return areaAddr;
	}

	public void setAreaAddr(String areaAddr) {
		this.areaAddr = areaAddr;
	}

	public String getChagMooBoat() {
		return chagMooBoat;
	}

	public void setChagMooBoat(String chagMooBoat) {
		this.chagMooBoat = chagMooBoat;
	}

	public String getTmnl() {
		return tmnl;
	}

	public void setTmnl(String tmnl) {
		this.tmnl = tmnl;
	}

	public String getLocNm() {
		return locNm;
	}

	public void setLocNm(String locNm) {
		this.locNm = locNm;
	}

	public String getDisplacement() {
		return displacement;
	}

	public void setDisplacement(String displacement) {
		this.displacement = displacement;
	}

	public String getBollardWharfMark() {
		return bollardWharfMark;
	}

	public void setBollardWharfMark(String bollardWharfMark) {
		this.bollardWharfMark = bollardWharfMark;
	}

	public String getLoa() {
		return loa;
	}

	public void setLoa(String loa) {
		this.loa = loa;
	}

	public String getDraught() {
		return draught;
	}

	public void setDraught(String draught) {
		this.draught = draught;
	}
	
	

	/**
	 * @return Returns the area.
	 */

}
