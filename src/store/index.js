import { createStore } from 'vuex';

import getters from './getters.js';
import actions from './actions.js';
import mutations from './mutations.js';

const store = createStore({
    state() {
        return {
            articles: [
                {
                    "Hauptartikelnr": 102.85,
                    "Artikelname": "Paul - Men's Supersoft Organic T-Shirt",
                    "Hersteller": "Nakedshirt",
                    "Beschreibung": "Single Jersey, Rundhalsausschnitt mit Rippstrickbündchen, Nackenband, Seitennähte, Doppelnaht an Ärmelabschluss und Bund, Medium Fit, Neutrales Größenetikett im Nacken",
                    "Materialangaben": "100% Bio-Baumwolle",
                    "Geschlecht": "Herren",
                    "Produktart": "T-Shirts",
                    "Ärmel": "Kurzarm",
                    "Bein": "",
                    "Kragen": "Rundhals",
                    "Herstellung": "Fair & Umweltfreundlich",
                    "Taschenart": "",
                    "Grammatur": "200 g/m²",
                    "Material": "Bio-Baumwolle",
                    "Ursprungsland": "",
                    "Bildname": "102.85.jpg"
                },
                {
                    "Hauptartikelnr": 105.85,
                    "Artikelname": "Coco - Women's Tank Top",
                    "Hersteller": "Nakedshirt",
                    "Beschreibung": "Single Jersey Hals- und Armausschnitte mit Rippstrick-Einfassung, \nSeitennähte, Doppelnaht am Bund, Medium Fit, Neutrales Größenetikett im Nacken.",
                    "Materialangaben": "100 % Baumwolle",
                    "Geschlecht": "Damen",
                    "Produktart": "T-Shirts",
                    "Ärmel": "Ärmellos",
                    "Bein": "",
                    "Kragen": "Rundhals",
                    "Herstellung": "Fair",
                    "Taschenart": "",
                    "Grammatur": "155 g/m²",
                    "Material": "Baumwolle",
                    "Ursprungsland": "",
                    "Bildname": "105.85.jpg"
                },
                {
                    "Hauptartikelnr": 106.85,
                    "Artikelname": "Mia - Women's Organic Fitted Longtop",
                    "Hersteller": "Nakedshirt",
                    "Beschreibung": "Single Jersey, Decolletée und Armausschnitte mit dezenter Rippstrick-Einfassung, Seitennähte, Doppelnaht am Bund, Extra lang und körpernah geschnitten, Neutrales Größenetikett im Nacken.",
                    "Materialangaben": "100 % Bio-Baumwolle",
                    "Geschlecht": "Damen",
                    "Produktart": "T-Shirts",
                    "Ärmel": "Ärmellos",
                    "Bein": "",
                    "Kragen": "Boat-Neck",
                    "Herstellung": "Fair & Umweltfreundlich",
                    "Taschenart": "",
                    "Grammatur": "155 g/m²",
                    "Material": "",
                    "Ursprungsland": "",
                    "Bildname": "106.85.jpg"
                },
                {
                    "Hauptartikelnr": 107.85,
                    "Artikelname": "Louise - Women's Fitted Top",
                    "Hersteller": "Nakedshirt",
                    "Beschreibung": "Single Jersey, Hals- und Armausschnitte mit Einfassung, Seitennähte, Doppelnaht am Bund, Körpernah geschnitten,  \nNeutrales Größenetikett im Nacken.",
                    "Materialangaben": "100 % Baumwolle",
                    "Geschlecht": "Damen",
                    "Produktart": "T-Shirts",
                    "Ärmel": "Ärmellos",
                    "Bein": "",
                    "Kragen": "Boat-Neck",
                    "Herstellung": "",
                    "Taschenart": "",
                    "Grammatur": "155 g/m²",
                    "Material": "Baumwolle",
                    "Ursprungsland": "",
                    "Bildname": "107.85.jpg"
                }
            ],
        }
    },
    getters,
    actions,
    mutations,
});

export default store;