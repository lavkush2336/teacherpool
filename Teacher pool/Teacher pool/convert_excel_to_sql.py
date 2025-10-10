import pandas as pd
import os

def excel_to_json(excel_file, json_file):
    try:
        df = pd.read_excel(excel_file)
    except FileNotFoundError:
        print(f"Error: Excel file not found at {excel_file}")
        return
    except Exception as e:
        print(f"Error reading Excel file: {e}")
        return

    try:
        # Convert DataFrame to JSON format. 
        # 'records' format produces a list of dictionaries, one per row.
        json_data = df.to_json(orient='records', indent=4)
        
        with open(json_file, 'w', encoding='utf-8') as f:
            f.write(json_data)
        print(f"Successfully converted '{excel_file}' to '{json_file}'")
    except Exception as e:
        print(f"Error writing JSON file: {e}")

if __name__ == "__main__":
    excel_input_path = "DataScraping_PD.xlsx"
    json_output_path = "faculty_data.json"
    
    # Adjust paths if the script is run from a different directory
    script_dir = os.path.dirname(__file__)
    excel_input_path = os.path.join(script_dir, excel_input_path)
    json_output_path = os.path.join(script_dir, json_output_path)

    excel_to_json(excel_input_path, json_output_path)
