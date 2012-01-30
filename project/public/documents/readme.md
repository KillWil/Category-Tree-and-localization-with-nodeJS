# Category Tree with localization 
## Overview
The goal is to make a REST Full web service under `NodeJS`, `ExpressJs` and `Mongoose` (** ** MongoDB) to effectively manage a category tree located in several languages.
I assume you have already installed node and the various extensions mentioned above.
The project can be downloaded from Git here.

---

**This first version allows you to:**

* [Insert a category](#AddCategory)
* [Insert a translation to a category](#AddLocale)
* [Delete a category](#DeleteCategory)
* [Delete a translation to a category](#DeleteLocale)
* [Get a category by id](#GetCategoryById)
* [Retrieve the list of categories down to a category](#GetDescCategories)
* [Retrieve the list of categories down to a category and the category itself](#GetDescCategoriesItself)
* [Retrieve the list of categories up to a category](#GetAscCategories)
* [Retrieve the list of categories up to a category and the category itself](#GetAscCategoriesItself)
* [Get the root category](#GetRootCategory)
* [Get the children of a category](#GetChildren)
* [Move a category (and or not the children) in the tree](#MoveCategory)

---

**Remains to be done:**

* Find a category by name
* Update the default or localize title of a category
* Get a global tree for a category node

Please remember that this is my first NodeJS project, so...

If you improve or expand the project, let me know.

### Server start

Linux do the following:

	$ Node app.js

The server will be start on port 3000.

### Web service consuming

Start a terminal and use Curl to call the web service and consume it.
Once launched the terminal type the following command:

	$ alias API_CATEGORY="curl -H 'Content-Type: application/json' -H 'Accept: application/json'"

This is just a shortcut (containing the HTTP headers) that will be used later

### Errors responses
---

If a web service call fails for some reason or another (update did not work, use a non-existent category, etc ...), one of the following form json is returned:

	{"code":404,"status":"Not Found","message":"error message"}

The HTTP status code is tailored to the circumstances:

* `404` : element not found.
* `500` : other error not listed
 
### Get Methods
---
#### Get a category by id

<a id="GetCategoryById"></a>
##### Route

	http://localhost:3000/category/:categoryid

Retrieve a single category item by its `_id`

##### Route parameters

`categoryid` : Category _id (eg: **4f1d76349fb183ec18000004**)

##### Additional querystring parameters

`lang` : Language code x(e.g. **fr**), this option allows you to retrieve the localize title of a category, i not specify the default title is retrieve.

##### Curl call

	$ API_CATEGORY -X GET -d '' 'http://localhost:3000/category/4f1d76349fb183ec18000004'

or

	$ API_CATEGORY -X GET -d '' 'http://localhost:3000/category/4f1d76349fb183ec18000004/?lang=fr'

##### Response

All json fields are in Pascal case.

	{"Success":true,"Result":{"Title":"My wonderful title","_id":"4f1d76349fb183ec18000004"}}

<a id="GetChildren"></a>
####GetChildren 

#####Route

	http://localhost:3000/category/:categoryid/children

Retrieves a list of child categories of a given category by its `_id`

##### Route parameters

`Categoryid` : _id d'une catégorie (par exemple **4f1d76199fb183ec18000002**)

##### Additional querystring parameters

`lang` : Language code x(e.g. **fr**), this option allows you to retrieve the localize title of a category, i not specify the default title is retrieve.

`page` : Page index (e.g.: 0 for the first page).

`limit` : Number of records to retrieve (e.g.: 10)

In summary if the values ​​for page = 3 & limit = 10, the first 30 results will be skipped and we get the following 10. Convenient for paging ... 

##### Curl call

	API_CATEGORY -X GET -d '' 'http://localhost:3000/category/4f1d76349fb183ec18000004/children/?page=0&limit=2

##### Response

	{
		"Success":true,
		"Page":"0",
		"Count":2,
		"Total":4,
		"Result":
		[
			{"Title":"California","_id":"4f1d7ca6dd5890fc18000003"},			{"Title":"Wisconsin","_id":"4f1d76879fb183ec18000006"}
		]
	}


With :

**Page** : The page that was requested.

**Count** : The number of records returned (may be less than the number requested).

**Total** : The total number of records in database for this request.

**Result** : Array of listitems.

### Post methods
---
<a id="AddCategory"></a>
####Insert a category

##### Route

	http://localhost:3000/category

Inserts a new category.

##### form parameters

`title` : Default title of the category.

`parentcategoryid` : Parent category id (e.g.: **4f1d76349fb183ec18000004**)

`position` : position a the new category relative to the parent category.

	fc : **f**irst **c**hild .
	lc : **l**ast **c**hild
	fs : **f**irst **s**ibbling
	ls : **l**ast **s**ibbling
	p  : **p**arent

##### Curl call

	$ API_CATEGORY -X POST -d '{"title":"test","parentcategoryid":"4f1d76349fb183ec18000004","position":"fc"}' 'http://localhost:3000/category/'


##### Response

is succeeded return the new category id.

	{"Success":true,"Result":{"_id":"4f21d53720636dc729000015"}}

### Delete methods
---
<a id="DeleteCategory"></a>
#### Delete a category

##### Route

	http://localhost:3000/category/:categoryid	

##### Route parameters

`categoryid` : Id of the category winch will be deleted.

##### Additionnal form parameters

`recursive` : boolean indicates how the category will be deleted.

	true: Delete category and all its descendants.
	false: Deletes only the category and then step back all his descendants.

##### Curl call

	$ API_CATEGORY -X DELETE -d '{"recursive":"true"}' 'http://localhost:3000/category/4f21d53720636dc729000015'


##### Response

	{"success":true,"deleted":1}

---

Follow [@wilfridb](http://twitter.com/wilfridb) on Twitter for updated news.
