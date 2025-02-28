/**
*
* CONFIDENTIAL AND PROPRIETARY SOURCE CODE OF TOTAL SOFT BANK 
* LTD
*
* Copyright (C) 1988-2010 TOTAL SOFT BANK LTD. All Rights
* Reserved. Use of this source code is subject to the terms of 
* the applicable license agreement.
*
* The copyright notice(s) in this source code does not indicate 
* the actual or intended publication of this source code.
*
* Created on   : 2013. 4. 22.
* CVS revision : $Revision: 1.2 $ 
*
* ====================================
* CHANGE REVISION
* ====================================
* DATE           AUTHOR           REVISION
* 2014. 1. 20.   Anna 1.0    First release.
* ====================================
* CLASS DESCRIPTION
* Export Report  
* ====================================
*/

package com.tsb.most.biz.service.report;

import java.io.File;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import com.tsb.most.basebiz.dataitem.parameters.ParameterSettingItem;
import com.tsb.most.basebiz.parm.parameters.SearchCommonParameterSettingBizParm;
import com.tsb.most.biz.dao.billing.IInvoiceAdviceDao;
import com.tsb.most.biz.dao.billing.IInvoiceDao;
import com.tsb.most.biz.dao.billing.IProformaInvoiceDao;
import com.tsb.most.biz.dataitem.billing.InvoiceDataItem;
import com.tsb.most.biz.dataitem.billing.ProformaInvoiceItem;
import com.tsb.most.biz.dataitem.report.ReportItem;
import com.tsb.most.biz.parm.billing.SearchInvoiceAdviceParm;
import com.tsb.most.biz.parm.billing.SearchInvoiceParm;
import com.tsb.most.biz.parm.billing.SearchProformaInvoiceParm;
import com.tsb.most.biz.parm.report.SearchReportParm;
import com.tsb.most.biz.service.billing.IInvoiceAdvice;
import com.tsb.most.common.util.BranchCodeSetting;
import com.tsb.most.common.util.ReportUtil;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.serviceprovider.pojo.ServiceProviderPojo;

import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperReport;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.text.DecimalFormat;

public class BillingReport extends MOSTBaseService implements IBillingReport {

	private IInvoiceDao invoiceDao;
	private IProformaInvoiceDao proformaInvoiceDao;
	private IInvoiceAdviceDao invoiceAdviceDao;

	public void setProformaInvoiceDao(IProformaInvoiceDao proformaInvoiceDao) {
		this.proformaInvoiceDao = proformaInvoiceDao;
	}

	public void setInvoiceDao(IInvoiceDao invoiceDao) {
		this.invoiceDao = invoiceDao;
	}

	public void setInvoiceAdviceDao(IInvoiceAdviceDao invoiceAdviceDao) {
		this.invoiceAdviceDao = invoiceAdviceDao;
	}

	private static final String[] numbers = { "", " ONE", " TWO", " THREE", " FOUR", " FIVE", " SIX", " SEVEN",
			" EIGHT", " NINE", " TEN", " ELEVEN", " TWELVE", " THIRTEEN", " FOURTEEN", " FIFTEEN", " SIXTEEN",
			" SEVENTEEN", " EIGHTEEN", " NINETEEN" };
	private static final String[] tens = { "", " TEN", " TWENTY", " THIRTY", " FORTY", " FIFTY", " SIXTY", " SEVENTY",
			" EIGHTY", " NINETY" };

	// Invoice Detail Report
	@Override
	public ReportItem getInvoiceDetailReportItems(SearchReportParm parm) throws BizException {
		ReportItem reportResultItem = new ReportItem();
		SearchInvoiceParm searchParm = new SearchInvoiceParm();
		DataItemList itemList = new DataItemList();

		HashMap parmMap = new HashMap();

		searchParm.setVslCallId(parm.getParam1());
		searchParm.setInvoiceNo(parm.getParam2());
		searchParm.setRateForeign(parm.getParam3());
		searchParm.setCurr(parm.getParam4());
		searchParm.setUserId(parm.getParam5());

		// itemList = invoiceDao.selectInvoiceDetailItem(searchParm);
		itemList = invoiceDao.searchInvoiceDataItemsForExternal(searchParm);

		parmMap.put("CURR", searchParm.getCurr());
		parmMap.put("RATE", searchParm.getRateForeign());
		parmMap.put("PRINTER", searchParm.getUserId());
		String imagePath = ReportUtil.getReportPath() + File.separator + "LOGO_NEW_LAIP.png";
		parmMap.put("IMAGE_PATH", imagePath);

		try {
			String reportSource = ReportUtil.getReportPath() + File.separator + "billing" + File.separator
					+ parm.getFile(); // report folder is
			JasperReport mainReport = JasperCompileManager.compileReport(reportSource);

			reportResultItem.setDataItemList(itemList);
			reportResultItem.setParameterMap(parmMap);
			reportResultItem.setMainReport(mainReport);
		} catch (Exception e) {
			throw new BizException(e);
		}

		return reportResultItem;
	}

	// Cash Receipt report
	@Override
	public ReportItem getCashReceiptReportItems(SearchReportParm parm) throws BizException {
		ReportItem reportResultItem = new ReportItem();
		SearchProformaInvoiceParm searchParm = new SearchProformaInvoiceParm();
		DataItemList itemList = new DataItemList();

		HashMap parmMap = new HashMap();

		searchParm.setVslCallId(parm.getParam1());
		searchParm.setIvNo(parm.getParam2());
		searchParm.setCurr(parm.getParam4());
		searchParm.setUserId(parm.getParam5());

		// MMC- Settlement - Start
		// 0134458-Get Free Day configuration (From Parametter Settings)
		// BILLING_OS_FREE_DAY
		// ADPFZ: 3 days, ADPMZ: 4
		ServiceProviderPojo serviceProviderPojo = new ServiceProviderPojo();
		SearchCommonParameterSettingBizParm settingParm = new SearchCommonParameterSettingBizParm();
		settingParm.setBranchCode(BranchCodeSetting.getInstance().getBranchCode());
		DataItemList parameterList = (DataItemList) serviceProviderPojo.execute("MOST.parametersetting.searchItems",
				settingParm);
		List<ParameterSettingItem> list = parameterList.getCollection();
		ParameterSettingItem settingItem = (ParameterSettingItem) list.stream()
				.filter(x -> "BILLING_OS_FREE_DAY".equals(x.getCode())).findAny().orElse(null);
		if (settingItem != null && settingItem.getValue() != null && !"".equals(settingItem.getValue())) {
			searchParm.setOsFreeDays(Integer.parseInt(settingItem.getValue()));
		}
		// MMC- Settlement - End
		itemList = proformaInvoiceDao.selectReceiptReport(searchParm);

		double total = 0;
		String totalAmtString = "";

		for (int i = 0; i < itemList.size(); i++) {
			ProformaInvoiceItem item = (ProformaInvoiceItem) itemList.getCollection().get(i);
			total = total + Double.parseDouble(item.getTotalAmt());
		}

		if (total == Math.floor(total)) {
			totalAmtString = convertNumber((long) total);
		} else {
			totalAmtString = convertNumberWithDecimals(total);
		}

		for (int i = 0; i < itemList.size(); i++) {
			ProformaInvoiceItem item = (ProformaInvoiceItem) itemList.getCollection().get(i);
			item.setTotalAmtString(totalAmtString);
		}

		String imagePath = ReportUtil.getReportPath() + File.separator + "LOGO_NEW_LAIP.png";
		parmMap.put("PRF_RATIO", parm.getParam3().equals("") ? "100" : parm.getParam3());
		parmMap.put("IMAGE_PATH", imagePath);

		try {
			String reportSource = ReportUtil.getReportPath() + File.separator + "billing" + File.separator
					+ parm.getFile(); // report folder is
			JasperReport mainReport = JasperCompileManager.compileReport(reportSource);

			reportResultItem.setDataItemList(itemList);
			reportResultItem.setParameterMap(parmMap);
			reportResultItem.setMainReport(mainReport);
		} catch (Exception e) {
			throw new BizException(e);
		}

		return reportResultItem;
	}

	// Invoice Advice Detail Report
	@Override
	public ReportItem getInvoiceAdviceDetailReportItems(SearchReportParm parm) throws BizException {
		ReportItem reportResultItem = new ReportItem();
		DataItemList itemList = new DataItemList();
		HashMap<String, Object> parmMap = new HashMap<String, Object>();

		SearchInvoiceAdviceParm searchParm = new SearchInvoiceAdviceParm();
		searchParm.setVesselCallingID(parm.getParam1());
		searchParm.setAdviceNo(parm.getParam2());
		searchParm.setUserId(parm.getParam5());
		searchParm.setAuthCd(parm.getParam7());
		searchParm.setPtnrCd(parm.getParam4());

		itemList = invoiceAdviceDao.searchInvoiceAdviceDataItemsForReport(searchParm);

		String imagePath = ReportUtil.getReportPath() + File.separator + "LOGO_NEW_MMC.png";
		String DATE_FORMAT_STD = "dd/MM/yyyy HH:mm";
		SimpleDateFormat sdfStd = new SimpleDateFormat(DATE_FORMAT_STD);
		String strDate = sdfStd.format(new Date());

		parmMap.put("PRINTER", searchParm.getUserId());
		parmMap.put("IMAGE_PATH", imagePath);
		parmMap.put("ADV_NO", parm.getParam2());
		parmMap.put("AGN_NM", parm.getParam4());
		parmMap.put("VSL_CALL_ID", parm.getParam1());
		parmMap.put("VSL_NM", parm.getParam8());
		parmMap.put("PRINT_DATE", strDate);

		try {
			String reportSource = ReportUtil.getReportPath() + File.separator + "billing" + File.separator
					+ parm.getFile();
			JasperReport mainReport = JasperCompileManager.compileReport(reportSource);

			reportResultItem.setDataItemList(itemList);
			reportResultItem.setParameterMap(parmMap);
			reportResultItem.setMainReport(mainReport);
		} catch (Exception e) {
			throw new BizException(e);
		}

		return reportResultItem;
	}

	@Override
	public ReportItem getInvoiceAdviceListReportItems(SearchReportParm parm) throws BizException {
		ReportItem reportResultItem = new ReportItem();
		DataItemList itemList = new DataItemList();
		HashMap<String, Object> parmMap = new HashMap<String, Object>();
		SearchInvoiceAdviceParm searchParm = new SearchInvoiceAdviceParm();
		
		searchParm.setVesselCallingID(parm.getParam1());
		searchParm.setAdviceNo(parm.getParam2());
		searchParm.setUserId(parm.getParam5());
		searchParm.setPtnrCd(parm.getParam4());
		searchParm.setAuthority(parm.getParam6());
		searchParm.setEta(parm.getParam7());
		searchParm.setFromDt(parm.getParam7());
		searchParm.setToDt(parm.getParam8());

		itemList = invoiceAdviceDao.searchInvoiceAdviceItemsForReport(searchParm);

		String imagePath = ReportUtil.getReportPath() + File.separator + "LOGO_NEW_MMC.png";
		String DATE_FORMAT_STD = "dd/MM/yyyy HH:mm";
		SimpleDateFormat sdfStd = new SimpleDateFormat(DATE_FORMAT_STD);
		String strDate = sdfStd.format(new Date());

		parmMap.put("PRINTER", searchParm.getUserId());
		parmMap.put("IMAGE_PATH", imagePath);
		parmMap.put("ADV_NO", parm.getParam2());
		parmMap.put("AGN_NM", parm.getParam4());
		parmMap.put("VSL_CALL_ID", parm.getParam1());
		parmMap.put("VSL_NM", parm.getParam8());
		parmMap.put("PRINT_DATE", strDate);

		try {
			String reportSource = ReportUtil.getReportPath() + File.separator + "billing" + File.separator
					+ parm.getFile();
			JasperReport mainReport = JasperCompileManager.compileReport(reportSource);

			reportResultItem.setDataItemList(itemList);
			reportResultItem.setParameterMap(parmMap);
			reportResultItem.setMainReport(mainReport);
		} catch (Exception e) {
			throw new BizException(e);
		}

		return reportResultItem;
	}

	public static String convertNumber(long pnumber) {
		if (pnumber == 0) {
			return "ZERO";
		}

		String result = "";
		if (pnumber < 0) {
			result = result + "MINUS";
		}

		long number = Math.abs(pnumber);
		String snumber = Long.toString(number);

		String zeroMask = "000000000000";
		DecimalFormat df = new DecimalFormat(zeroMask);
		snumber = df.format(number);

		int billions = Integer.parseInt(snumber.substring(0, 3));
		int millions = Integer.parseInt(snumber.substring(3, 6));
		int hundredThousands = Integer.parseInt(snumber.substring(6, 9));
		int thousands = Integer.parseInt(snumber.substring(9, 12));

		String billionsString;
		switch (billions) {
		case 0:
			billionsString = "";
			break;
		case 1:
			billionsString = convertNumberLessThanOneThousand(billions) + " BILLION ";
			break;
		default:
			billionsString = convertNumberLessThanOneThousand(billions) + " BILLION ";
		}
		result = result + billionsString;

		String millionsString;
		switch (millions) {
		case 0:
			millionsString = "";
			break;
		case 1:
			millionsString = convertNumberLessThanOneThousand(millions) + " MILLION ";
			break;
		default:
			millionsString = convertNumberLessThanOneThousand(millions) + " MILLION ";
		}
		result = result + millionsString;

		String hundredThousandsString;
		switch (hundredThousands) {
		case 0:
			hundredThousandsString = "";
			break;
		case 1:
			hundredThousandsString = "ONE THOUSAND ";
			break;
		default:
			hundredThousandsString = convertNumberLessThanOneThousand(hundredThousands) + " THOUSAND ";
		}
		result = result + hundredThousandsString;

		String thousandString;
		thousandString = convertNumberLessThanOneThousand(thousands);
		result = result + thousandString;

		return result.replaceAll("^\\s+", "").replaceAll("\\b\\s{2,}\\b", " ");
	}

	private static String convertNumberLessThanOneThousand(int number) {
		String rest;

		if (number % 100 < 20) {
			rest = numbers[number % 100];
			number /= 100;
		} else {
			rest = numbers[number % 10];
			number /= 10;

			rest = tens[number % 10] + rest;
			number /= 10;
		}
		if (number == 0)
			return rest;
		return numbers[number] + " HUNDRED" + rest;
	}

	public static String convertNumberWithDecimals(double number) {
		long wholePart = (long) number;
		// int decimalPart = (int) (Math.round(new Double(number - wholePart)) * 1000);

		NumberFormat formatter = new DecimalFormat("#0.00");
		String doubleAsString = String.valueOf(formatter.format(number));
		int indexOfDecimal = doubleAsString.indexOf(".");
		long decimalPart = Long.valueOf(doubleAsString.substring(indexOfDecimal + 1));

		String wholePartWords = convertNumber(wholePart);
		String decimalPartWords = convertNumber(decimalPart);

		String result = wholePartWords;
		if (decimalPart > 0) {
			result += " AND " + decimalPartWords + " FILS";
		}

		return result;
	}

}