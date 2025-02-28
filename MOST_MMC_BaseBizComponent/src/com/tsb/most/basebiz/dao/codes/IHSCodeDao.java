package com.tsb.most.basebiz.dao.codes;

import com.tsb.most.basebiz.parm.codes.SearchHSCodeParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IHSCodeDao {

	DataItemList selectHSCodeList(SearchHSCodeParm parm) throws DaoException;

	DataItemList duplicationHSCodeCheck(SearchHSCodeParm parm) throws DaoException;

	DataItemList insertItems(InsertItemsBizParm items) throws DaoException;

	DataItemList updateItems(UpdateItemsBizParm items) throws DaoException;

	DataItemList deleteItems(DeleteItemsBizParm items) throws DaoException;
	
	DataItemList selectHsCodePopup(SearchHSCodeParm parm) throws DaoException;
}