import re
from typing import List, Dict, Tuple

ROLE_KEYWORD_BENCHMARKS: Dict[str, List[str]] = {
    "software engineer": [
        "React", "TypeScript", "Node.js", "Python", "REST APIs", "PostgreSQL", "Docker", "AWS",
        "CI/CD", "Unit Testing", "System Design", "Microservices", "Git", "Agile"
    ],
    "frontend developer": [
        "React", "TypeScript", "Next.js", "JavaScript", "HTML5", "CSS3", "Tailwind CSS",
        "State Management (Redux/Zustand)", "Responsive Design", "Web Performance (LCP)", "Jest"
    ],
    "backend developer": [
        "Python", "FastAPI", "Node.js", "PostgreSQL", "Redis", "Docker", "AWS", "Microservices",
        "Distributed Systems", "SQL Optimization", "Database Indexing", "gRPC"
    ],
    "devops / cloud engineer": [
        "AWS", "Kubernetes", "Docker", "Terraform", "CI/CD Pipelines", "GitHub Actions",
        "Infrastructure as Code", "Linux", "Prometheus", "Datadog", "Helm"
    ],
    "product manager": [
        "Product Roadmap", "User Research", "A/B Testing", "Agile Scrum", "PRD Documentation",
        "KPI Metrics", "Cross-Functional Collaboration", "SQL Analytics", "Stakeholder Management"
    ]
}

def match_keywords(resume_text: str, target_role: str, job_desc: str = "") -> Dict[str, Any]:
    text_lower = resume_text.lower()
    role_key = target_role.lower().strip()

    benchmark_keywords = ROLE_KEYWORD_BENCHMARKS.get(role_key, ROLE_KEYWORD_BENCHMARKS["software engineer"])

    # If specific job description provided, extract additional salient keywords
    jd_keywords = []
    if job_desc:
        jd_words = re.findall(r'\b[A-Za-z0-9+#\.-]{3,}\b', job_desc)
        # Select common technical nouns
        jd_keywords = [w for w in set(jd_words) if len(w) > 3][:10]

    all_target_keywords = list(set(benchmark_keywords + jd_keywords))

    matched = []
    missing = []

    for kw in all_target_keywords:
        pattern = r'(?<!\w)' + re.escape(kw.lower()) + r'(?!\w)'
        if re.search(pattern, text_lower):
            matched.append(kw)
        else:
            missing.append(kw)

    match_ratio = len(matched) / max(1, len(all_target_keywords))
    keyword_score = round(match_ratio * 100)

    return {
        "score": min(98, max(50, keyword_score)),
        "matched": matched,
        "missing": missing[:5],
    }
