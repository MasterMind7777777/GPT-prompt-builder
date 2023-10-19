## Pagination and Infinite Scrolling

### 'Load More' Button

- **Visuals**:  
  - The button is slightly larger in width than the average button size, ensuring visibility.
  - Uses a subtle color that aligns with the website’s color scheme but still stands out against the background content.
  - Text within the button ("Load More") is bold and capitalized, improving readability and prominence.
  - A soft shadow effect around the button, making it appear floating above the page content.
  - Becomes slightly darker or changes appearance on hover to indicate it is clickable.
  
- **Location**:  
  - Positioned consistently at the end of the current list of displayed items/templates.
  - It hovers with a slight gap below the last item on the page to maintain a clear separation.
  - Centered horizontally relative to the content column to maintain alignment.
  
- **Interactions**:  
  - When clicked, the button triggers the loading of the next set of items without refreshing the entire page.
  - A subtle loading animation, like a spinning wheel, replaces the button text temporarily as new items are fetched and loaded.

#### React

- **Component Structure**:
  - Define a component `LoadMoreButton`. It should be a functional component that utilizes React Hooks for managing its internal states such as "normal", "hovered", and "loading".
  
- **Props**:
  - The component should accept a callback function as a prop, which will be executed when the button is clicked. This function will handle data fetching and should be passed down from a parent component.
  
- **Event Handling**:
  - An `onClick` event should be attached to the button. When the button is clicked, it should execute the callback function passed as a prop and switch to a "loading" state.

- **State Management**:
  - Use a state variable to manage the button’s state. When the "loading" state is active, display a loading spinner and disable the button to prevent multiple requests.

#### CSS

- **Button Styling**:
  - The button should be styled with a distinct color that matches the overall application theme but stands out against the background and nearby elements.
  - Utilize padding to ensure the button's clickable area is user-friendly. Consider a padding of around 10px to 15px.
  
- **Positioning**:
  - Position the button at the center below the list of items. Use `margin:auto` and `display:block` to center the button.
  
- **Hover and Active States**:
  - Define styles for hover and active states to provide visual feedback. Consider changing the button’s background color slightly on hover.
  
- **Loading State**:
  - In the loading state, the button text should be replaced with a loading spinner. You can use CSS animations to make the spinner rotate.
  - Ensure the spinner is visually centered within the button and has appropriate spacing and size, making it noticeable but not overwhelming.
  
- **Transitions**:
  - Apply CSS transitions for the state changes, ensuring smooth visual shifts between normal, hover, and loading states. Consider a transition duration of around 300ms for a balanced effect.

### Infinite Scrolling Trigger

- **Visuals**:  
  - No direct visual representation on the page as it should function seamlessly in the background.
  - An unobtrusive loading spinner appears at the bottom of the content area while new items are being loaded.
  
- **Location**:  
  - The trigger is integrated at a calculated point near the end of the currently displayed content, ensuring that new items start loading just before the user reaches the end.
  
- **Interactions**:  
  - Automatically detects when the user's scrolling is about to reach the end of the currently displayed items.
  - Initiates the loading of more items, appending them to the existing list without requiring any user action, providing a smooth and uninterrupted scrolling experience.

### Loading Indicator for Infinite Scrolling

- **Visuals**:  
  - The indicator, like a small circular spinner, is minimalist and uses a color that is easily visible against the background content.
  - Accompanied by a text such as "Loading more items..." to clearly communicate the ongoing action to the user.
  
- **Location**:  
  - Positioned at the very end of the content, ensuring that it is the last element users see as they scroll down.
  - Centered horizontally within the content area for clear visibility.
  
- **Interactions**:  
  - Appears only when new items are being loaded during the infinite scrolling process.
  - Disappears once the new items have been successfully loaded and displayed, ensuring that the user's focus returns to the content.

