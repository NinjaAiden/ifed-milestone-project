# Interactive Frontend Development Milestone Project

## Tourism site

This single page application is designed to help people find hotels, bars, restaurants
and tourist attractions in a selected city, accessed through the search bar and
displayed in a divider below the map.

[Click here to view web page](https://ninjaaiden.github.io/ifed-milestone-project/)

### Instructions

+ The dropdown box has a list of the 10 most popular tourist countries, selecting one will cause the map to zoom over that country.
+ The search bar next to the dropdown has an autocomplete function for selecting a city.
+ While a country is selected from the dropdown, the city search is resctricted to that country.
+ To search for a city that is not in the country list, select the top option or all from the dropdown, this will remove any restrictions from the search bar.
+ After a city has been selected, click one of the three buttons below the map, this will bring up a list of hotels, restaurants or bars respectively for the city.


### Technologies

This single page application, uses the following technologies:
+ Google Maps API is used for the bulk of the functionality.
+ Jquery for easier DOM manipulation.
+ Bootstrap for CSS assistance.

### Testing

Testing was done manually, both on computer and a Samsung Galaxy phone both in portrait and landscape mode.
Tests include:
+ Ensuring restrictions to target country in dropdown selector work and only cities within that country are searchable.
+ Removal of restrictions upon reverting to 'all' or 'select country' option allows user to search for cities outside of previously selected countries.
+ Testing all buttons work, with different countries and cities selected.
+ Ensuring CSS styling is functional and aesthitic in all view types

### Deployment

This page was deployed using GitHub pages and linked to the master branch of the repository.