## Template Search

### Magnifying Glass Icon
- **Visuals**: 
  - A stylish yet intuitive magnifying glass icon.
  - The icon should subtly stand out, ensuring users identify it as an actionable item.
  
- **Location**:
  - Positioned at the top-right corner of the templates list or header, ensuring easy accessibility and a standard location for search functionality.
  
- **Interactions**:
  - A single click on the icon reveals the advanced search bar with various filters, ensuring a non-cluttered view when not in use.

#### React

- **Component Structure**:
  - Utilize a stateless functional component for the icon, considering a library like FontAwesome or a custom SVG to represent the magnifying glass.
  - Incorporate this component within a higher-order component (HOC) that manages the search functionality, ensuring that the icon can manage the toggle action of displaying or hiding the advanced search options.
  
- **Event Handling**:
  - Implement `onClick` event using React’s event handling system. When the icon is clicked, it should trigger the visibility of the advanced search bar.
  - Consider using React’s `useState` to manage the visibility state of the advanced search bar component.
  
#### CSS

- **Visuals**:
  - Utilize CSS or a preprocessor like SASS to style the icon, ensuring it aligns well with the overall UI design.
  - Consider using a CSS-in-JS solution like styled-components for more dynamic styling based on component state.
  
- **Positioning**:
  - Utilize CSS Flexbox or Grid to position the icon effectively within the header or the search component, ensuring it aligns well with other UI elements.
  
- **Colors and Styling**:
  - Define the color variables using CSS custom properties or a preprocessor variable feature, ensuring consistency across the application.
  
- **Interactions**:
  - Apply CSS transitions or animations to create interactive hover or click effects, enhancing user experience.
  - Utilize pseudo-classes like `:hover` and `:active` to apply styles based on user interactions.
  
- **Size and Scaling**:
  - Define sizes using relative units like `em` or `rem` to ensure scalability and responsiveness.
  - Consider applying media queries to ensure the icon adapts well to various screen sizes and resolutions.
  
### Advanced Search Bar
- **Visuals**:
  - The search bar should be sleek, wide enough to easily type and read the search query.
  - Embedded within this bar are dropdown menus for the filters (e.g., Public, Private, Date Created).
  
- **Location**:
  - Directly below the header or navigation bar, ensuring it is one of the first elements users see when they decide to perform a search.
  
- **Interactions**:
  - Allows for text input to search through the templates.
  - Dropdown filters within the bar should be clickable, revealing options for refining the search.


#### React

- **Component Structure**:
  - Create a functional component `AdvancedSearchBar`.
  - Incorporate an `<input>` element for the text search.
  - Add dropdown components (Consider using a library such as React-Select for enhanced dropdowns with search, multi-select, etc.)
  - Wrap the input and dropdowns in a `<form>` element to manage the submission of search queries.

- **Event Handling**:
  - Add an `onChange` event to the `<input>` to manage and filter the text input in real-time.
  - For dropdowns, have event handlers to set the state each time an option is selected or deselected.
  - Implement a `onSubmit` event handler in the form to manage the search query submission.

#### CSS

- **Visuals**:
  - Utilize `box-sizing: border-box;` for better box model handling.
  - Implement `padding` within the text input and dropdowns to enhance usability and appearance.

- **Positioning and Layout**:
  - Employ Flexbox (`display: flex;` and related properties) for efficient alignment and distribution of the search bar and its internal elements.
  - Utilize `margin` and `padding` properties for precise positioning and spacing of the elements.

- **Borders and Shadows**:
  - Use `border` property to define a subtle, soft edge to the search bar and its components, enhancing definition against the background.
  - Optionally use `box-shadow` for a slight, sophisticated shadow effect, adding depth.

- **Fonts**:
  - Use web-safe or custom imported fonts for text within the search bar for compatibility and design consistency.
  - Utilize `font-size`, `font-weight`, and `line-height` properties to optimize text readability and appearance.

- **Colors**:
  - Utilize `color` and `background-color` properties for text and element backgrounds, ensuring contrast and readability.
  - Employ CSS variables for consistent color theming and easier global adjustments.

- **Hover and Active States**:
  - Use the `:hover` pseudo-class to apply styles that highlight interactiveness.
  - Utilize background color changes, border colors, or shadows for hover effects to indicate actionability.

- **Transitions and Animations**:
  - Employ the `transition` property for smooth hover effects and dropdown interactions.
  - Define durations and easing functions for transitions to enhance user experience.

- **Responsive Design**:
  - Implement media queries to ensure the search bar's usability and appearance are maintained across various screen sizes and devices.
  - Adjust properties such as `font-size`, `margin`, `padding`, and element widths in response to viewport changes.

- **Utility Classes**:
  - Consider creating utility classes for recurrent styles such as borders, shadows, and fonts to maintain CSS consistency and reduce redundancy.
  
### Dropdown Filters
- **Visuals**:
  - Clearly labeled dropdown filters such as ‘Public’, ‘Private’, ‘Date Created’, ensuring users understand the criteria they can use for refining their search.
  
- **Location**:
  - Within the advanced search bar, organized in a user-friendly manner allowing for a seamless user experience.
  
- **Interactions**:
  - Clicking each dropdown reveals options for that specific filter.
  - Users can click to select or deselect options within these dropdowns.

#### React

- **Component Structure**:
  - Define a functional component named `DropdownFilter`.
  - Use React hooks like `useState` to manage the dropdown's open/close state and selected options.

- **Event Handling**:
  - Use `onClick` events to handle the opening and closing of dropdown menus.
  - Implement event handling for option selection and deselection within the dropdown.

- **Props**:
  - Pass necessary props such as `options` (for dropdown options) and `onSelect` (a callback function for when an option is selected).

#### CSS

- **Visuals**:
  - Utilize custom styling or third-party libraries like Bootstrap for aesthetically pleasing dropdowns.
  - Apply `background-color` and `border` properties to distinguish dropdowns from other elements.

- **Positioning and Layout**:
  - Position dropdowns inline within the advanced search bar using Flexbox or Grid layout styles.
  - Define `width`, `margin`, and `padding` for consistent spacing and alignment.

- **Fonts and Text Styles**:
  - Style the dropdown labels and options using `font-size`, `font-weight`, and `text-align` for clarity and readability.

- **Icons and Indicators**:
  - Use SVG icons or Unicode characters for dropdown indicators, applying styles for size and color.

- **Hover and Active States**:
  - Employ the `:hover` and `:active` pseudo-classes to enhance user interaction with visual feedback such as color changes or underlines.

- **Transitions and Animations**:
  - Apply CSS transitions for smooth dropdown opening/closing animations, defining `duration` and `timing-function`.

- **Z-Index and Overlapping**:
  - Manage `z-index` values to ensure dropdowns properly overlay other page elements when active.

- **Responsiveness**:
  - Use media queries to adapt dropdown sizes, font sizes, and layouts for various devices and screen widths.

- **Accessibility**:
  - Ensure dropdowns are navigable and usable with keyboard interactions.
  - Apply ARIA roles and attributes to enhance screen reader support.
  
### ‘Apply Filters’ Button
- **Visuals**:
  - A button that is easily identifiable with text such as ‘Apply Filters’, ensuring users understand how to execute their refined search.
  
- **Location**:
  - Positioned at the end of the advanced search bar, providing a clear flow from left (entering search query and filters) to right (applying the search).
  
- **Interactions**:
  - Clicking the button applies the selected filters to the search query and displays the relevant results on the templates list.

#### React

- **Component Structure**:
  - Utilize a functional component, possibly named `ApplyFiltersButton`.
  - This component should be placed within the `AdvancedSearchBar` component for a logical and hierarchical structure.

- **Event Handling**:
  - Implement an `onClick` event handler to execute the search with the selected filters, fetching and displaying the filtered results.

- **Props**:
  - The button component could receive props like `isActive` (to manage the button state) and `applyFilters` (a callback to execute the filtering).

#### CSS

- **Visuals**:
  - Employ a distinct and vibrant color to make the button stand out, ensuring it draws user attention.
  - Consider using a `border`, `border-radius`, and `box-shadow` to enhance the button’s aesthetics and visibility.

- **Positioning and Layout**:
  - Place the button at the end of the advanced search bar, ensuring a logical flow in the search and filter process.
  - Utilize CSS properties like `margin` and `padding` to correctly position the button within the layout.

- **Fonts and Text Styles**:
  - Apply text styles using `font-size`, `font-weight`, and `text-transform` to make the button label clear and readable.
  - Consider adding padding and possibly an icon inside the button to enhance its visual appeal.

- **Hover and Active States**:
  - Implement styles for hover and active states using the `:hover` and `:active` pseudo-classes, such as changing the background color or applying a slight scale transformation.

- **Transition Effects**:
  - Add subtle transition effects using the `transition` property to smooth out the state changes, such as hover effects.

- **Responsiveness**:
  - Ensure that the button’s size and position adapt gracefully on various screen sizes using media queries.
  - Maintain clickable area considerations for touch devices, keeping a suitable size for touch interactions.

- **Accessibility**:
  - Make sure the button is accessible, meaning it should be focusable, and its action should be understandable through screen readers by using ARIA attributes.
  
### ‘Reset’ Button
- **Visuals**:
  - A secondary action button with text like ‘Reset’, allowing users to easily clear their search query and selected filters.
  
- **Location**:
  - Next to the ‘Apply Filters’ button, ensuring it is easily located once filters have been applied.
  
- **Interactions**:
  - Clicking this button clears all input and selected filters in the advanced search bar, allowing users to start a new search.

#### React

- **Component Structure**:
  - Implement as a functional component, possibly named `ResetButton`.
  - Position this component adjacent to the `ApplyFiltersButton` within the `AdvancedSearchBar` component.

- **Event Handling**:
  - Incorporate an `onClick` event handler that will clear all selected filters and search inputs, resetting them to their initial states.

- **Props**:
  - The button may accept props that determine its current state, like `isDisabled` when there are no active filters or search queries.

#### CSS

- **Visuals**:
  - Use a more subdued or neutral color compared to the ‘Apply Filters’ button to indicate it’s a secondary action.
  - Employ properties like `border`, `border-radius`, and `background-color` to create a clear and clean appearance.

- **Positioning and Layout**:
  - Locate the button next to the ‘Apply Filters’ button, maintaining a consistent and logical interface.
  - Utilize CSS layout properties such as `margin` and `padding` for correct spacing and alignment within the search bar.

- **Fonts and Text Styles**:
  - Apply appropriate text styling using properties like `font-size`, `font-weight`, and `letter-spacing` to keep the button label readable and straightforward.

- **Hover and Active States**:
  - Define styles for the hover and active states using pseudo-classes (`:hover`, `:active`), offering visual feedback like background color changes or subtle shadows.

- **Transition Effects**:
  - Utilize the `transition` property to add smooth visual effects when the button state changes, enhancing the user experience.

- **Responsiveness**:
  - Ensure the button adapts effectively to different screen sizes and viewports using responsive design techniques and media queries.

- **Accessibility**:
  - Confirm the button is easily navigable and interactive, supporting various accessibility tools and technologies like keyboard navigation and screen readers by applying suitable ARIA roles and attributes.

