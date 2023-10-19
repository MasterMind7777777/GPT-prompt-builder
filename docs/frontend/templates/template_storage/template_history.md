## History and Stats Overview

### Timeline

- **Visuals**:  
  - 2 pixels thick, dark gray (#4A4A4A) line that spans the entire width of the template card.
  
- **Location**:  
  - Positioned 10 pixels below the bottom edge of the template card, aligned from the left edge to the right edge of the card.

#### React

- **Component Structure**:
  - Create a standalone functional component named `Timeline`.
  - This component should be nested inside the `TemplateCard` component.

- **Rendering**:  
  - Utilize a simple HTML `<div>` element for the timeline itself.

#### CSS

- **Timeline Styling**:
  - Assign a unique class name to this `<div>`, such as `.timeline`.
  - Set `height` to 2 pixels and `background-color` to dark gray (`#4A4A4A`).

- **Positioning**:
  - To position the Timeline 10 pixels below the `TemplateCard`, use `margin-top: 10px;`.
  - To span the entire width of the `TemplateCard`, set `width: 100%;`.

### Milestone Circles

- **Visuals**:  
  - Small circles at regular intervals along the timeline, centered on the timeline. 
  - Different colors and a small, white icon in the center to represent the type of milestone (e.g., star for major version, pencil for minor edits).
  
- **Location**:  
  - Regular intervals along the timeline, aligned with the center of the timeline.

#### React

- **Component Structure**:
  - Create a reusable functional React component called `MilestoneCircle`. This component will receive props like `milestoneType` and `milestoneData`.
  - The `Timeline` component should include an array of these `MilestoneCircle` components, each corresponding to a different milestone.

- **Conditional Rendering**:
  - Use a `switch` statement or an object map within the `MilestoneCircle` component to conditionally render different icons based on the `milestoneType` prop. For example, a star icon for major versions and a pencil icon for minor edits.

- **Data Handling**:
  - The parent `Timeline` component should pass down an array of milestone data as props, which will be mapped to individual `MilestoneCircle` components.

#### CSS

- **Basic Styling**:
  - Create a CSS class called `.milestone-circle` with properties like `width: 12px;`, `height: 12px;`, and `border-radius: 50%;` to create a circle.

- **Color Coding and Icons**:
  - Use modifier CSS classes such as `.milestone-circle--major` and `.milestone-circle--minor` to handle different milestone types. In these classes, define the `background-color` and include a centered white SVG icon.

- **Positioning and Spacing**:
  - Within the `.timeline` class (parent), use Flexbox or CSS Grid to evenly space the `MilestoneCircle` components. For example, `display: flex;` and `justify-content: space-between;`.
  
- **Vertical Alignment**:
  - To ensure that each `MilestoneCircle` is aligned with the center of the `Timeline`, set their vertical alignment to middle. You can achieve this using `align-items: center;` if you're using Flexbox for the parent container.

- **Transitions and Interactions**:
  - Use CSS transitions for subtle effects when a milestone circle is hovered over, such as enlarging the circle slightly or changing its background color.

### Tooltip on Hover

- **Visuals**:  
  - 50 pixels wide and 30 pixels tall, slightly rounded corners (5-pixel radius), and a subtle shadow with a 5% opacity.
  
- **Location**:  
  - Appears 10 pixels above the milestone circle it corresponds to, with no overlap.

- **Interactions**:  
  - Instant appearance on hover, starts to fade out half a second after the cursor moves away, completely disappearing in another half second.

#### React

- **Component Structure**:
  - Create a new functional component named `MilestoneTooltip`. This component will be conditionally rendered within the `MilestoneCircle` component.
  
- **Event Handling**:
  - Use React's `onMouseEnter` and `onMouseLeave` events within the `MilestoneCircle` to toggle the visibility of `MilestoneTooltip`.

- **Animation Timing**:
  - Implement the tooltip fade-in and fade-out using React state and CSS transitions, coordinated with React's lifecycle methods or hooks like `useEffect`.

- **Data Propagation**:
  - Pass down necessary data such as 'Average Rating' and 'Times Used' from the parent `Timeline` or `MilestoneCircle` component to display inside the tooltip.

#### CSS

- **Basic Styling**:
  - For `.milestone-tooltip`, set `width: 50px;`, `height: 30px;`, `border-radius: 5px;`, and a `box-shadow` with 5% opacity.

- **Positioning**:
  - Use CSS `position: absolute` for the tooltip. Calculate the `top` and `left` position based on the dimensions and position of the parent `MilestoneCircle`. The tooltip should appear 10 pixels above the circle.

- **Transitions**:
  - Implement the fade-in and fade-out animations using CSS `transition`. Set the `opacity` to change over a half-second interval for both appearing and disappearing.
  
- **Text and Content Alignment**:
  - Use `text-align: center` and `vertical-align: middle` to ensure the text or any other content is centered within the tooltip.

### Tooltip Text

- **Visuals**:  
  - Left-aligned text, top line in bold ('Version X.X'), bottom line in regular font. Both in a legible sans-serif font.
  
- **Location**:  
  - Inside the tooltip, with 5 pixels padding from each edge.

#### React

- **Component Structure**:
  - Within the `MilestoneTooltip` component, create two text elements, one for the 'Version' and another for additional information like 'Average Rating'.
  
- **Styling Props**:
  - Pass inline styles or CSS classes for text alignment and weight via props to make it reusable for other parts of the application.

#### CSS

- **Typography**:
  - For `.tooltip-version`, use `font-weight: bold;` and for `.tooltip-info`, use `font-weight: normal;`. Use a legible sans-serif font for both.
  
- **Text Alignment**:
  - Set `text-align: left;` to align the text to the left side of the tooltip.

- **Padding**:
  - Set `padding: 5px;` for both text elements to ensure there is 5 pixels padding from each edge of the tooltip.

- **Font Colors**:
  - Make the text easily readable against the tooltip background, likely by using a dark gray or black color.


### Timeline Scroll Arrows

- **Visuals**:  
  - Small arrow buttons, 10 pixels in size, appearing at either end of the timeline.
  
- **Location**:  
  - Positioned at the extreme left and right ends of the timeline.

- **Interactions**:  
  - Change color slightly on hover, scroll the timeline to reveal additional milestones at a rate of one milestone per click when clicked.


#### React

- **Component Structure**:
  - Create a stateful functional component named `TimelineScrollArrows` using React Hooks.
  - Embed this component directly within the `Timeline` component layout.

- **Event Handling**:
  - Utilize `onClick` event handlers to implement the scrolling action. Increment or decrement the timeline's scroll position by exactly one milestone's width when an arrow is clicked.

#### CSS

- **Visuals**:
  - Arrow buttons are 10 pixels in width and height. Utilize SVGs to ensure crisp visuals for the arrow symbols.
  
- **Positioning**:
  - Leverage `position: absolute;` within the `Timeline` component's relative positioning. For the left arrow, apply `left: 0;`. For the right arrow, apply `right: 0;`.
  
- **Colors and Styling**:
  - Apply a base color of #555555 for the arrow buttons. 
  
- **Interactions**:
  - Use the `:hover` pseudo-class to darken the base color to #444444, offering subtle but clear visual feedback.

- **Animation**:
  - Implement CSS transitions to scroll the timeline smoothly over 200 milliseconds when an arrow button is clicked.
