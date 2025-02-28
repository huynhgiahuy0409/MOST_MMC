package com.tsb.most.basebiz.service.configuration;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.tsb.most.basebiz.dao.codes.ICodeMasterDao;
import com.tsb.most.basebiz.dao.configuration.IAllowanceConfigurationDao;
import com.tsb.most.basebiz.dataitem.configuration.AllowanceConfigurationItem;
import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.basebiz.parm.configuration.SearchAllowanceConfigurationParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class AllowanceConfiguration extends MOSTBaseService implements IAllowanceConfiguration {
	private IAllowanceConfigurationDao allowanceConfigurationDao;
	private ICodeMasterDao codeMasterDao;

	public void setAllowanceConfigurationDao(IAllowanceConfigurationDao allowanceConfigurationDao) {
		this.allowanceConfigurationDao = allowanceConfigurationDao;
	}

	public void setCodeMasterDao(ICodeMasterDao codeMasterDao) {
		this.codeMasterDao = codeMasterDao;
	}

	@SuppressWarnings("unchecked")
	@Override
	public DataItemList getAllowanceConfigurationItems(SearchAllowanceConfigurationParm parm) throws BizException {
		DataItemList returnList = new DataItemList();
		AllowanceConfigurationItem returnItem = new AllowanceConfigurationItem();
		SearchCodeMasterParm codeMasterParm = new SearchCodeMasterParm();
		codeMasterParm.setLcd("MT");
		codeMasterParm.setMcd("ALTP");
		codeMasterParm.setCol1("RT");
		
		DataItemList allowanceTypeList = codeMasterDao.selectCodeMasterList(codeMasterParm);
		returnItem.setAllowanceType(allowanceTypeList.getCollection());
		
		codeMasterParm.setLcd("CM");
		codeMasterParm.setMcd("ROLECD");
		codeMasterParm.setCol1(null);
		
		DataItemList roleList = codeMasterDao.selectCodeMasterList(codeMasterParm);
		returnItem.setRoleList(roleList.getCollection());
		
		codeMasterParm.setMcd("GRADE");
		
		DataItemList gradeList = codeMasterDao.selectCodeMasterList(codeMasterParm);
		returnItem.setGradeList(gradeList.getCollection());
		
		
		DataItemList allowanceItems = allowanceConfigurationDao.getAllowanceConfigurationItems(parm);
		Map<String, List<AllowanceConfigurationItem>> allowanceTypeMap = (Map<String, List<AllowanceConfigurationItem>>) 
				allowanceItems 
					.getCollection()
					.stream()
					.collect(Collectors.groupingBy(AllowanceConfigurationItem::getAppType));

		returnItem.setAllowanceRateList(allowanceTypeMap.get("ALRT"));
		returnItem.setMultiSkillList(allowanceTypeMap.get("MUSK"));
		returnItem.setIncentiveList(allowanceTypeMap.get("INCE"));
		returnItem.setFuelList(allowanceTypeMap.get("FUEL"));
		returnItem.setTonnageList(allowanceTypeMap.get("TONN"));
		returnItem.setDayoffList(allowanceTypeMap.get("DOFF"));
		returnItem.setBonusRmList(allowanceTypeMap.get("BNRM"));

		returnList.add(returnItem);

		return returnList;
	}

	@Override
	public DataItemList getStaffItem(SearchAllowanceConfigurationParm parm) throws BizException {
		return allowanceConfigurationDao.getStaffItem(parm);
	}

	@Override
	public DataItemList insertItem(InsertItemsBizParm parm) throws BizException {
		return allowanceConfigurationDao.insertItem(parm);
	}

	@Override
	public DataItemList updateItem(UpdateItemsBizParm parm) throws BizException {
		return allowanceConfigurationDao.updateItem(parm);
	}
	
	@Override
	public DataItemList deleteItem(DeleteItemsBizParm parm) throws BizException {
		return allowanceConfigurationDao.deleteItem(parm);
	}
}
