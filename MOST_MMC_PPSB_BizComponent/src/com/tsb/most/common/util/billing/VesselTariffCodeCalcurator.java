package com.tsb.most.common.util.billing;

import java.math.BigDecimal;

import com.tsb.most.biz.dataitem.billing.TariffCodeGatheredItem;
import com.tsb.most.biz.dataitem.billing.TariffCodeGeneratorItem;
import com.tsb.most.common.constant.BillingConstant;
import com.tsb.most.framework.dataitem.DataItemList;

public class VesselTariffCodeCalcurator extends AbstractTariffCodeCalculator{

	public VesselTariffCodeCalcurator(TariffCodeGeneratorItem targetItem, DataItemList payerList) {
		super(targetItem,payerList);
	}

	public void executeCalcurate() {
		DataItemList invoiceData = new DataItemList();
		DataItemList invoiceList = null;

		// calcurate tariff code
		invoiceList = targetItem.getTrfBucketList();

		for (int i = 0; i < invoiceList.size(); i++) {
			TariffCodeGatheredItem trfItem = (TariffCodeGatheredItem) invoiceList.get(i);
			if (trfItem.getTrfTpCd().equals(BillingConstant.TRF_TP_PD)) {
				//PORTDUE
				BigDecimal trfAmt = new BigDecimal(trfItem.getUnitPrc());
				BigDecimal unit1 = new BigDecimal(0);
				BigDecimal applyAmt = new BigDecimal(0);
				if (trfItem.getIvUnit1() != null) {
					unit1 = new BigDecimal(targetItem.getLoa());
					applyAmt = unit1.multiply(trfAmt);
				}
				
				trfItem.setUnit1Val(String.valueOf(unit1));
				trfItem.setAplyAmt(String.valueOf(applyAmt));
				
				if(applyAmt.compareTo(BigDecimal.ZERO) > 0) {
					invoiceData.add(this.makeInvoiceData(targetItem, trfItem));
				}
			}
		}			

		targetItem.setInvoiceList(invoiceData);

	}

}
