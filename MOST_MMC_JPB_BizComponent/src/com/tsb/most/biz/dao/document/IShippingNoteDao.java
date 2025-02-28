package com.tsb.most.biz.dao.document;

import com.tsb.most.biz.dataitem.document.ShippingNoteItem;
import com.tsb.most.biz.parm.document.SearchManifestParm;
import com.tsb.most.biz.parm.document.SearchShippingNoteParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IShippingNoteDao {
    public DataItemList selectShippingNoteNoItems(SearchShippingNoteParm parm) throws DaoException;
    public DataItemList	selectShippingNoteList(SearchShippingNoteParm parm) throws DaoException;
    public DataItemList selectShippingNoteDtlList(SearchShippingNoteParm parm) throws DaoException;
    public DataItemList selectShippingNoteSumList(SearchShippingNoteParm parm) throws DaoException;
    public DataItemList selectBlNoList(SearchShippingNoteParm parm) throws DaoException;
    public DataItemList selectShippingNoteComboList(SearchShippingNoteParm parm) throws DaoException;
    public DataItemList selectCbrNoList(SearchShippingNoteParm parm)throws DaoException;
    public DataItemList selectDgSeq(SearchShippingNoteParm parm)throws DaoException;
    public DataItemList selectGateInList(SearchShippingNoteParm parm)throws DaoException;
    public DataItemList selectManifestList(SearchManifestParm parm)throws DaoException;
    public DataItemList selectManifestComboList(SearchManifestParm parm)throws DaoException;
    public DataItemList selectDGDeclarationItems(SearchShippingNoteParm parm)throws DaoException;
    public DataItemList selectValidationCode(SearchShippingNoteParm parm)throws DaoException;
	public DataItemList insertManifestItem(InsertItemsBizParm parm) throws DaoException;
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException;
	public void deleteItems(DeleteItemsBizParm parm) throws DaoException;
	
	public DataItemList insertShippingNoteDtlItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList insertTerminalHoldItems(InsertItemsBizParm parm) throws DaoException;
	
	public DataItemList updateShippingNoteDtlItems(UpdateItemsBizParm parm) throws DaoException;
	public void updateSnNoDtlItems(UpdateItemsBizParm parm) throws DaoException;
	
	public void deleteShippingNoteDtlItems(DeleteItemsBizParm parm) throws DaoException;
	public void deleteManifestItem(DeleteItemsBizParm parm) throws DaoException;
	
	public void updateShippingNoteAckItems(DataItemList items) throws DaoException;
    public void updateCgTpItems(DataItemList items) throws DaoException;

    public DataItemList selectPackageItems(SearchShippingNoteParm parm) throws DaoException;
    public void insertPackageItems(DataItem item) throws DaoException;
    public void deletePackageItems(DataItem item) throws DaoException;

    public DataItemList selectRoRoItems(SearchShippingNoteParm parm) throws DaoException;
    public void insertRoRoItems(DataItem item) throws DaoException;
    public void deleteRoRoItems(DataItem item) throws DaoException;
    
    public void updateShippingNoteAmountItems(DataItemList items) throws DaoException;
    public DataItemList selectExistsShipgNoteNo(SearchShippingNoteParm parm) throws DaoException;
	public void insertRoRoMSTItems(DataItem item)throws DaoException;
	public void deleteRoRoMSTItems(DataItem item) throws DaoException;
}
