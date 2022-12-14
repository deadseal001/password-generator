// Assignment code here

//main passwork generation function
function writePassword() {
  var length1 = passwordLength();
  console.log("Your pass word length is " + length1);
  var characterType = cType();
  console.log(characterType);
  var password = "";
  var password2 = "";
  var chTypeNumb = 0;
  var typeYes = 0;
  var typeNo = 0;
  password = ""
  //determin which characterTypes are used.
  for (var i = 0; i < 4; i++) {
    chTypeNumb = chTypeNumb + characterType[i].required;
    if (characterType[i].required == 1) {
      typeYes += 1;
      characterType[i].seq = typeYes;
    } else {
      characterType[i].seq = 4 - typeNo;
      typeNo += 1;
    }
  };

  //pick at least one chosen character type each
  for (var i = 0; i < typeYes; i++) {
    switch (i) {
      case characterType[0].seq - 1:
        password += pickLower();
        break;
      case characterType[1].seq - 1:
        password += pickUpper();
        break;
      case characterType[2].seq - 1:
        password += pickNumber();
        break;
      case characterType[3].seq - 1:
        password += pickSpecial();
        break;
    }
  };
  console.log("the first few characters with at least 1 type each:" + password);

  //choose all the other characters for the password.
  for (var i = 0; i < length1 - typeYes; i++) {
    var randomPickType = Math.floor(Math.random() * typeYes);
    switch (randomPickType) {
      case characterType[0].seq - 1:
        password += pickLower();
        break;
      case characterType[1].seq - 1:
        password += pickUpper();
        break;
      case characterType[2].seq - 1:
        password += pickNumber();
        break;
      case characterType[3].seq - 1:
        password += pickSpecial();
        break;
    };
  };

  console.log("all the letters with required length: "+ password);
  //randomize the sequence of all the chararcters. 
  for (var i = 0; i < length1; i++) {
    // debugger
    var pickseq = Math.floor(Math.random() * password.length);
    // console.log(pickseq);
    password2 = password2 + password.charAt(pickseq);
    password = password.substring(0, pickseq)+password.substring(pickseq+1,length1-i);
  };
  console.log("final password, which is randomized seq of password1: " + password2);
  // window.alert("Your auto-generated password is: " + password2);

  var passwordText = document.querySelector("#password");

  passwordText.value = password2;
}  

//function passwordLength() to ask for the leng of the password  need to debug
function passwordLength() {
  var pwLength = prompt("Please enter the length of the password. ");
  if (pwLength === null || pwLength === "") {
    console.log("pwLength: "+ pwLength);
    pwLength=passwordLength();
    return pwLength;
  } else {
    pwLength = parseInt(pwLength);
    if (pwLength > 7 && pwLength < 129) {
      window.alert("Generating a password with length of " + pwLength + "."); 
      console.log("pwlength89: " + pwLength);
      pwLength = pwLength;
      return pwLength;  //can't return the value from the second try.
    } else {
      console.log("pwLength2: "+ pwLength);
      window.alert('You did not enter a valid unmber. Please enter a number between 8 to 128.');
      pwLength=passwordLength();
      return pwLength;
    };
  };
};


//whether include certain type of characters.

function cType() {
  var characterType = [
    {
      type: "lowercased",
      required: 0,
      seq: 0,
    },
    {
      type: "UPPERCAED",
      required: 0,
      seq: 0,
    },
    {
      type: "numberic",
      required: 0,
      seq: 0,
    },
    {
      type: "special",
      required: 0,
      seq: 0,
    }
  ];
  console.log(characterType);
  var cTypeSum = 0;
  for (var i = 0; i < characterType.length; i++) {
    if (window.confirm("Do you need " + characterType[i].type + " chararcters in the password?")) {
      characterType[i].required = 1;
    };
    cTypeSum = cTypeSum + characterType[i].required;

  };
  console.log(cTypeSum);
  if (cTypeSum == 0) {
    window.alert("Please choose at lease one character type!");
    characterType=cType();
    return characterType;
  } else {
    return characterType;
  };
}

// function pick one lowercased character
function pickLower() {
  const lowerList = "abcdefghijklmnopqrstuvwxyz";
  var pickLower1 = lowerList.charAt(Math.floor(Math.random() * lowerList.length));
  return pickLower1;
}
//function pick one uppercased character
function pickUpper() {
  const upperList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var pickUpper1 = upperList.charAt(Math.floor(Math.random() * upperList.length));
  return pickUpper1;
}
//function pick one numberic character
function pickNumber() {
  const numberList = "0123456789";
  var pickNumber1 = numberList.charAt(Math.floor(Math.random()*10));
  return pickNumber1;
}
//function pick one special character
function pickSpecial() {
  const specialList ="!#$%&'()*+,-./:;<=>?@[\]^_`{|}~"
  var pickSpecial1 = specialList.charAt(Math.floor(Math.random()*specialList.length));
  return pickSpecial1;
}



// Get references to the #generate element
var generateBtn = document.querySelector("#generate");



// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
