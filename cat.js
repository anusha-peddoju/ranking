const fs = require('fs'); //importing file stream

// Read input from JSON file
const data = fs.readFileSync('input.json');
const skills = JSON.parse(data);

// Calculate rank based on percentages
for (let skill in skills) {
  skills[skill]['rankToday'] = getRank(skills[skill]['2019Score']);
  skills[skill]['rankFuture'] = getRank(skills[skill]['2024Score']);
  
}

// Identify top-3, bottom-3 of 2024
const sortedSkills = Object.keys(skills).sort(function(a, b) {
    
  return skills[b]['2024Score'] - skills[a]['2024Score'];
  
 
});
console.log("according to 2024Score:")
const top3_2024 = sortedSkills.slice(0, 3);
console.log("top3_2024:",{top3_2024});
const bottom3_2024 = sortedSkills.slice(-3);
console.log("bottom3_2024:",{bottom3_2024});


//identify top-3,bottom-3 of 2019
const sortedSkills1 = Object.keys(skills).sort(function(a, b) {
    
  return skills[b]['2019Score'] - skills[a]['2019Score'];
  
 
});
console.log("according to 2019 Score:");
const top3_2019 = sortedSkills1.slice(0, 3);
console.log("top3_2019:",top3_2019);
const bottom3_2019 = sortedSkills1.slice(-3);
console.log("bottom3_2019:",bottom3_2019);



//top-3 accelerating, and top-3 decelerating capabilities
const accelerating = sortedSkills.sort(function(a, b) {
  return skills[b]['2024Score'] - skills[b]['2019Score'] - (skills[a]['2024Score'] - skills[a]['2019Score']);
}).slice(0, 3);

console.log("top-3 accelerating capabilities:",accelerating);

const decelerating = sortedSkills.sort(function(a, b) {
  return skills[a]['2024Score'] - skills[a]['2019Score'] - (skills[b]['2024Score'] - skills[b]['2019Score']);
}).slice(0, 3);

console.log("top-3 accelerating capabilities:",decelerating);

// Output the rank of a skill based on user input
const inputSkill = 'Agility and Coordination';
console.log(`The rank of ${inputSkill} today is ${skills[inputSkill]['rankToday']} and the rank in 2024 is ${skills[inputSkill]['rankFuture']}`);

// Function to calculate rank based on percentage
function getRank(score) {
  let rank = Object.keys(skills).length;

  for (let skill in skills) {
    if (skills[skill]['2019Score'] > score) {
      rank--;
    }
  }
  return rank;
}
