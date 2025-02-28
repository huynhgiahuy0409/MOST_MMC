/**
*
* COPYRIGHT (ACT) 1988-2015 TOTAL SOFT BANK LTD ALL RIGHT RESERVED
*
* FILE NAME : com.pcs.dataitem.admin.UserItem.java
* CREATE ON : 2015. 4. 14.
* CLASS DESCRIPTION :
*
* 
* CHANGE REVISION
* --------------------------------------------------------------------------
* DATE            AUTHOR                       REVISION    
* --------------------------------------------------------------------------
* 2015. 4. 14.     Alex.Min             First release.
* --------------------------------------------------------------------------
*
*/
package com.tsb.most.basebiz.dataitem.vms;
import java.util.Date;

//import com.pcs.foundation.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItem;

public class VesselCargoItem extends DataItem {
	
	private String customerName;
	private String portName;
	private String cargoName;
	private int dischargeQuantity;
	private int loadQuantity;
	private int currentQuantity;
	private String transportUnit;
	
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getPortName() {
		return portName;
	}
	public void setPortName(String portName) {
		this.portName = portName;
	}
	public String getCargoName() {
		return cargoName;
	}
	public void setCargoName(String cargoName) {
		this.cargoName = cargoName;
	}
	public int getDischargeQuantity() {
		return dischargeQuantity;
	}
	public void setDischargeQuantity(int dischargeQuantity) {
		this.dischargeQuantity = dischargeQuantity;
	}
	public int getLoadQuantity() {
		return loadQuantity;
	}
	public void setLoadQuantity(int loadQuantity) {
		this.loadQuantity = loadQuantity;
	}
	public int getCurrentQuantity() {
		return currentQuantity;
	}
	public void setCurrentQuantity(int currentQuantity) {
		this.currentQuantity = currentQuantity;
	}
	public String getTransportUnit() {
		return transportUnit;
	}
	public void setTransportUnit(String transportUnit) {
		this.transportUnit = transportUnit;
	}
	

}
