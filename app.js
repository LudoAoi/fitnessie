// --- SECTION 1: STATE & CONFIGURATION ---
let workoutPlan = {};
let currentTab;
let chartInstances = {};
let currentOnboardingStep = 1;
let timerInterval = null;
let currentRecipeForModal = null;
let currentServings = 1;

// Import data from exercises.js and nutrition.js
import { equipmentPriority, exerciseLibrary, recoveryRoutineLibrary, icons, contraindications } from './exercises.js';
import { recipeLibrary } from './nutrition.js';

// --- SECTION 3: STATE MANAGEMENT ---
function saveState() {
    try {
        localStorage.setItem('fitnessAppPlan_v18', JSON.stringify(workoutPlan));
    } catch (e) {
        console.error("Failed to save state:", e);
    }
}
function loadState() {
    const p = localStorage.getItem('fitnessAppPlan_v18');
    if(p){
        try {
            workoutPlan = JSON.parse(p);
            if (workoutPlan && workoutPlan.userProfile && workoutPlan.days) {
                return true;
            }
        } catch (e) {
            console.error("Failed to parse state:", e);
            localStorage.removeItem('fitnessAppPlan_v18');
            return false;
        }
    }
    return false;
}

// --- SECTION 4: ONBOARDING & PLAN GENERATION ---
function handleOnboardingSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());
    
    userData.equipment = formData.getAll('equipment');
    userData.limitations = formData.getAll('limitations');
    userData.restrictions = formData.getAll('restrictions'); 
    userData.dietary_pattern = formData.getAll('dietary_pattern'); 
    userData.physiqueGoals = formData.getAll('physiqueGoals');
    
    Object.keys(userData).forEach(key => {
        if (['age', 'weight', 'height', 'fat_percent', 'muscle_percent', 'training_days', 'max_squats', 'max_pushups', 'max_pullups', 'cycle_length'].includes(key)) {
            userData[key] = parseFloat(userData[key]) || 0;
        }
    });
    workoutPlan = generateInitialPlan(userData);
    saveState();
    closeModal('onboarding-modal');
    runApp();
}

function generateInitialPlan(userData) {
    const plan = {
        userProfile: { ...userData, badges: [] },
        week: 1,
        days: {},
        photos: { first: null, last: null },
        measurements: [],
        history: [],
        currentBlockLifts: {},
        weeklyIngredientBasket: []
    };
    return generateWeeklyPlan(plan);
}

function analyzeWeeklyPerformance(planHistory, currentBlockLifts, week) {
    const deloadExercises = [];
    if (!planHistory || week <= 1) return deloadExercises;

    const lastWeekHistory = planHistory.filter(log => log.week === week - 1);

    Object.values(currentBlockLifts).forEach(liftId => {
        const liftLogs = lastWeekHistory.filter(log => log.id === liftId);
        if (liftLogs.length === 0) return;

        const exerciseDetails = findExerciseById(liftId);
        if (!exerciseDetails || !exerciseDetails.target || exerciseDetails.target.toFailure) return;

        const minReps = exerciseDetails.target.minReps;
        let failureCount = 0;

        liftLogs.forEach(log => {
            if (log.reps && log.reps[0] < minReps) {
                failureCount++;
            }
        });

        if (failureCount >= 2) {
            deloadExercises.push(liftId);
        }
    });

    return deloadExercises;
}


function generateWeeklyPlan(basePlan, checkinData = {}) {
    const { userProfile, week, history, currentBlockLifts } = basePlan;
    const plan = structuredClone(basePlan);
    plan.userProfile = { ...userProfile, ...checkinData.updatedStats };
    
    const deloadExercises = analyzeWeeklyPerformance(history, currentBlockLifts, week);

    if (week === 1 || (week - 1) % 4 === 0) {
        plan.currentBlockLifts = selectPrimaryLiftsForBlock(plan.userProfile);
        plan.weeklyIngredientBasket = generateWeeklyBasket(plan.userProfile);
    }

    const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const workoutDays = getWorkoutSplit(plan.userProfile.training_days);
    let workoutDayIndex = 0;
    
    for (const day of dayNames) {
        const { targets, meals } = generateDynamicMealPlan(plan.userProfile, plan.weeklyIngredientBasket, checkinData);
        const nutrition = { title: "Daily Nutrition Plan", targets, meals };
        const dayPlan = { diet: nutrition, sessions: [], completed: false };

        if (workoutDays.includes(day)) {
            const focus = checkinData.focus && checkinData.focus !== 'None' ? [checkinData.focus] : [];
            const { title, sessions } = getWorkoutForDay(day, workoutDayIndex, plan, deloadExercises, focus);
            dayPlan.title = title;
            dayPlan.sessions = sessions;
            workoutDayIndex++;
        } else {
            dayPlan.title = "Active Recovery";
            const recoveryRoutine = getBestExerciseFor('Mobility', plan.userProfile);
            const lissCardio = getBestExerciseFor('Cardio', plan.userProfile);
            dayPlan.sessions = [
                { id: `${day}_s1`, name: recoveryRoutine.content, exercises: [structuredClone(recoveryRoutine)] },
                { id: `${day}_s2`, name: "Low-Intensity Cardio", exercises: [structuredClone(lissCardio)] }
            ];
        }
        plan.days[day] = dayPlan;
    }
    
    if (deloadExercises.length > 0) {
        const deloadedExerciseNames = deloadExercises.map(id => findExerciseById(id)?.content).join(', ');
        plan.deloadMessage = `Based on last week's logs, I've adjusted the starting weight for ${deloadedExerciseNames}. This will help us nail down perfect form and build momentum for the weeks ahead.`;
    }

    return plan;
}

function calculateAdjustedReps(baseWeight, baseReps, newWeight) {
    if (newWeight <= 0 || baseWeight <= 0) return baseReps;
    const repMultiplier = baseWeight / newWeight;
    let adjustedReps = Math.round(baseReps * repMultiplier);
    return Math.max(3, Math.min(30, adjustedReps));
}

function calculateError(recipeMacros, targetMacros) {
    const calError = Math.abs(recipeMacros.calories - targetMacros.calories);
    const protError = Math.abs(recipeMacros.protein - targetMacros.protein) * 4;
    const carbError = Math.abs(recipeMacros.carbs - targetMacros.carbs) * 1.5;
    const fatError = Math.abs(recipeMacros.fat - targetMacros.fat) * 2;
    return calError + protError + carbError + fatError;
}

function generateWeeklyBasket(userProfile) {
    const { diet_preference, restrictions = [] } = userProfile;
    
    let availableRecipes = recipeLibrary.filter(recipe => {
        const hasDietTag = recipe.diet_tags.includes(diet_preference);
        const hasNoAllergens = !recipe.allergy_tags.some(tag => restrictions.includes(tag));
        return hasDietTag && hasNoAllergens && recipe.core_ingredients;
    });

    if (availableRecipes.length < 10) {
        console.warn("Low recipe variety for this diet. Skipping weekly basket for more options.");
        return [];
    }

    const proteinSources = ['chicken', 'beef', 'salmon', 'tuna', 'cod', 'egg', 'tofu', 'lentil', 'chickpea', 'black bean'];
    const ingredientFrequency = {};

    availableRecipes.forEach(recipe => {
        recipe.core_ingredients.forEach(ing => {
            ingredientFrequency[ing] = (ingredientFrequency[ing] || 0) + 1;
        });
    });

    const availableProteins = Object.keys(ingredientFrequency)
        .filter(ing => proteinSources.includes(ing))
        .sort((a, b) => ingredientFrequency[b] - ingredientFrequency[a]);
    
    const selectedProteins = availableProteins.slice(0, 2);

    const otherStaples = Object.keys(ingredientFrequency)
        .filter(ing => !proteinSources.includes(ing))
        .sort((a, b) => ingredientFrequency[b] - ingredientFrequency[a]);

    const selectedStaples = otherStaples.slice(0, 5);
    
    const finalBasket = [...new Set([...selectedProteins, ...selectedStaples])];
    return finalBasket;
}


function generateDynamicMealPlan(userData, weeklyIngredientBasket, checkinData = {}) {
    const { weight, height, age, assigned_sex, goal, training_days, diet_preference, fat_percent, restrictions = [], dietary_pattern = [] } = userData;
    
    let bmr;
    if (fat_percent && fat_percent > 0) {
        const leanBodyMass = weight * (1 - (fat_percent / 100));
        bmr = 370 + (21.6 * leanBodyMass);
    } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + (assigned_sex === 'male' ? 5 : -161);
    }
    const tdee = bmr * ({ 3: 1.375, 4: 1.55, 5: 1.55 }[training_days] || 1.2);
    let targetCalories = tdee + ({ lose_fat: -400, gain_muscle: 300, recomp: 0, maintain: 0 }[goal] || 0);

    if (checkinData.hunger_level && goal === 'fat_loss' && checkinData.hunger_level >= 4) { targetCalories += 100; }
    if (checkinData.hunger_level && goal === 'gain_muscle' && checkinData.hunger_level <= 2) { targetCalories += 150; }
    targetCalories = Math.round(targetCalories / 10) * 10;
    
    const targetProtein = Math.round(weight * 1.8);
    const targetFat = Math.round((targetCalories * 0.25) / 9);
    const targetCarbs = Math.round((targetCalories - (targetProtein * 4) - (targetFat * 9)) / 4);
    const finalTargets = { calories: targetCalories, protein: targetProtein, carbs: targetCarbs, fat: targetFat };

    let baseCandidatePool = recipeLibrary.filter(recipe => {
        let dietMatch = false;
        if (diet_preference === 'flexitarian') {
            dietMatch = ['omnivore', 'pescatarian', 'vegetarian', 'vegan'].some(tag => recipe.diet_tags.includes(tag));
        } else {
            dietMatch = recipe.diet_tags.includes(diet_preference);
        }
        if (!dietMatch) return false;

        const hasRestriction = restrictions.some(restriction => {
            if (restriction === 'no_pork' && recipe.name.toLowerCase().includes('pork')) return true;
            if (restriction === 'no_red_meat' && (recipe.name.toLowerCase().includes('beef') || recipe.name.toLowerCase().includes('lamb'))) return true;
            if (restriction === 'no_shellfish' && recipe.name.toLowerCase().includes('shrimp')) return true;
            return recipe.allergy_tags.includes(restriction);
        });
        if (hasRestriction) return false;
        
        if (dietary_pattern.includes('kosher')) {
            const hasPork = recipe.name.toLowerCase().includes('pork');
            const hasShellfish = recipe.name.toLowerCase().includes('shrimp');
            const mixesMeatAndDairy = recipe.core_ingredients.includes('beef') && recipe.core_ingredients.includes('yogurt');
            if (hasPork || hasShellfish || mixesMeatAndDairy) return false;
        }
        if (dietary_pattern.includes('halal')) {
             if (recipe.name.toLowerCase().includes('pork')) return false;
        }

        return true;
    });

    if (dietary_pattern.length > 0) {
        baseCandidatePool.sort((a, b) => {
            const aHasPattern = dietary_pattern.some(p => a.diet_tags.includes(p));
            const bHasPattern = dietary_pattern.some(p => b.diet_tags.includes(p));
            return (bHasPattern - aHasPattern);
        });
    }
    
    let candidatePool = baseCandidatePool;

    if (weeklyIngredientBasket && weeklyIngredientBasket.length > 0) {
        let basketFilteredPool = baseCandidatePool.filter(recipe => 
            recipe.core_ingredients && recipe.core_ingredients.every(ing => weeklyIngredientBasket.includes(ing))
        );

        if (basketFilteredPool.length < 10) {
            console.warn("Weekly basket resulted in too few recipes. Using a wider selection for this week.");
        } else {
            candidatePool = basketFilteredPool;
        }
    }
    
    if (goal === 'gain_muscle' && checkinData.adherence_rating && checkinData.adherence_rating <= 2) {
        candidatePool.sort((a, b) => (b.convenience_tags.includes('calorie_dense') ? 1 : -1) - (a.convenience_tags.includes('calorie_dense') ? 1 : -1));
    } else if (checkinData.adherence_rating && checkinData.adherence_rating <= 2) {
        candidatePool.sort((a, b) => (b.convenience_tags.includes('quick_meal') ? 1 : -1));
    }

    let remainingMacros = { ...finalTargets };
    const meals = { breakfast: null, lunch: null, dinner: null, snack: null };
    const mealTypesToSelect = ['breakfast', 'lunch', 'dinner'];

    for (const mealType of mealTypesToSelect) {
        let mealPool = candidatePool.filter(r => r.meal_type.includes(mealType));
        if (mealPool.length === 0) continue;
        
        mealPool.sort((a, b) => calculateError(a.macros, remainingMacros) - calculateError(b.macros, remainingMacros));
        const bestMeal = mealPool[0];
        meals[mealType] = bestMeal;
        
        candidatePool = candidatePool.filter(r => r.id !== bestMeal.id);
        
        remainingMacros.calories -= bestMeal.macros.calories;
        remainingMacros.protein -= bestMeal.macros.protein;
        remainingMacros.carbs -= bestMeal.macros.carbs;
        remainingMacros.fat -= bestMeal.macros.fat;
    }

    if (remainingMacros.calories > 150) {
        let snackPool = baseCandidatePool.filter(r => r.meal_type.includes('snack'));
        
        if (snackPool.length > 0) {
            snackPool.sort((a, b) => calculateError(a.macros, remainingMacros) - calculateError(b.macros, remainingMacros));
            meals.snack = snackPool[0];
        }
    }
    return { targets: finalTargets, meals: meals };
}

function getFitnessLevel(userData) { const { max_pushups, max_pullups } = userData; if (max_pushups < 10 && max_pullups < 1) return 'beginner'; if (max_pushups < 25 && max_pullups < 8) return 'intermediate'; return 'advanced'; }
function getWorkoutSplit(trainingDays) { if (trainingDays == 3) return ['monday', 'wednesday', 'friday']; if (trainingDays == 4) return ['monday', 'tuesday', 'thursday', 'friday']; if (trainingDays == 5) return ['monday', 'tuesday', 'thursday', 'friday', 'saturday']; return ['monday', 'wednesday', 'friday']; }

function getWorkoutForDay(day, dayIndex, plan, deloadExercises = [], focusMuscles = []) {
    const { userProfile, currentBlockLifts } = plan;
    const { training_days, goal, trainingIntensity, hormoneProfile, last_period_date, cycle_length, sessionDuration } = userProfile;

    const splits = {
        3: [{ title: "Full Body A", primary: ['Legs', 'Chest'], secondary: ['Back', 'Arms', 'Core'] }, { title: "Full Body B", primary: ['Back', 'Shoulders'], secondary: ['Legs', 'Glutes', 'Core'] }, { title: "Full Body C", primary: ['Chest', 'Legs'], secondary: ['Back', 'Arms', 'HIIT'] }],
        4: [{ title: "Upper Body A", primary: ['Chest', 'Back'], secondary: ['Shoulders', 'Arms'] }, { title: "Lower Body A", primary: ['Legs', 'Glutes'], secondary: ['Hamstrings', 'Core', 'HIIT'] }, { title: "Upper Body B", primary: ['Shoulders', 'Back'], secondary: ['Chest', 'Arms'] }, { title: "Lower Body B", primary: ['Hamstrings', 'Legs'], secondary: ['Glutes', 'Core', 'HIIT'] }],
        5: [{ title: "Push Day", primary: ['Chest', 'Shoulders'], secondary: ['Arms', 'Core'] }, { title: "Pull Day", primary: ['Back'], secondary: ['Arms'] }, { title: "Leg Day", primary: ['Legs', 'Glutes'], secondary: ['Hamstrings', 'HIIT'] }, { title: "Upper Body", primary: ['Chest', 'Back'], secondary: ['Shoulders', 'Arms'] }, { title: "Full Body", primary: ['Legs', 'Chest', 'Back'], secondary: ['Core', 'HIIT'] }]
    };
    const split = splits[training_days] || splits[3];
    const dayWorkout = split[dayIndex % split.length];
    
    let mainLifts = dayWorkout.primary.map(group => getBestExerciseFor(group, userProfile)).filter(Boolean);
    let accessoryLifts = dayWorkout.secondary.map(group => getBestExerciseFor(group, userProfile, true, focusMuscles.includes(group))).filter(Boolean);
    
    if (sessionDuration === 'quick') {
        accessoryLifts = accessoryLifts.slice(0, 1); // Reduce accessories
    } else if (sessionDuration === 'extended') {
        const extraAccessory = getBestExerciseFor(dayWorkout.secondary[0], userProfile, true);
        if (extraAccessory) accessoryLifts.push(extraAccessory);
    }
    
    const allNewExercises = [...mainLifts, ...accessoryLifts];

    const previousWeekDayPlan = plan.history.filter(h => h.week === plan.week - 1 && h.day === day);
    if (previousWeekDayPlan.length > 0) {
        allNewExercises.forEach(newEx => {
            const prevExLogs = previousWeekDayPlan.filter(p => p.id === newEx.id);
            if (prevExLogs.length > 0 && newEx.type === 'log' && !newEx.target.toFailure) {
                const lastLog = prevExLogs[prevExLogs.length - 1];
                const allSetsMetMaxReps = lastLog.reps.every(rep => rep >= newEx.target.maxReps);
                
                if (allSetsMetMaxReps) {
                   newEx.weight = lastLog.weight + 2.5; 
                } else {
                   newEx.weight = lastLog.weight;
                }
            }
        });
    }

    let cycleDay = null;
    if (hormoneProfile === 'track_cycle' && last_period_date && cycle_length) {
        const startDate = new Date(last_period_date);
        const today = new Date();
        const diffTime = Math.abs(today - startDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        cycleDay = (diffDays % cycle_length) + 1;
    }

    allNewExercises.forEach((ex, index) => {
        if (ex.type !== 'log') return;

        if (deloadExercises.includes(ex.id)) {
            ex.weight = Math.round((ex.weight * 0.9) / 2.5) * 2.5;
        }
        
        const isMainLift = index < mainLifts.length;
        
        if (cycleDay && cycleDay >= 15) { 
            if (isMainLift) {
                ex.target.sets = Math.max(1, ex.target.sets - 1);
            }
            if (ex.tags && ex.tags.includes('hiit')) {
                const lissCardio = getBestExerciseFor('Cardio', userProfile);
                if (lissCardio) {
                    allNewExercises[index] = lissCardio;
                }
            }
        }

        switch (trainingIntensity) {
            case 'casual':
                ex.target.sets = Math.max(1, ex.target.sets - 1);
                ex.target.toFailure = false;
                break;
            case 'intense':
                if (isMainLift && (!cycleDay || cycleDay < 15)) {
                    ex.target.sets += 1;
                }
                const isFinalAccessory = index === allNewExercises.length - 1 && !isMainLift;
                if (isFinalAccessory) {
                    ex.target.toFailure = true;
                }
                break;
            case 'standard':
            default:
                break;
        }
    });
    
    const mainMovementPatterns = mainLifts.map(ex => ex.movementPattern);
    const warmups = getDynamicWarmup(mainMovementPatterns, userProfile);
    const cooldowns = getDynamicItems('Cooldown', mainMovementPatterns, userProfile);

    let finalSessions = [];
    if (sessionDuration === 'quick') {
        finalSessions.push({ id: `day${dayIndex}_s0`, name: "Warm-up", exercises: warmups });
        const supersetA = [mainLifts[0], accessoryLifts[0]].filter(Boolean);
        const supersetB = [mainLifts[1], accessoryLifts[1]].filter(Boolean);
        if(supersetA.length > 0) finalSessions.push({ id: `day${dayIndex}_s1`, name: "Superset A", exercises: supersetA });
        if(supersetB.length > 0) finalSessions.push({ id: `day${dayIndex}_s2`, name: "Superset B", exercises: supersetB });
        finalSessions.push({ id: `day${dayIndex}_s4`, name: "Cool-down", exercises: cooldowns });
    } else {
        finalSessions = [
            { id: `day${dayIndex}_s0`, name: "Warm-up", exercises: warmups },
            { id: `day${dayIndex}_s1`, name: "Main Lifts", exercises: mainLifts },
            { id: `day${dayIndex}_s2`, name: "Accessory Lifts", exercises: accessoryLifts },
            { id: `day${dayIndex}_s4`, name: "Cool-down", exercises: cooldowns }
        ];
    }

    return { title: dayWorkout.title, sessions: finalSessions };
}

function getBestExerciseFor(muscleGroup, userData, isAccessory = false, isFocus = false) {
    const { equipment, limitations = [], training_environment, goal, trainingIntensity, physiqueGoals = [] } = userData;
    
    const allowedDifficulties = {
        casual: ['beginner'],
        standard: ['beginner', 'intermediate'],
        intense: ['beginner', 'intermediate', 'advanced']
    }[trainingIntensity];

    const groupExercises = exerciseLibrary[muscleGroup];
    if (!groupExercises) return null;
    
    let allCandidates = [];
    Object.values(groupExercises).flat().forEach(ex => {
        const environmentMatch = ex.environment === 'all' || ex.environment === training_environment;
        const equipmentMatch = ex.requires.every(req => equipment.includes(req));
        const difficultyMatch = allowedDifficulties.includes(ex.difficulty);
        
        const hasLimitationConflict = limitations.some(lim => ex.ability_tags && ex.ability_tags.includes(lim));

        if (environmentMatch && equipmentMatch && difficultyMatch && !hasLimitationConflict) {
           allCandidates.push(structuredClone(ex));
        }
    });

    if(allCandidates.length === 0) {
        const adaptiveCandidates = Object.values(exerciseLibrary.Adaptive || {}).flat().filter(ex => {
            const equipmentMatch = ex.requires.every(req => equipment.includes(req));
            const hasLimitationConflict = limitations.some(lim => ex.ability_tags && ex.ability_tags.includes(lim));
            return equipmentMatch && !hasLimitationConflict;
        });
        if (adaptiveCandidates.length > 0) return shuffleArray(adaptiveCandidates)[0];
        return null;
    }

    if (isAccessory && physiqueGoals.length > 0) {
        allCandidates.forEach(ex => {
            ex.focusScore = 0;
            if (ex.purpose_tags) {
                physiqueGoals.forEach(pGoal => {
                    if (ex.purpose_tags.includes(pGoal)) {
                        ex.focusScore += 1;
                    }
                });
            }
        });
        allCandidates.sort((a, b) => b.focusScore - a.focusScore);
    }

    if (goal === 'gain_muscle' || goal === 'recomp') {
        allCandidates.forEach(ex => {
            const scores = ex.requires.map(req => equipmentPriority[req] || 0);
            ex.score = Math.max(...scores);
        });
        
        allCandidates.sort((a, b) => b.score - a.score);
        const topScore = allCandidates[0].score;
        const topTierExercises = allCandidates.filter(ex => ex.score === topScore);
        return shuffleArray(topTierExercises)[0];
    }

    return shuffleArray(allCandidates)[0];
}

// --- SECTION 5: UI RENDERING ---
function openTab(tabId) {
    currentTab = tabId;
    const mainGrid = document.getElementById('main-content-grid');
    const workoutColumn = document.getElementById('workout-column');
    const nutritionColumn = document.getElementById('nutrition-column');

    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`.nav-btn[data-tab-id="${tabId}"]`)?.classList.add('active');
    const titleEl = document.getElementById('main-title');
    const dayData = workoutPlan.days[tabId];

    if (dayData && dayData.title) {
        titleEl.textContent = dayData.title;
        mainGrid.className = 'grid grid-cols-1 lg:grid-cols-3 lg:gap-8';
        workoutColumn.className = 'lg:col-span-2 space-y-8';
        nutritionColumn.className = 'hidden lg:block space-y-8';
        renderDay(tabId);
    } else if (tabId === 'check-in' || tabId === 'progress') {
        titleEl.textContent = tabId === 'check-in' ? "Weekly Check-in & Progress" : "Your Progress Dashboard";
        mainGrid.className = 'grid grid-cols-1';
        workoutColumn.className = 'lg:col-span-1 space-y-8';
        nutritionColumn.className = 'hidden';
        if (tabId === 'check-in') renderCheckInTab();
        else renderProgressTab();
    }
}

function renderDay(day) {
    const dayData = workoutPlan.days[day];
    const workoutContainer = document.getElementById('workout-column');
    const nutritionContainer = document.getElementById('nutrition-column');
    if (!dayData) { workoutContainer.innerHTML = ''; nutritionContainer.innerHTML = ''; return; }
    
    const diet = dayData.diet;
    if (diet && diet.meals) {
        const mealCardsHtml = Object.entries(diet.meals).map(([mealType, recipe]) => {
            if (!recipe) return '';
            return `
                <div class="p-4 bg-gray-50 rounded-lg mt-3">
                    <h4 class="font-bold capitalize">${mealType}</h4>
                    <p>${recipe.name}</p>
                    <p class="text-xs text-gray-500">${recipe.macros.calories} kcal | P:${recipe.macros.protein}g C:${recipe.macros.carbs}g F:${recipe.macros.fat}g</p>
                    <button class="text-sm text-amber-600 hover:underline mt-1" data-action="view-recipe" data-recipe-id="${recipe.id}">View Recipe</button>
                </div>
            `;
        }).join('');
        const targetsHtml = `<p><strong>Target:</strong> ~${diet.targets.calories} kcal | P:${diet.targets.protein}g C:${diet.targets.carbs}g F:${diet.targets.fat}g</p>`;
        nutritionContainer.innerHTML = `
            <div class="card sticky top-24">
                <h3 class="text-xl font-bold mb-4 flex items-center gap-3">${icons.diet} ${diet.title}</h3>
                <div class="space-y-3">
                    ${targetsHtml}
                    <hr class="my-2 border-gray-200">
                    ${mealCardsHtml}
                </div>
            </div>
        `;
    }

    const sessionsHtml = dayData.sessions.map((s, sIdx) => {
        if(s.exercises.length === 0) return '';
        
        if (s.exercises[0].routine) {
            const recoveryEx = s.exercises[0];
            const routine = recoveryRoutineLibrary[recoveryEx.routine];
            const recoveryHtml = routine ? routine.map(pose => `
                <div class="flex items-center justify-between py-2 border-b last:border-b-0">
                    <p class="font-semibold text-gray-800">${pose.pose}</p>
                    <p class="text-sm text-gray-500">${pose.duration}s</p>
                </div>`).join('') : `<p>${recoveryEx.content} - ${recoveryEx.details}</p>`;
            return `<div class="card"><h3 class="text-2xl font-bold mb-2">${s.name}</h3><p class="text-sm text-gray-500 mb-4">${recoveryEx.description || ''}</p><div class="space-y-2">${recoveryHtml}</div></div>`;
        }
        
        let supersetInstruction = '';
        if (s.name.toLowerCase().includes('superset')) {
            supersetInstruction = `<p class="text-sm text-gray-600 mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg"><strong>Superset Instructions:</strong> Perform one set of the first exercise, rest for 30-45 seconds, then perform one set of the second exercise. Rest for 60-90 seconds before repeating the pair for the total number of sets.</p>`;
        }

        const exercisesHtml = s.exercises.map((ex, eIdx) => {
            const isCompleted = ex.completed ? 'completed' : '';
            let targetHtml = '';
            let actionHtml = '';
            let infoButtonHtml = ex.description ? `<button class="text-gray-400 hover:text-gray-800" data-action="toggle-description">${icons.info}</button>` : '';

            if (ex.type === 'log') {
                let targetText = '';
                if (ex.target.toFailure) {
                    targetText = `${ex.target.sets} sets to failure`;
                } else if (ex.target.timeInSeconds) {
                    targetText = `${ex.target.sets} x ${ex.target.timeInSeconds}s`;
                } else {
                    targetText = `${ex.target.sets}x${ex.target.minReps}-${ex.target.maxReps}`;
                }
                
                targetHtml = `<div class="mt-2 p-3 bg-gray-100 rounded-lg text-sm"><p class="font-semibold" id="target-text-${day}-${sIdx}-${eIdx}">Target: ${targetText} ${ex.weight > 0 ? `@ ${ex.weight}kg` : ''}</p></div>`;
                
                const repInputs = Array.from({ length: ex.target.sets }, (_, i) => {
                    const isLastSet = i === ex.target.sets - 1;
                    const placeholder = `Set ${i+1}${isLastSet && ex.target.toFailure ? ' (AMRAP)' : ''}`;
                    return `<div class="flex-1 min-w-[60px]"><input type="number" class="log-input" placeholder="${placeholder}"></div>`;
                }).join('');

                const weightInputHtml = ex.weight > 0 || (!ex.requires.includes('bodyweight') && ex.requires.length > 0)
                    ? `<div class="max-w-[150px]"><label class="text-xs text-gray-500 mb-1 block">Weight (kg)</label><input type="number" class="log-input weight-input" value="${ex.weight}"></div>`
                    : '';

                actionHtml = `<div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="text-xs text-gray-500 mb-1 block">Reps / Time (s)</label><div class="flex flex-wrap gap-2">${repInputs}</div></div>${weightInputHtml}</div>`;
            } else if (ex.type === 'timer') {
                actionHtml = `<div class="mt-4"><button class="secondary-btn w-full" data-action="start-timer" data-day="${day}" data-session-index="${sIdx}" data-ex-index="${eIdx}">Start Timer</button></div>`;
            } else if (ex.type === 'info') {
                actionHtml = `<div class="mt-2 text-left space-y-2 text-gray-600">${ex.description.split('. ').map(s => `<p>${s}.</p>`).join('')}</div>`;
            }

            return `<div class="exercise-item flex gap-4 py-6 border-b border-gray-200 last:border-b-0 ${isCompleted}" data-day="${day}" data-session-index="${sIdx}" data-ex-index="${eIdx}" data-ex-id="${ex.id}">
                <div class="text-amber-500 pt-1">${icons.log}</div>
                <div class="flex-grow">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="font-semibold text-gray-800 content text-lg">${ex.content}</p>
                            <p class="text-sm text-gray-500">${ex.details || ''}</p>
                        </div>
                        <div class="flex items-center gap-2">
                            ${infoButtonHtml}
                            ${ex.type === 'log' ? `<button class="text-gray-400 hover:text-gray-800" data-action="show-history">${icons.history}</button>` : ''}
                            ${ex.type === 'log' ? `<button class="text-gray-400 hover:text-gray-800" data-action="show-swap">${icons.swap}</button>` : ''}
                            <input type="checkbox" class="ml-2" data-action="toggle-complete" ${ex.completed ? 'checked' : ''}>
                        </div>
                    </div>
                    ${targetHtml}
                    <p class="exercise-description mt-2 text-sm text-gray-600">${ex.description || ''}</p>
                    <div class="log-area">${actionHtml}</div>
                </div>
            </div>`;
        }).join('');
        return `<div class="card"><h3 class="text-2xl font-bold mb-2">${s.name}</h3>${supersetInstruction}<div class="space-y-2">${exercisesHtml}</div></div>`;
    }).join('');
    const finishButton = dayData.sessions.some(s => s.exercises.length > 0 && s.exercises[0].type !== 'info') 
        ? `<button class="primary-btn w-full mt-4" data-action="finish-day" data-day="${day}">Finish Day's Workout</button>` 
        : '';
    workoutContainer.innerHTML = `<div class="space-y-8">${sessionsHtml}${finishButton}</div>`;
}
function renderCheckInTab() {
    const workoutContainer = document.getElementById('workout-column');
    const { first, last } = workoutPlan.photos || { first: null, last: null };
    let photosHtml = '<p class="text-gray-500">Upload your first photo to start tracking your progress!</p>';
    if (first) {
        photosHtml = `<div class="text-center"><img src="${first.data}" class="rounded-lg mb-2 w-full object-cover aspect-square"><p class="text-sm font-semibold text-gray-500">Start: ${first.date}</p></div>`;
    }
    if (first && last) {
        photosHtml = `<div class="grid grid-cols-2 gap-4">
            <div class="text-center"><img src="${first.data}" class="rounded-lg mb-2 w-full object-cover aspect-square"><p class="text-sm font-semibold text-gray-500">Start: ${first.date}</p></div>
            <div class="text-center"><img src="${last.data}" class="rounded-lg mb-2 w-full object-cover aspect-square"><p class="text-sm font-semibold text-gray-500">Latest: ${last.date}</p></div>
        </div>`;
    }

    const badges = workoutPlan.userProfile.badges || [];
    const badgesHtml = badges.length > 0
        ? `<div class="flex flex-wrap gap-4">${badges.map(b => `<div class="text-center p-2 bg-amber-50 rounded-lg"><div class="text-amber-500 mx-auto">${icons.badge}</div><p class="text-xs font-semibold mt-1">${b}</p></div>`).join('')}</div>`
        : '<p class="text-gray-500">No badges earned yet. Keep up the great work!</p>';

    workoutContainer.innerHTML = `<div class="space-y-8 max-w-2xl mx-auto">
        <div class="card">
            <h3 class="text-xl font-bold text-gray-800 mb-4">Progress Photos</h3>
            ${photosHtml}
            <div class="mt-4">
                <input type="file" id="checkin-photo" class="hidden" accept="image/*" data-action="upload-photo">
                <label for="checkin-photo" class="primary-btn" id="photo-label">Upload New Photo</label>
            </div>
        </div>
        <div class="card">
            <h3 class="text-xl font-bold text-gray-800 mb-4">Badges</h3>
            ${badgesHtml}
        </div>
        <div class="card">
            <h2 class="text-xl font-bold mb-4">Start Next Week</h2>
            <p class="text-gray-500 mb-4">Ready for the next challenge? This will generate an adapted plan for Week ${workoutPlan.week + 1}.</p>
            <button class="primary-btn" data-action="start-new-week">Start New Week</button>
        </div>
        <div class="card">
            <h2 class="text-xl font-bold mb-4">Profile & Settings</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button class="secondary-btn" data-action="edit-profile">Edit Profile</button>
                <button class="secondary-btn" data-action="change-schedule">Change Schedule</button>
            </div>
        </div>
        <div class="card">
            <h2 class="text-xl font-bold mb-4">Nutrition Tools</h2>
            <div class="grid grid-cols-1">
                <button class="secondary-btn" data-action="open-export-modal">Export Shopping List</button>
            </div>
        </div>
    </div>`;
}

function renderProgressTab() {
    const workoutContainer = document.getElementById('workout-column');
    workoutContainer.innerHTML = `
        <div class="space-y-8 max-w-3xl mx-auto">
            <div class="card">
                <h3 class="text-xl font-bold mb-4">Total Weekly Volume (kg)</h3>
                <canvas id="volume-chart"></canvas>
                <div id="volume-chart-placeholder" class="chart-placeholder" style="display: none;">Not enough data to display chart.</div>
            </div>
            <div class="card">
                <h3 class="text-xl font-bold mb-4">Estimated 1-Rep Max (kg)</h3>
                <canvas id="onerm-chart"></canvas>
                 <div id="onerm-chart-placeholder" class="chart-placeholder" style="display: none;">Not enough data to display chart.</div>
            </div>
            <div class="card">
                <h3 class="text-xl font-bold mb-4">Body Measurements (cm)</h3>
                <canvas id="measurements-chart"></canvas>
                 <div id="measurements-chart-placeholder" class="chart-placeholder" style="display: none;">No measurements logged yet.</div>
            </div>
        </div>
    `;

    renderVolumeChart();
    renderOneRepMaxChart();
    renderMeasurementsChart();
}

// --- SECTION 6: MODALS & NAVIGATION ---
function openModal(modalId) { document.getElementById(modalId)?.classList.add('active'); }
function closeModal(modalId) { document.getElementById(modalId)?.classList.remove('active'); }

function handleOnboardingNav(direction) {
    const totalSteps = 10;
    const validationMsgEl = document.getElementById('onboarding-validation-msg');
    if (validationMsgEl) validationMsgEl.textContent = '';
    
    if (direction === 'next') {
        const currentStepEl = document.getElementById(`onboarding-step-${currentOnboardingStep}`);
        const inputs = currentStepEl.querySelectorAll('input[required]');
        let isValid = true;
        inputs.forEach(input => {
            input.style.borderColor = '';
            if (!input.value) {
                input.style.borderColor = 'red';
                isValid = false;
            }
        });
        
        if (currentOnboardingStep === 6) { 
            const equipmentChecked = currentStepEl.querySelectorAll('input[name="equipment"]:checked').length;
            const validationMsg = document.getElementById('equipment-validation-msg');
            if (equipmentChecked === 0) {
                validationMsg.textContent = 'Please select at least one piece of equipment.';
                return;
            }
            validationMsg.textContent = '';
        }
        
        if (!isValid) {
            if (validationMsgEl) validationMsgEl.textContent = 'Please fill out all required fields.';
            return;
        }

        const assignedSex = document.getElementById('assigned_sex').value;
        if (currentOnboardingStep === 2 && assignedSex === 'male') {
            currentOnboardingStep += 2; 
        } else {
            currentOnboardingStep++;
        }

    } else if (direction === 'back') {
        const assignedSex = document.getElementById('assigned_sex').value;
        if (currentOnboardingStep === 4 && assignedSex === 'male') {
             currentOnboardingStep -= 2; 
        } else {
            currentOnboardingStep--;
        }
    }
    
    const header = document.getElementById('onboarding-header');
    const stepInfo = {
        1: { title: "First, a bit about you.", subtitle: "This helps us calculate your metabolic baseline." },
        2: { title: "What are we aiming for?", subtitle: "Your goal determines the workout and nutrition strategy." },
        3: { title: "Hormonal Profile.", subtitle: "Optionally sync your workouts with your hormonal cycle." },
        4: { title: "How do you like to eat?", subtitle: "Select your dietary preferences and any allergies." },
        5: { title: "Where do you train?", subtitle: "This helps us select the right exercises for you." },
        6: { title: "What's in your gym bag?", subtitle: "Select all the equipment you have access to." },
        7: { title: "What's your training intensity?", subtitle: "This helps us tailor the workout volume to your goals." },
        8: { title: "Any pain or limitations?", subtitle: "This helps us select safe and effective exercises for you." },
        9: { title: "How do you like to train?", subtitle: "This helps us gauge your current fitness level." },
        10: { title: "When should we begin?", subtitle: "Choose your first day and let's get started!" }
    };
    if(stepInfo[currentOnboardingStep]) {
        header.querySelector('h2').textContent = stepInfo[currentOnboardingStep].title;
        header.querySelector('p').textContent = stepInfo[currentOnboardingStep].subtitle;
    }
    
    document.querySelectorAll('.onboarding-step').forEach(el => el.classList.remove('active'));
    document.getElementById(`onboarding-step-${currentOnboardingStep}`).classList.add('active');
    document.getElementById('onboarding-progress-bar').style.width = `${(currentOnboardingStep / totalSteps) * 100}%`;
    document.getElementById('onboarding-back-btn').style.display = currentOnboardingStep > 1 ? 'block' : 'none';
    document.getElementById('onboarding-next-btn').style.display = currentOnboardingStep < totalSteps ? 'block' : 'none';
    document.getElementById('onboarding-finish-btn').style.display = currentOnboardingStep === totalSteps ? 'block' : 'none';

    const step3 = document.getElementById('onboarding-step-3');
    if (step3) {
        step3.addEventListener('change', (event) => {
            if (event.target.name === 'hormoneProfile') {
                const existingInputs = step3.querySelector('.dynamic-cycle-inputs');
                if (existingInputs) {
                    existingInputs.remove();
                }

                if (event.target.value === 'track_cycle') {
                    const inputsHtml = `
                        <div class="space-y-4 text-left dynamic-cycle-inputs mt-6">
                            <div>
                                <label for="last_period_date" class="block text-sm font-medium text-gray-700 mb-1">Date of Last Period</label>
                                <input type="date" id="last_period_date" name="last_period_date" class="modal-input w-full" required>
                            </div>
                            <div>
                                <label for="cycle_length" class="block text-sm font-medium text-gray-700 mb-1">Average Cycle Length (days)</label>
                                <input type="number" id="cycle_length" name="cycle_length" class="modal-input w-full" placeholder="e.g., 28" required>
                            </div>
                        </div>
                    `;
                    step3.insertAdjacentHTML('beforeend', inputsHtml);
                }
            }
        });
    }
}

// --- SECTION 7: INTERACTIVE FEATURES ---
function showHistoryModal(day, sessionIndex, exIndex) {
    const ex = workoutPlan.days[day].sessions[sessionIndex].exercises[exIndex];
    document.getElementById('history-modal-title').textContent = `History: ${ex.content}`;
    const contentEl = document.getElementById('history-modal-dynamic-content');
    
    const fullHistory = workoutPlan.history.filter(h => h.id === ex.id);

    if (!fullHistory || fullHistory.length === 0) {
        contentEl.innerHTML = '<p>No history recorded for this exercise yet.</p>';
    } else {
        const historyList = fullHistory.map(h => 
            `<li class="text-sm"><strong>${h.date}:</strong> ${h.reps.join(', ')} reps @ ${h.weight}kg</li>`
        ).join('');
        contentEl.innerHTML = `<div class="space-y-2">
            <canvas id="history-chart"></canvas>
            <ul class="list-disc list-inside">${historyList}</ul>
        </div>`;

        const ctx = document.getElementById('history-chart').getContext('2d');
        if (chartInstances['history']) chartInstances['history'].destroy();
        chartInstances['history'] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: fullHistory.map(h => h.date),
                datasets: [{
                    label: 'Weight (kg)',
                    data: fullHistory.map(h => h.weight),
                    borderColor: 'rgba(243, 186, 96, 1)',
                    backgroundColor: 'rgba(243, 186, 96, 0.2)',
                    fill: true,
                    tension: 0.1
                }]
            },
            options: { scales: { y: { beginAtZero: true } } }
        });
    }
    openModal('history-modal');
}

function showSwapModal(day, sessionIndex, exIndex) {
    const ex = workoutPlan.days[day].sessions[sessionIndex].exercises[exIndex];
    const { primaryMuscle } = ex;
    const userProfile = workoutPlan.userProfile;
    
    let alternatives = [];
    const muscleGroupsToSearch = [primaryMuscle, ...Object.keys(exerciseLibrary).filter(k => k.toLowerCase().includes(primaryMuscle))];
    
    muscleGroupsToSearch.forEach(groupName => {
        if (exerciseLibrary[groupName]) {
            Object.values(exerciseLibrary[groupName]).flat().forEach(altEx => {
                const isAlternative = altEx.id !== ex.id && altEx.movementPattern === ex.movementPattern;
                const hasEquipment = altEx.requires.every(req => userProfile.equipment.includes(req));
                const environmentMatch = altEx.environment === 'all' || altEx.environment === userProfile.training_environment;

                if (isAlternative && hasEquipment && environmentMatch && !alternatives.some(a => a.id === altEx.id)) {
                    alternatives.push(altEx);
                }
            });
        }
    });

    const contentEl = document.getElementById('swap-modal-content');
    if (alternatives.length === 0) {
        contentEl.innerHTML = `<h3 class="text-xl font-bold mb-4">No alternatives available.</h3><p>You may need more equipment to see other options.</p>`;
    } else {
        const altsHtml = alternatives.map(alt => 
            `<button class="secondary-btn w-full text-left my-2" data-action="perform-swap" data-day="${day}" data-session-index="${sessionIndex}" data-ex-index="${exIndex}" data-new-ex-id="${alt.id}">
                ${alt.content} <span class="text-xs text-gray-500">(${alt.requires.join(', ').replace(/_/g, ' ')})</span>
            </button>`
        ).join('');
        contentEl.innerHTML = `<h3 class="text-xl font-bold mb-4">Swap for...</h3><div class="space-y-3">${altsHtml}</div>`;
    }
    openModal('swap-modal');
}

function performSwap(day, sessionIndex, exIndex, newExId) {
    const newEx = findExerciseById(newExId);
    if (newEx && workoutPlan.days[day]) {
        workoutPlan.days[day].sessions[sessionIndex].exercises[exIndex] = newEx;
        saveState();
        renderDay(day);
        closeModal('swap-modal');
    }
}

function handleDayCompletion(day) {
    const dayData = workoutPlan.days[day];
    let summary = '';
    let prSummary = '';
    dayData.sessions.forEach(s => {
        s.exercises.forEach(ex => {
            if (ex.completed && ex.completedLog) {
                summary += `<p><strong>${ex.content}:</strong> ${ex.completedLog.reps.join(', ')} reps @ ${ex.completedLog.weight}kg</p>`;
                
                const history = workoutPlan.history.filter(h => h.id === ex.id);
                const bestWeight = Math.max(0, ...history.slice(0, -1).map(h => h.weight));
                const currentWeight = ex.completedLog.weight;
                if (currentWeight > bestWeight) {
                    prSummary += `<p class="text-green-600 font-bold">🎉 New PR on ${ex.content}: ${currentWeight}kg!</p>`;
                }
            }
        });
    });
    
    document.getElementById('summary-modal-content').innerHTML = (prSummary + summary) || "<p>No exercises logged for this workout.</p>";
    const feedbackBtn = document.querySelector('[data-action="submit-day-feedback"]');
    feedbackBtn.dataset.day = day;
    openModal('summary-modal');
}

function handleSubmitFeedback(day) {
    workoutPlan.days[day].completed = true;
    checkAchievements();
    saveState();
    closeModal('summary-modal');
    openTab(day);
}

// --- SECTION 8: PROFILE & SCHEDULE MANAGEMENT ---
function openEditProfileModal() {
    const userProfile = workoutPlan.userProfile;
    
    const intensityGroup = document.getElementById('edit-intensity-group');
    const intensityOptions = [
        { value: 'casual', label: 'Casual' },
        { value: 'standard', label: 'Hey, Not Too Rough' },
        { value: 'intense', label: 'Hurt Me Plenty' }
    ];
    intensityGroup.innerHTML = intensityOptions.map(opt => `<div><input type="radio" id="edit-intensity-${opt.value}" name="trainingIntensity" value="${opt.value}" ${userProfile.trainingIntensity === opt.value ? 'checked' : ''}><label for="edit-intensity-${opt.value}">${opt.label}</label></div>`).join('');

    const dietGroup = document.getElementById('edit-diet-group');
    const dietOptions = ['omnivore', 'pescatarian', 'vegetarian', 'vegan'];
    dietGroup.innerHTML = dietOptions.map(d => `<div><input type="radio" id="edit-diet-${d}" name="diet_preference" value="${d}" ${userProfile.diet_preference === d ? 'checked' : ''}><label for="edit-diet-${d}">${d.charAt(0).toUpperCase() + d.slice(1)}</label></div>`).join('');
    
    const equipmentGroup = document.getElementById('edit-equipment-group');
    const equipmentOptions = ['bodyweight', 'dumbbells_pair', 'dumbbells_single', 'barbell', 'pullup_bar', 'bench', 'bands', 'yoga_blocks', 'jump_rope'];
    equipmentGroup.innerHTML = equipmentOptions.map(eq => `<div><input type="checkbox" id="edit-equip-${eq}" name="equipment" value="${eq}" ${userProfile.equipment.includes(eq) ? 'checked' : ''}><label for="edit-equip-${eq}">${eq.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</label></div>`).join('');
    
    openModal('edit-profile-modal');
}
function openChangeScheduleModal() {
    const form = document.getElementById('change-schedule-form');
    if (!form) return;
    const allDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const currentWorkoutDays = allDays.filter(day => workoutPlan.days[day] && workoutPlan.days[day].title !== "Active Recovery");
    form.innerHTML = allDays.map(day => `
        <div class="flex items-center">
            <input type="checkbox" id="schedule-${day}" name="workout_day" value="${day}" ${currentWorkoutDays.includes(day) ? 'checked' : ''} class="h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500">
            <label for="schedule-${day}" class="ml-3 block text-sm font-medium text-gray-700">${day.charAt(0).toUpperCase() + day.slice(1)}</label>
        </div>
    `).join('');
    openModal('change-schedule-modal');
}
function handleProfileUpdate(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    workoutPlan.userProfile.trainingIntensity = formData.get('trainingIntensity');
    workoutPlan.userProfile.diet_preference = formData.get('diet_preference');
    workoutPlan.userProfile.equipment = formData.getAll('equipment');
    
    const tempPlan = { ...workoutPlan };
    workoutPlan = generateWeeklyPlan(tempPlan);

    saveState();
    closeModal('edit-profile-modal');
    runApp(true);
}
function handleScheduleUpdate(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newWorkoutDays = formData.getAll('workout_day');
    
    workoutPlan.userProfile.training_days = newWorkoutDays.length;
    const tempPlan = { ...workoutPlan, days: {} };
    workoutPlan = generateWeeklyPlan(tempPlan);

    saveState();
    closeModal('change-schedule-modal');
    runApp(true);
}

// --- SECTION 9: WEEKLY PROGRESSION & TIMERS ---
function startNewWeek() {
    const userProfile = workoutPlan.userProfile;
    document.getElementById('checkin-weight').value = userProfile.weight;
    document.getElementById('checkin-fat').value = userProfile.fat_percent || '';
    document.getElementById('checkin-muscle').value = userProfile.muscle_percent || '';
    document.getElementById('weekly-checkin-subtitle').textContent = `Let's fine-tune your plan for Week ${workoutPlan.week + 1}.`;
    
    const focusSelect = document.getElementById('checkin-focus');
    const muscleGroups = ['None', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Glutes'];
    focusSelect.innerHTML = muscleGroups.map(m => `<option value="${m}">${m}</option>`).join('');

    openModal('weekly-checkin-modal');
}

function handleCheckinSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const checkinData = {
        rpe: parseInt(formData.get('rpe'), 10),
        hunger_level: parseInt(formData.get('hunger_level'), 10),
        adherence_rating: parseInt(formData.get('adherence_rating'), 10),
        progression: 'weight',
        focus: formData.get('focus'),
        updatedStats: {
            weight: parseFloat(formData.get('weight')),
            fat_percent: parseFloat(formData.get('fat_percent')) || workoutPlan.userProfile.fat_percent,
            muscle_percent: parseFloat(formData.get('muscle_percent')) || workoutPlan.userProfile.muscle_percent
        }
    };
    
    const waist = parseFloat(formData.get('waist'));
    const hips = parseFloat(formData.get('hips'));
    const chest = parseFloat(formData.get('chest'));
    if (waist || hips || chest) {
        workoutPlan.measurements.push({
            date: new Date().toISOString().split('T')[0],
            waist: waist || null,
            hips: hips || null,
            chest: chest || null
        });
    }

    const newPlan = { ...workoutPlan, week: workoutPlan.week + 1 };
    workoutPlan = generateWeeklyPlan(newPlan, checkinData);
    saveState();
    closeModal('weekly-checkin-modal');
    runApp(true);
    
    if (workoutPlan.deloadMessage) {
        document.getElementById('progression-title').textContent = "Plan Autoregulated!";
        document.getElementById('progression-suggestion').textContent = workoutPlan.deloadMessage;
        openModal('progression-modal');
        delete workoutPlan.deloadMessage;
        saveState();
    }
}

function startTimer(day, sessionIndex, exIndex) {
    const ex = workoutPlan.days[day].sessions[sessionIndex].exercises[exIndex];
    const [work, rest] = ex.details.match(/(\d+)s on, (\d+)s off/).slice(1).map(Number);
    const totalDuration = ex.duration;
    const rounds = totalDuration / (work + rest);

    let currentRound = 1;
    let timeRemaining = 10;
    let state = 'ready';

    const display = document.getElementById('timer-display');
    const status = document.getElementById('timer-status');
    const roundDisplay = document.getElementById('timer-round');
    document.getElementById('timer-exercise-name').textContent = ex.content;

    const synth = new Tone.Synth().toDestination();
    const beep = () => synth.triggerAttackRelease("C5", "8n");
    const finalBeep = () => synth.triggerAttackRelease("G5", "4n");

    openModal('timer-modal');

    timerInterval = setInterval(() => {
        timeRemaining--;
        display.textContent = timeRemaining;

        if (timeRemaining <= 3 && timeRemaining > 0 && state !== 'ready') {
            beep();
        }

        if (timeRemaining <= 0) {
            if (state === 'ready') {
                state = 'work';
                timeRemaining = work;
                status.textContent = 'Work';
                finalBeep();
            } else if (state === 'work') {
                state = 'rest';
                timeRemaining = rest;
                status.textContent = 'Rest';
                finalBeep();
            } else if (state === 'rest') {
                currentRound++;
                if (currentRound > rounds) {
                    stopTimer();
                    const checkbox = document.querySelector(`.exercise-item[data-day="${day}"][data-session-index="${sessionIndex}"][data-ex-index="${exIndex}"] input[type="checkbox"]`);
                    if(checkbox) checkbox.checked = true;
                    checkbox.dispatchEvent(new Event('change', { bubbles: true }));
                    return;
                }
                state = 'work';
                timeRemaining = work;
                status.textContent = 'Work';
                finalBeep();
            }
        }
        roundDisplay.textContent = `Round ${currentRound} / ${rounds}`;

    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    closeModal('timer-modal');
}

function viewRecipeModal(recipeId) {
    currentRecipeForModal = recipeLibrary.find(r => r.id === recipeId);
    if (!currentRecipeForModal) return;
    currentServings = 1;
    renderRecipeModalContent();
    openModal('recipe-modal');
}

function adjustServings(amount) {
    currentServings += amount;
    if (currentServings < 1) {
        currentServings = 1;
    }
    renderRecipeModalContent();
}

function renderRecipeModalContent() {
    if (!currentRecipeForModal) return;

    const recipe = currentRecipeForModal;
    const servings = currentServings;
    const contentEl = document.getElementById('recipe-modal-content');

    const ingredientsHtml = recipe.ingredients.map(ing => {
        let newQuantity = ing.quantity ? ing.quantity * servings : '';
        if (newQuantity && newQuantity < 1 && newQuantity > 0) {
            newQuantity = newQuantity.toFixed(2);
        } else if (newQuantity) {
            newQuantity = Math.round(newQuantity * 100) / 100;
        }
        return `<li>${newQuantity} ${ing.unit || ''} ${ing.item}</li>`;
    }).join('');

    const instructionsHtml = recipe.instructions.map(inst => `<li>${inst}</li>`).join('');
    
    let variantsHtml = '';
    if (recipe.variants && recipe.variants.length > 0) {
        const variantsList = recipe.variants.map(v => `<li class="mt-2"><strong class="text-primary-accent">${v.name}:</strong> ${v.adds}</li>`).join('');
        variantsHtml = `<div class="mt-4 p-3 bg-amber-50 rounded-lg text-sm">
            <h4 class="font-bold text-amber-800">Flavor Variants</h4>
            <ul class="list-disc list-inside ml-4 mt-2">${variantsList}</ul>
        </div>`;
    }

    contentEl.innerHTML = `
        <h2 class="text-2xl font-bold mb-2">${recipe.name}</h2>
        <div class="flex items-center gap-4 my-4">
            <span class="font-semibold">Servings:</span>
            <div class="flex items-center gap-2">
                <button class="secondary-btn !p-2 h-8 w-8 flex items-center justify-center" data-action="adjust-serving" data-amount="-1">-</button>
                <span id="servings-count" class="font-bold text-lg w-8 text-center">${servings}</span>
                <button class="secondary-btn !p-2 h-8 w-8 flex items-center justify-center" data-action="adjust-serving" data-amount="1">+</button>
            </div>
        </div>
        <div class="text-left">
            <p class="text-sm text-gray-500 mb-4"><em>Macro information is for a single serving.</em></p>
            <h3 class="font-bold text-lg mb-2">Ingredients</h3>
            <ul class="list-disc list-inside mb-4" id="ingredient-list">${ingredientsHtml}</ul>
            <h3 class="font-bold text-lg mb-2">Instructions</h3>
            <ol class="list-decimal list-inside">${instructionsHtml}</ol>
            ${variantsHtml}
            ${recipe.prep_tip ? `<p class="mt-4 text-sm italic bg-gray-100 p-3 rounded-lg"><strong>Prep Tip:</strong> ${recipe.prep_tip}</p>` : ''}
        </div>
    `;
}

function generateShoppingListCSV(peopleCount) {
    const weeklyIngredients = {};

    Object.values(workoutPlan.days).forEach(day => {
        if (day.diet && day.diet.meals) {
            Object.values(day.diet.meals).forEach(recipe => {
                if (!recipe) return;
                recipe.ingredients.forEach(ing => {
                    const key = `${ing.item.toLowerCase()}_${ing.unit || 'unit'}`;
                    if (!weeklyIngredients[key]) {
                        weeklyIngredients[key] = { item: ing.item, quantity: 0, unit: ing.unit || '' };
                    }
                    weeklyIngredients[key].quantity += ing.quantity;
                });
            });
        }
    });

    let csvContent = "data:text/csv;charset=utf-8,Ingredient,Quantity,Unit\n";
    Object.values(weeklyIngredients).forEach(ing => {
        const scaledQuantity = Math.ceil((ing.quantity * peopleCount) * 10) / 10;
        csvContent += `${ing.item},${scaledQuantity},${ing.unit}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `evolvefit_shopping_list_week_${workoutPlan.week}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


// --- SECTION 10: UTILITIES & INITIALIZATION ---
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function findExerciseById(id) {
    for (const group of Object.values(exerciseLibrary)) {
        for (const list of Object.values(group)) {
            const exercise = list.find(ex => ex.id === id);
            if (exercise) return structuredClone(exercise);
        }
    }
    return null;
}

function getDynamicWarmup(primaryMovementPatterns, userProfile) {
    const { equipment } = userProfile;
    let warmupExercises = [];

    warmupExercises.push(findExerciseById('warmup_jumping_jacks'));

    if (primaryMovementPatterns.includes('squat') || primaryMovementPatterns.includes('hinge')) {
        warmupExercises.push(findExerciseById('warmup_leg_swings'));
        warmupExercises.push(findExerciseById('warmup_spiderman_lunge_rotation'));
    }
    if (primaryMovementPatterns.includes('push_horizontal') || primaryMovementPatterns.includes('push_vertical')) {
        if (equipment.includes('bands')) {
            warmupExercises.push(findExerciseById('warmup_band_pull_aparts'));
        } else {
            warmupExercises.push(findExerciseById('warmup_wall_slides'));
        }
    }
    if (primaryMovementPatterns.includes('pull_horizontal') || primaryMovementPatterns.includes('pull_vertical')) {
        warmupExercises.push(findExerciseById('warmup_cat_cow'));
    }

    if (primaryMovementPatterns.includes('squat')) {
         warmupExercises.push(findExerciseById('warmup_jump_squats_low'));
    }
     if (primaryMovementPatterns.includes('hinge')) {
         warmupExercises.push(findExerciseById('warmup_broad_jumps'));
    }

    return [...new Map(warmupExercises.filter(Boolean).map(item => [item['id'], item])).values()];
}

function getDynamicItems(type, patterns, userProfile) {
    const library = exerciseLibrary[type].bodyweight;
    const items = patterns.map(pattern => {
        const candidates = library.filter(item => item.movementPattern === pattern);
        return candidates.length > 0 ? shuffleArray(candidates)[0] : null;
    }).filter(Boolean);
    if (items.length === 0) items.push(shuffleArray(library)[0]);
    return [...new Set(items.map(item => item.id))].map(id => findExerciseById(id));
}

function selectPrimaryLiftsForBlock(userProfile) {
    const lifts = {};
    const majorMuscleGroups = ['Chest', 'Back', 'Legs', 'Shoulders', 'Hamstrings', 'Glutes'];
    majorMuscleGroups.forEach(group => {
        const bestLift = getBestExerciseFor(group, userProfile);
        if (bestLift) {
            lifts[group] = bestLift.id;
        }
    });
    return lifts;
}

function getCardioForDay(userProfile, day) {
    const { goal } = userProfile;
    const dayIndex = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].indexOf(day);
    
    switch(goal) {
        case 'lose_fat':
            if (dayIndex % 2 !== 0) return getBestExerciseFor('HIIT', userProfile);
            else return getBestExerciseFor('Cardio', userProfile);
        case 'gain_muscle':
            if (dayIndex === 6) return getBestExerciseFor('Cardio', userProfile);
            break;
        case 'recomp':
            if (dayIndex % 3 === 0) return getBestExerciseFor('HIIT', userProfile);
            break;
    }
    return null;
}


function runApp(isReload = false) {
    document.querySelector('.main-app-container').style.display = 'block';
    document.getElementById('onboarding-modal').style.display = 'none';
    document.getElementById('week-counter').textContent = `Week ${workoutPlan.week}`;
    const startDay = isReload ? currentTab : (workoutPlan.userProfile.start_day || 'monday');
    openTab(startDay);
    highlightCurrentDay();
}
function highlightCurrentDay() {
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('current-day'));
    const dayIndex = new Date().getDay();
    const dayMap = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const todayBtn = document.querySelector(`.nav-btn[data-tab-id="${dayMap[dayIndex]}"]`);
    if (todayBtn) todayBtn.classList.add('current-day');
}

function checkAchievements() {
    const badges = workoutPlan.userProfile.badges || [];
    if (workoutPlan.week >= 4 && !badges.includes("1 Month Consistency")) {
        badges.push("1 Month Consistency");
    }
    workoutPlan.userProfile.badges = badges;
}

// --- SECTION 11: CHARTING FUNCTIONS ---
function renderVolumeChart() {
    const placeholder = document.getElementById('volume-chart-placeholder');
    const canvas = document.getElementById('volume-chart');
    const history = workoutPlan.history || [];
    if (history.length < 5) {
        placeholder.style.display = 'flex';
        canvas.style.display = 'none';
        return;
    }
    placeholder.style.display = 'none';
    canvas.style.display = 'block';

    const weeklyVolume = {};

    history.forEach(log => {
        const week = log.week;
        if (!weeklyVolume[week]) {
            weeklyVolume[week] = { Chest: 0, Back: 0, Legs: 0, Shoulders: 0, Arms: 0, Glutes: 0, Hamstrings: 0 };
        }
        const volume = log.reps.reduce((sum, rep) => sum + (rep * log.weight), 0);
        const group = Object.keys(exerciseLibrary).find(g => exerciseLibrary[g] && Object.values(exerciseLibrary[g]).flat().some(ex => ex.id === log.id));
        const primaryMuscle = findExerciseById(log.id)?.primaryMuscle;
        if (primaryMuscle && weeklyVolume[week][primaryMuscle] !== undefined) {
             weeklyVolume[week][primaryMuscle] += volume;
        } else if (group && weeklyVolume[week][group] !== undefined) {
            weeklyVolume[week][group] += volume;
        }
    });

    const labels = Object.keys(weeklyVolume).sort((a,b) => a-b).map(w => `Week ${w}`);
    const datasets = Object.keys(weeklyVolume[1] || {}).map((group, i) => {
        const colors = ['#f3ba60', '#e0dbf3', '#a7f3d0', '#fecaca', '#bfdbfe', '#fde68a', '#d1d5db'];
        return {
            label: group,
            data: labels.map(label => {
                const weekNum = label.split(' ')[1];
                return weeklyVolume[weekNum] ? weeklyVolume[weekNum][group] : 0;
            }),
            backgroundColor: colors[i % colors.length]
        };
    });

    const ctx = canvas.getContext('2d');
    if (chartInstances['volume']) chartInstances['volume'].destroy();
    chartInstances['volume'] = new Chart(ctx, {
        type: 'bar',
        data: { labels, datasets },
        options: {
            scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } }
        }
    });
}

function renderOneRepMaxChart() {
    const placeholder = document.getElementById('onerm-chart-placeholder');
    const canvas = document.getElementById('onerm-chart');
    const history = workoutPlan.history || [];
     if (history.length < 3) {
        placeholder.style.display = 'flex';
        canvas.style.display = 'none';
        return;
    }
    placeholder.style.display = 'none';
    canvas.style.display = 'block';

    const keyLifts = {
        'ex_bench_press': { label: 'Bench Press', data: [] },
        'ex_barbell_squat': { label: 'Squat', data: [] },
        'ex_overhead_press': { label: 'Overhead Press', data: [] }
    };

    history.forEach(log => {
        if (keyLifts[log.id]) {
            const maxRep = Math.max(...log.reps);
            if (maxRep > 0) {
                const e1RM = log.weight * (1 + maxRep / 30);
                keyLifts[log.id].data.push({ x: log.date, y: e1RM });
            }
        }
    });

    const datasets = Object.values(keyLifts).filter(lift => lift.data.length > 0).map((lift, i) => {
          const colors = ['#f3ba60', '#e0dbf3', '#a7f3d0'];
        return {
            label: lift.label,
            data: lift.data,
            borderColor: colors[i % colors.length],
            tension: 0.1
        };
    });
    
    const ctx = canvas.getContext('2d');
    if (chartInstances['onerm']) chartInstances['onerm'].destroy();
    chartInstances['onerm'] = new Chart(ctx, {
        type: 'line',
        data: { datasets },
        options: {
            scales: {
                x: { type: 'time', time: { unit: 'day', tooltipFormat: 'MMM dd' } },
                y: { beginAtZero: true }
            }
        }
    });
}

function renderMeasurementsChart() {
    const placeholder = document.getElementById('measurements-chart-placeholder');
    const canvas = document.getElementById('measurements-chart');
    const measurements = workoutPlan.measurements || [];
    if (measurements.length < 2) {
        placeholder.style.display = 'flex';
        canvas.style.display = 'none';
        return;
    }
    placeholder.style.display = 'none';
    canvas.style.display = 'block';

    const datasets = [
        { label: 'Waist (cm)', data: [], borderColor: '#f3ba60' },
        { label: 'Hips (cm)', data: [], borderColor: '#e0dbf3' },
        { label: 'Chest (cm)', data: [], borderColor: '#a7f3d0' }
    ];

    measurements.forEach(m => {
        if (m.waist) datasets[0].data.push({ x: m.date, y: m.waist });
        if (m.hips) datasets[1].data.push({ x: m.date, y: m.hips });
        if (m.chest) datasets[2].data.push({ x: m.date, y: m.chest });
    });
    
    const ctx = canvas.getContext('2d');
    if (chartInstances['measurements']) chartInstances['measurements'].destroy();
    chartInstances['measurements'] = new Chart(ctx, {
        type: 'line',
        data: { datasets: datasets.filter(d => d.data.length > 0) },
        options: {
            scales: {
                x: { type: 'time', time: { unit: 'week', tooltipFormat: 'MMM dd' } },
                y: { beginAtZero: false }
            }
        }
    });
}


function initializeApp() {
    if (loadState()) {
        runApp();
    } else {
        const startDaySelect = document.getElementById('start_day');
        const today = new Date();
        const dayMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(today.getDate() + i);
            const dayName = dayMap[date.getDay()];
            const option = document.createElement('option');
            option.value = dayName.toLowerCase();
            option.textContent = i === 0 ? `Today (${dayName})` : dayName;
            startDaySelect.appendChild(option);
        }
        openModal('onboarding-modal');
        handleOnboardingNav();
    }

    document.body.addEventListener('click', (e) => {
        const target = e.target.closest('[data-action]');
        if (!target) return;
        
        const { action, modalId, tabId, newExId, recipeId, amount } = target.dataset;
        
        if (action === 'perform-swap') {
            const { day, sessionIndex, exIndex } = target.dataset;
            performSwap(day, parseInt(sessionIndex), parseInt(exIndex), newExId);
            return;
        }

        const exItem = target.closest('.exercise-item');
        let day, sessionIndex, exIndex;
        if (exItem) {
            ({ day, sessionIndex, exIndex } = exItem.dataset);
            sessionIndex = parseInt(sessionIndex);
            exIndex = parseInt(exIndex);
        }

        switch(action) {
            case 'onboarding-next': handleOnboardingNav('next'); break;
            case 'onboarding-back': handleOnboardingNav('back'); break;
            case 'close-modal': closeModal(modalId); break;
            case 'open-tab': openTab(tabId); break;
            case 'edit-profile': openEditProfileModal(); break;
            case 'change-schedule': openChangeScheduleModal(); break;
            case 'start-new-week': startNewWeek(); break;
            case 'show-history': showHistoryModal(day, sessionIndex, exIndex); break;
            case 'show-swap': showSwapModal(day, sessionIndex, exIndex); break;
            case 'finish-day': handleDayCompletion(target.dataset.day); break;
            case 'submit-day-feedback': handleSubmitFeedback(target.dataset.day); break;
            case 'start-timer': startTimer(target.dataset.day, parseInt(target.dataset.sessionIndex), parseInt(target.dataset.exIndex)); break;
            case 'stop-timer': stopTimer(); break;
            case 'toggle-description': 
                const desc = exItem.querySelector('.exercise-description');
                desc.style.display = desc.style.display === 'block' ? 'none' : 'block';
                break;
            case 'view-recipe': viewRecipeModal(recipeId); break;
            case 'adjust-serving': adjustServings(parseInt(amount)); break;
            case 'open-export-modal': openModal('export-modal'); break;
            case 'fill-random': 
                document.getElementById('age').value = 30;
                document.getElementById('weight').value = 75;
                document.getElementById('height').value = 180;
                document.getElementById('fat_percent').value = 15;
                document.getElementById('muscle_percent').value = 40;
                document.getElementById('max_squats').value = 30;
                document.getElementById('max_pushups').value = 20;
                document.getElementById('max_pullups').value = 5;
                document.querySelector('#equip-bodyweight').checked = true;
                document.querySelector('#equip-dumbbells_pair').checked = true;
                handleOnboardingNav('next');
                break;
        }
    });

    document.body.addEventListener('change', (e) => {
        const target = e.target;
        const action = target.dataset.action;

        if (action === 'toggle-complete') {
            const exItem = target.closest('.exercise-item');
            const { day, sessionIndex, exIndex } = exItem.dataset;
            const ex = workoutPlan.days[day].sessions[parseInt(sessionIndex)].exercises[parseInt(exIndex)];
            
            ex.completed = target.checked;
            if (target.checked) {
                const logArea = exItem.querySelector('.log-area');
                const repInputs = Array.from(logArea.querySelectorAll('input[type="number"]'));
                const weightInput = logArea.querySelector('.weight-input');
                
                const logData = {
                    reps: repInputs.map(input => parseInt(input.value) || 0).filter(r => r > 0),
                    weight: weightInput ? parseFloat(weightInput.value) : 0,
                    date: new Date().toISOString().split('T')[0],
                    week: workoutPlan.week,
                    day: day,
                    id: ex.id,
                };
                ex.completedLog = logData;
                workoutPlan.history.push(logData);

                const synth = new Tone.Synth().toDestination();
                synth.triggerAttackRelease("C4", "8n");
            } else {
                delete ex.completedLog;
                const logIndex = workoutPlan.history.findIndex(h => h.id === ex.id && h.week === workoutPlan.week && h.day === day);
                if (logIndex > -1) workoutPlan.history.splice(logIndex, 1);
            }
            saveState();
            exItem.classList.toggle('completed', target.checked);
        } else if (action === 'upload-photo') {
            const file = target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (event) => {
                const photoData = {
                    date: new Date().toISOString().split('T')[0],
                    data: event.target.result
                };
                if (!workoutPlan.photos.first) {
                    workoutPlan.photos.first = photoData;
                }
                workoutPlan.photos.last = photoData;
                saveState();
                renderCheckInTab();
            };
            reader.readAsDataURL(file);
        }
    });
    
    document.body.addEventListener('input', (e) => {
        const target = e.target;
        if (target.classList.contains('weight-input')) {
            const exItem = target.closest('.exercise-item');
            const { day, sessionIndex, exIndex, exId } = exItem.dataset;
            const ex = findExerciseById(exId);
            
            if (!ex || !ex.baseVolume) return;

            const newWeight = parseFloat(target.value);
            const adjustedReps = calculateAdjustedReps(ex.baseVolume.weight, ex.baseVolume.reps, newWeight);

            const targetTextEl = document.getElementById(`target-text-${day}-${sessionIndex}-${exIndex}`);
            if (targetTextEl) {
                targetTextEl.textContent = `Target: ${ex.target.sets}x ~${adjustedReps} reps @ ${newWeight || ex.weight}kg`;
            }
        }
    });

    document.body.addEventListener('submit', (e) => {
        e.preventDefault();
        switch(e.target.id) {
            case 'onboarding-form': handleOnboardingSubmit(e); break;
            case 'edit-profile-form': handleProfileUpdate(e); break;
            case 'change-schedule-form': handleScheduleUpdate(e); break;
            case 'checkin-form': handleCheckinSubmit(e); break;
            case 'export-form': 
                const formData = new FormData(e.target);
                const peopleCount = parseInt(formData.get('people_count'), 10);
                generateShoppingListCSV(peopleCount);
                closeModal('export-modal');
                break;
        }
    });

    document.getElementById('weekly-checkin-modal')?.addEventListener('input', (e) => {
        const target = e.target;
        if (target.id === 'weekly-rpe') document.getElementById('weekly-rpe-value').textContent = target.value;
        if (target.id === 'hunger-level') document.getElementById('hunger-level-value').textContent = target.value;
        if (target.id === 'adherence-rating') document.getElementById('adherence-rating-value').textContent = target.value;
    });
}

document.addEventListener('DOMContentLoaded', initializeApp);
