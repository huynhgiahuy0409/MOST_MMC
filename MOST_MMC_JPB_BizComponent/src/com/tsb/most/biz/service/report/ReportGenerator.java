package com.tsb.most.biz.service.report;

import java.awt.Color;
import java.io.File;
import java.io.IOException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.PDPageContentStream.AppendMode;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.util.Matrix;

import com.tsb.most.biz.dataitem.common.PackageItem;
import com.tsb.most.biz.dataitem.planning.BerthInfoItem;
import com.tsb.most.biz.dataitem.planning.BerthMaintenanceItem;
import com.tsb.most.biz.dataitem.planning.BerthPlanItem;
import com.tsb.most.biz.dataitem.planning.ShipInPortItem;
import com.tsb.most.biz.dataitem.planning.VesselScheduleItem;
import com.tsb.most.biz.parm.common.PackageParm;
import com.tsb.most.common.util.report.PDFBuilder;
import com.tsb.most.framework.config.AppContextPropertyLoader;
import com.tsb.most.framework.exception.BizException;


public class ReportGenerator {

	private List<BerthInfoItem> totalBerthListStore;
	private List<BerthPlanItem> berthPlanListStore;
	private List<BerthPlanItem> vesselScheduleDataListStore;
	private List<VesselScheduleItem> vesselScheduleListStore;
	private List<ShipInPortItem> tideInformationListStore;
	private List<BerthMaintenanceItem> bittListStore;

	public ReportGenerator() {

	}

	public Date getBerthPlanTimeRule(BerthPlanItem rec, String viewMode,String type) {
		if (type.equals("arrival")) {
				return rec.getAtb() != null ? rec.getAtb() : rec.getEtb() != null ? rec.getEtb() : rec.getEta();
		} else {
			if(viewMode.equals("auto")) {
				Date currentTime = new Date();
				Date calcTime = rec.getEtd();
				int dataResult = calcTime.compareTo(currentTime);
				return rec.getAtu() != null ? rec.getAtu() : (dataResult==1 ? calcTime : currentTime); 
			}else {
				return rec.getAtu() != null ? rec.getAtu() : rec.getEtu() != null ? rec.getEtu() : rec.getEtd();
			}
		}
	}

	public PackageItem onPrintBayPlan(
										PackageParm parm,
										List<BerthInfoItem> totalBerthList,
										List<BerthPlanItem> berthPlanList,
										List<BerthPlanItem> nextBerthPlanList,
										List<BerthPlanItem> vesselScheduleDataList,
										List<VesselScheduleItem> vesselScheduleList,
										List<ShipInPortItem> tideInformationList,
										List<BerthMaintenanceItem> berthBittList
	) throws BizException {
		
		// the document
		PDDocument doc = null;
		String reportFileName = "";
		PackageItem returnItem = new PackageItem();
		final float defaultVesselWidth = 30f;
		final float baseBerthUnit = 1f;
		final float baseWidth = 1.5f;

		try {
			// initialize items
			totalBerthListStore = totalBerthList;
			berthPlanListStore = berthPlanList;
			vesselScheduleDataListStore = vesselScheduleDataList;
			vesselScheduleListStore = vesselScheduleList;
			tideInformationListStore = tideInformationList;
			bittListStore = berthBittList;

			DecimalFormat df = new DecimalFormat("00");

			doc = new PDDocument();
			doc.setAllSecurityToBeRemoved(true);
			
			long calDays = parm.getEtaFrom().getTime() - parm.getEtaTo().getTime();
			long cntDays = calDays / (24 * 60 * 60 * 1000);
			cntDays = (Math.abs(cntDays)) + 1;
			double  cntPages =  Double.parseDouble(String.valueOf(cntDays)) / 5;
			
			Date etaFrom =  parm.getEtaFrom();
			Date etaTo = new Date();
			
			for (int cnt = 0;  cnt < cntPages; cnt++) {
				PDPage page;

				page = new PDPage(PDRectangle.A4);
				page.setRotation(90);

				doc.addPage(page);
				
				PDRectangle pageSize = page.getMediaBox();
				int pageWidth = (int) (pageSize.getWidth());
				
				List<BerthInfoItem> berthLiquidList = new ArrayList<BerthInfoItem>();
				List<BerthInfoItem> berthLiquidListSorting = new ArrayList<BerthInfoItem>();
				List<BerthInfoItem> berthBreakBerkList = new ArrayList<BerthInfoItem>();

				PDPageContentStream contentStream = null;
				contentStream = new PDPageContentStream(doc, page, AppendMode.OVERWRITE, true, true);
				contentStream.transform(new Matrix(0, 1, -1, 0, pageWidth, 0));
				PDFont font = PDType1Font.HELVETICA_BOLD;
				contentStream.setNonStrokingColor(0, 0, 0);

				contentStream.setFont(font, 13);

				float a4Width = 302 * 2.65f;
				float a4Height = 220 * 2.5f;

				float startX = 20, startY = 20;

				float liquidColumnWidth = 0;
				float dayColunmHeight = 0;
				float prevBerthColunmWidth = 0;
				float etaataColumnHeight = 40;
				float legendColumnHeight = 60;
				float noteColumnHeight = 0;
				float mainHeight = 0, mainWeidth = 0;
				float[] dimen = null;

				if (parm.getSearchType().equals("L")) {
					legendColumnHeight = 50;
				}

				String monthEng[] = { "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC" };
				
				long days = 0;
				if((cntDays - cnt * 5) >= 5) {
					days = 5;
				}else {
					days = cntDays - cnt * 5;
				}
				
				int increase = 0;
				if(cnt != 0) {
					increase = 5;
				}
				Calendar c = Calendar.getInstance(); 
				c.setTime(etaFrom); 
				c.add(Calendar.DATE, increase);
				etaFrom = c.getTime();
				
				c.setTime(etaFrom); 
				c.add(Calendar.DATE, 4);
				etaTo = c.getTime();
				
				if(etaTo.compareTo(parm.getEtaTo()) == 1) {
					etaTo =  parm.getEtaTo();
				}
				
				int fromYear = Integer.parseInt(new SimpleDateFormat("yyyy").format(etaFrom));
				int fromMonth = Integer.parseInt(new SimpleDateFormat("MM").format(etaFrom));
				int fromDate = Integer.parseInt(new SimpleDateFormat("dd").format(etaFrom));

				int toYear = Integer.parseInt(new SimpleDateFormat("yyyy").format(etaTo));
				int toMonth = Integer.parseInt(new SimpleDateFormat("MM").format(etaTo));
				int toDate = Integer.parseInt(new SimpleDateFormat("dd").format(etaTo));
				int totalDate = 0;

				int toDateArray[] = new int[(int) days];
				int toMonthArray[] = new int[(int) days];
				// Title
				String title = "";
				if (parm.getSearchType().equals("B")) {
					title = "SHIPS IN PORT - " + parm.getTmnlName();
				} else {
					title = "SHIPS IN PORT";
				}

				contentStream.setFont(font, 10);
				dimen = PDFBuilder.dim(font, 10, title);
				PDFBuilder.text(
						contentStream,
						startX + (a4Width / 2) - dimen[0] / 2,
						50 + a4Height - startY - dimen[1] / 2,
						title
				);
				
				
				if(parm.getViewMode().equals("auto")) {
					Date currentTime = new Date();
					String currentTimeStr = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss").format(currentTime);	
					
					contentStream.setFont(font, 5);
					dimen = PDFBuilder.dim(font, 5, currentTimeStr);
					PDFBuilder.text(
						contentStream,
						a4Width - dimen[0] / 2,
						noteColumnHeight + a4Height - startY - dimen[1] / 2,
						currentTimeStr
					);
				}
				
				mainHeight = a4Height - etaataColumnHeight - legendColumnHeight - noteColumnHeight;

				// ETA/ATA Rect
				PDFBuilder.drawRect(contentStream, startX, startY + noteColumnHeight, a4Width, etaataColumnHeight, "");

				// Main Rect
				PDFBuilder.drawRect(contentStream, startX, startY + etaataColumnHeight + noteColumnHeight, a4Width, mainHeight, "");
				

				// Legend Rect
				PDFBuilder.setBackColor(contentStream, getHexToDec("FFE5AA"));
				PDFBuilder.drawRect(
						contentStream,
						startX,
						startY + etaataColumnHeight + mainHeight + noteColumnHeight,
						a4Width,
						legendColumnHeight,
						"fill"
				);

				PDFBuilder.setBackColor(contentStream, Color.BLACK);
				PDFBuilder.setLineColor(contentStream, Color.lightGray);

				for (int i = 0; i < totalBerthListStore.size(); i++) {
					//if (totalBerthListStore.get(i).getBerthTp().equals("WRF")) {
						berthBreakBerkList.add(totalBerthListStore.get(i));
					/*} else if (totalBerthListStore.get(i).getBerthTp().equals("WR2")) {
						berthLiquidList.add(totalBerthListStore.get(i));
					}*/
				}
				String standJettyList[] = { "B05", "B06", "B07", "B08", "B09"};
//				berthLiquidListSorting
				for(int i=0;i<standJettyList.length;i++) {
					for(int j=0; j<berthLiquidList.size();j++){
						if(standJettyList[i].equals(berthLiquidList.get(j).getBerthCd())){
							berthLiquidListSorting.add(berthLiquidList.get(j));		
						}
						
					}
				}
				
				float oneDayColumnHeight = mainHeight / days;
				float oneHourColumnHeight = oneDayColumnHeight / 12;
				float oneBerthColumnWidth = 80f;//a4Width / (berthBreakBerkList.size());

				contentStream.setFont(font, 7);
				dimen = PDFBuilder.dim(font, 7, "ATA/ETA");
				PDFBuilder.text(
						contentStream,
						startX + (oneBerthColumnWidth / 2) - dimen[0] / 2,
						startY + (etaataColumnHeight / 2) + noteColumnHeight,
						"ATA/ETA"
				);
				
				if (parm.getSearchType().equals("B")) {
					// WRF LEGEND
					// Legend horizontal long line
					PDFBuilder.setLineColor(contentStream, Color.BLACK);
					PDFBuilder.drawLine(
							contentStream,
							startX,
							startY + etaataColumnHeight + noteColumnHeight + mainHeight + ((legendColumnHeight) * (1.0f / 4.0f)),
							startX + a4Width,
							startY + etaataColumnHeight + noteColumnHeight + mainHeight + ((legendColumnHeight) * (1.0f / 4.0f))
					);
					font = PDType1Font.HELVETICA;
					contentStream.setFont(font, 6);
					
					dimen = PDFBuilder.dim(font, 6, "WHARVES");
					PDFBuilder.text(
							contentStream,
							startX + oneBerthColumnWidth / 2 - dimen[0] / 2,
							startY - 2 + etaataColumnHeight + legendColumnHeight - (legendColumnHeight / 4)
									+ noteColumnHeight + mainHeight + dimen[1] / 2,
							"WHARVES"
					);
					
					dimen = PDFBuilder.dim(font, 6, "DISPLACEMENT");
					PDFBuilder.text(
							contentStream,
							startX + oneBerthColumnWidth / 2 - dimen[0] / 2,
							startY - 2 + etaataColumnHeight + legendColumnHeight - (legendColumnHeight / 4.5f) * 2
									+ noteColumnHeight + mainHeight + dimen[1] / 2,
							"DISPLACEMENT"
					);
					
					dimen = PDFBuilder.dim(font, 6, "BERTH DEPTH");
					PDFBuilder.text(
							contentStream,
							startX + oneBerthColumnWidth / 2 - dimen[0] / 2,
							startY - 2 + etaataColumnHeight + legendColumnHeight - (legendColumnHeight / 4.5f) * 3
									+ noteColumnHeight + mainHeight + dimen[1] / 2,
							"BERTH DEPTH"
					);
						
					dimen = PDFBuilder.dim(font, 6, "DATE/SHFT");
					PDFBuilder.text(
							contentStream,
							startX + oneBerthColumnWidth * (1.0f / 3.0f) - dimen[0] / 2.0f,
							startY - 2 + etaataColumnHeight + legendColumnHeight - (legendColumnHeight / 4.2f) * 4
									+ noteColumnHeight + mainHeight + dimen[1] / 2,
							"DATE/SHFT"
					);
					
					dimen = PDFBuilder.dim(font, 6, "HRS");
					PDFBuilder.text(
							contentStream,
							startX + oneBerthColumnWidth * (2.0f / 3.0f) + dimen[0] / 2.0f,
							startY - 2 + etaataColumnHeight + legendColumnHeight - (legendColumnHeight / 4.2f) * 4
									+ noteColumnHeight + mainHeight + dimen[1] / 2
							,
							"HRS"
					);
					
				} else if (parm.getSearchType().equals("L")) {
					PDFBuilder.setLineColor(contentStream, Color.BLACK);
					// Legend horizontal long line
					PDFBuilder.drawLine(contentStream, startX,
							startY + etaataColumnHeight + noteColumnHeight + mainHeight
									+ ((legendColumnHeight) * (2.0f / 5.0f)),
							startX + (oneBerthColumnWidth * (berthLiquidListSorting.size() + 1)), startY + etaataColumnHeight
									+ noteColumnHeight + mainHeight + ((legendColumnHeight) * (2.0f / 5.0f)));
					// Legend horizontal short line
					PDFBuilder.drawLine(contentStream, startX,
							startY + etaataColumnHeight + noteColumnHeight + mainHeight
									+ ((legendColumnHeight) * (1.0f / 5.0f)),
							startX + oneBerthColumnWidth, startY + etaataColumnHeight + noteColumnHeight + mainHeight
									+ ((legendColumnHeight) * (1.0f / 5.0f)));
					contentStream.setFont(font, 8);
					PDFBuilder.text(contentStream, startX + 2,
							startY + etaataColumnHeight + noteColumnHeight + mainHeight + ((legendColumnHeight)) - 8,
							"Length");
					PDFBuilder.text(contentStream, startX + 1, startY + etaataColumnHeight + noteColumnHeight + mainHeight
							+ ((legendColumnHeight) * (4.0f / 5.0f)) - 8, "Displacement");
					PDFBuilder.text(contentStream, startX + 2, startY + etaataColumnHeight + noteColumnHeight + mainHeight
							+ ((legendColumnHeight) * (3.0f / 5.0f)) - 8, "Max Draft");

					contentStream.setFont(font, 6);

					dimen = PDFBuilder.dim(font, 4, "JETTIES");
					PDFBuilder.text(contentStream, startX + dimen[0] * 1.5f, startY + etaataColumnHeight + noteColumnHeight
							+ mainHeight + ((legendColumnHeight) * (2.0f / 5.0f)) - dimen[1] * 1.5f, "JETTIES");

					dimen = PDFBuilder.dim(font, 4, "DATE/SHIFT");
					PDFBuilder.text(contentStream, startX + oneBerthColumnWidth * (1.0f / 3.0f) - dimen[0] / 2.0f,
							startY + etaataColumnHeight + noteColumnHeight + mainHeight
									+ ((legendColumnHeight) * (1.0f / 5.0f)) - dimen[1] * 1.5f,
							"DATE/SHFT");

					dimen = PDFBuilder.dim(font, 4, "HRS");
					PDFBuilder.text(contentStream, startX + oneBerthColumnWidth * (2.0f / 3.0f) + dimen[0] / 2.0f,
							startY + etaataColumnHeight + noteColumnHeight + mainHeight
									+ ((legendColumnHeight) * (1.0f / 5.0f)) - dimen[1] * 1.5f,
							"HRS");
				}

				// Time Line
				font = PDType1Font.HELVETICA;
				for (int i = 0; i < days; i++) {
					contentStream.setLineWidth(0.1f);
					contentStream.setFont(font, 6);
					// Day Line
					PDFBuilder.setLineColor(contentStream, Color.BLACK);
					PDFBuilder.drawLine(contentStream, startX,
							startY + dayColunmHeight + etaataColumnHeight + noteColumnHeight, a4Width + startX,
							startY + dayColunmHeight + etaataColumnHeight + noteColumnHeight);
					if (monthEng[toMonth - 1] == "JAN" || monthEng[toMonth - 1] == "MAR" || monthEng[toMonth - 1] == "MAY"
							|| monthEng[toMonth - 1] == "JUL" || monthEng[toMonth - 1] == "AUG"
							|| monthEng[toMonth - 1] == "OCT" || monthEng[toMonth - 1] == "DEC") {
						totalDate = 31;
					} else if (monthEng[toMonth - 1] == "APR" || monthEng[toMonth - 1] == "JUN"
							|| monthEng[toMonth - 1] == "SEP" || monthEng[toMonth - 1] == "NOV") {
						totalDate = 30;
					} else if (monthEng[toMonth - 1] == "FEB") {
//						if(year == (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0))
//							total = 29;
						totalDate = 28;
					}
					if (toDate > totalDate) {
						toDate = 1;
						if (toMonth == 11) {
							toMonth = 1;
						}
						toMonth++;
					} else if (toDate == 0) {
						if (toMonth == 1) {
							toMonth = 12;
						} else {
							toMonth = toMonth - 1;
						}

						if (monthEng[toMonth - 1] == "JAN" || monthEng[toMonth - 1] == "MAR"
								|| monthEng[toMonth - 1] == "MAY" || monthEng[toMonth - 1] == "JUL"
								|| monthEng[toMonth - 1] == "AUG" || monthEng[toMonth - 1] == "OCT"
								|| monthEng[toMonth - 1] == "DEC") {
							toDate = 31;
						} else if (monthEng[toMonth - 1] == "APR" || monthEng[toMonth - 1] == "JUN"
								|| monthEng[toMonth - 1] == "SEP" || monthEng[toMonth - 1] == "NOV") {
							toDate = 30;
						} else if (monthEng[toMonth - 1] == "FEB") {
							toDate = 28;
						}
					}

					toDateArray[i] = toDate;
					toMonthArray[i] = toMonth;
					String txt = toDate-- + "-" + monthEng[toMonth - 1];
					dimen = PDFBuilder.dim(font, 6, txt);
					PDFBuilder.text(contentStream, startX + oneBerthColumnWidth * (2.0f / 3.0f) / 2 - dimen[0] / 2,
							startY + dayColunmHeight + ((oneDayColumnHeight)) + etaataColumnHeight + noteColumnHeight
									- dimen[1] * 1.5f,
							txt);

					dimen = PDFBuilder.dim(font, 6, "1st");
					PDFBuilder.text(contentStream, startX + oneBerthColumnWidth * (2.0f / 3.0f) / 2 - dimen[0] / 2,
							startY + dayColunmHeight + ((oneDayColumnHeight) * (3.0f / 4.0f)) + etaataColumnHeight
									+ noteColumnHeight - dimen[1] * 1.5f,
							"1st");

					dimen = PDFBuilder.dim(font, 6, "2nd");
					PDFBuilder.text(contentStream, startX + oneBerthColumnWidth * (2.0f / 3.0f) / 2 - dimen[0] / 2,
							startY + dayColunmHeight + ((oneDayColumnHeight) * (2.0f / 4.0f)) + etaataColumnHeight
									+ noteColumnHeight - dimen[1] * 1.5f,
							"2nd");

					dimen = PDFBuilder.dim(font, 6, "3rd");
					PDFBuilder.text(contentStream, startX + oneBerthColumnWidth * (2.0f / 3.0f) / 2 - dimen[0] / 2,
							startY + dayColunmHeight + ((oneDayColumnHeight) * (1.0f / 4.0f)) + etaataColumnHeight
									+ noteColumnHeight - dimen[1] * 1.5f,
							"3rd");
					for (int j = 0; j < 12; j++) {
						int text = 22 - (j * 2);
						contentStream.setFont(font, 6);
						contentStream.setLineWidth(0.1f);
						if (j > 0 && j <= 11) {
							PDFBuilder.setLineColor(contentStream, Color.LIGHT_GRAY);
							contentStream.setLineWidth(0.05f);
						}

						String timeText = df.format(text);
						dimen = PDFBuilder.dim(font, 6, timeText);
						PDFBuilder.text(contentStream, startX + oneBerthColumnWidth * (2.0f / 3.0f) + dimen[0] + 2,
								startY + 1 + etaataColumnHeight + noteColumnHeight + (oneHourColumnHeight * j)
										+ dayColunmHeight + (oneHourColumnHeight / 2f) - dimen[1] / 2,
								timeText);

						PDFBuilder.drawLine(contentStream, startX + oneBerthColumnWidth * (2.0f / 3.0f),
								startY + etaataColumnHeight + noteColumnHeight + (oneHourColumnHeight * j)
										+ dayColunmHeight,
								startX + oneBerthColumnWidth, startY + etaataColumnHeight + noteColumnHeight
										+ (oneHourColumnHeight * j) + dayColunmHeight);

						if (parm.getSearchType().equals("L")) {
							PDFBuilder.drawLine(contentStream, startX + oneBerthColumnWidth,
									startY + etaataColumnHeight + noteColumnHeight + (oneHourColumnHeight * j)
											+ dayColunmHeight,
									startX + (oneBerthColumnWidth * (berthLiquidListSorting.size() + 1)),
									startY + etaataColumnHeight + noteColumnHeight + (oneHourColumnHeight * j)
											+ dayColunmHeight);
						} else if (parm.getSearchType().equals("B")) {
							PDFBuilder.drawLine(contentStream, startX + oneBerthColumnWidth,
									startY + etaataColumnHeight + noteColumnHeight + (oneHourColumnHeight * j)
											+ dayColunmHeight,
									startX + a4Width, startY + etaataColumnHeight + noteColumnHeight
											+ (oneHourColumnHeight * j) + dayColunmHeight);
						}

					}
					dayColunmHeight += oneDayColumnHeight;
				}

				// Berth Column & Draw Bessel
				if (parm.getSearchType().equals("B") & berthBreakBerkList.size() > 0) {
					// WRF
					String berthSize = null;
					mainWeidth = a4Width - oneBerthColumnWidth;
					contentStream.setLineWidth(0.5f);
					PDFBuilder.setLineColor(contentStream, Color.BLACK); // DATE/SHFT ||| HRS
					// BerthColunm Vertical Line
					PDFBuilder.drawLine(contentStream, startX + oneBerthColumnWidth, startY + noteColumnHeight,
							startX + oneBerthColumnWidth, startY + etaataColumnHeight + noteColumnHeight);

					PDFBuilder.drawLine(contentStream, startX + oneBerthColumnWidth,
							startY + noteColumnHeight + etaataColumnHeight + mainHeight + legendColumnHeight,
							startX + oneBerthColumnWidth, startY + noteColumnHeight + etaataColumnHeight + mainHeight);

					// HSR horizontal Line
					PDFBuilder.drawLine(contentStream, startX + oneBerthColumnWidth * (2.0f / 3.0f),
							startY + etaataColumnHeight + noteColumnHeight, startX + oneBerthColumnWidth * (2.0f / 3.0f),
							startY + etaataColumnHeight + noteColumnHeight + mainHeight
									+ ((legendColumnHeight) * (1.0f / 4.0f)));

					float breakBulkBerthSize = 0, prevBreakBulkBerthSize = 0;
					//float prevBreakBulkBerthCount = 43.0f;
					float prevBreakBulkBerthCount = bittListStore.size();
					float breakBulkBerthWidth = mainWeidth / prevBreakBulkBerthCount;
					float breakBulkNextPlanBerthWidth = mainWeidth / 12.0f;

					float preATAETADataColumnSize = 0;

					// Break Bulk Next VesselSchedule
					String breakBulkATAETAColumnwidth[][] = new String[berthBreakBerkList.size() - 1][3];
					for (int j = 0; j < berthBreakBerkList.size() - 1; j++) {
//						Warf Next Plan LIne 없이 데이터 출력
//							breakBulkATAETAColumnwidth[j][0] = String.valueOf(berthBreakBerkList.get(j + 1).getBerthCd());
//							breakBulkATAETAColumnwidth[j][1] = String
//									.valueOf(startX + oneBerthColumnWidth + (breakBulkNextPlanBerthWidth * (j)));
//							breakBulkATAETAColumnwidth[j][2] = String
//									.valueOf(startX + oneBerthColumnWidth + (breakBulkNextPlanBerthWidth * (j+1)));
						
						//Warf Next Plan LIne 있게끔 데이터 출력
						if (j < 1) {
							breakBulkATAETAColumnwidth[j][0] = String.valueOf(berthBreakBerkList.get(j + 1).getBerthCd());
							breakBulkATAETAColumnwidth[j][1] = String.valueOf(startX + oneBerthColumnWidth + (breakBulkBerthWidth));
							breakBulkATAETAColumnwidth[j][2] = String.valueOf(startX + oneBerthColumnWidth + (breakBulkBerthWidth * 3));
						} else if (j == 1) {
							breakBulkATAETAColumnwidth[j][0] = String.valueOf(berthBreakBerkList.get(j + 1).getBerthCd());
							breakBulkATAETAColumnwidth[j][1] = String.valueOf(startX + oneBerthColumnWidth + (breakBulkBerthWidth * (((j - 1) * 4) - 1)));
							breakBulkATAETAColumnwidth[j][2] = String.valueOf(startX + oneBerthColumnWidth + (breakBulkBerthWidth * (((j) * 4) - 1)));
						} else {
							breakBulkATAETAColumnwidth[j][0] = String.valueOf(berthBreakBerkList.get(j + 1).getBerthCd());
							breakBulkATAETAColumnwidth[j][1] = String.valueOf(startX + oneBerthColumnWidth + (breakBulkBerthWidth * (((j - 1) * 4) - 1)));
							breakBulkATAETAColumnwidth[j][2] = String.valueOf(startX + oneBerthColumnWidth + (breakBulkBerthWidth * (((j) * 4) - 1)));
						}
					}
					contentStream.setFont(font, 4);
					for (int index = 0; index < nextBerthPlanList.size(); index++) {
						float nextPlanHeight = 0;
						for (int z = 0; z < breakBulkATAETAColumnwidth.length; z++) {
							BerthPlanItem berthPlanItem = nextBerthPlanList.get(index);
							if (berthPlanItem.getBerthCd().equals(breakBulkATAETAColumnwidth[z][0])) {
								//Warf Next Plan LIne 없이 데이터 출력(Berth Code 입력)
//								// Berth Code
//								dimen = PDFBuilder.dim(font, 4, berthPlanItem.getBerthCd());
//								PDFBuilder.text(contentStream,
//										(Float.parseFloat(breakBulkATAETAColumnwidth[z][1])
//												+ Float.parseFloat(breakBulkATAETAColumnwidth[z][2])) / 2 - dimen[0] / 2,
//										startY + etaataColumnHeight + noteColumnHeight - dimen[1],
//										"("+berthPlanItem.getBerthCd()+")");
//								nextPlanHeight += dimen[1];
								
								
								// Vessel Name
								dimen = PDFBuilder.dim(font, 4, berthPlanItem.getVesselName());
								PDFBuilder.text(contentStream,
										(Float.parseFloat(breakBulkATAETAColumnwidth[z][1])
												+ Float.parseFloat(breakBulkATAETAColumnwidth[z][2])) / 2 - dimen[0] / 2,
										startY + etaataColumnHeight + noteColumnHeight - dimen[1] - nextPlanHeight,
										berthPlanItem.getVesselName());
								nextPlanHeight += dimen[1];

								// ETA
								SimpleDateFormat formatter = new SimpleDateFormat("dd/HHmm");
								String eta = "ETA:" + formatter.format(berthPlanItem.getEta());
								dimen = PDFBuilder.dim(font, 4, eta);
								PDFBuilder.text(contentStream,
										(Float.parseFloat(breakBulkATAETAColumnwidth[z][1])
												+ Float.parseFloat(breakBulkATAETAColumnwidth[z][2])) / 2 - dimen[0] / 2,
										startY + etaataColumnHeight + noteColumnHeight - dimen[1] - nextPlanHeight, eta);
								nextPlanHeight += dimen[1];

								// LOADING
								if (berthPlanItem.getLoading() > 0) {
									String loading = "L: " + df.format(berthPlanItem.getLoading()) + "MT";
									dimen = PDFBuilder.dim(font, 4, loading);
									PDFBuilder.text(contentStream,
											(Float.parseFloat(breakBulkATAETAColumnwidth[z][1])
													+ Float.parseFloat(breakBulkATAETAColumnwidth[z][2])) / 2
													- dimen[0] / 2,
											startY + etaataColumnHeight + noteColumnHeight - dimen[1] - nextPlanHeight,
											loading);
									nextPlanHeight += dimen[1];
								}

								// DISCHARGING
								if (berthPlanItem.getDischarging() > 0) {
									String discharging = "D: " + df.format(berthPlanItem.getDischarging()) + "MT";
									dimen = PDFBuilder.dim(font, 4, discharging);
									PDFBuilder.text(contentStream,
											(Float.parseFloat(breakBulkATAETAColumnwidth[z][1])
													+ Float.parseFloat(breakBulkATAETAColumnwidth[z][2])) / 2
													- dimen[0] / 2,
											startY + etaataColumnHeight + noteColumnHeight - dimen[1] - nextPlanHeight,
											discharging);
									nextPlanHeight += dimen[1];
								}

								// Commodity
								String commodity = "";
								if (berthPlanItem.getLoadingCmdt() != null) {
									commodity = berthPlanItem.getLoadingCmdt();
									dimen = PDFBuilder.dim(font, 4, commodity);
									PDFBuilder.text(contentStream,
											(Float.parseFloat(breakBulkATAETAColumnwidth[z][1])
													+ Float.parseFloat(breakBulkATAETAColumnwidth[z][2])) / 2
													- dimen[0] / 2,
											startY + etaataColumnHeight + noteColumnHeight - dimen[1] - nextPlanHeight,
											commodity);
									nextPlanHeight += dimen[1];
								}
								if (berthPlanItem.getDischargingCmdt() != null) {
									commodity = berthPlanItem.getDischargingCmdt();
									dimen = PDFBuilder.dim(font, 4, commodity);
									PDFBuilder.text(contentStream,
											(Float.parseFloat(breakBulkATAETAColumnwidth[z][1])
													+ Float.parseFloat(breakBulkATAETAColumnwidth[z][2])) / 2
													- dimen[0] / 2,
											startY + etaataColumnHeight + noteColumnHeight - dimen[1] - nextPlanHeight,
											commodity);
								}
							}
						}
					}

					/**
					 * breakBulkBerthSize = breakBulkBerthWidth + breakBulkBerthWidth + breakBulkBerthWidth
					 * 					  = 11.617743 + 11.617743 + 11.617743 + 11.617743...
					 */

					/**
					 * WHARVES 
					 * DISPLACEMENT
					 * Draw Each Berth Name: 
					 * B2 B3 B4 B5 .....
					 */
					breakBulkBerthSize = 0;
					prevBreakBulkBerthSize = 0;
					
					// START HERE
					String maxLengthBerthWidth = bittListStore.get(bittListStore.size()-1).getFromPos();	// BITCD B16 941
					float oneBerthBittWidthDraw = mainWeidth / Integer.parseInt(maxLengthBerthWidth);		// 720.30005 / 941 = 0.76546234 is 1draw/oneBitt
					float perBerthBittWidthDraw = 0;
					float tempNextBittDraw = 0;
					float endBerthBitt = prevBreakBulkBerthCount - 1;	// B04 B16 941

					for (int i = 0; i <= endBerthBitt; i++) {
						
						String fromPost = bittListStore.get(i).getFromPos();
						String berthCd = bittListStore.get(i).getBerthCd();
						String nextBerthCd = null;
						
						if (i == endBerthBitt ) {
							tempNextBittDraw = (oneBerthBittWidthDraw * Integer.parseInt(fromPost));
						} else {
							nextBerthCd = bittListStore.get(i+1).getBerthCd();
							tempNextBittDraw = (i == 0) ? 0 : (oneBerthBittWidthDraw * Integer.parseInt(bittListStore.get(i+1).getFromPos()));
						}
						
						System.out.println(" i: "+ i + " currentBerthCd : " + berthCd + " " + fromPost + " tempNextBittDraw " + tempNextBittDraw);

						prevBreakBulkBerthSize = breakBulkBerthSize;
						
						breakBulkBerthSize = oneBerthBittWidthDraw * Integer.parseInt(fromPost);
						
						
						// Berth Depth
						for (int j = 0; j < berthBreakBerkList.size(); j++) {
							
							BerthInfoItem berthInfoItem = berthBreakBerkList.get(j);

							
							int startpos = Integer.parseInt(berthInfoItem.getStartPos());
							int endpos = Integer.parseInt(berthInfoItem.getEndPos());
							if (
										breakBulkBerthSize <= (((startpos + endpos) * oneBerthBittWidthDraw) / 2)
									&&	tempNextBittDraw 	> (((startpos + endpos) * oneBerthBittWidthDraw) / 2)
							) {
								String berthName = "";
								if(berthInfoItem.getLocCd().equals("ANT")) {
									berthName = "Anchorage";
								}else {
									berthName = berthInfoItem.getBerthNm();
								}
								
								/**
								 * WHARVES : BERTH B01 B02 B03 B04 
								 */
								contentStream.setFont(font, 4);
								font = PDType1Font.HELVETICA_BOLD;
								dimen = PDFBuilder.dim(font, 9, berthName);
								contentStream.setFont(font, 9);
								PDFBuilder.text(
										contentStream,
										startX + oneBerthColumnWidth + ((prevBreakBulkBerthSize + breakBulkBerthSize) / 2) - oneBerthBittWidthDraw ,
										startY + etaataColumnHeight + noteColumnHeight + mainHeight + (legendColumnHeight)
												- (dimen[1] + 1.5f),
										berthName
								);
								
								// ATA/ETA
//								float nextPlanHeight = 0;
//								contentStream.setFont(font, 4);
//								for(int index=0; index <nextBerthPlanList.size(); index++) {
//									BerthPlanItem berthPlanItem = nextBerthPlanList.get(index);
//									if(berthPlanItem.getBerthCd().equals(berthInfoItem.getBerthCd())) {
//										// Vessel Name
//										dimen = PDFBuilder.dim(font, 4, berthPlanItem.getVesselName());
//										PDFBuilder.text(contentStream, 	startX + oneBerthColumnWidth + ((prevBreakBulkBerthSize+breakBulkBerthSize)/2) + 1,
//												startY + etaataColumnHeight + noteColumnHeight - dimen[1], berthPlanItem.getVesselName());
//										nextPlanHeight += dimen[1];
//										
//										// ETA
//										SimpleDateFormat formatter = new SimpleDateFormat("dd/HHmm");
//										String eta = "ETA:" + formatter.format(berthPlanItem.getEta());
//										dimen = PDFBuilder.dim(font, 4, eta);
//										PDFBuilder.text(contentStream, 	startX + oneBerthColumnWidth + ((prevBreakBulkBerthSize+breakBulkBerthSize)/2) + 1,
//																		startY + etaataColumnHeight + noteColumnHeight - dimen[1] - nextPlanHeight, eta);
//										nextPlanHeight += dimen[1];
//
//										//LOADING
//										if(berthPlanItem.getLoading() > 0) {
//											String loading = "L: " + df.format(berthPlanItem.getLoading()) + "MT";
//											dimen = PDFBuilder.dim(font, 4, loading);
//											PDFBuilder.text(contentStream, 	startX + oneBerthColumnWidth + ((prevBreakBulkBerthSize+breakBulkBerthSize)/2) + 1,
//													startY + etaataColumnHeight + noteColumnHeight - dimen[1] - nextPlanHeight,  loading);
//											nextPlanHeight += dimen[1];
//										}
//
//										//DISCHARGING
//										if(berthPlanItem.getDischarging() > 0) {
//											String discharging = "D: " + df.format(berthPlanItem.getDischarging()) + "MT";
//											dimen = PDFBuilder.dim(font, 4, discharging);
//											PDFBuilder.text(contentStream, 	startX + oneBerthColumnWidth + ((prevBreakBulkBerthSize+breakBulkBerthSize)/2) + 1,
//													startY + etaataColumnHeight + noteColumnHeight - dimen[1] - nextPlanHeight, discharging);
//											nextPlanHeight += dimen[1];
//										}
//										
//										//Commodity
//										String commodity = "";
//										if(berthPlanItem.getLoadingCmdt() != null) {
//											commodity = berthPlanItem.getLoadingCmdt();
//											dimen = PDFBuilder.dim(font, 4, commodity);
//											PDFBuilder.text(contentStream, 	startX + oneBerthColumnWidth + ((prevBreakBulkBerthSize+breakBulkBerthSize)/2) + 1,
//																			startY + etaataColumnHeight + noteColumnHeight - dimen[1] - nextPlanHeight, commodity);	
//											nextPlanHeight += dimen[1];
//										}						
//										if(berthPlanItem.getDischargingCmdt() != null) {
//											commodity = berthPlanItem.getDischargingCmdt();
//											dimen = PDFBuilder.dim(font, 4, commodity);
//											PDFBuilder.text(contentStream, 	startX + oneBerthColumnWidth + ((prevBreakBulkBerthSize+breakBulkBerthSize)/2) + 1,
//													startY + etaataColumnHeight + noteColumnHeight - dimen[1] - nextPlanHeight, commodity);	
//										}		
//									}
//								}
								
								
								/**
								 * DISPLACEMENT : 198	210		292		249
								 */
								contentStream.setFont(font, 4);
								font = PDType1Font.HELVETICA;
								dimen = PDFBuilder.dim(font, 9, berthInfoItem.getLength());
								contentStream.setFont(font, 9);
							
								PDFBuilder.text(
										contentStream,
										startX + oneBerthColumnWidth + ((prevBreakBulkBerthSize + breakBulkBerthSize) / 2) - oneBerthBittWidthDraw,
										startY + etaataColumnHeight + noteColumnHeight + mainHeight + (legendColumnHeight / 2)
												+ dimen[1] / 2 -3,
										berthInfoItem.getLength()
								);
							}
						}
						
						
						/**
						 * Berth Bit Cd: B1 B2 B3 .... 
						 */
						String berthBitCd = bittListStore.get(i//-1
																).getBittCd();
						contentStream.setFont(font, 5);
						dimen = PDFBuilder.dim(font, 7, berthBitCd);
						if (nextBerthCd == null) { // End Bitt Berth
							PDFBuilder.text(
									contentStream,
									startX + oneBerthColumnWidth  + breakBulkBerthSize - 6.0f,
									startY + etaataColumnHeight + noteColumnHeight + mainHeight + ((legendColumnHeight) * (3.0f / 5.5f) //* (2.0f / 4.0f)
											)
									- dimen[1] - 2,
									berthBitCd
							);
						} else {
							if(i == 0) {
								contentStream.setFont(font, 5);
								PDFBuilder.text(
										contentStream,
										startX + oneBerthColumnWidth  + breakBulkBerthSize,// - 3.0f,
										startY + etaataColumnHeight + noteColumnHeight + mainHeight + ((legendColumnHeight) * (3.0f / 5.5f) //* (2.0f / 4.0f)
												)
										- dimen[1] - 2,
										berthBitCd
								);
							} else {
								PDFBuilder.text(
										contentStream,
										startX + oneBerthColumnWidth  + breakBulkBerthSize - 3.0f,
										startY + etaataColumnHeight + noteColumnHeight + mainHeight + ((legendColumnHeight) * (3.0f / 5.5f)//* (2.0f / 4.0f)
												)
										- dimen[1] - 2,
										berthBitCd
								);
							}
						}

						//Warf Next Plan LIne 있게끔 데이터 출력
						/*if (i % 4 == 0) {
							PDFBuilder.setLineColor(contentStream, Color.BLACK);
							contentStream.setLineWidth(0.1f);
							PDFBuilder.drawLine(contentStream, startX + oneBerthColumnWidth + breakBulkBerthSize,
									startY + noteColumnHeight, startX + oneBerthColumnWidth + breakBulkBerthSize,
									startY + etaataColumnHeight + noteColumnHeight + mainHeight
											+ ((legendColumnHeight) * (1.0f / 4.0f)));

						} else {
							if (i == 1) {
								PDFBuilder.setLineColor(contentStream, Color.BLACK);
								contentStream.setLineWidth(0.1f);
								PDFBuilder.drawLine(contentStream, startX + oneBerthColumnWidth + breakBulkBerthSize,
										startY + noteColumnHeight, startX + oneBerthColumnWidth + breakBulkBerthSize,
										startY + etaataColumnHeight + noteColumnHeight + mainHeight
												+ ((legendColumnHeight) * (1.0f / 4.0f)));

							} else {
								PDFBuilder.setLineColor(contentStream, Color.LIGHT_GRAY);
								contentStream.setLineWidth(0.05f);
								PDFBuilder.drawLine(contentStream, startX + oneBerthColumnWidth + breakBulkBerthSize,
										startY + etaataColumnHeight + noteColumnHeight,
										startX + oneBerthColumnWidth + breakBulkBerthSize, startY + etaataColumnHeight
												+ noteColumnHeight + mainHeight + ((legendColumnHeight) * (1.0f / 4.0f)));
							}
						}*/
						
						//Warf Next Plan LIne 없이 데이터 출력
//						if (i % 4 == 0) {
//						PDFBuilder.setLineColor(contentStream, Color.BLACK);
//						contentStream.setLineWidth(0.1f);
//						PDFBuilder.drawLine(contentStream, startX + oneBerthColumnWidth + breakBulkBerthSize,
//								startY + etaataColumnHeight + noteColumnHeight, startX + oneBerthColumnWidth + breakBulkBerthSize,
//								startY + etaataColumnHeight + noteColumnHeight + mainHeight
//										+ ((legendColumnHeight) * (1.0f / 4.0f)));
	//
//						}
//						else {
//						if (i == 1) {
//							PDFBuilder.setLineColor(contentStream, Color.BLACK);
//							contentStream.setLineWidth(0.1f);
//							PDFBuilder.drawLine(contentStream, startX + oneBerthColumnWidth + breakBulkBerthSize,
//									startY + etaataColumnHeight + noteColumnHeight, startX + oneBerthColumnWidth + breakBulkBerthSize,
//									startY + etaataColumnHeight + noteColumnHeight + mainHeight
//											+ ((legendColumnHeight) * (1.0f / 4.0f)));
	//
//						} else {
//							PDFBuilder.setLineColor(contentStream, Color.LIGHT_GRAY);
//							contentStream.setLineWidth(0.05f);
//							PDFBuilder.drawLine(contentStream, startX + oneBerthColumnWidth + breakBulkBerthSize,
//									startY + etaataColumnHeight + noteColumnHeight,
//									startX + oneBerthColumnWidth + breakBulkBerthSize, startY + etaataColumnHeight
//											+ noteColumnHeight + mainHeight + ((legendColumnHeight) * (1.0f / 4.0f)));
//						}
//					}
						
						
						
						
						
						/**
						 * Berth Bit From Pos: 15 30 45 60..
						 */
						if (i < prevBreakBulkBerthCount) { // i < 62
								
							berthSize = i * breakBulkBerthSize + "";
	
							contentStream.setFont(font, 5);
							dimen = PDFBuilder.dim(font, 5, berthSize);
							
							if (nextBerthCd == null) { // End Bitt Berth
								PDFBuilder.text(
										contentStream,
										startX + oneBerthColumnWidth + breakBulkBerthSize - 6.0f, // + breakBulkBerthWidth - dimen[0] - 1,
										startY + etaataColumnHeight + noteColumnHeight + mainHeight + ((legendColumnHeight) * (2.0f / 6.0f)) - dimen[1] / 2,
										bittListStore.get(i).getFromPos()
								);
							} else {
								if (i == 0) {
									contentStream.setFont(font, 5);
									PDFBuilder.text(
											contentStream,
											startX + oneBerthColumnWidth + breakBulkBerthSize,// - 3.0f, // + breakBulkBerthWidth - dimen[0] - 1,
											startY + etaataColumnHeight + noteColumnHeight + mainHeight + ((legendColumnHeight) * (2.0f / 6.0f)) - dimen[1] / 2,
											bittListStore.get(i).getFromPos()
									);
								} else { 
									PDFBuilder.text(
											contentStream,
											startX + oneBerthColumnWidth + breakBulkBerthSize - 3.0f, // + breakBulkBerthWidth - dimen[0] - 1,
											startY + etaataColumnHeight + noteColumnHeight + mainHeight + ((legendColumnHeight) * (2.0f / 6.0f)) - dimen[1] / 2,
											bittListStore.get(i).getFromPos()
									);
								}
							}
						}
						
						/**
						 *
						 * Berth Line Bit Berth
						 * |	|	|	|	|
						 */
						if (
									i != 0//1
								&&	i < prevBreakBulkBerthCount
								&& !bittListStore.get(i-1//2
										).getBerthCd().equals(bittListStore.get(i//-1
												).getBerthCd())
						) {
							
							PDFBuilder.setLineColor(contentStream, Color.BLACK);
							contentStream.setLineWidth(0.1f);
							PDFBuilder.drawLine(
									contentStream,
									startX + oneBerthColumnWidth + breakBulkBerthSize,
									startY + noteColumnHeight,
									startX + oneBerthColumnWidth + breakBulkBerthSize,
									startY + etaataColumnHeight + noteColumnHeight + mainHeight
											+ ((legendColumnHeight) * (1.0f / 4.0f))
							);
							
						} else {
							
							if (i == 0) {
								
								PDFBuilder.setLineColor(contentStream, Color.BLACK);
								contentStream.setLineWidth(0.1f);
								PDFBuilder.drawLine(
										contentStream, startX + oneBerthColumnWidth + breakBulkBerthSize,
										startY + noteColumnHeight,
										startX + oneBerthColumnWidth + breakBulkBerthSize,
										startY + etaataColumnHeight + noteColumnHeight + mainHeight
												+ ((legendColumnHeight) * (1.0f / 4.0f))
								);
	
							} else {
								
								PDFBuilder.setLineColor(contentStream, Color.LIGHT_GRAY);
								contentStream.setLineWidth(0.05f);
								PDFBuilder.drawLine(
										contentStream,
										startX + oneBerthColumnWidth + breakBulkBerthSize,
										startY + etaataColumnHeight + noteColumnHeight,
										startX + oneBerthColumnWidth + breakBulkBerthSize,
										startY + etaataColumnHeight + noteColumnHeight + mainHeight
												+ ((legendColumnHeight) * (1.0f / 4.0f))
								);
							}
							
						}

						float perBerthBittWidthDrw = tempNextBittDraw - breakBulkBerthSize;
						breakBulkBerthSize += perBerthBittWidthDrw;
					}


					
					// draw Vessel schedule
					for (int i = 0; i < berthPlanListStore.size(); i++) {
						
						String vslCallId = berthPlanListStore.get(i).getVslCallId();
						
						if (!vslCallId.equals("STRG") && !vslCallId.equals("CSTO") ) {
							int fromWorkingYear = 0, toWorkingYear = 0;
							int fromWorkingMonth = 0, toWorkingMonth = 0;
							int fromWorkingDay = 0, toWorkingDay = 0;
							int fromWorkingHour = 0, toWorkingHour = 0;

							Date arrTime = getBerthPlanTimeRule(berthPlanListStore.get(i), parm.getViewMode(), "arrival");
							Date depTime = getBerthPlanTimeRule(berthPlanListStore.get(i), parm.getViewMode(), "departure");


//						if(parm.getEtaTo().compareTo(arrTime)>0) {
		//						System.out.println("test");
							
							if (arrTime.getTime() > depTime.getTime()) {
								arrTime = depTime;
								Calendar cal = Calendar.getInstance();
								cal.setTime(depTime);
								cal.add(Calendar.HOUR, 8);
								depTime = cal.getTime();
							}
		
							fromWorkingYear = Integer.parseInt(new SimpleDateFormat("yyyy").format(arrTime));
							fromWorkingMonth = Integer.parseInt(new SimpleDateFormat("MM").format(arrTime));
							fromWorkingDay = Integer.parseInt(new SimpleDateFormat("dd").format(arrTime));
							fromWorkingHour = Integer.parseInt(new SimpleDateFormat("HH").format(arrTime));
		
							toWorkingYear = Integer.parseInt(new SimpleDateFormat("yyyy").format(depTime));
							toWorkingMonth = Integer.parseInt(new SimpleDateFormat("MM").format(depTime));
							toWorkingDay = Integer.parseInt(new SimpleDateFormat("dd").format(depTime));
							toWorkingHour = Integer.parseInt(new SimpleDateFormat("HH").format(depTime));
		
							int count = 0;
							for (int k = 0; k < days; k++) {
								if (toDateArray[k] == toWorkingDay && toMonthArray[k] == toWorkingMonth) {
									count = k + 1;
								}
							}
		
							if (count == 0) {
								if(		toWorkingDay >= toDateArray[0] && toWorkingMonth >=  toMonthArray[0]
									&&	fromWorkingDay <= toDateArray[0] && fromWorkingMonth <=  toMonthArray[0]) {
										toWorkingMonth = toMonthArray[0];
										toWorkingDay = toDateArray[0];
										toWorkingHour = 24;
								}else {
									continue;
								}
							}
		
							float differenceTime = 0;
							
//							if (fromWorkingMonth != toWorkingMonth) {
//								fromWorkingDay = totalDate - fromWorkingDay + 1;
//								differenceTime = ((toWorkingDay + fromWorkingDay) * 24) + (toWorkingHour - fromWorkingHour);
//							} else {
//								if(fromWorkingYear == toWorkingYear) {
//									if(toWorkingDay == fromWorkingDay) {
//										differenceTime = (toWorkingHour - fromWorkingHour);
//									}
//									else {
//										differenceTime = ((toWorkingDay - fromWorkingDay) * 24) + (toWorkingHour - fromWorkingHour);
//									}
//								}else {
//									fromWorkingDay = totalDate - fromWorkingDay + 1;
//									differenceTime = ((toWorkingDay + fromWorkingDay) * 24) + (toWorkingHour - fromWorkingHour);	
//								}
//								
//							}
							
//							if(fromWorkingYear == toWorkingYear) {
								//Same Year
								if (fromWorkingMonth == toWorkingMonth) {
									//same Month
									if(toWorkingDay == fromWorkingDay) {
										//same Day
										differenceTime = (toWorkingHour - fromWorkingHour);
									}else {
										//differnt Day
										if(toWorkingDay<fromWorkingDay) {
											fromWorkingDay = totalDate - fromWorkingDay + 1;
											differenceTime = ((toWorkingDay + fromWorkingDay) * 24) + (toWorkingHour - fromWorkingHour);	
										}
										else {
											differenceTime = ((toWorkingDay - fromWorkingDay) * 24) + (toWorkingHour - fromWorkingHour);	
										}
									}
								}else {
									//different Month
									if(toWorkingDay == fromWorkingDay) {
										//same Day
										differenceTime = (toWorkingHour - fromWorkingHour);
									}else {
										//differnt Day
										if(toWorkingDay<fromWorkingDay) {
											fromWorkingDay = totalDate - fromWorkingDay + 1;
											differenceTime = ((toWorkingDay + fromWorkingDay) * 24) + (toWorkingHour - fromWorkingHour);	
										}
										else {
											differenceTime = ((toWorkingDay - fromWorkingDay) * 24) + (toWorkingHour - fromWorkingHour);	
										}
									}
								}
//							}else {
//								//different Year
//								if (fromWorkingMonth == toWorkingMonth) {
//									//same Month
//									if(toWorkingDay == fromWorkingDay) {
//										//same Day
//										differenceTime = (toWorkingHour - fromWorkingHour);
//									}else {
//										//differnt Day
//										if(toWorkingDay<fromWorkingDay) {
//											fromWorkingDay = totalDate - fromWorkingDay + 1;
//											differenceTime = ((toWorkingDay + fromWorkingDay) * 24) + (toWorkingHour - fromWorkingHour);	
//										}
//										else {
//											differenceTime = ((toWorkingDay - fromWorkingDay) * 24) + (toWorkingHour - fromWorkingHour);	
//										}
//									}
//								}else {
//									//different Month
//									if(toWorkingDay == fromWorkingDay) {
//										//same Day
//										differenceTime = (toWorkingHour - fromWorkingHour);
//									}else {
//										//differnt Day
//										if(toWorkingDay<fromWorkingDay) {
//											fromWorkingDay = totalDate - fromWorkingDay + 1;
//											differenceTime = ((toWorkingDay + fromWorkingDay) * 24) + (toWorkingHour - fromWorkingHour);	
//										}
//										else {
//											differenceTime = ((toWorkingDay - fromWorkingDay) * 24) + (toWorkingHour - fromWorkingHour);	
//										}
//									}
//								}
//							}
		
							float scheduleHeight = (differenceTime / 2.0f) * oneHourColumnHeight;
		
							float scheduleStartY = startY + etaataColumnHeight + noteColumnHeight
									+ (oneDayColumnHeight * (count - 2)) + ((24 - toWorkingHour / 2.0f) * oneHourColumnHeight);
							float scheduleEndY = scheduleHeight;
		
							float scheduleStartX, scheduleEndX = 0;
							float vesselLoa = berthPlanListStore.get(i).getLoa();
							
							// START HERE
							String totalBitBerth = bittListStore.get(bittListStore.size()-1).getFromPos(); // 941 
							float eachBitBerthWidth = Integer.parseInt(totalBitBerth) / bittListStore.size(); // 941 / 62 = 15.177~
							
							
							Float startPos = berthPlanListStore.get(i).getStartPos();
							if (startPos != null && berthPlanListStore.get(i).getStartPos() > 0) {
								scheduleStartX = berthPlanListStore.get(i).getStartPos();
								scheduleEndX = scheduleStartX + vesselLoa;
							} else {
								scheduleStartX = 0;
								scheduleEndX = 0;
							}

							scheduleStartX = scheduleStartX * oneBerthBittWidthDraw;// 0.76546234
							scheduleEndX = scheduleEndX * oneBerthBittWidthDraw;
							
							if (scheduleStartY < startY + etaataColumnHeight + noteColumnHeight) {
								scheduleStartY = startY + etaataColumnHeight + noteColumnHeight;
							}
		
							if (scheduleStartY + scheduleHeight > startY + mainHeight + etaataColumnHeight + noteColumnHeight) {
								scheduleEndY = startY + mainHeight + etaataColumnHeight + noteColumnHeight - scheduleStartY;
							}
		
							// breakBulkBerthWidth = 11.617743
							PDFBuilder.setBackColor(contentStream, Color.WHITE);
		//					PDFBuilder.setLineColor(contentStream, Color.BLACK);
		//					PDFBuilder.setLineColor(contentStream, getHexToDec("FFE5AA"));
							PDFBuilder.setLineColor(contentStream, Color.ORANGE);
							PDFBuilder.drawRect(
									contentStream,
									// 20  + 80f				 + ( 500 / 15f) * 11.617743
									startX + oneBerthColumnWidth + (scheduleStartX),//breakBulkBerthWidth), // - 1.0f,
									scheduleStartY,
									(scheduleEndX - scheduleStartX),//* breakBulkBerthWidth,	// - 1.0f,
									scheduleEndY,
									"fill"
							);
		
							PDFBuilder.setBackColor(contentStream, Color.BLACK);
							contentStream.setFont(font, 3);
							dimen = PDFBuilder.dim(font, 3, berthPlanListStore.get(i).getVslCallId());
		
							if (scheduleStartX != 0 && scheduleEndX != 0) {
								float textStart_X = startX + oneBerthColumnWidth + scheduleStartX; // * breakBulkBerthWidth;
								float textEnd_X = textStart_X + (scheduleEndX - scheduleStartX); // * breakBulkBerthWidth;
								float mainStartY = startY + etaataColumnHeight + noteColumnHeight;
								float mainEnxY = startY + mainHeight + etaataColumnHeight + noteColumnHeight;
								// set Vessel sehedule Data
								if ((scheduleStartY != mainStartY) || (scheduleStartY + scheduleEndY) > (startY
										+ noteColumnHeight + etaataColumnHeight + (oneDayColumnHeight / 2))) {
									setVesselScheduleData(contentStream, textStart_X, textEnd_X, i, scheduleStartY,
											scheduleEndY, toDateArray, toMonthArray, mainStartY, mainEnxY);
								}
		
							}
//						}
						}
						
					}
				} else if (parm.getSearchType().equals("L")) {
					// EDJ & NDJ
					mainWeidth = a4Width - oneBerthColumnWidth;
					dayColunmHeight -= oneDayColumnHeight;
					for (int i = 0; i < berthLiquidListSorting.size() + 2; i++) {
						contentStream.setLineWidth(1);
						PDFBuilder.setLineColor(contentStream, Color.BLACK);
						// BerthColunm Vertical Line
						PDFBuilder.drawLine(contentStream, startX + liquidColumnWidth, startY + noteColumnHeight,
								startX + liquidColumnWidth, startY + etaataColumnHeight + noteColumnHeight + mainHeight
										+ ((legendColumnHeight) * (2.0f / 5.0f)));
						if (i == 0) {
							// HSR horizontal Line
							PDFBuilder.drawLine(contentStream, startX + oneBerthColumnWidth * (2.0f / 3.0f),
									startY + etaataColumnHeight + noteColumnHeight,
									startX + oneBerthColumnWidth * (2.0f / 3.0f), startY + etaataColumnHeight
											+ noteColumnHeight + mainHeight + ((legendColumnHeight) * (1.0f / 5.0f)));
						} else if (i < berthLiquidListSorting.size() + 1) {
							float subColumnVerticalLine = oneBerthColumnWidth / 3;
							contentStream.setLineWidth(1);
							String berthCode = berthLiquidListSorting.get(i - 1).getBerthCd();
							String berthLength = berthLiquidListSorting.get(i - 1).getLength();
							String displacement = Double.toString(berthLiquidListSorting.get(i - 1).getDisplacement());
							String maxDraft = Double.toString(berthLiquidListSorting.get(i - 1).getMaxDraft());

							contentStream.setFont(font, 7);

							dimen = PDFBuilder.dim(font, 7, berthLength + "m");
							PDFBuilder.text(contentStream,
									startX + oneBerthColumnWidth + liquidColumnWidth - (oneBerthColumnWidth / 2)
											- dimen[0] / 2,
									startY + etaataColumnHeight + noteColumnHeight + mainHeight + ((legendColumnHeight))
											- 8,
									berthLength + "m");

							dimen = PDFBuilder.dim(font, 7, displacement + "k");
							PDFBuilder.text(contentStream,
									startX + oneBerthColumnWidth + liquidColumnWidth - (oneBerthColumnWidth / 2)
											- dimen[0] / 2,
									startY + etaataColumnHeight + noteColumnHeight + mainHeight
											+ ((legendColumnHeight) * (4.0f / 5.0f)) - 8,
									displacement + "k");

							dimen = PDFBuilder.dim(font, 7, maxDraft + "m");
							PDFBuilder.text(contentStream,
									startX + oneBerthColumnWidth + liquidColumnWidth - (oneBerthColumnWidth / 2)
											- dimen[0] / 2,
									startY + etaataColumnHeight + noteColumnHeight + mainHeight
											+ ((legendColumnHeight) * (3.0f / 5.0f)) - 8,
									maxDraft + "m");

							dimen = PDFBuilder.dim(font, 7, berthCode);
							PDFBuilder.text(contentStream,
									startX + oneBerthColumnWidth + liquidColumnWidth - (oneBerthColumnWidth / 2)
											- dimen[0] / 2,
									startY + etaataColumnHeight + noteColumnHeight + mainHeight
											+ ((legendColumnHeight) * (1.5f / 5.0f)) - 8,
									berthCode);

							// ATA/ETA
							float nextPlanHeight = 0;
							contentStream.setFont(font, 6);
							for (int index = 0; index < nextBerthPlanList.size(); index++) {
								BerthPlanItem berthPlanItem = nextBerthPlanList.get(index);
								if (berthPlanItem.getBerthCd().equals(berthCode)) {
									// Vessel Name
									dimen = PDFBuilder.dim(font, 6, berthPlanItem.getVesselName());
									PDFBuilder.text(contentStream,
											startX + oneBerthColumnWidth + liquidColumnWidth - (oneBerthColumnWidth / 2)
													- dimen[0] / 2,
											startY + etaataColumnHeight + noteColumnHeight - dimen[1],
											berthPlanItem.getVesselName());
									nextPlanHeight += dimen[1];

									// ETA
									SimpleDateFormat formatter = new SimpleDateFormat("dd/HHmm");
									String eta = "ETA:" + formatter.format(berthPlanItem.getEta());
									dimen = PDFBuilder.dim(font, 6, eta);
									PDFBuilder.text(contentStream,
											startX + oneBerthColumnWidth + liquidColumnWidth - (oneBerthColumnWidth / 2)
													- dimen[0] / 2,
											startY + etaataColumnHeight + noteColumnHeight - dimen[1] - nextPlanHeight,
											eta);
								}
							}

							for (int j = 0; j < 2; j++) {
								PDFBuilder.setLineColor(contentStream, Color.LIGHT_GRAY);
								contentStream.setLineWidth(0.05f);
								PDFBuilder.drawLine(contentStream, startX + liquidColumnWidth + subColumnVerticalLine,
										startY + etaataColumnHeight + noteColumnHeight,
										startX + liquidColumnWidth + subColumnVerticalLine,
										startY + etaataColumnHeight + noteColumnHeight + mainHeight);
								subColumnVerticalLine += subColumnVerticalLine;
							}

						} else {
							contentStream.setFont(font, 7);
							PDFBuilder.setLineColor(contentStream, Color.BLACK);
							dimen = PDFBuilder.dim(font, 7, "Remark");
							PDFBuilder.drawLine(contentStream, startX + mainWeidth,
									startY + etaataColumnHeight + noteColumnHeight, startX + mainWeidth,
									startY + etaataColumnHeight + noteColumnHeight + mainHeight + legendColumnHeight);
							PDFBuilder.text(contentStream,
									startX + oneBerthColumnWidth + (liquidColumnWidth + prevBerthColunmWidth) / 2
											- dimen[0] / 2,
									startY + etaataColumnHeight + noteColumnHeight + mainHeight
											+ ((legendColumnHeight) * (2.5f / 5.0f)),
									"Remark");
						}
						prevBerthColunmWidth = liquidColumnWidth;
						liquidColumnWidth += oneBerthColumnWidth;
					}

					// draw Vessel schedule
					for (int i = 0; i < berthPlanListStore.size(); i++) {
						for (int j = 0; j < berthLiquidListSorting.size(); j++) {
							if (berthPlanListStore.get(i).getBerthCd().equals(berthLiquidListSorting.get(j).getBerthCd())) {
								int fromWorkingYear = 0, toWorkingYear = 0;
								int fromWorkingMonth = 0, toWorkingMonth = 0;
								int fromWorkingDay = 0, toWorkingDay = 0;
								int fromWorkingHour = 0, toWorkingHour = 0;
		
								Date arrTime = getBerthPlanTimeRule(berthPlanListStore.get(i), parm.getViewMode(), "arrival");
								Date depTime = getBerthPlanTimeRule(berthPlanListStore.get(i), parm.getViewMode(), "departure");
								
								if(parm.getEtaTo().compareTo(arrTime)>0) {
									if (arrTime.getTime() > depTime.getTime()) {
										arrTime = depTime;
										Calendar cal = Calendar.getInstance();
										cal.setTime(depTime);
										cal.add(Calendar.HOUR, 8);
										depTime = cal.getTime();
									}
			
									fromWorkingYear = Integer.parseInt(new SimpleDateFormat("yyyy").format(arrTime));
									fromWorkingMonth = Integer.parseInt(new SimpleDateFormat("MM").format(arrTime));
									fromWorkingDay = Integer.parseInt(new SimpleDateFormat("dd").format(arrTime));
									fromWorkingHour = Integer.parseInt(new SimpleDateFormat("HH").format(arrTime));
			
									toWorkingYear = Integer.parseInt(new SimpleDateFormat("yyyy").format(depTime));
									toWorkingMonth = Integer.parseInt(new SimpleDateFormat("MM").format(depTime));
									toWorkingDay = Integer.parseInt(new SimpleDateFormat("dd").format(depTime));
									toWorkingHour = Integer.parseInt(new SimpleDateFormat("HH").format(depTime));
			
									int count = 0;
									for (int k = 0; k < days; k++) {
										if (toDateArray[k] == toWorkingDay && toMonthArray[k] == toWorkingMonth) {
											count = k + 1;
										}
									}
			
									if (count == 0) {
										toWorkingMonth = toMonthArray[0];
										toWorkingDay = toDateArray[0];
										toWorkingHour = 24;
									}
			
									float differenceTime = 0;	
									
//									if (fromWorkingMonth != toWorkingMonth) {
//										fromWorkingDay = totalDate - fromWorkingDay + 1;
//										differenceTime = ((toWorkingDay + fromWorkingDay) * 24) + (toWorkingHour - fromWorkingHour);
//									} else {
//										if(fromWorkingYear == toWorkingYear) {
//											differenceTime = ((toWorkingDay - fromWorkingDay) * 24) + (toWorkingHour - fromWorkingHour);	
//										}else {
//											fromWorkingDay = totalDate - fromWorkingDay + 1;
//											differenceTime = ((toWorkingDay + fromWorkingDay) * 24) + (toWorkingHour - fromWorkingHour);	
//										}
//										
//									}

//									if(fromWorkingYear == toWorkingYear) {
										//Same Year
										if (fromWorkingMonth == toWorkingMonth) {
											//same Month
											if(toWorkingDay == fromWorkingDay) {
												//same Day
												differenceTime = (toWorkingHour - fromWorkingHour);
											}else {
												//differnt Day
												if(toWorkingDay<fromWorkingDay) {
													fromWorkingDay = totalDate - fromWorkingDay + 1;
													differenceTime = ((toWorkingDay + fromWorkingDay) * 24) + (toWorkingHour - fromWorkingHour);	
												}
												else {
													differenceTime = ((toWorkingDay - fromWorkingDay) * 24) + (toWorkingHour - fromWorkingHour);	
												}
											}
										}else {
											//different Month
											if(toWorkingDay == fromWorkingDay) {
												//same Day
												differenceTime = (toWorkingHour - fromWorkingHour);
											}else {
												//differnt Day
												if(toWorkingDay<fromWorkingDay) {
													fromWorkingDay = totalDate - fromWorkingDay + 1;
													differenceTime = ((toWorkingDay + fromWorkingDay) * 24) + (toWorkingHour - fromWorkingHour);	
												}
												else {
													differenceTime = ((toWorkingDay - fromWorkingDay) * 24) + (toWorkingHour - fromWorkingHour);	
												}
											}
										}
//									}else {
//										//different Year
//										if (fromWorkingMonth == toWorkingMonth) {
//											//same Month
//											if(toWorkingDay == fromWorkingDay) {
//												//same Day
//												differenceTime = (toWorkingHour - fromWorkingHour);
//											}else {
//												//differnt Day
//												if(toWorkingDay<fromWorkingDay) {
//													fromWorkingDay = totalDate - fromWorkingDay + 1;
//													differenceTime = ((toWorkingDay + fromWorkingDay) * 24) + (toWorkingHour - fromWorkingHour);	
//												}
//												else {
//													differenceTime = ((toWorkingDay - fromWorkingDay) * 24) + (toWorkingHour - fromWorkingHour);	
//												}
//											}
//										}else {
//											//different Month
//											if(toWorkingDay == fromWorkingDay) {
//												//same Day
//												differenceTime = (toWorkingHour - fromWorkingHour);
//											}else {
//												//differnt Day
//												if(toWorkingDay<fromWorkingDay) {
//													fromWorkingDay = totalDate - fromWorkingDay + 1;
//													differenceTime = ((toWorkingDay + fromWorkingDay) * 24) + (toWorkingHour - fromWorkingHour);	
//												}
//												else {
//													differenceTime = ((toWorkingDay - fromWorkingDay) * 24) + (toWorkingHour - fromWorkingHour);	
//												}
//											}
//										}
//									}
									
									float scheduleHeight = (differenceTime / 2.0f) * oneHourColumnHeight;
			
									float scheduleStartY = startY + etaataColumnHeight + noteColumnHeight
											+ (oneDayColumnHeight * (count - 2))
											+ ((24 - toWorkingHour / 2.0f) * oneHourColumnHeight);
									float scheduleEndY = scheduleHeight;
			
									if (scheduleStartY < startY + etaataColumnHeight + noteColumnHeight) {
										scheduleStartY = startY + etaataColumnHeight + noteColumnHeight;
			
									}
			
									if (scheduleStartY + scheduleHeight > startY + mainHeight + etaataColumnHeight
											+ noteColumnHeight) {
										scheduleEndY = startY + mainHeight + etaataColumnHeight + noteColumnHeight
												- scheduleStartY;
									}
			
									PDFBuilder.setBackColor(contentStream, Color.WHITE);
			//							PDFBuilder.setLineColor(contentStream, Color.BLACK);
			//							PDFBuilder.setLineColor(contentStream, getHexToDec("FFE5AA"));
									PDFBuilder.setLineColor(contentStream, Color.ORANGE);
									
									PDFBuilder.drawRect(contentStream, startX + oneBerthColumnWidth * (j + 1) + 5,
											scheduleStartY, oneBerthColumnWidth - 10, scheduleEndY, "fill");
			
									float scheduleStartX = startX + oneBerthColumnWidth * (j + 1) + 5;
									float scheduleEndX = scheduleStartX + oneBerthColumnWidth - 10;
			
									PDFBuilder.setBackColor(contentStream, Color.BLACK);
									contentStream.setFont(font, 3);
									dimen = PDFBuilder.dim(font, 3, berthPlanListStore.get(i).getVslCallId());
									// set Vessel sehedule Data
									float mainStartY = startY + etaataColumnHeight + noteColumnHeight;// 제일 밑단
									float mainEnxY = startY + mainHeight + etaataColumnHeight + noteColumnHeight;// 제일 윗단
									// set Vessel sehedule Data
			
									if ((scheduleStartY != mainStartY) || (scheduleStartY + scheduleEndY) > (startY
											+ noteColumnHeight + etaataColumnHeight + (oneDayColumnHeight / 2))) {
										setVesselScheduleData(contentStream, scheduleStartX, scheduleEndX, i, scheduleStartY,
												scheduleEndY, toDateArray, toMonthArray, mainStartY, mainEnxY);
									}
			
								}
							}
						}
					}
				}

				contentStream.close();
				// report save
				String reportPath = AppContextPropertyLoader.properties.getProperty("file.pdf.path");
//				String reportPath = PcsProperties.getProperty("local.report.path");
				File folder = new File(reportPath);
				if (!folder.exists()) {
					folder.mkdirs();
				}

				String uuid = UUID.randomUUID().toString();
				reportFileName = reportPath + "SHIP_IN_PORT_" + uuid + ".PDF";
				returnItem.setFileName("SHIP_IN_PORT_" + uuid + ".PDF");

				doc.save(reportFileName);

				returnItem.setReportFilePath(reportFileName);
			}
			
		} catch (IOException ex) {
			ex.printStackTrace();
			throw new BizException(ex);
		} finally {
			if (doc != null) {
				try {
					doc.close();
				} catch (IOException e) {
					throw new BizException(e);
				}
			}
		}
		return returnItem;
	}

	private Color getHexToDec(String hex) {
		long R, G, B;
		String hexR, hexG, hexB;

		if (hex != null) {
			hexR = hex.substring(0, 2);
			hexG = hex.substring(2, 4);
			hexB = hex.substring(4, 6);

			R = Long.parseLong(hexR, 16);
			G = Long.parseLong(hexG, 16);
			B = Long.parseLong(hexB, 16);
			return new Color(Math.round(R), Math.round(G), Math.round(B));
		} else {
			return new Color(0, 0, 0);
		}
	}

	public String getDateDay(Date date) {
		String day = "";

		Calendar cal = Calendar.getInstance();
		cal.setTime(date);

		int dayNum = cal.get(Calendar.DAY_OF_WEEK);
		switch (dayNum) {
		case 1:
			day = "SUNDAY";
			break;
		case 2:
			day = "MONDAY";
			break;
		case 3:
			day = "TUESDAY";
			break;
		case 4:
			day = "WEDNESDAY";
			break;
		case 5:
			day = "THURSDAY";
			break;
		case 6:
			day = "FRIDAY";
			break;
		case 7:
			day = "SATURDAY";
			break;
		}
		return day;
	}

	private void setVesselScheduleData(PDPageContentStream contentStream, float textStart_X, float textEnd_X,
			int berthPlanListIndex, float scheduleStartY, float scheduleEndY, int toDateArray[], int toMonthArray[],
			float mainStartY, float mainEnxY) throws IOException {
		float[] dimen = null;
		PDFont font = PDType1Font.HELVETICA_BOLD;
		int fontSize = 6;
		String monthEng[] = { "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC" };
		DecimalFormat formatter = new DecimalFormat("###,###");
		int dataGapY = 0;
		
		for (
				int vesselScheduleListIndex = 0;
				vesselScheduleListIndex < vesselScheduleListStore.size();
				vesselScheduleListIndex++
		) {
			
			if (
					berthPlanListStore.get(berthPlanListIndex).getVslCallId()
					.equals(vesselScheduleListStore.get(vesselScheduleListIndex).getVslCallId())
			) {

				System.out.println("(" + vesselScheduleListStore.get(vesselScheduleListIndex).getArrvSaId() + ")");
				// Vessel Name
				
				System.out.println("Is Subset Embedded: " + font.isEmbedded());
				
				contentStream.setFont(font, fontSize);
				dimen = PDFBuilder.dim(
						font,
						fontSize,
						berthPlanListStore.get(vesselScheduleListIndex).getVesselName()
						+ "(" + vesselScheduleListStore.get(vesselScheduleListIndex).getArrvSaId() + ")"
				);
				
				PDFBuilder.text(
						contentStream,
						(textStart_X + textEnd_X) / 2 - dimen[0] / 2,
						(scheduleStartY + scheduleEndY) - dimen[1] + dataGapY,
						berthPlanListStore.get(vesselScheduleListIndex).getVesselName() 
						+ "(" + vesselScheduleListStore.get(vesselScheduleListIndex).getArrvSaId() + ")"
				);
				dataGapY -= fontSize;

				// SA Code / LOA
				/*contentStream.setFont(font, fontSize);
				dimen = PDFBuilder.dim(font, fontSize, vesselScheduleListStore.get(vesselScheduleListIndex).getArrvSaId()
						+ ")" + vesselScheduleListStore.get(vesselScheduleListIndex).getLoa());
				// SA CODE -> ARR 인지 DEP인지 파악후 출력
				PDFBuilder.text(contentStream, (textStart_X + textEnd_X) / 2 - dimen[0] / 2,
						(scheduleStartY + scheduleEndY) - dimen[1] + dataGapY,
						vesselScheduleListStore.get(vesselScheduleListIndex).getArrvSaId() + " / "
								+ vesselScheduleListStore.get(vesselScheduleListIndex).getLoa());
				dataGapY -= fontSize;*/

				// Wharf Mark
				float x = Integer.parseInt(vesselScheduleListStore.get(vesselScheduleListIndex).getWharfMarkFrom())
						+ Float.parseFloat((vesselScheduleListStore.get(vesselScheduleListIndex).getLoa()));
				contentStream.setFont(font, fontSize);
				
				dimen = PDFBuilder.dim(
						font,
						fontSize,
						"(" + vesselScheduleListStore.get(vesselScheduleListIndex).getWharfMarkFrom() + " - " + x + ")"
				);
				
				PDFBuilder.text(
						contentStream,
						(textStart_X + textEnd_X) / 2 - dimen[0] / 2,
						(scheduleStartY + scheduleEndY) - dimen[1]  + dataGapY,
						"(" + vesselScheduleListStore.get(vesselScheduleListIndex).getWharfMarkFrom() + " - " + x + ")"
				);
				dataGapY -= fontSize;

				// Position
				/*String position = "";
				if (berthPlanListStore.get(berthPlanListIndex).getBerthAlongside().equals("P")) {
					position = "P/S";
				} else if (berthPlanListStore.get(berthPlanListIndex).getBerthAlongside().equals("S")) {
					position = "S/B";
				} else if (berthPlanListStore.get(berthPlanListIndex).getBerthAlongside().equals("B")) {
					position = "B";
				} else if (berthPlanListStore.get(berthPlanListIndex).getBerthAlongside().equals("T")) {
					position = "T";
				}
				contentStream.setFont(font, fontSize);
				dimen = PDFBuilder.dim(font, fontSize, position);
				PDFBuilder.text(contentStream, (textStart_X + textEnd_X) / 2 - dimen[0] / 2,
						(scheduleStartY + scheduleEndY) - dimen[1]  + dataGapY, position);
				dataGapY -= fontSize;*/

				// ATA-ATB / ETA-ETB
				VesselScheduleItem oneVesselSchedule = vesselScheduleListStore.get(vesselScheduleListIndex);

				Date oneVesselScheduleArrTime =
						oneVesselSchedule.getAtb() != null
						? oneVesselSchedule.getAtb() : oneVesselSchedule.getEtb() != null
							? oneVesselSchedule.getEtb() : oneVesselSchedule.getEta();
				String arrTimeText =
						oneVesselSchedule.getAtb() != null
						? "ATB" : oneVesselSchedule.getEtb() != null
							? "ETB" : "ETA";

				Date oneVesselScheduleDepTime =
						oneVesselSchedule.getAtu() != null
						? oneVesselSchedule.getAtu() : oneVesselSchedule.getEtu() != null
							? oneVesselSchedule.getEtu() : oneVesselSchedule.getEtd();
				String depTimeText =
						oneVesselSchedule.getAtu() != null
						? "ATU" : oneVesselSchedule.getEtu() != null
							? "ETU" : "ETD";
				
				int arrTimeScheduleMon = Integer.parseInt(new SimpleDateFormat("MM").format(oneVesselScheduleArrTime));
				int arrTimeScheduleDay = Integer.parseInt(new SimpleDateFormat("dd").format(oneVesselScheduleArrTime));
				int arrTimeScheduleHour = Integer.parseInt(new SimpleDateFormat("HH").format(oneVesselScheduleArrTime));
				int arrTimeScheduleMin = Integer.parseInt(new SimpleDateFormat("mm").format(oneVesselScheduleArrTime));

				int depTimeScheduleMon = Integer.parseInt(new SimpleDateFormat("MM").format(oneVesselScheduleDepTime));
				int depTimeScheduleDay = Integer.parseInt(new SimpleDateFormat("dd").format(oneVesselScheduleDepTime));
				int depTimeScheduleHour = Integer.parseInt(new SimpleDateFormat("HH").format(oneVesselScheduleDepTime));
				int depTimeScheduleMin = Integer.parseInt(new SimpleDateFormat("mm").format(oneVesselScheduleDepTime));

				dimen = PDFBuilder.dim(
						font,
						fontSize,
						arrTimeText + " : " + arrTimeScheduleDay + "-" + arrTimeScheduleMon + " "
						+ getDateFormat(arrTimeScheduleHour) + ":" + getDateFormat(arrTimeScheduleMin)
				);
				PDFBuilder.text(
						contentStream,
						(textStart_X + textEnd_X) / 2 - dimen[0] / 2f,
						(scheduleStartY + scheduleEndY) - dimen[1]  + dataGapY,
						arrTimeText + " : " + arrTimeScheduleDay + "-" + arrTimeScheduleMon
								+ " " + getDateFormat(arrTimeScheduleHour) + ":" +  getDateFormat(arrTimeScheduleMin)
				);
				dataGapY -= fontSize;
				
				
				dimen = PDFBuilder.dim(
						font,
						fontSize,
						depTimeText + " : " + arrTimeScheduleDay + "-" + depTimeScheduleMon + " "
						+ getDateFormat(depTimeScheduleHour) + ":" +  getDateFormat(depTimeScheduleMin)
				);
				PDFBuilder.text(
						contentStream,
						(textStart_X + textEnd_X) / 2 - dimen[0] / 2f,
						(scheduleStartY + scheduleEndY) - dimen[1]  + dataGapY,
						depTimeText + " : " + depTimeScheduleDay + "-" + depTimeScheduleMon
								+ " " + getDateFormat(depTimeScheduleHour)+ ":" +  getDateFormat(depTimeScheduleMin)
				);
				dataGapY -= fontSize;


				// ATW - Actual Time of Working
				Date oneVesselScheduleActWrkTime = oneVesselSchedule.getAtw() != null ? oneVesselSchedule.getAtw() : null;
				
				int wrkTimeScheduleMon = oneVesselScheduleActWrkTime != null
						? Integer.parseInt(new SimpleDateFormat("MM").format(oneVesselScheduleActWrkTime)) : 0;
				int wrkTimeScheduleDay = oneVesselScheduleActWrkTime != null
						? Integer.parseInt(new SimpleDateFormat("dd").format(oneVesselScheduleActWrkTime)) : 0;
				int wrkTimeScheduleHour = oneVesselScheduleActWrkTime != null
						? Integer.parseInt(new SimpleDateFormat("HH").format(oneVesselScheduleActWrkTime)) : 0;
				int wrkTimeScheduleMin = oneVesselScheduleActWrkTime != null
						? Integer.parseInt(new SimpleDateFormat("mm").format(oneVesselScheduleActWrkTime)) : 0;
				
				String wrkTimeText = oneVesselSchedule.getAtw() != null
						? "ATW" + " : " + wrkTimeScheduleDay + "-" + wrkTimeScheduleMon
								+ " " + getDateFormat(wrkTimeScheduleHour)+ ":" +  getDateFormat(wrkTimeScheduleMin)
						: "";
				
				dimen = PDFBuilder.dim(
						font,
						fontSize,
						wrkTimeText
				);
				PDFBuilder.text(
						contentStream,
						(textStart_X + textEnd_X) / 2 - dimen[0] / 2f,
						(scheduleStartY + scheduleEndY) - dimen[1]  + dataGapY,
						wrkTimeText
				);
				dataGapY -= fontSize;
				
				
				// ATC - Actual Time of Completion
				Date oneVesselScheduleCompTime = oneVesselSchedule.getAtw() != null ? oneVesselSchedule.getAtw() : null;
				
				int compTimeScheduleMon = oneVesselScheduleActWrkTime != null
						? Integer.parseInt(new SimpleDateFormat("MM").format(oneVesselScheduleCompTime)) : 0;
				int compTimeScheduleDay = oneVesselScheduleActWrkTime != null
						? Integer.parseInt(new SimpleDateFormat("dd").format(oneVesselScheduleCompTime)) : 0;
				int compTimeScheduleHour = oneVesselScheduleActWrkTime != null
						? Integer.parseInt(new SimpleDateFormat("HH").format(oneVesselScheduleCompTime)) : 0;
				int compTimeScheduleMin = oneVesselScheduleActWrkTime != null
						? Integer.parseInt(new SimpleDateFormat("mm").format(oneVesselScheduleCompTime)) : 0;
				
				String compTimeText = oneVesselSchedule.getAtw() != null
						? "ATC" + " : " + arrTimeScheduleDay + "-" + compTimeScheduleMon + " "
								+ getDateFormat(compTimeScheduleHour) + ":" +  getDateFormat(compTimeScheduleMin)
						: "";

				dimen = PDFBuilder.dim(
						font,
						fontSize,
						compTimeText
				);
				PDFBuilder.text(
						contentStream,
						(textStart_X + textEnd_X) / 2 - dimen[0] / 2f,
						(scheduleStartY + scheduleEndY) - dimen[1]  + dataGapY,
						compTimeText
				);
				dataGapY -= fontSize;
				
				
				// LOA
				String loaText = oneVesselSchedule.getLoa() != null ? "LOA: " : "";
				String loa = oneVesselSchedule.getLoa() != null ? oneVesselSchedule.getLoa() : "";
				String arrivalDraftText = oneVesselSchedule.getDrfArrv() != null ? " , ARRIVAL Draft : " : "";
				String drfArrv = oneVesselSchedule.getDrfArrv() != null ? oneVesselSchedule.getDrfArrv() : "";
				
				dimen = PDFBuilder.dim(
						font,
						fontSize,
						loaText + loa + arrivalDraftText + drfArrv
				);
				PDFBuilder.text(
						contentStream,
						(textStart_X + textEnd_X) / 2 - dimen[0] / 2f,
						(scheduleStartY + scheduleEndY) - dimen[1]  + dataGapY,
						loaText + loa + arrivalDraftText + drfArrv
				);
				dataGapY -= fontSize;
				
				
				// DS LD
				String dsText = oneVesselSchedule.getDischCargo() != null ? "DS: " : "";
				String dsCg = oneVesselSchedule.getDischCargo() != null ? oneVesselSchedule.getDischCargo() : "";
				String ldText = oneVesselSchedule.getLoadCargo() != null ? ", LD: " : "";
				String ldCg = oneVesselSchedule.getDischCargo() != null ? oneVesselSchedule.getDischCargo() : "";
				
				dimen = PDFBuilder.dim(
						font,
						fontSize,
						dsText + dsCg + ldText + ldCg
				);
				PDFBuilder.text(
						contentStream,
						(textStart_X + textEnd_X) / 2 - dimen[0] / 2f,
						(scheduleStartY + scheduleEndY) - dimen[1]  + dataGapY,
						dsText + dsCg + ldText + ldCg
				);
				dataGapY -= fontSize;
				
				
				// Steve
				String steveText = oneVesselSchedule.getStevedore() != null ? "Steve: " : "";
				String steve = oneVesselSchedule.getStevedore() != null ? oneVesselSchedule.getStevedore() : "";
				
				dimen = PDFBuilder.dim(
						font,
						fontSize,
						steveText + steve
				);
				PDFBuilder.text(
						contentStream,
						(textStart_X + textEnd_X) / 2 - dimen[0] / 2f,
						(scheduleStartY + scheduleEndY) - dimen[1]  + dataGapY,
						steveText + steve
				);
				dataGapY -= fontSize;
				
				
				// Remarks
				String remarkText = oneVesselSchedule.getRemarks() != null ? "Remark: " : "";
				String remark = oneVesselSchedule.getRemarks() != null ? oneVesselSchedule.getRemarks() : "";
				
				dimen = PDFBuilder.dim(
						font,
						fontSize,
						remarkText + remark
				);
				PDFBuilder.text(
						contentStream,
						(textStart_X + textEnd_X) / 2 - dimen[0] / 2f,
						(scheduleStartY + scheduleEndY) - dimen[1]  + dataGapY,
						remarkText + remark
				);
				dataGapY -= fontSize;
				
				
				List vesselScheduleDatas = (List) vesselScheduleDataListStore.get(vesselScheduleListIndex);
				int vesselScheduleDataCount = vesselScheduleDatas.size();
				BerthPlanItem detailVesselScheduleData = new BerthPlanItem();
				String[] shipNoteNO = new String[vesselScheduleDataCount];
				String[] shipperCode = new String[vesselScheduleDataCount];
				String[] deliveryCode = new String[vesselScheduleDataCount];

				int comodityCount = 0;
				String[] comodityShippingCode = new String[vesselScheduleDataCount];
				String[] comodityDeliberyOrderCode = new String[vesselScheduleDataCount];
				String[] comodityCode = new String[vesselScheduleDataCount];

				String[] equipmentTypeCode = new String[vesselScheduleDataCount];

				String[] megaTrimmingCode = new String[vesselScheduleDataCount];
				String[] megaStevdorCode = new String[vesselScheduleDataCount];

				String[] htachNo = new String[vesselScheduleDataCount];
				double totalDBLoading = 0.0;
				double totalDBDischarging = 0.0f;

				double[] cgWGT = new double[vesselScheduleDataCount];
				String[] blNO = new String[vesselScheduleDataCount];
				double[] wgt = new double[vesselScheduleDataCount];
				double totalCGWGT = 0;
				double totalWGT = 0;
				for (int index = 0; index < vesselScheduleDataCount; index++) {
					detailVesselScheduleData = (BerthPlanItem) vesselScheduleDatas.get(index);
					shipNoteNO[index] = detailVesselScheduleData.getShipgNoteNo();
					cgWGT[index] = detailVesselScheduleData.getCgWgt();
					totalCGWGT += cgWGT[index];

					blNO[index] = detailVesselScheduleData.getBlNo();
					wgt[index] = detailVesselScheduleData.getWgt();
					totalWGT += wgt[index];

					equipmentTypeCode[index] = detailVesselScheduleData.getEqTpCd();

					megaTrimmingCode[index] = detailVesselScheduleData.getTrmgComp();
					megaStevdorCode[index] = detailVesselScheduleData.getStvdComp();

					if (vesselScheduleListStore.get(vesselScheduleListIndex).getOperationType() != null) {
						// operationType -> Loading / Discharging
						if (vesselScheduleListStore.get(vesselScheduleListIndex).getOperationType()
								.equals("Loading and Discharging")) {
							shipperCode[index] = detailVesselScheduleData.getShpr();
							deliveryCode[index] = detailVesselScheduleData.getCnsneecd();
							comodityShippingCode[index] = detailVesselScheduleData.getSnComodityName();
							comodityDeliberyOrderCode[index] = detailVesselScheduleData.getFnComodityName();
						} else if (vesselScheduleListStore.get(vesselScheduleListIndex).getOperationType()
								.equals("Loading Only")) {
							shipperCode[index] = detailVesselScheduleData.getShpr();
							comodityShippingCode[index] = detailVesselScheduleData.getSnComodityName();
						} else if (vesselScheduleListStore.get(vesselScheduleListIndex).getOperationType()
								.equals("Discharging Only")) {
							deliveryCode[index] = detailVesselScheduleData.getCnsneecd();
							comodityDeliberyOrderCode[index] = detailVesselScheduleData.getFnComodityName();
						}
					}

					htachNo[index] = detailVesselScheduleData.getHatchNo();
					if (detailVesselScheduleData.getD_Bloading() != null) {
						totalDBLoading += Double.parseDouble(detailVesselScheduleData.getD_Bloading());
					}
					if (detailVesselScheduleData.getD_Bdischarging() != null) {
						totalDBDischarging += Double.parseDouble(detailVesselScheduleData.getD_Bdischarging());
					}
				}

				shipNoteNO = new HashSet<String>(Arrays.asList(shipNoteNO)).toArray(new String[0]);
				blNO = new HashSet<String>(Arrays.asList(blNO)).toArray(new String[0]);

				// Loading

				/*if (vesselScheduleListStore.get(vesselScheduleListIndex).getLoadCargoQty() != null) {
					if (totalCGWGT != 0) {
						contentStream.setFont(font, fontSize);
						dimen = PDFBuilder.dim(font, fontSize, "L : "
								+ formatter.format(totalCGWGT / (vesselScheduleDataCount / shipNoteNO.length)) + "MT");
						PDFBuilder.text(contentStream, (textStart_X + textEnd_X) / 2 - dimen[0] / 2,
								(scheduleStartY + scheduleEndY) - dimen[1]  + dataGapY,
								"L : " + formatter.format(totalCGWGT / (vesselScheduleDataCount / shipNoteNO.length))
										+ "MT");
						dataGapY -= fontSize;
					}
				}

				// Discharging
				if (vesselScheduleListStore.get(vesselScheduleListIndex).getDischCargoQty() != null) {
					if (totalWGT != 0) {
						contentStream.setFont(font, fontSize);
						dimen = PDFBuilder.dim(font, fontSize,
								"D : " + formatter.format(totalWGT / (vesselScheduleDataCount / blNO.length)) + "MT");
						PDFBuilder.text(contentStream, (textStart_X + textEnd_X) / 2 - dimen[0] / 2,
								(scheduleStartY + scheduleEndY) - dimen[1]  + dataGapY,
								"D : " + formatter.format(totalWGT / (vesselScheduleDataCount / blNO.length)) + "MT");
						dataGapY -= fontSize;
					}
				}
*/
				// Loading->shippersCode
				if (shipperCode != null) {
					shipperCode = new HashSet<String>(Arrays.asList(shipperCode)).toArray(new String[0]);
					String shprCode = new String();
					for (int ds = 0; ds < shipperCode.length; ds++) {
						if (shipperCode[ds] != null) {
							shprCode = shprCode.concat(shipperCode[ds] + " / ");
							dimen = PDFBuilder.dim(font, fontSize, shprCode);
							if (textStart_X + dimen[0] > textEnd_X) {
								PDFBuilder.text(contentStream, (textStart_X + textEnd_X) / 2 - dimen[0] / 2,
										(scheduleStartY + scheduleEndY) - dimen[1]  + dataGapY, shprCode);
								shprCode = "";
								dataGapY -= fontSize;
							}
						}
					}
					PDFBuilder.text(contentStream, (textStart_X + textEnd_X) / 2 - dimen[0] / 2,
							(scheduleStartY + scheduleEndY) - dimen[1]  + dataGapY, shprCode);
					dataGapY -= fontSize;
				}

				// Discharging -> consignee Code
				if (deliveryCode != null) {
					deliveryCode = new HashSet<String>(Arrays.asList(deliveryCode)).toArray(new String[0]);
					String cnsneeCode = new String();
					for (int dc = 0; dc < deliveryCode.length; dc++) {
						if (deliveryCode[dc] != null) {
							cnsneeCode = cnsneeCode.concat(deliveryCode[dc] + " / ");
							dimen = PDFBuilder.dim(font, fontSize, cnsneeCode);
							if (textStart_X + dimen[0] > textEnd_X) {
								PDFBuilder.text(contentStream, (textStart_X + textEnd_X) / 2 - dimen[0] / 2,
										(scheduleStartY + scheduleEndY) - dimen[1]  + dataGapY, cnsneeCode);
								cnsneeCode = "";
								dataGapY -= fontSize;
							}
						}
					}
					PDFBuilder.text(contentStream, (textStart_X + textEnd_X) / 2 - dimen[0] / 2,
							(scheduleStartY + scheduleEndY) - dimen[1]  + dataGapY, cnsneeCode);
					dataGapY -= fontSize;
				}

				if (equipmentTypeCode != null) {
					equipmentTypeCode = new HashSet<String>(Arrays.asList(equipmentTypeCode)).toArray(new String[0]);
					String eqTpCode = new String();
					for (int e = 0; e < equipmentTypeCode.length; e++) {
						if (equipmentTypeCode[e] != null && !equipmentTypeCode[e].equals(" ")) {
							eqTpCode = eqTpCode.concat(equipmentTypeCode[e] + " / ");
							dimen = PDFBuilder.dim(font, fontSize, eqTpCode);
							if (textStart_X + dimen[0] > textEnd_X) {
								PDFBuilder.text(contentStream, (textStart_X + textEnd_X) / 2 - dimen[0] / 2,
										(scheduleStartY + scheduleEndY) - dimen[1]  + dataGapY, eqTpCode);
								eqTpCode = "";
								dataGapY -= fontSize;
							}
						}
					}
					PDFBuilder.text(contentStream, (textStart_X + textEnd_X) / 2 - dimen[0] / 2,
							(scheduleStartY + scheduleEndY) - dimen[1]  + dataGapY, eqTpCode);
					dataGapY -= fontSize;
				}

				if (megaTrimmingCode != null) {
					megaTrimmingCode = new HashSet<String>(Arrays.asList(megaTrimmingCode)).toArray(new String[0]);
					String mgtCode = new String();
					for (int mt = 0; mt < megaTrimmingCode.length; mt++) {
						if (megaTrimmingCode[mt] != null) {
							mgtCode = mgtCode.concat("T : " + megaTrimmingCode[mt] + " / ");
							dimen = PDFBuilder.dim(font, fontSize, mgtCode);
							if (textStart_X + dimen[0] > textEnd_X) {
								PDFBuilder.text(contentStream, (textStart_X + textEnd_X) / 2 - dimen[0] / 2,
										(scheduleStartY + scheduleEndY) - dimen[1]  + dataGapY, mgtCode);
								mgtCode = "";
								dataGapY -= fontSize;
							}
						}
					}
					PDFBuilder.text(contentStream, (textStart_X + textEnd_X) / 2 - dimen[0] / 2,
							(scheduleStartY + scheduleEndY) - dimen[1]  + dataGapY, mgtCode);
					dataGapY -= fontSize;
				}

				if (megaStevdorCode != null) {
					megaStevdorCode = new HashSet<String>(Arrays.asList(megaStevdorCode)).toArray(new String[0]);
					String mgsCode = new String();
					for (int ms = 0; ms < megaStevdorCode.length; ms++) {
						if (megaStevdorCode[ms] != null) {
							mgsCode = mgsCode.concat("G : " + megaStevdorCode[ms] + " / ");
							dimen = PDFBuilder.dim(font, fontSize, mgsCode);
							if (textStart_X + dimen[0] > textEnd_X) {
								PDFBuilder.text(contentStream, (textStart_X + textEnd_X) / 2 - dimen[0] / 2,
										(scheduleStartY + scheduleEndY) - dimen[1]  + dataGapY, mgsCode);
								mgsCode = "";
								dataGapY -= fontSize;
							
							}
						}
					}
					PDFBuilder.text(contentStream, (textStart_X + textEnd_X) / 2 - dimen[0] / 2,
							(scheduleStartY + scheduleEndY) - dimen[1]  + dataGapY, mgsCode);
					dataGapY -= fontSize;
				}

//				//comodity Name
				comodityShippingCode = new HashSet<String>(Arrays.asList(comodityShippingCode)).toArray(new String[0]);
				comodityDeliberyOrderCode = new HashSet<String>(Arrays.asList(comodityDeliberyOrderCode))
						.toArray(new String[0]);
				comodityCount = comodityShippingCode.length + comodityDeliberyOrderCode.length;

				if (comodityShippingCode != null && comodityDeliberyOrderCode != null) {
					comodityCode = new String[comodityCount];
					System.arraycopy(comodityShippingCode, 0, comodityCode, 0, comodityShippingCode.length);
					System.arraycopy(comodityDeliberyOrderCode, 0, comodityCode, comodityShippingCode.length,
							comodityDeliberyOrderCode.length);
				} else if (comodityShippingCode == null) {
					comodityCode = new String[comodityCount];
					System.arraycopy(comodityDeliberyOrderCode, 0, comodityCode, 0, comodityDeliberyOrderCode.length);
				}

				else if (comodityDeliberyOrderCode == null) {
					comodityCode = new String[comodityCount];
					System.arraycopy(comodityShippingCode, 0, comodityCode, 0, comodityShippingCode.length);
				}

				comodityCode = new HashSet<String>(Arrays.asList(comodityCode)).toArray(new String[0]);
				String cmdtCode = new String();
				if (comodityCode != null) {
					for (int c = 0; c < comodityCode.length; c++) {
						if (comodityCode[c] != null) {
							cmdtCode = cmdtCode.concat(comodityCode[c] + " / ");
							
							dimen = PDFBuilder.dim(font, fontSize, cmdtCode);
							if (textStart_X + dimen[0] > textEnd_X) {
								String[] splitedCmdtCode = cmdtCode.split(" ");
								for(int splitIndex = 0; splitIndex<splitedCmdtCode.length;splitIndex++) {
									dimen = PDFBuilder.dim(font, fontSize, splitedCmdtCode[splitIndex]);
									PDFBuilder.text(contentStream, (textStart_X + textEnd_X) / 2 - dimen[0] / 2,
											(scheduleStartY + scheduleEndY) - dimen[1]  + dataGapY, splitedCmdtCode[splitIndex]);
//									cmdtCode = "";
									dataGapY -= fontSize;
								}
							}
						}
					}
							
//							cmdtCode = cmdtCode.concat(comodityCode[c] + " / ");
//							dimen = PDFBuilder.dim(font, fontSize, cmdtCode);
//							if (textStart_X + dimen[0] > textEnd_X) {
//								PDFBuilder.text(contentStream, (textStart_X + textEnd_X) / 2 - dimen[0] / 2,
//										(scheduleStartY + scheduleEndY) - dimen[1]  + dataGapY, cmdtCode);
//								cmdtCode = "";
//								dataGapY -= fontSize;
//							}
//						}
//					}
//					PDFBuilder.text(contentStream, (textStart_X + textEnd_X) / 2 - dimen[0] / 2,
//							(scheduleStartY + scheduleEndY) - dimen[1]  + dataGapY, cmdtCode);
//					dataGapY -= fontSize;
				}

				// OIMRC
				if(vesselScheduleListStore.get(vesselScheduleListIndex).getCargoTp()!=null) {
					if (vesselScheduleListStore.get(vesselScheduleListIndex).getCargoTp().equals("OIMR")) {
						contentStream.setFont(font, fontSize);
						dimen = PDFBuilder.dim(font, fontSize, "OIMRC");
						PDFBuilder.text(contentStream, (textStart_X + textEnd_X) / 2 - dimen[0] / 2,
								(scheduleStartY + scheduleEndY) - dimen[1]  + dataGapY, "OIMRC");
						dataGapY -= fontSize;
					}
				}
				
				int scheduleMonth = Integer.parseInt(new SimpleDateFormat("MM")
						.format(vesselScheduleListStore.get(vesselScheduleListIndex).getEtd()));
				int scheduleDay = Integer.parseInt(new SimpleDateFormat("dd")
						.format(vesselScheduleListStore.get(vesselScheduleListIndex).getEtd()));
				int scheduleHour = Integer.parseInt(new SimpleDateFormat("HH")
						.format(vesselScheduleListStore.get(vesselScheduleListIndex).getEtd()));
				int scheduleMin = Integer.parseInt(new SimpleDateFormat("mm")
						.format(vesselScheduleListStore.get(vesselScheduleListIndex).getEtd()));

				int ETDDataflag = 0;
				for (int j = 0; j < toDateArray.length; j++) {
					if (toDateArray[j] == scheduleDay && toMonthArray[j] == scheduleMonth) {
						ETDDataflag++;
					}
				}

				htachNo = new HashSet<String>(Arrays.asList(htachNo)).toArray(new String[0]);

				contentStream.setFont(font, fontSize);
				if (vesselScheduleListStore.get(vesselScheduleListIndex).getLoadCargoQty() != null) {
					if (totalCGWGT != 0) {
						double totalShippingNoteWegiht = totalCGWGT / (vesselScheduleDataCount / shipNoteNO.length);
						double totalLoadingBalanceWeight = totalDBLoading / (vesselScheduleDataCount / htachNo.length);
						dimen = PDFBuilder.dim(font, fontSize, "Loading Balance : "
								+ formatter.format((totalShippingNoteWegiht - totalLoadingBalanceWeight)) + "MT");
						PDFBuilder.text(contentStream, (textStart_X + textEnd_X) / 2 - dimen[0] / 2,
								(scheduleStartY + scheduleEndY) - dimen[1]  + dataGapY,
								"Loading Balance : "
										+ formatter.format((totalShippingNoteWegiht - totalLoadingBalanceWeight))
										+ "MT");
						dataGapY -= fontSize;
					}

					if (totalCGWGT != 0) {
						double totalForwardWegiht = totalWGT / (vesselScheduleDataCount / blNO.length);
						double totalDischarginBalanceWeight = totalDBDischarging
								/ (vesselScheduleDataCount / htachNo.length);
						dimen = PDFBuilder.dim(font, fontSize, "Discharging Balance : "
								+ formatter.format((totalForwardWegiht - totalDischarginBalanceWeight)) + "MT");
						PDFBuilder.text(contentStream, (textStart_X + textEnd_X) / 2 - dimen[0] / 2,
								(scheduleStartY + scheduleEndY) - dimen[1]  + dataGapY, "Discharging Balance : "
										+ formatter.format((totalForwardWegiht - totalDischarginBalanceWeight)) + "MT");
						dataGapY -= fontSize;
					}
				}

				contentStream.setFont(font, fontSize);
				dimen = PDFBuilder.dim(font, fontSize,
						"ETD : " + scheduleDay + " / " + getDateFormat(scheduleHour) +" : "+ getDateFormat(scheduleMin));
				if (ETDDataflag != 0) {
					PDFBuilder.text(contentStream, (textStart_X + textEnd_X) / 2 - dimen[0] / 2,
							(scheduleStartY + scheduleEndY) - dimen[1] + dataGapY,
							"ETD : " + scheduleDay + " / " + getDateFormat(scheduleHour) +" : "+ getDateFormat(scheduleMin));
					dataGapY -= fontSize;
				} else {
					PDFBuilder.text(contentStream, (textStart_X + textEnd_X) / 2 - dimen[0] / 2,
							(scheduleStartY + scheduleEndY) - dimen[1] + dataGapY,
							"ETD : " + scheduleDay + " / " + monthEng[scheduleMonth - 1]);
					dataGapY -= fontSize;
				}
			}
		}
	}

	private String getDateFormat(int time) {
		String timeText = new String();
		if (time < 10) {
			timeText = "0" + time;
		} else if (time == 0) {
			timeText = "00";
		} else {
			timeText = time + "";
		}
		return timeText;

	}

}
