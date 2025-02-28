package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ICargoMasterDao {
	public DataItemList selectGrGoComboList(SearchCargoMasterParm parm) throws DaoException;
	public DataItemList selectGpGoComboList(SearchCargoMasterParm parm) throws DaoException;
	public String selectJobGroupNo(SearchCargoMasterParm parm) throws DaoException;
	public String selectActualDelvTpCd(SearchCargoMasterParm parm) throws DaoException;
	public boolean selectIsWHFinalCheck(SearchCargoMasterParm parm) throws DaoException;
	public boolean selectIsCargoMst(SearchCargoMasterParm parm) throws DaoException;
	public boolean selectIsCargoAvDvChk(SearchCargoMasterParm parm) throws DaoException;
	public boolean selectIsCargoMstHOStDt(SearchCargoMasterParm parm) throws DaoException;
	public boolean selectIsImportInvSumCheck(SearchCargoMasterParm parm) throws DaoException;
	public DataItemList selectCargoSearchList(SearchCargoMasterParm parm) throws DaoException;
    public DataItemList selectCargoDoOperation(SearchCargoMasterParm parm) throws DaoException;

	public DataItemList selectShippingNoteComboList(SearchCargoMasterParm parm) throws DaoException;
	public DataItemList selectBLComboList(SearchCargoMasterParm parm) throws DaoException;
	
	public DataItemList selectShift(SearchCargoMasterParm parm) throws DaoException;
	public DataItemList selectWHComboList(SearchCargoMasterParm parm) throws DaoException;
	
	public String getJobGroupNo(SearchCargoMasterParm parm) throws DaoException;
	public boolean getCargoMasterCheck(SearchCargoMasterParm parm) throws DaoException;
}