package com.tsb.most.biz.dataitem.planning;

import java.util.Date;

import com.tsb.most.basebiz.dataitem.common.MailItem;
import com.tsb.most.framework.dataitem.DataItem;

public class BerthApprovalItem extends DataItem {
	private String vslNm;
	private String vslCallId;
	private String callYear;
	private String callSeq;
	private String vslColor;
	private String vslTpNm;
	private String vslTp;
	private String vslCd;
	private String eta;
	private String loa;
	private String clrYymm;
	private String summitStat;
	private String summitStatName;
	private String status;
	private String vslFlagCd;
	private String cntryCd;
	private int nrt;
	private int grt;
	private String saCorpId;
	private Date sumitDt;
	private Date insDtm;
	private String berthLoc;
	private String arrvSaId;
	private String berthAprvStat;
	private String berthAprvStatNm;
	private String berthAprvTime;
	private String berthAprvUserId;
	private String balance;
	private String mt;
	private String fileYn;
	private String consignee;
	private String consignor;
	private String operationType;
	private String berthTp;
	private String berthPlanYn;
	private String cargoTp;
	private String curPage;
	private MailItem mailItem;

	public String getBerthAprvStat() {
		return berthAprvStat;
	}

	public void setBerthAprvStat(String berthAprvStat) {
		this.berthAprvStat = berthAprvStat;
	}

	public String getBerthAprvStatNm() {
		return berthAprvStatNm;
	}

	public void setBerthAprvStatNm(String berthAprvStatNm) {
		this.berthAprvStatNm = berthAprvStatNm;
	}

	/**
	 * @return Returns the berthAprvUserId.
	 */
	public String getBerthAprvUserId() {
		return berthAprvUserId;
	}

	/**
	 * @param berthAprvUserId The berthAprvUserId to set.
	 */
	public void setBerthAprvUserId(String berthAprvUserId) {
		this.berthAprvUserId = berthAprvUserId;
	}

	/**
	 * @return Returns the userId.
	 */
	public String getUserId() {
		return userId;
	}

	/**
	 * @param userId The userId to set.
	 */
	public void setUserId(String userId) {
		this.userId = userId;
	} 

	/**
	 * @return Returns the vslColor.
	 */
	public String getVslColor() {
		return vslColor;
	}

	/**
	 * @param vslColor The vslColor to set.
	 */
	public void setVslColor(String vslColor) {
		this.vslColor = vslColor;
	}

	/**
	 * @return Returns the cargoTp.
	 */
	public String getCargoTp() {
		return cargoTp;
	}

	/**
	 * @param cargoTp The cargoTp to set.
	 */
	public void setCargoTp(String cargoTp) {
		this.cargoTp = cargoTp;
	}

	/**
	 * @return Returns the berthPlanYn.
	 */
	public String getBerthPlanYn() {
		return berthPlanYn;
	}

	/**
	 * @param berthPlanYn The berthPlanYn to set.
	 */
	public void setBerthPlanYn(String berthPlanYn) {
		this.berthPlanYn = berthPlanYn;
	}

	/**
	 * @return Returns the berthTp.
	 */
	public String getBerthTp() {
		return berthTp;
	}

	/**
	 * @param berthTp The berthTp to set.
	 */
	public void setBerthTp(String berthTp) {
		this.berthTp = berthTp;
	}

	/**
	 * @return Returns the vslTpNm.
	 */
	public String getVslTpNm() {
		return vslTpNm;
	}

	/**
	 * @param vslTpNm The vslTpNm to set.
	 */
	public void setVslTpNm(String vslTpNm) {
		this.vslTpNm = vslTpNm;
	}

	/**
	 * @return Returns the consignee.
	 */
	public String getConsignee() {
		return consignee;
	}

	/**
	 * @param consignee The consignee to set.
	 */
	public void setConsignee(String consignee) {
		this.consignee = consignee;
	}

	/**
	 * @return Returns the consignor.
	 */
	public String getConsignor() {
		return consignor;
	}

	/**
	 * @param consignor The consignor to set.
	 */
	public void setConsignor(String consignor) {
		this.consignor = consignor;
	}

	/**
	 * @return Returns the operationType.
	 */
	public String getOperationType() {
		return operationType;
	}

	/**
	 * @param operationType The operationType to set.
	 */
	public void setOperationType(String operationType) {
		this.operationType = operationType;
	}

	/**
	 * @return Returns the fileYn.
	 */
	public String getFileYn() {
		return fileYn;
	}

	/**
	 * @param fileYn The fileYn to set.
	 */
	public void setFileYn(String fileYn) {
		this.fileYn = fileYn;
	}

	/**
	 * @return Returns the balance.
	 */
	public String getBalance() {
		return balance;
	}

	/**
	 * @param balance The balance to set.
	 */
	public void setBalance(String balance) {
		this.balance = balance;
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
	 * @return Returns the summitStatName.
	 */
	public String getSummitStatName() {
		return summitStatName;
	}

	/**
	 * @param summitStatName The summitStatName to set.
	 */
	public void setSummitStatName(String summitStatName) {
		this.summitStatName = summitStatName;
	}

	/**
	 * @return Returns the arrvSaId.
	 */
	public String getArrvSaId() {
		return arrvSaId;
	}

	/**
	 * @param arrvSaId The arrvSaId to set.
	 */
	public void setArrvSaId(String arrvSaId) {
		this.arrvSaId = arrvSaId;
	}

	/**
	 * @return Returns the berthLoc.
	 */
	public String getBerthLoc() {
		return berthLoc;
	}

	/**
	 * @param berthLoc The berthLoc to set.
	 */
	public void setBerthLoc(String berthLoc) {
		this.berthLoc = berthLoc;
	}

	/**
	 * @return Returns the clrYymm.
	 */
	public String getClrYymm() {
		return clrYymm;
	}

	/**
	 * @param clrYymm The clrYymm to set.
	 */
	public void setClrYymm(String clrYymm) {
		this.clrYymm = clrYymm;
	}

	/**
	 * @return Returns the cntryCd.
	 */
	public String getCntryCd() {
		return cntryCd;
	}

	/**
	 * @param cntryCd The cntryCd to set.
	 */
	public void setCntryCd(String cntryCd) {
		this.cntryCd = cntryCd;
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
	 * @return Returns the grt.
	 */
	public int getGrt() {
		return grt;
	}

	/**
	 * @param grt The grt to set.
	 */
	public void setGrt(int grt) {
		this.grt = grt;
	}

	/**
	 * @return Returns the loa.
	 */
	public String getLoa() {
		return loa;
	}

	/**
	 * @param loa The loa to set.
	 */
	public void setLoa(String loa) {
		this.loa = loa;
	}

	/**
	 * @return Returns the nrt.
	 */
	public int getNrt() {
		return nrt;
	}

	/**
	 * @param nrt The nrt to set.
	 */
	public void setNrt(int nrt) {
		this.nrt = nrt;
	}

	/**
	 * @return Returns the saCorpId.
	 */
	public String getSaCorpId() {
		return saCorpId;
	}

	/**
	 * @param saCorpId The saCorpId to set.
	 */
	public void setSaCorpId(String saCorpId) {
		this.saCorpId = saCorpId;
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
	 * @return Returns the summitStat.
	 */
	public String getSummitStat() {
		return summitStat;
	}

	/**
	 * @param summitStat The summitStat to set.
	 */
	public void setSummitStat(String summitStat) {
		this.summitStat = summitStat;
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
	 * @return Returns the vslFlagCd.
	 */
	public String getVslFlagCd() {
		return vslFlagCd;
	}

	/**
	 * @param vslFlagCd The vslFlagCd to set.
	 */
	public void setVslFlagCd(String vslFlagCd) {
		this.vslFlagCd = vslFlagCd;
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

	/**
	 * @return Returns the vslTp.
	 */
	public String getVslTp() {
		return vslTp;
	}

	/**
	 * @param vslTp The vslTp to set.
	 */
	public void setVslTp(String vslTp) {
		this.vslTp = vslTp;
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

	public String getCurPage() {
		return curPage;
	}

	public void setCurPage(String curPage) {
		this.curPage = curPage;
	} 

	public Date getSumitDt() {
		return sumitDt;
	}

	public void setSumitDt(Date sumitDt) {
		this.sumitDt = sumitDt;
	}

	public Date getInsDtm() {
		return insDtm;
	}

	public void setInsDtm(Date insDtm) {
		this.insDtm = insDtm;
	}

	public MailItem getMailItem() {
		return mailItem;
	}

	public void setMailItem(MailItem mailItem) {
		this.mailItem = mailItem;
	}

	public String getVslCallId() {
		return vslCallId;
	}

	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}

	public String getBerthAprvTime() {
		return berthAprvTime;
	}

	public void setBerthAprvTime(String berthAprvTime) {
		this.berthAprvTime = berthAprvTime;
	}
}