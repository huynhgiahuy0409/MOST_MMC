package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchMegaParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IMegaContractorDao {

	public DataItemList getMegaContractorList(SearchMegaParm parm) throws DaoException;

	public DataItemList updateMegaOperItems(UpdateItemsBizParm updateParm) throws DaoException;

}