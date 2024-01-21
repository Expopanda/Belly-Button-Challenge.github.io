let data;

// Fetch data from the URL
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
  .then(function(jsonData) {
    // Assign jsonData to the data variable
    data = jsonData;
    console.log("Loaded Data:", data);
  })
  .catch(function (error) {
    console.error("Error fetching JSON data:", error);
  });
// Function to handle dropdown selection change
function optionChanged(selectedSampleId) {
  updateBarChart(selectedSampleId);
  updateBubbleChart(selectedSampleId);
  updateDemographicInfo(selectedSampleId);
}

// BAR CHART
  // Function to update the bar chart based on selected sample ID
  function updateBarChart(selectedSampleId) {
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
  }
    
// BUBBLE CHART
  // Function to update the bubble chart based on selected sample ID
  function updateBubbleChart(selectedSampleId) {
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
  }

  // Fetch initial data and populate dropdown on page load
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
  .then(function (jsonData) {
    data = jsonData; // Assign jsonData to the data variable

    // Populate dropdown options
    const dropdown = d3.select("#selDataset");
    data.names.forEach(sampleId => {
      dropdown.append("option").text(sampleId).property("value", sampleId);
    });

    // Initial bubble chart with the first sample ID
    updateBubbleChart(data.names[0]);
  })
  .catch(function (error) {
    console.error("Error fetching JSON data:", error);
  });

// DISPLAY SAMPLE DATA
  // Function to update the demographic info based on selected sample ID
  function updateDemographicInfo(selectedSampleId) {
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
  }
  
  // Fetch initial data and populate dropdown on page load
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
  .then(function (jsonData) {
    data = jsonData; // Assign jsonData to the data variable

    // Populate dropdown options
    const dropdown = d3.select("#selDataset");
    data.names.forEach(sampleId => {
      dropdown.append("option").text(sampleId).property("value", sampleId);
    });

    // Initial update of demographic info and charts with the first sample ID
    updateDemographicInfo(data.names[0]);
    updateBarChart(data.names[0]);
    updateBubbleChart(data.names[0]);
  })
  .catch(function (error) {
    console.error("Error fetching JSON data:", error);
  });