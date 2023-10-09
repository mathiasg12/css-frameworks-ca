# JS2 CA
##Description
This website is called MeSpace and is a school project. this webiste is a social media platform where users can register and login. the website uses JWT to login users and stores it in local storage. users can view a feed of content, search for a post, filter results and click a specific post. users can also make posts, edit and delete their own posts. the website is WCAG-compliant and responsive and follows a basic grid system. the website got four pages, the landing page, feed page, profile page and specific page.
###Landing page
this page is where users eighter log-in or register a new user to the api. if a user register it automatically log-in that user. if a user log-in the JWT will be stored in local storage. and the user will be redirected to the feed page.
###Feed-page
the feed page got three sections, in the first section a user can make a post and store it in the api, the second section is the filter section, here users can search for a post and filter results as well, the filter has a sort function that eighter sorts post from newest to oldest or oldest to newest. the other function of the filter menu is how many results per page.the third section is the post section, here a get request gathers the content from the api and displays the content, at the bottom of the contet section a more button can be pressed and the next page of content get displayed, the posts display name of creator, date , heading, and body text.
###Specific-page
if a user clicks a post on the feed page they will be redirectet to the specific page, this page uses id parameter in the Url to display the specific post the user clicks on, this page is for future development, and show only that one post.
###Profile-page
The profile page is where users can edit and delete their own posts and uses PUT and DELETE requests to achive this. if a user press edit a form will replace the post and the user can edit the post and click update, if a user press delete the post will disappear from the api.
###Design:
* colors: nav= #ed8042(orange), background=#a2fffd;(light-blue),buttons=#37ed83(light-green), other=#cc00ff(orange),#e9a174(orange)
* layout: bootstrap grid system
* responsive design
###functionality:
* Register and login using JWT
* Fetching content from the api and displaying the response(get request)
* Adding content to the api(Post request)
* Edit and deleting users own content(PUT and DELETE request)
* Id paramter to dynamicly create specific page that renders a specific post
* Global search functionality that scans the whole api
* Sort functionality
* Filter(how many results per page)
* All forms use JS validation 
##Built with
*JS
*CSS
*HTML
*SCSS
*Bootstrap
###Running
1: download this repository
2: go to package.json
3: find =>  "scripts": {
    "build": "sass src:dist/css",
    "watch": "sass --watch src:dist/css & live-server",
    "start": "live-server"
  }, 
4: press debug then start
#Contact
My email address: mathiasgausl@gmail.com
