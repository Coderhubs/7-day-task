import pandas as pd

# Creating a DataFrame for the test cases provided in the images
data = [
    {"Test Case ID": "TC001", "Description": "Validate product listing", "Steps": "Open product page > Verify products",
     "Expected Result": "Products displayed", "Actual Result": "Products displayed", "Status": "Passed",
     "Remarks": "No issues found"},
    {"Test Case ID": "TC002", "Description": "Test API error handling", "Steps": "Disconnect API > Refresh page",
     "Expected Result": "Show fallback message", "Actual Result": "Fallback message shown", "Status": "Passed",
     "Remarks": "Handled gracefully"},
    {"Test Case ID": "TC003", "Description": "Check cart functionality", "Steps": "Add item to cart > Verify cart",
     "Expected Result": "Cart updates correctly", "Actual Result": "Cart updates correctly", "Status": "Passed",
     "Remarks": "Works as expected"},
    {"Test Case ID": "TC004", "Description": "Test responsiveness layout", "Steps": "Resize window > Check browser",
     "Expected Result": "Layout adjusts properly", "Actual Result": "Layout adjusts properly", "Status": "Passed",
     "Remarks": "Responsive verified"},
]

# Converting the data into a CSV file
df = pd.DataFrame(data)
csv_path = "/mnt/data/test_cases.csv"
df.to_csv(csv_path, index=False)

csv_path
