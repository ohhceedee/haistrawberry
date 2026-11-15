/* =====================================================================
   HaiStrawberry · Visual ID decks (mycology + parasites)
   ---------------------------------------------------------------------
   Picture-identification decks built from the pictures already on the
   site. Each card shows a picture; the answer is the organism's name,
   and the back of the card shows that organism's ID profile.

   HOW TO EDIT
   1. ORGANISMS holds one profile per organism. Edit the text there and
      every card for that organism updates.
        Fungi:     growth (rate: "slow" | "moderate" | "rapid"), colony,
                   micro (mould form), tissue (yeast / tissue form)
        Parasites: type, size, specimen
        Both:      keys (list of key ID features), lookalike (optional)
      <i> and <b> work inside the text.
   2. VID_DECKS lists the cards. Each card is
        ["picture", "organism key", "what this picture shows"]
      The picture can be a file path (cards/myc/myc_20.jpg) or a
      picture name from card-images.js (s018_1.jpg).
   3. New decks: add them at the END of VID_DECKS, so "Got it" progress
      on the existing decks is kept.

   Load order matters: data.js, then this file, then app.js / test.js.
   ===================================================================== */
(function () {
  var ORGANISMS = {

    /* ---------------- Mycology: dimorphic fungi ---------------- */
    blasto: {
      name: '<i>Blastomyces dermatitidis</i>', type: 'Dimorphic fungus',
      growth: { rate: 'slow', text: 'about 2 weeks to mature (~14 days)' },
      colony: 'Mould (25–30 °C): white, non-descript, hair-like/cottony mycelia; reverse looks the same, may tan with age. Yeast (37 °C): wrinkled, waxy, cream to tan.',
      micro: 'Thin septate hyphae with single round conidia on short stalks: <b>“lollipops.”</b>',
      tissue: 'Large (8–15 µm), thick-walled yeast with a single bud on a <b>broad base</b>; the bud grows to the mother cell’s size before it detaches. KOH or calcofluor white.',
      keys: ['<b>Broad-based budding</b> is the giveaway', 'Lollipop conidia in the mould form', 'Great Lakes / Mississippi; dogs get it too'],
      lookalike: 'Mould looks like many other white moulds, so convert it to yeast or confirm with a probe.'
    },
    cocci: {
      name: '<i>Coccidioides immitis</i>', type: 'Dimorphic fungus',
      growth: { rate: 'rapid', text: 'for a dimorphic: colonies in about 3–5 days' },
      colony: 'White, moist at first, then cottony/woolly; may turn tan or gray. Reverse cream to tan/brown.',
      micro: '<b>Barrel-shaped arthroconidia</b> that alternate with empty (disjunctor) cells: non-sequential.',
      tissue: '<b>Spherules</b> (20–200 µm) packed with endospores. No yeast form.',
      keys: ['Barrel arthroconidia alternating with empty cells: diagnostic', 'Spherules with endospores in tissue', '<b>Lab hazard:</b> arthroconidia are highly infectious; never open plates on the bench'],
      lookalike: '<i>Malbranchea</i> also makes alternating arthroconidia but is not dimorphic and makes no spherules.'
    },
    histo: {
      name: '<i>Histoplasma capsulatum</i>', type: 'Dimorphic fungus',
      growth: { rate: 'slow', text: 'usually 2–4 weeks, can take up to 8' },
      colony: 'White to buff/tan, cottony to granular. Reverse cream to tan or brownish.',
      micro: 'Large, thick-walled, knobby <b>tuberculate macroconidia</b> (8–15 µm) plus tiny microconidia.',
      tissue: 'Tiny oval yeast (2–4 µm) with <b>narrow-based</b> budding, <b>inside</b> macrophages and monocytes (sometimes seen in WBCs on a blood smear).',
      keys: ['Tuberculate macroconidia in the mould', 'Tiny intracellular yeast in tissue', 'Bat and bird droppings; Ohio & Mississippi river valleys'],
      lookalike: '<i>Talaromyces</i> (divides by fission, no budding) and <i>Leishmania</i> (has a kinetoplast) also sit inside macrophages.'
    },
    paracocci: {
      name: '<i>Paracoccidioides brasiliensis</i>', type: 'Dimorphic fungus',
      growth: { rate: 'slow', text: 'about 2–4 weeks' },
      colony: 'Mould: white to beige, leathery/wrinkled, non-descript. Yeast (37 °C): cream, wrinkled, waxy.',
      micro: 'Non-descript septate hyphae, few conidia: not diagnostic on its own.',
      tissue: 'Large yeast (10–60 µm) with <b>many narrow-based buds</b> around the mother cell: the <b>“mariner’s wheel.”</b>',
      keys: ['Multiple budding = mariner’s wheel', 'Mould form is boring; the yeast form is the ID', 'Central & South America'],
      lookalike: '<i>Histoplasma</i> is much smaller with a single bud; <i>Blastomyces</i> has one broad-based bud.'
    },
    sporo: {
      name: '<i>Sporothrix schenckii</i>', type: 'Dimorphic fungus',
      growth: { rate: 'moderate', text: 'about 3–5 days' },
      colony: 'Starts small, moist and white to cream, then wrinkled/leathery with brown-black pigment, often in <b>rings</b>. Front & back look the same.',
      micro: 'Thin hyphae with small conidia clustered at the tips like <b>rosettes / flowers</b>, plus single conidia along the hyphae.',
      tissue: 'Small, elongated <b>cigar-shaped</b> yeast (2–6 µm).',
      keys: ['Rosette (“flowerette”) conidia', 'Cigar-shaped yeast', 'Traumatic implantation: rose thorns, gardeners'],
      lookalike: 'Colony rings can look like a tapeworm proglottid on a slide deck; under the scope it is the rosettes.'
    },
    talaro: {
      name: '<i>Talaromyces marneffei</i>', type: 'Dimorphic fungus',
      growth: { rate: 'rapid', text: 'colonies within days, unlike the other dimorphics' },
      colony: 'Gray-green to yellow-green, velvety center with a <b>red to wine-red pigment</b> that diffuses into the agar.',
      micro: '<i>Penicillium</i>-like <b>brush</b> (penicillus): branched conidiophores with chains of conidia.',
      tissue: 'Small oval cells (3–5 µm) inside macrophages that divide by <b>fission</b>, leaving a <b>transverse septum</b>. No budding.',
      keys: ['Red diffusible pigment', 'Brush-like conidiophores', 'Fission with a cross wall, not budding'],
      lookalike: '<i>Histoplasma</i> looks similar in tissue but buds.'
    },

    /* ---------------- Intestinal amoebae ---------------- */
    ehist: {
      name: '<i>Entamoeba histolytica</i>', type: 'Intestinal amoeba · pathogen',
      size: 'Troph 12–60 µm (about 20); cyst 10–20 µm (12–15)', specimen: 'Stool O&P (trichrome); tissue or liver abscess aspirate',
      keys: ['One nucleus: fine, even peripheral chromatin and a small <b>central karyosome</b>', '<b>Ingested RBCs</b> in the troph = <i>histolytica</i>', 'Cyst: up to <b>4 nuclei</b>, chromatoid bars with <b>smooth, rounded ends</b>', 'Flask-shaped ulcers in tissue'],
      lookalike: '<i>E. dispar</i> looks identical without RBCs; <i>E. hartmanni</i> is the same but smaller.'
    },
    ehart: {
      name: '<i>Entamoeba hartmanni</i>', type: 'Intestinal amoeba · non-pathogen',
      size: 'Troph 5–12 µm (8–10); cyst 5–10 µm (6–8)', specimen: 'Stool O&P',
      keys: ['Same nucleus as <i>E. histolytica</i>, just <b>smaller</b>', 'No ingested RBCs', '<b>Measure it:</b> size is the only reliable split'],
      lookalike: '<i>E. histolytica</i>.'
    },
    ecoli: {
      name: '<i>Entamoeba coli</i>', type: 'Intestinal amoeba · non-pathogen',
      size: 'Troph 15–50 µm; cyst 10–35 µm (largest)', specimen: 'Stool O&P',
      keys: ['Coarse, irregular peripheral chromatin; large <b>eccentric</b> karyosome', '“Dirty” cytoplasm full of vacuoles and debris', 'Cyst: <b>5+ nuclei</b> (up to 8), visible on 10×; rare splinter-like chromatoid bars'],
      lookalike: '<i>E. histolytica</i> (central karyosome, max 4 nuclei).'
    },
    enana: {
      name: '<i>Endolimax nana</i>', type: 'Intestinal amoeba · non-pathogen',
      size: 'Troph 6–12 µm; cyst 5–10 µm', specimen: 'Stool O&P',
      keys: ['Large, dense karyosome, thin membrane: <b>“ball & socket”</b>', 'No peripheral chromatin', 'Cyst: up to 4 dot-like nuclei: <b>“potato with eyes”</b>'],
      lookalike: '<i>Iodamoeba</i> (heavier karyosome, glycogen vacuole in the cyst).'
    },
    iodam: {
      name: '<i>Iodamoeba bütschlii</i>', type: 'Intestinal amoeba · non-pathogen',
      size: 'Troph 8–20 µm; cyst 5–20 µm', specimen: 'Stool O&P',
      keys: ['Large karyosome, heavier than <i>E. nana</i>; “dirty” cytoplasm', 'Cyst: <b>one nucleus</b> + big <b>glycogen vacuole</b>', 'Iodine stains the vacuole brown'],
      lookalike: '<i>Endolimax nana</i>.'
    },
    blastocystis: {
      name: '<i>Blastocystis</i>', type: 'Intestinal protist · pathogenicity debated',
      size: 'Very variable, about 6–40 µm', specimen: 'Stool O&P (trichrome, wet prep)',
      keys: ['<b>Vacuolated form</b>: big central body', 'Small nuclei pushed to the <b>rim</b>', 'Report and quantify when seen'],
      lookalike: 'RBCs, yeast, or <i>Cryptosporidium</i> on acid-fast: look for the rim nuclei.'
    },

    /* ---------------- Flagellates & ciliate ---------------- */
    giardia: {
      name: '<i>Giardia duodenalis</i> (<i>lamblia</i>)', type: 'Intestinal flagellate · pathogen',
      size: 'Troph 10–20 µm; cyst 11–14 µm', specimen: 'Stool O&P, antigen or DFA; duodenal aspirate',
      keys: ['Troph: pear/teardrop, 2 nuclei: <b>“old man face,”</b> 8 flagella, sucking disc', '“Falling leaf” motility', 'Cyst: oval, up to 4 nuclei, axonemes and median bodies; refractile wall'],
      lookalike: '<i>Chilomastix</i> (one nucleus, lemon-shaped cyst).'
    },
    dienta: {
      name: '<i>Dientamoeba fragilis</i>', type: 'Intestinal flagellate (no visible flagella)',
      size: 'Troph 5–15 µm; no cyst stage seen', specimen: 'Stool O&P (permanent stain)',
      keys: ['Usually <b>binucleate</b>', 'Karyosome <b>fragmented</b> into granules, no peripheral chromatin', 'Looks like an amoeba but is a flagellate'],
      lookalike: '<i>Endolimax nana</i> (one solid karyosome).'
    },
    chilo: {
      name: '<i>Chilomastix mesnili</i>', type: 'Intestinal flagellate · non-pathogen',
      size: 'Troph 6–24 µm; cyst 6–10 µm', specimen: 'Stool O&P',
      keys: ['Troph: teardrop with a cytostome and a single anterior nucleus', 'Cyst: <b>lemon-shaped</b> with a knob', 'Cyst looks like a “cyclops smiley face”'],
      lookalike: '<i>Giardia</i> (2 nuclei).'
    },
    trichomonas: {
      name: '<i>Trichomonas vaginalis</i>', type: 'Urogenital flagellate · pathogen',
      size: '7–30 µm; troph only, no cyst', specimen: 'Vaginal/urethral swab, urine, wet prep (read fast), NAAT',
      keys: ['Pear shape, <b>4 anterior flagella</b>', 'Undulating membrane about half the body', 'Jerky, “dancing” motility on wet prep'],
      lookalike: 'WBCs when it stops moving.'
    },
    balant: {
      name: '<i>Balantidium coli</i>', type: 'Intestinal ciliate · pathogen',
      size: 'Troph 50–100 µm; cyst 50–70 µm', specimen: 'Stool O&P (wet mount)',
      keys: ['Only ciliate: <b>cilia</b> around the edge', 'Bean-shaped <b>macronucleus</b>; cytostome', 'Cyst: round, thick wall, no cilia', 'Largest intestinal protozoan; pigs'],
      lookalike: 'Helminth eggs at low power: check for cilia and the macronucleus.'
    },

    /* ---------------- Coccidia & spore-formers ---------------- */
    cystiso: {
      name: '<i>Cystoisospora belli</i>', type: 'Intestinal coccidian',
      size: 'Oocyst about 20–33 × 10–19 µm', specimen: 'Stool (wet mount, modified acid-fast)',
      keys: ['<b>Elongated oval</b> oocyst', 'Immature: 1 sporoblast; mature: 2 sporocysts × 4 sporozoites', 'Modified acid-fast <b>positive</b> (pink-red)'],
      lookalike: '<i>Toxoplasma</i> oocyst (smaller, rounder).'
    },
    crypto: {
      name: '<i>Cryptosporidium</i>', type: 'Intestinal coccidian',
      size: 'Oocyst 4–6 µm', specimen: 'Stool: modified acid-fast, antigen or DFA',
      keys: ['Tiny round oocysts', '<b>Modified acid-fast:</b> pink-red on blue-green', 'Nearly invisible on a plain wet mount'],
      lookalike: '<i>Cyclospora</i> (8–10 µm, variable staining); yeast.'
    },
    cyclo: {
      name: '<i>Cyclospora cayetanensis</i>', type: 'Intestinal coccidian',
      size: 'Oocyst 8–10 µm', specimen: 'Stool: modified acid-fast, UV',
      keys: ['About <b>twice the size</b> of Crypto', 'Acid-fast <b>variable</b>: pink to pale “ghosts”', 'Autofluoresces under UV'],
      lookalike: '<i>Cryptosporidium</i>.'
    },
    sarco: {
      name: '<i>Sarcocystis</i>', type: 'Coccidian (intestinal & muscle)',
      size: 'Sporocysts about 9–16 µm', specimen: 'Stool (sporocysts); muscle tissue (cysts)',
      keys: ['Already-sporulated <b>sporocysts</b> in stool', 'Sarcocysts in muscle on histology', 'Undercooked beef or pork'],
      lookalike: '<i>Cystoisospora</i> sporocysts.'
    },
    microsp: {
      name: 'Microsporidia', type: 'Spore-former (now classed with fungi)',
      size: 'Spores 1–4 µm (about 1.5–2)', specimen: 'Stool, urine: modified trichrome',
      keys: ['Tiny <b>pinkish ovals</b> on modified trichrome', 'May show a belt-like stripe', 'Mostly in immunocompromised patients'],
      lookalike: 'Yeast and bacteria.'
    },
    toxo: {
      name: '<i>Toxoplasma gondii</i>', type: 'Tissue coccidian',
      size: 'Tachyzoite 4–8 µm; oocyst about 11 × 13 µm', specimen: 'Serology and PCR; tissue, body fluids; oocysts only in cat feces',
      keys: ['<b>Tachyzoites:</b> crescent/banana-shaped (active infection)', '<b>Bradyzoites</b> packed in tissue cysts (chronic)', 'Oocyst: 2 sporocysts; cats are the definitive host'],
      lookalike: 'Small <i>Cystoisospora</i> (oocyst); <i>Leishmania</i> (has a kinetoplast).'
    },

    /* ---------------- Malaria & Babesia ---------------- */
    pfal: {
      name: '<i>Plasmodium falciparum</i>', type: 'Blood protozoan · malaria',
      size: 'RBC <b>normal size</b>', specimen: 'Thick & thin Giemsa smears, repeat every 6–8 h; rapid antigen',
      keys: ['Delicate rings, often <b>several per RBC</b>; appliqué forms, double dots', '<b>Banana / crescent gametocytes</b>', 'Usually only rings and gametocytes in the blood'],
      lookalike: '<i>Babesia</i> (tetrads, no pigment, no gametocytes).'
    },
    pviv: {
      name: '<i>Plasmodium vivax</i>', type: 'Blood protozoan · malaria',
      size: 'RBC <b>enlarged</b>, pale', specimen: 'Thick & thin Giemsa smears',
      keys: ['<b>Schüffner’s dots</b>', '<b>Amoeboid</b> trophozoite', 'Schizont: 12–24 merozoites; round gametocyte fills the cell', 'Hypnozoites: relapses'],
      lookalike: '<i>P. ovale</i> (oval cells, fewer merozoites).'
    },
    pmal: {
      name: '<i>Plasmodium malariae</i>', type: 'Blood protozoan · malaria',
      size: 'RBC <b>normal or small</b>', specimen: 'Thick & thin Giemsa smears',
      keys: ['<b>Band</b> trophozoite across the cell', '“Bird’s-eye” ring', 'Schizont: 6–12 merozoites in a <b>rosette</b> around pigment', 'Coarse, heavy pigment; no stippling'],
      lookalike: '<i>P. falciparum</i> rings (also in normal-size cells).'
    },
    pova: {
      name: '<i>Plasmodium ovale</i>', type: 'Blood protozoan · malaria',
      size: 'RBC enlarged and <b>oval</b>, often fringed', specimen: 'Thick & thin Giemsa smears',
      keys: ['Oval, egg-shaped RBC with ragged edges', 'Compact (“comet”) trophozoite', 'Schizont: 6–12 merozoites; Schüffner’s dots'],
      lookalike: '<i>P. vivax</i>.'
    },
    babesia: {
      name: '<i>Babesia</i> (<i>microti</i>)', type: 'Blood protozoan',
      size: 'Small rings, 1–5 µm', specimen: 'Thin Giemsa smear',
      keys: ['<b>Maltese cross / tetrad</b> = diagnostic', 'Multiple small rings per RBC', '<b>No pigment, no gametocytes, no schizonts</b>', '<i>Ixodes</i> tick; asplenic patients'],
      lookalike: '<i>P. falciparum</i> rings.'
    },

    /* ---------------- Blood & tissue protozoa ---------------- */
    tbrucei: {
      name: '<i>Trypanosoma brucei</i>', type: 'Hemoflagellate · sleeping sickness',
      size: 'Trypomastigote about 15–20 µm', specimen: 'Blood, chancre fluid, lymph node aspirate, CSF',
      keys: ['Slender, curvy “S” shape', '<b>Tiny</b> posterior kinetoplast', 'Obvious undulating membrane', 'Tsetse fly; Africa'],
      lookalike: '<i>T. cruzi</i> (big kinetoplast, C shape).'
    },
    tcruzi: {
      name: '<i>Trypanosoma cruzi</i>', type: 'Hemoflagellate · Chagas disease',
      size: 'Trypomastigote about 15–20 µm; amastigote 2–6 µm', specimen: 'Blood (acute); tissue; serology/PCR (chronic)',
      keys: ['<b>C or U</b> shape', '<b>Large</b>, bulging posterior kinetoplast', 'Amastigotes in heart muscle (pseudocysts)', 'Kissing bug; the Americas'],
      lookalike: '<i>T. brucei</i>; <i>Leishmania</i> amastigotes.'
    },
    leish: {
      name: '<i>Leishmania</i>', type: 'Hemoflagellate (tissue)',
      size: 'Amastigote 2–5 µm', specimen: 'Bone marrow/spleen aspirate; skin scraping or biopsy',
      keys: ['<b>L-D bodies:</b> small ovals inside macrophages', '“Two dots”: nucleus + <b>rod-shaped kinetoplast</b>', 'Normally not in peripheral blood', 'Sandfly'],
      lookalike: '<i>Histoplasma</i> (no kinetoplast); <i>Toxoplasma</i>.'
    },
    naeg: {
      name: '<i>Naegleria fowleri</i>', type: 'Free-living amoeba',
      size: 'Troph 8–15 µm', specimen: 'CSF (wet mount for motility, stained smear)',
      keys: ['Large <b>central karyosome</b>, no peripheral chromatin', 'Amoebae among WBCs in CSF', 'Primary amebic meningoencephalitis (PAM); warm fresh water'],
      lookalike: 'Macrophages/WBCs in CSF.'
    },
    acanth: {
      name: '<i>Acanthamoeba</i>', type: 'Free-living amoeba',
      size: 'Troph 15–45 µm; cyst 10–25 µm', specimen: 'Corneal scraping, contact lens solution; CSF/tissue',
      keys: ['Spiky <b>acanthopodia</b>', '<b>Double-walled</b>, wrinkled cyst', 'Keratitis in contact lens wearers'],
      lookalike: '<i>Naegleria</i> (no spikes, no cysts in tissue).'
    },

    /* ---------------- Intestinal nematodes ---------------- */
    ascaris: {
      name: '<i>Ascaris lumbricoides</i>', type: 'Nematode (roundworm)',
      size: 'Fertile egg about 65 × 45 µm; infertile about 90 × 40 µm', specimen: 'Stool O&P',
      keys: ['Fertile: round-oval, thick <b>bumpy (mammillated)</b> coat', 'Infertile: longer, narrower, disorganized granules', 'Coat may be missing (decorticated)'],
      lookalike: '<i>Baylisascaris</i> eggs; infertile eggs vs debris.'
    },
    trichuris: {
      name: '<i>Trichuris trichiura</i>', type: 'Nematode (whipworm)',
      size: 'Egg about 54 × 22 µm', specimen: 'Stool O&P',
      keys: ['<b>Barrel / football</b> shape', 'Clear <b>polar plug</b> at each end', 'Yellow-brown, unembryonated'],
      lookalike: '<i>Capillaria</i> (straighter sides, flatter plugs).'
    },
    hookworm: {
      name: 'Hookworm (<i>Necator</i> / <i>Ancylostoma</i>)', type: 'Nematode',
      size: 'Egg about 60 × 40 µm', specimen: 'Stool O&P',
      keys: ['Thin, smooth, clear shell with a <b>clear space</b> around the dividing embryo', 'Rhabditiform larva: <b>long</b> buccal cavity, small genital primordium', 'Adults: <i>Ancylostoma</i> has <b>teeth</b>, <i>Necator</i> has <b>cutting plates</b>; male bursa', 'Species can’t be told apart by egg'],
      lookalike: '<i>Trichostrongylus</i> egg (bigger, pointier); <i>Strongyloides</i> larva.'
    },
    tricho: {
      name: '<i>Trichostrongylus</i>', type: 'Nematode',
      size: 'Egg about 78–98 × 40–50 µm', specimen: 'Stool O&P',
      keys: ['Like a hookworm egg but <b>larger</b> and longer', 'Slightly <b>pointed</b> ends', 'More segmented embryo'],
      lookalike: 'Hookworm egg.'
    },
    enterob: {
      name: '<i>Enterobius vermicularis</i>', type: 'Nematode (pinworm)',
      size: 'Egg about 55 × 25 µm', specimen: '<b>Cellophane tape prep</b>, perianal, first thing in the morning',
      keys: ['<b>Flattened on one side</b> (deflated football / pumpkin seed)', 'Thin, clear shell', 'Larva often visible inside'],
      lookalike: 'Rarely in stool; think tape prep.'
    },
    strongy: {
      name: '<i>Strongyloides stercoralis</i>', type: 'Nematode',
      size: 'Larvae (not eggs) in stool', specimen: 'Stool (larvae), agar plate culture, Baermann',
      keys: ['Rhabditiform: <b>short</b> buccal cavity, <b>large</b> genital primordium (“short & sexy”)', 'Filariform: <b>notched tail</b>, long esophagus with no bulb', 'Autoinfection; hyperinfection if immunosuppressed'],
      lookalike: 'Hookworm larvae (long buccal cavity, pointed tail).'
    },
    capill: {
      name: '<i>Capillaria philippinensis</i>', type: 'Nematode',
      size: 'Egg about 35–45 × 20–25 µm', specimen: 'Stool O&P',
      keys: ['Peanut / squarer shape', 'Flatter, less prominent polar plugs', 'Striated shell'],
      lookalike: '<i>Trichuris</i>.'
    },
    baylis: {
      name: '<i>Baylisascaris procyonis</i>', type: 'Nematode (raccoon roundworm)',
      size: 'Egg about 63–88 µm', specimen: 'Raccoon feces (eggs); human diagnosis is clinical / serology',
      keys: ['<i>Ascaris</i>-like egg with a thick, finely <b>pitted</b> shell', 'Larva migrans in humans, so no eggs in human stool', 'Raccoon latrines'],
      lookalike: '<i>Ascaris</i> fertile egg.'
    },

    /* ---------------- Filariae & tissue nematodes ---------------- */
    wb: {
      name: '<i>Wuchereria bancrofti</i>', type: 'Filarial nematode',
      size: 'Microfilaria about 240–300 µm', specimen: 'Blood, drawn at <b>night</b>',
      keys: ['<b>Sheathed</b>', 'Tail tip <b>without nuclei</b> (W = without)', 'Short head space; smooth curves', 'Lymphatic filariasis / elephantiasis'],
      lookalike: '<i>Brugia</i> (pink sheath, 2 tail nuclei); <i>Loa loa</i> (nuclei to the tip).'
    },
    brugia: {
      name: '<i>Brugia malayi</i>', type: 'Filarial nematode',
      size: 'Microfilaria about 175–230 µm', specimen: 'Blood, drawn at night',
      keys: ['Sheath stains <b>pink</b> with Giemsa', '<b>Terminal + subterminal</b> tail nuclei with a gap', 'Long head space; kinky body'],
      lookalike: '<i>Wuchereria</i>.'
    },
    loa: {
      name: '<i>Loa loa</i>', type: 'Filarial nematode (African eye worm)',
      size: 'Microfilaria about 230–250 µm', specimen: 'Blood, drawn during the <b>day</b>',
      keys: ['Sheathed, but the sheath stains faintly', 'Nuclei run <b>all the way to the tail tip</b> (“flow-a flow-a”)', 'Adult may cross the eye under the conjunctiva'],
      lookalike: '<i>Mansonella perstans</i> (no sheath, small).'
    },
    oncho: {
      name: '<i>Onchocerca volvulus</i>', type: 'Filarial nematode (river blindness)',
      size: 'Microfilaria about 150–350 µm', specimen: '<b>Skin snips</b>, not blood',
      keys: ['<b>Not sheathed</b>', 'Tapered, bent/flexed tail with no nuclei', 'Long head space; nodules hold the adults', 'Blackfly'],
      lookalike: '<i>Mansonella</i> (also unsheathed, but in blood).'
    },
    mansonella: {
      name: '<i>Mansonella perstans</i>', type: 'Filarial nematode',
      size: 'Microfilaria about 100–200 µm', specimen: 'Blood',
      keys: ['<b>No sheath</b>; very skinny', '<b>Blunt</b> tail with nuclei to the end'],
      lookalike: '<i>Onchocerca</i> (skin, not blood); <i>Loa loa</i>.'
    },
    trichin: {
      name: '<i>Trichinella spiralis</i>', type: 'Tissue nematode',
      size: 'Larva about 1 mm, coiled', specimen: 'Muscle biopsy; serology',
      keys: ['<b>Coiled larva</b> encysted in striated muscle (“nurse cell”)', 'Digesting the muscle frees more larvae', 'Undercooked pork or bear; eosinophilia'],
      lookalike: 'Sarcocysts in muscle (no coiled larva).'
    },
    dracun: {
      name: '<i>Dracunculus medinensis</i>', type: 'Tissue nematode (guinea worm)',
      size: 'Adult female up to about 1 m', specimen: 'Clinical: worm emerging from a skin blister',
      keys: ['Worm slowly <b>wound out onto a stick</b>', 'Drinking water with infected copepods', 'Nearly eradicated'],
      lookalike: ''
    },

    /* ---------------- Flukes (trematodes) ---------------- */
    clonorch: {
      name: '<i>Clonorchis sinensis</i>', type: 'Trematode (Chinese liver fluke)',
      size: 'Egg about 30 × 15 µm (smallest)', specimen: 'Stool, duodenal aspirate',
      keys: ['<b>Smallest</b> helminth egg', '<b>Shouldered operculum</b> + small knob at the other end', 'Raw freshwater fish; Asia'],
      lookalike: 'Easy to miss at low power because it is so small.'
    },
    smansoni: {
      name: '<i>Schistosoma mansoni</i>', type: 'Trematode (blood fluke)',
      size: 'Egg about 116–180 × 45–70 µm', specimen: 'Stool; rectal biopsy',
      keys: ['Large egg with a <b>lateral spine</b>', 'No operculum; thin, smooth shell', 'Lives in intestinal / portal veins'],
      lookalike: '<i>S. haematobium</i> (terminal spine, urine).'
    },
    sjapon: {
      name: '<i>Schistosoma japonicum</i>', type: 'Trematode (blood fluke)',
      size: 'Egg about 75–90 × 60–68 µm', specimen: 'Stool',
      keys: ['Rounder egg', 'Tiny, <b>rudimentary lateral knob</b> (easy to miss)', 'China, Indonesia, Philippines'],
      lookalike: '<i>S. mansoni</i>.'
    },
    shaem: {
      name: '<i>Schistosoma haematobium</i>', type: 'Trematode (bladder fluke)',
      size: 'Egg about 112–180 × 40–70 µm', specimen: '<b>Urine</b> (midday collection)',
      keys: ['Prominent <b>terminal spine</b>', 'Usually found in urine', 'Bladder; linked to bladder cancer'],
      lookalike: '<i>S. mansoni</i> (lateral spine, stool).'
    },
    fascegg: {
      name: '<i>Fasciola hepatica</i> / <i>Fasciolopsis buski</i> egg', type: 'Trematode egg (the two look identical)',
      size: 'Egg about 150 × 80 µm (huge)', specimen: 'Stool',
      keys: ['Very large, yellow-brown, ovoid', 'Thin shell, <b>indistinct operculum</b>', 'Unembryonated: contents fill out to the shell', 'You need the adult to tell them apart'],
      lookalike: '<i>Paragonimus</i> (smaller, thicker shell, shouldered operculum).'
    },
    fasciola: {
      name: '<i>Fasciola hepatica</i> (adult)', type: 'Trematode (sheep liver fluke)',
      size: 'Adult about 2–3 cm', specimen: 'Adult worm (eggs in stool)',
      keys: ['Shorter, with a prominent <b>cephalic cone</b> (shoulders)', 'Darker outer border', 'Watercress; bile ducts'],
      lookalike: '<i>Fasciolopsis</i> adult.'
    },
    fasciolopsis: {
      name: '<i>Fasciolopsis buski</i> (adult)', type: 'Trematode (giant intestinal fluke)',
      size: 'Adult about 2–7.5 cm', specimen: 'Adult worm (eggs in stool)',
      keys: ['Long and pale (“lop” = long)', '<b>No cephalic cone</b>', 'Water chestnuts; small intestine'],
      lookalike: '<i>Fasciola</i> adult.'
    },
    paragon: {
      name: '<i>Paragonimus</i>', type: 'Trematode (lung fluke)',
      size: 'Egg about 80–120 × 45–70 µm', specimen: '<b>Sputum</b> (or stool if swallowed)',
      keys: ['Dark yellow-brown, <b>thick</b> shell', 'Prominent <b>shouldered operculum</b>', 'Thickened opposite end', 'Undercooked crab or crayfish; looks like TB'],
      lookalike: '<i>Fasciola</i> egg (bigger); <i>D. latus</i> egg (smaller, in stool).'
    },
    cercaria: {
      name: 'Schistosome cercaria', type: 'Trematode larva',
      size: 'Microscopic, forked tail', specimen: 'Water with snails',
      keys: ['<b>Forked tail</b>', 'Bird schistosomes cause <b>swimmer’s itch</b>', 'Human schistosomes enter through the skin this way too'],
      lookalike: ''
    },

    /* ---------------- Tapeworms (cestodes) ---------------- */
    dlatus: {
      name: '<i>Dibothriocephalus</i> (<i>Diphyllobothrium</i>) <i>latus</i>', type: 'Cestode (fish tapeworm)',
      size: 'Egg about 55–75 µm', specimen: 'Stool',
      keys: ['Oval egg, indistinct <b>non-shouldered</b> operculum', 'Small <b>knob</b> at the far end', 'Raw fish; vitamin B12 deficiency'],
      lookalike: '<i>Paragonimus</i> (bigger, shouldered, in sputum).'
    },
    taenia: {
      name: '<i>Taenia</i> sp. (egg)', type: 'Cestode egg',
      size: 'Egg about 30–45 µm', specimen: 'Stool',
      keys: ['Thick, <b>radially striated</b> shell', 'Oncosphere with <b>6 hooks</b>', 'Can’t tell <i>T. solium</i> from <i>T. saginata</i> by egg'],
      lookalike: 'Single <i>Dipylidium</i> eggs.'
    },
    tsolium: {
      name: '<i>Taenia solium</i>', type: 'Cestode (pork tapeworm)',
      size: 'Proglottid with <b>7–13</b> uterine branches', specimen: 'Proglottids or scolex; tissue for cysticerci',
      keys: ['Scolex has a <b>crown of hooks</b> (“royal pig”)', '7–13 uterine branches per side', 'Eating its <b>eggs</b> causes cysticercosis (brain cysts)'],
      lookalike: '<i>T. saginata</i>.'
    },
    tsaginata: {
      name: '<i>Taenia saginata</i>', type: 'Cestode (beef tapeworm)',
      size: 'Proglottid with <b>15–30</b> uterine branches', specimen: 'Proglottids or scolex',
      keys: ['Scolex has <b>no hooks</b> (“common cow”)', '15–30 uterine branches per side', 'Undercooked beef'],
      lookalike: '<i>T. solium</i>.'
    },
    tmult: {
      name: '<i>Taenia multiceps</i> (coenurus)', type: 'Cestode larva',
      size: 'Bladder cyst', specimen: 'Tissue / surgical specimen',
      keys: ['One fluid-filled bladder', '<b>Many scolices</b> in clusters', 'Causes coenurosis'],
      lookalike: 'Cysticercus (one scolex); hydatid cyst (daughter cysts, hydatid sand).'
    },
    hnana: {
      name: '<i>Hymenolepis nana</i>', type: 'Cestode (dwarf tapeworm)',
      size: 'Egg about 30–47 µm', specimen: 'Stool',
      keys: ['<b>Polar filaments</b> between the membranes (“nana has curtains”)', 'Oncosphere with 6 hooks', 'More oval than round'],
      lookalike: '<i>H. diminuta</i> (bigger, no filaments).'
    },
    hdim: {
      name: '<i>Hymenolepis diminuta</i>', type: 'Cestode (rat tapeworm)',
      size: 'Egg about 80–85 µm', specimen: 'Stool',
      keys: ['Bigger and <b>rounder</b>', '<b>No polar filaments</b>', 'Thick, striated shell; big empty space around the oncosphere'],
      lookalike: '<i>H. nana</i>.'
    },
    dipyl: {
      name: '<i>Dipylidium caninum</i>', type: 'Cestode (dog tapeworm)',
      size: 'Egg 35–40 µm, in packets of 5–15', specimen: 'Stool; proglottids',
      keys: ['<b>Egg packets</b>', 'Proglottid with a double genital pore', 'Fleas; usually kids'],
      lookalike: '<i>Taenia</i> egg (single eggs look alike).'
    },
    echino: {
      name: '<i>Echinococcus granulosus</i>', type: 'Cestode (hydatid tapeworm)',
      size: 'Adult only a few mm (about 3 segments)', specimen: 'Cyst fluid / surgical specimen (humans); adult from dogs',
      keys: ['Tiny adult: scolex + about 3 segments', '<b>Hydatid sand:</b> loose protoscolices with hooklets', 'Hydatid cyst with brood capsules / <b>daughter cysts</b>; liver & lung'],
      lookalike: 'Coenurus (many scolices on one bladder, no daughter cysts).'
    }
  };

  /* ["picture", "organism key", "what this picture shows"] */
  var M = 'cards/myc/', P = 'cards/p1/', H = 'cards/hel/';
  var VID_DECKS = [
    { code: 'VID-P1', title: 'Intestinal amoebae', cap: 'lavender', group: 'Visual ID · Parasites', cards: [
      ['s018_1.jpg', 'ehist', 'Trophozoite with ingested RBCs · trichrome'],
      ['s018_0.jpg', 'ehist', 'Trophozoite · trichrome'],
      ['s019_0.jpg', 'ehist', 'Trophozoites · trichrome'],
      [P + 'p1_52.jpg', 'ehist', 'Trophozoite · stained smear'],
      [P + 'p1_53.jpg', 'ehist', 'Trophozoite with ingested RBCs'],
      [P + 'p1_54.jpg', 'ehist', 'Trophozoite'],
      ['s020_0.jpg', 'ehist', 'Cyst · iodine wet mount'],
      ['s020_1.jpg', 'ehist', 'Cyst with a chromatoid bar · trichrome'],
      ['s021_0.jpg', 'ehist', 'Immature cysts (1–2 nuclei) · trichrome'],
      ['s021_1.jpg', 'ehist', 'Mature cyst (4 nuclei) · trichrome'],
      [P + 'p1_55.jpg', 'ehist', 'Cyst · trichrome and iodine'],
      ['s015_0.jpg', 'ehist', 'Tissue: ulcers and trophozoites with RBCs'],
      ['s023_0.jpg', 'ehart', 'Trophozoite (9 µm) · trichrome'],
      ['s023_1.jpg', 'ehart', 'Trophozoite · iron hematoxylin'],
      [P + 'p1_56.jpg', 'ehart', 'Trophozoite (5–12 µm)'],
      ['s024_0.jpg', 'ehart', 'Cyst (7 µm) · iodine wet mount'],
      [P + 'p1_57.jpg', 'ehart', 'Cyst (5–10 µm)'],
      ['s027_0.jpg', 'ecoli', 'Trophozoite · trichrome'],
      [P + 'p1_59.jpg', 'ecoli', 'Trophozoite, arrows on the nucleus'],
      [P + 'p1_61.jpg', 'ecoli', 'Trophozoite (50 µm)'],
      ['s028_0.jpg', 'ecoli', 'Cyst · iodine wet mount'],
      [P + 'p1_58.jpg', 'ecoli', 'Cyst with many nuclei'],
      [P + 'p1_60.jpg', 'ecoli', 'Cyst with a chromatoid bar'],
      ['s034_0.jpg', 'enana', 'Trophozoite · trichrome'],
      [P + 'p1_62.jpg', 'enana', 'Trophozoite, arrow on the karyosome'],
      ['s034_1.jpg', 'enana', 'Cyst · iodine wet mount'],
      ['s034_2.jpg', 'enana', 'Cyst · trichrome'],
      [P + 'p1_63.jpg', 'enana', 'Cysts · iodine and trichrome'],
      ['s037_0.jpg', 'iodam', 'Trophozoite · trichrome'],
      ['s037_1.jpg', 'iodam', 'Trophozoite · iron hematoxylin'],
      [P + 'p1_64.jpg', 'iodam', 'Trophozoite'],
      [P + 'p1_67.jpg', 'iodam', 'Trophozoite'],
      ['s038_1.jpg', 'iodam', 'Cyst · iodine (brown glycogen vacuole)'],
      ['s038_0.jpg', 'iodam', 'Cyst · trichrome'],
      [P + 'p1_65.jpg', 'iodam', 'Cyst with a large vacuole'],
      [P + 'p1_66.jpg', 'iodam', 'Cyst'],
      ['s045_0.jpg', 'blastocystis', 'Vacuolated form · trichrome'],
      ['s045_1.jpg', 'blastocystis', 'Vacuolated forms · modified acid-fast'],
      ['s045_2.jpg', 'blastocystis', 'Vacuolated form · FE concentrate wet prep']
    ] },
    { code: 'VID-P2', title: 'Flagellates & ciliate', cap: 'green', group: 'Visual ID · Parasites', cards: [
      ['s057_0.jpg', 'giardia', 'Trophozoite, structures labeled'],
      ['s058_0.jpg', 'giardia', 'Trophozoite · trichrome'],
      ['s059_0.jpg', 'giardia', 'Trophozoite sucking disc · electron micrograph'],
      ['s060_1.jpg', 'giardia', 'Cysts · iron hematoxylin'],
      ['s060_0.jpg', 'giardia', 'Cyst'],
      ['s054_0.jpg', 'dienta', 'Trophozoite · trichrome'],
      ['s054_2.jpg', 'dienta', 'Trophozoite · iron hematoxylin'],
      ['s054_1.jpg', 'dienta', 'Binucleate trophozoite · trichrome'],
      ['s067_1.jpg', 'chilo', 'Trophozoite · trichrome'],
      ['s067_4.jpg', 'chilo', 'Cyst · iodine wet mount'],
      ['s067_2.jpg', 'chilo', 'Cyst · trichrome'],
      ['s063_0.jpg', 'trichomonas', 'Trophozoites from urine sediment · Giemsa-type stain'],
      ['s063_1f.jpg', 'trichomonas', 'Live wet prep (still frame)'],
      [P + 'p1_70.jpg', 'trichomonas', 'Wet mount, arrows on flagella'],
      [P + 'p1_71.jpg', 'trichomonas', 'Stained trophozoites'],
      ['s074_0.jpg', 'balant', 'Trophozoite · unstained wet mount'],
      ['s074_1.png', 'balant', 'Trophozoite (red macronucleus) · iodine'],
      ['s076_0.jpg', 'balant', 'Cyst · unstained wet mount'],
      ['s076_1.jpg', 'balant', 'Cyst · stained']
    ] },
    { code: 'VID-P3', title: 'Coccidia & spore-formers', cap: 'red', group: 'Visual ID · Parasites', cards: [
      ['s081_0.jpg', 'cystiso', 'Immature oocyst · wet mount'],
      ['s081_1.jpg', 'cystiso', 'Mature oocyst · wet mount'],
      ['s082_1.jpg', 'cystiso', 'Oocyst · modified acid-fast'],
      ['s082_2.jpg', 'cystiso', 'Oocysts · modified acid-fast'],
      ['s085_0.jpg', 'crypto', 'Oocysts · wet mount (DIC)'],
      ['s086_2.jpg', 'crypto', 'Oocysts · modified acid-fast'],
      ['s086_0.jpg', 'crypto', 'Oocysts · modified acid-fast'],
      ['s093_0.jpg', 'cyclo', 'Oocyst · unstained wet mount'],
      ['s094_0.png', 'cyclo', 'Oocysts · A: modified acid-fast, B: wet mount'],
      ['s099_1.png', 'sarco', 'Sporocysts in stool (B) and under UV (C)'],
      ['s099_0.png', 'sarco', 'Cysts in muscle tissue'],
      ['s101_0.jpg', 'microsp', 'Spores · modified trichrome'],
      ['e4_toxo_oocyst.jpg', 'toxo', 'Sporulated oocyst from cat feces']
    ] },
    { code: 'VID-P4', title: 'Malaria & Babesia', cap: 'red', group: 'Visual ID · Parasites', cards: [
      ['e4_fal_rings.jpg', 'pfal', 'Ring forms · thin smear'],
      ['e4_ring_fal.jpg', 'pfal', 'Two rings in one cell'],
      [P + 'p1_74.jpg', 'pfal', 'Ring forms'],
      ['e4_fal_banana.jpg', 'pfal', 'Gametocytes'],
      ['e4_gam_fal.jpg', 'pfal', 'Gametocyte'],
      [P + 'p1_75.jpg', 'pfal', 'Gametocyte'],
      ['e4_ring_viv.jpg', 'pviv', 'Ring form'],
      [P + 'p1_80.jpg', 'pviv', 'Ring form'],
      ['e4_troph_viv.jpg', 'pviv', 'Trophozoite'],
      [P + 'p1_81.jpg', 'pviv', 'Trophozoite'],
      ['e4_sch_viv.jpg', 'pviv', 'Schizont'],
      [P + 'p1_82.jpg', 'pviv', 'Schizont'],
      ['e4_gam_viv.jpg', 'pviv', 'Gametocyte'],
      [P + 'p1_83.jpg', 'pviv', 'Gametocyte'],
      ['e4_viv_combo.jpg', 'pviv', 'Schizont and gametocyte, one patient'],
      ['e4_ring_mal.jpg', 'pmal', 'Ring form'],
      [P + 'p1_76.jpg', 'pmal', 'Ring form'],
      ['e4_troph_mal.jpg', 'pmal', 'Trophozoite'],
      [P + 'p1_77.jpg', 'pmal', 'Trophozoite'],
      ['e4_sch_mal.jpg', 'pmal', 'Schizont'],
      [P + 'p1_78.jpg', 'pmal', 'Schizont'],
      ['e4_gam_mal.jpg', 'pmal', 'Gametocyte'],
      [P + 'p1_79.jpg', 'pmal', 'Gametocyte'],
      ['e4_ring_ova.jpg', 'pova', 'Young trophozoite'],
      ['e4_troph_ova.jpg', 'pova', 'Trophozoite'],
      ['e4_sch_ova.jpg', 'pova', 'Schizont'],
      ['e4_gam_ova.jpg', 'pova', 'Gametocyte'],
      ['e4_bab_tetrad.jpg', 'babesia', 'Rings and a tetrad'],
      ['e4_bab_field.jpg', 'babesia', 'Rings and a tetrad'],
      [P + 'p1_72.jpg', 'babesia', 'Tetrad (arrow)'],
      [P + 'p1_73.jpg', 'babesia', 'Small rings']
    ] },
    { code: 'VID-P5', title: 'Blood & tissue protozoa', cap: 'lavender', group: 'Visual ID · Parasites', cards: [
      ['e4_brucei1.jpg', 'tbrucei', 'Trypomastigotes · blood smear'],
      ['e4_brucei2.jpg', 'tbrucei', 'Trypomastigote'],
      [P + 'p1b_06.jpg', 'tbrucei', 'Trypomastigote, arrow on the kinetoplast'],
      [P + 'p1b_07.jpg', 'tbrucei', 'Trypomastigote · blood smear'],
      ['e4_cruzi1.jpg', 'tcruzi', 'Trypomastigote'],
      ['e4_cruzi2.jpg', 'tcruzi', 'Trypomastigote · blood smear'],
      [P + 'p1b_08.jpg', 'tcruzi', 'Trypomastigote'],
      [P + 'p1b_09.jpg', 'tcruzi', 'Trypomastigote'],
      [P + 'p1b_10.jpg', 'tcruzi', 'Trypomastigote, close-up'],
      ['e4_cruzi_ama.jpg', 'tcruzi', 'Amastigotes in heart muscle · H&E'],
      ['e4_ld1.jpg', 'leish', 'Amastigotes in a macrophage · bone marrow'],
      ['e4_ld2.jpg', 'leish', 'Amastigotes, high power'],
      [P + 'p1_68.jpg', 'leish', 'Amastigotes around a cell'],
      [P + 'p1_69.jpg', 'leish', 'Cell packed with amastigotes'],
      ['e4_ld_blood.jpg', 'leish', 'Amastigotes on a blood smear (rare)'],
      ['e4_tachy.jpg', 'toxo', 'Tachyzoites in fluid'],
      [P + 'p1b_05.jpg', 'toxo', 'Tachyzoites'],
      ['e4_toxo_cyst.jpg', 'toxo', 'Tissue cyst with bradyzoites'],
      ['e4_naegleria.jpg', 'naeg', 'Trophozoites in CSF · Wright stain'],
      ['e4_acanth.jpg', 'acanth', 'Trophozoite and cyst']
    ] },
    { code: 'VID-P6', title: 'Intestinal roundworms', cap: 'pink', group: 'Visual ID · Parasites', cards: [
      [P + 'p1_00.jpg', 'ascaris', 'Fertile egg'],
      [P + 'p1_01.jpg', 'ascaris', 'Fertile egg'],
      [P + 'p1_02.jpg', 'ascaris', 'Fertile egg'],
      [P + 'p1_03.jpg', 'ascaris', 'Fertile egg'],
      [H + 'hel_196.jpg', 'ascaris', 'Fertile eggs'],
      [P + 'p1_04.jpg', 'ascaris', 'Infertile egg'],
      [P + 'p1_05.jpg', 'ascaris', 'Infertile egg'],
      [H + 'hel_195.jpg', 'ascaris', 'Infertile eggs'],
      [P + 'p1_06.jpg', 'trichuris', 'Egg'],
      [H + 'hel_199.jpg', 'trichuris', 'Eggs'],
      [P + 'p1_07.jpg', 'hookworm', 'Egg'],
      [P + 'p1_08.jpg', 'hookworm', 'Egg'],
      [H + 'hel_152.jpg', 'hookworm', 'Eggs'],
      [P + 'p1_17.jpg', 'hookworm', 'Rhabditiform larva'],
      [P + 'p1_12.jpg', 'hookworm', 'Mouthparts: <i>Ancylostoma</i> (left), <i>Necator</i> (right)'],
      [H + 'hel_154.jpg', 'hookworm', '<i>Ancylostoma</i> mouth (teeth)'],
      [H + 'hel_155.jpg', 'hookworm', '<i>Necator</i> mouth (cutting plates)'],
      [H + 'hel_149.jpg', 'hookworm', 'Adult male, arrow on the bursa'],
      [P + 'p1_13.jpg', 'tricho', 'Egg next to a 100 µm scale bar'],
      [P + 'p1_14.jpg', 'tricho', 'Egg'],
      [H + 'hel_185.jpg', 'tricho', 'Eggs'],
      [P + 'p1_09.jpg', 'enterob', 'Egg'],
      [P + 'p1_10.jpg', 'enterob', 'Egg'],
      [P + 'p1_11.jpg', 'enterob', 'Eggs from a tape prep'],
      [H + 'hel_194.jpg', 'enterob', 'Eggs'],
      [P + 'p1_15.jpg', 'strongy', 'Rhabditiform larva in stool'],
      [P + 'p1_16.jpg', 'strongy', 'Filariform larva, tail close-up'],
      [H + 'hel_201.jpg', 'capill', 'Eggs'],
      ['e4_bayli_eggs.jpg', 'baylis', 'Eggs from raccoon feces']
    ] },
    { code: 'VID-P7', title: 'Filariae & tissue roundworms', cap: 'lightblue', group: 'Visual ID · Parasites', cards: [
      ['e4_wb.jpg', 'wb', 'Microfilaria'],
      ['e4_wb_tail.jpg', 'wb', 'Microfilaria tail'],
      [P + 'p1b_11.jpg', 'wb', 'Microfilaria, sheath and head space labeled'],
      ['e4_brugia.jpg', 'brugia', 'Microfilaria · Giemsa'],
      ['e4_brugia_tail.jpg', 'brugia', 'Microfilaria tail'],
      [P + 'p1b_12.jpg', 'brugia', 'Microfilaria, tail nuclei labeled'],
      ['e4_loa.jpg', 'loa', 'Microfilaria'],
      ['e4_loa2.jpg', 'loa', 'Microfilaria'],
      [P + 'p1b_14.jpg', 'loa', 'Microfilaria, faint stain'],
      [P + 'p1b_16.jpg', 'loa', 'Microfilaria'],
      [P + 'p1b_17.jpg', 'loa', 'Microfilaria, nuclei to the tip'],
      ['e4_eyeworm.jpg', 'loa', 'Adult worm removed from the eye'],
      ['e4_oncho.jpg', 'oncho', 'Microfilaria from a skin snip'],
      [P + 'p1b_13.jpg', 'oncho', 'Microfilaria'],
      [P + 'p1b_15.jpg', 'mansonella', 'Microfilaria'],
      ['e4_trich_muscle.jpg', 'trichin', 'Encysted larva in muscle'],
      [P + 'p1b_00.jpg', 'trichin', 'Larva in tissue section'],
      [P + 'p1b_01.jpg', 'trichin', 'Coiled larva'],
      [P + 'p1b_02.jpg', 'trichin', 'Coiled larva, stained'],
      ['e4_trich_larva.jpg', 'trichin', 'Larva freed from digested muscle'],
      ['e4_guinea.jpg', 'dracun', 'Adult worm wound onto a stick']
    ] },
    { code: 'VID-P8', title: 'Flukes', cap: 'gold', group: 'Visual ID · Parasites', cards: [
      [P + 'p1_20.jpg', 'clonorch', 'Eggs'],
      [P + 'p1_21.jpg', 'clonorch', 'Egg'],
      [H + 'hel_049.jpg', 'clonorch', 'Egg'],
      [P + 'p1_22.jpg', 'smansoni', 'Egg'],
      [H + 'hel_016.jpg', 'smansoni', 'Egg'],
      [H + 'hel_019.jpg', 'sjapon', 'Egg'],
      [H + 'hel_020.jpg', 'shaem', 'Egg'],
      [P + 'p1_23.jpg', 'fascegg', 'Egg (about 150 × 80 µm)'],
      [P + 'p1_24.jpg', 'fascegg', 'Egg'],
      [P + 'p1_25.jpg', 'fascegg', 'Egg'],
      [P + 'p1_44.jpg', 'fascegg', 'Egg, arrows on the operculum'],
      [P + 'p1_45.jpg', 'fascegg', 'Egg'],
      [P + 'p1_34.jpg', 'fascegg', 'Egg · our lab scope'],
      [H + 'hel_039.jpg', 'fascegg', 'Egg (lecture label: <i>F. buski</i>)'],
      [H + 'hel_040.jpg', 'fascegg', 'Egg (lecture label: <i>F. hepatica</i>)'],
      [P + 'p1_27.jpg', 'fasciola', 'Adult flukes'],
      [P + 'p1_26.jpg', 'fasciolopsis', 'Adult fluke'],
      [P + 'p1_28.jpg', 'paragon', 'Egg'],
      [P + 'p1_46.jpg', 'paragon', 'Egg, arrows on the operculum'],
      [P + 'p1_47.jpg', 'paragon', 'Egg (about 120 µm)'],
      [P + 'p1_35.jpg', 'paragon', 'Egg · our lab scope'],
      [H + 'hel_063.jpg', 'paragon', 'Egg'],
      ['e4_cercaria.jpg', 'cercaria', 'Fork-tailed larva from lake water']
    ] },
    { code: 'VID-P9', title: 'Tapeworms', cap: 'green', group: 'Visual ID · Parasites', cards: [
      [P + 'p1_29.jpg', 'dlatus', 'Egg, arrow on the operculum'],
      [P + 'p1_36.jpg', 'dlatus', 'Egg · our lab scope'],
      [H + 'hel_086.jpg', 'dlatus', 'Egg'],
      [P + 'p1_30.jpg', 'taenia', 'Egg'],
      [H + 'hel_094.jpg', 'taenia', 'Egg'],
      [H + 'hel_098.jpg', 'tsolium', 'Gravid proglottid'],
      [H + 'hel_102.jpg', 'tsolium', 'Scolex'],
      ['e4_cysti.jpg', 'tsolium', 'Cysticerci in brain (neurocysticercosis)'],
      [H + 'hel_097.jpg', 'tsaginata', 'Gravid proglottid'],
      [H + 'hel_101.jpg', 'tsaginata', 'Scolex'],
      ['e4_coenurus.jpg', 'tmult', 'Coenurus bladder cyst'],
      [P + 'p1_31.jpg', 'hnana', 'Egg, arrows on the threads'],
      [P + 'p1_32.jpg', 'hnana', 'Egg'],
      [P + 'p1_33.jpg', 'hnana', 'Egg · our lab scope'],
      [P + 'p1_48.jpg', 'hnana', 'Egg'],
      [P + 'p1_49.jpg', 'hnana', 'Egg, arrows on the polar threads'],
      [H + 'hel_115.jpg', 'hnana', 'Egg'],
      [P + 'p1_37.jpg', 'hdim', 'Egg, hooklets visible'],
      [P + 'p1_38.jpg', 'hdim', 'Egg'],
      [P + 'p1_50.jpg', 'hdim', 'Egg'],
      [H + 'hel_126.jpg', 'hdim', 'Egg'],
      [P + 'p1_40.jpg', 'dipyl', 'Egg packet'],
      [H + 'hel_138.jpg', 'dipyl', 'Egg packet'],
      [H + 'hel_140.jpg', 'dipyl', 'Adult proglottid'],
      [P + 'p1_51.jpg', 'echino', 'Whole adult worm'],
      ['e4_hydsand.jpg', 'echino', 'Hydatid sand from a liver cyst'],
      [P + 'p1b_03.jpg', 'echino', 'Hydatid sand'],
      ['e4_daughter.jpg', 'echino', 'Cyst wall with brood capsules'],
      [P + 'p1b_04.jpg', 'echino', 'Daughter cysts'],
      ['e4_hydcysts.jpg', 'echino', 'Hydatid cysts at surgery']
    ] },

    { code: 'VID-M1', title: 'Fungi: colonies', cap: 'gold', group: 'Visual ID · Mycology', cards: [
      [M + 'myc_23.jpg', 'blasto', 'Mould colony, front'],
      [M + 'myc_34.jpg', 'cocci', 'Colony, front (F) and reverse (R)'],
      [M + 'myc_43.jpg', 'histo', 'Colony, front (F) and reverse (R)'],
      [M + 'myc_64.jpg', 'sporo', 'Mould colony with pigment in rings'],
      [M + 'myc_72.jpg', 'talaro', 'Mould colony with diffusing red pigment']
    ] },
    { code: 'VID-M2', title: 'Fungi: mould microscopy', cap: 'lightblue', group: 'Visual ID · Mycology', cards: [
      [M + 'myc_24.jpg', 'blasto', 'Mould form: conidia on short stalks'],
      [M + 'myc_25.jpg', 'blasto', 'Yeast (left) and mould (right)'],
      [M + 'myc_35.jpg', 'cocci', 'Mould form: arthroconidia'],
      [M + 'myc_44.jpg', 'histo', 'Mould form: macroconidia'],
      [M + 'myc_52.jpg', 'paracocci', 'Mould form: hyphae'],
      [M + 'myc_66.jpg', 'sporo', 'Mould form: conidia clusters'],
      [M + 'myc_73.jpg', 'talaro', 'Mould form: conidiophores'],
      [M + 'myc_74.jpg', 'talaro', 'Mould form: conidiophores']
    ] },
    { code: 'VID-M3', title: 'Fungi: tissue & yeast forms', cap: 'pink', group: 'Visual ID · Mycology', cards: [
      [M + 'myc_20.jpg', 'blasto', 'Yeast in tissue'],
      [M + 'myc_21.jpg', 'blasto', 'Yeast in tissue'],
      [M + 'myc_22.jpg', 'blasto', 'Budding yeast, wet prep'],
      [M + 'myc_32.jpg', 'cocci', 'Spherules in KOH'],
      [M + 'myc_41.jpg', 'histo', 'Yeast in tissue'],
      [M + 'myc_42.jpg', 'histo', 'Yeast inside white cells, blood smear'],
      [M + 'myc_53.jpg', 'paracocci', 'Multiple-budding yeast'],
      [M + 'myc_54.jpg', 'paracocci', 'Multiple-budding yeast'],
      [M + 'myc_65.jpg', 'sporo', 'Yeast in tissue'],
      [M + 'myc_71.jpg', 'talaro', 'Yeast-like cells inside a macrophage'],
      [M + 'myc_75.jpg', 'talaro', 'Yeast form dividing by fission']
    ] }
  ];

  var DATE = '2026-11-14';
  var RATE = { slow: 'Slow grower', moderate: 'Moderately fast', rapid: 'Fast grower' };

  function row(label, val) { return val ? '<div class="vid-row"><dt>' + label + '</dt><dd>' + val + '</dd></div>' : ''; }

  /* Builds the ID profile shown on the back of a card. */
  function render(card) {
    var v = card && card.vid, o = v && ORGANISMS[v.org];
    if (!o) return '';
    var h = '<div class="vid">';
    if (v.view) h += '<p class="vid-view"><span>This picture</span>' + v.view + '</p>';
    h += '<dl class="vid-rows">' + row('Type', o.type);
    if (o.growth) h += row('Growth', '<span class="vid-rate vid-' + o.growth.rate + '">' + RATE[o.growth.rate] + '</span> ' + (o.growth.text || ''));
    h += row('Colony', o.colony) + row('Mould form', o.micro) + row('Tissue / yeast', o.tissue) + row('Size', o.size) + row('Specimen', o.specimen) + '</dl>';
    if (o.keys && o.keys.length) h += '<p class="vid-h">Key ID features</p><ul class="vid-keys">' + o.keys.map(function (k) { return '<li>' + k + '</li>'; }).join('') + '</ul>';
    if (o.lookalike) h += '<p class="vid-look"><b>Don’t confuse with:</b> ' + o.lookalike + '</p>';
    return h + '</div>';
  }

  var data = window.SITE_DATA = window.SITE_DATA || {};
  data.decks = data.decks || [];
  VID_DECKS.forEach(function (d) {
    data.decks.push({
      code: d.code, title: d.title, cap: d.cap, group: d.group, date: d.date || DATE, html: true,
      cards: d.cards.filter(function (c) { return ORGANISMS[c[1]]; }).map(function (c, i) {
        return { q: 'Picture ' + (i + 1) + '. Identify.', a: ORGANISMS[c[1]].name, img: c[0], vid: { org: c[1], view: c[2] || '' } };
      })
    });
  });

  window.VISUAL_ID = { organisms: ORGANISMS, decks: VID_DECKS, render: render };
})();
