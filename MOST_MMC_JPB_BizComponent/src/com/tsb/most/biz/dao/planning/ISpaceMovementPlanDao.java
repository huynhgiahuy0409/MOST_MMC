package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.dataitem.planning.SpaceMovementPlanItem;
import com.tsb.most.biz.parm.planning.SearchSpaceMovementPlanParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public interface ISpaceMovementPlanDao {
	public DataItemList selectSpaceMovementRequestList(SearchSpaceMovementPlanParm parm) throws DaoException;
    public DataItemList selectSpaceMoveMentPlanDetail(SearchSpaceMovementPlanParm parm) throws DaoException;
    public DataItemList selectSpaceMovementPlanList(SearchSpaceMovementPlanParm parm) throws DaoException; 
    public DataItemList selectBlSnInfo(SearchSpaceMovementPlanParm parm) throws DaoException;
    public DataItemList selectSpaceMovementInfo(SearchSpaceMovementPlanParm parm)throws DaoException ; 
    public DataItemList selectRcntReqNo(SearchSpaceMovementPlanParm parm) throws DaoException;
    public DataItemList selectReqSeq(SpaceMovementPlanItem parm) throws DaoException;
    public DataItemList selectMaxSeq(SearchSpaceMovementPlanParm parm) throws DaoException;
    public DataItemList selectNewReqNo(SearchSpaceMovementPlanParm parm) throws DaoException;
    public DataItemList insertSpcMovRequestItems(InsertItemsBizParm parm) throws DaoException;
    public DataItemList insertSpcMovPlanItems(InsertItemsBizParm parm) throws DaoException;
    public DataItemList deleteSpaceMovementPlanItems(DeleteItemsBizParm parm) throws DaoException;
    public DataItemList deleteSpcMovPlanItems(DeleteItemsBizParm parm) throws DaoException;
    public DataItemList updateSpaceMovementRequestItems(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList updateSpcMovPlanConfirm(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList updateSpcMovReject(UpdateItemsBizParm parm) throws DaoException;
    public void updateSpaceMovementRequestItems(TxTraceInfo txTraceInfo,DataItemList items) throws DaoException;
   
    public void deleteSpcMovPlanItems(TxTraceInfo txTraceInfo,DataItemList items) throws DaoException;
    public void updateSpcMovRequestProcess(UpdateItemsBizParm parm) throws DaoException;
    public void updateSpcMovPlanConfirm(TxTraceInfo txTraceInfo,DataItemList items) throws DaoException;
    public void deleteSpcMovRequestItem(TxTraceInfo txTraceInfo,SpaceMovementPlanItem items) throws DaoException;
    public void deleteSpcMovPlanItem(TxTraceInfo txTraceInfo, SpaceMovementPlanItem items) throws DaoException;
    public void insertSpcMovPlanItem(TxTraceInfo txTraceInfo, SpaceMovementPlanItem items) throws DaoException;
    public void updateSpcMovPlanConfirm2(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList selectMaxPlanSeq(SearchSpaceMovementPlanParm parm) throws DaoException;
    
    public DataItemList selectMultipleSearchFilterCombo(SearchSpaceMovementPlanParm parm) throws DaoException;
    public DataItemList selectGrList(SearchSpaceMovementPlanParm parm) throws DaoException;
    
    //s-PL-012
    public DataItemList selectCargoInfo(SearchSpaceMovementPlanParm parm)throws DaoException; 
    public DataItemList deleteSpcMovRequestItems(DeleteItemsBizParm parm) throws DaoException;
    public DataItemList selectDuplicatedRequest(SearchSpaceMovementPlanParm parm)throws DaoException;
}
