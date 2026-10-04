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

  /* Spotify playlists shown as clickable cover tiles.
     Each: { url, name }. The cover loads live from Spotify and updates
     itself when she changes the playlist art. "cover" is an optional
     starting image so a cover shows instantly; it refreshes on its own.
     The playlist must be public. In Spotify: open it > Share > Copy link. */
  playlists: [
    { url: "https://open.spotify.com/playlist/6zlJksxrsNu3Bjfa17hJvb", name: "drinking about you",
      cover: "https://image-cdn-fa.spotifycdn.com/image/ab67706c0000da8402dd6f00837ed27cf6b732a0" },
    { url: "https://open.spotify.com/playlist/3g5XKq9LA32uc8pp06AQvR", name: "strawberry jamz 🍓",
      cover: "https://image-cdn-fa.spotifycdn.com/image/ab67706c0000da8426a14d7d042943c882c6a850" },
    { url: "https://open.spotify.com/playlist/4bWYUVPy0NiK1bLNueVGMn", name: "wear heelies to escape ur feelies",
      cover: "https://image-cdn-fa.spotifycdn.com/image/ab67706c0000da84a22e05a7ce231f825c1f712f" }
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
    },
    {
      code: "BT-PIC1",
      title: "Picture ID: malaria & Babesia",
      cap: "red",
      group: "Blood & Tissue Parasites · Micro II · Exam 4",
      html: true,
      cards: [
        { q: "Picture 1. Thin smear: identify the species and the stage at the arrows.", a: "<i><b>Plasmodium falciparum</b></i>, <b>ring forms</b>.<br><b>Look for:</b> small delicate rings in <b>normal-size, mature RBCs</b>; <b>multiple rings per cell</b> (the only species that does this routinely); double chromatin dots (“headphones”); rings sitting on the cell edge (appliqué).<br><b>Know:</b> usually only rings and gametocytes reach peripheral blood. Malignant tertian / blackwater fever, 36–48 h cycle, high parasitemia, cerebral malaria.", img: "e4_fal_rings.jpg" },
        { q: "Picture 2. Identify the species from the dark elongated forms.", a: "<i><b>Plasmodium falciparum</b></i> <b>gametocytes</b>: the “blood bananas.”<br><b>Look for:</b> crescent / banana / sausage shape stretching the RBC, with central chromatin and pigment.<br><b>Know:</b> this is <b>diagnostic</b>. One banana gametocyte lets you call <i>P. falciparum</i>. Gametocytes are the stage the mosquito ingests.", img: "e4_fal_banana.jpg" },
        { q: "Picture 3. Ring stage in a normal-size RBC, two rings in one cell. Which species?", a: "<i><b>P. falciparum</b></i> ring.<br><b>Look for:</b> more than one ring per RBC, RBC <b>not enlarged</b>, a “diamond ring” with the chromatin dot resting on the ring.<br><b>Compare:</b> vivax and ovale rings sit in big, young RBCs; malariae has a “bird’s-eye” ring.", img: "e4_ring_fal.jpg" },
        { q: "Picture 4. Ring stage inside a noticeably enlarged RBC. Which species?", a: "<i><b>P. vivax</b></i> ring.<br><b>Look for:</b> infected cell is <b>bigger than its neighbors</b> (vivax prefers young RBCs / reticulocytes); thick ring; <b>Schüffner’s dots</b> (fine red stippling) appear as it matures.<br><b>Know:</b> most common malaria, benign tertian, 48 h cycle, relapses, Duffy-negative people are protected.", img: "e4_ring_viv.jpg" },
        { q: "Picture 5. Ring stage in a normal-to-small RBC with the dot centered. Which species?", a: "<i><b>P. malariae</b></i> ring.<br><b>Look for:</b> <b>“bird’s-eye”</b> ring (chromatin dot in the middle), RBC normal or slightly small, no stippling.<br><b>Know:</b> benign <b>quartan</b> malaria (72 h cycle, fever every 4th day), low parasitemia, recrudescence, associated with kidney disease (proteinuria, nephrotic syndrome).", img: "e4_ring_mal.jpg" },
        { q: "Picture 6. Young parasite in an enlarged, oval RBC. Which species?", a: "<i><b>P. ovale</b></i>.<br><b>Look for:</b> infected RBC is enlarged and <b>oval / egg-shaped</b>, sometimes with a ragged (fimbriated) edge; ring and troph are <b>more compact</b> than vivax; Schüffner’s dots.<br><b>Know:</b> 2nd rarest, Central West Africa and some South Pacific islands, 48 h cycle, hard to tell from vivax.", img: "e4_ring_ova.jpg" },
        { q: "Picture 7. Trophozoite: sprawling, irregular parasite filling an enlarged RBC. Which species?", a: "<i><b>P. vivax</b></i> <b>amoeboid trophozoite</b>.<br><b>Look for:</b> irregular, spread-out (“amoeboid”) cytoplasm, <b>enlarged RBC</b>, Schüffner’s dots.<br><b>Compare:</b> ovale trophs are compact; malariae makes a band; falciparum trophs are not normally seen in peripheral blood.", img: "e4_troph_viv.jpg" },
        { q: "Picture 8. Trophozoite stretched straight across the RBC, heavy pigment. Which species?", a: "<i><b>P. malariae</b></i> <b>band trophozoite</b>.<br><b>Look for:</b> a band running edge to edge across a normal-size RBC, coarse dark pigment.<br><b>Know:</b> the band form is the <b>diagnostic characteristic</b> of <i>P. malariae</i> (“ding ding ding”).", img: "e4_troph_mal.jpg" },
        { q: "Picture 9. Compact trophozoite in an elongated, oval RBC. Which species?", a: "<i><b>P. ovale</b></i> trophozoite (the “comet” troph).<br><b>Look for:</b> <b>oval / elongated RBC</b>, compact (not amoeboid) parasite, Schüffner’s dots.<br><b>Compare:</b> vivax troph is amoeboid in a round enlarged cell.", img: "e4_troph_ova.jpg" },
        { q: "Picture 10. Schizont packing an enlarged RBC with about 20 merozoites. Which species?", a: "<i><b>P. vivax</b></i> schizont.<br><b>Look for:</b> big, young RBC <b>packed full of merozoites: 16–24</b> (about 20), with pigment.<br><b>Compare:</b> ovale 6–12 in an oval cell; malariae has fewer, in a normal or small cell.", img: "e4_sch_viv.jpg" },
        { q: "Picture 11. Schizont with few merozoites around central pigment, RBC not enlarged. Which species?", a: "<i><b>P. malariae</b></i> schizont.<br><b>Look for:</b> <b>fewer merozoites</b> (about 6–12), often arranged as a rosette / daisy around a clump of pigment; infected RBC is <b>normal or smaller</b>; more colorful than the others.", img: "e4_sch_mal.jpg" },
        { q: "Picture 12. Schizont with 6–12 merozoites in an oval RBC. Which species?", a: "<i><b>P. ovale</b></i> schizont.<br><b>Look for:</b> <b>6–12 merozoites</b>, <b>oval-shaped</b> enlarged RBC, Schüffner’s dots.<br><b>Compare:</b> vivax has about twice as many (16–24) in a round enlarged cell.", img: "e4_sch_ova.jpg" },
        { q: "Picture 13. Gametocyte: elongated, curved, distorting the RBC. Which species?", a: "<i><b>P. falciparum</b></i> gametocyte (blood banana).<br><b>Look for:</b> crescent / banana shape. No other species makes this.<br><b>Know:</b> diagnostic on its own.", img: "e4_gam_fal.jpg" },
        { q: "Picture 14. Gametocyte: large, round, filling most of an enlarged RBC. Which species?", a: "<i><b>P. vivax</b></i> gametocyte.<br><b>Look for:</b> round parasite that <b>fills the majority of an enlarged RBC</b>, scattered pigment, Schüffner’s dots.", img: "e4_gam_viv.jpg" },
        { q: "Picture 15. Gametocyte: round, heavily pigmented, in a normal-size RBC. Which species?", a: "<i><b>P. malariae</b></i> gametocyte.<br><b>Look for:</b> fills a <b>normal or small</b> RBC, coarse abundant pigment (the most colorful one), no stippling.", img: "e4_gam_mal.jpg" },
        { q: "Picture 16. Gametocyte: round parasite in an oval, enlarged RBC. Which species?", a: "<i><b>P. ovale</b></i> gametocyte.<br><b>Look for:</b> like vivax but the cell is <b>more oval</b> and the parasite a bit smaller; Schüffner’s dots.", img: "e4_gam_ova.jpg" },
        { q: "Picture 17. Schizont and gametocyte from one patient. Both sit in enlarged RBCs with red stippling. Which species, and what is the stippling called?", a: "<i><b>P. vivax</b></i>; the stippling is <b>Schüffner’s dots</b>.<br><b>Look for:</b> enlarged young RBCs, schizont with many merozoites (16–24), gametocyte filling the cell.<br><b>Know:</b> this is the species you could theoretically catch in the US (locally acquired cases in Florida and Texas, 2023).", img: "e4_viv_combo.jpg" },
        { q: "Picture 18. Tiny rings in RBCs, some arranged as a four-part cross. Identify.", a: "<i><b>Babesia microti</b></i>.<br><b>Look for:</b> small rings that <b>resemble malaria</b>, often <b>more than one per RBC</b>, no pigment, and the <b>tetrad / Maltese cross</b>, which is diagnostic (see one and you can call it).<br><b>Know:</b> “Nantucket fever”; <b>Ixodes (deer) tick</b>; also by transfusion; humans are <b>accidental hosts</b>; reservoirs are cattle and rodents; no exoerythrocytic stage; worst in splenectomized / immunocompromised patients.", img: "e4_bab_tetrad.jpg" },
        { q: "Picture 19. Field with ring forms and one cell holding a tetrad. Malaria or something else?", a: "<i><b>Babesia</b></i>, not malaria.<br><b>Tell them apart:</b> Maltese cross tetrad, multiple small rings per cell, <b>no pigment, no gametocytes, no schizonts</b>, low numbers of parasites.<br><b>Know:</b> endemic in Martha’s Vineyard, Cape Cod, Long Island; causes massive intravascular hemolysis.", img: "e4_bab_field.jpg" },
        { q: "Picture 20. Name this vector and the disease it carries.", a: "<b>Female <i>Anopheles</i> mosquito</b>: vector of <b>malaria</b> (all <i>Plasmodium</i> species).<br><b>Know:</b> only the female bites. She injects <b>sporozoites</b> (infective stage), which reach the liver in about 30 minutes. She picks up <b>gametocytes</b> when she feeds.", img: "e4_anopheles.jpg" },
        { q: "Picture 21. Name this vector and the blood parasite it transmits.", a: "<b><i>Ixodes</i> tick</b> (blacklegged / deer tick): vector of <i><b>Babesia</b></i>.<br><b>Know:</b> Northeast US coast; hunters and farmers at risk; most people are asymptomatic and self-cure; can also be passed by <b>blood transfusion</b>.", img: "e4_ixodes.jpg" }
      ]
    },
    {
      code: "BT-PIC2",
      title: "Picture ID: trypanosomes & Leishmania",
      cap: "lavender",
      group: "Blood & Tissue Parasites · Micro II · Exam 4",
      html: true,
      cards: [
        { q: "Picture 1. Name the four hemoflagellate forms A, B, C and D.", a: "<b>A = Promastigote</b> (<i>Leishmania</i>, in the insect vector).<br><b>B = Epimastigote</b> (<i>Trypanosoma</i>, in the insect vector).<br><b>C = Trypomastigote</b> (bloodstream form of <i>Trypanosoma</i>).<br><b>D = Amastigote</b> (intracellular stage of <i>T. cruzi</i> and <i>Leishmania</i>).<br><b>Rule:</b> forms are defined by where the <b>kinetoplast</b> and flagellum sit; the kinetoplast migrates toward the posterior end from A to C.", img: "e4_forms.jpg" },
        { q: "Picture 2. Slender, curvy flagellates swimming between RBCs. Identify the organism and stage.", a: "<i><b>Trypanosoma brucei</b></i> <b>trypomastigotes</b>.<br><b>Look for:</b> 15–20 µm, curvy / “S” shaped, undulating membrane, and a <b>tiny posterior kinetoplast</b> (focus on the kinetoplast, not the curve).<br><b>Know:</b> <b>African sleeping sickness</b>; vector is the <b>tsetse fly</b>; found in blood, lymph fluid, CSF or chancre fluid.", img: "e4_brucei1.jpg" },
        { q: "Picture 3. Single trypomastigote with a very small dot at the back end. Which trypanosome?", a: "<i><b>Trypanosoma brucei</b></i>.<br><b>Look for:</b> <b>small</b> posterior kinetoplast, obvious undulating membrane, long slender body.<br><b>Two forms:</b> <i>T. b. gambiense</i> = West African, milder, low parasitemia, death in 2–3 years, no known animal reservoir. <i>T. b. rhodesiense</i> = East / Central African, severe, high parasitemia, death within a year, reservoirs bushbuck and cattle.", img: "e4_brucei2.jpg" },
        { q: "Picture 4. “C”-shaped trypomastigote with a big dark dot at one end. Identify.", a: "<i><b>Trypanosoma cruzi</b></i> trypomastigote.<br><b>Look for:</b> 15–20 µm, often a <b>“C” or “U” shape</b>, with a <b>large, bulging posterior kinetoplast</b>; undulating membrane and flagellum are hard to see.<br><b>Know:</b> <b>Chagas disease</b> (American trypanosomiasis), Central and South America; vector is the <b>reduviid / triatomine “kissing bug.”</b>", img: "e4_cruzi1.jpg" },
        { q: "Picture 5. Blood smear, one trypomastigote among RBCs. How do you tell <i>T. cruzi</i> from <i>T. brucei</i>?", a: "This is <i><b>T. cruzi</b></i>.<br><b>Kinetoplast:</b> <i>cruzi</i> = <b>large</b>; <i>brucei</i> = <b>tiny</b>.<br><b>Shape:</b> <i>cruzi</i> = C or U; <i>brucei</i> = curvy S.<br><b>Geography:</b> <i>cruzi</i> = the Americas; <i>brucei</i> = Africa.<br><b>Tissue stage:</b> only <i>cruzi</i> has intracellular <b>amastigotes</b>.<br><b>Specimen:</b> Giemsa thick / thin smear, EDTA tube, within 1 hour; trypomastigotes circulate for the first 12 weeks.", img: "e4_cruzi2.jpg" },
        { q: "Picture 6. H&E of heart muscle: a cell packed with tiny dot-like organisms. Identify the organism and stage.", a: "<i><b>Trypanosoma cruzi</b></i> <b>amastigotes</b> in cardiac muscle (a pseudocyst).<br><b>Look for:</b> small round intracellular bodies, each with a nucleus and kinetoplast, no free flagellum.<br><b>Know:</b> chronic Chagas targets the <b>heart, intestine and skeletal muscle</b>; after several months amastigotes are found on histopathology of affected organs.", img: "e4_cruzi_ama.jpg" },
        { q: "Picture 7. Name this vector and its disease.", a: "<b>Tsetse fly</b> (<i>Glossina</i>): vector of <i><b>Trypanosoma brucei</b></i>, <b>African sleeping sickness</b>.<br><b>Know:</b> a <b>chancre</b> forms at the bite; the parasite spreads by the lymphatics and settles in the <b>CNS</b> (personality change, apathy, somnolence, meningoencephalitis).", img: "e4_tsetse.jpg" },
        { q: "Picture 8. Name this vector, its disease, and how the parasite actually gets in.", a: "<b>Triatomine / reduviid bug, the “kissing bug”</b>: vector of <i><b>Trypanosoma cruzi</b></i> (Chagas disease).<br><b>How:</b> feeds at night, the bite is painless (anesthetic saliva). It <b>defecates</b> while feeding and the <b>metacyclic trypomastigotes in the feces</b> are rubbed into the bite or mucosa.<br><b>Also transmitted:</b> congenitally, by blood transfusion and organ transplant.<br><b>In the bug:</b> epimastigotes multiply in the gut; trypomastigotes in the rectum are infective.", img: "e4_kissing.jpg" },
        { q: "Picture 9. Painless swelling of one eyelid after a night-time insect bite in South America. Name the sign and the disease.", a: "<b>Romaña’s sign</b>: acute <b>Chagas disease</b> (<i>T. cruzi</i>).<br><b>What it is:</b> painless, non-pitting edema and conjunctivitis when the entry site is the <b>ocular mucosa</b>. On skin the lesion is a <b>chagoma</b> (inflamed, edematous subcutaneous nodule).<br><b>Know:</b> incubation 5–10 days; acute phase 4–8 weeks; becomes chronic if untreated.", img: "e4_romana.jpg" },
        { q: "Picture 10. Barium study showing a massively dilated colon in a patient from Brazil. Which parasite?", a: "<i><b>Trypanosoma cruzi</b></i>: <b>megacolon</b> of chronic Chagas disease.<br><b>Know:</b> 20–30% progress over 10–30 years to <b>cardiac</b> (cardiomyopathy, dysrhythmia) or <b>GI</b> (megaesophagus, megacolon) disease. Parasitemia is low in the chronic phase, so smears are poor: use serology and PCR.", img: "e4_megacolon.jpg" },
        { q: "Picture 11. Name this vector and its disease.", a: "<b>Sandfly</b>: vector of <i><b>Leishmania</b></i>.<br><b>Know:</b> <i>Phlebotomus</i> in the <b>Old World</b>, <i>Lutzomyia</i> in the <b>New World</b>. It injects <b>promastigotes</b>, which macrophages engulf and which then become <b>amastigotes</b>.", img: "e4_sandfly.jpg" },
        { q: "Picture 12. Bone marrow: a macrophage stuffed with small oval bodies (arrows). Identify the organism, stage and name.", a: "<i><b>Leishmania</b></i> <b>amastigotes</b> = <b>Leishman-Donovan (L-D) bodies</b>.<br><b>Look for:</b> small oval bodies inside monocytes / macrophages, each with a <b>large nucleus and a small rod-shaped kinetoplast</b>.<br><b>Know:</b> obligate intracellular; <b>amastigotes are the only stage we see in humans</b>; found in bone marrow, spleen, liver, lymph node, skin biopsy and buffy coat.", img: "e4_ld1.jpg" },
        { q: "Picture 13. High power: tiny bodies, each with a nucleus and a smaller dot, next to a host cell nucleus. What feature confirms the ID?", a: "The <b>kinetoplast</b>: these are <i><b>Leishmania</b></i> amastigotes (L-D bodies).<br><b>Look for:</b> a “two-dot” body (large nucleus + small kinetoplast). The kinetoplast separates them from look-alikes such as <i>Histoplasma</i> or <i>Toxoplasma</i>.<br><b>Diagnosis:</b> amastigotes in tissue on histology, broth culture, and real-time PCR.", img: "e4_ld2.jpg" },
        { q: "Picture 14. Rare finding: small two-dot oval bodies on a peripheral blood smear. Identify and say why this is unusual.", a: "<i><b>Leishmania</b></i> amastigotes on a blood smear.<br><b>Unusual because:</b> <i>Leishmania</i> normally has <b>no forms seen in the blood</b>; it lives in tissue macrophages. When seen in blood it is in monocytes / buffy coat, with <b>visceral leishmaniasis</b> (kala-azar, <i>L. donovani</i>).<br><b>Kala-azar:</b> fever, hepatosplenomegaly, weight loss, pancytopenia, hypergammaglobulinemia, skin darkening.", img: "e4_ld_blood.jpg" }
      ]
    },
    {
      code: "BT-PIC3",
      title: "Picture ID: microfilariae",
      cap: "lightblue",
      group: "Blood & Tissue Parasites · Micro II · Exam 4",
      html: true,
      cards: [
        { q: "Picture 1. Blood microfilaria with a clear sheath and a tail tip free of nuclei. Identify.", a: "<i><b>Wuchereria bancrofti</b></i>.<br><b>Look for:</b> <b>sheathed</b>; <b>pointed tail with NO nuclei in the tip</b> (you must see the very tip); <b>short head space</b>.<br><b>Know:</b> elephantiasis (lymphatic filariasis); <b>mosquito</b> vector; tropics and subtropics; <b>nocturnal periodicity</b> (draw blood at night).", img: "e4_wb.jpg" },
        { q: "Picture 2. Tail of a sheathed microfilaria: nuclei are loosely spaced and stop short of the tip. Which one?", a: "<i><b>Wuchereria bancrofti</b></i>.<br><b>Flowchart:</b> Sheathed? Yes. Tail tip <b>W</b>ithout nuclei = <b>W</b>uchereria.<br><b>Compare:</b> <i>Loa loa</i> nuclei run to the tip; <i>Brugia</i> has two separate nuclei at the tip.", img: "e4_wb_tail.jpg" },
        { q: "Picture 3. Giemsa-stained microfilaria with a pink sheath and a long empty head space. Identify.", a: "<i><b>Brugia malayi</b></i>.<br><b>Look for:</b> <b>sheathed</b>, and <b>Giemsa stains the sheath pink</b>; <b>long head space</b>; <b>terminal and subterminal nuclei</b> in the tail (the “bedonkadonk”).<br><b>Know:</b> elephantiasis; <b>mosquito</b> vector; <b>Asia</b>; nocturnal periodicity.", img: "e4_brugia.jpg" },
        { q: "Picture 4. Tail with two separated nuclei (arrows) and a pink sheath. Which microfilaria?", a: "<i><b>Brugia</b></i> species (<i>B. malayi</i>).<br><b>Look for:</b> a <b>subterminal nucleus</b> and a <b>terminal nucleus</b> with a gap between them, plus the pink sheath.<br><b>Flowchart:</b> Sheathed? Yes. Tail has a bedonkadonk = <i>Brugia</i>.", img: "e4_brugia_tail.jpg" },
        { q: "Picture 5. Sheathed microfilaria (sheath stains faintly) with nuclei running all the way to the tail tip. Identify.", a: "<i><b>Loa loa</b></i>, the African eye worm.<br><b>Look for:</b> <b>sheathed</b> (often hard to see, stains faintly); <b>nuclei extend to the tip of the tail</b> (“flow-a flow-a”); <b>short head space</b>.<br><b>Know:</b> <b>tabanid (deer / mango) fly</b>, genus <i>Chrysops</i>; West and Central Africa; <b>diurnal periodicity</b> (draw at midday); <b>Calabar swellings</b>; adult crosses the conjunctiva.", img: "e4_loa.jpg" },
        { q: "Picture 6. Sheathed microfilaria, continuous column of nuclei to the tail tip. Which one, and when do you draw blood?", a: "<i><b>Loa loa</b></i>; draw during the <b>day</b> (diurnal periodicity).<br><b>Flowchart:</b> Sheathed? Yes. Nuclei “flow-a-flow-a” to the tip = <i>Loa loa</i>.<br><b>Compare:</b> <i>Wuchereria</i> and <i>Brugia</i> are nocturnal.", img: "e4_loa2.jpg" },
        { q: "Picture 7. Unsheathed microfilaria from a <b>skin snip</b>, tail bent with no nuclei in it. Identify.", a: "<i><b>Onchocerca volvulus</b></i>.<br><b>Look for:</b> <b>NOT sheathed</b>; tail tapered, <b>bent or flexed</b>; <b>no nuclei in the tail</b>; long head space.<br><b>Know:</b> <b>NOT found in blood</b>: diagnose with <b>skin snips</b> or nodule aspirates. <b>Blackfly</b> (<i>Simulium</i>) vector. <b>River blindness.</b> Central Africa, Yemen, Mexico, Central and northern South America.", img: "e4_oncho.jpg" },
        { q: "Picture 8. One blood film, two different microfilariae: a small one with no sheath and a larger sheathed one. Name both.", a: "<b>Double infection.</b><br>Small one: <i><b>Mansonella perstans</b></i>: <b>no sheath</b>, <b>blunt tail with nuclei to the end</b>.<br>Large one: <i><b>Loa loa</b></i>: <b>sheathed</b>, tapered tail, nuclei extend to the end.<br><b>Know:</b> <i>Mansonella</i> is carried by <b>midges</b>.", img: "e4_double.jpg" },
        { q: "Picture 9. Microfilaria with <b>no sheath</b>. Which two organisms are on the “NO” branch of the flowchart?", a: "<i><b>Mansonella</b></i> species, or <i><b>Onchocerca volvulus</b></i>.<br><b>Split them by specimen:</b> <i>Mansonella</i> is found in <b>blood</b>; <i>Onchocerca</i> is <b>not seen in blood</b> (skin snips).<br><b>Tails:</b> <i>M. perstans</i> = blunt, nuclei to the end. <i>Onchocerca</i> = bent, no nuclei.", img: "e4_unsheathed.jpg" },
        { q: "Picture 10. An adult worm is being lifted from under the conjunctiva. Identify the worm.", a: "<i><b>Loa loa</b></i>, the <b>eye worm</b>.<br><b>Know:</b> adults live and migrate in <b>subcutaneous tissue</b>, especially the conjunctiva and cornea. Migration through tissue causes transient <b>Calabar swellings</b>. Tabanid fly vector, West and Central Africa, diurnal microfilariae in blood.", img: "e4_eyeworm.jpg" },
        { q: "Picture 11. Massive chronic swelling of one leg in a patient from the tropics. Name the condition and the two agents.", a: "<b>Elephantiasis</b> (lymphatic filariasis): <i><b>Wuchereria bancrofti</b></i> and <i><b>Brugia malayi</b></i>.<br><b>Why:</b> adults live in the <b>lymphatics</b>; repeated inflammation and lymphedema cause chronic swelling of legs, arms, scrotum, vulva or breasts.<br><b>Know:</b> mosquito vector; humans are the <b>definitive host</b>; filarial worms are <b>not</b> acquired by transfusion.", img: "e4_eleph.jpg" },
        { q: "Picture 12. Patchy loss of pigment on the shin (“leopard skin”) in a patient from Central Africa. Which parasite?", a: "<i><b>Onchocerca volvulus</b></i>: the <b>dermatitis</b> arm of the clinical triad.<br><b>Triad of onchocerciasis:</b> (1) <b>dermatitis</b> (pruritus, papules, altered pigmentation, lichenification); (2) <b>skin nodules</b> (onchocercomas); (3) <b>ocular lesions</b> (river blindness).", img: "e4_leopard.jpg" },
        { q: "Picture 13. Firm subcutaneous lump over a bony prominence. What is it called and what is inside?", a: "An <b>onchocercoma</b>: a fibrous nodule containing <b>adult <i>Onchocerca volvulus</i></b>.<br><b>Know:</b> common over bony prominences (head, trunk, extremities). Aspirate the nodule or take a <b>skin snip</b> to find microfilariae; they are not in the blood.", img: "e4_nodule.jpg" }
      ]
    },
    {
      code: "BT-PIC4",
      title: "Picture ID: tissue parasites",
      cap: "green",
      group: "Blood & Tissue Parasites · Micro II · Exam 4",
      html: true,
      cards: [
        { q: "Picture 1. Muscle biopsy: a coiled larva inside a capsule within a muscle fiber. Identify.", a: "<i><b>Trichinella spiralis</b></i> <b>encysted larva</b> in a “nurse cell.”<br><b>Look for:</b> tightly coiled larva inside <b>striated muscle</b>.<br><b>Know:</b> from undercooked <b>pork, bear, wild boar, walrus</b> and other game (hunters!). The adult passes <b>larvae, not eggs</b>. Eosinophilia, elevated muscle enzymes, periorbital edema, muscle pain, splinter hemorrhages. <b>Specimen: muscle biopsy</b> (better after digestion).", img: "e4_trich_muscle.jpg" },
        { q: "Picture 2. Free, spiral-coiled larva recovered after digesting muscle tissue. Identify.", a: "<i><b>Trichinella spiralis</b></i> larva.<br><b>Know:</b> digesting the muscle before examination frees more larvae and raises sensitivity. Larvae can live for years in highly oxygenated striated muscle. Humans are listed as <b>intermediate hosts</b>; there is no host specificity (100+ animals).", img: "e4_trich_larva.jpg" },
        { q: "Picture 3. Red, raised, winding track that advances across the skin. Name the condition and its causes.", a: "<b>Cutaneous larva migrans</b> (creeping eruption, ground itch).<br><b>Agents:</b> animal hookworm larvae, mainly <i><b>Ancylostoma braziliense</b></i> and <i>A. caninum</i>.<br><b>Why they wander:</b> filariform larvae penetrate skin but <b>lack the collagenase</b> to go deeper, so they cannot finish the cycle.<br><b>Know:</b> sandy / loamy soil (SE USA); humans are <b>accidental hosts</b>; <b>diagnosed on clinical findings only</b>.", img: "e4_clm.jpg" },
        { q: "Picture 4. Thick-shelled brown eggs that look like <i>Ascaris</i>, from raccoon feces. Identify.", a: "<i><b>Baylisascaris procyonis</b></i> eggs (raccoon roundworm).<br><b>Look for:</b> <i>Ascaris</i>-like, thick finely pitted shell; unembryonated and embryonated forms.<br><b>Know:</b> <b>not found in human stool</b> (eggs hatch in the gut and larvae migrate). Kids pick them up from <b>sandboxes</b> used as raccoon latrines. Causes <b>visceral and neural larva migrans</b> (eosinophilic meningoencephalitis).", img: "e4_bayli_eggs.jpg" },
        { q: "Picture 5. A long worm is being wound out of a skin blister onto a stick. Identify.", a: "<i><b>Dracunculus medinensis</b></i>, the <b>guinea worm</b>.<br><b>Know:</b> acquired by <b>drinking water containing copepods</b> that carry the larvae. The adult female lives in subcutaneous tissue, makes an acidic <b>blister</b> that ruptures in water and releases larvae. Treatment: slow extraction with gentle constant pressure (“winding out the worm”). Africa, Middle East, India, Pakistan; nearly eradicated.", img: "e4_guinea.jpg" },
        { q: "Picture 6. Brain section riddled with small cysts. Name the disease and the organism.", a: "<b>Cysticercosis</b> (neurocysticercosis): larval <i><b>Taenia solium</b></i>.<br><b>Know:</b> acquired by ingesting <b><i>T. solium</i> eggs</b> (autoinoculation or contaminated food), <b>not</b> by eating pork cysts. Encysted larvae can form in any tissue. Humans are <b>accidental (intermediate) hosts</b>. Mexico, Latin America, India, China, Africa.", img: "e4_cysti.jpg" },
        { q: "Picture 7. Translucent bladder cyst studded with many clusters of scolices. Name the disease and the organism.", a: "<b>Coenurosis</b>: larval <i><b>Taenia multiceps</b></i>.<br><b>Look for:</b> one fluid-filled bladder (coenurus) with <b>multiple scolices</b> invaginated in clusters. “Multiple” is the differentiating factor.<br><b>Know:</b> normal hosts are dogs and cats; humans ingest eggs and become <b>accidental intermediate hosts</b>; larvae go to brain, subcutaneous tissue or muscle.", img: "e4_coenurus.jpg" },
        { q: "Picture 8. Fluid aspirated from a liver cyst: tiny scolices with rows of hooklets. What is this called and which organism?", a: "<b>Hydatid sand</b>: protoscoleces of <i><b>Echinococcus granulosus</b></i>.<br><b>Look for:</b> small invaginated scolices with a crown of <b>hooklets</b>, floating free in cyst fluid.<br><b>Know:</b> <b>hydatid disease</b>, slow and progressive; sheep- and cattle-raising areas; <b>dog = definitive host</b>, sheep = intermediate, human = accidental intermediate (ingests eggs).", img: "e4_hydsand.jpg" },
        { q: "Picture 9. Surgery reveals a mass of smooth, grape-like fluid-filled cysts. Identify the disease.", a: "<b>Hydatid cysts</b>: <i><b>Echinococcus granulosus</b></i>.<br><b>Know:</b> cysts can arise anywhere, mostly <b>liver and lung</b>. They contain numerous scolices and <b>daughter cysts</b> (“Russian doll” cysts).<br><b>Compare:</b> <i>E. multilocularis</i> = alveolar, <b>no scoleces</b>, faster. <i>E. vogeli</i> = polycystic, scoleces present, Latin America.", img: "e4_hydcysts.jpg" },
        { q: "Picture 10. Histology of a cyst wall with capsules full of small round bodies budding inward. Identify.", a: "<i><b>Echinococcus granulosus</b></i>: <b>brood capsules / daughter cysts</b> with protoscoleces.<br><b>Wall layers, outside in:</b> adventitia (host), laminated membrane, <b>germinal layer</b> (buds the brood capsules).", img: "e4_daughter.jpg" },
        { q: "Picture 11. Larva with a <b>forked tail</b> found in lake water with snails. Identify the stage and the disease in humans.", a: "<b>Schistosome cercaria</b> (fork-tailed): cause of <b>swimmer’s itch</b>.<br><b>Know:</b> avian schistosome cercariae penetrate skin, trigger an <b>allergic dermal response</b>, then die without developing. Northern USA and Canada, lakes and ponds with snails. Humans are <b>accidental hosts</b>.", img: "e4_cercaria.jpg" },
        { q: "Picture 12. Crescent-shaped organisms free in fluid. Identify the organism and stage.", a: "<i><b>Toxoplasma gondii</b></i> <b>tachyzoites</b>.<br><b>Look for:</b> small crescent / banana-shaped bodies with a nucleus, in tissue or body fluid.<br><b>Know:</b> tachyzoites = rapidly dividing form of <b>acute</b> infection. Obligate intracellular. <b>Cat = definitive host.</b>", img: "e4_tachy.jpg" },
        { q: "Picture 13. Oocyst containing two sporocysts, from cat feces. Identify.", a: "<i><b>Toxoplasma gondii</b></i> <b>sporulated oocyst</b>.<br><b>Look for:</b> about <b>11 × 13 µm</b>, two sporocysts holding sporozoites; looks like a small <i>Cystoisospora (Isospora) belli</i>.<br><b>Know:</b> shed <b>only by cats</b> (sexual cycle). Humans are infected by ingesting or inhaling oocysts, eating <b>undercooked meat</b>, transfusion or transplant, or congenitally.", img: "e4_toxo_oocyst.jpg" },
        { q: "Picture 14. Round tissue cyst packed with hundreds of tiny organisms. Identify the organism and stage.", a: "<i><b>Toxoplasma gondii</b></i> <b>tissue cyst with bradyzoites</b>.<br><b>Know:</b> bradyzoites = slow, dormant form of chronic infection (brain, muscle). Humans have only the <b>asexual</b> cycle. Dangerous in <b>pregnancy</b> (congenital infection, later retinochoroiditis) and the <b>immunocompromised</b> (encephalitis).", img: "e4_toxo_cyst.jpg" },
        { q: "Picture 15. CSF Wright stain: among neutrophils, amoebae (arrows) with a large central karyosome. Summer, lake swimming, teenager. Identify.", a: "<i><b>Naegleria fowleri</b></i> trophozoites, the “brain-eating amoeba.”<br><b>Know:</b> causes <b>primary amebic meningoencephalitis (PAM)</b>. Warm freshwater goes <b>up the nose</b> to the brain. <b>About 97% fatal</b>, death usually in 5–7 days; fewer than 10 US cases a year. <b>Specimen: CSF</b> (wet prep for motile trophs, Wright / Giemsa). The patient does <b>not</b> need to be immunocompromised.", img: "e4_naegleria.jpg" },
        { q: "Picture 16. Free-living amoeba with spiky projections, plus a double-walled cyst. Contact lens wearer. Identify.", a: "<i><b>Acanthamoeba</b></i>.<br><b>Look for:</b> trophozoite with spine-like <b>acanthopodia</b> and a large karyosome; wrinkled <b>double-walled cyst</b>.<br><b>Know:</b> water and soil worldwide. <b>Keratitis</b> in healthy contact lens users (homemade saline); <b>granulomatous amebic encephalitis (GAE)</b> and disseminated infection in the immunocompromised. Enters by eyes, skin wounds or inhalation.", img: "e4_acanth.jpg" },
        { q: "Picture 17. Painful eye with a ring-shaped corneal infiltrate in a contact lens wearer. Which parasite?", a: "<i><b>Acanthamoeba</b></i> <b>keratitis</b>.<br><b>Know:</b> occurs in otherwise healthy people, can cause permanent visual impairment or blindness. Specimen: <b>corneal scraping</b>.<br><b>Do not confuse with:</b> <i>Loa loa</i> (worm under the conjunctiva), <i>Onchocerca</i> (river blindness), <i>Toxocara</i> (ocular larva migrans).", img: "e4_keratitis.jpg" }
      ]
    },
    {
      code: "BT-5",
      title: "Vectors, transmission & host type",
      cap: "gold",
      group: "Blood & Tissue Parasites · Micro II · Exam 4",
      html: true,
      cards: [
        { q: "Malaria: vector, infective stage, and stage the vector picks up?", a: "<b>Female <i>Anopheles</i> mosquito.</b> Injects <b>sporozoites</b>; ingests <b>gametocytes</b>. Also by transfusion and congenitally." },
        { q: "Malaria: what type of host is the human?", a: "<b>Intermediate host</b> (asexual cycle: liver, then RBCs). The mosquito is the <b>definitive host</b> (sexual cycle)." },
        { q: "<i>Babesia</i>: vector, reservoir, and human host type?", a: "<b><i>Ixodes</i> (deer) tick</b>; reservoirs <b>cattle and rodents</b>; humans are <b>accidental hosts</b>. Also <b>transfusion</b>-transmitted." },
        { q: "<i>Trypanosoma brucei</i>: vector and where?", a: "<b>Tsetse fly</b>, Africa. <i>gambiense</i> = West; <i>rhodesiense</i> = East / Central." },
        { q: "<i>Trypanosoma cruzi</i>: vector and all routes of transmission?", a: "<b>Reduviid / triatomine (kissing) bug</b>: infected <b>feces</b> rubbed into the bite or mucosa. Also <b>congenital</b>, <b>blood transfusion</b>, organ transplant." },
        { q: "<i>Leishmania</i>: vector (Old World vs New World)?", a: "<b>Sandfly</b>: <i>Phlebotomus</i> (Old World), <i>Lutzomyia</i> (New World). Visceral disease can also pass congenitally, by transfusion, sexual contact or occupational exposure." },
        { q: "Match the filarial worm to its vector: <i>Wuchereria</i>, <i>Brugia</i>, <i>Onchocerca</i>, <i>Mansonella</i>, <i>Loa loa</i>.", a: "<i>Wuchereria</i> and <i>Brugia</i> = <b>mosquitoes</b>. <i>Onchocerca</i> = <b>blackflies</b>. <i>Mansonella</i> = <b>midges</b>. <i>Loa loa</i> = <b>tabanid flies</b>." },
        { q: "Can filarial worms be acquired through blood transfusion?", a: "<b>No.</b> Microfilariae are large and easy to see at 10×, so they are caught at screening. Malaria, <i>Babesia</i> and trypanosomes are the ones that get transfused." },
        { q: "Which blood parasites are transfusion risks?", a: "<b><i>Plasmodium</i>, <i>Babesia</i>, <i>Trypanosoma cruzi</i></b> (and <i>Leishmania</i>, <i>Toxoplasma</i>)." },
        { q: "<i>Trichinella spiralis</i>: how is it acquired?", a: "Eating <b>undercooked meat with encysted larvae</b>: pork, bear, wild boar, walrus, cougar, horse, deer." },
        { q: "<i>Toxocara canis / cati</i>: how acquired and what disease?", a: "A child <b>ingests eggs</b> from dog / cat feces in soil. <b>Visceral</b> and <b>ocular larva migrans</b>. Most common cause in US kids." },
        { q: "<i>Dracunculus medinensis</i>: how acquired?", a: "<b>Drinking water</b> containing <b>copepods</b> infected with larvae." },
        { q: "“Sushi disease”: agents and source?", a: "<i><b>Anisakis</b></i>, <i>Angiostrongylus</i>, <i>Eustrongylides</i>, <i>Phocanema</i>. <b>Raw seafood.</b> A form of visceral larva migrans: acute abdomen, blockage, eosinophilia." },
        { q: "<i>Toxoplasma gondii</i>: definitive host and routes to humans?", a: "<b>Cat.</b> Ingest / inhale <b>oocysts</b>; <b>undercooked</b> beef, pork, lamb, chicken; blood products or <b>transplant</b>; congenital." },
        { q: "<i>Naegleria fowleri</i>: how acquired?", a: "<b>Warm freshwater up the nose</b> (lakes, rivers, poorly kept pools, even tap water). Not by drinking it." },
        { q: "In which of these are humans <b>accidental</b> hosts?", a: "<i>Babesia</i>, cysticercosis (<i>T. solium</i> eggs), coenurosis, hydatid disease, <b>larva migrans</b> (cutaneous, visceral, ocular, neural), swimmer’s itch." },
        { q: "Hydatid disease: definitive, intermediate, and human host roles?", a: "<b>Dog</b> = definitive. <b>Sheep</b> (goats, swine) = intermediate. <b>Human</b> = accidental intermediate after ingesting eggs. For <i>E. multilocularis</i>: foxes and dogs definitive." }
      ]
    },
    {
      code: "BT-6",
      title: "Tell them apart: geography, specimens, disease",
      cap: "pink",
      group: "Blood & Tissue Parasites · Micro II · Exam 4",
      html: true,
      cards: [
        { q: "Fever cycle length for each <i>Plasmodium</i> species?", a: "<i>falciparum</i> 36–48 h (malignant tertian). <i>vivax</i> 48 h (benign tertian). <i>ovale</i> 48 h. <i>malariae</i> <b>72 h</b> (quartan). <i>knowlesi</i> 24 h." },
        { q: "Which species prefers young RBCs, and which infects normal mature cells at any age?", a: "<b><i>vivax</i></b> (and <i>ovale</i>) = young RBCs / reticulocytes, so the cell looks enlarged. <b><i>falciparum</i></b> = normal-size RBCs of any age, hence high parasitemia." },
        { q: "Schizont merozoite counts: <i>vivax</i> vs <i>ovale</i>?", a: "<i>vivax</i> <b>16–24</b>. <i>ovale</i> <b>6–12</b>." },
        { q: "Name the defining clue for each: <i>falciparum</i>, <i>vivax</i>, <i>malariae</i>, <i>ovale</i>.", a: "<i>falciparum</i>: multiple / double rings, <b>banana gametocyte</b>. <i>vivax</i>: enlarged young RBC, <b>amoeboid troph</b>, many merozoites, Schüffner’s dots. <i>malariae</i>: <b>band troph</b>, bird’s-eye ring. <i>ovale</i>: <b>oval RBC</b>, compact (comet) troph." },
        { q: "Who is protected from <i>P. vivax</i>, and why?", a: "<b>Duffy-negative</b> people: they lack the Duffy antigen, which is the receptor. Sickle cell trait and G6PD deficiency also give protection from malaria." },
        { q: "Relapse vs recrudescence?", a: "<b>Recrudescence</b>: parasites survived and the attack repeats days to weeks later (<i>malariae</i>). <b>Relapse</b>: disease returns weeks to months after apparent cure (<i>vivax</i>, liver forms)." },
        { q: "Which malaria is tied to kidney disease? Which to cerebral disease?", a: "<b>Kidney</b> (proteinuria, nephrotic syndrome): <i>P. malariae</i>. <b>Cerebral malaria</b>, blackwater fever, severe anemia: <i>P. falciparum</i>." },
        { q: "Standard specimen and stain for malaria and <i>Babesia</i>?", a: "<b>Thick and thin blood smears</b>, <b>Giemsa or Wright</b> stain. Rapid antigen test (BinaxNOW: HRP-2 for <i>falciparum</i> + pan-species LDH) must be <b>confirmed by microscopy</b>." },
        { q: "What finding rules malaria <b>out</b>?", a: "<b>Enlarged lymph nodes.</b> Malaria does not cause lymphadenopathy." },
        { q: "West vs East African sleeping sickness?", a: "<b>West</b> = <i>T. b. gambiense</i>: milder, low parasitemia, death in 2–3 years, no known animal reservoir, more common. <b>East</b> = <i>T. b. rhodesiense</i>: severe, high parasitemia, death within a year, reservoirs bushbuck and cattle." },
        { q: "Specimens for African trypanosomiasis?", a: "Trypomastigotes in <b>blood, lymph fluid, CSF, or chancre fluid</b>." },
        { q: "Which hemoflagellate stages are seen in a human: <i>T. brucei</i>, <i>T. cruzi</i>, <i>Leishmania</i>?", a: "<i>T. brucei</i>: <b>trypomastigote</b> only (blood). <i>T. cruzi</i>: <b>trypomastigote</b> (blood) and <b>amastigote</b> (tissue). <i>Leishmania</i>: <b>amastigote</b> only (in macrophages)." },
        { q: "Four presentations of leishmaniasis?", a: "<b>Cutaneous</b>, <b>mucocutaneous</b>, <b>visceral</b>, <b>viscerotropic</b>." },
        { q: "Cutaneous leishmaniasis: lesion and common names?", a: "A papule at the bite becomes a <b>chronic, well-circumscribed ulcer with a raised red margin</b>; stays in the skin; gives permanent immunity. Oriental sore, Baghdad boil, Delhi boil, Biskra button." },
        { q: "Mucocutaneous leishmaniasis: name, agent, sign?", a: "<b>Espundia</b> (South America), mainly <i><b>L. braziliensis</b></i>. Destroys nasal / oral soft tissue and cartilage: <b>tapir nose</b>." },
        { q: "Visceral leishmaniasis: names, agent, organs?", a: "<b>Kala-azar / dum dum fever</b>, <i><b>L. donovani</b></i> (New World: <i>L. donovani chagasi</i>). Bone marrow, spleen, liver (reticuloendothelial system). Hepatosplenomegaly, pancytopenia, 75–90% mortality untreated." },
        { q: "Viscerotropic leishmaniasis: agent and setting?", a: "<i><b>L. tropica</b></i>, Middle East, described in Desert Storm soldiers. Milder, without the marked hepatosplenomegaly or pancytopenia of kala-azar." },
        { q: "Which microfilariae are sheathed and which are not?", a: "<b>Sheathed:</b> <i>Wuchereria bancrofti</i>, <i>Brugia malayi</i>, <i>Loa loa</i>. <b>Not sheathed:</b> <i>Onchocerca volvulus</i>, <i>Mansonella</i>." },
        { q: "Tail nuclei for <i>Wuchereria</i>, <i>Brugia</i>, <i>Loa loa</i>, <i>Onchocerca</i>, <i>Mansonella perstans</i>?", a: "<i>Wuchereria</i>: <b>none in tip</b>. <i>Brugia</i>: <b>terminal + subterminal</b>. <i>Loa loa</i>: <b>continuous to tip</b>. <i>Onchocerca</i>: <b>none</b>, tail bent. <i>M. perstans</i>: <b>to the end</b> of a blunt tail." },
        { q: "Head space: which are short and which are long?", a: "<b>Short:</b> <i>Wuchereria</i>, <i>Loa loa</i>. <b>Long:</b> <i>Brugia</i>, <i>Onchocerca</i>." },
        { q: "Periodicity: when do you draw blood for each filarial worm?", a: "<i>Wuchereria</i> and <i>Brugia</i>: <b>night</b> (nocturnal). <i>Loa loa</i>: <b>day</b> (diurnal). <i>Onchocerca</i>: not in blood, take <b>skin snips</b>." },
        { q: "Common names: <i>Loa loa</i>, <i>Onchocerca</i>, <i>Wuchereria / Brugia</i>, <i>Dracunculus</i>.", a: "<i>Loa loa</i> = <b>eye worm</b>. <i>Onchocerca</i> = <b>river blindness</b>. <i>Wuchereria / Brugia</i> = <b>elephantiasis</b>. <i>Dracunculus</i> = <b>guinea worm</b>." },
        { q: "Specimen of choice: <i>Trichinella</i>, <i>Onchocerca</i>, <i>Leishmania</i>, <i>Naegleria</i>, cutaneous larva migrans.", a: "<i>Trichinella</i>: <b>muscle biopsy</b>. <i>Onchocerca</i>: <b>skin snip</b>. <i>Leishmania</i>: <b>tissue</b> (bone marrow, spleen, skin biopsy). <i>Naegleria</i>: <b>CSF</b>. CLM: <b>clinical findings only</b>." },
        { q: "Which <i>Echinococcus</i> cysts contain scoleces?", a: "<i>E. granulosus</i> (hydatid): <b>yes</b>, numerous. <i>E. vogeli</i> (polycystic): <b>yes</b>. <i>E. multilocularis</i> (alveolar): <b>no</b>." },
        { q: "The three tissue (free-living) amoebas and their diseases?", a: "<i><b>Naegleria fowleri</b></i>: PAM. <i><b>Acanthamoeba</b></i>: keratitis, GAE, disseminated. <i><b>Balamuthia mandrillaris</b></i>: skin rash and GAE, about 90% fatal." }
      ]
    }
  ]
};
