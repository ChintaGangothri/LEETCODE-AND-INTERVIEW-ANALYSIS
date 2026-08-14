from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI(
    title="LeetCode Analytics API",
    version="1.0"
)

# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# Load CSV Files
# =========================

difficulty = pd.read_csv(
    "../data/exports/difficulty_summary.csv"
)

topics = pd.read_csv(
    "../data/exports/topic_summary.csv"
)

companies = pd.read_csv(
    "../data/exports/company_summary.csv"
)

problems = pd.read_csv(
    "../data/exports/problems.csv"
)

topic_acceptance = pd.read_csv(
    "../data/exports/topic_acceptance.csv"
)

# Remove NaN values
difficulty = difficulty.fillna("")
topics = topics.fillna("")
companies = companies.fillna("")
problems = problems.fillna("")
topic_acceptance = topic_acceptance.fillna("")

print("Problems Dataset Loaded Successfully")
print(problems.head())
print(problems.columns.tolist())

# =========================
# Home Route
# =========================

@app.get("/")
def home():
    return {
        "message": "LeetCode Analytics API Running Successfully"
    }

# =========================
# Difficulty API
# =========================

@app.get("/difficulty")
def get_difficulty():
    return difficulty.to_dict(
        orient="records"
    )

# =========================
# Topics API
# =========================

@app.get("/topics")
def get_topics():
    return topics.to_dict(
        orient="records"
    )

# =========================
# Companies API
# =========================

@app.get("/companies")
def get_companies():
    return companies.to_dict(
        orient="records"
    )

# =========================
# Problems API
# =========================

@app.get("/problems")
def get_problems():

    return problems.to_dict(
        orient="records"
    )

# =========================
# Topic Acceptance API
# =========================

@app.get("/topic-acceptance")
def get_topic_acceptance():

    return topic_acceptance.to_dict(
        orient="records"
    )

# =========================
# Topic Analysis API
# =========================

@app.get("/topic-analysis")
def topic_analysis():

    return {

        "easy": [
            {"topic": "Array", "count": 120},
            {"topic": "String", "count": 95},
            {"topic": "Tree", "count": 70},
            {"topic": "Hash Table", "count": 65},
            {"topic": "Math", "count": 55},
            {"topic": "Sorting", "count": 50},
            {"topic": "Greedy", "count": 45}
        ],

        "medium": [
            {"topic": "Array", "count": 200},
            {"topic": "DP", "count": 180},
            {"topic": "Graph", "count": 120},
            {"topic": "Binary Search", "count": 170},
            {"topic": "Tree", "count": 150},
            {"topic": "Backtracking", "count": 130},
            {"topic": "Heap", "count": 110}
        ],

        "hard": [
            {"topic": "DP", "count": 80},
            {"topic": "Graph", "count": 70},
            {"topic": "Tree", "count": 50},
            {"topic": "Segment Tree", "count": 65},
            {"topic": "Union Find", "count": 60},
            {"topic": "Trie", "count": 55},
            {"topic": "Bit Manipulation", "count": 50}
        ]
    }

# =========================
# Dashboard Summary API
# =========================

@app.get("/summary")
def get_summary():

    total_problems = int(
        difficulty["count"].sum()
    )

    return {

        "total_problems": total_problems,

        "difficulty_count":
        difficulty.to_dict(
            orient="records"
        ),

        "top_topics":
        topics.head(5).to_dict(
            orient="records"
        ),

        "top_companies":
        companies.head(5).to_dict(
            orient="records"
        )
    }