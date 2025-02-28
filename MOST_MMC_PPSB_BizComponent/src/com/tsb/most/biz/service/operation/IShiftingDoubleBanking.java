package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchShiftingDoubleBankingParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IShiftingDoubleBanking{
	public DataItemList selectSftDblBankingList(SearchShiftingDoubleBankingParm parm) throws BizException;	

	public DataItemList insertVesselShiftingItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateVesselShiftingItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteVesselShiftingItems(DeleteItemsBizParm parm) throws BizException;
	
	public DataItemList insertCargoShiftingItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateCargoShiftingItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteCargoShiftingItems(DeleteItemsBizParm parm) throws BizException;
	
	public DataItemList insertDoubleBankingItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateDoubleBankingItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteDoubleBankingItems(DeleteItemsBizParm parm) throws BizException;
	
	public DataItemList insertShipToShipItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateShipToShipItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteShipToShipItems(DeleteItemsBizParm parm) throws BizException;
	
}
