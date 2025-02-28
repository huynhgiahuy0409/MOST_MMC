package com.tsb.most.basebiz.dao.codes;

import com.tsb.most.basebiz.parm.codes.SearchBrandModelCodeParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;


public interface IBrandModelCodeDao {
    public DataItemList selectBrandCodeItems(SearchBrandModelCodeParm parm) throws DaoException ; 
    public DataItemList selectModelCodeItems(SearchBrandModelCodeParm parm) throws DaoException ;
    public DataItemList brandCodeDuplicateCheck(SearchBrandModelCodeParm parm) throws DaoException;
    public DataItemList brandCodeRemoveCheck(SearchBrandModelCodeParm parm) throws DaoException;
    public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException;
    public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException;
    public DataItemList modelCodeDuplicateCheck(SearchBrandModelCodeParm parm) throws DaoException;
    public DataItemList insertModelCodeItems(InsertItemsBizParm parm) throws DaoException;
    public DataItemList updateModelCodeItems(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList deleteModelCodeItems(DeleteItemsBizParm parm) throws DaoException;
}    
