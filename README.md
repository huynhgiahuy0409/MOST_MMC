# **MOST_MMC Project**  

## **Giới thiệu**  
Dự án **MOST_MMC** được phát triển nhằm hỗ trợ quản lý và vận hành các cảng thuộc **MMC Corporation** – một tập đoàn tiện ích và hạ tầng lớn tại Malaysia với ba lĩnh vực chính:  
- **Năng lượng & Tiện ích (Energy & Utilities)**  
- **Cảng & Logistics (Ports & Logistics)**  
- **Kỹ thuật (Engineering)**  

## **Mục tiêu dự án**  
- Tối ưu hóa quy trình quản lý hàng hóa và vận tải tại các cảng thuộc MMC.  
- Nâng cao hiệu suất làm việc và giảm thiểu sai sót trong quy trình vận hành.  
- Cung cấp nền tảng tích hợp giúp các phòng ban liên kết và trao đổi thông tin hiệu quả.  

## **Cấu trúc dự án**  
Dự án được chia thành các module chính sau:  
- **MOST_MMC_BaseBizComponent:** Thành phần cốt lõi chứa các nghiệp vụ chung của hệ thống.  
- **MOST_MMC_Client & MOST_MMC_HHT_Client:** Giao diện người dùng và tablet.  
- **MOST_MMC_JPB_BizComponent & MOST_MMC_JPB_Web:** Module quản lý hàng hóa tại cảng JPB.  
- **MOST_MMC_PPSB_BizComponent & MOST_MMC_PPSB_Web:** Module quản lý cảng PPSB.  
- **MOST_MMC_VMT_BizComponent & MOST_MMC_VMT_Web:** Module quản lý cảng VMT.  

## **Công nghệ sử dụng**  
- **Frontend:** Sencha framework (Ext JS)  
- **Backend:** Spring MVC (Java).  
- **Database:** MSSQL + ORACLE.  
