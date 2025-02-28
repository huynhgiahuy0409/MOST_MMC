/**
* PackageTariffRateItem.java
*
* Created on   : Dec 17, 2007
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* Dec 17, 2007   An Doan 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.billing;

import java.util.ArrayList;

import com.tsb.most.framework.dataitem.DataItem;

/**
 * @author Thuy An
 *
 *         TODO To change the template for this generated type comment go to
 *         Window - Preferences - Java - Code Style - Code Templates
 */
public class PackageTariffRateItem extends DataItem {
	private String trfRegNo;
	private String unitPrc;
	private String pkgPrc;
	private String ptnrCd;
	private String aplyYmd;
	private String exprYmd;
	private String pkgTrfNo;
	private String prcTpCd;
	private String pkgNm;
	private String rmk;
	private String trfCd;
	private String subTrfCd;
	private String descr;
	private String trfTpCd;
	private String billTpCd;
	private String costCntCd;
	private String ssrTpCd;
	private String pyrTpCd;
	private String ivUnit1;
	private String ivUnit2;
	private String ivUnit3;
	private String minVal1;
	private String minVal2;
	private String minVal3;
	private String no;

	private String vessels;

	private String berthCd;
	private String berthNm;
	private String portion;
	private String stdPrc;
	private String updTime;
	private String userId;
	private String pkgRate;
	private int count;

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public String getPkgRate() {
		return pkgRate;
	}

	public void setPkgRate(String pkgRate) {
		this.pkgRate = pkgRate;
	}

	private String workingStatus;
	private String crud;

	public String getCrud() {
		return crud;
	}

	public void setCrud(String crud) {
		this.crud = crud;
	}

	public String getWorkingStatus() {
		return workingStatus;
	}

	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}

	public String getUserId() {
		return userId;
	}

	public void setUpdTime(String updTime) {
		this.updTime = updTime;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUpdTime() {
		return updTime;
	}

	private ArrayList<PackageTariffRateItem> sumList;
	private ArrayList<PackageTariffRateItem> packTrfList;
	private ArrayList<PackageConditionItem> condsList;
	private ArrayList<PackageConditionPropertyItem> prptList;

	public ArrayList<PackageTariffRateItem> getSumList() {
		return sumList;
	}

	public ArrayList<PackageTariffRateItem> getPackTrfList() {
		return packTrfList;
	}

	public ArrayList<PackageConditionItem> getCondsList() {
		return condsList;
	}

	public ArrayList<PackageConditionPropertyItem> getPrptList() {
		return prptList;
	}

	public void setSumList(ArrayList<PackageTariffRateItem> sumList) {
		this.sumList = sumList;
	}

	public void setPackTrfList(ArrayList<PackageTariffRateItem> packTrfList) {
		this.packTrfList = packTrfList;
	}

	public void setCondsList(ArrayList<PackageConditionItem> condsList) {
		this.condsList = condsList;
	}

	public void setPrptList(ArrayList<PackageConditionPropertyItem> prptList) {
		this.prptList = prptList;
	}

	public String getStdPrc() {
		return stdPrc;
	}

	public void setStdPrc(String stdPrc) {
		this.stdPrc = stdPrc;
	}

	public String getPortion() {
		return portion;
	}

	public void setPortion(String portion) {
		this.portion = portion;
	}

	public String getUnitPrc() {
		return unitPrc;
	}

	public void setUnitPrc(String unitPrc) {
		this.unitPrc = unitPrc;
	}

	public String getVessels() {
		return vessels;
	}

	public void setVessels(String vessels) {
		this.vessels = vessels;
	}

	public String getCostCntCd() {
		return costCntCd;
	}

	public void setCostCntCd(String costCntCd) {
		this.costCntCd = costCntCd;
	}

	public String getMinVal1() {
		return minVal1;
	}

	public void setMinVal1(String minVal1) {
		this.minVal1 = minVal1;
	}

	public String getMinVal2() {
		return minVal2;
	}

	public void setMinVal2(String minVal2) {
		this.minVal2 = minVal2;
	}

	public String getMinVal3() {
		return minVal3;
	}

	public void setMinVal3(String minVal3) {
		this.minVal3 = minVal3;
	}

	public String getPtnrCd() {
		return ptnrCd;
	}

	public void setPtnrCd(String ptnrCd) {
		this.ptnrCd = ptnrCd;
	}

	public String getPyrTpCd() {
		return pyrTpCd;
	}

	public void setPyrTpCd(String pyrTpCd) {
		this.pyrTpCd = pyrTpCd;
	}

	public String getSsrTpCd() {
		return ssrTpCd;
	}

	public void setSsrTpCd(String ssrTpCd) {
		this.ssrTpCd = ssrTpCd;
	}

	public String getAplyYmd() {
		return aplyYmd;
	}

	public void setAplyYmd(String aplyYmd) {
		this.aplyYmd = aplyYmd;
	}

	public String getBillTpCd() {
		return billTpCd;
	}

	public void setBillTpCd(String billTpCd) {
		this.billTpCd = billTpCd;
	}

	public String getDescr() {
		return descr;
	}

	public void setDescr(String descr) {
		this.descr = descr;
	}

	public String getExprYmd() {
		return exprYmd;
	}

	public void setExprYmd(String exprYmd) {
		this.exprYmd = exprYmd;
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

	public String getNo() {
		return no;
	}

	public void setNo(String no) {
		this.no = no;
	}

	public String getPkgNm() {
		return pkgNm;
	}

	public void setPkgNm(String pkgNm) {
		this.pkgNm = pkgNm;
	}

	public String getPkgTrfNo() {
		return pkgTrfNo;
	}

	public void setPkgTrfNo(String pkgTrfNo) {
		this.pkgTrfNo = pkgTrfNo;
	}

	public String getPrcTpCd() {
		return prcTpCd;
	}

	public void setPrcTpCd(String prcTpCd) {
		this.prcTpCd = prcTpCd;
	}

	public String getRmk() {
		return rmk;
	}

	public void setRmk(String rmk) {
		this.rmk = rmk;
	}

	public String getTrfCd() {
		return trfCd;
	}

	public void setTrfCd(String trfCd) {
		this.trfCd = trfCd;
	}

	public String getTrfTpCd() {
		return trfTpCd;
	}

	public void setTrfTpCd(String trfTpCd) {
		this.trfTpCd = trfTpCd;
	}

	public String getPkgPrc() {
		return pkgPrc;
	}

	public void setPkgPrc(String unitPrc) {
		this.pkgPrc = unitPrc;
	}

	public String getSubTrfCd() {
		return subTrfCd;
	}

	public void setSubTrfCd(String subTrfCd) {
		this.subTrfCd = subTrfCd;
	}

	public String getTrfRegNo() {
		return trfRegNo;
	}

	public void setTrfRegNo(String trfRegNo) {
		this.trfRegNo = trfRegNo;
	}

	public String getBerthCd() {
		return berthCd;
	}

	public void setBerthCd(String berthCd) {
		this.berthCd = berthCd;
	}

	public String getBerthNm() {
		return berthNm;
	}

	public void setBerthNm(String berthNm) {
		this.berthNm = berthNm;
	}
}
