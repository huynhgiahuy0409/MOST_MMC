package com.tsb.most.biz.dataitem.operation;

import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

public class VesselDraftSurveyItem extends DataItem {

	private static final long serialVersionUID = -7751747625213109246L;

	private String vslCd;
	private String scn;
	private String vslCallId;
	private Integer seq;
	private String tmnlCd;
	private String mfDocId;
	private String blNo;
	private String snNo;
	private String cgNo;
	private String catgCd;
	private String cmdtGrpCd;
	private String cmdtCd;
	private String pkgTpCd;
	private String cgTpCd;
	private String tsptTpCd;
	private String delvTpCd;
	private Double docWgt;
	private Double weighbridgeWgt;
	private Double draftSurveyWgt;
	private Double initialReadingWgt;
	private Double finalReadingWgt;
	private Double operationWgt;
	private String rmk;
	private Integer numberOfCalls;
	private String updateDt;
	private String surveyorId;
	private String tsptTpNm;

	private List<VesselDraftSurveyItem> oldVslDraftSurveyDtlList;
	private VesselDraftSurveyItem oldVslDraftSurveyItem;

	public List<VesselDraftSurveyItem> getOldVslDraftSurveyDtlList() {
		return oldVslDraftSurveyDtlList;
	}

	public void setOldVslDraftSurveyDtlList(List<VesselDraftSurveyItem> oldVslDraftSurveyDtlList) {
		this.oldVslDraftSurveyDtlList = oldVslDraftSurveyDtlList;
	}

	public VesselDraftSurveyItem getOldVslDraftSurveyItem() {
		return oldVslDraftSurveyItem;
	}

	public void setOldVslDraftSurveyItem(VesselDraftSurveyItem oldVslDraftSurveyItem) {
		this.oldVslDraftSurveyItem = oldVslDraftSurveyItem;
	}

	public String getVslCd() {
		return vslCd;
	}

	public void setVslCd(String vslCd) {
		this.vslCd = vslCd;
	}

	public String getScn() {
		return scn;
	}

	public void setScn(String scn) {
		this.scn = scn;
	}

	public String getVslCallId() {
		return vslCallId;
	}

	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}

	public Integer getSeq() {
		return seq;
	}

	public void setSeq(Integer seq) {
		this.seq = seq;
	}

	public String getTmnlCd() {
		return tmnlCd;
	}

	public void setTmnlCd(String tmnlCd) {
		this.tmnlCd = tmnlCd;
	}

	public String getMfDocId() {
		return mfDocId;
	}

	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}

	public String getBlNo() {
		return blNo;
	}

	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}

	public String getSnNo() {
		return snNo;
	}

	public void setSnNo(String snNo) {
		this.snNo = snNo;
	}

	public String getCatgCd() {
		return catgCd;
	}

	public void setCatgCd(String catgCd) {
		this.catgCd = catgCd;
	}

	public String getCmdtGrpCd() {
		return cmdtGrpCd;
	}

	public void setCmdtGrpCd(String cmdtGrpCd) {
		this.cmdtGrpCd = cmdtGrpCd;
	}

	public String getCmdtCd() {
		return cmdtCd;
	}

	public void setCmdtCd(String cmdtCd) {
		this.cmdtCd = cmdtCd;
	}

	public String getPkgTpCd() {
		return pkgTpCd;
	}

	public void setPkgTpCd(String pkgTpCd) {
		this.pkgTpCd = pkgTpCd;
	}

	public String getCgTpCd() {
		return cgTpCd;
	}

	public void setCgTpCd(String cgTpCd) {
		this.cgTpCd = cgTpCd;
	}

	public String getTsptTpCd() {
		return tsptTpCd;
	}

	public void setTsptTpCd(String tsptTpCd) {
		this.tsptTpCd = tsptTpCd;
	}

	public String getDelvTpCd() {
		return delvTpCd;
	}

	public void setDelvTpCd(String delvTpCd) {
		this.delvTpCd = delvTpCd;
	}

	public Double getDocWgt() {
		return docWgt;
	}

	public void setDocWgt(Double docWgt) {
		this.docWgt = docWgt;
	}

	public String getRmk() {
		return rmk;
	}

	public void setRmk(String rmk) {
		this.rmk = rmk;
	}

	public String getUpdateDt() {
		return updateDt;
	}

	public void setUpdateDt(String updateDt) {
		this.updateDt = updateDt;
	}

	public String getSurveyorId() {
		return surveyorId;
	}

	public void setSurveyorId(String surveyorId) {
		this.surveyorId = surveyorId;
	}

	public String getCgNo() {
		return cgNo;
	}

	public void setCgNo(String cgNo) {
		this.cgNo = cgNo;
	}

	public Double getWeighbridgeWgt() {
		return weighbridgeWgt;
	}

	public void setWeighbridgeWgt(Double weighbridgeWgt) {
		this.weighbridgeWgt = weighbridgeWgt;
	}

	public Double getDraftSurveyWgt() {
		return draftSurveyWgt;
	}

	public void setDraftSurveyWgt(Double draftSurveyWgt) {
		this.draftSurveyWgt = draftSurveyWgt;
	}

	public Double getInitialReadingWgt() {
		return initialReadingWgt;
	}

	public void setInitialReadingWgt(Double initialReadingWgt) {
		this.initialReadingWgt = initialReadingWgt;
	}

	public Double getFinalReadingWgt() {
		return finalReadingWgt;
	}

	public void setFinalReadingWgt(Double finalReadingWgt) {
		this.finalReadingWgt = finalReadingWgt;
	}

	public Integer getNumberOfCalls() {
		return numberOfCalls;
	}

	public void setNumberOfCalls(Integer numberOfCalls) {
		this.numberOfCalls = numberOfCalls;
	}

	public String getTsptTpNm() {
		return tsptTpNm;
	}

	public void setTsptTpNm(String tsptTpNm) {
		this.tsptTpNm = tsptTpNm;
	}

	public Double getOperationWgt() {
		return operationWgt;
	}

	public void setOperationWgt(Double operationWgt) {
		this.operationWgt = operationWgt;
	}

}
