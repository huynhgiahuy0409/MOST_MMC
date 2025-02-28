package com.tsb.most.biz.dataitem.document;

import com.tsb.most.framework.dataitem.DataItem;

public class CustomsCargoReleaseControlItem extends DataItem {
    private String vslCallId;
    private String jobNo;
    private String docStatCd;
    private String jobNoBl1;
    private String docStatCdBl1;
    private String jobNoMf1;
    private String docStatCdMf1;
    private String jobNoCg1;
    private String docStatCdCg1;
    private String blNo;
    private String status;
    private String dgYn;
    private String dgStatus;
    private String regNo;
    private String regNoMf1;
    private String blRegNo;
    private String cbr;
    private String snNo;
    private String vslNm;
    private String no;
    private String ieCd;
    private String vslCd;
    private String cnsneCd;
    private String releaseNo;
    private String customsAprvStat;
    private String vslManifestNo;
    private String docNo;
    private String damNo;
    private String rdNo;
    private String refNo;
    private String divCD;
    private String customReleaseDT;
    private String tmnlDesc;
    private String docExist;
    private String masterBL;
    private String bookingNo;
    private String transDT;
    private String insDT;
    private String seq;
    private String exWhId;
    private String activateYN;
    private String interfacePK;
    private String userId;
    private String updUserId;
    private String createUserId;
    
    private String channelCd;
    private String channelNm;
    private String releaseMt;
    private String releaseQty;
    private String cargoNo;
    private String categoryCd;
    private String categoryNm;
    private String docMt;
    private String docQty;
    private String balanceMt;
    private String balanceQty;
    private String shaCd;
    private String shaNm;
    private String fwdCd;
    private String fwdNm;
    private String cnsCd;
    private String cnsNm;
    private String cd;
    private String cdNm;
    private String cmdtCd;
    private String cmdtNm;
    
    private String updDate;
    private String crudFlag;
    private String blSon;
    private String volanteStatus;
    private String abandoNoStatus;
    private String perQty;
    private String cgTpCd;
    
    private String balanceBlSonMt;
    private String balanceBlSonQty;
    private String bondedWhYn;
    private String custGetIn;
    private String custGetOut;
    
    //sMantis: 0167587
    private String docM3;
    private String balanceM3;
    private String releaseM3;
    //eMantis: 0167587
    
    public String getTransDT() {
		return transDT;
	}
	public void setTransDT(String transDT) {
		this.transDT = transDT;
	}
	public String getInsDT() {
		return insDT;
	}
	public void setInsDT(String insDT) {
		this.insDT = insDT;
	}
	public String getSeq() {
		return seq;
	}
	public void setSeq(String seq) {
		this.seq = seq;
	}
	public String getMasterBL() {
		return masterBL;
	}
	public void setMasterBL(String masterBL) {
		this.masterBL = masterBL;
	}
	public String getBookingNo() {
		return bookingNo;
	}
	public void setBookingNo(String bookingNo) {
		this.bookingNo = bookingNo;
	}
	public String getDocExist() {
		return docExist;
	}
	public void setDocExist(String docExist) {
		this.docExist = docExist;
	}
	public String getVslManifestNo() {
		return vslManifestNo;
	}
	public void setVslManifestNo(String vslManifestNo) {
		this.vslManifestNo = vslManifestNo;
	}
	public String getDocNo() {
		return docNo;
	}
	public void setDocNo(String docNo) {
		this.docNo = docNo;
	}
	public String getDamNo() {
		return damNo;
	}
	public void setDamNo(String damNo) {
		this.damNo = damNo;
	}
	public String getRdNo() {
		return rdNo;
	}
	public void setRdNo(String rdNo) {
		this.rdNo = rdNo;
	}
	public String getRefNo() {
		return refNo;
	}
	public void setRefNo(String refNo) {
		this.refNo = refNo;
	}
	public String getDivCD() {
		return divCD;
	}
	public void setDivCD(String divCD) {
		this.divCD = divCD;
	}
	public String getCustomReleaseDT() {
		return customReleaseDT;
	}
	public void setCustomReleaseDT(String customReleaseDT) {
		this.customReleaseDT = customReleaseDT;
	}
	public String getTmnlDesc() {
		return tmnlDesc;
	}
	public void setTmnlDesc(String tmnlDesc) {
		this.tmnlDesc = tmnlDesc;
	}
	/**
     * @return Returns the no.
     */
    public String getNo() {
        return no;
    }
    /**
     * @param no The no to set.
     */
    public void setNo(String no) {
        this.no = no;
    }
    /**
     * @return Returns the statusBk.
     */
    public String getStatusBk() {
        return statusBk;
    }
    /**
     * @param statusBk The statusBk to set.
     */
    public void setStatusBk(String statusBk) {
        this.statusBk = statusBk;
    }
    private String scn;
    private String blCbr;
    private String ie;
    private String mt;
    private String pol;
    private String pod;
    private String statusBk;
    
    /**
     * @return Returns the blCbr.
     */
    public String getBlCbr() {
        return blCbr;
    }
    /**
     * @param blCbr The blCbr to set.
     */
    public void setBlCbr(String blCbr) {
        this.blCbr = blCbr;
    }
    /**
     * @return Returns the createdBy.
     */
    public String getCreatedBy() {
        return createdBy;
    }
    /**
     * @param createdBy The createdBy to set.
     */
    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
    /**
     * @return Returns the custDeclNo.
     */
    public String getCustDeclNo() {
        return custDeclNo;
    }
    /**
     * @param custDeclNo The custDeclNo to set.
     */
    public void setCustDeclNo(String custDeclNo) {
        this.custDeclNo = custDeclNo;
    }
    /**
     * @return Returns the ediTransDate.
     */
    public String getEdiTransDate() {
        return ediTransDate;
    }
    /**
     * @param ediTransDate The ediTransDate to set.
     */
    public void setEdiTransDate(String ediTransDate) {
        this.ediTransDate = ediTransDate;
    }
    /**
     * @return Returns the ie.
     */
    public String getIe() {
        return ie;
    }
    /**
     * @param ie The ie to set.
     */
    public void setIe(String ie) {
        this.ie = ie;
    }
    /**
     * @return Returns the mt.
     */
    public String getMt() {
        return mt;
    }
    /**
     * @param mt The mt to set.
     */
    public void setMt(String mt) {
        this.mt = mt;
    }
    /**
     * @return Returns the pod.
     */
    public String getPod() {
        return pod;
    }
    /**
     * @param pod The pod to set.
     */
    public void setPod(String pod) {
        this.pod = pod;
    }
    /**
     * @return Returns the pol.
     */
    public String getPol() {
        return pol;
    }
    /**
     * @param pol The pol to set.
     */
    public void setPol(String pol) {
        this.pol = pol;
    }
    /**
     * @return Returns the scn.
     */
    public String getScn() {
        return scn;
    }
    /**
     * @param scn The scn to set.
     */
    public void setScn(String scn) {
        this.scn = scn;
    }
    /**
     * @return Returns the vslNm.
     */
    public String getVslNm() {
        return vslNm;
    }
    /**
     * @param vslNm The vslNm to set.
     */
    public void setVslNm(String vslNm) {
        this.vslNm = vslNm;
    }
    private String custDeclNo;
    private String custDeclNoBk;
    /**
     * @return Returns the custDeclNoBk.
     */
    public String getCustDeclNoBk() {
        return custDeclNoBk;
    }
    /**
     * @param custDeclNoBk The custDeclNoBk to set.
     */
    public void setCustDeclNoBk(String custDeclNoBk) {
        this.custDeclNoBk = custDeclNoBk;
    }
    private String createdBy;
    private String updatedBy;
    private String ediTransDate;
    private String modifiedBy;
    private String modifiedDate;
    
    
    /**
     * @return Returns the blRegNo.
     */
    public String getBlRegNo() {
        return blRegNo;
    }
    /**
     * @param blRegNo The blRegNo to set.
     */
    public void setBlRegNo(String blRegNo) {
        this.blRegNo = blRegNo;
    }
    /**
     * @return Returns the regNo.
     */
    public String getRegNo() {
        return regNo;
    }
    /**
     * @param regNo The regNo to set.
     */
    public void setRegNo(String regNo) {
        this.regNo = regNo;
    }
    /**
     * @return Returns the regNoMf1.
     */
    public String getRegNoMf1() {
        return regNoMf1;
    }
    /**
     * @param regNoMf1 The regNoMf1 to set.
     */
    public void setRegNoMf1(String regNoMf1) {
        this.regNoMf1 = regNoMf1;
    }
    /**
     * @return Returns the blNo.
     */
    public String getBlNo() {
        return blNo;
    }
    /**
     * @param blNo The blNo to set.
     */
    public void setBlNo(String blNo) {
        this.blNo = blNo;
    }
    /**
     * @return Returns the dgStatus.
     */
    public String getDgStatus() {
        return dgStatus;
    }
    /**
     * @param dgStatus The dgStatus to set.
     */
    public void setDgStatus(String dgStatus) {
        this.dgStatus = dgStatus;
    }
    /**
     * @return Returns the dgYn.
     */
    public String getDgYn() {
        return dgYn;
    }
    /**
     * @param dgYn The dgYn to set.
     */
    public void setDgYn(String dgYn) {
        this.dgYn = dgYn;
    }
    /**
     * @return Returns the docStatCd.
     */
    public String getDocStatCd() {
        return docStatCd;
    }
    /**
     * @param docStatCd The docStatCd to set.
     */
    public void setDocStatCd(String docStatCd) {
        this.docStatCd = docStatCd;
    }
    /**
     * @return Returns the docStatCdBl1.
     */
    public String getDocStatCdBl1() {
        return docStatCdBl1;
    }
    /**
     * @param docStatCdBl1 The docStatCdBl1 to set.
     */
    public void setDocStatCdBl1(String docStatCdBl1) {
        this.docStatCdBl1 = docStatCdBl1;
    }
    /**
     * @return Returns the docStatCdCg1.
     */
    public String getDocStatCdCg1() {
        return docStatCdCg1;
    }
    /**
     * @param docStatCdCg1 The docStatCdCg1 to set.
     */
    public void setDocStatCdCg1(String docStatCdCg1) {
        this.docStatCdCg1 = docStatCdCg1;
    }
    /**
     * @return Returns the docStatCdMf1.
     */
    public String getDocStatCdMf1() {
        return docStatCdMf1;
    }
    /**
     * @param docStatCdMf1 The docStatCdMf1 to set.
     */
    public void setDocStatCdMf1(String docStatCdMf1) {
        this.docStatCdMf1 = docStatCdMf1;
    }
    /**
     * @return Returns the jobNo.
     */
    public String getJobNo() {
        return jobNo;
    }
    /**
     * @param jobNo The jobNo to set.
     */
    public void setJobNo(String jobNo) {
        this.jobNo = jobNo;
    }
    /**
     * @return Returns the jobNoBl1.
     */
    public String getJobNoBl1() {
        return jobNoBl1;
    }
    /**
     * @param jobNoBl1 The jobNoBl1 to set.
     */
    public void setJobNoBl1(String jobNoBl1) {
        this.jobNoBl1 = jobNoBl1;
    }
    /**
     * @return Returns the jobNoCg1.
     */
    public String getJobNoCg1() {
        return jobNoCg1;
    }
    /**
     * @param jobNoCg1 The jobNoCg1 to set.
     */
    public void setJobNoCg1(String jobNoCg1) {
        this.jobNoCg1 = jobNoCg1;
    }
    /**
     * @return Returns the jobNoMf1.
     */
    public String getJobNoMf1() {
        return jobNoMf1;
    }
    /**
     * @param jobNoMf1 The jobNoMf1 to set.
     */
    public void setJobNoMf1(String jobNoMf1) {
        this.jobNoMf1 = jobNoMf1;
    }
    /**
     * @return Returns the status.
     */
    public String getStatus() {
        return status;
    }
    /**
     * @param status The status to set.
     */
    public void setStatus(String status) {
        this.status = status;
    }
    /**
     * @return Returns the vslCallId.
     */
    public String getVslCallId() {
        return vslCallId;
    }
    /**
     * @param vslCallId The vslCallId to set.
     */
    public void setVslCallId(String vslCallId) {
        this.vslCallId = vslCallId;
    }
    /**
     * @return Returns the cbr.
     */
    public String getCbr() {
        return cbr;
    }
    /**
     * @param cbr The cbr to set.
     */
    public void setCbr(String cbr) {
        this.cbr = cbr;
    }
    /**
     * @return Returns the snNo.
     */
    public String getSnNo() {
        return snNo;
    }
    /**
     * @param snNo The snNo to set.
     */
    public void setSnNo(String snNo) {
        this.snNo = snNo;
    }
    /**
     * @return Returns the ieCd.
     */
    public String getIeCd() {
        return ieCd;
    }
    /**
     * @param ieCd The ieCd to set.
     */
    public void setIeCd(String ieCd) {
        this.ieCd = ieCd;
    }
    /**
     * @return Returns the vslCd.
     */
    public String getVslCd() {
        return vslCd;
    }
    /**
     * @param vslCd The vslCd to set.
     */
    public void setVslCd(String vslCd) {
        this.vslCd = vslCd;
    }
    /**
     * @return Returns the cnsneCd.
     */
    public String getCnsneCd() {
        return cnsneCd;
    }
    /**
     * @param cnsneCd The cnsneCd to set.
     */
    public void setCnsneCd(String cnsneCd) {
        this.cnsneCd = cnsneCd;
    }
    /**
     * @return Returns the modifiedBy.
     */
    public String getModifiedBy() {
        return modifiedBy;
    }
    /**
     * @param modifiedBy The modifiedBy to set.
     */
    public void setModifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }
    /**
     * @return Returns the modifiedDate.
     */
    public String getModifiedDate() {
        return modifiedDate;
    }
    /**
     * @param modifiedDate The modifiedDate to set.
     */
    public void setModifiedDate(String modifiedDate) {
        this.modifiedDate = modifiedDate;
    }
    public String getCustomsAprvStat() {
        return customsAprvStat;
    }
    public void setCustomsAprvStat(String customsAprvStat) {
        this.customsAprvStat = customsAprvStat;
    }
    public String getReleaseNo() {
        return releaseNo;
    }
    public void setReleaseNo(String releaseNo) {
        this.releaseNo = releaseNo;
    }
	public String getExWhId() {
		return exWhId;
	}
	public void setExWhId(String exWhId) {
		this.exWhId = exWhId;
	}
	public String getActivateYN() {
		return activateYN;
	}
	public void setActivateYN(String activateYN) {
		this.activateYN = activateYN;
	}
	public String getInterfacePK() {
		return interfacePK;
	}
	public void setInterfacePK(String interfacePK) {
		this.interfacePK = interfacePK;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUpdUserId() {
		return updUserId;
	}
	public void setUpdUserId(String updUserId) {
		this.updUserId = updUserId;
	}
	public String getCreateUserId() {
		return createUserId;
	}
	public void setCreateUserId(String createUserId) {
		this.createUserId = createUserId;
	}
	public String getChannelCd() {
		return channelCd;
	}
	public void setChannelCd(String channelCd) {
		this.channelCd = channelCd;
	}
	public String getChannelNm() {
		return channelNm;
	}
	public void setChannelNm(String channelNm) {
		this.channelNm = channelNm;
	}
	public String getReleaseMt() {
		return releaseMt;
	}
	public void setReleaseMt(String releaseMt) {
		this.releaseMt = releaseMt;
	}
	public String getReleaseQty() {
		return releaseQty;
	}
	public void setReleaseQty(String releaseQty) {
		this.releaseQty = releaseQty;
	}
	public String getCargoNo() {
		return cargoNo;
	}
	public void setCargoNo(String cargoNo) {
		this.cargoNo = cargoNo;
	}
	public String getCategoryCd() {
		return categoryCd;
	}
	public void setCategoryCd(String categoryCd) {
		this.categoryCd = categoryCd;
	}
	public String getCategoryNm() {
		return categoryNm;
	}
	public void setCategoryNm(String categoryNm) {
		this.categoryNm = categoryNm;
	}
	public String getDocMt() {
		return docMt;
	}
	public void setDocMt(String docMt) {
		this.docMt = docMt;
	}
	public String getDocQty() {
		return docQty;
	}
	public void setDocQty(String docQty) {
		this.docQty = docQty;
	}
	public String getBalanceMt() {
		return balanceMt;
	}
	public void setBalanceMt(String balanceMt) {
		this.balanceMt = balanceMt;
	}
	public String getBalanceQty() {
		return balanceQty;
	}
	public void setBalanceQty(String balanceQty) {
		this.balanceQty = balanceQty;
	}
	public String getShaCd() {
		return shaCd;
	}
	public void setShaCd(String shaCd) {
		this.shaCd = shaCd;
	}
	public String getShaNm() {
		return shaNm;
	}
	public void setShaNm(String shaNm) {
		this.shaNm = shaNm;
	}
	public String getFwdCd() {
		return fwdCd;
	}
	public void setFwdCd(String fwdCd) {
		this.fwdCd = fwdCd;
	}
	public String getFwdNm() {
		return fwdNm;
	}
	public void setFwdNm(String fwdNm) {
		this.fwdNm = fwdNm;
	}
	public String getCnsCd() {
		return cnsCd;
	}
	public void setCnsCd(String cnsCd) {
		this.cnsCd = cnsCd;
	}
	public String getCnsNm() {
		return cnsNm;
	}
	public void setCnsNm(String cnsNm) {
		this.cnsNm = cnsNm;
	}
	public String getCd() {
		return cd;
	}
	public void setCd(String cd) {
		this.cd = cd;
	}
	public String getCdNm() {
		return cdNm;
	}
	public void setCdNm(String cdNm) {
		this.cdNm = cdNm;
	}
	public String getCmdtCd() {
		return cmdtCd;
	}
	public void setCmdtCd(String cmdtCd) {
		this.cmdtCd = cmdtCd;
	}
	public String getCmdtNm() {
		return cmdtNm;
	}
	public void setCmdtNm(String cmdtNm) {
		this.cmdtNm = cmdtNm;
	}
	public String getUpdDate() {
		return updDate;
	}
	public void setUpdDate(String updDate) {
		this.updDate = updDate;
	}
	public String getCrudFlag() {
		return crudFlag;
	}
	public void setCrudFlag(String crudFlag) {
		this.crudFlag = crudFlag;
	}
	public String getBlSon() {
		return blSon;
	}
	public void setBlSon(String blSon) {
		this.blSon = blSon;
	}
	public String getVolanteStatus() {
		return volanteStatus;
	}
	public void setVolanteStatus(String volanteStatus) {
		this.volanteStatus = volanteStatus;
	}
	public String getAbandoNoStatus() {
		return abandoNoStatus;
	}
	public void setAbandoNoStatus(String abandoNoStatus) {
		this.abandoNoStatus = abandoNoStatus;
	}
	public String getPerQty() {
		return perQty;
	}
	public void setPerQty(String perQty) {
		this.perQty = perQty;
	}
	public String getCgTpCd() {
		return cgTpCd;
	}
	public void setCgTpCd(String cgTpCd) {
		this.cgTpCd = cgTpCd;
	}
	public String getBalanceBlSonMt() {
		return balanceBlSonMt;
	}
	public void setBalanceBlSonMt(String balanceBlSonMt) {
		this.balanceBlSonMt = balanceBlSonMt;
	}
	public String getBalanceBlSonQty() {
		return balanceBlSonQty;
	}
	public void setBalanceBlSonQty(String balanceBlSonQty) {
		this.balanceBlSonQty = balanceBlSonQty;
	}
	public String getBondedWhYn() {
		return bondedWhYn;
	}
	public void setBondedWhYn(String bondedWhYn) {
		this.bondedWhYn = bondedWhYn;
	}
	public String getCustGetIn() {
		return custGetIn;
	}
	public void setCustGetIn(String custGetIn) {
		this.custGetIn = custGetIn;
	}
	public String getCustGetOut() {
		return custGetOut;
	}
	public void setCustGetOut(String custGetOut) {
		this.custGetOut = custGetOut;
	}
	public String getUpdatedBy() {
		return updatedBy;
	}
	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}
	public String getDocM3() {
		return docM3;
	}
	public void setDocM3(String docM3) {
		this.docM3 = docM3;
	}
	public String getBalanceM3() {
		return balanceM3;
	}
	public void setBalanceM3(String balanceM3) {
		this.balanceM3 = balanceM3;
	}
	public String getReleaseM3() {
		return releaseM3;
	}
	public void setReleaseM3(String releaseM3) {
		this.releaseM3 = releaseM3;
	}
	
}

