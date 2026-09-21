<div align="center">

<!-- Animated Header Banner with Stationery Cream Palette -->
<a href="https://github.com/sachinptl10/clarifySQL">
  <img src="docs/assets/clarifysql-banner-v2.svg?v=2" alt="ClarifySQL Banner" width="100%" />
</a>

<br/><br/>

<!-- Continuous Animating Ticker Ribbon -->
<img src="docs/assets/clarifysql-marquee-v2.svg?v=2" alt="ClarifySQL Pipeline Ticker" width="100%" />

<br/><br/>

<!-- Parchment Styled Badges -->
<p align="center">
  <img src="https://img.shields.io/badge/GROUND-%23EFE9DD-141C2B?style=for-the-badge" alt="Cream Ground" />
  <img src="https://img.shields.io/badge/INK-%23141C2B-EFE9DD?style=for-the-badge" alt="Deep Ink" />
  <img src="https://img.shields.io/badge/ACCENT-%232C4A8F-EFE9DD?style=for-the-badge" alt="Ink Blue" />
  <img src="https://img.shields.io/badge/FastAPI-0.115+-141C2B?style=for-the-badge&logo=fastapi&logoColor=2C4A8F" alt="FastAPI" />
  <img src="https://img.shields.io/badge/React-18.3-141C2B?style=for-the-badge&logo=react&logoColor=2C4A8F" alt="React" />
  <img src="https://img.shields.io/badge/PostgreSQL-17-141C2B?style=for-the-badge&logo=postgresql&logoColor=EFE9DD" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/AST_Safety-sqlglot-141C2B?style=for-the-badge&logo=databricks&logoColor=EFE9DD" alt="sqlglot" />
  <img src="https://img.shields.io/badge/Tests-30%20Passed-2C4A8F?style=for-the-badge&logo=pytest&logoColor=EFE9DD" alt="Tests" />
</p>

</div>

---

<table width="100%" style="background-color: #EFE9DD; color: #141C2B; border: 1px solid rgba(20,28,43,0.18);">
  <tr>
    <td style="padding: 24px; font-family: 'Courier New', monospace; line-height: 1.8;">
      <h3 style="margin-top: 0; font-family: Georgia, serif; font-size: 22px; color: #141C2B;">
        ✒️ The Core Problem: Every Vague Question Hides <em>Three Real Ones</em>
      </h3>
      <p style="color: #4A5364; font-size: 14px;">
        Standard Text-to-SQL models jump immediately from question to database query. 
        When a user enters:
      </p>
      <blockquote style="background: #E5DED0; border-left: 4px solid #2C4A8F; margin: 12px 0; padding: 10px 16px; color: #141C2B; font-weight: bold;">
        "Show me Apple's sales"
      </blockquote>
      <p style="color: #4A5364; font-size: 13px;">
        In real production enterprise schemas, this input creates collision vectors:
      </p>
      <ul style="color: #141C2B; font-size: 13px;">
        <li><strong>Entity Collision:</strong> Corporate account (<code style="background: #E5DED0; color: #2C4A8F;">customers.company = 'Apple Inc.'</code>) vs catalog brand (<code style="background: #E5DED0; color: #2C4A8F;">products.brand = 'Apple'</code>).</li>
        <li><strong>Metric Ambiguity:</strong> Total revenue (<code style="background: #E5DED0; color: #2C4A8F;">SUM(total)</code>), unit volume (<code style="background: #E5DED0; color: #2C4A8F;">SUM(quantity)</code>), or order count (<code style="background: #E5DED0; color: #2C4A8F;">COUNT(DISTINCT order_id)</code>).</li>
        <li><strong>Temporal Ambiguity:</strong> All time, fiscal year-to-date, or previous 30 days.</li>
      </ul>
      <p style="color: #2C4A8F; font-weight: bold; margin-bottom: 0; font-size: 13px;">
        ➔ ClarifySQL halts query execution, presents targeted option pills, and builds a verified QueryIntent first.
      </p>
    </td>
  </tr>
</table>

---

## 🏛️ End-to-End Pipeline Architecture

```mermaid
flowchart TD
    classDef creamNode fill:#FAF6EE,stroke:#141C2B,stroke-width:1.5px,color:#141C2B;
    classDef blueNode fill:#E5DED0,stroke:#2C4A8F,stroke-width:2px,color:#141C2B;
    classDef alertNode fill:#FAF2EE,stroke:#8C2D19,stroke-width:1.5px,color:#141C2B;
    classDef outputNode fill:#FAF6EE,stroke:#2C4A8F,stroke-width:2px,color:#141C2B;

    Q["1. Natural Language Question"]:::creamNode --> INT["2. Intent Parsing (QueryIntent)"]:::blueNode
    INT --> SCH["3. Live Schema Introspection"]:::blueNode
    SCH --> AMB{"4. Ambiguity Detected?"}:::blueNode

    AMB -- "Yes (7 Typed Dimensions)" --> CLAR["5. Clarification Engine (Interactive Dialog)"]:::blueNode
    CLAR --> RES["6. Resolved QueryIntent"]:::blueNode
    RES --> GEN["7. Structured SQL Generation"]:::blueNode

    AMB -- "No (Clear Intent)" --> GEN

    GEN --> VAL["8. sqlglot AST Validator"]:::alertNode
    VAL -- "Forbidden Write Statement / Hallucinated Column" --> ERR["Rejection Notice & Safety Correction"]:::alertNode
    VAL -- "Verified Read-Only SELECT" --> EXEC["9. PostgreSQL Engine (Timeout & Limit Enforced)"]:::alertNode

    EXEC --> PROC["10. Result Processor"]:::outputNode
    PROC --> CHART["Recharts Visualizer (Ink Palette)"]:::outputNode
    PROC --> EXP["Natural Language Summary & Rationale"]:::outputNode
    PROC --> HIST["Audit Log & Session State"]:::outputNode
```

---

## 🧭 The 7 Typed Ambiguity Dimensions

<table width="100%" style="background-color: #EFE9DD; border: 1px solid rgba(20,28,43,0.18);">
  <thead>
    <tr style="background-color: #E5DED0; color: #141C2B; font-family: 'Courier New', monospace; font-size: 12px; text-transform: uppercase;">
      <th style="padding: 12px; border-bottom: 2px solid #2C4A8F; text-align: left;">Dimension</th>
      <th style="padding: 12px; border-bottom: 2px solid #2C4A8F; text-align: left;">Ambiguity Key</th>
      <th style="padding: 12px; border-bottom: 2px solid #2C4A8F; text-align: left;">Ambiguous Query</th>
      <th style="padding: 12px; border-bottom: 2px solid #2C4A8F; text-align: left;">Engine Clarification Strategy</th>
    </tr>
  </thead>
  <tbody style="font-family: 'Courier New', monospace; font-size: 12px; color: #141C2B;">
    <tr style="border-bottom: 1px solid rgba(20,28,43,0.1);">
      <td style="padding: 10px;"><strong>1. Entity</strong></td>
      <td style="padding: 10px;"><code style="color: #2C4A8F; background: #E5DED0;">ambiguous_entity</code></td>
      <td style="padding: 10px;"><em>"Show me Apple's data"</em></td>
      <td style="padding: 10px;">Prompts user to select product brand vs customer company account.</td>
    </tr>
    <tr style="border-bottom: 1px solid rgba(20,28,43,0.1); background-color: #EAE3D5;">
      <td style="padding: 10px;"><strong>2. Metric</strong></td>
      <td style="padding: 10px;"><code style="color: #2C4A8F; background: #E5DED0;">missing_metric</code></td>
      <td style="padding: 10px;"><em>"Show me performance for 2024"</em></td>
      <td style="padding: 10px;">Disambiguates gross revenue vs order volume vs units shipped.</td>
    </tr>
    <tr style="border-bottom: 1px solid rgba(20,28,43,0.1);">
      <td style="padding: 10px;"><strong>3. Date Range</strong></td>
      <td style="padding: 10px;"><code style="color: #2C4A8F; background: #E5DED0;">missing_date_range</code></td>
      <td style="padding: 10px;"><em>"What are our top selling items?"</em></td>
      <td style="padding: 10px;">Offers All-time, Year-to-date, or Last 30 days boundaries.</td>
    </tr>
    <tr style="border-bottom: 1px solid rgba(20,28,43,0.1); background-color: #EAE3D5;">
      <td style="padding: 10px;"><strong>4. Grouping</strong></td>
      <td style="padding: 10px;"><code style="color: #2C4A8F; background: #E5DED0;">missing_grouping</code></td>
      <td style="padding: 10px;"><em>"Show sales breakdown"</em></td>
      <td style="padding: 10px;">Resolves aggregation grain: by product, by month, or by customer.</td>
    </tr>
    <tr style="border-bottom: 1px solid rgba(20,28,43,0.1);">
      <td style="padding: 10px;"><strong>5. Comparison</strong></td>
      <td style="padding: 10px;"><code style="color: #2C4A8F; background: #E5DED0;">ambiguous_comparison</code></td>
      <td style="padding: 10px;"><em>"Compare laptop models"</em></td>
      <td style="padding: 10px;">Prompts comparison axis: retail unit price vs sales volume.</td>
    </tr>
    <tr style="border-bottom: 1px solid rgba(20,28,43,0.1); background-color: #EAE3D5;">
      <td style="padding: 10px;"><strong>6. Filter</strong></td>
      <td style="padding: 10px;"><code style="color: #2C4A8F; background: #E5DED0;">missing_filter</code></td>
      <td style="padding: 10px;"><em>"List customer orders"</em></td>
      <td style="padding: 10px;">Clarifies status inclusion: completed only vs pending/refunded.</td>
    </tr>
    <tr>
      <td style="padding: 10px;"><strong>7. Terminology</strong></td>
      <td style="padding: 10px;"><code style="color: #2C4A8F; background: #E5DED0;">ambiguous_terminology</code></td>
      <td style="padding: 10px;"><em>"What is our churn / net retention?"</em></td>
      <td style="padding: 10px;">Maps informal business jargon to exact schema calculation equations.</td>
    </tr>
  </tbody>
</table>

---

## 🛡️ Four-Layer Deterministic Safety Shield

```
       ┌────────────────────────────────────────────────────────┐
       │                INCOMING CANDIDATE SQL                  │
       └───────────────────────────┬────────────────────────────┘
                                   │
                                   ▼
       ┌────────────────────────────────────────────────────────┐
       │  Layer 1: sqlglot AST Walk                             │
       │  • Strictly rejects: INSERT, UPDATE, DELETE, DROP,     │
       │    ALTER, TRUNCATE, CREATE, GRANT, REVOKE              │
       └───────────────────────────┬────────────────────────────┘
                                   │
                                   ▼
       ┌────────────────────────────────────────────────────────┐
       │  Layer 2: Multi-Statement Stack Blocker                │
       │  • Rejects semicolon-separated query chaining          │
       └───────────────────────────┬────────────────────────────┘
                                   │
                                   ▼
       ┌────────────────────────────────────────────────────────┐
       │  Layer 3: Schema Column & Table Boundary Check         │
       │  • Cross-references AST with introspected schema       │
       │  • Blocks hallucinated tables or fabricated fields     │
       └───────────────────────────┬────────────────────────────┘
                                   │
                                   ▼
       ┌────────────────────────────────────────────────────────┐
       │  Layer 4: Execution Resource Bounding                  │
       │  • Injects LIMIT 1000 automatically                    │
       │  • SET statement_timeout = '30000' (PostgreSQL)        │
       │  • Read-only async transaction context                 │
       └────────────────────────────────────────────────────────┘
```

---

## 📊 Live Introspected Database Schema

Seeded with **1,578 records** across 6 relational tables:

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

### 1. Backend Setup
```bash
git clone https://github.com/sachinptl10/clarifySQL.git
cd clarifySQL/backend

# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate      # Windows
source venv/bin/activate   # Linux / macOS

# Install backend dependencies
pip install -r requirements.txt

# Configure environment keys
cp .env.example .env
```

Set your configuration in `.env`:
```ini
DATABASE_URL=sqlite+aiosqlite:///clarifysql.db
# Or PostgreSQL: postgresql+asyncpg://postgres:password@localhost:5432/clarifysql

LLM_PROVIDER=gemini        # 'gemini', 'openai', or 'groq'
GEMINI_API_KEY=your_gemini_key
OPENAI_API_KEY=your_openai_key
GROQ_API_KEY=your_groq_key
QUERY_TIMEOUT=30
MAX_ROWS=1000
```

### 2. Seed & Launch Backend
```bash
# Seed mock tables (50 customers, 40 products, 300 orders, 913 items, 275 payments)
python -m app.db.init_db

# Run FastAPI server
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
- **Swagger Docs**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **Healthcheck**: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)

### 3. Launch the Frontend
```bash
cd ../frontend
npm install
npm run dev
```
- **Interactive App Workspace**: [http://localhost:5173](http://localhost:5173)
- **Scroll-Animated Landing Page**: [http://localhost:5173/landing.html](http://localhost:5173/landing.html)

---

## 🧪 Verification & Test Suite

Run the full pytest suite (30 unit tests covering SQL validation, CTEs, AST safety, and clarification prompts):

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

<div align="center">

<table width="100%" style="background-color: #E5DED0; border: 1px solid rgba(20,28,43,0.18);">
  <tr>
    <td align="center" style="padding: 16px; font-family: 'Courier New', monospace; font-size: 11px; color: #767E8C; text-transform: uppercase;">
      ClarifySQL · Crafted with FastAPI, React 18, and sqlglot · Open Source Under MIT License
    </td>
  </tr>
</table>

</div>
