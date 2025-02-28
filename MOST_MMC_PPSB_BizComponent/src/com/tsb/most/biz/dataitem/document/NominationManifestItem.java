package com.tsb.most.biz.dataitem.document;

import java.util.ArrayList;

import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.framework.dataitem.DataItem;

public class NominationManifestItem extends DataItem {
	
	private static final long serialVersionUID = 1L;

    private String chk;
    private String docId;
    private String jobNo;
    private String mfDocId;
    private String mfJobNo;
    private String vslCd;
    private String scn;
    private String callSeq;
    private String callYear;
    private String cgInoutTp;
    private String blNo;
    private String hblNo;
    private String cnsneOdr1;
    private String cnsneOdr2;
    private String totCntrCnt;
    private String pkgQty;
    private String pkgTpCd;
    private String pgkTpCd;
    private String pkgTpCdNm;
    private String pkgMark;
    private String wgt;
    private String wgtUnit;
    private String vol;
    private String volUnit;
    private String pductCd;
    private String gdsRmk;
    private String custGdsRmk;
    private String rmk;
    private String cgTpCd;
    private String cgTpCdNm;
    private String pol;
    private String pod;
    private String fnlPortCd;
    private String blClassCd;
    private String cgClassCd;
    private String opClassCd;
    private String imdgClass;
    private String unno;
    private String substance;
    private String cnntVslCd;
    private String insUserId;
    private String insDtm;
    private String updUserId;
    private String updDtm;
    private String hsCdDiv;
    private String hsCd;
    private String pkgTpNm;
    private String polNm;
    private String podNm;
    private String fnlPortNm;
    private String doNo;
    private String fwdCd;
    private String fwdNm;
    private String cnsCd;
    private String cnsNm;
    private String delvTpCd;
    private String vslCallId;
    private String zipCd;
    private String addr1;
    private String addr2;
    private String addr3;
    private String addr4;
    private String cnsnorCd;
    private String cnsnorNm;
    private String impAddr;
    private String expAddr;
    private String customsAprvDt;
    private String customsAprvStat;
    private String releaseNo;
    private String delvTpNm;
    private String status;
    private String dgSeq;
    private String dgStatCd;
    private String dgStatNm;
    private String dgAprvDt;
    private String packingList;
    private String ufileName;
    private String fileName;
    
    //DGDelaration items
    private String insDGYn;
    private String freeZoneDiv;
    private String flashPnt;
    private String hazChem;
    private String priCd;
    private String priGrp;
    private String rmk1;
    private String propSnm;
    private String holdChk;
    private String contactNm;
    private String contactNo;
    private String atb;
    private String atw;
    
    private String itChk ;
    private ArrayList<NominationManifestItem> items;
    private ArrayList<FileUploadItem> uploadItems;
    private String arrvSaId;
    private String imdg;
    
    public String getAtb() {
		return atb;
	}
	public void setAtb(String atb) {
		this.atb = atb;
	}
	public String getAtw() {
		return atw;
	}
	public void setAtw(String atw) {
		this.atw = atw;
	}
	public ArrayList<FileUploadItem> getUploadItems() {
		return uploadItems;
	}
	public void setUploadItems(ArrayList<FileUploadItem> uploadItems) {
		this.uploadItems = uploadItems;
	}
	public String getImdg() {
		return imdg;
	}
	public void setImdg(String imdg) {
		this.imdg = imdg;
	}
	public String getArrvSaId() {
		return arrvSaId;
	}
	public void setArrvSaId(String arrvSaId) {
		this.arrvSaId = arrvSaId;
	}
	public String getItChk() {
		return itChk;
	}
	public void setItChk(String itChk) {
		this.itChk = itChk;
	}
	public ArrayList<NominationManifestItem> getItems() {
		return items;
	}
	public void setItems(ArrayList<NominationManifestItem> items) {
		this.items = items;
	}
	public String getContactNm() {
        return contactNm;
    }
    public void setContactNm(String contactNm) {
        this.contactNm = contactNm;
    }
    public String getContactNo() {
        return contactNo;
    }
    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }
    public String getReleaseNo() {
        return releaseNo;
    }
    public void setReleaseNo(String releaseNo) {
        this.releaseNo = releaseNo;
    }
    /**
     * @return Returns the addr1.
     */
    public String getAddr1() {
        return addr1;
    }
    /**
     * @param addr1 The addr1 to set.
     */
    public void setAddr1(String addr1) {
        this.addr1 = addr1;
    }
    /**
     * @return Returns the addr2.
     */
    public String getAddr2() {
        return addr2;
    }
    /**
     * @param addr2 The addr2 to set.
     */
    public void setAddr2(String addr2) {
        this.addr2 = addr2;
    }
    /**
     * @return Returns the addr3.
     */
    public String getAddr3() {
        return addr3;
    }
    /**
     * @param addr3 The addr3 to set.
     */
    public void setAddr3(String addr3) {
        this.addr3 = addr3;
    }
    /**
     * @return Returns the addr4.
     */
    public String getAddr4() {
        return addr4;
    }
    /**
     * @param addr4 The addr4 to set.
     */
    public void setAddr4(String addr4) {
        this.addr4 = addr4;
    }
    /**
     * @return Returns the blClassCd.
     */
    public String getBlClassCd() {
        return blClassCd;
    }
    /**
     * @param blClassCd The blClassCd to set.
     */
    public void setBlClassCd(String blClassCd) {
        this.blClassCd = blClassCd;
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
     * @return Returns the callSeq.
     */
    public String getCallSeq() {
        return callSeq;
    }
    /**
     * @param callSeq The callSeq to set.
     */
    public void setCallSeq(String callSeq) {
        this.callSeq = callSeq;
    }
    /**
     * @return Returns the callYear.
     */
    public String getCallYear() {
        return callYear;
    }
    /**
     * @param callYear The callYear to set.
     */
    public void setCallYear(String callYear) {
        this.callYear = callYear;
    }
    /**
     * @return Returns the cgClassCd.
     */
    public String getCgClassCd() {
        return cgClassCd;
    }
    /**
     * @param cgClassCd The cgClassCd to set.
     */
    public void setCgClassCd(String cgClassCd) {
        this.cgClassCd = cgClassCd;
    }
    /**
     * @return Returns the cgInoutTp.
     */
    public String getCgInoutTp() {
        return cgInoutTp;
    }
    /**
     * @param cgInoutTp The cgInoutTp to set.
     */
    public void setCgInoutTp(String cgInoutTp) {
        this.cgInoutTp = cgInoutTp;
    }
    /**
     * @return Returns the cgTpCd.
     */
    public String getCgTpCd() {
        return cgTpCd;
    }
    /**
     * @param cgTpCd The cgTpCd to set.
     */
    public void setCgTpCd(String cgTpCd) {
        this.cgTpCd = cgTpCd;
    }
    /**
     * @return Returns the cgTpCdNm.
     */
    public String getCgTpCdNm() {
        return cgTpCdNm;
    }
    /**
     * @param cgTpCdNm The cgTpCdNm to set.
     */
    public void setCgTpCdNm(String cgTpCdNm) {
        this.cgTpCdNm = cgTpCdNm;
    }
    /**
     * @return Returns the chk.
     */
    public String getChk() {
        return chk;
    }
    /**
     * @param chk The chk to set.
     */
    public void setChk(String chk) {
        this.chk = chk;
    }
    /**
     * @return Returns the cnntVslCd.
     */
    public String getCnntVslCd() {
        return cnntVslCd;
    }
    /**
     * @param cnntVslCd The cnntVslCd to set.
     */
    public void setCnntVslCd(String cnntVslCd) {
        this.cnntVslCd = cnntVslCd;
    }
    /**
     * @return Returns the cnsCd.
     */
    public String getCnsCd() {
        return cnsCd;
    }
    /**
     * @param cnsCd The cnsCd to set.
     */
    public void setCnsCd(String cnsCd) {
        this.cnsCd = cnsCd;
    }
    /**
     * @return Returns the cnsneOdr1.
     */
    public String getCnsneOdr1() {
        return cnsneOdr1;
    }
    /**
     * @param cnsneOdr1 The cnsneOdr1 to set.
     */
    public void setCnsneOdr1(String cnsneOdr1) {
        this.cnsneOdr1 = cnsneOdr1;
    }
    /**
     * @return Returns the cnsneOdr2.
     */
    public String getCnsneOdr2() {
        return cnsneOdr2;
    }
    /**
     * @param cnsneOdr2 The cnsneOdr2 to set.
     */
    public void setCnsneOdr2(String cnsneOdr2) {
        this.cnsneOdr2 = cnsneOdr2;
    }
    /**
     * @return Returns the cnsNm.
     */
    public String getCnsNm() {
        return cnsNm;
    }
    /**
     * @param cnsNm The cnsNm to set.
     */
    public void setCnsNm(String cnsNm) {
        this.cnsNm = cnsNm;
    }
    /**
     * @return Returns the cnsnorCd.
     */
    public String getCnsnorCd() {
        return cnsnorCd;
    }
    /**
     * @param cnsnorCd The cnsnorCd to set.
     */
    public void setCnsnorCd(String cnsnorCd) {
        this.cnsnorCd = cnsnorCd;
    }
    /**
     * @return Returns the cnsnorNm.
     */
    public String getCnsnorNm() {
        return cnsnorNm;
    }
    /**
     * @param cnsnorNm The cnsnorNm to set.
     */
    public void setCnsnorNm(String cnsnorNm) {
        this.cnsnorNm = cnsnorNm;
    }
    /**
     * @return Returns the custGdsRmk.
     */
    public String getCustGdsRmk() {
        return custGdsRmk;
    }
    /**
     * @param custGdsRmk The custGdsRmk to set.
     */
    public void setCustGdsRmk(String custGdsRmk) {
        this.custGdsRmk = custGdsRmk;
    }
    /**
     * @return Returns the customsAprvDt.
     */
    public String getCustomsAprvDt() {
        return customsAprvDt;
    }
    /**
     * @param customsAprvDt The customsAprvDt to set.
     */
    public void setCustomsAprvDt(String customsAprvDt) {
        this.customsAprvDt = customsAprvDt;
    }
    /**
     * @return Returns the customsAprvStat.
     */
    public String getCustomsAprvStat() {
        return customsAprvStat;
    }
    /**
     * @param customsAprvStat The customsAprvStat to set.
     */
    public void setCustomsAprvStat(String customsAprvStat) {
        this.customsAprvStat = customsAprvStat;
    }
    /**
     * @return Returns the delvTpCd.
     */
    public String getDelvTpCd() {
        return delvTpCd;
    }
    /**
     * @param delvTpCd The delvTpCd to set.
     */
    public void setDelvTpCd(String delvTpCd) {
        this.delvTpCd = delvTpCd;
    }
    /**
     * @return Returns the delvTpNm.
     */
    public String getDelvTpNm() {
        return delvTpNm;
    }
    /**
     * @param delvTpNm The delvTpNm to set.
     */
    public void setDelvTpNm(String delvTpNm) {
        this.delvTpNm = delvTpNm;
    }
    /**
     * @return Returns the dgAprvDt.
     */
    public String getDgAprvDt() {
        return dgAprvDt;
    }
    /**
     * @param dgAprvDt The dgAprvDt to set.
     */
    public void setDgAprvDt(String dgAprvDt) {
        this.dgAprvDt = dgAprvDt;
    }
    /**
     * @return Returns the dgSeq.
     */
    public String getDgSeq() {
        return dgSeq;
    }
    /**
     * @param dgSeq The dgSeq to set.
     */
    public void setDgSeq(String dgSeq) {
        this.dgSeq = dgSeq;
    }
    /**
     * @return Returns the dgStatCd.
     */
    public String getDgStatCd() {
        return dgStatCd;
    }
    /**
     * @param dgStatCd The dgStatCd to set.
     */
    public void setDgStatCd(String dgStatCd) {
        this.dgStatCd = dgStatCd;
    }
    /**
     * @return Returns the dgStatNm.
     */
    public String getDgStatNm() {
        return dgStatNm;
    }
    /**
     * @param dgStatNm The dgStatNm to set.
     */
    public void setDgStatNm(String dgStatNm) {
        this.dgStatNm = dgStatNm;
    }
    /**
     * @return Returns the docId.
     */
    public String getDocId() {
        return docId;
    }
    /**
     * @param docId The docId to set.
     */
    public void setDocId(String docId) {
        this.docId = docId;
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
     * @return Returns the expAddr.
     */
    public String getExpAddr() {
        return expAddr;
    }
    /**
     * @param expAddr The expAddr to set.
     */
    public void setExpAddr(String expAddr) {
        this.expAddr = expAddr;
    }
    /**
     * @return Returns the fileName.
     */
    public String getFileName() {
        return fileName;
    }
    /**
     * @param fileName The fileName to set.
     */
    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
    /**
     * @return Returns the flashPnt.
     */
    public String getFlashPnt() {
        return flashPnt;
    }
    /**
     * @param flashPnt The flashPnt to set.
     */
    public void setFlashPnt(String flashPnt) {
        this.flashPnt = flashPnt;
    }
    /**
     * @return Returns the fnlPortCd.
     */
    public String getFnlPortCd() {
        return fnlPortCd;
    }
    /**
     * @param fnlPortCd The fnlPortCd to set.
     */
    public void setFnlPortCd(String fnlPortCd) {
        this.fnlPortCd = fnlPortCd;
    }
    /**
     * @return Returns the fnlPortNm.
     */
    public String getFnlPortNm() {
        return fnlPortNm;
    }
    /**
     * @param fnlPortNm The fnlPortNm to set.
     */
    public void setFnlPortNm(String fnlPortNm) {
        this.fnlPortNm = fnlPortNm;
    }
    /**
     * @return Returns the freeZoneDiv.
     */
    public String getFreeZoneDiv() {
        return freeZoneDiv;
    }
    /**
     * @param freeZoneDiv The freeZoneDiv to set.
     */
    public void setFreeZoneDiv(String freeZoneDiv) {
        this.freeZoneDiv = freeZoneDiv;
    }
    /**
     * @return Returns the fwdCd.
     */
    public String getFwdCd() {
        return fwdCd;
    }
    /**
     * @param fwdCd The fwdCd to set.
     */
    public void setFwdCd(String fwdCd) {
        this.fwdCd = fwdCd;
    }
    /**
     * @return Returns the fwdNm.
     */
    public String getFwdNm() {
        return fwdNm;
    }
    /**
     * @param fwdNm The fwdNm to set.
     */
    public void setFwdNm(String fwdNm) {
        this.fwdNm = fwdNm;
    }
    /**
     * @return Returns the gdsRmk.
     */
    public String getGdsRmk() {
        return gdsRmk;
    }
    /**
     * @param gdsRmk The gdsRmk to set.
     */
    public void setGdsRmk(String gdsRmk) {
        this.gdsRmk = gdsRmk;
    }
    /**
     * @return Returns the hazChem.
     */
    public String getHazChem() {
        return hazChem;
    }
    /**
     * @param hazChem The hazChem to set.
     */
    public void setHazChem(String hazChem) {
        this.hazChem = hazChem;
    }
    /**
     * @return Returns the hblNo.
     */
    public String getHblNo() {
        return hblNo;
    }
    /**
     * @param hblNo The hblNo to set.
     */
    public void setHblNo(String hblNo) {
        this.hblNo = hblNo;
    }
    /**
     * @return Returns the holdChk.
     */
    public String getHoldChk() {
        return holdChk;
    }
    /**
     * @param holdChk The holdChk to set.
     */
    public void setHoldChk(String holdChk) {
        this.holdChk = holdChk;
    }
    /**
     * @return Returns the hsCd.
     */
    public String getHsCd() {
        return hsCd;
    }
    /**
     * @param hsCd The hsCd to set.
     */
    public void setHsCd(String hsCd) {
        this.hsCd = hsCd;
    }
    /**
     * @return Returns the hsCdDiv.
     */
    public String getHsCdDiv() {
        return hsCdDiv;
    }
    /**
     * @param hsCdDiv The hsCdDiv to set.
     */
    public void setHsCdDiv(String hsCdDiv) {
        this.hsCdDiv = hsCdDiv;
    }
    /**
     * @return Returns the imdgClass.
     */
    public String getImdgClass() {
        return imdgClass;
    }
    /**
     * @param imdgClass The imdgClass to set.
     */
    public void setImdgClass(String imdgClass) {
        this.imdgClass = imdgClass;
    }
    /**
     * @return Returns the impAddr.
     */
    public String getImpAddr() {
        return impAddr;
    }
    /**
     * @param impAddr The impAddr to set.
     */
    public void setImpAddr(String impAddr) {
        this.impAddr = impAddr;
    }
    /**
     * @return Returns the insDGYn.
     */
    public String getInsDGYn() {
        return insDGYn;
    }
    /**
     * @param insDGYn The insDGYn to set.
     */
    public void setInsDGYn(String insDGYn) {
        this.insDGYn = insDGYn;
    }
    /**
     * @return Returns the insDtm.
     */
    public String getInsDtm() {
        return insDtm;
    }
    /**
     * @param insDtm The insDtm to set.
     */
    public void setInsDtm(String insDtm) {
        this.insDtm = insDtm;
    }
    /**
     * @return Returns the insUserId.
     */
    public String getInsUserId() {
        return insUserId;
    }
    /**
     * @param insUserId The insUserId to set.
     */
    public void setInsUserId(String insUserId) {
        this.insUserId = insUserId;
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
     * @return Returns the mfDocId.
     */
    public String getMfDocId() {
        return mfDocId;
    }
    /**
     * @param mfDocId The mfDocId to set.
     */
    public void setMfDocId(String mfDocId) {
        this.mfDocId = mfDocId;
    }
    /**
     * @return Returns the mfJobNo.
     */
    public String getMfJobNo() {
        return mfJobNo;
    }
    /**
     * @param mfJobNo The mfJobNo to set.
     */
    public void setMfJobNo(String mfJobNo) {
        this.mfJobNo = mfJobNo;
    }
    /**
     * @return Returns the opClassCd.
     */
    public String getOpClassCd() {
        return opClassCd;
    }
    /**
     * @param opClassCd The opClassCd to set.
     */
    public void setOpClassCd(String opClassCd) {
        this.opClassCd = opClassCd;
    }
    /**
     * @return Returns the packingList.
     */
    public String getPackingList() {
        return packingList;
    }
    /**
     * @param packingList The packingList to set.
     */
    public void setPackingList(String packingList) {
        this.packingList = packingList;
    }
    /**
     * @return Returns the pductCd.
     */
    public String getPductCd() {
        return pductCd;
    }
    /**
     * @param pductCd The pductCd to set.
     */
    public void setPductCd(String pductCd) {
        this.pductCd = pductCd;
    }
    /**
     * @return Returns the pkgMark.
     */
    public String getPkgMark() {
        return pkgMark;
    }
    /**
     * @param pkgMark The pkgMark to set.
     */
    public void setPkgMark(String pkgMark) {
        this.pkgMark = pkgMark;
    }
    /**
     * @return Returns the pkgQty.
     */
    public String getPkgQty() {
        return pkgQty;
    }
    /**
     * @param pkgQty The pkgQty to set.
     */
    public void setPkgQty(String pkgQty) {
        this.pkgQty = pkgQty;
    }
    /**
     * @return Returns the pkgTpCd.
     */
    public String getPkgTpCd() {
        return pkgTpCd;
    }
    /**
     * @param pkgTpCd The pkgTpCd to set.
     */
    public void setPkgTpCd(String pkgTpCd) {
        this.pkgTpCd = pkgTpCd;
    }
    /**
     * @return Returns the pkgTpCdNm.
     */
    public String getPkgTpCdNm() {
        return pkgTpCdNm;
    }
    /**
     * @param pkgTpCdNm The pkgTpCdNm to set.
     */
    public void setPkgTpCdNm(String pkgTpCdNm) {
        this.pkgTpCdNm = pkgTpCdNm;
    }
    /**
     * @return Returns the pkgTpNm.
     */
    public String getPkgTpNm() {
        return pkgTpNm;
    }
    /**
     * @param pkgTpNm The pkgTpNm to set.
     */
    public void setPkgTpNm(String pkgTpNm) {
        this.pkgTpNm = pkgTpNm;
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
     * @return Returns the podNm.
     */
    public String getPodNm() {
        return podNm;
    }
    /**
     * @param podNm The podNm to set.
     */
    public void setPodNm(String podNm) {
        this.podNm = podNm;
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
     * @return Returns the polNm.
     */
    public String getPolNm() {
        return polNm;
    }
    /**
     * @param polNm The polNm to set.
     */
    public void setPolNm(String polNm) {
        this.polNm = polNm;
    }
    /**
     * @return Returns the priCd.
     */
    public String getPriCd() {
        return priCd;
    }
    /**
     * @param priCd The priCd to set.
     */
    public void setPriCd(String priCd) {
        this.priCd = priCd;
    }
    /**
     * @return Returns the priGrp.
     */
    public String getPriGrp() {
        return priGrp;
    }
    /**
     * @param priGrp The priGrp to set.
     */
    public void setPriGrp(String priGrp) {
        this.priGrp = priGrp;
    }
    /**
     * @return Returns the propSnm.
     */
    public String getPropSnm() {
        return propSnm;
    }
    /**
     * @param propSnm The propSnm to set.
     */
    public void setPropSnm(String propSnm) {
        this.propSnm = propSnm;
    }
    /**
     * @return Returns the rmk.
     */
    public String getRmk() {
        return rmk;
    }
    /**
     * @param rmk The rmk to set.
     */
    public void setRmk(String rmk) {
        this.rmk = rmk;
    }
    /**
     * @return Returns the rmk1.
     */
    public String getRmk1() {
        return rmk1;
    }
    /**
     * @param rmk1 The rmk1 to set.
     */
    public void setRmk1(String rmk1) {
        this.rmk1 = rmk1;
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
     * @return Returns the substance.
     */
    public String getSubstance() {
        return substance;
    }
    /**
     * @param substance The substance to set.
     */
    public void setSubstance(String substance) {
        this.substance = substance;
    }
    /**
     * @return Returns the totCntrCnt.
     */
    public String getTotCntrCnt() {
        return totCntrCnt;
    }
    /**
     * @param totCntrCnt The totCntrCnt to set.
     */
    public void setTotCntrCnt(String totCntrCnt) {
        this.totCntrCnt = totCntrCnt;
    }
    /**
     * @return Returns the ufileName.
     */
    public String getUfileName() {
        return ufileName;
    }
    /**
     * @param ufileName The ufileName to set.
     */
    public void setUfileName(String ufileName) {
        this.ufileName = ufileName;
    }
    /**
     * @return Returns the unno.
     */
    public String getUnno() {
        return unno;
    }
    /**
     * @param unno The unno to set.
     */
    public void setUnno(String unno) {
        this.unno = unno;
    }
    /**
     * @return Returns the updDtm.
     */
    public String getUpdDtm() {
        return updDtm;
    }
    /**
     * @param updDtm The updDtm to set.
     */
    public void setUpdDtm(String updDtm) {
        this.updDtm = updDtm;
    }
    /**
     * @return Returns the updUserId.
     */
    public String getUpdUserId() {
        return updUserId;
    }
    /**
     * @param updUserId The updUserId to set.
     */
    public void setUpdUserId(String updUserId) {
        this.updUserId = updUserId;
    }
    /**
     * @return Returns the vol.
     */
    public String getVol() {
        return vol;
    }
    /**
     * @param vol The vol to set.
     */
    public void setVol(String vol) {
        this.vol = vol;
    }
    /**
     * @return Returns the volUnit.
     */
    public String getVolUnit() {
        return volUnit;
    }
    /**
     * @param volUnit The volUnit to set.
     */
    public void setVolUnit(String volUnit) {
        this.volUnit = volUnit;
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
     * @return Returns the wgt.
     */
    public String getWgt() {
        return wgt;
    }
    /**
     * @param wgt The wgt to set.
     */
    public void setWgt(String wgt) {
        this.wgt = wgt;
    }
    /**
     * @return Returns the wgtUnit.
     */
    public String getWgtUnit() {
        return wgtUnit;
    }
    /**
     * @param wgtUnit The wgtUnit to set.
     */
    public void setWgtUnit(String wgtUnit) {
        this.wgtUnit = wgtUnit;
    }
    /**
     * @return Returns the zipCd.
     */
    public String getZipCd() {
        return zipCd;
    }
    /**
     * @param zipCd The zipCd to set.
     */
    public void setZipCd(String zipCd) {
        this.zipCd = zipCd;
    }
	public String getPgkTpCd() {
		return pgkTpCd;
	}
	public void setPgkTpCd(String pgkTpCd) {
		this.pgkTpCd = pgkTpCd;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
}
