package com.tsb.most.basebiz.dao.administrator;

import com.tsb.most.basebiz.parm.administrator.SearchAuthorityGroupParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.exception.DaoException;

public interface IAuthorityGroupDao {
	public DataItemList selectAuthorityGroup(SearchAuthorityGroupParm parm) throws DaoException;
	public DataItemList selectAuthorityGroupPopup(SearchAuthorityGroupParm parm) throws DaoException;
	public DataItemList selectDepartmentPopup(SearchAuthorityGroupParm parm) throws DaoException;
	public DataItemList selectPartnerType(SearchAuthorityGroupParm parm) throws DaoException;
	public DataItemList selectUserListByGroup(SearchAuthorityGroupParm parm) throws DaoException;
	public DataItemList selectAccessAuth(SearchAuthorityGroupParm parm) throws BizException;
		
	public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList insertAccessItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateItems(UpdateItemsBizParm  parm) throws DaoException;
	public DataItemList updateGroupItems(UpdateItemsBizParm  parm) throws DaoException;
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException;
	public DataItemList deleteAccessItems(DeleteItemsBizParm parm) throws DaoException;
}
