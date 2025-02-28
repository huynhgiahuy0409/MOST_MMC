/**
* CargoMovementItem.java
*
* Created on   : 2008-04-16
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2008-04-16     Mr Sunny Kim 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.planning;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.tsb.most.basebiz.dataitem.configuration.WhConfigurationItem;
import com.tsb.most.framework.dataitem.DataItem;

public class MovementListItem extends DataItem {

	private String workingStatus;
    private String cgNo;
    private String vslCallId;
    private String jobNo;
    private String jobTpCd;
    private String shftId;
    private int pkgQty;
    private double msrmt;
    private double wgt;
    private int fmPkgQty;
    private double fmMsrmt;
    private double fmWgt;
    private int cntrQty;
    private String fmLocId;
    private String toLocId;
    private String statCd;
    private String odrNo;
    private String jobPurpCd;
    private String delvTpCd;
    private String fnlOpeYn;
    private String fnlDelvYn;
    private String opeClassCd;
    private String catgNm;
    private String dmgYn;
    private String stsYn;
    private String shipgAgnt;
    private String fwrAgnt;
    private String shpr;
    private String shprNm;
    private String shprAddr;
    private String cnsne;
    private String cnsneNm;
    
    //add WH info
    private String locId;
    private String locNm;
    
    //add MvType
    private String mvTp;
    private String mvTpNm;
    
    private String mvDt;
    
    //add MovementList
    private String grItem;
    private String blSn;
    private String cargo;
    private String shpCng;
    
    private String allocateYN;
    private String no;
    private String jobGroup;
    private String shftNm;// add 20080625
    private String shftDt;//add 20080625 by sunny
    
//    private String nxLocId;
    
    //add inv_loc
    private String locQty;
    private String locWgt;
    private String locMsrmt;
    private String whTpCd;
    private String locArea;
    private String whId;// inventory max location
    //add MovmentConfirm 
    private String fmTotalLoc;
    private String toTotalLoc;
    private String fmLoc;
    private String toLoc;
    private String fmDmgLoc;
    private String toDmgLoc;
    private String fmShuLoc;
    private String toShuLoc;
//    private String fmDmgRhdlLoc;
//    private String toDmgRhdlLoc;
    private String fmDmgRhdlCLoc;
    private String toDmgRhdlCLoc;
    private String fmDmgRhdlRLoc;
    private String toDmgRhdlRLoc;
    private String fmShuRhdlCLoc;
    private String toShuRhdlCLoc;
    private String fmShuRhdlRLoc;
    private String toShuRhdlRLoc;
    
    private String fmSpSLoc; 
	private String toSpSLoc;
	private String fmSpSDmgLoc; 
	private String toSpSDmgLoc;
	private String fmSpSShuLoc;
	private String toSpSShuLoc;
	private String fmSpSDmgRhdlCLoc;
	private String toSpSDmgRhdlCLoc; 
	private String fmSpSDmgRhdlRLoc;
	private String toSpSDmgRhdlRLoc;
	private String fmSpSShuRhdlCLoc;
	private String toSpSShuRhdlCLoc; 
	private String fmSpSShuRhdlRLoc; 
	private String toSpSShuRhdlRLoc;
	
	private String fmSpOLoc; 
	private String toSpOLoc;
	private String fmSpODmgLoc; 
	private String toSpODmgLoc;
	private String fmSpOShuLoc;
	private String toSpOShuLoc;
	private String fmSpODmgRhdlCLoc;
	private String toSpODmgRhdlCLoc; 
	private String fmSpODmgRhdlRLoc;
	private String toSpODmgRhdlRLoc;
	private String fmSpOShuRhdlCLoc;
	private String toSpOShuRhdlCLoc; 
	private String fmSpOShuRhdlRLoc; 
	private String toSpOShuRhdlRLoc;
    
    //add 2009.01.21
    private String rhdlMode;//R,C
    private String shuYn;
    
    
//  add sunny job condition code
    private String jobCoCd;//Normal : G, Shout-Out : S, Damamge : D, 
	private String spCaCoCd;//Overlanded : O, Spare : S
	
    //-- start ADD 20090610 tnkytn Need for HHT
    //private ArrayList collection = new ArrayList();
    //-- end   ADD 20090610 tnkytn Need for HHT
    
    // KHH.2019.02.18
    private Date stDt;
    private Date endDt;
    
    // KHH.2019.02.11
    private List cargoTypeList;
    private List jobTypeList;
    private ArrayList<MovementListItem> items;
    private ArrayList<WhConfigurationItem> whItems;
    private List shiftList;

    public String getWorkingStatus() {
		return workingStatus;
	}

	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}

	/**
    * Function set a cgNo value
    * @param cgNo. 
    * @return void.
    */        
    public void setCgNo(String cgNo)
    {
        this.cgNo       = cgNo;
    }

    /**
    * Return a cgNo Value
    * @param void. 
    * @return String.
    */  
    public String getCgNo()
    {
        return cgNo;
    }

    /**
    * Function set a vslCallId value
    * @param vslCallId. 
    * @return void.
    */        
    public void setVslCallId(String vslCallId)
    {
        this.vslCallId       = vslCallId;
    }

    /**
    * Return a vslCallId Value
    * @param void. 
    * @return String.
    */  
    public String getVslCallId()
    {
        return vslCallId;
    }

    /**
    * Function set a jobNo value
    * @param jobNo. 
    * @return void.
    */        
    public void setJobNo(String jobNo)
    {
        this.jobNo       = jobNo;
    }

    /**
    * Return a jobNo Value
    * @param void. 
    * @return String.
    */  
    public String getJobNo()
    {
        return jobNo;
    }

    /**
    * Function set a jobTpCd value
    * @param jobTpCd. 
    * @return void.
    */        
    public void setJobTpCd(String jobTpCd)
    {
        this.jobTpCd       = jobTpCd;
    }

    /**
    * Return a jobTpCd Value
    * @param void. 
    * @return String.
    */  
    public String getJobTpCd()
    {
        return jobTpCd;
    }

    /**
    * Function set a shftId value
    * @param shftId. 
    * @return void.
    */        
    public void setShftId(String shftId)
    {
        this.shftId       = shftId;
    }

    /**
    * Return a shftId Value
    * @param void. 
    * @return String.
    */  
    public String getShftId()
    {
        return shftId;
    }

    /**
    * Function set a fmLocId value
    * @param fmLocId. 
    * @return void.
    */        
    public void setFmLocId(String fmLocId)
    {
        this.fmLocId       = fmLocId;
    }

    /**
    * Return a fmLocId Value
    * @param void. 
    * @return String.
    */  
    public String getFmLocId()
    {
        return fmLocId;
    }

    /**
    * Function set a toLocId value
    * @param toLocId. 
    * @return void.
    */        
    public void setToLocId(String toLocId)
    {
        this.toLocId       = toLocId;
    }

    /**
    * Return a toLocId Value
    * @param void. 
    * @return String.
    */  
    public String getToLocId()
    {
        return toLocId;
    }

    /**
    * Function set a statCd value
    * @param statCd. 
    * @return void.
    */        
    public void setStatCd(String statCd)
    {
        this.statCd       = statCd;
    }

    /**
    * Return a statCd Value
    * @param void. 
    * @return String.
    */  
    public String getStatCd()
    {
        return statCd;
    }

    /**
    * Function set a odrNo value
    * @param odrNo. 
    * @return void.
    */        
    public void setOdrNo(String odrNo)
    {
        this.odrNo       = odrNo;
    }

    /**
    * Return a odrNo Value
    * @param void. 
    * @return String.
    */  
    public String getOdrNo()
    {
        return odrNo;
    }

    /**
    * Function set a jobPurpCd value
    * @param jobPurpCd. 
    * @return void.
    */        
    public void setJobPurpCd(String jobPurpCd)
    {
        this.jobPurpCd       = jobPurpCd;
    }

    /**
    * Return a jobPurpCd Value
    * @param void. 
    * @return String.
    */  
    public String getJobPurpCd()
    {
        return jobPurpCd;
    }

    /**
    * Function set a delvTpCd value
    * @param delvTpCd. 
    * @return void.
    */        
    public void setDelvTpCd(String delvTpCd)
    {
        this.delvTpCd       = delvTpCd;
    }

    /**
    * Return a delvTpCd Value
    * @param void. 
    * @return String.
    */  
    public String getDelvTpCd()
    {
        return delvTpCd;
    }

    /**
    * Function set a fnlOpeYn value
    * @param fnlOpeYn. 
    * @return void.
    */        
    public void setFnlOpeYn(String fnlOpeYn)
    {
        this.fnlOpeYn       = fnlOpeYn;
    }

    /**
    * Return a fnlOpeYn Value
    * @param void. 
    * @return String.
    */  
    public String getFnlOpeYn()
    {
        return fnlOpeYn;
    }

    /**
    * Function set a fnlDelvYn value
    * @param fnlDelvYn. 
    * @return void.
    */        
    public void setFnlDelvYn(String fnlDelvYn)
    {
        this.fnlDelvYn       = fnlDelvYn;
    }

    /**
    * Return a fnlDelvYn Value
    * @param void. 
    * @return String.
    */  
    public String getFnlDelvYn()
    {
        return fnlDelvYn;
    }

    /**
    * Function set a opeClassCd value
    * @param opeClassCd. 
    * @return void.
    */        
    public void setOpeClassCd(String opeClassCd)
    {
        this.opeClassCd       = opeClassCd;
    }

    /**
    * Return a opeClassCd Value
    * @param void. 
    * @return String.
    */  
    public String getOpeClassCd()
    {
        return opeClassCd;
    }

    /**
    * Function set a dmgYn value
    * @param dmgYn. 
    * @return void.
    */        
    public void setDmgYn(String dmgYn)
    {
        this.dmgYn       = dmgYn;
    }

    /**
    * Return a dmgYn Value
    * @param void. 
    * @return String.
    */  
    public String getDmgYn()
    {
        return dmgYn;
    }

    /**
    * Function set a stsYn value
    * @param stsYn. 
    * @return void.
    */        
    public void setStsYn(String stsYn)
    {
        this.stsYn       = stsYn;
    }

    /**
    * Return a stsYn Value
    * @param void. 
    * @return String.
    */  
    public String getStsYn()
    {
        return stsYn;
    }

    /**
    * Function set a shipgAgnt value
    * @param shipgAgnt. 
    * @return void.
    */        
    public void setShipgAgnt(String shipgAgnt)
    {
        this.shipgAgnt       = shipgAgnt;
    }

    /**
    * Return a shipgAgnt Value
    * @param void. 
    * @return String.
    */  
    public String getShipgAgnt()
    {
        return shipgAgnt;
    }

    /**
    * Function set a fwrAgnt value
    * @param fwrAgnt. 
    * @return void.
    */        
    public void setFwrAgnt(String fwrAgnt)
    {
        this.fwrAgnt       = fwrAgnt;
    }

    /**
    * Return a fwrAgnt Value
    * @param void. 
    * @return String.
    */  
    public String getFwrAgnt()
    {
        return fwrAgnt;
    }

    /**
    * Function set a shpr value
    * @param shpr. 
    * @return void.
    */        
    public void setShpr(String shpr)
    {
        this.shpr       = shpr;
    }

    /**
    * Return a shpr Value
    * @param void. 
    * @return String.
    */  
    public String getShpr()
    {
        return shpr;
    }

    /**
    * Function set a shprNm value
    * @param shprNm. 
    * @return void.
    */        
    public void setShprNm(String shprNm)
    {
        this.shprNm       = shprNm;
    }

    /**
    * Return a shprNm Value
    * @param void. 
    * @return String.
    */  
    public String getShprNm()
    {
        return shprNm;
    }

    /**
    * Function set a shprAddr value
    * @param shprAddr. 
    * @return void.
    */        
    public void setShprAddr(String shprAddr)
    {
        this.shprAddr       = shprAddr;
    }

    /**
    * Return a shprAddr Value
    * @param void. 
    * @return String.
    */  
    public String getShprAddr()
    {
        return shprAddr;
    }

    /**
    * Function set a cnsne value
    * @param cnsne. 
    * @return void.
    */        
    public void setCnsne(String cnsne)
    {
        this.cnsne       = cnsne;
    }

    /**
    * Return a cnsne Value
    * @param void. 
    * @return String.
    */  
    public String getCnsne()
    {
        return cnsne;
    }

    /**
    * Function set a cnsneNm value
    * @param cnsneNm. 
    * @return void.
    */        
    public void setCnsneNm(String cnsneNm)
    {
        this.cnsneNm       = cnsneNm;
    }

    /**
    * Return a cnsneNm Value
    * @param void. 
    * @return String.
    */  
    public String getCnsneNm()
    {
        return cnsneNm;
    }



    public String getLocId() {
        return locId;
    }
    public void setLocId(String locId) {
        this.locId = locId;
    }
    public String getLocNm() {
        return locNm;
    }
    public void setLocNm(String locNm) {
        this.locNm = locNm;
    }
    public String getBlSn() {
        return blSn;
    }
    public void setBlSn(String blSn) {
        this.blSn = blSn;
    }
    public String getCargo() {
        return cargo;
    }
    public void setCargo(String cargo) {
        this.cargo = cargo;
    }
    public String getGrItem() {
        return grItem;
    }
    public void setGrItem(String grItem) {
        this.grItem = grItem;
    }
    public String getShpCng() {
        return shpCng;
    }
    public void setShpCng(String shpCng) {
        this.shpCng = shpCng;
    }
    public String getMvTp() {
        return mvTp;
    }
    public void setMvTp(String mvTp) {
        this.mvTp = mvTp;
    }
    public String getMvTpNm() {
        return mvTpNm;
    }
    public void setMvTpNm(String mvTpNm) {
        this.mvTpNm = mvTpNm;
    }
//    public String getNxLocId() {
//        return nxLocId;
//    }
//    public void setNxLocId(String nxLocId) {
//        this.nxLocId = nxLocId;
//    }
    public String getAllocateYN() {
        return allocateYN;
    }
    public void setAllocateYN(String allocateYN) {
        this.allocateYN = allocateYN;
    }
    public String getNo() {
        return no;
    }
    public void setNo(String no) {
        this.no = no;
    }
    public String getJobGroup() {
        return jobGroup;
    }
    public void setJobGroup(String jobGroup) {
        this.jobGroup = jobGroup;
    }
    public String getLocMsrmt() {
        return locMsrmt;
    }
    public void setLocMsrmt(String locMsrmt) {
        this.locMsrmt = locMsrmt;
    }
	public String getLocQty() {
	    return locQty;
	}
	public void setLocQty(String locQty) {
	    this.locQty = locQty;
	}
    public String getLocWgt() {
        return locWgt;
    }
    public void setLocWgt(String locWgt) {
        this.locWgt = locWgt;
    }
    public String getWhTpCd() {
        return whTpCd;
    }
    public void setWhTpCd(String whTpCd) {
        this.whTpCd = whTpCd;
    }
    public String getShftDt() {
        return shftDt;
    }
    public void setShftDt(String shftDt) {
        this.shftDt = shftDt;
    }
    public String getShftNm() {
        return shftNm;
    }
    public void setShftNm(String shftNm) {
        this.shftNm = shftNm;
    }
    /**
     * @return Returns the fmDmgLoc.
     */
    public String getFmDmgLoc() {
        return fmDmgLoc;
    }
    /**
     * @param fmDmgLoc The fmDmgLoc to set.
     */
    public void setFmDmgLoc(String fmDmgLoc) {
        this.fmDmgLoc = fmDmgLoc;
    }
    /**
     * @return Returns the fmLoc.
     */
    public String getFmLoc() {
        return fmLoc;
    }
    /**
     * @param fmLoc The fmLoc to set.
     */
    public void setFmLoc(String fmLoc) {
        this.fmLoc = fmLoc;
    }
    /**
     * @return Returns the fmShuLoc.
     */
    public String getFmShuLoc() {
        return fmShuLoc;
    }
    /**
     * @param fmShuLoc The fmShuLoc to set.
     */
    public void setFmShuLoc(String fmShuLoc) {
        this.fmShuLoc = fmShuLoc;
    }
    /**
     * @return Returns the fmTotalLoc.
     */
    public String getFmTotalLoc() {
        return fmTotalLoc;
    }
    /**
     * @param fmTotalLoc The fmTotalLoc to set.
     */
    public void setFmTotalLoc(String fmTotalLoc) {
        this.fmTotalLoc = fmTotalLoc;
    }
    /**
     * @return Returns the toDmgLoc.
     */
    public String getToDmgLoc() {
        return toDmgLoc;
    }
    /**
     * @param toDmgLoc The toDmgLoc to set.
     */
    public void setToDmgLoc(String toDmgLoc) {
        this.toDmgLoc = toDmgLoc;
    }
    /**
     * @return Returns the toLoc.
     */
    public String getToLoc() {
        return toLoc;
    }
    /**
     * @param toLoc The toLoc to set.
     */
    public void setToLoc(String toLoc) {
        this.toLoc = toLoc;
    }
    /**
     * @return Returns the toShuLoc.
     */
    public String getToShuLoc() {
        return toShuLoc;
    }
    /**
     * @param toShuLoc The toShuLoc to set.
     */
    public void setToShuLoc(String toShuLoc) {
        this.toShuLoc = toShuLoc;
    }
    /**
     * @return Returns the toTotalLoc.
     */
    public String getToTotalLoc() {
        return toTotalLoc;
    }
    /**
     * @param toTotalLoc The toTotalLoc to set.
     */
    public void setToTotalLoc(String toTotalLoc) {
        this.toTotalLoc = toTotalLoc;
    }
    /**
     * @return Returns the fmDmgRhdlLoc.
     */
//    public String getFmDmgRhdlLoc() {
//        return fmDmgRhdlLoc;
//    }
    /**
     * @param fmDmgRhdlLoc The fmDmgRhdlLoc to set.
     */
//    public void setFmDmgRhdlLoc(String fmDmgRhdlLoc) {
//        this.fmDmgRhdlLoc = fmDmgRhdlLoc;
//    }
   
    /**
     * @return Returns the toDmgRhdlLoc.
     */
//    public String getToDmgRhdlLoc() {
//        return toDmgRhdlLoc;
//    }
    /**
     * @param toDmgRhdlLoc The toDmgRhdlLoc to set.
     */
//    public void setToDmgRhdlLoc(String toDmgRhdlLoc) {
//        this.toDmgRhdlLoc = toDmgRhdlLoc;
//    }
    
    /**
     * @return Returns the fmShuRhdlCLoc.
     */
    public String getFmShuRhdlCLoc() {
        return fmShuRhdlCLoc;
    }
    /**
     * @param fmShuRhdlCLoc The fmShuRhdlCLoc to set.
     */
    public void setFmShuRhdlCLoc(String fmShuRhdlCLoc) {
        this.fmShuRhdlCLoc = fmShuRhdlCLoc;
    }
    /**
     * @return Returns the fmShuRhdlRLoc.
     */
    public String getFmShuRhdlRLoc() {
        return fmShuRhdlRLoc;
    }
    /**
     * @param fmShuRhdlRLoc The fmShuRhdlRLoc to set.
     */
    public void setFmShuRhdlRLoc(String fmShuRhdlRLoc) {
        this.fmShuRhdlRLoc = fmShuRhdlRLoc;
    }
    /**
     * @return Returns the toShuRhdlCLoc.
     */
    public String getToShuRhdlCLoc() {
        return toShuRhdlCLoc;
    }
    /**
     * @param toShuRhdlCLoc The toShuRhdlCLoc to set.
     */
    public void setToShuRhdlCLoc(String toShuRhdlCLoc) {
        this.toShuRhdlCLoc = toShuRhdlCLoc;
    }
    /**
     * @return Returns the toShuRhdlRLoc.
     */
    public String getToShuRhdlRLoc() {
        return toShuRhdlRLoc;
    }
    /**
     * @param toShuRhdlRLoc The toShuRhdlRLoc to set.
     */
    public void setToShuRhdlRLoc(String toShuRhdlRLoc) {
        this.toShuRhdlRLoc = toShuRhdlRLoc;
    }
    /**
     * @return Returns the shuYn.
     */
    public String getShuYn() {
        return shuYn;
    }
    /**
     * @param shuYn The shuYn to set.
     */
    public void setShuYn(String shuYn) {
        this.shuYn = shuYn;
    }
    /**
     * @return Returns the rhdlMode.
     */
    public String getRhdlMode() {
        return rhdlMode;
    }
    /**
     * @param rhdlMode The rhdlMode to set.
     */
    public void setRhdlMode(String rhdlMode) {
        this.rhdlMode = rhdlMode;
    }
    /**
     * @return Returns the locArea.
     */
    public String getLocArea() {
        return locArea;
    }
    /**
     * @param locArea The locArea to set.
     */
    public void setLocArea(String locArea) {
        this.locArea = locArea;
    }
    /**
     * @return Returns the fmDmgRhdlCLoc.
     */
    public String getFmDmgRhdlCLoc() {
        return fmDmgRhdlCLoc;
    }
    /**
     * @param fmDmgRhdlCLoc The fmDmgRhdlCLoc to set.
     */
    public void setFmDmgRhdlCLoc(String fmDmgRhdlCLoc) {
        this.fmDmgRhdlCLoc = fmDmgRhdlCLoc;
    }
    /**
     * @return Returns the fmDmgRhdlRLoc.
     */
    public String getFmDmgRhdlRLoc() {
        return fmDmgRhdlRLoc;
    }
    /**
     * @param fmDmgRhdlRLoc The fmDmgRhdlRLoc to set.
     */
    public void setFmDmgRhdlRLoc(String fmDmgRhdlRLoc) {
        this.fmDmgRhdlRLoc = fmDmgRhdlRLoc;
    }
    /**
     * @return Returns the toDmgRhdlCLoc.
     */
    public String getToDmgRhdlCLoc() {
        return toDmgRhdlCLoc;
    }
    /**
     * @param toDmgRhdlCLoc The toDmgRhdlCLoc to set.
     */
    public void setToDmgRhdlCLoc(String toDmgRhdlCLoc) {
        this.toDmgRhdlCLoc = toDmgRhdlCLoc;
    }
    /**
     * @return Returns the toDmgRhdlRLoc.
     */
    public String getToDmgRhdlRLoc() {
        return toDmgRhdlRLoc;
    }
    /**
     * @param toDmgRhdlRLoc The toDmgRhdlRLoc to set.
     */
    public void setToDmgRhdlRLoc(String toDmgRhdlRLoc) {
        this.toDmgRhdlRLoc = toDmgRhdlRLoc;
    }
	/**
	 * @return Returns the jobCdCd.
	 */
	public String getJobCoCd() {
	    return jobCoCd;
	}
	/**
	 * @param jobCdCd The jobCdCd to set.
	 */
	public void setJobCoCd(String jobCoCd) {
	    this.jobCoCd = jobCoCd;
	}
    /**
     * @return Returns the spCaCoCd.
     */
    public String getSpCaCoCd() {
        return spCaCoCd;
    }
    /**
     * @param spCaCoCd The spCaCoCd to set.
     */
    public void setSpCaCoCd(String spCaCoCd) {
        this.spCaCoCd = spCaCoCd;
    }
  
    /**
     * @return Returns the fmSpODmgLoc.
     */
    public String getFmSpODmgLoc() {
        return fmSpODmgLoc;
    }
    /**
     * @param fmSpODmgLoc The fmSpODmgLoc to set.
     */
    public void setFmSpODmgLoc(String fmSpODmgLoc) {
        this.fmSpODmgLoc = fmSpODmgLoc;
    }
    /**
     * @return Returns the fmSpODmgRhdlCLoc.
     */
    public String getFmSpODmgRhdlCLoc() {
        return fmSpODmgRhdlCLoc;
    }
    /**
     * @param fmSpODmgRhdlCLoc The fmSpODmgRhdlCLoc to set.
     */
    public void setFmSpODmgRhdlCLoc(String fmSpODmgRhdlCLoc) {
        this.fmSpODmgRhdlCLoc = fmSpODmgRhdlCLoc;
    }
    /**
     * @return Returns the fmSpODmgRhdlRLoc.
     */
    public String getFmSpODmgRhdlRLoc() {
        return fmSpODmgRhdlRLoc;
    }
    /**
     * @param fmSpODmgRhdlRLoc The fmSpODmgRhdlRLoc to set.
     */
    public void setFmSpODmgRhdlRLoc(String fmSpODmgRhdlRLoc) {
        this.fmSpODmgRhdlRLoc = fmSpODmgRhdlRLoc;
    }
    /**
     * @return Returns the fmSpOLoc.
     */
    public String getFmSpOLoc() {
        return fmSpOLoc;
    }
    /**
     * @param fmSpOLoc The fmSpOLoc to set.
     */
    public void setFmSpOLoc(String fmSpOLoc) {
        this.fmSpOLoc = fmSpOLoc;
    }
    /**
     * @return Returns the fmSpOShuLoc.
     */
    public String getFmSpOShuLoc() {
        return fmSpOShuLoc;
    }
    /**
     * @param fmSpOShuLoc The fmSpOShuLoc to set.
     */
    public void setFmSpOShuLoc(String fmSpOShuLoc) {
        this.fmSpOShuLoc = fmSpOShuLoc;
    }
    /**
     * @return Returns the fmSpOShuRhdlCLoc.
     */
    public String getFmSpOShuRhdlCLoc() {
        return fmSpOShuRhdlCLoc;
    }
    /**
     * @param fmSpOShuRhdlCLoc The fmSpOShuRhdlCLoc to set.
     */
    public void setFmSpOShuRhdlCLoc(String fmSpOShuRhdlCLoc) {
        this.fmSpOShuRhdlCLoc = fmSpOShuRhdlCLoc;
    }
    /**
     * @return Returns the fmSpOShuRhdlRLoc.
     */
    public String getFmSpOShuRhdlRLoc() {
        return fmSpOShuRhdlRLoc;
    }
    /**
     * @param fmSpOShuRhdlRLoc The fmSpOShuRhdlRLoc to set.
     */
    public void setFmSpOShuRhdlRLoc(String fmSpOShuRhdlRLoc) {
        this.fmSpOShuRhdlRLoc = fmSpOShuRhdlRLoc;
    }
    /**
     * @return Returns the fmSpSDmgLoc.
     */
    public String getFmSpSDmgLoc() {
        return fmSpSDmgLoc;
    }
    /**
     * @param fmSpSDmgLoc The fmSpSDmgLoc to set.
     */
    public void setFmSpSDmgLoc(String fmSpSDmgLoc) {
        this.fmSpSDmgLoc = fmSpSDmgLoc;
    }
    /**
     * @return Returns the fmSpSDmgRhdlCLoc.
     */
    public String getFmSpSDmgRhdlCLoc() {
        return fmSpSDmgRhdlCLoc;
    }
    /**
     * @param fmSpSDmgRhdlCLoc The fmSpSDmgRhdlCLoc to set.
     */
    public void setFmSpSDmgRhdlCLoc(String fmSpSDmgRhdlCLoc) {
        this.fmSpSDmgRhdlCLoc = fmSpSDmgRhdlCLoc;
    }
    /**
     * @return Returns the fmSpSDmgRhdlRLoc.
     */
    public String getFmSpSDmgRhdlRLoc() {
        return fmSpSDmgRhdlRLoc;
    }
    /**
     * @param fmSpSDmgRhdlRLoc The fmSpSDmgRhdlRLoc to set.
     */
    public void setFmSpSDmgRhdlRLoc(String fmSpSDmgRhdlRLoc) {
        this.fmSpSDmgRhdlRLoc = fmSpSDmgRhdlRLoc;
    }
    /**
     * @return Returns the fmSpSLoc.
     */
    public String getFmSpSLoc() {
        return fmSpSLoc;
    }
    /**
     * @param fmSpSLoc The fmSpSLoc to set.
     */
    public void setFmSpSLoc(String fmSpSLoc) {
        this.fmSpSLoc = fmSpSLoc;
    }
    /**
     * @return Returns the fmSpSShuLoc.
     */
    public String getFmSpSShuLoc() {
        return fmSpSShuLoc;
    }
    /**
     * @param fmSpSShuLoc The fmSpSShuLoc to set.
     */
    public void setFmSpSShuLoc(String fmSpSShuLoc) {
        this.fmSpSShuLoc = fmSpSShuLoc;
    }
    /**
     * @return Returns the fmSpSShuRhdlCLoc.
     */
    public String getFmSpSShuRhdlCLoc() {
        return fmSpSShuRhdlCLoc;
    }
    /**
     * @param fmSpSShuRhdlCLoc The fmSpSShuRhdlCLoc to set.
     */
    public void setFmSpSShuRhdlCLoc(String fmSpSShuRhdlCLoc) {
        this.fmSpSShuRhdlCLoc = fmSpSShuRhdlCLoc;
    }
    /**
     * @return Returns the fmSpSShuRhdlRLoc.
     */
    public String getFmSpSShuRhdlRLoc() {
        return fmSpSShuRhdlRLoc;
    }
    /**
     * @param fmSpSShuRhdlRLoc The fmSpSShuRhdlRLoc to set.
     */
    public void setFmSpSShuRhdlRLoc(String fmSpSShuRhdlRLoc) {
        this.fmSpSShuRhdlRLoc = fmSpSShuRhdlRLoc;
    }
    /**
     * @return Returns the toSpODmgLoc.
     */
    public String getToSpODmgLoc() {
        return toSpODmgLoc;
    }
    /**
     * @param toSpODmgLoc The toSpODmgLoc to set.
     */
    public void setToSpODmgLoc(String toSpODmgLoc) {
        this.toSpODmgLoc = toSpODmgLoc;
    }
    /**
     * @return Returns the toSpODmgRhdlCLoc.
     */
    public String getToSpODmgRhdlCLoc() {
        return toSpODmgRhdlCLoc;
    }
    /**
     * @param toSpODmgRhdlCLoc The toSpODmgRhdlCLoc to set.
     */
    public void setToSpODmgRhdlCLoc(String toSpODmgRhdlCLoc) {
        this.toSpODmgRhdlCLoc = toSpODmgRhdlCLoc;
    }
    /**
     * @return Returns the toSpODmgRhdlRLoc.
     */
    public String getToSpODmgRhdlRLoc() {
        return toSpODmgRhdlRLoc;
    }
    /**
     * @param toSpODmgRhdlRLoc The toSpODmgRhdlRLoc to set.
     */
    public void setToSpODmgRhdlRLoc(String toSpODmgRhdlRLoc) {
        this.toSpODmgRhdlRLoc = toSpODmgRhdlRLoc;
    }
    /**
     * @return Returns the toSpOLoc.
     */
    public String getToSpOLoc() {
        return toSpOLoc;
    }
    /**
     * @param toSpOLoc The toSpOLoc to set.
     */
    public void setToSpOLoc(String toSpOLoc) {
        this.toSpOLoc = toSpOLoc;
    }
    /**
     * @return Returns the toSpOShuLoc.
     */
    public String getToSpOShuLoc() {
        return toSpOShuLoc;
    }
    /**
     * @param toSpOShuLoc The toSpOShuLoc to set.
     */
    public void setToSpOShuLoc(String toSpOShuLoc) {
        this.toSpOShuLoc = toSpOShuLoc;
    }
    /**
     * @return Returns the toSpOShuRhdlCLoc.
     */
    public String getToSpOShuRhdlCLoc() {
        return toSpOShuRhdlCLoc;
    }
    /**
     * @param toSpOShuRhdlCLoc The toSpOShuRhdlCLoc to set.
     */
    public void setToSpOShuRhdlCLoc(String toSpOShuRhdlCLoc) {
        this.toSpOShuRhdlCLoc = toSpOShuRhdlCLoc;
    }
    /**
     * @return Returns the toSpOShuRhdlRLoc.
     */
    public String getToSpOShuRhdlRLoc() {
        return toSpOShuRhdlRLoc;
    }
    /**
     * @param toSpOShuRhdlRLoc The toSpOShuRhdlRLoc to set.
     */
    public void setToSpOShuRhdlRLoc(String toSpOShuRhdlRLoc) {
        this.toSpOShuRhdlRLoc = toSpOShuRhdlRLoc;
    }
    /**
     * @return Returns the toSpSDmgLoc.
     */
    public String getToSpSDmgLoc() {
        return toSpSDmgLoc;
    }
    /**
     * @param toSpSDmgLoc The toSpSDmgLoc to set.
     */
    public void setToSpSDmgLoc(String toSpSDmgLoc) {
        this.toSpSDmgLoc = toSpSDmgLoc;
    }
    /**
     * @return Returns the toSpSDmgRhdlCLoc.
     */
    public String getToSpSDmgRhdlCLoc() {
        return toSpSDmgRhdlCLoc;
    }
    /**
     * @param toSpSDmgRhdlCLoc The toSpSDmgRhdlCLoc to set.
     */
    public void setToSpSDmgRhdlCLoc(String toSpSDmgRhdlCLoc) {
        this.toSpSDmgRhdlCLoc = toSpSDmgRhdlCLoc;
    }
    /**
     * @return Returns the toSpSDmgRhdlRLoc.
     */
    public String getToSpSDmgRhdlRLoc() {
        return toSpSDmgRhdlRLoc;
    }
    /**
     * @param toSpSDmgRhdlRLoc The toSpSDmgRhdlRLoc to set.
     */
    public void setToSpSDmgRhdlRLoc(String toSpSDmgRhdlRLoc) {
        this.toSpSDmgRhdlRLoc = toSpSDmgRhdlRLoc;
    }
    /**
     * @return Returns the toSpSLoc.
     */
    public String getToSpSLoc() {
        return toSpSLoc;
    }
    /**
     * @param toSpSLoc The toSpSLoc to set.
     */
    public void setToSpSLoc(String toSpSLoc) {
        this.toSpSLoc = toSpSLoc;
    }
    /**
     * @return Returns the toSpSShuLoc.
     */
    public String getToSpSShuLoc() {
        return toSpSShuLoc;
    }
    /**
     * @param toSpSShuLoc The toSpSShuLoc to set.
     */
    public void setToSpSShuLoc(String toSpSShuLoc) {
        this.toSpSShuLoc = toSpSShuLoc;
    }
    /**
     * @return Returns the toSpSShuRhdlCLoc.
     */
    public String getToSpSShuRhdlCLoc() {
        return toSpSShuRhdlCLoc;
    }
    /**
     * @param toSpSShuRhdlCLoc The toSpSShuRhdlCLoc to set.
     */
    public void setToSpSShuRhdlCLoc(String toSpSShuRhdlCLoc) {
        this.toSpSShuRhdlCLoc = toSpSShuRhdlCLoc;
    }
    /**
     * @return Returns the toSpSShuRhdlRLoc.
     */
    public String getToSpSShuRhdlRLoc() {
        return toSpSShuRhdlRLoc;
    }
    /**
     * @param toSpSShuRhdlRLoc The toSpSShuRhdlRLoc to set.
     */
    public void setToSpSShuRhdlRLoc(String toSpSShuRhdlRLoc) {
        this.toSpSShuRhdlRLoc = toSpSShuRhdlRLoc;
    }
    /**
     * @return Returns the whId.
     */
    public String getWhId() {
        return whId;
    }
    /**
     * @param whId The whId to set.
     */
    public void setWhId(String whId) {
        this.whId = whId;
    }
    
//  -- start ADD 20090610 tnkytn Need for HHT
//    public List getCollection() {
//		return collection;
//	}
//	public void setCollection(List list) {
//		this.collection = (ArrayList) list;
//	}
    //-- end ADD 20090610 tnkytn Need for HHT
    /**
     * @return Returns the catgNm.
     */
    public String getCatgNm() {
        return catgNm;
    }
    /**
     * @param catgNm The catgNm to set.
     */
    public void setCatgNm(String catgNm) {
        this.catgNm = catgNm;
    }
    /**
     * @return Returns the mvDt.
     */
    public String getMvDt() {
        return mvDt;
    }
    /**
     * @param mvDt The mvDt to set.
     */
    public void setMvDt(String mvDt) {
        this.mvDt = mvDt;
    }

	public List getCargoTypeList() {
		return cargoTypeList;
	}

	public void setCargoTypeList(List cargoTypeList) {
		this.cargoTypeList = cargoTypeList;
	}

	public List getJobTypeList() {
		return jobTypeList;
	}

	public void setJobTypeList(List jobTypeList) {
		this.jobTypeList = jobTypeList;
	}

	public ArrayList<MovementListItem> getItems() {
		return items;
	}

	public void setItems(ArrayList<MovementListItem> items) {
		this.items = items;
	}

	public List getShiftList() {
		return shiftList;
	}

	public void setShiftList(List shiftList) {
		this.shiftList = shiftList;
	}

	public ArrayList<WhConfigurationItem> getWhItems() {
		return whItems;
	}

	public void setWhItems(ArrayList<WhConfigurationItem> whItems) {
		this.whItems = whItems;
	}

	public int getPkgQty() {
		return pkgQty;
	}

	public void setPkgQty(int pkgQty) {
		this.pkgQty = pkgQty;
	}

	public double getMsrmt() {
		return msrmt;
	}

	public void setMsrmt(double msrmt) {
		this.msrmt = msrmt;
	}

	public double getWgt() {
		return wgt;
	}

	public void setWgt(double wgt) {
		this.wgt = wgt;
	}

	public int getFmPkgQty() {
		return fmPkgQty;
	}

	public void setFmPkgQty(int fmPkgQty) {
		this.fmPkgQty = fmPkgQty;
	}

	public double getFmMsrmt() {
		return fmMsrmt;
	}

	public void setFmMsrmt(double fmMsrmt) {
		this.fmMsrmt = fmMsrmt;
	}

	public double getFmWgt() {
		return fmWgt;
	}

	public void setFmWgt(double fmWgt) {
		this.fmWgt = fmWgt;
	}

	public int getCntrQty() {
		return cntrQty;
	}

	public void setCntrQty(int cntrQty) {
		this.cntrQty = cntrQty;
	}

	public Date getStDt() {
		return stDt;
	}

	public void setStDt(Date stDt) {
		this.stDt = stDt;
	}

	public Date getEndDt() {
		return endDt;
	}

	public void setEndDt(Date endDt) {
		this.endDt = endDt;
	}

//	public void setCollection(ArrayList collection) {
//		this.collection = collection;
//	}
}
