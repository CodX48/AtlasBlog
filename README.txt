Member Name : Moustafa Ibrahim Khamis Ibrahim Khamis | 230504639

this is a single page website with only an html file "index.html", this page is connected to a single javascript file "App.js"
"App.js" is the main js file.

the website start with checking if the browser has a auth on the LocalStorage, i handled that using token on the server side
all the pages are being generated using DOM Api every page is a functions with componenets which is also js functions. (Home Page, Profile Page).

_______________________________________________________________________________________________________________________________________________________
***HOME PAGE***

serves as the main dashboard that users see after logging in. It features a user-friendly layout with a navigation bar and a dynamic main content area:

Navigation Bar:

    Positioned at the top of the page, the navigation bar includes:

	* A logo representing the application’s identity.
	* A search input that allows users to quickly find content or friends.
	* A profile icon that redirects users to their Profile Page when clicked.

Main Content Area (Feeds):

    This section displays a scrollable list of posts made by the user’s friends.
    Each post typically contains the friend’s name, content (text or media), and a timestamp.
    This feed updates based on available friend activity.

Logout Button:

    Located on the page, the Logout button allows users to securely end their session.
    Clicking it will remove the authentication token from local storage and redirect the user to the login view.
______________________________________________________________________________________________________________________________________________

***PROFILE PAGE***

displays detailed information about the authenticated user and serves as a personalized view of their social activity.
It is dynamically generated using JavaScript and the DOM API, providing a seamless user experience within the single-page application.

User Information Section:
At the top of the page, this section includes:

Username: The full name of the user.

Friends Count: Displays the number of friends the user has.

Posts Count: Shows the total number of posts the user has made.

User Posts Section:
Below the user info, the page displays a list of the user's own posts. Each post includes:

The content of the post (text or media).

A timestamp indicating when it was published.
