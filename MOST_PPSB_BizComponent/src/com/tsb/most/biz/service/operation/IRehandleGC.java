package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchCargoLoadingParm;
import com.tsb.most.biz.parm.operation.SearchRehandleGCParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IRehandleGC{
	public DataItemList selectCargoRehandlingComboList(SearchRehandleGCParm parm) throws BizException;
	public DataItemList selectCargoRhdLoadingList(SearchRehandleGCParm parm) throws BizException;
	public DataItemList selectRhdlShippingNoteComboList(SearchRehandleGCParm parm) throws BizException;
	public DataItemList selectRhdlGrNoComboList(SearchRehandleGCParm parm) throws BizException;
    public DataItemList selectCargoRehandlingPopupList(SearchRehandleGCParm parm) throws BizException;
    public DataItemList selectCargoRehandlingDetailList(SearchRehandleGCParm parm) throws BizException;
    public void insertCargoRehandlingItems(InsertItemsBizParm parm) throws BizException;
    public DataItemList processCargoRehandlingItem(UpdateItemsBizParm parm) throws BizException;
    public DataItemList processCargoRehandlingItemForUpdate(UpdateItemsBizParm parm) throws BizException;
    public DataItemList deleteCargoRehandlingItem(DeleteItemsBizParm parm) throws BizException;
    public DataItemList processCargoRhdlLoadingItem(UpdateItemsBizParm parm) throws BizException;
    public DataItemList selectCargoRehandlingList(SearchRehandleGCParm parm) throws BizException;
    public DataItemList selectCargoRhdlOperation(SearchRehandleGCParm parm) throws BizException;
    public DataItemList getCargoRhdlOperationNumbPage(SearchRehandleGCParm parm) throws BizException;
    public DataItemList selectCargoRehandlingSnBlComboList(SearchRehandleGCParm parm) throws BizException;
    public DataItemList selectCargoRhdlLoadingList(SearchCargoLoadingParm parm) throws BizException;
    public DataItemList selectCommodityGroupList(SearchRehandleGCParm parm) throws BizException;
    public DataItemList selectCommodtiyCodeList(SearchRehandleGCParm parm) throws BizException;

    public DataItemList insertItems(InsertItemsBizParm parm)throws BizException;
	public DataItemList updateItems(UpdateItemsBizParm parm)throws BizException;
	public DataItemList deleteItems(DeleteItemsBizParm parm)throws BizException;
}
