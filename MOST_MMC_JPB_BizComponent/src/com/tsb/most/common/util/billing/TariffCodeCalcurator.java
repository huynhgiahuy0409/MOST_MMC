package com.tsb.most.common.util.billing;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.biz.dataitem.billing.InvoiceDataItem;
import com.tsb.most.biz.dataitem.billing.TariffCodeGatheredItem;
import com.tsb.most.biz.dataitem.billing.TariffCodeGeneratorItem;
import com.tsb.most.biz.dataitem.billing.TariffCodePayerItem;
import com.tsb.most.biz.dataitem.billing.TariffCodeStroageItem;
import com.tsb.most.biz.dataitem.billing.TariffServiceOrderGatheredItem;
import com.tsb.most.common.constant.BillingConstant;
import com.tsb.most.framework.constants.CommonConstants;
import com.tsb.most.framework.data.util.StringUtil;
import com.tsb.most.framework.dataitem.DataItemList;

public class TariffCodeCalcurator {
	private TariffCodeGeneratorItem targetItem;
	private TariffServiceOrderGatheredItem targetSvcOdrItem;
	private DataItemList payerList;

	private String calMode = BillingConstant.TRF_CAL_MODE_GENERAL_OPERATION_ITEM;

	public TariffCodeCalcurator(TariffCodeGeneratorItem targetItem, DataItemList payerList) {
		this.targetItem = targetItem;
		this.payerList = payerList;

		calMode = BillingConstant.TRF_CAL_MODE_GENERAL_OPERATION_ITEM;

	}

	public TariffCodeCalcurator(TariffServiceOrderGatheredItem targetItem, DataItemList payerList) {
		this.targetSvcOdrItem = targetItem;
		this.payerList = payerList;

		calMode = BillingConstant.TRF_CAL_MODE_SERVICE_ORDER_ITEM;
	}

	public void executeCalcurate() {
		DataItemList invoiceData = new DataItemList();
		DataItemList invoiceList = null;

		if (calMode.equals(BillingConstant.TRF_CAL_MODE_GENERAL_OPERATION_ITEM)) {
			// calcurate tariff code
			invoiceList = targetItem.getTrfBucketList();

			for (int i = 0; i < invoiceList.size(); i++) {
				TariffCodeGatheredItem trfItem = (TariffCodeGatheredItem) invoiceList.get(i);

				if (trfItem.getTrfTpCd().equals(BillingConstant.TRF_TP_CD_CC)) { // modified by Brian (for LAIP,
																					// 2022/09/28)
					if (trfItem.getIvUnit2() != null && trfItem.getIvUnit3() != null) {
						try {
							String eta = targetItem.getEta();
							String etd = targetItem.getEtd();
							String atb = targetItem.getAtb();
							String atu = targetItem.getAtu();
							String trfAmt = trfItem.getUnitPrc();

							double diffHour = 0;

							if (targetItem.getScrId().equals(BillingConstant.PAYTMENT_MODE_PRE_PAID)) {
								Date etaFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(eta);
								Date etdFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(etd);

								if (trfItem.getIvUnit2().equals(BillingConstant.TRF_UNIT2_HRS)) {
									diffHour = (etdFormat.getTime() - etaFormat.getTime()) / (60 * 60 * 1000);
								}
							} else {
								Date atbFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(atb);
								Date atuFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(atu);

								if (trfItem.getIvUnit2().equals(BillingConstant.TRF_UNIT2_HRS)) {
									diffHour = (atuFormat.getTime() - atbFormat.getTime()) / (60 * 60 * 1000);
								}
							}

							String unit2 = String.valueOf(diffHour);
							String unit3 = targetItem.getGrt();
							double totalAmt = diffHour * Double.parseDouble(unit3) * Double.parseDouble(trfAmt);

							trfItem.setUnit2Val(unit2);
							trfItem.setUnit3Val(unit3);
							trfItem.setAplyAmt(String.valueOf(totalAmt));
						} catch (ParseException e) {
							e.printStackTrace();
						}
					}
				} else if (trfItem.getTrfTpCd().equals("BillingConstant.TRF_TP_CD_CH")) { // for LAIP (added by Brian
																						// 2022/09/28)
					if (targetItem.getOpeClass().equals(CodeConstant.MT_CATGTP_E)
							&& trfItem.getOpeMode().equals(CodeConstant.CGMST_TSPT_TP_LR)) {
						String wgt = targetItem.getCgWgtLr();
						String pkgQty = targetItem.getPkgQtyLr();
						String trfAmt = trfItem.getUnitPrc();
						String unit1 = "";
						String unit3 = "";
						double totalAmt = 0;

						if (trfItem.getIvUnit1() != null && trfItem.getIvUnit1().equals(BillingConstant.TRF_UNIT1_MT)) {
							unit1 = wgt;
							totalAmt = Double.parseDouble(unit1) * Double.parseDouble(trfAmt);

							trfItem.setUnit1Val(unit1);
						} else if (trfItem.getIvUnit3() != null
								&& trfItem.getIvUnit3().equals(BillingConstant.TRF_UNIT3_UNT)) {
							unit3 = (pkgQty.equals(null) || pkgQty.equals("0")) ? "1" : pkgQty;
							totalAmt = Double.parseDouble(unit3) * Double.parseDouble(trfAmt);

							trfItem.setUnit3Val(pkgQty);
						}

						trfItem.setAplyAmt(String.valueOf(totalAmt));
					} else if (targetItem.getOpeClass().equals(CodeConstant.MT_CATGTP_E)
							&& trfItem.getOpeMode().equals(CodeConstant.CGMST_TSPT_TP_SE)) {
						String wgt = targetItem.getCgWgtSe();
						String pkgQty = targetItem.getPkgQtySe();
						String trfAmt = trfItem.getUnitPrc();
						String unit1 = "";
						String unit3 = "";
						double totalAmt = 0;

						if (trfItem.getIvUnit1() != null && trfItem.getIvUnit1().equals(BillingConstant.TRF_UNIT1_MT)) {
							unit1 = wgt;
							totalAmt = Double.parseDouble(unit1) * Double.parseDouble(trfAmt);

							trfItem.setUnit1Val(unit1);
						} else if (trfItem.getIvUnit3() != null
								&& trfItem.getIvUnit3().equals(BillingConstant.TRF_UNIT3_UNT)) {
							unit3 = (pkgQty.equals(null) || pkgQty.equals("0")) ? "1" : pkgQty;
							totalAmt = Double.parseDouble(unit3) * Double.parseDouble(trfAmt);

							trfItem.setUnit3Val(pkgQty);
						}

						trfItem.setAplyAmt(String.valueOf(totalAmt));
					} else {
						String wgt = targetItem.getCgWgt();
						String pkgQty = targetItem.getPkgQty();
						String trfAmt = trfItem.getUnitPrc();
						String unit1 = "";
						String unit3 = "";
						double totalAmt = 0;

						if (trfItem.getIvUnit1() != null && trfItem.getIvUnit1().equals(BillingConstant.TRF_UNIT1_MT)) {
							unit1 = wgt;
							totalAmt = Double.parseDouble(unit1) * Double.parseDouble(trfAmt);

							trfItem.setUnit1Val(unit1);
						} else if (trfItem.getIvUnit3() != null
								&& trfItem.getIvUnit3().equals(BillingConstant.TRF_UNIT3_UNT)) {
							unit3 = (pkgQty.equals(null) || pkgQty.equals("0")) ? "1" : pkgQty;
							totalAmt = Double.parseDouble(unit3) * Double.parseDouble(trfAmt);

							trfItem.setUnit3Val(pkgQty);
						}

						trfItem.setAplyAmt(String.valueOf(totalAmt));
					}
				} else if (trfItem.getTrfTpCd().equals("BillingConstant.TRF_TP_CD_HK")) { // for LAIP (added by Brian
																						// 2022/09/28)
					if (targetItem.getOpeClass().equals(CodeConstant.MT_CATGTP_E)
							&& trfItem.getOpeMode().equals(CodeConstant.CGMST_TSPT_TP_LR)) {
						String wgt = targetItem.getCgWgtLr();
						String trfAmt = trfItem.getUnitPrc();
						String unit1 = wgt;

						double totalAmt = Double.parseDouble(unit1) * Double.parseDouble(trfAmt);

						trfItem.setUnit1Val(unit1);
						trfItem.setAplyAmt(String.valueOf(totalAmt));
					} else if (targetItem.getOpeClass().equals(CodeConstant.MT_CATGTP_E)
							&& trfItem.getOpeMode().equals(CodeConstant.CGMST_TSPT_TP_SE)) {
						String wgt = targetItem.getCgWgtSe();
						String trfAmt = trfItem.getUnitPrc();
						String unit1 = wgt;

						double totalAmt = Double.parseDouble(unit1) * Double.parseDouble(trfAmt);

						trfItem.setUnit1Val(unit1);
						trfItem.setAplyAmt(String.valueOf(totalAmt));
					} else {
						String wgt = targetItem.getCgWgt();
						String trfAmt = trfItem.getUnitPrc();
						String unit1 = wgt;

						double totalAmt = Double.parseDouble(unit1) * Double.parseDouble(trfAmt);

						trfItem.setUnit1Val(unit1);
						trfItem.setAplyAmt(String.valueOf(totalAmt));
					}
				} else if (trfItem.getTrfTpCd().equals(BillingConstant.TRF_TP_CD_MN)) { // for LAIP (added by Brian
																						// 2022/09/28)
					String pkgQty = targetItem.getPkgQty();
					String trfAmt = trfItem.getUnitPrc();
					String unit3 = (pkgQty.equals(null) || pkgQty.equals("0")) ? "1" : pkgQty;

					double totalAmt = Double.parseDouble(unit3) * Double.parseDouble(trfAmt);

					trfItem.setUnit3Val(pkgQty);
					trfItem.setAplyAmt(String.valueOf(totalAmt));
				} else if (trfItem.getTrfTpCd().equals(BillingConstant.TRF_TP_CD_BM)) { // for LAIP (added by Brian
																						// 2022/09/28)
					String trfAmt = trfItem.getUnitPrc();
					String unit3 = "2"; // vessel in/out

					if (trfItem.getIvUnit3() != null) {
						trfItem.setUnit3Val(unit3);
					}

					double totalAmt = Double.parseDouble(unit3) * Double.parseDouble(trfAmt);

					trfItem.setAplyAmt(String.valueOf(totalAmt));
				} else if (trfItem.getTrfTpCd().equals(BillingConstant.TRF_TP_CD_LD)) { // for LAIP (added by Brian
																						// 2022/09/28)
					String pkgQty = "2";
					String trfAmt = trfItem.getUnitPrc();
					// need unit2
					String unit3 = pkgQty;

					double totalAmt = Double.parseDouble(unit3) * Double.parseDouble(trfAmt);

					trfItem.setUnit3Val(pkgQty);
					trfItem.setAplyAmt(String.valueOf(totalAmt));
				} else if (trfItem.getTrfTpCd().equals("BillingConstant.TRF_TP_CD_KD")) { // for LAIP (added by Brian
																						// 2022/09/28)
					double totalAmt = 0;
					double cgAmt = 0;
					double cgWgt = 0;
					double cgmsrmt = 0;
					double trfAmt = Double.parseDouble(trfItem.getUnitPrc());

					if (targetItem.getCgWgtLr() != null && !targetItem.getCgWgtLr().equals("0")) {
						targetItem.setCgWgt(targetItem.getCgWgtLr());
					} else if (targetItem.getCgWgtSe() != null && !targetItem.getCgWgtSe().equals("0")) {
						targetItem.setCgWgt(targetItem.getCgWgtSe());
					}

					if (targetItem.getCgMsrmtLr() != null && !targetItem.getCgMsrmtLr().equals("0")) {
						targetItem.setCgMsrmt(targetItem.getCgMsrmtLr());
					} else if (targetItem.getCgMsrmtSe() != null && !targetItem.getCgMsrmtSe().equals("0")) {
						targetItem.setCgMsrmt(targetItem.getCgMsrmtSe());
					}

					if (targetItem.getScrId().equals(BillingConstant.PAYTMENT_MODE_PRE_PAID)) {
						if (targetItem.getBlNo() != null && targetItem.getShipgNoteNo() == null) { // BL
							if (targetItem.getDeliveryType().equals(CodeConstant.MT_DELVTP_I)) {
								cgWgt = Double.parseDouble(targetItem.getCgWgt() != null ? targetItem.getCgWgt() : "0");
								cgmsrmt = Double
										.parseDouble(targetItem.getCgMsrmt() != null ? targetItem.getCgMsrmt() : "0");
							} else {
								cgWgt = Double
										.parseDouble(targetItem.getDocWgt() != null ? targetItem.getDocWgt() : "0");
								cgmsrmt = Double
										.parseDouble(targetItem.getDocMsrmt() != null ? targetItem.getDocMsrmt() : "0");
							}
						} else if (targetItem.getBlNo() == null && targetItem.getShipgNoteNo() != null) { // SN
							cgWgt = Double.parseDouble(targetItem.getDocWgt() != null ? targetItem.getDocWgt() : "0");
							cgmsrmt = Double
									.parseDouble(targetItem.getDocMsrmt() != null ? targetItem.getDocMsrmt() : "0");
						}
					} else {
						cgWgt = Double.parseDouble(targetItem.getCgWgt() != null ? targetItem.getCgWgt() : "0");
						cgmsrmt = Double.parseDouble(targetItem.getCgMsrmt() != null ? targetItem.getCgMsrmt() : "0");
					}

					if (cgWgt > cgmsrmt) {
						cgAmt = cgWgt;
					} else {
						cgAmt = cgmsrmt;
					}

					totalAmt = cgAmt * trfAmt;
					trfItem.setAplyAmt(String.valueOf(totalAmt));
					trfItem.setUnit1Val(String.valueOf(cgAmt));

				} else if (trfItem.getTrfTpCd().equals("BillingConstant.TRF_TP_CD_HB")) { // for LAIP (added by Leslie
																						// 2022/10/25)
					if (targetItem.getOpeClass().equals(CodeConstant.MT_CATGTP_E)
							&& trfItem.getOpeMode().equals(CodeConstant.CGMST_TSPT_TP_LR)) {
						String wgt = targetItem.getCgWgtLr();
						String trfAmt = trfItem.getUnitPrc();
						String unit1 = wgt;

						double totalAmt = Double.parseDouble(unit1) * Double.parseDouble(trfAmt);

						trfItem.setUnit1Val(unit1);
						trfItem.setAplyAmt(String.valueOf(totalAmt));
					} else if (targetItem.getOpeClass().equals(CodeConstant.MT_CATGTP_E)
							&& trfItem.getOpeMode().equals(CodeConstant.CGMST_TSPT_TP_SE)) {
						String wgt = targetItem.getCgWgtSe();
						String trfAmt = trfItem.getUnitPrc();
						String unit1 = wgt;

						double totalAmt = Double.parseDouble(unit1) * Double.parseDouble(trfAmt);

						trfItem.setUnit1Val(unit1);
						trfItem.setAplyAmt(String.valueOf(totalAmt));
					} else {
						String wgt = targetItem.getCgWgt();
						String trfAmt = trfItem.getUnitPrc();
						String unit1 = wgt;

						double totalAmt = Double.parseDouble(unit1) * Double.parseDouble(trfAmt);

						trfItem.setUnit1Val(unit1);
						trfItem.setAplyAmt(String.valueOf(totalAmt));
					}
				} else if (trfItem.getTrfTpCd().equals("BillingConstant.TRF_TP_CD_CG")) { // for LAIP (added by Leslie
																						// 2022/11/01)
					if (targetItem.getOpeClass().equals(CodeConstant.MT_CATGTP_E)
							&& trfItem.getOpeMode().equals(CodeConstant.CGMST_TSPT_TP_LR)) {
						String pkgQty = targetItem.getPkgQtyLr();
						String trfAmt = trfItem.getUnitPrc();
						String unit3 = (pkgQty.equals(null) || pkgQty.equals("0")) ? "1" : pkgQty;

						double totalAmt = Double.parseDouble(unit3) * Double.parseDouble(trfAmt);

						trfItem.setUnit3Val(pkgQty);
						trfItem.setAplyAmt(String.valueOf(totalAmt));
					} else if (targetItem.getOpeClass().equals(CodeConstant.MT_CATGTP_E)
							&& trfItem.getOpeMode().equals(CodeConstant.CGMST_TSPT_TP_SE)) {
						String pkgQty = targetItem.getPkgQtySe();
						String trfAmt = trfItem.getUnitPrc();
						String unit3 = (pkgQty.equals(null) || pkgQty.equals("0")) ? "1" : pkgQty;

						double totalAmt = Double.parseDouble(unit3) * Double.parseDouble(trfAmt);

						trfItem.setUnit3Val(pkgQty);
						trfItem.setAplyAmt(String.valueOf(totalAmt));
					} else {
						String pkgQty = targetItem.getPkgQty();
						String trfAmt = trfItem.getUnitPrc();
						String unit3 = (pkgQty.equals(null) || pkgQty.equals("0")) ? "1" : pkgQty;

						double totalAmt = Double.parseDouble(unit3) * Double.parseDouble(trfAmt);

						trfItem.setUnit3Val(pkgQty);
						trfItem.setAplyAmt(String.valueOf(totalAmt));
					}
				} else if (trfItem.getTrfTpCd().equals("BillingConstant.TRF_TP_CD_TT")) { // for LAIP (added by Leslie
																						// 2022/11/01)
					String pkgQty = targetItem.getPkgQty();
					String trfAmt = trfItem.getUnitPrc();
					String unit3 = (pkgQty.equals(null) || pkgQty.equals("0")) ? "1" : pkgQty;

					double totalAmt = Double.parseDouble(unit3) * Double.parseDouble(trfAmt);

					trfItem.setUnit3Val(pkgQty);
					trfItem.setAplyAmt(String.valueOf(totalAmt));
				} else if (trfItem.getTrfTpCd().equals("BillingConstant.TRF_TP_CD_CM")) { // for LAIP (added by Leslie
																						// 2022/11/01)
					String wgt = targetItem.getCgWgt();
					String pkgQty = targetItem.getPkgQty();
					String trfAmt = trfItem.getUnitPrc();
					String unit1 = wgt;
					String unit3 = (pkgQty.equals(null) || pkgQty.equals("0")) ? "1" : pkgQty;

					double totalAmt = Double.parseDouble(unit1) * Double.parseDouble(unit3)
							* Double.parseDouble(trfAmt);

					trfItem.setUnit1Val(unit1);
					trfItem.setUnit3Val(pkgQty);
					trfItem.setAplyAmt(String.valueOf(totalAmt));
				} else if (trfItem.getTrfTpCd().equals("BillingConstant.TRF_TP_CD_BH")) { // for LAIP (added by Leslie
																						// 2022/11/01)
					if (targetItem.getOpeClass().equals(CodeConstant.MT_CATGTP_E)
							&& trfItem.getOpeMode().equals(CodeConstant.CGMST_TSPT_TP_LR)) {
						String wgt = targetItem.getCgWgtLr();
						String pkgQty = targetItem.getPkgQtyLr();
						String trfAmt = trfItem.getUnitPrc();
						String unit1 = wgt;
						String unit3 = (pkgQty.equals(null) || pkgQty.equals("0")) ? "1" : pkgQty;

						double totalAmt = Double.parseDouble(unit1) * Double.parseDouble(unit3)
								* Double.parseDouble(trfAmt);

						trfItem.setUnit1Val(unit1);
						trfItem.setUnit3Val(pkgQty);
						trfItem.setAplyAmt(String.valueOf(totalAmt));
					} else if (targetItem.getOpeClass().equals(CodeConstant.MT_CATGTP_E)
							&& trfItem.getOpeMode().equals(CodeConstant.CGMST_TSPT_TP_SE)) {
						String wgt = targetItem.getCgWgtSe();
						String pkgQty = targetItem.getPkgQtySe();
						String trfAmt = trfItem.getUnitPrc();
						String unit1 = wgt;
						String unit3 = (pkgQty.equals(null) || pkgQty.equals("0")) ? "1" : pkgQty;

						double totalAmt = Double.parseDouble(unit1) * Double.parseDouble(unit3)
								* Double.parseDouble(trfAmt);

						trfItem.setUnit1Val(unit1);
						trfItem.setUnit3Val(pkgQty);
						trfItem.setAplyAmt(String.valueOf(totalAmt));
					} else {
						String wgt = targetItem.getCgWgt();
						String pkgQty = targetItem.getPkgQty();
						String trfAmt = trfItem.getUnitPrc();
						String unit1 = wgt;
						String unit3 = (pkgQty.equals(null) || pkgQty.equals("0")) ? "1" : pkgQty;

						double totalAmt = Double.parseDouble(unit1) * Double.parseDouble(unit3)
								* Double.parseDouble(trfAmt);

						trfItem.setUnit1Val(unit1);
						trfItem.setUnit3Val(pkgQty);
						trfItem.setAplyAmt(String.valueOf(totalAmt));
					}
				} else if (trfItem.getTrfTpCd().equals("BillingConstant.TRF_TP_CD_KK")) { // for LAIP (added by Leslie
																						// 2022/11/01)
					String wgt = targetItem.getCgWgt();
					String pkgQty = targetItem.getPkgQty();
					String trfAmt = trfItem.getUnitPrc();
					String unit1 = wgt;
					String unit3 = (pkgQty.equals(null) || pkgQty.equals("0")) ? "1" : pkgQty;

					double totalAmt = Double.parseDouble(unit1) * Double.parseDouble(unit3)
							* Double.parseDouble(trfAmt);

					trfItem.setUnit1Val(unit1);
					trfItem.setUnit3Val(pkgQty);
					trfItem.setAplyAmt(String.valueOf(totalAmt));
				} else if (trfItem.getTrfTpCd().equals("BillingConstant.TRF_TP_CD_KI")) { // for LAIP (added by Leslie
																						// 2022/11/01)
					String wgt = targetItem.getCgWgt();
					String trfAmt = trfItem.getUnitPrc();
					String unit1 = wgt;

					double totalAmt = Double.parseDouble(unit1) * Double.parseDouble(trfAmt);

					trfItem.setUnit1Val(unit1);
					trfItem.setAplyAmt(String.valueOf(totalAmt));
				} else if (trfItem.getTrfTpCd().equals("BillingConstant.TRF_TP_CD_HL")) { // for LAIP (added by Leslie
																						// 2022/11/01)
					String wgt = targetItem.getCgWgt();
					String pkgQty = targetItem.getPkgQty();
					String trfAmt = trfItem.getUnitPrc();
					String unit1 = wgt;
					String unit3 = (pkgQty.equals(null) || pkgQty.equals("0")) ? "1" : pkgQty;

					double totalAmt = Double.parseDouble(unit1) * Double.parseDouble(unit3)
							* Double.parseDouble(trfAmt);

					trfItem.setUnit1Val(unit1);
					trfItem.setUnit3Val(pkgQty);
					trfItem.setAplyAmt(String.valueOf(totalAmt));
				} else if (trfItem.getTrfTpCd().equals("BillingConstant.TRF_TP_CD_CN")) { // for LAIP (added by Leslie
																						// 2022/11/17)
					String wgt = targetItem.getCgWgt();
					String pkgQty = targetItem.getPkgQty();
					String trfAmt = trfItem.getUnitPrc();
					String unit1 = wgt;
					String unit3 = (pkgQty.equals(null) || pkgQty.equals("0")) ? "1" : pkgQty;

					double totalAmt = Double.parseDouble(unit1) * Double.parseDouble(unit3)
							* Double.parseDouble(trfAmt);

					trfItem.setUnit1Val(unit1);
					trfItem.setUnit3Val(pkgQty);
					trfItem.setAplyAmt(String.valueOf(totalAmt));
				} else if (trfItem.getTrfTpCd().equals("BillingConstant.TRF_TP_CD_CT")) { // for LAIP (added by Leslie
																						// 2022/11/17)
					String wgt = targetItem.getCgWgt();
					String pkgQty = targetItem.getPkgQty();
					String trfAmt = trfItem.getUnitPrc();
					String unit1 = wgt;
					String unit3 = (pkgQty.equals(null) || pkgQty.equals("0")) ? "1" : pkgQty;

					double totalAmt = Double.parseDouble(unit1) * Double.parseDouble(unit3)
							* Double.parseDouble(trfAmt);

					trfItem.setUnit1Val(unit1);
					trfItem.setUnit3Val(pkgQty);
					trfItem.setAplyAmt(String.valueOf(totalAmt));
				} else if (trfItem.getTrfTpCd().equals("BillingConstant.TRF_TP_CD_DB")) { // for LAIP (added by Leslie
																						// 2022/11/17)
					String wgt = targetItem.getCgWgt();
					String pkgQty = targetItem.getPkgQty();
					String trfAmt = trfItem.getUnitPrc();
					String unit1 = wgt;
					String unit3 = (pkgQty.equals(null) || pkgQty.equals("0")) ? "1" : pkgQty;

					double totalAmt = Double.parseDouble(unit1) * Double.parseDouble(unit3)
							* Double.parseDouble(trfAmt);

					trfItem.setUnit1Val(unit1);
					trfItem.setUnit3Val(pkgQty);
					trfItem.setAplyAmt(String.valueOf(totalAmt));
				} else if (trfItem.getTrfTpCd().equals("BillingConstant.TRF_TP_CD_DV")) { // for LAIP (added by Leslie
																						// 2022/11/17)
					String wgt = "0";
					String pkgQty = targetItem.getPkgQty();
					String trfAmt = trfItem.getUnitPrc();

					if (trfItem.getIvUnit2().equals(BillingConstant.TRF_UNIT1_MT)) {
						wgt = targetItem.getCgWgt();
					} else if (trfItem.getIvUnit2().equals(BillingConstant.TRF_UNIT1_M3)) {
						wgt = targetItem.getCgMsrmt();
					}

					String unit1 = (wgt.equals(null) || wgt.equals("0")) ? "1" : wgt;
					// need unit2
					String unit3 = (pkgQty.equals(null) || pkgQty.equals("0")) ? "1" : pkgQty;

					double totalAmt = Double.parseDouble(unit1) * Double.parseDouble(unit3)
							* Double.parseDouble(trfAmt);

					trfItem.setUnit1Val(wgt);
					trfItem.setUnit3Val(pkgQty);
					trfItem.setAplyAmt(String.valueOf(totalAmt));
				} else if (trfItem.getTrfTpCd().equals("BillingConstant.TRF_TP_CD_KC")) { // for LAIP (added by Leslie
																						// 2022/11/17)
					String wgt = targetItem.getCgWgt();
					String pkgQty = targetItem.getPkgQty();
					String trfAmt = trfItem.getUnitPrc();
					String unit1 = wgt;
					String unit3 = (pkgQty.equals(null) || pkgQty.equals("0")) ? "1" : pkgQty;

					double totalAmt = Double.parseDouble(unit1) * Double.parseDouble(unit3)
							* Double.parseDouble(trfAmt);

					trfItem.setUnit1Val(unit1);
					trfItem.setUnit3Val(pkgQty);
					trfItem.setAplyAmt(String.valueOf(totalAmt));
				} else if (trfItem.getTrfTpCd().equals("BillingConstant.TRF_TP_CD_NH")) { // for LAIP (added by Leslie
																						// 2022/11/17)
					String pkgQty = targetItem.getPkgQty();
					String trfAmt = trfItem.getUnitPrc();
					String unit3 = (pkgQty.equals(null) || pkgQty.equals("0")) ? "1" : pkgQty;

					double totalAmt = Double.parseDouble(unit3) * Double.parseDouble(trfAmt);

					trfItem.setUnit3Val(pkgQty);
					trfItem.setAplyAmt(String.valueOf(totalAmt));
				} else if (trfItem.getTrfTpCd().equals("BillingConstant.TRF_TP_CD_KH")) { // for LAIP (added by Leslie
																						// 2022/12/30)
					if (targetItem.getOpeClass().equals(CodeConstant.MT_CATGTP_E)
							&& trfItem.getOpeMode().equals(CodeConstant.CGMST_TSPT_TP_LR)) {
						String wgt = targetItem.getCgWgtLr();
						String pkgQty = targetItem.getPkgQtyLr();
						String trfAmt = trfItem.getUnitPrc();
						String unit1 = "";
						String unit3 = "";
						double totalAmt = 0;

						if (trfItem.getIvUnit1() != null && trfItem.getIvUnit1().equals(BillingConstant.TRF_UNIT1_MT)) {
							unit1 = wgt;
							totalAmt = Double.parseDouble(unit1) * Double.parseDouble(trfAmt);

							trfItem.setUnit1Val(unit1);
						} else if (trfItem.getIvUnit3() != null
								&& trfItem.getIvUnit3().equals(BillingConstant.TRF_UNIT3_UNT)) {
							unit3 = (pkgQty.equals(null) || pkgQty.equals("0")) ? "1" : pkgQty;
							totalAmt = Double.parseDouble(unit3) * Double.parseDouble(trfAmt);

							trfItem.setUnit3Val(pkgQty);
						}

						trfItem.setAplyAmt(String.valueOf(totalAmt));
					} else if (targetItem.getOpeClass().equals(CodeConstant.MT_CATGTP_E)
							&& trfItem.getOpeMode().equals(CodeConstant.CGMST_TSPT_TP_SE)) {
						String wgt = targetItem.getCgWgtSe();
						String pkgQty = targetItem.getPkgQtySe();
						String trfAmt = trfItem.getUnitPrc();
						String unit1 = "";
						String unit3 = "";
						double totalAmt = 0;

						if (trfItem.getIvUnit1() != null && trfItem.getIvUnit1().equals(BillingConstant.TRF_UNIT1_MT)) {
							unit1 = wgt;
							totalAmt = Double.parseDouble(unit1) * Double.parseDouble(trfAmt);

							trfItem.setUnit1Val(unit1);
						} else if (trfItem.getIvUnit3() != null
								&& trfItem.getIvUnit3().equals(BillingConstant.TRF_UNIT3_UNT)) {
							unit3 = (pkgQty.equals(null) || pkgQty.equals("0")) ? "1" : pkgQty;
							totalAmt = Double.parseDouble(unit3) * Double.parseDouble(trfAmt);

							trfItem.setUnit3Val(pkgQty);
						}

						trfItem.setAplyAmt(String.valueOf(totalAmt));
					} else {
						String wgt = targetItem.getCgWgt();
						String pkgQty = targetItem.getPkgQty();
						String trfAmt = trfItem.getUnitPrc();
						String unit1 = "";
						String unit3 = "";
						double totalAmt = 0;

						if (trfItem.getIvUnit1() != null && trfItem.getIvUnit1().equals(BillingConstant.TRF_UNIT1_MT)) {
							unit1 = wgt;
							totalAmt = Double.parseDouble(unit1) * Double.parseDouble(trfAmt);

							trfItem.setUnit1Val(unit1);
						} else if (trfItem.getIvUnit3() != null
								&& trfItem.getIvUnit3().equals(BillingConstant.TRF_UNIT3_UNT)) {
							unit3 = (pkgQty.equals(null) || pkgQty.equals("0")) ? "1" : pkgQty;
							totalAmt = Double.parseDouble(unit3) * Double.parseDouble(trfAmt);

							trfItem.setUnit3Val(pkgQty);
						}

						trfItem.setAplyAmt(String.valueOf(totalAmt));
					}
				}
				// MMC-OS
				else if(trfItem.getTrfTpCd().equals(BillingConstant.TRF_TP_CD_OS)) {
					if(trfItem.getIvUnit1()!=null && trfItem.getIvUnit1().equals(BillingConstant.TRF_UNIT1_RTON)) {
						if(trfItem.getIvUnit2() != null && trfItem.getIvUnit2().equals(BillingConstant.TRF_UNIT2_DAY)) {
							BigDecimal totalAmt = new BigDecimal("0");
							BigDecimal cgAmt= new BigDecimal("0");
							BigDecimal cgWgt= new BigDecimal("0");
							BigDecimal cgmsrmt= new BigDecimal("0");
							
							if("DOC".equals(targetItem.getSearchType())) {
								cgWgt = new BigDecimal(targetItem.getDocWgt()!= null? targetItem.getDocWgt():"0");
								cgmsrmt = new BigDecimal(targetItem.getDocMsrmt()!= null? targetItem.getDocMsrmt():"0");
							}else {
								cgWgt = new BigDecimal(targetItem.getCgWgt()!= null? targetItem.getCgWgt():"0");
								cgmsrmt = new BigDecimal(targetItem.getCgMsrmt()!= null? targetItem.getCgMsrmt():"0");
							}
							
							//get amount
							BigDecimal billwgt = new BigDecimal(targetItem.getBillWgt() != null? targetItem.getBillWgt():"0");
							BigDecimal trfAmt =  new BigDecimal(trfItem.getUnitPrc()); 
							
							if(billwgt.compareTo(new BigDecimal("0")) == 1) {	// billwgt > 0
								cgAmt = billwgt;
							}else {
								if(cgWgt.compareTo(cgmsrmt) == 1) { // cgWgt > cgmsrmt
									cgAmt = cgWgt;
								}else {
									cgAmt = cgmsrmt;
								}
							}
							
							TariffCodeStroageItem freeStorageDayItem = trfItem.getFreeStorageDays();
							TariffCodeStroageItem storageDayItem  = trfItem.getStorageDays();

							int storageDays = 0;
							
							int freeDays = Integer.parseInt(freeStorageDayItem.getFreeDays()==null?"0":freeStorageDayItem.getFreeDays());
							int diffDays = Integer.parseInt(storageDayItem.getDaydiff()==null?"0":storageDayItem.getDaydiff());
							
							storageDays = diffDays - freeDays;
							
							if(freeStorageDayItem.getHolidaysYn() != null && freeStorageDayItem.getHolidaysYn().equals(CommonConstants.Y)) {
								int holidays = Integer.parseInt(freeStorageDayItem.getHolidays());
								storageDays = storageDays - holidays;
							}
							
							
							trfItem.setUnit1Val(String.valueOf(cgAmt));
							trfItem.setUnit2Val(String.valueOf(storageDays));
							
							totalAmt = cgAmt.multiply(trfAmt.multiply(BigDecimal.valueOf(storageDays)));
							trfItem.setAplyAmt(String.valueOf(totalAmt));
						}
					} else if(trfItem.getIvUnit3()!=null && trfItem.getIvUnit3().equals(BillingConstant.TRF_UNIT3_VHC)) {
						//RORO
						BigDecimal pkgQty= new BigDecimal(targetItem.getPkgQty());
						BigDecimal trfAmt= new BigDecimal(trfItem.getUnitPrc());
						BigDecimal totalAmt = new BigDecimal("0");
						
						int storageDays = Integer.parseInt(trfItem.getUnit2Val());
						trfItem.setUnit3Val(String.valueOf(pkgQty));
						trfItem.setUnit2Val(String.valueOf(storageDays));
						
						totalAmt = pkgQty.multiply(trfAmt.multiply(BigDecimal.valueOf(storageDays)));
						trfItem.setAplyAmt(String.valueOf(totalAmt));
					} else {
						trfItem.setAplyAmt("0");
					}			
				}
				// MMC-HG
				else if (trfItem.getTrfTpCd().equals(BillingConstant.TRF_TP_CD_HG)) { // Handling Goods at Dry-bulk
																						// Terminal

					if (!StringUtil.isNull(trfItem.getIvUnit1())) {

						if (trfItem.getIvUnit1().equals(BillingConstant.TRF_UNIT1_TEU)) {

						} else if (trfItem.getIvUnit1().equals(BillingConstant.TRF_UNIT1_MTR)) {

						} else if (trfItem.getIvUnit1().equals(BillingConstant.TRF_UNIT1_RTON)) {

							BigDecimal totalAmt = new BigDecimal("0");
							BigDecimal cgAmt = new BigDecimal("0");
							BigDecimal cgWgt = new BigDecimal("0");
							BigDecimal cgmsrmt = new BigDecimal("0");
							BigDecimal trfAmt = new BigDecimal(trfItem.getUnitPrc());

							if ("DOC".equals(targetItem.getSearchType())) {
								cgWgt = new BigDecimal(targetItem.getDocWgt() != null ? targetItem.getDocWgt() : "0");
								cgmsrmt = new BigDecimal(
										targetItem.getDocMsrmt() != null ? targetItem.getDocMsrmt() : "0");

							} else {
								cgWgt = new BigDecimal(targetItem.getCgWgt());
								cgmsrmt = new BigDecimal(targetItem.getCgMsrmt());
							}

							if (cgWgt.compareTo(cgmsrmt) == 1) { // cgWgt > cgmsrmt
								cgAmt = cgWgt;
							} else {
								cgAmt = cgmsrmt;
							}

							totalAmt = cgAmt.multiply(trfAmt);
							trfItem.setAplyAmt(String.valueOf(totalAmt));
							trfItem.setUnit1Val(String.valueOf(cgAmt));

						} else if (trfItem.getIvUnit1().equals(BillingConstant.TRF_UNIT1_M2)) {

						} else if (trfItem.getIvUnit1().equals(BillingConstant.TRF_UNIT1_MT)) {

							BigDecimal totalAmt = new BigDecimal("0");
							BigDecimal cgAmt = new BigDecimal("0");
							BigDecimal cgWgt = new BigDecimal("0");
							BigDecimal trfAmt = new BigDecimal(trfItem.getUnitPrc());

							if ("DOC".equals(targetItem.getSearchType())) {
								cgWgt = new BigDecimal(targetItem.getDocWgt() != null ? targetItem.getDocWgt() : "0");
							} else {
								cgWgt = new BigDecimal(targetItem.getCgWgt());
							}

							cgAmt = cgWgt;

							totalAmt = cgAmt.multiply(trfAmt);
							trfItem.setAplyAmt(String.valueOf(totalAmt));
							trfItem.setUnit1Val(String.valueOf(cgAmt));

						} else if (trfItem.getIvUnit1().equals(BillingConstant.TRF_UNIT1_M3)) {

							BigDecimal totalAmt = new BigDecimal("0");
							BigDecimal cgAmt = new BigDecimal("0");
							BigDecimal cgmsrmt = new BigDecimal("0");
							BigDecimal trfAmt = new BigDecimal(trfItem.getUnitPrc());

							if ("DOC".equals(targetItem.getSearchType())) {
								cgmsrmt = new BigDecimal(
										targetItem.getDocMsrmt() != null ? targetItem.getDocMsrmt() : "0");

							} else {
								cgmsrmt = new BigDecimal(targetItem.getCgMsrmt());
							}

							cgAmt = cgmsrmt;

							totalAmt = cgAmt.multiply(trfAmt);
							trfItem.setAplyAmt(String.valueOf(totalAmt));
							trfItem.setUnit1Val(String.valueOf(cgAmt));

						} else if (trfItem.getIvUnit1().equals(BillingConstant.TRF_UNIT1_LOA)) {

						}

					} else if (!StringUtil.isNull(trfItem.getIvUnit3())) {

						if (trfItem.getIvUnit3().equals(BillingConstant.TRF_UNIT3_UNT)) {
							trfItem.setAplyAmt("0");
						} else if (trfItem.getIvUnit3().equals(BillingConstant.TRF_UNIT3_CAS)) {

						} else if (trfItem.getIvUnit3().equals(BillingConstant.TRF_UNIT3_HED)) {

							BigDecimal pkgQty = new BigDecimal(targetItem.getPkgQty());
							BigDecimal trfAmt = new BigDecimal(trfItem.getUnitPrc());

							BigDecimal totalAmt = pkgQty.multiply(trfAmt);

							trfItem.setAplyAmt(String.valueOf(totalAmt));
							trfItem.setUnit3Val(String.valueOf(pkgQty));

						} else if (trfItem.getIvUnit3().equals(BillingConstant.TRF_UNIT3_OVH)) {

						} else if (trfItem.getIvUnit3().equals(BillingConstant.TRF_UNIT3_VHC)) {

							BigDecimal pkgQty = new BigDecimal(targetItem.getPkgQty());
							BigDecimal trfAmt = new BigDecimal(trfItem.getUnitPrc());

							BigDecimal totalAmt = pkgQty.multiply(trfAmt);

							trfItem.setAplyAmt(String.valueOf(totalAmt));
							trfItem.setUnit3Val(String.valueOf(pkgQty));

						} else if (trfItem.getIvUnit3().equals(BillingConstant.TRF_UNIT3_PSN)) {

						}
					}
				}
				double aplyAmt = Double.parseDouble(
						trfItem.getAplyAmt() != null && trfItem.getAplyAmt().length() > 0 ? trfItem.getAplyAmt() : "0");

				if (aplyAmt > 0) {
					double gstAmt = aplyAmt
							* (Double.parseDouble(trfItem.getGstRate() == null ? "0" : trfItem.getGstRate()) / 100);
					trfItem.setGstAmt(String.valueOf(gstAmt));
					trfItem.setTotalAmt(String.valueOf(aplyAmt + gstAmt));

					invoiceData.add(this.makeInvoiceData(targetItem, trfItem));
				}

			}

			targetItem.setInvoiceList(invoiceData);

		} else if (calMode.equals(BillingConstant.TRF_CAL_MODE_SERVICE_ORDER_ITEM)) {
			// calcurate tariff code
			invoiceList = targetSvcOdrItem.getTrfBucketList();

			for (int i = 0; i < invoiceList.size(); i++) {
				TariffCodeGatheredItem trfItem = (TariffCodeGatheredItem) invoiceList.get(i);

				if (trfItem.getTrfTpCd().equals("BillingConstant.TRF_TP_CD_SO")) {
					String unit1 = targetSvcOdrItem.getComUnit();
					String unit2 = targetSvcOdrItem.getComUnit1();
					String unit3 = targetSvcOdrItem.getComUnit2();
					String trfAmt = trfItem.getUnitPrc();
					double totalAmt = 1;

					if (unit1 != null && !unit1.equals("0")) {
						totalAmt *= Double.parseDouble(unit1);
					}

					if (unit2 != null && !unit2.equals("0")) {
						totalAmt *= Double.parseDouble(unit2);
					}

					if (unit3 != null && !unit3.equals("0")) {
						totalAmt *= Double.parseDouble(unit3);
					}

					totalAmt *= Double.parseDouble(trfAmt);

					trfItem.setUnit1Val(unit1);
					trfItem.setUnit2Val(unit2);
					trfItem.setUnit3Val(unit3);
					trfItem.setAplyAmt(String.valueOf(totalAmt));
				}

				double aplyAmt = Double.parseDouble(
						trfItem.getAplyAmt() != null && trfItem.getAplyAmt().length() > 0 ? trfItem.getAplyAmt() : "0");

				if (aplyAmt > 0) {
					double gstAmt = aplyAmt
							* (Double.parseDouble(trfItem.getGstRate() == null ? "0" : trfItem.getGstRate()) / 100);
					trfItem.setGstAmt(String.valueOf(gstAmt));
					trfItem.setTotalAmt(String.valueOf(aplyAmt + gstAmt));

					invoiceData.add(this.makeInvoiceData(targetSvcOdrItem, trfItem));
				}
			}

			targetSvcOdrItem.setInvoiceList(invoiceData);
		}

	}

	private InvoiceDataItem makeInvoiceData(TariffServiceOrderGatheredItem targetItem, TariffCodeGatheredItem trfItem) {
		InvoiceDataItem invItem = new InvoiceDataItem();

		invItem.setTrfCd(trfItem.getTrfCd());
		invItem.setSubTrfCd(trfItem.getSubTrfCd());
		invItem.setBillTpCd(trfItem.getBillTpCd());
		invItem.setTrfDescr(trfItem.getDescr());
		invItem.setTrfTpCd(trfItem.getTrfTpCd());
		invItem.setStatCd(BillingConstant.DATA_GATHER_STATUS_GATHERD);
		invItem.setAplyRate(trfItem.getUnitPrc());
		invItem.setStdRate(trfItem.getStdRate());
		invItem.setAplyAmt(trfItem.getAplyAmt());
		invItem.setUserId(targetItem.getUserId());
		invItem.setVslCallId(targetItem.getVslCallId());

		invItem.setScrId(targetItem.getScrId());
		invItem.setRefNo(targetItem.getOdrNo());
		invItem.setUnit1Val(trfItem.getUnit1Val());
		invItem.setUnit2Val(trfItem.getUnit2Val());
		invItem.setUnit3Val(trfItem.getUnit3Val());
		invItem.setRefNo2(targetItem.getVslCallId());
		// invItem.setRefNo4(targetItem.getRefNo4());
		// invItem.setCostCentCd(trfItem.getCostCentCd());
		// invItem.setFinancialCode(trfItem.getFinancialCode());

		invItem.setPayer(targetItem.getPayer());
		invItem.setSvcDtFrom(trfItem.getSvcDtFrom());
		invItem.setSvcDtTo(trfItem.getSvcDtTo());
		invItem.setIvPrfx(targetItem.getIvPrfx());

		invItem.setGstType(trfItem.getGstTpCd());
		invItem.setGstPercent(trfItem.getGstRate());
		invItem.setGstAmt(trfItem.getGstAmt());
		invItem.setTotalAmt(trfItem.getTotalAmt());
		invItem.setPayerTpCd(trfItem.getPayer());

		return invItem;
	}

	private InvoiceDataItem makeInvoiceData(TariffCodeGeneratorItem targetItem, TariffCodeGatheredItem trfItem) {
		InvoiceDataItem invItem = new InvoiceDataItem();

		invItem.setTrfCd(trfItem.getTrfCd());
		invItem.setSubTrfCd(trfItem.getSubTrfCd());
		invItem.setBillTpCd(trfItem.getBillTpCd());
		invItem.setTrfDescr(trfItem.getDescr());
		invItem.setTrfTpCd(trfItem.getTrfTpCd());
		invItem.setStatCd(BillingConstant.DATA_GATHER_STATUS_GATHERD);
		invItem.setAplyRate(trfItem.getUnitPrc());
		invItem.setStdRate(trfItem.getStdRate());
		invItem.setAplyAmt(trfItem.getAplyAmt());
		invItem.setUserId(targetItem.getUserId());
		invItem.setVslCallId(targetItem.getVslCallId());

		invItem.setScrId(targetItem.getScrId());
		invItem.setAdhocYn(targetItem.getAdhocYn());
		invItem.setRefNo(targetItem.getRefNo());
		invItem.setUnit1Val(trfItem.getUnit1Val());
		invItem.setUnit2Val(trfItem.getUnit2Val());
		invItem.setUnit3Val(trfItem.getUnit3Val());
		invItem.setRefNo2(targetItem.getRefNo2());
		invItem.setRefNo4(targetItem.getRefNo4());
		invItem.setCostCentCd(trfItem.getCostCentCd());
		invItem.setFinancialCode(trfItem.getFinancialCode());
		invItem.setCgNo(targetItem.getCgNo());
		invItem.setJobNo(targetItem.getJobNo());

		invItem.setSvcDtFrom(trfItem.getSvcDtFrom());
		invItem.setSvcDtTo(trfItem.getSvcDtTo());
		invItem.setIvPrfx(targetItem.getIvPrfx());

		invItem.setGstType(trfItem.getGstTpCd());
		invItem.setGstPercent(trfItem.getGstRate());
		invItem.setGstAmt(trfItem.getGstAmt());
		invItem.setTotalAmt(trfItem.getTotalAmt());
		invItem.setPayerTpCd(trfItem.getPayer());
		
		//MMC
		invItem.setExpectedDeliveryDay(targetItem.getExpectedDeliveryDay());
		invItem.setApplyFreeDays(targetItem.getApplyFreeDays());

		if (targetItem.getScrId() != null && targetItem.getScrId().equals(BillingConstant.PAYTMENT_MODE_PRE_PAID)) {
			invItem.setIvPrfx("PFI");
		}

		DataItemList payerItemList = getPayerList(targetItem, trfItem);

		if (payerItemList.size() == 0) {
			if (trfItem.getPayer().equals(CodeConstant.CM_PTNRTP_SHA)) {
				invItem.setPayer(targetItem.getShipgAgnt());

			} else if (trfItem.getPayer().equals(CodeConstant.CM_PTNRTP_FWD)) {
				invItem.setPayer(targetItem.getFwrAgent());

			} else if (trfItem.getPayer().equals(CodeConstant.CM_PTNRTP_CNS)) {
				if (targetItem.getOpeClass().equals(CodeConstant.MT_CATGTP_E)) {
					invItem.setPayer(targetItem.getShpr());
				} else {
					invItem.setPayer(targetItem.getCnsne());
				}
			}
		} else { // invoice advice
			TariffCodePayerItem payerItem = (TariffCodePayerItem) payerItemList.get(0);
			invItem.setPayer(payerItem.getPtnrCd());
		}

		return invItem;
	}

	private DataItemList getPayerList(TariffCodeGeneratorItem targetItem, TariffCodeGatheredItem trfItem) {
		String vslCallId = targetItem.getVslCallId();
		DataItemList rtnList = new DataItemList();

		for (int i = 0; i < payerList.size(); i++) {
			TariffCodePayerItem payItem = (TariffCodePayerItem) payerList.get(i);

			if (payItem.getVslCallId().equals(vslCallId) && payItem.getTrfTpCd().equals(trfItem.getTrfTpCd())
					&& payItem.getOpeTpCd().equals(targetItem.getOpeClass())
					&& ((payItem.getBlNp() != null && payItem.getBlNp().equals(targetItem.getBlNo())
							&& CodeConstant.MT_CATGTP_I.equals(payItem.getOpeTpCd()))
							|| (payItem.getShipgNoteNo() != null
									&& payItem.getShipgNoteNo().equals(targetItem.getShipgNoteNo())
									&& CodeConstant.MT_CATGTP_E.equals(payItem.getOpeTpCd()))
							|| (payItem.getBlNp() == null && payItem.getShipgNoteNo() == null))) {

				rtnList.add(payItem);
			}
		}

		return rtnList;
	}
}
