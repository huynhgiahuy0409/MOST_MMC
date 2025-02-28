package com.tsb.most.biz.dataitem.operation;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

public class VesselDelayItem extends DataItem {
    private String isSelected;
    private String vslCallId;
    private String scn;
    private String stDt;
    private String endDt;
    private String inptDt;
    private int seq;
    private String shftId;
    private String shftNm;
    private String hatchNo;
    private String hatchDrtCd;
    private String eqNo;
    private String rsnCd;
    private String acptYN;
    private String rmk;
    private String totalHRS;
    private String rsnCdNm;
    private String userId;
    private String eqNm;
    private String no;
    private String comodityCode;
    private String verifyBy;
    private String verifyDate;
    private String searchType;
    private String verifyStatus;
    private String crudFlag;
    private String scd;
    private String scdNm;
    
    private List shiftList;
    private List hatchNoList;
    private List<Object> hatchNoList2;
    private List equipmenNoList;
    private List<Object> equipmenNoList2;
    
    private ArrayList<VesselDelayItem> items;
    
    private String itChk;
    private String contractor;
    private String vslNm;
    private String atb;
    private String atw;
    private String atc;
    private String atu;
    private String CgTpCd;
    private String a;
    private String b;
    private String c;
    private String d;
    private String e;
    private String f;
    private String g;
    private String h;
    private String i;
    private String j;
    private String k;
    private String l;
    private String m;
    private String n;
    private String o;
    private String p;
    private String q;
    private String r;

    public String getItChk() {
		return itChk;
	}
	public void setItChk(String itChk) {
		this.itChk = itChk;
	}
	public ArrayList<VesselDelayItem> getItems() {
		return items;
	}
	public void setItems(ArrayList<VesselDelayItem> items) {
		this.items = items;
	}
	public List getEquipmenNoList() {
		return equipmenNoList;
	}
	public void setEquipmenNoList(List equipmenNoList) {
		this.equipmenNoList = equipmenNoList;
	}
	public List getShiftList() {
		return shiftList;
	}
	public void setShiftList(List shiftList) {
		this.shiftList = shiftList;
	}
	public List getHatchNoList() {
		return hatchNoList;
	}
	public void setHatchNoList(List hatchNoList) {
		this.hatchNoList = hatchNoList;
	}

    public String getIsSelected() {
        return isSelected;
    }
    public void setIsSelected(String isSelected) {
        this.isSelected = isSelected;
    }
    public String getCrudFlag() {
        return crudFlag;
    }
    public void setCrudFlag(String crudFlag) {
        this.crudFlag = crudFlag;
    }
    public String getSearchType() {
        return searchType;
    }
    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }
    public String getComodityCode() {
        return comodityCode;
    }
    public void setComodityCode(String comodityCode) {
        this.comodityCode = comodityCode;
    }
    /**
     * @return Returns the a.
     */
    public String getA() {
        return a;
    }
    /**
     * @param a The a to set.
     */
    public void setA(String a) {
        this.a = a;
    }
    /**
     * @return Returns the b.
     */
    public String getB() {
        return b;
    }
    /**
     * @param b The b to set.
     */
    public void setB(String b) {
        this.b = b;
    }
    /**
     * @return Returns the c.
     */
    public String getC() {
        return c;
    }
    /**
     * @param c The c to set.
     */
    public void setC(String c) {
        this.c = c;
    }
    /**
     * @return Returns the crud.
     */
    public String getCrud() {
        return crud;
    }
    /**
     * @return Returns the d.
     */
    public String getD() {
        return d;
    }
    /**
     * @param d The d to set.
     */
    public void setD(String d) {
        this.d = d;
    }
    /**
     * @return Returns the e.
     */
    public String getE() {
        return e;
    }
    /**
     * @param e The e to set.
     */
    public void setE(String e) {
        this.e = e;
    }
    /**
     * @return Returns the f.
     */
    public String getF() {
        return f;
    }
    /**
     * @param f The f to set.
     */
    public void setF(String f) {
        this.f = f;
    }
    /**
     * @return Returns the g.
     */
    public String getG() {
        return g;
    }
    /**
     * @param g The g to set.
     */
    public void setG(String g) {
        this.g = g;
    }
    /**
     * @return Returns the h.
     */
    public String getH() {
        return h;
    }
    /**
     * @param h The h to set.
     */
    public void setH(String h) {
        this.h = h;
    }
    /**
     * @return Returns the i.
     */
    public String getI() {
        return i;
    }
    /**
     * @param i The i to set.
     */
    public void setI(String i) {
        this.i = i;
    }
    /**
     * @return Returns the j.
     */
    public String getJ() {
        return j;
    }
    /**
     * @param j The j to set.
     */
    public void setJ(String j) {
        this.j = j;
    }
    /**
     * @return Returns the k.
     */
    public String getK() {
        return k;
    }
    /**
     * @param k The k to set.
     */
    public void setK(String k) {
        this.k = k;
    }
    /**
     * @return Returns the l.
     */
    public String getL() {
        return l;
    }
    /**
     * @param l The l to set.
     */
    public void setL(String l) {
        this.l = l;
    }
    /**
     * @return Returns the m.
     */
    public String getM() {
        return m;
    }
    /**
     * @param m The m to set.
     */
    public void setM(String m) {
        this.m = m;
    }
    /**
     * @return Returns the n.
     */
    public String getN() {
        return n;
    }
    /**
     * @param n The n to set.
     */
    public void setN(String n) {
        this.n = n;
    }
    /**
     * @return Returns the o.
     */
    public String getO() {
        return o;
    }
    /**
     * @param o The o to set.
     */
    public void setO(String o) {
        this.o = o;
    }
    /**
     * @return Returns the p.
     */
    public String getP() {
        return p;
    }
    /**
     * @param p The p to set.
     */
    public void setP(String p) {
        this.p = p;
    }
    /**
     * @return Returns the q.
     */
    public String getQ() {
        return q;
    }
    /**
     * @param q The q to set.
     */
    public void setQ(String q) {
        this.q = q;
    }
    /**
     * @return Returns the r.
     */
    public String getR() {
        return r;
    }
    /**
     * @param r The r to set.
     */
    public void setR(String r) {
        this.r = r;
    }
    
    public String getNo() {
        return no;
    }
    public void setNo(String no) {
        this.no = no;
    }
    public String getEqNm() {
        return eqNm;
    }
    public void setEqNm(String eqNm) {
        this.eqNm = eqNm;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public String getAcptYN() {
        return acptYN;
    }
    public void setAcptYN(String acptYN) {
        this.acptYN = acptYN;
    }
    public String getEndDt() {
        return endDt;
    }
    public void setEndDt(String endDt) {
        this.endDt = endDt;
    }
    public String getEqNo() {
        return eqNo;
    }
    public void setEqNo(String eqNo) {
        this.eqNo = eqNo;
    }
    public String getHatchNo() {
        return hatchNo;
    }
    public void setHatchNo(String hatchNo) {
        this.hatchNo = hatchNo;
    }
    public String getRmk() {
        return rmk;
    }
    public void setRmk(String rmk) {
        this.rmk = rmk;
    }
    public String getRsnCd() {
        return rsnCd;
    }
    public void setRsnCd(String rsnCd) {
        this.rsnCd = rsnCd;
    }
    public String getRsnCdNm() {
        return rsnCdNm;
    }
    public void setRsnCdNm(String rsnCdNm) {
        this.rsnCdNm = rsnCdNm;
    }
    public int getSeq() {
        return seq;
    }
    public void setSeq(int seq) {
        this.seq = seq;
    }
    public String getShftId() {
        return shftId;
    }
    public void setShftId(String shftId) {
        this.shftId = shftId;
    }
    public String getStDt() {
        return stDt;
    }
    public void setStDt(String stDt) {
        this.stDt = stDt;
    }
    public String getTotalHRS() {
        return totalHRS;
    }
    public void setTotalHRS(String totalHRS) {
        this.totalHRS = totalHRS;
    }
    public String getVslCallId() {
        return vslCallId;
    }
    public void setVslCallId(String vslCallId) {
        this.vslCallId = vslCallId;
    }
    
    public void setCrud(String workingStatus) {
        this.crud = workingStatus;
    }
    //-- end   ADD 20080804 tnkytn Need for HHT
    public String getShftNm() {
        return shftNm;
    }
    public void setShftNm(String shftNm) {
        this.shftNm = shftNm;
    }
    public String getHatchDrtCd() {
        return hatchDrtCd;
    }
    public void setHatchDrtCd(String hatchDrtCd) {
        this.hatchDrtCd = hatchDrtCd;
    }
    public String getInptDt() {
        return inptDt;
    }
    public void setInptDt(String inptDt) {
        this.inptDt = inptDt;
    }
    
    /**
     * @return Returns the atb.
     */
    public String getAtb() {
        return atb;
    }
    /**
     * @param atb The atb to set.
     */
    public void setAtb(String atb) {
        this.atb = atb;
    }
    /**
     * @return Returns the vslNm.
     */
    public String getVslNm() {
        return vslNm;
    }
    /**
     * @param vslNm The vslNm to set.
     */
    public void setVslNm(String vslNm) {
        this.vslNm = vslNm;
    }
    
    public String getCgTpCd() {
        return CgTpCd;
    }
    public void setCgTpCd(String cgTpCd) {
        CgTpCd = cgTpCd;
    }
    public String getAtc() {
        return atc;
    }
    public void setAtc(String atc) {
        this.atc = atc;
    }
    public String getAtu() {
        return atu;
    }
    public void setAtu(String atu) {
        this.atu = atu;
    }
    public String getAtw() {
        return atw;
    }
    public void setAtw(String atw) {
        this.atw = atw;
    }
    

    public String getVerifyBy() {
        return verifyBy;
    }
    public void setVerifyBy(String verifyBy) {
        this.verifyBy = verifyBy;
    }
    
    public String getVerifyDate() {
        return verifyDate;
    }
    public void setVerifyDate(String verifyDate) {
        this.verifyDate = verifyDate;
    }
    
    public String getVerifyStatus() {
        return verifyStatus;
    }
    public void setVerifyStatus(String verifyStatus) {
        this.verifyStatus = verifyStatus;
    }
    public String getContractor() {
        return contractor;
    }
    public void setContractor(String contractor) {
        this.contractor = contractor;
    }
	public List<Object> getHatchNoList2() {
		return hatchNoList2;
	}
	public void setHatchNoList2(List<Object> hatchNoList2) {
		this.hatchNoList2 = hatchNoList2;
	}
	public List<Object> getEquipmenNoList2() {
		return equipmenNoList2;
	}
	public void setEquipmenNoList2(List<Object> equipmenNoList2) {
		this.equipmenNoList2 = equipmenNoList2;
	}
	public String getScd() {
		return scd;
	}
	public String getScdNm() {
		return scdNm;
	}
	public void setScd(String scd) {
		this.scd = scd;
	}
	public void setScdNm(String scdNm) {
		this.scdNm = scdNm;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
    
}
