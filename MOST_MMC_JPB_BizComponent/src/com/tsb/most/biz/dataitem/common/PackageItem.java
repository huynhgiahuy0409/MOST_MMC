package com.tsb.most.biz.dataitem.common;

import com.tsb.most.framework.dataitem.DataItem;

public class PackageItem extends DataItem{

	private static final long serialVersionUID = -4711766207668131877L;
	
	private String sIncludedPackages;
	private boolean bIncludedPackages;
	private String itemId;
	private String itemType;
	private String itemDesc;
	private String itemCate;
	private String templateId;
	private String templateDesc;
	private String templateJson;
	private String shareScope;
	private String packageId;
	private String packageDesc;

	private String fileName;
	private String content;
	private String reportFilePath;
	
	private String reportTitle;
	
	private String listType;
	private String summaryType;
	private String printPaperSize;
	
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
	public String getItemDesc() {
		return itemDesc;
	}
	public void setItemDesc(String itemDesc) {
		this.itemDesc = itemDesc;
	}
	public String getTemplateId() {
		return templateId;
	}
	public void setTemplateId(String templateId) {
		this.templateId = templateId;
	}
	public String getTemplateDesc() {
		return templateDesc;
	}
	public void setTemplateDesc(String templateDesc) {
		this.templateDesc = templateDesc;
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
	public String getPackageDesc() {
		return packageDesc;
	}
	public void setPackageDesc(String packageDesc) {
		this.packageDesc = packageDesc;
	}
	public String getsIncludedPackages() {
		return sIncludedPackages;
	}
	public void setsIncludedPackages(String sIncludedPackages) {
		if (sIncludedPackages.equalsIgnoreCase("true")) {
			this.bIncludedPackages = true;
		} else {
			this.bIncludedPackages = false;
		}
		this.sIncludedPackages = sIncludedPackages;
	}
	public boolean isbIncludedPackages() {
		return bIncludedPackages;
	}
	public void setbIncludedPackages(boolean bIncludedPackages) {
		if (bIncludedPackages) {
			this.sIncludedPackages = "true";
		} else {
			this.sIncludedPackages = "false";
		}
		
		this.bIncludedPackages = bIncludedPackages;
	}
	public String getItemCate() {
		return itemCate;
	}
	public void setItemCate(String itemCate) {
		this.itemCate = itemCate;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getReportTitle() {
		return reportTitle;
	}
	public void setReportTitle(String reportTitle) {
		this.reportTitle = reportTitle;
	}
	public String getReportFilePath() {
		return reportFilePath;
	}
	public void setReportFilePath(String reportFilePath) {
		this.reportFilePath = reportFilePath;
	}
	public String getListType() {
		return listType;
	}
	public void setListType(String listType) {
		this.listType = listType;
	}
	public String getSummaryType() {
		return summaryType;
	}
	public void setSummaryType(String summaryType) {
		this.summaryType = summaryType;
	}
	public String getPrintPaperSize() {
		return printPaperSize;
	}
	public void setPrintPaperSize(String printPaperSize) {
		this.printPaperSize = printPaperSize;
	}
}