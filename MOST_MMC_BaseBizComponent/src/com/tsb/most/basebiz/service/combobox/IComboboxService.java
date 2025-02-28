package com.tsb.most.basebiz.service.combobox;

import com.tsb.most.basebiz.parm.combobox.SearchComboBoxServiceParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IComboboxService {
	 public DataItemList selectComboBox(SearchComboBoxServiceParm parm) throws BizException;
	 public DataItemList selectBrandComboBoxItemsHHT(SearchComboBoxServiceParm parm) throws BizException;
	//s-OPR-015: Gate Operation – Modification
	 public DataItemList getSuggestionList(SearchComboBoxServiceParm parm) throws BizException;
	//e-OPR-015: Gate Operation – Modification
}
