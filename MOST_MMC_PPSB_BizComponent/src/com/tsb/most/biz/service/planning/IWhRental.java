package com.tsb.most.biz.service.planning;

import com.tsb.most.basebiz.parm.configuration.SearchWhConfigurationParm;
import com.tsb.most.biz.parm.planning.SearchWhRentalParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IWhRental{
	public DataItemList getWhRentalDetailList(SearchWhRentalParm parm) throws BizException;
	public DataItemList getWhRentalList(SearchWhRentalParm parm) throws BizException;
	public DataItemList getWhRentalGridList(SearchWhRentalParm parm) throws BizException;
	public DataItemList processWhRentalItems(InsertItemsBizParm item) throws BizException;
	public DataItemList getChkDupliRentNo(SearchWhRentalParm parm) throws BizException;
	public DataItemList getWhConfigurationList(SearchWhConfigurationParm parm) throws BizException;
}