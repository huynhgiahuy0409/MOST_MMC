package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchDamageDimensionCheck;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IDamageDimensionCheck {
	public DataItemList searchDamageCheck(SearchDamageDimensionCheck parm)throws BizException;
	public DataItemList searchDimensionCheck(SearchDamageDimensionCheck parm)throws BizException;
	public DataItemList insertDamageCheck(InsertItemsBizParm parm)throws BizException;
	public DataItemList insertDimension(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateDimensionCheck(UpdateItemsBizParm parm) throws BizException;
	public DataItemList updateDamageCheck(UpdateItemsBizParm parm) throws BizException;
	public DataItemList searchDamageDimensionCheckJobNo(SearchDamageDimensionCheck parm) throws BizException;
	public DataItemList searchDamageDimensionCheckBlSnNo(SearchDamageDimensionCheck parm) throws BizException;
	public DataItemList searchDamageDimensionCheckDoGrNo(SearchDamageDimensionCheck parm) throws BizException;
	
}
