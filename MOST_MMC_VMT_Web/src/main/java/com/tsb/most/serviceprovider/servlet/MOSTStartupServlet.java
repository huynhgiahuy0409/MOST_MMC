package com.tsb.most.serviceprovider.servlet;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Properties;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;

import org.jdom.Attribute;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.DispatcherServlet;

import com.tsb.most.basebiz.parm.parameters.SearchCommonParameterSettingBizParm;
import com.tsb.most.common.service.CacheService;
import com.tsb.most.framework.config.AppContextPropertyLoader;
import com.tsb.most.framework.config.ServerConfigUtil;
import com.tsb.most.framework.config.WebAppContextManager;
import com.tsb.most.framework.constants.CacheServiceConstants;
import com.tsb.most.framework.dataitem.ComboItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.dataitem.ListCacheItem;
import com.tsb.most.framework.log.CommonLogUtil;
import com.tsb.most.framework.security.CipherProvider;
import com.tsb.most.framework.serviceprovider.pojo.ServiceProviderPojo;

import ch.qos.logback.classic.LoggerContext;
import ch.qos.logback.classic.joran.JoranConfigurator;
import ch.qos.logback.core.joran.spi.JoranException;
import ch.qos.logback.core.util.StatusPrinter;

public class MOSTStartupServlet extends DispatcherServlet {

	protected static final String CONF_ROOT_PATH = "WEB-INF";
	private String appServerConfigPropPath = "";
	private String logbackConfigurationFile = "logback_most.xml";

	protected void setLog4jConfigurationFile(String fileName) {
		this.logbackConfigurationFile = fileName;
	}
	@Override
    public void init(ServletConfig config) throws ServletException {
        // TODO Auto-generated method stub
		super.init(config);
//      System.out.println("In suresh dispatcher servlet init method");
		setLog4jConfigurationFile("logback_most.xml");
		setSystemClassPath();
		
		try{	
			loadConfigFile();
			loadLogConfigure();
		}catch(IOException ioe){
			System.out.println("Failed to load cofiguration file!" + ioe.toString());
		}
		
		String localCacheInfoPropPath = "";
		localCacheInfoPropPath = CONF_ROOT_PATH + "/localCache/"+ this.getInitParameter("most_cacheservice_config_filename");
//		not used code in kmdc cfs 		
//		String contextRootInfoPropPath = "";
//		contextRootInfoPropPath = CONF_ROOT_PATH + "/localCache/" + this.getInitParameter("webip_contextservice_config_filename");

		try {
			if (localCacheInfoPropPath != null)
				loadLocalCacheInfo(localCacheInfoPropPath);
			
//			if(contextRootInfoPropPath != null){
//				loadContextRootCacheInfo(contextRootInfoPropPath);
//			}
		} catch (IOException ioe) {
			ioe.printStackTrace();
		}
		try{
			System.setProperty("reportPath", ServerConfigUtil
					.getRealPath(this.getServletContext()) + File.separator + 
					AppContextPropertyLoader.properties.get("reportPath"));
		
		}catch(Exception e){
			e.printStackTrace();
		}
		
		//execute WebApp 
		WebAppContextManager.getApplicationContext(this.getServletContext());
		setParameterSettings();	
//		insertServerInfo();
		updateBranchName();
         
    }
	private void updateBranchName(){
		DataItemList cacheItems = CacheService.getInstance().getCacheItems();
		DataItemList branchCodeList = new DataItemList();
		ListCacheItem cacheItem = (ListCacheItem) cacheItems.get(CacheServiceConstants.BRANCH_CODE);
		if(cacheItem != null){
			branchCodeList = (DataItemList)cacheItem.getDataItemList();
			
			for(int i = 0 ; i<branchCodeList.size(); i ++)
			{
				ComboItem branchCode = (ComboItem) branchCodeList.get(i);
				String name = (String) AppContextPropertyLoader.properties.get("jdbc." +branchCode.getKey().toLowerCase() +".name");
				if(name!=null)
				{
					branchCode.setValue(name);
				}
			}
		}
	}
	
   private void loadConfigFile() throws IOException {

    	setConfigPath();
		setPropertyConfigure();
	}
   private void loadLogConfigure() throws IOException {
		
		String configPath = System.getProperty("configPath");
		if(configPath.indexOf("WEB-INF") != -1)
			configPath = System.getProperty("configPath") + File.separator + "config";
		String logbackPath = configPath + File.separator + logbackConfigurationFile;
		CommonLogUtil.out("**************************"+logbackPath);
		System.out.println("--------- logback configuration file name : "	+ logbackPath );
		
		LoggerContext context = (LoggerContext) LoggerFactory.getILoggerFactory();
		try {
	
	      JoranConfigurator configurator = new JoranConfigurator();
	      configurator.setContext(context);
	      // Call context.reset() to clear any previous configuration, e.g. default 
	      // configuration. For multi-step configuration, omit calling context.reset().
	      context.reset(); 
	      configurator.doConfigure(logbackPath);
	    } catch (JoranException je) {
	      je.printStackTrace();
	    }
		StatusPrinter.print(context);
//		if(log4jConfigurationFile != null)
//			Log4jConfigurer.initLogging(log4jPath);
	}
	private void setConfigPath() {
		// TODO Auto-generated method stub
		String enableExternal = this.getServletContext().getInitParameter("enable_appserverconfig_external");
		;
		System.out.println(this.getServletContext().getInitParameter("enable_appserverconfig_external"));
		if (enableExternal.equals("Y") && getWebSpherePath() != null) {
			appServerConfigPropPath = getWebSpherePath();
		} else if (enableExternal.equals("Y") && getExternalPath() != null) {
			appServerConfigPropPath = getExternalPath();
		} else {
			appServerConfigPropPath = this.getServletContext().getRealPath("/") + File.separator + CONF_ROOT_PATH
					+ File.separator + "config";
			System.setProperty("configPath", this.getServletContext().getRealPath("/") + CONF_ROOT_PATH);
		}

	}

	private void setPropertyConfigure() {
		// //load server-application.properties
		// File file = new File(appServerConfigPropFilePath);
		Properties properties = new Properties();
		InputStream ios = null;
		String appServerConfigPropFilePath = appServerConfigPropPath + File.separator
				+ this.getServletContext().getInitParameter("appserverconfig_filename");
		try {
			ios = new FileInputStream(appServerConfigPropFilePath);
			properties.load(ios);
			AppContextPropertyLoader.properties = properties;

			if (AppContextPropertyLoader.properties.getProperty("db.type") == null) {
				AppContextPropertyLoader.properties.setProperty("db.type", "sql");
			}

			if (ios != null) {
				ios.close();
			}
		} catch (FileNotFoundException fne) {
		} catch (IOException ioe) {
		}
	}

	private void loadLocalCacheInfo(String propertyFilePath) throws IOException {

		InputStream ios = null;
		if (propertyFilePath.indexOf(CONF_ROOT_PATH) == -1)
			ios = new FileInputStream(new File(propertyFilePath));

		else {
			ios = getServletContext().getResourceAsStream("/" + propertyFilePath);
		}

		DataItemList cacheItems = parseCacheXMLList(ios);
		CommonLogUtil.out("//[Sencha] CacheItems [" + cacheItems.getCollection().size());
		CacheService.getInstance().setCacheItems(cacheItems);
	}

	private void loadContextRootCacheInfo(String propertyFilePath) throws IOException {

		InputStream ios = null;
		if (propertyFilePath.indexOf(CONF_ROOT_PATH) == -1)
			ios = new FileInputStream(new File(propertyFilePath));

		else {
			ios = getServletContext().getResourceAsStream("/" + propertyFilePath);
		}

		DataItemList cacheItems = parseCacheXMLList(ios);
		CacheService.getInstance().setContextRootItems(cacheItems);
	}

	public DataItemList parseCacheXMLList(InputStream ios) {

		DataItemList items = new DataItemList();

		try {
			SAXBuilder oBuilder = new SAXBuilder();
			Document oDoc = oBuilder.build(ios);

			Element xmlRoot = oDoc.getRootElement(); // root element
			List<?> trackListList = xmlRoot.getChildren(); // root element ->
															// List

			Element trackListEle = null; // trackList
			for (int i = 0; i < trackListList.size(); i++) { // trackList
				trackListEle = (Element) trackListList.get(i);

				ListCacheItem listCacheItem = new ListCacheItem();

				List<?> attList = trackListEle.getAttributes();
				for (int j = 0; j < attList.size(); j++) { // track
					Attribute attribute = (Attribute) attList.get(j);

					listCacheItem.setKey(attribute.getValue());
				}

				DataItemList comboItemList = new DataItemList();

				List<?> elementList = trackListEle.getContent();
				for (int j = 0; j < elementList.size(); j++) {
					if (elementList.get(j) instanceof Element) {
						ComboItem comboItem = new ComboItem();

						Element element = (Element) elementList.get(j);
						List<?> subAttList = element.getAttributes();
						for (int k = 0; k < subAttList.size(); k++) {
							Attribute attribute = (Attribute) subAttList.get(k);

							if (attribute.getName().equals("key")) {
								comboItem.setKey(attribute.getValue());
							} else if (attribute.getName().equals("value")) {
								comboItem.setValue(attribute.getValue());
							}
						}

						comboItemList.add(comboItem);
					}
				}

				listCacheItem.setDataItemList(comboItemList);
				items.add(listCacheItem);
			}
		} catch (JDOMException je) {
			je.printStackTrace();
		} catch (IOException io) {
			io.printStackTrace();
		}

		return items;
	}

	private void setParameterSettings() {
		System.out.println("setParametrsSettings before WebAppContextManager");
		WebAppContextManager.getApplicationContext(this.getServletContext());
		
		System.out.println("setParametrsSettings after WebAppContextManager");
		SearchCommonParameterSettingBizParm searchParm = new SearchCommonParameterSettingBizParm();
		// searchParm.setUsingSession(CommonConstants.Y); ������?
		String serviceID = "SM.parametersetting.searchItems";

		searchParm.getBizParmMetaInfo().setServiceID(serviceID);
		
		// added by Brian (default branch, 2020/11/25)
		searchParm.setBranchCode(AppContextPropertyLoader.properties.getProperty("defaultBranch")); 
		
		WebAppContextManager.getApplicationContext(this.getServletContext());

		ServiceProviderPojo serviceProviderPojo = new ServiceProviderPojo();
		DataItemList items = (DataItemList) serviceProviderPojo.execute(searchParm, this.getServletContext());

		CacheService.getInstance().setParameterSettings(items);
		
	}

	private void setSystemClassPath() {
		System.setProperty("realPath", this.getServletContext().getRealPath("/")); //

	}

	private String getWebSpherePath() {

		try {

			InitialContext initCtx = new InitialContext();
			String defaultDirectory = (String) initCtx
					.lookup(this.getServletContext().getInitParameter("appserverconfig_filepath"));
			String appServerConfigPropName = this.getServletContext().getInitParameter("appserverconfig_filename");

			String appServerConfigPropFilePath = defaultDirectory + File.separator + appServerConfigPropName;

			File file = new File(appServerConfigPropFilePath);
			if (file.exists()) {
				CipherProvider.isWebSphere = true;
				return defaultDirectory;
			}

		} catch (NamingException e) {
			System.out.println(this.getServletContext().getInitParameter("appserverconfig_filepath")
					+ " is not bound in this Context");
		}

		return null;

	}

	private String getExternalPath() {

		System.setProperty("configPath",
				System.getProperty("user.dir") + File.separator + this.getServletContext().getInitParameter("config"));
		String defaultDirectory = System.getProperty("configPath");
		String appServerConfigPropName = this.getServletContext().getInitParameter("appserverconfig_filename");

		String appServerConfigPropFilePath = defaultDirectory + File.separator + appServerConfigPropName;

		File file = new File(appServerConfigPropFilePath);
		if (file.exists()) {
			return defaultDirectory;
		} else {
			return null;
		}
	}

	private void setLogPathSystemProperty(String appServerConfigPropPath) {
		File directory = new File(appServerConfigPropPath);
		String logPath = directory.getParent() + File.separator + "logs";
		// 20160313byAnna) - replace variable renamed.
		String logFileName = logbackConfigurationFile.replace("xml", "log");

		System.setProperty("log_file", logPath + File.separator + logFileName);
	}
}
