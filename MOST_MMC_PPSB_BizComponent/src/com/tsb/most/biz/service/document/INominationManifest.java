package com.tsb.most.biz.service.document;

import com.tsb.most.biz.parm.document.SearchNominationManifestParm;
import com.tsb.most.biz.parm.document.SearchValidationCodeParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface INominationManifest {
	public void processNominationManifestItem(UpdateItemsBizParm parm) throws BizException;
	public DataItemList getNominationManifestList(SearchNominationManifestParm parm) throws BizException;
    public void insertNominationManifestItems(UpdateItemsBizParm parm) throws BizException;
    public DataItemList getValidationCode(SearchValidationCodeParm parm) throws BizException;
    public void applyFileUploadItems(UpdateItemsBizParm parm) throws BizException;
}
