import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle, KeepTogether
from reportlab.pdfgen import canvas

def build_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=40,
        rightMargin=40,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()
    
    # Custom Palette
    primary_color = colors.HexColor("#111111")
    accent_color = colors.HexColor("#ff5722")
    subtext_color = colors.HexColor("#333333")
    body_color = colors.HexColor("#262626")
    meta_color = colors.HexColor("#4a4a4a")
    rule_color = colors.HexColor("#222222")
    
    # Styles
    name_style = ParagraphStyle(
        'NameStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=primary_color,
        alignment=0
    )
    
    title_style = ParagraphStyle(
        'TitleStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=subtext_color,
        alignment=0
    )
    
    contact_style = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=meta_color,
        alignment=0
    )
    
    section_head_style = ParagraphStyle(
        'SectionHead',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=13,
        textColor=primary_color,
        spaceBefore=7,
        spaceAfter=3,
        textTransform='uppercase'
    )
    
    body_style = ParagraphStyle(
        'BodyText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=body_color,
        alignment=4 # Justified
    )
    
    job_title_style = ParagraphStyle(
        'JobTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        textColor=primary_color
    )
    
    job_tech_style = ParagraphStyle(
        'JobTech',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8,
        leading=10.5,
        textColor=colors.HexColor("#555555")
    )
    
    bullet_style = ParagraphStyle(
        'BulletText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.2,
        leading=11,
        textColor=body_color,
        leftIndent=10,
        firstLineIndent=-6,
        spaceAfter=1.5
    )

    story = []

    # 1. Header
    story.append(Paragraph("MOHD SAHIL MOHD SWALEH", name_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("Aspiring AI &amp; ML Engineer", title_style))
    story.append(Spacer(1, 2))
    contact_html = (
        "Mumbai, Maharashtra, India &nbsp;|&nbsp; "
        "Phone: <b>9628304015</b> &nbsp;|&nbsp; "
        "Email: <a href='mailto:ks9137581@gmail.com' color='#1155cc'><u>ks9137581@gmail.com</u></a><br/>"
        "GitHub: <a href='https://github.com/mohdsahil-dev' color='#1155cc'><u>github.com/mohdsahil-dev</u></a> &nbsp;|&nbsp; "
        "LinkedIn: <a href='https://www.linkedin.com/in/sahil-chaudhary-582887416/' color='#1155cc'><u>linkedin.com/in/sahil-chaudhary-582887416</u></a>"
    )
    story.append(Paragraph(contact_html, contact_style))
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=1.2, color=rule_color, spaceBefore=2, spaceAfter=5))

    # 2. Professional Summary
    story.append(Paragraph("PROFESSIONAL SUMMARY", section_head_style))
    story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor("#888888"), spaceBefore=1, spaceAfter=4))
    summary_text = (
        "Third-year Computer Science Engineering student specializing in Artificial Intelligence and Machine Learning at the University of Mumbai. "
        "Passionate about building practical, intelligent applications using Python, AI/ML, and modern web technologies, "
        "with hands-on experience developing full-stack projects and participating in hackathons to solve real-world problems."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 3))

    # 3. Technical Skills
    story.append(Paragraph("TECHNICAL SKILLS", section_head_style))
    story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor("#888888"), spaceBefore=1, spaceAfter=4))
    
    skills_data = [
        [Paragraph("<b>Programming Languages:</b>", body_style), Paragraph("Python, JavaScript", body_style)],
        [Paragraph("<b>Artificial Intelligence &amp; ML:</b>", body_style), Paragraph("Artificial Intelligence, Machine Learning, Deep Learning Fundamentals", body_style)],
        [Paragraph("<b>Web Development:</b>", body_style), Paragraph("HTML, CSS, JavaScript, Flask", body_style)],
        [Paragraph("<b>Databases:</b>", body_style), Paragraph("SQL, MySQL", body_style)],
        [Paragraph("<b>Tools &amp; Technologies:</b>", body_style), Paragraph("Git, GitHub", body_style)]
    ]
    
    skills_table = Table(skills_data, colWidths=[155, 375])
    skills_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0.8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0.8),
    ]))
    story.append(skills_table)
    story.append(Spacer(1, 3))

    # 4. Projects
    story.append(Paragraph("PROJECTS", section_head_style))
    story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor("#888888"), spaceBefore=1, spaceAfter=4))

    # Project 1: NexusAI
    story.append(Paragraph("<b>NexusAI – AI-Powered Business Platform</b>", job_title_style))
    story.append(Paragraph("Technologies: Python, AI/ML, Flask, MySQL, JavaScript", job_tech_style))
    story.append(Paragraph("• Developed an AI-powered platform enabling small and medium businesses to manage core operations including invoicing, email communication, customer support, and HR through a unified dashboard.", bullet_style))
    story.append(Paragraph("• Built AI-driven modules such as a Business Assistant, Meeting Summarizer, Sales Predictor, and Inventory Forecasting tool to automate everyday business tasks.", bullet_style))
    story.append(Paragraph("• Integrated an Expense Analysis and centralized Business Dashboard to consolidate key operational data for decision-making.", bullet_style))
    story.append(Spacer(1, 3))

    # Project 2: College Management System
    story.append(Paragraph("<b>College Management System</b>", job_title_style))
    story.append(Paragraph("Technologies: Python, Flask, MySQL, HTML, CSS, JavaScript", job_tech_style))
    story.append(Paragraph("• Designed and built a role-based web application for administrators, teachers, and students to manage academic and administrative workflows.", bullet_style))
    story.append(Paragraph("• Implemented separate modules for student management and academic information handling, streamlining access based on user roles.", bullet_style))
    story.append(Spacer(1, 3))

    # Project 3: Personal Expense Tracker
    story.append(Paragraph("<b>Personal Expense Tracker</b>", job_title_style))
    story.append(Paragraph("Technologies: Python, Flask, MySQL, HTML, CSS", job_tech_style))
    story.append(Paragraph("• Built a web application for tracking and managing personal expenses with a simple, practical user interface for day-to-day use.", bullet_style))
    story.append(Spacer(1, 3))

    # Project 4: Fake Review Detection System
    story.append(Paragraph("<b>Fake Review Detection System</b>", job_title_style))
    story.append(Paragraph("Technologies: Python, Machine Learning", job_tech_style))
    story.append(Paragraph("• Created a Machine Learning-based system to identify potentially fake or suspicious product reviews, applying core ML concepts to a real-world e-commerce problem.", bullet_style))
    story.append(Spacer(1, 3))

    # 5. Hackathons & Activities
    story.append(Paragraph("HACKATHONS &amp; ACTIVITIES", section_head_style))
    story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor("#888888"), spaceBefore=1, spaceAfter=4))
    story.append(Paragraph("• Participate in hackathons and technology competitions focused on AI and software-based solutions.", bullet_style))
    story.append(Paragraph("• Collaborate with team members to design and develop project solutions under time constraints.", bullet_style))
    story.append(Paragraph("• Work on innovative AI and software project ideas aimed at solving real-world problems.", bullet_style))
    story.append(Spacer(1, 3))

    # 6. Education
    story.append(Paragraph("EDUCATION", section_head_style))
    story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor("#888888"), spaceBefore=1, spaceAfter=4))
    edu_text = (
        "<b>Bachelor of Engineering (B.E.) – Computer Science Engineering (Artificial Intelligence &amp; Machine Learning)</b><br/>"
        "University of Mumbai &nbsp;|&nbsp; Third Year &nbsp;|&nbsp; Semester IV CGPA: <b>7.52</b>"
    )
    story.append(Paragraph(edu_text, body_style))

    doc.build(story)
    print(f"Successfully created {filename}")

if __name__ == "__main__":
    os.makedirs("assets", exist_ok=True)
    build_pdf("assets/Mohd_Sahil_Resume.pdf")
    build_pdf("assets/resume.pdf")
