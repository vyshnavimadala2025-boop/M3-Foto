# Placeholder register

Every image below is a **temporary placeholder** used until M3 FOTO supplies its own photography.
None of them depict M3 FOTO clients or work, and none may be used in marketing as such.

How placeholders are marked:

- Files are named `ph-<id>.jpg` in `public/placeholders/`.
- Each entry in `src/content/media.generated.ts` has `placeholder: true` and full credit data.
- The UI shows a **PLACEHOLDER** badge on each one while `NEXT_PUBLIC_SHOW_PLACEHOLDER_BADGES` is not `false`.
- `/credits` lists author, licence and source for every image, as CC BY and CC BY-SA require.
- Sample testimonials are labelled **Sample** and are hidden when placeholder mode is off.
- Collection and project titles in `src/content/catalog.ts` describe the placeholder images only and are flagged `placeholder: true`.

Licences used: Creative Commons BY / BY-SA / CC0 (Wikimedia Commons) and the Unsplash License
(served via picsum.photos). No NC, ND or editorial-only images.

## Replacing placeholders

Until the admin exists (Milestone 5): put the studio's images in `public/media/`, add entries with
`placeholder: false` to a new content file, and point the ids in `src/content/home.ts` and
`src/content/catalog.ts` at them. After that, delete `public/placeholders/`,
`scripts/placeholders.manifest.json`, `scripts/process-placeholders.mjs` and `src/content/media.generated.ts`.

## Register (47 images)

| File | Subject | Author | Licence | Source |
|---|---|---|---|---|
| `ph-hero-bride-red` | Bride in a red lehenga and gold jewellery, smiling softly against a deep green backdrop | Jubair1985 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [source](https://commons.wikimedia.org/wiki/File:Bridal_photography.jpg) |
| `ph-hero-couple-arch` | Bride and groom holding hands beneath a green archway of trees | MediaMOF | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [source](https://commons.wikimedia.org/wiki/File:Wedding_Portraits_63.jpg) |
| `ph-hero-blindfold` | Woman with a fabric band across her eyes, standing before a pale sea | Oscar Keys | [Unsplash License](https://unsplash.com/license) | [source](https://unsplash.com/photos/AmPRUnRb6N0) |
| `ph-hero-fire` | Silhouette of a woman watching sparks and firelight at night | Joshua Earle | [Unsplash License](https://unsplash.com/license) | [source](https://unsplash.com/photos/YMVCseSYVXI) |
| `ph-hero-portrait` | Close portrait of a woman with red lips and soft curls, gaze turned aside | Roksolana Zasiadko | [Unsplash License](https://unsplash.com/license) | [source](https://unsplash.com/photos/LyeduBb2Auk) |
| `ph-manifesto-bride` | Bridal portrait with yellow flowers in the hair and red lips | Jubair Bin Iqbal | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [source](https://commons.wikimedia.org/wiki/File:Gaye_Holud_Bangladesh.jpg) |
| `ph-col-weddings` | Bride under a red embroidered veil, eyes lowered, hands joined | Nirmal Dulal | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [source](https://commons.wikimedia.org/wiki/File:Nepali_hindu_bride.JPG) |
| `ph-col-prewedding` | Couple walking across a windswept grassy ridge under an open sky | Vildebrgn | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [source](https://commons.wikimedia.org/wiki/File:Photo_from_photoshoot_spring-summer_collection_21.jpg) |
| `ph-col-engagements` | Close-up of hennaed hands exchanging an engagement ring | Kashish1711 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [source](https://commons.wikimedia.org/wiki/File:Engagement_ceremony.jpg) |
| `ph-col-fashion` | Model in a silk suit seated on a white chair in a bright studio | MICA CARDOZO | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [source](https://commons.wikimedia.org/wiki/File:Mya_Yaharii.jpg) |
| `ph-col-portraits` | Black and white portrait of a woman wearing a jewelled headpiece | Samia Dib Benkaci | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [source](https://commons.wikimedia.org/wiki/File:Portrait_de_femme_en_tenue_traditionnelle_de_Berb%C3%A8re_Alg%C3%A9rien.jpg) |
| `ph-col-events` | Concert crowd under sweeping stage light beams | Daniel Robert | [Unsplash License](https://unsplash.com/license) | [source](https://unsplash.com/photos/MRxD-J9-4ps) |
| `ph-col-films` | Black and white motion blur of a train passing a platform | Mario Calvo | [Unsplash License](https://unsplash.com/license) | [source](https://unsplash.com/photos/S_mEIfXRzIk) |
| `ph-pillars-maker` | Black and white scene of a photographer crouching to photograph a bride | Janne Räkköläinen | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/) | [source](https://commons.wikimedia.org/wiki/File:Photo_of_Photoshoot_in_Ayia_Napa,_Cyprus.jpg) |
| `ph-svc-weddings` | Bride and groom with flower garlands at a temple wedding | Basile Morin | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [source](https://commons.wikimedia.org/wiki/File:Bride_and_groom_at_Sri_Senpaga_Vinayagar_temple.jpg) |
| `ph-svc-prewedding` | Couple on a tropical beach in wedding attire | Marcin Konsek | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [source](https://commons.wikimedia.org/wiki/File:2016_Prowincja_Krabi,_Ko_Phi_Phi_Don,_Pla%C5%BCa_Loh_Moo_Dee,_Tajska_para_%C5%9Blubna_(04).jpg) |
| `ph-svc-engagements` | Couple showing their engagement rings at a decorated venue | Shuttersmile2011 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [source](https://commons.wikimedia.org/wiki/File:Engagement_ceremony_india_couple.jpg) |
| `ph-svc-fashion` | Model in a sequinned dress posing beside wrought-iron gates | Anna_Bella | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | [source](https://commons.wikimedia.org/wiki/File:Pexels-photo-458694.jpg) |
| `ph-svc-portraits` | Profile portrait of a woman in a black head wrap and gold hoop earring | Wilfredor | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | [source](https://commons.wikimedia.org/wiki/File:Woman_in_a_headwrap_in_Quebec_City.jpg) |
| `ph-svc-events` | Drummer standing on stage under blue concert lighting | Denis Barthel | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [source](https://commons.wikimedia.org/wiki/File:Hammer_of_Doom_X_W%C3%BCrzburg_My_Dying_Bride_8.jpg) |
| `ph-svc-commercial` | Curated boutique interior with framed prints and a hanging jacket | Clark Street Mercantile | [Unsplash License](https://unsplash.com/license) | [source](https://unsplash.com/photos/vC-GqGbakJo) |
| `ph-svc-films` | Black and white cinematic frame of a platform with long windows | Matthew Wiebe | [Unsplash License](https://unsplash.com/license) | [source](https://unsplash.com/photos/azkWKhyr54U) |
| `ph-proj-corridor` | Groom in a white tuxedo and bride in a ball gown walking down a warm wooden corridor | MediaMOF | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [source](https://commons.wikimedia.org/wiki/File:Wedding_Portraits_02.jpg) |
| `ph-proj-bride-gold` | Bride in green and gold with floral jewellery, eyes lowered | Nawshadtiash | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [source](https://commons.wikimedia.org/wiki/File:Bengali_Bride.jpg) |
| `ph-proj-embrace` | Bride in a veil resting her head on the groom's shoulder | MediaMOF | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [source](https://commons.wikimedia.org/wiki/File:Wedding_Portraits_32.jpg) |
| `ph-proj-bench` | Couple seated on a bench facing a hazy golden horizon | Charlie Foster | [Unsplash License](https://unsplash.com/license) | [source](https://unsplash.com/photos/A88emaZe7d8) |
| `ph-step-discover` | Woman reading quietly by a window | hieu le | [Unsplash License](https://unsplash.com/license) | [source](https://unsplash.com/photos/SrkuyPb3aUk) |
| `ph-step-direct` | Two photographers framing a shot beneath willow trees | epSos.de | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) | [source](https://commons.wikimedia.org/wiki/File:Best_Wedding_Photography_Picture_about_Professional_Photographers.jpg) |
| `ph-step-capture` | Hands holding a film camera against a knit sweater | Mia Domenico | [Unsplash License](https://unsplash.com/license) | [source](https://unsplash.com/photos/1z1F5Qc30Bs) |
| `ph-step-craft` | Two wedding rings casting a heart-shaped shadow on sheet music | Petar Milošević | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [source](https://commons.wikimedia.org/wiki/File:Wedding_ring_with_heart_shadow.jpg) |
| `ph-social-01` | Woman wrapped in a patterned shawl in low warm light | Elamanovaelvina | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [source](https://commons.wikimedia.org/wiki/File:Uzbek_girl_in_traditional_clothing.jpg) |
| `ph-social-02` | Bride holding a ceremonial pot during wedding rituals | Yann | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [source](https://commons.wikimedia.org/wiki/File:Hindu_Bride,_Ahmedabad,_Gujarat.jpg) |
| `ph-social-03` | Groom placing a ring on the bride's hennaed hand | Bijaya2043 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [source](https://commons.wikimedia.org/wiki/File:Nepai_wedding_engagement_IMG_6889.jpg) |
| `ph-social-04` | Hands clasped, an engagement ring catching the light | MediaMOF | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [source](https://commons.wikimedia.org/wiki/File:Wedding_Portraits_66.jpg) |
| `ph-social-05` | Overhead view of hennaed hands encircling a smiling groom | AmanAgrahari01 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [source](https://commons.wikimedia.org/wiki/File:Indian_Traditional_Wedding_Images_(40).jpg) |
| `ph-social-06` | Hands forming a heart around the setting sun | Mayur Gala | [Unsplash License](https://unsplash.com/license) | [source](https://unsplash.com/photos/2PODhmrvLik) |
| `ph-social-07` | Hands holding a burning sparkler | Kelley Bozarth | [Unsplash License](https://unsplash.com/license) | [source](https://unsplash.com/photos/n6vS3xlnsCc) |
| `ph-social-08` | Woman in a scarf looking out over a calm sea at golden hour | Matthew Wiebe | [Unsplash License](https://unsplash.com/license) | [source](https://unsplash.com/photos/tBtuxtLvAZs) |
| `ph-social-09` | Woman with flowing hair in soft rose-tinted light | Léa Dubedout | [Unsplash License](https://unsplash.com/license) | [source](https://unsplash.com/photos/N6STB5KbRUU) |
| `ph-social-10` | Black and white underwater figure suspended in dark water | Christopher Campbell | [Unsplash License](https://unsplash.com/license) | [source](https://unsplash.com/photos/Cp-LUHPRpWM) |
| `ph-social-11` | White heels on a red velvet surface | Alejandro Escamilla | [Unsplash License](https://unsplash.com/license) | [source](https://unsplash.com/photos/jVb0mSn0LbE) |
| `ph-social-12` | Woman with sunlit hair facing a golden sunset | Alexander Shustov | [Unsplash License](https://unsplash.com/license) | [source](https://unsplash.com/photos/2FrX56QL7P8) |
| `ph-social-13` | Woman paddling a canoe across a still mountain lake | Roberto Nickson | [Unsplash License](https://unsplash.com/license) | [source](https://unsplash.com/photos/7BjmDICVloE) |
| `ph-social-14` | Woman holding a sparkler at dusk | Morgan Sessions | [Unsplash License](https://unsplash.com/license) | [source](https://unsplash.com/photos/YIN4xUBaqnk) |
| `ph-cta-clouds` | Black and white sea of fog rolling over dark hills | Olivier Miche | [Unsplash License](https://unsplash.com/license) | [source](https://unsplash.com/photos/iIg4F2IWbTM) |
| `ph-bts-camera` | Person holding a camera at waist height | Sergey Zolkin | [Unsplash License](https://unsplash.com/license) | [source](https://unsplash.com/photos/oDnfkgrxL64) |
| `ph-bts-reading` | Black and white close-up of hands on piano keys | Lukas Budimaier | [Unsplash License](https://unsplash.com/license) | [source](https://unsplash.com/photos/JzkgpML_8XI) |
