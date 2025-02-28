package com.tsb.most.biz.service.document;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.tsb.most.basebiz.dao.administrator.ICompanyRegisterDao;
import com.tsb.most.biz.dao.document.IRORODetailUploadListDao;
import com.tsb.most.biz.dataitem.document.RORODetailUploadListItem;
import com.tsb.most.biz.parm.document.SearchExcelFileUploadParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.config.AppContextPropertyLoader;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class RORODetailUploadList extends MOSTBaseService implements IRORODetailUploadList {
	private static String FORMTA_VEHICLE_MAKE = "Vehicle Make";
	private static String FORMAT_RORO_DETAIL = "RORO DETAIL";
	
	private IRORODetailUploadListDao rORODetailUploadListDao;
	private ICompanyRegisterDao companyRegisterDao;
	
	public void setrORODetailUploadListDao(IRORODetailUploadListDao rORODetailUploadListDao) {
		this.rORODetailUploadListDao = rORODetailUploadListDao;
	}

	public void setCompanyRegisterDao(ICompanyRegisterDao companyRegisterDao) {
		this.companyRegisterDao = companyRegisterDao;
	}

	public DataItemList selectRORODetailUploadList(SearchExcelFileUploadParm parm)throws BizException{
		String loadDataDir = AppContextPropertyLoader.properties.getProperty("file.excel.path");
		String fileName = String.format("%s%s", loadDataDir, parm.getFileName());
		DataItemList itemList = new DataItemList();
		
		List excelList = new ArrayList();
		
		FileInputStream fileIn = null;
		
		try {
			fileIn = new FileInputStream(fileName);
			XSSFWorkbook myWorkBook = new XSSFWorkbook(fileIn);
			
			Sheet exSheet = myWorkBook.getSheetAt(0);
			
			for (int i = 5; i < exSheet.getPhysicalNumberOfRows(); i++) {
				RORODetailUploadListItem dataItem = new RORODetailUploadListItem();
				XSSFRow tmpRow = (XSSFRow) exSheet.getRow(i);
			
				/*
				 * if(tmpRow != null && (tmpRow.getCell(3) == null ||
				 * tmpRow.getCell(3).toString().length() == 0) ||
				 * tmpRow.getCell(3).toString().equalsIgnoreCase(FORMAT_RORO_DETAIL)) {
				 * continue; }
				 * 
				 * if(tmpRow.getCell(1).toString().equalsIgnoreCase(FORMTA_VEHICLE_MAKE)) {
				 * continue; }
				 */
			//Fixing: 0131996: [SN detail] Can't upload Excel file in RORO tab 	
				if(tmpRow.getCell(3) == null || tmpRow.getCell(3).toString().length() == 0) {
					break;
				}
				
				dataItem.setBrandCd(getExcelSheetValue(tmpRow.getCell(1))); // Brand
				dataItem.setModelCd(getExcelSheetValue(tmpRow.getCell(2))); // Model
				dataItem.setUnitNo(getExcelSheetValue(tmpRow.getCell(3)).trim());// VIN Number
				dataItem.setNewYn(getExcelSheetValue(tmpRow.getCell(4)).trim()); // New/Used
				dataItem.setRoroMt(getExcelSheetValue(tmpRow.getCell(5))); // Weight
				dataItem.setCbm(getExcelSheetValue(tmpRow.getCell(6))); // Volume
				
				excelList.add(dataItem);
			}
			
			itemList.setCollection(excelList);
			itemList.setTotalRowCount(excelList.size());
		} catch (Exception ex) {
			throw new BizException(ex);
		}finally {
			if (fileIn != null) {
				File file = new File(fileName);
				file.delete();
				
				try {
					fileIn.close();
				} catch (Exception ex) {
					throw new BizException(ex);
				}
			}
		}
	
		return itemList;
	}
	
	/*--------------------------------------- Utility Method ----------------------------------------------*/
	private String getExcelSheetValue(XSSFCell cellData) {
		String rtnValue = "";
		
		if(cellData == null) {
			return rtnValue;
		}
		switch(cellData.getCellType()) {
			case XSSFCell.CELL_TYPE_FORMULA:
				cellData.setCellType(XSSFCell.CELL_TYPE_STRING);
				rtnValue = cellData.getStringCellValue();
				break;
			case XSSFCell.CELL_TYPE_NUMERIC:
				Double cellValue = cellData.getNumericCellValue();
				if( cellValue == cellValue.intValue() ) {
					// Integer
					rtnValue = Integer.toString( cellValue.intValue() );
				} else {
					// Double					
					rtnValue = Double.toString( cellValue );
				}
				break;
			case XSSFCell.CELL_TYPE_STRING:
				rtnValue = cellData.getStringCellValue();
				break;
			case XSSFCell.CELL_TYPE_BLANK:
				rtnValue = "";
				break;
			case XSSFCell.CELL_TYPE_ERROR:
				rtnValue = cellData.getCellFormula();
				break;
		}
		
		return rtnValue;
	}
}
