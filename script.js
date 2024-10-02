document.addEventListener("DOMContentLoaded", function () {
    var currentStep = 0;
    showStep(currentStep);

    function showStep(n) {
        var steps = document.getElementsByClassName("step");
        steps[n].style.display = "block";
        if (n === 0) {
            document.getElementById("prevBtn").style.display = "none";
        } else {
            document.getElementById("prevBtn").style.display = "inline";
        }
        if (n === (steps.length - 1)) {
            document.getElementById("nextBtn").style.display = "none";
            document.getElementById("submitBtn").style.display = "inline";
        } else {
            document.getElementById("nextBtn").style.display = "inline";
            document.getElementById("submitBtn").style.display = "none";
        }
    }

    function nextPrev(n) {
        var steps = document.getElementsByClassName("step");
        steps[currentStep].style.display = "none";
        currentStep += n;
        if (currentStep >= steps.length) {
            document.getElementById("fitnessForm").submit();
            return false;
        }
        showStep(currentStep);
    }
   
    // Show/hide "Other" input field in family history
    var otherDiseaseCheck = document.getElementById("otherDiseaseCheck");
    var otherDiseaseText = document.getElementById("otherDiseaseText");
    otherDiseaseCheck.addEventListener("change", function () {
        otherDiseaseText.style.display = this.checked ? "block" : "none";
    });

    // Prevent form submission without answers
    document.getElementById("fitnessForm").addEventListener("submit", function (event) {
        event.preventDefault();

        // Collect form data and convert to JSON
        var formData = new FormData(this);
        var formObject = {};
        formData.forEach((value, key) => {
            // Handle multiple values for 'familyHistory' checkboxes
            if (!formObject[key]) {
                formObject[key] = value;
            } else if (Array.isArray(formObject[key])) {
                formObject[key].push(value);
            } else {
                formObject[key] = [formObject[key], value];
            }
        });

        // Send JSON data to the server
        fetch('http://localhost:3000/submit-form', {  // Use your backend endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObject),  // Send as JSON
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .then(data => {
            console.log('Success:', data);
            alert('Form submitted successfully!');
            document.getElementById("fitnessForm").reset(); // Optionally reset the form
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error submitting form');
        });
        fetch('/submit-form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formObject),  // Use formObject here
        })
        .then(response => {
            if (!response.ok) throw new Error('Error: ${response.statusText}');
            return response.json();
        })
        .then(result => alert('Form submitted successfully!'))
        .catch(error => alert('Error submitting form: ' + error.message));;

    });
    fetch('https://api.spoonacular.com/recipes/complexSearch', {
        method: 'GET', // or 'POST' depending on your API
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 138612bb38204b1a9b4682cfae4eaa00', // Use your actual API key here
        },
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));


    window.nextPrev = nextPrev;
});
