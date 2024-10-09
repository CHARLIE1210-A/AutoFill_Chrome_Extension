// Function to autofill form fields
function autofillForm(details) {

    // Define patterns for each field to match labels and attributes using regex
    const fieldPatterns = {
        firstName: {
            label: /first\s*name/i,
            attributeRegex: /name=["']?.*first.*name["']?|id=["']?.*first.*name["']?|autocomplete=["']?given-name["']?/i
        },
        lastName: {
            label: /last\s*name/i,
            attributeRegex: /name=["']?.*last.*name["']?|id=["']?.*last.*name["']?|autocomplete=["']?family-name["']?/i
        },
        dateOfBirth: {
            label: /date\s*of\s*birth|dob/i,
            attributeRegex: /type=["']?date["']?|name=["']?.*birth["']?|id=["']?.*dob["']?|autocomplete=["']?bday["']?/i
        },
        streetAddress: {
            label: /address|street|line\s*1/i,
            attributeRegex: /name=["']?.*address.*["']?|id=["']?.*street.*["']?|autocomplete=["']?address-line1["']?/i
        },
        city: {
            label: /city/i,
            attributeRegex: /name=["']?.*city["']?|id=["']?.*city["']?|autocomplete=["']?address-level2["']?/i
        },
        state: {
            label: /state|region/i,
            attributeRegex: /name=["']?.*state["']?|id=["']?.*state["']?|autocomplete=["']?address-level1["']?/i
        },
        country: {
            label: /country/i,
            attributeRegex: /name=["']?.*country["']?|id=["']?.*country["']?|autocomplete=["']?country["']?/i
        },
        zipCode: {
            label: /zip|postal/i,
            attributeRegex: /name=["']?.*(zip|postal)["']?|id=["']?.*(zip|postal)["']?|autocomplete=["']?postal-code["']?/i
        },
        email: {
            label: /email/i,
            attributeRegex: /type=["']?email["']?|name=["']?.*mail["']?|autocomplete=["']?email["']?/i
        },
        phoneNo: {
            label: /phone|mobile|contact/i,
            attributeRegex: /type=["']?tel["']?|name=["']?.*phone["']?|autocomplete=["']?tel["']?/i
        },
        gender: {
            label: /gender|sex/i,
            attributeRegex: /name=["']?.*gender["']?|id=["']?.*gender["']?|autocomplete=["']?sex["']?/i
        }
    };

    // Function to find an input by matching labels and attributes using regex
    function findInputByField(fieldPattern) {
        // 1. Attempt to find input by matching label
        const labels = document.querySelectorAll('label');
        for (let label of labels) {
            if (fieldPattern.label.test(label.textContent)) {
                // Check if label has a 'for' attribute linked to an input
                if (label.htmlFor) {
                    const input = document.getElementById(label.htmlFor);
                    if (input) return input;
                } else {
                    // Check if the input is within the label or adjacent to it
                    const input = label.querySelector('input, select, textarea') || label.nextElementSibling;
                    if (input && ['INPUT', 'SELECT', 'TEXTAREA'].includes(input.tagName)) {
                        return input;
                    }
                }
            }
        }

        // 2. If label-based matching fails, use regex for attribute-based matching
        const inputs = document.querySelectorAll('input, select, textarea');
        for (let input of inputs) {
            const inputString = input.outerHTML;
            if (fieldPattern.attributeRegex.test(inputString)) {
                return input;
            }
        }

        // 3. Return null if no matching input is found
        return null;
    }

    // Fill form fields with personal details based on matched fields
    const fieldsToFill = {
        firstName: findInputByField(fieldPatterns.firstName),
        lastName: findInputByField(fieldPatterns.lastName),
        dateOfBirth: findInputByField(fieldPatterns.dateOfBirth),
        streetAddress: findInputByField(fieldPatterns.streetAddress),
        city: findInputByField(fieldPatterns.city),
        state: findInputByField(fieldPatterns.state),
        country: findInputByField(fieldPatterns.country),
        zipCode: findInputByField(fieldPatterns.zipCode),
        email: findInputByField(fieldPatterns.email),
        phoneNo: findInputByField(fieldPatterns.phoneNo),
        gender: findInputByField(fieldPatterns.gender)
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
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === "autofill_form") {
        // Fetch personal details from local storage
        chrome.storage.local.get('personalDetails', function (result) {
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
