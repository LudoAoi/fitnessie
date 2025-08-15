// --- SECTION 2: DATA LIBRARIES ---

// V8 CHANGE: New priority map for exercise selection
export const equipmentPriority = {
    barbell: 5,
    dumbbells_pair: 4,
    dumbbells_single: 3,
    pullup_bar: 3,
    bands: 2,
    bodyweight: 1
};

// V9 CHANGE: Exercise library fully updated with difficulty tags, baseVolume, and new core exercises
export const exerciseLibrary = {
    'Warmup': {
        bodyweight: [
            { id: 'warmup_jumping_jacks', content: 'Jumping Jacks', details: '60-90 seconds', duration: 90, type: 'info', requires: ['bodyweight'], tags: ['cardio', 'full body'], primaryMuscle: 'full_body', movementPattern: 'dynamic', difficulty: 'beginner', description: '1. Stand with your feet together and your arms at your sides. 2. In one motion, jump your feet out to the side and raise your arms above your head. 3. Immediately reverse that motion to jump back to the starting position.' },
            { id: 'warmup_cat_cow', content: 'Cat-Cow Stretch', details: '60 seconds', duration: 60, type: 'info', requires: ['bodyweight'], tags: ['mobility', 'spine'], primaryMuscle: 'spine', movementPattern: 'flexion_extension', difficulty: 'beginner', description: '1. Start on your hands and knees. 2. Inhale as you drop your belly towards the mat and look up (Cow). 3. Exhale as you round your spine, tuck your chin to your chest, and press the mat away (Cat).' },
            { id: 'warmup_leg_swings', content: 'Leg Swings', details: '30s each side', duration: 60, type: 'info', requires: ['bodyweight'], tags: ['mobility', 'hips', 'dynamic'], primaryMuscle: 'hips', movementPattern: 'hinge', difficulty: 'beginner', description: '1. Stand holding onto a stable surface for balance. 2. Swing one leg forward and backward like a pendulum, keeping your core tight. 3. Perform for 30 seconds, then switch legs.' },
            { id: 'warmup_arm_circles', content: 'Arm Circles', details: '30s each way', duration: 60, type: 'info', requires: ['bodyweight'], tags: ['mobility', 'shoulders', 'dynamic'], primaryMuscle: 'shoulders', movementPattern: 'rotation', difficulty: 'beginner', description: '1. Stand with your feet shoulder-width apart and extend your arms straight out to your sides. 2. Slowly rotate your arms forward in small circles for 30 seconds, then backward for 30 seconds.' },
            { id: 'warmup_spiderman_lunge_rotation', content: 'Spiderman Lunge with Thoracic Rotation', details: '3-5 reps per side', type: 'info', requires: ['bodyweight'], tags: ['mobility', 'hips', 'spine'], primaryMuscle: 'hips', movementPattern: 'lunge', difficulty: 'beginner', description: '1. Step into a deep lunge with your right foot forward. 2. Place your left hand on the ground and your right elbow inside your right foot. 3. Rotate your chest to the right, reaching your right arm to the ceiling. 4. Return to start and switch sides.' },
            { id: 'warmup_wall_slides', content: 'Wall Slides', details: '10-12 reps', type: 'info', requires: ['bodyweight'], tags: ['mobility', 'shoulders'], primaryMuscle: 'shoulders', movementPattern: 'push_vertical', difficulty: 'beginner', description: '1. Stand with your back against a wall, feet slightly away. 2. Place your arms against the wall in a "goalpost" position. 3. Slowly slide your arms up the wall, keeping your forearms and wrists in contact. 4. Slide back down to the start.' },
            { id: 'warmup_jump_squats_low', content: 'Jump Squats (low intensity)', details: '5-8 reps', type: 'info', requires: ['bodyweight'], tags: ['potentiation', 'legs'], primaryMuscle: 'quadriceps', movementPattern: 'squat', difficulty: 'beginner', description: '1. Perform a bodyweight squat to about half depth. 2. From the bottom, explode upwards into a small jump. 3. Land softly and immediately lower into the next squat.' },
            { id: 'warmup_broad_jumps', content: 'Broad Jumps', details: '3-5 reps', type: 'info', requires: ['bodyweight'], tags: ['potentiation', 'legs'], primaryMuscle: 'hamstrings', movementPattern: 'hinge', difficulty: 'beginner', description: '1. Stand with feet shoulder-width apart. 2. Hinge at your hips, swing your arms back, and jump forward as far as possible. 3. Land softly with your knees bent.' },
        ],
        bands: [
            { id: 'warmup_band_pull_aparts', content: 'Band Pull-Aparts', details: '15-20 reps', type: 'info', requires: ['bands'], tags: ['activation', 'shoulders'], primaryMuscle: 'rear_deltoid', movementPattern: 'pull_horizontal', difficulty: 'beginner', description: '1. Hold a resistance band with both hands, palms facing down, hands shoulder-width apart. 2. Keeping your arms straight, pull the band apart by squeezing your shoulder blades together. 3. Return to the starting position with control.' },
        ]
    },
    'Cooldown': {
        bodyweight: [
            { id: 'cooldown_childs_pose', content: 'Child\'s Pose', details: '60 seconds', duration: 60, type: 'info', requires: ['bodyweight'], tags: ['mobility', 'lower back', 'static'], primaryMuscle: 'spine', movementPattern: 'flexion_extension', difficulty: 'beginner', description: '1. Kneel on the floor, sit back on your heels, then fold forward, resting your forehead on the floor. 2. Extend your arms in front of you or rest them alongside your body. 3. Breathe deeply, feeling a gentle stretch in your back and hips.' },
            { id: 'cooldown_quad_stretch', content: 'Standing Quad Stretch', details: '30s each leg', duration: 60, type: 'info', requires: ['bodyweight'], tags: ['stretch', 'quads', 'static'], primaryMuscle: 'quadriceps', movementPattern: 'stretch', difficulty: 'beginner', description: '1. Stand on one leg, holding onto something for balance if needed. 2. Grab your other foot and gently pull your heel towards your glute. 3. Keep your knees together and feel the stretch in the front of your thigh. Hold for 30 seconds and switch sides.' },
            { id: 'cooldown_hamstring_stretch', content: 'Standing Hamstring Stretch', details: '30s each leg', duration: 60, type: 'info', requires: ['bodyweight'], tags: ['stretch', 'hamstrings', 'static'], primaryMuscle: 'hamstrings', movementPattern: 'stretch', difficulty: 'beginner', description: '1. Stand with your feet together. Step one foot forward and place the heel on the ground, keeping that leg straight. 2. Hinge at your hips and lean forward until you feel a stretch in the back of your front leg. 3. Hold for 30 seconds and switch sides.' },
            { id: 'cooldown_pigeon_pose', content: 'Pigeon Pose', details: '45s each side', duration: 90, type: 'info', requires: ['bodyweight'], tags: ['mobility', 'hips', 'glutes', 'static'], primaryMuscle: 'glutes', movementPattern: 'stretch', difficulty: 'beginner', description: '1. From a plank position, bring your right knee forward towards your right wrist. 2. Extend your left leg straight back behind you. 3. Keep your hips square and fold forward over your front leg if comfortable. Hold for 45 seconds and switch sides.' },
        ]
    },
    'Chest': {
        barbell: [{ id: 'ex_bench_press', content: 'Barbell Bench Press', type: 'log', target: { sets: 3, minReps: 5, maxReps: 8 }, weight: 40, baseVolume: { weight: 40, reps: 7 }, requires: ['barbell', 'bench'], history: [], pro_tip: "Keep your shoulder blades retracted and pinched together to protect your shoulders and maximize chest activation.", primaryMuscle: 'pectorals', secondaryMuscles: ['triceps', 'anterior_deltoid'], movementPattern: 'push_horizontal', difficulty: 'advanced', progression: 'ex_db_bench_press', regression: null, environment: 'gym', description: '1. Lie on a flat bench with your feet firmly on the floor. 2. Grip the barbell with hands slightly wider than shoulder-width. 3. Lower the bar to your mid-chest, keeping your elbows tucked at about a 45-degree angle. 4. Press the bar back up to the starting position.' }],
        dumbbells_pair: [
            { id: 'ex_db_bench_press', content: 'Dumbbell Bench Press', type: 'log', target: { sets: 3, minReps: 8, maxReps: 12 }, weight: 15, baseVolume: { weight: 15, reps: 10 }, requires: ['dumbbells_pair', 'bench'], history: [], primaryMuscle: 'pectorals', secondaryMuscles: ['triceps', 'anterior_deltoid'], movementPattern: 'push_horizontal', difficulty: 'intermediate', progression: 'ex_pushup', regression: 'ex_bench_press', environment: 'all', description: '1. Lie on a flat bench holding a dumbbell in each hand at your chest. 2. Press the dumbbells up until your arms are fully extended. 3. Lower the dumbbells slowly and with control to the sides of your chest.' },
            { id: 'ex_db_incline_press', content: 'Dumbbell Incline Press', type: 'log', target: { sets: 3, minReps: 8, maxReps: 12 }, weight: 12, baseVolume: { weight: 12, reps: 10 }, requires: ['dumbbells_pair', 'bench'], history: [], primaryMuscle: 'upper_pectorals', secondaryMuscles: ['anterior_deltoid', 'triceps'], movementPattern: 'push_incline', difficulty: 'intermediate', progression: 'ex_incline_pushup', regression: null, environment: 'all', description: '1. Lie on a bench set to a 30-45 degree incline. 2. Hold a dumbbell in each hand at your upper chest. 3. Press the dumbbells up and slightly back until your arms are extended. 4. Lower the dumbbells slowly to the starting position.' }
        ],
        bodyweight: [
            { id: 'ex_pushup', content: 'Push-ups', type: 'log', target: { sets: 3, toFailure: true }, weight: 0, baseVolume: { weight: 0, reps: 15 }, requires: ['bodyweight'], history: [], pro_tip: "Maintain a straight line from your head to your heels. Don't let your hips sag.", primaryMuscle: 'pectorals', secondaryMuscles: ['triceps', 'anterior_deltoid'], movementPattern: 'push_horizontal', difficulty: 'intermediate', progression: 'ex_incline_pushup', regression: 'ex_decline_pushup', environment: 'all', description: '1. Start in a high plank position with hands slightly wider than your shoulders. 2. Keep your body in a straight line from head to heels. 3. Lower your body until your chest nearly touches the floor. 4. Push back up to the starting position.' },
            { id: 'ex_decline_pushup', content: 'Decline Push-ups', type: 'log', target: { sets: 3, toFailure: true }, weight: 0, baseVolume: { weight: 0, reps: 10 }, requires: ['bodyweight'], history: [], primaryMuscle: 'upper_pectorals', secondaryMuscles: ['anterior_deltoid', 'triceps'], movementPattern: 'push_incline', difficulty: 'advanced', progression: 'ex_pushup', regression: null, environment: 'all', description: '1. Place your feet on an elevated surface like a bench or step. 2. Assume a push-up position with your hands on the floor. 3. Perform a push-up, focusing on the upper part of your chest.' },
            { id: 'ex_incline_pushup', content: 'Incline Push-ups', type: 'log', target: { sets: 3, minReps: 10, maxReps: 15 }, weight: 0, baseVolume: { weight: 0, reps: 12 }, requires: ['bodyweight'], history: [], primaryMuscle: 'lower_pectorals', secondaryMuscles: ['triceps', 'anterior_deltoid'], movementPattern: 'push_horizontal', difficulty: 'beginner', progression: null, regression: 'ex_pushup', environment: 'all', description: '1. Place your hands on an elevated surface like a bench or wall. 2. Assume a push-up position with your feet on the floor. 3. Perform a push-up. The higher the surface, the easier the exercise.' },
            { id: 'ex_diamond_pushup', content: 'Diamond Push-ups', type: 'log', target: { sets: 3, toFailure: true }, weight: 0, baseVolume: { weight: 0, reps: 8 }, requires: ['bodyweight'], history: [], primaryMuscle: 'triceps', secondaryMuscles: ['pectorals'], movementPattern: 'push_horizontal', difficulty: 'advanced', progression: 'ex_pushup', regression: null, environment: 'all', description: '1. Assume a push-up position, but place your hands close together under your chest, forming a diamond shape with your thumbs and index fingers. 2. Perform a push-up, keeping your elbows tucked close to your body.' }
        ]
    },
    'Back': {
        barbell: [
            { id: 'ex_bent_over_row', content: 'Bent-Over Row', type: 'log', target: { sets: 3, minReps: 6, maxReps: 10 }, weight: 40, baseVolume: { weight: 40, reps: 8 }, requires: ['barbell'], history: [], primaryMuscle: 'lats', secondaryMuscles: ['biceps', 'rhomboids', 'rear_deltoid'], movementPattern: 'pull_horizontal', difficulty: 'advanced', progression: 'ex_db_row', regression: null, environment: 'gym', description: '1. Stand with feet shoulder-width apart, holding a barbell with an overhand grip. 2. Hinge at your hips until your torso is nearly parallel to the floor, keeping your back straight. 3. Pull the barbell up towards your lower chest, squeezing your back muscles. 4. Lower the bar with control.' },
            { id: 'ex_pendlay_row', content: 'Pendlay Row', type: 'log', target: { sets: 3, minReps: 5, maxReps: 8 }, weight: 45, baseVolume: { weight: 45, reps: 6 }, requires: ['barbell'], history: [], primaryMuscle: 'lats', secondaryMuscles: ['biceps', 'rhomboids'], movementPattern: 'pull_horizontal', difficulty: 'advanced', progression: 'ex_bent_over_row', regression: null, environment: 'gym', description: '1. Hinge at the hips with a flat back, gripping a barbell on the floor. 2. Explosively pull the bar from the floor to your lower chest. 3. Let the bar return to a dead stop on the floor after each rep.' }
        ],
        pullup_bar: [
            { id: 'ex_pullup', content: 'Pull-ups', type: 'log', target: { sets: 3, toFailure: true }, weight: 0, baseVolume: { weight: 0, reps: 5 }, requires: ['pullup_bar'], history: [], pro_tip: "Initiate the pull with your back muscles, not just your arms. Think about pulling your elbows down to your hips.", primaryMuscle: 'lats', secondaryMuscles: ['biceps', 'rhomboids'], movementPattern: 'pull_vertical', difficulty: 'advanced', progression: 'ex_inverted_row', regression: null, environment: 'all', description: '1. Hang from a pull-up bar with an overhand grip, slightly wider than your shoulders. 2. Pull your body up until your chin is over the bar, driving your elbows down. 3. Lower yourself back down with control.' },
            { id: 'ex_chinup', content: 'Chin-ups', type: 'log', target: { sets: 3, toFailure: true }, weight: 0, baseVolume: { weight: 0, reps: 6 }, requires: ['pullup_bar'], history: [], primaryMuscle: 'biceps', secondaryMuscles: ['lats'], movementPattern: 'pull_vertical', difficulty: 'intermediate', progression: 'ex_inverted_row', regression: 'ex_pullup', environment: 'all', description: '1. Hang from a pull-up bar with an underhand, shoulder-width grip. 2. Pull your body up until your chin is over the bar, focusing on using your biceps. 3. Lower yourself back down with control.' }
        ],
        dumbbells_pair: [
            { id: 'ex_db_row', content: 'Dumbbell Row', type: 'log', target: { sets: 3, minReps: 8, maxReps: 12 }, weight: 15, baseVolume: { weight: 15, reps: 10 }, requires: ['dumbbells_pair', 'bench'], history: [], primaryMuscle: 'lats', secondaryMuscles: ['biceps', 'rhomboids'], movementPattern: 'pull_horizontal', difficulty: 'intermediate', progression: 'ex_inverted_row', regression: 'ex_bent_over_row', environment: 'all', description: '1. Place one knee and hand on a bench, keeping your back flat. 2. Hold a dumbbell in the opposite hand with your arm extended. 3. Pull the dumbbell up towards your hip, squeezing your back muscles. 4. Lower the dumbbell slowly.' },
            { id: 'ex_incline_db_row', content: 'Incline Dumbbell Row', type: 'log', target: { sets: 3, minReps: 10, maxReps: 15}, weight: 12, baseVolume: { weight: 12, reps: 12 }, requires: ['dumbbells_pair', 'bench'], history: [], primaryMuscle: 'lats', secondaryMuscles: ['rhomboids', 'rear_deltoid'], movementPattern: 'pull_horizontal', difficulty: 'intermediate', environment: 'all', description: '1. Set an incline bench to about 45 degrees and lie chest-down. 2. Hold a dumbbell in each hand with a neutral grip. 3. Squeeze your shoulder blades together and pull the dumbbells up towards your chest. 4. Lower with control.' },
        ],
        bodyweight: [{ id: 'ex_inverted_row', content: 'Inverted Rows', type: 'log', target: { sets: 3, toFailure: true }, weight: 0, baseVolume: { weight: 0, reps: 10 }, requires: ['bodyweight'], history: [], primaryMuscle: 'lats', secondaryMuscles: ['biceps', 'rhomboids'], movementPattern: 'pull_horizontal', difficulty: 'beginner', progression: null, regression: 'ex_pullup', environment: 'all', description: '1. Lie under a sturdy bar or table. 2. Grab the bar with an overhand grip and pull your chest up towards it, keeping your body in a straight line. 3. Lower yourself back down with control.' }]
    },
    'Legs': {
        barbell: [{ id: 'ex_barbell_squat', content: 'Barbell Back Squat', type: 'log', target: { sets: 3, minReps: 5, maxReps: 8 }, weight: 50, baseVolume: { weight: 50, reps: 6 }, requires: ['barbell'], history: [], pro_tip: "Keep your chest up and drive through your heels. Aim for your thighs to be at least parallel to the floor.", primaryMuscle: 'quadriceps', secondaryMuscles: ['glutes', 'hamstrings', 'adductors'], movementPattern: 'squat', difficulty: 'advanced', progression: 'ex_goblet_squat', regression: null, environment: 'gym', description: '1. Stand with feet shoulder-width apart, barbell resting on your upper back. 2. Keep your chest up and core braced, hinge at your hips and bend your knees to lower down. 3. Descend until thighs are parallel to the floor. 4. Drive through your heels to return to the start.' }],
        dumbbells_single: [ { id: 'ex_goblet_squat', content: 'Dumbbell Goblet Squat', type: 'log', target: { sets: 3, minReps: 8, maxReps: 12 }, weight: 13, baseVolume: { weight: 13, reps: 10 }, requires: ['dumbbells_single'], history: [], primaryMuscle: 'quadriceps', secondaryMuscles: ['glutes', 'core'], movementPattern: 'squat', difficulty: 'intermediate', progression: 'ex_bw_squat', regression: 'ex_barbell_squat', environment: 'all', description: '1. Stand with feet slightly wider than shoulder-width, holding one end of a dumbbell vertically against your chest. 2. Keeping your chest up, lower into a squat until your elbows touch your knees. 3. Drive through your heels to return to the start.' }],
        dumbbells_pair: [{ id: 'ex_bulgarian_split_squat', content: 'Bulgarian Split Squats', type: 'log', target: { sets: 3, minReps: 10, maxReps: 15 }, weight: 8, baseVolume: { weight: 8, reps: 12 }, requires: ['dumbbells_pair', 'bench'], history: [], primaryMuscle: 'quadriceps', secondaryMuscles: ['glutes'], movementPattern: 'lunge', difficulty: 'intermediate', progression: 'ex_lunges', regression: null, environment: 'all', description: '1. Stand a few feet in front of a bench. Place the top of one foot on the bench behind you. 2. Holding dumbbells if using, lower your hips until your front thigh is parallel to the floor. 3. Push through your front foot to return to the start.' }],
        bodyweight: [
            { id: 'ex_bw_squat', content: 'Bodyweight Squats', type: 'log', target: { sets: 3, minReps: 15, maxReps: 20 }, weight: 0, baseVolume: { weight: 0, reps: 18 }, requires: ['bodyweight'], history: [], primaryMuscle: 'quadriceps', secondaryMuscles: ['glutes'], movementPattern: 'squat', difficulty: 'beginner', progression: null, regression: 'ex_goblet_squat', environment: 'all', description: '1. Stand with feet shoulder-width apart, chest up. 2. Lower your hips back and down as if sitting in a chair. 3. Keep your back straight and go as low as you comfortably can. 4. Push through your heels to stand back up.' },
            { id: 'ex_lunges', content: 'Lunges', type: 'log', target: { sets: 3, minReps: 10, maxReps: 15 }, weight: 0, baseVolume: { weight: 0, reps: 12 }, requires: ['bodyweight'], history: [], primaryMuscle: 'quadriceps', secondaryMuscles: ['glutes'], movementPattern: 'lunge', difficulty: 'beginner', progression: null, regression: 'ex_bulgarian_split_squat', environment: 'all', description: '1. Step forward with one leg and lower your hips until both knees are bent at a 90-degree angle. 2. Ensure your front knee is directly above your ankle. 3. Push off your front foot to return to the starting position. Alternate legs.' },
            { id: 'ex_jump_squats', content: 'Jump Squats', type: 'log', target: { sets: 3, minReps: 10, maxReps: 15 }, weight: 0, baseVolume: { weight: 0, reps: 12 }, requires: ['bodyweight'], history: [], primaryMuscle: 'quadriceps', secondaryMuscles: ['glutes', 'calves'], movementPattern: 'squat', difficulty: 'intermediate', progression: 'ex_bw_squat', regression: null, environment: 'all', description: '1. Perform a bodyweight squat. 2. From the bottom of the squat, explode upwards into a jump. 3. Land softly and immediately lower into the next squat.' }
        ]
    },
    'Hamstrings': {
         barbell: [
            { id: 'ex_barbell_rdl', content: 'Barbell Romanian Deadlift', type: 'log', target: { sets: 3, minReps: 8, maxReps: 12}, weight: 40, baseVolume: { weight: 40, reps: 10 }, requires: ['barbell'], history: [], primaryMuscle: 'hamstrings', secondaryMuscles: ['glutes', 'lower_back'], movementPattern: 'hinge', difficulty: 'advanced', environment: 'gym', description: '1. Stand with feet hip-width apart, holding a barbell. 2. Keeping your back straight, hinge at your hips and lower the bar. 3. Go as low as you can without rounding your back. 4. Drive your hips forward to return to the start.' }
         ],
         dumbbells_single: [{ id: 'ex_db_rdl', content: 'Dumbbell Romanian Deadlift', type: 'log', target: { sets: 3, minReps: 10, maxReps: 15 }, weight: 15, baseVolume: { weight: 15, reps: 12 }, requires: ['dumbbells_single'], history: [], primaryMuscle: 'hamstrings', secondaryMuscles: ['glutes', 'lower_back'], movementPattern: 'hinge', difficulty: 'intermediate', progression: 'ex_bw_glute_bridge', regression: null, environment: 'all', description: '1. Stand with feet hip-width apart, holding a dumbbell in each hand. 2. Keeping your back straight, hinge at your hips and lower the weights. 3. Keep the dumbbells close to your legs. 4. Drive your hips forward to return to the start.' }],
         dumbbells_pair: [
            { id: 'ex_db_good_morning', content: 'Dumbbell Good Mornings', type: 'log', target: { sets: 3, minReps: 12, maxReps: 15}, weight: 10, baseVolume: { weight: 10, reps: 13 }, requires: ['dumbbells_pair'], history: [], primaryMuscle: 'hamstrings', secondaryMuscles: ['glutes', 'lower_back'], movementPattern: 'hinge', difficulty: 'intermediate', environment: 'all', description: '1. Stand with feet shoulder-width apart, holding two dumbbells on your shoulders. 2. Keeping your legs almost straight, hinge at your hips and lower your torso until it\'s parallel to the floor. 3. Keep your back straight throughout. 4. Return to the starting position.' }
         ],
         bands: [{ id: 'ex_banded_leg_curl', content: 'Banded Leg Curl', type: 'log', target: { sets: 3, minReps: 15, maxReps: 25 }, weight: 0, baseVolume: { weight: 0, reps: 20 }, requires: ['bands'], history: [], primaryMuscle: 'hamstrings', secondaryMuscles: [], movementPattern: 'curl', difficulty: 'beginner', progression: null, regression: null, environment: 'home', description: '1. Anchor a resistance band to a low point. 2. Lie on your stomach and loop the other end around your ankle. 3. Curl your heel towards your glute against the band\'s resistance. 4. Return with control.' }]
    },
    'Glutes': {
         barbell: [{ id: 'ex_hip_thrust', content: 'Barbell Hip Thrust', type: 'log', target: { sets: 3, minReps: 8, maxReps: 12 }, weight: 40, baseVolume: { weight: 40, reps: 10 }, requires: ['barbell', 'bench'], history: [], primaryMuscle: 'glutes', secondaryMuscles: ['hamstrings'], movementPattern: 'hinge', difficulty: 'advanced', progression: 'ex_db_glute_bridge', regression: null, environment: 'gym', description: '1. Sit on the floor with your upper back against a bench and a barbell across your hips. 2. Drive your hips up towards the ceiling, squeezing your glutes. 3. Your body should form a straight line from your shoulders to your knees. 4. Lower your hips back down with control.' }],
         dumbbells_single: [{ id: 'ex_db_glute_bridge', content: 'Dumbbell Glute Bridge', type: 'log', target: { sets: 3, minReps: 12, maxReps: 18 }, weight: 15, baseVolume: { weight: 15, reps: 15 }, requires: ['dumbbells_single'], history: [], primaryMuscle: 'glutes', secondaryMuscles: ['hamstrings'], movementPattern: 'hinge', difficulty: 'intermediate', progression: 'ex_bw_glute_bridge', regression: 'ex_hip_thrust', environment: 'all', description: '1. Lie on your back with your knees bent and feet flat on the floor. 2. Place a dumbbell across your hips. 3. Drive your hips up towards the ceiling, squeezing your glutes. 4. Lower your hips back down with control.' }],
         dumbbells_pair: [
            { id: 'ex_db_step_ups', content: 'Dumbbell Step-Ups', type: 'log', target: { sets: 3, minReps: 10, maxReps: 15}, weight: 8, baseVolume: { weight: 8, reps: 12 }, requires: ['dumbbells_pair', 'bench'], history: [], primaryMuscle: 'glutes', secondaryMuscles: ['quadriceps'], movementPattern: 'lunge', difficulty: 'intermediate', environment: 'all', description: '1. Stand in front of a bench or step, holding dumbbells at your sides. 2. Step up onto the bench with one foot, driving through your heel. 3. Bring the other foot up to meet it. 4. Step back down and repeat, alternating the lead foot.' },
         ],
         bodyweight: [
            { id: 'ex_bw_glute_bridge', content: 'Bodyweight Glute Bridge', type: 'log', target: { sets: 3, minReps: 20, maxReps: 30 }, weight: 0, baseVolume: { weight: 0, reps: 25 }, requires: ['bodyweight'], history: [], primaryMuscle: 'glutes', secondaryMuscles: ['hamstrings'], movementPattern: 'hinge', difficulty: 'beginner', progression: null, regression: 'ex_db_glute_bridge', environment: 'all', description: '1. Lie on your back with your knees bent and feet flat on the floor. 2. Drive your hips up towards the ceiling, squeezing your glutes until you form a straight line from shoulders to knees. 3. Lower your hips back down with control.' },
            { id: 'ex_frog_pumps', content: 'Frog Pumps', type: 'log', target: { sets: 3, toFailure: true }, weight: 0, baseVolume: { weight: 0, reps: 30 }, requires: ['bodyweight'], history: [], primaryMuscle: 'glutes', secondaryMuscles: [], movementPattern: 'hinge', difficulty: 'beginner', progression: null, regression: null, environment: 'all', description: '1. Lie on your back with the soles of your feet together and knees out to the sides. 2. Drive your hips up towards the ceiling, focusing on squeezing your glutes. 3. Lower back down. The range of motion will be small.' }
        ]
    },
    'Shoulders': {
        barbell: [{ id: 'ex_overhead_press', content: 'Overhead Press', type: 'log', target: { sets: 3, minReps: 5, maxReps: 8 }, weight: 30, baseVolume: { weight: 30, reps: 6 }, requires: ['barbell'], history: [], primaryMuscle: 'anterior_deltoid', secondaryMuscles: ['triceps', 'medial_deltoid'], movementPattern: 'push_vertical', difficulty: 'advanced', progression: 'ex_db_shoulder_press', regression: null, environment: 'gym', description: '1. Stand with feet shoulder-width apart, holding a barbell at your shoulders with an overhand grip. 2. Brace your core and press the barbell directly overhead until your arms are fully extended. 3. Lower the bar back to your shoulders with control.' }],
        dumbbells_pair: [
            { id: 'ex_db_shoulder_press', content: 'Dumbbell Shoulder Press', type: 'log', target: { sets: 3, minReps: 8, maxReps: 12 }, weight: 10, baseVolume: { weight: 10, reps: 10 }, requires: ['dumbbells_pair'], history: [], primaryMuscle: 'anterior_deltoid', secondaryMuscles: ['triceps', 'medial_deltoid'], movementPattern: 'push_vertical', difficulty: 'intermediate', progression: 'ex_pike_pushup', regression: 'ex_overhead_press', environment: 'all', description: '1. Sit on a bench with back support, holding a dumbbell in each hand at shoulder height. 2. Press the dumbbells overhead until your arms are fully extended. 3. Lower the dumbbells back to your shoulders with control.' },
            { id: 'ex_lateral_raises', content: 'Lateral Raises', type: 'log', target: { sets: 3, minReps: 12, maxReps: 18 }, weight: 5, baseVolume: { weight: 5, reps: 15 }, requires: ['dumbbells_pair'], history: [], primaryMuscle: 'medial_deltoid', secondaryMuscles: [], movementPattern: 'raise', difficulty: 'beginner', progression: null, regression: null, environment: 'all', description: '1. Stand holding a dumbbell in each hand at your sides. 2. With a slight bend in your elbows, raise your arms out to your sides until they are parallel with the floor. 3. Lower the dumbbells back down with control.' }
        ],
        bodyweight: [{ id: 'ex_pike_pushup', content: 'Pike Push-ups', type: 'log', target: { sets: 3, toFailure: true }, weight: 0, baseVolume: { weight: 0, reps: 10 }, requires: ['bodyweight'], history: [], primaryMuscle: 'anterior_deltoid', secondaryMuscles: ['triceps'], movementPattern: 'push_vertical', difficulty: 'beginner', progression: null, regression: 'ex_db_shoulder_press', environment: 'all', description: '1. Get into a push-up position and walk your feet in, raising your hips into a downward dog pose. 2. Keeping your hips high, bend your elbows to lower the top of your head towards the floor. 3. Press back up to the starting position.' }]
    },
    'Arms': {
        dumbbells_pair: [
            { id: 'ex_bicep_curl', content: 'Bicep Curls', type: 'log', target: { sets: 3, minReps: 10, maxReps: 15 }, weight: 10, baseVolume: { weight: 10, reps: 12 }, requires: ['dumbbells_pair'], history: [], primaryMuscle: 'biceps', secondaryMuscles: [], movementPattern: 'curl', difficulty: 'beginner', progression: null, regression: null, environment: 'all', description: '1. Stand holding a dumbbell in each hand with an underhand grip. 2. Keeping your elbows pinned to your sides, curl the weights up towards your shoulders. 3. Squeeze your biceps at the top, then lower the weights with control.' },
            { id: 'ex_tricep_extension', content: 'Overhead Tricep Extension', type: 'log', target: { sets: 3, minReps: 10, maxReps: 15 }, weight: 8, baseVolume: { weight: 8, reps: 12 }, requires: ['dumbbells_pair'], history: [], primaryMuscle: 'triceps', secondaryMuscles: [], movementPattern: 'extension', difficulty: 'beginner', progression: null, regression: null, environment: 'all', description: '1. Sit or stand, holding one dumbbell with both hands overhead. 2. Lower the dumbbell behind your head by bending your elbows. 3. Extend your arms to raise the dumbbell back to the starting position.' }
        ],
        bodyweight: [{ id: 'ex_dips', content: 'Bench Dips', type: 'log', target: { sets: 3, toFailure: true }, weight: 0, baseVolume: { weight: 0, reps: 12 }, requires: ['bodyweight', 'bench'], history: [], primaryMuscle: 'triceps', secondaryMuscles: ['pectorals', 'anterior_deltoid'], movementPattern: 'push_vertical', difficulty: 'intermediate', progression: null, regression: null, environment: 'all', description: '1. Sit on the edge of a bench and place your hands on the edge, fingers forward. 2. Extend your legs out in front of you. 3. Slide your hips off the bench and lower your body by bending your elbows. 4. Push back up to the starting position.' }]
    },
    'Core': {
        pullup_bar: [
            { id: 'ex_hanging_knee_raises', content: 'Hanging Knee Raises', type: 'log', target: { sets: 3, minReps: 10, maxReps: 15 }, weight: 0, baseVolume: { weight: 0, reps: 12 }, requires: ['pullup_bar'], history: [], primaryMuscle: 'core', secondaryMuscles: [], movementPattern: 'flexion', difficulty: 'intermediate', environment: 'all', description: '1. Hang from a pull-up bar with an overhand grip. 2. Keeping your legs together, raise your knees towards your chest. 3. Lower your legs back down with control, avoiding swinging.' },
            { id: 'ex_hanging_leg_raises', content: 'Hanging Leg Raises', type: 'log', target: { sets: 3, minReps: 8, maxReps: 12 }, weight: 0, baseVolume: { weight: 0, reps: 10 }, requires: ['pullup_bar'], history: [], primaryMuscle: 'core', secondaryMuscles: [], movementPattern: 'flexion', difficulty: 'advanced', environment: 'all', description: '1. Hang from a pull-up bar. 2. Keeping your legs straight, raise them up until they are parallel to the floor. 3. Lower your legs back down with control, avoiding any swinging.' }
        ],
        bodyweight: [
            { id: 'ex_plank', content: 'Plank', type: 'log', target: { sets: 3, timeInSeconds: 60 }, weight: 0, baseVolume: { weight: 0, reps: 60 }, requires: ['bodyweight'], history: [], primaryMuscle: 'core', secondaryMuscles: [], movementPattern: 'anti_extension', difficulty: 'beginner', progression: null, regression: null, environment: 'all', description: '1. Hold a push-up position, but with your weight resting on your forearms instead of your hands. 2. Keep your body in a straight line from head to heels, bracing your core and glutes. Hold for the prescribed time.' },
            { id: 'ex_crunches', content: 'Crunches', type: 'log', target: { sets: 3, minReps: 15, maxReps: 25 }, weight: 0, baseVolume: { weight: 0, reps: 20 }, requires: ['bodyweight'], history: [], primaryMuscle: 'core', secondaryMuscles: [], movementPattern: 'flexion', difficulty: 'beginner', environment: 'all', description: '1. Lie on your back with your knees bent and feet flat on the floor. 2. Place your hands behind your head or across your chest. 3. Lift your head and shoulder blades off the floor, crunching your abs. 4. Lower back down with control.' },
            { id: 'ex_leg_raises', content: 'Lying Leg Raises', type: 'log', target: { sets: 3, toFailure: true }, weight: 0, baseVolume: { weight: 0, reps: 15 }, requires: ['bodyweight'], history: [], primaryMuscle: 'core', secondaryMuscles: [], movementPattern: 'flexion', difficulty: 'intermediate', progression: null, regression: null, environment: 'all', description: '1. Lie on your back with your legs straight. 2. Keeping your legs straight, raise them up towards the ceiling until they are perpendicular to the floor. 3. Slowly lower them back down, stopping just before they touch the floor.' },
            { id: 'ex_vups', content: 'V-Ups', type: 'log', target: { sets: 3, minReps: 10, maxReps: 20 }, weight: 0, baseVolume: { weight: 0, reps: 15 }, requires: ['bodyweight'], history: [], primaryMuscle: 'core', secondaryMuscles: [], movementPattern: 'flexion', difficulty: 'advanced', environment: 'all', description: '1. Lie on your back with your arms extended behind your head. 2. In one motion, simultaneously lift your legs and torso up, reaching your hands towards your feet. 3. Your body should form a "V" shape at the top. 4. Lower back down with control.' },
            { id: 'ex_dead_bug', content: 'Dead Bug', type: 'log', target: { sets: 3, minReps: 10, maxReps: 15 }, weight: 0, baseVolume: { weight: 0, reps: 12 }, requires: ['bodyweight'], history: [], primaryMuscle: 'core', secondaryMuscles: [], movementPattern: 'anti_extension', difficulty: 'beginner', progression: null, regression: null, environment: 'all', description: '1. Lie on your back with your arms extended towards the ceiling and your knees bent at 90 degrees. 2. Slowly lower your right arm and left leg towards the floor. 3. Return to the start and repeat with the opposite limbs.' },
            { id: 'ex_russian_twist', content: 'Russian Twists', type: 'log', target: { sets: 3, minReps: 15, maxReps: 20 }, weight: 0, baseVolume: { weight: 0, reps: 18 }, requires: ['bodyweight'], history: [], primaryMuscle: 'obliques', secondaryMuscles: ['core'], movementPattern: 'rotation', difficulty: 'beginner', progression: null, regression: 'ex_db_russian_twist', environment: 'all', description: '1. Sit on the floor with your knees bent and feet elevated. 2. Lean back slightly to engage your core. 3. Twist your torso from side to side, touching your hands to the floor on each side.' }
        ],
        dumbbells_single: [
            { id: 'ex_db_weighted_crunch', content: 'Weighted Crunches', type: 'log', target: { sets: 3, minReps: 12, maxReps: 20 }, weight: 5, baseVolume: { weight: 5, reps: 15 }, requires: ['dumbbells_single'], history: [], primaryMuscle: 'core', secondaryMuscles: [], movementPattern: 'flexion', difficulty: 'intermediate', environment: 'all', description: '1. Lie on your back with your knees bent, holding a dumbbell against your chest. 2. Perform a crunch, lifting your head and shoulder blades off the floor. 3. Lower back down with control.' },
            { id: 'ex_db_russian_twist', content: 'Dumbbell Russian Twists', type: 'log', target: { sets: 3, minReps: 12, maxReps: 18 }, weight: 5, baseVolume: { weight: 5, reps: 15 }, requires: ['dumbbells_single'], history: [], primaryMuscle: 'obliques', secondaryMuscles: ['core'], movementPattern: 'rotation', difficulty: 'intermediate', progression: 'ex_russian_twist', regression: null, environment: 'all', description: '1. Sit on the floor with your knees bent and feet elevated, holding a dumbbell with both hands. 2. Lean back slightly to engage your core. 3. Twist your torso from side to side, moving the dumbbell across your body.' }
        ],
        bands: [
            { id: 'ex_banded_cable_crunch', content: 'Banded Crunches', type: 'log', target: { sets: 3, minReps: 15, maxReps: 25 }, weight: 0, baseVolume: { weight: 0, reps: 20 }, requires: ['bands'], history: [], primaryMuscle: 'core', secondaryMuscles: [], movementPattern: 'flexion', difficulty: 'intermediate', environment: 'all', description: '1. Anchor a resistance band to a high point. 2. Kneel facing away from the anchor, holding the band on either side of your head. 3. Crunch your torso down towards the floor, engaging your abs. 4. Return to the start with control.' },
            { id: 'ex_pallof_press', content: 'Pallof Press', type: 'log', target: { sets: 3, minReps: 10, maxReps: 15 }, weight: 0, baseVolume: { weight: 0, reps: 12 }, requires: ['bands'], history: [], primaryMuscle: 'core', secondaryMuscles: ['obliques'], movementPattern: 'anti_rotation', difficulty: 'intermediate', progression: null, regression: null, environment: 'all', description: '1. Anchor a band at chest height. Stand sideways to the anchor and hold the band with both hands at your chest. 2. Press the band straight out in front of you, resisting the rotational pull from the band. 3. Bring it back to your chest with control.' }
        ]
    },
    'HIIT': {
        bodyweight: [
            { id: 'ex_burpees_hiit', content: 'Burpees HIIT', details: '5 min - 30s on, 30s off', duration: 300, type: 'timer', requires: ['bodyweight'], tags: ['hiit', 'cardio', 'full body', 'explosive'], primaryMuscle: 'full_body', movementPattern: 'dynamic', difficulty: 'advanced', environment: 'all', description: '1. From standing, drop into a squat and place your hands on the floor. 2. Kick your feet back to a plank position. 3. Immediately return your feet to the squat position. 4. Jump up explosively from the squat. Repeat.' },
            { id: 'ex_high_knees_hiit', content: 'High Knees HIIT', details: '5 min - 30s on, 30s off', duration: 300, type: 'timer', requires: ['bodyweight'], tags: ['hiit', 'cardio', 'full body'], primaryMuscle: 'full_body', movementPattern: 'dynamic', difficulty: 'intermediate', environment: 'all', description: '1. Stand in place and run, driving your knees up towards your chest as high as possible. 2. Maintain a fast pace for the duration of the work interval.' }
        ],
        jump_rope: [
            { id: 'ex_jump_rope_hiit', content: 'Jump Rope HIIT', details: '10 min - 45s on, 15s off', duration: 600, type: 'timer', requires: ['jump_rope'], tags: ['hiit', 'cardio', 'coordination'], primaryMuscle: 'full_body', movementPattern: 'dynamic', difficulty: 'intermediate', environment: 'all', description: '1. Jump with a rope at a consistent, fast pace. 2. Keep your feet close together and jump just high enough to clear the rope.' }
        ]
    },
    'Cardio': {
        bodyweight: [
            { id: 'ex_steady_walk', content: '30-Min Brisk Walk', details: '30 minutes', duration: 1800, type: 'info', requires: ['bodyweight'], tags: ['cardio', 'liss', 'recovery'], primaryMuscle: 'full_body', movementPattern: 'dynamic', difficulty: 'beginner', environment: 'all', description: 'Walk at a steady, brisk pace for 30 minutes, aiming to keep your heart rate in a low to moderate zone.' },
            { id: 'ex_steady_bike', content: '20-Min Stationary Bike', details: '20 minutes', duration: 1200, type: 'info', requires: ['bodyweight'], tags: ['cardio', 'liss', 'recovery'], primaryMuscle: 'full_body', movementPattern: 'dynamic', difficulty: 'beginner', environment: 'gym', description: 'Use a stationary bike for 20 minutes at a pace you can comfortably maintain a conversation at.' }
        ]
    },
    'Mobility': {
        bodyweight: [
            { id: 'recovery_hip_mobility', content: 'The Foundation: Hip Opening Flow', details: 'Approx. 11 min', duration: 670, type: 'info', requires: ['bodyweight'], routine: 'hip_mobility_flow', tags: ['mobility', 'yoga', 'hips', 'recovery'], primaryMuscle: 'hips', movementPattern: 'stretch', difficulty: 'beginner', environment: 'all', description: 'Purpose: To improve flexibility in your hips and glutes, which can help increase squat depth and reduce lower back discomfort.' },
            { id: 'recovery_spinal_decompression', content: 'Spinal Reset: Decompression Session', details: 'Approx. 12 min', duration: 720, type: 'info', requires: ['bodyweight', 'pullup_bar'], routine: 'spinal_decompression_flow', tags: ['mobility', 'yoga', 'spine', 'recovery'], primaryMuscle: 'spine', movementPattern: 'stretch', difficulty: 'beginner', environment: 'all', description: 'Purpose: To gently mobilize and create space in your spine, counteracting the compression from daily life and heavy lifting.' },
            { id: 'recovery_balance_core', content: 'Core Stability & Balance Builder', details: 'Approx. 10 min', duration: 570, type: 'info', requires: ['bodyweight'], routine: 'balance_core_flow', tags: ['mobility', 'balance', 'core', 'recovery'], primaryMuscle: 'core', movementPattern: 'stability', difficulty: 'beginner', environment: 'all', description: 'Purpose: To strengthen the deep core muscles that protect your spine and improve your balance, making your heavy lifts safer and stronger.' }
                ],
            }
        };
        const recipeLibrary = [
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
        const recoveryRoutineLibrary = {
            hip_mobility_flow: [
                { pose: '90/90 Hip Switches', duration: 60 },
                { pose: 'Frog Pose', duration: 90 },
                { pose: 'Pigeon Pose (Right)', duration: 90 },
                { pose: 'Pigeon Pose (Left)', duration: 90 },
                { pose: 'Deep Squat (Goblet) Hold', duration: 60 },
                { pose: 'Couch Stretch (Right)', duration: 60 },
                { pose: 'Couch Stretch (Left)', duration: 60 },
            ],
            spinal_decompression_flow: [
                { pose: 'Cat-Cow', duration: 90 },
                { pose: 'Thoracic Spine Rotations (Quadruped, Right)', duration: 60 },
                { pose: 'Thoracic Spine Rotations (Quadruped, Left)', duration: 60 },
                { pose: 'Child\'s Pose with Side Reach (Right)', duration: 60 },
                { pose: 'Child\'s Pose with Side Reach (Left)', duration: 60 },
                { pose: 'Passive Bar Hang', duration: 60 },
                { pose: 'Cobra Pose', duration: 60 },
                { pose: 'Supine Spinal Twists (Right)', duration: 60 },
                { pose: 'Supine Spinal Twists (Left)', duration: 60 },
            ],
            balance_core_flow: [
                { pose: 'Bird-Dog (Right)', duration: 60 },
                { pose: 'Bird-Dog (Left)', duration: 60 },
                { pose: 'Single-Leg Deadlift (Bodyweight, Right)', duration: 60 },
                { pose: 'Single-Leg Deadlift (Bodyweight, Left)', duration: 60 },
                { pose: 'Dead Bug', duration: 90 },
                { pose: 'Side Plank (Right)', duration: 45 },
                { pose: 'Side Plank (Left)', duration: 45 },
                { pose: 'Glute Bridge Hold', duration: 90 },
            ]
        };
        const icons = { 
            log: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dumbbell"><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m6 2 4 4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/></svg>', 
            diet: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-utensils-crossed"><path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8Z"/><path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 1.8.7 2.5 0l7.3-7.3a4.2 4.2 0 0 0 0-6L15 15Z"/></svg>', 
            history: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-history"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>', 
            swap: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-repeat"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>',
            info: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
            badge: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-award"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>',
            export: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>'
        };
        const contraindications = {
            knees: ['ex_barbell_squat', 'ex_lunges', 'ex_jump_rope_hiit', 'ex_jump_squats'],
            shoulders: ['ex_overhead_press', 'ex_db_incline_press', 'ex_db_shoulder_press'],
            lower_back: ['ex_bent_over_row', 'ex_good_mornings', 'ex_barbell_rdl']
        };
