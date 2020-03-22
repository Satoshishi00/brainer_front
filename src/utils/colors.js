const myColors = {
    red: "#e84118",
    green: "#44bd32",
    grey: "#535c68",
    light_grey: "#f0f0f0",
};

const colors = color => {
    return myColors[color] || "grey";
};

export default colors;