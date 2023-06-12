


// Add input fields1
const inputDiv1 = d3.select("#input-fields1");
const table1 = inputDiv1.append("table");
table1.style('max-width', '100%')
.style("color","steelBlue");
// Create table header
const header1 = table1.append("thead").append("tr");
header1.append("th").text("input");
header1.append("th").text("R");
header1.append("th").text("X");

// Create table body
const tbody1 = table1.append("tbody");

const inputFields1 = tbody1.selectAll(".input-field1")
  .data(["Va",veca],["Vb",vecb],["Vc",vecc])
  .enter().append("tr")
  .attr("class", "input-field1")

// Add first column with input file labels
inputFields1.append("td")
  .text(d => `${d[0]}: `);

// Add second column with real input fields
inputFields1.append("td")
  .append("input")
  .style("width", "50px")
  .style("color","steelBlue")
  .attr("type", "number")
  .attr("step", "0.01")
  .attr("value", d => d[1][0])
  .attr("placeholder", "x")
  .attr("id", d => `${d[0]}-real`)
  .style("border", "1px solid steelBlue")
  .on("input", onInputChanged);

// Add third column with imaginary input fields
inputFields1.append("td")
  .append("input")
  .style("width", "50px")
  .style("color","steelBlue")
  .attr("type", "number")
  .attr("step", "0.01")
  .attr("value", d => d[1][1])
  .attr("placeholder", "y")
  .attr("id", d => `${d[0]}-imaginary`)
  .style("border", "1px solid steelBlue")
  .on("input", onInputChanged);

    
// Define input change function
function onInputChanged(event, d) {
    const phase = d[0];
    const inputType = event.target.id.split('-')[1];
    const newValue = parseFloat(event.target.value);
    
    if(phase[0]=== "I" || phase[0]=== "V") {
        if (inputType === "real") {
            vectorsData[phase].x = newValue;
        } else if (inputType === "imaginary") {
            vectorsData[phase].y = newValue;
        }
    }

    if(phase[0]=== "Z0" || phase[0]=== "Z1" || phase[0]=== "Z2") {
        if (inputType === "real") {
            impedanceData[phase].x = newValue;
        } else if (inputType === "imaginary") {
            impedanceData[phase].y = newValue;
        }
    }
	
    update2();
}



// Define update functions
function updateMainVisualization(phase) {
    const vector = mainGroup.selectAll(".vector")
        .filter(d => d[0] === phase);

    if (phase[0] != "Z"){
            vector.select("line")
                .attr("x2", d => ZIVxScale(d[1].x))
                .attr("y2", d => ZIVyScale(d[1].y));
    }
}

function updateInputFields(phaseData) {
    const phase = phaseData[0];
    const realInput = inputDiv.select(`#${phase}-real`);
    const imaginaryInput = inputDiv.select(`#${phase}-imaginary`);

realInput.property("value", phaseData[1].x.toFixed(2));
imaginaryInput.property("value", phaseData[1].y.toFixed(2));
}

function updateInputFields1(phaseData1) {
    const phase = phaseData1[0];
    const realInput1 = inputDiv1.select(`#${phase}-real`);
    const imaginaryInput1 = inputDiv1.select(`#${phase}-imaginary`);

realInput1.property("value", phaseData1[1].x.toFixed(2));
imaginaryInput1.property("value", phaseData1[1].y.toFixed(2));
}

// Create sequence visualizations
const sequences = ["Z0", "Z1", "Z2"];
const sequenceDivs = d3.select("#sequence-visualizations")
    .selectAll(".sequence-vis")
    .data(sequences)
    .enter().append("div")
    .attr("class", "sequence-vis");

sequenceDivs.append("h3")
    .text(d => `${d}`)
    .style("color","steelBlue")
    .style("font-size","1rem")
    .style("text-align","center");

sequenceDivs.append("svg")
    .attr("width", ZIVwidth / 3)
    .attr("height", ZIVheight / 3);

// Update sequence visualizations
function updateSequenceVisualizations() {
    const sequenceImpedances = calculateSequenceImpedances(allData);

    sequenceDivs.each(function (sequence, i) {
        const impedance = sequenceImpedances[Object.keys(sequenceImpedances)[i]];

        if (isNaN(impedance.x) || isNaN(impedance.y)) {
            return;
        }
        const x = ZIVwidth / 6;
        const y = ZIVheight / 6;

        const visGroup = d3.select(this).select("svg").selectAll("g")
            .data([{ x, y, impedance }])
            .join("g");

        visGroup.selectAll("line")
            .data(d => [d])
            .join("line")
            .attr("x1", d => d.x)
            .attr("y1", d => d.y)
            .attr("x2", d => d.x + ZIVxScale(impedance.x) - ZIVxScale(0))
            .attr("y2", d => d.y + ZIVyScale(impedance.y) - ZIVyScale(0))
            .style("stroke", "black")
            .attr("marker-end", "url(#arrow-Z)");

        visGroup.selectAll("text")
            .data(d => [d])
            .join("text")
            .attr("x", d => d.x + ZIVxScale(impedance.x) - ZIVxScale(0))
            .attr("y", d => d.y + ZIVyScale(impedance.y) - ZIVyScale(0))
            .attr("dx", 5)
            .attr("dy", -5)
            .style("font-size", "10px")
            .text(d => `${impedance.x.toFixed(2)} + j${impedance.y.toFixed(2)}`);
    });
}


// Calculate sequence impedances
function calculateSequenceImpedances(data) {

    const zeroSequence = ComplexOp.complexDivision(ComplexOp.complexAdd3(data.ZA, data.ZB, data.ZC), {x:3,y:0});
    const positiveSequence = ComplexOp.complexDivision(ComplexOp.complexAdd3(data.ZA, ComplexOp.complexMultiplication(data.ZB, ComplexOp.a), ComplexOp.complexMultiplication(data.ZC, ComplexOp.a)), {x:3,y:0});
    const negativeSequence = ComplexOp.complexDivision(ComplexOp.complexAdd3(data.ZA, ComplexOp.complexMultiplication(data.ZB, ComplexOp.a), ComplexOp.complexMultiplication(data.ZC, ComplexOp.a)), {x:3,y:0});

    return { zeroSequence, positiveSequence, negativeSequence };
}

updateSequenceVisualizations();


// Export data to CSV
function exportCSV() {
    const headers = ["Phase", "Real", "Imaginary"];
    const csvData = Object.entries(vectorsData)
        .map(([phase, {x, y}]) => [phase, x.toFixed(2), y.toFixed(2)]);

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += headers.join(",") + "\n";
    csvContent += csvData.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "phasor_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
