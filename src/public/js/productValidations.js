window.addEventListener("load", () => {
    function hiddenCreateBtn() {
        createBtn.style.display = "none";
    }

    function createErrorMessage({ field, inputField, message }) {
        const errorMessage = document.createElement("p");

        errorMessage.classList.add("error", `error-${field}`);

        if (field != "checkbox-color") {
            inputField.classList.remove("valid");
            inputField.classList.add("is-invalid");
        }

        errorMessage.innerText = message;

        inputField.parentNode.insertBefore(errorMessage, inputField.nextSibling);
    }

    function validations(field, inputField) {
        const errorMessages = document.querySelectorAll(`p.error-${field}`);

        if (field == "images" && inputField.files.length > 0) {
            const acceptedExtensions = ['jpg', 'jpeg', 'png'];

            for (let i = 0; i < inputField.files.length; i++) {
                const filetType = inputField.files[i].type.split("/")[1];

                if (!acceptedExtensions.includes(filetType)) {
                    createErrorMessage({ field, inputField, message: "No aceptamos ese formato, aceptamos: ." + acceptedExtensions.join(" .") });

                    inputField.value = "";

                    hiddenCreateBtn();
                }
            }
        }

        if (field != "images" && (!inputField.value || !inputField.value.trim().length > 0)) {
            createErrorMessage({ field, inputField, message: "Este campo no puede estar vacio" });

            hiddenCreateBtn();
        }

        if (["year", "price", "discount"].includes(field) && !Number(inputField.value)) {
            createErrorMessage({ field, inputField, message: "Debes poner un valor númerico" })

            hiddenCreateBtn();
        }

        if (field == "name" && inputField.value.length < 5) {
            createErrorMessage({ field, inputField, message: "5 caracteres minimo" });

            hiddenCreateBtn();
        }

        if (field == "description" && inputField.value.length < 20) {
            createErrorMessage({ field, inputField, message: "20 caracteres minimo" });

            hiddenCreateBtn();
        }

        if (errorMessages) {
            errorMessages.forEach(message => {
                message.remove();
            })
        }

        if (!document.querySelectorAll("p.error").length) {
            createBtn.style.display = "revert";
            return true;
        }
    }

    function colorsValidations(checkboxes) {
        let bool;

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                bool = true;
            }
        })

        const divColors = document.getElementById("colors");

        if (!bool && !document.querySelector("p.error-checkbox-color")) {
            createErrorMessage({ field: "checkbox-color", inputField: divColors, message: "Seleeciona un color" });
            hiddenCreateBtn();
        }

        return bool;
    }


    const fields = ["name", "description", "price", "discount", "category", "highlight", "model", "year", "size", "weight", "features", "images"];

    const createBtn = document.querySelector(".create-button");

    const checkboxes = document.querySelectorAll("input.checkbox-color");

    fields.forEach(field => {
        const inputField = document.getElementById(field);

        inputField.addEventListener("focusout", () => {
            validations(field, inputField);

            if (document.querySelectorAll(`p.error-${field}`).length <= 0) {
                inputField.classList.remove("is-invalid");
                inputField.classList.add("valid");
            }
        })

        createBtn.addEventListener("click", (e) => {
            const validationsBool = validations(field, inputField);

            const colorsValidationsBool = colorsValidations(checkboxes);

            if (!validationsBool || !colorsValidationsBool) {
                e.preventDefault();
            }
        })
    })

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("click", () => {
            const errorMessageCheckBox = document.querySelector("p.error-checkbox-color");

            if (checkbox.checked) {
                checkbox.classList.add("valid");
                errorMessageCheckBox ? errorMessageCheckBox.remove() : null;
            }
        })
    })
})