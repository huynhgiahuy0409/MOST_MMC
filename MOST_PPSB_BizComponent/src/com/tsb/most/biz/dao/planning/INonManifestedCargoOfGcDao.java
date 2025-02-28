package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.dataitem.planning.NonManifestedCargoOfGcItem;
import com.tsb.most.biz.parm.planning.SearchNonManifestedCargoOfGcParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface INonManifestedCargoOfGcDao {
    public DataItemList selectNonManifestedCargoOfGcList(SearchNonManifestedCargoOfGcParm parm) throws DaoException;
    public DataItemList selectBlItems(SearchNonManifestedCargoOfGcParm parm) throws DaoException;
    public DataItemList selectSnItems(SearchNonManifestedCargoOfGcParm parm) throws DaoException;
    public DataItemList selectCargoJobItems(SearchNonManifestedCargoOfGcParm parm) throws DaoException;
    public String selectJobGroupNo(SearchNonManifestedCargoOfGcParm parm) throws DaoException;
    public boolean selectIsCargoMst(SearchNonManifestedCargoOfGcParm parm) throws DaoException;
    public void updateNonManifestedGcCargoJobItem(NonManifestedCargoOfGcItem item) throws DaoException;
    public void updateNonManifestedGcInventoryLocItem(NonManifestedCargoOfGcItem item) throws DaoException;
    public void deleteNonManifestedGcInventoryLocItem(NonManifestedCargoOfGcItem item) throws DaoException; 
    public void insertNonManifestedGcInventoryLocItem(NonManifestedCargoOfGcItem item) throws DaoException;
    public void updateNonManifestedGcCargoMstItem(NonManifestedCargoOfGcItem item) throws DaoException;
    public void insertNonManifestedGcCargoMstItem(NonManifestedCargoOfGcItem item) throws DaoException;
    public void updateNonManifestedGcCargoMstAmountItem(DataItemList items) throws DaoException;
    public DataItemList selectOrgBlComboBoxItem(SearchNonManifestedCargoOfGcParm parm) throws DaoException;
    public void deleteNonManifestedGccargoJobItem(NonManifestedCargoOfGcItem item) throws DaoException;
    public void insertNonManifestedGcCargoJobItem(NonManifestedCargoOfGcItem item) throws DaoException;
    public DataItemList isDeleteValidation(SearchNonManifestedCargoOfGcParm parm)throws DaoException;
	public void insertNonManifestRegister(InsertItemsBizParm insertItem)throws DaoException;
	public void updateNonManifestedGc(NonManifestedCargoOfGcItem item)throws DaoException;
	public DataItemList selectShiftInfor(SearchNonManifestedCargoOfGcParm parm)throws DaoException;
	public void deleteNonManifestedGcCargoMasterItem(NonManifestedCargoOfGcItem jobItem)throws DaoException;
}
