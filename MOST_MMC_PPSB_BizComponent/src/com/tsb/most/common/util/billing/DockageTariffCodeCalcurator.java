package com.tsb.most.common.util.billing;

import java.math.BigDecimal;

import com.tsb.most.biz.dataitem.billing.TariffCodeGatheredItem;
import com.tsb.most.biz.dataitem.billing.TariffCodeGeneratorItem;
import com.tsb.most.framework.dataitem.DataItemList;

public class DockageTariffCodeCalcurator extends AbstractTariffCodeCalculator{

	public DockageTariffCodeCalcurator(TariffCodeGeneratorItem targetItem, DataItemList payerList) {
		super(targetItem,payerList);
	}

	public void executeCalcurate() {
		DataItemList invoiceData = new DataItemList();
		DataItemList invoiceList = null;

		// calcurate tariff code
		invoiceList = targetItem.getTrfBucketList();

		for (int i = 0; i < invoiceList.size(); i++) {
			TariffCodeGatheredItem trfItem = (TariffCodeGatheredItem) invoiceList.get(i);
			
			if (trfItem.getIvUnit1() != null && trfItem.getIvUnit2() != null) {
				BigDecimal unit1 = new BigDecimal(targetItem.getLoa());
				BigDecimal unit2 = new BigDecimal(targetItem.getDockageHrs());
				BigDecimal trfAmt = new BigDecimal(trfItem.getUnitPrc());
				BigDecimal applyAmt = unit1.multiply(unit2).multiply(trfAmt);

				trfItem.setUnit1Val(String.valueOf(unit1));
				trfItem.setUnit2Val(String.valueOf(unit2));
				trfItem.setAplyAmt(String.valueOf(applyAmt));
				
				if(applyAmt.compareTo(BigDecimal.ZERO) > 0) {
					invoiceData.add(this.makeInvoiceData(targetItem, trfItem));
				}
				
			}
		}

		targetItem.setInvoiceList(invoiceData);

	}

}
