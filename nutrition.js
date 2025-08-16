// --- SECTION 2: NUTRITION DATA LIBRARIES ---

export const recipeLibrary = [
    // --- OMNIVORE ---
    {
        id: 'omni_chicken_quinoa_bowl',
        name: 'Herbed Chicken & Quinoa Bowl',
        core_ingredients: ['chicken', 'quinoa', 'broccoli'],
        meal_type: ['lunch', 'dinner'],
        diet_tags: ['omnivore'],
        allergy_tags: ['gluten_free', 'dairy_free'],
        goal_tags: ['muscle_gain', 'recomp', 'maintenance'],
        convenience_tags: ['meal_prep_friendly', 'budget_friendly', 'one_pan_meal'],
        prep_time: 30,
        macros: { calories: 550, protein: 50, carbs: 45, fat: 18, fiber: 8 },
        ingredients: [
            { item: 'Chicken breast', quantity: 180, unit: 'g' },
            { item: 'Quinoa (dry)', quantity: 60, unit: 'g' },
            { item: 'Broccoli florets', quantity: 150, unit: 'g' },
            { item: 'Olive oil', quantity: 10, unit: 'ml' },
            { item: 'Lemon juice', quantity: 1, unit: 'tbsp' },
            { item: 'Dried rosemary', quantity: 0.5, unit: 'tsp' },
            { item: 'Salt and pepper', quantity: 0.25, unit: 'tsp' }
        ],
        instructions: [
            'Cook quinoa according to package directions.',
            'Preheat oven to 200°C (400°F). Toss chicken and broccoli with olive oil, rosemary, salt, and pepper. Roast for 20-25 minutes, or until chicken is cooked through.',
            'Combine chicken, broccoli, and quinoa in a bowl. Drizzle with lemon juice before serving.'
        ],
        prep_tip: 'Cook a large batch of quinoa and chicken at the start of the week for quick assembly.'
    },
    {
        id: 'omni_beef_sweet_potato',
        name: 'Ground Beef with Sweet Potato Skillet',
        core_ingredients: ['beef', 'sweet potato', 'bell pepper'],
        meal_type: ['dinner'],
        diet_tags: ['omnivore'],
        allergy_tags: ['gluten_free', 'dairy_free'],
        goal_tags: ['muscle_gain', 'recomp'],
        convenience_tags: ['one_pan_meal', 'meal_prep_friendly', 'calorie_dense'],
        prep_time: 25,
        macros: { calories: 580, protein: 45, carbs: 50, fat: 22, fiber: 10 },
        ingredients: [
            { item: 'Lean ground beef (90/10)', quantity: 150, unit: 'g' },
            { item: 'Sweet potato, diced small', quantity: 250, unit: 'g' },
            { item: 'Bell pepper, diced', quantity: 100, unit: 'g' },
            { item: 'Onion, diced', quantity: 50, unit: 'g' },
            { item: 'Cumin', quantity: 0.5, unit: 'tsp' },
            { item: 'Chili powder', quantity: 0.5, unit: 'tsp' },
            { item: 'Salt and pepper', quantity: 0.25, unit: 'tsp' }
        ],
        instructions: [
            'In a large skillet over medium-high heat, cook the onion and bell pepper for 3-4 minutes until softened.',
            'Add the diced sweet potato and 1/4 cup of water. Cover and cook for 8-10 minutes, stirring occasionally, until the potato is tender.',
            'Add the ground beef to the skillet. Break it apart with a spoon and cook for 5-7 minutes until browned.',
            'Drain any excess fat. Stir in the cumin, chili powder, salt, and pepper. Serve hot.'
        ]
    },
    {
        id: 'omni_scrambled_eggs_avocado',
        name: 'Scrambled Eggs with Avocado Toast',
        core_ingredients: ['egg', 'avocado', 'bread'],
        meal_type: ['breakfast'],
        diet_tags: ['omnivore', 'vegetarian'],
        allergy_tags: [],
        goal_tags: ['maintenance', 'recomp', 'fat_loss'],
        convenience_tags: ['quick_meal', 'under_15_min'],
        prep_time: 10,
        macros: { calories: 450, protein: 28, carbs: 30, fat: 23, fiber: 8 },
        ingredients: [
            { item: 'Large eggs', quantity: 3, unit: 'units' },
            { item: 'Whole wheat bread', quantity: 2, unit: 'slices' },
            { item: 'Avocado', quantity: 0.5, unit: 'unit' },
            { item: 'Salt and pepper', quantity: 1, unit: 'pinch' }
        ],
        instructions: [
            'Toast the bread slices to your desired crispness.',
            'While the bread is toasting, mash the avocado in a small bowl. Season with a pinch of salt and pepper.',
            'In another bowl, whisk the eggs with a splash of water or milk, plus salt and pepper.',
            'Cook the eggs in a non-stick pan over medium heat, stirring gently, until they reach your desired consistency.',
            'Spread the mashed avocado on the toast and serve the scrambled eggs alongside.'
        ]
    },
    {
        id: 'omni_chicken_salad_lettuce_wraps',
        name: 'Greek Yogurt Chicken Salad Wraps',
        core_ingredients: ['chicken', 'yogurt', 'lettuce'],
        meal_type: ['lunch'],
        diet_tags: ['omnivore'],
        allergy_tags: ['gluten_free'],
        goal_tags: ['fat_loss', 'recomp'],
        convenience_tags: ['no_cook', 'meal_prep_friendly', 'under_15_min'],
        prep_time: 10,
        macros: { calories: 420, protein: 45, carbs: 10, fat: 22, fiber: 4 },
        ingredients: [
            { item: 'Cooked chicken breast, shredded', quantity: 150, unit: 'g' },
            { item: 'Plain Greek yogurt', quantity: 3, unit: 'tbsp' },
            { item: 'Celery, finely chopped', quantity: 1, unit: 'stalk' },
            { item: 'Red onion, finely chopped', quantity: 2, unit: 'tbsp' },
            { item: 'Romaine lettuce leaves', quantity: 4, unit: 'leaves' },
            { item: 'Dried dill', quantity: 0.25, unit: 'tsp' }
        ],
        instructions: [
            'In a medium bowl, combine the shredded chicken, Greek yogurt, chopped celery, and red onion.',
            'Season with dried dill, salt, and pepper. Mix until everything is well combined.',
            'Carefully separate the romaine lettuce leaves to use as wraps.',
            'Spoon the chicken salad mixture evenly into the lettuce leaves and serve immediately.'
        ],
        prep_tip: 'Use a rotisserie chicken to save time on cooking. The salad mixture can be stored for 2-3 days in the fridge.'
    },
    {
        id: 'omni_bbq_chicken_sweet_potato',
        name: 'BBQ Chicken Stuffed Sweet Potato',
        core_ingredients: ['chicken', 'sweet potato'],
        meal_type: ['lunch', 'dinner'],
        diet_tags: ['omnivore'],
        allergy_tags: ['gluten_free', 'dairy_free'],
        goal_tags: ['muscle_gain', 'recomp'],
        convenience_tags: ['meal_prep_friendly'],
        prep_time: 45,
        macros: { calories: 550, protein: 50, carbs: 60, fat: 12, fiber: 12 },
        ingredients: [
            { item: 'Sweet potato', quantity: 1, unit: 'large' },
            { item: 'Cooked chicken breast, shredded', quantity: 150, unit: 'g' },
            { item: 'BBQ sauce (low sugar)', quantity: 3, unit: 'tbsp' },
            { item: 'Red onion, sliced', quantity: 0.25, unit: 'unit' }
        ],
        instructions: [
            'Preheat your oven to 200°C (400°F). Pierce the sweet potato several times with a fork.',
            'Bake for 40-50 minutes, or until you can easily insert a knife into the center.',
            'While the potato bakes, mix the shredded chicken with your favorite low-sugar BBQ sauce in a small bowl.',
            'Once the potato is cooked, slice it open lengthwise. Fluff the inside with a fork.',
            'Top the potato with the BBQ chicken mixture and garnish with freshly sliced red onion.'
        ],
        prep_tip: 'Bake multiple sweet potatoes at once for the week to save time.'
    },
    {
        id: 'omni_chicken_fava_bean_stew',
        name: 'Chicken & Fava Bean Stew',
        core_ingredients: ['chicken', 'fava bean', 'tomato'],
        meal_type: ['dinner'],
        diet_tags: ['omnivore'],
        allergy_tags: ['gluten_free', 'dairy_free'],
        goal_tags: ['muscle_gain', 'maintenance'],
        convenience_tags: ['one_pan_meal', 'budget_friendly'],
        prep_time: 35,
        macros: { calories: 530, protein: 55, carbs: 40, fat: 15, fiber: 15 },
        ingredients: [
            { item: 'Chicken breast, diced', quantity: 180, unit: 'g' },
            { item: 'Fava beans (fresh or frozen)', quantity: 150, unit: 'g' },
            { item: 'Canned diced tomatoes', quantity: 200, unit: 'g' },
            { item: 'Onion, diced', quantity: 1, unit: 'unit' },
            { item: 'Garlic, minced', quantity: 2, unit: 'cloves' },
            { item: 'Smoked paprika', quantity: 0.5, unit: 'tsp' }
        ],
        instructions: [
            'Heat a splash of olive oil in a pot over medium heat. Sauté the onion for 5 minutes until soft, then add the garlic and cook for 1 more minute.',
            'Add the diced chicken and cook until it\'s lightly browned on all sides.',
            'Stir in the diced tomatoes, fava beans, smoked paprika, and 1/2 cup of water or chicken broth.',
            'Bring to a boil, then reduce the heat to low, cover, and simmer for 20-25 minutes until the stew has thickened.'
        ]
    },

    // --- PESCATARIAN ---
    {
        id: 'pescatarian_salmon_sweet_potato',
        name: 'Roasted Salmon with Sweet Potato',
        core_ingredients: ['salmon', 'sweet potato', 'green bean'],
        meal_type: ['dinner'],
        diet_tags: ['pescatarian', 'omnivore'],
        allergy_tags: ['gluten_free', 'dairy_free'],
        goal_tags: ['fat_loss', 'recomp', 'maintenance'],
        convenience_tags: ['one_pan_meal'],
        prep_time: 30,
        macros: { calories: 550, protein: 42, carbs: 40, fat: 25, fiber: 9 },
        ingredients: [
            { item: 'Salmon fillet', quantity: 180, unit: 'g' },
            { item: 'Sweet potato, cut into wedges', quantity: 250, unit: 'g' },
            { item: 'Green Beans', quantity: 150, unit: 'g' },
            { item: 'Olive oil', quantity: 10, unit: 'ml' },
            { item: 'Smoked paprika', quantity: 1, unit: 'tsp' },
            { item: 'Salt and pepper', quantity: 0.25, unit: 'tsp' }
        ],
        instructions: [
            'Preheat your oven to 200°C (400°F).',
            'On a baking sheet, toss the sweet potato wedges with half the olive oil, paprika, salt, and pepper. Roast for 15 minutes.',
            'Push the potatoes to one side. Add the salmon fillet and green beans to the baking sheet. Drizzle with the remaining oil and season.',
            'Roast for another 12-15 minutes, until the salmon is cooked through and the potatoes are tender.'
        ]
    },
    {
        id: 'pescatarian_tuna_chickpea_salad',
        name: 'Tuna & Chickpea Salad',
        core_ingredients: ['tuna', 'chickpea', 'cucumber'],
        meal_type: ['lunch'],
        diet_tags: ['pescatarian', 'omnivore'],
        allergy_tags: ['gluten_free', 'dairy_free'],
        goal_tags: ['fat_loss', 'maintenance'],
        convenience_tags: ['quick_meal', 'no_cook', 'under_15_min'],
        prep_time: 10,
        macros: { calories: 450, protein: 40, carbs: 45, fat: 12, fiber: 15 },
        ingredients: [
            { item: 'Canned tuna in water, drained', quantity: 150, unit: 'g' },
            { item: 'Canned chickpeas, rinsed', quantity: 150, unit: 'g' },
            { item: 'Cucumber, diced', quantity: 100, unit: 'g' },
            { item: 'Red onion, finely chopped', quantity: 2, unit: 'tbsp' },
            { item: 'Lemon juice', quantity: 2, unit: 'tbsp' },
            { item: 'Olive oil', quantity: 5, unit: 'ml' }
        ],
        instructions: [
            'In a medium bowl, gently flake the drained tuna with a fork.',
            'Add the rinsed chickpeas, diced cucumber, and finely chopped red onion.',
            'Drizzle with lemon juice and olive oil.',
            'Season with salt and pepper to taste and toss gently to combine. Serve immediately.'
        ],
        prep_tip: 'Make a larger batch, but keep the dressing separate until ready to eat to maintain freshness.'
    },
    {
        id: 'pescatarian_spicy_tuna_quinoa_bowl',
        name: 'Spicy Tuna Quinoa Bowl',
        core_ingredients: ['tuna', 'quinoa', 'yogurt'],
        meal_type: ['lunch'],
        diet_tags: ['pescatarian', 'omnivore'],
        allergy_tags: ['gluten_free', 'dairy_free'],
        goal_tags: ['recomp', 'maintenance'],
        convenience_tags: ['quick_meal', 'meal_prep_friendly'],
        prep_time: 15,
        macros: { calories: 500, protein: 40, carbs: 50, fat: 15, fiber: 10 },
        ingredients: [
            { item: 'Canned tuna in water, drained', quantity: 150, unit: 'g' },
            { item: 'Quinoa, cooked', quantity: 150, unit: 'g' },
            { item: 'Greek yogurt', quantity: 2, unit: 'tbsp' },
            { item: 'Sriracha or hot sauce', quantity: 1, unit: 'tsp' },
            { item: 'Shredded carrots', quantity: 50, unit: 'g' },
            { item: 'Cucumber, diced', quantity: 50, unit: 'g' }
        ],
        instructions: [
            'In a small bowl, mix the Greek yogurt and sriracha together to create a spicy dressing.',
            'In a larger bowl, combine the drained tuna with the spicy dressing until well coated.',
            'Add the cooked quinoa, shredded carrots, and diced cucumber.',
            'Toss everything together until well mixed and serve.'
        ]
    },
    {
        id: 'pescatarian_cod_green_beans',
        name: 'Pan-Seared Cod with Green Beans',
        core_ingredients: ['cod', 'green bean'],
        meal_type: ['dinner'],
        diet_tags: ['pescatarian', 'omnivore'],
        allergy_tags: ['gluten_free', 'dairy_free'],
        goal_tags: ['fat_loss', 'recomp'],
        convenience_tags: ['quick_meal', 'one_pan_meal', 'under_15_min'],
        prep_time: 15,
        macros: { calories: 450, protein: 45, carbs: 20, fat: 20, fiber: 8 },
        ingredients: [
            { item: 'Cod fillet', quantity: 200, unit: 'g' },
            { item: 'Green beans (fresh or frozen)', quantity: 200, unit: 'g' },
            { item: 'Olive oil', quantity: 10, unit: 'ml' },
            { item: 'Garlic, minced', quantity: 2, unit: 'cloves' },
            { item: 'Lemon', quantity: 1, unit: 'unit' }
        ],
        instructions: [
            'First, steam or blanch the green beans for 3-4 minutes until they are tender but still crisp. Drain and set aside.',
            'Pat the cod fillet dry with a paper towel and season both sides with salt and pepper.',
            'Heat the olive oil in a skillet over medium-high heat. Carefully place the cod in the pan and sear for 3-4 minutes per side, until it\'s golden brown and flakes easily.',
            'In the last minute of cooking, add the minced garlic to the pan and sauté until fragrant. Add the green beans back to the pan to reheat.',
            'Squeeze the juice of half a lemon over the fish and green beans before serving.'
        ]
    },

    // --- VEGETARIAN ---
    {
        id: 'veg_greek_yogurt_bowl',
        name: 'Greek Yogurt Protein Bowl',
        core_ingredients: ['yogurt', 'berry', 'almond'],
        meal_type: ['breakfast', 'snack'],
        diet_tags: ['vegetarian'],
        allergy_tags: ['gluten_free'],
        goal_tags: ['maintenance', 'recomp', 'post_workout'],
        convenience_tags: ['quick_meal', 'under_15_min'],
        prep_time: 5,
        macros: { calories: 450, protein: 40, carbs: 40, fat: 15, fiber: 10 },
        ingredients: [
            { item: 'Plain Greek yogurt (0% or 2%)', quantity: 250, unit: 'g' },
            { item: 'Mixed berries (frozen or fresh)', quantity: 100, unit: 'g' },
            { item: 'Almonds, chopped', quantity: 20, unit: 'g' },
            { item: 'Chia seeds', quantity: 1, unit: 'tbsp' }
        ],
        instructions: [
            'Add the Greek yogurt to a bowl.',
            'Top with the mixed berries, chopped almonds, and chia seeds.',
            'For an extra protein boost, you can stir in a scoop of unflavored or vanilla protein powder before adding toppings.'
        ]
    },
    {
        id: 'veg_lentil_sweet_potato_salad',
        name: 'Warm Lentil & Sweet Potato Salad',
        core_ingredients: ['lentil', 'sweet potato', 'spinach'],
        meal_type: ['lunch', 'dinner'],
        diet_tags: ['vegetarian', 'vegan'],
        allergy_tags: ['gluten_free', 'dairy_free'],
        goal_tags: ['maintenance', 'fat_loss'],
        convenience_tags: ['meal_prep_friendly', 'budget_friendly'],
        prep_time: 30,
        macros: { calories: 520, protein: 25, carbs: 80, fat: 12, fiber: 25 },
        ingredients: [
            { item: 'Brown lentils, cooked', quantity: 200, unit: 'g' },
            { item: 'Sweet potato, roasted and diced', quantity: 250, unit: 'g' },
            { item: 'Spinach', quantity: 100, unit: 'g' },
            { item: 'Feta cheese (or vegan alternative)', quantity: 40, unit: 'g' },
            { item: 'Olive oil', quantity: 10, unit: 'ml' },
            { item: 'Balsamic vinegar', quantity: 1, unit: 'tbsp' }
        ],
        instructions: [
            'In a large bowl, combine the warm cooked lentils and the roasted sweet potato cubes.',
            'Add the fresh spinach and toss everything together. The residual heat will gently wilt the spinach.',
            'Crumble the feta cheese over the top of the salad.',
            'Drizzle with olive oil and balsamic vinegar, then season with salt and pepper to taste before serving.'
        ],
        prep_tip: 'Roast a batch of sweet potatoes ahead of time to make this salad in minutes.'
    },
    {
        id: 'veg_black_bean_corn_salad',
        name: 'Black Bean & Corn Salad',
        core_ingredients: ['black bean', 'corn', 'bell pepper'],
        meal_type: ['lunch', 'dinner'],
        diet_tags: ['vegetarian', 'vegan'],
        allergy_tags: ['gluten_free', 'dairy_free'],
        goal_tags: ['fat_loss', 'maintenance'],
        convenience_tags: ['no_cook', 'budget_friendly', 'meal_prep_friendly'],
        prep_time: 15,
        macros: { calories: 480, protein: 20, carbs: 85, fat: 8, fiber: 20 },
        ingredients: [
            { item: 'Canned black beans, rinsed', quantity: 200, unit: 'g' },
            { item: 'Canned corn, drained', quantity: 150, unit: 'g' },
            { item: 'Bell pepper, diced', quantity: 1, unit: 'unit' },
            { item: 'Red onion, finely chopped', quantity: 0.5, unit: 'unit' },
            { item: 'Lime juice', quantity: 2, unit: 'tbsp' },
            { item: 'Cilantro, chopped', quantity: 0.25, unit: 'cup' }
        ],
        instructions: [
            'In a large bowl, combine the rinsed black beans, drained corn, diced bell pepper, and finely chopped red onion.',
            'Drizzle with the juice of one lime and toss with the fresh cilantro.',
            'Season with 1/2 tsp of cumin, plus salt and pepper to taste. Mix well.',
            'For best results, let the salad sit for at least 10 minutes for the flavors to meld.'
        ],
        prep_tip: 'Tastes even better after an hour in the fridge. Serve with a side of quinoa or on its own.'
    },
    {
        id: 'veg_fava_bean_egg_toast',
        name: 'Smashed Fava Beans & Egg on Toast',
        core_ingredients: ['fava bean', 'egg', 'bread'],
        meal_type: ['lunch', 'dinner'],
        diet_tags: ['vegetarian'],
        allergy_tags: [],
        goal_tags: ['recomp', 'maintenance'],
        convenience_tags: ['quick_meal', 'under_15_min'],
        prep_time: 15,
        macros: { calories: 480, protein: 30, carbs: 50, fat: 18, fiber: 15 },
        ingredients: [
            { item: 'Fava beans (cooked and peeled)', quantity: 150, unit: 'g' },
            { item: 'Large eggs', quantity: 2, unit: 'units' },
            { item: 'Whole wheat bread', quantity: 2, unit: 'slices' },
            { item: 'Lemon juice', quantity: 1, unit: 'tsp' },
            { item: 'Feta cheese', quantity: 30, unit: 'g' }
        ],
        instructions: [
            'In a small bowl, use a fork to lightly mash the cooked fava beans. Mix in the lemon juice, a pinch of salt, and pepper.',
            'While preparing the beans, toast the bread to your liking.',
            'In a non-stick pan, cook the eggs as you prefer (poached or fried work best for this dish).',
            'Spread the smashed fava bean mixture evenly on the hot toast. Top each slice with an egg and crumble the feta cheese over everything.'
        ]
    },

    // --- VEGAN ---
    {
        id: 'vegan_tofu_scramble_lunch',
        name: 'Savory Tofu Scramble',
        core_ingredients: ['tofu', 'spinach'],
        meal_type: ['lunch', 'dinner'],
        diet_tags: ['vegan', 'vegetarian'],
        allergy_tags: ['dairy_free', 'gluten_free'],
        goal_tags: ['muscle_gain', 'recomp'],
        convenience_tags: ['quick_meal', 'under_15_min'],
        prep_time: 15,
        macros: { calories: 420, protein: 30, carbs: 15, fat: 25, fiber: 7 },
        ingredients: [
            { item: 'Firm tofu, crumbled', quantity: 200, unit: 'g' },
            { item: 'Nutritional yeast', quantity: 2, unit: 'tbsp' },
            { item: 'Turmeric', quantity: 0.5, unit: 'tsp' },
            { item: 'Black salt (kala namak)', quantity: 0.25, unit: 'tsp' },
            { item: 'Spinach', quantity: 50, unit: 'g' }
        ],
        instructions: [
            'Press the tofu to remove excess water, then crumble it into a bowl.',
            'Heat a non-stick pan over medium heat. Add the crumbled tofu and cook for 5-7 minutes, stirring occasionally, until it starts to dry out and brown slightly.',
            'Stir in the nutritional yeast, turmeric, and black salt (this gives it an "eggy" flavor).',
            'Add the spinach and cook for another 1-2 minutes until it has wilted. Serve hot.'
        ]
    },
    {
        id: 'vegan_chickpea_quinoa_salad',
        name: 'Mediterranean Chickpea & Quinoa Salad',
        core_ingredients: ['quinoa', 'chickpea', 'cucumber'],
        meal_type: ['lunch', 'dinner'],
        diet_tags: ['vegan', 'vegetarian'],
        allergy_tags: ['gluten_free', 'dairy_free'],
        goal_tags: ['recomp', 'maintenance'],
        convenience_tags: ['meal_prep_friendly', 'no_cook'],
        prep_time: 15,
        macros: { calories: 540, protein: 22, carbs: 70, fat: 20, fiber: 18 },
        ingredients: [
            { item: 'Quinoa (cooked)', quantity: 150, unit: 'g' },
            { item: 'Canned chickpeas, rinsed', quantity: 200, unit: 'g' },
            { item: 'Cucumber, diced', quantity: 100, unit: 'g' },
            { item: 'Cherry tomatoes, halved', quantity: 100, unit: 'g' },
            { item: 'Olive oil', quantity: 15, unit: 'ml' },
            { item: 'Lemon juice', quantity: 2, unit: 'tbsp' },
            { item: 'Dried oregano', quantity: 0.5, unit: 'tsp' }
        ],
        instructions: [
            'In a large bowl, combine the cooked quinoa, rinsed chickpeas, diced cucumber, and halved cherry tomatoes.',
            'In a small bowl, whisk together the olive oil, lemon juice, dried oregano, salt, and pepper to create a dressing.',
            'Pour the dressing over the salad and toss well to combine.',
            'Let it sit for at least 10 minutes for the flavors to meld before serving.'
        ],
        prep_tip: 'This salad tastes even better the next day. Make a large batch for easy lunches.',
        variants: [
            { name: 'Creamy Paprika', adds: '2 tbsp hummus, 1/2 tsp smoked paprika' },
            { name: 'Spicy Kick', adds: '1 tsp sriracha, 1 tbsp sunflower seeds' }
        ]
    },
    {
        id: 'vegan_lentil_walnut_tacos',
        name: 'Lentil & Walnut Tacos',
        core_ingredients: ['lentil', 'walnut', 'salsa'],
        meal_type: ['dinner'],
        diet_tags: ['vegan', 'vegetarian'],
        allergy_tags: ['gluten_free', 'dairy_free'],
        goal_tags: ['maintenance', 'recomp'],
        convenience_tags: ['quick_meal'],
        prep_time: 20,
        macros: { calories: 500, protein: 20, carbs: 55, fat: 22, fiber: 15 },
        ingredients: [
            { item: 'Brown lentils, cooked', quantity: 150, unit: 'g' },
            { item: 'Walnuts, finely chopped', quantity: 40, unit: 'g' },
            { item: 'Taco seasoning', quantity: 1, unit: 'tbsp' },
            { item: 'Corn tortillas or lettuce cups', quantity: 3, unit: 'units' },
            { item: 'Salsa', quantity: 2, unit: 'tbsp' }
        ],
        instructions: [
            'In a dry non-stick pan over medium heat, toast the chopped walnuts for 2-3 minutes until they become fragrant. Be careful not to burn them.',
            'Add the cooked lentils, taco seasoning, and 2-3 tablespoons of water to the pan. Stir to combine and heat through for about 5 minutes.',
            'Warm your tortillas or prepare your lettuce cups.',
            'Fill with the lentil-walnut "meat" and top with your favorite salsa and sliced avocado.'
        ]
    },
    {
        id: 'vegan_hummus_wrap',
        name: '10-Minute Hummus & Veggie Wrap',
        core_ingredients: ['hummus', 'spinach', 'carrot'],
        meal_type: ['lunch'],
        diet_tags: ['vegan', 'vegetarian'],
        allergy_tags: [],
        goal_tags: ['fat_loss', 'maintenance'],
        convenience_tags: ['no_cook', 'under_15_min', 'budget_friendly'],
        prep_time: 10,
        macros: { calories: 450, protein: 18, carbs: 60, fat: 15, fiber: 12 },
        ingredients: [
            { item: 'Whole wheat tortilla', quantity: 1, unit: 'large' },
            { item: 'Hummus', quantity: 4, unit: 'tbsp' },
            { item: 'Spinach', quantity: 1, unit: 'large handful' },
            { item: 'Shredded carrots', quantity: 50, unit: 'g' },
            { item: 'Cucumber, sliced', quantity: 50, unit: 'g' }
        ],
        instructions: [
            'Lay the tortilla flat and spread a thick, even layer of hummus over it, leaving a small border around the edge.',
            'Layer the spinach leaves, shredded carrots, and cucumber slices on one half of the tortilla.',
            'Tightly roll up the tortilla, tucking in the sides as you go if desired.',
            'Slice the wrap in half diagonally and serve immediately.'
        ]
    },

    // --- SNACKS & DESSERTS (Universal) ---
    {
        id: 'snack_protein_oats',
        name: 'Quick Protein Oatmeal',
        core_ingredients: ['oat', 'protein powder', 'berry'],
        meal_type: ['breakfast', 'snack'],
        diet_tags: ['omnivore', 'pescatarian', 'vegetarian', 'vegan'],
        allergy_tags: ['dairy_free'],
        goal_tags: ['muscle_gain', 'pre_workout'],
        convenience_tags: ['quick_meal', 'under_15_min', 'calorie_dense'],
        prep_time: 5,
        macros: { calories: 450, protein: 35, carbs: 55, fat: 12, fiber: 10 },
        ingredients: [
            { item: 'Rolled oats', quantity: 50, unit: 'g' },
            { item: 'Protein powder (whey or vegan)', quantity: 30, unit: 'g' },
            { item: 'Water or milk of choice', quantity: 250, unit: 'ml' },
            { item: 'Berries', quantity: 50, unit: 'g' }
        ],
        instructions: [
            'Combine oats and water/milk in a microwave-safe bowl. Cook for 90-120 seconds, stirring halfway through.',
            'Once cooked, immediately stir in the protein powder until it is fully dissolved and the oatmeal is creamy.',
            'Top with your favorite berries and serve.'
        ]
    },
    {
        id: 'snack_grilled_peach_yogurt',
        name: 'Grilled Peach with Yogurt & Cinnamon',
        core_ingredients: ['peach', 'yogurt'],
        meal_type: ['snack', 'dessert'],
        diet_tags: ['omnivore', 'pescatarian', 'vegetarian'],
        allergy_tags: ['gluten_free'],
        goal_tags: ['fat_loss', 'maintenance'],
        convenience_tags: ['quick_meal'],
        season: ['summer'],
        prep_time: 10,
        macros: { calories: 250, protein: 15, carbs: 35, fat: 5, fiber: 5 },
        ingredients: [
            { item: 'Peach', quantity: 1, unit: 'large' },
            { item: 'Plain Greek yogurt', quantity: 150, unit: 'g' },
            { item: 'Cinnamon', quantity: 0.25, unit: 'tsp' }
        ],
        instructions: [
            'Preheat a grill pan or outdoor grill to medium heat.',
            'Halve the peach and remove the pit.',
            'Grill the peach halves, cut-side down, for 3-4 minutes until they are soft and have developed grill marks.',
            'Serve the warm peach halves with a large dollop of Greek yogurt and a sprinkle of cinnamon.'
        ],
        prep_tip: 'This can be made with a vegan yogurt alternative like coconut or soy yogurt.'
    },
    {
        id: 'snack_cherry_protein_shake',
        name: 'Cherry & Spinach Protein Shake',
        core_ingredients: ['protein powder', 'cherry', 'spinach'],
        meal_type: ['snack', 'post_workout'],
        diet_tags: ['omnivore', 'pescatarian', 'vegetarian', 'vegan'],
        allergy_tags: ['gluten_free', 'dairy_free'],
        goal_tags: ['muscle_gain', 'recomp'],
        convenience_tags: ['quick_meal', 'under_15_min', 'calorie_dense'],
        season: ['summer'],
        prep_time: 5,
        macros: { calories: 380, protein: 35, carbs: 45, fat: 5, fiber: 8 },
        ingredients: [
            { item: 'Protein powder (whey or vegan)', quantity: 30, unit: 'g' },
            { item: 'Frozen cherries', quantity: 150, unit: 'g' },
            { item: 'Spinach', quantity: 1, unit: 'large handful' },
            { item: 'Water or milk of choice', quantity: 300, unit: 'ml' }
        ],
        instructions: [
            'Combine the protein powder, frozen cherries, spinach, and your choice of liquid in a blender.',
            'Blend on high for 30-60 seconds until the mixture is completely smooth.',
            'Add more liquid if it is too thick for your liking, and blend again briefly.'
        ]
    }
];
