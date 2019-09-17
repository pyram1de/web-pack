export default (text = "hello Dave!") => {
    const element = document.createElement("div");

    element.innerHTML = text;
    return element;
};

