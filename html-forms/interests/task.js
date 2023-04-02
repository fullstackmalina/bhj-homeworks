const checkboxes = Array.from(document.querySelectorAll(".interest__check"));

function checkingDown(e) {
    if (e.target) {
        e = e.target;
    }
    if (
        e.closest(".interest").closest(".interests").classList.contains("interests_main")
    ) {
        drillDown(e);
        return;
    } else if (e.closest(".interest").querySelector(".interests")) {
        drillDown(e);
        return;
    }
}

function checkingUp(e) {
    if (e.target) {
        e = e.target;
    }
    if (e.closest(".interests").closest(".interest")) {
        goUp(e);
    }
}

function drillDown(e) {
    let innerCheckBoxes = Array.from(
        e.closest(".interest").querySelector(".interests").querySelectorAll(".interest__check")
    );
    innerCheckBoxes.forEach((checkbox) => {
        let isChecked = e.checked;
        checkbox.indeterminate = false;
        checkbox.checked = isChecked;
        checkbox.closest(".interest").querySelector(".interests")
            ? checkingDown(checkbox) : false;
    });
}

function goUp(e) {
    let actualCheckboxes = Array.from(
        e.closest(".interests").querySelectorAll(".interest__check")
    );
    let upperCheckbox = e.closest(".interests").closest(".interest").querySelector(".interest__check");

    if (actualCheckboxes.every((item) => item.checked)) {
        upperCheckbox.indeterminate = false;
        upperCheckbox.checked = true;
    } else if (actualCheckboxes.some((item) => item.checked)) {
        upperCheckbox.checked = false;
        upperCheckbox.indeterminate = true;
    } else {
        upperCheckbox.indeterminate = false;
        upperCheckbox.checked = false;
    }
    if (
        !upperCheckbox.closest(".interests").classList.contains("interests_main")
    ) {
        goUp(upperCheckbox);
    }
}

checkboxes.forEach((checkbox) =>
    checkbox.addEventListener("change", checkingDown)
);
checkboxes.forEach((checkbox) =>
    checkbox.addEventListener("change", checkingUp)
);