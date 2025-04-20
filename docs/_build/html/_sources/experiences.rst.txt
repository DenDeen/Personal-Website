===========
Experiences
===========

Professional Experience
----------------------------------

.. raw:: html

   <details class="collapsible-section">
      <summary>
         <h3>Data Engineer & Researcher</h3>
         <p class="summary-line"><strong>TechWolf</strong> in Ghent, Belgium | Sep 2023 – Nov 2024</p>
      </summary>
      <div class="details-content">

.. figure:: /_static/assets/companies/techwolf/logo.png
   :align: center
   :alt: TechWolf Logo
   :width: 50%
   :figclass: logo

**Project Context**

`TechWolf <https://www.techwolf.ai/>`_ is an AI scale-up building Skill Intelligence solutions for HR, enabling enterprises to understand workforce skills and support strategic talent decisions. My role in the company evolved from engineering and AI work in the 'SkillData' team to Baekeland-funded research on dynamic career representation learning.

.. figure:: /_static/assets/companies/techwolf/techwolf_diagram.png
   :align: center
   :alt: Diagram showing TechWolf’s Product Ecosystem
   :figclass: diagram
   :width: 90%

   *Figure 1: TechWolf’s Product Ecosystem*

**AI & Modeling**

- Fine-tuned the **Multilingual Skill Tagger (MLST)** transformer for CVs, job descriptions, and performance reviews.
- Reduced model inference time using **quantization** and **ONNX** conversion for efficient deployment.
- Handled noisy training labels through augmentation and robust training strategies.

**Data Engineering**

- Built large-scale ETL pipelines using **PySpark**, **BigQuery**, and **GCP Dataflow**.
- Integrated **data validation**, quality checks, and monitoring for production readiness.
- Ensured full **GDPR compliance** via anonymisation and access control measures.

**Backend & Infrastructure**

- Refactored legacy **Django** services for modularity and reduced duplication.
- Deployed AI components in containerized environments using **Docker** and **Kubernetes**.

**Research & Baekeland Work**

- Developed career pathing models using **dynamic embeddings** and **sequential modeling** (Transformers, Temporal Attention).
- Prototyped skill representations with **NMF** and **VAE** for benchmarking tasks.
- Researched and adapted recent work like **LaborLLM** and **CAREER** to build realistic job transition models.

**Technologies:**  
Python, PyTorch, Transformers, LLMs, PySpark, GCP (Vertex AI, BigQuery, Dataflow), Docker, Kubernetes, ONNX, Django, GitLab CI/CD

.. raw:: html

      </div>
   </details>
   <hr/>

.. raw:: html

   <details class="collapsible-section">
      <summary>
         <h3>Research Intern (MSc Thesis)</h3>
         <p class="summary-line"><strong>Imec</strong> in Leuven, Belgium | Jul 2023 – Sep 2024</p>
      </summary>
      <div class="details-content">

.. figure:: /_static/assets/companies/imec/logo.png
   :align: center
   :alt: Imec Logo
   :figclass: logo
   :width: 50%

**Project Context**

`Imec <https://www.imec-int.com/en>`_ is a world-leading R&D hub in nanoelectronics and integrated circuits (IC) technologies. My MSc thesis project, titled "Expert-Guided Interactive Machine Learning for Integrated Circuit Documentation," addressed the time-consuming and error-prone manual process of documenting experimental semiconductor layouts and linking them to measurement data (design of experiment files). The goal was to create an AI-enhanced (Figure 2), interactive platform to automate and streamline this workflow.

.. figure:: /_static/assets/companies/imec/imec_diagram.png
   :align: center
   :alt: Diagram showing image processing pipeline
   :figclass: diagram
   :width: 70%

   *Figure 2: AI Image Pipeline Diagram*

**AI & Modeling**

- Built an **interactive machine learning (IML)** system to automate documentation of semiconductor layouts (GDSII/OASIS).  
- Applied **YOLOv7** with **SAHI-inspired slicing** for high-resolution object detection of small layout features.  
- Incorporated **DBNet OCR** for detecting text labels directly from layout polygons.  
- Created a feedback loop to retrain the model using **engineer corrections**, improving mAP from 0.77 → 0.85.  

**Desktop Application Development**

.. figure:: /_static/assets/companies/imec/imec_verification.png
   :align: center
   :alt: Frontend application for verification
   :figclass: diagram
   :width: 80%

   *Figure 3: Verification Application*

- Developed a human-in-the-loop desktop tool using **PyQt** with drag/resizable annotations.  
- Visualized detections with color-coded status: unverified, verified, high-risk.  
- Embedded workflows for **model retraining**, evaluation, and data augmentation inside the app.  

**Computer Vision & Mapping**

- Mapped individual **devices** within modules using **OpenCV** and layout-specific heuristics.  
- Post-processed detections using **NMS** and custom filtering rules.  
- Automatically linked detected components to measurement data (**DOE files**).  

**Technologies:**  
Python, PyQt, YOLOv7, OpenCV, KLayout, SAHI, DBNet (OCR), PyTorch, Pandas, NumPy, Git, GDSII/OASIS.

.. raw:: html

      </div>
   </details>
   <hr/>

.. raw:: html

   <details class="collapsible-section">
      <summary>
         <h3>Software Engineer</h3>
         <p class="summary-line"><strong>KU Leuven</strong> in Leuven, Belgium | Oct 2022 – Jan 2023</p>
      </summary>
      <div class="details-content">

.. figure:: /_static/assets/companies/kuleuven/logo.png
   :align: center
   :alt: KU Leuven Logo
   :figclass: logo
   :width: 40%

**Project Context**  

`KU Leuven <https://www.imec-int.com/en>`_ hired me to help redesign the introductory "Artificial Intelligence" course at KU
Leuven. This project aimed to enhance student understanding of
fundamental AI algorithms by creating interactive `demos <https://ml-kuleuven.github.io/ai-course-demos/>`_ of popular machine learning algorithms.

**Project Subject**

I designed and developed an interactive web-based platform to visualise
core AI algorithms:

- Implemented demos for core AI algorithms: Minimax, Dijkstra’s algorithm, Policy Iteration, and Support Vector Machines (SVMs).
- Developed interactive visualisations using D3 and javascript, allowing real-time user interaction (modifying inputs, stepping through execution) to observe algorithm behavior.
- Deployed the tool for student use, improving engagement and comprehension of AI concepts.


**Technologies:**  
Javascript, D3

.. raw:: html

      </div>
   </details>
   <hr/>

.. raw:: html

   <details class="collapsible-section">
      <summary>
         <h3>Software Engineer</h3>
         <p class="summary-line"><strong>DotDash</strong> in Leuven, Belgium | Aug 2021 – Sep 2022</p>
      </summary>
      <div class="details-content">

**Project Context**  

I worked within a small,agile R&D team focused on rapidly prototyping and developing AI-integrated solutions for real-time daat streaming, monitoring, and knowledge extraction.

**Project Subject**

Developed several proof-of-concept:

- Created a custom Grafana plugin for monitoring Neo4j databases using Cypher queries directly within dashboards.
- Developed a real-time anomaly detection pipeline using PySpark Streaming, MQTT (ingestion), and Kafka (message broker).
- Built a RAG (Retrieval Augmented Generation) chatbot utilising a knowledge graph stored in Neo4j to ground the model answers. The model in question was a fine-tuned GPT-2 model that generated CYPHER code to query the database for appropriate information.

**Technologies:**  
Python, PySpark (Streaming), Kafka, Grafana, MQTT, Neo4j (Cypher), Docker, GPT-2

.. raw:: html

      </div>
   </details>
   <hr/>

.. raw:: html

   <details class="collapsible-section">
      <summary>
         <h3>Software Engineer Intern</h3>
         <p class="summary-line"><strong>Roborana Group</strong> in Kontich, Belgium | Feb 2021 – Jun 2021</p>
      </summary>
      <div class="details-content">

.. figure:: /_static/assets/companies/roborana/logo.png
   :align: center
   :alt: Roborana Logo
   :figclass: logo
   :width: 40%

**Project Context**  

Internship at `Roborana <https://www.roborana.com/>`_ focused on exploring and demonstrating automation technologies (RPA, AI) to improve eciency by targeting repetitive business processes. Also designed and trained a forecasting model for covid vaccination predictions in the EU.

**Project Subject**

Developed several proof-of-concept AI-integrated solutions for UiPath:

- Developed proof-of-concept Robotic Process Automation (RPA) solutions using UiPath and Python frameworks to automate tasks like data entry and report generation.
- Explored basic AI techniques (OCR, text classification) for enhancing automation workflows.
- Created an end-to-end forecasting system that retrained a model daily to predict European vaccination numbers using ECDC public data.

**Technologies:**  
Python, UiPath, Streamlit, SKLearn

.. raw:: html

      </div>
   </details>