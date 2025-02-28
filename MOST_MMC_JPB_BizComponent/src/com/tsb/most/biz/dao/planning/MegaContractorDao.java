package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchMegaParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class MegaContractorDao extends BaseDao implements IMegaContractorDao {

	public DataItemList getMegaContractorList(SearchMegaParm parm) throws DaoException {
		return unifiedDao.getItemsPage("mega.selectMegaCnttList", parm);
	}

	@Override
	public DataItemList updateMegaOperItems(UpdateItemsBizParm parm) throws DaoException {
		try {
			DataItemList updateItems = parm.getUpdateItems();

			setNewVersion(updateItems);
			unifiedDao.updateItems(null, "mega.updateMegaOperItems", updateItems);
			setVersion(updateItems);

			return updateItems;

		} catch (Exception ex) {
			throw new DaoException(ex);
		}
	}

}
