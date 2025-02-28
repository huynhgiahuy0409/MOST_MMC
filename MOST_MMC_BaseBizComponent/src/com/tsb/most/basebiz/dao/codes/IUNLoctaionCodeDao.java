package com.tsb.most.basebiz.dao.codes;

import com.tsb.most.basebiz.parm.codes.SearchCountryCodeParm;
import com.tsb.most.basebiz.parm.codes.SearchUNLocationCodeParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IUNLoctaionCodeDao {
	
	public DataItemList selectUNLocationCode(SearchUNLocationCodeParm parm) throws DaoException;
	public DataItemList selectUNLocationCodeDtl(SearchUNLocationCodeParm parm) throws DaoException;
	public DataItemList selectCountryCodes(SearchCountryCodeParm parm) throws DaoException;
	public DataItemList countryCodeDuplicateCheck(SearchCountryCodeParm parm) throws DaoException;
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException;
}
