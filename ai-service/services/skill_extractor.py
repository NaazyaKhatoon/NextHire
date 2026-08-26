import re
from typing import List, Dict, Set

SKILL_TAXONOMY: Dict[str, List[str]] = {
    "Frontend": [
        "React", "React.js", "Next.js", "Vue", "Vue.js", "Nuxt.js", "Angular", "Svelte",
        "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Redux", "GraphQL",
        "Webpack", "Vite", "Responsive Design", "Web Performance", "Jest", "Cypress"
    ],
    "Backend": [
        "Node.js", "Express", "Python", "FastAPI", "Django", "Flask", "Java", "Spring Boot",
        "Go", "Golang", "C#", ".NET", "Ruby on Rails", "PHP", "Laravel", "Rust", "REST APIs",
        "gRPC", "Microservices Architecture", "Distributed Systems"
    ],
    "Databases": [
        "PostgreSQL", "MongoDB", "MySQL", "Redis", "Elasticsearch", "DynamoDB", "Cassandra",
        "SQL Server", "Oracle", "Supabase", "Prisma", "Mongoose", "TimescaleDB"
    ],
    "Cloud & DevOps": [
        "AWS", "Amazon Web Services", "AWS Lambda", "EC2", "S3", "Google Cloud", "GCP",
        "Azure", "Docker", "Kubernetes", "Terraform", "CI/CD", "GitHub Actions", "Jenkins",
        "ArgoCD", "Prometheus", "Datadog", "Linux", "Nginx", "Helm"
    ],
    "AI & Data": [
        "Machine Learning", "Deep Learning", "PyTorch", "TensorFlow", "Scikit-Learn", "NLP",
        "LLMs", "LangChain", "OpenAI API", "Hugging Face", "Pandas", "NumPy", "Apache Spark"
    ],
    "Leadership & Methods": [
        "Agile", "Scrum", "System Design", "Code Reviews", "Mentorship", "Sprint Planning",
        "A/B Testing", "Cross-Functional Leadership", "Technical Writing", "Stakeholder Management"
    ]
}

def extract_skills(text: str) -> Dict[str, List[str]]:
    lower = text.lower()
    detected_by_category: Dict[str, List[str]] = {}
    all_detected: Set[str] = set()

    for category, skills in SKILL_TAXONOMY.items():
        matched = []
        for skill in skills:
            # Word boundary matching
            pattern = r'(?<!\w)' + re.escape(skill.lower()) + r'(?!\w)'
            if re.search(pattern, lower):
                matched.append(skill)
                all_detected.add(skill)
        if matched:
            detected_by_category[category] = matched

    return {
        "all": sorted(list(all_detected)),
        "by_category": detected_by_category,
    }
