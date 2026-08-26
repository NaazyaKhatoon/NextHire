from typing import List, Dict, Any

def generate_copilot_reply(message: str, history: List[Dict[str, str]], resume_context: Dict[str, Any]) -> str:
    msg_lower = message.lower().strip()
    target_role = resume_context.get("target_role", "Software Engineer") if resume_context else "Software Engineer"
    score = resume_context.get("score", 88) if resume_context else 88
    skills = resume_context.get("skills", ["React", "Node.js", "Python", "PostgreSQL", "AWS"]) if resume_context else ["React", "Node.js", "Python", "PostgreSQL", "AWS"]
    missing_skills = resume_context.get("missingSkills", ["Kubernetes", "GraphQL", "Docker"]) if resume_context else ["Kubernetes", "GraphQL", "Docker"]

    # 1. Motivation / Pep Talk
    if any(k in msg_lower for k in ["motivat", "pep talk", "feeling down", "rejected", "rejection", "discouraged", "confidence", "give up"]):
        return (
            f"### 🌟 Your NextHire Pep Talk: Remember Who You Are\n\n"
            f"Job hunting can be emotionally exhausting, but here is an undeniable truth: **A rejection is not a reflection of your worth—it's simply market friction and algorithmic noise.**\n\n"
            f"🚀 **3 Truths to Ground Your Mindset Today:**\n"
            f"1. **You only need ONE 'Yes'**: You don't need 100 offers; you only need one hiring manager who recognizes your caliber.\n"
            f"2. **Your skills are valuable**: You have solid experience in **{', '.join(skills[:4])}**. That represents real problem-solving equity.\n"
            f"3. **Iterate like an engineer**: Treat rejections as telemetry data. We tweak the keywords, polish the impact metrics, and deploy the next application.\n\n"
            f"💡 *\"The master has failed more times than the beginner has even tried.\"*\n\n"
            f"Take a deep breath. We have your ATS score optimized at **{score}/100**. Let's keep building momentum. What would you like to tackle next?"
        )

    # 2. ATS Score Breakdown & Explanation
    elif any(k in msg_lower for k in ["why is my ats", "ats score", "score low", "penalty", "score"]):
        return (
            f"### 📊 NextHire Deep ATS Audit Breakdown\n\n"
            f"Your current resume score is **{score}/100** calibrated for **{target_role}** roles.\n\n"
            f"#### 🔍 Key Opportunities for Immediate Score Boost:\n"
            f"- **Target Keyword Density (+8 pts)**: Modern ATS filters scan for exact tool keywords. Adding **{', '.join(missing_skills[:2])}** will push your keyword score past 95%.\n"
            f"- **Metric & Quantifiable Outcomes (+6 pts)**: Ensure at least 3 out of 4 bullet points feature exact percentages, latency drops, or scale numbers (e.g. *'reduced query latency by 35%'*).\n"
            f"- **Section Headings (+3 pts)**: Use standard universal headings (*Professional Summary, Work Experience, Skills & Technologies, Education*).\n\n"
            f"🎯 **Action Step**: Would you like me to rewrite your top work experience bullet to inject **{missing_skills[0] if missing_skills else 'Kubernetes'}**?"
        )

    # 3. Behavioral Interview / STAR Method
    elif any(k in msg_lower for k in ["interview", "star method", "behavioral", "tell me about a time", "questions"]):
        return (
            f"### 🎯 Master Any Behavioral Interview with the STAR Method\n\n"
            f"For **{target_role}** roles, top interviewers evaluate answers structured using **Situation, Task, Action, Result**:\n\n"
            f"#### 💡 Example Framework: *'Tell me about a time you resolved a critical technical challenge.'*\n\n"
            f"1. **Situation (15%)**: *'At my previous company, our primary API experienced a 200% traffic surge during a product launch, causing p99 latency spikes over 800ms.'*\n"
            f"2. **Task (15%)**: *'As the lead engineer on the squad, my objective was to stabilize the database tier and reduce response times without breaking downstream services.'*\n"
            f"3. **Action (50%)**: *'I profiled slow queries, implemented a distributed Redis caching layer for hot endpoints, and containerized the service using Docker and horizontal auto-scaling.'*\n"
            f"4. **Result (20%)**: *'This slashed query latency by 45% to sub-45ms, maintained 99.99% uptime, and saved an estimated $35k in emergency compute costs.'*\n\n"
            f"✨ **Pro Tip**: Keep your answer under 2.5 minutes and always end on the quantifiable business result!"
        )

    # 4. Bullet Rewriting / Impact Injection
    elif any(k in msg_lower for k in ["rewrite", "bullet", "make it better", "xyz formula", "action verb"]):
        return (
            f"### ⚡ NextHire XYZ Bullet Point Transformation Engine\n\n"
            f"To make any resume bullet unforgettable to recruiters, use Google's **XYZ Formula**:\n"
            f"> *Accomplished [X], as measured by [Y], by doing [Z].*\n\n"
            f"#### 📝 Examples for {target_role}:\n\n"
            f"**Weak (Passive Duty)**:\n"
            f"❌ *'Responsible for backend features and helped fix database performance.'*\n\n"
            f"**NextHire Optimized (High Impact)**:\n"
            f"✅ *'Architected 8 resilient Node.js microservices and configured Redis caching, reducing database query load by 38% across 1.2M daily active requests.'*\n\n"
            f"👉 **Paste any of your current bullets below**, and I'll generate 3 tailored variations (*Achievement, Technical Depth, and Leadership*) for you!"
        )

    # 5. Salary Negotiation & Counter-Offers
    elif any(k in msg_lower for k in ["salary", "negotiat", "compensation", "counter offer", "equity"]):
        return (
            f"### 💰 NextHire Strategic Salary Negotiation Guide\n\n"
            f"Never accept the initial offer on the spot! Here is a proven script that adds 10%–20% on average:\n\n"
            f"```text\n"
            f"Dear [Hiring Manager / Recruiter],\n\n"
            f"Thank you so much for extending the offer for the {target_role} position. I am genuinely excited about the vision of the team and the opportunity to make an immediate impact.\n\n"
            f"Based on my 5+ years of experience delivering scalable systems in {', '.join(skills[:3])}, alongside current market benchmarks for this seniority, I was targeting a base salary in the range of $[Target + 15k].\n\n"
            f"If we can align closer to this figure (or adjust signing bonus/equity), I am ready to sign and accept immediately.\n\n"
            f"Looking forward to finding a mutually great outcome!\n\n"
            f"Best regards,\n"
            f"[Your Name]\n"
            f"```\n\n"
            f"🔑 **Golden Rule**: Always express enthusiasm first, frame your counter with market data and specific technical value, and keep the tone collaborative."
        )

    # 6. Cold Outreach / Recruiter LinkedIn DM
    elif any(k in msg_lower for k in ["cold email", "reach out", "linkedin message", "message recruiter", "dm"]):
        return (
            f"### 📩 High-Converting Recruiter Outreach Template (80%+ Open Rate)\n\n"
            f"Short, punchy, and value-first messages get responses. Use this format on LinkedIn or Email:\n\n"
            f"```text\n"
            f"Subject: {target_role} opportunity — [Your Name] (5+ yrs in {skills[0] if skills else 'Tech'})\n\n"
            f"Hi [Recruiter Name],\n\n"
            f"I saw that [Company Name] is scaling its engineering team for {target_role}. \n\n"
            f"Over the last 5 years, I've specialized in building high-scale applications in {', '.join(skills[:3])}, most recently reducing system latency by 40% across 500k MAUs at my previous role.\n\n"
            f"I'd love to learn more about the team's roadmap. Are you open to a brief 10-minute chat this Thursday or Friday?\n\n"
            f"Resume & GitHub attached: [link]\n\n"
            f"Best,\n"
            f"[Your Name]\n"
            f"```\n\n"
            f"💡 **Tip**: Send connection requests on Tuesday or Wednesday mornings between 8:30 AM – 10:00 AM for maximum response rates."
        )

    # 7. One-Page Resume Trimming
    elif any(k in msg_lower for k in ["one page", "length", "too long", "shorten", "trim"]):
        return (
            f"### 📄 4 Golden Rules to Fit Your Resume on Exactly 1 Page\n\n"
            f"1. **Cap Experience Bullets**: Limit your current role to 4 bullets, and previous roles to 2–3 bullets each.\n"
            f"2. **Eliminate Fluff**: Remove 'References available upon request', full street addresses, and passive hobbies.\n"
            f"3. **Condense Skills into Badges**: Group technical skills into a single concise line (e.g. *Languages, Frameworks, Cloud & DevOps*).\n"
            f"4. **Margins & Font**: Use 0.5-inch margins with 10pt Inter/Roboto font. (Our **NextHire Minimalist** and **Modern Pro** templates do this automatically!)."
        )

    # 8. Skill Learning Roadmap
    elif any(k in msg_lower for k in ["learn", "skill", "roadmap", "what should i learn", "technolog"]):
        return (
            f"### 🗺️ High-ROI Skills Roadmap for {target_role} (2026 Hiring Trends)\n\n"
            f"Based on current enterprise hiring telemetry, here are the top 3 highest-leverage skills to add to your repertoire:\n\n"
            f"1. **{missing_skills[0] if missing_skills else 'Kubernetes & Docker'}**: Containerization and cloud-native architecture are mandatory for 85%+ of senior roles.\n"
            f"2. **AI & LLM Integration (LangChain, OpenAI API)**: Adding AI microservices capabilities can increase compensation bands by 15%–25%.\n"
            f"3. **System Observability (Datadog, Prometheus, OpenTelemetry)**: Proves you can manage production systems under enterprise load.\n\n"
            f"Would you like recommendations for project ideas to showcase these skills on your resume?"
        )

    # 9. General / Default ChatGPT-Style Response
    else:
        return (
            f"### 🤖 NextHire Career Advisor\n\n"
            f"I have reviewed your career background as a **{target_role}** (Current ATS score: **{score}/100**).\n\n"
            f"Here is how we can accelerate your job search today:\n"
            f"- **Resume Bullet Optimization**: Transform any duty into a metric-driven achievement.\n"
            f"- **ATS Keyword Injection**: Close the gap on **{', '.join(missing_skills)}**.\n"
            f"- **Interview Preparation**: Practice STAR behavioral questions and system design scenarios.\n"
            f"- **Recruiter Outreach**: Generate custom cold email and LinkedIn templates.\n\n"
            f"What specific area would you like to work on right now?"
        )
