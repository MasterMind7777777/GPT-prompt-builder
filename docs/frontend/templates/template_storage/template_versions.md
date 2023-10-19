## Template Versioning

### Version Number Display
- **Visuals**:  
  - Small, bold, legible text displaying the version number (e.g., "v1.0"). The text is in a contrasting color to stand out against the timeline's background.
  
- **Location**:  
  - Directly above the corresponding milestone circle on the timeline, vertically aligned so that the bottom edge of the version number text aligns with the top edge of the milestone circle.

- **Interactions**:  
  - Cursor changes to a pointer when hovering over the version number, indicating clickability.

- **Relation to Parent Elements**:  
  - As a child of the timeline, it scrolls horizontally along with the timeline and milestone circles.


#### React

- **Component Structure**:
  - Create a stateless functional component named `VersionNumberDisplay` using React Hooks.
  - The component receives `version` and `position` as props and is embedded directly within the `TimelineMilestone` component.
  
- **Event Handling**:
  - Utilize the `onClick` event handler to trigger the opening of the version information popup. The handler should pass the `version` prop to the modal.

#### CSS

- **Visuals**:
  - The text displaying the version should have a `font-size` of `12px` and a `font-weight` of `bold`. 
  
- **Positioning**:
  - Make use of `position: absolute;` within the `TimelineMilestone` component's relative positioning to place the version number directly above the milestone circle. Use `bottom: 100%;` to align it just above the circle.
  
- **Colors and Styling**:
  - Use a contrasting text color, such as white (`#FFFFFF`), to ensure that the version number is easily readable against the timeline's dark gray background.
  
- **Interactions**:
  - Leverage the `:hover` pseudo-class to underline the text, offering a subtle but clear indication that the version number is clickable.

### Version Popup Modal
- **Visuals**:  
  - A centered popup modal with a clean design, displaying the version's changelog in a scrollable area. Includes a 'Revert' button and a 'Close' button.
  
- **Location**:  
  - Appears in the center of the screen upon clicking a version number.

- **Interactions**:  
  - Opens upon clicking a version number. The 'Revert' button allows users to revert to that specific version. The 'Close' button or clicking outside the modal closes it.

- **Relation to Parent Elements**:  
  - Independent of other elements, overlaying the existing UI when active.


#### React

- **Component Structure**:
  - Create a stateful functional component named `VersionPopupModal` using React Hooks.
  - The component receives `version` and `changelog` as props. It should include a scrollable area for the changelog and two buttons ('Revert' and 'Close').
  
- **Event Handling**:
  - Implement `onClick` event handlers for the 'Revert' and 'Close' buttons. 'Revert' should trigger a function to revert to that specific version, while 'Close' should close the modal.
  - Utilize an `onOverlayClick` event to close the modal when clicking outside its bounds.

#### CSS

- **Visuals**:
  - The modal background should be white (`#FFFFFF`) with a subtle shadow for depth (`box-shadow: 0 4px 8px rgba(0,0,0,0.1)`).
  
- **Positioning**:
  - The modal should be absolutely positioned in the center of the screen using `position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%)`.
  
- **Colors and Styling**:
  - The 'Revert' button should be in a noticeable but non-distracting color like blue (`#007BFF`). The 'Close' button could be in a neutral color like gray (`#6C757D`).
  
- **Interactions**:
  - Use the `:hover` and `:active` pseudo-classes to change the button colors slightly, providing visual feedback.
  
- **Relation to Parent Elements**:
  - The modal is an overlay, independent of other UI elements. It should have a higher `z-index` to ensure it appears above all other UI components.

### 'Revert' Button in Popup
- **Visuals**:  
  - A button within the popup modal, styled consistently with other buttons in the application.
  
- **Location**:  
  - Located at the bottom of the popup modal, centered horizontally.

- **Interactions**:  
  - Clicking this button will trigger the version reverting action, after which a confirmation message appears.

- **Relation to Parent Elements**:  
  - Integral part of the popup modal, shares the same z-index but is positioned within the modal's boundaries.


#### React

- **Component Structure**:
  - The 'Revert' button should be a separate functional component named `RevertButton`, or alternatively, it can be part of the `VersionPopupModal` component.
  - Should pass a callback function as a prop to this component, which will handle the version reverting action.

- **Event Handling**:
  - Attach an `onClick` event handler to the 'Revert' button. When clicked, it should call the callback function to perform the version reverting action and display a confirmation message.

#### CSS

- **Visuals**:
  - The button should have a background color that stands out but remains consistent with the overall design. For example, a shade of blue like `#007BFF`.
  
- **Positioning**:
  - Use `position: absolute;` for precise placement within the modal, with `bottom: 10px;` and `left: 50%;` combined with `transform: translateX(-50%);` to center it horizontally at the bottom.

- **Colors and Styling**:
  - Text should be white (`#FFFFFF`) for contrast, and button edges can be rounded with a 4px radius for a softer look.
  
- **Interactions**:
  - Include hover and active states, perhaps lightening or darkening the background color slightly to indicate interactivity.

- **Relation to Parent Elements**:
  - The button is part of the `VersionPopupModal` component and shares its z-index, ensuring it's displayed as an integral part of the modal.
