import pandas as pd
import json

def extract_urls_from_excel(excel_file_path, sheet_name=0, column_name='Image URL'):
    """
    Reads an Excel file, extracts image URLs from a specified column,
    and returns them as a list.
    """
    try:
        df = pd.read_excel(excel_file_path, sheet_name=sheet_name)
        if column_name in df.columns:
            image_urls = df[column_name].dropna().tolist()
            return image_urls
        else:
            print(f"Error: Column '{column_name}' not found in the Excel sheet.")
            print("Available columns are:", df.columns.tolist())
            return []
    except FileNotFoundError:
        print(f"Error: Excel file not found at '{excel_file_path}'")
        return []
    except Exception as e:
        print(f"An error occurred: {e}")
        return []

def save_urls_to_json(urls, json_file_path):
    """
    Saves a list of URLs to a JSON file.
    """
    try:
        with open(json_file_path, 'w') as f:
            json.dump(urls, f, indent=4)
        print(f"Image URLs successfully saved to '{json_file_path}'")
    except Exception as e:
        print(f"An error occurred while saving to JSON: {e}")

if __name__ == "__main__":
    excel_file = 'Teacher pool/DataScraping_PD.xlsx'
    json_output_file = 'Teacher pool/image_urls.json'
    
    # Assuming the image URLs are in a column named 'Image URL'
    # You might need to change 'Image URL' to the actual column name in your Excel file
    image_urls = extract_urls_from_excel(excel_file, column_name='Faculty Profile Link')
    
    if image_urls:
        save_urls_to_json(image_urls, json_output_file)
    else:
        print("No image URLs were extracted.")
