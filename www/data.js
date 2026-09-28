/* =====================================================================
   HaiStrawberry site content
   ---------------------------------------------------------------------
   This is the only file you need to edit to change what the site says.
   After editing, re-upload this file to your host.

   Tips
   - Keep every quote mark and comma in place. Each item in a list
     ends with a comma except the last one.
   - Text goes inside "double quotes". To use a double quote inside
     text, type \" instead.
   ===================================================================== */

window.SITE_DATA = {

  /* ---------- About page ---------- */
  profile: {
    name: "oh hai",   // the greeting shown at the top
    tagline: "we’ll float on, mostly",
    about: "sunflowers, then dusk\na slow song, the dog asleep\nwe’ll float on, i think",   // shown as a haiku; \n starts a new line
    likes: ["Sunflowers", "Live music", "Nature", "Animals"],
    spotify: "https://open.spotify.com/user/ohhaistrawberry/playlists",

    /* Quick links shown as buttons under the intro. Each is { label, href }.
       An href starting with http opens in a new tab; "#study" jumps to the Study Lab. */
    links: [
      { label: "🔬 Study Lab", href: "#study" },
      { label: "🎵 My playlists", href: "https://open.spotify.com/user/ohhaistrawberry/playlists" }
    ]
  },

  /* Songs on repeat. Example:
     { title: "Song name", artist: "Artist name" },               */
  tracks: [
  ],

  /* Spotify playlists to show as Spotify's own playlist cards.
     In Spotify: open the playlist > Share > Copy link, and paste it here.
     The playlist must be public. Example:
     "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M",    */
  playlists: [
  ],

  /* ---------- Study Lab flashcards ----------
     Each deck:
       code:  short label shown on the deck, e.g. "HEM-01"
       title: deck name
       cap:   tube color: lavender, pink, gold, lightblue, green, gray, red
       cards: list of { q: "question", a: "answer" }
              Optional for multiple choice: add your own wrong answers,
              { q: "...", a: "...", wrong: ["decoy 1", "decoy 2", "decoy 3"] }
              Without them, wrong answers come from the deck's other cards.
              Optional: why: "one or two sentences" shows after answering
              in multiple choice.
     The four decks below are starter examples. Edit or replace them.  */
  decks: [
    {
      code: "HEM-01",
      title: "Hematology",
      cap: "lavender",
      cards: [
        { q: "Average lifespan of a normal red blood cell?", a: "About 120 days.",
          why: "Mature RBCs have no nucleus, so they can't repair themselves. After about 120 days, macrophages in the spleen remove them." },
        { q: "Adult reference range for platelets?", a: "Roughly 150–450 × 10⁹/L (check your lab's range).",
          why: "Below 150 is thrombocytopenia, with a bleeding risk. Above 450 is thrombocytosis. Exact ranges vary a little by lab." },
        { q: "How is MCV calculated?", a: "(Hct % × 10) ÷ RBC count (× 10¹²/L). Reported in fL.",
          why: "MCV is the average size of a red cell. Under 80 fL is microcytic, 80–100 is normocytic, and over 100 is macrocytic." },
        { q: "Which tube and anticoagulant for a routine CBC?", a: "Lavender top, K₂EDTA.",
          why: "EDTA binds calcium to stop clotting, and it preserves cell shape best for counts and smears." },
        { q: "What are Howell-Jolly bodies?", a: "DNA (nuclear) remnants in RBCs, classically seen after splenectomy.",
          why: "The spleen normally removes these remnants, so they appear when the spleen is missing or not working." },
        { q: "Auer rods point toward which lineage?", a: "Myeloid, as in acute myeloid leukemia. They are fused primary granules.",
          why: "They're built from primary (azurophilic) granules, which only myeloid cells have, so they point away from a lymphoid leukemia." },
        { q: "Schistocytes suggest what process?", a: "Microangiopathic hemolysis, e.g. DIC, TTP or HUS.",
          why: "Red cells get sliced into fragments as they squeeze past fibrin strands or platelet clots in small vessels." }
      ]
    },
    {
      code: "CHEM-01",
      title: "Clinical Chemistry",
      cap: "gold",
      cards: [
        { q: "Anion gap formula?", a: "Na⁺ − (Cl⁻ + HCO₃⁻). Reference range is method-specific.",
          why: "It estimates the anions the panel doesn't measure. A high gap suggests things like lactic acidosis or ketoacidosis." },
        { q: "Which liver enzyme is most specific for hepatocellular injury?", a: "ALT.",
          why: "ALT sits mainly in liver cells. AST is also in heart and skeletal muscle, so it's less specific." },
        { q: "Preferred marker for myocardial injury?", a: "Cardiac troponin (I or T).",
          why: "Troponin I and T are specific to heart muscle, rise within hours of damage, and stay elevated for days." },
        { q: "State Beer's law.", a: "A = εbc. Absorbance is proportional to concentration.",
          why: "ε is molar absorptivity, b is path length, c is concentration. Holding ε and b constant lets a spectrophotometer turn absorbance into concentration." },
        { q: "Why use a gray-top tube for glucose?", a: "Sodium fluoride inhibits glycolysis (enolase), so glucose isn't consumed.",
          why: "Cells keep burning glucose after collection, lowering results by roughly 5–7% an hour. Fluoride stops glycolysis." },
        { q: "HbA1c reflects average glucose over what period?", a: "About 2–3 months.",
          why: "Glucose binds hemoglobin for the life of the red cell, about 120 days, so A1c tracks the last 2–3 months." }
      ]
    },
    {
      code: "MICRO-01",
      title: "Microbiology",
      cap: "red",
      cards: [
        { q: "Gram-positive cocci in clusters, catalase positive?", a: "Staphylococcus.",
          why: "Catalase splits hydrogen peroxide into bubbles. Staph is catalase positive; Strep and Enterococcus are negative." },
        { q: "Which test separates S. aureus from other staph?", a: "Coagulase. S. aureus is coagulase positive.",
          why: "Coagulase clots plasma. S. aureus makes it; most other staph, like S. epidermidis, don't." },
        { q: "Oxidase-positive non-fermenting GNR with blue-green pigment and a grape-like odor?", a: "Pseudomonas aeruginosa.",
          why: "The blue-green color comes from pyocyanin, and it's a strict aerobe that doesn't ferment glucose." },
        { q: "What does MacConkey agar select for and differentiate?", a: "Selects gram-negatives; differentiates lactose fermenters (pink) from non-fermenters.",
          why: "Crystal violet and bile salts block gram-positives. Lactose fermenters make acid, which turns the neutral red indicator pink." },
        { q: "Acid-fast stains are used mainly to find what?", a: "Mycobacterium (Ziehl-Neelsen or Kinyoun).",
          why: "Mycolic acid in the cell wall holds onto carbolfuchsin even after an acid-alcohol wash." }
      ]
    },
    {
      code: "BB-01",
      title: "Blood Bank",
      cap: "pink",
      cards: [
        { q: "Universal donor for red cells?", a: "Group O, Rh negative.",
          why: "O cells carry no A or B antigen and Rh-negative cells lack D, so the recipient's antibodies have nothing to attack." },
        { q: "Universal donor for plasma?", a: "Group AB.",
          why: "AB plasma has no anti-A or anti-B, so it won't react with any recipient's red cells." },
        { q: "What does the DAT detect?", a: "Antibody or complement already coating RBCs in vivo.",
          why: "It's used to work up hemolytic disease of the newborn, transfusion reactions, and autoimmune hemolytic anemia." },
        { q: "What does the IAT detect?", a: "In vitro sensitization, as in the antibody screen and crossmatch.",
          why: "Patient plasma is incubated with reagent or donor cells, then anti-human globulin shows whether antibody bound." },
        { q: "Kidd antibodies are known for what?", a: "Dosage, and causing delayed hemolytic transfusion reactions.",
          why: "Kidd antibodies often fade below detectable levels, then surge back after transfusion and destroy the donor cells days later." }
      ]
    },
    {
      code: "PROTO-1",
      title: "Organism type",
      cap: "pink",
      group: "Intestinal Protozoa · Micro II",
      html: true,
      cards: [
        { q: "Which group: <i>E. histolytica, E. dispar, E. hartmanni, E. coli, Endolimax nana, Iodamoeba bütschlii</i>?", a: "<b>Amoebas</b>. All but two amoebas have “amoeba” in the name. The two that don’t: <i>Endolimax nana</i> and <i>Blastocystis</i>." },
        { q: "What group is <i>Blastocystis</i> placed in, and why the *** on it?", a: "Grouped with the <b>amoebas</b> (genetically closest to them). It’s a “questionable parasite” that has been classified as a yeast, a flagellate and an algae over the years. 7 subtypes with different reservoir hosts." },
        { q: "<i>Dientamoeba fragilis</i>: amoeba or flagellate?", a: "<b>Flagellate</b>, despite the name. It has <b>no external flagellum</b> (it’s internal) and looks like an amoeba morphologically." },
        { q: "Name the 6 flagellates.", a: "<i>Dientamoeba fragilis</i>, <i>Giardia lamblia/intestinalis</i>, <i>Trichomonas vaginalis</i>, <i>T. hominis</i>, <i>T. tenax</i>, <i>Chilomastix mesnili</i>." },
        { q: "What is the only ciliate?", a: "<i><b>Balantidium coli</b></i>. (Not the bacterium, and not <i>Entamoeba coli</i>.)" },
        { q: "Name the 4 coccidia.", a: "<i>Cystoisospora (Isospora) belli</i>, <i>Cryptosporidium parvum</i>, <i>Cyclospora</i>, <i>Sarcocystis</i>." },
        { q: "What group is <i>Enterocytozoon bieneusi</i> in? (lecture spells it “binenzi”)", a: "<b>Microsporidia</b>. More closely related to fungal pathogens, but the clinical presentation looks like an intestinal protozoan." },
        { q: "Four traits of all coccidia?", a: "1. Obligate <b>tissue</b> parasites<br>2. Live in the <b>mucosa of the small intestine</b><br>3. Life cycle has <b>both sexual and asexual</b> forms<br>4. Developmental stages resemble <b>malaria</b>" },
        { q: "Trophozoite vs. cyst?", a: "<b>Troph</b>: active, motile, <b>reproducing</b> stage, usually free-form (not round).<br><b>Cyst</b>: <b>survival</b> stage, usually the <b>infective</b> stage, survives in the environment, rounder." },
        { q: "“Pathogenic” in this course means…?", a: "Causes disease in someone with a <b>healthy immune system</b>. Non-pathogenic organisms can still cause infection in immunocompromised patients." }
      ]
    },
    {
      code: "PROTO-2",
      title: "Case & picture ID",
      cap: "gold",
      group: "Intestinal Protozoa · Micro II",
      html: true,
      cards: [
        { q: "Case: A camper drank untreated stream water. Two weeks later: explosive, foul-smelling, greasy, gray-green diarrhea, belching, distention. No blood.", a: "<i><b>Giardia lamblia</b></i>. Clues: campers/untreated water, beaver reservoir, 12–20 day incubation, greasy foul stool, no blood." },
        { q: "Case: Pig farmer with diarrhea. Stool shows a huge (≈80 µm) oval troph covered in cilia with a bean-shaped macronucleus.", a: "<i><b>Balantidium coli</b></i>, the largest protozoan that parasitizes humans. Risk factors: pigs, poor sanitation, alcoholism, malnourishment, immunocompromise." },
        { q: "Case: HIV+ patient with chronic profuse watery diarrhea. Modified acid-fast shows many small (4–6 µm) round pink-red spheres.", a: "<i><b>Cryptosporidium parvum</b></i>. In the immunocompromised it becomes chronic (years) and can go extraintestinal." },
        { q: "Case: HIV+ patient with diarrhea, fever, steatorrhea and weight loss. MAF shows large pink <b>elongated oval</b> oocysts, some with 2 sporocysts.", a: "<i><b>Cystoisospora (Isospora) belli</b></i>. Mature oocyst: 2 sporocysts × 4 sporozoites each. Immature: 1 sporoblast." },
        { q: "Case: Outbreak after eating bagged salad / iceberg lettuce from central Mexico. Flu-like illness, nausea, vomiting, weight loss, explosive diarrhea for 1–3 weeks. 8–10 µm round oocysts.", a: "<i><b>Cyclospora</b></i>. Imported fresh produce (cilantro, raspberries, basil, snow peas, mesclun, lettuce). No animal reservoir; human feces contaminate food/water." },
        { q: "Case: A dozen kids get watery diarrhea after a splash pad / public pool visit.", a: "<i><b>Cryptosporidium parvum</b></i>. Chlorine doesn’t kill it. Recreational water outbreaks are the classic setup." },
        { q: "Case: A child with pinworm also has colicky abdominal pain and fatigue. Trichrome shows small trophs with nuclei broken into 3–5 granules.", a: "<i><b>Dientamoeba fragilis</b></i>. It likes to co-infect with <b>pinworm</b> (hitches a ride for protection). FRAGilis = FRAGmented nucleus." },
        { q: "Case: Woman with itching, burning, dysuria and a foamy, yellow-green, foul-smelling discharge. Jerky, motile pear-shaped organisms in the urine.", a: "<i><b>Trichomonas vaginalis</b></i>. Sexually transmitted; only the troph is seen. Often first spotted on the urinalysis. Men are usually asymptomatic." },
        { q: "Case: Blood-and-mucus stools, “pot bound”, <b>no fever</b>. Trophs with a central karyosome and ingested RBCs.", a: "<i><b>Entamoeba histolytica</b></i>, amoebic dysentery. It’s the only amoeba that eats RBCs." },
        { q: "Case: Returned traveler with a liver abscess but no intestinal symptoms. The abscess contents contain no organisms.", a: "<i><b>E. histolytica</b></i> amoebic abscess. Spreads via portal circulation. The abscess is sterile; amoebas sit in the <b>margins</b>. Lung is the secondary site." },
        { q: "Case: A 30 µm cyst seen easily at 10x, with 8 nuclei, eccentric karyosomes and a chromatoid bar with splintered ends.", a: "<i><b>Entamoeba coli</b></i>, non-pathogenic. 5+ nuclei = <i>E. coli</i> for sure." },
        { q: "Case: A 7 µm round cyst with 4 nuclei (central karyosomes) and a smooth-ended chromatoid bar.", a: "<i><b>Entamoeba hartmanni</b></i>. Looks exactly like <i>E. histolytica</i> but the cyst is only 6–8 µm (vs 12–15). <b>Size is the only way to tell.</b>" },
        { q: "Case: A cyst with one nucleus with a large karyosome and a big vacuole that stains brown with iodine.", a: "<i><b>Iodamoeba bütschlii</b></i>. It’s a glycogen vacuole. Iodine fades fast, so in lab it often looks like a big clear vacuole." },
        { q: "Case: Patient ate raw/undercooked pork or beef. Human is the definitive host.", a: "<i><b>Sarcocystis</b></i> (9–16 µm). Pig/cattle = intermediate host. Seen more in histology than the micro lab." },
        { q: "Case: HIV+ patient with diarrhea. Repeated O&Ps are negative, but an intestinal biopsy shows tiny 1–2 µm spores.", a: "<b>Microsporidia</b>, <i>Enterocytozoon bieneusi</i>. Obligate intracellular parasite, nearly impossible to find in feces. <b>Biopsy</b> is the best specimen. Can be confused with yeast." },
        { q: "Case: Patient with IBD. Stool shows round forms 5–40 µm with a huge central vacuole and nuclei pushed to the edge. No fecal leukocytes.", a: "<i><b>Blastocystis</b></i>, vacuolated (central body) form. Opportunistic, found in up to 25% of healthy people, associated with IBD." },
        { q: "Case: Tear-drop shaped flagellate troph with a visible “mouth” (cytostome); lemon-shaped cysts. Patient is asymptomatic.", a: "<i><b>Chilomastix mesnili</b></i>, non-pathogenic. Troph 10–15 µm, cyst 6–11 µm." },
        { q: "Case: A trichomonad found in the <b>mouth</b> vs. one found in the <b>colon</b>?", a: "Mouth: <i><b>T. tenax</b></i>. Colon: <i><b>T. hominis</b></i>. Both non-pathogenic and identical to <i>T. vaginalis</i>. <b>Habitat determines the species.</b>" },
        { q: "Case: Patient traveled to a tropical developing country and has close animal contact. Mild bloating and diarrhea; FE concentrate shows vacuolated forms.", a: "<i><b>Blastocystis</b></i>. Risk factors: immunocompromise, poor hygiene, being from or traveling to a developing tropical country, animal contact, contaminated food/water." },
        { q: "Identify the organism and stage.", a: "<i>E. histolytica</i> <b>trophozoite with ingested RBCs</b> (red inclusions). Single nucleus, fine chromatin, central karyosome. Stain: trichrome*", img: "s018_1.jpg" },
        { q: "Identify the organism and stage.", a: "<i>E. histolytica</i> <b>trophozoite</b>: ring nucleus with a central dot karyosome, and an ingested RBC. Stain: trichrome*", img: "s018_0.jpg" },
        { q: "Identify the organism and stage.", a: "<i>E. histolytica</i> <b>trophozoites</b> (field of several). Stain: trichrome*", img: "s019_0.jpg" },
        { q: "Identify the organism and stage.", a: "<i>E. histolytica</i> (or <i>dispar</i>) <b>cyst</b>, round, 12–15 µm. Stain: iodine wet mount*", img: "s020_0.jpg" },
        { q: "Identify the organism and stage. What is the dark rod?", a: "<i>E. histolytica</i> <b>cyst</b> with a <b>smooth-ended chromatoid bar</b>. Easier to see on trichrome. Stain: trichrome*", img: "s020_1.jpg" },
        { q: "Identify the organism and stage.", a: "<i>E. histolytica</i> <b>immature cysts</b> (1–2 nuclei). Stain: trichrome*", img: "s021_0.jpg" },
        { q: "Identify the organism and stage.", a: "<i>E. histolytica</i> <b>mature cyst</b>: 4 nuclei plus chromatoid material. Stain: trichrome*", img: "s021_1.jpg" },
        { q: "Identify the organism and stage. (Hint: the size is 9 µm.)", a: "<i>E. hartmanni</i> <b>trophozoite</b>. Same look as <i>E. histolytica</i>, but 8–10 µm. Stain: trichrome*", img: "s023_0.jpg" },
        { q: "Identify the organism and stage. (Hint: small.)", a: "<i>E. hartmanni</i> <b>trophozoite</b>. Stain: iron hematoxylin*", img: "s023_1.jpg" },
        { q: "Identify the organism and stage. (Hint: 7 µm.)", a: "<i>E. hartmanni</i> <b>cyst</b> (6–8 µm). Stain: iodine wet mount*", img: "s024_0.jpg" },
        { q: "Identify the organism and stage.", a: "<i>Entamoeba coli</i> <b>trophozoite</b>: large (up to 50 µm), coarse irregular chromatin, eccentric karyosome, “dirty” cytoplasm. Stain: trichrome*", img: "s027_0.jpg" },
        { q: "Identify the organism and stage.", a: "<i>Entamoeba coli</i> <b>cyst</b>. Up to 35 µm, 5+ nuclei, visible at 10x. Stain: iodine wet mount*", img: "s028_0.jpg" },
        { q: "Identify the organism and stage.", a: "<i>Endolimax nana</i> <b>trophozoite</b>: large dense karyosome with a thin nuclear membrane (“<b>ball & socket</b>”). Stain: trichrome*", img: "s034_0.jpg" },
        { q: "Identify the organism and stage.", a: "<i>Endolimax nana</i> <b>cyst</b>: nuclei look like a “<b>potato with eyes</b>.” Stain: iodine wet mount*", img: "s034_1.jpg" },
        { q: "Identify the organism and stage.", a: "<i>Endolimax nana</i> <b>cyst</b> (“potato with eyes”). Stain: trichrome*", img: "s034_2.jpg" },
        { q: "Identify the organism and stage.", a: "<i>Iodamoeba bütschlii</i> <b>trophozoite</b>: large dense karyosome, heavier chromatin than <i>E. nana</i>, “dirty” cytoplasm. Stain: trichrome*", img: "s037_0.jpg" },
        { q: "Identify the organism and stage.", a: "<i>Iodamoeba bütschlii</i> <b>trophozoite</b>. Stain: iron hematoxylin*", img: "s037_1.jpg" },
        { q: "Identify the organism and stage. What is the big brown blob?", a: "<i>Iodamoeba bütschlii</i> <b>cyst</b>. The brown blob is the <b>glycogen vacuole</b> taking up iodine. Stain: iodine wet mount*", img: "s038_1.jpg" },
        { q: "Identify the organism and stage.", a: "<i>Iodamoeba bütschlii</i> <b>cyst</b>: single nucleus, crescent halo around the karyosome, clear glycogen vacuole. Stain: trichrome*", img: "s038_0.jpg" },
        { q: "Identify the organism and stage.", a: "<i>Blastocystis</i> <b>vacuolated form</b>: nuclei pushed to the rim around a big central vacuole. Stain: <b>trichrome</b> (labeled in lecture)", img: "s045_0.jpg" },
        { q: "Identify the organism and stage. Careful, these aren’t Crypto.", a: "<i>Blastocystis</i> <b>vacuolated forms</b> on <b>modified acid-fast</b> (labeled in lecture). They can look like RBCs; look for nuclei at the periphery.", img: "s045_1.jpg" },
        { q: "Identify the organism and stage.", a: "<i>Blastocystis</i> <b>vacuolated form</b> in an <b>FE concentrate</b> wet prep (labeled in lecture).", img: "s045_2.jpg" },
        { q: "Identify the organism and stage.", a: "<i>Dientamoeba fragilis</i> <b>trophozoite</b>. Two nuclei with fragmented chromatin. Stain: trichrome*", img: "s054_0.jpg" },
        { q: "Identify the organism and stage.", a: "<i>Dientamoeba fragilis</i> <b>trophozoite</b>. Karyosome fragmented into 3–5 granules, no peripheral chromatin. Stain: iron hematoxylin*", img: "s054_2.jpg" },
        { q: "Identify the organism and stage.", a: "<i>Dientamoeba fragilis</i> <b>trophozoite</b>, binucleate. Stain: trichrome*", img: "s054_1.jpg" },
        { q: "Identify the organism and stage. Name the labeled structures.", a: "<i>Giardia</i> <b>trophozoite</b> (“old man face”): 2 nuclei, 2 parabasal bodies, 1 axostyle, 8 flagella. 10–20 µm.", img: "s057_0.jpg" },
        { q: "Identify the organism and stage.", a: "<i>Giardia</i> <b>trophozoite</b>, pear/teardrop shape. Stain: trichrome*", img: "s058_0.jpg" },
        { q: "Identify the organism and stage. (electron micrograph)", a: "<i>Giardia</i> <b>trophozoite</b> showing the ventral <b>sucking disc</b> it uses to attach to the upper small intestine. It doesn’t invade tissue.", img: "s059_0.jpg" },
        { q: "Identify the organism and stage.", a: "<i>Giardia</i> <b>cysts</b>: oval, 11–14 µm, up to 4 nuclei, axonemes/median bodies inside. Stain: iron hematoxylin*", img: "s060_1.jpg" },
        { q: "Identify the organism and stage.", a: "<i>Giardia</i> <b>cyst</b>. Oval, refractile outer wall that “shimmers” as you fine-focus. Often stains faintly.", img: "s060_0.jpg" },
        { q: "Identify the organism and stage. (from a urine sediment)", a: "<i>Trichomonas vaginalis</i> <b>trophozoites</b>: pear shape, anterior flagella, undulating membrane. Stain: Giemsa-type*", img: "s063_0.jpg" },
        { q: "Identify the organism and stage. (live, unstained)", a: "<i>Trichomonas vaginalis</i> in a <b>wet prep</b>. Look for jerky, “dancing” motility. Still frame from the lecture’s motility clip.", img: "s063_1f.jpg" },
        { q: "Identify the organism and stage.", a: "<i>Chilomastix mesnili</i> <b>trophozoite</b>: tear-drop shape, eccentric nucleus, cytostome. Stain: trichrome*", img: "s067_1.jpg" },
        { q: "Identify the organism and stage.", a: "<i>Chilomastix mesnili</i> <b>cyst</b>, <b>lemon-shaped</b> with a “cyclops smiley face.” Stain: iodine wet mount (lecture)", img: "s067_4.jpg" },
        { q: "Identify the organism and stage.", a: "<i>Chilomastix mesnili</i> <b>cyst</b>, lemon-shaped. Stain: trichrome*", img: "s067_2.jpg" },
        { q: "Identify the organism and stage.", a: "<i>Balantidium coli</i> <b>trophozoite</b>: 50–100 µm, cilia around the edge, cytostome. Unstained wet mount*", img: "s074_0.jpg" },
        { q: "Identify the organism and stage. Name the red structure.", a: "<i>Balantidium coli</i> <b>trophozoite</b>. The red bean is the <b>macronucleus</b>. Iodine wet mount*", img: "s074_1.png" },
        { q: "Identify the organism and stage.", a: "<i>Balantidium coli</i> <b>cyst</b>: 50–70 µm, round, thick distinct wall, <b>no cilia</b>. Unstained wet mount*", img: "s076_0.jpg" },
        { q: "Identify the organism and stage.", a: "<i>Balantidium coli</i> <b>cyst</b> with a dark bean-shaped macronucleus. Stained*", img: "s076_1.jpg" },
        { q: "Identify the organism and stage.", a: "<i>Cystoisospora belli</i> <b>immature oocyst</b>: elongated oval with a single sporoblast. Wet mount.", img: "s081_0.jpg" },
        { q: "Identify the organism and stage.", a: "<i>Cystoisospora belli</i> <b>mature oocyst</b>: 2 sporocysts, each with 4 sporozoites. Wet mount.", img: "s081_1.jpg" },
        { q: "Identify the organism and stage. Stain?", a: "<i>Cystoisospora belli</i> oocyst on <b>modified acid-fast</b>: pink-red sporoblast inside the oval wall.", img: "s082_1.jpg" },
        { q: "Identify the organism and stage. Stain?", a: "<i>Cystoisospora belli</i> oocysts on <b>modified acid-fast</b>.", img: "s082_2.jpg" },
        { q: "Identify the organism and stage. (unstained, 4–6 µm)", a: "<i>Cryptosporidium parvum</i> <b>oocysts</b> on a <b>wet mount</b> (DIC optics). Extremely hard to see without a special stain.", img: "s085_0.jpg" },
        { q: "Identify the organism and stage. Stain?", a: "<i>Cryptosporidium parvum</i> oocysts on <b>modified acid-fast</b>: 4–6 µm pink-red spheres on a blue-green background.", img: "s086_2.jpg" },
        { q: "Identify the organism and stage. Stain?", a: "<i>Cryptosporidium parvum</i> oocysts, <b>modified acid-fast</b>.", img: "s086_0.jpg" },
        { q: "Which two organisms? What test is this?", a: "<b>Direct fluorescent antibody (DFA)</b> test for <i>Giardia</i> (large oval cysts) and <i>Cryptosporidium</i> (small round oocysts). Run on FE concentrate sediment. Prone to false positives.", img: "s087_0.jpg" },
        { q: "Identify the organism and stage. (8–10 µm)", a: "<i>Cyclospora</i> <b>oocyst</b>, unstained wet mount. Round, 8–10 µm (roughly twice the size of Crypto).", img: "s093_0.jpg" },
        { q: "Identify the organism and stage. Left = which stain?", a: "<i>Cyclospora</i> oocysts. <b>A</b>: modified acid-fast. They stain <b>variably</b>, some pink, some pale “ghosts.” <b>B</b>: unstained wet mount.", img: "s094_0.png" },
        { q: "Identify the organism and stage.", a: "<i>Sarcocystis</i> <b>sporocysts</b> in stool (wet mount, B). C shows them under UV light.", img: "s099_1.png" },
        { q: "Identify the organism and stage. (tissue)", a: "<i>Sarcocystis</i> cysts in <b>muscle tissue</b> (histology). Found more often in histology than in the micro lab.", img: "s099_0.png" },
        { q: "Identify the organism and stage. (1.5–2 µm)", a: "<b>Microsporidia</b> spores, pinkish ovals. Can be confused with yeast. Stain: modified trichrome*", img: "s101_0.jpg" },
        { q: "What organism, and what are you looking at?", a: "<i>E. histolytica</i> in <b>tissue</b>. A: ulcers on mucosa. B: flask-shaped ulcer in section. C: amoebas with <b>ingested RBCs</b>.", img: "s015_0.jpg" },
        { q: "Name this lesion shape and the two organisms that cause it.", a: "<b>Flask-shaped ulcer</b> (narrow neck, wide base in the submucosa). Caused by <i>E. histolytica</i> and <i>Balantidium coli</i>.", img: "s014_0.jpg" }
      ]
    },
    {
      code: "PROTO-3",
      title: "Morphology & life cycle",
      cap: "red",
      group: "Intestinal Protozoa · Micro II",
      html: true,
      cards: [
        { q: "<i>E. histolytica</i> <b>troph</b>: size, nuclei, chromatin, karyosome?", a: "~<b>20 µm</b>; <b>1 nucleus</b>; <b>thin, delicate, even</b> peripheral chromatin ring; <b>central, compact</b> karyosome; may contain <b>ingested RBCs</b>." },
        { q: "<i>E. histolytica</i> <b>cyst</b>: size, nuclei, chromatoid bar?", a: "<b>12–15 µm</b>; <b>up to 4 nuclei</b> (same look as the troph nucleus); <b>smooth, rounded-end</b> chromatoid bars." },
        { q: "<i>E. hartmanni</i> sizes?", a: "Troph <b>8–10 µm</b> (5–12). Cyst <b>6–8 µm</b> (5–10). Otherwise identical to <i>E. histolytica</i>." },
        { q: "<i>E. coli</i> <b>troph</b> features?", a: "Largest amoeba, <b>up to 50 µm</b>. Sluggish, non-directional pseudopod motility. <b>Coarse, irregular (lumpy)</b> chromatin. <b>Eccentric, irregular</b> karyosome." },
        { q: "<i>E. coli</i> <b>cyst</b> features?", a: "Largest amoeba cyst, <b>up to 35 µm</b>, seen at low power (10x). <b>5 or more nuclei</b> (up to 8). Coarse chromatin, eccentric karyosome. Chromatoid bars are rare, with <b>splintered</b> ends." },
        { q: "<i>Endolimax nana</i> key features?", a: "Troph: large dense karyosome, <b>thin</b> nuclear membrane (“ball & socket”), fine granular cytoplasm. Cyst: nuclei look like a “potato with eyes.” Small amoeba." },
        { q: "<i>Iodamoeba bütschlii</i> key features?", a: "Troph: large dense karyosome, <b>heavier</b> chromatin than <i>E. nana</i>, dirty cytoplasm. Cyst: <b>single</b> nucleus, large karyosome with a crescent halo, big <b>glycogen vacuole</b> (stains with iodine)." },
        { q: "<i>Blastocystis</i> vacuolated form features? (the one to know)", a: "Most common form in stool. Size varies a lot, avg <b>5–40 µm</b>. Central vacuole fills ~<b>90%</b> of the cell; nuclei and organelles pushed to the periphery. Vacuole contents are <b>not</b> glycogen." },
        { q: "<i>Blastocystis</i>: other forms?", a: "Granular (like vacuolated but with granules), amoeboid (rare), cyst (3–5 µm, hard to find, looks like debris; the environmental, transmissible form)." },
        { q: "<i>Blastocystis</i> life cycle?", a: "Cyst ingested → excysts in the <b>large intestine</b> → vacuolar and other forms → encysts passing through the large intestine. What triggers the change between forms is unknown." },
        { q: "<i>Dientamoeba fragilis</i> morphology?", a: "4–12 / 5–15 µm. 20–40% of trophs have 1 nucleus (the rest have 2). Karyosome <b>fragmented into 3–5 granules</b>, <b>no peripheral chromatin</b>, dirty cytoplasm. Mainly seen as trophs; a cyst stage was only recently discovered. <b>Not seen on wet preps or concentrates</b>, so it needs a permanent stain." },
        { q: "<i>Giardia</i> troph morphology?", a: "<b>10–20 µm</b> long. <b>2 nuclei, 2 parabasal (median) bodies, 1 axostyle, 8 flagella</b>. Ventral sucking disc. <b>Falling-leaf</b> motility." },
        { q: "<i>Giardia</i> cyst morphology?", a: "<b>11–14 µm</b>, oval, same structures as the troph but up to <b>4 nuclei</b>. Often stains faintly; refractile wall." },
        { q: "<i>Chilomastix mesnili</i> morphology?", a: "Troph: tear-drop, eccentric nucleus and karyosome, visible cytostome, 10–15 µm, rotating/wobbling motility. Cyst: <b>lemon-shaped</b>, 6–11 µm." },
        { q: "<i>Balantidium coli</i> troph vs cyst?", a: "Troph: <b>50–100 µm</b>, cilia, cytostome, large bean-shaped <b>macronucleus</b> plus a micronucleus. Cyst: <b>50–70 µm</b>, round, distinct wall, macronucleus, <b>no cilia</b>." },
        { q: "Where does each organism live? <i>Giardia</i> / <i>B. coli</i> / <i>Chilomastix</i> / <i>T. hominis</i> / <i>T. tenax</i> / <i>T. vaginalis</i>", a: "<i>Giardia</i>: <b>upper small intestine</b> (“the penthouse”), attached, not invasive. <i>B. coli</i>: colon and cecum. <i>Chilomastix</i>: cecum and colon. <i>T. hominis</i>: colon. <i>T. tenax</i>: mouth. <i>T. vaginalis</i>: urogenital tract." },
        { q: "Where do <i>Cryptosporidium</i> and <i>Cystoisospora</i> live?", a: "<b>Small intestine</b>. Crypto sits in the <b>brush border of columnar epithelial cells</b>. All coccidia live in the small intestinal mucosa." },
        { q: "How do amoebas and flagellates reproduce?", a: "<b>Asexually</b>, by <b>binary fission</b>: genetic material replicates by mitosis, then the cell splits into two equal daughter cells." },
        { q: "Which organisms have <b>both sexual and asexual</b> stages?", a: "The <b>coccidia</b> (<i>Cryptosporidium</i>, <i>Cystoisospora</i>, <i>Cyclospora</i>, <i>Sarcocystis</i>). The lecture singled out Crypto’s cycle, which also allows <b>autoinfection</b>." },
        { q: "Generic amoeba / flagellate life cycle?", a: "Ingest <b>infective cysts</b> in fecally contaminated food/water → excyst → trophs multiply by binary fission → encyst → cysts pass in feces to the environment. Nearly all amoebas share this; all flagellates share one too." },
        { q: "<i>Balantidium coli</i> life cycle?", a: "Human ingests <b>cysts</b> (trophs can’t survive stomach acid) → excyst and mature → symptoms ~6 days later → encyst in the colon/rectum → cysts pass in formed feces." },
        { q: "Definitive hosts to know?", a: "<i>B. coli</i>: <b>pigs</b> are a definitive host (and humans). <i>Sarcocystis</i>: <b>human = definitive</b>, pig = intermediate (acquired from undercooked beef or pork)." },
        { q: "Which flagellate has no cyst stage?", a: "<i>Trichomonas</i> (all three). The lecture calls it out for <i>T. hominis</i>, and <i>T. vaginalis</i> is only ever seen as a troph." },
        { q: "Microsporidia size and nature?", a: "<b>1.5–2 µm</b> (<i>E. bieneusi</i> 1–2 µm). Obligate <b>intracellular</b> parasite. Only one species tied to human disease in this lecture." }
      ]
    },
    {
      code: "PROTO-4",
      title: "Symptoms & pathology",
      cap: "lightblue",
      group: "Intestinal Protozoa · Micro II",
      html: true,
      cards: [
        { q: "Which organisms cause <b>bloody</b> stool?", a: "<i><b>E. histolytica</b></i> (amoebic dysentery: blood + mucus; amoeboma: intermittent bleeding) and <i><b>B. coli</b></i> in <b>fulminating</b> balantidiosis (mucoid, bloody)." },
        { q: "Which cause diarrhea <b>without</b> blood? (the “no” list)", a: "<i>Giardia</i> (greasy, foul, gray-green), <i>Cryptosporidium</i> (profuse watery), <i>Cyclospora</i> (explosive), <i>Cystoisospora</i> (with steatorrhea), <i>Dientamoeba</i>, <i>Blastocystis</i>, and <b>chronic</b> <i>B. coli</i> (non-bloody)." },
        { q: "Which two organisms make <b>flask-shaped</b> lesions?", a: "<i>E. histolytica</i> and <i>Balantidium coli</i>. Both can perforate the colon. Both are linked to <b>hyaluronidase</b>." },
        { q: "Parasitic buddy system: who co-infects with whom?", a: "<i>Dientamoeba</i> + <b>pinworm</b>. <i>E. histolytica</i> + bacterial GI pathogens. <i>Blastocystis</i> takes advantage of <b>IBD</b>. <i>Crypto</i> picked up with <i>Campylobacter</i> in the Norway raw-milk outbreak. <i>Giardia</i> and <i>Crypto</i> are tested for together." },
        { q: "4 clinical presentations of <i>Balantidium coli</i>?", a: "1. <b>Asymptomatic</b> carriers (reservoir)<br>2. <b>Chronic</b>: non-bloody diarrhea, cramps, halitosis, nausea, vomiting, tenesmus, like <i>E. histolytica</i><br>3. <b>Fulminating</b>: mucoid bloody stool, explosive diarrhea, weight loss, ulcers (hyaluronidase), flask lesions, perforation<br>4. <b>Extraintestinal</b>: mainly the appendix" },
        { q: "<i>Cryptosporidium</i>: immunocompetent vs immunocompromised?", a: "Healthy: profuse watery diarrhea, mild cramps, nausea, anorexia, <b>10–15 days, self-cures</b>. Compromised: more severe, <b>chronic for years</b>, extraintestinal spread." },
        { q: "<i>Cystoisospora belli</i> symptoms and who it hits?", a: "Diarrhea, nausea, <b>fever</b>, <b>steatorrhea</b>, headache, weight loss. Severe intestinal disease, a big problem in <b>HIV+</b> patients. May produce a toxin." },
        { q: "<i>Cyclospora</i> illness?", a: "Flu-like: nausea, vomiting, weight loss, explosive diarrhea. Lasts 1–3 weeks. Incubation 2 days to 2 weeks. An emerging pathogen." },
        { q: "<i>Dientamoeba fragilis</i> symptoms?", a: "Occasionally pathogenic: <b>colicky pain, fatigue, weight loss</b>. Transmission unknown (pinworm hitchhiking suspected)." },
        { q: "<i>Blastocystis</i> disease?", a: "Opportunistic, generally self-limiting, non-specific: abdominal pain, bloating, acute or chronic diarrhea, flatulence, nausea, anorexia. Associated with <b>IBD</b>. No fecal leukocytes." },
        { q: "<i>T. vaginalis</i> symptoms: women vs men?", a: "Women: itching, burning, dysuria, foamy yellow-green discharge, foul odor. Men: usually <b>asymptomatic</b>; possibly prostatitis, urethritis, epididymitis, urethral stricture." },
        { q: "Which organisms are linked to <b>HIV/AIDS</b> patients?", a: "<i>Cystoisospora belli</i>, <i>Cryptosporidium</i> (chronic), <b>Microsporidia</b>. Also <i>Blastocystis</i> (immunocompromise risk factor) and any “non-pathogen” in the immunocompromised." },
        { q: "Sources and settings to link to each organism?", a: "Campers/beavers/daycare → <i>Giardia</i>. Pools/splash pads/raw milk/fresh juice → <i>Crypto</i>. Imported produce → <i>Cyclospora</i>. Pigs → <i>B. coli</i>. Undercooked beef/pork → <i>Sarcocystis</i>. Sexual contact → <i>T. vaginalis</i>." }
      ]
    },
    {
      code: "PROTO-5",
      title: "Pathogens vs look-alikes",
      cap: "green",
      group: "Intestinal Protozoa · Micro II",
      html: true,
      cards: [
        { q: "Which intestinal amoeba is pathogenic?", a: "Only <i><b>E. histolytica</b></i> (for healthy people). The others may cause disease in the immunocompromised. <i>Blastocystis</i> has “pathogenic potential.”" },
        { q: "<i>E. histolytica</i> vs <i>E. dispar</i>: how to tell them apart?", a: "<b>Morphologically identical.</b> <i>E. dispar</i> is commensal and <b>doesn’t ingest RBCs</b>. RBCs inside a troph point to <i>histolytica</i>; otherwise you need an immunologic test (rapid EIA / lateral flow for <i>E. histolytica</i>)." },
        { q: "<i>E. histolytica</i> vs <i>E. hartmanni</i>?", a: "Same morphology. <b>Size</b> separates them: <i>hartmanni</i> troph 8–10 µm (vs ~20), cyst 6–8 µm (vs 12–15). <i>E. hartmanni</i> is non-pathogenic." },
        { q: "<i>E. histolytica</i> vs <i>E. coli</i> (5 differences)?", a: "<i>E. coli</i> is <b>bigger</b> (troph 50 / cyst 35 µm), has <b>coarse, irregular</b> chromatin, an <b>eccentric</b> karyosome, <b>5+ nuclei</b> in the cyst, and <b>splintered</b> chromatoid bars (vs smooth). <i>E. coli</i> is non-pathogenic." },
        { q: "<i>Endolimax nana</i> vs <i>Iodamoeba</i> trophs?", a: "Both have a large dense karyosome. <i>E. nana</i> has a <b>thin</b> membrane (ball & socket); <i>Iodamoeba</i> has <b>heavier</b> chromatin. Iodamoeba cysts have 1 nucleus and a glycogen vacuole. Both non-pathogenic." },
        { q: "Pathogenic vs non-pathogenic flagellates?", a: "Pathogenic: <i>Dientamoeba</i> (occasionally), <i>Giardia</i>, <i>T. vaginalis</i>. Non-pathogenic: <i>T. hominis</i>, <i>T. tenax</i>, <i>Chilomastix mesnili</i>." },
        { q: "<i>T. vaginalis</i> vs <i>T. hominis</i> vs <i>T. tenax</i>?", a: "They look exactly the same. <b>Only the body site tells them apart</b>: urogenital / colon / mouth." },
        { q: "<i>Giardia</i> vs <i>Chilomastix</i> (both flagellates in stool)?", a: "<i>Giardia</i>: pathogenic, bilateral “face” with 2 nuclei, 8 flagella, falling-leaf motility, oval cyst. <i>Chilomastix</i>: non-pathogenic, tear-drop with 1 eccentric nucleus and cytostome, wobbling motility, lemon cyst." },
        { q: "<i>Blastocystis</i> on modified acid-fast could be mistaken for…?", a: "<b>RBCs</b> (and small coccidia). Look for the nuclei and organelles around the edge of the vacuole." },
        { q: "Crypto vs Cyclospora on MAF?", a: "<b>Size</b>: Crypto 4–6 µm and staining consistently; Cyclospora 8–10 µm and staining <b>variably</b> (pink to unstained “ghosts”)." },
        { q: "Microsporidia could be confused with…?", a: "<b>Yeast</b> cells (tiny ovals, 1–2 µm)." },
        { q: "Is <i>B. coli</i> pathogenic? <i>Cystoisospora</i>? <i>Crypto</i>?", a: "Yes to all. <i>B. coli</i> is “quite pathogenic.” <i>Cystoisospora</i> causes severe disease. Crypto causes disease even in healthy people (self-limiting)." }
      ]
    },
    {
      code: "PROTO-6",
      title: "Stains",
      cap: "gray",
      group: "Intestinal Protozoa · Micro II",
      html: true,
      cards: [
        { q: "Which organisms are <b>acid-fast</b> (modified acid-fast)?", a: "The coccidia: <i><b>Cryptosporidium</b></i> (4–6 µm, pink-red), <i><b>Cystoisospora belli</b></i> (large oval), <i><b>Cyclospora</b></i> (8–10 µm, variable). <i>Blastocystis</i> also shows up on MAF (lecture image), but it’s the look-alike, not the target." },
        { q: "Best stain approach for <i>Dientamoeba</i>?", a: "<b>Permanent stain</b> (trichrome or iron hematoxylin). It’s <b>not seen on wet preps or concentrates</b>." },
        { q: "Best approach for <i>Giardia</i> in O&P?", a: "<b>FE concentrate + trichrome permanent smear</b>. Collect at least 3 stools on non-consecutive days (irregular shedding)." },
        { q: "Best approach for <i>Blastocystis</i>?", a: "<b>FE concentrate and permanent stains</b>. Don’t wash sediment in water; it destroys the amoeboid form. Easier to see on permanent stains than wet mounts." },
        { q: "Which structure is “easier seen on trichrome”?", a: "The <i>E. histolytica</i> <b>chromatoid bar</b>." },
        { q: "Why does <i>Iodamoeba</i>’s vacuole look clear in lab?", a: "The <b>glycogen</b> vacuole stains brown with <b>iodine</b>, but iodine fades quickly, leaving a big clear vacuole." },
        { q: "Stain color cues: trichrome vs iron hematoxylin vs iodine wet mount?", a: "<b>Trichrome</b>: blue-green to purple background, organisms purple/blue-green, RBCs and chromatin red. <b>Iron hematoxylin</b>: gray/blue-black monochrome, nuclei black. <b>Iodine wet mount</b>: yellow-brown, nuclei and glycogen brown. <b>Saline wet mount</b>: unstained, gray, motility visible." },
        { q: "Microsporidia stain? (not on slides)", a: "<b>Modified trichrome</b> (chromotrope-based). Spores stain pinkish-red. Diagnosis is best by <b>biopsy</b>." },
        { q: "Which organisms are best seen in a <b>wet prep</b> for motility?", a: "<i>T. vaginalis</i> (jerky), <i>T. hominis</i> (look for motile trophs; hard to recognize on permanent stains), <i>Giardia</i> (falling leaf), <i>Chilomastix</i> (rotating wobble), <i>B. coli</i> (cilia)." }
      ]
    },
    {
      code: "PROTO-7",
      title: "E. histolytica",
      cap: "lavender",
      group: "Intestinal Protozoa · Micro II",
      html: true,
      cards: [
        { q: "Name the 4 types of <i>E. histolytica</i> infection.", a: "1. Gastroenteritis / <b>non-dysenteric</b> amoebiasis<br>2. <b>Amoebic dysentery</b><br>3. <b>Amoebic abscess</b><br>4. <b>Amoeboma</b>" },
        { q: "Non-dysenteric <i>E. histolytica</i> infection?", a: "Asymptomatic to mild, often <b>chronic</b>. Abdominal pain, nausea, flatulence, irregularity, headache, fatigue, nervousness. The “one you’d pick.”" },
        { q: "Amoebic dysentery features?", a: "Amoebas eat into tissue and form <b>flask-shaped ulcers</b>, which can perforate. Stool is <b>blood + mucus</b>. “Pot bound.” <b>No fever.</b>" },
        { q: "Amoebic abscess features?", a: "Spread via <b>portal circulation to the liver</b>. <b>Sterile</b> abscess; amoebas in the <b>margins</b>. <b>Lungs</b> secondary. Patients <b>lack intestinal symptoms</b>. ~<b>10%</b> of untreated cases." },
        { q: "What is an amoeboma?", a: "A rare invasive form: <b>granulomatous mass</b> with a fibrous periphery and inflammatory center. Associated with abscesses. Can cause obstruction and intermittent bleeding. <b>Easily confused with colon cancer</b>; needs histology." },
        { q: "What affects <i>E. histolytica</i> pathogenicity?", a: "Bacterial GI co-infection, <b>strain</b> of amoeba, possible <b>hyaluronidase</b> production, and <b>low-protein diets</b> (worse severity)." },
        { q: "<i>E. histolytica</i> epidemiology quick facts?", a: "One of the world’s most important parasites (worldwide). Infants rarely harbor it. Transmitted by ingesting cysts in fecally contaminated food/water." },
        { q: "The single most useful ID clue for <i>E. histolytica</i>?", a: "<b>Ingested RBCs</b> in the troph. It’s the only amoeba that eats RBCs. Not always present, though." },
        { q: "<i>E. histolytica</i> serum antibody sensitivity?", a: "Positive in ~<b>85%</b> of intestinal amoebiasis and ~<b>99%</b> of extraintestinal (e.g., liver abscess) cases." }
      ]
    },
    {
      code: "PROTO-8",
      title: "Giardia",
      cap: "pink",
      group: "Intestinal Protozoa · Micro II",
      html: true,
      cards: [
        { q: "<i>Giardia</i>: key epidemiology facts?", a: "<b>Most common parasite in the USA.</b> Worldwide. <b>Very pathogenic.</b> Reservoirs: <b>beavers</b> and other animals. At risk: campers, untreated water drinkers, <b>daycare kids</b>, MSM. Incubation <b>12–20 days</b>." },
        { q: "Where does <i>Giardia</i> live, and does it invade?", a: "<b>Upper small intestine</b> (duodenum, “the penthouse”). Attaches with a ventral <b>sucking disc</b>; does <b>not</b> invade tissue." },
        { q: "<i>Giardia</i> acute phase symptoms?", a: "Lasts a few days; mimics food poisoning, traveler’s diarrhea or viral enteritis. Flatulence, <b>explosive watery</b> diarrhea, mushy foul stool, <b>gray-green, greasy</b>, nausea, cramps, malaise, abdominal swelling." },
        { q: "<i>Giardia</i> chronic phase?", a: "Recurrent brief episodes of loose, foul, <b>grayish, foamy</b> stool. Abdominal discomfort, marked <b>distention with belching</b>." },
        { q: "How is <i>Giardia</i> diagnosed?", a: "Cysts or trophs in stool (<b>FE concentrate + trichrome</b>); trophs in duodenal contents (<b>string test</b> or <b>duodenal biopsy</b>). <b>3 stools on non-consecutive days</b> because shedding is irregular. <b>Rapid EIA</b>, often combined with Crypto." },
        { q: "<i>Giardia</i> troph checklist (the “face”)?", a: "2 nuclei (eyes), 2 parabasal bodies (mouth), 1 axostyle, 8 flagella. 10–20 µm. Falling-leaf motility." }
      ]
    },
    {
      code: "PROTO-9",
      title: "Non-microscopy tests",
      cap: "gold",
      group: "Intestinal Protozoa · Micro II",
      html: true,
      cards: [
        { q: "<i>E. histolytica</i>: non-microscopy tests?", a: "<b>Lateral flow EIA</b> (needs <b>non-preserved</b> stool), which also separates it from <i>E. dispar</i>. <b>Serum antibody</b> detection (85% intestinal / 99% extraintestinal). <b>PCR</b>." },
        { q: "<i>Cryptosporidium</i>: non-microscopy tests?", a: "<b>DFA</b> (on FE concentrate sediment; prone to false positives). <b>ImmunoCard STAT Crypto/Giardia</b> lateral-flow EIA (on <b>unconcentrated preserved</b> feces). <b>Chromogenic immunoassay</b> (EIA plate)." },
        { q: "<i>Giardia</i>: non-microscopy tests?", a: "<b>Rapid EIA</b> (often combined with Crypto, e.g., ImmunoCard STAT), <b>DFA</b>, plus the <b>string test / duodenal biopsy</b> to find trophs." },
        { q: "ImmunoCard STAT Crypto/Giardia: method and specimen?", a: "<b>Lateral flow EIA</b> with antibodies embedded in the membrane. Run on <b>unconcentrated, preserved</b> feces." },
        { q: "DFA for Giardia/Crypto: specimen and weakness?", a: "Run on <b>FE concentrate sediment</b>. <b>Prone to false positives.</b>" },
        { q: "Which E. histo test needs <b>non-preserved</b> stool, and which Crypto/Giardia test uses <b>preserved</b> stool?", a: "E. histo <b>lateral flow EIA</b>: non-preserved. <b>ImmunoCard STAT</b> Crypto/Giardia: unconcentrated preserved." },
        { q: "<i>Cyclospora</i> diagnosis?", a: "O&P <b>plus a specific order for Cyclospora</b>. One negative doesn’t rule it out; <b>3 specimens</b> are optimal. (Not on lab exams.)" },
        { q: "Microsporidia diagnosis?", a: "<b>Biopsy</b> (intestinal). Nearly impossible to find in feces." },
        { q: "How many stool specimens for O&P?", a: "<b>3</b>, on non-consecutive days (Giardia’s irregular shedding; Cyclospora optimal = 3)." }
      ]
    }
  ]
};
