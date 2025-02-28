package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchCargoArrvDelvParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.biz.parm.operation.SearchConfirmDischargingOfROROParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IConfirmDischargingOfRORODao {
    public DataItemList selectBlComboItems(SearchConfirmDischargingOfROROParm parm) throws DaoException;
    public DataItemList selectCargoItems(SearchConfirmDischargingOfROROParm parm) throws DaoException;
    public DataItemList selectUnitItems(SearchConfirmDischargingOfROROParm parm) throws DaoException;
    public DataItemList updateConfirmDischargingOfRoRo(UpdateItemsBizParm items) throws DaoException;
    public DataItemList insertUnitCorrectionOfRoRo(InsertItemsBizParm items) throws DaoException;
    
    public DataItemList selectApronCheckerImportList(SearchConfirmDischargingOfROROParm parm) throws DaoException;
    public DataItemList selectUnitItemsHHT(SearchConfirmDischargingOfROROParm parm) throws DaoException;
    public DataItemList updateConfirmDischargingOfRoRoHHT(UpdateItemsBizParm items) throws DaoException;
    public DataItemList insertUnitCorrectionOfRoRoHHT(InsertItemsBizParm items) throws DaoException;
	public void insertJobItems(DataItemList items) throws DaoException;
	public DataItem selectGatepassNo(SearchCargoArrvDelvParm parm) throws DaoException;
	public void updateDelvItems(DataItemList items) throws DaoException;
	public boolean selectIsROROMst(SearchCargoMasterParm parm)throws DaoException;
	public void updateNextPurpCd(DataItemList items) throws DaoException;
	public void insertCargoInvLocationItems(DataItemList items) throws DaoException;
	public void insertConfirmDischargingOfRoRo(DataItemList items)throws DaoException;
}
