/**
* CustomerCleranceItem.java
*
* Created on   : Feb 28, 2009
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* Feb 28, 2009   An Doan 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.document;
import java.util.ArrayList;

import com.tsb.most.framework.dataitem.DataItem;
/**
 * @author lamthanhtung
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class DocumentCleranceItem extends DataItem {
    private String vslCd;
    private String callYear;
    private String callSeq;
    private String vslCallId;
    private String saId;
    private String eta;
    private String jobNo;
    private String regNo;
    private String confmDate;
    private String isps;
    private String crc;
    private String stowage;
    private String snDate;
    private String grDate;
    private String doDate;
    private String mgDate;
    private String fnDate;
    private String confmDate1;
    private String confmDate2;
    private String ivAdvice;
    private String lorryAsg;
    private String vslType;
    private String opeType;
    private String cgType;
    private String vslNm;
    private String submitDt;
    private String amendDt;
    private String etaFinal;
    private String cgTypeDisplay;
    private String scd;
    private String scdNm;
    private String opeCd;
    
    private String delvTpCd;
    private String tempReady;
    private String cgReady;
    private String tankReady;
    private String ullageReady;
    private String docReady;
    private String ata;
    
    private String docSno;
	private String docId;
	private String docApplyStat;
	private String insUserId;
	private String docDiv;
	private String docApprvStat;
	private String apprvCd;
	private String apprvRmk;
	private String empNo;
	private String vslPartFrsAccNo;
	private String vslSchStat;
	private String vslShcVslCallId;
	private String vslSchPortVisitId;
	private String complete;
	private ArrayList<DocumentCleranceItem> documentCleranceList;
	public String getDocSno() {
		return docSno;
	}
	public String getDocId() {
		return docId;
	}
	public String getDocApplyStat() {
		return docApplyStat;
	}
	public String getInsUserId() {
		return insUserId;
	}
	public String getDocDiv() {
		return docDiv;
	}
	public String getDocApprvStat() {
		return docApprvStat;
	}
	public String getApprvCd() {
		return apprvCd;
	}
	public String getApprvRmk() {
		return apprvRmk;
	}
	public String getEmpNo() {
		return empNo;
	}
	public String getVslPartFrsAccNo() {
		return vslPartFrsAccNo;
	}
	public String getVslSchStat() {
		return vslSchStat;
	}
	public String getVslShcVslCallId() {
		return vslShcVslCallId;
	}
	public String getVslSchPortVisitId() {
		return vslSchPortVisitId;
	}
	public void setDocSno(String docSno) {
		this.docSno = docSno;
	}
	public void setDocId(String docId) {
		this.docId = docId;
	}
	public void setDocApplyStat(String docApplyStat) {
		this.docApplyStat = docApplyStat;
	}
	public void setInsUserId(String insUserId) {
		this.insUserId = insUserId;
	}
	public void setDocDiv(String docDiv) {
		this.docDiv = docDiv;
	}
	public void setDocApprvStat(String docApprvStat) {
		this.docApprvStat = docApprvStat;
	}
	public void setApprvCd(String apprvCd) {
		this.apprvCd = apprvCd;
	}
	public void setApprvRmk(String apprvRmk) {
		this.apprvRmk = apprvRmk;
	}
	public void setEmpNo(String empNo) {
		this.empNo = empNo;
	}
	public void setVslPartFrsAccNo(String vslPartFrsAccNo) {
		this.vslPartFrsAccNo = vslPartFrsAccNo;
	}
	public void setVslSchStat(String vslSchStat) {
		this.vslSchStat = vslSchStat;
	}
	public void setVslShcVslCallId(String vslShcVslCallId) {
		this.vslShcVslCallId = vslShcVslCallId;
	}
	public void setVslSchPortVisitId(String vslSchPortVisitId) {
		this.vslSchPortVisitId = vslSchPortVisitId;
	}

    
    public String getAta() {
        return ata;
    }
    public void setAta(String ata) {
        this.ata = ata;
    }
    public String getFnDate() {
        return fnDate;
    }
    public void setFnDate(String fnDate) {
        this.fnDate = fnDate;
    }
    public String getOpeCd() {
        return opeCd;
    }
    public void setOpeCd(String opeCd) {
        this.opeCd = opeCd;
    }
    public String getScd() {
        return scd;
    }
    public void setScd(String scd) {
        this.scd = scd;
    }
    public String getScdNm() {
        return scdNm;
    }
    public void setScdNm(String scdNm) {
        this.scdNm = scdNm;
    }
    public String getCgTypeDisplay() {
        return cgTypeDisplay;
    }
    public void setCgTypeDisplay(String cgTypeDisplay) {
        this.cgTypeDisplay = cgTypeDisplay;
    }
    public String getVslNm() {
        return vslNm;
    }
    public void setVslNm(String vslNm) {
        this.vslNm = vslNm;
    }
    public String getSubmitDt() {
        return submitDt;
    }
    public void setSubmitDt(String submitDt) {
        this.submitDt = submitDt;
    }
    public String getAmendDt() {
        return amendDt;
    }
    public void setAmendDt(String amendDt) {
        this.amendDt = amendDt;
    }
    public String getEtaFinal() {
        return etaFinal;
    }
    public void setEtaFinal(String etaFinal) {
        this.etaFinal = etaFinal;
    }
    public String getCgType() {
        return cgType;
    }
    public void setCgType(String cgType) {
        this.cgType = cgType;
    }
    public String getVslType() {
        return vslType;
    }
    public void setVslType(String vslType) {
        this.vslType = vslType;
    }
    public String getOpeType() {
        return opeType;
    }
    public void setOpeType(String opeType) {
        this.opeType = opeType;
    }
    public String getConfmDate1() {
        return confmDate1;
    }
    public void setConfmDate1(String confmDate1) {
        this.confmDate1 = confmDate1;
    }
    public String getConfmDate2() {
        return confmDate2;
    }
    public void setConfmDate2(String confmDate2) {
        this.confmDate2 = confmDate2;
    }
    public String getIvAdvice() {
        return ivAdvice;
    }
    public void setIvAdvice(String ivAdvice) {
        this.ivAdvice = ivAdvice;
    }
    public String getLorryAsg() {
        return lorryAsg;
    }
    public void setLorryAsg(String lorryAsg) {
        this.lorryAsg = lorryAsg;
    }
    public String getSnDate() {
        return snDate;
    }
    public void setSnDate(String snDate) {
        this.snDate = snDate;
    }
    public String getGrDate() {
        return grDate;
    }
    public void setGrDate(String grDate) {
        this.grDate = grDate;
    }
    public String getDoDate() {
        return doDate;
    }
    public void setDoDate(String doDate) {
        this.doDate = doDate;
    }
    public String getMgDate() {
        return mgDate;
    }
    public void setMgDate(String mgDate) {
        this.mgDate = mgDate;
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
     * @return Returns the confmDate.
     */
    public String getConfmDate() {
        return confmDate;
    }
    /**
     * @param confmDate The confmDate to set.
     */
    public void setConfmDate(String confmDate) {
        this.confmDate = confmDate;
    }
    /**
     * @return Returns the crc.
     */
    public String getCrc() {
        return crc;
    }
    /**
     * @param crc The crc to set.
     */
    public void setCrc(String crc) {
        this.crc = crc;
    }
    /**
     * @return Returns the eta.
     */
    public String getEta() {
        return eta;
    }
    /**
     * @param eta The eta to set.
     */
    public void setEta(String eta) {
        this.eta = eta;
    }
    /**
     * @return Returns the isps.
     */
    public String getIsps() {
        return isps;
    }
    /**
     * @param isps The isps to set.
     */
    public void setIsps(String isps) {
        this.isps = isps;
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
     * @return Returns the saId.
     */
    public String getSaId() {
        return saId;
    }
    /**
     * @param saId The saId to set.
     */
    public void setSaId(String saId) {
        this.saId = saId;
    }
    /**
     * @return Returns the stowage.
     */
    public String getStowage() {
        return stowage;
    }
    /**
     * @param stowage The stowage to set.
     */
    public void setStowage(String stowage) {
        this.stowage = stowage;
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
    public String getDelvTpCd() {
        return delvTpCd;
    }
    public void setDelvTpCd(String delvTpCd) {
        this.delvTpCd = delvTpCd;
    }
    public String getCgReady() {
        return cgReady;
    }
    public void setCgReady(String cgReady) {
        this.cgReady = cgReady;
    }
    public String getDocReady() {
        return docReady;
    }
    public void setDocReady(String docReady) {
        this.docReady = docReady;
    }
    public String getTankReady() {
        return tankReady;
    }
    public void setTankReady(String tankReady) {
        this.tankReady = tankReady;
    }
    public String getTempReady() {
        return tempReady;
    }
    public void setTempReady(String tempReady) {
        this.tempReady = tempReady;
    }
    public String getUllageReady() {
        return ullageReady;
    }
    public void setUllageReady(String ullageReady) {
        this.ullageReady = ullageReady;
    }
	public String getComplete() {
		return complete;
	}
	public void setComplete(String complete) {
		this.complete = complete;
	}
	public ArrayList<DocumentCleranceItem> getDocumentCleranceList() {
		return documentCleranceList;
	}
	public void setDocumentCleranceItem(ArrayList<DocumentCleranceItem> documentCleranceList) {
		this.documentCleranceList = documentCleranceList;
	}
}
