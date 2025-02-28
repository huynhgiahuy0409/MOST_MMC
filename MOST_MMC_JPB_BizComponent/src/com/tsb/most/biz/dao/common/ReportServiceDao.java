package com.tsb.most.biz.dao.common;

import java.util.List;

import com.tsb.most.biz.parm.common.PackageParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;


public class ReportServiceDao extends BaseDao implements IReportServiceDao{
    
	@Override
    public DataItemList selectContainerData(PackageParm parm) throws DaoException{
		return unifiedDao.getItems("ReportService.selectContainerData",parm);
	}
	
	@Override
    public DataItemList selectSummaryData(PackageParm parm) throws DaoException{
		return unifiedDao.getItems("ReportService.selectSummaryData",parm);
	}
	
	@Override
    public DataItemList selectSummaryLDfiguresData(PackageParm parm) throws DaoException{
		return unifiedDao.getItems("ReportService.selectSummaryLDfiguresData",parm);
	}
}