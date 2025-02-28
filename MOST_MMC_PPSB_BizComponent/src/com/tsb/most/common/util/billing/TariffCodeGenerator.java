package com.tsb.most.common.util.billing;

import java.lang.reflect.Method;
import java.util.ArrayList;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.biz.dataitem.billing.TariffCodeConditionItem;
import com.tsb.most.biz.dataitem.billing.TariffCodeGatheredItem;
import com.tsb.most.biz.dataitem.billing.TariffCodeGeneratorItem;
import com.tsb.most.biz.dataitem.billing.TariffCodeStroageItem;
import com.tsb.most.biz.dataitem.billing.TariffServiceOrderGatheredItem;
import com.tsb.most.common.constant.BillingConstant;
import com.tsb.most.framework.constants.CommonConstants;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class TariffCodeGenerator {

	// Tariff code list
	private DataItemList tariffCodeList;
	private DataItemList distinctTariffCodList;

	private String mode; // S: Standard , P : package

	public TariffCodeGenerator() throws BizException {
		throw new BizException("SYS001", "Can't Initialize TariffGenerator");
	}

	public TariffCodeGenerator(String pGenMode, DataItemList pTariffList) {
		tariffCodeList = pTariffList;
		distinctTariffCodList = new DataItemList();

		int idx = 0;
		for (int i = 0; i < tariffCodeList.size(); i++) {
			TariffCodeGatheredItem tItem = (TariffCodeGatheredItem) tariffCodeList.get(i);

			if (i == 0) {
				distinctTariffCodList.add(tItem);
				idx = 1;
			} else {
				String sTrfCd = ((TariffCodeGatheredItem) distinctTariffCodList.get(idx - 1)).getTrfCd();
				String sSubTrfCd = ((TariffCodeGatheredItem) distinctTariffCodList.get(idx - 1)).getSubTrfCd();

				if (!(sTrfCd.equals(tItem.getTrfCd()) && sSubTrfCd.equals(tItem.getSubTrfCd()))) {
					distinctTariffCodList.add(tItem);
					idx++;
				}
			}
		}
	}

	public boolean executeTariff(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condItem,
			TariffCodeGeneratorItem reqItem) throws BizException {
		String methodName = "exeTrf" + condItem.getPrptCd();
		Boolean bool = null;
		Method[] methods = this.getClass().getMethods();
		Object[] params = new Object[] { trfItem, condItem, reqItem };

		try {
			for (int i = 0; i < methods.length; i++) {
				if (methods[i].getName().equals(methodName)) {
					bool = (Boolean) methods[i].invoke(this, params);
					return bool.booleanValue();
				}
			}
		} catch (Exception e) {
			throw new BizException(e);
		}
		return false;
	}

	public boolean executeTariff(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condItem,
			TariffServiceOrderGatheredItem reqItem) throws BizException {
		String methodName = "exeTrf" + condItem.getPrptCd();
		String parameterName = "com.tsb.most.biz.dataitem.billing.TariffServiceOrderGatheredItem";
		Boolean bool = null;

		Method[] methods = this.getClass().getMethods();
		Object[] params = new Object[] { trfItem, condItem, reqItem };

		try {
			for (int i = 0; i < methods.length; i++) {
				if (methods[i].getName().equals(methodName)) {
					if (methods[i].getParameters()[2].getParameterizedType().getTypeName().equals(parameterName)) {
						bool = (Boolean) methods[i].invoke(this, params);
						return bool.booleanValue();
					} else {
						return true;
					}
				}
			}
		} catch (Exception e) {
			throw new BizException(e);
		}
		return false;
	}

	// LOA
	public boolean exeTrfV1(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		TariffCodeGatheredItem[] trfItemList = null;
		boolean flag = false;
		
		if (item.getLoa() == null) {
			flag = false;

		} else {
			float tLoa = Float.parseFloat(item.getLoa());
			int targetLoa = (int) (tLoa + 0.99);

			trfItemList = this.getTariffCodeValueList(condition);

			for (int i = 0; i < trfItemList.length; i++) {
				if (trfItemList[i].getTierVal1() != null && trfItemList[i].getTierVal1().length() > 0) {
					float grt = Float.parseFloat(trfItemList[i].getTierVal1());
					if (targetLoa >= (int) grt) {
						flag = true;
					} else {
						return false;
					}
				}

				if (trfItemList[i].getTierVal2() != null && trfItemList[i].getTierVal2().length() > 0) {
					float grt = Float.parseFloat(trfItemList[i].getTierVal2());
					if (targetLoa <= (int) grt) {
						flag = true;
					} else {
						return false;
					}
				}
			}
		}

		return flag;

	}

	// purpose of call
	public boolean exeTrfV2(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		TariffCodeGatheredItem[] trfItemList = null;
		boolean flag = false;

		if (item.getPurpCallCd() == null) {
			flag = false;

		} else {
			trfItemList = this.getTariffCodeValueList(condition);

			for (int i = 0; i < trfItemList.length; i++) {
				if (trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_EQUAL)
						|| trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_INCLUDE)) {

					if (trfItemList[i].getChrVal() != null) {
						if (item.getPurpCallCd() != null && item.getPurpCallCd().equals(trfItemList[i].getChrVal())) {
							flag = true;
							break;
						}
					}
				}
			}
		}

		return flag;
	}

	// Vessel Type
	public boolean exeTrfV3(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		TariffCodeGatheredItem[] trfItemList = null;
		boolean flag = false;

		if (item.getVslTp() == null) {
			flag = false;

		} else {
			trfItemList = this.getTariffCodeValueList(condition);

			for (int i = 0; i < trfItemList.length; i++) {
				if (trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_EQUAL)
						|| trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_INCLUDE)) {

					if (trfItemList[i].getChrVal() != null) {
						if (item.getVslTp() != null && item.getVslTp().equals(trfItemList[i].getChrVal())) {
							flag = true;
							break;
						}
					}
				}
			}
		}

		return flag;
	}

	// Trade Type
	public boolean exeTrfV4(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		TariffCodeGatheredItem[] trfItemList = null;
		boolean flag = false;

		if (item.getTradeTp() == null) {
			flag = false;

		} else {
			trfItemList = this.getTariffCodeValueList(condition);

			for (int i = 0; i < trfItemList.length; i++) {
				if (trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_EQUAL)
						|| trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_INCLUDE)) {

					if (trfItemList[i].getChrVal() != null) {
						if (item.getTradeTp().equals(trfItemList[i].getChrVal())) {
							flag = true;
							break;
						}
					}
				}
			}
		}

		return flag;
	}

	// Dockage Type
	public boolean exeTrfV5(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		TariffCodeGatheredItem[] trfItemList = null;
		boolean flag = false;

		if (item.getDockageType() == null) {
			flag = false;

		} else {
			trfItemList = this.getTariffCodeValueList(condition);

			for (int i = 0; i < trfItemList.length; i++) {
				if (trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_EQUAL)
						|| trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_INCLUDE)) {

					if (trfItemList[i].getChrVal() != null) {
						if (item.getDockageType().equals(trfItemList[i].getChrVal())) {
							flag = true;
							break;
						}
					}
				}
			}
		}

		return flag;
	}

	// Arrival Time(s) in a month
	public boolean exeTrfV6(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		boolean flag = true;

		return flag;
	}

	// Operated at Private Jetty
	public boolean exeTrfV7(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		boolean flag = true;

		return flag;
	}

	// Passenger Age
	public boolean exeTrfV8(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		boolean flag = true;

		return flag;
	}

	// Fresh Water Service Type
	public boolean exeTrfV9(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		boolean flag = true;

		return flag;
	}

	// GRT information
	public boolean exeTrfV10(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		TariffCodeGatheredItem[] trfItemList = null;
		boolean flag = false;

		if (item.getGrt() == null) {
			flag = false;

		} else {
			float tGrt = Float.parseFloat(item.getGrt());
			int targetGrt = (int) (tGrt + 0.99);

			trfItemList = this.getTariffCodeValueList(condition);

			for (int i = 0; i < trfItemList.length; i++) {
				if (trfItemList[i].getTierVal1() != null && trfItemList[i].getTierVal1().length() > 0) {
					float grt = Float.parseFloat(trfItemList[i].getTierVal1());
					if (targetGrt >= (int) grt) {
						flag = true;
					} else {
						return false;
					}
				}

				if (trfItemList[i].getTierVal2() != null && trfItemList[i].getTierVal2().length() > 0) {
					float grt = Float.parseFloat(trfItemList[i].getTierVal2());
					if (targetGrt <= (int) grt) {
						flag = true;
					} else {
						return false;
					}
				}
			}
		}

		return flag;
	}

	// Category
	public boolean exeTrfC1(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		TariffCodeGatheredItem[] trfItemList = null;
		boolean flag = false;

		if (item.getOpeClass() == null) {
			flag = false;

		} else {
			trfItemList = this.getTariffCodeValueList(condition);

			for (int i = 0; i < trfItemList.length; i++) {
				if (trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_EQUAL)
						|| trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_INCLUDE)) {

					if (trfItemList[i].getChrVal() != null) {
						if (item.getOpeClass().equals(trfItemList[i].getChrVal())) {
							flag = true;
							break;
						}
					}
				}
			}
		}

		return flag;
	}

	// Rehandle
	public boolean exeTrfC2(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		TariffCodeGatheredItem[] trfItemList = null;
		boolean flag = false;
		
		if(item.getRhdlMode() == null) {
			flag = false;
			
		}else {
			trfItemList = this.getTariffCodeValueList(condition);
			
			for(int i=0;i<trfItemList.length;i++){
				if(trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_EQUAL) || 
				   trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_INCLUDE)){
					
					if(trfItemList[i].getChrVal() !=null) {
						if(item.getRhdlMode().equals(trfItemList[i].getChrVal())) {
					        flag = true;
					        break;
						}
					}
				}
			}
		}
		
 		return flag;
	}

	// Delivery
	public boolean exeTrfC3(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		TariffCodeGatheredItem[] trfItemList = null;
		boolean flag = false;

		if (item.getDeliveryType() == null) {
			flag = false;

		} else {
			trfItemList = this.getTariffCodeValueList(condition);

			for (int i = 0; i < trfItemList.length; i++) {
				if (trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_EQUAL)
						|| trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_INCLUDE)) {

					if (trfItemList[i].getChrVal() != null) {
						if (item.getDeliveryType().equals(trfItemList[i].getChrVal())) {
							flag = true;
							break;
						}
					}
				}
			}
		}

		return flag;
	}

	// Cargo Trade Type
	public boolean exeTrfC4(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		TariffCodeGatheredItem[] trfItemList = null;
		boolean flag = false;
		
		if(item.getTradeType() == null) {
			flag = false;
			
		}else {
			trfItemList = this.getTariffCodeValueList(condition);
			
			for(int i=0;i<trfItemList.length;i++){
				if(trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_EQUAL) || 
				   trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_INCLUDE)){
					
					if(trfItemList[i].getChrVal() !=null) {
						if(item.getTradeType().equals(trfItemList[i].getChrVal())) {
					        flag = true;
					        break;
						}
					}
				}
			}
		}

		return flag;
	}

	// Shifting Type
	public boolean exeTrfC5(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		TariffCodeGatheredItem[] trfItemList = null;
		boolean flag = false;
		
		if(item.getCargoShiftTpCd() == null) {
			flag = false;
			
		}else {
			trfItemList = this.getTariffCodeValueList(condition);
			
			for(int i=0;i<trfItemList.length;i++){
				if(trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_EQUAL) || 
				   trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_INCLUDE)){
					
					if(trfItemList[i].getChrVal() !=null) {
						if(item.getCargoShiftTpCd().equals(trfItemList[i].getChrVal())) {
					        flag = true;
					        break;
						}
					}
				}
			}
		}
		
		return flag;
	}

	// W/H Type
	public boolean exeTrfC6(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		TariffCodeGatheredItem[] trfItemList = null;
		boolean flag = false;

		if (item.getWhLocTp() == null) {
			if (item.getScrId() != null && item.getScrId().equals(BillingConstant.PAYTMENT_MODE_PRE_PAID)) {
				flag = true;
			} else {
				flag = false;
			}
		} else {
			trfItemList = this.getTariffCodeValueList(condition);

			for (int i = 0; i < trfItemList.length; i++) {
				if (trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_EQUAL)
						|| trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_INCLUDE)) {

					if (trfItemList[i].getChrVal() != null) {
						if (item.getWhLocTp().equals(trfItemList[i].getChrVal())) {
							flag = true;
							break;
						}
					}
				}
			}
		}

		return flag;
	}

	// Cargo Type
	public boolean exeTrfC7(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		TariffCodeGatheredItem[] trfItemList = null;
		boolean flag = false;

		if (item.getCargoType() == null) {
			flag = false;

		} else {
			trfItemList = this.getTariffCodeValueList(condition);

			for (int i = 0; i < trfItemList.length; i++) {
				if (trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_EQUAL)
						|| trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_INCLUDE)) {

					if (trfItemList[i].getChrVal() != null) {
						if (item.getCargoType().equals(trfItemList[i].getChrVal())) {
							flag = true;
							break;
						}
					}
				}
			}
		}

		return flag;
	}

	// Commodity Group
	public boolean exeTrfC8(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		TariffCodeGatheredItem[] trfItemList = null;
		boolean flag = false;

		if (item.getCommodityGroup() == null) {
			flag = false;

		} else {
			trfItemList = this.getTariffCodeValueList(condition);

			for (int i = 0; i < trfItemList.length; i++) {
				if (trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_EQUAL)
						|| trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_INCLUDE)) {

					if (trfItemList[i].getChrVal() != null) {
						if (item.getCommodityGroup().equals(trfItemList[i].getChrVal())) {
							flag = true;
							break;
						}
					}
				}
			}
		}

		return flag;
	}

	// Commodity
	public boolean exeTrfC9(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		TariffCodeGatheredItem[] trfItemList = null;
		boolean flag = false;

		if (item.getCommodity() == null) {
			flag = false;

		} else {
			trfItemList = this.getTariffCodeValueList(condition);

			for (int i = 0; i < trfItemList.length; i++) {
				if (trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_EQUAL)
						|| trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_INCLUDE)) {

					if (trfItemList[i].getChrVal() != null) {
						if (item.getCommodity().equals(trfItemList[i].getChrVal())) {
							flag = true;
							break;
						}
					}
				}
			}
		}

		return flag;
	}

	// Package Type
	public boolean exeTrfC10(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		TariffCodeGatheredItem[] trfItemList = null;
		boolean flag = false;

		if (item.getPackageType() == null) {
			flag = false;

		} else {
			trfItemList = this.getTariffCodeValueList(condition);

			for (int i = 0; i < trfItemList.length; i++) {
				if (trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_EQUAL)
						|| trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_INCLUDE)) {

					if (trfItemList[i].getChrVal() != null) {
						if (item.getPackageType().equals(trfItemList[i].getChrVal())) {
							flag = true;
							break;
						}
					}
				}
			}
		}

		return flag;
	}

	// DG Class
	public boolean exeTrfC11(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		boolean flag = true;

		return flag;
	}

	// Mode of OPR
	public boolean exeTrfC12(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		TariffCodeGatheredItem[] trfItemList = null;
		boolean flag = false;

		if (item.getModeofOpr() == null || item.getModeofOpr() == "") {
			if ((item.getModeofOprLr() == null || item.getModeofOprLr() == "")
					&& (item.getModeofOprSe() == null || item.getModeofOprSe() == "")) {
				flag = false;
			}
			// Fix in case cannot execute tariff when SN has both Lorry and Vessel mode
			else {
				if (item.getModeofOprSe() != null && item.getModeofOprSe() != "") {
					trfItemList = this.getTariffCodeValueList(condition);

					for (int i = 0; i < trfItemList.length; i++) {
						if (trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_EQUAL)
								|| trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_INCLUDE)) {

							if (trfItemList[i].getChrVal() != null) {
								if (item.getModeofOprSe().equals(trfItemList[i].getChrVal())) {
									flag = true;
									break;
								}
							}
						}
					}
				}

				if (item.getModeofOprLr() != null && item.getModeofOprLr() != "") {
					trfItemList = this.getTariffCodeValueList(condition);

					for (int i = 0; i < trfItemList.length; i++) {
						if (trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_EQUAL)
								|| trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_INCLUDE)) {

							if (trfItemList[i].getChrVal() != null) {
								if (item.getModeofOprLr().equals(trfItemList[i].getChrVal())) {
									flag = true;
									break;
								}
							}
						}
					}
				}
			}
		} else {
			trfItemList = this.getTariffCodeValueList(condition);

			for (int i = 0; i < trfItemList.length; i++) {
				if (trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_EQUAL)
						|| trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_INCLUDE)) {

					if (trfItemList[i].getChrVal() != null) {
						if (item.getModeofOpr().equals(trfItemList[i].getChrVal())) {
							flag = true;
							break;
						}
					}
				}
			}
		}

		return flag;
	}

	// Damaged
	public boolean exeTrfC13(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		boolean flag = true;

		return flag;
	}

	// Operation Type
	public boolean exeTrfC14(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		TariffCodeGatheredItem[] trfItemList = null;
		boolean flag = false;

		if (item.getJobPurpCd() == null) {
			if (item.getScrId() != null && item.getScrId().equals(BillingConstant.PAYTMENT_MODE_PRE_PAID)) {
				flag = true;
			} else {
				flag = false;
			}
		} else {
			trfItemList = this.getTariffCodeValueList(condition);

			for (int i = 0; i < trfItemList.length; i++) {
				if (trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_EQUAL)
						|| trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_INCLUDE)) {

					if (trfItemList[i].getChrVal() != null) {
						if (item.getJobPurpCd().equals(trfItemList[i].getChrVal())) {
							flag = true;
							break;
						}
					}
				}
			}
		}

		return flag;
	}

	// Vehicles
	public boolean exeTrfC15(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		boolean flag = true;

		return flag;
	}

	// Cargo Lift
	public boolean exeTrfC16(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		TariffCodeGatheredItem[] trfItemList = null;
		boolean flag = false;

		if (condition.getOprIdtCd() == null || condition.getChrVal() == null) {
			flag = false;

		} else {
			trfItemList = this.getTariffCodeValueList(condition);

			float wgt = 0;
			float m3 = 0;
			float qty = 0;

			if (item.getCgWgt() != null) {
				wgt = Float.parseFloat(item.getCgWgt());
			}

			if (item.getCgMsrmt() != null) {
				m3 = Float.parseFloat(item.getCgMsrmt());
			}

			if (item.getPkgQty() != null) {
				qty = Float.parseFloat(item.getPkgQty());
			}

			float rton = wgt > m3 ? wgt : m3;
			float eachRton = rton / qty;

			for (int i = 0; i < trfItemList.length; i++) {

				String measurementConditon = trfItemList[i].getChrVal();
				String OperationId = trfItemList[i].getOprIdtCd();
				float itemScale = measurementConditon.equals(BillingConstant.TRF_UNIT1_EACH_RTON) ? eachRton
						: (measurementConditon.equals(BillingConstant.TRF_UNIT1_RTON) ? rton
								: (measurementConditon.equals(BillingConstant.TRF_UNIT1_MT) ? wgt
										: (measurementConditon.equals(BillingConstant.TRF_UNIT1_M3) ? m3 : -9999)));

				// EQ = FromTo
				if (OperationId.equals(BillingConstant.OP_EQUAL) || OperationId.equals(BillingConstant.OP_INCLUDE)) {

					if (trfItemList[i].getTierVal1() != null && trfItemList[i].getTierVal2() != null) {

						float measurementFromScale = Float.parseFloat(trfItemList[i].getTierVal1());
						float measurementToScale = Float.parseFloat(trfItemList[i].getTierVal2());

						flag = (measurementFromScale <= itemScale && itemScale <= measurementToScale);
					}

					// Except EQ
				} else if (OperationId != null && trfItemList[i].getNoVal() != null && measurementConditon != null) {

					float measurementScale = Float.parseFloat(trfItemList[i].getNoVal());

					flag = checkMeasuremntCondition(OperationId, itemScale, measurementScale);
				}
			}
		}

		return flag;
	}

	// Weight Check
	public boolean exeTrfC17(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		TariffCodeGatheredItem[] trfItemList = null;
		boolean flag = false;

		if (item.getWgtChk() == null) {
			flag = true;

		} else {
			trfItemList = this.getTariffCodeValueList(condition);

			for (int i = 0; i < trfItemList.length; i++) {
				if (trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_EQUAL)
						|| trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_INCLUDE)) {

					if (trfItemList[i].getChrVal() != null) {
						if (item.getWgtChk().equals(trfItemList[i].getChrVal())) {
							flag = true;
							break;
						}
					}
				}
			}
		}

		return flag;
	}

	// Equipment Type
	public boolean exeTrfE1(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		TariffCodeGatheredItem[] trfItemList = null;
		boolean flag = false;

		trfItemList = this.getTariffCodeValueList(condition);

		if (item.getEquipmentType() == null) {
			for (int i = 0; i < trfItemList.length; i++) {
				if (item.getScrId() != null &&item.getScrId().equals(BillingConstant.PAYTMENT_MODE_PRE_PAID)) {
					if (trfItemList[i].getChrVal() != null) {
						if (trfItemList[i].getChrVal().equals(CodeConstant.MT_EQTP2_SC)) {
							flag = true;
							break;
						} else {
							flag = false;
						}
					}
				} else {
					flag = false;
				}
			}
		} else {
			for (int i = 0; i < trfItemList.length; i++) {
				if (trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_EQUAL)
						|| trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_INCLUDE)) {

					if (trfItemList[i].getChrVal() != null) {
						if (item.getEquipmentType().equals(trfItemList[i].getChrVal())) {
							flag = true;
							break;
						}
					}
				}
			}
		}

		return flag;
	}

	// Capacity
	public boolean exeTrfE2(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		boolean flag = true;

		return flag;
	}

	// Working Area
	public boolean exeTrfE3(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		boolean flag = true;

		return flag;
	}

	// Working Time
	public boolean exeTrfE4(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		boolean flag = true;

		return flag;
	}

	// Stevedore Role
	public boolean exeTrfO1(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		boolean flag = true;

		return flag;
	}

	// Penalty on Late Manifest
	public boolean exeTrfO2(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		boolean flag = true;

		return flag;
	}

	// Delay Day(s) on Submission of Manifest
	public boolean exeTrfO3(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		boolean flag = true;

		return flag;
	}

	// Penalty Type for Stevedore
	public boolean exeTrfO4(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		boolean flag = true;

		return flag;
	}

	// Use of Weightbridge
	public boolean exeTrfO5(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		boolean flag = true;

		return flag;
	}

	// Cargo Storage Days
	public boolean exeTrfO6(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		TariffCodeGatheredItem[] trfItemList = null;
		boolean flag = false;

		trfItemList = this.getTariffCodeValueList(condition);

		for (int i = 0; i < trfItemList.length; i++) {
			if (trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_EQUAL)
					|| trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_INCLUDE)) {

				int storageDays = 0;
				int overStorageDay = 0;

				TariffCodeStroageItem storageDayItem = trfItem.getStorageDays();

				if (storageDayItem != null) {
					storageDays = Integer
							.parseInt(storageDayItem.getDaydiff() == null ? "0" : storageDayItem.getDaydiff());
				}

				overStorageDay = (int) Double.parseDouble(trfItemList[i].getTierVal1());

				if (storageDays >= overStorageDay) {
					flag = true;
					break;
				}
			}
		}

		return flag;
	}

	// Accumulative tonnage for one year
	public boolean exeTrfO7(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		boolean flag = true;

		return flag;
	}

	// Penalty on Late Submitsion Vessel Schedule
	public boolean exeTrfO8(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		boolean flag = true;

		return flag;
	}

	// SSR Y/N
	public boolean exeTrfO9(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffCodeGeneratorItem item) {
		TariffCodeGatheredItem[] trfItemList = null;
		boolean flag = true;

		trfItemList = this.getTariffCodeValueList(condition);

		for (int i = 0; i < trfItemList.length; i++) {
			if (item.getScrId() != null && item.getScrId().equals("OPE")) {
				if (trfItemList[i].getChrVal() != null) {
					if (trfItemList[i].getChrVal().equals(CommonConstants.Y)) {
						flag = false;
					} else {
						flag = true;
						break;
					}
				}
			} else {
				flag = true;
				break;
			}
		}

		return flag;
	}

	// Service Order Category 1
	public boolean exeTrfS1(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffServiceOrderGatheredItem item) {
		TariffCodeGatheredItem[] trfItemList = null;
		boolean flag = false;

		if (item.getCategory1() == null) {
			flag = false;

		} else {
			trfItemList = this.getTariffCodeValueList(condition);

			for (int i = 0; i < trfItemList.length; i++) {
				if (trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_EQUAL)
						|| trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_INCLUDE)) {

					if (trfItemList[i].getChrVal() != null) {
						if (item.getCategory1().equals(trfItemList[i].getChrVal())) {
							flag = true;
							break;
						}
					}
				}
			}
		}

		return flag;
	}

	// Service Order Category 2
	public boolean exeTrfS2(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffServiceOrderGatheredItem item) {
		TariffCodeGatheredItem[] trfItemList = null;
		boolean flag = false;

		if (item.getCategory2() == null) {
			flag = false;

		} else {
			trfItemList = this.getTariffCodeValueList(condition);

			for (int i = 0; i < trfItemList.length; i++) {
				if (trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_EQUAL)
						|| trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_INCLUDE)) {

					if (trfItemList[i].getChrVal() != null) {
						if (item.getCategory2().equals(trfItemList[i].getChrVal())) {
							flag = true;
							break;
						}
					}
				}
			}
		}

		return flag;
	}

	// Service Order Category 3
	public boolean exeTrfS3(TariffCodeGatheredItem trfItem, TariffCodeConditionItem condition,
			TariffServiceOrderGatheredItem item) {
		TariffCodeGatheredItem[] trfItemList = null;
		boolean flag = false;

		if (item.getCategory3() == null) {
			flag = false;

		} else {
			trfItemList = this.getTariffCodeValueList(condition);

			for (int i = 0; i < trfItemList.length; i++) {
				if (trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_EQUAL)
						|| trfItemList[i].getOprIdtCd().equals(BillingConstant.OP_INCLUDE)) {

					if (trfItemList[i].getChrVal() != null) {
						if (item.getCategory3().equals(trfItemList[i].getChrVal())) {
							flag = true;
							break;
						}
					}
				}
			}
		}

		return flag;
	}

	private TariffCodeGatheredItem[] getTariffCodeValueList(TariffCodeConditionItem condition) {// String pTrfCd, String
																								// pSubCode, String
																								// pPrpt){
		ArrayList array = new ArrayList();

		for (int i = 0; i < tariffCodeList.size(); i++) {
			TariffCodeGatheredItem item = (TariffCodeGatheredItem) tariffCodeList.get(i);

			if (item.getTrfCd().equals(condition.getTrfCd()) && item.getPrptCd().equals(condition.getPrptCd())
					&& item.getSubTrfCd().equals(condition.getSubTrfCd())) {
				array.add(item);
			}
		}

		TariffCodeGatheredItem[] items = new TariffCodeGatheredItem[array.size()];

		return (TariffCodeGatheredItem[]) array.toArray(items);
	}

	public DataItemList getTariffCodeList() {
		return tariffCodeList;
	}

	public DataItemList getDistinctTariffCodList() {
		return distinctTariffCodList;
	}

	private boolean checkMeasuremntCondition(String OprIdtCd, float itemScale, float measurementScale) {

		if (itemScale != -9999) {
			if (OprIdtCd.equals(BillingConstant.OP_MORE_THAN)) {
				return (itemScale > measurementScale);
			} else if (OprIdtCd.equals(BillingConstant.OP_MORE_THAN_OR_EQUAL)) {
				return (itemScale >= measurementScale);
			} else if (OprIdtCd.equals(BillingConstant.OP_LESS_THAN)) {
				return (itemScale < measurementScale);
			} else if (OprIdtCd.equals(BillingConstant.OP_LESS_THAN_OR_EQUAL)) {
				return (itemScale <= measurementScale);
			}
		}
		return false;
	}
}
