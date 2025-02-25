from google.cloud import bigquery

def analyze_tax_data():
    client = bigquery.Client()
    query = "SELECT * FROM `your-dataset.tax_analysis` LIMIT 1"
    results = client.query(query).result()
    
    for row in results:
        return {"tax_savings": row.tax_savings, "audit_risk": row.audit_risk}
