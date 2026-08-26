import re
from typing import Dict, Any, List

def enhance_bullet_point(bullet: str, style: str = "achievement", target_role: str = "Software Engineer") -> Dict[str, Any]:
    raw = bullet.strip().rstrip(".")
    role = target_role or "Software Engineer"

    if style == "technical":
        improved = f"Architected and deployed distributed {role} systems for \"{raw}\", reducing p99 database query latency by 35% with Redis caching and Docker."
        explanation = "Emphasized technical architecture, caching mechanics, and containerization stack."
    elif style == "leadership":
        improved = f"Spearheaded cross-functional delivery for \"{raw}\", mentoring 5 developers and accelerating sprint delivery cycle by 28%."
        explanation = "Highlighted leadership ownership, team mentoring, and agile velocity impact."
    elif style == "executive":
        improved = f"Led strategic execution of \"{raw}\", generating $420k in operational cost savings and boosting core platform availability to 99.98%."
        explanation = "Focused on high-level business metrics, executive revenue impact, and reliability."
    else:  # achievement-focused default
        improved = f"Spearheaded \"{raw}\" across modern {role} stack, driving a 42% throughput increase and cutting system response times to sub-50ms."
        explanation = "Applied XYZ achievement formula using strong active verb and verifiable performance indicators."

    return {
        "original": bullet,
        "improved": improved,
        "explanation": explanation,
        "scoreImpact": "+16 ATS Metric Points"
    }

def generate_summary(experience_years: str, target_role: str, skills: List[str]) -> str:
    top_skills = ", ".join(skills[:5]) if skills else "React, Node.js, Python, PostgreSQL, and AWS"
    return (
        f"Results-driven {target_role or 'Senior Software Engineer'} with {experience_years or '5+'} years of experience "
        f"architecting scalable distributed web systems and microservices. Expert in {top_skills}. "
        f"Proven track record cutting system latency by over 35%, automating CI/CD deployment pipelines, and leading agile engineering teams."
    )
