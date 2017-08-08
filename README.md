# Activity: Robots Revisited - Pair Programming

Now that we know SQL and pg-promise lets make our Robots directory dynamic.


Complete at least Level 1 but keep pushing yourself to try as much of these levels as you can. Complete all of Level 1 before moving to other levels.

## Level 1  

Make a duplicate of your robots project
Edit your main server javacript (server.js, index.js, app.js, etc.)
After your require statements and before your main code, place a comment showing your CREATE TABLE statement.
Change your code that displays the list of robots to retrieve this from your robots table instead of the built in data.
Change your code that displays a single robot to retrieve the robot, by ID, from the robots table
Add code to handle the case where the user request a robot ID that doesn't exist. It should show the user a nice message instead of a SQL or node error.
Add code to show a form to input details of a new robot
Add code to handle the submit of that form, adding a new robot to the database.
Validate any fields that you feel need validation
Not empty, length, type (number, etc.)
Add a button to the single robot display page that will delete the robot from the database
## Level 2  

Add a button to the single robot display page that takes you to a page where you can edit the details of the robot
It should show the same fields as the form that creates the robot
After submitting it should update the robot in the database.
On the robot list page add a form to search the robots. When something is input and submitted, search the names of the robots for any match and show only those robots on the page
## Level 3  

Update the search to match other fields, beyond just the name, you think are important to search
Have the search process each letter as input, refreshing the results live as the user types.
You'll need to research the idea of ajax for this.
Research indexes and add any indexes you feel this project needs. Add the SQL syntax you used for the indexes to comments in your code.
## Level 4 and beyond  

Come see instructors once levels 1 - 3 is complete.
