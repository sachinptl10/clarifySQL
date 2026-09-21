<div align="center">

# ✦ ClarifySQL ✦

### *Ask your data anything. We'll clarify before we query.*

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.11+-141C2B?style=for-the-badge&logo=python&logoColor=EFE9DD" alt="Python" />
  <img src="https://img.shields.io/badge/FastAPI-0.115+-141C2B?style=for-the-badge&logo=fastapi&logoColor=2C4A8F" alt="FastAPI" />
  <img src="https://img.shields.io/badge/React-18.3-141C2B?style=for-the-badge&logo=react&logoColor=2C4A8F" alt="React" />
  <img src="https://img.shields.io/badge/PostgreSQL-17-141C2B?style=for-the-badge&logo=postgresql&logoColor=EFE9DD" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/sqlglot-AST_Safety-141C2B?style=for-the-badge&logo=databricks&logoColor=EFE9DD" alt="sqlglot" />
  <img src="https://img.shields.io/badge/Tests-30%20Passed-2C4A8F?style=for-the-badge&logo=pytest&logoColor=EFE9DD" alt="Tests" />
  <img src="https://img.shields.io/badge/License-MIT-141C2B?style=for-the-badge" alt="License" />
</p>

<p align="center">
  <strong>Natural Language</strong> ➔ <strong>Ambiguity Detection</strong> ➔ <strong>Clarification Engine</strong> ➔ <strong>Verified Read-Only SQL</strong> ➔ <strong>Visual Insights</strong>
</p>

---

</div>

## ✒️ Why ClarifySQL?

Most Text-to-SQL tools jump **directly from a question to raw SQL execution**. When a user enters:

> *"Show me Apple's sales"*

A naive model immediately writes a SQL query. But in real production databases, this request contains **at least 3 hidden ambiguities**:
1. **Entity Ambiguity**: Does "Apple" refer to customer companies named *Apple Inc.* / *Apple Farm Co.* or products under the brand *Apple*?
2. **Metric Ambiguity**: Does "sales" mean *total gross revenue*, *net quantity of units sold*, or *number of distinct orders*?
3. **Temporal Ambiguity**: What period? *All time*, *fiscal year to date*, *last 30 days*, or *previous quarter*?

That single sentence hides **over 27 distinct queries**.

**ClarifySQL halts execution**, identifies the precise collision vectors using introspected live schema, presents clear, minimal clarification pills to the user, and **only then** generates and validates read-only SQL.

---

## 🏛️ Pipeline Architecture

```mermaid
flowchart TD
    classDef input fill:#EFE9DD,stroke:#141C2B,stroke-width:1.5px,color:#141C2B;
    classDef engine fill:#E5DED0,stroke:#2C4A8F,stroke-width:2px,color:#141C2B;
    classDef safety fill:#FAF2EE,stroke:#8C2D19,stroke-width:1.5px,color:#141C2B;
    classDef output fill:#EFE9DD,stroke:#2C4A8F,stroke-width:1.5px,color:#141C2B;

    Q["1. Natural Language Question"]:::input --> INT["2. Intent Parsing (QueryIntent)"]:::engine
    INT --> SCH["3. Live Schema Introspection"]:::engine
    SCH --> AMB{"4. Ambiguity Detected?"}:::engine

    AMB -- "Yes (7 Ambiguity Types)" --> CLAR["5. Clarification Engine (Interactive Dialog)"]:::engine
    CLAR --> RES["6. Resolved QueryIntent"]:::engine
    RES --> GEN["7. Structured SQL Generation"]:::engine

    AMB -- "No (Unambiguous)" --> GEN

    GEN --> VAL["8. sqlglot AST Validator"]:::safety
    VAL -- "Forbidden Write Statement / Hallucinated Column" --> ERR["Rejection & Correction Loop"]:::safety
    VAL -- "Verified Read-Only SELECT" --> EXEC["9. PostgreSQL Engine (Timeout & Limit Enforced)"]:::safety

    EXEC --> PROC["10. Result Processor"]:::output
    PROC --> CHART["Interactive Recharts Visualizer"]:::output
    PROC --> EXP["Natural Language Explanation Card"]:::output
    PROC --> HIST["Session & Query Audit Log"]:::output
```

---

## 🎯 The 7 Ambiguity Dimensions

ClarifySQL's engine categorizes ambiguity into 7 discrete, typed evaluation dimensions:

| Dimension | Type | Example User Query | Clarification Prompt Generated |
|:---|:---|:---|:---|
| **1. Entity** | `ambiguous_entity` | *"Show me Apple's data"* | Product brand, customer company, or supplier? |
| **2. Metric** | `missing_metric` | *"Show me performance for 2024"* | Total revenue, unit volume, or unique order count? |
| **3. Date Range** | `missing_date_range` | *"What are our top selling items?"* | All-time, year-to-date, or last 30 days? |
| **4. Grouping** | `missing_grouping` | *"Show sales breakdown"* | Group by product, customer, month, or category? |
| **5. Comparison** | `ambiguous_comparison` | *"Compare laptop models"* | Compare by price point, units sold, or refund rate? |
| **6. Filter** | `missing_filter` | *"List customer orders"* | Include completed only, or pending and refunded? |
| **7. Terminology** | `ambiguous_terminology` | *"What's our burn rate / churn?"* | Map domain terminology to exact schema column equations |

---

## 🛡️ Defense-in-Depth SQL Safety Model

```
       ┌────────────────────────────────────────────────────────┐
       │                INCOMING CANDIDATE SQL                  │
       └───────────────────────────┬────────────────────────────┘
                                   │
                                   ▼
       ┌────────────────────────────────────────────────────────┐
       │  Layer 1: sqlglot AST Parser                           │
       │  • Rejects: INSERT, UPDATE, DELETE, DROP, ALTER,       │
       │    TRUNCATE, CREATE, GRANT, REVOKE                     │
       └───────────────────────────┬────────────────────────────┘
                                   │
                                   ▼
       ┌────────────────────────────────────────────────────────┐
       │  Layer 2: Multi-Statement Stack Blocker                │
       │  • Rejects semicolon-chained SQL injection attempts     │
       └───────────────────────────┬────────────────────────────┘
                                   │
                                   ▼
       ┌────────────────────────────────────────────────────────┐
       │  Layer 3: Schema Column & Table Boundary Check         │
       │  • Confirms all referenced tables and columns exist    │
       │  • Eliminates LLM entity hallucinations                │
       └───────────────────────────┬────────────────────────────┘
                                   │
                                   ▼
       ┌────────────────────────────────────────────────────────┐
       │  Layer 4: Execution Bounding                           │
       │  • Connection-level SET statement_timeout = '30000'    │
       │  • Injects LIMIT 1000 automatically when omitted       │
       │  • Read-only async transaction context                 │
       └────────────────────────────────────────────────────────┘
```

---

## 📊 Live Introspected Database Schema

Seeded with **1,578 realistic records** across 6 interconnected tables:

```
  ┌──────────────┐         ┌──────────────┐         ┌──────────────┐
  │  customers   │ 1     * │    orders    │ 1     * │ order_items  │
  ├──────────────┤─────────├──────────────┤─────────├──────────────┤
  │ id (PK)      │         │ id (PK)      │         │ id (PK)      │
  │ name         │         │ customer_id  │         │ order_id     │
  │ email        │         │ order_date   │         │ product_id   │
  │ company      │         │ status       │         │ quantity     │
  │ address      │         │ total_amount │         │ unit_price   │
  │ created_at   │         └──────────────┘         │ discount     │
  └──────────────┘                                  │ total        │
                                                    └──────┬───────┘
                                                           │ *
  ┌──────────────┐                                         │ 1
  │   payments   │ *     1                         ┌───────┴──────┐
  ├──────────────┤─────────┐                       │   products   │
  │ id (PK)      │         │                       ├──────────────┤
  │ order_id     │─────────┘                       │ id (PK)      │
  │ payment_date │                                 │ name         │
  │ amount       │                                 │ category     │
  │ method       │                                 │ brand        │
  │ status       │                                 │ unit_price   │
  └──────────────┘                                 │ stock        │
                                                   └──────────────┘
```

---

## ⚡ Quickstart

### Prerequisites
- **Python**: 3.11+
- **Node.js**: 18+
- **PostgreSQL** or **SQLite** (pre-configured)
- **API Key**: Gemini, OpenAI, or Groq

### 1. Clone & Configure Backend
```bash
git clone https://github.com/sachinptl10/SpotFix-Civic-Reporting-App.git
cd ClarifySQL/backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate      # On Windows
source venv/bin/activate   # On Linux/macOS

# Install dependencies
pip install -r requirements.txt

# Configure your environment
cp .env.example .env
```

Edit `.env` with your preferred provider:
```ini
DATABASE_URL=sqlite+aiosqlite:///clarifysql.db
# Or for PostgreSQL:
# DATABASE_URL=postgresql+asyncpg://postgres:password@localhost:5432/clarifysql

LLM_PROVIDER=gemini        # 'gemini', 'openai', or 'groq'
GEMINI_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
GROQ_API_KEY=your_key_here
QUERY_TIMEOUT=30
MAX_ROWS=1000
```

### 2. Initialize & Seed Database
```bash
python -m app.db.init_db
```
*Creates all tables and seeds 50 customers, 40 products, 300 orders, 913 line items, and 275 payments.*

### 3. Launch the Backend Server
```bash
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
- **API Documentation**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **Health Check**: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)

### 4. Launch the Frontend
```bash
cd ../frontend
npm install
npm run dev
```
- **Interactive App**: [http://localhost:5173](http://localhost:5173)
- **Stationery Landing Page**: [http://localhost:5173/landing.html](http://localhost:5173/landing.html)

---

## 🧪 Verification & Test Suite

Run the full pytest suite (30 automated unit tests covering SQL safety, CTE validation, table verification, and clarification logic):

```bash
cd backend
python -m pytest tests/test_validator.py tests/test_clarification.py -v
```

```
============================= test session starts ==============================
backend/tests/test_validator.py::test_simple_select PASSED               [  3%]
backend/tests/test_validator.py::test_select_with_join PASSED            [ 10%]
backend/tests/test_validator.py::test_select_with_cte PASSED             [ 26%]
backend/tests/test_validator.py::test_reject_insert PASSED               [ 33%]
backend/tests/test_validator.py::test_reject_update PASSED               [ 36%]
backend/tests/test_validator.py::test_reject_delete PASSED               [ 40%]
backend/tests/test_validator.py::test_reject_drop_table PASSED           [ 43%]
backend/tests/test_validator.py::test_reject_alter_table PASSED          [ 46%]
backend/tests/test_validator.py::test_reject_truncate PASSED             [ 50%]
backend/tests/test_validator.py::test_multiple_statements PASSED         [ 76%]
backend/tests/test_clarification.py::test_ambiguous_entity PASSED        [ 83%]
backend/tests/test_clarification.py::test_missing_metric PASSED          [ 86%]
backend/tests/test_clarification.py::test_missing_date_range PASSED      [ 90%]
backend/tests/test_clarification.py::test_ambiguous_comparison PASSED    [100%]
============================== 30 passed in 0.27s ==============================
```

---

## 📦 Project Structure

```
ClarifySQL/
├── backend/
│   ├── app/
│   │   ├── api/routes/          # FastAPI endpoints (query, schema, history)
│   │   ├── models/              # SQLAlchemy models & DB connection pool
│   │   ├── providers/           # Swappable LLM adapters (Gemini, OpenAI, Groq)
│   │   ├── schemas/             # Pydantic contracts (Intent, Clarify, SQL)
│   │   ├── services/            # Clarification Engine, Validator, Executor
│   │   ├── db/seed.py           # Realistic database seeding with Apple ambiguity
│   │   └── config.py            # Pydantic settings management
│   ├── tests/                   # 30 unit tests + benchmark evaluation harness
│   └── requirements.txt         # Pinned backend dependencies
│
└── frontend/
    ├── public/landing.html      # Warm stationery landing page with scroll travel
    ├── src/
    │   ├── components/          # QueryInput, ClarificationDialog, SQLDisplay, etc.
    │   ├── hooks/               # useQuery, useSchema, useHistory state machines
    │   ├── pages/Dashboard.jsx  # Main workspace composing the full pipeline
    │   └── services/api.js      # Axios client
    └── package.json             # React 18, Tailwind CSS, Recharts, Vite
```

---

<div align="center">

**ClarifySQL** — *Engineered with precision for reliable enterprise natural language queries.*  
Crafted with FastAPI, React, and sqlglot · Open Source Under MIT License

</div>
