## Expanded Details for Bulk Operations

### Template Card Glow Effect
- **Visuals**:  
  - On long-press, the template card is surrounded by a subtle, soft blue glow. The glow features a 10-pixel radius and has an RGBA color code of `rgba(0, 123, 255, 0.5)`.

- **Location**:  
  - The glow is an additional layer that sits precisely around the existing shadow of the template card, extending the visual boundary of the card by 10 pixels on all sides.

- **Interactions**:  
  - Initiating a long-press on the card triggers this glow, signaling that the card is selected. The glow vanishes if the long-press is canceled or when you exit the multi-select mode.

- **Relation to Parent Elements**:  
  - Since the glow extends 10 pixels beyond the card, it will overlap with adjacent cards in the grid if they are less than 20 pixels apart.

#### React 

- **State Management**:
  - Use a React state variable called `isLongPressed` that toggles between `true` and `false` depending on whether a long-press action has been initiated.

- **Event Handling**:
  - Implement an `onLongPress` event handler to toggle `isLongPressed`.
  
- **Conditional Rendering**:
  - If `isLongPressed` is true:
    1. Add the `.long-press-glow` class to the template card.
    2. Render a checkmark icon using a new component or inline SVG.
    3. Display the bulk operations toolbar.
  - If `isLongPressed` is false, remove all the aforementioned UI changes.

#### CSS

- **Glow Effect**:
  - Create a class called `.long-press-glow` with the property `box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);`.

- **Checkmark Appearance**:
  - Create another class called `.selected-checkmark`. Style the checkmark icon that appears on the selected card with `position: absolute; top: 10px; right: 10px; z-index: 10;`.

- **Bulk Operations Toolbar**:
  - Define its initial and final CSS states for the toolbar that slides up from the bottom. 
    - Initial: `bottom: -100px; opacity: 0;`
    - Final: `bottom: 0; opacity: 1;`
  - Add a smooth transition between these states.

- **Overlapping Glow**:
  - Increase the `z-index` of the glowing card to ensure it appears above adjacent cards if they are less than 20 pixels apart.

### Checkmark Indicator
- **Visuals**:  
  - When a card is selected, a dark gray checkmark icon appears inside a light gray circle. The checkmark is 20x20 pixels and the circular background has a diameter of 30 pixels.

- **Location**:  
  - Positioned at the top-left corner of the template card, the circle partially overlaps the card by 5 pixels from the top and left edges.

- **Interactions**:  
  - Instantaneously appears when a card is selected, and disappears when it is deselected.

- **Relation to Parent Elements**:  
  - The checkmark sits within the boundaries of the card, and it is layered above any other card elements like the template name or three-dot icon.

#### React

- **State Management**: 
  - Use the existing `isLongPressed` or a separate `isSelected` state variable to manage whether a card is selected.

- **Conditional Rendering**: 
  - If `isLongPressed` or `isSelected` is true, render the `CheckmarkIcon` component within the `TemplateCard` component.
  
- **Event Handling**:
  - Toggling the `isLongPressed` or `isSelected` state would either display or remove the checkmark indicator.

#### CSS

- **Checkmark Icon**:
  - Create a class called `.checkmark-icon` with dimensions `20x20px` and set its color to dark gray.

- **Circular Background**:
  - Create a separate class for the circle background called `.checkmark-circle`, with a `30px` diameter and light gray background.

- **Positioning and Layering**: 
  - Use `position: absolute; top: -5px; left: -5px; z-index: 15;` to position the checkmark icon at the top-left corner of the card.
  - Make sure its `z-index` is higher than any other elements within the card.

- **Transition**:
  - Add a subtle fade-in transition for when the checkmark appears and disappears.
  
- **Overlap Management**:
  - As the checkmark is within the card boundaries, no special considerations are needed for overlapping issues unless cards are spaced less than 5 pixels apart.

### Toolbar for Bulk Actions
- **Visuals**:  
  - The toolbar has a height of 60 pixels and spans the entire width of the screen. It features a darker shade of gray compared to the main background. The toolbar icons for 'Move' and 'Delete' are white and are 30x30 pixels each.

- **Location**:  
  - Emerges from the bottom of the screen, sliding upwards until it aligns with the bottom edge of the browser window or application frame.

- **Interactions**:  
  - The toolbar becomes visible when one or more cards are selected in multi-select mode and recedes back when all are deselected.

- **Relation to Parent Elements**:  
  - The toolbar overlays the lowest row of template cards if they extend to the bottom of the screen. Therefore, users should be aware that some cards may be partially obscured when the toolbar is visible.

#### React

- **State Management**: 
  - Use a `isToolbarVisible` state variable to toggle the visibility of the toolbar.
  
- **Conditional Rendering**: 
  - Render the toolbar component only when `isToolbarVisible` is true.

- **Animation**: 
  - Utilize React's transition group or a third-party library like `react-spring` to slide the toolbar from the bottom when it becomes visible and slide it back when it is hidden.

#### CSS

- **Toolbar Dimensions and Color**: 
  - Create a `.toolbar` class with a fixed height of `60px` and `width: 100%`. Set its background color to a darker shade of gray.

- **Icon Properties**: 
  - For the 'Move' and 'Delete' icons, use a `.toolbar-icon` class. Set their dimensions to `30x30px` and color them white.

- **Positioning**: 
  - Use `position: fixed; bottom: 0; left: 0;` to make the toolbar align with the bottom edge of the browser window or application frame.

- **Transitions**: 
  - Add a smooth slide-up and slide-down transition for when the toolbar appears and disappears. You could use CSS transitions with `transform: translateY()` for this effect.

- **Layering and Obscurement**: 
  - The toolbar should have a high `z-index` to overlay any lower elements. Warn users that the bottom-most row of cards may be obscured when the toolbar is visible.

### Bulk Action Buttons ('Move' and 'Delete')
- **Visuals**:  
  - Square-shaped, flat design buttons with rounded corners featuring icons for 'Move' and 'Delete'. Each icon is 30x30 pixels and is centrally placed in the button.

- **Location**:  
  - These buttons are spaced 20 pixels apart and are centrally aligned horizontally on the toolbar. 

- **Interactions**:  
  - On hover, the button undergoes a slight color change to indicate interactivity. Clicking it will execute the respective bulk action.

- **Relation to Parent Elements**:  
  - These buttons are integral parts of the toolbar and are constrained within its 60-pixel height, centrally placed for easy access.


#### React

- **Component Creation**: 
  - Create separate React functional components for each button, namely `MoveButton` and `DeleteButton`.

- **Icon Placement**: 
  - Import the respective icons for 'Move' and 'Delete' and place them inside the buttons.

- **Event Handlers**: 
  - Attach onClick event handlers to the buttons that trigger the bulk move and delete functionalities.

#### CSS

- **Button Shape and Dimensions**: 
  - Create a `.bulk-action-button` class. Set the buttons as square-shaped with dimensions of `40x40px` to accommodate the `30x30px` icons.

- **Icon Dimensions**: 
  - Inside `.bulk-action-button`, target the icon and set its dimensions to `30x30px`.

- **Rounded Corners**: 
  - Add `border-radius: 5px` to make the corners rounded.

- **Color and Hover Effects**: 
  - Set the initial background color to be the same as the toolbar or slightly lighter. Use the `:hover` selector to change the background color slightly when hovered.

- **Positioning**: 
  - Use flexbox or grid layout on the toolbar to centrally align these buttons horizontally. Ensure that there's a 20-pixel space between the buttons.

- **Parent-Child Relationship**: 
  - Since these buttons are part of the toolbar, ensure they are contained within the toolbar's 60-pixel height and are vertically centered.

