# Back-end Developer Interview

## Expectations:

1. Use any language/framework you enjoy
2. Feel free to be creative, but the result NEED NOT BE COMPLEX or excessively time-consuming
3. We will review your work together during the in-person interview
4. Send a zip file of your project or a repository URL on or before the morning your back-end interview day

## Exercise:

Start with the CSV data from the “USDA Feed Grains: Yearbook Tables” available at https://www.ers.usda.gov/data-products/feed-grains-database/feed-grains-yearbook-tables/

Create an API service that provides a GET histogram route for each column in the table. For example, the following URLs should be successfully resolved by the service:

http://localhost:3000/SC_Group_Desc/histogram
http://localhost:3000/SC_Group_Commod_Desc/histogram
Etc.

A GET request on any of these URLs should return HTML with the count of how many times each unique value appears in that column of the data. For example in the SC_GroupCommod_Desc column, “Hay” appears 3,646 times, “Oats” 74,308, etc.

This service should be runnable using one of:
* docker-compose up
* A docker run command you provide
* Or, if containers are unfamiliar, a simple readme describing how to start the service

Be prepared to talk about one aspect of this exercise you found interesting, or feel free to add (or not) any optimization or feature you do find interesting and would like to talk about. For example:
* A simple HTML visualization
* Testing strategies
* Persistent data
* Data modeling / analytics
* ???



