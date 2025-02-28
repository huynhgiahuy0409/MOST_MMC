package com.tsb.most.basebiz.dataitem.vms;

//import com.pcs.foundation.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItem;

public class VesselImageItem extends DataItem {

	private String vesselCode;
	private String atchFileName;
	private String maskedFileName;
	private String mainImage;
	
	
	
	public String getVesselCode() {
		return vesselCode;
	}
	public void setVesselCode(String vesselCode) {
		this.vesselCode = vesselCode;
	}
	public String getAtchFileName() {
		return atchFileName;
	}
	public void setAtchFileName(String atchFileName) {
		this.atchFileName = atchFileName;
	}
	public String getMaskedFileName() {
		return maskedFileName;
	}
	public void setMaskedFileName(String maskedFileName) {
		this.maskedFileName = maskedFileName;
	}
	public String getMainImage() {
		return mainImage;
	}
	public void setMainImage(String mainImage) {
		this.mainImage = mainImage;
	}
	
	

}
