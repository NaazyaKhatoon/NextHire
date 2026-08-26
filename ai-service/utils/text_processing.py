import re
from typing import List, Dict, Any, Tuple

ACTION_VERBS = {
    "spearheaded", "architected", "engineered", "designed", "developed", "deployed",
    "accelerated", "optimized", "implemented", "orchestrated", "supervised", "mentored",
    "scaled", "reduced", "increased", "boosted", "delivered", "transformed", "automated",
    "integrated", "authored", "led", "managed", "built", "established", "championed"
}

STANDARD_SECTIONS = [
    "experience", "work experience", "employment history", "professional experience",
    "education", "academic background",
    "skills", "technical skills", "core competencies", "technologies",
    "summary", "professional summary", "about me", "profile",
    "projects", "key projects", "technical projects",
    "certifications", "licenses", "awards", "honors"
]

def clean_text(raw: str) -> str:
    if not raw:
        return ""
    # Normalize whitespaces
    text = re.sub(r'\s+', ' ', raw)
    return text.strip()

def calculate_flesch_reading_ease(text: str) -> float:
    words = re.findall(r'\b\w+\b', text)
    sentences = re.split(r'[.!?]+', text)
    sentences = [s for s in sentences if s.strip()]

    if not words or not sentences:
        return 70.0

    total_words = len(words)
    total_sentences = len(sentences)

    # Approximate syllables (count vowel sequences)
    syllable_count = sum(len(re.findall(r'[aeiouy]+', w.lower())) for w in words)
    syllable_count = max(1, syllable_count)

    score = 206.835 - 1.015 * (total_words / total_sentences) - 84.6 * (syllable_count / total_words)
    return round(max(0.0, min(100.0, score)), 1)

def detect_sections(text: str) -> List[str]:
    lower = text.lower()
    detected = []
    for sec in STANDARD_SECTIONS:
        if re.search(r'\b' + re.escape(sec) + r'\b', lower):
            # Normalize to canonical category
            if any(k in sec for k in ["experience", "employment"]):
                canonical = "Work Experience"
            elif "education" in sec:
                canonical = "Education"
            elif any(k in sec for k in ["skills", "technologies", "competencies"]):
                canonical = "Skills & Tech Stack"
            elif any(k in sec for k in ["summary", "profile"]):
                canonical = "Professional Summary"
            elif "project" in sec:
                canonical = "Projects"
            elif any(k in sec for k in ["cert", "license", "award"]):
                canonical = "Certifications & Awards"
            else:
                canonical = sec.title()
            
            if canonical not in detected:
                detected.append(canonical)
    return detected

def count_action_verbs(text: str) -> Tuple[int, List[str]]:
    words = re.findall(r'\b\w+\b', text.lower())
    found = [w for w in words if w in ACTION_VERBS]
    return len(found), list(set(found))

def has_contact_info(text: str) -> Dict[str, bool]:
    has_email = bool(re.search(r'[\w\.-]+@[\w\.-]+\.\w+', text))
    has_phone = bool(re.search(r'(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', text))
    has_linkedin = bool(re.search(r'linkedin\.com/\S+', text, re.IGNORECASE))
    has_github = bool(re.search(r'github\.com/\S+', text, re.IGNORECASE))

    return {
        "email": has_email,
        "phone": has_phone,
        "linkedin": has_linkedin,
        "github": has_github,
    }
