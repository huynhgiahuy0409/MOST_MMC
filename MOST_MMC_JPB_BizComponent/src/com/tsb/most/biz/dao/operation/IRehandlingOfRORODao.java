package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.dataitem.operation.RehandlingOfROROItem;
import com.tsb.most.biz.parm.operation.SearchRehandlingOfROROParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IRehandlingOfRORODao {
    public DataItemList selectBlComboBoxItems(SearchRehandlingOfROROParm parm) throws DaoException;
    public DataItemList selectShipgNoteNoComboBoxItems(SearchRehandlingOfROROParm parm) throws DaoException;
    public DataItemList selectOriginalCargoItems(SearchRehandlingOfROROParm parm) throws DaoException;
    public DataItemList selectRehandlingCargoItems(SearchRehandlingOfROROParm parm) throws DaoException;
    public String selectDeletingValidationYn(SearchRehandlingOfROROParm parm) throws DaoException;
    
    public DataItemList selectStackedUnitItems(SearchRehandlingOfROROParm parm) throws DaoException;
    public DataItemList selectRehandlingUnitItems(SearchRehandlingOfROROParm parm) throws DaoException;
    public String selectRhdlGroupNo(SearchRehandlingOfROROParm parm) throws DaoException;
    public String selectRhdlNo(SearchRehandlingOfROROParm parm) throws DaoException;
    
    public void deleteRehandlingUnitDamageItem(DataItem item) throws DaoException;
    public void deleteOriginalDamageUnitItem(DataItem item) throws DaoException;
    public void deleteRehandlingGoodsReceiptItem(DataItem item) throws DaoException;
    public void deleteOriginalUnitItem(DataItem item) throws DaoException;
    public void deleteRehandlingUnitItem(DataItem item) throws DaoException;
    public void deleteRehandlingItem(DataItem item) throws DaoException;
    public void deleteRehandlingShippingNoteItem(DataItem item) throws DaoException;
    public void deleteRehandlingCargoJobItem(DataItem item) throws DaoException;
    
    public void updateOriginalUnitItem(DataItem item) throws DaoException;
    public void insertRehandlingUnitItem(DataItem item) throws DaoException;
    public void insertRehandlingUnitDamageItem(DataItem item) throws DaoException;
    public void updateOriginalDamageUnitItem(DataItem item) throws DaoException;
    public void insertRehandlingGoodsReceiptItem(DataItem item) throws DaoException;
    public void insertRehandlingItem(DataItem item) throws DaoException;
    public void updateAmount4ShippingNoteItem(DataItem item) throws DaoException;
    public DataItemList selectNextVesselInfor(SearchRehandlingOfROROParm parm) throws DaoException;
	public DataItemList insertCargoRehandlingItems(InsertItemsBizParm insertRhdlParm) throws DaoException;
	public DataItemList insertJobItems(InsertItemsBizParm item) throws DaoException;
	public void insertJobDtlItemsOfRoRo(DataItem item) throws DaoException;
	public void updateAmount4CargoJobItem(DataItem item) throws DaoException;
	public Integer selectMaxSeq4JobDetail(RehandlingOfROROItem parm) throws DaoException;
}
