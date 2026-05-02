# DinnerBoard — Fortnightly Meal Planning Prompt

Copy everything in the **Prompt** section below into a new Claude chat every two weeks.
Replace `[INSERT START DATE]` with the Sunday that starts your fortnight (e.g. `2026-05-10`).

---

## Prompt

Plan 14 days of family dinners for a family of 3 eaters: one adult man, one adult woman, and one 2.5-year-old toddler. Generate a complete grocery shopping list organized by store section.

**Dietary requirements:**
- Strictly gluten-free — the mom has celiac disease. No wheat, barley, rye, or hidden gluten. Watch for: soy sauce (use tamari), malt vinegar, non-GF oats, flour-dusted frozen foods, and seasoning packets
- Toddler-friendly — simple flavors, no spicy food, soft textures or finger-food friendly when possible
- No elaborate or time-consuming recipes — 30–45 minutes or less on weeknights

**Meal plan structure:**
- Plan dinner for all 14 days
- Include 2 leftover nights spread across the two weeks
- Repeating meals across Week 1 and Week 2 is totally fine and encouraged
- Keep it practical and filling

**Our go-to meals — pull from these regularly:**
- Al Fresco chicken meatballs with GF pasta and marinara (quick, family favorite)
- Kevin's brand pre-cooked sous vide meats (e.g. Korean BBQ chicken, Tikka Masala) served over jasmine rice with a simple veggie like roasted broccoli or asparagus
- Bubba Burgers on GF buns with standard toppings
- Chicken burgers (Costco-style) on GF buns
- Hotdog night — the toddler loves these; GF hotdogs on GF buns
- Frozen GF pizza night — totally fine every other week or so (e.g. Udi's, Against the Grain, or similar)
- Egg scramble or egg/cheese/avocado/bacon sandwich on GF bread — great easy dinner
- Taco night with corn tortillas, ground beef or chicken, standard toppings
- Rice bowls — protein + jasmine rice + veggie
- Roasted chicken thighs with oven-roasted veggies
- GF stir fry over rice with tamari

**Wednesday — Special Night:**
Wednesday is a dedicated Special Night that alternates between two modes each fortnight:

- **Fan Favorite Night** — a more involved meal we already love. Rotate through these three:
  - ⭐ Chicken and Cashew (GF oyster sauce or tamari-based, serve over jasmine rice)
  - ⭐ Sesame Chicken (GF sauce, serve over jasmine rice with steamed broccoli)
  - ⭐ Chicken Parmesan (GF breadcrumbs, GF pasta, marinara)
- **Try Something New Night** — a meal not in our current rotation. Still gluten-free and toddler-friendly, but can be more adventurous than our usual weeknight staples. Good examples: Korean beef bulgogi bowl, GF chicken shawarma with rice, Thai basil ground beef over jasmine rice, smash burgers on GF brioche buns, salmon with a miso-tamari glaze and bok choy.

In a given fortnight, Week 1 Wednesday = one mode, Week 2 Wednesday = the other. Alternate which comes first each time you run this prompt. Label Wednesday clearly in the meal name, e.g.:
- `"meal": "⭐ Fan Favorite: Sesame Chicken"`
- `"meal": "🆕 New: Thai Basil Beef Bowl"`

**Output format: valid JSON only.** No explanation, no markdown, no extra text — just the raw JSON so I can paste it directly into my meal planning app. Use this exact schema:

```json
{
  "weeks": [
    {
      "week": 1,
      "days": [
        {
          "date": "YYYY-MM-DD",
          "meal": "Meal name",
          "notes": "e.g. double batch for leftovers Thursday",
          "leftover": false
        }
      ]
    },
    {
      "week": 2,
      "days": [...]
    }
  ],
  "grocery": [
    { "category": "Produce", "name": "Item name", "warn": false },
    { "category": "Condiments & Sauces", "name": "Tamari (soy sauce)", "warn": true }
  ]
}
```

**Rules:**
- Set `"leftover": true` for leftover nights
- Set `"warn": true` for any grocery item where a certified GF version must be purchased (hot dog buns, pasta, pizza, soy sauce, breadcrumbs, oyster sauce, etc.)
- Use real dates starting from **[INSERT START DATE]**
- Grocery categories must be one of: `Produce`, `Meat & Seafood`, `Dairy & Eggs`, `Frozen`, `Pantry / Dry Goods`, `Canned Goods`, `Condiments & Sauces`, `Other`
- Wednesday Fan Favorite should rotate — don't repeat the same one two fortnights in a row

---

## Notes for Claude Code

This prompt is run manually in a separate Claude chat every two weeks. The output JSON is then pasted into the **Import tab** of the DinnerBoard app (`index.html`). See `plan.md` for the full app spec.
