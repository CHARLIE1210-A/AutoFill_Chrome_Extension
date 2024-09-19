// Function to autofill form fields
function autofillForm(details) {
    // Define selectors to target common input fields for job application forms
    const formFields = {
        fullName: ['input[name*="fullName"]', 'input[id*="name"]', 'input[class*="name"]'],
        email: ['input[type="email"]', 'input[name*="mail"]'],
        phone: ['input[type="tel"]', 'input[name*="phone"]', 'input[id*="phone"]'],
        address: ['textarea[name*="address"]', 'input[name*="address"]', 'textarea[id*="address"]']
    };

    // Fill form fields with personal details
    const fieldsToFill = {
        fullName: document.querySelector(formFields.fullName.join(',')),
        email: document.querySelector(formFields.email.join(',')),
        phone: document.querySelector(formFields.phone.join(',')),
        address: document.querySelector(formFields.address.join(','))
    };

    // Autofill each field if it exists
    for (const [key, field] of Object.entries(fieldsToFill)) {
        if (field) field.value = details[key];
    }

    // Once autofill is done, notify the background script
//     chrome.runtime.sendMessage({ 
//         message: "autofill_completed" ,
//         details: {
//             fullName: details.fullName,
//             email: details.email,
//             phone: details.phone,
//             address: details.address
//         }
//     },
//     function(response) {
//         if (chrome.runtime.lastError) {
//             console.error("Error sending message:", chrome.runtime.lastError);
//         } else {
//             console.log("Response from background script:", response);
//         }
//     } 
// );
}


// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "autofill_form") {
        // Fetch personal details from local storage
        chrome.storage.local.get('personalDetails', function(result) {
            const personalDetails = result.personalDetails;
            if (personalDetails) {
                autofillForm(personalDetails);
            } else {
                alert("No personal details found.");
            }
            sendResponse({ status: 'Form autofilled' });
        });
    }
});
