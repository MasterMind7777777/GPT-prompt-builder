### Post-Processing and Analysis Module

#### Responsibilities:

1. **Manages the interaction with external APIs for post-processing**:  
    - Sends requests to external services for real-time analytics, such as sentiment analysis.

2. **Displays analysis results in a user-friendly manner**:  
    - Formats and displays the analytics data on an intuitive dashboard.

#### Key Features:

1. **Data Fetching Feedback**:  
   - **Visuals**: 
      - Semi-transparent overlay with a spinning loader icon at the center.
      - Progress bar appears underneath the spinner.
      - Text indicates the current operation, e.g., "Fetching Sentiment Analysis Data."
   - **Interactions**: 
      - Passive elements that disappear once the data is successfully fetched and processed.

2. **Analytics Dashboard**:  
   - **Visuals**: 
      - Dashboard organized into a grid layout with framed cards.
      - Cards feature large, bold headlines with the metric type.
      - Charts use pastel color schemes.
      - Graphs incorporate smooth hover animations.
   - **Interactions**: 
      - Hovering over pie chart segments shows tooltips with precise data.
      - Clicking on line graph points expands popups with more granular data.
      - Dropdown menus allow for data filtering by time range or category.
      - "Refresh" button for manual data refreshing.

