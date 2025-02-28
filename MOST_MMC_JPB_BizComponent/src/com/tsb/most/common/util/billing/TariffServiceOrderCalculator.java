package com.tsb.most.common.util.billing;

import java.math.BigDecimal;

import com.tsb.most.biz.dataitem.billing.InvoiceDataItem;
import com.tsb.most.framework.data.util.StringUtil;
import com.tsb.most.framework.dataitem.DataItemList;

public class TariffServiceOrderCalculator {
	private InvoiceDataItem serviceOrderInvoice;
	private DataItemList payerList;
	
	public TariffServiceOrderCalculator(InvoiceDataItem serviceOrderInvoice, DataItemList payerList) {
		this.serviceOrderInvoice = serviceOrderInvoice;
		this.payerList = payerList;
	}
	
	public void executeCalcurate(DataItemList insertItems) {
		BigDecimal aplyAmt = new BigDecimal(0);
		aplyAmt = caluateUnits(aplyAmt, serviceOrderInvoice);
		
		if(aplyAmt.compareTo(new BigDecimal(0)) == 1) {
			setUpInvoiceAmount(aplyAmt, serviceOrderInvoice);
			insertItems.add(serviceOrderInvoice);
		}
	}
	
	public void setUpInvoiceAmount(BigDecimal aplyAmt, InvoiceDataItem serviceOrderInvoice) {
		aplyAmt = aplyAmt.multiply(new BigDecimal(serviceOrderInvoice.getAplyRate()));
		serviceOrderInvoice.setAplyAmt( String.valueOf(aplyAmt) );
		BigDecimal gstAmt = aplyAmt.multiply(new BigDecimal( serviceOrderInvoice.getGstRate()).divide( BigDecimal.valueOf(100)));
		serviceOrderInvoice.setGstAmt( String.valueOf( gstAmt ) );
		serviceOrderInvoice.setTotalAmt( String.valueOf(aplyAmt.add(gstAmt)) );
	}
	
	public BigDecimal caluateUnits(BigDecimal aplyAmt, InvoiceDataItem serviceOrderInvoice) {
		
		if( !StringUtil.isNull(serviceOrderInvoice.getUnit1Val()) 
				&& !"0".equals(serviceOrderInvoice.getUnit1Val())  ) 
		{
			BigDecimal unit1 = new BigDecimal(serviceOrderInvoice.getUnit1Val());
			aplyAmt = (aplyAmt.compareTo(new BigDecimal("0")) == 0) ? unit1 : aplyAmt.multiply(unit1);
		}
		
		if( !StringUtil.isNull(serviceOrderInvoice.getUnit2Val()) 
				&& !"0".equals(serviceOrderInvoice.getUnit2Val())  ) 
		{
			BigDecimal unit2 = new BigDecimal(serviceOrderInvoice.getUnit2Val());
			aplyAmt = (aplyAmt.compareTo(new BigDecimal("0")) == 0) ? unit2 : aplyAmt.multiply(unit2);
		}
		
		if( !StringUtil.isNull(serviceOrderInvoice.getUnit3Val()) 
				&& !"0".equals(serviceOrderInvoice.getUnit3Val())  ) 
		{
			BigDecimal unit3 = new BigDecimal(serviceOrderInvoice.getUnit3Val());
			aplyAmt = (aplyAmt.compareTo(new BigDecimal("0")) == 0) ? unit3 : aplyAmt.multiply(unit3);
		}
		
		return aplyAmt;
	}
}
