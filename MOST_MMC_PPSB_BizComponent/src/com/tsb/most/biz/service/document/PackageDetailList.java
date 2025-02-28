package com.tsb.most.biz.service.document;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.tsb.most.biz.dataitem.document.PackageDetailListItem;
import com.tsb.most.biz.parm.document.SearchExcelFileUploadParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.config.AppContextPropertyLoader;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class PackageDetailList extends MOSTBaseService implements IPackageDetailList {
	private static String FORMAT_MANDATORY = "Mandatory";
	private static String FORMAT_PACKAGE_NO = "Package No";
	
	public DataItemList selectPackageDetailList(SearchExcelFileUploadParm parm)throws BizException{
		String loadDataDir = AppContextPropertyLoader.properties.getProperty("file.excel.path");
		String fileName = String.format("%s%s", loadDataDir, parm.getFileName());
		DataItemList itemList = new DataItemList();
		
		List excelList = new ArrayList();
		
		FileInputStream fileIn = null;
		
		try {
			fileIn = new FileInputStream(fileName);
			XSSFWorkbook myWorkBook = new XSSFWorkbook(fileIn);
			
			Sheet exSheet = myWorkBook.getSheetAt(0);
			
			for (int i = 0; i < exSheet.getPhysicalNumberOfRows() + 1; i++) {
				PackageDetailListItem dataItem = new PackageDetailListItem();
				XSSFRow tmpRow = (XSSFRow) exSheet.getRow(i);

				if(tmpRow == null || (tmpRow.getCell(0) == null || tmpRow.getCell(0).toString().length() == 0) || tmpRow.getCell(0).toString().equalsIgnoreCase(FORMAT_MANDATORY) || tmpRow.getCell(0).toString().equalsIgnoreCase(FORMAT_PACKAGE_NO)) {
					continue;
				}
				
				dataItem.setPkgNo(getExcelSheetValue(tmpRow.getCell(0))); // Package No
				dataItem.setPkgDesc(getExcelSheetValue(tmpRow.getCell(1))); // Package Description
				dataItem.setPkgMt(getExcelSheetValue(tmpRow.getCell(2)));// Gross Weight((MT)
				dataItem.setPkgM3(getExcelSheetValue(tmpRow.getCell(3))); // Measurement(M3)
				dataItem.setLength(getExcelSheetValue(tmpRow.getCell(4))); // Length(CM)
				dataItem.setWidth(getExcelSheetValue(tmpRow.getCell(5))); // Width(CM)
				dataItem.setHeight(getExcelSheetValue(tmpRow.getCell(6))); // Height(CM)
				dataItem.setPkgRmk(getExcelSheetValue(tmpRow.getCell(7))); // Remark
				
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
