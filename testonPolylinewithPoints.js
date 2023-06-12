var dataRef;
var diff1;
var diff2;

VectorInputs(vis, dataRef, diff1, diff2);
// VectorInputs(vis2,"buttonText_SymetricalComponents2","rectText_SymetricalComponents2");

function VectorInputs(vis, dat, diff_1, diff2_2) {
  vis
    .attr("width", width_vis)
    .attr("height", h)
    .style("background-color", "green");

  var dist = function (va) {
    var x = va[0] - p0x;
    var y = va[1] - p0y;
    return Math.sqrt(x * x + y * y);
  };
  var angle = function (va) {
    return (Math.atan2(va[1], va[0]) * 180) / Math.PI;
  };
  var polyline = function (d) {
    return d
      .map(function (x) {
        return x.join(",");
      })
      .join(" ");
  };

  var symetricalComponents = true;
  let width_g1 = 275,
    height_g1 = 275;
  var vis_g1 = vis
    .append("g")
    .attr("width", width_g1)
    .attr("height", height_g1)
    .attr("id", "vis_g1");
  var vis_g2 = vis.append("g").attr("id", "vis_g2");
  var vis_g3 = vis.append("g").attr("id", "vis_g3");
  var vis_g4 = vis.append("g").attr("id", "vis_g4");
  var translate_vis = 0;
  vis_g1.attr("transform", "translate(" + 0 + ", " + 0 + ")");
  vis_g2.attr(
    "transform",
    "translate(" + (translate_vis + width_vis / 2 + 50) + ", " + -250 + ")"
  );
  vis_g3.attr(
    "transform",
    "translate(" + (translate_vis + width_vis / 2 + 50) + ", " + 0 + ")"
  );
  vis_g4.attr(
    "transform",
    "translate(" + (translate_vis + width_vis / 2 + 50) + ", " + 225 + ")"
  );
  //----------------------------
  //--- START SYMBOLS ----------
  //----------------------------
  vis
    .append("path")
    .attr("d", d3.symbol().type(d3.symbolCross).size(170))
    .attr(
      "transform",
      "translate(" + (width_vis / 2 + width_g1) + "," + 200 + ")"
    );

  vis
    .append("path")
    .attr("d", d3.symbol().type(d3.symbolCross).size(170))
    .attr(
      "transform",
      "translate(" + (width_vis / 2 + width_g1) + "," + 475 + ")"
    );

  var customSymbolS = {
    draw: function (context, size) {
      let s = size;
      context.moveTo(1.5 * s, 0);
      context.arcTo(2 * s, 0, 2 * s, -1 * s, s / 2);
      context.lineTo(2 * s, -4 * s);
      context.arcTo(2 * s, -5 * s, 2.5 * s, -5 * s, s / 2);
      context.arcTo(2 * s, -5 * s, 2 * s, -4 * s, s / 2);
      context.lineTo(2 * s, -1 * s);
      context.arcTo(2 * s, 0, 1.5 * s, 0, s / 2);

      context.moveTo(1.5 * s, 0);
      context.arcTo(2 * s, 0, 2 * s, 1 * s, s / 2);
      context.lineTo(2 * s, 4 * s);
      context.arcTo(2 * s, 5 * s, 2.5 * s, 5 * s, s / 2);
      context.arcTo(2 * s, 5 * s, 2 * s, 4 * s, s / 2);
      context.lineTo(2 * s, 1 * s);
      context.arcTo(2 * s, 0, 1.5 * s, 0, s / 2);
    },
  };

  var customS = d3.symbol().type(customSymbolS).size(60);
  vis
    .append("path")
    .attr("d", customS)
    .attr(
      "transform",
      "translate(" + (width_vis / 2 - 65) + "," + (475 + 200) / 2 + ")"
    )
    .attr("stroke", "black")
    .attr("stroke-width", "6");

  // use d3.symbol for equal sign
  var customSymbolEqual = {
    draw: function (context, size) {
      let s = Math.sqrt(size) / 2;
      let n = 4;
      context.moveTo(s, s);
      context.lineTo(s, s / n);
      context.lineTo(-s, s / n);
      context.lineTo(-s, s);
      context.closePath();

      context.moveTo(s, -s);
      context.lineTo(s, -s / n);
      context.lineTo(-s, -s / n);
      context.lineTo(-s, -s);
      context.closePath();
    },
  };

  var customEqu = d3.symbol().type(customSymbolEqual).size(300);
  vis
    .append("path")
    .attr("d", customEqu)
    .attr(
      "transform",
      "translate(" + width_vis / 2 + "," + (475 + 200) / 2 + ")"
    );
  //---------------
  //--- end symbols
  //---------------
  function createMarkers(vis, markerIds) {
    vis
      .append("defs")
      .selectAll("marker")
      .data(markerIds)
      .enter()
      .append("marker")
      .attr("id", function (d) {
        return d;
      })
      .attr("viewBox", "0 -2.5 5 5")
      .attr("refX", 5)
      .attr("refY", 0)
      .attr("markerWidth", 4)
      .attr("markerHeight", 5)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-2.5L5,0L0,2.5,z");
  }

  var markerIds = ["marka", "markb", "markc", "mark2", "mark1", "mark0"];

  createMarkers(vis, markerIds);

  // Add input fields
  const inputDiv = d3.select("#input-fields");
  const table = inputDiv.append("table");
  table.style("max-width", "100%").style("color", "steelBlue");
  // Create table header
  const header = table.append("thead").append("tr");
  header.append("th").text("input");
  header.append("th").text("A");
  header.append("th").text("θº");

  // Create table body
  const tbody = table.append("tbody");

  // Add input fields1
  const inputDiv1 = d3.select("#input-fields1");
  const table1 = inputDiv1.append("table");
  table1.style("max-width", "100%").style("color", "steelBlue");
  // Create table header
  const header1 = table1.append("thead").append("tr");
  header1.append("th").text("input");
  header1.append("th").text("R");
  header1.append("th").text("X");

  // Create table body
  const tbody1 = table1.append("tbody");

  //coordonées absolue va, vb, vc + origin coordinates p0
  var mag = height_g1 / Math.sqrt(3) - 0.3 * height_g1,
    p0x = 100 + width_g1 / 2,
    p0y = 200 + height_g1 / 2;
  var va = [p0x + mag, p0y],
    vb = [p0x - mag / 2, p0y + (mag * Math.sqrt(3)) / 2],
    vc = [p0x - mag / 2, p0y - (mag * Math.sqrt(3)) / 2],
    p0 = [p0x, p0y],
    psa = [va],
    psb = [vb],
    psc = [vc];

  var update2 = function () {
    //coordonées relative veca, vecb, vecc
    var veca = [va[0] - p0x, va[1] - p0y],
      vecb = [vb[0] - p0x, vb[1] - p0y],
      vecc = [vc[0] - p0x, vc[1] - p0y];

    var ampa = dist(va),
      ampb = dist(vb),
      ampc = dist(vc),
      anglea = angle(veca),
      angleb = angle(vecb),
      anglec = angle(vecc);
    //Negative sequence calculations with relative data
    var va2 = [
        (veca[0] -
          (vecb[0] + vecc[0]) / 2 -
          (Math.sqrt(3) / 2) * (vecb[1] - vecc[1])) /
          3,
        (veca[1] -
          (vecb[1] + vecc[1]) / 2 +
          (Math.sqrt(3) / 2) * (vecb[0] - vecc[0])) /
          3,
      ],
      vb2 = [
        (-va2[0] + va2[1] * Math.sqrt(3)) / 2,
        (-va2[1] - va2[0] * Math.sqrt(3)) / 2,
      ],
      vc2 = [
        (-va2[0] - va2[1] * Math.sqrt(3)) / 2,
        (-va2[1] + va2[0] * Math.sqrt(3)) / 2,
      ],
      p0 = [p0x, p0y],
      //reconstructing absolute vectors with origin p0
      va2 = [va2[0] + p0x, va2[1] + p0y],
      vb2 = [vb2[0] + p0x, vb2[1] + p0y],
      vc2 = [vc2[0] + p0x, vc2[1] + p0y],
      ps2 = [va2, vb2, vc2];
    //data0 (p0) is origin for vector v2
    let data0 = [
      [p0[0], p0[1]],
      [p0[0], p0[1]],
      [p0[0], p0[1]],
    ];

    //Positive sequence calculations with relative data
    var va1 = [
        (veca[0] -
          (vecb[0] + vecc[0]) / 2 +
          (Math.sqrt(3) / 2) * (vecb[1] - vecc[1])) /
          3,
        (veca[1] -
          (vecb[1] + vecc[1]) / 2 -
          (Math.sqrt(3) / 2) * (vecb[0] - vecc[0])) /
          3,
      ],
      vb1 = [
        (-va1[0] - va1[1] * Math.sqrt(3)) / 2,
        (-va1[1] + va1[0] * Math.sqrt(3)) / 2,
      ],
      vc1 = [
        (-va1[0] + va1[1] * Math.sqrt(3)) / 2,
        (-va1[1] - va1[0] * Math.sqrt(3)) / 2,
      ],
      p0 = [p0x, p0y],
      //reconstructing absolute vectors  with origin p0
      va1_buffer = [va1[0] + p0x, va1[1] + p0y],
      vb1_buffer = [vb1[0] + p0x, vb1[1] + p0y],
      vc1_buffer = [vc1[0] + p0x, vc1[1] + p0y],
      va1 = [va1[0] + va2[0], va1[1] + va2[1]],
      vb1 = [vb1[0] + vb2[0], vb1[1] + vb2[1]],
      vc1 = [vc1[0] + vc2[0], vc1[1] + vc2[1]],
      ps1 = [va1, vb1, vc1],
      ps1_buffer = [va1_buffer, vb1_buffer, vc1_buffer];
    //data1 (v2) is origin for v1
    let data1 = [
      [va2[0], va2[1]],
      [vb2[0], vb2[1]],
      [vc2[0], vc2[1]],
    ];

    //Zero sequence calculations with relative data
    var va0 = [
        (veca[0] + vecb[0] + vecc[0]) / 3,
        (veca[1] + vecb[1] + vecc[1]) / 3,
      ],
      vb0 = [
        (veca[0] + vecb[0] + vecc[0]) / 3,
        (veca[1] + vecb[1] + vecc[1]) / 3,
      ],
      vc0 = [
        (veca[0] + vecb[0] + vecc[0]) / 3,
        (veca[1] + vecb[1] + vecc[1]) / 3,
      ],
      p0 = [p0x, p0y],
      //reconstructing absolute vectors  with origin p0
      va0_buffer = [va0[0] + p0x, va0[1] + p0y],
      vb0_buffer = [vb0[0] + p0x, vb0[1] + p0y],
      vc0_buffer = [vc0[0] + p0x, vc0[1] + p0y],
      va0 = [va0[0] + va1[0], va0[1] + va1[1]],
      vb0 = [vb0[0] + vb1[0], vb0[1] + vb1[1]],
      vc0 = [vc0[0] + vc1[0], vc0[1] + vc1[1]],
      ps0 = [va0, vb0, vc0],
      ps0_buffer = [va0_buffer, vb0_buffer, vc0_buffer];
    //data2 (v1) is origin for v0
    let data2 = [
      [va1[0], va1[1]],
      [vb1[0], vb1[1]],
      [vc1[0], vc1[1]],
    ];

    var drag = d3
      .drag()
      .on("start", function (event, d) {
        this.__origin__ = d.slice();
      })
      .on("drag", function (event, d) {
        d[0] = Math.max(0, Math.min((this.__origin__[0] += event.dx), w));
        d[1] = Math.max(0, Math.min((this.__origin__[1] += event.dy), h));
        //    d3.select(this).attr("cx", d[0]).attr("cy", d[1]);
        // d3.select(this)
        //   .select("text")
        //   .attr("x", d[0] + 20)
        //   .attr("y", d[1])
        //      .text("V = " + d[0].toFixed(0) + " +j " + d[1].toFixed(0));
        update2();
      })
      .on("end", function () {
        delete this.__origin__;
      });

    function renderVectors(
      vis_g,
      vectorData,
      textData,
      className,
      dataRefForRendering,
      drag,
      hasSymetricals,
      side_g
    ) {
      var polylines = vis_g.selectAll("polyline." + className).data(vectorData);

      var ChooseIndex = 0,
        Inc = 1;
      if (hasSymetricals) {
        if (className === "vector0") {
          Inc = 0;
          ChooseIndex = 2 * side_g;
        } else {
          if (className === "vector1") {
            Inc = 0;
            ChooseIndex = 1 * side_g;
          } else {
            if (className === "vector2") {
              Inc = 0;
              ChooseIndex = 0;
            }
          }
        }
      }

      polylines
        .enter()
        .append("polyline")
        .attr("class", className)
        .attr("points", (d, i) =>
          polyline([dataRefForRendering[0][(i + Inc) % 3], d])
        )
        .attr(
          "marker-end",
          "url(#mark" + className.charAt(className.length - 1) + ")"
        )
        .merge(polylines)
        .attr("points", (d, i) =>
          polyline([dataRefForRendering[ChooseIndex][(i + Inc) % 3], d])
        )

        .attr("id", (d, i) => className + "-" + i + "-" + side_g);

      polylines.exit().remove();

      if (hasSymetricals) {
      } else {
        var texts = vis_g.selectAll("text." + className).data(vectorData);

        texts
          .enter()
          .append("text")
          .attr("class", className)
          .merge(texts)
          .attr("x", function (d) {
            return d[0] + 20;
          })
          .attr("y", function (d) {
            return d[1];
          })
          .text(function (d) {
            if (className.charAt(className.length - 1) ==="a"){
              d3.select("#Va-real").property("value",textData[0][0].toFixed(0))
              d3.select("#Va-imaginary").property("value",textData[0][1].toFixed(0))
            }
            if (className.charAt(className.length - 1) ==="b"){
              d3.select("#Vb-real").property("value",textData[0][0].toFixed(0))
              d3.select("#Vb-imaginary").property("value",textData[0][1].toFixed(0))}
            if (className.charAt(className.length - 1) ==="c"){
              d3.select("#Vc-real").property("value",textData[0][0].toFixed(0))
              d3.select("#Vc-imaginary").property("value",textData[0][1].toFixed(0))}
            return (
              "V" +
              className.charAt(className.length - 1) +
              " = " +
              textData[0][0].toFixed(0) +
              " +j " +
              textData[0][1].toFixed(0)
            );
          })
          .attr("font-family", "sans-serif")
          .attr("font-size", "10px")
          .attr("fill", "none");

        texts.exit().remove();

        var vectors = vis_g.selectAll("circle." + className).data(vectorData);

        vectors
          .enter()
          .append("circle")
          .attr("class", className)
          .attr("r", 15)
          .merge(vectors)
          .attr("cx", (d) => d[0])
          .attr("cy", (d) => d[1])
          .call(drag);

        vectors.exit().remove();
      }
    }

    dataRef = [data0, data1, data2];

    var vectorDataA = psa;

    var textDataA = [veca];
    renderVectors(
      vis_g1,
      vectorDataA,
      textDataA,
      "vectora",
      dataRef,
      drag,
      false,
      1
    );

    var vectorDataB = psb;
    var textDataB = [vecb];
    renderVectors(
      vis_g1,
      vectorDataB,
      textDataB,
      "vectorb",
      dataRef,
      drag,
      false,
      1
    );

    var vectorDataC = psc;
    var textDataC = [vecc];
    renderVectors(
      vis_g1,
      vectorDataC,
      textDataC,
      "vectorc",
      dataRef,
      drag,
      false
    ),
      1;

    var vectorData2 = ps2;
    var textData2 = [];
    renderVectors(
      vis_g1,
      vectorData2,
      textData2,
      "vector2",
      dataRef,
      drag,
      true,
      1
    );
    renderVectors(
      vis_g2,
      vectorData2,
      textData2,
      "vector2",
      dataRef,
      drag,
      true,
      0
    );

    var vectorData1 = ps1;
    var vectorData1_buffer = ps1_buffer;
    var textData1 = [];
    renderVectors(
      vis_g1,
      vectorData1,
      textData1,
      "vector1",
      dataRef,
      drag,
      true,
      1
    );
    renderVectors(
      vis_g3,
      vectorData1_buffer,
      textData1,
      "vector1",
      dataRef,
      drag,
      true,
      0
    );

    var vectorData0 = ps0;
    var vectorData0_buffer = ps0_buffer;
    var textData0 = [];
    renderVectors(
      vis_g1,
      vectorData0,
      textData0,
      "vector0",
      dataRef,
      drag,
      true,
      1
    );
    renderVectors(
      vis_g4,
      vectorData0_buffer,
      textData0,
      "vector0",
      dataRef,
      drag,
      true,
      0
    );

    ampa = dist([psa[0][0],psa[0][1]]);
    anglea =angle (veca);
  
    var inputs = [
      ["Va", [ampa,anglea]],
      ["Vb", [ampb,angleb]],
      ["Vc", [ampc,anglec]],
    ];
    var inputs1 = [
      ["Va", veca],
      ["Vb", vecb],
      ["Vc", vecc],
    ];
    const inputFields = tbody
      .selectAll(".input-field")
      .data(inputs)
      .enter()
      .append("tr")
      .attr("class", "input-field");

    // Add first column with input file labels
    inputFields.append("td").text((d) => `${d[0]}: `);


    // Add second column with amplitudes input fields
    inputFields
      .append("td")
      .append("input")
      .style("width", "50px")
      .style("color", "steelBlue")
      .attr("type", "number")
      .attr("step", "0.01")
      .attr("value", (d) => d[1][0])
      .on("input", onInputChanged)
      .attr("placeholder", "x")
      .attr("id", (d) => `${d[0]}-amplitude`)
      .style("border", "1px solid steelBlue");

    // Add third column with angles input fields
    inputFields
      .append("td")
      .append("input")
      .style("width", "50px")
      .style("color", "steelBlue")
      .attr("type", "number")
      .attr("step", "0.01")
      .attr("value", (d) => d[1][1])
      .on("input", onInputChanged)
      .attr("placeholder", "y")
      .attr("id", (d) => `${d[0]}-angle`)
      .style("border", "1px solid steelBlue");

      const inputFields1 = tbody1
      .selectAll(".input-field1")
      .data(inputs1)
      .enter()
      .append("tr")
      .attr("class", "input-field1");

    // Add first column with input file labels
    inputFields1.append("td").text((d) => `${d[0]}: `);

    // Add second column with real input fields
    inputFields1
      .append("td")
      .append("input")
      .style("width", "50px")
      .style("color", "steelBlue")
      .attr("type", "number")
      .attr("step", "0.01")
      .attr("value", (d) => d[1][0])
      .on("input", onInputChanged1)
      .attr("placeholder", "x")
      .attr("id", (d) => `${d[0]}-real`)
      .style("border", "1px solid steelBlue");

    // Add third column with imaginary input fields
    inputFields1
      .append("td")
      .append("input")
      .style("width", "50px")
      .style("color", "steelBlue")
      .attr("type", "number")
      .attr("step", "0.01")
      .attr("value", (d) => d[1][1])
      .on("input", onInputChanged1)
      .attr("placeholder", "y")
      .attr("id", (d) => `${d[0]}-imaginary`)
      .style("border", "1px solid steelBlue");

    // Define input change function
    function onInputChanged(event, d) {
      const phase = d[0];

      const inputType = event.target.id.split("-")[1];

      const newValue = parseFloat(event.target.value) * 1;
      console.log("inputtype for A/θº",inputType);

      if (inputType === "amplitude") {
        if (phase === "Va") {
          console.log("nnewvalue amplitude",newValue);
          psa[0][0] = newValue * 1 * Math.cos(anglea* Math.PI/180)+p0x;
          psa[0][1] = newValue * 1 * Math.sin(anglea* Math.PI/180)+p0y;
          d3.select("#Va-real").property("value",psa[0][0]-p0x);
          d3.select("#Va-imaginary").property("value",psa[0][1]-p0y);
        }
        if (phase === "Vb") {
          psb[0][0] = newValue * 1 + p0x;
          psb[0][1] = psb[0][1];
        }
        if (phase === "Vc") {
          psc[0][0] = newValue * 1 + p0x;
          psc[0][1] = psc[0][1];
        }
      } else if (inputType === "angle") {
        if (phase === "Va") {
          console.log("nnewvalue for θº",newValue);
          psa[0][0] = ampa * 1 * Math.cos(newValue* Math.PI/180)+p0x;
          psa[0][1] = ampa * 1 * Math.sin(newValue* Math.PI/180)+p0y;
          d3.select("#Va-real").property("value",psa[0][0]-p0x);
          d3.select("#Va-imaginary").property("value",psa[0][1]-p0y);
        }
        if (phase === "Vb") {
          psb[0][0] = psb[0][0];
          psb[0][1] = newValue * 1 + p0y;
        }
        if (phase === "Vc") {
          psc[0][0] = psc[0][0];
          psc[0][1] = newValue * 1 + p0y;
        }
      }

      if (phase ==="Va"){
      }
      if (phase ==="Vb"){
        d3.select("#Vb-real").property("value",textData[0][0].toFixed(0))
        d3.select("#Vb-imaginary").property("value",textData[0][1].toFixed(0))}
      if (phase ==="Vc"){
        d3.select("#Vc-real").property("value",textData[0][0].toFixed(0))
        d3.select("#Vc-imaginary").property("value",textData[0][1].toFixed(0))}
      update2();
    }

    // Define input1 change function
    function onInputChanged1(event, d) {
      const phase = d[0];

      const inputType = event.target.id.split("-")[1];

      const newValue = parseFloat(event.target.value) * 1;

      if (inputType === "real") {
        if (phase === "Va") {
          psa[0][0] = newValue * 1 + p0x;
          psa[0][1] = psa[0][1];
          console.log(psa,"dist",dist(psa[0]));
          d3.select("#Va-amplitude").property("value",dist(psa[0]));
          d3.select("#Va-angle").property("value",(180/Math.PI)*Math.atan2(psa[0][1]-p0y,psa[0][0]-p0x));
        }
        if (phase === "Vb") {
          psb[0][0] = newValue * 1 + p0x;
          psb[0][1] = psb[0][1];
        }
        if (phase === "Vc") {
          psc[0][0] = newValue * 1 + p0x;
          psc[0][1] = psc[0][1];
        }
      } else if (inputType === "imaginary") {
        if (phase === "Va") {
          psa[0][0] = psa[0][0];
          psa[0][1] = newValue * 1 + p0y;
          d3.select("#Va-amplitude").property("value",dist(psa[0]));
          d3.select("#Va-angle").property("value",(180/Math.PI)*Math.atan2(psa[0][1]-p0y,psa[0][0]-p0x));
        }
        if (phase === "Vb") {
          psb[0][0] = psb[0][0];
          psb[0][1] = newValue * 1 + p0y;
        }
        if (phase === "Vc") {
          psc[0][0] = psc[0][0];
          psc[0][1] = newValue * 1 + p0y;
        }
      }
      if (phase ==="Va"){
      }
      if (phase ==="Vb"){
        d3.select("#Vb-real").property("value",textData[0][0].toFixed(0))
        d3.select("#Vb-imaginary").property("value",textData[0][1].toFixed(0))}
      if (phase ==="Vc"){
        d3.select("#Vc-real").property("value",textData[0][0].toFixed(0))
        d3.select("#Vc-imaginary").property("value",textData[0][1].toFixed(0))}
      update2();
    }

    diff1 = [
      [va2[0] - p0x, va2[1] - p0y],
      [vb2[0] - p0x, vb2[1] - p0y],
      [vc2[0] - p0x, vc2[1] - p0y],
    ];

    diff2 = [
      [va1[0] - p0x, va1[1] - p0y],
      [vb1[0] - p0x, vb1[1] - p0y],
      [vc1[0] - p0x, vc1[1] - p0y],
    ];

    //   TranslateVectors("#vis_g1 .vector2", width_vis / 2 + 50, -250);
    TranslateVectors(
      "#vis_g1 .vector2",
      "#vector2-0-1",
      "#vector2-1-1",
      "#vector2-2-1",
      [width_vis / 2 + 50 - 0, -250 - 0],
      [width_vis / 2 + 50 - 0, -250 - 0],
      [width_vis / 2 + 50 - 0, -250 - 0]
    );

    TranslateVectors(
      "#vis_g1 .vector1",
      "#vector1-0-1",
      "#vector1-1-1",
      "#vector1-2-1",
      [width_vis / 2 + 50 - diff1[0][0], 0 - diff1[0][1]],
      [width_vis / 2 + 50 - diff1[1][0], 0 - diff1[1][1]],
      [width_vis / 2 + 50 - diff1[2][0], 0 - diff1[2][1]]
    );

    TranslateVectors(
      "#vis_g1 .vector0",
      "#vector0-0-1",
      "#vector0-1-1",
      "#vector0-2-1",
      [width_vis / 2 + 50 - diff2[0][0], 225 - diff2[0][1]],
      [width_vis / 2 + 50 - diff2[1][0], 225 - diff2[1][1]],
      [width_vis / 2 + 50 - diff2[2][0], 225 - diff2[2][1]]
    );

    //  TranslateVectors("#vis_g1 .vector0", width_vis / 2 + 50, 225);

    function TranslateVectors(
      selector,
      selector0,
      selector1,
      selector2,
      transValues0,
      transValues1,
      transValues2
    ) {
      var vectors_toTranslate = d3.selectAll(selector);
      vectors_toTranslate.style("cursor", "pointer");
      vectors_toTranslate.on("click", function () {

        var vectors_toTranslate0 = d3.select(selector0);
        var newVector0 = vectors_toTranslate0.clone(true);
        var x0 = transValues0[0];
        var y0 = transValues0[1];
        newVector0
          .transition()
          .duration(4000)
          .attr("transform", "translate(" + x0 + "," + y0 + ")")
          .on("end", function () {
            newVector0.attr("transform", null);
          });

        var vectors_toTranslate1 = d3.select(selector1);
        var newVector1 = vectors_toTranslate1.clone(true);
        var x1 = transValues1[0];
        var y1 = transValues1[1];
        newVector1
          .transition()
          .duration(4000)
          .attr("transform", "translate(" + x1 + "," + y1 + ")")
          .on("end", function () {
            newVector1.attr("transform", null);
          });

        var vectors_toTranslate2 = d3.select(selector2);
        var newVector2 = vectors_toTranslate2.clone(true);
        var x2 = transValues2[0];
        var y2 = transValues2[1];
        newVector2
          .transition()
          .duration(4000)
          .attr("transform", "translate(" + x2 + "," + y2 + ")")
          .on("end", function () {
            newVector2.attr("transform", null);
          });
      });
    }
  };
  update2();
  const text2 = vis
    .append("text")
    .attr("x", width_vis / 2 + width_g1 / 2)
    .attr("y", p0y - 300)
    .attr("class", "NegativeSequence")
    .text("Negative Sequence");
  const text1 = vis
    .append("text")
    .attr("x", width_vis / 2 + width_g1 / 2)
    .attr("y", p0y - 100)
    .attr("class", "PositiveSequence")
    .text("Positive Sequence");
  const text0 = vis
    .append("text")
    .attr("x", width_vis / 2 + width_g1 / 2)
    .attr("y", p0y + 165)
    .attr("class", "ZeroSequence")
    .text("Zero Sequence");
}
