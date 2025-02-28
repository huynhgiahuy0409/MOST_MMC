package com.tsb.most.basebiz.service.administrator;

import com.tsb.most.basebiz.parm.administrator.SearchAuthorityGroupParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IAuthorityGroup {
	public DataItemList selectAuthorityGroup(SearchAuthorityGroupParm parm) throws BizException;
	public DataItemList selectPartnerType(SearchAuthorityGroupParm parm) throws BizException;
	public DataItemList selectUserListByGroup(SearchAuthorityGroupParm parm) throws BizException;
	public DataItemList selectAccessAuth(SearchAuthorityGroupParm parm) throws BizException;
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException;
	public DataItemList selectAuthorityGroupPopup(SearchAuthorityGroupParm parm) throws BizException;
	public DataItemList selectDepartmentPopup(SearchAuthorityGroupParm parm) throws BizException;
}
