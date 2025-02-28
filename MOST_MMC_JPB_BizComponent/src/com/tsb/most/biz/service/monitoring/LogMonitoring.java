package com.tsb.most.biz.service.monitoring;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Date;

import org.apache.commons.io.IOUtils;

import com.tsb.most.basebiz.component.fileupload.IFileUpload;
import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.basebiz.parm.fileupload.SearchFileUploadParm;
import com.tsb.most.biz.dao.operation.IDamageDimensionCheckDao;
import com.tsb.most.biz.parm.operation.SearchDamageDimensionCheck;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.config.AppContextPropertyLoader;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class LogMonitoring extends MOSTBaseService implements ILogMonitoring{
	@Override
	public DataItemList selectListFileMOST(SearchDamageDimensionCheck parm) throws BizException {
		DataItemList resultList = new DataItemList();
		String sourceLocation = AppContextPropertyLoader.properties.getProperty("LOG_PATH_MOST");

		File logDirectory = new File(sourceLocation);
		File[] logListFile = logDirectory.listFiles();
		int cntFile = logListFile.length;

		// Sort the files by last modified date in descending order
	    Arrays.sort(logListFile, new Comparator<File>() {
	        public int compare(File file1, File file2) {
	            long lastModified1 = file1.lastModified();
	            long lastModified2 = file2.lastModified();
	            return Long.compare(lastModified2, lastModified1);
	        }
	    });
		
		for (int cnt = 0; cnt < cntFile; cnt++) {
			if (logListFile[cnt].isFile()) {
				FileUploadItem item = new FileUploadItem();
				item.setFileName(logListFile[cnt].getName());
				item.setUfileName(logListFile[cnt].getName());
				
				// Get the last modified date of the file
	            long lastModified = logListFile[cnt].lastModified();
	            Date lastModifiedDate = new Date(lastModified);
				
				item.setModifiedTime(lastModifiedDate);
				item.setFileSize(String.valueOf(logListFile[cnt].length() / 1024));

				resultList.add(item);
			}
		}
		
		return resultList;
	}
	
	@Override
	public DataItemList selectListFileWB(SearchDamageDimensionCheck parm) throws BizException {
		DataItemList resultList = new DataItemList();
		String sourceLocation = AppContextPropertyLoader.properties.getProperty("LOG_PATH_WB");

		File logDirectory = new File(sourceLocation);
		File[] logListFile = logDirectory.listFiles();
		int cntFile = logListFile.length;

		// Sort the files by last modified date in descending order
	    Arrays.sort(logListFile, new Comparator<File>() {
	        public int compare(File file1, File file2) {
	            long lastModified1 = file1.lastModified();
	            long lastModified2 = file2.lastModified();
	            return Long.compare(lastModified2, lastModified1);
	        }
	    });
		
		for (int cnt = 0; cnt < cntFile; cnt++) {
			if (logListFile[cnt].isFile()) {
				FileUploadItem item = new FileUploadItem();
				item.setFileName(logListFile[cnt].getName());
				item.setUfileName(logListFile[cnt].getName());
				
				// Get the last modified date of the file
	            long lastModified = logListFile[cnt].lastModified();
	            Date lastModifiedDate = new Date(lastModified);
				
				item.setModifiedTime(lastModifiedDate);
				item.setFileSize(String.valueOf(logListFile[cnt].length() / 1024));

				resultList.add(item);
			}
		}
		
		return resultList;
	}
	
	@Override
	public DataItemList selectListFileHG(SearchDamageDimensionCheck parm) throws BizException {
		DataItemList resultList = new DataItemList();
		String sourceLocation = AppContextPropertyLoader.properties.getProperty("LOG_PATH_HG");

		File logDirectory = new File(sourceLocation);
		File[] logListFile = logDirectory.listFiles();
		int cntFile = logListFile.length;

		// Sort the files by last modified date in descending order
	    Arrays.sort(logListFile, new Comparator<File>() {
	        public int compare(File file1, File file2) {
	            long lastModified1 = file1.lastModified();
	            long lastModified2 = file2.lastModified();
	            return Long.compare(lastModified2, lastModified1);
	        }
	    });
		
		for (int cnt = 0; cnt < cntFile; cnt++) {
			if (logListFile[cnt].isFile()) {
				FileUploadItem item = new FileUploadItem();
				item.setFileName(logListFile[cnt].getName());
				item.setUfileName(logListFile[cnt].getName());
				
				// Get the last modified date of the file
	            long lastModified = logListFile[cnt].lastModified();
	            Date lastModifiedDate = new Date(lastModified);
				
				item.setModifiedTime(lastModifiedDate);
				item.setFileSize(String.valueOf(logListFile[cnt].length() / 1024));

				resultList.add(item);
			}
		}
		
		return resultList;
	}
	
	//private String logFilePath = "C:\\Temp\\";
	@Override
	public DataItemList selectFileDownLoadMOST(SearchFileUploadParm parm) throws BizException, IOException {
		DataItemList returnItem = new DataItemList();
		String logFilePath = AppContextPropertyLoader.properties.getProperty("LOG_PATH_MOST");
		
		FileUploadItem fileUploadItem = new FileUploadItem();
		fileUploadItem.setFileName(parm.getUfileNm());
		String loadDataDir = logFilePath + "\\";
		String ufileName = parm.getUfileNm();

		String fileName = String.format("%s%s", loadDataDir, ufileName);
		File file = new File(fileName);
		
		InputStream in = null;
		try {
			in = new FileInputStream(file);
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		fileUploadItem.setContent(IOUtils.toString(in, "ISO-8859-1"));
		returnItem.add(fileUploadItem);
		// }

		return returnItem;
	}
	
	@Override
	public DataItemList selectFileDownLoadWB(SearchFileUploadParm parm) throws BizException, IOException {
		DataItemList returnItem = new DataItemList();
		String logFilePath = AppContextPropertyLoader.properties.getProperty("LOG_PATH_WB");
		
		FileUploadItem fileUploadItem = new FileUploadItem();
		fileUploadItem.setFileName(parm.getUfileNm());
		String loadDataDir = logFilePath + "\\";
		String ufileName = parm.getUfileNm();

		String fileName = String.format("%s%s", loadDataDir, ufileName);
		File file = new File(fileName);
		
		InputStream in = null;
		try {
			in = new FileInputStream(file);
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		fileUploadItem.setContent(IOUtils.toString(in, "ISO-8859-1"));
		returnItem.add(fileUploadItem);
		// }

		return returnItem;
	}
	
	@Override
	public DataItemList selectFileDownLoadHG(SearchFileUploadParm parm) throws BizException, IOException {
		DataItemList returnItem = new DataItemList();
		String logFilePath = AppContextPropertyLoader.properties.getProperty("LOG_PATH_HG");
		
		FileUploadItem fileUploadItem = new FileUploadItem();
		fileUploadItem.setFileName(parm.getUfileNm());
		String loadDataDir = logFilePath + "\\";
		String ufileName = parm.getUfileNm();

		String fileName = String.format("%s%s", loadDataDir, ufileName);
		File file = new File(fileName);
		
		InputStream in = null;
		try {
			in = new FileInputStream(file);
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		fileUploadItem.setContent(IOUtils.toString(in, "ISO-8859-1"));
		returnItem.add(fileUploadItem);
		// }

		return returnItem;
	}
	
}
