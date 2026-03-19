#!/usr/bin/env python3
"""
Script to convert Excel file to CSV format
This enables easy reading of test data in Playwright tests
"""

import openpyxl
import csv
import os

def excel_to_csv(excel_file, csv_file):
    """
    Chuyển đổi Excel file sang CSV format
    
    Args:
        excel_file (str): Đường dẫn file Excel
        csv_file (str): Đường dẫn file CSV output
    """
    try:
        # Tải Excel workbook
        wb = openpyxl.load_workbook(excel_file)
        ws = wb.active
        
        # Mở file CSV để ghi
        with open(csv_file, 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.writer(csvfile)
            
            # Ghi tất cả các hàng từ worksheet
            for row in ws.iter_rows(values_only=True):
                writer.writerow(row)
        
        print(f"✓ Chuyển đổi thành công: {excel_file} → {csv_file}")
        
    except FileNotFoundError:
        print(f"✗ File không tìm thấy: {excel_file}")
    except Exception as e:
        print(f"✗ Lỗi: {str(e)}")

def convert_all_excel_files(data_folder):
    """
    Chuyển đổi tất cả Excel files trong folder sang CSV
    
    Args:
        data_folder (str): Đường dẫn folder chứa dữ liệu
    """
    if not os.path.exists(data_folder):
        print(f"✗ Folder không tồn tại: {data_folder}")
        return
    
    excel_files = [f for f in os.listdir(data_folder) if f.endswith('.xlsx')]
    
    if not excel_files:
        print(f"⚠ Không tìm thấy file Excel trong {data_folder}")
        return
    
    print(f"📁 Tìm thấy {len(excel_files)} file Excel")
    
    for excel_file in excel_files:
        excel_path = os.path.join(data_folder, excel_file)
        csv_file = excel_path.replace('.xlsx', '.csv')
        excel_to_csv(excel_path, csv_file)

if __name__ == "__main__":
    data_folder = "src/data"
    print("🔄 Bắt đầu chuyển đổi Excel → CSV...\n")
    convert_all_excel_files(data_folder)
    print("\n✅ Hoàn tất!")
