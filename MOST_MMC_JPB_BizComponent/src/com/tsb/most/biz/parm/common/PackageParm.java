package com.tsb.most.biz.parm.common;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class PackageParm extends BaseBizParm{

	private static final long serialVersionUID = 4046477935188761141L;
	private String packageFilePath;

	private String itemId;
	private String itemType;
	private String itemCate;
	private String itemDesc;
	private String templateId;
	private String templateDesc;
	private String templateJson;
	private String shareScope;
	private String packageId;
	private String reportTitle;
//	private String packageDesc;
	
	private String vesselId;
	private String vesselFileId;
	private String vesselName;
	private String ascId;
	private int tag;
	private String origin;
	private String serviceLaneCode;
	private String voyageNo;
	private int callSeq;
	private String vesselScheduleId;
	private String portCode;
	private String ediCategory;
	private String terminalCode;
	private String berthCode;
	private String imoNo;

	//Need below 3 properties??????
	private String printType;
	private String description;
	//private String printTypeDivision;

	//edi
	private String baplieEdiVersion;					//1.5, 2.0, 2.2
	private String movinsEdiVersion;					//2.0	
	
	//Print Option
	private String printPaperSize;						//A4, A3
	private String printSizeMark;						//20FT, 40FT
	private String print40ftBayWith;					//F : FORE, A : AFTER
	private String printContainerHeight;				//ACTUAL, NORMAL
	private String printTierNoDisplay;					//LEFT, RIGHT, BOTH
	private String colorType;
	private String printPageType;						// S, M
	
	//Ship in port
	private String berthType;
	private Date etaFrom;
	private Date etaTo;
	private long etaFrom2;
	private long etaTo2;
	private String searchType;
	private String viewMode;
	private String tmnlName;

	public String getTmnlName() {
		return tmnlName;
	}

	public void setTmnlName(String tmnlName) {
		this.tmnlName = tmnlName;
	}

	public String getSearchType() {
		return searchType;
	}

	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	
	public String getViewMode() {
		return viewMode;
	}

	public void setViewMode(String viewMode) {
		this.viewMode = viewMode;
	}

	public String getBerthType() {
		return berthType;
	}

	public void setBerthType(String berthType) {
		this.berthType = berthType;
	}

	public long getEtaFrom2() {
		return etaFrom2;
	}
	public void setEtaFrom2(long etaFrom2) {
		this.etaFrom2 = etaFrom2;
		this.etaFrom = new Date(etaFrom2);
	}
	public long getEtaTo2() {
		return etaTo2;
	}
	public void setEtaTo2(long etaTo2) {
		this.etaTo2 = etaTo2;
		this.etaTo = new Date(etaTo2);
	}
	
	public Date getEtaFrom() {
		return etaFrom;
	}
	public void setEtaFrom(Date etaFrom) {
		this.etaFrom = etaFrom;
	}
	public Date getEtaTo() {
		return etaTo;
	}
	public void setEtaTo(Date etaTo) {
		this.etaTo = etaTo;
	}

	public String getPrintPageType() {
		return printPageType;
	}

	public void setPrintPageType(String printPageType) {
		this.printPageType = printPageType;
	}

	//print - 1) general / 2) bay / 3) list with display field / 4) summary 
	private String dataSource;							//LOAD, DISCHARGE, ARRIVAL, DEPARTURE
	private String generalPlanType;						//GP : general plan, SP : special cargo plan, DP : delivery mode plan, WP : weight class plan, OP : operator plan, HP : handling instruction plan
	private String summaryType;							//LD : Load and Discharge Figures, CW : cargo weight
	private String listType;							//DL : Hazardous Containers, HL: Containers Having Handling Instructions, RL: Reefer Container, OL: Out-Of-Gauge(OOG) Containers, PR: Maersk Line Planned Restow Containers
	private List<String> displayInfo;					//POL, POD, SLOPT-POSITION, ARRV-DEV-SLOTPOSITION, SZTP, CNTR-NO, WEIGHT-KG, WEIGHT-TON, OOG-DIMENTIONS, REEFER-TEMP, IMDG, UNNO, SHIFT-ACCOUNT, SHIFT-REASON, SHIFT-COST-ACCOUNTABLITY, HANDLING-INSTRUCTION
	
	//pivot - aggregate, leftAxis, topAxis
	private List<Object> aggregate;		//The Object type is HashMap
	private List<Object> leftAxis;		//The Object type is HashMap
	private List<Object> topAxis;		//The Object type is HashMap
	
	//package List path
	private List<String> ediFilePath = new ArrayList<String>();

	public String getItemId() {
		return itemId;
	}

	public void setItemId(String itemId) {
		this.itemId = itemId;
	}

	public String getItemType() {
		return itemType;
	}

	public void setItemType(String itemType) {
		this.itemType = itemType;
	}

	public String getItemCate() {
		return itemCate;
	}

	public void setItemCate(String itemCate) {
		this.itemCate = itemCate;
	}

	public String getTemplateId() {
		return templateId;
	}

	public void setTemplateId(String templateId) {
		this.templateId = templateId;
	}

	public String getTemplateJson() {
		return templateJson;
	}

	public void setTemplateJson(String templateJson) {
		this.templateJson = templateJson;
	}

	public String getShareScope() {
		return shareScope;
	}

	public void setShareScope(String shareScope) {
		this.shareScope = shareScope;
	}

	public String getPackageId() {
		return packageId;
	}

	public void setPackageId(String packageId) {
		this.packageId = packageId;
	}

	public String getVesselId() {
		return vesselId;
	}

	public void setVesselId(String vesselId) {
		this.vesselId = vesselId;
	}

	public String getVesselFileId() {
		return vesselFileId;
	}

	public void setVesselFileId(String vesselFileId) {
		this.vesselFileId = vesselFileId;
	}

	public String getAscId() {
		return ascId;
	}

	public void setAscId(String ascId) {
		this.ascId = ascId;
	}

	public int getTag() {
		return tag;
	}

	public void setTag(int tag) {
		this.tag = tag;
	}

	public String getOrigin() {
		return origin;
	}

	public void setOrigin(String origin) {
		this.origin = origin;
	}

	public String getServiceLaneCode() {
		return serviceLaneCode;
	}

	public void setServiceLaneCode(String serviceLaneCode) {
		this.serviceLaneCode = serviceLaneCode;
	}

	public String getVoyageNo() {
		return voyageNo;
	}

	public void setVoyageNo(String voyageNo) {
		this.voyageNo = voyageNo;
	}

	public int getCallSeq() {
		return callSeq;
	}

	public void setCallSeq(int callSeq) {
		this.callSeq = callSeq;
	}

	public String getVesselScheduleId() {
		return vesselScheduleId;
	}

	public void setVesselScheduleId(String vesselScheduleId) {
		this.vesselScheduleId = vesselScheduleId;
	}

	public String getPortCode() {
		return portCode;
	}

	public void setPortCode(String portCode) {
		this.portCode = portCode;
	}

	public String getEdiCategory() {
		return ediCategory;
	}

	public void setEdiCategory(String ediCategory) {
		this.ediCategory = ediCategory;
	}

	public String getTerminalCode() {
		return terminalCode;
	}

	public void setTerminalCode(String terminalCode) {
		this.terminalCode = terminalCode;
	}

	public String getBerthCode() {
		return berthCode;
	}

	public void setBerthCode(String berthCode) {
		this.berthCode = berthCode;
	}

	public String getImoNo() {
		return imoNo;
	}

	public void setImoNo(String imoNo) {
		this.imoNo = imoNo;
	}

	public String getPrintType() {
		return printType;
	}

	public void setPrintType(String printType) {
		this.printType = printType;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getBaplieEdiVersion() {
		return baplieEdiVersion;
	}

	public void setBaplieEdiVersion(String baplieEdiVersion) {
		this.baplieEdiVersion = baplieEdiVersion;
	}

	public String getMovinsEdiVersion() {
		return movinsEdiVersion;
	}

	public void setMovinsEdiVersion(String movinsEdiVersion) {
		this.movinsEdiVersion = movinsEdiVersion;
	}

	public String getPrintPaperSize() {
		return printPaperSize;
	}

	public void setPrintPaperSize(String printPaperSize) {
		this.printPaperSize = printPaperSize;
	}

	public String getPrintSizeMark() {
		return printSizeMark;
	}

	public void setPrintSizeMark(String printSizeMark) {
		this.printSizeMark = printSizeMark;
	}

	public String getPrint40ftBayWith() {
		return print40ftBayWith;
	}

	public void setPrint40ftBayWith(String print40ftBayWith) {
		this.print40ftBayWith = print40ftBayWith;
	}

	public String getPrintContainerHeight() {
		return printContainerHeight;
	}

	public void setPrintContainerHeight(String printContainerHeight) {
		this.printContainerHeight = printContainerHeight;
	}

	public String getPrintTierNoDisplay() {
		return printTierNoDisplay;
	}

	public void setPrintTierNoDisplay(String printTierNoDisplay) {
		this.printTierNoDisplay = printTierNoDisplay;
	}

	public String getDataSource() {
		return dataSource;
	}

	public void setDataSource(String dataSource) {
		this.dataSource = dataSource;
	}

	public String getGeneralPlanType() {
		return generalPlanType;
	}

	public void setGeneralPlanType(String generalPlanType) {
		this.generalPlanType = generalPlanType;
	}

	public String getSummaryType() {
		return summaryType;
	}

	public void setSummaryType(String summaryType) {
		this.summaryType = summaryType;
	}

	public String getListType() {
		return listType;
	}

	public void setListType(String listType) {
		this.listType = listType;
	}

	public List<String> getDisplayInfo() {
		return displayInfo;
	}

	public void setDisplayInfo(List<String> displayInfo) {
		this.displayInfo = displayInfo;
	}

	public List<Object> getAggregate() {
		return aggregate;
	}

	public void setAggregate(List<Object> aggregate) {
		this.aggregate = aggregate;
	}

	public List<Object> getLeftAxis() {
		return leftAxis;
	}

	public void setLeftAxis(List<Object> leftAxis) {
		this.leftAxis = leftAxis;
	}

	public List<Object> getTopAxis() {
		return topAxis;
	}

	public void setTopAxis(List<Object> topAxis) {
		this.topAxis = topAxis;
	}

	public List<String> getEdiFilePath() {
		return ediFilePath;
	}

	public void setEdiFilePath(List<String> ediFilePath) {
		this.ediFilePath = ediFilePath;
	}

	public String getItemDesc() {
		return itemDesc;
	}

	public void setItemDesc(String itemDesc) {
		this.itemDesc = itemDesc;
	}

	public String getReportTitle() {
		return reportTitle;
	}

	public void setReportTitle(String reportTitle) {
		this.reportTitle = reportTitle;
	}

	public String getVesselName() {
		return vesselName;
	}

	public void setVesselName(String vesselName) {
		this.vesselName = vesselName;
	}

	public String getPackageFilePath() {
		return packageFilePath;
	}

	public void setPackageFilePath(String packageFilePath) {
		this.packageFilePath = packageFilePath;
	}

	public String getTemplateDesc() {
		return templateDesc;
	}

	public void setTemplateDesc(String templateDesc) {
		this.templateDesc = templateDesc;
	}

	public String getColorType() {
		return colorType;
	}

	public void setColorType(String colorType) {
		this.colorType = colorType;
	}
}