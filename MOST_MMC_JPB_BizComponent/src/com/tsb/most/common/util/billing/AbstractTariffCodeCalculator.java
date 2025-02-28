package com.tsb.most.common.util.billing;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.biz.dataitem.billing.InvoiceDataItem;
import com.tsb.most.biz.dataitem.billing.TariffCodeGatheredItem;
import com.tsb.most.biz.dataitem.billing.TariffCodeGeneratorItem;
import com.tsb.most.biz.dataitem.billing.TariffCodePayerItem;
import com.tsb.most.biz.dataitem.billing.TariffServiceOrderGatheredItem;
import com.tsb.most.common.constant.BillingConstant;
import com.tsb.most.framework.dataitem.DataItemList;

public abstract class AbstractTariffCodeCalculator {
	protected TariffCodeGeneratorItem targetItem;
	protected DataItemList payerList;

	public AbstractTariffCodeCalculator(TariffCodeGeneratorItem targetItem, DataItemList payerList) {
		this.targetItem = targetItem;
		this.payerList = payerList;
	}
	
	public abstract void executeCalcurate();
	
	protected InvoiceDataItem makeInvoiceData(TariffCodeGeneratorItem targetItem, TariffCodeGatheredItem trfItem) {
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
	
	protected DataItemList getPayerList(TariffCodeGeneratorItem targetItem, TariffCodeGatheredItem trfItem) {
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
