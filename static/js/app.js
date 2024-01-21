// Fetch data from the URL
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
  .then(function(data) {
      console.log(data);

    console.log("names:", data.names[0]);
  })
  .catch(function(error) {
    console.error("Error fetching JSON data:", error);
  });

// Function to handle dropdown selection change
function optionChanged(selectedSampleId) {
    // Call the updateBarChart function with the selected sample ID
    updateBarChart(selectedSampleId);
    updateBubbleChart(selectedSampleId);
    updateDemographicInfo(selectedSampleId);
    updateGaugeChart(selectedSampleId);
  }
  
  // Fetch initial data and populate dropdown on page load
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
    .then(function(data) {
      // Populate dropdown options
      const dropdown = d3.select("#selDataset");
      data.names.forEach(sampleId => {
        dropdown.append("option").text(sampleId).property("value", sampleId);
      });
  
      // Initial bar chart with the first sample ID
      updateBarChart(data.names[0]);
    })
    .catch(function(error) {
      console.error("Error fetching JSON data:", error);
    });

// BAR CHART
  // Function to update the bar chart based on selected sample ID
function updateBarChart(selectedSampleId) {
    // Fetch data from the URL
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
      .then(function(data) {
        // Filter data for the selected sample ID
        const selectedSample = data.samples.find(sample => sample.id === selectedSampleId);
  
        // Get the top 10 OTUs
        const top10OTUs = selectedSample.otu_ids.slice(0, 10).reverse();
        const top10Values = selectedSample.sample_values.slice(0, 10).reverse();
        const top10Labels = selectedSample.otu_labels.slice(0, 10).reverse();
  
        // Create horizontal bar chart
        const trace = {
          type: 'bar',
          orientation: 'h',
          x: top10Values,
          y: top10OTUs.map(otuId => `OTU ${otuId}`),
          text: top10Labels,
        };
  
        const layout = {
          title: `Top 10 OTUs for Sample ${selectedSampleId}`,
          xaxis: { title: 'Sample Values' },
        };
  
        Plotly.newPlot('bar', [trace], layout);
      })
      .catch(function(error) {
        console.error("Error fetching JSON data:", error);
      });
  }
  
// BUBBLE CHART
// Function to update the bubble chart based on selected sample ID
function updateBubbleChart(selectedSampleId) {
    // Fetch data from the URL
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
      .then(function(data) {
        // Filter data for the selected sample ID
        const selectedSample = data.samples.find(sample => sample.id === selectedSampleId);
  
        // Create bubble chart
        const trace = {
          type: 'scatter',
          mode: 'markers',
          x: selectedSample.otu_ids,
          y: selectedSample.sample_values,
          marker: {
            size: selectedSample.sample_values,
            color: selectedSample.otu_ids,
            colorscale: 'Viridis',
          },
          text: selectedSample.otu_labels,
        };
  
        const layout = {
          title: `Bubble Chart for Sample ${selectedSampleId}`,
          xaxis: { title: 'OTU IDs' },
          yaxis: { title: 'Sample Values' },
        };
  
        Plotly.newPlot('bubble', [trace], layout);
      })
      .catch(function(error) {
        console.error("Error fetching JSON data:", error);
      });
  }

  // Fetch initial data and populate dropdown on page load
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
    .then(function(data) {
      // Populate dropdown options
      const dropdown = d3.select("#selDataset");
      data.names.forEach(sampleId => {
        dropdown.append("option").text(sampleId).property("value", sampleId);
      });
  
      // Initial bubble chart with the first sample ID
      updateBubbleChart(data.names[0]);
    })
    .catch(function(error) {
      console.error("Error fetching JSON data:", error);
    });

// DISPLAY SAMPLE DATA
// Function to update the demographic info based on selected sample ID
function updateDemographicInfo(selectedSampleId) {
    // Fetch data from the URL
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
      .then(function(data) {
        // Filter data for the selected sample ID
        const selectedMetadata = data.metadata.find(metadata => metadata.id == selectedSampleId);
  
        // Select the metadata panel
        const metadataPanel = d3.select("#sample-metadata");
  
        // Clear existing metadata
        metadataPanel.html("");
  
        // Update metadata panel with demographic information
        Object.entries(selectedMetadata).forEach(([key, value]) => {
          metadataPanel.append("p").text(`${key}: ${value}`);
        });
      })
      .catch(function(error) {
        console.error("Error fetching JSON data:", error);
      });
  }
  
  // Fetch initial data and populate dropdown on page load
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
    .then(function(data) {
      // Populate dropdown options
      const dropdown = d3.select("#selDataset");
      data.names.forEach(sampleId => {
        dropdown.append("option").text(sampleId).property("value", sampleId);
      });
  
      // Initial update of demographic info and charts with the first sample ID
      updateDemographicInfo(data.names[0]);
      updateBarChart(data.names[0]);
      updateBubbleChart(data.names[0]);
      updateGaugeChart(data.names[0]);
    })
    .catch(function(error) {
      console.error("Error fetching JSON data:", error);
    });

//GAUGE CHART
// Function to update the gauge chart based on selected sample ID
function updateGaugeChart(selectedSampleId) {
    // Fetch data from the URL
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
      .then(function (data) {
        // Filter data for the selected sample ID
        const selectedMetadata = data.metadata.find(metadata => metadata.id == selectedSampleId);
  
        // Get the scrubs per week value
        const scrubsPerWeek = selectedMetadata.WFREQ;
  
        // Create or update the gauge chart
        const opts = {
          renderTo: 'gauge-chart',
          width: 200,
          height: 200,
          units: 'Scrubs per Week',
          minValue: 0,
          maxValue: 9,
          majorTicks: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
          minorTicks: 2,
          strokeTicks: true,
          highlights: [
            { from: 0, to: 2, color: 'rgba(0, 255, 0, .15)' },
            { from: 2, to: 4, color: 'rgba(255, 255, 0, .15)' },
            { from: 4, to: 6, color: 'rgba(255, 30, 0, .25)' },
          ],
          valueInt: 1,
          valueDec: 2,
        };
  
        const gauge = new RadialGauge(opts).draw();
  
        // Set the scrubs per week value on the gauge
        gauge.value = scrubsPerWeek;
      })
      .catch(function (error) {
        console.error("Error fetching JSON data:", error);
      });
}
