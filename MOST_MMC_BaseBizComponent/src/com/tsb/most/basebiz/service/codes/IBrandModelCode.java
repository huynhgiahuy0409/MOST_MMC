package com.tsb.most.basebiz.service.codes;

import com.tsb.most.basebiz.parm.codes.SearchBrandModelCodeParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IBrandModelCode {
	public DataItemList selectBrandCodeItems(SearchBrandModelCodeParm parm)throws BizException;
	public DataItemList selectModelCodeItems(SearchBrandModelCodeParm parm)throws BizException;
	public DataItemList brandCodeDuplicateCheck(SearchBrandModelCodeParm parm)throws BizException;
	public DataItemList brandCodeRemoveCheck(SearchBrandModelCodeParm parm)throws BizException;
	public DataItemList modelCodeDuplicateCheck(SearchBrandModelCodeParm parm)throws BizException;
	public DataItemList insertBrandCodeItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateBrandCodeItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteBrandCodeItems(DeleteItemsBizParm parm) throws BizException;	
	public DataItemList insertModelCodeItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateModelCodeItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteModelCodeItems(DeleteItemsBizParm parm) throws BizException;	
}
	