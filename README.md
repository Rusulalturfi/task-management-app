# Task Management App

A task manager built with HTML, CSS, and JavaScript. Users can add tasks with a category, deadline, and status. They can update task statuses, filter tasks by status or category, and save tasks in the browser with local storage. Tasks past their deadlines appear as overdue unless they are completed.

## How to Use

Open `index.html` in a browser. Add a task using the form. Use the task dropdown to update its status and the filter dropdowns to find tasks by status or category.

## Reflection

One part that was challenging for me was getting the form to add tasks and show them on the page. I had to check that the IDs in my HTML matched the ones I selected in JavaScript. I worked on one piece at a time. First, I connected the form to JavaScript. Then I made each task an object, added it to an array, and displayed it in the list. The filters took some practice because I needed to understand why a task disappeared when I chose a different category or status. I also tested deadlines to see when a task should show as overdue. Saving tasks with local storage was new for me, so I refreshed the page to make sure my tasks stayed there. This project helped me practice arrays, objects, events, and DOM manipulation. If I had more time, I would add options to edit and delete tasks and create my own categories.