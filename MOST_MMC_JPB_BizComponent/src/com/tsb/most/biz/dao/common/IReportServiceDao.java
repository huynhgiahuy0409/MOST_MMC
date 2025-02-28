package com.tsb.most.biz.dao.common;

import com.tsb.most.biz.parm.common.PackageParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IReportServiceDao {
	 public DataItemList selectContainerData(PackageParm parm) throws DaoException;
	 public DataItemList selectSummaryData(PackageParm parm) throws DaoException;
	 public DataItemList selectSummaryLDfiguresData(PackageParm parm) throws DaoException;
}
