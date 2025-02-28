package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchShiftingDoubleBankingParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IShiftingDoubleBankingDao {
    public DataItemList selectDoubleBankingList(SearchShiftingDoubleBankingParm parm) throws DaoException;
    public DataItemList selectStsOperationList(SearchShiftingDoubleBankingParm parm) throws DaoException;
    public DataItemList selectDocAmountByOPRMode(SearchShiftingDoubleBankingParm parm) throws DaoException;
    public DataItemList selectVesselShiftingList(SearchShiftingDoubleBankingParm parm) throws DaoException;
    public String checkVslShifting(SearchShiftingDoubleBankingParm parm)throws DaoException;
    public DataItemList selectVesselCurrWharf(SearchShiftingDoubleBankingParm parm) throws DaoException;
    public DataItemList selectCargoShiftingList(SearchShiftingDoubleBankingParm parm) throws DaoException;
    public DataItemList selectCommodity(SearchShiftingDoubleBankingParm parm) throws DaoException;
    public DataItemList selectCommodityWithinConfirmationSlip(SearchShiftingDoubleBankingParm parm) throws DaoException;
    public DataItemList selectCargoType(SearchShiftingDoubleBankingParm parm) throws DaoException;
    public DataItemList selectConfSlpInformation(SearchShiftingDoubleBankingParm parm) throws DaoException;
    public DataItemList selectShftAtx(SearchShiftingDoubleBankingParm parm) throws DaoException;
    
    public DataItemList insertVesselShiftingItems(InsertItemsBizParm parm) throws DaoException;
    public DataItemList updateVesselShiftingItems(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList deleteVesselShiftingItems(DeleteItemsBizParm parm) throws DaoException;
    
    public DataItemList insertCargoShiftingItems(InsertItemsBizParm parm) throws DaoException;
    public DataItemList updateCargoShiftingItems(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList deleteCargoShiftingItems(DeleteItemsBizParm parm) throws DaoException;
    
    public DataItemList update2ndVesselInfoItems(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList update3ndVesselInfoItems(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList insertDoubleBankingItems(InsertItemsBizParm parm) throws DaoException;
    public DataItemList updateDoubleBankingItems(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList updateVesselInfoRollBackItems(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList updateVsAtu(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList deleteDoubleBankingItems(DeleteItemsBizParm parm) throws DaoException;
    
    public DataItemList insertShipToShipItems(InsertItemsBizParm parm) throws DaoException;
    public DataItemList updateShipToShipItems(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList deleteShipToShipItems(DeleteItemsBizParm parm) throws DaoException;
 
}
