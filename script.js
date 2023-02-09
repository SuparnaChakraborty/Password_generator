// Array of special characters to be included in password
var specialCharacters = ['@', '%', '+', '\\', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', '}', '{', ']', '[', '~', '-', '_', '.',];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N', 'O','P','Q','R','S','T','U','V','W','X','Y','Z',
];

// get user input options
let rangeValueHTML = document.getElementById('rangeValue');
let lengthInput = document.getElementById('lengthOption');
let passwordLength = lengthInput.value;
rangeValueHTML.innerHTML = passwordLength;
// display selected character value
lengthInput.oninput = function() {
  passwordLength = lengthInput.value;
  rangeValueHTML.innerHTML = passwordLength;
  // return updated value
  return passwordLength;
};
let lowercaseOption = document.getElementById('lowercaseOption');
let uppercaseOption = document.getElementById('uppercaseOption');
let numericOption = document.getElementById('numericOption');
let specialOption = document.getElementById('specialOption');

// create array to store user input
let userChoiceArray = [];
// Function to get user's password options from input
function getPasswordOptions() {
  // create array of objects for html option ID and corresponding character array
  let options = [
    { optionId: lowercaseOption, charArray: lowerCasedCharacters },
    { optionId: uppercaseOption, charArray: upperCasedCharacters },
    { optionId: numericOption, charArray: numericCharacters },
    { optionId: specialOption, charArray: specialCharacters },
  ];
  options.forEach(function(option) {
    // update: I was getting 'on' values in the old array (using just options.value)
    // method with object referencing DOM checkbox id and pairing it with the array of characters allows to get the correct userChoiceArray
    let checkbox = option.optionId;
    if (checkbox.checked) {
      userChoiceArray = userChoiceArray.concat(option.charArray);
    }
    // dynamically adjust user input array values
    checkbox.addEventListener('change', function() {
      if (checkbox.checked) {
        userChoiceArray = userChoiceArray.concat(option.charArray);
      } else {
        // filter array to only include checked checkboxes corresponding arrays and remove everything that isn't matching that corresponding array characters

        // classic function declaration
        // userChoiceArray = userChoiceArray.filter(function (char) {
        //   return !option.charArray.includes(char);
        // });

        // arrow function
        userChoiceArray = userChoiceArray.filter(
          (char) => !option.charArray.includes(char)
        );
      }
    });
  });
  // return to update the value
  return userChoiceArray;
}
// - update choice array values - this way it's dynamically updated when user
// makes changes before password is generated again
userChoiceArray = getPasswordOptions();
// initialise password variable
let password = '';
// Function for getting a random element from an array
function getRandom() {
  // reset password for each generate round
  password = '';
  for (let i = 0; i < passwordLength; i++) {
    let characterIndex = Math.floor(Math.random() * userChoiceArray.length);
    let character = userChoiceArray[characterIndex];
    password += character;
  }
}

// initialise passwordHTML variable to write error messsage
let passwordHTML = document.getElementById('password');
// Function to generate password with user input
function generatePassword() {
  getRandom(userChoiceArray, passwordLength);
  return password;
}

// Get references to the #generate element
const generateBtn = document.getElementById('generate');

// Write password to the #password input
function writePassword() {
  getPasswordOptions();
  // show error message when no checkboxes selected
  if (userChoiceArray.length === 0) {
    passwordHTML.value =
      'Please, select at least one option to generate a password';
    passwordHTML.classList.add('error-message');
    return;
  } else {
    let password = generatePassword();
    passwordHTML.classList.remove('error-message');
    passwordHTML.value = password;
  }
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);

// copy password
if (navigator && navigator.clipboard) {
  let copyButton = document.getElementById('copyButton');
  let password = document.querySelector('#password');

  copyButton.addEventListener(
    'click',
    (copyToClipboard = () => {
      // little animation on icon to give a feedback on a copy
      copyButton.classList.add('copied');
      setTimeout(() => copyButton.classList.remove('copied'), 500);

      navigator.clipboard.writeText(password.value);
    })
  );
} else {
  alert('Your browser does not support the Clipboard API');
}

