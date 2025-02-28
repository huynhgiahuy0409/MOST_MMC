package com.tsb.most.biz.dataitem.monitoring;

import com.tsb.most.framework.dataitem.DataItem;

public class GatePassListItem extends DataItem {

    private String cgNo;
    private String cgInOutCd;
    private String doNo;
    
    private int seq;
    private double  wgt;
    private String wgtUnit;
    private double  msrmt;
    private String msrmtUnit;
    private int pkgQty;
    private String pkgTpCd;
    private String cmdtCd;
    private String cmdtCdNm;
    private String cgTpCd;
    private String dgCgIdt;
    private String gateInDt;
    private String gateOutDt;
    private String tsptTpCd;
    private String fnlYn;
    private String grNo;
    private String locId;
    private String rmk;
    private String lorryNo;
    private String gatePassNo;
    private String gatePassIssueDt;
    private int issueCnt;
    private String updDt;
    private String updUserId;
    private String version;
    private String vslCallId;
    private int actlWgt;
    
    //add
    private String delvStat;
    private String issued;
    private String hdlOutDt;
    private String rehandle;
    private String blNo;

    private String catgCd;
    private String catgNm;
    
    private String tsptr;
    private String tsptcompnm;
    private String tsptTpNm;
    private String delvTpNm;
    private String noTrips;
    private String curPage;
    
    private String shftId;
    private String shftDt;
    private String shftNm;
    private String ConfirmBy;
    private String dateTime;
   
    public String getTotalPage() {
        return totalPage;
    }
    public void setTotalPage(String totalPage) {
        this.totalPage = totalPage;
    }
    private String rn;
    private String totalPage;
    private String gateTxnNo;
    private String customsStat;

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
    * Function set a cgInOutCd value
    * @param cgInOutCd. 
    * @return void.
    */        
    public void setCgInOutCd(String cgInOutCd)
    {
        this.cgInOutCd       = cgInOutCd;
    }

    /**
    * Return a cgInOutCd Value
    * @param void. 
    * @return String.
    */  
    public String getCgInOutCd()
    {
        return cgInOutCd;
    }

    /**
    * Function set a seq value
    * @param seq. 
    * @return void.
    */ 
    public void setSeq(int seq)
    {
        this.seq = seq;
    } 

    /**
    * Function set a seq value
    * @param void. 
    * @return int.
    */      
    public int getSeq()
    {
        return seq;
    }

    /**
    * Function set a wgt value
    * @param wgt. 
    * @return void.
    */ 
    public void setWgt(double  wgt)
    {
        this.wgt = wgt;
    } 

    /**
    * Function set a wgt value
    * @param void. 
    * @return int.
    */      
    public double  getWgt()
    {
        return wgt;
    }

    /**
    * Function set a wgtUnit value
    * @param wgtUnit. 
    * @return void.
    */        
    public void setWgtUnit(String wgtUnit)
    {
        this.wgtUnit       = wgtUnit;
    }

    /**
    * Return a wgtUnit Value
    * @param void. 
    * @return String.
    */  
    public String getWgtUnit()
    {
        return wgtUnit;
    }

    /**
    * Function set a msrmt value
    * @param msrmt. 
    * @return void.
    */ 
    public void setMsrmt(double  msrmt)
    {
        this.msrmt = msrmt;
    } 

    /**
    * Function set a msrmt value
    * @param void. 
    * @return int.
    */      
    public double  getMsrmt()
    {
        return msrmt;
    }

    /**
    * Function set a msrmtUnit value
    * @param msrmtUnit. 
    * @return void.
    */        
    public void setMsrmtUnit(String msrmtUnit)
    {
        this.msrmtUnit       = msrmtUnit;
    }

    /**
    * Return a msrmtUnit Value
    * @param void. 
    * @return String.
    */  
    public String getMsrmtUnit()
    {
        return msrmtUnit;
    }

    /**
    * Function set a pkgQty value
    * @param pkgQty. 
    * @return void.
    */ 
    public void setPkgQty(int pkgQty)
    {
        this.pkgQty = pkgQty;
    } 

    /**
    * Function set a pkgQty value
    * @param void. 
    * @return int.
    */      
    public int getPkgQty()
    {
        return pkgQty;
    }

    /**
    * Function set a pkgTpCd value
    * @param pkgTpCd. 
    * @return void.
    */        
    public void setPkgTpCd(String pkgTpCd)
    {
        this.pkgTpCd       = pkgTpCd;
    }

    /**
    * Return a pkgTpCd Value
    * @param void. 
    * @return String.
    */  
    public String getPkgTpCd()
    {
        return pkgTpCd;
    }

    /**
    * Function set a cmdtCd value
    * @param cmdtCd. 
    * @return void.
    */        
    public void setCmdtCd(String cmdtCd)
    {
        this.cmdtCd       = cmdtCd;
    }

    /**
    * Return a cmdtCd Value
    * @param void. 
    * @return String.
    */  
    public String getCmdtCd()
    {
        return cmdtCd;
    }

    /**
    * Function set a cgTpCd value
    * @param cgTpCd. 
    * @return void.
    */        
    public void setCgTpCd(String cgTpCd)
    {
        this.cgTpCd       = cgTpCd;
    }

    /**
    * Return a cgTpCd Value
    * @param void. 
    * @return String.
    */  
    public String getCgTpCd()
    {
        return cgTpCd;
    }

    /**
    * Function set a dgCgIdt value
    * @param dgCgIdt. 
    * @return void.
    */        
    public void setDgCgIdt(String dgCgIdt)
    {
        this.dgCgIdt       = dgCgIdt;
    }

    /**
    * Return a dgCgIdt Value
    * @param void. 
    * @return String.
    */  
    public String getDgCgIdt()
    {
        return dgCgIdt;
    }

    /**
    * Function set a gateInDt value
    * @param gateInDt. 
    * @return void.
    */        
    public void setGateInDt(String gateInDt)
    {
        this.gateInDt       = gateInDt;
    }

    /**
    * Return a gateInDt Value
    * @param void. 
    * @return String.
    */  
    public String getGateInDt()
    {
        return gateInDt;
    }

    /**
    * Function set a gateOutDt value
    * @param gateOutDt. 
    * @return void.
    */        
    public void setGateOutDt(String gateOutDt)
    {
        this.gateOutDt       = gateOutDt;
    }

    /**
    * Return a gateOutDt Value
    * @param void. 
    * @return String.
    */  
    public String getGateOutDt()
    {
        return gateOutDt;
    }

    /**
    * Function set a tsptTpCd value
    * @param tsptTpCd. 
    * @return void.
    */        
    public void setTsptTpCd(String tsptTpCd)
    {
        this.tsptTpCd       = tsptTpCd;
    }

    /**
    * Return a tsptTpCd Value
    * @param void. 
    * @return String.
    */  
    public String getTsptTpCd()
    {
        return tsptTpCd;
    }

    /**
    * Function set a fnlYn value
    * @param fnlYn. 
    * @return void.
    */        
    public void setFnlYn(String fnlYn)
    {
        this.fnlYn       = fnlYn;
    }

    /**
    * Return a fnlYn Value
    * @param void. 
    * @return String.
    */  
    public String getFnlYn()
    {
        return fnlYn;
    }

    /**
    * Function set a grNo value
    * @param grNo. 
    * @return void.
    */        
    public void setGrNo(String grNo)
    {
        this.grNo       = grNo;
    }

    /**
    * Return a grNo Value
    * @param void. 
    * @return String.
    */  
    public String getGrNo()
    {
        return grNo;
    }

    /**
    * Function set a locId value
    * @param locId. 
    * @return void.
    */        
    public void setLocId(String locId)
    {
        this.locId       = locId;
    }

    /**
    * Return a locId Value
    * @param void. 
    * @return String.
    */  
    public String getLocId()
    {
        return locId;
    }

    /**
    * Function set a rmk value
    * @param rmk. 
    * @return void.
    */        
    public void setRmk(String rmk)
    {
        this.rmk       = rmk;
    }

    /**
    * Return a rmk Value
    * @param void. 
    * @return String.
    */  
    public String getRmk()
    {
        return rmk;
    }

    /**
    * Function set a lorryNo value
    * @param lorryNo. 
    * @return void.
    */        
    public void setLorryNo(String lorryNo)
    {
        this.lorryNo       = lorryNo;
    }

    /**
    * Return a lorryNo Value
    * @param void. 
    * @return String.
    */  
    public String getLorryNo()
    {
        return lorryNo;
    }

    /**
    * Function set a gatePassNo value
    * @param gatePassNo. 
    * @return void.
    */        
    public void setGatePassNo(String gatePassNo)
    {
        this.gatePassNo       = gatePassNo;
    }

    /**
    * Return a gatePassNo Value
    * @param void. 
    * @return String.
    */  
    public String getGatePassNo()
    {
        return gatePassNo;
    }

    /**
    * Function set a gatePassIssueDt value
    * @param gatePassIssueDt. 
    * @return void.
    */        
    public void setGatePassIssueDt(String gatePassIssueDt)
    {
        this.gatePassIssueDt       = gatePassIssueDt;
    }

    /**
    * Return a gatePassIssueDt Value
    * @param void. 
    * @return String.
    */  
    public String getGatePassIssueDt()
    {
        return gatePassIssueDt;
    }

    /**
    * Function set a issueCnt value
    * @param issueCnt. 
    * @return void.
    */ 
    public void setIssueCnt(int issueCnt)
    {
        this.issueCnt = issueCnt;
    } 

    /**
    * Function set a issueCnt value
    * @param void. 
    * @return int.
    */      
    public int getIssueCnt()
    {
        return issueCnt;
    }

    /**
    * Function set a updDt value
    * @param updDt. 
    * @return void.
    */        
    public void setUpdDt(String updDt)
    {
        this.updDt       = updDt;
    }

    /**
    * Return a updDt Value
    * @param void. 
    * @return String.
    */  
    public String getUpdDt()
    {
        return updDt;
    }

    /**
    * Function set a updUserId value
    * @param updUserId. 
    * @return void.
    */        
    public void setUpdUserId(String updUserId)
    {
        this.updUserId       = updUserId;
    }

    /**
    * Return a updUserId Value
    * @param void. 
    * @return String.
    */  
    public String getUpdUserId()
    {
        return updUserId;
    }

    /**
    * Function set a version value
    * @param version. 
    * @return void.
    */        
    public void setVersion(String version)
    {
        this.version       = version;
    }

    /**
    * Return a version Value
    * @param void. 
    * @return String.
    */  
    public String getVersion()
    {
        return version;
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
    * Function set a actlWgt value
    * @param actlWgt. 
    * @return void.
    */ 
    public void setActlWgt(int actlWgt)
    {
        this.actlWgt = actlWgt;
    } 

    /**
    * Function set a actlWgt value
    * @param void. 
    * @return int.
    */      
    public int getActlWgt()
    {
        return actlWgt;
    }



    public String getDelvStat() {
        return delvStat;
    }
    public void setDelvStat(String delvStat) {
        this.delvStat = delvStat;
    }
    public String getHdlOutDt() {
        return hdlOutDt;
    }
    public void setHdlOutDt(String hdlOutDt) {
        this.hdlOutDt = hdlOutDt;
    }
    public String getIssued() {
        return issued;
    }
    public void setIssued(String issued) {
        this.issued = issued;
    }
    public String getRehandle() {
        return rehandle;
    }
    public void setRehandle(String rehandle) {
        this.rehandle = rehandle;
    }
    public String getBlNo() {
        return blNo;
    }
    public void setBlNo(String blNo) {
        this.blNo = blNo;
    }
    public String getCatgCd() {
        return catgCd;
    }
    public void setCatgCd(String catgCd) {
        this.catgCd = catgCd;
    }
    /**
     * @return Returns the tsptr.
     */
    public String getTsptr() {
        return tsptr;
    }
    /**
     * @param tsptr The tsptr to set.
     */
    public void setTsptr(String tsptr) {
        this.tsptr = tsptr;
    }
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
     * @return Returns the doNo.
     */
    public String getDoNo() {
        return doNo;
    }
    /**
     * @param doNo The doNo to set.
     */
    public void setDoNo(String doNo) {
        this.doNo = doNo;
    }
    
    /**
     * @return Returns the tsptTpNm.
     */
    public String getTsptTpNm() {
        return tsptTpNm;
    }
    /**
     * @param tsptTpNm The tsptTpNm to set.
     */
    public void setTsptTpNm(String tsptTpNm) {
        this.tsptTpNm = tsptTpNm;
    }
    
    public String getDelvTpNm() {
        return delvTpNm;
    }
    
    public void setDelvTpNm(String delvTpNm) {
        this.delvTpNm = delvTpNm;
    }
    /**
     * @return Returns the cmdtCdNm.
     */
    public String getCmdtCdNm() {
        return cmdtCdNm;
    }
    /**
     * @param cmdtCdNm The cmdtCdNm to set.
     */
    public void setCmdtCdNm(String cmdtCdNm) {
        this.cmdtCdNm = cmdtCdNm;
    }
    /**
     * @return Returns the tsptcompnm.
     */
    public String getTsptcompnm() {
        return tsptcompnm;
    }
    /**
     * @param tsptcompnm The tsptcompnm to set.
     */
    public void setTsptcompnm(String tsptcompnm) {
        this.tsptcompnm = tsptcompnm;
    }
    /**
     * @return Returns the noTrips.
     */
    public String getNoTrips() {
        return noTrips;
    }
    /**
     * @param noTrips The noTrips to set.
     */
    public void setNoTrips(String noTrips) {
        this.noTrips = noTrips;
    }
    
    public String getCrud() {
        return crud;
    }
    public void setCrud(String crud) {
        this.crud = crud;
    }
    public String getCurPage() {
        return curPage;
    }
    public void setCurPage(String curPage) {
        this.curPage = curPage;
    }
    public String getRn() {
        return rn;
    }
    public void setRn(String rn) {
        this.rn = rn;
    }
    
    public String getShftId() {
        return shftId;
    }
    public void setShftId(String shftId) {
        this.shftId = shftId;
    }
    	
    public String getConfirmBy() {
        return ConfirmBy;
    }
    public void setConfirmBy(String confirmBy) {
        ConfirmBy = confirmBy;
    }
    public String getDateTime() {
        return dateTime;
    }
    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
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
	public String getGateTxnNo() {
		return gateTxnNo;
	}
	public void setGateTxnNo(String gateTxnNo) {
		this.gateTxnNo = gateTxnNo;
	}
	public String getCustomsStat() {
		return customsStat;
	}
	public void setCustomsStat(String customsStat) {
		this.customsStat = customsStat;
	}
    
}
