let jsonFile = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// function that populates the demographics box
function dropdownmenu()
{
    // use d3.json in order to get all of the data
    d3.json(jsonFile).then((data) => {
        
        // get all of the names
        let Names = data.names;

        
        // Specify the location of the metadata and update it
        let selection = d3.select("#selDataset");

        // use .forEach entries to append option to buildinfoBox
        Names.forEach((element) => {
            selection.append("option").text(element);
          });
          
        buildInfoBox(Names[0])
        charts(Names[0])
    });
};



function buildInfoBox(sample)
{
    // use d3.json in order to get all of the data
    d3.json(jsonFile).then((data) => {
        
        // get all of the metadata
        let metaData = data.metadata;

        // filter based on the value of the sample (should be 1 result)
        let result = metaData.filter(sampleResult => sampleResult.id == sample);

        // access index 0 from the array
        let resultData = result[0];

        // Specify the location of the metadata and update it
        d3.select("#sample-metadata").html("");

        // use Object.entries to get the key/value pairs and put into the demographics box on the page
        Object.entries(resultData).forEach(([key, value]) => {
            d3.select("#sample-metadata")
                .append("h5").text(`${key}: ${value}`);
        });
    });
};
// function to change dropdown value

dropdownmenu();

function optionChanged(x){
    buildInfoBox(x)
    charts(x)
  }

  // create function to use for all charts


  function charts(sample)
{
    // use d3.json in order to get all of the data
    d3.json(jsonFile).then((data) => {
        
        // get all of the metadata
        let metaData = data.metadata;

        // filter based on the value of the sample (should be 1 result)
        let result = metaData.filter(sampleResult => sampleResult.id == sample);

        // access index 0 from the array
        let resultData = result[0];

       // get all of the metadata
       let samplesData = data.samples;

       // filter based on the value of the sample (should be 1 result)
       let samplesresult = samplesData.filter(sampleResult => sampleResult.id == sample);

       // access index 0 from the array
       let sampleresultData = samplesresult[0];





        // get data from sample json file to equal variables and create bar chart


       otu_ids = sampleresultData.otu_ids
       sample_values = sampleresultData.sample_values
       otu_labels = sampleresultData.otu_labels

       sample_values.slice(0, 10).reverse();

       var bartrace = [{
        x: sample_values.slice(0, 10).reverse(),
        y: otu_ids.slice(0, 10).map(x => `OTU ${x}`).reverse(),
        text:otu_labels.slice(0, 10).reverse(),
        orientation: 'h',
       
        type: 'bar'
      }];


      var barlayout = {
        title: 'Top 10 Bacteria',
        
      };
      
      Plotly.newPlot('bar', bartrace, barlayout);


      // create Bubble chart

      var bubbletrace = [{
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
          color: otu_ids,
          colorscale: "Earth",
          size: sample_values
        }
      }];
      
      var bubblelayout = {
        title: 'Bacteria Bubble Chart',
        showlegend: false,
        xaxis: {title:"OTU ID"}
       
      };
      
      Plotly.newPlot('bubble', bubbletrace, bubblelayout);

      
      
      
      
      // create Gauge chart #####CODE NOT RESPONSIVE####

//       var gaugetrace = [
//         { type: 'scatter',
//    x: [0], y:[0],
// 	marker: {size: 18, color:'850000'}, 
// 	showlegend: false,
// 	name: 'speed',
// 	text: parseFloat(resultData.wfreq) * 50,
// 	hoverinfo: 'text+name'},
//   { values: [50/9, 50/9, 50/9,50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
//   rotation: 90,
//   text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
//   textinfo: 'text',
//   textposition:'inside',	  
//   marker: {colors:[
//     "rgba(0, 105, 11, .5)",
//           "rgba(10, 120, 22, .5)",
//           "rgba(14, 127, 0, .5)",
//           "rgba(110, 154, 22, .5)",
//           "rgba(170, 202, 42, .5)",
//           "rgba(202, 209, 95, .5)",
//           "rgba(210, 206, 145, .5)",
//           "rgba(232, 226, 202, .5)",
//           "rgba(240, 230, 215, .5)",
//           "rgba(255, 255, 255, 0)"

//                         ]},
//   labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
//   hoverinfo: 'label',
//   hole: .5,
//   type: 'pie',
//   showlegend: false
// }


//         /* {
//           domain: { x: [0, 1], y: [0, 1] },
//           value: resultData.wfreq,
//           title: "<b>Belly Button washing frequency</b> <br> scrubs per week" ,
//           type: "indicator",
//           mode: "gauge+number",
        
//           gauge: {
//             axis: { range: [null, 10] },
//             steps: [
//               { range: [0, 250], color: "lightgray" },
//               { range: [250, 400], color: "gray" }
//             ],
           
//           }
//         } */
//       ];
//       function gaugePointer(value){
	
//         var degrees = 180 - value,
//          radius = .5;
//     var radians = degrees * Math.PI / 180;
//     var x = radius * Math.cos(radians);
//     var y = radius * Math.sin(radians);
    
//     // Path: may have to change to create a better triangle
//     var mainPath = 'M -.0 -0.035 L .0 0.035 L ',
//          pathX = String(x),
//          space = ' ',
//          pathY = String(y),
//          pathEnd = ' Z';
//     var path = mainPath.concat(pathX,space,pathY,pathEnd);
        
//         return path;
    
//     }


//      var gaugelayout = {
//   shapes:[{
//       type: 'path',
//       path: gaugePointer(0),
//       fillcolor: '850000',
//       line: {
//         color: '850000'
//       }
//     }],
//     title: "<b>Belly Button washing frequency</b> <br> scrubs per week" ,
// 	autosize:true,
//   //height: 1000,
//   //width: 1000,
//   xaxis: {zeroline:false, showticklabels:false,
// 			 showgrid: false, range: [-1, 1]},
//   yaxis: {zeroline:false, showticklabels:false,
// 			 showgrid: false, range: [-1, 1]}
// };
//       Plotly.newPlot('gauge', gaugetrace, gaugelayout);



    });
};





