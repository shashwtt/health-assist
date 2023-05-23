export function setTransformOrigin(clientY:number, listItem:any) {
	const rect = listItem.getBoundingClientRect(); // get position and size of list item
	const y = clientY - rect.top; // calculate y-coordinate of mouse relative to list item	
	const origin = y >= rect.height / 2 ? 'bottom' : 'top'; // set origin based on mouse position
    listItem.style.setProperty('--transform-origin', origin); // set css variable
}
