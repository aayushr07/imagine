// app/api/generate-diet-plan/route.js
export async function POST(request) {
    const {
      animalType,
      breed,
      age,
      weight,
      healthConditions,
      vaccinationStatus,
      feedingFrequency,
      activityLevel,
      dietaryRestrictions,
    } = await request.json();
  
    let foodRecommendations = '';
    let feedingSchedule = '';
    
    // Logic for diet and feeding based on the animal's information
    if (animalType === 'dog') {
      // Breed-specific feeding recommendations
      if (breed === 'labrador') {
        foodRecommendations = `Labrador dogs need a high-protein diet. Recommended food: Chicken, turkey, or lamb.`;
        if (age < 1) {
          foodRecommendations += ' Since your dog is a puppy, increase protein intake to support growth.';
        }
        feedingSchedule = `Feed your Labrador twice a day with 1.5 cups per meal.`;
      } else if (breed === 'german shepherd') {
        foodRecommendations = 'German Shepherds require a balanced diet with proteins, healthy fats, and moderate carbs. Recommended food: Beef and rice mix.';
        feedingSchedule = 'Feed your German Shepherd twice a day with 1.5 cups per meal.';
      }
      // Other dog breeds and logic can be added similarly
      if (activityLevel === 'high') {
        foodRecommendations += ' Since your dog is active, increase the protein intake by 25%.';
      }
    } else if (animalType === 'cow') {
      foodRecommendations = 'High-calcium cow feed, including hay and silage.';
      if (healthConditions === 'lactating') {
        foodRecommendations += ' For lactating cows, increase calcium and energy intake to support milk production.';
      }
      feedingSchedule = `Feed your cow ${feedingFrequency} with 10 kg of silage per meal.`;
    } else if (animalType === 'cat') {
      foodRecommendations = 'Grain-free food with high protein, such as fish or chicken.';
      if (age < 1) {
        foodRecommendations += ' For kittens, add milk or kitten-specific food for the first 6 months.';
      } else if (healthConditions === 'obesity') {
        foodRecommendations += ' For overweight cats, provide low-calorie food and reduce portion sizes.';
      }
      feedingSchedule = `Feed your cat ${feedingFrequency}, with 1/2 cup of food per meal.`;
    } else if (animalType === 'chicken') {
      foodRecommendations = 'Layer feed with additional calcium for egg-laying chickens.';
      if (activityLevel === 'high') {
        foodRecommendations += ' Provide more calcium-rich feed to support egg production.';
      }
      feedingSchedule = `Feed your chicken ${feedingFrequency} with 100 grams of feed per meal.`;
    }
  
    // Handling dietary restrictions, if any
    if (dietaryRestrictions) {
      foodRecommendations += ` Dietary restriction: ${dietaryRestrictions}.`;
    }
  
    // Include more detailed output based on age, weight, health, etc.
    if (age) {
      feedingSchedule += ` Based on the age of your animal, adjust portions accordingly.`;
    }
  
    if (weight) {
      feedingSchedule += ` Ensure your animal maintains a healthy weight. For overweight animals, consider reducing portions slightly.`;
    }
  
    // Return the diet plan as a JSON response
    return new Response(
      JSON.stringify({
        foodRecommendations,
        feedingSchedule,
        feedingFrequency,
        activityLevel,
      }),
      { status: 200 }
    );
  }
  