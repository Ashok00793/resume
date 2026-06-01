const RESUME_DATA = {
  personal: {
    name: "Dr. Ashokkumar Kumaravel",
    title: "Biotechnology & Microbial Engineering Researcher",
    email: "bioashok00793@gmail.com",
    phone: "+91 8438330863",
    orcid: "0000-0002-3669-4986",
    linkedin: "https://www.linkedin.com/in/ashokkumar-kumeravel",
    scopusId: "57515216700",
    stats: {
      citations: 161,
      hIndex: 7,
      i10Index: 5,
      totalPublications: 12
    },
    summary: "Biotechnology and Microbiology Expert with a focus on molecular biology, metabolic engineering, and nanomaterials. Delivered sustainable technologies through research initiatives in wastewater treatment, environmental management, and biomaterial innovation."
  },
  
  education: [
    {
      degree: "Ph.D. in Chemical Engineering (Microbial Biotechnology)",
      institution: "University of Ulsan",
      location: "Ulsan, South Korea",
      period: "Mar 2019 – Feb 2024",
      mentor: "Prof. Dr. Soon Ho Hong",
      grade: "Grade: 94%",
      details: "Specialized in microbial cell surface display (MCSD), metabolic pathway engineering, and green synthesis of functional metal nanoparticles for bioremediation and cancer therapies."
    },
    {
      degree: "Master of Science (M.Sc.) in Biotechnology",
      institution: "Bharathiar University",
      location: "Tamil Nadu, India",
      period: "2016 – 2018",
      grade: "Grade: 74%",
      details: "Core focus on molecular genetics, immunology, plant/animal cell biotechnology, and industrial fermentation processes."
    },
    {
      degree: "Bachelor of Science (B.Sc.) in Biotechnology",
      institution: "Bharathiar University",
      location: "Tamil Nadu, India",
      period: "2011 – 2014",
      grade: "Grade: 74%",
      details: "Foundational training in cell biology, biochemistry, microbiology, biophysics, and organic chemistry."
    }
  ],

  experience: [
    {
      role: "Research Associate",
      organization: "Bharat Institute of Higher Education and Research",
      location: "Chennai, Tamil Nadu, India",
      period: "Jan 2026 – Present",
      mentor: "Prof. Dr. Palanivel Velmurugan",
      details: "Leading a national-level project focused on engineering Pseudomonas denitrificans for the efficient biosynthesis of Poly(3-hydroxypropionate) [P(3HP)] from glycerol and gluconate, contributing directly to industrial-scale biodegradable biopolymer production."
    },
    {
      role: "Research Fellow",
      organization: "National Taiwan University (NTU)",
      location: "Taipei, Taiwan",
      period: "Nov 2024 – Nov 2025",
      details: "Worked on transforming agricultural waste (specifically peanut shell powder) into highly functional, high-performance Bacterial Cellulose (BC) membranes for sustainable packaging applications. Designed chemical and enzymatic pretreatment strategies that yielded a ~40% increase in BC tensile strength and superior mechanical characteristics."
    },
    {
      role: "Ph.D. Researcher & Teaching Assistant",
      organization: "University of Ulsan",
      location: "Ulsan, South Korea",
      period: "Mar 2019 – Feb 2024",
      details: "Developed a novel microbial cell-surface display (MCSD) system in recombinant Escherichia coli to express cobalt-binding peptides on outer membranes (using OmpC and YiaT anchors). Reused bioadsorbed cobalt on cells to calcinate into highly functional cobalt oxide (Co3O4) nanoparticles, showing exceptional norfloxacin drug degradation, methylene blue dye degradation, and in vitro anticancer potential."
    },
    {
      role: "Adjunct Professor",
      organization: "Academy of Maritime Education and Training (AMET) Deemed to be University",
      location: "Chennai, Tamil Nadu, India",
      period: "Since Dec 2025",
      details: "Concurrently delivered lectures and mentored student projects at the Centre for Research and Innovation, focusing on marine biotechnology, eco-friendly nanomaterials, and environmental microbiology."
    }
  ],

  skills: {
    molecular: [
      "Molecular cloning",
      "Gene addition/Deletions/ mutations",
      "Metabolic engineering through genetic engineering in microbes",
      "Microbial cell culture",
      "Primer designing",
      "PCR & qPCR",
      "AGE & SDS-PAGE",
      "Proficient in operating bioreactors"
    ],
    material: [
      "Green Synthesis of Nanoparticles",
      "Chemical Synthesis of Nanoparticles",
      "Microbial Synthesis of Nanoparticles",
      "Metal Biosorption & Metal Recovery",
      "Photocatalytic Dye/Drug Degradation"
    ],
    analytical: [
      "ICP-OES (Inductively coupled plasma-optical emission spectrometry)",
      "X-ray Diffraction (XRD)",
      "FTIR & Raman spectroscopy",
      "XPS (X-ray Photoelectron Spectroscopy)",
      "TEM & SEM Imaging",
      "Zeta Analyzer",
      "HPLC & GC-MS"
    ],
    software: [
      "Python & R Programming",
      "Statistical Tools",
      "Molecular Docking",
      "Online Bioinformatic tools",
      "Origin",
      "Image and Diameter J",
      "X'Pert high score plus",
      "Microsoft Office"
    ]
  },

  awards: [
    {
      title: "Taiwan Postdoctoral Fellowship",
      agency: "National Science and Technology Council (NSTC) - Taiwan",
      period: "Nov 2024 – May 2025",
      description: "Postdoctoral research scholarship for optimizing bio-active components in Ganoderma lucidum mycelium using PCS bioreactors."
    },
    {
      title: "Brain Korea 21 (BK21) National Scholarship",
      agency: "Government of South Korea",
      period: "Apr 2020 – Mar 2022",
      description: "Highly competitive national scholarship awarded to outstanding doctoral scholars in engineering and technology fields."
    },
    {
      title: "Low Carbon Green Energy Project Scholarship",
      agency: "City of Ulsan, South Korea",
      period: "Jul 2022 – Feb 2024",
      description: "Scholarship funding for PhD research addressing industrial heavy metal recovery and environmental remediation."
    }
  ],

  patent: {
    title: "Synthesis of cobalt oxide nanoparticles by recombinant microorganisms with modified cell surface and their use",
    inventors: "Ashokkumar Kumaravel, Soon Ho Hong, Sung Gu Kang",
    agency: "South Korea Taebaek Patent Firm",
    applicationNo: "10-2023-0122295 / 1-1-2023-1017641-54",
    date: "Sept 14, 2023",
    status: "Published / Taebaek Patent Firm Ref: 9-2008-100101-3",
    description: "Covers the cell-surface engineering of recombinant microbes to express binding peptides, biological adsorption of heavy metal ions, and thermal calcination of metal-bound biomass to synthesize highly active metal oxide nanoparticles."
  },

  underReview: [
    {
      title: "Electrospun Polymeric Biomaterials: From Fundamental Design to Advanced Biomedical Applications",
      authors: "Chandran, L., Kumaravel, A., Yohan, R. K., Tota, J., Jagannathan, M., Ben Moussa, S., Alzahrani, A.",
      journal: "Advanced Industrial and Engineering Polymer Research",
      impactFactor: "12.0",
      status: "Under Review (Q1)"
    },
    {
      title: "Valorization of Peanut Shell Waste into High-Performance Bacterial Cellulose: Comparative Evaluation of Pretreatment Strategies and Process Integration",
      authors: "Ashokkumar Kumaravel, Sathiyamoorthy Padmanaban, Saranya Shanmugasundaram Saranya, Likha Chandran",
      journal: "International Journal of Biological Macromolecules",
      impactFactor: "8.5",
      status: "Under Review (Q1)"
    },
    {
      title: "Phytochemical profiling and multifunctional biodiversity of Acorus calamus: Isolation of Isocaespitol and its antidiabetic and anti-inflammatory potential via In vitro and In silico approaches",
      authors: "Ashokkumar Kumaravel, Sathiyamoorthy Padmanaban, Saranya Shanmugasundaram Saranya, Bharat Bhargawa",
      journal: "Frontiers in Pharmacology",
      impactFactor: "4.8",
      status: "Under Review (Q1)"
    },
    {
      title: "Development and Evaluation of a Yogurt-Based Functional Formulation Enriched with Glycyrrhiza glabra and Solanum nigrum",
      authors: "Ashokkumar Kumaravel, Sathiyamoorthy Padmanaban, Saranya Shanmugasundaram Saranya, Senthamil Selvi Poongavanam",
      journal: "Journal of Functional Foods",
      impactFactor: "4.0",
      status: "Under Review (Q1)"
    }
  ],

  bookChapters: [
    {
      title: "Microbes in Water, Sanitation, and Public Health: A Data-Driven Analysis of Pathogen Dynamics and Intervention Efficacy",
      authors: "Sriya D., Ashokkumar Kumaravel, Saranya Shanmugasundaram",
      publisher: "Scopus Indexed",
      status: "In Progress"
    },
    {
      title: "The Role of Fusobacterium in Biofilm Development: A Central Bridge to Pathogenesis",
      authors: "Ashokkumar Kumaravel, Saranya Shanmugasundaram, Likha Chandran, Senthamil Selvi Poongavanam",
      publisher: "Scopus Indexed",
      status: "In Progress"
    },
    {
      title: "Hidden Threats: Chemical and Biological Contaminants in water and their adverse impact in human health",
      authors: "Ashokkumar Kumaravel, Likha Chandran, Saranya Shanmugasundaram",
      publisher: "Scopus Indexed",
      status: "In Progress"
    },
    {
      title: "Microplastics and Organic Pollutants: Accumulation, Bioavailability, and Ecological Consequences in Coastal and Estuarine Systems",
      authors: "Sriya D., Ashokkumar Kumaravel, Saranya Shanmugasundaram",
      publisher: "Scopus Indexed",
      status: "In Progress"
    },
    {
      title: "MicroRNA-Edited Gut Microbiota as an Epigenetic Vector",
      authors: "Kotthapalli Prashanth, Ashokumar Kumarvel, Y. Aparna, S. Anju, Laurent Dufosse, Jamil Talukder, Sumana Kumar",
      publisher: "Scopus Indexed",
      status: "In Progress"
    },
    {
      title: "Post-COVID-19 Era: A Bloom in Antibiotic Resistance in Microbial Community",
      authors: "Ashokkumar Kumaravel, K. Anuradha, Shalini Rachel, Kotthapalli Prashanth, Sumana Kumar",
      publisher: "Scopus Indexed",
      status: "In Progress"
    }
  ],

  publications: [
    {
      id: "W7147521459",
      title: "Cobalt oxide nanoparticle synthesis by cell surface-engineered recombinant Escherichia coli and the potential application on photocatalytic degradation of norfloxacin",
      year: 2026,
      citations: 0,
      doi: "https://doi.org/10.1016/j.rineng.2026.110349",
      journal: "Results in Engineering",
      abstract: "Peptide-mediated biosorption offers a sustainable and selective approach for cobalt recovery, enabling the synthesis of functional Co3O4 nanoparticles for environmental remediation. This research investigated the cobalt-binding affinity of the peptide CP2 and its derivative fractions, CF3 and CF4, displayed on the Escherichia coli cell surface via the outer membrane protein YiaT. Adsorption experiments showed that cells displaying CF4 exhibited the highest cobalt adsorption of 1865 ± 90 µmol/g dry cell weight (DCW) at 2 mM cobalt concentration, outperforming CP2 and CF3. Selectivity analysis at 1 mM revealed that both CF3 and CF4 preferentially adsorbed cobalt over nickel and manganese. Calcination of cobalt-adsorbed cells resulted in the formation of cobalt oxide (Co3O4) nanoparticles, as confirmed by energy-dispersive X-ray spectroscopy (EDS), X-ray diffraction (XRD), X-ray photoelectron spectroscopy (XPS), and UV-diffuse reflectance spectroscopy (UV–DRS). Further particle characterization using field-emission scanning electron microscopy (FE-SEM) and zeta particle size analysis revealed an average particle size of 104.5 nm and a zeta potential of –10.2 mV. The photocatalytic performance of Co3O4 nanoparticles was evaluated for norfloxacin degradation, achieving 90% degradation at a catalyst dosage of 1 g/L, while pH-dependent studies at 0.8g/L identified pH 7 as the optimum condition, yielding a degradation efficiency of 86% within 90 min. These findings highlight the effectiveness of YiaT-mediated peptide display for selective cobalt biosorption and the potential of peptide-mediated Co3O4 nanoparticles for photocatalytic environmental remediation.",
      pdf_url: "https://doi.org/10.1016/j.rineng.2026.110349",
      tags: ["Biotechnology", "Nanoparticles", "Wastewater", "Genetic Engineering"],
      impactFactor: "7.9"
    },
    {
      id: "W7142395433",
      title: "E. coli surface-displayed nickel-binding peptides for preferential nickel recovery from battery wastewater: Computational modelling and experimental validation",
      year: 2026,
      citations: 0,
      doi: "https://doi.org/10.1016/j.jenvman.2026.129379",
      journal: "Journal of Environmental Management",
      abstract: "In this study, engineered E. coli BL21(DE3) strains were constructed to display nickel-binding peptides (NBPs) on the surface via fusion to the outer membrane protein OmpC. Four NBPs were evaluated for nickel adsorption and metal-ion selectivity, using a combination of computational predictions and experimental validation. Computational analyses predicted peptide structure, localization, electrochemical properties, and Ni 2+ binding sites. Among the tested NBPs, NBP4 exhibited the highest nickel adsorption and selectivity (Ni > Co > Mn > Li) across the evaluated concentration range. In real battery wastewater, all strains effectively removed nickel, with NBP4 achieving the highest removal rate (90%), followed by NBP1, NBP2, and NBP3. Reuse of NBP4-displaying cells decreased the adsorption efficiency from 90% to 22% over five cycles. Field emission scanning electron microscopy (FE-SEM) and energy-dispersive spectroscopy (EDS) analysis confirmed nickel adsorption on the cell surface. Calcination of metal-bound cells yielded crystalline, cubic nickel oxide (NiO) nanoparticles measuring 400–600 nm, as verified by X-ray diffraction (XRD), FE-SEM, and Nano Zeta sizer analyses. These findings demonstrate that peptide-displaying bacterial systems have significant potential to adsorb and recover nickel from industrial effluents.",
      pdf_url: "https://doi.org/10.1016/j.jenvman.2026.129379",
      tags: ["Bioremediation", "Nickel Recovery", "Wastewater", "Computational Modeling"],
      impactFactor: "8.4"
    },
    {
      id: "W4410119783",
      title: "Unlocking the potential of bacterial cellulose: synthesis, functionalization, and industrial impact",
      year: 2025,
      citations: 11,
      doi: "https://doi.org/10.1016/j.ijbiomac.2025.143951",
      journal: "International Journal of Biological Macromolecules",
      abstract: "Bacterial Cellulose (BC) is a highly crystalline, pure biopolymer synthesized by certain bacterial strains. This study comprehensive reviews and optimizes strategies to unlock BC's structural potential through tailored cultivation and enzymatic functionalization. Drawing from research optimizing agricultural waste pre-treatments, we evaluate physical, chemical, and industrial processing methods. Pretreatment of peanut shells via optimized acid-enzymatic pathways allowed valorization into high-performance BC sheets with improved water-retention and mechanical properties. Tensile strength improved by approximately 40%, outlining its viability in replacing fossil-fuel-based packaging materials. Dynamic alignment of cellulose nanofibrils and structural integration are analyzed, proving the immense potential of BC as an eco-friendly high-barrier polymer in modern food packaging, biomedical engineering, and industrial design.",
      pdf_url: "https://doi.org/10.1016/j.ijbiomac.2025.143951",
      tags: ["Bacterial Cellulose", "Packaging", "Waste Valorization", "Biomaterials"],
      impactFactor: "8.5"
    },
    {
      id: "W4396622262",
      title: "Surface engineered recombinant Escherichia coli for the potential application of the cobalt contaminated wastewater treatment and the photocatalytic dye degradation",
      year: 2024,
      citations: 7,
      doi: "https://doi.org/10.1016/j.biortech.2024.130796",
      journal: "Bioresource Technology",
      abstract: "Heavy metal effluents present a serious global challenge. In this study, we successfully engineered Escherichia coli using cell-surface display technology to express cobalt-specific binding peptides. By fusion with the outer membrane anchor proteins, these engineered whole-cell biocatalysts demonstrated extremely rapid adsorption kinetics and high affinity for cobalt ions in synthetic and industrial wastewater. Additionally, the cobalt-laden biomass was recovered and successfully utilized in the photocatalytic degradation of organic dye contaminants under light irradiation. This work establishes a cyclic bioremediation loop: utilizing genetic engineering for metal biosorption and translating toxic wastes into functional nanomaterials for organic pollutant degradation.",
      pdf_url: "https://doi.org/10.1016/j.biortech.2024.130796",
      tags: ["Cell-Surface Display", "Cobalt", "Biosorption", "Dye Degradation"],
      impactFactor: "9.0"
    },
    {
      id: "W4400466881",
      title: "Cobalt Oxide Nanoparticle Synthesis by Cell-Surface-Engineered Recombinant Escherichia coli and Potential Application for Anticancer Treatment",
      year: 2024,
      citations: 4,
      doi: "https://doi.org/10.1021/acsomega.3c10246",
      journal: "ACS Omega",
      abstract: "Cell surface display engineering facilitated the development of a cobalt-binding hybrid Escherichia coli. OmpC served as the molecular anchor for showcasing the cobalt-binding peptides (CBPs), creating the structural model of the hybrid OmpC–CBPs (OmpC–CP, OmpC–CF). Subsequently, the recombinant peptide’s cobalt adsorption and retrieval effectiveness were evaluated at various concentrations. When subjected to a pH of 7 and a concentration of 2 mM, OmpC–CF exhibited a significantly higher cobalt recovery rate (2183.87 mol/g DCW) than OmpC–CP. The strain with bioadsorbed cobalt underwent thermal treatment at varying temperatures (400 °C, 500 °C, 600 °C, and 700 °C) and morphological characterization of the thermally decomposed cobalt nanoparticle oxides using diverse spectroscopy techniques. The analysis showed that nanoparticles confined themselves to metal ions, and EDS mapping detected the presence of cobalt on the cell surface. Finally, the nanoparticles’ anticancer potential was assessed by subjecting them to heating at 500 °C in a furnace; they demonstrated noteworthy cytotoxicity, as evidenced by IC50 values of 59 μg/mL. These findings suggest that these nanoparticles hold promise as potential anticancer agents. Overall, this study successfully engineered a recombinant E. coli capable of efficiently binding to cobalt, producing nanoparticles with anticancer properties. The results of this investigation could have significant implications for advancing novel cancer therapies.",
      pdf_url: "https://pubs.acs.org/doi/pdf/10.1021/acsomega.3c10246",
      tags: ["Nanoparticles", "Cobalt Oxide", "Anticancer", "Cell-Surface Display"],
      impactFactor: "4.3"
    },
    {
      id: "W4389312003",
      title: "Photocatalytic Reduction of Methylene Blue by Surface-Engineered Recombinant Escherichia coli as a Whole-Cell Biocatalyst",
      year: 2023,
      citations: 1,
      doi: "https://doi.org/10.3390/bioengineering10121389",
      journal: "Bioengineering",
      abstract: "A novel Escherichia coli strain, created by engineering its cell surface with a cobalt-binding peptide CP1, was investigated in this study. The recombinant strain, pBAD30-YiaT-CP1, was structurally modeled to determine its cobalt-binding affinity. Furthermore, the effectiveness and specificity of pBAD30-CP1 in adsorbing and extracting cobalt from artificial wastewater polluted with the metal were investigated. The modified cells were subjected to cobalt concentrations (0.25 mM to 1 mM) and pH levels (pH 3, 5, 7, and 9). When exposed to a pH of 7 and a cobalt concentration of 1 mM, the pBAD30-CP1 strain had the best cobalt recovery efficiency, measuring 1468 mol/g DCW (Dry Cell Weight). Furthermore, pBAD30-CP1 had a higher affinity for cobalt than nickel and manganese. Field Emission Scanning Electron Microscopy (FE-SEM), Transmission Electron Microscopy (TEM), and Energy-Dispersive X-ray Spectroscopy (EDS) were used to examine the physiochemical parameters of the recombinant cells after cobalt adsorption. These approaches revealed the presence of cobalt in a bound state on the cell surface in the form of nanoparticles. In addition, the cobalt-binding recombinant strains were used in the photocatalytic reduction of methylene blue, which resulted in a 59.52% drop in the observed percentage. This study shows that modified E. coli strains have the potential for efficient cobalt recovery and application in environmental remediation operations.",
      pdf_url: "https://www.mdpi.com/2306-5354/10/12/1389/pdf?version=1701688536",
      tags: ["Methylene Blue", "Whole-Cell Biocatalyst", "Heavy Metal Recovery", "Photocatalysis"],
      impactFactor: "3.7"
    },
    {
      id: "W4366758159",
      title: "Impact of the Synthetic Scaffold Strategy on the Metabolic Pathway Engineering",
      year: 2023,
      citations: 8,
      doi: "https://doi.org/10.1007/s12257-022-0350-z",
      journal: "Biotechnology and Bioprocess Engineering",
      abstract: "Scaffold strategies have emerged as highly efficient molecular frameworks in synthetic biology. By physically co-localizing sequential enzymes along metabolic pathways, protein and nucleic acid scaffolds optimize intermediate flux, prevent the leakage of toxic intermediates, and overcome thermodynamic limitations. This review systematically analyzes modern scaffolding designs, including protein-based scaffolds (such as SH3-PDZ-GBD designs), RNA/DNA nanostructure assemblies, and biological membrane compartmentalization. We evaluate their application across diverse microbial platforms (E. coli, S. cerevisiae) and examine their capacity to boost titers of organic acids, amino acids, and biofuels. Quantitative impacts of enzyme spatial organization, scaffold geometry, linker lengths, and expression balance are explored, offering a robust guide for designing high-yield microbial cell factories.",
      pdf_url: "https://doi.org/10.1007/s12257-022-0350-z",
      tags: ["Protein Scaffold", "Metabolic Engineering", "Synthetic Biology", "Enzymes"],
      impactFactor: "3.0"
    },
    {
      id: "W4205768556",
      title: "Analysis of the Hybrid of Mudar/Snake Grass Fiber-Reinforced Epoxy with Nano-Silica Filler Composite for Structural Application",
      year: 2022,
      citations: 66,
      doi: "https://doi.org/10.1155/2022/7805146",
      journal: "Advances in Materials Science and Engineering",
      abstract: "Natural fiber composite materials are competent materials that may replace conventional synthetic materials where the strength to weight ratio is essential. In this paper, the mechanical characteristics of composites made up of randomly oriented natural fibers (mudar fiber and snake grass fiber) with nano-silica filler are detailed for the first time. From the various literature surveys, the critical length of mudar and snake grass fiber is chosen as 40 mm and 30 mm, respectively. The test samples were prepared with a fiber content of 10%, 20%, 30%, and 40% with an equal amount of mudar and snake grass fiber. The percentage of nano-filler is maintained as constant as 3% with all the compositions. The composites showed that the highest mechanical properties were found at 30% fiber volume. The maximum tensile strength is 45 MPa, and the flexural strength is 51 MPa. The maximum impact strength is 4.5 J. Sample ID 3 provided the best results compared to other proportions. The fiber/matrix adhesion was investigated using a scanning electron microscope (SEM). These predominant mechanical properties make it easier for the implementation of the prepared composite material in structural and automotive applications.",
      pdf_url: "https://downloads.hindawi.com/journals/amse/2022/7805146.pdf",
      tags: ["Biomaterials", "Natural Fibers", "Epoxy Composites", "Nano-Silica"],
      impactFactor: "2.3"
    },
    {
      id: "W4291512135",
      title: "Biomedical and Textile Applications of Alternanthera sessilis Leaf Extract Mediated Synthesis of Colloidal Silver Nanoparticle",
      year: 2022,
      citations: 23,
      doi: "https://doi.org/10.3390/nano12162759",
      journal: "Nanomaterials",
      abstract: "The aqueous extract of Alternanthera sessilis (As) acts as the precursors for the quick reduction of silver ions, which leads to the formation of silver nanoparticles. In the agar, well diffusion method of the Klebsiella pneumoniae shows the minimal inhibitory concentration of 12 mm against A. sessilis mediated silver nanoparticles (As-AgNPs) at 60 µg/mL concentration. Fabric treated with novel AS-AgNPs is tested against the K. pneumoniae and shows an inhibitory action of 12 mm with mixed cotton that determines the antimicrobial efficacy of the fabrics. Uv- visible spectrophotometer was performed, showing a surface plasmon resonance peak at 450 nm cm−1. FTIR shows the vibration and the infrared radiation at a specific wavelength of 500–4000 cm−1. The HR-TEM analysis showed the presence of black-white crystalline, spherical-shaped As-AgNPs embedded on the fabrics range of 15 nm–40 nm. In the scanning electron microscope, the presence of small ball-shaped As-AgNPs embedded on the fabrics at a voltage of 30 KV was found with a magnification of 578X. EDAX was performed in which the nanoparticles show a peak of 2.6–3.9 KeV, and it also reveals the presence of the composition, distribution, and elemental mapping of the nanoparticles. The cytotoxic activity of synthesized nanosilver was carried out against L929 cell lines, which show cell viability at a concentration of 2.5 µg mL−1. Cell proliferation assay shows no cytotoxicity against L929 cell lines for 24 h. In this study, the green synthesis of silver nanoparticles from A. sessilis appears to be a cheap, eco-friendly, and alternative approach for curing infectious ulcers on the floor of the stratum corneum. Nanotechnology conjoined with herbal therapeutics provides a promising solution for wound management.",
      pdf_url: "https://www.mdpi.com/2079-4991/12/16/2759/pdf?version=1661403269",
      tags: ["Silver Nanoparticles", "Green Synthesis", "Antimicrobial", "Wound Healing"],
      impactFactor: "4.4"
    },
    {
      id: "W4224274365",
      title: "High Yield Fermentation of L-serine in Recombinant Escherichia coli via Co-localization of SerB and EamA through Protein Scaffold",
      year: 2022,
      citations: 6,
      doi: "https://doi.org/10.1007/s12257-021-0081-6",
      journal: "Biotechnology and Bioprocess Engineering",
      abstract: "Colocalization of pathway enzymes via synthetic protein scaffold is a powerful strategy to channel metabolic intermediates. In this study, we successfully engineered Escherichia coli to significantly increase L-serine titers. We designed a custom protein scaffold that recruits SerB (L-serine phosphatase) and EamA (L-serine exporter) onto a shared molecular platform. By bringing SerB in close spatial proximity to the transporter EamA, we accelerated the conversion of phosphoserine into L-serine while instantly exporting it, avoiding cellular accumulation and feedback inhibition. High-yield fermentation tests demonstrated a major boost in Serine production compared to standard non-scaffolded controls, offering a commercial roadmap for industrial amino acid synthesis.",
      pdf_url: "https://doi.org/10.1007/s12257-021-0081-6",
      tags: ["L-serine Fermentation", "Protein Scaffold", "Metabolic Flux", "Escherichia coli"],
      impactFactor: "3.0"
    },
    {
      id: "W3175285345",
      title: "Whole-cell display of Pyrococcus horikoshii glutamate decarboxylase in Escherichia coli for high-titer extracellular gamma-aminobutyric acid production",
      year: 2021,
      citations: 9,
      doi: "https://doi.org/10.1093/jimb/kuab039",
      journal: "Journal of Industrial Microbiology & Biotechnology",
      abstract: "We investigated the effect of cell-surface display of glutamate decarboxylase (GadB) on gamma-aminobutyric acid (GABA) production in recombinant Escherichia coli. We integrated GadB from the hyperthermophilic, anaerobic archaeon Pyrococcus horikoshii to the C-terminus of the E. coli outer membrane protein C (OmpC). After 12 hr of culturing GadB-displaying cells, the GABA concentration in the extracellular medium increased to 3.2 g/l, which is eight times that obtained with cells expressing GadB in the cytosol. To further enhance GABA production, we increased the temperatures of the culture. At 60°C, the obtained GABA concentration was 4.62 g/l after 12 hr of culture, and 5.35 g/l after 24 hr, which corresponds to a yield of 87.7%.",
      pdf_url: "https://academic.oup.com/jimb/article-pdf/48/7-8/kuab039/42964483/kuab039.pdf",
      tags: ["GABA Production", "Cell-Surface Display", "Archaeon GadB", "Bioprocess Engineering"],
      impactFactor: "3.2"
    }
  ]
};
