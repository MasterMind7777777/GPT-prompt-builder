## Dynamic Template List Details

### Overall Layout
- **Visuals**:  
  - Grid system with varying number of template cards per row based on screen width.
  - Lighter background color to contrast individual cards.

#### React

- **Component Structure**: 
  - Create a `GridLayout` component that serves as a wrapper for the `TemplateCard` components.
  
#### CSS

- **Grid Layout**:
  - Utilize CSS Grid within the `GridLayout` component's CSS module to establish a responsive grid system. Specify 4 columns for desktop and 2 columns for mobile.
  
- **Background Color**:
  - Set a lighter background color for the `GridLayout` component to ensure contrast against individual `TemplateCard` components. Use SCSS variables for maintainability.

### Template Card
- **Visuals**:  
  - Rectangular, 4:3 ratio.
  - Subtle shadow for depth.
  - Off-white background.
- **Location**:  
  - Centered horizontally in grid row.
- **Interactions**:  
  - Shadow deepens on hover.

#### React

- **Component Structure**:
  - Create a `TemplateCard` component to represent individual templates.

#### CSS

- **Dimensions**:
  - Set the dimensions of the `TemplateCard` component to a 4:3 ratio using `padding-top` or CSS aspect-ratio property.

- **Shadow & Depth**:
  - Use CSS box-shadow property to give a subtle shadow for depth. Use SCSS variables to define shadow properties.

- **Background Color**:
  - Apply an off-white background color to the `TemplateCard` component. Again, use SCSS variables for this value.

- **Location**:
  - Utilize CSS Grid's `justify-content: center` property in the `GridLayout` component to ensure that the `TemplateCard` is horizontally centered in each grid row.

- **Hover Effect**:
  - Use CSS hover selectors to deepen the shadow when the mouse hovers over the `TemplateCard` component.


### Template Name
- **Visuals**:  
  - Bold, 18pt, sans-serif text.
  - Dark gray color.
- **Location**:  
  - 15% down from the top edge.
- **Interactions**:  
  - Non-interactive.

#### React

- **Component Structure**:
  - Integrate the template name as an HTML `<h2>` or `<span>` element within the `TemplateCard` component.

#### CSS

- **Typography**:
  - Use `font-size: 18pt` and `font-weight: bold` for the text. Choose a sans-serif typeface.
  
- **Text Color**:
  - Set the text color to dark gray using CSS variables to maintain consistency across the app.

- **Location**:
  - Place the template name 15% down from the top edge of the `TemplateCard`. Use CSS `top` and `position: relative` for precise positioning.

- **Interactions**:
  - Since the text is non-interactive, no hover or click events are needed.

### More Options Icon (Three-dot icon)
- **Visuals**:  
  - Three 4x4 pixels dark gray dots.
- **Location**:  
  - Bottom-right corner, 15 pixels from edges.
- **Interactions**:  
  - Tooltip on hover.
  - Dropdown menu on click.

#### React

- **Component Structure**:
  - Create a separate functional component named `MoreOptionsIcon`.
  - Include this component in the bottom-right corner of the `TemplateCard` component.

#### CSS

- **Visuals**:
  - Use CSS to create three 4x4 pixel dark gray dots with `border-radius: 50%` for circular shape.
  
- **Location**:
  - Position it at the bottom-right corner of the `TemplateCard` with `position: absolute` and `bottom: 15px; right: 15px;`.

- **Interactions**:

#### JavaScript (React Hooks)

- **Tooltip**:
  - Use a hover event listener to display a tooltip that indicates the purpose of the three-dot icon.

- **Dropdown Menu**:
  - Utilize React state and conditional rendering to toggle a dropdown menu upon clicking the icon.

### Dropdown Menu
- **Visuals**:  
  - Off-white background, dark gray text.
  - Rounded corners and thin gray border.
- **Location**:  
  - Below three-dot icon, right-aligned.
- **Menu Options**:  
  - "Edit," "Delete," "Link" with 16pt text and icons.
- **Interactions**:  
  - Background darkens on hover.
  - Action specific to each menu option on click.

#### React

- **Component Structure**:
  - Create a reusable functional component called `DropdownMenu`.
  - Embed this component within the `MoreOptionsIcon` component, making it visible upon clicking the three-dot icon.

#### CSS

- **Visuals**:
  - Set the background to off-white and text to dark gray.
  - Use `border-radius` for rounded corners and add a thin gray border for separation.

- **Location**:
  - Position the dropdown right below the three-dot icon and right-align it using CSS positioning.

#### Icons and Text

- **Menu Options**:
  - Utilize 16pt text and appropriate icons next to each option ("Edit," "Delete," "Link").

#### Interactions

- **CSS**:  
  - Use `:hover` pseudo-class to darken the background color when a menu option is hovered over.

#### JavaScript (React Hooks)

- **Action Execution**:
  - Set up `onClick` event handlers for each menu option to execute the corresponding action ("Edit," "Delete," "Link").

#### Click-away Behavior

- **Interactions**:
  - Use React `useEffect` and `ref` to set up behavior where the dropdown disappears when clicking outside of it.
